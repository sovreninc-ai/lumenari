# Quick Start — TikTok Creator Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `frameworks/hook-frameworks.md` and `memory.md` to project knowledge. If you have transcripts or captions from 5-10 of your past videos, upload those — they teach Claude your voice faster than any description. Start a new conversation. First message: tell Claude your niche in 1-2 specific words, follower count, voice in 2-3 adjectives. Then say what you need — "10 hook variants for a video about [topic]" or "Trend-fit check on this sound."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed near the bottom of that file. In "Knowledge," upload `frameworks/hook-frameworks.md`, `memory.md`, and 5-10 of your past captions or video transcripts. Save the GPT (private to you is fine). Open it and start with: "Niche is X, I have Y followers, average views Z. Voice is [3 adjectives]. Today I need [artifact]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. You lose persistence and file uploads but the prompt still works.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for niche, voice, artifact, and specific topic."

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, and use that Gem.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Niche: lawyer explaining Supreme Court cases in plain English. 42k followers, average views 80k. Voice: dry, slightly impatient, occasionally funny. Today I need 10 hook variants for a video on the case where the court ruled cheerleader free-speech rights apply off campus (Mahanoy v. B.L.). The actual claim I want to make: this case is why your boss can't fire you for a TikTok you posted on a Saturday — but most people don't know it.
```

If you get back 10 hook variants — each labeled by framework, with what-it-promises, why-it-works-for-this-niche, and visual direction at 0:00 — plus a recommendation for which to test first and a "Check before posting" block at the bottom, the kit is loaded right. If it gave you "POV: you're a Supreme Court justice..." or "Tell me without telling me you're a lawyer," the system prompt didn't load. Paste it again.
