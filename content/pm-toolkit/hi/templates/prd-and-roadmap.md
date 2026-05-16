# PRD + Roadmap Templates

> PRD shape जिसे आप 80% time use करेंगे, plus Now/Next/Later roadmap drafter जो एक messy backlog को prioritized buckets में बदलता है।

---

## Part 1 — PRD

### Shape

```
# PRD — <Feature name> (v0.x, <author>, <date>)

## Problem
क्या टूटा है, किसके लिए, plain language में। एक user को quote करें अगर
कर सकते हैं।

## Goal
इस work के लिए एक outcome। एक sentence।

## Non-goals
Explicit list क्या यह NOT कर रहा है। हर item पर reason ("Phase 2,"
"separate workstream," "जिस metric की हम care करते हैं उसे move नहीं
करेगा")।

## Success metrics
हमें कैसे पता चलेगा यह काम कर गया। Target numbers। Time windows।

## Acceptance criteria
"Done" कैसा दिखता है। Bulleted, testable।

## Scope
**In:** वह slice जो हम build कर रहे हैं
**Out:** explicit cuts
**Stretch:** अगर time allows

## Open questions
आप अभी क्या नहीं जानते। हर एक का एक deadline या एक owner है।
```

बस यही। कोई mission statement नहीं। कोई competitive-analysis section नहीं जब तक एक actually load-bearing न हो। कोई "user persona" filler नहीं अगर team पहले से user को जानती है।

### Prompt

```
आप एक PRD draft कर रहे हैं। Rules:

1. Doc length feature size से match। एक 2-day feature 1-page PRD पाता
   है। एक 2-quarter initiative 3-5 pages पाता है। छोटे work के लिए
   कोई 12-page PRDs नहीं।
2. Shape ऊपर use करें, order में: Problem → Goal → Non-goals → Success
   metrics → Acceptance criteria → Scope → Open questions।
3. Non-goals section required है और real work करता है। हर entry में एक
   one-line reason। अगर एक Non-goal actually एक Phase 2 decision है,
   इसे Open Questions section से link करें।
4. Success metrics के पास numbers और time windows हैं। "Adoption
   increases" एक metric नहीं है। "Launch के 60 days के अंदर WAU का 25%
   एक saved search create करता है" है।
5. Acceptance criteria bulleted, testable, ऐसे लिखे कि एक engineer
   उन्हें definition of done के रूप में use कर सके।
6. Scope का In / Out / Stretch है। Out list advance में "but what about"
   questions head off करता है।
7. Open questions decider या deadline name करते हैं। "TBD" काफी नहीं है।
8. Voice: direct, specific, slightly tired। कोई "leverage," "unlock,"
   "double down," "transform" नहीं। कोई "I hope this finds you well" नहीं।

सिर्फ PRD output करें। कोई commentary नहीं जब तक मैं न पूछूँ।
```

### Input shape

```
[The work]
Feature: <name>
Target user: <कौन> (specific — role, customer का size, segment)

[Status / context]
Stage: idea / sketched / building / shipping
Signal: research / tickets / exec push / metric trend / competitive
PRD के लिए audience: eng / leadership / sales

[Raw material]
Bullets, Slack thread, meeting notes, prior PRD। Unformatted fine है।

[Constraints]
- Doc length
- Tone
- Decisions पहले से बनी (relitigate न करें)
- Decisions explicitly NOT बनी अभी (open questions के रूप में flag)
```

---

### Worked example — "Saved searches" PRD

**Input:**

```
[The work]
Feature: हमारे SaaS dashboard में Saved Searches
Target user: Power users — हमारे customers पर ops और analytics roles,
typically 10-50 person teams daily dashboard use करते हुए।

[Status / context]
Stage: sketched। 8 हफ्तों में 6 customer calls में सुना, same window
में 12 support tickets। अभी कोई design नहीं।
Audience: engineering lead + 2 IC engineers + design।

[Raw material]
- Customers एक filtered view save और वापस आना चाहते हैं
- वे इसे name करना चाहते हैं
- वे इसे team के साथ share करना चाहते हैं (कुछ, सब नहीं)
- वे notified होना चाहते हैं जब results बदलें (कुछ, सब नहीं)
- कुछ ने API के लिए पूछा; ज़्यादातर UI के through
- Current workaround: query params के साथ URL bookmark — fragile,
  URL structure बदलने पर टूटता है

[Constraints]
- 1-2 pages
- Tone: scrappy, internal
- Decided: यह dashboard में है, एक separate page नहीं
- Decided: personal saves पहले; team-shared Phase 2 है
- Open: results बदलने पर notifications — Phase 1 या 2?
```

**Output (excerpt):**

```
# PRD — Saved Searches (v0.5, Alex, 2026-05-14)

## Problem
Power users — हमारे customers पर ops और analytics roles — हफ्ते में
कई बार same filtered queries run करते हैं। आज वे URLs bookmark करते
हैं, जो हम query-param structure update करने पर टूटती हैं। हमने यह
6 customer calls और पिछले 8 हफ्तों में 12 tickets में सुना है।

Quote (Maya, <Customer> पर ops lead): "मैं हर Monday वही filter
rebuild करता हूँ। मैंने bookmarks पर give up कर दिया क्योंकि आपके
last release के बाद उनमें से आधे काम करना बंद कर दिए।"

## Goal
Power users के लिए "मैंने अपना filtered view खो दिया" friction कम करें।
Concretely: एक user को एक named filtered view save करने, वापस आने,
और (Phase 2) share करने दें।

## Non-goals
- Team-shared saved searches → Phase 2। Open Questions देखें।
- API-first saved searches → Phase 2। ज़्यादातर demand UI है।
- Cross-product saved searches (dashboard + reports) → scope से बाहर;
  separate workstream।
- Saved-search analytics (कौन से saves सबसे used हैं) → Phase 2।

## Success metrics
- Launch के 60 days के अंदर weekly active dashboard users का 25% कम
  से कम एक saved search create करता है
- "Lost my view" support ticket category same 60-day window पर 50%
  drop (baseline: Q1 2026 पर ~24/month)
- Day 30 तक active power user per median saved searches ≥2

## Acceptance criteria
- User dashboard में एक one-click "Save this view" action से current
  filtered view save कर सकते हैं
- Saved view named है (default = filters का auto-summary; user-editable)
- Saved views एक left-rail "My saved views" section में appear होते हैं
- Reopen करना exact filter state restore करता है, URL changes के
  regardless
- Saved views filter JSON के रूप में stored, URL strings नहीं
- Per user 50 saved views तक; limit के ऊपर एक clear error दिखाता है

## Scope
**In:** Personal saves; UI-only; named; restorable। 50/user cap।
**Out:** Team-shared। API। Notifications। Cross-product।
**Stretch:** Accidentally-deleted saves के लिए soft delete + restore।

## Open questions
1. Results बदलने पर notifications → Phase 1 या 2?
   Recommendation: Phase 2। एक change-detection layer add करता है जो
   core save/restore loop को नहीं चाहिए। Decider: <PM> by 2026-05-21।
2. Per user storage limit — 50 right लगा; कोई real data नहीं। Engineering
   के storage feedback के आधार पर adjust करने को open।
3. Migration policy जब एक underlying filter column rename या removed हो।
   Decider: <eng lead> + <PM>, kickoff से पहले।
```

यह PRD क्या करता है:

- Problem section में एक real user quote करता है।
- Non-goals heavy lifting करता है — चार explicit cuts, हर एक एक reason के साथ।
- Success metrics के पास numbers, baselines, और time windows हैं।
- Acceptance criteria testable हैं।
- Scope का "Out" section advance में "but what about" questions head off करता है।
- Open questions के पास deciders और deadlines हैं।

वह 1-2 page PRD पर 700 words है। Work के लिए right-sized।

---

## Part 2 — Now / Next / Later roadmap

### Prompt

```
आप एक Now/Next/Later roadmap update कर रहे हैं। Rules:

1. तीन columns: Now, Next, Later। और कुछ नहीं।
2. हर item एक outcome है (e.g., "Cut 'lost my view' tickets 50%"),
   एक feature name नहीं। Parens में feature name।
3. हर item का एक Quarter और एक Confidence (High / Med / Low) है।
   Confidence honest है। सब कुछ High grade न करें।
4. "Now" = committed, in progress।
5. "Next" = upcoming cycle के लिए committed।
6. "Later" = radar पर, committed नहीं।
7. अगर user एक corresponding cut के बिना एक item Later से Now move
   करने को propose करे, push back: "Now में क्या out जा रहा है?"
8. Roadmap एक markdown table के रूप में output करें। नीचे एक paragraph
   explain करता है क्या बदला last cycle से।

Voice: direct, specific। कोई "soon" without a quarter। कोई vague verbs।
```

### Input shape

```
[Current roadmap]
Existing Now / Next / Later paste करें, या verbally describe।

[क्या बदला]
- Adding की जा रही new initiatives
- Shipped initiatives
- Slip हो रही या deprioritized initiatives
- Strategic context (एक customer commitment, एक competitive move, एक
  capacity change, आदि)

[Constraints]
- Quarter horizon (1-2 quarters typical)
- Team capacity reality (prior cycle से कोई major changes?)
- Audience (internal team, leadership, sales-facing)
```

### Worked example

**Input:**

```
[Current roadmap]
Now:
- Onboarding completion +10pp (revised first-run flow) — Q2 26, High
- Cut "lost my view" tickets 50% (Saved Searches v1) — Q2 26, High

Next:
- Mobile-web parity for top 5 dashboard flows — Q3 26, Med
- Power-user retention +5pp (Team-shared saves + API) — Q3 26, Med

Later:
- In-product analytics for customer-side admins — Q4 26, Low
- API rate-limit dashboard for customer engineers — Q4 26, Low

[क्या बदला]
- Onboarding work on track है पर Med trending है, High नहीं — हम
  first-run flow में expected से अधिक edge cases find कर रहे हैं।
- एक top-3 customer ने Q3 में Team-shared saves shipping पर contingent
  एक renewal commit की। हमें इसे earlier move करना है।
- हमने इस quarter एक engineer खोया। Capacity ~20% down।

[Constraints]
- 2-quarter horizon
- Audience: leadership readout
```

**Output:**

```
| Bucket | Outcome | Quarter | Confidence |
|--------|---------|---------|------------|
| Now    | Cut "lost my view" tickets 50% (Saved Searches v1)   | Q2 26 | High |
| Now    | Onboarding completion +10pp (first-run flow)         | Q2 26 | Med  |
| Next   | Power-user retention +5pp (Team-shared saves + API)  | Q3 26 | Med  |
| Next   | Mobile-web parity for top 5 dashboard flows          | Q3 26 | Low  |
| Later  | In-product analytics for customer-side admins        | Q4 26 | Low  |
| Later  | API rate-limit dashboard for customer engineers      | Q4 26 | Low  |

**क्या बदला:** Onboarding High से Med confidence move हुआ — first-run
flow में expected से अधिक edge cases हैं। Team-shared saves Next (Q3)
में रहता है पर अब एक top-3 customer renewal के लिए एक contract commitment
है, तो यह Q3 के लिए priority है mobile-web parity के cost पर (अब एक
engineer खोने के ~20% capacity hit देखते हुए Low confidence)। Q4 में
mobile-web revisit करने की recommend करें जब तक हम backfill न करें।
```

यह output क्या करता है:

- Confidence के बारे में honest। Onboarding new edge cases के कारण Med में drop।
- Team-shared saves को prioritize करने के reason के रूप में customer-contingent renewal surface।
- Capacity hit और इसके consequences plainly call out।
- Pretend नहीं करता कि team बिना tradeoff loss absorb कर सकती है।

---

## कब PRD skip करें

हर feature को PRD नहीं चाहिए। Skip करें जब:

- Work <2 days है और team पहले से user को समझती है।
- Work एक bug fix या एक small refactor है।
- Work एक design doc में thoroughly discussed हो गया है, और PRD बस summarize करेगा।

जब PRD skip करें पर artifact रखें: इसके बजाय एक 3-bullet "what + why + how we'll know" लिखें। Small work भी एक written outcome statement से benefit लेता है।
