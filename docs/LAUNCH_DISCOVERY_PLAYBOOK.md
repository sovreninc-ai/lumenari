# Lumenari Launch & Discovery Playbook

The companion to the SEO infrastructure shipped in this batch. Built around the
3-channel theory: paid (later), discovery (this doc), SEO (the other doc). Every
section is intentionally tactical — checklists, templates, cadences. Owner: Chris.

---

## 1. ProductHunt

ProductHunt is a one-shot launch event. Done well, it produces 200-1500 day-of
visitors, 15-60 newsletter subs, and 1-5 paying customers. Done badly, you waste
a launch week. The difference is preparation.

### Pre-launch (T-14 to T-1)

- [ ] Create a Lumenari account on ProductHunt — `lumenari` handle.
- [ ] Build the hunter relationship. Best path: post warm in PH community
      threads for 2-4 weeks before launch. Identify 1-2 quality hunters who
      cover dev tools / AI productivity. Don't ask cold.
- [ ] Build the ship-deck:
      - Tagline: "Curated AI skill kits for Claude, ChatGPT, Cursor & Gemini"
      - 60-char headline alt: "Optimization kits for your AI"
      - First comment (200 words) ready to paste in the moment you launch
      - 5 GIFs / screenshots: wizard flow, kit detail, library, recommendation
        wizard returning a result, OG image
- [ ] Build the supporter list (60-100 names):
      - Personal network warm contacts
      - Lumenari kit-bundle customers (offer them an exclusive)
      - Indie hacker / SaaS Twitter network
- [ ] Schedule launch for Tuesday or Wednesday (best for AI category traffic)

### Day-of (T-0)

- [ ] Launch goes live at 12:01am Pacific
- [ ] Personal post in 3 communities at 6am PT: r/SaaS, r/indiehackers, IndieHackers.com
- [ ] First comment from Chris within 5 minutes (sets the conversation tone)
- [ ] Email blast at 9am Pacific to supporter list — DO NOT say "upvote me",
      say "we're live, here's the link, any feedback welcome"
- [ ] Twitter thread at 10am PT (10-tweet teardown — see Twitter section)
- [ ] LinkedIn post at 11am PT (the "story of what I built" version)
- [ ] Reddit drops 2pm PT and 6pm PT in r/ChatGPTPro, r/ClaudeAI, r/ProductHunters
- [ ] At each PH comment respond inside 15 mins. Tone: builder, not marketer.

### Day-after (T+1)

- [ ] Recap post on Twitter ("Yesterday we…")
- [ ] Email Top Product winners — congratulate, don't pitch
- [ ] Update STATE.md with results
- [ ] If shipped Product of the Day, write a follow-up blog post

### First comment template

> Hey PH! I'm Chris, the maker.
>
> Lumenari is a curated catalog of AI skill kits — drop-in prompt packs and
> SKILL.md bundles for Claude, ChatGPT, Cursor, and Gemini.
>
> Why I built it: I was already pairing with Claude on Sovren Sports every
> day. The good prompts lived in a Notion doc, the great ones in my head.
> Every new project started cold. Lumenari is the version of that I wish I
> could have bought 6 months ago.
>
> 3 things I'd love feedback on:
> 1) The 3-step recommendation wizard — does it land?
> 2) Multi-AI delivery (every kit ships in 4 formats) — is that the right call?
> 3) Bundles vs Pro+ subscription — which feels right for your workflow?
>
> Happy to answer anything in the comments. AMA.

---

## 2. Twitter / X — 30-day launch cadence

The goal isn't followers. It's the right 50 people seeing the right thing on the
right day. Lumenari's voice on Twitter: direct, builder, slightly contrarian on
AI tooling hot-takes.

### Cadence

- Daily: 1 tweet
- 3x / week: 1 thread (5-10 tweets)
- 2x / week: 1 reply-guy comment on a high-traffic AI thread
- Weekly: 1 "story" tweet — what you actually built that week

### 30 sample tweets (round 1)

1. The thing nobody tells you about Claude skills: 80% of the value is in the
   first 200 lines. The rest is decoration.
2. AI prompts are software. They have versions, dependencies, and customers.
   Treat them like that.
3. Built a 3-step wizard for picking AI skill kits. Tells you which kit to
   buy based on what you're doing. Took me 9 hours. Should have done it sooner.
4. Most "ChatGPT prompts" you buy on Twitter are recycled. The fix isn't a
   better prompt — it's a structured kit the AI reads on every session.
5. Claude vs ChatGPT for sales outreach: I ran the same campaign through both.
   Numbers in the thread.
6. The SKILL.md format is the most underrated thing Anthropic shipped in 2025.
   Here's why →
7. Solo founders waste 6 hours a week writing the same 5 templates badly.
   Generic AI makes them faster, not better. Kits make them better.
8. If you're paying $20/mo for ChatGPT Plus and not using Custom GPTs, you're
   leaving 60% of the value on the table.
9. The two questions every AI prompt has to answer: 'when does this fire?'
   and 'what does success look like?'. Most fail the first one.
10. Built a $14 kit for real estate agents. One agent told me it saved her
    20 min per listing. That's 7 hours / week. Wild.
11. The reason most AI sales prompts produce flat copy: they ignore the reply.
    Reply handling is where the deal lives.
12. Tip: if you sell a digital product on Stripe, set the price in integer
    cents. Floats break in the worst way the first time you hit currency conv.
13. Multi-AI delivery is the bet I'm making. Every kit in 4 formats.
    Portability is a feature, lock-in is a bug.
14. RLS is the single most important thing in a multi-tenant SaaS, and the
    single thing most AI-generated code gets wrong by default.
15. Wrote my first SKILL.md by trying to teach Claude to write product update
    emails. Worked better than 3 months of prompt engineering.
16. Hot take: subscription AI tooling is overpriced when you'd buy 4-6 kits a
    year anyway. Pro+ is $99/yr. Math.
17. The 12-word real estate listing hook beats 200 words of marketing copy
    every time. Why? Because phones.
18. Built a wizard that recommends AI skill kits from a plain-English use
    case. The fallback when Claude is down is keyword matching. It's…fine.
19. If your AI workflow doesn't have a SKILL.md or Custom GPT, you're starting
    every chat cold. That's the bottleneck.
20. Best 14-day-in-the-business move I made: stopped writing kit titles like
    a Stripe internal doc. Now they're like Apple Music albums.
21. Customer support template thread incoming. The 7 most common ticket
    patterns and how to ship the right tone every time.
22. Claude reply rate on cold email outreach went from 6% to 11% with a
    structured kit. Same prospects, same offer. Just structure.
23. The kit nobody asks for but everybody needs: a brand voice extractor.
    3-5 samples in, saveable voice profile out.
24. Three signs you've outgrown free Claude/ChatGPT: (1) you copy-paste the
    same prompt 5x a day, (2) you have a Notion doc of "good prompts", (3)
    you've lost a great prompt to a closed tab.
25. Indie hackers: stop building tools for indie hackers. The market is real
    estate agents, recruiters, freelance consultants. They pay.
26. The bundle pricing math: 4 kits at $14 each is $56. Sales+Marketing
    Bundle is $45. Why $11 cheaper? Because most people would only buy 2.
27. Tactical AI prompting tip #847: tell Claude what NOT to use. "Don't use
    the word 'nestled'". Works perfectly. Banned-word lists > positive prompts.
28. PSA: if you're writing SKILL.md files, the first 50 lines decide whether
    Claude understands what you're doing. Put the "when to use this" up top.
29. Most underrated kit in the Lumenari catalog: Brand Voice Builder. Build
    it once, every future draft gets cleaner. It's an editor not a generator.
30. The newsletter I'm trying to write daily but only manage 2x a week. Sign
    up if you want one useful AI thing in your inbox per week.

---

## 3. LinkedIn — Week 1-4 cadence

LinkedIn is the right channel for the buyer personas Lumenari is targeting (real
estate agents, recruiters, consultants). Cadence: 3x / week. Tone: builder
talking shop, not marketer pushing product.

### Launch post template

> I built a small thing I wish someone else had built 12 months ago.
>
> Lumenari is a curated catalog of AI skill kits — drop-in prompt packs and
> SKILL.md bundles for Claude, ChatGPT, Cursor, and Gemini. 20+ kits at
> launch. Every kit in 4 formats. Bundles that save 30-50%.
>
> The bet: most working professionals reach for AI on the wrong task. Cold
> outreach. Listing copy. Status reports. Generic prompts produce generic
> output. A structured kit changes the shape of what comes back.
>
> Free wizard at https://lumenari.io — describe your use case, get the
> right kit. Pricing starts at $14 CAD. Pro+ all-access is $99/yr.
>
> What would you want a kit for that I haven't shipped yet?

### Week 1-4 post topics

- W1: launch post (above), then 2 builder-side posts about specific kit decisions
- W2: 3 case-style posts ("how a recruiter used this kit to cut sourcing time")
- W3: 3 hot-takes on AI tooling (multi-AI > single-AI lock-in, etc.)
- W4: 3 posts about the next 20 kits — let buyers vote with their replies

---

## 4. Reddit

Reddit is high-leverage but high-risk. The community penalizes anything that
smells like marketing. Every post has to be informational first; the Lumenari
mention has to be earned. Cadence: max 1 substantive post per subreddit per
month.

### Subreddit plan

- r/ChatGPTPro — "How to use Custom GPTs to replace 4 of your weekly templates"
- r/ClaudeAI — "Built a SKILL.md catalog — feedback wanted"
- r/SaaS — "Year-1 SaaS launch lessons" + brief Lumenari mention
- r/EntrepreneurRideAlong — "I went from idea to $XXX in 30 days — receipts"
- r/Marketing — "Brand voice extractors actually work — here's the data"
- r/seo — "Programmatic SEO at 300 pages — what's working"

### Rules

- Read the subreddit's rules before posting. Some forbid promotion entirely.
- The Lumenari URL goes in the body, not the title.
- Every post must include at least 2 paragraphs of standalone value.
- Reply to every comment within 4 hours of posting.

---

## 5. Newsletter outreach (20 targets)

The goal: get included in a newsletter's "what we're reading" section. Each
outreach is a 4-line email that offers value first.

1. **The Information Daily** — tech, paid newsletter, hard to crack but worth it
2. **Stratechery** — Ben Thompson, unlikely but every email costs nothing
3. **Lenny's Newsletter** — PM-focused, perfect fit for PM Toolkit
4. **Every** — Dan Shipper, AI-focused, big audience
5. **Ben's Bites** — daily AI roundup, easiest to crack
6. **The Rundown AI** — daily AI, broad audience
7. **TLDR AI** — daily AI digest
8. **Superhuman** — AI productivity, Lumenari-shaped audience
9. **AI Tool Report** — AI tool focused
10. **Bot Eat Brain** — AI news + tools
11. **Indie Hackers Newsletter** — perfect fit for Startup Founder Toolkit
12. **The Hustle** — broad SMB audience
13. **Morning Brew** — broad audience, marketing kit fit
14. **CB Insights AI** — enterprise-leaning AI
15. **Recapped AI** — Sundays only, broad
16. **AI Brews** — daily, smaller list but engaged
17. **MarkTechPost** — marketing tech audience
18. **The Neuron** — AI-focused, growing fast
19. **Smart Brevity by Axios** — AI section
20. **Stack News** — for developer-side kits

### Outreach template

Subject: Tool you might want to mention in a future issue

> Hi [Name],
>
> I read [specific recent issue] — really liked the bit about [specific
> detail]. The angle on [Y] was sharp.
>
> I built something your readers might use: Lumenari (https://lumenari.io)
> — a curated catalog of AI skill kits for Claude, ChatGPT, Cursor, and
> Gemini. 20+ kits launched, priced $14-29. The two-line description if
> you cover it: "Drop-in prompt packs that make Claude work like a senior
> teammate. Bundles 30-50% off."
>
> No ask — just a heads up if it's a fit for a future "what we're using"
> section.
>
> — Chris

---

## 6. AI tool directories (submit week 1)

- [ ] TheresAnAIForThat.com — free submission, big traffic
- [ ] Futurepedia.io — free submission, AI-only
- [ ] AIToolsDirectory.com — free submission
- [ ] ToolFinder.com — free submission
- [ ] AIScout.com — paid for featured
- [ ] AIToolsHub.com — free submission
- [ ] AllThingsAI.com — free
- [ ] AItools.fyi — free, curated
- [ ] AIToolGuru.com — free
- [ ] AIToolsPro.com — free

Submission template:
> Lumenari — Curated AI skill kits for Claude, ChatGPT, Cursor & Gemini.
> 20+ kits, 4-format delivery per kit, AI recommendation wizard, Free tier API.

---

## 7. HackerNews "Show HN"

Timing: Tuesday 8-9am Pacific. Title: "Show HN: Lumenari – Curated AI skill kits in 4 formats".

First comment template:

> Maker here. Lumenari is a curated catalog of AI skill kits for Claude,
> ChatGPT, Cursor, and Gemini. 20+ kits at launch, $14-29 each, with bundles.
>
> The pitch: most working professionals reach for AI on the wrong task and
> generic prompts produce generic output. A structured kit — a SKILL.md or
> Custom GPT — changes the shape of what comes back.
>
> Stack: Next.js 16 + TypeScript + Supabase + Stripe. Solo build, ~280 hrs in.
>
> Happy to answer anything: pricing, multi-AI portability tradeoffs, the
> recommendation engine (Anthropic-backed with a heuristic fallback), or
> how the bundles are structured. AMA.

---

## 8. Affiliate program outreach

Once first 50 customers are in, launch an affiliate program at 25% lifetime
commission. Outreach template for affiliate recruits:

> Hi [Name] — I've been reading [their newsletter / following their work].
>
> Lumenari (https://lumenari.io) is a curated catalog of AI skill kits.
> We're launching an affiliate program at 25% lifetime commission. Your
> audience has the exact shape we sell to.
>
> Interested? I'll send the affiliate link + a 60-day exclusive on a custom
> bundle you can co-brand.
>
> — Chris

Affiliate targets (start here):

- 5x niche newsletter authors (50k-200k lists)
- 3x YouTubers (50k-500k subs) in AI / productivity
- 5x Twitter accounts (50k+) in AI / SaaS / freelance
- 3x course creators in AI / productivity
- 2x agencies that resell tools to clients

---

## 9. Press

Most press is wasted effort until you have something genuinely new. Lumenari's
unique angle: the multi-AI portability bet. Pitch in week 4-6 once early traction
is in.

Outlets: TechCrunch, The Information, Axios AI, IndieHackers blog, The Hustle,
Sifted (Europe), Tech.eu, Beta Kit (Canada).

---

## 10. Day-1 acceptance criteria

For Chris to declare launch a success:

- [ ] 5 paying customers in week 1
- [ ] 50 newsletter signups in week 1
- [ ] 1 mention in a newsletter with >10k subscribers
- [ ] At least 1 piece of detailed organic feedback that shapes batch-2 kits

If only 2 of these hit, treat it as a soft launch and re-run the playbook in 4 weeks.
