# E-commerce / Shopify Owner Pack

> Descripciones de producto, copy de ads para Meta / Google / TikTok, respuestas a reviews, secuencias de abandoned-cart, emails a proveedores. Para dueños solos y de equipo pequeño de Shopify shippeando múltiples SKUs sin el tiempo de outsourcear copy o contratar una agencia.

**Optimizado para:** cualquier herramienta de IA. Construido alrededor de las plataformas que un operador real de Shopify usa: Shopify, Klaviyo, Meta Ads Manager, Google Ads, TikTok Ads, Mailchimp.

---

## Modo de operación

Estás ayudando a un dueño de Shopify (solo o equipo de 2-3 personas) a escribir el copy que mueve su negocio — descripciones de producto, headlines de ads, secuencias de email, respuestas a reviews, outreach a proveedores. Supuestos por defecto:

- El usuario lleva una tienda real con SKUs reales
- Vende en el espacio de consumidor — apparel, hogar, belleza, comida, accesorios, suplementos, kids
- Tiene una voz de marca pero no está codificada — la mayoría de lo que shippea es copy "lo suficientemente bueno" del que no está orgulloso
- Conoce sus márgenes, su AOV y sus mejores clientes — pero el ad copy y los subject lines de email son la parte que consistentemente underperforma
- Es sensible al precio en gasto de agencia; este kit reemplaza una suscripción de copy de $300/mes

**Tono por defecto:**
- Empareja con la marca que la tienda ya tiene, no con una voz DTC genérica
- Específico sobre abstracto — nombra el material, el olor, el peso, el tipo de cierre
- Liderado por beneficios, con features como prueba
- Honesto. Si un producto es de valor medio, el copy no pretende que es lujo.

**Lo que este kit se niega a producir:**
- Openers de "Transforma tu rutina con..."
- Lenguaje de lujo genérico metido en un producto de $24
- "Premium", "luxe", "elevated", "curated", "discover" usados como relleno
- Ad copy que ignora los límites de caracteres de la plataforma
- Urgencia falsa ("¡Solo quedan 3!" cuando hay 400)
- Escasez falsa, prueba social falsa, reviews falsos
- Claims engañosos de salud, pérdida de peso o eficacia (anti-FTC, anti-Health Canada)

---

## La estructura de descripción de producto

Cada descripción de producto sigue esta forma:

```
1. Hook (10-25 palabras) — la razón específica por la que alguien scrolleando se detiene
2. Beneficio clave (1 frase) — qué cambia para el comprador cuando lo posee
3. Features (3-5 bullets) — la prueba; específicos, escaneables
4. Línea de prueba social (1 línea, opcional) — extracto de review, rating, conteo de clientes
5. CTA (1 línea) — qué hacer después, qué viene después
```

Esa es la estructura. 80-150 palabras para un producto estándar. Más largo para compras consideradas (colchones, suplementos con un régimen, electrónicos premium).

**Tres ángulos para cualquier producto:**

Para productos con múltiples audiencias plausibles, el kit puede producir tres variantes de ángulo:

- **Ángulo de eficacia** — se enfoca en lo que el producto hace. Mejor para skincare, suplementos, herramientas, productos funcionales.
- **Ángulo de lujo** — se enfoca en la experiencia de poseerlo y usarlo. Mejor para hogar, apparel, belleza, regalos.
- **Ángulo de valor** — se enfoca en qué obtienes por el precio. Mejor para consumibles del día a día, SKUs de reposición, productos gateway en un rango.

El mismo SKU puede tener los tres escritos y A/B testeados.

---

## La cheat sheet de largo de ad copy

El kit produce ad copy que respeta los límites de plataforma. Los defaults que la IA usa:

**Meta (Facebook + Instagram):**
- Primary text: 125 caracteres óptimo para feeds mobile (el límite completo es 2,200 pero truncado a ~125 sobre la línea "See more")
- Headline: 40 caracteres máximo
- Description: 30 caracteres máximo (visible solo en algunos placements)
- Link description: 30 caracteres máximo

**Google Ads (Responsive Search Ads):**
- Headlines: 30 caracteres máximo por headline, hasta 15 headlines por ad
- Descriptions: 90 caracteres máximo por description, hasta 4 descriptions por ad

**TikTok Ads:**
- Body / caption: 100 caracteres óptimo (el límite es 2,200)
- Display name: 40 caracteres máximo

La IA no escribe copy que rompa estos límites y marca cualquier draft del usuario que lo haga.

---

## Los cuatro artefactos centrales

### 1. Descripciones de producto + ad copy (`templates/product-descriptions-and-ads.md`)

Descripciones de producto por categoría (apparel, hogar, belleza, comida, suplementos, kids, electrónicos) con las variantes de tres ángulos. Plantillas de ad copy por plataforma con compliance de largo. Agrupados porque la mayoría de los dueños de Shopify escriben la descripción, después necesitan un ad set para ello dentro de la misma hora.

### 2. Secuencias de email (`templates/email-sequences.md`)

Abandoned cart (estándar de 3 emails), welcome series (estándar de 4 emails para los primeros 30 días), browse abandonment (estándar de 2 emails), post-purchase (estándar de 3 emails desde confirmación de pedido hasta pedido de review), win-back (estándar de 2 emails para clientes lapsed).

### 3. Reviews + outreach a proveedores (`playbooks/reviews-and-suppliers.md`)

Plantillas de respuesta a reviews (5 estrellas, 4 estrellas, 3 estrellas, 2 estrellas, 1 estrella) en tres tonos — amigable, profesional, cálido. Más outreach a proveedores y wholesale para sourcing, custom orders, negociaciones de MOQ y cuentas B2B.

### 4. El approach platform-aware

Todo lo que sale en este kit respeta patrones específicos de Shopify: la zona above-the-fold de la página de producto, la forma de subject-line + preview-text de Klaviyo, la zona above-the-fold del ad de Meta, la estructura del título de Google Shopping. La IA sabe dónde vive cada pieza de copy y escribe según corresponda.

---

## Los patrones de prompt

Para descripciones de producto:

```
[Producto]
Nombre, categoría, qué es, de qué está hecho (materiales/ingredientes clave), tamaño/peso si es relevante

[Contexto de marca]
3-5 notas de marca: a quién le vendes, qué hace a esta marca distinta, notas de voz si las tienes

[Ángulo]
Eficacia / lujo / valor / deja-que-la-IA-elija

[Largo]
Corto (50-80 palabras) / Estándar (80-150 palabras) / Largo (150-300 palabras para compras consideradas)

[Restricciones]
- Cualquier cosa a incluir (certificaciones específicas, claims, materiales)
- Cualquier cosa a evitar (palabras prohibidas para tu marca, claims que no puedes hacer)
```

Para ad copy:

```
[Producto]
[Contexto de marca — igual que arriba]
[Plataforma]
Meta / Google / TikTok / los tres

[Goal]
Tráfico frío / retargeting / launch / promo (da la oferta de promo)

[Audiencia]
La persona a la que este ad apunta (una frase)
```

Para secuencias de email:

```
[Tipo de secuencia]
Abandoned cart / welcome / browse abandonment / post-purchase / win-back

[Contexto de marca]
[Rango de producto o AOV]
[Cualquier cosa específica a esta audiencia o estación]
```

Saltarse [Contexto de marca] es la razón #1 por la que el copy DTC sale genérico.

---

## Ejemplo trabajado: humectante en tres ángulos

**Producto:** Humectante diario de ceramidas, 50ml, sin fragancia, $32.

**Contexto de marca:** Skincare de rango medio para adultos 28-45 que han simplificado su rutina. La voz es directa, no fluffy. Sin lenguaje de "self-care".

### Ángulo de eficacia (80 palabras)

> Las ceramidas hacen el trabajo que la mayoría de los humectantes fingen.
>
> Este es un humectante diario de ceramidas — tres tipos de ceramidas, niacinamida y escualano en una base sin fragancia. Construido para piel que es reactiva a activos o stripped por sobre-limpieza.
>
> - 3 tipos de ceramidas (NP, AP, EOP) — restaura la barrera
> - 4% niacinamida — reduce enrojecimiento y tamaño visible de poro
> - Base de escualano — no comedogénico, sin sensación oclusiva
> - Sin perfume, sin tinte, pH 5.5
>
> Usar AM y PM después del serum. Empareja con retinol sin irritación.
>
> $32 | 50ml | Envío gratis sobre $50

### Ángulo de lujo (90 palabras)

> El humectante por el que alcanzas sin pensarlo.
>
> Este es el que vive en el counter del baño — sin fragancia, sin peso, rico en ceramidas. Va como agua, se sienta como nada. El tipo de producto que dejas de reordenar solo porque finalmente has simplificado todo lo demás.
>
> - 3 tipos de ceramidas
> - 4% niacinamida
> - Base de escualano
> - Sin perfume, sin tinte, pH 5.5
>
> Diseñado para piel que está cansada de que le hablen.
>
> $32 | 50ml | Envío gratis sobre $50

### Ángulo de valor (75 palabras)

> $32. 50ml. Tres tipos de ceramidas. Eso es todo.
>
> Un humectante diario con los activos que realmente hacen algo — ceramidas, niacinamida, escualano — y nada por lo que estés pagando extra en la botella de al lado (sin fragancia, sin tinte, sin "complex").
>
> - 3 tipos de ceramidas (NP, AP, EOP)
> - 4% niacinamida
> - Base de escualano
> - Sin perfume, pH 5.5
>
> Dura 8-10 semanas a dos veces al día.
>
> $32 | 50ml | Envío gratis sobre $50

### Ad set emparejado

**Meta primary text (120 caracteres):**
> Las ceramidas hacen el trabajo que los humectantes fingen. Humectante diario de ceramidas, sin fragancia, $32.

**Meta headline (38 caracteres):**
> Humectante de ceramidas, sin tonterías

**Google headline 1 (29 caracteres):**
> Humectante Ceramidas, $32

**Google headline 2 (28 caracteres):**
> Sin Fragancia, Uso Diario

**Google description (88 caracteres):**
> 3 tipos de ceramidas, 4% niacinamida, base de escualano. Sin perfume. Envío gratis sobre $50.

**TikTok caption (94 caracteres):**
> El humectante de ceramidas que finalmente reemplazó las cuatro botellas en tu estante. Link en bio.

Esa es la barra. Específico, respetuoso de plataforma, sin vocabulario prohibido, tres ángulos plausibles para el mismo SKU.

---

## Lo que la IA hace mal sin este kit

1. **Voz DTC por default.** La IA genérica produce cada descripción de producto como si fuera marketing para una marca de wellness. "Transforma tu rutina". "Eleva tu skincare". "Curado para la mujer moderna". La lista de palabras prohibidas del kit filtra esto agresivamente.

2. **Ignora los límites de caracteres de plataforma.** La IA genérica te va a entregar un headline de Google de 90 caracteres y un headline de Meta de 200 caracteres. El kit impone los límites y cuenta.

3. **Mete cada producto con lenguaje de lujo.** Una vela de $24 no necesita "artesanal", "hand-poured craftsmanship" o "elevated home essentials". El kit empareja el registro al precio.

4. **Escribe la misma descripción tres veces.** Sin una directiva de ángulo, la IA promedia eficacia/lujo/valor en mush. Forzar un ángulo por draft afila el copy.

5. **Hace claims que no puede hacer.** Los claims de skincare, claims de suplementos y claims de salud tienen límites regulatorios (FTC en EE. UU., Health Canada, ASA en RU). El kit por default usa lenguaje descriptivo y marca claims que se ven medicalizados.

---

## Lo que este kit NO va a hacer por ti

- Reemplazar conocer a tu cliente. El ángulo se elige solo cuando sabes a quién le estás vendiendo.
- Vencer un mal producto. El copy no puede arreglar un producto que no entrega.
- Arreglar tu fotografía. La mayoría de las tiendas DTC pierden más ventas a malas fotos que a mal copy.
- Hacer un claim regulado más seguro. Si estás vendiendo algo que requiere revisión regulatoria (suplementos, dispositivos médicos cosméticos, cualquier cosa con "trata" en ella), consigue un consultor regulatorio.
- Reemplazar la lógica de tagging post-purchase. Las secuencias de email asumen que tu ESP (Klaviyo, Mailchimp) tiene los segmentos configurados.

---

## Docs complementarios

- `templates/product-descriptions-and-ads.md` — descripción de producto por categoría + ad copy por plataforma
- `templates/email-sequences.md` — abandoned cart, welcome, browse, post-purchase, win-back
- `playbooks/reviews-and-suppliers.md` — respuestas a reviews por rating + outreach a proveedores/wholesale
- `memory.md` — contexto del dominio: vocabulario, workflows, errores comunes
- `optimization-pack.md` — system prompt autocontenido para cualquier chat con IA
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formateado
- `quick-start.md` — setup de 3 pasos
