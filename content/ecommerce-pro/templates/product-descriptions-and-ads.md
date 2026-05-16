# Product Descriptions + Ad Copy

Product descriptions by category, ad copy by platform, character limits enforced. Designed to ship in one session — write the PDP, then run the ad set in the same hour.

---

## Product description prompt

```
You are writing a product description for a Shopify PDP.

Product:
- Name: [name]
- Category: [apparel / home / beauty / food / supplements / kids / electronics / accessories]
- What it is (one sentence): [paste]
- Key materials / ingredients / specs: [list 3-5 things that matter to the buyer]
- Size / weight / variant info: [if relevant]
- Price: [$X]

Brand context:
- Who you sell to: [audience in one sentence]
- Voice notes: [3-5 notes on how the brand talks — short sentences, direct, warm, no slang, etc.]
- Anything off-limits: [claims you can't make, words your brand doesn't use, etc.]

Angle: [efficacy / luxury / value / produce-all-three]

Length: [short 50-80w / standard 80-150w / long 150-300w]

Constraints:
- Include: [specific certifications, materials, anything mandatory]
- Avoid: [banned words for your brand]

Output the description in the standard structure:
1. Hook (10-25 words)
2. Key benefit (1 sentence)
3. Features (3-5 bullets)
4. Social proof line (optional)
5. CTA (1 line)
```

---

## Worked examples by category

### Apparel — merino base layer, $89

**Brand context:** Performance outdoor brand. Direct, technical-friendly voice. Audience: 30-45 year-old hikers, skiers, cyclists who research gear.

**Efficacy angle:**
> Merino that handles a week of use before it needs a wash.
>
> 18.5-micron New Zealand merino, knit at 230 gsm — fine enough for next-to-skin comfort, dense enough to retain warmth when damp. Built for multi-day trips where laundry isn't an option.
>
> - 18.5-micron merino, 230 gsm
> - Flatlock seams, no shoulder rub under pack straps
> - Thumb loops on the cuffs
> - Tagless neck, gusseted underarm
>
> Wears odor-free for 5-7 days of active use. Hand-wash cold.
>
> $89 | XS-XXL | Ships in 1-2 business days

### Home — beeswax candle, $24

**Brand context:** Small-batch home goods brand. Warm, low-key voice. Audience: 28-50 year olds furnishing their first or second home, prefer natural materials.

**Value angle (matching the price point — luxury angle would feel false):**
> Beeswax, cotton wick, 50-hour burn time. $24.
>
> A simple beeswax candle. No fragrance oils, no soy blends, no fancy vessel. Burns clean and slow, smells faintly of honey, throws warm light across a kitchen table for the second half of dinner.
>
> - 100% beeswax, sourced from BC
> - Cotton wick (no metal core)
> - ~50-hour burn time
> - Reusable ceramic vessel, 8oz
>
> Made in batches of 30. Restocks the first Friday of each month.
>
> $24 | Free shipping over $40

### Beauty — vitamin C serum, $58

**Brand context:** Mid-range skincare brand. Specific, confident voice. Audience: skincare-literate adults 28-45.

**Efficacy angle:**
> 15% L-ascorbic acid, fresh-packed in dated bottles.
>
> A daily vitamin C serum in its most studied form — L-ascorbic acid at 15%, paired with ferulic acid and vitamin E to stabilize it. Brightens, evens tone, and works under SPF.
>
> - 15% L-ascorbic acid (pH 3.2)
> - 1% ferulic acid + 1% vitamin E
> - Bottled the week it ships — every bottle dated
> - Glass dropper, amber bottle (light-stable)
>
> Use AM, 4-5 drops, before moisturizer and SPF. 12-week supply at daily use.
>
> $58 | 30ml | Free shipping over $50

### Food — single-origin coffee, $22

**Brand context:** Specialty coffee roaster. Plainspoken voice. Audience: home espresso drinkers, pour-over crowd, gift buyers.

**Efficacy angle (where efficacy means: tells you what it tastes like):**
> Ethiopia Guji, washed process, lot 24.
>
> A washed Ethiopia from the Guji region — bright, floral, the kind of cup that holds up well in a V60 or as espresso. Roasted to the lighter side of medium.
>
> - Single-origin: Guji, Ethiopia
> - Washed process
> - Tasting notes: bergamot, white grape, jasmine
> - Roasted: the day before it ships
> - Whole bean or ground to your grinder
>
> 250g bag. Best within 4-6 weeks of roast date.
>
> $22 | Free shipping over $40

### Supplements — magnesium glycinate, $36

**Brand context:** Functional supplement brand. Direct, no-fluff voice. Audience: adults 28-50 who read labels.

**Efficacy angle (and a worked example of claims discipline):**
> 400mg of chelated magnesium glycinate. No filler.
>
> A daily magnesium supplement in the form most gentle on digestion — glycinate, fully chelated for absorption. Two capsules deliver 400mg of elemental magnesium.
>
> - 400mg elemental magnesium (as glycinate) per 2-capsule serving
> - Third-party tested for purity
> - No fillers, no stearates, no titanium dioxide
> - 90 capsules per bottle (45-day supply)
>
> Take 1-2 capsules with dinner. Consult a healthcare provider if you have kidney conditions.
>
> $36 | Free shipping over $50

**Note on this one:** the description does not say "improves sleep," "reduces anxiety," or "supports recovery." Those are structure-function claims that need FDA-aware framing. The kit defaults to descriptive language.

---

## Ad copy templates

Built for the platforms most Shopify owners actually run.

### Meta ad set prompt

```
You are writing a Meta ad set (Facebook + Instagram) for:

Product: [name + 1-sentence description]
Brand: [3-5 brand voice notes]
Goal: [cold traffic / retargeting / launch / promo]
Promo (if any): [paste offer]
Audience: [the persona this ad targets — one sentence]

Output:
- 3 primary text variants (125 chars optimal each — state char count)
- 3 headline variants (40 chars max each — state char count)
- 1 description variant (30 chars max — state char count)

Constraints:
- No banned words (transform, elevate, unlock, luxe, etc.)
- Hook in the first 7-10 words (above the "See more" line on mobile)
- One clear next step
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
You are writing Google Responsive Search Ads for:

Product: [name + 1-sentence description]
Search intent: [what the user is searching when they see this ad]
Keywords being targeted: [list 3-5]
Promo (if any): [paste offer]

Output:
- 8 headline variants (30 chars max each — state char count)
- 3 description variants (90 chars max each — state char count)

Constraints:
- Each headline must be self-standing (Google rotates them)
- Include product type + a benefit + a price or promo signal across the set
- No banned words
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
You are writing TikTok ad copy for:

Product: [name + 1-sentence description]
Format: [Spark Ad on existing creator post / brand-direct ad]
Hook style: [problem-statement / contrarian / before-after / direct-callout]
Audience: [one sentence]

Output:
- 3 caption variants (100 chars optimal each — state char count)
- 1 display name suggestion (40 chars max)

Constraints:
- TikTok captions front-load the hook
- Avoid "shop now" — use "link in bio" or product-specific language
- No banned words
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

## When the brand needs a different angle

If the first draft lands flat, switch the angle and re-prompt. A common pattern:

- Efficacy angle felt too clinical → try luxury
- Luxury angle felt overwrought → try value
- Value angle felt cheap → try efficacy with confident-but-specific framing

The same product can ship under three different angles and you can A/B test which one converts best on a single platform before scaling.

---

## What good ad copy doesn't do

- **Stuff the headline with the brand name.** "Brand Name's New Premium Moisturizer" wastes 30 characters.
- **End every line with a question mark.** TikTok ads especially — direct statements out-convert "Tired of dry skin?"
- **Use exclamation points as a vibe substitute.** One exclamation per ad is plenty.
- **Promise outcomes without substantiation.** Stick to descriptive language unless you have the citation.
- **Run the same ad copy on all three platforms.** Each platform has a different rhythm — Meta is permissive, Google is keyword-driven, TikTok is voice-y.
