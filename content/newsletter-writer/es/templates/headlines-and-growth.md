# Tester de Subject-Line + Ideas de Growth-Loop

> Cinco variantes de subject-line por tema, cada una nombrada por patrón con una predicción de apertura. Más las jugadas de crecimiento que realmente funcionan para newsletters por debajo de 10k suscriptores.

---

## Parte 1 — El tester de subject-line

### Por qué los subject lines son el juego entero para las aperturas

Un escritor de newsletter típico shippea 50 issues al año. Cada subject line son 60 caracteres que deciden si el lector abre. Mejorar el oficio de subject-line por 10 puntos porcentuales en tasa de apertura compone a través de cada issue, cada año. No hay otra palanca en escritura de newsletter con el mismo retorno sobre la atención.

El error que la mayoría de los escritores comete: escriben un título de trabajo para la *pieza*, después mandan el mismo string como subject line. El trabajo del título es etiquetar el contenido. El trabajo del subject line es ganarse la apertura. Trabajos distintos, optimización distinta.

### Los cinco patrones

1. **Número** — "Las 3 cosas que cambié antes de pegar 1,000 lectores"
2. **Contrarian** — "Deja de A/B testear tus subject lines"
3. **Curiosidad** — "Lo que pasó cuando borré mi Twitter"
4. **Identidad** — "Para escritores que odian la palabra 'creator'"
5. **Urgencia** — "Lee esto antes de lanzar tu próximo issue"

Los patrones híbridos están bien. "Los 3 DMs a mandar antes de tu próximo issue" combina número + urgencia. Al proponer variantes, la IA nombra el patrón para que el escritor pueda ver la jugada.

### El prompt

```
Estás generando variantes de subject-line para un issue de newsletter.
Reglas:

1. Produce exactamente 5 variantes. No 10. No 3. Cinco es el número
   correcto para comparación humana.
2. Cada variante usa uno de los cinco patrones: NÚMERO, CONTRARIAN,
   CURIOSIDAD, IDENTIDAD, URGENCIA. Etiqueta qué patrón.
3. Después de cada variante, escribe:
   - Apertura predicha: baja / moderada / alta (relativa a la tasa de apertura baseline
     del escritor, que te daré)
   - Riesgo: una cosa específica que podría salir mal con esta variante
4. Después de las cinco, elige las 1-2 que recomendarías, con razonamiento.
   Nombra los runners-up que el escritor NO debería usar, y por qué.
5. Evita:
   - Clickbait sin payoff ("No vas a creer...")
   - ALL CAPS o spam de puntuación (!!!)
   - Emojis a menos que la marca esté construida sobre ellos
   - Frases genéricas ("¿Quieres crecer tu newsletter?")

Saca las 5 variantes + la recomendación. Sin comentarios a menos que lo pida.
```

### Forma de input

```
[El newsletter]
Nombre + posicionamiento
Conteo de suscriptores
Tasa de apertura baseline (p. ej., "48%")

[Este issue]
Tema / título de trabajo
Lo que el lector se lleva
Tono (rant / contemplativo / how-to / historia)
```

### Ejemplo trabajado

**Input:**

```
[El newsletter]
"Going Past 100" — semanal para escritores nuevos de newsletter
1,400 suscriptores
Tasa de apertura baseline: 48%

[Este issue]
Tema: cómo encontrar tus primeros 100 lectores
Walk-away: los primeros 100 vienen de DMs a personas específicas que confían en
el escritor, no de social.
Tono: directo, ligeramente contrarian
```

**Output:**

```
1. NÚMERO
   "Los primeros 100 lectores no vienen de Twitter"
   - Apertura predicha: Alta (por encima del baseline). Número específico, sabor
     contrarian suave, lenguaje plano.
   - Riesgo: se lee como anti-Twitter. Puede polarizar a lectores que asocian
     su crecimiento con Twitter.

2. CONTRARIAN
   "Deja de build in public hasta que tengas 100 lectores"
   - Apertura predicha: La más alta de las cinco para esta audiencia. Invierte
     un mantra común de newsletter.
   - Riesgo: el cuerpo tiene que realmente sostener el claim contrarian,
     o los lectores se sienten baited.

3. CURIOSIDAD
   "Lo que hice en lugar de postear el día del launch"
   - Apertura predicha: Moderada-alta. Personal, con forma de historia, misterio
     suave.
   - Riesgo: aterriza plano sin un intro hook fuerte. Las primeras dos
     líneas tienen que entregar.

4. IDENTIDAD
   "Para escritores que no quieren volverse influencers"
   - Apertura predicha: Bimodal. Fuerte con el subset que se identifica;
     salteado por el resto.
   - Riesgo: lista-pequeña-friendly porque self-segmentea, pero pierde
     lectores que son influencer-ambivalentes.

5. URGENCIA
   "Manda estos 10 DMs antes de tu próximo issue"
   - Apertura predicha: Alta. Orientado a la acción, time-bounded, conteo
     bajo de buzzwords.
   - Riesgo: se siente prescriptivo. El cuerpo tiene que entregar un
     playbook específico de 10-DM o los lectores se sienten oversold.

**Recomendado para este issue:** #2 (Contrarian) o #5 (Urgencia).

Contrarian si el issue realmente empuja fuerte contra la ortodoxia de build-in-public
en el cuerpo. Urgencia si el cuerpo entrega una plantilla específica
de 10-DM que el lector puede usar esta semana.

**No usar:**
- "¿Quieres crecer tu newsletter?" — genérico, baja especificidad, va a
  underperform el baseline.
- "Aquí cómo conseguí mis primeros 100 suscriptores" — está bien pero poco notable.
  Se lee como cada intro de newsletter sobre el tema.
```

Esa es la jugada. Cinco variantes reales, cada una nombrada, cada una con una predicción y un riesgo. La recomendación es específica al nivel de compromiso del cuerpo.

### Qué separa un buen subject line de uno grandioso

La IA checa variantes contra tres filtros:

1. **Especificidad.** Un número, un nombre, un verbo. "3 cosas" es más específico que "cosas". "DMs" es más específico que "mensajes". "Martes" es más específico que "el otro día".

2. **Promesa.** ¿Qué espera el lector cuando abre? Si el cuerpo no entrega lo del subject line, la tasa de apertura del próximo issue baja. Los openers cínicos entrenan lectores cínicos.

3. **Higiene de patrón.** Cada patrón tiene un modo de falla. La curiosidad se vuelve misterio sin payoff. El contrarian se vuelve hot-take sin sustancia. La identidad se vuelve halago. La urgencia se vuelve manufacturada. La IA marca cuando una variante se está deslizando al modo de falla.

---

## Parte 2 — Ideas de growth-loop

### La matemática honesta para listas por debajo de 10k

La mayoría del growth advice de newsletter está escrito por personas cuyos newsletters crecieron vía un momento viral que no pueden replicar. La matemática que sostiene para crecimiento repetible a este tamaño:

| Táctica | Esfuerzo | Suma realista | Notas |
|---------|----------|---------------|-------|
| Swap de SwapStack | 1 hora | +20-100 por swap | Mejor para lista 1k+. Empareja por audiencia, no solo por tamaño. |
| Cross-promo manual | 2-3 horas | +30-150 por swap | Mayor calidad que SwapStack; tú eliges el partner. |
| Ensayo invitado en un newsletter más grande | 8-15 horas | +50-500 por ensayo | La palanca única de mayor ROI por debajo de 10k. |
| Recommendations de Substack/Beehiiv | 30 min setup | +1-5/semana pasivamente | Compone. Gratis. Hazlo. |
| Repurposing social | 2-3 horas por issue | 0.5-2% de audiencia social convierte | Alcanza a lectores que no se suscriben vía email todavía. |
| Programa de referral | 1-2 horas setup | +5-15% boost orgánico | Modesto. Vale la pena hacer. No una curva mágica. |
| Adquisición pagada (por debajo de 5k) | $$$ | La matemática rara vez cuadra | Las tasas de apertura en suscriptores comprados se hunden, arrastra la deliverability. Sáltatelo. |
| "Volverse viral" | N/A | N/A | No es una estrategia. Bono de suerte cuando pasa. |

### El prompt

```
Estás recomendando jugadas de crecimiento para un escritor de newsletter. Reglas:

1. Te voy a dar el tamaño actual del escritor, tasa de apertura y presupuesto
   de tiempo por semana para trabajo de crecimiento. Vas a recomendar 2-3 tácticas específicas
   para los próximos 30 días.
2. Para cada táctica:
   - Qué hacer (específico, no genérico)
   - Suma realista (usa la tabla — no prometas más de lo que
     los números soportan)
   - Costo de tiempo
   - Una cosa que va a salir mal si no la vigilan
3. Si preguntan sobre una táctica que la tabla marca como bajo-ROI (paid acq
   por debajo de 5k, volverse viral), empuja atrás honestamente. No la incluyas solo
   porque la pidieron.
4. Termina con una cosa que DEJAR de hacer si su presupuesto de tiempo es apretado.

Voz: directa, calibrada. Promete lo que los números soportan; no
sobrevendas.
```

### Forma de input

```
[El newsletter]
Suscriptores + tasa de apertura
Presupuesto de tiempo para trabajo de crecimiento (horas/semana)
Goals para los próximos 90 días (conteo de suscriptores, conversión pagada, etc.)

[Lo que se ha probado]
- Táctica + outcome
- Táctica + outcome
```

### Ejemplo trabajado

**Input:**

```
[El newsletter]
1,400 suscriptores, 48% tasa de apertura
Presupuesto de tiempo: 4 horas/semana para crecimiento
Goal: 2,500 suscriptores en 90 días

[Lo que se ha probado]
- Postear en Twitter: ~80 followers/mes, ~5 signups de newsletter/mes
- Un set de recomendaciones de Substack hace 2 meses: ~3/semana pasivamente
- Un swap el mes pasado con un newsletter de tamaño similar: +47 suscriptores
```

**Output:**

```
Estás en 1,400, quieres 2,500 en 90 días, y tienes 4 hrs/sem
para crecimiento. Eso son aproximadamente 12 nuevos subs/semana necesarios. La matemática es hacedora.

**Recomendado para los próximos 30 días:**

1. **Dos swaps de cross-promo** (3-4 hrs total)
   - Elige partners con audiencias similares, no solo tamaño similar.
     Busca newsletters en nichos adyacentes con 1-3k suscriptores.
   - Suma realista: 60-200 suscriptores total a través de dos swaps.
   - Vigila por: un partner con lista vieja. Pregunta su tasa de apertura
     antes de comprometerte — si es por debajo del 30%, retírate.

2. **Un pitch de ensayo invitado a un newsletter de 5-15k** (8-12 hrs)
   - La palanca de mayor ROI a tu tamaño. Elige un newsletter que leas
     y admires. Pitchea una pieza específica (no "me encantaría escribir
     algo para ti"). Menciona qué escribirías y por qué encaja.
   - Suma realista: 50-300 suscriptores si aterriza.
   - Vigila por: rechazo o silencio. Planea un segundo pitch si no hay
     respuesta en 10 días. No quemes tu único intento en un long-shot.

3. **Expansión de Substack recommendations** (30 min)
   - Tienes uno configurado. Agrega 3-5 más, todos newsletters que realmente
     leas. La reciprocidad es la jugada — los que recomiendas frecuentemente
     te van a recomendar de vuelta.
   - Suma realista: +3-10/semana pasivamente (compone con tus
     3/sem actuales).
   - Vigila por: nada. Esta es la jugada de crecimiento más gratis que tienes.

**Deja de hacer:** Postear en Twitter a la intensidad actual. 5 signups/mes
por las horas que estás gastando no está pagando. O ve más profundo
(threads, replies como contenido, una estrategia real) o repliégate a
2-3 posts por semana y mete el tiempo al ensayo invitado.

**No recomendado a pesar de ser consejo común:**
- Ads pagados a 1,400. La matemática no va a funcionar. Espera hasta 5k mínimo.
- "Build in public" como estrategia de crecimiento por sí solo. Ya
  haces suficiente de esto pasivamente. No es de donde vienen los próximos 1,100
  suscriptores.

**Matemática de 90 días:**
- 8 swaps × ~50 = 400
- 2-3 ensayos invitados × ~150 = 350
- Recommendations + orgánico + remanente de Twitter: ~250
- Estimado total: 1,000-1,200. Te aterriza en 2,400-2,600.

Posible. Apretado. Vale la pena hacer.
```

Lo que este output hace:

- Matemática honesta al inicio. "12 nuevos subs/semana" convierte el goal en algo contra lo que el usuario puede planear.
- Recomienda tres tácticas de la tabla de suma realista. Nombra costos de tiempo.
- Le dice al usuario qué DEJAR de hacer — Twitter a la intensidad actual no está pagando.
- Empuja atrás contra adquisición pagada y build-in-public genérico a pesar de su comunidad.
- Cierra con matemática acumulativa contra el goal de 90 días.

Eso es un plan de crecimiento, no una lista de tácticas genéricas.

---

## Cómo los subject lines y el crecimiento encajan juntos

Una mejora de subject-line de 5 puntos porcentuales (p. ej. 43% → 48% tasa de apertura) en una lista de 1,400 suscriptores vale +70 lecturas incrementales por issue. A través de 52 issues al año, eso son 3,640 lecturas adicionales — más alcance del que la mayoría de las tácticas de crecimiento entrega a este tamaño.

La implicación: el oficio del subject-line es una palanca de crecimiento, no solo una palanca de contenido. Un escritor que mejora su tasa de apertura promedio por 5 puntos consigue el equivalente de un buen ensayo invitado cada trimestre — sin escribir el ensayo invitado.

La otra implicación: si tienes tiempo limitado, mejorar en subject lines paga más que perseguir suscriptores nuevos. Ambos funcionan; los subject lines componen más rápido.
