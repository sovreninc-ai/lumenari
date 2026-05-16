# TypeScript + Next.js Production Pack

> Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write Next.js + Supabase code that survives contact with real users.

**Optimized for:** Claude · Claude Code · Cursor.

---

## Operating mode

You are pairing with a senior engineer on a Next.js 14/15 App Router codebase deployed to Vercel, backed by Supabase Postgres + Auth + Storage. Default to:

- **TypeScript strict mode.** No `any`. Inferred types over annotated where the inference is good.
- **Server-first.** Server components, server actions, and route handlers are the default. Client components are a deliberate choice because of state or interaction.
- **RLS as the security boundary.** Anything that touches user data goes through the anon Supabase client so Postgres RLS enforces access. The service role key never appears in client code.
- **Migrations only.** All schema lives in `supabase/migrations/*.sql`. Never edit in the dashboard.
- **Money in cents.** Integer cents + currency code. CAD default.
- **Time in UTC** at the boundary; render in user timezone.

When the user describes a feature, ask one clarifying question only if a critical decision is genuinely ambiguous. Otherwise pick a sensible default and explain it briefly.

---

## File conventions

```
src/
  app/                         # routes
    (marketing)/               # route groups for layouts
    [tenant]/                  # multi-tenant route segment if needed
    api/
      <resource>/route.ts      # POST/GET handlers, server-only
  components/                  # PascalCase, one component per file
  lib/
    supabase.ts                # singleton clients (anon + service)
    stripe.ts
    env.ts                     # required() helper, throws loudly
    auth.ts                    # session helpers
  data/                        # static catalog, constants, enums
  hooks/                       # useXxx React hooks
supabase/
  migrations/0001_init.sql
  migrations/0002_*.sql
```

Naming:
- `snake_case` for SQL identifiers
- `PascalCase` for React components, TS interfaces, TS types
- `camelCase` for variables, functions, props
- `kebab-case` for file paths, URL slugs, CSS classes

---

## When to use what

| Need | Use |
| --- | --- |
| Fetch data for a page | Server component, `async function Page()` |
| Mutate data from a form | Server action |
| Mutate data from a third-party webhook | Route handler under `app/api/...` |
| Fetch data on the client (rare) | Route handler + `useSWR` or React Query |
| Optimistic UI | `useOptimistic` + server action |
| Long-running job | Edge Function or pg_cron (see Supabase pack) |

Avoid: client-side fetch to your own database. Avoid: passing the service-role key anywhere a browser could see it.

---

## Pre-flight checklist before opening a PR

1. `npm run typecheck` and `npm run lint` are clean.
2. Touched `*.sql`? It's in a migration file, not a dashboard click.
3. Touched RLS? There's an integration test proving the boundary holds for an unrelated tenant.
4. Touched payment code? There's a webhook idempotency test.
5. Touched any user-facing surface? It works at 320px viewport with 44pt touch targets.
6. README or PROJECT-OS files (STATE.md / DECISIONS.md) updated if the architecture moved.

If any of these fails, that's the next thing to fix — not the next feature.

---

## Companion docs in this kit

- `patterns/supabase-clients.md` — server, client, and admin Supabase singleton pattern
- `patterns/server-actions.md` — when/how to use, with validation, and the error-handling shape
- `patterns/forms-and-validation.md` — Zod schemas, optimistic UI, accessible errors
- `checklists/pr-ready.md` — long-form version of the pre-flight above
