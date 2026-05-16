# Clients Supabase — trois saveurs, une seule règle

Il existe trois clients Supabase dans une app Next.js et ils existent pour des modèles de menaces différents.

## 1. `supabaseAnon` — public, browser-safe

Utilise l'anon key. Soumis à la RLS. Utilisez-le dans les server components et client components qui doivent lire des données que l'utilisateur a le droit de voir.

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

## 2. `supabaseServer` — côté serveur, user-scoped

Utilise l'anon key + le cookie d'auth de l'utilisateur. Utilisez-le dans les server components et server actions pour que la RLS voie l'utilisateur réel.

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

## 3. `supabaseService` — server-only, contourne la RLS

Utilise la **service role key**. Contourne la RLS. À importer uniquement dans les route handlers, server actions ou Edge Functions. Jamais dans un fichier de composant (ceux-ci peuvent techniquement finir dans des bundles client).

```ts
// src/lib/supabase-service.ts -- ce fichier NE DOIT PAS être importé dans un arbre 'use client'.
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

L'import `"server-only"` fait planter Webpack/Turbopack si du code client essaie de le tirer.

## La règle unique

> Si votre code fait quelque chose que l'utilisateur a le droit de faire, utilisez le client user-scoped et laissez la RLS le prouver. Si votre code fait quelque chose que l'utilisateur n'est PAS autorisé à faire directement (comme un webhook qui enregistre un achat que l'utilisateur n'a pas initié), utilisez le client service.

Si vous ne savez pas dire de quel côté de cette ligne vous êtes, vous n'avez pas encore assez réfléchi au modèle de menaces.
