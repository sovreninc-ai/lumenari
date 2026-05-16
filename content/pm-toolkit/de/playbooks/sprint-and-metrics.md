# Sprint-Planning- + Metrik-Review-Playbook

> Capacity-Mathe, die ehrlich ist, Sprint-Goals, die auf eine Zeile passen, und ein Metrik-Review-Format, das Readouts produziert, die Leute tatsächlich lesen.

---

## Teil 1 — Sprint-Planning

### Die Capacity-Mathe, die niemand ehrlich macht

Die meisten Teams planen zu nominellen Stunden und wundern sich dann, warum sie verfehlen. Die Mathe, die funktioniert:

```
Nominelle Stunden = Engineers × Stunden/Tag × Tage im Sprint
Abziehen:
  - PTO und Feiertage (Summe übers Team)
  - On-Call-Rotationen (10–20 % der Woche einer On-Call-Engineerin)
  - Stehende Meetings (~6 Stunden/Woche pro Engineer:in für typische Teams)
  - Spillover / Wartung / Ungeplantes (10–15 % vom Rest)

Was übrig bleibt = tatsächliche Neu-Arbeits-Capacity
```

Ein 2-Wochen-Sprint mit 4 Engineers bei 8 Stunden/Tag sieht nach 320 nominellen Stunden aus. Realität ist eher **140–180 Stunden** tatsächliche Neu-Arbeits-Capacity. Wenn dein Sprint-Plan 320 annimmt, trägst du die Hälfte der Arbeit zum nächsten Sprint.

### Der Prompt

```
Du planst mit mir einen Sprint. Regeln:

1. Starte mit Capacity-Mathe. Ich nenne Team-Größe, Sprint-Länge und
   bekannte Abwesenheiten. Du berechnest nominell → tatsächlich mit den
   Standard-Abzügen (On-Call 15 %, Meetings ~6h/Eng/Woche, Spillover 12 %).
2. Dann triagierst du Carryover vom vorherigen Sprint. Jedes Carryover-
   Item: behalten, droppen oder splitten.
3. Dann priorisierst du neue Arbeit als P0 (muss shippen), Stretch
   (falls Zeit reicht), Won't-do (expliziter Cut für diesen Sprint).
4. Sprint-Goal in einem Satz oben. Liest sauber für jemanden, der das
   Team nicht kennt.
5. Output den Sprint-Plan als: Sprint Goal → Capacity → Carryover →
   P0 → Stretch → Won't-do.
6. Kein Story-Point-Cargo-Culting. Nutze Stunden oder grobes Sizing
   (S/M/L/XL) — was das Team schon nutzt.

Stimme: direkt, spezifisch. Der Plan sollte in 60 Sekunden scannbar sein.
```

### Input-Struktur

```
[Team]
Engineers: <Anzahl + Namen, falls nützlich>
Designer:innen: <Anzahl>
PM-Zeit: <Anteil der Woche>

[Sprint]
Länge: 1 Woche / 2 Wochen
Start: <Datum>
Ende: <Datum>

[Bekannte Abwesenheiten]
- <Engineer X>: Di–Mi raus
- <Engineer Y>: erste Woche raus (Urlaub)
- On-Call diesen Sprint: <Engineer Z>

[Carryover vom letzten Sprint]
- <Item>: Status (50 % fertig / blockiert / nicht gestartet)

[Kandidaten-Arbeit für diesen Sprint]
- <Item>: grobes Sizing, wenn vorhanden
- <Item>: ...
```

### Beispiel

**Input:**

```
[Team]
4 Engineers (Alex, Beth, Carmen, Dev)
1 Designerin (Eli) — 50 % auf diesem Team diesen Sprint
PM: ich, ~30 % Capacity

[Sprint]
2 Wochen, 19. Mai – 30. Mai 2026

[Bekannte Abwesenheiten]
- Dev: Di–Mi der 1. Woche raus (3 Tage frei)
- Beth: Woche 2 raus (volle Woche Urlaub)
- On-Call: Carmen den ganzen Sprint

[Carryover vom letzten Sprint]
- Saved Searches v1 UI-Polish (~70 % fertig, blockiert auf Design-Review)
- Webhook-Retry-Observability-Dashboard (~50 % fertig, depriorisiert,
  als die Retry-Failure-Arbeit shipte)

[Kandidaten-Arbeit für diesen Sprint]
- Saved Searches v1 Launch (UI-Polish + Beta-Rollout)
- Team-shared Saves Backend (RBAC-Integration-Spike)
- First-Run-Onboarding v2 (Edge-Case-Fixes — 3 spezifische Bugs)
- Mobile-Web für „Audit Log"-View
- Customer-shared Saves UX-Erkundung (nur Design-Erkundung)
```

**Output:**

```
**Sprint-Goal:** Saved Searches v1 bis 30. Mai an Beta-Kohorte shippen.
Team-shared-Saves-Kickoff für nächsten Sprint entblocken.

**Capacity**
- Nominell: 4 Engineers × 8h × 10 Tage = 320h
- Beth Woche 2 raus: −40h
- Dev 3 Tage raus: −24h
- Carmen On-Call (15 % über Sprint): −12h
- Meetings (6h/Wo × 4 Eng × 2 Wo): −48h
- Spillover/Wartung (12 %): −24h
- **Tatsächliche Neu-Arbeits-Capacity: ~172h**

**Carryover (zuerst entscheiden)**
- Saved Searches v1 UI-Polish (~70 % fertig) → BEHALTEN. Design-Review
  geplant 20. Mai. P0 für diesen Sprint.
- Webhook-Retry-Observability-Dashboard → DROPPEN. Original-Retry-
  Failure-Arbeit geshipt; Dashboard ist nicht mehr hochpriorisiert.
  Auf Later in der Roadmap verschieben.

**P0 (committed — passt in ~140h)**
- Saved Searches v1 UI-Polish + Beta-Rollout (Alex, ~40h)
- Team-shared Saves RBAC-Integration-Spike (Beth vor Urlaub, Carmen
  führt fort, ~50h)
- First-Run-Onboarding v2 Edge-Case-Fixes — 3 spezifische Bugs
  (Dev, ~30h)
- Mobile-Web Audit-Log-View (Carmen zwischen On-Call-Arbeit, ~20h)

**Stretch (~30h Headroom, falls P0 früh fertig)**
- Customer-shared Saves UX-Erkundung mit Eli (Design, ~30h)
- Tech-Debt: Search-Backend-Latenz-Untersuchung (Alex, falls verfügbar)

**Won't-do diesen Sprint (explizit)**
- Customer-shared Saves Backend-Arbeit (wartet auf RBAC-Spike-Outcome)
- API für Saved Searches (Phase 2 — nicht in den Commitments dieses Zyklus)
- Webhook-Retry-Observability-Dashboard (depriorisiert; siehe Carryover)

**Risiken**
- Beth Woche 2 raus heißt, RBAC-Spike-Completion hängt von Carmen ab,
  die auch On-Call ist. Falls Pages spiken, rutscht der Spike.
  Mitigation: Beth front-loaded den Spike in Woche 1.
- Mobile-Web Audit-Log hängt von einer geteilten Layout-Primitive ab,
  die Alex während Saved-Searches-Polish fertigstellt. Den Handoff
  beobachten.
```

Was dieser Plan tut:

- Sprint-Goal in einem Satz oben.
- Capacity-Mathe ist explizit und konservativ.
- Carryover wird vorab entschieden (behalten / droppen / splitten).
- P0 passt komfortabel in die tatsächliche Capacity, mit Stretch-Raum.
- Won't-do ist explizit und benennt Items, die *verlockend* wären zu übernehmen.
- Risiken werden mit Mitigationen benannt, nicht begraben.

---

## Teil 2 — Metrik-Review

### Wie gut aussieht

Ein Metrik-Review ist keine Wand aus Zahlen. Es ist ein Zwei-Seiten-Dokument, das sagt:

> „Hier sind die 3–5 Metriken, die am meisten zählen. Trend, was wir denken, das es treibt, und was wir als Nächstes anschauen würden. Das Ding, das du wissen solltest: <eine spezifische Sache>."

Die meisten Metrik-Reviews failen, weil sie alles abdecken wollen. Wähle die Metriken, die für die aktuelle strategische Frage am meisten zählen, hol hoch, was sich bewegte, und ignoriere den Lärm.

### Der Prompt

```
Du fährst mit mir einen Metrik-Review. Regeln:

1. Ich gebe dir 3–7 Metriken und ihre Werte (aktueller Zeitraum,
   vorherig, Ziel falls vorhanden). Du produzierst einen Readout, eine
   Metrik nach der anderen.

2. Pro Metrik schreibe:
   - Trend: hoch / runter / flach, mit Größenordnung (z. B. „12 % hoch")
   - Verglichen mit: vorherigem Zeitraum, Ziel oder beidem
   - Hypothese: 1–2 Sätze. Was du denkst, das es treibt. Wenn nicht
     genug Info, ehrlich sagen.
   - Follow-up: was ich als Nächstes prüfen würde (Daten-Slice,
     Customer-Call, Launch-Korrelation, etc.)

3. Nach Wichtigkeit ordnen. Die Metrik, die sich am meisten bewegte
   oder strategisch am wichtigsten ist, kommt zuerst.

4. Am Ende einen Ein-Absatz-„Headline", der die Woche in 3–4 Sätzen
   zusammenfasst. Das Ding, mit dem die Exec, die das liest, weggehen
   sollte.

5. Lärm begraben. Wenn sich eine Metrik nicht bedeutsam bewegt und
   strategisch nicht relevant ist, gruppier sie unter „Flach / kein
   Signal" unten.

Stimme: direkt, kalibriert. Gehedgte Sprache („könnte", „könnte sein")
ist ok, wenn ehrlich; falsche Gewissheit vermeiden.
```

### Input-Struktur

```
[Zeitraum]
Reporting-Zeitraum: <z. B. Woche 6.–12. Mai 2026>
Verglichen mit: <vorheriges Zeitraum-Datum>

[Strategischer Kontext]
Worauf wir dieses Quartal achten (z. B. „Activation +10pp-Ziel",
„Q2-Renewal-Zyklus", „Launch Saved Searches Mitte des Monats")

[Metriken]
Pro Metrik:
- Name
- Aktueller Wert
- Vorheriger Wert
- Ziel (optional)
- Kontext (Launch diese Woche, bekannte Anomalie, etc.)
```

### Beispiel

**Input:**

```
[Zeitraum]
Woche 6.–12. Mai 2026
Verglichen mit: Woche 29. April–5. Mai

[Strategischer Kontext]
Q2-Ziel ist Activation +10pp. Wir sind bei +6pp YTD; brauchen +4pp bis
Ende Q2. Saved Searches v1 für 30. Mai geplant.

[Metriken]
- WAU: 8.420 → 8.510 (+1,1 %), kein Ziel
- Activation-Rate: 41 % → 39 % (−2pp), Ziel 47 %
- Webhook-Retry-Failures: 0,8 % → 0,3 % (−0,5pp), Ziel <1 %
- Support-Ticket-Volumen: 142 → 168 (+18 %), kein Ziel
- Netto-Neue Bezahlkund:innen: 12 → 14 (+2), Ziel 15/Woche
- Mobile-Web-Session-Anteil: 18 % → 21 % (+3pp), kein Ziel
- „Lost my view"-Tickets: 6 → 8 (+2), informelles Ziel null bis Juli
```

**Output:**

```
**Headline:** Activation rutschte diese Woche 2pp, der erste Rückgang
in sieben Wochen — der neue First-Run-Flow überrotiert vielleicht auf
die Edge-Cases, die wir letzten Sprint gepatcht haben, und wir sollten
in den Funnel graben, bevor das nächste Experiment. Webhook-Retry-
Failures sind jetzt solide unter Ziel. Saved-Searches-Launch on Track,
aber „Lost my view"-Tickets sind hochgegangen — denk dran, der Launch
ist in 18 Tagen.

---

**Activation-Rate** — RUNTER 2pp (41 % → 39 %, Ziel 47 %)
- Verglichen mit: vorheriger Woche und YTD-Trend (erster Rückgang seit
  Woche 17. März).
- Hypothese: Die First-Run-Flow-Revision, die am 30. April shipte,
  tauschte Geschwindigkeit gegen Coverage — wir fügten zwei Onboarding-
  Schritte für Edge-Cases hinzu. Verdacht: Median-Time-to-Activation
  genug verlangsamt, dass die Rate sinkt. Need to look at funnel by step.
- Follow-up: New-User-Funnel diese Woche vs. letzte ziehen; Drop-off
  pro Schritt vergleichen. Bis Freitag entscheiden, ob Schritt 4
  reverten oder iterieren.

**Support-Ticket-Volumen** — HOCH 18 % (142 → 168)
- Verglichen mit: vorheriger Woche. Kein Baseline-Ziel.
- Hypothese: Anstieg konzentriert in „Saved Views"-Kategorie — 6 → 8 —
  und in Onboarding-bezogenen Tickets (Verdacht: zusammenhängend mit
  dem Activation-Drop oben). Keine Quality-Regression; Nutzung verschoben.
- Follow-up: diese Woche Tickets nach Kategorie taggen. Falls Onboarding
  >40 % des Anstiegs ist, ist es dieselbe Root-Cause wie der Activation-Drop.

**Webhook-Retry-Failures** — RUNTER 0,5pp (0,8 % → 0,3 %, Ziel <1 %)
- Verglichen mit: vorheriger Woche und Ziel.
- Hypothese: Idempotency- + DLQ-Arbeit, die vor 2 Wochen shipte, ist
  jetzt voll wirksam. Anhaltender Rückgang, kein Ein-Wochen-Fluke.
- Follow-up: als gelöst markieren; aus wöchentlichen Metriken entfernen,
  monatlich monitoren.

**Netto-Neue Bezahlkund:innen** — HOCH 2 (12 → 14, Ziel 15/Woche)
- Verglichen mit: vorheriger Woche und Wochenziel.
- Hypothese: Nah am Ziel; nichts schreit.
- Follow-up: Diese Woche keiner. Q2-Kumulativ beobachten.

**Mobile-Web-Session-Anteil** — HOCH 3pp (18 % → 21 %)
- Verglichen mit: vorheriger Woche. Kein formelles Ziel.
- Hypothese: Mobile-Web-Parity-Launch für Top-3-Flows treibt anhaltenden
  Aufwärts. Drei der letzten vier Wochen zeigten Wachstum.
- Follow-up: Device-Class-Breakdown für nächste Woche ziehen; bestätigen
  würdig, dass das inkrementelle Nutzung ist, keine Kannibalisierung
  von Desktop-Sessions.

**Flach / kein Signal**
- WAU: +1,1 %, in normaler wöchentlicher Varianz. Keine Aktion.
- „Lost my view"-Tickets: 6 → 8. Unter Lärmschwelle für wöchentliche
  Analyse; nach Saved-Searches-Launch erneut betrachten.
```

Was dieser Readout tut:

- Headline in 3–4 Sätzen gibt der Exec die Erkenntnis ohne Scrollen.
- Metriken nach Wichtigkeit geordnet, nicht alphabetisch.
- Jede Metrik hat eine echte Hypothese, kein „wir beobachten weiter".
- Follow-ups sind spezifische Actions, keine vagen Absichten.
- Die gelöste Metrik (Webhook-Retry-Failures) wird von der wöchentlichen Liste promoviert.
- Lärm ist unter „Flach / kein Signal" begraben, sodass der Readout scannbar bleibt.

---

## Wie Sprint und Metriken zusammenarbeiten

Der Metrik-Review sollte den nächsten Sprint-Plan treiben. Wenn Activation diese Woche 2pp fiel und die Hypothese auf den First-Run-Flow zeigt, gehört diese Funnel-Untersuchung in P0 des nächsten Sprints, nicht irgendwo im Backlog.

Workflow:

1. Metrik-Review Freitag oder Montagmorgen fahren.
2. Die 1–2 Metriken identifizieren, die dich überrascht haben (positiv oder negativ).
3. Jede Überraschung in ein Follow-up wandeln: einen Daten-Pull, einen Customer-Call oder ein Experiment.
4. Die Follow-ups gehen in Sprint-Planung als P0, wenn sie tragend fürs strategische Ziel sind.

Der Job der PM ist, den Loop eng zu halten: Metriken → Hypothese → Experiment → Metriken. Sprint-Pläne, die das Signal der letzten Woche nicht reflektieren, sind, wie Teams driften.
