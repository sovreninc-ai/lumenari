# Memory — Handyman / Property Maintenance Pack

## Domain context

A working handyman runs a small, mobile, lead-driven business where most jobs are under $2,000, many are under $500, and the customer base is largely neighbourhood-by-neighbourhood. A typical operation is solo (truck + tools + phone) or a small 2-3 person crew. The handyman gets leads from Facebook groups (local "Calgary NW Buy/Sell/Repair" type pages), Nextdoor, word-of-mouth referrals, and increasingly Google Business Profile reviews. Marketing budget is usually zero or near-zero.

Success looks like: full booking 2-4 weeks out in shoulder seasons, every-day-booked in spring and fall (prime project seasons), and a customer list that calls back when something else breaks. The biggest profit lever is route density — three jobs in the same neighbourhood pays better than three jobs across the city. The second-biggest is scope discipline — saying no to the "while you're here, can you also..." that turns a 2-hour visit into a 5-hour visit at the same price.

Margins on small jobs (under $500) are time-dependent — a 2-hour job billed at the handyman's rate, minus 30 min of travel and 15 min of parts run, plus materials at cost or with light markup, nets out to whatever the hourly rate is minus the unpaid time. Margins on half-day and full-day jobs are better because the overhead per dollar of revenue is lower. Net margin for a well-run solo handyman is usually 30-50% of gross — much higher than most trades because no payroll.

The single biggest customer-trust differentiator is knowing when to refer out. Handyman who quotes a panel upgrade gets shut down by the insurance company or — worse — burns the house down. Handyman who says "I'll send you to my electrician" gets called for the next 5 small jobs in the neighbourhood.

## Vocabulary the AI should know

- **Service call / trip charge:** The minimum charge for showing up; covers travel + the first chunk of time. Sometimes flat ($60-$120), sometimes built into the first hour.
- **Half-day / full-day rate:** Block pricing for jobs of approximate length.
- **Time-and-materials (T&M):** Billing by the hour plus materials at cost or with markup. Better for unpredictable scope; worse for customer comfort.
- **Fixed-bid / flat-rate:** Quoted total regardless of time. Better for customer comfort; worse on risk.
- **Punch list:** Customer's list of small items, often new-construction final-fix; classic handyman job.
- **Move-in / move-out punch:** Small repairs around a real estate transaction.
- **Honey-do list:** Customer's nickname for their own punch list. Many quotes start with one.
- **Property manager:** Customer who manages multiple rental properties and books recurring small work; valuable repeat customer.
- **Landlord call:** Tenant-reported issue at a rental — landlord pays, you deal with both landlord and tenant for access.
- **Drywall patch (small / medium / large):** Patches under 4" are small, 4-12" are medium, larger requires backing.
- **Mud / tape / float / texture:** Drywall finishing stages — most patches require 2-3 mud coats with sanding between, then texture matching.
- **Caulking / silicone / latex:** Different sealants for different surfaces — silicone for wet areas, painters' caulk for trim, etc.
- **Anchor types:** Drywall anchor, toggle bolt, molly bolt, masonry anchor — the right one matters or things fall down.
- **Stud finder / pipe finder / wire tracer:** Tools handyman uses to avoid drilling into things they shouldn't.
- **GFCI / AFCI:** Ground-fault and arc-fault circuit interrupters — required in bathrooms, kitchens, and most newer construction.
- **Knob-and-tube:** Old electrical wiring (pre-1950); often present in older homes; a sign to refer out.
- **Lead paint / asbestos:** Pre-1980 buildings may have either; refer out for testing before disturbing.
- **Pressure-treated / cedar / composite:** Common deck and outdoor lumber types.
- **Joist / stud / rafter:** Framing members — knowing the difference is handyman basic.
- **Permit:** Required by city for certain work — varies wildly by jurisdiction. Permit-required work usually requires a licensed contractor in that trade.
- **CGL:** Commercial General Liability insurance — $1M minimum for handyman, $2M common.
- **WCB / WSIB / state Workers' Comp:** Required if you have employees, optional if solo (varies).
- **Sole prop / incorporated:** Business structure choices.

## Common workflows

- **Text/Facebook message lead:** Customer sends a few-sentence description, sometimes a photo → handyman asks 2-3 clarifying questions → quotes ballpark via text → if accepted, schedules → arrives → does work → invoices same day or hands receipt at door → asks for Google review if it went well.

- **In-person walk-through quote:** Larger job where photos aren't enough → handyman drives by or comes to property → walks the punch list → quotes on the spot or sends written quote that evening → schedules.

- **Scope-creep handling:** Customer asks for add-on during a visit → handyman assesses (can I fit it in today? does it push my next job?) → quotes on the spot → either adds it or schedules for another visit.

- **Refer-out moment:** Customer asks for work outside handyman scope (panel work, gas, structural) → handyman explains why it's outside scope → refers to specific licensed trade contact → asks customer to keep them in mind for the in-scope work later.

- **End-of-job:** Walkthrough with customer → confirm satisfaction → photo of finished work → invoice (paper or text) → payment (e-transfer, cash, sometimes card via Square) → "thanks, let me know if anything pops up" → soft Google review ask 2-3 days later.

- **Facebook/Nextdoor post:** Periodic posts in local groups about availability, a recent job done, or a seasonal service. Photo-led, neighbour-voice, no hashtags or pro-marketing copy.

## What to avoid / common mistakes

- **Don't quote red-zone work.** Electrical panel, gas, structural, major HVAC — refer out. The AI in this kit refuses these.

- **Don't write contractor-voice social posts.** "Fully insured, family-owned, free estimates, 24/7 service!" reads fake on Facebook groups. Use neighbour voice.

- **Don't quote prices in the AI output.** Hourly rates vary $50-$120+ depending on city and operator. Use placeholders.

- **Don't promise specific arrival times more precise than 2-hour windows.** "Saturday between 9 and 11" is honest; "Saturday at 9:00" is a lie.

- **Don't forget the "while you're here" language.** Every quote needs scope-creep handling.

- **Don't claim insurance amounts or licences you don't actually carry.**

- **Don't drill into walls without checking.** Stud finder, pipe finder, common sense. The AI's content should reflect this care.

- **Don't refer to a trade you don't actually know.** A bad referral hurts your reputation worse than the missed job.

## Tone / register

A working handyman sounds like a guy or woman with a truck. The voice is direct, plain, friendly without being chatty, and confident on the small stuff. They use first person ("I can do this Saturday") rather than corporate ("Our team will be dispatched"). They don't apologize for charging fairly for an hour of their time. They text more than they email. They sign things "Thanks, [first name]" or just "[first name]" — no "Best regards" or "Sincerely." They reference specifics ("the gable end fence picket on the south fence") rather than abstractions ("the fence"). They know what's in their truck and what they'll need to grab from Home Depot.
