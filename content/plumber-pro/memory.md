# Memory — Plumber Pack

## Domain context

A licensed plumber running a residential-focused shop spends their days in two modes: emergencies (leaks, no hot water, sewer backups, frozen lines in winter) and scheduled work (reno rough-ins, fixture upgrades, water heater replacements, drain cleaning). The emergency calls are higher-margin per hour but unpredictable and emotionally charged — the customer is often standing in water and panicking. The scheduled work is the bread and butter that keeps the shop fed when emergencies are slow.

The rhythm is interrupt-driven. A two-hour fixture install can become a six-hour day if the angle stop crumbles in your hand and the supply line behind the wall turns out to be galvanized. The good plumbers learn to scope estimates with realistic "if-we-find" language and to manage customer expectations about hidden conditions. The shop owner is often still in the field, so estimates and follow-up emails get written from a truck, at a coffee shop, or at 9 PM after the kids are down. That's where the AI earns its keep.

Success looks like: panicked emergency callers becoming loyal repeat customers because you walked them through what to do before you arrived. A reno customer who sends three referrals because you flagged the hidden cast iron stack before opening the wall instead of after. A water heater replacement where the customer understood the "Why this number" paragraph and stopped shopping for cheaper quotes. Failure looks like: a customer disputing the bill because they didn't understand what was included, a callback because a clog returned, or a moisture problem six months later because the leak repair wasn't really a fix.

## Vocabulary the AI should know

- AHJ: Authority Having Jurisdiction — local plumbing inspector
- UPC: Uniform Plumbing Code (US, IAPMO)
- IPC: International Plumbing Code (US, ICC)
- NPC: National Plumbing Code (Canada, NRC)
- NSPC: National Standard Plumbing Code (US, PHCC)
- ABS: Acrylonitrile butadiene styrene — black plastic drain pipe
- PVC: Polyvinyl chloride — white plastic drain pipe (some jurisdictions use one or the other for DWV)
- PEX: Cross-linked polyethylene — flexible supply piping, A/B/C variants, common in modern work
- Copper L / M: Type L copper (thicker wall, used for supply); Type M (thinner, sometimes residential)
- CPVC: Chlorinated PVC — hot-water-rated plastic supply (used in some jurisdictions, less common in Canada)
- Galv: Galvanized steel pipe — legacy supply, scales internally over time, restricts flow
- Cast iron / CISPI hubless: legacy DWV (drain/waste/vent) material, can crack and pit with age
- Poly B / polybutylene: 1978-1995 supply piping, known failure history, replacement candidate
- DWV: Drain, waste, and vent system
- Trap: P-trap or S-trap under fixtures, holds water seal to block sewer gas
- Vent stack / soil stack: vertical pipe that vents the DWV system to atmosphere
- Stack: usually short for soil stack
- Cleanout: access point for clearing drains
- Auger / snake: rotating cable tool for clearing drain clogs
- Jetter: high-pressure water tool for clearing drains and roots
- Camera / scope: video inspection of drain lines
- Angle stop / stop valve: shutoff under a fixture
- Dielectric union: fitting separating copper and steel to prevent galvanic corrosion
- Sweat / solder: copper joining method
- ProPress / Megapress: press-fitting copper or steel without heat
- Dishwasher air gap: code-required device preventing dishwasher backflow
- AAV / studor vent: air admittance valve, allowed in some jurisdictions in place of full venting
- Tankless / on-demand: water heater type, gas or electric
- Tank water heater: traditional 40-80 gallon, gas or electric
- T&P / TPR valve: temperature and pressure relief on water heater
- Expansion tank: required on closed systems (with a check valve or PRV)
- PRV: pressure-reducing valve at the service entry
- Backflow / RPZ: backflow prevention assemblies, required on irrigation and certain commercial connections

## Common workflows

- Emergency leak call: customer calls panicked, plumber gives shut-off advice over the phone, ETA, ballpark, arrives, diagnoses, repairs or stabilizes. Trigger → empathy + shut-off script → ETA → arrival → diagnosis → repair or stop-the-bleeding fix → invoice + follow-up.
- Drain clearing: customer reports slow or backed-up drain, plumber arrives, identifies fixture and line, runs auger or jetter, verifies clearance, often runs camera to identify cause. Trigger → arrive → diagnose → mechanical clearance → verify → camera if needed → report.
- Water heater replacement: tank fails, customer needs hot water fast, plumber assesses (gas/electric, location, venting, expansion tank needed), quotes, often same-day or next-day install. Trigger → assess → quote → drain old → install new → test → permit and inspection where required.
- Bathroom or kitchen rough-in: GC books the plumber, walks the scope, plumber roughs in supply and DWV, returns for trim-out after drywall and tile. Trigger → walk with GC → quote → rough-in → inspection → trim-out → final inspection.
- Sewer scope: customer with recurring backups or pre-purchase inspection. Plumber runs camera from cleanout to main, documents condition, recommends repair or replacement. Trigger → schedule → run camera → record → report with photos/video and recommendation.

## What to avoid / common mistakes

- Quoting flat rate without acknowledging hidden conditions in the estimate. Plumbing in older homes is full of surprises. "If we open the wall and find cast iron stack with pitting, that's a separate scope" up front saves the relationship later.
- Using ABS and PVC interchangeably. They're not — different jurisdictions allow different materials, can't be solvent-welded to each other.
- Promising warranty on the homeowner's existing fixtures. You warranty your work and the new materials you install. The old hardware is not your problem.
- Skipping the empathy opener on emergency calls. A flooded basement is not a procurement decision for the homeowner. Lead with calm, not pricing.
- Writing "we'll snake the drain" as scope without specifying which line, what tool, and whether camera is included.

## Tone / register

A real plumber sounds calm under pressure, slightly weary, and direct. They mention specifics — "Moen 1225 cartridge," "Bradford White RG250H6N," "3" ABS DWV," "1/2 PEX-A homerun" — because those names matter. They don't oversell — "your water heater is 12 years old and starting to weep at the inlet nipple; I can do another anode rod swap and buy you a year, or we can plan a replacement now while you have hot water." They never use "industry standard" — they say "current code" or "what the inspector signs off on." They explain things by walking through the steps. They sign off with first name + license number when it's official.
