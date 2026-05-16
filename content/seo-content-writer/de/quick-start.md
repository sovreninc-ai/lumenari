# Quick Start — Setup in 60 Sekunden

Drei Absätze, einer pro Plattform. Wähle deinen, füge ein, teste.

---

## Claude (claude.ai oder Claude in der API)

Lege in Claude ein neues Projekt an. Nenne es „SEO Content Strategist". Füge in das **Instructions**-Feld des Projekts den vollständigen Inhalt von `optimization-pack.md` ein. Speichern. Jeder Chat in diesem Projekt läuft jetzt als Senior SEO-Stratege — Outliner, Artikel-Writer, Meta- + Schema-Generator, Refresh-Berater. Für einmalige Nutzung füge das Optimization-Pack als erste Nachricht in einen neuen Chat ein. Bonus: Lege deine bestperformenden bestehenden Artikel in die Knowledge Base des Projekts; die KI referenziert deine tatsächliche URL-Struktur und Tonalität bei internen Linkvorschlägen.

**Teste es:** Starte einen neuen Chat im Projekt und füge den Test-Prompt unten ein.

---

## ChatGPT (Custom GPT oder einmaliger Chat)

Für einen Custom GPT (Plus oder Team): Gehe zu „My GPTs" → „Create a GPT" → „Configure". Füge in das **Instructions**-Feld `custom-gpt-instructions.md` ein. Nenne ihn „SEO Content Strategist". Beschreibung: „Outlines, Longform, Meta, Schema und Refresh-Playbook — Strategen-Niveau, kein Freelancer-Niveau." Aktiviere Web Browsing, wenn er Live-SERPs lesen soll (sonst fügst du die Top 10 manuell ein). Speichern und chatten. Für einmalige Nutzung füge `optimization-pack.md` als erste Nachricht in einen Standard-Thread ein.

**Teste es:** Öffne deinen neuen GPT und füge den Test-Prompt unten ein.

---

## Gemini, Cursor, Codex (oder eine andere KI)

Für **Gemini Advanced**: Lege einen neuen Gem an. Füge das Optimization-Pack in das Instructions-Feld des Gem ein, speichere und nutze diesen Gem für SEO-Arbeit. Geminis Live-Web-Zugriff ist hier nützlich — lass es aktuelle SERPs ziehen, wenn du fragst. Für **Cursor**: Füge das Optimization-Pack in `.cursorrules` ein, wenn du SEO-Hilfe in deinem Code-Editor für Static-Site-Content (MDX, Hugo, etc.) willst. Für **Codex / GitHub Copilot Chat / jede andere KI**: Füge das Optimization-Pack als erste Nachricht in eine frische Konversation ein und füge es zu Beginn jedes neuen Threads erneut ein.

**Teste es:** Nutze den Prompt unten, um das Setup zu bestätigen.

---

## Einfügbarer Test-Prompt

```
Ich betreibe einen SaaS-Vergleichsblog. Mid-Six-Figure monatlicher Traffic, DA ~52.

Primär-Keyword: „best CRM for solopreneurs"
Geschätztes Volumen: ~1.900/Monat
SERP Top 3 sind:
1. Zapier-Blog (kommerzielles Listicle, 4.200 Wörter, 12 Tools reviewt)
2. HubSpot-Blog (informational + soft-promotional, 2.800 Wörter)
3. Substack-Writer-Personal-Review (1.400 Wörter, 5 Tools über 90 Tage getestet, sehr starke POV)

Ich will speziell #3 outranken — der Personal-Review-Winkel ist die Lücke.

Gib mir:
1. Intent-Klassifikation + SERP-Read
2. Volle Outline mit H1, H2, interne Linkvorschläge
3. Meta-Title + Meta-Description
4. Schema-Empfehlung
5. Ein Absatz zum E-E-A-T-Winkel: Wer sollte Byline sein, welche Erfahrungs-Injektion brauche ich?

Nutze Platzhalter, falls nötig.
```

Du solltest zurückbekommen: Intent als kommerziell klassifiziert (mit Hinweis, dass der Personal-Review-Winkel von #3 der Differenzierer ist), eine straffe Outline (wahrscheinlich 7–9 H2, mit Featured-Snippet-bereiten Section-Openern), 3–5 benannte interne Linkvorschläge, Meta in Spec, Article + FAQPage Schema empfohlen und eine freimütige Notiz, dass das nur funktioniert, wenn DU tatsächlich CRMs 90 Tage getestet hast — sonst schlägt das Kit vor, eine Person zu engagieren, die das getan hat, oder mit jemandem zu kooperieren, der Belege hat.

Wenn du eine generische Listicle-Outline ohne Intent-Klassifikation und ohne SERP-Read zurückbekommst, ist das Optimization-Pack nicht geladen. Erneut einfügen.
