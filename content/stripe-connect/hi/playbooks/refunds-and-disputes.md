# Refunds and disputes playbook

जब money already move हो चुकी है, चीज़ें complicated हो जाती हैं। यह रहा decision tree।

## चार common situations

### 1. Customer full refund माँगता है, कोई dispute नहीं

Operator-initiated refund। Easy case।

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  refund_application_fee: true, // refund the platform's cut too
  reverse_transfer: true,        // pull money back from the connected account
});
```

अगर `reverse_transfer: true` और connected account के पास insufficient balance है, तो Stripe एक debit create करता है और connected account उनके next payout cycle तक एक negative balance के साथ end up होता है।

इसे अपने admin UI में surface करें: "यह refund [Org] के next payout से $X pull करेगा।"

### 2. Customer partial refund माँगता है

Same code, `amount` के साथ:

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  amount: 5000, // $50 in cents
  refund_application_fee: true,
  reverse_transfer: true,
});
```

Stripe platform fee को proportionally refund करता है। अगर original split 50/50 था ($120 पर $60/$60) और customer को $50 वापस मिलते हैं, तो platform fee refund $25 है और connected account का transfer reverse $25 है।

अगर आप एक अलग split चाहते हैं (e.g., platform पूरा refund खाता है), `refund_application_fee: false` set करें और manually reverse करें:

```ts
await stripe.refunds.create({ payment_intent: pi.id, amount: 5000 });
// No reverse_transfer, no refund_application_fee — platform absorbs it.
```

### 3. Customer अपने bank के साथ chargeback file करता है

यह एक dispute है, refund नहीं। Different lifecycle।

Customer का bank Stripe से money वापस pulls करता है। Stripe आपके platform से pulls करता है। आपको एक `charge.dispute.created` webhook मिलता है। आपके पास evidence submit करने के लिए ~7-14 दिन हैं।

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

जब आप evidence submit करते हैं, पहले कुछ के लिए dashboard के through करें — Stripe का web form API से अधिक guided है। एक बार आपके पास एक process है, `stripe.disputes.update` के through automate करें।

अगर आप dispute जीतते हैं, money वापस आती है। अगर हारते हैं, chargeback stands और connected account अपना share भी खो सकता है।

### 4. Payout के बाद Refund

Case 1 या 2 जैसा ही code। Stripe accounting handle करता है। Connected account उनके Stripe ledger पर एक negative balance के साथ end up होता है जब तक उनका next charge न हो या जब तक वे bank transfer के through top up न करें।

Operationally, यह वो जगह है जहाँ customer service सबसे अधिक गलत होता है। अपने admin UI में एक "are you sure?" interstitial बनाएँ जो कहे: "यह [Org] के account से $X pull करेगा, जिसमें वर्तमान में $Y balance है। वे एक negative balance position में होंगे उनके next payout तक।"

## Edge cases

### Disputed transaction, half-refunded already

अगर आपने पहले से $120 transaction के $50 refund किए हैं और customer remaining $70 dispute करता है, तो Stripe full original charge ($120) minus refunded $50 = $70 in scope dispute करता है। आपके evidence package में partial refund mention होना चाहिए।

### Connected account mid-dispute platform छोड़ देता है

दो cases:

1. **Account in good standing, बस छोड़ रहा है:** उनके charges के against disputes अभी भी आपके platform पर जाते हैं। Settle करें, फिर उनका account close करें।
2. **Fraud या violation के लिए Account suspended:** Stripe उनका balance 90 दिन तक anticipated disputes cover करने के लिए hold कर सकता है। Connected account अपना final payout तब तक नहीं पाता जब तक वो period expire न हो।

Production में किसी को offboard करने से पहले connected account के साथ offboarding flow document करें।

### Refund पर currency mismatch

अगर आपने CAD में charge किया और connected account USD payouts hold करता है, तो Stripe convert करता है और एक FX fee charge करता है। Platform आमतौर पर खाता है (cleaner UX)। यह सुनिश्चित करें कि आपका refund amount calculation small FX loss account करता है अगर आप customer को exactly whole बनाने की कोशिश कर रहे हैं।

## अपने admin UI में क्या surface करें

हर transaction के लिए:

- Original charge amount और date
- Platform fee, connected account share, Stripe fee
- कोई refunds (date, amount, किसने initiate किया)
- कोई disputes (status, evidence deadline, outcome)
- "Refund this" button एक confirmation के साथ जो हर party पर dollar impact दिखाए

अगर आप "इस transaction के साथ क्या हुआ" 30 seconds से कम में answer नहीं कर सकते, आपका admin UI done नहीं है।
