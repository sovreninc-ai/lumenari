# Reference Workflows — Operations Manager Pack

Worked examples. Steal whichever ones map to your function. Names and numbers are placeholders.

---

## 1. Weekly KPI review (operations function)

```
OPS WEEKLY KPI REVIEW — Week of 2026-05-11

HEADLINE
Vendor onboarding TAT is back to target (7 days) for the first time in 6 weeks; customer escalation queue is healthy but P1 volume is up 22% week-over-week — investigating.

LEADING INDICATORS

1. Open vendor onboarding tickets > 5 days old
   Current: 3 | Target: <5 | Trend: 12, 9, 7, 5, 3 (5 weeks)
   So what: Process changes are working. Watch for regression as Q3 hiring spins up new vendor needs.

2. Customer escalation queue P1 inflow (weekly)
   Current: 11 | Target: <8 | Trend: 7, 6, 9, 7, 11
   So what: Spike this week, mostly tied to the May 8 platform incident. Will tell next week if it's pattern or one-time.

3. EOM close BD-3 readiness
   Current: 84% checklist complete by BD3 | Target: 95%+ | Trend: 72, 78, 81, 84
   So what: Improving but not at target. Department sign-off step is the lagger — three departments still missing by EOD BD2.

LAGGING INDICATORS

1. Vendor onboarding TAT (last 30 days)
   Current: 7.2 days | Target: 7 | Trend: 14, 12, 10, 8, 7.2
   So what: At target. Sustained 4-week improvement.

2. Customer escalations resolved within SLA
   Current: 91% | Target: 95% | Trend: 88, 89, 92, 91
   So what: Short of target. The 9% misses are concentrated in one product area; deeper look this week.

3. EOM close completion day
   Current: BD6 for April | Target: BD5 | Trend: BD11, BD8, BD7, BD6 (Jan-Apr)
   So what: 1 day from target. May close starts BD0 = May 30.

WHAT CHANGED THIS PERIOD
- Platform incident May 8 drove the P1 inflow spike (8 of 11)
- New vendor onboarding intake form launched Monday — early traction
- Two ops team members on PTO this week, light coverage

WHAT WE'RE DOING ABOUT IT
- P1 spike investigation: pulling the 11 by product area and root cause. Owner: Sam (CustOps). Due: Wed 5/14.
- EOM close department sign-off lag: scheduled 15-min check-in with the three departments' admins. Owner: Maya. Due: 5/13.
- Coverage gap: cross-train Asha on incident triage. Owner: Sam. Due: end of month.

WHAT WE NEED FROM LEADERSHIP
- Decision needed by Thursday 5/15: hire #3 on the ops analyst team or absorb the work into existing? Budget approved, role open. Maya to send 1-pager Wednesday.

ASKS FROM OTHER FUNCTIONS
- Engineering: post-incident review for May 8 incident, due to us by 5/16 (Greg owns)
- Finance: chart of accounts update for new product line, draft to ops by 5/18 (Lisa owns)
- RevOps: strategic-account list refresh for Q2, to ops by 5/14 (Jordan owns)

---
Things I assumed that you should verify before publishing:
- The 91% SLA number — pull the actual Zendesk report before sending
- The 22% P1 increase — confirm against prior-week baseline
- Hire decision deadline — confirm the budget cycle with finance
```

---

## 2. Leadership briefing (1-pager — bad news)

```
BRIEFING: Q2 EOM Close — Resourcing Decision Needed
Author: Maya Chen, Senior Ops Manager
Date: 2026-05-14
For: Sandra Ko, COO

BOTTOM LINE
Q2 close is at risk of slipping back to BD9+ unless we add one ops analyst by end of May. Recommend approving the hire that's already on the org plan; alternative is accepting a 2-3 day close delay through Q3.

CONTEXT
We've made real progress on close cycle time — April closed at BD6, down from BD11 in January. The improvement came from process changes (cut-off enforcement, BD-3 pre-close push) and a temp contractor who's wrapping in two weeks. Without backfill, we lose the temp's 20 hours/week of accrual prep and KPI work right when Q2 close hits.

WHAT WE FOUND / WHAT'S CHANGED
- April close: BD6 (target BD5). Closest we've been to target in 14 months.
- The temp (Jordan) is responsible for accrual prep, KPI source lock, and dashboard refresh — about 18-22 hours per close cycle.
- Existing ops team (3 people) is at 95%+ utilization. No slack to absorb Jordan's work.
- Hiring lead time: ops analyst role typically 6-8 weeks from open to start. Currently at week 4 of the open requisition.

OPTIONS

Option A: Approve hire, extend Jordan's contract 4 more weeks for handoff
Pros: Maintains close cycle progress; clean knowledge transfer; team unblocked
Cons: Extra ~$8k for contract extension; commits the FTE headcount
Cost: $8k contract + budgeted FTE (~$110k loaded)
Timing: Hire starts ~July 1; handoff complete by July 15

Option B: Approve hire, no contract extension
Pros: No extra contract cost
Cons: 6-8 week coverage gap; Q2 close almost certainly slips to BD9+; risk of regression on KPI lock quality
Cost: Budgeted FTE only; intangible risk to close cycle
Timing: Hire starts ~July 1; team absorbs gap May 30-July 1

Option C: Don't backfill, accept BD9+ close through Q3
Pros: $110k savings
Cons: Close cycle regression; downstream finance reporting impact; team morale on a problem we'd just fixed
Cost: No direct $, ~$50-80k in reported softer costs (analyst time, finance delays)
Timing: Close cycle reverts in June, stays BD9+ through at least Q3

RECOMMENDATION
Option A. The $8k extension protects the BD5 target we've worked 4 months to achieve. The hire is already budgeted; we'd be approving the spend, not adding scope.

WHAT I NEED FROM YOU
Decision by EOD Thursday 5/15 so I can extend Jordan's contract Friday morning (his current end date is 5/30). If approved, I'll have the hire offer out by 5/20.

RISKS / WATCH-OUTS
- New hire ramp time: even with Jordan handoff, expect Q3 first close to be slightly bumpy. Mitigation: I'll back up Q3 first close personally.
- If we hire and Jordan is needed less than expected, we have a marginal cost on the contract extension. Acceptable risk given the close cycle exposure.

---
Things I assumed that you should verify before sending:
- Jordan's actual contract end date and extension terms — confirm with HR before Thursday
- The FTE loaded cost ($110k) — confirm with finance against the latest budget
- The hire timing ($July 1 start) — depends on offer acceptance and notice period
```

---

## 3. Escalation matrix (operations function — vendor and customer)

```
ESCALATION MATRIX — Operations Function — Last reviewed 2026-04-30

This matrix governs escalations within the operations team and outbound to leadership. Customer-facing escalations follow SOP: Customer Escalation Routing.

SEVERITY DEFINITIONS

P0 — System-down, customer-impacting, or financial-immediate
Examples:
- ERP outage during close week
- Vendor master compromise / fraud
- Customer escalation reaches "we're going to terminate" threshold
- Material misstatement risk before financial reporting
Engage within: 15 minutes

P1 — Significant impact, hours not minutes
Examples:
- Vendor onboarding ticket >10 business days
- Close cycle slipping past BD5 with no path back
- Strategic customer named in an escalation
- Critical KPI dashboard broken on a reporting day
Engage within: 1 hour

P2 — Notable but workable, same-day or next-day
Examples:
- Vendor onboarding ticket 5-10 business days
- Single department spend reconciliation late
- Non-critical dashboard issue
Engage within: 4 business hours

P3 — Inconvenient, not urgent
Examples:
- Process improvement opportunity
- Vendor responsiveness issues without contract risk
- Minor data quality issue
Engage within: 1-2 business days

OWNERSHIP BY SEVERITY

P0
- First responder: On-call ops manager (rotation) — see PagerDuty schedule
- Escalation point: Director of Operations (Sandra Ko, x4521, mobile in PagerDuty)
- Final decision authority: COO
- Comms: #ops-incidents Slack channel; CFO + CEO via direct message if financial impact
- Target time to engage: 15 min

P1
- First responder: Owning ops team lead (varies by area)
- Escalation point: Senior Ops Manager (Maya Chen)
- Final decision authority: Director of Operations
- Comms: #ops-escalations Slack channel
- Target time to engage: 1 hour

P2
- First responder: Owning ops team member
- Escalation point: Owning ops team lead
- Final decision authority: Senior Ops Manager
- Comms: Standard ticket queue + #ops-team channel
- Target time to engage: 4 business hours

P3
- First responder: Owning ops team member
- Escalation point: Owning ops team lead (informational)
- Final decision authority: Owning ops team lead
- Comms: Standard ticket queue
- Target time to engage: 1-2 business days

WHEN TO SKIP A LEVEL
- First responder unreachable for 30+ min on a P0 or P1
- Severity escalates mid-response (e.g., a P2 becomes a P1)
- Issue crosses functions and needs cross-functional ownership (loop in CustOps, RevOps, or Finance lead)
- Customer, regulator, or legal becomes involved

If you skip a level, notify the skipped level within 4 hours with the reason. Skip without notification is a process violation and gets logged.

---
Things I assumed that you should verify before publishing:
- The on-call rotation in PagerDuty — confirm names and contact methods
- The named directors and contact numbers — confirm with each before publishing
- Slack channel names — confirm against your actual workspace
```

---

## 4. Process improvement memo (vendor onboarding example)

```
TO: Sandra Ko, COO
FROM: Maya Chen, Senior Ops Manager
DATE: 2026-05-14
RE: Vendor onboarding — what changed and what's next

We've moved vendor onboarding TAT from 14-21 days down to 7.2 days over the last 4 months. This memo documents what worked, what's still fragile, and what I'd like to do next.

WHAT CHANGED

1. Single intake form (Asana). Before: requests came via email, Slack, and 3 different forms. After: one form, routed automatically. Eliminated the "lost in inbox" failure mode that accounted for ~40% of the >10-day cases.

2. Parallel-instead-of-sequential security and finance steps. Before: security review finished, then finance setup started. After: they run in parallel after intake triage, joined at contract step. Cut ~4 days off standard path.

3. Explicit SLAs at each step. Before: "as soon as possible." After: 1 BD for intake response, 5 BD for security review, 2 BD for finance setup. Visible on the Asana dashboard.

4. Weekly review of any ticket >5 days. Before: nothing. After: Friday 30-min check on aging tickets, owner accountable.

WHAT'S STILL FRAGILE

1. Security review can blow the timeline if vendor is slow to provide docs. We track total elapsed time, but vendor response time is the long pole on roughly 1 in 5 cases. Nothing the ops team can directly do beyond following up — but worth knowing.

2. Legal involvement adds 3-5 days when triggered. Triggered for ~20% of vendors (over $50k or atypical terms). The Legal team is responsive, but it's another wait state.

3. The new intake form is undertested under load. If Q3 hiring drives a doubling of vendor requests, the form may surface scaling issues (assignment routing, capacity).

WHAT'S NEXT (proposed)

Q2 actions (no decision needed):
- Add automated reminder to vendors after 3 days of no doc response
- Track vendor-side time separately from internal time on the dashboard

Q3 actions (decision support, not asking yet):
- Pre-approved standard MSA templates by vendor tier — could cut Legal involvement on ~30% of cases that currently hit them unnecessarily
- Self-service vendor portal for security questionnaire submission — bigger lift, would need IT investment

I'll bring the Q3 items as a separate decision memo if we want to pursue.

NO DECISION NEEDED ON THIS MEMO — informational, FYI on the trajectory and what's coming.

---
Things I assumed that you should verify before publishing:
- The exact TAT numbers — re-pull the Asana dashboard before sending
- The 20% Legal involvement rate — confirm with Legal Ops
- The Q3 hiring estimate — coordinate with HR on actual planned headcount growth
```
