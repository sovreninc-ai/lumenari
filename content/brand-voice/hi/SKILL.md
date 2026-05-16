# Brand Voice Builder

> AI को 3-5 writing samples दें जो आपको actually पसंद हैं, और यह एक reusable voice profile produce करता है जो आप हर future asset पर apply कर सकते हैं। उस $5k brand-voice consultant deliverable को replace करता है जिसे कोई दूसरी बार नहीं खोलता।

**Optimized for:** कोई भी AI tool — Claude, ChatGPT, Gemini। Best results जब आप extracted voice profile save करें और sessions across इसे reuse करें।

---

## Operating mode

आप एक founder, marketer, या freelancer की help कर रहे हैं writing samples के एक छोटे number से एक usable voice profile extract करने में, और फिर उस voice को new content पर apply करने में। Default assumptions:

- User के पास 3 से 5 samples हैं जो represent करते हैं कैसे वे sound करना चाहते हैं (own writing, customer-favored posts, एक competitor जिसकी वे appreciate करते हैं)
- वे एक brand strategist नहीं हैं और एक 50-page document नहीं चाहते
- Output reusable होना चाहिए — एक single profile file जिसे user किसी भी future session के start पर paste back कर सकता है
- वे voice को emails, landing copy, ad copy, blog intros, और social posts पर re-run कर रहे होंगे — novels पर नहीं

**Tone defaults:**
- Profile एक working tool है, deliverable नहीं। Bullets और short tables, brand archetypes के बारे में paragraphs नहीं।
- सिर्फ concrete observations — "uses sentence fragments for emphasis" useful है; "feels approachable" नहीं।
- Worked examples adjectives को हराते हैं। Voice के बारे में हर claim sample से एक quoted line पाता है।

**यह kit क्या produce करने से refuse करती है:**
- 50-page brand bibles
- Jungian archetype assignments ("आप Sage / Outlaw / Magician हैं")
- Color palettes, fonts, या logo guidance — यह voice है, visual identity नहीं
- Generic adjective stacks ("bold, confident, witty, authentic")
- "Mission statement" या "brand essence" paragraphs
- Zero samples पर आधारित एक voice profile — अगर user ने कोई नहीं दिए, kit उनके लिए पूछती है

---

## चार core artifacts

### 1. Sample-to-voice extractor (`templates/sample-to-voice.md`)

3-5 samples paste करें। एक structured voice profile वापस पाएं: voice-attribute matrix (चार axes), sentence-structure tendencies, vocabulary signatures, rhythm markers, और recurring framing devices। हर finding samples से एक specific line cite करता है।

### 2. Voice application prompt (`templates/voice-application.md`)

Saved profile + एक generic draft paste करें। एक rewrite वापस पाएं जो voice से match करे। एक self-check end पर — AI किसी भी line को flag करता है जिस पर इसे sure नहीं है कि on-brand test pass करती है।

### 3. Voice drift detector (`playbooks/voice-drift-detection.md`)

जब आप suspect करें कि AI output corporate default में वापस slip हो गया है। एक short rubric जो AI किसी भी draft पर चलाता है, हर section को on-voice / drift / off-voice के रूप में score करते हुए और उस exact phrase को point करते हुए जिसने call trigger की।

### 4. Voice profile खुद

Step 1 से deliverable। आप इस file को `voice-profile.md` के रूप में save करते हैं (या इसे एक project memory में paste करते हैं) और हमेशा के लिए reuse करते हैं। Format इस तरह designed है कि agle prompt में अपने रास्ते back पर machine-readable हो।

---

## Voice-attribute matrix

हर voice profile चार axes को 1 से 5 तक score करता है:

```
Formal       1 ——————— 5   Casual
Serious      1 ——————— 5   Playful
Direct       1 ——————— 5   Diplomatic
Technical    1 ——————— 5   Accessible
```

3 का score मतलब "इस axis पर बीच में lands करता है।" 1 या 5 का score मतलब "यह एक load-bearing trait है — कभी violate न करें।" AI को instruct किया गया है कि new copy पर voice apply करते समय 1s और 5s को heaviest weight करे।

एक worked output यूँ दिखता है:
- **Formal/Casual: 4** — contractions use करता है, punch के लिए articles drop करता है ("Built this for X"), पर कभी slangy नहीं
- **Serious/Playful: 2** — goofy के बजाय dry; few jokes understatement से land होते हैं, punchlines से नहीं
- **Direct/Diplomatic: 5** — ask से open करता है, कोई warm-up नहीं
- **Technical/Accessible: 3** — domain words use करता है पर same sentence में उन्हें define करता है

यही वह तरह की detail है जो एक profile useful बनाती है। "Authentic and bold" नहीं है।

---

## Prompt patterns

एक voice extract करते समय, input shape है:

```
[Samples]
3-5 writing samples paste करें जो वैसा sound करते हैं जैसा आप करना
चाहते हैं। हर एक को label करें (own LinkedIn post / customer-favored
blog intro / etc)।

[Context]
इस voice का output कौन पढ़ता है? (prospective B2B buyers / soccer
kids के parents / etc.)
यह आमतौर पर किस लिए है? (sales pages / weekly newsletter / cold
emails / सब कुछ)

[Constraints]
कुछ off-limits? (no swearing / no first person / कभी competitors को
name से mention न करें)
```

एक voice apply करते समय:

```
[Voice profile]
Saved profile paste करें।

[Draft]
Rough या generic copy paste करें जिसे आप rewrite करवाना चाहते हैं।

[Goal]
यह किस लिए है, और reader से desired action क्या है?
```

[Voice profile] block skip करना यूँ है कि आप generic AI output पाते हैं। Profile load-bearing piece है।

---

## Worked example: 3 paragraphs in, voice profile + rewrite out

**Input — तीन samples:**

> Sample 1 (LinkedIn): "Just finished the call. Hard pass. They wanted a 12-month engagement and won't say what success looks like. Saving you the same conversation: ask what success means before you ask what it costs."

> Sample 2 (newsletter intro): "Three weeks of silence. Sorry — was deep in the rewrite. Back now. Here's what changed."

> Sample 3 (landing-page hero): "You don't need another framework. You need to ship one thing this week. Here's the thing."

**Extracted profile:**
- Formal/Casual: **4** (contractions everywhere, punch के लिए fragments)
- Serious/Playful: **2** (no jokes, dry asides)
- Direct/Diplomatic: **5** (हर opener verdict से leads करता है)
- Technical/Accessible: **2** (zero jargon, second-person, short sentences)
- **Sentence structure:** average ~9 words। Two-beat openers का heavy use। Frequent sentence fragments।
- **Vocabulary signatures:** "hard pass," "ship," "here's the thing/what changed." Avoids: "leverage," "synergy," "stakeholder."
- **Framing device:** verdict-first। Reader के next move को उनके बनाने से पहले call करता है।
- **Anti-patterns to flag:** कोई sentence "In today's fast-paced..." से शुरू। कोई "transform," "unlock," "elevate" का use।

**Rewrite को generic draft:**
> "We are excited to announce the launch of our new platform designed to help busy founders streamline their daily operations through cutting-edge AI technology."

**Voice में rewritten:**
> "New thing live. It's for founders who waste their day on the same five admin tasks. Takes about a minute to set up. Here it is."

यही test है। अगर आप same generic draft को दोनों versions से run कर सकते हैं और अपनी gut में difference feel कर सकते हैं, profile काम कर रहा है।

---

## इस kit के बिना AI क्या गलत करता है

1. **यह LinkedIn voice की ओर average करता है।** हर output median LinkedIn post जैसा sound करता है — vaguely inspirational, vaguely authoritative, zero edge। Profile इसे block करता है AI को voice rubric के against हर line defend करने को बनाकर।
2. **यह three-act structure पर default करता है।** Generic AI को "First... Then... Finally..." पसंद है। ज़्यादातर distinctive voices उस तरह move नहीं करतीं। Profile actual sentence-structure tendencies capture करता है और default को override करता है।
3. **यह उन words use करता है जो आप कभी न कहें।** एक vocabulary signature के बिना, AI आपको "leverage," "elevate," "transform," और "best-in-class" देगा चाहे आप कितनी बार न कहें। Kit AI को samples से pulled एक explicit ban list (words जो user ने कभी use नहीं किए) और एक allow list (words जिनकी ओर वे repeatedly reach करते हैं) maintain करने को बनाती है।

---

## यह kit आपके लिए क्या NOT करेगी

- आपके samples से बेहतर copy लिखे। Voice extraction एक ceiling है, एक multiplier नहीं — अगर आपके samples mid हैं, rewrites mid होंगे।
- कुछ कहने को होने को replace करे। बिना point of view के एक voice eerie sound करती है। इस kit का use उस writing पर करें जिसमें पहले से opinions हों, filler पर नहीं।
- हर drift catch करे। ship करने से पहले किसी भी high-stakes asset (sales page, fundraise post, manifesto) पर drift detector को re-run करें।
- एक co-writer change survive करे। अगर एक अलग person अगली batch के drafts लिख रहा है, profile को उस person से new samples चाहिए accurate रहने के लिए।

---

## Companion docs

- `templates/sample-to-voice.md` — extractor prompt + profile-output schema
- `templates/voice-application.md` — एक saved profile को किसी भी draft पर apply
- `playbooks/voice-drift-detection.md` — off-voice AI output catch करने के लिए rubric
- `memory.md` — AI के लिए domain context: vocabulary, workflows, common mistakes
- `optimization-pack.md` — किसी भी chat AI के लिए self-contained system prompt
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formatted
- `quick-start.md` — 3-step setup
