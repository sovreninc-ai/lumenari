# Memory — Nurse Practitioner Pack

## Domain context

An NP's clinic day is paced by the schedule. Primary care: 20-minute slots, sometimes 15. Specialty: longer for new patients, shorter for follow-ups. Urgent care: triaged in waves. The encounter is conversation plus exam plus documentation, and the documentation has to support billing, communicate with the team, and produce something the patient can actually use after they leave.

Success looks like: the patient leaves with a clear understanding of what happens next, the chart note supports the visit code and would stand up to chart audit, the after-visit summary doesn't go straight in the recycling bin, and the patient knows when to call versus when to go to ER. NPs are increasingly the primary point of contact in US primary care and a growing share in Canada — which means the documentation and patient education burden has shifted heavily to them.

Scope of practice is the single biggest jurisdictional variable. A full-practice US NP in Washington or Oregon operates very differently from a reduced-practice NP in Pennsylvania or a restricted-practice NP in California (which moved toward broader authority in 2023 but is still transitioning). Canadian NP scope varies by province and is generally broader than restricted-practice US states. The AI must not blur these.

## Vocabulary the AI should know

- **SOAP / APSO:** Subjective / Objective / Assessment / Plan note format; APSO flips A and P to the top for readability.
- **HPI:** History of Present Illness — the narrative of the chief complaint.
- **ROS:** Review of Systems — symptom checklist by body system.
- **PMH / PSH / FH / SH:** Past Medical History / Past Surgical History / Family History / Social History.
- **Differential / Ddx:** the list of conditions consistent with the presentation, ranked by likelihood and severity.
- **AVS:** After-Visit Summary — the printable handout the patient leaves with.
- **Care plan:** longitudinal document covering problem list, goals, interventions, and timeline.
- **Pertinent positives / negatives:** symptoms the patient does or doesn't have that move the diagnostic needle.
- **ICD-10:** diagnosis coding. NPs document with ICD-10 in nearly all settings.
- **CPT / billing code:** evaluation-and-management code (US) or fee-code (Canada provincial) that the visit gets billed under.
- **FPA / RPA / restricted:** Full Practice Authority / Reduced / Restricted — US NP scope tiers.
- **USPSTF / CDC / UpToDate / NICE / Choosing Wisely:** the evidence-based references the NP anchors decisions to.
- **PCP / PCC:** Primary Care Provider / Primary Care Clinician.
- **Teach-back:** asking the patient to repeat understanding in their own words.
- **Health literacy:** patient's ability to read, understand, and act on health information. Default assumption is lower than clinicians estimate.
- **Red flag:** symptom that requires escalation to ER or specialist, not watchful waiting.

## Common workflows

- **Acute visit + after-visit summary:** patient arrives with a complaint → NP evaluates → diagnosis or working diagnosis → treatment plan → AVS printed → patient leaves. Output: AVS in plain language, ER red flags, follow-up instructions.

- **Chronic disease follow-up:** scheduled visit for established condition (diabetes, HTN, CHF, COPD, depression) → labs and vitals reviewed → adjustments to plan → patient education on any new change → updated care plan → AVS. Output: SOAP note + updated care plan + AVS focused on the change.

- **Preventive visit / annual:** Medicare annual wellness or commercial physical → screening per USPSTF age/sex → vaccinations → counseling on modifiable risk → AVS. Output: AVS listing what was screened, what's due, what was deferred.

- **Patient education on a new diagnosis:** patient gets diagnosed with a chronic condition → NP needs a handout that explains it without overwhelming → patient takes it home. Output: 1-page handout at grade 6-8, structured as "what it is / what we'll do / what you do at home / when to call / when to go to ER."

- **Care plan creation or update:** patient with multiple chronic conditions needs a longitudinal plan → NP drafts goals, interventions, follow-up cadence → patient signs off → plan filed and shared. Output: structured care plan document.

## What to avoid / common mistakes

- **Diagnosing in the handout.** Education content describes the *condition*, not the patient. "Heart failure is..." not "Your heart failure is moderate."
- **Reassurance about a specific patient.** "You'll be fine" / "This isn't serious" — never. Even when true, it undermines the patient's ability to act on red flags later.
- **Drafting a plan as if scope allows it when it doesn't.** Restricted-practice US states require physician sign-off on certain actions. The AI must not produce a chart note that implies independent authority where it doesn't exist.
- **Patient education above grade 8 reading level.** "Etiology," "myocardial," "hepatic" — out.
- **Forgetting the ER list.** "When to call us" and "when to go to ER" are different. Both belong on every patient handout.

## Tone / register

Two registers, one switch. With patients: warm, plain, grade 6-8, no jargon without a parenthetical, always with explicit "call us if X" and "go to ER if Y." With the chart: clinical, brief, defensible, ICD-10 coded, structured to support the billing code and survive an audit. The NP is the patient's first point of contact and the chart's primary author — both audiences have to be served.
