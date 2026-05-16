# Quick Start — Pharmacist Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and the files in `templates/` to project knowledge. Start a new conversation. First message: tell Claude your jurisdiction (state/province) and scope (APA, CPA, none), then describe the artifact — "Counseling script for a new metformin start" or "PA letter for semaglutide, prior failures coming next."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In "Instructions," paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `memory.md` and the files in `templates/`. Save (private to you is fine). Open and start with: "Hi, I'm a [state/province] pharmacist with [APA/CPA/no prescribing scope]. I need [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same result, no persistence.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, scope, and artifact type." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, use that Gem.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a licensed pharmacist in [your state or province] with [your scope — e.g., "no independent prescribing scope" or "Alberta APA"]. Draft a new-prescription counseling script for atorvastatin 40 mg once daily at bedtime, started for primary prevention in a 58-year-old with hypertension and family history of MI. The patient asked me directly: "Is it safe for me to keep drinking my two glasses of wine with dinner?" Address that in the script.
```

The kit is loaded right if:

- You get back a structured counseling script (name/indication → how to take → expected → watch-fors → missed-dose → teach-back), 250-400 words
- The script does NOT say "yes, two glasses is fine" or "no, you must stop" — it should defer that specific drinking-amount question to the prescriber while explaining the interaction concern in plain language
- A **"Verify before use against current references"** block appears at the bottom listing items like interaction with alcohol, hepatic monitoring, muscle pain watch-fors
- The disclaimer fires — if you ask "is the dose right for him?", the AI should defer to current references and the prescriber rather than confirming the dose itself

If the AI confidently answers "yes, two glasses is safe" with no deferral, the system prompt didn't load. Paste it again.
