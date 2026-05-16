# Sprint Planning + Metrics Review Playbook

> Capacity math that's honest, sprint goals that fit on one line, and a metrics-review format that produces readouts people actually read.

---

## Part 1 — Sprint planning

### The capacity math nobody does honestly

Most teams plan to nominal hours, then wonder why they miss. The math that works:

```
Nominal hours = engineers × hours/day × days in sprint
Subtract:
  - PTO and holidays (sum across the team)
  - On-call rotations (10-20% of an on-call engineer's week)
  - Standing meetings (~6 hours/week per engineer for typical teams)
  - Spillover / maintenance / unplanned (10-15% of remaining)

What's left = actual new-work capacity
```

A 2-week sprint with 4 engineers at 8 hours/day looks like 320 nominal hours. Reality is closer to **140-180 hours** of actual new-work capacity. If your sprint plan assumes 320, you'll carry over half the work to the next sprint.

### The prompt

```
You are planning a sprint with me. Rules:

1. Start with capacity math. I'll tell you team size, sprint length,
   and known absences. You'll compute nominal → actual capacity using
   the standard deductions (on-call 15%, meetings ~6h/eng/week,
   spillover 12%).
2. Then triage carryover from the prior sprint. Each carryover item:
   keep, drop, or split.
3. Then prioritize new work as P0 (must ship), Stretch (if time
   allows), Won't-do (explicit cut for this sprint).
4. Sprint goal in one sentence at the top. Reads cleanly to someone
   who doesn't know the team.
5. Output the sprint plan as: Sprint Goal → Capacity → Carryover →
   P0 → Stretch → Won't-do.
6. No story-point cargo culting. Use hours or rough sizing
   (S/M/L/XL) — whatever the team uses already.

Voice: direct, specific. The plan should be scannable in 60 seconds.
```

### Input shape

```
[Team]
Engineers: <count + names if useful>
Designers: <count>
PM time: <fraction of week>

[Sprint]
Length: 1 week / 2 weeks
Start: <date>
End: <date>

[Known absences]
- <Engineer X>: out Tue-Wed
- <Engineer Y>: out the full first week (vacation)
- On-call this sprint: <Engineer Z>

[Carryover from last sprint]
- <Item>: status (50% complete / blocked / didn't start)

[Candidate work for this sprint]
- <Item>: rough sizing if you have it
- <Item>: ...
```

### Worked example

**Input:**

```
[Team]
4 engineers (Alex, Beth, Carmen, Dev)
1 designer (Eli) — 50% on this team this sprint
PM: me, ~30% capacity

[Sprint]
2 weeks, May 19 - May 30, 2026

[Known absences]
- Dev: out Tue-Wed of week 1 (3 days off)
- Beth: out week 2 (full week vacation)
- On-call: Carmen the full sprint

[Carryover from last sprint]
- Saved Searches v1 UI polish (~70% done, blocked on design review)
- Webhook retry observability dashboard (~50% done, deprioritized
  when retry-failure work shipped)

[Candidate work for this sprint]
- Saved Searches v1 launch (UI polish + beta rollout)
- Team-shared saves backend (RBAC integration spike)
- First-run onboarding v2 (edge case fixes — 3 specific bugs)
- Mobile-web for "Audit Log" view
- Customer-shared saves UX exploration (design exploration only)
```

**Output:**

```
**Sprint Goal:** Ship Saved Searches v1 to beta cohort by May 30.
Unblock Team-shared saves kickoff for next sprint.

**Capacity**
- Nominal: 4 engineers × 8h × 10 days = 320h
- Beth out week 2: −40h
- Dev out 3 days: −24h
- Carmen on-call (15% across sprint): −12h
- Meetings (6h/wk × 4 eng × 2 wks): −48h
- Spillover/maintenance (12%): −24h
- **Actual new-work capacity: ~172h**

**Carryover (decide first)**
- Saved Searches v1 UI polish (~70% done) → KEEP. Design review
  scheduled May 20. P0 for this sprint.
- Webhook retry observability dashboard → DROP. Original retry-failure
  work shipped; dashboard is no longer high-priority. Move to Later
  on the roadmap.

**P0 (committed — fits in ~140h)**
- Saved Searches v1 UI polish + beta rollout (Alex, ~40h)
- Team-shared saves RBAC integration spike (Beth before vacation,
  Carmen continues, ~50h)
- First-run onboarding v2 edge case fixes — 3 specific bugs
  (Dev, ~30h)
- Mobile-web Audit Log view (Carmen between on-call work, ~20h)

**Stretch (~30h headroom if P0 finishes early)**
- Customer-shared saves UX exploration with Eli (design, ~30h)
- Tech-debt: search backend latency investigation (Alex if available)

**Won't-do this sprint (explicit)**
- Customer-shared saves backend work (waiting on RBAC spike outcome)
- API for Saved Searches (Phase 2 — not in this cycle's commitments)
- Webhook retry observability dashboard (deprioritized; see Carryover)

**Risks**
- Beth out for week 2 means RBAC spike completion depends on Carmen,
  who is also on-call. If pages spike, the spike slips. Mitigation:
  Beth front-loads the spike in week 1.
- Mobile-web Audit Log depends on a shared layout primitive Alex is
  finishing during Saved Searches polish. Watch the handoff.
```

What this plan does:

- Sprint goal in one sentence at the top.
- Capacity math is explicit and conservative.
- Carryover is decided up front (keep / drop / split).
- P0 fits comfortably inside the actual capacity, with stretch room.
- Won't-do is explicit, naming items that *would* be tempting to take on.
- Risks are named with mitigations, not buried.

---

## Part 2 — Metrics review

### What good looks like

A metrics review is not a wall of numbers. It's a two-page document that says:

> "Here are the 3-5 metrics that matter most. Each one's trend, what we think is driving it, and what we'd look at next. The thing you should know about: <one specific thing>."

Most metrics reviews fail by trying to cover everything. Pick the metrics that matter most for the current strategic question, surface what moved, and ignore the noise.

### The prompt

```
You are running a metrics review with me. Rules:

1. I'll give you 3-7 metrics and their values (current period, prior
   period, target if there is one). You will produce a readout, one
   metric at a time.

2. For each metric, write:
   - Trend: up / down / flat, with magnitude (e.g., "up 12%")
   - Compared to: prior period, target, or both
   - Hypothesis: 1-2 sentences. What you think is driving it. If you
     don't have enough info to hypothesize, say so honestly.
   - Follow-up: what I'd want to check next (a slice of the data, a
     customer call, a launch correlation, etc.)

3. Order by importance. The metric that moved most or matters most
   for current strategy goes first.

4. At the end, write a one-paragraph "headline" that summarizes the
   week in 3-4 sentences. The thing the exec who reads this should
   walk away knowing.

5. Bury the noise. If a metric didn't move meaningfully and isn't
   strategically relevant, group it under "Flat / no signal" at the
   bottom.

Voice: direct, calibrated. Hedged language ("might," "could be") is
fine when honest; avoid false certainty.
```

### Input shape

```
[Period]
Reporting period: <e.g., week of May 6-12, 2026>
Compared to: <prior period dates>

[Strategic context]
What we're paying attention to this quarter (e.g., "activation +10pp
goal," "Q2 renewal cycle," "launch of Saved Searches mid-month")

[Metrics]
For each metric:
- Name
- Current value
- Prior value
- Target (optional)
- Any context you'd want (a launch this week, a known anomaly, etc.)
```

### Worked example

**Input:**

```
[Period]
Week of May 6 - May 12, 2026
Compared to: Week of Apr 29 - May 5

[Strategic context]
Q2 goal is activation +10pp. We're at +6pp YTD; need +4pp by end of Q2.
Saved Searches v1 is scheduled for May 30.

[Metrics]
- WAU: 8,420 → 8,510 (+1.1%), no target
- Activation rate: 41% → 39% (-2pp), target 47%
- Webhook retry failures: 0.8% → 0.3% (-0.5pp), target <1%
- Support ticket volume: 142 → 168 (+18%), no target
- Net new paid customers: 12 → 14 (+2), target 15/wk
- Mobile-web session share: 18% → 21% (+3pp), no target
- "Lost my view" tickets: 6 → 8 (+2), informal target zero by July
```

**Output:**

```
**Headline:** Activation slipped 2pp this week, the first decline in
seven weeks — the new first-run flow may be over-rotating on the
edge cases we patched last sprint, and we should dig into the
funnel before the next experiment. Webhook retry failures are now
solidly below target. Saved Searches launch on track, but "lost my
view" tickets ticked up — recall the launch is 18 days out.

---

**Activation rate** — DOWN 2pp (41% → 39%, target 47%)
- Compared to: prior week and YTD trend (this is the first decline
  since week of Mar 17).
- Hypothesis: The first-run flow revision shipped Apr 30 traded
  speed for coverage — we added two onboarding steps to handle edge
  cases. Suspect we've slowed median time-to-activation enough to
  drop the rate. Need to look at the funnel by step.
- Follow-up: pull the new-user funnel for this week vs. last; compare
  drop-off by step. Decide by Friday whether to revert step 4 or
  iterate.

**Support ticket volume** — UP 18% (142 → 168)
- Compared to: prior week. No baseline target.
- Hypothesis: Increase concentrated in the "Saved Views" category —
  6 → 8 — and in onboarding-related tickets (suspect related to the
  activation drop above). Not a quality regression; usage shifting.
- Follow-up: Tag this week's tickets by category. If onboarding is
  >40% of the increase, it's the same root cause as the activation
  drop.

**Webhook retry failures** — DOWN 0.5pp (0.8% → 0.3%, target <1%)
- Compared to: prior week and target.
- Hypothesis: Idempotency + DLQ work shipped 2 weeks ago is fully
  in effect now. Sustained drop, not a one-week fluke.
- Follow-up: Mark as resolved; remove from weekly metrics, monitor
  monthly going forward.

**Net new paid customers** — UP 2 (12 → 14, target 15/wk)
- Compared to: prior week and weekly target.
- Hypothesis: Close to target; nothing screaming.
- Follow-up: None this week. Watch the Q2 cumulative.

**Mobile-web session share** — UP 3pp (18% → 21%)
- Compared to: prior week. No formal target.
- Hypothesis: Mobile-web parity launch for the top-3 flows is
  driving sustained uptick. Three of the last four weeks have shown
  growth.
- Follow-up: Pull the device-class breakdown for next week's review;
  worth confirming this is incremental usage, not cannibalization
  of desktop sessions.

**Flat / no signal**
- WAU: +1.1%, within normal weekly variance. No action.
- "Lost my view" tickets: 6 → 8. Below the noise threshold for
  weekly analysis; revisit after Saved Searches launch.
```

What this readout does:

- Headline in 3-4 sentences gives the exec the takeaway without scrolling.
- Metrics ordered by importance, not alphabet.
- Each metric has a real hypothesis, not "we'll keep monitoring."
- Follow-ups are specific actions, not vague intentions.
- The metric that's been resolved (webhook retry failures) gets promoted off the weekly list.
- Noise is buried under "Flat / no signal" so the readout stays scannable.

---

## How sprint and metrics work together

The metrics review should drive the next sprint plan. If activation dropped 2pp this week and the hypothesis points to the first-run flow, that funnel investigation belongs in next sprint's P0, not somewhere on the backlog.

Workflow:

1. Run the metrics review Friday or Monday morning.
2. Identify the 1-2 metrics that surprised you (positively or negatively).
3. Convert each surprise into a follow-up: a data pull, a customer call, or an experiment.
4. The follow-ups go into sprint planning as P0 items if they're load-bearing for the strategic goal.

The PM's job is to keep the loop tight: metrics → hypothesis → experiment → metrics. Sprint plans that don't reflect last week's signal are how teams drift.
