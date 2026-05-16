# Outliner de Artículos Clusterizado por Keyword

El outline es donde se gana o se pierde el ranking. Si la estructura está mal, ninguna cantidad de escritura ingeniosa lo arregla. Esta plantilla es el prompt que convierte "quiero rankear para X" en un outline listo para pelear.

---

## Lo que hace esta plantilla

Tú le das: una keyword primaria, el contexto de tu sitio, y los actuales top 3-5 resultados del SERP en vivo. Devuelve:

1. Clasificación de intención (informational / commercial / navigational / transactional)
2. Una lectura del SERP — qué está ganando y por qué
3. Un outline completo con H1, H2s, H3s sugeridos y puntos clave por sección
4. Clusters de keywords secundarias agrupadas por H2
5. Sugerencias de anchor de internal-link (con nombre, no genéricas)
6. Oportunidades de PAA (People Also Ask) sacadas a la superficie como FAQ H3s
7. Meta title (50-60 caracteres) y meta description (140-160 caracteres)
8. Recomendación de schema
9. Punto de inyección de E-E-A-T — dónde tu experiencia real necesita aparecer

---

## El prompt

Pega esto en la IA de tu elección. Llena los campos entre corchetes.

```
Eres el SEO Content Strategist.

Quiero un outline para un artículo targeteando:

**Keyword primaria:** [keyword]
**Volumen mensual estimado:** [N — o "desconocido"]
**Search intent (mi suposición):** [informational / commercial / transactional / "tú dime"]

**Contexto de mi sitio:**
- URL: [dominio.com]
- Qué publicamos: [nicho + formato]
- Perfil del lector: [quiénes son, qué quieren]
- Ballpark de Domain Authority: [N — o "sitio pequeño / medio / grande"]
- Páginas relevantes existentes en mi sitio (opcional): [lista URLs y títulos]

**Top resultados del SERP (pega el top 5 actual si es posible):**
1. [URL] — [título] — [tu lectura: word count? formato? ángulo?]
2. [URL] — [título] — [lectura]
3. [URL] — [título] — [lectura]
4. [URL] — [título] — [lectura]
5. [URL] — [título] — [lectura]

**SERP features que puedo ver:**
- Featured snippet: [sí/no — si sí, quién lo tiene]
- People Also Ask: [sí/no — si sí, pega las 4 preguntas]
- Video carousel: [sí/no]
- Image pack: [sí/no]
- AI Overview: [sí/no]

**Mi ángulo diferenciador (si tengo uno):**
[1-2 frases sobre por qué puedo escribir una mejor versión — experiencia de primera mano, data única, POV contrarian, etc.]

Dame:
1. Clasificación de intención (con una justificación de una frase)
2. Lectura del SERP (qué funciona, cuál es el gap)
3. Outline completo (H1 + H2s con intención por sección, puntos clave, keywords secundarias)
4. Sugerencias de internal link (3-5 anchors con nombre)
5. H3s de PAA si aplican
6. Meta title + meta description
7. Recomendación de schema
8. Plan de inyección de E-E-A-T
```

---

## Ejemplo trabajado — "best CRM for solopreneurs"

Así se ve una corrida real de esta plantilla de punta a punta.

### Input

```
Keyword primaria: best CRM for solopreneurs
Volumen mensual estimado: ~1,900
Search intent (mi suposición): commercial

Contexto de mi sitio:
- URL: solo-saas-reviews.com
- Qué publicamos: reviews longform y comparaciones de SaaS para negocios de una sola persona
- Perfil del lector: freelancers, consultores, operadores independientes evaluando herramientas
- Ballpark de DA: 52
- Páginas relevantes existentes:
  - /best-invoicing-software-for-freelancers (DA driver, rankea #4)
  - /honeybook-vs-dubsado (tráfico decente)
  - /crm-pricing-teardown (más viejo, rankea #11)

Top resultados del SERP:
1. Blog de Zapier — "The 18 best CRMs for solopreneurs in 2025" — 4,200 palabras, listicle, POV débil
2. Blog de HubSpot — "Best CRM for solopreneurs (and why)" — 2,800 palabras, suave-promocional
3. Review de un escritor de Substack — "I tested 5 CRMs for 90 days as a freelancer" — 1,400 palabras, POV personal fuerte
4. Página de categoría de Capterra — genérica
5. Página de categoría de G2 — genérica

SERP features:
- Featured snippet: sí, actualmente lo tiene HubSpot, definición de párrafo corto
- People Also Ask: sí — (1) ¿Cuál es el mejor CRM gratis para solopreneurs? (2) ¿Los solopreneurs necesitan un CRM? (3) ¿HubSpot es bueno para solopreneurs? (4) ¿Cuál es el CRM más fácil de usar?
- Video carousel: no
- Image pack: no
- AI Overview: sí, citando al Substack y a HubSpot

Ángulo diferenciador: De hecho pagué y usé 7 CRMs por 90 días cada uno. Tengo screenshots reales, data real sobre time-to-first-deal-logged, recibos reales de cancelación.
```

### Output esperado de la IA

> **Keyword primaria:** best CRM for solopreneurs (vol ~1,900/mes)
> **Intención:** Commercial. La query implica que el usuario está en modo evaluación — quiere una recomendación, no una definición. "Best" + "for [audiencia]" es intención commercial clásica.
>
> **Lectura del SERP:**
> - Formatos del top 3: dos listicles + una review personal
> - Rango de word count: 1,400 (Substack) a 4,200 (Zapier). HubSpot en el medio con 2,800.
> - La pieza del Substack en #3 está rankeando arriba a pesar de ser la más corta porque tiene el único POV auténtico. Tanto Zapier como HubSpot se sienten como si se hubieran escrito desde un brief, no desde el uso.
> - El featured snippet es corto y definicional — ganable con una respuesta de 40-50 palabras a "qué es un CRM para solopreneurs" o "¿los solopreneurs necesitan un CRM?" cerca de la parte superior de la página.
> - El AI Overview ya cita la pieza del Substack. Eso nos dice que Google está premiando contenido de prueba real para esta query.
> - **El gap:** ninguno del top 3 tiene data seria — time-to-value, fricción real de cancelación, comparación real de pricing tiers con los límites de los planes gratis. Esa es tu apertura.
>
> **Consideraciones de autor/byline:** Este artículo solo funciona si lo firma alguien que realmente usó los 7 CRMs. Si eres tú, lidera con eso: "Soy [tu contexto]. En 90 días pagué y probé [lista]. Esto es lo que mantuve y lo que cancelé". Si no eres el tester, contrata o asóciate con uno — no falsees; Google se está volviendo mejor olfateándolo.
>
> **Outline:**
>
> **H1:** Best CRM for Solopreneurs: 7 Tested for 90 Days (~58 caracteres)
>
> **H2: ¿Los solopreneurs realmente necesitan un CRM?**
> Intención: responde el PAA más-preguntado, captura el featured snippet, y prepara el resto.
> Puntos clave: respuesta de 40 palabras en el primer párrafo. Después la versión honesta — la mayoría de los solopreneurs con menos de 20 clientes no necesita uno todavía, pero aquí es cuando se voltea.
> Internal link: linkea a `/crm-pricing-teardown` desde el anchor text "CRM pricing tiers"
> PAA: sí — esta sección también cubre el PAA #2
>
> **H2: Cómo probé estos 7 CRMs**
> Intención: establece E-E-A-T. Esta es la sección que hace que Google confíe en el resto.
> Puntos clave: timeline (90 días cada uno), lo que se probó (tiempo de setup, time to first deal logged, fricción de uso diario, fricción de cancelación), lo que no (features enterprise, team plans sin gate).
> Internal link: ninguno todavía — podría ganar uno con una galería de screenshots como sub-página después.
>
> **H2: Los 7 CRMs, rankeados**
> Intención: la carne principal. Cada subhead es un CRM con un veredicto claro.
> Puntos clave: cada entrada tiene un bloque de 200 palabras con: tier elegido, costo mensual, veredicto de 1 línea, qué funcionó, qué se rompió, lo mantendría.
> Internal link: linkea a `/honeybook-vs-dubsado` desde "HoneyBook vs. Dubsado deep dive" donde sea relevante.
> Keywords secundarias para tejer naturalmente: "free CRM for freelancers", "CRM for one-person business", "simple CRM", "lightweight CRM".
>
> **H2: CRMs gratis: cuál realmente elegiría** (cubre PAA #1)
> Intención: capturar el tráfico del modificador "free" sin hacer todo el artículo sobre lo gratis.
> Puntos clave: HubSpot Free es el default obvio; el gotcha honesto en 1,000 contactos; qué usar si tienes menos de 25 clientes (una plantilla de Notion frecuentemente le gana a todo CRM gratis).
> Internal link: ninguno — pero si tienes una página de plantilla CRM de Notion, linkéala.
>
> **H2: ¿HubSpot es bueno para solopreneurs?** (cubre PAA #3)
> Intención: responder al PAA específico de marca sin hacer el artículo HubSpot-vs-todos.
> Puntos clave: 100-150 palabras. Respuesta honesta (sí, con caveats). Dónde sobre-sirve a un solopreneur.
>
> **H2: Qué realmente elegiría — y la razón aburrida del por qué**
> Intención: sección diferenciadora. Opinión fuerte, sin sentarse en la cerca.
> Puntos clave: nombra un ganador. Nombra al segundo lugar. Nombra el que evitar. Recibos.
>
> **H2: Cómo cambiar de CRM sin perder data**
> Intención: capturar la intención long-tail de "cómo migrar" + dar al artículo valor práctico.
> Puntos clave: formatos de export, lo que no se transfiere, el approach de corrida en paralelo de 1 semana.
> Internal link: si tienes una página `/data-migration-guide`, linkéala.
>
> **Preguntas frecuentes**
> H3: ¿Cuál es el CRM más fácil de usar para solopreneurs? *(cubre PAA #4)*
> H3: ¿Cuánto debería pagar un solopreneur por un CRM?
> H3: ¿Puedo usar Notion como CRM?
> H3: ¿Cuándo debería un solopreneur subir de una spreadsheet a un CRM?
>
> **Meta title:** Best CRM for Solopreneurs: 7 Tested in 90 Days (52 caracteres)
>
> **Meta description:** Pagué y usé 7 CRMs por 90 días cada uno como negocio de una persona. Aquí está el que mantuve, el que cancelé más rápido, y lo que los sitios de comparación se equivocan. (160 caracteres)
>
> **Recomendación de schema:** Article + FAQPage. Sáltate el schema de Product a menos que estés agregando páginas individuales de review de producto — el artículo es comparativo, no una review de un solo producto.
>
> **Plan de inyección de E-E-A-T:**
> - Apertura en primera persona: "Soy [nombre], llevo [tipo de negocio], y pago por las herramientas de mi bolsillo. Esto es lo que 90 días de pruebas me enseñaron."
> - Screenshots reales en el H2 para cada CRM (pantalla de signup, dashboard, flujo de cancelación)
> - Números reales: time-to-first-deal-logged, costo mensual pagado, score de fricción de cancelación (tu propia escala)
> - Bio de autor al final con rol + antigüedad + un link a tus otras reviews
> - Si tomaste dinero de alguno de los CRMs (afiliado, sponsorship), divulga al inicio, no al final

---

## Errores comunes de outline que el kit marcará

- **Ninguna sección anchoring el featured snippet.** Si el SERP tiene un featured snippet, quieres que tu H2 lo conteste en las primeras 40-60 palabras.
- **Preguntas PAA ignoradas.** Si People Also Ask está en el SERP, estás dejando una victoria de FAQ section sobre la mesa.
- **Una sección gigante.** Si un H2 tiene 600+ palabras debajo, divídelo. Los resultados de búsqueda escanean H2s y H3s.
- **Internal links sin nombre.** "Linkea a contenido relacionado" no ayuda a nadie. Nombra el anchor y el target.
- **Meta description que solo reescribe el H1.** Google las reescribe. Escribe una promesa real de dos frases.
- **Sin inyección de E-E-A-T.** El outline no llega a ningún lado si no hay un plan para experiencia en primera persona.

---

## Cómo usar el outline una vez que lo tengas

1. Léelo una vez. ¿Estás en desacuerdo con algo? Pídele a la IA que defienda la elección o que revise.
2. Llena los placeholders que necesitan TU data (números reales, screenshots reales, anécdotas reales).
3. Aprueba el outline antes de pedir el draft completo. No dejes que la IA escriba 2,500 palabras y después te des cuenta de que la estructura está mal.
4. Genera el draft sección por sección. El optimization pack se encarga de esto — cada sección abre con una respuesta lista para featured-snippet, después profundiza.
5. Pasa el draft por el generador de meta + schema (`templates/meta-and-schema.md`) antes de publicar.
