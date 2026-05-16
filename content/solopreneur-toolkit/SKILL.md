# Solopreneur Toolkit

> The paperwork and the visibility posts that keep a one-person business running. Built for the freelancer who'd rather be doing the work than writing the proposal, but knows the proposal is what gets paid.

**Optimized for:** any AI tool — Claude, ChatGPT, Gemini, Cursor, Codex. Paste the optimization pack as a system prompt or drop it at the top of a fresh conversation.

---

## Operating mode

You are helping a solo operator run the business side of doing the work. The user is probably:

- A freelancer, consultant, designer, developer, copywriter, coach, fractional anything
- Charging by the project, the hour, or the month
- Their own sales team, ops team, AR/AP team, and marketing team
- Allergic to corporate language, but needs to sound credible in front of clients

Default assumptions:

- They have a real client conversation happening this week, not a hypothetical funnel
- They want a draft to edit, not a blank page to stare at
- They will paste the output into Gmail, Notion, HoneyBook, Stripe, LinkedIn — keep formatting clean
- Money is in CAD or USD unless stated; always store as plain numbers + currency code
- Legal language gets a "consult a lawyer in your jurisdiction" tag whenever it shows up

**Tone defaults:**

- Plain, second person, conversational. The way you'd write to a client you've already worked with.
- Confident without bragging. Specific without being a brochure.
- No "thrilled to," no "rock star," no "fast-paced environment," no "synergy."
- If you wouldn't say it out loud over coffee, don't put it in the proposal.

**What this kit refuses to produce:**

- Proposals with a 12-paragraph "About Us" section
- LinkedIn posts that start with "I'm so humbled to announce"
- Late-payment reminders that sound passive-aggressive
- SOWs that are 9 pages when 2 would do
- Pricing pages that bury the price

---

## What's inside

### 1. Proposal generator with three pricing-tier patterns (`templates/proposal-and-sow.md`)

Three pricing-tier patterns that actually close: Good/Better/Best, Fixed/Phased/Retainer, and Outcome-based. Each comes with the exact language to anchor the middle option. Plus an SOW template you fill in instead of write from scratch, and a discovery-call intake form to ask BEFORE you quote.

### 2. Client updates and invoice nudges (`templates/client-updates-and-invoices.md`)

The weekly client update that takes 4 minutes to write and stops the "hey just checking in" emails. Invoice copy that gets paid. Late-payment reminders at 7, 14, and 30 days — professional, escalating, never whiny.

### 3. Pricing and niching playbook (`playbooks/pricing-and-niching.md`)

The scripts you say out loud when a client pushes back on price. How to raise rates with existing clients without losing them. The brainstorm prompt that helps you actually niche down instead of staying "a generalist who does a bit of everything."

### 4. Optimization pack and quick start

`optimization-pack.md` is the full system prompt — paste once, run all the templates from a single configured AI. `quick-start.md` walks you through 60-second setup on Claude, ChatGPT, Gemini, Cursor, and Codex.

`custom-gpt-instructions.md` is the ChatGPT Custom GPT version — drop it into the instructions field and you've got a Solopreneur GPT.

---

## The prompt patterns

For every artifact in this kit, the AI works best with this input shape:

```
[Who I am]
Role + niche (e.g., "freelance brand designer, mostly SaaS startups, 5 years in")

[Who the client is]
Name, what they do, how we got connected, what they think they need

[What I want]
The specific artifact — proposal, SOW, weekly update, invoice nudge, LinkedIn post

[Constraints]
Budget range, timeline, anything sensitive (e.g., "they ghosted on the last invoice")
```

Skipping the [Who I am] line is the #1 reason proposals come out generic. The AI doesn't know if you're a $75/hr writer or a $20K/project consultant unless you tell it.

---

## Three patterns this kit will push you toward

### Pattern 1: Always quote three tiers

Single-price proposals get compared to other single-price proposals. Three-tier proposals get the client picking between YOUR three options. Even if they pick the middle one (they usually do), you've controlled the frame.

Worked example for a website project:

- **Essentials** — 5 pages, your copy, my design + build. CAD $4,500.
- **Standard** — 8 pages, copywriting workshop included, build + launch + 30 days of post-launch tweaks. CAD $7,800. *(most clients pick this)*
- **Premium** — Everything in Standard, plus brand refresh, 90 days of post-launch support, conversion review at day 60. CAD $12,500.

The `(most clients pick this)` line on the middle option is the anchor. Use it.

### Pattern 2: Discovery before quoting

The proposals that close are the ones written AFTER a 30-minute discovery call. The proposals that get ghosted are the ones written from a one-paragraph DM. The intake form in `templates/proposal-and-sow.md` is the call structure — use it before you quote, not after.

### Pattern 3: Updates beat check-ins

The weekly client update format kills "hey just checking in" emails from both directions. Five lines max. What got done, what's next, what I need from you. The template's in `templates/client-updates-and-invoices.md`.

---

## The visibility side

A solopreneur with no pipeline is one bad month from a job application. The LinkedIn templates in this kit are written for the operator who finds posting cringe but knows it works.

Three formats that consistently bring inbound:

1. **The build-in-public post** — "Here's what I just shipped for a client (with permission)." Concrete, screenshot-friendly, no humblebrag.
2. **The teach-one-thing post** — Pick a mistake you used to make, name it, explain the fix. 4-6 lines.
3. **The "going on holiday" auto-responder + follow-up post** — Bookings often spike right after you announce you're closed. Counterintuitive but consistent.

All three are in `playbooks/pricing-and-niching.md` with paste-ready copy.

---

## Contracts, taxes, and the lawyer line

This kit produces drafts. It does not produce final, binding legal documents.

- Every SOW and proposal you send should be reviewed by a lawyer in your jurisdiction at least once, then you can reuse the template.
- Independent contractor classification varies by country and state/province. The kit will draft, but won't decide.
- Sales tax / GST / HST / VAT handling is your job — the templates leave placeholder lines for you to fill.

When the AI is asked to produce a contract clause, it should append:

> *Consult a lawyer in your jurisdiction before relying on this clause.*

That line is non-negotiable. It's in the optimization pack.

---

## What this kit will NOT do for you

- Find you clients. Visibility posts help, but the kit doesn't run your outreach.
- Decide your prices. It gives you frameworks and scripts, but you set the number.
- Replace a bookkeeper. Late-payment templates won't fix a chronically slow client.
- Make you niche down. The brainstorm prompt helps you THINK about it. The decision is still yours.

---

## Companion docs

- `optimization-pack.md` — full system prompt for any chat AI
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formatted
- `quick-start.md` — 60-second setup per platform
- `templates/proposal-and-sow.md` — three-tier proposal generator, SOW template, intake-call form
- `templates/client-updates-and-invoices.md` — weekly updates, invoice copy, late-payment reminders
- `playbooks/pricing-and-niching.md` — pricing conversation scripts, niching brainstorm, LinkedIn templates
