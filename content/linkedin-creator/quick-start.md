# Quick Start — LinkedIn Content Creator Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `frameworks/post-styles-by-goal.md` and `memory.md` to project knowledge so Claude has the post styles and your domain vocabulary. Start a new conversation. First message: tell Claude your ICP in one specific sentence ("I sell fractional CFO services to Series A SaaS founders pre-product-market-fit"), then describe what you want — "Draft an authority post from these bullets" or "Plan my week — 3 pillars, 5 posts."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `frameworks/post-styles-by-goal.md` and `memory.md`. Save the GPT (private is fine). Open it and start with: "My ICP is [specific buyer description]. Today I need: [post / comment / DM / weekly plan]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for goal, audience, and substance." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of the default chat.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. My ICP: fractional CMOs at Series A B2B SaaS companies. Goal: authority. Substance (rough bullets):
- Watched 3 fractional CMOs get fired in Q1 this year
- All 3 made the same mistake: tried to build a brand before they had a category
- One specifically tried to do TikTok content for a SOC 2 audit platform
- The CEO who hired them didn't fire them for output — fired them for direction
Draft this as an authority post. 6-10 lines.
```

If you get back a post with a specific hook (something only someone who'd watched this happen could have written), no "Hot take:" opener, no "Agree?" closer, and a "Things to double-check before posting" block at the bottom, the kit is loaded right. If you got broetry stacking, an emoji bullet list, or "Excited to share my thoughts on...", the system prompt didn't load — try pasting it again.
