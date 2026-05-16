# Quick Start — Talent Acquisition Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md`, `reference-workflows.md`, and the files in `templates/` to the project knowledge so Claude has them as reference. Start a new conversation in the project. First message: tell Claude your jurisdiction (US state or Canadian province — matters for pay-transparency) and what you need — "I'm in California, comp band approved, need a Boolean string for Staff Backend Engineer with distributed systems depth."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md`, `reference-workflows.md`, and the files in `templates/`. Save the GPT (private to you is fine). Open it and start with: "I'm a TA specialist at a [stage/size] company in [state/province]. Here's what I need: [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, role + seniority, comp band status, and artifact needed." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a TA specialist at a 400-person Series C SaaS company, HQ in NYC, hiring fully-remote-US. Comp band approved: $180-220k base + 0.05-0.12% equity. Role: Staff Data Engineer, IC track, ~8 years experience. Hiring manager is Maya Chen (Director of Data Platform). Her actual priority: someone who's debugged a Kafka consumer dropping messages in production at scale, NOT just someone with the keywords. We just laid off 12% last quarter — public knowledge. Write me a 3-message LinkedIn outreach cadence for senior IC candidates I've identified.
```

If you get back three messages, the first under 4 sentences, each with one specific reason / one tied benefit / one soft ask, with the layoff acknowledged honestly somewhere (not papered over), with NO "rockstar" / "passionate" / "I came across your impressive background," and ending with a "Things to verify before sending" block plus an "Inclusive-language audit: passed" line — the kit is loaded right.

If it gave you "I came across your impressive background and was struck by your experience" or papered over the layoff or wrote outreach over 4 sentences, the system prompt didn't load — try pasting it again.
