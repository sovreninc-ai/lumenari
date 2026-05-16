# Reference Workflows — Procurement Specialist Pack

Real worked examples. Steal whichever ones map to your category. Names, dollar amounts, and dates are placeholders. Adapt to your tooling (Coupa / Ariba / Jaggaer / GEP) and to your stakeholder approval chain.

---

## 1. RFI — capability scan for a new category

```
RFI: Threat Intelligence Platform Capability Scan
Issued by: [Company] Procurement | Issue date: 2026-05-20

1. INTRODUCTION
[Company] is conducting a market scan of threat intelligence platform (TIP) providers to inform a potential RFP later this fiscal year. This is an RFI, not an RFP. No award decision will be made on the basis of this response. No costs incurred by respondents are reimbursable. Inclusion in this RFI does not guarantee invitation to a subsequent RFP.

2. SCOPE AREA
We are evaluating commercial TIP solutions to support a 24x7 security operations center. Approximate environment: 12,000 endpoints, hybrid cloud (AWS + Azure), SIEM is Splunk Enterprise Security, SOAR is in evaluation. We have an incumbent TIP we are not naming in this RFI.

3. CAPABILITY QUESTIONS — respond in the order asked, no longer than 2 pages per section

A. Company overview
- Year founded, headcount, ownership structure, revenue range
- Geographic presence and 24x7 support footprint
- Top 3 customer segments and 3 reference customers willing to take a 30-min call

B. Solution overview
- Deployment model (SaaS, on-prem, hybrid)
- Data sources ingested and feed partnerships
- Coverage areas (IOCs, TTPs, vulnerability intel, brand monitoring, dark web)
- Integration approach to Splunk ES and major SOAR platforms

C. Pricing model (NOT pricing — the model only)
- Per-user, per-asset, per-feed, flat, tiered
- Variables that move pricing materially
- Minimum commitment / contract term assumptions

D. Security and compliance
- SOC 2 Type II, ISO 27001 status and certification dates
- Data residency options (US, EU, Canada)
- Subprocessor list and third-party audit posture

E. Sustainability / ESG
- ESG reporting maturity
- Diversity disclosures, supplier diversity programs

4. SUBMISSION
- PDF, max 15 pages excluding appendices
- Submit via Coupa supplier portal (link in invitation) OR sealed email to procurement@[company].com
- Deadline: 2026-06-10, 17:00 ET
- Confidentiality: RFI marked confidential; NDA on file for all invited respondents

5. WHAT HAPPENS NEXT
Procurement and security leadership will review responses through end of June. We may invite a subset of respondents to demo sessions in July. An RFP to a short list is possible in Q4. We will notify all respondents either way by end of August.

6. CONTACT
Single point of contact: [Buyer name], Procurement, [email], [phone]
Do NOT contact security, IT, or executive leadership directly. Any communication outside this channel may result in disqualification from future opportunities.

---
Things to verify before sending:
- Confirm Coupa supplier portal link is live and respondents are pre-loaded
- Confirm NDA template is current and CISO has signed for [Company] side
- Confirm incumbent contract renewal date is not within the RFI window (to avoid signaling)
```

---

## 2. RFQ — direct material, defined spec

```
RFQ: Precision-Machined Aluminum Bracket P/N 47821, Rev C
Issued by: [Company] Procurement | Issue date: 2026-05-20

1. INTRODUCTION
[Company] requires quotes for the part below. We are dual-sourcing this part starting Q3. The incumbent is one of our approved suppliers and is invited to re-quote.

2. SPECIFICATION
- Part number: 47821, drawing rev C dated 2026-04-15
- Material: 6061-T6 aluminum
- Process: CNC machined, anodized clear
- Volume forecast: 24,000 units annual, EAU split across 4 quarterly releases
- Term: 2-year base + 1-year extension at [Company] option
- Delivery: FCA supplier dock, [Buyer] freight forwarder, weekly milk run
- Lead time: 4 weeks max from PO release
- Quality: PPAP Level 3, Cpk ≥ 1.33 on critical dimensions listed in drawing notes, ISO 9001 certified supplier required, IATF 16949 preferred

3. COMMERCIAL TERMS BASELINE
- Currency: USD
- Payment terms: Net 45 baseline. Propose alternative if needed.
- Pricing structure: firm fixed price for Year 1. Year 2 price adjustment indexed to CRU North American aluminum, capped at +/- 5% YoY.

4. SUBMISSION REQUIREMENTS
- Pricing schedule template (attached, Coupa sourcing event #34782)
- Unit price + tooling cost (if any) + minimum order quantity
- Lead time commitment including PPAP submission timeline
- Capacity confirmation: monthly capacity available for this part
- Insurance: $2M CGL minimum, certificate to be on file before first delivery
- Quality certifications attached
- Submission via Coupa sourcing event #34782
- Deadline: 2026-06-13, 17:00 ET

5. EVALUATION
- Primary: total landed cost (unit price + freight + duties + applicable inventory carrying based on stated lead time)
- Secondary: lead time, payment terms, quality plan acceptability, capacity confirmed
- Tie-breakers: geographic risk diversification (we currently single-source in Asia), incumbent status

6. AWARD
Award subject to:
- Internal approval (Engineering, Quality, Procurement sign-off)
- Contract execution under our MSA template
- Successful PPAP submission
- First article approval

LOI not binding. No commitment until contract signature and PPAP approval. Participation in this RFQ does not create a contract.

---
Things to verify before sending:
- Confirm drawing rev C is the current revision (Engineering)
- Confirm volume forecast with S&OP — 24,000 EAU is the consensus number
- Confirm dual-source plan has Engineering and Quality sign-off
```

---

## 3. RFP body — multi-criteria services sourcing

(Abbreviated to show the structure. Full RFP runs 12-20 pages.)

```
RFP: Marketing Agency of Record — Creative + Paid Media
Issued by: [Company] Procurement | Issue date: 2026-05-20

1. BACKGROUND
[Company] is a $400M B2B SaaS company serving mid-market enterprise customers in North America and EMEA. Our current agency of record contract is up for renewal in Q3. We are running a competitive RFP to ensure our agency model is fit for our next phase of growth (revenue target $700M by 2028, brand refresh in flight). Three to five agencies will be invited to bid. Incumbent is invited and will be evaluated on the same criteria as new entrants.

2. SCOPE OF WORK
- Creative: brand campaigns (2 major + 4 minor annually), website refresh support, video production, sales enablement collateral
- Paid media: planning, buying, and optimization across search, social, programmatic, content syndication. Annual paid media budget envelope: $4.5M-$6M, agency fee separate
- Marketing operations support (Marketo / 6sense / Demandbase integration touchpoints)
- Reporting: weekly performance dashboards, monthly executive readout, quarterly board-ready summary

3. REQUIREMENTS
Must-haves (pass/fail):
- B2B SaaS experience, demonstrated by 3+ references with similar ARR scale
- Office presence in [primary market] or proven distributed working model
- Data privacy posture compliant with GDPR, PIPEDA, CCPA — DPA available for review
- Ability to start within 30 days of award

Should-haves (scored):
- Account-based marketing (ABM) experience and tooling integration
- In-house creative production (not 100% freelance bench)
- Programmatic buying capability in-house (not white-labeled)

Nice-to-haves:
- Industry analyst relations support
- Partner co-marketing experience

4. SUBMISSION REQUIREMENTS
- Proposed approach to our scope (max 25 pages)
- Team and staffing model with named individuals
- Pricing schedule (template attached — retainer vs project-based options)
- 3 reference customers with contact info, willing to take a 30-min call
- Financial disclosure (D&B equivalent or audited statements)
- Insurance certificates (E&O $5M, CGL $2M)
- Information security: SOC 2 Type II (or equivalent), data subprocessor list
- Submission via Workday Strategic Sourcing event #SRC-2026-0421
- Deadline: 2026-06-30, 17:00 ET

5. EVALUATION CRITERIA (weighted, stated)
- Strategic / creative capability: 30%
- Paid media performance and approach: 25%
- Team and account structure: 15%
- Total cost (retainer + project fees + media commission TCO): 20%
- Financial health, references, security/compliance: 10%

6. TIMELINE
- RFP issued: 2026-05-20
- Bidder Q&A window: through 2026-06-13
- Q&A responses published: 2026-06-17
- Bids due: 2026-06-30
- Short list notification: 2026-07-15
- Orals / chemistry meetings: week of 2026-07-22
- BAFO: 2026-08-05
- Award notification: 2026-08-15
- Contract execution: 2026-09-12
- Transition / kickoff: 2026-10-01

7. TERMS & CONDITIONS
- Buyer's paper MSA template attached as Appendix C — bidders to flag any deviations in submission
- NDA executed before RFP shared (all invited bidders)
- IP, indemnification, limitation of liability — flagged for review by both parties' legal; final terms negotiated post-award
- Payment terms baseline: Net 45
- Force majeure: standard
- Termination for convenience: 60 days with reasonable transition cooperation
- Note to bidders: any deviation from T&Cs must be called out in writing in your submission

This RFP and any award is contingent on internal approval, contract execution, and applicable legal review. No commitment is created by participation in this RFP.

---
Things to verify before sending:
- Confirm CMO has signed off on RFP scope, evaluation weights, and target award date
- Confirm legal has reviewed MSA template before it goes out as Appendix C
- Confirm finance has approved the spend envelope as the budget basis for evaluation
- Confirm incumbent communication plan is in place (do not surprise the AOR)
```

---

## 4. Supplier email — T&Cs pushback

```
Subject: T&Cs review on MSA — three items for discussion before signature

Hi Marco,

Thanks for the redlines you sent Friday. We've reviewed on our side. Three items we need to work through before we can route this back to legal on our end:

1. Indemnification — Section 9.2
Your redline narrows mutual indemnity to "direct third-party claims arising from gross negligence or willful misconduct." We need this broadened to include claims arising from breach of confidentiality and IP infringement, which is a baseline our MSA template requires. Suggested redline: revert to original language with addition of "and breach of Sections 7 (Confidentiality) and 8 (IP)."

2. Limitation of Liability — Section 10.1
Your redline caps liability at "fees paid in the preceding 6 months." Our baseline is 12 months. The supercap for IP infringement, breach of confidentiality, and gross negligence/willful misconduct should be unlimited (or at minimum 3x annual contract value). Suggested redline: cap at 12 months fees; supercap at 3x annual contract value for the named carve-outs.

3. Audit rights — Section 12.3
You've removed audit rights entirely. Our baseline retains audit rights with 30 days notice, no more than once per 12 months, scope limited to compliance with this agreement, and cost of audit borne by the auditor unless material non-compliance is found. We can't proceed without an audit clause — flag this for your team.

We're routing all three to our legal team for final review once we have alignment on direction. Can you respond by Thursday EOD with your team's position so we can keep the August 15 signature target?

If easier, propose a 30-min call this week.

Thanks,
[Buyer name]
Procurement | [Company]
[phone] | [email]

---
Things to verify before sending:
- Confirm with legal that the supercap structure (3x annual contract value) is the agreed pushback on LOL
- Confirm with finance that the August 15 signature date is still the hard target
- Add legal counsel on cc once supplier responds with their position
```

---

## 5. Supplier email — non-award letter

```
Subject: RFP outcome — AOR selection 2026

Hi Sarah,

Thank you for the time and care your team put into the RFP response and the August 5 orals session. The proposal was thoughtful and well-presented.

We've made a final decision and have selected another agency for the AOR engagement. The decision was driven by overall alignment with the criteria we communicated in the RFP, particularly across capability, team structure, and total cost.

We won't be sharing detailed feedback or scoring rationale. If we run a future RFP in scopes adjacent to your strengths, we'll consider inviting you, assuming organizational fit remains aligned at that time.

We appreciate the professionalism of your team throughout this process.

Best,
[Buyer name]
Procurement | [Company]

---
Things to verify before sending:
- Confirm award letter to winning agency has been sent first (and contract signed or near signed)
- Confirm CMO has signed off on this language
- Do NOT send before the winning agency contract is locked, in case the winner pulls out and you need to reopen with finalists
```

---

## 6. Contract review summary — applied to a sample MSA

```
CONTRACT REVIEW — Acme SaaS Vendor MSA — Initial Review — 2026-05-20

DISCLAIMER: This is a procurement first-pass review. It is NOT legal advice. All red and yellow flags require review by qualified legal counsel before signature. Procurement does not interpret contract terms — we flag risk allocation changes for counsel.

RED FLAGS (escalate to legal before negotiation) — [VERIFY WITH LEGAL]

1. Indemnification — Section 8
Contract says: One-way indemnity in favor of supplier for claims arising from our use of the service. No reciprocal indemnity from supplier for IP infringement, breach of confidentiality, or violation of law. Risk: catastrophic exposure on IP and data claims with no supplier backstop. Recommended path: redline to mutual indemnification with carve-outs for IP infringement, breach of confidentiality, and gross negligence — supplier-side, uncapped. [VERIFY WITH LEGAL]

2. Limitation of Liability — Section 9
Contract says: All damages capped at "fees paid in the prior 3 months." Excludes consequential, indirect, incidental damages. Risk: 3-month cap is far below market for SaaS at our spend level. Recommended path: push to 12-month cap with 3x supercap for IP, confidentiality, gross negligence/willful misconduct carve-outs. [VERIFY WITH LEGAL]

3. Data protection — Section 11
Contract says: Generic confidentiality clause, no DPA, no SCCs for EU data transfer, no breach notification timeline. Risk: GDPR exposure on EU customer data, no notification SLA on a breach. Recommended path: require execution of DPA template (ours), include SCCs for EU transfer, 72-hour breach notification. [VERIFY WITH LEGAL]

4. Termination for Convenience — Section 14
Contract says: Supplier may terminate for convenience with 90 days notice. Buyer (us) may not. Risk: asymmetric termination right, supplier can walk on convenience but we are locked in. Recommended path: mutual TFC right at 90 days, or remove supplier's TFC right entirely. [VERIFY WITH LEGAL]

5. Audit rights — Section 16
Contract says: No audit rights. Risk: cannot verify compliance with security, data handling, or invoicing accuracy. Recommended path: insert audit clause — 30 days notice, once per 12 months, scope limited to compliance with this agreement, supplier-side cost unless material non-compliance found. [VERIFY WITH LEGAL]

YELLOW FLAGS (negotiate with legal coverage)

6. Payment terms — Section 6
Contract says: Net 30. Buyer baseline: Net 45. Recommended position: push to Net 45 or Net 60 with 2/10 early payment discount option.

7. Price adjustment — Section 7
Contract says: Supplier may increase fees annually at supplier's sole discretion, with 30 days notice. Recommended position: cap annual increase at 5% or CPI (whichever is lower), 90 days notice, right to terminate without penalty if increase exceeds cap. [VERIFY WITH LEGAL]

8. Acceptance / rejection rights — Section 4
Contract says: Service deemed accepted on go-live. No formal acceptance criteria. Recommended position: 30-day acceptance window with defined acceptance criteria tied to SOW.

GREEN (procurement negotiates without legal sign-off)

9. SLA structure — Schedule A
Contract says: 99.9% uptime, no service credit framework. Recommended position: keep 99.9% uptime; add service credit table (5% credit at 99.5%, 10% at 99%, 25% at <99%, termination right at sustained <99% over 3 months).

10. Reporting cadence — Section 5
Contract says: Quarterly business review at supplier's discretion. Recommended position: quarterly QBR with agenda, scorecard, action items — mandatory.

SUMMARY
- Total red flags: 5
- Total yellow flags: 3
- Green items: 2 (negotiable without legal)
- Recommended path: escalate red flags to legal immediately before opening negotiation with supplier. Negotiate yellow flags in parallel with legal CC'd. Procurement handles green items.

NEXT STEPS
1. Route this summary to legal counsel today
2. Schedule 30-min legal sync within 5 business days to align on red-flag pushback positions
3. Draft consolidated counter-redline (this template + legal additions) before responding to supplier
4. Estimated time to negotiated signature: 4-6 weeks if supplier engages in good faith

---
Things to verify before sending:
- All red and yellow items must be reviewed by qualified legal counsel before any commitment to the supplier
- Procurement does NOT interpret legal language — escalation to counsel is non-negotiable on red flags
- This summary should not be shared with the supplier directly — it is internal pre-negotiation positioning
```

---

## 7. Savings report — committed savings, end of sourcing event

```
SAVINGS REPORT — Q3 2026 Committed — Indirect Categories — 2026-09-30

METHODOLOGY
- Baseline: FY26 actual run-rate spend (12-month trailing)
- Intervention: per line below — negotiated reductions, supplier consolidation, demand reductions, avoided increases
- Realized period: committed at contract signature; realized as invoices clear
- Attribution: cost-reduction (P&L) vs cost-avoidance reported separately
- Reconciliation: each line tied to a GL account, signed off by [Finance partner name]

LINE ITEMS

| # | Supplier | Category | Baseline ($) | Negotiated ($) | Volume | Annualized Savings ($) | YTD Realized ($) | Committed Remainder ($) | Type | GL Account | Finance Sign-off |
|---|----------|----------|--------------|----------------|--------|------------------------|------------------|-------------------------|------|------------|------------------|
| 1 | Threat Intel Provider X | Cybersecurity | $480,000 | $384,000 | 12,000 endpoints | $96,000 | $24,000 | $72,000 | Cost-Reduction | 6210 IT Security | [Initials] 2026-09-28 |
| 2 | Print Vendor consolidation | Office Services | $320,000 | $245,000 | (3 vendors → 1) | $75,000 | $18,750 | $56,250 | Cost-Reduction | 6105 Facilities | [Initials] 2026-09-28 |
| 3 | Cloud egress (avoided increase) | Cloud Infrastructure | $1,200,000 (proposed +18%) | $1,080,000 (negotiated +8%) | YoY contract | $120,000 | $0 | $120,000 | Cost-Avoidance | 6310 Cloud | [Initials] 2026-09-28 |
| 4 | Legal services panel restructure | Legal | $850,000 | $722,500 | Same scope | $127,500 | $31,875 | $95,625 | Cost-Reduction | 6420 Legal | [Initials] 2026-09-28 |
| 5 | Marketing agency BAFO | Marketing | $3,200,000 | $3,040,000 | Same scope | $160,000 | $0 (new contract starts Oct 1) | $160,000 | Cost-Reduction | 6510 Marketing | [Initials] 2026-09-28 |

TOTAL
- Cost-reduction (P&L impact): $458,500 annualized
- Cost-avoidance (avoided increase, no P&L): $120,000 annualized
- Combined committed: $578,500 annualized
- vs. FY27 plan ($550,000 cost-reduction target): +$8,500 vs plan on cost-reduction line

CALLOUTS
- Marketing AOR savings are committed at signature (Oct 1) — Q4 will be the first realization quarter
- Cloud egress savings: cost-avoidance only. The CFO views this as a credibility item — finance has signed off but it does NOT show as a P&L improvement
- Legal panel restructure assumes flat volume — if litigation activity increases, savings will not fully materialize
- Threat Intel Provider X: committed at $96K but realization depends on no scope creep during the term

AT RISK
- Marketing AOR savings: dependent on the new agency hitting Q1 deliverables on time (transition risk)
- Cloud egress: cost-avoidance number is sensitive to actual usage growth vs forecast

---
Things to verify before sending:
- Confirm each GL account assignment with finance partner before publishing
- Confirm cost-avoidance vs cost-reduction split is consistent with how the CFO has historically reported
- Confirm the Q4 realization timing for the AOR contract reflects actual contract effective date
- For the cloud egress line: confirm baseline (the +18% proposed) is the correct comparator — get it in writing from the supplier
```

---

## 8. Savings report — realized savings, year-end with finance reconciliation

```
SAVINGS REPORT — FY26 Realized — Year-End — 2027-01-15

METHODOLOGY
- Baseline: budgeted spend by category per FY26 plan
- Intervention: tracked per sourcing event log (see appendix)
- Realized period: full FY26 (Jan 1 - Dec 31)
- Attribution: cost-reduction vs cost-avoidance reported separately
- Reconciliation: tied to GL actuals through close of FY26, finance partner [name] confirmed

CATEGORY ROLLUP

| Category | Plan Savings (Cost-Reduction) | Realized (Cost-Reduction) | Variance | Plan Cost-Avoidance | Realized Cost-Avoidance |
|----------|-------------------------------|---------------------------|----------|---------------------|-------------------------|
| Cybersecurity | $250,000 | $268,000 | +$18,000 | $80,000 | $112,000 |
| Cloud Infrastructure | $400,000 | $312,000 | -$88,000 | $200,000 | $245,000 |
| Marketing Services | $300,000 | $245,000 | -$55,000 | $0 | $0 |
| Legal Services | $150,000 | $182,000 | +$32,000 | $0 | $0 |
| Office Services / Facilities | $120,000 | $134,000 | +$14,000 | $40,000 | $38,000 |
| Travel & Expense | $200,000 | $156,000 | -$44,000 | $0 | $0 |
| Total | $1,420,000 | $1,297,000 | -$123,000 | $320,000 | $395,000 |

VARIANCE COMMENTARY (cost-reduction only — the line CFO tracks)
- Cloud Infrastructure: -$88K vs plan. Cause: scope expansion mid-year (new AI/ML workloads) inflated baseline. Real savings were achieved but absorbed by demand growth. Methodology issue: baseline should have been re-baselined when scope changed. Recommend FY27 protocol: baseline reset on any scope change >10%.
- Marketing Services: -$55K vs plan. Cause: AOR transition pushed actual savings into Q4 only (1 quarter realized vs 4 quarters planned). True annualized savings on track but FY26 realized lower than planned. Q1 FY27 should show full run-rate.
- Travel & Expense: -$44K vs plan. Cause: travel volume rebounded faster than the demand-management plan assumed. Negotiated rates held; volume exceeded the assumption. Recommend revisit the demand-management baseline for FY27.

RECONCILIATION
All cost-reduction lines tied to GL actuals through FY26 close. Finance partner [name] has signed off on reconciliation as of 2027-01-12. Variance commentary above is shared with CFO ahead of January business review.

CFO TALKING POINTS (for the year-end review)
1. Realized $1.297M against $1.42M cost-reduction plan — 91% to plan.
2. Methodology held: every line reconciled to GL, no "phantom savings."
3. Two structural learnings for FY27: re-baseline on scope change >10% (cloud), and revisit demand-management assumptions when post-pandemic categories rebound (travel).
4. Cost-avoidance overdelivered ($395K vs $320K plan). Separately reported. Does not hit P&L the same way; reported for credibility, not for CFO P&L impact.

---
Things to verify before sending:
- Reconfirm all GL ties with finance partner before publication
- Confirm cost-avoidance framing aligns with how CFO has historically reported (some CFOs roll cost-avoidance into the savings number; ours does not)
- Confirm the FY27 protocol recommendations (re-baseline on scope change, demand-management revisit) have been discussed with category leads before broadcasting
```
