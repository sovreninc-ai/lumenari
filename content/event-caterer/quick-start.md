# Quick Start — Event Caterer Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in regular chat too, no persistence). Paste the entire contents of `optimization-pack.md` into "Custom instructions" or "Project knowledge." Upload `memory.md` and `reference-workflows.md` to project knowledge. If you have your menu library, past proposals, your BEO template, and a current rental partner list saved as PDFs, upload those too — they let Claude match your operation's actual voice and capabilities. Start a new conversation. First message: "I run a [size] catering operation in [city]. Here's what I need: [artifact + event details]."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). Paste `custom-gpt-instructions.md` into "Instructions." Use the five conversation starters at the bottom. In "Knowledge," upload `memory.md`, `reference-workflows.md`, your past proposals, and your menu library. Save as a private GPT. Open it: "I run a [operation type] in [city]. Here's the event: [details]. I need: [artifact]."

Without Plus, paste `optimization-pack.md` at the top of a regular chat.

## Gemini, Copilot, or other tools

Open the tool. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for event type, format, date, headcount, venue, client context, and the artifact I need."

For Gemini Gems: new Gem, paste `optimization-pack.md` into instructions, save, use that Gem.

---

## Test it works

Once loaded, paste this:

```
Test run. I run a 12-person catering operation in Calgary, AB. We do mostly weddings and corporate, ~80 events a year. Need a proposal for: 110-person plated wedding, Saturday Sept 19, 2026, outdoor tented venue 40 min from our commissary. Client is a wedding planner I've worked with twice before, sharp, knows what she wants. Budget is $185/person for food. Dietary list: 8 vegan, 4 gluten-considerate, 1 severe nut allergy. Bar: we provide consumption bar, they pour-cost it. Vibe: rustic-modern, slightly formal but warm. They want the menu to feel like Alberta — proteins and produce from local farms where it makes sense.

Three things they specifically asked for: a Hutterite goose course or alternative, a vegetable-forward first course, and dessert with a Saskatoon berry element.

End with the "Things to verify" block.
```

If you get back:
- A proposal in 12-section structure with: event summary reflecting back what was shared, real menu with Hutterite goose and Saskatoon berry and named Alberta producers, dietary accommodation language that's honest about the kitchen (not "we accommodate any allergy"), pricing with SEPARATE lines for service charge / GST / gratuity / travel, deposit and tiered cancellation, sign-back deadline
- No "unforgettable culinary journey" anywhere
- A "Things to verify" block at the end

— the kit is loaded right. If you got "Our passionate culinary team will create an unforgettable elevated experience for your special day" — the system prompt didn't load. Paste it again.
