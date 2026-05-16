# Templates — Patient Education, Visit Summaries, Care Plans

Four templates an NP actually uses. Each has a prompt and a worked example. Verify against current guidelines and individualize before patient delivery.

---

## 1. Patient education handout

### Prompt

```
Draft a one-page patient education handout for [condition].

Patient context (no PHI):
- Age range: [30s, 60s, etc.]
- Sex: [M/F]
- Relevant comorbidities: [list]
- Literacy estimate: [low / average / high]
- Language: [English / other]
- Setting where they'll receive it: [primary care, urgent care, specialty]

Specific patient questions or concerns to address:
- [question 1]
- [question 2]

Structure: what it is, what causes it / what we know, what you can do at home, what we'll do together, when to call us, when to go to ER, 3-5 questions for next visit.

Length: 400-700 words. Reading level grade 6-8 unless I say otherwise. Address the patient's specific questions in GENERAL terms — describe how the condition typically goes, not predictions for this specific patient.

End with "Review and individualize" block.
```

### Worked example (excerpt)

**Input:** Newly diagnosed hypertension, 55-year-old woman, otherwise healthy, average literacy, English, primary care setting. Patient asked: "Do I really need medication? Can't I just exercise more?"

**Output (excerpt):**

> **High blood pressure: what to know**
>
> **What it is**
> High blood pressure (also called hypertension) means the force of blood pushing against the walls of your blood vessels is higher than it should be. Over time, this extra force can damage your heart, brain, kidneys, and eyes — usually without you feeling anything until something serious happens.
>
> **What causes it / what we know**
> For most people, there isn't one single cause. Family history, age, weight, salt, alcohol, stress, and sleep all play a part. Most people have what's called "primary" or "essential" hypertension, which means we treat the blood pressure itself because we can't point to one specific cause.
>
> **What you can do at home**
> 1. Take your blood pressure 2-3 times a week. Write it down or use an app.
> 2. Aim for 30 minutes of moderate activity most days.
> 3. Reduce salt: aim for less than 2,300 mg of sodium per day (about 1 teaspoon). Read labels.
> 4. Limit alcohol: no more than 1 drink per day for women, 2 for men.
> 5. Sleep 7-8 hours when you can.
> 6. Get a stress-reducing habit you'll actually do.
>
> **What we'll do together**
> Some people can lower their blood pressure with lifestyle changes alone — usually those with mild elevations and lots of room to change habits. Others need medication, sometimes for life, sometimes temporarily. Your provider will look at your numbers, your other health information, and your goals before deciding with you. If we start a medication, we'll review the plan at every visit and adjust as needed.
>
> **Call us if you have:**
> - Headaches that won't go away
> - Dizziness or feeling faint
> - Vision changes
> - A home reading above 160/100 that's not coming down with rest
>
> **Go to ER if you have:**
> - Sudden severe headache
> - Chest pain or pressure
> - Trouble speaking or moving one side of your body
> - Sudden vision loss
> - Shortness of breath at rest
> - A home reading above 180/120
>
> **Questions to ask at your next visit**
> 1. What's a realistic blood pressure goal for me?
> 2. How will we know if lifestyle changes are working?
> 3. What side effects should I watch for if I'm on medication?
> 4. How often should I be checked?
> 5. Is there anything in my family history that changes my plan?
>
> ---
> **Review and individualize before patient delivery:**
> - BP targets per current ACC/AHA or Hypertension Canada guideline edition
> - Sodium target appropriate for this patient (kidney function, comorbidities)
> - Alcohol limits per current CCSA / NIAAA guidance
> - Whether "medication for life" framing fits this patient's stage and trajectory
> - Patient's literacy and language match the handout

---

## 2. SOAP / APSO note scaffold

### Prompt

```
Scaffold a SOAP note for a visit I just finished. APSO if my EHR prefers.

Patient context (no PHI): age range, sex, relevant PMH, current meds
Visit type: [acute / chronic follow-up / annual / pre-op / etc.]
Chief complaint:
HPI in 2-3 sentences:
Pertinent ROS positives and negatives:
Vitals and exam findings I want documented:
Working diagnosis / differential:
Plan elements I want included:

Structure: S → O → A (with ICD-10 placeholder) → P (one per problem with meds, tests, referrals, education, follow-up).
Include "Patient instructions given" line.

End with "Review and individualize" block.
```

### Worked example (excerpt)

**Output (for an acute visit, lower back pain):**

> **S:** 42-year-old male presents with low back pain x 5 days, started after lifting a heavy box. Pain is right paraspinal, lumbar, 6/10, dull-aching, worse with sitting and forward flexion, better with walking and lying flat. Denies radicular pain to leg, no numbness or tingling, no weakness, no bowel/bladder changes, no fever, no IV drug use, no recent unexplained weight loss, no history of cancer. Has tried ibuprofen 400 mg occasionally with partial relief.
>
> **O:** Vitals stable, afebrile. Ambulating without antalgic gait. Lumbar exam: tenderness over right paraspinal muscles L3-L5, no spinous process tenderness. Range of motion limited in flexion to ~40°, full extension. Negative straight leg raise bilaterally. Strength 5/5 bilateral lower extremities. Sensation intact L1-S1 dermatomes. Reflexes 2+ patellar and Achilles bilaterally.
>
> **A:** Acute mechanical low back pain, no red flags. ICD-10: M54.5 (or M54.50 / M54.51 per current edition).
> Differential considered and ruled out for this visit: lumbar radiculopathy (negative SLR, no radicular features), cauda equina (no bowel/bladder/saddle anesthesia), inflammatory or infectious cause (no constitutional symptoms, no risk factors), malignancy (no risk factors).
>
> **P:**
> 1. **Mechanical low back pain:**
>    - Continue NSAID — ibuprofen 600 mg with food every 8 hours PRN x 7 days, or as tolerated
>    - Encourage early movement, avoid bed rest
>    - Heat or ice as preferred
>    - Provided lumbar stretching handout
>    - Return if no improvement in 2 weeks, sooner if any new neurologic symptoms, fever, or bowel/bladder changes
>    - Patient instructions given: red flags reviewed in detail (saddle anesthesia, urinary retention, bilateral leg weakness — go to ER), expected recovery 1-4 weeks for mechanical pain, importance of staying active.
>
> ---
> **Review and individualize before signing:**
> - Current ICD-10 specificity (M54.5 vs. M54.50/.51 per edition in use)
> - NSAID appropriateness given this patient's renal/GI/CV risk
> - Red-flag list completeness for this patient
> - Whether referral threshold differs in your practice setting
> - Scope of practice fit for documentation in your state

---

## 3. After-visit summary sheet

### Prompt

```
Draft a one-page after-visit summary for the patient to take home.

Visit type: [acute / chronic / annual / urgent care]
Reason for visit:
What was found (plain language):
What was done (tests, treatments, prescriptions):
Patient actions needed (numbered):
Medications prescribed or continued: name, dose, when, what it does, watch-fors
When to come back:
Call-us-if list:
Go-to-ER-if list:
Open questions space at the bottom

Reading level grade 6-8. One page.

End with "Review and individualize" block.
```

(A full worked example follows the same plain-language pattern as the patient education handout.)

---

## 4. Care plan for multi-condition patient

### Prompt

```
Build a care plan for a patient with multiple chronic conditions.

Patient context (no PHI): age range, sex, problem list, current meds (drug-class OK)
Goals the patient cares about: [from the conversation]
Setting: [primary care / clinic-based chronic care / etc.]
Time horizon: [3 months / 6 months / 1 year]

Structure: problem list, SMART goal per problem, interventions per problem (meds, lifestyle, monitoring), follow-up cadence, patient self-management actions, red flags, care team contacts, next review date.

End with "Review and individualize" block.
```

### Worked example (excerpt, 68-year-old with T2DM + HTN + CKD3)

> **Problem list:**
> 1. Type 2 diabetes mellitus, A1c trending up over 6 months
> 2. Hypertension, BP above target at last 3 visits
> 3. Chronic kidney disease stage 3, stable
>
> **Goals (SMART, agreed with patient):**
> 1. T2DM: A1c < 7.5% by next 3-month review (individualized — not 7.0% given age and CKD)
> 2. HTN: home BP average < 130/80 by next 3-month review
> 3. CKD: maintain eGFR stable, avoid nephrotoxic exposures
>
> **Interventions per problem:**
> 1. T2DM: review current regimen, consider SGLT2i appropriateness given CKD3 benefit profile and eGFR threshold (provider-decision item), continue glucose log review monthly, dietitian referral
> 2. HTN: home BP monitoring 3x/week, sodium target 2,000 mg, review ACE/ARB dose, recheck in 4 weeks
> 3. CKD: avoid NSAIDs, annual urine ACR, annual eGFR, contrast precautions documented
>
> **Patient self-management:**
> - Glucose log: 2 readings per day (fasting + post-dinner)
> - BP log: 3 days per week, morning
> - Med list reviewed every visit
> - No new OTC NSAIDs without calling us
>
> **Red flags:**
> - Fasting glucose < 4 or > 16 mmol/L (US: <70 or >300 mg/dL)
> - Home BP > 180/110
> - Foot wound that isn't healing
> - Sudden swelling or rapid weight gain
>
> **Care team:** NP (primary), endocrinology PRN, nephrology annual, dietitian quarterly, pharmacist MTM annually
>
> **Next review:** 3 months
>
> ---
> **Review and individualize before signing:**
> - A1c target appropriate for this patient (age, frailty, hypoglycemia history)
> - BP target alignment with current guideline edition
> - SGLT2i decision is a prescriber call — currently drafted as a decision item, not a directive
> - Nephrotoxic list completeness given patient's actual med list
> - Care team contacts filled in
