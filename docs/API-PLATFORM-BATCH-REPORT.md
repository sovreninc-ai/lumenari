# Lumenari API Platform — Batch Build Report

The recommendation engine is now exposed as a paid API product. Free tier
self-serves; Pro / Business subscribe through Stripe; Enterprise routes to
sales. Everything is staged in the working tree — nothing committed.

---

## Files added

### Database
- `supabase/migrations/0005_api_platform.sql` — `api_tiers`, `api_accounts`,
  `api_keys`, `api_usage_logs`, `api_usage_current_month` view, RLS policies.

### Libraries
- `src/lib/api-keys.ts` — `generateApiKey`, `hashApiKey`, `verifyApiKey`,
  `looksLikeApiKey`. SHA-256 hashing, constant-time compare.
- `src/lib/api-auth.ts` — `requireApiKey`, `checkRateLimit`, `logUsage`,
  `apiError`. The middleware sandwich every `/api/v1/*` route uses.
- `src/lib/recommender.ts` — Shared engine wrapping Anthropic + heuristic
  fallback. Lifted out of the wizard so the public API doesn't duplicate it.
  The wizard's `src/app/api/recommend/route.ts` is **untouched** (sibling kit
  batches own that file).
- `src/lib/account-auth.ts` — Magic-link `resolveAccount` helper for the
  dashboard. Same email-only auth pattern as `/library`.
- `src/lib/kit-serializer.ts` — Shared `serializeKit` used by all `/api/v1/*`
  kit responses (Next.js route files only allow HTTP-verb exports).

### Public API (v1)
- `src/app/api/v1/recommend/route.ts` — `POST /api/v1/recommend`.
- `src/app/api/v1/kits/route.ts` — `GET /api/v1/kits` (paginated list).
- `src/app/api/v1/kits/[idOrSlug]/route.ts` — `GET /api/v1/kits/{id}`.
- `src/app/api/v1/kits/[idOrSlug]/download/route.ts` — `GET .../download`,
  Pro tier and above.
- `src/app/api/v1/usage/route.ts` — `GET /api/v1/usage`.

### Dashboard & account
- `src/app/[locale]/account/api-keys/page.tsx` — server-rendered dashboard,
  email magic-link auth, tier card with usage bar, key list, links to docs
  and pricing.
- `src/components/AccountSignIn.tsx` — magic-link form.
- `src/components/ApiKeysManager.tsx` — generate / revoke flow + reveal-once
  modal.
- `src/app/api/account/request-link/route.ts` — `POST` emails the magic link
  (auto-provisions a free-tier account on first sign-in).
- `src/app/api/account/api-keys/route.ts` — `POST` create key, `GET` list keys.
- `src/app/api/account/api-keys/[id]/route.ts` — `DELETE` soft-revoke.

### Marketing & docs
- `src/app/[locale]/api-platform/page.tsx` — pricing page (route uses
  `/api-platform` to avoid colliding with the `/api/*` route namespace).
- `src/app/[locale]/api-docs/page.tsx` — two-column reference docs with
  cURL / JS / Python samples for every endpoint.
- `src/components/ApiCheckoutButton.tsx` — pricing CTA modal that asks for
  email + org name, then POSTs to `/api/api-checkout`.

### Stripe wiring
- `src/data/subscription-tiers.ts` — extended with `API_TIERS`,
  `API_TIER_LIST`, `apiPriceIdForTier`, `apiTierForPriceId`,
  `knownApiPriceIds`, `apiTierPrice`. Pro+ helpers untouched.
- `src/app/api/api-checkout/route.ts` — `POST /api/api-checkout` creates a
  Stripe subscription checkout, pre-provisions the `api_accounts` row.
- `src/app/api/webhook/stripe/route.ts` — extended: detects API-tier price
  IDs and routes them to `handleApiSubscriptionUpsert` /
  `handleSubscriptionDeleted`. Sends welcome email on first activation.

### Email
- "API key created" email lives in `src/app/api/account/api-keys/route.ts`
  (`firstKeyEmail`) — fires once, on the first key for a new account.
- "Welcome to the Lumenari API" subscription email lives in the webhook
  (`sendApiWelcomeEmail`) — fires on the subscription.created flip from free
  → paid.

---

## Env vars Chris needs to add

Add these to `.env.local` for dev and to Vercel for prod, after creating two
Stripe Products (Lumenari API — Pro, Lumenari API — Business), each with a
recurring monthly price in CAD:

```
STRIPE_PRICE_API_PRO=price_xxx        # $99/mo CAD
STRIPE_PRICE_API_BUSINESS=price_xxx   # $499/mo CAD
```

No env vars are required for Free or Enterprise. Enterprise CTA is a
`mailto:` so no Stripe product is needed yet.

---

## Database migration to run

```bash
# from the repo root, against the Lumenari Supabase project
supabase db push   # or paste 0005_api_platform.sql in the SQL editor
```

The migration is re-runnable (`on conflict do update` on tier seeds, `if not
exists` on every table). No data loss risk.

---

## Local testing instructions

```bash
# 1. Apply the migration
supabase db push

# 2. Start dev
npm run dev

# 3. Visit the marketing page
open http://localhost:3000/api-platform

# 4. Sign in to the dashboard
open http://localhost:3000/account/api-keys
# enter your email → check inbox → click magic link

# 5. Generate a key in the dashboard, save the raw value from the modal

# 6. Test the API
KEY="lmn_..."   # the key you just generated

# recommend
curl http://localhost:3000/api/v1/recommend \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d '{"ai_platform":"claude","use_case":"shipping a SaaS on Next.js","max_results":3}'

# list kits
curl "http://localhost:3000/api/v1/kits?limit=5&ai_target=claude" \
  -H "Authorization: Bearer $KEY"

# single kit
curl http://localhost:3000/api/v1/kits/ts-next-production \
  -H "Authorization: Bearer $KEY"

# usage
curl http://localhost:3000/api/v1/usage \
  -H "Authorization: Bearer $KEY"

# 7. Test 401 (no header)
curl http://localhost:3000/api/v1/usage -i

# 8. Test 402 (Free tier downloading)
curl http://localhost:3000/api/v1/kits/ts-next-production/download \
  -H "Authorization: Bearer $KEY" -i

# 9. Upgrade to Pro from /api-platform (use Stripe test cards)
#    then retry the download — should succeed
```

Rate-limit headers should appear on every response:
`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

---

## Verification

- `npx tsc --noEmit` — **clean** (same command `npm run typecheck` and
  `npm run lint` run, per `package.json` lines 9-10).
- `next build` — could not run inside the sandbox because the fuse-mounted
  `.next/` directory blocks `unlink`. Chris should run `npm run build`
  locally to confirm the production bundle compiles before deploy. There
  are no TypeScript errors to surface; remaining risk is Tailwind class
  compilation, which the lockstep CSS-variable patterns from `/pro` cover.

---

## Sales targets — first 10–15 outbound emails

AI-adjacent tool companies whose products would benefit most from embedding
the recommendation engine. Order from highest-fit to longer shot.

1. **Lovable** — generates apps from a prompt; their users perpetually
   need the right Claude/Next.js patterns. Direct fit.
2. **v0 (Vercel)** — UI generator that hands devs React; recommending a
   matching skill pack at code-export time is a natural extension.
3. **Bolt.new (StackBlitz)** — same shape as Lovable/v0; full-stack app
   generation with a Claude backbone.
4. **Replit** — Lumenari is already on Chris's Replit stack via Lumina; the
   Replit Agent would benefit from skill-pack hints per project type.
5. **Cursor** — IDE that ships with Claude built in. They could recommend
   kits when the user starts a new project. Partnership angle.
6. **Windsurf (Codeium)** — competitor to Cursor; same opportunity, less
   crowded.
7. **Continue.dev** — open-source AI coding assistant. White-label tier
   would be the play.
8. **Greptile / Grit / Cody (Sourcegraph)** — code-search tools augmenting
   AI with codebase context. Useful adjacency.
9. **Pylon** / **Chatwoot** + AI plugins — support tooling that runs
   prompts on behalf of agents; could surface relevant kits as suggested
   responses.
10. **Notion AI** / **Coda AI** — workspace agents that need richer
    prompts; embed at the "create with AI" surface.
11. **HoneyHive / Langfuse / PromptLayer** — LLM observability platforms
    whose users build prompt libraries; selling them recommendation as a
    feature is more direct than building their own.
12. **Cline / Roo Code** — open-source Claude-Code-style agents. Even free
    integration drives brand.
13. **Goose (Block)** — Block's open agent; aim for a Lumenari recipe
    plugin and let it pull recommendations.
14. **Zed (Anthropic-integrated editor)** — premium positioning, similar
    pitch to Cursor.
15. **Granola / Fireflies / Notta** — meeting AI tools whose users ask
    "what should I ask Claude with this transcript"; recommendation could
    be the bridge.

First email template (paste-ready) lives in `PARKING-LOT.md` once Chris
queues this up; the value prop is "100 calls a month free, $99 unlocks
commercial use — your users find the right kit without leaving your app."

---

## Important constraints honored

- `content/` directory: **not touched**.
- `src/data/kits.ts`: **not touched** (read-only).
- `src/app/api/recommend/route.ts` (wizard endpoint): **not touched** — the
  public API uses a sibling `src/lib/recommender.ts` so future kit batches
  can keep working on the wizard route without merge conflict.
- No git commit performed.
