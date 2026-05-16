# Subject-Line Tester + Growth-Loop Ideas

> Five subject-line variants per topic, each named by pattern with a predicted-open call. Plus the growth moves that actually work for newsletters under 10k subscribers.

---

## Part 1 — The subject-line tester

### Why subject lines are the whole game for opens

A typical newsletter writer ships 50 issues a year. Each subject line is 60 characters that decide whether the reader opens. Improving subject-line craft by 10 percentage points in open rate compounds across every issue, every year. There is no other lever in newsletter writing with the same return on attention.

The mistake most writers make: they write a working title for the *piece*, then send the same string as the subject line. The title's job is to label the content. The subject line's job is to earn the open. Different jobs, different optimization.

### The five patterns

1. **Number** — "The 3 things I changed before hitting 1,000 readers"
2. **Contrarian** — "Stop A/B testing your subject lines"
3. **Curiosity** — "What happened when I deleted my Twitter"
4. **Identity** — "For writers who hate the word 'creator'"
5. **Urgency** — "Read this before you launch your next issue"

Hybrid patterns are fine. "The 3 DMs to send before your next issue" combines number + urgency. When proposing variants, the AI names the pattern so the writer can see the move.

### The prompt

```
You are generating subject-line variants for a newsletter issue.
Rules:

1. Produce exactly 5 variants. Not 10. Not 3. Five is the right
   number for human comparison.
2. Each variant uses one of the five patterns: NUMBER, CONTRARIAN,
   CURIOSITY, IDENTITY, URGENCY. Label which pattern.
3. After each variant, write:
   - Predicted open: low / moderate / high (relative to the writer's
     baseline open rate, which I'll give you)
   - Risk: one specific thing that could go wrong with this variant
4. After the five, pick the 1-2 you'd recommend, with reasoning.
   Name the runners-up the writer should NOT use, and why.
5. Avoid:
   - Clickbait without payoff ("You won't believe...")
   - ALL CAPS or punctuation spam (!!!)
   - Emoji unless the brand is built on it
   - Generic phrasing ("Want to grow your newsletter?")

Output the 5 variants + the recommendation. No commentary unless I ask.
```

### Input shape

```
[The newsletter]
Name + positioning
Subscriber count
Baseline open rate (e.g., "48%")

[This issue]
Topic / working title
What the reader walks away with
Tone (rant / contemplative / how-to / story)
```

### Worked example

**Input:**

```
[The newsletter]
"Going Past 100" — weekly for new newsletter writers
1,400 subscribers
Baseline open rate: 48%

[This issue]
Topic: how to find your first 100 readers
Walk-away: the first 100 come from DMs to specific people who trust
the writer, not from social.
Tone: direct, slightly contrarian
```

**Output:**

```
1. NUMBER
   "The first 100 readers don't come from Twitter"
   - Predicted open: High (above baseline). Specific number, mild
     contrarian flavor, plain language.
   - Risk: reads as anti-Twitter. May polarize readers who associate
     their growth with Twitter.

2. CONTRARIAN
   "Stop building in public until you have 100 readers"
   - Predicted open: Highest of the five for this audience. Inverts
     a common newsletter mantra.
   - Risk: the body has to actually support the contrarian claim,
     or readers feel baited.

3. CURIOSITY
   "What I did instead of posting on launch day"
   - Predicted open: Moderate-high. Personal, story-shaped, mild
     mystery.
   - Risk: lands flat without a strong intro hook. The first two
     lines have to deliver.

4. IDENTITY
   "For writers who don't want to become influencers"
   - Predicted open: Bimodal. Strong with the subset who identify;
     skipped by the rest.
   - Risk: small-list-friendly because it self-segments, but loses
     readers who are influencer-ambivalent.

5. URGENCY
   "Send these 10 DMs before your next issue"
   - Predicted open: High. Action-forward, time-bounded, low
     buzzword count.
   - Risk: feels prescriptive. Body has to deliver a specific
     10-DM playbook or readers feel oversold.

**Recommended for this issue:** #2 (Contrarian) or #5 (Urgency).

Contrarian if the issue actually pushes hard against build-in-public
orthodoxy in the body. Urgency if the body delivers a specific
10-DM template the reader can use this week.

**Do not use:**
- "Want to grow your newsletter?" — generic, low specificity, will
  underperform baseline.
- "Here's how I got my first 100 subscribers" — fine but unremarkable.
  Reads like every newsletter intro on the topic.
```

That's the move. Five real variants, each named, each with a call and a risk. The recommendation is specific to the body's commitment level.

### What separates a good subject line from a great one

The AI checks variants against three filters:

1. **Specificity.** A number, a name, a verb. "3 things" is more specific than "things." "DMs" is more specific than "messages." "Tuesday" is more specific than "the other day."

2. **Promise.** What does the reader expect when they open? If the body doesn't deliver on the subject line, the next issue's open rate drops. Cynical openers train cynical readers.

3. **Pattern hygiene.** Each pattern has a failure mode. Curiosity becomes mystery without payoff. Contrarian becomes hot-take without substance. Identity becomes flattery. Urgency becomes manufactured. The AI flags when a variant is sliding into the failure mode.

---

## Part 2 — Growth-loop ideas

### The honest math for lists under 10k

Most newsletter-growth advice is written by people whose newsletters grew via one viral moment they can't replicate. The math that holds for repeatable growth at this size:

| Tactic | Effort | Realistic add | Notes |
|--------|--------|---------------|-------|
| SwapStack swap | 1 hour | +20-100 per swap | Best for 1k+ list. Match by audience, not just by size. |
| Manual cross-promo | 2-3 hours | +30-150 per swap | Higher quality than SwapStack; you pick the partner. |
| Guest essay in a larger newsletter | 8-15 hours | +50-500 per essay | The single highest-ROI lever under 10k. |
| Substack/Beehiiv recommendations | 30 min setup | +1-5/week passively | Compounds. Free. Do it. |
| Social repurposing | 2-3 hours per issue | 0.5-2% of social audience converts | Reaches readers who don't subscribe via email yet. |
| Referral program | 1-2 hours setup | +5-15% organic boost | Modest. Worth doing. Not a magic curve. |
| Paid acquisition (under 5k) | $$$ | Math rarely pencils | Open rates on bought subs tank, drags deliverability. Skip. |
| "Going viral" | N/A | N/A | Not a strategy. Lucky bonus when it happens. |

### The prompt

```
You are recommending growth moves for a newsletter writer. Rules:

1. I'll give you the writer's current size, open rate, and time budget
   per week for growth work. You'll recommend 2-3 specific tactics for
   the next 30 days.
2. For each tactic:
   - What to do (specific, not generic)
   - Realistic add (use the table — don't promise more than the
     numbers support)
   - Time cost
   - One thing that will go wrong if they don't watch for it
3. If they ask about a tactic the table marks as low-ROI (paid acq
   under 5k, going viral), push back honestly. Don't include it just
   because they asked.
4. End with one thing to STOP doing if their time budget is tight.

Voice: direct, calibrated. Promise what the numbers support; don't
oversell.
```

### Input shape

```
[The newsletter]
Subscribers + open rate
Time budget for growth work (hours/week)
Goals for the next 90 days (subscriber count, paid conversion, etc.)

[What's been tried]
- Tactic + outcome
- Tactic + outcome
```

### Worked example

**Input:**

```
[The newsletter]
1,400 subscribers, 48% open rate
Time budget: 4 hours/week for growth
Goal: 2,500 subscribers in 90 days

[What's been tried]
- Twitter posting: ~80 followers/month, ~5 newsletter signups/month
- One Substack recommendation set up 2 months ago: ~3/week passively
- One swap last month with a similar-size newsletter: +47 subscribers
```

**Output:**

```
You're at 1,400, you want 2,500 in 90 days, and you have 4 hrs/wk
for growth. That's roughly 12 new subs/week needed. Math is doable.

**Recommended for the next 30 days:**

1. **Two cross-promo swaps** (3-4 hrs total)
   - Pick partners with similar audiences, not just similar size.
     Look for newsletters in adjacent niches with 1-3k subscribers.
   - Realistic add: 60-200 subscribers total across two swaps.
   - Watch for: a partner with a stale list. Ask their open rate
     before committing — if it's under 30%, walk away.

2. **One guest essay pitch to a 5-15k newsletter** (8-12 hrs)
   - Highest-ROI lever at your size. Pick one newsletter you read
     and admire. Pitch a specific piece (not "I'd love to write
     something for you"). Mention what you'd write and why it fits.
   - Realistic add: 50-300 subscribers if it lands.
   - Watch for: rejection or silence. Plan a second pitch if no
     reply in 10 days. Don't burn your one swing on a long-shot.

3. **Substack recommendations expansion** (30 min)
   - You have one set up. Add 3-5 more, all newsletters you genuinely
     read. Reciprocity is the move — the ones you recommend will
     often recommend you back.
   - Realistic add: +3-10/week passively (compounds with your
     current 3/wk).
   - Watch for: nothing. This is the freest growth move you have.

**Stop doing:** Twitter posting at the current intensity. 5 signups/month
for the hours you're spending isn't paying. Either go deeper
(threads, replies as content, an actual strategy) or pull back to
2-3 posts a week and put the time into the guest essay.

**Not recommended despite being common advice:**
- Paid ads at 1,400. Math won't work. Wait until 5k minimum.
- "Build in public" as a growth strategy on its own. You already
  do enough of this passively. It's not where the next 1,100
  subscribers come from.

**90-day math:**
- 8 swaps × ~50 = 400
- 2-3 guest essays × ~150 = 350
- Recommendations + organic + Twitter rump: ~250
- Total estimate: 1,000-1,200. Lands you at 2,400-2,600.

Possible. Tight. Worth doing.
```

What this output does:

- Honest math up front. "12 new subs/week" turns the goal into something the user can plan against.
- Recommends three tactics from the realistic-add table. Names time costs.
- Tells the user what to STOP doing — Twitter at current intensity isn't paying.
- Pushes back on paid acquisition and generic build-in-public despite their commonness.
- Closes with cumulative math against the 90-day goal.

That's a growth plan, not a list of generic tactics.

---

## How subject lines and growth fit together

A subject-line improvement of 5 percentage points (e.g., 43% → 48% open rate) on a 1,400-subscriber list is worth +70 incremental reads per issue. Across 52 issues a year, that's 3,640 additional reads — more reach than most growth tactics deliver at this size.

The implication: subject-line craft is a growth lever, not just a content lever. A writer who improves their average open rate by 5 points gets the equivalent of one good guest essay every quarter — without writing the guest essay.

The other implication: if you have limited time, getting better at subject lines pays more than chasing new subscribers. Both work; subject lines compound faster.
