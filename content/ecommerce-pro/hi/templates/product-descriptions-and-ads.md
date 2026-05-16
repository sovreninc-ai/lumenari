# Product Descriptions + Ad Copy

Category द्वारा product descriptions, platform द्वारा ad copy, character limits enforced। एक session में ship करने के लिए designed — PDP लिखें, फिर same hour में ad set run करें।

---

## Product description prompt

```
आप एक Shopify PDP के लिए एक product description लिख रहे हैं।

Product:
- Name: [name]
- Category: [apparel / home / beauty / food / supplements / kids /
  electronics / accessories]
- यह क्या है (एक sentence): [paste]
- Key materials / ingredients / specs: [3-5 things list करें जो buyer
  को matter करते हैं]
- Size / weight / variant info: [अगर relevant]
- Price: [$X]

Brand context:
- आप किसको sell करते हैं: [audience एक sentence में]
- Voice notes: [3-5 notes brand कैसे बोलता है — short sentences, direct,
  warm, no slang, etc.]
- कुछ off-limits: [claims जो आप नहीं बना सकते, words जो आपका brand
  use नहीं करता, etc.]

Angle: [efficacy / luxury / value / produce-all-three]

Length: [short 50-80w / standard 80-150w / long 150-300w]

Constraints:
- Include: [specific certifications, materials, mandatory कुछ भी]
- Avoid: [आपके brand के लिए banned words]

Description को standard structure में output करें:
1. Hook (10-25 words)
2. Key benefit (1 sentence)
3. Features (3-5 bullets)
4. Social proof line (optional)
5. CTA (1 line)
```

---

## Category द्वारा Worked examples

### Apparel — merino base layer, $89

**Brand context:** Performance outdoor brand। Direct, technical-friendly voice। Audience: 30-45 year-old hikers, skiers, cyclists जो gear research करते हैं।

**Efficacy angle:**
> Merino जो wash की ज़रूरत होने से पहले एक हफ्ते के use को handle करता है।
>
> 18.5-micron New Zealand merino, 230 gsm पर knit — next-to-skin comfort के लिए काफी fine, damp होने पर warmth retain करने के लिए काफी dense। Multi-day trips के लिए built जहाँ laundry option नहीं है।
>
> - 18.5-micron merino, 230 gsm
> - Flatlock seams, pack straps के तहत कोई shoulder rub नहीं
> - Cuffs पर thumb loops
> - Tagless neck, gusseted underarm
>
> Active use के 5-7 days के लिए odor-free wears। Hand-wash cold।
>
> $89 | XS-XXL | 1-2 business days में Ships

### Home — beeswax candle, $24

**Brand context:** Small-batch home goods brand। Warm, low-key voice। Audience: 28-50 year olds जो अपना पहला या दूसरा home furnish कर रहे हैं, natural materials prefer करते हैं।

**Value angle (price point से matching — luxury angle false feel करेगा):**
> Beeswax, cotton wick, 50-hour burn time। $24।
>
> एक simple beeswax candle। कोई fragrance oils, कोई soy blends, कोई fancy vessel नहीं। Clean और slow burns करता है, faintly honey की smell, dinner के दूसरे half के लिए एक kitchen table across warm light throws।
>
> - 100% beeswax, BC से sourced
> - Cotton wick (कोई metal core नहीं)
> - ~50-hour burn time
> - Reusable ceramic vessel, 8oz
>
> 30 के batches में Made। हर month के पहले Friday Restocks।
>
> $24 | $40 के ऊपर Free shipping

### Beauty — vitamin C serum, $58

**Brand context:** Mid-range skincare brand। Specific, confident voice। Audience: skincare-literate adults 28-45।

**Efficacy angle:**
> 15% L-ascorbic acid, dated bottles में fresh-packed।
>
> एक daily vitamin C serum इसके सबसे studied form में — 15% पर L-ascorbic acid, इसे stabilize करने के लिए ferulic acid और vitamin E के साथ paired। Brightens, tone evens, और SPF के तहत works।
>
> - 15% L-ascorbic acid (pH 3.2)
> - 1% ferulic acid + 1% vitamin E
> - उस हफ्ते Bottled जब यह ships — हर bottle dated
> - Glass dropper, amber bottle (light-stable)
>
> AM use करें, 4-5 drops, moisturizer और SPF से पहले। Daily use पर 12-week supply।
>
> $58 | 30ml | $50 के ऊपर Free shipping

### Food — single-origin coffee, $22

**Brand context:** Specialty coffee roaster। Plainspoken voice। Audience: home espresso drinkers, pour-over crowd, gift buyers।

**Efficacy angle (जहाँ efficacy मतलब: आपको बताता है इसका taste क्या है):**
> Ethiopia Guji, washed process, lot 24।
>
> Guji region से एक washed Ethiopia — bright, floral, उस तरह का cup जो V60 में या espresso के रूप में अच्छा hold करता है। Medium के lighter side को roasted।
>
> - Single-origin: Guji, Ethiopia
> - Washed process
> - Tasting notes: bergamot, white grape, jasmine
> - Roasted: ship होने के एक दिन पहले
> - Whole bean या आपके grinder को ground
>
> 250g bag। Roast date के 4-6 weeks के अंदर Best।
>
> $22 | $40 के ऊपर Free shipping

### Supplements — magnesium glycinate, $36

**Brand context:** Functional supplement brand। Direct, no-fluff voice। Audience: 28-50 adults जो labels पढ़ते हैं।

**Efficacy angle (और claims discipline का एक worked example):**
> Chelated magnesium glycinate का 400mg। कोई filler नहीं।
>
> Digestion पर सबसे gentle form में एक daily magnesium supplement — glycinate, absorption के लिए fully chelated। दो capsules elemental magnesium का 400mg deliver करते हैं।
>
> - 2-capsule serving per 400mg elemental magnesium (as glycinate)
> - Purity के लिए Third-party tested
> - कोई fillers, कोई stearates, कोई titanium dioxide नहीं
> - Per bottle 90 capsules (45-day supply)
>
> Dinner के साथ 1-2 capsules लें। अगर आपको kidney conditions हैं तो एक healthcare provider से consult करें।
>
> $36 | $50 के ऊपर Free shipping

**इस पर Note:** description "improves sleep," "reduces anxiety," या "supports recovery" नहीं कहती। ये structure-function claims हैं जिन्हें India में Drugs and Magic Remedies Act-aware framing चाहिए। Kit descriptive language पर defaults होती है।

---

## Ad copy templates

ज़्यादातर Shopify owners actually चलाते उन platforms के लिए built।

### Meta ad set prompt

```
आप के लिए एक Meta ad set (Facebook + Instagram) लिख रहे हैं:

Product: [name + 1-sentence description]
Brand: [3-5 brand voice notes]
Goal: [cold traffic / retargeting / launch / promo]
Promo (अगर कोई): [offer paste करें]
Audience: [यह ad target करता persona — एक sentence]

Output:
- 3 primary text variants (हर एक 125 chars optimal — char count state करें)
- 3 headline variants (हर एक 40 chars max — char count state करें)
- 1 description variant (30 chars max — char count state करें)

Constraints:
- कोई banned words (transform, elevate, unlock, luxe, etc.) नहीं
- पहले 7-10 words में Hook (mobile पर "See more" line के ऊपर)
- एक clear next step
```

**Worked example — moisturizer cold traffic:**

```
Primary text 1 (118 chars):
Ceramides do the work most moisturizers fake. Daily ceramide moisturizer, fragrance-free, $32. Free shipping $50+.

Primary text 2 (123 chars):
The moisturizer you stop reordering only because you've simplified everything else. Fragrance-free, $32. Link below.

Primary text 3 (109 chars):
3 ceramide types, niacinamide, squalane. No fragrance, no dye. $32. Built for skin that's been over-stripped.

Headline 1 (33 chars):
Ceramide moisturizer, $32

Headline 2 (38 chars):
The one that lives on the counter

Headline 3 (28 chars):
Fragrance-free. That's it.

Description (28 chars):
50ml. Free ship $50+.
```

### Google Ads prompt

```
आप के लिए Google Responsive Search Ads लिख रहे हैं:

Product: [name + 1-sentence description]
Search intent: [user क्या search कर रहा है जब वे यह ad देखें]
Targeted Keywords: [3-5 list करें]
Promo (अगर कोई): [offer paste करें]

Output:
- 8 headline variants (हर एक 30 chars max — char count state करें)
- 3 description variants (हर एक 90 chars max — char count state करें)

Constraints:
- हर headline self-standing होना चाहिए (Google उन्हें rotate करता है)
- Set across product type + एक benefit + एक price या promo signal
  include करें
- कोई banned words नहीं
```

**Worked example — moisturizer:**

```
Headline 1 (28 chars): Ceramide Moisturizer, $32
Headline 2 (29 chars): Fragrance-Free, Daily Use
Headline 3 (30 chars): 3 Ceramide Types + Niacinamide
Headline 4 (26 chars): Free Shipping Over $50
Headline 5 (28 chars): Won't Pill Under SPF
Headline 6 (28 chars): For Sensitive, Tired Skin
Headline 7 (30 chars): No Fragrance. No Dye. No Mess.
Headline 8 (29 chars): The Moisturizer You Reorder

Description 1 (88 chars):
3 ceramide types, 4% niacinamide, squalane base. Unscented. Free shipping over $50.

Description 2 (84 chars):
Daily ceramide moisturizer for skin tired of being stripped. $32 for 50ml. AM and PM.

Description 3 (89 chars):
Fragrance-free, dye-free, pH-balanced. Pairs with retinol without irritation. Ships fast.
```

### TikTok ad prompt

```
आप के लिए TikTok ad copy लिख रहे हैं:

Product: [name + 1-sentence description]
Format: [existing creator post पर Spark Ad / brand-direct ad]
Hook style: [problem-statement / contrarian / before-after / direct-callout]
Audience: [एक sentence]

Output:
- 3 caption variants (हर एक 100 chars optimal — char count state करें)
- 1 display name suggestion (40 chars max)

Constraints:
- TikTok captions hook front-load करते हैं
- "Shop now" avoid करें — "link in bio" या product-specific language use करें
- कोई banned words नहीं
```

**Worked example — moisturizer:**

```
Caption 1 (97 chars):
The ceramide moisturizer that finally replaced the four bottles on your shelf. Link in bio.

Caption 2 (94 chars):
Fragrance-free is the only flex. $32 daily moisturizer, three ceramide types. Tap to shop.

Caption 3 (96 chars):
If your skin is reactive to everything you try, this is the one to keep. $32. Linked above.

Display name (29 chars):
Brand Name | Skincare Done Simple
```

---

## जब brand को एक different angle चाहिए

अगर first draft flat land हो जाए, angle switch करें और re-prompt करें। एक common pattern:

- Efficacy angle too clinical feel हुआ → luxury try करें
- Luxury angle overwrought feel हुआ → value try करें
- Value angle cheap feel हुआ → confident-but-specific framing के साथ efficacy try करें

Same product तीन different angles के तहत ship हो सकता है और आप scaling से पहले एक single platform पर test कर सकते हैं कौन सा सबसे convert करता है।

---

## Good ad copy क्या नहीं करती

- **Brand name से headline stuff करें।** "Brand Name's New Premium Moisturizer" 30 characters waste करता है।
- **हर line एक question mark से end करें।** TikTok ads especially — direct statements "Tired of dry skin?" से out-convert करते हैं।
- **Vibe substitute के रूप में exclamation points use करें।** एक exclamation per ad plenty है।
- **बिना substantiation Outcomes promise।** Descriptive language stick करें जब तक आपके पास citation न हो।
- **तीनों platforms पर same ad copy run करें।** हर platform का एक different rhythm है — Meta permissive है, Google keyword-driven है, TikTok voice-y है।
