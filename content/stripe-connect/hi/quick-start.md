# Quick Start — Stripe Connect Implementation Pack

आप एक minute से कम में चल रहे होंगे।

## ChatGPT, Claude (web), या Gemini

1. Tool open करें
2. `optimization-pack.md` के contents को system prompt / custom instructions / project knowledge field में paste करें
3. अपने Stripe Connect flows design करने को कहना शुरू करें — onboarding, charges, refunds, webhooks

## Claude Code, Cursor, या Codex (SKILL.md path)

1. Terminal (या अपना code editor) open करें
2. Kit folder को `~/.claude/skills/stripe-connect/` (Claude Code) में drop करें या अपने project root पर `SKILL.md` paste करें (Cursor / Codex)
3. जो चाहिए वो type करें — Claude skill को automatically pick up करता है

## Test करें कि काम कर रहा है

Paste करें: "Write the webhook handler for `checkout.session.completed` with idempotency for my Stripe Connect platform."

अगर आपको ऐसा handler वापस मिले जो signature verify करता है, `processed_events` table को event.id के लिए check करता है, try/catch में process करता है, और success के बाद ही marks-as-processed करता है — kit सही से loaded है।
