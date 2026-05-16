# SOP: Customer Escalation Routing

OWNER: Sam Patel — Director of Customer Operations
LAST REVIEWED: 2026-03-22
NEXT REVIEW: 2026-06-22
APPLIES TO: Customer support team, customer success managers, ops leadership, executive on-call

---

## 1. Purpose

This SOP defines how inbound customer escalations are routed, owned, and communicated. It exists because in 2025 we had three executive-level customer churns where the escalation was sitting in a Tier 1 queue for 48+ hours before anyone with authority saw it. Target outcomes: P0/P1 escalations engaged within SLA, executive escalations routed to the right person on first hop, customer communications coordinated (no contradictory messages from support and CS).

## 2. Scope

This SOP covers any customer-initiated escalation that meets one or more of:
- Customer explicitly asks for "manager," "supervisor," "executive," or "account team escalation"
- Issue is blocking customer's production use
- Customer references churn, contract review, or legal/regulatory action
- Issue impacts more than 10% of customer's seats or workload
- Internal severity classification triggers (see severity definitions)

Not covered:
- Standard support tickets — see SOP: Support Ticket Lifecycle
- Customer feature requests — see SOP: Feedback Triage & Routing
- Billing disputes only — see SOP: AR Disputes & Adjustments

## 3. Roles and Responsibilities

| Step | R | A | C | I |
|------|---|---|---|---|
| Initial classification | Support tier 1 | Support manager | — | CS manager |
| P0/P1 routing | Support shift lead | Director of CustOps | On-call engineer (if technical) | Exec on-call |
| Investigation & resolution | Assigned owner (varies by severity) | Director of CustOps | Engineering / CS / Account team as needed | Account executive, CSM |
| Customer comms | CSM (primary) or Support lead (if no CSM) | Director of CustOps | — | Account exec |
| Post-incident review | Director of CustOps | VP Operations | Involved teams | Exec sponsor (if P0) |

## 4. Process Steps

1. **Initial intake** (Support Tier 1)
   - Triggered by inbound ticket, chat, phone, or escalation from another channel
   - Classifies severity per definitions below
   - Logs in Zendesk with escalation tag and severity field set
   - Output: tagged ticket, customer ack within SLA

2. **Severity classification** (Support Tier 1, validated by shift lead)
   - Reference severity definitions (section 5 of escalation matrix doc, also at end of this SOP)
   - If P0 or P1, alerts shift lead in #cust-escalations Slack channel immediately
   - If P2 or P3, routes to queue
   - Output: severity locked, ownership routed

3. **P0 routing** (Support shift lead)
   - Pages director of CustOps via PagerDuty
   - Pages on-call engineer if technical issue
   - Opens incident channel in Slack: #cust-incident-[ticketid]
   - Notifies account team (CSM, account exec) within 15 min
   - If customer is on the exec-tier list, notifies exec on-call (CRO or CCO)
   - Output: incident channel open, full team engaged

4. **P1 routing** (Support shift lead)
   - Notifies director of CustOps via Slack DM and #cust-escalations
   - Notifies CSM and account exec via Slack within 30 min
   - Opens incident channel if cross-functional resolution needed
   - Output: ownership assigned, comms initiated

5. **P2 routing** (Support manager)
   - Assigns to a senior support engineer or CSM depending on issue type
   - Customer ack with timeline expectation within 4 business hours
   - Output: owner assigned, customer informed

6. **P3 routing** (Support manager)
   - Stays in standard support queue, flagged for senior eyes
   - Customer ack within 1 business day
   - Output: standard handling

7. **Customer communications** (CSM primary, Support lead as backup)
   - All customer-facing messages on a P0/P1 go through the CSM
   - Status updates to the customer every 2 hours for P0, every 4 hours for P1, every business day for P2
   - No contradictory messages — internal team aligns before customer comms goes out
   - Output: customer kept informed, single voice

8. **Resolution & verification** (assigned owner)
   - Fix implemented
   - Customer confirms resolution
   - Ticket and incident channel closed
   - Output: customer signs off

9. **Post-incident review** (Director of CustOps)
   - Required for all P0, recommended for P1
   - Within 5 business days of resolution
   - Captures root cause, what went well, what didn't, action items
   - Output: PIR doc in Confluence, action items in Asana

## 5. Decision Points / Exceptions

- **Customer threatens legal/regulatory action:** escalate immediately to General Counsel regardless of severity classification.
- **Customer is on the strategic-account list (top 20 ARR):** add account exec and exec sponsor to all P1+ escalations.
- **Issue spans multiple customers (potential incident):** elevate to formal incident management process (SOP: Incident Response).
- **Customer asks for refund/credit during the escalation:** CSM works with Director of CustOps and Finance — do not commit to dollar amounts in real-time.

## 6. Escalation Path Within The SOP

| Severity | First responder engages within | Director CustOps engages within | Exec on-call engages within |
|----------|--------------------------------|--------------------------------|----------------------------|
| P0 | 15 min | 30 min | 1 hour (auto-page) |
| P1 | 1 hour | 2 hours | On request |
| P2 | 4 business hours | Same business day if requested | Not required |
| P3 | 1 business day | Not required | Not required |

If a responder is unreachable for the target time, the next level up is auto-engaged. The skipped level is notified within 4 hours of skip with the reason.

## 7. Systems and Tools

- Ticketing: Zendesk — escalation view link [URL]
- Comms: Slack — #cust-escalations (visibility), #cust-incident-[id] (per-incident war room)
- Paging: PagerDuty — escalation policies "CustOps P0/P1" and "Exec On-Call"
- Customer comms: Zendesk customer-facing replies; Front for direct CSM emails on strategic accounts
- PIR: Confluence "Customer Incident Reviews" space
- Action item tracking: Asana — "Customer Ops Action Items" project

## 8. Definitions

- **P0 (Severity 0):** Customer's production use is fully blocked. Data loss risk. Or strategic account threatens churn / legal / regulatory action. Engage within 15 min.
- **P1 (Severity 1):** Significant impact on customer's workflow. Major feature broken, more than 10% of seats affected, or customer named "executive escalation." Engage within 1 hour.
- **P2 (Severity 2):** Notable impact but workaround exists. Same-day or next-day resolution acceptable. Customer is unhappy but functional.
- **P3 (Severity 3):** Inconvenience but not blocking. Within a few business days is fine.
- **CSM:** Customer Success Manager
- **PIR:** Post-Incident Review
- **Strategic-account list:** Top 20 customers by ARR, maintained by RevOps, updated quarterly

## 9. Change Log

| Date | Author | Change | Reason |
|------|--------|--------|--------|
| 2026-03-22 | Sam Patel | Added strategic-account exec sponsor rule | Q1 churn pattern analysis |
| 2026-01-30 | Sam Patel | Tightened P0 engage SLA from 30 to 15 min | After-action from Jan incident |
| 2025-12-12 | Sam Patel | Added legal/regulatory immediate escalation | Compliance program rollout |
| 2025-10-15 | Prior owner | Added PIR requirement for all P0s | Audit finding |
| 2025-08-01 | Prior owner | Initial version | New SOP |
