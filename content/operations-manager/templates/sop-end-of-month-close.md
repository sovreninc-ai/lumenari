# SOP: End-of-Month Operational Close

OWNER: Maya Chen — Senior Operations Manager (Ops side); Lisa Chen — Controller (Finance side, joint owner)
LAST REVIEWED: 2026-04-30
NEXT REVIEW: 2026-07-30
APPLIES TO: Operations team, AP team, department heads (vendor spend), finance team

---

## 1. Purpose

This SOP documents the operational steps required to close out a month so that finance can complete the financial close on time. Target: ops-side close complete by Business Day 3 (BD3), enabling finance to close by BD5. Without this SOP, the close has slipped to BD11 multiple times in the past year, causing reporting delays and audit findings.

## 2. Scope

This SOP covers the operations-team-owned activities of monthly close:
- Vendor invoice collection and submission
- Operational KPI lock and reconciliation
- Department spend reconciliation
- Dashboard refresh and validation
- Accruals submission to finance

Not covered:
- Financial close itself (revenue recognition, journal entries, financial statements) — owned by finance
- Tax filings — owned by finance/external tax advisor
- Payroll close — owned by HR

## 3. Roles and Responsibilities

| Activity | R | A | C | I |
|---------|---|---|---|---|
| Vendor invoice collection | AP specialist | AP manager | Department heads | Ops manager |
| Spend reconciliation | Department heads | Ops manager | AP specialist | Controller |
| KPI lock | Ops analyst | Ops manager | Data team | Leadership |
| Accruals submission | Ops manager | Controller | AP manager | — |
| Dashboard refresh | Ops analyst | Ops manager | — | Leadership |

## 4. Process Steps

### Pre-month-end (last 3 business days of month)

1. **Day -3: Outstanding invoice push** (AP specialist)
   - Pulls list of open POs with no invoice received
   - Emails vendors with friendly reminder to submit by month-end
   - Output: vendor reminder email log

2. **Day -2: Department spend preview** (Ops analyst)
   - Pulls current-month-to-date spend by department from NetSuite
   - Sends preview to each department head with their accrual list
   - Output: per-department preview email

3. **Day -1: Outstanding items walkthrough** (Ops manager + AP manager)
   - 30-min sync, review still-open items
   - Decide which need to be in this month vs. acceptable to slip
   - Output: closeable items list

### Month-end and early next month

4. **BD0 (last business day of month): Cut-off** (AP specialist)
   - 5 PM cut-off for invoice receipt with month-end posting
   - Anything after 5 PM goes to next month unless ops manager approves exception
   - Output: invoice cutoff list

5. **BD1: Vendor accrual submission** (AP specialist + Ops manager)
   - Identify every PO with goods/services received but no invoice
   - Calculate accrual based on PO value or contract terms
   - Submit accrual list to controller
   - Output: accrual schedule to finance

6. **BD1: KPI source data lock** (Ops analyst)
   - Pulls operational KPI source data (Salesforce, support tickets, ops tools)
   - Snapshots into the month-end folder
   - Flags any data anomalies for investigation
   - Output: locked source data files

7. **BD2: Department spend reconciliation** (Department heads, due EOD)
   - Each department head reviews their actual spend vs. budget in NetSuite
   - Flags any anomalies (unexpected charges, duplicate invoices, miscategorized spend)
   - Submits sign-off email to ops manager
   - Output: department sign-offs collected

8. **BD2: KPI calculation and review** (Ops analyst, then ops manager)
   - Runs KPI calculations off the locked source data
   - Compares to targets and prior 3-month trend
   - Flags anything that moved unexpectedly for investigation
   - Output: draft KPI dashboard

9. **BD3: Final accrual adjustments** (Ops manager + Controller)
   - 30-min sync to walk accruals and any late-arriving invoices
   - Adjust accruals as needed; controller posts final accrual JEs
   - Output: final accruals posted

10. **BD3: Dashboard publish** (Ops analyst, reviewed by ops manager)
    - KPI dashboard refreshed in Looker
    - Drift checks against prior month (any metric moved more than +/- 20% flagged in notes)
    - Sent to leadership distribution list with the month's KPI review (separate doc)
    - Output: published dashboard, KPI review doc

### What good looks like (close-quality check)

- All vendor accruals submitted by BD1
- All department sign-offs collected by EOD BD2
- KPI dashboard live by EOD BD3
- Zero "to be reconciled later" items carried forward
- Finance reports no surprises on BD4

## 5. Decision Points / Exceptions

- **Vendor invoice received after BD0 cut-off:** AP specialist decides. If under $5k and routine, accept into current month; if over $5k or non-routine, escalate to ops manager.
- **Department fails to sign off by EOD BD2:** Ops manager contacts department head directly; if no response by BD3 morning, ops manager signs off with note "department non-response, no anomalies flagged on review."
- **Data anomaly in KPI source:** Ops analyst flags to ops manager; investigate before lock. If can't resolve same-day, footnote in KPI review.
- **Material variance to budget (>10% on a single line item):** Ops manager flags to controller and department head; may trigger budget reforecast.

## 6. Escalation Path

- Vendor non-responsive on missing invoice 3+ days past month-end: ops manager calls vendor directly
- Department head won't sign off: ops manager → COO
- Accrual disagreement between ops and finance: ops manager + controller → CFO
- Material data quality issue blocking close: ops manager → data team lead → CTO (if not resolved in 24 hours)

## 7. Systems and Tools

- ERP: NetSuite — Reports → "AP Open POs by Period," "Department Spend by Period," "Accrual Worksheet"
- KPI source data: Salesforce reports (revenue, pipeline), Zendesk reports (support), Asana reports (project ops)
- Dashboard: Looker — "Operations Monthly Dashboard" board
- Document workflow: Confluence — "Monthly Close" space, current month folder
- Comms: Slack — #ops-close channel for the close week

## 8. Definitions

- **BD0, BD1, BD2…**: Business Day count from the last business day of the month (BD0) forward
- **Accrual**: An entry recognizing an expense incurred but not yet invoiced
- **Cut-off**: The point in time after which invoices are deferred to the next period
- **JE (Journal Entry)**: A formal accounting entry into the GL
- **Locked data**: Source data snapshotted; changes after lock require a controlled re-snapshot process

## 9. Change Log

| Date | Author | Change | Reason |
|------|--------|--------|--------|
| 2026-04-30 | Maya Chen | Added BD3 dashboard publish target | Prior close ran to BD7 — tightening |
| 2026-03-12 | Maya Chen | Added 5 PM BD0 cut-off explicit clause | Frequent BD0 late-day invoices causing slip |
| 2026-02-01 | Maya + Lisa | Joint ownership formalized (ops + finance) | Eliminate fingerpointing |
| 2025-12-15 | Prior owner | Added pre-month-end push steps | Reduce BD1 firefighting |
| 2025-10-04 | Prior owner | Initial version | New SOP |
