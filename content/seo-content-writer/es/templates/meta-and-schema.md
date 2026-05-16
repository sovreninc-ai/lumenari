# Toolkit de Meta + Schema

Dos campos aburridos y un bloque de JSON que mueven más tráfico que la mayoría de las reescrituras de artículo. Este archivo te da los prompts para generarlos y los ejemplos trabajados para copiar.

---

## Parte 1 — Meta titles

### Cómo se ve lo bueno

- 50-60 caracteres (Google trunca alrededor de 600px en desktop; ~60 caracteres es el límite seguro)
- Keyword primaria en la primera mitad
- Una razón para clickear que no sea solo el match de keyword
- Sin clickbait, sin all-caps, sin `[2026]` innecesario

### El prompt

```
Eres el SEO Content Strategist.

Genera 5 variantes de meta title para este artículo.

**Keyword primaria:** [keyword]
**Ángulo del artículo:** [una frase sobre lo que el artículo realmente argumenta o entrega]
**Intención:** [informational / commercial / etc.]
**Sufijo de marca (opcional):** [p. ej. " | TuMarca" — solo si entra en el límite de caracteres]

Para cada variante, dame:
- El título
- Conteo de caracteres (con sufijo de marca si se usa)
- El hook: qué hace que alguien lo clickee sobre los top 3 resultados

Evita: clickbait, all caps, tag genérico de "[AÑO]" a menos que el tema sea genuinamente time-sensitive.
```

### Ejemplo de output trabajado — "best CRM for solopreneurs"

1. **Best CRM for Solopreneurs: 7 Tested in 90 Days** (52 caracteres) — hook: especificidad + duración como prueba
2. **Best CRM for Solopreneurs (One I Cancelled Fast)** (50 caracteres) — hook: recibo contrarian
3. **Best CRM for Solopreneurs: The Honest Comparison** (50 caracteres) — hook: "honest" implica que los otros no lo son
4. **Best CRM for Solopreneurs: $X/mo Tools Compared** (47 caracteres) — hook: lidera con el precio
5. **Best CRM for Solopreneurs: Notion Won Against 6 Apps** (53 caracteres) — hook: revela la respuesta, dispara el clic de "espera, qué"

El más fuerte de estos depende de cuál diferenciador apoye realmente el artículo. #1 es el default más seguro. #5 solo funciona si Notion realmente ganó.

---

## Parte 2 — Meta descriptions

### Cómo se ve lo bueno

- 140-160 caracteres
- Promesa de dos frases: lo que entregas + por qué vale leerlo
- No reescribas el H1
- No termines con "¡Leer más!" (Google lo quita)
- Incluye la keyword primaria una vez, naturalmente

### El prompt

```
Eres el SEO Content Strategist.

Genera 3 variantes de meta description para este artículo.

**Meta title:** [título que elegiste]
**Keyword primaria:** [keyword]
**Ángulo del artículo:** [una frase sobre lo que el artículo realmente argumenta o entrega]
**Top 3 cosas que un lector va a sacar del artículo:** [lista bullet]

Para cada variante:
- La descripción
- Conteo de caracteres
- Con qué "promesa" lidera
```

### Ejemplo de output trabajado

Para el artículo de CRM:

1. **"Pagué y usé 7 CRMs por 90 días cada uno como negocio de una persona. Aquí está el que mantuve, el que cancelé más rápido, y lo que cada sitio de comparación se equivocó."** (160 caracteres) — lidera con la prueba de duración

2. **"La mayoría de las listas de 'mejor CRM' se escriben desde press releases. De hecho probé 7 — fricción de uso diario, costos reales, flujos de cancelación reales. El veredicto me sorprendió."** (158 caracteres) — lidera con el ángulo de contraste/contrarian

3. **"El mejor CRM para solopreneurs no es el que tiene la lista de features más larga. Después de 90 días probando 7, aquí está el que vale pagar y el que saltarse."** (152 caracteres) — lidera con la tesis

Si no estás seguro cuál elegir, publica #1. El verbo "pagué" hace mucho trabajo — señala costo y esfuerzo de primera mano.

---

## Parte 3 — Generadores de schema

### Qué schema usar cuándo

| Tipo de artículo | Schema |
|---|---|
| Post de blog, artículo de noticias | Article |
| Artículo con sección FAQ que genuinamente responde FAQ | Article + FAQPage |
| Instruccional paso-a-paso ("Cómo hacer X") | HowTo |
| Página de review de un solo producto | Product (solo con reviews REALES) |
| Comparación o listicle | Article (NO Product a menos que estés reviewando un producto específico) |

### Prompt de schema Article

```
Eres el SEO Content Strategist.

Genera JSON-LD de Article para esta página.

**Headline:** [el H1]
**URL:** [URL canonical completa]
**Nombre del autor:** [byline]
**URL del autor:** [opcional — página de autor o LinkedIn]
**Nombre del publisher:** [nombre del sitio]
**URL del logo del publisher:** [URL de imagen del logo]
**Fecha de publicación:** [YYYY-MM-DD]
**Fecha de modificación:** [YYYY-MM-DD]
**URL de la imagen destacada:** [imagen hero]
**Descripción:** [meta description]

Output JSON-LD listo para validación con todas las propiedades requeridas + recomendadas. Usa contexto de schema.org.
```

**Ejemplo de output trabajado:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best CRM for Solopreneurs: 7 Tested in 90 Days",
  "image": "https://solo-saas-reviews.com/images/crm-test-hero.jpg",
  "author": {
    "@type": "Person",
    "name": "Chris Holwell",
    "url": "https://solo-saas-reviews.com/author/chris-holwell"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Solo SaaS Reviews",
    "logo": {
      "@type": "ImageObject",
      "url": "https://solo-saas-reviews.com/logo.png"
    }
  },
  "datePublished": "2026-05-14",
  "dateModified": "2026-05-14",
  "description": "Pagué y usé 7 CRMs por 90 días cada uno como negocio de una persona. Aquí está el que mantuve, el que cancelé más rápido, y lo que cada sitio de comparación se equivocó.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://solo-saas-reviews.com/best-crm-solopreneurs"
  }
}
```

Suelta eso dentro de un bloque `<script type="application/ld+json">` en el `<head>` de la página.

### Prompt de schema FAQ

Solo usa esto si la página tiene una sección FAQ visible que realmente responda estas preguntas. No publiques schema de FAQ para preguntas que no estén en la página — eso es una violación y se gana una manual action.

```
Eres el SEO Content Strategist.

Genera JSON-LD de FAQPage para esta página.

**URL de la página:** [URL]
**Pares Q&A de FAQ:**
1. P: [pregunta]
   R: [la respuesta como está escrita en la página — texto completo]
2. P: [pregunta]
   R: [respuesta]
[Etc.]

Importante: cada Q&A aquí DEBE ser visible en la página. Si no está en la página, no la incluyas. Confirma antes de generar si hay alguna ambigüedad.

Output JSON-LD listo para validación.
```

**Ejemplo de output trabajado:**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Los solopreneurs necesitan un CRM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La mayoría de los solopreneurs con menos de 20 clientes activos no necesitan un CRM dedicado. Una spreadsheet o una plantilla de Notion maneja el mismo volumen con menos fricción. El umbral para subir tiende a ser cuando pierdes pista de follow-ups o cuando las conversaciones con clientes abarcan múltiples canales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el CRM más fácil para solopreneurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basado en 90 días de pruebas, el más fácil de aprender fue HubSpot Free, y el más fácil de seguir usando a diario fue un empate entre FollowUpBoss y una plantilla CRM de Notion. 'Más fácil' depende de si valoras velocidad de setup o baja fricción a largo plazo."
      }
    },
    {
      "@type": "Question",
      "name": "¿HubSpot es bueno para solopreneurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí para solopreneurs creciendo hacia 100+ contactos. HubSpot Free es sobrado para el use case pero el upgrade path es empinado — los tiers pagados están cotizados para equipos, no individuos. Si te quedas solo, vas a superar el gratis y subutilizar el pagado."
      }
    }
  ]
}
```

### Prompt de schema How-To

Solo usa para contenido instruccional genuinamente paso-a-paso. "Cómo empezar un podcast" con pasos discretos califica. "Cómo pensar sobre tu marca" no — eso es un ensayo, no un how-to.

```
Eres el SEO Content Strategist.

Genera JSON-LD de HowTo para esta página.

**Headline:** [el H1, debe empezar con "Cómo..."]
**Descripción:** [resumen de una frase]
**Tiempo total:** [estimado, en formato de duración ISO 8601 — p. ej. PT2H para 2 horas]
**Supply (opcional):** [cosas que el usuario necesita tener]
**Tool (opcional):** [herramientas necesarias]
**Pasos:** [lista numerada — cada paso tiene un nombre, texto, y opcionalmente una URL de imagen]

Output JSON-LD listo para validación.
```

**Ejemplo de output trabajado** (para "How to launch a podcast in a weekend"):

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Launch a Podcast in a Weekend",
  "description": "Un plan de launch de dos días cubriendo grabación, edición, hosting y distribución.",
  "totalTime": "PT16H",
  "supply": [
    { "@type": "HowToSupply", "name": "Micrófono USB" },
    { "@type": "HowToSupply", "name": "Espacio de grabación silencioso" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Audacity o GarageBand" },
    { "@type": "HowToTool", "name": "Cuenta de Buzzsprout o Transistor" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Elige el formato y escribe el primer episodio",
      "text": "Decide entre solo, entrevista o co-host. Escribe un primer episodio de 10 minutos que tú querrías escuchar."
    },
    {
      "@type": "HowToStep",
      "name": "Graba el episodio uno",
      "text": "Usa una habitación silenciosa, micrófono USB a 6 pulgadas de la boca, una sola toma. No edites mientras grabas."
    },
    {
      "@type": "HowToStep",
      "name": "Edita y exporta",
      "text": "Remueve silencio de más de 2 segundos. Normaliza audio a -16 LUFS. Exporta como MP3, 128 kbps."
    },
    {
      "@type": "HowToStep",
      "name": "Configura hosting y envía a directorios",
      "text": "Crea una cuenta de hosting, sube el episodio uno, genera tu RSS feed, envía a Apple Podcasts y Spotify."
    }
  ]
}
```

### Prompt de schema Product (con la advertencia)

```
Eres el SEO Content Strategist.

Genera JSON-LD de Product para esta página.

**Nombre del producto:** [nombre]
**Descripción:** [un párrafo]
**URL de imagen:** [imagen principal del producto]
**Marca:** [nombre de la marca]
**SKU (opcional):** [si aplica]
**Precio + moneda:** [p. ej. "29.00 USD"]
**Disponibilidad:** [InStock / OutOfStock / PreOrder]

**Reviews (solo si son reales):**
- Valor de rating agregado: [número de 5]
- Conteo agregado de reviews: [número]
- Reviews individuales de muestra (opcional, 1-3): cada una con autor + rating + texto

CRÍTICO: No incluyas aggregateRating a menos que la página tenga reviews reales, visibles y verificables. aggregateRating falso o fabricado gana manual actions y es fraude. Confirma antes de generar.

Output JSON-LD listo para validación.
```

---

## Errores comunes de schema que el kit marcará

- **Schema de FAQ con preguntas que no están en la página.** Violación. No lo hagas.
- **Schema de HowTo en contenido que en realidad no es how-to.** "Cómo pensar sobre pricing" es un ensayo; "Cómo migrar de HubSpot a Pipedrive" puede calificar.
- **aggregateRating de schema de Product sin reviews reales.** Este es uno de los caminos más rápidos a una manual action de Google.
- **Schema de Article con `dateModified` más viejo que `datePublished`.** Los validadores lo marcan; también pierdes el boost de freshness.
- **`@type` equivocado para el contenido.** Un artículo de comparación es un Article, no un Product.
- **Falta `mainEntityOfPage` en schema de Article.** Requerido para resultados de búsqueda más ricos.

---

## Cómo validar

Antes de publicar, corre el schema por:

- Google's Rich Results Test (`search.google.com/test/rich-results`) — confirma elegibilidad para rich results
- Schema.org Validator (`validator.schema.org`) — confirma que el JSON-LD está bien formado

Si alguno falla, arréglalo antes de publicar. No publiques schema roto; te cuesta más que no tener schema.
