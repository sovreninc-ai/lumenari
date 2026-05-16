# Die sieben Regeln — Langform

## 1. Eine primäre Aktion pro Screen.

Das Gehirn braucht ein paar hundert ms, um herauszufinden, worauf auf einem neuen Screen zu schauen ist. Wenn es drei gleich gestylte Buttons gibt, sind das dreihundert ms verschwendet. Wenn es einen offensichtlich primären Button und einen offensichtlich sekundären gibt, hat der Nutzer in null ms entschieden.

**Visuelle Regel:** Nur ein gefüllter Button pro Screen. Alles andere ist Text-Link, Outline oder Icon.

**Anti-Beispiel:** der Boden eines "Are you sure?"-Dialogs mit drei gefüllten roten Buttons. Wähle einen.

## 2. Plain English gewinnt.

Apples Copy liest sich wie ein Freund, der dir erzählt, was gleich passieren wird.

| Corporate Copy | Apple-Style Copy |
|---|---|
| Initialize backup process | Back up now |
| Configure notification preferences | Choose what to notify me about |
| Authentication required | Sign in to continue |
| An error has occurred (Error 0x9F) | Couldn't save. Check your connection and try again. |

Wenn du es einem Freund in deiner Küche nicht sagen würdest, gehört es nicht auf den Screen.

## 3. Default zu "Mach es einfach."

Wenn 90% der Nutzer dasselbe Ergebnis wollen, ist Fragen Reibung. Beispiele:

- **Schlecht:** "Wollen Sie Autosave aktivieren?" (ja, offensichtlich)
- **Gut:** Speichere automatisch. Zeige "Alle Änderungen gespeichert" im Chrome.

- **Schlecht:** "Möchten Sie E-Mail-Bestätigungen erhalten?" (ja, offensichtlich)
- **Gut:** Sende die Bestätigung. Inkludiere einen Unsubscribe-Link.

- **Schlecht:** "Allow notifications?" beim ersten Launch
- **Gut:** Warte, bis der Nutzer dabei ist, etwas zu tun, wo eine Notification wirklich nützlich ist, dann frage im Kontext.

Die Ausnahme sind irreversible oder teure Aktionen — die verdienen eine Bestätigung.

## 4. Whitespace ist ein Feature.

Die meisten Designs sind 20-30% zu eng. Versuche, jedes Padding um 1,25x und jeden Gap um 1,5x zu erhöhen. Es fühlt sich fast immer besser an.

**Faustregel:** Wenn zwei benachbarte visuelle Elemente sich anfühlen, als würden sie zueinander gehören, obwohl sie es nicht sollten, erhöhe den Gap. Wenn sie sich getrennt anfühlen, obwohl sie es nicht sollten, verringere ihn. Justiere, bis die Beziehung eindeutig ist.

## 5. Hierarchie durch Größe + Gewicht, nicht Farbe + Boxen.

Eine Seite kann haben:
- Ein H1 (32-48px, semibold)
- Eine Handvoll H2s (22-28px, semibold)
- Body-Text (16-17px, regular)
- Ein paar Captions (13-14px, regular, gedämpft)

Das ist genug Hierarchie für fast jeden Screen. Farbige Badges, Drop Shadows und Boxen-um-Dinge hinzuzufügen ist meist ein Zeichen, dass die Type-Skala ihren Job nicht macht.

## 6. Progressive Disclosure.

Beim ersten Mal, wenn ein Nutzer ein Feature sieht, zeige die 20%, die er 80% der Zeit nutzt. Stecke den Rest hinter:

- Einen "More options"-Toggle
- Einen zweiten Screen
- Ein rechtsseitiges Detail-Pane
- Long-Press / Right-Click

**Anti-Beispiel:** Ein Settings-Screen mit 40 Toggles in einer flachen Liste. Die ersten 6 sollten offensichtlich sein; die nächsten 34 sollten in einer "Advanced"-Section sein, die bei Tap öffnet.

## 7. Animation hat einen Grund oder sie existiert nicht.

Apples Animationen haben einen von drei Jobs:
1. **Räumliche Kontinuität aufrechterhalten** — wenn etwas erscheint, animiere von dort, wo es herkam (ein Modal slidet vom Boden des Screens hoch, eine Detail-View slidet von rechts hinein).
2. **State Change kommunizieren** — ein Checkmark, das eingezeichnet wird, nachdem ein Save gelingt.
3. **Warten maskieren** — ein 200ms-Fade-in auf einer frisch geladenen Card ist besser als ein harter Pop.

Das ist es. Bounce on Hover, Parallax um Parallax willen, Glow on Click — diese lesen sich alle als "wir wollten modern aussehen" statt "wir wollten nützlich sein."

**Timing-Regeln:**
- 150-250ms: die meisten Mikro-Interaktionen
- 300-400ms: Seitenübergänge
- > 500ms: selten und intentional

**Easing:** cubic-bezier(0.16, 1, 0.3, 1) für "Dinge, die sich snappy und natürlich anfühlen sollen" — Apple nutzt etwas Ähnliches.

---

## Wie man diese anwendet

Nimm einen Screen, den du ausgeliefert hast. Lies die Regeln der Reihe nach. Frage für jede Regel: "Wo verletzt dieser Screen das?" Versuche nicht, alles auf einmal zu fixen — fixe das, was am meisten verletzt wird.

Derselbe Trick funktioniert für den Design-Output deiner KI. Füge diese Datei in den System-Prompt ein und frage: "Reviewe diesen Screen gegen die sieben Regeln. Sag mir, welche am meisten verletzt wird."
