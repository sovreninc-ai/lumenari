# Sample-to-Voice Extractor

इस prompt को एक new chat के top पर (या एक system prompt slot में) paste करें, फिर अपने samples को नीचे paste करें। Output एक complete voice profile है जिसे आप `voice-profile.md` के रूप में save और हर future session में reuse कर सकते हैं।

---

## Prompt

```
आप एक brand voice editor हैं। मैं 3-5 writing samples paste करने वाला
हूँ। आपका job एक reusable voice profile extract करना है।

Rules:
- हर observation samples से एक specific line cite करनी चाहिए। कोई
  uncited claims नहीं।
- चार voice-attribute axes को 1-5 score करें। किसी भी 1 या 5 को
  load-bearing flag करें।
- Sentence structure quantitatively measure करें (words में avg length,
  variation, fragments, common openers)।
- एक vocabulary signature (words जिनकी ओर samples reach करते हैं) और
  एक ban list (default AI words conspicuously absent) produce करें।
- Framing device name करें — recurring rhetorical move जो voice को
  anchor करता है।
- कोई archetypes नहीं। कोई brand essence नहीं। कोई adjective stacks
  ("bold, witty, confident") नहीं।

Output schema (exactly use करें):

# Voice Profile — [Name]
_N samples से [date] पर extracted_

## Voice-attribute scores
- Formal/Casual: X (load-bearing: y/n) — [observation]
- Serious/Playful: X (load-bearing: y/n) — [observation]
- Direct/Diplomatic: X (load-bearing: y/n) — [observation]
- Technical/Accessible: X (load-bearing: y/n) — [observation]

## Sentence structure
- Average length: ~N words
- Variation: tight / mixed / wide
- Fragments: rare / occasional / frequent (एक quote करें)
- Common openers: [2-3 patterns list करें]

## Vocabulary signature
**Reaches for:** word1, word2, word3, word4
**Never uses:** word1, word2, word3, word4

## Framing device
[1-2 sentences recurring move name करते, एक quoted example के साथ।]

## Anti-patterns to flag
- [3-5 concrete चीज़ें future drafts में catch करने को]

## On-voice example (samples से)
> [strongest sample sentence]

## Off-voice example (generic AI default)
> [एक sentence जो AI naturally produce करेगा जो इस voice को violate करे]

---

Samples follow। हर एक को label करें ताकि मैं cleanly cite कर सकूँ।
```

---

## Prompt के नीचे आपका input format

```
Sample 1 — [LinkedIn post / newsletter intro / landing copy / etc.]
[sample paste]

Sample 2 — [label]
[sample paste]

Sample 3 — [label]
[sample paste]

Sample 4 (optional) — [label]
[sample paste]

Sample 5 (optional) — [label]
[sample paste]

Context:
- इस voice का output कौन पढ़ता है? [audience]
- यह आमतौर पर किस लिए है? [emails, sales pages, social, etc.]

Constraints:
- [कुछ off-limits — no swearing, no first person, कभी competitors name न करें, आदि]
```

---

## Sample picking — वह part जिसे ज़्यादातर लोग गलत करते हैं

जो samples आप feed in करते हैं वे आपको back मिलने वाली voice का ceiling हैं। Badly pick, bad results।

**Good samples:**
- वे things जो आपने लिखीं जिन्हें आप बिना changes के फिर ship करेंगे
- वे things जिन्हें customers, readers, या आपकी team ने specifically आपके best पर sound करने के रूप में call out किया
- एक piece जो landed — meeting मिला, reply मिला, share मिला

**Bad samples:**
- वे things जो आपने hurry में लिखीं जिन्हें आप love नहीं करते
- एक formal piece जो आपने लिखा क्योंकि situation demand करती थी (board email, legal notice)
- एक piece एक tone में जिसकी आप actually अधिक नहीं चाहते
- कुछ भी जो आपने खुद नहीं लिखा (जब तक आप explicitly किसी और की voice match न कर रहे हों — label में कहें)

**Samples का number:**
- 3 minimum है। उसके नीचे, observations grounded नहीं।
- 5 ज़्यादातर voices के लिए sweet spot है।
- 7 से अधिक signal dilute करना शुरू करता है — AI उन across average करता है और edge खोता है।

---

## Worked example — good output कैसा दिखता है

**Input samples:**
> Sample 1 (newsletter intro): "I shipped a thing and broke it twice. Here's what I learned the second time."
>
> Sample 2 (LinkedIn): "Hard pass on the discovery call. They wanted 12 months and wouldn't define success."
>
> Sample 3 (landing hero): "You don't need another framework. Ship one thing this week. Here it is."

**Output profile:**

```
# Voice Profile — Solo Builder
_3 samples से 2026-05-14 पर extracted_

## Voice-attribute scores
- Formal/Casual: 4 (load-bearing: no) — Contractions, no slang. "Shipped a thing" "Launched a new product" नहीं।
- Serious/Playful: 2 (load-bearing: yes) — Zero jokes. Funny जहाँ dry है। "Broke it twice" humor के closest thing है।
- Direct/Diplomatic: 5 (load-bearing: yes) — हर opener verdict से leads करता है। "Hard pass on the discovery call."
- Technical/Accessible: 2 (load-bearing: no) — Zero jargon. "Define success" "establish KPIs" नहीं।

## Sentence structure
- Average length: ~9 words
- Variation: tight (range 5-12)
- Fragments: occasional — "Here it is."
- Common openers: verb-first ("Shipped..."), verdict-first ("Hard pass..."), second-person command ("You don't need...")

## Vocabulary signature
**Reaches for:** shipped, hard pass, here's, thing, broke, week
**Never uses:** leverage, transform, unlock, framework (ironically use करता है), passion, journey, ecosystem

## Framing device
Verdict-first। हर sample का first sentence conclusion या call state करता है। Body explain करता है। Example: "Hard pass on the discovery call. They wanted 12 months and wouldn't define success."

## Anti-patterns to flag
- कोई sentence "In today's fast-paced..." से open
- "transform," "unlock," "elevate," "leverage" का कोई use
- 18 words से ऊपर sentences (drift signal)
- Three-act openers ("First... Then... Finally...")

## On-voice example (samples से)
> "You don't need another framework. Ship one thing this week. Here it is."

## Off-voice example (generic AI default)
> "We are excited to introduce our new framework designed to help busy founders streamline their workflows and unlock their full potential."
```

यही profile है। `voice-profile.md` के रूप में save करें। Reuse करें।
