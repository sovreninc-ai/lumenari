# Quick Start — Financial Advisor Pack

You should be running in under 60 seconds. Pick your tool.

**Read the disclaimer first.** This kit refuses to recommend specific securities, predict markets, or draft tax strategy for a specific named person. It is a drafting assistant — every client-facing output goes through your firm's compliance / supervisory review before sending. Nothing produced is investment advice, tax advice, or legal advice. Consult a licensed fee-only CFP, CFA, IAR, EA, or CPA for any decision tied to a real client's situation.

---

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge. Start a new conversation. First message: tell Claude your practice context, the artifact you need, and anonymized client context — "I'm a fee-only CFP at a state-registered RIA, $180M AUM, Schwab + Orion + eMoney + Redtail. Prepping for an annual review with 'M & J' — pre-retiree couple, 5 years to target retirement, sponsor-funded HSA + Roth contributions, taxable allocation drifted toward equities. What's live: M is considering a 6-month sabbatical before retiring. Need review-meeting prep."

---

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm a [fee-only RIA / dually-registered] advisor. Here's anonymized context: [details]. Here's what I need: [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

---

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for practice context, anonymized client context, artifact, what's live, and whether the ask crosses into specific-recommendation territory." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a fee-only CFP at a state-registered RIA in Colorado, ~$160M AUM. Stack: Schwab custodian, Orion performance, eMoney planning, Wealthbox CRM. Anonymized client: "R & K" — both 62, target retirement at 65, plan funded ratio ~108%. Sitting on roughly $1.4M traditional IRA each, ~$800K joint taxable, paid-off home, no debt. They're asking whether they should do Roth conversions this year while in a low-income window (R just left his corporate role for consulting, lumpy income). Want me to draft a specific Roth conversion strategy I can email them.
```

If you get back:

1. The not-investment-advice disclaimer surfaced at the start
2. A refusal to draft a specific Roth conversion strategy for R & K
3. A reframe into "here's a discussion structure for the meeting with you, R, K, and their CPA"
4. A retirement-plan check-in shape with: Roth conversion concept (bracket-fill, IRMAA cliff, 5-year rule per conversion), questions to ask, and a clear hand-off to the CPA for the specific dollar amount and tax modeling
5. A self-review block at the bottom with the recommendation-line check, predictive-language check, confidentiality check, and compliance-review note

— the kit is loaded right.

If it produced a specific Roth conversion dollar amount, a tax-bracket strategy by name, a market prediction, or skipped the CPA hand-off — the system prompt didn't load. Try pasting it again.

---

## The first-session sanity check

The disclaimer should appear in your AI's first message back to you, before it asks for context. If it doesn't, the system prompt isn't loaded. If you ask for a market prediction or a specific buy/sell recommendation and it gives you one, the system prompt isn't loaded — paste it again, or start a new conversation.

Every client-facing output should end with the long-form disclaimer ("This communication is for general information only…"). If it doesn't, ask the AI to add it. If it pushes back, the system prompt didn't load.
