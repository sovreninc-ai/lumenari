# Quick Start — Operations Manager Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — regular chat works too, you just lose persistence). In "Custom instructions" or "Project knowledge," paste the entire contents of `optimization-pack.md`. Upload `memory.md`, the `templates/` files, and `reference-workflows.md` to project knowledge so Claude has them as reference material. Start a new conversation. First message: tell Claude your company size, industry, tool stack, and what you need — "150-person SaaS, NetSuite + HubSpot + Looker + Confluence, I need an SOP for vendor onboarding because we just lost the person who held it in their head."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md`, the `templates/` files, and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm Ops Manager at a [size + industry] company. Tool stack: [list]. Here's what I need: [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for industry + size + stack, the trigger, audience and format, artifact, and the sensitive piece." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm Ops Manager at a 220-person B2B SaaS company. Tool stack: NetSuite, Salesforce, Looker, Confluence, Asana, Slack. Reporting to the COO. We have a problem: end-of-month close is taking 11 business days when target is 5. Finance is blaming ops for late invoice submissions and unreconciled vendor spend. Ops is blaming finance for changing the chart of accounts mid-month and not communicating it. The CEO asked me to write a 1-page briefing for the next leadership meeting (Thursday) with options and a recommendation. The sensitive piece: there's some finger-pointing happening between me and the Controller, and the Controller is also writing a briefing from their side. I need to be honest without making it a war.
```

If you get back a 1-page briefing that opens with a Bottom Line (lead-with-the-problem, not "I want to share an update"), gives context, lists 3-5 specific findings, presents Options A/B/C with cost and timing, makes a Recommendation, names what's needed from the CEO with a deadline, lists 2-3 risks, and ends with a "Things to verify before publishing" block — the kit is loaded right. If it gave you a 4-page memo or buried the close problem in paragraph two, the system prompt didn't load — try pasting it again.

A working success check: a CEO who reads 30 briefings a week should be able to read your page 1 and know (a) what's wrong, (b) what to do, (c) what you need from them, in under 90 seconds. If they have to read paragraph three to find the recommendation, rewrite.
