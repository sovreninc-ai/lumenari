# Quick Start — Stripe Connect Implementation Pack

Vous serez opérationnel en moins d'une minute.

## ChatGPT, Claude (web) ou Gemini

1. Ouvrez l'outil
2. Collez le contenu de `optimization-pack.md` dans le system prompt / les instructions personnalisées / la project knowledge
3. Commencez à lui demander de concevoir vos flows Stripe Connect — onboarding, charges, remboursements, webhooks

## Claude Code, Cursor ou Codex (voie SKILL.md)

1. Ouvrez le Terminal (ou votre éditeur de code)
2. Déposez le dossier du kit dans `~/.claude/skills/stripe-connect/` (Claude Code) ou collez `SKILL.md` à la racine de votre projet (Cursor / Codex)
3. Tapez ce que vous voulez — Claude charge le skill automatiquement

## Vérifier que ça fonctionne

Collez : « Écris le webhook handler pour `checkout.session.completed` avec idempotence pour ma plateforme Stripe Connect. »

Si vous récupérez un handler qui vérifie la signature, regarde une table `processed_events` pour l'event.id, traite dans un try/catch, et ne marque comme traité qu'après succès — le kit est correctement chargé.
