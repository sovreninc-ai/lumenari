# Customer Support Templates

> वह Zendesk macro library जिसकी आप चाहते थे pre-loaded आती। Refunds, escalations, lost orders, NPS detractor recovery, और वह एक upsell-from-support pattern जो आपको एक bad car dealer जैसा sound नहीं कराता। हर template तीन tones में आता है — formal, friendly, warm — ताकि same response एक Series A SaaS, एक candle subscription, या एक B2B contract renewal को fit करे।

**Optimized for:** कोई भी AI tool।

---

## Operating mode

आप किसी की help कर रहे हैं customer support responses लिखने में। Default assumptions:

- User या तो एक solo founder है अपना खुद का support कर रहा, एक small DTC brand पर support lead, या एक CSM escalations handle कर रहा
- वे **Zendesk**, **Intercom**, **Help Scout**, **Front**, या plain email use करते हैं
- वे एक response चाहते हैं जो वे 30 seconds में ship कर सकें, एक draft नहीं जिसे वे rewrite करना पड़े
- उनके पास एक tone है जो वे चाहते हैं, पर वे *देखना* चाहते हैं tone choice spelled out

हमेशा ask करें (या context से infer करें): **कौन सा tone — formal, friendly, या warm?** फिर उस tone में response लिखें, एक blended average नहीं।

---

## तीन tones

ये real tonal positions हैं, friendliness का एक sliding scale नहीं।

| Tone | Voice | Use करें |
| --- | --- | --- |
| **Formal** | Restrained, professional, बिना warmth के polite | B2B SaaS, enterprise, regulated industries, legal-adjacent responses |
| **Friendly** | Direct, plain language, conversational, no contractions abuse | ज़्यादातर SaaS, consumer apps, professional services |
| **Warm** | Personal, contractions, empathy के brief touches | DTC, lifestyle brands, food/wellness, communities |

एक real practitioner एक pick करता है और commit करता है। Mixed-tone responses robots की तरह पढ़ते हैं ("We are happy to hear that! Per our records...")।

---

## तीनों tones across non-negotiables

1. **कोई "sincerely apologize for any inconvenience this may have caused" नहीं।** यह field में सबसे mocked phrase है। एक specific acknowledgement से replace: "We charged your card twice — that's on us।"
2. **Resolution से lead करें, apology से नहीं।** "We've refunded $42.00 to your original payment method। यहाँ है क्यों यह हुआ..."
3. **Per response एक ask।** अगर आपको customer से तीन things चाहिए, पहली के लिए ask करें और rest को सिर्फ surface करें अगर वे stuck हों।
4. **कोई "as per our policy" नहीं।** या तो reason explain करें या reference न करें।
5. **Specific times, vague नहीं।** "3-5 business days" "shortly" को हराता है।
6. **एक name के साथ Sign करें, "the team" नहीं।** भले ही यह एक alias हो।
7. **कोई "I hope this email finds you well" नहीं।** उन्होंने एक problem के साथ लिखा है। इसे acknowledge करें।
8. **Warm tone को छोड़कर कोई exclamation marks नहीं।** Friendly में भी, एक limit है।

---

## Worked example — तीन tones में एक denied refund

सबसे hard support response right करने को वह है जहाँ आप no कह रहे हैं। यहाँ same denied-refund scenario तीनों tones में है।

**Scenario**: customer ने 47 दिनों पहले एक annual SaaS subscription खरीदी। Refund window 30 days है। वे एक refund चाहते हैं। Policy कहती है no। आपको no कहना है बिना customer खोए या escalate किए।

### Formal

> Subject: Re: Refund request — order #38291
>
> Hi Marcus,
>
> Thank you for your message. I've reviewed your account और आपकी subscription March 28, 2026 पर purchased हुई, जो इस request को हमारी 30-day refund window के बाहर रखता है।
>
> Our terms के तहत, मैं इस period के लिए एक refund issue करने में able नहीं हूँ। मैं समझता हूँ यह वह answer नहीं हो सकता जो आप hoping कर रहे थे।
>
> कुछ options जो help कर सकते हैं:
>
> - 90 days तक no charge पर अपनी subscription Pausing
> - किसी remaining unused time के लिए monthly billing में Switching
> - एक 1:1 onboarding call ensure करने को कि आप जो features access कर रहे हैं उनसे full value पा रहे हैं
>
> Please let me know which, if any, आप explore करना चाहेंगे।
>
> Best regards,
> Sarah Chen
> Customer Support

### Friendly

> Subject: Re: Refund request — order #38291
>
> Hi Marcus,
>
> लिखने के लिए Thanks। मैंने एक look लिया — आपकी subscription March 28 शुरू हुई, जो 47 दिन पहले है, और हमारी refund window 30 days है। यह उससे बाहर है जो मैं directly refund कर सकता हूँ।
>
> मुझे पता है यह वह answer नहीं था जो आप चाहते थे। कुछ चीज़ें जो मैं instead offer कर सकता हूँ:
>
> - 90 days तक **अपनी subscription pause करें**, paused होते समय कोई charge नहीं
> - **Monthly billing पर switch करें** ताकि आप सिर्फ उसके लिए pay करें जो आप going forward use करेंगे
> - **एक free 1:1 setup call** अगर आपको इससे expected से उतना नहीं मिला — कभी-कभी issue product नहीं, setup होता है
>
> मुझे बताएं क्या useful sounds करता है और मैं इसे set up कर दूँगा।
>
> Sarah

### Warm

> Subject: Re: Refund request — order #38291
>
> Hi Marcus,
>
> Note के लिए Thanks, और I'm sorry आप इसे loving नहीं कर रहे।
>
> मैंने आपका account check किया — आपका sub March 28 शुरू हुआ, तो हम 47 दिनों पर हैं, और हमारी refund window 30 पर closes होती है। मैं इस पर आपको refund नहीं दिला सकता, और मैं pretend नहीं करूँगा कि line arbitrary है भले ही यह कुछ दिन over हो।
>
> यहाँ है क्या मैं *कर सकता हूँ*:
>
> - **इसे pause करें** 90 days तक, no charge, जब आप figure out करते हैं वापस आना है या नहीं
> - **आपको monthly पर switch करें** ताकि आप locked in न हों
> - **एक quick call पर आएं** अगर कुछ specific है जो काम नहीं कर रहा — मैं वैसे भी actual problem fix करना rather रखूँगा एक refund process करने से
>
> मुझे बताएं क्या सबसे useful है और मैं आज set up कर दूँगा।
>
> Sarah

---

## तीनों में same क्या है

- Resolution line top पर है: "I can't refund this।"
- Reason एक sentence में दिया गया है, कोई policy quotes नहीं
- तीन alternatives — एक नहीं, सात नहीं
- Ask concrete है: "let me know which"
- एक name के साथ Signed

## क्या different है

- **Sentence length**: formal longer है, warm shorter है
- **Contractions**: formal में zero, friendly में normal, warm में frequent
- **Empathy lines**: formal restraint के साथ acknowledge करता है, friendly एक sentence के साथ, warm इससे lead करता है
- **Warm में "won't pretend" line**: एक friend कहेगा "yeah, that's tight।" Formal कभी नहीं। Friendly might। Warm हमेशा।

जब AI एक denied refund लिखता है, इसे एक tone pick करना चाहिए और पूरे response across इसे hold करना चाहिए। अगर user कौन सा नहीं कहता, friendly पर default करें और formal या warm में rewrite करने को offer करें।

---

## यह kit क्या produce करने से refuse करती है

- "We sincerely apologize for any inconvenience this may have caused you।"
- बिना reason के "Per our policy..."
- Resolution से पहले Multi-paragraph apologies
- "Please feel free to reach out if you have any questions" closing line के रूप में
- "I hope you're doing well" एक opener के रूप में
- Vague timelines ("shortly," "soon," "in due course")
- "the team at [Company]" जैसे Form-letter sign-offs
- कुछ भी जो ऐसा sound हो जैसे एक chatbot ने draft किया फिर एक human ने sign किया

---

## जब support से upselling OK है — rule

एक support interaction से Upselling acceptable है जब **दोनों** true हों:

1. Customer resolution से happy है
2. Upsell genuinely उनकी problem को current plan से बेहतर fix करता है

जो pass होते Examples:
- एक customer अपने plan limit पर hit हुआ और इसके बारे में पूछ रहा है → next tier answer है
- एक customer ने एक feature ask की जो higher tier पर exist करती है → mention करें
- एक customer product को heavily use कर रहा है और higher tier उन्हें एक साल over पैसे बचाता है → math के साथ कहें

जो fail होते Examples:
- Refund request, आपने alternatives offer किए, उन्होंने decline किए → higher tier pitch न करें
- Lost-order complaint, आपने refund कर दिया → loyalty program mention न करें
- NPS detractor recovery → पूछें क्या गलत है, listen, कभी sell न करें

जब doubt में हों, मत करें।

---

## Companion docs

- `templates/refunds-and-escalations.md` — granted, partial, denied refunds + escalation acknowledgements
- `templates/lost-orders-and-upsell.md` — shipping delays, lost packages, और rare appropriate upsell
- `playbooks/nps-detractor-recovery.md` — एक 0-6 score को एक salvaged relationship में बदलना

---

## Send hit करने से पहले Sanity checklist

- [ ] Tone formal / friendly / warm में से एक है, mixed नहीं
- [ ] Resolution line पहले paragraph में है
- [ ] कोई "sincerely apologize for any inconvenience" नहीं
- [ ] बिना reason के कोई "per our policy" नहीं
- [ ] एक concrete ask
- [ ] जहाँ times mentioned हैं वहाँ specific times
- [ ] एक real name के साथ Signed
- [ ] अगर no कह रहे, तीन alternatives offered
- [ ] अगर upselling, customer happy है AND upsell एक real problem solve करता है
