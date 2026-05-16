# Detección de Voice Drift

Para cuando sospechas que el output de la IA se ha deslizado de vuelta al default corporativo. Corre esto sobre cualquier draft antes de que salga en vivo — especialmente sales pages, posts de fundraise, manifiestos, anuncios de launch.

---

## El prompt

```
Estás auditando un draft por voice drift contra un perfil guardado. Reglas:

1. Compara el draft con la rúbrica del perfil. No seas caritativo. El drift es más útil de marcar que de excusar.
2. Scorea cada párrafo (o cada bloque — header de sección, lista bullet, CTA) como: on-voice / drift / off-voice.
3. Para cada llamada drift u off-voice, cita la frase exacta que disparó la llamada y nombra qué regla de voz violó.
4. Termina con una "fix priority" — qué 2-3 cosas mejorarían más la consistencia de voz si se arreglan primero.

Formato de output:

## Sección-por-sección
- [Etiqueta de sección 1]: on-voice / drift / off-voice
  - Trigger: "[frase citada]" — viola [regla]
- [Etiqueta de sección 2]: on-voice / drift / off-voice
  - Trigger: "[frase citada]" — viola [regla]
- ...

## Score de drift general: X/10
(10 = perfectamente on-voice; 0 = irreconocible)

## Fix priority (top 3)
1. [Cambio específico con ejemplo]
2. [Cambio específico con ejemplo]
3. [Cambio específico con ejemplo]

El perfil y el draft siguen.
```

---

## Tu input

```
[Perfil de voz]
[pega el perfil guardado completo]

[Draft]
[pega el draft completo que quieres auditado]
```

---

## Las señales de drift a vigilar

**Smuggling de palabras prohibidas.** El drift más común. La IA sabe que no puede usar "leverage" — así que escribe "harness" o "tap into" o "unlock". Misma forma semántica, palabra distinta. La regla: si una frase significa lo mismo que una palabra prohibida habría significado, sigue siendo drift.

**Creep de largo de frase.** La voz promedia 9 palabras. A medio camino del draft, las frases son de 18 palabras y subiendo. Esto es la IA cayendo de vuelta a la prosa "smooth". Siempre revisa el largo de frase en la segunda mitad de cualquier draft largo.

**Openers genéricos.** "En un mundo donde..." "La [audiencia] de hoy necesita..." "Todos hemos estado ahí..." Cualquiera de estos en una voz que scoreó 5 en Directo/Diplomático es off-voice automático.

**Drift de tres actos.** "Primero... Después... Finalmente..." o "Tres cosas cambiaron...". Si tu voz no se mueve así, la IA va a imponer esta estructura de todos modos. Atrápala.

**Stacking de adjetivos.** "Mensaje bold, witty y confident". Las voces no hablan de sí mismas en adjetivos. Si el draft tiene una frase describiendo la marca en ritmo de tres-adjetivos, eso es drift.

**Halago a la audiencia.** "Para founders que se niegan a conformarse". "Para los pocos que captan". Si el perfil de voz no incluye halago a la audiencia como dispositivo de framing, esto es drift — la IA está adulando.

**"Emocionado de anunciar".** Cualquier voz que no sea un press release de 2007 nunca debería usar esta frase. Trátala como off-voice automático.

---

## Ejemplo trabajado

**Perfil (truncado):**
```
Voz: Solo Builder
Load-bearing: Directo/Diplomático 5 (openers verdict-first), Serio/Lúdico 2 (seco, sin chistes)
Frase promedio: 9 palabras
Lista de prohibidas: leverage, transform, unlock, journey, passion, ecosystem, emocionado de anunciar
```

**Draft a auditar:**
> "Estamos emocionados de compartir algo en lo que hemos estado trabajando por mucho tiempo. En el mundo acelerado de hoy, los founders están constantemente haciendo malabares con prioridades y batallando por encontrar tiempo para enfocarse en lo que verdaderamente importa. Por eso construimos una herramienta que unlock la productividad y te ayuda a transform la forma en que trabajas. No podemos esperar a que la pruebes".

**Output de auditoría:**

```
## Sección-por-sección
- Frase 1: off-voice
  - Trigger: "Estamos emocionados de compartir" — viola la lista de prohibidas (auto-flag por lenguaje de press-release)
- Frase 2: off-voice
  - Trigger: "En el mundo acelerado de hoy" — viola la lista de anti-patrones (opener genérico); viola el dispositivo de framing verdict-first
- Frase 3: off-voice
  - Trigger: "unlock la productividad" + "transform la forma en que trabajas" — viola la lista de prohibidas (unlock + transform metidos juntos)
- Frase 4: drift
  - Trigger: "No podemos esperar a que la pruebes" — viola Directo/Diplomático 5 (esto es calidez matizada, no un veredicto o CTA)

## Score de drift general: 1/10
(Irreconocible como la voz guardada. Esto se lee como output default de IA.)

## Fix priority (top 3)
1. Reescribe el opener como un veredicto. Ejemplo: "Shippeé una herramienta que corre las cinco tareas admin que los founders desperdician en un día".
2. Quita la frase media entera. La voz no explica — afirma y sigue adelante.
3. Reemplaza el cierre cálido con un CTA directo. Ejemplo: "Link abajo".
```

Esa es la prueba. Si la auditoría dice "perfectamente on-voice" y puedes ver drift en el draft, la auditoría está equivocada — vuelve a pegar el perfil y córrela de nuevo. La detección honesta de drift es más útil que un pase falso.

---

## Cuándo correr la detección de drift

- Antes de que cualquier asset de alto riesgo salga (sales page, post de fundraise, email de launch, manifiesto)
- En cada rewrite que la IA te entregue para contenido longform (más de 400 palabras)
- Cuando sospechas que tu voz se ha cambiado pero no puedes articular por qué — córrela sobre tres assets recientes y compara
- Trimestralmente sobre tu contenido publicado, como check de calibración antes de extraer un perfil fresco
