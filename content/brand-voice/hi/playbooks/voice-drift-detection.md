# Voice Drift Detection

जब आप suspect करें कि AI output corporate default में वापस slide हो गया है। Live जाने से पहले किसी भी draft पर इसे run करें — खासकर sales pages, fundraise posts, manifestos, launch announcements।

---

## Prompt

```
आप एक saved profile के against voice drift के लिए एक draft audit कर
रहे हैं। Rules:

1. Draft को profile rubric से compare करें। Charitable न हों। Drift
   excuse करने से अधिक flag करना useful है।
2. हर paragraph (या हर block — section header, bullet list, CTA) को
   score करें: on-voice / drift / off-voice।
3. हर drift या off-voice call के लिए, exact phrase quote करें जिसने
   call trigger की और name करें कौन सी voice rule violate हुई।
4. एक "fix priority" से end करें — कौन सी 2-3 things पहले fix होने से
   voice consistency सबसे improve करेंगी।

Output format:

## Section-by-section
- [Section 1 label]: on-voice / drift / off-voice
  - Trigger: "[quoted phrase]" — [rule] violates
- [Section 2 label]: on-voice / drift / off-voice
  - Trigger: "[quoted phrase]" — [rule] violates
- ...

## Overall drift score: X/10
(10 = perfectly on-voice; 0 = unrecognizable)

## Fix priority (top 3)
1. [Example के साथ specific change]
2. [Example के साथ specific change]
3. [Example के साथ specific change]

Profile और draft follow।
```

---

## आपका input

```
[Voice profile]
[full saved profile paste करें]

[Draft]
[full draft paste करें जिसे आप audited चाहते हैं]
```

---

## देखने को drift signals

**Banned-word smuggling।** सबसे common drift। AI जानता है यह "leverage" use नहीं कर सकता — तो यह "harness" या "tap into" या "unlock" लिखता है। Same semantic shape, different word। Rule: अगर एक sentence same thing means करती है जो एक banned word means करता, यह अभी भी drift है।

**Sentence-length creep।** Voice 9 words average करती है। Draft के halfway, sentences 18 words हैं और climbing। यह AI "smooth" prose पर वापस default कर रहा है। हमेशा किसी भी long draft के back half पर sentence length check करें।

**Generic openers।** "In a world where..." "Today's [audience] needs..." "We've all been there..." Direct/Diplomatic पर 5 scored एक voice में इनमें से कोई भी automatic off-voice है।

**Three-act drift।** "First... Then... Finally..." या "Three things changed..." अगर आपकी voice उस तरह move नहीं करती, AI यह structure वैसे भी impose करेगा। Catch करें।

**Adjective stacking।** "Bold, witty, and confident messaging." Voices खुद के बारे में adjectives में बात नहीं करतीं। अगर draft में एक sentence brand को three-adjective rhythm में describe करती है, यह drift है।

**Audience flattery।** "For founders who refuse to settle." "For the few who get it." अगर voice profile audience flattery को एक framing device के रूप में include नहीं करता, यह drift है — AI pandering कर रहा है।

**"Excited to announce।"** 2007 में press release न होने वाली कोई भी voice को यह phrase कभी use नहीं करनी चाहिए। Automatic off-voice के रूप में treat करें।

---

## Worked example

**Profile (truncated):**
```
Voice: Solo Builder
Load-bearing: Direct/Diplomatic 5 (verdict-first openers), Serious/Playful 2 (dry, no jokes)
Avg sentence: 9 words
Ban list: leverage, transform, unlock, journey, passion, ecosystem, excited to announce
```

**Audit को Draft:**
> "We're excited to share something we've been working on for a long time. In today's fast-paced world, founders are constantly juggling priorities and struggling to find the time to focus on what truly matters. That's why we built a tool that unlocks productivity and helps you transform the way you work. We can't wait for you to try it."

**Audit output:**

```
## Section-by-section
- Sentence 1: off-voice
  - Trigger: "We're excited to share" — ban list violates (press-release language के लिए auto-flag)
- Sentence 2: off-voice
  - Trigger: "In today's fast-paced world" — anti-pattern list violates (generic opener); verdict-first framing device violates
- Sentence 3: off-voice
  - Trigger: "unlocks productivity" + "transform the way you work" — ban list violates (unlock + transform together smuggled)
- Sentence 4: drift
  - Trigger: "We can't wait for you to try it" — Direct/Diplomatic 5 violates (यह hedging warmth है, एक verdict या CTA नहीं)

## Overall drift score: 1/10
(Saved voice के रूप में unrecognizable। यह default AI output के रूप में पढ़ता है।)

## Fix priority (top 3)
1. Opener को एक verdict के रूप में rewrite करें। Example: "Shipped a tool that runs the five admin tasks founders waste a day on."
2. पूरे middle sentence strip करें। Voice explain नहीं करती — assert करती है और move on करती है।
3. Warm closer को एक direct CTA से replace करें। Example: "Link below."
```

यही test है। अगर audit कहे "perfectly on-voice" और आप draft में drift देख सकते हैं, audit गलत है — profile re-paste करें और इसे फिर run करें। Honest drift detection एक false pass से अधिक useful है।

---

## कब drift detection चलाएं

- किसी भी high-stakes asset ship होने से पहले (sales page, fundraise post, launch email, manifesto)
- Longform content (400 words से ऊपर) के लिए AI जो हर rewrite आपको देता है उस पर
- जब आप suspect करें कि आपकी voice shift हुई है पर articulate नहीं कर सकते क्यों — तीन recent assets पर इसे run करें और compare करें
- एक fresh profile extract करने से पहले एक calibration check के रूप में अपनी published content पर quarterly
