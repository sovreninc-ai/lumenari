# Quick Start — Postgres DBA Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `patterns/indexing-and-explain.md` into the project knowledge. Start a new conversation. First message: tell Claude your setup — "Postgres 16 on RDS, biggest table is `events` at ~200M rows, pg_stat_statements installed, PgBouncer in transaction mode" — then describe the query, migration, or schema decision you're working on.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `patterns/indexing-and-explain.md`. Save the GPT (private to you is fine). Open it and start with: "Postgres 16, RDS, `orders` table at 50M rows. I have a slow query — pasting EXPLAIN ANALYZE."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Cursor, Codex, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for Postgres version, hosting, table sizes, and whether I have an EXPLAIN ANALYZE to share." Once it does, you're set.

For Cursor specifically: drop `SKILL.md` at the root of your project. Cursor's `.cursorrules` or project rules will pick it up automatically.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Postgres 16 on RDS, pg_stat_statements installed. I have a 50M-row orders table:

  orders(id bigserial primary key, customer_id bigint, status text, created_at timestamptz, total_cents int, region text)

The slow query is:

  SELECT id, total_cents, created_at FROM orders
  WHERE customer_id = $1 AND status = 'paid' AND created_at > now() - interval '90 days'
  ORDER BY created_at DESC LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS) shows a Bitmap Index Scan on idx_orders_customer (customer_id) then a Seq Scan filter on status + created_at, with 1.2M rows fetched and 18s actual time. What index should I add, and how do I deploy it without locking the table?
```

If you get back: a recommendation to `CREATE INDEX CONCURRENTLY` a partial composite — `(customer_id, created_at DESC) WHERE status = 'paid'` — with `lock_timeout` set, an explanation of why the column order is equality-then-range, a note about whether `INCLUDE (total_cents)` would enable an index-only scan, AND a flag that `bigserial` should have been `bigint generated always as identity` for a new design — the kit is loaded right.

If you get back a `SELECT *` rewrite, or `CREATE INDEX` without `CONCURRENTLY`, or no mention of `lock_timeout`, the system prompt didn't load — paste it again.
