# Intake Forms + Session Notes

Three formats covered: intake form, SOAP notes, DAP notes, narrative notes. Pick the format that matches your credential and use case.

---

## Intake form template

For first-session onboarding. Use as a digital form (Google Forms / Typeform / Practice Better / Jane / SimplePractice) or paste into your client portal.

### The prompt

```
You are drafting a client intake form for a [practitioner type] in [jurisdiction]. Generate a complete intake form including:

1. Client identification (name, pronouns, preferred contact method, time zone)
2. Emergency contact + after-hours instructions
3. Reason for seeking [coaching / training / therapy]
4. Relevant history at the level appropriate to my scope of practice (no medical history unless I'm licensed for it)
5. Goals — what would success look like in 3 months
6. Past experience with [coaching / training / therapy]
7. Logistics (frequency preference, modality, scheduling)
8. Fee acknowledgment + cancellation policy
9. Scope-of-practice statement — what I do and don't do
10. Informed consent — confidentiality, limits to confidentiality, mandatory reporting awareness if applicable
11. Crisis line acknowledgment

Output as a clean numbered form. Each question should be answerable in 1-3 sentences.

My practice details:
- Practitioner type: [life coach / personal trainer / licensed therapist with credential]
- Jurisdiction: [province/state]
- Services offered: [what I actually do]
- Fee: [your fee]
- Cancellation policy: [your policy]
- Session format: [in-person / video / phone / mix]
```

### Output structure (example for a life coach)

```
# [Practice Name] — New Client Intake

Thanks for setting up your first session. Please complete this form at least 24 hours before we meet.

## 1. About you
- Full name
- Preferred name (if different)
- Pronouns
- Email
- Phone (used only for scheduling unless you tell me otherwise)
- Time zone

## 2. Emergency contact
- Name + relationship to you
- Phone

Note: I keep regular session hours (Tue-Fri, 9am-5pm MT). I'm not available for crisis support outside those hours. If you're in crisis, contact 988 (US/Canada) or go to your nearest emergency department.

## 3. What brings you to coaching right now?
A few sentences on what you're hoping to work on. No need to write a memoir — we'll get into it together.

## 4. What would "good" look like in 3 months?
The clearer the picture, the more useful our first session will be.

## 5. Have you worked with a coach or therapist before?
- Yes / No
- If yes — what worked or didn't work for you?

## 6. Logistics
- Preferred frequency (weekly / biweekly / monthly)
- Preferred modality (video / phone / in-person)
- Any scheduling constraints I should know

## 7. Fees and cancellation
My fee is [$X] per session. Cancellation policy: 24 hours' notice required; missed sessions or late cancellations are billed at full rate.

By submitting this form, you acknowledge the fee and cancellation policy.

## 8. What I do and don't do
I'm a life coach, not a licensed mental-health professional. Coaching is focused on present-day goals, accountability, and pattern recognition. It's not a substitute for therapy or medical care.

If at any point I notice something that's outside my scope, I'll tell you and we can talk about a referral. That's part of how I work, not a problem.

## 9. Informed consent
By submitting this form you confirm:
- You're entering coaching voluntarily
- You understand coaching is not therapy or medical care
- Sessions are confidential, with these limits: I may break confidentiality if I have reason to believe you or someone else is in imminent danger, or if I'm legally compelled to disclose
- You're responsible for your own decisions and the actions you take outside of session

## 10. Anything else I should know before our first session?
Optional. A few sentences if anything comes to mind.
```

For licensed therapists, intake forms are longer and include clinical history. For personal trainers, swap goals/history for fitness assessment + health screening (PAR-Q+) + injury history.

---

## SOAP note template

For licensed clinicians and allied-health practitioners.

### The prompt

```
You are drafting a SOAP note from rough session content.

Practitioner type: [LCSW / RP / LPC / psychologist / PT / OT / etc.]
Client: [initials or pseudonym]
Session #: [number]
Date: [date]
Modality: [in-person / video / phone]
Duration: [minutes]

Rough content (what came up in session):
[paste your rough notes — client's words, your observations, themes]

Rules:
- Length 200-400 words total
- Subjective = client's reported experience (quote sparingly)
- Objective = your observed behavior, affect, presentation, measurable items
- Assessment = your clinical impression in observational language; do NOT name a DSM-5 diagnosis unless I'm explicitly providing one
- Plan = next steps, between-session work, next-session focus
- Flag any crisis signals or scope-boundary events explicitly
- End with a clinician signature line + credential
```

### Output structure (example)

```
# SOAP Note — Client J.K. — Session 4
**Date:** 2026-05-14 | **Modality:** Video | **Duration:** 50 min

**S (Subjective):**
Client reported a "rough week" — described two boundary conflicts with her sister, including one that left her "feeling like a kid again." Reported sleep at 5-6 hours per night this week, down from 7-8 last week. Denied SI/HI when asked directly. Reported some increased anxiety mid-week, resolved by Friday.

**O (Objective):**
Client presented oriented x3, affect mildly constricted compared to prior sessions. Speech rate within normal limits. Engaged actively in problem-solving the second half of session. No psychomotor agitation. Made appropriate eye contact via video.

**A (Assessment):**
Boundary work with family-of-origin remains the primary theme. Client demonstrating improved capacity to identify the pattern in real-time, with some lag in implementing the boundary. Anxiety this week appears situational and self-limiting. No safety concerns at this time.

**P (Plan):**
Continue Session 5 next week, same time. Between sessions, client will (1) practice the scripted boundary phrase we worked on, (2) journal one situation where she noticed the pattern before reacting. Next session focus: deepen the boundary script + introduce values clarification work if appropriate. No clinical concerns flagged.

— [Clinician Name], [Credential]
```

---

## DAP note template

For counselling, social work, and any practitioner whose workflow uses DAP.

### The prompt

```
You are drafting a DAP note from rough session content.

[Same input header as SOAP]

Rules:
- Length 150-300 words
- Data = combined subjective + objective (client's reports + your observations)
- Assessment = clinical impression in observational language
- Plan = next steps + between-session work
- Flag any crisis signals or scope-boundary events
```

### Output structure (example)

```
# DAP Note — Client M.R. — Session 8
**Date:** 2026-05-14 | **Modality:** In-person | **Duration:** 45 min

**D (Data):**
Client described a productive week. Reported using the grounding exercise three times during high-anxiety moments at work and finding it "actually helpful." Affect brighter than in previous sessions, posture more open, engaged throughout. Denied SI/HI on routine check-in. Brought up an upcoming family event as a potential stressor.

**A (Assessment):**
Continued progress on anxiety management. Client demonstrating internalization of grounding techniques and using them proactively. Anticipatory anxiety re: family event noted; will integrate into next-session planning. No safety concerns.

**P (Plan):**
Session 9 next week. Between sessions, client will practice grounding daily and journal one anticipated stressor for the family event. Next session: structured prep for the event, including boundary-setting language.

— [Clinician Name], [Credential]
```

---

## Narrative session notes (for coaches and trainers)

When clinical formats don't fit your practice.

### The prompt

```
You are drafting narrative session notes from rough content.

Practitioner type: [life coach / personal trainer / nutrition coach / etc.]
Client: [initials or pseudonym]
Session #: [number]
Date: [date]
Modality: [in-person / video / phone]
Duration: [minutes]

Rough content:
[paste rough notes]

Rules:
- Length 150-300 words
- NOT clinical format (no "Assessment" — use "Observations" or "What I noticed")
- Stay within coaching scope — describe the work, not clinical impressions
- Identify any commitments the client made for between sessions
- Flag any moments where I should consider referring out (anything that pattern-matches to mental health, medical, or other licensed-scope territory)
```

### Output structure (example — life coach)

```
# Session Notes — Client A.L. — Session 6
**Date:** 2026-05-14 | **Modality:** Video | **Duration:** 50 min

**What we worked on:**
A.L. opened with the conversation she'd been avoiding with her business partner — she had it Tuesday. She described it as "less terrible than I expected, but I still need to follow up on the money piece." We spent the first half unpacking what worked (clarity in her opening, sticking to the topic) and what didn't (folding when the partner pushed back on the timeline).

**What I noticed:**
A.L. is naming her patterns faster than three sessions ago. She caught the fold mid-story without prompting. Still tends to soften the ask when there's pushback; we'll keep working on this.

**Between-session commitment:**
She'll send the follow-up email about the money piece by Friday. Will draft it solo, no edits from me.

**Next session focus:**
Review the email + the partner's response if it's come in. Continue work on holding the ask under pushback.

**Referral notes:**
None. Nothing flagged as outside coaching scope this session.

— [Coach Name]

*Coaching is not a substitute for medical or mental-health care. If you're in crisis, contact 988 (US/Canada) or your local emergency line.*
```

---

## When you mis-pick a format

- **SOAP for a coach** — too clinical; you'll end up writing assessments you can't defend
- **Narrative for a licensed clinician billing insurance** — won't meet documentation requirements
- **DAP for a personal trainer** — overkill; use narrative
- **Anything formatted without a disclaimer** — re-prompt; the kit should produce one by default
