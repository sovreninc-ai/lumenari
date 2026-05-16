# 退款与争议 Playbook

钱一旦移动过，事情就变复杂。下面是决策树。

## 常见的四种情况

### 1. 客户要求全额退款，无争议

由运营发起的退款。容易处理。

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  refund_application_fee: true, // 一并退回平台分成
  reverse_transfer: true,        // 从 connected account 中扣回
});
```

如果 `reverse_transfer: true` 且 connected account 余额不足，Stripe 会形成一笔 debit，connected account 进入负余额，直至下一次 payout 周期。

请在你的管理 UI 中显式提示："这笔退款会从 [Org] 的下一次 payout 中扣 $X。"

### 2. 客户要求部分退款

同样的代码，加 `amount`：

```ts
const refund = await stripe.refunds.create({
  payment_intent: pi.id,
  amount: 5000, // $50（分）
  refund_application_fee: true,
  reverse_transfer: true,
});
```

Stripe 按比例退还平台费用。若原本是五五分（$120 上 $60/$60），客户拿回 $50，则平台费用退 $25，connected account 转账被反向扣 $25。

如果希望另一种分担方式（例如平台承担全部退款），可设 `refund_application_fee: false` 并手动处理反向：

```ts
await stripe.refunds.create({ payment_intent: pi.id, amount: 5000 });
// 没有 reverse_transfer，没有 refund_application_fee —— 平台独自承担。
```

### 3. 客户向银行申请拒付

这是 dispute，不是 refund。生命周期不同。

客户的银行从 Stripe 把钱撤回；Stripe 再从你的平台撤回。你会收到 `charge.dispute.created` webhook。你大约有 7-14 天提交证据。

```ts
async function handleDispute(d: Stripe.Dispute) {
  // 1. 通知运营（你） —— 这需要人工介入。
  await sendDisputeAlert(d);

  // 2. 在 DB 中标记该订单为已争议。
  await db.from("purchases")
    .update({ disputed_at: new Date().toISOString(), dispute_reason: d.reason })
    .eq("stripe_payment_intent", d.payment_intent);

  // 3. 如有必要，也通知 connected account。
  await notifyConnectedAccount(d);
}
```

前几次提交证据时通过 dashboard 做 —— Stripe 的网页表单比 API 引导得更细致。流程稳定后再通过 `stripe.disputes.update` 自动化。

赢了，钱回来；输了，拒付成立，connected account 那部分也可能损失。

### 4. Payout 之后才退款

代码同情况 1 或 2。Stripe 处理记账。Connected account 在其 Stripe 账本上进入负余额，直到下次扣款或通过银行转账充值。

运营上，这是客服最容易出错的地方。请在管理 UI 中加一道 "你确定吗？" 二次确认："这将从 [Org] 账户中扣 $X，当前余额 $Y。在下次 payout 之前他们将处于负余额状态。"

## 边缘情况

### 已部分退款的交易又被争议

如果 $120 的交易已退 $50，客户对剩余 $70 提起争议，Stripe 会就 ($120 - $50) = $70 的范围处理争议。你的证据材料中应说明已部分退款的情况。

### Connected account 在争议进行中离开

两种情况：

1. **账户状态正常，仅是离开：** 针对其扣款的争议仍归你平台处理。先处理完，再关闭账户。
2. **因欺诈或违规被暂停：** Stripe 可能扣留其余额 90 天以覆盖潜在争议。Connected account 在该周期结束前拿不到最后一次 payout。

正式下线第一个 connected account 之前，请先与对方明确下线流程。

### 退款时的币种不匹配

如果你以 CAD 扣款而 connected account 持 USD payouts，Stripe 会换汇并收 FX 手续费。一般由平台承担（UX 更干净）。若希望客户完全无损，请在计算退款金额时考虑微小的换汇损失。

## 管理 UI 中应展示的信息

针对每笔交易：

- 原始扣款金额与日期
- 平台费用、connected account 份额、Stripe 手续费
- 任何退款（日期、金额、发起人）
- 任何争议（状态、证据截止时间、结果）
- "退款此笔" 按钮，并在确认页中显示对各方的金额影响

如果你回答"这笔交易发生了什么"需要超过 30 秒，那你的管理 UI 还没做完。
