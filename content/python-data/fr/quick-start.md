# Quick Start — Python Data Analysis Pack

Vous serez opérationnel en moins d'une minute.

## ChatGPT, Claude (web) ou Gemini

1. Ouvrez l'outil
2. Collez le contenu de `optimization-pack.md` dans le system prompt / les instructions personnalisées / la project knowledge
3. Commencez à lui demander de traduire du SQL vers pandas, de lancer une EDA sur vos données, de fitter une régression ou de construire un chart

## Claude Code, Cursor ou Codex (voie SKILL.md)

1. Ouvrez le Terminal (ou votre éditeur de code)
2. Déposez le dossier du kit dans `~/.claude/skills/python-data/` (Claude Code) ou collez `SKILL.md` à la racine de votre projet (Cursor / Codex)
3. Tapez ce que vous voulez — Claude charge le skill automatiquement

## Vérifier que ça fonctionne

Collez ceci : « J'ai un DataFrame `df` avec les colonnes `user_id`, `event_date`, `revenue`. Donne-moi le revenue total par utilisateur pour les événements en 2026, uniquement les utilisateurs avec 3+ événements, trié décroissant. Utilise DuckDB. »

Si vous récupérez un bloc `duckdb.sql("SELECT user_id, SUM(revenue) ... HAVING COUNT(*) >= 3 ...")` sans excuses, sans `.iterrows()` et sans détour pandas — le kit est correctement chargé.
