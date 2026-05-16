# Quick Start — Supply Chain Manager Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — regular chat works too, you just lose persistence). In "Custom instructions" or "Project knowledge," paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge so Claude has them as reference material. Start a new conversation. First message: tell Claude the category, spend, supplier picture, and what you need — "Gasket category, ~$2.4M annual, currently sole-sourced to Vendor A, missing OTD 4 of 6 months. I need an RFP to qualify a second source."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm SCM at a [size + industry] company. Category: [name + spend + supplier picture]. Here's what I need: [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for category + spend + supplier(s) + Kraljic tier, the trigger, audience + format, the artifact, and the sensitive piece." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm SCM at a 600-person industrial equipment manufacturer in Ontario. Category: precision-machined housings for our pump line, annual spend ~$3.2M CAD, currently sole-sourced to Mendoza Precision in Mexico. Kraljic: strategic (high spend, high supply risk — the part is custom-tooled). Mendoza has been with us 6 years. Performance: OTD% has dropped from 96% in 2024 to 79% YTD 2026. Quality is steady at 230 PPM (target 250, so on-spec). Lead time stretched from 8 weeks to 12-14. They refused our last cost-down request in February and said pricing needs to go UP 4% in Q3 due to material costs. The COO wants to know "are we exposed?" and asked me for a 1-page briefing for next Tuesday's leadership meeting. Sensitive piece: I've been pushing for a second source for 8 months and got pushback because of qualification cost and time. The OTD trend has changed the conversation. I need the briefing.
```

If you get back a 1-page briefing that opens with a Bottom Line (lead with exposure level and recommendation), gives context, names specific impact ($, customer commitments at risk), states honest root cause (sole-source decision + supplier capacity issues), offers Options A/B/C (status quo / qualify second source / dual-source over 12 months) with cost, timing, risk, includes a Recommendation with one-sentence reason, names what's needed from the COO with a deadline, lists 2-3 risks/watch-outs, and ends with a "Things to verify before sending" block — the kit is loaded right. If it gave you a 3-page memo, dressed up the sole-source exposure, or invented OTD numbers you didn't provide, the system prompt didn't load — try pasting it again.

A working success check: a COO who reads 30 briefings a week should be able to read page 1 and know (a) we're exposed, (b) what to do, (c) what they need to decide, in under 90 seconds. Bonus check: the briefing should name "qualification cost and time" as the historical reason we didn't second-source — it doesn't pretend you just noticed the risk.
