# Pipeline Metrics — Talent Acquisition Pack

What to track, how to define it, how to present it without lying. For pipeline-health updates to a VP People, Head of TA, or hiring leadership.

---

## The core metric set

Six metrics. Track all of them. Present them with comparison, never alone.

### 1. Time-to-fill

**Definition:** Calendar days from req-open (approved, JD live, comp band locked) to offer-accepted.

**Why it matters:** Composite signal of sourcing speed, loop speed, hiring-manager engagement, and offer cleanliness.

**Industry benchmarks (2025-2026, knowledge worker roles):**
- Senior IC engineering: 36-50 days
- Manager engineering: 45-65 days
- Product manager senior: 40-55 days
- Sales (enterprise AE): 30-45 days
- Customer-facing roles (CSM, support manager): 30-45 days
- Executive (Director+): 60-120 days

**What kills the number:**
- Slow hiring loop scheduling (panel availability)
- Hiring manager unresponsive after onsite
- Comp negotiations dragging without movement
- Background check / reference check delays at the offer stage

**What to NOT do:**
- Don't report median without showing distribution. P50 vs P75 vs P90 tells a much better story
- Don't compare apples-to-oranges across role families. Engineering Director ≠ Marketing Coordinator
- Don't ascribe a trend from one month of data

### 2. Time-to-source

**Definition:** Calendar days from req-open to first qualified candidate in process (typically at recruiter-screen-scheduled stage).

**Why it matters:** Cleaner signal than time-to-fill for whether sourcing is the bottleneck.

**What good looks like:** Under 14 days for known role families with warm pipeline. Under 21 for new functions.

**What kills the number:**
- No warm pipeline at req-open (no market mapping ahead of need)
- Weak Boolean / wrong target list
- Low reply rate on outreach
- Hiring manager calibration is wrong — recruiter screens fail because the bar wasn't set

### 3. Source-of-hire mix

**Definition:** % of hires by source. Categories must be mutually exclusive and standardized in the ATS.

**Standard categories:**
- **Passive sourced** — outreach by recruiter or sourcer led to the hire
- **Referral** — submitted via employee referral program
- **Inbound applicant** — applied via careers site or job board
- **Agency** — placed by external recruiting agency
- **Rehire** — previous employee returning
- **Internal** — internal transfer or promotion

**Why it matters:** Tells you where pipeline actually comes from and where you're over- or under-investing.

**What healthy mix looks like (varies wildly by company stage):**
- Mature SaaS: 35-50% passive sourced, 25-35% referral, 15-25% inbound, 5-15% agency
- Early-stage startup: 25-40% referral, 30-40% passive, 20-30% inbound, agency variable
- Enterprise / regulated industry: more inbound + agency, less passive

**What to NOT claim:** Don't report source-of-hire if your ATS tagging is sloppy. Garbage in, garbage out. Audit tagging quarterly.

### 4. Pass-through rates by stage

**Definition:** % of candidates who advance from one stage to the next.

**Standard stages:**
- Recruiter screen → HM screen
- HM screen → onsite/loop
- Onsite → offer extended
- Offer extended → offer accepted

**Why it matters:** Shows you exactly where the funnel breaks.

**Diagnostic patterns:**
- **Low recruiter screen → HM screen:** recruiter calibration is loose; people getting through who shouldn't, or HM bar is too high for what comes through
- **Low HM screen → onsite:** HM has drifted from calibration; or onsite slot scheduling is killing it
- **Low onsite → offer:** the loop is finding real gaps; or the loop is over-indexed on a non-essential signal
- **Low offer → accept:** comp not competitive; brand problem; candidate experience broken in late stage

**What to NOT do:** Don't average pass-through across role families. An engineering loop has different physics than a sales loop.

### 5. Pipeline diversity

**Definition:** Representation at top of funnel (sourced + applied), mid funnel (in process), and outcomes (offers, hires).

**Track separately by:**
- Role family (engineering vs sales vs product etc.)
- Seniority band
- The protected-class dimension you're measuring (gender representation, URM representation if your company collects this with consent and legal review)

**Why it matters:** Pipeline diversity is the leading indicator. If 12% of your senior IC pipeline is women and 8% of your hires are women, the gap is in the funnel, not the sourcing.

**Critical caveats:**
- Self-identification only. Never infer demographic data from names or photos
- Some companies legally cannot collect this data in some jurisdictions — don't fabricate
- Small numbers are noisy. Don't draw a trend from 3 hires
- Pipeline diversity isn't a hiring quota. It's a top-of-funnel widening goal
- Always report with statistical caveats ("small sample," "directional only")

**What to NOT do:**
- Don't use this metric as a quota
- Don't infer demographics from anything other than self-report
- Don't compare your numbers to industry averages without acknowledging the limits of comparison
- Don't blame the hiring manager for outcomes from a pipeline they didn't get to choose

### 6. Reply rate on outreach

**Definition:** % of outreach messages that get any response (positive, negative, "not now").

**Track by:**
- Recruiter (helps surface coaching needs)
- Role family
- Seniority
- Outreach campaign / template variant
- Channel (LinkedIn InMail vs email vs other)

**What good looks like:**
- Mid-level IC outreach: 18-28%
- Senior IC outreach: 12-20%
- Staff/Principal IC outreach: 8-15%
- Manager outreach: 15-22%
- Director+ outreach: 5-12%

**What kills the number:**
- Generic templates ("I came across your impressive background")
- Wrong target list (Boolean is too loose)
- Brand problems
- Bad timing (e.g., right after a competitor's funding round announcement, your message gets buried)
- No specific reason in the first sentence

---

## Metrics you should track that often go missing

### Candidate experience scores (post-loop survey)

Even a 4-question survey to every candidate who completed a loop (won or lost) yields signal. Net Promoter Score for hiring loops is a useful soft metric.

### Hiring manager satisfaction

Post-hire 90-day survey: "Did this hire match what we calibrated on at the start?" If 30% of HMs say no, your calibration process is broken.

### Time-in-stage variance

Same as time-to-fill, but broken down by stage. Surfaces specific bottlenecks (e.g., "we're losing 8 days on average between recruiter screen and HM screen — HM scheduling is the problem").

### Cost-per-hire by source

Total spend (agency fees, tool costs amortized, recruiter time-equivalent) divided by hires from each source. Tells you if your $80k Gem subscription is paying for itself.

---

## Reporting pipeline-health updates — the structure

For monthly or quarterly leadership updates, default to this shape:

```
PIPELINE HEALTH — [Period] — [Function or whole-company]

HEADLINE (one sentence)
The single most important thing about this period.

KEY METRICS (with prior-period and benchmark comparison)
- Time-to-fill: [X days, vs prior Y, vs benchmark Z]
- Time-to-source: [X days, vs prior]
- Source-of-hire mix: [%passive / %referral / %inbound / %agency / %internal] with prior comparison
- Pass-through by stage: [the 4 transition percentages, vs prior]
- Pipeline diversity (where measurement is reliable): [representation at funnel stages, trended]
- Reply rate on outreach: [by recruiter, by role family]

WHAT'S WORKING (2-3 specific wins, tied to actions taken)

WHERE THE FUNNEL IS BREAKING (2-3 specific breakdowns, with diagnosis)

WHAT WE'RE DOING ABOUT IT (specific actions, owners, dates)

WHAT WE NEED FROM LEADERSHIP (decisions, budget, hiring-manager engagement)
```

---

## How to present this without lying

- **Always show the comparison.** A single number is not data
- **Always caveat small numbers.** "Pipeline diversity moved 4 points — small sample, directional only"
- **Don't claim trends from one period.** Use 3+ data points or label as "directional"
- **Surface what you don't know.** "Source-of-hire is unreliable for Q1 because we re-tagged in mid-Feb; clean data starts Q2"
- **Diagnose, don't just describe.** "Pass-through at HM screen dropped because [specific reason]"
- **Tie metrics to actions.** Don't present a metric without a "what we're doing about it" line

---

## What metrics you should NOT use

- **"Quality of hire"** as a single number. It's a meaningless metric. Use 90-day HM satisfaction + 12-month retention + first-promotion rate instead
- **Cost-per-hire as your primary number.** Cost is real but it's not your job. Time-to-fill, source-of-hire mix, and pipeline health matter more
- **Applications per req** as a "we have enough candidates" signal. 200 wrong candidates is worse than 5 right ones
- **Days from offer to start** as a hiring metric. That's an onboarding metric. Don't claim it
- **Vanity metrics from LinkedIn analytics.** Impressions and follows are not pipeline

---

Things to verify before presenting any metric:

- Definition is documented and stable (changing the definition mid-quarter breaks trends)
- ATS data is the source of truth (not a recruiter's spreadsheet)
- Sample size is acknowledged
- Comparison period is named (prior month / prior quarter / YoY)
- Benchmark source is named (Lever / Greenhouse benchmarks / Linkedin Talent Insights / etc.)
- Any demographic data is self-reported and properly consented
- "What we're doing about it" line is included for any metric trending wrong direction
