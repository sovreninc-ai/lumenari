# Issue Outliner + Intro Hook Generator

> एक topic को 5-section structure में बदलें, और पहली दो lines लिखें जो reader को preview pane के परे pull करें।

---

## Part 1 — Issue outliner

### Shape

```
1. HOOK (lines 1-2)
   Email की पहली दो lines। Reader को preview pane के परे pull करता है।
   पाँच patterns में से ONE: curiosity, contrarian, story, stat, question।

2. SETUP (~150-200 words)
   Reader को context चाहिए। तीन short paragraphs। उनके बीच white space।
   Stakes establish करता है — यह हफ्ता क्यों matter करता है।

3. MIDDLE (~400-600 words)
   Actual idea। 2-3 worked examples या stories। Specific names, specific
   numbers, specific moments। यह issue का body है।

4. REFRAME (~100-150 words)
   इसके साथ क्या करें। या इसके बारे में क्या सोचें। या अब क्या different
   है। एक specific next step जो reader ले सकता है।

5. SIGN-OFF (~30-50 words)
   Short। Warm पर gushing नहीं। एक clear call to action या कोई नहीं।
   "Hit reply" काम करता है। "Smash that subscribe button" नहीं।
```

Total: roughly 800-1,000 words। Right length जो भी idea को चाहिए। एक number hit करने के लिए pad न करें।

### Prompt

```
आप एक newsletter issue outline कर रहे हैं। Rules:

1. 5-section shape use करें: Hook → Setup → Middle → Reframe → Sign-off।
2. Hook दो lines max है। ONE pick करें: curiosity, contrarian, story,
   stat, question। Multiple propose न करें — एक pick करें जो topic
   को fit करे।
3. Setup stakes देता है — यह idea इस हफ्ते क्यों matter करता है।
4. Middle में 2-3 worked examples। अगर मैंने आपको examples नहीं दिए,
   drafting से पहले पूछें।
5. Reframe एक specific next step से end होता है। "इस पर reflect करें"
   एक next step नहीं है। "अपना last issue खोलें और वह line find करें
   जहाँ आपने padding शुरू की" एक next step है।
6. Sign-off short है। कोई "smash that subscribe button" नहीं। कोई
   "share this with someone who needs it" नहीं।

Voice: specific, personal, slightly informal। Short paragraphs।
White space। Active verbs।

सिर्फ outline output करें। Section headers + per section guidance की
2-4 lines। कोई commentary नहीं जब तक मैं न पूछूँ।
```

### Input shape

```
[The newsletter]
Name + positioning
Subscriber count
Average issue length

[यह issue]
Topic / working title
Reader क्या walk away करता है
Use को specific examples, quotes, या data
Tone (rant / contemplative / how-to / list / story)

[Constraints]
- Word count
- Avoid करने को things
```

### Worked example

**Input:**

```
[The newsletter]
"Going Past 100" — new newsletter writers के लिए weekly
Subscribers: 1,400
Avg length: 1,000 words

[यह issue]
Topic: how to find your first 100 readers
Walk-away: कि first 100 social से नहीं आते — वे ऐसे specific लोगों को
DMs से आते हैं जो writer पर पहले से trust करते हैं।
Use को Examples:
- Sarah के पहले 80 friends और ex-coworkers को 30 direct emails से आए
- मेरे खुद के पहले 50 लोगों को मैंने worked together था उन्हें 12 DMs से आए
- Contrast: एक friend जिसने Twitter पर launch किया उसे 200 follows
  और 8 newsletter signups मिले
Tone: direct, slightly contrarian
Constraints: 900 words, no "leverage" or "audience-building"
```

**Output:**

```
1. HOOK (contrarian)
   "Everyone says you should build in public to grow a newsletter.
   For your first hundred readers, that's mostly wrong."
   - पहली line में contrarian claim land करता है।
   - दूसरी line specific case name करती है जो यह argue करेगा।

2. SETUP (~150 words)
   तीन short paragraphs:
   - Mythology: launch day, Twitter momentum, viral first issue।
   - ज़्यादातर writers के लिए reality: launch day आपको 12 signups देता
     है, जिसमें से आधे कभी दूसरा issue open नहीं करते।
   - Reframe: first 100 next-1,000 से एक different problem है। Social
     next-1,000 problem है। First 100 एक trust problem है।

3. MIDDLE (~500 words)
   Strength के order में तीन worked examples:
   a) Sarah का launch: friends और ex-coworkers को 30 direct emails
      → 80 subscribers। Specifics: उसने एक one-line "यह क्या है और
      मुझे क्यों लगता है आपको पसंद आएगा" include की। 30 में से 26 ने
      email open की। 30 में से 22 ने subscribe किया।
   b) मेरा खुद का launch: past projects पर मैंने worked together लोगों को
      12 DMs। Specifics: मैंने हर person से पूछा क्या वे इसे देखना
      चाहते हैं, उन्हें sign up नहीं किया। 10 ने yes कहा, 8 stuck हुए।
   c) Contrast: एक friend जिसने Twitter पर launch किया। पहले हफ्ते में
      200 follows, 8 newsletter signups, issue 2 के बाद आधे unsubscribed।
      Trust के बिना reach noise है।

4. REFRAME (~120 words)
   इसके साथ क्या करें:
   - अपने contacts खोलें। 30 लोगों की list बनाएं जो आपको इतना अच्छा
     जानते हैं कि आपका email unwelcome नहीं।
   - हर एक के लिए, एक sentence लिखें कि आपको क्यों लगता है उन्हें
     newsletter पसंद आएगा। हर person के लिए different sentence।
   - आज 5 भेजें। पूरी list 10 दिनों में।
   - लोगों को sign up न करें। पूछें। उन्हें yes कहने दें।

   एक specific next step: "Tonight अपना laptop close करने से पहले
   पहले पाँच DMs भेजें।"

5. SIGN-OFF (~40 words)
   "अगर आपने यह किया है और काम किया — या नहीं — reply करें और मुझे
   बताएं। मैं हर एक पढ़ता हूँ। — A"
   - Reply CTA एक small list के लिए right move है। Reply rate
     engagement का एक leading indicator है और किसी अन्य signal की
     तुलना में paid में बेहतर convert होता है।
```

यह outline क्या करता है:

- Hook एक pattern (contrarian) है, पाँच competing options नहीं।
- Setup में explicit paragraph beats अपने jobs के साथ हैं।
- Middle user द्वारा दिए तीन examples के around structured है, strength के order में।
- Reframe एक concrete next step से end होता है जो reader tonight कर सकता है।
- Sign-off एक reply CTA use करता है, जिसे AI proactively justify करता है।

Writer यह outline लेता है और issue लिखता है। AI ने issue नहीं लिखा। यही point है।

---

## Part 2 — Intro hook generator

### पहली दो lines क्यों matter करती हैं

Gmail और ज़्यादातर email clients में, reader देखता है:

```
[Sender name]
[Subject line]
[Email body के पहले ~80 characters]
```

वे तीनों things open करने का पूरा decision हैं। Subject line alone काफी नहीं है। Email की पहली दो lines preview pane में show होती हैं, और वे decide करती हैं कि open एक read में बदलता है या नहीं।

अगर आपने कभी एक newsletter open की और तुरंत close की, पहली दो lines fail हुईं।

### पाँच hook patterns, examples के साथ

**1. Curiosity**
> "I almost didn't send this issue."

> "There's a line I cut from last week's piece that I keep thinking about."

> "I got an email yesterday I'm not sure how to answer."

Pattern: एक story या एक tension hint करें। Reader को resolution चाहिए बनाएं।

**2. Contrarian**
> "Everyone says you should write what you know. I think that's wrong for the first six months."

> "Build-in-public works. But not the way you think."

> "I unsubscribed from 14 newsletters this weekend. Here's the pattern."

Pattern: common wisdom के एक piece को invert या complicate करें। Reader को आगे पढ़ना है यह देखने को कि क्या आपने contradiction earn किया।

**3. Story**
> "Last Tuesday a reader emailed me to ask why I'd unsubscribed her. I hadn't. Substack had."

> "On Sunday I sat down to write this issue and ended up writing a different one."

> "Two months ago a writer I admire DM'd me with a question I couldn't answer."

Pattern: एक specific moment, एक specific person, एक specific time। Stories readers को pull करती हैं क्योंकि stories यूँ humans attention pay करते हैं।

**4. Stat**
> "Forty-eight percent of newsletter writers stop in the first three months. I almost did at month four."

> "On average, this newsletter gets one reply for every 87 reads."

> "Last quarter, 60% of my new subscribers came from one source. It's not the one you'd guess."

Pattern: एक personal frame के साथ एक number। Numbers authority create करते हैं; personal frame इसे human रखता है।

**5. Question**
> "What's the smallest thing you could ship this week that would teach you something?"

> "When was the last time you wrote something you weren't sure was good?"

> "Who do you imagine when you write?"

Pattern: एक question जिसे reader आसानी से answer नहीं कर सकते, जो कुछ name करे जो वे सोच रहे हैं। Contemplative issues के लिए best काम करता है।

### Prompt

```
आप एक newsletter issue की पहली दो lines लिख रहे हैं। Rules:

1. पाँच hook patterns में से ONE pick करें: curiosity, contrarian,
   story, stat, question। सभी पाँच propose न करें — एक pick करें जो
   issue को fit करे।
2. दो lines maximum। Counts: line one roughly subject-line length है;
   line two एक short sentence है।
3. Specific। एक real moment, एक real person, एक real number, conventional
   wisdom का एक real piece।
4. कोई "Hi friends, hope you're well" नहीं। कोई "Welcome back to
   <newsletter>" नहीं। कोई "Today I want to talk about X" नहीं।
5. दूसरी line पहली line को make sense बनानी चाहिए, OR पहली line ने जो
   tension खोला उसे escalate करना चाहिए।

Voice: personal, specific, slightly informal। Active verbs।

दो lines और कौन सा pattern use किया output करें। कोई commentary नहीं
जब तक मैं न पूछूँ।
```

### Worked example

**Input:**

```
Issue topic: how to find your first 100 readers
Tone: direct, slightly contrarian
Walk-away: first 100 आपको trust करने वाले लोगों को DMs से आते हैं,
social से नहीं।
```

**Output:**

```
Pattern: Contrarian

"Everyone says you should build in public to grow a newsletter. For
your first hundred readers, that's mostly wrong.

The move isn't a launch tweet. It's twelve DMs."

यह क्यों काम करता है:
- Line 1 wisdom name करती है और एक breath में invert करती है।
- Line 2 escalate करती है: specific number (12), specific channel (DMs)।
- साथ में वे promise करते हैं कि issue कहेगा क्या करें, सिर्फ यह नहीं
  कि conventional approach में क्या गलत है।
```

### कौन सा pattern कब use करें

- **Curiosity** — जब issue में एक story या एक personal reveal हो। Personal essays के लिए default।
- **Contrarian** — जब issue conventional wisdom के against argue करे। Opinionated takes के लिए best।
- **Story** — जब issue एक specific incident से start करे। Narrative-shaped issues के लिए best।
- **Stat** — जब आपके पास एक real number हो जो land करे। Data-driven issues के लिए best।
- **Question** — जब issue contemplative हो और आप reader को आपके साथ सोचने चाहें। Sparingly use करें; questions flat land हो सकते हैं अगर issue का rest उन्हें honor न करे।

AI एक pick करता है और commit करता है। अगर user एक different pattern देखना चाहता है, वे explicitly पूछते हैं।

---

## कब outline skip करें

आपको हर issue outline करने की ज़रूरत नहीं। Outline skip करें जब:

- आप पहले से जानते हैं क्या लिख रहे हैं और issue 500 words के नीचे है।
- Issue एक specific reader email या current event का response है — over-think करने से पहले लिखें।
- आप writing flow में हैं और outline इसे interrupt करेगा।

कब definitely outline करें:

- 1,200 words से ऊपर के Issues।
- ऐसे Issues जिन पर आप एक हफ्ते से अधिक से procrastinate कर रहे।
- ऐसे Issues जो आप भेजने से nervous हैं।
- कुछ भी जहाँ topic format से bigger feel हो।

Outline एक contract नहीं है; यह एक thinking tool है। एक बार आपके पास हो, आप इससे freely deviate कर सकते हैं। Point है यह जानना कि आप क्या करने की कोशिश कर रहे हैं drafting start करने से पहले।
