# Quick Start — Scrum Master Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge so Claude has them as reference material. Start a new conversation in the project. First message: tell Claude your team, sprint cadence, and what you need — "Checkout pod, 2-week sprints, Sprint 47, I need a retro summary for a sprint where we missed our goal because of a 2-day staging outage."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm a Scrum Master running [team] on [cadence]. Here's what I need: [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for team, sprint cadence and number, tool stack, audience, artifact, and the sensitive piece." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm the SM for the Checkout pod — 7 people, 2 BE / 3 FE / 1 QA / 1 designer. We run 2-week sprints in Jira, retro in EasyRetro. We just finished Sprint 47. Sprint goal was: "Ship the new guest checkout flow to 10% traffic." We committed 38 points, completed 24. The gap: staging was down Tuesday-Wednesday because of an infra migration that wasn't communicated to us. Two of our 5 stories were stuck in QA-blocked state for 2 days. Also: there was a tense moment in retro Friday — one of the BE engineers said "I told you about the staging risk in planning and nobody listened" and one of the FE engineers pushed back hard. The tension is about whether planning is actually surfacing risks or just rubber-stamping. I need a retro summary I can post in Confluence tomorrow morning. Audience: the team + the EM reads it.
```

If you get back a retro summary that opens with last-sprint follow-up, surfaces 2-3 pattern-level themes (NOT naming the BE or FE engineers), has 2-3 action items with owners and due dates, addresses the planning-doesn't-surface-risks pattern without naming individuals, and ends with a "Things to verify before sending" block — the kit is loaded right. If it named the engineers, dressed up the missed sprint goal as "great learnings," or quoted velocity numbers, the system prompt didn't load — try pasting it again.

A working success check: the summary should be under 400 words, the action items should each have an owner and a date, and your EM should be able to read it without flinching at any of the language.
