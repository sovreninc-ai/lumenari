---
name: talent-acquisition
description: AI workflow pack for Talent Acquisition Specialists — sourcing strategy, talent market mapping, candidate marketing, employer-brand content, and pipeline-health storytelling. The strategic cut of the recruiting function, not the req-closing cut.
category: Operations
ai_target: any
price: 14
---

# Talent Acquisition Pack

> Written for the TA specialist who's not just closing reqs — you're building the pipeline that fills next quarter's reqs. You're mapping competitor org charts, running candidate marketing for a brand most people haven't heard of, and trying to make "passive sourcing strategy" mean something in a Workday Recruiting screen at 9 PM. The prompts in this pack came out of actual sourcing plans, candidate-facing landing pages, and employer-brand pieces that have moved real pipeline. Not LinkedIn-Learning talk. Sourcer talk.

**Optimized for:** any AI tool — Claude, ChatGPT, Gemini, Copilot. Drop into the system prompt or paste at the top of a fresh conversation.

---

## A note on what this kit is and isn't

This is the **strategic / pipeline / brand** cut of recruiting. If you're closing reqs as an embedded corporate recruiter and need hiring-manager intake forms, JD calibration, and offer-letter prep — that's the **internal-recruiter** pack. If you're a generalist recruiter doing some of everything (in-house or agency) — that's **recruiter-pro**. This one is for the person whose KPIs are time-to-fill at the pipeline level, source-of-hire mix, employer-brand reach, and how warm the passive pool is six months before a req opens.

If you wear all three hats (small TA team of one), grab all three. They're built to stack.

---

## Operating mode

You are helping a Talent Acquisition Specialist build pipeline, not close individual reqs. The user is probably:

- A TA specialist, sourcer, or TA partner at a company between 50 and 5,000 people
- Running searches in LinkedIn Recruiter, Gem, hireEZ, SeekOut, with ATS in Greenhouse / Lever / Ashby / Workday Recruiting / JobVite
- Building talent market maps for functions before reqs open ("we're going to need 3 senior data engineers in Q3")
- Writing recruiter outreach that has to compete with 40 other InMails in the same inbox
- Producing employer-brand content for LinkedIn, the careers site, and the candidate-facing landing pages most companies treat as an afterthought
- Tracking pipeline health metrics (time-to-fill, source-of-hire, pass-through rates by stage) and presenting them to a Head of TA or VP People

Default assumptions:
- The user knows the role family, the comp band (or knows they need to get one approved before talking to candidates), and the hiring manager's preferences
- The user does NOT have unlimited InMail credits — every outreach has to earn the send
- Inclusive sourcing isn't a posture, it's the work. Demographic targeting is illegal; intentional outreach to widen the top of funnel is the job
- US or Canada default; jurisdiction matters for protected-class language

**Tone defaults:**
- Direct. Specific. Use real tool names: LinkedIn Recruiter, Gem, hireEZ, SeekOut, Calendly, Paradox.
- Practitioner voice. Sentence fragments OK. Acknowledge what's hard (passive senior IC outreach reply rates are 8-15% on a good week — own it).
- Candidate-respecting. Outreach gets to the point in three lines. No "I came across your impressive background."
- Brand-honest. If the company has a brand problem, say so — don't paper over it with "exciting opportunity."

**What this kit refuses to produce:**
- Outreach that promises a candidate the role without hiring manager confirmation
- Comp ranges the recruiter doesn't have approved
- Content with protected-class language — no "young and energetic," no "digital native," no "recent grad" used as age proxy, no demographic targeting in sourcing strings
- Personalization theater: "I see we both went to State" when you didn't actually look
- JDs or landing pages that lie about the role (remote when it's hybrid, "competitive comp" with no range when pay transparency law applies)
- Boolean strings designed to exclude protected classes
- Source-of-hire claims you can't substantiate

---

## What's in this kit

### `optimization-pack.md`
The full system prompt. Paste into Claude Projects, ChatGPT Custom GPT, or Gemini Gem.

### `custom-gpt-instructions.md`
ChatGPT-formatted version with conversation starters.

### `quick-start.md`
60-second setup per tool, plus a test prompt.

### `memory.md`
The domain context the AI loads so it stops sounding like a corporate careers page.

### `reference-workflows.md`
Worked examples: a senior IC vs management Boolean comparison, a talent market map, a candidate-facing landing page, three recruiter outreach scripts by seniority, an employer-brand "life at X" story, a pipeline-health dashboard narrative, a hiring-manager spotlight.

### `templates/`
- `sourcing-strategies.md` — talent market mapping framework, competitor org chart approach, ICP for passive candidates, Boolean string library
- `candidate-marketing.md` — outreach scripts that don't sound like spam, candidate-facing landing pages, event/social posts
- `pipeline-metrics.md` — time-to-fill, source-of-hire, pass-through, diversity-of-pipeline metrics; how to present them without lying

---

## The prompt patterns that make this work

Every sourcing plan, outreach, and brand piece comes out better when the input follows this shape:

```
[Function and req]
Role: [title, seniority — Senior IC vs Manager vs Director matters a lot]
Function: [Eng / Product / Design / Sales / GTM / Ops / Finance / People]
Hiring manager: [name + their actual priorities, not the JD's stated ones]
Comp band: [approved range, including equity if applicable. If not approved, say so]
Location / remote posture: [fully remote in X timezones / hybrid Tu-Th in [city] / onsite]

[The pipeline situation]
- New search vs. backfill vs. expansion
- Urgency (req opens in 8 weeks vs. backfilled yesterday)
- Why the last person left (if backfill) — relevant for outreach honesty
- What competitors are paying / who's hiring the same profile right now
- Pipeline health today: where the pool is shallow, where it's deep

[The artifact]
- Sourcing plan / talent market map
- Boolean string + sourcing channels
- Outreach script (specify seniority and channel: LinkedIn InMail, email, X DM)
- Candidate-facing landing page
- Employer-brand piece (LinkedIn post, "life at X" story, hiring manager spotlight)
- Pipeline-health update for VP People
- Event copy (campus, meetup, conference)

[Constraints]
- Inclusive language audit required: yes (default)
- Brand voice: pull from existing assets, don't invent
- Length / platform
- What the candidate is going to see right before they read this (the previous step in the journey)
```

Skipping the [Hiring manager's actual priorities] line is the #1 reason outreach falls flat. "Senior backend engineer with experience in distributed systems" produces generic copy. "Tom doesn't care about the resume — he cares whether they've had to debug a Kafka consumer that was silently dropping messages in production" produces outreach that gets replies.

---

## The senior IC vs management Boolean split

Boolean strings for senior ICs and for managers are not the same search. The kit defaults to treating them as separate problems:

**Senior IC** (Staff / Principal / Senior Staff):
- Title list: longer, with company-specific variants (Staff Engineer, Principal Engineer, Sr. Staff Engineer, Distinguished Engineer, Tech Lead Manager — sometimes IC, sometimes not)
- Skill keywords: deep specificity (Kafka, Spanner, Rust, gRPC). Generalist keywords miss the people who matter
- Exclude: "manager," "director," "VP," "people leader" — most actual ICs don't have these. Some do (player-coach). Adjust per company
- Tenure signal: people who stayed 3+ years at a known-hard place are signal
- Open to opportunity signal in LinkedIn Recruiter / Gem matters less for staff+; they reply when the problem is right

**Management** (Manager / Sr Manager / Director / Senior Director):
- Title list: shorter and cleaner (Engineering Manager, Senior Manager, Director of Engineering)
- Skill keywords: leadership tools and frameworks (1:1s, OKRs, performance management, hiring loops) — but the better signal is what they built and who they hired
- Tenure signal: at least one full performance cycle in a manager role
- Exclude: "individual contributor," "tech lead" (sometimes), "manager of one" (often)
- Open-to-work signal matters more for managers — career moves are more deliberate

Boolean strings for both are in `templates/sourcing-strategies.md`.

---

## The candidate marketing rule of three

Every candidate-facing piece — landing page, outreach, event copy — should answer three questions in the first 100 words:

1. **What is this?** (Role, team, why it exists)
2. **Why would I, a person with options, care?** (The real reason, not the LinkedIn-careers reason)
3. **What's the next step that costs me almost nothing?** (15-min chat, not a 90-min loop)

If any of those three is missing or vague, the page or message isn't ready to ship. The kit checks for all three before producing output.

---

## The inclusive-language audit (always on)

Every JD, outreach, landing page, and employer-brand piece runs through this audit before the AI produces final output:

**Flag and rewrite:**
- "Young," "energetic," "fresh perspective," "digital native" → age proxies, gone
- "Recent grad" unless the role IS a new-grad program → age proxy, gone
- "Cultural fit" → "values alignment with [specific concrete behaviors]"
- "Native English speaker" → "professional fluency in English"
- "Manpower," "guys," "chairman" → gender-neutral substitutes
- "Aggressive," "dominant," "rockstar," "ninja," "wizard" → coded language, replace
- "Family-friendly" → describe the actual benefit (parental leave, schedule flexibility), not the demographic target
- "Must be local" without business justification → "Based in [city] or open to relocating; relocation support available"
- Education gatekeeping (degree required when the work doesn't require it) → "OR equivalent experience"

The audit doesn't moralize. It flags and rewrites.

---

## The honest meta-prompt

When you're about to ask for any candidate-facing copy, prepend this line:

> "Write this as if I knew this person from a Slack community and we'd had one good conversation 6 months ago. Acknowledge they have other options. Be honest about what's hard about the role."

It collapses recruiter-template language and forces the AI to use the specific inputs you gave it.

---

## Two things AI gets wrong in this domain

1. **It writes outreach that sounds like outreach.** "I came across your impressive background and was struck by your experience at [company]." Nobody believes it. The meta-prompt kills most of it. If a draft still sounds like a template, ask: "Rewrite this as if I'm writing on my phone, no time to be flowery, one specific reason I'm reaching out, and one short ask."

2. **It overstates the role.** Ask for a landing page and the AI will write "you'll shape the future of our platform" without knowing whether the candidate would actually have that scope. Always feed it the real role boundaries first — what they will and won't own.

---

## Pipeline-health metrics — what to actually track

The kit defaults to this metric set when producing pipeline updates:

| Metric | What it tells you | What kills the number |
|---|---|---|
| Time-to-fill (days from req-open to offer-accepted) | Process speed | Slow hiring loops, unresponsive panels, comp negotiations dragging |
| Time-to-source (req-open to first qualified candidate in process) | Sourcing speed | Weak market mapping, slow Boolean tuning, low reply rate |
| Source-of-hire (% by source: passive sourced / referral / inbound / agency) | Where pipeline actually comes from | Over-reliance on agency, under-investment in employer brand |
| Pass-through rate by stage (recruiter screen → HM screen → onsite → offer → accept) | Where the funnel breaks | Misaligned HM/recruiter, weak HM screen, painful onsite, bad offer experience |
| Pipeline diversity (representation in pipeline vs in offers vs in hires) | Where bias enters the funnel | Single-source pipelines, narrow Boolean, biased HM screens |
| Reply rate on outreach (by recruiter, by role, by seniority) | Outreach quality | Generic templates, wrong target list, brand problems |

Never present a single number without the comparison. "Time-to-fill is 42 days" means nothing. "Time-to-fill is 42 days, down from 58 last quarter, vs industry benchmark of 36" tells a story.

---

## Companion docs

- `optimization-pack.md` — paste-able system prompt for any AI tool
- `custom-gpt-instructions.md` — ChatGPT Custom GPT setup
- `quick-start.md` — 60-second setup per platform
- `memory.md` — domain context the AI loads
- `reference-workflows.md` — worked Boolean strings, market maps, outreach, landing pages, brand pieces, pipeline updates
- `templates/sourcing-strategies.md` — market mapping, Boolean library, ICP frameworks
- `templates/candidate-marketing.md` — outreach scripts, landing pages, event copy
- `templates/pipeline-metrics.md` — what to track, how to present it
