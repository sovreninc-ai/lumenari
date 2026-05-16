# Quick Start — Videographer / Filmmaker Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge so Claude has them as reference material. Start a new conversation in the project. First message: tell Claude the project, type, phase, and what you need — "Brand spot pitch for a Calgary craft brewery, I'm in the pitch phase, need a pitch deck."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm a videographer in [city]. Here's what I need: [document]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for project, type, phase, and document needed." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a Canadian videographer pitching a brand spot for a small craft brewery in Calgary. Budget tier $12K-15K CAD. They want a 60-second hero spot for their website and social, plus three 15-second cuts for Instagram and TikTok. Vibe: hands-on, warm, real people making real beer. References they like: the Patagonia "Worn Wear" series and that Heineken "The Boss" spot from a few years back. Shooting on Sony FX6 with Sigma primes. Want me to draft a pitch deck — full five-section structure. They want it by Friday.
```

If you get back a pitch deck with all five sections (problem, approach, references, price, next step), real camera and reference language (no "cinematic storytelling"), a price section with line items in CAD, and a "Things to verify before sending" block at the bottom, the kit is loaded right. If it gave you "we'll craft your stunning visual narrative" or hid the price in a paragraph, the system prompt didn't load — try pasting it again.
