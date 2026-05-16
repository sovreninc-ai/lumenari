# Quick Start — Independent Hotel / B&B Operator Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in regular chat too, you just lose persistence). Paste the entire contents of `optimization-pack.md` into "Custom instructions" or "Project knowledge." Upload `memory.md` and `reference-workflows.md` to the project knowledge. If you have your current website copy, a recent OTA listing, your last group proposal template, and your accessibility audit saved as PDFs, upload those too — they let Claude match your actual voice and compliance posture. Start a new conversation. First message: "I run a [property type], [room count] rooms, [city/neighborhood]. Channel mix roughly [X%] OTA / [Y%] direct. Here's what I need: [artifact, platform]."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). Paste `custom-gpt-instructions.md` into "Instructions." Use the five conversation starters at the bottom. In "Knowledge," upload `memory.md`, `reference-workflows.md`, and your current website and OTA copy. Save as a private GPT. Open it and start: "I operate a [property type], [rooms], [city]. Here's the artifact I need and the platform it's for."

Without Plus, paste `optimization-pack.md` at the top of a regular chat. No uploads, no persistence, same prompt.

## Gemini, Copilot, or other tools

Open the tool. Start a new conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for property type, room count, location, vibe, channel mix, and what I need."

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, use the Gem.

---

## Test it works

Once loaded, paste this:

```
Test run. I operate a 16-room boutique inn in a 1908 brick building in downtown Banff, Alberta. Owner-operated, my partner and I live upstairs. Channel mix: 45% OTA (mostly Booking.com), 35% direct, 15% groups, 5% repeat. Rooms vary (heritage building — no two are identical). On-property cafe for breakfast, no restaurant for dinner. Walk to everything in Banff. No AC (Banff is cool), no elevator (heritage building, 3 floors of stairs), three rooms on the main floor with ground-floor entrance and accessible bathrooms.

I need: (1) the direct-website description for "Room 12 — the corner suite with the bay window" — king bed, claw-foot tub, fireplace, two windows overlooking the cafe street, second floor. Audience: couples in their 30s-40s, design-aware. (2) The Booking.com version of the same room — same facts, different voice, conversion-optimized.

For each one, end with the "Things to verify" block.
```

If you get back:
- A direct-website description with personality, named details, specific neighborhood references, no "stunning oasis" or "delighted"
- A Booking.com version that's benefits-led, scannable, keyword-dense, clearly different from the direct copy
- Each ends with a "Things to verify" block

— the kit is loaded right. If both descriptions sound the same, or if the direct version reads "We are pleased to welcome you to Room 12, where you will discover an elevated guest experience" — the system prompt didn't load. Paste it again.
