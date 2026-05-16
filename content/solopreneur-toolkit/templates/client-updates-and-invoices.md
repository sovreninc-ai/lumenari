# Client Updates and Invoice Nudges

The boring side of solo work — telling clients what you've done, asking them to pay, and chasing them when they don't. This file is the copy that does all three without sounding like a robot or a doormat.

---

## Part 1 — The weekly client update

The single highest-leverage email in solopreneur work. Sent every Friday (or whatever day you commit to) like clockwork. After 3 of these, "hey just checking in" emails from your client stop. Their boss stops asking them where the project is. You become low-anxiety for them.

### The format — five lines max

```
**This week:**
- [Concrete deliverable shipped or moved forward]
- [Concrete deliverable shipped or moved forward]

**Next week:**
- [Deliverable]
- [Deliverable]

**Need from you:**
- [Specific decision or asset, with a date — or "nothing right now"]

**Status:** On track / Watch / Blocked
**Next update:** [Date]
```

### Paste this prompt to the AI

```
You are the Solopreneur Co-Pilot.

Write a Friday client update for [CLIENT NAME] on the [PROJECT NAME] project. Use the standard 5-line format.

This week I:
- [BULLET 1]
- [BULLET 2]
- [BULLET 3]

Next week I'm:
- [BULLET 1]
- [BULLET 2]

I need from them:
- [ASK]

Status: [On track / Watch / Blocked — and one sentence why if not On track]

Keep it under 100 words. Plain language. No "I hope this email finds you well."
```

### Worked example output

> Subject: Brand refresh — week 2 update
>
> **This week:**
> - First-round visual direction shipped (Figma link, comments open)
> - Positioning workshop notes consolidated into the voice-doc draft
>
> **Next week:**
> - Round 2 of visual direction based on your feedback
> - First draft of the pitch deck template
>
> **Need from you:**
> - Comments on the Figma file by Tuesday May 21
>
> **Status:** On track
> **Next update:** Friday May 24

That email took 4 minutes to write. It will save you 40 minutes of "where are we at" conversations next week.

### When status is Watch or Blocked

Always add ONE sentence explaining why. Never just "Watch." Examples:

- **Watch — waiting on copy from the marketing team since Tuesday; will reshuffle next week if it doesn't land by Monday.**
- **Blocked — the staging environment hasn't been provisioned yet. I emailed your dev lead Wed; can you ping them?**

Naming the blocker tells the client they need to do something. Vague "watch" makes them anxious.

---

## Part 2 — Invoice copy

The invoice itself is mostly a form (your invoicing tool — Stripe, FreshBooks, HoneyBook, Wave, QuickBooks, whatever — generates it). The COPY that goes around the invoice is what changes.

### Standard invoice send email

```
Subject: Invoice [###] — [Project name]

Hi [Name],

Invoice [###] is attached / linked below. Summary:
- [Line item 1]: $X
- [Line item 2]: $X
- **Total:** $X (Net 14)

You can pay by [methods accepted]. If you need a different format for your AP team, just let me know.

Thanks,
[You]
```

Notes:

- **State the net terms in the email**, not just on the invoice PDF. AP teams need this in writing.
- **Don't write "Thanks for your business!"** — it reads needy. "Thanks" alone is fine.
- **Don't apologize for the invoice.** It's the work.

### Paste this prompt to the AI

```
You are the Solopreneur Co-Pilot.

Write an invoice send email for [CLIENT NAME]. Project: [NAME]. Total: [AMOUNT] CAD/USD. Terms: Net [7/14/30]. Payment methods: [STRIPE/INTERAC/ACH/CHEQUE/ETC].

Keep it under 70 words. No "Thanks for your business!" No apologies.
```

---

## Part 3 — Late-payment reminders

The three-tier escalation. Each tier is a separate email, sent on its own day. Never combine.

### Day 7 past due — the friendly nudge

Tone: assume oversight, not bad faith. Most invoices that slip past Net 14 are sitting in someone's inbox; not malicious, just buried.

```
Subject: Re: Invoice [###]

Hi [Name],

Quick nudge — invoice [###] from [date] was due [date], and I haven't seen it come through. I know how easy these are to miss. Could you check in with AP and let me know when I can expect it?

If there's a hold-up on your end, happy to talk it through.

Thanks,
[You]
```

### Day 14 past due — firmer, mentions the policy

Tone: still polite. The client now knows you're tracking. If you have a late-fee policy in your SOW, this is where it shows up.

```
Subject: Invoice [###] — still outstanding

Hi [Name],

Following up — invoice [###] is now 14 days past due. Per our SOW, a 1.5% late fee applies after 14 days; that's been added to the updated invoice attached.

If there's something I can do to help unblock this on your side, let me know. Otherwise I'll check back next week.

Thanks,
[You]
```

If you don't have a late-fee clause, drop that line. Don't bluff one — your client may have the SOW open.

### Day 30 past due — formal, work pauses

Tone: still professional, but the consequences are real and stated. You are pausing work, and you want a phone call.

```
Subject: Invoice [###] — pausing work

Hi [Name],

Invoice [###] is now 30 days past due. As of [date], I'm pausing further work on [PROJECT] until the balance is settled. I'd much rather not — let's get on a 15-minute call this week to sort it out.

Times I can do: [3 options].

If this is the wrong contact for AP, please loop in whoever I should be talking to.

Thanks,
[You]
```

### What you DON'T do

- "Just following up again..." for the fifth time. After Day 30, you've sent three escalating emails. The fourth is the call, not a fourth email.
- Passive-aggressive line endings ("I assume this isn't a priority?")
- Threats you can't back up ("I'll have to involve my lawyer.") — unless you actually will, and unless the amount justifies it.
- Public shaming. Don't tweet about it, don't post about it. Reputation works both ways.

### When to escalate beyond email

If 45 days past due and no response: send one final email saying you're handing it to a collections service or small-claims process, then actually do it. The threat-without-action makes you look soft. The action-without-warning is unprofessional. Always one final email naming the action and the date.

---

## Part 4 — The "scope creep" mid-project email

Adjacent to invoicing. When the client asks for "just one more thing" that isn't in the SOW.

### The template

```
Subject: Re: [their request]

Hi [Name],

Happy to look at [the new thing]. Heads up — it's outside the scope we agreed on in the SOW (Section 2: Out of Scope). I can handle it as a Change Request:

- Option 1: Add it as a flat add-on for $[X]. Adds [Y] days to the timeline.
- Option 2: Park it for a Phase 2 after we finish the current scope.

Which way do you want to go?

Thanks,
[You]
```

Note what this template does NOT do:

- It does not say "sure, I can squeeze that in." That's how scope creep eats your margin.
- It does not apologize for charging for new work.
- It does not lecture the client on what scope creep is. Just names it and offers options.

---

## Cheat sheet — what to send when

| Situation | Send this |
|---|---|
| End of every week | Weekly update (5 lines) |
| Invoice ready | Invoice send email (under 70 words) |
| 7 days past due | Friendly nudge |
| 14 days past due | Firmer reminder, mention policy |
| 30 days past due | Pausing-work email + ask for a call |
| 45 days past due | Final email naming next action |
| Client asks for out-of-scope | Change Request offer (2 options) |

Put these in your snippets manager (TextExpander, Raycast, Alfred, whatever). The friction of writing the same email over and over is what makes solopreneurs let invoices slide.

---

## Common mistakes the kit will flag

- "Just checking in" — replace with a specific status or question
- "I hope this email finds you well" — cut it, it adds nothing
- "Sorry to bother you" — never apologize for being owed money
- Reminders that don't name a dollar amount or invoice number — be specific
- Updates without a date for the next update — always include
- Status of "On track" when something is actually slipping — call it Watch
