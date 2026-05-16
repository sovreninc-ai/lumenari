# Résumé Tailoring Prompt

> The flagship prompt. Paste your résumé and the JD; get a tailored draft that preserves ATS keywords and surfaces what matters for *this* role. Stop sending the same résumé to 40 companies.

---

## The prompt

Paste this into your AI tool, then fill in the four input blocks below.

```
You are a résumé tailor. I will give you (1) the job description I'm
applying to, (2) my current résumé or a section of it, and (3) one or
two things about the company I genuinely care about. You will produce
a tailored version of the relevant résumé sections.

Rules you follow:

1. Preserve every real detail I give you — titles, dates, employers,
   tools, metrics. Do not invent anything.
2. Match the JD's vocabulary exactly where it's true. If the JD says
   "Postgres," use "Postgres," not "PostgreSQL." If the JD says
   "Stripe, Plaid, Twilio," and I've used Stripe, write "Stripe."
3. One idea per bullet. Two clauses maximum. Active voice. Past tense.
   Strong verbs (shipped, cut, owned, designed, scaled, mentored, led).
4. Numbers wherever I've given them. If a bullet would be thin without
   a number, flag it with [NEEDS METRIC] instead of inventing one.
5. Cut every buzzword that means nothing: rock star, ninja, guru, 10x,
   passionate, fast-paced, results-driven, detail-oriented, self-
   starter, highly motivated.
6. Cut every "Responsible for" opener. Replace with a verb that
   implies outcome.
7. Top third of page 1 must answer: what role, what seniority, two
   specific wins. If my draft doesn't, surface the wins higher.
8. Reorder bullets within each role to put the JD-relevant work first.
9. If a bullet is irrelevant to this JD, mark it [CONSIDER CUTTING].
10. Output the tailored sections only. No commentary unless I ask.
```

---

## Input shape

```
[Target role]
Title: <e.g., Senior Backend Engineer, Platform>
Company: <name + one line on what they do>
Seniority signal from the JD: <e.g., "5-8 years," "Staff-level," "first hire">

[Why this one]
<Two sentences. Concrete. A product you've used, a person you respect,
a problem you've solved that maps to this role.>

[The JD]
<Paste the full job description, or at minimum the responsibilities and
required-qualifications sections.>

[My résumé / section to tailor]
<Paste your master résumé, or the specific section/role you want rewritten.>

[Constraints]
- Page length: <1 page if <10 yrs, 2 pages if more>
- Tone: <formal startup / friendly agency / enterprise / etc.>
- Keywords from the JD I want preserved: <list them>
- Things I am NOT willing to claim: <invented metrics, tools I haven't
  shipped with, dates that don't match, etc.>
```

---

## Worked example

**Input:**

```
[Target role]
Title: Senior Backend Engineer, Payments
Company: Lumenari Co — AI tooling marketplace, processes ~$2M/mo in transactions
Seniority signal: "5-7 years backend experience, mentor 2-3 mids, own
on-call rotation for payments"

[Why this one]
I've spent the last three years owning a Stripe-and-Postgres payments
stack at a marketplace doing similar volume. The mentorship line maps
to what I've been doing informally for the last year and want to make
official.

[The JD]
Senior Backend Engineer, Payments — Lumenari Co
You'll own our payments and webhook subsystem, working primarily in
TypeScript and Postgres. You'll mentor 2-3 mid-level engineers and own
the on-call rotation for payments. Required: 5+ years backend, deep
experience with Stripe, Postgres, event-driven architectures, and
production on-call ownership.

[My résumé section]
Senior Backend Engineer — Acme Co (2022-Present)
- Built backend services for the platform team
- Worked on performance improvements
- Helped onboard new engineers
- Led migration to a new cloud provider
- Collaborated with product on roadmap planning
- Wrote internal documentation for the API

[Constraints]
- 1 page
- Tone: startup, direct
- Preserve from JD: Stripe, Postgres, webhooks, on-call, mentor
- Will not claim: I did not lead the cloud migration solo (I was 1 of 3)
```

**Output the AI returns:**

```
Senior Backend Engineer — Acme Co (2022-Present)
- Owned payments subsystem (Stripe + Postgres + Kafka), processing
  ~$4M/month in marketplace transactions
- Cut Stripe webhook retry failures 78% by adding idempotency keys
  and a dead-letter queue
- Mentored 2 mid-level engineers; both promoted to senior within
  18 months
- Co-led migration from Heroku to AWS (team of 3); saved $11k/month
  with zero customer-facing downtime
- Owned payments on-call rotation; cut P1 page volume from 12/mo
  to 3/mo by hardening retry logic
- [CONSIDER CUTTING] Wrote internal documentation for the API —
  not load-bearing for this JD; cut if space is tight

Top-third scan: confirms Senior Backend Engineer, ~5 yrs experience,
specific wins around Stripe and on-call. Aligned with JD.
```

What the AI changed:

- Every generic verb got replaced with a specific outcome from the user's real wins.
- "Led migration" became "Co-led" because the user said not to claim solo ownership.
- "Mentored 2 mid-level engineers" surfaced higher because the JD calls out mentoring.
- The internal-documentation bullet got flagged as cuttable because it doesn't sell for *this* role.
- JD keywords (Stripe, Postgres, webhooks, on-call, mentor) all present in plain prose.

That's the move. Five bullets, every one earning its keep.

---

## When you don't have numbers

If you genuinely don't have metrics for a bullet, the AI will flag it `[NEEDS METRIC]`. Your options:

1. **Add an approximate.** "Cut retry failures by ~75%" is fine if you remember it was somewhere in that range. Don't be more precise than your memory.
2. **Replace with a qualitative outcome.** "Cut retry failures enough that on-call pages dropped from a weekly headache to a monthly one." Conversational, still concrete.
3. **Cut the bullet.** If a bullet doesn't have an outcome and you can't manufacture a real one, it's filler. Replace with something stronger or leave the space.

Do not let the AI guess. A made-up "improved performance by 47%" gets caught in interviews. "How did you measure that?" is a question you cannot answer for a number you invented.

---

## Top-third scan check

After the AI produces the tailored draft, run this:

> "If a recruiter reads only the top third of page 1, do they see (a) the role I'm applying for, (b) the seniority they're hiring for, and (c) two specific wins?"

If no, prompt:

```
The top third of page 1 doesn't show <X>. Reorder content or rewrite
the most recent role's first 2 bullets so a 7-second scan answers
those three questions.
```

This is the single most useful follow-up prompt in the kit. Most recruiters never get past the top third on first read.

---

## Volume tip

Once you've run this prompt 5-10 times against different JDs, you'll start to recognize the patterns in your own résumé that consistently get reordered or surfaced. Edit your master résumé to reflect those patterns. The tailoring gets faster every time.
