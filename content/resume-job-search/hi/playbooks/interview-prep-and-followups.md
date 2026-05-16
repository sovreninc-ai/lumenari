# Interview Prep + Follow-Ups

> STAR / behavioral / technical interview prep, plus तीन follow-up emails जो हर job search को चाहिए: thank-you, post-rejection, और ghost-recovery।

---

## Part 1 — Behavioral interview prep (STAR)

### STAR actually practice में कैसे काम करता है

ज़्यादातर लोग STAR को 80% answer Situation और Task पर बिता कर गलत करते हैं। Interviewer setup के बारे में care नहीं करता। वे care करते हैं *आपने* क्या किया और क्या हुआ।

Right ratio:

- **Situation (10%)**: एक sentence। "Acme में, हम लगभग 12% सभी events पर webhook retry failures देख रहे थे।"
- **Task (10%)**: एक sentence। "मैं उस quarter on-call engineer था और failures मुझे हफ्ते में दो रातें जगा रहे थे।"
- **Action (60%)**: Specific steps *आपने* लिए। First person "I," "we" नहीं। यह meat है।
- **Result (20%)**: Numbers अगर आपके पास हों। Outcome — team, customer, business के लिए।

अगर आप दो बार से अधिक "we" कहते हैं, interviewer को नहीं पता आपने क्या किया। "I" use करें। जब work genuinely collaborative था, "I led" या "I owned the X piece while two engineers handled Y" कहें।

### Prep prompt

```
आप मेरी STAR format में behavioral interview answers prep करने में help कर रहे हैं।
मैं आपको एक question दूँगा और rough story जो मैं बताना चाहता हूँ। आप
~200 words में एक tight STAR answer produce करेंगे।

Rules:
1. Situation: 1 sentence max।
2. Task: 1 sentence max।
3. Action: answer का 60%। First-person "I"। अगर work collaborative था,
   name करें क्या मैंने specifically own किया vs। दूसरों ने क्या किया।
4. Result: एक number या एक concrete outcome से end करें। अगर मेरे पास
   एक number नहीं है, invent करने से पहले मुझसे पूछें।
5. ~200 words। 90-120 seconds में out loud cleanly पढ़े।
6. कोई buzzwords नहीं (passionate, results-driven, dynamic)। कोई filler नहीं।

Answer produce करने के बाद, मुझसे एक follow-up question पूछें जो
interviewer सबसे likely पूछेगा। मेरे answer को एक brief tail suggest करें
जो इसे preemptively address करे अगर useful।
```

### 6-8 stories जो आपके पास ready होनी चाहिए

किसी भी onsite से पहले, 6-8 stories prep करें जिन्हें आप different questions में flex कर सकें। ज़्यादातर behavioral questions इन themes पर variations हैं:

1. एक time जब आपने कुछ lead किया
2. एक time जब आपने एक peer या manager से disagree किया
3. एक time जब आप fail हुए
4. एक time जब आपको fast सीखना पड़ा
5. एक time जब आपको एक hard tradeoff बनाना पड़ा
6. एक time जब आपने किसी को mentor या develop किया
7. एक time जब आपने pressure में deliver किया
8. एक time जब आपने एक stakeholder पर push back किया

हर एक के लिए, 3-4 sentences context plus outcome लिखें। आप scripts memorize नहीं कर रहे — आप raw material prep कर रहे हैं ताकि AI moment में सही answer में shape कर सके।

### Worked example

**Question:** "मुझे एक time के बारे में बताएं जब आपने अपने manager से disagree किया।"

**AI को user का raw input:**

```
Acme में, मेरा manager 4 weeks में बिना feature flag के new payments
feature ship करना चाहता था क्योंकि customer wait कर रहा था। मुझे लगा
यह bad call थी — हमने कभी payments को flag के बिना ship नहीं किया था
और customer एक extra week notice नहीं करेगा। मैंने push back किया,
flag add की, और feature 2 weeks में roll out की। हमने week 1 में एक
bug catch किया जो 100% पर ship करने पर ~$80k cost करता।
```

**AI जो STAR answer produce करता है:**

```
Acme में, मेरे manager ने एक new payments feature को चार weeks में बिना
feature flag के ship करने को push किया क्योंकि एक key customer wait
कर रहा था।

मैं deploy own कर रहा था और disagree किया — हमने कभी payments change
को flag के बिना ship नहीं किया था, और मुझे नहीं लगा कि customer एक
extra week feel करेगा।

मैंने runbook pull किया और risk write up किया: 100% rollout पर कोई bug
हर customer को hit करता है, और payments में हमारा average revenue-impact
incident around $80k था। मैंने feature को flag करने और इसे 5% से 25%
से 100% तक दो हफ्तों में roll करने को propose किया। मेरे manager ने
timeline pressure पर दो बार push back किया, पर मैंने architecture पर
line hold की और customer call खुद लेने को offer किया rollout plan
explain करने के लिए। हमने flag add की।

Week one पर 25% पर, हमने एक webhook retry bug catch किया जो full
rollout पर duplicate charges fire करता। Estimated cost avoided: roughly
$80k। Customer feature को original date पर मिला क्योंकि हमने rollout
को build के parallel plan किया था। मेरा manager और मैं उसके बाद हर
payments deploy को default-flag करने लगे।

(Likely follow-up: "आपने अपने manager के pushback को कैसे handle किया?"
— मैं एक sentence add करूँगा: मैंने पूछा वे क्या optimize कर रहे हैं,
customer के साथ इस पर explicitly agree किया, फिर writing में architectural
case बनाई ताकि हम opinion के बजाय data पर disagree कर सकें।)
```

यह 220 words है, लगभग 100 seconds में पढ़ती है, और judgment, ownership, communication, और outcome दिखाती है। Follow-up suggestion bonus है — AI flag करता है कहाँ interviewer dig करने को likely है और आपको एक pre-built response देता है।

---

## Part 2 — Technical interview prep

### AI किस में अच्छा है

- Algorithm problems pattern-match करना और solution shape explain करना।
- Standard rubric (functional requirements, non-functional, API, data model, scale, bottlenecks, tradeoffs) के साथ system-design problems के through walk करना।
- Debugging या code-reading questions पर आपका mock-interview लेना।
- "अगर X तो आप क्या करेंगे" follow-ups generate करना ताकि आप room में surprise न हों।

### AI किस में bad है

- Actual practice replace करना। आपको code लिखना या design खुद whiteboard करना पड़ता है। AI का solution पढ़ना pressure में produce करने जैसा नहीं।
- Predict करना कि *आपका* interviewer क्या पूछेगा। AI average simulate कर सकता है; actual room अपनी thing होगी।

### Useful prompt patterns

**System design के लिए:**

```
मेरा कल <company> पर एक system design interview है। Role है <senior
backend>। मुझे walk करें कैसे आप 45 minutes इस problem पर structure
करेंगे: "एक Stripe-like platform के लिए एक webhook delivery system
design करें।"

फिर मुझसे 3 questions पूछें उन design choices के बारे में जिन्हें मैं
defend करने को prepared रहना चाहूँगा।
```

**Algorithms के लिए:**

```
मैं dynamic programming पर rusty हूँ। मुझे 3 medium-difficulty DP problems
दें हर एक के साथ एक-line hint। अभी solutions मत दिखाएं। मैं उनकी
कोशिश करूँगा और वापस आऊँगा।
```

**Mock interviews के लिए:**

```
आप एक senior engineer हैं मेरा backend role के लिए interview ले रहे।
मुझसे एक debugging question पूछें। मेरे respond करने के बाद, interviewer
की तरह follow-ups पूछें। मुझे help मत करें — मुझे push करें। अंत में
मुझे बताएं मेरा answer कैसा land होता।
```

"Push me, don't help me" line matters है। AI nice होने पर default करता है। आप mock में nice नहीं चाहते; आप वे questions चाहते हैं जो actual interviewer पूछेगा।

---

## Part 3 — तीन follow-up emails

### Email 1 — Post-interview thank-you (24 hours के अंदर भेजें)

**Prompt:**

```
एक job interview के बाद एक 100-130 word thank-you email लिखें। Rules:

1. एक specific thing reference करें जो interviewer ने कहा। एक generic
   "thanks for your time" नहीं।
2. मेरे fit के बारे में एक thing briefly reinforce करें — conversation
   से strongest signal pick करें।
3. Follow-up questions के लिए door open करें। Role के लिए beg मत करें।
4. Sign-off professional है, eager नहीं।
5. Subject line: "Thanks — <मेरा नाम> / <role>"

मैं दूँगा: interviewer का नाम, role, एक specific thing जो उन्होंने कही,
और एक thing मैं reinforce करना चाहता हूँ।
```

**Worked example:**

```
Subject: Thanks — Alex / Senior Backend Engineer

Maya,

आज की conversation के लिए thanks। Webhook ordering के बारे में आप कैसे
सोच रहे हैं जब retries out of sequence आती हैं वह bit मुझ पर stuck है
— वह एक problem है जिस पर मैंने probably healthy से ज़्यादा time
बिताया है, और sounds like आप इसे उसी तरह approach कर रहे हैं जैसे हमने
Acme पर किया।

अगर team को help करे, मैं उस specific retry-ordering decision tree के
through walk करने को happy हूँ जो मैंने पिछले साल write up किया था —
यह उस तरह की चीज़ है type out करने के बजाय live share करना easier।
किसी भी तरह, glad हम बात कर पाए। Hope loop का rest smoothly जाए।

— Alex
```

हर interviewer को एक भेजें जिसके लिए आपके पास email है, हर person के लिए individualized। Same email word-for-word reuse करना fine है अगर सिर्फ specific reference बदले — पर specific reference को बदलना ज़रूरी है।

### Email 2 — Post-rejection (no के 48 hours के अंदर भेजें)

यह matter करता है। ज़्यादातर लोग इसे नहीं भेजते। जो भेजते हैं उन्हें warm intros और "we'd love to keep you in mind" follow-ups months बाद मिलते हैं जब सही role open हो।

**Prompt:**

```
एक job rejection का 80-100 word gracious response लिखें। Rules:

1. Time और decision के लिए उन्हें thanks। कोई bitterness नहीं।
2. Outcome acknowledge करें बिना interview rehash किए।
3. Door open छोड़ें: in touch रहने को ask करें, mention करें कि आप
   future में सही role के लिए open होंगे।
4. Optional: एक piece of feedback के लिए ask करें। Direct हों ("अगर
   आपके पास एक specific bit of feedback के लिए पाँच minutes हों") —
   vague asks ("any feedback would be appreciated") vague answers
   पाते हैं।
```

**Worked example:**

```
Maya,

बताने के लिए, और इस loop पर team के time के लिए thanks। Conversations
genuinely इस search में मेरे पास से कुछ better थीं — आप कहाँ landed
उसके बारे में honesty की appreciate करता हूँ।

अगर इस साल बाद में payments में एक senior backend role open हो, मैं
आपकी list पर होने को welcome करूँगा। और अगर आपके पास एक specific bit
of feedback के लिए पाँच minutes हों कि क्या tipped it the other way,
मैं इसे useful पाऊँगा।

Best,
Alex
```

One-specific-bit-of-feedback ask roughly 40% बार answer होता है जब इस तरह phrased हो। Generic "any feedback" 5% answer होता है।

### Email 3 — Ghost recovery (जब आपने 14 दिनों के लिए कुछ नहीं सुना)

दो stages। Day 7 एक light ping है। Day 14 एक real follow-up है।

**Day 7 (light ping):**

```
Maya,

[date] पर हमने जिस senior backend role के बारे में बात की उस पर check
in करना चाहता था। कुछ और share करने को happy जो help करे।

— Alex
```

बस यही। तीन lines। Filler add मत करें।

**Day 14 (real follow-up):**

```
Subject: Quick follow-up — Senior Backend / Lumenari

Maya,

[date] पर senior backend role के बारे में हमारी conversation पर follow
up। मुझे पता है loops सभी तरह के reasons के लिए slow होते हैं जिनका
candidate से कोई संबंध नहीं, तो किसी भी तरह pressure नहीं — बस check
कर रहा हूँ क्या role अभी भी open है और मैं कहाँ stand करता हूँ।

अगर आपके end पर timing shift हो गई है, मैं जानना rather रखूँगा बजाय
नहीं। और अगर answer no है, यह fine है; मैं अपनी search plan करने के
लिए closure की appreciate करूँगा।

— Alex
```

अगर आपको day-14 email के एक week के अंदर back नहीं सुना, lost mark करें और आगे बढ़ें। तीसरा follow-up मत भेजें। Signal काफी clear है।

---

## Search track करना

एक simple tracker elaborate ones को हराता है। पाँच columns:

| Company | Role | Applied | Stage | Last contact |
|---------|------|---------|-------|--------------|
| Lumenari Co | Sr Backend Eng | 2026-05-01 | Onsite scheduled | 2026-05-12 |
| Beta Co | Staff Eng | 2026-05-03 | Recruiter screen | 2026-05-08 |
| Gamma Co | Sr Backend Eng | 2026-04-25 | Ghosted (day 14 sent) | 2026-05-09 |

हर interaction के बाद update करें। इसके बिना, search का week six एक fog बन जाता है।

---

## यह playbook क्या नहीं करेगी

- आपके लिए एक script memorize करना। Answers out loud practice करें। AI words shape कर सकता है; आपके mouth को उन्हें जानना है।
- आपको बताए कि क्या offer लें। यह एक values question है। एक list बनाएं क्या matter करता है और weight करें। AI list बनाने में help कर सकता है; call नहीं ले सकता।
- Compensation negotiation cover करें। यह एक separate playbook है और यहाँ गलत tool expensive होगा। अभी के लिए: call पर कभी accept मत करें, 24-48 hours लें, market data पर anchored एक ask के साथ counter करें।
