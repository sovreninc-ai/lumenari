# Supabase 客户端 —— 三种形态，一条规则

Next.js 应用中存在三种 Supabase 客户端，它们各自服务于不同的威胁模型。

## 1. `supabaseAnon` —— 公开、浏览器安全

使用 anon key。受 RLS 约束。用于 server component 与需要读取用户被允许看到的数据的 client component。

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

## 2. `supabaseServer` —— 服务端，user-scoped

使用 anon key + 用户的 auth cookie。用于 server component 与 server action，确保 RLS 看到的是真实用户。

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

## 3. `supabaseService` —— 仅服务端，绕过 RLS

使用 **service role key**。绕过 RLS。只能在 route handler、server action 或 Edge Function 内部 import。绝不能在 component 文件中 import（这些文件理论上可能进入客户端 bundle）。

```ts
// src/lib/supabase-service.ts -- 该文件不得被 'use client' 树引用。
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

`"server-only"` 导入会让 Webpack/Turbopack 在任何客户端代码尝试引入它时直接报错。

## 唯一规则

> 如果你的代码在做用户本来就被允许做的事，请使用 user-scoped 客户端并让 RLS 来证明这一点。如果你的代码在做用户本不被允许直接做的事（比如一个 webhook 记录用户并未发起的购买），请使用 service 客户端。

如果你说不清自己处在这条线的哪一侧，说明你对威胁模型还没想透。
