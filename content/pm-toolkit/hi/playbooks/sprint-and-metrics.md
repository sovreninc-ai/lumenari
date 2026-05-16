# Sprint Planning + Metrics Review Playbook

> Capacity math जो honest है, sprint goals जो एक line पर fit हों, और एक metrics-review format जो ऐसे readouts produce करे जो लोग actually पढ़ें।

---

## Part 1 — Sprint planning

### Capacity math जो कोई honestly नहीं करता

ज़्यादातर teams nominal hours पर plan करती हैं, फिर wonder करती हैं क्यों miss हुई। Math जो काम करती है:

```
Nominal hours = engineers × hours/day × sprint में days
Subtract:
  - PTO और holidays (team across sum)
  - On-call rotations (एक on-call engineer के week का 10-20%)
  - Standing meetings (~6 hours/week per engineer typical teams के लिए)
  - Spillover / maintenance / unplanned (remaining का 10-15%)

क्या बचता है = actual new-work capacity
```

A 2-week sprint with 4 engineers at 8 hours/day 320 nominal hours जैसा दिखता है। Reality **140-180 hours** actual new-work capacity के closer है। अगर आपका sprint plan 320 assume करता है, आप work का आधा next sprint तक carry करेंगे।

### Prompt

```
आप मेरे साथ एक sprint plan कर रहे हैं। Rules:

1. Capacity math से start करें। मैं आपको team size, sprint length, और
   known absences बताऊँगा। आप standard deductions use करके nominal →
   actual capacity compute करेंगे (on-call 15%, meetings ~6h/eng/week,
   spillover 12%)।
2. फिर prior sprint से carryover triage करें। हर carryover item: keep,
   drop, या split।
3. फिर new work को prioritize करें as P0 (must ship), Stretch (अगर time
   allows), Won't-do (इस sprint के लिए explicit cut)।
4. Sprint goal एक sentence में top पर। किसी ऐसे को जो team को नहीं जानता
   cleanly पढ़े।
5. Sprint plan output करें as: Sprint Goal → Capacity → Carryover →
   P0 → Stretch → Won't-do।
6. कोई story-point cargo culting नहीं। Hours या rough sizing (S/M/L/XL)
   use करें — जो भी team पहले से use करती है।

Voice: direct, specific। Plan 60 seconds में scannable होना चाहिए।
```

### Input shape

```
[Team]
Engineers: <count + names अगर useful>
Designers: <count>
PM time: <week का fraction>

[Sprint]
Length: 1 week / 2 weeks
Start: <date>
End: <date>

[Known absences]
- <Engineer X>: Tue-Wed out
- <Engineer Y>: पूरे पहले week out (vacation)
- इस sprint on-call: <Engineer Z>

[पिछले sprint से carryover]
- <Item>: status (50% complete / blocked / didn't start)

[इस sprint के लिए candidate work]
- <Item>: rough sizing अगर है
- <Item>: ...
```

### Worked example

**Input:**

```
[Team]
4 engineers (Alex, Beth, Carmen, Dev)
1 designer (Eli) — इस sprint इस team पर 50%
PM: मैं, ~30% capacity

[Sprint]
2 weeks, May 19 - May 30, 2026

[Known absences]
- Dev: week 1 के Tue-Wed out (3 days off)
- Beth: week 2 out (full week vacation)
- On-call: Carmen पूरा sprint

[पिछले sprint से carryover]
- Saved Searches v1 UI polish (~70% done, design review पर blocked)
- Webhook retry observability dashboard (~50% done, retry-failure work
  ship होने पर deprioritized)

[इस sprint के लिए candidate work]
- Saved Searches v1 launch (UI polish + beta rollout)
- Team-shared saves backend (RBAC integration spike)
- First-run onboarding v2 (edge case fixes — 3 specific bugs)
- "Audit Log" view के लिए mobile-web
- Customer-shared saves UX exploration (सिर्फ design exploration)
```

**Output:**

```
**Sprint Goal:** May 30 तक beta cohort को Saved Searches v1 ship।
अगले sprint के लिए Team-shared saves kickoff unblock।

**Capacity**
- Nominal: 4 engineers × 8h × 10 days = 320h
- Beth week 2 out: −40h
- Dev 3 days out: −24h
- Carmen sprint across on-call (15%): −12h
- Meetings (6h/wk × 4 eng × 2 wks): −48h
- Spillover/maintenance (12%): −24h
- **Actual new-work capacity: ~172h**

**Carryover (पहले decide)**
- Saved Searches v1 UI polish (~70% done) → KEEP। Design review
  May 20 को scheduled। इस sprint के लिए P0।
- Webhook retry observability dashboard → DROP। Original retry-failure
  work shipped; dashboard high-priority नहीं रहा। Roadmap पर Later
  में move।

**P0 (committed — ~140h में fits)**
- Saved Searches v1 UI polish + beta rollout (Alex, ~40h)
- Team-shared saves RBAC integration spike (Beth vacation से पहले,
  Carmen continues, ~50h)
- First-run onboarding v2 edge case fixes — 3 specific bugs
  (Dev, ~30h)
- Mobile-web Audit Log view (Carmen on-call work के बीच, ~20h)

**Stretch (~30h headroom अगर P0 जल्दी finish हो)**
- Eli के साथ Customer-shared saves UX exploration (design, ~30h)
- Tech-debt: search backend latency investigation (Alex अगर available)

**Won't-do इस sprint (explicit)**
- Customer-shared saves backend work (RBAC spike outcome पर waiting)
- Saved Searches के लिए API (Phase 2 — इस cycle की commitments में नहीं)
- Webhook retry observability dashboard (deprioritized; Carryover देखें)

**Risks**
- Beth week 2 out means RBAC spike completion Carmen पर depends है,
  जो on-call भी है। अगर pages spike, spike slip। Mitigation: Beth
  week 1 में spike front-load करती है।
- Mobile-web Audit Log एक shared layout primitive पर depends है जो
  Alex Saved Searches polish के दौरान finish कर रहा है। Handoff watch।
```

यह plan क्या करता है:

- Top पर एक sentence में sprint goal।
- Capacity math explicit और conservative है।
- Carryover up front decided है (keep / drop / split)।
- P0 actual capacity के अंदर comfortably fit, stretch room के साथ।
- Won't-do explicit है, items name करता है जो *take on करने को tempting* होते।
- Risks mitigations के साथ named हैं, buried नहीं।

---

## Part 2 — Metrics review

### Good कैसा दिखता है

एक metrics review numbers की एक wall नहीं है। यह एक two-page document है जो कहता है:

> "यहाँ 3-5 metrics हैं जो सबसे matter करते हैं। हर एक का trend, हम क्या सोचते हैं इसे drive कर रहा है, और हम next क्या देखेंगे। आपको जानने वाली thing: <एक specific thing>।"

ज़्यादातर metrics reviews सब cover करने की कोशिश से fail होते हैं। वे metrics pick करें जो current strategic question के लिए सबसे matter करते हैं, surface करें क्या move हुआ, और noise ignore करें।

### Prompt

```
आप मेरे साथ एक metrics review run कर रहे हैं। Rules:

1. मैं आपको 3-7 metrics और उनके values (current period, prior period,
   target अगर है) दूँगा। आप एक readout produce करेंगे, एक metric at a time।

2. हर metric के लिए, लिखें:
   - Trend: up / down / flat, magnitude के साथ (e.g., "up 12%")
   - Compared to: prior period, target, या दोनों
   - Hypothesis: 1-2 sentences। आप क्या सोचते हैं इसे drive कर रहा है।
     अगर hypothesize करने के लिए काफी info नहीं, honestly कहें।
   - Follow-up: मैं next क्या check करना चाहूँगा (data का एक slice,
     एक customer call, एक launch correlation, आदि)।

3. Importance से order करें। Metric जो सबसे move हुआ या current strategy
   के लिए सबसे matter करता है पहले जाए।

4. End पर, एक one-paragraph "headline" लिखें जो week को 3-4 sentences
   में summarize करे। वह thing जो इसे पढ़ने वाला exec walk away करते
   हुए जानता।

5. Noise bury करें। अगर एक metric meaningfully move नहीं हुआ और
   strategically relevant नहीं, इसे bottom पर "Flat / no signal" के
   under group करें।

Voice: direct, calibrated। Hedged language ("might," "could be") fine
है जब honest; false certainty avoid करें।
```

### Input shape

```
[Period]
Reporting period: <e.g., May 6-12, 2026 का week>
Compared to: <prior period dates>

[Strategic context]
इस quarter हम क्या attention दे रहे हैं (e.g., "activation +10pp goal,"
"Q2 renewal cycle," "mid-month Saved Searches launch")

[Metrics]
हर metric के लिए:
- Name
- Current value
- Prior value
- Target (optional)
- कोई भी context आप चाहेंगे (इस हफ्ते एक launch, एक known anomaly, आदि)
```

### Worked example

**Input:**

```
[Period]
May 6 - May 12, 2026 का Week
Compared to: Apr 29 - May 5 का Week

[Strategic context]
Q2 goal है activation +10pp। हम YTD पर +6pp हैं; Q2 end तक +4pp चाहिए।
Saved Searches v1 May 30 के लिए scheduled है।

[Metrics]
- WAU: 8,420 → 8,510 (+1.1%), no target
- Activation rate: 41% → 39% (-2pp), target 47%
- Webhook retry failures: 0.8% → 0.3% (-0.5pp), target <1%
- Support ticket volume: 142 → 168 (+18%), no target
- Net new paid customers: 12 → 14 (+2), target 15/wk
- Mobile-web session share: 18% → 21% (+3pp), no target
- "Lost my view" tickets: 6 → 8 (+2), informal target July तक zero
```

**Output:**

```
**Headline:** Activation इस हफ्ते 2pp slip हुआ, सात हफ्तों में पहली
decline — new first-run flow उन edge cases पर over-rotate हो रहा होगा
जो हमने last sprint patch किए, और हमें next experiment से पहले funnel
में dig करना चाहिए। Webhook retry failures अब solidly target के नीचे
हैं। Saved Searches launch on track, पर "lost my view" tickets tick
up हुए — याद रखें launch 18 days दूर है।

---

**Activation rate** — DOWN 2pp (41% → 39%, target 47%)
- Compared to: prior week और YTD trend (यह Mar 17 के week से पहली
  decline है)।
- Hypothesis: Apr 30 को shipped first-run flow revision ने speed
  को coverage के लिए trade किया — हमने edge cases handle करने को
  दो onboarding steps add किए। Suspect हम median time-to-activation
  को इतना slow कर चुके हैं कि rate drop करे। Step द्वारा funnel देखने
  की ज़रूरत।
- Follow-up: इस हफ्ते vs। last के लिए new-user funnel pull करें; step
  द्वारा drop-off compare करें। Friday तक decide करें क्या step 4
  revert करें या iterate।

**Support ticket volume** — UP 18% (142 → 168)
- Compared to: prior week। कोई baseline target नहीं।
- Hypothesis: Increase "Saved Views" category में concentrated है —
  6 → 8 — और onboarding-related tickets में (suspect ऊपर के activation
  drop से related)। Quality regression नहीं; usage shifting।
- Follow-up: इस हफ्ते के tickets category से tag करें। अगर onboarding
  increase का >40% है, यह activation drop के same root cause है।

**Webhook retry failures** — DOWN 0.5pp (0.8% → 0.3%, target <1%)
- Compared to: prior week और target।
- Hypothesis: 2 weeks पहले shipped Idempotency + DLQ work अब full effect
  में है। Sustained drop, one-week fluke नहीं।
- Follow-up: Resolved mark करें; weekly metrics से remove करें, monthly
  आगे monitor।

**Net new paid customers** — UP 2 (12 → 14, target 15/wk)
- Compared to: prior week और weekly target।
- Hypothesis: Target के close; कुछ screaming नहीं।
- Follow-up: इस हफ्ते कोई नहीं। Q2 cumulative देखें।

**Mobile-web session share** — UP 3pp (18% → 21%)
- Compared to: prior week। कोई formal target नहीं।
- Hypothesis: Top-3 flows के लिए mobile-web parity launch sustained
  uptick drive कर रहा है। Last four weeks में से तीन ने growth दिखाई।
- Follow-up: next week के review के लिए device-class breakdown pull
  करें; confirm करने लायक यह incremental usage है, desktop sessions
  की cannibalization नहीं।

**Flat / no signal**
- WAU: +1.1%, normal weekly variance के अंदर। कोई action नहीं।
- "Lost my view" tickets: 6 → 8। Weekly analysis के लिए noise threshold
  के नीचे; Saved Searches launch के बाद revisit।
```

यह readout क्या करता है:

- 3-4 sentences में headline exec को scroll किए बिना takeaway देता है।
- Metrics importance से ordered हैं, alphabet नहीं।
- हर metric का एक real hypothesis है, "we'll keep monitoring" नहीं।
- Follow-ups specific actions हैं, vague intentions नहीं।
- Resolved हो गया metric (webhook retry failures) weekly list से promote off होता है।
- Noise "Flat / no signal" के under buried है ताकि readout scannable रहे।

---

## Sprint और metrics कैसे साथ काम करते हैं

Metrics review अगले sprint plan को drive करना चाहिए। अगर activation इस हफ्ते 2pp drop हुआ और hypothesis first-run flow को point करता है, वह funnel investigation अगले sprint के P0 में जाए, backlog पर कहीं नहीं।

Workflow:

1. Friday या Monday morning metrics review run करें।
2. 1-2 metrics identify करें जिन्होंने आपको surprise किया (positively या negatively)।
3. हर surprise को एक follow-up में convert करें: एक data pull, एक customer call, या एक experiment।
4. Follow-ups sprint planning में P0 items के रूप में जाते हैं अगर वे strategic goal के लिए load-bearing हैं।

PM का job loop tight रखना है: metrics → hypothesis → experiment → metrics। Sprint plans जो last week के signal को reflect नहीं करते वे यूँ teams drift करती हैं।
