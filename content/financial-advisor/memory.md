# Memory — Financial Advisor Pack

## Domain context

A working financial advisor runs 75-300 client households with $50M-$500M+ in assets under management. The rhythm is calendar-driven: quarterly billing, semi-annual or annual reviews, year-end tax-loss harvesting windows, RMD deadlines, Q4 Roth-conversion conversations, January performance reports. Beneath the calendar is a constant stream of life events — a client's parent dies, a daughter gets divorced, a business owner gets an unsolicited offer, a hospital bill triggers a long-term-care conversation. Each of those is a planning moment, and each is a documentation moment.

Most advisors live inside a tech stack: planning software (eMoney, MoneyGuidePro, RightCapital), a CRM (Salesforce Financial Services Cloud, Redtail, Wealthbox, Practifi), a portfolio management / performance / billing platform (Orion, Tamarac, Black Diamond, Addepar), and a custodian (Schwab — now post-TDA integration, Fidelity, Pershing for IBD, LPL for hybrid). The planning platform tells the story; the CRM holds the relationship; the portfolio system reports the numbers; the custodian holds the assets. Most advisors spend a substantial fraction of their working time writing — review prep, client emails, market notes, meeting notes for the file.

Most US advisors are CFP and either Series 7 + 66 (or 65) on the dually-registered side, or Series 65 only on the fee-only side. Many add CFA, CLU, ChFC, ChSNC, or RICP credentials for specialization. Canadian advisors come through the CIRO path (formerly IIROC / MFDA) — CIM, PFP, CFP (Canada), or CPA/RFP combinations.

Two regulatory frames matter:

1. **Fiduciary standard (RIA side, US)** — duty of loyalty + duty of care to the client. Means: act in the client's best interest, disclose conflicts, eliminate or mitigate where possible, charge reasonable fees. Documentation matters because that's what an SEC exam or state audit reviews.

2. **Reg BI / Best Interest (B/D side, US)** — broker-dealer standard from June 2020. Requires: disclosure obligation, care obligation, conflict-of-interest obligation, compliance obligation. Recommendations must be in the customer's best interest at the time of the recommendation. Reg BI is what the dually-registered advisor lives under when not on the advisory side.

3. **Client Focused Reforms (Canada)** — analogous to Reg BI. KYC, KYP, conflict disclosure, suitability now framed as "best interest of the client" considerations.

Compliance review of client-facing material is the everyday backdrop. Marketing rules under the SEC's amended Marketing Rule (Nov 2022) tightened what can be said about performance, testimonials, hypotheticals. FINRA reviews B/D communications. State regulators review state-registered RIA communications. Every market note, every newsletter, every review summary that goes to a client is, in principle, subject to review.

Success looks like: clients stay through market cycles, life events get caught early, the plan gets updated when life changes, the next generation gets onboarded before the wealth transfers, the AUM grows through compounding and referral. Failure looks like: a client leaves over a market-timing call the advisor made that didn't pan out, a tax mistake the CPA caught but blamed on the advisor, an SEC deficiency letter over Marketing Rule violations in a newsletter, a complaint to FINRA over a recommendation the advisor didn't document properly.

The thing AI is most useful for is the writing in between sessions — review prep, market notes, retirement-plan discussion frameworks, follow-up notes for the file. The thing AI is most dangerous for is the recommendation language. Specific buy/sell/hold, market predictions, tax strategy for a real person — those are the things that get advisors in regulatory trouble when AI writes them. The kit is built to refuse those.

## Vocabulary the AI should know

- **RIA** — Registered Investment Adviser. Fiduciary duty. State-registered (under $110M AUM threshold typically) or SEC-registered (over $110M, with exceptions)
- **B/D** — Broker-Dealer. Reg BI / best-interest standard. FINRA-regulated
- **IBD** — Independent Broker-Dealer (LPL, Cetera, Cambridge, Commonwealth)
- **Hybrid / Dually-Registered** — same advisor wears both hats; fiduciary on advisory accounts, Reg BI on brokerage accounts
- **Wirehouse** — Merrill, Morgan Stanley, UBS, Wells Fargo Advisors. Captive advisors typically
- **Reg BI / Form CRS** — Regulation Best Interest; Customer / Client Relationship Summary disclosure document
- **ADV Part 2A / 2B** — RIA's brochure (firm-level) and brochure supplement (advisor-level). Annual update / amendment
- **CFP** — Certified Financial Planner. Board-administered, fiduciary obligation under CFP Board standards
- **CFA** — Chartered Financial Analyst. Investment-management focused. Three-level exam
- **ChFC / CLU** — Chartered Financial Consultant / Chartered Life Underwriter (American College). Insurance / planning depth
- **EA** — Enrolled Agent. IRS-credentialed tax professional. Can represent clients before the IRS
- **CPA** — Certified Public Accountant. State-licensed. Often the partner for tax-specific work
- **IAR** — Investment Adviser Representative. The licensed individual operating under an RIA
- **Series 7 / 65 / 66** — FINRA / NASAA exams. 7 = general securities (B/D side); 65 = RIA only; 66 = combined 63 + 65
- **AUM / AUA** — Assets Under Management / Advisement
- **CIO** — Chief Investment Officer (at the firm or a model provider)
- **TAMP** — Turnkey Asset Management Platform (Envestnet, Orion Portfolio Solutions, AssetMark, SEI)
- **Model portfolio** — pre-built allocation the advisor implements across many clients with risk-banded variants
- **IPS** — Investment Policy Statement. Documents target allocation, ranges, rebalance triggers, restrictions
- **Drift / drift band** — distance current allocation has moved from target. IPS sets the rebalance threshold
- **Rebalance** — bring allocation back to target. Trigger by calendar (annually) or threshold (e.g., 5% drift band) or tax-loss-harvest opportunity
- **Tax-loss harvest (TLH)** — realize losses to offset gains and up to $3K of ordinary income per year (US). Wash-sale rule (30-day window) matters
- **NUA** — Net Unrealized Appreciation. Tax strategy on employer stock held in a 401(k)
- **Roth conversion** — convert traditional IRA / 401(k) assets to Roth. Taxable in year of conversion. Bracket-fill is a planning concept
- **Backdoor Roth** — non-deductible IRA contribution then conversion. Pro-rata rule applies if other pre-tax IRA balances exist
- **Mega backdoor Roth** — after-tax 401(k) contribution then in-plan Roth conversion. Plan must allow
- **RMD** — Required Minimum Distribution. Age 73 currently, moving to 75 (SECURE 2.0). First-RMD-deferral trap (two RMDs in one year)
- **QCD** — Qualified Charitable Distribution. Up to annual limit from IRA direct to qualified charity, counts toward RMD without taxable income
- **SECURE Act / SECURE 2.0** — major retirement legislation. Changed inherited IRA rules (10-year rule for most non-spouse beneficiaries), RMD ages, 529-to-Roth rollover, employer match on student loans
- **Social Security FRA** — Full Retirement Age. 66-67 for most current clients depending on birth year
- **WEP / GPO** — Windfall Elimination Provision / Government Pension Offset. Affects clients with non-covered pension service
- **IRMAA** — Income-Related Monthly Adjustment Amount. Medicare premium tiers. Big cliff effects on Roth conversion and capital-gains realization
- **Bucket strategy** — short-term cash, medium-term bonds, long-term equity buckets in retirement income planning
- **Bond ladder** — series of bonds maturing on a schedule to fund near-term income
- **Guyton-Klinger guardrails** — dynamic withdrawal rule set in retirement
- **4% rule** — Bengen 1994. Initial-withdrawal-rate heuristic. Has caveats; not a personal recommendation
- **Sequence-of-returns risk** — the path of returns in early retirement matters more than the average return
- **Funded ratio** — assets / liabilities in a household balance sheet view. Planning software shows direction over time
- **Monte Carlo simulation** — probabilistic plan stress test in planning software. "Probability of plan success" — a guide, not a guarantee
- **Asset location** — what holdings sit in which account types for tax efficiency (bonds in tax-deferred, equities in taxable, REITs in Roth, etc.)
- **Asset allocation** — the split between asset classes (equity / fixed income / cash / alts)
- **Risk capacity vs risk tolerance** — capacity is the financial ability to absorb loss; tolerance is the psychological willingness
- **Glide path** — how allocation shifts over time (typically more conservative as retirement approaches)
- **Target-date fund** — single-fund glide path solution (Vanguard, Fidelity, Schwab, BlackRock LifePath)
- **ESG / SRI** — Environmental, Social, Governance / Socially Responsible Investing. Client preference, planning input
- **Estate plan** — wills, POAs (financial + healthcare), trusts, beneficiary designations. Advisor coordinates with the estate attorney
- **Beneficiary designation** — overrides the will. Often out of date; review every life event
- **Stretch IRA** — pre-SECURE strategy of stretching inherited IRA distributions over the beneficiary's lifetime. Largely eliminated by 10-year rule
- **Step-up in basis** — cost basis of inherited assets resets to FMV at death (in most US cases — coordinate with the CPA)
- **529 plan** — education savings, state-specific tax treatment, SECURE 2.0 added Roth rollover after 15 years (with caveats)
- **HSA** — Health Savings Account. Triple tax advantage. Investable past minimum balance threshold
- **Donor-Advised Fund (DAF)** — charitable giving vehicle. Bunching strategy for itemized deduction. Coordinate with CPA on contribution timing
- **CRT / CRUT** — Charitable Remainder Trust. Estate / income planning vehicle. Estate attorney territory
- **Trust types** — Revocable, Irrevocable, SLAT, ILIT, GRAT — estate attorney's domain; advisor coordinates funding

## Common workflows

- **Quarterly billing cycle**: advisor confirms AUM as of quarter-end, billing runs from custodian or portfolio platform, statements go out, advisor's billable revenue posts
- **Annual review prep**: advisor pulls planning report from eMoney/MoneyGuide/RightCapital, performance from Orion/Tamarac/Black Diamond, CRM notes from Redtail/Wealthbox, drafts the agenda, confirms life-event check-in items, drafts post-meeting action items
- **Mid-year market checkpoint**: optional 30-min call, light planning update, market context
- **Year-end planning**: TLH window late Oct - mid Dec, Roth conversion analysis Nov-Dec for full-year tax picture, charitable giving timing, RMD confirmation (last chance Dec 31)
- **Tax season coordination**: late Jan onward — 1099 reconciliation, basis questions to custodian, hand-off to client's CPA
- **Triggered reviews**: life event (job change, marriage, divorce, birth, death, inheritance, business sale, retirement, health diagnosis), market event, plan-driven trigger (allocation drift, savings rate shift)
- **Onboarding new client**: data gathering, plan build, IPS draft, account opening at custodian, ACAT transfers, initial allocation, welcome packet
- **Offboarding / transition**: ACAT out, final billing, file retention per regulatory schedule
- **Sponsor / 401(k) work** (for advisors with plan business): fiduciary services, investment policy, participant education — different reg frame (ERISA)
- **Market-comms cadence**: weekly note (Mon AM), monthly summary (first Friday), quarterly letter (within 30 days of quarter-end), ad hoc note on major events (Fed move, market dislocation). Every piece subject to Marketing Rule and firm compliance review

## What to avoid / common mistakes

- **Predicting markets in client comms**. "We expect rates to fall" or "small caps will outperform" is a Marketing Rule and a record problem. Future-tense market language ages badly and creates liability. Reframe as "what happened" and "what's still uncertain"
- **Recommending specific securities in writing without proper documentation of basis and best-interest analysis**. A buy / sell / hold in writing without the work behind it is what an exam finds
- **Drafting tax strategy for a specific person**. "You should do a $40K Roth conversion this year" is a tax recommendation. The CPA or EA has the full tax picture. Advisor frames the concept; CPA models the numbers; client decides
- **Carrier / fund-family / custodian comparisons as "better"**. Comparative claims trigger Marketing Rule. Use objective comparisons, disclose conflicts, never claim "the best"
- **Performance promises**. "Expect 7%" is a promise. Expected-return assumptions in planning are disclosed-as-assumptions, not promises
- **Benchmarks-as-proof-of-skill**. "We beat the S&P 3 of 5 years" is a cherry-picked period comparison. Marketing Rule has specific requirements for performance presentation
- **Hidden conflicts in product recommendation**. If there's a revenue share or proprietary product, the conflict is disclosed, period
- **Real client names or PII in any AI prompt**. The client agreement and the firm's data policy will dictate, but defaulting to initials or made-up names is the safe pattern
- **Skipping the disclaimer on client-facing material**. The boilerplate is boring; it's also non-negotiable
- **Confusing fiduciary and best-interest standards**. Different obligations, different documentation. Advisor needs to know which hat they're wearing on each account / recommendation
- **Promising outcomes**. "By age 65 you'll have $2M" — the plan shows a probability, not a guarantee

## Tone / register

A working senior advisor sounds direct, careful with language, and slightly dry. They use plain English ("rates rose 50 bps last quarter") rather than industry-speak ("the fixed income complex repriced on the back of macro data"). They acknowledge uncertainty without performing it. They never say "we expect" — they say "the range of plausible outcomes includes." They talk about "things worth thinking about" rather than "what to do." They are deeply allergic to predicting markets in writing. They remember which clients have CPAs and which need a referral. They write meeting notes that hold up to a regulator's read. They never end a client comm with "we'll keep you posted on opportunities" — they end with "reach out if something has changed for you." That's the voice.
