# Startup Founder Toolkit

> Communication tools जो आपको actually चाहिए एक solo या small-team founder के रूप में। हर prompt real investor feedback के against sharpen हुआ — वह तरह जो "too many slides, what are you asking for?" से end होती है।

**Optimized for:** कोई भी AI tool।

---

## Operating mode

आप एक founder की help कर रहे हैं founder-grade communication produce करने में: investor updates, pitch deck content, hiring briefs, runway math, customer interview notes। Default assumptions:

- Founder solo या near-solo है
- उनके पास एक real product है, एक hypothetical नहीं
- हर artifact के लिए audience specific है (existing investors, prospective hires, prospective customers, खुद)
- वे time-constrained हैं और thoroughness के ऊपर clarity value करते हैं

**Tone defaults:**
- Direct। कोई hedging नहीं, कोई "perhaps we might consider" नहीं।
- Concrete। Numbers, dates, names — adjectives नहीं।
- Founder-voiced, consultant-voiced नहीं।

**यह kit क्या produce करने से refuse करती है:**
- 80-slide decks
- "We are the Uber of X" framing
- Empty mission statements
- Vague metrics ("strong growth," "robust pipeline")
- Operational documents में marketing-speak

---

## चार core artifacts

### 1. Pitch deck (`templates/pitch-deck.md`)

एक 10-slide structure जो उस तरह से fit करे जैसे real investor meetings काम करती हैं। McKinsey 40-slide overkill नहीं। हर slide का एक job है।

### 2. Investor update (`templates/investor-update.md`)

5 questions के साथ Monthly update structure जो हर investor answer चाहता है। Ask-line discipline शामिल है — हर update में एक specific ask है, कभी "let me know if you have questions" नहीं।

### 3. Job description (`templates/job-description.md`)

JDs जो एक person के लिखे जैसा पढ़ें। Anti-patterns called out (the "rock-star ninja" line, the 47-bullet "responsibilities" section)।

### 4. Runway / burn model prompt (`models/runway-prompt.md`)

अपने current monthly numbers paste करें, एक runway calculation + एक sanity check + वे questions जो आपको फिर raise करने से पहले खुद से पूछने चाहिए पाएं।

---

## Prompt patterns

हर artifact के लिए, AI इस input shape के साथ best काम करता है:

```
[Audience]
यह कौन पढ़ता है? (existing seed investors / एक list से prospects / etc.)

[Context]
मैं किस stage पर हूँ? Last raise + amount + कब?
अभी कौन सा metric सबसे matter करता है?

[मैं क्या कहना चाहता हूँ]
A draft, even rough, उस thing का जो मैं communicate करने की कोशिश कर रहा हूँ।

[Constraint]
Length, format, tone notes।
```

[Audience] line skip करना #1 reason है कि founder docs bland निकलते हैं।

---

## Honest meta-prompt

जब आप AI से founder-voice content लिखने को कहने वाले हों, इस line को prepend करें:

> "ऐसे लिखें जैसे मैं अभी से 5 साल में हूँ, इसे पीछे देख रहा — past-me क्या appreciate करेगा सीधी बात बताए जाने पर?"

यह reliably corporate fluff को collapse करता है और कहने लायक actual thing को surface करता है।

> *Note: यहाँ India में, SEBI जैसी financial regulators investment advice को regulate करते हैं। यह toolkit founder communication produce करता है, formal investment advice नहीं। Financial projections illustrative हैं ("उदाहरण के लिए") — guarantees नहीं।*

---

## यह kit आपके लिए क्या NOT करेगी

- आपको funding दिलाए। Decks पैसे नहीं raise करते। Customers और traction करते हैं।
- आपकी runway accurately predict करे। Model केवल आपके last month के numbers + next month के बारे में एक guess जितना अच्छा है।
- एक co-founder conversation replace करे। AI एक writing partner है, एक strategy partner नहीं।

---

## Companion docs

- `templates/pitch-deck.md` — 10-slide deck generator
- `templates/investor-update.md` — monthly update template
- `templates/job-description.md` — JD जो हर दूसरे JD जैसा sound नहीं करता
- `models/runway-prompt.md` — runway calculator + sanity check prompt
