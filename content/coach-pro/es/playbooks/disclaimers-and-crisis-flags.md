# Disclaimers + Crisis Flags

La biblioteca completa. Texto de disclaimer por tipo de practicante, el rule set de crisis-flag, scaffolding de conciencia de mandatory-reporting, y el boilerplate que cada práctica debería tener en sus políticas.

---

## Biblioteca de disclaimer

### Coaching / personal training — comunicaciones de cara al cliente

```
El coaching / personal training no sustituye atención médica, de salud mental o psiquiátrica. Si experimentas una crisis de salud mental, contacta a un profesional licenciado o a los servicios de emergencia locales.
```

Usar en: emails de bienvenida, recordatorios de sesión, páginas de marketing, intake forms, mensajes entre sesiones.

### Terapia licenciada — comunicaciones de cara al cliente

```
Esta comunicación es parte de tu relación terapéutica con [Nombre del Practicante, credencial, # de licencia]. No constituye servicios de emergencia de salud mental. Si estás en crisis, contacta a los servicios de emergencia locales o ve a tu departamento de emergencias más cercano.
```

Usar en: mensajes rutinarios al cliente, emails de recap, inserts de plataforma de telehealth, notas entre sesiones compartidas con el cliente.

### Copy de marketing / website — todos los tipos de practicante

```
[Tipo de servicio] está regulado en [jurisdicción]. Estoy licenciado bajo [board / college / regulador] (licencia #[X]).

Este website no constituye una relación clínica. Los outcomes varían y no garantizo resultados específicos. Si estás en crisis, contacta a los servicios de emergencia locales.
```

Usar en: cada página pública del website de la práctica.

### Intake form — todos los tipos de practicante

```
Al enviar este form, reconoces:

- Estás entrando a [coaching / training / terapia] voluntariamente
- Entiendes el scope de servicios descrito arriba
- Las sesiones son confidenciales, con estos límites: [el practicante puede romper confidencialidad si tiene razones para creer que tú u otra persona están en peligro inminente; si está legalmente obligado a divulgar; si aplican obligaciones de mandatory reporting]
- Eres responsable de decisiones y acciones que tomes fuera de la sesión
- Has sido informado de cómo alcanzar soporte de emergencia fuera de las horas del [practicante]
```

Adapta los límites de confidencialidad a tu jurisdicción y credencial.

---

## Flags de crisis-protocol

### La lista de triggers

La IA vigila estas señales en cualquier contenido de cliente pegado por el usuario (respuestas de intake, notas de prep de sesión, extractos de mensajes, drafts de recap):

**Ideación suicida:**
- Pasiva: "ojalá no estuviera aquí", "no me molestaría no despertar", "cansado de estar vivo"
- Activa: "pensé cómo lo haría", "tengo un plan", "tengo acceso a [medios]", declaración explícita de intención

**Autolesión:**
- Comportamiento actual descrito como reciente o en curso
- Planes o medios especificados
- Escalación de patrones previos

**Daño a otros:**
- Intención explícita hacia una persona específica
- Planes, medios o timeline
- Amenazas reportadas por el cliente (sea que hicieran las amenazas o las recibieron)

**Indicadores de psicosis aguda:**
- Alucinaciones descritas como reales y actuadas sobre
- Desorganización severa en el contenido
- Creencias declaradas de ser controlado, monitoreado o dañado por fuerzas externas de una forma que está afectando la seguridad

**Divulgación de abuso activo:**
- Abuso infantil (sospechado o presenciado) — el mandatory reporting aplica en la mayoría de las jurisdicciones
- Abuso de adulto mayor — el mandatory reporting aplica en muchas jurisdicciones
- Violencia de pareja íntima — actual y aguda

**Sobredosis de sustancia o peligro médico agudo:**
- Descrito como presente o reciente
- Combinado con otros factores de riesgo

### La plantilla de respuesta

Cuando la IA detecte cualquier trigger, saca:

```
CRISIS FLAG — [tipo de señal]

Este contenido contiene [señal específica — p. ej., "ideación suicida pasiva con mención de acceso a medios"]. No estoy continuando output rutinario sobre esto.

Acciones recomendadas:
1. Trata esto como prioridad clínica. Si aún no lo has hecho, planea contacto humano directo con el cliente — teléfono, video o en persona — tan pronto como sea factible.
2. Revisa tus obligaciones de mandatory reporting en [jurisdicción si se conoce]. No puedo decirte si el umbral se cumple; esa es tu decisión con tu regulador y supervisor.
3. Documenta la divulgación y tu respuesta según tu protocolo estándar de incidentes.

Mensaje corto sugerido que podrías adaptar para el cliente (revisa antes de enviar):

> Hey [nombre],
>
> Leyendo lo que escribiste, quiero hacer check-in contigo directamente. ¿Podemos tener una llamada rápida hoy o mañana? Si estás en crisis inmediata ahora mismo, por favor llama o manda texto a los servicios de emergencia locales o ve a tu departamento de emergencias más cercano.
>
> Quiero asegurarme de que tienes soporte. — [Practicante]

Si ya tomaste acción clínica y quieres que redacte una nota de incidente clínico documentando lo que pasó y lo que hiciste, pídelo explícitamente.
```

La IA no continúa produciendo notas de sesión normales o copy de coaching sobre contenido de crisis. El flag detiene el workflow.

### Lo que el flag NO hace

- Diagnosticar
- Decirle al practicante si romper confidencialidad
- Determinar si el umbral de mandatory reporting se cumple
- Reemplazar el juicio clínico
- Reemplazar una llamada al cliente

Es una señal de alto. El practicante hace el trabajo clínico.

---

## Conciencia de mandatory reporting

La IA es consciente de que el mandatory reporting existe. No conoce:
- El statute específico en cada jurisdicción
- El umbral para cada tipo de divulgación
- El timeline de reporte (24 horas, 48 horas, inmediatamente)
- La agencia nombrada o hotline en la región del practicante

Cuando se toca territorio de mandatory-reporting, la IA pide al practicante que revise sus reglas específicas a la jurisdicción. Ejemplos de triggers:

- Abuso o negligencia infantil divulgado por el cliente (sea el cliente un niño, un padre o un bystander)
- Abuso de adulto mayor divulgado
- Un cliente que es a su vez un mandated reporter divulgando un incidente de lugar de trabajo involucrando abuso de un menor
- Daño inminente a un tercero identificable (el umbral Tarasoff en jurisdicciones de EE. UU.; reglas análogas en otros lados)

La línea de la IA:

> "Esto puede disparar mandatory reporting en tu jurisdicción. Revisa el statute específico y timeline de [jurisdicción] con tu regulador, supervisor o grupo de consulta antes de decidir. No puedo tomar esta decisión por ti".

---

## "No vamos a ser un fit si..." — el boilerplate de política que cada práctica debería tener

Pon esto en la página de servicio de tu website, en tu email de respuesta de intake y en tus puntos de conversación de consulta inicial.

### Para coaches y trainers

```
No soy el fit correcto si:

- Estás en crisis activa de salud mental y necesitas soporte de mayor intensidad. El coaching / training no es cuidado de crisis.
- Buscas diagnóstico, medicación o tratamiento de una condición de salud mental. Puedo ayudar con un referral a un terapeuta licenciado o médico.
- Estás esperando outcomes garantizados en un timeline específico. El coaching / training es trabajo colaborativo; los resultados varían basados en lo que traigas a ello.
- Buscas un sustituto para cuidado médico. Si tienes una condición de salud, necesitas un médico en tu equipo — yo no soy eso.

Si cualquiera de lo de arriba aplica, usualmente te puedo apuntar a alguien mejor adecuado.
```

### Para terapeutas licenciados

```
No soy el fit correcto si:

- Necesitas un nivel más alto de cuidado (DBT-IOP, hospitalización parcial, internamiento). Puedo ayudar con un referral.
- Buscas manejo de medicación — no soy prescriptor; si eso es parte de lo que necesitas, coordinaríamos con un psiquiatra.
- Buscas un protocolo específico basado en evidencia en el que no estoy entrenado. Si te han dicho que necesitas EMDR / CPT / modalidad específica y esa no es mi especialidad, puedo referir.
- No estás en una situación lo suficientemente estable para hacer trabajo regular semanal (vivienda, seguridad inmediata). Estabilicemos primero.
```

---

## Boilerplate de fuera-de-horario y línea de crisis

Cada email de bienvenida, intake form y página de servicio debería responder la pregunta: "¿qué hago si estoy en crisis y no es hora de sesión?".

### El bloque estándar

```
Soporte fuera de horario y de crisis

No estoy disponible para soporte de crisis fuera de las horas regulares de sesión. Si estás en crisis:

- La línea de crisis o servicios de emergencia locales en tu país
- Tu departamento de emergencias más cercano
- El número de emergencia local si estás en peligro inmediato

Para preguntas no urgentes entre sesiones, mándame email y responderé dentro de [tu ventana estándar de respuesta — p. ej., "1 día hábil"].
```

Adapta las líneas específicas a tu jurisdicción. Las líneas de crisis varían por país; dirige a los usuarios a la línea local de emergencia.

---

## Boilerplate de política de no-show / cancelación

Pon esto en tu intake form y tu reconocimiento de tarifa.

```
Política de cancelación

Requiero 24 horas de aviso para cancelaciones o reagendamientos. Las sesiones perdidas o cancelaciones dentro de 24 horas se facturan a tarifa de sesión completa, excepto en casos de emergencia médica u otras circunstancias atenuantes a mi discreción.

Si no te presentas, te contactaré una vez para hacer check-in. Si no escucho de vuelta dentro de una semana, consideraré nuestro trabajo en pausa y pondré el slot de sesión de vuelta en rotación. Eres bienvenido a contactar de vuelta cuando estés listo para retomar.
```

---

## La línea de fondo

Los disclaimers existen porque:
1. Protegen al cliente clarificando lo que está recibiendo
2. Protegen al practicante de claims de sobrepaso
3. Hacen el scope explícito para que los referrals sean más fáciles cuando se necesitan
4. Construyen confianza — los lectores son más probables de engancharse cuando los límites son visibles

La IA por default incluye los correctos. El practicante es bienvenido a editar. La IA no los borra sin una instrucción explícita y una razón declarada.
