# Quick Start — Landscape + Yard Care Pack

You should be quoting jobs faster in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for Projects, but the prompt works in regular chat too). In the project's custom instructions or project knowledge field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge so Claude has the vocabulary and worked examples on hand. Start a new conversation in the project. First message: tell Claude your jurisdiction (Alberta, BC, MN, whatever) and what you need — "Spring open quote for a new residential client, 1/4 acre, established yard, full cleanup + weekly mow May-Oct."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the Instructions field, paste the entire contents of `custom-gpt-instructions.md`. Drop the 5 conversation starters from the bottom of that file into the Conversation Starters section. In Knowledge, upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "Hi, I'm a landscaper in [Alberta/BC/state]. Need [quote / proposal / contract / email] for [client]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It still works — you just lose the persistent GPT and the file uploads.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this, then ask me for jurisdiction, season, and artifact type." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into instructions, save, and use that Gem.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. I'm a landscape owner in [your city/province]. New residential client, 6,000 sqft lot, established yard, mid-quality grass with some bare spots near the back fence. They want: spring cleanup (dethatch + aerate + cleanup), weekly mow May to October, two fert apps, fall cleanup with leaf haul. They mentioned a sprinkler head that broke over winter. Quote them.
```

If you get back a quote with a scope summary, itemized scope, schedule, placeholder prices, excluded items, terms, and a "numbers and assumptions to plug in" block at the bottom — the kit loaded right. If it quotes you a real dollar amount or uses the word "transform" or "lush" anywhere, the system prompt didn't load. Try pasting it again.
