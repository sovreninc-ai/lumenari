# Quick Start — Pack Coach / Trainer / Therapist

Vous serez opérationnel en moins d'une minute.

## ChatGPT, Claude (web) ou Gemini

1. Ouvrez l'outil
2. Collez le contenu de `optimization-pack.md` dans le system prompt / custom instructions / champ de connaissance du project
3. Dites-lui votre type de praticien et demandez-lui de rédiger ce dont vous avez besoin (note de séance, email client, copy marketing)

## Claude Code, Cursor ou Codex (chemin SKILL.md)

1. Ouvrez le Terminal (ou votre éditeur de code)
2. Déposez le dossier du kit dans `~/.claude/skills/coach-pro/` (Claude Code) ou collez `SKILL.md` à la racine de votre projet (Cursor / Codex)
3. Tapez ce que vous voulez — Claude récupère le skill automatiquement

## Vérifier que ça marche

Collez ceci : « Je suis coach de vie. Écris une note de séance style SOAP à partir de ce matériel brut : séance vidéo de 45 min avec la cliente J.K., séance 4. Elle a parlé de difficultés de limites avec sa sœur et s'est engagée à une conversation directe cette semaine. »

Si vous récupérez une note labellisée **observations** (pas Évaluation), sous 400 mots, avec un disclaimer en bas, et sans langage de diagnostic clinique — le kit est chargé correctement.

Si vous récupérez une note SOAP avec une section « Évaluation » qui nomme une condition clinique, le kit n'est pas chargé — recollez `optimization-pack.md`.
