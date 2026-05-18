# r/Sales — "Research-first cold email workflow that doubled my reply rate"

**Target sub:** r/Sales
**Post type:** Case study (workflow share)
**Why this post for this sub:** r/Sales is full of SDRs/AEs paying for their own tools. The audience is pragmatic and pattern-recognizes hype. A workflow-share post with real reply-rate numbers gets shared and bookmarked.
**When to post:** Tuesday-Thursday, 8-10am ET. Sales floors are at their desks.
**Expected karma trajectory:** 100-400.
**Conversion expectations:** High direct conversion. SDRs buy their own tools when their company won't. The kit at $19 is a no-brainer expense if it doubles reply rate.
**Follow-up engagement:** Expect debates on whether AI cold email is unethical (one or two will say yes), questions about volume tradeoffs (fewer better emails vs more emails), and asks for the actual prompt. Share the prompt liberally — the post is structured so you can give it all away.
**Handling "is this self-promo" challenges:** Moderate mod sensitivity. Disclosure at the end. The post survives without it.

---

## Title

**Research-first cold email workflow that doubled my reply rate**

---

## Body

I rebuilt my cold email AI workflow three times. The version that worked uses a structural pivot most cold-outreach tools get backward. Posting because the structure is the lesson — borrow it, fork it, ignore it, your call.

### The before state

Standard generative cold email: "Write a cold email to [prospect] about [offer]." Reply rates around 5-7%. The emails read fine but pattern-recognizable. Every SDR I know is in the same boat.

### The structural pivot

Most AI cold email tools generate the email first and try to make it look researched. The win is doing it in the opposite order: research first, write second.

Two phases, hard split.

### Phase 1: research synthesis

Input: prospect's LinkedIn URL, recent posts, company news, role.

Output: a 3-5 sentence research brief covering three specific things:

- **Trigger event in last 30 days.** Funding announcement, hire spree, product launch, leadership change, public talk at a conference. Something that makes "now" the right time to reach out.
- **Role-level pain.** What does someone at THIS persona's level actually struggle with? VPs hear different things from ICs. Founders hear different things from operators. The pain has to be calibrated to the level.
- **Persona type.** IC / manager / VP / C-suite. These four read email differently — opening lines, length tolerance, CTA shape all change.

Constraint: if the research phase can't find a trigger event or specific pain, it SAYS SO. Doesn't invent. Returns a "thin signal" flag and waits for human input.

### Phase 2: email composition

Input: the research brief from phase 1, plus your template structure.

Output:
- Subject line (4-7 words, curious + specific)
- Email body (70-90 words, hard cap)
- Recommended follow-up timing

Constraints I burn in:

- First sentence MUST reference something specific from the research brief. No generic openers.
- Email length 70-90 words. Not negotiable. Cold emails over 90 words have lower reply rates per the open-data I've seen.
- CTA is for a 15-minute conversation, not a meeting. Lower the ask.
- One follow-up touch only if no reply in 5 business days. Then stop. Multi-touch sequences sound like spam at touch 4+.

### What the system prompt looks like

```
ROLE: SDR running research-first cold outreach.

PHASE 1 (always runs first):
- Read prospect data
- Surface: trigger event in last 30 days, role-level pain, persona type
- Output a 3-5 sentence research brief
- If you cannot find specific signals, return "thin signal" and ask
  for more input. Do not invent.

PHASE 2:
- Open with a specific reference to the research brief (not a generic
  observation)
- Email length: 70-90 words, hard cap
- Subject line: 4-7 words, curious + specific
- CTA: 15-minute conversation, not a meeting
- Adjust opening shape by persona:
  - IC: lead with a tactical observation
  - Manager: lead with a team-level pain
  - VP: lead with a business-impact framing
  - C-suite: lead with a question

CONSTRAINTS:
- Do not use: "I hope this finds you well", "I wanted to reach out",
  "quick question", "circling back"
- Do not promise specific outcomes without research-backed evidence
- Do not invent details about the prospect or their company

OUTPUT:
1. Research brief (3-5 sentences)
2. Subject line
3. Email body
4. Follow-up recommendation
```

### Numbers

Ran the V3 prompt for 6 weeks against my V1 baseline.

- Email volume: down ~30% (each email takes longer because of the research phase)
- Reply rate: up from 5-7% to 11-13% (roughly doubled)
- Meetings booked per week: up ~40% despite lower volume

Fewer, better emails. Same old sales lesson, new tool.

### Where it breaks

- **Industries with no public signal.** Defense, government, very private companies. Research phase fails. Manual research required.
- **Very junior personas.** New grads, early ICs. No public-facing trigger events. The model invents weak ones and the emails read off.
- **High-volume sequences (200+/day).** The math doesn't work. Research is the bottleneck. Either accept lower volume or use this for the top 30-50/day and a simpler template for the rest.

### What I'd change for an enterprise rep

Most enterprise reps work fewer accounts more deeply. For them, the research phase should expand — pull in 10-K language for public companies, recent earnings call themes, competitive pressure. The prompt structure is the same; the research depth is higher.

---

Disclosure: I packaged this workflow as a kit on lumenari.io (sales-outreach-pro, $19). The four-part structure above is the actual lesson though. You can build this in an hour. Kit exists if you want the shortcut + the variant prompts for IC/manager/VP/C-suite.

What's your reply rate looking like in 2026? Genuinely curious where the bar is now. The 5-7% I had a year ago feels too low to be standard.
