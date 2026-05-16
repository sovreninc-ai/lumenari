# Templates — Counseling, MTM, Prior Auth, DUR

Four templates the pharmacist actually needs. Each has a prompt and a worked example. Drop the prompt into the AI; verify the output against current references before patient delivery or chart documentation.

---

## 1. New-prescription counseling script

### Prompt

```
Draft a new-prescription counseling script for a patient I'm about to counsel at pickup.

Drug: [generic + brand], [strength], [dose], [route], [frequency], [duration if applicable]
Indication: [what the prescriber is treating]
Patient context (no PHI):
- Age range: [50s, 60s, etc.]
- Sex: [M/F]
- Relevant comorbidities: [list, drug-class level OK]
- Allergies: [list or "NKDA"]
- Current meds: [drug-class level OK]
- Literacy estimate: [low / average / high]
- Language: [English / other]

Structure: name + indication, how to take, what to expect, common side effects + what to do, serious side effects + when to call, missed dose, storage + refills, teach-back prompt.

Length: 250-400 words. Reading level: grade 6-8 unless I tell you otherwise.

End with a "Verify before use" block listing every clinical claim I need to check against [Lexicomp / Micromedex / RxFiles / CPS] before counseling.
```

### Worked example

**Input:** Apixaban 5 mg twice daily, new start for atrial fibrillation, 72-year-old man with HTN, CKD stage 3, on amlodipine and metoprolol, NKDA, average literacy, English.

**Output (excerpt):**

> This is apixaban, brand name Eliquis. Your doctor started it to lower your risk of stroke from atrial fibrillation. It thins your blood so a clot is less likely to form in your heart and travel to your brain.
>
> Take 1 tablet by mouth twice a day, about 12 hours apart. You can take it with or without food. Try to take it at the same times every day — for example, 8 in the morning and 8 at night.
>
> You won't feel anything different from the medicine itself. It's working in the background. The protection builds up over the first few days.
>
> Side effects most people notice: easier bruising, gums bleeding a little when you brush, nosebleeds that take longer to stop. These are usually mild. Press firmly on cuts for at least 5 minutes if you nick yourself shaving.
>
> Call us or the prescriber right away if you have: black or bloody stools, blood in your urine, vomit that looks like coffee grounds, a fall and feel any head pain, severe headache, weakness on one side, or any bleeding that won't stop. Go to emergency for any of those.
>
> If you miss a dose and it's been less than 6 hours, take it. If it's been more than 6 hours, skip it and take the next one on time. Don't double up.
>
> Store at room temperature, away from moisture. You'll get a 30-day supply. We'll call before you're out.
>
> Before you leave — can you tell me back what you'll do if you notice your gums bleeding a little when you brush?
>
> ---
> **Verify before use against current references:**
> - Renal dose adjustment for CKD3 (CrCl threshold)
> - Apixaban interaction with amlodipine and metoprolol — Lexicomp severity
> - Bleeding management threshold for this patient's risk profile
> - Local fall-risk counseling language

---

## 2. MTM consultation summary

### Prompt

```
Draft an MTM consultation summary for a patient I just reviewed.

Reason for review: [annual / new med / transition of care / polypharmacy / payer-flagged]
Setting: [community / hospital discharge / ambulatory clinic]
Patient context (no PHI): age range, sex, primary diagnoses, current med list with strength + frequency + indication if known
Adherence pattern: [from refill history or patient report]
Concerns the patient raised: [list]
Concerns I identified: [list]

Structure: reason for review, current med list with indication per drug (flag any without indication), DRPs by category (indication / effectiveness / safety / adherence), recommendations to patient, recommendations to prescriber (draft as separate communication), follow-up plan, billing code if applicable.

End with a "Verify before use" block.
```

### Worked example

**Output (excerpt, for a polypharmacy review on an 80-year-old on 11 medications):**

> **Reason for review:** Annual comprehensive medication review, payer-flagged for polypharmacy (11 active medications).
>
> **Current med list and indication:**
> - Amlodipine 10 mg daily — HTN
> - Metoprolol succ 50 mg daily — HTN, post-MI
> - Atorvastatin 40 mg daily — secondary prevention
> - ASA 81 mg daily — secondary prevention
> - Apixaban 5 mg BID — AFib
> - Metformin 1000 mg BID — T2DM
> - Glimepiride 4 mg daily — T2DM (flag — see DRP-3)
> - Omeprazole 40 mg daily — GERD (flag — see DRP-2)
> - Sertraline 50 mg daily — depression
> - Tamsulosin 0.4 mg daily — BPH
> - Diphenhydramine 25 mg HS PRN — sleep (flag — see DRP-1)
>
> **DRPs identified:**
>
> 1. **Safety — Beers criteria (potentially inappropriate medication, elderly):** Diphenhydramine for sleep in an 80-year-old. Anticholinergic burden, fall risk, cognitive impact. Recommendation: discontinue, consider sleep hygiene first, melatonin if pharmacological needed.
>
> 2. **Indication — chronic PPI without documented indication:** Omeprazole 40 mg daily for >5 years per refill history, no documented Barrett's or chronic NSAID use. Recommendation to prescriber: consider deprescribing trial with H2RA bridge.
>
> 3. **Safety — hypoglycemia risk:** Glimepiride 4 mg in 80-year-old with eGFR 48. Recommendation to prescriber: consider switching to DPP-4i or lowering glimepiride dose.
>
> **Recommendations to patient (within my scope):**
> - Stop diphenhydramine for sleep. Use the sleep hygiene handout we discussed.
> - Continue all other medications as prescribed until you hear back from the prescriber.
>
> **Recommendations to prescriber (draft letter follows):**
> - PPI deprescribing trial
> - Glimepiride review given age and renal function
> - Annual cognitive screen given anticholinergic exposure history
>
> **Follow-up:** Phone consult in 4 weeks to confirm sleep status and review prescriber response. Next annual MTM in 12 months.
>
> **Billing code:** [CMS MTM CPT or provincial code per jurisdiction]
>
> ---
> **Verify before use:** Beers criteria current edition, deprescribing.org PPI protocol, glimepiride dose adjustment for eGFR, anticholinergic burden score for this med list.

---

## 3. Prior-authorization letter

### Prompt

```
Draft a prior-authorization letter for a denied or required PA.

Drug requested: [drug, dose, duration]
Diagnosis: [condition + ICD-10]
Patient context (no PHI): age range, sex, relevant comorbidities
Step-therapy history: list of prior drugs tried, dose/duration/outcome for each
Why alternatives won't work for this patient: contraindications, allergies, comorbidities, prior failures
Guideline support if known: [ADA / AHA / NCCN / NICE / CHEP / etc.]
Payer: [name if known — format may be payer-specific]
Sign-off: [pharmacist with CPA scope / prescriber to sign / etc.]

Output: one-page letter. Clinical story, not form letter.
End with "Verify before submission" block.
```

### Worked example

**Output (excerpt, for semaglutide PA after metformin/sulfonylurea/DPP-4 failure):**

> [Date]
> [Payer name and PA address]
> Re: Prior authorization request — semaglutide (Ozempic) 1 mg weekly SC
> Patient: [member ID, DOB — pharmacist to fill]
>
> I am requesting coverage for semaglutide 1 mg weekly SC for [patient], a 62-year-old with type 2 diabetes mellitus (ICD-10 E11.9) and established atherosclerotic cardiovascular disease (history of NSTEMI 2022, ICD-10 I25.10).
>
> Per the 2024 ADA Standards of Care, GLP-1 receptor agonists with proven cardiovascular benefit are recommended as a preferred agent in patients with T2DM and established ASCVD, independent of A1c or metformin use. Semaglutide has demonstrated cardiovascular outcome benefit in SUSTAIN-6.
>
> Step-therapy response:
> - Metformin 1000 mg BID — 4 years, current. A1c on metformin alone reached 8.4% at 18 months.
> - Glimepiride 4 mg daily — 14 months, discontinued for two documented hypoglycemic events including one requiring ED visit.
> - Sitagliptin 100 mg daily — 9 months, A1c reduction of 0.4%, did not reach target.
>
> Current A1c: 8.1% on metformin + sitagliptin. Target per ADA: <7.0% individualized.
>
> Why alternatives won't work: Sulfonylurea-class is contraindicated by documented hypoglycemia history. SGLT2 inhibitors are relatively contraindicated by recurrent UTI history (3 in past 12 months). Insulin is appropriate but the patient meets the higher-tier criteria for GLP-1 RA given established ASCVD per ADA guidance.
>
> I am requesting approval for a 12-month course at 1 mg weekly SC following titration from 0.25 mg starting dose per the manufacturer schedule.
>
> Supporting reference: American Diabetes Association. Standards of Care in Diabetes — 2024. Section 9 and Section 10.
>
> Sincerely,
> [Prescriber name and credentials — to sign]
>
> ---
> **Verify before submission:** Payer-specific PA form format, current ADA edition year, A1c values from chart, hypoglycemia event documentation, UTI history documentation, prescriber willing to sign.

---

## 4. DUR / refusal-to-fill documentation note

### Prompt

```
Document a DUR review or refusal-to-fill.

Date and time: [placeholder]
Trigger: [what the dispensing system flagged or what I caught]
Drugs involved: [list]
Patient context (no PHI): age range, relevant comorbidities
What I checked: [Lexicomp / Micromedex / RxFiles / CPS / monograph]
What I found: [the clinical issue]
Who I called: [prescriber name placeholder, patient]
What was discussed: [summary]
Decision: [dispensed as written / dispensed with changes / refused to fill / held pending response]
Rationale: [tied to current reference]
Follow-up: [if any]

Output: documentation note that would stand on its own at a board audit.
```

### Worked example

**Output (for a duplicate-therapy refusal-to-fill):**

> Date: [placeholder] | Time: [placeholder] | Pharmacist: [placeholder, RPh]
>
> Trigger: Dispensing system flagged duplicate therapy. New prescription for fluoxetine 20 mg daily from Dr. A (psychiatry) presented at counter. Patient currently active on sertraline 100 mg daily from Dr. B (family practice), refilled 12 days ago.
>
> Drugs involved: fluoxetine 20 mg daily (new), sertraline 100 mg daily (active).
>
> Patient context: 45-year-old, no other antidepressants on profile, no CYP-significant interactions on current med list, NKDA.
>
> Reference check: Lexicomp — fluoxetine + sertraline flagged for serotonin syndrome risk and duplicate SSRI class. Recommendation per current literature is taper-and-switch, not concurrent.
>
> Called Dr. A's office at [time]. Spoke with [name placeholder]. Dr. A advised this is intentional cross-taper — sertraline to be tapered by Dr. B starting next week, fluoxetine to start at 20 mg today and continue. Dr. A and Dr. B coordinated by phone yesterday per the office note.
>
> Called Dr. B's office at [time] to confirm taper plan. Confirmed: sertraline 50 mg daily for 7 days, then discontinue. Documented.
>
> Decision: Dispensed fluoxetine 20 mg #30 as written. Counseled patient on cross-taper plan, serotonin syndrome warning signs (high fever, agitation, fast heart rate, muscle twitching, severe nausea), and emergency action. Confirmed patient understood she should call us or Dr. A immediately if any of those occur. Confirmed patient has the sertraline taper plan in writing.
>
> Rationale: Intentional cross-taper documented and confirmed with both prescribers. Risk window is the next 14 days. Patient educated on serotonin syndrome.
>
> Follow-up: Flag patient profile for serotonin syndrome watch. Will counsel again at next refill. If patient calls with any reported symptoms, refer to Dr. A immediately.
>
> ---
> **Verify before chart filing:** Patient name and DOB on file, prescriber names spelled correctly, sertraline taper end date documented, my license number on the note.
