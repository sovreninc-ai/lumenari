# Quick Start — Blogger / SEO Site Owner Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `playbooks/pillar-content-and-monetization.md` and `memory.md` to project knowledge so Claude has your templates and vocabulary. If you have a content map (list of existing articles + target keywords + URLs), upload that too. Start a new conversation. First message: tell Claude your niche in one specific sentence ("I run a backpacking gear site, 180k pageviews/month, monetized through Raptive + REI/Amazon affiliate"), then describe what you want — "Build a pillar brief for 'best 4-season tent under $500'" or "Draft this affiliate roundup."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `playbooks/pillar-content-and-monetization.md` and `memory.md` (plus your content map if you have one). Save the GPT (private is fine). Open it and start with: "My niche is [specific vertical]. I run [traffic level] pageviews/month, monetize through [ad network + affiliate programs]. Today I need: [brief / draft / refresh / linking audit]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for keyword, SERP context, and first-hand experience." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of the default chat.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. My niche: backpacking gear site, ~180k pageviews/month, Raptive + REI/Amazon affiliate. Target keyword: "best camping coffee maker for backpacking" — commercial-investigation intent. SERP context: top 3 are big-publisher listicles (REI, Outdoor Gear Lab, Switchback Travel), positions 4-6 are Reddit threads, no niche site is ranking in top 10. First-hand experience: I've used the GSI Java Drip for 3 seasons, the Aeropress Go for 2 seasons, the Wacaco Pipamoka for 1 season. I have not tested the Soto Helix. Monetization: affiliate roundup with 5-7 products, display ad structure, 2,200-2,800 words. Build the pillar brief.
```

If you get back a brief with: a SERP map naming the actual ranking competitors, an H2 outline that addresses the Reddit-thread coverage gap, an internal linking section asking for your content map, a monetization plan with ad section breaks every 300-500 words, and a "first-hand specifics the user must add" list flagging the Soto Helix as needing third-person treatment — the kit is loaded right. If you got generic "Here are the top 7 camping coffee makers!" with no SERP awareness and every product getting equal praise, the system prompt didn't load — try pasting it again.
