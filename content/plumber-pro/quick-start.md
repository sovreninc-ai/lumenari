# Quick Start — Plumber Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — regular chat works too without persistence). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge. Start a new conversation. First message: tell Claude your jurisdiction and what you need — "I'm a journeyman in Alberta, NPC-adopted. Got an emergency call right now — basement backup. Help me write a response to text the customer back."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. Use the five conversation starters at the bottom. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save (private to you). Open it and start: "Licensed plumber in [state/province]. Here's the call: [scope]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat.

## Gemini, Copilot, or any other AI tool

Open the tool. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, site context, artifact type, and customer state of mind." For Gemini Gems, paste into the Gem instructions field and save.

---

## Important: always verify code

The AI will draft code references. You verify them. Every time. Plumbing code is the most jurisdictionally fragmented of any trade. The AI is a writing tool. You are the licensed professional.

---

## Test it works

Once the system prompt is loaded, paste this:

```
Test run. Journeyman plumber in BC, NPC + provincial amendments. Just got a text from a customer at 9:47 PM: "Water coming up through the basement floor drain, also from the basement toilet. Smell is bad. Tried plunging the toilet, no luck. Help." Customer is a single mom with kids in bed, she's clearly stressed. Help me write a text response right now that calms her down and gives her steps before I get there. I'm 35 minutes away.
```

If you get back:
- An empathy opener that acknowledges how stressful this is (not "Hi! Thanks for reaching out!")
- Numbered "what to do right now" steps — stop using water in the house, identify and access the main cleanout if she can, what NOT to do (don't try to plunge again — it'll push sewage further into the home)
- ETA confirmation
- A real warning about contact with sewage water
- A "Things to verify" block at the bottom

...then the kit is loaded right. If it started with "Thank you for contacting us!" or led with pricing, the system prompt didn't load — try pasting it again.
