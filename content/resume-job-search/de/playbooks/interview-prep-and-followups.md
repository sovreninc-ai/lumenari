# Interview-Prep + Follow-Ups

> STAR / Behavioral / Technical Interview-Prep, plus die drei Follow-up-E-Mails, die jede Jobsuche braucht: Dank, Post-Rejection und Ghost-Recovery.

---

## Teil 1 — Behavioral-Interview-Prep (STAR)

### Wie STAR in der Praxis tatsächlich funktioniert

Die meisten Leute machen STAR falsch, weil sie 80 % der Antwort auf Situation und Task verwenden. Die Interviewerin kümmert das Setup nicht. Sie kümmert, was *du* getan hast und was passierte.

Richtiges Verhältnis:

- **Situation (10 %)**: Ein Satz. „Bei Acme sahen wir Webhook-Retry-Failures bei ca. 12 % aller Events."
- **Task (10 %)**: Ein Satz. „Ich war die On-Call-Engineerin dieses Quartal, und die Failures weckten mich zwei Nächte die Woche."
- **Action (60 %)**: Spezifische Schritte, die *du* unternommen hast. Erste Person „ich", nicht „wir". Das ist das Fleisch.
- **Result (20 %)**: Zahlen, wenn du welche hast. Das Ergebnis — fürs Team, die Kund:in, das Business.

Wenn du mehr als zweimal „wir" sagst, weiß die Interviewerin nicht, was du gemacht hast. Nutz „ich". Wenn die Arbeit echt kollaborativ war, sag „ich leitete" oder „ich besaß den X-Teil, während zwei Engineers Y machten".

### Der Prep-Prompt

```
Du hilfst mir, Behavioral-Interview-Antworten im STAR-Format zu prepen.
Ich gebe dir eine Frage und die grobe Story, die ich erzählen will. Du
produzierst eine straffe STAR-Antwort in ~200 Wörtern.

Regeln:
1. Situation: max 1 Satz.
2. Task: max 1 Satz.
3. Action: 60 % der Antwort. Erste Person „ich". Wenn die Arbeit
   kollaborativ war, benenne, was ich spezifisch besaß vs. was andere
   machten.
4. Result: mit einer Zahl oder einem konkreten Outcome enden. Wenn ich
   keine Zahl habe, frag mich, bevor du eine erfindest.
5. ~200 Wörter. Liest sich sauber laut in 90–120 Sekunden.
6. Keine Buzzwords (passionate, results-driven, dynamic). Kein Füller.

Nachdem du die Antwort produziert hast, stell mir eine Follow-up-Frage,
die die Interviewerin am wahrscheinlichsten fragt. Schlag einen kurzen
Tail zu meiner Antwort vor, der das präemptiv adressiert, falls nützlich.
```

### Die 6–8 Stories, die du bereit haben solltest

Vor jedem Onsite preppe 6–8 Stories, die du in verschiedene Fragen flexen kannst. Die meisten Behavioral-Fragen sind Variationen dieser Themen:

1. Eine Zeit, in der du etwas geführt hast
2. Eine Zeit, in der du mit Peer oder Manager nicht einverstanden warst
3. Eine Zeit, in der du gescheitert bist
4. Eine Zeit, in der du schnell lernen musstest
5. Eine Zeit, in der du einen harten Tradeoff getroffen hast
6. Eine Zeit, in der du gementored oder jemanden entwickelt hast
7. Eine Zeit, in der du unter Druck geliefert hast
8. Eine Zeit, in der du eine:n Stakeholder:in zurückgedrückt hast

Für jede schreibe 3–4 Sätze Kontext plus das Outcome. Du lernst keine Skripte auswendig — du preppst das Rohmaterial, sodass die KI es im Moment in die richtige Antwort formen kann.

### Beispiel

**Frage:** „Erzähl mir von einer Zeit, in der du mit deinem Manager nicht einverstanden warst."

**Roher Input der Nutzerin an die KI:**

```
Bei Acme wollte mein Manager das neue Payments-Feature in 4 Wochen
ohne Feature-Flag shippen, weil die Kund:in wartete. Ich dachte, das
sei ein schlechter Call — wir hatten Payments nie ohne Flag geshipt,
und die Kund:in würde eine extra Woche nicht merken. Ich drückte
zurück, am Ende mit Flag und über 2 Wochen ausgerollt. Wir fingen in
Woche 1 einen Bug, der ~$80k gekostet hätte, hätten wir bei 100 %
geshipt.
```

**STAR-Antwort, die die KI produziert:**

```
Bei Acme drückte mein Manager, ein neues Payments-Feature in vier
Wochen ohne Feature-Flag zu shippen, weil eine Schlüsselkund:in
wartete.

Ich besaß den Deploy und war nicht einverstanden — wir hatten nie eine
Payments-Änderung ohne Flag geshipt, und ich glaubte nicht, dass die
Kund:in eine extra Woche fühlen würde.

Ich zog den Runbook und schrieb das Risiko auf: jeder Bug bei 100 %
Rollout trifft jede Kund:in, und unser durchschnittliches
Revenue-Impact-Incident in Payments lag bei rund $80k. Ich schlug vor,
das Feature zu flaggen und von 5 % auf 25 % auf 100 % über zwei Wochen
auszurollen. Mein Manager drückte zweimal auf Timeline-Druck zurück,
aber ich hielt die Linie zur Architektur und bot an, den Kund:innen-Call
selbst zu nehmen, um den Rollout-Plan zu erklären. Wir fügten den Flag
hinzu.

In Woche eins bei 25 % fingen wir einen Webhook-Retry-Bug, der bei
vollem Rollout doppelte Charges gefeuert hätte. Geschätzter vermiedener
Schaden: rund $80k. Die Kund:in bekam das Feature am Originaldatum,
weil wir den Rollout parallel zum Build geplant hatten. Mein Manager
und ich machten danach jeden Payments-Deploy standardmäßig mit Flag.

(Wahrscheinlicher Follow-up: „Wie hast du den Pushback deines Managers
gehandhabt?" — ich würde einen Satz ergänzen: Ich fragte, worauf er
optimierte, einigte mich darauf explizit mit der Kund:in, machte dann
den Architektur-Case schriftlich, sodass wir auf Basis von Daten statt
Meinung uneinig sein konnten.)
```

Das sind 220 Wörter, liest in etwa 100 Sekunden und zeigt Urteilsvermögen, Ownership, Kommunikation und Outcome. Der Follow-up-Vorschlag ist der Bonus — die KI markiert, wo die Interviewerin wahrscheinlich gräbt, und gibt dir eine vorgebaute Antwort.

---

## Teil 2 — Technical-Interview-Prep

### Worin die KI gut ist

- Pattern-Matching von Algorithmus-Problemen und Erklären der Lösungsform.
- Durchgang durch System-Design-Probleme mit dem Standard-Rubric (funktionale Anforderungen, nicht-funktionale, API, Datenmodell, Skalierung, Bottlenecks, Tradeoffs).
- Mock-Interviews zu Debugging- oder Code-Reading-Fragen.
- „Was würdest du tun, wenn"-Follow-ups generieren, sodass du im Raum nicht überrascht wirst.

### Worin die KI schlecht ist

- Echte Übung ersetzen. Du musst Code schreiben oder das Design selbst auf dem Whiteboard machen. Die Lösung der KI zu lesen ist nicht dasselbe wie sie unter Druck zu produzieren.
- Vorhersagen, was *deine* Interviewerin fragt. Die KI kann das Durchschnittliche simulieren; der tatsächliche Raum ist seine eigene Sache.

### Nützliche Prompt-Patterns

**Für System-Design:**

```
Ich habe morgen ein System-Design-Interview bei <Firma>. Die Rolle ist
<Senior Backend>. Geh durch, wie du 45 Minuten zu diesem Problem
strukturieren würdest: „Designe ein Webhook-Delivery-System für eine
Stripe-ähnliche Plattform."

Dann stell mir 3 Fragen zu den Design-Entscheidungen, auf die ich
vorbereitet sein sollte zu verteidigen.
```

**Für Algorithmen:**

```
Ich bin eingerostet bei Dynamic Programming. Gib mir 3
Medium-Difficulty-DP-Probleme mit jeweils einem Ein-Zeilen-Hinweis.
Zeig mir noch keine Lösungen. Ich versuche sie und komme zurück.
```

**Für Mock-Interviews:**

```
Du bist eine Senior Engineerin, die mich für eine Backend-Rolle
interviewt. Stell mir eine Debugging-Frage. Nachdem ich geantwortet
habe, frag Follow-ups wie eine Interviewerin. Hilf mir nicht — drück
mich. Sag mir am Ende, wie meine Antwort gelandet wäre.
```

Die „drück mich, hilf mir nicht"-Zeile zählt. KI ist standardmäßig nett. Du willst keine Nettigkeit im Mock; du willst die Fragen, die die tatsächliche Interviewerin stellt.

---

## Teil 3 — Die drei Follow-up-E-Mails

### E-Mail 1 — Post-Interview-Dank (innerhalb von 24 Stunden senden)

**Prompt:**

```
Schreib eine 100–130-Wort-Dank-E-Mail nach einem Jobinterview. Regeln:

1. Auf eine spezifische Sache verweisen, die die Interviewerin sagte.
   Kein generisches „Danke für die Zeit".
2. Kurz eine Sache zu meinem Fit verstärken — das stärkste Signal aus
   dem Gespräch wählen.
3. Die Tür für Follow-up-Fragen öffnen. Nicht um die Rolle betteln.
4. Sign-off ist professionell, nicht eifrig.
5. Subject Line: „Danke — <mein Name> / <Rolle>"

Ich gebe dir: den Namen der Interviewerin, die Rolle, eine spezifische
Sache, die sie sagte, und eine Sache, die ich verstärken will.
```

**Beispiel:**

```
Betreff: Danke — Alex / Senior Backend Engineer

Maya,

danke fürs Gespräch heute. Der Teil dazu, wie ihr über
Webhook-Ordering bei out-of-sequence-Retries denkt, blieb bei mir
hängen — das ist ein Problem, mit dem ich mehr Zeit verbracht habe, als
gesund ist, und es klingt, als geht ihr es genauso an wie wir bei Acme.

Falls es dem Team hilft, gehe ich gerne den spezifischen
Retry-Ordering-Entscheidungsbaum durch, den ich letztes Jahr
aufgeschrieben habe — sowas teilt sich leichter live als getippt. So
oder so, froh, dass wir reden konnten. Hoffe, der Rest des Loops läuft
glatt.

— Alex
```

Schick eine an jede Interviewerin, deren E-Mail du hast, pro Person individualisiert. Dieselbe E-Mail Wort für Wort wiederzuverwenden ist ok, wenn sich nur der spezifische Verweis ändert — aber der spezifische Verweis MUSS sich ändern.

### E-Mail 2 — Post-Rejection (innerhalb 48 Stunden nach dem Nein senden)

Diese zählt. Die meisten Leute schicken sie nicht. Die, die sie schicken, bekommen warme Intros und „würden Sie gerne im Hinterkopf behalten"-Follow-ups Monate später, wenn die richtige Rolle aufkommt.

**Prompt:**

```
Schreib eine 80–100-Wort-höfliche Antwort auf eine Job-Rejection.
Regeln:

1. Für die Zeit und die Entscheidung danken. Keine Bitterkeit.
2. Das Outcome anerkennen, ohne das Interview zu rekapitulieren.
3. Tür offen lassen: bitten, in Kontakt zu bleiben, erwähnen, dass ich
   für die richtige Rolle in Zukunft offen wäre.
4. Optional: um ein konkretes Feedback bitten. Sei direkt („falls Sie
   fünf Minuten für ein spezifisches Stück Feedback haben") — vage
   Bitten („jegliches Feedback wäre willkommen") bekommen vage Antworten.
```

**Beispiel:**

```
Maya,

danke fürs Wissen-Lassen und für die Zeit des Teams in diesem Loop. Die
Gespräche waren ehrlich gesagt einige der besseren, die ich in dieser
Suche hatte — danke für die Ehrlichkeit, wo ihr gelandet seid.

Falls eine Senior-Backend-Rolle in Payments später dieses Jahr aufkommt,
würde ich gerne auf eurer Liste sein. Und falls Sie fünf Minuten für
ein spezifisches Stück Feedback haben, was den Ausschlag in die andere
Richtung gegeben hat, würde ich es nützlich finden.

Beste Grüße,
Alex
```

Die „ein-spezifisches-Stück-Feedback"-Bitte wird in dieser Formulierung etwa 40 % der Zeit beantwortet. Generisches „jegliches Feedback" bekommt 5 %.

### E-Mail 3 — Ghost-Recovery (wenn du 14 Tage nichts gehört hast)

Zwei Stufen. Tag 7 ist ein leichter Ping. Tag 14 ist ein echtes Follow-up.

**Tag 7 (leichter Ping):**

```
Maya,

wollte mich kurz zur Senior-Backend-Rolle melden, über die wir am
[Datum] sprachen. Gerne teile ich alles, was hilft.

— Alex
```

Das war's. Drei Zeilen. Kein Füller.

**Tag 14 (echtes Follow-up):**

```
Betreff: Kurzes Follow-up — Senior Backend / Lumenari

Maya,

Nachgang zu unserem Gespräch über die Senior-Backend-Rolle am [Datum].
Ich weiß, Loops verlangsamen sich aus allen möglichen Gründen, die
nichts mit der Kandidat:in zu tun haben, also kein Druck — frag nur,
ob die Rolle noch offen ist und wo ich stehe.

Falls sich das Timing bei Ihnen verschoben hat, möchte ich es lieber
wissen als nicht. Und falls die Antwort nein ist, ist das auch ok; ich
würde den Abschluss schätzen, um meine Suche zu planen.

— Alex
```

Wenn du innerhalb einer Woche nach der Tag-14-E-Mail nichts hörst, markier es verloren und zieh weiter. Schick kein drittes Follow-up. Das Signal ist klar genug.

---

## Suche tracken

Ein simpler Tracker schlägt aufwendige. Fünf Spalten:

| Firma | Rolle | Beworben | Stage | Letzter Kontakt |
|---|---|---|---|---|
| Lumenari Co | Sr Backend Eng | 2026-05-01 | Onsite geplant | 2026-05-12 |
| Beta Co | Staff Eng | 2026-05-03 | Recruiter Screen | 2026-05-08 |
| Gamma Co | Sr Backend Eng | 2026-04-25 | Geghostet (Tag 14 gesendet) | 2026-05-09 |

Update nach jeder Interaktion. Ohne ihn wird Woche sechs der Suche zu Nebel.

---

## Was dieses Playbook nicht für dich tut

- Ein Skript für dich auswendig lernen. Übe die Antworten laut. Die KI kann die Worte formen; dein Mund muss sie kennen.
- Dir sagen, ob du das Offer annehmen sollst. Das ist eine Werte-Frage. Mach eine Liste, was zählt, und gewichte. Die KI kann beim Listen-Machen helfen; sie kann den Call nicht machen.
- Compensation-Verhandlung abdecken. Das ist ein separates Playbook, und das falsche Tool hier wäre teuer. Vorerst: nie am Call annehmen, 24–48 Stunden Bedenkzeit, mit einer Bitte countern, verankert an Marktdaten.
