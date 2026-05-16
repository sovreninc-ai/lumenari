# Cover Letter + LinkedIn Rewrite

> दो artifacts जो एक voice share करते हैं। Cover letters लगभग 30% बार पढ़े जाते हैं — फिर भी लिखें, और उन्हें short बनाएं। LinkedIn cover letter से अधिक बार पढ़ा जाता है और matters है उससे ज़्यादा जितना लोग realize करते हैं।

---

## Part 1 — Cover letter

### Prompt

```
आप user के लिए एक cover letter लिख रहे हैं। Rules:

1. तीन paragraphs। ~200 words total। Maximum 220।
2. Paragraph 1 (~50 words): एक specific reason से open करें कि user
   इस company को क्यों लिख रहा है। एक product, एक person, एक recent
   launch, या एक problem reference करें जिसके बारे में user ने actually
   सोचा है। कभी "I am writing to apply for the position of" से open
   न करें।
3. Paragraph 2 (~100 words): एक concrete story जो user के experience
   को JD पर map करे। Specific outcome। Résumé का recap नहीं।
4. Paragraph 3 (~50 words): एक clear next step से close करें। बिना
   arrogance के confidence। "I would love the opportunity to discuss" नहीं।
5. Voice: ऐसा sounds करे जैसे user ने लिखा। Startups के लिए slightly
   informal, finance या enterprise के लिए slightly formal। कभी एक
   press release नहीं। कभी एक humblebrag नहीं।
6. कोई buzzwords नहीं (passionate, results-driven, fast-paced, dynamic)।
7. कोई "transferable skills" framing नहीं। बस work दिखाएं।

सिर्फ cover letter output करें। कोई commentary नहीं।
```

### Input shape

```
[Target role]
Title, company, एक line वे क्या करते हैं।

[Specific hook]
इस company के बारे में एक thing जिससे आप lead करेंगे। Exactly एक चुनें।
Examples:
- "मैंने 18 महीने से आपका product use कर रहा हूँ और यह इस category में
  एकमात्र tool है जो एक real cadence पर ship करता है।"
- "मैंने <prev co> में एक similar payments problem पर काम किया और इसमें
  गहरे जाने में अगले 4 साल बिताना चाहता हूँ।"
- "मैंने सालों से <hiring manager का name> की writing follow की है और
  team की event-driven architecture पर recent post ने कुछ चीज़ें clarify
  कीं जिनके बारे में मैं गलत था।"

[Mapped story]
एक project, दो-तीन sentences context, outcome।

[Sign-off energy]
Confident, available, low-pressure।
```

### Worked example

**Input:**

```
[Target role]
Senior Backend Engineer, Payments — Lumenari Co (AI tooling marketplace,
~$2M/mo transactions)

[Specific hook]
"मैंने पिछले तीन साल एक marketplace पर similar volume कर रहे एक Stripe
Connect + Postgres payments stack build किया, और idempotent webhook
retries पर आपका recent engineering blog post exactly वह architectural
direction है जिसकी ओर मैं अपनी team को push कर रहा था।"

[Mapped story]
Acme में, payments subsystem own किया ~$4M/mo process करते हुए। Idempotency
keys + dead-letter queue add करके webhook retry failures 78% cut कीं।
दो mid-level engineers mentor किए, दोनों 18 months में senior में
promote हुए।

[Sign-off energy]
इस हफ्ते या अगले बात करने को available; अगर useful हो तो retry-failure
work पर more detail share करने को happy।
```

**AI जो output return करता है:**

```
Maya,

Idempotent webhook retries पर आपका engineering post exactly वह
architectural direction है जिसकी ओर मैं पिछले साल अपनी team को push
कर रहा था — मैं लिख रहा हूँ क्योंकि मुझे लगता है मैं आपको इसका next
layer ship करने में help कर सकता हूँ।

पिछले तीन साल मैंने Acme Co पर एक Stripe + Postgres payments stack
own किया है, एक marketplace जो roughly $4M/month transactions करता है।
जिस work पर मुझे सबसे ज़्यादा गर्व है: मैंने idempotency keys और एक
dead-letter queue introduce करके six महीनों में webhook retry failures
78% कम कीं, फिर on-call rotation को इतना harden किया कि P1 page volume
एक महीने bara से तीन तक drop हुआ। रास्ते में मैंने दो mid-level
engineers mentor किए; दोनों अब seniors हैं। Mentorship piece यह
reason का part है मैं क्यों look कर रहा हूँ — मैं अगले role में इसे
official बनाना चाहता हूँ।

मैं इस हफ्ते या अगले बात करने को available हूँ। अगर एक conversation से
पहले useful हो तो retry-failure architecture को more detail में share
करने को happy।

— Alex
```

यह letter क्या right करता है:

- Company के engineering content का एक specific reference से open। Hiring manager जानता है आपने actually इसे पढ़ा।
- Body paragraph tools, numbers, और outcomes name करता है — एक résumé recap नहीं।
- User की voice में mentorship mention करता है ("mentorship piece यह reason का part है मैं क्यों look कर रहा हूँ") क्योंकि JD ने explicitly इसके लिए पूछा।
- Availability और एक soft offer (retry-failure architecture) से close करता है। "I would love the opportunity" नहीं।

---

## Part 2 — LinkedIn rewrite

तीन sections matter करते हैं, order में: headline, About section, और Experience का top।

### Headline (120 characters max)

Recruiters search results में क्या देखते हैं।

**Bad:**

```
Senior Software Engineer | Passionate Builder | AWS / TypeScript / React
```

**Better:**

```
Senior Backend Engineer — payments, Stripe, Postgres | Mentor | Calgary / Remote
```

Prompt जो rules enforce करता है:

1. Target किए role से lead करें, current title से नहीं अगर वे differ करें।
2. Next तीन specific keywords — tools जिन्हें आप genuinely use करते हैं, tech-stack salad नहीं।
3. Optional third segment: location या availability ("Open to remote NA")।
4. कोई buzzwords नहीं। "Passionate Builder," "Code Slinger," या "Tech Enthusiast" नहीं।

### About section — पहली तीन lines सब कुछ हैं

सिर्फ पहले ~210 characters "see more" cut off से पहले show होते हैं। उनके लिए optimize करें।

**Prompt:**

```
User की LinkedIn About section लिखें। Rules:

1. पहली sentence (~140 chars max): position statement। वे क्या करते हैं,
   किसके लिए, और एक outcome। यह एकमात्र line है जो कई recruiters पढ़ते हैं।
2. अगली दो sentences total पहले ~210 chars के अंदर fit। Reader को
   "see more" click करने को hook करें।
3. Total length: 4-6 short paragraphs, ~150 words।
4. First-person, conversational। ऐसा sounds करे जैसे user ने लिखा,
   एक PR person ने नहीं।
5. एक specific call to action से end करें: "अगर आप X के लिए hire कर
   रहे हैं तो DM me," या "मैं Y के बारे में <link> पर लिखता हूँ," या
   "Payments space में senior backend roles के लिए open।"
```

**Worked example:**

```
मैं marketplaces के लिए payments infrastructure build करता हूँ। पिछले
तीन साल मैंने Acme Co पर $4M/month process करते Stripe + Postgres stack
own किया — webhooks, on-call, mentorship, the whole thing।

Acme से पहले मैं एक fintech startup में था जहाँ मैंने वह lesson सीखा
जो हर payments engineer hard way से सीखता है: idempotency optional नहीं
है, dead-letter queues optional नहीं हैं, और runbook 2 a.m. पर किसी
ऐसे द्वारा पढ़ा जाता है जिसने इसे नहीं लिखा।

मैं एक role में तीन चीज़ों की care करता हूँ:
- Real users के साथ hard problems
- एक team जहाँ mentorship दोनों ways cuts करे
- बिना theater के ship करने की autonomy

Currently Calgary में, North America में remote roles के लिए open।
अगर आप payments में एक senior backend engineer hire कर रहे हैं तो
DM me — मैं picky हूँ कहाँ जाऊँगा, और दस polite conversations से
एक अच्छी conversation rather रखूँगा।
```

पहले 210 chars (~3 lines) क्या show करते हैं:

```
मैं marketplaces के लिए payments infrastructure build करता हूँ। पिछले
तीन साल मैंने Acme Co पर $4M/month process करते Stripe + Postgres stack
own किया — webhooks, on-call, mentorship, the whole thing।
```

यही hook है। Recruiter पहले paragraph में role, tool, outcome देखता है और जानता है क्या आगे पढ़ना है।

### Experience section — current और most recent roles का top

LinkedIn 2-3 lines per role के बाद truncate करता है जब तक कोई expand न click करे। तो हर role की पहली दो lines आपके résumé के top third के equivalent हैं।

**Prompt:**

```
User के current role के पहले 2-3 bullets LinkedIn पर rewrite करें।
Rules:

1. पहला bullet: इस role पर scope और impact का एक-line summary।
2. दूसरा bullet: user जो roles target कर रहा है उसके लिए single most
   relevant accomplishment।
3. तीसरा bullet (optional): एक दूसरा accomplishment जो range दिखाए।
4. Same style rules as résumé: active voice, specific numbers, कोई
   buzzwords नहीं, JD-aligned vocabulary।
5. सिर्फ LinkedIn-formatted text output करें।
```

Worked example output:

```
Acme Co पर Senior Backend Engineer
2022 - Present · Calgary, AB (Remote)

→ ~$4M/month transactions कर रहे एक marketplace के लिए payments और
  webhooks subsystem (Stripe + Postgres + Kafka) own करें।
→ Idempotency keys और एक dead-letter queue introduce करके webhook
  retry failures 78% cut कीं; P1 pages six महीनों में 75% drop हुईं।
→ 2 mid-level engineers mentor करें; दोनों 18 months में senior
  promote हुए।
```

---

## दोनों artifacts कैसे साथ काम करते हैं

Cover letter और LinkedIn About section identical नहीं होने चाहिए, पर उन्हें एक voice और एक position share करनी चाहिए। अगर आपका cover letter कहे कि आप "$4M/month कर रहे एक marketplace पर Stripe stack own करते हैं," आपका LinkedIn About same thing कहे — differently phrased। Recruiters जो दोनों पढ़ें वे notice करेंगे अगर आप दो different लोगों जैसा sound करते हैं।

Cover-letter prompt और LinkedIn-About prompt same chat में back-to-back run करें। AI voice consistent रखेगा।

---

## Anti-patterns prompt blocks करता है

- "I am writing to apply for the position of [role]." — Sight पर cut।
- "I am thrilled by the opportunity to..." — Cut।
- "Please find attached my résumé." — उन्हें पता है। Cut।
- "I would love the opportunity to discuss how my skills..." — Cut।
- LinkedIn headline में "Tech Enthusiast | Lifelong Learner | Coffee Addict" — Cut।
- "Results-driven, detail-oriented self-starter passionate about..." — सब cut।

अगर इनमें से कोई slip हो जाए, prompt: "इस draft से हर cliché strip करें और plain language में rewrite करें।"
