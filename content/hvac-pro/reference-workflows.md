# Reference Workflows — HVAC Tech Pack

Real worked examples. Equipment model numbers, AHRI references, and code references are illustrative — verify against current manufacturer documentation and AHJ-adopted code.

---

## 1. Full system replacement proposal (cold-climate heat pump + dual-fuel)

```
SYSTEM REPLACEMENT PROPOSAL — Janet and Dave Chen — 412 Westmount Drive, Calgary AB — May 14, 2026

What's there now:
1996 Lennox G14 80% AFUE natural gas furnace, 80k BTU input. 2003 Lennox 13-ACX 3-ton AC on R-22. Both at or past end of typical service life. AC barely maintains setpoint on 30°C+ days (consistent with R-22 charge loss and aged compressor performance). Upstairs bedrooms underheat in winter, which is a duct distribution issue we'll discuss separately. Existing ductwork is mostly accessible in the basement, original to the home, in serviceable condition.

Load calculation:
Manual J calculated using current building envelope (single-pane upgrades to double-pane done 2018, attic insulation R-40):
- Cooling load: 32,000 BTU/h at 31°C design temp
- Heating load: 54,000 BTU/h at -32°C design temp (Calgary Climate Zone 7A)

Note: existing AC at 36,000 BTU/h is oversized for the actual cooling load — this is part of why it short-cycles on mild days and doesn't dehumidify well.

What I recommend:
Cold-climate dual-fuel system:
- Outdoor unit: Mitsubishi MUZ-LN24NAH-U1 (24,000 BTU/h cooling, rated 100% capacity to -15°C, ~76% to -25°C)
- Indoor air handler: Coil-mount AHRI-matched indoor coil + new 96% AFUE Carrier 59MN7B080V17 natural gas furnace as backup heat
- AHRI match certificate #: [verify]
- Refrigerant: R-454B (next-gen low-GWP, replacing R-410A in 2025+ systems)
- Smart thermostat: Ecobee Premium with dual-fuel control logic, switchover point set at -15°C

Why this configuration:
You're in a climate where a heat pump alone won't make economic sense below about -15°C — at that point natural gas is cheaper per BTU. A dual-fuel setup gives you heat pump efficiency for the 80% of the heating season where it dominates and gas backup for the deep cold weeks. Cooling is sized correctly to the actual load (24k BTU vs your current oversized 36k), which fixes the short-cycling and dehumidification complaints.

Scope of work (Included):
- Removal and disposal of existing furnace and AC condenser
- Recovery of R-22 refrigerant per EPA regulations
- Install Mitsubishi MUZ-LN24NAH-U1 outdoor unit on new isolation pad, properly sized line set
- Install Carrier 59MN7B080V17 96% AFUE furnace with matched indoor coil
- Refrigerant line set: replace (existing is R-22 sized and contaminated)
- All electrical, gas, and refrigerant connections per code
- New PVC venting for 96% furnace (concentric or twin-pipe per layout)
- Condensate management: primary line, secondary pan, float switch, neutralizer for the high-efficiency condensate
- New media filter rack (4" Aprilaire 1410 or equivalent)
- Ecobee Premium thermostat with dual-fuel programming
- Mechanical permit + gas permit
- Startup, refrigerant charge verification by subcool, combustion analysis, static pressure measurements
- Commissioning report on file
- AHRI matched-system certificate provided

Not included:
- Ductwork modification or sealing (the upstairs underheat issue is a duct distribution problem; we'll quote separately after we get the new equipment in and run static pressure tests)
- Electrical service upgrade if disconnect amperage proves inadequate (assessing on install day)
- Asbestos abatement on any duct insulation if discovered
- Drywall patch or paint

Hidden conditions:
- If existing ductwork static pressure is excessive (>0.5" wc), we may recommend duct sealing or transitions before close-out — separate scope
- If the gas line size to the existing furnace is undersized for the new unit's BTU input, we'll need to upsize (separate cost)
- If the chimney liner is being abandoned (the new furnace doesn't use it), there's a separate small scope for liner removal/capping

Permits and inspection:
- Mechanical permit and gas permit, City of Calgary. We pull both. Estimated fee: $245 (passed through at cost).
- Two inspections: rough (post-install before close-out) and final.

Rebates / incentives available:
- Canada Greener Homes Grant: up to $5,000 for cold-climate heat pump installations (must use NRCan-registered installer — we are registered)
- ENMAX Heat Pump Rebate (if applicable in your service territory): up to $2,000 estimated
- Federal Greener Homes Interest-Free Loan: up to $40,000 at 0% over 10 years if you want financing

Price: $14,850 CAD all-in (equipment, labor, materials, permits, commissioning)
After rebates (estimated): $7,850 — verify eligibility with us before banking on the full rebate stack
Payment: 25% deposit to schedule ($3,712), 25% at equipment arrival, 50% on inspection sign-off
Financing: Greener Homes Loan available (we handle the application), or our partner finance at 8.9%/60mo
Warranty:
- Mitsubishi compressor: 12 years parts (with registered installation)
- Mitsubishi other parts: 10 years
- Carrier furnace heat exchanger: 20 years parts
- Carrier other parts: 10 years
- Our workmanship: 5 years labor

Why this price:
Real talk on what's in this proposal vs. the $9,400 quote you mentioned:

1. Cold-climate heat pump (Mitsubishi) — not a standard air-source. The Goodman quote you got is for a single-stage AC, not a heat pump. Different equipment, different capability.
2. Properly sized cooling (24k actual load vs. 36k current) — fixes the short-cycle and humidity issues
3. Manual J calculation, not "replaced what was there"
4. AHRI match certificate — required for warranty validity, often skipped on cheap quotes
5. R-454B refrigerant — the new standard; R-410A is being phased down 2025-2026, you don't want a new R-410A system today
6. Commissioning: refrigerant charge by subcool, static pressure measured, combustion analysis on the furnace, copies of all reports in your file
7. Float switch, surge protector, media filter rack — code-required and recommended ancillaries
8. Permit, two inspections, both pulled
9. 5-year workmanship warranty in writing
10. Rebate paperwork handled by us (the Greener Homes paperwork alone is several hours)

Happy to walk through any line item with you. Sitting at your kitchen table this week if that helps.

— Mike Tarasov, Lic. HVAC #H-2293, Gas Ticket #G-447, EPA 608 Universal

---
Things I assumed that you should verify before sending:
- Mitsubishi MUZ-LN24NAH-U1 availability and current pricing from your distributor
- AHRI certificate number for the specific indoor coil + outdoor unit pairing
- ENMAX rebate amount — verify current program eligibility and dollar value
- Canada Greener Homes Grant — verify current program status and amount; check that installer registration is current
- City of Calgary mechanical/gas permit fees against current municipal rate
- R-454B equipment availability for this specific Mitsubishi model in 2026 — if not yet, this proposal needs adjustment to R-410A or R-32
- Customer's gas line size at furnace — if undersized for 96k BTU, scope adds upsize work
```

---

## 2. Heat pump vs gas furnace comparison

```
Hi Janet —

You asked me to lay out the heat pump vs gas furnace decision side-by-side. Here it is.

What they have in common:
- Both heat your house. Both can be sized for your 54k BTU/h heating load.
- Both qualify for the Greener Homes Loan (0% financing) if installed by a registered contractor.
- Both vent and clear inspection.

Where they differ:

| Spec                     | Cold-climate heat pump (Mitsubishi)     | High-efficiency gas furnace (Carrier)   |
|--------------------------|------------------------------------------|------------------------------------------|
| Heating efficiency       | HSPF2 9.5 / COP 3.5+ at +7°C            | 96% AFUE                                 |
| Cooling efficiency       | SEER2 22.0                               | Requires separate AC (additional cost)   |
| Modulation               | Variable speed (inverter)                | Two-stage                                |
| Refrigerant              | R-454B (next-gen, low GWP)               | N/A (gas combustion)                    |
| Low-temp performance     | 100% to -15°C, ~76% to -25°C            | Full capacity at any temp                |
| Operating cost (avg yr)  | ~$1,150/year                             | ~$1,650/year (gas) + AC operation        |
| Equipment + install      | $14,850                                  | $11,200 furnace + AC                     |
| After rebates (est.)     | ~$7,850                                  | ~$10,500 (smaller rebate stack)          |
| Manufacturer warranty    | 12 yr compressor, 10 yr parts            | 20 yr heat exchanger, 10 yr parts        |

What this means in practice:
A cold-climate heat pump runs as your primary heat source for ~80% of Calgary's heating season — fall, most of winter, spring. When it drops below about -15°C, you either let it keep running at reduced capacity (still cheaper per BTU than gas down to about -20°C) or switch to gas backup. The dual-fuel setup I proposed does that automatically based on outdoor temperature.

A gas furnace runs at full capacity regardless of weather, costs more to operate (gas price has climbed faster than electricity in Alberta in recent years), and you'd still need a separate AC for summer cooling.

My recommendation for your house:
The dual-fuel heat pump setup, for three reasons. (1) It's the lower lifetime cost when you factor in cooling — you're getting both heating and cooling from one outdoor unit. (2) The rebate stack tips the up-front cost in its favor. (3) It's the direction the industry is moving — gas-only proposals will look dated in 5 years when you sell.

What would change my recommendation:
- If you're moving in the next 3-4 years and won't capture the operating-cost payback
- If your electrical service is significantly undersized and the upgrade cost makes it uneconomical
- If you genuinely prefer the feel of gas heat (some people do — it's a fair preference)

Talk it over with Dave and let me know.

— Mike Tarasov

---
Things I assumed that you should verify before sending:
- The operating cost estimates ($1,150 vs $1,650) — these are illustrative, run them against current Alberta utility rates
- The HSPF2/COP and SEER2 numbers for the specific Mitsubishi model
- Rebate stack assumptions
- Carrier furnace warranty terms (verify current Carrier residential warranty pages)
```

---

## 3. "Why ours is more expensive" follow-up

```
Subject: The $5,450 difference — what's actually in it

Hi Janet,

You mentioned the other quote came in at $9,400 and asked why we're at $14,850. Fair question, here's the honest breakdown.

The other quote (from what I can see based on the model they listed):
- 95% AFUE Goodman GM9S96 furnace
- 3-ton Goodman GSXC18 AC, R-410A
- No mention of Manual J load calc
- No mention of AHRI match certificate
- No mention of cold-climate heat pump (they're quoting a standard AC)
- No mention of commissioning (refrigerant charge by subcool, static pressure, combustion analysis)
- Standard 1-year workmanship warranty
- Permit and inspection: I'd need to ask them

Our quote, by comparison:
- Mitsubishi cold-climate heat pump (does both heating and cooling, qualifies for the bigger rebate stack)
- Carrier 96% AFUE furnace as dual-fuel backup
- AHRI matched system certificate provided
- R-454B refrigerant (R-410A is being phased down 2025-2026; new R-410A systems today are a poor long-term call)
- Full commissioning: refrigerant charge verified by subcool, static pressure measured, combustion analysis on the furnace, all reports go in your file
- Float switch + surge protector + 4" media filter rack
- 5-year workmanship warranty in writing
- Mechanical and gas permits, two inspections
- Rebate paperwork handled by us (the Greener Homes paperwork is hours of work)

Two specific things to ask the other shop:
1. Are they doing a Manual J load calc, or sizing to the existing equipment? If the latter, you'd be replacing an oversized AC with another oversized AC.
2. Are they providing an AHRI matched-system certificate? Without one, your warranty coverage is at risk.

If they include all of the above for $9,400, take it — that's a remarkable price. If they don't, the comparison isn't apples to apples.

After the Greener Homes rebate stack, our net cost is closer to $7,850 vs. their $9,400 minus whatever smaller rebate the AC-only setup qualifies for. The math may surprise you.

Happy to walk through it sitting down. No pressure either way.

— Mike

---
Things I assumed that you should verify before sending:
- The specific Goodman model numbers I referenced (came from your description) — confirm with the customer
- The R-410A phasedown timeline framing — verify the current EPA / ECCC regulatory language
- The rebate net cost — confirm based on actual eligibility
```

---

## 4. Maintenance agreement description

```
ProCare Maintenance Plan
$329/year or $28/month, residential single-system

What's included:
- 2 scheduled tune-ups per year (spring AC visit in April-May, fall furnace visit in September-October)
- Each visit: 60-minute full PM checklist including coil inspection and cleaning, blower wheel and motor inspection, refrigerant charge verification (cooling visit), gas pressure and combustion analysis (heating visit), capacitor test, contactor inspection, thermostat verification, filter swap (1" filter included; 4" media filter at cost)
- Priority no-heat/no-cool scheduling — bumped ahead of non-contract customers, typical response within 4 hours during business hours
- No after-hours emergency fee on contract customer calls (saves ~$185/visit)
- 15% off any parts and labor for repairs outside the PM scope
- Free seasonal reminders and equipment status reports via email

What's not included:
- Equipment replacement (separate quote)
- Parts (subject to the 15% discount)
- Repairs beyond what's discovered during the PM visit (quoted separately)
- Refrigerant top-offs (charged at current per-pound rate, subject to discount)
- Ductwork repair, indoor air quality accessories, ductwork modifications

Auto-renewal in plain English:
This plan renews automatically each year on your sign-up anniversary unless you cancel. We'll email you 45 days before renewal with a reminder and the next year's price. To cancel, reply to that email or call us — no hoops, no fee.

Cancellation:
Cancel any time. If you cancel within 30 days of signup, full refund minus the cost of any service performed. After 30 days, prorated refund based on visits remaining.

Why it's worth it:
Equipment that gets scheduled PM lasts roughly 2-4 years longer than equipment that doesn't, based on industry data. Catching a $40 capacitor before it fails saves a no-cool call on a 30°C Sunday. The 15% discount typically pays back the contract cost on one decent repair per year. And priority scheduling during heat waves matters more than most people realize until they're in one.

Sign up: [contact]

---
Things I assumed that you should verify before sending:
- The $329 annual price — match your shop's actual pricing
- The 4-hour response time — set a realistic SLA you'll actually hit
- The auto-renewal language — confirm with your accountant or attorney if you're in a state/province with strict auto-renewal disclosure laws (e.g., California, Quebec have specific requirements)
```

---

## 5. Spring AC tune-up email

```
Subject: Spring AC tune-up — we're 3 weeks out from typical first 28°C days in Calgary

Hi [first name],

Quick note. Spring AC tune-up season is here.

What we're booking right now:
- AC tune-ups Monday through Saturday, weekday evenings and Saturday morning slots filling up first
- About 60 minutes on site
- $189 single-system tune-up (free for ProCare contract customers)

What you should consider:
- Your AC is [X years old]. Spring is when we catch capacitor weakness, low refrigerant, blower wheel buildup, and outdoor unit corrosion — all of which turn into a no-cool emergency in July if missed.
- If you've noticed humidity issues, uneven cooling between rooms, or higher-than-usual bills last summer, this is the visit where we diagnose root cause.
- If your system is 12+ years old, this is the year to start planning replacement on your timeline rather than during a July heat wave when lead times stretch.

How to book:
Reply to this email, text 587-XXX-XXXX, or book online: [link]

We'll bring a media filter if you need one ($28 + tax for a 1" pleated, $65 for a 4" Aprilaire). Just let us know your filter size when you book.

— Mike, Tarasov HVAC

---
Things I assumed that you should verify before sending:
- The 3-weeks-out timing — adjust to your local first-warm-day pattern
- Your tune-up pricing — match shop standard
- The filter prices — confirm current cost
- The "12+ years old" framing — adjust to your typical replacement-age conversation
```

---

## 6. "Your AC is dying" honest assessment

```
SERVICE REPORT — 88 Pinegrove Way — May 14, 2026

What I found today:
Existing AC: 2007 Lennox 13ACX 2.5-ton on R-22. 19 years old.

Diagnostic findings:
- Refrigerant pressure low (suction 52 psi, head 178 psi at 22°C ambient — should be closer to 70/240 psi)
- Compressor amp draw at the high end of normal (15.8 A vs. nameplate 16.5 A LRA-adjusted)
- Outdoor coil shows surface corrosion and fin damage at the bottom 6 inches
- Capacitor reading 32 µF (nameplate 35 µF — within tolerance but degrading)
- Contactor pitting visible on the load side
- Refrigerant: R-22, which has been illegal to manufacture in Canada since 2020. Reclaimed R-22 is still legal to use but is $X/lb and getting harder to source.

What this means in plain language:
Your AC is at the end of its service life. It still runs, but:
- The low refrigerant is either a slow leak (would need to find and fix — possible but not always practical on a 19-year-old system) or normal age-related compressor seal leakage (untreatable).
- Topping off R-22 at current pricing is about $X/lb, and a 2.5-ton system needs about 7-9 lb of refrigerant.
- If the compressor fails this season (probability is meaningful given age), you're looking at $1,800-2,400 for a swap that wouldn't be worth it on this system.

What I'd recommend, in order:
1. Don't dump money into this system. A refrigerant top-off would buy you maybe one more summer. Maybe.
2. Plan replacement on your timeline. We have heat pump options that qualify for current rebate programs — happy to put together a proposal next time I'm there.
3. If it dies before you're ready, we can do a temporary window unit recommendation or emergency replacement scheduling.

This isn't "your AC could fail any day, replace immediately!" It's "your AC is 19 years old and end of life — let's plan, not panic."

I'll send a replacement proposal next week. No pressure, just so you have it in hand.

Today's service charge: $145 (diagnostic only, no repair performed).

— Mike, Tarasov HVAC

---
Things I assumed that you should verify before sending:
- Verify current R-22 reclaimed refrigerant pricing in your region
- The probability framing on compressor failure — soften or adjust based on your judgment
- The recommendation timeline — match your actual proposal-writing capacity
```
