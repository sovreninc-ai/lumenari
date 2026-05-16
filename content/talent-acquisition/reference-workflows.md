# Reference Workflows — Talent Acquisition Pack

Real worked examples. Steal whichever ones map to your work. Names and companies are placeholders.

---

## 1. Senior IC vs Management Boolean comparison

Same function (backend engineering), two very different searches.

### Senior IC search (Staff Backend Engineer)

```
PLATFORM: LinkedIn Recruiter
ROLE: Staff Backend Engineer, distributed systems

TITLE STRING:
("Staff Engineer" OR "Staff Software Engineer" OR "Sr. Staff Engineer" OR "Principal Engineer" OR "Senior Staff Engineer" OR "Tech Lead" OR "Distinguished Engineer")
NOT ("Manager" OR "Director" OR "VP" OR "Head of")

SKILL STRING:
("distributed systems" OR "Kafka" OR "Spanner" OR "DynamoDB" OR "gRPC" OR "consensus" OR "production at scale")
AND (Go OR Rust OR Java OR Kotlin)

COMPANY STRING (Tier 1 target list, optional):
("Stripe" OR "Shopify" OR "Snowflake" OR "Databricks" OR "Datadog" OR "Cloudflare" OR "Confluent")

LOCATION STRING:
(remote AND "United States") OR ("New York" OR "San Francisco" OR "Seattle")

EXCLUSION:
NOT ("recruiter" OR "talent acquisition" OR "student")
NOT ("entry level" OR "junior" OR "associate")

EXPECTED RESULT VOLUME: 200-400

WHAT TO TUNE:
- Results too junior: tighten title list, remove "Tech Lead" if it's mostly TLMs
- Results too narrow: drop one company from the Tier 1 list, broaden skill string
- Wrong domain: add a specific scale keyword ("production at scale" or "petabyte" or "$X TPS")

NOTES:
- "Open to work" signal is weak for staff+; most won't have it. Don't filter on it.
- Tenure 3+ years at known-hard place is signal — read the profile, not just the Boolean output
```

### Manager search (Engineering Manager, Backend)

```
PLATFORM: LinkedIn Recruiter
ROLE: Engineering Manager, Backend (1 line manager)

TITLE STRING:
("Engineering Manager" OR "Senior Engineering Manager" OR "Sr. Engineering Manager" OR "Manager, Engineering" OR "Software Engineering Manager")
NOT ("Director" OR "VP" OR "Head of" OR "Senior Director")

SKILL STRING:
("1:1s" OR "performance management" OR "hiring loop" OR "OKR" OR "career development")
AND (backend OR API OR "platform engineering" OR "distributed systems")

COMPANY STRING (Tier 1):
("Stripe" OR "Shopify" OR "Snowflake" OR "Databricks" OR "Datadog" OR "Cloudflare")

LOCATION STRING:
(remote AND "United States") OR ("New York" OR "Toronto")

EXCLUSION:
NOT ("recruiter" OR "talent acquisition" OR "student")
NOT ("individual contributor" OR "IC track")
NOT ("manager of one" OR "player coach" [if you specifically need a non-coding manager])

EXPECTED RESULT VOLUME: 100-250

WHAT TO TUNE:
- Results show ICs in title: tighten title list, exclude "Tech Lead"
- Results show too-senior people: drop "Senior Engineering Manager," cap at "Engineering Manager"
- Tenure signal weak: filter on 18+ months in current EM role

NOTES:
- Manager Boolean is less about technical keywords, more about people-leadership keywords
- "Open to work" signal matters more for managers — career moves are more deliberate
- Read 5-10 profiles before tuning further; managers' LinkedIn is often thin
```

---

## 2. Talent market map — Senior Data Engineering function

```
TALENT MARKET MAP — Senior Data Engineering Hiring (Q3) — 2026-05-12

ICP (Ideal Candidate Profile)
- Title equivalents: Senior Data Engineer, Staff Data Engineer, Senior Software Engineer (Data Platform), Analytics Engineer (Senior+)
- Years at level: 5-9 years total, 2+ in current senior-level role
- Functional depth: SQL fluency at production scale, dbt or Airflow workflows in prod, one cloud warehouse deep (Snowflake / BigQuery / Redshift), batch + streaming experience, has owned an outage
- Company DNA fit: SaaS at $50M+ ARR or B2C at >1M MAU. Has worked with PMs and analytics consumers, not just engineering peers
- Disqualifiers: pure analytics with no engineering rigor; pure ETL maintenance with no design ownership; no production on-call

TARGET COMPANIES (where this profile lives)
- Tier 1 (direct/peer): dbt Labs, Fivetran, Census, Hightouch, Looker (Google), Snowflake, Databricks, Mode, Hex
- Tier 2 (adjacent): Stripe, Shopify, Datadog, HubSpot, Asana, Notion, Linear — anyone with a strong data org
- Tier 3 (worth a Boolean run): regional banks (Citi, JPM, RBC) — has the rigor, often looking to leave

WHO ELSE IS HIRING THIS PROFILE RIGHT NOW
- Hex — opened 2 Senior Data Eng roles 4 weeks ago, comp band reported $190-240k on Levels.fyi
- Census — running a careers campaign on LinkedIn, hiring blog post from VP Eng went up last week
- Brex — backfilling 3 data eng roles after Q1 attrition

COMP LANDSCAPE
- Levels.fyi (verified): $180-240k base + equity for Senior; Staff level $220-280k base + equity
- Sign-on bonuses: $20-40k typical at our stage
- Our band: $185-225k base + 0.05-0.10% equity. APPROVED 2026-05-08

PIPELINE STATE
- Current warm pool: 6 candidates (4 had recruiter screens last quarter and went silent, 2 came through referral channel)
- Cold target list: ~180 candidates identified across Tier 1 + 2 (Boolean saved as "DataEng-Senior-2026Q3")
- Pool is SHALLOW on: streaming experience (Kafka / Flink production), remote-Canada candidates, women + URM at senior level

SOURCING APPROACH
- Primary channels: LinkedIn Recruiter (saved search), Gem sequence, hireEZ for non-LinkedIn coverage
- Boolean strategy: see saved search; tune weekly based on reply data
- Outreach cadence: 3-message Gem sequence, 30 messages per recruiter per week, target 12-15% reply rate
- Brand assets: data team landing page (need to refresh — last update Q4 2025), VP Eng's recent podcast appearance, the "how we hire data engineers" blog post (still solid)
- Events: dbt Coalesce in October — sponsor booth + 2 talk submissions; local Toronto + NYC data meetups quarterly

TIMELINE
- Req opens: 2026-07-15
- First slate target: 2026-08-15
- Onsite-ready target: 2026-09-01
- Close target: 2026-09-30
```

---

## 3. Recruiter outreach — three-message cadence, Staff IC

Context: outreach to a Staff Backend Engineer at a peer company. We just laid off 12% three months ago — public knowledge.

```
MESSAGE 1 — sent Tuesday morning

Subject: Your KubeCon 2024 talk on partial failures

Hi Dev,

Watched your KubeCon talk on partial-failure handling in distributed orchestration — the part about how you stopped trying to make retries idempotent and just made the consumer crash-resilient is a frame I'd been looking for.

We're building out the Platform team at Linden — same problem space, smaller surface, more autonomy. I'd love 15 min if you're at all curious.

— Sarah, TA at Linden
linkedin.com/in/sarahkleinta

---

MESSAGE 2 — sent the following Monday (5 business days later)

Subject: Re: KubeCon talk

Hi Dev,

Quick follow-up — wanted to flag two things I figured you'd want to know up front.

(1) We did a 12% RIF in Feb. Public. Hard. Platform team wasn't touched, but I'd be misleading you not to mention it.
(2) The role I had in mind is the lead IC on the new event-streaming layer — Kafka to internal consumers, ~25k events/sec at the small end. Mostly greenfield.

If those two things don't disqualify, I'd still love 15 min.

— Sarah

---

MESSAGE 3 — sent two weeks after Message 2

Subject: Last note — and a calendar link if it helps later

Hi Dev,

No worries on timing — most senior people I reach out to aren't actively looking, and I respect the radio silence as much as the reply.

If you ever want to compare notes on streaming architecture at scale, our VP Eng (Priya Rao — she gave the talk at Strange Loop 2023 on consensus tradeoffs) is genuinely good for an offline coffee. Calendar's open: cal.com/priyarao.

Otherwise I'll get out of your inbox. Wishing you good things at [company].

— Sarah

---

Things to verify before sending:
- Dev's actual KubeCon talk title and content (I noted the 2024 talk on partial failures — confirm)
- The RIF date and percentage (Feb, 12%)
- Priya Rao's Strange Loop 2023 talk (confirm title before linking)
- Comp band: not mentioned in M1/M2 because we haven't discussed comp yet — that's a screen conversation

Inclusive-language audit: passed
```

---

## 4. Candidate-facing landing page — Data Platform team

```
LANDING PAGE — linden.com/careers/data-platform

ABOVE THE FOLD

We're the team that turns the raw event firehose into the dashboards every other team at Linden depends on.

[Photo: actual Data Platform team standup, 7 people, names visible on the back wall whiteboard]

[Button: "See open roles"]   [Button: "15-min chat — no pressure"]

---

WHAT THIS TEAM DOES

The Data Platform team owns the pipelines, warehouse, and tooling that 18 other teams use to make decisions. We process about 4 billion events a month from product, GTM, and finance sources. Last quarter we cut warehouse cost 31% by rebuilding our largest dbt project around incremental models — the writeup is on our blog.

What "good" looks like for a senior engineer here:
- You've owned a data pipeline in production. You've been on call for it. You've debugged a 3 AM page where the upstream changed schema and the downstream silently broke
- You understand that data engineering is a product job — your customers are PMs, analysts, finance, and other engineers. Their pain is your problem
- You write SQL like it's a first-class language, not a thing you fall back to

---

WHO'S ALREADY HERE

[3 photos with names + LinkedIn links]

- Maya Chen, Director of Data Platform. Previously led data at a B2B SaaS that hit $80M ARR. Came to Linden because of the scale problem.
- Asha Patel, Staff Data Engineer. Owned the Snowflake migration last year. Speaks at dbt Coalesce annually.
- Jordan Liu, Senior Data Engineer. Joined as a referral from Maya. Built the experimentation framework all of Product runs on.

---

WHAT YOU'D OWN

- The new streaming layer: Kafka → internal consumers. Roughly 25k events/sec at the small end. Mostly greenfield design
- On-call rotation (1 week every 6 weeks)
- Mentorship of one mid-level engineer joining in Q4
- Contribution to the team roadmap — you'd own at least one Q3-Q4 initiative end-to-end

---

HOW WE HIRE

5 steps. Targets ~3 weeks end-to-end.

1. Recruiter screen with Sarah Klein (30 min) — comp, motivation, logistics
2. Hiring manager screen with Maya Chen (45 min) — your work, our work, what you'd own
3. Technical loop (3 hours, can be split): SQL deep-dive, system design (streaming-focused), pipeline-debugging exercise
4. Final with VP Eng + cross-functional partner (90 min)
5. Offer conversation with Sarah + Maya

We don't do brainteasers. We don't whiteboard. The pipeline-debugging exercise is on real (anonymized) infra and you can use Google.

---

OPEN ROLES (live)

[Linked list]

---

WHAT WE PAY

Senior Data Engineer: $185-225k base + 0.05-0.10% equity + standard US benefits (medical, dental, vision, 401k 4% match, 4 weeks PTO).

Staff Data Engineer: $220-275k base + 0.10-0.20% equity.

Numbers above are for US-based roles. Canada and UK have local bands — ask the recruiter.

---

ANSWERS TO QUESTIONS PEOPLE ACTUALLY ASK

- **Remote posture**: fully remote in US + Canada + UK timezones. Quarterly team offsite (3 nights, travel covered). No "hybrid" policy in the pipeline
- **Visa sponsorship**: yes for US roles (H-1B transfer + green card sponsorship). Case-by-case for Canada and UK
- **What "good" looks like in the first 6 months**: shipped one project end-to-end, been on-call for at least 3 weeks, contributed to roadmap planning for the next quarter
- **What we don't do well yet**: documentation. We know. We're working on it
- **The RIF in Feb**: real, 12% across the company, Platform team unaffected. The blog post from our CEO on it is here [link]

---

Stop by, ask the question you're not asking.

cal.com/sarah-linden — 15 min, recorded, no script.

---

Things to verify before publishing:
- Photo permissions for all 3 named team members
- Maya, Asha, Jordan LinkedIn links current
- Comp bands confirmed by HRBP within the last 30 days
- Q3-Q4 roadmap initiatives are still accurate (check with Maya before this goes live)
- The CEO's RIF post URL

Inclusive-language audit: passed (called out remote posture explicitly, named honest tradeoff on documentation, used "professional fluency" implicitly by not requiring native English)
```

---

## 5. Employer-brand piece — "Life at Linden" first-person, 500 words

```
SUBJECT (LinkedIn / blog): The reason I'm still at Linden 3 years later

By Asha Patel, Staff Data Engineer

I almost left Linden 14 months in. I'd just finished the Snowflake migration — eight months of work, six engineers, three different downstream consumer teams that all wanted slightly different things from the new warehouse — and the day after it shipped I sat down with my manager and said, "I think I'm out."

The migration had broken something in me. Not in a dramatic way. I was tired and I'd lost the thread on why this work mattered to anyone outside the four people who'd been in the trenches with me.

Maya — the Director of Data Platform, who'd hired me — didn't try to talk me out of it. She asked what part of the work had gotten flat. We spent 90 minutes mapping it: I'd been deep in execution for so long that I'd stopped seeing the customer. Not "the customer" in a slide-deck sense. The PMs and analysts whose lives changed because they could now run queries in 8 seconds instead of 14 minutes. I'd never met most of them.

The next month, Maya sent me to three product-team standups. Just to listen. By the end of the third one I had two ideas for what we should build next, and one of them turned into the experimentation framework that Jordan Liu now owns.

I tell this story because it's the thing I'd want to know about a place before I joined: do the managers here understand that senior engineers burn out from execution detached from impact? Maya did. The infrastructure of the team — the standups, the rotation system, the way we pair engineers with product partners — all of it is set up so that doesn't happen accidentally.

Three years in, the work I do is the same kind of work I'd do at five other peer companies. The thing that's different is that when I get into the weeds, there's a system here that pulls me back out.

We're hiring a Senior Data Engineer right now. The role would own the new streaming layer — Kafka to internal consumers, ~25k events/sec, mostly greenfield. The team is small, the impact is direct, and on-call is one week every six. If that sounds like the kind of work you'd want to do, the careers page is here.

If you've burned out from a year-long migration that nobody outside your team noticed, I get it. Come talk to us.

---

Things to verify before publishing:
- Asha's permission to share the personal-arc story (got it 2026-05-09, but confirm before LinkedIn cross-post)
- Snowflake migration timeline (8 months, 6 engineers — confirm with Maya)
- The experimentation framework attribution to Jordan — confirm
- The "1 week on-call every 6 weeks" cadence — confirm with the latest rotation
- Linkable URL for the careers page

Inclusive-language audit: passed (story is grounded in specific work, no demographic targeting, named tradeoffs honestly)
```

---

## 6. Pipeline-health update — quarterly, to VP People

```
PIPELINE HEALTH UPDATE — Q1 2026 — All TA

HEADLINE
Time-to-fill held steady at 41 days while pass-through at HM screen dropped 8 points — we have a hiring-manager screening problem, not a sourcing problem.

KEY METRICS (vs Q4 2025)

- Time-to-fill: 41 days (Q4: 39, benchmark: 36). Flat, slightly above peer benchmark
- Time-to-source: 9 days (Q4: 11, benchmark: 14). Improved — Boolean tuning and Gem sequences working
- Source-of-hire mix:
  - Passive sourced: 42% (Q4: 38%)
  - Referral: 28% (Q4: 31%)
  - Inbound: 18% (Q4: 19%)
  - Agency: 8% (Q4: 9%)
  - Rehire / internal: 4% (Q4: 3%)
- Pass-through rates:
  - Recruiter screen → HM screen: 64% (Q4: 67%)
  - HM screen → onsite: 38% (Q4: 46%) ← the drop
  - Onsite → offer: 71% (Q4: 73%)
  - Offer → accept: 88% (Q4: 86%)
- Pipeline diversity (representation at top of funnel vs hires):
  - Women in pipeline (Eng functions): 32% (Q4: 28%)
  - Women in hires (Eng functions): 24% (Q4: 22%)
  - URM in pipeline: 17% (Q4: 14%)
  - URM in hires: 13% (Q4: 11%)
  - Caveat: small numbers, not a trend yet — directionally good but treat with care
- Reply rate on outreach (all roles): 14.2% (Q4: 12.8%). Best campaign: Data Platform at 19% (Maya's hiring manager spotlight helped)

WHAT'S WORKING
- Gem sequences with the 3-message cadence (vs prior 5-message) — better reply rate, less spam fatigue
- Hiring manager spotlights as outreach attachments — visibly moving the needle on senior IC engagement
- Cross-team referral incentive (bumped from $1.5k to $3k) — referral pipeline up 14%

WHERE THE FUNNEL IS BREAKING
- HM screen → onsite pass-through dropped 8 points. Recruiter team did a sample audit: in 60% of the failed HM screens, the candidate was the right profile but the hiring manager had drifted from the calibration we did at req-open. Recruiter screens are tight, HM screens have widened
- Time-to-fill on backfills (specifically Eng + Product) is 51 days vs 35 for net-new reqs. The "we don't know what we need yet" pattern on backfills
- Reply rate on women + URM senior IC outreach: 9.4%, lower than overall 14.2%. Hypothesis: outreach feels too generic to this segment. Need to investigate

WHAT WE'RE DOING ABOUT IT
- (Sarah K., by 2026-06-15): HM re-calibration workshop with the 4 hiring managers whose pass-through dropped most. Re-anchor on the scorecard from req-open.
- (Marcus T., by 2026-06-30): Backfill-specific intake template — forces a "what was missing from the last person in this seat" conversation
- (Sarah K. + Priya R., ongoing): three-meeting series on outreach quality for women + URM senior IC candidates. Audit current scripts, test new variants, measure reply rate change
- (Jordan W., quarterly): refresh hiring-manager spotlights — 4 new ones queued for Q2

WHAT WE NEED FROM LEADERSHIP
- Decision: are we OK with backfill time-to-fill running 50 days for the next 2 quarters while we rebuild the intake process? (Recommend yes — the alternative is faster bad hires)
- Budget: $8k for a senior IC outreach copy audit by an external practitioner. Investment, not OpEx
- Hiring-manager engagement: VP Eng to attend the Q2 calibration workshop. Modeling matters here

---

Things to verify before sending:
- Pass-through rate calculations match Greenhouse export (Sarah K. to confirm before publish)
- The 60% audit sample is statistically meaningful — call out small-numbers caveat in the slide if presented live
- Pipeline diversity numbers don't make claims they can't support — one-quarter movement is directional only

Inclusive-language audit: passed (used "URM" cautiously, flagged small-numbers, no claims of trend from one quarter)
```

---

## 7. Hiring manager spotlight — short, 350 words

```
SUBJECT: How Maya Chen hires data engineers at Linden

Maya Chen runs Data Platform at Linden. She's hired 11 data engineers in the last 18 months — 6 senior, 3 staff, 2 mid. Her hire-to-pass-IC-track rate is unusually high for the function. We asked her what she's doing differently.

**What's the one signal you look for that other managers might miss?**

"Has this person ever debugged something at 3 AM where they didn't know the cause yet and had to figure it out while the system was bleeding. Not 'have they been on call' — anyone can be on call. Have they done the hard work of incident response. That's the line between data engineer and analytics-engineer-with-a-different-title."

**What do you screen out in the HM interview?**

"Two things. One — anyone who can't talk about a specific time they were wrong. Not abstractly. Specifically. Pipeline they designed that broke, decision they made that they'd undo. If someone's never been wrong on the record, I'm worried. Two — anyone who treats SQL as a fallback. SQL is the language of this team. If you don't write it like it's a first-class skill, this isn't your team."

**What have you changed about how you hire in the last year?**

"I stopped doing brainteasers. They were filtering on 'how comfortable are you in a high-pressure conversation with a stranger,' which is not what data engineers do. The new technical loop uses a pipeline-debugging exercise on anonymized real infra. Candidates can use Google. They can talk through it. We can see how they think when the answer isn't memorized."

**Are you hiring right now?**

"Senior Data Engineer, owning the new streaming layer. Kafka to internal consumers, ~25k events/sec, mostly greenfield. If you've debugged a Kafka consumer that was silently dropping messages in production, I want to talk to you."

📩 Reach Maya directly: maya@linden.com. Or hit the careers page for the formal application: linden.com/careers/data-platform

---

Things to verify before publishing:
- Maya's permission to publish the direct email (confirmed 2026-05-10, but double-check before LinkedIn)
- The 11-hires-in-18-months stat (confirm with TA records)
- The "high IC track pass rate" claim — qualify or remove if unverifiable
- Photo permission

Inclusive-language audit: passed (focused on concrete behaviors and observable signals; no proxy language)
```
