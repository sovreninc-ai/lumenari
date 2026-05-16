# Generador de JD con Anti-Bias Linting

La mayoría de las JDs son malas porque los hiring managers las escriben en 20 minutos, copian la mitad de otra JD, y nunca las leen como las leería un candidato. Esta plantilla arregla eso. Corre un anti-bias linter primero, después produce una JD que respeta cómo los candidatos realmente leen.

---

## Cómo funciona esta plantilla

Dos pasadas:

1. **Pasada de lint.** Marca cada frase problemática en el brief o en el draft de JD existente. Muestra el lint + el fix al inicio del output.
2. **Draft de JD.** Una JD limpia y estructurada usando el formato estándar del optimization pack.

Puedes correr solo-lint en una JD que un hiring manager te mandó (el use case más útil en agencias y equipos in-house).

---

## El prompt

```
Eres el Recruiter Co-Pilot.

Genera una job description.

**Título del rol:** [título exacto]
**Seniority:** [Entry / Mid / Senior / Staff / Principal / Director / VP]
**Familia de rol:** [Engineering / Product / Design / Sales / GTM / Ops / Finance / etc.]
**Etapa + tamaño de la empresa:** [p. ej., Serie B, 80 personas, $30M ARR]
**Lo que hacemos:** [una frase]
**Por qué estamos contratando este rol:** [una frase — crecimiento, reemplazo, nuevo equipo, nueva función]
**Ubicación + arreglo de trabajo:** [Remoto / Híbrido X días en [ciudad] / On-site (ciudad)]

**Banda salarial:**
- Base: [bajo] - [alto] [moneda]
- Equity: [rango, si aplica]
- Bonus/comisión: [estructura, si aplica]

**Top 3 cosas que la persona va a ser dueña (concretas, no vagas):**
1. [outcome]
2. [outcome]
3. [outcome]

**Top 3 skills/experiencia necesarios (outcomes, no gatekeeping):**
1.
2.
3.

**Nice-to-have (opcional):**
- [3-4 cosas]

**El equipo al que se unirán (headcount real, manager nombrado si es posible):**
[descripción]

**Proceso de entrevista (tu proceso real, no una plantilla):**
[número de rondas, a quién van a conocer, formato]

**Cualquier otra cosa que valga la pena marcar:**
[p. ej., "no tenemos un senior engineer todavía — vas a poner la barra", o "el codebase es más viejo de lo que nos gustaría"]

Draft existente (si hay):
[pega — para pasada de lint]
```

---

## Lo que recibes — ejemplo completo

Para un rol de Senior Full-Stack Engineer en un SaaS Serie B:

### Pasada de lint (del draft del hiring manager)

> **Pasada de lint en el draft original:**
>
> - `"passionate"` → cortar. La pasión es un sentimiento, no un entregable.
> - `"rock star"` → cortar. Con sesgo de género (sesga masculino, espanta candidatas senior), también cringe corporativo.
> - `"fast-paced, dynamic team"` → cortar. Código para "estamos desorganizados". Reemplaza con expectativas concretas de ritmo.
> - `"10x developer"` → cortar. Sin significado, espanta a senior engineers reflexivos.
> - `"thrives in ambiguity"` → suavizar o ser específico. Los senior engineers esperan ALGUNA estructura; la frase frecuentemente es código para "no sabemos qué queremos".
> - `"wear many hats"` → cortar. Código para "no tenemos equipo". Si es cierto, dilo honestamente.
> - `"Bachelor's degree in Computer Science required"` → quitar o cambiar a "Bachelor's degree O experiencia equivalente". Los senior engineers con 10 años de trabajo demostrable no deberían tener gatekeeping por un título de CS.
> - `"10+ years of experience"` → reconsiderar. El rol no requiere 10 años; trabajo de calidad senior con 6-8 años es común. Reemplaza con "trabajo demostrado a nivel senior a través de múltiples roles".
> - `"work hard and play hard"` → cortar. Codificado como joven + grindy. Espanta a candidatos mayores y padres.
> - `"we're like a family here"` → cortar. Vago y frecuentemente una bandera de problemas de límites. Reemplaza con normas concretas del equipo.
> - `"competitive salary"` → reemplaza con la banda salarial real. No negociable.

### La JD reescrita

> **Senior Full-Stack Engineer**
>
> **Sobre el rol**
>
> Vas a ser el tercer senior engineer en un equipo de siete, trabajando en nuestro stack de TypeScript / React / Node / Postgres para lanzar features por las que nuestros clientes realmente nos pagan. El día a día significa escribir código de producción, revisar PRs, ocasionalmente hacer pair con mids en problemas difíciles, y ser dueño de un área principal del producto end-to-end.
>
> **Lo que harás**
>
> - Lanzar features que tocan el full stack — desde el schema de Postgres a los componentes de React
> - Ser dueño de una de nuestras tres áreas de producto (billing, integraciones o workflows) dentro de tus primeros 90 días
> - Poner la barra técnica en un equipo que está creciendo de 7 a 12 engineers en el próximo año
> - Hacer pair con el product manager y el diseñador en decisiones de scoping, no solo en implementación
> - Hacer mentoring a engineers mid-level, con cerca del 20% de tu tiempo en esto (más si quieres, menos si no)
>
> **Lo que buscamos**
>
> - Trabajo demostrado a nivel senior a través de TypeScript / React en el front end y Node / Postgres en el back end
> - Has publicado a producción en una startup o equipo rápido — sabes qué significa "lo suficientemente bueno para shippear"
> - Puedes scope tu propio trabajo desde un problem statement de un párrafo
> - Escribes código que otros pueden leer y revisar sin traductor
> - Has trabajado remotamente con un equipo a través de múltiples zonas horarias
>
> **Nice to have**
>
> - Experiencia con AWS (estamos en ello; con gusto te ponemos al día si no)
> - Background en SaaS B2B específicamente
> - Contribuciones a open source o un side project del que estés orgulloso
> - Comodidad con infra-as-code (Terraform)
>
> **Compensación**
>
> - Banda salarial base: USD $170,000 - $210,000
> - Equity: 0.05% - 0.15%, vesting de 4 años con cliff de 1 año
> - Bonus: 10% objetivo de bonus anual atado a OKRs de la empresa
> - Beneficios: health/dental/vision completos (US: 100% empleado, 80% dependientes), $1,000/mes de stipend de home office, PTO ilimitado con un mínimo de 3 semanas, 16 semanas de licencia parental
>
> **Sobre el equipo**
>
> Siete engineers reportando a [Engineering Lead nombre si es público]. Hacemos sprints de 2 semanas, async-first con dos syncs cortos a la semana. Sin rotación de on-call todavía — corremos un equipo pequeño de ops para eso. El codebase tiene 4 años, bien testeado en las partes que importan, volviéndose más limpio.
>
> **Cómo contratamos**
>
> 1. Intro de 30 min conmigo (la recruiter)
> 2. Entrevista técnica de 60 min con dos engineers — un problema real en el que hemos trabajado, sin LeetCode
> 3. Conversación de system design de 60 min
> 4. Reunión de 45 min con el engineering lead — cultura, estilo de trabajo, tus preguntas para nosotros
> 5. Dos llamadas cortas de referencia
>
> Inversión total de tiempo: cerca de 4 horas en 2-3 semanas. Tomamos decisiones dentro de 5 días hábiles del final round.
>
> **Arreglo de trabajo**
>
> - Remote-first a través de US y Canada
> - Core hours: 11am - 3pm Eastern, con flex alrededor
> - Nos reunimos en persona dos veces al año para un offsite de empresa de 3 días (el último fue en Ciudad de México; el próximo es Lisboa)
> - Sin viajes requeridos más allá de los offsites

Esa JD tiene ~480 palabras. Va a superar al 90% de las JDs en el mismo inbox porque le da al candidato lo suficiente para tomar una decisión real antes de aplicar.

---

## Ejemplo trabajado — corrida solo-lint

El usuario pegó la JD original del hiring manager:

> "We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

La IA devuelve:

> **Pasada de lint — 9 flags en 51 palabras. Recomiendo reescritura completa.**
>
> 1. `passionate` — cortar (vago, espanta a candidatos senior)
> 2. `rock star` — cortar (con sesgo de género, cringe corporativo)
> 3. `fast-paced` — cortar (código para "desorganizado")
> 4. `dynamic` — cortar (no dice nada)
> 5. `10x developer` — cortar (mito, espanta a seniors reflexivos)
> 6. `thrives in ambiguity` — flag (a veces legítimo; usualmente código para "no sabemos qué queremos")
> 7. `wear many hats` — cortar (código para "sin soporte de equipo")
> 8. `Bachelor's degree in CS required` — quitar O cambiar a "O experiencia equivalente"
> 9. `10+ years of experience` — reconsiderar (frecuentemente discriminatorio; calidad senior frecuentemente emerge en 6-8 años)
> 10. `work hard and play hard` — cortar (codificado por edad, codificado por grind)
> 11. `like a family` — cortar (vago, a veces una bandera de límites)
> 12. `Competitive salary` — reemplazar con la banda real
>
> Esta JD tal cual va a underperform en pipeline diverso de candidatos y va a recibir menos solicitudes senior de las que te gustarían. ¿Quieres que la reescriba?

---

## Cuándo el linter no debería disparar

Algunas frases marcadas son legítimas en contexto. Ejemplos:

- "Aggressive" está bien para "aggressive product roadmap" (algo real) pero no para "aggressive personality" (una señal de hiring que sesga sesgado).
- "Family" está bien al describir políticas reales family-friendly (parental leave, días de hijo enfermo). NO está bien como "somos como una familia".
- "Recent graduate" está bien para programas early-careers branded explícitamente como tales. NO está bien en un rol Senior.

El linter va a marcar estos casos dependientes del contexto como "flag, no auto-reemplazar — confirma intención".

---

## Cómo usar esto con hiring managers

Un escenario común: el hiring manager escribe la JD. Tú crees que es mala. No quieres hacer que se sientan atacados.

La pasada de lint te da una manera no confrontacional de empujar atrás. Muéstrales las frases marcadas con el POR QUÉ (respaldado por investigación: el lenguaje con sesgo de género reduce las solicitudes de mujeres en 11%; "10+ years" filtra a candidatos calificados que tienen 6-8 años de trabajo de calidad senior; el gatekeeping por educación reduce el pipeline diverso).

No le estás diciendo al hiring manager que su escritura es mala. Le estás mostrando la data sobre lo que el lenguaje le hace al pool de aplicantes. La mayoría de los hiring managers actualiza con gusto una vez que lo ven.

---

## Errores comunes que el kit marcará

- **Sin banda salarial.** Siempre pregunta. Siempre incluye.
- **Sin sección real de "Cómo contratamos".** "Múltiples rondas" genérico es una bandera — sé específico.
- **JD de más de 800 palabras.** Recorta. Las JDs largas son indecisión.
- **"Bonus" listado en la banda pero no explicado.** Siempre di la estructura.
- **Rangos de equity demasiado amplios.** "0.01% - 1%" no le dice nada al candidato. Aprieta.
- **Sección "Nice to have" que tiene los requisitos reales.** No escondas must-haves en nice-to-haves; confunde a los candidatos y bloquea a los buenos.
