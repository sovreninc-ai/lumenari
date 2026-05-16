# Supabase clients — three flavors, one rule

There are three Supabase clients in a Next.js app and they exist for different threat models.

## 1. `supabaseAnon` — public, browser-safe

Uses the anon key. Subject to RLS. Use this in server components and client components that need to read data the user is allowed to see.

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

## 2. `supabaseServer` — server-side, user-scoped

Uses the anon key + the user's auth cookie. Use this in server components and server actions so RLS sees the actual user.

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

## 3. `supabaseService` — server-only, RLS-bypass

Uses the **service role key**. Bypasses RLS. Only ever import inside route handlers, server actions, or Edge Functions. Never inside a component file (those can technically end up in client bundles).

```ts
// src/lib/supabase-service.ts -- this file MUST NOT be imported into a 'use client' tree.
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

The `"server-only"` import makes Webpack/Turbopack error if any client code tries to pull it in.

## The one rule

> If your code is doing something the user is allowed to do, use the user-scoped client and let RLS prove it. If your code is doing something the user is NOT allowed to do directly (like a webhook recording a purchase the user didn't initiate), use the service client.

If you can't articulate which side of that line you're on, you haven't thought hard enough about the threat model yet.
