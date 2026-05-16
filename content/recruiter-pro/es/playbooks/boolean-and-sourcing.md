# Playbook de Boolean y Sourcing

La mayoría del sourcing es malo porque el Boolean string es malo. La mayoría de los Booleans son malos porque tratan a todos los candidatos como si vivieran en LinkedIn de la misma forma. Este playbook arregla ambos — el constructor de string para cada plataforma, y el playbook de sourcing de qué plataforma encuentra qué seniority para qué familia de rol.

---

## Parte 1 — Anatomía del Boolean string

Cada buen Boolean tiene cuatro movimientos:

1. **Skills/títulos MUST-have** — requeridos, usualmente strings entre comillas, unidos con AND
2. **Skills OPCIONALES** — amplían la red, unidos con OR
3. **EXCLUSIONES** — lo que no quieres, con NOT
4. **Señales de CONTEXTO** — tipo de empresa, indicadores de seniority, ubicación

### Operadores que funcionan en todos lados

- `AND` — ambos términos deben estar presentes
- `OR` — cualquiera de los dos
- `NOT` (o `-` en la mayoría de los motores de búsqueda) — excluir
- `"frase entre comillas"` — coincidencia exacta (trata los espacios como parte del término)
- `(paréntesis)` — agrupar operadores

### Operadores específicos a plataformas

- LinkedIn Recruiter tiene filtros como campos (Title, Skills, Company, etc.) que toggleas en la UI, NO en el search string
- La búsqueda pública de LinkedIn soporta Boolean básico en el campo de keywords pero es más restringida
- Las búsquedas X-ray de Google usan site:linkedin.com/in/ y el Boolean completo
- La búsqueda de GitHub soporta filtros como `language:`, `location:`, `followers:>X`

---

## Parte 2 — Strings de LinkedIn Recruiter

LinkedIn Recruiter es el más fácil porque la plataforma misma separa los campos por ti.

### El prompt

```
Eres el Recruiter Co-Pilot.

Constrúyeme una búsqueda de LinkedIn Recruiter.

**Rol objetivo:** [título]
**Seniority:** [Entry/Mid/Senior/Staff/Principal]
**Skills must-have:** [lista]
**Skills opcionales:** [lista]
**Industrias/tipos de empresa que quiero:** [p. ej., "SaaS B2B, Serie A-C, 50-300 empleados"]
**Industrias/tipos de empresa a excluir:** [p. ej., "consultoría enterprise, agencias"]
**Ubicación:** [ciudad + radio o remote-anywhere]
**Preferencia de antigüedad:** [p. ej., "1+ año en el rol actual"]

Dame:
1. El Boolean string para el campo de keywords
2. Qué setear en cada filtro (Title, Skills, Industry, Company, Location, Years of experience)
3. 2-3 variantes si mi primera búsqueda trae demasiados o muy pocos resultados
4. Patrones comunes de falsos positivos a vigilar
```

### Ejemplo trabajado — Senior Backend Engineer

> **Setup de LinkedIn Recruiter:**
>
> **Filtro de Title:** (Senior OR Sr OR Staff) AND (Backend OR "Back-end" OR "Back end" OR Server)
>
> **Filtro de Skills:** Node.js, TypeScript, PostgreSQL (requerir las tres)
>
> **Boolean del campo de Keywords:**
> ```
> ("Node.js" OR "Node" OR Typescript) AND (Postgres OR PostgreSQL) AND (AWS OR GCP) NOT ("recruiter" OR "recruiting" OR "tech evangelist")
> ```
>
> **Filtro de Industry:** Computer Software, Internet, Financial Services (toggle según relevancia)
>
> **Filtro de Company:** EXCLUIR: agencias, consultoras, enterprise grande (Cognizant, Infosys, TCS, Accenture, Deloitte, Capgemini) si solo quieres experiencia en empresa de producto
>
> **Years of Experience:** 6+ (no pongas gate en 10; la calidad senior frecuentemente emerge en 6-8 años)
>
> **Ubicación:** Como se especificó
>
> **Variantes si demasiados resultados:**
> - Agrega filtro de antigüedad: 1+ año en empresa actual (filtra job-hoppers + para a la gente recién contratada por competidores)
> - Aprieta el radio de ubicación
> - Agrega señal específica de industria (FinTech / HealthTech / etc.)
>
> **Variantes si muy pocos resultados:**
> - Suelta una de las skills must-have, mantenla como preferida
> - Expande a Mid-level (frecuentemente calidad senior)
> - Afloja el filtro de empresa
>
> **Falsos positivos a vigilar:**
> - "Senior" en el título en empresas donde senior significa 2 YOE (consultoría, agencias)
> - Backend engineers que solo hacen Python o Java (tu stack es Node) — verifica en el detalle del perfil
> - Cualquiera con el anillo verde "open to work" Y menos de 1 año en empresa actual — podría ser job-hopper; podría ser un candidato fuerte de despido. Lee con cuidado.

### LinkedIn Recruiter — patrones comunes de Boolean

| Caso de uso | Ejemplo de string |
|---|---|
| Encontrar gente que usa herramientas específicas | `("Datadog" OR "PagerDuty") AND ("Kubernetes" OR "EKS")` |
| Encontrar gente que HABLA en conferencias | `(speaker OR keynote OR "spoke at")` |
| Encontrar contribuyentes de OPEN SOURCE | `("open source" OR "OSS" OR github)` |
| Encontrar gente de una familia específica de empresas | `("ex-Stripe" OR "former Stripe" OR "previously at Stripe")` |
| Excluir recruiters y entrenadores | `NOT (recruiter OR "talent acquisition" OR trainer OR "tech evangelist")` |

---

## Parte 3 — Búsqueda pública de LinkedIn

Para cuando estás fuera de Recruiter o complementando.

### El formato

El campo de keywords de LinkedIn acepta Boolean pero es más restringido. Sin paréntesis anidados más allá de dos niveles. Las frases entre comillas funcionan.

```
("Senior Backend Engineer" OR "Senior Software Engineer") AND ("Node.js" OR Typescript) AND Postgres NOT recruiter
```

Combinado con los filtros de ubicación y empresa actual en la UI, esto llega sorprendentemente lejos.

### Búsquedas X-ray de Google (cuando la búsqueda de LinkedIn está gated)

El X-ray de Google te da resultados que LinkedIn puede esconder a usuarios logged-out.

```
site:linkedin.com/in/ ("Senior Backend Engineer" OR "Senior Software Engineer") "Node.js" "Postgres" "San Francisco" -intitle:"profiles" -inurl:dir/
```

Variantes:

- Agrega `-intitle:"profiles"` para saltar páginas de directorio de LinkedIn
- Agrega `"open to work"` para encontrar gente que ha señalado apertura
- Agrega `"intern"` para NO excluir — el negativo `-intern` filtra perfiles junior

---

## Parte 4 — Sourcing en GitHub

GitHub es donde los senior engineers realmente viven. La señal está en el código, no en el bio.

### Patrones de búsqueda

**Por lenguaje + ubicación:**
```
location:Toronto language:typescript followers:>50
```

**Por contribución open-source a un repo específico:**
- Ve al repo
- Click en "Insights" → "Contributors"
- Ordena por commits en el último año
- Cruza referencia de los perfiles de los top contributors para señales de hiring

**Por actividad reciente:**
```
location:"San Francisco" language:rust followers:>100
```
Después filtra por "Most followed" o mira el contributions graph para actividad reciente.

**Encontrar gente que ha escrito tutoriales o longform:**
- Busca en Twitter/X repos de GitHub: `from:@persona github.com/`
- O usa Google: `site:github.com "tutorial" "production" "we built"`

### Qué buscar en un perfil de GitHub

- Pinned repos con READMEs que SE LEEN bien — señal de engineer-con-habilidad-de-comunicación
- Actividad reciente (contribuciones en los últimos 3 meses)
- Una mezcla de proyectos propios + contribuciones a OSS de proyectos conocidos
- Followers > 50 es una señal blanda de presencia en la comunidad
- Bio que nombra una empresa actual (ahorra cross-reference)

### Lo que NO es señal

- Conteo alto de repos solo — la mayoría son forks
- Insignias "AWS Certified" en su bio — señales de papel
- Stars en sus proyectos sin commits en 2 años

---

## Parte 5 — El playbook de sourcing

Dónde encontrar qué seniorities para qué familias de rol. La respuesta honesta siempre es "depende", pero el playbook lo acota.

### Engineering

| Seniority | Fuente primaria | Fuente secundaria | Qué funciona |
|---|---|---|---|
| Junior | LinkedIn (recientes graduados + bootcamp) | Redes de alumni de bootcamp (Bloc, App Academy, Lambda, etc.) | Outreach directo, pero espera tasas de respuesta más bajas |
| Mid | LinkedIn Recruiter | GitHub (contribuyentes activos) | Hacer referencia a proyectos específicos en outreach |
| Senior | GitHub > LinkedIn | Speakers de conferencias, contribuyentes OSS | Outreach en tono peer, especificidad técnica requerida |
| Staff/Principal | Referrals + GitHub + Twitter/X | LinkedIn rara vez funciona — ignoran los InMails | Contrata a alguien que respeten; la intro tibia es 10x el InMail |

Para engineers senior+: deja de hacer sourcing en LinkedIn primero. Empieza con SU PROPIO contenido — blog posts, contribuciones OSS, charlas de conferencias. Su LinkedIn es el último lugar que actualizan.

### Diseño (Product / Brand)

| Seniority | Fuente primaria | Fuente secundaria | Qué funciona |
|---|---|---|---|
| Junior | LinkedIn + Dribbble / Figma Community | Alumni de bootcamp | Especificidad de portfolio |
| Mid | Dribbble + Figma Community + LinkedIn | Comunidad de diseño en Twitter | Cumplido sobre trabajo específico |
| Senior | Sitios personales + Dribbble + Twitter | LinkedIn (baja prioridad) | Hacer referencia a su trabajo real, no al rol |
| Director | Referrals + Twitter | LinkedIn | Solo intros tibias |

Los diseñadores mantienen portfolios, no LinkedIn. El portfolio ES la fuente.

### Ventas (AE, SDR, CS)

| Seniority | Fuente primaria | Fuente secundaria | Qué funciona |
|---|---|---|---|
| SDR | LinkedIn + RepVue + Bravado | Eventos de networking | Transparencia de comp, growth path |
| Mid AE | LinkedIn (muy activos aquí) | RepVue (para research de fit con ICP) | Territorio específico + banda de comp |
| Senior AE | LinkedIn + referrals | Slacks de industria (RevGenius, Pavilion) | Data de attainment de cuota + específicos del producto |
| VP/CRO | Referrals + red de inversionistas | Executive search pesado | Intro tibia es requerida; cold outreach es 1-2% |

LinkedIn es donde vive ventas. Su identidad profesional completa está ahí.

### Operaciones / G&A

| Seniority | Fuente primaria | Fuente secundaria | Qué funciona |
|---|---|---|---|
| Junior/Mid | LinkedIn + Pavilion (para ops) | Grupos de industria (p. ej. People Geeks para HR) | Descripción específica de scope |
| Senior | LinkedIn + referrals + Pavilion | Comunidades de industria | Real-talk sobre el estado inicial |
| Director/VP | Referrals + executive search | LinkedIn (bajo ROI) | Introducciones por red |

La gente de ops frecuentemente se esconde en LinkedIn porque son constantemente reclutados. Las comunidades son de mayor señal.

### Producto (PM, Product Leadership)

| Seniority | Fuente primaria | Fuente secundaria | Qué funciona |
|---|---|---|---|
| APM/Mid | LinkedIn | Comunidad Mind the Product | Específicos del producto, growth path |
| Senior | LinkedIn + Mind the Product + círculo de Lenny's Newsletter | Twitter (PMs activos postean aquí) | Especificidad del dominio |
| Director/VP | Referrals + alumni de Reforge | LinkedIn (baja prioridad) | Intros tibias |

Los PMs en roles senior frecuentemente están muy online — Twitter, Substacks, apariciones en podcasts. Haz referencia a lo que han compartido públicamente.

---

## Parte 6 — Dónde encontrar candidatos diversos (sin hacer dog-whistling)

Esta sección es para los recruiters intentando ampliar su funnel sin bullshit performativo.

### El principio

Los pipelines diversos vienen de hacer sourcing en lugares que no son tus fuentes default. No vienen de search strings que filtran por categorías protegidas (ilegal en la mayoría de las jurisdicciones, incluso si la plataforma te deja intentarlo).

### Comunidades que ayudan

- **Engineering:** Out in Tech, Lesbians Who Tech, /dev/color, Black Tech Pipeline, Latinas in Tech, Women Who Code
- **Diseño:** People of Craft (diseñadores POC), Hexagon (mujeres+ en diseño)
- **Ventas:** Sistas In Sales, Hispanic Star, Women in Sales Everywhere
- **Producto:** Women in Product, redes de Product Manager dentro de comunidades más grandes

La mayoría tiene bolsas de trabajo, workspaces de Slack y calendarios de eventos. Vas a obtener 10x más señal posteando un rol a una de estas específicamente que corriendo otra búsqueda de LinkedIn.

### Lo que NO hay que hacer

- Buscar "diversity" o "women" en LinkedIn — esto es ilegal en muchos lugares y no funciona incluso donde es legal
- Filtrar fotos de candidatos por diversidad visible — ilegal, sesgado, y la data es no confiable de todos modos
- Usar nombres como proxy para etnia — extremadamente sesgado y frecuentemente equivocado
- Boilerplate "Somos un lugar de trabajo inclusivo" al final de una JD que de otra forma está llena de lenguaje "rockstar ninja" — los candidatos lo ven directo

### Lo que funciona

- Hacer sourcing en las comunidades listadas arriba
- Tener un lugar de trabajo realmente inclusivo (licencia parental, trabajo flexible, ERGs reales, liderazgo diverso) y dejar que tus JDs lo reflejen honestamente
- Pagar equitativamente (publicar bandas salariales; pay-banding por nivel de trabajo, no por agresividad de negociación)
- Trackear diversidad en el funnel en cada etapa — sourced, screeneado, entrevistado, ofertado, aceptado. El drop-off te dice dónde estás roto.

---

## Parte 7 — Cadence de sourcing + métricas de outreach

### Números realistas

Para un rol senior de engineering en una empresa Serie B con marca decente:

- Lista de sourcing de 50 candidatos
- Tasa de respuesta de outreach: 15-25% (mensaje de 3 líneas con comp + razón específica)
- Conversión a phone screen: 50% de las respuestas
- Conversión a primera entrevista: 50% de los screens
- Oferta: 1-2 de los 50 originales

Si tu tasa de respuesta está por debajo del 10%, el problema casi siempre es:
- Outreach genérico (sin razón específica para este candidato)
- Sin banda de comp declarada
- Subject line ("Oportunidad emocionante en...")
- Outreach off-brand para la seniority (outreach con tono de plantilla a un Staff Engineer)

Si tu tasa de respuesta está por encima del 30%, podrías estar haciendo sourcing demasiado estrecho. Amplía el pool.

### Cadence de outreach

- Día 1: Primer mensaje
- Día 5-7: Un follow-up (ángulo distinto — p. ej., el primer mensaje lideró con el espacio del problema; el follow-up lidera con el equipo)
- Día 14: Follow-up final (corto — "sigo aquí, sigo interesado, sin problema si no es el momento")
- Después detente. Tres mensajes, después deja la puerta abierta.

Después de tres, eres una molestia. Los recruiters que siguen pasados los tres queman la marca para todos los que están contratando en esa empresa.

---

## Errores comunes de Boolean y sourcing que el kit marcará

- **Demasiados ANDs.** Cada AND estrecha. 5+ cláusulas AND usualmente devuelve menos de 50 resultados, la mayoría no lo que quieres.
- **Sin cláusulas NOT.** Te vas a ahogar en entrenadores, recruiters y consultores. Siempre excluye.
- **Búsquedas solo por título.** "Senior Backend Engineer" varía salvajemente entre empresas. Busca también por skills + outcomes.
- **Buscar en LinkedIn por engineers senior+.** Su LinkedIn está viejo. Source en GitHub, listas de speakers de conferencias, listas de contribuyentes OSS.
- **Sin calificador de ubicación en un rol remoto.** Incluso "remote-anywhere" usualmente tiene restricciones de zona horaria. Filtra por zona horaria, no solo por remoto.
- **Hacer sourcing de los mismos 50 perfiles de LinkedIn que cada otro recruiter está buscando.** Si tu pool es la primera página de una búsqueda genérica de LinkedIn, estás compitiendo con otros 10 recruiters. Ve más profundo.
