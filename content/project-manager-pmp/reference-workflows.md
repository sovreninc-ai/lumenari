# Reference Workflows — Project Manager (PMP-Style) Pack

Worked examples and templates for the documents that get used. Copy, adapt, send.

---

## 1. Project charter — worked example

```
PROJECT CHARTER — Q3 DATA WAREHOUSE MIGRATION — v1.2 — 2026-02-14

OUTCOME
Migrate all enterprise reporting from the legacy Oracle warehouse to Snowflake by October 31, with zero loss of historical data and a 4-week parallel-run validation window before legacy decommission.

BUSINESS CASE
The legacy Oracle warehouse is at capacity, growing 18% YoY, and costs $1.8M annually to maintain on extended Oracle support. Snowflake reduces operating cost by 38% based on a 90-day pilot, scales elastically, and unblocks the analytics roadmap (real-time pipelines, ML feature store). Cost of delay: ~$150K/quarter in Oracle support and an estimated 2 quarters of analytics roadmap impact.

SCOPE
IN:
- Migration of all 412 production reports
- Migration of 18 source-system data pipelines
- 4-week parallel-run validation
- User retraining (140 analysts + 28 power users)
- Documentation refresh for the new schema
OUT:
- Migration of dev/staging reports (separate workstream Q4)
- Migration of finance close pipeline (locked in Oracle through Q1 next year)
- ML model retraining (downstream, separate budget)

OBJECTIVES
- By October 31, 2026: 100% of production reports migrated and validated against legacy parallel run.
- By October 31, 2026: pipeline cost reduced from $1.8M/yr to $1.12M/yr (38%).
- By November 30, 2026: legacy Oracle warehouse decommissioned.
- By October 15, 2026: 140 analysts trained, > 90% report task completion rate in post-training assessment.

KEY DELIVERABLES + MILESTONES
- M1 (March 31): schema migration plan signed off — acceptance: cross-team architecture review approval
- M2 (May 15): pipeline lift-and-shift complete for top 50 reports — acceptance: parallel-run match within tolerance
- M3 (July 31): full migration complete — acceptance: all 412 reports validated
- M4 (Sep 30): parallel run begins — acceptance: 4-week clean run
- M5 (Oct 31): legacy cutover — acceptance: sponsor sign-off

STAKEHOLDERS
- Sponsor: Tom Reyes, VP Data — decision authority on scope, budget, timeline
- Steering: Tom Reyes, CFO (Alicia), CIO (Marcus), Head of Analytics (Priya)
- Project manager: [Name]
- Core working team: Data eng (4 @ 75%), BI eng (3 @ 50%), QA (2 @ 100%), training (1 @ 25%)
- Consulted: finance close team, compliance, IT security
- Informed: all report consumers (broad)

ASSUMPTIONS
- Snowflake licensing locked through Q3 (signed)
- Vendor (Migrato) schema export tooling available on agreed dates
- No new compliance requirements (CCPA / PIPEDA) drop during the project window
- Analytics team availability holds at planned %
- Cutover window approved for Oct 31 weekend

CONSTRAINTS
- Hard launch date: November 1 (start of FY27 analytics planning cycle)
- Budget cap: $1.4M total
- Cannot pull from finance close workstream
- Compliance review required at M2 and M4

HIGH-LEVEL RISKS
- R-01: Vendor schema export delivers incomplete metadata. P: M, I: H. Owner: Vendor lead. Mitigation: weekly schema-completeness checks against legacy.
- R-02: Analyst training adoption < 90%. P: M, I: M. Owner: Priya. Mitigation: 3-tier training (sync + recorded + drop-in office hours).
- R-03: Cutover weekend issue requires rollback. P: L, I: H. Owner: PM + Data eng lead. Mitigation: validated rollback plan, dry-run in September.
- R-04: Snowflake performance degrades on heavy concurrent queries. P: M, I: M. Owner: Data eng lead. Mitigation: pilot performance test in May, scale plan ready.
- R-05: Key contributor pulled to higher-priority project. P: L, I: H. Owner: PM. Mitigation: cross-training, named backups per role.

BUDGET (ROM)
$1.4M total, +/- 8%. Software licensing $620K, professional services $480K, training $80K, contingency $220K.

TWO-OUT-OF-THREE
Schedule and budget are locked. Scope will flex if needed: if M2 slips materially, we will defer 30-50 lower-priority reports to Q1 next year rather than blow past Oct 31.

SIGN-OFFS
Sponsor — Tom Reyes:_________________  Date:______
PM:_________________________________  Date:______
Steering chair — Marcus:_______________ Date:______
```

---

## 2. Executive status report — worked example (YELLOW)

```
PROJECT: Q3 Data Warehouse Migration     PM: [Name]
WEEK: Feb 12-18                          OVERALL STATUS: YELLOW

THIS WEEK
- M2 schema design review completed; 2 minor changes accepted, baseline updated
- 30 of 50 top-priority reports lifted to Snowflake dev
- Vendor (Migrato) delivered wrong schema export Tuesday; corrected version received Thursday
- Recovery plan locked: 5-day schedule extension on data migration workstream, parallelizing testing to protect launch

NEXT WEEK
- Complete remaining 20 top-priority reports lift
- Begin pipeline test runs on Snowflake dev
- Decision needed from sponsor on M2 acceptance: standard or expedited review

STATUS BY DIMENSION
- Schedule: YELLOW — data migration workstream slipped 8 working days, recovery plan in place, launch date protected
- Scope: GREEN — no scope changes this week
- Budget: GREEN — 56% used at week 14 of 22 (64% timeline); within plan
- Resources: GREEN — team at planned allocation

TOP RISKS (3, ranked)
1. R-01 (Vendor schema): P:M → P:M, I:H. Triggered partially this week. Recovery in flight. Owner: vendor lead.
2. R-04 (Snowflake performance): P:M, I:M. May performance test on track. Owner: data eng lead.
3. R-02 (Training adoption): P:M, I:M. Training plan finalized, kickoff in June. Owner: Priya.

DECISIONS NEEDED FROM YOU
- M2 acceptance review: standard 5-day cycle or expedited 2-day? Recommend: expedited, given we're recovering schedule.

DEPENDENCIES TO WATCH
- Compliance pre-review for M2: scheduled Feb 26; on track
- Snowflake account scaling tier upgrade: needed by April 1; vendor confirmed
- Finance close team unavailable Apr 1-15 (close window) — no impact this period

---
I assumed:
- Expedited M2 review is acceptable for the sponsor; flag if not
- Vendor's corrected schema export validates cleanly in Monday's test
Confirm before sending.
```

---

## 3. RAID entries — worked examples

**Risk:**
```
ID: R-06
TYPE: Risk
TITLE: Cutover weekend Snowflake region outage
DESCRIPTION: Snowflake's us-east-1 region had two outages in 2025. Our planned cutover window falls during AWS's higher-traffic quarter. A region outage during the 48-hour cutover would force a rollback to legacy.
OWNER: Marcus (CIO)
DATE OPENED: 2026-02-14
DUE DATE: 2026-08-31 (mitigation plan finalized 60 days before cutover)
STATUS: Open
PROBABILITY: L
IMPACT: H
MITIGATION: Cutover plan includes cross-region failover; data eng lead validates failover in May dry-run; communications plan includes 4-hour rollback decision point.
TRIGGER: Snowflake status page shows partial region degradation OR > 30 min of API errors during cutover window.
```

**Issue:**
```
ID: I-03
TYPE: Issue
TITLE: Vendor delivered wrong schema export
DESCRIPTION: Vendor (Migrato) delivered Tuesday's scheduled schema export against the dev rather than prod environment, missing 22 production-only tables. Corrected delivery arrived Thursday, validated Friday.
OWNER: Vendor lead (Sarah)
DATE OPENED: 2026-02-13
DUE DATE: 2026-02-16 (closed)
STATUS: Mitigated
CURRENT IMPACT: Data migration workstream slipped 8 working days on the timeline.
RECOVERY PLAN: Parallelize remaining schema validation with pipeline lift, compressing 12 days of work to 4. Confirmed with data eng lead.
ESCALATION NEEDED: No — recovered at PM level, flagged in this week's status.
```

**Decision:**
```
ID: D-04
TYPE: Decision
TITLE: M2 acceptance review — standard or expedited?
DESCRIPTION: M2 gate review can run on the standard 5-day cycle or an expedited 2-day cycle. Expedited would help protect schedule recovery. Standard preserves time for compliance and finance to do deeper sample checks.
OWNER: Tom Reyes (Sponsor)
DATE OPENED: 2026-02-14
DUE DATE: 2026-02-17
STATUS: Open
DECISION NEEDED: Approve expedited or hold to standard.
OPTIONS:
A. Expedited (2-day) — recovers ~3 of the 8 lost days. Trade-off: lighter sample coverage in compliance review.
B. Standard (5-day) — full sample coverage. Trade-off: less buffer on M2 schedule, may need to compress UAT.
C. Compromise — expedited for technical reviewers, standard for compliance only. Trade-off: 1 extra day vs. option A.
DECISION-MAKER: Tom Reyes
DUE BY: 2026-02-17 EOD
```

---

## 4. Change request — worked example

```
CHANGE REQUEST — Q3 DATA WAREHOUSE MIGRATION — CR-07 — 2026-04-09

WHAT'S CHANGING
Defer migration of 32 of the lowest-priority reports (out of 412 total) from the October 31 launch to a Q1 next year follow-up release. These are reports with < 5 unique viewers/month and < 1 view/week median.

WHY
M3 forecast is tracking 6 working days over plan as of week 18, driven by complex pipeline rewrites for finance and supply chain. Recovery options are: extend schedule (blocked by FY27 cycle), add resources (no qualified resources available), or reduce scope (this CR).

IMPACT IF APPROVED
- Scope: 380 reports migrated by Oct 31 (vs. 412). 32 reports deferred to Q1 release.
- Schedule: M3 recovers 4 of the 6 slipped days. Launch date protected.
- Cost: $0 delta in current budget. Q1 follow-up estimated at $60K, separately scoped.
- Resources: No change in current team. Q1 release uses BAU team.
- Risk: R-01 (vendor schema) and R-02 (training) probability unchanged. Adds R-07: deferred reports may be requested back in scope mid-Q3.

IMPACT IF NOT APPROVED
M3 forecast continues slipping. Without recovery, M3 misses by 8-12 working days, which cascades to M4 (parallel run) and threatens the November 1 launch hard date. Probability of missing the Nov 1 date with no scope change: ~60%.

OPTIONS CONSIDERED
1. RECOMMENDED: Defer 32 lowest-priority reports to Q1 release. Recovers schedule, no current-budget delta.
2. Add 2 contract engineers for 8 weeks ($180K). Recovers schedule but exceeds budget and no qualified engineers identified.
3. Do nothing. ~60% probability of missing Nov 1 hard date with no recovery plan.

RECOMMENDATION
Approve option 1. The deferred reports represent < 0.4% of total report usage by view count. The Q1 follow-up release is already planned for governance / cleanup work and absorbs them cleanly. This preserves the Nov 1 date without budget impact.

DECISION-MAKER + DUE BY
- Decision-maker: Tom Reyes (Sponsor)
- Decision needed by: 2026-04-16
- Reason for that date: M3 work breakdown locks April 18; later changes cost rework.

SIGN-OFFS
Sponsor — Tom Reyes:_________________  Date:______
PM:_________________________________  Date:______
Workstream leads:____________________  Date:______
```

---

## 5. Kickoff agenda — 60-minute working session

```
PROJECT KICKOFF — Q3 DATA WAREHOUSE MIGRATION — Feb 17, 10 AM - 11 AM

OPENING (5 min) — PM
- Why we're here. The outcome in one sentence.

CHARTER WALKTHROUGH (15 min) — PM
- Scope IN / OUT. The two-out-of-three call. Top 5 risks.

STAKEHOLDER ROUND (15 min) — Each lead, 2-3 min
- Workstream introductions, % allocation, anything we don't know that we should.

CADENCE + COMMS (10 min) — PM
- Weekly status report Monday. Working sync Tuesday. Steering monthly. RAID lives in [tool]. Escalation path.

DECISIONS / OPEN QUESTIONS (10 min) — All
- 3 named open questions for sponsor input.

CLOSE (5 min) — PM
- Next 3 actions, owners, dates.
```

---

## 6. Lessons-learned format

```
LESSONS LEARNED — [Project] — [Date of close]

WHAT WORKED
- [3-5 specific behaviors or decisions. Specific. "Held a weekly cross-functional risk review starting in M1" beats "communication was good."]

WHAT DIDN'T
- [3-5 specific. Name it without sanding the edges. "Vendor schema validation was scheduled too late in M2 to catch the wrong-env delivery; cost us 8 days" beats "had some vendor issues."]

WHAT WE'D DO DIFFERENTLY
- [3-5 specific. Concrete enough for the next PM to use. "Move vendor schema validation from M2 entry to M1 exit; require sample export 30 days before M2 begins" beats "improve vendor management."]

HONESTLY-EVALUATED RISKS
- Top 5 risks from charter: which materialized, which didn't, did we over- or under-rate them?

THANK-YOUS
- [Names + what they specifically did. Public credit is cheap and effective.]

ARCHIVE LOCATION
- [Where the charter, RAID, status reports, CRs, and supporting docs live]
```

The "what didn't" section is where lessons-learned earn their keep. Sand the edges off and the next project repeats the mistake.
