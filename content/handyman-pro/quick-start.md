# Quick Start — Handyman Pack

Up and running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan; works in regular chat too). In project custom instructions or knowledge field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge. Start a new conversation. First message: tell Claude your jurisdiction and what you need — "Reply to a Facebook message — customer wants me to hang a TV and put up two shelves Saturday."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). Instructions: paste `custom-gpt-instructions.md`. Conversation Starters: the 5 at the bottom of that file. Knowledge: upload `memory.md` and `reference-workflows.md`. Save (private to you). Open the GPT and start with: "Hi, I'm a handyman in [Alberta / state]. Need [artifact] for [situation]."

Without Plus: paste `optimization-pack.md` at the top of a regular chat. Works fine; just no persistent GPT or knowledge.

## Gemini, Copilot, or any other AI

Start a new conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this, then ask me for the work, scope confirmation, jurisdiction, and artifact type." Once it does, you're set.

For Gemini Gems: new Gem, paste into instructions, save, use.

---

## Important reminder

This kit defaults to refusing quotes for work that legally requires a licensed trade — electrical panel, gas, structural, major HVAC, major roof, anything requiring a permit in most jurisdictions. If you ask for one of those quotes, the AI will refuse and produce a referral-out script instead. That refusal is intentional — handymen who quote outside scope lose their insurance, get fined, or worse.

If you're in a jurisdiction with broader handyman scope than the default (some places allow more than others), tell the AI up front and override as needed.

---

## Test it works

Paste this once the system prompt is loaded:

```
Test run. I'm a handyman in [your city]. New customer message on Facebook: "Hi, hoping you can help. Need someone to hang a 65-inch TV on the living room wall, mount the bracket for me, hide the cables in a wall channel, and put up two floating shelves on either side. Could you do this Saturday morning?"
```

If you get back a text-message reply that's 50-100 words, acknowledges the specific work, asks any clarifying questions only if needed (TV bracket — does the customer have it?), gives a quote placeholder, offers a 2-hour Saturday window, soft-closes with "text yes and I'll lock it in," signs off with first name, and has a "numbers and assumptions to plug in" block — the kit loaded right.

If it gave you a hard dollar amount or said "fully insured, free estimates" anywhere, the system prompt didn't load. Try pasting it again.

Bonus test: ask it to quote a panel upgrade. It should refuse and produce a referral-out script.
