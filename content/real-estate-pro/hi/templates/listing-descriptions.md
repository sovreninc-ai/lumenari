# Property Type से Listing Descriptions

पाँच property types, पाँच prompt templates, पाँच worked example outputs। Prompt को as-is use करें या एक starting point के रूप में। Worked examples आपको दिखाते हैं कि अपना generate करने से पहले अच्छा कैसा दिखता है।

---

## इस file को कैसे use करें

1. वो property type ढूँढें जो आपकी listing से match करे
2. Prompt block copy करें
3. Bracketed inputs को अपनी property के details से replace करें
4. अपने AI tool में paste करें (system prompt के रूप में `optimization-pack.md` load करने के बाद)
5. Output को gut-check करने के लिए worked example के against compare करें

System prompt structure, tone, और fair-housing compliance पर heavy lifting करता है। ये templates बस AI को हर property type के लिए specific inputs देते हैं।

---

## 1. Single-family home (SFH)

### Prompt

```
इस single-family home के लिए MLS public remarks लिखें।

Property:
- Address या neighborhood: [name]
- Beds: [#] / Baths: [#] / Sqft: [#] / Lot: [size]
- Year built: [year]
- Style: [Craftsman / Colonial / ranch / contemporary / etc.]
- Condition: [move-in / lightly updated / fully renovated / needs work]

Features जो matter करते हैं (वे चीज़ें जो एक buyer actually notice करेगा):
- [feature 1 — specific, "amazing" नहीं]
- [feature 2]
- [feature 3]
- [feature 4]
- [feature 5]

Mechanical / updates (year अगर आपके पास है):
- [HVAC, roof, windows, electrical, plumbing — list करें क्या recent है]

Outdoor:
- [yard, deck, patio, garage, parking, fencing]

Location specifics:
- [X तक walking distance, Y minutes to downtown, school district name]

Likely buyer:
- [specific रहें — "एक kid और dog वाला move-up couple, hybrid WFH"]

Platform: [US MLS / Realtor.ca / Zillow / Redfin]
Character limit: [number]
```

### Worked example output

**Inputs used:** 4 bed / 2.5 bath / 2,180 sqft Craftsman Bridgeland (Calgary) में, 2009 में built, 2023 में lightly updated kitchen, 0.14 acre lot पर। Wolf range, butcher block island, separate entrance वाला finished basement, south-facing deck, double detached garage। LRT तक 7-minute walk। एक townhouse से Move-up family।

**Output (Realtor.ca, ~250 words):**

एक 2009 Craftsman जिसे thoughtfully कर रखा गया है, Bridgeland के एक quiet stretch पर sitting, LRT से सात-minute walk। 2023 kitchen update ने वो काम किया जो actually matter करता है — Wolf gas range, butcher block island, soft-close cabinets — original layout की warmth खोए बिना। Main floor के through Hardwood चलता है, kitchen से through south-facing deck तक sight lines।

Upstairs चार bedrooms hold करता है, एक walk-in closet और एक three-piece ensuite वाला primary शामिल। Basement fully finished है house के side off एक separate entrance के साथ, जो nanny-suite या extended-stay options open करता है depending पर आपको क्या चाहिए।

Lot just over 6,000 square feet है, fully fenced, back lane off एक double detached garage के साथ। Newer roof (2021), high-efficiency furnace, और central A/C। Back पर south exposure का मतलब है deck late morning से early evening तक sun catches — dog के लिए अच्छा, garden के लिए अच्छा, Saturday पर एक coffee के लिए अच्छा।

Bridgeland को little introduction चाहिए: OEB, Lukes, और river pathways तक short walk; under पंद्रह minutes में downtown तक transit। Inglewood और East Village एक easy bike ride हैं। Schools Langevin और Crescent Heights पर zoned हैं — buyer CBE के साथ current boundaries confirm करे।

---

Publishing से पहले verify करने वाली Things:
- Roof year (2021)
- HVAC age
- CBE के साथ Current school boundary

---

## 2. Condo / townhouse

### Prompt

```
इस condo या townhouse के लिए MLS public remarks लिखें।

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

Building amenities (केवल वे list करें जिनकी buyer care करता है):
- [gym / pool / concierge / rooftop / parking / storage / restrictions के साथ pet-friendly]

Fees:
- HOA / condo fee: $[amount] / month — क्या cover करता है
- Property tax: $[amount] / year (अगर आपके पास है; नहीं तो [CONFIRM])

Location:
- [X तक walking distance, transit, neighborhood feel]

Likely buyer:
- [first-time buyer, downsizer, investor, urban professional]

Platform: [MLS]
Character limit: [number]
```

### Worked example output

**Inputs used:** 2 bed / 2 bath / 985 sqft condo, 14th floor, south-east exposure, downtown Austin में एक 2017 building में। New stainless appliances, quartz counters, in-unit laundry। Building में gym, rooftop pool, 24-hr concierge है। HOA $640/mo में water, gas, amenities शामिल है। Likely buyer: urban professional, पहला downtown condo, office तक walks।

**Output (US MLS, ~150 words):**

एक 2017 high-rise के चौदहवें floor पर एक southeast-facing two-bedroom — bedroom में sunrise light, living room से downtown views, दोनों एक साथ अगर आप season के साथ lucky हैं। Quartz counters, stainless appliances, और एक island जो तीन को seat करता है वाला open plan। दोनों bedrooms real bedrooms हैं, one-and-a-flex नहीं; second में एक window और एक proper closet है।

In-unit laundry, एक assigned garage spot, separate storage unit। Building amenities standard list चलाते हैं — rooftop pool, gym, twenty-four-hour concierge — और location आपको Congress तक six-minute walk रखता है, Whole Foods तक आठ, Lady Bird पर trail head तक पंद्रह।

HOA $640/month water, gas, और amenity access cover करता है। Weight restrictions के साथ Pet-friendly।

---

Publishing से पहले verify करने वाली Things:
- Property tax (provided नहीं)
- Exact pet weight limit
- Storage unit dimensions

---

## 3. Luxury

### Prompt

```
इस luxury property के लिए MLS public remarks लिखें।

Property:
- Address या neighborhood: [name]
- Type: [estate / penthouse / waterfront / new construction]
- Beds: [#] / Baths: [#] / Sqft: [#] / Lot: [size]
- Year built: [year] (या "Custom build, completed [year]")
- Architect / builder: [name अगर notable]

एकमात्र feature जो इस property को बनाता है:
- [एक चीज़ — view, architect, location, privacy, lake frontage]

तीन से पाँच अन्य notable specifics:
- [feature, brand या detail के साथ]
- [feature]
- [feature]
- [feature]

Outdoor / land:
- [acreage, water frontage, views, garden, pool, outbuildings]

Smart / mechanical:
- [home automation, geothermal, solar, EV, etc.]

Location specifics:
- [privacy, airport, schools, town के proximity]

Likely buyer:
- [second-home buyer, executive relocation, $X से $Y तक upgrading family]

Platform: [MLS / luxury portal / brokerage site]
Word target: 250-400 words (luxury longer चलता है)
```

### Worked example output

**Inputs used:** 5 bed / 5.5 bath / 6,200 sqft custom home Whistler Cadenza में architect Patkau Associates द्वारा, 2021 में completed, 0.42 acres पर Whistler Creek backing onto। Geothermal heating, full Lutron lighting, indoor lap pool, EV वाला four-car garage, Creekside तक ski-in। Likely buyer: Vancouver या West Coast US से second-home buyer।

**Output (luxury portal, ~350 words):**

2021 में completed एक Patkau Associates design, एक 0.42-acre Cadenza lot पर set जो directly Whistler Creek backing करता है Creekside तक ski-in access के साथ। यह house एक study है कि एक contemporary mountain home क्या हो सकता है जब architects को काम करने को room दी जाए — long cedar runs, creek और ridge की ओर oriented full-height glazing, एक primary suite जो water के ऊपर एक private deck पर open करता है।

तीन levels पर छह हज़ार दो सौ square feet। पाँच bedrooms, हर एक ensuite के साथ। Kitchen एक Sub-Zero column refrigerator और freezer, दो ovens वाला एक Wolf range, और एक butler's pantry से anchored है जो एक second dishwasher और prep sink hold करती है। एक Stuv wood-burning fireplace और twenty-foot ceilings वाला Great room।

Lower level एक indoor lap pool hold करता है creek को एक glass wall के साथ, एक four-piece pool bath, Atmos के लिए wired एक media room, और एक bunk room जो छह को sleep करता है। Entry hall off Wine cellar। Full Lutron lighting, Crestron AV, throughout in-floor radiant के साथ geothermal heating, और एक HRV system जो elevation के लिए balanced किया गया है।

Four-car heated garage, दो EV chargers, और arrival के लिए एक covered drop-off। Boot dryers और locker level तक एक dedicated entrance वाला Ski room। Mature landscaping तीन sides पर established trees के साथ — यहाँ privacy Cadenza standards से भी rare है।

Property के back पर trail के through Creekside Gondola चार-minute walk है। Car से Whistler Village छह minutes, airport दो hours, Vancouver एक hour forty-five।

एक buyer के लिए designed एक house जो architecture को asset का part होने देना चाहता है।

---

Publishing से पहले verify करने वाली Things:
- Confirm करें architect attribution language publish करना OK है (कुछ firms में credit guidelines हैं)
- HOA / strata fee अगर applicable
- Property tax (provided नहीं)
- Exact ski-in path status (creek crossing seasonal?)

---

## 4. Fixer-upper

### Prompt

```
इस fixer-upper के लिए MLS public remarks लिखें।

Property:
- Address या neighborhood: [name]
- Beds: [#] / Baths: [#] / Sqft: [#] / Lot: [size]
- Year built: [year]
- Condition: [needs cosmetic / needs systems / structural concerns]

क्या solid है (छिपाएँ नहीं क्या काम करता है):
- [foundation, roof, bones, lot, location, mechanical जो recent है]

क्या work चाहिए (direct रहें — buyers इसे anyway देखेंगे):
- [honestly list करें]

Comp ARV signal:
- [area में recent renos $X / sqft पर sold — यह buyer's math inform करता है]

Likely buyer:
- [flipper, sweat-equity owner-occupant, builder, contractor's family]

Platform: [MLS]
Character limit: [number]
Tone: matter-of-fact, कोई euphemisms नहीं। "Needs paint and flooring" fine है। "Bring your imagination" नहीं है।
```

### Worked example output

**Inputs used:** 3 bed / 1 bath / 1,150 sqft 1958 bungalow East Vancouver में, 33 x 122 lot। Original kitchen, original bath, oil heat (tank above ground, recent), roof done 2019, foundation dry। Street पर Recent renos $1.8M+ पर selling। Likely buyer: builder या sweat-equity owner-occupant।

**Output (US MLS, ~180 words):**

एक 1958 bungalow एक flat 33 x 122 lot पर, next owner के लिए ready उसमें काम डालने के लिए। Roof 2019 में replaced हुआ। Foundation dry है। Oil heat, tank above ground और last year inspected। Kitchen और bathroom original हैं। Main rooms में carpet के नीचे Floors original hardwood हैं।

ऊपर तीन bedrooms, separate entry potential वाला एक unfinished basement, single carport। Lot RT-7 zoned है trades के लिए side yard access के साथ।

Bones यहाँ value है। Same block पर recent renovations $1.8M से north sold हुए हैं। Next owner या तो studs तक ले जाने वाला एक builder है, इसे अपना first East Van project बनाता एक contractor's family है, या एक clear scope वाला एक flipper है। Eyes open होकर अंदर जाते हैं तो दोनों तरह numbers काम करते हैं।

Showing पर एक contractor लाएँ। Inspection welcome।

---

Publishing से पहले verify करने वाली Things:
- Oil tank decommissioning timeline (BC में rules हैं)
- City के साथ RT-7 zoning specifics
- Title पर Carport vs garage

---

## 5. Multi-family

### Prompt

```
इस multi-family / investment property के लिए MLS public remarks लिखें।

Property:
- Address या neighborhood: [name]
- Type: [duplex / triplex / fourplex / 5+]
- Total units: [#]
- Total sqft (building): [#]
- Lot: [size]
- Year built: [year]

Unit mix:
- Unit 1: [beds/baths/sqft/current rent या "vacant"]
- Unit 2: [beds/baths/sqft/current rent या "vacant"]
- (सभी units के लिए repeat)

Financials (केवल अगर seller ने sharing approve की हो):
- Gross monthly rent: $[amount]
- Annual expenses: $[amount]
- NOI: $[amount]
- List price पर Cap rate: [%]

Capex / condition:
- [recent updates, deferred maintenance, systems की age]

Tenancy:
- [month-to-month / fixed leases / vacant / mix]

Likely buyer:
- [owner-occupant house-hacker / investor / 1031 buyer / portfolio builder]

Platform: [MLS / commercial multi-family portal]
Character limit: [number]
Tone: investor-focused। Numbers up front। Lifestyle copy skip करें।
```

### Worked example output

**Inputs used:** Hamilton, ON में Triplex। 1962 में built। तीन 2-bed units, हर एक ~750 sqft। Current rents: $1,400 / $1,650 / vacant। Roof 2020, furnaces 2018 (हर unit separately metered), four parking। Likely buyer: existing local portfolio वाला investor।

**Output (MLS commercial, ~180 words):**

Central Hamilton में एक 1962 brick triplex, हर एक roughly 750 square feet के तीन two-bedroom units, gas और hydro के लिए separately metered। Roof 2020 में replaced। तीनों units में Furnaces 2018 में replaced। Rear lane off accessed Four-car off-street parking।

Current unit mix और rent: Unit 1 $1,400 पर occupied (long-term tenant)। Unit 2 $1,650 पर occupied (lease 2025 में renewed)। Unit 3 vacant, area में comparable two-bedroom units के आधार पर market rent $1,750-1,850 अनुमानित।

Market पर stabilized gross: approximately $4,900 monthly। Seller listing agent के through एक full T12 और rent roll provide कर सकता है request पर।

Building पिछले ग्यारह वर्षों से owner-managed है। Maintenance records available। तीन units में से दो के last पाँच वर्षों में cosmetic updates हुए हैं; Unit 1 original condition है।

Local portfolios build कर रहे investors या light landlord duties के साथ comfortable owner-occupants पर targeted। AGI / N12 dynamics: listing agent से पूछें।

---

Publishing से पहले verify करने वाली Things:
- Confirm करें कि seller ने remarks में financials share करने को approve किया
- T12 numbers (unverified NOI list न करें)
- किसी भी unit पर Current Ontario LTB status
- Parking pad legality (कुछ Hamilton lanes restricted हैं)

---

## Common edits जो AI accept करेगा

जब draft वापस आए और आप इसे tune करना चाहें:

- "Adjectives cut करें। हर एक को एक specific से replace करें।"
- "[X] characters तक trim करें। Lead और close रखें।"
- "More direct। Less lifestyle।"
- "[वो feature जो आप mention करना भूले] के बारे में एक line add करें।"
- "Close को softer बनाएँ — कोई exclamation points नहीं।"
- "इसे ऐसे voice करें जैसे मैं कल buyer के साथ property के through walk किया।"

इनमें से हर एक एक noticeably बेहतर second draft produce करेगा। AI एक thin first prompt से generate करने की तुलना में specifics की ओर edit करने में बहुत बेहतर है।
