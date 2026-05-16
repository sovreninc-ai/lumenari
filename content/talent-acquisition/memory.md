# Memory — Talent Acquisition Pack

## Domain context

A Talent Acquisition Specialist builds the pipeline that other recruiters close from. The job is upstream of req-closing: market mapping, passive sourcing, candidate marketing, employer-brand content, event presence, and the pipeline-health story that gets presented to leadership monthly. At a 200-person company there's usually one TA specialist for every 4-6 closing recruiters; at a 2,000-person company, TA is a function with sourcers, brand specialists, and a programs lead. The user is somewhere on that spectrum.

The work is rhythm-based. Mornings are sourcing pulls — LinkedIn Recruiter, Gem, hireEZ, SeekOut, sometimes GitHub for engineering, Behance for design, Lattice / 15Five-style talent communities for senior people. Mid-day is outreach in batches of 30-60 messages, written carefully because reply rates on cold outreach to senior ICs are 8-15% on a good week and you're competing with 40 other recruiters who are also messaging the same people. Afternoons are pipeline reviews with closing recruiters, market-mapping new functions, and producing employer-brand content. Evenings are sometimes the candidate-facing landing pages, the LinkedIn posts, and the next-quarter sourcing strategy doc.

The job has two sets of customers: candidates (who deserve outreach that doesn't waste their time) and hiring managers (who want pipeline yesterday, the right pipeline, and zero hires that fall apart in onboarding). The recruiter sits between them and gets blamed by both when something breaks.

Success looks like: when a req opens, there's already a warm slate of 8-12 candidates the recruiter has been talking to for months. Time-to-fill drops. Source-of-hire mix shifts away from expensive agency to lower-cost passive sourcing and referrals. Employer-brand engagement on LinkedIn grows. Diversity-of-pipeline metrics move in the right direction.

Failure looks like: every req is a from-scratch search; agency spend balloons; senior ICs ghost outreach; hiring managers complain that the pipeline is shallow and the candidates aren't strong; pipeline-diversity metrics flat-line.

## Vocabulary the AI should know

- **TA** — Talent Acquisition (often distinct from Recruiting org structure-wise; TA usually owns sourcing/brand/programs, Recruiting closes reqs)
- **Sourcer** — TA specialist focused primarily on building pipeline (vs closing). Sometimes a dedicated role, sometimes a hat
- **Req / requisition** — an open headcount with an approved JD, comp band, and hiring manager assigned
- **Backfill** — replacing someone who left vs. expansion (net-new headcount)
- **Slate** — the set of candidates being actively considered for a req (typically 3-6 at the onsite stage)
- **Pipeline** — the broader pool being talked to, warmed up, or kept in touch with — not in active consideration yet
- **Talent map / market map** — a written analysis of where a target population lives (which companies, which titles, what comp, what's pulling them around)
- **ICP** — Ideal Candidate Profile. Borrowed from sales — the picture of who you want
- **Outreach** — cold messages to passive candidates. InMail (LinkedIn paid), email, X DM, sometimes phone
- **Reply rate** — % of outreach that gets any response. 8-15% for senior ICs is realistic; 20%+ is a great campaign
- **Pass-through rate** — % of candidates who advance from one stage to the next (e.g., 60% pass recruiter screen → HM screen)
- **Source-of-hire** — where your hires actually came from. Categories: passive sourced, inbound applicant, referral, agency, rehire, internal
- **Time-to-fill** — days from req-open to offer-accepted. Industry average is 36-50 depending on role and seniority
- **Time-to-source** — days from req-open to first qualified candidate in process
- **Employer brand** — what people think working at your company is like, whether you've shaped it or not
- **Career site / careers page** — your public-facing jobs listing
- **Candidate-facing landing page** — a per-role or per-function page candidates land on before/after outreach. Usually higher-effort than a JD on the careers page
- **EVP** — Employer Value Proposition. The actual reasons someone would want to work here, distilled
- **ATS** — Applicant Tracking System (Greenhouse, Lever, Ashby, Workday Recruiting, JobVite, iCIMS)
- **CRM** — Candidate Relationship Management (Gem, Beamery, hireEZ, Phenom). Where passive pipeline lives
- **LinkedIn Recruiter / RPS** — paid LinkedIn product for sourcing
- **Gem** — recruiting CRM + sourcing tool, big with TA teams. Outreach sequences, analytics, talent pools
- **hireEZ / SeekOut** — sourcing platforms that pull from beyond LinkedIn (GitHub, conference attendee lists, public web)
- **Paradox** — conversational AI / scheduling automation, often used at scale (e.g., McDonald's)
- **Boolean** — search string syntax with AND, OR, NOT, quotes, parens. LinkedIn Recruiter uses a variant; X-ray Google search uses standard Boolean
- **X-ray search** — Googling site:linkedin.com/in to find profiles without LinkedIn Recruiter
- **Open to work / OTW** — LinkedIn signal that someone's looking. Not a guarantee of interest in your role
- **Passive candidate** — someone not actively looking but open to the right thing. Most senior ICs are here
- **Active candidate** — someone applying / looking now
- **Referral** — candidate introduced by an employee. Typically highest hire rate, lowest cost-per-hire
- **Pipeline health** — the aggregate metric set that says whether sourcing is keeping up with demand
- **Diversity sourcing** — intentional outreach to widen the top of funnel. The work is widening the pool, NOT excluding people from outreach based on demographics (illegal)

## Common workflows

- **New function market map**: function leader gives heads-up that they'll need to hire (e.g., "we need 3 senior data engineers in Q3"). TA builds a market map: who's currently at peer companies (Snowflake, Databricks, Stripe, Shopify, etc.), what comp they're paying, who's quietly hiring the same profile, what the candidate landscape looks like. Then ICP, then sourcing plan, then first outreach batch. 4-8 weeks before req opens.
- **Boolean string build**: TA gets a role, builds a target title list, builds a skill keyword list, builds an exclusion list, runs the string in LinkedIn Recruiter or hireEZ, tunes for 200-500 results that are mostly right. Saves the project. Re-tunes as outreach feedback comes in ("the people I'm reaching are too junior — tighten title list").
- **Outreach cadence**: first message (3 sentences max, one specific reason), follow-up 5-7 days later (different angle, same person), final 10-14 days after that (soft close, "open to a quick call when timing's better?"). Then move on. Some tools auto-cadence (Gem, Beamery); manual still works.
- **Candidate-facing landing page**: function leader and TA collaborate on a page that lives at company.com/careers/[function]. Covers what the team does, why it exists, what the work looks like day-to-day, who's already there (named), recent ships, what they're hiring for. Updated quarterly.
- **Employer-brand piece**: "Life at X" story about a team or person, posted on LinkedIn + the careers blog. Or "Hiring manager spotlight" — interview with an engineering manager about how they hire, what they care about. Or "Why we hire here" narrative from a senior IC on what made them join and stay.
- **Pipeline-health update**: monthly or quarterly deck/doc for VP People or Head of TA. Time-to-fill trend, source-of-hire trend, pipeline diversity trend, where the funnel is breaking, what TA is doing about it.
- **Event presence**: campus recruiting trip, conference sponsorship, meetup, internal hosted event. TA produces event copy, landing page, follow-up sequence for everyone who showed up.

## What to avoid / common mistakes

- **Outreach that personalizes from the public profile and nothing else**. "I saw you work at [company]." Yes, everyone can see that. Real personalization is something they couldn't have guessed you'd notice (a talk they gave, a repo they maintain, a blog post that's 18 months old)
- **Boolean strings that are too tight**. 12 results when 200 would have been right. The kit's default is "start wider, tighten with feedback"
- **Boolean strings that exclude protected classes** — illegal and immoral. The kit refuses
- **Comp ranges in outreach when the band isn't approved**. The recruiter can't unsay it. Pay-transparency states (CA, CO, NY, WA, IL, MD, others) require posted ranges anyway — get it approved first
- **Source-of-hire claims you can't substantiate**. ATS tagging is messy. If your source-of-hire data is unreliable, say so, then fix the tagging
- **Pipeline-diversity reporting that treats one quarter as a trend**. Diversity metrics move on quarters-to-years timeframes. One bad month means almost nothing
- **"Cultural fit" as a screening criterion**. Replace with concrete behavioral expectations
- **Hiring-manager spotlights that read like a press release**. Real people, real specifics, or don't publish it
- **Career site copy that lies about remote posture**. "Remote-first" with required quarterly travel is fine. "Remote-first" with a return-to-office mandate landing next quarter is a brand kill
- **Outreach to current employees of a company you have a no-poach with**. The recruiter is supposed to know this. The AI doesn't — flag and ask

## Tone / register

A real practitioner sounds confident, slightly tired, specific. They name tools. They name companies. They know what 8% reply rate on senior IC outreach feels like. They don't oversell the role. They acknowledge that candidates have options. They write LinkedIn posts that sound like a person, not a brand. They produce pipeline-health updates that surface what's broken instead of hiding it. They never use "synergistic," "best-in-class," or "world-class talent." They never end a candidate landing page with "Come change the world with us." They say "Here's what the work looks like. Here's who's on the team. Here's what you'd own. 15 min if you're curious." That's the voice.
