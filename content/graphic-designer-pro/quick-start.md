# Quick Start — Graphic Designer / Illustrator Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro/Team plan unlocks Projects; works in a regular chat too). In "Custom instructions" or "Project knowledge," paste `optimization-pack.md`. Upload `templates/briefs-proposals-rationale.md` and `memory.md` to project knowledge. Start a conversation. First message: name the project type, the stage, and the artifact you need — "Brand identity project, in discovery, need kickoff questions for a B2B SaaS client."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). In "Instructions," paste `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload the templates and memory file. Save private. Open it: "Brand identity project. In proposal stage. Build me lite/standard/premium tiers."

No Plus? Paste `optimization-pack.md` at the top of a regular chat. No persistence, same output.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. New conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me project type, stage, and artifact." For Gemini Gems: create a Gem, paste into instructions, save, use that Gem.

---

## Test it works

Paste this in:

```
Test run. Project: brand identity for a 6-year-old direct-to-consumer mattress company that's lost ~12% market share in the last 18 months to newer entrants. Stage: I just had a 45-minute kickoff call with the founder. Artifact: turn these messy notes into a written brief.

Notes:
- founder wants something "modern and clean, but not boring"
- thinks current branding looks "tired"
- new entrants are "all the same beige thing" — wants to look different
- budget around $35K, wants done in 8 weeks (their fall campaign needs new assets)
- mentioned Casper's old branding (the cute one) and a Japanese brand I didn't catch the name of as references
- says marketing team will "give feedback" but not be the decision-maker — founder signs off
- told me twice that "the new logo can't look corporate"
- doesn't think the wordmark needs to change much, but everything else is up for grabs
- mentioned that the manufacturing partner has been pushing for a re-brand for two years
```

If you get back a brief with: a one-sentence project description in client's words first, a "real problem" section that names something like "perceived stagnation in a category they used to lead" or similar diagnosis (NOT just "the brand looks tired"), three risks flagged (one of which should be the founder-vs-marketing-team dynamic), a "modern and clean" flag asking to decode further with the founder, and a pushback note at the bottom — you're loaded right. If you got back a generic brief that quotes "modern and clean" as the direction without unpacking it, the system prompt didn't load. Paste it again.
