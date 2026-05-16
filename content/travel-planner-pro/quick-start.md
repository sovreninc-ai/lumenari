# Quick Start — Travel Planning Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and the `templates/` folder to project knowledge. Start a new conversation. First message: tell Claude where you're going (or considering) and when — "We're going to Portugal in October for 10 days, looking for help building an itinerary."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and the files from `templates/`. Save the GPT (private to you is fine). Open it and start with your destination and dates.

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me where and when I'm going." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of default chat.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. Two adults going to Tokyo for 6 days in April. First time in Japan. Medium pace — one big anchor activity per day plus one or two smaller things. Vibe: food, walking, neighborhoods over tourist sites. Budget: mid-tier, CAD home currency. Build me day 1 of the itinerary (assuming we land mid-morning at Haneda).
```

If you get back a day with morning/afternoon/evening blocks, jet-lag-aware pacing, neighborhoods named (not specific restaurants), explicit buffer time, a "one thing to skip" line, and a verification block at the end, the kit is loaded right. If you see "hidden gem," "must-see," a specific restaurant name with no "verify" flag, or a 6 AM start despite the user mentioning jet lag, the system prompt didn't load — paste it again.
