# Memory — Product Manager Toolkit

## Domain context

Product management वह unglamorous middle layer है users क्या चाहते हैं, engineering क्या build कर सकती है, और business को grow करने के लिए क्या चाहिए के बीच। PM का job incomplete information के तहत decision-making है: क्या build करें, किस order में, किन tradeoffs के साथ, और कैसे जानें कि यह काम कर गया। PM जो artifacts ship करते हैं — PRDs, roadmaps, sprint plans, stakeholder updates, metrics readouts — उन decisions को visible और reviewable बनाने के लिए exist करते हैं।

एक typical week: roughly 40% meetings में (planning, reviews, customer calls, 1:1s, leadership readouts), 30% writing (specs, updates, decision docs, follow-up Slack threads), 20% customer या data research पर, और 10% जो भी week का surprise हो उस पर। Startups पर PMs writing और customer time की ओर tilt करते हैं; larger companies पर PMs meetings और stakeholder management की ओर tilt करते हैं। Output जो furthest travel करता है वह written है — execs आपका update phone पर पढ़ते हैं, sales reps deals में आपका roadmap quote करते हैं, engineers kickoff के हफ्तों बाद आपका PRD reference करते हैं। Clearly लिखना actual job है।

Success यूँ दिखता है: team ऐसा work ship करता है जो एक metric move करे जिसकी company care करती है, एक timeline पर जो आपने कहा था ship करेंगे उसके close enough कि कोई surprise नहीं होता। Failure यूँ दिखता है: आप feature on time ship करते हैं, पर metric move नहीं करता, और कोई आपको बता नहीं सकता क्यों। अच्छा PM "हमें कैसे पता चलेगा यह काम कर गया" और "अगर नहीं तो next experiment क्या है" पर उतनी energy खर्च करता है जितनी building पर।

## Vocabulary जो AI को पता होना चाहिए

- PRD: Product Requirements Document। एक feature या initiative के लिए spec।
- BRD: Business Requirements Document। पुराना, broader, modern shops में कम common।
- Spec: PRD या किसी भी design doc के लिए shorthand।
- Now/Next/Later: roadmap format। तीन buckets, quarter granularity से परे कोई dates नहीं।
- OKR: Objectives and Key Results। एक goal-setting framework। एक tool के रूप में useful, religion नहीं।
- KR: Key Result। एक OKR का measurable part।
- North Star metric: एक single output metric जिसके around एक team या company orient करती है।
- AARRR / Pirate Metrics: Acquisition, Activation, Retention, Referral, Revenue। Classic funnel।
- JTBD: Jobs-to-be-done। यह समझने का framework कि users आपके product को क्या करने के लिए hire करते हैं।
- ICE: Impact, Confidence, Ease — एक prioritization rubric।
- RICE: Reach, Impact, Confidence, Effort — एक अधिक detailed prioritization rubric।
- Acceptance criteria: "क्या यह feature done है" के लिए checklist।
- DoD: Definition of Done। Team-level criteria जो हर story पर applies।
- DAU / WAU / MAU: Daily / Weekly / Monthly Active Users।
- Activation: एक user value के पहले meaningful moment तक पहुँचना। Definition product-specific है।
- Retention curve: time over cohort retention। Flat goal है; declining curves मतलब churn।
- LTV / CAC: Lifetime Value / Customer Acquisition Cost। Math जो determine करता है क्या growth healthy है।
- NPS: Net Promoter Score। Survey-based loyalty metric। Directionally useful, load-bearing नहीं।
- ICP: Ideal Customer Profile। वह customer जिसके लिए product built है।
- Sprint, standup, retro, refinement: scrum vocabulary। Use करें भले ही आपकी team scrum के बारे में strict न हो।
- Velocity, capacity, burndown: planning math। Capacity hours है; velocity story points या items shipped है।
- Carryover: work जो prior sprint में finish नहीं हुआ। Explicitly manage करें; pile up न होने दें।

## Common workflows

- **एक PRD लिखें:** problem → goal → non-goals → success metrics → acceptance criteria → scope → open questions। Non-goals section सबसे ज़्यादा work करता है; यह वहाँ है जहाँ आप "but what about X" को kickoff derail करने से पहले head off करते हैं।
- **एक roadmap update करें:** current Now/Next/Later से start करें, last quarter की actual delivery देखें, हर item पर Confidence (High/Med/Low) adjust करें, buckets के बीच items move करें, फिर एक paragraph context के साथ क्या बदला उस पर re-share।
- **एक sprint plan करें:** पहले capacity math (nominal hours से PTO, on-call, meetings subtract), फिर carryover triage, फिर P0 / Stretch / Won't-do। एक sentence में sprint goal top पर।
- **एक metrics review चलाएं:** 3-5 metrics pick करें जो सबसे matter करते हैं, हर एक के लिए trend / compared-to / hypothesis / follow-up लिखें। Noise bury करें।
- **एक stakeholder update भेजें:** engineering-detail version (~400 words) से start करें, फिर exec brief (~200) और customer-facing (~150) तक compress करें। Same content, तीन audiences।
- **Customer feedback triage:** theme से cluster, frequency count, ICP fit से weight, एक one-line outcome के साथ backlog में drop।

## क्या avoid करें / common mistakes

- **PRD bloat।** एक 2-day feature के लिए 12-page PRD engineering को signal करता है कि आप नहीं जानते actually क्या चाहते हैं। Doc length feature size से match करें।
- **"Q3" precision commitment के रूप में treat करना।** "Later" मतलब "Later।" एक quarter promise न करें जो आपने actually plan नहीं किया।
- **OKR cargo-culting।** OKRs set करना क्योंकि company OKRs run करती है, इसलिए नहीं कि आपके पास set करने को goal है। Worse: KRs लिखना जो actually measurable नहीं।
- **Pretend करना कि एक metric काफी है।** एक North Star useful है, पर ज़्यादातर teams को 2-4 metrics चाहिए — usage, activation, retention, revenue — यह जानने को कि really क्या हो रहा है।
- **"Leverage" sentence।** "We need to leverage our existing user base to unlock new growth verticals." इसका हर word cut।
- **Customer conversation से पहले PRD लिखना।** अगर आप एक user को quote नहीं कर सकते, आप अभी problem नहीं जानते।
- **Stakeholder updates में vague asks।** "Let me know if you have questions।" यह एक ask नहीं है। State करें कौन सा decision चाहिए या कौन सा intro चाहते हैं।
- **Roadmap items को feature names से confuse करना।** "Build saved searches v1" एक feature है। "Cut 'lost my view' tickets 50%" एक outcome है। Roadmaps outcomes पर रहते हैं।

## Tone / register

एक real PM direct, slightly tired, और unfailingly specific sounds करता है। वे "users want this" (जो आमतौर पर noise है) और "12 customers asked for this in the last 8 weeks" (जो signal है) के बीच difference जानते हैं। वे अपने work को oversell नहीं करते; वे numbers और user quotes को lifting करने देते हैं। Writing में, वे short sentences, possible हो तो named users, और explicit dates और counts पर default करते हैं। वे vague verbs से allergic हैं: "leverage," "unlock," "drive," "double down," "transform." जब वे एक feature पर "yes" कहते हैं, वे mean करते हैं; जब वे "not now" कहते हैं, वे भी mean करते हैं, और बिना flinch किए explain कर सकते हैं क्यों। Voice उस तरह sound करनी चाहिए जैसे किसी ने product ship किया हो, McKinsey deck पढ़ने वाले की तरह नहीं।
