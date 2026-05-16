# JD Generator with Anti-Bias Linting

Most JDs are bad because hiring managers write them in 20 minutes, copy half from another JD, and never read them as a candidate would. This template fixes that. It runs an anti-bias linter first, then produces a JD that respects how candidates actually read.

---

## How this template works

Two passes:

1. **Lint pass.** Flags every problematic phrase in either the brief or the existing JD draft. Shows the lint + the fix at the top of the output.
2. **JD draft.** A clean, structured JD using the standard format from the optimization pack.

You can run lint-only on a JD a hiring manager sent you (the most useful use case in agencies and in-house teams).

---

## The prompt

```
You are the Recruiter Co-Pilot.

Generate a job description.

**Role title:** [exact title]
**Seniority:** [Entry / Mid / Senior / Staff / Principal / Director / VP]
**Role family:** [Engineering / Product / Design / Sales / GTM / Ops / Finance / etc.]
**Company stage + size:** [e.g., Series B, 80 people, $30M ARR]
**What we make:** [one sentence]
**Why we're hiring this role:** [one sentence — growth, replacement, new team, new function]
**Location + working arrangement:** [Remote / Hybrid X days in [city] / On-site (city)]

**Salary band:**
- Base: [low] - [high] [currency]
- Equity: [range, if applicable]
- Bonus/commission: [structure, if applicable]

**Top 3 things the person will own (concrete, not vague):**
1. [outcome]
2. [outcome]
3. [outcome]

**Top 3 skills/experience needed (outcomes, not gatekeeping):**
1.
2.
3.

**Nice-to-have (optional):**
- [3-4 things]

**The team they'll join (real headcount, named manager if possible):**
[description]

**Interview process (your actual process, not a template):**
[number of rounds, who they'll meet, format]

**Anything else worth flagging:**
[e.g., "we don't have a senior engineer yet — you'll set the bar," or "the codebase is older than we'd like"]

Existing draft (if any):
[paste — for lint pass]
```

---

## What you get back — full example

For a Senior Full-Stack Engineer role at a Series B SaaS:

### Lint pass (from the hiring manager's draft)

> **Lint pass on the original draft:**
>
> - `"passionate"` → cut. Passion is a feeling, not a deliverable.
> - `"rock star"` → cut. Gendered (skews male, off-puts senior women candidates), also corporate cringe.
> - `"fast-paced, dynamic team"` → cut. Code for "we're disorganized." Replace with concrete pace expectations.
> - `"10x developer"` → cut. Meaningless, off-puts thoughtful senior engineers.
> - `"thrives in ambiguity"` → soften or be specific. Senior engineers expect SOME structure; the phrase often code for "we don't know what we want."
> - `"wear many hats"` → cut. Code for "we don't have a team." If true, say so honestly.
> - `"Bachelor's degree in Computer Science required"` → drop or change to "Bachelor's degree OR equivalent experience." Senior engineers with 10 years of demonstrable work shouldn't be gatekept on a CS degree.
> - `"10+ years of experience"` → reconsider. The role doesn't require 10 years; senior-quality work at 6-8 years is common. Replace with "demonstrated senior-level work over multiple roles."
> - `"work hard and play hard"` → cut. Coded as young + grindy. Off-puts older candidates and parents.
> - `"we're like a family here"` → cut. Vague and often a flag for boundary issues. Replace with concrete team norms.
> - `"competitive salary"` → replace with the actual salary band. Non-negotiable.

### The rewritten JD

> **Senior Full-Stack Engineer**
>
> **About the role**
>
> You'll be the third senior engineer on a team of seven, working across our TypeScript / React / Node / Postgres stack to ship features our customers actually pay us for. Day-to-day means writing production code, reviewing PRs, occasionally pairing with mids on tricky problems, and owning a major area of the product end-to-end.
>
> **What you'll do**
>
> - Ship features that touch the full stack — from Postgres schema to React components
> - Own one of our three product areas (billing, integrations, or workflows) within your first 90 days
> - Set the technical bar on a team that's growing from 7 to 12 engineers over the next year
> - Pair with the product manager and designer on scoping decisions, not just on implementation
> - Mentor mid-level engineers, with about 20% of your time on this (more if you want it, less if you don't)
>
> **What we're looking for**
>
> - Demonstrated senior-level work across TypeScript / React on the front end and Node / Postgres on the back end
> - You've shipped to production at a startup or fast-moving team — you know what "good enough to ship" means
> - You can scope your own work from a one-paragraph problem statement
> - You write code others can read and review without a translator
> - You've worked remotely with a team across multiple time zones
>
> **Nice to have**
>
> - Experience with AWS (we're on it; happy to bring you up to speed if not)
> - Background in B2B SaaS specifically
> - Open source contributions or a side project you're proud of
> - Comfort with infra-as-code (Terraform)
>
> **Compensation**
>
> - Base salary band: USD $170,000 - $210,000
> - Equity: 0.05% - 0.15%, 4-year vest with 1-year cliff
> - Bonus: 10% target annual bonus tied to company OKRs
> - Benefits: full health/dental/vision (US: 100% employee, 80% dependents), $1,000/mo home office stipend, unlimited PTO with a 3-week minimum, 16 weeks parental leave
>
> **About the team**
>
> Seven engineers reporting to [Engineering Lead name if public]. We do 2-week sprints, async-first with two short syncs a week. No on-call rotation yet — we run a small ops team for that. Codebase is 4 years old, well-tested in the parts that matter, getting cleaner.
>
> **How we hire**
>
> 1. 30-min intro with me (the recruiter)
> 2. 60-min technical interview with two engineers — a real problem we've worked on, no LeetCode
> 3. 60-min system design conversation
> 4. 45-min meeting with the engineering lead — culture, working style, your questions for us
> 5. Two short reference calls
>
> Total time investment: about 4 hours over 2-3 weeks. We make decisions within 5 business days of the final round.
>
> **Working arrangement**
>
> - Remote-first across US and Canada
> - Core hours: 11am - 3pm Eastern, with flex around that
> - We meet in person twice a year for a 3-day company offsite (last one was in Mexico City; next one is Lisbon)
> - No required travel beyond the offsites

That JD is ~480 words. It will out-perform 90% of JDs in the same inbox because it gives the candidate enough to make a real decision before applying.

---

## Worked example — lint-only run

The user pasted the hiring manager's original JD:

> "We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

The AI returns:

> **Lint pass — 9 flags in 51 words. Recommend a full rewrite.**
>
> 1. `passionate` — cut (vague, off-puts senior candidates)
> 2. `rock star` — cut (gendered, corporate cringe)
> 3. `fast-paced` — cut (code for "disorganized")
> 4. `dynamic` — cut (says nothing)
> 5. `10x developer` — cut (myth, off-puts thoughtful seniors)
> 6. `thrives in ambiguity` — flag (sometimes legitimate; usually code for "we don't know what we want")
> 7. `wear many hats` — cut (code for "no team support")
> 8. `Bachelor's degree in CS required` — drop OR change to "OR equivalent experience"
> 9. `10+ years of experience` — reconsider (often discriminatory; senior quality often emerges at 6-8 years)
> 10. `work hard and play hard` — cut (age-coded, grind-coded)
> 11. `like a family` — cut (vague, sometimes a boundary flag)
> 12. `Competitive salary` — replace with the actual band
>
> This JD as-is will under-perform on diverse candidate pipeline and will get fewer senior applicants than you'd like. Want me to rewrite it?

---

## When the linter shouldn't fire

Some flagged phrases are legitimate in context. Examples:

- "Aggressive" is fine for "aggressive product roadmap" (a real thing) but not for "aggressive personality" (a hire signal that skews biased).
- "Family" is fine when describing actual family-friendly policies (parental leave, sick-kid days). It's NOT fine as "we're like a family."
- "Recent graduate" is fine for early-careers programs explicitly branded as such. It's NOT fine on a Senior role.

The linter will note these context-dependent cases as "flag, not auto-replace — confirm intent."

---

## How to use this with hiring managers

A common scenario: the hiring manager writes the JD. You think it's bad. You don't want to make them feel attacked.

The lint pass gives you a non-confrontational way to push back. Show them the flagged phrases with the WHY (research-backed: gendered language reduces women applicants by 11%; "10+ years" filters out qualified candidates who have 6-8 years of senior-quality work; education gatekeeping shrinks the diverse pipeline).

You're not telling the hiring manager their writing is bad. You're showing them the data on what the language does to the applicant pool. Most hiring managers update happily once they see it.

---

## Common mistakes the kit will flag

- **No salary band.** Always asks. Always includes.
- **No real "How we hire" section.** Generic "multiple rounds" is a flag — be specific.
- **JD over 800 words.** Trim. Long JDs are indecision.
- **"Bonus" listed in the band but not explained.** Always say the structure.
- **Equity ranges way too wide.** "0.01% - 1%" tells the candidate nothing. Tighten.
- **"Nice to have" section that has the actual requirements.** Don't hide must-haves in nice-to-haves; it confuses candidates and gates good ones.
