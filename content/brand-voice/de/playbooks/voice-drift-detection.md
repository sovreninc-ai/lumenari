# Voice Drift Detection

Für den Fall, dass Sie vermuten, der KI-Output ist zurück in den Corporate-Default abgerutscht. Führen Sie dies auf jedem Draft aus, bevor er live geht — insbesondere Sales Pages, Fundraise Posts, Manifeste, Launch-Ankündigungen.

---

## Der Prompt

```
Sie auditieren einen Draft auf Voice-Drift gegen ein gespeichertes Profil. Regeln:

1. Vergleichen Sie den Draft mit der Profil-Rubrik. Seien Sie nicht großzügig. Drift zu flaggen ist nützlicher, als sie zu entschuldigen.
2. Bewerten Sie jeden Absatz (oder jeden Block — Section Header, Bullet List, CTA) als: on-voice / drift / off-voice.
3. Für jeden Drift- oder Off-Voice-Call zitieren Sie die exakte Phrase, die den Call ausgelöst hat, und benennen, welche Voice-Regel verletzt wurde.
4. Schließen Sie mit einer "Fix Priority" — welche 2-3 Dinge würden die Voice-Konsistenz am stärksten verbessern, wenn zuerst gefixt.

Output-Format:

## Section-by-section
- [Section 1 Label]: on-voice / drift / off-voice
  - Trigger: "[zitierte Phrase]" — verletzt [Regel]
- [Section 2 Label]: on-voice / drift / off-voice
  - Trigger: "[zitierte Phrase]" — verletzt [Regel]
- ...

## Gesamt-Drift-Score: X/10
(10 = perfekt on-voice; 0 = nicht wiedererkennbar)

## Fix Priority (Top 3)
1. [Spezifische Änderung mit Beispiel]
2. [Spezifische Änderung mit Beispiel]
3. [Spezifische Änderung mit Beispiel]

Profil und Draft folgen.
```

---

## Ihr Input

```
[Voice-Profil]
[volles gespeichertes Profil einfügen]

[Draft]
[vollen Draft einfügen, den Sie auditieren wollen]
```

---

## Die Drift-Signale, auf die zu achten ist

**Banned-Word-Schmuggel.** Die häufigste Drift. Die KI weiß, dass sie "leverage" nicht verwenden kann — also schreibt sie "harness" oder "tap into" oder "unlock". Gleiche semantische Form, anderes Wort. Die Regel: Wenn ein Satz dasselbe bedeutet wie ein verbotenes Wort bedeutet hätte, ist es immer noch Drift.

**Sentence-Length-Creep.** Die Voice mittelt 9 Wörter. In der Mitte des Drafts sind die Sätze 18 Wörter und steigend. Das ist die KI, die zurück zu "smoother" Prosa fällt. Prüfen Sie Satzlänge immer in der zweiten Hälfte langer Drafts.

**Generische Opener.** "In einer Welt, in der..." "Heutige [Audience] brauchen..." "Wir alle kennen das..." Jedes davon in einer Voice, die 5 auf Direct/Diplomatic bekommen hat, ist automatisch off-voice.

**Drei-Akt-Drift.** "Zuerst... Dann... Schließlich..." oder "Drei Dinge haben sich geändert..." Wenn Ihre Voice sich nicht so bewegt, wird die KI diese Struktur trotzdem auferlegen. Fangen Sie es ab.

**Adjektiv-Stacking.** "Bold, witty, and confident messaging." Voices reden nicht über sich selbst in Adjektiven. Wenn der Draft einen Satz hat, der die Marke im Drei-Adjektiv-Rhythmus beschreibt, ist das Drift.

**Audience-Flattery.** "Für Founder, die sich nicht zufriedengeben." "Für die wenigen, die es verstehen." Wenn das Voice-Profil keine Audience-Flattery als Framing Device beinhaltet, ist das Drift — die KI bauchpinselt.

**"Excited to announce."** Jede Voice, die keine Pressemitteilung aus 2007 ist, sollte diese Phrase nie verwenden. Behandeln als automatisch off-voice.

---

## Durchgearbeitetes Beispiel

**Profil (gekürzt):**
```
Voice: Solo Builder
Tragend: Direct/Diplomatic 5 (verdict-first Opener), Serious/Playful 2 (trocken, keine Witze)
Avg sentence: 9 Wörter
Ban list: leverage, transform, unlock, journey, passion, ecosystem, excited to announce
```

**Draft zum Auditieren:**
> "We're excited to share something we've been working on for a long time. In today's fast-paced world, founders are constantly juggling priorities and struggling to find the time to focus on what truly matters. That's why we built a tool that unlocks productivity and helps you transform the way you work. We can't wait for you to try it."

**Audit-Output:**

```
## Section-by-section
- Satz 1: off-voice
  - Trigger: "We're excited to share" — verletzt Ban-Liste (Auto-Flag für Pressemitteilungs-Sprache)
- Satz 2: off-voice
  - Trigger: "In today's fast-paced world" — verletzt Anti-Pattern-Liste (generischer Opener); verletzt Verdict-First Framing Device
- Satz 3: off-voice
  - Trigger: "unlocks productivity" + "transform the way you work" — verletzt Ban-Liste (unlock + transform zusammen geschmuggelt)
- Satz 4: drift
  - Trigger: "We can't wait for you to try it" — verletzt Direct/Diplomatic 5 (das ist hedgende Wärme, kein Verdict oder CTA)

## Gesamt-Drift-Score: 1/10
(Nicht als gespeicherte Voice wiedererkennbar. Liest sich als Default-KI-Output.)

## Fix Priority (Top 3)
1. Schreiben Sie den Opener als Verdict um. Beispiel: "Shipped a tool that runs the five admin tasks founders waste a day on."
2. Streichen Sie den gesamten mittleren Satz. Die Voice erklärt nicht — sie behauptet und geht weiter.
3. Ersetzen Sie den warmen Closer durch ein direktes CTA. Beispiel: "Link below."
```

Das ist der Test. Wenn das Audit "perfekt on-voice" sagt und Sie Drift im Draft sehen können, ist das Audit falsch — fügen Sie das Profil erneut ein und führen Sie es nochmal aus. Ehrliche Drift-Detection ist nützlicher als ein falsches Pass.

---

## Wann Drift Detection ausführen

- Vor jedem High-Stakes-Asset, das released wird (Sales Page, Fundraise Post, Launch Email, Manifest)
- Bei jedem Rewrite, den die KI Ihnen für Longform-Content liefert (über 400 Wörter)
- Wenn Sie vermuten, Ihre Voice habe sich verschoben, aber nicht artikulieren können warum — führen Sie es auf drei kürzlichen Assets aus und vergleichen
- Quartalsweise auf Ihrem veröffentlichten Content, als Kalibrierungs-Check, bevor Sie ein frisches Profil extrahieren
