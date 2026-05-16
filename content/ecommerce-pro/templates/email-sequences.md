# Email Sequences

The five sequences every Shopify store needs running. Abandoned cart, welcome series, browse abandonment, post-purchase, win-back. Each is set up for Klaviyo (or Mailchimp) — the structure is platform-agnostic.

Each email includes: subject line (under 50 chars), preview text (under 90 chars), body. The kit produces the full set in one prompt or one email at a time depending on the user's need.

---

## Abandoned cart sequence (3 emails)

The highest-leverage flow in DTC. Industry-standard recovery rate is 10-15% of abandoned carts; well-tuned flows hit 20%+.

**Send times:** 1 hour after abandonment, 24 hours after, 72 hours after.

### The prompt

```
You are writing a 3-email abandoned cart sequence.

Brand: [3-5 voice notes]
Average AOV: [$X — affects whether email 3 should include a discount]
Product category: [apparel / home / beauty / food / supplements / etc.]
Common objections: [list 2-3 things customers hesitate on — shipping cost, sizing uncertainty, return policy, ingredient questions]

Output 3 emails:
- Email 1 (send 1 hour after abandonment): friendly nudge, no discount, focus on the product they left
- Email 2 (send 24 hours after): address the most likely objection
- Email 3 (send 72 hours after): incentive — discount, free shipping, or social proof depending on AOV

For each: subject line (under 50 chars), preview text (under 90 chars), body (120-200 words).
No banned words. No fake urgency.
```

### Worked example — beauty brand, AOV $60

**Email 1 (1 hour after):**
```
Subject (32 chars): Did your cart wander off?
Preview (78 chars): The ceramide moisturizer you were looking at is still here when you're ready.

Hi [first name],

Looks like you were checking out the ceramide moisturizer earlier. It's still in your cart if you want to pick up where you left off.

A few things people usually want to know before ordering:
- Free shipping over $50
- 60-day return policy, even on opened bottles
- Ships within 1-2 business days from Toronto

[Return to your cart →]

If you decided it wasn't the right fit, no worries. We're easy to reach if you want to ask anything.

— [Brand]
```

**Email 2 (24 hours after — addressing the "is this right for my skin" objection):**
```
Subject (44 chars): About the moisturizer in your cart
Preview (82 chars): Quick note on what makes ours work for sensitive, over-stripped skin types.

Hi [first name],

Quick note — the most common question we get on the ceramide moisturizer is "will this work for me?"

It's built for:
- Skin that's reactive to actives or fragrance
- People using retinol or other actives who need a low-irritation base
- Anyone who's been over-cleansing or stripping the barrier

It's probably not the right fit if:
- You're looking for a heavy occlusive overnight cream
- You want a strongly hydrating gel — this is a balanced moisturizer, not a hydration bomb

If that lines up, [the bottle in your cart] is here.

If you want to ask anything before ordering, reply to this email. I read these.

— [Founder name]
```

**Email 3 (72 hours after — soft incentive):**
```
Subject (37 chars): One last note before we let it go
Preview (76 chars): 10% off on the cart you started, plus a quick reminder of why people stick.

Hi [first name],

Going to leave this one in your hands. The cart you started a few days ago — we'll hold it for the next 48 hours with 10% off if you want it.

Use code STILLHERE at checkout.

For what it's worth: we have a 4.8-star rating across 1,400+ reviews, and the moisturizer is our top-reordered product (most customers come back for a second bottle within 10 weeks).

[Use STILLHERE on your cart →]

Either way, hope you find what you're looking for.

— [Brand]
```

---

## Welcome series (4 emails over 30 days)

Sent to first-time email subscribers (signups via pop-up, footer form, or post-purchase). 4 emails over 30 days.

**Send times:** immediately, day 3, day 10, day 28.

### The prompt

```
You are writing a 4-email welcome series for new subscribers.

Brand: [3-5 voice notes]
Brand story (1-3 sentences): [paste — what makes this brand exist]
Product range: [3-5 categories or hero products]
Sign-up incentive: [what we promised — 10% off, free shipping, etc.]

Output 4 emails:
- Email 1 (immediate): thank-you + first-purchase incentive code
- Email 2 (day 3): brand story — 1-minute read max
- Email 3 (day 10): best-sellers or how to choose what's right for you
- Email 4 (day 28): community / review request / referral CTA

For each: subject line (under 50 chars), preview text (under 90 chars), body (150-250 words).
No banned words.
```

### Worked example — home goods brand, sign-up incentive: free shipping

**Email 1 (immediate):**
```
Subject (28 chars): Welcome — your code's below
Preview (75 chars): Free shipping on your first order, plus a quick rundown of what we make.

Hi [first name],

Welcome. Use code FIRSTSHIP at checkout for free shipping on your first order.

We make small-batch home goods — candles, ceramics, textiles — out of a shop in Vancouver. Everything is made in batches of 20-40, and most of it sells out within a month of restock.

A few things worth knowing:
- New batches drop the first Friday of every month
- We email subscribers 24 hours before public release
- Returns are accepted on unopened candles and unused textiles within 30 days

If you have questions before you order, reply to this email. It comes to my desk.

— [Founder name]

[Code: FIRSTSHIP — Free shipping, first order]
```

**Email 2 (day 3 — brand story):**
```
Subject (33 chars): How this place came to exist
Preview (85 chars): A short story about why we make beeswax candles and slow-fire ceramics in 2026.

[150-200 word brand story — keep it grounded; no "passion" language; show the actual reason the brand exists]
```

**Email 3 (day 10 — best-sellers / guidance):**
```
Subject (42 chars): If you're not sure where to start...
Preview (88 chars): A few of our best-reordered things, plus what most people pair them with.

[150-250 word product guide; 3-4 best-sellers with one-line reasons]
```

**Email 4 (day 28 — referral / review CTA):**
```
Subject (37 chars): A small ask if you ordered
Preview (89 chars): If something you bought landed well — would you tell us about it?

[Short ask for a review on whatever they bought, OR a referral CTA if they haven't bought yet]
```

---

## Browse abandonment (2 emails)

Sent to subscribers who viewed a product but didn't add to cart. Lower-intent than cart abandonment — tone is softer.

**Send times:** 4 hours after a product view, 48 hours after.

### Compact prompt

```
Brand: [3-5 voice notes]
Product viewed: [product name + 1-sentence description]
Common reason someone browses without adding: [paste — price, sizing, ingredients, didn't have time]

Output:
- Email 1 (4 hours after view): light "just so you have the link" message
- Email 2 (48 hours after view): one piece of useful info (a review excerpt, a one-line answer to a common objection)

Each: subject under 50 chars, preview under 90 chars, body 80-150 words.
No banned words. No discount in this sequence.
```

---

## Post-purchase sequence (3 emails)

Sent after order completion. Order confirmation, shipping notification, review request.

**Send times:** immediately, on ship confirmation, 10-14 days after delivery (for consumables) or 21-30 days after delivery (for considered purchases).

### The pattern

The first two (order confirmation, shipping) are mostly transactional but the kit makes them warmer than the default Shopify templates. The third (review request) is where the writing matters.

```
Brand: [voice notes]
Product just delivered: [name]
Review platform: [Judge.me / Yotpo / Loox / native Shopify]
Incentive (if any): [discount on next purchase, entry in a giveaway, none]

Output review-request email:
- Subject (under 50 chars)
- Preview (under 90 chars)
- Body (100-180 words)
- Single clear CTA to leave a review
- Acknowledge that reviews are a small ask and a real help
- No banned words
- Do not promise the review will be published or that it should be 5 stars
```

### Worked example — supplements brand

```
Subject (39 chars): Hope the magnesium is working out
Preview (88 chars): Two weeks in is when most people notice — quick ask if you have a sec.

Hi [first name],

Two weeks in is usually when people start noticing whether the magnesium is doing what they hoped, or whether it's not the right fit.

If you've got 60 seconds, would you leave a quick review? Honest is more useful to other people than positive — if it didn't work for you, we'd rather know.

[Leave a review →]

And if anything came up — the wrong product, capsule trouble, anything — reply to this email and we'll sort it.

Thanks for trying us out.

— [Founder]
```

---

## Win-back (2 emails)

Sent to customers who haven't ordered in 60-120 days (depending on category — consumables = shorter, considered = longer).

**Send times:** 60 days lapsed, 90 days lapsed.

### The prompt

```
Brand: [voice notes]
Average order frequency for this brand: [every X weeks for consumables, etc.]
Most-likely-to-reorder products: [list 2-3]

Output 2 emails:
- Email 1 (60 days): no-pressure check-in, ask if everything is good
- Email 2 (90 days): low-friction incentive — 15% off, free shipping, or restock reminder

Each: subject under 50 chars, preview under 90 chars, body 100-180 words.
No banned words. Do not imply the customer is falling behind. Respect autonomy.
```

### Worked example — coffee brand

**Email 1 (60 days):**
```
Subject (38 chars): No pressure — quick check-in
Preview (75 chars): Just making sure your coffee situation hasn't gone sideways since spring.

Hi [first name],

It's been about two months since your last order — wanted to check in. No pressure to reorder; just making sure we didn't drop the ball somewhere.

If you ran out and got busy, [the Ethiopia Guji you bought last time is still on the menu]. If you're trying something new from a different roaster, that's great — let me know what you ended up liking and I might add it to a sourcing list.

— [Founder]
```

---

## What good email sequences don't do

- **Discount on email 1.** Train the customer to wait for the discount and you've trained them never to pay full price.
- **Send the same generic copy regardless of category.** A supplements abandoned-cart should sound different from a candle abandoned-cart.
- **Use fake countdown timers.** Customers see through them and trust erodes.
- **Bury the unsubscribe link.** Make it findable. The list-quality boost from clean unsubscribes is worth the small list-size hit.
- **Send the win-back email like the customer owes you something.** Respect autonomy. The customer has the right not to come back.
