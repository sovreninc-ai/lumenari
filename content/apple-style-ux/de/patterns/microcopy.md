# Microcopy-Patterns

## Buttons

Buttons beschreiben ein Ergebnis, keine System-Aktion. Sie beginnen mit einem Verb.

| Schlecht | Gut |
|---|---|
| Submit | Send invite |
| OK | Save changes |
| Process | Pay now |
| Confirm | Cancel registration |
| Yes | Delete event |

Die Regel: lies die Button-Copy isoliert. Kannst du sagen, was gleich passieren wird? Wenn nicht, schreib neu.

Für destruktive Aktionen macht das Verb selbst die Warnung: "Delete account" — nicht "Are you sure?" zweimal in Folge.

## Empty States

Ein Empty-State ist der erste Eindruck eines Screens für den Nutzer. Verschwende ihn nicht auf "No items found."

Die Form:

```
[ Icon — modest, not decorative ]

Headline that explains what this screen does
when it has content (1 sentence)

Body sentence that explains how to get there.

[ The CTA that gets them there ]
```

Beispiele:

> **Your library is empty for now.**
> Once you buy a kit, every download you'll ever need lives here.
> [ Browse kits → ]

> **No events this week.**
> When your coach schedules a practice or game, it'll show up here.
> [ See upcoming → ]

## Errors

Eine gute Error-Message beantwortet drei Fragen:
1. Was ist passiert?
2. Wessen Schuld ist es (System oder ich)?
3. Was tue ich jetzt?

```
Couldn't save your draft.
We lost the connection. Try again — your text is still here.
[ Try again ] [ Save offline copy ]
```

Dinge zu vermeiden:
- "Something went wrong" — nutzlos
- Error-Codes alleine — für Support, nicht für den Nutzer (steck sie in die Details, nicht in die Headline)
- Den Nutzer implizit beschuldigen ("invalid input" — invalid nach wessen Standard?)
- Stack Traces

## Onboarding

Jeder Onboarding-Schritt hat einen Job. Kombiniere keine Jobs.

Apples Onboarding-Pattern ist meist:
1. **Welcome- / Value-Prop-Screen** — was diese App tut, ein Satz
2. **Das eine Permission-Ask, das relevant ist** — und nur dieses eine
3. **Der erste nützliche Screen** — kein Tutorial, das echte Produkt

Anti-Pattern: ein 5-Screen-Karussell, das jedes Feature erklärt. Der Nutzer hat sich die Geduld, diese zu lesen, noch nicht verdient.

Wenn ein Feature Erklärung braucht, erkläre es inline, wenn es zum ersten Mal erscheint, mit einem "Got it"- oder "OK"-Dismiss.

## Confirmation-Dialogs

Reserviere für irreversible oder teure Aktionen. Jeder ist Reibungs-Tax.

Form:

```
What's about to happen (1-2 sentences, specific)

[ Cancel ] [ Verb-the-action ]
```

Beispiel:

> **Delete this event?**
> The 14 RSVPs and any uploaded files will be removed too.
>
> [ Cancel ] [ Delete event ]

Beachte: der primäre Button ist das Aktions-Verb, nicht "Yes." Der Cancel ist sekundär, nicht gleich gewichtet.

## Loading-States

Drei Varianten:

1. **< 200ms** — zeig nichts. Das Auge wird es nicht bemerken.
2. **200ms - 2s** — ein subtiler Spinner oder Skeleton anstelle des fehlenden Contents.
3. **> 2s** — explizite Nachricht: "Generating your kit recommendations…" — damit der Nutzer weiß, dass etwas in seinem Namen passiert.

Indeterminate Spinner sind nur dann ehrlich, wenn du wirklich nicht schätzen kannst. Wenn du schätzen kannst, nutze einen Progress-Bar.

## Success-States

Eine erfolgreiche Aktion braucht kein Modal, das sich selbst gratuliert. Ein Toast, ein Checkmark, ein subtiles Slide-in, das "Saved" sagt, reicht.

Reserviere zelebratorische States für echte Meilensteine (erste bezahlte Rechnung, hundertster Kunde, etc.) — und selbst dann, halte sie kurz.
