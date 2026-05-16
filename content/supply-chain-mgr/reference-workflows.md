# Reference Workflows — Supply Chain Manager Pack

Worked examples. Steal whichever ones map to your category. Names, suppliers, and numbers are placeholders.

---

## 1. RFP body — precision-machined housings (dual-source qualification)

```
RFP-2026-04-GASKETS — Precision-Machined Pump Housings — Dual-Source Qualification
Issued by: Acme Industrial Inc. — Sourcing Team
RFP Coordinator: Maya Chen, Supply Chain Manager — maya.chen@acme.com
Issued: 2026-05-15 | Bids Due: 2026-06-30 EOD ET

1. BACKGROUND
Acme Industrial Inc. is a 600-person manufacturer of industrial pumps for water treatment and process applications, headquartered in Ontario with manufacturing in Mississauga and Buffalo, NY. We're issuing this RFP to qualify a second source for our precision-machined pump housing category (part numbers PH-100 through PH-450 series, annual volume ~24,000 units, annual spend ~$3.2M CAD). Currently sole-sourced; objective is to qualify one additional approved supplier and split volume 70/30 over 12 months.

2. SCOPE OF SUPPLY
Parts: PH-100, PH-200, PH-300, PH-400, PH-450 (drawings attached as RFP-2026-04-DWG-01 through DWG-05)
Material: 316L stainless steel, machined per drawing
Volume: ~24,000 units annual, split across SKUs roughly 30/25/20/15/10
Delivery: weekly releases against blanket PO, EXW supplier facility or DDP Mississauga (bidder to quote both)
Term: 3-year LTA preferred, with annual volume review
Packaging: per Acme spec PS-2024-07 (attached)

3. REQUIREMENTS

Must-haves (pass/fail):
- ISO 9001:2015 certified manufacturing facility
- Documented PPAP process or equivalent
- Capacity to produce 8,000+ units/quarter on the largest SKU
- Demonstrated experience with 316L stainless precision machining (3+ years)
- Located in NAFTA/CUSMA region (Canada, US, Mexico) — geographic risk diversification objective
- Financial: minimum D&B rating 2A2 or equivalent

Should-haves (scored):
- IATF 16949 certification
- ISO 14001 (environmental)
- Existing customers in industrial pump or similar industries
- E-commerce / EDI / portal integration capability (we use Coupa)
- Dedicated account team

Nice-to-haves:
- Engineering capability for VAVE proposals
- Owned tooling or willingness to invest in tooling

4. SUBMISSION REQUIREMENTS
- Pricing schedule per template (attached, RFP-2026-04-PRICING.xlsx)
  - Unit price by SKU at indicative volumes
  - EXW supplier and DDP Mississauga separately
  - Tooling amortization (separate line if applicable)
  - Payment terms (we prefer Net 60; bidders may propose alternatives)
- Lead time committed: stated lead time + standard deviation from your last 12 months on similar parts
- Quality plan / PPAP timeline
- 3 customer references (similar volume, similar parts), with names and contact info
- Audited financial statements last 3 years (or D&B equivalent under NDA)
- Insurance certificates (CGL min $5M, product liability)
- All certifications listed in section 3
- Submission via Coupa portal RFP-2026-04 (link sent under separate cover after NDA)

5. EVALUATION CRITERIA (weighted)

| Criterion | Weight |
|-----------|--------|
| Quality | 25% |
| Cost (total landed) | 25% |
| Delivery (lead time + capacity) | 25% |
| Financial Health | 10% |
| ESG / Risk / Compliance | 15% |

Tie-breaker: geographic diversification preference (favor a non-Mexico location given current sole source in Mexico).

6. TIMELINE
- RFP issued: 2026-05-15
- Q&A window: 2026-05-15 through 2026-06-05 (questions via Coupa portal only)
- Q&A response summary: 2026-06-09
- Optional site visit / capability review: 2026-06-15 through 2026-06-22 (Acme team travels to bidder)
- Bids due: 2026-06-30 EOD ET
- Short list notification: 2026-07-14
- Final site audits (short list only): 2026-07-21 through 2026-08-08
- Award notification: 2026-08-22
- Contract execution target: 2026-09-15
- PPAP submission: 2026-10-15
- First production release: 2026-12-01

7. TERMS & CONDITIONS
Standard Acme Industrial T&Cs apply (attached as Appendix A). Specific clauses bidders should review:
- Payment terms: Net 60 baseline
- Force majeure: standard clause; alternative supply arrangements during force majeure events to be discussed
- IP and tooling ownership: tooling paid by Acme is Acme property
- Liability cap: per T&Cs
- Termination: 90-day notice for convenience after year 1; immediate for cause
- Confidentiality: NDA required before access to drawings; included as Appendix B

Any deviation from standard T&Cs must be flagged in writing in your submission. Silent acceptance is presumed.

CONTACT
All communication during the RFP window must go through the Coupa portal or Maya Chen. No direct contact with engineering, operations, or other Acme functions during the RFP window.

---
Things I assumed that you should verify before issuing:
- Volume figures by SKU — confirm with planning before publishing
- The 70/30 split target — confirm with the COO / VP Supply Chain
- The 3-year LTA preference — confirm contracting authority
- The site visit budget — confirm with finance before committing
- The PPAP timeline — confirm with quality team
```

---

## 2. Supplier scorecard — quarterly review

```
SUPPLIER SCORECARD — Mendoza Precision (Mexico) — Pump Housings — Q1 2026

OVERALL SCORE: 71 / 100
TREND: declining (Q3 2025: 84 → Q4 2025: 79 → Q1 2026: 71)
COMMERCIAL STATUS: On Watch (escalated from Approved as of 2026-04-15)

QUALITY (weight 25% — score 22/25)
- PPM defects: 230 (target 250) — within target
- First-pass yield: 97.8% (target 97%) — on target
- Customer complaints attributed: 1 (Q1) — slightly above zero baseline
- Open NCRs: 2 (one resolved, one in 30-day CAPA window)
- Comments: Quality remains strong. The two NCRs are tied to a specific shift, root cause identified as tooling wear; Mendoza replacing tool by 2026-05-30.

COST (weight 25% — score 18/25)
- YoY price: +0% (held flat from 2025) vs. target -3%
- Cost-down committed: 0% (refused our request in February) vs. target 3%
- Total landed cost vs. budget: +2.1% variance (driven by freight, not unit price)
- Payment terms compliance: Net 60 as agreed
- Comments: Mendoza refused 2026 cost-down and indicated 4% increase request for Q3 due to material costs. We have not agreed to the increase. Pricing conversation is open.

DELIVERY (weight 25% — score 15/25) — MAJOR CONCERN
- OTD%: 79% YTD vs. target 95%
- OTIF%: 73% YTD vs. target 92%
- Lead time stated 8 weeks; actual averaging 12-14 weeks
- Critical past-due lines: 4 (all on PH-300 series)
- Comments: This is the headline issue. Mendoza cites capacity constraints (other customer ramping); we've requested a capacity plan and root cause analysis (CAPA-2026-Q1-MZ-03, due 2026-05-08).

FINANCIAL HEALTH (weight 10% — score 8/10)
- D&B rating: 2A2 (unchanged from prior period)
- Public news: parent company announced expansion in Vietnam in March; doesn't directly affect us, watching
- Concerns from finance: payment from us is current; no concerns flagged

ESG / RISK / COMPLIANCE (weight 15% — score 8/15)
- Certifications: ISO 9001 current (expires 2027-08), IATF 16949 current
- Sustainability disclosure: scoring 2/5 on our supplier ESG survey (industry average 3)
- Geopolitical/SPOF risk: sole source for $3.2M annual spend; concentration risk material
- Cyber: completed our questionnaire, no flags
- Comments: ESG score is below where we want. Sole-source status is the dominant risk — driving our parallel RFP for dual-source qualification.

ACTION ITEMS

For Mendoza:
- Capacity plan response and CAPA-2026-Q1-MZ-03 — due 2026-05-08 (escalated to their VP Operations)
- Cost discussion meeting — week of 2026-05-19 (Maya + Mendoza commercial team)
- Tooling replacement complete and verified — by 2026-05-30
- Q2 OTD recovery plan — submit by 2026-05-15

For us internally:
- RFP-2026-04 second-source qualification — bids due 2026-06-30 (Maya)
- Inventory buffer increase on PH-300 series from 4 weeks to 8 weeks — implement by 2026-05-30 (Maya + planning)
- COO briefing on category exposure — 2026-05-19 (Maya)

NEXT REVIEW: 2026-07-22 (Q2 scorecard)

---
Things I assumed that you should verify before sending the supplier-facing version:
- The OTD/OTIF/PPM numbers — re-pull from the QMS and SAP before sending
- Remove the "concentration risk" and RFP-2026-04 references from Mendoza-facing version
- Tone-check the "On Watch" classification with the VP Supply Chain before formalizing
```

---

## 3. Internal disruption update (Slack/email to ops and CS)

```
Subject: SUPPLY DISRUPTION — PH-300 housings — customer impact ID needed by 4 PM today

Hi team,

Quick update on a supply situation we're managing. Cc: Sandra Ko (COO), Tom Reeves (VP Operations), Aisha Patel (VP Customer Success), Marco Diaz (Sales Lead).

WHAT HAPPENED
Mendoza Precision (sole supplier on PH-300 series pump housings) notified us this morning that they're 2 weeks behind on next Tuesday's shipment due to a tooling failure on their primary CNC line. The shipment of 1,200 units originally planned for 2026-05-20 is now estimated 2026-06-03. Mendoza has confirmed the new date in writing.

CUSTOMER IMPACT
The delayed shipment affects three customer programs:
- Aurora Water (Sask): order 4471, 400 units, original ship 2026-06-02 → now 2026-06-12
- Northpoint Treatment (BC): order 4498, 350 units, original ship 2026-06-04 → now 2026-06-15
- Stormgate Process (AB): order 4502, 450 units, original ship 2026-06-08 → now 2026-06-18

Total revenue at risk in Q2: ~$385K CAD (recoverable in Q3 if delay holds at 2 weeks; further slip puts Q2 recognition at risk).

WHAT WE'RE DOING
- Mendoza repairing tooling — confirmed by 2026-05-23, production restart 2026-05-27
- Exploring air freight on the delayed shipment to recover 4-5 days (cost ~$28K — assessing whether worth it)
- Pulling forward production schedule at our Mississauga facility to give a few days back at our end
- Activating the second-source RFP (RFP-2026-04) timeline — keeping current schedule, not accelerating yet but watching

WHAT WE NEED FROM YOU
- Aisha (CS): hold all customer comms on this until 4 PM today — Maya and Marco will draft the customer-facing language together by 3 PM
- Marco (Sales): pull the contract clauses on delay liability for these three accounts; flag if any have penalty exposure (target by 3 PM today)
- Tom (Ops): confirm whether the Mississauga schedule pull-forward is feasible without affecting other programs (target by 2 PM today)
- Sandra (COO): 1-pager briefing coming to you by EOD tomorrow with options on air freight and Q2 revenue impact

NEXT UPDATE: tomorrow 9 AM, or sooner if Mendoza's repair timeline changes

— Maya

---
Things I assumed that you should verify before sending:
- The Q2 revenue figure ($385K) — confirm with finance
- Customer order numbers and quantities — verify against the SAP open order report
- Mendoza's repair date — confirm you have it in writing, not just a verbal
- The $28K air freight estimate — get a real quote from the freight forwarder
```

---

## 4. Customer-facing delay comm (drafted by SCM, sent by account exec)

```
Subject: Aurora Water — Update on order 4471

Hi Jenna,

Marco asked me to reach out directly on order 4471 (PH-300 housings, 400 units). I want to give you a heads-up that we're tracking a delay on this shipment.

Original commitment: 2026-06-02
Revised commitment: 2026-06-12 (10-day delay)

What's behind it: Our supplier for this part had a tooling failure on their primary production line. They've confirmed the repair will complete by 2026-05-23 and have committed to the 2026-06-12 ship date in writing. The delay affects a number of programs of theirs, so this isn't unique to your order — it's a supplier-side capacity issue, not a quality or design issue with your part.

What we're doing:
- Air freight is on the table to recover some of the time — we'll know by end of next week whether that's the right move; we'll cover the freight cost on our side if we go that route
- We're pulling forward what we can at our Mississauga facility to make sure final assembly and testing don't add to the delay
- We're qualifying a second source for this part on a longer timeline (already in flight before this happened) — we'll have an update for you on that program later in Q3

What we'd appreciate from you: if there's any flexibility on the 2026-06-15 delivery into your site, that gives us a bit of buffer for QC; if 2026-06-12 ship → 2026-06-15 dock is tight on your end, let me know and we'll prioritize the air freight option.

I know this isn't the news you wanted. Happy to jump on a call this week if you want to walk through it. Marco will follow up Friday with a confirmation of where we land on air freight.

Thanks for the patience.

Marco Diaz | Account Executive
[Marco's contact info]

---
Things to verify before Marco sends:
- Mendoza's 2026-06-12 ship date is in writing — DO NOT send if we only have it verbally
- Aurora Water's contract terms — confirm with Marco that there's no penalty clause we're triggering
- The 2-week delay framing — confirm Marco is aligned that we're calling it "supplier-side capacity issue, not quality or design"
- Air freight feasibility — don't reference it as a path if the freight forwarder hasn't confirmed
```

---

## 5. Vendor evaluation memo (post-RFP recommendation)

```
TO: Sandra Ko, COO
CC: Tom Reeves (VP Operations), Lisa Chen (Controller)
FROM: Maya Chen, Senior Supply Chain Manager
DATE: 2026-07-14
RE: RFP-2026-04 — Pump Housing Dual-Source — Recommendation

RECOMMENDATION
Award dual-source qualification to Falcon Precision (Buffalo, NY) at the terms in their bid. Volume split target 70/30 (Mendoza / Falcon) by EOY 2027, ramping through 2026 Q4 and 2027 H1.

CONTEXT
RFP issued 2026-05-15. Five bids received by 2026-06-30 from: Mendoza Precision (incumbent), Falcon Precision (Buffalo, NY), Cascade Machining (Vancouver, BC), Toronto Tool & Die (Mississauga, ON), and Industrial Components (Monterrey, MX). Site audits completed on top 3 (Falcon, Cascade, Toronto) between 2026-07-01 and 2026-07-10.

SCORING SUMMARY

| Supplier | Quality (25%) | Cost (25%) | Delivery (25%) | Financial (10%) | ESG/Risk (15%) | Weighted Total |
|----------|--------------|------------|----------------|-----------------|----------------|----------------|
| Falcon Precision | 22 | 19 | 23 | 9 | 13 | 86 |
| Cascade Machining | 21 | 17 | 22 | 8 | 11 | 79 |
| Toronto Tool & Die | 20 | 16 | 21 | 7 | 12 | 76 |
| Mendoza (reference) | 22 | 20 | 15 | 8 | 8 | 73 |
| Industrial Components | 19 | 22 | 14 | 6 | 7 | 68 |

RATIONALE FOR FALCON

1. Delivery score is the highest in the field (23/25). Stated lead time 6 weeks with 95%+ OTD on similar parts at three reference customers we contacted.
2. Quality score on par with Mendoza's strong baseline. ISO 9001 + IATF 16949 + ISO 14001. PPAP track record on similar parts.
3. Cost: ~6% higher than Mendoza on EXW unit price, but lower total landed cost when freight and duties are factored (US-Canada CUSMA, vs. Mexico-Canada). Net total landed cost ~2% lower.
4. Geographic diversification: Buffalo NY is the strongest hedge against the current Mexico exposure (Mendoza). Cascade BC was second-best on geography but lower on capacity.
5. Financial: D&B 2A1, family-owned, third-generation, healthy balance sheet.

WHAT WE'RE GIVING UP
- Falcon is more expensive on unit price (~6%). Total landed cost gap closes the difference. We absorb the unit-price line in the budget; landed cost is on plan.
- Falcon's capacity is good for our 30% share but not for full volume. If Mendoza fails entirely, Falcon would need 6-9 months to scale to full volume; we'd need a third source qualified by then.
- Smaller operation than Industrial Components; less depth on engineering support (we rated this acceptable for this category).

CONDITIONS / PRE-AWARD
- Sample submission and PPAP target completion: 2026-10-15
- First production release: 2026-12-01
- Tooling: Falcon to invest in their tooling (~$185K, amortized over 3-year LTA)
- Site visit: completed 2026-07-08 — site, quality systems, capacity all verified

POST-AWARD RISKS
- Falcon's first PPAP for an Acme part — expect 4-6 weeks of close support from our quality team
- Mendoza reaction: we expect them to come back with a more favorable cost-down conversation once they know we have a second source. Plan to use this in the next Mendoza commercial review.
- Currency: Falcon prices in USD; mild CAD/USD exposure (~$960K USD annual at 30% volume). Treasury aware.

WHAT I NEED FROM YOU
Approval to issue award notice to Falcon and decline notices to the other four bidders by EOD Friday 2026-07-18. If you have concerns, happy to walk through in person before then.

NEXT STEPS (if approved)
- 2026-07-18: Award notice to Falcon, decline notices to others
- 2026-07-25: Contract negotiation kickoff
- 2026-09-15: Contract execution target
- 2026-10-15: PPAP submission
- 2026-12-01: First production release
- 2027-01: Mendoza commercial review (renegotiation conversation)

---
Things I assumed that you should verify before issuing decisions:
- The CAD/USD exposure on Falcon volume — confirm with treasury
- The contract negotiation timeline — confirm legal availability
- The Mendoza renegotiation timing — coordinate with the broader category strategy
```

---

## 6. Category strategy outline — pump housings

```
CATEGORY STRATEGY — Pump Housings (PH-100 through PH-450) — 2026-2028 — Maya Chen

CURRENT STATE
- Annual spend: $3.2M CAD (24,000 units, blended)
- Suppliers: Mendoza Precision (Mexico) 100%
- Kraljic position: Strategic (high spend, high supply risk — custom-tooled, no easy alternative)
- Performance (TTM): OTD 79%, PPM 230 (good), cost +0% YoY (flat)
- Key risks: sole source on $3.2M strategic part; supplier capacity constraints; geographic concentration in Mexico

MARKET CONTEXT
- Credible suppliers in North America: ~6-8 for our spec, capacity varies
- Recent precision machining cost trend: +3-5% YoY on 316L due to material and labor
- Geographic shifts: nearshoring trend post-2020 has expanded US/Canada precision machining capacity
- Technology: 5-axis CNC has become more common, reducing setup costs on complex housings
- ESG: customers (water utilities) increasingly asking for supply chain sustainability disclosure

OBJECTIVES (2026-2028)
- Resilience: no single source on PH-300 series by EOY 2027 (highest customer-impact part)
- Resilience: no single source on full category by EOY 2028
- Cost: hold total landed cost flat YoY despite material/labor inflation (counter via supplier mix, VAVE, contract terms)
- Quality: PPM <250 sustained
- Delivery: category-level OTD >92% by EOY 2027 (currently 79% on incumbent)
- ESG: all approved suppliers scoring 3+ on our supplier ESG survey by EOY 2028

LEVERS
1. Diversification: add Falcon Precision (Buffalo, NY) via RFP-2026-04. Target 70/30 split by EOY 2027.
2. Commercial: with second source in place, renegotiate Mendoza terms in Q1 2027 — target 3% cost-down annually for 3 years in exchange for committed volume floor.
3. VAVE: engineering review of PH-300 series in Q3 2026 — opportunity to reduce machining time by ~8% via tolerance review; would lower cost from both suppliers.
4. Geographic: avoid concentrating second source in Mexico. Falcon (US) plus potential third source in Canada (Cascade evaluated, on the radar for 2028).
5. Contract: move from PO-based to 3-year LTA with both qualified suppliers, with annual volume review and indexed pricing on material component.

ROADMAP

Q2-Q3 2026:
- RFP-2026-04 award (target 2026-07-18, Falcon)
- Falcon contract execution (target 2026-09-15)
- VAVE engineering review of PH-300 series

Q4 2026:
- Falcon PPAP (target 2026-10-15)
- Falcon first production release (target 2026-12-01)
- Mendoza Q4 scorecard with second-source context

Q1-Q2 2027:
- Falcon ramp to 30% volume on PH-300
- Mendoza commercial review and 3-year LTA renegotiation
- Third-source evaluation for PH-400/450 (Cascade or Canadian alternative)

Q3-Q4 2027:
- Achieve 70/30 Mendoza/Falcon split on PH-300 series
- Begin third-source qualification for PH-100/200 (Canadian alternative)

2028:
- Achieve no-single-source status on full category
- Annual cost-down 3% YoY with both qualified suppliers

KPIs
- Category OTD% (target 92%+)
- Single-source spend exposure (target $0 by EOY 2028)
- Cost vs. budget (target ±2%)
- Supplier ESG score (target 3+ for all approved)
- Reported quarterly to COO; full QBR with VP Supply Chain

TOP 5 RISKS
1. Mendoza terminates relationship in response to dual-sourcing decision — Mitigation: maintain commercial respect, communicate dual-sourcing rationale (resilience, not punishment), preserve volume floor in renegotiation. Owner: Maya
2. Falcon PPAP slips — Mitigation: tight quality team engagement, weekly check-ins during qualification. Owner: Maya + Quality Manager
3. Customer demand surge outpaces dual-source capacity — Mitigation: capacity discussion in Falcon contract; third-source evaluation kept on the back burner. Owner: Maya + Planning Manager
4. Material cost inflation accelerates beyond LTA indexing — Mitigation: index price clause in both contracts tied to 316L LME tracker. Owner: Maya
5. ESG requirements from water-utility customers tighten faster than supplier base can comply — Mitigation: include ESG improvement plans in supplier QBRs; flag at supplier qualification. Owner: Maya

---
Things I assumed that you should verify before publishing:
- Volume projections through 2028 — coordinate with sales and planning
- The CAD spend figures — confirm with finance
- Falcon's capacity figures — confirm against their RFP response and site audit notes
- The 316L LME index reference — confirm with treasury / commodity desk
- The 2028 third-source target — align with VP Supply Chain on appetite for further qualification spend
```
