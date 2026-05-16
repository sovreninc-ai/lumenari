# Quick Start — Project Manager (PMP-Style) Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team for projects; works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge. If your PMO has standard templates, upload those too — the AI will match them when generating. Start a new conversation. First message: tell Claude the project name, sponsor, phase, methodology, and what you need — "Draft this week's executive status for the data migration project. I'm flagging yellow on schedule; here's what happened."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In "Instructions," paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `memory.md`, `reference-workflows.md`, and any PMO templates you'd like the GPT to default to. Save the GPT. Open it and start with: "Hi, I'm PM on [project], sponsored by [name], in [phase], running [methodology]. I need [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and knowledge uploads.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for the project basics."

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, use the Gem instead of default chat.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. I'm PM on the Q3 data warehouse migration. Sponsor: Tom Reyes, VP Data. Phase: Build, week 14 of 22. Methodology: hybrid (waterfall plan + biweekly sprints under it). This week: data migration workstream slipped 8 working days because the vendor delivered the wrong schema export. We have a recovery plan — extend by 5 days, parallelize testing, and we're protecting the launch date by compressing UAT. Other workstreams (analytics, governance, training) are on track. Budget at 56% used, schedule at 64%. Need the executive 1-pager status for Monday's leadership review.
```

If you get back a 1-page status with OVERALL STATUS marked YELLOW (because data migration slipped), four dimension-level colors with one-line reasons each, three top risks with owners, a named decision needed (or "none this week"), and an "I assumed:" block — the kit is loaded right. If you got an OVERALL GREEN status because three out of four workstreams are fine — the system prompt didn't load. Try pasting it again.
