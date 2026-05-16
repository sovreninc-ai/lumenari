# Quick Start — Pack de Análisis de Datos en Python

Vas a estar corriendo en menos de un minuto.

## ChatGPT, Claude (web) o Gemini

1. Abre la herramienta
2. Pega el contenido de `optimization-pack.md` en el campo de system prompt / custom instructions / project knowledge
3. Empieza a pedirle que traduzca SQL a pandas, corra EDA sobre tu data, ajuste una regresión o arme un gráfico

## Claude Code, Cursor o Codex (ruta SKILL.md)

1. Abre Terminal (o tu editor de código)
2. Coloca la carpeta del kit en `~/.claude/skills/python-data/` (Claude Code) o pega `SKILL.md` en la raíz de tu proyecto (Cursor / Codex)
3. Escribe lo que quieras — Claude toma el skill automáticamente

## Probar que funciona

Pega esto: "Tengo un DataFrame `df` con columnas `user_id`, `event_date`, `revenue`. Dame el revenue total por usuario para eventos en 2026, solo usuarios con 3+ eventos, ordenado descendente. Usa DuckDB."

Si te devuelve un bloque `duckdb.sql("SELECT user_id, SUM(revenue) ... HAVING COUNT(*) >= 3 ...")` sin disculpas, sin `.iterrows()` y sin desvíos por pandas — el kit está cargado correctamente.
