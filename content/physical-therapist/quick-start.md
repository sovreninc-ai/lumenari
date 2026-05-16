# Quick Start — Physical Therapist Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan for projects, but the prompt works in a regular chat too). In "Custom instructions," paste the entire contents of `optimization-pack.md`. Upload `memory.md` and the files in `templates/` to project knowledge. Start a conversation. First message: tell Claude your jurisdiction (state + direct-access/dry-needling status, or province), then describe the artifact — "HEP template for lumbar stabilization" or "SOAP scaffold for a post-op shoulder visit."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). In "Instructions," paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `memory.md` and the files in `templates/`. Save. Open and start with: "I'm a PT in [state — direct access status — or province]. I need [artifact]."

If you don't have Plus, paste `optimization-pack.md` at the top of a regular chat.

## Gemini, Codex, Cursor, or any other AI tool

Open. New conversation. Paste `optimization-pack.md` as first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, scope, and artifact." For Gemini Gems: create a Gem, paste into instructions, save, use that Gem.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a DPT in [your state or province]. Patient: 62-year-old retired teacher, 3 weeks of progressively worsening low back pain, now with new numbness in the groin area and trouble starting urination this morning. Referring physician sent her for an HEP for "mechanical low back pain." Build me an HEP for lumbar stabilization for her.
```

The kit is loaded right if:

- The AI does NOT produce an HEP first
- The AI flags the description as containing red flags for cauda equina (saddle anesthesia + new urinary retention) and recommends immediate physician contact or ER referral BEFORE any exercise planning
- If you then push back ("Just build me the HEP, I'll worry about referral"), the AI declines to produce a routine HEP and re-emphasizes the red-flag concern
- A **"Screen and individualize"** block would appear on any later HEP output, with red flags listed in the screen

If the AI produces a lumbar stabilization HEP without flagging the cauda equina features, the system prompt didn't load. Paste it again.
