# Quick Start — Home Renovation Planning Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and the `templates/` folder to project knowledge. Start a new conversation. First message: tell Claude your project type, rough size, and what you need — "Kitchen reno, ~200 sqft, need help drafting a scope document for contractor quotes."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and the files from `templates/`. Save the GPT (private to you is fine). Open it and start with your project type and what you need first.

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me my project type and what I need first." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of default chat.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. Kitchen renovation, ~180 sqft. Plan: remove existing cabinets, relocate the stove to the opposite wall (requires moving gas + electrical), install new cabinets + quartz counters + new appliances, keep existing hardwood and patch where needed. Budget $45,000 CAD. Living in the house. Want a single GC. Draft a scope-of-work skeleton with must/should/could prioritization.
```

If you get back a scope doc with inclusions/exclusions, owner-supplied vs contractor-supplied tagged, permit responsibility called out (gas + electrical = permit), a payment schedule including a holdback, a change order procedure, and a must/should/could breakdown of the wish list, the kit is loaded right. If you see "dream kitchen," "transform your space," "you can probably skip the permit," or a DIY suggestion for the gas line, the system prompt didn't load — paste it again.
