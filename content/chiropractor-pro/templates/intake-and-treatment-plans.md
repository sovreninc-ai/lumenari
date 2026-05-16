# Templates — Intake, Treatment Plans, Consent Companion, Patient Education

Four templates a DC actually uses. Each has a prompt and a worked example. Screen for red flags, verify claims against current evidence and your regulator's rules, individualize before patient delivery.

---

## 1. New-patient intake summary

### Prompt

```
Draft a new-patient intake summary.

Patient context (no PHI):
- Age range, sex, occupation, activity level
- Chief complaint and date of onset
- Mechanism of injury if applicable
- Prior care for this complaint and response
- Relevant comorbidities and medications (especially anticoagulants, immunosuppressants)

Exam findings I want documented:
- Postural / gait
- ROM of relevant regions with values
- Orthopedic and neurologic tests positive/negative
- Palpation findings
- Imaging interpretation if applicable

Working diagnosis or impression (placeholder OK):

Structure: demographics placeholder, chief complaint, HPI, PMH/PSH/Meds/Allergies/FH/SH, ROS focused on red flags, physical exam, imaging if applicable, red-flag screening summary, working diagnosis with ICD-10 placeholder, brief plan.

Screen for red flags first. End with "Screen and verify" block.
```

### Worked example (excerpt)

**Input:** 34-year-old male, office worker, intermittent low back pain x 3 weeks, started while moving boxes, no radicular features described, no prior care, on no medications, no relevant PMH. Postural exam shows mild forward head and rounded shoulders. Lumbar flexion 60% normal, extension 80% normal, pain at end range flexion. Negative SLR bilaterally. Negative slump. Strength and reflexes intact. Palpation: tenderness right L3-L5 paraspinals.

**Output (excerpt):**

> **Patient:** [placeholder] | **Date:** [placeholder] | **DC:** [placeholder]
>
> **Chief complaint:** Three weeks of intermittent right-sided low back pain, mechanical onset.
>
> **HPI:** 34-year-old male office worker presents with right-sided lumbar pain since approximately 3 weeks ago, onset during a move while lifting and twisting with boxes. Pain is described as dull, intermittent, worse with prolonged sitting and end-range forward bending, eased by walking and lying flat. No radiation below the buttock. Denies leg numbness, tingling, weakness, or bowel/bladder changes. No prior episodes. No prior care for this complaint. Current functional impact: difficulty sitting through full workday, limits weekend recreational activities.
>
> **PMH/PSH/Meds/Allergies/FH/SH:** No significant past medical history. No surgeries. No regular medications. NKDA. Non-smoker. Alcohol social. Family history non-contributory.
>
> **ROS (red-flag focus):**
> - Constitutional: no fever, no unexplained weight loss, no night sweats
> - Neurologic: no leg weakness, no saddle anesthesia, no bowel/bladder changes
> - Cardiac: no chest pain or dyspnea
> - GI/GU: no abdominal pain, no urinary changes
> - Skin: no rashes, no recent infections
> - History of cancer: none
> - Recent trauma: none beyond the lifting mechanism
> - Recent procedures or immunosuppression: none
>
> **Physical exam:**
> - Postural: mild forward head posture, mildly rounded shoulders, unremarkable lumbar curve
> - Gait: unremarkable
> - Lumbar AROM: flexion ~60% normal with pain at end range, extension ~80% normal pain-free, lateral flexion symmetric and full, rotation symmetric
> - Orthopedic tests: SLR negative bilaterally, slump negative, Kemp's right negative, Yeoman's negative
> - Neurologic: strength 5/5 bilateral lower extremities, sensation intact L1-S1, reflexes 2+ patellar and Achilles
> - Palpation: tenderness right L3-L5 paraspinal musculature, no spinous process tenderness, no SI joint tenderness
>
> **Imaging:** None obtained at this visit; not clinically indicated given absence of red flags and clear mechanical mechanism.
>
> **Red-flag screening summary:** Screened for cauda equina, fracture, vascular, cancer, infection, progressive neurologic deficit, inflammatory arthropathy features — all negative.
>
> **Working diagnosis:** Acute mechanical low back pain, paraspinal myofascial component. ICD-10: M54.5 [or M54.50 per current edition].
>
> **Brief plan:** See treatment plan document. Anticipated course of chiropractic care with home exercise and ergonomic recommendations; re-evaluation at 4 weeks.
>
> ---
> **Screen and verify before chart filing:**
> - Red flags screened: cauda equina, fracture, vascular, cancer, infection, neurologic progression, inflammatory features — all negative per patient report and exam
> - ICD-10 code current edition (M54.5 vs. M54.50/.51 split)
> - CPT exam code level supported by documentation (history, exam, decision-making)
> - Patient consent for treatment documented separately
> - Scope-of-practice fit for your jurisdiction

---

## 2. Treatment plan summary

### Prompt

```
Draft a one-page treatment plan summary.

Working diagnosis (with ICD-10 if known):
Patient context (no PHI): age range, occupation, activity level, patient's own goal in their words
Severity / functional impact:
Modalities I plan to use:
Expected frequency and duration before re-evaluation:

Structure: working dx + ICD-10, goals (pain target, functional gain, patient's own goal), treatment plan (modalities, frequency, duration before re-eval), home recommendations, re-evaluation point, anticipated discharge criteria, referral criteria, informed-consent reference.

End with "Screen and verify" block.
```

### Worked example (excerpt)

**Output (for the same low back patient above):**

> **Treatment plan — acute mechanical low back pain**
> Working diagnosis: M54.5 acute mechanical low back pain with right paraspinal myofascial component
> Date: [placeholder] | DC: [placeholder] | Patient: [placeholder]
>
> **Goals (12-week horizon)**
> - Pain reduction: VAS from current 5/10 to ≤2/10 with daily activities
> - Functional gain: sit through full workday without pain interruption; return to weekend recreational activities (cycling, yardwork)
> - Patient's own goal (in their words): "Be able to play tennis Saturday morning without paying for it on Sunday."
>
> **Treatment plan**
> - Modalities: chiropractic manipulative therapy to lumbar and SI regions as indicated by segmental findings each visit; soft-tissue work to involved paraspinal musculature; therapeutic exercise instruction; ergonomic counseling for desk setup
> - Frequency: 2x/week for the first 2 weeks, then 1x/week for 2 weeks
> - Duration before re-evaluation: 4 weeks (8 visits)
>
> **Home recommendations**
> - Lumbar stabilization home exercises (separate handout provided)
> - Ergonomic adjustments to desk setup (monitor height, chair, footrest) — handout provided
> - Walking 20-30 minutes daily as tolerated
> - Avoid prolonged sitting > 45 minutes without a movement break
>
> **Re-evaluation point**
> - 4 weeks (or 8 visits, whichever comes first)
> - Re-measure: VAS, lumbar AROM, repeat orthopedic screen, functional self-report
> - Decision: discharge to self-management / continue at reduced frequency / modify plan / refer out
>
> **Anticipated discharge criteria**
> - VAS ≤2/10 with daily activities
> - Lumbar ROM functional
> - Patient independent with home program
> - Return to recreational activity confirmed
>
> **Referral criteria**
> - New neurologic findings (weakness, sensory loss, bowel/bladder changes)
> - Failure to progress at 4 weeks
> - New systemic symptoms (fever, weight loss, night pain)
> - Suspicion of fracture, infection, or other non-mechanical cause
>
> **Informed consent:** Signed consent form on file. Re-consent required for any change in technique.
>
> ---
> **Screen and verify before patient delivery:**
> - Red flags re-screened at this visit
> - Frequency and duration evidence-supported for acute mechanical LBP (current evidence supports limited course with re-evaluation)
> - Claims about expected outcome qualified honestly
> - ICD-10 / CPT alignment
> - Patient's own goal in their words, not interpreted
> - Scope-of-practice fit for your jurisdiction

---

## 3. Informed-consent companion language

### Prompt

```
Draft informed-consent companion language for a patient receiving [specific technique — e.g., cervical manipulation, lumbar manipulation, soft-tissue work, instrument-assisted technique].

Patient context (no PHI): age range, sex, relevant medical history
Jurisdiction: [state or province]

This is COMPANION language to be reviewed with the patient verbally. It is NOT the signed consent form — that is jurisdiction-specific and reviewed by my malpractice carrier.

Structure: what the technique involves, expected benefits (qualified, honest), known risks (common and rare), alternatives, right to refuse or stop, re-consent for change in technique.

For cervical manipulation, include jurisdiction-specific stroke-risk language requirements where mandated.

End with "Screen and verify" block.
```

### Worked example (excerpt, cervical manipulation in a jurisdiction with mandated VAD discussion)

> **Informed consent companion — cervical manipulation**
>
> **What this technique involves**
> Cervical manipulation is a controlled, high-velocity low-amplitude movement applied to a specific joint in your neck. The intent is to restore movement to a joint that's not moving normally. You may hear a popping sound — this is gas releasing from the joint, not a sign of injury.
>
> **Expected benefits**
> For neck pain of recent onset, cervical manipulation may reduce pain and improve range of motion in many patients. Evidence supports its use as one option among several. Benefit is not guaranteed for any individual.
>
> **Known risks**
> - Common (mild, short-lasting): soreness, stiffness, headache, or fatigue for 24-48 hours after treatment. These typically resolve on their own.
> - Rare: there is a rare association between cervical manipulation and vertebral artery dissection, which can lead to stroke. The absolute risk is very low (estimated less than 1 in 100,000 treatments in most studies). The association may not be causal — patients with developing dissection sometimes seek care for neck pain before the dissection is recognized. We screen for risk factors and signs of vascular concern before treatment.
> - We screen for any sudden neurologic changes including dizziness, drop attacks, double vision, slurred speech, swallowing difficulty, balance loss, nausea, numbness, or eye movement changes. If any are present or develop, we will stop and refer for medical evaluation.
>
> **Alternatives**
> - Mobilization (lower-velocity technique with similar intent)
> - Soft-tissue therapy alone
> - Physical therapy
> - Medical management (medication, injection, surgical evaluation)
> - Watchful waiting (most acute neck pain resolves over weeks)
> - No treatment
>
> **Your rights**
> You may refuse this technique at any time, including in the middle of a treatment plan. We will not be offended. We can adapt your plan to use only techniques you're comfortable with. We will re-consent with you if we propose any change in approach.
>
> ---
> **Screen and verify before patient discussion:**
> - Jurisdiction-specific consent-form language on file (this companion language does NOT replace your signed consent form)
> - VAD risk language matches your regulator's current required disclosure
> - Patient has been screened for VBI signs and risk factors
> - Patient has had the opportunity to ask questions
> - Re-consent process documented for any technique change

---

## 4. Patient education on a specific condition

### Prompt

```
Build a one-page patient education handout for [condition].

Patient context (no PHI): age range, literacy estimate, language preference

Tone: neutral, evidence-anchored, honest about uncertainty, not anti-medical.
Structure: what we found (plain language), what we know about this condition (neutral), what chiropractic care involves for this condition (honest about evidence strength), what you can do between visits, other things people try (neutral mention of alternatives), what we'd refer you out for, when to come back.

Reading level grade 6-8. 400-700 words. End with "Screen and verify" block.
```

(Worked example follows the same neutral-language pattern as the NP and PT patient education handouts, with the addition of explicit "we'd refer you out for X" criteria and an "other things people try" section that names medical management, physical therapy, and watchful waiting as legitimate alternatives.)
