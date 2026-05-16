# JD-Generator mit Anti-Bias-Linting

Die meisten JDs sind schlecht, weil Hiring Manager sie in 20 Minuten schreiben, die Hälfte aus einer anderen JD kopieren und sie nie als Kandidat:in lesen. Dieses Template fixt das. Es läuft erst einen Anti-Bias-Linter, dann produziert es eine JD, die respektiert, wie Kandidat:innen tatsächlich lesen.

---

## Wie dieses Template funktioniert

Zwei Pässe:

1. **Lint-Pass.** Markiert jede problematische Phrase im Brief oder bestehenden JD-Draft. Zeigt Lint + Fix oben im Output.
2. **JD-Draft.** Eine saubere, strukturierte JD im Standardformat aus dem Optimization-Pack.

Du kannst Lint-only auf einer JD laufen, die ein Hiring Manager dir geschickt hat (der nützlichste Use-Case in Agenturen und Inhouse-Teams).

---

## Der Prompt

```
Du bist der Recruiter Co-Pilot.

Generiere eine Job Description.

**Rollentitel:** [exakter Titel]
**Seniority:** [Entry / Mid / Senior / Staff / Principal / Director / VP]
**Rollenfamilie:** [Engineering / Product / Design / Sales / GTM / Ops / Finance / etc.]
**Unternehmensstadium + Größe:** [z. B. Series B, 80 Personen, $30M ARR]
**Was wir machen:** [ein Satz]
**Warum wir diese Rolle einstellen:** [ein Satz — Wachstum, Ersatz, neues Team, neue Funktion]
**Standort + Arbeitsmodell:** [Remote / Hybrid X Tage in [Stadt] / On-site (Stadt)]

**Gehaltsrange:**
- Base: [low] – [high] [Währung]
- Equity: [Range, falls anwendbar]
- Bonus/Provision: [Struktur, falls anwendbar]

**Top 3 Dinge, die die Person besitzen wird (konkret, nicht vage):**
1. [Outcome]
2. [Outcome]
3. [Outcome]

**Top 3 Skills/Erfahrungen, die nötig sind (Outcomes, kein Gatekeeping):**
1.
2.
3.

**Nice-to-have (optional):**
- [3–4 Dinge]

**Das Team, dem sie beitritt (echte Headcount, Manager namentlich, wenn möglich):**
[Beschreibung]

**Interview-Prozess (euer tatsächlicher Prozess, kein Template):**
[Anzahl Runden, wen sie treffen, Format]

**Sonstiges, das markierungswert ist:**
[z. B. „wir haben noch keine Senior-Engineerin — du setzt die Latte" oder „die Codebase ist älter, als wir wollen"]

Bestehender Draft (falls vorhanden):
[einfügen — für Lint-Pass]
```

---

## Was du zurückbekommst — volles Beispiel

Für eine Senior-Full-Stack-Engineer-Rolle bei einer Series-B-SaaS:

### Lint-Pass (aus dem Draft des Hiring Managers)

> **Lint-Pass am Originaldraft:**
>
> - `„passionate"` → streichen. Passion ist ein Gefühl, kein Lieferergebnis.
> - `„rock star"` → streichen. Gegendert (männlich konnotiert, stößt senior weibliche Kandidatinnen ab), Corporate-Cringe.
> - `„fast-paced, dynamic team"` → streichen. Code für „wir sind disorganisiert". Ersetzen mit konkreten Tempo-Erwartungen.
> - `„10x developer"` → streichen. Bedeutungslos, stößt nachdenkliche Senior Engineers ab.
> - `„thrives in ambiguity"` → abmildern oder spezifisch sein. Senior Engineers erwarten ETWAS Struktur; oft Code für „wir wissen nicht, was wir wollen".
> - `„wear many hats"` → streichen. Code für „wir haben kein Team". Wenn wahr, ehrlich sagen.
> - `„Bachelor's degree in Computer Science required"` → streichen oder zu „Bachelor ODER äquivalente Erfahrung" ändern. Senior Engineers mit 10 Jahren nachweisbarer Arbeit sollten nicht auf einem CS-Abschluss gatekept werden.
> - `„10+ years of experience"` → überdenken. Die Rolle braucht keine 10 Jahre; Senior-Qualität bei 6–8 Jahren ist üblich. Ersetzen mit „nachgewiesene Senior-Level-Arbeit über mehrere Rollen hinweg".
> - `„work hard and play hard"` → streichen. Codiert als jung + grindy. Stößt ältere Kandidat:innen und Eltern ab.
> - `„we're like a family here"` → streichen. Vage und oft ein Flag für Grenzthemen. Ersetzen mit konkreten Team-Normen.
> - `„competitive salary"` → ersetzen mit der tatsächlichen Gehaltsrange. Nicht verhandelbar.

### Die neu geschriebene JD

> **Senior Full-Stack Engineer**
>
> **Über die Rolle**
>
> Du wirst die dritte Senior-Engineerin in einem Team von sieben sein und arbeitest über unseren TypeScript / React / Node / Postgres-Stack, um Features zu shippen, für die unsere Kund:innen tatsächlich zahlen. Tag für Tag heißt das: Produktionscode schreiben, PRs reviewen, gelegentlich mit Mid-Leveln an kniffligen Problemen pairen und einen großen Produktbereich end-to-end besitzen.
>
> **Was du tust**
>
> - Features shippen, die den vollen Stack berühren — vom Postgres-Schema bis zu React-Komponenten
> - Eine unserer drei Produktflächen besitzen (Billing, Integrationen oder Workflows) innerhalb deiner ersten 90 Tage
> - Die technische Latte setzen in einem Team, das von 7 auf 12 Engineers im nächsten Jahr wächst
> - Mit der Product Managerin und dem Designer an Scoping-Entscheidungen pairen, nicht nur an Implementierung
> - Mid-Level-Engineers mentoren, etwa 20 % deiner Zeit dafür (mehr, wenn du willst; weniger, wenn nicht)
>
> **Was wir suchen**
>
> - Nachgewiesene Senior-Level-Arbeit über TypeScript / React im Frontend und Node / Postgres im Backend
> - Du hast in Produktion bei einem Startup oder schnellen Team geshipt — du weißt, was „gut genug zum Shippen" heißt
> - Du kannst deine Arbeit aus einem Ein-Absatz-Problem-Statement selbst scopen
> - Du schreibst Code, den andere ohne Übersetzer lesen und reviewen können
> - Du hast remote mit einem Team über mehrere Zeitzonen gearbeitet
>
> **Nice to have**
>
> - Erfahrung mit AWS (wir sind drauf; bringen dich gerne auf Stand, wenn nicht)
> - Hintergrund in B2B SaaS spezifisch
> - Open-Source-Beiträge oder ein Sideproject, auf das du stolz bist
> - Komfort mit Infra-as-Code (Terraform)
>
> **Vergütung**
>
> - Base-Salary-Range: USD $170.000 – $210.000
> - Equity: 0,05 % – 0,15 %, 4-Jahres-Vest mit 1-Jahres-Cliff
> - Bonus: 10 % Target-Jahresbonus an Company-OKRs gebunden
> - Benefits: volle Krankenversicherung/Dental/Vision (US: 100 % Mitarbeitende, 80 % Angehörige), $1.000/Monat Home-Office-Stipend, unlimited PTO mit 3-Wochen-Minimum, 16 Wochen Elternzeit
>
> **Über das Team**
>
> Sieben Engineers berichten an [Engineering Lead Name, falls öffentlich]. Wir machen 2-Wochen-Sprints, async-first mit zwei kurzen Syncs pro Woche. Keine On-Call-Rotation — wir haben ein kleines Ops-Team dafür. Codebase ist 4 Jahre alt, gut getestet in den Teilen, die zählen, wird sauberer.
>
> **Wie wir einstellen**
>
> 1. 30-Min-Intro mit mir (der Recruiterin)
> 2. 60-Min Technical Interview mit zwei Engineers — ein echtes Problem, an dem wir gearbeitet haben, kein LeetCode
> 3. 60-Min System-Design-Konversation
> 4. 45-Min Meeting mit dem Engineering Lead — Kultur, Arbeitsstil, deine Fragen an uns
> 5. Zwei kurze Referenz-Calls
>
> Gesamtinvestment: ca. 4 Stunden über 2–3 Wochen. Wir entscheiden innerhalb von 5 Werktagen nach der Final Round.
>
> **Arbeitsmodell**
>
> - Remote-first über USA und Kanada
> - Kernzeiten: 11–15 Uhr Eastern, mit Flex drumherum
> - Wir treffen uns zweimal jährlich für ein 3-tägiges Company-Offsite (letztes war in Mexico City; nächstes in Lissabon)
> - Keine Pflichtreisen jenseits der Offsites

Diese JD hat ~480 Wörter. Sie wird 90 % der JDs im selben Posteingang outperformen, weil sie der Kandidat:in genug gibt, um eine echte Entscheidung zu treffen, bevor sie sich bewirbt.

---

## Beispiel — Lint-only-Run

Die Person hat die Original-JD des Hiring Managers eingefügt:

> „We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

Die KI gibt zurück:

> **Lint-Pass — 9 Flags in 51 Wörtern. Vollständiges Rewrite empfohlen.**
>
> 1. `passionate` — streichen (vage, stößt senior Kandidat:innen ab)
> 2. `rock star` — streichen (gegendert, Corporate-Cringe)
> 3. `fast-paced` — streichen (Code für „disorganisiert")
> 4. `dynamic` — streichen (sagt nichts)
> 5. `10x developer` — streichen (Mythos, stößt nachdenkliche Seniors ab)
> 6. `thrives in ambiguity` — markieren (manchmal legitim; meist Code für „wir wissen nicht, was wir wollen")
> 7. `wear many hats` — streichen (Code für „kein Team-Support")
> 8. `Bachelor's degree in CS required` — streichen ODER zu „ODER äquivalente Erfahrung" ändern
> 9. `10+ years of experience` — überdenken (oft diskriminierend; Senior-Qualität oft mit 6–8 Jahren)
> 10. `work hard and play hard` — streichen (alters-codiert, grind-codiert)
> 11. `like a family` — streichen (vage, manchmal Grenz-Flag)
> 12. `Competitive salary` — durch die tatsächliche Range ersetzen
>
> Diese JD wie sie ist wird auf diverser Kandidaten-Pipeline underperformen und weniger Senior-Bewerbungen bekommen, als du möchtest. Soll ich sie umschreiben?

---

## Wann der Linter nicht feuern sollte

Manche markierten Phrasen sind im Kontext legitim. Beispiele:

- „Aggressiv" ist ok für „aggressive Produkt-Roadmap" (eine reale Sache), aber nicht für „aggressive Persönlichkeit" (ein Hire-Signal mit Bias).
- „Family" ist ok, wenn tatsächliche familienfreundliche Policies beschrieben werden (Elternzeit, Kind-krank-Tage). NICHT ok als „we're like a family".
- „Berufseinsteiger" ist ok für Early-Careers-Programme, die explizit so gebrandet sind. NICHT ok in einer Senior-Rolle.

Der Linter markiert diese kontextabhängigen Fälle als „Flag, nicht Auto-Replace — Intent bestätigen".

---

## Wie das mit Hiring Managern nutzen

Ein häufiges Szenario: Der Hiring Manager schreibt die JD. Du denkst, sie ist schlecht. Du willst nicht, dass die Person sich angegriffen fühlt.

Der Lint-Pass gibt dir einen nicht-konfrontativen Weg, zurückzudrücken. Zeig ihm die markierten Phrasen mit dem WARUM (forschungsbasiert: gegenderte Sprache reduziert weibliche Bewerbungen um 11 %; „10+ Jahre" filtert qualifizierte Kandidat:innen mit 6–8 Jahren Senior-Qualität raus; Bildungs-Gatekeeping schrumpft die diverse Pipeline).

Du sagst dem Hiring Manager nicht, dass seine Schreibe schlecht ist. Du zeigst ihm die Daten zu dem, was die Sprache mit dem Bewerber:innenpool macht. Die meisten Hiring Manager updaten gerne, sobald sie es sehen.

---

## Häufige Fehler, die das Kit markieren wird

- **Keine Gehaltsrange.** Frag immer. Inkludiere immer.
- **Keine echte „Wie wir einstellen"-Sektion.** Generisches „mehrere Runden" ist ein Flag — sei spezifisch.
- **JD über 800 Wörter.** Kürzen. Lange JDs sind Unentschlossenheit.
- **„Bonus" in der Range gelistet, aber nicht erklärt.** Immer die Struktur nennen.
- **Equity-Ranges viel zu weit.** „0,01 % – 1 %" sagt der Kandidat:in nichts. Engen.
- **„Nice to have"-Sektion, die die tatsächlichen Anforderungen enthält.** Versteck keine Must-haves in Nice-to-haves; es verwirrt Kandidat:innen und gatekeept gute aus.
