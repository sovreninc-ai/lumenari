# Updates a Clientes y Nudges de Factura

El lado aburrido del trabajo solo — decirles a los clientes lo que has hecho, pedirles que paguen y perseguirlos cuando no lo hacen. Este archivo es el copy que hace las tres cosas sin sonar como un robot o un tapete.

---

## Parte 1 — El update semanal al cliente

El email de mayor leverage en el trabajo solopreneur. Enviado cada viernes (o el día que te comprometas) como reloj. Después de 3 de estos, los emails de "hey, solo para checar" de tu cliente se acaban. Su jefe deja de preguntarles dónde está el proyecto. Te vuelves de baja-ansiedad para ellos.

### El formato — cinco líneas máximo

```
**Esta semana:**
- [Entregable concreto entregado o movido adelante]
- [Entregable concreto entregado o movido adelante]

**La próxima semana:**
- [Entregable]
- [Entregable]

**Necesito de ti:**
- [Decisión o asset específico, con fecha — o "nada ahora mismo"]

**Estado:** En curso / Atención / Bloqueado
**Próximo update:** [Fecha]
```

### Pega este prompt a la IA

```
Eres el Solopreneur Co-Pilot.

Escribe un update de cliente de viernes para [NOMBRE DEL CLIENTE] sobre el proyecto [NOMBRE DEL PROYECTO]. Usa el formato estándar de 5 líneas.

Esta semana:
- [BULLET 1]
- [BULLET 2]
- [BULLET 3]

La próxima semana voy a:
- [BULLET 1]
- [BULLET 2]

Necesito de ellos:
- [PEDIDO]

Estado: [En curso / Atención / Bloqueado — y una frase del por qué si no está En curso]

Manténlo en menos de 100 palabras. Lenguaje sencillo. Sin "Espero que este email te encuentre bien".
```

### Ejemplo de output trabajado

> Asunto: Brand refresh — update semana 2
>
> **Esta semana:**
> - Primera ronda de dirección visual entregada (link de Figma, comentarios abiertos)
> - Notas del workshop de posicionamiento consolidadas en el draft del voice-doc
>
> **La próxima semana:**
> - Ronda 2 de dirección visual basada en tu feedback
> - Primer draft de la plantilla del pitch deck
>
> **Necesito de ti:**
> - Comentarios en el archivo de Figma para el martes 21 de mayo
>
> **Estado:** En curso
> **Próximo update:** Viernes 24 de mayo

Ese email tomó 4 minutos en escribirse. Te va a ahorrar 40 minutos de conversaciones de "¿dónde estamos?" la próxima semana.

### Cuando el estado es Atención o Bloqueado

Siempre agrega UNA frase explicando por qué. Nunca solo "Atención". Ejemplos:

- **Atención — esperando copy del equipo de marketing desde el martes; voy a reshuffle la próxima semana si no llega para el lunes.**
- **Bloqueado — el ambiente de staging no se ha aprovisionado todavía. Le escribí a tu dev lead el miércoles; ¿puedes hacerle ping?**

Nombrar el bloqueo le dice al cliente que tiene que hacer algo. Un "atención" vago los pone ansiosos.

---

## Parte 2 — Copy de factura

La factura en sí es mayormente un form (tu herramienta de facturación — Stripe, FreshBooks, HoneyBook, Wave, QuickBooks, lo que sea — la genera). El COPY que va alrededor de la factura es lo que cambia.

### Email estándar de envío de factura

```
Asunto: Factura [###] — [Nombre del proyecto]

Hola [Nombre],

La factura [###] está adjunta / linkeada abajo. Resumen:
- [Item 1]: $X
- [Item 2]: $X
- **Total:** $X (Net 14)

Puedes pagar por [métodos aceptados]. Si necesitas un formato distinto para tu equipo de AP, avísame.

Gracias,
[Tú]
```

Notas:

- **Indica los términos net en el email**, no solo en el PDF de la factura. Los equipos de AP necesitan esto por escrito.
- **No escribas "¡Gracias por tu negocio!"** — se lee como necesitado. "Gracias" solo está bien.
- **No te disculpes por la factura.** Es el trabajo.

### Pega este prompt a la IA

```
Eres el Solopreneur Co-Pilot.

Escribe un email de envío de factura para [NOMBRE DEL CLIENTE]. Proyecto: [NOMBRE]. Total: [CANTIDAD] CAD/USD. Términos: Net [7/14/30]. Métodos de pago: [STRIPE/INTERAC/ACH/CHEQUE/ETC].

Manténlo en menos de 70 palabras. Sin "¡Gracias por tu negocio!". Sin disculpas.
```

---

## Parte 3 — Recordatorios de pago tardío

La escalación de tres tiers. Cada tier es un email separado, enviado en su propio día. Nunca combinar.

### Día 7 pasada la fecha — el nudge amistoso

Tono: asume descuido, no mala fe. La mayoría de las facturas que se pasan de Net 14 están sentadas en el inbox de alguien; no es malicioso, solo está enterrada.

```
Asunto: Re: Factura [###]

Hola [Nombre],

Un nudge rápido — la factura [###] del [fecha] vencía el [fecha], y no la he visto entrar. Sé lo fácil que es que se pierdan estas cosas. ¿Puedes checar con AP y avisarme cuándo puedo esperarla?

Si hay un hold-up de tu lado, con gusto lo hablamos.

Gracias,
[Tú]
```

### Día 14 pasada la fecha — más firme, menciona la política

Tono: aún educado. El cliente ahora sabe que estás trackeando. Si tienes una política de late fee en tu SOW, aquí es donde aparece.

```
Asunto: Factura [###] — aún pendiente

Hola [Nombre],

Dándole seguimiento — la factura [###] ahora lleva 14 días vencida. Conforme a nuestro SOW, aplica un late fee del 1.5% después de 14 días; eso se ha agregado a la factura actualizada adjunta.

Si hay algo que pueda hacer para ayudar a destrabar esto de tu lado, avísame. Si no, vuelvo a checar la próxima semana.

Gracias,
[Tú]
```

Si no tienes cláusula de late fee, omite esa línea. No improvises una — tu cliente puede tener el SOW abierto.

### Día 30 pasada la fecha — formal, el trabajo se pausa

Tono: sigue profesional, pero las consecuencias son reales y declaradas. Estás pausando el trabajo, y quieres una llamada.

```
Asunto: Factura [###] — pausando trabajo

Hola [Nombre],

La factura [###] ahora lleva 30 días vencida. A partir del [fecha], estoy pausando el trabajo adicional en [PROYECTO] hasta que se liquide el saldo. Preferiría no hacerlo — hagamos una llamada de 15 minutos esta semana para resolverlo.

Horarios que puedo: [3 opciones].

Si este es el contacto equivocado para AP, por favor pon en copia a quien deba estar hablando.

Gracias,
[Tú]
```

### Lo que NO haces

- "Solo dándole seguimiento otra vez..." por quinta vez. Después del Día 30, mandaste tres emails escalando. El cuarto es la llamada, no un cuarto email.
- Finales pasivo-agresivos ("¿Asumo que esto no es prioridad?")
- Amenazas que no puedes respaldar ("Voy a tener que involucrar a mi abogado") — a menos que realmente lo hagas, y a menos que el monto lo justifique.
- Humillación pública. No tuitees al respecto, no postees. La reputación va en ambas direcciones.

### Cuándo escalar más allá del email

Si lleva 45 días vencido sin respuesta: manda un email final diciendo que lo estás entregando a un servicio de cobranza o proceso de small-claims, después hazlo realmente. La amenaza-sin-acción te hace ver blando. La acción-sin-aviso es poco profesional. Siempre un email final nombrando la acción y la fecha.

---

## Parte 4 — El email de "scope creep" a mitad de proyecto

Adyacente a la facturación. Cuando el cliente pide "solo una cosa más" que no está en el SOW.

### La plantilla

```
Asunto: Re: [su pedido]

Hola [Nombre],

Con gusto reviso [lo nuevo]. Aviso — está fuera del scope que acordamos en el SOW (Sección 2: Out of Scope). Lo puedo manejar como Change Request:

- Opción 1: Agregarlo como add-on fijo por $[X]. Agrega [Y] días al timeline.
- Opción 2: Apartarlo para una Fase 2 después de terminar el scope actual.

¿Por cuál quieres ir?

Gracias,
[Tú]
```

Nota lo que esta plantilla NO hace:

- No dice "claro, lo puedo encajar". Así es como el scope creep se come tu margen.
- No se disculpa por cobrar por trabajo nuevo.
- No le da lecciones al cliente sobre qué es scope creep. Solo lo nombra y ofrece opciones.

---

## Cheat sheet — qué mandar cuándo

| Situación | Manda esto |
|---|---|
| Fin de cada semana | Update semanal (5 líneas) |
| Factura lista | Email de envío de factura (menos de 70 palabras) |
| 7 días vencido | Nudge amistoso |
| 14 días vencido | Recordatorio más firme, menciona política |
| 30 días vencido | Email de pausa de trabajo + pedido de llamada |
| 45 días vencido | Email final nombrando la siguiente acción |
| Cliente pide algo fuera de scope | Oferta de Change Request (2 opciones) |

Mete estos en tu snippets manager (TextExpander, Raycast, Alfred, lo que sea). La fricción de escribir el mismo email una y otra vez es lo que hace que los solopreneurs dejen que las facturas se les escapen.

---

## Errores comunes que el kit señalará

- "Solo para checar" — reemplaza con un estado o pregunta específica
- "Espero que este email te encuentre bien" — córtalo, no agrega nada
- "Perdón por molestar" — nunca te disculpes por dinero que te deben
- Recordatorios que no nombran una cantidad en dólares o número de factura — sé específico
- Updates sin fecha para el próximo update — siempre incluye
- Estado "En curso" cuando algo se está deslizando — llámalo Atención
