# Inicio rápido — Cold outreach de ventas + follow-up

En funcionamiento en menos de 60 segundos. Elige tu herramienta.

## Usuarios de Claude

Abre Claude. Crea un nuevo Project. En "Custom instructions" o "Project knowledge", pega todo el contenido de `optimization-pack.md`. Sube los archivos de `frameworks/`, `templates/` y `playbooks/` para que Claude los tenga como referencia. Inicia una nueva conversación en el proyecto. Primer mensaje: dile a Claude tu ICP en una sola frase, qué artefacto quieres y la señal específica del prospecto. Ejemplo: "ICP: VPs de Engineering en SaaS Serie A, 50-200 empleados. Cold email. Señal: acaban de levantar una ronda B hace 3 semanas liderada por [VC]. Valor: reducimos el gasto en CI/CD bajando las re-corridas de tests inestables."

## Usuarios de ChatGPT

Abre ChatGPT. Haz clic en "Explore GPTs" → "Create a GPT" (requiere Plus). En "Instructions", pega todo el contenido de `custom-gpt-instructions.md`. En "Conversation starters", usa los cinco que están al final de ese archivo. En "Knowledge", sube los archivos markdown de `frameworks/`, `templates/` y `playbooks/`. Guarda el GPT como privado. Ábrelo. Primer mensaje: ICP + artefacto + señal, igual que el ejemplo de Claude arriba.

Si no tienes Plus, pega `optimization-pack.md` al inicio de un chat normal. Mismo resultado, sin persistencia.

## Gemini, Codex, Cursor o cualquier otra herramienta de IA

Abre la herramienta. Inicia una nueva conversación. Pega todo el contenido de `optimization-pack.md` como primer mensaje. Agrega: "Confirma que lo has cargado y pídeme el ICP, el artefacto y la señal." Una vez que lo haga, estás listo.

Para Gemini Gems: crea un nuevo Gem, pega `optimization-pack.md` en las instrucciones, guarda y usa el Gem en lugar del chat por defecto.

---

## Probar que funciona

Una vez que hayas cargado el system prompt, pega esto:

```
Prueba.

ICP: VPs de Engineering en empresas SaaS Serie A, 50-200 empleados, con sede en EE. UU., construyendo frontends de React.
Prospecto: Sarah Chen, VP Engineering en Beacon Labs. Señal: publicó en LinkedIn hace 4 días sobre el pipeline de CI/CD de su equipo siendo un cuello de botella después de que duplicaron el equipo de ingeniería.
Valor: reducimos las re-corridas de tests inestables en un 60%, lo que recorta los minutos de CI y las páginas de on-call que vienen con ellas.
Prueba: Linear y Vercel son clientes.
CTA: 15 min el próximo martes o miércoles.
Restricción: menos de 75 palabras, asunto de menos de 40 caracteres.

Escribe el cold email.
```

Si recibes un email que:
- Hace referencia al post específico de Sarah en LinkedIn sobre el dolor de CI/CD
- Expresa el valor en lenguaje sencillo sin "transformar" ni "revolucionar"
- Tiene una sola petición con horarios propuestos
- Sale en menos de 75 palabras
- Termina con un bloque de "dos cosas que quizás quieras cambiar"

...el kit está bien cargado. Si el email empieza con "Espero que estés bien" o "Quería contactarte", el system prompt no se cargó — intenta pegarlo de nuevo al inicio de la conversación.
