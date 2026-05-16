# SOP: Vendor Onboarding (End-to-End)

OWNER: Maya Chen — Senior Operations Manager
LAST REVIEWED: 2026-04-15
NEXT REVIEW: 2026-07-15
APPLIES TO: Procurement coordinator, ops manager, IT security, finance AP, requesting department head

---

## 1. Purpose

Vendor onboarding moves a new vendor from "we want to buy from them" to "they're in our systems, contracted, and able to invoice." This SOP exists because the previous flow took 14-21 days, lost requests in handoffs, and resulted in three audit findings in 2025. Target end-to-end time after this SOP is in place: 7 business days for standard vendors, 14 for vendors requiring full security review.

## 2. Scope

This SOP covers vendor onboarding for any third-party that will be paid by the company on a recurring or one-time basis above $1,000 USD, AND/OR that will receive any company data, system access, or be named in a customer-facing context.

Not covered by this SOP:
- One-time expense reimbursements under $1,000 — see SOP: Petty Cash & Reimbursements
- Renewals of existing vendors — see SOP: Vendor Renewal & Rebid
- Independent contractors paid through payroll — see SOP: Contractor Onboarding (HR)

## 3. Roles and Responsibilities

| Step | R (does the work) | A (accountable) | C (consulted) | I (informed) |
|------|-------------------|-----------------|---------------|--------------|
| Intake | Procurement coordinator | Ops manager | Requesting dept head | Finance AP |
| Security review | IT security analyst | CISO | Ops manager | Requesting dept head |
| Finance setup | AP specialist | Controller | Procurement | Ops manager |
| Contract execution | Procurement coordinator | Ops manager | Legal (if required) | Requesting dept head, CFO |
| Activation | AP specialist | Controller | — | Requesting dept head, Ops manager |

## 4. Process Steps

1. **Intake**
   - Owner: Requesting dept head submits vendor request via the "New Vendor Intake" form in Asana (link: [Asana form])
   - Input: vendor name, contact, what we're buying, estimated annual spend, data sensitivity (yes/no), urgency
   - Output: ticket created, routed to procurement coordinator
   - SLA: form submission to first procurement response — 1 business day

2. **Procurement triage** (procurement coordinator)
   - Determines if vendor is standard or requires security review (any data access or sensitive data exposure = security review required)
   - Input: ticket from step 1
   - Output: classification (standard / security-review-required), assigned reviewer
   - SLA: triage complete — 1 business day after intake

3. **Security review** (if required — IT security analyst)
   - Reviews vendor's SOC 2 report, data processing agreement, security questionnaire
   - May request additional info from vendor — vendor response time counts toward SLA
   - Input: vendor security docs
   - Output: approved / approved with conditions / declined
   - SLA: review complete — 5 business days after vendor provides complete docs
   - Decision point: if declined, ticket returns to procurement coordinator who notifies requesting dept head with the reason

4. **Finance setup** (AP specialist)
   - Adds vendor to NetSuite with the correct GL coding (consult requesting dept head for cost center)
   - Sets up W-9/W-8BEN collection (US/international)
   - Sets up ACH/wire payment details with banking verification (call-back to a number from vendor's website, NOT from the email — fraud prevention)
   - Input: approved vendor from steps 2-3
   - Output: vendor active in NetSuite
   - SLA: 2 business days after security clearance

5. **Contract execution** (procurement coordinator)
   - Drafts or reviews MSA + SOW
   - Routes through Legal if: contract value over $50k annual, atypical clauses, indemnification, data processing
   - Sends to vendor for signature, then countersigns
   - Input: scope from requesting dept, finance setup complete
   - Output: fully executed contract in Confluence (vendor folder)
   - SLA: 3-5 business days depending on Legal involvement
   - Decision point: if vendor refuses standard terms, escalate to ops manager

6. **Activation notification** (procurement coordinator)
   - Confirms vendor is ready to invoice
   - Notifies requesting dept head with vendor's NetSuite vendor ID, PO process, and AP contact
   - Notifies vendor of invoice submission portal and AP contact
   - Input: all prior steps complete
   - Output: vendor is live; requesting dept can issue POs
   - SLA: same day after contract execution

## 5. Decision Points / Exceptions

- **Urgent vendor (operational continuity at risk):** ops manager can fast-track security review and finance setup in parallel, but full security review still completes within 10 business days. CFO sign-off required for any payment before full onboarding.
- **Vendor declines DPA / security terms:** procurement coordinator escalates to CISO. CISO may approve a workaround (e.g., scoped access, additional contractual controls) or decline.
- **Annual spend exceeds $250k:** CFO sign-off required at contract execution step.
- **International vendor:** add 3-5 business days for tax setup (W-8BEN, withholding determination, sales tax review).

## 6. Escalation Path

- Step blocked at procurement: escalate to ops manager within 24 hours of identified block
- Step blocked at security: escalate to CISO within 48 hours of identified block
- Step blocked at finance: escalate to Controller within 24 hours of identified block
- Step blocked at legal: escalate to General Counsel within 48 hours of identified block
- Vendor non-responsive for more than 5 business days: procurement coordinator notifies requesting dept head, ticket parked, dept head decides to pursue or close

## 7. Systems and Tools

- Intake form: Asana — "New Vendor Intake" project, link: [Asana URL]
- Vendor tracking: Asana — same project, dashboard view "Vendor Onboarding Pipeline"
- Security review: SharePoint — "Vendor Security Reviews" folder
- Vendor master: NetSuite — Vendor Center
- Contracts: Confluence — "Vendor Contracts" space, organized by vendor ID
- Payment setup: NetSuite Banking + bank web portal for ACH verification

## 8. Definitions

- **MSA**: Master Service Agreement — the overarching commercial agreement
- **SOW**: Statement of Work — specific scope, deliverables, and pricing under the MSA
- **DPA**: Data Processing Agreement — required if the vendor will process any personal data
- **GL coding**: General Ledger coding — the account and cost center the spend rolls up to
- **W-9 / W-8BEN**: IRS forms for tax reporting on US vs. international vendors
- **NetSuite vendor ID**: unique identifier assigned at setup; used on all POs and invoices

## 9. Change Log

| Date | Author | Change | Reason |
|------|--------|--------|--------|
| 2026-04-15 | Maya Chen | Added ACH call-back verification step | Fraud prevention after Q1 near-miss |
| 2026-02-08 | Maya Chen | Reduced standard SLA from 14 to 7 days | Process improvement initiative |
| 2026-01-20 | Maya Chen | Added DPA requirement | Privacy program rollout |
| 2025-11-12 | Prior owner | Updated GL coding instructions | NetSuite chart of accounts refresh |
| 2025-09-04 | Prior owner | Initial version | New SOP |
