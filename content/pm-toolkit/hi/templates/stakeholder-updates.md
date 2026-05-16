# Stakeholder Update Templates

> तीन flavors, same skeleton: exec brief, engineering detail, customer-facing। Same week का work तीन different audiences के लिए compressed।

---

## Skeleton (तीनों flavors यह share करते हैं)

1. **Status** — एक word (Green / Yellow / Red) plus एक sentence
2. **क्या shipped** — outcomes, features नहीं
3. **क्या next** — upcoming cycle के लिए committed items
4. **At risk** — honest कि क्या slip हो सकता है
5. **The ask** — एक specific thing जो आपको इस audience से चाहिए

Flavors के बीच differences हैं:

- **Length:** 200 / 400 / 150 words
- **Vocabulary:** exec और eng में internal jargon OK; कभी customer-facing में नहीं
- **Blockers पर depth:** exec को headline; eng को details; customer-facing आमतौर पर omit
- **Ask:** exec decision/headcount/intro मांगता है; eng prioritization या unblock मांगता है; customer feedback या beta participation मांगता है

---

## Flavor 1 — Exec brief (~200 words)

### Prompt

```
आप एक executive stakeholder update लिख रहे हैं। Rules:

1. ~200 words। Hard cap: 250।
2. Status से एक single word lead करें: Green / Yellow / Red। फिर एक
   sentence क्यों।
3. "क्या shipped" outcomes है, features नहीं। "Cut 'lost my view'
   tickets 47% in 30 days" "Shipped Saved Searches v1" नहीं।
4. "At risk" honest है। अगर कुछ slip हो सकता है, कहें और क्यों।
5. एक specific ask से end करें। "Need a decision on X by Y." "Let
   me know if you have questions" नहीं।
6. कोई "I hope this email finds you well" नहीं। कोई "circling back" नहीं।
7. Voice: direct, calm, specific। अगर हैं तो numbers।

सिर्फ update output करें।
```

### Worked example

```
**Status: Yellow** — Saved Searches launch May 30 के लिए on track;
edge-case discovery के कारण onboarding work ~2 weeks slip हो रहा।

**क्या shipped इस period**
- Webhook retry failures 78% cut (एक long-standing P1 incident
  category close)
- Top-3 dashboard flows के लिए mobile-web parity
- New first-touch tooltip experiment से activation +3pp

**क्या next (अगले 2 weeks)**
- Saved Searches v1 → May 30 ships, पहले 4 customers के साथ beta
- Onboarding revision v2 → new edge cases reflect करने को adjusted
- Team-shared saves → May 28 kickoff (<Customer X> renewal में committed)

**At risk**
- Onboarding completion target (+10pp) — first-run edge cases के कारण
  Q2 से early Q3 push। Mitigation: highest-impact edges के साथ v2
  ship कर रहे; remainder Q3 में।
- Remaining 2 flows के लिए mobile-web parity Q4 तक slip जब तक हम
  engineering seat backfill न करें जो हमने खोई।

**Ask**
Friday तक एक decision चाहिए क्या open engineering seat backfill करें
या mobile-web slip Q4 तक accept करें। दोनों paths काम करते हैं; मैं
ambiguity को अगले हफ्ते team के planning में carry नहीं रखना चाहता।
```

Note क्या हो रहा है:

- Status Yellow है, Green नहीं। PM honest हो रहा है।
- "क्या shipped" तीन lines है, हर एक एक outcome एक number के साथ।
- "At risk" real risks हैं mitigations के साथ, boilerplate नहीं।
- Ask specific है — एक decision, एक date तक, options framed।

Roughly 200 words। एक exec इसे 45 seconds में scan कर सकता है।

---

## Flavor 2 — Engineering detail (~400 words)

### Prompt

```
आप एक engineering-team stakeholder update लिख रहे हैं। Rules:

1. ~400 words। Hard cap: 500।
2. Same skeleton as exec brief, पर include करें:
   - Blockers (technical या organizational), proposed paths के साथ
   - दूसरी teams पर dependencies
   - Decisions जो team मांग रही है, options + recommendation के साथ
3. Technical vocabulary fine है। Engineering के लिए dumb down न करें।
4. Same "status से lead" discipline। Yellow Yellow है।
5. Ask से end। Engineering-relevant: एक prioritization call, एक unblock,
   एक tradeoff decision।

सिर्फ update output करें।
```

### Worked example

```
**Status: Yellow** — Saved Searches May 30 के लिए on track; onboarding
work ~2 weeks slip; एक cross-team dependency at risk।

**इस period shipped (outcomes + how)**
- Webhook retry failures 78% cut: idempotency keys + dead-letter queue
  introduced। Stripe support ने pattern को उनकी recommendation से align
  confirm किया। P1 page volume 12/mo → 3/mo।
- Top-3 flows के लिए mobile-web parity: dashboard layout primitive
  को CSS Grid use करने के लिए refactored; एक side effect के रूप में
  long-standing tablet breakpoint bug resolve हुआ।
- Activation +3pp: first-touch tooltip पर A/B test 95% conf पर closed।
  Variant B (greeting के बजाय contextual) जीता।

**अभी building**
- Saved Searches v1 — backend complete; UI 80%। Filter-JSON storage
  pattern 12 most-used query shapes के against validated। Beta cohort
  selected: 4 customers, सब power users, opt-in।
- Onboarding v2 revision — पहले highest-impact edges ship करने को scope
  adjusted। Q3 के लिए तीन edge cases बचे।

**Blockers और dependencies**
- Team-shared saves kickoff Permissions team के new RBAC primitive ship
  करने पर contingent है (ETA: May 25)। Weekly tracking। Fallback: एक
  simpler all-or-nothing share model के साथ Team-shared saves ship,
  जब RBAC land हो तो fine-grained में refactor।
- Search backend latency p95 पर Q1 के through 18% creep up हुई — अभी
  user-impacting नहीं, पर trending। Q3 fire बनने से पहले investigate
  करने को एक engineer-week propose कर रहा।

**Decisions needed**
1. Q2 में open engineering seat backfill, या Q4 तक mobile-web slip
   accept? Recommendation: backfill। Mobile-web H2 के 4 में से 2
   top-renewal customer asks में है।
2. RBAC slip हो तो fallback all-or-nothing share model के साथ Team-shared
   saves? Recommendation: yes। Customer commitment Q3 के लिए है, और
   जब RBAC land हो तो refactor cost ~3 days है।

**Ask**
Friday तक ऊपर के दो decisions चाहिए। दोनों अगले sprint का plan shape
करते हैं।
```

Exec brief से क्या different:

- Work कैसे shipped शामिल है, सिर्फ outcome नहीं।
- एक latency trend surface करता है जो अभी user-impacting नहीं — engineering signal, exec signal नहीं।
- Decisions options और एक recommendation के साथ frame करता है, open questions के रूप में नहीं।
- Ask specific decisions और एक date name करता है।

---

## Flavor 3 — Customer-facing (~150 words)

### Prompt

```
आप एक customer-facing update लिख रहे हैं। Rules:

1. ~150 words। Hard cap: 200।
2. Plain language। कोई internal jargon नहीं। कोई metric callouts नहीं
   जो customer को matter नहीं करते।
3. अभी customer क्या use कर सकता है (shipped thing) से lead करें।
4. "क्या आ रहा" month-granularity पर ज़्यादा से ज़्यादा। Exact dates पर
   कोई commitments नहीं।
5. Feedback के लिए एक channel। Easy to use।
6. कोई status colors नहीं। कोई "at risk" language नहीं। अगर कुछ customer
   को matter करता है, इसे positively frame करें या omit।
7. Voice: warm पर gushing नहीं। Confident पर pushy नहीं।

सिर्फ update output करें।
```

### Worked example

```
Hi everyone,

इस month dashboard में क्या new है और next क्या आ रहा है उस पर एक
quick note।

**क्या आप अभी use कर सकते हैं**
- Dashboard में power users के लिए "Save this view" button live है।
  अपने filtered views save करें, उन्हें name दें, और वे हमेशा exactly
  restore होंगे — भले ही हमारी URL structure नीचे बदले। Per user 50
  तक।
- Mobile-web अब उन तीन flows के लिए usable है जिन्हें आप सबसे use
  करते हैं: dashboards, alerts, और audit log। Remaining दो flows
  इस fall आ रहे हैं।

**Coming next**
- Team-shared saved views — अपनी team के साथ एक filtered view share।
  July targeting।
- नए teammates जिन्हें आप onboard करते हैं उनके लिए improved first-run
  experience। Late June।

**एक small ask**
अगर आप Saved Views try करें और कुछ missing या weird मिले, इस email
को reply hit करें। मैं हर एक personally पढ़ता हूँ और यह shape करता
है कि हम next क्या build करते हैं।

— Alex
```

क्या different है:

- कोई status color नहीं, कोई "at risk" framing नहीं।
- "Per user 50 तक" एक real limit surface करता है, पर customer language में।
- "Coming next" months use करता है, quarters या specific dates नहीं।
- Ask direct और easy है (इस email का reply)।

---

## तीनों को एक workflow में कैसे use करें

ज़्यादातर weeks, आप पहले engineering-detail update लिखते हैं क्योंकि वहाँ raw material रहती है — आपकी sprint planning, आपके blockers, आपकी team के decisions। फिर आप compress करते हैं।

Workflow:

1. Engineering-detail update लिखें (~400 words)।
2. AI के through run करें: "एक exec brief के लिए 200 words तक compress करें। एक specific ask रखें। Technical vocabulary drop करें।"
3. AI के through फिर run करें: "हमारे customers के लिए 150 words में rewrite करें। Plain language। Internal blockers drop। अभी क्या use कर सकते हैं उसके around frame।"

Total time: तीनों versions के लिए 30 minutes। Compression passes over-claiming catch करते हैं — अगर exec version "shipped X" बिना hedging के नहीं कह सकता, engineering version probably overstated भी था।

---

## Anti-patterns जो prompt blocks करता है

- "I hope this email finds you well." — Cut।
- "Just wanted to circle back on..." — Cut।
- "Per my last email..." — Cut।
- "We continue to make progress on..." — Vague। एक outcome और एक number से replace।
- "Things are going well!" — Status एक color है, एक feeling नहीं। एक pick करें।
- "Let me know if you have any questions." — Ask नहीं। Actual ask state करें।
- "Excited to share..." — Exec को नहीं चाहिए कि आप इसके बारे में कैसा feel करते हैं। Substance तक पहुँचें।

अगर इनमें से कोई slip हो जाए, prompt: "हर filler phrase strip करें और status, outcomes, और ask से rewrite करें।"
