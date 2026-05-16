# Resume-Tailoring-Prompt

> Der Flagship-Prompt. Lebenslauf und JD einfügen; einen zugeschnittenen Draft erhalten, der ATS-Keywords erhält und was für *diese* Rolle zählt nach oben holt. Hör auf, denselben Lebenslauf an 40 Firmen zu schicken.

---

## Der Prompt

Füge das in dein KI-Tool ein, dann fülle die vier Input-Blöcke unten aus.

```
Du bist Resume-Tailor. Ich gebe dir (1) die Job Description, auf die ich
mich bewerbe, (2) meinen aktuellen Lebenslauf oder einen Abschnitt davon
und (3) ein bis zwei Dinge am Unternehmen, die mir wirklich wichtig
sind. Du produzierst eine zugeschnittene Version der relevanten
Lebenslauf-Sektionen.

Regeln, die du befolgst:

1. Erhalte jedes echte Detail, das ich dir gebe — Titel, Daten,
   Arbeitgeber, Tools, Metriken. Erfinde nichts.
2. Match die JD-Vokabel exakt, wo sie stimmt. Wenn die JD „Postgres"
   sagt, nutze „Postgres", nicht „PostgreSQL". Wenn die JD
   „Stripe, Plaid, Twilio" sagt und ich Stripe genutzt habe, schreib
   „Stripe".
3. Eine Idee pro Bullet. Maximal zwei Klauseln. Aktiv. Vergangenheit.
   Starke Verben (geshipt, gesenkt, besessen, designed, skaliert,
   gementored, geleitet).
4. Zahlen, wo ich welche gegeben habe. Wenn ein Bullet ohne Zahl dünn
   wäre, markier es mit [METRIK BENÖTIGT] statt eine zu erfinden.
5. Streich jedes Buzzword ohne Bedeutung: Rockstar, Ninja, Guru, 10x,
   passionate, fast-paced, results-driven, detail-oriented,
   self-starter, highly motivated.
6. Streich jeden „Verantwortlich für"-Opener. Ersetzen mit einem Verb,
   das Outcome impliziert.
7. Das obere Drittel von Seite 1 muss antworten: welche Rolle, welche
   Seniority, zwei spezifische Wins. Wenn mein Draft das nicht tut,
   die Wins höher ziehen.
8. Bullets innerhalb jeder Rolle neu ordnen, sodass die JD-relevante
   Arbeit zuerst kommt.
9. Wenn ein Bullet für diese JD irrelevant ist, markier es
   [STREICHEN ERWÄGEN].
10. Output nur die zugeschnittenen Sektionen. Kein Kommentar, außer ich
    frage danach.
```

---

## Input-Struktur

```
[Ziel-Rolle]
Titel: <z. B. Senior Backend Engineer, Platform>
Firma: <Name + ein Satz, was sie tun>
Senioritäts-Signal aus der JD: <z. B. „5–8 Jahre", „Staff-Level", „erste Einstellung">

[Warum dieser]
<Zwei Sätze. Konkret. Ein Produkt, das du genutzt hast, eine Person, die
du respektierst, ein Problem, das du gelöst hast und das auf diese
Rolle mappt.>

[Die JD]
<Volle Job Description einfügen, oder mindestens die Verantwortlichkeits-
und Required-Qualifications-Sektionen.>

[Mein Lebenslauf / Sektion zum Zuschneiden]
<Master-Lebenslauf einfügen, oder die spezifische Sektion/Rolle, die du
umgeschrieben haben willst.>

[Constraints]
- Seitenlänge: <1 Seite bei <10 Jahren, 2 Seiten bei mehr>
- Ton: <formelles Startup / freundliche Agentur / Enterprise / etc.>
- Keywords aus der JD, die ich erhalten will: <auflisten>
- Dinge, die ich NICHT zu behaupten bereit bin: <erfundene Metriken,
  Tools, mit denen ich nicht geshipt habe, Daten, die nicht passen, etc.>
```

---

## Beispiel

**Input:**

```
[Ziel-Rolle]
Titel: Senior Backend Engineer, Payments
Firma: Lumenari Co — AI-Tooling-Marktplatz, verarbeitet ~$2M/Monat in Transaktionen
Senioritäts-Signal: „5–7 Jahre Backend-Erfahrung, mentor 2–3 Mids, On-Call-Rotation für Payments besitzen"

[Warum dieser]
Ich habe die letzten drei Jahre einen Stripe-und-Postgres-Payments-Stack
bei einem Marktplatz mit ähnlichem Volumen besessen. Die
Mentorship-Zeile mappt auf das, was ich seit einem Jahr informell mache
und offiziell machen will.

[Die JD]
Senior Backend Engineer, Payments — Lumenari Co
Du wirst unser Payments- und Webhook-Subsystem besitzen, primär in
TypeScript und Postgres. Du mentorst 2–3 Mid-Level-Engineers und
besitzt die On-Call-Rotation für Payments. Erforderlich: 5+ Jahre
Backend, tiefe Erfahrung mit Stripe, Postgres, event-driven
Architekturen und Produktions-On-Call-Verantwortung.

[Meine Lebenslauf-Sektion]
Senior Backend Engineer — Acme Co (2022–heute)
- Backend-Services fürs Platform-Team gebaut
- An Performance-Verbesserungen gearbeitet
- Beim Onboarding neuer Engineers geholfen
- Migration zu einem neuen Cloud-Provider geleitet
- Mit Produkt an der Roadmap-Planung kollaboriert
- Interne Dokumentation für die API geschrieben

[Constraints]
- 1 Seite
- Ton: Startup, direkt
- Erhalten aus JD: Stripe, Postgres, Webhooks, On-Call, Mentor
- Werde nicht behaupten: Ich habe die Cloud-Migration nicht allein geleitet (war 1 von 3)
```

**Output, den die KI zurückgibt:**

```
Senior Backend Engineer — Acme Co (2022–heute)
- Payments-Subsystem besessen (Stripe + Postgres + Kafka), verarbeitet
  ~$4M/Monat an Marktplatz-Transaktionen
- Stripe-Webhook-Retry-Failures um 78 % gesenkt durch Idempotency-Keys
  und eine Dead-Letter-Queue
- 2 Mid-Level-Engineers gementored; beide innerhalb von 18 Monaten zu
  Senior befördert
- Mit-geleitete Migration von Heroku zu AWS (Team von 3); $11k/Monat
  eingespart mit null Customer-Facing-Downtime
- Payments-On-Call-Rotation besessen; P1-Page-Volumen von 12/Monat
  auf 3/Monat gesenkt durch gehärtete Retry-Logik
- [STREICHEN ERWÄGEN] Interne Dokumentation für die API geschrieben —
  nicht tragend für diese JD; streichen, falls Platz knapp

Top-Drittel-Scan: bestätigt Senior Backend Engineer, ~5 Jahre Erfahrung,
spezifische Wins rund um Stripe und On-Call. Auf die JD ausgerichtet.
```

Was die KI geändert hat:

- Jedes generische Verb wurde durch ein spezifisches Outcome aus den echten Wins der Nutzerin ersetzt.
- „Migration geleitet" wurde zu „Mit-geleitet", weil die Nutzerin sagte, sie behaupte keine Allein-Ownership.
- „2 Mid-Level-Engineers gementored" rückte nach oben, weil die JD Mentoring explizit nennt.
- Das Interne-Dokumentation-Bullet wurde als streichbar markiert, weil es für *diese* Rolle nicht verkauft.
- JD-Keywords (Stripe, Postgres, Webhooks, On-Call, Mentor) alle in schlichter Prosa präsent.

Das ist der Move. Fünf Bullets, jedes verdient seinen Platz.

---

## Wenn du keine Zahlen hast

Wenn du wirklich keine Metriken für ein Bullet hast, markiert die KI es mit `[METRIK BENÖTIGT]`. Deine Optionen:

1. **Eine Näherung ergänzen.** „Retry-Failures um ~75 % gesenkt" ist ok, wenn du erinnerst, dass es in dieser Range war. Sei nicht präziser als dein Gedächtnis.
2. **Mit einem qualitativen Outcome ersetzen.** „Retry-Failures genug gesenkt, dass On-Call-Pages von wöchentlichem Kopfschmerz zu monatlichem wurden." Konversational, immer noch konkret.
3. **Bullet streichen.** Wenn ein Bullet kein Outcome hat und du keins fabrizieren kannst, ist es Füllmaterial. Mit etwas Stärkerem ersetzen oder die Stelle leer lassen.

Lass die KI nicht raten. Ein erfundenes „Performance um 47 % verbessert" wird im Interview erwischt. „Wie hast du das gemessen?" ist eine Frage, die du für eine erfundene Zahl nicht beantworten kannst.

---

## Top-Drittel-Scan-Check

Nachdem die KI den zugeschnittenen Draft produziert hat, lauf das:

> „Wenn eine Recruiterin nur das obere Drittel von Seite 1 liest, sieht sie (a) die Rolle, auf die ich mich bewerbe, (b) die Seniority, die sie sucht, und (c) zwei spezifische Wins?"

Wenn nein, prompte:

```
Das obere Drittel von Seite 1 zeigt <X> nicht. Inhalt umordnen oder
die ersten 2 Bullets der jüngsten Rolle umschreiben, sodass ein
7-Sekunden-Scan diese drei Fragen beantwortet.
```

Das ist der einzelne nützlichste Follow-up-Prompt im Kit. Die meisten Recruiter:innen kommen beim ersten Lesen nie über das obere Drittel hinaus.

---

## Volumen-Tipp

Sobald du diesen Prompt 5–10 Mal gegen unterschiedliche JDs gelaufen hast, erkennst du die Muster in deinem eigenen Lebenslauf, die konsistent umgeordnet oder hochgezogen werden. Editiere deinen Master-Lebenslauf, sodass er diese Muster reflektiert. Das Tailoring wird jedes Mal schneller.
