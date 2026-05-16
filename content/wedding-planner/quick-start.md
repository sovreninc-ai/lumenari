# Quick Start — Wedding Planner Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge so Claude has them as reference material. Start a new conversation in the project. First message: tell Claude your jurisdiction (state or province) and what you need — "I'm in Alberta, I need a day-of run-of-show for a 110-guest outdoor wedding at Banff Springs, Saturday 9/14, ceremony at 4:30."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm a wedding planner in [state/province]. Here's what I need: [document]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, couple/date/venue/guest count, service tier, and document type." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a wedding planner in Alberta. Wedding: Sarah & Jess Lee, Saturday October 4 2026, 120 guests, outdoor ceremony at Cornerstone Theatre in Canmore with reception in the adjacent banquet hall. Service tier: month-of coordination. We're 5 weeks out. Ceremony at 4:30 PM, sunset is 7:08. Photographer is Mountain & Maple Studio contracted 12-9 PM (9 hours), DJ is Sound North Productions contracted 4-11 PM, catering is Coup Catering serving family-style for 120, hair/makeup is Bridal Babes starting at 10 AM on site at the Malcolm Hotel. Bride is using mom's veil — sensitive. Bride's dad passed last year — first dance is with brother. Need the day-of run-of-show.
```

If you get back a run-of-show with key contacts, load-in table, back-timed ceremony, cocktail hour, reception, exit, vendor breakdown, AND a contingency section (weather backup with decision deadline, medical, family sensitivity flag) plus overtime triggers, with a "Things to verify before sending" block at the bottom, the kit is loaded right. If it skipped the contingency section or used the phrase "magical day," the system prompt didn't load — try pasting it again.
