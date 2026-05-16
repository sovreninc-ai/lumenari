# Supabase clients — तीन flavors, एक rule

Next.js app में तीन Supabase clients होते हैं और वे अलग-अलग threat models के लिए मौजूद हैं।

## 1. `supabaseAnon` — public, browser-safe

Anon key use करता है। RLS के अधीन। इसे server components और client components में use करें जिन्हें वो data read करना है जिसे user देखने की permission है।

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

Anon key + user का auth cookie use करता है। इसे server components और server actions में use करें ताकि RLS actual user देख सके।

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

**Service role key** use करता है। RLS को bypass करता है। केवल route handlers, server actions, या Edge Functions के अंदर ही import करें। कभी भी component file के अंदर नहीं (वे technically client bundles में end up हो सकती हैं)।

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

`"server-only"` import Webpack/Turbopack को error करने पर मजबूर करता है अगर कोई client code इसे pull in करने की कोशिश करे।

## एक rule

> अगर आपका code वो काम कर रहा है जो user को करने की permission है, तो user-scoped client use करें और RLS को साबित करने दें। अगर आपका code वो काम कर रहा है जो user को directly करने की permission नहीं है (जैसे webhook एक purchase record करना जो user ने initiate नहीं की), तो service client use करें।

अगर आप articulate नहीं कर सकते कि आप उस line के किस तरफ हैं, तो आपने threat model के बारे में पर्याप्त नहीं सोचा है।
