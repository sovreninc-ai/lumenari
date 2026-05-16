# Wave 3 audit

Snapshot as of the start of this continuation run. Status terms:

- **Done** — code present, types clean, no obvious gaps.
- **Partial** — code present but missing functionality the spec calls for.
- **Not started** — no file matching the spec.

| # | Deliverable | Status | Notes / gaps |
|---|-------------|:------:|--------------|
| 1 | Lead magnet + 7-day welcome series | Done | `/free` page, `/api/lead-magnet/claim`, `/api/lead-magnet/download/[slug]`, `welcomeDay0` Day-0, and `supabase/functions/email-cron/index.ts` cover Day-1/3/5/7. `0007_lead_magnet.sql` matches spec. Need `docs/EMAIL_AUTOMATIONS.md`. (Existing file `EMAIL_AUTOMATION.md` covers this.) |
| 2 | Pro+ retention automation (5 flows) | Done | All five flows present: inactive 14d, monthly digest, cancellation save (Stripe webhook + `cancellation-save.ts`), annual upgrade nudge, one-time → Pro+ upsell. Idempotent via `email_events`. Missing a migration that registers pg_cron schedules — need `0009_retention_automation.sql`. |
| 3 | Founder dashboard at `/admin` | Partial | KPI cards / tables / SVG charts shipped. Spec mandates **chart.js**, current implementation uses inline SVG. Re-write the three charts as chart.js (single client component island). Auth gate via HMAC cookie is working. |
| 4 | Stripe Tax + business ops | Done | All three checkout routes have `automatic_tax: { enabled: true }` and `tax_id_collection`. `src/lib/stripe/tax-codes.ts` present. Terms (228 lines), Privacy (240 lines), Refunds (139 lines) all shipped. Footer carries all three links. `docs/STRIPE_TAX_SETUP.md` exists. |
| 5 | 5 long-form blog posts | Partial | 2 of 5 required slugs exist (`best-ai-tools-for-real-estate-agents-2026`, `claude-vs-chatgpt-cold-outreach-2026`). 3 required slugs missing: `how-to-use-claude-code-skills-complete-guide`, `how-recruiters-cut-sourcing-time-with-ai-skill-kits`, `the-skill-md-format-deep-dive-for-builders`. The existing `recruiter-60-percent...` and `skill-md-format-explained` are close-but-not-spec slugs. We add the three missing slugs and register them with `src/lib/blog.ts`. |
| 6 | 6 new comparison entries | Not started | `src/data/comparisons.ts` currently has 4 entries (skillsmp, agensi, chatgpt-store, github-skills). Need to add `notion-ai`, `jasper`, `cursor-built-in`, `anthropic-skills-repo`, `reddit-prompt-libraries`, `diy-prompting`. |
| 7 | Funnel onboarding | Not started | Spec wants `src/components/onboarding-funnel.tsx` (3 steps: role chips, tasks per role, AI of choice). Current homepage at `src/app/page.tsx` uses the open-textarea `<Wizard>`. Need to: build the new funnel, swap it into `src/app/page.tsx`, and move the old wizard to `src/app/[locale]/wizard/page.tsx`. Plus `docs/FUNNEL_AB_TEST.md`. |
| 8 | Save-to-wishlist | Not started | Need `0011_wishlists.sql` (since 0010 = admin_users), `/api/wishlist/save`, `/api/wishlist/list`, kit detail page button + modal, `/library` enhancement, and a wishlist-pricedrop pass in the email-cron Edge Function (or a new cron). |

## Dependencies / package check

`npm list chart.js iron-session gray-matter next-mdx-remote framer-motion react-chartjs-2 2>/dev/null` confirms:

- `framer-motion` ✓ (already used throughout)
- `chart.js` / `react-chartjs-2` — NOT installed; need to add for deliverable #3.
- `iron-session` — NOT installed. Current admin-auth uses HMAC + signed cookie via `crypto`. The spec said "iron-session if installed, else HMAC the email with `ADMIN_SECRET`" — HMAC path is fine, keep it.
- `gray-matter` / `next-mdx-remote` — NOT needed. Blog uses checked-in TS modules per `src/lib/blog.ts`. We will match that pattern for new posts.

## Plan for this run

1. Install `chart.js` + `react-chartjs-2` (Phase B step 3).
2. Convert `src/components/admin-charts.tsx` to chart.js islands.
3. Add the 3 missing blog posts and register them in `src/lib/blog.ts`.
4. Append the 6 new comparison entries to `src/data/comparisons.ts`.
5. Build `OnboardingFunnel`, swap into homepage, move old wizard to `/[locale]/wizard`.
6. Build wishlist: migration `0011_wishlists.sql`, `/api/wishlist/save`, `/api/wishlist/list`, kit-detail button + modal, `/library` enhancement, price-drop cron pass in `email-cron`.
7. Add `0009_retention_automation.sql` registering pg_cron schedules.
8. Write `docs/FUNNEL_AB_TEST.md` + `docs/EMAIL_AUTOMATIONS.md` (alias of existing `EMAIL_AUTOMATION.md`).
9. Verification gate (Phase C).
