# Memory — Node.js Backend Pack

## Domain context

A backend engineer working in Node.js + TypeScript ships HTTP APIs, webhook receivers, and background workers. The deployment target is typically a container — Fly.io machines, Render web services, AWS ECS or App Runner, Railway, sometimes plain EC2 with a process manager. The service talks to Postgres (RDS, Neon, Supabase, Railway PG), often Redis (BullMQ queues, rate limits, caching), and emits structured JSON logs to stdout that get scraped by Datadog, Better Stack, Axiom, or CloudWatch.

The framework choice matters. Express still dominates by inertia but its async error handling is awkward and its perf is mediocre. Fastify is the modern default — faster, schema-first, async-correct out of the box. Hono is the edge/serverless choice — works on Cloudflare Workers, Bun, Deno, and Node via the same `Request`/`Response` API. A senior engineer picks the framework based on the runtime and the use case, not habit.

The expensive lessons here are: observability has to be designed in, not bolted on; webhooks must be idempotent because the sender will retry; graceful shutdown is mandatory in a container world because the orchestrator sends SIGTERM and gives you ~10-30s to drain; and secrets live in the deployment platform's secret store, never in code or in `.env` files in git.

## Vocabulary the AI should know

- ESM / CJS: ECMAScript modules vs CommonJS. Node 20+ supports both; ESM is the default for new projects (`"type": "module"` in package.json)
- pino: high-performance structured logger, JSON to stdout, ~5x faster than winston, the default for serious Node services
- AsyncLocalStorage: Node's built-in context propagation primitive; how you carry a request id through async boundaries without passing it as an argument
- OTel / OpenTelemetry: the vendor-neutral observability standard — traces, metrics, logs. `@opentelemetry/sdk-node` for auto-instrumentation
- Zod / Valibot: runtime schema validation libraries. Zod is the incumbent; Valibot is smaller and tree-shakeable
- Fastify: high-performance HTTP framework with JSON schema validation and proper async handling
- Hono: edge-first framework using web-standards `Request`/`Response`, runs on Node/Bun/Workers/Deno from one codebase
- Express: the legacy default; still works, but async errors require an explicit wrapper or a v5 upgrade
- Drizzle / Prisma / Kysely: typed SQL builders/ORMs for TypeScript. Drizzle is SQL-like + lightweight, Prisma is feature-rich + opinionated, Kysely is a pure query builder
- BullMQ: Redis-backed job queue, the standard for background work in Node
- pg / pg-pool: the `node-postgres` driver; almost everything uses a pool, never a single client
- SIGTERM / SIGINT: signals sent by container orchestrators on shutdown; your process must trap them and drain
- Healthcheck: `/healthz` (liveness — am I up?) and `/readyz` (readiness — can I serve traffic? upstream OK?)
- Idempotency key: client-provided id (e.g., `Idempotency-Key` header) that lets a server dedupe replays of the same request
- Webhook signature: HMAC of the payload with a shared secret, sent as a header (`Stripe-Signature`, `X-Hub-Signature-256`)
- Dead-letter queue (DLQ): where messages go after exhausting retries, for manual inspection
- Multi-stage Docker build: builder stage with devDeps + compile, runtime stage with only `dist/` + prod deps; halves image size

## Common workflows

- API route handler with Zod validation + typed errors: user wants a new endpoint. Trigger → define Zod schemas for params/query/body, write the route handler that validates input → call into a service function (framework-agnostic) → service throws typed errors (`NotFoundError`, `ForbiddenError`, etc.) → global error handler maps to HTTP status + safe body → write an integration test that hits the route with a real DB (testcontainers or a test database). Handler stays under 20 lines; logic lives in the service.
- Structured logging with pino + request-id propagation: user wants observability. Trigger → create `lib/logger.ts` with pino, redaction for `authorization`/`cookie`/`password`, level from env → middleware generates a request id (uuid or `crypto.randomUUID()`) and stores it in `AsyncLocalStorage` → every log call grabs the request id from ALS → request id is also returned in a response header (`X-Request-Id`) so support can correlate.
- Dockerfile + healthcheck setup: user is deploying. Trigger → multi-stage Dockerfile (builder: install deps + build TS; runtime: copy dist + prod deps only, run as non-root user) → `HEALTHCHECK` line pointing at `/healthz` → `STOPSIGNAL SIGTERM` → entrypoint script that traps SIGTERM and forwards to the Node process → `/healthz` returns 200 fast (no DB call) → `/readyz` checks the DB pool + critical upstreams.
- Idempotent webhook handler: user is integrating Stripe/GitHub/Shopify/etc. Trigger → verify HMAC signature first (constant-time compare), reject with 400 if invalid → read the event id from the payload → check a `processed_webhooks` table for that id (or Redis SETNX with TTL) → if seen, return 200 immediately (don't reprocess) → if new, process inside a transaction that also inserts the event id → on failure, return 500 so the sender retries.

## What to avoid / common mistakes

- `console.log` for production logging: it's unstructured, slow, and impossible to query at scale. Use pino from the start.
- `catch (e) { }` or `catch (_) { }`: silent failures that get noticed when revenue drops. Always log with context or re-throw with `cause`.
- `await` inside `forEach`: `forEach` doesn't await. Use `for...of` or `Promise.all(arr.map(...))` depending on whether you want sequential or parallel.
- Trusting third-party JSON: an API change at the vendor will break you at the deepest stack level if you don't validate. `safeParse` it at the boundary.
- Returning DB error messages to clients: leaks schema details. Map to a generic message; log the real error internally.
- Forgetting graceful shutdown: when SIGTERM arrives in a container, you have a deadline (default 10s on K8s, 30s on Fly). Stop the listener, drain in-flight, close DB pool, exit 0.
- Putting secrets in `.env` files committed to git: even in a private repo, secret scanning will find them. Use the platform's secret store (Render Secret Files, Fly secrets, AWS Secrets Manager) and only ever load through a validated env module.

## Tone / register

A senior Node engineer talks in concrete versions: "Node 22 LTS," "Fastify 5," "TypeScript 5.4," "Postgres 16." They acknowledge the framework wars without taking sides religiously — "Fastify here, but Hono if you're going to Workers." They know what their middleware does on the request path, in what order, and at what cost. They mention specific gotchas (Express body-parser limits, Fastify hook ordering, AsyncLocalStorage's interaction with promises). They write code comments that explain the why ("this catch is here because Stripe retries on 5xx within 5 minutes"), not the what. They don't say "just throw" — they say "throw a typed error and let the boundary map it."
