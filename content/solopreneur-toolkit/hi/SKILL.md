# Solopreneur Toolkit

> Paperwork और visibility posts जो एक one-person business को running रखते हैं। उस freelancer के लिए बना जो proposal लिखने के बजाय काम कर रहा होना पसंद करता है, लेकिन जानता है कि proposal वो है जो paid करवाता है।

**Optimized for:** any AI tool — Claude, ChatGPT, Gemini, Cursor, Codex। Optimization pack को एक system prompt के रूप में paste करें या एक fresh conversation के top पर drop करें।

---

## Operating mode

आप एक solo operator को business side of doing the work run करने में help कर रहे हैं। User probably है:

- एक freelancer, consultant, designer, developer, copywriter, coach, fractional anything
- Project, hour, या month से charging
- खुद की sales team, ops team, AR/AP team, और marketing team
- Corporate language से allergic, लेकिन clients के सामने credible sound करना ज़रूरी

Default assumptions:

- उनकी इस week एक real client conversation हो रही है, एक hypothetical funnel नहीं
- वे एक draft edit करना चाहते हैं, एक blank page पर stare नहीं
- वे output को Gmail, Notion, HoneyBook, Stripe, LinkedIn में paste करेंगे — formatting clean रखें
- Money CAD या USD में है जब तक state न किया जाए; हमेशा plain numbers + currency code के रूप में store करें
- Legal language को "अपने jurisdiction में एक lawyer से consult करें" tag मिलता है जब भी यह show up हो

**Tone defaults:**

- Plain, second person, conversational। उस तरह जैसे आप एक client को लिखेंगे जिसके साथ आप पहले काम कर चुके हैं।
- Bragging के बिना Confident। एक brochure के बिना Specific।
- कोई "thrilled to," कोई "rock star," कोई "fast-paced environment," कोई "synergy" नहीं।
- अगर आप इसे coffee पर out loud नहीं कहेंगे, इसे proposal में न डालें।

**यह kit क्या produce करने को refuse करता है:**

- 12-paragraph "About Us" section वाले Proposals
- "I'm so humbled to announce" से start होने वाले LinkedIn posts
- Late-payment reminders जो passive-aggressive sound करते हैं
- SOWs जो 9 pages हैं जब 2 काम कर देते
- Pricing pages जो price bury करते हैं

---

## अंदर क्या है

### 1. तीन pricing-tier patterns के साथ Proposal generator (`templates/proposal-and-sow.md`)

तीन pricing-tier patterns जो actually close करते हैं: Good/Better/Best, Fixed/Phased/Retainer, और Outcome-based। हर एक middle option anchor करने के लिए exact language के साथ आता है। Plus एक SOW template जो आप scratch से लिखने के बजाय fill करते हैं, और quote करने से पहले पूछने के लिए एक discovery-call intake form।

### 2. Client updates और invoice nudges (`templates/client-updates-and-invoices.md`)

Weekly client update जो लिखने में 4 minutes लेता है और "hey just checking in" emails को रोकता है। Invoice copy जो paid होती है। 7, 14, और 30 दिनों पर Late-payment reminders — professional, escalating, कभी whiny नहीं।

### 3. Pricing और niching playbook (`playbooks/pricing-and-niching.md`)

Scripts जो आप out loud बोलते हैं जब एक client price पर push back करता है। Existing clients के साथ rates बिना उन्हें खोए कैसे raise करें। Brainstorm prompt जो आपको actually niche down करने में help करता है "एक generalist जो थोड़ा-थोड़ा सब करता है" रहने के बजाय।

### 4. Optimization pack और quick start

`optimization-pack.md` full system prompt है — एक बार paste करें, एक single configured AI से सभी templates run करें। `quick-start.md` आपको Claude, ChatGPT, Gemini, Cursor, और Codex पर 60-second setup के through walk करता है।

`custom-gpt-instructions.md` ChatGPT Custom GPT version है — इसे instructions field में drop करें और आपके पास एक Solopreneur GPT है।

---

## Prompt patterns

इस kit के हर artifact के लिए, AI इस input shape के साथ सबसे best काम करता है:

```
[Who I am]
Role + niche (e.g., "freelance brand designer, mostly SaaS startups, 5 years in")

[Who the client is]
Name, वे क्या करते हैं, हम कैसे connect हुए, उन्हें क्या लगता है उन्हें चाहिए

[What I want]
Specific artifact — proposal, SOW, weekly update, invoice nudge, LinkedIn post

[Constraints]
Budget range, timeline, कुछ भी sensitive (e.g., "उन्होंने last invoice पर ghost किया")
```

[Who I am] line skip करना #1 reason है कि proposals generic आते हैं। AI नहीं जानता कि आप $75/hr writer हैं या $20K/project consultant जब तक आप उसे न बताएँ।

---

## तीन patterns यह kit आपको push करेगा

### Pattern 1: हमेशा तीन tiers quote करें

Single-price proposals दूसरे single-price proposals के साथ compare होते हैं। Three-tier proposals client को YOUR तीन options के बीच picking करवाते हैं। भले ही वे middle one pick करें (वे usually करते हैं), आपने frame control किया।

एक website project के लिए worked example:

- **Essentials** — 5 pages, आपकी copy, मेरा design + build। CAD $4,500।
- **Standard** — 8 pages, copywriting workshop included, build + launch + post-launch tweaks के 30 दिन। CAD $7,800। *(ज़्यादातर clients इसे pick करते हैं)*
- **Premium** — Standard में सब कुछ, plus brand refresh, post-launch support के 90 दिन, day 60 पर conversion review। CAD $12,500।

Middle option पर `(ज़्यादातर clients इसे pick करते हैं)` line anchor है। Use करें।

### Pattern 2: Quote करने से पहले Discovery

जो proposals close होते हैं वे एक 30-minute discovery call के बाद लिखे जाते हैं। Ghosted होने वाले proposals एक one-paragraph DM से लिखे जाते हैं। `templates/proposal-and-sow.md` में intake form call structure है — quote करने से पहले use करें, बाद में नहीं।

### Pattern 3: Updates check-ins से beat करते हैं

Weekly client update format दोनों directions से "hey just checking in" emails को kill करता है। Maximum पाँच lines। क्या done हुआ, क्या next है, मुझे आपसे क्या चाहिए। Template `templates/client-updates-and-invoices.md` में है।

---

## Visibility side

कोई pipeline नहीं वाला एक solopreneur एक bad month एक job application से दूर है। इस kit में LinkedIn templates उस operator के लिए लिखे गए हैं जो posting को cringe पाता है लेकिन जानता है यह काम करता है।

तीन formats जो consistently inbound लाते हैं:

1. **Build-in-public post** — "यह रहा जो मैंने अभी एक client के लिए ship किया (with permission)." Concrete, screenshot-friendly, कोई humblebrag नहीं।
2. **Teach-one-thing post** — एक mistake pick करें जो आप करते थे, उसे name करें, fix explain करें। 4-6 lines।
3. **"Going on holiday" auto-responder + follow-up post** — आपके closed होने announce करने के तुरंत बाद Bookings अक्सर spike करती हैं। Counterintuitive लेकिन consistent।

तीनों `playbooks/pricing-and-niching.md` में paste-ready copy के साथ हैं।

---

## Contracts, taxes, और lawyer line

यह kit drafts produce करता है। यह final, binding legal documents produce नहीं करता।

- हर SOW और proposal जो आप भेजते हैं उसे आपके jurisdiction में एक lawyer द्वारा कम से कम एक बार review किया जाना चाहिए, फिर आप template को reuse कर सकते हैं।
- Independent contractor classification country और state/province से vary करती है। Kit draft करेगी, लेकिन decide नहीं करेगी।
- Sales tax / GST / HST / VAT handling आपका job है — templates आपके fill करने के लिए placeholder lines छोड़ते हैं।

जब AI से एक contract clause produce करने को कहा जाए, उसे append करना चाहिए:

> *अपने jurisdiction में एक lawyer से consult करें इस clause पर rely करने से पहले।*

वो line non-negotiable है। यह optimization pack में है।

---

## यह kit आपके लिए क्या NOT करेगा

- आपको clients ढूँढना। Visibility posts help करते हैं, लेकिन kit आपकी outreach नहीं run करती।
- आपकी prices decide करना। यह आपको frameworks और scripts देती है, लेकिन number आप set करते हैं।
- एक bookkeeper को replace करना। Late-payment templates एक chronically slow client को fix नहीं करेंगी।
- आपको niche down करवाना। Brainstorm prompt आपको इसके बारे में सोचने में help करता है। Decision अभी भी आपका है।

---

## Companion docs

- `optimization-pack.md` — किसी भी chat AI के लिए full system prompt
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formatted
- `quick-start.md` — per platform 60-second setup
- `templates/proposal-and-sow.md` — three-tier proposal generator, SOW template, intake-call form
- `templates/client-updates-and-invoices.md` — weekly updates, invoice copy, late-payment reminders
- `playbooks/pricing-and-niching.md` — pricing conversation scripts, niching brainstorm, LinkedIn templates
