# Quick Start — Cleaning Service Owner Pack

Up and running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for Projects; works in regular chat too). In the project's custom instructions or project knowledge field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge so Claude has the vocabulary and worked examples loaded. Start a new conversation. First message: tell Claude your jurisdiction and what you need — "Quote a new bi-weekly client, 3-bed 2-bath, family of 4 with a dog."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In Instructions, paste the entire contents of `custom-gpt-instructions.md`. Use the 5 conversation starters from the bottom of that file. Upload `memory.md` and `reference-workflows.md` to Knowledge. Save (private to you is fine). Open the GPT and start with: "Hi, I run a cleaning service in [Alberta / state]. Need [quote type or artifact] for [client]."

If you don't have Plus, paste `optimization-pack.md` at the top of a regular chat. Works fine — you just lose the persistent GPT and uploaded knowledge.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this, then ask me for quote type, property, jurisdiction, and client context." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions, save, use that Gem.

---

## Test it works

Paste this in once the system prompt is loaded:

```
Test run. I run a cleaning service in [your city]. New client inquiry — recurring bi-weekly, 4-bedroom 2.5-bath house, 2,400 sqft, two kids and one dog. They want first clean within two weeks. Quote them.
```

If you get back a quote with a scope per visit, a "NOT included in recurring" section, a first-visit-billed-as-deep-clean note, price placeholders, terms, and a "numbers and assumptions to plug in" block — the kit loaded right. If it gave you "sparkling clean" anywhere or a hard dollar quote, the system prompt didn't load. Try pasting it again.
