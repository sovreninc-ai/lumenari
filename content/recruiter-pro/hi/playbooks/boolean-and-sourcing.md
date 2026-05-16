# Boolean and Sourcing Playbook

ज़्यादातर sourcing bad है क्योंकि Boolean string bad है। ज़्यादातर Booleans bad हैं क्योंकि वे सभी candidates को ऐसे treat करते हैं जैसे वे LinkedIn पर same तरीके से रहते हैं। यह playbook दोनों fix करता है — हर platform के लिए string builder, और sourcing playbook जो बताता है कि किस role family में किस seniority को कौन सा platform find करता है।

---

## Part 1 — Boolean string anatomy

हर अच्छी Boolean में चार moves होती हैं:

1. **MUST-have skills/titles** — required, आमतौर पर quoted strings, AND से joined
2. **OPTIONAL skills** — net broaden करते हैं, OR से joined
3. **EXCLUSIONS** — क्या आप नहीं चाहते, NOT के साथ
4. **CONTEXT signals** — company-type, seniority indicators, location

### Operators जो हर जगह काम करते हैं

- `AND` — दोनों terms present होने चाहिए
- `OR` — कोई भी term
- `NOT` (या ज़्यादातर search engines पर `-`) — exclude
- `"quoted phrase"` — exact match (spaces को term का part के रूप में treat करता है)
- `(parentheses)` — operators group

### Platforms के specific operators

- LinkedIn Recruiter में fields (Title, Skills, Company, आदि) filters हैं जिन्हें आप UI में toggle करते हैं, search string में NOT
- Public LinkedIn search keywords field में basic Boolean support करता है पर अधिक restricted है
- Google X-ray searches site:linkedin.com/in/ और full Boolean use करते हैं
- GitHub search `language:`, `location:`, `followers:>X` जैसे filters support करता है

---

## Part 2 — LinkedIn Recruiter strings

LinkedIn Recruiter सबसे आसान है क्योंकि platform खुद fields को आपके लिए separate करता है।

### Prompt

```
आप Recruiter Co-Pilot हैं।

मेरे लिए एक LinkedIn Recruiter search बनाएं।

**Target role:** [title]
**Seniority:** [Entry/Mid/Senior/Staff/Principal]
**Must-have skills:** [list]
**Optional skills:** [list]
**Industries/company types जो मैं चाहता हूँ:** [e.g., "B2B SaaS, Series A-C, 50-300 employees"]
**Industries/company types जो मैं exclude करना चाहता हूँ:** [e.g., "enterprise consulting, agencies"]
**Location:** [city + radius या remote-anywhere]
**Tenure preference:** [e.g., "current role पर 1+ साल"]

मुझे दें:
1. Keywords field के लिए Boolean string
2. हर filter field में क्या set करें (Title, Skills, Industry, Company, Location, Years of experience)
3. 2-3 variants अगर मेरा पहला search बहुत ज़्यादा या बहुत कम results return करे
4. देखने लायक common false-positive patterns
```

### Worked example — Senior Backend Engineer

> **LinkedIn Recruiter setup:**
>
> **Title filter:** (Senior OR Sr OR Staff) AND (Backend OR "Back-end" OR "Back end" OR Server)
>
> **Skills filter:** Node.js, TypeScript, PostgreSQL (तीनों require)
>
> **Keywords field Boolean:**
> ```
> ("Node.js" OR "Node" OR Typescript) AND (Postgres OR PostgreSQL) AND (AWS OR GCP) NOT ("recruiter" OR "recruiting" OR "tech evangelist")
> ```
>
> **Industry filter:** Computer Software, Internet, Financial Services (relevant के अनुसार toggle)
>
> **Company filter:** EXCLUDE: agencies, consultancies, large enterprise (Cognizant, Infosys, TCS, Accenture, Deloitte, Capgemini) अगर आप सिर्फ product company experience चाहते हैं
>
> **Years of Experience:** 6+ (10 पर gatekeep मत करें; senior-quality अक्सर 6-8 साल पर emerge करती है)
>
> **Location:** As specified
>
> **Variants अगर बहुत ज़्यादा results:**
> - Tenure filter add करें: current company पर 1+ साल (job-hoppers filter करता है + competitors द्वारा अभी hire किए गए लोगों को रोकता है)
> - Location radius tighten
> - Specific industry signal add करें (FinTech / HealthTech / आदि)
>
> **Variants अगर बहुत कम results:**
> - एक must-have skill drop करें, preferred रखें
> - Mid-level तक expand करें (अक्सर senior-quality)
> - Company filter loosen करें
>
> **देखने लायक false positives:**
> - "Senior" उन companies पर title में जहाँ senior मतलब 2 YOE (consulting, agencies)
> - Backend engineers जो सिर्फ Python या Java करते हैं (आपका stack Node है) — profile detail में verify करें
> - कोई भी "open to work" green ring AND current company पर 1 साल से कम — job-hopper हो सकता है; strong layoff candidate हो सकता है। Carefully पढ़ें।

### LinkedIn Recruiter — common Boolean patterns

| Use case | String example |
|---|---|
| Specific tools use करने वाले लोग find करें | `("Datadog" OR "PagerDuty") AND ("Kubernetes" OR "EKS")` |
| Conferences पर SPEAK करने वाले लोग find करें | `(speaker OR keynote OR "spoke at")` |
| OPEN SOURCE contributors find करें | `("open source" OR "OSS" OR github)` |
| एक specific company family से लोग find करें | `("ex-Stripe" OR "former Stripe" OR "previously at Stripe")` |
| Recruiters और trainers exclude करें | `NOT (recruiter OR "talent acquisition" OR trainer OR "tech evangelist")` |

---

## Part 3 — Public LinkedIn search

जब आप Recruiter के बाहर हों या supplement कर रहे हों।

### Format

LinkedIn का keywords field Boolean accept करता है पर अधिक restricted है। दो levels से अधिक nested parentheses नहीं। Quoted phrases काम करते हैं।

```
("Senior Backend Engineer" OR "Senior Software Engineer") AND ("Node.js" OR Typescript) AND Postgres NOT recruiter
```

UI में location और current-company filters के साथ combine, यह surprisingly दूर तक जाता है।

### X-ray Google searches (जब LinkedIn search gated है)

Google X-ray आपको ऐसे results देता है जो LinkedIn logged-out users से hide कर सकता है।

```
site:linkedin.com/in/ ("Senior Backend Engineer" OR "Senior Software Engineer") "Node.js" "Postgres" "San Francisco" -intitle:"profiles" -inurl:dir/
```

Variants:

- LinkedIn directory pages skip करने के लिए `-intitle:"profiles"` add करें
- Openness signal करने वाले लोग find करने के लिए `"open to work"` add करें
- `"intern"` add करें NOT exclude करने के लिए — negative `-intern` junior profiles filter करता है

---

## Part 4 — GitHub sourcing

GitHub वहाँ है जहाँ senior engineers actually रहते हैं। Signal code में है, bio में नहीं।

### Search patterns

**Language + location द्वारा:**
```
location:Toronto language:typescript followers:>50
```

**एक specific repo में open-source contribution द्वारा:**
- Repo पर जाएँ
- "Insights" → "Contributors" click करें
- पिछले साल में commits द्वारा sort करें
- Top contributors की profiles cross-reference hiring signals के लिए

**Recent activity द्वारा:**
```
location:"San Francisco" language:rust followers:>100
```
फिर "Most followed" से filter करें या recent activity के लिए contributions graph देखें।

**Tutorials या longform लिखने वाले लोग find करें:**
- Twitter/X पर GitHub repos search करें: `from:@person github.com/`
- या Google use करें: `site:github.com "tutorial" "production" "we built"`

### एक GitHub profile पर क्या देखना है

- Pinned repos with READMEs जो well पढ़ें — engineer-with-communication-skill signal
- Recent activity (पिछले 3 महीनों में contributions)
- खुद के projects + known projects को OSS contributions का mix
- Followers > 50 community presence का soft signal है
- Bio जो एक current company name करे (cross-reference save करता है)

### क्या NOT signal है

- High repo count alone — ज़्यादातर forks हैं
- उनके bio पर "AWS Certified" badges — paper signals
- 2 साल में commits के बिना उनके projects पर stars

---

## Part 5 — Sourcing playbook

किस role family में किस seniority को कहाँ find करें। Honest answer हमेशा "it depends" है, पर playbook narrow करता है।

### Engineering

| Seniority | Primary source | Secondary source | क्या काम करता है |
|---|---|---|---|
| Junior | LinkedIn (recent grads + bootcamp) | Bootcamp alumni networks (Bloc, App Academy, Lambda, आदि) | Direct outreach, पर lower reply rates expect करें |
| Mid | LinkedIn Recruiter | GitHub (active contributors) | Outreach में specific projects reference करें |
| Senior | GitHub > LinkedIn | Conference speakers, OSS contributors | Peer-toned outreach, technical specificity required |
| Staff/Principal | Referrals + GitHub + Twitter/X | LinkedIn शायद ही काम करता है — वे InMails ignore करते हैं | किसी ऐसे को hire करें जिसे वे respect करें; warm intro InMail का 10x है |

Senior+ engineers के लिए: LinkedIn पर पहले sourcing बंद करें। उनकी OWN content से start करें — blog posts, OSS contributions, conference talks। उनकी LinkedIn last जगह है जो वे update करते हैं।

### Design (Product / Brand)

| Seniority | Primary source | Secondary source | क्या काम करता है |
|---|---|---|---|
| Junior | LinkedIn + Dribbble / Figma Community | Bootcamp alumni | Portfolio specificity |
| Mid | Dribbble + Figma Community + LinkedIn | Twitter design community | Specific work compliment करें |
| Senior | Personal sites + Dribbble + Twitter | LinkedIn (low priority) | उनके actual work को reference, role को नहीं |
| Director | Referrals + Twitter | LinkedIn | सिर्फ warm intros |

Designers portfolios maintain करते हैं, LinkedIn नहीं। Portfolio source है।

### Sales (AE, SDR, CS)

| Seniority | Primary source | Secondary source | क्या काम करता है |
|---|---|---|---|
| SDR | LinkedIn + RepVue + Bravado | Networking events | Comp transparency, growth path |
| Mid AE | LinkedIn (highly active यहाँ) | RepVue (ICP-fit research के लिए) | Specific territory + comp band |
| Senior AE | LinkedIn + referrals | Industry Slacks (RevGenius, Pavilion) | Quota attainment data + product specifics |
| VP/CRO | Referrals + investor network | Heavy executive search | Warm intro required; cold outreach 1-2% |

LinkedIn वह जगह है जहाँ sales रहता है। उनकी entire professional identity वहाँ है।

### Operations / G&A

| Seniority | Primary source | Secondary source | क्या काम करता है |
|---|---|---|---|
| Junior/Mid | LinkedIn + Pavilion (ops के लिए) | Industry groups (e.g., HR के लिए People Geeks) | Specific scope description |
| Senior | LinkedIn + referrals + Pavilion | Industry communities | Starting state पर real-talk |
| Director/VP | Referrals + executive search | LinkedIn (low ROI) | Network introductions |

Ops people अक्सर LinkedIn पर hide करते हैं क्योंकि उन्हें constantly recruit किया जा रहा है। Communities higher signal हैं।

### Product (PM, Product Leadership)

| Seniority | Primary source | Secondary source | क्या काम करता है |
|---|---|---|---|
| APM/Mid | LinkedIn | Mind the Product community | Product specifics, growth path |
| Senior | LinkedIn + Mind the Product + Lenny's Newsletter circle | Twitter (active PMs यहाँ post करते हैं) | Domain specificity |
| Director/VP | Referrals + Reforge alumni | LinkedIn (low priority) | Warm intros |

Senior roles में PMs अक्सर बहुत online हैं — Twitter, Substacks, podcast appearances। वे जो publicly share करते हैं उसे reference करें।

---

## Part 6 — कहाँ diverse candidates find करें (बिना dog-whistling के)

यह section उन recruiters के लिए है जो performative bullshit के बिना अपनी funnel widen करने की कोशिश कर रहे हैं।

### Principle

Diverse pipelines आपके default sources से अलग जगहों पर sourcing से आती हैं। वे ऐसी search strings से नहीं आतीं जो protected categories पर filter करें (ज़्यादातर jurisdictions में illegal, चाहे platform try करने दे)।

### वे communities जो help करती हैं

- **Engineering:** Out in Tech, Lesbians Who Tech, /dev/color, Black Tech Pipeline, Latinas in Tech, Women Who Code
- **Design:** People of Craft (POC designers), Hexagon (women+ in design)
- **Sales:** Sistas In Sales, Hispanic Star, Women in Sales Everywhere
- **Product:** Women in Product, larger communities के अंदर Product Manager networks

ज़्यादातर के पास job boards, Slack workspaces, और event calendars हैं। आपको इनमें से एक को specifically role post करने से एक और LinkedIn search चलाने की तुलना में 10x ज़्यादा signal मिलेगा।

### क्या NOT करें

- LinkedIn पर "diversity" या "women" search करें — यह बहुत जगहों पर illegal है और जहाँ legal है वहाँ भी काम नहीं करता
- Candidate photos को visible diversity के लिए filter करें — illegal, biased, और data वैसे भी unreliable है
- Names को ethnicity के लिए proxy के रूप में use करें — wildly biased और अक्सर wrong
- एक JD के नीचे "We're an inclusive workplace" boilerplate जो otherwise "rockstar ninja" language से भरा है — candidates इसे साफ देखते हैं

### क्या काम करता है

- ऊपर listed communities में source करें
- एक actual inclusive workplace रखें (parental leave, flexible work, real ERGs, diverse leadership) और अपने JDs को honestly इसे reflect करने दें
- Equitably pay करें (salary bands publish करें; job level द्वारा pay-banding, negotiation aggressiveness द्वारा नहीं)
- हर stage पर funnel diversity track करें — sourced, screened, interviewed, offered, accepted। Drop-off आपको बताता है कहाँ आप टूटे हैं।

---

## Part 7 — Sourcing cadence + outreach metrics

### Realistic numbers

एक decent brand वाली Series B company पर senior engineering role के लिए:

- 50 candidates की sourcing list
- Outreach reply rate: 15-25% (comp + specific reason के साथ 3-line message)
- Phone screen conversion: replies का 50%
- First interview conversion: screens का 50%
- Offer: original 50 में से 1-2

अगर आपका reply rate 10% से नीचे है, issue almost हमेशा है:
- Generic outreach (इस candidate के लिए कोई specific reason नहीं)
- No comp band stated
- Subject line ("Exciting opportunity at...")
- Seniority के लिए off-brand outreach (Staff Engineer को template-toned outreach)

अगर आपका reply rate 30% से ऊपर है, आप बहुत narrowly source कर रहे हो सकते हैं। Pool widen करें।

### Outreach cadence

- Day 1: पहला message
- Day 5-7: एक follow-up (different angle — e.g., पहला message problem space से led; follow-up team से leads)
- Day 14: Final follow-up (short — "अभी भी यहाँ, अभी भी interested, no worries अगर right time नहीं है")
- फिर stop। तीन messages, फिर door open छोड़ें।

तीन के बाद, आप एक nuisance हैं। जो recruiters तीन से past keep going करते हैं वे उस company पर hire करने वाले हर एक के लिए brand burn करते हैं।

---

## Common Boolean और sourcing mistakes जो kit flag करेगा

- **बहुत सारे ANDs।** हर AND narrow करता है। 5+ AND clauses आमतौर पर 50 से कम results return करता है, ज़्यादातर वही नहीं जो आप चाहते हैं।
- **कोई NOT clauses नहीं।** आप trainers, recruiters, और consultants में drown होंगे। हमेशा exclude करें।
- **Title-only searches।** "Senior Backend Engineer" companies across wildly vary करता है। Skills + outcomes पर भी search करें।
- **Senior+ engineers के लिए LinkedIn पर searching।** उनकी LinkedIn stale है। GitHub, conference rosters, OSS contributor lists पर source करें।
- **एक remote role पर कोई location qualifier नहीं।** "Remote-anywhere" भी आमतौर पर time-zone constraints होते हैं। Time zone द्वारा filter करें, सिर्फ remote द्वारा नहीं।
- **उन्हीं 50 LinkedIn profiles को source करना जिन्हें हर दूसरा recruiter source कर रहा है।** अगर आपका pool एक generic LinkedIn search का पहला page है, आप 10 अन्य recruiters के साथ compete कर रहे हैं। Deeper जाएँ।
