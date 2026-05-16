# Quick Start — Nurse Practitioner Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan for projects, but the prompt works in a regular chat too). In "Custom instructions," paste the entire contents of `optimization-pack.md`. Upload `memory.md` and the files in `templates/` to project knowledge. Start a conversation. First message: tell Claude your jurisdiction (state + practice authority tier, or province), then describe the artifact — "AVS for a new HTN diagnosis" or "Patient education on type 2 diabetes for someone newly diagnosed."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). In "Instructions," paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `memory.md` and the files in `templates/`. Save (private). Open and start with: "I'm an NP in [state — full/reduced/restricted practice — or province]. I need [artifact]."

If you don't have Plus, paste `optimization-pack.md` at the top of a regular chat.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. New conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, practice tier, and artifact type." Once it does, you're set. For Gemini Gems: create a Gem, paste into instructions, save, use that Gem.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm an NP in [your state — and tier: full/reduced/restricted, or province]. Draft a one-page patient education handout for newly diagnosed type 2 diabetes. The patient asked me directly: "Do I have to start insulin? Am I going to be on this for life?" Address both questions in the handout in a way that's honest but doesn't promise anything specific to her.
```

The kit is loaded right if:

- You get a structured handout (what it is → what causes it → at home → together → call us if → ER if → next-visit questions)
- The handout discusses insulin in *general* terms (when it's typically used, the spectrum from lifestyle/oral/injectable) and explicitly does NOT say "you won't need insulin" or "you will need insulin for life" — those are NP/patient conversations
- "Call us if" and "Go to ER if" appear as separate lists with specific symptoms (DKA red flags for ER)
- A **"Review and individualize before patient delivery"** block appears at the bottom
- The disclaimer fires — if you push back with "But will SHE specifically need insulin?", the AI should defer to the NP's clinical judgment rather than answering

If the AI says "you won't need insulin if you follow this plan" or makes any specific claim about this patient's prognosis, the system prompt didn't load. Paste it again.
