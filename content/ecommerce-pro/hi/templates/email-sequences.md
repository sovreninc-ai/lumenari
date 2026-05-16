# Email Sequences

हर Shopify store को run करने को जो पाँच sequences चाहिए। Abandoned cart, welcome series, browse abandonment, post-purchase, win-back। हर एक Klaviyo (या Mailchimp) के लिए set up है — structure platform-agnostic है।

हर email include करता है: subject line (50 chars के नीचे), preview text (90 chars के नीचे), body। Kit user की need के depending पर एक prompt में या एक email at a time पूरा set produce करती है।

---

## Abandoned cart sequence (3 emails)

DTC में highest-leverage flow। Industry-standard recovery rate abandoned carts का 10-15% है; well-tuned flows 20%+ hit करते हैं।

**Send times:** abandonment के बाद 1 hour, 24 hours, 72 hours।

### Prompt

```
आप एक 3-email abandoned cart sequence लिख रहे हैं।

Brand: [3-5 voice notes]
Average AOV: [$X — affect करता है क्या email 3 में discount include
हो]
Product category: [apparel / home / beauty / food / supplements / etc.]
Common objections: [2-3 things list करें जिन पर customers hesitate
करते हैं — shipping cost, sizing uncertainty, return policy, ingredient
questions]

Output 3 emails:
- Email 1 (abandonment के 1 hour बाद send): friendly nudge, कोई
  discount नहीं, उस product पर focus जो उन्होंने छोड़ा
- Email 2 (24 hours बाद send): most likely objection address करें
- Email 3 (72 hours बाद send): incentive — discount, free shipping,
  या AOV के depending पर social proof

हर एक के लिए: subject line (50 chars के नीचे), preview text (90 chars
के नीचे), body (120-200 words)।
कोई banned words नहीं। कोई fake urgency नहीं।
```

### Worked example — beauty brand, AOV $60

**Email 1 (1 hour बाद):**
```
Subject (32 chars): Did your cart wander off?
Preview (78 chars): The ceramide moisturizer you were looking at is still here when you're ready.

Hi [first name],

Looks like आप earlier ceramide moisturizer check out कर रहे थे। यह अभी
भी आपकी cart में है अगर आप जहाँ छोड़ा वहाँ से pick up करना चाहते हैं।

कुछ चीज़ें जो लोग आमतौर पर ordering से पहले जानना चाहते हैं:
- $50 के ऊपर Free shipping
- 60-day return policy, opened bottles पर भी
- Toronto से 1-2 business days में Ships

[अपनी cart पर वापस जाएँ →]

अगर आपने decide किया कि यह right fit नहीं था, no worries। हम easy हैं
reach करने को अगर आप कुछ ask करना चाहें।

— [Brand]
```

**Email 2 (24 hours बाद — "क्या यह मेरी skin के लिए right है" objection address):**
```
Subject (44 chars): About the moisturizer in your cart
Preview (82 chars): Quick note on what makes ours work for sensitive, over-stripped skin types.

Hi [first name],

Quick note — ceramide moisturizer पर हमें most common question मिलती
है "क्या यह मेरे लिए काम करेगा?"

यह इसके लिए built है:
- Skin जो actives या fragrance पर reactive है
- Retinol या other actives use कर रहे लोग जिन्हें एक low-irritation
  base चाहिए
- कोई जो over-cleansing या barrier stripping कर रहा है

यह probably right fit नहीं है अगर:
- आप एक heavy occlusive overnight cream ढूँढ रहे हैं
- आप एक strongly hydrating gel चाहते हैं — यह एक balanced moisturizer
  है, एक hydration bomb नहीं

अगर वह lines up करे, [आपकी cart में bottle] यहाँ है।

अगर आप ordering से पहले कुछ ask करना चाहें, इस email को reply करें।
मैं इन्हें पढ़ता हूँ।

— [Founder name]
```

**Email 3 (72 hours बाद — soft incentive):**
```
Subject (37 chars): One last note before we let it go
Preview (76 chars): 10% off on the cart you started, plus a quick reminder of why people stick.

Hi [first name],

इसे आपके hands में छोड़ रहा हूँ। कुछ दिन पहले जो cart आपने start की
— हम इसे अगले 48 hours के लिए 10% off के साथ hold करेंगे अगर आप इसे
चाहें।

Checkout पर STILLHERE code use करें।

For what it's worth: हमारी 1,400+ reviews across 4.8-star rating है,
और moisturizer हमारा top-reordered product है (ज़्यादातर customers
10 weeks के अंदर एक दूसरी bottle के लिए वापस आते हैं)।

[अपनी cart पर STILLHERE use करें →]

किसी भी तरह, hope आप जो ढूँढ रहे हैं find करें।

— [Brand]
```

---

## Welcome series (30 days over 4 emails)

First-time email subscribers को Sent (pop-up, footer form, या post-purchase के through signups)। 30 days over 4 emails।

**Send times:** immediately, day 3, day 10, day 28।

### Prompt

```
आप new subscribers के लिए एक 4-email welcome series लिख रहे हैं।

Brand: [3-5 voice notes]
Brand story (1-3 sentences): [paste — क्या इस brand को exist कराता है]
Product range: [3-5 categories या hero products]
Sign-up incentive: [हमने क्या promise किया — 10% off, free shipping, etc.]

Output 4 emails:
- Email 1 (immediate): thank-you + first-purchase incentive code
- Email 2 (day 3): brand story — 1-minute read max
- Email 3 (day 10): best-sellers या आपके लिए right क्या है choose करने
  के लिए guidance
- Email 4 (day 28): community / review request / referral CTA

हर एक के लिए: subject line (50 chars के नीचे), preview text (90 chars
के नीचे), body (150-250 words)।
कोई banned words नहीं।
```

### Worked example — home goods brand, sign-up incentive: free shipping

**Email 1 (immediate):**
```
Subject (28 chars): Welcome — your code's below
Preview (75 chars): Free shipping on your first order, plus a quick rundown of what we make.

Hi [first name],

Welcome। अपने first order पर free shipping के लिए checkout पर FIRSTSHIP
code use करें।

हम small-batch home goods बनाते हैं — candles, ceramics, textiles —
Vancouver में एक shop से। सब कुछ 20-40 के batches में बनाया जाता है,
और ज़्यादातर एक month के restock के अंदर sell out हो जाता है।

कुछ चीज़ें जानने लायक:
- New batches हर month के पहले Friday drop होते हैं
- हम subscribers को public release से 24 hours पहले email करते हैं
- Returns unopened candles और unused textiles पर 30 दिनों के अंदर
  accepted

अगर ordering से पहले आपके questions हैं, इस email को reply करें। यह
मेरे desk पर आता है।

— [Founder name]

[Code: FIRSTSHIP — Free shipping, first order]
```

**Email 2 (day 3 — brand story):**
```
Subject (33 chars): How this place came to exist
Preview (85 chars): A short story about why we make beeswax candles and slow-fire ceramics in 2026.

[150-200 word brand story — इसे grounded रखें; कोई "passion" language
नहीं; actual reason दिखाएं कि brand क्यों exist करता है]
```

**Email 3 (day 10 — best-sellers / guidance):**
```
Subject (42 chars): If you're not sure where to start...
Preview (88 chars): A few of our best-reordered things, plus what most people pair them with.

[150-250 word product guide; 3-4 best-sellers एक-line reasons के साथ]
```

**Email 4 (day 28 — referral / review CTA):**
```
Subject (37 chars): A small ask if you ordered
Preview (89 chars): If something you bought landed well — would you tell us about it?

[Short ask for a review on whatever they bought, या एक referral CTA
अगर उन्होंने अभी तक नहीं खरीदा]
```

---

## Browse abandonment (2 emails)

Subscribers को Sent जिन्होंने एक product view किया पर cart में add नहीं किया। Cart abandonment से Lower-intent — tone softer है।

**Send times:** एक product view के बाद 4 hours, 48 hours बाद।

### Compact prompt

```
Brand: [3-5 voice notes]
Product viewed: [product name + 1-sentence description]
Common reason कि कोई add के बिना browse करता है: [paste — price,
sizing, ingredients, time नहीं था]

Output:
- Email 1 (view के 4 hours बाद): light "just so you have the link"
  message
- Email 2 (view के 48 hours बाद): एक piece of useful info (एक review
  excerpt, एक common objection का एक-line answer)

हर एक: subject 50 chars के नीचे, preview 90 chars के नीचे, body 80-150 words।
कोई banned words नहीं। इस sequence में कोई discount नहीं।
```

---

## Post-purchase sequence (3 emails)

Order completion के बाद Sent। Order confirmation, shipping notification, review request.

**Send times:** immediately, ship confirmation पर, delivery के 10-14 days बाद (consumables के लिए) या delivery के 21-30 days बाद (considered purchases के लिए)।

### Pattern

पहले दो (order confirmation, shipping) ज़्यादातर transactional हैं पर kit उन्हें default Shopify templates से warmer बनाती है। तीसरा (review request) वह जगह है जहाँ writing matters।

```
Brand: [voice notes]
अभी delivered Product: [name]
Review platform: [Judge.me / Yotpo / Loox / native Shopify]
Incentive (अगर कोई): [next purchase पर discount, एक giveaway में entry, कोई नहीं]

Output review-request email:
- Subject (50 chars के नीचे)
- Preview (90 chars के नीचे)
- Body (100-180 words)
- एक review छोड़ने को Single clear CTA
- Acknowledge करें कि reviews एक small ask और एक real help हैं
- कोई banned words नहीं
- Promise न करें कि review publish होगी या यह 5 stars होनी चाहिए
```

### Worked example — supplements brand

```
Subject (39 chars): Hope the magnesium is working out
Preview (88 chars): Two weeks in is when most people notice — quick ask if you have a sec.

Hi [first name],

Two weeks in usually वह है जब लोग notice करना start करते हैं क्या
magnesium जो वे hope कर रहे थे कर रहा है, या यह right fit नहीं है।

अगर आपके पास 60 seconds हैं, क्या आप एक quick review छोड़ देंगे? Positive
से अन्य लोगों के लिए honest अधिक useful है — अगर यह आपके लिए काम नहीं
किया, हम जानना rather रखेंगे।

[एक review छोड़ें →]

और अगर कुछ आया — गलत product, capsule trouble, कुछ भी — इस email को
reply करें और हम sort करेंगे।

हमें try करने के लिए thanks।

— [Founder]
```

---

## Win-back (2 emails)

उन customers को Sent जिन्होंने 60-120 days में order नहीं किया (category के depending पर — consumables = shorter, considered = longer)।

**Send times:** 60 days lapsed, 90 days lapsed।

### Prompt

```
Brand: [voice notes]
इस brand के लिए Average order frequency: [consumables के लिए हर X weeks, etc.]
Most-likely-to-reorder products: [2-3 list करें]

Output 2 emails:
- Email 1 (60 days): no-pressure check-in, पूछें क्या सब कुछ good है
- Email 2 (90 days): low-friction incentive — 15% off, free shipping,
  या restock reminder

हर एक: subject 50 chars के नीचे, preview 90 chars के नीचे, body 100-180 words।
कोई banned words नहीं। Imply न करें कि customer fall behind हो रहा है।
Autonomy respect करें।
```

### Worked example — coffee brand

**Email 1 (60 days):**
```
Subject (38 chars): No pressure — quick check-in
Preview (75 chars): Just making sure your coffee situation hasn't gone sideways since spring.

Hi [first name],

आपके last order के बाद से लगभग दो महीने हो गए हैं — check in करना
चाहता था। Reorder करने के लिए no pressure; बस make sure कर रहा हूँ कि
हमने कहीं ball drop नहीं किया।

अगर आप run out हो गए और busy हो गए, [Ethiopia Guji जो आपने last time
खरीदा अभी भी menu पर है]। अगर आप एक different roaster से कुछ new
try कर रहे हैं, यह great है — मुझे बताएं आपने क्या पसंद किया और मैं
इसे एक sourcing list में add कर सकता हूँ।

— [Founder]
```

---

## Good email sequences क्या नहीं करतीं

- **Email 1 पर Discount।** Customer को discount का wait करना train करें और आपने उन्हें कभी full price न pay करना train किया है।
- **Category की regardless same generic copy send।** एक supplements abandoned-cart एक candle abandoned-cart से different sound होना चाहिए।
- **Fake countdown timers use।** Customers इनके through देखते हैं और trust erode होता है।
- **Unsubscribe link bury।** इसे findable बनाएं। Clean unsubscribes से list-quality boost छोटे list-size hit के worth है।
- **Win-back email ऐसे send करें जैसे customer आपको कुछ owe करता है।** Autonomy respect करें। Customer का वापस न आने का right है।
