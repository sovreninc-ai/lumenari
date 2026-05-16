# Cover Letter + LinkedIn Rewrite

> Two artifacts that share a voice. Cover letters are read about 30% of the time — write them anyway, and make them short. LinkedIn is read more often than the cover letter and matters more than people realize.

---

## Part 1 — The cover letter

### The prompt

```
You are writing a cover letter for the user. Rules:

1. Three paragraphs. ~200 words total. Maximum 220.
2. Paragraph 1 (~50 words): open with a specific reason the user is
   writing to THIS company. Reference a product, a person, a recent
   launch, or a problem the user has actually thought about. NEVER
   open with "I am writing to apply for the position of."
3. Paragraph 2 (~100 words): one concrete story that maps the user's
   experience to the JD. Specific outcome. Not a recap of the résumé.
4. Paragraph 3 (~50 words): close with a clear next step. Confidence
   without arrogance. No "I would love the opportunity to discuss."
5. Voice: sounds like the user wrote it. Slightly informal for
   startups, slightly formal for finance or enterprise. Never a
   press release. Never a humblebrag.
6. No buzzwords (passionate, results-driven, fast-paced, dynamic).
7. No "transferable skills" framing. Just show the work.

Output the cover letter only. No commentary.
```

### Input shape

```
[Target role]
Title, company, one line on what they do.

[Specific hook]
The one thing about this company you'd lead with. Pick exactly one.
Examples:
- "I've been using your product for 18 months and it's the only
  tool in this category that ships at a real cadence."
- "I worked on a similar payments problem at <prev co> and want to
  spend the next 4 years going deeper on it."
- "I've followed <hiring manager's name>'s writing for years and the
  team's recent post on event-driven architecture clarified some
  things I'd been wrong about."

[The mapped story]
One project, two-to-three sentences of context, the outcome.

[Sign-off energy]
Confident, available, low-pressure.
```

### Worked example

**Input:**

```
[Target role]
Senior Backend Engineer, Payments — Lumenari Co (AI tooling marketplace,
~$2M/mo transactions)

[Specific hook]
"I built a Stripe Connect + Postgres payments stack at a marketplace
doing similar volume for the last three years, and your recent
engineering blog post on idempotent webhook retries is exactly the
architectural direction I've been pushing my team toward."

[The mapped story]
At Acme, owned payments subsystem processing ~$4M/mo. Cut webhook
retry failures 78% by adding idempotency keys + dead-letter queue.
Mentored two mid-level engineers, both promoted to senior in 18 months.

[Sign-off energy]
Available to talk this week or next; happy to share more detail on
the retry-failure work if useful.
```

**Output the AI returns:**

```
Maya,

Your engineering post on idempotent webhook retries is exactly the
architectural direction I've been pushing my team toward for the past
year — I'm writing because I think I can help you ship the next layer
of it.

For the last three years I've owned a Stripe + Postgres payments stack
at Acme Co, a marketplace doing roughly $4M/month in transactions. The
work I'm most proud of: I cut webhook retry failures by 78% over six
months by introducing idempotency keys and a dead-letter queue, then
hardened the on-call rotation enough that P1 page volume dropped from
twelve a month to three. Along the way I mentored two mid-level
engineers; both are now seniors. The mentorship piece is part of why
I'm looking — I'd like the next role to make it official.

I'm available to talk this week or next. Happy to share the retry-
failure architecture in more detail if it would be useful before a
conversation.

— Alex
```

What this letter does right:

- Opens with a specific reference to the company's engineering content. Hiring manager knows you actually read it.
- Body paragraph names tools, numbers, and outcomes — not a résumé recap.
- Mentions mentorship in the user's voice ("the mentorship piece is part of why I'm looking") because the JD explicitly asked for it.
- Closes with availability and a soft offer (the retry-failure architecture). No "I would love the opportunity."

---

## Part 2 — LinkedIn rewrite

Three sections matter, in order: headline, About section, and the top of Experience.

### Headline (120 characters max)

What recruiters see in search results.

**Bad:**

```
Senior Software Engineer | Passionate Builder | AWS / TypeScript / React
```

**Better:**

```
Senior Backend Engineer — payments, Stripe, Postgres | Mentor | Calgary / Remote
```

Rules the prompt enforces:

1. Lead with the role you're targeting, not your current title if those differ.
2. Three specific keywords next — tools you genuinely use, not a tech-stack salad.
3. Optional third segment: location or availability ("Open to remote NA").
4. No buzzwords. No "Passionate Builder," "Code Slinger," or "Tech Enthusiast."

### About section — first three lines are everything

Only the first ~210 characters show before "...see more" cuts off. Optimize for those.

**Prompt:**

```
Write the user's LinkedIn About section. Rules:

1. First sentence (~140 chars max): position statement. What they do,
   who for, and one outcome. This is the only line many recruiters read.
2. Next two sentences fit inside the first ~210 chars total. Hook the
   reader into clicking "see more."
3. Total length: 4-6 short paragraphs, ~150 words.
4. First-person, conversational. Sounds like the user wrote it, not a
   PR person.
5. End with one specific call to action: "DM me if you're hiring for
   X," or "I write about Y at <link>," or "Open to senior backend
   roles in the payments space."
```

**Worked example:**

```
I build payments infrastructure for marketplaces. For the last three
years I've owned a Stripe + Postgres stack processing $4M/month at
Acme Co — webhooks, on-call, mentorship, the whole thing.

Before Acme I was at a fintech startup where I learned the lesson
every payments engineer learns the hard way: idempotency is not
optional, dead-letter queues are not optional, and the runbook is
read at 2 a.m. by someone who didn't write it.

I care about three things in a role:
- Hard problems with real users
- A team where mentorship cuts both ways
- The autonomy to ship without theater

Currently in Calgary, open to remote roles in North America. DM me
if you're hiring for a senior backend engineer in payments — I'm
particular about where I'd go, and I'd rather have one good
conversation than ten polite ones.
```

What the first 210 chars (~3 lines) show:

```
I build payments infrastructure for marketplaces. For the last three
years I've owned a Stripe + Postgres stack processing $4M/month at
Acme Co — webhooks, on-call, mentorship, the whole thing.
```

That's the hook. Recruiter sees role, tool, outcome in the first paragraph and knows whether to read more.

### Experience section — top of current and most recent roles

LinkedIn truncates after 2-3 lines per role unless someone clicks expand. So the first two lines of each role are the equivalent of your résumé's top third.

**Prompt:**

```
Rewrite the first 2-3 bullets of the user's current role on LinkedIn.
Rules:

1. First bullet: a one-line summary of scope and impact at this role.
2. Second bullet: the single most relevant accomplishment for the
   roles the user is targeting.
3. Third bullet (optional): a second accomplishment that shows range.
4. Same style rules as résumé: active voice, specific numbers, no
   buzzwords, JD-aligned vocabulary.
5. Output the LinkedIn-formatted text only.
```

Worked example output:

```
Senior Backend Engineer at Acme Co
2022 - Present · Calgary, AB (Remote)

→ Own payments and webhooks subsystem (Stripe + Postgres + Kafka)
  for a marketplace doing ~$4M/month in transactions.
→ Cut webhook retry failures 78% by introducing idempotency keys
  and a dead-letter queue; P1 pages dropped 75% over six months.
→ Mentor 2 mid-level engineers; both promoted to senior in 18 months.
```

---

## How the two artifacts work together

The cover letter and the LinkedIn About section should not be identical, but they should share a voice and a position. If your cover letter says you "own a Stripe stack at a marketplace doing $4M/month," your LinkedIn About should say the same thing — phrased differently. Recruiters who read both will notice if you sound like two different people.

Run the cover-letter prompt and the LinkedIn-About prompt back-to-back in the same chat. The AI will keep the voice consistent.

---

## Anti-patterns the prompt blocks

- "I am writing to apply for the position of [role]." — Cut on sight.
- "I am thrilled by the opportunity to..." — Cut.
- "Please find attached my résumé." — They know. Cut.
- "I would love the opportunity to discuss how my skills..." — Cut.
- "Tech Enthusiast | Lifelong Learner | Coffee Addict" in the LinkedIn headline — Cut.
- "Results-driven, detail-oriented self-starter passionate about..." — Cut all of it.

If any of these slip through, prompt: "Strip every cliché from this draft and rewrite in plain language."
