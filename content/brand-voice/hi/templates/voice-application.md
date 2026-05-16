# Voice Application

इसे एक बार use करें जब आपके पास एक saved voice profile हो। Profile + draft paste करें जिसे आप rewrite करवाना चाहते हैं। AI एक voiced rewrite और एक self-check produce करता है।

---

## Prompt

```
आप एक saved brand voice profile को एक draft पर apply कर रहे हैं। Rules:

1. Start से पहले profile पूरी तरह पढ़ें। Load-bearing axes (1s और 5s)
   को heaviest weight करें।
2. Vocabulary signature को एक guide के रूप में use करें। Ban list को
   एक hard filter के रूप में use करें — अगर आप एक banned word की ओर
   reach करें, replace करें।
3. Sentence-length average match करें। Avg length के 2x sentences
   produce न करें।
4. Opener पर framing device use करें। First sentence वहाँ है जहाँ
   voice सबसे visible है।
5. Rewrite के बाद, एक self-check चलाएं: हर paragraph या major block
   के लिए, इसे on-voice / drift / off-voice label करें। किसी भी specific
   line को quote करें जिस पर आप sure नहीं।

Output format:

## Rewrite
[आपका voiced version]

## Self-check
- Paragraph 1: on-voice / drift / off-voice — [reason]
- Paragraph 2: on-voice / drift / off-voice — [reason]
- ...
- Lines I'm unsure about:
  - "[quoted line]" — [flag का reason]

Profile और draft follow।
```

---

## नीचे आपका input

```
[Voice profile]
[यहाँ full saved profile paste करें]

[Draft]
[generic, rough, या competitor-flavored copy paste करें जिसे आप rewrite
करवाना चाहते हैं]

[Goal]
यह किस लिए है? पढ़ने के बाद reader को क्या action लेना चाहिए?

[Constraints (optional)]
- Length cap
- Format (email, landing hero, ad copy, tweet thread, etc.)
- Specific facts जो rewrite में रहने चाहिए
```

---

## Worked example

**Profile (truncated):**
```
Voice: Solo Builder
Load-bearing: Serious/Playful 2 (dry), Direct/Diplomatic 5 (verdict-first)
Avg sentence: 9 words
Reaches for: shipped, hard pass, here's, thing
Never uses: leverage, transform, unlock, journey, passion, ecosystem
Framing: verdict-first opener; body explains
```

**Draft (generic AI output):**
> "We are thrilled to announce the launch of our new productivity platform designed to help busy founders streamline their daily operations through cutting-edge AI technology, allowing them to focus on what truly matters: building their dream business and transforming their lives."

**Goal:** Email launch को मेरे newsletter को announce करना। Product page पर clicks चाहता हूँ।

**Rewrite:**
> Shipped the productivity tool. It runs the five admin tasks you waste a day on. Takes about a minute to set up. Link below.

**Self-check:**
- Sentence 1: on-voice — verdict-first opener, 4 words, vocab signature से "shipped" use करता है।
- Sentence 2: on-voice — 11 words, second-person, no jargon।
- Sentence 3: on-voice — 7-word fragment cadence।
- Sentence 4: on-voice — minimal, बिना sell किए एक CTA पर end होता है।
- Lines I'm unsure about: none।

---

## हर rule क्यों matter करता है

**Profile पूरी तरह पढ़ें।** AI tools किसी भी prompt की पहली few lines को heaviest use करने पर default करते हैं। अगर profile paragraph 4 है और draft paragraph 5 है, draft जीतता है। एक explicit instruction के साथ full read को force करना इसे fix करता है।

**Load-bearing axes को heaviest weight।** Serious/Playful पर एक load-bearing flag के साथ 2 scored voice मतलब jokes एक hard no है। एक load-bearing flag के बिना Casual पर 4 scored voice मतलब contractions fine हैं पर slang load-bearing नहीं। AI को पता होना चाहिए कौन से traits non-negotiable हैं।

**Hard filter के रूप में ban list।** एक hard filter के बिना, AI rewrites synonyms के through banned words को back smuggle करते हैं। "Leverage" "harness" से replace होता है। "Unlock" "tap into" बनता है। Rule है: अगर meaning एक banned word से match करता है, find कि उस semantic shape के बिना कैसे कहें।

**Sentence length match।** यह सबसे आसान rhythm marker है enforce करने को और एक जिसे AI सबसे अक्सर गलत करता है। एक 9-word-average voice जो अचानक एक 28-word sentence produce करे एक different person की तरह पढ़ता है।

**Opener पर framing device।** First sentences वहाँ हैं जहाँ voice सबसे diagnostic है। अगर आपकी voice verdict-first है और rewrite "In a world where..." से open करे, कुछ और matter नहीं करता।

**Flags के साथ self-check।** Honest flags false confidence से अधिक useful हैं। एक rewrite जो कहे "paragraph 3 generic की ओर drift हो रहा है" आपको इसे fix करने देता है। एक rewrite जो claim करे कि सब कुछ pass हो रहा है जब paragraph 3 clearly off है आपको खुद re-read और catch करने को force करता है।
