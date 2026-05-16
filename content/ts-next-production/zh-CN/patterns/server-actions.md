# Server Actions —— 标准的变更形态

Server actions 在 App Router 中替代了 90% 的 API 路由。用于：表单提交、触发变更的按钮点击、以及任何用户可直接触发的操作。

API route handler 仍保留给：webhook、程序化访问、任何需要自定义 HTTP 响应形态的场景。

## 标准形态

```ts
// app/teams/[teamId]/actions.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";

const Input = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(2000).optional(),
});

type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function updateTeam(
  teamId: string,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = Input.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: flattenZodErrors(parsed.error),
    };
  }

  const db = supabaseServer();
  const { error } = await db
    .from("teams")
    .update(parsed.data)
    .eq("id", teamId);

  if (error) {
    return { ok: false, error: "Could not save changes." };
  }

  revalidatePath(`/teams/${teamId}`);
  return { ok: true, data: undefined };
}
```

## 规则

1. **始终在边界处校验。** Server actions 接收的是 `FormData` —— 永远不要相信它。
2. **使用区分联合的 `ActionResult`。** UI 可以基于 `result.ok` 做模式匹配。
3. **不要为预期内错误 throw。** Throw 只为 bug；校验、权限、未找到等错误请返回带标签的结果。
4. **使用 user-scoped 客户端。** RLS 做权限校验。如果 RLS 报错，返回泛化的 "could not save" —— 不要泄露策略细节。
5. **重新校验受影响路径。** 不调用 revalidate 等于数据陈旧，尤其在静态渲染下。

## UI 端

```tsx
"use client";

import { useActionState } from "react";
import { updateTeam } from "./actions";

export function TeamForm({ teamId }: { teamId: string }) {
  const [state, action, pending] = useActionState(
    (_: ActionResult | null, fd: FormData) => updateTeam(teamId, fd),
    null,
  );

  return (
    <form action={action}>
      <input name="name" required />
      {state?.ok === false && state.fieldErrors?.name && (
        <p className="text-red-600">{state.fieldErrors.name}</p>
      )}
      <button disabled={pending}>{pending ? "Saving…" : "Save"}</button>
      {state?.ok === false && !state.fieldErrors && (
        <p className="text-red-600">{state.error}</p>
      )}
    </form>
  );
}
```

## 何时改用 route handler

如果你需要：

- 自定义 HTTP 状态码
- 流式响应
- Webhook 签名校验
- 让外部系统来调用你

…就用 route handler。否则默认使用 server actions。
