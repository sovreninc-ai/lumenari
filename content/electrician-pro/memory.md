# Memory — Electrician Pack

## Domain context

A licensed electrician — journeyman or master — running a small shop spends their days oscillating between dirty service calls (a tripping breaker, a no-power room, a smell of plastic from a switch), planned residential work (panel upgrades, new circuits, kitchen and bath renos), and light commercial (tenant improvements, lighting upgrades, small EV charger installs). The work pays well when it's quoted right and badly when it's quoted on assumption. A lot of money is left on the table by good electricians who hate writing estimates and explanations, so they undersell or skip the "why this costs what it costs" conversation.

The rhythm is unpredictable. A no-power emergency can blow up a planned-rough-in day. A panel upgrade that was supposed to be 4 hours becomes 7 because the service mast had to be replaced. The good electricians learn to quote with cushion built in, walk customers through scope clearly, and document conditions so they're not on the hook for issues they didn't cause. The shop owner is usually also still in the field, which means estimates get written at 8 PM with a beer, and that's where the AI earns its keep.

Success looks like: estimates that the customer says yes to without haggling because the scope is clear, repeat customers who refer their neighbors, no AHJ failures on rough-in, no callbacks because something wasn't done right. Failure looks like: the customer disputes the bill, a competing electrician underbid because they're going to cut corners, or a homeowner did the work themselves and now wants you to "just check it."

## Vocabulary the AI should know

- AHJ: Authority Having Jurisdiction — the local electrical inspector or department, the person whose interpretation of code is final
- NEC: National Electrical Code (US), NFPA 70, updated every 3 years
- CEC: Canadian Electrical Code Part I (CSA C22.1), updated every 3 years
- OESC: Ontario Electrical Safety Code — the CEC plus Ontario amendments
- STANDATA: Alberta interpretive bulletins issued by Safety Codes Council that clarify CEC application in Alberta
- GFCI: Ground Fault Circuit Interrupter — required at bathrooms, kitchens, exterior, garages, unfinished basements (current code)
- AFCI: Arc Fault Circuit Interrupter — required at most dwelling-unit 15/20A circuits in current code
- DFCI / DFA: Dual function (AFCI + GFCI) breaker
- TR: Tamper-resistant receptacle — required in dwelling units
- WR: Weather-resistant receptacle — required in damp/wet locations
- Service: the utility feed to a building. "100A service" / "200A service" — the main panel rating
- Main: the main disconnect breaker at the top of the service panel
- Subpanel: a secondary panel fed from the main, often in a garage or addition
- Mast / service mast: the vertical pipe from the meter base up through the roof to the utility drop
- Meter base: the enclosure that holds the utility meter, typically owned by the utility
- Ground rod / ground electrode: copper rod driven into the earth as part of the grounding electrode system
- Bonding: connecting metallic systems (water main, gas line, structural steel) to the grounding system
- Double-tap: two conductors under one breaker terminal, generally not allowed unless breaker is listed for it
- Federal Pacific Stab-Lok / Zinsco / FPE: legacy panel brands with known failure-to-trip issues; common replacement candidates
- Aluminum branch wiring: late-60s through mid-70s residential branch circuits, expansion/contraction issues at terminations, requires CO/ALR devices or AlumiConn connectors
- Knob-and-tube: pre-1950s wiring system, not necessarily unsafe if undisturbed but cannot be buried in insulation
- BX / AC cable: armored cable, common in older homes
- NM / Romex / NMD90: non-metallic sheathed cable, standard residential
- LB / Service head / weatherhead: parts of an overhead service entrance
- Permit / rough-in / service inspection / final: the AHJ inspection stages on permitted work

## Common workflows

- Service call (no power, tripping breaker, flickering lights): customer calls, electrician arrives, diagnoses (often 30-60 min), gives a verbal estimate to repair, repairs if simple, returns with parts if not. Trigger → diagnostic note + estimate → repair → invoice + warranty card.
- Panel upgrade (100A to 200A, or replacing legacy panel): assess existing conditions (service entrance, meter base, ground, branch circuits), coordinate with utility for service disconnect/reconnect, pull permit, schedule inspection. Trigger → site visit → quote → permit → service appointment with utility → install → inspection → final.
- Kitchen or bath reno electrical: coordinate with GC, rough-in new circuits and devices, return for trim-out after drywall and cabinets, final inspection. Trigger → walk with GC → quote → rough-in → trim-out → final.
- New circuit (EV charger, hot tub, dryer, range): assess panel capacity, route conductors, install device, test. Trigger → load calculation → quote → permit if required → install → inspection if required.
- Troubleshooting copy left with customer: after a complex repair, leave a clear note for the homeowner explaining what was found, what was done, and what to watch for. This becomes evidence if the issue recurs or expands.

## What to avoid / common mistakes

- Quoting code clauses without verifying the edition. "Per NEC 210.8" — but is your jurisdiction on 2020, 2023, or 2017? The substance matters more than the clause number in customer-facing copy.
- Writing condescending explanations. "As a homeowner you may not realize that electricity is dangerous." Real electricians don't talk to customers like that.
- Selling more than the situation needs. The customer with the 1980s Federal Pacific panel does need it replaced. The customer with the 2010 Square D QO doesn't need an upgrade just because they're asking about a hot tub — they need a load calc.
- Quoting flat-rate work and then hidden-conditions exclusions in fine print. If you don't know what's behind the wall, say so up front. Don't surprise the customer at invoice time.
- Generic warranty language. "Workmanship is guaranteed." For how long? Against what? "2 years labor warranty against defects in installation; manufacturer's warranty on materials passed through" is real.

## Tone / register

A real electrician sounds calm, slightly understated, and direct. They explain things by walking through the steps, not by lecturing about safety. They use brand names — "Eaton CH," "Square D QO," "Siemens Q," "Federal Pacific Stab-Lok" — because those names matter to the work. They acknowledge tradeoffs — "we can do it cheaper by reusing the existing service mast, but it's right at end of life and I'd want to flag that for you." They never say "industry standard" — they say "current code" or "what the inspector will pass." They sign off with their first name and their license number when it's an official document.
