# Playbook de Sprint Planning + Metrics Review

> Matemática de capacidad que es honesta, sprint goals que caben en una línea, y un formato de metrics review que produce readouts que la gente realmente lee.

---

## Parte 1 — Sprint planning

### La matemática de capacidad que nadie hace honestamente

La mayoría de los equipos planea a horas nominales, después se pregunta por qué fallan. La matemática que funciona:

```
Horas nominales = engineers × horas/día × días en el sprint
Resta:
  - PTO y feriados (suma a través del equipo)
  - Rotaciones de on-call (10-20% de la semana de un on-call engineer)
  - Reuniones recurrentes (~6 horas/semana por engineer para equipos típicos)
  - Spillover / mantenimiento / no planeado (10-15% de lo restante)

Lo que queda = capacidad real de trabajo nuevo
```

Un sprint de 2 semanas con 4 engineers a 8 horas/día se ve como 320 horas nominales. La realidad está más cerca de **140-180 horas** de capacidad real de trabajo nuevo. Si tu sprint plan asume 320, vas a cargar la mitad del trabajo al siguiente sprint.

### El prompt

```
Estás planeando un sprint conmigo. Reglas:

1. Empieza con la matemática de capacidad. Te diré el tamaño del equipo, largo del sprint,
   y ausencias conocidas. Tú vas a computar nominal → capacidad real usando
   las deducciones estándar (on-call 15%, reuniones ~6h/eng/semana,
   spillover 12%).
2. Después triage del carryover del sprint anterior. Cada ítem de carryover:
   mantener, soltar o partir.
3. Después prioriza el trabajo nuevo como P0 (debe shippear), Stretch (si el tiempo
   lo permite), Won't-do (corte explícito para este sprint).
4. Sprint goal en una frase al inicio. Se lee limpio a alguien
   que no conoce al equipo.
5. Saca el sprint plan como: Sprint Goal → Capacidad → Carryover →
   P0 → Stretch → Won't-do.
6. Sin cargo culting de story points. Usa horas o sizing rough
   (S/M/L/XL) — lo que el equipo ya use.

Voz: directa, específica. El plan debería ser escaneable en 60 segundos.
```

### Forma de input

```
[Equipo]
Engineers: <conteo + nombres si es útil>
Diseñadores: <conteo>
Tiempo de PM: <fracción de la semana>

[Sprint]
Largo: 1 semana / 2 semanas
Inicio: <fecha>
Fin: <fecha>

[Ausencias conocidas]
- <Engineer X>: fuera mar-mié
- <Engineer Y>: fuera toda la primera semana (vacaciones)
- On-call este sprint: <Engineer Z>

[Carryover del último sprint]
- <Ítem>: status (50% completo / bloqueado / no empezó)

[Trabajo candidato para este sprint]
- <Ítem>: sizing rough si lo tienes
- <Ítem>: ...
```

### Ejemplo trabajado

**Input:**

```
[Equipo]
4 engineers (Alex, Beth, Carmen, Dev)
1 diseñador (Eli) — 50% en este equipo este sprint
PM: yo, ~30% capacidad

[Sprint]
2 semanas, 19 de mayo - 30 de mayo de 2026

[Ausencias conocidas]
- Dev: fuera mar-mié de la semana 1 (3 días libres)
- Beth: fuera la semana 2 (semana completa de vacaciones)
- On-call: Carmen el sprint completo

[Carryover del último sprint]
- Saved Searches v1 UI polish (~70% hecho, bloqueado en design review)
- Dashboard de observabilidad de retry de webhook (~50% hecho, despriorizado
  cuando el trabajo de retry-failure shippeó)

[Trabajo candidato para este sprint]
- Saved Searches v1 launch (UI polish + rollout de beta)
- Backend de Team-shared saves (spike de integración RBAC)
- Onboarding de first-run v2 (fixes de edge cases — 3 bugs específicos)
- Mobile-web para vista "Audit Log"
- Exploración de UX de customer-shared saves (solo exploración de diseño)
```

**Output:**

```
**Sprint Goal:** Shippear Saved Searches v1 a la cohorte de beta para el 30 de mayo.
Destrabar el kickoff de Team-shared saves para el próximo sprint.

**Capacidad**
- Nominal: 4 engineers × 8h × 10 días = 320h
- Beth fuera semana 2: −40h
- Dev fuera 3 días: −24h
- Carmen en on-call (15% a través del sprint): −12h
- Reuniones (6h/sem × 4 eng × 2 sem): −48h
- Spillover/mantenimiento (12%): −24h
- **Capacidad real de trabajo nuevo: ~172h**

**Carryover (decidir primero)**
- Saved Searches v1 UI polish (~70% hecho) → MANTENER. Design review
  agendado el 20 de mayo. P0 para este sprint.
- Dashboard de observabilidad de retry de webhook → SOLTAR. El trabajo original de retry-failure
  shippeó; el dashboard ya no es alta prioridad. Mover a Later
  en el roadmap.

**P0 (comprometido — entra en ~140h)**
- Saved Searches v1 UI polish + rollout de beta (Alex, ~40h)
- Spike de integración RBAC de Team-shared saves (Beth antes de las vacaciones,
  Carmen continúa, ~50h)
- Fixes de edge case de first-run onboarding v2 — 3 bugs específicos
  (Dev, ~30h)
- Vista Mobile-web Audit Log (Carmen entre trabajo de on-call, ~20h)

**Stretch (~30h de headroom si P0 termina temprano)**
- Exploración de UX de customer-shared saves con Eli (diseño, ~30h)
- Tech-debt: investigación de latencia del backend de búsqueda (Alex si está disponible)

**Won't-do este sprint (explícito)**
- Trabajo de backend de customer-shared saves (esperando outcome del spike de RBAC)
- API para Saved Searches (Fase 2 — no en los compromisos de este ciclo)
- Dashboard de observabilidad de retry de webhook (despriorizado; ver Carryover)

**Riesgos**
- Beth fuera la semana 2 significa que la completación del spike de RBAC depende de Carmen,
  quien también está en on-call. Si las pages se disparan, el spike se desliza. Mitigación:
  Beth pone el spike al frente en la semana 1.
- Mobile-web Audit Log depende de un primitivo de layout compartido que Alex está
  terminando durante el polish de Saved Searches. Vigila el handoff.
```

Lo que este plan hace:

- Sprint goal en una frase al inicio.
- La matemática de capacidad es explícita y conservadora.
- El carryover se decide al inicio (mantener / soltar / partir).
- P0 entra cómodamente dentro de la capacidad real, con espacio de stretch.
- Won't-do es explícito, nombrando ítems que *serían* tentadores de tomar.
- Los riesgos están nombrados con mitigaciones, no enterrados.

---

## Parte 2 — Metrics review

### Cómo se ve lo bueno

Un metrics review no es un muro de números. Es un documento de dos páginas que dice:

> "Aquí están las 3-5 métricas que más importan. La tendencia de cada una, qué creemos que la está impulsando, y qué miraríamos después. La cosa que deberías saber: <una cosa específica>".

La mayoría de los metrics reviews fallan tratando de cubrirlo todo. Elige las métricas que más importan para la pregunta estratégica actual, saca a la superficie lo que se movió, e ignora el ruido.

### El prompt

```
Estás corriendo un metrics review conmigo. Reglas:

1. Te voy a dar 3-7 métricas y sus valores (periodo actual, periodo
   anterior, objetivo si lo hay). Vas a producir un readout, una
   métrica a la vez.

2. Para cada métrica, escribe:
   - Tendencia: arriba / abajo / plana, con magnitud (p. ej. "arriba 12%")
   - Comparado a: periodo previo, objetivo o ambos
   - Hipótesis: 1-2 frases. Qué crees que la está impulsando. Si
     no tienes suficiente info para hipotetizar, dilo honestamente.
   - Follow-up: qué querría checar después (una rebanada de la data, una
     customer call, una correlación con un launch, etc.)

3. Ordena por importancia. La métrica que más se movió o más importa
   para la estrategia actual va primero.

4. Al final, escribe un "headline" de un párrafo que resuma la
   semana en 3-4 frases. La cosa con la que el exec que lee esto debería
   irse sabiendo.

5. Entierra el ruido. Si una métrica no se movió significativamente y no es
   estratégicamente relevante, agrúpala bajo "Plana / sin señal" al
   final.

Voz: directa, calibrada. El lenguaje matizado ("podría", "puede ser") está
bien cuando es honesto; evita falsa certeza.
```

### Forma de input

```
[Periodo]
Periodo de reporte: <p. ej. semana del 6-12 de mayo de 2026>
Comparado a: <fechas del periodo previo>

[Contexto estratégico]
A qué le estamos poniendo atención este trimestre (p. ej. "objetivo de
activation +10pp", "ciclo de renovación Q2", "launch de Saved Searches a mitad de mes")

[Métricas]
Para cada métrica:
- Nombre
- Valor actual
- Valor previo
- Objetivo (opcional)
- Cualquier contexto que quieras (un launch esta semana, una anomalía conocida, etc.)
```

### Ejemplo trabajado

**Input:**

```
[Periodo]
Semana del 6 de mayo - 12 de mayo de 2026
Comparado a: Semana del 29 de abril - 5 de mayo

[Contexto estratégico]
El objetivo Q2 es activation +10pp. Estamos en +6pp YTD; necesitamos +4pp para fin de Q2.
Saved Searches v1 está agendado para el 30 de mayo.

[Métricas]
- WAU: 8,420 → 8,510 (+1.1%), sin objetivo
- Activation rate: 41% → 39% (-2pp), objetivo 47%
- Fallas de retry de webhook: 0.8% → 0.3% (-0.5pp), objetivo <1%
- Volumen de support tickets: 142 → 168 (+18%), sin objetivo
- Nuevos clientes pagos netos: 12 → 14 (+2), objetivo 15/sem
- Share de sesiones mobile-web: 18% → 21% (+3pp), sin objetivo
- Tickets "perdí mi vista": 6 → 8 (+2), objetivo informal cero para julio
```

**Output:**

```
**Headline:** Activation se deslizó 2pp esta semana, el primer declive en
siete semanas — el nuevo flow de first-run puede estar sobre-rotando en los
edge cases que parchamos el sprint pasado, y deberíamos escarbar en el
funnel antes del próximo experimento. Las fallas de retry de webhook ahora están
sólidamente debajo del objetivo. El launch de Saved Searches en curso, pero los tickets
"perdí mi vista" subieron — recuerden que el launch está a 18 días.

---

**Activation rate** — ABAJO 2pp (41% → 39%, objetivo 47%)
- Comparado a: semana previa y tendencia YTD (este es el primer declive
  desde la semana del 17 de marzo).
- Hipótesis: La revisión del flow de first-run que shippeó el 30 de abril intercambió
  velocidad por cobertura — agregamos dos pasos de onboarding para manejar edge
  cases. Sospecho que hemos hecho más lento el tiempo mediano-a-activation lo suficiente
  para bajar la tasa. Necesitamos mirar el funnel por paso.
- Follow-up: sacar el funnel de nuevo usuario para esta semana vs. la anterior; comparar
  drop-off por paso. Decidir para el viernes si revertir el paso 4 o
  iterar.

**Volumen de support tickets** — ARRIBA 18% (142 → 168)
- Comparado a: semana previa. Sin objetivo baseline.
- Hipótesis: Incremento concentrado en la categoría "Saved Views" —
  6 → 8 — y en tickets relacionados a onboarding (sospecho relacionados al
  drop de activation de arriba). No es una regresión de calidad; el uso está cambiando.
- Follow-up: Etiquetar los tickets de esta semana por categoría. Si onboarding es
  >40% del incremento, es la misma causa raíz que el drop
  de activation.

**Fallas de retry de webhook** — ABAJO 0.5pp (0.8% → 0.3%, objetivo <1%)
- Comparado a: semana previa y objetivo.
- Hipótesis: El trabajo de Idempotency + DLQ shippeó hace 2 semanas y ahora está totalmente
  en efecto. Drop sostenido, no una casualidad de una semana.
- Follow-up: Marcar como resuelto; quitar de métricas semanales, monitorear
  mensualmente en adelante.

**Nuevos clientes pagos netos** — ARRIBA 2 (12 → 14, objetivo 15/sem)
- Comparado a: semana previa y objetivo semanal.
- Hipótesis: Cerca del objetivo; nada gritando.
- Follow-up: Ninguno esta semana. Vigilar el acumulado Q2.

**Share de sesiones mobile-web** — ARRIBA 3pp (18% → 21%)
- Comparado a: semana previa. Sin objetivo formal.
- Hipótesis: El launch de paridad mobile-web para los top-3 flows está
  impulsando un uptick sostenido. Tres de las últimas cuatro semanas han mostrado
  crecimiento.
- Follow-up: Sacar el desglose por clase de dispositivo para el review de la próxima semana;
  vale confirmar que esto es uso incremental, no canibalización
  de sesiones de desktop.

**Plana / sin señal**
- WAU: +1.1%, dentro de la variación semanal normal. Sin acción.
- Tickets "perdí mi vista": 6 → 8. Debajo del umbral de ruido para
  análisis semanal; revisitar después del launch de Saved Searches.
```

Lo que este readout hace:

- El headline en 3-4 frases le da al exec el takeaway sin scrollear.
- Métricas ordenadas por importancia, no por alfabeto.
- Cada métrica tiene una hipótesis real, no "seguiremos monitoreando".
- Los follow-ups son acciones específicas, no intenciones vagas.
- La métrica que se ha resuelto (fallas de retry de webhook) se promueve fuera de la lista semanal.
- El ruido está enterrado bajo "Plana / sin señal" para que el readout se mantenga escaneable.

---

## Cómo sprint y metrics trabajan juntos

El metrics review debería manejar el próximo sprint plan. Si activation cayó 2pp esta semana y la hipótesis apunta al flow de first-run, esa investigación del funnel pertenece a P0 del próximo sprint, no a algún lugar del backlog.

Workflow:

1. Corre el metrics review viernes o lunes en la mañana.
2. Identifica las 1-2 métricas que te sorprendieron (positiva o negativamente).
3. Convierte cada sorpresa en un follow-up: un data pull, una customer call o un experimento.
4. Los follow-ups van a sprint planning como ítems P0 si son load-bearing para la meta estratégica.

El trabajo del PM es mantener el loop apretado: métricas → hipótesis → experimento → métricas. Los sprint plans que no reflejan la señal de la semana pasada son cómo los equipos van a la deriva.
