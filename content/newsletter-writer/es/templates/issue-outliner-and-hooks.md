# Outliner de Issue + Generador de Intro Hook

> Convierte un tema en una estructura de 5 secciones, y escribe las primeras dos líneas que jalan al lector más allá del panel de preview.

---

## Parte 1 — El outliner de issue

### La forma

```
1. HOOK (líneas 1-2)
   Las primeras dos líneas del email. Jala al lector más allá del
   panel de preview. UNO de los cinco patrones: curiosidad, contrarian,
   historia, stat, pregunta.

2. SETUP (~150-200 palabras)
   Contexto que el lector necesita. Tres párrafos cortos. Espacio en blanco
   entre ellos. Establece las apuestas — por qué esto importa esta semana.

3. MEDIO (~400-600 palabras)
   La idea real. 2-3 ejemplos o historias trabajadas. Nombres específicos,
   números específicos, momentos específicos. Este es el cuerpo del issue.

4. REFRAME (~100-150 palabras)
   Qué hacer con esto. O qué pensar al respecto. O qué es
   distinto ahora. Un próximo paso específico que el lector puede tomar.

5. SIGN-OFF (~30-50 palabras)
   Corto. Cálido pero no efusivo. Un call to action claro O ninguno
   en absoluto. "Responde" funciona. "Aplástale al subscribe button" no.
```

Total: aproximadamente 800-1,000 palabras. El largo correcto es lo que la idea necesite. No rellenes para pegar un número.

### El prompt

```
Estás haciendo outline de un issue de newsletter. Reglas:

1. Usa la forma de 5 secciones: Hook → Setup → Medio → Reframe → Sign-off.
2. El Hook es máximo dos líneas. Elige UNO de: curiosidad, contrarian,
   historia, stat, pregunta. No propongas múltiples — elige el que
   encaje con el tema.
3. El Setup da las apuestas — por qué esta idea importa esta semana.
4. El Medio tiene 2-3 ejemplos trabajados. Si no te he dado
   ejemplos, pregunta antes de redactarlos.
5. El Reframe termina con un próximo paso específico. "Reflexiona sobre esto"
   no es un próximo paso. "Abre tu último issue y encuentra la línea donde
   empezaste a rellenar" sí es un próximo paso.
6. El Sign-off es corto. Sin "aplástale al subscribe button". Sin
   "compártelo con alguien que lo necesite".

Voz: específica, personal, ligeramente informal. Párrafos cortos.
Espacio en blanco. Verbos activos.

Saca solo el outline. Headers de sección + 2-4 líneas de guía por
sección. Sin comentarios a menos que lo pida.
```

### Forma de input

```
[El newsletter]
Nombre + posicionamiento
Conteo de suscriptores
Largo promedio de issue

[Este issue]
Tema / título de trabajo
Lo que el lector se lleva
Ejemplos específicos, citas o data a usar
Tono (rant / contemplativo / how-to / lista / historia)

[Restricciones]
- Word count
- Cosas a evitar
```

### Ejemplo trabajado

**Input:**

```
[El newsletter]
"Going Past 100" — semanal para escritores nuevos de newsletter
Suscriptores: 1,400
Largo promedio: 1,000 palabras

[Este issue]
Tema: cómo encontrar tus primeros 100 lectores
Walk-away: que los primeros 100 no vienen de social — vienen de
DMs a personas específicas que ya confían en el escritor.
Ejemplos que quiero usar:
- Los primeros 80 de Sarah vinieron de 30 emails directos a amigos y ex-coworkers
- Mis propios primeros 50 vinieron de 12 DMs a personas con las que había trabajado
- El contraste: un amigo que lanzó en Twitter consiguió 200 follows
  y 8 signups de newsletter
Tono: directo, ligeramente contrarian
Restricciones: 900 palabras, sin "leverage" o "audience-building"
```

**Output:**

```
1. HOOK (contrarian)
   "Todos dicen que deberías build in public para crecer un newsletter.
   Para tus primeros cien lectores, eso está mayormente mal".
   - Aterriza el claim contrarian en la primera línea.
   - La segunda línea nombra el caso específico que va a argumentar.

2. SETUP (~150 palabras)
   Tres párrafos cortos:
   - La mitología: día del launch, momentum en Twitter, primer issue viral.
   - La realidad para la mayoría de los escritores: el día del launch consigues 12 signups,
     la mitad de los cuales nunca abre otro issue.
   - El reframe: los primeros 100 son un problema distinto a los
     siguientes 1,000. Social es el problema-de-los-siguientes-1,000. Los primeros 100
     son un problema de confianza.

3. MEDIO (~500 palabras)
   Tres ejemplos trabajados en orden de fortaleza:
   a) Launch de Sarah: 30 emails directos a amigos y ex-coworkers
      → 80 suscriptores. Específicos: incluyó una línea de "qué
      es esto y por qué creo que te gustaría". 26 de 30 abrieron el
      email. 22 de 30 se suscribieron.
   b) Mi propio launch: 12 DMs a personas con las que había trabajado en proyectos
      pasados. Específicos: le pregunté a cada persona si quería
      verlo, no los suscribí. 10 dijeron sí, 8 se quedaron.
   c) El contraste: un amigo que lanzó en Twitter. 200 follows
      en la primera semana, 8 signups de newsletter, la mitad se unsubscribió
      después del issue 2. Alcance sin confianza es ruido.

4. REFRAME (~120 palabras)
   Qué hacer con esto:
   - Abre tus contactos. Lista 30 personas que te conocen lo suficientemente
     bien como para que un email tuyo no sea no bienvenido.
   - Para cada uno, escribe una frase de por qué crees que les gustaría
     el newsletter. Frase distinta por persona.
   - Manda 5 hoy. La lista completa en 10 días.
   - No suscribas a la gente. Pregunta. Deja que digan sí.

   Un próximo paso específico: "Manda los primeros cinco DMs antes de
   cerrar tu laptop esta noche".

5. SIGN-OFF (~40 palabras)
   "Si has hecho esto y funcionó — o no — responde y
   cuéntame. Leo cada uno. — A"
   - El CTA de respuesta es la jugada correcta para una lista pequeña. La tasa de respuesta es
     un indicador adelantado de engagement y convierte a pagado mejor
     que cualquier otra señal.
```

Lo que este outline hace:

- El Hook es un patrón (contrarian), no cinco opciones compitiendo.
- El Setup tiene beats explícitos de párrafos con sus propios trabajos.
- El Medio está estructurado alrededor de los tres ejemplos que el usuario dio, en orden de fortaleza.
- El Reframe termina con un próximo paso concreto que el lector puede hacer esta noche.
- El Sign-off usa un CTA de respuesta, que la IA justifica proactivamente.

El escritor toma este outline y escribe el issue. La IA no escribió el issue. Ese es el punto.

---

## Parte 2 — El generador de intro hook

### Por qué las primeras dos líneas importan

En Gmail y la mayoría de los clientes de email, el lector ve:

```
[Nombre del sender]
[Subject line]
[Primeros ~80 caracteres del cuerpo del email]
```

Esas tres cosas son la decisión entera de abrir. El subject line solo no es suficiente. Las primeras dos líneas del email se muestran en el panel de preview, y deciden si la apertura se convierte en lectura.

Si alguna vez has abierto un newsletter y lo cerraste inmediatamente, las primeras dos líneas fallaron.

### Los cinco patrones de hook, con ejemplos

**1. Curiosidad**
> "Casi no mando este issue".

> "Hay una línea que corté de la pieza de la semana pasada en la que sigo pensando".

> "Recibí un email ayer que no estoy seguro cómo responder".

Patrón: insinúa una historia o una tensión. Haz que el lector quiera la resolución.

**2. Contrarian**
> "Todos dicen que deberías escribir sobre lo que sabes. Creo que eso está mal para los primeros seis meses".

> "Build-in-public funciona. Pero no de la forma que crees".

> "Me unsubscribí de 14 newsletters este fin de semana. Aquí está el patrón".

Patrón: invierte o complica una pieza de sabiduría común. El lector tiene que seguir leyendo para ver si te has ganado la contradicción.

**3. Historia**
> "El martes pasado una lectora me mandó email para preguntar por qué la había unsubscribido. No lo había hecho. Substack sí".

> "El domingo me senté a escribir este issue y terminé escribiendo uno distinto".

> "Hace dos meses una escritora que admiro me hizo DM con una pregunta que no pude responder".

Patrón: un momento específico, una persona específica, un tiempo específico. Las historias jalan a los lectores porque las historias son cómo los humanos prestan atención.

**4. Stat**
> "Cuarenta y ocho por ciento de los escritores de newsletter paran en los primeros tres meses. Yo casi paré en el mes cuatro".

> "En promedio, este newsletter recibe una respuesta por cada 87 lecturas".

> "El trimestre pasado, 60% de mis nuevos suscriptores vino de una sola fuente. No es la que adivinarías".

Patrón: un número con un frame personal. Los números crean autoridad; el frame personal lo mantiene humano.

**5. Pregunta**
> "¿Cuál es la cosa más pequeña que podrías shippear esta semana que te enseñaría algo?"

> "¿Cuándo fue la última vez que escribiste algo que no estabas seguro que era bueno?"

> "¿En quién imaginas cuando escribes?"

Patrón: una pregunta que el lector no puede responder fácilmente, que nombra algo en lo que ha estado pensando. Funciona mejor para issues contemplativos.

### El prompt

```
Estás escribiendo las primeras dos líneas de un issue de newsletter. Reglas:

1. Elige UNO de los cinco patrones de hook: curiosidad, contrarian, historia,
   stat, pregunta. No propongas los cinco — elige el que encaje
   con el issue.
2. Máximo dos líneas. Conteos: línea uno es aproximadamente el largo del subject-line;
   línea dos es una frase corta.
3. Específico. Un momento real, una persona real, un número real, una pieza real
   de sabiduría convencional.
4. Sin "Hola amigos, espero que estén bien". Sin "Bienvenidos de vuelta a <newsletter>".
   Sin "Hoy quiero hablar de X".
5. La segunda línea debería hacer que la primera línea tenga sentido, O escalar
   la tensión que abrió la primera línea.

Voz: personal, específica, ligeramente informal. Verbos activos.

Saca las dos líneas y qué patrón usaste. Sin comentarios a menos que
lo pida.
```

### Ejemplo trabajado

**Input:**

```
Tema del issue: cómo encontrar tus primeros 100 lectores
Tono: directo, ligeramente contrarian
Walk-away: los primeros 100 vienen de DMs a personas que confían en ti, no
de social.
```

**Output:**

```
Patrón: Contrarian

"Todos dicen que deberías build in public para crecer un newsletter. Para
tus primeros cien lectores, eso está mayormente mal.

La jugada no es un tuit de launch. Son doce DMs".

Por qué funciona:
- La línea 1 nombra la sabiduría y la invierte en una sola respiración.
- La línea 2 escala: número específico (12), canal específico (DMs).
- Juntas prometen que el issue va a decir qué hacer, no solo
  qué está mal con el approach convencional.
```

### Cuándo usar qué patrón

- **Curiosidad** — cuando el issue tiene una historia o un reveal personal. Default para ensayos personales.
- **Contrarian** — cuando el issue argumenta contra sabiduría convencional. Mejor para opiniones marcadas.
- **Historia** — cuando el issue empieza con un incidente específico. Mejor para issues con forma de narrativa.
- **Stat** — cuando tienes un número real que aterriza. Mejor para issues impulsados por data.
- **Pregunta** — cuando el issue es contemplativo y quieres que el lector piense contigo. Úsala con moderación; las preguntas pueden aterrizar planas si el resto del issue no las honra.

La IA elige uno y se compromete. Si el usuario quiere ver un patrón distinto, lo pide explícitamente.

---

## Cuándo saltarse el outline

No necesitas hacer outline de cada issue. Sáltate el outline cuando:

- Ya sabes lo que estás escribiendo y el issue es de menos de 500 palabras.
- El issue está respondiendo a un email específico de un lector o un evento actual — escríbelo antes de sobre-pensarlo.
- Estás en un flow de escritura y el outline interrumpiría.

Cuándo definitivamente hacer outline:

- Issues de más de 1,200 palabras.
- Issues que has estado procrastinando por más de una semana.
- Issues que te pone nervioso enviar.
- Cualquier cosa donde el tema se sienta más grande que el formato.

El outline no es un contrato; es una herramienta de pensamiento. Una vez que lo tienes, puedes desviarte de él libremente. El punto es saber qué estás tratando de hacer antes de empezar a redactar.
