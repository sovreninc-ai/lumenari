# Quick Start — Node.js Backend Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `patterns/error-handling-and-observability.md` into the project knowledge so Claude has them as reference. Start a new conversation. First message: tell Claude your setup — "Node 22 LTS, ESM, Fastify, Drizzle on Postgres, deploying to Fly" — then describe what you're building.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `patterns/error-handling-and-observability.md`. Save the GPT (private to you is fine). Open it and start with: "Node 22 ESM, Fastify, Drizzle on Postgres, deploying to Fly. I want a new route."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Cursor, Codex, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me about my framework, runtime, DB layer, and deploy target." Once it does, you're set.

For Cursor specifically: drop `SKILL.md` at the root of your repo. Cursor's project rules pick it up.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Node 22 LTS, ESM, Fastify 5, Drizzle on Postgres, pino, deploying to Fly.io as a container. Build me a POST /webhooks/stripe handler: verify the Stripe signature, deduplicate by event id against a `processed_stripe_events` table, process inside a transaction. Then give me the Dockerfile and the graceful shutdown wiring.
```

If you get back: a Fastify route reading raw body (not parsed), HMAC verification with constant-time compare, a Zod schema for the event shape, an idempotency check against `processed_stripe_events` inside the same transaction as the side-effects, typed error classes mapped at a global error handler, pino logging with request id, a multi-stage Dockerfile running as non-root with `HEALTHCHECK` and `STOPSIGNAL SIGTERM`, and a `process.on("SIGTERM", ...)` block that closes the listener and the DB pool — the kit is loaded right.

If you get back `console.log` for logging, a single-stage Dockerfile, `app.use(bodyParser.json())` shoehorned into Fastify, or a webhook without idempotency, the system prompt didn't load — paste it again.
