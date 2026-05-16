# Progressive Disclosure — zeige die 20% zuerst

Das Prinzip: Zeige beim ersten Kontakt nie, was 80% der Nutzer nicht brauchen werden.

## Formulare

Ein Formular mit 14 Feldern verscheucht Leute. Drei Patterns, um es zu komprimieren:

### A. Nur Required zuerst

Zeige nur die wirklich erforderlichen Felder. Füge einen "More details"-Toggle darunter für die optionalen hinzu.

```
Name *
Email *

▸ More details (3 optional fields)

[ Continue ]
```

### B. Multi-Step mit einer Section pro Screen

Jeder Screen ist 2-4 Felder, einspaltig. Der Nutzer kann genau sehen, was übrig ist ("Step 2 of 4").

Fake-multi-stepe nicht ein 14-Feld-Formular in 7 Screens à 2 Felder — das ist schlimmer. Gruppiere sinnvoll.

### C. Smart Defaults

Wenn 80% der Nutzer denselben Wert wählen würden, fülle ihn vor. Erwähne es im Helper-Text des Felds.

```
Currency: CAD (your IP suggests Canada)
```

## Settings

Settings-Screens sind der schlimmste Übeltäter. Die kanonische Apple-Style-Struktur:

```
Most common (≤5 items)
─────────────────────
Item A
Item B
Item C

Advanced
─────────────────────
▸ Account & privacy (8 items)
▸ Notifications (12 items)
▸ Developer (6 items)
```

Gruppiere nach Nutzer-Mental-Modell, nicht nach deinem internen Datenmodell.

## Dashboards

Ein Dashboard sollte eine Frage über der Falte beantworten: "Wie geht es meinem Ding?"

Alles andere ist Scroll-Territorium. Die Top-Falte:

```
[ Big number — primary metric ]
[ One-sentence summary ]
[ A single sparkline or visual ]
```

Darunter tiefere Daten. Der Nutzer scrollt nur, wenn er will.

## Detail-Seiten

Zeige die Essentials beim ersten Laden. Verstecke die dichten Details hinter Tabs oder Expand-on-Click.

Zum Beispiel auf einer Kit-Detail-Seite:
- Über der Falte: Name, Tagline, Preis, primärer CTA
- Unter der Falte: was drin ist (5 Bullets, nicht 50)
- "Dateien, die Sie erhalten" — Liste standardmäßig kollabiert, außer der Nutzer klickt zum Expandieren

## Wann NICHT Progressive Disclosure zu nutzen

- Kritische Info (Consent, Preise, Refund-Policy) — nie versteckt.
- Errors — immer sofort sichtbar.
- Erforderliche Bestätigungen auf destruktiven Aktionen — nie versteckt.
- Alles, was legal erforderlich auffällig sein muss.

## Wie zu wählen, was zu zeigen

Frage: "Wenn der Nutzer nur 5 Sekunden auf diesem Screen verbringen würde, was ist die eine Sache, die er mitnehmen muss?"

Das geht über die Falte, in der größten Type, mit dem meisten Kontrast. Alles andere ist sekundär.
