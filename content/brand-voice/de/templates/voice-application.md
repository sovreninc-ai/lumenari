# Voice Application

Verwenden Sie dies, sobald Sie ein gespeichertes Voice-Profil haben. Fügen Sie das Profil + den Draft ein, den Sie umgeschrieben haben wollen. Die KI produziert einen voiced Rewrite und einen Self-Check.

---

## Der Prompt

```
Sie wenden ein gespeichertes Brand-Voice-Profil auf einen Draft an. Regeln:

1. Lesen Sie das Profil vollständig, bevor Sie beginnen. Gewichten Sie tragende Achsen (1en und 5en) am stärksten.
2. Nutzen Sie die Vokabular-Signatur als Leitlinie. Nutzen Sie die Ban-Liste als harten Filter — wenn Sie zu einem verbotenen Wort greifen, ersetzen Sie es.
3. Matchen Sie den Satzlängen-Durchschnitt. Produzieren Sie keine Sätze mit 2x der durchschnittlichen Länge.
4. Setzen Sie das Framing Device im Opener ein. Der erste Satz ist dort, wo Voice am sichtbarsten ist.
5. Nach dem Rewrite führen Sie einen Self-Check durch: Für jeden Absatz oder Hauptblock kennzeichnen Sie ihn als on-voice / drift / off-voice. Zitieren Sie jede spezifische Zeile, bei der Sie unsicher sind.

Output-Format:

## Rewrite
[Ihre voiced Version]

## Self-Check
- Absatz 1: on-voice / drift / off-voice — [Begründung]
- Absatz 2: on-voice / drift / off-voice — [Begründung]
- ...
- Zeilen, bei denen ich unsicher bin:
  - "[zitierte Zeile]" — [Grund für den Flag]

Profil und Draft folgen.
```

---

## Ihr Input darunter

```
[Voice-Profil]
[volles gespeichertes Profil hier einfügen]

[Draft]
[generische, rohe oder Wettbewerber-gefärbte Copy einfügen, die Sie umgeschrieben haben wollen]

[Ziel]
Wofür ist das? Welche Action soll der Leser nach dem Lesen ausführen?

[Constraints (optional)]
- Längenobergrenze
- Format (E-Mail, Landing Hero, Ad Copy, Tweet Thread, etc.)
- Spezifische Fakten, die im Rewrite bleiben müssen
```

---

## Durchgearbeitetes Beispiel

**Profil (gekürzt):**
```
Voice: Solo Builder
Tragend: Serious/Playful 2 (trocken), Direct/Diplomatic 5 (verdict-first)
Avg sentence: 9 Wörter
Greift zu: shipped, hard pass, here's, thing
Verwendet nie: leverage, transform, unlock, journey, passion, ecosystem
Framing: verdict-first Opener; Body erklärt
```

**Draft (generischer KI-Output):**
> "We are thrilled to announce the launch of our new productivity platform designed to help busy founders streamline their daily operations through cutting-edge AI technology, allowing them to focus on what truly matters: building their dream business and transforming their lives."

**Ziel:** E-Mail, die den Launch an meinen Newsletter ankündigt. Will Clicks auf die Produktseite.

**Rewrite:**
> Shipped the productivity tool. It runs the five admin tasks you waste a day on. Takes about a minute to set up. Link below.

**Self-Check:**
- Satz 1: on-voice — verdict-first Opener, 4 Wörter, verwendet "shipped" aus der Vokabular-Signatur.
- Satz 2: on-voice — 11 Wörter, Second-Person, kein Jargon.
- Satz 3: on-voice — 7-Wort-Fragment-Kadenz.
- Satz 4: on-voice — minimal, endet auf einem CTA ohne Selling.
- Zeilen, bei denen ich unsicher bin: keine.

---

## Warum jede Regel zählt

**Lesen Sie das Profil vollständig.** KI-Tools gewichten standardmäßig die ersten paar Zeilen eines Prompts am stärksten. Wenn das Profil Absatz 4 ist und der Draft Absatz 5, gewinnt der Draft. Eine explizite Anweisung zum vollständigen Lesen behebt das.

**Gewichten Sie tragende Achsen am stärksten.** Eine Voice, die 2 auf Serious/Playful mit Tragend-Flag bewertet ist, bedeutet, Witze sind ein hartes Nein. Eine Voice, die 4 auf Casual ohne Tragend-Flag bewertet ist, bedeutet, Kontraktionen sind okay, aber Slang ist nicht tragend. Die KI muss wissen, welche Merkmale nicht verhandelbar sind.

**Ban-Liste als harter Filter.** Ohne harten Filter schmuggeln KI-Rewrites verbotene Wörter via Synonyme zurück rein. "Leverage" wird durch "harness" ersetzt. "Unlock" wird "tap into". Die Regel: Wenn die Bedeutung einem verbotenen Wort entspricht, finden Sie einen Weg, es zu sagen, ohne diese semantische Form.

**Matchen Sie Satzlänge.** Das ist der einfachste Rhythmus-Marker zum Durchsetzen und derjenige, den die KI am häufigsten falsch macht. Eine 9-Wort-Durchschnitt-Voice, die plötzlich einen 28-Wort-Satz produziert, liest sich wie eine andere Person.

**Framing Device im Opener.** Erste Sätze sind dort, wo Voice am diagnostischsten ist. Wenn Ihre Voice verdict-first ist und der Rewrite mit "In a world where..." beginnt, zählt nichts anderes.

**Self-Check mit Flags.** Ehrliche Flags sind nützlicher als falsche Sicherheit. Ein Rewrite, der sagt "Absatz 3 driftet Richtung generisch", lässt Sie ihn fixen. Ein Rewrite, der behauptet, alles besteht, obwohl Absatz 3 klar off ist, zwingt Sie zum Nachlesen und Selbst-Aufspüren.
