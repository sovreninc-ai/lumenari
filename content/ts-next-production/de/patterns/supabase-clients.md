# Supabase-Clients — drei Varianten, eine Regel

Es gibt drei Supabase-Clients in einer Next.js App, und sie existieren für unterschiedliche Threat-Models.

## 1. `supabaseAnon` — public, browser-sicher

Nutzt den Anon-Key. Unterliegt RLS. Nutze dies in Server Components und Client Components, die Daten lesen müssen, die der Nutzer sehen darf.

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

## 2. `supabaseServer` — server-seitig, user-gescopt

Nutzt den Anon-Key + das Auth-Cookie des Nutzers. Nutze dies in Server Components und Server Actions, damit RLS den tatsächlichen Nutzer sieht.

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

## 3. `supabaseService` — server-only, RLS-Bypass

Nutzt den **Service-Role-Key**. Umgeht RLS. Importiere nur innerhalb von Route Handlers, Server Actions oder Edge Functions. Niemals innerhalb einer Component-Datei (die können technisch in Client-Bundles landen).

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

Der `"server-only"`-Import bringt Webpack/Turbopack zum Fehler, wenn irgendein Client-Code versucht, ihn zu ziehen.

## Die eine Regel

> Wenn dein Code etwas tut, was der Nutzer tun darf, nutze den user-gescopten Client und lass RLS es beweisen. Wenn dein Code etwas tut, was der Nutzer NICHT direkt tun darf (wie ein Webhook, der einen Kauf aufzeichnet, den der Nutzer nicht initiiert hat), nutze den Service-Client.

Wenn du nicht artikulieren kannst, auf welcher Seite dieser Linie du stehst, hast du nicht hart genug über das Threat-Model nachgedacht.
