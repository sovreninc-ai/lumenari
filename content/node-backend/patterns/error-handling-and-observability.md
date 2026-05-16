# Error handling & observability patterns

Five patterns you'll reach for on every Node service: typed error classes, pino with redaction, request-id propagation via AsyncLocalStorage, OTel tracing, and an idempotent webhook handler.

## 1. Typed error classes

```ts
// src/lib/errors.ts
export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends AppError { constructor(code: string, msg = code) { super(code, msg, 400); } }
export class UnauthorizedError extends AppError { constructor(code: string, msg = code) { super(code, msg, 401); } }
export class ForbiddenError extends AppError    { constructor(code: string, msg = code) { super(code, msg, 403); } }
export class NotFoundError extends AppError     { constructor(code: string, msg = code) { super(code, msg, 404); } }
export class ConflictError extends AppError     { constructor(code: string, msg = code) { super(code, msg, 409); } }
export class InternalError extends AppError     { constructor(code: string, msg = code, opts?: ErrorOptions) { super(code, msg, 500, opts); } }
```

Services throw these. Routes don't catch them. A single error handler at the framework level maps them to HTTP:

```ts
// src/app.ts (Fastify)
import Fastify from "fastify";
import { ZodError } from "zod";
import { AppError, BadRequestError } from "./lib/errors.js";

export function buildApp() {
  const app = Fastify({ logger: false }); // we wire pino ourselves

  app.setErrorHandler((err, req, reply) => {
    if (err instanceof ZodError) {
      req.log.warn({ err, requestId: req.id }, "validation failed");
      return reply.status(400).send({ error: { code: "validation_failed", issues: err.issues } });
    }
    if (err instanceof AppError) {
      req.log.warn({ err, code: err.code }, "app error");
      return reply.status(err.status).send({ error: { code: err.code, message: err.message } });
    }
    // unexpected — never leak details
    req.log.error({ err }, "unhandled error");
    return reply.status(500).send({ error: { code: "internal_error" } });
  });

  return app;
}
```

For Hono:

```ts
app.onError((err, c) => {
  if (err instanceof ZodError) return c.json({ error: { code: "validation_failed", issues: err.issues } }, 400);
  if (err instanceof AppError) return c.json({ error: { code: err.code, message: err.message } }, err.status);
  c.var.log.error({ err }, "unhandled error");
  return c.json({ error: { code: "internal_error" } }, 500);
});
```

## 2. pino with redaction + serializers

```ts
// src/lib/logger.ts
import pino from "pino";
import { getRequestId } from "./request-id.js";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      'req.headers["x-api-key"]',
      "*.password",
      "*.token",
      "*.secret",
    ],
    censor: "[REDACTED]",
  },
  serializers: {
    err: pino.stdSerializers.err,
    req: (req) => ({ method: req.method, url: req.url, id: req.id }),
  },
  mixin() {
    // pulls request id from AsyncLocalStorage so every log line carries it
    const rid = getRequestId();
    return rid ? { requestId: rid } : {};
  },
  formatters: {
    level(label) { return { level: label }; }, // string level, not numeric
  },
});
```

In dev, pipe through `pino-pretty` via a separate script — never bundle it into production.

## 3. Request id via AsyncLocalStorage

```ts
// src/lib/request-id.ts
import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";

const storage = new AsyncLocalStorage<{ requestId: string }>();

export function getRequestId(): string | undefined {
  return storage.getStore()?.requestId;
}

export async function runWithRequestId<T>(requestId: string, fn: () => Promise<T>): Promise<T> {
  return storage.run({ requestId }, fn);
}

export function makeRequestId(incoming?: string | string[]): string {
  if (typeof incoming === "string" && incoming.length > 0 && incoming.length < 200) return incoming;
  return randomUUID();
}
```

Wire it into Fastify as a hook:

```ts
// src/app.ts
app.addHook("onRequest", (req, reply, done) => {
  const rid = makeRequestId(req.headers["x-request-id"]);
  reply.header("x-request-id", rid);
  runWithRequestId(rid, async () => {
    done();
  });
});
```

(For Hono: middleware that wraps `await next()` in `runWithRequestId`.)

Now every `logger.info(...)` anywhere in the call tree carries the request id automatically — no threading it through arguments.

## 4. OpenTelemetry tracing

```ts
// src/tracing.ts -- MUST be imported before any network-touching module
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? "api",
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.GIT_SHA ?? "dev",
  }),
  traceExporter: process.env.OTEL_EXPORTER_OTLP_ENDPOINT
    ? new OTLPTraceExporter()
    : undefined, // no exporter in dev = no shipping, but spans still get created
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": { enabled: false }, // very noisy
    }),
  ],
});

sdk.start();

process.on("SIGTERM", async () => {
  try { await sdk.shutdown(); } catch { /* ignore */ }
});
```

And in `src/index.ts`:

```ts
import "./tracing.js"; // FIRST — before any other import that hits the network
import { buildApp } from "./app.js";
import { logger } from "./lib/logger.js";
import { env } from "./config/env.js";
import { db } from "./db/client.js";

const app = buildApp();

const server = await app.listen({ port: env.PORT, host: "0.0.0.0" });
logger.info({ port: env.PORT }, "listening");

const shutdown = async (signal: string) => {
  logger.info({ signal }, "shutdown initiated");
  await app.close();
  await db.end();
  logger.info("shutdown complete");
  process.exit(0);
};
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
```

## 5. Idempotent webhook handler

```ts
// src/routes/stripe-webhook.ts
import type { FastifyInstance } from "fastify";
import Stripe from "stripe";
import { env } from "../config/env.js";
import { db } from "../db/client.js";
import { processedStripeEvents } from "../db/schema.js";
import { handleStripeEvent } from "../services/stripe.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function stripeWebhookRoute(app: FastifyInstance) {
  app.post(
    "/webhooks/stripe",
    {
      config: { rawBody: true }, // configure fastify-raw-body plugin
    },
    async (req, reply) => {
      const sig = req.headers["stripe-signature"];
      if (typeof sig !== "string") return reply.status(400).send({ error: { code: "missing_signature" } });

      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(req.rawBody!, sig, env.STRIPE_WEBHOOK_SECRET);
      } catch (err) {
        req.log.warn({ err }, "stripe signature verification failed");
        return reply.status(400).send({ error: { code: "invalid_signature" } });
      }

      // Idempotent process: insert the event id; on conflict, short-circuit.
      try {
        await db.transaction(async (tx) => {
          const inserted = await tx
            .insert(processedStripeEvents)
            .values({ id: event.id, type: event.type, createdAt: new Date() })
            .onConflictDoNothing()
            .returning({ id: processedStripeEvents.id });

          if (inserted.length === 0) {
            req.log.info({ stripeEventId: event.id }, "duplicate webhook ignored");
            return;
          }

          await handleStripeEvent(tx, event);
        });
      } catch (err) {
        req.log.error({ err, stripeEventId: event.id }, "webhook processing failed");
        return reply.status(500).send({ error: { code: "processing_failed" } });
      }

      return reply.status(200).send({ ok: true });
    },
  );
}
```

What this gets right:

- Raw body for signature verification — parsing first breaks the HMAC
- Constant-time HMAC compare lives inside `stripe.webhooks.constructEvent`
- Event id insert + side-effects in the same transaction — atomic
- `onConflictDoNothing` makes replays cheap and safe
- 5xx on retryable failure, 4xx only on permanent (bad signature)
- Request id is in every log line via ALS

Stripe retries on 5xx for ~3 days. Your idempotency layer makes that safe.
