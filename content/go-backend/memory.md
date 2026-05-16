# Memory — Go Backend Pack

## Domain context

A Go backend engineer ships services that other services or clients call: HTTP APIs over `net/http`, gRPC services for internal RPC, sometimes both in the same binary. The Go version is 1.22+ — stdlib `ServeMux` finally has pattern-based routing with path params, `log/slog` is the structured logger, and `errors.Join` exists. Deployment is a container, almost always distroless or `alpine` based, often under 30MB, run by Fly machines, AWS ECS, Cloud Run, or Kubernetes.

The database is Postgres via `pgx/v5` — the idiomatic driver, with typed scanning and connection pooling that doesn't require the `database/sql` indirection. For typed queries, `sqlc` generates Go code from `.sql` files (no ORM, but no boilerplate either). Queues, when needed, are `river` (Postgres-backed, designed for Go) or `asynq` (Redis-backed). gRPC code is generated with `protoc-gen-go` and `protoc-gen-go-grpc`, and proto files live in `api/proto/`.

The expensive lessons in Go are: context cancellation must be honored or you leak goroutines and waste DB connections; errors must be wrapped with `%w` at every layer that adds context or `errors.Is`/`As` stop working; init() is a footgun that hides dependency wiring; and any sprawl makes code unreadable in six months. A senior Go engineer reads "Effective Go," the Uber style guide, and Dave Cheney's posts as gospel, but also knows when to deviate.

## Vocabulary the AI should know

- context.Context: the cancellation, deadline, and value-propagation primitive — first argument of every I/O function
- goroutine: a lightweight thread scheduled by the Go runtime; cheap (~2KB stack) but not free
- channel: typed conduit for goroutine-to-goroutine communication; buffered or unbuffered
- select: multi-way channel receive, the building block of cancellation-aware blocking
- errgroup: `golang.org/x/sync/errgroup`, the standard way to run goroutines with shared cancellation and error propagation
- slog: `log/slog`, the structured logger in the standard library since Go 1.21
- pgx / pgxpool: the modern Postgres driver; `pgxpool.Pool` is the connection pool you actually want
- sqlc: codegen tool that turns annotated `.sql` queries into typed Go functions; no ORM, no reflection
- proto / protobuf: Protocol Buffers, the serialization format used by gRPC; defined in `.proto` files
- gRPC: HTTP/2-based RPC framework with bidirectional streaming, schema-first, typed clients and servers
- chi: lightweight HTTP router, stdlib-compatible, middleware-friendly
- echo / gin: heavier HTTP frameworks with batteries (binding, validation, render helpers)
- middleware: handler decorator pattern; in stdlib, a `func(http.Handler) http.Handler`
- recover: the function that stops a panic from unwinding the goroutine; used in a middleware to convert panics to 500s
- defer: schedules a function to run when the surrounding function returns; standard pattern for closing resources
- error wrapping: `fmt.Errorf("doing X: %w", err)` — preserves the original error for `errors.Is`/`errors.As`
- sentinel error: a package-level `var Err* = errors.New(...)` used as a match target
- distroless: minimal container images from Google (gcr.io/distroless/static) with no shell, no package manager, very small
- graceful shutdown: stop accepting new requests, drain in-flight, close connections, exit cleanly — typically `http.Server.Shutdown(ctx)`
- OTel / OpenTelemetry: vendor-neutral tracing/metrics/logging standard; Go SDK is `go.opentelemetry.io/otel`
- semantic conventions: standardized attribute names in OTel (`http.method`, `db.system`, etc.)
- prometheus client: `prometheus/client_golang` for exposing metrics on `/metrics`
- staticcheck / golangci-lint: linters that catch real bugs beyond `go vet`

## Common workflows

- HTTP handler with context propagation + middleware stack: user wants a new endpoint. Trigger → define request/response structs with JSON tags, write the handler that pulls `ctx := r.Context()`, decodes/validates, calls a service function, maps errors via `writeError`, writes a typed response → register the route in `internal/http/server.go` with the middleware chain (request id, slog, recover, auth) → write an httptest test against the handler with a fake service.
- gRPC service definition: user wants a typed RPC surface. Trigger → write `.proto` file under `api/proto/` with messages and a service definition → run `protoc --go_out=. --go-grpc_out=. api/proto/*.proto` (or via `buf generate`) → implement the generated server interface in `internal/grpc/services/` → register on the server in `internal/grpc/server.go` → write a client function for any caller binary → write a service test using `bufconn` for an in-memory connection.
- Graceful shutdown + signal handling: user is wiring `main`. Trigger → `signal.NotifyContext(ctx, syscall.SIGINT, syscall.SIGTERM)` for a cancellable root context → `errgroup.WithContext(ctx)` to run the HTTP server, gRPC server, and any workers as group goroutines → on shutdown, each goroutine calls its own `Shutdown(shutdownCtx)` with a fresh timeout context → `g.Wait()` returns the first error → defer closing the DB pool, the tracer, the queue client.
- Structured logging with slog + OTel tracing: user wants observability. Trigger → set up `slog.New(slog.NewJSONHandler(os.Stdout, opts))` at startup, set as default → middleware adds request id, trace id, route to every log line → OTel SDK initialized with OTLP exporter pointing at the collector URL → http and pgx instrumentation packages wired (`otelhttp.NewMiddleware`, `pgxotel`) → spans created in services for business operations, attributes set with `span.SetAttributes(attribute.String(...))`.

## What to avoid / common mistakes

- `panic` for control flow: panic is for "this should never happen" (nil pointer, index out of bounds in a defensive check). User-not-found is `return nil, ErrNotFound`, not `panic`.
- Ignoring context cancellation: a long loop without `select { case <-ctx.Done(): ... }` will keep running after the request is gone. Long-running goroutines leak; DB connections held; CPU wasted.
- `init()` doing real work: registering globals, opening connections, reading env. Makes test setup painful and hides ordering. Wire in `main`.
- `return err` without wrapping at a layer boundary: when something fails three layers down, the caller has no context. `fmt.Errorf("loading config for tenant %q: %w", id, err)`.
- `interface{}` / `any` sprawl: every `any` is a place the compiler stopped helping. Use generics (Go 1.18+) or define the concrete type.
- Mutex AND channel doing the same job: pick one. `sync.Mutex` for protecting state, channels for communication between goroutines. Mixing them creates deadlocks.

## Tone / register

A senior Go engineer is terse. They use the words "idiomatic" and "ergonomic" sparingly and only when they mean them. They quote Rob Pike's proverbs ("a little copying is better than a little dependency," "don't communicate by sharing memory") when relevant, not as decoration. They read goroutine traces and pprof profiles and treat them as the source of truth, not stack traces in logs. They prefer reading code to reading docs. They know the difference between a goroutine and a thread, and when it matters. They write package comments. They never name a package `util` or `common`. They acknowledge when a generic feels forced and use a concrete type instead.
