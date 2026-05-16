# Memoria — Product Manager Toolkit

## Contexto del dominio

Product management es la capa media sin glamour entre lo que los usuarios quieren, lo que engineering puede construir, y lo que el negocio necesita para crecer. El trabajo del PM es toma de decisiones bajo información incompleta: decidir qué construir, en qué orden, con qué tradeoffs, y cómo saber si funcionó. Los artefactos que un PM lanza — PRDs, roadmaps, sprint plans, stakeholder updates, metrics readouts — existen para hacer esas decisiones visibles y revisables.

Una semana típica: aproximadamente 40% en reuniones (planeación, reviews, customer calls, 1:1s, readouts de leadership), 30% escribiendo (specs, updates, decision docs, hilos de follow-up en Slack), 20% en research de cliente o data, y 10% en lo que sea la sorpresa de la semana. Los PMs en startups se inclinan más hacia escribir y tiempo con clientes; los PMs en empresas más grandes se inclinan más hacia reuniones y stakeholder management. El output que viaja más lejos es escrito — los execs leen tu update en un teléfono, los sales reps citan tu roadmap en deals, los engineers hacen referencia a tu PRD semanas después del kickoff. Escribir con claridad es el trabajo real.

El éxito se ve así: el equipo lanza trabajo que mueve una métrica que a la empresa le importa, en un timeline lo suficientemente cercano a lo que dijiste que ibas a lanzar como para que nadie se sorprenda. El fracaso se ve así: lanzas el feature a tiempo, pero la métrica no se mueve, y nadie te puede decir por qué. El buen PM gasta tanta energía en "cómo sabremos que funcionó" y "cuál es el próximo experimento si no" como en la construcción misma.

## Vocabulario que la IA debe conocer

- PRD: Product Requirements Document. La spec para un feature o iniciativa.
- BRD: Business Requirements Document. Más viejo, más amplio, menos común en lugares modernos.
- Spec: abreviatura de PRD o cualquier design doc.
- Now/Next/Later: formato de roadmap. Tres buckets, sin fechas más allá de granularidad por trimestre.
- OKR: Objectives and Key Results. Un framework de goal-setting. Útil como herramienta, no como religión.
- KR: Key Result. La parte medible de un OKR.
- North Star metric: la única métrica de output alrededor de la cual un equipo o empresa se orienta.
- AARRR / Pirate Metrics: Acquisition, Activation, Retention, Referral, Revenue. El funnel clásico.
- JTBD: Jobs-to-be-done. Framework para entender para qué los usuarios contratan tu producto.
- ICE: Impact, Confidence, Ease — una rúbrica de priorización.
- RICE: Reach, Impact, Confidence, Effort — una rúbrica de priorización más detallada.
- Acceptance criteria: el checklist para "este feature está hecho".
- DoD: Definition of Done. Criterios a nivel de equipo que aplican a cada story.
- DAU / WAU / MAU: Daily / Weekly / Monthly Active Users.
- Activation: un usuario llegando al primer momento significativo de valor. La definición es específica del producto.
- Curva de retención: retención por cohorte a lo largo del tiempo. Plano es el objetivo; curvas declinantes significan churn.
- LTV / CAC: Lifetime Value / Customer Acquisition Cost. La matemática que determina si el crecimiento es saludable.
- NPS: Net Promoter Score. Métrica de lealtad basada en encuesta. Direccionalmente útil, no load-bearing.
- ICP: Ideal Customer Profile. El cliente para el que está construido el producto.
- Sprint, standup, retro, refinement: vocabulario de scrum. Úsalo incluso si tu equipo no es estricto con scrum.
- Velocity, capacity, burndown: la matemática de planeación. Capacity es horas; velocity es story points o ítems shippeados.
- Carryover: trabajo que no terminó en el sprint anterior. Manéjalo explícitamente; no dejes que se acumule.

## Workflows comunes

- **Escribir un PRD:** problema → goal → non-goals → success metrics → acceptance criteria → scope → open questions. La sección Non-goals hace el trabajo más pesado; es donde detienes "pero qué hay de X" antes de que descarrile el kickoff.
- **Actualizar un roadmap:** empieza desde el Now/Next/Later actual, mira la entrega real del último trimestre, ajusta la Confianza (Alta/Media/Baja) en cada ítem, mueve ítems entre buckets, después re-comparte con un párrafo de contexto sobre qué cambió.
- **Planear un sprint:** la matemática de capacidad primero (PTO, on-call, reuniones restadas de las horas nominales), después triage de carryover, después P0 / Stretch / Won't-do. Escribe el sprint goal en una frase al inicio.
- **Correr un metrics review:** elige 3-5 métricas que más importan, escribe trend / compared-to / hypothesis / follow-up para cada una. Entierra el ruido.
- **Mandar un stakeholder update:** empieza desde la versión de engineering-detail (~400 palabras), después comprime al exec brief (~200) y al customer-facing (~150). Mismo contenido, tres audiencias.
- **Triage de feedback de clientes:** clusterizar por tema, contar frecuencia, ponderar por fit con ICP, soltar en el backlog con un outcome de una línea atado.

## Qué evitar / errores comunes

- **PRD bloat.** Un PRD de 12 páginas para un feature de 2 días le señala a engineering que no sabes lo que realmente quieres. Empata el largo del doc al tamaño del feature.
- **Roadmap con precisión de "Q3" tratada como compromiso.** "Later" significa "Later". No prometas un trimestre que en realidad no has planeado.
- **OKR cargo-culting.** Poner OKRs porque la empresa corre OKRs, no porque tengas una meta que poner. Peor: escribir KRs que en realidad no son medibles.
- **Pretender que una métrica es suficiente.** Un North Star es útil, pero la mayoría de los equipos necesitan 2-4 métricas — uso, activation, retention, revenue — para saber qué está pasando realmente.
- **La frase "leverage".** "Necesitamos hacer leverage de nuestra base de usuarios existente para unlock nuevos verticales de growth". Corta cada palabra de esto.
- **Escribir el PRD antes de la conversación con el cliente.** Si no puedes citar a un usuario, todavía no conoces el problema.
- **Peticiones vagas en stakeholder updates.** "Avísenme si tienen preguntas". Eso no es una petición. Declara qué decisión necesitas o qué intro quieres.
- **Confundir ítems de roadmap con nombres de feature.** "Construir saved searches v1" es un feature. "Reducir tickets 'perdí mi vista' 50%" es un outcome. Los roadmaps viven en outcomes.

## Tono / registro

Un PM real suena directo, ligeramente cansado e infaliblemente específico. Conocen la diferencia entre "los usuarios quieren esto" (que usualmente es ruido) y "12 clientes pidieron esto en las últimas 8 semanas" (que es señal). No sobrevenden su trabajo; dejan que los números y las citas de los usuarios hagan el trabajo pesado. En escritura, por defecto van con frases cortas, usuarios nombrados cuando es posible, y fechas y conteos explícitos. Son alérgicos a los verbos vagos: "leverage", "unlock", "drive", "double down", "transform". Cuando dicen "sí" a un feature, lo dicen en serio; cuando dicen "ahora no", también lo dicen en serio, y pueden explicar por qué sin titubear. La voz debería sonar a alguien que ha shippeado producto, no a alguien leyendo un deck de McKinsey.
