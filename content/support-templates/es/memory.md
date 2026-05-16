# Memoria — Customer Support Templates

## Contexto del dominio

Una persona de soporte pasa su día dentro de una cola. Los tickets llegan vía email, chat, social, o a veces teléfono. La plataforma es Zendesk, Intercom, Help Scout, Front, o para founders solos, Gmail plano. El trabajo es: leer el ticket, averiguar qué necesita el cliente, decidir qué puedes hacer, escribir la respuesta. Repetir 30-100 veces al día.

Las respuestas difíciles son aquellas donde estás diciendo no — refunds denegados, "no podemos agregar ese feature", "tu cuenta fue suspendida". Las fáciles son "enviado hoy, aquí está el link de tracking". La mayoría caen en medio. El tono importa más de lo que la gente cree — el mismo contenido entregado frío vs. cálido produce una reacción del cliente totalmente distinta.

Los founders solos haciendo su propio soporte usualmente son más cálidos de lo que necesitan ser, y más lentos de lo que deberían. Los equipos de soporte a escala usualmente default a formal y terminan sonando como un robot. Ambos están dejando valor de relación sobre la mesa.

También hay una regla silenciosa que los mejores supports entienden: no solo estás resolviendo un ticket, estás construyendo (o erosionando) la percepción del cliente de la empresa. Un refund rechazado perfectamente manejado puede salvar una relación. Un refund otorgado mal manejado aún puede perder una.

## Vocabulario que la IA debe conocer

- **Ticket**: una conversación de soporte iniciada por el cliente. Tiene un status (abierto, pendiente, resuelto, cerrado).
- **Macro**: una plantilla de respuesta guardada en Zendesk. Intercom las llama "saved replies". Help Scout las llama "saved replies" también.
- **First response time (FRT)**: cuánto tarda hasta que el cliente recibe *cualquier* respuesta. La métrica más vigilada en soporte.
- **Resolution time**: creación del ticket a status "solved". Menos honesto que FRT — los agentes cierran prematuramente para gamearlo.
- **CSAT**: Customer Satisfaction. Usualmente una encuesta 1-5 o 1-7 enviada después de que un ticket se cierra. Apunta a 90%+ "muy satisfecho".
- **NPS**: Net Promoter Score. Escala 0-10. Promotores (9-10), pasivos (7-8), detractores (0-6). Score = %promotores - %detractores.
- **Detractor recovery**: outreach a clientes que dieron 0-6 NPS para averiguar qué está mal e intentar arreglarlo.
- **Escalation**: pasar un ticket a un rep senior, manager o equipo especializado. Usualmente tiene un SLA interno de 24-48 horas.
- **SLA**: Service Level Agreement. El tiempo de respuesta/resolución prometido, usualmente contratado a nivel enterprise.
- **Refund window**: cuántos días después de la compra un refund es automáticamente elegible. Normas de industria: 14 días (SaaS), 30 días (DTC), 365 días para Costco.
- **Chargeback**: cuando un cliente disputa un cargo a través de su banco en lugar de pedirle al merchant. Le cuesta al merchant una tarifa (~$15-25) encima del refund.
- **Stripe Dashboard**: donde la mayoría del SaaS moderno procesa refunds. Un clic, dinero de vuelta en 5-10 días.
- **Upsell desde soporte**: ofrecer un plan upgrade durante una interacción de soporte. Solo apropiado cuando el cliente está feliz Y el upgrade resuelve su problema real.

## Workflows comunes

- **Procesar un pedido de refund**: lee el ticket → revisa la fecha del pedido y la política de refund → revisa el historial del cliente (¿primera vez? ¿de mucho tiempo? ¿issues pasados?) → decide: completo, parcial, denegado → si se otorga, procesa en Stripe/Shopify → responde con la resolución y razón → si se deniega, ofrece 2-3 alternativas.
- **Manejar un pedido perdido**: confirma que el pedido fue enviado → revisa tracking → si "entregado" pero el cliente dice lo contrario, pide foto del porche → si genuinamente perdido, reemplaza o reembolsa → contacta al carrier por back-channel si pasa seguido.
- **Reconocer una escalación**: responde dentro de 1 hora con "He escalado esto a [nombre/equipo]" y el timeline realista → nunca prometas un fix que no puedas confirmar → pon la expectativa para el próximo tiempo de update.
- **NPS detractor recovery**: ves un score 0-6 → responde dentro de 24 horas desde una persona real (no "¡gracias por tu feedback!") → haz una pregunta específica → escucha → propón un fix o compensación si es apropiado.
- **Upsell-desde-soporte (raro-pero-correcto)**: el cliente está feliz con la resolución → su necesidad real está en un tier más alto → menciónalo una vez, brevemente, con la matemática → no empujes.

## Qué evitar / errores comunes

- "Nos disculpamos sinceramente por cualquier inconveniente que esto pueda haber causado". Cliché de soporte de bottom-tier. El reconocimiento específico siempre le gana a la disculpa genérica.
- Liderar con la disculpa, enterrar la resolución. Los clientes quieren saber qué estás haciendo, después por qué.
- "Conforme a nuestra política..." sin explicar la razón. Si la razón tiene sentido, da la razón. Si no, cambia la política.
- Timelines vagos: "pronto", "en breve", "en su debido momento". Sé específico o sé silencioso.
- "Por favor siéntete libre de contactar si tienes preguntas" como cierre. Reemplaza con el próximo paso real o una despedida real.
- Disculpas de múltiples párrafos antes de la sustancia. Dos frases máximo en el lado de la disculpa.
- Despedidas de form-letter: "el equipo en [Empresa]", "Customer Happiness Team". Usa un nombre real.
- Tono mezclado — empezando formal, deslizándose a cálido a mitad. Elige uno.
- Hacer upsell cuando el cliente está infeliz. Se lee como cínico, mata la relación.
- "Espero que este email te encuentre bien". Escribieron con un problema. Reconoce el problema.

## Tono / registro

Un gran escritor de soporte empareja con la voz de marca sin perder la suya propia. Escribe al nivel de lectura del cliente — frases más cortas, menos comas, palabras planas. Nunca usa jerga que el cliente no usó primero. Es cálido sin ser empalagoso, profesional sin ser frío, honesto sin ser tajante. Dice "yo" cuando quiere decir yo, y "nosotros" cuando quiere decir la empresa.

El vocabulario interno: tickets, macros, FRT, CSAT, escalaciones, chargebacks, refund window. El vocabulario externo: "tu pedido", "tu cuenta", "el issue", "lo que pasó". Nunca uses jerga interna en copy de cara al cliente.

Las buenas personas de soporte son ligeramente más directas de lo que la voz de marca sugiere que deberían ser. Han aprendido que los clientes prefieren un "no" corto y claro con un camino hacia adelante sobre un largo y educado "lamentamos informarte".
