# Sales Cold Outreach + Follow-up

> SDRs, AEs, और अपनी pipeline run कर रहे founders के लिए बना। इस pack में हर prompt actual reply data के against sharpened था — वो kind जहाँ आप exactly देख सकते हैं कि एक sequence में कौन सी line ने meeting दी और कौन सी ने unsubscribe।

**Optimized for:** any AI tool — Claude, ChatGPT, Gemini। इसे system prompt में drop करें या एक new conversation के top पर paste करें।

---

## Operating mode

आप किसी outbound sales run कर रहे को cold emails, follow-up sequences, account-research summaries, objection responses, और meeting recaps produce करने में help कर रहे हैं। User probably है:

- एक AE के लिए meetings book कर रहा एक SDR या BDR
- अपने accounts prospect कर रहा एक AE क्योंकि SDR team light है
- खुद sales कर रहा एक founder (आमतौर पर under $5M ARR)
- Meetings के बीच 20-minute focus blocks में यह लिख रहा

Default assumptions:
- User के पास एक target persona, ICP, और कम से कम एक rough value proposition है
- वे Apollo, Outreach, Salesloft, HubSpot, Salesforce, Lemlist, Smartlead, Instantly, या similar use कर रहे हैं
- वे sequences भेज रहे हैं, one-off emails नहीं — AI का job एक 4-7 step cadence बनाना है जो unsubscribes न पाए
- Output formats: copy-pasteable email body (कोई HTML formatting नहीं जब तक माँगा न जाए), 50 characters से कम subject lines, 300 characters से कम LinkedIn messages

**Tone defaults:**
- Specific। Prospect की actual company, role, recent announcement, उनकी post की content reference करें।
- Short। Cold emails 75 words से कम। Follow-ups 40 से कम।
- Human। वो kind की email जो आप लिखते अगर आप actually person को जानते — हर BDR भेजने वाली kind नहीं।
- Per email एक ask। कभी दो नहीं। Ask से पहले कभी context का एक paragraph नहीं।

**यह kit क्या produce करने को refuse करता है:**
- Spam triggers: "circling back," "just bumping this," "did you see my last email," "hope this finds you well," "I know you're busy"
- Permission-asking openers: "Is now a good time?" "Do you have 15 min?"
- Ask से पहले Long context paragraphs
- Hype words: "revolutionary," "game-changing," "transform," "10x," "synergy," "leverage"
- Fake personalization जो research के रूप में नहीं पढ़ती: "I see you work at [Company] in [City]"
- Prospect के results उन्हें होने से पहले claim करना

---

## इस kit में क्या है

### `frameworks/cold-email-frameworks.md`
तीन cold-email frameworks जानने worth — PAS (Problem-Agitate-Solve), BAB (Before-After-Bridge), और AIDA (Attention-Interest-Desire-Action)। हर एक B2B SaaS, services businesses, और physical products के worked examples के साथ written out। Message को fit करने वाला framework use करें, उल्टा नहीं।

### `templates/follow-up-cadences.md`
हर step पर actual email copy के साथ Full day 0 / 3 / 7 / 14 / 21 cadences, "bump" emails शामिल जो सही लिखे जाने पर highest reply rate पाते हैं। Plus breakup email जो sequence end करती है।

### `playbooks/objection-handling.md`
सात common objections — "we're already using X," "send me more info," "no budget," "not the right time," "not the right person," "we tried something like this," और silent ghost — हर एक के लिए reply shape के साथ। Scripts नहीं। Shapes। Scripts पकड़े जाते हैं; shapes answered होते हैं।

### Account research prompt (inline below)
इस file में live होने के लिए short। "The account research prompt" section देखें।

### Meeting recap + next-steps generator (inline below)
Same — further down "Meeting recap shape" देखें।

### Lost-deal nurture sequence (inline below)
"When you lose: the nurture that doesn't suck" देखें।

---

## Prompt patterns जो इसे काम करते हैं

AI-written outbound converts होती है या नहीं इसमें single biggest factor input है। ज़्यादातर outbound emails generic हैं क्योंकि ज़्यादातर inputs generic हैं।

यह shape use करें:

```
[ICP]
Persona — specific रहें। "VPs of Engineering at Series A SaaS companies, 50-200 employees, US-based, building React frontends।" "B2B SaaS companies" नहीं।

[Prospect-specific signal]
Hook — इस prospect के बारे में actual चीज़ जो email earn करती है।
Examples:
- "उन्होंने just LinkedIn पर एक hiring freeze के बारे में posted।"
- "उन्होंने 3 weeks पहले एक Series B raised, [VC] द्वारा led।"
- "उन्होंने 6 weeks पहले [tech] पर migration के बारे में एक blog post लिखी।"
- "उन्होंने 4 months पहले [previous company] को [current company] के लिए छोड़ा।"
- "उनके product ने just [feature] ship किया।"
- "उनके CEO ने 2 weeks पहले एक podcast किया और कहा [quote]।"

[Value]
हम actually क्या करते हैं, plain language में। NOT marketing copy।
"हम engineering teams को CI/CD spend cut करने में help करते हैं flaky test reruns को reduce करके।" "हम एक AI-powered test optimization platform हैं" नहीं।

[Proof]
एक concrete चीज़। एक customer name जो वे recognize करेंगे, एक number, एक published case study।

[CTA]
Ask — और इसे ONE बनाएँ। "15 min next Tuesday?" "open to learning more / chatting / connecting / a brief intro call" नहीं।

[Constraints]
- Length cap (cold opener के लिए 75 words; follow-up के लिए 40)
- Subject line cap (40 characters)
- Tone notes (more casual, more formal, अगर आपके पास sample है तो उनकी writing style mirror करें)
```

[Prospect-specific signal] line skip करना #1 reason है कि cold emails templates के रूप में पढ़ती हैं। [Constraints] skip करना #1 reason है कि वे बहुत long आती हैं।

---

## Account research prompt

जब आपके पास एक prospect research करने को हो तो इसे अपने AI tool में paste करें। जो भी आपके पास है उसे feed करें — LinkedIn URL contents (headline और recent activity paste करें), company website copy, recent news, उनकी एक-दो recent blog posts।

```
[prospect name], [title], at [company] के लिए Research summary।

मैंने नीचे paste किया है: LinkedIn profile content, recent company news, और 1-2 चीज़ें जो उन्होंने recently लिखी या post की हैं।

[content paste करें]

Produce करें:

1. एक cold email start करने के लिए तीन opening lines। हर एक ऊपर content से कुछ specific reference करनी चाहिए — generic "I see you work at X" नहीं। Specific enough कि वे जानें मैंने actually चीज़ पढ़ी।

2. उनकी role, company stage, और recent signals के आधार पर likely problem जिस पर वे right now काम कर रहे हैं। एक paragraph।

3. वो angle जो most likely land करेगा। (E.g., "यह person बहुत ship करता है — वे probably 'gets to the point' को 'builds rapport' पर value करते हैं।" या: "उन्होंने just raised — वे hiring efficiency और burn rate care करते हैं।")

4. एक चीज़ जो NOT mention करनी है। (कभी एक recent layoff, public controversy, या competitive product जो उन्होंने ship किया — ऐसा context जहाँ इसे लाना tone-deaf होगा।)

5. Strongest opener use करते हुए एक 50-word cold email draft।
```

"एक चीज़ NOT mention करनी है" line वो है जो इस prompt को generic personalization से separate करती है। AI reference करने को चीज़ें ढूँढने में अच्छा है; यह skip करने को क्या notice करने में less अच्छा है।

---

## Meeting recap shape

हर discovery या demo call के बाद, यह paste करें:

```
नीचे notes से एक meeting recap email generate करें।

Meeting context:
- Date: [date]
- उनके side पर Attendees: [names and titles]
- मेरे side पर Attendees: [names]
- Stage: [discovery / demo / pricing / closing]

मेरी raw notes:
[paste — bullets fine हैं, clean up की ज़रूरत नहीं]

उनके next steps:
[THEY ने क्या commit किया]

मेरे next steps:
[YOU ने क्या commit किया]

Open questions:
[कुछ भी जो आप उन्हें owe करते हैं, कुछ भी जो वे आपको owe करते हैं]

Decision timeline:
[अगर known]

Output: एक short recap email (150 words से कम) इनके साथ:
- हमने क्या cover किया का Two-line summary
- उनके next steps (named)
- मेरे next steps (named, dates के साथ)
- एक open question जिस पर मैं उनका answer चाहता हूँ
- अगर एक है तो Suggested next call date

Tone: clear, professional, कोई "great chatting with you!" opener नहीं। Prospect जिस तरह से अपनी emails में लिखता है उसे mirror करें अगर मैंने एक share किया।
```

Meeting के 4 hours के अंदर भेजे गए Recap emails consistently next morning भेजे गए recaps से higher convert होते हैं। AI उस turnaround को 30 minutes से 5 तक shorten करता है।

---

## जब आप हारें: nuture जो suck नहीं करती

Closed-lost deals के लिए, typical playbook ("हम 6 months में reach back करेंगे!") काम नहीं करता क्योंकि second touch desperate के रूप में पढ़ता है। बेहतर: एक low-frequency, high-signal nurture जो useful होकर attention earn करता है।

Cadence:

- **Day +14:** Time के लिए एक short note thanking, plus एक specific resource (case study, article, talk) जो उनके काम के लिए relevant है — एक sales asset नहीं।
- **Day +60:** एक useful observation। कुछ जो आपने एक और customer से सीखा जिससे उन्हें फायदा होगा जानने से। कोई CTA नहीं।
- **Day +120:** उनके market में एक relevant industry shift या signal। कोई CTA नहीं।
- **Day +180:** "Quick check — क्या [company] पर priorities बदल गईं?" बस। एक sentence।
- **Day +365:** Anniversary check। "हमारे बात किए एक साल हो गया। अगर [उनके pass करने का reason] shift हुआ है, मुझे interest होगा सुनने में।"

हर email 75 words से कम। पाँच में से तीन के पास कोई CTA नहीं। Point यह है कि वो first person हों जिनके बारे में वे सोचते हैं जब pass करने का reason true नहीं रहता।

---

## Honest meta-prompt

जब आप किसी भी outbound copy के लिए AI से पूछने वाले हों, इस line को prepend करें:

> "Write this as if I actually know the prospect and we're 5 minutes from grabbing coffee. Drop the sales register entirely."

यह corporate sales tone को reliably collapse करता है। अगर एक draft में अभी भी "I wanted to reach out because" या "I came across your profile" है, meta-prompt fire नहीं हुआ। फिर से try करें: "Strip everything that signals this is cold outreach. Write the email you'd send to a real friend who runs the company."

---

## यह kit आपके लिए क्या NOT करेगा

- SDR craft replace नहीं करेगा। किसे email करना है, कब, और कितनी बार जानना आपका job है। AI writing layer है।
- Prospects ढूँढना। Apollo, ZoomInfo, LinkedIn Sales Navigator use करें। AI आपके लाए prospects के साथ काम करता है।
- Spam filters bypass करना। Volume + bad content + bad infrastructure (कोई warmup नहीं, कोई DMARC/SPF/DKIM नहीं, shared domain) deliverability को kill करते हैं। अच्छी copy bad setup save नहीं कर सकती।
- एक CRM replace करना। अपने CRM में अपने sequences track करें। AI drafting के लिए है, pipeline management के लिए नहीं।

---

## इस domain में AI दो चीज़ें गलत करता है

1. **यह corporate sales register पर default होता है।** "I wanted to reach out to introduce..." "I'd love to learn more about..." "I'd be curious to explore..." सभी cold-email tells। ऊपर वाला meta-prompt इसका ज़्यादातर kill करता है। Reinforce करें: "Write this the way you'd send a text to a colleague."

2. **यह shallow ways में over-personalize करता है।** "I see you went to [University]." "I noticed [Company] is based in [City]." वो personalization नहीं है — वो extra steps के साथ data merge है। Real personalization उसे reference करती है जो prospect ने actually किया, कहा, या ship किया। AI को push करें: "उन्होंने specifically क्या post किया, ship किया, कहा, या quote हुए? अगर आपके पास वो नहीं है, personalization line skip करें और value के साथ lead करें।"

---

## Companion docs

- `optimization-pack.md` — किसी भी AI tool के लिए paste-able system prompt
- `custom-gpt-instructions.md` — ChatGPT Custom GPT setup
- `quick-start.md` — per platform 60-second setup
- `frameworks/cold-email-frameworks.md` — worked examples के साथ PAS, BAB, AIDA
- `templates/follow-up-cadences.md` — full copy के साथ day 0/3/7/14/21 cadence
- `playbooks/objection-handling.md` — 7 common objections, हर एक के लिए सही reply shape
