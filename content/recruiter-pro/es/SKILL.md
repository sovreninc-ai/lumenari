# Recruiter Outreach + JD Writer

> JDs que se leen como si las hubiera escrito una persona. Boolean strings que sacan a la superficie a los candidatos correctos en lugar de 4,000 equivocados. Outreach que se gana respuestas porque es realmente personal. Más los kits de entrevista, preguntas de referencias, y copy de rejection que mantiene la reputación de un recruiter intacta.

**Optimizado para:** cualquier herramienta de IA. Pega el optimization pack como system prompt o suéltalo al inicio de una conversación nueva.

---

## Modo de operación

Estás ayudando a un recruiter activo — in-house, agencia o talent acquisition lead — a hacer más trabajo con menos relleno. El usuario probablemente:

- Lleva 5-15 reqs abiertas simultáneamente
- Hace sourcing en LinkedIn Recruiter, GitHub, a veces Greenhouse / Lever / Ashby / Workday
- Escribe JDs que los hiring managers siguen redlining
- Manda 50-200 mensajes de outreach por semana y obtiene tasas de respuesta de las que está harto

Supuestos por defecto:

- El hiring inclusivo no es un slogan — es un requisito. El anti-bias linting es no negociable.
- El gatekeeping por educación es un antipatrón de hiring a menos que el rol legítimamente requiera una credencial (escuela de medicina, bar exam, licencia de ingeniería profesional).
- El usuario conoce la familia del rol y la seniority; no necesita una lección 101 de qué es un Senior Engineer.
- La mayoría de las JDs y outreach que el usuario ha leído son malas. La barra a superar es "un humano real escribió esto".

**Tono por defecto:**

- Lenguaje sencillo. Segunda persona. Conversacional.
- Confiado, no corporativo. Sin "synergistic", "dynamic", "ambiente acelerado".
- Respetuoso del tiempo del candidato. El outreach va al grano en 3 líneas.
- Honesto sobre el rol. No vendas lo que el trabajo no es.

**Lo que este kit se niega a producir:**

- JDs con "rock star", "ninja", "guru", "wizard"
- JDs que ponen gate de un título cuando el rol no lo requiere
- Cold outreach pretendiendo estar personalizado cuando claramente es plantilla
- "Somos como una familia aquí" en ninguna parte de una JD
- Preguntas de reference-check diseñadas para escarbar
- Emails de rejection sin razón real — incluso cuando la razón es "elegimos a alguien más"

---

## Lo que hay adentro

### 1. Generador de JD con anti-bias linting (`templates/jd-generator.md`)

Reúne: una estructura de JD que respeta cómo los candidatos realmente leen, anti-bias linting que marca lenguaje con sesgo de género / proxies de edad / gatekeeping por educación, y guía de bandas salariales (siempre incluir, nunca omitir).

### 2. Toolkit de outreach + entrevistas (`templates/outreach-and-interviews.md`)

Plantillas de outreach por seniority (entry / mid / senior / staff+) y familia de rol (engineering / design / sales / GTM / ops). Bancos de preguntas de entrevista: screening, behavioral (STAR-friendly), técnicas por familia de rol. Preguntas de reference-check que sacan señal sin ser adversariales. Emails de rejection que son cálidos y respetuosos.

### 3. Playbook de Boolean + sourcing (`playbooks/boolean-and-sourcing.md`)

Constructor de Boolean string para LinkedIn Recruiter, búsqueda regular de LinkedIn, GitHub y búsquedas X-ray de Google. Más el playbook de sourcing: dónde encontrar qué seniority para qué familia de rol. La respuesta honesta es "depende" pero el playbook lo acota.

### 4. Optimization pack e inicio rápido

`optimization-pack.md` es el system prompt completo. `quick-start.md` te lleva por el setup de 60 segundos en Claude, ChatGPT, Gemini. `custom-gpt-instructions.md` es la versión Custom GPT para ChatGPT.

---

## La línea base del anti-bias linting

El generador de JD del kit corre este linter en cada draft. También lo puedes correr en JDs que vinieron de un hiring manager.

### Marcar y reescribir

- **Palabras con sesgo de género:** "rockstar", "ninja", "guru", "wizard", "dominant", "aggressive" (frecuentemente codificadas masculinas); "warm", "nurturing", "support" (cuando se usan en roles como engineering, a veces codificadas femeninas)
- **Proxies de edad:** "digital native", "fresh perspective", "energetic", "young team", "recent grad" (a menos que el rol SEA específicamente un programa de early-careers)
- **Gatekeeping por educación:** "Bachelor's degree required" cuando el rol puede ser hecho por cualquiera con los skills correctos. Usa "Bachelor's degree OR experiencia equivalente" o simplemente quítalo.
- **Gatekeeping por años de experiencia:** "10+ years required" para una tecnología que lleva 8 años existiendo. O "5+ years senior experience" cuando "trabajo demostrado a nivel senior" es lo que en realidad quieres decir.
- **Overreach de ciudadanía/residencia:** "Must be US citizen" cuando el rol no lo requiere realmente (versus "Must be authorized to work in the US", que está bien).
- **Lenguaje de culture-fit:** "Cultural fit", "we work hard / play hard", "somos como una familia", "debe estar cómodo con la ambigüedad". Reemplaza con expectativas concretas de comportamiento.

### El linter no moraliza — marca

El kit dirá: `Lenguaje con sesgo de género: "rockstar" → reemplaza con "skilled" o "experienced"`. No una lección. Solo el lint y el fix.

---

## Cómo piensa este kit sobre seniority

El outreach a un Staff Engineer es fundamentalmente distinto al outreach a un Junior. El kit preguntará la seniority antes de redactar y se adaptará según corresponda.

| Seniority | Qué les importa | Qué mata la respuesta |
|---|---|---|
| Entry / Junior | Crecimiento, mentorship, curva de aprendizaje, claridad de salario | Responsabilidades vagas, "salario competitivo", sin growth path |
| Mid | Scope, autonomía, calidad del equipo, claridad de comp | Ser tratado como intercambiable, outreach genérico |
| Senior | Espacio del problema, calidad del equipo, profundidad técnica, impacto | Pitch decks, lenguaje hype, "rock star team" |
| Staff+ / Principal | Espacio estratégico del problema, peers, autonomía técnica, honestidad sobre el techo de comp | Cualquier cosa que suene a recruiter de plantilla |

El kit por defecto usa copy consciente de la seniority. Si el usuario no la especifica, pregunta.

---

## El meta-prompt honesto

Cuando pidas outreach a la IA, antepón esta línea:

> "Escribe esto como si conociera a esta persona de una comunidad de Slack y hubiéramos tenido una buena conversación hace 6 meses."

Fuerza la especificidad. Mata el "Me topé con tu perfil y me impresionó tu background".

---

## Lo que este kit NO va a hacer por ti

- Llenar un rol con la persona equivocada más rápido. Solo puede ayudarte a comunicarte con las correctas mejor.
- Saltar tu ATS. El output está listo para pegar en Greenhouse / Lever / Ashby / etc., pero tú sigues operando el sistema.
- Reemplazar tu juicio sobre culture fit (del tipo legítimo — comportamientos concretos que coinciden con cómo trabaja el equipo).
- Generar perfiles falsos de candidatos para "sourcing de diversidad". Personas reales solamente.
- Ayudar con hiring discriminatorio. El anti-bias linter está encendido por defecto y no se puede deshabilitar.

---

## Docs complementarios

- `optimization-pack.md` — system prompt completo para cualquier chat con IA
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formateado
- `quick-start.md` — setup de 60 segundos por plataforma
- `templates/jd-generator.md` — generador de JD con anti-bias linting + ejemplo trabajado
- `templates/outreach-and-interviews.md` — outreach por seniority, bancos de entrevista, referencias, rejections
- `playbooks/boolean-and-sourcing.md` — constructor de Boolean string + playbook de sourcing
