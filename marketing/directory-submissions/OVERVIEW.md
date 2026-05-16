# Lumenari — AI Tool Directory Submissions Pack

**Last updated:** 2026-05-15
**Owner:** Chris Holwell (chris@lumenari.io)
**Scope:** 10 AI tool directories, prioritized for SEO + steady drip traffic.

---

## The play

Directory submissions are not a growth channel. They are an SEO + trust channel. Each approved listing is a backlink from a domain that already ranks for "AI tools" + a categorical citation that helps Lumenari show up in long-tail "best AI tool for X" searches. Individually each directory will send somewhere between 5 and 50 visitors per month — most will sit at the low end. Collectively, 10 directories compounding for 6 months becomes meaningful: 200-500 monthly referrals, plus the indirect lift from being everywhere a buyer looks when they are evaluating an AI purchase.

Set expectations honestly. No directory is a launchpad. The goal is **ubiquity** ("I keep seeing Lumenari mentioned"), **link equity** (10 backlinks from DR 40-70 sites), and **a slow trickle of qualified visitors** who already typed "AI skill kits" or "Claude prompts" into a search box. Treat this as a 3-hour weekend project that pays back over 12 months.

---

## Submission order

Do them in this order. Top of the list = fastest review + biggest traffic. Bottom = nice-to-have backlinks.

| # | Directory | Why first | Review time |
|---|-----------|-----------|-------------|
| 1 | **TheresAnAIForThat** | Largest AI tool directory, best SEO juice, free tier accepted | 1-2 weeks |
| 2 | **Futurepedia** | Second-largest, ranks for "best AI tools" generic terms | 1-2 weeks |
| 3 | **AIToolsDirectory** | Fast review, decent traffic, free tier is generous | 3-7 days |
| 4 | **AIScout** | Good UX, growing audience, allows multi-category | 5-10 days |
| 5 | **ToolFinder** | Curated feel, lower volume but higher-intent visitors | 1-2 weeks |
| 6 | **AIToolsHub** | Small but fast indexing, good for backlink | 2-5 days |
| 7 | **AIToolPicker** | Quiz-style discovery — fits Lumenari's wizard well | 1 week |
| 8 | **AI Tools Club** | Community-flavored, low traffic, easy submit | 3-7 days |
| 9 | **AI Tools Inc.** | Smaller directory, decent DR, mostly for backlink | 1-2 weeks |
| 10 | **AI Top Tools** | Long tail, automated approvals, fast | 1-3 days |

**Sunday morning plan:** knock out 1-3 in one ~90 min session. Submit, log the date, move on. Don't agonize over copy — these descriptions are 80% the same across directories anyway.

---

## Common assets you'll need

Gather these before starting any submission. They are referenced in every per-directory file in this folder.

**Brand**
- Logo (SVG): https://lumenari.io/logo.svg
- Logo (PNG, 512x512): https://lumenari.io/logo-512.png
- Logo (PNG, 256x256): https://lumenari.io/logo-256.png
- Favicon (32x32): https://lumenari.io/favicon.png
- Brand color: (fill in primary hex once design system is locked)

**Copy** (full versions in each per-directory file)
- Tagline: "Curated AI skill kits for Claude, ChatGPT, Cursor & Gemini"
- 50-word description
- 100-word description
- 200-word description
- One-liner for tweet/share: "100 AI skill kits, 4 formats each, ships to Claude/ChatGPT/Cursor/Gemini. Free wizard finds your kit in 30 seconds."

**Visuals** (host these in /public/og/ or similar)
- Homepage screenshot (1920x1080)
- Wizard / recommendation flow (1920x1080)
- Kit detail page with format toggles (1920x1080)
- Bundle showcase (1920x1080)
- API docs / developer surface (1920x1080)
- Mobile screenshot (1170x2532, optional but useful)
- Demo video (60-90 sec, hosted on YouTube — required for Futurepedia)

**Founder + business**
- Founder: Chris Holwell
- Email (founder/contact): chris@lumenari.io
- Email (support): support@lumenari.io
- Company: Sovren Inc.
- Country: Canada (Calgary, Alberta)
- Year founded: 2026
- Twitter/X: @lumenari_io (placeholder — confirm before submitting)
- LinkedIn: linkedin.com/company/lumenari (placeholder)
- GitHub: github.com/sovren-stack (org)

**Categories Lumenari fits** (pick 2-4 per directory based on what they offer)
- AI Tools / AI Assistants
- Productivity
- AI Prompts / Prompt Libraries
- Developer Tools
- Sales Tools / Sales Enablement
- Marketing Tools
- Writing Tools / Content Creation
- Real Estate Tools
- Workflow Automation
- AI for Professionals / Business AI

**Pricing model**
> Freemium. Free recommendation wizard + free API tier (rate-limited). Paid kits $14-$19 each. Bundles $35-$249. Pro+ subscription. API tiers $99 / $249 / $499 per month.

---

## UTM tagging per directory

Every submission link back to lumenari.io should carry a UTM tag so we can attribute traffic in PostHog. Use this template:

```
https://lumenari.io/?utm_source={directory_slug}&utm_medium=directory&utm_campaign=launch_2026
```

Specific UTMs to use:

| Directory | UTM source value |
|---|---|
| TheresAnAIForThat | `theresanaiforthat` |
| Futurepedia | `futurepedia` |
| AIToolsDirectory | `aitoolsdirectory` |
| AIScout | `aiscout` |
| ToolFinder | `toolfinder` |
| AIToolsHub | `aitoolshub` |
| AIToolPicker | `aitoolpicker` |
| AI Tools Club | `aitoolsclub` |
| AI Tools Inc. | `aitoolsinc` |
| AI Top Tools | `aitoptools` |

If a directory strips query strings (some do), fall back to using a unique landing path like `lumenari.io/d/futurepedia` that 301s to the homepage with the UTM appended.

---

## Tracking submissions

Keep a simple log somewhere (Notion table or a row in this folder's `STATUS.md` if you want to add one). Track:

- Directory name
- Date submitted
- Tier used (free / paid)
- Status (pending / approved / rejected / paid-upgrade-pending)
- Listing URL once live
- Confirmation email subject line (to find approval emails fast)
- First-month referral traffic (PostHog filter: `utm_source = <slug>`)

---

## Maintenance

**Quarterly review** (March / June / September / December). Block 30 minutes. For each live listing:

1. Click your own listing as a logged-out user. Confirm screenshots still match the current product.
2. Update the **pricing** if it has changed (kit prices, bundle prices, API tier prices).
3. Update the **kit count** in the description (currently "100 kits + 13 bundles" — bump if you've shipped more).
4. Refresh **screenshots** if the homepage, wizard, or kit detail page has been redesigned.
5. Add any **new categories** the directory has launched that fit Lumenari.
6. Re-check the **logo URL** still resolves (caching issues are common).
7. If the listing is buried, consider the paid upgrade — but only if the free listing has produced measurable traffic.

**When to add a new directory:** if you find a niche directory that ranks for a Lumenari-relevant query (e.g. "best Claude skills directory"), add it. Anything below DR 30 is probably not worth the time unless it's high-intent.

**When to remove:** if a directory dies, gets spammed to uselessness, or stops indexing in Google, drop it from the maintenance list.

---

## Files in this folder

- `OVERVIEW.md` (this file)
- `theresanaifor-that.md`
- `futurepedia.md`
- `aitoolsdirectory.md`
- `aiscout.md`
- `toolfinder.md`
- `aitoolshub.md`
- `aitoolpicker.md`
- `aitoolsclub.md`
- `aitoolsinc.md`
- `aitoptools.md`
