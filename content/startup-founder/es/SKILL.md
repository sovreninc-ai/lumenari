# Startup Founder Toolkit

> Las herramientas de comunicación que realmente necesitas como founder solo o de equipo pequeño. Cada prompt fue afilado contra feedback real de inversionistas — del tipo que termina con "demasiadas slides, ¿qué estás pidiendo?".

**Optimizado para:** cualquier herramienta de IA.

---

## Modo de operación

Estás ayudando a un founder a producir comunicación de calidad founder: investor updates, contenido de pitch deck, briefs de hiring, matemática de runway, notas de entrevistas con clientes. Supuestos por defecto:

- El founder es solo o casi-solo
- Tienen un producto real, no uno hipotético
- La audiencia para cada artefacto es específica (inversionistas existentes, hires prospectivos, clientes prospectivos, ellos mismos)
- Tienen restricción de tiempo y valoran la claridad sobre la profundidad

**Tono por defecto:**
- Directo. Sin matizar, sin "quizás podríamos considerar".
- Concreto. Números, fechas, nombres — no adjetivos.
- Voz de founder, no voz de consultor.

**Lo que este kit se niega a producir:**
- Decks de 80 slides
- Framing de "Somos el Uber de X"
- Mission statements vacíos
- Métricas vagas ("crecimiento fuerte", "pipeline robusto")
- Marketing-speak en documentos operacionales

---

## Los cuatro artefactos centrales

### 1. Pitch deck (`templates/pitch-deck.md`)

Una estructura de 10 slides que encaja con la forma en que las reuniones reales con inversionistas funcionan. No el overkill de 40 slides de McKinsey. Cada slide tiene un trabajo.

### 2. Investor update (`templates/investor-update.md`)

Estructura de update mensual con las 5 preguntas que cada inversionista quiere respondidas. Incluye disciplina de ask-line — cada update tiene una petición específica, nunca "avísame si tienes preguntas".

### 3. Job description (`templates/job-description.md`)

JDs que se leen como si las hubiera escrito una persona. Anti-patrones marcados (la línea "rock-star ninja", la sección "responsibilities" de 47 bullets).

### 4. Prompt de runway / burn model (`models/runway-prompt.md`)

Pega tus números mensuales actuales, obtén un cálculo de runway + un sanity check + las preguntas que deberías hacerte antes de levantar de nuevo.

---

## Los patrones de prompt

Para cada artefacto, la IA funciona mejor con esta forma de input:

```
[Audiencia]
¿Quién lee esto? (inversionistas seed existentes / prospectos de una lista / etc.)

[Contexto]
¿En qué etapa estoy? ¿Último raise + monto + cuándo?
¿Qué métrica importa más ahora?

[Lo que quiero decir]
Un draft, incluso rough, de la cosa que estoy intentando comunicar.

[Restricción]
Largo, formato, notas de tono.
```

Saltarse la línea de [Audiencia] es la razón #1 por la que los docs de founder salen blandos.

---

## El meta-prompt honesto

Cuando estés a punto de pedirle a la IA contenido en voz de founder, antepón esta línea:

> "Escribe como si fuera 5 años en el futuro, mirando atrás a esto — ¿qué le gustaría a yo-pasado que le dijeran directo?"

Confiablemente colapsa el fluff corporativo y saca a la superficie la cosa real que vale la pena decir.

---

## Lo que este kit NO va a hacer por ti

- Conseguirte funding. Los decks no levantan dinero. Los clientes y la tracción sí.
- Predecir tu runway con precisión. El modelo es solo tan bueno como los números del mes pasado + una conjetura sobre el próximo mes.
- Reemplazar una conversación con co-founder. La IA es un partner de escritura, no un partner de estrategia.

---

## Docs complementarios

- `templates/pitch-deck.md` — generador de deck de 10 slides
- `templates/investor-update.md` — plantilla de update mensual
- `templates/job-description.md` — JD que no suena como cada otra JD
- `models/runway-prompt.md` — calculadora de runway + prompt de sanity check
