# Quick Start — Wedding Planning (DIY) Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and the `templates/` folder to project knowledge. Start a new conversation. First message: tell Claude your wedding date (or rough timeframe) and what you're working on — "We're getting married in May, budget is $35K CAD, need help building the allocation."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and the files from `templates/`. Save the GPT (private to you is fine). Open it and start with your wedding date and budget.

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me my wedding date and what I'm working on today." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of default chat.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. We're getting married September 12 next year in [city]. Budget is $30,000 CAD, contributed by us plus $8K from one set of parents. Aiming for 90 guests. Vibe: small, warm, food-forward, no big traditional moves. Build me a starting budget allocation with my priority being photo and food, then walk me through the buffer line.
```

If you get back a percentage-first allocation, with photo and food re-weighted up, an explicit 5-10% buffer line, and a "what to cut first" hint at the end, the kit is loaded right. If you see "your special day," "wedding of your dreams," "Pinterest-perfect," or a vendor recommended by name, the system prompt didn't load — paste it again.
