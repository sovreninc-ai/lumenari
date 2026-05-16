# Listing-Descriptions nach Property-Typ

Fünf Property-Typen, fünf Prompt-Templates, fünf ausgearbeitete Beispiel-Outputs. Nutzen Sie den Prompt wie er ist oder als Ausgangspunkt. Die ausgearbeiteten Beispiele zeigen Ihnen, wie gut aussieht, bevor Sie Ihre eigenen generieren.

---

## Wie diese Datei zu nutzen

1. Finden Sie den Property-Typ, der zu Ihrem Listing passt
2. Kopieren Sie den Prompt-Block
3. Ersetzen Sie die eingeklammerten Inputs durch die Details Ihrer Property
4. Fügen Sie in Ihr KI-Tool ein (nachdem Sie `optimization-pack.md` als System-Prompt geladen haben)
5. Vergleichen Sie gegen das ausgearbeitete Beispiel, um den Output zu gut-checken

Der System-Prompt erledigt die schwere Arbeit an Struktur, Ton und Fair-Housing-Compliance. Diese Templates geben der KI nur die spezifischen Inputs, die sie für jeden Property-Typ braucht.

---

## 1. Single-Family-Home (SFH)

### Prompt

```
Schreibe MLS-Public-Remarks für dieses Single-Family-Home.

Property:
- Adresse oder Neighborhood: [Name]
- Beds: [#] / Baths: [#] / Sqft: [#] / Lot: [Size]
- Baujahr: [Jahr]
- Style: [Craftsman / Colonial / Ranch / Contemporary / etc.]
- Condition: [Move-in / lightly updated / fully renovated / needs work]

Features, die zählen (die Dinge, die ein Käufer tatsächlich bemerken würde):
- [Feature 1 — spezifisch, nicht "amazing"]
- [Feature 2]
- [Feature 3]
- [Feature 4]
- [Feature 5]

Mechanical / Updates (Jahr, falls Sie es haben):
- [HVAC, Roof, Windows, Electrical, Plumbing — listen Sie, was recent ist]

Outdoor:
- [Yard, Deck, Patio, Garage, Parking, Fencing]

Location-Spezifika:
- [Walking-Distanz zu X, Y Minuten zur Downtown, School-District-Name]

Wahrscheinlicher Käufer:
- [Seien Sie spezifisch — "Move-up-Couple mit einem Kind und einem Hund, Hybrid-WFH"]

Plattform: [US MLS / Realtor.ca / Zillow / Redfin]
Zeichen-Limit: [Nummer]
```

### Ausgearbeiteter Beispiel-Output

**Genutzte Inputs:** 4 Bed / 2,5 Bath / 2.180 Sqft Craftsman in Bridgeland (Calgary), Baujahr 2009, leicht aktualisierte Küche 2023, auf einem 0,14-Acre-Lot. Wolf Range, Butcher-Block-Island, Finished-Basement mit Separate-Entrance, South-facing Deck, Double-Detached-Garage. 7-Minuten-Walk zur LRT. Move-up-Familie aus einem Townhouse.

**Output (Realtor.ca, ~250 Wörter):**

A 2009 Craftsman that's been thoughtfully kept, sitting on a quiet stretch of Bridgeland a seven-minute walk from the LRT. The 2023 kitchen update did the work that actually matters — Wolf gas range, butcher block island, soft-close cabinets — without losing the warmth of the original layout. Hardwood runs through the main floor, with sight lines from the kitchen through to the south-facing deck.

Upstairs holds four bedrooms, including a primary with a walk-in closet and a three-piece ensuite. The basement is fully finished with a separate entrance off the side of the house, which opens up nanny-suite or extended-stay options depending on what you need.

The lot is just over 6,000 square feet, fully fenced, with a double detached garage off the back lane. Newer roof (2021), high-efficiency furnace, and central A/C. South exposure on the back means the deck catches sun from late morning through early evening — good for the dog, good for the garden, good for a coffee on a Saturday.

Bridgeland needs little introduction: short walk to OEB, Lukes, and the river pathways; transit to downtown in under fifteen minutes. Inglewood and East Village are an easy bike ride. Schools are zoned to Langevin and Crescent Heights — buyer to confirm current boundaries with CBE.

---

Dinge, die vor dem Veröffentlichen zu verifizieren sind:
- Roof-Jahr (2021)
- HVAC-Alter
- Aktuelle School-Boundary mit CBE

---

## 2. Condo / Townhouse

### Prompt

```
Schreibe MLS-Public-Remarks für diesen Condo oder Townhouse.

Property:
- Building-Name / Complex: [Name]
- Unit-Typ: [Condo / Townhouse / Loft / Penthouse]
- Beds: [#] / Baths: [#] / Sqft: [#]
- Baujahr: [Jahr]
- Floor: [# von #]
- Exposure: [N/S/E/W]

Features:
- [Feature 1]
- [Feature 2]
- [Feature 3]
- [Feature 4]

Building-Amenities (nur welche listen, die der Käufer cares about):
- [Gym / Pool / Concierge / Rooftop / Parking / Storage / pet-friendly mit Restrictions]

Fees:
- HOA / Condo-Fee: $[Betrag] / Monat — was es covert
- Property-Tax: $[Betrag] / Jahr (falls Sie es haben; ansonsten [CONFIRM])

Location:
- [Walking-Distanz zu X, Transit, Neighborhood-Feel]

Wahrscheinlicher Käufer:
- [First-time Käufer, Downsizer, Investor, Urban Professional]

Plattform: [MLS]
Zeichen-Limit: [Nummer]
```

### Ausgearbeiteter Beispiel-Output

**Genutzte Inputs:** 2 Bed / 2 Bath / 985 Sqft Condo, 14. Floor, South-East-Exposure, in einem 2017er Building in Downtown Austin. Neue Stainless-Appliances, Quartz-Counters, In-Unit-Laundry. Building hat Gym, Rooftop-Pool, 24-hr Concierge. HOA $640/Monat inkludiert Water, Gas, Amenities. Wahrscheinlicher Käufer: Urban Professional, erstes Downtown-Condo, Walks zum Office.

**Output (US MLS, ~150 Wörter):**

A southeast-facing two-bedroom on the fourteenth floor of a 2017 high-rise — sunrise light in the bedroom, downtown views from the living room, both at once if you're lucky with the season. Open plan with quartz counters, stainless appliances, and an island that seats three. Both bedrooms are real bedrooms, not one-and-a-flex; the second has a window and a proper closet.

In-unit laundry, one assigned garage spot, separate storage unit. Building amenities run the standard list — rooftop pool, gym, twenty-four-hour concierge — and the location puts you a six-minute walk to Congress, eight to Whole Foods, fifteen to the trail head at Lady Bird.

HOA $640/month covers water, gas, and amenity access. Pet-friendly with weight restrictions.

---

Dinge, die vor dem Veröffentlichen zu verifizieren sind:
- Property-Tax (nicht bereitgestellt)
- Genaues Pet-Weight-Limit
- Storage-Unit-Dimensions

---

## 3. Luxury

### Prompt

```
Schreibe MLS-Public-Remarks für diese Luxury-Property.

Property:
- Adresse oder Neighborhood: [Name]
- Typ: [Estate / Penthouse / Waterfront / New Construction]
- Beds: [#] / Baths: [#] / Sqft: [#] / Lot: [Size]
- Baujahr: [Jahr] (oder "Custom Build, fertiggestellt [Jahr]")
- Architect / Builder: [Name, falls notable]

Das einzelne Feature, das diese Property ausmacht:
- [Die eine Sache — der View, der Architect, die Location, die Privacy, das Lake-Frontage]

Drei bis fünf andere notable Spezifika:
- [Feature, mit Brand oder Detail]
- [Feature]
- [Feature]
- [Feature]

Outdoor / Land:
- [Acreage, Water-Frontage, Views, Garden, Pool, Outbuildings]

Smart / Mechanical:
- [Home-Automation, Geothermal, Solar, EV, etc.]

Location-Spezifika:
- [Privacy, Nähe zum Airport, Schulen, Town]

Wahrscheinlicher Käufer:
- [Second-Home-Käufer, Executive-Relocation, Familie, die von $X auf $Y upgradet]

Plattform: [MLS / Luxury-Portal / Brokerage-Site]
Wort-Target: 250-400 Wörter (Luxury läuft länger)
```

### Ausgearbeiteter Beispiel-Output

**Genutzte Inputs:** 5 Bed / 5,5 Bath / 6.200 Sqft Custom-Home in Whistler Cadenza vom Architect Patkau Associates, fertiggestellt 2021, auf 0,42 Acres, das auf Whistler Creek anstößt. Geothermal-Heating, Full-Lutron-Lighting, Indoor-Lap-Pool, Four-Car-Garage mit EV, Ski-in zu Creekside. Wahrscheinlicher Käufer: Second-Home-Käufer aus Vancouver oder West-Coast US.

**Output (Luxury-Portal, ~350 Wörter):**

A Patkau Associates design completed in 2021, set on a 0.42-acre Cadenza lot that backs directly onto Whistler Creek with ski-in access to Creekside. The house is a study in what a contemporary mountain home can be when the architects are given room to work — long cedar runs, full-height glazing oriented to the creek and the ridge, a primary suite that opens onto a private deck above the water.

Six thousand two hundred square feet across three levels. Five bedrooms, each with ensuite. The kitchen is anchored by a Sub-Zero column refrigerator and freezer, a Wolf range with two ovens, and a butler's pantry that holds a second dishwasher and prep sink. Great room with a Stuv wood-burning fireplace and twenty-foot ceilings.

The lower level holds an indoor lap pool with a glass wall to the creek, a four-piece pool bath, a media room wired for Atmos, and a bunk room that sleeps six. Wine cellar off the entry hall. Full Lutron lighting, Crestron AV, geothermal heating with in-floor radiant throughout, and an HRV system that's been balanced for the elevation.

Four-car heated garage, two EV chargers, and a covered drop-off for arrival. Ski room with boot dryers and a dedicated entrance to the locker level. Mature landscaping with established trees on three sides — the privacy here is rare even by Cadenza standards.

Creekside Gondola is a four-minute walk via the trail at the back of the property. Whistler Village is six minutes by car, the airport is two hours, Vancouver is an hour forty-five.

A house designed for a buyer who wants the architecture to be part of the asset.

---

Dinge, die vor dem Veröffentlichen zu verifizieren sind:
- Bestätigen, dass die Architect-Attribution-Sprache okay zum Veröffentlichen ist (manche Firmen haben Credit-Guidelines)
- HOA / Strata-Fee, falls anwendbar
- Property-Tax (nicht bereitgestellt)
- Genauer Ski-in-Path-Status (Creek-Crossing seasonal?)

---

## 4. Fixer-Upper

### Prompt

```
Schreibe MLS-Public-Remarks für diesen Fixer-Upper.

Property:
- Adresse oder Neighborhood: [Name]
- Beds: [#] / Baths: [#] / Sqft: [#] / Lot: [Size]
- Baujahr: [Jahr]
- Condition: [Needs Cosmetic / Needs Systems / Structural Concerns]

Was solid ist (verstecken Sie nicht, was funktioniert):
- [Foundation, Roof, Bones, Lot, Location, Mechanical, das recent ist]

Was Arbeit braucht (seien Sie direkt — Käufer werden es sowieso sehen):
- [Listen Sie ehrlich auf]

Comp-ARV-Signal:
- [Recent Renos in der Area verkauft bei $X / Sqft — das informiert die Math des Käufers]

Wahrscheinlicher Käufer:
- [Flipper, Sweat-Equity-Owner-Occupant, Builder, Contractor's Family]

Plattform: [MLS]
Zeichen-Limit: [Nummer]
Ton: matter-of-fact, keine Euphemismen. "Needs paint and flooring" ist okay. "Bring your imagination" ist nicht.
```

### Ausgearbeiteter Beispiel-Output

**Genutzte Inputs:** 3 Bed / 1 Bath / 1.150 Sqft 1958er Bungalow in East Vancouver, 33 x 122 Lot. Original-Kitchen, Original-Bath, Oil-Heat (Tank above ground, recent), Roof done 2019, Foundation dry. Recent Renos auf der Straße verkaufen bei $1,8M+. Wahrscheinlicher Käufer: Builder oder Sweat-Equity-Owner-Occupant.

**Output (US MLS, ~180 Wörter):**

A 1958 bungalow on a flat 33 x 122 lot, ready for the next owner to put work into it. The roof was replaced in 2019. The foundation is dry. Oil heat, with the tank above ground and inspected last year. The kitchen and bathroom are original. Floors are original hardwood under the carpet in the main rooms.

Three bedrooms up, an unfinished basement with separate entry potential, single carport. Lot is RT-7 zoned with side yard access for trades.

The bones are the value here. Recent renovations on the same block have sold north of $1.8M. The next owner is either a builder taking it to studs, a contractor's family making it their first East Van project, or a flipper with a clear scope. Numbers work either way if you go in with eyes open.

Bring a contractor to the showing. Inspection welcome.

---

Dinge, die vor dem Veröffentlichen zu verifizieren sind:
- Oil-Tank-Decommissioning-Timeline (BC hat Regeln)
- RT-7-Zoning-Spezifika mit City
- Carport vs. Garage on Title

---

## 5. Multi-Family

### Prompt

```
Schreibe MLS-Public-Remarks für diese Multi-Family / Investment-Property.

Property:
- Adresse oder Neighborhood: [Name]
- Typ: [Duplex / Triplex / Fourplex / 5+]
- Total-Units: [#]
- Total-Sqft (Building): [#]
- Lot: [Size]
- Baujahr: [Jahr]

Unit-Mix:
- Unit 1: [Beds/Baths/Sqft/Current-Rent oder "vacant"]
- Unit 2: [Beds/Baths/Sqft/Current-Rent oder "vacant"]
- (wiederholen für alle Units)

Financials (nur falls Verkäufer das Teilen approved hat):
- Gross-Monthly-Rent: $[Betrag]
- Annual-Expenses: $[Betrag]
- NOI: $[Betrag]
- Cap-Rate bei List-Price: [%]

Capex / Condition:
- [Recent Updates, Deferred Maintenance, Alter der Systems]

Tenancy:
- [Month-to-Month / Fixed Leases / Vacant / Mix]

Wahrscheinlicher Käufer:
- [Owner-Occupant-House-Hacker / Investor / 1031-Käufer / Portfolio-Builder]

Plattform: [MLS / Commercial-Multi-Family-Portal]
Zeichen-Limit: [Nummer]
Ton: investor-focused. Numbers up front. Skip Lifestyle-Copy.
```

### Ausgearbeiteter Beispiel-Output

**Genutzte Inputs:** Triplex in Hamilton, ON. Baujahr 1962. Drei 2-Bed-Units, ~750 Sqft jede. Aktuelle Rents: $1.400 / $1.650 / Vacant. Roof 2020, Furnaces 2018 (jede Unit separately metered), Four-Parking. Wahrscheinlicher Käufer: Investor mit bestehendem lokalem Portfolio.

**Output (MLS Commercial, ~180 Wörter):**

A 1962 brick triplex in central Hamilton, three two-bedroom units of roughly 750 square feet each, separately metered for gas and hydro. Roof replaced 2020. Furnaces replaced 2018 across all three units. Four-car off-street parking accessed off the rear lane.

Current unit mix and rent: Unit 1 occupied at $1,400 (long-term tenant). Unit 2 occupied at $1,650 (lease renewed 2025). Unit 3 vacant, market rent estimated at $1,750-1,850 based on comparable two-bedroom units in the area.

Stabilized gross at market: approximately $4,900 monthly. Seller can provide a full T12 and rent roll on request through the listing agent.

Building has been owner-managed for the last eleven years. Maintenance records available. Two of three units have had cosmetic updates within the last five years; Unit 1 is original condition.

Targeted at investors building local portfolios or owner-occupants comfortable with light landlord duties. AGI / N12 dynamics: ask the listing agent.

---

Dinge, die vor dem Veröffentlichen zu verifizieren sind:
- Bestätigen, dass Verkäufer das Teilen von Financials in Remarks approved hat
- T12-Zahlen (listen Sie keine unverified NOI)
- Aktueller Ontario-LTB-Status auf jeder Unit
- Parking-Pad-Legalität (manche Hamilton-Lanes sind restricted)

---

## Häufige Edits, die die KI akzeptieren wird

Wenn der Draft zurückkommt und Sie ihn tunen wollen:

- "Cut die Adjektive. Ersetze jedes mit einer Spezifik."
- "Trim auf [X] Zeichen. Behalte den Lead und den Close."
- "Direkter. Weniger Lifestyle."
- "Füge eine Zeile über [Feature, das Sie zu erwähnen vergessen haben] hinzu."
- "Mach den Close sanfter — keine Ausrufezeichen."
- "Vermittle das, als wäre ich gestern mit dem Käufer durch die Property gegangen."

Jedes davon wird einen merklich besseren Second-Draft produzieren. Die KI ist viel besser darin, in Richtung Spezifika zu editieren, als sie aus einem dünnen First-Prompt zu generieren.
