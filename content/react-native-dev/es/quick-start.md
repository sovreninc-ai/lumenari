# Quick Start — Pack de Dev React Native / Móvil

Deberías estar corriendo en menos de 60 segundos. Elige tu herramienta.

## Usuarios de Claude

Abre Claude. Crea un nuevo Project (hace falta el plan Pro o Team para projects, pero el prompt funciona también en un chat común). En el campo "Custom instructions" del project, pega el contenido completo de `optimization-pack.md`. Sube `memory.md` y `patterns/component-and-native-modules.md` al project knowledge para que Claude los tenga como referencia. Empieza una conversación nueva. Primer mensaje: cuéntale a Claude tu setup — "Estoy en Expo bare workflow, RN 0.74, New Architecture on, targeteando iOS + Android" — después describe lo que estás construyendo.

## Usuarios de ChatGPT

Abre ChatGPT. Click en "Explore GPTs" → "Create a GPT" (hace falta plan Plus). En el campo "Instructions", pega el contenido completo de `custom-gpt-instructions.md`. En "Conversation starters", usa los cinco listados al final de ese archivo. En "Knowledge", sube `memory.md` y `patterns/component-and-native-modules.md`. Guarda el GPT (private para ti está bien). Ábrelo y empieza con: "Expo bare, RN 0.74, iOS + Android. Quiero scaffoldear una pantalla nueva."

Si no tienes ChatGPT Plus, pega `optimization-pack.md` arriba de un chat común. Va a funcionar — solo pierdes el GPT persistente y la subida de archivos.

## Gemini, Cursor, Codex o cualquier otra herramienta de IA

Abre la herramienta. Empieza una conversación nueva. Pega el contenido completo de `optimization-pack.md` como tu primer mensaje. Agrega: "Confirma que cargaste esto y pregúntame por mi workflow de Expo, versión de RN y plataformas target." Una vez que lo haga, estás listo.

Para Cursor específicamente: deja `SKILL.md` en la raíz de tu proyecto. El `.cursorrules` o las project rules de Cursor lo van a tomar automáticamente.

---

## Probar que funciona

Una vez que cargaste el system prompt, pega esto:

```
Test run. Expo bare workflow, RN 0.74, New Architecture on, targeting iOS 15+ y Android 8+. Necesito una pantalla que muestre una lista de 500 mensajes de chat con avatars, traída de una API. Scroll fluido en un Android de 3GB. Dame el archivo de pantalla, el componente de fila y el hook de datos.
```

Si te devuelve un `FlatList` (o `FlashList`) con un `keyExtractor` estable, una fila `React.memo`-eada, una ref de `renderItem` extraída, dimensiones de imagen seteadas explícitamente, un hook de red con abort al desmontar, y una nota de divergencia iOS/Android al final — el kit está cargado correctamente.

Si te devuelve un `ScrollView` con `.map()`, o un `renderItem={(item) => <Row />}` inline, o sin mención del performance en Android, el system prompt no cargó — pégalo de nuevo.
