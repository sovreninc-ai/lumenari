# Reference Workflows — Compliance Officer Pack

Worked examples. Steal the structures, swap your framework and facts. Every document includes the two disclaimers. Don't strip them.

---

## 1. Policy template — Acceptable Use Policy

```
ACCEPTABLE USE POLICY
Effective: 2026-09-01 | Version: 4.2 | Owner: Compliance | Reviewer: General Counsel
Next review: 2027-09-01 | Framework mapping: SOC 2 Type II (Security + Confidentiality), ISO 27001:2022 (A.5.10, A.8.1-A.8.8), NIST CSF PR.AC, PR.AT

THIS DOCUMENT IS A WORKING DRAFT PREPARED BY THE COMPLIANCE FUNCTION. NOT LEGAL ADVICE. COUNSEL REVIEW REQUIRED BEFORE PUBLICATION.

1. PURPOSE
This policy describes acceptable use of [Company] information systems, devices, and data. It is designed to align with SOC 2 Type II Trust Services Criteria for Security and Confidentiality and ISO 27001:2022 Annex A controls A.5.10 and A.8.1-A.8.8. It supports our obligations as a business associate under HIPAA and as a data processor under GDPR and applicable US state privacy laws.

2. SCOPE
This policy applies to all employees, contractors, interns, and authorized third parties (collectively, "Users") accessing [Company] information systems, including:
- Production and non-production environments
- Company-issued and BYOD devices used for work purposes
- Cloud services and SaaS applications procured by or for [Company]
- Customer data, employee data, and confidential business data

3. DEFINITIONS
- "Confidential Information" — non-public information of [Company] or its customers, including PHI, PII, source code, financial data, and pre-release product information
- "Personal Information" — as defined in applicable privacy laws (GDPR, CCPA/CPRA, PIPEDA, etc.)
- "Information System" — any [Company]-managed or [Company]-authorized hardware, software, network, or service

4. POLICY STATEMENTS

4.1 Authentication
- Users must authenticate to all information systems using their assigned credentials. Shared credentials are not permitted except for documented, time-limited break-glass accounts approved by Security.
- Multi-factor authentication is required for all systems containing Confidential Information.
- Passwords must conform to the Password Standard (Appendix A).

4.2 Acceptable Use
- Information systems are provided for business purposes. Limited personal use is permitted provided it does not interfere with work, consume excessive resources, or violate this policy.
- Users may not access, copy, modify, or share Confidential Information beyond what is necessary for their role.
- Users may not install unauthorized software or connect unauthorized devices to corporate networks.

4.3 Prohibited Activities
- Using information systems to harass, threaten, or discriminate against any person
- Bypassing or attempting to bypass security controls
- Sharing credentials or allowing others to use your account
- Storing Confidential Information on personal cloud accounts or unauthorized SaaS
- Posting Confidential Information or [Company] internal information to public channels (including AI chatbots not approved per the AI Use Standard)

4.4 Data Handling
- Confidential Information must be stored and transmitted using approved systems. Reference: Data Classification & Handling Policy.
- Personal Information must be processed in accordance with the Privacy Policy and applicable Data Processing Agreements.
- PHI must be processed in accordance with the HIPAA Business Associate Agreement and the HIPAA Security Standard.

4.5 Device Security
- Company-issued devices must run approved endpoint management and EDR agents.
- BYOD devices used to access Confidential Information must comply with the Mobile Device Standard.
- Lost or stolen devices must be reported to Security within 24 hours.

4.6 Incident Reporting
- Users who suspect a security incident, privacy incident, or policy violation must report it immediately to security@[company].com or via the Incident Response Hotline.
- Retaliation against good-faith reporters is prohibited.

5. ROLES AND RESPONSIBILITIES
- Compliance: maintains this policy, tracks acknowledgments, reports on training
- Security: enforces technical controls, investigates incidents
- IT: provisions devices and access in accordance with policy
- People Operations: handles disciplinary actions for policy violations
- Users: comply with this policy; complete annual training; report incidents
- Managers: ensure team awareness; escalate policy questions

6. PROCEDURES
Implementation procedures are maintained in:
- Onboarding & Provisioning SOP
- Access Review SOP
- Incident Response Runbook
- Termination & Deprovisioning SOP

7. EXCEPTIONS
Exceptions to this policy require:
- Written request to compliance@[company].com identifying the specific clause, business justification, compensating controls, and proposed expiration
- Approval by the Compliance Officer (or designee) with sign-off from Security and General Counsel for material exceptions
- Documentation in the exception register; quarterly review

8. ENFORCEMENT
Violations may result in disciplinary action up to and including termination, in accordance with the Employee Handbook. Material violations or violations involving Personal Information or PHI will be reviewed by Compliance and General Counsel.

9. RELATED POLICIES
- Data Classification & Handling Policy
- Information Security Policy
- Privacy Policy
- Incident Response Plan
- Mobile Device Standard
- AI Use Standard
- HIPAA Business Associate Standard

10. REVIEW AND APPROVAL
- Annual review by Compliance with General Counsel sign-off
- Out-of-cycle review on material framework changes, regulator guidance, or significant incidents
- Approval log maintained in the policy management system

This policy is not legal advice. For interpretation of how this policy applies to your situation, contact compliance@[company].com. For interpretation of legal obligations, consult General Counsel.

Approval log:
- v4.2 — 2026-09-01 — Compliance Officer | General Counsel
- v4.1 — 2025-09-01 — Compliance Officer | General Counsel
- v4.0 — 2024-09-01 — Compliance Officer | General Counsel
- ...

---
Things to verify before counsel routing:
- Section 4.4 PHI reference — confirm BAA section number with GC
- Appendix A (Password Standard) — confirm current version date
- AI Use Standard reference — confirm policy exists and is published
- Exception process — confirm CCO/designee delegation matrix
```

---

## 2. Audit-readiness checklist — SOC 2 Type II prep

```
AUDIT READINESS — SOC 2 TYPE II — Window: 2026-04-01 through 2026-09-30 — Auditor: [Firm] — Prep Owner: Compliance

THIS DOCUMENT IS INTERNAL. NOT LEGAL ADVICE. SHARE WITH AUDITOR ONLY VIA APPROVED CHANNELS.

OVERALL POSTURE
We're aligned with SOC 2 Type II for Security and Confidentiality trust services criteria, with Availability and Privacy added in 2026. Three control families need attention before the auditor begins fieldwork (2026-10-05): access review evidence consistency, vendor risk documentation for two new subprocessors, and the incident response tabletop exercise log. Remaining 38 controls are well-evidenced in Vanta.

CONTROL FAMILY-BY-FAMILY STATUS

CC1 — Control Environment
- CC1.1 Integrity and ethical values: Code of Conduct + annual acknowledgment. Evidence: Vanta acknowledgment report (2026-09-29 refresh). Owner: HR. Gap: none.
- CC1.2 Board oversight: Compliance Committee charter + quarterly minutes. Evidence: minutes through Q3 2026. Owner: Compliance. Gap: none.
- CC1.4 Commitment to competence: training records. Evidence: LMS completion report. Owner: People Ops. Gap: 4 employees on extended leave — flag to auditor with documented justification.
- CC1.5 Accountability: documented disciplinary process. Evidence: Employee Handbook v8.1. Owner: HR. Gap: none.

CC2 — Communication and Information
- CC2.1 Information requirements: data classification policy. Evidence: Data Classification & Handling Policy v3.2. Owner: Compliance. Gap: none.
- CC2.2 Internal communication: All-hands cadence + Slack #security-announcements. Evidence: meeting schedule + recent posts. Owner: Compliance. Gap: none.
- CC2.3 External communication: customer-facing privacy notice + status page. Evidence: published URLs. Owner: Compliance + Marketing. Gap: none.

CC3 — Risk Assessment
- CC3.1 Objectives: annual risk assessment. Evidence: 2026 Risk Assessment dated 2026-02-15. Owner: Compliance. Gap: none.
- CC3.2 Risk identification: risk register. Evidence: register in Vanta. Owner: Compliance. Gap: one item flagged as red (vendor dependency on subprocessor X) — confirm remediation completed before fieldwork.
- CC3.4 Risk to achievement of objectives: business continuity plan. Evidence: BCP v2.4. Owner: COO. Gap: tabletop exercise behind schedule — see remediation in flight.

CC4 — Monitoring Activities
- CC4.1 Ongoing/separate evaluations: internal audit. Evidence: 2026 internal audit report. Owner: Internal Audit. Gap: none.
- CC4.2 Communication of deficiencies: deficiency log + remediation. Evidence: Vanta tracking. Owner: Compliance. Gap: none.

CC5 — Control Activities
- CC5.1, 5.2, 5.3: control design + IT general controls + policy maintenance. Evidence: control matrix in Vanta. Owner: Compliance. Gap: none.

CC6 — Logical and Physical Access Controls
- CC6.1 Logical access: identity governance + MFA enforcement. Evidence: Okta reports + Vanta scans. Owner: Security + IT. Gap: NONE on enforcement; access review consistency flagged below.
- CC6.2 Provisioning: documented onboarding. Evidence: SOP + sample tickets. Owner: IT. Gap: one Q2 termination not deprovisioned in 24h (took 47h) — documented exception, root cause completed.
- CC6.3 Authorization: access review evidence. Evidence: quarterly access review tickets. Owner: Security. GAP: Q2 and Q3 access reviews completed but evidence trail inconsistent — some attestations missing manager signatures. REMEDIATION IN FLIGHT.
- CC6.4 Physical access: office access logs. Evidence: badge system reports. Owner: Facilities. Gap: none.
- CC6.5 Removal: termination process. Evidence: deprovisioning checklist + tickets. Owner: IT + HR. Gap: one exception noted above.
- CC6.6, 6.7, 6.8: encryption, transmission, malware. Evidence: control evidence in Vanta. Owner: Security. Gap: none.

CC7 — System Operations
- CC7.1 Vulnerability management: scan reports + remediation SLA. Evidence: monthly scan reports. Owner: Security. Gap: one critical CVE open beyond SLA (28 days vs 14 day SLA) — documented exception with compensating controls.
- CC7.2 Detection: SIEM + alerting. Evidence: alert tuning + investigation logs. Owner: Security. Gap: none.
- CC7.3 Response: Incident Response Plan + drills. Evidence: IRP v3.1 + drill log. Owner: Compliance + Security. GAP: Annual tabletop scheduled for Q3 2026 not yet completed. REMEDIATION IN FLIGHT.
- CC7.4 Recovery: BCP + DR test. Evidence: DR test report 2026-06-20. Owner: Engineering + COO. Gap: none.
- CC7.5 Communications during incidents: customer comm SOP. Evidence: SOP + sample comms. Owner: Compliance + CS. Gap: none.

CC8 — Change Management
- CC8.1 Change authorization: change advisory board minutes + approvals. Evidence: CAB log. Owner: Engineering. Gap: none.

CC9 — Risk Mitigation
- CC9.1 Risk mitigation policies. Evidence: vendor risk policy + register. Owner: Compliance. GAP: two new subprocessors (added 2026-07 and 2026-08) — DPA reviews completed but risk assessments not yet in Vanta. REMEDIATION IN FLIGHT.
- CC9.2 Vendor management: vendor monitoring. Evidence: SOC 2 reports for top vendors. Owner: Compliance. Gap: one vendor SOC 2 expired before renewed copy received — vendor confirmed re-issuance by 2026-10-12.

A1 — Availability (new for 2026)
- A1.1 capacity management, A1.2 environmental protections, A1.3 backup recovery: evidence in flight, primary owner Engineering.

C1 — Confidentiality
- C1.1 confidential information protection: data classification + handling. Evidence: policy + DLP reports. Owner: Compliance + Security. Gap: none.
- C1.2 disposition: data retention + deletion logs. Evidence: retention schedule + sample deletion tickets. Owner: Compliance. Gap: none.

P-series — Privacy (new for 2026)
- Privacy notice, consent management, subject rights handling: evidence in flight, primary owner Compliance + DPO.

KEY RISK AREAS (auditor likely focus)
1. Access review consistency (CC6.3) — remediation in flight, evidence trail being completed by 2026-10-01
2. Tabletop exercise log (CC7.3) — scheduled 2026-10-02, will complete before fieldwork
3. New subprocessor risk assessments (CC9.1) — completing by 2026-10-04
4. New Availability and Privacy criteria — first year audited; expect deeper questions
5. Open critical CVE (CC7.1) — documented exception; auditor will test compensating controls

REMEDIATION IN FLIGHT
| Item | Owner | Due | Status |
| CC6.3 access review evidence | Security | 2026-10-01 | On track |
| CC7.3 tabletop exercise | Compliance | 2026-10-02 | Scheduled |
| CC9.1 subprocessor risk assessments | Compliance | 2026-10-04 | On track |
| Vendor X SOC 2 re-issuance | Compliance | 2026-10-12 | Pending vendor |

INTERVIEW PREP
Likely interviewees:
- CISO or Head of Security — CC6, CC7, CC8 controls
- Compliance Officer (you) — overall program, CC1, CC2, CC3, CC9, privacy
- Head of People Ops — CC1.4 training, onboarding/offboarding
- DPO — privacy criteria
- Engineering manager — CC8 change management, A1 availability
- Customer Support lead — CC7.5 customer communications

Calibrate talking points around the remediation items. Be transparent. Don't volunteer information beyond questions asked.

WHAT WE'RE NOT READY FOR
- The Privacy criteria — this is our first year and the auditor will test consent management harder than we've practiced. Expect findings; have remediation framing ready.
- The open critical CVE — defensible with compensating controls but expect probing
- Customer-side DPA gaps with 3 customers (smaller accounts) where we never signed DPAs — flag this proactively to auditor; have remediation plan

---
Things to verify before sharing with auditor team:
- Each control owner has signed off on their section
- Vanta data export current as of week-of audit start
- Sample tickets for evidence are not stale
- Tabletop exercise actually completed before fieldwork begins
```

---

## 3. Annual security awareness training summary

```
SECURITY AWARENESS TRAINING — Annual — FY2026 — Owner: Compliance

THIS DOCUMENT IS A WORKING DRAFT. NOT LEGAL ADVICE. COUNSEL REVIEW OF SUBSTANTIVE CONTENT REQUIRED BEFORE ROLL-OUT.

OBJECTIVES
After completion, all employees will be able to:
1. Identify phishing and social engineering attempts and report them through approved channels
2. Apply data classification labels correctly to documents and communications
3. Recognize what constitutes a security or privacy incident and how to report
4. Apply MFA and password practices consistent with the Acceptable Use Policy
5. Understand basic HIPAA / GDPR / state privacy obligations as applicable to their role

SCOPE
Required: all employees, all contractors with access to information systems, all interns. Due within 30 days of hire (new) or by 2026-12-15 (existing).

CONTENT OUTLINE (6 modules, each 5-8 min)
1. Phishing and social engineering (with role-specific examples; 7 min)
2. Data classification and handling (with PHI/PII specifics; 6 min)
3. Incident recognition and reporting (with hotline + Slack channel; 5 min)
4. Authentication, MFA, password practices (5 min)
5. Privacy basics — what's PII, what's PHI, what's a subject right (8 min)
6. Acceptable use highlights (with AI tool guidance; 6 min)

Total time: ~37 minutes plus comprehension checks.

COMPREHENSION CHECKS
- 10 questions across all modules, randomized order, randomized incorrect answers
- 80% pass threshold; one retake allowed without escalation; second failure → manager + Compliance follow-up
- Specific scenarios, not abstract definitions ("You receive an email from 'ceo@company-co.com' asking for a wire transfer. What do you do?" with realistic answer choices)

COMPLETION TRACKING
- Delivery: Vanta Learn integrated with LMS
- Manager visibility: weekly completion dashboard in #compliance channel
- Escalation: non-completers at 30 / 60 / 90 days post-window — direct manager outreach, then VP, then leadership
- Records retention: 7 years from completion (per records retention policy)

RECORDS RETENTION
Completion records (employee, module, date, score) retained for 7 years. Anonymized completion stats retained indefinitely for trending.

APPROVAL
- Content: Compliance Officer (lead) + Security Lead (technical accuracy) + General Counsel (substantive accuracy on regulatory references) — all sign-off required before roll-out
- Roll-out timing: People Ops sign-off on launch communications
- Renewal: annual update cycle, with content review against framework changes and incidents from prior year

WHAT WE INTENTIONALLY EXCLUDED FROM THIS YEAR'S TRAINING
- Detailed regulatory citation language (employees don't retain it; the auditor reads completion, not slide content)
- "What is a breach" definitions (legal characterization; covered in Incident Response training for first responders)
- AI tool deep dives (covered in separate AI Use training for engineering)

---
Things to verify before roll-out:
- All scenario examples reflect current threat landscape (review with Security)
- The CEO wire scenario doesn't reference the actual CEO's name
- Pass-threshold (80%) — confirm consistent with prior year
- Comprehension check questions reviewed by GC for any legal characterization
- Records retention period (7 years) — confirm consistent with retention policy
```

---

## 4. Incident write-up — privacy incident (counsel-routed)

```
INCIDENT WRITE-UP — INC-2026-09-114 — Detected 2026-09-22 14:47 PT — Author: Compliance

THIS DOCUMENT IS COUNSEL-ROUTED. PRIVILEGED & CONFIDENTIAL. NOT LEGAL ADVICE.
DOCUMENT VERSION: v0.3 (counsel input pending on framework analysis)

WHAT WE KNOW
- 2026-09-22 14:47 PT: Engineering team member committed a code change to public GitHub repository [redacted-repo-name]
- The change included a debug log artifact that contained approximately 40 customer record identifiers and IP addresses
- The log did not contain customer names, email addresses, or other directly identifying personal data
- The record identifiers map to customer records in our internal system; those records contain PHI accessible to authorized users with proper authentication
- 2026-09-22 15:09 PT (22 minutes after commit): Security team's secret-scanning tool (TruffleHog) generated alert
- 2026-09-22 15:11 PT: Security on-call engaged the committer; commit was identified
- 2026-09-22 15:14 PT: Force-push performed to scrub the commit from history; repo briefly made private for confirmation; restored to public 2026-09-22 15:31 PT
- 2026-09-22 15:32 PT: Compliance, General Counsel, and CISO notified
- 2026-09-22 16:00 PT: Initial bridge convened (Compliance, GC, CISO, Engineering Lead, Customer Success Lead)
- GitHub access logs reviewed: 3 anonymous clones of the repo logged during the 22-minute window (cannot identify viewer, cannot confirm what they viewed)

WHAT WE DON'T KNOW
- Whether any of the 3 anonymous clones actually inspected the debug log file (GitHub does not log file-level access in repository clones)
- Whether the customer record identifiers, on their own (without our internal system access), are sufficient to identify individuals
- Whether the IP addresses, on their own, constitute personal information under any applicable framework
- Whether any of the 40 customer records relate to individuals whose IPs are in jurisdictions with stricter notification obligations
- Whether the committer's action was a one-off or whether other debug artifacts may exist in repo history

TIMELINE
- 14:47 PT — Commit pushed
- 15:09 PT — Alert generated
- 15:11 PT — Committer engaged
- 15:14 PT — Force-push performed
- 15:31 PT — Repo confirmed scrubbed and restored
- 15:32 PT — Initial notifications to Compliance, GC, CISO
- 16:00 PT — Initial bridge
- 17:30 PT — Engineering preserved all relevant logs (GitHub audit logs, secret-scan alerts, force-push receipts) for legal hold
- 18:45 PT — Engineering completed scan of repo history for similar artifacts (none found)

POTENTIAL FRAMEWORK IMPLICATIONS (PENDING COUNSEL)
- HIPAA Breach Notification Rule (45 CFR §164.402-414): analysis of whether the disclosed information constitutes "unsecured PHI" under HIPAA; risk of harm analysis. PENDING COUNSEL.
- GDPR Article 33/34: analysis of whether the customer record identifiers and IPs constitute personal data and whether the incident meets the breach threshold; 72-hour notification clock implications. PENDING COUNSEL.
- US state breach notification laws: analysis required for at minimum California, New York, Illinois (states where we have material customer presence); 47 additional states + DC + PR + USVI to assess. PENDING COUNSEL.
- Customer contractual notification obligations: 40 customer records mapped to specific accounts; each customer's contract reviewed for notification thresholds. PENDING COUNSEL + COMMERCIAL.
- HIPAA Business Associate Agreement notification obligations: where covered entity customers are involved, BAA notification timing applies. PENDING COUNSEL.

ACTIONS TAKEN
| Action | Owner | Timestamp |
| Force-push to scrub repo history | Engineering | 2026-09-22 15:14 PT |
| Initial bridge convened | Compliance | 2026-09-22 16:00 PT |
| Legal hold instituted | GC | 2026-09-22 17:00 PT |
| Repo scan for similar artifacts | Engineering | 2026-09-22 17:00-18:45 PT |
| GitHub audit logs preserved | Engineering | 2026-09-22 17:30 PT |
| 40 record IDs mapped to customer accounts | Engineering + Compliance | 2026-09-23 09:00 PT |

PENDING DECISIONS
| Decision | Owner | Target | Counsel sign-off |
| Notification analysis — HIPAA | GC | 2026-09-25 | Yes |
| Notification analysis — GDPR | GC + outside counsel (EU) | 2026-09-24 | Yes |
| Notification analysis — state laws | GC + outside counsel (US privacy) | 2026-09-26 | Yes |
| Customer notification plan (if required) | GC + Commercial + CS | TBD post-analysis | Yes |
| Internal communication to broader team | Compliance + Engineering Lead | 2026-09-24 | Yes (counsel review of language) |
| Root cause documentation + remediation | Engineering + Security | 2026-09-30 | No |

LESSONS / ROOT CAUSE (PRELIMINARY)
Preliminary root cause: debug logging configuration in [service-name] generated artifacts that included customer record identifiers and IPs; the engineer was unaware that the debug log contents included identifying-adjacent data; pre-commit hooks did not catch the artifact because the artifact filename did not match secret-scanning patterns.

Remediation in flight:
1. Update pre-commit hooks to flag specific debug artifact filename patterns
2. Update debug logging configuration in [service-name] to exclude record IDs and IPs from default verbose logs
3. Re-train engineering on what counts as identifying-adjacent data (specific module addition planned for Q4 training cycle)

DOCUMENT VERSION CONTROL
v0.1 — 2026-09-22 19:00 PT — initial write-up (Compliance)
v0.2 — 2026-09-23 11:00 PT — added record ID mapping (Compliance + Engineering)
v0.3 — 2026-09-23 16:00 PT — added pending decisions matrix (Compliance + GC)

NEXT UPDATE: 2026-09-24 09:00 PT after counsel notification analyses progress.

---
Things to verify before counsel routing:
- The 22-minute window is correct (recheck GitHub commit-to-removal timestamps)
- The 3 anonymous clones figure (recheck GitHub audit log query)
- Each named timestamp is in PT and accurate to the audit log
- The 40-record count is final (engineering confirmed all artifact contents)
- No characterization of "breach" or "not breach" anywhere in document — confirmed

NOT LEGAL ADVICE. CONSULT QUALIFIED COUNSEL FOR YOUR JURISDICTION AND PROGRAM.
```

---

## 5. Regulator correspondence outline (counsel will draft the letter)

```
REGULATOR CORRESPONDENCE OUTLINE — [State AG Office, e.g., California Attorney General] — Inquiry received 2026-09-15 — Response due 2026-10-15

THIS DOCUMENT IS COUNSEL-ROUTED. PRIVILEGED & CONFIDENTIAL. NOT LEGAL ADVICE.

ROUTING
- Drafted by: Compliance
- Reviewed by: General Counsel + Outside Counsel (state privacy specialist)
- Signed by: CCO or General Counsel (TBD by counsel)
- Filed by: General Counsel via [regulator's filing portal / certified mail]

INQUIRY SUMMARY
On 2026-09-15, the California Attorney General's office issued a letter requesting information regarding our compliance with CCPA/CPRA in connection with [specific subject matter — paraphrased]. The letter cites Cal. Civ. Code §§1798.140, 1798.155, and requests response by 2026-10-15.

The letter specifically asks for:
1. Description of our consumer-facing privacy notice and date last updated
2. Number of California-resident consumer requests received in past 12 months by type (access, deletion, opt-out, correction, portability)
3. Description of our processes for verifying consumer identity and processing requests within statutory timelines
4. List of our service providers and contractors that process California-resident personal information
5. Description of any "sale" or "sharing" of California-resident personal information

OUR POSITION (OUTLINE FORM — COUNSEL WILL DRAFT LANGUAGE)
- Acknowledge receipt and confirm response timeline
- Reaffirm our commitment to consumer privacy and CCPA/CPRA alignment
- Provide factual information requested, scoped to the specific questions
- Reference our privacy program structure (without making blanket compliance claims)
- For Question 5 ("sale" or "sharing"): clarify the technical definitions under CCPA/CPRA and our position — this is the most counsel-sensitive question and language must be drafted by counsel

EVIDENCE / ENCLOSURES (TO PREPARE)
| Item | Owner | Prep status |
| Current privacy notice (URL + PDF copy as of letter date) | Compliance | Ready |
| Privacy notice update history (last 36 months) | Compliance | Ready |
| Consumer request log (counts by type, redacted) | Compliance + Engineering | In progress, due 2026-09-30 |
| Verification process SOP | Compliance | Ready |
| Service provider / contractor list with CCPA-compliant terms in place | Compliance + Procurement | In progress, due 2026-10-03 |
| Analysis of "sale" / "sharing" determinations | GC + Outside Counsel | In progress |

OPEN QUESTIONS FOR COUNSEL
1. Tone and scope of the response — narrow to the literal questions asked, or include broader program context?
2. How to frame the "sale" / "sharing" question — pure factual position or include legal interpretation? (Strong counsel call.)
3. Whether to coordinate with any concurrent regulator inquiries (none currently known; confirm with GC)
4. Whether to volunteer information about remediation in flight (e.g., a planned privacy notice update unrelated to this inquiry)
5. Privilege considerations on any internal analyses we attach
6. Whether to request an extension of the 2026-10-15 deadline given evidence preparation timeline

TIMELINE
- Counsel review of outline: 2026-09-22 (target)
- Evidence preparation complete: 2026-10-03
- Counsel drafts response letter: 2026-10-03 through 2026-10-08
- Internal sign-off (CCO, GC, CEO if required): 2026-10-10
- Filing target: 2026-10-14 (1-day buffer to deadline)
- Confirmation of filing: 2026-10-15 by EOD

NOTES FOR COUNSEL
- No prior interactions with this specific AG office; first formal inquiry
- Concurrent matter: routine SOC 2 audit ongoing (auditor onsite week of 2026-10-21) — no overlap but worth flagging
- The triggering customer complaint (if any) is not identified in the AG letter — strategic question whether to inquire
- Customer Success team has not been involved; intentional to limit information dissemination during privileged drafting

---
Things to verify before counsel routing:
- The 2026-10-15 deadline (confirm from letter)
- Specific Cal. Civ. Code citations (confirm from letter)
- Consumer request log accuracy (confirm with Engineering data extract)
- Service provider list completeness (confirm with Procurement)
- That no other regulator inquiries are pending (confirm with GC)

NOT LEGAL ADVICE. THIS OUTLINE WILL BE CONVERTED INTO A FORMAL RESPONSE BY COUNSEL. COMPLIANCE DRAFTS OUTLINES; COUNSEL DRAFTS LETTERS.
```
