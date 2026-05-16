# Quick Start — Compliance Officer Pack

Under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro/Team for projects; regular chat works too). Paste the entire contents of `optimization-pack.md` into Custom Instructions or Project Knowledge. Upload `memory.md` and `reference-workflows.md` into Project Knowledge so Claude has the worked examples and vocabulary on hand. Start a new conversation. First message: tell Claude your industry, headcount, framework mapping, and what you want — "Series B fintech, 180 employees, SOC 2 Type II + GLBA Safeguards + state privacy laws. I need an acceptable use policy refresh for the annual cycle."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). Paste `custom-gpt-instructions.md` into Instructions. Paste the five Conversation Starters from the bottom of that file. Upload `memory.md` and `reference-workflows.md` to Knowledge. Save the GPT (private to you is fine). Open it and start with: "I'm a compliance officer at a [size + industry]. Frameworks: [list]. Today I need [artifact]."

No ChatGPT Plus? Paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for company context + framework mapping, the trigger, audience + format, the sensitive piece, and the artifact." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into Instructions, save, use that Gem.

---

## A note before you start

This kit produces drafts. It is not legal advice. Every meaningful document it produces carries a "not legal advice — consult qualified counsel" line in two places. Don't strip those out. Don't ship a policy, regulator correspondence, incident write-up, or framework-touching document without counsel review for your jurisdiction and program. The kit's job is to surface what's risky and structure it well. Your lawyer's job is to bless what goes out.

---

## Test it works

Once the system prompt is loaded, paste this:

```
Test run. I'm the compliance officer at a 220-person Series B healthtech SaaS based in Boston. We process PHI on behalf of covered entities (so we're a business associate under HIPAA), and we have customers in California, New York, and Illinois who push us hard on state privacy obligations. Framework mapping: HIPAA Security Rule + HIPAA Privacy Rule (as BA), SOC 2 Type II (Security + Confidentiality + Privacy criteria), preparing for ISO 27001:2022 in 2027. GRC tool: Vanta. I need an incident write-up structure for the following situation: yesterday at 2:47 PM PT, an engineer accidentally pasted a debug log into our public-facing GitHub repo. The log contained ~40 customer record IDs and IP addresses (no names, no PHI fields, but the IDs map to PHI in our internal system). The repo was public for ~22 minutes before our security team detected it via secret-scanning alert and removed it. We forced a force-push to scrub history. We don't yet know if anyone external accessed the repo during the window. Engineering, security, and the GC are on the bridge. The audience for this write-up is internal counsel; we're going to use it to decide on notification obligations.
```

If you get back:
- An incident write-up with a "counsel-routed, privileged, confidential, not legal advice" header at the top
- A "What we know" section in observable, time-stamped facts (no characterization)
- A "What we don't know" section that explicitly names the open question of external access during the 22-minute window
- A timeline with detection, response, and containment time stamps
- A "Potential framework implications" section that lists HIPAA breach analysis, state breach notification analysis (CA / NY / IL specifically named), and contract notification obligations — all marked "pending counsel"
- No characterization of "this is a breach" or "this is not reportable"
- A "verify before counsel routing" block

— the kit is loaded right. If the output called this incident a "breach" or said it "is not reportable" or skipped the disclaimer, the system prompt didn't load — paste it again.
