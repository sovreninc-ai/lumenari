# Quick Start — Supabase Schema & RLS Pack

Vous serez opérationnel en moins d'une minute.

## ChatGPT, Claude (web) ou Gemini

1. Ouvrez l'outil
2. Collez le contenu de `optimization-pack.md` dans le system prompt / les instructions personnalisées / la project knowledge
3. Commencez à lui demander de concevoir des schémas + des policies RLS pour votre app multi-tenant

## Claude Code, Cursor ou Codex (voie SKILL.md)

1. Ouvrez le Terminal (ou votre éditeur de code)
2. Déposez le dossier du kit dans `~/.claude/skills/supabase-schema-rls/` (Claude Code) ou collez `SKILL.md` à la racine de votre projet (Cursor / Codex)
3. Tapez ce que vous voulez — Claude charge le skill automatiquement

## Vérifier que ça fonctionne

Collez : « Conçois le schéma et les policies RLS pour une table `invoices` dans mon SaaS multi-tenant. Les membres peuvent lire ; les admins peuvent écrire. »

Si vous récupérez une migration avec `organization_id`, l'index, RLS activée, des policies de lecture/écriture séparées utilisant `is_member_of` / `has_role`, le kit est correctement chargé.
