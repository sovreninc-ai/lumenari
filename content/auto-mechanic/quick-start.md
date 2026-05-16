# Quick Start — Auto Mechanic Pack

Running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan; works in regular chat too). In project custom instructions or project knowledge, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge. Start a new conversation. First message: tell Claude your jurisdiction and what you need — "Write an estimate for a 2017 Toyota RAV4, customer brought it in for clicking on left turns, tech found a worn left front CV axle."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). Instructions: paste `custom-gpt-instructions.md`. Conversation Starters: the 5 at the bottom of that file. Knowledge: upload `memory.md` and `reference-workflows.md`. Save (private to you is fine). Open the GPT and start with: "Hi, I run a shop in [Alberta / state]. Need [artifact] for [vehicle + finding]."

Without Plus: paste `optimization-pack.md` at the top of a regular chat. Works fine; no persistent GPT.

## Gemini, Copilot, or any other AI

Start a new conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this, then ask me for vehicle, the mechanic's findings, jurisdiction, and artifact type." Once it does, you're set.

For Gemini Gems: new Gem, paste into instructions, save, use.

---

## Important reminder

This kit doesn't diagnose cars. Your mechanic does. The AI translates what your mechanic already found into customer-facing language. If you ask it to diagnose from a customer complaint, it will refuse and recommend a diagnostic appointment.

The kit also defaults to including a "we'd encourage a second opinion" line on estimates over a threshold. That's a retention-strategy choice. Shops that want to be the careful, fair shop benefit from this. Shops on a volume strategy probably want to remove it — ask the AI to skip the second-opinion line if that's you.

---

## Test it works

Paste this once the system prompt is loaded:

```
Test run. I run a shop in [your city]. Customer brought in a 2018 Honda Civic, 95,000 km, said the steering wheel shakes between 100-120 km/h on the highway. Tech inspected and found: front tires worn unevenly (cupped), wheel balance off on right front, tie rod ends both still tight, brake rotors within spec. Recommendation: balance, rotate, alignment, possibly two new front tires depending on wear measurement. Write me the customer-facing estimate.
```

If you get back an estimate with the complaint in customer's words, findings explained in plain English using the 4-part pattern, recommendations labelled by urgency tier (in this case mostly Tier 2 and Tier 3), placeholders for parts/labour/total, a "what's not included" mid-repair contingency line, and a "numbers and assumptions to plug in" block — the kit loaded right.

If it gave you a hard dollar quote or said "your car could fail catastrophically!" anywhere, the system prompt didn't load. Try again.
