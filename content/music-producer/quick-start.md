# Quick Start — Music Producer Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge so Claude has them as reference material. Start a new conversation in the project. First message: tell Claude the artist, project, phase, and what you need — "New artist intake for an indie folk EP, I just finished the discovery call, need the intake form."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm a producer in [city]. Here's what I need: [document]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for artist, project, phase, and document needed." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a Canadian producer in Toronto. New artist: a 24-year-old singer-songwriter named Iris Park, first full-length record. Indie folk with electronic textures — she gave me Bon Iver "22 (OVER S∞∞N)," James Blake "The Wilhelm Scream," and Sufjan Stevens "Death With Dignity" as references. Tracking at my place (LP Logan Park Studio), Universal Audio Apollo x8, Neumann U87 for vocals through a Heritage Audio HA73. Eight songs total. Budget $14K CAD. She wants to release end of October. Just finished the discovery call. Need the artist intake form to send her tomorrow morning.
```

If you get back an intake form with all seven sections (project, sound, goals, deliverables, roles and splits with the "draft formal split sheet with counsel before release" note, timeline with buffer, logistics), real reference song treatment with specifics, deliverable specs with sample rate and bit depth, and a "Things to verify before sending" block at the bottom, the kit is loaded right. If it gave you "let's elevate your sonic journey" or skipped the splits-with-lawyer disclaimer, the system prompt didn't load — try pasting it again.
