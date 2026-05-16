# Reference Workflows — Scrum Master Pack

Real worked examples. Steal whichever ones map to your team. Names and product areas are placeholders.

---

## 1. Start / Stop / Continue retro — agenda + summary

**Pre-retro setup (paste in EasyRetro / Metro Retro / Mural):**

```
SPRINT 47 RETRO — Checkout Pod — 90 min — [Date]

Working agreement reminder:
- What's said here stays here, in pattern form
- Be specific about events, not characterizations of people
- Every action item gets an owner and a date

Format: Start / Stop / Continue

Column prompts:
- START — What should we start doing to make next sprint better?
- STOP — What should we stop doing because it's hurting us?
- CONTINUE — What's working that we should keep doing?

Time-box:
- Welcome + last sprint action item review — 10 min
- Silent brainstorm in columns — 10 min
- Dot-voting (3 dots per person) — 5 min
- Discussion of top themes — 40 min
- Action items + owners + dates — 20 min
- Close — 5 min
```

**Post-retro summary (Confluence/Notion page):**

```
SPRINT 47 RETRO — Checkout Pod — 2026-05-14

Follow-up from Sprint 46 action items:
- "Move DOR review into refinement" — DONE. Three stories got pushed back to refinement in Sprint 47, working as intended.
- "Add staging health check to standup" — IN PROGRESS. We did it twice the first week, dropped it the second. Re-committing.
- "Designer to attend refinement" — DONE. Tara joined both refinements, helped catch two scope gaps before planning.

What we surfaced (top 3 themes):

1. Dependency risks surfaced in planning aren't being absorbed.
Someone raised a risk about staging in Sprint 47 planning that turned out to be the thing that blocked us mid-sprint. The pattern: risks get noted, but no one owns them after planning ends. We need a clearer "risk owner" handoff.

2. Communication gaps with the infra team are hurting our deploy testing.
Two days of staging downtime hit us mid-sprint without a heads-up. This isn't the first time. Cross-team comms with infra needs structure beyond "watch the #infra channel."

3. QA-blocked time is showing up as completion variance.
Two stories sat in QA-blocked for 2 days each. Root cause isn't QA capacity — it's that PR readiness criteria (the DOD) isn't being held to consistently before handoff.

Action items for Sprint 48:
- "Risk owner" assigned for every flagged risk at planning. Owner: SM. Due: Sprint 48 planning (Monday).
- Standing 15-min sync with infra team rep, Wednesdays. Owner: Tech Lead (Priya). Due: First sync by Wed of week 1.
- DOD checklist enforced before PR opens for review (not after). Owner: QA lead (Marcus). Due: Week 1, agreed in standup.

What we're consciously not changing:
The 2-week sprint cadence keeps coming up. We're not changing it this quarter — we agreed in the team's working agreement to revisit at the end of Q2.

Next retro: 2026-05-28
```

---

## 2. 4Ls retro — for a sprint with bumpy dependencies

**Pre-retro setup:**

```
SPRINT 47 RETRO — Platform Pod — 90 min — [Date]

This sprint had a lot of "we wanted to but couldn't" — using 4Ls to surface that pattern.

Format: 4Ls — Liked / Learned / Lacked / Longed For

Column prompts:
- LIKED — What energized you this sprint?
- LEARNED — What did we figure out (about the work, the system, ourselves)?
- LACKED — What did we need that we didn't have?
- LONGED FOR — What did we wish we had?

Time-box:
- Open + last sprint follow-up — 10 min
- Silent brainstorm — 10 min
- Group by theme — 10 min
- Discussion — 40 min
- Action items — 15 min
- Close — 5 min
```

**Post-retro summary excerpt (top themes):**

```
What we surfaced:

1. We learned that the new event-streaming pattern needs a different testing approach.
The team had to build patterns from scratch this sprint because the old test harness doesn't fit. We didn't have an obvious place to ask for help on it.

2. We lacked architectural decision support.
Two stories required architectural judgment calls that the team made on the fly. The decisions were probably right, but they're now de facto patterns with no doc.

3. We longed for clearer ownership on the data contract with the orders team.
We don't know who to talk to when their schema changes. We've asked three different people this quarter.

Action items:
- ADR (Architecture Decision Record) doc template added to the team wiki. Owner: Tech Lead. Due: Wed of week 1.
- Identify the data contract owner on the orders team — coordinate with their EM. Owner: SM. Due: End of week 1.
- New testing-pattern spike — 2 days, time-boxed. Owner: Daniel. Due: End of Sprint 48.
```

---

## 3. Sprint review demo script

```
SPRINT REVIEW — Checkout Pod — Sprint 47 — 2026-05-14, 2:00 PM

SPRINT GOAL
"Ship the new guest checkout flow to 10% traffic by end of sprint."
Status: Partially achieved. Flow is built and merged behind a feature flag; rollout to 10% deferred to Sprint 48 due to mid-sprint staging outage that blocked deploy testing.

WHAT WE'LL DEMO (15 min total)

1. Guest checkout — address autocomplete (Priya — 4 min)
- For: guest users who don't want to create an account
- What it does: address input now uses Google Places autocomplete; cuts checkout time by ~15-20 seconds in internal testing
- Demo: staging URL [link], walk through filling cart → checkout → address
- Not in this version: international address support (Sprint 49)
- Demoer: Priya

2. Guest checkout — saved payment via Stripe Link (Daniel — 4 min)
- For: guest users who've used Stripe Link on another merchant
- What it does: detects existing Stripe Link, offers one-click payment
- Demo: same staging URL, use the test Link email
- Not in this version: Apple Pay / Google Pay integration (Sprint 48-49)
- Demoer: Daniel

3. Checkout analytics events (Tara + Marcus — 5 min)
- For: data team and growth PMs
- What it does: 7 new analytics events fire during checkout (start, address, payment, review, submit, success, error); funnel can now be measured end-to-end
- Demo: Mixpanel debug view, click through staging checkout
- Not in this version: A/B test framework integration (planned Sprint 48)
- Demoer: Tara walks the events, Marcus shows the funnel view

WHAT WE FINISHED THAT WE WON'T DEMO
Three infra changes: feature flag setup for the rollout, error logging for the new flow, and a refactor of the cart-to-checkout handoff. All merged, no UI to show.

WHAT DIDN'T GET DONE (honest)
Two stories deferred: the actual 10% traffic enable (waiting on a clean staging run) and the post-checkout email confirmation work (got bumped to make room for the deploy debugging). Both move to Sprint 48.

WHAT'S NEXT SPRINT
- Enable 10% rollout, monitor for 48 hours, expand to 25% if clean
- Post-checkout confirmation email
- Apple Pay / Google Pay groundwork
- A/B test framework integration with the analytics events

STAKEHOLDER Q&A PREP (internal — not shown in review)

Likely Q1: "Why did the rollout slip?"
Draft answer: Staging environment was down Tuesday and Wednesday due to a planned infra migration we weren't aware of in advance. We couldn't get a clean deploy test through, so we made the call not to push to production traffic without that signal. Working with infra on better cross-team comms going forward.
Who fields: SM (Chris) or PM (Sam) — coordinate before the meeting.

Likely Q2: "Are we still on track for the Q3 milestone?"
Draft answer: Yes, with one sprint of buffer eaten. The Q3 milestone is 100% guest checkout rollout by July 15. Even with this slip, we're on track if Sprint 48 lands cleanly.
Who fields: PM (Sam).

Likely Q3: "What's the conversion lift looking like in early data?"
Draft answer: We don't have production data yet because rollout is deferred. From internal testing, the address autocomplete shaves ~15-20 seconds off median checkout time. We'll have a real cohort read end of Sprint 48.
Who fields: Tara (analytics).
```

---

## 4. Blocker escalation email

```
Subject: ESCALATION — Checkout Pod blocked on DBA review — needs decision by EOD Thursday

Hi Maya,

Cc'ing Chen (Engineering Manager) and Sam (PM).

WHAT'S BLOCKED
CHECK-1247 and CHECK-1251 (the guest checkout payment work) are stuck waiting on a DBA review for a schema change to the `orders` table. Both stories are in our Sprint 48 commitment.

THE BLOCKER, FACTUALLY
We opened ticket DBA-892 last Monday (May 6) requesting review of a schema migration that adds two columns to `orders` and updates an index. No response yet. Standard SLA on the DBA team is 3 business days; we're at 5.

WHAT WE'VE TRIED
- Posted in #data-ops channel — no response after 24 hours
- DMed Aaron on the DBA team Wednesday — he said he'd look at it Thursday, hasn't yet
- Followed up Friday morning, no reply

WHAT WE NEED, AND BY WHEN
DBA review and approval (or actionable feedback) on DBA-892 by EOD Thursday May 14. The schema change has to land before our payment work can integration-test.

IMPACT IF NOT RESOLVED
If we don't have approval by Thursday, CHECK-1247 and CHECK-1251 won't complete in Sprint 48. That pushes the 25% rollout of guest checkout to Sprint 49 (target: late May), which puts the Q3 milestone (100% guest checkout by July 15) at risk by approximately one sprint of buffer.

We've also got CHECK-1255 (Apple Pay groundwork) dependent on the same schema, so the slip cascades to three stories total.

OWNER / FOLLOW-UP
Maya — looking to you to either move this up the DBA team's queue or help me understand if there's a different review path. Happy to jump on a 15-min call Monday morning to walk through the change in detail.

If I don't have a path forward by EOD Tuesday May 12, I'll re-escalate to Chen and we'll look at whether to swap the stories out of Sprint 48 and replan.

Thanks,
Chris (Scrum Master, Checkout Pod)
```

---

## 5. Sprint planning agenda

```
SPRINT 48 PLANNING — Checkout Pod — 2026-05-19, 10 AM-12:30 PM — 2.5 hours

PART 1 — REVIEW (15 min, 10:00-10:15)
- Sprint 47 recap: Goal partially achieved. 24/38 points completed. Two stories deferred.
- Retro action items in play this sprint:
  - Risk owner assigned for every planning risk
  - Standing infra sync starts Wed
  - DOD enforced pre-PR

PART 2 — CAPACITY (10 min, 10:15-10:25)
- Headcount: 7 (Priya, Daniel, Tara, Marcus, Sam, Aiden, designer Lin)
- PTO this sprint: Aiden out 2 days (Mon-Tues, week 2)
- On-call: Priya on infra on-call week 2 (~20% capacity hit)
- Last 3 sprints completed: 31, 28, 24. Realistic target this sprint: 28-32 points.

PART 3 — SPRINT GOAL (15 min, 10:25-10:40)
Proposed by Sam: "Enable guest checkout at 25% traffic with confirmation email shipped."
- Team discusses, refines, agrees
- Final goal locked in Jira sprint goal field

PART 4 — STORY SELECTION (90 min, 10:40-12:10)
- Sam walks top 8 backlog items
- For each: confirm acceptance criteria, point estimate, DOR check
- Team pulls until ~30 points
- If a story isn't DOR-ready, push back, pull next

PART 5 — COMMITMENT (20 min, 12:10-12:30)
- Confirm the committed set
- SM locks the sprint in Jira
- Anything new mid-sprint = swap, not add

OUT OF SCOPE FOR THIS MEETING
- New-story estimation (refinement Thursday)
- Architecture debates not story-blocking (parking lot)
- Backlog reordering theater (Sam's call, separate)
```

---

## 6. Daily standup format

```
CHECKOUT POD — STANDUP — 9:30 AM daily — 15 min max

FORMAT: Walk the board right-to-left (Done → In Review → In Progress → To Do).

FOR EACH ITEM IN REVIEW OR IN PROGRESS:
- Owner: name
- Status: on track / at risk / blocked
- If blocked: what's blocking, what's needed, by when

NEW BLOCKERS:
- [Item] — SM follow-up by [time today]

PARKING LOT (>2 min discussion):
- Topic, who's involved, when SM will schedule follow-up

NOT IN STANDUP:
- Status reports to the EM (separate 1:1)
- Architecture / design debates (parking lot)
- Personnel / performance discussions (1:1)
- Feature requests from stakeholders (PM handles)

IF WE BLOW 15 MIN:
- SM calls time
- Remaining topics go to parking lot or schedule a follow-up
```

---

## 7. Velocity conversation — when leadership asks for a chart

**Context:** Director of Engineering asks the SM to "send me a velocity slide for the QBR" comparing the three engineering teams.

**Draft response (Slack DM):**

```
Hey Sandeep — happy to put something together for the QBR. One quick framing thing before I do, want to make sure I build the slide that's actually useful.

Velocity is the team's planning tool — it helps each team estimate what they can take on next sprint. It's a relative estimate, not a productivity number, and it varies sprint to sprint with team composition, on-call rotations, holidays, and dependency surprises.

The cross-team comparison piece is the part I'd push back on: story points are calibrated within each team, so a 5 on Checkout isn't a 5 on Platform isn't a 5 on Growth. Comparing the raw numbers won't tell you what you probably want to know.

What I think *will* land well in a QBR:
- Predictability per team: commit vs. complete trend over the last 6 sprints
- Sprint goal hit rate per team (out of last 6 sprints)
- Where blockers are coming from across teams (cross-team dependencies, env issues, scope unknowns)

I can put that together as a one-slide view for each team by EOD Wednesday. Want me to go that route, or do you want me to bring something else?

— Chris
```

The script gives the director what they actually need (team health signal for the QBR) without producing the cross-team velocity slide that would corrode trust with the engineers.
