# Quick Start — Internal Recruiter Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md`, `reference-workflows.md`, and the files in `templates/` to project knowledge so Claude has them as reference. Start a new conversation. First message: tell Claude your jurisdiction (US state or Canadian province), your role context, and what you need — "I'm in California, hiring a Senior Product Designer, comp band approved $170-200k base + equity, I need intake notes from my meeting with the hiring manager yesterday."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md`, `reference-workflows.md`, and the files in `templates/`. Save the GPT (private to you is fine). Open it and start with: "I'm an internal recruiter at a [stage/size] company in [state/province]. Here's the req and what I need: [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, role + level, comp band status, artifact needed, and what the HM said that's making this hard." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm an internal recruiter at a 600-person SaaS in NYC. Hiring a Senior Backend Engineer, fully remote US. Comp band APPROVED by HRBP yesterday: $180-215k base + 0.05-0.10% equity + standard benefits, sign-on tolerance $15k. Hiring manager is Priya Rao, Director of Engineering, second time using me as her recruiter (first was a year ago, went well). Backfill — previous engineer left for a competitor. The thing Priya said in intake that's making this hard: "I want someone who's been on call for production at 3 AM and didn't quit the next week, but I also want someone who can think a few weeks ahead, not just react." Now write me the intake notes document I'm going to send Priya for sign-off.
```

If you get back intake notes in the structured format (business context, scope, must-haves as observable behaviors, nice-to-haves, deal-breakers, comp band with approval date, sourcing approach, loop design, scorecard, the thing the HM didn't say, urgency, sign-off line), with the "3 AM resilience + forward thinking" tension captured as part of the must-haves OR in "the thing the HM didn't say," with a "Things to verify before sending" block and an "Inclusive-language audit: passed" line and a "Comp band confirmed approved: yes (HRBP, [date])" line — the kit is loaded right.

If it gave you generic intake notes ("candidate should be experienced and a team player"), or skipped the comp-band confirmation line, or used "rockstar" / "passionate" / "fast-paced" anywhere — the system prompt didn't load. Try pasting it again.
