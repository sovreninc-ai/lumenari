# Content Refresh Playbook

सबसे high-leverage SEO work जो आप कर सकते हैं वह शायद ही new articles लिखना है। यह वो fix करना है जो आपके पास पहले से हैं। यह playbook बताता है कि कब update करें, कब rewrite करें, कब consolidate करें, और कब delete करें — साथ ही वह prompt जो हर एक को safely करे।

---

## Refresh decision tree

हर candidate article को order में इससे चलाएं। पहले match पर रुकें।

### Step 1: Data pull करें

हर article के लिए जो आप consider कर रहे हैं, इकट्ठा करें:

- Primary keyword के लिए current Google rank (Search Console)
- पिछले 12 महीनों में average position trend
- Click-through rate
- Current top 3 SERP results
- Article का `datePublished` और `dateModified`
- URL को point करने वाले backlinks (Ahrefs, Semrush, या जो भी आप use करते हैं)

10 मिनट data collection आपको गलत refresh करने से बचाते हैं।

### Step 2: Tree चलाएं

**Q1: क्या article page 1 या page 2 पर rank कर रहा है?**
- YES → **In place update करें।** URL preserve करें, internal links preserve करें, backlinks preserve करें। बस substance refresh करें।
- NO → continue।

**Q2: क्या article page 3-5 पर rank कर रहा है, और intent mismatched है?**
(e.g., आपका article एक tutorial है पर SERP अब comparison articles को reward करता है)
- YES → **Correct intent के around rewrite करें।** URL रखें। इसे पुराने URL की authority use करने वाले new article के रूप में treat करें।
- NO → continue।

**Q3: क्या आपके पास same keyword के लिए compete करने वाले दो articles हैं?**
- YES → **Consolidate करें।** Stronger URL चुनें (अधिक backlinks, better current rank)। Better content को इसमें merge करें। Weaker URL को stronger को 301 करें।
- NO → continue।

**Q4: क्या query fundamentally बदल गई है?**
(e.g., feature का नाम change हो गया; AI Overview clicks खा रहा; SERP video पर shift हो गया)
- YES → **Major rewrite।** New angle, अगर ज़रूरत हो new format। URL सिर्फ तब रखें जब पुराने article में URL preservation justify करने के लिए काफी relevance + backlinks हो।
- NO → continue।

**Q5: क्या topic deprecated है?**
(e.g., product अब exist नहीं करता; law बदल गया; framework retired हो गया)
- YES → **Delete करें और closest related current article को 301 करें।** अगर कुछ close नहीं है, 410 (gone) return करें।
- NO → continue।

**Q6: क्या article rank कर रहा है पर year-over-year traffic खो रहा है?**
- YES → **In place update + depth add करें।** शायद किसी newer article को clicks खो रहा है। Substance refresh करें, missing add करें, meta update करें।
- NO → इसे छोड़ें, अगली quarter के लिए monitor करें।

---

## Pattern 1: In place update (सबसे common refresh)

Page 1-2 पर rank करने वाले articles के लिए जिन्हें बस freshening चाहिए।

### आप क्या करते हैं

- Outdated stats और facts update करें
- अगर UI बदला है तो screenshots replace करें
- अगर topic में new dimensions हैं तो new sub-sections add करें
- Weak sections strengthen करें (जिनमें PostHog/Hotjar/आदि में low scroll depth हो)
- अगर बीच में better related content publish किया है तो internal links update करें
- `dateModified` schema update करें
- URL मत बदलें
- Rankings earn करने वाले sections remove मत करें

### Prompt

```
आप SEO Content Strategist हैं।

मैं इस article को in place refresh कर रहा हूँ। URL रहेगा। ज़्यादातर structure रहेगा।

**Article URL:** [URL]
**Primary keyword:** [keyword]
**Current rank:** [position]
**Current SERP top 3:** [paste]
**Last published / modified:** [dates]

**Article जैसा अभी है (paste):**
[full article]

मुझे क्या चाहिए:
1. Diff-style list क्या change करना है (reasons के साथ)
2. New sections जो आप add करेंगे या existing H2s के अंदर sub-sections
3. Outdated facts/stats जिन्हें update चाहिए ("source needed" flags के साथ)
4. Updated meta title और description सिर्फ अगर current ones कमज़ोर हैं
5. New sections के लिए internal-link suggestions

जो sections working हैं उन्हें rewrite मत करें जब तक आप एक specific reason name नहीं कर सकते कि वे underperform कर रहे हैं।
```

### Worked example output

> **Diff plan:**
>
> 1. **H2 #3 ("Pricing comparison") update करें** — table में 2024 pricing है। HubSpot, Pipedrive, और Salesforce सब move हो गए हैं। हर vendor की pricing page से current pricing pull करें। *(source needed: हर vendor का current pricing page)*
> 2. **Current #4 और #5 के बीच एक new H2 add करें: "2026 में क्या बदला"** — हर CRM अब जो AI features bundle करता है उन्हें touch करता है। SERP अब इसी के लिए newer articles को rank कर रहा है। ~250 words।
> 3. **H2 #5 ("Best for under 20 contacts") strengthen करें** — currently 180 words, real-test anecdote के साथ इसे double कर सकते हैं। PAA data दिखाता है users इस specific cut को search कर रहे हैं।
> 4. **Internal links update करें** — आपका पुराना version `/crm-pricing-teardown` को link करता है जो अब redirect करता है। Current URL `/saas-pricing-deep-dive` पर update करें।
> 5. **Meta title रहेगा** (working है, 54 chars, primary keyword front में)।
> 6. **Meta description update** — current one H1 reworded है। Replace: "7 CRMs को 90 दिनों तक test किया — 2026 के लिए नई AI features, current pricing, और जो मैं आज actually pick करूँगा उसके साथ refreshed।" (153 chars)
>
> **Sections जिन्हें आपको touch नहीं करना चाहिए:**
> - "How I tested these" section आपकी E-E-A-T spine है और rank earn कर रहा है। छोड़ें।
> - H1 रहता है। यह click earn कर रहा title है।
>
> **क्या missing है:**
> - आप currently "free CRM for solopreneurs" address नहीं कर रहे — PAA उस cut पर real volume दिखाता है। H2 #4 के अंदर एक H3 के रूप में add करने पर consider करें।

---

## Pattern 2: New intent के around rewrite करें

जब आपका article page 3-5 पर rank कर रहा हो क्योंकि Google अब इस query के लिए different format चाहता है।

### Signal कि intent shift हो गया है

- आज top 3 results उससे different format हैं जब आपने publish किया था
- आपका CTR position 5-7 पर भी 1% से नीचे है (मतलब आप show हो रहे हैं पर clicks नहीं मिल रहे)
- PAA questions बदल गए हैं
- एक AI Overview appear हो गया है

### आप क्या करते हैं

- URL रखें (इसके पास authority है)
- New SERP से match होने वाला new outline
- New H1, new meta title, new meta description
- पुराने version को link करने वाले किसी को एक brief redirect-context note add करें, OR original angle का इतना sub-section रखें कि वे backlinks अभी भी relevant feel करें

### Prompt

```
आप SEO Content Strategist हैं।

मैं इस article को new intent के around rewrite कर रहा हूँ। URL रहेगा।

**Article URL:** [URL]
**Primary keyword:** [keyword]
**Current rank:** [position]
**Current SERP top 3:** [paste]
**Article जैसा अभी है:**
[full text]

मैंने जो देखा:
- [मुझे क्यों लगता है intent shift हुआ — SERP में क्या बदला]

मुझे क्या चाहिए:
1. NEW SERP का intent classification
2. एक new outline (article outliner template के depth का)
3. कौन से (अगर कोई) पुराने article के sections verbatim preserve होने चाहिए
4. Updated meta title + description
5. Backlink continuity पर एक note — क्या मुझे उनमें से किसी को खोने की चिंता करनी चाहिए?
```

---

## Pattern 3: दो competing articles consolidate करें

जब आप discover करें कि आपने खुद को cannibalize किया है।

### कैसे identify करें

- Search Console दिखाता है कि आपकी दो URLs same keyword के लिए impress कर रही हैं
- दोनों URLs page 2-3 पर hover करती हैं और कभी climb नहीं करतीं
- किसी के पास content depth या backlinks में clear edge नहीं है

### आप क्या करते हैं

- Surviving URL pick करें (अधिक backlinks, या जो query से अधिक cleanly match हो)
- Losing URL से better content survivor में merge करें
- Losing URL को survivor को 301 करें
- Loser को point करने वाले सभी internal links update करें

### Prompt

```
आप SEO Content Strategist हैं।

मेरे पास same keyword के लिए compete करने वाले दो articles हैं। मुझे consolidate करने की ज़रूरत है।

**Keyword:** [primary keyword]

**Article A:**
- URL: [A]
- Current rank: [position]
- Backlinks: [count]
- Published: [date]
- [full article paste]

**Article B:**
- URL: [B]
- Current rank: [position]
- Backlinks: [count]
- Published: [date]
- [full article paste]

मुझे क्या चाहिए:
1. Surviving URL reasoning के साथ pick करें
2. दोनों से best pull करने वाला एक unified outline
3. Full merged draft
4. Loser URL को point करने वाले internal links जिन्हें update चाहिए
5. 301 plan
```

---

## Pattern 4: Major rewrite (query fundamentally बदल गई है)

सबसे कठिन call। Article अभी भी rank करता है पर दुनिया move हो गई। Examples: एक AI Overview अब query answer करता है तो traffic 60% drop हो गया; आपने जिस framework के बारे में लिखा वह deprecated हो गया; search behavior text से video पर shift हो गया।

### आप क्या करते हैं

- Major rewrite, अक्सर पूरी तरह से new angle
- Backlink value के आधार पर URL fate decide करें: अगर URL के पास strong backlinks हैं, रखें और rewrite करें; अगर नहीं, fresh URL fine है
- Meta, schema, internal links update करें

यह actually "refresh" नहीं है — यह पुराने URL की authority use करने वाला एक new article है। इसे एक new piece लिखने जैसा treat करें, article outliner template (`templates/article-outliner.md`) use करते हुए।

---

## Pattern 5: Delete और 301

जब topic genuinely deprecated है।

### Examples

- एक product जिसे आपने review किया वह बंद हो गया
- एक law जिसके बारे में आपने लिखा वह replace हो गया
- एक framework जो आपने सिखाया वह retired हो गया
- एक trend article जिसका moment गुज़र गया और आप इसे update करने में interested नहीं हैं

### आप क्या करते हैं

- URL को closest current article को 301 करें
- अगर कुछ close नहीं है, 410 (gone) return करें ताकि Google इसे cleanly remove करे
- सिर्फ delete करके 404 मत होने दें — वह wasted backlink equity है

---

## SERP-intent analyzer prompt

इसे तब use करें जब आप decide नहीं कर पा रहे हों कि कौन सा refresh pattern apply होता है।

```
आप SEO Content Strategist हैं।

Help करें मुझे classify करने में इस article को कैसा refresh चाहिए।

**Article URL:** [URL]
**Primary keyword:** [keyword]
**Current rank:** [position]
**12-month trend:** [improving / stable / declining]
**आज के top 3 SERP results:** [paste]

**Article (paste):**
[full article]

मेरा refresh decision tree चलाएं। बताएं:
1. कौन सा pattern fit होता है (update in place / intent rewrite / consolidate / major rewrite / delete)
2. Reasoning
3. पहला concrete step जो मुझे लेना चाहिए
```

Output एक clear "pattern X because Y" answer plus पहला step होना चाहिए। अगर AI hedge करे या कहे "it depends," push करें: "अगर आपको एक pick करना हो, कौन सा?"

---

## Worked example — "what is HubSpot used for"

एक real refresh decision। Article #4 rank करता है। CTR 0.8% है। SERP top 3 अब short, definition-style answers से dominated है एक AI Overview के साथ जो उनमें से दो को cite करता है। Article currently 1,800 words है और marketing pitch से शुरू होता है।

**Decision tree चलाया:**
- Page 1? लगभग (#4)। Page 2 territory।
- Intent mismatch? Yes — SERP short, definitional, fact-first content चाहता है। Article longform और marketing-leaning है।
- दो competing articles? No।
- Query fundamentally बदली? Yes-ish — AI Overview presence ने click value compress कर दिया।
- Topic deprecated? No, HubSpot अभी भी exist करता है।

**Verdict:** Pattern 2 (new intent के around rewrite)। URL रखें (इसके पास 12 backlinks हैं)। Top पर एक tight 50-word answer के साथ एक fact-first definitional piece के रूप में restructure करें, फिर expansions। Marketing-pitch tone drop करें। Featured snippet directly target करें।

**Expected outcome:** rank #4 से #1-2 तक climb करेगा, पर absolute click numbers dramatically jump नहीं कर सकते क्योंकि AI Overview वैसे भी click खा रहा है। Win AI citations में brand presence है और branded variant queries के लिए organic recovery।

---

## Common refresh mistakes जो kit flag करेगा

- **Page 1 पर rank कर रहे article का URL बदलना।** आप rank और backlink equity खोएंगे। In place refresh करें।
- **301'ing के बिना article delete करना।** Wasted backlinks, Search Console में 404 errors।
- **Refresh करना बिना यह check किए कि traffic क्यों drop हुआ।** कभी-कभी article ठीक है और QUERY का volume drop हुआ। Article problem है यह assume करने से पहले Search Console total impressions check करें।
- **बहुत बार refresh करना।** ज़्यादातर articles के लिए हर 6-12 महीने सही cadence है। Monthly refresh करना Google को suspicious लगता है और आपका time जलाता है।
- **`dateModified` update करना बिना actually substance update किए।** Google इसे catch करता है और freshness signal को discount करता है।
- **Rankings earn कर रहे sections remove करना।** Cut करने से पहले हमेशा scroll depth और time-on-section data देखें।

---

## Refresh cadence — साल कैसे plan करें

एक छोटी content team productively एक महीने में 4-8 articles refresh कर सकती है। एक solo operator को 2-3 per month target करना चाहिए, इन्हें इस तरह से prioritize करें:

1. वे articles जिन्होंने पिछले 90 दिनों में सबसे ज़्यादा absolute traffic खोया
2. Position 4-15 पर rank कर रहे articles high CTR potential के साथ
3. आपके high-traffic pages से link किए गए articles (इन्हें refresh करना internal-link benefit compound करता है)
4. 18+ महीने पुराने articles जिन्हें touch नहीं किया गया

हर एक पर refresh decision tree चलाएं। Pattern pick करें। Execute करें। उन सब को refresh और republish मत करें; कुछ आपको delete या consolidate करने को कहेंगे। यही playbook का काम है।
