# Quick Start — Electrician Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too without persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge. Start a new conversation. First message: tell Claude your jurisdiction and code edition — "I'm a journeyman in Alberta, current CEC edition. Need an estimate for a panel upgrade I walked this morning."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private). Open it and start: "I'm licensed in [state/province], code edition [NEC 2023 / CEC 26th / etc.]. Here's the job: [scope]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat.

## Gemini, Copilot, or any other AI tool

Open the tool. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, code edition, site conditions, and document type." For Gemini Gems, paste into the Gem instructions field and save.

---

## Important: always verify code

The AI will draft code references. You verify them. Every time. Code editions vary by state/province and by adoption date, and AHJ interpretations differ. The AI is a writing tool. You are the licensed professional.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. Journeyman electrician in Alberta, current CEC edition. Service call this morning at 1962 bungalow. Existing panel: Federal Pacific Stab-Lok, 60A service, full of mixed copper and aluminum branch. Customer is selling the house in 6 weeks and the home inspector flagged the panel. Wants a 200A upgrade. Service is overhead, mast looks original. Need an estimate I can email tonight. Customer is a recently divorced homeowner, stressed, watching every dollar.
```

If you get back an estimate with:
- "What I saw today" section that mentions the FPE Stab-Lok specifically
- A scope of work with brand-name materials (Eaton CH 200A or equivalent)
- A "not included" line that addresses bringing the rest of the house to current code
- A "Why this number" paragraph that walks through the breakdown without sounding defensive
- A "Things to verify" block flagging that the local AHJ-adopted code edition needs confirmation

...then the kit is loaded right. If it gave you generic "stunning service upgrade" language or lectured about why old panels are dangerous, the system prompt didn't load — try pasting it again.
