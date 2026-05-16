# Disclaimers + Crisis Flags

Complete library। Practitioner type द्वारा disclaimer text, crisis-flag rule set, mandatory-reporting awareness scaffolding, और boilerplate जो हर practice की policies में होना चाहिए।

> *India context: Mental Healthcare Act 2017, Drugs and Magic Remedies (Objectionable Advertisements) Act, ASCI guidelines, और DPDPA सब applicable हैं। यह templates conservative defaults use करते हैं — सब outcome claims hedge करते हैं और कोई "cure" या "guaranteed transformation" language allow नहीं करते।*

---

## Disclaimer library

### Coaching / personal training — client-facing communications

```
Coaching / personal training medical, mental-health, या psychiatric care
का substitute नहीं है। अगर आप एक mental-health crisis experience कर
रहे हैं, India में iCall (9152987821), Vandrevala Foundation (1860-
2662-345), या अपनी local emergency line से contact करें।
```

इन पर Use करें: welcome emails, session reminders, marketing pages, intake forms, between-session messages।

### Licensed therapy — client-facing communications

```
यह communication आपके [Practitioner Name, credential, license #] के
साथ therapeutic relationship का part है। यह emergency mental-health
services constitute नहीं करती। अगर आप crisis में हैं, India में iCall
(9152987821), Vandrevala Foundation (1860-2662-345) से contact करें
या अपने nearest emergency department पर जाएँ।
```

इन पर Use करें: routine client messages, recap emails, telehealth platform inserts, client के साथ shared between-session notes।

### Marketing copy / website — सभी practitioner types

```
[Service type] [jurisdiction] में regulated है। मैं [board / college /
regulator] के तहत licensed हूँ (license #[X])।

यह website एक clinical relationship constitute नहीं करती। Outcomes vary
होते हैं और मैं specific results guarantee नहीं करता। अगर आप crisis
में हैं, India में iCall (9152987821), Vandrevala Foundation (1860-
2662-345), या अपनी local emergency line से contact करें।
```

इन पर Use करें: practice की website का हर public page।

### Intake form — सभी practitioner types

```
इस form को submit करके, आप acknowledge करते हैं:

- आप voluntarily [coaching / training / therapy] में enter कर रहे हैं
- आप ऊपर describe किए services के scope को समझते हैं
- Sessions confidential हैं, इन limits के साथ: [practitioner confidentiality
  break कर सकता है अगर उनके पास believe करने का reason हो कि आप या कोई
  और imminent danger में है; अगर legally compelled हो disclose करने को;
  अगर mandatory-reporting obligations apply करें]
- आप अपने decisions और session के बाहर लिए actions के लिए responsible हैं
- आपको [practitioner] के hours के बाहर emergency support reach करने का
  तरीका inform किया गया है
```

Confidentiality limits को अपनी jurisdiction और credential से adapt करें।

---

## Crisis-protocol flags

### Trigger list

AI किसी भी user-pasted client content (intake answers, session prep notes, message excerpts, recap drafts) में इन signals के लिए देखता है:

**Suicidal ideation:**
- Passive: "wish I weren't here," "मुझे नहीं wake up करना minded," "alive होने से tired"
- Active: "सोचा कैसे मैं करूँगा," "एक plan है," "[means] का access है," intent का explicit statement

**Self-harm:**
- Current behavior recent या ongoing described
- Plans या means specified
- Previous patterns से escalation

**Others को Harm:**
- एक specific person की ओर explicit intent
- Plans, means, या timeline
- Client द्वारा threats reported (चाहे उन्होंने threats बनाए या receive किए)

**Acute psychosis indicators:**
- Hallucinations real और acted upon described
- Content में severe disorganization
- एक तरह से external forces द्वारा controlled, monitored, या harmed होने के stated beliefs जो safety को affect कर रहा है

**Active abuse disclosure:**
- Child abuse (suspected या witnessed) — ज़्यादातर jurisdictions में mandatory reporting applies (India में POCSO Act जैसा)
- Elder abuse — कई jurisdictions में mandatory reporting applies
- Intimate partner violence — current और acute (India में Domestic Violence Act)

**Substance overdose या acute medical danger:**
- Present या recent described
- Other risk factors के साथ combined

### Response template

जब AI कोई trigger detect करे, यह output करता है:

```
CRISIS FLAG — [signal type]

इस content में [specific signal — e.g., "means का access mention के
साथ passive suicidal ideation"] है। मैं इस पर routine output continue
नहीं कर रहा।

Recommended actions:
1. इसे एक clinical priority treat करें। अगर आपने पहले से नहीं किया,
   client के साथ direct human contact के लिए plan बनाएं — phone, video,
   या in-person — as soon as feasible।
2. [jurisdiction अगर known] में अपनी mandatory reporting obligations
   review करें। मैं नहीं बता सकता क्या threshold met है; यह आपका call
   है अपने regulator और supervisor के साथ।
3. अपने standard incident protocol per disclosure और अपना response
   document करें।

Suggested short message जो आप client के लिए adapt कर सकते हैं (भेजने
से पहले review):

> Hey [name],
>
> आपने जो लिखा पढ़कर, मैं आपके साथ directly check in करना चाहता हूँ।
> क्या हम आज या कल एक quick call पर आ सकते हैं? अगर आप अभी immediate
> crisis में हैं, please India में iCall (9152987821), Vandrevala
> Foundation (1860-2662-345) को call या text करें या अपने nearest
> emergency department पर जाएँ।
>
> मैं make sure करना चाहता हूँ आप supported हैं। — [Practitioner]

अगर आपने पहले से clinical action ले ली है और मुझे क्या हुआ और आपने क्या
किया document करने वाला एक clinical incident note draft करने को कहना
चाहते हैं, मुझसे वह explicitly ask करें।
```

AI crisis content पर normal session notes या coaching copy produce करना continue नहीं करता। Flag workflow रोक देता है।

### Flag क्या NOT करता

- Diagnose
- Practitioner को बताए कि confidentiality break करें
- Determine करे क्या mandatory-reporting threshold met है
- Clinical judgment replace
- Client को एक phone call replace

यह एक stop sign है। Practitioner clinical work करता है।

---

## Mandatory reporting awareness

AI aware है कि mandatory reporting exist करता है। यह नहीं जानता:
- हर jurisdiction में specific statute
- हर तरह की disclosure का threshold
- Reporting timeline (24 hours, 48 hours, immediately)
- Practitioner के region में named agency या hotline

जब mandatory-reporting territory touched हो, AI practitioner को अपने jurisdiction-specific rules check करने को prompt करता है। Triggers के examples:

- Client द्वारा disclosed child abuse या neglect (चाहे client एक child, एक parent, या एक bystander हो) (India में POCSO Act applies)
- Disclosed Elder abuse
- एक client जो खुद एक mandated reporter है एक workplace incident disclosing जिसमें एक minor का abuse involved है
- Identifiable third party को Imminent harm (US jurisdictions में Tarasoff threshold; elsewhere analogous rules)

AI का line:

> "यह आपकी jurisdiction में mandatory reporting trigger कर सकता है। Decide करने से पहले अपने regulator, supervisor, या consultation group के साथ [jurisdiction] के specific statute और timeline review करें। मैं आपके लिए यह call नहीं बना सकता।"

---

## "हम fit नहीं होंगे अगर..." — हर practice के पास policy boilerplate

इसे अपनी website service page, अपने intake response email, और अपने initial-consultation talking points में रखें।

### Coaches और trainers के लिए

```
मैं right fit नहीं हूँ अगर:

- आप active mental-health crisis में हैं और higher-intensity support
  चाहिए। Coaching / training crisis care नहीं है।
- आप diagnosis, medication, या mental-health condition के treatment
  ढूँढ रहे हैं। मैं एक licensed therapist या physician को referral में
  help कर सकता हूँ।
- आप एक specific timeline पर guaranteed outcomes की उम्मीद कर रहे हैं।
  Coaching / training collaborative work है; results vary होते हैं इस
  पर आप क्या लाते हैं उसके आधार पर।
- आप medical care के लिए एक substitute ढूँढ रहे हैं। अगर आपकी एक health
  condition है, आपको अपनी team पर एक physician चाहिए — मैं वह नहीं हूँ।

अगर ऊपर वालों में से कोई apply हो, मैं usually किसी better suited को
point कर सकता हूँ।
```

### Licensed therapists के लिए

```
मैं right fit नहीं हूँ अगर:

- आपको care का higher level चाहिए (DBT-IOP, partial hospitalization,
  inpatient)। मैं एक referral में help कर सकता हूँ।
- आप medication management ढूँढ रहे हैं — मैं एक prescriber नहीं हूँ;
  अगर वह आपको चाहिए उसका part है, हम एक psychiatrist के साथ coordinate
  करेंगे।
- आप एक specific evidence-based protocol ढूँढ रहे हैं जिसमें मैं trained
  नहीं हूँ। अगर आपको बताया गया है आपको EMDR / CPT / specific-modality
  चाहिए और वह मेरी specialty नहीं है, मैं refer कर सकता हूँ।
- आप regular weekly work करने को stable enough situation में नहीं
  हैं (housing, immediate safety)। पहले stabilize करते हैं।
```

---

## After-hours और crisis-line boilerplate

हर welcome email, intake form, और service page को question का answer देना चाहिए: "अगर मैं crisis में हूँ और session time नहीं है तो मैं क्या करूँ?"

### Standard block

```
After-hours और crisis support

मैं regular session hours के बाहर crisis support के लिए available नहीं
हूँ। अगर आप crisis में हैं:

- iCall — 9152987821 (India, call या text)
- Vandrevala Foundation — 1860-2662-345 (India, 24/7 helpline)
- आपका nearest emergency department
- 112 (India) अगर आप immediate danger में हैं

Sessions के बीच non-emergency questions के लिए, मुझे email करें और मैं
[आपका standard response window — e.g., "1 business day"] के अंदर
respond करूँगा।
```

Specific lines को अपनी jurisdiction से adapt करें। ऊपर के numbers 2026 के अनुसार India के लिए current हैं।

---

## No-show / cancellation policy boilerplate

इसे अपने intake form और fee acknowledgment में रखें।

```
Cancellation policy

मुझे cancellations या reschedules के लिए 24 hours का notice चाहिए।
Missed sessions या 24 hours के अंदर cancellations full session rate
पर billed हैं, medical emergency या मेरी discretion पर other extenuating
circumstances के cases को छोड़कर।

अगर आप no-show करते हैं, मैं check in करने को एक बार reach out करूँगा।
अगर एक हफ्ते में मुझे back नहीं सुना, मैं हमारे work को paused consider
करूँगा और session slot को rotation में put back करूँगा। आप जब ready
हों pick back up करने को reach back out करने के लिए welcome हैं।
```

---

## Bottom line

Disclaimers exist करते हैं क्योंकि:
1. वे client को protect करते हैं उन्हें क्या मिल रहा है clarify करके
2. वे practitioner को overreach के claims से protect करते हैं
3. वे scope को explicit बनाते हैं ताकि needed होने पर referrals easier हों
4. वे trust build करते हैं — readers engage करने को more likely हैं जब boundaries visible हों

AI right वालों को include करने पर defaults करता है। Practitioner edit करने के लिए welcome है। AI explicit instruction और stated reason के बिना उन्हें delete नहीं करता।
