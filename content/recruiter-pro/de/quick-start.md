# Quick Start — Setup in 60 Sekunden

Drei Absätze, einer pro Plattform. Wähle deinen, füge ein, teste.

---

## Claude (claude.ai oder Claude in der API)

Lege ein neues Projekt an. Nenne es „Recruiter Co-Pilot". Füge in das **Instructions**-Feld des Projekts den vollen Inhalt von `optimization-pack.md` ein. Speichern. Jeder Chat in diesem Projekt läuft jetzt im Recruiter-Modus — JD-Writer, Outreach-Drafter, Interview-Kit-Builder, Boolean-String-Generator. Für einmalige Nutzung füge das Optimization-Pack als erste Nachricht in einen neuen Chat ein. Bonus: Lege deine bestehenden, high-performenden JDs und die meistbeantworteten Outreach in die Knowledge Base des Projekts — die KI referenziert die tatsächliche Stimme und Marke deines Teams beim Draften neuer.

**Teste es:** Starte einen neuen Chat im Projekt und füge den Test-Prompt unten ein.

---

## ChatGPT (Custom GPT oder einmaliger Chat)

Für einen Custom GPT (Plus oder Team): Gehe zu „My GPTs" → „Create a GPT" → „Configure". Füge in das **Instructions**-Feld `custom-gpt-instructions.md` ein. Nenne ihn „Recruiter Co-Pilot". Beschreibung: „JDs ohne Jargon, Outreach mit Antworten, Interview-Kits, Boolean-Strings." Speichern. Für einmalige Nutzung füge `optimization-pack.md` als erste Nachricht in einen Standard-Thread ein.

**Teste es:** Öffne deinen neuen GPT und füge den Test-Prompt unten ein.

---

## Gemini, Cursor, Codex (oder eine andere KI)

Für **Gemini Advanced**: Lege einen neuen Gem an. Füge das Optimization-Pack in das Instructions-Feld ein, speichere und nutze diesen Gem für Recruiting-Arbeit. Für **Cursor**: Weniger anwendbar (Cursor ist für Code), aber falls du JDs als MDX in einem Careers-Page-Repo schreibst, füge das Optimization-Pack in `.cursorrules` ein. Für **Codex / GitHub Copilot Chat / jede andere KI**: Füge das Optimization-Pack als erste Nachricht in eine frische Konversation ein und re-paste zu Beginn jedes neuen Threads.

**Teste es:** Nutze den Test-Prompt unten, um das Setup zu bestätigen.

---

## Einfügbarer Test-Prompt

```
Ich stelle eine Senior Full-Stack Engineerin bei einer 30-Personen-Series-B-SaaS ein. Remote-first, USA + Kanada. Stack: TypeScript, React, Node, Postgres auf AWS. Gehaltsrange: USD $170–210K base + 0,05–0,15 % Equity. Der Hiring Manager hat eine JD geschrieben und ich denke, sie ist schlecht. Hier ist, was er geschickt hat:

„We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

Ich brauche:
1. Einen Bias-Lint von dem, was er geschickt hat (spezifisch markierte Phrasen und warum)
2. Eine komplette neu geschriebene JD im Kit-Format
3. Ein Outreach-Template für Cold-DMs an Senior Engineers (max 3 Zeilen im Opener)
4. Einen LinkedIn-Recruiter-Boolean-String für Senior Engineers mit TypeScript + React + Node, die bei Startups geshipt haben
```

Du solltest zurückbekommen: einen Lint-Pass, der „passionate", „rock star", „fast-paced", „10x developer", „wear many hats", „Bachelor's degree required", „10+ years", „work hard play hard" und „like a family" markiert — mit spezifischen Fixes für jedes. Dann eine saubere ~500-Wort-JD mit Gehaltsrange, echten „Was du tust"-Outcomes, einem tatsächlichen Interview-Prozess und einer Working-Arrangement-Sektion. Dann eine Drei-Zeilen-Outreach, die einen echt wirkenden Grund für die Nachricht nennt. Dann einen Boolean-String mit erklärten Klauseln, plus 2 Varianten, falls die erste zu wenige oder zu viele Ergebnisse liefert.

Wenn du eine JD zurückbekommst, in der noch „rock star" steht, oder Outreach ohne Comp-Range, ist das Optimization-Pack nicht geladen. Erneut einfügen.
