# Plantillas de PRD + Roadmap

> La forma de PRD que usarás el 80% del tiempo, más el drafter de roadmap Now/Next/Later que convierte un backlog desordenado en buckets priorizados.

---

## Parte 1 — El PRD

### La forma

```
# PRD — <Nombre del feature> (v0.x, <autor>, <fecha>)

## Problema
Qué está roto, para quién, en lenguaje plano. Cita a un usuario si puedes.

## Goal
El único outcome para el que es este trabajo. Una frase.

## Non-goals
Lista explícita de lo que esto NO está haciendo. Razón por ítem ("Fase 2",
"workstream separado", "no va a mover la métrica que nos importa").

## Success metrics
Cómo sabremos que funcionó. Números objetivo. Ventanas de tiempo.

## Acceptance criteria
Cómo se ve "hecho". Bulleted, testeable.

## Scope
**Entra:** la rebanada que estamos construyendo
**Sale:** cortes explícitos
**Stretch:** si el tiempo lo permite

## Open questions
Lo que no sabes todavía. Cada uno tiene un deadline o un dueño.
```

Eso es todo. Sin mission statement. Sin sección de competitive-analysis a menos que una sea realmente load-bearing. Sin relleno de "user persona" si el equipo ya conoce al usuario.

### El prompt

```
Estás redactando un PRD. Reglas:

1. El largo del doc empata el tamaño del feature. Un feature de 2 días recibe un PRD de 1 página.
   Una iniciativa de 2 trimestres recibe 3-5 páginas. Sin PRDs de 12 páginas para trabajo pequeño.
2. Usa la forma de arriba, en orden: Problema → Goal → Non-goals → Success
   metrics → Acceptance criteria → Scope → Open questions.
3. La sección Non-goals es requerida y hace trabajo real. Cada entrada tiene
   una razón de una línea. Si un Non-goal es en realidad una decisión de Fase 2, linkéalo
   a la sección Open Questions.
4. Las Success metrics tienen números y ventanas de tiempo. "La adopción aumenta"
   no es una métrica. "25% de WAU crean una saved search dentro de 60 días"
   sí.
5. Los Acceptance criteria son bulleted, testeables, escritos para que un engineer
   pueda usarlos como definition of done.
6. El Scope tiene Entra / Sale / Stretch. La lista de Sale detiene "pero qué hay de"
   preguntas por adelantado.
7. Las Open questions nombran al decisor o el deadline. "TBD" no es suficiente.
8. Voz: directa, específica, ligeramente cansada. Sin "leverage", "unlock",
   "double down", "transform". Sin "Espero que esto te encuentre bien".

Saca el PRD solamente. Sin comentarios a menos que lo pida.
```

### Forma de input

```
[El trabajo]
Feature: <nombre>
Usuario objetivo: <quién> (específico — rol, tamaño del cliente, segmento)

[Status / contexto]
Etapa: idea / sketched / building / shipping
Señal: research / tickets / exec push / metric trend / competitivo
Audiencia para el PRD: eng / leadership / sales

[Material crudo]
Bullets, hilo de Slack, notas de reunión, PRD previo. Sin formatear está bien.

[Restricciones]
- Largo del doc
- Tono
- Decisiones ya tomadas (no relitigues)
- Decisiones explícitamente NO tomadas todavía (márcalas como open questions)
```

---

### Ejemplo trabajado — PRD de "Saved searches"

**Input:**

```
[El trabajo]
Feature: Saved Searches en nuestro dashboard de SaaS
Usuario objetivo: Power users — roles de ops y analytics en nuestros clientes,
típicamente equipos de 10-50 personas usando el dashboard a diario.

[Status / contexto]
Etapa: sketched. Escuchado en 6 customer calls en 8 semanas, 12 support
tickets en la misma ventana. Sin diseño todavía.
Audiencia: engineering lead + 2 IC engineers + diseño.

[Material crudo]
- Los clientes quieren guardar una vista filtrada y volver a ella
- Quieren ponerle nombre
- Quieren compartirla con su equipo (algunos, no todos)
- Quieren ser notificados cuando los resultados cambien (algunos, no todos)
- Algunos pidieron API; la mayoría vía UI
- Workaround actual: bookmark de la URL con query params — frágil,
  se rompe cuando cambiamos la estructura de URL

[Restricciones]
- 1-2 páginas
- Tono: scrappy, interno
- Decidido: esto va en el dashboard, no en una página separada
- Decidido: saves personales primero; team-shared es Fase 2
- Open: notificaciones cuando los resultados cambien — ¿Fase 1 o 2?
```

**Output (extracto):**

```
# PRD — Saved Searches (v0.5, Alex, 2026-05-14)

## Problema
Power users — roles de ops y analytics en nuestros clientes — corren las mismas
queries filtradas múltiples veces a la semana. Hoy hacen bookmark de URLs,
que se rompen cuando actualizamos la estructura de query-param. Hemos escuchado esto
en 6 customer calls y 12 tickets en las últimas 8 semanas.

Cita (Maya, ops lead en <Cliente>): "Reconstruyo el mismo filtro cada
lunes. Me rendí con los bookmarks porque la mitad de ellos dejaron de funcionar
después de su último release".

## Goal
Reducir la fricción "perdí mi vista filtrada" para power users.
Concretamente: permitir a un usuario guardar una vista filtrada con nombre, volver a ella, y
(Fase 2) compartirla.

## Non-goals
- Saved searches compartidas en equipo → Fase 2. Ver Open Questions.
- Saved searches API-first → Fase 2. La mayoría de la demanda es UI.
- Saved searches cross-product (dashboard + reports) → fuera de scope;
  workstream separado.
- Analytics de saved-search (cuáles saves se usan más) → Fase 2.

## Success metrics
- 25% de los usuarios activos semanales del dashboard crean al menos una saved
  search dentro de 60 días del launch
- La categoría de support ticket "perdí mi vista" baja 50% en la misma
  ventana de 60 días (baseline: ~24/mes durante Q1 2026)
- Mediana de saved searches por power user activo ≥2 al día 30

## Acceptance criteria
- El usuario puede guardar la vista filtrada actual con una acción "Guardar esta
  vista" de un clic en el dashboard
- La vista guardada tiene nombre (default = auto-resumen de los filtros; editable por el usuario)
- Las vistas guardadas aparecen en una sección left-rail "Mis vistas guardadas"
- Reabrir restaura el estado exacto del filtro, sin importar cambios de URL
- Las vistas guardadas se almacenan como filter JSON, no como URL strings
- Hasta 50 vistas guardadas por usuario; pasando el límite muestra un error claro

## Scope
**Entra:** Saves personales; solo UI; con nombre; restaurables. Cap de 50/usuario.
**Sale:** Compartidas en equipo. API. Notificaciones. Cross-product.
**Stretch:** Soft delete + restore para saves accidentalmente borradas.

## Open questions
1. Notificaciones cuando los resultados cambien → ¿Fase 1 o 2?
   Recomendación: Fase 2. Agrega una capa de detección de cambios que el loop
   core de save/restore no necesita. Decisor: <PM> para el 2026-05-21.
2. Límite de storage por usuario — 50 se sintió bien; sin data real. Abierto a
   ajustar basado en feedback de storage de engineering.
3. Política de migración cuando una columna de filtro subyacente es renombrada o
   removida. Decisores: <eng lead> + <PM>, antes del kickoff.
```

Lo que este PRD hace:

- Cita a un usuario real en la sección Problema.
- Non-goals hace el trabajo pesado — cuatro cortes explícitos, cada uno con una razón.
- Las Success metrics tienen números, baselines y ventanas de tiempo.
- Los Acceptance criteria son testeables.
- La sección "Sale" del Scope detiene las preguntas "pero qué hay de" por adelantado.
- Las Open questions tienen decisores y deadlines.

Esas son 700 palabras en un PRD de 1-2 páginas. Right-sized para el trabajo.

---

## Parte 2 — Roadmap Now / Next / Later

### El prompt

```
Estás actualizando un roadmap Now/Next/Later. Reglas:

1. Tres columnas: Now, Next, Later. Nada más.
2. Cada ítem es un outcome (p. ej. "Reducir tickets 'perdí mi vista' 50%"),
   no un nombre de feature. Nombre del feature en paréntesis.
3. Cada ítem tiene un Trimestre y una Confianza (Alta / Media / Baja).
   La confianza es honesta. No califiques todo en Alta.
4. "Now" = comprometido, en progreso.
5. "Next" = comprometido para el próximo ciclo.
6. "Later" = en el radar, no comprometido.
7. Si el usuario propone mover un ítem de Later a Now sin un
   corte correspondiente, empuja atrás: "¿Qué de Now se va a mover hacia afuera?".
8. Saca el roadmap como una tabla de markdown. Un párrafo debajo
   explicando qué cambió desde el último ciclo.

Voz: directa, específica. Sin "pronto" sin un trimestre. Sin verbos vagos.
```

### Forma de input

```
[Roadmap actual]
Pega el Now / Next / Later existente, o descríbelo verbalmente.

[Lo que cambió]
- Nuevas iniciativas siendo agregadas
- Iniciativas que shippearon
- Iniciativas deslizándose o siendo despriorizadas
- Contexto estratégico (un compromiso con cliente, una jugada competitiva, un
  cambio de capacidad, etc.)

[Restricciones]
- Horizonte del trimestre (1-2 trimestres típico)
- Realidad de la capacidad del equipo (¿algún cambio mayor del ciclo anterior?)
- Audiencia (equipo interno, leadership, sales-facing)
```

### Ejemplo trabajado

**Input:**

```
[Roadmap actual]
Now:
- Completación de onboarding +10pp (flow de first-run revisado) — Q2 26, Alta
- Reducir tickets "perdí mi vista" 50% (Saved Searches v1) — Q2 26, Alta

Next:
- Paridad mobile-web para los top 5 flows del dashboard — Q3 26, Media
- Retención de power-user +5pp (Team-shared saves + API) — Q3 26, Media

Later:
- Analytics in-product para customer-side admins — Q4 26, Baja
- Dashboard de API rate-limit para customer engineers — Q4 26, Baja

[Lo que cambió]
- El trabajo de onboarding va en curso pero tendiendo a Media, no Alta — estamos
  encontrando más edge cases en el flow de first-run de los esperados.
- Un cliente top-3 comprometió renovación contingente a que Team-shared
  saves shippe en Q3. Tenemos que moverlo más temprano.
- Perdimos un engineer este trimestre. Capacidad baja ~20%.

[Restricciones]
- Horizonte de 2 trimestres
- Audiencia: readout de leadership
```

**Output:**

```
| Bucket | Outcome | Trimestre | Confianza |
|--------|---------|-----------|-----------|
| Now    | Reducir tickets "perdí mi vista" 50% (Saved Searches v1)  | Q2 26 | Alta  |
| Now    | Completación de onboarding +10pp (flow de first-run)      | Q2 26 | Media |
| Next   | Retención de power-user +5pp (Team-shared saves + API)    | Q3 26 | Media |
| Next   | Paridad mobile-web para los top 5 flows del dashboard     | Q3 26 | Baja  |
| Later  | Analytics in-product para customer-side admins            | Q4 26 | Baja  |
| Later  | Dashboard de API rate-limit para customer engineers       | Q4 26 | Baja  |

**Lo que cambió:** Onboarding pasó de Alta a Media confianza —
el flow de first-run tiene más edge cases de los esperados. Team-shared saves
se queda en Next (Q3) pero ahora es un compromiso contractual para una renovación de un cliente
top-3, así que es la prioridad para Q3 incluso a costa de
la paridad mobile-web (ahora Baja confianza dado el golpe de ~20% de capacidad
por perder un engineer). Recomiendo revisitar mobile-web en Q4
a menos que backfill.
```

Lo que este output hace:

- Honesto sobre la Confianza. Onboarding bajó a Media por los nuevos edge cases.
- Saca a la superficie la renovación contingente al cliente como la razón para priorizar Team-shared saves.
- Llama planamente el golpe de capacidad y sus consecuencias.
- No pretende que el equipo pueda absorber la pérdida sin un tradeoff.

---

## Cuándo saltarse el PRD

No cada feature necesita un PRD. Sáltatelo cuando:

- El trabajo es <2 días y el equipo ya entiende al usuario.
- El trabajo es un bug fix o un refactor pequeño.
- El trabajo se ha discutido a fondo en un design doc, y el PRD solo resumiría.

Cuándo saltarse el PRD pero mantener el artefacto: escribe un "qué + por qué + cómo sabremos" de 3 bullets en su lugar. Incluso el trabajo pequeño se beneficia de un outcome statement escrito.
