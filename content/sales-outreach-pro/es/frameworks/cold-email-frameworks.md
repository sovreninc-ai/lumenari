# Frameworks de Cold Email: PAS, BAB, AIDA

Tres frameworks que vale la pena conocer. Cada uno es una forma distinta para un mensaje distinto. Elige por intención, no por hábito.

Para cada framework encontrarás:
1. Cuándo usarlo
2. La estructura
3. Un ejemplo trabajado para SaaS B2B
4. Un ejemplo trabajado para un negocio de servicios
5. Un ejemplo trabajado para un producto físico

---

## PAS — Problem, Agitate, Solve

**Úsalo cuando:** El prospecto tiene un dolor actual y nombrado que tu solución atiende. Mejor para pitches de reemplazo/swap — cuando están usando un competidor, un build interno o un workaround que claramente los está perjudicando.

**Estructura:**
1. Nombra el problema en su lenguaje (una línea)
2. Agita — haz concreto el costo del problema (una línea)
3. Resuelve — lo que haces, brevemente (una línea)
4. Prueba (una línea, opcional)
5. Petición (una línea)

**Por qué funciona:** Refleja cómo ya se siente el prospecto. Llevan meses quejándose de esto internamente. Eres la primera persona en nombrarlo en voz alta.

**Por qué falla:** Cuando el problema no es real, PAS se lee como falsa empatía. Sáltatelo si estás adivinando el dolor.

---

### Ejemplo PAS — SaaS B2B

**Contexto:** Vender una herramienta de optimización de CI/CD a un VP de Engineering en una empresa SaaS Serie B. Señal: tuiteó la semana pasada que sus facturas de CI llegaron a $40K/mes.

**Asunto:** factura de CI de $40K

```
Vi tu tuit la semana pasada — $40K/mes en CI es el tipo de número que sale en juntas de board.

Los tests inestables suelen ser el 30-40% de eso, porque cada retry es un container nuevo a duración completa.

Nos sentamos delante de tu test runner y no volvemos a correr los tests determinísticamente inestables. Recorta la factura en un promedio de 35% para equipos de tu tamaño.

Linear y Vercel son clientes. Con gusto comparto lo que hicimos para sus pipelines.

¿15 min el próximo martes o miércoles?

[Despedida]

---
Dos cosas que quizás quieras cambiar antes de enviar:
- La línea "$40K es el tipo de número que sale en juntas de board" — directa pero confirma que no se lea como predicación a este VP en particular
- "Determinísticamente inestables" puede ser jerga dependiendo de su stack — cámbialo por "los que pasan al reintentar" si es el caso
```

---

### Ejemplo PAS — Negocio de servicios

**Contexto:** Vender un servicio de CFO fraccional a un founder Serie A. Señal: su último deck de all-hands (publicado públicamente en YouTube) incluyó una slide de finanzas que claramente se armó en Google Sheets esa misma mañana.

**Asunto:** esa slide de finanzas

```
Vi tu charla de retro de Serie A — cuando llegaste a la slide de finanzas dijiste "armamos esto esta mañana".

Eso es normal en Serie A. También se rompe en Serie B, cuando los inversionistas piden materiales de board que no se armaron esa mañana.

Hago trabajo de CFO fraccional para 6 empresas SaaS Serie A. Dos días a la semana. Decks de board, modelo de runway, plan de hiring, forecast de cash — armado una vez, mantenido siempre.

Tengo alumni de Stripe y Notion en mi cartera si quieres una referencia.

¿20 min el jueves o viernes?

[Despedida]

---
Dos cosas que quizás quieras cambiar antes de enviar:
- "Eso es normal en Serie A" puede sonar ligeramente condescendiente según el tono — léelo en voz alta
- Asegúrate de que ambos clientes de referencia hayan accedido a ser nombrados antes de enviar
```

---

### Ejemplo PAS — Producto físico

**Contexto:** Vender sillas ergonómicas premium a office managers en startups en crecimiento. Señal: la empresa acaba de firmar una mudanza de 12 meses de WeWork a oficina propia.

**Asunto:** oficina nueva, sillas viejas

```
Vi en tu LinkedIn que firmaron el contrato del nuevo espacio en [dirección]. Felicidades.

La mayoría de las empresas de tu tamaño compran sillas del mismo catálogo de muebles de oficina y después lidian con quejas de dolor de espalda seis meses después. Las sillas son la línea más barata — y son en las que tu equipo se sienta 8 horas al día.

Hacemos una silla que cuesta más o menos 2x el precio del catálogo y dura 4x más tiempo. Cuarenta empresas en [tu ciudad] han cambiado en los últimos dos años.

¿Puedo dejar dos sillas de demo en la oficina para que tu equipo las pruebe una semana? Sin costo, las recojo de cualquier forma.

[Despedida]

---
Dos cosas que quizás quieras cambiar antes de enviar:
- La línea "quejas de dolor de espalda seis meses después" es cierta pero ligeramente presuntuosa — considera suavizar si la office manager a la que escribes sería la persona a la que culparían
- "Cuarenta empresas" tiene que ser un número real — confirma antes de enviar
```

---

## BAB — Before, After, Bridge

**Úsalo cuando:** Tu valor es transformación, no alivio de dolor. El prospecto puede no tener un problema claramente nombrado — tienen un estado actual, y tú les estás mostrando un estado mejor. Mejor para herramientas de productividad, nuevas categorías, automatización, cualquier cosa donde el "before" se siente normal hasta que ven el "after".

**Estructura:**
1. Before — describe su estado actual en términos específicos (una línea)
2. After — describe el estado en el que operan tus clientes (una línea)
3. Bridge — qué marca la diferencia (una línea)
4. Prueba (una línea, opcional)
5. Petición (una línea)

**Por qué funciona:** No discute con el prospecto si su estado actual es malo. Solo muestra un estado distinto y los deja decidir.

**Por qué falla:** Cuando el "after" es genérico ("ahorra 10 horas a la semana"), nadie lo cree. El After tiene que ser lo suficientemente específico para ser falsable.

---

### Ejemplo BAB — SaaS B2B

**Contexto:** Vender una customer-data-platform / herramienta de reverse-ETL a un Head of Growth en una empresa SaaS B2C Serie A.

**Asunto:** cómo Loom sincroniza su data de clientes

```
La mayoría de equipos de growth con los que hablo: cada campaña requiere un pedido de SQL al equipo de data, una espera de 2 días, un CSV, y luego un import manual a la herramienta que manda la campaña.

Los equipos que nos usan: cuando alguien se registra y su primera sesión transcurre de cierta forma, el siguiente email, la siguiente audiencia de ads, y el siguiente handoff a CS se disparan automáticamente — traídos en vivo desde el warehouse, sin CSVs.

El bridge es un conector reverse-ETL entre Snowflake/BigQuery y 100+ destinos.

Loom reemplazó 5 scripts de sync internos con nosotros en un mes — con gusto comparto su setup.

¿20 min esta semana?

[Despedida]

---
Dos cosas que quizás quieras cambiar antes de enviar:
- La afirmación "cada campaña requiere un pedido de SQL" — confirma que sea realmente su workflow antes de enviar; algunos equipos de growth ya lo resolvieron
- "100+ destinos" es una afirmación genérica — reemplaza con los 2-3 destinos que con más probabilidad les importen si los puedes encontrar en las ofertas de empleo de la empresa
```

---

### Ejemplo BAB — Negocio de servicios

**Contexto:** Vender un servicio de content marketing a un director de marketing en SaaS B2B.

**Asunto:** contenido que rankea vs contenido que convierte

```
Lo que veo en la mayoría de empresas SaaS Serie B: el equipo de contenido lanza 8 posts de blog al mes. La mitad rankea, la otra mitad no. Ninguno ata limpiamente al pipeline.

Lo que lanzan nuestros clientes: 2-3 posts long-form al mes. Cada uno targetea una keyword de etapa de comprador. Cada uno tiene un CTA afinado a la etapa. Cada uno tiene su atribución a pipeline trackeada.

La diferencia: un content strategist que está en tus sales calls antes de escribir, no después.

Corremos contenido para [Cliente A] y [Cliente B] — su pipeline inbound creció 2-3x en 9 meses con este approach.

¿30 min esta semana para repasar lo que recomendaríamos?

[Despedida]

---
Dos cosas que quizás quieras cambiar antes de enviar:
- "8 posts de blog al mes" puede ser alto para algunos equipos — ajusta si conoces su cadence
- La afirmación de 2-3x necesita ser defendible con la data real del cliente — solo mándalo a gente que tomaría una llamada de referencia
```

---

### Ejemplo BAB — Producto físico

**Contexto:** Vender equipo comercial de espresso a un dueño de café que planea una segunda ubicación.

**Asunto:** ¿segunda ubicación, máquina nueva?

```
La mayoría de dueños de café al abrir su segunda ubicación: misma La Marzocco que la primera, mismos baristas entrenados, misma calidad de bebida. Costo: $22-28K por máquina. Lead time de seis meses.

Los cafés con los que trabajamos: misma La Marzocco, pero con un plan de servicio y refacciones que significa un swap en 4 horas si la máquina falla, más un check de calibración cada 90 días. Costo neto en 3 años usualmente más bajo que el modelo con garantía incluida.

La diferencia es un técnico local en contrato en lugar de una línea de servicio del fabricante en otro país.

Dos cafés en [tu ciudad] acaban de abrir segundas ubicaciones bajo este modelo — con gusto los conecto.

¿15 min la próxima semana para repasar lo que cubrimos?

[Despedida]

---
Dos cosas que quizás quieras cambiar antes de enviar:
- La afirmación "costo neto más bajo en 3 años" tiene que aguantar — asegúrate de que tus números estén bien antes de que alguien pregunte
- "Swap en 4 horas" es una promesa específica — solo dilo si es el SLA real
```

---

## AIDA — Attention, Interest, Desire, Action

**Úsalo cuando:** Tienes un hook específico fuerte — una ronda reciente, un lanzamiento, una contratación, una cita en un podcast. AIDA monta ese hook hasta el CTA sin gastar demasiadas palabras en contexto. Mejor cuando el timing es el diferenciador.

**Estructura:**
1. Attention — el hook específico (una línea)
2. Interest — por qué les importa ahora mismo (una línea)
3. Desire — el outcome que entrega tu producto (una línea, a veces dos)
4. Action — la petición (una línea)

**Por qué funciona:** El hook se gana la apertura. El resto está construido para convertir aperturas en respuestas.

**Por qué falla:** Cuando el "hook" es superficial ("¡felicidades por la ronda!"), AIDA colapsa en ruido. El hook tiene que ganarse su línea.

---

### Ejemplo AIDA — SaaS B2B

**Contexto:** Vender una plataforma de assessments de hiring a un CTO. Señal: su empresa acaba de anunciar una Serie B de $30M con planes de crecer engineering de 25 a 80 en 12 meses.

**Asunto:** de 25 a 80 en 12 meses

```
Ronda B de $30M y un plan para crecer eng 3x en un año — felicidades, y también: ese es el tipo de crecimiento donde las malas decisiones de hiring componen rápido.

Los equipos que dan ese salto limpiamente hacen una cosa: estandarizan la barra técnica con un assessment estructurado, después dejan que los hiring managers se enfoquen en las señales blandas.

Nosotros somos ese assessment. Screening estructurado de 90 minutos, agnóstico al lenguaje, diseñado por staff engineers ex-Google, 70 clientes incluyendo [A] y [B].

¿15 min la próxima semana para mostrarte en qué estandarizó el equipo de [A]?

[Despedida]

---
Dos cosas que quizás quieras cambiar antes de enviar:
- "Las malas decisiones de hiring componen rápido" es cierto pero filoso — suaviza si no tienes una intro tibia
- "Staff engineers ex-Google" es una afirmación de credibilidad — asegúrate de que sea cierto y no exagerado
```

---

### Ejemplo AIDA — Negocio de servicios

**Contexto:** Vender coaching ejecutivo a un CEO. Señal: estuvo en un podcast la semana pasada y dijo "no he tomado vacaciones en 2 años".

**Asunto:** 2 años sin vacaciones

```
Te oí en [podcast] la semana pasada — cuando dijiste "no he tomado vacaciones en 2 años", esa línea se me quedó.

Ese es el patrón de founder que termina en burnout, no en un cierre limpio de Serie C. Y el equipo usualmente lo siente antes que el founder.

Hago coaching a 8 CEOs en este momento. El trabajo no es sobre wellness — es sobre calidad de decisión, disciplina de delegación y un calendario que te permita quedarte en los problemas difíciles por más de 90 días a la vez.

¿20 min la próxima semana para ver si hay fit?

[Despedida]

---
Dos cosas que quizás quieras cambiar antes de enviar:
- La referencia al podcast tiene que ser exacta — no parafrasees la cita
- "Burnout, no un cierre limpio de Serie C" es filoso — léelo en voz alta y confirma que el tono encaje
```

---

### Ejemplo AIDA — Producto físico

**Contexto:** Vender un escritorio de pie premium a una empresa de herramientas de remote-work que acaba de lanzar un nuevo producto. Señal: su CEO publicó en LinkedIn ayer que el equipo ahora es totalmente remoto y está creciendo.

**Asunto:** nuevos setups de casa

```
Vi el anuncio ayer — totalmente remotos y contratando 30 personas más el próximo trimestre. Eso son muchas oficinas en casa a punto de empeorar antes de mejorar.

Hacemos un escritorio sit-stand construido para equipos remotos: se envía plano a casa del empleado, se arma en 20 minutos, $400 más barato que el setup equivalente de Herman Miller.

Trabajamos con [Empresa A] y [Empresa B] en stipends de home-office — la ofrecen como opción por defecto a los nuevos empleados.

¿10 min en algún momento esta semana para ver si tiene sentido para tu ola de contrataciones?

[Despedida]

---
Dos cosas que quizás quieras cambiar antes de enviar:
- La comparación "$400 más barato que Herman Miller" debe ser exacta — confirma antes de enviar
- "Oficinas en casa a punto de empeorar" es una línea fuerte — bien para una empresa B2B de remote-work, sería tone-deaf para otras
```

---

## Eligiendo el framework correcto

Un árbol de decisión de 30 segundos:

- ¿El prospecto tiene un dolor obvio, actual y nombrado? → **PAS**
- ¿Su estado actual está "bien" pero el estado después es dramáticamente mejor? → **BAB**
- ¿Acaba de pasar algo en su empresa que hace hoy distinto a la semana pasada? → **AIDA**

Si no puedes decidir entre PAS y BAB, por defecto usa BAB — es menos presuntuoso y funciona mejor para prospectos sobre los que no tienes una lectura profunda.

Si estás tentado a hacer AIDA con una señal vieja (un evento de más de 30 días), no lo hagas. Cambia de framework.

---

## Lo que comparte cada framework

Sin importar la estructura, cada cold email necesita:

- Un subject line de menos de 40 caracteres
- Una primera frase que pruebe que leíste algo específico
- Una declaración de valor en lenguaje sencillo, no copy de marketing
- Un CTA único y específico con horarios propuestos
- Una extensión total de menos de 75 palabras

Si un draft falla cualquiera de estos checks, no falló el framework — falló el input. Vuelve al input y aprieta.
