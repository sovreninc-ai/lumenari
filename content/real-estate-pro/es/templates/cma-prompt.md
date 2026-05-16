# Prompt de CMA + Tres Escenarios Trabajados de Comps

Prompts de comparative market analysis que producen un rango de precio defendible, no un único número generado desde promedios. Tres escenarios porque los listings reales rara vez vienen con comps limpios.

---

## El prompt maestro de CMA

Pega esto. El system prompt (`optimization-pack.md`) maneja tono y estructura; esto le da a la IA los inputs que necesita.

```
Corre un CMA para mí.

Propiedad sujeto:
- Dirección o barrio: [nombre]
- Recámaras / Baños / Sqft / Lote: [detalles]
- Año de construcción: [año]
- Condición (1-10): [#]
- Features notables que afectan el valor: [lista 3-5]

Ventas comparables (3-6, vendidas en los últimos 180 días, dentro de ~1 milla, perfil similar):

Comp 1:
- Dirección: [nombre]
- Precio vendido: USD $[monto]
- Fecha de venta: [fecha]
- Recámaras / Baños / Sqft / Lote / Año: [detalles]
- Condición: [#]
- DOM: [#]
- Una oración sobre cómo compara con el sujeto: [texto]

Comp 2:
[misma estructura]

Comp 3:
[misma estructura]

(continúa para tantos como tengas, hasta 6)

Actualmente activos o pendientes (2-3 si están disponibles):

Activo 1:
- Dirección: [nombre]
- Precio de lista: USD $[monto]
- DOM: [#]
- Una oración sobre cómo compara: [texto]

(continúa)

Mi lectura:
[Aunque sea una hipótesis. "Creo que vale entre USD $X y USD $Y porque Z". Esto ancla el análisis a mi juicio en vez de puro promedio de data.]

Salida que quiero:
- Rango de precio (bajo / probable / alto)
- 2-3 oraciones explicando el spread
- 3-5 preguntas para hacerle al vendedor antes de finalizar el precio de lista
- Cualquier cosa que hayas notado en los comps que debería estar listo a discutir en la cita de listing
```

---

## Escenario 1: Comps limpios, spread cerrado

Tienes 4-5 comps fuertes en los últimos 90 días, todos dentro del 10% del perfil del sujeto. Este es el caso fácil — el trabajo de la IA es confirmar tu lectura y sacar a la luz una o dos cosas que pudiste haber pasado por alto.

### Inputs

**Sujeto:** ranch 3 rec / 2 baños / 1,640 sqft en Sugar Land, TX. Lote de 0.18 acres. Construido 1998. Condición 7/10 — cocina reciente, baños originales. Garage para dos autos. HVAC actualizado (2022).

**Comp 1:** misma subdivisión, 1,580 sqft, vendido hace 38 días a USD $385,000. Updates similares. DOM 14.

**Comp 2:** subdivisión adyacente, 1,700 sqft, vendido hace 62 días a USD $402,000. Baños totalmente renovados (el sujeto no). DOM 9.

**Comp 3:** misma subdivisión, 1,610 sqft, vendido hace 71 días a USD $379,000. Cocina original. DOM 21.

**Comp 4:** misma subdivisión, 1,720 sqft, vendido hace 22 días a USD $398,000. Pool. DOM 7.

**Activo:** misma subdivisión, 1,680 sqft, listado a USD $409,000, 31 días en mercado. Totalmente actualizado.

**Mi lectura:** probablemente USD $388-395K. El comp con pool y el comp con baños renovados tiran arriba; el comp con cocina original tira abajo. Estoy pensando lista a USD $390K.

### Output (lo que la IA debería producir)

```
CMA — Sujeto: ranch 3/2/1640, Sugar Land

Resumen de comps:
- Comp 1 (USD $385K, hace 38d, 1580 sqft): el match más cercano — ajuste menor a la baja por sqft
- Comp 2 (USD $402K, hace 62d, 1700 sqft): empuje hacia arriba por baños renovados; el sujeto no
- Comp 3 (USD $379K, hace 71d, 1610 sqft): empuje hacia abajo por cocina vieja; el sujeto está actualizado
- Comp 4 (USD $398K, hace 22d, 1720 sqft): premium de pool aproximadamente USD $8-12K; remover para comparación justa ≈ USD $387-390K
- Activo 1 a USD $409K, 31 DOM: señal de techo — totalmente actualizado y ahí parado

Rango de precio:
- Bajo: USD $385,000
- Más probable: USD $389,000-USD $392,000
- Alto: USD $396,000 (solo con tráfico fuerte de showings en la primera semana)

Explicación: tu sujeto cae limpiamente entre el comp con cocina original y el comp con baños renovados, que es exactamente donde debería aterrizar el precio. El comp con pool ajusta abajo por la ausencia de pool. El activo a USD $409K lleva 31 días — esa es una señal clara de techo: el mercado no va a recompensar pricing de "totalmente renovado" sin baños renovados.

Tu lectura de USD $390K está bien respaldada. Sugeriría precio a USD $389,900 para aterrizar justo bajo el número redondo, con espacio para negociar a USD $385K si hace falta.

Preguntas para hacerle al vendedor antes de finalizar:
1. ¿Están firmes en precio o necesitan moverse para una fecha específica? Eso cambia la estrategia.
2. ¿Han listado y retirado vecinos recientemente? La actividad off-market importa.
3. ¿Van a pre-listar la documentación del HVAC (instalación de 2022)? Es un diferenciador real vs. Comp 3.
4. ¿Cuál es su piso? Define el walk-away antes de la primera semana.
5. ¿Están abiertos a una pre-inspección? Las losas-sobre-tierra de Sugar Land en builds de fines de los 90 a menudo sacan preguntas de foundation durante la inspección del comprador — adelantarse puede ahorrar 3-5% en la parte trasera.

Llegá a la cita listo para discutir: por qué el activo a USD $409K está sentado (es una lección de techo de pricing), y si quieren invertir en los baños o en staging antes de salir al mercado.

---
Cosas a verificar antes de publicar:
- Confirmar el estimado de ajuste por pool contra tu mercado
- Confirmar que el precio vendido de Comp 4 no incluya concesiones del vendedor
```

---

## Escenario 2: Comps débiles, precio defendible igual

Tienes un comp aceptable, dos estirados, y necesitas entrar a una cita de listing mañana. Este es el caso difícil — y la IA es más útil acá porque te fuerza a articular los ajustes en vez de adivinar.

### Inputs

**Sujeto:** custom contemporánea 5 rec / 4 baños / 3,800 sqft en un enclave chico en Boulder, CO. Lote de 0.5 acres. Construido 2019. Vistas a la montaña desde la suite principal y el great room. Condición 10/10.

**Comp 1:** mismo enclave, 3,600 sqft, vendido hace 11 meses a USD $2.45M. Custom pero con terminación más vieja (build 2016). DOM 67.

**Comp 2:** a 1.2 millas, 4,100 sqft, vendido hace 4 meses a USD $2.95M. Construcción nueva, sin vistas. DOM 41.

**Comp 3:** a 0.8 millas, 3,200 sqft, vendido hace 6 meses a USD $2.20M. Build de 2012, vista parcial a la montaña. DOM 22.

**Activo:** mismo enclave, 4,000 sqft, listado a USD $3.1M, 89 días en mercado.

**Mi lectura:** entre USD $2.7M y USD $2.95M, pero genuinamente no sé.

### Output

```
CMA — Sujeto: custom contemporánea 5/4/3800, Boulder

Evaluación honesta al frente: este es un set de comps fino. La señal más fuerte es Comp 2 (construcción nueva, 4 meses, USD $2.95M). Pero Comp 2 no tiene vistas y el sujeto sí, y Comp 2 es 8% más grande. Los otros dos comps requieren ajustes significativos.

Resumen de comps:
- Comp 1 (USD $2.45M, hace 11 meses, 3600 sqft): enclave correcto pero transacción de hace 3 años en un mercado que se movió; ajustar hacia arriba aproximadamente 8-12% por tiempo
- Comp 2 (USD $2.95M, hace 4 meses, 4100 sqft): la transacción reciente más limpia pero le faltan vistas y es 8% más grande
- Comp 3 (USD $2.20M, hace 6 meses, 3200 sqft): más chico, más viejo, vista parcial — solo direccional
- Activo a USD $3.1M, 89 DOM: señal real de techo — ese nivel de pricing en este enclave no ha cerrado en nueve meses

Rango de precio:
- Bajo: USD $2.75M
- Más probable: USD $2.85M-USD $2.95M
- Alto: USD $3.0M (agresivo — requiere dinámica de ofertas múltiples en los primeros 10 días)

Explicación: el premium por vista en este enclave corre ~5-8% basado en ciclos previos, lo que pone al sujeto a paridad con Comp 2 o levemente arriba a pesar de ser 8% más chico. La transacción envejecida de Comp 1, cuando se ajusta por tiempo, aterriza alrededor de USD $2.7-2.8M para una casa levemente más chica y menos actualizada, lo que respalda el extremo bajo del rango. El activo a USD $3.1M es el data point que argumenta contra precio arriba de USD $3.0M: una casa de tamaño similar en el mismo enclave no ha encontrado comprador en tres meses a ese nivel.

Recomendación: lista de USD $2,895,000, con piso defendible en USD $2.75M y techo stretch en USD $3.0M solo si la Semana 1 muestra volumen fuerte de showings.

Preguntas para el vendedor:
1. ¿Cuánto pagaron, cuándo, y qué le metieron? Esto ancla su expectativa.
2. ¿Hay comps off-market en el enclave a los que yo no tengo acceso? Los dueños de casas custom a veces saben.
3. ¿Cuánto pueden esperar si no se vende en 60 días? El activo a USD $3.1M lleva 89 — tu vendedor necesita entender qué señaliza eso.
4. ¿Están dispuestos a pre-listar con fotografía profesional de un fotógrafo arquitectónico específico de Boulder? Importa a este precio.
5. ¿Cuál es su número de walk-away? Defínelo antes de salir al mercado.

Llegá a la cita listo para discutir: el activo de 89 días y por qué el precio arriba de USD $3M es difícil de defender; el premium de vista como diferenciador clave vs. Comp 2; el timeline del vendedor como driver de la estrategia.

---
Cosas a verificar antes de publicar:
- Factor de ajuste por tiempo — confirmar contra el índice año-contra-año de precio de venta en Boulder
- Historia del comp activo (¿reducciones de precio? ¿off-market y después de vuelta?)
- Lista completa de materiales del sujeto — las custom contemporáneas varían mucho; los detalles de spec afectan el premium
```

---

## Escenario 3: Un comp trofeo tirando el número

La casa de un vecino se acaba de vender por un número que desafía al resto del set de comps. Tu vendedor escuchó del tema y ahora piensa que su casa vale lo mismo. El trabajo de la IA acá es ayudarte a tener la conversación honesta.

### Inputs

**Sujeto:** split-level 3 rec / 2 baños / 1,900 sqft de los 70 en un barrio de Toronto. Cocina original, baños originales, calefacción a oil. Lote 30 x 120.

**Comp 1:** del otro lado de la calle. 3 rec / 3 baños / 2,200 sqft. Totalmente renovada 2024 (cocina, dos baños, sótano terminado, mecánico nuevo). Vendida la semana pasada a USD $1.85M. DOM 8.

**Comp 2:** a dos cuadras. 3 rec / 2 baños / 1,950 sqft. Cocina actualizada 2019, baño original. Vendida hace 3 meses a USD $1.42M. DOM 28.

**Comp 3:** misma calle, cuatro casas más allá. 3 rec / 2 baños / 1,820 sqft. Original en todo. Vendida hace 5 meses a USD $1.31M. DOM 41.

**Activo:** a tres cuadras. 4 rec / 3 baños / 2,300 sqft, renovada, listada a USD $1.95M, 18 días en mercado.

**Lectura del vendedor (nota del agente):** "El vendedor vio que Comp 1 se vendió a USD $1.85M y quiere listar a USD $1.79M".

### Output

```
CMA — Sujeto: split-level de los 70 3/2/1900, Toronto

Evaluación directa: Comp 1 no es un comp para esta propiedad. Es el valor de esta propiedad después de USD $400K-500K de trabajo de renovación.

Resumen de comps:
- Comp 1 (USD $1.85M, semana pasada, 2200 sqft, totalmente renovada 2024): el comp trofeo. Ajusta abajo aproximadamente USD $400-500K por la brecha de renovación, más otros USD $50-80K por delta de sqft. Ajustado a condición del sujeto: ~USD $1.30M-USD $1.40M.
- Comp 2 (USD $1.42M, hace 3 meses, 1950 sqft, updates parciales): el data point más relevante. El sujeto está menos actualizado que Comp 2. Ajustar abajo ~USD $50-75K.
- Comp 3 (USD $1.31M, hace 5 meses, 1820 sqft, original): match de condición más cercano. Ajustar por tiempo levemente hacia arriba; ajustar abajo por sqft levemente más chico. Aterriza alrededor de USD $1.32-1.35M.
- Activo a USD $1.95M (4 rec renovada): no directamente relevante — distinto número de recámaras y tier de condición.

Rango de precio:
- Bajo: USD $1.30M
- Más probable: USD $1.32M-USD $1.37M
- Alto: USD $1.40M (solo si el tráfico de showings es fuerte en los primeros 10 días, con dinámica multi-oferta)

Explicación: el vendedor ancló al comp equivocado. Comp 1 refleja por cuánto se vende una casa renovada de bones similares. El sujeto, en condición original con mecánicos originales, está en el rango de USD $1.30-1.40M — directamente respaldado por Comp 2 y Comp 3. Listar a USD $1.79M va a producir showings de compradores que entran esperando condición de Comp 1 y se van decepcionados. Así es como las casas se sientan en el mercado 60+ días y terminan vendiéndose al precio al que debieron haber empezado, menos el estigma de la reducción de precio.

Recomendación: listar entre USD $1,349,000 y USD $1,389,000. El precio de venta más probable está en los USD $1.3M bajos. Si el vendedor quiere empujar hacia USD $1.4M, necesita gastar USD $20-40K en updates cosméticos (pintura, refinish de pisos, hardware de cocina, lámparas) antes de salir al mercado.

Preguntas para el vendedor:
1. ¿Caminó por Comp 1? Si no, sugiéreselo. La diferencia es visible y tangible.
2. ¿Están abiertos a un refresh pre-listing de 2 semanas? USD $20K de pintura + pisos típicamente devuelven USD $40-60K.
3. ¿Cuál es su timeline? Si tienen que mudarse en 90 días, la estrategia de pricing es distinta a si tienen 9 meses.
4. ¿Están dispuestos a mirar el neto del vendedor a USD $1.79M (probable 90+ DOM y caída de precio) vs USD $1.37M en precio correcto (probable 14-21 DOM y posible multi-oferta)? El neto suele estar más cerca de lo que piensan.
5. ¿Están emocionalmente atados al número de USD $1.79M, o el vecino lo mencionó una vez y se les quedó? Problema distinto, conversación distinta.

Llegá a la cita listo para discutir: el delta de renovación en Comp 1, la cuenta del neto del vendedor (los USD $400K no son dinero real para ellos), y la opción del refresh pre-listing.

---
Cosas a verificar antes de publicar:
- Scope y costo de renovación de Comp 1 (confirmar con el listing agent si es posible — a veces "totalmente renovada" sobreestima el trabajo)
- Específicos del lote del sujeto (¿el 30x120 está zonificado para severance/laneway? Eso es palanca de valor)
- Mercado de Toronto — cambios recientes en days-on-market para stock no renovado
```

---

## Cuándo escalar más allá de la IA

La IA es una herramienta de afilado. Hay momentos para dejarla y agarrar el teléfono:

- Estate sales donde los herederos no se ponen de acuerdo
- Ventas pre-maritales o por divorcio (a menudo necesitan una opinión por escrito, no un chat de CMA)
- Escenarios de tear-down o valor-de-terreno — consigue una carta de builder encima del CMA
- Cualquier cosa donde el sujeto está en un micro-mercado (una calle, un edificio, tres comps en tres años) — llamá a un appraiser local, no a la IA

El prompt de CMA de arriba está pensado para hacer el caso del 80% más rápido y más defendible. El 20% que es realmente difícil sigue necesitando un oído humano.
