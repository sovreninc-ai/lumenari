# Memory — Risk Manager Pack

## Domain context

An enterprise risk manager is the person who owns the program that makes risk visible across a company — so leadership can decide what to invest in mitigating, what to insure, what to accept, and what to walk away from. At smaller companies (200-500 employees) the role is often a solo enterprise risk manager or a hybrid risk/compliance/insurance role, reporting to the CFO, COO, or General Counsel. At larger companies (500-5,000+) there's a Chief Risk Officer with a small team — risk analysts, scenario planners, an insurance manager, sometimes a model validator if there's a quantitative ERM function. The work spans the enterprise risk register, operational risk taxonomy, scenario planning, business continuity and disaster recovery oversight, insurance program management, vendor and third-party risk (feeding into ERM from procurement and compliance), incident debriefs (alongside compliance and legal), and the board-level risk reporting that lands in the audit committee or full board agenda quarterly.

The rhythm is quarterly on top of annual on top of incident-driven. Quarterly: risk register refresh, board reporting, KRI review. Annual: full register reassessment, scenario exercise (often a tabletop), insurance program renewal, ERM framework review, business continuity test. Incident-driven: an event happens (cyber, operational, third-party, geopolitical), the risk team coordinates the debrief 2-4 weeks after the dust settles, the register gets updated, the lessons feed into the next planning cycle. Most of the writing — the language that goes to the board, the language that drives investment decisions — happens in the week before a board meeting or the month after a material incident. The AI is most useful in those moments: turning operational facts and business context into risk language that lands at the right altitude — not CYA, not dismissive, calibrated to what the audience can act on.

Success looks like: the board has a clear view of the top risks and the treatment for each, mitigation plans have named owners and dates, KRIs surface deterioration before it becomes a crisis, the insurance program covers what it should at a price the CFO can defend, incident debriefs produce actual changes to controls and playbooks, the register is a tool people use, not a binder nobody opens. Failure looks like: a risk register that gets rewritten every quarter because nobody trusts the prior version, a board summary that surprised the board because the language buried the deterioration, a mitigation plan that's been "in flight" for 18 months, an insurance gap that surfaces during a claim, an incident debrief that produces no change.

## Vocabulary the AI should know

- **ERM**: Enterprise Risk Management. The program that integrates risk view across the company.
- **CRO**: Chief Risk Officer.
- **GRC**: Governance, Risk, and Compliance. Tooling category and operating discipline.
- **Risk register**: the cataloged list of identified risks with their attributes (likelihood, impact, owner, controls, treatment, trend).
- **Risk taxonomy**: the categorization scheme. Common top-level categories: Operational, Financial, Strategic, Compliance/Legal, Reputational, Technology/Cyber, Third-Party, ESG, Geopolitical.
- **Inherent risk**: the risk before controls.
- **Residual risk**: the risk after controls. The gap between inherent and residual is what the controls "buy."
- **Risk appetite**: the amount and type of risk a company is willing to pursue in pursuit of its objectives. A board-set statement.
- **Risk tolerance**: the acceptable variation around objectives. Tied to specific metrics.
- **Risk capacity**: the maximum risk a company can absorb before it threatens viability.
- **KRI**: Key Risk Indicator. A metric that signals risk levels (vs KPI = Key Performance Indicator, which signals performance levels).
- **Control**: a process, system, or policy that mitigates a risk.
- **Treatment strategies**: Avoid, Mitigate, Transfer, Accept (the four).
- **Three Lines of Defense**: business owners (first line), risk and compliance (second line), internal audit (third line).
- **VaR**: Value at Risk. Financial metric — maximum loss over a horizon at a confidence level. Common in financial services.
- **CVaR / ES**: Conditional Value at Risk / Expected Shortfall. The average loss in the tail beyond VaR.
- **Stress test / scenario analysis**: examining the impact of specific hypothetical events. Stress tests typically have prescribed scenarios (regulator-driven); scenario analysis is broader.
- **Heat map**: visual register typically showing likelihood × impact, often 5×5.
- **Bow-tie analysis**: a visualization showing causes leading to a central event, with controls preventing or mitigating each cause and consequence.
- **Failure mode and effects analysis (FMEA)**: structured method for identifying failure modes and their effects, with a severity / occurrence / detection scoring.
- **BIA**: Business Impact Analysis. The foundational analysis underpinning business continuity planning.
- **BCP / DR**: Business Continuity Plan / Disaster Recovery. BCP covers business operations; DR is typically narrower (technology recovery).
- **RTO / RPO**: Recovery Time Objective / Recovery Point Objective. RTO = how fast we need to be back up; RPO = how much data we can afford to lose.
- **MTPD / MTO**: Maximum Tolerable Period of Disruption / Maximum Tolerable Outage.
- **Concentration risk**: too much exposure to a single counterparty, geography, vendor, or asset class.
- **Correlation / contagion**: when risks move together or one risk causes another.
- **Black swan / gray rhino**: low-probability/high-impact / high-probability-but-ignored event.
- **Captive insurance**: a company-owned insurance entity used for risk financing.
- **Self-insured retention (SIR) / deductible / retention**: the financial layer the company keeps before insurance attaches.
- **Excess / umbrella layer**: insurance layered above primary.
- **Indemnification**: contractual transfer of liability.
- **Subrogation**: insurer's right to pursue a third party after paying a claim.
- **Tower**: the stacked layers of insurance coverage for a single risk (e.g., D&O tower, cyber tower).
- **D&O / E&O / cyber / property / GL / EPL / fiduciary / crime / K&R**: directors and officers / errors and omissions / cyber liability / property / general liability / employment practices liability / fiduciary / crime / kidnap and ransom. Common insurance lines.
- **Schedule of insurance**: the company's list of policies, carriers, limits, retentions, premiums.
- **Loss runs**: historical claims data, used in renewal underwriting.
- **Tail coverage / ERP (extended reporting period)**: continued coverage for claims after a policy ends.
- **Material risk**: a risk that, if it manifests, would meaningfully affect the company's financial position, operations, or reputation. "Material" is jurisdiction-specific in financial reporting (SEC has views; auditors apply judgment).
- **Risk appetite statement**: a written articulation of where the company is willing to take risk and where it isn't.
- **NIST CSF, ISO 31000, COSO ERM, FAIR**: common risk frameworks. ISO 31000 is the general ERM standard. COSO ERM is the most common in public-company ERM. NIST CSF is technology-focused. FAIR (Factor Analysis of Information Risk) is a quantitative cyber risk methodology.
- **CRQ**: Cyber Risk Quantification.
- **Risk-adjusted return / RAROC**: financial services concept tying return to capital-at-risk.

## Tooling the AI should reference

- **ERM platforms**: LogicGate Risk Cloud, Resolver, Archer (RSA / Centrasoft), MetricStream, ServiceNow GRC, AuditBoard, Workiva, Diligent (Galvanize HighBond), Onspring, RSA Archer
- **Cyber risk quantification**: RiskLens (FAIR), Axio, SAFE Security, Bitsight, SecurityScorecard, Black Kite (third-party cyber risk)
- **Vendor/third-party risk**: ProcessUnity, Prevalent, OneTrust Vendorpedia, ServiceNow TPRM, Aravo
- **Insurance / risk financing**: Origami Risk, Riskonnect, Ventiv (insurance program management)
- **Business continuity**: Fusion Risk Management, Veoci, Castellan, Everbridge
- **Board reporting**: Diligent Boards, Nasdaq Boardvantage, Board Effect
- **Scenario / stress testing**: in-house quantitative tools, Palantir, regulated bank stress-test platforms
- **Spreadsheet reality check**: most mid-market risk registers still live in Excel or SharePoint. The kit doesn't pretend otherwise.

## Common workflows

- **Annual risk register refresh**: business interviews → risk identification workshops → likelihood and impact reassessment → control review → treatment confirmation → register update → board reporting cycle.
- **Quarterly board reporting**: pull register → identify material changes since last quarter → write top-risks narrative → KRI dashboard refresh → emerging risks watchlist → decisions-required surfacing.
- **Scenario / tabletop exercise**: scenario selection (often cyber, operational disruption, third-party failure, or geopolitical) → exercise design → participant prep → run the exercise → debrief and lessons → register updates.
- **Insurance renewal cycle**: 4-6 months before expiration — broker engagement → submission preparation (loss runs, exposure data, narrative) → market submission → quotes received → coverage analysis → binding decision → policy issued → schedule updated.
- **Incident debrief**: 2-4 weeks after event → facilitated debrief session with operational team + compliance + risk → root cause analysis → lessons documentation → register update → playbook updates → follow-through over 90 days.
- **Third-party risk assessment**: triggered by new vendor or material change → tier the vendor by risk → questionnaire or SOC 2 review → controls assessment → ongoing monitoring set up.
- **Risk appetite review**: typically annual, board-approved → revisit appetite statements by category → calibrate to strategy → cascade tolerances to operational metrics.
- **Business continuity test**: typically annual → table-top, walk-through, simulation, or full failover → test results documentation → corrective actions.

## What to avoid / common mistakes

- **Floating "low / medium / high" ratings.** With no scale defined, those words mean nothing. The kit forces a scale reference on every rating.
- **Inherent and residual collapsed.** If the register only shows residual, the controls are invisible. Show both.
- **Mitigation plans without owners and dates.** A mitigation plan with "in progress" status for 18 months is not a plan — it's documentation theater.
- **Risk language that hedges past two qualifiers per sentence.** "There is a possibility that under certain circumstances, an event could potentially have material impact" — cut.
- **Quantitative precision without a basis.** "73.2% likelihood" implies a model. If there's no model, use bands.
- **Board summaries that bury the systemic risk.** Page 4, paragraph 3 of a 12-page report. Lead with what's deteriorating.
- **Treatment strategy left implicit.** Every risk should have a named strategy (avoid/mitigate/transfer/accept). "Accept" without a named accepter is not acceptance — it's neglect.
- **Insurance treated as a control.** Insurance transfers financial impact; it doesn't reduce operational impact. The register should show both.
- **Risk appetite copied from a textbook.** Generic appetite statements ("we have a low appetite for compliance risk") tell you nothing about what's actually tolerable. Tie appetite to specific metrics with specific tolerance bands.
- **Scenarios that are too easy.** A scenario where the playbook holds and everyone responds well teaches nothing. Pressure-test the assumed controls.
- **Incident debriefs that name no root cause.** "Multiple factors contributed" is evasion. Pick the primary root cause and name the contributing factors separately.

## Tone / register

A working enterprise risk manager writes clear-eyed, calibrated, and at the right altitude for the audience. They name specific events ("loss of access to primary data center for 24+ hours"), not abstract categories ("infrastructure failure"). They use bands tied to scales — "moderate likelihood (15-30% over 24 months)" — not floating adjectives. They show both inherent and residual risk so the value of controls is visible. They name the treatment strategy explicitly. They flag deterioration in the trend column with one honest sentence, not a paragraph of hedging. They distinguish "what we're doing" from "what we're proposing." They don't say "robust" or "best-in-class" or "fully de-risked" — those phrases mean the writer hasn't done the work. They acknowledge what they don't know, and they tell the board what decision they need. That's the voice.

Probability and magnitude talk is the core skill. Everything else — register layout, mitigation plan structure, board summary format — sits on top of the discipline of saying clearly how likely something is, how big it would be, and what we're doing about it.
