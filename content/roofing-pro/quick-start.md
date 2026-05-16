# Quick Start — Roofing Contractor Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — regular chat works without persistence). In "Custom instructions" / project knowledge, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge. Start a new conversation. First message: "I'm a roofing contractor in [state/province]. Just finished a post-storm inspection, need to write up the report. I'll paste my test square notes."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus plan required). In Instructions, paste `custom-gpt-instructions.md`. Use the five conversation starters at the bottom. In Knowledge, upload `memory.md` and `reference-workflows.md`. Save (private). Open and start: "Roofing contractor in [state]. Here's the job: [scope]."

If no Plus, paste `optimization-pack.md` at the top of a regular chat.

## Gemini, Copilot, or any other AI tool

Open the tool. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, property data, event data if insurance, inspection methodology, and artifact type." For Gemini Gems, paste into the Gem instructions field and save.

---

## Important: not legal or insurance advice

The AI produces contractor documentation. It does not produce legal advice, public adjuster negotiation strategy, or anything else that requires a license the contractor doesn't have. For denied claims, scope disputes that need leverage, or anything that escalates, the homeowner needs a licensed public adjuster or property attorney in their jurisdiction. Your job is documentation and customer education. Stay in your lane.

---

## Test it works

Once the system prompt is loaded, paste this:

```
Test run. Roofing contractor in Calgary, AB. Just finished a post-storm inspection. Property: 2009 build, architectural asphalt shingles (GAF Timberline HD based on the manufacturer markings on a removed ridge cap), about 28 squares, 6/12 pitch, moderate complexity (1 chimney, 1 skylight, 4 valleys). Storm: confirmed hail event July 8, 2024 (NOAA/EC data shows 1.0-1.5" hail in the area for about 25 minutes).

Test squares performed (10x10 each):
- South slope: 16 hits, 1-1.25", round, granule loss heavy, mat exposed in 7
- North slope: 13 hits, 1-1.25", round, granule loss, mat exposed in 5
- East slope: 11 hits, 1-1.5", round, similar pattern
- West slope: 14 hits, 1-1.25", round, mat exposed in 6

Soft metal damage: 8 hits on each ridge cap (3 caps), heavy dimpling on the metal chimney flashing, AC condenser fins crushed across south face. Gutter aprons show dimpling consistent with same hail size.

Other corroborating evidence: siding spatter on south face stucco, paint dimpling on the deck rail, wood fence shows tracks.

Photos taken: 47.

Need a full inspection report I can send to the adjuster ahead of Tuesday's site meeting.
```

If you get back:
- A report with the Property data block populated correctly
- An NOAA-aware Event block referencing the July 8, 2024 data
- A proper Test Square Results table with all four slopes, hit counts, sizes, characteristics
- Soft metal damage and corroborating non-roof evidence documented
- A conclusion section in "consistent with" professional assessment language
- Recommended scope including code upgrades (Alberta-specific: ice and water shield to current code, drip edge per current ABC)
- A "Things to verify" block flagging code clause numbers and Alberta-specific insurance/contracting rules

...then the kit is loaded right. If it gave you marketing language like "we'll fight to get you a new roof!" or skipped the Test Square Results table, the system prompt didn't load — try pasting it again.
