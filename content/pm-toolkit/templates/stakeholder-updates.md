# Stakeholder Update Templates

> Three flavors, same skeleton: exec brief, engineering detail, customer-facing. Same week of work compressed for three different audiences.

---

## The skeleton (all three flavors share this)

1. **Status** — one word (Green / Yellow / Red) plus one sentence
2. **What shipped** — outcomes, not features
3. **What's next** — committed items for the upcoming cycle
4. **At risk** — honest about what might slip
5. **The ask** — one specific thing you need from this audience

The differences between flavors are:

- **Length:** 200 / 400 / 150 words
- **Vocabulary:** internal jargon OK in exec and eng; never in customer-facing
- **Depth on blockers:** exec gets the headline; eng gets the details; customer-facing usually omits
- **The ask:** exec asks for decision/headcount/intro; eng asks for prioritization or unblock; customer asks for feedback or beta participation

---

## Flavor 1 — Exec brief (~200 words)

### The prompt

```
You are writing an executive stakeholder update. Rules:

1. ~200 words. Hard cap: 250.
2. Lead with status as a single word: Green / Yellow / Red. Then one
   sentence on why.
3. "What shipped" is outcomes, not features. "Cut 'lost my view'
   tickets 47% in 30 days" not "Shipped Saved Searches v1."
4. "At risk" is honest. If something might slip, say so and why.
5. End with one specific ask. "Need a decision on X by Y." Not "let
   me know if you have questions."
6. No "I hope this email finds you well." No "circling back."
7. Voice: direct, calm, specific. Numbers when you have them.

Output the update only.
```

### Worked example

```
**Status: Yellow** — Saved Searches launch on track for May 30;
onboarding work slipping ~2 weeks due to edge-case discovery.

**What shipped this period**
- Cut webhook retry failures 78% (closed long-standing P1 incident
  category)
- Mobile-web parity for the top-3 dashboard flows
- Activation +3pp from the new first-touch tooltip experiment

**What's next (next 2 weeks)**
- Saved Searches v1 → ships May 30, beta with 4 customers first
- Onboarding revision v2 → adjusted to reflect new edge cases
- Team-shared saves → kickoff May 28 (committed in <Customer X>
  renewal)

**At risk**
- Onboarding completion target (+10pp) — pushed from Q2 to early Q3
  due to first-run edge cases. Mitigation: shipping the v2 with the
  highest-impact edges; remainder in Q3.
- Mobile-web parity for the remaining 2 flows slips to Q4 unless we
  backfill the engineering seat we lost.

**Ask**
Need a decision by Friday on whether to backfill the open engineering
seat or accept the mobile-web slip to Q4. Both paths work; I'd rather
not carry the ambiguity into the team's planning next week.
```

Note what's happening:

- Status is Yellow, not Green. The PM is being honest.
- "What shipped" is three lines, each an outcome with a number.
- "At risk" is real risks with mitigations, not boilerplate.
- The ask is specific — a decision, by a date, with the options framed.

Roughly 200 words. An exec can scan it in 45 seconds.

---

## Flavor 2 — Engineering detail (~400 words)

### The prompt

```
You are writing an engineering-team stakeholder update. Rules:

1. ~400 words. Hard cap: 500.
2. Same skeleton as the exec brief, but include:
   - Blockers (technical or organizational), with proposed paths
   - Dependencies on other teams
   - Decisions the team is asking for, with options + recommendation
3. Technical vocabulary is fine. Don't dumb down for engineering.
4. Same "lead with status" discipline. Yellow is Yellow.
5. End with the ask. Engineering-relevant: a prioritization call, an
   unblock, a tradeoff decision.

Output the update only.
```

### Worked example

```
**Status: Yellow** — Saved Searches on track for May 30; onboarding
work slipping ~2 weeks; one cross-team dependency at risk.

**Shipped this period (outcomes + how)**
- Webhook retry failures cut 78%: introduced idempotency keys +
  dead-letter queue. Stripe support confirmed pattern aligns with
  their recommendation. P1 page volume 12/mo → 3/mo.
- Mobile-web parity for top-3 flows: refactored the dashboard layout
  primitive to use CSS Grid; resolved the long-standing tablet
  breakpoint bug as a side effect.
- Activation +3pp: A/B test on first-touch tooltip closed at 95% conf.
  Variant B (contextual rather than greeting) won.

**Building now**
- Saved Searches v1 — backend complete; UI 80%. Filter-JSON storage
  pattern validated against the 12 most-used query shapes. Beta cohort
  selected: 4 customers, all power users, opt-in.
- Onboarding v2 revision — adjusted scope to ship highest-impact
  edges first. Three edge cases remain for Q3.

**Blockers and dependencies**
- Team-shared saves kickoff is contingent on the Permissions team
  shipping the new RBAC primitive (ETA: May 25). Tracking weekly.
  Fallback: ship Team-shared saves with a simpler all-or-nothing
  share model, refactor to fine-grained when RBAC lands.
- Search backend latency at p95 has crept up 18% over Q1 — not
  user-impacting yet, but trending. Proposing one engineer-week to
  investigate before it becomes a Q3 fire.

**Decisions needed**
1. Backfill the open engineering seat in Q2, or accept the mobile-web
   slip to Q4? Recommendation: backfill. Mobile-web is in 2 of 4
   top-renewal customer asks for H2.
2. Team-shared saves with fallback all-or-nothing share model if RBAC
   slips? Recommendation: yes. Customer commitment is for Q3, and the
   refactor cost is ~3 days when RBAC lands.

**Ask**
Need the two decisions above by Friday. Both shape next sprint's plan.
```

What's different from the exec brief:

- Includes how the work shipped, not just the outcome.
- Surfaces a latency trend that isn't user-impacting yet — engineering signal, not exec signal.
- Frames decisions with options and a recommendation, not as open questions.
- The ask names specific decisions and a date.

---

## Flavor 3 — Customer-facing (~150 words)

### The prompt

```
You are writing a customer-facing update. Rules:

1. ~150 words. Hard cap: 200.
2. Plain language. No internal jargon. No metric callouts that don't
   matter to the customer.
3. Lead with what the customer can use now (the thing that shipped).
4. "What's coming" with month-granularity at most. No commitments to
   exact dates.
5. One channel for feedback. Easy to use.
6. No status colors. No "at risk" language. If something matters to
   the customer, frame it positively or omit.
7. Voice: warm but not gushing. Confident but not pushy.

Output the update only.
```

### Worked example

```
Hi everyone,

A quick note on what's new in the dashboard this month and what's
coming next.

**What you can use now**
- The "Save this view" button is live in the dashboard for power users.
  Save your filtered views, name them, and they'll always restore
  exactly — even if our URL structure changes underneath. Up to 50
  per user.
- Mobile-web is now usable for the three flows you use most:
  dashboards, alerts, and audit log. The remaining two flows are
  coming this fall.

**Coming next**
- Team-shared saved views — share a filtered view with your team.
  Targeting July.
- Improved first-run experience for new teammates you onboard. Late
  June.

**A small ask**
If you try Saved Views and find something missing or weird, hit reply
to this email. I read every one personally and it shapes what we
build next.

— Alex
```

What's different:

- No status color, no "at risk" framing.
- "Up to 50 per user" surfaces a real limit, but in customer language.
- "Coming next" uses months, not quarters or specific dates.
- The ask is direct and easy (reply to this email).

---

## How to use all three in one workflow

Most weeks, you write the engineering-detail update first because that's where the raw material lives — your sprint planning, your blockers, your team's decisions. Then you compress.

Workflow:

1. Write the engineering-detail update (~400 words).
2. Run it through the AI: "Compress to 200 words for an exec brief. Keep one specific ask. Drop technical vocabulary."
3. Run it through the AI again: "Rewrite for our customers in 150 words. Plain language. Drop internal blockers. Frame around what they can use now."

Total time: 30 minutes for all three versions. The compression passes catch over-claiming — if the exec version can't say "shipped X" without hedging, the engineering version probably overstated it too.

---

## Anti-patterns the prompt blocks

- "I hope this email finds you well." — Cut.
- "Just wanted to circle back on..." — Cut.
- "Per my last email..." — Cut.
- "We continue to make progress on..." — Vague. Replace with an outcome and a number.
- "Things are going well!" — Status is a color, not a feeling. Pick one.
- "Let me know if you have any questions." — Not an ask. State the actual ask.
- "Excited to share..." — The exec doesn't need to know how you feel about it. Get to the substance.

If any of these slip through, prompt: "Strip every filler phrase and rewrite with status, outcomes, and the ask."
