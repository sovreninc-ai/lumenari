# Quick Start — Mortgage Broker Pack

You should be running in under 60 seconds. Pick your tool.

**Read this first.** This kit is a drafting tool. Rates, terms, and qualification ranges in any output are illustrative — never binding. Pre-approvals are conditional. Final loan approval comes from the lender's underwriting decision against the borrower's actual documented file, not from anything an AI produced. Every client-facing output goes through your firm's compliance / supervisory review and your licensed signature before sending.

---

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge. Start a new conversation. First message: tell Claude your jurisdiction, the scenario, the program, anonymized borrower context, and the artifact you need.

Example: "I'm a FSRA-licensed broker in Ontario, brokerage runs through Velocity (Filogix) + Finmo. Anonymized borrower 'A & B' — first-time buyer couple, combined household income ~$165K (both T4 employees, both > 2 years at current employer), purchase target $720K in Mississauga, 10% down from savings + HBP. Credit stated 740s for both. Need an intake summary and a pre-approval letter draft. They're shopping this weekend so the pre-approval is going to a Realtor."

---

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm a [US loan officer in X state / Canadian broker in X province]. Scenario: [details]. Artifact needed: [intake summary / pre-approval letter / refi outreach / rate-update note / denial comms]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

---

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, scenario type + program, borrower context (anonymized), artifact needed, and what's live. Then produce the work." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. US loan officer in Colorado, NMLS-licensed, shop runs Encompass + Optimal Blue. Anonymized borrower "J" — single buyer, W-2 software engineer at the same firm 4 years, base $145K + ~$30K annual bonus history (3 years). Target purchase $580K SFH, 10% down from savings (90 days seasoned), 740-760 FICO stated. Asking what rate I can quote and what the monthly payment will be. Also wants the pre-approval letter today so they can write an offer this weekend. Wants me to predict whether they should lock or float for the next 30 days while they shop.
```

If you get back:

1. The "not binding / illustrative" disclaimer surfaced at the start
2. A refusal to predict whether to lock or float (with the reframe: "here's the conversation to have together about the tradeoff")
3. An intake-summary shape capturing the scenario (with explicit note that DTI math is the originator's to confirm against actual lender guidelines and AUS findings)
4. A US pre-approval letter draft with: program named, illustrative rate (with "estimated" labels and "subject to lock"), conditions list (verification, appraisal, title, eligibility, no material change, DTI maintenance, lender underwriting, TRID timing), NMLS placeholders, equal housing lender disclosure
5. Document list to request (W-2s, paystubs, bank statements, etc.)
6. A self-review block at the bottom with rate-prediction check, promise check, fee transparency, jurisdiction check, privacy check, compliance-review note

— the kit is loaded right.

If it produced a specific rate as if it were quoted, predicted rate direction, used "guaranteed approval" language, skipped the conditions, or omitted the disclosure — the system prompt didn't load. Try pasting it again.

---

## The first-session sanity check

The short disclaimer should appear before the AI asks for context. If not, the prompt didn't load.

Every pre-approval letter the kit produces must say "THIS LETTER IS A PRE-APPROVAL, NOT A COMMITMENT TO LEND" and list the conditions. If it doesn't, that's a fail.

Every rate-update note ends with "rates shown are illustrative only and not binding offers." If it doesn't, ask for the disclaimer and confirm the kit will include it by default going forward.
