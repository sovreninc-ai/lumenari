# PRD- + Roadmap-Templates

> Die PRD-Form, die du 80 % der Zeit nutzt, plus der Now/Next/Later-Roadmap-Drafter, der einen chaotischen Backlog in priorisierte Buckets verwandelt.

---

## Teil 1 — Die PRD

### Die Form

```
# PRD — <Feature-Name> (v0.x, <Autor:in>, <Datum>)

## Problem
Was kaputt ist, für wen, in klarer Sprache. Zitiere eine:n Nutzer:in, wenn möglich.

## Goal
Das eine Outcome, für das diese Arbeit ist. Ein Satz.

## Non-Goals
Explizite Liste, was diese Arbeit NICHT tut. Grund pro Item („Phase 2",
„separater Workstream", „bewegt die Metrik nicht, die uns kümmert").

## Success Metrics
Woher wir wissen, dass es funktioniert hat. Zielzahlen. Zeitfenster.

## Acceptance Criteria
Wie „done" aussieht. Bullet-Punkte, testbar.

## Scope
**In:** der Slice, den wir bauen
**Out:** explizite Cuts
**Stretch:** falls Zeit reicht

## Open Questions
Was du noch nicht weißt. Jede mit Deadline oder Owner.
```

Das war's. Kein Mission Statement. Kein Competitive-Analysis-Abschnitt, außer einer trägt wirklich. Kein „User Persona"-Füller, wenn das Team die Nutzer:innen schon kennt.

### Der Prompt

```
Du draftest eine PRD. Regeln:

1. Doc-Länge passt zur Feature-Größe. Ein 2-Tages-Feature bekommt eine
   1-seitige PRD. Eine 2-Quartals-Initiative bekommt 3–5 Seiten. Keine
   12-seitigen PRDs für kleine Arbeit.
2. Nutze die Form oben, in Reihenfolge: Problem → Goal → Non-Goals →
   Success Metrics → Acceptance Criteria → Scope → Open Questions.
3. Die Non-Goals-Sektion ist erforderlich und leistet echte Arbeit.
   Jeder Eintrag hat einen Ein-Zeilen-Grund. Wenn ein Non-Goal eine
   echte Phase-2-Entscheidung ist, verlinke zu Open Questions.
4. Success Metrics haben Zahlen und Zeitfenster. „Adoption steigt" ist
   keine Metrik. „25 % der WAU erstellen einen Saved Search in 60 Tagen"
   ist eine.
5. Acceptance Criteria sind Bullet-Punkte, testbar, so geschrieben, dass
   Engineering sie als Definition of Done nutzen kann.
6. Scope hat In / Out / Stretch. Die Out-Liste fängt „aber was ist mit"-
   Fragen im Voraus ab.
7. Open Questions nennen den/die Entscheider:in oder die Deadline. „TBD"
   reicht nicht.
8. Stimme: direkt, spezifisch, leicht müde. Kein „leverage", „unlock",
   „double down", „transform". Kein „I hope this finds you well".

Output nur die PRD. Kein Kommentar, außer ich frage danach.
```

### Input-Struktur

```
[Die Arbeit]
Feature: <Name>
Zielnutzer:in: <wer> (spezifisch — Rolle, Kundengröße, Segment)

[Status / Context]
Stage: Idee / skizziert / im Bau / im Ship
Signal: Research / Tickets / Exec-Push / Metrik-Trend / Wettbewerb
Audience für die PRD: Eng / Leadership / Sales

[Rohmaterial]
Bullets, Slack-Thread, Meeting-Notizen, frühere PRD. Unformatiert ok.

[Constraints]
- Doc-Länge
- Ton
- Bereits getroffene Entscheidungen (nicht neu verhandeln)
- Explizit NICHT getroffene (als Open Questions markieren)
```

---

### Beispiel — „Saved Searches"-PRD

**Input:**

```
[Die Arbeit]
Feature: Saved Searches in unserem SaaS-Dashboard
Zielnutzer:in: Power-User:innen — Ops- und Analytics-Rollen bei unseren
Kund:innen, typischerweise 10–50-Personen-Teams, die das Dashboard täglich nutzen.

[Status / Context]
Stage: skizziert. In 6 Customer-Calls über 8 Wochen gehört, 12 Support-
Tickets im selben Zeitraum. Noch kein Design.
Audience: Engineering-Lead + 2 IC-Engineers + Design.

[Rohmaterial]
- Kund:innen wollen eine gefilterte View speichern und zurückkommen
- Sie wollen sie benennen
- Sie wollen sie mit dem Team teilen (manche, nicht alle)
- Sie wollen benachrichtigt werden bei Änderung (manche, nicht alle)
- Manche per API; die meisten per UI
- Aktueller Workaround: URL mit Query-Params bookmarken — fragil,
  bricht, wenn wir URL-Struktur ändern

[Constraints]
- 1–2 Seiten
- Ton: scrappy, intern
- Entschieden: das ist im Dashboard, keine separate Seite
- Entschieden: persönliche Saves zuerst; Team-shared ist Phase 2
- Offen: Notifications bei Änderung — Phase 1 oder 2?
```

**Output (Ausschnitt):**

```
# PRD — Saved Searches (v0.5, Alex, 2026-05-14)

## Problem
Power-User:innen — Ops- und Analytics-Rollen bei unseren Kund:innen —
laufen dieselben gefilterten Queries mehrfach pro Woche. Heute bookmarken
sie URLs, die brechen, wenn wir Query-Param-Strukturen updaten. Wir
haben das in 6 Customer-Calls und 12 Tickets über die letzten 8 Wochen
gehört.

Zitat (Maya, Ops-Lead bei <Customer>): „Ich baue jeden Montag denselben
Filter neu. Ich habe Bookmarks aufgegeben, weil die Hälfte nach eurem
letzten Release nicht mehr funktionierte."

## Goal
„Ich habe meine gefilterte View verloren"-Friction für Power-User:innen
reduzieren. Konkret: ein:e Nutzer:in kann eine benannte gefilterte View
speichern, zurückkommen und (Phase 2) teilen.

## Non-Goals
- Team-shared Saved Searches → Phase 2. Siehe Open Questions.
- API-first Saved Searches → Phase 2. Die meiste Nachfrage ist UI.
- Cross-Product Saved Searches (Dashboard + Reports) → out of scope;
  separater Workstream.
- Saved-Search-Analytics (welche Saves am meisten genutzt) → Phase 2.

## Success Metrics
- 25 % der weekly active Dashboard-Nutzer:innen erstellen mindestens
  einen Saved Search innerhalb 60 Tagen nach Launch
- „Lost my view"-Support-Ticket-Kategorie sinkt 50 % im selben
  60-Tage-Fenster (Baseline: ~24/Monat über Q1 2026)
- Median Saved Searches pro aktive Power-User:in ≥2 bis Tag 30

## Acceptance Criteria
- Nutzer:in kann die aktuelle gefilterte View mit einer Ein-Klick-
  „Save this view"-Aktion im Dashboard speichern
- Saved View wird benannt (Default = Auto-Summary der Filter; editierbar)
- Saved Views erscheinen in einer Left-Rail-„My saved views"-Sektion
- Erneutes Öffnen stellt exakten Filter-State wieder her, unabhängig
  von URL-Änderungen
- Saved Views werden als Filter-JSON gespeichert, keine URL-Strings
- Bis zu 50 Saved Views pro Nutzer:in; über dem Limit klare Fehlermeldung

## Scope
**In:** Personal Saves; nur UI; benannt; wiederherstellbar. 50/User Cap.
**Out:** Team-shared. API. Notifications. Cross-Product.
**Stretch:** Soft Delete + Restore für versehentlich gelöschte Saves.

## Open Questions
1. Notifications bei Änderung → Phase 1 oder 2?
   Empfehlung: Phase 2. Fügt eine Change-Detection-Schicht hinzu, die
   der Core-Save/Restore-Loop nicht braucht. Entscheider:in: <PM> bis
   2026-05-21.
2. Storage-Limit pro Nutzer:in — 50 fühlte sich richtig an; keine
   echten Daten. Offen für Anpassung basierend auf Engineering-Feedback.
3. Migration-Policy, wenn eine zugrundeliegende Filter-Spalte umbenannt
   oder entfernt wird. Entscheider:in: <Eng-Lead> + <PM>, vor Kickoff.
```

Was diese PRD tut:

- Zitiert eine:n echte:n Nutzer:in in der Problem-Sektion.
- Non-Goals leistet das schwere Heben — vier explizite Cuts, jeder mit Grund.
- Success Metrics haben Zahlen, Baselines und Zeitfenster.
- Acceptance Criteria sind testbar.
- Scopes „Out"-Sektion fängt „aber was ist mit"-Fragen im Voraus ab.
- Open Questions haben Entscheider:innen und Deadlines.

Das sind 700 Wörter auf einer 1–2-Seiten-PRD. Richtig dimensioniert für die Arbeit.

---

## Teil 2 — Now / Next / Later Roadmap

### Der Prompt

```
Du updatest eine Now/Next/Later-Roadmap. Regeln:

1. Drei Spalten: Now, Next, Later. Nichts anderes.
2. Jedes Item ist ein Outcome (z. B. „'Lost my view'-Tickets um 50 %
   senken"), kein Feature-Name. Feature-Name in Klammern.
3. Jedes Item hat ein Quartal und eine Confidence (High / Med / Low).
   Confidence ist ehrlich. Bewerte nicht alles als High.
4. „Now" = committed, in Progress.
5. „Next" = committed für den kommenden Zyklus.
6. „Later" = auf dem Radar, nicht committed.
7. Wenn die Nutzerin vorschlägt, ein Item von Later zu Now zu schieben
   ohne entsprechenden Cut, drück zurück: „Was in Now zieht aus?"
8. Output die Roadmap als Markdown-Tabelle. Ein Absatz darunter, der
   erklärt, was sich seit letztem Zyklus änderte.

Stimme: direkt, spezifisch. Kein „bald" ohne Quartal. Keine vagen Verben.
```

### Input-Struktur

```
[Aktuelle Roadmap]
Bestehende Now / Next / Later einfügen oder verbal beschreiben.

[Was sich änderte]
- Neue Initiativen, die hinzukommen
- Initiativen, die geshipt haben
- Initiativen, die rutschen oder depriorisiert werden
- Strategischer Kontext (ein Kund:innen-Commitment, ein Wettbewerber-Zug,
  eine Capacity-Änderung, etc.)

[Constraints]
- Quartals-Horizont (1–2 Quartale typisch)
- Team-Capacity-Realität (große Änderungen vom vorherigen Zyklus?)
- Audience (internes Team, Leadership, Sales-facing)
```

### Beispiel

**Input:**

```
[Aktuelle Roadmap]
Now:
- Onboarding-Completion +10pp (überarbeiteter First-Run-Flow) — Q2 26, High
- „Lost my view"-Tickets um 50 % senken (Saved Searches v1) — Q2 26, High

Next:
- Mobile-Web-Parity für Top-5-Dashboard-Flows — Q3 26, Med
- Power-User-Retention +5pp (Team-shared Saves + API) — Q3 26, Med

Later:
- In-Product-Analytics für Kund:innen-side Admins — Q4 26, Low
- API-Rate-Limit-Dashboard für Kund:innen-Engineers — Q4 26, Low

[Was sich änderte]
- Onboarding-Arbeit ist on Track, aber trendet zu Med, nicht High — wir
  finden mehr Edge-Cases im First-Run-Flow als erwartet.
- Eine Top-3-Kundin hat ihre Verlängerung an Team-shared Saves
  in Q3 geknüpft. Wir müssen das nach vorne ziehen.
- Wir haben dieses Quartal eine Engineerin verloren. Capacity ~20 % runter.

[Constraints]
- 2-Quartals-Horizont
- Audience: Leadership-Readout
```

**Output:**

```
| Bucket | Outcome | Quarter | Confidence |
|--------|---------|---------|------------|
| Now    | „Lost my view"-Tickets um 50 % senken (Saved Searches v1)   | Q2 26 | High |
| Now    | Onboarding-Completion +10pp (First-Run-Flow)                | Q2 26 | Med  |
| Next   | Power-User-Retention +5pp (Team-shared Saves + API)         | Q3 26 | Med  |
| Next   | Mobile-Web-Parity für Top-5-Dashboard-Flows                 | Q3 26 | Low  |
| Later  | In-Product-Analytics für Kund:innen-side Admins             | Q4 26 | Low  |
| Later  | API-Rate-Limit-Dashboard für Kund:innen-Engineers           | Q4 26 | Low  |

**Was sich änderte:** Onboarding von High auf Med Confidence —
First-Run-Flow hat mehr Edge-Cases als erwartet. Team-shared Saves
bleibt in Next (Q3), ist aber jetzt ein Vertrags-Commitment für die
Verlängerung einer Top-3-Kundin, also Priorität für Q3, selbst auf
Kosten von Mobile-Web-Parity (jetzt Low Confidence wegen des ~20 %-
Capacity-Verlusts durch den Engineer-Abgang). Empfehlung: Mobile-Web
in Q4 erneut betrachten, außer wir backfillen.
```

Was dieser Output tut:

- Ehrlich zu Confidence. Onboarding fiel auf Med wegen neuer Edge-Cases.
- Hebt die customer-contingent Verlängerung als Grund für die Team-shared-Saves-Priorisierung.
- Benennt den Capacity-Hit und seine Konsequenzen schlicht.
- Tut nicht so, als könne das Team den Verlust ohne Tradeoff absorbieren.

---

## Wann die PRD überspringen

Nicht jedes Feature braucht eine PRD. Überspringen, wenn:

- Die Arbeit <2 Tage ist und das Team die Nutzer:in schon versteht.
- Die Arbeit ein Bugfix oder ein kleines Refactor ist.
- Die Arbeit gründlich in einem Design-Doc diskutiert wurde, und die PRD nur zusammenfassen würde.

Wann PRD überspringen, aber das Artefakt behalten: schreib stattdessen ein 3-Bullet „was + warum + woher wissen wir's". Auch kleine Arbeit profitiert von einem geschriebenen Outcome-Statement.
