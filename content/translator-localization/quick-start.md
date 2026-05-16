# Quick Start — Translator / Localization Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro/Team plan unlocks Projects; works in regular chat too). In "Custom instructions" or "Project knowledge," paste `optimization-pack.md`. Upload `templates/style-guide-and-glossary.md` and `memory.md` to project knowledge. Start a new conversation. First message: state the language pair with exact locales ("EN-US > ES-MX," not "Spanish") and the artifact you need.

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). In "Instructions," paste `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload the templates and memory file. Save private. Open it: "I'm working on EN-GB > FR-CA, marketing copy. Need a style-guide draft from samples."

No Plus? Paste `optimization-pack.md` at the top of a regular chat. No persistence, otherwise identical.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. New conversation. Paste `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for language pair (with exact locales), artifact, and domain." For Gemini Gems: create a Gem, paste into instructions, save, use that Gem.

---

## Test it works

Paste this in:

```
Test run. Language pair: EN-US > ES-MX. Domain: SaaS UI strings for a project management tool. Artifact: per-string locale notes. Here are the strings:

1. "You have 3 new tasks"
2. "Submit"
3. "Hey {username}, welcome back!"
4. "Delete 1 project? This cannot be undone."
5. "Settings"

Tell me what to flag per string before I translate.
```

If you get back per-string notes that catch (1) plural handling — needs ICU MessageFormat with `{count, plural, one {...} other {...}}`; (2) "Submit" needs context — button label, verb, or form action?; (3) variable position must survive translation AND register/tú vs usted choice; (4) plural again, plus tú/usted register; (5) potential string-reuse context flag — you're loaded right. If you got Spanish translations of all five strings, the system prompt didn't load. Paste it again. The AI should never produce production translations.
