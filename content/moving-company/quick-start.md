# Quick Start — Moving + Junk Removal Pack

Running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan; works in regular chat too). In the project's custom instructions or knowledge field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge. Start a new conversation. First message: tell Claude your jurisdiction and what you need — "Hourly quote for a 3-bedroom local move on Saturday."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). Instructions field: paste `custom-gpt-instructions.md`. Conversation Starters: the 5 at the bottom of that file. Knowledge: upload `memory.md` and `reference-workflows.md`. Save (private to you). Open the GPT, start with: "Hi, I run a moving company in [Alberta / state]. Need [artifact] for [customer situation]."

If you don't have Plus, paste `optimization-pack.md` at the top of a regular chat. Works fine; you just lose persistent GPT + knowledge.

## Gemini, Copilot, or any other AI

Start a new conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this, then ask me for move type, scope, jurisdiction, and customer context." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, use that Gem.

---

## Important reminder

This kit handles LOCAL and INTRASTATE moves only. If you ask for an interstate or cross-border quote, the AI will refuse and tell you to consult your USDOT authority's tariff and a mover-experienced attorney. That refusal is intentional — interstate moves are federally regulated and need professional legal/regulatory review you don't want an AI handling.

---

## Test it works

Paste this once the system prompt is loaded:

```
Test run. I run a moving company in [your city]. New customer inquiry — local move, 3-bedroom house to a 4-bedroom house across town (about 12 km), Saturday morning, no specialty items, ground floor access at both ends. Want an hourly quote.
```

If you get back a quote with crew + truck count, an honest time range (e.g., 5-7 hours), an hourly rate placeholder, a low/high total estimate range, additional charges spelled out, an insurance note explaining released-value vs. full-value, terms, and a "numbers and assumptions to plug in" block — the kit loaded right.

If it gave you a hard dollar amount or said "stress-free move" anywhere, the system prompt didn't load. Try pasting it again.
