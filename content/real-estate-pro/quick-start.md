# Quick Start — Real Estate Listings + Market Analysis

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload the files in `templates/` to the project knowledge so Claude has them as reference. Start a new conversation in the project. First message: tell Claude your jurisdiction (state or province), then describe the artifact you want — "I need MLS public remarks for a 3-bed condo in [neighborhood]" or "Run a CMA on this property, comps coming in next message."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload the markdown files from the `templates/` folder. Save the GPT (private to you is fine). Open it and start with: "Hi, I'm a [state/province] agent. Here's what I need today: [artifact]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction and artifact type." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of the default chat.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. I'm a licensed agent in [your state or province]. I need MLS public remarks for a single-family home: 4 beds, 3 baths, 2,400 sqft, built 2018, on a 0.18 acre corner lot in [your neighborhood]. Features: chef's kitchen with island, finished basement, fenced yard, two-car garage with EV charger. Likely buyer: move-up family from a townhouse, wants outdoor space. 900 character limit.
```

If you get back a listing in the structure (lead → layout → features → location → close), under 900 characters, with a "Things to verify before publishing" block at the bottom, the kit is loaded right. If it gave you "Welcome home!" or "This stunning property boasts" anywhere in the output, the system prompt didn't load — try pasting it again.
