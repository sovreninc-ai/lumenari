# Keyword-Clustered Article Outliner

Outline वही जगह है जहाँ ranking जीती या हारी जाती है। अगर structure गलत है, कोई भी clever writing इसे fix नहीं करती। यह template वह prompt है जो "मैं X के लिए rank करना चाहता हूँ" को एक fight-ready outline में बदलता है।

---

## यह template क्या करता है

आप देते हैं: एक primary keyword, अपना site context, और live SERP के current top 3-5 results। यह लौटाता है:

1. Intent classification (informational / commercial / navigational / transactional)
2. SERP का read — क्या जीत रहा है और क्यों
3. H1, H2s, suggested H3s, और हर section के key points के साथ full outline
4. H2 द्वारा grouped secondary keyword clusters
5. Internal-link anchor suggestions (named, generic नहीं)
6. PAA (People Also Ask) opportunities FAQ H3s के रूप में surface
7. Meta title (50-60 chars) और meta description (140-160 chars)
8. Schema recommendation
9. E-E-A-T injection point — कहाँ आपकी real experience show होनी चाहिए

---

## Prompt

इसे अपने AI में paste करें। Bracketed fields fill करें।

```
आप SEO Content Strategist हैं।

मुझे एक article के लिए outline चाहिए जो target करे:

**Primary keyword:** [keyword]
**Estimated monthly volume:** [N — या "unknown"]
**Search intent (मेरा guess):** [informational / commercial / transactional / "you tell me"]

**मेरा site context:**
- URL: [domain.com]
- हम क्या publish करते हैं: [niche + format]
- Reader profile: [वे कौन हैं, वे क्या चाहते हैं]
- Domain Authority ballpark: [N — या "small site / mid / large"]
- मेरी site पर existing relevant pages (optional): [URLs और titles list करें]

**SERP top results (अगर possible हो current top 5 paste करें):**
1. [URL] — [title] — [आपका read: word count? format? angle?]
2. [URL] — [title] — [read]
3. [URL] — [title] — [read]
4. [URL] — [title] — [read]
5. [URL] — [title] — [read]

**SERP features जो मैं देख सकता हूँ:**
- Featured snippet: [yes/no — अगर yes, इसे कौन रखता है]
- People Also Ask: [yes/no — अगर yes, 4 questions paste करें]
- Video carousel: [yes/no]
- Image pack: [yes/no]
- AI Overview: [yes/no]

**मेरा differentiator angle (अगर मेरे पास है):**
[1-2 sentences में क्यों मैं better version लिख सकता हूँ — first-hand experience, unique data, contrarian POV, etc.]

मुझे दें:
1. Intent classification (एक-sentence justification के साथ)
2. SERP read (क्या working है, gap क्या है)
3. Full outline (H1 + H2s हर section का intent, key points, secondary keywords के साथ)
4. Internal link suggestions (3-5 named anchors)
5. PAA H3s अगर applicable
6. Meta title + meta description
7. Schema recommendation
8. E-E-A-T injection plan
```

---

## Worked example — "best CRM for solopreneurs"

यह real run end-to-end कैसा दिखता है।

### Input

```
Primary keyword: best CRM for solopreneurs
Estimated monthly volume: ~1,900
Search intent (मेरा guess): commercial

मेरा site context:
- URL: solo-saas-reviews.com
- हम क्या publish करते हैं: one-person businesses के लिए longform SaaS reviews और comparisons
- Reader profile: freelancers, consultants, indie operators tools evaluate कर रहे
- DA ballpark: 52
- Existing relevant pages:
  - /best-invoicing-software-for-freelancers (DA driver, #4 rank करता है)
  - /honeybook-vs-dubsado (decent traffic)
  - /crm-pricing-teardown (पुराना, #11 rank करता है)

SERP top results:
1. Zapier blog — "The 18 best CRMs for solopreneurs in 2025" — 4,200 words, listicle, कमज़ोर POV
2. HubSpot blog — "Best CRM for solopreneurs (and why)" — 2,800 words, soft-promotional
3. Substack writer review — "I tested 5 CRMs for 90 days as a freelancer" — 1,400 words, strong personal POV
4. Capterra category page — generic
5. G2 category page — generic

SERP features:
- Featured snippet: yes, currently HubSpot के पास, short paragraph definition
- People Also Ask: yes — (1) What is the best free CRM for solopreneurs? (2) Do solopreneurs need a CRM? (3) Is HubSpot good for solopreneurs? (4) What is the easiest CRM to use?
- Video carousel: no
- Image pack: no
- AI Overview: yes, Substack और HubSpot को cite करता है

Differentiator angle: मैंने actually 7 CRMs के लिए pay किया और हर एक को 90 दिनों तक use किया। मेरे पास real screenshots, time-to-first-deal-logged पर real data, real cancellation receipts हैं।
```

### AI से expected output

> **Primary keyword:** best CRM for solopreneurs (vol ~1,900/mo)
> **Intent:** Commercial। Query implies करता है user evaluation mode में है — वे recommendation चाहते हैं, definition नहीं। "Best" + "for [audience]" classic commercial intent है।
>
> **SERP read:**
> - Top 3 formats: दो listicles + एक personal review
> - Word count range: 1,400 (Substack) से 4,200 (Zapier)। HubSpot बीच में 2,800 पर।
> - #3 पर Substack piece सबसे छोटा होने के बावजूद rank up कर रहा है क्योंकि इसमें एकमात्र authentic POV है। Zapier और HubSpot दोनों ऐसा feel देते हैं जैसे brief से लिखे गए हों, use से नहीं।
> - Featured snippet short और definitional है — page के top पर "what is a CRM for solopreneurs" या "do solopreneurs need a CRM" के 40-50 word answer से winnable।
> - AI Overview पहले से Substack piece को cite करता है। यह बताता है कि Google इस query के लिए real-test content को reward कर रहा है।
> - **Gap:** top 3 में किसी के पास serious data नहीं है — time-to-value, real cancellation friction, free plans की limits के साथ real pricing-tier comparison। वही आपका opening है।
>
> **Author/byline considerations:** यह article तभी काम करता है अगर इसे ऐसे bylined किया गया हो जिसने actually 7 CRMs use किए हों। अगर वह आप हैं, lead करें: "मैं [आपका context] हूँ। 90 दिनों में मैंने pay किया और [list] test किया। यहाँ है जो मैंने रखा और जो cancel किया।" अगर आप tester नहीं हैं, hire या partner करें — fake मत करें; Google इसे smell करने में बेहतर हो रहा है।
>
> **Outline:**
>
> **H1:** Best CRM for Solopreneurs: 7 Tested for 90 Days (~58 chars)
>
> **H2: Do solopreneurs actually need a CRM?**
> Intent: सबसे ज़्यादा पूछे गए PAA का answer देता है, featured snippet capture करता है, और rest set up करता है।
> Key points: पहले paragraph में 40-word answer। फिर honest version — 20 clients से कम वाले ज़्यादातर solopreneurs को अभी एक नहीं चाहिए, लेकिन यहाँ है कब यह flip होता है।
> Internal link: anchor text "CRM pricing tiers" से `/crm-pricing-teardown` को link
> PAA: yes — यह section PAA #2 भी cover करता है
>
> **H2: How I tested these 7 CRMs**
> Intent: E-E-A-T establish करता है। यह वह section है जो Google को rest पर trust करवाता है।
> Key points: timeline (हर 90 दिन), क्या tested हुआ (setup time, time to first deal logged, daily-use friction, cancellation friction), क्या नहीं (enterprise features, ungated team plans)।
> Internal link: अभी कोई नहीं — बाद में sub-page के रूप में screenshot gallery से एक earn कर सकते हैं।
>
> **H2: The 7 CRMs, ranked**
> Intent: main meat। हर subhead एक CRM clear verdict के साथ।
> Key points: हर entry में 200-word block: tier picked, monthly cost, 1-line verdict, क्या काम किया, क्या टूटा, क्या मैं रखूँगा।
> Internal link: जहाँ relevant हो "HoneyBook vs। Dubsado deep dive" से `/honeybook-vs-dubsado` को link।
> Naturally weave करने के लिए secondary keywords: "free CRM for freelancers," "CRM for one-person business," "simple CRM," "lightweight CRM."
>
> **H2: Free CRMs: which one I'd actually pick** (PAA #1 cover करता है)
> Intent: "free" modifier traffic capture करें बिना whole article को free के बारे में बनाए।
> Key points: HubSpot Free obvious default है; 1,000 contacts पर honest gotcha; अगर आप 25 clients से कम हैं तो क्या use करें (एक Notion template अक्सर हर free CRM को हराता है)।
> Internal link: कोई नहीं — लेकिन अगर आपके पास Notion CRM template page है, link करें।
>
> **H2: Is HubSpot good for solopreneurs?** (PAA #3 cover करता है)
> Intent: brand-specific PAA का answer दें बिना article को HubSpot-vs-everyone बनाए।
> Key points: 100-150 words। Honest answer (yes, caveats के साथ)। कहाँ यह solopreneur को overserve करता है।
>
> **H2: What I'd actually pick — and the boring reason why**
> Intent: differentiator section। Strong opinion, no fence-sitting।
> Key points: एक winner name करें। Runner-up name करें। Avoid करने वाला name करें। Receipts।
>
> **H2: How to switch CRMs without losing data**
> Intent: long-tail "how to migrate" intent capture करें + article को practical value दें।
> Key points: export formats, क्या transfer नहीं होता, 1-week parallel-run approach।
> Internal link: अगर आपके पास `/data-migration-guide` page है, link करें।
>
> **Frequently asked questions**
> H3: What is the easiest CRM to use for solopreneurs? *(PAA #4 cover करता है)*
> H3: How much should a solopreneur pay for a CRM?
> H3: Can I use Notion as a CRM?
> H3: When should a solopreneur upgrade from a spreadsheet to a CRM?
>
> **Meta title:** Best CRM for Solopreneurs: 7 Tested in 90 Days (52 chars)
>
> **Meta description:** 7 CRMs के लिए pay किया और हर एक को 90 दिनों तक as a one-person business use किया। यहाँ है वो जो मैंने रखा, जो fastest cancel किया, और comparison sites क्या miss करती हैं। (160 chars)
>
> **Schema recommendation:** Article + FAQPage। Product schema skip करें जब तक individual product review pages add न कर रहे — article comparative है, single-product review नहीं।
>
> **E-E-A-T injection plan:**
> - First-person opening: "मैं [नाम] हूँ, मैं [business type] चलाता हूँ, और tools के लिए अपनी जेब से pay करता हूँ। यहाँ है जो 90 दिनों के testing ने सिखाया।"
> - हर CRM के H2 में real screenshots (signup screen, dashboard, cancellation flow)
> - Real numbers: time-to-first-deal-logged, paid monthly cost, cancellation friction score (आपका own scale)
> - नीचे author bio role + tenure + अपने other reviews के link के साथ
> - अगर आपने किसी CRM से पैसा लिया है (affiliate, sponsorship), top पर disclose करें, bottom पर नहीं

---

## Common outline mistakes जो kit flag करेगा

- **Featured snippet anchor करने वाला कोई section नहीं।** अगर SERP में featured snippet है, आप चाहते हैं आपका H2 पहले 40-60 words में इसका answer दे।
- **PAA questions ignored।** अगर People Also Ask SERP पर है, आप एक FAQ section win छोड़ रहे हैं।
- **एक giant section।** अगर एक H2 के नीचे 600+ words हैं, split करें। Search results H2s और H3s scan करते हैं।
- **कोई internal links named नहीं।** "Related content link करें" किसी की help नहीं करता। Anchor और target name करें।
- **Meta description जो सिर्फ H1 rewrite करे।** Google उनको rewrite करता है। एक real two-sentence promise लिखें।
- **No E-E-A-T injection।** Outline कहीं नहीं जाता अगर first-person experience के लिए plan नहीं है।

---

## Outline मिलने पर इसे कैसे use करें

1. एक बार पढ़ें। किसी बात से disagree? AI से choice defend करवाएं या revise करवाएं।
2. वे placeholders fill करें जिन्हें आपके data चाहिए (real numbers, real screenshots, real anecdotes)।
3. Full draft मांगने से पहले outline approve करें। AI को 2,500 words लिखने न दें और फिर realize करें कि structure off है।
4. Section-by-section draft generate करें। Optimization pack इसे handle करता है — हर section एक featured-snippet-ready answer से खुलता है, फिर deepen होता है।
5. Shipping से पहले draft को meta + schema generator (`templates/meta-and-schema.md`) से चलाएं।
