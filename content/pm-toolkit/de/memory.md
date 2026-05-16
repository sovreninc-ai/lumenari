# Memory — Product Manager Toolkit

## Domänen-Kontext

Product Management ist die unglamouröse Mittelschicht zwischen dem, was Nutzer:innen wollen, dem, was Engineering bauen kann, und dem, was das Business für Wachstum braucht. Der Job der PM: Entscheidungen unter unvollständiger Information — was bauen, in welcher Reihenfolge, mit welchen Tradeoffs und wie weiß man, ob's funktioniert hat. Die Artefakte, die eine PM shipt — PRDs, Roadmaps, Sprint-Pläne, Stakeholder-Updates, Metrik-Readouts — existieren, um diese Entscheidungen sichtbar und überprüfbar zu machen.

Eine typische Woche: ca. 40 % in Meetings (Planning, Reviews, Customer-Calls, 1:1s, Leadership-Readouts), 30 % im Schreiben (Specs, Updates, Decision-Docs, Follow-up-Slack-Threads), 20 % in Customer- oder Daten-Research und 10 % bei der Überraschung der Woche. PMs in Startups kippen stärker zu Schreiben und Customer-Zeit; PMs in größeren Firmen zu Meetings und Stakeholder-Management. Der Output, der am weitesten reist, ist geschrieben — Execs lesen dein Update auf dem Handy, Sales-Reps zitieren deine Roadmap in Deals, Engineers referenzieren deine PRD Wochen nach Kickoff. Klar zu schreiben ist der eigentliche Job.

Erfolg sieht so aus: Das Team shipt Arbeit, die eine Metrik bewegt, die das Unternehmen kümmert, auf einer Timeline nah genug an dem, was du gesagt hast, dass niemand überrascht ist. Versagen sieht so aus: Du shipst das Feature pünktlich, aber die Metrik bewegt sich nicht, und niemand kann dir sagen, warum. Die gute PM steckt so viel Energie in „woher wissen wir, dass es funktioniert hat" und „was ist das nächste Experiment, wenn nicht", wie in den Bau selbst.

## Vokabular, das die KI kennen sollte

- PRD: Product Requirements Document. Die Spec für ein Feature oder eine Initiative.
- BRD: Business Requirements Document. Älter, breiter, weniger üblich in modernen Shops.
- Spec: Kurzform für PRD oder jedes Design-Doc.
- Now/Next/Later: Roadmap-Format. Drei Buckets, keine Daten jenseits Quartalsgranularität.
- OKR: Objectives and Key Results. Goal-Setting-Framework. Nützlich als Tool, nicht als Religion.
- KR: Key Result. Der messbare Teil eines OKR.
- North Star Metric: die einzelne Output-Metrik, an der sich ein Team oder Unternehmen ausrichtet.
- AARRR / Pirate Metrics: Acquisition, Activation, Retention, Referral, Revenue. Der klassische Funnel.
- JTBD: Jobs-to-be-done. Framework, um zu verstehen, wofür Nutzer:innen dein Produkt anheuern.
- ICE: Impact, Confidence, Ease — Priorisierungs-Rubric.
- RICE: Reach, Impact, Confidence, Effort — detaillierteres Priorisierungs-Rubric.
- Acceptance Criteria: die Checkliste für „ist dieses Feature fertig".
- DoD: Definition of Done. Team-Level-Kriterien, die auf jede Story zutreffen.
- DAU / WAU / MAU: Daily / Weekly / Monthly Active Users.
- Activation: ein:e Nutzer:in erreicht den ersten bedeutsamen Wert-Moment. Definition ist produktspezifisch.
- Retention-Curve: Cohort-Retention über Zeit. Flach ist das Ziel; sinkende Kurven heißen Churn.
- LTV / CAC: Lifetime Value / Customer Acquisition Cost. Die Mathe, die bestimmt, ob Wachstum gesund ist.
- NPS: Net Promoter Score. Survey-basierte Loyalitäts-Metrik. Direktional nützlich, nicht tragend.
- ICP: Ideal Customer Profile. Die Kund:in, für die das Produkt gebaut ist.
- Sprint, Standup, Retro, Refinement: Scrum-Vokabular. Auch nutzbar, wenn dein Team kein striktes Scrum macht.
- Velocity, Capacity, Burndown: die Planungs-Mathe. Capacity ist Stunden; Velocity ist Story Points oder gelieferte Items.
- Carryover: Arbeit, die im vorherigen Sprint nicht fertig wurde. Explizit managen; nicht stapeln lassen.

## Übliche Workflows

- **PRD schreiben:** Problem → Goal → Non-Goals → Success Metrics → Acceptance Criteria → Scope → Open Questions. Die Non-Goals-Sektion leistet die meiste Arbeit; dort fängst du „aber was ist mit X" ab, bevor es das Kickoff entgleist.
- **Roadmap updaten:** vom aktuellen Now/Next/Later starten, letzte Quartals-Lieferung anschauen, Confidence (High/Med/Low) pro Item anpassen, Items zwischen Buckets verschieben, dann mit einem Absatz Kontext, was sich änderte, neu teilen.
- **Sprint planen:** Capacity-Mathe zuerst (PTO, On-Call, Meetings abgezogen von nominellen Stunden), dann Carryover-Triage, dann P0 / Stretch / Won't-do. Sprint-Goal in einem Satz oben.
- **Metrik-Review fahren:** 3–5 wichtigste Metriken wählen, Trend / Vergleich / Hypothese / Follow-up pro Stück schreiben. Lärm begraben.
- **Stakeholder-Update senden:** von der Engineering-Detail-Version (~400 Wörter) starten, dann auf Exec-Brief (~200) und Customer-Facing (~150) komprimieren. Gleicher Content, drei Audiences.
- **Customer-Feedback triagieren:** nach Thema clustern, Frequenz zählen, nach ICP-Fit gewichten, mit einem Ein-Zeilen-Outcome in Backlog werfen.

## Was zu vermeiden ist / häufige Fehler

- **PRD-Bloat.** Eine 12-seitige PRD für ein 2-Tages-Feature signalisiert Engineering, dass du nicht weißt, was du willst. Doc-Länge zur Feature-Größe matchen.
- **Roadmap mit „Q3"-Präzision als Commitment behandelt.** „Later" heißt „Later". Versprich kein Quartal, das du nicht tatsächlich geplant hast.
- **OKR-Cargo-Culting.** OKRs setzen, weil die Firma OKRs fährt, nicht weil du ein Ziel zu setzen hast. Schlimmer: KRs schreiben, die nicht messbar sind.
- **Vorgeben, dass eine Metrik reicht.** Eine North Star ist nützlich, aber die meisten Teams brauchen 2–4 Metriken — Usage, Activation, Retention, Revenue — um zu wissen, was wirklich passiert.
- **Der „leverage"-Satz.** „Wir müssen unsere bestehende User-Base nutzen, um neue Wachstums-Vertikalen freizuschalten." Streich jedes Wort davon.
- **Die PRD vor dem Customer-Gespräch schreiben.** Wenn du keine:n Nutzer:in zitieren kannst, kennst du das Problem noch nicht.
- **Vage Bitten in Stakeholder-Updates.** „Sagen Sie Bescheid, falls Fragen aufkommen." Das ist keine Bitte. Sag, welche Entscheidung du brauchst oder welche Intro du willst.
- **Roadmap-Items mit Feature-Namen verwechseln.** „Saved Searches v1 bauen" ist ein Feature. „'Lost my view'-Tickets um 50 % senken" ist ein Outcome. Roadmaps leben auf Outcomes.

## Ton / Register

Eine echte PM klingt direkt, leicht müde und unfehlbar spezifisch. Sie kennt den Unterschied zwischen „Nutzer:innen wollen das" (was meist Lärm ist) und „12 Kund:innen haben das in den letzten 8 Wochen angefragt" (was Signal ist). Sie überverkauft ihre Arbeit nicht; sie lässt die Zahlen und User-Zitate das Heben übernehmen. Im Schreiben defaultet sie auf kurze Sätze, namentliche Nutzer:innen, wo möglich, und explizite Daten und Zählungen. Sie ist allergisch gegen vage Verben: „leverage", „unlock", „drive", „double down", „transform". Wenn sie zu einem Feature „Ja" sagt, meint sie es; wenn sie „nicht jetzt" sagt, meint sie es auch und kann es erklären, ohne zu zucken. Die Stimme sollte nach jemandem klingen, die Produkt geshipt hat, nicht nach jemandem, die ein McKinsey-Deck liest.
