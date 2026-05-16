# Stripe Connect：账户引导

实际可选两种：Express 与 Standard。（Custom 也存在；除非你有合规团队，否则别用。）

## Express —— 合理的默认

由你拥有客户关系与品牌。Connected account 使用精简版 Stripe dashboard 处理 payouts 与税务文档。

**优点**
- 引导是一份 5 分钟的托管表单
- 你掌控品牌、UX 与争议处理
- Connected account 的合规负担更轻
- Connected accounts 可以是个人或小企业

**缺点**
- Connected account 无法完全自定义 Stripe 体验
- 某些高级功能（在 connected 层面的订阅）需要额外配置

适合 Express 的场景：平台拥有客户关系、你负责支持、connected account 是"供应方"。

## Standard —— 当 connected account 才是真正的商户

Connected account 拥有完整的 Stripe dashboard。他们自己处理争议、自己做税务。你更像一个引荐方，而非真正意义上的平台。

**优点**
- Connected account 拥有完整的 Stripe 权限
- 平台责任更小

**缺点**
- 客户在收据中看到的是 connected account 的品牌
- 争议归 connected account 处理 —— 你的平台可见性更低
- 引导耗时更长（真正的 Stripe 注册）

适合 Standard 的场景：connected account 已在独立运营业务，你只是让他们通过你的平台收款。

## 从建账户到首次扣款

```ts
// 1. 创建 connected account
const account = await stripe.accounts.create({
  type: "express",
  country: "CA",
  email: org.contactEmail,
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  business_type: org.businessType, // 'individual' | 'company'
  metadata: { organization_id: org.id },
});

// 2. 将 account ID 关联到 org
await db.from("organizations")
  .update({ stripe_account_id: account.id })
  .eq("id", org.id);

// 3. 生成引导链接
const link = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: `${SITE}/settings/payouts?refresh=1`,
  return_url: `${SITE}/settings/payouts?done=1`,
  type: "account_onboarding",
});

// 4. 跳转用户。他们会回到 /settings/payouts。
return redirect(link.url);
```

## 验证账户是否真的就绪

监听 `account.updated` webhook。可扣款的就绪状态有两个标志：

```ts
const ready =
  account.charges_enabled === true && account.payouts_enabled === true;
```

两者都必须为 true。仅有 `charges_enabled` 而没有 `payouts_enabled`，意味着 Stripe 能收钱但无法 payout —— 通常是 connected account 还没完成银行账户验证。

把你的 UI 门控在 `ready` 上。在 Stripe 还没准备好向他们付款之前，别让 org 开始收款。

## 税务与法律

- 当客户关系由平台拥有（Express）时，**平台**通常负责代收销售税。
- 当客户关系由 connected account 拥有（Standard）时，**connected account** 负责。
- 对美国与加拿大的 connected accounts，**W-9 / W-8 / T1** 的收集由 Stripe 在引导阶段完成。
- **1099-K（美国）/ T4A（加拿大）** 由 Stripe 出具 —— 你无需自行向 connected accounts 出具。

如果你的平台在某 connected account 上一年 > $20K 且交易数 > 200（美国 1099-K 门槛），Stripe 会代为出具表单。请在年末前核对存档地址是否正确。
