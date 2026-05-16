# Playbook de refunds y disputas

Cuando el dinero ya se movió, las cosas se complican. Acá está el árbol de decisión.

## Las cuatro situaciones comunes

### 1. El cliente pide un refund total, sin disputa

Refund iniciado por el operador. Caso fácil.

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  refund_application_fee: true, // refundar también la parte de la plataforma
  reverse_transfer: true,        // jala el dinero de vuelta de la connected account
});
```

Si `reverse_transfer: true` y la connected account no tiene balance suficiente, Stripe crea un débito y la connected account termina con balance negativo hasta su siguiente ciclo de payout.

Surfacea esto en tu admin UI: "Este refund va a jalar USD $X del próximo payout de [Org]."

### 2. El cliente pide un refund parcial

Mismo código, con `amount`:

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  amount: 5000, // USD $50 en centavos
  refund_application_fee: true,
  reverse_transfer: true,
});
```

Stripe refunda proporcionalmente la fee de la plataforma. Si el split original fue 50/50 (USD $60/USD $60 sobre USD $120) y el cliente recupera USD $50, el refund de la platform fee es USD $25 y la reversa del transfer de la connected account es USD $25.

Si quieres un split distinto (p. ej., la plataforma absorbe el refund entero), pon `refund_application_fee: false` y revierte manualmente:

```ts
await stripe.refunds.create({ payment_intent: pi.id, amount: 5000 });
// Sin reverse_transfer, sin refund_application_fee — la plataforma lo absorbe.
```

### 3. El cliente abre un chargeback con su banco

Esto es una disputa, no un refund. Ciclo de vida distinto.

El banco del cliente jala el dinero de vuelta de Stripe. Stripe lo jala de tu plataforma. Recibes un webhook `charge.dispute.created`. Tienes ~7-14 días para enviar evidencia.

```ts
async function handleDispute(d: Stripe.Dispute) {
  // 1. Notifica al operador (a ti) — esto necesita atención humana.
  await sendDisputeAlert(d);

  // 2. Marca la compra como disputada en tu DB.
  await db.from("purchases")
    .update({ disputed_at: new Date().toISOString(), dispute_reason: d.reason })
    .eq("stripe_payment_intent", d.payment_intent);

  // 3. Si la connected account debería saberlo, notifícala también.
  await notifyConnectedAccount(d);
}
```

Cuando envíes evidencia, hazlo por el dashboard las primeras veces — el formulario web de Stripe es más guiado que la API. Una vez que tengas un proceso, automatiza vía `stripe.disputes.update`.

Si ganas la disputa, el dinero vuelve. Si pierdes, el chargeback queda y la connected account también puede perder su parte.

### 4. Refund DESPUÉS de que ya pasó el payout

Mismo código que el caso 1 o 2. Stripe maneja la contabilidad. La connected account termina con balance negativo en su libro mayor de Stripe hasta su siguiente cobro o hasta que recargue por transferencia bancaria.

Operacionalmente, este es el lugar donde más se equivoca el customer service. Construye un interstitial de "¿estás seguro?" en tu admin UI que diga: "Esto va a jalar USD $X de la cuenta de [Org], que actualmente tiene USD $Y de balance. Va a quedar en posición de balance negativo hasta su siguiente payout."

## Edge cases

### Transacción disputada, ya con refund parcial

Si ya refundaste USD $50 de una transacción de USD $120 y el cliente disputa los USD $70 restantes, Stripe disputa el cobro original completo (USD $120) menos los USD $50 refundados = USD $70 en scope. Tu paquete de evidencia debería mencionar el refund parcial.

### La connected account se va de la plataforma a mitad de disputa

Dos casos:

1. **Cuenta en buen estado, solo se va:** Las disputas contra sus cobros siguen yendo a tu plataforma. Resuélvelas, después cierra la cuenta.
2. **Cuenta suspendida por fraude o violación:** Stripe puede retener su balance para cubrir disputas anticipadas por 90 días. La connected account no recibe su payout final hasta que ese período expire.

Documenta el flujo de offboarding con la connected account antes de hacer offboarding a una en producción.

### Desajuste de moneda en el refund

Si cobraste en CAD y la connected account tiene payouts en USD, Stripe convierte y cobra una fee de FX. La plataforma usualmente la absorbe (UX más limpio). Asegúrate que tu cálculo de monto de refund tenga en cuenta la pequeña pérdida de FX si estás tratando de dejar al cliente exactamente entero.

## Qué surfacear en tu admin UI

Por cada transacción:

- Monto y fecha del cobro original
- Platform fee, parte de la connected account, fee de Stripe
- Cualquier refund (fecha, monto, quién lo inició)
- Cualquier disputa (estado, deadline de evidencia, resultado)
- Botón "Refund this" con una confirmación que muestre el impacto en dólares sobre cada parte

Si no puedes responder "qué pasó con esta transacción" en menos de 30 segundos, tu admin UI no está terminado.
