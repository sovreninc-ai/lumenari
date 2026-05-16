# Clientes Supabase — tres sabores, una regla

Hay tres clientes de Supabase en una app de Next.js y existen por modelos de amenaza distintos.

## 1. `supabaseAnon` — público, seguro para el navegador

Usa la anon key. Sujeto a RLS. Úsalo en server components y en client components que necesiten leer datos que el usuario tiene permitido ver.

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

## 2. `supabaseServer` — del lado del server, user-scoped

Usa la anon key + la cookie de auth del usuario. Úsalo en server components y server actions para que RLS vea al usuario real.

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

## 3. `supabaseService` — solo-server, bypass de RLS

Usa la **service role key**. Bypasea RLS. Solo se importa dentro de route handlers, server actions o Edge Functions. Nunca dentro de un archivo de componente (esos técnicamente pueden terminar en bundles de cliente).

```ts
// src/lib/supabase-service.ts -- este archivo NO DEBE importarse en un árbol 'use client'.
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

El import `"server-only"` hace que Webpack/Turbopack tire un error si cualquier código de cliente intenta jalarlo.

## La única regla

> Si tu código está haciendo algo que el usuario tiene permitido hacer, usa el cliente user-scoped y deja que RLS lo demuestre. Si tu código está haciendo algo que el usuario NO tiene permitido hacer directamente (como un webhook que registra una compra que el usuario no inició), usa el cliente service.

Si no puedes articular en qué lado de esa línea estás, no has pensado lo suficiente en el modelo de amenaza todavía.
