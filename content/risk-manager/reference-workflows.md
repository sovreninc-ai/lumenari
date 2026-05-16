# Reference Workflows — Risk Manager Pack

Worked examples. Steal the structures, swap your taxonomy, scale, and facts.

---

## 1. Risk register entry — vendor concentration

```
RISK ID: TPR-2026-014
TITLE: Single-source dependency on core banking platform vendor (CBPV-1)
CATEGORY: Third-Party / Operational / Technology
OWNER: COO (J. Halberg)

DESCRIPTION
Loan servicing operations run entirely on a single Tier-1 SaaS core banking platform (CBPV-1). No qualified second source is in production today. A material service disruption, vendor failure, or hostile change-in-control event at CBPV-1 would result in immediate degradation of our ability to service the loan portfolio and could cascade into compliance and customer-impact events within 24-72 hours.

LIKELIHOOD
- Inherent: High (25-60% over 24 months) — based on industry vendor consolidation pressure, recent reports of leadership change at CBPV-1, and SOC 2 exceptions in change management
- Residual: Moderate (5-25% over 24 months) — monitoring, escalation paths, and BCP reduce the likelihood of an undetected or unmitigated event

IMPACT
- Inherent: Very High ($40M+) — full loan servicing operation depends on CBPV-1; 30-day outage at peak servicing volume estimated at $35-60M revenue + recovery + customer reimbursement + regulatory cost; reputational impact in scope for top 10 institutional partners
- Residual: High ($10-40M) — manual workaround documented in BCP allows ~30-day partial operation but degrades materially after 30 days

VELOCITY
- Acute: a hostile event (insolvency, ransomware, regulatory shutdown of CBPV-1) could impact within hours. A controlled wind-down or notice-of-termination would manifest over 60-90 days.

KEY CONTROLS IN PLACE
- Vendor health monitoring (financial, operational, regulatory) — Owner: VP Risk + Procurement | Last tested: 2026-09-01 | Status: operating
- Escalation path with named CBPV-1 executives — Owner: COO | Last tested: 2026-07-12 | Status: operating
- Documented BCP including manual servicing workaround — Owner: COO | Last tested: 2026-05 (table-top, partial) | Status: tested but not run in production
- Contractual rights: SLA 99.9%, change-of-control notice clause, audit rights, transition assistance clause — Owner: GC | Status: in force, contract renewal 2027-04

TREATMENT STRATEGY
- Mitigate (current state with controls above)
- Under consideration: move toward dual-source by qualifying a second core banking platform over an 18-month period (estimated $4-7M implementation, $1.5M/yr incremental run-rate). This would change treatment to a combination of Mitigate (operational redundancy) + Transfer (no insurance product realistically covers this — flagged for insurance review).

KRIs / EARLY WARNING INDICATORS
| Metric | Threshold | Current | Owner |
| CBPV-1 financial health score | >75 | 78 (Q3 2026 down from 82) | VP Risk |
| Public news / negative coverage (90-day rolling) | <3 items | 4 items YTD | VP Risk |
| SOC 2 exception count (CBPV-1) | <=1 | 2 (2025 audit) | Compliance |
| Time to escalate (test response) | <2 hours | 3.5 hours (last test) | COO |
| Days of receivables manual-workaround capacity | >30 days | ~30 days (untested in production) | COO |

TREND
Deteriorating. The financial health score dropped 4 points in Q3, two SOC 2 exceptions in 2025, and public reports of a leadership change at CBPV-1 collectively shift our view from Moderate to High inherent likelihood.

DEPENDENCIES
- Connected risks: TPR-2026-009 (vendor financial health monitoring program), TPR-2026-021 (BCP testing program), OPS-2026-007 (loan servicing operational risk), COM-2026-011 (regulatory loan-servicing obligations)
- External factors: industry consolidation pressure on core banking platforms; regulatory expectations on critical service provider concentration (OCC TPRM guidance, NYDFS Part 500 third-party)

LAST REVIEWED: 2026-09-15
NEXT REVIEW: 2026-12-15 (post-Q4 audit committee, post-vendor financial filings)

---
Assumptions I made / numbers I used — verify before publishing:
- The Inherent impact band ($35-60M revenue at 30-day outage) — confirm with finance modeling
- The 78 financial health score — confirm with vendor monitoring service
- The 2025 SOC 2 exception count (2) — confirm with the actual report
- The $4-7M dual-source implementation estimate — confirm with IT and procurement
- The 30-day manual workaround capacity — confirm with COO; flag that it's untested in production
- The OCC/NYDFS regulatory dependencies — confirm with compliance counsel for current expectations
```

---

## 2. Mitigation plan — same risk, second-source path

```
MITIGATION PLAN — TPR-2026-014 — Single-source dependency on CBPV-1
Owner: COO (J. Halberg) | Last updated: 2026-09-20

CURRENT RESIDUAL POSITION
Likelihood: Moderate (5-25% over 24 months) | Impact: High ($10-40M)
Trend: deteriorating (Q3 2026)

TARGET RESIDUAL POSITION (24-month horizon)
Likelihood: Low (<5% of full-portfolio impact) | Impact: Moderate ($2-10M)
Achieved through operational dual-source on critical servicing functions.

GAP
Move from single-source to dual-source on the critical 30% of servicing functions that drive revenue and customer impact during an outage window. Leave non-critical functions on CBPV-1 for now (cost-effectiveness; revisit at end of dual-source phase 1).

ACTIONS
| # | Action | Owner | Start | Due | Dependencies | Status |
| 1 | Second-source RFP issued (3-5 platforms qualified to bid) | VP Procurement + COO | 2026-10-01 | 2026-12-15 | Board approval of dual-source spend | Pending board |
| 2 | Vendor diligence on shortlist (SOC 2, financial, reference calls, site visits) | VP Risk + IT | 2026-12-15 | 2027-02-28 | RFP responses | Not started |
| 3 | Award + contract execution | GC + COO + VP Procurement | 2027-03-01 | 2027-04-30 | Action 2 complete | Not started |
| 4 | Phase 1 integration build (critical 30% functions) | CTO + VP Eng | 2027-05-01 | 2027-11-30 | Action 3 complete | Not started |
| 5 | Phase 1 production cutover (parallel run) | CTO + COO | 2027-12-01 | 2028-02-28 | Action 4 complete | Not started |
| 6 | Phase 1 control effectiveness testing | VP Risk + Audit | 2028-03-01 | 2028-05-31 | Action 5 complete | Not started |
| 7 | Update register, BCP, and KRIs to reflect new residual | VP Risk | 2028-06-01 | 2028-06-30 | Action 6 complete | Not started |

CONTROL EFFECTIVENESS TESTING
- Quarterly: vendor health monitoring on both CBPV-1 and the second-source provider
- Semi-annual: failover exercise (table-top first, then partial-failover in non-prod)
- Annual: full BCP test including manual workaround and second-source failover
- All test results documented; deviations reported within 10 business days

COST
- Implementation (one-time): $4-7M over 18 months — software, integration, project staffing, parallel-run cost
- Run-rate (incremental annual): $1.5M/yr (second-platform licensing + ongoing operations)
- Total 3-year cost: $8.5-11.5M
- Cost is material; trade-off is reducing inherent dependency on a single Tier-1 SaaS vendor

DECISION REQUIRED
Board approval of the dual-source initiative, including the $4-7M implementation budget and the $1.5M/yr incremental run rate. Recommended action by Q4 2026 audit committee meeting to enable the 2027 work plan.

ESCALATION PATH
If board approval slips past 2027-01-31, the RFP issuance moves to Q2 2027 and the full dual-source timeline shifts ~6 months. If the trend on CBPV-1 deteriorates faster than expected (financial health score drops below 70, or a material public event), CRO escalates to CEO and the audit committee within 5 business days regardless of where we are in the plan.

---
Assumptions I made / numbers I used — verify before publishing:
- The $4-7M implementation cost band — confirm with IT and procurement
- The $1.5M/yr incremental run rate — confirm with CFO
- The 18-month timeline — confirm with CTO and VP Eng on capacity
- The 30% / 70% critical-vs-non-critical split — confirm with COO based on revenue and customer-impact mapping
- The current financial health score thresholds — confirm with vendor monitoring service
```

---

## 3. Top-5 risks board summary — Q3 audit committee

```
RISK SUMMARY — Q3 2026 — Prepared for Audit Committee, Meeting 2026-10-20
Prepared by: Head of Operational Risk (M. Tran) | CRO sign-off: 2026-10-08

HEADLINE
One risk has shifted from Moderate to High this quarter (CBPV-1 vendor dependency) and is the primary item for committee discussion. Two emerging risks (state regulatory action on consumer lending pricing; AI/ML model governance) belong on the watchlist for Q4.

TOP 5 RISKS

1. SINGLE-SOURCE DEPENDENCY ON CORE BANKING PLATFORM (CBPV-1) — TPR-2026-014
- Likelihood: Moderate (residual, 24-month) ⬆ from Low
- Impact: High ($10-40M residual)
- Trend: Deteriorating
- What's changing: CBPV-1 financial health score down 4 points, 2 SOC 2 exceptions in 2025, public reports of leadership change. We're moving from a "watch" posture to an active mitigation path.
- What we're doing: Issuing a second-source RFP in Q4 2026; full dual-source operational by Q2 2028 on critical functions if approved.
- What we need from the board: approval of the dual-source initiative ($8.5-11.5M total 3-year cost).

2. CONSUMER LENDING REGULATORY RISK — COM-2026-007
- Likelihood: Moderate (residual, 24-month)
- Impact: High ($10-40M residual; primary driver is potential enforcement action + remediation)
- Trend: Stable
- What's changing: CFPB continues active in our category. State AGs in 3 states (CA, NY, IL) issued informational inquiries in Q3 — handled within standard process. No enforcement action pending.
- What we're doing: Compliance program updates per new guidance; counsel coordination on inquiries; pricing review on track for Q1 2027.
- What we need: information only this quarter.

3. CYBER — RANSOMWARE / DATA BREACH — TEC-2026-002
- Likelihood: Moderate (residual, 24-month)
- Impact: Very High ($40M+ residual at worst-case scenarios)
- Trend: Stable
- What's changing: SOC 2 Type II renewal completed cleanly; cyber insurance renewal up 6% on premiums at flat coverage. One internal phishing simulation exceeded threshold (12% click rate vs 8% target) — corrective training in flight.
- What we're doing: Continued investment in detection (SIEM upgrade Q4), incident response tabletop in November.
- What we need: information only.

4. INTEREST RATE / FUNDING COST — FIN-2026-001
- Likelihood: High (next 12 months — rate uncertainty)
- Impact: High ($10-40M depending on rate path)
- Trend: Improving (relative to Q2)
- What's changing: Funding cost stable in Q3; debt facility renewed in August at marginally better terms than expected. Q4 rate environment still uncertain.
- What we're doing: Treasury continues active hedging program; ALM committee reviewing duration mismatch monthly.
- What we need: information only.

5. KEY-PERSON DEPENDENCY — OPS-2026-005
- Likelihood: Moderate (residual, 24-month)
- Impact: High ($10-40M residual; primary driver is execution risk on key initiatives)
- Trend: Improving
- What's changing: Two of the three key-person dependencies now have credible successors identified (Chief Lending Officer and CTO). One remains a gap (Head of Compliance — search in progress).
- What we're doing: Continued succession planning; targeted retention for the three named roles.
- What we need: information only.

CHANGES TO THE REGISTER (Q3)
- New risks added: AI/ML model governance (MOD-2026-002 — added to emerging watchlist not yet in top 5)
- Risks closed: TPR-2026-008 (legacy payments vendor dependency — fully migrated to new provider, closed 2026-08-22)
- Material rerating: TPR-2026-014 (CBPV-1) from Moderate to High likelihood (inherent); residual rerating from Low to Moderate; trend deteriorating
- Other reratings: 0

EMERGING RISKS WATCHLIST
- AI/ML model governance — internal model use is expanding (underwriting, fraud, marketing); governance framework is in draft, board-level position TBD. CRO to bring framework proposal to Q1 2027 audit committee.
- State regulatory action on consumer lending pricing — multiple states actively legislating; potential enforcement risk by mid-2027.
- Geopolitical / sanctions exposure — minor today, watching for any expansion in customer geography that would change posture.

INCIDENTS / NEAR-MISSES Q3 2026
- One operational near-miss: internal phishing simulation exceeded click-rate threshold (12% vs 8% target). Corrective training in flight; no actual incident.
- No reportable incidents this period.

INSURANCE PROGRAM STATUS
- Cyber liability renewal completed 2026-08-15 at +6% premium, flat coverage ($25M tower with $1M retention)
- D&O renewal scheduled Q4 2026
- All other lines current; no coverage gaps identified in Q3 review

DECISIONS REQUESTED
1. Approval of the dual-source initiative for CBPV-1 (Item #1 above) — $8.5-11.5M total 3-year cost, recommended position: approve, decision needed by Q4 2026 audit committee
2. Information sharing: AI/ML governance framework proposal forthcoming Q1 2027 (information only this quarter)

KRI DASHBOARD (one page)

| KRI | Threshold | Q3 Actual | Q2 Actual | Owner | Status |
| CBPV-1 financial health score | >75 | 78 | 82 | VP Risk | ⚠ deteriorating |
| Phishing simulation click rate | <8% | 12% | 7% | CISO | ⚠ over threshold |
| State AG inquiries (rolling 90-day) | <2 | 3 | 1 | GC | ⚠ over threshold |
| Funding cost variance vs plan | ±25 bps | +15 bps | +20 bps | CFO | within tolerance |
| Time-to-escalate (vendor incident) | <2 hours | 3.5 hours (last test) | 2 hours | COO | over threshold |
| BCP test completion (annual) | 100% by Q4 | on track | n/a | COO | on track |
| Key-person dependencies | <=2 unmanaged | 1 unmanaged | 3 unmanaged | CEO | improving |
| Cyber insurance coverage gap | $0 | $0 | $0 | VP Risk | no gap |

---
Assumptions I made / numbers I used — verify before publishing:
- Financial health score 78 (Q3) — confirm with vendor monitoring service
- Phishing simulation actual click rate 12% — confirm with security team
- State AG inquiry count (3) — confirm with GC and compliance log
- Cyber renewal +6% — confirm with broker
- KRI thresholds all match the current risk-appetite statement — confirm with CRO
- $8.5-11.5M total 3-year cost band — confirm with the mitigation plan owner
```

---

## 4. Scenario walkthrough — ransomware affecting core banking platform

```
SCENARIO: Ransomware event at CBPV-1 (core banking platform vendor) impacts our loan servicing operations
Prepared by: Head of Operational Risk + CISO + COO | Date: 2026-10-15
Purpose: tabletop exercise input for Q4 2026 ERM exercise

INITIATING EVENT
On a Tuesday morning, CBPV-1 publicly discloses a ransomware event affecting their core hosting environment. Initial customer notification states "investigation ongoing, expected disruption 48-96 hours." Our loan servicing platform is unreachable.

PROGRESSION

T+0 (event detection)
- We discover the issue via customer-facing alerts and our monitoring; CBPV-1 confirms via their status page
- Our incident response process activates: CISO + COO + on-call + Compliance Officer + CRO + GC
- Customer-facing services begin failing: loan servicing dashboard, payment processing, customer portal

T+1 hour
- CBPV-1 confirms scope: their hosting environment is offline, they've engaged external incident response, no ETA on restoration
- We confirm our manual workaround BCP can be activated: takes ~6 hours to spin up the manual servicing team and process critical functions
- Customer service line begins receiving inquiries; we issue initial holding statement

T+1 day
- CBPV-1 estimates 72-hour restoration window
- Manual workaround is operational but degraded: payment processing for incoming wires is functioning; ACH processing is delayed by 24 hours; customer self-service is unavailable; loan officer manual entries are running
- ~30% of loans missing originally-scheduled payment processing
- Regulatory notification clocks: CFPB, state AGs (CA, NY, IL most material), state banking regulators — counsel evaluating whether and when
- Cyber insurance notification: yes, claim opened within 24 hours per policy

T+1 week
- CBPV-1 partially restores by T+96 hours; full restoration T+6 days
- Loan servicing operationally restored at T+6 days; data reconciliation in flight (10-14 day window)
- Customer impact: ~12,000 customers affected by delayed processing; ~$8M in customer reimbursements estimated for late fees and interest adjustments
- Regulatory inquiries received from 3 states; CFPB monitoring
- Press coverage: 6 articles, 1 negative narrative

T+1 month
- Full operational restoration confirmed
- Customer reimbursements processed
- Counsel finalizes regulatory responses to all inquiries
- Cyber claim: $4-6M paid out (forensic + customer notification + business interruption); $1M retention
- Internal post-mortem complete; 12 lessons captured
- Board discussion: dual-source initiative accelerated

IMPACT BY DIMENSION

Financial:
- Direct losses: $8-12M (customer reimbursements, lost revenue, recovery cost)
- Insurance recovery: $4-6M (under cyber tower with $1M retention)
- Net financial: $4-7M
- Plus: regulatory fine exposure ($2-5M plausible, depending on jurisdiction and investigation outcome)

Operational:
- Full service degradation for ~3-5 days
- Partial degradation for ~7-10 days
- Reconciliation for 14-21 days

Regulatory:
- Notifications: state-level breach laws if PII compromise confirmed (TBD)
- CFPB, state AG inquiries probable
- State banking regulator engagement (we're licensed)

Reputational:
- Negative press coverage moderate
- Customer NPS impact: -10 to -20 points for ~90 days
- Material customer churn risk on top 100 institutional partners: 2-5% over 12 months

ASSUMED CONTROLS THAT HOLD
- Our internal cyber posture (we're not the source of the breach)
- Manual workaround BCP — partial functionality
- Cyber insurance policy responds
- Customer communication SOP

ASSUMED CONTROLS THAT FAIL
- Real-time servicing — full disruption during outage
- Customer self-service portal — full disruption
- Automated payment processing — full disruption for 3-5 days
- Detection time of the underlying CBPV-1 event — we're dependent on CBPV-1's disclosure

DECISIONS THE COMPANY MUST MAKE

T+0:
- Declare an incident; activate IR team
- Initial customer holding statement: yes/no, what does it say
- Begin cyber insurance notification process

T+1 day:
- Activate manual workaround BCP: yes/no (recommended yes)
- Customer reimbursement policy: how generous, how fast
- Regulatory notification timing: per counsel
- Press statement: what we say publicly vs internally

T+1 week:
- Recovery acceleration spending: how much, where
- Hold customer churn: targeted retention with top accounts
- Internal communication cadence to staff

T+1 month:
- Strategic response: dual-source initiative acceleration?
- Vendor relationship: continue with CBPV-1 with strengthened terms? Switch? Dual-source?
- Insurance program review: is the cyber tower sufficient?

KEY UNKNOWNS
- Whether PII or customer data was actually exfiltrated (could change scope materially)
- CBPV-1's actual restoration timeline (could be longer than disclosed)
- Whether other CBPV-1 customers will sue / class-action exposure
- Whether regulators will pursue enforcement vs cooperative remediation

LESSONS / GAPS SURFACED (preliminary, expect more from full tabletop)
- Manual workaround BCP has been table-tested but not run in production — Action: production-style failover exercise in Q1 2027
- Customer communication SOP exists but isn't tied to a ready-to-go template for this type of vendor-source incident — Action: develop template, owner CMO+CS
- Insurance claim notification SOP is documented but the team that would execute hasn't drilled it — Action: drill in Q4 2026
- Regulatory notification decision tree depends heavily on counsel; need outside counsel pre-engaged — Action: confirm retention with cyber-specialist counsel
- Dual-source initiative business case takes on different proportions after this scenario — Action: present to board with scenario findings

---
Assumptions I made / numbers I used — verify with team before publishing:
- $8-12M direct loss estimate — model with finance
- $4-6M insurance recovery — confirm with broker on cyber tower coverage and retention
- 12,000 customers affected estimate — model with COO
- Press coverage estimate — gut-feel, no data backing
- NPS impact band — based on industry benchmarks, not specific to us
```

---

## 5. Incident debrief — vendor service disruption

```
INCIDENT DEBRIEF — INC-2026-09-114 — Event date: 2026-09-22 — Author: M. Tran, Head of Operational Risk
Co-authored with: COO, CISO, GC

PURPOSE
Operational learning. Not legal characterization (counsel-routed for that). This debrief feeds the risk register, the BCP, the playbooks, and the Q4 board memo.

WHAT HAPPENED

2026-09-22, 09:14 ET — Our customer portal began returning errors. CBPV-1 (core banking platform vendor) status page was green at the time.
2026-09-22, 09:18 ET — Our SRE team paged. Initial assessment: external dependency issue, source unclear.
2026-09-22, 09:23 ET — CBPV-1 status page updated: "investigating elevated error rates."
2026-09-22, 09:31 ET — Incident response team activated: COO, CISO, CRO, GC, Communications Lead, VP Customer Success.
2026-09-22, 09:42 ET — CBPV-1 confirmed: degraded performance in their hosting environment; not a security incident; estimated restoration 4-6 hours.
2026-09-22, 10:15 ET — Customer-facing holding statement issued via in-app + email to all 84K active customers.
2026-09-22, 11:30 ET — Manual workaround BCP partially activated: payment processing team began manual handling of critical transactions; ~30% of normal throughput.
2026-09-22, 14:47 ET — CBPV-1 confirmed full restoration. Our services restored within 25 minutes.
2026-09-22, 15:30 ET — Customer-facing all-clear issued.
2026-09-22, 18:00 ET — Incident closed in our system. Total impact window: ~5 hours 33 minutes.

ROOT CAUSE
Primary: CBPV-1's hosting environment experienced a misconfigured deployment that introduced latency and elevated error rates across their customer base. Not a security incident on their side. Their disclosure to us indicated a routine deployment that was rolled back at 13:30 ET; full recovery within 75 minutes of rollback.

Contributing factors:
- Our monitoring detected user-facing degradation 4 minutes before CBPV-1's public status update — but our internal alerting threshold was set for >60-second errors, not the latency-degradation pattern actually observed. Detection was reactive on customer-facing failures, not proactive on degradation signals.
- Our holding statement took 53 minutes to issue (from incident response activation). This is longer than our 30-minute SOP target.
- Manual workaround BCP activation was partial; we processed ~30% of normal throughput rather than the 50% target. Two roles in the BCP roster were on PTO and not backfilled by the documented succession.

WHAT WORKED
- IR team activated quickly (under 20 minutes from initial detection)
- Customer communication SOP triggered correctly; both in-app and email channels used
- No data loss, no security incident, no regulatory notification triggered (per counsel)
- Cyber insurance notification process tested correctly (broker engaged within 4 hours)
- Cross-functional coordination held — no friction between COO, CISO, CRO, GC

WHAT DIDN'T
- Our latency-based alerting did not trigger; we relied on user-facing failures. We were ~4 minutes behind where we could have been.
- Holding statement took 53 minutes (target: 30). The draft was ready at 25 minutes; legal review took 28 minutes.
- Manual workaround BCP throughput was ~30% vs 50% target. Two PTO-related role gaps in the roster.
- No automated customer-segmented communications (e.g., top 100 institutional partners didn't receive a separate, more detailed message).

LESSONS (specific, actionable, owner+due)

1. Latency-based alerting in addition to error-rate alerting — Owner: CISO + Engineering — Due: 2026-11-30
2. Pre-approved customer communication templates (general, segmented top-tier, regulatory-adjacent) with shorter legal review SLAs — Owner: GC + CMO + Compliance — Due: 2026-12-15
3. BCP roster gap-filling protocol — formal cross-training for the two roles flagged this time — Owner: COO — Due: 2026-11-30
4. Top 100 institutional partner segmented communication path — Owner: VP CS + CMO — Due: 2026-12-15
5. Quarterly drill of the manual workaround BCP at >=50% throughput target — Owner: COO — Due: first drill 2026-12-15, recurring quarterly

REGISTER IMPLICATIONS
- TPR-2026-014 (CBPV-1 dependency) — no rerating yet; this event is consistent with the existing Moderate residual likelihood. The trend already deteriorating; this event reinforces.
- TPR-2026-021 (BCP testing program) — flag that the 50% throughput target is unproven; the November tabletop now upgraded to a live partial-failover.
- OPS-2026-007 (loan servicing operational risk) — no rerating; this event was within expected tolerance for the residual.
- New register entry: COM-2026-018 (incident communication SOP coverage gaps) — added 2026-10-01, owner GC.

FOLLOW-UPS
- See Lessons table above (5 items)
- Quarterly board update inclusion: Q4 2026 audit committee
- Cyber insurance broker briefed; no claim filed (incident within retention threshold and no claimable loss)

---
Assumptions I made / numbers I used — verify before publishing:
- The 5h33m total impact window — confirm against incident timeline log
- The 84K active customer count at time of incident — confirm with data team
- The 53-minute holding statement timing — confirm with communications lead
- The "30% throughput" manual workaround figure — confirm with COO and ops team
- The "no data loss / no security incident / no regulatory notification" position — counsel confirmed; flag for re-verification 2026-10-15
- The 5 named action owners — confirmed with each owner pre-publication
```
