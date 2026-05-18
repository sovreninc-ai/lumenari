# r/IndieMakers — "Show: I built a 100-kit AI marketplace, here's the catalog + what I'd do differently"

**Target sub:** r/IndieMakers
**Post type:** Show-and-tell
**Why this post for this sub:** r/IndieMakers is built for show-and-tell. Direct, honest, with screenshots and link. The audience is other indie hackers who appreciate authentic builders.
**When to post:** Tuesday-Thursday afternoon, ~2-4pm ET. Indie hacker browse time.
**Expected karma trajectory:** 50-300.
**Conversion expectations:** Lower direct (audience is other builders, not end users) but high relationship value. Affiliate inquiries, integrator interest, build-in-public collab DMs.
**Follow-up engagement:** Expect stack questions (Next.js + Supabase + Stripe), pricing-strategy debates (is $14 too cheap?), and asks about the wizard implementation. Engage with every substantive comment.
**Handling "is this self-promo" challenges:** Low mod sensitivity. The post IS supposed to be a product reveal. Just don't be salesy.

---

## Title

**Show: I built a 100-kit AI marketplace as a solo founder — 30-day update**

(Alt title: "Just launched lumenari.io — 100 AI skill kits, here's what I built and what I'd change")

---

## Body

Hey indie hackers. Posting my 30-day update on the side project I just launched.

**The product:** Lumenari (lumenari.io). A catalog of 100 AI skill kits. Each kit ships in 4 formats so the same role-specific context works across Claude, ChatGPT, Cursor, and Gemini. Free recommendation wizard at the top of the homepage that routes you to the right kit in 5 questions.

**The maker:** Solo founder. Journeyman pipefitter in Calgary by day. Build on Sunday mornings and post-shift evenings on a 2019 MBP.

**The stack:**
- Next.js 16 App Router + TypeScript strict
- Tailwind v4 (the new engine is genuinely faster than v3)
- Supabase (Postgres + RLS on every table)
- Stripe (CAD primary, single-purchase + bundles + monthly sub)
- Anthropic API (recommendation wizard, with a heuristic fallback for when the API is down)
- Resend (transactional)
- Vercel

**The pricing model:**
- Single kit: $14 (non-dev) / $19 (dev)
- Bundles: $35–$249
- Pro+ subscription: optional, ~$15/mo (updates + private API)
- API: free read tier, paid above

### What worked

**1. Template-first.**
Spent 3 weeks on the SKILL.md template before building kit #1. Every kit after took 4-6 hours instead of 14. Without the template, 100 kits = 18 months. With it, 30 days.

**2. The free wizard.**
The wizard is the highest-converting entry on the site. 5 questions, no email gate, returns 1-3 kits ranked by fit. Without it, the catalog of 100 was overwhelming and bounce was 70%+.

**3. The day-job angle.**
My credibility on the trades kits (plumber, electrician, contractor) is structural, not borrowed. My pipefitter coworker test-drove the Plumber kit and rebuilt it twice before public release. That kind of grounding is hard to fake.

**4. Multi-format from day one.**
Every kit ships in SKILL.md + Custom GPT instructions + optimization pack + memory.md. 4x the maintenance, but kills the "but I switched models" objection on contact.

### What I'd do differently

**1. Ship 20 kits first, not 100.**
The catalog of 100 was too much to absorb. A focused launch with the 20 highest-fit kits, then expand, would have been a better wedge. Especially because customer feedback in month 1 already tells me which 30-40 kits to prioritize and which to backburner.

**2. Build the wizard FIRST.**
I built the wizard after the catalog. Should have been the other way around. The wizard shaped how the catalog needed to be tagged, and retrofitting tags across 100 kits took longer than I expected.

**3. Don't try to nail pricing pre-launch.**
I changed prices 4 times in 30 days post-launch based on what people actually paid. Should have started with "we'll iterate" instead of "we'll get it right."

**4. Pre-build the launch kit while building the product.**
I wrote 75K words of launch content in the last two weeks before launch (Show HN post, ProductHunt kit, newsletter outreach, etc.). Should have been doing it 30 minutes a day during the build. Compressed pre-launch is the wrong shape.

### The numbers (30 days post-launch)

I'm going to be vague on the exact dollar figure because I'm not ready to post the number publicly. But:

- Customers from 18 countries
- Single-kit purchases dominate the unit count
- Bundles have higher AOV but lower volume than I expected
- Pro+ subscription converting under target — the pitch isn't landing yet, working on repositioning
- API has 14 active integrators, 3 more in the pipeline

What's interesting: trades kits over-index on conversion. Underserved buyers. Dev kits are the highest unit count. Recruiter kit was the surprise hit — bought by SMB hiring managers who don't have a TA team.

### What I'm working on next

- 25 more kits (target 125 by day 120). Healthcare and Personal Finance expansion. First batch of guest-authored kits (Pro+ subscribers can submit; I curate).
- Custom GPT format v2 — closing the gap with the SKILL.md version.
- Better category browse UX. The wizard is great; the catalog browse is rough.
- Pro+ repositioning.
- One small paid acquisition experiment (~$500 budget, measure everything).

### What I'm explicitly NOT doing

- Raising. Bootstrapped is the model.
- Adding a "lite" pricing tier. Simple pricing stays.
- Chasing the "agent platform" buzzword. We sell kits. That's enough.

### Stuff I'm curious about

If you've built productized info products (templates, prompt packs, course bundles, micro-SaaS):

- How did you handle the "build vs market" split in month 1?
- What worked for distribution? Newsletter? Reddit? Twitter? Affiliates?
- Did you stay bootstrapped or raise eventually?

Happy to answer anything about the SKILL.md format, the multi-AI portability bet, the wizard implementation, the pricing model, or what it's like building while still working a rotating-shift day job.

Link: lumenari.io
