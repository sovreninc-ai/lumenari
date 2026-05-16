# Timing — When to Post the Show HN

Companion to `show-hn-post.md`. The post itself is one shot. The launch window is the other half of the bet.

---

## Best windows (as of May 2026)

The historical sweet spot — and still the best practice serial Show HN posters target — is **Tuesday through Thursday, 9:00–11:00am Pacific** (12:00–2:00pm Eastern; 5:00–7:00pm UK; 6:00–8:00pm CET).

Why this window:
- US West Coast is starting the workday and pulling up HN with coffee.
- US East Coast is in the post-lunch lull, peak HN-tab moment.
- Europe is in the late-afternoon "reading something interesting before logging off" zone.
- The overlap is roughly 90 minutes where all three regions are awake and on the site simultaneously. That's the densest pool of voters in a 24-hour cycle.

Within those days, **Tuesday is marginally the strongest** — Monday's submissions have aged out of /new, the front page is hungry for something fresh, and people are recovered enough from the weekend to actually engage with a thread. Wednesday is essentially as good. Thursday is the last clean shot before the weekend drop-off begins.

---

## Windows to AVOID

- **Friday afternoon (any timezone).** Engagement craters. Even strong posts get half the upvote velocity. Worst-case time to submit.
- **All weekend.** The audience is smaller and skews more casual — fewer of the high-karma upvoters who push posts onto the front page are around.
- **Monday morning.** People are catching up on email and Slack, not browsing HN. Submissions before ~10am ET on Monday rarely get the early traction needed.
- **US holidays.** Memorial Day weekend, July 4th week, Thanksgiving week, the December 23–January 2 window. Even non-US holidays matter because so much of HN's voting cohort is American.
- **Major industry event days.** WWDC keynote, Google I/O keynote, Anthropic / OpenAI announcement days. Your post will be drowned out by the news cycle. Check the calendar before locking in the date.

---

## Mechanics — one shot per submission

HN's flame-graph algorithm is unforgiving. The relevant facts:

- A submission needs upvote velocity in the **first 30 minutes** to escape /new and land on the front page. If it sits at 0–1 points after 30 minutes, it's effectively dead — buried under the constant inflow of new submissions.
- **You cannot resubmit the same URL** without it being flagged as a dupe (or, if you wait long enough, getting much weaker treatment than a fresh submission). Practically: you get one launch.
- **Don't post twice.** Don't post a "fixed the title" version 20 minutes later. The first submission's score is sticky against the URL.
- **Don't ask for upvotes.** HN moderators (dang especially) actively penalize posts where vote rings are detected, and the community will smell coordinated voting from a mile away. The penalty is invisible — your post just stops gaining traction with no warning.

### The "second wind" check

Rough rule serial Show HN posters use:
- **5+ points within 30 minutes** → the post has a chance. Stay engaged.
- **10+ points within an hour** → likely front page within 2 hours.
- **2 or fewer points after 30 minutes** → it's not happening this time. Move on. Don't try to rescue it; the algorithm has decided.

You cannot will a post to the front page after the first half hour. The work happens in the title, the body, the timing, and the first OP comment (see `show-hn-post.md`).

---

## Recommended slot for Lumenari

**Primary target: Tuesday, 9:15am Pacific (12:15pm ET / 17:15 UK / 18:15 CET).**

Rationale:
- Tuesday gives the cleanest front page (Monday's submissions have rotated out).
- 9:15 PT lands inside the three-region overlap window with a small offset from the top of the hour — avoids the cluster of submissions that get posted exactly at 9:00.
- Calgary time: 10:15am MT — Chris is awake, off-shift, and able to post the first OP comment within 2 minutes of submission and stay on the thread for the critical first 90 minutes.

**Backup slot: Wednesday, 9:30am Pacific.**

Use this if Tuesday is blocked by:
- A pipefitting shift Chris can't get off of.
- A major industry announcement that day.
- A Lumenari production issue still being worked on (do not launch into a known broken state).

If both Tuesday and Wednesday are blocked, **wait a week.** Don't burn the launch on a Thursday afternoon to "just get it out." A delayed launch is better than a wasted one.

---

## Coordinate with ProductHunt

Don't stack ProductHunt and Show HN on the same day. Two different audiences, two different attention budgets.

- **Show HN first.** Use HN feedback to refine the pitch, fix obvious bugs surfaced in the thread, and build a small base of technical early users.
- **ProductHunt 1–2 weeks later.** PH rewards launches that already have some momentum and traction to point at ("featured on HN front page" is a real PH boost). The reverse is not true — PH traction doesn't help an HN submission.

Specific recommendation:
- Tuesday, week 1: Show HN.
- Tuesday or Wednesday, week 2 or 3: ProductHunt launch (ProductHunt's own front page algorithm peaks at 12:01am PT — different mechanic, different prep).

---

## Pre-launch checklist (run the morning of)

The hour before posting is the most important hour. Don't skip:

1. **Production smoke test** — load lumenari.io fresh in an incognito window. Run the recommendation wizard. Buy a test kit with a Stripe test card. Confirm the email lands.
2. **Front page above the fold** — no broken images, no console errors, no "v0.9 beta" labels you forgot to remove.
3. **Capacity check** — Vercel function concurrency limits, Supabase connection pool, Anthropic API rate limit headroom. A front-page post can do 10–50K visits in 6 hours. The wizard is the most expensive endpoint; confirm the heuristic fallback is wired.
4. **Have the first OP comment in a text file, ready to paste.** Don't write it live.
5. **Phone notifications on for HN replies.** The first 90 minutes of comment response is what separates a front-page post from a front-page-and-stays-up post.

When all five are green, post.
