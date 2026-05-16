# Re-Engagement Playbook

> Cold subscribers को sunset करने से पहले भेजने को 3-email sequence। Plus sunsetting के लिए honest case।

---

## यह क्यों matter करता है

एक cold subscriber — कोई जिसने आपसे एक email 90+ days में open नहीं किया — statistically gone है। वे शायद अभी भी alive हैं, वे शायद अभी भी vaguely याद रखते हैं कि subscribe किया, पर वे पढ़ नहीं रहे। और हर email जो आप उन्हें भेजते हैं वह तीन bad things करता है:

1. **आपका open rate drag down करता है।** Mailbox providers (Gmail, Outlook) sender-engagement signals use करके decide करते हैं कि आपके future emails inbox जाते हैं या spam। Cold subscribers आपके against silent votes हैं।
2. **Engaged readers के लिए deliverability hurt करता है।** जब आपकी sender reputation drop होती है, आपके engaged readers आपके emails Promotions या Spam में देखने लगते हैं। वे लोग जो actually आपका work चाहते हैं उनकी cost pay करते हैं जो नहीं चाहते।
3. **Vanity counts को inflate करता है।** 28% open rate पर 6,000-subscriber list — हर metric पर जो matter करता है — 50% पर 4,000-subscriber list से worse है। आप एक metric या दूसरे के लिए optimize करते हैं।

Sunsetting bad feel होती है। यह correct है। Re-engagement sequence इसे करने का polite way है: आप cold subscriber को वापस आने का एक real chance देते हैं, और अगर वे नहीं करते, आप उन्हें remove करते हैं।

---

## Sequence

तीन emails, 14 days total। Roughly:

- **Email 1 (Day 0):** soft return। "क्या आप अभी भी पढ़ रहे हैं?"
- **Email 2 (Day 7):** specific value। "यहाँ है जो आपने miss किया।"
- **Email 3 (Day 14):** honest sunset notice। "आपको remove करने से पहले last call।"

कोई भी जो तीनों में से एक open या click करे active में वापस move हो जाता है। कोई भी जो उनमें से कोई नहीं open करे Day 17 पर unsubscribe हो जाता है।

---

## Email 1 — Soft return (Day 0)

### Prompt

```
आप cold subscribers के लिए एक 3-email re-engagement sequence में पहला
email लिख रहे हैं। Rules:

1. Subject line: direct, slightly self-aware। "We miss you!" नहीं।
2. Body: 100-130 words। Acknowledge करें कि वे पढ़ नहीं रहे हैं। उन्हें
   guilt NOT करें। एक real choice offer करें।
3. एक specific link: या तो latest issue को या एक representative issue
   को (writer का "if you only read one" pick)।
4. Sign off करें: "अगर आप ये नहीं पाना चाहते, यह भी fine है — 'no'
   reply करें और मैं आपको list से ले लूँगा।" Honestly easy बनाएं कहना
   no।
5. Voice: personal, warm, desperate नहीं। Writer offer कर रहा है, beg
   नहीं कर रहा।

Subject line + body output करें। कोई commentary नहीं।
```

### Worked example

```
Subject: Still reading?

Hi —

मैंने notice किया कि आपने पिछले कुछ months में newsletter open नहीं
की है। Inboxes noisy हैं और यह fine है; मैं बस make sure करना चाहता
हूँ कि मैं किसी ऐसे को नहीं भेज रहा जो मुझसे बल्कि सुनना नहीं चाहता।

अगर आप अभी भी interested हैं, यहाँ most recent issue है जो मुझे लगता
है आपके समय के लायक है: <link>

अगर आप ये नहीं पाना चाहते, यह भी fine है — "no" reply करें और मैं
आपको list से ले लूँगा। कोई hard feelings नहीं।

— Alex

P.S. किसी भी तरह, original subscribe के लिए thanks। जब आपने sign up
किया तो इसका मतलब था।
```

यह क्या करता है:

- Subject line direct है। Cute नहीं। Desperate नहीं।
- Actual signal ("haven't opened in a few months") के साथ खुलता है — honest, accusatory नहीं।
- Single CTA: latest पढ़ें, या no reply करें।
- नीचे easy out। Reader को unsubscribe link find नहीं करना है।
- P.S. real है, manipulative नहीं। Writer mean करता है।

Expected response: 5-15% cold subscribers इसे open करेंगे। उनमें से लगभग आधे click through करेंगे। एक small fraction "no" reply करेगा। बाकी list पर रहते हैं, next email का wait करते हुए।

---

## Email 2 — Specific value (Day 7)

जिन्होंने Email 1 open नहीं किया उनके लिए, AI assume करता है कि subject line miss हुई। एक different angle try करें।

### Prompt

```
आप एक 3-email re-engagement sequence में दूसरा email लिख रहे हैं।
Recipient ने 7 days पहले पहला email NOT open किया। Rules:

1. Email 1 से different subject line angle। अगर Email 1 direct था
   ("Still reading?"), यह curiosity या value-led है ("3 things you
   missed since <month>")।
2. Body: 130-180 words। 2-3 specific things name करें जो उन्होंने
   miss किए हैं — most popular issues, most useful piece, या पिछले
   90 days से most controversial take।
3. एक CTA: named issues में से एक पढ़ें।
4. Same "if you'd rather not, reply no" closer।
5. Voice: अभी भी warm, अभी भी desperate नहीं। Slightly more specific।

Subject line + body output करें। कोई commentary नहीं।
```

### Worked example

```
Subject: Three things you missed since February

Hi —

आपने newsletter काफी समय से open नहीं की है, पर मुझे लगता है हाल के
कुछ land हो सकते हैं अगर आप उन्हें देखें। यहाँ तीन हैं जो especially
well हुए हैं:

1. "The first 100 readers don't come from Twitter" — सबसे ज़्यादा
   forwarded issue जो मैंने कभी लिखा। Reply rate मेरे average का 7x था।

2. "What I cut from last month's issue" — killing your darlings के
   बारे में एक piece। कुछ readers ने मुझे बताया कि इसने उन्हें edit
   करने का तरीका बदल दिया।

3. "The math of newsletter growth at 1,400 subscribers" — एक sober
   look इस size पर actually pay करने वाले tactics पर।

अगर इनमें से कोई interesting sounds करे, यहाँ links हैं: <link 1>,
<link 2>, <link 3>।

अगर नहीं — totally fair। "no" reply करें और मैं आपको list से ले लूँगा।

— Alex
```

यह क्या करता है:

- Subject line curiosity-driven है, Email 1 से different angle।
- तीन specific issues को हर एक के लिए एक one-line reason के साथ name करता है। दिखाता है कि writer real work कर रहा है, सिर्फ email नहीं कर रहा।
- तीन CTAs provide करता है — reader picks। More choice अक्सर re-engagement में एक click को हराती है।
- Same easy "reply no" out।

Expected response: एक और 3-8% cold subscribers इसे open करते हैं। Email 1 के साथ combined, आपने अब cold cohort के roughly 10-20% तक पहुँच लिया है। बाकी statistically lost हैं।

---

## Email 3 — Honest sunset notice (Day 14)

यह matters है। यह एकमात्र re-engagement email है जहाँ writer direct है इसके बारे में कि क्या होने वाला है।

### Prompt

```
आप एक 3-email re-engagement sequence में तीसरा और final email लिख
रहे हैं। Recipient ने prior दो में से कोई NOT open किया। Rules:

1. Subject line: explicit। "I'm about to take you off the list."
   Reader का brain इसे एक normal subject line से different register
   करता है और open करने को more likely होता है।
2. Body: 80-120 words। Short। Honest। Unsubscribe होने की date name करें।
3. एक CTA: "Stay subscribed" को एक single link या button — link पर
   click करना या किसी भी चीज़ से reply करना उन्हें list पर रखता है।
4. कोई guilt नहीं। कोई "we'll miss you" नहीं। कोई ALL CAPS या "LAST
   CHANCE!!!" नहीं।
5. Voice: calm, clear, mildly self-aware। Writer list hygiene कर रहा
   है, break up नहीं कर रहा।

Subject line + body output करें। कोई commentary नहीं।
```

### Worked example

```
Subject: I'm about to take you off the list

Hi —

यह तीसरा email है जो मैंने भेजा है और आपने उनमें से कोई open नहीं
किया, तो मैं polite thing कर रहा हूँ और [Date, ~3 days from now] पर
आपको list से remove कर रहा हूँ।

अगर आप subscribed रहना चाहते हैं, confirm करने को यहाँ click करें:
<Stay subscribed>

अगर आप click नहीं करते — totally fair। मैं actually पढ़ने वाले लोगों
की एक smaller list rather रखूँगा एक bigger list की तुलना में जो नहीं।

किसी भी तरह original signup के लिए thanks।

— Alex
```

यह क्या करता है:

- Subject line एक तरीके से direct है जिस तरह email subject lines शायद ही होते हैं। इस email पर open rates Email 2 के rates के 2-3x हैं।
- Body short है। Action (removal) और date name करता है।
- एक CTA: stay करने को confirm।
- Philosophical reason के साथ closes — writer engagement चाहता है, vanity नहीं।
- कोई begging, कोई guilt, कोई manipulation नहीं।

Expected response: cold cohort का 5-10% इसे open करता है। उनमें से, एक meaningful fraction "Stay subscribed" click करती है। जो नहीं करते वे promised date पर unsubscribe हो जाते हैं।

---

## Day 17 पर क्या करें

जो cold subscribers ने तीनों emails में से कोई नहीं open किया वे unsubscribe हो जाते हैं। ज़्यादातर platforms (Substack, Beehiiv, ConvertKit) के पास "last X emails में open नहीं किया" से filter करने और bulk-unsubscribe करने का तरीका है।

यह वह part है जो bad feel होती है। फिर भी करें।

Sunset के बाद:

- आपका list count drops होता है।
- आपका open rate significantly jump होता है। (Common outcome: एक cycle में 32% → 47%।)
- अगले 4-8 weeks पर आपकी deliverability improve होती है।
- Engaged readers — जिनके लिए आपने actually लिखा — आपके emails inbox में more reliably देखने लगते हैं।

Cold subscribers engaged readers की deliverability की cost थे। Sunsetting उसे fix करती है।

---

## इसे कितनी बार चलाएं

ज़्यादातर newsletter writers के लिए: per quarter एक बार काफी है। कुछ platforms इसे automatically चलाते हैं अगर आप इसे on करें।

इससे अधिक बार न चलाएं:

- Re-engagement sequences writer के लिए emotionally heavy हैं। Monthly उन्हें चलाना exhausting है और engagement-curve math उतनी fast नहीं बदलती।
- एक subscriber जो week 10 में lapsed हुआ और week 13 में re-engaged वह really cold नहीं है — वे बस sometimes-irregular हैं। Engagement curve को play out होने का time दें।

Per quarter एक बार rhythm है।

---

## यह playbook क्या NOT करेगी

- एक healthy welcome sequence replace करे। पहले 30 days में कभी engage न होने वाले new subscribers एक different problem हैं — welcome flow fix करें, re-engagement sequence नहीं।
- Bad acquisition वाली list बचाए। अगर आपने subscribers buy किए या उन्हें एक misleading lead magnet से जीता, कोई re-engagement sequence mismatch fix नहीं करेगी। आप उन लोगों को re-engage कर रहे होंगे जो शुरू में fit नहीं थे।
- अपनी audience जानना replace करे। Re-engagement copy काम करती है जब value proposition real हो। अगर writer unclear है कि newsletter क्या है, cold subscriber rightly cold रहेगा।

Re-engagement sequence list hygiene के लिए एक tool है, ऐसी writing के लिए substitute नहीं जिसे readers open करते रहना चाहें।
