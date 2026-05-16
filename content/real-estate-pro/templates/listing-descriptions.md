# Listing Descriptions by Property Type

Five property types, five prompt templates, five worked example outputs. Use the prompt as-is or as a starting point. The worked examples show you what good looks like before you generate your own.

---

## How to use this file

1. Find the property type that matches your listing
2. Copy the prompt block
3. Replace the bracketed inputs with your property's details
4. Paste into your AI tool (after loading `optimization-pack.md` as the system prompt)
5. Compare against the worked example to gut-check the output

The system prompt does the heavy lifting on structure, tone, and fair-housing compliance. These templates just give the AI the specific inputs it needs for each property type.

---

## 1. Single-family home (SFH)

### Prompt

```
Write MLS public remarks for this single-family home.

Property:
- Address or neighborhood: [name]
- Beds: [#] / Baths: [#] / Sqft: [#] / Lot: [size]
- Year built: [year]
- Style: [Craftsman / Colonial / ranch / contemporary / etc.]
- Condition: [move-in / lightly updated / fully renovated / needs work]

Features that matter (the things a buyer would actually notice):
- [feature 1 — specific, not "amazing"]
- [feature 2]
- [feature 3]
- [feature 4]
- [feature 5]

Mechanical / updates (year if you have it):
- [HVAC, roof, windows, electrical, plumbing — list what's recent]

Outdoor:
- [yard, deck, patio, garage, parking, fencing]

Location specifics:
- [walking distance to X, Y minutes to downtown, school district name]

Likely buyer:
- [be specific — "move-up couple with one kid and a dog, hybrid WFH"]

Platform: [US MLS / Realtor.ca / Zillow / Redfin]
Character limit: [number]
```

### Worked example output

**Inputs used:** 4 bed / 2.5 bath / 2,180 sqft Craftsman in Bridgeland (Calgary), built 2009, lightly updated kitchen 2023, on a 0.14 acre lot. Wolf range, butcher block island, finished basement with separate entrance, south-facing deck, double detached garage. 7-minute walk to LRT. Move-up family from a townhouse.

**Output (Realtor.ca, ~250 words):**

A 2009 Craftsman that's been thoughtfully kept, sitting on a quiet stretch of Bridgeland a seven-minute walk from the LRT. The 2023 kitchen update did the work that actually matters — Wolf gas range, butcher block island, soft-close cabinets — without losing the warmth of the original layout. Hardwood runs through the main floor, with sight lines from the kitchen through to the south-facing deck.

Upstairs holds four bedrooms, including a primary with a walk-in closet and a three-piece ensuite. The basement is fully finished with a separate entrance off the side of the house, which opens up nanny-suite or extended-stay options depending on what you need.

The lot is just over 6,000 square feet, fully fenced, with a double detached garage off the back lane. Newer roof (2021), high-efficiency furnace, and central A/C. South exposure on the back means the deck catches sun from late morning through early evening — good for the dog, good for the garden, good for a coffee on a Saturday.

Bridgeland needs little introduction: short walk to OEB, Lukes, and the river pathways; transit to downtown in under fifteen minutes. Inglewood and East Village are an easy bike ride. Schools are zoned to Langevin and Crescent Heights — buyer to confirm current boundaries with CBE.

---

Things to verify before publishing:
- Roof year (2021)
- HVAC age
- Current school boundary with CBE

---

## 2. Condo / townhouse

### Prompt

```
Write MLS public remarks for this condo or townhouse.

Property:
- Building name / complex: [name]
- Unit type: [condo / townhouse / loft / penthouse]
- Beds: [#] / Baths: [#] / Sqft: [#]
- Year built: [year]
- Floor: [# of #]
- Exposure: [N/S/E/W]

Features:
- [feature 1]
- [feature 2]
- [feature 3]
- [feature 4]

Building amenities (only list ones the buyer cares about):
- [gym / pool / concierge / rooftop / parking / storage / pet-friendly with restrictions]

Fees:
- HOA / condo fee: $[amount] / month — what it covers
- Property tax: $[amount] / year (if you have it; otherwise [CONFIRM])

Location:
- [walking distance to X, transit, neighborhood feel]

Likely buyer:
- [first-time buyer, downsizer, investor, urban professional]

Platform: [MLS]
Character limit: [number]
```

### Worked example output

**Inputs used:** 2 bed / 2 bath / 985 sqft condo, 14th floor, south-east exposure, in a 2017 building in downtown Austin. New stainless appliances, quartz counters, in-unit laundry. Building has gym, rooftop pool, 24-hr concierge. HOA $640/mo includes water, gas, amenities. Likely buyer: urban professional, first downtown condo, walks to office.

**Output (US MLS, ~150 words):**

A southeast-facing two-bedroom on the fourteenth floor of a 2017 high-rise — sunrise light in the bedroom, downtown views from the living room, both at once if you're lucky with the season. Open plan with quartz counters, stainless appliances, and an island that seats three. Both bedrooms are real bedrooms, not one-and-a-flex; the second has a window and a proper closet.

In-unit laundry, one assigned garage spot, separate storage unit. Building amenities run the standard list — rooftop pool, gym, twenty-four-hour concierge — and the location puts you a six-minute walk to Congress, eight to Whole Foods, fifteen to the trail head at Lady Bird.

HOA $640/month covers water, gas, and amenity access. Pet-friendly with weight restrictions.

---

Things to verify before publishing:
- Property tax (not provided)
- Exact pet weight limit
- Storage unit dimensions

---

## 3. Luxury

### Prompt

```
Write MLS public remarks for this luxury property.

Property:
- Address or neighborhood: [name]
- Type: [estate / penthouse / waterfront / new construction]
- Beds: [#] / Baths: [#] / Sqft: [#] / Lot: [size]
- Year built: [year] (or "Custom build, completed [year]")
- Architect / builder: [name if notable]

The single feature that makes this property:
- [the one thing — the view, the architect, the location, the privacy, the lake frontage]

Three to five other notable specifics:
- [feature, with brand or detail]
- [feature]
- [feature]
- [feature]

Outdoor / land:
- [acreage, water frontage, views, garden, pool, outbuildings]

Smart / mechanical:
- [home automation, geothermal, solar, EV, etc.]

Location specifics:
- [privacy, proximity to airport, schools, town]

Likely buyer:
- [second-home buyer, executive relocation, family upgrading from $X to $Y]

Platform: [MLS / luxury portal / brokerage site]
Word target: 250-400 words (luxury runs longer)
```

### Worked example output

**Inputs used:** 5 bed / 5.5 bath / 6,200 sqft custom home in Whistler Cadenza by architect Patkau Associates, completed 2021, on 0.42 acres backing onto Whistler Creek. Geothermal heating, full Lutron lighting, indoor lap pool, four-car garage with EV, ski-in to Creekside. Likely buyer: second-home buyer from Vancouver or West Coast US.

**Output (luxury portal, ~350 words):**

A Patkau Associates design completed in 2021, set on a 0.42-acre Cadenza lot that backs directly onto Whistler Creek with ski-in access to Creekside. The house is a study in what a contemporary mountain home can be when the architects are given room to work — long cedar runs, full-height glazing oriented to the creek and the ridge, a primary suite that opens onto a private deck above the water.

Six thousand two hundred square feet across three levels. Five bedrooms, each with ensuite. The kitchen is anchored by a Sub-Zero column refrigerator and freezer, a Wolf range with two ovens, and a butler's pantry that holds a second dishwasher and prep sink. Great room with a Stuv wood-burning fireplace and twenty-foot ceilings.

The lower level holds an indoor lap pool with a glass wall to the creek, a four-piece pool bath, a media room wired for Atmos, and a bunk room that sleeps six. Wine cellar off the entry hall. Full Lutron lighting, Crestron AV, geothermal heating with in-floor radiant throughout, and an HRV system that's been balanced for the elevation.

Four-car heated garage, two EV chargers, and a covered drop-off for arrival. Ski room with boot dryers and a dedicated entrance to the locker level. Mature landscaping with established trees on three sides — the privacy here is rare even by Cadenza standards.

Creekside Gondola is a four-minute walk via the trail at the back of the property. Whistler Village is six minutes by car, the airport is two hours, Vancouver is an hour forty-five.

A house designed for a buyer who wants the architecture to be part of the asset.

---

Things to verify before publishing:
- Confirm architect attribution language is OK to publish (some firms have credit guidelines)
- HOA / strata fee if applicable
- Property tax (not provided)
- Exact ski-in path status (creek crossing seasonal?)

---

## 4. Fixer-upper

### Prompt

```
Write MLS public remarks for this fixer-upper.

Property:
- Address or neighborhood: [name]
- Beds: [#] / Baths: [#] / Sqft: [#] / Lot: [size]
- Year built: [year]
- Condition: [needs cosmetic / needs systems / structural concerns]

What's solid (don't hide what works):
- [foundation, roof, bones, lot, location, mechanical that's recent]

What needs work (be direct — buyers will see it anyway):
- [list honestly]

Comp ARV signal:
- [recent renos in the area sold at $X / sqft — this informs the buyer's math]

Likely buyer:
- [flipper, sweat-equity owner-occupant, builder, contractor's family]

Platform: [MLS]
Character limit: [number]
Tone: matter-of-fact, no euphemisms. "Needs paint and flooring" is fine. "Bring your imagination" is not.
```

### Worked example output

**Inputs used:** 3 bed / 1 bath / 1,150 sqft 1958 bungalow in East Vancouver, 33 x 122 lot. Original kitchen, original bath, oil heat (tank above ground, recent), roof done 2019, foundation dry. Recent renos on the street selling at $1.8M+. Likely buyer: builder or sweat-equity owner-occupant.

**Output (US MLS, ~180 words):**

A 1958 bungalow on a flat 33 x 122 lot, ready for the next owner to put work into it. The roof was replaced in 2019. The foundation is dry. Oil heat, with the tank above ground and inspected last year. The kitchen and bathroom are original. Floors are original hardwood under the carpet in the main rooms.

Three bedrooms up, an unfinished basement with separate entry potential, single carport. Lot is RT-7 zoned with side yard access for trades.

The bones are the value here. Recent renovations on the same block have sold north of $1.8M. The next owner is either a builder taking it to studs, a contractor's family making it their first East Van project, or a flipper with a clear scope. Numbers work either way if you go in with eyes open.

Bring a contractor to the showing. Inspection welcome.

---

Things to verify before publishing:
- Oil tank decommissioning timeline (BC has rules)
- RT-7 zoning specifics with city
- Carport vs garage on title

---

## 5. Multi-family

### Prompt

```
Write MLS public remarks for this multi-family / investment property.

Property:
- Address or neighborhood: [name]
- Type: [duplex / triplex / fourplex / 5+]
- Total units: [#]
- Total sqft (building): [#]
- Lot: [size]
- Year built: [year]

Unit mix:
- Unit 1: [beds/baths/sqft/current rent or "vacant"]
- Unit 2: [beds/baths/sqft/current rent or "vacant"]
- (repeat for all units)

Financials (only if seller has approved sharing):
- Gross monthly rent: $[amount]
- Annual expenses: $[amount]
- NOI: $[amount]
- Cap rate at list price: [%]

Capex / condition:
- [recent updates, deferred maintenance, age of systems]

Tenancy:
- [month-to-month / fixed leases / vacant / mix]

Likely buyer:
- [owner-occupant house-hacker / investor / 1031 buyer / portfolio builder]

Platform: [MLS / commercial multi-family portal]
Character limit: [number]
Tone: investor-focused. Numbers up front. Skip lifestyle copy.
```

### Worked example output

**Inputs used:** Triplex in Hamilton, ON. Built 1962. Three 2-bed units, ~750 sqft each. Current rents: $1,400 / $1,650 / vacant. Roof 2020, furnaces 2018 (each unit separately metered), four parking. Likely buyer: investor with existing local portfolio.

**Output (MLS commercial, ~180 words):**

A 1962 brick triplex in central Hamilton, three two-bedroom units of roughly 750 square feet each, separately metered for gas and hydro. Roof replaced 2020. Furnaces replaced 2018 across all three units. Four-car off-street parking accessed off the rear lane.

Current unit mix and rent: Unit 1 occupied at $1,400 (long-term tenant). Unit 2 occupied at $1,650 (lease renewed 2025). Unit 3 vacant, market rent estimated at $1,750-1,850 based on comparable two-bedroom units in the area.

Stabilized gross at market: approximately $4,900 monthly. Seller can provide a full T12 and rent roll on request through the listing agent.

Building has been owner-managed for the last eleven years. Maintenance records available. Two of three units have had cosmetic updates within the last five years; Unit 1 is original condition.

Targeted at investors building local portfolios or owner-occupants comfortable with light landlord duties. AGI / N12 dynamics: ask the listing agent.

---

Things to verify before publishing:
- Confirm seller has approved sharing financials in remarks
- T12 numbers (do not list unverified NOI)
- Current Ontario LTB status on any unit
- Parking pad legality (some Hamilton lanes are restricted)

---

## Common edits the AI will accept

When the draft comes back and you want to tune it:

- "Cut the adjectives. Replace each one with a specific."
- "Trim to [X] characters. Keep the lead and the close."
- "More direct. Less lifestyle."
- "Add a line about [feature you forgot to mention]."
- "Make the close softer — no exclamation points."
- "Voice this as if I walked through the property with the buyer yesterday."

Each of these will produce a noticeably better second draft. The AI is much better at editing toward specifics than generating them from a thin first prompt.
