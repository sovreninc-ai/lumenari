# Plantillas de Stakeholder Update

> Tres sabores, el mismo esqueleto: exec brief, engineering detail, customer-facing. La misma semana de trabajo comprimida para tres audiencias distintas.

---

## El esqueleto (los tres sabores comparten esto)

1. **Status** — una palabra (Verde / Amarillo / Rojo) más una frase
2. **Qué shippeó** — outcomes, no features
3. **Qué sigue** — ítems comprometidos para el próximo ciclo
4. **En riesgo** — honesto sobre lo que podría deslizarse
5. **La petición** — una cosa específica que necesitas de esta audiencia

Las diferencias entre sabores son:

- **Largo:** 200 / 400 / 150 palabras
- **Vocabulario:** jerga interna OK en exec y eng; nunca en customer-facing
- **Profundidad en blockers:** exec recibe el titular; eng recibe los detalles; customer-facing usualmente lo omite
- **La petición:** exec pide decisión/headcount/intro; eng pide priorización o destrabar; customer pide feedback o participación en beta

---

## Sabor 1 — Exec brief (~200 palabras)

### El prompt

```
Estás escribiendo un stakeholder update ejecutivo. Reglas:

1. ~200 palabras. Cap duro: 250.
2. Lidera con el status como una sola palabra: Verde / Amarillo / Rojo. Después una
   frase del por qué.
3. "Qué shippeó" son outcomes, no features. "Reducí tickets 'perdí mi vista'
   47% en 30 días" no "Shippeé Saved Searches v1".
4. "En riesgo" es honesto. Si algo podría deslizarse, dilo y por qué.
5. Termina con una petición específica. "Necesito una decisión sobre X para Y". No "avísenme
   si tienen preguntas".
6. Sin "Espero que este email te encuentre bien". Sin "circling back".
7. Voz: directa, calmada, específica. Números cuando los tengas.

Saca el update solamente.
```

### Ejemplo trabajado

```
**Status: Amarillo** — Saved Searches launch en curso para el 30 de mayo;
trabajo de onboarding deslizándose ~2 semanas por descubrimiento de edge cases.

**Lo que shippeó este periodo**
- Reduje fallas de retry de webhook 78% (cerré una categoría de incidentes P1
  de larga data)
- Paridad mobile-web para los top-3 flows del dashboard
- Activation +3pp del experimento de tooltip first-touch nuevo

**Lo que sigue (próximas 2 semanas)**
- Saved Searches v1 → shipea el 30 de mayo, beta con 4 clientes primero
- Revisión de onboarding v2 → ajustada para reflejar los nuevos edge cases
- Team-shared saves → kickoff el 28 de mayo (comprometido en la
  renovación del <Cliente X>)

**En riesgo**
- Objetivo de completación de onboarding (+10pp) — empujado de Q2 a inicios de Q3
  por los edge cases de first-run. Mitigación: shippeando el v2 con los
  edges de mayor impacto; el resto en Q3.
- La paridad mobile-web para los 2 flows restantes se desliza a Q4 a menos que
  llenemos el asiento de engineering que perdimos.

**Petición**
Necesito una decisión para el viernes sobre si llenar el asiento abierto de engineering
o aceptar el slip de mobile-web a Q4. Ambos caminos funcionan; preferiría
no cargar la ambigüedad en la planeación del equipo de la próxima semana.
```

Nota lo que está pasando:

- El status es Amarillo, no Verde. El PM está siendo honesto.
- "Lo que shippeó" son tres líneas, cada una un outcome con un número.
- "En riesgo" son riesgos reales con mitigaciones, no boilerplate.
- La petición es específica — una decisión, para una fecha, con las opciones enmarcadas.

Aproximadamente 200 palabras. Un exec puede escanearlo en 45 segundos.

---

## Sabor 2 — Engineering detail (~400 palabras)

### El prompt

```
Estás escribiendo un stakeholder update de equipo de engineering. Reglas:

1. ~400 palabras. Cap duro: 500.
2. Mismo esqueleto que el exec brief, pero incluye:
   - Blockers (técnicos u organizacionales), con caminos propuestos
   - Dependencias con otros equipos
   - Decisiones que el equipo está pidiendo, con opciones + recomendación
3. El vocabulario técnico está bien. No simplifiques para engineering.
4. Misma disciplina de "liderar con status". Amarillo es Amarillo.
5. Termina con la petición. Relevante a engineering: una llamada de priorización, un
   destrabar, una decisión de tradeoff.

Saca el update solamente.
```

### Ejemplo trabajado

```
**Status: Amarillo** — Saved Searches en curso para el 30 de mayo; el trabajo de onboarding
se desliza ~2 semanas; una dependencia cross-team en riesgo.

**Shippeado este periodo (outcomes + cómo)**
- Fallas de retry de webhook reducidas 78%: introducidas idempotency keys +
  dead-letter queue. El soporte de Stripe confirmó que el patrón se alinea con
  su recomendación. Volumen de P1 pages 12/mes → 3/mes.
- Paridad mobile-web para los top-3 flows: refactoricé el primitivo de layout del dashboard
  para usar CSS Grid; resolví el bug de breakpoint de tablet de larga data
  como efecto secundario.
- Activation +3pp: A/B test en tooltip de first-touch cerró al 95% conf.
  La variante B (contextual en lugar de saludo) ganó.

**Construyendo ahora**
- Saved Searches v1 — backend completo; UI 80%. Patrón de storage de Filter-JSON
  validado contra los 12 shapes de query más usados. Cohorte de beta
  seleccionada: 4 clientes, todos power users, opt-in.
- Revisión de onboarding v2 — scope ajustado para shippear los edges de mayor impacto
  primero. Quedan tres edge cases para Q3.

**Blockers y dependencias**
- El kickoff de team-shared saves es contingente al equipo de Permissions
  shippeando el nuevo primitivo de RBAC (ETA: 25 de mayo). Trackeando semanalmente.
  Fallback: shippear team-shared saves con un modelo de share más simple all-or-nothing,
  refactor a fine-grained cuando RBAC aterrice.
- La latencia del backend de búsqueda en p95 ha subido 18% en Q1 — todavía no
  impacta al usuario, pero tendiendo. Proponiendo una semana-engineer para
  investigar antes de que se vuelva un incendio en Q3.

**Decisiones necesarias**
1. ¿Llenar el asiento abierto de engineering en Q2, o aceptar el slip de mobile-web
   a Q4? Recomendación: llenar. Mobile-web está en 2 de 4
   pedidos de clientes top-renewal para H2.
2. ¿Team-shared saves con modelo de share fallback all-or-nothing si RBAC
   se desliza? Recomendación: sí. El compromiso con el cliente es para Q3, y el
   costo del refactor son ~3 días cuando RBAC aterrice.

**Petición**
Necesito las dos decisiones de arriba para el viernes. Ambas dan forma al plan del próximo sprint.
```

Lo que es distinto del exec brief:

- Incluye cómo el trabajo shippeó, no solo el outcome.
- Saca a la superficie una tendencia de latencia que todavía no impacta al usuario — señal de engineering, no señal de exec.
- Enmarca decisiones con opciones y una recomendación, no como open questions.
- La petición nombra decisiones específicas y una fecha.

---

## Sabor 3 — Customer-facing (~150 palabras)

### El prompt

```
Estás escribiendo un update de cara al cliente. Reglas:

1. ~150 palabras. Cap duro: 200.
2. Lenguaje plano. Sin jerga interna. Sin callouts de métricas que no
   le importen al cliente.
3. Lidera con lo que el cliente puede usar ahora (la cosa que shippeó).
4. "Lo que viene" con granularidad de mes como máximo. Sin compromisos a
   fechas exactas.
5. Un canal para feedback. Fácil de usar.
6. Sin colores de status. Sin lenguaje "en riesgo". Si algo le importa al
   cliente, enmárcalo positivamente u omítelo.
7. Voz: cálida pero no efusiva. Confiada pero no agresiva.

Saca el update solamente.
```

### Ejemplo trabajado

```
Hola a todos,

Una nota rápida sobre lo nuevo en el dashboard este mes y lo que
viene a continuación.

**Lo que puedes usar ahora**
- El botón "Guardar esta vista" está en vivo en el dashboard para power users.
  Guarda tus vistas filtradas, ponles nombre, y siempre se restaurarán
  exactamente — incluso si nuestra estructura de URL cambia por debajo. Hasta 50
  por usuario.
- Mobile-web ahora es usable para los tres flows que más usas:
  dashboards, alertas y audit log. Los dos flows restantes vienen
  este otoño.

**Lo que viene**
- Vistas guardadas compartidas en equipo — comparte una vista filtrada con tu equipo.
  Apuntando a julio.
- Experiencia mejorada de first-run para los nuevos compañeros que onboardees. Finales
  de junio.

**Una pequeña petición**
Si pruebas Saved Views y encuentras algo que falte o raro, contesta
a este email. Leo cada uno personalmente y le da forma a lo que
construimos a continuación.

— Alex
```

Lo que es distinto:

- Sin color de status, sin framing de "en riesgo".
- "Hasta 50 por usuario" saca a la superficie un límite real, pero en lenguaje de cliente.
- "Lo que viene" usa meses, no trimestres o fechas específicas.
- La petición es directa y fácil (responde a este email).

---

## Cómo usar los tres en un workflow

La mayoría de las semanas, escribes primero el update de engineering-detail porque ahí es donde vive el material crudo — tu sprint planning, tus blockers, las decisiones de tu equipo. Después comprimes.

Workflow:

1. Escribe el update de engineering-detail (~400 palabras).
2. Pásalo por la IA: "Comprime a 200 palabras para un exec brief. Mantén una petición específica. Quita vocabulario técnico".
3. Pásalo por la IA otra vez: "Reescribe para nuestros clientes en 150 palabras. Lenguaje plano. Quita blockers internos. Enmarca alrededor de lo que pueden usar ahora".

Tiempo total: 30 minutos para las tres versiones. Las pasadas de compresión atrapan el over-claiming — si la versión exec no puede decir "shippeé X" sin matizar, la versión de engineering probablemente lo sobreestimó también.

---

## Anti-patrones que el prompt bloquea

- "Espero que este email te encuentre bien". — Cortar.
- "Solo quería retomar sobre..." — Cortar.
- "Conforme a mi último email..." — Cortar.
- "Seguimos haciendo progreso en..." — Vago. Reemplaza con un outcome y un número.
- "¡Las cosas van bien!" — El status es un color, no un sentimiento. Elige uno.
- "Avísenme si tienen preguntas". — No es una petición. Declara la petición real.
- "Emocionado de compartir..." — Al exec no le necesita saber cómo te sientes al respecto. Llega a la sustancia.

Si alguno se cuela, prompt: "Quita cada frase de relleno y reescribe con status, outcomes y la petición".
