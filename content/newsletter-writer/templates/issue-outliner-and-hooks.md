# Issue Outliner + Intro Hook Generator

> Turn a topic into a 5-section structure, and write the first two lines that pull the reader past the preview pane.

---

## Part 1 — The issue outliner

### The shape

```
1. HOOK (lines 1-2)
   The first two lines of the email. Pulls the reader past the
   preview pane. ONE of the five patterns: curiosity, contrarian,
   story, stat, question.

2. SETUP (~150-200 words)
   Context the reader needs. Three short paragraphs. White space
   between them. Establishes the stakes — why this matters this week.

3. MIDDLE (~400-600 words)
   The actual idea. 2-3 worked examples or stories. Specific names,
   specific numbers, specific moments. This is the body of the issue.

4. REFRAME (~100-150 words)
   What to do with this. Or what to think about it. Or what's
   different now. One specific next step the reader can take.

5. SIGN-OFF (~30-50 words)
   Short. Warm but not gushing. One clear call to action OR none
   at all. "Hit reply" works. "Smash that subscribe button" doesn't.
```

Total: roughly 800-1,000 words. The right length is whatever the idea needs. Don't pad to hit a number.

### The prompt

```
You are outlining a newsletter issue. Rules:

1. Use the 5-section shape: Hook → Setup → Middle → Reframe → Sign-off.
2. The Hook is two lines max. Pick ONE of: curiosity, contrarian,
   story, stat, question. Don't propose multiple — pick the one that
   fits the topic.
3. The Setup gives stakes — why this idea matters this week.
4. The Middle has 2-3 worked examples. If I haven't given you
   examples, ask before drafting them.
5. The Reframe ends with one specific next step. "Reflect on this"
   is not a next step. "Open your last issue and find the line where
   you started padding" is a next step.
6. The Sign-off is short. No "smash that subscribe button." No
   "share this with someone who needs it."

Voice: specific, personal, slightly informal. Short paragraphs.
White space. Active verbs.

Output the outline only. Section headers + 2-4 lines of guidance per
section. No commentary unless I ask.
```

### Input shape

```
[The newsletter]
Name + positioning
Subscriber count
Average issue length

[This issue]
Topic / working title
What the reader walks away with
Specific examples, quotes, or data to use
Tone (rant / contemplative / how-to / list / story)

[Constraints]
- Word count
- Things to avoid
```

### Worked example

**Input:**

```
[The newsletter]
"Going Past 100" — weekly for new newsletter writers
Subscribers: 1,400
Avg length: 1,000 words

[This issue]
Topic: how to find your first 100 readers
Walk-away: that the first 100 don't come from social — they come from
DMs to specific people who already trust the writer.
Examples I want to use:
- Sarah's first 80 came from 30 direct emails to friends and ex-coworkers
- My own first 50 came from 12 DMs to people I'd worked with
- The contrast: a friend who launched on Twitter got 200 follows
  and 8 newsletter signups
Tone: direct, slightly contrarian
Constraints: 900 words, no "leverage" or "audience-building"
```

**Output:**

```
1. HOOK (contrarian)
   "Everyone says you should build in public to grow a newsletter.
   For your first hundred readers, that's mostly wrong."
   - Lands the contrarian claim in the first line.
   - Second line names the specific case it'll argue.

2. SETUP (~150 words)
   Three short paragraphs:
   - The mythology: launch day, Twitter momentum, viral first issue.
   - The reality for most writers: launch day gets you 12 signups,
     half of whom never open another issue.
   - The reframe: the first 100 are a different problem than the
     next 1,000. Social is the next-1,000 problem. The first 100
     is a trust problem.

3. MIDDLE (~500 words)
   Three worked examples in order of strength:
   a) Sarah's launch: 30 direct emails to friends and ex-coworkers
      → 80 subscribers. Specifics: she included a one-line "what
      this is and why I think you'd like it." 26 of 30 opened the
      email. 22 of 30 subscribed.
   b) My own launch: 12 DMs to people I'd worked with on past
      projects. Specifics: I asked each person if they wanted to
      see it, didn't sign them up. 10 said yes, 8 stuck.
   c) The contrast: a friend who launched on Twitter. 200 follows
      in the first week, 8 newsletter signups, half unsubscribed
      after issue 2. Reach without trust is noise.

4. REFRAME (~120 words)
   What to do with this:
   - Open your contacts. List 30 people who know you well enough
     that an email from you is not unwelcome.
   - For each, write one sentence on why you think they'd like
     the newsletter. Different sentence per person.
   - Send 5 today. The whole list in 10 days.
   - Don't sign people up. Ask. Let them say yes.

   One specific next step: "Send the first five DMs before you
   close your laptop tonight."

5. SIGN-OFF (~40 words)
   "If you've done this and it worked — or didn't — hit reply and
   tell me. I read every one. — A"
   - Reply CTA is the right move for a small list. Reply rate is
     a leading indicator of engagement and converts to paid better
     than any other signal.
```

What this outline does:

- Hook is one pattern (contrarian), not five competing options.
- Setup has explicit paragraph beats with their own jobs.
- Middle is structured around the three examples the user gave, in order of strength.
- Reframe ends with a concrete next step a reader can do tonight.
- Sign-off uses a reply CTA, which the AI proactively justifies.

The writer takes this outline and writes the issue. The AI didn't write the issue. That's the point.

---

## Part 2 — The intro hook generator

### Why the first two lines matter

In Gmail and most email clients, the reader sees:

```
[Sender name]
[Subject line]
[First ~80 characters of the email body]
```

Those three things are the entire decision to open. The subject line alone is not enough. The first two lines of the email show in the preview pane, and they decide whether the open turns into a read.

If you've ever opened a newsletter and immediately closed it, the first two lines failed.

### The five hook patterns, with examples

**1. Curiosity**
> "I almost didn't send this issue."

> "There's a line I cut from last week's piece that I keep thinking about."

> "I got an email yesterday I'm not sure how to answer."

Pattern: hint at a story or a tension. Make the reader want the resolution.

**2. Contrarian**
> "Everyone says you should write what you know. I think that's wrong for the first six months."

> "Build-in-public works. But not the way you think."

> "I unsubscribed from 14 newsletters this weekend. Here's the pattern."

Pattern: invert or complicate a piece of common wisdom. The reader has to read on to see whether you've earned the contradiction.

**3. Story**
> "Last Tuesday a reader emailed me to ask why I'd unsubscribed her. I hadn't. Substack had."

> "On Sunday I sat down to write this issue and ended up writing a different one."

> "Two months ago a writer I admire DM'd me with a question I couldn't answer."

Pattern: a specific moment, a specific person, a specific time. Stories pull readers because stories are how humans pay attention.

**4. Stat**
> "Forty-eight percent of newsletter writers stop in the first three months. I almost did at month four."

> "On average, this newsletter gets one reply for every 87 reads."

> "Last quarter, 60% of my new subscribers came from one source. It's not the one you'd guess."

Pattern: a number with a personal frame. Numbers create authority; the personal frame keeps it human.

**5. Question**
> "What's the smallest thing you could ship this week that would teach you something?"

> "When was the last time you wrote something you weren't sure was good?"

> "Who do you imagine when you write?"

Pattern: a question the reader can't easily answer, that names something they've been thinking about. Works best for contemplative issues.

### The prompt

```
You are writing the first two lines of a newsletter issue. Rules:

1. Pick ONE of the five hook patterns: curiosity, contrarian, story,
   stat, question. Don't propose all five — pick the one that fits
   the issue.
2. Two lines maximum. Counts: line one is roughly the subject-line
   length; line two is one short sentence.
3. Specific. A real moment, a real person, a real number, a real
   piece of conventional wisdom.
4. No "Hi friends, hope you're well." No "Welcome back to <newsletter>."
   No "Today I want to talk about X."
5. The second line should make the first line make sense, OR escalate
   the tension the first line opened.

Voice: personal, specific, slightly informal. Active verbs.

Output the two lines and which pattern you used. No commentary unless
I ask.
```

### Worked example

**Input:**

```
Issue topic: how to find your first 100 readers
Tone: direct, slightly contrarian
Walk-away: the first 100 come from DMs to people who trust you, not
from social.
```

**Output:**

```
Pattern: Contrarian

"Everyone says you should build in public to grow a newsletter. For
your first hundred readers, that's mostly wrong.

The move isn't a launch tweet. It's twelve DMs."

Why this works:
- Line 1 names the wisdom and inverts it in one breath.
- Line 2 escalates: specific number (12), specific channel (DMs).
- Together they promise the issue will say what to do, not just
  what's wrong with the conventional approach.
```

### When to use which pattern

- **Curiosity** — when the issue has a story or a personal reveal. Default for personal essays.
- **Contrarian** — when the issue argues against conventional wisdom. Best for opinionated takes.
- **Story** — when the issue starts with a specific incident. Best for narrative-shaped issues.
- **Stat** — when you have a real number that lands. Best for data-driven issues.
- **Question** — when the issue is contemplative and you want the reader to think with you. Use sparingly; questions can land flat if the rest of the issue doesn't honor them.

The AI picks one and commits. If the user wants to see a different pattern, they ask explicitly.

---

## When to skip the outline

You don't need to outline every issue. Skip the outline when:

- You already know what you're writing and the issue is under 500 words.
- The issue is responding to a specific reader email or current event — write it before you over-think it.
- You're in a writing flow and the outline would interrupt it.

When to definitely outline:

- Issues over 1,200 words.
- Issues you've been procrastinating on for more than a week.
- Issues you're nervous to send.
- Anything where the topic feels bigger than the format.

The outline isn't a contract; it's a thinking tool. Once you have it, you can deviate from it freely. The point is to know what you're trying to do before you start drafting.
