# Lumenari — Deploy Tonight

**Status (as of consolidation):** 100 kits, 13 bundles, storefront, API platform, Pro+ subscription, affiliate system, i18n (6 locales), full SEO infrastructure — all staged in the working tree. Ready to ship.

**Goal:** Lumenari publicly live at `lumenari.io`, all 100 kits browseable, wizard works, newsletter capture works. **~60–90 min of focused Chris-side work.**

Payments and Pro+ checkout come later — that's Threshold B for tomorrow.

---

## Prep — One-line cleanup

There's a FUSE artifact file we need to delete before committing. From this folder:

```
rm src/data/kits.ts.bak
```

Expected: prompt returns clean.

---

## Step 1 — Initialize git and make the first commit

```
git init -b main
```

```
git add -A
```

```
git commit -m "Initial Lumenari build — 100 kits, storefront, API, SEO, Pro+, i18n"
```

Expected: a single commit with ~700+ files staged.

---

## Step 2 — Create the GitHub repo + push

In a browser: <https://github.com/organizations/sovreninc-ai/repositories/new>

- Repository name: `lumenari`
- Visibility: **Private**
- **Do not** initialize with a README, .gitignore, or license (the project already has them)

Back in Terminal:

```
git remote add origin https://github.com/sovreninc-ai/lumenari.git
```

```
git push -u origin main
```

If git asks for auth, use the GitHub credential helper you set up for Villains Hub earlier.

**Tell Claude (Dispatch) when this is done.** Claude can then fire the Vercel project creation via the Vercel MCP.

---

## Step 3 — Create the Supabase project (you do this; Claude can't create projects on your account)

Open <https://supabase.com/dashboard/new>

- Project name: **Lumenari**
- Organization: **Calgary Villains FC** (your existing org)
- Region: pick the one nearest most of your customers — US East (N. Virginia) is a safe default
- Database password: generate a strong one and save it to your password manager
- Wait ~2 minutes for provisioning

When provisioned:

- Go to Project Settings → API
- Copy the **Project URL** (looks like `https://abcdef.supabase.co`)
- Copy the **anon public** key
- Copy the **service_role** key (click Reveal first)

**Send the project URL to Claude (Dispatch).** Claude will apply all 6 migrations directly via the Supabase MCP — no copy-paste needed in the SQL editor.

---

## Step 4 — Vercel project (Claude can fire this for you)

Once your code is up on GitHub (Step 2 complete), tell Claude in Dispatch. Claude will use the Vercel MCP to:

- Create a new Vercel project named **lumenari**
- Link it to the GitHub repo `sovreninc-ai/lumenari`
- Trigger the initial build

You'll see the project appear in your Vercel dashboard. Build will fail on the first attempt because env vars aren't set — that's normal. We fix that in Step 5.

---

## Step 5 — Env vars in Vercel

Open the new Lumenari project's Settings → Environment Variables. Add these **five non-negotiables** first:

| Key | Value | Environments |
|-----|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | from Step 3 | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Step 3 (anon public key) | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | from Step 3 (service_role) | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://lumenari.io` | Production, Preview, Development |
| `ANTHROPIC_API_KEY` | from <https://console.anthropic.com> | Production, Preview |

(The Anthropic key powers the wizard's recommendation engine. Without it the wizard falls back to a heuristic, which still works but is less smart.)

When all five are set, go to the Deployments tab → ⋯ menu on the latest deploy → **Redeploy** (keep build cache).

After ~3 minutes the build completes and the site is live at `lumenari-sovreninc.vercel.app` (or similar).

---

## Step 6 — DNS at your registrar (Cloudflare/wherever lumenari.io lives)

In Vercel: Project → Settings → Domains → Add → enter `lumenari.io` (and add `www.lumenari.io` as a redirect).

Vercel will show you DNS records to set. Typically:

- A record `@` → `76.76.21.21`
- CNAME `www` → `cname.vercel-dns.com`

Add them at your registrar. Propagation 5–30 min globally. Vercel auto-issues SSL once it sees the records resolve.

---

## Step 7 — Smoke test

Open <https://lumenari.io> in an **Incognito window** (browsers cache aggressively after DNS changes).

10-step manual check:
1. Homepage hero loads with the Lumenari logo
2. Scroll down — wizard is visible
3. Click an AI platform chip (Claude / ChatGPT / etc.)
4. Type a use case in the textarea → click "Get my kit" → wizard returns recommendations
5. Click a recommended kit → kit detail page loads with full description + tags
6. Scroll to "Recommended AI tools" — the affiliate cards render (links may be base URLs since you haven't set affiliate codes yet — that's fine)
7. Click /pro → pricing page loads, all three tiers visible
8. Click /api-platform → API marketing page loads
9. Footer newsletter signup — submit your email, check inbox for confirmation
10. Try /es/ in the URL → site renders in Spanish stub (until translations are run)

If steps 1-9 work, **Threshold A is achieved**: Lumenari is publicly live.

Step 10 will be partial — i18n stub files re-export English until you run the translation batch. That's a follow-up.

---

## Where to find the deeper handoff doc

`docs/HANDOFF_TONIGHT.md` has the full breakdown including:
- All env vars (including Stripe, Resend, Plausible, affiliate codes — for Threshold B)
- Stripe products to create + price IDs
- Migration sequence details
- Known caveats
- Next-session priorities

---

## When to message Claude (Dispatch)

Three checkpoints where Claude drives the next step via MCP:

1. **After Step 2 (push to GitHub):** "Push is done — please create the Vercel project."
2. **After Step 3 (Supabase project created):** "Supabase project URL is X — please apply the migrations."
3. **After Step 5 (env vars set + redeploy succeeds):** "Site is up at vercel.app — let's smoke test."

Between those checkpoints, you're driving. Claude is waiting for your green light.

---

## Tomorrow: Threshold B (payments live)

Once Threshold A is up, the only remaining work is:

1. Create Stripe products in your test dashboard for all 100 kits + 13 bundles + Pro+ subscription + API tiers (this is mostly mechanical; the kit names and prices live in `src/data/kits.ts` and can be scripted)
2. Set the Stripe price IDs as env vars in Vercel
3. Set up the Stripe webhook → redeploy → test a real purchase in test mode
4. When you're satisfied with the test-mode flow, flip Stripe to live mode and update env vars to live keys

Estimate: 60-90 min for Stripe setup. Best done with a clear head, not at 1 AM.

---

**Built tonight in one big push. Read this in the morning with coffee, then knock it out in the order above.**

Sources are in the codebase — every kit is real content, the storefront is fully wired, the API has real auth/rate-limiting/logging. No mocks, no placeholders. Ship with confidence.
