# Secuencias de Email

Las cinco secuencias que cada tienda de Shopify necesita corriendo. Abandoned cart, welcome series, browse abandonment, post-purchase, win-back. Cada una está configurada para Klaviyo (o Mailchimp) — la estructura es agnóstica a plataforma.

Cada email incluye: subject line (menos de 50 caracteres), preview text (menos de 90 caracteres), cuerpo. El kit produce el set completo en un prompt o un email a la vez dependiendo de la necesidad del usuario.

---

## Secuencia de abandoned cart (3 emails)

El flow de mayor leverage en DTC. La tasa de recovery estándar de la industria es 10-15% de carritos abandonados; los flows bien-afinados pegan 20%+.

**Tiempos de envío:** 1 hora después del abandono, 24 horas después, 72 horas después.

### El prompt

```
Estás escribiendo una secuencia de abandoned cart de 3 emails.

Marca: [3-5 notas de voz]
AOV promedio: [$X — afecta si el email 3 debería incluir un descuento]
Categoría de producto: [apparel / hogar / belleza / comida / suplementos / etc.]
Objeciones comunes: [lista 2-3 cosas en las que los clientes dudan — costo de envío, incertidumbre de sizing, política de devolución, preguntas de ingredientes]

Saca 3 emails:
- Email 1 (enviar 1 hora después del abandono): nudge amistoso, sin descuento, foco en el producto que dejaron
- Email 2 (enviar 24 horas después): aborda la objeción más probable
- Email 3 (enviar 72 horas después): incentivo — descuento, envío gratis o prueba social dependiendo del AOV

Para cada uno: subject line (menos de 50 caracteres), preview text (menos de 90 caracteres), cuerpo (120-200 palabras).
Sin palabras prohibidas. Sin urgencia falsa.
```

### Ejemplo trabajado — marca de belleza, AOV $60

**Email 1 (1 hora después):**
```
Asunto (32 caracteres): ¿Tu carrito se fue por ahí?
Preview (78 caracteres): El humectante de ceramidas que estabas viendo sigue aquí cuando estés listo.

Hola [first name],

Parece que estabas checando el humectante de ceramidas hace rato. Sigue en tu carrito si quieres retomar donde lo dejaste.

Algunas cosas que la gente usualmente quiere saber antes de ordenar:
- Envío gratis sobre $50
- Política de devolución de 60 días, incluso en botellas abiertas
- Envía dentro de 1-2 días hábiles desde Toronto

[Volver a tu carrito →]

Si decidiste que no era el fit correcto, sin problema. Somos fáciles de alcanzar si quieres preguntar algo.

— [Marca]
```

**Email 2 (24 horas después — abordando la objeción "¿esto es correcto para mi piel?"):**
```
Asunto (44 caracteres): Sobre el humectante en tu carrito
Preview (82 caracteres): Nota rápida sobre qué hace que el nuestro funcione para piel sensible, sobre-stripped.

Hola [first name],

Nota rápida — la pregunta más común que recibimos sobre el humectante de ceramidas es "¿esto funcionará para mí?".

Está construido para:
- Piel que es reactiva a activos o fragancia
- Personas usando retinol u otros activos que necesitan una base de baja irritación
- Cualquiera que haya estado sobre-limpiando o stripping la barrera

Probablemente no es el fit correcto si:
- Estás buscando una crema oclusiva pesada para la noche
- Quieres un gel fuertemente hidratante — este es un humectante balanceado, no una bomba de hidratación

Si eso aplica, [la botella en tu carrito] está aquí.

Si quieres preguntar algo antes de ordenar, responde a este email. Los leo.

— [Nombre del Founder]
```

**Email 3 (72 horas después — incentivo suave):**
```
Asunto (37 caracteres): Una última nota antes de soltarlo
Preview (76 caracteres): 10% off en el carrito que empezaste, más recordatorio de por qué la gente se queda.

Hola [first name],

Voy a dejar este en tus manos. El carrito que empezaste hace unos días — lo vamos a mantener por las próximas 48 horas con 10% off si lo quieres.

Usa el código STILLHERE en el checkout.

Para lo que vale: tenemos un rating de 4.8 estrellas a través de 1,400+ reviews, y el humectante es nuestro producto más-reordenado (la mayoría de los clientes vuelven por una segunda botella dentro de 10 semanas).

[Usa STILLHERE en tu carrito →]

De cualquier forma, espero que encuentres lo que estás buscando.

— [Marca]
```

---

## Welcome series (4 emails en 30 días)

Enviada a suscriptores de email de primera vez (signups vía pop-up, form del footer o post-purchase). 4 emails en 30 días.

**Tiempos de envío:** inmediatamente, día 3, día 10, día 28.

### El prompt

```
Estás escribiendo una welcome series de 4 emails para nuevos suscriptores.

Marca: [3-5 notas de voz]
Historia de marca (1-3 frases): [pega — qué hace que esta marca exista]
Rango de producto: [3-5 categorías o productos hero]
Incentivo de sign-up: [lo que prometimos — 10% off, envío gratis, etc.]

Saca 4 emails:
- Email 1 (inmediato): gracias + código de incentivo de primera compra
- Email 2 (día 3): historia de marca — máximo 1 minuto de lectura
- Email 3 (día 10): best-sellers o cómo elegir lo que es correcto para ti
- Email 4 (día 28): comunidad / pedido de review / CTA de referral

Para cada uno: subject line (menos de 50 caracteres), preview text (menos de 90 caracteres), cuerpo (150-250 palabras).
Sin palabras prohibidas.
```

### Ejemplo trabajado — marca de home goods, incentivo de sign-up: envío gratis

**Email 1 (inmediato):**
```
Asunto (28 caracteres): Bienvenido — tu código abajo
Preview (75 caracteres): Envío gratis en tu primer pedido, más un rundown rápido de lo que hacemos.

Hola [first name],

Bienvenido. Usa el código FIRSTSHIP en el checkout para envío gratis en tu primer pedido.

Hacemos home goods small-batch — velas, cerámicas, textiles — desde un taller en Vancouver. Todo está hecho en batches de 20-40, y la mayoría se agota dentro de un mes del reabastecimiento.

Algunas cosas que vale la pena saber:
- Nuevos batches salen el primer viernes de cada mes
- Le mandamos email a los suscriptores 24 horas antes del release público
- Las devoluciones se aceptan en velas sin abrir y textiles sin usar dentro de 30 días

Si tienes preguntas antes de ordenar, responde a este email. Llega a mi escritorio.

— [Nombre del Founder]

[Código: FIRSTSHIP — Envío gratis, primer pedido]
```

**Email 2 (día 3 — historia de marca):**
```
Asunto (33 caracteres): Cómo este lugar llegó a existir
Preview (85 caracteres): Una historia corta de por qué hacemos velas de cera de abeja y cerámicas slow-fire en 2026.

[Historia de marca de 150-200 palabras — manténla fundamentada; sin lenguaje de "pasión"; muestra la razón real por la que la marca existe]
```

**Email 3 (día 10 — best-sellers / guía):**
```
Asunto (42 caracteres): Si no sabes por dónde empezar...
Preview (88 caracteres): Algunas de nuestras cosas más-reordenadas, más con qué la gente las empareja.

[Guía de producto de 150-250 palabras; 3-4 best-sellers con razones de una línea]
```

**Email 4 (día 28 — referral / CTA de review):**
```
Asunto (37 caracteres): Una pequeña petición si ordenaste
Preview (89 caracteres): Si algo que compraste aterrizó bien — ¿nos contarías al respecto?

[Pedido corto de un review sobre lo que compraron, O un CTA de referral si no han comprado todavía]
```

---

## Browse abandonment (2 emails)

Enviada a suscriptores que vieron un producto pero no agregaron al carrito. Menor-intención que cart abandonment — el tono es más suave.

**Tiempos de envío:** 4 horas después de una vista de producto, 48 horas después.

### Prompt compacto

```
Marca: [3-5 notas de voz]
Producto visto: [nombre del producto + descripción de 1 frase]
Razón común por la que alguien navega sin agregar: [pega — precio, sizing, ingredientes, no tuvo tiempo]

Saca:
- Email 1 (4 horas después de la vista): mensaje ligero "solo para que tengas el link"
- Email 2 (48 horas después de la vista): una pieza de info útil (extracto de review, respuesta de una línea a una objeción común)

Cada uno: subject menos de 50 caracteres, preview menos de 90 caracteres, cuerpo 80-150 palabras.
Sin palabras prohibidas. Sin descuento en esta secuencia.
```

---

## Secuencia post-purchase (3 emails)

Enviada después de completar el pedido. Confirmación de pedido, notificación de envío, pedido de review.

**Tiempos de envío:** inmediatamente, en confirmación de envío, 10-14 días después de la entrega (para consumibles) o 21-30 días después de la entrega (para compras consideradas).

### El patrón

Los primeros dos (confirmación de pedido, envío) son mayormente transaccionales pero el kit los hace más cálidos que las plantillas default de Shopify. El tercero (pedido de review) es donde la escritura importa.

```
Marca: [notas de voz]
Producto recién entregado: [nombre]
Plataforma de review: [Judge.me / Yotpo / Loox / Shopify nativo]
Incentivo (si lo hay): [descuento en próxima compra, entrada en un giveaway, ninguno]

Saca el email de pedido de review:
- Subject (menos de 50 caracteres)
- Preview (menos de 90 caracteres)
- Cuerpo (100-180 palabras)
- Un solo CTA claro para dejar un review
- Reconoce que los reviews son un pedido pequeño y una ayuda real
- Sin palabras prohibidas
- No prometas que el review se publicará o que debería ser de 5 estrellas
```

### Ejemplo trabajado — marca de suplementos

```
Asunto (39 caracteres): Espero que el magnesio esté funcionando
Preview (88 caracteres): Dos semanas adentro es cuando la mayoría nota — pedido rápido si tienes un sec.

Hola [first name],

Dos semanas adentro es usualmente cuando la gente empieza a notar si el magnesio está haciendo lo que esperaban, o si no es el fit correcto.

Si tienes 60 segundos, ¿dejarías un review rápido? Lo honesto es más útil a otra gente que lo positivo — si no funcionó para ti, preferiríamos saberlo.

[Deja un review →]

Y si algo salió — el producto equivocado, problemas con la cápsula, lo que sea — responde a este email y lo resolvemos.

Gracias por probarnos.

— [Founder]
```

---

## Win-back (2 emails)

Enviada a clientes que no han ordenado en 60-120 días (dependiendo de la categoría — consumibles = más corto, considerados = más largo).

**Tiempos de envío:** 60 días lapsed, 90 días lapsed.

### El prompt

```
Marca: [notas de voz]
Frecuencia promedio de pedido para esta marca: [cada X semanas para consumibles, etc.]
Productos más-probables-de-reordenar: [lista 2-3]

Saca 2 emails:
- Email 1 (60 días): check-in sin presión, pregunta si todo está bien
- Email 2 (90 días): incentivo de baja fricción — 15% off, envío gratis o recordatorio de reabastecimiento

Cada uno: subject menos de 50 caracteres, preview menos de 90 caracteres, cuerpo 100-180 palabras.
Sin palabras prohibidas. No impliques que el cliente se está quedando atrás. Respeta la autonomía.
```

### Ejemplo trabajado — marca de café

**Email 1 (60 días):**
```
Asunto (38 caracteres): Sin presión — check-in rápido
Preview (75 caracteres): Solo asegurándome que tu situación de café no se haya ido de lado desde la primavera.

Hola [first name],

Han pasado cerca de dos meses desde tu último pedido — quería hacer check-in. Sin presión a reordenar; solo asegurándome de que no dejamos caer la bola en algún lado.

Si se te acabó y te ocupaste, [la Etiopía Guji que compraste la última vez sigue en el menú]. Si estás probando algo nuevo de un roaster distinto, eso es genial — avísame con qué terminaste y podría agregarlo a una lista de sourcing.

— [Founder]
```

---

## Lo que las buenas secuencias de email no hacen

- **Descuento en el email 1.** Entrena al cliente a esperar el descuento y los has entrenado a nunca pagar precio completo.
- **Mandar el mismo copy genérico sin importar la categoría.** Un abandoned-cart de suplementos debería sonar distinto a un abandoned-cart de velas.
- **Usar countdown timers falsos.** Los clientes los ven y la confianza se erosiona.
- **Enterrar el link de unsubscribe.** Hazlo findable. El boost de calidad de lista por unsubscribes limpios vale el pequeño hit de tamaño de lista.
- **Mandar el email de win-back como si el cliente te debiera algo.** Respeta la autonomía. El cliente tiene el derecho a no volver.
