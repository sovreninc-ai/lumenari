# Quick Start — Pack de Implementación de Stripe Connect

Vas a estar corriendo en menos de un minuto.

## ChatGPT, Claude (web) o Gemini

1. Abre la herramienta
2. Pega el contenido de `optimization-pack.md` en el campo de system prompt / custom instructions / project knowledge
3. Empieza a pedirle que diseñe tus flujos de Stripe Connect — onboarding, charges, refunds, webhooks

## Claude Code, Cursor o Codex (ruta SKILL.md)

1. Abre Terminal (o tu editor de código)
2. Coloca la carpeta del kit en `~/.claude/skills/stripe-connect/` (Claude Code) o pega `SKILL.md` en la raíz de tu proyecto (Cursor / Codex)
3. Escribe lo que quieras — Claude toma el skill automáticamente

## Probar que funciona

Pega: "Escribe el webhook handler para `checkout.session.completed` con idempotencia para mi plataforma de Stripe Connect."

Si te devuelve un handler que verifica la firma, revisa la tabla `processed_events` por el event.id, procesa dentro de un try/catch y solo marca-como-procesado después del éxito — el kit está cargado correctamente.
