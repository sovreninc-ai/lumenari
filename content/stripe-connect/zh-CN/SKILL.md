# Stripe Connect 实现包

> Stripe 文档讲的是顺利路径。本套件讲的是之后会发生的一切：失败的 webhook、部分退款、payout 期间的拒付、季中合同变更。

**适配工具：** Claude · Claude Code。

---

## 工作模式

你正在将 Stripe Connect 接入一个在平台方与一个或多个 connected account（俱乐部、创作者、承包商）之间分账的产品。默认假设：

- 默认使用 **Express accounts** 给 connected sellers，除非他们需要打造自己品牌的 dashboard（少见）
- 使用 **带 `application_fee_amount` 的 destination charges** 做干净的两方分账
- 以 `event.id` 为键的**幂等 webhook 处理器**
- **金额以分为单位。** 货币代码显式给出。默认 CAD。
- **每个环境固定 webhook secret。** 绝不把生产 secret 与 staging 混用。

永远先问："谁拥有这位客户的关系？" —— 这决定了你用 destination charges（平台拥有）还是 separate charges（connected account 拥有）。

---

## 心智模型

```
[ 客户 ] ──支付──> [ 你的平台 Stripe 账户 ] ──分账──> [ Connected account ]
                                  │
                                  ├── 保留 application_fee_amount
                                  └── 其余转给 connected account
```

这几乎是你想要的模式。客户看到的是你的品牌。争议由你处理。Connected account 只负责收款。

避免：separate charges（客户直接付给 connected account）。这种模式会把争议转嫁给 connected account，并且让退款变得复杂。

---

## 账户引导

```ts
// Server action: 启动 Express 账户引导流程
"use server";

import { stripe } from "@/lib/stripe";

export async function startOnboarding(orgId: string) {
  const account = await stripe.accounts.create({
    type: "express",
    country: "CA",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: "company",
    metadata: { organization_id: orgId },
  });

  // 将 account.id 与你的 org 行关联保存。
  await persistStripeAccountId(orgId, account.id);

  const link = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${SITE}/settings/payouts?refresh=1`,
    return_url: `${SITE}/settings/payouts?done=1`,
    type: "account_onboarding",
  });

  return link.url;
}
```

用户返回后，监听 `account.updated` webhook，并以 `account.charges_enabled` AND `account.payouts_enabled` 作为开放 UI 的门控条件。

---

## 收款 + 分账

```ts
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  customer_email: buyerEmail,
  line_items: [{ price: PRICE_ID, quantity: 1 }],
  payment_intent_data: {
    application_fee_amount: platformCutCents,
    transfer_data: { destination: connectedAccount.stripeId },
    metadata: {
      organization_id: org.id,
      buyer_email: buyerEmail,
    },
  },
  success_url: `${SITE}/thanks?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${SITE}/checkout?canceled=1`,
});
```

Connected account 不会看到客户的银行卡。收款成功后，转账自动发生。

---

## Webhook —— 幂等性原则

Stripe 至少会投递每个事件一次。你的处理器必须能安全地运行两次。

```ts
// app/api/stripe/webhook/route.ts
import { stripe } from "@/lib/stripe";
import { supabaseService } from "@/lib/supabase-service";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const raw = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, env.WEBHOOK_SECRET);
  } catch (err) {
    return new Response("Bad signature", { status: 400 });
  }

  // 1. 检查是否已处理过该事件。
  const db = supabaseService();
  const { data: existing } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (existing) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. 处理事件。
  try {
    await handle(event);
  } catch (err) {
    // 不要标记为已处理。Stripe 会重试。
    console.error("[stripe] handler error:", err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. 记录我们已处理。这就是幂等锁。
  await db.from("processed_events").insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

`processed_events` 表的结构就是 `(id text primary key, type text, processed_at timestamptz default now())`。

---

## 退款 + 争议决策树

退款会在两方之间分摊：你平台的 `application_fee_amount` 与 connected account 的 `transfer_data.amount`。Stripe 默认按比例退款。

| 情况 | 做法 |
| --- | --- |
| 双方同意的全额退款 | `stripe.refunds.create({ payment_intent, refund_application_fee: true, reverse_transfer: true })` |
| 双方同意的部分退款 | 同上，但带显式 `amount`。设置 `reverse_transfer: true` 以便 connected account 按比例被扣回。 |
| 收到拒付（chargeback） | 提交证据。手续费通常会自动退还。通过 `charge.dispute.closed` 事件追踪最终结果。 |
| Payout 完成后再退款 | 同一段代码 —— Stripe 会从 connected account 的下一次 payout 中扣除（必要时形成负余额）。 |
| Connected account 余额不足以反向转账 | Stripe 会形成一笔 debit。Connected account 的所有者需充值或等待。在你的 UI 中显式提示这一点。 |

---

## 你最终都会遇到的边缘情况

### 1. 合同期中途离开

某 connected account 不再与你合作。但仍有客户在订阅中。不要立刻禁用账户 —— 先停止新计费、跑完当前周期，然后转移客户关系。

### 2. 货币换算

客户用 USD 付款，connected account 想用 CAD 收 payout。Stripe 会自动换汇并收取手续费。决定谁来承担（通常是平台），并写进文档。

### 3. 税费处理

如果你的 connected accounts 需要代收销售税，使用 `automatic_tax: { enabled: true }`，并在每个 price 上设置 `tax_code`。Stripe Tax 会按司法辖区分项报告。

### 4. 迟到的 webhook

订单发货 6 小时之后才到达 `payment_intent.succeeded`。幂等检查能保护你 —— 但要确保下游处理器即便状态已变化也是安全的。

---

## 配套文档

- `patterns/account-onboarding.md` — Express vs. Standard 的法律/税务取舍
- `patterns/destination-charges.md` — 完整代码走查，含收益分成数学
- `patterns/webhook-idempotency.md` — `processed_events` 表 + 备选方案
- `playbooks/refunds-and-disputes.md` — 面向运营方的决策树
