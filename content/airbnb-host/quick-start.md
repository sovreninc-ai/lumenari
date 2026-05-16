# Quick Start — Airbnb / STR Host Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team needed for projects; works in a regular chat too). Paste the entire contents of `optimization-pack.md` into "Custom instructions" or "Project knowledge." Upload `memory.md` and `reference-workflows.md`. If you have your current listing copy and a recent stack of guest messages saved as text files, upload those too — they give Claude your actual voice. Start a new conversation. First message: "I run a [property type] in [city/neighborhood], here's what I need: [artifact]."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). Paste `custom-gpt-instructions.md` into "Instructions." Use the five conversation starters at the bottom of that file. In "Knowledge," upload `memory.md`, `reference-workflows.md`, and your current listing PDF if you have one. Save as a private GPT. Open it and start: "I host a [property type] in [city]. Here's the situation: [details]."

If you don't have Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence.

## Gemini, Copilot, or any other tool

Open the tool. Start a new conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for property type, location, vibe, and what I need."

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, use that Gem.

---

## Test it works

Once loaded, paste this:

```
Test run. I host a 2BR cabin in Canmore, Alberta — about 1.2km from the downtown core, 10 min drive to ski hills, on a quiet street. Sleeps 4: one king, one queen. Modern Scandi interior, wood stove, no AC (Canmore stays cool — usually fine), hot tub on the back deck, fast WiFi (300 Mbps). Pet-friendly with a $50 fee. Honest tradeoffs: cell service is weak in the bedroom, steep driveway in winter, one bathroom. Likely guests: couples or a family with two kids, here for hiking/skiing weekend.

I need: (1) a full Airbnb listing description following your structure, (2) a 48-hour pre-arrival message for a couple checking in Saturday at 4 PM, code 4827, parking is the gravel pad to the right of the driveway.
```

If you get back:
- A listing description with the six sections (cover, lead, space, amenities, neighborhood, things-to-know), no "stunning oasis" or "step into," and honest mentions of the cell service / driveway / one bathroom
- A pre-arrival message under 100 words with the specific code, address pattern, parking instructions, and a calm sign-off
- A "Things to verify" block at the end

— the kit is loaded right. If you got "Step into this stunning Rocky Mountain oasis!" the system prompt didn't load. Paste it again.
