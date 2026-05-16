# Reference Workflows — HR Generalist Pack

> Worked examples covering the writing jobs an HR generalist hits in any given week. For the actual policy drafts (PTO, remote work, harassment, leave, anti-retaliation, etc.), open `templates/policy-drafts.md` — this file is the cross-cutting workflow reference.

---

## Workflow 1: The "we need a policy on X by Friday" request

Someone on the leadership team asks for a policy. They want it short, written, and defensible. You have 48 hours.

**Prompt:**

```
Draft a [topic] policy for a [size] employee company in [jurisdiction(s)]. Context: [paste the trigger — incident, audit finding, growth, regulation update].

Constraints:
- 1-2 pages
- Scope (who it applies to), Definitions (3-6 terms), Procedure, Exceptions, Effective date
- Plain English, not legal English
- Flag every section where my employment counsel needs to review
- End with: "This policy will be reviewed [annually/biennially] or when [trigger]."
```

What to verify before sending: jurisdiction-specific language (especially Canada vs US, multi-state US, and Quebec which has its own rules), interaction with the rest of the handbook, and whether the policy needs a separate acknowledgment form.

---

## Workflow 2: The all-hands announcement (sensitive)

Layoffs, leadership transitions, M&A, return-to-office, benefits changes — every announcement has a wrong way and a right way. The AI's job: structure it; your job: make the call on tone.

**Prompt:**

```
Draft an all-hands email announcing [event].

Context:
- Audience: ~[N] employees, [hybrid/remote/onsite mix]
- Sender: [CEO / CHRO / GM]
- Timing: [now / 5pm Friday / Monday 9am]
- What we know: [paste]
- What we don't yet know: [paste — what's TBD]
- What employees will be worried about: [paste]

Constraints:
- 200-400 words
- Lead with what changed, not why (the why is paragraph 2)
- Acknowledge the human impact in one sentence, not three
- One clear next step (who to ask, when more info is coming, what they should do today)
- Avoid: "we are excited," "growth opportunity," "synergies," "double down," "I want to be transparent"
- End with: how questions will be handled — open Slack channel, 1:1s with managers, an upcoming all-hands
```

For layoffs specifically, the kit's system prompt forces an additional structural rule: the announcement must include severance basics, benefits continuation timing, and the EAP referral. Verify these against what HR + legal actually approved before sending.

---

## Workflow 3: The handbook update (small change, big ripple)

The handbook hasn't been updated in 14 months. You need to add a new policy section, update a benefits reference, and refresh the table of contents.

**Prompt:**

```
I'm updating the handbook. Changes:
1. [Change 1 — paste]
2. [Change 2 — paste]
3. [Change 3 — paste]

Existing handbook structure: [paste TOC]

Produce:
- A redline-style summary of what changed (3-5 sentences)
- An updated TOC reflecting new section numbers
- An all-employee announcement (under 150 words) explaining the changes and where to find the new handbook
- A 5-question acknowledgment quiz the AI suggests for the most material change (if any rises to that bar)
- Flag every change that needs legal review before publishing
```

What the AI gets wrong: it'll silently renumber sections in a way that breaks every internal cross-reference. Always ask it to list the cross-reference updates explicitly.

---

## Workflow 4: The PIP draft

The single most legally-sensitive document HR generalists write. The kit forces a specific structure and a mandatory legal-review flag.

**Prompt:**

```
Draft a 60-day PIP for [employee role] reporting to [manager].

Performance concerns (specific, behavior-based, observable):
- [Issue 1 with example]
- [Issue 2 with example]
- [Issue 3 with example]

Expected outcomes (SMART):
- [Outcome 1]
- [Outcome 2]

Support being offered:
- [Mentoring / training / tooling / 1:1 cadence]

Check-in cadence: [weekly / biweekly]
Jurisdiction: [state / province]

Constraints:
- Behavior-based language only — no character assessments
- Avoid words like "attitude," "unprofessional," "not a culture fit"
- Include the at-will / employment-relationship clause appropriate for jurisdiction
- Final paragraph clarifies that successful completion does not guarantee continued employment, and failure to meet may result in further action up to and including termination
- Flag every clause that needs employment counsel review before delivery
```

Always end the PIP with: "I have reviewed this PIP with my manager and HR and acknowledge that I understand the concerns and expectations. Signature: ___ Date: ___" — and never deliver without counsel review for jurisdictions that have any wrongful-termination exposure (which is most of them).

---

## Workflow 5: The "is this harassment?" intake question

A manager Slacks: "Quick question — Sarah said something to John in the standup that felt off. Is that harassment?"

You can't answer that in Slack. The AI's job: draft a response that opens the right door without prejudging.

**Prompt:**

```
A manager casually surfaced what might be a harassment concern. Draft my reply.

Constraints:
- Don't characterize the behavior yet
- Move it off Slack: "Let's talk live — I can do today at [time] or tomorrow at [time]"
- Acknowledge they did the right thing by surfacing it
- Don't promise confidentiality I can't keep (Be honest about reporting obligations)
- Keep it under 80 words
```

For the actual investigation intake form, see `templates/policy-drafts.md` → harassment + investigation section.

---

## Workflow 6: The performance review template

Mid-year or annual review template. The AI is good at structure; you bring the company's competency model.

**Prompt:**

```
Create a [annual / mid-year / 90-day] performance review template for [role family]. Our competency model: [paste or summarize].

Sections:
1. Self-assessment (3-5 prompts)
2. Manager assessment (parallel structure)
3. Goals — what was achieved, what wasn't, why
4. Competency ratings (1-5 with descriptor anchors, not just numbers)
5. Areas for development (3 max — anti-laundry-list)
6. Goals for next cycle (3-5 SMART)
7. Comp + level recommendation (manager only, separate doc)

Constraints:
- Self-assessment prompts open-ended, not yes/no
- No 360 unless I ask for one
- No bell curve language
- End each section with "Notes from the conversation:" — emphasizes the review is the conversation, not the form
```

---

## Workflow 7: The departure announcement

A senior person is leaving. Reasons vary; the announcement has to land cleanly either way.

**Prompt:**

```
Draft a departure announcement.

Person: [name, role, tenure]
Type: [voluntary / mutual / involuntary]
Last day: [date]
Transition: [interim, replacement search, etc.]
Tone: [warm / professional / brief — your call]

Constraints:
- Don't editorialize. State what's true.
- One paragraph of accomplishments (specific, not "everything they touched turned to gold")
- One sentence of what's next for them (only if they want it shared)
- Transition logistics: who covers what, when, how questions get routed
- 150-250 words
- For involuntary departures: shorter, drier, no "we wish them well" if it isn't true. Don't lie.
```

What the AI gets wrong: lavishes praise on involuntary departures. Strip it. Be respectful and brief.

---

## What the AI gets wrong across HR workflows

1. **It produces consultant English.** "Stakeholders," "alignment," "leverage," "drive engagement." HR generalists who write like this lose employee trust. Strip it.
2. **It forgets jurisdiction.** Defaults to "US, probably California" unless you say otherwise. Always state your state/province up front. Multi-state employers: name all of them.
3. **It softens severity inconsistently.** PIPs get too soft, terminations get too cold, departures get too gushing. Use the structural rules in the system prompt — they hold the line.
4. **It hallucinates policy citations.** It'll invent "Section 4.3 of the Employment Standards Act." Don't let it cite without verification. If the AI cites a statute, verify the citation before using it.
5. **It misses the acknowledgment form.** Most policies need a separate acknowledgment doc that the employee signs. The AI tends to draft the policy alone — always ask: "Do I also need an acknowledgment form for this?"

---

## Companion files

- `templates/policy-drafts.md` — PTO, remote work, harassment, leave (FMLA + state/provincial variations), anti-retaliation, drug-and-alcohol, BYOD/device, social media, code of conduct
