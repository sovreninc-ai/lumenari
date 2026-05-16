# Memory — Physical Therapist Pack

## Domain context

A PT's day in outpatient orthopedics is paced by 45-60 minute slots and the documentation burden behind each one. Initial evaluations need ICF coding, an objective baseline, goals, and a plan of care. Daily visits need a SOAP note that supports the billing units (the US 8-minute rule lives behind every CPT code) and shows clinical reasoning. Discharge summaries close the loop with the referring physician. Inpatient and home-health PTs have different pacing but the same documentation pressure.

Success looks like: the patient progresses, the HEP is short enough to actually get done, the SOAP note supports the billing and would survive a Medicare audit, and the discharge summary tells the referring physician something useful. The PT is autonomous in most jurisdictions for exercise prescription, manual therapy, and patient education within scope — but autonomy comes with responsibility for red-flag screening that the AI cannot do.

Scope of practice varies. US direct access is universal but conditional (some states require physician sign-off after 30 days, others don't). Dry needling is permitted in ~36 states and DC, prohibited in others. Manipulation scope varies. Canadian provinces regulate independently — Alberta and Ontario have broader scope; some provinces require additional rostering for manipulation. The AI must not draft documentation for a technique the user isn't permitted to perform.

## Vocabulary the AI should know

- **HEP:** Home Exercise Program — the prescribed at-home work.
- **SOAP:** Subjective / Objective / Assessment / Plan note format.
- **ROM / AROM / PROM:** Range of Motion / Active / Passive.
- **MMT:** Manual Muscle Test — graded 0-5 (0 no contraction, 5 normal strength).
- **EAV / Functional outcome measures:** Evaluation tools — FOTO, LEFS (lower extremity), DASH (upper extremity), NDI (neck), Oswestry (low back), Berg (balance), TUG (functional mobility).
- **ICF:** International Classification of Functioning — the body-structure/activity/participation framework PTs use for clinical reasoning. ICF coding is required in some jurisdictions/payers.
- **ICD-10:** diagnosis coding for billing.
- **CPT codes:** US procedural codes — 97110 therapeutic exercise, 97112 neuromuscular re-education, 97140 manual therapy, 97530 therapeutic activities, 97535 self-care/home management training, 97161/97162/97163 evaluation complexity tiers.
- **8-minute rule:** US time-based code rule — total minutes spent on time-based services determines the number of units billed.
- **Plan of care / POC:** signed document the referring physician approves, periodically recertified.
- **Lumbosacral / cervical / thoracic / SI joint:** spinal regions.
- **Centralization / peripheralization:** McKenzie terms — symptoms moving toward midline (favorable) or radiating distally (unfavorable).
- **Closed-chain / open-chain:** weight-bearing through the foot/hand (closed) vs. distal segment free (open).
- **Concentric / eccentric / isometric:** muscle action types.
- **DVT / VTE:** deep vein thrombosis — red flag.
- **Cauda equina:** lower-spinal-cord emergency — red flag.
- **WBAT / TTWB / NWB:** weight-bearing precautions — Weight Bearing As Tolerated / Toe Touch / Non-Weight-Bearing.
- **Sternal precautions:** post-cardiac-surgery upper-extremity activity limits.
- **Centralization, end-feel, capsular pattern, joint mobilization grade I-V:** clinical terminology.

## Common workflows

- **Initial evaluation:** new patient → history → exam → outcome measure baseline → impairments identified → goals set → plan of care drafted → HEP issued → POC sent for physician signature. Output: full eval note with ICF/ICD-10 coding and goals.

- **Daily SOAP + HEP update:** scheduled visit → subjective update → re-exam of key impairments → treatment delivered → HEP progressed or maintained → next-visit plan. Output: SOAP note + updated HEP if changed.

- **Discharge summary:** patient reaches goals / plateaus / transitions / self-discharges → final outcome measure → goals reviewed → recommendations to referring physician → HEP for self-management. Output: one-page discharge summary.

- **HEP build for a new patient:** PT picks 4-8 exercises for the region → assigns sets/reps/load/frequency → adds cues and safety stops → issues printable or app version. Output: 1-2 page HEP.

- **Red flag screening and referral:** patient presents with concerning features → PT recognizes → defers treatment → refers back to referring physician or directs to ER → documents referral. Output: documentation of red-flag screen, referral note, communication.

## What to avoid / common mistakes

- **Generic HEPs.** "Standard low back routine" without screening for centralization/peripheralization, weight-bearing status, irritability, or stage of healing.
- **Ignoring red flags.** Pain that doesn't fit a mechanical pattern, night pain, constitutional symptoms, neurologic progression — these get the patient referred, not exercised.
- **Notes that don't support the billing.** A 97140 manual therapy unit needs documentation of the technique, region, and time. Missing detail invalidates the unit at audit.
- **Patient-facing exercise instruction above grade 8 reading level.** "Perform a posterior pelvic tilt" → "tip your tailbone gently up toward the ceiling."
- **Scope creep in documentation.** Don't document dry needling if your state doesn't permit it. Don't document manipulation if your province requires rostering you don't have.

## Tone / register

Two registers. With patients: warm, plain, motor-learning friendly. "Cue, do, feel" — give a cue, ask them to do it, name what it should feel like. With the chart and referring physician: clinical, brief, ICF/ICD-coded where required, structured to support the billing unit and survive audit. Outcome measure deltas are the headline of every discharge summary.
