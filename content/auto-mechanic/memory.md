# Memory — Auto Mechanic Pack

## Domain context

An independent auto repair shop owner runs a small-margin, trust-driven business in a market with chronic customer skepticism. A typical operation runs 2-10 bays with 2-8 technicians and 1-2 service writers. The owner often turns wrenches in the morning and writes service tickets in the afternoon. General repair shops handle everything from oil changes through engine rebuilds; specialty shops focus on one area (transmissions, diesel, European, etc.).

Success looks like: average repair order over $400, customer retention past 3 visits, technician hours billed at 90%+ of clock hours, comebacks (rework on a recent job) under 2%. The biggest profit lever isn't labour rate — it's retention. A customer who comes back twice a year for 10 years is worth 30x a one-time customer, even at the same average ticket.

The trust deficit is the industry's defining feature. Every customer walks in suspicious because dealerships and chain shops have trained them to expect upsell. The independent shop's job is to break that suspicion in the first interaction. The shops that survive 20 years do this with two things: (1) the way the estimate is explained, and (2) the willingness to say "you don't need this — here's what you do need." Shops that try to maximize every ticket churn customers and survive on a steady stream of new ones — expensive marketing, thin margins.

Margins: gross profit on parts is typically 30-50%; labour is the higher-margin line, often 60-70% gross. Net margins after rent, insurance, equipment, payroll, and parts inventory run 10-20% for a well-run shop. Below 10% is a sign of pricing problems or a comeback problem.

## Vocabulary the AI should know

- **Diagnostic / diag fee:** Charge for the time to figure out what's wrong, separate from the repair itself. Usually $80-$180 in CA/US.
- **Comeback:** A customer who returns because the repair didn't fully fix it; lost margin.
- **ROI (in trade speak):** Repair Order — the ticket itself, not return on investment.
- **R&R:** Remove and Replace — labour notation.
- **OE / OEM:** Original Equipment Manufacturer parts; usually more expensive than aftermarket.
- **Aftermarket:** Third-party parts; quality varies from excellent to garbage.
- **CV joint / CV axle:** Constant velocity joint — front-wheel-drive component that lets the wheel turn while also putting power down. Clicks on turns when worn.
- **Wheel bearing:** Allows wheel to spin freely; growls or hums when worn, often worse at higher speeds.
- **Ball joint / tie rod:** Steering and suspension components; play in them means alignment goes off and safety degrades.
- **Strut / shock:** Damping components; worn means bouncy ride and longer stopping distance.
- **Brake pads / rotors / calipers:** Pad is the friction material, rotor is the disc, caliper is the clamp.
- **Brake fluid flush:** Maintenance — fluid absorbs moisture, becomes corrosive over time.
- **Coolant flush / radiator service:** Maintenance — coolant degrades, especially in extreme cold or heat.
- **Transmission service:** Fluid change; service interval varies wildly by manufacturer.
- **Oil consumption:** Some engines burn oil between changes — flag if customer is consistently low.
- **Valve cover gasket / oil pan gasket / rear main:** Common leak points; severity ranges from "drip" to "puddle."
- **Catalytic converter / cat:** Emissions component; replacement is expensive, theft is common.
- **O2 sensor:** Emissions sensor; common trouble code.
- **Check engine / CEL / MIL:** Customer warning light — could be anything from gas cap to engine failure.
- **OBD / OBD-II:** On-board diagnostics — the port used to pull codes.
- **TSB:** Technical Service Bulletin — manufacturer's known-issue document.
- **Recall:** Manufacturer-funded repair; check before quoting work that might be covered.
- **Pre-purchase inspection (PPI):** Customer asks you to inspect a car they're considering buying.
- **MVI / safety inspection:** Provincial/state inspection (varies by jurisdiction — Alberta has none for personal vehicles, BC has them for newly imported, several US states have annual).
- **Out-of-province inspection:** Required when registering a vehicle from another province in Canada.
- **AMVIC / MVDA:** Alberta Motor Vehicle Industry Council / Motor Vehicle Dealers Act — licensing bodies in CA jurisdictions.
- **Goodwill repair:** No-charge or reduced-charge work the shop eats for customer retention.

## Common workflows

- **New customer inquiry:** Customer calls or walks in with a complaint ("car makes a noise on turns") → service writer takes basic info (year/make/model, complaint, when it happens) → schedules diagnostic appointment → customer drops off → tech diagnoses → service writer builds estimate with explanation → customer approves or declines → work done → customer picks up.

- **Estimate approval flow:** Tech writes up findings → service writer translates to plain English → call/text customer with estimate → customer approves or declines → if declined, declined-repair form signed → if approved, work scheduled.

- **Found-while-in-there scope change:** Doing brake job, find leaking shock → call customer immediately, don't just add it → explain finding + urgency + cost → get verbal or text approval before proceeding → document in the RO.

- **Declined repair:** Customer says no → declined-repair form printed with specifics + urgency tier → customer signs → form filed → customer's name flagged in shop system to ask again next visit.

- **Follow-up after service:** Day-of pickup recap → day 7 text → day 30 reminder of deferred items → 6-month service reminder.

- **Comeback handling:** Customer returns with same symptom → shop inspects no-charge → if same issue, fix no-charge or partial-charge (shop policy) → if related-but-different issue, explain clearly → customer should never pay twice for the same problem.

## What to avoid / common mistakes

- **Don't write scare-tactic copy.** "Your car could fail at any moment!" makes the shop sound predatory. Clinical-but-clear is the right register.

- **Don't quote prices in the AI output.** Labour rate and parts markup vary by shop and region. Use placeholders.

- **Don't promise diagnostic certainty without diag work being done.** AI can't diagnose a car from a customer's complaint. It can pattern-match to common causes — "clicking on turns is often CV joints, but could be wheel bearings or worn strut mounts" — and recommend the diagnostic appointment.

- **Don't skip the urgency tier on recommendations.** Mixing safety items with maintenance items is the #1 reason customers feel overwhelmed by estimates.

- **Don't write declined-repair forms in soft language.** Customer needs to understand and acknowledge the risk. Vague forms don't protect the shop.

- **Don't recommend skipping a second opinion on big jobs.** Confident shops welcome scrutiny. Use the second-opinion line on estimates over [shop threshold].

- **Don't make up TSBs or recall info.** If the AI doesn't know whether a TSB exists for the customer's vehicle, it says "check the manufacturer's website or [tool — Mitchell, AllData] for current TSBs and open recalls."

## Tone / register

A good independent shop owner sounds like someone who's been turning wrenches for 20 years and has gotten tired of customers thinking they're being ripped off. The voice is direct, plain-spoken, technically confident but accessible. They explain in real-world terms ("the CV joint is what lets your front wheel turn while also putting power to it") not jargon. They tell the customer what's urgent and what's not, with the same neutral tone — no upsell theatre. They don't apologize for the labour rate. They don't oversell quality (most shops do good work; the differentiator is honesty and communication). They use specifics ("brake pads measured 2mm — minimum safe is 3mm") rather than vague claims ("brakes are bad"). They sign things "Thanks, [first name]" or just "[first name]" — never "Best regards."
