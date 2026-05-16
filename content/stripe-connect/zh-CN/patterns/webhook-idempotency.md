# Webhook 幂等性

Stripe 至少投递每个事件一次，有时不止一次。你的处理器必须能安全地运行两次。

## `processed_events` 表

```sql
create table public.processed_events (
  id            text primary key,           -- Stripe 的 event.id
  type          text not null,              -- 例如 'checkout.session.completed'
  processed_at  timestamptz not null default now()
);

-- 仅服务端可访问 —— webhook 仅限服务端。
alter table public.processed_events enable row level security;
```

## 处理器形态

```ts
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("No signature", { status: 400 });

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  const db = supabaseService();

  // 1. 幂等检查 —— 该事件是否已处理？
  const { data: seen } = await db
    .from("processed_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (seen) {
    return Response.json({ received: true, idempotent: true });
  }

  // 2. 处理。
  try {
    await dispatch(event);
  } catch (err) {
    console.error("[stripe webhook] error processing", event.id, err);
    return new Response("Handler error", { status: 500 });
  }

  // 3. 记录。仅在成功后写入 —— 5xx 时 Stripe 会重试。
  await db
    .from("processed_events")
    .insert({ id: event.id, type: event.type });

  return Response.json({ received: true });
}
```

## 备选：业务键幂等

有时业务数据中自然存在幂等键 —— 比如 `stripe_session_id` 在 `purchases` 表上唯一。

```ts
async function handleCheckoutCompleted(s: Stripe.Checkout.Session) {
  const { error } = await db
    .from("purchases")
    .insert({
      stripe_session_id: s.id,         // UNIQUE 约束自动捕获重复
      buyer_email: s.customer_details!.email,
      amount_cents: s.amount_total!,
    });

  if (error) {
    // 23505 = unique violation。在我们的模型里这不是错误。
    if ((error as { code?: string }).code === "23505") return;
    throw error;
  }

  // 副作用（邮件、日志）—— 如果它们不与 insert 在同一事务，
  // 就需要各自的幂等纪律。
  await sendReceipt(s);
}
```

两种模式都能用。`processed_events` 在一个事件触发多次写入时更简单；业务键幂等在只有一次写入时更简单。

## "重试"是什么意思

Stripe 会按指数退避重试 3 天。之后该事件停留在你 Stripe Dashboard 的 webhook 标签下并标记为 failed。你可以手动重放。

含义：
- 如果你返回 5xx，处理器会再次被命中。不要对"我不关心这个事件"返回 5xx。
- 对于你不想处理的事件，请返回 200 + `{ received: true, ignored: true }` —— 礼貌地确认。
- 持续的 5xx 应触发告警。在你的运营 dashboard 上接入 `processed_events` + "失败 N 次的事件" 查询。

## 测试

```ts
// Vitest / Bun:test
import { vi } from "vitest";

test("checkout.session.completed is idempotent", async () => {
  const event = makeCheckoutEvent({ id: "evt_test_1" });
  const req = makeWebhookReq(event);

  const r1 = await POST(req);
  const r2 = await POST(req);

  expect(r1.status).toBe(200);
  expect(r2.status).toBe(200);

  const { count } = await db.from("purchases")
    .select("*", { count: "exact", head: true })
    .eq("stripe_session_id", event.data.object.id);

  expect(count).toBe(1);
});
```

跳过这条测试，你会从客户邮件中得知双重扣款。这不是正确的学习方式。

## 开发时 webhook 从哪来

```bash
# 本地把 Stripe webhook 转发到你的开发服务器：
stripe listen --forward-to localhost:3000/api/stripe/webhook
# CLI 会打印一个临时 webhook secret —— 那就是你 .env.local 中
# 应该设置的 STRIPE_WEBHOOK_SECRET。
```

在 Vercel preview 与生产中，请在 Stripe dashboard 配置 webhook endpoint，并通过 Vercel env vars 按环境固定 secret。
