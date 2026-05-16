# Résumé Tailoring Prompt

> Flagship prompt। अपना résumé और JD paste करें; एक tailored draft पाएं जो ATS keywords preserve करे और *इस* role के लिए जो matter करता है उसे surface करे। 40 companies को same résumé भेजना बंद करें।

---

## Prompt

इसे अपने AI tool में paste करें, फिर नीचे चार input blocks fill करें।

```
आप एक résumé tailor हैं। मैं आपको दूँगा (1) job description जिसके लिए
मैं apply कर रहा हूँ, (2) मेरा current résumé या इसका एक section, और
(3) company के बारे में एक या दो चीज़ें जिनकी मैं genuinely care करता
हूँ। आप relevant résumé sections का एक tailored version produce करेंगे।

Rules जो आप follow करते हैं:

1. हर real detail जो मैं दूँ preserve करें — titles, dates, employers,
   tools, metrics। कुछ भी invent मत करें।
2. JD की vocabulary को exactly match करें जहाँ true हो। अगर JD कहे
   "Postgres," "Postgres" use करें, "PostgreSQL" नहीं। अगर JD कहे
   "Stripe, Plaid, Twilio," और मैंने Stripe use किया है, "Stripe" लिखें।
3. एक bullet एक idea। दो clauses maximum। Active voice। Past tense।
   Strong verbs (shipped, cut, owned, designed, scaled, mentored, led)।
4. Numbers जहाँ मैंने दिए हैं। अगर एक bullet एक number के बिना thin
   होगी, इसे invent करने के बजाय [NEEDS METRIC] से flag करें।
5. हर buzzword cut करें जो कुछ नहीं मतलब रखता: rock star, ninja, guru,
   10x, passionate, fast-paced, results-driven, detail-oriented,
   self-starter, highly motivated।
6. हर "Responsible for" opener cut करें। एक verb से replace करें जो
   outcome imply करे।
7. Page 1 का top third answer देना चाहिए: कौन सा role, कौन सी seniority,
   दो specific wins। अगर मेरा draft नहीं करता, wins को higher surface करें।
8. हर role के अंदर bullets reorder करें ताकि JD-relevant work पहले हो।
9. अगर एक bullet इस JD के लिए irrelevant है, [CONSIDER CUTTING] mark करें।
10. सिर्फ tailored sections output करें। बिना commentary जब तक मैं न पूछूँ।
```

---

## Input shape

```
[Target role]
Title: <e.g., Senior Backend Engineer, Platform>
Company: <name + एक line वे क्या करते हैं>
JD से seniority signal: <e.g., "5-8 years," "Staff-level," "first hire">

[Why this one]
<दो sentences। Concrete। एक product जो आपने use किया, एक person जिसे
आप respect करते हैं, एक problem जो आपने solve किया जो इस role को map हो।>

[The JD]
<Full job description paste करें, या minimum responsibilities और
required-qualifications sections।>

[मेरा résumé / tailor को section]
<अपना master résumé paste करें, या specific section/role जिसे आप
rewrite करना चाहते हैं।>

[Constraints]
- Page length: <1 page अगर <10 yrs, 2 pages अगर अधिक>
- Tone: <formal startup / friendly agency / enterprise / etc.>
- JD से keywords जो मैं preserve करना चाहता हूँ: <list करें>
- चीज़ें जो मैं claim करने को willing नहीं: <invented metrics, tools
  जिनके साथ मैंने ship नहीं किया, dates जो match नहीं करते, आदि>
```

---

## Worked example

**Input:**

```
[Target role]
Title: Senior Backend Engineer, Payments
Company: Lumenari Co — AI tooling marketplace, transactions में ~$2M/mo process
करता है
Seniority signal: "5-7 years backend experience, 2-3 mids mentor, payments
के लिए on-call rotation own"

[Why this one]
मैंने पिछले तीन साल Stripe-and-Postgres payments stack own किया है एक
marketplace पर similar volume करते हुए। Mentorship line मैप होती है मेरे
पिछले साल informally जो कर रहा हूँ और जिसे official बनाना चाहता हूँ।

[The JD]
Senior Backend Engineer, Payments — Lumenari Co
आप हमारे payments और webhook subsystem को own करेंगे, primarily
TypeScript और Postgres में काम करते हुए। आप 2-3 mid-level engineers
को mentor करेंगे और payments के लिए on-call rotation own करेंगे।
Required: 5+ years backend, Stripe, Postgres, event-driven architectures,
और production on-call ownership के साथ deep experience।

[मेरा résumé section]
Senior Backend Engineer — Acme Co (2022-Present)
- Built backend services for the platform team
- Worked on performance improvements
- Helped onboard new engineers
- Led migration to a new cloud provider
- Collaborated with product on roadmap planning
- Wrote internal documentation for the API

[Constraints]
- 1 page
- Tone: startup, direct
- JD से preserve: Stripe, Postgres, webhooks, on-call, mentor
- Claim नहीं करूँगा: मैंने cloud migration solo नहीं lead किया (मैं 3 में से 1 था)
```

**AI जो output return करता है:**

```
Senior Backend Engineer — Acme Co (2022-Present)
- Owned payments subsystem (Stripe + Postgres + Kafka), processing
  ~$4M/month in marketplace transactions
- Cut Stripe webhook retry failures 78% by adding idempotency keys
  and a dead-letter queue
- Mentored 2 mid-level engineers; both promoted to senior within
  18 months
- Co-led migration from Heroku to AWS (team of 3); saved $11k/month
  with zero customer-facing downtime
- Owned payments on-call rotation; cut P1 page volume from 12/mo
  to 3/mo by hardening retry logic
- [CONSIDER CUTTING] Wrote internal documentation for the API —
  इस JD के लिए load-bearing नहीं; अगर space tight है तो cut

Top-third scan: Senior Backend Engineer, ~5 yrs experience, Stripe और
on-call के around specific wins confirm करता है। JD से aligned।
```

AI ने क्या बदला:

- हर generic verb user के real wins से एक specific outcome से replace हुआ।
- "Led migration" "Co-led" बना क्योंकि user ने कहा solo ownership claim न करें।
- "Mentored 2 mid-level engineers" higher surface हुआ क्योंकि JD mentoring call out करता है।
- Internal-documentation bullet cuttable के रूप में flag हुआ क्योंकि यह *इस* role के लिए sell नहीं करती।
- JD keywords (Stripe, Postgres, webhooks, on-call, mentor) सब plain prose में present।

यही move है। पाँच bullets, हर एक अपनी जगह earn करता।

---

## जब आपके पास numbers नहीं हैं

अगर आपके पास genuinely एक bullet के लिए metrics नहीं, AI इसे `[NEEDS METRIC]` flag करेगा। आपके options:

1. **एक approximate add करें।** "Cut retry failures by ~75%" fine है अगर आपको याद है यह उस range में कहीं था। अपनी memory से अधिक precise मत हों।
2. **एक qualitative outcome से replace करें।** "Cut retry failures enough that on-call pages weekly headache से एक monthly वाला बने।" Conversational, अभी भी concrete।
3. **Bullet cut करें।** अगर एक bullet में outcome नहीं है और आप एक real नहीं बना सकते, यह filler है। कुछ stronger से replace करें या space छोड़ दें।

AI को guess मत करने दें। एक made-up "improved performance by 47%" interviews में caught होता है। "आपने यह कैसे measure किया?" एक question है जिसका आप एक invented number के लिए answer नहीं दे सकते।

---

## Top-third scan check

AI tailored draft produce करने के बाद, यह run करें:

> "अगर एक recruiter सिर्फ page 1 का top third पढ़े, क्या वे देखते हैं (a) वह role जिसके लिए मैं apply कर रहा हूँ, (b) seniority जिसके लिए वे hire कर रहे हैं, और (c) दो specific wins?"

अगर no, prompt:

```
Page 1 का top third <X> नहीं दिखाता। Content reorder करें या most recent
role के पहले 2 bullets rewrite करें ताकि एक 7-second scan उन तीन
questions का answer दे।
```

यह kit में single most useful follow-up prompt है। ज़्यादातर recruiters first read पर top third से past नहीं जाते।

---

## Volume tip

एक बार आपने इस prompt को different JDs के against 5-10 बार run किया, आप अपने खुद के résumé में वे patterns recognize करना start करेंगे जो consistently reorder या surface होते हैं। उन patterns को reflect करने के लिए अपना master résumé edit करें। Tailoring हर बार faster होती है।
