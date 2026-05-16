# Quick Start — React Native / Mobile Dev Pack

Sie sollten in unter 60 Sekunden startklar sein. Wählen Sie Ihr Tool.

## Claude-Nutzer

Öffnen Sie Claude. Erstellen Sie ein neues Projekt (Pro- oder Team-Plan nötig für Projekte, aber der Prompt funktioniert auch in einem regulären Chat). Im Feld "Custom Instructions" des Projekts fügen Sie den gesamten Inhalt von `optimization-pack.md` ein. Laden Sie `memory.md` und `patterns/component-and-native-modules.md` in das Projekt-Knowledge hoch, damit Claude sie als Referenz hat. Starten Sie eine neue Konversation. Erste Nachricht: erzählen Sie Claude Ihr Setup — "Ich bin auf Expo Bare Workflow, RN 0.74, New Architecture an, target iOS + Android" — dann beschreiben Sie, was Sie bauen.

## ChatGPT-Nutzer

Öffnen Sie ChatGPT. Klicken Sie "Explore GPTs" → "Create a GPT" (Plus-Plan erforderlich). Im "Instructions"-Feld fügen Sie den gesamten Inhalt von `custom-gpt-instructions.md` ein. In "Conversation starters" nutzen Sie die fünf, die unten in dieser Datei aufgelistet sind. In "Knowledge" laden Sie `memory.md` und `patterns/component-and-native-modules.md` hoch. Speichern Sie den GPT (privat für Sie ist okay). Öffnen Sie ihn und starten Sie mit: "Expo bare, RN 0.74, iOS + Android. Ich will einen neuen Screen scaffolden."

Falls Sie kein ChatGPT Plus haben, fügen Sie `optimization-pack.md` oben in einen regulären Chat ein. Es wird funktionieren — Sie verlieren nur den persistenten GPT und die File-Uploads.

## Gemini, Cursor, Codex oder ein anderes KI-Tool

Öffnen Sie das Tool. Starten Sie eine neue Konversation. Fügen Sie den gesamten Inhalt von `optimization-pack.md` als Ihre erste Nachricht ein. Fügen Sie hinzu: "Acknowledge, dass du das geladen hast, und frage mich nach meinem Expo-Workflow, RN-Version und Target-Plattformen." Sobald es das tut, sind Sie startklar.

Für Cursor speziell: legen Sie `SKILL.md` in den Root Ihres Projekts. Cursors `.cursorrules` oder Project-Rules greifen es automatisch auf.

---

## Testen, ob es funktioniert

Sobald Sie den System-Prompt geladen haben, fügen Sie das ein:

```
Testlauf. Expo Bare Workflow, RN 0.74, New Architecture an, target iOS 15+ und Android 8+. Ich brauche einen Screen, der eine Liste von 500 Chat-Nachrichten mit Avataren zeigt, gezogen von einer API. Smoothes Scrollen auf einem 3GB-Android. Gib mir die Screen-Datei, die Row-Component und den Data-Hook.
```

Wenn Sie eine `FlatList` (oder `FlashList`) zurückbekommen mit einem stabilen `keyExtractor`, einer `React.memo`'d Row, einer extrahierten `renderItem`-Ref, explizit gesetzten Image-Dimensions, einem Netzwerk-Hook mit Abort-on-Unmount und einer iOS/Android-Divergenz-Note am Ende — ist das Kit korrekt geladen.

Wenn Sie eine `ScrollView` mit `.map()` zurückbekommen, oder inline `renderItem={(item) => <Row />}`, oder keine Erwähnung von Android-Performance, hat der System-Prompt nicht geladen — fügen Sie ihn erneut ein.
