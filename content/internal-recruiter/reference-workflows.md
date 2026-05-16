# Reference Workflows — Internal Recruiter Pack

Real worked examples. Steal whichever ones map to your work. Names and companies are placeholders.

---

## 1. Hiring-manager intake notes (post-meeting writeup, HM sign-off)

```
INTAKE NOTES — Senior Backend Engineer (Platform) — Priya Rao — 2026-05-12

BUSINESS CONTEXT
Backfill for the engineer who left in March (joined a competitor, amicable). Platform team is 7 engineers (1 EM, 6 ICs) supporting all internal teams' infra needs. Without this role filled by July, the Q3 migration from monolith services to event-driven gets delayed — and that's the thing finance has asked us to deliver to support the new pricing model. So: real urgency, but the cost of a wrong hire is higher than the cost of an extra 3 weeks.

SCOPE
First 90 days:
- Onboard, shadow on-call, ship 2-3 medium-size changes to existing services
- Pair with Jordan (Staff Eng) on the event-bus design doc currently in flight
- Own one piece of the Q3 migration that's well-scoped by end of month 3

First 12 months:
- Own one of the four service domains end-to-end (likely Notifications or Webhooks)
- On-call rotation (1 week every 6 weeks)
- Mentor a mid-level joining in Q4
- Contribute to the platform roadmap planning for 2027

Reporting: into Priya Rao. Peers: 5 other senior+ ICs. No direct reports for first 12 months.

MUST-HAVES (observable behaviors, not keywords)
1. Has been on-call for a production system with paying customers and didn't quit. Specifically: can describe a 3 AM page where root cause wasn't obvious and walk through how they triaged
2. Has shipped or owned a backend service in production for 12+ months that they didn't write from scratch — knows the rhythm of inheriting and improving, not just greenfield
3. Has worked with at least one event-streaming system in production (Kafka, Kinesis, NATS, RabbitMQ — Kafka strongly preferred). Not a tutorial — production
4. Has worked across team boundaries: can name a specific time they negotiated an API contract with a consuming team and the tradeoffs involved
5. Comfortable in Go OR Java OR Kotlin (we're polyglot — primary stack is Go, but JVM experience transfers)
6. Has documented decisions in writing (design docs, ADRs, postmortems) that someone outside their immediate team has consumed

NICE-TO-HAVES
- Experience with event sourcing or CQRS at production scale
- Open-source contributions to relevant infra projects
- Has hired or interviewed for engineering roles before (helps mentorship trajectory)
- Has presented at meetups or internal tech talks
- Familiar with our specific stack (Go, gRPC, Kafka, Spanner, Kubernetes)

DEAL-BREAKERS
- No production on-call experience (even rotational). The job requires it; can't train it from zero
- Can't talk about a specific time they were wrong. Anyone who is publicly never wrong scares Priya
- "I prefer to work alone" patterns. The role lives in cross-team negotiation

COMP BAND
- Base: $180,000-$215,000 ([APPROVED by Marcus T., HRBP, 2026-05-11])
- Variable: 8% target bonus, paid annually based on company + individual perf
- Equity: 0.05% to 0.10% (RSUs), 4-year vest, 1-year cliff
- Sign-on: standard $5k for senior; up to $15k exception authority with HRBP
- Exception authority: recruiter can flex base +5%, sign-on to $15k; anything beyond goes to Marcus

SOURCING APPROACH
- Target companies: Stripe, Shopify, Datadog, Cloudflare, Confluent, Snowflake, Databricks (Tier 1); regional banks and telcos for the "rigor without the brand" pool (Tier 2)
- Channels: LinkedIn Recruiter (saved search "Platform-Sr-2026Q2"), Gem 3-message cadence, GitHub for the on-call-survivor signal, referrals (3 outstanding asks to current Platform team)
- Volume: 30 outreach per week, target 14%+ reply rate (challenging given recent layoff context — see brand assets below)
- Brand assets: Platform team landing page (refreshed last month), Priya's hiring manager spotlight (going live this week), the engineering blog post on the event-bus design (queue for tomorrow)

LOOP DESIGN
1. Recruiter screen with me (Sarah, 30 min) — comp + motivation + logistics + red flags
2. HM screen with Priya (45 min) — work, scope, what they'd own
3. Technical loop (3 sessions, 60 min each, can split across 2 days):
   - Pair-coding / code-walk-through with Jordan (Staff Eng) — language fluency, design instincts
   - System-design exercise with Asha (Senior Eng) — event-streaming-focused
   - On-call simulation with the on-call lead, Ben (mid-level engineer) — debugging under pressure, communication
4. Final with VP Eng (Lin, 45 min) — scope, growth, cross-functional fit
5. Offer call with me (and Priya if mutual)

Total candidate time: ~4 hours active interview + ~1 hour total of breaks/prep
Target end-to-end: 21-28 days from first contact to offer extended

SCORECARD
| Must-have | Loop step | Grader | Signal |
|---|---|---|---|
| On-call survivor | Recruiter screen + On-call sim with Ben | Sarah, Ben | Specific story; behavior under pressure |
| Owned inherited service | HM screen | Priya | Concrete examples; what they'd do differently |
| Event streaming in prod | System-design w/ Asha | Asha | Tradeoffs they articulate; not just keywords |
| Cross-team API contract | HM screen | Priya | Specific negotiation example |
| Go / Java / Kotlin | Pair w/ Jordan | Jordan | Code reading + writing fluency |
| Documented decisions | Take-home design doc review (45 min) | Asha | Quality of an ADR or design doc they wrote |

THE THING PRIYA DIDN'T SAY (recruiter writes from the meeting)
- This is the second senior-IC backfill on her team in 8 months. First one didn't work out (left for the competitor; she suspects bad fit, not bad person, but the team felt it). She's gun-shy about "good on paper" candidates and is going to over-weight the cultural-resilience signals
- She also half-said she wants someone who "won't be scared of Jordan." Jordan is brilliant, blunt, and a known intimidating panelist. Recruiter to coach candidates before the pair session
- Priya is taking pressure from VP Eng to fill this fast. She'll feel that pressure in week 4. Recruiter to keep her anchored on must-haves, not "is this good enough"

URGENCY
Real deadline: candidate started by July 15. Q3 migration kicks off Aug 1; new engineer needs 2 weeks runway.
What's driving it: finance Q3 plan depends on this work shipping.
Acceptable trade-offs: 3-week slip OK if it means the right hire. Worse trade-off: rushing into a no-fit.

HM SIGN-OFF: Priya R. — agreed by email 2026-05-12 (kept in Greenhouse req notes)
RECRUITER CHECK-IN CADENCE: weekly Mondays, 15 min

---

Things to verify before sending to Priya for sign-off:
- The "second backfill in 8 months" detail — confirm with Priya it's OK to keep in writing
- The "Jordan is intimidating" framing — Priya said this verbally; reword if she'd rather it not be in writing
- Comp band approval email from Marcus (forward to req file)
- The sourcing channels list — confirm Priya is OK with the brand assets being attached (she may want to redact the hiring-manager spotlight if she's not ready for the visibility)

Inclusive-language audit: passed (must-haves are all observable behaviors, no protected-class proxies, sourcing approach widens rather than narrows)
```

---

## 2. JD calibration — before and after, with inclusive-language audit

```
JD CALIBRATION — Senior Backend Engineer (Platform) — 2026-05-13

ORIGINAL DRAFT (Priya's version)

About the Role
We're looking for a rockstar Senior Backend Engineer to join our Platform team. You will be responsible for driving impact across our infrastructure and working on cutting-edge distributed systems problems in a fast-paced, dynamic environment.

Requirements
- Bachelor's degree in Computer Science or related field required
- 5+ years of backend engineering experience
- Strong proficiency in Go, Java, or Kotlin
- Experience with Kafka, Kinesis, or similar streaming systems
- Excellent communication skills
- Self-starter who can hit the ground running
- Culture fit with our team
- Native English speaker preferred

Nice to Have
- MS or PhD in CS
- Experience at a top-tier tech company
- Open source contributions

---

CALIBRATED VERSION

About the Role
We're hiring a Senior Backend Engineer on the Platform team — the 7-person group that supports every other engineering team at [Company] with infra, services, and shared tooling. You'd own one of our four service domains (likely Notifications or Webhooks) end-to-end, contribute to the in-flight migration to event-driven architecture, and join the on-call rotation (1 week every 6 weeks). Reports to Priya Rao, Director of Engineering.

Comp: $180,000-$215,000 base + 0.05-0.10% equity + standard benefits. Sign-on bonus available.

Location: Fully remote in US. Quarterly team offsite (3 nights, travel covered).

What you'd own in the first 12 months
- One of four service domains, end-to-end ownership including roadmap input
- Part of the Q3-Q4 migration to event-driven architecture (Kafka)
- On-call rotation for our 24/7 production systems
- Mentorship of a mid-level engineer joining in Q4

What we're looking for (must-have)
- Experience being on-call for production systems with paying customers — you can describe a specific incident where root cause wasn't obvious
- Inherited and improved a backend service in production for 12+ months (not just greenfield)
- Production experience with an event-streaming system (Kafka, Kinesis, NATS, RabbitMQ); Kafka strongly preferred
- Worked across team boundaries to negotiate an API contract with consuming teams — can describe a specific tradeoff
- Fluency in Go, Java, or Kotlin (Go is our primary stack; JVM experience transfers)
- Documented technical decisions in writing (design docs, ADRs, postmortems) read by people outside your immediate team

Nice to have
- Event sourcing or CQRS at production scale
- Open-source contributions to infra projects
- Have hired or interviewed for engineering roles
- Have presented at meetups or internal tech talks

Hiring loop (~3-4 weeks end-to-end)
1. Recruiter screen (30 min) — Sarah Klein
2. Hiring manager screen (45 min) — Priya Rao
3. Technical loop (3 sessions, can split across 2 days): pair-coding, system design, on-call simulation
4. Final with VP Eng (45 min) — Lin Park
5. Offer

We don't do brainteasers. We don't whiteboard algorithms. The technical loop uses real (anonymized) work you'd encounter on the team.

What we don't do well yet
Our internal documentation. We're working on it — but you'd inherit a service domain with documentation that's better in some places than others.

Apply at [link] or hit me direct: sarah@[company].com

---

CHANGES + RATIONALE
1. "Rockstar Senior Backend Engineer" → "Senior Backend Engineer" | Reason: "Rockstar" is coded language, flagged in inclusive audit. Title cleaned.
2. "driving impact across our infrastructure" → specific scope (4 service domains, migration, on-call) | Reason: vague phrasing replaced with the actual scope from intake.
3. "fast-paced, dynamic environment" → cut | Reason: empty phrase. Replace with concrete role facts (remote posture, team size, on-call cadence).
4. "Bachelor's degree in CS required" → cut from must-have list | Reason: education gatekeeping not tied to a real must-have. Inclusive audit flagged.
5. "5+ years of backend engineering experience" → cut, replaced with observable behaviors from intake | Reason: years-of-experience gatekeeping is bias-adjacent and weaker than behavior-based criteria.
6. "Excellent communication skills" → cut, replaced with "documented technical decisions in writing read by people outside your team" | Reason: vague filler replaced with observable behavior.
7. "Self-starter who can hit the ground running" → cut | Reason: filler language. Replaced with specific 90-day scope (covered above).
8. "Culture fit with our team" → cut | Reason: "Culture fit" without behavioral criteria is discrimination risk. Replaced with the specific behaviors must-have line covers.
9. "Native English speaker preferred" → cut | Reason: ILLEGAL in most jurisdictions; always a deal-breaker in inclusive audit. The role requires professional fluency, which the work itself will demonstrate.
10. "MS or PhD in CS" → cut from nice-to-have | Reason: education gatekeeping again. The "open-source contributions" item stays.
11. "Experience at a top-tier tech company" → cut from nice-to-have | Reason: brand gatekeeping. Talent exists at all tiers.
12. Added: comp band, remote posture, on-call cadence, "what we don't do well yet" | Reason: candidate-respecting transparency; pay-transparency law (CA, NY, CO, WA, IL, MD) requires the band anyway.
13. Added: explicit loop with timing and "what we don't do" (brainteasers, whiteboard) | Reason: candidates want this. Standard in modern JDs.

INCLUSIVE-LANGUAGE AUDIT
Flagged and rewrote:
- "Rockstar" (coded) → removed
- "Native English speaker" (illegal national-origin proxy) → removed
- "Self-starter who can hit the ground running" (filler) → removed
- "Culture fit" (discrimination risk without behavioral criteria) → removed
- "Bachelor's degree required" (education gatekeeping) → removed
- "5+ years" (years-gatekeeping) → replaced with behavior-based criteria
- "Top-tier tech company" (brand gatekeeping) → removed
- "Excellent communication skills" (vague filler) → replaced with observable behavior

COMP BAND DISCLOSED: yes (NYC HQ + remote-US; pay-transparency applies in NY, CA, CO, WA among others)

REQUIRED REVIEW BEFORE POSTING
- HRBP (Marcus T.): comp band line + benefits one-liner | Send for review by 2026-05-14
- Legal: scope/non-compete language nonexistent in this version — OK to skip unless legal wants final review | Send notice 2026-05-14
- HM final approval (Priya R.): full JD | Send by 2026-05-14 EOD

---

Things to verify before posting:
- "What we don't do well yet" — Priya may want this softened or removed. Push back if she wants it removed entirely; recommend keeping with a softer adjective if needed
- Loop timing on "3-4 weeks" — confirm panel availability supports this; otherwise adjust to "3-5 weeks"
- The "we don't do brainteasers" line — confirm Priya stands behind it (some HMs hedge later)
- Direct-contact line (sarah@) — confirm comfortable with inbound DMs from candidates

Inclusive-language audit: passed (8 flags caught and rewritten — log in calibration tracker)
Comp band confirmed approved: yes (Marcus T., 2026-05-11)
HRBP/legal review needed before send: HRBP (comp + benefits line), HM (full)
```

---

## 3. Five-stage candidate communication sequence

Context: Senior Backend Engineer search above. Candidate is Maya Patel, sourced via LinkedIn outreach, replied positive.

### Stage 1 — Screen confirmation

```
Subject: Looking forward to Friday — Senior Backend Eng @ [Company]

Hi Maya,

Confirmed for Friday May 17, 11am PT (your tz?). 30 minutes, Zoom link in the calendar invite.

Here's what we'll cover:
- Your work in your own words
- The role specifics — Platform team, Q3 migration, on-call cadence
- Comp expectations vs our band (so we don't waste each other's time later)
- Anything you want to ask me about [Company] or the loop

If 11am PT doesn't work, hit me with two windows that do and I'll re-book.

— Sarah
Sarah Klein | TA at [Company]
```

### Stage 2 — Post-screen (positive, moving forward)

```
Subject: [Company] — moving forward to HM screen

Hi Maya,

Good conversation. I'd like to move you to the next step — a 45-min screen with Priya Rao, Director of Engineering and the hiring manager for this role.

Priya is the person you'd report to. She came up through Platform herself (former Staff Eng at Datadog), so the conversation will be more technical than a typical HM screen. She'll want to hear about the on-call story you told me and how you think about inheriting services.

LinkedIn: linkedin.com/in/priyarao
Her recent blog post on platform-team-as-customer: [link]

I have her availability open next Wednesday (May 22) 10-11am PT, Thursday (May 23) 1-2pm PT, or Friday (May 24) 9-10am PT. Reply with what works and I'll send the invite.

Two things from the conversation I want to flag back to you so we're aligned:
- Comp: our band is $180-215k base + 0.05-0.10% equity. You mentioned target is $200k base — that's well in band, no concerns
- Timing: you're at 4 weeks notice. Our target start date is July 15, so that works

Talk soon.

— Sarah
```

### Stage 3 — Onsite scheduling

```
Subject: [Company] — Final loop, scheduling

Hi Maya,

Priya gave a strong signal — let's get the full technical loop scheduled.

Format: remote, 4 hours total (3 hours interview + 1 hour break / prep time), can split across two days if easier for you. We don't do brainteasers or whiteboard algorithms — every session is real work.

The panel:
1. Jordan Hayes — Staff Engineer, your would-be senior peer on Platform. 60 min pair-coding / code-walk-through. Jordan is direct and asks "why" a lot — that's how she works, not a sign she's unhappy. linkedin.com/in/jordanhayes
2. Asha Patel (no relation 🙂) — Senior Engineer on Platform, system-design session focused on event streaming. 60 min. linkedin.com/in/ashap
3. Ben Lin — Senior Engineer, on-call rotation lead. On-call simulation — a real (anonymized) incident from last year, work through how you'd triage. 60 min. linkedin.com/in/benlin
4. Final with Lin Park, VP Eng — 45 min, scope and cross-functional fit. linkedin.com/in/linpark

Slots open for the technical loop:
- Tuesday May 28, 10am-2pm PT (single block with 1-hour break)
- Wednesday May 29 morning + Thursday May 30 morning (split)
- Friday May 31 morning + following Monday June 3 morning

Final with Lin will be the day after the technical loop concludes.

Tell me which window works and I'll lock the calendar invites + send you a one-pager prep doc by end of week (mostly logistics — no take-home prep needed).

— Sarah
```

### Stage 4 — Post-onsite (during debrief window)

```
Subject: [Company] — debriefing tomorrow

Hi Maya,

Wrapped your final with Lin earlier today. Thanks for the long week.

We're debriefing tomorrow (Friday) at 10am PT. I'll have a decision communicated to you by Friday 4pm PT at the latest. If it slips into Monday (unlikely but possible if a panelist is delayed), you'll hear from me by 10am Monday morning either way — no radio silence.

Whatever the outcome, I'll call. Not email-only.

— Sarah
```

### Stage 5 — Offer extension (phone call script + written follow-up)

Phone call (this is the script the recruiter would use):

```
"Hi Maya — Sarah from [Company]. I have an offer for you. Got a few minutes?

[pause for her to confirm]

The team loved the loop. Priya, Jordan, Asha, Ben, Lin — unanimous strong-hire. Specific feedback: the on-call simulation with Ben was the strongest piece they've seen in this loop. Jordan said your code walk-through changed her opinion on one of the migration design decisions we'd been debating internally.

So — the offer. Base $205,000, sign-on $12,000, equity 0.07% which works out to about $X in RSUs at the current valuation vesting 4 years with a 1-year cliff. 8% target bonus paid annually. Standard benefits. Start date July 15.

That's $205k base, $12k sign-on, 0.07% equity, $X RSU value, $16,400 target bonus. Year 1 cash $217k, total comp roughly $X all-in.

I'm sending the written offer in about an hour via DocuSign. Take 5-7 business days. Talk to your partner, talk to anyone you need to talk to. No pressure on response time, but I want to be honest with you about one thing: counter-offers from current employers are common at this point. I want to flag now so we're aligned later — you didn't start this conversation about money. You said it was about scope and the migration work and Priya specifically. When the counter comes, let's talk it through. I'm not going to pressure you. I just want you making the decision you actually want.

Questions?"
```

Written offer follow-up email (1 hour after the call):

```
Subject: Offer — Senior Backend Engineer @ [Company]

Hi Maya,

Per the call — sending the written offer.

Summary:
- Base salary: $205,000
- Sign-on bonus: $12,000 (paid in first paycheck)
- Equity: 0.07% (X RSUs, 4-year vest with 1-year cliff)
- Target bonus: 8% of base ($16,400 at target, paid annually)
- Start date: July 15, 2026
- Benefits: [link to one-pager]
- Reports to: Priya Rao, Director of Engineering

DocuSign packet incoming separately from [legal contact].

Decision window: 5-7 business days. Let's plan to talk Friday May 31 by end of day either way.

— Sarah
```

---

Things to verify before any of these go:
- Maya's timezone (assumed PT)
- Calendar slot availability for the panel members (lock before sending Stage 3)
- Comp numbers in Stage 5 confirmed by HRBP, finance, and offer letter from legal
- DocuSign packet content reviewed by Maya's HRBP partner
- The "$X RSU value" computation — use the latest 409A valuation

Inclusive-language audit: passed (each message is candidate-specific, no proxy language, no form-letter feel)
Comp band confirmed approved: yes (Marcus T., 2026-05-11; offer details cross-checked with finance on 2026-05-30)
HRBP/legal review needed before send: legal review of the written-offer DocuSign packet (separate workflow)

---

## 4. Three rejection emails

### Post-screen rejection (short, warm)

```
Subject: Senior Backend Engineer @ [Company] — update

Hi James,

Thanks for the time today. After our conversation, I'm not going to move you forward to the hiring manager screen.

The specific gap: we calibrated on production on-call experience with paying customers, and the on-call rotations you described were at the staging level rather than full prod. That's a real distinction for this seat — most of what this engineer does is the 3 AM judgment work — and it's the central must-have on our scorecard.

For a different platform role at a similar stage company, the work you described is right in the zone. If something opens up here in the future where prod on-call isn't the central need, I'll reach out.

Thanks again — and good luck with the search.

— Sarah
```

### Post-onsite rejection (more substantive)

```
Subject: [Company] — decision on the loop

Hi Lara,

Thanks for the full loop yesterday. After the panel debrief, we've decided not to extend an offer. I want to give you the real reason rather than a form letter.

The panel was positive on your code work with Jordan and your communication style with Ben in the on-call sim. The gap was in the system-design session with Asha: we calibrated on production experience with event-streaming systems (Kafka or equivalent) at scale, and the design you walked through was at smaller volume than what this role would face on day 1. Asha and Priya both wanted the offer; Lin (VP Eng) and Ben felt the gap was too central for the seat.

This is a calibration mismatch, not a rejection of you. If a different role opens at [Company] where the scale isn't the central need — for example, a developer-facing infra role — I'll reach out specifically.

I know this is the part of the loop that doesn't get easier. Thanks for trusting us with the time.

— Sarah
```

### No-offer-after-debate rejection

```
Subject: [Company] — decision

Hi Dev,

A tough one. Thanks for the loop this week.

After a long debrief — genuinely long, I want to be honest with you — we decided not to extend an offer for this seat.

The panel was split: two strong-hires (Jordan and Asha), one strong-no-hire (Ben), one lean-no-hire (Lin). When the panel is that divided, our practice is to wait for higher confidence rather than push through.

The specific thing the no-hires raised: the way you described handling a 3 AM page where root cause wasn't obvious. Two of them felt the framing was more reactive than they wanted at the senior level — that you'd default to escalating rather than driving the triage yourself. The strong-hires saw it differently — that you described the call as a judgment under uncertainty, which is exactly the work.

I share this because it's the kind of feedback I'd want if I were on the other side. Not a final verdict on your work — a calibration call from this panel on this seat.

I'd like to keep in touch. If a role opens in the next 6-12 months where the cultural-resilience signal weighs less central, I'll reach out specifically.

Thanks for the trust this week.

— Sarah
```

---

Things to verify before sending any rejection:
- Specific feedback aligns with what the panel actually said (cross-check with debrief notes in Greenhouse)
- The candidate-specific framing doesn't accidentally code as protected-class commentary
- Door-state language (open / closed) matches what the team genuinely intends — don't write "we'll be in touch" if you won't be
- If a candidate has been particularly invested (long loop, took time off work), consider a 5-min follow-up call rather than email-only

Inclusive-language audit: passed (each rejection focuses on observable behavior and calibration against must-haves; no protected-class proxies)

---

## 5. Debrief facilitation notes — example flow

```
DEBRIEF — Maya Patel — Senior Backend Engineer (Platform) — 2026-05-31

PANELISTS PRESENT
- Priya Rao (HM)
- Jordan Hayes (Staff Eng — pair-coding)
- Asha Patel (Senior Eng — system design)
- Ben Lin (Senior Eng — on-call sim)
- Lin Park (VP Eng — final)
- Sarah Klein (recruiter, facilitating)

RESET (Sarah, 2 min)
"At intake we calibrated on six must-haves. Today we're grading against them, not gut. Order: Jordan first since you led the pair, then Asha, Ben, Lin, Priya last."

ROUND-ROBIN

JORDAN — pair-coding session
- Must-have: Go/Java/Kotlin fluency. GRADE: strong. Specific: refactored an existing service's retry logic during the pair without prompting; caught two edge cases I hadn't pointed out
- Must-have: documented decisions. GRADE: strong. The ADR she walked through was clean and tied to a real production decision at her current company
- Vote: STRONG HIRE
- Note: changed my view on the migration discussion we've been having — she made the case for backpressure handling I'd been arguing against

ASHA — system design (event streaming focused)
- Must-have: event-streaming production experience. GRADE: hire. Specific: walked through a Kafka rebalancing issue she'd debugged in prod with concrete consumer-group dynamics
- Must-have: cross-team API contracts. GRADE: strong hire. Specific example of negotiating partition strategy with a downstream team
- Vote: STRONG HIRE

BEN — on-call simulation
- Must-have: on-call survivor. GRADE: strong hire. Specific: when I gave her the anonymized incident from last year's payment-system blip, she immediately asked the right diagnostic question (what's the partition key) and worked through it without panicking. She acknowledged the moment she got stuck and pivoted
- Must-have: behavior under pressure. GRADE: strong. Calm, asked for help when appropriate, didn't pretend to know what she didn't
- Vote: STRONG HIRE

LIN — final (scope, cross-functional)
- Must-have: owns inherited service for 12+ months. GRADE: hire. Talked about taking over the rates-limiting service at her current company and the rebuild she did
- Cross-functional: thinks of the work as a product, not just code. Strong signal
- Vote: HIRE (one notch below strong)
- Note: I don't see a stretch in the next 12 months. The role is right for her now; the question is whether we keep her at year 3

PRIYA — HM screen + summative
- Must-have: backfill resilience. GRADE: strong. Specifically asked about the engineer-who-left context; her response was direct and didn't tank our brand back to her
- Vote: STRONG HIRE
- HM CALL: hire. "She's not just good — she's specifically good in the way we need this seat. Make the offer."

GAP DISCUSSION
The only delta: Lin's "hire" vs everyone else's "strong hire." Discussed.
- Lin's concern about the year-3 retention is a real point but not a hire-blocker. We agreed to surface this as part of her 6-month conversation about scope progression, not as a reason not to hire

ACTIONS
- Offer prep with Marcus (HRBP) and finance: tomorrow, June 1 (Sarah)
- Offer extended: Wednesday June 3 (Sarah, with Priya joining the call)
- Loop status update to other in-process candidates: today (Sarah)
- One-page "what we hired for and why" writeup for the team's next planning meeting: by June 15 (Priya)

NO-GO FEEDBACK CONSOLIDATION
Not applicable — hire decision.

---

Things to verify before sending offer prep:
- Lin's "year-3 retention" concern should be raised with Maya at the offer call, framed as "let's talk about scope progression" — not used against her
- Confirm Priya is on the offer call (she said yes in real-time but confirm)
- Comp prep to draw on the offer-prep template, including the counter-offer prep paragraph

Inclusive-language audit: passed (panel grading is anchored on observable behavior against calibrated must-haves; no proxy language)
Comp band confirmed approved: yes
HRBP/legal review needed: offer-prep doc to Marcus tomorrow
```

---

## 6. Counter-offer playbook (when the candidate's current employer counters)

Scenario: Maya verbally accepted the $205k base offer. Three days later she emails: "Hi Sarah — wanted to flag that [current company] came back with a $235k base counter plus accelerated equity. I'm in a tough spot. Can we talk?"

### The recruiter's response (within 4 hours, by phone if possible)

```
Phone script:

"Hi Maya — thanks for telling me right away. I knew this was probably coming and I want to be honest with you through it.

A few things, in order:

First — the fact that they came back at $235k tells you what they value. Glad they did that, because it confirms what we already thought, which is that you're worth that comp on the market.

Second — money is real, but it's not the only thing on the table. When we first talked, you said three things you wanted next: the platform-team-as-customer model Priya built, the migration work, and getting out from under the senior-IC ceiling at your current company. That counter doesn't change any of those.

Third — let me check what flexibility we have. I'm not promising anything. I want to talk to Marcus (HRBP) and Priya specifically and come back to you tomorrow with an honest answer. The band is $180-215k base, so $235k is outside band. We may have exception authority for part of the gap. We may not. I'll be straight with you either way.

Fourth — your current company would have offered this counter 6 months ago if they'd valued you at $235k. They're offering now because losing you is the problem. I'd weight that.

Take 24 hours. Talk to whoever you talk to about this stuff. We'll talk tomorrow at 11am PT and I'll have the comp answer plus anything else you want to walk through."

---

After the call (recruiter to HRBP):

Subject: Counter-offer scenario — Maya Patel — Senior Backend

Marcus —

Maya got a $235k counter from [current company] plus accelerated equity. We're at $205k. She wants to talk tomorrow.

What I'm asking:
1. Do we have exception authority above the $215k band ceiling? Specifically — could we go to $220k base and add $5k sign-on, putting Year-1 cash at $237k (close to her counter Year-1)? That's a stretch but not crazy
2. If yes, who else needs to sign off (you alone or VP Eng + finance too)?
3. If no, what's the messaging — do we walk?

I've coached her on the non-comp reasons (scope, migration, Priya, ceiling). My read: she'll stay at $220k + $5k sign-on. At $215k she's 50/50. Below that, she takes the counter.

What's possible by tomorrow at 10am?

— Sarah
```

### Three scenarios from there

**HRBP approves the flex:** call Maya back at 11am with the new number, frame it as honest exception-authority flex (not a panic adjustment), give her another 5-7 days to decide.

**HRBP holds the band firm:** call Maya back at 11am, name it: "We can't move above $215k. I want to be straight with you instead of dragging this out. The non-comp reasons we talked about are real. The comp gap is also real. This is your call." Leave the offer open, don't pressure.

**HRBP and recruiter agree to walk:** call Maya back, acknowledge the counter is the right move for her at this moment, leave the door open ("if 6 months from now things feel different, I want to hear about it").

---

Things to verify before any of these:
- Exception authority limits (don't promise what you can't deliver)
- VP Eng / finance sign-off on any flex above HRBP authority
- The "non-comp reasons" framing aligns with what Maya actually said at intake (don't put words in her mouth)

Inclusive-language audit: passed
Comp band confirmed approved: yes (counter-offer scenario, working with HRBP for exception authority)
HRBP/legal review needed: exception authority approval before counter-call (urgent)
```
