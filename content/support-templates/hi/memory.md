# Memory — Customer Support Templates

## Domain context

एक support person अपना दिन एक queue के अंदर बिताता है। Tickets email, chat, social, या कभी-कभी phone के through आते हैं। Platform Zendesk, Intercom, Help Scout, Front, या solo founders के लिए, plain Gmail है। Job है: ticket पढ़ें, figure out करें customer को क्या चाहिए, decide करें आप क्या कर सकते हैं, response लिखें। एक दिन में 30-100 times repeat करें।

Hard responses वे हैं जहाँ आप no कह रहे हैं — denied refunds, "we can't add that feature," "your account was suspended।" Easy ones "shipped today, here's the tracking link" हैं। ज़्यादातर बीच में fall होते हैं। Tone लोगों की सोच से अधिक matter करता है — same content cold vs। warm delivered एक totally different customer reaction produce करता है।

Solo founders अपना खुद का support करते usually needed से warmer होते हैं, और जितना should उससे slower होते हैं। Scale पर support teams usually formal पर default करती हैं और एक robot जैसा sound करती हैं। दोनों table पर relationship value छोड़ रहे हैं।

एक quiet rule भी है जो best support people समझते हैं: आप सिर्फ एक ticket resolve नहीं कर रहे, आप company के बारे में customer की perception build (या erode) कर रहे हैं। एक perfectly-handled refused refund एक relationship बचा सकता है। एक poorly-handled granted refund अभी भी एक खो सकता है।

## Vocabulary जो AI को पता होना चाहिए

- **Ticket**: एक customer-initiated support conversation। एक status (open, pending, solved, closed) रखता है।
- **Macro**: Zendesk में एक saved response template। Intercom उन्हें "saved replies" कहता है। Help Scout भी उन्हें "saved replies" कहता है।
- **First response time (FRT)**: customer को कोई भी reply मिलने तक कितना समय। Support में सबसे-watched metric।
- **Resolution time**: ticket creation से "solved" status तक। FRT से Less honest — agents इसे game करने को prematurely close करते हैं।
- **CSAT**: Customer Satisfaction। आमतौर पर एक 1-5 या 1-7 survey एक ticket close होने के बाद send होती है। 90%+ "very satisfied" aim करें।
- **NPS**: Net Promoter Score। 0-10 scale। Promoters (9-10), passives (7-8), detractors (0-6)। Score = %promoters - %detractors।
- **Detractor recovery**: 0-6 NPS देने वाले customers को outreach find out करने को क्या गलत है और try करने को fix करें।
- **Escalation**: एक ticket को एक senior rep, manager, या specialized team को bump करना। Usually एक 24-48 hour internal SLA।
- **SLA**: Service Level Agreement। Promised response/resolution time, usually enterprise-contracted।
- **Refund window**: purchase के बाद कितने दिन एक refund automatically eligible है। Industry norms: 14 days (SaaS), 30 days (DTC), 365 days for Costco।
- **Chargeback**: जब एक customer एक charge को merchant से ask करने के बजाय अपने bank के through dispute करता है। Refund के top पर merchant को एक fee (~$15-25) costs करता है।
- **Stripe Dashboard**: जहाँ ज़्यादातर modern SaaS refunds process करते हैं। One click, 5-10 days में पैसे वापस।
- **Upsell from support**: एक support interaction के दौरान एक upgraded plan offer करना। सिर्फ appropriate जब customer happy हो AND upgrade उनकी actual problem solve करे।

## Common workflows

- **एक refund request process करें**: ticket पढ़ें → order date और refund policy check करें → customer history check करें (first-time? long-time? past issues?) → decide: full, partial, denied → अगर granted, Stripe/Shopify में process → resolution और reason के साथ reply → अगर denied, 2-3 alternatives offer करें।
- **एक lost order handle करें**: confirm करें order shipped → tracking check करें → अगर "delivered" पर customer कहे otherwise, front porch की photo के लिए ask करें → अगर genuinely lost, replace या refund → carrier को back-channel पर reach out अगर यह अक्सर होता हो।
- **एक escalation acknowledge करें**: 1 hour के अंदर "I've escalated this to [name/team]" और realistic timeline के साथ reply → कभी एक fix promise न करें जो आप confirm नहीं कर सकते → next update time के लिए expectation set करें।
- **NPS detractor recovery**: एक 0-6 score देखें → 24 hours के अंदर एक real person से reply ("thanks for your feedback!" नहीं) → एक specific question पूछें → listen → अगर appropriate हो तो एक fix या compensation propose करें।
- **Upsell-from-support (rare-but-right)**: customer resolution से happy है → उनकी actual need एक higher tier पर है → math के साथ briefly mention करें once → push न करें।

## क्या avoid करें / common mistakes

- "We sincerely apologize for any inconvenience this may have caused।" Bottom-tier support cliché। Specific acknowledgement हमेशा generic apology को हराता है।
- Apology से लीडिंग, resolution को burying। Customers जानना चाहते हैं आप क्या कर रहे हैं, फिर क्यों।
- बिना reason explain के "Per our policy..."। अगर reason make sense करे, reason दें। अगर नहीं, policy बदलें।
- Vague timelines: "shortly," "soon," "in due course।" Specific हों या silent हों।
- "Please feel free to reach out if you have any questions" closing के रूप में। Actual next step या एक real sign-off से replace करें।
- Substance से पहले Multi-paragraph apologies। Apology side पर दो sentences max।
- Form-letter sign-offs: "the team at [Company]," "Customer Happiness Team।" एक real name use करें।
- Mixed tone — formal से starting, halfway warm में sliding। एक pick करें।
- जब customer unhappy हो तब Upselling। Cynical पढ़ता है, relationship मारता है।
- "I hope this email finds you well।" उन्होंने एक problem के साथ लिखा है। Problem acknowledge करें।

## Tone / register

एक great support writer अपनी own खोए बिना brand voice match करता है। वे customer के reading level पर लिखते हैं — shorter sentences, fewer commas, plain words। वे कभी jargon use नहीं करते जो customer ने पहले use नहीं किया। वे saccharine हुए बिना warm, cold हुए बिना professional, curt हुए बिना honest हैं। वे "I" कहते हैं जब वे I mean करते हैं, और "we" जब वे company mean करते हैं।

Internal vocabulary: tickets, macros, FRT, CSAT, escalations, chargebacks, refund window। External vocabulary: "your order," "your account," "the issue," "what happened।" कभी customer-facing copy में internal jargon use न करें।

Good support people brand voice suggest करता उससे slightly more direct हैं। उन्होंने सीख लिया है कि customers एक long polite "we regret to inform you" से एक forward path के साथ एक short clear "no" prefer करते हैं।
