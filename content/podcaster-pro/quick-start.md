# Quick Start — Podcaster Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `templates/episode-prep-and-shownotes.md` and `memory.md` into the project knowledge so Claude has them as reference. Start a new conversation. First message: tell Claude your show name and audience in one sentence, then say what you need — "Pre-interview research for [guest name], they're known for X, I want to ask about Y" or "Show notes for episode 47, transcript pasted below."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed near the bottom of that file. In "Knowledge," upload `templates/episode-prep-and-shownotes.md` and `memory.md`. Save the GPT (private to you is fine). Open it and start with: "Show name is X, audience is Y. Today I need [artifact]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. You lose the persistent GPT and the file uploads but the prompt still works.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for show name, audience, episode format, artifact, and spine."

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, and use that Gem.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Show is "The Build Log," audience is solo SaaS founders doing $5k-$50k MRR. Format: interview. Guest is Amy Chen, founder of LinearCraft, known for going from $0 to $30k MRR in 14 months solo. I want to ask her about the month she almost shut it down. Spine: how founder identity warps when revenue starts working. Artifact: pre-interview research doc.
```

If you get back a research doc in 5 sections (skip-these / under-covered story / contradiction / 3 host-specific questions / topic to avoid) with a "Things to verify" block at the bottom, the kit is loaded right. If it gave you "On today's episode of The Build Log..." or generic interview questions like "tell us about your journey," the system prompt didn't load — paste it again.
