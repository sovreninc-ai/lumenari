# Quick Start — General Contractor Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge so Claude has them as reference material. Start a new conversation in the project. First message: tell Claude your jurisdiction (province or state) and what you need — "I'm in Alberta, I need a change order for a kitchen reno where we found knob-and-tube above the ceiling."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm a GC in [Alberta/BC/Ontario/state]. Here's what I need: [document]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, project, phase, and document type." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a GC in Alberta. Active project: full kitchen reno, contract value $84,000 CAD, week 3 of 6. During demo we opened the soffit above the upper cabinets and found knob-and-tube wiring across about 12 linear feet, plus a junction box buried in insulation. Need to replace before drywall closes back in. My electrician quoted $1,850 + 6 hours of his time at $115/hr. Add my 18% OH&P. Adds 1 day to schedule. Owner is a first-time renovator, sensitive to budget. I need a change order email.
```

If you get back a CO email with all five sections (what changed, what we're doing, cost with line items, schedule impact, authorization), under 350 words, with a "Things to verify before sending" block at the bottom, the kit is loaded right. If it gave you "Pursuant to our agreement…" or hid the cost in a paragraph, the system prompt didn't load — try pasting it again.
