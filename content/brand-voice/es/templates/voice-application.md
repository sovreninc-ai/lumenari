# Aplicación de Voz

Usa esto una vez que tengas un perfil de voz guardado. Pega el perfil + el draft que quieres reescribir. La IA produce un rewrite con voz y un self-check.

---

## El prompt

```
Estás aplicando un perfil de brand voice guardado a un draft. Reglas:

1. Lee el perfil completo antes de empezar. Pondera los ejes load-bearing (1s y 5s) más pesado.
2. Usa la firma de vocabulario como guía. Usa la lista de prohibidas como filtro duro — si alcanzas una palabra prohibida, reemplázala.
3. Empareja el promedio de largo de frase. No produzcas frases 2x el largo promedio.
4. Usa el dispositivo de framing en el opener. La primera frase es donde la voz es más visible.
5. Después del rewrite, corre un self-check: para cada párrafo o bloque mayor, etiquétalo on-voice / drift / off-voice. Cita cualquier línea específica de la que no estés seguro.

Formato de output:

## Rewrite
[tu versión con voz]

## Self-check
- Párrafo 1: on-voice / drift / off-voice — [razón]
- Párrafo 2: on-voice / drift / off-voice — [razón]
- ...
- Líneas de las que no estoy seguro:
  - "[línea citada]" — [razón del flag]

El perfil y el draft siguen.
```

---

## Tu input abajo

```
[Perfil de voz]
[pega el perfil guardado completo aquí]

[Draft]
[pega el copy genérico, rough o de sabor competidor que quieres reescribir]

[Goal]
¿Para qué es esto? ¿Qué acción debería tomar el lector después de leerlo?

[Restricciones (opcional)]
- Cap de largo
- Formato (email, hero de landing, copy de ad, hilo de tweet, etc.)
- Hechos específicos que deben mantenerse en el rewrite
```

---

## Ejemplo trabajado

**Perfil (truncado):**
```
Voz: Solo Builder
Load-bearing: Serio/Lúdico 2 (seco), Directo/Diplomático 5 (verdict-first)
Frase promedio: 9 palabras
Alcanza por: shippeé, hard pass, aquí está, cosa
Nunca usa: leverage, transform, unlock, journey, passion, ecosystem
Framing: opener verdict-first; el cuerpo explica
```

**Draft (output genérico de IA):**
> "Estamos emocionados de anunciar el launch de nuestra nueva plataforma de productividad diseñada para ayudar a founders ocupados a streamlinear sus operaciones diarias a través de tecnología de IA de vanguardia, permitiéndoles enfocarse en lo que verdaderamente importa: construir su negocio soñado y transformar sus vidas".

**Goal:** Email anunciando el launch a mi newsletter. Quiero clics a la página del producto.

**Rewrite:**
> Shippeé la herramienta de productividad. Corre las cinco tareas admin que desperdicias un día. Toma como un minuto setup. Link abajo.

**Self-check:**
- Frase 1: on-voice — opener verdict-first, 4 palabras, usa "shippeé" de la firma de vocab.
- Frase 2: on-voice — 11 palabras, segunda persona, sin jerga.
- Frase 3: on-voice — cadence de fragmento de 7 palabras.
- Frase 4: on-voice — mínimo, termina en un CTA sin vender.
- Líneas de las que no estoy seguro: ninguna.

---

## Por qué cada regla importa

**Lee el perfil completo.** Las herramientas de IA por defecto usan las primeras líneas de cualquier prompt más pesado. Si el perfil es párrafo 4 y el draft es párrafo 5, el draft gana. Forzar una lectura completa con una instrucción explícita arregla esto.

**Pondera los ejes load-bearing más pesado.** Una voz scoreada 2 en Serio/Lúdico con un flag load-bearing significa que los chistes son un no duro. Una voz scoreada 4 en Casual sin un flag load-bearing significa que las contracciones están bien pero el slang no es load-bearing. La IA debe saber qué rasgos son no negociables.

**Lista de prohibidas como filtro duro.** Sin un filtro duro, los rewrites de IA meten palabras prohibidas de vuelta vía sinónimos. "Leverage" se reemplaza con "harness". "Unlock" se vuelve "tap into". La regla es: si el significado empareja con una palabra prohibida, encuentra una forma de decirlo sin esa forma semántica.

**Empareja el largo de frase.** Este es el marcador de ritmo más fácil de imponer y el que la IA se equivoca más seguido. Una voz de promedio de 9 palabras que repentinamente produce una frase de 28 palabras se lee como una persona distinta.

**Dispositivo de framing en el opener.** Las primeras frases son donde la voz es más diagnóstica. Si tu voz es verdict-first y el rewrite abre con "En un mundo donde..." nada más importa.

**Self-check con flags.** Los flags honestos son más útiles que la falsa confianza. Un rewrite que dice "el párrafo 3 está yendo a la deriva hacia genérico" te deja arreglarlo. Un rewrite que afirma que todo pasa cuando el párrafo 3 está claramente off te fuerza a re-leer y atraparlo tú mismo.
