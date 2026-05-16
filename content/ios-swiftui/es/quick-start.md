# Quick Start — Pack de Producción iOS / SwiftUI

Vas a estar corriendo en menos de un minuto.

## ChatGPT, Claude (web) o Gemini

1. Abre la herramienta
2. Pega el contenido de `optimization-pack.md` en el campo de system prompt / custom instructions / project knowledge
3. Empieza a pedirle que escriba pantallas SwiftUI, conecte SwiftData, configure CloudKit o audite tu código para App Store

## Claude Code, Cursor o Codex (ruta SKILL.md)

1. Abre Terminal (o tu editor de código)
2. Coloca la carpeta del kit en `~/.claude/skills/ios-swiftui/` (Claude Code) o pega `SKILL.md` en la raíz de tu proyecto (Cursor / Codex)
3. Escribe lo que quieras — Claude toma el skill automáticamente

## Probar que funciona

Pega esto: "Escribe una pantalla SwiftUI que liste workouts desde SwiftData y me deje agregar nuevos. Incluye un empty state."

Si te devuelve un solo archivo con `@Model final class`, `@Query`, `NavigationStack`, `ContentUnavailableView` y un modifier `.onDelete` — y sin `ObservableObject` en ningún lado — el kit está cargado correctamente.
