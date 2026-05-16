# フォーム、バリデーション、楽観的 UI

## バリデーションは 1 か所に置く

同じ Zod スキーマがクライアント（速いフィードバックのため）とサーバー（セキュリティのため）の両方でバリデートします。アクションの隣にある `schemas.ts` で 1 度だけ定義してください。

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

## アクセシブルなエラー

エラーは次を満たす必要があります:
- 該当する入力の直下に配置される
- スクリーンリーダーが読み上げるよう `role="alert"` または `aria-live="polite"` を使う
- 具体的であること（「メールアドレスは必須です」） — 曖昧でない（「無効」）
- フォームが POST された場合はページ再読み込み後も残る

```tsx
<label htmlFor="contact_email">連絡先メール</label>
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

## 楽観的 UI — 成功率が高いときだけ

`useOptimistic` が正しい道具となるのは、いいねの切り替え、出欠の RSVP、リストの並び替えなど。間違った道具となるのは、現実的に失敗し得るもの（決済、枠の予約、アカウント変更）です。

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

## 時間がかかるフォーム

アクションに 1 秒以上かかる場合（メール送信、PDF 生成）、進捗を表示し、送信を無効化し、最終結果を伝えてください — ただ永遠にスピナーを回さない。

```tsx
{pending ? (
  <button disabled>
    <Spinner /> 招待を送信中…
  </button>
) : (
  <button>招待を送信</button>
)}
```

## 未知の失敗モードに対する誠実なデフォルト

```tsx
{state?.ok === false && (
  <div role="alert" className="p-3 rounded bg-red-50 border border-red-200">
    <p className="font-medium">保存できませんでした。</p>
    <p className="text-sm text-red-700">{state.error}</p>
    <p className="text-xs text-red-600 mt-1">
      もう一度お試しください — 続くようでしたら、直近のレシートに返信でお知らせください。
    </p>
  </div>
)}
```

フレンドリーなフォールバックの方が、スタックトレースよりも常に良い。
