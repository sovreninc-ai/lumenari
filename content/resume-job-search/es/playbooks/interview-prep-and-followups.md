# Prep de Entrevistas + Follow-Ups

> Prep de entrevistas STAR / behavioral / técnico, más los tres follow-up emails que cada búsqueda de trabajo necesita: thank-you, post-rejection y ghost-recovery.

---

## Parte 1 — Prep de behavioral interview (STAR)

### Cómo funciona STAR realmente en la práctica

La mayoría de la gente se equivoca en STAR gastando 80% de la respuesta en Situation y Task. Al entrevistador no le importa el setup. Le importa lo que *tú* hiciste y lo que pasó.

Ratio correcto:

- **Situation (10%)**: Una frase. "En Acme, estábamos viendo fallas de retry de webhooks en aproximadamente 12% de todos los eventos".
- **Task (10%)**: Una frase. "Yo era el on-call engineer ese trimestre y las fallas me estaban despertando dos noches a la semana".
- **Action (60%)**: Pasos específicos que *tú* tomaste. Primera persona "yo", no "nosotros". Esta es la carne.
- **Result (20%)**: Números si los tienes. El outcome — para el equipo, el cliente, el negocio.

Si dices "nosotros" más de dos veces, el entrevistador no sabe qué hiciste. Usa "yo". Cuando el trabajo fue genuinamente colaborativo, di "lideré" o "fui dueño de la pieza X mientras dos engineers manejaban Y".

### El prompt de prep

```
Me estás ayudando a prep respuestas de behavioral interview en formato STAR.
Te voy a dar una pregunta y la historia cruda que quiero contar. Vas
a producir una respuesta STAR apretada de ~200 palabras.

Reglas:
1. Situation: máximo 1 frase.
2. Task: máximo 1 frase.
3. Action: 60% de la respuesta. Primera persona "yo". Si el trabajo fue
   colaborativo, nombra qué fui dueño específicamente vs. qué hicieron otros.
4. Result: termina con un número o un outcome concreto. Si no tengo
   un número, pregúntame antes de inventar uno.
5. ~200 palabras. Se lee limpio en voz alta en 90-120 segundos.
6. Sin buzzwords (apasionado, results-driven, dynamic). Sin relleno.

Después de producir la respuesta, hazme una pregunta de follow-up que el
entrevistador es más probable que haga. Sugiere una cola breve a mi respuesta
que la aborde preventivamente si es útil.
```

### Las 6-8 historias que deberías tener listas

Antes de cualquier onsite, prep 6-8 historias que puedas flexionar en preguntas distintas. La mayoría de las preguntas behavioral son variaciones sobre estos temas:

1. Una vez que lideraste algo
2. Una vez que no estuviste de acuerdo con un peer o manager
3. Una vez que fallaste
4. Una vez que tuviste que aprender rápido
5. Una vez que tuviste que hacer un tradeoff difícil
6. Una vez que hiciste mentoring o desarrollaste a alguien
7. Una vez que entregaste bajo presión
8. Una vez que empujaste atrás a un stakeholder

Para cada una, escribe 3-4 frases de contexto más el outcome. No estás memorizando scripts — estás prepando el material crudo para que la IA pueda darle forma a la respuesta correcta en el momento.

### Ejemplo trabajado

**Pregunta:** "Cuéntame de una vez que no estuviste de acuerdo con tu manager".

**Input crudo del usuario a la IA:**

```
En Acme, mi manager quería shippear el nuevo feature de payments en 4 semanas
sin un feature flag porque el cliente estaba esperando. Pensé
que era una mala decisión — nunca habíamos shippeado payments sin un flag y
el cliente no se daría cuenta de una semana extra. Empujé atrás, terminé
agregando el flag y rollout del feature durante 2 semanas. Atrapamos
un bug en la semana 1 que hubiera costado ~$80k si hubiéramos shippeado al 100%.
```

**Respuesta STAR que la IA produce:**

```
En Acme, mi manager empujó por shippear un nuevo feature de payments en cuatro
semanas sin un feature flag porque un cliente clave estaba esperando.

Yo era dueño del deploy y estaba en desacuerdo — nunca habíamos shippeado un cambio
de payments sin un flag, y no pensé que el cliente sentiría
una semana extra.

Saqué el runbook y escribí el riesgo: cualquier bug en rollout al 100%
golpea a cada cliente, y nuestro incidente promedio de impacto en revenue en
payments rondaba los $80k. Propuse flagging del feature y hacer
rollout de 5% a 25% a 100% en dos semanas. Mi manager empujó atrás dos veces
por presión de timeline, pero mantuve la línea en la arquitectura y
ofrecí tomar yo mismo la llamada con el cliente para explicar el plan de rollout.
Agregamos el flag.

En la semana uno a 25%, atrapamos un bug de retry de webhook que hubiera
disparado cargos duplicados en rollout completo. Costo estimado evitado:
aproximadamente $80k. El cliente recibió el feature en la fecha original porque
habíamos planeado el rollout en paralelo con el build. Mi manager y
yo seguimos default-flagging cada deploy de payments después de eso.

(Follow-up probable: "¿Cómo manejaste el pushback de tu manager?" —
agregaría una frase: le pregunté qué estaba optimizando, acordamos
en eso explícitamente con el cliente, después hice el caso arquitectónico
por escrito para que pudiéramos disentir sobre data en lugar de opinión.)
```

Eso es 220 palabras, se lee en cerca de 100 segundos, y muestra juicio, ownership, comunicación y outcome. La sugerencia de follow-up es el bono — la IA marca dónde el entrevistador probablemente va a escarbar y te da una respuesta pre-armada.

---

## Parte 2 — Prep de entrevista técnica

### En qué es buena la IA

- Pattern-matching de problemas de algoritmos y explicar la forma de la solución.
- Caminar por problemas de system-design con la rúbrica estándar (requerimientos funcionales, no funcionales, API, modelo de datos, escala, bottlenecks, tradeoffs).
- Mock-interviewing en preguntas de debugging o lectura de código.
- Generar follow-ups de "qué harías si" para que no te sorprendan en la habitación.

### En qué es mala la IA

- Reemplazar la práctica real. Tienes que escribir código o whiteboardear el diseño tú mismo. Leer la solución de la IA no es lo mismo que producirla bajo presión.
- Predecir qué te preguntará *tu* entrevistador. La IA puede simular el promedio; la habitación real va a ser su propia cosa.

### Patrones de prompt útiles

**Para system design:**

```
Tengo una entrevista de system design mañana en <empresa>. El rol es
<senior backend>. Llévame por cómo estructurarías 45 minutos en
este problema: "Diseña un sistema de delivery de webhooks para una plataforma
tipo Stripe".

Después hazme 3 preguntas sobre las decisiones de diseño que querría estar
preparado para defender.
```

**Para algoritmos:**

```
Estoy oxidado en dynamic programming. Dame 3 problemas de DP de
dificultad media con un hint de una línea cada uno. No me muestres las soluciones todavía.
Los intentaré y volveré.
```

**Para mock interviews:**

```
Eres un senior engineer entrevistándome para un rol de backend. Hazme
una pregunta de debugging. Después de que responda, haz follow-ups como
lo haría el entrevistador. No me ayudes — empújame. Dime al final cómo
mi respuesta habría aterrizado.
```

La línea "empújame, no me ayudes" importa. La IA por defecto es amable. No quieres amable en un mock; quieres las preguntas que el entrevistador real va a hacer.

---

## Parte 3 — Los tres follow-up emails

### Email 1 — Thank-you post-entrevista (envíalo dentro de 24 horas)

**Prompt:**

```
Escribe un email de thank-you de 100-130 palabras después de una entrevista de trabajo. Reglas:

1. Haz referencia a una cosa específica que el entrevistador dijo. No un
   "gracias por tu tiempo" genérico.
2. Refuerza brevemente una cosa sobre mi fit — elige la señal más fuerte
   de la conversación.
3. Abre la puerta para preguntas de follow-up. No supliques por el rol.
4. La despedida es profesional, no ansiosa.
5. Subject line: "Gracias — <mi nombre> / <rol>"

Te voy a dar: el nombre del entrevistador, el rol, una cosa específica
que dijeron, y una cosa que quiero reforzar.
```

**Ejemplo trabajado:**

```
Asunto: Gracias — Alex / Senior Backend Engineer

Maya,

Gracias por la conversación de hoy. La parte sobre cómo están pensando
en el ordering de webhooks cuando los retries llegan fuera de secuencia se me
quedó — ese es un problema en el que he pasado más tiempo de lo que probablemente
es saludable, y suena a que lo están abordando de la misma forma que nosotros
en Acme.

Si le ayuda al equipo, con gusto los llevo por el árbol de decisión específico
de retry-ordering que escribí el año pasado — es el tipo de
cosa más fácil de compartir en vivo que de tipear. De cualquier forma, qué bien
que pudimos hablar. Espero que el resto del loop vaya suave.

— Alex
```

Manda uno a cada entrevistador del que tengas email, individualizado por persona. Reutilizar el mismo email palabra-por-palabra está bien si lo único que cambia es la referencia específica — pero la referencia específica sí tiene que cambiar.

### Email 2 — Post-rejection (envíalo dentro de 48 horas del no)

Este importa. La mayoría no lo manda. Los que sí lo mandan reciben intros tibias y follow-ups de "nos encantaría tenerte en mente" meses después cuando el rol correcto se abra.

**Prompt:**

```
Escribe una respuesta cortés de 80-100 palabras a un rejection de trabajo. Reglas:

1. Agradéceles por el tiempo y la decisión. Sin amargura.
2. Reconoce el outcome sin rehashing la entrevista.
3. Deja la puerta abierta: pide mantenerse en contacto, menciona que estarías
   abierto al rol correcto en el futuro.
4. Opcional: pide una pieza de feedback. Sé directo ("si tienes
   cinco minutos para una pieza específica de feedback") — pedidos vagos
   ("cualquier feedback sería apreciado") reciben respuestas vagas.
```

**Ejemplo trabajado:**

```
Maya,

Gracias por avisarme, y por el tiempo del equipo en este loop.
Las conversaciones fueron genuinamente algunas de las mejores que he tenido
en esta búsqueda — aprecio la honestidad sobre dónde aterrizaron.

Si se abre un rol senior de backend en payments más tarde este año, me
gustaría estar en tu lista. Y si tienes cinco minutos para una pieza
específica de feedback sobre qué inclinó la balanza al otro lado, lo
encontraría útil.

Saludos,
Alex
```

El pedido de la pieza-específica-de-feedback se responde aproximadamente 40% del tiempo cuando se frasea así. El genérico "cualquier feedback" se responde 5%.

### Email 3 — Ghost recovery (cuando no has escuchado nada por 14 días)

Dos etapas. Día 7 es un ping ligero. Día 14 es un follow-up real.

**Día 7 (ping ligero):**

```
Maya,

Quería checar sobre el rol de senior backend que hablamos el
[fecha]. Con gusto comparto cualquier otra cosa que ayude.

— Alex
```

Eso es todo. Tres líneas. No agregues relleno.

**Día 14 (follow-up real):**

```
Asunto: Follow-up rápido — Senior Backend / Lumenari

Maya,

Dándole seguimiento a nuestra conversación sobre el rol de senior backend del
[fecha]. Sé que los loops bajan de velocidad por todo tipo de razones que no tienen
nada que ver con el candidato, así que sin presión de cualquier forma — solo
checando si el rol sigue abierto y dónde estoy parado.

Si el timing ha cambiado de tu lado, preferiría saberlo a no saberlo. Y si
la respuesta es no, eso también está bien; apreciaría el cierre para
planear mi búsqueda.

— Alex
```

Si no escuchas dentro de una semana del email del día 14, márcalo como perdido y sigue adelante. No mandes un tercer follow-up. La señal es lo suficientemente clara.

---

## Trackeando la búsqueda

Un tracker simple le gana a los elaborados. Cinco columnas:

| Empresa | Rol | Aplicado | Etapa | Último contacto |
|---------|-----|----------|-------|-----------------|
| Lumenari Co | Sr Backend Eng | 2026-05-01 | Onsite agendado | 2026-05-12 |
| Beta Co | Staff Eng | 2026-05-03 | Recruiter screen | 2026-05-08 |
| Gamma Co | Sr Backend Eng | 2026-04-25 | Ghosted (día 14 enviado) | 2026-05-09 |

Actualízalo después de cada interacción. Sin él, la semana seis de la búsqueda se vuelve una neblina.

---

## Lo que este playbook NO va a hacer

- Memorizar un script por ti. Practica las respuestas en voz alta. La IA puede dar forma a las palabras; tu boca tiene que saberlas.
- Decirte si tomar la oferta. Esa es una pregunta de valores. Haz una lista de lo que importa y pondéralo. La IA te puede ayudar a hacer la lista; no puede tomar la decisión.
- Cubrir negociación de compensación. Ese es un playbook separado y la herramienta equivocada aquí sería costosa. Por ahora: nunca aceptes en la llamada, toma 24-48 horas, contraataca con un pedido anclado a data de mercado.
