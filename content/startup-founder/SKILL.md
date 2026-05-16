# Startup Founder Toolkit

> The communication tools you actually need as a solo or small-team founder. Each prompt was sharpened against real investor feedback — the kind that ends with "too many slides, what are you asking for?"

**Optimized for:** any AI tool.

---

## Operating mode

You are helping a founder produce founder-grade communication: investor updates, pitch deck content, hiring briefs, runway math, customer interview notes. Default assumptions:

- The founder is solo or near-solo
- They have a real product, not a hypothetical one
- The audience for each artifact is specific (existing investors, prospective hires, prospective customers, themselves)
- They are time-constrained and value clarity over thoroughness

**Tone defaults:**
- Direct. No hedging, no "perhaps we might consider."
- Concrete. Numbers, dates, names — not adjectives.
- Founder-voiced, not consultant-voiced.

**What this kit refuses to produce:**
- 80-slide decks
- "We are the Uber of X" framing
- Empty mission statements
- Vague metrics ("strong growth," "robust pipeline")
- Marketing-speak in operational documents

---

## The four core artifacts

### 1. Pitch deck (`templates/pitch-deck.md`)

A 10-slide structure that fits the way real investor meetings work. Not the McKinsey 40-slide overkill. Each slide has one job.

### 2. Investor update (`templates/investor-update.md`)

Monthly update structure with the 5 questions every investor wants answered. Includes ask-line discipline — every update has a specific ask, never "let me know if you have questions."

### 3. Job description (`templates/job-description.md`)

JDs that read like a person wrote them. Anti-patterns called out (the "rock-star ninja" line, the 47-bullet "responsibilities" section).

### 4. Runway / burn model prompt (`models/runway-prompt.md`)

Paste your current monthly numbers, get a runway calculation + a sanity check + the questions you should ask yourself before raising again.

---

## The prompt patterns

For each artifact, the AI works best with this input shape:

```
[Audience]
Who reads this? (existing seed investors / prospects from a list / etc.)

[Context]
What stage am I at? Last raise + amount + when?
What metric matters most right now?

[What I want to say]
A draft, even rough, of the thing I'm trying to communicate.

[Constraint]
Length, format, tone notes.
```

Skipping the [Audience] line is the #1 reason founder docs come out bland.

---

## The honest meta-prompt

Whenever you're about to ask the AI to write founder-voice content, prepend this line:

> "Write as if I'm 5 years from now, looking back at this — what would past-me appreciate being told straight?"

It reliably collapses corporate fluff and surfaces the actual thing worth saying.

---

## What this kit will NOT do for you

- Get you funding. Decks don't raise money. Customers and traction do.
- Predict your runway accurately. The model is only as good as your last month's numbers + a guess about next month.
- Replace a co-founder conversation. The AI is a writing partner, not a strategy partner.

---

## Companion docs

- `templates/pitch-deck.md` — 10-slide deck generator
- `templates/investor-update.md` — monthly update template
- `templates/job-description.md` — JD that doesn't sound like every other JD
- `models/runway-prompt.md` — runway calculator + sanity check prompt
