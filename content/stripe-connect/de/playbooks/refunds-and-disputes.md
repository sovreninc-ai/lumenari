# Refunds- und Disputes-Playbook

Wenn Geld bereits geflossen ist, werden Dinge kompliziert. Hier der Entscheidungsbaum.

## Die vier häufigen Situationen

### 1. Kunde bittet um vollen Refund, kein Dispute

Operator-initiierter Refund. Einfacher Fall.

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  refund_application_fee: true, // refund the platform's cut too
  reverse_transfer: true,        // pull money back from the connected account
});
```

Wenn `reverse_transfer: true` und der verbundene Account unzureichendes Guthaben hat, erzeugt Stripe ein Debit, und der verbundene Account endet mit einem Negativ-Balance bis zu seinem nächsten Auszahlungszyklus.

Surface das in deiner Admin-UI: "Dieser Refund wird $X aus [Org]s nächster Auszahlung ziehen."

### 2. Kunde bittet um partiellen Refund

Derselbe Code, mit `amount`:

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  amount: 5000, // $50 in cents
  refund_application_fee: true,
  reverse_transfer: true,
});
```

Stripe erstattet die Plattform-Fee proportional. Wenn der ursprüngliche Split 50/50 war ($60/$60 auf $120) und der Kunde $50 zurückbekommt, ist der Plattform-Fee-Refund $25 und der Transfer-Reverse des verbundenen Accounts $25.

Wenn du einen anderen Split willst (z.B. die Plattform schluckt den gesamten Refund), setze `refund_application_fee: false` und reverse manuell:

```ts
await stripe.refunds.create({ payment_intent: pi.id, amount: 5000 });
// No reverse_transfer, no refund_application_fee — platform absorbs it.
```

### 3. Kunde reicht einen Chargeback bei seiner Bank ein

Das ist ein Dispute, kein Refund. Anderer Lifecycle.

Die Bank des Kunden zieht das Geld zurück von Stripe. Stripe zieht von deiner Plattform. Du bekommst einen `charge.dispute.created`-Webhook. Du hast ~7-14 Tage, um Evidence einzureichen.

```ts
async function handleDispute(d: Stripe.Dispute) {
  // 1. Notify the operator (you) — this needs human attention.
  await sendDisputeAlert(d);

  // 2. Mark the purchase as disputed in your DB.
  await db.from("purchases")
    .update({ disputed_at: new Date().toISOString(), dispute_reason: d.reason })
    .eq("stripe_payment_intent", d.payment_intent);

  // 3. If the connected account should know, notify them too.
  await notifyConnectedAccount(d);
}
```

Wenn du Evidence einreichst, mach es für die ersten paar via Dashboard — Stripes Web-Formular ist geführter als die API. Sobald du einen Prozess hast, automatisiere via `stripe.disputes.update`.

Wenn du den Dispute gewinnst, kommt das Geld zurück. Wenn du verlierst, bleibt der Chargeback, und der verbundene Account verliert möglicherweise auch seinen Anteil.

### 4. Refund NACH erfolgter Auszahlung

Derselbe Code wie Fall 1 oder 2. Stripe handhabt die Buchhaltung. Der verbundene Account endet mit einem Negativ-Balance auf seinem Stripe-Ledger, bis zu seiner nächsten Charge oder bis er via Bank-Transfer auflädt.

Operativ ist das der Ort, an dem Customer Service am häufigsten falsch geht. Baue eine "Bist du sicher?"-Interstitial in deine Admin-UI, das sagt: "Das wird $X aus [Org]s Konto ziehen, das aktuell $Y Balance hat. Sie werden in einer Negativ-Balance-Position sein bis zur nächsten Auszahlung."

## Edge Cases

### Disputete Transaktion, halb schon refundet

Wenn du bereits $50 einer $120-Transaktion erstattet hast und der Kunde die verbleibenden $70 disputet, disputet Stripe die volle ursprüngliche Charge ($120) minus die erstatteten $50 = $70 im Scope. Dein Evidence-Paket sollte den partiellen Refund erwähnen.

### Verbundener Account verlässt die Plattform mitten im Dispute

Zwei Fälle:

1. **Account in good standing, einfach gehend:** Disputes gegen ihre Charges gehen weiterhin an deine Plattform. Settle, dann schließe ihren Account ab.
2. **Account suspendiert wegen Fraud oder Violation:** Stripe kann sein Guthaben halten, um antizipierte Disputes für 90 Tage zu decken. Der verbundene Account bekommt seine finale Auszahlung erst, wenn diese Periode abläuft.

Dokumentiere den Offboarding-Flow mit dem verbundenen Account, bevor du jemals einen in Production offboardest.

### Währungs-Mismatch beim Refund

Wenn du in CAD geladen hast und der verbundene Account USD-Auszahlungen hält, konvertiert Stripe und berechnet eine FX-Fee. Die Plattform schluckt sie meist (saubere UX). Stelle sicher, dass deine Refund-Betrags-Berechnung den kleinen FX-Verlust berücksichtigt, falls du den Kunden exakt heilen willst.

## Was in deiner Admin-UI zu surfacen ist

Für jede Transaktion:

- Ursprünglicher Charge-Betrag und Datum
- Plattform-Fee, Anteil des verbundenen Accounts, Stripe-Fee
- Etwaige Refunds (Datum, Betrag, wer initiierte)
- Etwaige Disputes (Status, Evidence-Deadline, Outcome)
- "Refunden"-Button mit einer Bestätigung, die den Dollar-Impact auf jede Partei zeigt

Wenn du "Was ist mit dieser Transaktion passiert" nicht in unter 30 Sekunden beantworten kannst, ist deine Admin-UI nicht fertig.
