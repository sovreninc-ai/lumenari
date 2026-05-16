# Solopreneur Toolkit

> El papeleo y los posts de visibilidad que mantienen funcionando un negocio de una sola persona. Construido para el freelancer que preferiría estar haciendo el trabajo en vez de escribir la propuesta, pero sabe que la propuesta es lo que cobra.

**Optimizado para:** cualquier herramienta de IA — Claude, ChatGPT, Gemini, Cursor, Codex. Pega el optimization pack como system prompt o suéltalo al inicio de una conversación nueva.

---

## Modo de operación

Estás ayudando a un operador solo a llevar el lado de negocio de hacer el trabajo. El usuario probablemente es:

- Un freelancer, consultor, diseñador, developer, copywriter, coach, fractional cualquier-cosa
- Cobra por proyecto, por hora o por mes
- Es su propio equipo de ventas, ops, AR/AP y marketing
- Alérgico al lenguaje corporativo, pero necesita sonar creíble frente a clientes

Supuestos por defecto:

- Tiene una conversación real con un cliente esta semana, no un funnel hipotético
- Quiere un draft para editar, no una página en blanco que mirar
- Va a pegar el output en Gmail, Notion, HoneyBook, Stripe, LinkedIn — manten el formato limpio
- El dinero está en CAD o USD a menos que se indique; siempre guardarlo como números simples + código de moneda
- El lenguaje legal recibe una etiqueta "consulta a un abogado en tu jurisdicción" cada vez que aparece

**Tono por defecto:**

- Sencillo, segunda persona, conversacional. La forma en que le escribirías a un cliente con el que ya trabajaste.
- Confiado sin presumir. Específico sin ser un folleto.
- Sin "encantado de", sin "rock star", sin "ambiente acelerado", sin "sinergia".
- Si no lo dirías en voz alta tomando un café, no lo pongas en la propuesta.

**Lo que este kit se niega a producir:**

- Propuestas con una sección "Sobre nosotros" de 12 párrafos
- Posts de LinkedIn que empiezan con "Estoy tan humildemente emocionado de anunciar"
- Recordatorios de pago tardío que suenan pasivo-agresivos
- SOWs de 9 páginas cuando 2 alcanzaban
- Páginas de pricing que entierran el precio

---

## Lo que hay adentro

### 1. Generador de propuestas con tres patrones de pricing por tiers (`templates/proposal-and-sow.md`)

Tres patrones de pricing tiers que realmente cierran: Good/Better/Best, Fixed/Phased/Retainer y Outcome-based. Cada uno viene con el lenguaje exacto para anclar la opción intermedia. Más una plantilla de SOW que rellenas en lugar de escribir desde cero, y un intake form de discovery call para preguntar ANTES de cotizar.

### 2. Updates a clientes y nudges de factura (`templates/client-updates-and-invoices.md`)

El update semanal a clientes que toma 4 minutos escribir y para los emails de "hey, solo para checar". Copy de factura que se cobra. Recordatorios de pago tardío a 7, 14 y 30 días — profesionales, escalando, nunca quejosos.

### 3. Playbook de pricing y niching (`playbooks/pricing-and-niching.md`)

Los scripts que dices en voz alta cuando un cliente empuja contra el precio. Cómo subir tarifas a clientes existentes sin perderlos. El prompt de brainstorm que te ayuda a nichearte realmente en lugar de quedarte como "un generalista que hace un poco de todo".

### 4. Optimization pack y inicio rápido

`optimization-pack.md` es el system prompt completo — pega una vez, corre todas las plantillas desde una sola IA configurada. `quick-start.md` te lleva por el setup de 60 segundos en Claude, ChatGPT, Gemini, Cursor y Codex.

`custom-gpt-instructions.md` es la versión Custom GPT para ChatGPT — pégalo en el campo de instrucciones y tienes un Solopreneur GPT.

---

## Los patrones de prompt

Para cada artefacto en este kit, la IA funciona mejor con esta forma de input:

```
[Quién soy]
Rol + nicho (p. ej., "diseñador de marca freelance, sobre todo SaaS startups, 5 años en esto")

[Quién es el cliente]
Nombre, qué hacen, cómo nos conectamos, qué creen que necesitan

[Qué quiero]
El artefacto específico — propuesta, SOW, update semanal, nudge de factura, post de LinkedIn

[Restricciones]
Rango de presupuesto, timeline, cualquier cosa sensible (p. ej., "ghostearon la factura anterior")
```

Saltarse la línea de [Quién soy] es la razón #1 por la que las propuestas salen genéricas. La IA no sabe si eres un escritor de $75/hr o un consultor de $20K/proyecto a menos que se lo digas.

---

## Tres patrones a los que este kit te empujará

### Patrón 1: Siempre cotiza tres tiers

Las propuestas de un solo precio se comparan con otras propuestas de un solo precio. Las propuestas de tres tiers hacen que el cliente elija entre TUS tres opciones. Incluso si eligen la intermedia (usualmente lo hacen), tú controlaste el frame.

Ejemplo trabajado para un proyecto de website:

- **Essentials** — 5 páginas, tu copy, mi diseño + build. CAD $4,500.
- **Standard** — 8 páginas, workshop de copywriting incluido, build + launch + 30 días de tweaks post-launch. CAD $7,800. *(la mayoría de clientes elige este)*
- **Premium** — Todo lo de Standard, más brand refresh, 90 días de soporte post-launch, revisión de conversión al día 60. CAD $12,500.

La línea `(la mayoría de clientes elige este)` en la opción intermedia es el anchor. Úsala.

### Patrón 2: Discovery antes de cotizar

Las propuestas que cierran son las que se escriben DESPUÉS de una discovery call de 30 minutos. Las propuestas que se ghostean son las que se escriben desde un DM de un párrafo. El intake form en `templates/proposal-and-sow.md` es la estructura de la llamada — úsalo antes de cotizar, no después.

### Patrón 3: Los updates le ganan a los check-ins

El formato de update semanal a clientes mata los emails de "hey, solo para checar" en ambas direcciones. Cinco líneas máximo. Qué se hizo, qué sigue, qué necesito de ti. La plantilla está en `templates/client-updates-and-invoices.md`.

---

## El lado de visibilidad

Un solopreneur sin pipeline está a un mal mes de mandar una solicitud de empleo. Las plantillas de LinkedIn en este kit están escritas para el operador que encuentra postear cringe pero sabe que funciona.

Tres formatos que consistentemente traen inbound:

1. **El post de build-in-public** — "Aquí está lo que acabo de entregar para un cliente (con permiso)". Concreto, screenshot-friendly, sin humblebrag.
2. **El post de enseña-una-cosa** — Elige un error que solías cometer, nómbralo, explica el fix. 4-6 líneas.
3. **El auto-responder de "voy de vacaciones" + post de follow-up** — Las reservas a menudo se disparan justo después de anunciar que estás cerrado. Contraintuitivo pero consistente.

Los tres están en `playbooks/pricing-and-niching.md` con copy listo para pegar.

---

## Contratos, impuestos y la línea del abogado

Este kit produce drafts. No produce documentos legales finales y vinculantes.

- Cada SOW y propuesta que mandes debería ser revisada por un abogado en tu jurisdicción al menos una vez, después puedes reutilizar la plantilla.
- La clasificación de contratista independiente varía por país y estado/provincia. El kit redacta, pero no decide.
- El manejo de impuesto sobre las ventas / GST / HST / VAT es tu trabajo — las plantillas dejan líneas de placeholder para que las llenes.

Cuando se le pida a la IA producir una cláusula contractual, debe agregar:

> *Consulta a un abogado en tu jurisdicción antes de apoyarte en esta cláusula.*

Esa línea no es negociable. Está en el optimization pack.

---

## Lo que este kit NO va a hacer por ti

- Encontrarte clientes. Los posts de visibilidad ayudan, pero el kit no corre tu outreach.
- Decidir tus precios. Te da frameworks y scripts, pero tú pones el número.
- Reemplazar a un contador. Las plantillas de pago tardío no van a arreglar a un cliente crónicamente lento.
- Hacerte nichearte. El prompt de brainstorm te ayuda a PENSARLO. La decisión sigue siendo tuya.

---

## Docs complementarios

- `optimization-pack.md` — system prompt completo para cualquier chat con IA
- `custom-gpt-instructions.md` — ChatGPT Custom GPT formateado
- `quick-start.md` — setup de 60 segundos por plataforma
- `templates/proposal-and-sow.md` — generador de propuestas de tres tiers, plantilla de SOW, intake-call form
- `templates/client-updates-and-invoices.md` — updates semanales, copy de facturas, recordatorios de pago tardío
- `playbooks/pricing-and-niching.md` — scripts de conversación de pricing, brainstorm de niching, plantillas de LinkedIn
