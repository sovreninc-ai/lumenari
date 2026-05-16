# Quick Start — Real-Estate-Listings + Marktanalyse

Sie sollten in unter 60 Sekunden startklar sein. Wählen Sie Ihr Tool.

## Claude-Nutzer

Öffnen Sie Claude. Erstellen Sie ein neues Projekt (Pro- oder Team-Plan nötig für Projekte, aber der Prompt funktioniert auch in einem regulären Chat). Im Feld "Custom Instructions" oder "Project Knowledge" des Projekts fügen Sie den gesamten Inhalt von `optimization-pack.md` ein. Laden Sie die Dateien in `templates/` in das Projekt-Knowledge hoch, damit Claude sie als Referenz hat. Starten Sie eine neue Konversation im Projekt. Erste Nachricht: erzählen Sie Claude Ihre Jurisdiktion (State oder Provinz), dann beschreiben Sie das Artefakt, das Sie wollen — "Ich brauche MLS-Public-Remarks für ein 3-Bed-Condo in [Neighborhood]" oder "Lass ein CMA auf dieser Property laufen, Comps kommen in der nächsten Nachricht."

## ChatGPT-Nutzer

Öffnen Sie ChatGPT. Klicken Sie "Explore GPTs" → "Create a GPT" (Plus-Plan erforderlich). Im "Instructions"-Feld fügen Sie den gesamten Inhalt von `custom-gpt-instructions.md` ein. In "Conversation starters" nutzen Sie die fünf, die unten in dieser Datei aufgelistet sind. In "Knowledge" laden Sie die Markdown-Files aus dem `templates/`-Folder hoch. Speichern Sie den GPT (privat für Sie ist okay). Öffnen Sie ihn und starten Sie mit: "Hi, ich bin ein [State/Provinz]-Agent. Hier ist, was ich heute brauche: [Artefakt]."

Falls Sie kein ChatGPT Plus haben, fügen Sie einfach `optimization-pack.md` oben in einen regulären Chat ein. Es wird funktionieren — Sie verlieren nur den persistenten GPT und die File-Uploads.

## Gemini, Codex, Cursor oder ein anderes KI-Tool

Öffnen Sie das Tool. Starten Sie eine neue Konversation. Fügen Sie den gesamten Inhalt von `optimization-pack.md` als Ihre erste Nachricht ein. Fügen Sie hinzu: "Acknowledge, dass du das geladen hast, und frage mich nach Jurisdiktion und Artefakt-Typ." Sobald es das tut, sind Sie startklar.

Für Gemini Gems speziell: erstellen Sie einen neuen Gem, fügen Sie `optimization-pack.md` in das Instructions-Feld ein, speichern Sie und nutzen Sie diesen Gem statt des Default-Chats.

---

## Testen, ob es funktioniert

Sobald Sie den System-Prompt geladen haben, fügen Sie das ein:

```
Testlauf. Ich bin ein lizenzierter Agent in [Ihr State oder Provinz]. Ich brauche MLS-Public-Remarks für ein Single-Family-Home: 4 Beds, 3 Baths, 2.400 Sqft, Baujahr 2018, auf einem 0,18-Acre-Corner-Lot in [Ihre Neighborhood]. Features: Chef's-Kitchen mit Island, Finished-Basement, Fenced-Yard, Two-car-Garage mit EV-Charger. Wahrscheinlicher Käufer: Move-up-Familie aus einem Townhouse, will Outdoor-Space. 900-Zeichen-Limit.
```

Wenn Sie ein Listing zurückbekommen in der Struktur (Lead → Layout → Features → Location → Close), unter 900 Zeichen, mit einem "Dinge, die vor dem Veröffentlichen zu verifizieren sind"-Block am Ende, ist das Kit korrekt geladen. Falls es Ihnen "Welcome home!" oder "This stunning property boasts" irgendwo im Output gegeben hat, hat der System-Prompt nicht geladen — versuchen Sie, es erneut einzufügen.
