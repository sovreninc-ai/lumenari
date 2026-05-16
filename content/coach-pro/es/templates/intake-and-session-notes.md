# Intake Forms + Notas de Sesión

Tres formatos cubiertos: intake form, notas SOAP, notas DAP, notas narrativas. Elige el formato que empareje con tu credencial y caso de uso.

---

## Plantilla de intake form

Para onboarding de primera sesión. Úsalo como form digital (Google Forms / Typeform / Practice Better / Jane / SimplePractice) o pega en tu portal de cliente.

### El prompt

```
Estás redactando un intake form de cliente para un [tipo de practicante] en [jurisdicción]. Genera un intake form completo incluyendo:

1. Identificación del cliente (nombre, pronombres, método de contacto preferido, zona horaria)
2. Contacto de emergencia + instrucciones fuera de horario
3. Razón para buscar [coaching / training / terapia]
4. Historia relevante al nivel apropiado a mi scope of practice (sin historia médica a menos que esté licenciado para ello)
5. Goals — cómo se vería el éxito en 3 meses
6. Experiencia pasada con [coaching / training / terapia]
7. Logística (preferencia de frecuencia, modalidad, agendar)
8. Reconocimiento de tarifa + política de cancelación
9. Declaración de scope-of-practice — lo que hago y no hago
10. Informed consent — confidencialidad, límites a la confidencialidad, conciencia de mandatory reporting si aplica
11. Reconocimiento de línea de crisis

Saca como form numerado limpio. Cada pregunta debería ser respondible en 1-3 frases.

Detalles de mi práctica:
- Tipo de practicante: [life coach / personal trainer / terapeuta licenciado con credencial]
- Jurisdicción: [provincia/estado]
- Servicios ofrecidos: [lo que realmente hago]
- Tarifa: [tu tarifa]
- Política de cancelación: [tu política]
- Formato de sesión: [en persona / video / teléfono / mix]
```

### Estructura de output (ejemplo para un life coach)

```
# [Nombre de la Práctica] — Intake de Nuevo Cliente

Gracias por agendar tu primera sesión. Por favor completa este form al menos 24 horas antes de que nos veamos.

## 1. Sobre ti
- Nombre completo
- Nombre preferido (si es distinto)
- Pronombres
- Email
- Teléfono (usado solo para agendar a menos que me digas lo contrario)
- Zona horaria

## 2. Contacto de emergencia
- Nombre + relación contigo
- Teléfono

Nota: Mantengo horarios regulares de sesión (mar-vie, 9am-5pm MT). No estoy disponible para soporte de crisis fuera de esos horarios. Si estás en crisis, contacta a los servicios de emergencia locales o ve a tu departamento de emergencias más cercano.

## 3. ¿Qué te trae a coaching ahora mismo?
Algunas frases sobre lo que esperas trabajar. No hace falta escribir una memoria — entraremos juntos.

## 4. ¿Cómo se vería "bien" en 3 meses?
Cuanto más clara la imagen, más útil será nuestra primera sesión.

## 5. ¿Has trabajado con un coach o terapeuta antes?
- Sí / No
- Si sí — ¿qué funcionó o no funcionó para ti?

## 6. Logística
- Frecuencia preferida (semanal / quincenal / mensual)
- Modalidad preferida (video / teléfono / en persona)
- Cualquier restricción de agendar que deba saber

## 7. Tarifas y cancelación
Mi tarifa es [$X] por sesión. Política de cancelación: 24 horas de aviso requeridas; las sesiones perdidas o cancelaciones tardías se facturan a tarifa completa.

Al enviar este form, reconoces la tarifa y la política de cancelación.

## 8. Lo que hago y no hago
Soy un life coach, no un profesional licenciado de salud mental. El coaching está enfocado en goals del día a día, accountability y reconocimiento de patrones. No es un sustituto para terapia o atención médica.

Si en algún punto noto algo que está fuera de mi scope, te lo diré y podemos hablar de un referral. Esa es parte de cómo trabajo, no un problema.

## 9. Informed consent
Al enviar este form confirmas:
- Estás entrando a coaching voluntariamente
- Entiendes que el coaching no es terapia o atención médica
- Las sesiones son confidenciales, con estos límites: puedo romper confidencialidad si tengo razones para creer que tú u otra persona están en peligro inminente, o si estoy legalmente obligado a divulgar
- Eres responsable de tus propias decisiones y las acciones que tomes fuera de la sesión

## 10. ¿Cualquier otra cosa que deba saber antes de nuestra primera sesión?
Opcional. Algunas frases si algo viene a la mente.
```

Para terapeutas licenciados, los intake forms son más largos e incluyen historia clínica. Para personal trainers, cambia goals/historia por evaluación de fitness + screening de salud (PAR-Q+) + historia de lesiones.

---

## Plantilla de nota SOAP

Para clínicos licenciados y practicantes de allied-health.

### El prompt

```
Estás redactando una nota SOAP de contenido rough de sesión.

Tipo de practicante: [LCSW / RP / LPC / psicólogo / PT / OT / etc.]
Cliente: [iniciales o seudónimo]
Sesión #: [número]
Fecha: [fecha]
Modalidad: [en persona / video / teléfono]
Duración: [minutos]

Contenido rough (lo que salió en la sesión):
[pega tus notas rough — palabras del cliente, tus observaciones, temas]

Reglas:
- Largo 200-400 palabras total
- Subjective = experiencia reportada del cliente (cita con moderación)
- Objective = comportamiento observado por ti, afecto, presentación, ítems medibles
- Assessment = tu impresión clínica en lenguaje observacional; NO nombres un diagnóstico DSM-5 a menos que yo lo esté proveyendo explícitamente
- Plan = próximos pasos, trabajo entre sesiones, foco de próxima sesión
- Marca cualquier señal de crisis o eventos de scope-boundary explícitamente
- Termina con una línea de firma de clínico + credencial
```

### Estructura de output (ejemplo)

```
# Nota SOAP — Cliente J.K. — Sesión 4
**Fecha:** 2026-05-14 | **Modalidad:** Video | **Duración:** 50 min

**S (Subjective):**
Cliente reportó una "semana ruda" — describió dos conflictos de límites con su hermana, incluyendo uno que la dejó "sintiéndose como una niña otra vez". Reportó sueño de 5-6 horas por noche esta semana, bajando de 7-8 la semana pasada. Negó SI/HI al preguntarse directamente. Reportó algo de ansiedad incrementada a mitad de semana, resuelta para el viernes.

**O (Objective):**
La cliente se presentó orientada x3, afecto ligeramente contraído comparado con sesiones anteriores. Velocidad del habla dentro de límites normales. Se enganchó activamente en problem-solving la segunda mitad de la sesión. Sin agitación psicomotora. Hizo contacto visual apropiado vía video.

**A (Assessment):**
El trabajo de límites con family-of-origin sigue siendo el tema primario. La cliente demuestra capacidad mejorada para identificar el patrón en tiempo real, con algo de lag al implementar el límite. La ansiedad esta semana parece situacional y auto-limitante. Sin preocupaciones de seguridad en este momento.

**P (Plan):**
Continuar Sesión 5 la próxima semana, mismo horario. Entre sesiones, la cliente va a (1) practicar la frase escripteada de límite que trabajamos, (2) journal una situación donde notó el patrón antes de reaccionar. Foco de próxima sesión: profundizar el script de límite + introducir trabajo de clarificación de valores si es apropiado. Sin preocupaciones clínicas marcadas.

— [Nombre del Clínico], [Credencial]
```

---

## Plantilla de nota DAP

Para counselling, social work, y cualquier practicante cuyo workflow use DAP.

### El prompt

```
Estás redactando una nota DAP de contenido rough de sesión.

[Mismo header de input que SOAP]

Reglas:
- Largo 150-300 palabras
- Data = subjective + objective combinados (reportes del cliente + tus observaciones)
- Assessment = impresión clínica en lenguaje observacional
- Plan = próximos pasos + trabajo entre sesiones
- Marca cualquier señal de crisis o eventos de scope-boundary
```

### Estructura de output (ejemplo)

```
# Nota DAP — Cliente M.R. — Sesión 8
**Fecha:** 2026-05-14 | **Modalidad:** En persona | **Duración:** 45 min

**D (Data):**
El cliente describió una semana productiva. Reportó usar el ejercicio de grounding tres veces durante momentos de alta ansiedad en el trabajo y encontrarlo "realmente útil". Afecto más brillante que en sesiones anteriores, postura más abierta, enganchado en todo momento. Negó SI/HI en el check-in rutinario. Sacó un evento familiar próximo como un potencial estresor.

**A (Assessment):**
Progreso continuo en manejo de ansiedad. El cliente demuestra internalización de técnicas de grounding y las usa proactivamente. Ansiedad anticipatoria re: evento familiar notada; se integrará en la planeación de próxima sesión. Sin preocupaciones de seguridad.

**P (Plan):**
Sesión 9 la próxima semana. Entre sesiones, el cliente practicará grounding diariamente y journaleará un estresor anticipado para el evento familiar. Próxima sesión: prep estructurada para el evento, incluyendo lenguaje de boundary-setting.

— [Nombre del Clínico], [Credencial]
```

---

## Notas de sesión narrativas (para coaches y trainers)

Cuando los formatos clínicos no encajan con tu práctica.

### El prompt

```
Estás redactando notas narrativas de sesión de contenido rough.

Tipo de practicante: [life coach / personal trainer / coach de nutrición / etc.]
Cliente: [iniciales o seudónimo]
Sesión #: [número]
Fecha: [fecha]
Modalidad: [en persona / video / teléfono]
Duración: [minutos]

Contenido rough:
[pega notas rough]

Reglas:
- Largo 150-300 palabras
- NO formato clínico (sin "Assessment" — usa "Observaciones" o "Lo que noté")
- Mantente dentro del scope de coaching — describe el trabajo, no impresiones clínicas
- Identifica cualquier compromiso que el cliente haya hecho para entre sesiones
- Marca cualquier momento donde debería considerar referir afuera (cualquier cosa que haga pattern-match con salud mental, médico u otro territorio de scope licenciado)
```

### Estructura de output (ejemplo — life coach)

```
# Notas de Sesión — Cliente A.L. — Sesión 6
**Fecha:** 2026-05-14 | **Modalidad:** Video | **Duración:** 50 min

**En qué trabajamos:**
A.L. abrió con la conversación que había estado evitando con su socia de negocio — la tuvo el martes. La describió como "menos terrible de lo esperado, pero aún necesito seguir con la pieza de dinero". Pasamos la primera mitad desempacando qué funcionó (claridad en su apertura, mantenerse en el tema) y qué no (cedió cuando la socia empujó atrás en el timeline).

**Lo que noté:**
A.L. está nombrando sus patrones más rápido que hace tres sesiones. Atrapó la cesión a mitad de la historia sin que se lo señalara. Aún tiende a suavizar la petición cuando hay pushback; vamos a seguir trabajando en esto.

**Compromiso entre sesiones:**
Va a mandar el email de follow-up sobre la pieza de dinero para el viernes. Lo va a redactar sola, sin edits míos.

**Foco de próxima sesión:**
Revisar el email + la respuesta de la socia si llegó. Continuar trabajo en sostener la petición bajo pushback.

**Notas de referral:**
Ninguna. Nada marcado como fuera de scope de coaching esta sesión.

— [Nombre del Coach]

*El coaching no sustituye atención médica o de salud mental. Si estás en crisis, contacta a los servicios de emergencia locales.*
```

---

## Cuando eliges mal el formato

- **SOAP para un coach** — demasiado clínico; vas a terminar escribiendo assessments que no puedes defender
- **Narrativa para un clínico licenciado facturando seguro** — no va a cumplir los requisitos de documentación
- **DAP para un personal trainer** — overkill; usa narrativa
- **Cualquier cosa formateada sin un disclaimer** — re-promptea; el kit debería producir uno por default
