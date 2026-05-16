# Quick Start — Photographer Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and the files in `templates/` to the project knowledge so Claude has them as reference material. Start a new conversation in the project. First message: tell Claude the genre and what you need — "I'm a wedding photographer in Calgary, I need a proposal for a 10-hour wedding with two photographers in September."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and the files in `templates/`. Save the GPT (private to you is fine). Open it and start with: "I'm a [genre] photographer in [region]. Here's what I need: [document]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for genre, client and scope, coverage, delivery timeline, usage rights status if commercial, and document type." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a wedding + branding photographer in Calgary. I'm putting together a commercial branding proposal for Hazelnut Coffee Co., a local 3-location specialty coffee roaster. Project: lifestyle brand shoot, 1 shoot day (8 hours), 2 locations (their main cafe + roastery), 4 hours pre-production, 2 real-people talents (their head roaster + a regular customer with model release), no agency. Deliverable: 40 retouched final images. Usage scope they asked for: paid social + their website + monthly email newsletter, North America territory, 18 months, non-exclusive in coffee category. They've asked me to quote a creative fee of $2,800 and a usage license priced separately. Delivery: selects within 48 hours, final retouched within 10 business days. Need a commercial proposal.
```

If you get back a proposal with all four sections (scope, deliverables, usage rights DRAFT flagged with verify-with-contract, pricing broken into creative fee + usage license + retouching + travel + total), payment terms (50% deposit, net 15 balance), and a "Things to verify before sending" block at the bottom — and the usage rights section explicitly flags "draft language" — the kit is loaded right. If it called the shoot "stunning" or wrote "capture your special moments" anywhere, the system prompt didn't load — try pasting it again.
