# r/ChatGPTPro — "A system prompt structure for cold outreach that doubled my reply rate"

**Target sub:** r/ChatGPTPro
**Post type:** Case study (workflow share)
**Why this post for this sub:** ChatGPT Pro users are the largest paid-AI segment. They're sophisticated enough to recognize good system prompt structure. Sales/outreach is one of the most common use cases. A workflow share with real numbers gets shared and bookmarked.
**When to post:** Tuesday-Thursday, 9-11am ET.
**Expected karma trajectory:** 100-400 if the structure is concrete enough to feel like a takeaway.
**Conversion expectations:** Moderate — readers will copy the structure for free, but some will click through for the pre-built version.
**Follow-up engagement:** Expect questions about specific sub-prompts in the workflow, debates about whether to research with AI vs. manually, and asks for the Custom GPT version specifically. Reply with substance.
**Handling "is this self-promo" challenges:** Disclosure at the end. The post stands without it.

---

## Title

**A system prompt structure for cold outreach that doubled my reply rate**

---

## Body

I rebuilt my cold outreach prompt three times before it landed. Posting the structure here because the version that worked is the structural lesson, not the specific wording. Borrow the structure, fill in your own context, and you'll get most of the benefit.

### The before state

I was running a generic ChatGPT prompt: "Write a cold email to [prospect] at [company] about [product]." Reply rate hovered around 5-7%. The emails read fine but generic — same opening lines, same structure, no specificity.

### What I tried first (and why it didn't work)

**V1: Persona injection.** I tried prefixing the prompt with detailed persona data ("VP of Engineering at a Series A SaaS company, 60 hours/week, frustrated with..."). Marginal improvement, maybe 6-8% reply rate. The emails were better-targeted but still pattern-recognizable as outbound spam.

**V2: Better templates.** I rewrote my templates more carefully — better hooks, smarter CTAs, less generic. Made the volume slower but the reply rate didn't move. The problem wasn't the writing; it was the WORKFLOW.

### The structural change

The breakthrough was simple: I made the model do research BEFORE writing anything. Specifically, I split the system prompt into two phases.

**Phase 1: research synthesis**
The model receives a prospect (LinkedIn URL, recent posts, company website, public news) and produces a research brief — 3-5 sentences on: what's happening at their company right now, what their role-level pain is, what a "trigger event" might be (funding, hiring spree, product launch).

**Phase 2: email composition**
The model receives the research brief plus my template structure and writes the email. The email REFERENCES the research, doesn't generate it.

The model can't fake specificity in phase 2 because phase 1 forced it to ground in real context. The emails went from "Hi, I noticed your company is growing and thought I'd reach out" to "Saw the announcement about [actual specific thing] last Tuesday — wanted to share how [structurally relevant thing] might help..."

### The system prompt structure

```
ROLE: You are an SDR writing cold outreach. Your job is research-first,
write-second. You never compose an email without grounding it in
prospect-specific context.

PHASE 1 — RESEARCH (always runs first):
- Read the prospect data provided
- Identify: trigger event in last 30 days, role-level pain, persona type
  (IC / manager / VP / C-suite — each gets different email shapes)
- Produce a 3-5 sentence research brief
- If you cannot find a trigger event or role-level pain, say so. Do not
  invent.

PHASE 2 — EMAIL COMPOSITION:
- Reference at least one specific item from the research brief in the
  first sentence
- Email length: 70-90 words. No exceptions.
- Subject line: 4-7 words. Curious, specific, not click-bait.
- CTA: ask for a 15-minute conversation, not a meeting. Lower the ask.
- One follow-up touch only if no reply in 5 business days. Then stop.

CONSTRAINTS:
- Do not use the phrases "I hope this finds you well," "I wanted to
  reach out," "quick question," or any other recognizable cold-outreach
  cadence
- Do not promise specific outcomes ("save 5 hours per week") unless the
  research brief surfaces specific evidence
- If the prospect's role is C-suite, the email opens with a question.
  If IC, it opens with a relevant observation.

OUTPUT CONTRACT:
1. Research brief (3-5 sentences)
2. Subject line (4-7 words)
3. Email body (70-90 words)
4. Recommended follow-up timing if no reply
```

### The numbers

I ran this against the V1 baseline for 6 weeks. Volume went DOWN — I sent fewer emails because each one took longer (the research phase is real work, even if the model does most of it). But reply rate went up from 5-7% to 11-13%. Meetings booked per week went UP despite fewer sends.

Fewer, better emails. Same lesson as 15 years of sales books, applied to AI prompts.

### What didn't work even with this structure

- **Industries where there's no public signal.** Government, defense, very private companies. The research phase fails because there's nothing to find. Manual research still required.
- **Very junior personas.** New grads, early-career ICs — they don't have public-facing trigger events. The prompt invents weak ones and the emails read off.
- **High-volume sequences.** This is good for 30-50/day, not 200/day. The math doesn't work at scale because the research is the bottleneck.

---

Disclosure: I ship this as a kit on lumenari.io (sales-outreach-pro, $19). The post above is the structural argument, which is the actual lesson. If you want the pre-built version with all four phases plus the variant emails by seniority, that's what the kit is. Either way, the structure works.

What's your reply rate looking like in 2026? Curious where the bar is now.
