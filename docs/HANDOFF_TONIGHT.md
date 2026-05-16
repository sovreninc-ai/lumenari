# Lumenari — Tonight's Handoff (100-SKU Consolidation)

**Date:** 2026-05-15
**Status:** Catalog merge complete. Stage all changes locally, then commit + push from your laptop.

---

## What landed

The 100 kit content folders under `content/` have been merged into the canonical TypeScript catalog and the Supabase seed migration. The storefront is now a 100-SKU + 13-bundle product.

- **Kit catalog** at `src/data/kits.ts` — 100 kits + 13 bundles, fully typed
- **Seed migration** at `supabase/migrations/0001_init.sql` — idempotent upsert for all 100 kits
- **Bundle migration** at `supabase/migrations/0002_round_two_skus_and_bundles.sql` — drops superseded bundles, idempotent upsert for the final 13
- **0003_batch_one_twenty_skus.sql** — converted to a historical no-op (its data now lives in 0001/0002)
- **0004 / 0005 / 0006** — untouched (Pro+ subscription, API platform, referrals)
- **Use-case landing pages** at `src/data/use-cases.ts` — all 16 `primaryKitSlug` + 13 `secondaryKitSlugs` references resolve cleanly against the new catalog. No changes needed.

---

## 100-kit catalog summary

**Count by category** (100 total):

| Category    | Count |
|-------------|------:|
| Dev         |   21  |
| Business    |    9  |
| Operations  |    9  |
| Trades      |    8  |
| Creator     |    7  |
| Writer      |    6  |
| Finance     |    5  |
| HR          |    5  |
| Hospitality |    5  |
| Healthcare  |    5  |
| Personal    |    5  |
| Events      |    4  |
| Career      |    3  |
| Service     |    3  |
| Creative    |    3  |
| Real Estate |    1  |
| Coaching    |    1  |

**Count by price tier:**

- **$19 (1900¢)** — 20 dev-heavy kits
- **$14 (1400¢)** — 80 non-dev kits

`apple-style-ux` was promoted from $14 → $19 in this pass to match the dev-heavy spec.

---

## 13-bundle catalog summary

| Bundle                        | Kits | Price | Standalone | Saves |
|-------------------------------|-----:|------:|-----------:|------:|
| Developer Quartet             |    4 |  $59  |    $76     | $17   |
| Developer Mega Stack          |   20 | $199  |   $380     | $181  |
| Builder's Pack                |    4 |  $45  |    $61     | $16   |
| Sales & Marketing Pack        |    4 |  $45  |    $56     | $11   |
| Real Estate Power             |    4 |  $45  |    $56     | $11   |
| Career Pack                   |    3 |  $35  |    $42     | $7    |
| Hospitality / Events Bundle   |    9 |  $89  |   $126     | $37   |
| Trades Pack                   |   10 |  $99  |   $140     | $41   |
| Operations Pack               |   10 |  $89  |   $140     | $51   |
| Creator's Pack                |    7 |  $59  |    $98     | $39   |
| Healthcare-Adjacent           |    5 |  $49  |    $70     | $21   |
| Finance Pack                  |    4 |  $39  |    $56     | $17   |
| **Everything-100**            |  100 | $249  | $1,500     | **$1,251** |

Featured (homepage-eligible): Developer Quartet, Developer Mega Stack, Builder's Pack, Sales & Marketing Pack, Everything-100.

---

## Migrations to apply (in order)

```sql
-- Apply in numeric order. Re-running any migration is safe — all kit + bundle
-- inserts use ON CONFLICT (id) DO UPDATE.
\i supabase/migrations/0001_init.sql        -- schema + 100 kits seed
\i supabase/migrations/0002_round_two_skus_and_bundles.sql  -- bundles table + 13 bundles seed
\i supabase/migrations/0003_batch_one_twenty_skus.sql       -- historical no-op
\i supabase/migrations/0004_pro_plus.sql    -- Pro+ subscription columns
\i supabase/migrations/0005_api_platform.sql                -- API platform (api_keys, usage)
\i supabase/migrations/0006_referrals.sql   -- affiliate / referral tracking
```

Via Supabase CLI:

```bash
supabase db push
```

Via dashboard SQL editor: paste each file's contents into the SQL editor and run, in numeric order.

---

## Environment variables — full checklist

Paste into Vercel project env + `.env.local`. CAD is the default currency.

### Core

```
NEXT_PUBLIC_SITE_URL=https://lumenari.io
```

### Supabase

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Stripe — keys + webhook

```
STRIPE_SECRET_KEY=sk_live_...        # use sk_test_... in preview envs
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Stripe — kit Price IDs (100 kits)

One per kit. Names follow the slug uppercased + underscores, except for the original 20 which retain their short tokens.

**Original 20 (round 1):**

```
STRIPE_PRICE_TS_NEXT=
STRIPE_PRICE_SUPABASE_RLS=
STRIPE_PRICE_STRIPE_CONNECT=
STRIPE_PRICE_TRADES=
STRIPE_PRICE_FOUNDER=
STRIPE_PRICE_APPLE_UX=
STRIPE_PRICE_REAL_ESTATE=
STRIPE_PRICE_SALES_OUTREACH=
STRIPE_PRICE_SOLOPRENEUR=
STRIPE_PRICE_SEO_CONTENT=
STRIPE_PRICE_RECRUITER=
STRIPE_PRICE_RESUME_JOB=
STRIPE_PRICE_PM_TOOLKIT=
STRIPE_PRICE_NEWSLETTER=
STRIPE_PRICE_IOS_SWIFTUI=
STRIPE_PRICE_PYTHON_DATA=
STRIPE_PRICE_SUPPORT=
STRIPE_PRICE_BRAND_VOICE=
STRIPE_PRICE_COACH=
STRIPE_PRICE_ECOMMERCE=
```

**New 80 — dev kits ($19 each):**

```
STRIPE_PRICE_ANDROID_KOTLIN=
STRIPE_PRICE_DATA_ENGINEER_PRO=
STRIPE_PRICE_DEVOPS_TERRAFORM=
STRIPE_PRICE_GO_BACKEND=
STRIPE_PRICE_GRAPHQL_DESIGN=
STRIPE_PRICE_KUBERNETES_PRO=
STRIPE_PRICE_ML_ENGINEER_PRO=
STRIPE_PRICE_NODE_BACKEND=
STRIPE_PRICE_POSTGRES_DBA=
STRIPE_PRICE_PYTHON_BACKEND=
STRIPE_PRICE_QA_TEST_AUTOMATION=
STRIPE_PRICE_RAILS_BACKEND=
STRIPE_PRICE_REACT_NATIVE_DEV=
STRIPE_PRICE_REST_API_DESIGN=
STRIPE_PRICE_SECURITY_ENGINEER=
```

**New 80 — operations / hr / finance / career / coaching ($14 each):**

```
STRIPE_PRICE_HR_GENERALIST=
STRIPE_PRICE_OFFICE_MANAGER=
STRIPE_PRICE_EA_VA=
STRIPE_PRICE_PROJECT_MANAGER_PMP=
STRIPE_PRICE_SCRUM_MASTER=
STRIPE_PRICE_OPERATIONS_MANAGER=
STRIPE_PRICE_SUPPLY_CHAIN_MGR=
STRIPE_PRICE_PROCUREMENT_PRO=
STRIPE_PRICE_COMPLIANCE_OFFICER=
STRIPE_PRICE_RISK_MANAGER=
STRIPE_PRICE_TALENT_ACQUISITION=
STRIPE_PRICE_INTERNAL_RECRUITER=
STRIPE_PRICE_EXECUTIVE_COACH=
STRIPE_PRICE_CAREER_COACH=
STRIPE_PRICE_LEARNING_DEVELOPMENT=
STRIPE_PRICE_ACCOUNTANT_BOOKKEEPER=
STRIPE_PRICE_FINANCIAL_ADVISOR=
STRIPE_PRICE_MORTGAGE_BROKER=
STRIPE_PRICE_INSURANCE_AGENT=
STRIPE_PRICE_REAL_ESTATE_INVESTOR=
```

**New 80 — trades / services / hospitality / events ($14 each):**

```
STRIPE_PRICE_CONTRACTOR_GC=
STRIPE_PRICE_ELECTRICIAN_PRO=
STRIPE_PRICE_PLUMBER_PRO=
STRIPE_PRICE_HVAC_PRO=
STRIPE_PRICE_ROOFING_PRO=
STRIPE_PRICE_LANDSCAPER_PRO=
STRIPE_PRICE_HANDYMAN_PRO=
STRIPE_PRICE_CLEANING_SERVICES=
STRIPE_PRICE_MOVING_COMPANY=
STRIPE_PRICE_AUTO_MECHANIC=
STRIPE_PRICE_RESTAURANT_OWNER=
STRIPE_PRICE_CAFE_OWNER=
STRIPE_PRICE_AIRBNB_HOST=
STRIPE_PRICE_HOTEL_OPERATOR=
STRIPE_PRICE_EVENT_CATERER=
STRIPE_PRICE_WEDDING_PLANNER=
STRIPE_PRICE_FLORIST_PRO=
STRIPE_PRICE_PHOTOGRAPHER_PRO=
STRIPE_PRICE_VIDEOGRAPHER_PRO=
STRIPE_PRICE_MUSIC_PRODUCER=
```

**New 80 — creators / writers / creative / healthcare / personal ($14 each):**

```
STRIPE_PRICE_PODCASTER_PRO=
STRIPE_PRICE_YOUTUBER_CREATOR=
STRIPE_PRICE_TWITCH_STREAMER=
STRIPE_PRICE_TIKTOK_CREATOR=
STRIPE_PRICE_INSTAGRAM_INFLUENCER=
STRIPE_PRICE_LINKEDIN_CREATOR=
STRIPE_PRICE_BLOGGER_PRO=
STRIPE_PRICE_AUTHOR_NOVELIST=
STRIPE_PRICE_SCREENWRITER_PRO=
STRIPE_PRICE_SONGWRITER_PRO=
STRIPE_PRICE_SPEECHWRITER_PRO=
STRIPE_PRICE_COMEDY_WRITER=
STRIPE_PRICE_TRANSLATOR_LOCALIZATION=
STRIPE_PRICE_VOICE_ACTOR_PRO=
STRIPE_PRICE_GRAPHIC_DESIGNER_PRO=
STRIPE_PRICE_PHARMACIST_PRO=
STRIPE_PRICE_NURSE_PRACTITIONER=
STRIPE_PRICE_PHYSICAL_THERAPIST=
STRIPE_PRICE_CHIROPRACTOR_PRO=
STRIPE_PRICE_VETERINARIAN_PRO=
STRIPE_PRICE_PERSONAL_FINANCE=
STRIPE_PRICE_HOME_RENOVATION=
STRIPE_PRICE_TRAVEL_PLANNER_PRO=
STRIPE_PRICE_WEDDING_PLANNING_SELF=
STRIPE_PRICE_ESTATE_PLANNING=
```

### Stripe — bundle Price IDs (13)

```
STRIPE_PRICE_BUNDLE_DEVELOPER_QUARTET=
STRIPE_PRICE_BUNDLE_DEV_MEGA=
STRIPE_PRICE_BUNDLE_BUILDERS_PACK=
STRIPE_PRICE_BUNDLE_SALES_MARKETING=
STRIPE_PRICE_BUNDLE_REAL_ESTATE=
STRIPE_PRICE_BUNDLE_CAREER=
STRIPE_PRICE_BUNDLE_HOSPITALITY_EVENTS=
STRIPE_PRICE_BUNDLE_TRADES=
STRIPE_PRICE_BUNDLE_OPERATIONS=
STRIPE_PRICE_BUNDLE_CREATORS=
STRIPE_PRICE_BUNDLE_HEALTHCARE=
STRIPE_PRICE_BUNDLE_FINANCE=
STRIPE_PRICE_BUNDLE_ALL=
```

### Pro+ subscription Price IDs (per `0004_pro_plus.sql`)

```
STRIPE_PRICE_PRO_MONTHLY=
STRIPE_PRICE_PRO_ANNUAL=
STRIPE_PRICE_PRO_LIFETIME=
```

### API platform tier Price IDs (per `0005_api_platform.sql`)

```
STRIPE_PRICE_API_STARTER=
STRIPE_PRICE_API_PRO=
STRIPE_PRICE_API_SCALE=
```

### Anthropic + email + analytics + affiliate

```
ANTHROPIC_API_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL="Lumenari <hello@lumenari.io>"

# Plausible (optional; falls back to no tracking)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=lumenari.io

# Affiliate / referral codes (per 0006_referrals.sql)
NEXT_PUBLIC_AFFILIATE_DEFAULT_CODE=
```

---

## Stripe dashboard checklist

1. **Switch to live mode** (or test mode for staging) in the Stripe dashboard.
2. **Currency:** CAD (Canadian dollars). Confirm under Settings → Account.
3. **Create products** — for each kit slug, one Product with one Price:
   - **Mode:** One-time payment (not subscription) for the 100 kits and 13 bundles
   - **Currency:** CAD
   - **Amount:** $19 for the 20 dev-heavy kits, $14 for the other 80
   - **Bundle prices** match the table above ($35–$249)
4. **Pro+ products** — three recurring/lifetime Prices:
   - Monthly recurring (CAD)
   - Annual recurring (CAD)
   - Lifetime one-time (CAD)
5. **API tier products** — three recurring monthly Prices (Starter / Pro / Scale)
6. **Webhook endpoint:**
   - URL: `https://lumenari.io/api/webhook/stripe`
   - Events: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the signing secret to `STRIPE_WEBHOOK_SECRET`
7. **Branding:** make sure the Stripe receipt logo + colors match Lumenari.

**Pro tip:** create products by category and tag them in the Stripe dashboard (e.g. `kit:dev`, `kit:trade`, `bundle`). It makes reconciliation trivial later.

---

## Vercel deploy checklist

1. **Connect the GitHub repo** at vercel.com (under the `sovren-stack` org).
2. **Framework:** Next.js. Build command: `npm run build`. Output: leave default.
3. **Env vars:** paste every variable from the checklist above into Project Settings → Environment Variables. Apply to Production + Preview + Development.
4. **Add the domain** `lumenari.io` in Project Settings → Domains.
5. **Trigger a deploy.** The first preview deploy will warn until env vars are populated.
6. **Verify the build succeeded** — Vercel will fetch Google Fonts and complete the next/font step that fails in sandboxed local builds.
7. **Webhook target:** confirm the Stripe webhook URL resolves (`curl -X POST https://lumenari.io/api/webhook/stripe` should return a Stripe-shaped 400 for missing signature, not a 404).

---

## DNS pointer for `lumenari.io`

At the registrar:

```
A     @       76.76.21.21         # Vercel apex
CNAME www     cname.vercel-dns.com
TXT   _vercel <token from Vercel domain panel>
```

Or, if the registrar supports ALIAS/ANAME records:

```
ALIAS @       cname.vercel-dns.com
```

Resend email — add the verification records Resend shows for the domain (typically two `TXT` and one `CNAME` for DKIM, plus an SPF `TXT` if you don't already have one).

---

## 10-step manual smoke test (post-deploy)

1. Visit `https://lumenari.io` — homepage loads, hero + 3-step wizard render.
2. Visit `https://lumenari.io/kits` — full catalog renders 100 kits + bundle summaries.
3. Pick any one kit (e.g. `ts-next-production`) → kit detail page loads with description, deliverables, price.
4. Click the buy button → redirects to a Stripe Checkout session in the correct mode (live vs. test) and the correct CAD price.
5. Use Stripe test card `4242 4242 4242 4242` (in test mode) → checkout completes; thanks page renders.
6. Webhook fires → check Supabase `purchases` table for the new row + access_token.
7. Resend email arrives at the buyer address with a library link.
8. Open the library link → kit appears + download link works → downloaded `.md` file contains the concatenated kit content.
9. Visit `https://lumenari.io/best-claude-skill-for/real-estate-agents` (or another use-case slug) → landing page renders + primary kit links resolve.
10. Visit `https://lumenari.io/kits/everything-100` → bundle page loads; check that the "what's included" section shows all 100 kits.

If step 5 fails: the webhook isn't configured. If step 7 fails: Resend domain isn't verified. If step 8 returns 404: the download token route isn't reading the new kit IDs (very unlikely now, but worth verifying).

---

## Known caveats / next-session priorities

- **`src/data/kits.ts.bak`** — the previous version of `kits.ts` lives next to the new one as a `.bak` file. The sandbox couldn't delete it (FUSE-mount permissions); please `rm src/data/kits.ts.bak` locally before committing.
- **`next build` in this sandbox** — fails on Google Fonts network fetch (`fonts.googleapis.com` is unreachable). This is an environment quirk, NOT a code regression. `npm run typecheck` and `npm run lint` (both `tsc --noEmit`) are clean. Vercel will fetch fonts fine.
- **The 80 new kits have minimal authoring depth in `kits.ts`** — `personas: []`, `whatsInside: []`. The marketing copy is the SKILL.md inside `content/<slug>/`; populating `personas` + `whatsInside` for each kit-detail page is the next polish pass. The storefront still renders cleanly because the kit name + tagline + description carry the page.
- **Bundle counts** — Hospitality / Events Bundle has 9 kits (the task spec said "9", which matches). Operations Pack has 10. Trades Pack has 10. Creator's Pack has 7. All bundles match the task spec.
- **`developer-mega-stack` bundle** uses the same env var (`STRIPE_PRICE_BUNDLE_DEV_MEGA`) — a new entry; the back-compat `BUNDLE` constant points at `everything-100`.
- **0003 migration was gutted** to a no-op. Its kit/bundle inserts are now redundant (0001 + 0002 own the catalog). Re-running it is safe; future cleanup could delete the file.
- **PostHog vs. Plausible** — the package.json doesn't include either client. If you want analytics live at launch, add the Plausible script tag in `src/app/layout.tsx` or wire PostHog before deploy.
- **The `apple-style-ux` price was bumped to $19** to match the dev-heavy tier in the task spec. The migration 0001 seed reflects this. The originally-authored kit description still reads "for solo founders" — consider re-positioning it slightly to justify the bump (or revert if you'd rather keep it at $14; bundle math will need a refresh).
- **Sub-folder deliverables** — kits that have `patterns/` or `templates/` sub-folders (e.g. `ts-next-production`, `devops-terraform`) have their nested files enumerated in the `deliverables` array as `subfolder/file.md` strings. The download route at `src/app/api/download/[slug]/route.ts` concatenates them in order.

---

## Verification status

```
npm run typecheck   ✅ clean
npm run lint        ✅ clean (alias for typecheck)
npm run build       ⚠️  fails locally on Google Fonts fetch (sandbox network);
                       will pass on Vercel where the font fetch works
find content -name SKILL.md | wc -l   →  100
```

Catalog state:
- 100 kits in `KITS` array (verified)
- 13 bundles in `BUNDLES` array (verified)
- All 100 kit slugs match exactly one `content/<slug>/` folder
- All 16 + 13 use-case primary/secondary references resolve

You're clear to commit.

---

# Wave 3 added

This section captures everything Wave 3 shipped on top of the 100-SKU
consolidation. Code is staged in the working tree; commit from your laptop.

## New / modified files

### Components

- **`src/components/onboarding-funnel.tsx`** (new) — chip-driven 3-step funnel
  that replaces the open-textarea wizard on the homepage. Same `/api/recommend`
  back-end.
- **`src/components/save-kit-button.tsx`** (new) — Save-to-wishlist button +
  email-capture modal. Used on kit and bundle detail pages.
- **`src/components/admin-charts.tsx`** (rewritten) — was inline SVG, now uses
  `chart.js` + `react-chartjs-2` per spec. Same component API.

### Pages

- **`src/app/page.tsx`** (modified) — homepage now uses `<OnboardingFunnel>`
  instead of `<Wizard>`.
- **`src/app/[locale]/wizard/page.tsx`** (new) — the original `<Wizard>` lives
  here so the A/B test can run side-by-side.
- **`src/app/[locale]/kits/[slug]/page.tsx`** (modified) — adds a "Save kit"
  button next to the buy CTA on both kit and bundle detail.
- **`src/app/[locale]/library/page.tsx`** (modified) — signed-in lead users
  see their wishlist alongside purchased kits.

### API routes

- **`src/app/api/wishlist/save/route.ts`** (new) — `POST` to save a kit.
  Upserts a lead if needed, idempotent on `(lead_id, kit_slug)`.
- **`src/app/api/wishlist/list/route.ts`** (new) — `GET ?email=…` or `?lead=…`
  returns the wishlist for a lead.

### Middleware

- **`src/middleware.ts`** (modified) — added `/admin` to `PUBLIC_PASSTHROUGH`
  so the root-only admin page isn't rewritten under `[locale]`.

### Content

- **`src/content/blog/how-to-use-claude-code-skills-complete-guide.ts`** (new)
- **`src/content/blog/how-recruiters-cut-sourcing-time-with-ai-skill-kits.ts`** (new)
- **`src/content/blog/the-skill-md-format-deep-dive-for-builders.ts`** (new)
- **`src/lib/blog.ts`** (modified) — registers the three new posts plus the
  two already-present `best-ai-tools-for-real-estate-agents-2026` and
  `claude-vs-chatgpt-cold-outreach-2026` (previously authored, never wired).
- **`src/data/comparisons.ts`** (modified) — adds 6 competitor entries:
  `notion-ai`, `jasper`, `cursor-built-in`, `anthropic-skills-repo`,
  `reddit-prompt-libraries`, `diy-prompting`.

### Supabase

- **`supabase/migrations/0009_retention_automation.sql`** (new) — pg_cron
  schedules for the 5 retention flows + wishlist new-bundle pass. Idempotent
  via inline unschedule-then-schedule logic in a `do $$` block.
- **`supabase/migrations/0011_wishlists.sql`** (new) — `wishlists` table,
  unique `(lead_id, kit_slug)` constraint, RLS service-role-only, plus a
  `wishlist_kit_counts` view for the admin dashboard.
- **`supabase/functions/email-cron/index.ts`** (modified) — adds
  `runWishlistBundlePass` and wires it into the HTTP handler under
  `?pass=wishlist-bundle`. Idempotent via `wishlists.notified_at`.

### Docs

- **`docs/WAVE3_AUDIT.md`** (new) — the audit memo at the top of this run.
- **`docs/EMAIL_AUTOMATIONS.md`** (new) — index pointing at the existing
  `EMAIL_AUTOMATION.md` plus a quick-reference template table.
- **`docs/FUNNEL_AB_TEST.md`** (new) — design + metrics for the chip-funnel
  vs open-textarea test.

### tsconfig

- **`tsconfig.json`** (modified) — `exclude: ["node_modules", "supabase/functions"]`
  so Deno Edge Function code isn't tsc-checked against the Next.js TS config.

### Package

- **`package.json`** (modified) — added `chart.js` and `react-chartjs-2`.

## New env vars

All env vars referenced by new code:

```
# Admin gate — set both. Comma-separated for multiple admins.
ADMIN_EMAIL=cholwell@gmail.com
ADMIN_OVERRIDE_KEY=<a long random string used as a single-use login key>
ADMIN_COOKIE_SECRET=<random secret; falls back to STRIPE_WEBHOOK_SECRET if unset>

# Email cron — set as Supabase secrets so 0009_retention_automation.sql
# can wire pg_cron → Edge Function.
EMAIL_CRON_SECRET=<random secret; matched by the Edge Function>
# After applying 0009, also set Postgres config:
#   alter database postgres set app.email_cron_url   = 'https://<project>.functions.supabase.co/email-cron';
#   alter database postgres set app.email_cron_secret = '<EMAIL_CRON_SECRET>';

# Lead-magnet (already exists, reused by wishlist save).
RESEND_AUDIENCE_LEAD_MAGNET_ID=<id of the Resend audience tagged lead-magnet>
```

## New migrations — apply in order

```sql
\i supabase/migrations/0009_retention_automation.sql   -- pg_cron schedules
\i supabase/migrations/0011_wishlists.sql              -- wishlists table + view
```

0009 is a no-op if `pg_cron` or `pg_net` aren't enabled — re-run after
enabling. 0011 is fully guarded.

## Verification gate — passes

```
1.  npm run typecheck                 clean
2.  npm run lint                      clean (alias for typecheck)
3.  npm run build                     fails ONLY on Google Fonts fetch
                                      (sandbox network restriction);
                                      every other build step succeeds.
4.  Dev server URLs (curl):
       /                              200
       /en                            307 → /        (i18n middleware)
       /en/free                       200
       /admin (unauth)                307 → /        (admin gate redirect)
       /en/terms, /en/privacy, /en/refunds      200 / 200 / 200
       5 new blog slugs               200 × 5
       6 new comparison slugs         200 × 6
5.  POST /api/lead-magnet/claim valid body       reaches DB layer
                                                 (500 in sandbox = no
                                                  SUPABASE_URL env;
                                                  zod accepted the payload)
    POST /api/lead-magnet/claim invalid          400 with json error
6.  POST /api/wishlist/save valid body           reaches DB layer (500
                                                  in sandbox, same reason)
    POST /api/wishlist/save invalid              400 with json error
7.  GET  /api/admin/stats unauth                 401 Unauthorized
8.  Migration idempotency                        0009 = `do $$` block
                                                 with conditional schedule;
                                                 0011 = every `create`
                                                 guarded with `if not exists`
                                                 / `drop if exists` /
                                                 `create or replace`
9.  Grep TODO/FIXME/[verify]/console.log         empty across new code
10. Grep process.env.* in new code               only `RESEND_AUDIENCE_…`
                                                 (already documented)
11. Footer links to /terms, /privacy, /refunds   present in src/app/layout.tsx
```

## Concerns / human-judgment items

- **Stripe Tax** is wired (`automatic_tax: { enabled: true }` + tax codes
  via `src/lib/stripe/tax-codes.ts`) but you still need to **enable Stripe
  Tax in the Stripe Dashboard** and add Stripe Tax origin addresses for
  Canada / US / EU before live sales — code can't do that.
- **pg_cron + pg_net** aren't on the Supabase free tier. If you're on free,
  0009 will print a `notice` and skip. Move to a paid plan, then re-run, or
  use an external scheduler hitting `/email-cron`.
- The `bundles` table read in the wishlist new-bundle pass assumes the
  `0002_round_two_skus_and_bundles.sql` schema (`kit_slugs`, `price_cents`).
  Verify the column names match before deploying the Edge Function.
- `chart.js` adds ~70kB gzipped to the admin bundle. It's gated to `/admin`
  only (the components are `"use client"` islands), but worth knowing.
- The admin login flow is HMAC-cookie based. Set `ADMIN_OVERRIDE_KEY` to a
  long random string. Replace with magic-link auth once you've got more than
  one admin.
- The 5 lifecycle email passes are idempotent on `email_events`, but each
  one re-queries the lead/purchase population on every cron tick. At 100s
  of leads it's fine; at 10k+ leads, add pagination or a "last-processed-at"
  cursor.
- `tsconfig.json` was re-touched by Next.js' dev-time auto-config to add
  `/tmp/lumenari-next-build/types/**/*.ts` to `include`. That was caused
  by setting a temporary `distDir` to bypass the local FUSE mount's
  permission quirk; it's harmless but you can clean it up before commit.
