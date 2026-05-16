# Playbook de Content Refresh

El trabajo de SEO de mayor leverage que puedes hacer rara vez es escribir artículos nuevos. Es arreglar los que ya tienes. Este playbook te dice cuándo actualizar, cuándo reescribir, cuándo consolidar y cuándo borrar — más el prompt que hace cada uno con seguridad.

---

## El árbol de decisión del refresh

Pasa cada artículo candidato por esto en orden. Detente en el primer match.

### Paso 1: Saca la data

Para cada artículo que estés considerando, agarra:

- Rank actual de Google para la keyword primaria (Search Console)
- Tendencia de posición promedio en los últimos 12 meses
- Click-through rate
- Los actuales top 3 resultados del SERP
- `datePublished` y `dateModified` del artículo
- Backlinks apuntando a la URL (Ahrefs, Semrush o lo que uses)

10 minutos de recolección de data te ahorran hacer el refresh equivocado.

### Paso 2: Corre el árbol

**P1: ¿El artículo rankea página 1 o página 2?**
- SÍ → **Actualiza in place.** Preserva la URL, preserva internal links, preserva backlinks. Solo refresca sustancia.
- NO → continúa.

**P2: ¿El artículo rankea página 3-5, y la intención está mismatched?**
(p. ej. tu artículo es un tutorial pero el SERP ahora premia artículos de comparación)
- SÍ → **Reescribe alrededor de la intención correcta.** Mantén la URL. Trátalo como un artículo nuevo usando la autoridad de la URL vieja.
- NO → continúa.

**P3: ¿Tienes dos artículos compitiendo por la misma keyword?**
- SÍ → **Consolida.** Elige la URL más fuerte (más backlinks, mejor rank actual). Fusiona el mejor contenido en ella. 301 la URL más débil hacia la más fuerte.
- NO → continúa.

**P4: ¿La query ha cambiado fundamentalmente?**
(p. ej. el feature fue renombrado; AI Overview está comiendo clics; el SERP se cambió a video)
- SÍ → **Reescritura mayor.** Nuevo ángulo, nuevo formato si hace falta. Mantén la URL solo si el artículo viejo todavía tiene suficiente relevancia + backlinks para justificar la preservación de URL.
- NO → continúa.

**P5: ¿El tema está deprecated?**
(p. ej. el producto ya no existe; la ley cambió; el framework se retiró)
- SÍ → **Borra y 301** al artículo relacionado actual más cercano. Si nada está cerca, devuelve un 410 (gone).
- NO → continúa.

**P6: ¿El artículo rankea pero pierde tráfico año-tras-año?**
- SÍ → **Actualiza in place + agrega profundidad.** Probablemente está perdiendo clics ante un artículo más nuevo. Refresca la sustancia, agrega lo que falta, actualiza la meta.
- NO → déjalo, monitoréalo otro trimestre.

---

## Patrón 1: Actualizar in place (el refresh más común)

Para artículos rankeando página 1-2 que solo necesitan un refrescamiento.

### Lo que haces

- Actualizar stats y hechos desactualizados
- Reemplazar screenshots si el UI ha cambiado
- Agregar nuevas sub-secciones si el tema tiene nuevas dimensiones
- Reforzar secciones débiles (las que tienen poco scroll depth en PostHog/Hotjar/etc.)
- Actualizar internal links si has publicado mejor contenido relacionado desde entonces
- Actualizar schema `dateModified`
- NO cambiar la URL
- NO remover secciones que están ganando los rankings

### El prompt

```
Eres el SEO Content Strategist.

Estoy refrescando este artículo in place. La URL se queda. La mayor parte de la estructura se queda.

**URL del artículo:** [URL]
**Keyword primaria:** [keyword]
**Rank actual:** [posición]
**Top 3 actual del SERP:** [pega]
**Última publicación / modificación:** [fechas]

**El artículo como está ahora (pégalo):**
[artículo completo]

Lo que quiero:
1. Una lista estilo diff de qué cambiar (con razones)
2. Nuevas secciones que agregarías o sub-secciones dentro de H2s existentes
3. Hechos/stats desactualizados que necesitan update (con flags "falta fuente")
4. Meta title y description actualizadas SOLO si las actuales son débiles
5. Sugerencias de internal-link para las nuevas secciones

NO reescribas secciones que están funcionando a menos que puedas nombrar una razón específica de por qué están underperforming.
```

### Ejemplo de output trabajado

> **Plan de diff:**
>
> 1. **Actualiza H2 #3 ("Pricing comparison")** — la tabla tiene pricing de 2024. HubSpot, Pipedrive y Salesforce todos se movieron. Saca el pricing actual de la página de pricing de cada vendor. *(falta fuente: página de pricing actual de cada vendor)*
> 2. **Agrega un nuevo H2 entre el actual #4 y #5: "Lo que cambió en 2026"** — toca los features de IA que cada CRM ahora bundlea. Esto es por lo que el SERP ahora está rankeando artículos más nuevos. ~250 palabras.
> 3. **Refuerza H2 #5 ("Mejor para menos de 20 contactos")** — actualmente 180 palabras, puedes duplicarlo con una anécdota de prueba real. La data de PAA muestra que los usuarios están buscando este corte específico.
> 4. **Actualiza internal links** — tu versión vieja linkea a `/crm-pricing-teardown` que ahora redirige. Actualiza a la URL actual `/saas-pricing-deep-dive`.
> 5. **Meta title se queda** (está funcionando, 54 caracteres, keyword primaria al frente).
> 6. **Actualización del meta description** — la actual es el H1 reformulado. Reemplaza con: "Probé 7 CRMs por 90 días cada uno — refrescado para 2026 con nuevos features de IA, pricing actual y el que realmente elegiría hoy." (153 caracteres)
>
> **Secciones que NO deberías tocar:**
> - La sección "Cómo probé estos" es tu espina dorsal de E-E-A-T y está ganando el rank. Déjala.
> - El H1 se queda. Es el título ganando el clic.
>
> **Lo que falta:**
> - Actualmente no abordas "CRM gratis para solopreneurs" — la PAA muestra volumen real en ese corte. Considera agregarlo como un H3 dentro del H2 #4.

---

## Patrón 2: Reescribir alrededor de nueva intención

Cuando tu artículo está rankeando página 3-5 porque Google ahora quiere un formato distinto para esta query.

### Señales de que la intención se ha movido

- Los top 3 resultados hoy son un formato distinto al de cuando publicaste
- Tu CTR está por debajo del 1% incluso en posición 5-7 (significa que estás mostrando pero no estás siendo clickeado)
- Las preguntas PAA han cambiado
- Ha aparecido un AI Overview

### Lo que haces

- Mantén la URL (tiene autoridad)
- Nuevo outline coincidiendo con el nuevo SERP
- Nuevo H1, nuevo meta title, nuevo meta description
- Agrega una nota breve de contexto-de-redirect a quien linkeó la versión vieja, O mantén suficiente del ángulo original como sub-sección para que esos backlinks aún se sientan relevantes

### El prompt

```
Eres el SEO Content Strategist.

Estoy reescribiendo este artículo alrededor de nueva intención. La URL se queda.

**URL del artículo:** [URL]
**Keyword primaria:** [keyword]
**Rank actual:** [posición]
**Top 3 actual del SERP:** [pega]
**El artículo como está:**
[texto completo]

Lo que observé:
- [por qué creo que la intención se movió — qué cambió en el SERP]

Lo que quiero:
1. Clasificación de intención del NUEVO SERP
2. Un nuevo outline (misma profundidad que la plantilla de article outliner)
3. Qué (si alguna) secciones del artículo viejo deberían preservarse verbatim
4. Meta title + description actualizadas
5. Una nota sobre continuidad de backlinks — ¿debería preocuparme por perder alguno?
```

---

## Patrón 3: Consolidar dos artículos competidores

Cuando descubres que te canibalizaste a ti mismo.

### Cómo identificar

- Search Console muestra dos de tus URLs ambas impresionando para la misma keyword
- Ambas URLs flotan en página 2-3 y nunca suben
- Ninguna tiene una ventaja clara en profundidad de contenido o backlinks

### Lo que haces

- Elige la URL sobreviviente (más backlinks, o la que más limpiamente coincida con la query)
- Fusiona el mejor contenido de la URL perdedora en la sobreviviente
- 301 la URL perdedora hacia la sobreviviente
- Actualiza todos los internal links apuntando a la perdedora

### El prompt

```
Eres el SEO Content Strategist.

Tengo dos artículos compitiendo por la misma keyword. Necesito consolidar.

**Keyword:** [keyword primaria]

**Artículo A:**
- URL: [A]
- Rank actual: [posición]
- Backlinks: [conteo]
- Publicado: [fecha]
- [pega artículo completo]

**Artículo B:**
- URL: [B]
- Rank actual: [posición]
- Backlinks: [conteo]
- Publicado: [fecha]
- [pega artículo completo]

Lo que quiero:
1. Elige la URL sobreviviente con razonamiento
2. Un outline unificado tomando lo mejor de ambos
3. El draft fusionado completo
4. Una lista de internal links actualmente apuntando a la URL perdedora que necesitan update
5. El plan de 301
```

---

## Patrón 4: Reescritura mayor (la query ha cambiado fundamentalmente)

La llamada más difícil. El artículo todavía rankea pero el mundo se movió. Ejemplos: un AI Overview ahora responde la query así que el tráfico cayó 60%; el framework sobre el que escribiste se deprecó; el comportamiento de búsqueda se movió de texto a video.

### Lo que haces

- Reescritura mayor, frecuentemente un nuevo ángulo por completo
- Decide el destino de la URL basado en el valor de los backlinks: si la URL tiene backlinks fuertes, mantenla y reescribe; si no, una URL fresca está bien
- Actualiza meta, schema, internal links

Esto no es realmente un "refresh" — es un artículo nuevo usando la autoridad de la URL vieja. Trátalo como escribir una pieza nueva, usando la plantilla de article outliner (`templates/article-outliner.md`).

---

## Patrón 5: Borrar y 301

Cuando el tema está genuinamente deprecated.

### Ejemplos

- Un producto que reviewaste cerró
- Una ley sobre la que escribiste fue reemplazada
- Un framework que enseñaste se retiró
- Un artículo de tendencia cuyo momento pasó y no te interesa actualizarlo

### Lo que haces

- 301 la URL al artículo actual más cercano
- Si nada está cerca, devuelve 410 (gone) para que Google la remueva limpiamente
- No solo borres y la dejes 404 — eso es equity de backlinks desperdiciada

---

## El prompt analizador de intención del SERP

Usa esto cuando no puedas decidir QUÉ patrón de refresh aplica.

```
Eres el SEO Content Strategist.

Ayúdame a clasificar qué tipo de refresh necesita este artículo.

**URL del artículo:** [URL]
**Keyword primaria:** [keyword]
**Rank actual:** [posición]
**Tendencia de 12 meses:** [mejorando / estable / declinando]
**Top 3 resultados del SERP hoy:** [pega]

**El artículo (pega):**
[artículo completo]

Corre mi árbol de decisión de refresh. Dime:
1. Qué patrón encaja (update in place / intent rewrite / consolidate / major rewrite / delete)
2. El razonamiento
3. El primer paso concreto que debería tomar
```

El output debería ser una respuesta clara de "patrón X porque Y" más el primer paso. Si la IA matiza o dice "depende", empújala: "Si tuvieras que elegir uno, ¿cuál?".

---

## Ejemplo trabajado — "what is HubSpot used for"

Una decisión de refresh real. El artículo rankea #4. El CTR es 0.8%. El top 3 del SERP ahora está dominado por respuestas cortas estilo definición con un AI Overview citando dos de ellas. El artículo actualmente tiene 1,800 palabras y empieza con pitch de marketing.

**Corrida del árbol de decisión:**
- ¿Página 1? Casi (#4). Territorio de página 2.
- ¿Mismatch de intención? Sí — el SERP quiere contenido corto, definicional, hecho-primero. El artículo es longform y de inclinación marketing.
- ¿Dos artículos compitiendo? No.
- ¿Query fundamentalmente cambiada? Sí-más-o-menos — la presencia del AI Overview ha comprimido el valor del clic.
- ¿Tema deprecated? No, HubSpot muy bien existe.

**Veredicto:** Patrón 2 (reescribir alrededor de nueva intención). Mantén la URL (tiene 12 backlinks). Reestructura como una pieza definicional con los hechos primero, con una respuesta apretada de 50 palabras al inicio, después expansiones. Quita el tono de pitch de marketing. Targetea el featured snippet directamente.

**Outcome esperado:** el rank sube de #4 a #1-2, pero los números absolutos de clics pueden no saltar dramáticamente porque el AI Overview está comiendo el clic de todas formas. La victoria es presencia de marca en las citas de IA y recuperar tráfico orgánico para queries de variantes con marca.

---

## Errores comunes de refresh que el kit marcará

- **Cambiar la URL de un artículo rankeando página 1.** Vas a perder el rank y el equity de backlinks. Refresca in place.
- **Borrar un artículo sin hacer 301.** Backlinks desperdiciados, errores 404 en Search Console.
- **Refrescar sin checar por qué cayó el tráfico.** A veces el artículo está bien y la QUERY cayó en volumen. Checa las impresiones totales en Search Console antes de asumir que el artículo es el problema.
- **Refrescar muy seguido.** Una vez cada 6-12 meses es la cadence correcta para la mayoría de los artículos. Refrescar mensualmente le parece sospechoso a Google y te quema el tiempo.
- **Actualizar `dateModified` sin actualizar sustancia.** Google detecta esto y descuenta la señal de freshness.
- **Quitar secciones que están ganando los rankings.** Siempre mira data de scroll depth y time-on-section antes de cortar.

---

## Cadence de refresh — cómo planear un año

Un equipo de contenido pequeño puede productivamente refrescar 4-8 artículos al mes. Un operador solo debería targetear 2-3 por mes, priorizados por:

1. Artículos que han perdido más tráfico absoluto en los últimos 90 días
2. Artículos rankeando posición 4-15 con alto potencial de CTR
3. Artículos linkeados desde tus páginas de alto tráfico (refrescar estos compone el beneficio del internal-link)
4. Artículos de 18+ meses que no se han tocado

Corre el árbol de decisión de refresh en cada uno. Elige el patrón. Ejecuta. No refresques y republiques todos; algunos te van a decir que borres o consolides. Ese es el playbook funcionando.
