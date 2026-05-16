# 表单、校验、乐观 UI

## 校验只在一个地方定义

同一个 Zod schema 同时用于客户端（提供快速反馈）和服务端（保证安全）。在 action 旁边的 `schemas.ts` 中定义一次。

```ts
// app/clubs/new/schemas.ts
import { z } from "zod";

export const NewClubInput = z.object({
  name: z.string().min(2).max(120),
  contact_email: z.string().email(),
  sport: z.enum(["soccer", "hockey", "basketball"]),
});

export type NewClubInput = z.infer<typeof NewClubInput>;
```

## 可访问的错误提示

错误提示必须：
- 紧贴在出错的输入框下方
- 使用 `role="alert"` 或 `aria-live="polite"`，确保读屏器可以读到
- 内容具体（"邮箱必填"）而不是含糊（"无效"）
- 即使页面刷新（POST 后）也能保留

```tsx
<label htmlFor="contact_email">联系邮箱</label>
<input
  id="contact_email"
  name="contact_email"
  type="email"
  required
  aria-invalid={Boolean(errors.contact_email)}
  aria-describedby={errors.contact_email ? "contact_email-err" : undefined}
/>
{errors.contact_email && (
  <p id="contact_email-err" role="alert" className="text-red-600">
    {errors.contact_email}
  </p>
)}
```

## 乐观 UI —— 仅在成功率高时使用

`useOptimistic` 适用于：点赞切换、标记 RSVP、列表重排。不适用于任何可能失败的场景（支付、名额预订、账户变更）。

```tsx
"use client";

import { useOptimistic } from "react";
import { setRsvp } from "./actions";

export function RsvpButton({ initial, eventId }: {
  initial: "yes" | "no" | "maybe";
  eventId: string;
}) {
  const [optimistic, setOptimistic] = useOptimistic(initial);
  return (
    <form
      action={async (fd: FormData) => {
        const next = fd.get("rsvp") as typeof initial;
        setOptimistic(next);
        await setRsvp(eventId, next);
      }}
    >
      <button name="rsvp" value="yes" data-active={optimistic === "yes"}>
        参加
      </button>
    </form>
  );
}
```

## 耗时较长的表单

如果 action 可能耗时 >1 秒（发送邮件、生成 PDF），同时要：显示进度、禁用提交按钮、并最终反馈结果 —— 不要让它一直转圈。

```tsx
{pending ? (
  <button disabled>
    <Spinner /> 正在发送邀请…
  </button>
) : (
  <button>发送邀请</button>
)}
```

## 面对未知失败模式的标准 fallback

```tsx
{state?.ok === false && (
  <div role="alert" className="p-3 rounded bg-red-50 border border-red-200">
    <p className="font-medium">未能保存。</p>
    <p className="text-sm text-red-700">{state.error}</p>
    <p className="text-xs text-red-600 mt-1">
      请再试一次 —— 如果仍然失败，请回复最近一次收据邮件联系我们。
    </p>
  </div>
)}
```

友好的兜底信息永远胜过 stack trace。
