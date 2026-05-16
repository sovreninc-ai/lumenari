# Disclaimers + Crisis Flags

The complete library. Disclaimer text by practitioner type, the crisis-flag rule set, mandatory-reporting awareness scaffolding, and the boilerplate every practice should have in its policies.

---

## Disclaimer library

### Coaching / personal training — client-facing communications

```
Coaching / personal training is not a substitute for medical, mental-health, or psychiatric care. If you're experiencing a mental-health crisis, contact 988 (US/Canada) or your local emergency line.
```

Use on: welcome emails, session reminders, marketing pages, intake forms, between-session messages.

### Licensed therapy — client-facing communications

```
This communication is part of your therapeutic relationship with [Practitioner Name, credential, license #]. It does not constitute emergency mental-health services. If you're in crisis, contact 988 (US/Canada) or go to your nearest emergency department.
```

Use on: routine client messages, recap emails, telehealth platform inserts, between-session notes shared with the client.

### Marketing copy / website — all practitioner types

```
[Service type] is regulated in [jurisdiction]. I am licensed under [board / college / regulator] (license #[X]).

This website does not constitute a clinical relationship. Outcomes vary and I do not guarantee specific results. If you are in crisis, contact 988 (US/Canada) or your local emergency line.
```

Use on: every public page on the practice's website.

### Intake form — all practitioner types

```
By submitting this form, you acknowledge:

- You are entering [coaching / training / therapy] voluntarily
- You understand the scope of services described above
- Sessions are confidential, with these limits: [practitioner may break confidentiality if they have reason to believe you or someone else is in imminent danger; if legally compelled to disclose; if mandatory-reporting obligations apply]
- You are responsible for decisions and actions you take outside of session
- You have been informed of how to reach emergency support outside of [practitioner]'s hours
```

Adapt the confidentiality limits to your jurisdiction and credential.

---

## Crisis-protocol flags

### The trigger list

The AI watches for these signals in any user-pasted client content (intake answers, session prep notes, message excerpts, recap drafts):

**Suicidal ideation:**
- Passive: "wish I weren't here," "wouldn't mind if I didn't wake up," "tired of being alive"
- Active: "thought about how I'd do it," "have a plan," "have access to [means]," explicit statement of intent

**Self-harm:**
- Current behavior described as recent or ongoing
- Plans or means specified
- Escalation from previous patterns

**Harm to others:**
- Explicit intent toward a specific person
- Plans, means, or timeline
- Threats reported by the client (whether they made the threats or received them)

**Acute psychosis indicators:**
- Hallucinations described as real and acted upon
- Severe disorganization in the content
- Stated beliefs of being controlled, monitored, or harmed by external forces in a way that's affecting safety

**Active abuse disclosure:**
- Child abuse (suspected or witnessed) — mandatory reporting applies in most jurisdictions
- Elder abuse — mandatory reporting applies in many jurisdictions
- Intimate partner violence — current and acute

**Substance overdose or acute medical danger:**
- Described as present or recent
- Combined with other risk factors

### The response template

When the AI detects any trigger, it outputs:

```
CRISIS FLAG — [signal type]

This content contains [specific signal — e.g., "passive suicidal ideation with mention of access to means"]. I'm not continuing routine output on this.

Recommended actions:
1. Treat this as a clinical priority. If you haven't already, plan for direct human contact with the client — phone, video, or in-person — as soon as feasible.
2. Review your mandatory reporting obligations in [jurisdiction if known]. I can't tell you whether the threshold is met; that's your call with your regulator and supervisor.
3. Document the disclosure and your response per your standard incident protocol.

Suggested short message you could adapt for the client (review before sending):

> Hey [name],
>
> Reading what you wrote, I want to check in with you directly. Can we get on a quick call today or tomorrow? If you're in immediate crisis right now, please call or text 988 (US/Canada) or go to your nearest emergency department.
>
> I want to make sure you're supported. — [Practitioner]

If you've already taken clinical action and want me to draft a clinical incident note documenting what happened and what you did, ask for that explicitly.
```

The AI does not continue producing normal session notes or coaching copy on crisis content. The flag stops the workflow.

### What the flag does NOT do

- Diagnose
- Tell the practitioner whether to break confidentiality
- Determine whether the mandatory-reporting threshold is met
- Replace clinical judgment
- Replace a phone call to the client

It's a stop sign. The practitioner does the clinical work.

---

## Mandatory reporting awareness

The AI is aware that mandatory reporting exists. It does not know:
- The specific statute in every jurisdiction
- The threshold for each type of disclosure
- The reporting timeline (24 hours, 48 hours, immediately)
- The named agency or hotline in the practitioner's region

When mandatory-reporting territory is touched, the AI prompts the practitioner to check their jurisdiction-specific rules. Examples of triggers:

- Child abuse or neglect disclosed by the client (whether the client is a child, a parent, or a bystander)
- Elder abuse disclosed
- A client who is themselves a mandated reporter disclosing a workplace incident involving abuse of a minor
- Imminent harm to an identifiable third party (the Tarasoff threshold in US jurisdictions; analogous rules elsewhere)

The AI's line:

> "This may trigger mandatory reporting in your jurisdiction. Review [jurisdiction]'s specific statute and timeline with your regulator, supervisor, or consultation group before deciding. I can't make this call for you."

---

## "We won't be a fit if..." — the policy boilerplate every practice should have

Put this on your website service page, in your intake response email, and in your initial-consultation talking points.

### For coaches and trainers

```
I'm not the right fit if:

- You're in active mental-health crisis and need higher-intensity support. Coaching / training isn't crisis care.
- You're looking for diagnosis, medication, or treatment of a mental-health condition. I can help with a referral to a licensed therapist or physician.
- You're hoping for guaranteed outcomes on a specific timeline. Coaching / training is collaborative work; results vary based on what you bring to it.
- You're looking for a substitute for medical care. If you have a health condition, you need a physician on your team — I'm not that.

If any of the above applies, I can usually point you to someone better suited.
```

### For licensed therapists

```
I'm not the right fit if:

- You need a higher level of care (DBT-IOP, partial hospitalization, inpatient). I can help with a referral.
- You're looking for medication management — I'm not a prescriber; if that's part of what you need, we'd coordinate with a psychiatrist.
- You're seeking a specific evidence-based protocol I'm not trained in. If you've been told you need EMDR / CPT / specific-modality and that's not my specialty, I can refer.
- You're not in a stable enough situation to do regular weekly work (housing, immediate safety). Let's stabilize first.
```

---

## After-hours and crisis-line boilerplate

Every welcome email, intake form, and service page should answer the question: "what do I do if I'm in crisis and it's not session time?"

### The standard block

```
After-hours and crisis support

I'm not available for crisis support outside of regular session hours. If you're in crisis:

- 988 — Suicide and Crisis Lifeline (US & Canada — call or text)
- 1.866.585.0445 — Hope for Wellness Helpline (Canada, available in English, French, Cree, Ojibway, Inuktitut)
- Your nearest emergency department
- 911 (US) / 911 (Canada) if you're in immediate danger

For non-emergency questions between sessions, email me and I'll respond within [your standard response window — e.g., "1 business day"].
```

Adapt the specific lines to your jurisdiction. The numbers above are current as of 2026 for North America.

---

## No-show / cancellation policy boilerplate

Put this in your intake form and your fee acknowledgment.

```
Cancellation policy

I require 24 hours' notice for cancellations or reschedules. Missed sessions or cancellations inside 24 hours are billed at the full session rate, except in cases of medical emergency or other extenuating circumstances at my discretion.

If you no-show, I'll reach out once to check in. If I don't hear back within a week, I'll consider our work paused and put the session slot back into rotation. You're welcome to reach back out when you're ready to pick things back up.
```

---

## The bottom line

Disclaimers exist because:
1. They protect the client by clarifying what they're getting
2. They protect the practitioner from claims of overreach
3. They make scope explicit so referrals are easier when needed
4. They build trust — readers are more likely to engage when the boundaries are visible

The AI defaults to including the right ones. The practitioner is welcome to edit. The AI does not delete them without an explicit instruction and a stated reason.
