# Launch Day Checklist — Hour by Hour

The first 12 hours decide the day. No improvising. Work the table.

All times in PT. Adjust to local (Calgary = +1 from PT).

---

## Hour-by-hour

| Time (PT) | Action | What to do | Where | Tools needed |
|-----------|--------|------------|-------|--------------|
| 11:50pm T-1 | Final pre-flight | Open PH draft, verify tagline, gallery, description, hunter assignment, links. Verify lumenari.io loads cleanly. Run wizard end-to-end. Open Stripe dashboard. | PH dashboard + lumenari.io + Stripe | Laptop, charged phone, water |
| 11:55pm T-1 | First comment staged | Open the chosen variant from `comment-templates.md` in a text file. Re-read once. Don't edit. | Local text file | Notes app or VS Code |
| 11:58pm T-1 | DM the hunter | One-line confirmation: "Going live in 3 — thanks for hunting." | Twitter / PH DM | Phone |
| 12:00am | PH launch slot opens | Hunter hits submit. If hunting yourself, click submit on the draft. | PH dashboard | Laptop |
| 12:01am | Post live, paste first comment | Verify the listing is public. Paste pre-staged first comment immediately. PH algorithm rewards a fast first comment from the maker. | PH listing page | Laptop |
| 12:05am | Tweet the announcement | Post launch-day Tweet 1 (`tweet-thread.md`). Quote-pin to profile. | Twitter | Phone or laptop |
| 12:10am | Slack/Discord ping (close circle only) | Drop the link in 2-3 private channels where I'm a regular. Not in any community I'm not active in — that's spam. | Slack, Discord | Phone |
| 12:15am | Respond to first comments | Every comment gets a reply within 5 minutes for the first hour. Treat it like a live conversation. | PH listing | Laptop |
| 1:00am | Sleep | Set alarm for 5:30am. The PH day is long — sleep is not optional. | Bed | Alarm |
| 5:30am | Wake, check overnight | Read every comment. Reply to anything unanswered. Note the rank. Note 3 questions worth surfacing. | PH listing | Phone |
| 6:00am | Reddit drop #1 | Post in r/ChatGPTPro, r/ClaudeAI, r/SaaS, r/indiehackers. Different framing per sub — don't copy-paste. | Reddit | Laptop |
| 7:00am | Coffee + quick LinkedIn DM round | DM 5 most-likely-to-engage LinkedIn contacts with a personal one-liner + link. Not a mass post yet. | LinkedIn | Laptop |
| 8:00am | PH comment sweep | Reply to every overnight comment that's still unanswered. Pin a midday momentum comment from `comment-templates.md`. | PH listing | Laptop |
| 9:00am | Email blast | Send the email blast (`email-blast.md`) to Tier 1, 2, 3 in three separate sends 15 min apart. | Gmail / send tool | Laptop |
| 10:00am | Twitter thread | Post the full launch-day thread (`tweet-thread.md` — Thread 2). Pin Tweet 1. Quote-tweet from a second account if available. | Twitter | Laptop |
| 11:00am | LinkedIn post | Publish the staged LinkedIn post. Tag 3-5 people who've expressed real interest. | LinkedIn | Laptop |
| 12:00pm | Midday momentum push | DM stragglers from the supporter list who haven't engaged yet. Personal one-liner per message. No mass blast. | Twitter / LinkedIn / iMessage | Phone |
| 1:00pm | Lunch + step away | 30 minutes off the laptop. Eat real food. The afternoon is the slog and I'll need the reset. | Off-screen | None |
| 2:00pm | Reddit drop #2 | Post in r/ProductHunters with a behind-the-scenes framing — what I'd do differently, what I learned in the first 14 hours. | Reddit | Laptop |
| 3:00pm | Comment sweep + roadmap insights | Read every comment for product insights. Note them in a running text file. Reply to anything new within 30 min. | PH listing + notes | Laptop |
| 4:00pm | Respond to PH comments backlog | Catch every comment that came in during 12-3pm. Even one-word replies count for the algorithm. | PH listing | Laptop |
| 5:00pm | Late-day momentum comment | Pin a "highest-rated kit so far" comment (`comment-templates.md`). Surfaces a real data point and re-engages the thread. | PH listing | Laptop |
| 6:00pm | Reddit drop #3 | One niche sub I haven't hit yet — pick based on which kits are selling (e.g., r/marketing if marketing kits are leading, r/devops if dev kits are leading). | Reddit | Laptop |
| 7:00pm | Dinner + family time | 90 minutes off. The day is decided by 7pm — pushing harder past this point has diminishing returns. | Off-screen | None |
| 8:00pm | Final push DMs | Last round of DMs to anyone who's been online but hasn't engaged. Soft framing — "wrapping up the launch day, would love your read." | Twitter / LinkedIn | Phone |
| 9:00pm | Comment sweep | Final reply round on PH. Make sure no comment from the last 6 hours is unanswered. | PH listing | Laptop |
| 10:00pm | Recap notes for tomorrow | Open `STATE.md`. Write down: final rank, upvotes, comments, signups, sales, top 3 lessons, top 3 product insights from comments. Stage tomorrow's recap thread (`tweet-thread.md` — Thread 3). | STATE.md + drafts | Laptop |
| 11:00pm | Sleep | Alarm off. Tomorrow's a recovery day, not another sprint. | Bed | None |

---

## Monitoring — what to watch and where

| Metric | Target | Where |
|--------|--------|-------|
| PH rank | Top 5 by 6am, top 3 by noon | PH listing page |
| Upvote velocity | 50+ in first hour | PH listing |
| Comments | 20+ in first 4 hours | PH listing |
| Maker comment ratio | Reply within 30 min for first 6 hours | PH listing |
| lumenari.io traffic | Spikes correlated with PH rank shifts | Vercel analytics + PostHog |
| Wizard completions | >40% completion rate | PostHog |
| Signups | Track hourly | Supabase dashboard |
| Stripe checkouts | Track hourly | Stripe dashboard |
| Twitter mentions | Search "Lumenari" hourly | Twitter search |
| Reddit comments | Reply within 1 hour | Reddit notifications |

---

## If things go wrong — panic-button playbook

### Scenario 1 — Site goes down

**Signal:** Vercel alerts or visitors comment on PH that the site won't load.

**Response:**
1. Check Vercel deployment status first. If it's a deploy issue, roll back to the last good build (one click in Vercel).
2. If Supabase, check the status page. If it's a Supabase incident, post a pinned comment on PH: "Heads up — Supabase incident, we're partially down for the next [X] min. Wizard is up; checkout will be live again shortly. Thanks for your patience."
3. Tweet the same message. Honesty beats silence.
4. Do not blame the vendor publicly. "We're investigating" is the right tone.

### Scenario 2 — Negative top comment

**Signal:** A critical comment with high upvotes pinned at the top of the thread, dragging the conversation down.

**Response:**
1. Do NOT delete it. Do NOT downvote it. Both will be screenshotted.
2. Reply within 15 minutes with the calmest variant from `comment-templates.md` ("Fair concern, here's the tradeoff" or "You're right"). Take the L if the L is real.
3. If the criticism is legitimate, ship the fix the same day and reply again with "Shipped — try again." Turning a negative into a "founder responded and shipped a fix" is the second-best outcome of the day.
4. If the criticism is wrong, push back politely with the actual reasoning. Don't grovel.

### Scenario 3 — Rank stalls in the afternoon

**Signal:** Sitting at #6-#8 by 2pm with no momentum to crack top 5.

**Response:**
1. Do NOT panic-DM 50 more people. The supporter list is already used.
2. Drop the second Reddit post (scheduled at 2pm anyway) but with a sharper hook based on what's actually selling.
3. Pin a fresh momentum comment on PH ("highest-rated kit so far is X") — surfaces a real data point and re-engages the thread.
4. Accept that #6 is still a great launch. Top 10 PH = a permanent badge that converts visitors for years. Don't trade that for a desperation push that burns relationships.

---

## End-of-day commitment

Whatever happens, by 11pm I close the laptop. No "one more push." The launch day is one day. The product is the next 12 months. Sleep matters more than rank #4 vs #5.
