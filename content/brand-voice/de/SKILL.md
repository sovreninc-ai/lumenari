# Brand Voice Builder

> Übergeben Sie der KI 3–5 Schreibproben, die Ihnen wirklich gefallen, und sie produziert ein wiederverwendbares Voice-Profil, das Sie auf jedes künftige Asset anwenden können. Ersetzt das 5.000-USD-Brand-Voice-Beraterdokument, das niemand zweimal öffnet.

**Optimiert für:** jedes KI-Tool — Claude, ChatGPT, Gemini. Beste Ergebnisse, wenn Sie das extrahierte Voice-Profil speichern und über Sessions hinweg wiederverwenden.

---

## Operating Mode

Du hilfst einer Gründerin, Marketerin oder Freelancerin, ein nutzbares Voice-Profil aus einer kleinen Zahl Schreibproben zu extrahieren und diese Voice dann auf neue Inhalte anzuwenden. Standardannahmen:

- Die Person hat 3 bis 5 Proben, die repräsentieren, wie sie klingen will (eigene Texte, kundenbeliebte Posts, ein:e Wettbewerber:in, die/den sie bewundert)
- Sie ist keine Brand-Strategin und will kein 50-seitiges Dokument
- Der Output muss wiederverwendbar sein — eine einzelne Profil-Datei, die sie zu Beginn jeder künftigen Session einfügen kann
- Sie wird die Voice über E-Mails, Landing-Copy, Ad-Copy, Blog-Intros und Social-Posts laufen lassen — keine Romane

**Ton-Standards:**
- Das Profil ist ein Arbeitswerkzeug, kein Deliverable. Bullets und kurze Tabellen, keine Absätze über Brand-Archetypen.
- Nur konkrete Beobachtungen — „nutzt Satzfragmente zur Betonung" ist nützlich; „wirkt zugänglich" nicht.
- Beispiele schlagen Adjektive. Jede Behauptung über die Voice bekommt eine zitierte Zeile aus den Proben.

**Was dieses Kit verweigert:**
- 50-seitige Brand-Bibles
- Jung'sche Archetyp-Zuweisungen („du bist die/der Weise / Outlaw / Magier:in")
- Farbpaletten, Schriften oder Logo-Guidance — das ist Voice, keine visuelle Identität
- Generische Adjektiv-Stapel („bold, confident, witty, authentic")
- „Mission Statement"- oder „Brand Essence"-Absätze
- Ein Voice-Profil aus null Proben — wenn die Person keine geliefert hat, fragt das Kit danach

---

## Die vier Kern-Artefakte

### 1. Sample-to-Voice-Extractor (`templates/sample-to-voice.md`)

3–5 Proben einfügen. Strukturiertes Voice-Profil zurückbekommen mit: Voice-Attribute-Matrix (vier Achsen), Satzstruktur-Tendenzen, Vokabular-Signaturen, Rhythmus-Markern und wiederkehrenden Framing-Devices. Jeder Befund zitiert eine spezifische Zeile aus den Proben.

### 2. Voice-Application-Prompt (`templates/voice-application.md`)

Gespeichertes Profil + generischen Draft einfügen. Rewrite zurückbekommen, der zur Voice passt. Inklusive Selbst-Check am Ende — die KI markiert jede Zeile, bei der sie nicht sicher ist, ob sie den On-Brand-Test besteht.

### 3. Voice-Drift-Detector (`playbooks/voice-drift-detection.md`)

Für wenn du vermutest, dass KI-Output zurück in Corporate-Default gerutscht ist. Ein kurzes Rubric, das die KI gegen jeden Draft laufen lässt und jeden Abschnitt als On-Voice / Drift / Off-Voice scort und auf die exakte Phrase zeigt, die den Call ausgelöst hat.

### 4. Das Voice-Profil selbst

Das Deliverable aus Schritt 1. Du speicherst diese Datei als `voice-profile.md` (oder fügst sie in ein Project Memory ein) und nutzt sie für immer wieder. Das Format ist darauf ausgelegt, maschinenlesbar in den nächsten Prompt zurückzugehen.

---

## Die Voice-Attribute-Matrix

Jedes Voice-Profil scort vier Achsen von 1 bis 5:

```
Formell      1 ——————— 5   Locker
Ernst        1 ——————— 5   Spielerisch
Direkt       1 ——————— 5   Diplomatisch
Technisch    1 ——————— 5   Zugänglich
```

Ein Score von 3 heißt „landet auf dieser Achse in der Mitte". Ein Score von 1 oder 5 heißt „das ist eine tragende Eigenschaft — niemals verletzen". Die KI wird angewiesen, 1er und 5er am schwersten zu gewichten, wenn Voice auf neue Copy angewendet wird.

Beispiel-Output:
- **Formell/Locker: 4** — nutzt Kontraktionen, droppt Artikel für Punch („Habs für X gebaut"), aber nie slangy
- **Ernst/Spielerisch: 2** — trocken statt albern; die wenigen Witze landen durch Untertreibung, nicht Punchlines
- **Direkt/Diplomatisch: 5** — öffnet mit der Bitte, kein Warm-up
- **Technisch/Zugänglich: 3** — nutzt Domain-Wörter, definiert sie aber im selben Satz

Das ist die Art Detail, die ein Profil nützlich macht. „Authentisch und bold" ist nicht.

---

## Die Prompt-Patterns

Beim Extrahieren einer Voice ist die Input-Struktur:

```
[Proben]
3–5 Proben einfügen, die klingen, wie du klingen willst.
Jede labeln (eigener LinkedIn-Post / kundenbeliebter Blog-Intro / etc.)

[Kontext]
Wer liest den Output dieser Voice? (potenzielle B2B-Käufer:innen / Eltern von Soccer-Kids / etc.)
Wofür meist? (Sales-Pages / Wochen-Newsletter / Cold-E-Mails / alles davon)

[Constraints]
Irgendetwas tabu? (kein Fluchen / keine erste Person / nie Wettbewerber:innen namentlich nennen)
```

Beim Anwenden einer Voice:

```
[Voice-Profil]
Gespeichertes Profil einfügen.

[Draft]
Rohe oder generische Copy einfügen, die du neu geschrieben haben willst.

[Goal]
Wofür ist das, und welche gewünschte Aktion soll die Leser:in machen?
```

Den [Voice-Profil]-Block zu überspringen ist, wie du mit generischem KI-Output endest. Das Profil ist das tragende Stück.

---

## Beispiel: 3 Absätze rein, Voice-Profil + Rewrite raus

**Input — drei Proben:**

> Probe 1 (LinkedIn): „Call gerade beendet. Hard Pass. Sie wollten ein 12-Monats-Engagement und sagen nicht, wie Erfolg aussieht. Spare dir das gleiche Gespräch: frag, was Erfolg heißt, bevor du fragst, was es kostet."

> Probe 2 (Newsletter-Intro): „Drei Wochen Stille. Sorry — war tief im Rewrite. Bin zurück. Hier ist, was sich änderte."

> Probe 3 (Landing-Page-Hero): „Du brauchst kein weiteres Framework. Du musst diese Woche eine Sache shippen. Hier ist die Sache."

**Extrahiertes Profil:**
- Formell/Locker: **4** (Kontraktionen überall, Fragmente für Punch)
- Ernst/Spielerisch: **2** (keine Witze, trockene Asides)
- Direkt/Diplomatisch: **5** (jeder Opener führt mit dem Verdikt)
- Technisch/Zugänglich: **2** (null Jargon, zweite Person, kurze Sätze)
- **Satzstruktur:** durchschnittlich ~9 Wörter. Starke Nutzung von Zwei-Beat-Openern. Häufige Satzfragmente.
- **Vokabular-Signaturen:** „Hard Pass", „shippen", „hier ist die Sache / was sich änderte". Vermeidet: „leverage", „synergy", „stakeholder".
- **Framing-Device:** Verdikt-zuerst. Nennt den wahrscheinlichen nächsten Move der Leser:in, bevor sie ihn macht.
- **Anti-Patterns zum Markieren:** jeder Satz, der mit „In der heutigen schnelllebigen…" beginnt. Jede Nutzung von „transform", „unlock", „elevate".

**Generischer Draft zum Umschreiben:**
> „Wir freuen uns, den Launch unserer neuen Plattform anzukündigen, die entwickelt wurde, um vielbeschäftigten Gründer:innen zu helfen, ihre täglichen Operationen durch modernste KI-Technologie zu optimieren."

**In Voice umgeschrieben:**
> „Neues Ding live. Es ist für Gründer:innen, die ihren Tag mit den gleichen fünf Admin-Tasks verschwenden. Setup dauert ungefähr eine Minute. Hier ist es."

Das ist der Test. Wenn du denselben generischen Draft durch beide Versionen laufen lassen kannst und den Unterschied im Bauch fühlst, funktioniert das Profil.

---

## Was die KI ohne dieses Kit falsch macht

1. **Sie mittelt zu LinkedIn-Voice.** Jeder Output endet als Median-LinkedIn-Post — vage inspirierend, vage autoritativ, null Edge. Das Profil blockiert das, indem es die KI zwingt, jede Zeile gegen das Voice-Rubric zu verteidigen.
2. **Sie defaultet auf Drei-Akt-Struktur.** Generische KI liebt „Zuerst… Dann… Schließlich…" Die meisten distinkten Voices bewegen sich nicht so. Das Profil fängt tatsächliche Satzstruktur-Tendenzen und überschreibt den Default.
3. **Sie nutzt Wörter, die du nie sagen würdest.** Ohne Vokabular-Signatur reicht dir die KI „leverage", „elevate", „transform" und „best-in-class", egal wie oft du sie bittest, das nicht zu tun. Das Kit zwingt die KI, eine explizite Ban-Liste aus den Proben zu pflegen (Wörter, die die Person nie nutzte) und eine Allow-Liste (Wörter, zu denen sie wiederholt greift).

---

## Was dieses Kit NICHT für dich tut

- Copy schreiben, die besser als deine Proben ist. Voice-Extraktion ist eine Decke, kein Multiplikator — wenn deine Proben mittel sind, sind die Rewrites mittel.
- Es ersetzen, etwas zu sagen zu haben. Eine Voice ohne Standpunkt klingt unheimlich. Nutze dieses Kit für Texte, die schon Meinungen haben, nicht für Füller.
- Jeden Drift fangen. Lauf den Drift-Detector auf jedem hochwertigen Asset (Sales-Page, Fundraise-Post, Manifest), bevor du shipst.
- Einen Co-Writer-Wechsel überleben. Wenn eine andere Person die nächsten Drafts schreibt, braucht das Profil neue Proben dieser Person, um akkurat zu bleiben.

---

## Begleitdokumente

- `templates/sample-to-voice.md` — Extractor-Prompt + Profil-Output-Schema
- `templates/voice-application.md` — gespeichertes Profil auf jeden Draft anwenden
- `playbooks/voice-drift-detection.md` — Rubric, um Off-Voice-KI-Output zu fangen
- `memory.md` — Domänen-Kontext für die KI: Vokabular, Workflows, häufige Fehler
- `optimization-pack.md` — eigenständiger System Prompt für jede Chat-KI
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formatiert
- `quick-start.md` — 3-Schritte-Setup
