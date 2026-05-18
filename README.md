# Lumenari

Optimization kits for your AI. The storefront and storefront-only — Stripe, Supabase, Anthropic, Resend wired up; no auth.

Built on Next.js 16 (App Router) + TypeScript + Tailwind v4 + Supabase + Stripe.

## What's here

```
src/
  app/
    page.tsx              hero + 3-step wizard
    kits/
      page.tsx            full catalog
      [slug]/page.tsx     kit detail (also handles /kits/all-six bundle)
    library/page.tsx      "send me my downloads" lookup
    cart/page.tsx         redirect-to-checkout (intentional, no cart)
    thanks/page.tsx       post-checkout confirmation
    api/
      recommend/          Anthropic-driven kit recommendations
      checkout/           Stripe Checkout Session creation
      webhook/stripe/     Stripe → Lumenari (records purchase, emails buyer)
      library/request/    Email-based "send me my downloads" lookup
      download/[slug]/    Token-gated kit download (concatenated .md)
  components/             Logo, Wizard, KitCard, BuyButton, LibraryLookup
  data/kits.ts            The 6 SKUs + bundle definition
  lib/                    Supabase, Stripe, Anthropic, Resend singletons
content/
  ts-next-production/     6 kit content folders, each with SKILL.md + supporting files
  supabase-schema-rls/
  stripe-connect/
  trades-construction/
  startup-founder/
  apple-style-ux/
supabase/
  migrations/0001_init.sql   kits, kit_files, purchases, purchase_downloads + RLS
```

## Getting started

```bash
cp .env.example .env.local
# Fill in the env vars (see below for Chris-side TODO)

npm install
npm run dev
```

Then visit http://localhost:3000.

## Chris-side TODO before the site is live

1. **Create a new Supabase project** at supabase.com. Apply `supabase/migrations/0001_init.sql` from the SQL editor (or via `supabase db push` from the CLI).
2. **Stripe dashboard:** create 6 one-time products + 1 bundle product. Paste their Price IDs into `.env.local` (`STRIPE_PRICE_*`). Mode: payment, currency: USD.
3. **Stripe webhook:** in the dashboard, add a webhook endpoint pointing to `https://lumenari.io/api/webhook/stripe`. Subscribe to `checkout.session.completed`. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`.
4. **Anthropic API key** at console.anthropic.com → paste into `ANTHROPIC_API_KEY`.
5. **Resend** at resend.com → verify `lumenari.io` as a sending domain, paste the API key into `RESEND_API_KEY`.
6. **Vercel:** point Vercel at the repo. Add all env vars to the Vercel project. Point DNS for `lumenari.io` → Vercel.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

All three should be clean.

## Brand

Palette pulled from the logo (warm golds at the sun, spectrum oranges through the middle, deep cool blues at the base). Tokens live in `src/app/globals.css` as CSS custom properties + Tailwind v4 theme aliases (`--color-sun`, `--color-amber`, `--color-deep`, etc.).

## Design direction

Apple-clean. One primary CTA per screen. Plain conversational copy. Generous whitespace. Subtle fade-up transitions via Framer Motion. 44pt minimum touch targets.

## Status (snapshot at scaffold)

- Storefront pages: shipped
- Wizard: shipped, Anthropic-backed with heuristic fallback
- Stripe checkout: wired, blocked on creating Stripe products
- Supabase schema: migration shipped, blocked on running it
- Email delivery: wired, blocked on Resend domain verification
- SKU content: all 6 kits authored
- Auth: none (intentional for MVP — email-based library lookup is the access pattern)
- Tests: scaffolded test for `/api/recommend` lives at `src/app/api/recommend/route.test.ts`
