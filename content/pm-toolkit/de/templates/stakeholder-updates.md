# Stakeholder-Update-Templates

> Drei Varianten, gleiches Skelett: Exec-Brief, Engineering-Detail, Customer-Facing. Dieselbe Arbeitswoche komprimiert für drei verschiedene Audiences.

---

## Das Skelett (alle drei Varianten teilen es)

1. **Status** — ein Wort (Grün / Gelb / Rot) plus ein Satz
2. **Was geshipt wurde** — Outcomes, keine Features
3. **Was als Nächstes** — committed Items für den kommenden Zyklus
4. **In Gefahr** — ehrlich zu dem, was rutschen könnte
5. **Die Bitte** — eine spezifische Sache, die du von dieser Audience brauchst

Die Unterschiede zwischen Varianten:

- **Länge:** 200 / 400 / 150 Wörter
- **Vokabular:** interner Jargon ok in Exec und Eng; nie in Customer-Facing
- **Tiefe bei Blockers:** Exec bekommt die Schlagzeile; Eng bekommt die Details; Customer-Facing lässt sie meist weg
- **Die Bitte:** Exec bittet um Entscheidung/Headcount/Intro; Eng bittet um Priorisierung oder Unblock; Customer bittet um Feedback oder Beta-Teilnahme

---

## Variante 1 — Exec-Brief (~200 Wörter)

### Der Prompt

```
Du schreibst ein Executive-Stakeholder-Update. Regeln:

1. ~200 Wörter. Hartes Cap: 250.
2. Führ mit Status als einzelnem Wort: Grün / Gelb / Rot. Dann ein
   Satz, warum.
3. „Was geshipt wurde" sind Outcomes, keine Features. „'Lost my view'-
   Tickets in 30 Tagen um 47 % gesenkt" statt „Saved Searches v1 geshipt".
4. „In Gefahr" ist ehrlich. Falls etwas rutschen könnte, sag es und warum.
5. Beende mit einer spezifischen Bitte. „Brauche Entscheidung zu X bis Y."
   Nicht „Sag Bescheid bei Fragen".
6. Kein „I hope this email finds you well". Kein „circling back".
7. Stimme: direkt, ruhig, spezifisch. Zahlen, wo du sie hast.

Output nur das Update.
```

### Beispiel

```
**Status: Gelb** — Saved-Searches-Launch on Track für 30. Mai;
Onboarding-Arbeit rutscht ~2 Wochen wegen Edge-Case-Entdeckung.

**Was diesen Zeitraum geshipt wurde**
- Webhook-Retry-Failures um 78 % gesenkt (langjährige P1-Incident-
  Kategorie geschlossen)
- Mobile-Web-Parity für die Top-3-Dashboard-Flows
- Activation +3pp aus dem neuen First-Touch-Tooltip-Experiment

**Was als Nächstes (nächste 2 Wochen)**
- Saved Searches v1 → ships 30. Mai, zuerst Beta mit 4 Kund:innen
- Onboarding-Revision v2 → angepasst an die neuen Edge-Cases
- Team-shared Saves → Kickoff 28. Mai (committed in <Customer X>-Verlängerung)

**In Gefahr**
- Onboarding-Completion-Ziel (+10pp) — von Q2 auf frühes Q3 verschoben
  wegen First-Run-Edge-Cases. Mitigation: v2 mit den höchsten Impact-
  Edges shippen; Rest in Q3.
- Mobile-Web-Parity für die verbleibenden 2 Flows rutscht nach Q4, außer
  wir backfillen den verlorenen Engineering-Sitz.

**Bitte**
Brauche Entscheidung bis Freitag, ob der offene Engineering-Sitz
backfilled wird oder den Mobile-Web-Slip nach Q4 akzeptieren. Beide
Wege funktionieren; ich würde die Ambiguität lieber nicht in die
Team-Planung nächste Woche tragen.
```

Beachte, was passiert:

- Status ist Gelb, nicht Grün. Die PM ist ehrlich.
- „Was geshipt wurde" sind drei Zeilen, jede ein Outcome mit einer Zahl.
- „In Gefahr" sind echte Risiken mit Mitigationen, kein Boilerplate.
- Die Bitte ist spezifisch — eine Entscheidung, mit Datum, mit gerahmten Optionen.

Etwa 200 Wörter. Ein:e Exec kann es in 45 Sekunden scannen.

---

## Variante 2 — Engineering-Detail (~400 Wörter)

### Der Prompt

```
Du schreibst ein Engineering-Team-Stakeholder-Update. Regeln:

1. ~400 Wörter. Hartes Cap: 500.
2. Gleiches Skelett wie Exec-Brief, plus:
   - Blockers (technisch oder organisatorisch), mit Vorschlagspfaden
   - Dependencies auf andere Teams
   - Entscheidungen, die das Team anfragt, mit Optionen + Empfehlung
3. Technisches Vokabular ist ok. Verdumme nicht für Engineering.
4. Gleiche „Führ mit Status"-Disziplin. Gelb ist Gelb.
5. Beende mit der Bitte. Engineering-relevant: Priorisierungs-Call,
   Unblock, Tradeoff-Entscheidung.

Output nur das Update.
```

### Beispiel

```
**Status: Gelb** — Saved Searches on Track für 30. Mai; Onboarding-
Arbeit rutscht ~2 Wochen; eine Cross-Team-Dependency in Gefahr.

**Diesen Zeitraum geshipt (Outcomes + Wie)**
- Webhook-Retry-Failures um 78 % gesenkt: Idempotency-Keys + Dead-
  Letter-Queue eingeführt. Stripe-Support bestätigte, dass das Pattern
  ihrer Empfehlung entspricht. P1-Page-Volumen 12/Monat → 3/Monat.
- Mobile-Web-Parity für Top-3-Flows: Dashboard-Layout-Primitive auf
  CSS Grid refaktoriert; löste den langjährigen Tablet-Breakpoint-Bug
  als Seiteneffekt.
- Activation +3pp: A/B-Test auf First-Touch-Tooltip schloss bei 95 %
  Confidence. Variante B (kontextuell statt Begrüßung) gewann.

**Aktuell im Bau**
- Saved Searches v1 — Backend komplett; UI 80 %. Filter-JSON-Storage-
  Pattern gegen die 12 meistgenutzten Query-Shapes validiert. Beta-
  Kohorte gewählt: 4 Kund:innen, alle Power-User, Opt-in.
- Onboarding v2 — Scope angepasst, höchste-Impact-Edges zuerst.
  Drei Edge-Cases bleiben für Q3.

**Blockers und Dependencies**
- Team-shared-Saves-Kickoff ist abhängig vom Permissions-Team, das das
  neue RBAC-Primitive shipt (ETA: 25. Mai). Wöchentlich getrackt.
  Fallback: Team-shared Saves mit einem simpleren All-or-Nothing-Share-
  Modell shippen, refaktorieren zu fine-grained, wenn RBAC landet.
- Search-Backend-Latenz bei p95 ist über Q1 um 18 % gestiegen — noch
  nicht user-impacting, aber trendet. Vorschlag: eine Engineer-Woche
  zur Untersuchung, bevor es zum Q3-Fire wird.

**Nötige Entscheidungen**
1. Den offenen Engineering-Sitz in Q2 backfillen oder den Mobile-Web-
   Slip nach Q4 akzeptieren? Empfehlung: backfillen. Mobile-Web ist in
   2 von 4 Top-Renewal-Customer-Wünschen für H2.
2. Team-shared Saves mit Fallback-All-or-Nothing-Share-Modell, falls
   RBAC rutscht? Empfehlung: ja. Customer-Commitment ist für Q3, und
   die Refactor-Kosten sind ~3 Tage, wenn RBAC landet.

**Bitte**
Brauche die zwei Entscheidungen oben bis Freitag. Beide formen den
nächsten Sprint-Plan.
```

Was anders ist vom Exec-Brief:

- Inkludiert, wie die Arbeit geshipt wurde, nicht nur das Outcome.
- Hebt einen Latenz-Trend, der noch nicht user-impacting ist — Engineering-Signal, kein Exec-Signal.
- Rahmt Entscheidungen mit Optionen und einer Empfehlung, nicht als offene Fragen.
- Die Bitte nennt spezifische Entscheidungen und ein Datum.

---

## Variante 3 — Customer-Facing (~150 Wörter)

### Der Prompt

```
Du schreibst ein Customer-Facing-Update. Regeln:

1. ~150 Wörter. Hartes Cap: 200.
2. Klare Sprache. Kein interner Jargon. Keine Metrik-Callouts, die der
   Kund:in egal sind.
3. Führ mit dem, was die Kund:in jetzt nutzen kann (das geshipte Ding).
4. „Was kommt" mit Monatsgranularität maximal. Keine Commitments zu
   exakten Daten.
5. Ein Kanal für Feedback. Leicht zu nutzen.
6. Keine Statusfarben. Keine „In Gefahr"-Sprache. Wenn etwas der Kund:in
   wichtig ist, positiv rahmen oder weglassen.
7. Stimme: warm, aber nicht überschwänglich. Selbstbewusst, nicht pushy.

Output nur das Update.
```

### Beispiel

```
Hallo zusammen,

eine kurze Notiz zu dem, was diesen Monat im Dashboard neu ist und was
als Nächstes kommt.

**Was Sie jetzt nutzen können**
- Der „Save this view"-Button ist im Dashboard für Power-User live.
  Speichern Sie Ihre gefilterten Views, benennen Sie sie, und sie werden
  immer exakt wiederhergestellt — selbst wenn sich unsere URL-Struktur
  darunter ändert. Bis zu 50 pro Nutzer:in.
- Mobile-Web ist jetzt nutzbar für die drei Flows, die Sie am meisten
  nutzen: Dashboards, Alerts und Audit-Log. Die verbleibenden zwei
  Flows kommen diesen Herbst.

**Was als Nächstes kommt**
- Team-shared Saved Views — eine gefilterte View mit Ihrem Team teilen.
  Geplant für Juli.
- Verbessertes First-Run-Erlebnis für neue Teammitglieder, die Sie
  onboarden. Ende Juni.

**Eine kleine Bitte**
Falls Sie Saved Views ausprobieren und etwas Fehlendes oder Komisches
finden, antworten Sie einfach auf diese E-Mail. Ich lese jede
persönlich, und sie formt, was wir als Nächstes bauen.

— Alex
```

Was anders ist:

- Keine Statusfarbe, kein „In Gefahr"-Framing.
- „Bis zu 50 pro Nutzer:in" hebt ein echtes Limit, aber in Kund:innen-Sprache.
- „Was als Nächstes" nutzt Monate, keine Quartale oder spezifische Daten.
- Die Bitte ist direkt und einfach (auf diese E-Mail antworten).

---

## Wie alle drei in einem Workflow nutzen

Die meisten Wochen schreibst du das Engineering-Detail-Update zuerst, weil dort das Rohmaterial lebt — deine Sprint-Planung, deine Blockers, die Entscheidungen deines Teams. Dann komprimierst du.

Workflow:

1. Engineering-Detail-Update schreiben (~400 Wörter).
2. Durch die KI laufen lassen: „Komprimiere auf 200 Wörter für einen Exec-Brief. Behalte eine spezifische Bitte. Streich technisches Vokabular."
3. Erneut durch die KI: „Schreib für unsere Kund:innen in 150 Wörtern um. Klare Sprache. Streich interne Blockers. Um das rahmen, was sie jetzt nutzen können."

Gesamtzeit: 30 Minuten für alle drei Versionen. Die Kompressions-Pässe fangen Overclaiming — wenn die Exec-Version nicht „X geshipt" sagen kann, ohne zu hedgen, hat die Engineering-Version es wahrscheinlich auch überstellt.

---

## Anti-Patterns, die der Prompt blockiert

- „I hope this email finds you well." — Streichen.
- „Just wanted to circle back on…" — Streichen.
- „Per my last email…" — Streichen.
- „Wir machen weiterhin Fortschritte bei…" — Vage. Ersetzen mit einem Outcome und einer Zahl.
- „Es läuft gut!" — Status ist eine Farbe, kein Gefühl. Wähl eine.
- „Sag Bescheid bei Fragen." — Keine Bitte. Sag die tatsächliche Bitte.
- „Freue mich zu teilen…" — Der/die Exec muss nicht wissen, wie du dich fühlst. Komm zur Substanz.

Wenn etwas durchrutscht, prompte: „Streich jede Füllphrase und schreib mit Status, Outcomes und Bitte um."
