# Review Responses + Supplier / Wholesale Outreach

Two of the most time-sapping admin tasks in a Shopify store: responding to reviews each week and writing supplier or wholesale emails when you're trying to grow. This playbook gives you the patterns for both.

---

## Review responses

Public reviews are read by future buyers more than by the reviewer. The response is for the reader, not the writer.

**Three tones available:**

- **Friendly** — conversational, light, brand voice forward. Good for lifestyle and consumer categories.
- **Professional** — measured, polite, no slang. Good for B2B-leaning DTC, supplements, and higher-price-point goods.
- **Warm** — empathetic, specific, slightly more personal. Good for beauty, wellness, food, and any brand where the relationship is part of the product.

The kit defaults to friendly unless the user specifies.

### The prompt

```
You are responding to a product review.

Review:
- Rating: [1-5 stars]
- Title (if any): [paste]
- Body: [paste]
- Reviewer name: [first name only]
- Product: [name]

Brand voice: [3-5 notes]
Tone: [friendly / professional / warm]

Output the response (40-100 words) in the brand's voice.

Rules:
- Match length and emotional register to the review
- 5-star reviews: brief, warm, specific to what they said
- 4-star: warm + curious follow-up on what would have made it a 5
- 3-star: thank for honesty, ask one clarifying question, offer to help
- 2-star: apologetic, specific to the issue, route to support email
- 1-star: apologetic, specific, route to support email + offer remediation
- Never get defensive in public
- Never argue with the reviewer
- Never use "We're sorry you feel that way" — that's defensive
- If the review mentions a defective product, broken shipment, or service failure, address it directly
- For negative reviews: take responsibility where appropriate, route to private channel for resolution
- Sign with a real name (founder, customer-success lead) when possible
```

---

## Worked examples by rating

### 5-star review

**Review:**
> ★★★★★ — Finally something for sensitive skin
> "I've tried every fragrance-free moisturizer and most of them still break me out. This one didn't. Three months in and my skin barrier is actually better. Reordering."

**Response (friendly tone, 38 words):**
> Three months in is a good signal — that's when the barrier work starts to show. Glad it landed for you. Reach out anytime if you want help layering it under retinol or actives.
>
> — [Founder name]

### 4-star review

**Review:**
> ★★★★ — Good but bottle is small
> "The moisturizer works as advertised. My only complaint is the 30ml bottle goes faster than I expected at twice-daily use. Otherwise great."

**Response (friendly, 42 words):**
> Thanks for the honest take. The 30ml bottles last about 6-8 weeks at twice-daily — we're planning a 60ml size for fall. If you're going through it faster, you might be applying a bit more than needed (4-5 drops is plenty).
>
> — [Customer Success]

### 3-star review

**Review:**
> ★★★ — Texture is weird
> "It's fine but the texture is sticky for the first 20 seconds before it sinks in. Not what I expected from the photos."

**Response (warm, 55 words):**
> Hi [name] — appreciate you flagging that. The sticky first-20-seconds is the niacinamide and glycerin layer settling; usually clears after a minute or two. If it's still tacky 5 minutes after application, that's not normal — could be an interaction with a serum underneath. Reply to this with your routine and I'll take a look.
>
> — [Founder]

### 2-star review

**Review:**
> ★★ — Caused a breakout
> "Hoped for the best but this gave me cystic breakouts within a week. Returning."

**Response (warm, 52 words):**
> Hi [name] — sorry it didn't work for you. Cystic breakouts in the first 1-2 weeks usually mean one of the ingredients isn't agreeing with your skin (niacinamide or one of the actives). We honor returns on opened bottles — email support@brand.com and we'll process it today.
>
> — [Founder]

### 1-star review

**Review:**
> ★ — Arrived damaged and customer service ghosted me
> "Bottle leaked all over the box, contacted support twice with no response. Save your money."

**Response (warm, 58 words):**
> Hi [name] — this is on us. A leaked shipment and no response is unacceptable. I checked and your messages went into a folder we missed for two days. I've already issued a replacement (shipping today, no charge) and a full refund. I'll personally make sure this doesn't happen again. Reply if anything else got missed.
>
> — [Founder name]

---

## What good review responses do

- **Address what the reviewer actually said.** Generic "thanks for your feedback" reads as canned. The response should quote or reference a specific detail from the review.
- **Take responsibility quickly on negative reviews.** Future buyers reading them watch for whether the brand defends or owns. Owning wins.
- **Route resolution to private channels.** Don't negotiate a refund in the review thread. Acknowledge publicly, resolve privately.
- **Sign with a name.** A name signals accountability. "The Brand Team" reads less trustworthy than "Sarah, founder."
- **Match length to review length.** A two-line review gets a two-line response. A paragraph review gets a paragraph back.

## What good review responses don't do

- **"We're sorry you feel that way."** Pure defensive language. Don't.
- **Argue.** If the reviewer is wrong about a product fact, correct gently and offer to discuss privately. Don't litigate in public.
- **Upsell in the response.** "Try our other product!" on a complaint reads tone-deaf.
- **Promise outcomes you can't deliver.** "We'll make sure this never happens again" — only if you actually have a plan to.
- **Copy-paste the same line across 20 reviews.** Future buyers scroll. Sameness reads as not-caring.

---

## Supplier outreach

For first contact with potential suppliers — manufacturers, ingredient houses, packaging vendors, fulfillment partners.

### The prompt

```
You are writing a first-contact email to a potential supplier.

Brand: [name + 1-sentence description]
Product line: [what you sell or plan to make]
Current stage: [pre-launch / launched, scaling / established, looking to switch suppliers]
Volume estimate: [projected monthly or annual units; rough is fine]
What you need from this supplier: [list 2-3 specific things — MOQ, lead time, sample availability, certifications]
Found them via: [trade show / Alibaba / referral / their website]

Output a first-contact email under 200 words.

Rules:
- Subject under 60 chars
- Open with who you are + what you sell + why you're reaching out
- State volume estimate honestly (don't inflate)
- Ask 2-3 specific questions
- Polite, professional, no pressure
- Close with a clear next step (sample request, MOQ confirmation, call to discuss)
- Sign with name + role + brand
```

### Worked example — small skincare brand sourcing a new bottle supplier

```
Subject (52 chars): Glass dropper bottle inquiry — small DTC brand

Hi [name],

I'm [Your name], founder of [Brand] — a small DTC skincare brand based in Toronto. We've been shipping [number] units per month and are looking for a new supplier for our 30ml amber glass dropper bottles.

Current volume:
- ~5,000 bottles per quarter
- Growing ~15% quarter-over-quarter
- Looking to lock in supply for the next 12 months

A few questions before we go deeper:

1. What's your MOQ for the standard 30ml amber dropper with glass pipette and rubber bulb?
2. What's a typical lead time from PO to delivery to Toronto?
3. Are samples available, and if so, what's the cost?

If those line up with what we need, I'd like to set up a 20-minute call to walk through specs.

Thanks for considering.

— [Your name]
Founder, [Brand]
[Phone]
```

That's the pattern. Specific, honest about volume, clear questions, easy next step.

---

## Wholesale outreach to retailers

For approaching brick-and-mortar retailers, online curators, or distributors who might carry your product.

### The prompt

```
You are writing an outreach email to a potential wholesale account.

Brand: [name + 1-sentence description]
Product range: [what you'd offer wholesale]
Wholesale margin: [your standard wholesale terms — 50% off MSRP is typical]
Minimum opening order: [your MOQ for wholesale]
Existing wholesale accounts (if any): [list 2-3 — drops a name builds trust]
Retailer being approached: [name + why they're a fit]

Output an outreach email under 200 words.

Rules:
- Subject under 60 chars; specific to the retailer when possible
- Open with why this retailer specifically (1 sentence — show you've looked at them)
- State the brand and category in one line
- Margins + minimums up front (don't make them ask)
- Drop 1-2 existing accounts if you have them
- Offer a sample or line sheet as the next step
- Close with name + brand + line sheet link or attachment
```

### Worked example — skincare brand approaching a curated wellness retailer

```
Subject (59 chars): [Brand] for [Retailer] — wholesale inquiry

Hi [name],

I noticed [Retailer] carries [a specific brand they already stock] and have built a curated assortment that's a tight fit with what we make.

I'm [Your name], founder of [Brand] — small-batch fragrance-free skincare made in Vancouver. Our hero is a ceramide moisturizer that's our #1 reordered SKU (4.8 stars, 1,400+ reviews).

Wholesale terms:
- 50% off MSRP
- $500 minimum opening order
- Net 30 terms after first order
- 12-week lead time on restocks
- Currently in 18 retailers across Canada, including [Account 1] and [Account 2]

I'd love to send a sample set so you can try the line. Line sheet attached.

Free for a 15-minute call any time next week if that's easier.

— [Your name]
Founder, [Brand]
```

---

## When supplier outreach goes wrong

- **Inflating volume to negotiate better MOQ.** Suppliers verify. Caught lies tank the relationship before it starts.
- **Vague asks.** "Can you tell me more about your services?" wastes their time. Ask specific questions.
- **Skipping the introduction.** Suppliers get spam. Lead with who you are and why you're a real prospect.
- **No clear next step.** Always end with "if [criteria], I'd like to schedule a call" or "can you send a sample?"
- **Treating it like a sales email.** Suppliers are partners, not customers. The register is collaborative, not transactional.
