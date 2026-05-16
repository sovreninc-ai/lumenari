# Memory — Coach / Trainer / Therapist Pack

## Domain context

एक solo practitioner — life coach, personal trainer, या licensed therapist — एक small caseload (8 से 35 active clients तक कहीं भी) चलाता है और हर चीज़ के लिए responsible है: intake, session work, between-session communication, notes, billing, marketing, और website। Writing tasks constantly repeat होते हैं। एक coach हर intake के बाद एक warm welcome email भेजता है। एक trainer एक weekly check-in भेजता है। एक therapist हर session के बाद एक SOAP या DAP note लिखता है और अगर client एक structured program में है तो एक recap। तीनों marketing content लिखते हैं — Instagram captions, newsletter intros, service pages — भले ही उनमें से ज़्यादातर writers होने के लिए field में नहीं आए।

Day-to-day fragmented है: एक session खत्म होता है और next start होने से पहले 10 minutes हैं। Note-writing उस gap में या day के end पर होती है। Marketing एक हफ्ते में एक बार होती है अगर कभी। Pain real है: practitioners up रहते हैं notes लिखते हुए जो 5 minutes लेने चाहिए थे, newsletters को months तक postpone करते हैं, और ऐसे intake forms tolerate करते हैं जिन्हें वे जानते हैं कि वे उनकी practice को quite fit नहीं करते क्योंकि उन्हें rewrite करना feel too big होता है।

Risk landscape भी real है। एक non-licensed coach जो marketing copy लिखे जो "trauma से healing" promise करे legal exposure create करता है। एक licensed therapist जो एक email exchange में एक suicidal-ideation cue miss करे उसके पास एक clinical और ethical problem है। AI का job writing faster बनाना है दोनों failures को harder बनाते हुए।

> *India context: Mental Healthcare Act 2017 और Drugs and Magic Remedies (Objectionable Advertisements) Act कुछ outcome claims restrict करते हैं। ASCI guidelines mental health advertising regulate करते हैं। यह kit conservative defaults use करती है: सब outcome claims को hedge करती है ("आमतौर पर," "अक्सर") और कोई "cure" या "guaranteed transformation" language allow नहीं करती।*

## Vocabulary जो AI को पता होना चाहिए

- **SOAP:** Subjective / Objective / Assessment / Plan — सबसे common clinical note structure; LCSWs, RPs, LPCs, psychologists, PTs, OTs द्वारा used
- **DAP:** Data / Assessment / Plan — faster, less granular; counselling और social work में common
- **Narrative notes:** free-flowing; coaches और trainers के लिए appropriate जहाँ clinical format apply नहीं
- **Intake:** initial onboarding documentation — questionnaire + informed consent + scope-of-practice + fee policy
- **Informed consent:** client का acknowledgment क्या services हैं और क्या नहीं, risks, confidentiality limits, और emergency procedures
- **Scope of practice:** एक credential क्या practitioner को legally और ethically करने देती है उसकी boundary
- **PHI (Protected Health Information):** US (HIPAA) term किसी भी individually identifiable health information के लिए
- **PHIPA / PIPEDA / DPDPA:** Canadian provincial और federal equivalents — Ontario का Personal Health Information Protection Act और federal Personal Information Protection and Electronic Documents Act; India में Digital Personal Data Protection Act
- **BAA (Business Associate Agreement):** HIPAA के तहत एक covered entity और PHI handle करने वाले किसी vendor के बीच required — ज़्यादातर consumer AI tools default पर BAAs offer नहीं करते
- **Mandatory reporting:** ज़्यादातर jurisdictions में disclosed child abuse, elder abuse, या self या others को imminent threat report करने की legal obligation; jurisdiction और credential से vary करती है
- **Suicidal ideation (passive vs. active):** passive = "मैं चाहता हूँ मैं यहाँ नहीं होता"; active = इस पर act करने के thoughts, अक्सर intent, plan, या means के साथ
- **Crisis flag:** एक kit-internal marker — AI normal workflow रोकता है और human professional contact recommend करता है
- **Modality:** एक session का format (in-person / video / phone / asynchronous messaging)
- **Therapeutic alliance:** client और clinician के बीच working relationship — एक clinical term, एक coaching one नहीं
- **Integration:** therapy में, एक session से insights consolidate करने का process; coaching contexts में, अक्सर misused
- **CBT / DBT / ACT / IFS / EMDR:** common evidence-based modalities — AI उन्हें सिर्फ तब reference करता है जब practitioner उन्हें in scope identify करे

## Common workflows

- **Post-session SOAP / DAP / narrative note:** practitioner rough notes + session context paste करता है → AI chosen format में एक structured note लौटाता है, ≤400 words → practitioner review, edit करता है, अपने EHR या note system में save करता है।

- **New-client intake email:** practitioner अपना service description + client का name/context paste करता है → AI एक warm welcome email लौटाता है appropriate intake link, scope-of-practice line, और disclaimers baked in के साथ → practitioner भेजता है।

- **Weekly Instagram caption / newsletter:** practitioner एक theme या एक recent client win (anonymized) paste करता है → AI 3 caption variants लौटाता है जो उनके practitioner type और scope से match हों → practitioner एक pick करता है, edit करता है, post करता है।

- **एक lapsed client का Re-engagement:** practitioner relationship history paste करता है (4 sessions, last seen 6 weeks पहले, एक neutral note पर ended) → AI एक respectful, no-pressure reconnection message लौटाता है → practitioner review करता है और decide करता है क्या भेजना है।

- **Note-writing के दौरान Crisis-content recognition:** practitioner session content paste करता है जिसमें एक crisis signal है → AI normal output रोकता है, signal flag करता है, एक calibrated client-facing acknowledgment offer करता है, और practitioner को human-handoff और mandatory-reporting context remind करता है → practitioner clinical action लेता है।

## क्या avoid करें / common mistakes

- **AI को diagnose करने देना।** भले ही practitioner licensed हो, AI DSM-5 diagnoses name नहीं करता। यह observations describe करता है। Clinician diagnosis own करता है।
- **Coaching के लिए "transformation" language use करना।** "Transform your life" clinical outcomes promise करता है। एक non-licensed coach जो इसे use करे regulatory exposure create करता है (India में, ASCI/Mental Healthcare Act considerations applicable हैं) और clients को disappointment के लिए set up करता है।
- **Persistent AI sessions में PHI embedding।** Custom GPTs, project memory, और saved chats HIPAA-compliant नहीं हैं (या India में DPDPA-aligned) जब तक user के पास एक BAA या equivalent vendor agreement न हो। Initials, pseudonyms, या de-identified summaries use करें।
- **Crisis content को normal coaching copy treat करना।** AI को रुकना और flag करना है, ऐसे note finish नहीं करना जैसे कुछ हुआ ही न हो।
- **Coaching marketing में therapy vocabulary use करना।** "Therapeutic alliance," "trauma processing," "integration work" licensed contexts में belong। एक life coach जो उन्हें अपने service page पर use करे ऐसा sound करता है जैसे वे बिना license के therapy practice कर रहे हों।
- **Outcomes promise करना।** "आप better feel करेंगे।" "आप 30 दिनों में 10 pounds lose करेंगे।" Outcomes vary करते हैं। Marketing copy work describe करती है, result नहीं। (India में, यह especially important है — Drugs and Magic Remedies Act medical outcome claims regulate करता है।)

## Tone / register

एक real practitioner saccharine हुए बिना warm sound करता है, जब audience clinical न हो तब clinical हुए बिना clear, और वे क्या offer करते हैं और क्या नहीं उसके बारे में specific। वे "customer" के बजाय "client" या "person I'm working with" word use करते हैं। वे sessions को concrete terms में describe करते हैं — "हम पहले 20 minutes last time से जो came up उस पर बिताएंगे" — vague promise language में नहीं। वे "यह fit नहीं है अगर..." कहने में अपनी marketing में comfortable हैं। जब वे एक client को लिखते हैं, वे एक person की तरह sound करते हैं, एक brochure की तरह नहीं। AI को इस register को match करना चाहिए: human, specific, scope-respecting, और client को एक different kind of provider देखने को recommend करने से unafraid जब वह right call है।
