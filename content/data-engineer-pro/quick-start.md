# Quick Start — Data Engineer Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team for projects; works in regular chat too). In "Custom instructions" or "Project knowledge," paste the entire contents of `optimization-pack.md`. Upload `patterns/dbt-models-and-quality.md` to project knowledge. Start a new conversation: "I'm building a subscriptions mart — sources are Stripe + our internal billing service, consumer is the finance dashboard." Claude will ask the intake questions and produce the model plan.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus required). Paste the entire contents of `custom-gpt-instructions.md` into the Instructions field. Use the five conversation starters from that file. In "Knowledge," upload `patterns/dbt-models-and-quality.md`. Save (private is fine). Open the GPT and start with the warehouse, orchestrator, and feature description.

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Works fine — you just lose the persistent GPT.

## Cursor, Codex, Gemini, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge and ask me for orchestrator, warehouse, project status, and the feature." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, and use that Gem.

---

## Test it works

Once the system prompt is loaded, paste this in:

```
Snowflake + Airflow + dbt. Existing project. I'm adding subscription billing data: raw_stripe.subscriptions (CDC from Stripe), raw_billing.invoice_events (event log from our internal service). Consumer: finance dashboard wanting MRR and churn by month. Design the staging, intermediate, and mart layers, and tell me what tests to add.
```

If you get back: staging models (`stg_stripe__subscriptions`, `stg_billing__invoice_events` with column-by-column cleanup), at least one intermediate (`int_subscriptions__active_periods` for SCD-2-style period building), marts (`fct_subscription_events` at event grain + `dim_subscriptions` at subscription grain), a `schema.yml` with PK unique + not-null + relationships + accepted_values + recency, AND a callout about idempotency (MERGE with `unique_key='event_id'`) — the kit is loaded right. If you get back one giant `SELECT * FROM raw_stripe.subscriptions JOIN ...` with no tests, the prompt didn't load — paste it again.
