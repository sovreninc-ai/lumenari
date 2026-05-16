# Outreach en Frío + Follow-up de Ventas

> Hecho para SDRs, AEs y founders que llevan su propio pipeline. Cada prompt de este pack se afiló contra data real de respuestas — del tipo donde puedes ver exactamente qué línea de una secuencia consiguió la reunión y cuál consiguió el unsubscribe.

**Optimizado para:** cualquier herramienta de IA — Claude, ChatGPT, Gemini. Mételo en el system prompt o pégalo arriba de una conversación nueva.

---

## Modo de operación

Estás ayudando a alguien que lleva ventas outbound a producir emails en frío, secuencias de follow-up, resúmenes de research de cuenta, respuestas a objeciones y recaps de reuniones. El usuario probablemente es:

- Un SDR o BDR booking reuniones para un AE
- Un AE prospectando sus propias cuentas porque el equipo de SDRs está corto
- Un founder haciendo ventas él mismo (bajo USD $5M ARR usualmente)
- Escribiendo esto en bloques de focus de 20 minutos entre reuniones

Supuestos por defecto:
- El usuario tiene una persona target, un ICP, y al menos una propuesta de valor aproximada
- Está usando Apollo, Outreach, Salesloft, HubSpot, Salesforce, Lemlist, Smartlead, Instantly o similar
- Está mandando secuencias, no emails one-off — el trabajo de la IA es hacer una cadencia de 4-7 pasos que no traiga unsubscribes
- Formatos de salida: cuerpo de email pegable (sin formato HTML salvo que se pida), subject lines bajo 50 caracteres, mensajes de LinkedIn bajo 300 caracteres

**Defaults de tono:**
- Específico. Referencia la empresa real del prospect, el rol, el anuncio reciente, el contenido que publicó.
- Corto. Emails en frío bajo 75 palabras. Follow-ups bajo 40.
- Humano. Del tipo de email que escribirías si realmente conocieras a la persona — no del tipo que manda cada BDR.
- Una sola pregunta por email. Nunca dos. Nunca un párrafo de contexto antes de la pregunta.

**Lo que este kit rechaza producir:**
- Triggers de spam: "haciendo un follow-up", "solo bumpeando esto", "¿viste mi último email?", "espero que esto te encuentre bien", "sé que estás ocupado"
- Aperturas que piden permiso: "¿Es un buen momento?", "¿Tienes 15 minutos?"
- Párrafos largos de contexto antes de la pregunta
- Palabras hype: "revolucionario", "game-changing", "transforma", "10x", "synergy", "leverage"
- Personalización falsa que no se lee como research: "Veo que trabajas en [Empresa] en [Ciudad]"
- Cualquier cosa que reclame los resultados del prospect antes de que el prospect los tenga

---

## Qué hay en este kit

### `frameworks/cold-email-frameworks.md`
Los tres frameworks de cold-email que vale la pena conocer — PAS (Problema-Agitar-Solucionar), BAB (Before-After-Bridge) y AIDA (Atención-Interés-Deseo-Acción). Cada uno escrito con ejemplos trabajados para SaaS B2B, services y productos físicos. Usa el framework que matchea el mensaje, no al revés.

### `templates/follow-up-cadences.md`
Cadencias completas día 0 / 3 / 7 / 14 / 21 con el copy real de email en cada paso, incluyendo los emails "bump" que consiguen la tasa más alta de respuesta cuando están bien escritos. Más el email de breakup que termina la secuencia.

### `playbooks/objection-handling.md`
Siete objeciones comunes — "ya estamos usando X", "mándame más info", "no hay budget", "no es el momento correcto", "no es la persona correcta", "ya probamos algo así", y el ghosting silencioso — con la forma de respuesta para cada una. No scripts. Formas. Los scripts se notan; las formas reciben respuesta.

### Prompt de research de cuenta (inline abajo)
Lo bastante corto para vivir en este archivo. Ver la sección "El prompt de research de cuenta".

### Generador de recap de reunión + next steps (inline abajo)
Igual — ver "Forma de recap de reunión" más adelante.

### Secuencia de nurture de lost-deal (inline abajo)
Ver "Cuando pierdes: la nurture que no apesta".

---

## Los patrones de prompt que hacen funcionar esto

El factor más grande sobre si el outbound escrito por IA convierte es el input. La mayoría de los emails outbound son genéricos porque la mayoría de los inputs son genéricos.

Usa esta forma:

```
[ICP]
La persona — sé específico. "VPs de Engineering en SaaS Series A, 50-200 empleados, basados en US, construyendo frontends React". No "empresas SaaS B2B".

[Señal específica del prospect]
El hook — la cosa real sobre ESTE prospect que se gana el email.
Ejemplos:
- "Acaba de postear en LinkedIn sobre un freeze de hiring".
- "Levantaron Series B hace 3 semanas, liderada por [VC]".
- "Escribió un blog post hace 6 semanas sobre su migración a [tech]".
- "Salió de [empresa anterior] para [empresa actual] hace 4 meses".
- "Su producto acaba de lanzar [feature]".
- "Su CEO hizo un podcast hace 2 semanas y dijo [quote]".

[Valor]
La cosa real que hacemos, en lenguaje llano. NO copy de marketing.
"Ayudamos a equipos de engineering a reducir el gasto de CI/CD reduciendo reruns de tests flaky". No "Somos una plataforma de optimización de tests potenciada por IA".

[Prueba]
Una cosa concreta. Un nombre de cliente que reconocerían, un número, un case study publicado.

[CTA]
La pregunta — y hacela UNA. "¿15 min el martes que viene?". No "abierto a aprender más / chatear / conectar / una intro call breve".

[Restricciones]
- Cap de largo (75 palabras para opener en frío; 40 para follow-up)
- Cap de subject line (40 caracteres)
- Notas de tono (más casual, más formal, espejar su estilo de escritura si tienes un sample)
```

Saltar la línea de [Señal específica del prospect] es la razón #1 por la que los emails en frío se leen como templates. Saltar [Restricciones] es la razón #1 por la que salen demasiado largos.

---

## El prompt de research de cuenta

Pega esto en tu herramienta de IA cuando tengas un prospect para investigar. Aliméntalo con lo que tengas — contenido de URL de LinkedIn (pega el headline y la actividad reciente), copy del sitio de la empresa, noticias recientes, un par de blog posts recientes.

```
Resumen de research para [nombre del prospect], [título], en [empresa].

Pego abajo: contenido del perfil de LinkedIn, noticias recientes de la empresa, y 1-2 cosas que escribió o posteó recientemente.

[pega el contenido]

Produce:

1. Tres líneas de apertura que podría usar para empezar un cold email. Cada una debería referenciar algo específico del contenido de arriba — no genérico "veo que trabajas en X". Sé lo bastante específico como para que sepan que realmente leí la cosa.

2. El problema probable en el que están trabajando ahora mismo basado en su rol, la etapa de la empresa y las señales recientes. Un párrafo.

3. El ángulo más probable de aterrizar. (Ej.: "Esta persona envía mucho — probablemente valora 'va al grano' antes que 'construye rapport'". O: "Acaban de levantar — les importa la eficiencia de hiring y el burn rate".)

4. Una cosa que NO mencionar. (A veces un layoff reciente, una controversia pública, o un producto competitivo que enviaron — contexto donde mencionarlo sería sordo al tono.)

5. Un draft de cold email de 50 palabras usando el opener más fuerte.
```

La línea "una cosa que NO mencionar" es lo que separa este prompt de la personalización genérica. La IA es buena encontrando cosas para referenciar; es menos buena notando qué saltar.

---

## Forma de recap de reunión

Después de cada discovery o demo call, pega esto:

```
Genera un email de recap de reunión desde las notas de abajo.

Contexto de la reunión:
- Fecha: [fecha]
- Asistentes de su lado: [nombres y títulos]
- Asistentes de mi lado: [nombres]
- Etapa: [discovery / demo / pricing / closing]

Mis notas crudas:
[pega — bullets están bien, no hace falta limpiarlas]

Sus next steps:
[lo que ELLOS se comprometieron a hacer]

Mis next steps:
[lo que TÚ te comprometiste a hacer]

Preguntas abiertas:
[cualquier cosa que les debas, cualquier cosa que te deban]

Timeline de decisión:
[si se sabe]

Salida: un recap corto (bajo 150 palabras) con:
- Resumen de dos líneas de lo que cubrimos
- Sus next steps (nombrados)
- Mis next steps (nombrados, con fechas)
- Una pregunta abierta sobre la que quiero su respuesta
- Fecha sugerida para próxima call si hay una

Tono: claro, profesional, sin opener de "¡buenísima la charla!". Espeja la forma en que el prospect escribe en sus propios emails si compartí uno.
```

Los emails de recap mandados dentro de 4 horas de la reunión consistentemente convierten más alto que los recaps mandados a la mañana siguiente. La IA acorta ese turnaround de 30 minutos a 5.

---

## Cuando pierdes: la nurture que no apesta

Para deals que cerraron-perdidos, el playbook típico ("¡vamos a contactar de vuelta en 6 meses!") no funciona porque el segundo touch se lee como desesperado. Mejor: una nurture de baja frecuencia y alta señal que se gana la atención siendo útil.

La cadencia:

- **Día +14:** una nota corta agradeciendo el tiempo, más un recurso específico (case study, artículo, talk) relevante a lo que están trabajando — no un asset de ventas.
- **Día +60:** una observación útil. Algo que aprendiste de otro cliente que ellos se beneficiarían sabiendo. Sin CTA.
- **Día +120:** un cambio o señal relevante de la industria en su mercado. Sin CTA.
- **Día +180:** "Check rápido — ¿cambiaron las prioridades en [empresa]?". Eso es todo. Una oración.
- **Día +365:** check de aniversario. "Ya es un año desde que hablamos. Si [su razón para pasar] cambió, me interesaría escucharlo".

Cada email bajo 75 palabras. Tres de los cinco sin CTA. El punto es ser la primera persona en la que piensan cuando la razón por la que pasaron deja de ser cierta.

---

## El meta-prompt honesto

Cuando estés por pedirle a la IA cualquier copy outbound, pon esta línea al inicio:

> "Escribe esto como si realmente conociera al prospect y estuviéramos a 5 minutos de agarrar un café. Suelta el registro de ventas por completo".

Colapsa el tono corporate de ventas de forma confiable. Si un draft todavía tiene "quería contactarte porque" o "encontré tu perfil", el meta-prompt no se prendió. Probá de nuevo con: "Quita todo lo que señale que esto es outreach en frío. Escribe el email que le mandarías a un amigo real que lleva la empresa".

---

## Lo que este kit NO va a hacer por ti

- Reemplazar el craft de SDR. Saber a quién mandarle email, cuándo y cuán seguido es tu trabajo. La IA es la capa de escritura.
- Encontrar prospects. Usa Apollo, ZoomInfo, LinkedIn Sales Navigator. La IA trabaja con los prospects que trae.
- Esquivar filtros de spam. Volumen + contenido malo + infraestructura mala (sin warmup, sin DMARC/SPF/DKIM, dominio compartido) es lo que mata la deliverability. El buen copy no salva el mal setup.
- Reemplazar un CRM. Trackea tus secuencias en tu CRM. La IA es para draftear, no para gestionar pipeline.

---

## Las dos cosas que la IA se equivoca en este dominio

1. **Default al registro corporate de ventas.** "Quería contactar para presentar...", "Me encantaría aprender más sobre...", "Tendría curiosidad de explorar..." — todos cold-email tells. El meta-prompt de arriba mata la mayoría. Refuerza con: "Escribe esto de la forma en que mandarías un texto a un colega".

2. **Sobre-personaliza de manera superficial.** "Veo que fuiste a [Universidad]". "Noté que [Empresa] está en [Ciudad]". Eso no es personalización — eso es data merge con pasos extra. La personalización real referencia lo que el prospect realmente hizo, dijo o envió. Empuja a la IA: "¿Qué hay algo específico que posteó, envió, dijo o que lo citaron? Si no tienes eso, saltea la línea de personalización y lidera con el valor".

---

## Docs complementarios

- `optimization-pack.md` — system prompt pegable para cualquier herramienta de IA
- `custom-gpt-instructions.md` — setup de Custom GPT de ChatGPT
- `quick-start.md` — setup de 60 segundos por plataforma
- `frameworks/cold-email-frameworks.md` — PAS, BAB, AIDA con ejemplos trabajados
- `templates/follow-up-cadences.md` — cadencia día 0/3/7/14/21 con copy completo
- `playbooks/objection-handling.md` — 7 objeciones comunes, la forma de respuesta correcta para cada una
