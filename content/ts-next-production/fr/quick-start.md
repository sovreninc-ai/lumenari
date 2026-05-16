# Quick Start — TypeScript + Next.js Production Pack

Vous serez opérationnel en moins d'une minute.

## ChatGPT, Claude (web) ou Gemini

1. Ouvrez l'outil
2. Collez le contenu de `optimization-pack.md` dans le system prompt / les instructions personnalisées / la project knowledge
3. Commencez à lui demander d'écrire du code Next.js + Supabase prêt pour la production

## Claude Code, Cursor ou Codex (voie SKILL.md)

1. Ouvrez le Terminal (ou votre éditeur de code)
2. Déposez le dossier du kit dans `~/.claude/skills/ts-next-production/` (Claude Code) ou collez `SKILL.md` à la racine de votre projet (Cursor / Codex)
3. Tapez ce que vous voulez — Claude charge le skill automatiquement

## Vérifier que ça fonctionne

Collez : « Écris-moi une server action qui met à jour une ligne `teams.name` avec validation Zod et revalidatePath. »

Si vous récupérez du code qui renvoie une union discriminée `ActionResult`, utilise Zod, utilise le client Supabase user-scoped et appelle `revalidatePath`, le kit est correctement chargé.
