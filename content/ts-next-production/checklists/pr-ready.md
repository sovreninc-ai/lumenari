# PR-ready checklist

Run through this before opening a PR. The goal is "could a senior engineer +1 this in one read?"

## Code quality

- [ ] `npm run typecheck` clean
- [ ] `npm run lint` clean
- [ ] `npm run build` clean
- [ ] No `console.log` left behind (use a logger or remove)
- [ ] No commented-out code blocks
- [ ] All new files have at least a docblock at the top explaining purpose

## Type safety

- [ ] No `any` (use `unknown` + narrowing instead)
- [ ] No `as Type` casts that aren't justified by a comment
- [ ] Component props have explicit interfaces, not inline `{a, b}: {a: string; b: number}`
- [ ] All async functions either await or return the promise; no fire-and-forget without a comment

## Data layer

- [ ] Schema changes are in a migration file under `supabase/migrations/`
- [ ] New tables have RLS enabled with explicit policies
- [ ] Service-role client is only imported in route handlers / server actions
- [ ] No `select *` for tables with sensitive columns

## Security

- [ ] User input flows through a Zod schema before hitting the DB
- [ ] Money values stored and computed as integer cents
- [ ] No secrets in client code or `NEXT_PUBLIC_*` env vars
- [ ] CSRF surfaces (server actions, route handlers) are auth-gated

## UX

- [ ] Forms have accessible labels + `aria-invalid` + visible errors
- [ ] Loading states for any action >300ms
- [ ] Empty states for any list that can be empty
- [ ] Works at 320px viewport (test in DevTools)
- [ ] Touch targets ≥44pt on mobile

## Tests

- [ ] Touched RLS? An integration test proves the cross-tenant boundary
- [ ] Touched a payment or money path? Test for webhook idempotency
- [ ] Touched auth? Test that an unauthenticated request is rejected

## Operational

- [ ] PR title is a semantic commit (`feat:`, `fix:`, `refactor:` …)
- [ ] PR description has: what, why, how to test
- [ ] DECISIONS.md updated if this PR changed an architectural choice
- [ ] STATE.md updated if this PR moved the project state forward

## The "sleep test"

> Could you go to bed right after merging this, and be okay with it being live for 8 hours unattended?

If no — what's the missing test, alert, or feature flag?
