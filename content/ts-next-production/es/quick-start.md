# Quick Start — Pack de Producción TypeScript + Next.js

Vas a estar corriendo en menos de un minuto.

## ChatGPT, Claude (web) o Gemini

1. Abre la herramienta
2. Pega el contenido de `optimization-pack.md` en el campo de system prompt / custom instructions / project knowledge
3. Empieza a pedirle código Next.js + Supabase listo para producción

## Claude Code, Cursor o Codex (ruta SKILL.md)

1. Abre Terminal (o tu editor de código)
2. Coloca la carpeta del kit en `~/.claude/skills/ts-next-production/` (Claude Code) o pega `SKILL.md` en la raíz de tu proyecto (Cursor / Codex)
3. Escribe lo que quieras — Claude toma el skill automáticamente

## Probar que funciona

Pega: "Escríbeme una server action que actualice una fila de `teams.name` con validación de Zod y revalidatePath."

Si te devuelve código que retorna una unión discriminada `ActionResult`, usa Zod, usa el cliente de Supabase user-scoped y llama a `revalidatePath`, el kit está cargado correctamente.
