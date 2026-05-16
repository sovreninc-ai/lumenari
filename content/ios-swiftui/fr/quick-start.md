# Quick Start — iOS / SwiftUI Production Pack

Vous serez opérationnel en moins d'une minute.

## ChatGPT, Claude (web) ou Gemini

1. Ouvrez l'outil
2. Collez le contenu de `optimization-pack.md` dans le system prompt / les instructions personnalisées / la project knowledge
3. Commencez à lui demander d'écrire des écrans SwiftUI, câbler SwiftData, configurer CloudKit, ou auditer votre code pour la soumission App Store

## Claude Code, Cursor ou Codex (voie SKILL.md)

1. Ouvrez le Terminal (ou votre éditeur de code)
2. Déposez le dossier du kit dans `~/.claude/skills/ios-swiftui/` (Claude Code) ou collez `SKILL.md` à la racine de votre projet (Cursor / Codex)
3. Tapez ce que vous voulez — Claude charge le skill automatiquement

## Vérifier que ça fonctionne

Collez ceci : « Écris un écran SwiftUI qui liste les workouts depuis SwiftData et me laisse en ajouter de nouveaux. Inclus un état vide. »

Si vous récupérez un seul fichier avec `@Model final class`, `@Query`, `NavigationStack`, `ContentUnavailableView` et un modifier `.onDelete` — et aucun `ObservableObject` nulle part — le kit est correctement chargé.
