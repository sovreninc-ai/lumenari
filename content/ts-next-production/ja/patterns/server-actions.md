# サーバーアクション — 標準的なミューテーションの形

サーバーアクションは App Router における API ルートの 90% を置き換えます。次の用途に使ってください: フォーム送信、ミューテーションを起こすボタンクリック、ユーザーが直接トリガーできるあらゆる操作。

API ルートハンドラーは次の用途に残します: webhook、プログラムからのアクセス、カスタム HTTP レスポンス形状が必要な操作。

## 形

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
      error: "ハイライトされた項目を修正してください。",
      fieldErrors: flattenZodErrors(parsed.error),
    };
  }

  const db = supabaseServer();
  const { error } = await db
    .from("teams")
    .update(parsed.data)
    .eq("id", teamId);

  if (error) {
    return { ok: false, error: "変更を保存できませんでした。" };
  }

  revalidatePath(`/teams/${teamId}`);
  return { ok: true, data: undefined };
}
```

## ルール

1. **境界で必ずバリデートする。** サーバーアクションは `FormData` を受け取る — 絶対に信用しない。
2. **判別共用体 `ActionResult` を使う。** UI は `result.ok` でパターンマッチできる。
3. **想定されたエラーには throw しない。** throw はバグ用。バリデーション、権限、Not Found には、タグ付きエラーを return する。
4. **ユーザースコープのクライアントを使う。** 認可チェックは RLS が行う。RLS でエラーになったら、汎用の「保存できませんでした」を返す — ポリシーの詳細をリークしない。
5. **影響を受けるパスを revalidate する。** revalidate なし = 古いデータ。特に静的レンダリング下で。

## UI 側

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
      <button disabled={pending}>{pending ? "保存中…" : "保存"}</button>
      {state?.ok === false && !state.fieldErrors && (
        <p className="text-red-600">{state.error}</p>
      )}
    </form>
  );
}
```

## ルートハンドラーに切り替えるべきとき

次が必要な場合:

- カスタム HTTP ステータスコード
- ストリーミングレスポンス
- webhook の署名チェック
- 外部システムから呼び出される

…それはルートハンドラーです。それ以外はサーバーアクションをデフォルトに。
