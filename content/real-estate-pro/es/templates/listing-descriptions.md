# Descripciones de Listing por Tipo de Propiedad

Cinco tipos de propiedad, cinco templates de prompt, cinco salidas de ejemplo trabajadas. Usa el prompt tal cual o como punto de partida. Los ejemplos trabajados te muestran cómo se ve un buen output antes de que generes el tuyo.

---

## Cómo usar este archivo

1. Encuentra el tipo de propiedad que matchea tu listing
2. Copia el bloque del prompt
3. Reemplaza los inputs entre corchetes con los detalles de tu propiedad
4. Pégalo en tu herramienta de IA (después de cargar `optimization-pack.md` como system prompt)
5. Compara contra el ejemplo trabajado para hacer un sanity check del output

El system prompt hace el trabajo pesado sobre estructura, tono y cumplimiento de fair-housing. Estos templates solo le dan a la IA los inputs específicos que necesita para cada tipo de propiedad.

---

## 1. Single-family home (SFH)

### Prompt

```
Escribe public remarks de MLS para esta single-family home.

Propiedad:
- Dirección o barrio: [nombre]
- Recámaras: [#] / Baños: [#] / Sqft: [#] / Lote: [tamaño]
- Año de construcción: [año]
- Estilo: [Craftsman / Colonial / ranch / contemporánea / etc.]
- Condición: [move-in / lightly updated / completamente renovada / necesita trabajo]

Features que importan (las cosas que un comprador realmente notaría):
- [feature 1 — específica, no "increíble"]
- [feature 2]
- [feature 3]
- [feature 4]
- [feature 5]

Mecánicos / updates (año si lo tienes):
- [HVAC, techo, ventanas, eléctrico, plomería — lista lo que es reciente]

Exterior:
- [patio, deck, terraza, garage, parking, cercado]

Específicos de ubicación:
- [a X minutos a pie de Y, Z minutos al downtown, nombre del distrito escolar]

Comprador probable:
- [sé específico — "pareja en move-up con un hijo y un perro, WFH híbrido"]

Plataforma: [US MLS / Realtor.ca / Zillow / Redfin]
Límite de caracteres: [número]
```

### Salida de ejemplo trabajada

**Inputs usados:** 4 rec / 2.5 baños / 2,180 sqft Craftsman en Bridgeland (Calgary), construida 2009, cocina ligeramente actualizada 2023, sobre lote de 0.14 acres. Estufa Wolf, isla de carnicero, sótano terminado con entrada separada, deck orientado al sur, garage doble separado. 7 minutos a pie al LRT. Familia en move-up viniendo de un townhouse.

**Output (Realtor.ca, ~250 palabras):**

Una Craftsman de 2009 que se ha mantenido con cuidado, sobre una calle tranquila de Bridgeland a siete minutos a pie del LRT. La actualización de la cocina en 2023 hizo el trabajo que realmente importa — estufa a gas Wolf, isla de carnicero, gabinetes soft-close — sin perder la calidez del layout original. El hardwood corre por toda la planta baja, con líneas de vista desde la cocina hasta el deck orientado al sur.

Arriba hay cuatro recámaras, incluyendo la principal con walk-in closet y baño ensuite de tres piezas. El sótano está completamente terminado con entrada separada por el costado de la casa, lo que abre opciones de nanny-suite o estadía extendida según lo que necesites.

El lote es de poco más de 6,000 pies cuadrados, totalmente cercado, con garage doble separado por el callejón trasero. Techo nuevo (2021), furnace de alta eficiencia y A/C central. La exposición sur en el fondo significa que el deck atrapa sol desde media mañana hasta la tarde temprana — bueno para el perro, bueno para el jardín, bueno para un café un sábado.

Bridgeland no necesita presentación: corta caminata a OEB, Lukes y los senderos del río; transit al downtown en menos de quince minutos. Inglewood y East Village quedan a un paseo cómodo en bici. Las escuelas zonificadas son Langevin y Crescent Heights — el comprador debe confirmar los límites actuales con CBE.

---

Cosas a verificar antes de publicar:
- Año del techo (2021)
- Edad del HVAC
- Límites escolares actuales con CBE

---

## 2. Condo / townhouse

### Prompt

```
Escribe public remarks de MLS para este condo o townhouse.

Propiedad:
- Nombre del edificio / complejo: [nombre]
- Tipo de unidad: [condo / townhouse / loft / penthouse]
- Recámaras: [#] / Baños: [#] / Sqft: [#]
- Año de construcción: [año]
- Piso: [# de #]
- Exposición: [N/S/E/O]

Features:
- [feature 1]
- [feature 2]
- [feature 3]
- [feature 4]

Amenidades del edificio (solo lista las que al comprador le importan):
- [gym / pool / concierge / rooftop / parking / storage / pet-friendly con restricciones]

Fees:
- HOA / condo fee: USD $[monto] / mes — qué cubre
- Property tax: USD $[monto] / año (si lo tienes; si no [CONFIRMAR])

Ubicación:
- [a X minutos a pie de Y, transit, sensación del barrio]

Comprador probable:
- [primer comprador, downsizer, inversionista, profesional urbano]

Plataforma: [MLS]
Límite de caracteres: [número]
```

### Salida de ejemplo trabajada

**Inputs usados:** condo 2 rec / 2 baños / 985 sqft, piso 14, exposición sureste, en edificio de 2017 en downtown Austin. Electrodomésticos nuevos de acero, cubiertas de cuarzo, laundry in-unit. El edificio tiene gym, pool en rooftop, concierge 24 hs. HOA USD $640/mes incluye agua, gas, amenidades. Comprador probable: profesional urbano, primer condo en downtown, camina a la oficina.

**Output (US MLS, ~150 palabras):**

Un dos recámaras orientado al sureste en el piso catorce de un high-rise de 2017 — luz de amanecer en la recámara, vistas al downtown desde el living, ambas a la vez si tienes suerte con la temporada. Plano abierto con cubiertas de cuarzo, electrodomésticos de acero, y una isla que sienta a tres. Las dos recámaras son recámaras reales, no una-y-un-flex; la segunda tiene ventana y closet de verdad.

Laundry en la unidad, un lugar asignado de garage, locker de storage aparte. Las amenidades del edificio cubren la lista estándar — pool en rooftop, gym, concierge 24 horas — y la ubicación te deja a seis minutos a pie de Congress, ocho de Whole Foods, quince del trail head en Lady Bird.

HOA USD $640/mes cubre agua, gas y acceso a amenidades. Pet-friendly con restricciones de peso.

---

Cosas a verificar antes de publicar:
- Property tax (no se proveyó)
- Límite de peso exacto para mascotas
- Dimensiones del locker de storage

---

## 3. Luxury

### Prompt

```
Escribe public remarks de MLS para esta propiedad de lujo.

Propiedad:
- Dirección o barrio: [nombre]
- Tipo: [estate / penthouse / waterfront / construcción nueva]
- Recámaras: [#] / Baños: [#] / Sqft: [#] / Lote: [tamaño]
- Año de construcción: [año] (o "Custom build, terminado [año]")
- Arquitecto / builder: [nombre si es notable]

La única feature que hace a esta propiedad:
- [la única cosa — la vista, el arquitecto, la ubicación, la privacidad, el frente al lago]

Tres a cinco específicos notables más:
- [feature, con marca o detalle]
- [feature]
- [feature]
- [feature]

Exterior / tierra:
- [acreage, frente de agua, vistas, jardín, pool, outbuildings]

Smart / mecánico:
- [home automation, geotermia, solar, EV, etc.]

Específicos de ubicación:
- [privacidad, proximidad al aeropuerto, escuelas, pueblo]

Comprador probable:
- [comprador de segunda vivienda, relocation ejecutiva, familia subiendo de USD $X a USD $Y]

Plataforma: [MLS / portal de lujo / sitio de brokerage]
Target de palabras: 250-400 palabras (el lujo corre más largo)
```

### Salida de ejemplo trabajada

**Inputs usados:** casa custom 5 rec / 5.5 baños / 6,200 sqft en Whistler Cadenza por el arquitecto Patkau Associates, terminada 2021, sobre 0.42 acres dando al Whistler Creek. Calefacción geotérmica, iluminación full Lutron, lap pool interior, garage de cuatro autos con EV, ski-in al Creekside. Comprador probable: comprador de segunda vivienda de Vancouver o costa oeste de US.

**Output (portal de lujo, ~350 palabras):**

Un diseño de Patkau Associates terminado en 2021, sobre un lote de 0.42 acres en Cadenza que da directo al Whistler Creek con acceso ski-in al Creekside. La casa es un estudio de lo que una casa de montaña contemporánea puede ser cuando se les da espacio a los arquitectos para trabajar — largos tramos de cedro, vidriado de altura completa orientado al arroyo y a la cresta, una suite principal que abre a un deck privado sobre el agua.

Seis mil doscientos pies cuadrados a través de tres niveles. Cinco recámaras, cada una con ensuite. La cocina está anclada por un refrigerador y freezer Sub-Zero en columnas, una estufa Wolf con dos hornos, y una butler's pantry que tiene un segundo lavavajillas y prep sink. Great room con fireplace a leña Stuv y techos de veinte pies.

El nivel inferior tiene un lap pool interior con muro de vidrio al arroyo, un baño de cuatro piezas para la pool, una media room cableada para Atmos, y una bunk room que duerme a seis. Cava de vinos por el entry hall. Iluminación full Lutron, AV Crestron, calefacción geotérmica con radiante in-floor en todo, y un sistema HRV balanceado para la altitud.

Garage caliente de cuatro autos, dos cargadores EV, y un drop-off cubierto para la llegada. Ski room con boot dryers y entrada dedicada al nivel de lockers. Paisajismo maduro con árboles establecidos en tres lados — la privacidad acá es rara incluso para los estándares de Cadenza.

La Gondola de Creekside está a cuatro minutos a pie por el trail al fondo de la propiedad. Whistler Village está a seis minutos en auto, el aeropuerto a dos horas, Vancouver a una hora cuarenta y cinco.

Una casa diseñada para un comprador que quiere que la arquitectura sea parte del activo.

---

Cosas a verificar antes de publicar:
- Confirmar que el lenguaje de atribución del arquitecto está OK para publicar (algunas firmas tienen guías de crédito)
- HOA / strata fee si aplica
- Property tax (no se proveyó)
- Status exacto del path de ski-in (¿cruce del arroyo es estacional?)

---

## 4. Fixer-upper

### Prompt

```
Escribe public remarks de MLS para este fixer-upper.

Propiedad:
- Dirección o barrio: [nombre]
- Recámaras: [#] / Baños: [#] / Sqft: [#] / Lote: [tamaño]
- Año de construcción: [año]
- Condición: [necesita cosmético / necesita sistemas / preocupaciones estructurales]

Qué está sólido (no escondas lo que funciona):
- [foundation, techo, bones, lote, ubicación, mecánico que es reciente]

Qué necesita trabajo (sé directo — los compradores lo van a ver igual):
- [lista honestamente]

Señal de ARV de comps:
- [renos recientes en el área se vendieron a USD $X / sqft — esto informa la cuenta del comprador]

Comprador probable:
- [flipper, owner-occupant sweat-equity, builder, familia de contratista]

Plataforma: [MLS]
Límite de caracteres: [número]
Tono: directo, sin eufemismos. "Necesita pintura y pisos" está bien. "Trae tu imaginación" no.
```

### Salida de ejemplo trabajada

**Inputs usados:** bungalow 3 rec / 1 baño / 1,150 sqft de 1958 en East Vancouver, lote 33 x 122. Cocina original, baño original, calefacción a oil (tanque sobre tierra, reciente), techo hecho 2019, foundation seca. Renos recientes en la calle vendiendo USD $1.8M+. Comprador probable: builder u owner-occupant sweat-equity.

**Output (US MLS, ~180 palabras):**

Un bungalow de 1958 sobre un lote plano de 33 x 122, listo para que el próximo dueño le ponga trabajo. El techo se reemplazó en 2019. La foundation está seca. Calefacción a oil, con el tanque sobre tierra e inspeccionado el año pasado. La cocina y el baño son originales. Los pisos son hardwood original debajo de la alfombra en los cuartos principales.

Tres recámaras arriba, sótano sin terminar con potencial de entrada separada, single carport. El lote es RT-7 con acceso lateral para los trades.

Los bones son el valor acá. Las renovaciones recientes en la misma cuadra se vendieron arriba de USD $1.8M. El próximo dueño es o un builder llevándola hasta los studs, una familia de contratista haciéndola su primer proyecto en East Van, o un flipper con un scope claro. Los números funcionan en ambos lados si entras con los ojos abiertos.

Trae un contractor al showing. Inspección bienvenida.

---

Cosas a verificar antes de publicar:
- Timeline de decomisado del tanque de oil (BC tiene reglas)
- Específicos de zoning RT-7 con la ciudad
- Carport vs garage en el título

---

## 5. Multi-familia

### Prompt

```
Escribe public remarks de MLS para esta propiedad multi-familia / de inversión.

Propiedad:
- Dirección o barrio: [nombre]
- Tipo: [duplex / triplex / fourplex / 5+]
- Total de unidades: [#]
- Sqft total (edificio): [#]
- Lote: [tamaño]
- Año de construcción: [año]

Mix de unidades:
- Unidad 1: [rec/baños/sqft/renta actual o "vacante"]
- Unidad 2: [rec/baños/sqft/renta actual o "vacante"]
- (repetir para todas las unidades)

Financials (solo si el vendedor aprobó compartirlas):
- Renta bruta mensual: USD $[monto]
- Gastos anuales: USD $[monto]
- NOI: USD $[monto]
- Cap rate al precio de lista: [%]

Capex / condición:
- [updates recientes, deferred maintenance, edad de los sistemas]

Tenancy:
- [mes a mes / leases fijos / vacante / mix]

Comprador probable:
- [owner-occupant house-hacker / inversionista / comprador 1031 / portfolio builder]

Plataforma: [MLS / portal comercial multi-familia]
Límite de caracteres: [número]
Tono: enfocado en el inversionista. Números al frente. Sin copy de lifestyle.
```

### Salida de ejemplo trabajada

**Inputs usados:** triplex en Hamilton, ON. Construido 1962. Tres unidades de 2 rec, ~750 sqft cada una. Rentas actuales: USD $1,400 / USD $1,650 / vacante. Techo 2020, furnaces 2018 (cada unidad medida por separado), cuatro parkings. Comprador probable: inversionista con portfolio local existente.

**Output (MLS comercial, ~180 palabras):**

Un triplex de ladrillo de 1962 en Hamilton central, tres unidades de dos recámaras de aproximadamente 750 pies cuadrados cada una, medidas por separado para gas e hydro. Techo reemplazado 2020. Furnaces reemplazados 2018 en las tres unidades. Cuatro espacios de parking off-street accedidos por el callejón trasero.

Mix actual de unidades y renta: Unidad 1 ocupada a USD $1,400 (inquilino long-term). Unidad 2 ocupada a USD $1,650 (lease renovado 2025). Unidad 3 vacante, renta de mercado estimada en USD $1,750-1,850 basado en unidades comparables de dos recámaras en el área.

Bruto estabilizado a mercado: aproximadamente USD $4,900 mensuales. El vendedor puede proveer un T12 completo y rent roll bajo pedido a través del listing agent.

El edificio ha sido owner-managed los últimos once años. Registros de mantenimiento disponibles. Dos de las tres unidades han tenido updates cosméticos en los últimos cinco años; la Unidad 1 está en condición original.

Targeteado a inversionistas construyendo portfolios locales o owner-occupants cómodos con tareas light de landlord. Dinámica AGI / N12: pregunta al listing agent.

---

Cosas a verificar antes de publicar:
- Confirmar que el vendedor aprobó compartir financials en remarks
- Números del T12 (no listar NOI no verificado)
- Status actual de Ontario LTB en cualquier unidad
- Legalidad del parking pad (algunos callejones de Hamilton están restringidos)

---

## Ediciones comunes que la IA va a aceptar

Cuando el draft vuelva y quieras tunearlo:

- "Corta los adjetivos. Reemplaza cada uno con un específico."
- "Recorta a [X] caracteres. Mantén el lead y el close."
- "Más directo. Menos lifestyle."
- "Agrega una línea sobre [feature que olvidaste mencionar]."
- "Haz el close más suave — sin signos de exclamación."
- "Voicéalo como si yo hubiera caminado la propiedad con el comprador ayer."

Cada una de estas va a producir un segundo draft notablemente mejor. La IA es mucho mejor editando hacia específicos que generándolos desde un primer prompt fino.
