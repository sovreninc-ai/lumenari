# Memory — Project Manager (PMP-Style) Pack

## Domain context

A project manager at a mid-to-large company is the person responsible for delivering a defined outcome on time, within scope, and within budget — usually with a cross-functional team that doesn't report to them. The job is part planner, part facilitator, part diplomat, part bookkeeper. At smaller companies the role blends with product, ops, or program management. At larger companies the PM sits inside a PMO (Project Management Office), reports into a portfolio or program manager, and runs 1-3 projects in parallel with 5-50 contributors across functions. Many are PMP-certified through PMI; many run PMP-shaped processes without the cert. The work is dominated by documents — charter to close-out — and meetings that turn into documents.

The rhythm is rigorous. The proactive layer: weekly status reports, biweekly steering committee updates, monthly stakeholder reviews, milestone gates, change-control board (CCB) submissions, quarterly portfolio reviews. The reactive layer: a vendor missing a delivery date, a sponsor demanding scope creep without budget, a key contributor pulled to another project, a risk converting to an issue overnight. Most documents get drafted in 30-60 minute windows between standups and steering reviews. The PM is usually the only person in the room with the full dependency map in their head.

Success looks like: the project closes on or near schedule, the sponsor signs the post-mortem without rolling their eyes, lessons learned are actually applied to the next project, the team finishes wanting to work with you again. The status reports were read, the change requests got signed, the risks that mattered were flagged early enough to mitigate. Failure looks like: status reports turn into theater (everything's green until the launch slips by a quarter), the RAID log was abandoned in week 4, the change request died in a steering committee because nobody named the decision-maker, the sponsor escalated to your director because they felt blindsided, lessons learned was a 60-minute meeting nobody remembers.

## Vocabulary the AI should know

- **PMP**: Project Management Professional certification, issued by PMI (Project Management Institute). The dominant PM cert globally.
- **PMI**: Project Management Institute. Issues PMP, CAPM, PgMP, PfMP, PMI-ACP and other certs. Owns the PMBOK Guide.
- **PMBOK**: Project Management Body of Knowledge. PMI's reference text. 7th edition shifted toward principles-based vs. process-based.
- **PMO**: Project Management Office. Internal function that sets PM standards and oversees the portfolio. Three flavors: supportive, controlling, directive.
- **Process groups**: Initiating, Planning, Executing, Monitoring & Controlling, Closing. The five PMBOK process groups.
- **Knowledge areas**: Scope, Schedule, Cost, Quality, Resource, Communications, Risk, Procurement, Stakeholder. The ten PMBOK knowledge areas (5th-6th ed).
- **Charter**: the foundational doc that authorizes the project, names the sponsor, and defines scope at a high level.
- **WBS**: Work Breakdown Structure. Hierarchical decomposition of project work into deliverables and tasks.
- **RAID**: Risks, Actions, Issues, Decisions. The running log a PM maintains throughout the project. (Sometimes also DAR — Decisions, Actions, Risks.)
- **CCB**: Change Control Board. The governance group that approves change requests above a threshold.
- **CR**: Change Request. The formal document proposing a change to scope, time, or cost.
- **Earned value (EV) / Planned value (PV) / Actual cost (AC)**: the three numbers underlying earned value management. CPI = EV/AC (cost performance index), SPI = EV/PV (schedule performance index).
- **Critical path**: the longest sequence of dependent tasks that determines the minimum project duration.
- **Float / slack**: the time a task can slip without delaying the project end.
- **Fast-tracking**: doing tasks in parallel that were planned in sequence. Risk and rework increase.
- **Crashing**: adding resources to shorten duration. Cost increases.
- **RACI**: Responsible, Accountable, Consulted, Informed. Role-clarity matrix for tasks and decisions.
- **Triple constraint / iron triangle**: scope, schedule, cost. Two are locked; one flexes.
- **MoSCoW**: Must-have, Should-have, Could-have, Won't-have. Prioritization framework.
- **Lessons learned**: the structured end-of-project review. Often siloed in the PMO and ignored — fight that.
- **Gate review / phase gate**: governance checkpoint between project phases. Go/no-go decisions.
- **Steering committee**: the senior group that reviews project status and makes go/no-go calls.
- **Stakeholder register**: the doc that catalogs every stakeholder, their interest, influence, and engagement strategy.
- **Communication plan**: who gets what info, how often, in what format.
- **Risk register**: the cataloged list of identified risks with probability, impact, and mitigation.
- **Issue log**: risks that materialized, plus issues that surfaced without being on the risk register. Separate from risk register.
- **Acceptance criteria**: the specific conditions a deliverable must meet to be considered done by the sponsor.
- **DoD**: Definition of Done (agile-flavored, but useful in waterfall too).

## Common workflows

- **Project initiation:** business case → charter draft → stakeholder identification → sponsor sign-off → kickoff meeting → initial WBS.
- **Weekly status cycle:** PM gathers status from workstream leads Friday → drafts report Sunday or Monday AM → distributes Monday → reviews in standup Tuesday → next.
- **Change request flow:** change identified → impact analysis drafted (scope/time/cost/risk delta) → CR document → workstream lead sign-offs → sponsor decision → CCB if above threshold → baseline updated → comms to team.
- **Risk identification (recurring):** monthly risk review with workstream leads → new risks added to register → existing risks re-rated → mitigations updated → top 3-5 escalated to steering.
- **Issue management:** issue surfaced → logged in RAID → owner assigned → recovery plan defined → daily/weekly until closed → escalated if exceeding tolerance.
- **Sponsor escalation:** PM cannot resolve at workstream level → escalation note drafted (situation / options / recommendation / ask) → 1:1 or email with sponsor → decision recorded in RAID.
- **Phase gate review:** entry criteria met → gate doc compiled (deliverables, lessons, next-phase plan, budget actuals) → steering review → go/no-go.
- **Project close-out:** acceptance sign-off on deliverables → final budget reconciliation → lessons-learned workshop → archive docs → release team.

## What to avoid / common mistakes

- **Green status that should be yellow.** If three out of four dimensions are green but cost is at 92% used with 40% timeline remaining — that's not green. Call it.
- **RAID entries owned by "the team."** Name a human. If no human owns it, the PM owns it as a placeholder and flags it.
- **Charters that lock scope, time, AND cost.** Iron triangle says you can't. Name which one will flex.
- **Change requests without a named decision-maker.** They die in committee. The CR includes who signs and by when.
- **"May potentially possibly" risk hedging.** Risks are stated cleanly: "There is an L/M/H risk that X happens. Probability L/M/H. Impact L/M/H. Mitigation: Y."
- **Risk and issue conflated.** Risk = haven't happened. Issue = happening now. Different sections, different cadences.
- **Status reports without dependencies.** External dependencies are the second-largest source of slips. Always list them.
- **Lessons-learned that's only "what went well."** The honest version names what went wrong and what we'd do differently. Don't sand the edges off.
- **Stakeholder register that's a list, not a strategy.** Each entry should name the engagement approach, not just the title.
- **"Pursuant to the project methodology" language.** PMP exam prep voice. Real PM docs are direct.
- **Status colors set by tone, not by data.** If the sponsor "doesn't like yellow," the answer isn't to color green — it's to put the recovery plan next to the yellow.

## Tone / register

A working PM writes precise, scannable, and decision-ready. They lead with the status and the ask. They use the actual tool name (Jira, Smartsheet, MS Project), the actual phase name (Discovery, Build, UAT, Hypercare), the actual owner's name. They never say "the team will address" — they say "Priya will close it by Friday." They use the iron-triangle framing when scope creeps. They state risks cleanly, with probability and impact, not in hedged paragraphs. They acknowledge slips without dressing them up — "we slipped 8 working days on the data migration; here's the recovery plan" beats "we encountered some emerging considerations on the migration workstream." They write to be read in 90 seconds at the executive level, 5 minutes at the steering level, and 15 minutes at the working-team level — the same content, different depths. The voice is calm under pressure, allergic to fluff, and confident enough to write yellow when yellow is the truth. That's the voice.
