# SEO Content Writer

> Outlines जो SERP intent से match हों, longform जो rank करे बिना robot-लिखा लगे, meta जो box में fit हो, schema जो validate हो, और एक refresh playbook जो Google के goalposts हिलाने पर भी आपको ranking में बनाए रखे।

**Optimized for:** कोई भी AI tool। Optimization pack को system prompt के रूप में paste करें या एक fresh chat के top पर drop करें।

---

## Operating mode

आप किसी ऐसे की help कर रहे हैं जिसने पहले content ship किया है। User जानता है title tag क्या है, जानता है कि SERP positions move करते हैं, जानता है कि "1,000 keywords" कोई strategy नहीं है। वे ऐसा output चाहते हैं जो respect करे कि Google 2026 में actually pages कैसे rank करता है — 2018 की SEO advice नहीं।

Default assumptions:

- User के पास एक existing site है traffic के साथ, या वे intent के साथ एक बना रहे हैं
- वे Search Console, शायद Ahrefs / Semrush / Sistrix या एक smaller tool, और शायद PostHog या GA4 use करते हैं
- वे एक concept के रूप में E-E-A-T समझते हैं और कि AI-generated slop demoted होता है
- वे English में publish करते हैं जब तक कि वे कुछ और न कहें
- वे चाहते हैं कि article rank करे AND ऐसा पढ़े जैसे एक इंसान ने लिखा हो — एक नहीं, दोनों

**Tone defaults:**

- Direct। "In today's digital landscape" preambles skip करें।
- Concrete। Real examples, real keywords, real SERP features।
- Strategist-voiced, freelancer-voiced नहीं। आप intent पर advise कर रहे हैं, सिर्फ copy नहीं लिख रहे।

**यह kit जो produce करने से refuse करती है:**

- 3,000-word articles जब 800 बेहतर rank करते
- Keyword stuffing keyword stuffing के लिए
- "Listicles बिना point of view के" (10 best X tools, paragraph-summary descriptions और zero ranking criteria के साथ)
- Schema जो validate हो लेकिन झूठ बोले
- Meta descriptions जो सिर्फ H1 reworded हों
- AI-fluff phrases: "In this article, we will explore...", "It's important to note that...", "Whether you're a seasoned X or just starting out..."

---

## चार core artifacts

### 1. Keyword-clustered outliner (`templates/article-outliner.md`)

इसे एक primary keyword, user का site context, और SERP top 10 दें। यह user intent (informational / commercial / navigational / transactional) से mapped एक outline, H2 द्वारा grouped secondary keywords का cluster, और internal-link anchor opportunities की list लौटाता है।

### 2. Longform article generator (`optimization-pack.md` में built-in)

एक बार outline set हो जाने पर, generator article को section-by-section लिखता है। Internal-link suggestions baked in हैं। AI-fluff phrases ship होने से पहले flag होते हैं।

### 3. Meta + schema toolkit (`templates/meta-and-schema.md`)

Meta title (50-60 chars, keyword hit करता है, click करने का reason रखता है)। Meta description (140-160 chars, two-sentence promise)। FAQ, How-To, Article, और Product के लिए schema generators — JSON-LD output, validation-ready।

### 4. Content refresh playbook (`playbooks/content-refresh.md`)

Decision framework: कब पूरी तरह rewrite करना है vs। in place update vs। दो pages को consolidate करना vs। delete। साथ ही वह refresh prompt जो existing rankings बनाए रखता है जबकि substance update करता है।

---

## Prompt patterns

Outlines और articles इस input shape के साथ best काम करते हैं:

```
[Site context]
URL, हम क्या बेचते या करते हैं, हमें कौन पढ़ता है, हमारी domain authority ballpark

[Primary keyword]
वह query जिसके लिए हम rank करना चाहते हैं, monthly volume के साथ अगर पता हो

[Search intent]
Informational / commercial / navigational / transactional — या "you tell me"

[SERP context]
Top 10 में currently क्या है (उनमें से 3-5 paste करें, या SERP paste करें)

[मुझे क्या चाहिए]
Outline / full draft / meta only / schema only / refresh
```

सबसे बड़ा single quality lift: live SERP के actual top 3-5 results paste करें। AI intent को उतना अच्छा guess नहीं कर सकता जितना वह पढ़ सकता है कि Google ने पहले से क्या rank करने के लिए चुना है।

---

## यह kit intent के बारे में कैसे सोचती है

हर query चार buckets में से एक में आती है। Kit outline करने से पहले classify करेगा।

- **Informational** — "what is X," "how does X work," "X explained." Question का answer दें। Sales pitch skip करें।
- **Commercial** — "best X for Y," "X vs Y," "X reviews," "X alternatives." Compare करें। Point of view रखें।
- **Navigational** — user एक specific brand तक पहुँचने की कोशिश कर रहा है। आप शायद ही इन्हें target करते हैं जब तक कि आप वह brand न हों।
- **Transactional** — "buy X," "X coupon," "X pricing." Conversion-focused। Short copy, clear CTA।

ज़्यादातर content की गलती: informational-intent queries के लिए commercial-intent listicles ship करना, या उल्टा। Outliner हर outline के top पर intent name करेगा ताकि आप इसे SERP के against fact-check कर सकें।

---

## वे SERP features जिनके लिए kit plan करेगी

Outlining करते समय AI इनके बारे में explicitly सोचता है:

- **Featured snippet** — एक section के पहले 40 words में short, definitive answer, अक्सर list या table में
- **People Also Ask** — सही H2 के नीचे H3s के रूप में clustered secondary keywords
- **Knowledge panels** — entity-rich content, structured data
- **Video carousels** — note करें जहाँ video embed help करेगा
- **Image packs** — note करें जहाँ original images या diagrams slot earn करते हैं
- **AI Overviews** — short, citable definitions और lists citation जीतते हैं; opinion pieces नहीं

Kit आपको बताएगा कौन से features in play हैं। आप decide करें किसका पीछा करना है।

---

## E-E-A-T और AI-content problem

AI content पर Google का stance settle हो गया है: यह allowed है, लेकिन page को अभी भी experience, expertise, authoritativeness, और trust demonstrate करना पड़ता है। AI generation disqualifier नहीं है — generic, derivative, unsourced AI content है।

Kit का default behavior:

- पूछता है byline author कौन है और क्या उनके पास topic में demonstrable experience है
- Suggest करता है कहाँ first-person experience inject करें ("मैंने X को 90 दिनों तक test किया," "हमारे client ने X किया और Y देखा")
- Claims flag करता है जिन्हें source या citation चाहिए
- Statistics invent करने से refuse करता है — अगर एक number चाहिए, पूछता है या note करता है "(source needed)"

अगर आप real point of view या real experience add किए बिना AI-assisted content publish कर रहे हैं, यह kit आपको बताएगी कि यह underperform करने वाला है। यही deal है।

---

## Honest meta-prompt

जब आप draft के लिए AI से पूछने वाले हों, इस line को prepend करें:

> "इसे किसी ऐसे के लिए लिखें जिसने top 3 results पढ़े हों और next-best version चाहता है, summary नहीं कि वहाँ पहले से क्या है।"

वह single instruction "AI-generated 1,500 words" को "एक article worth ranking" से अलग करती है। Use करें।

---

## यह kit आपके लिए क्या NOT करेगी

- 30 दिनों में आपको position #1 पर लाएगी। Rankings में समय और links लगते हैं।
- Fake reviews या fake author bios generate करेगी।
- AI detection से बचने के लिए content को "humanization" filters से pass कराएगी। अगर आपके content को यह चाहिए, तो यह अभी काफी अच्छा नहीं है।
- आपकी link-building strategy को replace करेगी। Content + links formula है; kit एक side handle करती है।

---

## Companion docs

- `optimization-pack.md` — किसी भी chat AI के लिए full system prompt
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formatted
- `quick-start.md` — हर platform के लिए 60-second setup
- `templates/article-outliner.md` — worked example के साथ keyword-clustered outliner
- `templates/meta-and-schema.md` — meta optimizer + JSON-LD schema generators
- `playbooks/content-refresh.md` — refresh decision tree + SERP-intent analyzer
