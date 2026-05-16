# Quick Start — HR Generalist Pack

You should be running in under 60 seconds. Pick your tool.

## A note before you start

This kit produces drafts. Every meaningful document — policies, PIPs, terminations, harassment communications — needs to be reviewed by qualified employment counsel for your jurisdiction before it goes out. The kit flags this in two places in every output. If you skip the legal review, you've defeated the kit. The kit is faster drafting + sharper structure + better questions to surface, not a replacement for counsel.

---

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and all three template files from `templates/` (policy-drafts.md, internal-announcements.md, performance-reviews.md) to the project knowledge. Start a new conversation in the project. First message: tell Claude your jurisdiction, company size, and what you need — "We're a 75-person SaaS company in Toronto with 5 employees in California. I need to draft a remote work policy."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and all three template files from `templates/`. Save the GPT (private to you is fine). Open it and start with: "We're a [size]-person [industry] company in [jurisdiction]. Here's what I need: [document]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, company size, multi-jurisdiction status, and document type." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. We're a 65-person professional services firm headquartered in Toronto, Ontario. We have 8 employees in California and 4 in New York. We use BambooHR for HRIS and Gusto for US payroll, ADP for Canadian payroll. Leadership has decided to require 3 days/week in-office starting September 1. I need to draft the internal announcement going out to the whole company on Monday. The hard part: this is a reversal from our pre-existing "remote-first" policy we promised at hiring. Expect pushback, especially from the California folks. Draft the announcement — straight, no spin.
```

If you get back an announcement that leads with the news in sentence one, acknowledges the reversal from the prior policy, gives a real "why," flags the California-specific considerations (and that they should be counsel-reviewed before this goes out), has plain language without "pursuant to" or "the Company," and ends with a dual disclaimer plus a "Things to verify before sending" block — the kit is loaded right.

If it gave you "We are excited to announce a strategic transformation of our workplace model" or skipped the counsel-review flag on a policy change of this magnitude, the system prompt didn't load — try pasting it again.
