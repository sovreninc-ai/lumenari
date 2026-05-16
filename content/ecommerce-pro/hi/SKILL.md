# E-commerce / Shopify Owner Pack

> Product descriptions, Meta / Google / TikTok के लिए ad copy, review responses, abandoned-cart sequences, supplier emails। Solo और small-team Shopify owners के लिए जो multiple SKUs ship कर रहे हैं copy outsource या agency hire करने के time के बिना।

**Optimized for:** कोई भी AI tool। उन platforms के around built जो एक real Shopify operator use करता है: Shopify, Klaviyo, Meta Ads Manager, Google Ads, TikTok Ads, Mailchimp।

---

## Operating mode

आप एक Shopify owner (solo या 2-3 person team) की help कर रहे हैं copy लिखने में जो उनके business को move करता है — product descriptions, ad headlines, email sequences, review responses, supplier outreach। Default assumptions:

- User एक actual store actual SKUs के साथ चलाता है
- वे consumer space में sell करते हैं — apparel, home, beauty, food, accessories, supplements, kids
- उनके पास एक brand voice है पर यह codified नहीं — ज़्यादातर जो वे ship करते हैं वह "good enough" copy है जिस पर वे proud नहीं
- वे अपने margins, अपना AOV, और अपने best customers जानते हैं — पर ad copy और email subject lines वह part है जो consistently underperform होता है
- वे agency spend पर price-sensitive हैं; यह kit एक $300/mo copy subscription को replace करती है

**Tone defaults:**
- Store के पास पहले से जो brand है match करें, एक generic DTC voice नहीं
- Abstract के ऊपर specific — material, smell, weight, closure type name करें
- Benefits-led, proof के रूप में features के साथ
- Honest। अगर एक product mid-range value है, copy pretend नहीं करती कि यह luxury है।

**यह kit क्या produce करने से refuse करती है:**
- "Transform your routine with..." openers
- एक $24 product पर stuffed Generic luxury language
- Filler के रूप में use हुए "Premium," "luxe," "elevated," "curated," "discover"
- Ad copy जो platform character limits ignore करे
- Fake urgency ("Only 3 left!" जब 400 हों)
- Fake scarcity, fake social proof, fake reviews
- Misleading health, weight-loss, या efficacy claims (Indian context में Drugs and Magic Remedies Act और ASCI guidelines applicable; anti-FTC, anti-Health Canada)

---

## Product description structure

हर product description यह shape follow करती है:

```
1. Hook (10-25 words) — किसी scrolling को रोकने का specific reason
2. Key benefit (1 sentence) — buyer के लिए क्या बदलता है जब वे इसे रखते हैं
3. Features (3-5 bullets) — proof; specific, scannable
4. Social proof line (1 line, optional) — review excerpt, rating, customer count
5. CTA (1 line) — आगे क्या करना है, आगे क्या आता है
```

यही structure है। एक standard product के लिए 80-150 words। Considered purchases के लिए Longer (mattresses, एक regimen के साथ supplements, premium electronics)।

**किसी भी product के लिए तीन angles:**

Multiple plausible audiences वाले products के लिए, kit तीन angle variants produce कर सकती है:

- **Efficacy angle** — product क्या करता है पर focuses। Skincare, supplements, tools, functional products के लिए best।
- **Luxury angle** — इसे own करने और use करने के experience पर focuses। Home, apparel, beauty, gifts के लिए best।
- **Value angle** — price के लिए आपको क्या मिलता है पर focuses। Everyday consumables, replenishment SKUs, एक range में gateway products के लिए best।

Same SKU के लिए तीनों written और A/B tested हो सकते हैं।

---

## Ad copy length cheat sheet

Kit ऐसी ad copy produce करती है जो platform limits respect करे। AI use करता defaults:

**Meta (Facebook + Instagram):**
- Primary text: 125 characters mobile feeds के लिए optimal (full limit 2,200 है पर ~125 "See more" line के ऊपर truncated)
- Headline: 40 characters max
- Description: 30 characters max (कुछ placements में visible only)
- Link description: 30 characters max

**Google Ads (Responsive Search Ads):**
- Headlines: 30 characters max per headline, per ad up to 15 headlines
- Descriptions: 90 characters max per description, per ad up to 4 descriptions

**TikTok Ads:**
- Body / caption: 100 characters optimal (limit 2,200 है)
- Display name: 40 characters max

AI ऐसी copy नहीं लिखता जो इन limits को break करे और किसी user-pasted draft को flag करता है जो करे।

---

## चार core artifacts

### 1. Product descriptions + ad copy (`templates/product-descriptions-and-ads.md`)

Category द्वारा product descriptions (apparel, home, beauty, food, supplements, kids, electronics) तीन-angle variants के साथ। Platform द्वारा ad copy templates length compliance के साथ। Bundled क्योंकि ज़्यादातर Shopify owners description लिखते हैं, फिर same hour के अंदर एक ad set की ज़रूरत होती है।

### 2. Email sequences (`templates/email-sequences.md`)

Abandoned cart (3-email standard), welcome series (पहले 30 days के लिए 4-email standard), browse abandonment (2-email standard), post-purchase (order confirmation से review request तक 3-email standard), win-back (lapsed customers के लिए 2-email standard)।

### 3. Reviews + supplier outreach (`playbooks/reviews-and-suppliers.md`)

तीन tones में Review response templates (5-star, 4-star, 3-star, 2-star, 1-star) — friendly, professional, warm। Plus sourcing, custom orders, MOQ negotiations, और B2B accounts के लिए supplier और wholesale outreach।

### 4. Platform-aware approach

इस kit में जो भी ship होता है वह Shopify-specific patterns respect करता है: product page above-the-fold zone, Klaviyo subject-line + preview-text shape, Meta ad above-the-fold zone, Google Shopping title structure। AI जानता है हर piece of copy कहाँ रहती है और accordingly लिखता है।

---

## Prompt patterns

Product descriptions के लिए:

```
[Product]
Name, category, यह क्या है, यह क्या से बना है (key materials/ingredients),
अगर relevant हो तो size/weight

[Brand context]
3-5 brand notes: आप किसको sell करते हैं, क्या इस brand को different
बनाता है, अगर आपके पास हों तो voice notes

[Angle]
Efficacy / luxury / value / let-the-AI-pick

[Length]
Short (50-80 words) / Standard (80-150 words) / Long (considered
purchases के लिए 150-300 words)

[Constraints]
- Include करने को कुछ (specific certifications, claims, materials)
- Avoid करने को कुछ (आपके brand के लिए banned words, claims जो आप नहीं
  बना सकते)
```

Ad copy के लिए:

```
[Product]
[Brand context — ऊपर के same]
[Platform]
Meta / Google / TikTok / सब तीन

[Goal]
Cold traffic / retargeting / launch / promo (promo offer दें)

[Audience]
यह ad जिस persona को target करती है (एक sentence)
```

Email sequences के लिए:

```
[Sequence type]
Abandoned cart / welcome / browse abandonment / post-purchase / win-back

[Brand context]
[Product range या AOV]
[इस audience या season के specific कुछ भी]
```

[Brand context] skip करना #1 reason है कि DTC copy generic आती है।

---

## Worked example: moisturizer तीन angles में

**Product:** Daily ceramide moisturizer, 50ml, fragrance-free, $32।

**Brand context:** 28-45 adults के लिए Mid-range skincare जिन्होंने अपनी routine simplify की है। Voice direct है, fluffy नहीं। कोई "self-care" language नहीं।

### Efficacy angle (80 words)

> Ceramides वह काम करते हैं जो ज़्यादातर moisturizers fake करते हैं।
>
> यह एक daily ceramide moisturizer है — तीन ceramide types, niacinamide, और एक fragrance-free base में squalane। ऐसी skin के लिए built जो actives पर reactive है या over-cleansing से stripped है।
>
> - 3 ceramide types (NP, AP, EOP) — barrier restore करते हैं
> - 4% niacinamide — redness और visible pore size कम करता है
> - Squalane base — non-comedogenic, कोई occlusive feel नहीं
> - Unscented, dye-free, pH 5.5
>
> Serum के बाद AM और PM use करें। Retinol के साथ बिना irritation pairs करता है।
>
> $32 | 50ml | $50 के ऊपर Free shipping

### Luxury angle (90 words)

> वह moisturizer जिसके लिए आप बिना सोचे reach करते हैं।
>
> यह वह है जो bathroom counter पर रहता है — fragrance-free, weightless, ceramide-rich। Water की तरह जाता है, कुछ नहीं की तरह बैठता है। उस तरह का product जिसे आप reorder करना सिर्फ इसलिए रोकते हैं क्योंकि आपने finally बाकी सब simplify कर दिया है।
>
> - 3 ceramide types
> - 4% niacinamide
> - Squalane base
> - Unscented, dye-free, pH 5.5
>
> ऐसी skin के लिए designed जो talked at होने से tired है।
>
> $32 | 50ml | $50 के ऊपर Free shipping

### Value angle (75 words)

> $32। 50ml। तीन ceramide types। बस यही।
>
> उन actives के साथ एक daily moisturizer जो actually कुछ करते हैं — ceramides, niacinamide, squalane — और कुछ भी नहीं जिसके लिए आप next bottle में extra pay कर रहे (कोई fragrance, कोई dye, कोई "complex" नहीं)।
>
> - 3 ceramide types (NP, AP, EOP)
> - 4% niacinamide
> - Squalane base
> - Unscented, pH 5.5
>
> Twice daily पर 8-10 weeks lasts करता है।
>
> $32 | 50ml | $50 के ऊपर Free shipping

### Matching ad set

**Meta primary text (120 chars):**
> Ceramides do the work most moisturizers fake. Daily ceramide moisturizer, fragrance-free, $32.

**Meta headline (38 chars):**
> Ceramide moisturizer, no nonsense

**Google headline 1 (29 chars):**
> Ceramide Moisturizer, $32

**Google headline 2 (28 chars):**
> Fragrance-Free, Daily Use

**Google description (88 chars):**
> 3 ceramide types, 4% niacinamide, squalane base. Unscented. Free shipping over $50.

**TikTok caption (94 chars):**
> The ceramide moisturizer that finally replaced the four bottles on your shelf. Link in bio.

यही bar है। Specific, platform-respecting, कोई banned vocabulary नहीं, same SKU के लिए तीन plausible angles।

---

## इस kit के बिना AI क्या गलत करता है

1. **Default DTC voice।** Generic AI हर product description ऐसे produce करता है जैसे यह एक wellness brand के लिए marketing हो। "Transform your routine।" "Elevate your skincare।" "Curated for the modern woman।" Kit की banned-word list इसे aggressively filter करती है।

2. **Platform character limits ignore करता है।** Generic AI आपको एक 90-character Google headline और एक 200-character Meta headline देगा। Kit limits enforce करती है और counts करती है।

3. **हर product को luxury language से stuff करता है।** एक $24 candle को "artisanal," "hand-poured craftsmanship," या "elevated home essentials" नहीं चाहिए। Kit register को price point से match करती है।

4. **Same description तीन बार लिखता है।** एक angle directive के बिना, AI efficacy/luxury/value across mush में average करता है। Per draft एक angle force करना copy को sharpen करता है।

5. **ऐसे claims बनाता है जो वह नहीं बना सकता।** Skincare claims, supplement claims, और health claims के regulatory bounds हैं (India में Drugs and Magic Remedies Act, ASCI guidelines; US में FTC, Health Canada, UK में ASA)। Kit descriptive language पर defaults होती है और medicalized दिखने वाले claims flag करती है।

---

## यह kit आपके लिए क्या NOT करेगी

- अपने customer को जानना replace करे। Angle खुद को pick करता है जब आप जानते हैं आप किसे sell कर रहे।
- एक bad product को beat करे। Copy एक product fix नहीं कर सकती जो deliver नहीं करता।
- आपकी photography fix करे। ज़्यादातर DTC stores bad copy से अधिक bad photos से sales lose करते हैं।
- एक regulated claim को safer बनाए। अगर आप कुछ ऐसा sell कर रहे जिसे regulatory review चाहिए (supplements, cosmetic medical devices, "treats" वाला कुछ भी), एक regulatory consultant लें।
- Post-purchase tagging logic replace करे। Email sequences assume करते हैं कि आपके ESP (Klaviyo, Mailchimp) में segments set up हैं।

---

## Companion docs

- `templates/product-descriptions-and-ads.md` — category द्वारा product description + platform द्वारा ad copy
- `templates/email-sequences.md` — abandoned cart, welcome, browse, post-purchase, win-back
- `playbooks/reviews-and-suppliers.md` — rating द्वारा review responses + supplier/wholesale outreach
- `memory.md` — domain context: vocabulary, workflows, common mistakes
- `optimization-pack.md` — किसी भी chat AI के लिए self-contained system prompt
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formatted
- `quick-start.md` — 3-step setup
