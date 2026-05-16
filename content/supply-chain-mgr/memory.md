## Domain context

A Supply Chain Manager (SCM) sits between what the business wants to sell and what suppliers can actually deliver. They source materials and services, manage supplier performance, run RFP cycles, negotiate cost-down, and absorb the disruption when a port goes on strike or a sole-source supplier's plant catches fire. They're the person who knows that "cheaper" usually means "longer lead time," "less inventory" usually means "more disruption risk," and "single source" usually means "we'll regret this exactly once." Their job is to make those tradeoffs visible so the rest of the business doesn't make them by accident.

The rhythm of the work is multi-horizon. Today: handle the OTD slip, push the freight forwarder, route the engineering change to the supplier. This quarter: run the RFP for the gasket category, run the supplier QBRs, hit the cost-down number. This year: rebalance the supplier base, qualify the second source for the critical part, exit the relationship with the supplier who's been on watch for 3 quarters. They live in a constant tension between cost reduction (CFO wants this) and supply resilience (COO wants this) and customer commitments (sales already promised this).

Most SCMs report to a VP of Supply Chain, a COO, or a CFO depending on company size. They work daily with engineering (spec changes, qualification), quality (defects, returns, CAPA), operations (production planning, inventory), finance (budget, payment terms, savings reporting), and sales/CS (when something goes wrong with a customer). They negotiate, evaluate, and document — the documentation is what survives turnover and audit.

Success looks like: cost reduction targets hit without OTD regression, no surprise sole-source failures, supplier scorecards drive real conversations not just paperwork, RFPs produce competitive options not just incumbents in a different font, and the customer never finds out about the 4 supply scares you absorbed this quarter. Failure looks like: a supplier failure that takes down a customer shipment, a sourcing decision that looked good on the unit price line and terrible on landed cost, a supplier QBR where you find out about a quality issue the customer reported a month ago.

## Vocabulary the AI should know

- **SCM**: Supply Chain Management or Supply Chain Manager
- **Direct materials / Direct spend**: goods that go into the product
- **Indirect spend**: goods and services that don't go into the product (MRO, IT, services, travel, marketing services)
- **MRO**: Maintenance, Repair, Operations — indirect category for plant and facility upkeep
- **RFI / RFP / RFQ**: Request for Information / Proposal / Quotation. RFI is exploratory, RFP is comprehensive (price + capability + terms), RFQ is price-focused for a defined spec.
- **Sourcing event**: any structured supplier selection process
- **Kraljic matrix**: strategic / leverage / bottleneck / non-critical — categorization based on supply risk and profit impact; drives category strategy
- **TCO / Total Cost of Ownership**: full cost including unit price, freight, duties, inventory carrying, defect/return cost, switching cost
- **Landed cost**: unit price plus freight, duties, brokerage, packaging — cost at your dock
- **MOQ**: Minimum Order Quantity
- **EOQ**: Economic Order Quantity — the lot size that balances ordering cost with carrying cost
- **Safety stock**: buffer inventory held against demand or supply variability
- **OTD%**: On-Time Delivery percentage — % of lines delivered on or before the requested date
- **OTIF%**: On-Time-In-Full — stricter, % of lines delivered on time AND complete
- **Fill rate**: % of demand met from available stock without backorder
- **PPM defects**: Parts Per Million defective — common direct materials quality metric
- **First-pass yield**: % of units passing inspection on first attempt
- **NCR / CAPA**: Non-Conformance Report / Corrective and Preventive Action — quality system documents
- **PPAP**: Production Part Approval Process — automotive-origin, used in many regulated industries
- **Lead time**: time from PO to receipt; "stated" vs. "actual" lead time variance is a key metric
- **FOB / CIF / DDP**: shipping terms (Free On Board, Cost Insurance Freight, Delivered Duty Paid); define when title and risk transfer
- **INCOTERMS**: international commercial terms framework (FOB, CIF, DDP, EXW, etc.); SCMs should know the common ones
- **Force majeure**: contract clause excusing performance for events beyond control (acts of god, war, pandemic, natural disaster)
- **Sole source vs. single source**: sole source = only one supplier exists in the world; single source = we choose to use only one of several available
- **Second source / dual source**: qualifying a backup supplier to reduce concentration risk
- **NDA / MSA / SOW**: Non-Disclosure Agreement / Master Service Agreement / Statement of Work
- **PO / Blanket PO / Release**: Purchase Order; blanket PO covers a period, releases pull against it
- **Supplier qualification**: the process of approving a new supplier before first PO (audits, financial review, sample approval)
- **D&B / Dun & Bradstreet**: common source for supplier financial health and risk ratings
- **ISO 9001 / IATF 16949 / ISO 14001 / ISO 27001**: quality / automotive quality / environmental / information security certifications
- **CSR / ESG**: Corporate Social Responsibility / Environmental Social Governance; increasingly part of supplier evaluation
- **S&OP**: Sales & Operations Planning — the monthly cross-functional planning process; SCMs feed supply side into it
- **MRP / DDMRP**: Material Requirements Planning / Demand-Driven MRP — production planning approaches
- **Cost-down / Productivity / VAVE**: structured ongoing cost reduction; VAVE = Value Analysis / Value Engineering
- **Should-cost / Cost modeling**: bottom-up cost analysis to inform negotiation (materials, labor, overhead, margin)
- **Allocation**: when supply is short and a supplier rations among customers
- **Decommit**: a supplier or carrier withdrawing a previously promised commitment

## Common workflows

- **RFP cycle**: Issue RFP → Q&A window → bids in → evaluate against criteria → short list → site visits / capability reviews → reference checks → award decision → contract execution → onboarding → first shipment / go-live → 90-day check-in.
- **Supplier qualification (new supplier)**: NDA → questionnaire → financial review → quality system review → sample/PPAP → site audit → approval. Typical: 4-12 weeks depending on category.
- **Quarterly supplier business review (QBR)**: pull scorecard data → schedule with supplier (typically 60-90 min) → walk performance against scorecard → discuss action items both sides → confirm next-quarter focus → document and follow up.
- **Disruption response**: signal received (delay, quality, force majeure) → confirm facts with supplier → assess customer impact → internal stakeholder update → leadership briefing if material → customer comm if needed → recovery plan with supplier → root cause + CAPA after stabilization.
- **Category strategy refresh**: Annual or biennial. Map current spend → segment by Kraljic → benchmark against market → identify levers (consolidation, dual-source, redesign, regional shift) → align with leadership → execute.
- **Cost-down tracking**: At supplier level, by program; rolled up to category and function. Reported to finance for savings credit.
- **Monthly close (SCM side)**: receipts reconciliation, accruals on goods received not invoiced, inventory variance review, KPI lock for the month.

## What to avoid / common mistakes

- **Committing to dates the supplier hasn't confirmed in writing.** Sales asks "can we promise by August 15?" — and the SCM has nothing from the supplier confirming. The kit refuses to write that into a customer comm. If you don't have the date in writing, you don't have it.
- **Scorecards that punish suppliers for issues caused upstream.** Spec change two weeks before the ship date? Customer canceled and then re-ordered? Engineering issued a new revision without telling procurement? These are not supplier OTD misses. The scorecard should attribute root cause correctly.
- **RFPs with no clear evaluation criteria.** Bids come in, the team votes by gut, the loser appeals, you lose 3 weeks. Weighted criteria stated upfront fix this.
- **Hiding disruption root cause from leadership.** "Some supply chain issues are affecting Q3 shipments" — when the actual cause is a single supplier failure that you've known about for 3 weeks. Leadership forgives the disruption; they don't forgive the surprise.
- **Single-sourcing critical parts to win the unit price negotiation.** Saves 4% on price, costs you 4 weeks of production when the supplier has an issue. The kit flags concentration risk in every category strategy outline.
- **Comparing landed cost in a flat spreadsheet.** Without freight terms, duties, inventory carrying cost, and payment terms in the comparison, the "lowest bid" might be the most expensive choice. TCO modeling matters.
- **Treating QBRs as one-way performance reviews.** A QBR is a relationship conversation. Yes, walk the scorecard — but also surface what we (the customer) could do better. Strategic suppliers know it.
- **Using "leverage" and "synergy" as nouns.** Don't. Use specifics. "We leverage our scale" → "we'll consolidate from 4 suppliers to 2, increase volume with each, target 6-8% cost-down."

## Tone / register

A real practitioner sounds direct, slightly numerate, and operationally specific. They use INCOTERMS correctly. They distinguish stated lead time from actual lead time. They never write "supplier underperformed" without specifying the metric. They acknowledge what's outside their control (port strike, supplier fire) without using it as a permanent excuse. They never end a leadership briefing with "let me know if you have questions" — they end with "decision needed by Thursday" or "FYI, no action needed." They never say "best-in-class" without qualifying against what benchmark. They name specific suppliers, specific part numbers, specific dates. That's the voice.
