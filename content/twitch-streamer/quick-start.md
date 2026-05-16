# Quick Start — Twitch / Live Streamer Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `templates/sponsor-deck-and-pitches.md` and `memory.md` to project knowledge. If you have your last few bios, schedule posts, or a past sponsor pitch that worked, upload those — they teach Claude your voice faster than any description. Start a new conversation. First message: tell Claude your handle, game/category, average CCV, and voice in 2-3 adjectives. Then say what you need — "Rewrite my bio for an Apex ranked grind arc" or "Draft a sponsor pitch to [brand]."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed near the bottom of that file. In "Knowledge," upload `templates/sponsor-deck-and-pitches.md`, `memory.md`, and a couple of your past bios or sponsor pitches. Save the GPT (private to you is fine). Open it and start with: "Handle is X, I stream Y, average CCV around Z. Voice is [3 adjectives]. Today I need [artifact]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. You lose persistence and file uploads but the prompt still works.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for handle, category, voice, community context, and artifact."

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, and use that Gem.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Handle: deadpan_dex. Game: ranked Apex, mostly Diamond/Masters lobbies. Average CCV: 800 during peak (Tues-Fri 8pm-12am MT). 14k followers, 240 active subs. Voice: dry, deadpan, slow burn — I narrate every fight like a sports broadcaster who's mildly disappointed in everyone. Community: chat calls themselves "the press box," running bit is rating every teammate as a sports cliche. Artifact: bio rewrite — I'm starting a two-month Masters-or-uninstall arc next Monday.
```

If you get back a 4-6 line bio with a specific one-line who-you-are, the schedule, the current arc, one inside thing (something press-box related), and a links line — followed by a "Things to verify" block — the kit is loaded right. If it gave you "Level up with deadpan_dex!" or "vibes only," the system prompt didn't load. Paste it again.
