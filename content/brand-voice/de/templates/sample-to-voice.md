# Sample-to-Voice Extractor

Fügen Sie diesen Prompt am Anfang eines neuen Chats ein (oder in einen System-Prompt-Slot) und fügen Sie Ihre Samples darunter ein. Der Output ist ein vollständiges Voice-Profil, das Sie als `voice-profile.md` speichern und in jeder zukünftigen Session wiederverwenden können.

---

## Der Prompt

```
Sie sind ein Brand-Voice-Editor. Ich werde 3-5 Schreibproben einfügen. Ihre Aufgabe ist es, ein wiederverwendbares Voice-Profil zu extrahieren.

Regeln:
- Jede Beobachtung muss eine spezifische Zeile aus den Samples zitieren. Keine unzitierten Behauptungen.
- Bewerten Sie vier Voice-Attribut-Achsen 1-5. Flaggen Sie jede 1 oder 5 als tragend.
- Messen Sie Satzstruktur quantitativ (avg Länge in Wörtern, Variation, Fragmente, häufige Opener).
- Produzieren Sie eine Vokabular-Signatur (Wörter, zu denen die Samples greifen) und eine Ban-Liste (Default-KI-Wörter, die auffällig fehlen).
- Benennen Sie das Framing Device — die wiederkehrende rhetorische Bewegung, die die Voice verankert.
- Keine Archetypen. Keine Brand Essence. Keine Adjektiv-Stacks ("bold, witty, confident").

Output-Schema (exakt verwenden):

# Voice Profile — [Name]
_Extrahiert aus N Samples am [Datum]_

## Voice-Attribut-Scores
- Formal/Casual: X (tragend: j/n) — [Beobachtung]
- Serious/Playful: X (tragend: j/n) — [Beobachtung]
- Direct/Diplomatic: X (tragend: j/n) — [Beobachtung]
- Technical/Accessible: X (tragend: j/n) — [Beobachtung]

## Satzstruktur
- Durchschnittliche Länge: ~N Wörter
- Variation: eng / gemischt / breit
- Fragmente: selten / gelegentlich / häufig (eines zitieren)
- Häufige Opener: [2-3 Patterns auflisten]

## Vokabular-Signatur
**Greift zu:** Wort1, Wort2, Wort3, Wort4
**Verwendet nie:** Wort1, Wort2, Wort3, Wort4

## Framing Device
[1-2 Sätze, die die wiederkehrende Bewegung benennen, mit einem zitierten Beispiel.]

## Anti-Patterns zum Flaggen
- [3-5 konkrete Dinge zum Aufspüren in zukünftigen Drafts]

## On-Voice-Beispiel (aus den Samples)
> [stärkster Sample-Satz]

## Off-Voice-Beispiel (generischer KI-Default)
> [ein Satz, den die KI natürlich produzieren würde und der diese Voice verletzt]

---

Samples folgen. Beschriften Sie jedes, damit ich sauber zitieren kann.
```

---

## Ihr Input-Format unter dem Prompt

```
Sample 1 — [LinkedIn Post / Newsletter-Intro / Landing Copy / etc.]
[Sample einfügen]

Sample 2 — [Label]
[Sample einfügen]

Sample 3 — [Label]
[Sample einfügen]

Sample 4 (optional) — [Label]
[Sample einfügen]

Sample 5 (optional) — [Label]
[Sample einfügen]

Kontext:
- Wer liest den Output dieser Voice? [Audience]
- Wofür ist es üblicherweise? [E-Mails, Sales Pages, Social, etc.]

Constraints:
- [Alles, was off-limits ist — kein Fluchen, keine Ich-Form, niemals Wettbewerber nennen, etc.]
```

---

## Sample-Auswahl — der Teil, den die meisten falsch machen

Die Samples, die Sie reinfüttern, sind die Decke der Voice, die Sie zurückbekommen. Schlecht auswählen, schlechte Ergebnisse bekommen.

**Gute Samples:**
- Dinge, die Sie geschrieben haben und ohne Änderungen wieder shippen würden
- Dinge, die Kunden, Leser oder Ihr Team spezifisch hervorgehoben haben, als hätten sie sich wie Sie in Bestform angefühlt
- Ein Stück, das gelandet ist — bekam das Meeting, bekam die Antwort, bekam den Share

**Schlechte Samples:**
- Dinge, die Sie in Eile geschrieben haben und nicht lieben
- Ein formelles Stück, das Sie geschrieben haben, weil die Situation es verlangte (Board-Email, Rechtsbescheid)
- Ein Stück in einer Tonalität, von der Sie tatsächlich nicht mehr wollen
- Alles, was Sie nicht selbst geschrieben haben (es sei denn, Sie matchen explizit eine andere Voice — sagen Sie das im Label)

**Anzahl der Samples:**
- 3 ist das Minimum. Darunter sind Beobachtungen nicht fundiert.
- 5 ist der Sweet Spot für die meisten Voices.
- Mehr als 7 fängt an, das Signal zu verdünnen — die KI mittelt über sie hinweg und verliert die Kante.

---

## Durchgearbeitetes Beispiel — wie guter Output aussieht

**Input-Samples:**
> Sample 1 (Newsletter-Intro): "I shipped a thing and broke it twice. Here's what I learned the second time."
>
> Sample 2 (LinkedIn): "Hard pass on the discovery call. They wanted 12 months and wouldn't define success."
>
> Sample 3 (Landing Hero): "You don't need another framework. Ship one thing this week. Here it is."

**Output-Profil:**

```
# Voice Profile — Solo Builder
_Extrahiert aus 3 Samples am 2026-05-14_

## Voice-Attribut-Scores
- Formal/Casual: 4 (tragend: nein) — Kontraktionen, kein Slang. "Shipped a thing" statt "Launched a new product."
- Serious/Playful: 2 (tragend: ja) — Null Witze. Trocken, wo es lustig ist. "Broke it twice" ist das Nächste an Humor.
- Direct/Diplomatic: 5 (tragend: ja) — Jeder Opener führt mit dem Verdict. "Hard pass on the discovery call."
- Technical/Accessible: 2 (tragend: nein) — Null Jargon. "Define success" statt "establish KPIs."

## Satzstruktur
- Durchschnittliche Länge: ~9 Wörter
- Variation: eng (Range 5-12)
- Fragmente: gelegentlich — "Here it is."
- Häufige Opener: Verb-first ("Shipped..."), Verdict-first ("Hard pass..."), Second-Person-Befehl ("You don't need...")

## Vokabular-Signatur
**Greift zu:** shipped, hard pass, here's, thing, broke, week
**Verwendet nie:** leverage, transform, unlock, framework (ironisch verwendet), passion, journey, ecosystem

## Framing Device
Verdict-first. Der erste Satz jedes Samples nennt die Schlussfolgerung oder den Call. Der Body erklärt. Beispiel: "Hard pass on the discovery call. They wanted 12 months and wouldn't define success."

## Anti-Patterns zum Flaggen
- Jeder Satz, der mit "In today's fast-paced..." beginnt
- Jede Verwendung von "transform", "unlock", "elevate", "leverage"
- Sätze über 18 Wörter (Drift-Signal)
- Drei-Akt-Opener ("First... Then... Finally...")

## On-Voice-Beispiel (aus den Samples)
> "You don't need another framework. Ship one thing this week. Here it is."

## Off-Voice-Beispiel (generischer KI-Default)
> "We are excited to introduce our new framework designed to help busy founders streamline their workflows and unlock their full potential."
```

Das ist das Profil. Speichern Sie es als `voice-profile.md`. Verwenden Sie es wieder.
