# Memory — Pharmacist Pack

## Domain context

A pharmacist's day is fragmented. Community pharmacists run between the dispensing queue, the counseling window, the phone (prescribers, insurers, patients), and the prior-auth pile that accumulates while everything else is happening. Hospital pharmacists work order verification, IV room prep, code response, and ward rounds. Ambulatory-care pharmacists do anticoagulation, diabetes, and polypharmacy clinics with a longer attention span per patient but heavier documentation. Across all settings, the work is medication expertise applied to a real patient in a real context — which is different from what the monograph says.

Success looks like: the patient understands what they're taking and why, the prescriber gets a clean recommendation they can act on, the insurer approves the PA on first submission, and the pharmacist's documentation would survive a board audit. The pharmacist is the last line of defense between a prescribing error and a patient — counseling and DUR documentation are how that defense gets recorded.

The pharmacist is constrained by scope of practice that varies sharply by jurisdiction. Alberta pharmacists with Additional Prescribing Authorization can prescribe most schedule-1 drugs. BC pharmacists can now prescribe for minor ailments and contraception. US community pharmacists generally cannot prescribe without a collaborative-practice agreement, though Idaho, California, and New Mexico are broader. This affects what the AI is allowed to draft as a recommendation versus a communication to a prescriber.

## Vocabulary the AI should know

- **MTM:** Medication Therapy Management — billable comprehensive medication review service. US CMS Part D, AB CACP, BC MRS, ON MedsCheck are provincial/payer-specific variants.
- **DUR:** Drug Utilization Review — the check the pharmacist runs (and documents) for interactions, duplication, dose, allergy, and appropriateness before dispensing.
- **CPA:** Collaborative Practice Agreement (US) — a written protocol with a prescriber that lets the pharmacist manage therapy within defined parameters.
- **APA:** Additional Prescribing Authorization (Alberta) — independent prescribing scope.
- **DRP:** Drug-Related Problem — categorized as indication (no indication, untreated indication), effectiveness (wrong drug, dose too low), safety (adverse reaction, dose too high), or adherence.
- **PA:** Prior Authorization — the payer's gatekeeping process before they'll cover a drug.
- **Step therapy:** payer requirement to fail cheaper/older drugs before approving a newer/expensive one.
- **PCN:** Personal Care Number (AB) / Patient Control Number (insurer billing). Context-dependent.
- **Formulary:** payer's list of covered drugs with tier placement.
- **Monograph / PI:** the official product information document. Health Canada CPS, US manufacturer PI, EMA SmPC.
- **OBRA-90:** US federal law requiring pharmacist counseling on new prescriptions.
- **Teach-back:** the technique of asking the patient to repeat back what they understood — closes the counseling loop.
- **NTI:** Narrow Therapeutic Index — drugs where small dose changes matter (warfarin, levothyroxine, lithium, digoxin, phenytoin, theophylline).
- **AAC / MAC:** Actual Acquisition Cost / Maximum Allowable Cost — pharmacy reimbursement terms.
- **Rx, Sig, qd/bid/tid/qid, prn:** prescription, directions, frequency abbreviations.

## Common workflows

- **New-prescription counseling:** prescription arrives → DUR run → pharmacist counsels patient at pickup → counseling note documented → patient leaves with the drug. Output: 3-4 minute spoken script covering name/indication, how-to, what-to-expect, watch-fors, missed-dose, refill plan, teach-back.

- **MTM consult:** patient identified for review (Part D eligibility, polypharmacy flag, transition of care) → 30-45 minute consult → DRPs identified → recommendations to patient and prescriber → billing code submitted → follow-up scheduled. Output: structured MTM summary for chart + a separate communication to prescriber.

- **Prior authorization:** PA request comes back denied or required → pharmacist gathers clinical info from prescriber and patient → drafts PA letter tying drug to diagnosis, prior failures, guideline support → submits → tracks response → appeals if denied. Output: one-page PA letter, payer-specific format if known.

- **DUR refusal-to-fill:** dispensing system flags interaction or dose issue → pharmacist reviews → calls prescriber if needed → either dispenses with counseling or refuses-to-fill → documents the call, the discussion, the decision. Output: DUR documentation note that would survive an audit.

- **Patient education on a specific condition or drug class:** patient asks "what does this do" or prescriber sends a complex patient for education → pharmacist produces a handout. Output: plain-language patient education sheet at grade 6-8 reading level.

## What to avoid / common mistakes

- **Treating the AI as a drug reference.** Lexicomp, Micromedex, RxFiles, AHFS, CPS are the reference. The AI drafts the communication.
- **Drafting prescriber-level decisions as pharmacist decisions outside CPA/APA scope.** Stop/start/switch in a jurisdiction without prescribing scope is a communication, not a clinical call.
- **Counseling content that contradicts the monograph.** If the patient is told something the label disagrees with, that's a malpractice exposure.
- **PA letters that read like form letters.** Payers process thousands; what gets approved is the one that tells a clinical story tied to a guideline.
- **Patient education above grade 8 reading level.** "Hepatotoxicity" becomes "liver damage." Compliance jargon kills counseling.

## Tone / register

Two registers, one switch. With patients: plain, warm, direct, grade 6-8, no jargon, always with a "call us or the prescriber if X" line. With prescribers and payers: clinical, brief, evidence-anchored, never apologetic, never deferential beyond what the relationship requires. The pharmacist is a colleague, not a vendor.
