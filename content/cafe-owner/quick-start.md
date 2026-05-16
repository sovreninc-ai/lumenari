# Quick Start — Cafe / Coffee Shop Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge. If you have your current menu, recent IG screenshots, or your roaster's tasting notes saved as PDFs, upload those too — they give Claude your actual voice to mirror. Start a new conversation. First message: "Cafe is [Scandi minimal / warm corner / industrial neighborhood], we work with [Roaster Name], here's what I need: [artifact]."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md`, `reference-workflows.md`, your current menu PDF, and your last 5 IG captions saved as a text file. Save the GPT (private to you is fine). Open it and start: "I run a [vibe] cafe, [roaster] is on bar, here's the artifact I need."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. No persistence, no uploads, but the prompt works.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for cafe vibe, current roaster, and the artifact I need."

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of default chat.

---

## Test it works

Once loaded, paste this:

```
Test run. Cafe is a warm corner spot in a residential neighborhood, 22 seats, we work with Heart Roasters in Portland. Bean on bar this week: Heart "Stereo" blend — plum, chocolate, brown sugar. New pour-over today: Ethiopia Gedeb, washed process, tasting notes from the roaster are lemon, jasmine, white grape. Need: (1) menu copy for both the espresso and the pour-over for the chalk board (under 8 words each); (2) an IG caption announcing the new Gedeb on pour-over, 60-80 words; (3) a quick line of copy for the menu card describing today's morning bun, in-house, cardamom and demerara crust.
```

If you get back:
- Two board lines, under 8 words, with bean / roaster / flavor descriptors but no "exquisite" or "curated"
- An IG caption that opens with a specific detail (not "Good morning!"), under 80 words, with 5-10 neighborhood-specific hashtags
- A pastry line under 20 words crediting the in-house pastry program

— plus a "things to verify" block — the kit is loaded right. If you got "Treat yourself to our exquisite, expertly-curated single-origin pour-over experience," paste the system prompt again.
