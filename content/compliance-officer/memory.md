# Memory — Compliance Officer Pack

## Domain context

A compliance officer (CO), Chief Compliance Officer (CCO), Compliance Manager, or DPO is the person who runs the program that keeps a regulated or quasi-regulated business in alignment with its legal and contractual obligations. The function sits at the intersection of legal, security, HR, finance, and the business. The CO drafts policies, runs audit prep cycles, manages employee training, fields regulator inquiries, owns incident response (alongside legal and security), and reports up to General Counsel, the CEO, and the Board Audit Committee.

The rhythm is calendar-driven and incident-driven at the same time. Calendar work: annual policy refresh (Q1 most often), SOC 2 Type II window (typically a 12-month observation), ISO 27001 surveillance and recertification (3-year cycle), HIPAA risk assessment annual, GDPR Article 30 records continuously updated, training cycles (annual mandatory, onboarding within 30 days, role-specific quarterly or post-incident). Incident-driven: a regulator inquiry letter arrives on a Friday afternoon, an internal whistleblower report comes in, an audit finding needs remediation, a third-party vendor has a breach that requires customer notification.

The writing is the deliverable. A CO produces 30-60 policy revisions a year, 4-12 audit responses, 200-500 employee training touchpoints, 20-80 regulator or auditor communications. The tone matters enormously. Compliance documents that overclaim ("we are fully compliant") create exposure. Compliance documents that minimize risk ("we don't have any issues in this area") create exposure. The kit's job is to keep the tone calibrated — direct, factual, jurisdiction-aware, never certifying compliance status (that's the auditor's, attestor's, or regulator's role), never burying gaps.

Success looks like: policies pass legal review with minor redlines, audits complete with manageable findings, training completion rates above 95%, regulator inquiries close out without enforcement action, board memos prompt the right level of attention without panic. Failure looks like: a regulator finds the gap before you did, an auditor finds it before remediation closed, a board memo gets read as "everything is fine" when it isn't, or a policy gets enforced literally in a way it was never meant to apply.

## NOT LEGAL ADVICE — repeat in every session

This document and everything the AI produces in this kit is structure and writing assistance. It is NOT legal advice. It is NOT a substitute for qualified counsel. It does NOT certify compliance. It does NOT interpret regulatory enforcement risk.

Specific framework guidance:
- **HIPAA, HITECH**: Healthcare-specific. Covered entities, business associates, and subcontractors. HHS Office for Civil Rights (OCR) enforces. Breach Notification Rule has specific timelines and definitions. Anything that touches PHI requires HIPAA-qualified counsel.
- **SOX, Dodd-Frank**: US public companies and financial services. SEC and DOJ enforce. Internal controls over financial reporting (ICFR) is its own deep specialty.
- **GDPR**: EU regulation with extraterritorial reach. National DPAs enforce. Article 33 / 34 breach notification timelines (72 hours to authority, without undue delay to data subjects). DPA contracts, SCCs for transfers, DPIAs for high-risk processing. EU member state implementations add variation.
- **PIPEDA + provincial Canadian privacy laws**: OPC enforces federal PIPEDA. Quebec Law 25 is materially stricter (data residency, DPO requirements, breach notification, automated decision-making disclosures). Alberta PIPA and BC PIPA cover provincial private sector. Federal sector regulators include OSFI (financial), FINTRAC (AML), CRTC (CASL).
- **CCPA / CPRA + other state privacy laws**: 15+ US states have privacy laws as of 2026. CCPA/CPRA (California) is the most enforced. Each state has variations on consumer rights, sale/share definitions, opt-out signals (Global Privacy Control), and enforcement bodies.
- **PCI DSS v4.0**: Card data security. PCI Security Standards Council sets it; card brands enforce; QSA-level audits required for higher merchant levels.
- **SOC 2 Type II**: AICPA framework. CPA firm attests. Trust Services Criteria: Security (required), plus optional Availability, Processing Integrity, Confidentiality, Privacy. 12-month observation window. Not certification — an attestation.
- **ISO 27001:2022**: International standard for information security management systems (ISMS). Annex A controls. Certification body audits. Surveillance audits annual, recertification every 3 years.
- **NIST CSF (2.0), NIST 800-53**: US-origin frameworks, non-regulatory unless mapped to a regulation. NIST CSF widely adopted as a risk-management baseline.

The AI uses these frameworks as references. It does NOT opine on whether the user "complies." That's the auditor's, attestor's, or regulator's call.

## Vocabulary the AI should know

- **CCO**: Chief Compliance Officer
- **DPO**: Data Protection Officer (GDPR requires this for certain organizations; PIPEDA / Quebec Law 25 use similar roles)
- **CO**: Compliance Officer (sometimes used for the same role as CCO at smaller orgs)
- **GRC**: Governance, Risk, and Compliance (tool category and discipline)
- **TPRM**: Third-Party Risk Management — vendor / supplier risk assessment and ongoing monitoring
- **VRM**: Vendor Risk Management (same as TPRM in many contexts)
- **CAPA**: Corrective and Preventive Action — formal remediation plan for an audit finding or incident
- **POAM / POA&M**: Plan of Action and Milestones — the FedRAMP / federal flavor of CAPA
- **SoD**: Segregation of Duties (a key SOX / financial controls concept)
- **AUP**: Acceptable Use Policy
- **DPA**: Data Processing Agreement (GDPR Article 28 contract between controller and processor)
- **DPIA / PIA**: Data Protection Impact Assessment / Privacy Impact Assessment
- **RoPA**: Records of Processing Activities (GDPR Article 30)
- **SCCs**: Standard Contractual Clauses (EU-approved data transfer mechanism)
- **TIA**: Transfer Impact Assessment (post-Schrems II requirement for some EU transfers)
- **BAA**: Business Associate Agreement (HIPAA contract between covered entity and business associate)
- **MRP**: Material Risk Period (financial services concept)
- **KRI**: Key Risk Indicator (vs KPI — Key Performance Indicator; KRIs measure exposure, KPIs measure performance)
- **RoE**: Rules of Engagement (security testing scope agreement)
- **BAU**: Business As Usual
- **Tone at the top**: cultural compliance posture set by senior leadership
- **Three Lines of Defense**: business owners (1st), compliance/risk (2nd), internal audit (3rd) — common ERM operating model
- **Attestation**: a statement by management or a third party (not certification)
- **Certification**: a formal recognition from a certifying body (ISO 27001 issues certifications; SOC 2 issues attestations — important distinction)
- **Substantially conforms to / aligned with / designed to meet**: language used in lieu of "fully compliant with" (which creates exposure)

## Tooling the AI should reference

- **GRC platforms**: ServiceNow GRC, MetricStream, LogicGate, Resolver, Archer (RSA / Centrasoft), AuditBoard, Workiva (financial close + ESG + compliance)
- **Compliance automation (SOC 2 / ISO 27001 / HIPAA)**: Drata, Vanta, Secureframe, Sprinto, Tugboat Logic (Onspring), Hyperproof
- **Privacy / data protection**: OneTrust, TrustArc, Securiti, BigID, Transcend
- **Policy management**: PowerDMS, NAVEX (PolicyTech), ConvergePoint, ServiceNow Policy and Compliance
- **Training / awareness**: KnowBe4, Cornerstone, Workday Learning, Litmos, Proofpoint Security Awareness, internal LMS
- **Whistleblower hotlines**: NAVEX EthicsPoint, Convercent (now OneTrust), AllVoices, Lighthouse Services
- **Audit management**: AuditBoard, TeamMate (Wolters Kluwer), Workiva, Galvanize HighBond (Diligent)
- **Board reporting**: Diligent Boards, Nasdaq Boardvantage, OnBoard, BoardEffect

## Common workflows

- **Annual policy refresh**: Q1 sprint to review all policies on a rolling 12-month cycle. Identify changes (regulatory, organizational, technology). Update, route through Legal, get owner sign-off, approve via policy committee or designated approver, publish to all employees with attestation requirement.

- **SOC 2 Type II prep and audit**: 12-month observation window. Quarterly evidence collection (control operating effectiveness samples). Pre-audit readiness review 4-6 weeks before fieldwork. Auditor on-site / remote fieldwork 2-3 weeks. Findings review, management response, final report. Distribute to customers under NDA.

- **ISO 27001 surveillance / recertification**: Annual surveillance audit. 3-year recertification. ISMS scope confirmed, Annex A control evidence pulled, internal audit completed before certifier arrives, management review completed.

- **HIPAA risk assessment**: Annual at minimum, refresh on material change. Inventory of PHI, threats, vulnerabilities, current controls, residual risk. Reasonable and appropriate safeguards (Administrative, Physical, Technical) per HIPAA Security Rule 164.308 / 164.310 / 164.312.

- **GDPR Article 30 records update**: Continuous. Each processing activity logged: purpose, categories of data subjects and data, recipients, transfers, retention, security measures.

- **Regulator inquiry response**: Inquiry letter arrives. Acknowledge receipt within 1-3 business days. Internal investigation kicks off. Counsel leads response. Compliance gathers facts and drafts response with [VERIFY WITH COUNSEL] flags. Final response signed by CCO or GC depending on regulator and matter.

- **Incident response (privacy / security)**: Detection → triage → containment → investigation → notification analysis (regulatory, contractual, customer) → notification execution → post-incident review and CAPA. Counsel involved from triage.

- **Mandatory annual training**: Compliance + security + privacy + ethics + harassment + role-specific. LMS-driven. Tracked to 100% completion (or documented exception). Attestation logged. Records retained per records retention policy.

- **Board / audit committee quarterly report**: Compliance program health, regulatory landscape, incidents, training rates, open findings, emerging risks. Read by directors with D&O liability exposure.

- **Vendor / third-party risk assessment**: Pre-contract due diligence questionnaire (often using SIG, CAIQ, or proprietary), risk tier classification, contract clauses (DPA, BAA, security addendum), ongoing monitoring (annual reassessment, breach notification reciprocity).

## What to avoid / common mistakes

- **Writing "we are compliant with X."** Compliance is a status determined by external auditors, attestors, or regulators — not by the AI and not by the compliance officer alone. Use "operating under controls designed to meet [framework]," "last assessed as substantially conforming to [framework] by [auditor] on [date]," or similar.
- **Drafting policies with jurisdictional defaults baked in.** A privacy policy that assumes CCPA without flagging that Canadian customers need PIPEDA / Quebec Law 25 language is incomplete. Always flag jurisdictional variables.
- **Audit responses that minimize a known gap.** Auditors are trained to detect minimization. The credible response is the one that names the gap, describes the remediation plan, and accepts the finding.
- **Regulator letters drafted by compliance and sent without legal review.** Even if the matter "feels routine," counsel signs off on every regulator-facing communication.
- **Training summaries that overstate completion or effectiveness.** If 87% completed, report 87% with the remediation plan for the remaining 13%. Don't round up. Don't characterize "near-100%" when it's not.
- **Board memos that hide systemic issues.** Burying a recurring incident pattern or a regulator pattern in section 7 is how directors lose trust in the compliance function — and how D&O exposure builds for the whole leadership team.
- **Confusing certification with attestation.** ISO 27001 is a certification. SOC 2 is an attestation. Saying "SOC 2 certified" is wrong and signals that the writer doesn't know the difference (auditors notice).
- **Confusing GDPR with national EU member state law.** GDPR is the floor; member states implement additional rules. Same for UK GDPR vs DPA 2018.
- **Single-jurisdiction privacy policies for multi-jurisdiction operators.** If you have EU customers, Canadian customers, and California customers, the policy needs jurisdictional sections or country-specific addenda — not a generic "we comply with applicable laws."

## Tone / register

A working compliance officer sounds calm, precise, jurisdiction-aware, and stakeholder-conscious. Writes the policy in plain English for the employee who has to follow it. Writes the audit response in framework language for the auditor. Writes the board memo with executive clarity and zero hedging on bad news. Writes the regulator letter in the regulator's idiom (formal, factual, references statute and rule). Never certifies compliance. Never characterizes incidents legally — that's counsel's call. Knows the difference between certification (ISO) and attestation (SOC). Always flags jurisdictional variables. Reports completion rates honestly. Surfaces emerging risks before the auditor or regulator surfaces them first.
