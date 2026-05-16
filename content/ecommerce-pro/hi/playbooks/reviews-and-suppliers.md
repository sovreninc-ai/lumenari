# Review Responses + Supplier / Wholesale Outreach

एक Shopify store में दो सबसे time-sapping admin tasks: हर हफ्ते reviews respond करना और supplier या wholesale emails लिखना जब आप grow करने की कोशिश कर रहे। यह playbook आपको दोनों के लिए patterns देती है।

---

## Review responses

Public reviews future buyers द्वारा reviewer से अधिक पढ़ी जाती हैं। Response reader के लिए है, writer के लिए नहीं।

**तीन tones available:**

- **Friendly** — conversational, light, brand voice forward। Lifestyle और consumer categories के लिए good।
- **Professional** — measured, polite, कोई slang नहीं। B2B-leaning DTC, supplements, और higher-price-point goods के लिए good।
- **Warm** — empathetic, specific, slightly more personal। Beauty, wellness, food, और किसी brand जहाँ relationship product का part है उसके लिए good।

Kit friendly पर defaults होती है जब तक user specify न करे।

### Prompt

```
आप एक product review को respond कर रहे हैं।

Review:
- Rating: [1-5 stars]
- Title (अगर कोई): [paste]
- Body: [paste]
- Reviewer name: [first name only]
- Product: [name]

Brand voice: [3-5 notes]
Tone: [friendly / professional / warm]

Response (40-100 words) brand की voice में output करें।

Rules:
- Length और emotional register को review से match करें
- 5-star reviews: brief, warm, उन्होंने जो कहा उसके specific
- 4-star: warm + curious follow-up क्या इसे 5 बनाता
- 3-star: honesty के लिए thank, एक clarifying question, help करने को offer
- 2-star: apologetic, issue के specific, support email को route
- 1-star: apologetic, specific, support email को route + remediation offer
- Public में कभी defensive न हों
- Reviewer से कभी argue न करें
- "We're sorry you feel that way" कभी use न करें — यह defensive है
- अगर review एक defective product, broken shipment, या service failure
  mention करे, इसे directly address करें
- Negative reviews के लिए: appropriate जगह responsibility लें, resolution
  के लिए private channel को route करें
- जब possible हो एक real name (founder, customer-success lead) के साथ sign करें
```

---

## Rating द्वारा Worked examples

### 5-star review

**Review:**
> ★★★★★ — Finally something for sensitive skin
> "मैंने हर fragrance-free moisturizer try किया और उनमें से ज़्यादातर मुझे break out कराते हैं। यह नहीं किया। तीन months in और मेरी skin barrier actually better है। Reordering।"

**Response (friendly tone, 38 words):**
> Three months in एक good signal है — वही है जब barrier work show करना start करता है। Glad यह आपके लिए land हुआ। Anytime reach out करें अगर आप इसे retinol या actives के तहत layering में help चाहें।
>
> — [Founder name]

### 4-star review

**Review:**
> ★★★★ — Good but bottle is small
> "Moisturizer advertised के अनुसार काम करता है। मेरी only complaint है कि 30ml bottle twice-daily use पर expected से faster जाती है। वरना great।"

**Response (friendly, 42 words):**
> Honest take के लिए Thanks। 30ml bottles twice-daily पर 6-8 weeks lasts करती हैं — हम fall के लिए एक 60ml size plan कर रहे हैं। अगर आप इसके through faster जा रहे हैं, आप needed से थोड़ा अधिक apply कर रहे हो सकते हैं (4-5 drops plenty है)।
>
> — [Customer Success]

### 3-star review

**Review:**
> ★★★ — Texture is weird
> "यह fine है पर पहले 20 seconds sticky texture है इससे पहले कि यह sink in हो जाए। Photos से जो expected किया वह नहीं।"

**Response (warm, 55 words):**
> Hi [name] — flag करने के लिए appreciate। Sticky first-20-seconds niacinamide और glycerin layer settling है; usually एक minute या दो में clears होता है। अगर यह application के 5 minutes बाद भी tacky है, यह normal नहीं — एक serum underneath के साथ interaction हो सकता है। अपनी routine के साथ इसे reply करें और मैं देखूँगा।
>
> — [Founder]

### 2-star review

**Review:**
> ★★ — Caused a breakout
> "Best के लिए hoped पर इसने मुझे एक हफ्ते के अंदर cystic breakouts दिए। Returning।"

**Response (warm, 52 words):**
> Hi [name] — sorry यह आपके लिए काम नहीं किया। पहले 1-2 weeks में Cystic breakouts usually मतलब एक ingredient आपकी skin के साथ agree नहीं कर रहा (niacinamide या एक active)। हम opened bottles पर returns honor करते हैं — support@brand.com को email करें और हम आज इसे process करेंगे।
>
> — [Founder]

### 1-star review

**Review:**
> ★ — Arrived damaged and customer service ghosted me
> "Bottle box पर over leaked, support को दो बार contact किया कोई response नहीं। अपना पैसा बचाओ।"

**Response (warm, 58 words):**
> Hi [name] — यह हम पर है। एक leaked shipment और कोई response unacceptable है। मैंने check किया और आपके messages एक folder में गए जो हमने दो days के लिए miss कर दिया। मैंने पहले से एक replacement issue किया है (आज shipping, कोई charge नहीं) और एक full refund। मैं personally make sure करूँगा यह फिर नहीं होगा। Reply करें अगर कुछ और miss हुआ।
>
> — [Founder name]

---

## Good review responses क्या करते हैं

- **Reviewer ने actually क्या कहा address करें।** Generic "thanks for your feedback" canned पढ़ता है। Response को review से एक specific detail quote या reference करनी चाहिए।
- **Negative reviews पर जल्दी responsibility लें।** Future buyers जो उन्हें पढ़ते हैं देखते हैं क्या brand defend करता है या own करता है। Owning जीतता है।
- **Resolution को private channels को route करें।** Review thread में एक refund negotiate न करें। Publicly acknowledge करें, privately resolve।
- **एक name के साथ Sign करें।** एक name accountability signal करता है। "The Brand Team" "Sarah, founder" से less trustworthy पढ़ता है।
- **Length को review length से match करें।** एक two-line review एक two-line response पाती है। एक paragraph review एक paragraph वापस पाती है।

## Good review responses क्या नहीं करते

- **"We're sorry you feel that way।"** Pure defensive language। मत करें।
- **Argue करें।** अगर reviewer एक product fact के बारे में wrong है, gently correct करें और privately discuss करने को offer करें। Public में litigate न करें।
- **Response में Upsell करें।** एक complaint पर "Try our other product!" tone-deaf पढ़ता है।
- **Outcomes promise करें जो आप deliver नहीं कर सकते।** "हम make sure करेंगे यह कभी फिर नहीं होगा" — सिर्फ अगर आपके पास actually एक plan है।
- **20 reviews across same line copy-paste करें।** Future buyers scroll करते हैं। Sameness not-caring पढ़ता है।

---

## Supplier outreach

Potential suppliers के साथ first contact के लिए — manufacturers, ingredient houses, packaging vendors, fulfillment partners।

### Prompt

```
आप एक potential supplier को एक first-contact email लिख रहे हैं।

Brand: [name + 1-sentence description]
Product line: [आप क्या sell करते हैं या make करने का plan करते हैं]
Current stage: [pre-launch / launched, scaling / established, suppliers
switch करने को looking]
Volume estimate: [projected monthly या annual units; rough fine है]
इस supplier से क्या चाहिए: [2-3 specific things list करें — MOQ, lead
time, sample availability, certifications]
उन्हें मिला via: [trade show / Alibaba / referral / उनकी website]

200 words के नीचे एक first-contact email output करें।

Rules:
- Subject 60 chars के नीचे
- आप कौन हैं + आप क्या sell करते हैं + क्यों reach कर रहे हैं से open करें
- Volume estimate honestly state करें (inflate न करें)
- 2-3 specific questions पूछें
- Polite, professional, no pressure
- एक clear next step के साथ close करें (sample request, MOQ confirmation,
  discuss करने को call)
- Name + role + brand के साथ Sign करें
```

### Worked example — small skincare brand एक new bottle supplier sourcing

```
Subject (52 chars): Glass dropper bottle inquiry — small DTC brand

Hi [name],

मैं [Your name] हूँ, [Brand] के founder — Toronto-based एक small DTC
skincare brand। हम [number] units per month ship कर रहे हैं और हमारी
30ml amber glass dropper bottles के लिए एक new supplier ढूँढ रहे हैं।

Current volume:
- ~5,000 bottles per quarter
- ~15% quarter-over-quarter Growing
- अगले 12 months के लिए supply lock in करने को looking

Deep जाने से पहले कुछ questions:

1. Glass pipette और rubber bulb के साथ standard 30ml amber dropper
   के लिए आपका MOQ क्या है?
2. PO से Toronto को delivery तक एक typical lead time क्या है?
3. क्या samples available हैं, और अगर हाँ, cost क्या है?

अगर वे हमें जो चाहिए उसके साथ line up करें, मैं specs के through walk
करने को एक 20-minute call set up करना चाहूँगा।

Consideration के लिए thanks।

— [Your name]
Founder, [Brand]
[Phone]
```

यही pattern है। Specific, volume के बारे में honest, clear questions, easy next step।

---

## Retailers को Wholesale outreach

Brick-and-mortar retailers, online curators, या distributors को approach करने के लिए जो आपका product carry कर सकते हैं।

### Prompt

```
आप एक potential wholesale account को एक outreach email लिख रहे हैं।

Brand: [name + 1-sentence description]
Product range: [आप wholesale क्या offer करेंगे]
Wholesale margin: [आपके standard wholesale terms — MSRP off 50%
typical है]
Minimum opening order: [wholesale के लिए आपका MOQ]
Existing wholesale accounts (अगर कोई): [2-3 list करें — एक name dropping
trust builds करता है]
Approached हो रहा Retailer: [name + वे क्यों एक fit हैं]

200 words के नीचे एक outreach email output करें।

Rules:
- Subject 60 chars के नीचे; जब possible हो retailer के specific
- क्यों यह specifically retailer (1 sentence — दिखाएं आपने उन पर देखा है) से open करें
- एक line में brand और category state करें
- Margins + minimums up front (उन्हें ask न करना पड़े)
- अगर आपके पास हों तो 1-2 existing accounts drop करें
- एक sample या line sheet को next step के रूप में offer करें
- Name + brand + line sheet link या attachment के साथ close करें
```

### Worked example — एक curated wellness retailer को approaching skincare brand

```
Subject (59 chars): [Brand] for [Retailer] — wholesale inquiry

Hi [name],

मैंने notice किया [Retailer] [एक specific brand जो वे पहले से stock
करते हैं] carry करता है और एक curated assortment built किया है जो हम
जो बनाते हैं उसके साथ एक tight fit है।

मैं [Your name] हूँ, [Brand] के founder — Vancouver में small-batch
fragrance-free skincare made। हमारा hero एक ceramide moisturizer है
जो हमारा #1 reordered SKU है (4.8 stars, 1,400+ reviews)।

Wholesale terms:
- MSRP off 50%
- $500 minimum opening order
- First order के बाद Net 30 terms
- Restocks पर 12-week lead time
- Currently Canada across 18 retailers में, [Account 1] और [Account 2] सहित

मैं एक sample set भेजना चाहूँगा ताकि आप line try कर सकें। Line sheet attached।

अगले हफ्ते किसी भी time एक 15-minute call के लिए free अगर वह easier हो।

— [Your name]
Founder, [Brand]
```

---

## जब supplier outreach गलत जाता है

- **Better MOQ negotiate करने को volume inflating।** Suppliers verify करते हैं। Caught lies relationship को start होने से पहले tank करते हैं।
- **Vague asks।** "क्या आप मुझे अपनी services के बारे में अधिक बता सकते हैं?" उनका time waste करता है। Specific questions पूछें।
- **Introduction skipping।** Suppliers को spam मिलता है। आप कौन हैं और क्यों एक real prospect हैं से lead करें।
- **कोई clear next step नहीं।** हमेशा "अगर [criteria], मैं एक call schedule करना चाहूँगा" या "क्या आप एक sample भेज सकते हैं?" से end करें।
- **इसे एक sales email जैसा treat करना।** Suppliers partners हैं, customers नहीं। Register collaborative है, transactional नहीं।
