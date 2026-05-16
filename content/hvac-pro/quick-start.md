# Quick Start — HVAC Tech Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — regular chat works too without persistence). In "Custom instructions" / project knowledge, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md`. Start a new conversation. First message: "I'm an HVAC contractor in [city/state/province]. Need to write a system replacement proposal — I'll paste the details."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus plan required). In Instructions, paste `custom-gpt-instructions.md`. Use the five conversation starters at the bottom. In Knowledge, upload `memory.md` and `reference-workflows.md`. Save (private). Open and start: "HVAC contractor in [state/province]. Here's the job: [scope]."

If no Plus, paste `optimization-pack.md` at the top of a regular chat.

## Gemini, Copilot, or any other AI tool

Open the tool. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, site context, job scope and sizing basis, and artifact type." For Gemini Gems, paste into the Gem instructions field and save.

---

## Important: always verify specs and code

The AI will draft equipment models, AHRI numbers, refrigerant types, and code references. You verify them against current manufacturer documentation and your AHJ-adopted code edition. Refrigerants are mid-transition (R-410A → R-454B/R-32). AHRI matches are pair-specific. The AI is a writing tool.

---

## Test it works

Once the system prompt is loaded, paste this:

```
Test run. HVAC contractor in Alberta. Need a system replacement proposal. Customer: 1985 bungalow, 1,650 sqft above grade plus 800 sqft basement. Existing system: 1996 Lennox G14 furnace (80% AFUE, 80k BTU input), 2003 Lennox AC 3-ton on R-22. Customer complaints: AC barely keeps up on 30°C+ days, upstairs bedrooms cold in winter. I did a quick Manual J using the existing ductwork as-is: 32k BTU cooling load, 54k BTU heating at -32°C design temp. Customer is interested in a heat pump but worried about cold-climate performance. Two adults, work-from-home, no kids. Budget-conscious but quality-focused. The cheap quote they got: $9,400 for a 95% AFUE Goodman furnace + 3-ton Goodman AC, no Manual J mentioned, no AHRI cert mentioned.

Write me a proposal recommending a cold-climate heat pump (Mitsubishi Hyper-Heat or similar) paired with a 95% furnace as dual-fuel backup. Include the "why ours is more expensive" comparison against the cheap quote.
```

If you get back:
- A proposal with the Load calculation block referencing the specific 32k cooling / 54k heating numbers
- A specific cold-climate heat pump model named (Mitsubishi MUZ-NA series or similar) with BTU rating, HSPF2, and AHRI match referenced
- A dual-fuel setpoint rationale ("switch to gas backup below -15°C based on operating cost crossover")
- A "Why ours is more expensive" section with the six-item walkthrough against the Goodman quote
- An Alberta-specific rebate reference (Canada Greener Homes / Clean Energy Improvement Program / municipal programs)
- A "Things to verify" block flagging manufacturer pricing, AHRI match, refrigerant transition timing, and rebate eligibility

...then the kit is loaded right. If it gave you generic "Don't wait until summer hits!" energy or skipped the Manual J reference, the system prompt didn't load — try pasting it again.
