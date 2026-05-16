# Quick Start — Sales Cold-Outreach + Follow-up

In unter 60 Sekunden startklar. Wählen Sie Ihr Tool.

## Claude-Nutzer

Öffnen Sie Claude. Erstellen Sie ein neues Projekt. In "Custom Instructions" oder "Project Knowledge" fügen Sie den gesamten Inhalt von `optimization-pack.md` ein. Laden Sie die Dateien aus `frameworks/`, `templates/` und `playbooks/` hoch, damit Claude sie als Referenz hat. Starten Sie eine neue Konversation im Projekt. Erste Nachricht: erzählen Sie Claude Ihr ICP in einem Satz, welches Artefakt Sie wollen und das Prospect-spezifische Signal. Beispiel: "ICP: VPs of Engineering at Series A SaaS, 50-200 employees. Cold email. Signal: sie haben gerade eine B-Round vor 3 Wochen geraised, led by [VC]. Value: wir cutten CI/CD-Spend, indem wir Flaky-Test-Reruns reduzieren."

## ChatGPT-Nutzer

Öffnen Sie ChatGPT. Klicken Sie "Explore GPTs" → "Create a GPT" (Plus erforderlich). In "Instructions" fügen Sie den gesamten Inhalt von `custom-gpt-instructions.md` ein. In "Conversation starters" nutzen Sie die fünf am Ende dieser Datei. In "Knowledge" laden Sie die Markdown-Files aus `frameworks/`, `templates/` und `playbooks/` hoch. Speichern Sie den GPT privat. Öffnen Sie ihn. Erste Nachricht: ICP + Artefakt + Signal, dasselbe wie das Claude-Beispiel oben.

Falls Sie kein Plus haben, fügen Sie `optimization-pack.md` oben in einen regulären Chat ein. Selbes Outcome, keine Persistenz.

## Gemini, Codex, Cursor oder ein anderes KI-Tool

Öffnen Sie das Tool. Starten Sie eine neue Konversation. Fügen Sie den gesamten Inhalt von `optimization-pack.md` als Ihre erste Nachricht ein. Fügen Sie hinzu: "Acknowledge, dass du das geladen hast, und frage mich nach ICP, Artefakt und Signal." Sobald es das tut, sind Sie startklar.

Für Gemini Gems: erstellen Sie einen neuen Gem, fügen Sie `optimization-pack.md` in die Instructions ein, speichern Sie, nutzen Sie den Gem statt des Default-Chats.

---

## Testen, ob es funktioniert

Sobald Sie den System-Prompt geladen haben, fügen Sie das ein:

```
Testlauf.

ICP: VPs of Engineering at Series A SaaS companies, 50-200 Employees, US-basiert, bauen React-Frontends.
Prospect: Sarah Chen, VP Engineering bei Beacon Labs. Signal: sie hat vor 4 Tagen auf LinkedIn gepostet, dass die CI/CD-Pipeline ihres Teams ein Bottleneck ist, nachdem sie das Engineering-Team verdoppelt haben.
Value: wir reduzieren Flaky-Test-Reruns um 60%, was CI-Minutes und die On-Call-Pages cuttet, die damit kommen.
Proof: Linear und Vercel sind Customer.
CTA: 15 min nächsten Dienstag oder Mittwoch.
Constraint: unter 75 Wörter, Subject-Line unter 40 Zeichen.

Schreibe die Cold-E-Mail.
```

Wenn Sie eine E-Mail zurückbekommen, die:
- Sarahs spezifischen LinkedIn-Post über CI/CD-Pain referenziert
- Den Value in Plain-Language ohne "transform" oder "revolutionize" states
- Einen einzelnen Ask mit vorgeschlagenen Zeiten hat
- Unter 75 Wörter kommt
- Mit einem "Zwei Dinge, die Sie ändern wollen"-Block endet

...ist das Kit korrekt geladen. Falls die E-Mail mit "Hope this finds you well" oder "I wanted to reach out" beginnt, hat der System-Prompt nicht geladen — versuchen Sie, ihn erneut oben in der Konversation einzufügen.
