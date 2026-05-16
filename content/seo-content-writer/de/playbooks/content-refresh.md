# Content-Refresh-Playbook

Die SEO-Arbeit mit der höchsten Hebelwirkung ist selten das Schreiben neuer Artikel. Sie liegt im Fixen der Artikel, die du schon hast. Dieses Playbook sagt dir, wann zu updaten, wann neu zu schreiben, wann zu konsolidieren und wann zu löschen ist — plus den Prompt, der jedes davon sicher erledigt.

---

## Der Refresh-Entscheidungsbaum

Lass jeden Kandidatenartikel der Reihe nach durchlaufen. Stopp beim ersten Treffer.

### Schritt 1: Daten ziehen

Für jeden Artikel, den du in Betracht ziehst, hole:

- Aktuelles Google-Ranking für das Primär-Keyword (Search Console)
- Trend der durchschnittlichen Position über die letzten 12 Monate
- Click-Through-Rate
- Die aktuellen Top-3-SERP-Ergebnisse
- `datePublished` und `dateModified` des Artikels
- Backlinks zur URL (Ahrefs, Semrush oder was du nutzt)

10 Minuten Datensammlung bewahren dich vor dem falschen Refresh.

### Schritt 2: Den Baum durchlaufen

**F1: Rankt der Artikel auf Seite 1 oder Seite 2?**
- JA → **In-Place updaten.** URL erhalten, interne Links erhalten, Backlinks erhalten. Nur die Substanz auffrischen.
- NEIN → weiter.

**F2: Rankt der Artikel auf Seite 3–5 und ist die Intent missmatched?**
(z. B. dein Artikel ist ein Tutorial, aber die SERP belohnt jetzt Vergleichsartikel)
- JA → **Um die richtige Intent neu schreiben.** URL behalten. Behandle es wie einen neuen Artikel, der die Autorität der alten URL nutzt.
- NEIN → weiter.

**F3: Hast du zwei Artikel, die um dasselbe Keyword konkurrieren?**
- JA → **Konsolidieren.** Wähle die stärkere URL (mehr Backlinks, besseres aktuelles Ranking). Merge den besseren Content hinein. 301 die schwächere URL auf die stärkere.
- NEIN → weiter.

**F4: Hat sich die Anfrage grundlegend geändert?**
(z. B. das Feature wurde umbenannt; AI Overview frisst Klicks; die SERP hat zu Video gewechselt)
- JA → **Major Rewrite.** Neuer Winkel, neues Format falls nötig. URL nur behalten, wenn der alte Artikel noch genug Relevanz + Backlinks hat, um die URL-Erhaltung zu rechtfertigen.
- NEIN → weiter.

**F5: Wurde das Thema deprecated?**
(z. B. das Produkt existiert nicht mehr; das Gesetz wurde geändert; das Framework wurde eingestellt)
- JA → **Löschen und 301** zum nächstverwandten aktuellen Artikel. Wenn nichts in der Nähe ist, gib 410 (gone) zurück.
- NEIN → weiter.

**F6: Rankt der Artikel, verliert aber im Jahresvergleich Traffic?**
- JA → **In-Place updaten + Tiefe ergänzen.** Wahrscheinlich verliert er Klicks an einen neueren Artikel. Substanz auffrischen, fehlende Aspekte ergänzen, Meta updaten.
- NEIN → in Ruhe lassen, weiteres Quartal beobachten.

---

## Muster 1: In-Place updaten (der häufigste Refresh)

Für Artikel, die auf Seite 1–2 ranken und einfach eine Auffrischung brauchen.

### Was du tust

- Veraltete Stats und Fakten updaten
- Screenshots ersetzen, wenn sich die UI geändert hat
- Neue Sub-Sections hinzufügen, wenn das Thema neue Dimensionen hat
- Schwache Abschnitte stärken (die mit niedriger Scroll-Tiefe in PostHog/Hotjar/etc.)
- Interne Links updaten, wenn du seitdem besseren verwandten Content veröffentlicht hast
- `dateModified`-Schema updaten
- URL NICHT ändern
- KEINE Abschnitte entfernen, die das Ranking einbringen

### Der Prompt

```
Du bist der SEO Content Strategist.

Ich refreshe diesen Artikel in-place. Die URL bleibt. Die meiste Struktur bleibt.

**Artikel-URL:** [URL]
**Primär-Keyword:** [Keyword]
**Aktuelles Ranking:** [Position]
**Aktuelle SERP Top 3:** [einfügen]
**Zuletzt published / modified:** [Daten]

**Der Artikel in aktueller Form (einfügen):**
[voller Artikel]

Was ich will:
1. Eine Diff-Style-Liste der Änderungen (mit Gründen)
2. Neue Abschnitte, die du hinzufügen würdest, oder Sub-Sections innerhalb bestehender H2
3. Veraltete Fakten/Stats, die geupdated werden müssen (mit „Quelle benötigt"-Flags)
4. Aktualisierter Meta-Title und Description NUR wenn die aktuellen schwach sind
5. Interne Linkvorschläge für die neuen Abschnitte

Schreib KEINE funktionierenden Abschnitte um, außer du kannst einen konkreten Grund nennen, warum sie underperformen.
```

### Beispielausgabe

> **Diff-Plan:**
>
> 1. **Update H2 #3 („Pricing-Vergleich")** — die Tabelle hat 2024er Preise. HubSpot, Pipedrive und Salesforce haben sich alle bewegt. Aktuelle Preise von der jeweiligen Pricing-Page ziehen. *(Quelle benötigt: jeweils aktuelle Pricing-Page der Anbieter)*
> 2. **Neues H2 zwischen aktuellem #4 und #5 hinzufügen: „Was sich 2026 geändert hat"** — geht auf die KI-Features ein, die jede CRM jetzt bündelt. Das ist, wofür die SERP jetzt neuere Artikel rankt. ~250 Wörter.
> 3. **H2 #5 („Best für unter 20 Kontakte") stärken** — aktuell 180 Wörter, kannst du mit einer Real-Test-Anekdote verdoppeln. PAA-Daten zeigen, dass User exakt diesen Cut suchen.
> 4. **Interne Links updaten** — deine alte Version verlinkt auf `/crm-pricing-teardown`, das jetzt weiterleitet. Auf die aktuelle URL `/saas-pricing-deep-dive` updaten.
> 5. **Meta-Title bleibt** (funktioniert, 54 Zeichen, Primär-Keyword vorne).
> 6. **Meta-Description-Update** — die aktuelle ist die H1 umformuliert. Ersetzen mit: „Tested 7 CRMs for 90 days each — refreshed for 2026 with new AI features, current pricing, and the one I'd actually pick today." (153 Zeichen)
>
> **Abschnitte, die du NICHT anfassen solltest:**
> - Die „How I tested these"-Sektion ist dein E-E-A-T-Rückgrat und verdient das Ranking. Lass sie.
> - Die H1 bleibt. Das ist der Titel, der den Klick verdient.
>
> **Was fehlt:**
> - „Free CRM for solopreneurs" wird derzeit nicht adressiert — PAA zeigt echtes Volumen auf diesem Cut. Erwäge, es als H3 innerhalb H2 #4 zu ergänzen.

---

## Muster 2: Um neue Intent umschreiben

Wenn dein Artikel Seite 3–5 rankt, weil Google jetzt ein anderes Format für diese Anfrage will.

### Signale, dass sich die Intent verschoben hat

- Die heutigen Top-3-Ergebnisse haben ein anderes Format als zum Veröffentlichungszeitpunkt
- Deine CTR ist unter 1 % selbst bei Position 5–7 (heißt: du wirst gezeigt, aber nicht geklickt)
- Die PAA-Fragen haben sich geändert
- Ein AI Overview ist erschienen

### Was du tust

- URL behalten (sie hat Autorität)
- Neue Outline, die zur neuen SERP passt
- Neue H1, neuer Meta-Title, neue Meta-Description
- Kurze Redirect-Kontext-Notiz für Personen ergänzen, die die alte Version verlinkt haben, ODER genug vom ursprünglichen Winkel als Sub-Section behalten, damit diese Backlinks noch relevant wirken

### Der Prompt

```
Du bist der SEO Content Strategist.

Ich schreibe diesen Artikel um die neue Intent herum neu. URL bleibt.

**Artikel-URL:** [URL]
**Primär-Keyword:** [Keyword]
**Aktuelles Ranking:** [Position]
**Aktuelle SERP Top 3:** [einfügen]
**Der Artikel in aktueller Form:**
[voller Text]

Was ich beobachtet habe:
- [warum ich glaube, dass sich die Intent verschoben hat — was sich in der SERP geändert hat]

Was ich will:
1. Intent-Klassifikation der NEUEN SERP
2. Eine neue Outline (gleiche Tiefe wie das Article-Outliner-Template)
3. Welche (falls überhaupt) Abschnitte des alten Artikels wörtlich erhalten bleiben sollten
4. Aktualisierter Meta-Title + Description
5. Eine Notiz zur Backlink-Kontinuität — muss ich mir um den Verlust welcher Sorgen machen?
```

---

## Muster 3: Zwei konkurrierende Artikel konsolidieren

Wenn du entdeckst, dass du dich selbst kannibalisierst.

### Wie zu erkennen

- Search Console zeigt zwei deiner URLs, die beide Impressions für dasselbe Keyword einsammeln
- Beide URLs schweben auf Seite 2–3 und steigen nie
- Keine hat klaren Vorsprung in Content-Tiefe oder Backlinks

### Was du tust

- Wähle die überlebende URL (mehr Backlinks, oder die, die sauberer zur Anfrage passt)
- Merge den besseren Content der verlierenden URL in den Survivor
- 301 die verlierende URL auf den Survivor
- Aktualisiere alle internen Links, die auf den Verlierer zeigen

### Der Prompt

```
Du bist der SEO Content Strategist.

Ich habe zwei Artikel, die um dasselbe Keyword konkurrieren. Ich muss konsolidieren.

**Keyword:** [Primär-Keyword]

**Artikel A:**
- URL: [A]
- Aktuelles Ranking: [Position]
- Backlinks: [Anzahl]
- Veröffentlicht: [Datum]
- [vollen Artikel einfügen]

**Artikel B:**
- URL: [B]
- Aktuelles Ranking: [Position]
- Backlinks: [Anzahl]
- Veröffentlicht: [Datum]
- [vollen Artikel einfügen]

Was ich will:
1. Wähle die überlebende URL mit Begründung
2. Eine zusammengeführte Outline, die das Beste aus beiden zieht
3. Den vollständigen gemergten Draft
4. Eine Liste interner Links, die aktuell auf die Verlierer-URL zeigen und geupdated werden müssen
5. Den 301-Plan
```

---

## Muster 4: Major Rewrite (Anfrage hat sich grundlegend geändert)

Der härteste Call. Der Artikel rankt noch, aber die Welt hat sich weiterbewegt. Beispiele: Ein AI Overview beantwortet jetzt die Anfrage und der Traffic ist um 60 % gefallen; das Framework, über das du geschrieben hast, wurde deprecated; das Suchverhalten ist von Text zu Video gewandert.

### Was du tust

- Major Rewrite, oft komplett neuer Winkel
- URL-Entscheidung basierend auf Backlink-Wert: Wenn die URL starke Backlinks hat, behalten und neu schreiben; wenn nicht, neue URL ist ok
- Meta, Schema, interne Links updaten

Das ist kein wirklicher „Refresh" — es ist ein neuer Artikel, der die Autorität der alten URL nutzt. Behandle es wie das Schreiben eines neuen Stücks, mit dem Article-Outliner-Template (`templates/article-outliner.md`).

---

## Muster 5: Löschen und 301

Wenn das Thema wirklich deprecated ist.

### Beispiele

- Ein Produkt, das du reviewt hast, hat geschlossen
- Ein Gesetz, über das du geschrieben hast, wurde ersetzt
- Ein Framework, das du lehrtest, wurde eingestellt
- Ein Trend-Artikel, dessen Moment vorbei ist, und du hast kein Interesse, ihn zu aktualisieren

### Was du tust

- 301 die URL zum nächstverwandten aktuellen Artikel
- Wenn nichts in der Nähe ist, gib 410 (gone) zurück, damit Google sie sauber entfernt
- Nicht einfach löschen und 404 laufen lassen — das verschwendet Backlink-Equity

---

## Der SERP-Intent-Analyzer-Prompt

Nutze das, wenn du nicht entscheiden kannst, WELCHES Refresh-Muster passt.

```
Du bist der SEO Content Strategist.

Hilf mir zu klassifizieren, welchen Refresh dieser Artikel braucht.

**Artikel-URL:** [URL]
**Primär-Keyword:** [Keyword]
**Aktuelles Ranking:** [Position]
**12-Monats-Trend:** [steigt / stabil / sinkt]
**Top 3 SERP-Ergebnisse heute:** [einfügen]

**Der Artikel (einfügen):**
[voller Artikel]

Lauf meinen Refresh-Entscheidungsbaum durch. Sag mir:
1. Welches Muster passt (in-place updaten / Intent-Rewrite / konsolidieren / Major Rewrite / löschen)
2. Die Begründung
3. Den ersten konkreten Schritt, den ich machen soll
```

Der Output sollte eine klare „Muster X weil Y"-Antwort plus den ersten Schritt sein. Wenn die KI hedget oder sagt „es kommt drauf an", drück nach: „Wenn du dich entscheiden müsstest, welches?"

---

## Beispiel — „was ist HubSpot used for"

Eine echte Refresh-Entscheidung. Der Artikel rankt #4. CTR ist 0,8 %. Die SERP Top 3 sind jetzt von kurzen, definitionsähnlichen Antworten dominiert mit einem AI Overview, der zwei davon zitiert. Der Artikel ist aktuell 1.800 Wörter und beginnt mit einem Marketing-Pitch.

**Entscheidungsbaum-Durchlauf:**
- Seite 1? Fast (#4). Seite-2-Territorium.
- Intent-Mismatch? Ja — die SERP will kurzen, definitorischen, fakten-zuerst Content. Der Artikel ist Longform und marketing-lastig.
- Zwei konkurrierende Artikel? Nein.
- Anfrage grundlegend geändert? Eher ja — AI-Overview-Präsenz hat den Klick-Wert komprimiert.
- Thema deprecated? Nein, HubSpot existiert sehr wohl.

**Verdikt:** Muster 2 (um neue Intent umschreiben). URL behalten (hat 12 Backlinks). Restrukturieren als fakten-zuerst definitorisches Stück mit einer straffen 50-Wort-Antwort oben, dann Erweiterungen. Marketing-Pitch-Ton raus. Featured Snippet direkt targetieren.

**Erwarteter Ausgang:** Ranking klettert von #4 auf #1–2, aber absolute Klickzahlen springen vielleicht nicht dramatisch, weil das AI Overview den Klick sowieso frisst. Der Gewinn ist Brand-Präsenz in den AI-Zitationen und Recovery von Organic für gebrandete Variant-Anfragen.

---

## Häufige Refresh-Fehler, die das Kit markieren wird

- **Die URL eines Artikels ändern, der Seite 1 rankt.** Du verlierst Ranking und Backlink-Equity. In-place refreshen.
- **Einen Artikel ohne 301 löschen.** Verschwendete Backlinks, 404-Errors in Search Console.
- **Refreshen, ohne zu prüfen, warum Traffic fiel.** Manchmal ist der Artikel ok und die ANFRAGE ist im Volumen gefallen. Check Search-Console-Gesamtimpressions, bevor du den Artikel zum Problem erklärst.
- **Zu oft refreshen.** Alle 6–12 Monate ist die richtige Kadenz für die meisten Artikel. Monatliches Refreshen wirkt für Google verdächtig und verbrennt deine Zeit.
- **`dateModified` updaten, ohne tatsächlich Substanz zu aktualisieren.** Google merkt das und ignoriert das Freshness-Signal.
- **Abschnitte entfernen, die das Ranking einbringen.** Schau immer Scroll-Tiefe und Time-on-Section-Daten an, bevor du kürzt.

---

## Refresh-Kadenz — wie ein Jahr planen

Ein kleines Content-Team kann produktiv 4–8 Artikel pro Monat refreshen. Eine Solo-Operatorin sollte 2–3 pro Monat anpeilen, priorisiert nach:

1. Artikeln, die in den letzten 90 Tagen am meisten absoluten Traffic verloren haben
2. Artikeln, die Position 4–15 ranken mit hohem CTR-Potenzial
3. Artikeln, die von deinen High-Traffic-Seiten verlinkt werden (das Refreshen davon verstärkt den internen Link-Benefit)
4. Artikeln, die 18+ Monate alt sind und nicht angefasst wurden

Lass den Refresh-Entscheidungsbaum auf jedem laufen. Pick das Muster. Führe aus. Refresh nicht alle und republish nicht alle; manche werden dir sagen, dass du löschen oder konsolidieren sollst. Das ist das Playbook in Aktion.
