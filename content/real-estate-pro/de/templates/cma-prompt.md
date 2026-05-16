# CMA-Prompt + drei ausgearbeitete Comp-Szenarios

Comparative-Market-Analysis-Prompts, die eine verteidigbare Preisspanne produzieren, nicht eine einzelne Zahl, generiert aus Averages. Drei Szenarios, weil echte Listings selten mit sauberen Comps kommen.

---

## Der Master-CMA-Prompt

Fügen Sie das ein. Der System-Prompt (`optimization-pack.md`) handhabt Ton und Struktur; das gibt der KI die Inputs, die sie braucht.

```
Lass ein CMA für mich laufen.

Subject Property:
- Adresse oder Neighborhood: [Name]
- Beds / Baths / Sqft / Lot: [Details]
- Baujahr: [Jahr]
- Condition (1-10): [#]
- Notable Features, die den Wert beeinflussen: [3-5 listen]

Comparable Sales (3-6, verkauft in den letzten 180 Tagen, innerhalb von ~1 Meile, ähnliches Profil):

Comp 1:
- Adresse: [Name]
- Sold Price: $[Betrag]
- Sold Date: [Datum]
- Beds / Baths / Sqft / Lot / Year: [Details]
- Condition: [#]
- DOM: [#]
- Ein Satz, wie es zum Subject vergleicht: [Text]

Comp 2:
[Selbe Struktur]

Comp 3:
[Selbe Struktur]

(weiter für so viele, wie Sie haben, bis zu 6)

Currently active or pending (2-3, falls verfügbar):

Active 1:
- Adresse: [Name]
- List-Price: $[Betrag]
- DOM: [#]
- Ein Satz, wie es vergleicht: [Text]

(weiter)

My Read:
[Selbst eine grobe Vermutung. "Ich denke, das ist $X bis $Y wert, weil Z." Das ankert die Analyse an mein Urteil statt purer Daten-Averaging.]

Output, den ich will:
- Preisspanne (Low / Likely / High)
- 2-3 Sätze, die den Spread erklären
- 3-5 Fragen, die dem Verkäufer vor dem Finalisieren des List-Price zu stellen sind
- Alles, was du in den Comps bemerkt hast, was ich in den Listing-Appointment bereit zu diskutieren reingehen sollte
```

---

## Szenario 1: Saubere Comps, enger Spread

Sie haben 4-5 starke Comps aus den letzten 90 Tagen, alle innerhalb von 10% des Subject-Profils. Das ist der einfache Fall — der Job der KI ist es, Ihr Read zu bestätigen und ein oder zwei Dinge zu surfacen, die Sie übersehen haben könnten.

### Inputs

**Subject:** 3-Bed / 2-Bath / 1.640 Sqft Ranch in Sugar Land, TX. 0,18-Acre-Lot. Baujahr 1998. Condition 7/10 — Recent Kitchen, Original Bathrooms. Two-Car-Garage. Updated HVAC (2022).

**Comp 1:** Selbe Subdivision, 1.580 Sqft, verkauft vor 38 Tagen bei $385.000. Ähnliche Updates. DOM 14.

**Comp 2:** Adjacent Subdivision, 1.700 Sqft, verkauft vor 62 Tagen bei $402.000. Fully renovated Baths (Subject ist nicht). DOM 9.

**Comp 3:** Selbe Subdivision, 1.610 Sqft, verkauft vor 71 Tagen bei $379.000. Original-Kitchen. DOM 21.

**Comp 4:** Selbe Subdivision, 1.720 Sqft, verkauft vor 22 Tagen bei $398.000. Pool. DOM 7.

**Active:** Selbe Subdivision, 1.680 Sqft, gelistet bei $409.000, 31 Tage am Markt. Fully updated.

**Mein Read:** Wahrscheinlich $388-395K. Der Pool-Comp und der Renovated-Bath-Comp ziehen hoch; der Original-Kitchen-Comp zieht runter. Ich denke an $390K List.

### Output (was die KI produzieren sollte)

```
CMA — Subject: 3/2/1640 Ranch, Sugar Land

Comp-Summary:
- Comp 1 ($385K, 38d ago, 1580 sqft): closest match — minor downward adjustment for sqft
- Comp 2 ($402K, 62d ago, 1700 sqft): pull up from renovated baths; subject is not
- Comp 3 ($379K, 71d ago, 1610 sqft): pull down from older kitchen; subject is updated
- Comp 4 ($398K, 22d ago, 1720 sqft): pool premium roughly $8-12K; remove for fair compare ≈ $387-390K
- Active 1 at $409K, 31 DOM: ceiling signal — fully updated and sitting

Preisspanne:
- Low: $385,000
- Most likely: $389,000-$392,000
- High: $396,000 (only with strong showing traffic in week one)

Erklärung: Ihr Subject sitzt sauber zwischen dem Original-Kitchen-Comp und dem Renovated-Bath-Comp, was genau dort ist, wo der Preis landen sollte. Der Pool-Comp adjustiert runter für den fehlenden Pool. Der Active bei $409K sitzt seit 31 Tagen — das ist ein klares Ceiling-Signal, dass der Markt Fully-Renovated-Pricing ohne Renovated-Baths nicht belohnen wird.

Ihr Read von $390K ist gut unterstützt. Ich würde vorschlagen, bei $389.900 zu pricen, um knapp unter der runden Zahl zu landen, mit Room zum Verhandeln auf $385K, falls nötig.

Fragen, die dem Verkäufer vor dem Finalisieren zu stellen sind:
1. Sind sie firm beim Preis, oder müssen sie bis zu einem spezifischen Datum umziehen? Das ändert die Strategie.
2. Haben Nachbarn kürzlich gelistet und zurückgezogen? Off-Market-Activity zählt.
3. Werden sie die HVAC-Dokumentation (2022 Install) pre-listen? Es ist ein echter Differentiator vs. Comp 3.
4. Was ist ihr Floor? Definieren Sie Walk-away vor Woche eins.
5. Sind sie offen für eine Pre-Inspection? Sugar Land Slab-on-Grade in Late-90s-Builds surfacen oft Foundation-Fragen während der Käufer-Inspection — vorne weg zu sein kann 3-5% am Backend sparen.

Gehen Sie in den Appointment bereit zu diskutieren: warum der Active bei $409K sitzt (es ist eine Pricing-Ceiling-Lesson), und ob sie in entweder die Bathrooms oder Staging vor dem Live-Gehen investieren wollen.

---
Dinge, die vor dem Veröffentlichen zu verifizieren sind:
- Pool-Adjustment-Estimate gegen Ihren Markt bestätigen
- Bestätigen, dass Comp 4 Sold-Price keine Seller-Concessions inkludierte
```

---

## Szenario 2: Schwache Comps, trotzdem verteidigbarer Preis

Sie haben einen okay Comp, zwei Stretches, und Sie müssen morgen in einen Listing-Appointment gehen. Das ist der schwere Fall — und die KI ist hier am nützlichsten, weil sie Sie zwingt, die Adjustments zu artikulieren, statt zu raten.

### Inputs

**Subject:** 5-Bed / 4-Bath / 3.800 Sqft Custom Contemporary in einer kleinen Enclave in Boulder, CO. 0,5-Acre-Lot. Baujahr 2019. Mountain Views vom Primary-Suite und Great Room. Condition 10/10.

**Comp 1:** Selbe Enclave, 3.600 Sqft, verkauft vor 11 Monaten bei $2,45M. Custom, aber älterer Finish (2016er Build). DOM 67.

**Comp 2:** 1,2 Meilen entfernt, 4.100 Sqft, verkauft vor 4 Monaten bei $2,95M. Neubau, keine Views. DOM 41.

**Comp 3:** 0,8 Meilen entfernt, 3.200 Sqft, verkauft vor 6 Monaten bei $2,20M. 2012er Build, Partial Mountain View. DOM 22.

**Active:** Selbe Enclave, 4.000 Sqft, gelistet bei $3,1M, 89 Tage am Markt.

**Mein Read:** Irgendwo zwischen $2,7M und $2,95M, aber ich weiß es ehrlich nicht.

### Output

```
CMA — Subject: 5/4/3800 Custom Contemporary, Boulder

Ehrliche Einschätzung vorne weg: das ist ein dünnes Comp-Set. Das stärkste Signal ist Comp 2 (Neubau, 4 Monate alt, $2,95M). Aber Comp 2 hat keine Views und das Subject hat sie, und Comp 2 ist 8% größer. Die anderen zwei Comps benötigen signifikante Adjustments.

Comp-Summary:
- Comp 1 ($2,45M, 11 months ago, 3600 sqft): right enclave but 3-year-old transaction in a market that has moved; adjust upward roughly 8-12% for time
- Comp 2 ($2,95M, 4 months ago, 4100 sqft): cleanest recent transaction but lacks views and is 8% larger
- Comp 3 ($2,20M, 6 months ago, 3200 sqft): smaller, older, partial view — directional only
- Active at $3,1M, 89 DOM: a real ceiling signal — that level of pricing in this enclave has not closed in nine months

Preisspanne:
- Low: $2,75M
- Most likely: $2,85M-$2,95M
- High: $3,0M (aggressiv — erfordert Multiple-Offer-Dynamics in den ersten 10 Tagen)

Erklärung: Das View-Premium in dieser Enclave läuft ~5-8% basierend auf Prior-Cycles, was das Subject auf Parity mit Comp 2 oder leicht darüber bringt, trotz 8% kleiner zu sein. Die alternde Comp-1-Transaktion, wenn time-adjustiert, landet um $2,7-2,8M für ein leicht kleineres und weniger updated Haus, was das Lower-End der Range unterstützt. Der Active bei $3,1M ist der Data-Point, der gegen Pricing über $3,0M argumentiert: ein ähnlich-großes Haus in derselben Enclave hat in drei Monaten bei diesem Level keinen Käufer gefunden.

Empfehlung: $2.895.000 List, mit einem verteidigbaren Floor bei $2,75M und einem Stretch-Ceiling bei $3,0M nur, falls Woche 1 starkes Showing-Volumen zeigt.

Fragen an den Verkäufer:
1. Was haben sie bezahlt, wann, und was haben sie reingesteckt? Das ankert ihre Erwartung.
2. Gibt es Comps off-market in der Enclave, zu denen ich keinen Zugang habe? Custom-Home-Owners wissen manchmal.
3. Wie lange können sie sitzen, falls es in 60 Tagen nicht verkauft? Der Active bei $3,1M ist 89 Tage drauf — Ihr Verkäufer muss verstehen, was das signalisiert.
4. Sind sie willens, mit professioneller Fotografie von einem Boulder-spezifischen Architectural-Photographer pre-zu-listen? Es zählt bei diesem Price-Point.
5. Was ist ihre Walk-away-Nummer? Definieren Sie es vor dem Live-Gehen.

Gehen Sie in den Appointment bereit zu diskutieren: den 89-tägigen Active und warum Pricing über $3M schwer zu verteidigen ist; das View-Premium als Key-Differentiator vs. Comp 2; das Timeline des Verkäufers als Strategie-Driver.

---
Dinge, die vor dem Veröffentlichen zu verifizieren sind:
- Time-Adjustment-Factor — gegen Boulder Year-over-Year Sale-Price-Index bestätigen
- Active-Comp's-History (Price-Reductions? Off-Market dann wieder on?)
- Subject's-full-Materials-List — Custom-Contemporaries variieren weit; Spec-Details beeinflussen das Premium
```

---

## Szenario 3: Ein Trophy-Comp, der die Zahl zieht

Das Haus eines Nachbarn hat gerade für eine Zahl verkauft, die dem Rest des Comp-Sets trotzt. Ihr Verkäufer hat davon gehört und denkt jetzt, dass sein Haus dasselbe wert ist. Der Job der KI hier ist es, Ihnen zu helfen, die ehrliche Konversation zu haben.

### Inputs

**Subject:** 3-Bed / 2-Bath / 1.900 Sqft 1970er Split-Level in einer Toronto-Neighborhood. Original-Kitchen, Original-Baths, Oil-Heat. 30 x 120 Lot.

**Comp 1:** Auf der anderen Straßenseite. 3-Bed / 3-Bath / 2.200 Sqft. Fully renovated 2024 (Kitchen, zwei Baths, Finished-Basement, neue Mechanicals). Verkauft letzte Woche bei $1,85M. DOM 8.

**Comp 2:** Zwei Blocks entfernt. 3-Bed / 2-Bath / 1.950 Sqft. Updated Kitchen 2019, Original Bath. Verkauft vor 3 Monaten bei $1,42M. DOM 28.

**Comp 3:** Selbe Straße, vier Häuser weiter. 3-Bed / 2-Bath / 1.820 Sqft. Original durchgängig. Verkauft vor 5 Monaten bei $1,31M. DOM 41.

**Active:** Drei Blocks entfernt. 4-Bed / 3-Bath / 2.300 Sqft, renoviert, gelistet bei $1,95M, 18 Tage am Markt.

**Seller's Read (die Note des Agenten):** "Verkäufer hat Comp 1 bei $1,85M verkaufen sehen und will bei $1,79M listen."

### Output

```
CMA — Subject: 3/2/1900 1970er Split-Level, Toronto

Direkte Einschätzung: Comp 1 ist kein Comp für diese Property. Es ist der Wert dieser Property NACH $400K-500K Renovation-Work.

Comp-Summary:
- Comp 1 ($1,85M, letzte Woche, 2200 sqft, fully renovated 2024): der Trophy-Comp. Adjustiert runter um ungefähr $400-500K für die Renovation-Gap, plus weitere $50-80K für Sqft-Delta. Adjusted zur Subject-Condition: ~$1,30M-$1,40M.
- Comp 2 ($1,42M, 3 months ago, 1950 sqft, partial updates): der relevanteste Data-Point. Subject ist weniger updated als Comp 2. Adjustieren runter ~$50-75K.
- Comp 3 ($1,31M, 5 months ago, 1820 sqft, original): closest Condition-Match. Time-adjustieren leicht hoch; adjustieren runter für leicht kleinere Sqft. Landet um $1,32-1,35M.
- Active at $1,95M (4 bed renovated): nicht direkt relevant — andere Bed-Count und Condition-Tier.

Preisspanne:
- Low: $1,30M
- Most likely: $1,32M-$1,37M
- High: $1,40M (nur falls Showing-Traffic in den ersten 10 Tagen stark ist, mit Multi-Offer-Dynamics)

Erklärung: Der Verkäufer hat zum falschen Comp angekert. Comp 1 reflektiert, was ein renovated Home ähnlicher Bones verkauft. Das Subject, in Original-Condition mit Original-Mechanicals, ist in der $1,30-1,40M-Range — direkt unterstützt von Comp 2 und Comp 3. Listing bei $1,79M wird Showings von Käufern produzieren, die mit Comp-1-Condition-Erwartung reinlaufen und enttäuscht rausgehen. So sitzen Häuser 60+ Tage am Markt und enden damit, beim Preis zu verkaufen, mit dem sie hätten starten sollen, minus der Price-Reduction-Stigma.

Empfehlung: Listen zwischen $1.349.000 und $1.389.000. Der wahrscheinlichste Sale-Price ist in den niedrigen $1,3M. Falls der Verkäufer Richtung $1,4M pushen will, müssen sie $20-40K in Cosmetic-Updates (Paint, Refinish-Floors, Kitchen-Hardware, Light-Fixtures) vor dem Live-Gehen ausgeben.

Fragen an den Verkäufer:
1. Sind sie durch Comp 1 gegangen? Falls nicht, schlagen Sie vor, dass sie es tun. Der Unterschied ist sichtbar und greifbar.
2. Sind sie offen für einen 2-Wochen-Pre-List-Refresh? $20K Paint + Floors returnt typischerweise $40-60K.
3. Was ist ihre Timeline? Falls sie in 90 Tagen umziehen müssen, ist die Pricing-Strategy anders, als wenn sie 9 Monate haben.
4. Sind sie willens, sich den Seller-Net bei $1,79M anzusehen (wahrscheinlich 90+ DOM und ein Price-Drop) vs $1,37M richtig gepriced (wahrscheinlich 14-21 DOM und möglicherweise Multi-Offer)? Der Net ist oft näher als sie denken.
5. Sind sie emotional an die $1,79M-Nummer gebunden, oder hat der Nachbar es einmal erwähnt und es ist hängen geblieben? Anderes Problem, andere Konversation.

Gehen Sie in den Appointment bereit zu diskutieren: das Renovation-Delta auf Comp 1, die Net-Math des Verkäufers (die $400K sind kein echtes Geld für sie), und die Pre-List-Refresh-Option.

---
Dinge, die vor dem Veröffentlichen zu verifizieren sind:
- Comp 1 Renovation-Scope und Cost (mit Listing-Agent bestätigen, falls möglich — manchmal überzeichnet "fully renovated" die Arbeit)
- Subject's-Lot-Spezifika (ist die 30x120 für Severance/Laneway gezont? Das ist ein Wert-Hebel)
- Toronto-Markt — Recent-Shifts in Days-on-Market für Unrenovated-Stock
```

---

## Wann über die KI hinaus zu eskalieren

Die KI ist ein Schärf-Tool. Es gibt Zeiten, sie hinzulegen und das Telefon zu greifen:

- Estate-Sales, wo die Erben uneinig sind
- Pre-Marital- oder Divorce-Driven-Sales (brauchen oft einen schriftlichen Letter of Opinion, kein CMA-Chat)
- Tear-Down- oder Land-Value-Szenarios — bekommen Sie einen Builder's-Letter zusätzlich zum CMA
- Alles, wo das Subject in einem Micro-Markt sitzt (eine Straße, ein Building, drei Comps in drei Jahren) — rufen Sie einen lokalen Appraiser, nicht die KI

Der CMA-Prompt oben ist gemeint, um den 80%-Fall schneller und verteidigbarer zu machen. Die 20%, die wirklich schwer sind, brauchen immer noch ein menschliches Ohr.
