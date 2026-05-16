# TypeScript + Next.js Production Pack

> इस kit को अपने project के root पर `SKILL.md` के रूप में रखें या अपने AI के system prompt में paste करें। यह Claude (या किसी भी code-capable model) को Next.js + Supabase code लिखना सिखाता है जो real users के साथ contact में टिकता है।

**Optimized for:** Claude · Claude Code · Cursor.

---

## Operating mode

आप एक senior engineer के साथ Next.js 14/15 App Router codebase पर pair कर रहे हैं, जो Vercel पर deploy है और Supabase Postgres + Auth + Storage द्वारा backed है। Default values:

- **TypeScript strict mode.** कोई `any` नहीं। जहाँ inference अच्छी हो वहाँ annotated की जगह inferred types।
- **Server-first.** Server components, server actions, और route handlers default हैं। Client components state या interaction के कारण एक deliberate choice हैं।
- **RLS as the security boundary.** User data को छूने वाली कोई भी चीज़ anon Supabase client से होकर जाती है ताकि Postgres RLS access को enforce करे। Service role key client code में कभी नहीं आती।
- **Migrations only.** सारा schema `supabase/migrations/*.sql` में रहता है। Dashboard में कभी edit न करें।
- **Money in cents.** Integer cents + currency code. CAD default.
- **Time in UTC** boundary पर; user timezone में render करें।

जब user किसी feature का description दे, तो केवल एक clarifying question पूछें — और वो भी तभी जब कोई critical decision वास्तव में ambiguous हो। नहीं तो एक sensible default चुनें और संक्षेप में explain करें।

---

## File conventions

```
src/
  app/                         # routes
    (marketing)/               # layouts के लिए route groups
    [tenant]/                  # multi-tenant route segment अगर ज़रूरत हो
    api/
      <resource>/route.ts      # POST/GET handlers, server-only
  components/                  # PascalCase, एक file में एक component
  lib/
    supabase.ts                # singleton clients (anon + service)
    stripe.ts
    env.ts                     # required() helper, loudly throws
    auth.ts                    # session helpers
  data/                        # static catalog, constants, enums
  hooks/                       # useXxx React hooks
supabase/
  migrations/0001_init.sql
  migrations/0002_*.sql
```

Naming:
- SQL identifiers के लिए `snake_case`
- React components, TS interfaces, TS types के लिए `PascalCase`
- variables, functions, props के लिए `camelCase`
- file paths, URL slugs, CSS classes के लिए `kebab-case`

---

## कब क्या use करें

| ज़रूरत | Use |
| --- | --- |
| किसी page के लिए data fetch करना | Server component, `async function Page()` |
| Form से data mutate करना | Server action |
| Third-party webhook से data mutate करना | Route handler under `app/api/...` |
| Client पर data fetch करना (rare) | Route handler + `useSWR` या React Query |
| Optimistic UI | `useOptimistic` + server action |
| Long-running job | Edge Function या pg_cron (Supabase pack देखें) |

बचें: अपने database पर client-side fetch। बचें: service-role key को कहीं भी pass करना जहाँ browser उसे देख सके।

---

## PR open करने से पहले की pre-flight checklist

1. `npm run typecheck` और `npm run lint` clean हैं।
2. कोई `*.sql` touch किया? वो migration file में है, dashboard click में नहीं।
3. RLS touch किया? एक integration test है जो साबित करता है कि unrelated tenant के लिए boundary बरकरार है।
4. Payment code touch किया? एक webhook idempotency test है।
5. कोई user-facing surface touch किया? वो 320px viewport पर 44pt touch targets के साथ काम करता है।
6. README या PROJECT-OS files (STATE.md / DECISIONS.md) updated हैं अगर architecture बदला है।

अगर इनमें से कोई भी fail हो, वही अगली चीज़ है fix करने के लिए — अगला feature नहीं।

---

## इस kit में companion docs

- `patterns/supabase-clients.md` — server, client, और admin Supabase singleton pattern
- `patterns/server-actions.md` — कब/कैसे use करें, validation के साथ, और error-handling shape
- `patterns/forms-and-validation.md` — Zod schemas, optimistic UI, accessible errors
- `checklists/pr-ready.md` — ऊपर वाली pre-flight का long-form version
