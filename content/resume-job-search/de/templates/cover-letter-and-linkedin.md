# Anschreiben + LinkedIn-Rewrite

> Zwei Artefakte, die eine Stimme teilen. Anschreiben werden ca. 30 % der Zeit gelesen — schreib sie trotzdem, und mach sie kurz. LinkedIn wird öfter gelesen als das Anschreiben und zählt mehr, als Leute denken.

---

## Teil 1 — Das Anschreiben

### Der Prompt

```
Du schreibst ein Anschreiben für die Nutzerin. Regeln:

1. Drei Absätze. ~200 Wörter total. Maximal 220.
2. Absatz 1 (~50 Wörter): mit einem spezifischen Grund öffnen, warum
   die Nutzerin an DIESES Unternehmen schreibt. Auf ein Produkt, eine
   Person, einen kürzlichen Launch oder ein Problem verweisen, über das
   die Nutzerin tatsächlich nachgedacht hat. NIE mit „Hiermit bewerbe
   ich mich um die Stelle" öffnen.
3. Absatz 2 (~100 Wörter): eine konkrete Story, die die Erfahrung der
   Nutzerin auf die JD mappt. Spezifisches Outcome. Kein Recap des
   Lebenslaufs.
4. Absatz 3 (~50 Wörter): mit einem klaren nächsten Schritt schließen.
   Selbstbewusst ohne arrogant. Kein „Ich würde mich freuen, die
   Gelegenheit zu haben zu diskutieren".
5. Stimme: klingt, als hätte die Nutzerin es geschrieben. Leicht
   informell für Startups, leicht formell für Finanz oder Enterprise.
   Nie Pressemitteilung. Nie Humblebrag.
6. Keine Buzzwords (passionate, results-driven, fast-paced, dynamic).
7. Kein „übertragbare Skills"-Framing. Zeig die Arbeit einfach.

Output nur das Anschreiben. Kein Kommentar.
```

### Input-Struktur

```
[Ziel-Rolle]
Titel, Firma, ein Satz, was sie tun.

[Spezifischer Hook]
Die eine Sache am Unternehmen, mit der du führen würdest. Wähle exakt eine.
Beispiele:
- „Ich nutze Ihr Produkt seit 18 Monaten, und es ist das einzige Tool in
  dieser Kategorie, das in echter Kadenz shipt."
- „Ich habe an einem ähnlichen Payments-Problem bei <prev co> gearbeitet
  und will die nächsten 4 Jahre tiefer darin gehen."
- „Ich verfolge die Texte von <Hiring-Manager-Name> seit Jahren, und der
  jüngste Post des Teams zu event-driven Architektur hat einige Dinge
  geklärt, in denen ich falsch lag."

[Die gemappte Story]
Ein Projekt, zwei bis drei Sätze Kontext, das Outcome.

[Sign-off-Energie]
Selbstbewusst, verfügbar, druckfrei.
```

### Beispiel

**Input:**

```
[Ziel-Rolle]
Senior Backend Engineer, Payments — Lumenari Co (AI-Tooling-Marktplatz,
~$2M/Monat Transaktionen)

[Spezifischer Hook]
„Ich habe einen Stripe-Connect-+-Postgres-Payments-Stack bei einem
Marktplatz mit ähnlichem Volumen in den letzten drei Jahren gebaut, und
Ihr jüngster Engineering-Blogpost zu idempotenten Webhook-Retries ist
exakt die Architekturrichtung, in die ich mein Team gedrängt habe."

[Die gemappte Story]
Bei Acme das Payments-Subsystem besessen, ~$4M/Monat verarbeitet.
Webhook-Retry-Failures um 78 % gesenkt durch Idempotency-Keys +
Dead-Letter-Queue. Zwei Mid-Level-Engineers gementored, beide in
18 Monaten zu Senior befördert.

[Sign-off-Energie]
Verfügbar diese oder nächste Woche; gerne mehr Detail zur
Retry-Failure-Arbeit, falls nützlich.
```

**Output, den die KI zurückgibt:**

```
Maya,

Ihr Engineering-Post zu idempotenten Webhook-Retries ist exakt die
Architekturrichtung, in die ich mein Team das letzte Jahr gedrängt habe —
ich schreibe, weil ich denke, ich kann helfen, die nächste Schicht
davon zu shippen.

Die letzten drei Jahre habe ich einen Stripe-+-Postgres-Payments-Stack
bei Acme Co besessen, einem Marktplatz mit rund $4M/Monat in
Transaktionen. Die Arbeit, auf die ich am stolzesten bin: ich habe
Webhook-Retry-Failures über sechs Monate um 78 % gesenkt durch
Einführung von Idempotency-Keys und einer Dead-Letter-Queue, dann die
On-Call-Rotation genug gehärtet, dass P1-Page-Volumen von zwölf pro
Monat auf drei fiel. Auf dem Weg habe ich zwei Mid-Level-Engineers
gementored; beide sind jetzt Senior. Der Mentorship-Teil ist Teil des
Grundes, warum ich suche — ich möchte ihn in der nächsten Rolle
offiziell machen.

Verfügbar diese oder nächste Woche. Gerne teile ich die
Retry-Failure-Architektur in mehr Detail, falls vor einem Gespräch
nützlich.

— Alex
```

Was dieser Brief richtig macht:

- Öffnet mit einem spezifischen Verweis auf den Engineering-Content der Firma. Hiring Manager weiß, dass du ihn wirklich gelesen hast.
- Body-Absatz nennt Tools, Zahlen und Outcomes — kein Lebenslauf-Recap.
- Erwähnt Mentorship in der Stimme der Nutzerin („der Mentorship-Teil ist Teil des Grundes"), weil die JD explizit danach fragt.
- Schließt mit Verfügbarkeit und einem weichen Angebot (die Retry-Failure-Architektur). Kein „Ich würde mich freuen über die Gelegenheit".

---

## Teil 2 — LinkedIn-Rewrite

Drei Sektionen zählen, in Reihenfolge: Headline, About-Sektion und der Anfang der Experience.

### Headline (max 120 Zeichen)

Was Recruiter:innen in Suchergebnissen sehen.

**Schlecht:**

```
Senior Software Engineer | Passionierter Builder | AWS / TypeScript / React
```

**Besser:**

```
Senior Backend Engineer — Payments, Stripe, Postgres | Mentor | Calgary / Remote
```

Regeln, die der Prompt durchsetzt:

1. Mit der Ziel-Rolle führen, nicht dem aktuellen Titel, falls die sich unterscheiden.
2. Drei spezifische Keywords als Nächstes — Tools, die du wirklich nutzt, keinen Tech-Stack-Salat.
3. Optionales drittes Segment: Standort oder Verfügbarkeit („Open to remote NA").
4. Keine Buzzwords. Kein „Passionierter Builder", „Code Slinger" oder „Tech-Enthusiast".

### About-Sektion — die ersten drei Zeilen sind alles

Nur die ersten ~210 Zeichen zeigen sich, bevor „…mehr anzeigen" abschneidet. Optimiere auf die.

**Prompt:**

```
Schreib die LinkedIn-About-Sektion der Nutzerin. Regeln:

1. Erster Satz (~140 Zeichen max): Position-Statement. Was sie tut,
   für wen, und ein Outcome. Das ist die einzige Zeile, die viele
   Recruiter:innen lesen.
2. Die nächsten zwei Sätze passen in die ersten ~210 Zeichen total.
   Hak die Leserin zum „mehr anzeigen"-Klick.
3. Gesamtlänge: 4–6 kurze Absätze, ~150 Wörter.
4. Erste Person, konversational. Klingt, als hätte die Nutzerin es
   geschrieben, keine PR-Person.
5. Mit einem spezifischen Call to Action enden: „DM me, falls ihr für X
   einstellt", oder „Ich schreibe über Y unter <Link>", oder „Offen für
   Senior-Backend-Rollen im Payments-Bereich".
```

**Beispiel:**

```
Ich baue Payments-Infrastruktur für Marktplätze. Die letzten drei Jahre
habe ich einen Stripe-+-Postgres-Stack mit $4M/Monat bei Acme Co
besessen — Webhooks, On-Call, Mentorship, alles davon.

Vor Acme war ich bei einem Fintech-Startup, wo ich die Lektion lernte,
die jede:r Payments-Engineer auf die harte Tour lernt: Idempotency ist
nicht optional, Dead-Letter-Queues sind nicht optional, und der
Runbook wird um 2 Uhr morgens gelesen von jemandem, der ihn nicht
geschrieben hat.

Mir sind drei Dinge in einer Rolle wichtig:
- Schwere Probleme mit echten Nutzer:innen
- Ein Team, in dem Mentorship in beide Richtungen geht
- Die Autonomie, ohne Theater zu shippen

Aktuell in Calgary, offen für Remote-Rollen in Nordamerika. DM me, falls
ihr für eine Senior Backend Engineerin in Payments einstellt — ich bin
wählerisch, wo ich hingehe, und hätte lieber ein gutes Gespräch als
zehn höfliche.
```

Was die ersten 210 Zeichen (~3 Zeilen) zeigen:

```
Ich baue Payments-Infrastruktur für Marktplätze. Die letzten drei Jahre
habe ich einen Stripe-+-Postgres-Stack mit $4M/Monat bei Acme Co
besessen — Webhooks, On-Call, Mentorship, alles davon.
```

Das ist der Hook. Recruiterin sieht Rolle, Tool, Outcome im ersten Absatz und weiß, ob sie weiterlesen soll.

### Experience-Sektion — Anfang der aktuellen und letzten Rolle

LinkedIn kürzt nach 2–3 Zeilen pro Rolle, außer jemand klickt Expand. Die ersten zwei Zeilen jeder Rolle entsprechen also dem oberen Drittel deines Lebenslaufs.

**Prompt:**

```
Schreib die ersten 2–3 Bullets der aktuellen Rolle der Nutzerin auf
LinkedIn um. Regeln:

1. Erstes Bullet: ein Ein-Zeilen-Summary von Scope und Impact in dieser
   Rolle.
2. Zweites Bullet: die einzelne relevanteste Errungenschaft für die
   Rollen, die die Nutzerin targetiert.
3. Drittes Bullet (optional): eine zweite Errungenschaft, die Range
   zeigt.
4. Gleiche Stil-Regeln wie Lebenslauf: Aktiv, spezifische Zahlen, keine
   Buzzwords, JD-aligned-Vokabular.
5. Output nur den LinkedIn-formatierten Text.
```

Beispiel-Output:

```
Senior Backend Engineer bei Acme Co
2022 – heute · Calgary, AB (Remote)

→ Payments- und Webhooks-Subsystem besitzen (Stripe + Postgres + Kafka)
  für einen Marktplatz mit ~$4M/Monat in Transaktionen.
→ Webhook-Retry-Failures um 78 % gesenkt durch Einführung von
  Idempotency-Keys und einer Dead-Letter-Queue; P1-Pages fielen über
  sechs Monate um 75 %.
→ Mentor:in von 2 Mid-Level-Engineers; beide in 18 Monaten zu Senior
  befördert.
```

---

## Wie die beiden Artefakte zusammenarbeiten

Anschreiben und LinkedIn-About-Sektion sollten nicht identisch sein, aber sie sollten eine Stimme und eine Position teilen. Wenn dein Anschreiben sagt, du „besitzt einen Stripe-Stack bei einem Marktplatz mit $4M/Monat", sollte dein LinkedIn-About dasselbe sagen — anders formuliert. Recruiter:innen, die beides lesen, merken, wenn du wie zwei verschiedene Personen klingst.

Lauf den Anschreiben-Prompt und den LinkedIn-About-Prompt back-to-back in derselben Chat-Sitzung. Die KI hält die Stimme konsistent.

---

## Anti-Patterns, die der Prompt blockiert

- „Hiermit bewerbe ich mich um die Stelle als [Rolle]." — Auf Sicht streichen.
- „Ich bin begeistert von der Gelegenheit zu …" — Streichen.
- „Anbei mein Lebenslauf." — Sie wissen es. Streichen.
- „Ich würde mich freuen, die Gelegenheit zu haben zu diskutieren …" — Streichen.
- „Tech-Enthusiast | Lifelong Learner | Kaffee-Süchtiger" in der LinkedIn-Headline — Streichen.
- „Ergebnisorientierte, detailverliebte Selbststarterin mit Passion für …" — Alles streichen.

Wenn etwas durchrutscht, prompte: „Streich jedes Klischee aus diesem Draft und schreib in schlichter Sprache um."
