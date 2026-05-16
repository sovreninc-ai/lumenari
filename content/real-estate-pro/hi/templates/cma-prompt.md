# CMA Prompt + तीन Worked Comp Scenarios

Comparative market analysis prompts जो averages से generated एक single number नहीं, एक defensible price range produce करते हैं। तीन scenarios क्योंकि real listings rarely clean comps के साथ आती हैं।

---

## Master CMA prompt

इसे paste करें। System prompt (`optimization-pack.md`) tone और structure handle करता है; यह AI को वो inputs देता है जो उसे चाहिए।

```
मेरे लिए एक CMA run करें।

Subject property:
- Address या neighborhood: [name]
- Beds / Baths / Sqft / Lot: [details]
- Year built: [year]
- Condition (1-10): [#]
- Notable features जो value affect करते हैं: [list 3-5]

Comparable sales (3-6, last 180 days में sold, ~1 mile के अंदर, similar profile):

Comp 1:
- Address: [name]
- Sold price: $[amount]
- Sold date: [date]
- Beds / Baths / Sqft / Lot / Year: [details]
- Condition: [#]
- DOM: [#]
- Subject से कैसे compare करता है इस पर एक sentence: [text]

Comp 2:
[same structure]

Comp 3:
[same structure]

(जितने आपके पास हैं उतने तक जारी रखें, 6 तक)

Currently active or pending (2-3 अगर available):

Active 1:
- Address: [name]
- List price: $[amount]
- DOM: [#]
- कैसे compare करता है इस पर एक sentence: [text]

(जारी रखें)

My read:
[एक rough guess भी। "मुझे लगता है यह $X से $Y worth है क्योंकि Z।" यह analysis को मेरे judgment पर anchor करता है pure data averaging के बजाय।]

मुझे चाहिए output:
- Price range (low / likely / high)
- Spread explain करते 2-3 sentences
- List price finalize करने से पहले seller से पूछने के लिए 3-5 questions
- Comps में जो भी आपने notice किया वो जो मुझे listing appointment में discuss करने को ready हो कर walk in करना चाहिए
```

---

## Scenario 1: Clean comps, tight spread

आपके पास last 90 days के अंदर 4-5 strong comps हैं, सभी subject के profile के 10% के अंदर। यह easy case है — AI का job है आपके read को confirm करना और एक या दो चीज़ें surface करना जो आपने miss की हो सकती हैं।

### Inputs

**Subject:** 3-bed / 2-bath / 1,640 sqft ranch Sugar Land, TX में। 0.18 acre lot। 1998 में built। Condition 7/10 — recent kitchen, original bathrooms। Two-car garage। Updated HVAC (2022)।

**Comp 1:** Same subdivision, 1,580 sqft, 38 दिन पहले $385,000 पर sold। Similar updates। DOM 14।

**Comp 2:** Adjacent subdivision, 1,700 sqft, 62 दिन पहले $402,000 पर sold। Fully renovated baths (subject नहीं है)। DOM 9।

**Comp 3:** Same subdivision, 1,610 sqft, 71 दिन पहले $379,000 पर sold। Original kitchen। DOM 21।

**Comp 4:** Same subdivision, 1,720 sqft, 22 दिन पहले $398,000 पर sold। Pool। DOM 7।

**Active:** Same subdivision, 1,680 sqft, $409,000 पर listed, market पर 31 days। Fully updated।

**My read:** Probably $388-395K। Pool comp और renovated-bath comp ऊपर pull कर रहे हैं; original-kitchen comp नीचे pull कर रहा है। मैं $390K list सोच रहा हूँ।

### Output (AI को क्या produce करना चाहिए)

```
CMA — Subject: 3/2/1640 ranch, Sugar Land

Comp summary:
- Comp 1 ($385K, 38d ago, 1580 sqft): closest match — sqft के लिए minor downward adjustment
- Comp 2 ($402K, 62d ago, 1700 sqft): renovated baths से ऊपर pull; subject नहीं है
- Comp 3 ($379K, 71d ago, 1610 sqft): older kitchen से नीचे pull; subject updated है
- Comp 4 ($398K, 22d ago, 1720 sqft): pool premium roughly $8-12K; fair compare के लिए remove ≈ $387-390K
- $409K पर Active 1, 31 DOM: ceiling signal — fully updated और sitting

Price range:
- Low: $385,000
- Most likely: $389,000-$392,000
- High: $396,000 (केवल week one में strong showing traffic के साथ)

Explanation: आपका subject cleanly original-kitchen comp और renovated-bath comp के बीच sit करता है, जो exactly वहाँ है जहाँ price land होनी चाहिए। Pool comp missing pool के लिए नीचे adjust होता है। $409K पर active 31 दिन से sitting है — यह एक clear ceiling signal है कि market renovated baths के बिना fully renovated pricing reward नहीं करेगा।

आपका $390K का read well-supported है। मैं round number से just नीचे land करने के लिए $389,900 पर pricing suggest करूँगा, अगर ज़रूरत हो तो $385K तक negotiate करने के लिए room के साथ।

Finalize करने से पहले seller से पूछने के लिए Questions:
1. क्या वे price पर firm हैं या उन्हें एक specific date तक move करना है? वो strategy बदलता है।
2. क्या recently कोई neighbors listed और pulled हुए हैं? Off-market activity matter करती है।
3. क्या वे HVAC documentation (2022 install) pre-list करेंगे? यह Comp 3 vs एक real differentiator है।
4. उनका floor क्या है? Week one से पहले walk-away define करें।
5. क्या वे एक pre-inspection के लिए open हैं? Late-90s builds में Sugar Land slab-on-grade अक्सर buyer inspection के दौरान foundation questions surface करते हैं — इसके आगे जाना back end पर 3-5% बचा सकता है।

Appointment में discuss करने को ready हो कर walk in करें: $409K पर active क्यों sitting है (यह एक pricing ceiling lesson है), और क्या वे live होने से पहले bathrooms या staging में invest करना चाहते हैं।

---
Publishing से पहले verify करने वाली Things:
- अपने market के against pool adjustment estimate confirm करें
- Confirm करें Comp 4 sold price में seller concessions शामिल नहीं थे
```

---

## Scenario 2: Weak comps, फिर भी defensible price

आपके पास एक okay comp, दो stretches हैं, और आपको कल एक listing appointment में walk in करना है। यह hard case है — और AI यहाँ सबसे useful है क्योंकि यह आपको guessing के बजाय adjustments articulate करने पर force करता है।

### Inputs

**Subject:** 5-bed / 4-bath / 3,800 sqft custom contemporary Boulder, CO में एक small enclave में। 0.5 acre lot। 2019 में built। Primary suite और great room से Mountain views। Condition 10/10।

**Comp 1:** Same enclave, 3,600 sqft, 11 महीने पहले $2.45M पर sold। Custom लेकिन older finish (2016 build)। DOM 67।

**Comp 2:** 1.2 miles दूर, 4,100 sqft, 4 महीने पहले $2.95M पर sold। New construction, कोई views नहीं। DOM 41।

**Comp 3:** 0.8 miles दूर, 3,200 sqft, 6 महीने पहले $2.20M पर sold। 2012 build, partial mountain view। DOM 22।

**Active:** Same enclave, 4,000 sqft, $3.1M पर listed, market पर 89 days।

**My read:** Somewhere $2.7M और $2.95M के बीच, लेकिन मैं genuinely नहीं जानता।

### Output

```
CMA — Subject: 5/4/3800 custom contemporary, Boulder

Honest assessment up front: यह एक thin comp set है। Strongest signal Comp 2 है (new construction, 4 months old, $2.95M)। लेकिन Comp 2 में कोई views नहीं हैं और subject में हैं, और Comp 2 8% larger है। बाकी दो comps significant adjustments require करते हैं।

Comp summary:
- Comp 1 ($2.45M, 11 months ago, 3600 sqft): सही enclave लेकिन एक 3-साल पुराना transaction एक ऐसे market में जो move हुआ है; time के लिए roughly 8-12% upward adjust
- Comp 2 ($2.95M, 4 months ago, 4100 sqft): cleanest recent transaction लेकिन views की कमी और 8% larger
- Comp 3 ($2.20M, 6 months ago, 3200 sqft): smaller, older, partial view — केवल directional
- $3.1M पर Active, 89 DOM: एक real ceiling signal — इस enclave में उस pricing का level नौ महीनों में close नहीं हुआ

Price range:
- Low: $2.75M
- Most likely: $2.85M-$2.95M
- High: $3.0M (aggressive — पहले 10 दिन में multiple-offer dynamics require करता है)

Explanation: इस enclave में view premium prior cycles के आधार पर ~5-8% चलता है, जो subject को Comp 2 के साथ parity पर या 8% smaller होने के बावजूद थोड़ा ऊपर रखता है। Aging Comp 1 transaction, जब time-adjusted होती है, थोड़ी smaller और less-updated home के लिए $2.7-2.8M के आस-पास land करती है, जो range के lower end को support करती है। $3.1M पर active वो data point है जो $3.0M से ऊपर pricing के against argue करता है: इसी enclave में एक similar-sized home उस level पर तीन महीनों में buyer नहीं ढूँढ पाया।

Recommendation: $2,895,000 list, $2.75M पर एक defensible floor और $3.0M पर stretch ceiling के साथ केवल अगर Week 1 strong showing volume दिखाए।

Seller से पूछने के लिए Questions:
1. उन्होंने क्या pay किया, कब, और क्या डाला है? यह उनकी expectation anchor करता है।
2. क्या enclave में off-market comps हैं जो मेरे पास access नहीं है? Custom-home owners कभी-कभी जानते हैं।
3. अगर यह 60 दिनों में sell नहीं होता तो वे कितना sit कर सकते हैं? $3.1M पर active 89 days से on है — आपके seller को समझना है यह क्या signal करता है।
4. क्या वे एक Boulder-specific architectural photographer द्वारा professional photography के साथ pre-list करने को willing हैं? इस price point पर matter करता है।
5. उनका walk-away number क्या है? Live होने से पहले define करें।

Appointment में discuss करने को ready हो कर walk in करें: 89-day active और क्यों $3M से ऊपर pricing defend करना hard है; Comp 2 vs key differentiator के रूप में view premium; strategy driver के रूप में seller की timeline।

---
Publishing से पहले verify करने वाली Things:
- Time adjustment factor — Boulder year-over-year sale price index के against confirm करें
- Active comp की history (price reductions? off-market फिर back on?)
- Subject की full materials list — custom contemporaries widely vary करती हैं; spec details premium affect करती हैं
```

---

## Scenario 3: एक trophy comp number pull कर रहा

एक neighbor का घर अभी एक ऐसे number पर sold हुआ जो बाकी comp set को defy करता है। आपके seller ने इसके बारे में सुना है और अब सोचते हैं कि उनका घर same worth है। यहाँ AI का job है आपको एक honest conversation करने में help करना।

### Inputs

**Subject:** 3-bed / 2-bath / 1,900 sqft 1970s split-level एक Toronto neighborhood में। Original kitchen, original baths, oil heat। 30 x 120 lot।

**Comp 1:** सड़क के पार। 3-bed / 3-bath / 2,200 sqft। Fully renovated 2024 (kitchen, two baths, finished basement, new mechanical)। पिछले हफ़्ते $1.85M पर sold। DOM 8।

**Comp 2:** दो blocks दूर। 3-bed / 2-bath / 1,950 sqft। Updated kitchen 2019, original bath। 3 महीने पहले $1.42M पर sold। DOM 28।

**Comp 3:** Same street, चार houses नीचे। 3-bed / 2-bath / 1,820 sqft। Throughout original। 5 महीने पहले $1.31M पर sold। DOM 41।

**Active:** तीन blocks दूर। 4-bed / 3-bath / 2,300 sqft, renovated, $1.95M पर listed, market पर 18 days।

**Seller's read (agent's note):** "Seller ने Comp 1 को $1.85M पर sell होते देखा और $1.79M पर list करना चाहता है।"

### Output

```
CMA — Subject: 3/2/1900 1970s split-level, Toronto

Direct assessment: Comp 1 इस property के लिए comp नहीं है। यह इस property की value है $400K-500K renovation work के बाद।

Comp summary:
- Comp 1 ($1.85M, last week, 2200 sqft, fully renovated 2024): trophy comp। Renovation gap के लिए लगभग $400-500K नीचे adjust, plus sqft delta के लिए और $50-80K। Subject condition में adjusted: ~$1.30M-$1.40M।
- Comp 2 ($1.42M, 3 months ago, 1950 sqft, partial updates): सबसे relevant data point। Subject Comp 2 से less updated है। ~$50-75K नीचे adjust।
- Comp 3 ($1.31M, 5 months ago, 1820 sqft, original): closest condition match। Slightly upward time-adjust; slightly smaller sqft के लिए नीचे adjust। $1.32-1.35M के आस-पास lands।
- $1.95M पर Active (4 bed renovated): directly relevant नहीं — अलग bed count और condition tier।

Price range:
- Low: $1.30M
- Most likely: $1.32M-$1.37M
- High: $1.40M (केवल अगर showing traffic पहले 10 दिनों में strong है, multi-offer dynamics के साथ)

Explanation: Seller ने गलत comp पर anchor किया है। Comp 1 reflects करता है कि similar bones वाला एक renovated home कितने में sells होता है। Subject, original condition में original mechanicals के साथ, $1.30-1.40M range में है — directly Comp 2 और Comp 3 द्वारा supported। $1.79M पर listing उन buyers से showings produce करेगी जो Comp 1 condition expect करते हुए walk in करेंगे और disappointed leave होंगे। यह है कि कैसे houses market पर 60+ दिन sit करते हैं और उस price पर sell होते हैं जिस पर उन्हें start करना चाहिए था, minus price-reduction stigma।

Recommendation: $1,349,000 और $1,389,000 के बीच list करें। Most likely sale price low $1.3Ms में है। अगर seller $1.4M की ओर push करना चाहता है, उन्हें live होने से पहले cosmetic updates (paint, refinish floors, kitchen hardware, light fixtures) पर $20-40K spend करना है।

Seller से पूछने के लिए Questions:
1. क्या वे Comp 1 के through walk कर चुके हैं? अगर नहीं, suggest करें वे करें। Difference visible और tangible है।
2. क्या वे एक 2-week pre-list refresh के लिए open हैं? $20K paint + floors typically $40-60K return करता है।
3. उनकी timeline क्या है? अगर उन्हें 90 दिनों में move करना है, pricing strategy 9 महीनों के मुकाबले अलग है।
4. क्या वे $1.79M पर seller's net (likely 90+ DOM और एक price drop) vs $1.37M priced right (likely 14-21 DOM और possible multi-offer) देखने को willing हैं? Net अक्सर उनके सोचने से closer है।
5. क्या वे $1.79M number से emotionally tied हैं, या neighbor ने एक बार mention किया और stuck हुआ? अलग problem, अलग conversation।

Appointment में discuss करने को ready हो कर walk in करें: Comp 1 पर renovation delta, seller का net math ($400K उनके लिए real money नहीं है), और pre-list refresh option।

---
Publishing से पहले verify करने वाली Things:
- Comp 1 renovation scope और cost (अगर possible हो तो listing agent के साथ confirm करें — कभी-कभी "fully renovated" काम को overstate करता है)
- Subject की lot specifics (क्या 30x120 severance/laneway के लिए zoned है? वो एक value lever है)
- Toronto market — unrenovated stock के लिए days-on-market में recent shifts
```

---

## AI से beyond कब escalate करें

AI एक sharpening tool है। ऐसे time होते हैं जब इसे नीचे रखकर phone उठाना है:

- Estate sales जहाँ heirs असहमत हैं
- Pre-marital या divorce-driven sales (अक्सर एक written letter of opinion चाहिए, CMA chat नहीं)
- Tear-down या land-value scenarios — CMA के ऊपर एक builder's letter लें
- कुछ भी जहाँ subject एक micro-market में sit करता है (एक street, एक building, तीन साल में तीन comps) — एक local appraiser को call करें, AI को नहीं

ऊपर वाला CMA prompt 80% case को faster और अधिक defensible बनाने के लिए meant है। 20% जो actually hard है उसे अभी भी एक human ear चाहिए।
