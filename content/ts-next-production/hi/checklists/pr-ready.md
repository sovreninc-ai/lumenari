# PR-ready checklist

PR open करने से पहले इसे run through करें। Goal है "क्या एक senior engineer इसे एक read में +1 कर सकता है?"

## Code quality

- [ ] `npm run typecheck` clean
- [ ] `npm run lint` clean
- [ ] `npm run build` clean
- [ ] कोई `console.log` पीछे नहीं छूटा (एक logger use करें या remove करें)
- [ ] कोई commented-out code blocks नहीं
- [ ] सभी नई files के top पर कम से कम एक docblock है जो purpose explain करता है

## Type safety

- [ ] कोई `any` नहीं (इसकी जगह `unknown` + narrowing use करें)
- [ ] कोई `as Type` casts नहीं जो किसी comment से justified न हों
- [ ] Component props के explicit interfaces हैं, inline `{a, b}: {a: string; b: number}` नहीं
- [ ] सभी async functions या तो await करते हैं या promise return करते हैं; comment के बिना कोई fire-and-forget नहीं

## Data layer

- [ ] Schema changes `supabase/migrations/` के तहत एक migration file में हैं
- [ ] नई tables पर RLS enabled है explicit policies के साथ
- [ ] Service-role client केवल route handlers / server actions में import होता है
- [ ] Sensitive columns वाली tables के लिए कोई `select *` नहीं

## Security

- [ ] User input DB hit करने से पहले एक Zod schema से flow करता है
- [ ] Money values integer cents के रूप में stored और computed
- [ ] Client code या `NEXT_PUBLIC_*` env vars में कोई secrets नहीं
- [ ] CSRF surfaces (server actions, route handlers) auth-gated हैं

## UX

- [ ] Forms में accessible labels + `aria-invalid` + visible errors हैं
- [ ] >300ms वाले किसी भी action के लिए loading states
- [ ] किसी भी list के लिए empty states जो empty हो सकती है
- [ ] 320px viewport पर काम करता है (DevTools में test करें)
- [ ] Mobile पर Touch targets ≥44pt

## Tests

- [ ] RLS touch किया? एक integration test cross-tenant boundary साबित करता है
- [ ] कोई payment या money path touch किया? Webhook idempotency के लिए test
- [ ] Auth touch किया? Test करें कि एक unauthenticated request reject होती है

## Operational

- [ ] PR title एक semantic commit है (`feat:`, `fix:`, `refactor:` …)
- [ ] PR description में है: what, why, how to test
- [ ] DECISIONS.md updated है अगर इस PR ने architectural choice बदला
- [ ] STATE.md updated है अगर इस PR ने project state आगे बढ़ाया

## "Sleep test"

> क्या आप इसे merge करने के तुरंत बाद bed पर जा सकते हैं, और 8 घंटे unattended live रहने के साथ ठीक रह सकते हैं?

अगर नहीं — तो missing test, alert, या feature flag क्या है?
