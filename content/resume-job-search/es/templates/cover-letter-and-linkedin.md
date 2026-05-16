# Cover Letter + Reescritura de LinkedIn

> Dos artefactos que comparten una voz. Las cover letters se leen aproximadamente 30% del tiempo — escríbelas de todos modos, y hazlas cortas. LinkedIn se lee con más frecuencia que la cover letter e importa más de lo que la gente cree.

---

## Parte 1 — La cover letter

### El prompt

```
Estás escribiendo una cover letter para el usuario. Reglas:

1. Tres párrafos. ~200 palabras en total. Máximo 220.
2. Párrafo 1 (~50 palabras): abre con una razón específica por la que el usuario está
   escribiendo a ESTA empresa. Haz referencia a un producto, una persona, un
   lanzamiento reciente, o un problema sobre el que el usuario realmente ha pensado. NUNCA
   abras con "Escribo para aplicar a la posición de".
3. Párrafo 2 (~100 palabras): una historia concreta que mapea la experiencia
   del usuario a la JD. Outcome específico. No un recap del résumé.
4. Párrafo 3 (~50 palabras): cierra con un próximo paso claro. Confianza
   sin arrogancia. Sin "Me encantaría la oportunidad de discutir".
5. Voz: suena a que el usuario la escribió. Ligeramente informal para
   startups, ligeramente formal para finanzas o enterprise. Nunca un
   press release. Nunca un humblebrag.
6. Sin buzzwords (apasionado, results-driven, fast-paced, dynamic).
7. Sin framing de "transferable skills". Solo muestra el trabajo.

Saca la cover letter solamente. Sin comentarios.
```

### Forma de input

```
[Rol objetivo]
Título, empresa, una línea de qué hacen.

[Hook específico]
La única cosa de esta empresa con la que liderarías. Elige exactamente una.
Ejemplos:
- "He estado usando su producto por 18 meses y es la única
  herramienta en esta categoría que shipea a un cadence real."
- "Trabajé en un problema similar de payments en <empresa previa> y quiero
  pasar los próximos 4 años profundizando en él."
- "He seguido los escritos de <nombre del hiring manager> por años y el
  post reciente del equipo sobre arquitectura event-driven aclaró
  algunas cosas en las que estaba equivocado."

[La historia mapeada]
Un proyecto, dos-a-tres frases de contexto, el outcome.

[Energía de despedida]
Confiado, disponible, sin presión.
```

### Ejemplo trabajado

**Input:**

```
[Rol objetivo]
Senior Backend Engineer, Payments — Lumenari Co (marketplace de tooling de IA,
~$2M/mes transacciones)

[Hook específico]
"Construí un stack de payments de Stripe Connect + Postgres en un marketplace
haciendo volumen similar los últimos tres años, y su post de blog
de engineering reciente sobre retries idempotentes de webhooks es exactamente la
dirección arquitectónica hacia la que he estado empujando a mi equipo."

[La historia mapeada]
En Acme, dueño del subsistema de payments procesando ~$4M/mes. Reduje fallas de
retry de webhooks 78% agregando idempotency keys + dead-letter queue.
Mentoring a dos mid-level engineers, ambos promovidos a senior en 18 meses.

[Energía de despedida]
Disponible para hablar esta semana o la próxima; con gusto comparto más detalle de
el trabajo de retry-failure si es útil.
```

**Output que la IA devuelve:**

```
Maya,

Tu post de engineering sobre retries idempotentes de webhooks es exactamente la
dirección arquitectónica hacia la que he estado empujando a mi equipo el
último año — escribo porque creo que puedo ayudarte a shippear la próxima capa
de eso.

Los últimos tres años he sido dueño de un stack de payments de Stripe + Postgres
en Acme Co, un marketplace haciendo aproximadamente $4M/mes en transacciones. El
trabajo del que estoy más orgulloso: reduje las fallas de retry de webhooks 78% en seis
meses introduciendo idempotency keys y una dead-letter queue, después
endurecí la rotación de on-call lo suficiente como para que el volumen de P1 pages bajara de
doce al mes a tres. En el camino hice mentoring a dos mid-level
engineers; ambos ahora son seniors. La pieza de mentorship es parte de por qué
estoy buscando — me gustaría que el próximo rol lo haga oficial.

Estoy disponible para hablar esta semana o la próxima. Con gusto comparto la arquitectura
de retry-failure en más detalle si fuera útil antes de una
conversación.

— Alex
```

Lo que esta carta hace bien:

- Abre con una referencia específica al contenido de engineering de la empresa. El hiring manager sabe que realmente lo leíste.
- El párrafo del cuerpo nombra herramientas, números y outcomes — no un recap del résumé.
- Menciona mentorship en la voz del usuario ("la pieza de mentorship es parte de por qué estoy buscando") porque la JD explícitamente la pidió.
- Cierra con disponibilidad y una oferta suave (la arquitectura de retry-failure). Sin "Me encantaría la oportunidad".

---

## Parte 2 — Reescritura de LinkedIn

Tres secciones importan, en orden: headline, sección About y la parte superior de Experience.

### Headline (máximo 120 caracteres)

Lo que los recruiters ven en los resultados de búsqueda.

**Malo:**

```
Senior Software Engineer | Passionate Builder | AWS / TypeScript / React
```

**Mejor:**

```
Senior Backend Engineer — payments, Stripe, Postgres | Mentor | Calgary / Remoto
```

Reglas que el prompt impone:

1. Lidera con el rol que estás targeteando, no tu título actual si difieren.
2. Tres keywords específicas después — herramientas que genuinamente usas, no una ensalada de tech-stack.
3. Tercer segmento opcional: ubicación o disponibilidad ("Abierto a remoto NA").
4. Sin buzzwords. Sin "Passionate Builder", "Code Slinger" o "Tech Enthusiast".

### Sección About — las primeras tres líneas son todo

Solo los primeros ~210 caracteres se muestran antes de que "...ver más" corte. Optimiza por esos.

**Prompt:**

```
Escribe la sección About de LinkedIn del usuario. Reglas:

1. Primera frase (~140 caracteres máximo): position statement. Lo que hacen,
   para quién, y un outcome. Esta es la única línea que muchos recruiters leen.
2. Las siguientes dos frases entran dentro de los primeros ~210 caracteres en total. Engancha al
   lector a clickear "ver más".
3. Largo total: 4-6 párrafos cortos, ~150 palabras.
4. Primera persona, conversacional. Suena a que el usuario lo escribió, no a una
   persona de PR.
5. Termina con un call to action específico: "DM si están contratando para
   X", o "Escribo sobre Y en <link>", o "Abierto a roles senior de
   backend en el espacio de payments".
```

**Ejemplo trabajado:**

```
Construyo infraestructura de payments para marketplaces. Los últimos tres
años he sido dueño de un stack de Stripe + Postgres procesando $4M/mes en
Acme Co — webhooks, on-call, mentorship, todo.

Antes de Acme estuve en una fintech startup donde aprendí la lección
que cada payments engineer aprende a las malas: la idempotencia no es
opcional, las dead-letter queues no son opcionales, y el runbook se
lee a las 2 a.m. por alguien que no lo escribió.

Me importan tres cosas en un rol:
- Problemas difíciles con usuarios reales
- Un equipo donde la mentorship corta en ambas direcciones
- La autonomía de shippear sin teatro

Actualmente en Calgary, abierto a roles remotos en Norteamérica. DM si
estás contratando un senior backend engineer en payments — soy
particular sobre adónde iría, y preferiría tener una buena
conversación que diez educadas.
```

Lo que muestran los primeros 210 caracteres (~3 líneas):

```
Construyo infraestructura de payments para marketplaces. Los últimos tres
años he sido dueño de un stack de Stripe + Postgres procesando $4M/mes en
Acme Co — webhooks, on-call, mentorship, todo.
```

Ese es el hook. El recruiter ve rol, herramienta, outcome en el primer párrafo y sabe si seguir leyendo.

### Sección Experience — parte superior de los roles actual y más reciente

LinkedIn trunca después de 2-3 líneas por rol a menos que alguien haga click en expandir. Así que las primeras dos líneas de cada rol son el equivalente al tercio superior de tu résumé.

**Prompt:**

```
Reescribe los primeros 2-3 bullets del rol actual del usuario en LinkedIn.
Reglas:

1. Primer bullet: un resumen de una línea de scope e impacto en este rol.
2. Segundo bullet: el logro único más relevante para los
   roles que el usuario está targeteando.
3. Tercer bullet (opcional): un segundo logro que muestre rango.
4. Mismas reglas de estilo que el résumé: voz activa, números específicos, sin
   buzzwords, vocabulario alineado a la JD.
5. Saca el texto formateado para LinkedIn solamente.
```

Ejemplo de output trabajado:

```
Senior Backend Engineer en Acme Co
2022 - Presente · Calgary, AB (Remoto)

→ Dueño del subsistema de payments y webhooks (Stripe + Postgres + Kafka)
  para un marketplace haciendo ~$4M/mes en transacciones.
→ Reduje fallas de retry de webhooks 78% introduciendo idempotency keys
  y una dead-letter queue; las P1 pages bajaron 75% en seis meses.
→ Mentoring a 2 mid-level engineers; ambos promovidos a senior en 18 meses.
```

---

## Cómo los dos artefactos trabajan juntos

La cover letter y la sección About de LinkedIn no deberían ser idénticas, pero deberían compartir una voz y una posición. Si tu cover letter dice que "eres dueño de un stack de Stripe en un marketplace haciendo $4M/mes", tu About de LinkedIn debería decir lo mismo — frasceado distinto. Los recruiters que lean ambos van a notar si sonas a dos personas distintas.

Corre el prompt de cover-letter y el prompt de LinkedIn-About back-to-back en el mismo chat. La IA va a mantener la voz consistente.

---

## Anti-patrones que el prompt bloquea

- "Escribo para aplicar a la posición de [rol]". — Cortar a primera vista.
- "Estoy emocionado por la oportunidad de..." — Cortar.
- "Por favor encuentra adjunto mi résumé". — Lo saben. Cortar.
- "Me encantaría la oportunidad de discutir cómo mis skills..." — Cortar.
- "Tech Enthusiast | Lifelong Learner | Coffee Addict" en el headline de LinkedIn — Cortar.
- "Results-driven, detail-oriented self-starter apasionado por..." — Cortar todo.

Si alguno se cuela, prompt: "Quita cada cliché de este draft y reescribe en lenguaje plano".
