# JD Generator with Anti-Bias Linting

ज़्यादातर JDs bad हैं क्योंकि hiring managers उन्हें 20 मिनट में लिखते हैं, आधे को दूसरे JD से copy करते हैं, और कभी उन्हें candidate की नज़र से नहीं पढ़ते। यह template उसे fix करता है। यह पहले एक anti-bias linter चलाता है, फिर एक JD produce करता है जो respect करे कि candidates actually कैसे पढ़ते हैं।

---

## यह template कैसे काम करता है

दो passes:

1. **Lint pass।** Brief या existing JD draft में हर problematic phrase flag करता है। Output के top पर lint + fix दिखाता है।
2. **JD draft।** Optimization pack के standard format को use करते हुए एक clean, structured JD।

आप एक hiring manager ने जो JD भेजा है उस पर lint-only चला सकते हैं (agencies और in-house teams में सबसे useful use case)।

---

## Prompt

```
आप Recruiter Co-Pilot हैं।

एक job description generate करें।

**Role title:** [exact title]
**Seniority:** [Entry / Mid / Senior / Staff / Principal / Director / VP]
**Role family:** [Engineering / Product / Design / Sales / GTM / Ops / Finance / etc.]
**Company stage + size:** [e.g., Series B, 80 people, $30M ARR]
**हम क्या बनाते हैं:** [एक sentence]
**हम यह role क्यों hire कर रहे हैं:** [एक sentence — growth, replacement, new team, new function]
**Location + working arrangement:** [Remote / Hybrid X days in [city] / On-site (city)]

**Salary band:**
- Base: [low] - [high] [currency]
- Equity: [range, अगर applicable]
- Bonus/commission: [structure, अगर applicable]

**Top 3 चीज़ें जो person own करेगा (concrete, vague नहीं):**
1. [outcome]
2. [outcome]
3. [outcome]

**Top 3 skills/experience needed (outcomes, gatekeeping नहीं):**
1.
2.
3.

**Nice-to-have (optional):**
- [3-4 things]

**Team जिसमें वे join करेंगे (real headcount, possible हो तो named manager):**
[description]

**Interview process (आपका actual process, template नहीं):**
[rounds का number, वे किससे मिलेंगे, format]

**कुछ और flag करने लायक:**
[e.g., "हमारे पास अभी एक senior engineer नहीं है — आप bar set करेंगे," या "codebase जितना हम चाहते हैं उससे पुराना है"]

Existing draft (अगर कोई):
[paste — lint pass के लिए]
```

---

## आपको क्या मिलेगा — full example

एक Series B SaaS में Senior Full-Stack Engineer role के लिए:

### Lint pass (hiring manager के draft से)

> **Original draft पर lint pass:**
>
> - `"passionate"` → cut। Passion एक feeling है, deliverable नहीं।
> - `"rock star"` → cut। Gendered (male skew, senior women candidates को off-put करता है), साथ ही corporate cringe।
> - `"fast-paced, dynamic team"` → cut। "We're disorganized" code। Concrete pace expectations से replace।
> - `"10x developer"` → cut। Meaningless, thoughtful senior engineers को off-put करता है।
> - `"thrives in ambiguity"` → soften या specific हों। Senior engineers SOME structure expect करते हैं; यह phrase अक्सर "हमें नहीं पता हम क्या चाहते हैं" code।
> - `"wear many hats"` → cut। "हमारे पास team नहीं है" code। अगर true है, honestly कहें।
> - `"Bachelor's degree in Computer Science required"` → drop या "Bachelor's degree OR equivalent experience" में change। 10 साल के demonstrable work वाले senior engineers को CS degree पर gatekeep नहीं किया जाना चाहिए।
> - `"10+ years of experience"` → reconsider। Role को 10 साल नहीं चाहिए; 6-8 साल पर senior-quality work common है। "Multiple roles में demonstrated senior-level work" से replace।
> - `"work hard and play hard"` → cut। Young + grindy coded। Older candidates और parents को off-put।
> - `"we're like a family here"` → cut। Vague और अक्सर boundary issues का flag। Concrete team norms से replace।
> - `"competitive salary"` → actual salary band से replace। Non-negotiable।

### Rewritten JD

> **Senior Full-Stack Engineer**
>
> **About the role**
>
> आप एक 7 की team में तीसरे senior engineer होंगे, हमारे TypeScript / React / Node / Postgres stack के across काम करते हुए ऐसे features ship करते हुए जिनके लिए हमारे customers actually pay करते हैं। Day-to-day मतलब production code लिखना, PRs review करना, कभी-कभी mids के साथ tricky problems पर pairing, और अपने पहले 90 days में product के एक major area को end-to-end own करना।
>
> **What you'll do**
>
> - Full stack को touch करने वाले features ship करें — Postgres schema से React components तक
> - अपने पहले 90 days में हमारे तीन product areas (billing, integrations, या workflows) में से एक own करें
> - एक team पर technical bar set करें जो अगले साल 7 से 12 engineers तक grow कर रही है
> - Scoping decisions पर product manager और designer के साथ pair करें, सिर्फ implementation पर नहीं
> - Mid-level engineers को mentor करें, इस पर लगभग 20% time (अगर चाहें तो ज़्यादा, न चाहें तो कम)
>
> **What we're looking for**
>
> - Front end पर TypeScript / React और back end पर Node / Postgres across demonstrated senior-level work
> - आपने एक startup या fast-moving team में production में ship किया है — आप जानते हैं "ship करने के लिए काफी अच्छा" क्या मतलब है
> - आप एक one-paragraph problem statement से अपना खुद का work scope कर सकते हैं
> - आप ऐसा code लिखते हैं जिसे दूसरे बिना translator के पढ़ और review कर सकें
> - आपने एक multiple time zones में बिखरी team के साथ remotely काम किया है
>
> **Nice to have**
>
> - AWS के साथ experience (हम इस पर हैं; अगर नहीं तो happy हैं आपको up to speed लाने में)
> - B2B SaaS specifically में background
> - Open source contributions या एक side project जिस पर आपको गर्व है
> - Infra-as-code (Terraform) के साथ comfort
>
> **Compensation**
>
> - Base salary band: USD $170,000 - $210,000
> - Equity: 0.05% - 0.15%, 4-year vest 1-year cliff के साथ
> - Bonus: company OKRs से tied 10% target annual bonus
> - Benefits: full health/dental/vision (US: 100% employee, 80% dependents), $1,000/mo home office stipend, 3-week minimum के साथ unlimited PTO, 16 weeks parental leave
>
> **About the team**
>
> [Engineering Lead name अगर public हो] को report करने वाले सात engineers। हम 2-week sprints करते हैं, एक हफ्ते दो short syncs के साथ async-first। अभी कोई on-call rotation नहीं — हमारे पास इसके लिए एक small ops team है। Codebase 4 साल पुराना है, उन parts में अच्छा-tested जो matter करते हैं, cleaner हो रहा है।
>
> **How we hire**
>
> 1. मेरे (recruiter) साथ 30-min intro
> 2. दो engineers के साथ 60-min technical interview — एक real problem जिस पर हमने काम किया, no LeetCode
> 3. 60-min system design conversation
> 4. Engineering lead के साथ 45-min meeting — culture, working style, हमारे लिए आपके questions
> 5. दो short reference calls
>
> Total time investment: 2-3 हफ्तों में लगभग 4 hours। हम final round के 5 business days के अंदर decisions बनाते हैं।
>
> **Working arrangement**
>
> - US और Canada में remote-first
> - Core hours: 11am - 3pm Eastern, उसके आसपास flex के साथ
> - हम साल में दो बार 3-day company offsite के लिए in person मिलते हैं (पिछला Mexico City में था; अगला Lisbon)
> - Offsites से परे कोई required travel नहीं

वह JD ~480 words है। यह same inbox में 90% JDs को out-perform करेगा क्योंकि यह candidate को apply करने से पहले एक real decision बनाने के लिए काफी देता है।

---

## Worked example — lint-only run

User ने hiring manager का original JD paste किया:

> "We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

AI returns:

> **Lint pass — 51 words में 9 flags। एक full rewrite recommend करें।**
>
> 1. `passionate` — cut (vague, senior candidates को off-put)
> 2. `rock star` — cut (gendered, corporate cringe)
> 3. `fast-paced` — cut ("disorganized" code)
> 4. `dynamic` — cut (कुछ नहीं कहता)
> 5. `10x developer` — cut (myth, thoughtful seniors को off-put)
> 6. `thrives in ambiguity` — flag (कभी-कभी legitimate; आमतौर पर "हमें नहीं पता हम क्या चाहते हैं" code)
> 7. `wear many hats` — cut ("no team support" code)
> 8. `Bachelor's degree in CS required` — drop OR "OR equivalent experience" में change
> 9. `10+ years of experience` — reconsider (अक्सर discriminatory; senior quality अक्सर 6-8 साल पर emerge करती है)
> 10. `work hard and play hard` — cut (age-coded, grind-coded)
> 11. `like a family` — cut (vague, कभी-कभी boundary flag)
> 12. `Competitive salary` — actual band से replace
>
> यह JD as-is diverse candidate pipeline पर under-perform करेगा और आपकी इच्छा से कम senior applicants पाएगा। क्या मैं इसे rewrite करूँ?

---

## जब linter नहीं चलना चाहिए

कुछ flagged phrases context में legitimate हैं। Examples:

- "Aggressive" "aggressive product roadmap" (एक real thing) के लिए fine है पर "aggressive personality" (hire signal जो biased skew करता है) के लिए नहीं।
- "Family" actual family-friendly policies (parental leave, sick-kid days) describe करते समय fine है। "We're like a family" के रूप में NOT fine।
- "Recent graduate" explicitly ऐसे branded early-careers programs के लिए fine है। Senior role पर NOT fine।

Linter इन context-dependent cases को "flag, auto-replace नहीं — intent confirm करें" के रूप में note करेगा।

---

## इसे hiring managers के साथ कैसे use करें

एक common scenario: hiring manager JD लिखता है। आपको लगता है यह bad है। आप उन्हें attacked feel नहीं कराना चाहते।

Lint pass आपको push back करने का एक non-confrontational way देता है। उन्हें flagged phrases WHY के साथ दिखाएं (research-backed: gendered language women applicants को 11% कम करती है; "10+ years" qualified candidates filter करता है जिनके पास 6-8 साल का senior-quality work है; education gatekeeping diverse pipeline shrink करता है)।

आप hiring manager को नहीं बता रहे कि उनकी writing bad है। आप उन्हें data दिखा रहे हैं कि language applicant pool को क्या करती है। ज़्यादातर hiring managers इसे देखने के बाद happily update करते हैं।

---

## Common mistakes जो kit flag करेगा

- **No salary band।** हमेशा पूछता है। हमेशा include करता है।
- **No real "How we hire" section।** Generic "multiple rounds" एक flag है — specific हों।
- **JD 800 words से ऊपर।** Trim। Long JDs indecision हैं।
- **Band में "Bonus" listed पर explained नहीं।** हमेशा structure कहें।
- **Equity ranges way too wide।** "0.01% - 1%" candidate को कुछ नहीं बताता। Tighten।
- **"Nice to have" section जिसमें actual requirements हैं।** Must-haves को nice-to-haves में hide न करें; यह candidates को confuse करता है और अच्छे ones को gate करता है।
