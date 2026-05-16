# PRD + Roadmap Templates

> The PRD shape you'll use 80% of the time, plus the Now/Next/Later roadmap drafter that turns a messy backlog into prioritized buckets.

---

## Part 1 — The PRD

### The shape

```
# PRD — <Feature name> (v0.x, <author>, <date>)

## Problem
What's broken, for whom, in plain language. Quote a user if you can.

## Goal
The one outcome this work is for. One sentence.

## Non-goals
Explicit list of what this is NOT doing. Reason per item ("Phase 2,"
"separate workstream," "won't move the metric we care about").

## Success metrics
How we'll know it worked. Target numbers. Time windows.

## Acceptance criteria
What "done" looks like. Bulleted, testable.

## Scope
**In:** the slice we're building
**Out:** explicit cuts
**Stretch:** if time allows

## Open questions
What you don't know yet. Each one has a deadline or an owner.
```

That's it. No mission statement. No competitive-analysis section unless one is actually load-bearing. No "user persona" filler if the team already knows the user.

### The prompt

```
You are drafting a PRD. Rules:

1. Doc length matches feature size. A 2-day feature gets a 1-page PRD.
   A 2-quarter initiative gets 3-5 pages. No 12-page PRDs for small work.
2. Use the shape above, in order: Problem → Goal → Non-goals → Success
   metrics → Acceptance criteria → Scope → Open questions.
3. The Non-goals section is required and does real work. Each entry has
   a one-line reason. If a Non-goal is actually a Phase 2 decision, link
   it to the Open Questions section.
4. Success metrics have numbers and time windows. "Adoption increases"
   is not a metric. "25% of WAU create a saved search within 60 days"
   is.
5. Acceptance criteria are bulleted, testable, written so an engineer
   can use them as a definition of done.
6. Scope has In / Out / Stretch. The Out list head off "but what about"
   questions in advance.
7. Open questions name the decider or the deadline. "TBD" is not enough.
8. Voice: direct, specific, slightly tired. No "leverage," "unlock,"
   "double down," "transform." No "I hope this finds you well."

Output the PRD only. No commentary unless I ask.
```

### Input shape

```
[The work]
Feature: <name>
Target user: <who> (specific — role, size of customer, segment)

[Status / context]
Stage: idea / sketched / building / shipping
Signal: research / tickets / exec push / metric trend / competitive
Audience for the PRD: eng / leadership / sales

[Raw material]
Bullets, Slack thread, meeting notes, prior PRD. Unformatted is fine.

[Constraints]
- Doc length
- Tone
- Decisions already made (don't relitigate)
- Decisions explicitly NOT made yet (flag as open questions)
```

---

### Worked example — "Saved searches" PRD

**Input:**

```
[The work]
Feature: Saved Searches in our SaaS dashboard
Target user: Power users — ops and analytics roles at our customers,
typically 10-50 person teams using the dashboard daily.

[Status / context]
Stage: sketched. Heard in 6 customer calls over 8 weeks, 12 support
tickets in the same window. No design yet.
Audience: engineering lead + 2 IC engineers + design.

[Raw material]
- Customers want to save a filtered view and come back to it
- They want to name it
- They want to share it with their team (some, not all)
- They want to be notified when results change (some, not all)
- Some asked for API; most via UI
- Current workaround: bookmark the URL with query params — fragile,
  breaks when we change URL structure

[Constraints]
- 1-2 pages
- Tone: scrappy, internal
- Decided: this is in the dashboard, not a separate page
- Decided: personal saves first; team-shared is Phase 2
- Open: notifications when results change — Phase 1 or 2?
```

**Output (excerpt):**

```
# PRD — Saved Searches (v0.5, Alex, 2026-05-14)

## Problem
Power users — ops and analytics roles at our customers — run the same
filtered queries multiple times a week. Today they bookmark URLs,
which break when we update query-param structure. We've heard this
in 6 customer calls and 12 tickets over the last 8 weeks.

Quote (Maya, ops lead at <Customer>): "I rebuild the same filter every
Monday. I gave up on bookmarks because half of them stopped working
after your last release."

## Goal
Reduce "I lost my filtered view" friction for power users.
Concretely: let a user save a named filtered view, return to it, and
(Phase 2) share it.

## Non-goals
- Team-shared saved searches → Phase 2. See Open Questions.
- API-first saved searches → Phase 2. Most demand is UI.
- Cross-product saved searches (dashboard + reports) → out of scope;
  separate workstream.
- Saved-search analytics (which saves are most used) → Phase 2.

## Success metrics
- 25% of weekly active dashboard users create at least one saved
  search within 60 days of launch
- "Lost my view" support ticket category drops 50% over the same
  60-day window (baseline: ~24/month over Q1 2026)
- Median saved searches per active power user ≥2 by day 30

## Acceptance criteria
- User can save the current filtered view with a one-click "Save this
  view" action in the dashboard
- Saved view is named (default = auto-summary of filters; user-editable)
- Saved views appear in a left-rail "My saved views" section
- Reopening restores exact filter state, regardless of URL changes
- Saved views are stored as filter JSON, not URL strings
- Up to 50 saved views per user; over the limit shows a clear error

## Scope
**In:** Personal saves; UI-only; named; restorable. 50/user cap.
**Out:** Team-shared. API. Notifications. Cross-product.
**Stretch:** Soft delete + restore for accidentally-deleted saves.

## Open questions
1. Notifications when results change → Phase 1 or 2?
   Recommendation: Phase 2. Adds a change-detection layer the core
   save/restore loop doesn't need. Decider: <PM> by 2026-05-21.
2. Storage limit per user — 50 felt right; no real data. Open to
   adjusting based on engineering's storage feedback.
3. Migration policy when an underlying filter column is renamed or
   removed. Decider: <eng lead> + <PM>, before kickoff.
```

What this PRD does:

- Quotes a real user in the Problem section.
- Non-goals does the heavy lifting — four explicit cuts, each with a reason.
- Success metrics have numbers, baselines, and time windows.
- Acceptance criteria are testable.
- Scope's "Out" section heads off the "but what about" questions in advance.
- Open questions have deciders and deadlines.

That's 700 words on a 1-2 page PRD. Right-sized for the work.

---

## Part 2 — Now / Next / Later roadmap

### The prompt

```
You are updating a Now/Next/Later roadmap. Rules:

1. Three columns: Now, Next, Later. Nothing else.
2. Every item is an outcome (e.g., "Cut 'lost my view' tickets 50%"),
   not a feature name. Feature name in parens.
3. Each item has a Quarter and a Confidence (High / Med / Low).
   Confidence is honest. Don't grade everything High.
4. "Now" = committed, in progress.
5. "Next" = committed for the upcoming cycle.
6. "Later" = on the radar, not committed.
7. If the user proposes moving an item from Later to Now without a
   corresponding cut, push back: "What in Now is moving out?"
8. Output the roadmap as a markdown table. One paragraph below it
   explaining what changed since last cycle.

Voice: direct, specific. No "soon" without a quarter. No vague verbs.
```

### Input shape

```
[Current roadmap]
Paste the existing Now / Next / Later, or describe verbally.

[What's changed]
- New initiatives being added
- Initiatives that shipped
- Initiatives slipping or being deprioritized
- Strategic context (a customer commitment, a competitive move, a
  capacity change, etc.)

[Constraints]
- Quarter horizon (1-2 quarters typical)
- Team capacity reality (any major changes from prior cycle?)
- Audience (internal team, leadership, sales-facing)
```

### Worked example

**Input:**

```
[Current roadmap]
Now:
- Onboarding completion +10pp (revised first-run flow) — Q2 26, High
- Cut "lost my view" tickets 50% (Saved Searches v1) — Q2 26, High

Next:
- Mobile-web parity for top 5 dashboard flows — Q3 26, Med
- Power-user retention +5pp (Team-shared saves + API) — Q3 26, Med

Later:
- In-product analytics for customer-side admins — Q4 26, Low
- API rate-limit dashboard for customer engineers — Q4 26, Low

[What's changed]
- Onboarding work is on track but trending Med, not High — we're
  finding more edge cases in the first-run flow than expected.
- A top-3 customer committed to renewal contingent on Team-shared
  saves shipping in Q3. We have to move that earlier.
- We lost one engineer this quarter. Capacity down ~20%.

[Constraints]
- 2-quarter horizon
- Audience: leadership readout
```

**Output:**

```
| Bucket | Outcome | Quarter | Confidence |
|--------|---------|---------|------------|
| Now    | Cut "lost my view" tickets 50% (Saved Searches v1)   | Q2 26 | High |
| Now    | Onboarding completion +10pp (first-run flow)         | Q2 26 | Med  |
| Next   | Power-user retention +5pp (Team-shared saves + API)  | Q3 26 | Med  |
| Next   | Mobile-web parity for top 5 dashboard flows          | Q3 26 | Low  |
| Later  | In-product analytics for customer-side admins        | Q4 26 | Low  |
| Later  | API rate-limit dashboard for customer engineers      | Q4 26 | Low  |

**What changed:** Onboarding moved from High to Med confidence —
first-run flow has more edge cases than expected. Team-shared saves
stays in Next (Q3) but is now a contract commitment for a top-3
customer renewal, so it's the priority for Q3 even at the cost of
mobile-web parity (now Low confidence given the ~20% capacity hit
from losing an engineer). Recommend revisiting mobile-web in Q4
unless we backfill.
```

What this output does:

- Honest about Confidence. Onboarding dropped to Med because of new edge cases.
- Surface the customer-contingent renewal as the reason for prioritizing Team-shared saves.
- Calls out the capacity hit and its consequences plainly.
- Doesn't pretend the team can absorb the loss without a tradeoff.

---

## When to skip the PRD

Not every feature needs a PRD. Skip it when:

- The work is <2 days and the team already understands the user.
- The work is a bug fix or a small refactor.
- The work has been discussed thoroughly in a design doc, and the PRD would just summarize.

When to skip the PRD but keep the artifact: write a 3-bullet "what + why + how we'll know" instead. Even small work benefits from a written outcome statement.
