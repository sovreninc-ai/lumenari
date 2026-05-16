# Destination charges —— 两方分账的正确 primitive

Destination charge 是在你的平台账户上的一笔收款，内置了向 connected account 的转账。客户看到的是你的品牌；connected account 看到的是干净的 payout；你抽取 application fee。

## 形态

```ts
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: PRICE_ID, quantity: 1 }],
  customer_email: buyer.email,
  payment_intent_data: {
    application_fee_amount: 6000, // $60 CAD（以分为单位）—— 平台分成
    transfer_data: {
      destination: connectedAccount.stripeId, // 'acct_…'
    },
    metadata: {
      organization_id: org.id,
      buyer_email: buyer.email,
      season_id: season.id,
    },
  },
  success_url: `${SITE}/thanks?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${SITE}/checkout?canceled=1`,
});
```

如果 `application_fee_amount = 6000` 且行项目为 $120：
- 平台：$60
- Connected account：$60（减去 Stripe 的处理费 —— 默认从 connected account 中扣）

如需让平台承担 Stripe 处理费，请加 `on_behalf_of: connectedAccount.stripeId`，并在账户上设置 fee defaults —— 参见下文 "费用归属"。

## 收益分成数学（实例）

Calgary Villains 有 3,000 名球员。Lumenari Sports 收取 $120/球员/年。五五分 —— 平台 $60，俱乐部 $60。Stripe 在一笔 $120 交易上大约扣 3.4% + $0.30 = ~$4.38。

$4.38 由谁来出？两种思路：

### 方案 A —— Stripe 费用先扣，再分账

```ts
// 收 $120。Stripe 扣 $4.38。剩 $115.62。
// 五五分 = 每边 $57.81。
//
// 代码：application_fee_amount = floor(115.62 / 2 * 100) = 5781
application_fee_amount: Math.floor((charge_cents - stripeFee(charge_cents)) / 2)
```

### 方案 B —— 平台从自己的份额中支付 Stripe 费用

```ts
// 收 $120。按毛额五五分：$60 / $60。
// Stripe 的 $4.38 从平台的 $60 里扣，平台净得 ~$55.62。
//
// 代码：application_fee_amount = 收款金额的一半
application_fee_amount: Math.floor(charge_cents / 2)
```

若希望俱乐部得到稳定的数字（"每球员就是 $60，没别的"），就选 B。这种说法在销售时更有说服力。

## 费用归属

Stripe 允许你决定谁付处理费。默认是 connected account。把它移到平台：

```ts
payment_intent_data: {
  transfer_data: { destination: connectedAccount.stripeId },
  on_behalf_of: connectedAccount.stripeId,
  application_fee_amount: PLATFORM_CUT_CENTS,
}
```

`on_behalf_of` 让该笔扣款在法律/税务层面归属于 connected account，但资金仍在你的平台流转。结合 `application_fee_amount`，手续费会从平台的 `application_fee_amount` 中扣除。

## 读取结果

```ts
// 客户付款后，你会收到 checkout.session.completed 事件。
const session = event.data.object as Stripe.Checkout.Session;

// PaymentIntent 中含有转账信息。
const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string);

// 真实转账可从 latest_charge 拿到。
const charge = await stripe.charges.retrieve(pi.latest_charge as string);
console.log({
  amount: charge.amount, // 总扣款
  app_fee: charge.application_fee_amount, // 你的分成
  transfer: charge.transfer_data?.destination, // connected account
  net_to_connected: charge.amount - (charge.application_fee_amount ?? 0)
    - (charge.balance_transaction
      // Stripe 处理费 —— 真实数值需到 balance_transaction 取
      ? 0 : 0),
});
```

实际操作中，请从 balance transaction 拿精确手续费：

```ts
const bt = await stripe.balanceTransactions.retrieve(charge.balance_transaction as string);
// bt.fee = Stripe 总手续费（分）
// bt.net = 实际进入平台余额的金额
```

## 落库

```sql
create table public.purchases (
  id                     uuid primary key default gen_random_uuid(),
  organization_id        uuid references public.organizations(id),
  buyer_email            text not null,
  stripe_session_id      text unique,
  stripe_payment_intent  text,
  stripe_charge_id       text,
  amount_cents           integer not null,
  platform_fee_cents     integer not null,
  stripe_fee_cents       integer,            -- 从 balance_transaction 回填
  currency               text default 'cad',
  created_at             timestamptz default now()
);
```

可通过第二个 webhook（`charge.updated`，等 `balance_transaction` 就绪后）回填 `stripe_fee_cents`，或在 webhook 内同步调用一次 API（能接受额外延迟时使用）。
