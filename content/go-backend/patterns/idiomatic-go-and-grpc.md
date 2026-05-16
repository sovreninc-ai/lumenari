# Idiomatic Go: HTTP, gRPC, shutdown, observability

Five patterns you'll reach for on every Go service: an HTTP handler with proper context + middleware, a gRPC service with proto + server + client, graceful shutdown with signal handling, slog setup, and OTel tracing.

## 1. HTTP handler with context + middleware stack

```go
// internal/http/server.go
package http

import (
    "net/http"
    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
    "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
    "example.com/api/internal/http/handlers"
    "example.com/api/internal/service"
)

func NewServer(svc *service.Services) http.Handler {
    r := chi.NewRouter()

    r.Use(middleware.RequestID)
    r.Use(middleware.RealIP)
    r.Use(slogMiddleware)         // logs each request with attributes
    r.Use(middleware.Recoverer)   // panic -> 500 + slog.Error
    r.Use(middleware.Timeout(30 * time.Second))

    h := handlers.New(svc)

    r.Route("/v1", func(r chi.Router) {
        r.Get("/users/{id}", h.GetUser)
        r.Post("/users", h.CreateUser)
        r.Get("/healthz", h.Healthz)
        r.Get("/readyz", h.Readyz)
    })

    return otelhttp.NewHandler(r, "api") // free HTTP tracing
}
```

```go
// internal/http/handlers/users.go
package handlers

import (
    "encoding/json"
    "errors"
    "net/http"
    "example.com/api/internal/service"
)

type Handlers struct{ svc *service.Services }
func New(svc *service.Services) *Handlers { return &Handlers{svc: svc} }

type getUserResponse struct {
    ID   string `json:"id"`
    Name string `json:"name"`
}

func (h *Handlers) GetUser(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    id := chi.URLParam(r, "id") // or r.PathValue("id") if using stdlib mux
    if id == "" {
        writeError(w, badRequest("missing id"))
        return
    }

    u, err := h.svc.Users.Get(ctx, id)
    if err != nil {
        writeError(w, err)
        return
    }

    writeJSON(w, http.StatusOK, getUserResponse{ID: u.ID, Name: u.Name})
}

func writeJSON(w http.ResponseWriter, status int, v any) {
    w.Header().Set("content-type", "application/json")
    w.WriteHeader(status)
    _ = json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, err error) {
    var ve service.ValidationError
    switch {
    case errors.Is(err, service.ErrNotFound):      http.Error(w, "not found", http.StatusNotFound)
    case errors.Is(err, service.ErrForbidden):     http.Error(w, "forbidden", http.StatusForbidden)
    case errors.Is(err, service.ErrAlreadyExists): http.Error(w, "conflict", http.StatusConflict)
    case errors.As(err, &ve):                       http.Error(w, ve.Error(), http.StatusBadRequest)
    default:
        slog.Error("unhandled error", "err", err)
        http.Error(w, "internal error", http.StatusInternalServerError)
    }
}
```

The service does the work:

```go
// internal/service/users.go
package service

import (
    "context"
    "errors"
    "fmt"
    "github.com/jackc/pgx/v5"
    "example.com/api/internal/domain"
)

type UserRepo interface {
    Get(ctx context.Context, id string) (*domain.User, error)
}

type Users struct{ repo UserRepo }

func NewUsers(repo UserRepo) *Users { return &Users{repo: repo} }

func (s *Users) Get(ctx context.Context, id string) (*domain.User, error) {
    u, err := s.repo.Get(ctx, id)
    if err != nil {
        if errors.Is(err, pgx.ErrNoRows) {
            return nil, fmt.Errorf("user %q: %w", id, ErrNotFound)
        }
        return nil, fmt.Errorf("user repo get %q: %w", id, err)
    }
    return u, nil
}
```

Note: `UserRepo` is an interface defined where it's *consumed* (in the service package), not where it's *implemented* (in the db package). That's the Go convention — small interfaces, defined at the consumer.

## 2. gRPC service: proto + server + client

```proto
// api/proto/users/v1/users.proto
syntax = "proto3";

package users.v1;
option go_package = "example.com/api/gen/users/v1;usersv1";

import "google/protobuf/timestamp.proto";

service UsersService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc CreateUser(CreateUserRequest) returns (User);
}

message GetUserRequest { string id = 1; }
message CreateUserRequest { string name = 1; }

message User {
  string id = 1;
  string name = 2;
  google.protobuf.Timestamp created_at = 3;
}
```

Generate with `buf generate` (or raw `protoc`). The generated code lives in `gen/users/v1/`.

Server implementation:

```go
// internal/grpc/services/users.go
package services

import (
    "context"
    "errors"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/status"
    "google.golang.org/protobuf/types/known/timestamppb"

    usersv1 "example.com/api/gen/users/v1"
    "example.com/api/internal/service"
)

type UsersServer struct {
    usersv1.UnimplementedUsersServiceServer
    svc *service.Services
}

func NewUsersServer(svc *service.Services) *UsersServer { return &UsersServer{svc: svc} }

func (s *UsersServer) GetUser(ctx context.Context, req *usersv1.GetUserRequest) (*usersv1.User, error) {
    if req.GetId() == "" {
        return nil, status.Error(codes.InvalidArgument, "id required")
    }
    u, err := s.svc.Users.Get(ctx, req.GetId())
    if err != nil {
        switch {
        case errors.Is(err, service.ErrNotFound):
            return nil, status.Error(codes.NotFound, "user not found")
        default:
            slog.Error("get user", "err", err)
            return nil, status.Error(codes.Internal, "internal error")
        }
    }
    return &usersv1.User{
        Id:        u.ID,
        Name:      u.Name,
        CreatedAt: timestamppb.New(u.CreatedAt),
    }, nil
}
```

Wire it on the server:

```go
// internal/grpc/server.go
package grpc

import (
    "google.golang.org/grpc"
    "go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc"
    usersv1 "example.com/api/gen/users/v1"
    "example.com/api/internal/grpc/services"
)

func NewServer(svc *service.Services) *grpc.Server {
    s := grpc.NewServer(
        grpc.StatsHandler(otelgrpc.NewServerHandler()),
    )
    usersv1.RegisterUsersServiceServer(s, services.NewUsersServer(svc))
    return s
}
```

And a client:

```go
// pkg/client/users.go
import (
    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials/insecure"
    usersv1 "example.com/api/gen/users/v1"
)

func DialUsers(ctx context.Context, addr string) (usersv1.UsersServiceClient, *grpc.ClientConn, error) {
    conn, err := grpc.NewClient(addr,
        grpc.WithTransportCredentials(insecure.NewCredentials()), // mTLS in prod
        grpc.WithStatsHandler(otelgrpc.NewClientHandler()),
    )
    if err != nil {
        return nil, nil, fmt.Errorf("dial %s: %w", addr, err)
    }
    return usersv1.NewUsersServiceClient(conn), conn, nil
}
```

## 3. Graceful shutdown with signal handling

```go
// cmd/api/main.go
package main

import (
    "context"
    "errors"
    "fmt"
    "net"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "golang.org/x/sync/errgroup"
)

func main() {
    if err := run(); err != nil {
        slog.Error("fatal", "err", err)
        os.Exit(1)
    }
}

func run() error {
    cfg, err := config.Load()
    if err != nil { return fmt.Errorf("config: %w", err) }

    setupLogger(cfg)
    shutdownTracer, err := setupTracing(cfg)
    if err != nil { return fmt.Errorf("tracing: %w", err) }
    defer shutdownTracer(context.Background())

    pool, err := db.NewPool(context.Background(), cfg.DatabaseURL)
    if err != nil { return fmt.Errorf("db pool: %w", err) }
    defer pool.Close()

    svc := service.New(pool)

    httpSrv := &http.Server{
        Addr:              ":" + cfg.HTTPPort,
        Handler:           httpserver.New(svc),
        ReadHeaderTimeout: 5 * time.Second,
    }

    grpcLis, err := net.Listen("tcp", ":"+cfg.GRPCPort)
    if err != nil { return fmt.Errorf("grpc listen: %w", err) }
    grpcSrv := grpcserver.New(svc)

    ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
    defer stop()

    g, gctx := errgroup.WithContext(ctx)

    g.Go(func() error {
        slog.Info("http listening", "addr", httpSrv.Addr)
        if err := httpSrv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
            return fmt.Errorf("http: %w", err)
        }
        return nil
    })
    g.Go(func() error {
        slog.Info("grpc listening", "addr", grpcLis.Addr())
        if err := grpcSrv.Serve(grpcLis); err != nil && !errors.Is(err, grpc.ErrServerStopped) {
            return fmt.Errorf("grpc: %w", err)
        }
        return nil
    })
    g.Go(func() error {
        <-gctx.Done()
        shutdownCtx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
        defer cancel()
        if err := httpSrv.Shutdown(shutdownCtx); err != nil {
            return fmt.Errorf("http shutdown: %w", err)
        }
        grpcSrv.GracefulStop()
        slog.Info("shutdown complete")
        return nil
    })

    return g.Wait()
}
```

What this gets right:

- `signal.NotifyContext` produces a cancellable context — no manual signal channel
- `errgroup.WithContext` cancels siblings on first error; you only need one source of truth for "stop"
- Each long-running goroutine has a single, obvious exit path
- Shutdown uses a fresh context with its own timeout, not the cancelled parent
- DB pool, tracer, and signal-stop are deferred in main, executing in reverse order

## 4. slog setup

```go
func setupLogger(cfg config.Config) {
    var h slog.Handler
    if cfg.Env == "production" {
        h = slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: cfg.LogLevel})
    } else {
        h = slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: cfg.LogLevel})
    }
    slog.SetDefault(slog.New(h).With("service", cfg.ServiceName, "version", cfg.GitSHA))
}

// middleware that adds request_id and route to every log line
func slogMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        rec := &statusRecorder{ResponseWriter: w, status: 200}
        rid := middleware.GetReqID(r.Context())

        defer func() {
            slog.LogAttrs(r.Context(), slog.LevelInfo, "http request",
                slog.String("method", r.Method),
                slog.String("path", r.URL.Path),
                slog.Int("status", rec.status),
                slog.Duration("duration", time.Since(start)),
                slog.String("request_id", rid),
            )
        }()
        next.ServeHTTP(rec, r)
    })
}
```

## 5. OTel tracing setup

```go
// internal/obs/tracing.go
package obs

import (
    "context"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
    semconv "go.opentelemetry.io/otel/semconv/v1.24.0"
)

func SetupTracing(ctx context.Context, serviceName, endpoint string) (func(context.Context) error, error) {
    if endpoint == "" {
        return func(context.Context) error { return nil }, nil
    }

    exp, err := otlptracegrpc.New(ctx, otlptracegrpc.WithEndpoint(endpoint), otlptracegrpc.WithInsecure())
    if err != nil { return nil, fmt.Errorf("otlp: %w", err) }

    res, err := resource.New(ctx,
        resource.WithAttributes(semconv.ServiceName(serviceName)),
    )
    if err != nil { return nil, fmt.Errorf("resource: %w", err) }

    tp := sdktrace.NewTracerProvider(
        sdktrace.WithBatcher(exp),
        sdktrace.WithResource(res),
        sdktrace.WithSampler(sdktrace.ParentBased(sdktrace.TraceIDRatioBased(0.1))),
    )
    otel.SetTracerProvider(tp)
    return tp.Shutdown, nil
}
```

In services, create spans for business operations:

```go
func (s *Users) Create(ctx context.Context, name string) (*domain.User, error) {
    ctx, span := otel.Tracer("users-service").Start(ctx, "Users.Create")
    defer span.End()
    span.SetAttributes(attribute.String("user.name", name))
    // ... work ...
}
```

Spans automatically inherit the parent (HTTP request span from `otelhttp`), so a single trace covers the full request from edge to database.
