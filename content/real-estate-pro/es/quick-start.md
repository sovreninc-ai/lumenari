# Quick Start — Listings Inmobiliarios + Análisis de Mercado

Deberías estar corriendo en menos de 60 segundos. Elige tu herramienta.

## Usuarios de Claude

Abre Claude. Crea un nuevo Project (hace falta el plan Pro o Team para projects, pero el prompt funciona en un chat común también). En el campo "Custom instructions" o "Project knowledge" del project, pega el contenido completo de `optimization-pack.md`. Sube los archivos de `templates/` al project knowledge para que Claude los tenga como referencia. Empieza una conversación nueva en el project. Primer mensaje: cuéntale a Claude tu jurisdicción (estado o provincia), después describe el artefacto que quieres — "Necesito public remarks de MLS para un condo de 3 recámaras en [barrio]" o "Corre un CMA sobre esta propiedad, los comps van en el próximo mensaje".

## Usuarios de ChatGPT

Abre ChatGPT. Click en "Explore GPTs" → "Create a GPT" (hace falta plan Plus). En el campo "Instructions", pega el contenido completo de `custom-gpt-instructions.md`. En "Conversation starters", usa los cinco listados al final de ese archivo. En "Knowledge", sube los archivos markdown de la carpeta `templates/`. Guarda el GPT (private para ti está bien). Ábrelo y empieza con: "Hola, soy agente en [estado/provincia]. Esto es lo que necesito hoy: [artefacto]".

Si no tienes ChatGPT Plus, simplemente pega `optimization-pack.md` arriba de un chat común. Va a funcionar — solo pierdes el GPT persistente y la subida de archivos.

## Gemini, Codex, Cursor o cualquier otra herramienta de IA

Abre la herramienta. Empieza una conversación nueva. Pega el contenido completo de `optimization-pack.md` como tu primer mensaje. Agrega: "Confirma que cargaste esto y pregúntame la jurisdicción y el tipo de artefacto". Una vez que lo haga, estás listo.

Para Gemini Gems específicamente: crea un nuevo Gem, pega `optimization-pack.md` en el campo de instructions, guarda, y usa ese Gem en lugar del chat default.

---

## Probar que funciona

Una vez que cargaste el system prompt, pega esto:

```
Test run. Soy agente licenciado en [tu estado o provincia]. Necesito public remarks de MLS para una single-family: 4 recámaras, 3 baños, 2,400 sqft, construida 2018, sobre un lote de 0.18 acres en esquina en [tu barrio]. Features: cocina de chef con isla, sótano terminado, patio cercado, garage de dos autos con cargador EV. Comprador probable: familia en move-up viniendo de un townhouse, quiere espacio exterior. Límite 900 caracteres.
```

Si te devuelve un listing en la estructura (lead → layout → features → location → close), bajo 900 caracteres, con un bloque "Cosas a verificar antes de publicar" al final, el kit está cargado correctamente. Si te dio "¡Bienvenido a casa!" o "Esta impresionante propiedad ostenta" en cualquier parte de la salida, el system prompt no cargó — intenta pegarlo de nuevo.
