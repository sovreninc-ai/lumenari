# Supabase clients — três sabores, uma regra

Existem três clients do Supabase numa app Next.js e cada um existe para um modelo de ameaça diferente.

## 1. `supabaseAnon` — público, seguro para o browser

Usa a anon key. Sujeito a RLS. Use em server components e client components que precisam ler dados que o usuário tem permissão de ver.

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

## 2. `supabaseServer` — server-side, com escopo de usuário

Usa a anon key + o cookie de auth do usuário. Use em server components e server actions para que o RLS enxergue o usuário real.

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

## 3. `supabaseService` — server-only, bypassa RLS

Usa a **service role key**. Ignora o RLS. Só importe dentro de route handlers, server actions ou Edge Functions. Nunca dentro de um arquivo de componente (esses podem tecnicamente acabar em bundles do client).

```ts
// src/lib/supabase-service.ts -- este arquivo NÃO PODE ser importado em uma árvore 'use client'.
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

O import `"server-only"` faz o Webpack/Turbopack dar erro se algum código client tentar puxar ele.

## A única regra

> Se seu código está fazendo algo que o usuário tem permissão de fazer, use o client com escopo de usuário e deixe o RLS provar isso. Se seu código está fazendo algo que o usuário NÃO pode fazer diretamente (como um webhook registrando uma compra que o usuário não iniciou), use o client de service.

Se você não consegue articular de que lado dessa linha está, você ainda não pensou o suficiente no threat model.
