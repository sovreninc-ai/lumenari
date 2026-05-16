# Interview Prep + Follow-Ups

> STAR / behavioral / technical interview prep, plus the three follow-up emails every job search needs: thank-you, post-rejection, and ghost-recovery.

---

## Part 1 — Behavioral interview prep (STAR)

### How STAR actually works in practice

Most people get STAR wrong by spending 80% of the answer on Situation and Task. The interviewer doesn't care about the setup. They care about what *you* did and what happened.

Right ratio:

- **Situation (10%)**: One sentence. "At Acme, we were seeing webhook retry failures at about 12% of all events."
- **Task (10%)**: One sentence. "I was the on-call engineer that quarter and the failures were waking me up two nights a week."
- **Action (60%)**: Specific steps *you* took. First person "I," not "we." This is the meat.
- **Result (20%)**: Numbers if you have them. The outcome — for the team, the customer, the business.

If you say "we" more than twice, the interviewer doesn't know what you did. Use "I." When the work was genuinely collaborative, say "I led" or "I owned the X piece while two engineers handled Y."

### The prep prompt

```
You are helping me prep behavioral interview answers in STAR format.
I will give you a question and the rough story I want to tell. You
will produce a tight STAR answer in ~200 words.

Rules:
1. Situation: 1 sentence max.
2. Task: 1 sentence max.
3. Action: 60% of the answer. First-person "I." If the work was
   collaborative, name what I specifically owned vs. what others did.
4. Result: end with a number or a concrete outcome. If I don't have
   a number, ask me before inventing one.
5. ~200 words. Reads cleanly out loud in 90-120 seconds.
6. No buzzwords (passionate, results-driven, dynamic). No filler.

After producing the answer, ask me one follow-up question the
interviewer is most likely to ask. Suggest a brief tail to my answer
that addresses it preemptively if useful.
```

### The 6-8 stories you should have ready

Before any onsite, prep 6-8 stories that you can flex into different questions. Most behavioral questions are variations on these themes:

1. A time you led something
2. A time you disagreed with a peer or manager
3. A time you failed
4. A time you had to learn fast
5. A time you made a hard tradeoff
6. A time you mentored or developed someone
7. A time you delivered under pressure
8. A time you pushed back on a stakeholder

For each, write 3-4 sentences of context plus the outcome. You're not memorizing scripts — you're prepping the raw material so the AI can shape it into the right answer in the moment.

### Worked example

**Question:** "Tell me about a time you disagreed with your manager."

**User's raw input to the AI:**

```
At Acme, my manager wanted to ship the new payments feature in 4 weeks
without a feature flag because the customer was waiting. I thought
that was a bad call — we'd never shipped payments without a flag and
the customer wouldn't notice an extra week. I pushed back, ended up
adding the flag, and rolling the feature out over 2 weeks. We caught
a bug in week 1 that would have cost ~$80k if we'd shipped at 100%.
```

**STAR answer the AI produces:**

```
At Acme, my manager pushed to ship a new payments feature in four
weeks without a feature flag because a key customer was waiting.

I owned the deploy and disagreed — we'd never shipped a payments
change without a flag, and I didn't think the customer would feel
an extra week.

I pulled the runbook and wrote up the risk: any bug at 100% rollout
hits every customer, and our average revenue-impact incident in
payments was around $80k. I proposed flagging the feature and rolling
it from 5% to 25% to 100% over two weeks. My manager pushed back twice
on timeline pressure, but I held the line on the architecture and
offered to take the customer call myself to explain the rollout plan.
We added the flag.

In week one at 25%, we caught a webhook retry bug that would have
fired duplicate charges at full rollout. Estimated cost avoided:
roughly $80k. Customer got the feature on the original date because
we'd planned the rollout in parallel with the build. My manager and
I went on to default-flag every payments deploy after that.

(Likely follow-up: "How did you handle your manager's pushback?" —
I'd add a sentence: I asked him what he was optimizing for, agreed
on it explicitly with the customer, then made the architectural case
in writing so we could disagree on data instead of opinion.)
```

That's 220 words, reads in about 100 seconds, and shows judgment, ownership, communication, and outcome. The follow-up suggestion is the bonus — the AI flags where the interviewer is likely to dig and gives you a pre-built response.

---

## Part 2 — Technical interview prep

### What the AI is good at

- Pattern-matching algorithm problems and explaining the solution shape.
- Walking through system-design problems with the standard rubric (functional requirements, non-functional, API, data model, scale, bottlenecks, tradeoffs).
- Mock-interviewing you on debugging or code-reading questions.
- Generating "what would you do if" follow-ups so you're not surprised in the room.

### What the AI is bad at

- Replacing actual practice. You have to write code or whiteboard the design yourself. Reading the AI's solution is not the same as producing it under pressure.
- Predicting what *your* interviewer will ask. The AI can simulate the average; the actual room will be its own thing.

### Useful prompt patterns

**For system design:**

```
I have a system design interview tomorrow at <company>. The role is
<senior backend>. Walk me through how you'd structure 45 minutes on
this problem: "Design a webhook delivery system for a Stripe-like
platform."

Then ask me 3 questions about the design choices I'd want to be
prepared to defend.
```

**For algorithms:**

```
I'm rusty on dynamic programming. Give me 3 medium-difficulty DP
problems with a one-line hint each. Don't show me solutions yet.
I'll attempt them and come back.
```

**For mock interviews:**

```
You are a senior engineer interviewing me for a backend role. Ask me
one debugging question. After I respond, ask follow-ups as the
interviewer would. Don't help me — push me. Tell me at the end how
my answer would have landed.
```

The "push me, don't help me" line matters. AI defaults to being nice. You don't want nice in a mock; you want the questions the actual interviewer will ask.

---

## Part 3 — The three follow-up emails

### Email 1 — Post-interview thank-you (send within 24 hours)

**Prompt:**

```
Write a 100-130 word thank-you email after a job interview. Rules:

1. Reference one specific thing the interviewer said. Not a generic
   "thanks for your time."
2. Briefly reinforce one thing about my fit — pick the strongest
   signal from the conversation.
3. Open the door for follow-up questions. Don't beg for the role.
4. Sign-off is professional, not eager.
5. Subject line: "Thanks — <my name> / <role>"

I'll give you: the interviewer's name, the role, one specific thing
they said, and one thing I want to reinforce.
```

**Worked example:**

```
Subject: Thanks — Alex / Senior Backend Engineer

Maya,

Thanks for the conversation today. The bit about how you're thinking
about webhook ordering when retries arrive out of sequence stuck with
me — that's a problem I've spent more time on than is probably
healthy, and it sounds like you're approaching it the same way we
did at Acme.

If it would help the team, I'm happy to walk through the specific
retry-ordering decision tree I wrote up last year — it's the kind of
thing easier to share live than to type out. Either way, glad we
got to talk. Hope the rest of the loop goes smoothly.

— Alex
```

Send one to every interviewer you have an email for, individualized per person. Reusing the same email word-for-word is fine if the only thing that changes is the specific reference — but the specific reference does have to change.

### Email 2 — Post-rejection (send within 48 hours of the no)

This one matters. Most people don't send it. The ones who do get warm intros and "we'd love to keep you in mind" follow-ups months later when the right role opens.

**Prompt:**

```
Write a 80-100 word gracious response to a job rejection. Rules:

1. Thank them for the time and the decision. No bitterness.
2. Acknowledge the outcome without rehashing the interview.
3. Leave the door open: ask to stay in touch, mention you'd be open
   to the right role in the future.
4. Optional: ask for one piece of feedback. Be direct ("if you have
   five minutes for one specific bit of feedback") — vague asks
   ("any feedback would be appreciated") get vague answers.
```

**Worked example:**

```
Maya,

Thanks for letting me know, and for the team's time on this loop.
The conversations were genuinely some of the better ones I've had
this search — appreciate the honesty about where you landed.

If a senior backend role in payments opens up later this year, I'd
welcome being on your list. And if you have five minutes for one
specific bit of feedback on what tipped it the other way, I'd find
it useful.

Best,
Alex
```

The one-specific-bit-of-feedback ask gets answered roughly 40% of the time when phrased this way. Generic "any feedback" gets answered 5%.

### Email 3 — Ghost recovery (when you've heard nothing for 14 days)

Two stages. Day 7 is a light ping. Day 14 is a real follow-up.

**Day 7 (light ping):**

```
Maya,

Wanted to check in on the senior backend role we spoke about on
[date]. Happy to share anything else that would help.

— Alex
```

That's it. Three lines. Don't add filler.

**Day 14 (real follow-up):**

```
Subject: Quick follow-up — Senior Backend / Lumenari

Maya,

Following up on our conversation about the senior backend role on
[date]. I know loops slow down for all kinds of reasons that have
nothing to do with the candidate, so no pressure either way — just
checking whether the role is still open and where I stand.

If timing has shifted on your end, I'd rather know than not. And if
the answer is no, that's fine too; I'd appreciate the closure to
plan my search.

— Alex
```

If you don't hear back within a week of the day-14 email, mark it lost and move on. Don't send a third follow-up. The signal is clear enough.

---

## Tracking the search

A simple tracker beats elaborate ones. Five columns:

| Company | Role | Applied | Stage | Last contact |
|---------|------|---------|-------|--------------|
| Lumenari Co | Sr Backend Eng | 2026-05-01 | Onsite scheduled | 2026-05-12 |
| Beta Co | Staff Eng | 2026-05-03 | Recruiter screen | 2026-05-08 |
| Gamma Co | Sr Backend Eng | 2026-04-25 | Ghosted (day 14 sent) | 2026-05-09 |

Update it after every interaction. Without it, week six of the search becomes a fog.

---

## What this playbook will not do

- Memorize a script for you. Practice the answers out loud. The AI can shape the words; your mouth has to know them.
- Tell you whether to take the offer. That's a values question. Make a list of what matters and weight it. The AI can help you make the list; it can't make the call.
- Cover compensation negotiation. That's a separate playbook and the wrong tool here would be expensive. For now: never accept on the call, take 24-48 hours, counter with one ask anchored to market data.
