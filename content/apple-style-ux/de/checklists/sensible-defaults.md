# Sensible-Defaults-Checkliste

Die Regel: frage den Nutzer nur, wenn die Antwort wirklich relevant ist und du sie nicht inferieren kannst.

## Defaults, die still anzuwenden sind

| Entscheidung | Sensible Default |
|---|---|
| Währung | Vom IP des Nutzers detected, mit One-Tap-Switcher |
| Sprache | Browser-`Accept-Language`-Header, Switcher in Settings |
| Timezone | Browser-detected, angezeigt aber nicht unterbrechend |
| Datumsformat | Locale-appropriate (en-CA → YYYY-MM-DD; en-US → MM/DD/YYYY) |
| First-Time-Onboarding | Skippe das Welcome-Karussell; lande direkt auf dem Empty-State |
| E-Mail-Frequenz | Transaktional + monatliches Produkt-Update, mit Unsubscribe-Link |
| Theme | Matche `prefers-color-scheme: dark` |
| Notifications | Aus, bis der Nutzer etwas tut, wo eine nützlich wäre |
| Autosave | An |
| Bestätigung auf destruktiv | An (der Dialog selbst ist die Reibung) |
| Save-Format | Das Format, in dem sie es geöffnet haben (PDF bleibt PDF, .md bleibt .md) |
| Sortierreihenfolge | Most Recent First |
| Pagination | 20 Items pro Seite |

Wenn du dich dabei ertappst, "would you like to…" zur UI hinzuzufügen, frage: kann ich einfach das Ding tun und Undo anbieten?

## Wann den Nutzer zu fragen

Frage, wenn:

1. **Die Aktion destruktiv und nicht einfach reversibel ist.** Account löschen, History purgen.
2. **Die Aktion echtes Geld kostet.** Eine Session buchen, eine Zahlung verarbeiten.
3. **Die Wahl späteres Verhalten signifikant beeinflusst.** Einen Workspace-Namen wählen, ein Startteam wählen.
4. **Du es wirklich nicht inferieren kannst.** Vorname. Job-Titel. Warum sie das Produkt nutzen.

Frage eine Sache pro Screen. Bundle nicht fünf Fragen in ein Formular.

## Wie man gut fragt

```
[ One-sentence question that's also a heading ]

[ Body text — only if the question needs context ]

[ The choice surface — chip group, radio, or text field ]

[ Continue button — disabled until a choice is made ]
```

Beispiele:

> **What sport does your club coach?**
> We'll set up the right age groups, divisions, and scheduling defaults.
>
> [ Soccer ] [ Hockey ] [ Basketball ] [ Baseball ] [ Other ]
>
> [ Continue → ]

vs. die schlechte Version:

> ☐ Select your primary sport
> ☐ Select your secondary sport (optional)
> ☐ Select your governing body
> ☐ Select your typical season length
> ☐ Select your age groups (multi-select)
>
> [ Submit ]

Die schlechte Version ist fünf Fragen vor einer Antwort. Die gute Version fragt eine und inferiert den Rest.

## Die schwierigste Version

Die schwierigste Version davon ist: "Was sollte diese KI tun, wenn die Absicht des Nutzers mehrdeutig ist?"

Default: wähle die plausibelste Interpretation, tu das Ding und sag dem Nutzer, was du getan hast. Biete an, die Interpretationen zu wechseln.

```
I assumed you meant the 2026 spring season (the active one).
If you meant a different season, here's a way to change that.
```

So funktionieren Apples "Did you mean…?"-Oberflächen. Blocke nicht; biete an.
