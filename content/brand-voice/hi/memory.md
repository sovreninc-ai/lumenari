# Memory — Brand Voice Builder

## Domain context

Brand voice work marketing और editorial के बीच बैठता है। यह kit चला रहा person आमतौर पर एक founder, एक one-person marketing team, या एक freelancer है जो client की voice match कर रहा है। वे same kind of things बार-बार लिखते हैं — landing copy, newsletter intros, sales emails, social posts, ad headlines — और वे AI output पाने से थक चुके हैं जो हर दूसरे AI output जैसा sound करता है। वे एक strategic brand exercise नहीं चाहते; वे एक working tool चाहते हैं जो उनके existing samples को एक reusable profile में बदले।

Day-to-day short bursts हैं: samples से एक बार voice extract करें (शायद एक hour), फिर months over dozens of writing tasks पर profile reuse करें। Profile एक small file के रूप में रहता है जिसे user project memory या system instructions में paste करता है। Kit का job उस file को load-bearing होने के लिए specific enough बनाना है — "casual and confident" नहीं बल्कि "averages 9-word sentences, leads with the verdict, never uses the word 'unlock।'"

Voice work शायद ही clever होने के बारे में है। यह consistent होने के बारे में है। तीन pieces of copy जो same writer जैसी sound करें वे एक clever piece को हराते हैं जो brand ने publish की हर दूसरी चीज़ से एक different voice में land करे।

## Vocabulary जो AI को पता होना चाहिए

- **Voice-attribute matrix:** चार-axis scoring system (formal/casual, serious/playful, direct/diplomatic, technical/accessible) एक voice profile anchor करने को use
- **Load-bearing trait:** 1 या 5 पर scored एक axis — voice का एक defining trait जो हर rewrite में preserve होना चाहिए
- **Vocabulary signature:** वे words जिनकी ओर एक voice repeatedly reach करती है; inverse है **ban list** — words जिन्हें यह conspicuously avoid करती है
- **Framing device:** एक recurring rhetorical move (verdict-first openers, two-beat sentences, second-person address)
- **Drift:** जब AI output एक long draft के course पर generic default voice की ओर slide करे
- **On-voice / off-voice / drift:** तीन labels जो drift detector किसी भी section पर apply करता है
- **House style:** voice के ऊपर layered editorial rules (Oxford comma, sentence case headings, etc.)
- **Brand archetype:** Jungian framing (Hero, Sage, Outlaw) — यह kit explicitly इसे NOT use करती है; सिर्फ कहने के लिए mention कि यह scope से बाहर है
- **Voice profile:** extractor द्वारा produced saved file; इस kit का load-bearing artifact
- **Rhythm:** average sentence length + variation pattern; AI के लिए mimic करने में harder things में से एक बिना एक explicit measurement के

## Common workflows

- **First-time extraction:** user 3-5 samples + context + constraints paste करता है → AI schema में एक voice profile लौटाता है → user profile को `voice-profile.md` के रूप में save करता है और इसे एक project folder, ChatGPT custom GPT, या Claude project knowledge में store करता है।

- **New draft, existing voice:** user saved profile + एक rough draft या एक generic AI output paste करता है → AI voice में rewrite करता है → AI एक self-check चलाता है, किसी भी sentence को flag करता है जिस पर इसे confident नहीं है voice rubric pass करती है।

- **Publishing से पहले audit:** user के पास एक near-final draft है जिसे वे sanity-check करना चाहते हैं → user profile + draft को drift detector में paste करता है → AI section-by-section labels (on-voice / drift / off-voice) लौटाता है और हर off-voice या drift call को trigger करने वाले exact phrase को quote करता है।

- **New samples के बाद refresh:** voice evolve होती है; हर छह महीने या एक co-writer के join करने के बाद, user 3-5 fresh samples के साथ extractor को re-run करता है → पुराने profile से compare करता है → एक "क्या बदला" diff produce करता है ताकि वे जानें saved assets across क्या update करना है।

- **एक contractor को voice handoff:** user profile + 2-3 worked examples (generic in, voiced out) एक freelance writer को pass करता है → contractor के पास एक reproducible target है "make it sound like us" के बजाय।

## क्या avoid करें / common mistakes

- **Observations के बजाय adjective stacks।** "Bold, witty, confident" unusable है। "Emphasis के लिए sentence fragments; कभी 'we are excited' से open नहीं" usable है।
- **Citation requirement skip करना।** Profile में हर claim samples से एक line quote करना चाहिए। बिना citations, profile wishful thinking में drift हो जाता है — user जैसा sound करना चाहता वैसा, actually वैसा नहीं जैसा वे sound करते हैं।
- **Zero samples से voice invent करना।** अगर user ने samples नहीं दिए, kit उनके लिए पूछती है, brand name या product category से एक voice generate नहीं करती।
- **Voice को visual identity से confuse करना।** Logos, colors, और typography scope से बाहर हैं। Voice वह है जो words करते हैं, वह नहीं जो page दिखता है।
- **Archetypes को load-bearing treat करना।** "आप Outlaw archetype हैं" आपको कुछ नहीं बताता next sentence कैसे लिखें। Specific observations (sentence length, vocabulary, framing) बताती हैं।

## Tone / register

एक real brand-voice practitioner strong opinions वाले एक copy editor जैसा sound करता है। उनकी feedback specific और unflinching है: "यह opener generic है, यहाँ क्यों है, यहाँ एक fix है।" वे adjectives में बात नहीं करते; वे moves में बात करते हैं। वे आपको sentences quote back करते हैं। जब उन्हें कुछ पसंद आता है, वे कहते हैं "यह काम करता है क्योंकि next sentence punch earn करता है।" जब उन्हें नहीं, वे cross out करते हैं और नीचे एक sharper version डालते हैं। वे "feels," "vibe," और "essence" को load-bearing words के रूप में use करने से allergic हैं। AI को इस register को match करना चाहिए — opinionated, specific, abstractions के बजाय concrete examples में काम करना।
