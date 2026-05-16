# Reference Workflows — Photographer Pack

> Worked examples and templates the AI can lean on. Open `templates/wedding-proposals-shotlists.md` and `templates/portrait-commercial-proposals.md` for the full proposal+shot-list packs. This file is the cross-genre workflow reference — the moments that don't belong to any one shoot type.

---

## Workflow 1: The booking inquiry response

Most leads come through a form ("Hi! Looking for a photographer for our wedding on Oct 12, 2026 in [city] at [venue]"). The first reply decides whether they ever reach the consult call.

**Prompt:**

```
A couple inquired about a wedding on [date] at [venue] in [city]. Their note: "[paste]".

Draft a first-reply email from me. Constraints:
- Confirm the date is open (or be honest if it's tentative)
- Reference one specific thing from their inquiry
- Don't quote a number yet — invite a 20-minute call
- Sign off in my voice (warm, clear, not breathless)
- Subject line under 50 chars
```

What to verify before sending: date availability on your actual calendar, that "venue" detail is right (don't congratulate them on a venue they didn't book), and that the consult-call link is your current Calendly/Acuity URL.

---

## Workflow 2: The "I'm comparing 4 photographers" follow-up

Inquiry came in, you replied warmly, they ghosted for 5 days. Re-engage without sounding desperate.

**Prompt:**

```
Couple inquired [N] days ago for [date]. I replied with consult invite, no response. Their inquiry mentioned [detail].

Write a soft re-engagement email. Constraints:
- 3-4 sentences max
- One specific reference to their wedding (not "Hi! Just checking in!")
- Mention I've held the date informally — gentle deadline frame
- End with: "Happy to send a few sample galleries that match [their vibe]. Or if you've gone another direction, no hard feelings."
```

The "no hard feelings" line is what makes the email feel human. It also gets replies — couples are relieved someone gave them a graceful exit.

---

## Workflow 3: The 48-hour sneak-peek post

Standard practice for weddings is a 5-15 image sneak peek delivered 24-72 hours after the wedding. The IG caption matters — couples reshare it, parents see it, future couples discover you through it.

**Prompt:**

```
Wedding sneak peek for [couple first names] from [venue, city] on [date]. I'm sharing 12 images.

Write an IG caption. Constraints:
- Under 150 words
- Open with the couple — not the venue, not me
- Reference ONE specific moment from the day (I'll fill it in: "[detail]")
- Soft credit to the venue, planner, florist if I tag them
- Close with a single sentence about the full gallery coming in 6 weeks
- Don't say "stunning" or "breathtaking" or "the most beautiful couple I've ever shot"
```

Worked output skeleton (filled in):

> Sarah + Marcus, your day was a study in not rushing. The way you took 10 minutes alone on the back porch before the ceremony — that's the wedding I'm going to remember. A few from a day full of them. Full gallery in 6 weeks. // Venue @[venue] // Florals @[florist] // Planning @[planner]

---

## Workflow 4: The portrait gallery delivery email

Portrait galleries deliver faster than weddings (2-3 weeks). Email accompanies the gallery link, sets expectations on print orders and downloads.

**Prompt:**

```
Family/portrait session delivery for [client name], shot on [date], [N] images delivered.

Write the delivery email. Constraints:
- Subject under 50 chars, includes their name
- Lead with one specific note about the session (kid who finally laughed at the end, the light at golden hour, the dog who almost ate my reflector)
- Gallery link placeholder: [LINK]
- Gallery expires in [N] days — clear, not threatening
- Print ordering: through the gallery is supported; printing on their own is fine, here's a note about color profiles if they want to nerd out
- Sign off warm but professional
```

What the AI gets wrong: tries to write a 6-paragraph delivery email. Real photographers write 4-5 sentences plus the link. Edit it down ruthlessly.

---

## Workflow 5: The commercial usage-rights conversation

The single hardest writing job in commercial photography is explaining usage to a brand client who's used to stock licensing.

**Prompt:**

```
A brand asked: "Can we just buy the photos and use them however we want?" The shoot is [scope: in-studio product, on-location lifestyle, brand portraits, etc.]. My standard licensing structure is [paste].

Write my reply. Constraints:
- Don't be defensive
- Acknowledge what they actually want — predictability and not getting in trouble later
- Explain the difference between "buyout" (one-time fee, broad rights) and "scoped license" (smaller fee, defined uses, easier to extend)
- Offer a clean number for each option for their specific scope
- One clear next step: "I'll send a usage estimate by [day]. Let me know if you want me to scope it as a buyout or a 1-year/2-year/perpetual structure."
```

Critical: do not let the AI invent rates. The prompt should require: "Use my rates from my pricing doc — placeholders if you don't have them."

---

## Workflow 6: The "we love it but can you redo this one image" gallery edit request

After delivery, one client in five comes back with a specific edit request. Some are reasonable (remove a stranger from background). Some are not (make the bride 10 pounds thinner). The reply matters.

**Reasonable request prompt:**

```
Client requested: [paste request]. Sample: "Can you remove the person in the background of image 47?"

Write the reply. Constraints:
- Confirm what they're asking
- Quote the edit time (1-3 image complex edits = no charge under [my policy]; major retouching = quoted)
- Set turnaround
- Don't apologize for the original delivery — the request is normal
```

**Unreasonable request prompt:**

```
Client requested: [paste]. Sample: "Can you make me look thinner in these portraits?"

Write the reply. Constraints:
- Don't shame, don't lecture
- Honest: heavy body retouching isn't part of my edit style and feels wrong on real people
- Offer what I can do: light skin retouch, posing redo if I have time, light contrast adjustment
- End with "If you'd like to find a retoucher who specializes in [request], I can recommend one"
```

The recommendation line at the end is what makes this email survive without burning the relationship. Most photographers refuse curtly. The good ones redirect kindly.

---

## Workflow 7: The vendor recap email

After every wedding, send a short note to the planner / venue / florist with 1-3 images they can use. This is your single highest-leverage marketing.

**Prompt:**

```
Wedding at [venue], planned by [planner], florals by [florist]. I'm sending each vendor a recap email with 2-3 specific images that show their work well.

Write the planner version. Constraints:
- 4-5 sentences
- One specific compliment on the day (not "what an incredible event!")
- Note that I'm including 3 images they can use for their portfolio with credit
- Casual close
```

Repeat for venue and florist with different image picks.

---

## What the AI gets wrong across all photographer workflows

1. **It writes "stunning."** Strip it. And "breathtaking," "captured," "magical," "dream day." The kit's system prompt forbids these — but on a fresh chat without the prompt loaded, they'll come back. Strip them every time.

2. **It promises future deliverables it doesn't know.** "Your gallery will be ready in 4-6 weeks" is fine if that's your turnaround. The AI will guess "2 weeks" or "8 weeks" if you don't specify. Always supply the timeline.

3. **It invents pricing.** Never let the AI quote a number you didn't supply. Use placeholders: `[CONFIRM: my wedding base rate]`.

4. **It signs off in someone else's voice.** Match your actual sign-off. If you use "—X" with one initial, tell it. If you write "warmly," tell it. Default AI sign-offs are sticky and they sound like a stock email.

5. **It defaults to long.** Real photographer emails are short — 4-5 sentences for most. Tell it: "Match the length to the job. Don't pad."

---

## Companion files

- `templates/wedding-proposals-shotlists.md` — wedding proposal language, must-have shot lists by ceremony type, family shot list templates
- `templates/portrait-commercial-proposals.md` — portrait + commercial proposal templates, usage-rights matrix, mood-board prompts
