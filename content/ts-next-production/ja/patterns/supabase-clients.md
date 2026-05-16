# Supabase クライアント — 3 つの形と 1 つのルール

Next.js アプリには 3 つの Supabase クライアントがあり、それぞれ異なる脅威モデルのために存在します。

## 1. `supabaseAnon` — 公開、ブラウザでも安全

anon キーを使用。RLS が適用される。ユーザーが見ることを許可されているデータを読むサーバーコンポーネントとクライアントコンポーネントで使う。

```ts
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

let _anon: ReturnType<typeof createClient> | null = null;

export function supabaseAnon() {
  if (_anon) return _anon;
  _anon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
  return _anon;
}
```

## 2. `supabaseServer` — サーバー側、ユーザースコープ

anon キー + ユーザーの認証クッキーを使用。RLS が実際のユーザーを認識するよう、サーバーコンポーネントとサーバーアクションで使う。

```ts
// src/lib/supabase-server.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function supabaseServer() {
  const store = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (n) => store.get(n)?.value,
        set: (n, v, o) => store.set({ name: n, value: v, ...o }),
        remove: (n, o) => store.set({ name: n, value: "", ...o }),
      },
    },
  );
}
```

## 3. `supabaseService` — サーバー専用、RLS バイパス

**service role キー**を使用。RLS をバイパスする。ルートハンドラー、サーバーアクション、Edge Function の内部でのみ import すること。コンポーネントファイル内では絶対にしない（それらは技術的にクライアントバンドルに混入し得る）。

```ts
// src/lib/supabase-service.ts -- このファイルは 'use client' ツリーに import してはならない。
import "server-only";
import { createClient } from "@supabase/supabase-js";

let _svc: ReturnType<typeof createClient> | null = null;

export function supabaseService() {
  if (_svc) return _svc;
  _svc = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return _svc;
}
```

`"server-only"` の import により、クライアントコードが取り込もうとすると Webpack / Turbopack がエラーになります。

## たった 1 つのルール

> あなたのコードがユーザーに許可された操作をしているなら、ユーザースコープのクライアントを使い、RLS にそれを証明させる。あなたのコードがユーザーに直接は許可されていない操作をしているなら（例: ユーザーが起動していない購入を記録する webhook）、service クライアントを使う。

この線のどちら側にいるかを言葉にできないなら、脅威モデルについて十分に考えていません。
