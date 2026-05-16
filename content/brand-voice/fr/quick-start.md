# Quick Start — Brand Voice Builder

Vous serez opérationnel en moins d'une minute.

## ChatGPT, Claude (web) ou Gemini

1. Ouvrez l'outil
2. Collez le contenu de `optimization-pack.md` dans le system prompt / custom instructions / champ de connaissance du project
3. Collez 3-5 échantillons d'écriture et demandez-lui d'extraire un profil de voix

## Claude Code, Cursor ou Codex (chemin SKILL.md)

1. Ouvrez le Terminal (ou votre éditeur de code)
2. Déposez le dossier du kit dans `~/.claude/skills/brand-voice/` (Claude Code) ou collez `SKILL.md` à la racine de votre projet (Cursor / Codex)
3. Tapez ce que vous voulez — Claude récupère le skill automatiquement

## Vérifier que ça marche

Collez ceci : « Extrais un profil de voix à partir de ces trois échantillons : (1) "Refus net sur la démo. Ils ne voulaient pas définir le succès." (2) "Trois semaines de silence. Désolé. De retour maintenant." (3) "Vous n'avez pas besoin d'un framework. Ship la chose." »

Si vous récupérez un profil avec quatre scores d'attributs de voix (1-5), une signature de vocabulaire, une ban list et un dispositif de framing nommé — avec chaque affirmation citant un échantillon — le kit est chargé correctement.
