# Memory — Chiropractor Pack

## Domain context

A chiropractor's day is split between new-patient evaluations (longer, history + exam + plan), follow-up adjustments (shorter, focused), and re-evaluations (formal progress check, often required by insurers). Multi-disciplinary clinics add coordination with massage therapists, athletic therapists, PTs, and sometimes MDs/NPs. Documentation drives both insurance reimbursement and the regulatory record — provincial colleges and state boards audit charts.

Success looks like: the patient understands the plan, the documentation supports the visit code, the treatment plan has a clear re-evaluation point, and the insurer doesn't deny on documentation grounds. The chiropractor is autonomous within scope, which means they own the red-flag screen — there's no referring physician between the patient and the adjustment.

Scope of practice is heavily jurisdiction-dependent. US states vary on X-ray, dry needling, soft-tissue scope, nutritional advice, and even what title can appear on signage. Canadian provinces regulate independently through their chiropractic colleges (CCO Ontario, ACAC Alberta, CCBC BC, OCQ Quebec). Health-claim advertising rules are strict in some provinces — what a DC can say in a handout, on a website, or in a chart note differs by jurisdiction. The AI must not draft claims the user's regulator wouldn't permit.

Evidence quality varies across conditions chiropractors treat. Spinal manipulation has reasonable evidence for acute and subacute low back pain and neck pain; it's weaker for many other conditions. The pack treats evidence honestly — claims are qualified, alternatives are mentioned, patients are told what's known and what isn't.

## Vocabulary the AI should know

- **DC:** Doctor of Chiropractic.
- **HVLA:** High-Velocity Low-Amplitude — the classic adjustment technique.
- **Drop / activator / SOT / Gonstead / diversified / Thompson:** named technique systems.
- **Subluxation:** traditional chiropractic term for a vertebral mis-alignment with functional consequence; evidence base for the classical model is contested. Many DCs document with biomechanical terms instead (e.g., "restricted segmental motion," "joint dysfunction") which align better with insurance and evidence frameworks.
- **PARQ:** Pain / Aggravating-Easing / Range / Quality (or similar mnemonic for HPI structure).
- **Orthopedic tests:** Kemp's, SLR, Slump, Spurling's, Hoffman's, Yeoman's, etc.
- **Neurologic exam:** dermatomes, myotomes, reflexes, upper motor neuron signs.
- **CMT:** Chiropractic Manipulative Therapy — billing-relevant term.
- **CPT codes (US):** 98940 (1-2 regions), 98941 (3-4 regions), 98942 (5 regions), 98943 (extraspinal). Plus exam codes 99201-99205 / 99211-99215.
- **ICD-10:** diagnosis coding. M54.5 (low back pain — sometimes split M54.50 / M54.51 depending on edition), M54.2 (cervicalgia), M99.x (segmental and somatic dysfunction).
- **Re-evaluation:** formal mid-care or end-of-care check; insurers often require it at intervals.
- **Maintenance / supportive / wellness care:** care after acute resolution; many US insurers don't reimburse; Canadian provinces vary.
- **Informed consent:** required, jurisdiction-specific; cervical manipulation often carries specific risk-disclosure language.
- **Vertebrobasilar insufficiency (VBI):** rare but serious — red flag for cervical adjustment; the 5 D's And 3 N's screen is standard.
- **Cauda equina:** lower spinal cord emergency — red flag.
- **Centralization / peripheralization:** McKenzie terms used by DCs and PTs alike.
- **PT, MT, AT, RMT:** Physical Therapist, Massage Therapist, Athletic Therapist, Registered Massage Therapist.

## Common workflows

- **New-patient intake:** patient arrives → history → exam → red-flag screen → working diagnosis → treatment plan drafted → consent obtained → first treatment. Output: intake summary, treatment plan summary, consent companion language, optionally patient education handout.

- **Follow-up visit:** patient returns → brief subjective update → focused re-exam → treatment delivered → SOAP note. Output: SOAP note documenting the visit and supporting the billing code.

- **Re-evaluation visit:** formal mid-plan or end-of-plan check → outcome measure comparison → goals reviewed → plan continued / progressed / modified / discharged. Output: re-evaluation note, updated plan or discharge summary.

- **Referral out:** red flag identified or condition outside scope → DC documents reasoning and refers to PCP / ER / specialist. Output: referral note with reasoning, ideally a draft letter to the receiving provider.

- **Patient education on a specific condition:** patient asks "what's wrong with me" or wants something to take home → DC produces a handout in neutral, evidence-anchored language. Output: 1-page patient education sheet.

## What to avoid / common mistakes

- **Evidence-unsupported claims.** Asthma, ear infections, immunity, fertility, colic — broad claims like these have led to regulatory complaints. The pack avoids them.
- **Anti-medical framing.** Positioning chiropractic against medicine has hurt the profession and individual DCs at regulatory hearings. Neutral framing is both ethically correct and protective.
- **Skipping the red-flag screen.** A treatment plan written before the screen is a treatment plan written for the wrong condition.
- **Generic treatment plans.** "Adjustments 3x/week for 6 weeks" without a measurable goal and a re-evaluation point doesn't survive insurance audit.
- **Reading X-rays beyond your training.** The DC may interpret biomechanical findings; if there's a question of pathology, the imaging gets a radiologist read.

## Tone / register

Two registers. With patients: warm, plain, neutral about other professions, evidence-honest. With the chart and the insurer: clinical, structured, ICD-10 coded, supporting the CPT code, demonstrating clinical reasoning. With regulators (if it ever comes to that): consistent with what's in the chart, defensible against claims of overreach. The pack defaults to the language a board reviewer would approve of, not the language that fills a marketing brochure.
