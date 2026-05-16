# Memory — Mortgage Broker Pack

## Domain context

A working mortgage broker or loan officer juggles 15-50 active files at once, where "active" means anything from a fresh pre-approval that hasn't found a property yet to a clear-to-close awaiting funding. The rhythm is built around two clocks: the borrower's clock (offer accepted, closing in 21 days, kids enrolled in new school) and the lender's clock (underwriting queue, conditions list, rate-lock window). Most originators are taking new intake calls in the morning, returning underwriting condition follow-ups in the afternoon, and sending rate-update emails and refi outreach on Sunday or Monday.

The work splits roughly into US and Canadian variants that share a lot but diverge on guidelines, products, and disclosure regime. A US originator is NMLS-licensed (and licensed in the states they operate in), running deals through Encompass / Calyx / Surefire / Velocify, pricing through Optimal Blue or a lender-specific engine, dealing with TRID timing on every file. A Canadian broker is FSRA / RECA / BCFSA / AMF licensed (the regulator varies by province), running deals through Velocity (Filogix), BluMortgage, Finmo, Lendesk, or Newton, dealing with the federal stress test, B-20 / B-21 guidelines, and a mix of insured / conventional / B-lender / MIC business.

Most files run through a predictable arc: intake → pre-approval → property accepted (or refi rationale clarified) → live deal submission to lender → conditions cleared one by one → clear-to-close / funder appointment → funding → file closed. The places where deals break are predictable: a borrower's income source is harder to verify than they thought, the appraisal comes in low, employment changes mid-deal, a credit inquiry shows up, the down-payment source isn't seasoned, or — most often — the borrower didn't surface the thing that disqualifies them until week 3.

Success looks like: deals closing on time, repeat business and referrals, a CRM that captures every borrower so renewal outreach 3-5 years out is automatic. Failure looks like: a deal that falls apart at the funder appointment, a TRID violation that delays consummation, a Cost of Borrowing disclosure error that ends up in a regulator complaint, or — worse — a steering accusation when a higher-commission product was placed when a lower-commission product fit.

The thing AI is most useful for is the writing — intake summaries, pre-approval letters, refi outreach, rate-update emails, denial / restructure comms. The thing AI is most dangerous for is the rate-prediction language and the guaranteed-approval tone. Both are compliance traps. The kit refuses both.

## Vocabulary the AI should know — US side

- **NMLS** — Nationwide Multistate Licensing System. Every loan originator has an NMLS number; appears on every disclosure
- **Conventional** — non-government loan. Conforming (within Fannie/Freddie limits) or non-conforming (jumbo)
- **Conforming loan limit** — set by FHFA, varies by county. High-cost areas have higher limits
- **Jumbo** — above conforming. Different underwriting overlays, often portfolio product
- **FHA** — Federal Housing Administration insured. 580 FICO floor (most lenders), 3.5% min down, MIP for life of loan in most cases (or 11 years on certain higher down payments)
- **VA** — Veterans Affairs. 0% down possible, no MI, funding fee instead
- **USDA** — Rural Development. 0% down, geographic eligibility, income caps
- **Non-QM** — Non-Qualified Mortgage. Bank statement, 1099, asset depletion, DSCR for investors — typically higher rates, different overlays
- **DSCR** — Debt Service Coverage Ratio. Investor product, qualifies the property, not the borrower
- **HELOC** — Home Equity Line of Credit. Second lien usually, draw period + repayment period, variable rate
- **DU / DO** — Desktop Underwriter / Desktop Originator (Fannie Mae)
- **LP / LPA** — Loan Prospector / Loan Product Advisor (Freddie Mac)
- **AUS findings** — what the automated underwriting system returned (approve/eligible, refer with caution, etc.)
- **Manual underwriting** — when AUS findings don't approve and a human underwriter takes the file. Different overlays
- **DTI** — Debt-to-Income. Front-end (housing only) and back-end (housing + all other debt). Common conventional ceiling around 45-50% back-end depending on AUS findings and overlays
- **LTV** — Loan-to-Value. Loan amount / property value
- **CLTV** — Combined Loan-to-Value. Includes second liens and HELOCs
- **MI / PMI** — Mortgage Insurance / Private MI. Required typically below 20% down on conventional. Removable at 80% LTV (borrower request) or 78% LTV (automatic termination)
- **MIP** — FHA mortgage insurance premium. Upfront + monthly. Often for life of loan
- **TRID** — TILA-RESPA Integrated Disclosure. LE within 3 business days of application, CD at least 3 business days before consummation. Changes-in-circumstance trigger redisclosure timing
- **LE** — Loan Estimate. Initial disclosure
- **CD** — Closing Disclosure. Final disclosure 3 business days before consummation
- **APR** — Annual Percentage Rate. Effective rate including financed costs. Disclosed on LE and CD
- **Reg Z** — Truth in Lending. Advertising rules, ability-to-repay, QM standards
- **RESPA** — Real Estate Settlement Procedures Act. Anti-kickback rules, GFE / HUD (now LE / CD), Section 8
- **HOEPA / Section 32** — high-cost loan triggers, additional disclosures and restrictions
- **YSP / SRP** — Yield Spread Premium / Service Release Premium. Lender comp paid to broker / company on rate spread. Now structured under post-Dodd-Frank rules
- **Lender comp / borrower-paid comp** — two channels for broker compensation under LO Comp rule
- **Discount points** — 1 point = 1% of loan amount, buys down rate
- **Origination fee** — broker / lender fee charged at origination
- **PITI** — Principal, Interest, Taxes, Insurance. Total monthly housing payment
- **Escrow / impound** — taxes and insurance held by servicer and paid on borrower's behalf
- **PIW / value acceptance** — appraisal waiver via AUS
- **Rate lock** — commitment from lender to honor a rate for a fixed window (15 / 30 / 45 / 60 days commonly)
- **Float-down** — option to relock at lower rate if rates drop after initial lock (often costs)
- **Cash-out refi** — refi for more than payoff, typically capped at 80% LTV on conv
- **Rate-and-term refi** — refi for payoff only (or near-payoff), no cash to borrower
- **Streamline refi** — FHA streamline or VA IRRRL, simplified docs, same loan type
- **Buydown** — temporary (2-1, 3-2-1) or permanent rate reduction, often seller-paid

## Vocabulary the AI should know — Canada side

- **Insured** — high-ratio mortgage, < 20% down, insurer covers lender against default. Insurers: CMHC, Sagen (formerly Genworth Canada), Canada Guaranty
- **Insurable** — between 20-35% down, can be portfolio-insured by the lender (lower rates often)
- **Uninsured / Conventional** — 20%+ down, no insurance. Within this, A-lender vs B-lender vs MIC vs private
- **A-lender** — major banks (RBC, TD, BMO, Scotiabank, CIBC, National), credit unions, monoline lenders (MCAP, First National, Merix, Strive). Federally regulated, B-20 stress test applies
- **B-lender** — alternative lender (Home Trust, Equitable, Manulife One alt programs, Community Trust). Federally regulated typically, B-20 applies. Higher rates, more flexible income / credit
- **MIC** — Mortgage Investment Corporation. Private lender pool. Often short-term, higher rates, asset-based
- **Private lender** — individual or syndicate. Highest rates, most flexible, often short-term bridge
- **B-20 / B-21** — OSFI guidelines for federally-regulated lenders. B-20 governs residential mortgage underwriting; B-21 governs insurance practices
- **Stress test** — federally mandated qualifying rate = greater of contract rate + 2% or the OSFI / Department of Finance floor (verify current floor). Applies to federally-regulated lenders for all uninsured deals; applies to insured deals through insurer rules
- **GDS** — Gross Debt Service. Housing-only debt service ratio. Insurer max typically 39% (some 32% for B-lender / certain products)
- **TDS** — Total Debt Service. All debt service ratio. Insurer max typically 44% (some 40-42% depending on program / score)
- **FSRA** — Financial Services Regulatory Authority of Ontario. Provincial mortgage regulator
- **RECA** — Real Estate Council of Alberta. Provincial regulator (mortgage brokers + agents)
- **BCFSA** — BC Financial Services Authority
- **AMF** — Autorité des marchés financiers (Quebec)
- **FCNB** — Financial and Consumer Services Commission (New Brunswick)
- **FCAA** — Financial and Consumer Affairs Authority of Saskatchewan
- **Brokerage / Agent / Broker** — the regulated entity and the regulated individuals operating under it. Names vary by province
- **Switch** — moving an existing mortgage from one lender to another at renewal without changing the principal balance or amortization beyond limits. Often no stress test for federally-regulated A-to-A switches at renewal (verify current rules — they change)
- **Renewal** — same lender, new term, on whatever rate the lender offers (the renewal letter rate is often not the broker rate — that's why renewal outreach matters)
- **Refinance** — change to principal (cash-out), amortization, or both. Insured refis are largely not available (purchase-only on most insured products)
- **CMHC purchase eligibility** — purchase price < $1M (verify current cap), owner-occupied, < 25-year amortization on insured, etc.
- **Amortization** — 25-year max on insured purchases; up to 30 (or 35 on uninsured BFS / new construction depending on lender) for conventional. Cash-flow benefit of longer am, total interest cost of longer am
- **Term vs amortization** — Canadian fixed terms are typically 1-5 years (sometimes 7-10), amortization is the full payoff period. The mortgage gets renewed at term end
- **IRD** — Interest Rate Differential. The penalty calculation for breaking a fixed mortgage early. Bank IRD calculations are often punitive vs monoline IRD
- **3-month interest penalty** — alternative penalty for breaking a fixed (usually for shorter remaining terms) or for variable. Less punitive than IRD
- **Prepayment privileges** — annual lump-sum % allowed without penalty; payment-increase % allowed
- **Readvanceable mortgage** — combo product where the mortgage portion declines and a HELOC portion increases as principal paid down. Manulife One, Scotia STEP, National HomeEquity, Tangerine HELOC. Useful for Smith Maneuver, investor strategies
- **HBP** — Home Buyers' Plan. Withdraw up to current limit from RRSP for first home, repay over 15 years. Often part of down-payment source story
- **FHSA** — First Home Savings Account. Newer program. Combines RRSP deductibility with TFSA tax-free growth for first home
- **Cost of Borrowing disclosure** — Canadian regulatory disclosure of effective interest rate, total cost, prepayment terms. Provincial regulations + federal where applicable
- **CFR / Client Focused Reforms** — securities-side rule, but spillover language in advisor framing. For mortgage brokers, the equivalent is conflict-of-interest disclosure under FSRA / provincial rules

## Common workflows

- **New intake (purchase)**: Phone call → originator scenario worksheet → soft credit pull with consent → pre-approval letter draft → document request list → CRM entry → 7-day follow-up if no offer in hand
- **Live deal after accepted offer**: Update LOS file → lender submission → conditions list (typically 8-15 items) → condition-clearing emails to borrower → lender review → CTC → funder appointment → funding
- **Refi origination**: Trigger (rate-drop, life event, debt restructure, equity tap) → soft scenario run → call → pre-qualification → submission → underwriting → CTC → funding
- **Renewal (Canada)**: 4-6 months before renewal date, originator runs scenario, calls borrower, decides: switch, refi-and-switch, or stay-with-incumbent. The renewal letter rate from the bank is usually not the best rate — the outreach is the opportunity
- **Rate-update outreach**: Weekly or biweekly note to past clients, prospects, and current pre-approval-without-property pipeline. Non-predictive, illustrative ranges, soft CTA
- **Denial / restructure**: Lender comes back with a no or a conditional that can't be cleared. Originator runs alternate scenario, restructure path, calls borrower with the news and the path forward
- **Year-end / TRID year-end activity (US)**: Pre-Dec 31 closes, CD timing, year-end servicing transfers
- **Stress-test scenario re-run (Canada)**: When OSFI or Department of Finance updates the floor, re-qualify the pre-approval pipeline at the new qualifying rate

## What to avoid / common mistakes

- **Predicting rates**. "Rates will fall before year-end," "lock now before rates rise" — both compliance traps and both age badly. Frame as "what happened" + "where rate sheets are sitting" + "what's still uncertain"
- **Guaranteed-approval language**. Pre-approvals are conditional. The conditions list is the protective clause. AI defaults toward "we are pleased to confirm" — the kit forces the conditions back in
- **Steering toward higher-comp product**. If a lower-comp product fits, that's the placement. Steering is a Reg Z / LO Comp violation in the US and a conduct issue in Canada
- **Fixed-vs-variable directional advice without caveat**. "Variable is the right call" — never without "your situation may differ" and the rationale grounded in the specific borrower's situation
- **Obscured fees / points / comp**. Every fee is disclosed somewhere; the rate-driven origination comp on a broker file should never be hidden from a borrower-readable summary
- **TRID violations**. Advertising rules require certain disclosures when rate or APR is shown. LE timing is hard 3-day; CD is 3-business-day waiting period. Changes-in-circumstance rules govern redisclosure
- **Cost of Borrowing violations (Canada)**. Disclosure of APR, prepayment terms, total cost is required. Provincial rules layer
- **Lender / broker comparison without basis**. "We get better rates than the bank" is provocative and often unsupportable. "Here's where our wholesale rate sheets are sitting today" with disclosed comp is the truthful version
- **Real names, SSN / SIN, account numbers, or addresses in AI prompts**. Initials and made-up scenarios only. Real borrower data goes in the LOS, not the AI chat
- **Promising specific dollar savings on refi**. "You'll save $400/mo" is a marketing claim that varies based on actual rate, points, term, MI. Illustrative ranges only

## Tone / register

A working senior originator sounds direct, plainspoken, and a little weary of rate-prediction questions. They use plain English ("the lender is running 5-7 days on conditions right now") rather than industry-speak ("our turn times are within acceptable tolerances"). They name what's conditional. They acknowledge what's tight in a borrower's file. They never say "rates will fall" — they say "rates moved up about 10 basis points this week." They never say "you'll save $400/mo" — they say "let's run your numbers and see what the math looks like illustratively." They write pre-approval letters that survive a regulator's read. They never end a refi outreach with "this is a limited-time opportunity" — they say "if your situation has changed, this is the conversation." That's the voice.
