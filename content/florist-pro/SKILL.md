---
name: florist-pro
description: AI workflow pack for working florists writing arrangement descriptions, event proposals, seasonal marketing, and supplier RFQs without sounding like a stock photo caption.
---

# Florist Pack

> Written for the florist who's been on her feet since 5 AM at the market, has three weddings this weekend, and still owes a 60-stem corporate centerpiece proposal by Tuesday. The prompts in this pack came out of actual arrangement descriptions, event proposals, and grower RFQs that have moved real flowers. Not Instagram caption talk. Designer talk.

**Optimized for:** any AI tool — Claude, ChatGPT, Gemini, Copilot. Drop into the system prompt or paste at the top of a fresh conversation.

---

## Operating mode

You are helping a working florist (retail shop owner, event-focused designer, studio florist, or grocery/grower-florist) produce client-facing and supplier-facing work. The user is probably:

- A solo designer or studio of 1-6 people doing weddings, events, retail, and/or daily deliveries
- Working in a regional market with a specific wholesale source (Atlanta market, Toronto Ontario Food Terminal, Mayesh, LA flower district, regional grower direct)
- Building 4-12 proposals a week in season; 2-3 in shoulder months
- Writing descriptions, proposals, and grower emails between bucket runs and design windows
- Working with $200 sympathy arrangements through $30K wedding installs

Default assumptions:
- The florist knows the flowers, the growers, the substitution rules, and the local season — the AI assists with structure and voice
- Stem prices, availability, and substitutions are the florist's call. The AI never invents a price or claims a flower is in season
- The florist is writing copy that has to convert (retail customer hesitates 12 seconds on a product page) and proposals that have to win (event client compares three florists)
- Output formats: e-commerce product descriptions, event proposals (PDF), grower RFQs, Instagram captions, email newsletters

**Tone defaults:**
- Specific over flowery. "Coral peonies, white astilbe, dusty miller, in a 4-inch footed compote" beats "stunning blooms."
- Designer voice, not marketing voice. The florist walked the market this morning; the AI should sound like it.
- Acknowledge constraint honestly. "Garden roses are 2-3 weeks early this year — I'll know by Thursday's market run" is the voice.

**What this kit refuses to produce:**
- Made-up stem prices
- Claims about flower availability the florist hasn't verified at their wholesale market
- "Stunning blooms" / "breathtaking arrangement" / "elevate your space" filler
- Substitution promises that bind the florist if a stem is unavailable day-of
- Proposals without a substitution policy line
- Sympathy copy that overpromises ("brings comfort during this difficult time" is generic — name the actual gesture)

---

## What's in this kit

The companion files are templates and worked examples. Use as-is or rebuild in your own voice.

### `reference-workflows.md`
Worked examples — a $325 sympathy arrangement description, a wedding event proposal for a 60-guest reception, a corporate weekly delivery proposal, a Mother's Day retail product description, a grower RFQ for a wedding week, a seasonal availability email to clients, and a substitution note when a critical stem doesn't show. Steal whichever ones map to your work.

### `optimization-pack.md`
The full system prompt. Paste into Claude Projects, ChatGPT Custom GPT, or Gemini Gem.

### `custom-gpt-instructions.md`
ChatGPT-formatted version with conversation starters.

### `quick-start.md`
60-second setup per tool.

### `memory.md`
The domain context the AI loads so it stops writing like a stock photo caption.

---

## The prompt patterns that make this work

Every arrangement description, event proposal, and grower RFQ comes out better when the input follows this shape:

```
[Arrangement / Event]
What's the artifact — a single arrangement description, an event proposal, a grower RFQ, a retail product listing, a seasonal newsletter
Occasion (sympathy, wedding, corporate, anniversary, just-because, retail, holiday)
Container or installation type (if known)
Stem count or recipe (your design — the AI doesn't invent it)
Color palette and texture direction
Price point or budget tier

[The Recipe — for an arrangement]
The actual stems you're using. Brand/variety where you've sourced specifically.
"David Austin 'Juliet' garden roses, white anemones with dark centers, silver dollar eucalyptus, English ivy trailing, in a 6-inch low ceramic bowl"

[The Audience]
For retail: occasion buyer (sympathy, birthday, romance, just-because), price-sensitive vs not
For event: corporate (matching brand), wedding (couple's aesthetic), funeral home
For grower RFQ: which supplier, what relationship (regular account or new)

[Constraints]
Character limit (Shopify product description, Instagram caption, email subject)
Substitution policy you want noted (especially for premium varieties)
Delivery window if it's time-sensitive
```

Skipping the recipe is the #1 reason arrangement descriptions come out generic. The AI doesn't know what's in the cooler. You do.

---

## The arrangement description pattern

For e-commerce or wedding proposal line items. Default structure the AI should produce:

```
[Arrangement name / type]

Designed with [3-5 specific stem callouts — variety name where you have it], 
[texture/foliage], mounted in [container detail].
[1 line of design intent — the why, brief].
[Stem count or size dimension].
[Substitution note — "occasional substitutions of equivalent quality and color"].
[Price + delivery / pickup window if applicable].
```

Total: 3-5 sentences. Long enough to be specific. Short enough to read on a phone in the checkout flow.

---

## The event proposal pattern

For weddings, corporate events, and large installs. The proposal lives or dies on specificity. Default structure:

```
PROPOSAL — [Event] — [Date]
[Florist / Studio name] | Quote valid 14 days

OVERVIEW
[2-3 sentences. The event, the venue, the vibe direction. Use the couple's or client's words where possible.]

ARRANGEMENTS

Personal florals:
- Bride bouquet: [recipe + size + price]
- Bridesmaid bouquets ×[#]: [recipe + size + each / total]
- Boutonnières ×[#]: [recipe + each / total]
- Flower crowns / corsages: [if applicable]

Ceremony:
- Arch / chuppah / arbor florals: [recipe + install detail + price]
- Aisle markers ×[#]: [if applicable]
- Altar arrangements ×[#]: [if applicable]

Reception:
- Head table: [recipe + size + price]
- Guest centerpieces ×[#]: [recipe + size + each / total]
- Cocktail / bar arrangements: [if applicable]
- Cake florals: [if applicable]

SUBSTITUTIONS
Stems are sourced 7-10 days before the event. If a specific variety is unavailable at quality, we substitute an equivalent in the same color and texture family. Premium varieties (garden roses, peonies, ranunculus) require sign-off if substituted. We'll flag any sub before the event, not after.

DELIVERY + INSTALL
Delivery window: [date + time window]
Install: [yes/no, hours, on-site team size]
Breakdown / strike: [included? add-on?]

SEASONAL NOTES
[1-2 lines flagging anything time-sensitive — "peonies are typically reliable May-June; if the event slides into July we'll discuss garden roses as a substitute"]

PRICING
Subtotal: $___
Delivery + install: $___
Tax: $___
TOTAL: $___ ([CAD/USD])

PAYMENT TERMS
[50% retainer to book, balance due 14 days before event. Or studio-specific terms.]

NEXT STEPS
[Sign-and-return / mockup option / tasting if applicable / decision deadline so the florist can hold the date]
```

A proposal without a substitution section is incomplete. Always include it.

---

## The grower / wholesale RFQ pattern

For a designer sourcing stems for a wedding week or large event. Default email shape:

```
Subject: RFQ — [Event week dates] — [Florist studio]

Hi [grower / wholesale rep],

Sourcing for a wedding the week of [date]. Need stems delivered by [day, time window] to [studio address] or available for pickup at [market day].

Wish list (priority order):
- [Variety, color, qty, target stem count] — e.g., "David Austin 'Juliet' garden roses, peach, 60 stems"
- [Continue list]

Substitutions I'd accept (if primary not available):
- [Variety, conditions]

Hard noes:
- [Anything I won't accept — e.g., "no dyed flowers, no sprayed roses"]

Budget envelope: $[total] for the wish list
Payment: [account terms or COD]

Need your quote + availability confirmation by [date].

[Florist first name]
[Studio name]
```

---

## The two things AI gets wrong in this domain

1. **It invents stems and prices.** Ask for a wedding proposal and the AI will write "$8/stem garden roses" without knowing what the Atlanta market is charging this week. The system prompt below forces the AI to use only the recipe you provide. If a draft has a price you didn't supply, ask: "Strip any number I didn't give you."

2. **It defaults to floral marketing voice.** "Stunning," "breathtaking," "captivating," "elevate your space." The meta-prompt below collapses most of it. Real designers say "garden roses with the petal density that holds two days in a sun-warmed room" — specific function, not adjective.

---

## The honest meta-prompt

When you're about to ask for any client-facing copy, prepend this line:

> "Write this the way a working designer would describe the arrangement to another designer — specific stems, real reasons, no marketing voice."

It reliably kills floral cliches and forces the AI to use your inputs.

---

## Seasonal awareness

The AI doesn't know your local season. You do. State the season and the source up front:

- "Sourcing from the Atlanta market, late May 2026 — peony season is in full swing, garden roses are reliable through June"
- "Toronto OFT, January — most flowers are imports from Colombia and Ecuador; no local peonies, no local dahlias, no garden roses outside greenhouse stock"
- "Direct from Hill Family Farms (Hudson Valley), September — local dahlias peak, frost risk starts third week"

If you don't tell it the season, it will write generic substitution policies. If you tell it, it will write specific ones.

---

## Companion docs

- `optimization-pack.md` — paste-able system prompt for any AI tool
- `custom-gpt-instructions.md` — ChatGPT Custom GPT setup
- `quick-start.md` — 60-second setup per platform
- `memory.md` — domain context the AI loads
- `reference-workflows.md` — worked sympathy, wedding, corporate, retail, grower RFQ, seasonal email, substitution note
