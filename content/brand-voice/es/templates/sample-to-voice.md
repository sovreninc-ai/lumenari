# Extractor de Sample-a-Voz

Pega este prompt al inicio de un chat nuevo (o en un slot de system prompt), después pega tus samples abajo. El output es un perfil de voz completo que puedes guardar como `voice-profile.md` y reusar en cada sesión futura.

---

## El prompt

```
Eres un editor de brand voice. Voy a pegar 3-5 samples de escritura. Tu trabajo es extraer un perfil de voz reusable.

Reglas:
- Cada observación debe citar una línea específica de los samples. Sin claims sin citar.
- Scorea cuatro ejes de atributos de voz 1-5. Marca cualquier 1 o 5 como load-bearing.
- Mide la estructura de frase cuantitativamente (largo promedio en palabras, variación, fragmentos, openers comunes).
- Produce una firma de vocabulario (palabras a las que los samples alcanzan) y una lista de prohibidas (palabras default de IA conspicuamente ausentes).
- Nombra el dispositivo de framing — la jugada retórica recurrente que ancla la voz.
- Sin archetypes. Sin brand essence. Sin stacks de adjetivos ("bold, witty, confident").

Schema de output (úsalo exactamente):

# Perfil de Voz — [Nombre]
_Extraído de N samples el [fecha]_

## Scores de atributos de voz
- Formal/Casual: X (load-bearing: s/n) — [observación]
- Serio/Lúdico: X (load-bearing: s/n) — [observación]
- Directo/Diplomático: X (load-bearing: s/n) — [observación]
- Técnico/Accesible: X (load-bearing: s/n) — [observación]

## Estructura de frase
- Largo promedio: ~N palabras
- Variación: apretada / mixta / amplia
- Fragmentos: raros / ocasionales / frecuentes (cita uno)
- Openers comunes: [lista 2-3 patrones]

## Firma de vocabulario
**Alcanza por:** palabra1, palabra2, palabra3, palabra4
**Nunca usa:** palabra1, palabra2, palabra3, palabra4

## Dispositivo de framing
[1-2 frases nombrando la jugada recurrente, con un ejemplo citado.]

## Anti-patrones a marcar
- [3-5 cosas concretas a atrapar en drafts futuros]

## Ejemplo on-voice (de los samples)
> [frase de sample más fuerte]

## Ejemplo off-voice (default genérico de IA)
> [una frase que la IA produciría naturalmente que viole esta voz]

---

Samples siguen. Etiqueta cada uno para que pueda citar limpio.
```

---

## Tu formato de input debajo del prompt

```
Sample 1 — [post de LinkedIn / intro de newsletter / copy de landing / etc.]
[pega sample]

Sample 2 — [etiqueta]
[pega sample]

Sample 3 — [etiqueta]
[pega sample]

Sample 4 (opcional) — [etiqueta]
[pega sample]

Sample 5 (opcional) — [etiqueta]
[pega sample]

Contexto:
- ¿Quién lee el output de esta voz? [audiencia]
- ¿Para qué es usualmente? [emails, sales pages, social, etc.]

Restricciones:
- [Cualquier cosa off-limits — sin groserías, sin primera persona, nunca nombrar competidores, etc.]
```

---

## Eligiendo samples — la parte que la mayoría se equivoca

Los samples que metes son el techo de la voz que sacas. Elige mal, recibe malos resultados.

**Buenos samples:**
- Cosas que escribiste que volverías a publicar sin cambios
- Cosas que clientes, lectores o tu equipo señalaron específicamente como sonando a ti en tu mejor
- Una pieza que aterrizó — consiguió la reunión, consiguió la respuesta, consiguió el share

**Malos samples:**
- Cosas que escribiste apurado y no te encantan
- Una pieza formal que escribiste porque la situación lo demandaba (email de board, aviso legal)
- Una pieza en un tono del que no quieres realmente más
- Cualquier cosa que no escribiste tú mismo (a menos que estés explícitamente emparejando otra voz — dilo en la etiqueta)

**Número de samples:**
- 3 es el mínimo. Por debajo de eso, las observaciones no están fundamentadas.
- 5 es el sweet spot para la mayoría de las voces.
- Más de 7 empieza a diluir la señal — la IA promedia a través de ellos y pierde el edge.

---

## Ejemplo trabajado — cómo se ve un buen output

**Samples de input:**
> Sample 1 (intro de newsletter): "Shippeé una cosa y la rompí dos veces. Aquí está lo que aprendí la segunda vez."
>
> Sample 2 (LinkedIn): "Hard pass en la discovery call. Querían 12 meses y no quisieron definir éxito."
>
> Sample 3 (hero de landing): "No necesitas otro framework. Shippea una cosa esta semana. Aquí está."

**Perfil de output:**

```
# Perfil de Voz — Solo Builder
_Extraído de 3 samples el 2026-05-14_

## Scores de atributos de voz
- Formal/Casual: 4 (load-bearing: no) — Contracciones, sin slang. "Shippeé una cosa" no "Lancé un nuevo producto".
- Serio/Lúdico: 2 (load-bearing: sí) — Cero chistes. Seco donde es chistoso. "La rompí dos veces" es lo más cercano al humor.
- Directo/Diplomático: 5 (load-bearing: sí) — Cada opener lidera con el veredicto. "Hard pass en la discovery call".
- Técnico/Accesible: 2 (load-bearing: no) — Cero jerga. "Definir éxito" no "establecer KPIs".

## Estructura de frase
- Largo promedio: ~9 palabras
- Variación: apretada (rango 5-12)
- Fragmentos: ocasionales — "Aquí está".
- Openers comunes: verbo-primero ("Shippeé..."), verdict-first ("Hard pass..."), segunda persona imperativo ("No necesitas...")

## Firma de vocabulario
**Alcanza por:** shippeé, hard pass, aquí está, cosa, rompí, semana
**Nunca usa:** leverage, transform, unlock, framework (lo usa irónicamente), passion, journey, ecosystem

## Dispositivo de framing
Verdict-first. La primera frase de cada sample declara la conclusión o el llamado. El cuerpo explica. Ejemplo: "Hard pass en la discovery call. Querían 12 meses y no quisieron definir éxito".

## Anti-patrones a marcar
- Cualquier frase abriendo con "En el mundo acelerado de hoy..."
- Cualquier uso de "transform", "unlock", "elevate", "leverage"
- Frases de más de 18 palabras (señal de drift)
- Openers de tres actos ("Primero... Después... Finalmente...")

## Ejemplo on-voice (de los samples)
> "No necesitas otro framework. Shippea una cosa esta semana. Aquí está".

## Ejemplo off-voice (default genérico de IA)
> "Estamos emocionados de introducir nuestro nuevo framework diseñado para ayudar a founders ocupados a streamlinear sus workflows y unlock su potencial completo".
```

Ese es el perfil. Guárdalo como `voice-profile.md`. Reúsalo.
