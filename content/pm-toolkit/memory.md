# Memory — Product Manager Toolkit

## Domain context

Product management is the unglamorous middle layer between what users want, what engineering can build, and what the business needs to grow. The PM's job is decision-making under incomplete information: deciding what to build, in what order, with what tradeoffs, and how to know whether it worked. The artifacts a PM ships — PRDs, roadmaps, sprint plans, stakeholder updates, metrics readouts — exist to make those decisions visible and reviewable.

A typical week: roughly 40% in meetings (planning, reviews, customer calls, 1:1s, leadership readouts), 30% writing (specs, updates, decision docs, follow-up Slack threads), 20% on customer or data research, and 10% on whatever the surprise of the week is. PMs at startups tilt more toward writing and customer time; PMs at larger companies tilt more toward meetings and stakeholder management. The output that travels furthest is written — execs read your update on a phone, sales reps quote your roadmap in deals, engineers reference your PRD weeks after the kickoff. Writing clearly is the actual job.

Success looks like: the team ships work that moves a metric the company cares about, on a timeline close enough to what you said you'd ship that nobody is surprised. Failure looks like: you ship the feature on time, but the metric doesn't move, and nobody can tell you why. The good PM spends as much energy on "how will we know it worked" and "what's the next experiment if it doesn't" as on the building itself.

## Vocabulary the AI should know

- PRD: Product Requirements Document. The spec for a feature or initiative.
- BRD: Business Requirements Document. Older, broader, less common in modern shops.
- Spec: shorthand for PRD or any design doc.
- Now/Next/Later: roadmap format. Three buckets, no dates beyond quarter granularity.
- OKR: Objectives and Key Results. A goal-setting framework. Useful as a tool, not a religion.
- KR: Key Result. The measurable part of an OKR.
- North Star metric: the single output metric a team or company orients around.
- AARRR / Pirate Metrics: Acquisition, Activation, Retention, Referral, Revenue. The classic funnel.
- JTBD: Jobs-to-be-done. Framework for understanding what users hire your product to do.
- ICE: Impact, Confidence, Ease — a prioritization rubric.
- RICE: Reach, Impact, Confidence, Effort — a more detailed prioritization rubric.
- Acceptance criteria: the checklist for "is this feature done."
- DoD: Definition of Done. Team-level criteria that applies to every story.
- DAU / WAU / MAU: Daily / Weekly / Monthly Active Users.
- Activation: a user reaching the first meaningful moment of value. Definition is product-specific.
- Retention curve: cohort retention over time. Flat is the goal; declining curves mean churn.
- LTV / CAC: Lifetime Value / Customer Acquisition Cost. The math that determines whether growth is healthy.
- NPS: Net Promoter Score. Survey-based loyalty metric. Directionally useful, not load-bearing.
- ICP: Ideal Customer Profile. The customer the product is built for.
- Sprint, standup, retro, refinement: scrum vocabulary. Use even if your team isn't strict about scrum.
- Velocity, capacity, burndown: the planning math. Capacity is hours; velocity is story points or items shipped.
- Carryover: work that didn't finish in the prior sprint. Manage it explicitly; don't let it pile up.

## Common workflows

- **Write a PRD:** problem → goal → non-goals → success metrics → acceptance criteria → scope → open questions. The Non-goals section does the most work; it's where you head off "but what about X" before it derails the kickoff.
- **Update a roadmap:** start from the current Now/Next/Later, look at last quarter's actual delivery, adjust Confidence (High/Med/Low) on each item, move items between buckets, then re-share with one paragraph of context on what changed.
- **Plan a sprint:** capacity math first (PTO, on-call, meetings subtracted from nominal hours), then carryover triage, then P0 / Stretch / Won't-do. Write the sprint goal in one sentence at the top.
- **Run a metrics review:** pick 3-5 metrics that matter most, write trend / compared-to / hypothesis / follow-up for each. Bury the noise.
- **Send a stakeholder update:** start from the engineering-detail version (~400 words), then compress to the exec brief (~200) and the customer-facing (~150). Same content, three audiences.
- **Triage customer feedback:** cluster by theme, count frequency, weight by ICP fit, drop into the backlog with a one-line outcome attached.

## What to avoid / common mistakes

- **PRD bloat.** A 12-page PRD for a 2-day feature signals to engineering that you don't know what you actually want. Match doc length to feature size.
- **Roadmap with "Q3" precision treated as commitment.** "Later" means "Later." Don't promise a quarter you haven't actually planned.
- **OKR cargo-culting.** Setting OKRs because the company runs OKRs, not because you have a goal to set. Worse: writing KRs that aren't actually measurable.
- **Pretending one metric is enough.** A North Star is useful, but most teams need 2-4 metrics — usage, activation, retention, revenue — to know what's really happening.
- **The "leverage" sentence.** "We need to leverage our existing user base to unlock new growth verticals." Cut every word of this.
- **Writing the PRD before the customer conversation.** If you can't quote a user, you don't know the problem yet.
- **Vague asks in stakeholder updates.** "Let me know if you have questions." That's not an ask. State what decision you need or what intro you want.
- **Confusing roadmap items with feature names.** "Build saved searches v1" is a feature. "Cut 'lost my view' tickets 50%" is an outcome. Roadmaps live on outcomes.

## Tone / register

A real PM sounds direct, slightly tired, and unfailingly specific. They know the difference between "users want this" (which is usually noise) and "12 customers asked for this in the last 8 weeks" (which is signal). They don't oversell their work; they let the numbers and the user quotes do the lifting. In writing, they default to short sentences, named users when possible, and explicit dates and counts. They are allergic to vague verbs: "leverage," "unlock," "drive," "double down," "transform." When they say "yes" to a feature, they mean it; when they say "not now," they also mean it, and they can explain why without flinching. The voice should sound like someone who has shipped product, not like someone reading a McKinsey deck.
