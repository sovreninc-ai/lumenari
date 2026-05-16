# Prompt de Tailoring de Résumé

> El prompt insignia. Pega tu résumé y la JD; obtén un draft tailored que preserva keywords del ATS y saca a la superficie lo que importa para *este* rol. Deja de mandar el mismo résumé a 40 empresas.

---

## El prompt

Pega esto en tu herramienta de IA, después llena los cuatro bloques de input de abajo.

```
Eres un résumé tailor. Te voy a dar (1) la job description a la que estoy
aplicando, (2) mi résumé actual o una sección de él, y (3) una o
dos cosas sobre la empresa que genuinamente me importan. Vas a producir
una versión tailored de las secciones relevantes del résumé.

Reglas que sigues:

1. Preserva cada detalle real que te dé — títulos, fechas, empleadores,
   herramientas, métricas. No inventes nada.
2. Empareja el vocabulario de la JD exactamente donde sea cierto. Si la JD dice
   "Postgres", usa "Postgres", no "PostgreSQL". Si la JD dice
   "Stripe, Plaid, Twilio", y he usado Stripe, escribe "Stripe".
3. Una idea por bullet. Dos cláusulas máximo. Voz activa. Pasado.
   Verbos fuertes (shippeé, recorté, fui dueño, diseñé, escalé, hice mentoring, lideré).
4. Números donde sea que los haya dado. Si un bullet sería delgado sin
   un número, márcalo con [FALTA MÉTRICA] en lugar de inventar uno.
5. Corta cada buzzword que no significa nada: rock star, ninja, guru, 10x,
   apasionado, fast-paced, results-driven, detail-oriented, self-
   starter, highly motivated.
6. Corta cada opener de "Responsable de". Reemplaza con un verbo que
   implique outcome.
7. El tercio superior de la página 1 debe responder: qué rol, qué seniority, dos
   wins específicos. Si mi draft no lo hace, saca los wins a la superficie más arriba.
8. Reordena bullets dentro de cada rol para poner el trabajo relevante a la JD primero.
9. Si un bullet es irrelevante para esta JD, márcalo [CONSIDERAR CORTAR].
10. Saca solo las secciones tailored. Sin comentarios a menos que lo pida.
```

---

## Forma de input

```
[Rol objetivo]
Título: <p. ej., Senior Backend Engineer, Platform>
Empresa: <nombre + una línea de qué hacen>
Señal de seniority de la JD: <p. ej., "5-8 años", "Staff-level", "primer hire">

[Por qué este]
<Dos frases. Concreto. Un producto que has usado, una persona que respetas,
un problema que has resuelto que mapea a este rol.>

[La JD]
<Pega la job description completa, o como mínimo las secciones de responsabilidades y
required-qualifications.>

[Mi résumé / sección a tailorear]
<Pega tu master résumé, o la sección/rol específica que quieres reescribir.>

[Restricciones]
- Largo de página: <1 página si <10 años, 2 páginas si más>
- Tono: <startup formal / agencia amigable / enterprise / etc.>
- Keywords de la JD que quiero preservar: <lístalos>
- Cosas que NO estoy dispuesto a afirmar: <métricas inventadas, herramientas con las que no he shippeado,
  fechas que no coinciden, etc.>
```

---

## Ejemplo trabajado

**Input:**

```
[Rol objetivo]
Título: Senior Backend Engineer, Payments
Empresa: Lumenari Co — marketplace de tooling de IA, procesa ~$2M/mes en transacciones
Señal de seniority: "5-7 años de experiencia en backend, mentor a 2-3 mids, dueño de
rotación de on-call para payments"

[Por qué este]
He pasado los últimos tres años siendo dueño de un stack de payments de Stripe-y-Postgres
en un marketplace haciendo volumen similar. La línea de mentorship mapea
a lo que he estado haciendo informalmente el último año y quiero hacerlo
oficial.

[La JD]
Senior Backend Engineer, Payments — Lumenari Co
Vas a ser dueño de nuestro subsistema de payments y webhooks, trabajando principalmente en
TypeScript y Postgres. Vas a hacer mentoring a 2-3 mid-level engineers y ser dueño
de la rotación de on-call para payments. Requerido: 5+ años backend, experiencia profunda
con Stripe, Postgres, arquitecturas event-driven, y
ownership de on-call en producción.

[Sección de mi résumé]
Senior Backend Engineer — Acme Co (2022-Presente)
- Construí servicios de backend para el equipo de plataforma
- Trabajé en mejoras de rendimiento
- Ayudé a onboarding de nuevos engineers
- Lideré migración a un nuevo proveedor de cloud
- Colaboré con producto en planificación de roadmap
- Escribí documentación interna para la API

[Restricciones]
- 1 página
- Tono: startup, directo
- Preservar de la JD: Stripe, Postgres, webhooks, on-call, mentor
- No voy a afirmar: no lideré la migración de cloud solo (fui 1 de 3)
```

**Output que la IA devuelve:**

```
Senior Backend Engineer — Acme Co (2022-Presente)
- Dueño del subsistema de payments (Stripe + Postgres + Kafka), procesando
  ~$4M/mes en transacciones de marketplace
- Reduje fallas de retry de webhooks de Stripe 78% agregando idempotency keys
  y una dead-letter queue
- Mentoring a 2 mid-level engineers; ambos promovidos a senior dentro de
  18 meses
- Co-lideré migración de Heroku a AWS (equipo de 3); ahorré $11k/mes
  con cero downtime de cara al cliente
- Dueño de la rotación de on-call de payments; reduje volumen de P1 pages de 12/mes
  a 3/mes endureciendo la lógica de retry
- [CONSIDERAR CORTAR] Escribí documentación interna para la API —
  no es load-bearing para esta JD; cortar si el espacio es justo

Escaneo del tercio superior: confirma Senior Backend Engineer, ~5 años de experiencia,
wins específicos alrededor de Stripe y on-call. Alineado con la JD.
```

Lo que la IA cambió:

- Cada verbo genérico fue reemplazado con un outcome específico de los wins reales del usuario.
- "Lideré migración" se volvió "Co-lideré" porque el usuario dijo no afirmar ownership solo.
- "Mentoring a 2 mid-level engineers" salió a la superficie más arriba porque la JD nombra mentoring.
- El bullet de internal-documentation fue marcado como cortable porque no vende para *este* rol.
- Las keywords de la JD (Stripe, Postgres, webhooks, on-call, mentor) todas presentes en prosa plana.

Esa es la jugada. Cinco bullets, cada uno ganándose su lugar.

---

## Cuando no tienes números

Si genuinamente no tienes métricas para un bullet, la IA lo va a marcar `[FALTA MÉTRICA]`. Tus opciones:

1. **Agrega una aproximada.** "Reduje fallas de retry en ~75%" está bien si recuerdas que estaba en algún lugar de ese rango. No seas más preciso que tu memoria.
2. **Reemplaza con un outcome cualitativo.** "Reduje fallas de retry lo suficiente como para que las pages de on-call bajaran de un dolor de cabeza semanal a uno mensual". Conversacional, sigue concreto.
3. **Corta el bullet.** Si un bullet no tiene outcome y no puedes manufacturar uno real, es relleno. Reemplaza con algo más fuerte o deja el espacio.

No dejes que la IA adivine. Un "mejoré el rendimiento en 47%" inventado se atrapa en las entrevistas. "¿Cómo lo mediste?" es una pregunta que no puedes responder para un número que inventaste.

---

## Check de escaneo del tercio superior

Después de que la IA produzca el draft tailored, corre esto:

> "Si un recruiter lee solo el tercio superior de la página 1, ¿ven (a) el rol al que estoy aplicando, (b) la seniority que están contratando, y (c) dos wins específicos?"

Si no, prompt:

```
El tercio superior de la página 1 no muestra <X>. Reordena contenido o reescribe
los primeros 2 bullets del rol más reciente para que un escaneo de 7 segundos responda
esas tres preguntas.
```

Este es el follow-up prompt más útil del kit. La mayoría de los recruiters nunca pasan del tercio superior en la primera lectura.

---

## Tip de volumen

Una vez que hayas corrido este prompt 5-10 veces contra JDs distintas, empezarás a reconocer los patrones en tu propio résumé que consistentemente se reordenan o salen a la superficie. Edita tu master résumé para reflejar esos patrones. El tailoring se vuelve más rápido cada vez.
