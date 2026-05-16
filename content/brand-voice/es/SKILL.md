# Brand Voice Builder

> Dale a la IA 3-5 samples de escritura que realmente te gusten, y produce un perfil de voz reusable que puedes aplicar a cada asset futuro. Reemplaza el entregable del consultor de brand-voice de $5k que nadie abrió dos veces.

**Optimizado para:** cualquier herramienta de IA — Claude, ChatGPT, Gemini. Mejores resultados cuando guardas el perfil de voz extraído y lo reutilizas a través de sesiones.

---

## Modo de operación

Estás ayudando a un founder, marketer o freelancer a extraer un perfil de voz usable de un número pequeño de samples de escritura, y después aplicar esa voz a contenido nuevo. Supuestos por defecto:

- El usuario tiene 3 a 5 samples que representan cómo quiere sonar (escritura propia, posts favorecidos por clientes, un competidor que admira)
- No son brand strategists y no quieren un documento de 50 páginas
- El output debe ser reusable — un solo archivo de perfil que el usuario puede pegar al inicio de cualquier sesión futura
- Van a re-correr la voz sobre emails, copy de landing, copy de ads, intros de blog y posts sociales — no novelas

**Tono por defecto:**
- El perfil es una herramienta de trabajo, no un entregable. Bullets y tablas cortas, no párrafos sobre brand archetypes.
- Observaciones concretas solamente — "usa fragmentos de frase para énfasis" es útil; "se siente accesible" no.
- Los ejemplos trabajados le ganan a los adjetivos. Cada claim sobre la voz recibe una línea citada de un sample.

**Lo que este kit se niega a producir:**
- Biblias de marca de 50 páginas
- Asignaciones de archetype junguianas ("eres el Sage / Outlaw / Magician")
- Paletas de color, fuentes o guía de logo — esto es voz, no identidad visual
- Stacks genéricos de adjetivos ("bold, confident, witty, authentic")
- Párrafos de "mission statement" o "brand essence"
- Un perfil de voz basado en cero samples — si el usuario no ha provisto ninguno, el kit los pide

---

## Los cuatro artefactos centrales

### 1. Extractor de sample-a-voz (`templates/sample-to-voice.md`)

Pega 3-5 samples. Recibe un perfil de voz estructurado con: matriz de atributos de voz (cuatro ejes), tendencias de estructura de frases, firmas de vocabulario, marcadores de ritmo y dispositivos de framing recurrentes. Cada hallazgo cita una línea específica de los samples.

### 2. Prompt de aplicación de voz (`templates/voice-application.md`)

Pega el perfil guardado + un draft genérico. Recibe un rewrite que empareja la voz. Incluye un self-check al final — la IA marca cualquier línea de la que no está segura que pasa el test on-brand.

### 3. Detector de drift de voz (`playbooks/voice-drift-detection.md`)

Para cuando sospechas que el output de la IA se ha deslizado de vuelta al default corporativo. Una rúbrica corta que la IA corre contra cualquier draft, scoreando cada sección como on-voice / drift / off-voice y apuntando a la frase exacta que disparó la llamada.

### 4. El perfil de voz mismo

El entregable del paso 1. Guarda este archivo como `voice-profile.md` (o pégalo en una memoria de proyecto) y reúsalo para siempre. El formato está diseñado para ser machine-readable en su camino de vuelta al próximo prompt.

---

## La matriz de atributos de voz

Cada perfil de voz scorea cuatro ejes de 1 a 5:

```
Formal       1 ——————— 5   Casual
Serio        1 ——————— 5   Lúdico
Directo      1 ——————— 5   Diplomático
Técnico      1 ——————— 5   Accesible
```

Un score de 3 significa "aterriza en medio en este eje". Un score de 1 o 5 significa "este es un rasgo load-bearing — nunca lo violes". La IA tiene instrucción de ponderar más pesado los 1s y 5s al aplicar la voz a copy nuevo.

Un output trabajado se ve como:
- **Formal/Casual: 4** — usa contracciones, suelta artículos para punch ("Construí esto para X"), pero nunca slangy
- **Serio/Lúdico: 2** — seco en lugar de tonto; los pocos chistes aterrizan vía understatement, no punchlines
- **Directo/Diplomático: 5** — abre con la petición, sin warm-up
- **Técnico/Accesible: 3** — usa palabras de dominio pero las define en la misma frase

Ese es el tipo de detalle que hace útil un perfil. "Authentic and bold" no.

---

## Los patrones de prompt

Al extraer una voz, la forma de input es:

```
[Samples]
Pega 3-5 samples de escritura que suenen como quieres sonar.
Etiqueta cada uno (post de LinkedIn propio / intro de blog favorecido por clientes / etc).

[Contexto]
¿Quién lee el output de esta voz? (compradores B2B prospectivos / padres de kids de fútbol / etc.)
¿Para qué es usualmente? (sales pages / newsletter semanal / cold emails / todo lo de arriba)

[Restricciones]
¿Algo off-limits? (sin groserías / sin primera persona / nunca mencionar competidores por nombre)
```

Al aplicar una voz:

```
[Perfil de voz]
Pega el perfil guardado.

[Draft]
Pega el copy rough o genérico que quieres reescribir.

[Goal]
¿Para qué es esto, y cuál es la acción deseada del lector?
```

Saltarse el bloque [Perfil de voz] es cómo terminas con output genérico de IA. El perfil es la pieza load-bearing.

---

## Ejemplo trabajado: 3 párrafos adentro, perfil de voz + rewrite afuera

**Input — tres samples:**

> Sample 1 (LinkedIn): "Acabo de terminar la llamada. Hard pass. Querían un engagement de 12 meses y no van a decir cómo se ve el éxito. Te ahorro la misma conversación: pregunta qué significa el éxito antes de preguntar cuánto cuesta".

> Sample 2 (intro de newsletter): "Tres semanas de silencio. Perdón — estaba metido en el rewrite. De vuelta. Esto es lo que cambió".

> Sample 3 (hero de landing-page): "No necesitas otro framework. Necesitas shippear una cosa esta semana. Aquí está la cosa".

**Perfil extraído:**
- Formal/Casual: **4** (contracciones por todos lados, fragmentos para punch)
- Serio/Lúdico: **2** (sin chistes, asides secos)
- Directo/Diplomático: **5** (cada opener lidera con el veredicto)
- Técnico/Accesible: **2** (cero jerga, segunda persona, frases cortas)
- **Estructura de frase:** promedio ~9 palabras. Uso pesado de openers de dos tiempos. Fragmentos de frase frecuentes.
- **Firmas de vocabulario:** "hard pass", "ship", "aquí está la cosa/lo que cambió". Evita: "leverage", "synergy", "stakeholder".
- **Dispositivo de framing:** verdict-first. Llama la próxima jugada probable del lector antes de que la hagan.
- **Anti-patrones a marcar:** cualquier frase que empiece con "En el mundo acelerado de hoy...". Cualquier uso de "transform", "unlock", "elevate".

**Draft genérico a reescribir:**
> "Estamos emocionados de anunciar el launch de nuestra nueva plataforma diseñada para ayudar a founders ocupados a streamlinear sus operaciones diarias a través de tecnología de IA de vanguardia".

**Reescrito en la voz:**
> "Nueva cosa en vivo. Es para founders que desperdician su día en las mismas cinco tareas admin. Toma como un minuto setup. Aquí está".

Esa es la prueba. Si puedes correr el mismo draft genérico a través de ambas versiones y sentir la diferencia en tu instinto, el perfil funciona.

---

## Lo que la IA hace mal sin este kit

1. **Promedia hacia la voz de LinkedIn.** Cada output termina sonando como el post mediano de LinkedIn — vagamente inspiracional, vagamente autoritativo, cero edge. El perfil bloquea esto haciendo que la IA defienda cada línea contra la rúbrica de voz.
2. **Por defecto va a estructura de tres actos.** La IA genérica ama "Primero... Después... Finalmente...". La mayoría de las voces distintivas no se mueven así. El perfil captura las tendencias reales de estructura de frase y anula el default.
3. **Usa palabras que nunca dirías.** Sin una firma de vocabulario, la IA te va a entregar "leverage", "elevate", "transform" y "best-in-class" sin importar cuántas veces le pidas que no. El kit hace que la IA mantenga una lista de prohibidas explícita sacada de los samples (palabras que el usuario nunca usó) y una lista de permitidas (palabras que alcanzan repetidamente).

---

## Lo que este kit NO va a hacer por ti

- Escribir copy mejor que tus samples. La extracción de voz es un techo, no un multiplicador — si tus samples son mediocres, los rewrites serán mediocres.
- Reemplazar tener algo que decir. Una voz sin punto de vista suena rara. Usa este kit sobre escritura que ya tiene opiniones, no sobre relleno.
- Atrapar cada drift. Vuelve a correr el detector de drift sobre cualquier asset de alto riesgo (sales page, post de fundraise, manifesto) antes de publicar.
- Sobrevivir a un cambio de co-escritor. Si una persona distinta está escribiendo el próximo batch de drafts, el perfil necesita samples nuevos de esa persona para mantenerse preciso.

---

## Docs complementarios

- `templates/sample-to-voice.md` — prompt de extractor + schema de output del perfil
- `templates/voice-application.md` — aplicar un perfil guardado a cualquier draft
- `playbooks/voice-drift-detection.md` — rúbrica para atrapar output de IA off-voice
- `memory.md` — contexto del dominio para la IA: vocabulario, workflows, errores comunes
- `optimization-pack.md` — system prompt autocontenido para cualquier chat con IA
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formateado
- `quick-start.md` — setup de 3 pasos
