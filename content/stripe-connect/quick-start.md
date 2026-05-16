# Quick Start — Stripe Connect Implementation Pack

You'll be running in under a minute.

## ChatGPT, Claude (web), or Gemini

1. Open the tool
2. Paste the contents of `optimization-pack.md` into the system prompt / custom instructions / project knowledge field
3. Start asking it to design your Stripe Connect flows — onboarding, charges, refunds, webhooks

## Claude Code, Cursor, or Codex (SKILL.md path)

1. Open Terminal (or your code editor)
2. Drop the kit folder into `~/.claude/skills/stripe-connect/` (Claude Code) or paste `SKILL.md` at your project root (Cursor / Codex)
3. Type what you want — Claude picks up the skill automatically

## Test it works

Paste: "Write the webhook handler for `checkout.session.completed` with idempotency for my Stripe Connect platform."

If you get back a handler that verifies the signature, checks a `processed_events` table for the event.id, processes in a try/catch, and only marks-as-processed after success — the kit is loaded right.
