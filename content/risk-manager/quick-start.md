# Quick Start — Risk Manager Pack

Under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro/Team for projects; regular chat works too). Paste the entire contents of `optimization-pack.md` into Custom Instructions or Project Knowledge. Upload `memory.md` and `reference-workflows.md` into Project Knowledge so Claude has the worked examples and vocabulary on hand. Start a new conversation. First message: tell Claude your industry, size, ERM maturity, taxonomy, and scale — and the artifact you want. Example: "Mid-market US insurer, 1,200 employees, full ERM program reporting to CRO and audit committee, COSO ERM taxonomy, 5×5 likelihood × impact scale tied to bands. I need a board summary for the Q3 audit committee — register has 47 items, I want to surface the top 5 with a watchlist of 3 emerging."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). Paste `custom-gpt-instructions.md` into Instructions. Paste the five Conversation Starters from the bottom of that file. Upload `memory.md` and `reference-workflows.md` to Knowledge. Save the GPT (private to you is fine). Open it and start with: "I'm an enterprise risk manager at a [size + industry]. Taxonomy: [list]. Scale: [pattern]. Today I need [artifact]."

No ChatGPT Plus? Paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for company context + taxonomy + scale, the trigger, audience + format, the sensitive piece, and the artifact." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into Instructions, save, use that Gem.

---

## Test it works

Once the system prompt is loaded, paste this:

```
Test run. I'm head of operational risk at a 1,800-person fintech in the US (consumer lending product, ~$280M revenue, primarily US with a Canadian subsidiary). ERM maturity: full program, reporting to CRO, who reports to GC and audit committee. Taxonomy: operational, financial, strategic, compliance, reputational, technology/cyber, third-party, ESG, geopolitical. Scale: qualitative bands tied to numbers — Likelihood: Low (<5%), Moderate (5-25%), High (25-60%), Very High (>60%) over 24 months. Impact: Low (<$2M), Moderate ($2M-$10M), High ($10M-$40M), Very High (>$40M). Today I need a register entry for the following: dependency on a single core banking platform vendor (a Tier-1 SaaS provider; we don't have a credible second source today). Current state: 100% of loan servicing runs on this vendor. We have a 99.9% SLA contract, $2M annual spend, 3 years on the relationship. Their 2025 SOC 2 had two clean exceptions in change management. We've been tracking them as on-watch since Q1 2026 because of public reports of a leadership change. Inherent likelihood I'd assess Moderate-to-High over 24 months. Inherent impact I'd assess Very High (we'd be down for our entire loan servicing operation if they went away on a 30-day window). Residual: we have monitoring, escalation paths, and a documented (but untested) BCP that includes a manual servicing workaround for ~30 days. Residual likelihood still Moderate (controls reduce detection time, not the underlying dependency). Residual impact still High (manual workaround is real but degrades materially after 30 days). Treatment: currently Mitigate (controls in place), considering a second-source RFP that would move us toward dual-source over 18 months. Owner: COO. Last reviewed: 2026-08-15. The audience for this entry is the Q4 audit committee.
```

If you get back:
- A register entry with a clear Title in plain English
- Likelihood and Impact both stated for Inherent AND Residual, with the bands tied to the scale stated above, over the 24-month horizon
- Velocity (acute or chronic) named
- Key controls listed with owners
- Treatment strategy named (Mitigate, with a note on the second-source RFP under consideration)
- KRIs with thresholds (e.g., vendor financial health metric, response time to escalation)
- Trend (deteriorating, stable, or improving) with one sentence explaining
- Dependencies on other risks named
- Last reviewed / next review
- A "verify before publishing" block

— the kit is loaded right. If you got floating "low/medium/high" ratings without scale anchoring, or only residual risk without inherent, or "we have robust controls" anywhere, the system prompt didn't load — paste it again.
