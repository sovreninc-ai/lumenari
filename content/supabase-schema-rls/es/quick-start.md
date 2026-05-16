# Quick Start — Pack de Schema y RLS de Supabase

Vas a estar corriendo en menos de un minuto.

## ChatGPT, Claude (web) o Gemini

1. Abre la herramienta
2. Pega el contenido de `optimization-pack.md` en el campo de system prompt / custom instructions / project knowledge
3. Empieza a pedirle que diseñe schemas + políticas de RLS para tu app multi-tenant

## Claude Code, Cursor o Codex (ruta SKILL.md)

1. Abre Terminal (o tu editor de código)
2. Coloca la carpeta del kit en `~/.claude/skills/supabase-schema-rls/` (Claude Code) o pega `SKILL.md` en la raíz de tu proyecto (Cursor / Codex)
3. Escribe lo que quieras — Claude toma el skill automáticamente

## Probar que funciona

Pega: "Diseña el schema y las políticas de RLS para una tabla `invoices` en mi SaaS multi-tenant. Los members leen; los admins escriben."

Si te devuelve una migración con `organization_id`, el índice, RLS habilitado y políticas separadas de lectura/escritura usando `is_member_of` / `has_role`, el kit está cargado correctamente.
