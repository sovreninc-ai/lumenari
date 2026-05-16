# PR-Ready-Checkliste

Gehe das durch, bevor du einen PR öffnest. Das Ziel ist: "Könnte ein Senior-Engineer das in einem Read +1 geben?"

## Code-Qualität

- [ ] `npm run typecheck` sauber
- [ ] `npm run lint` sauber
- [ ] `npm run build` sauber
- [ ] Keine zurückgelassenen `console.log` (nutze einen Logger oder entfernen)
- [ ] Keine auskommentierten Code-Blöcke
- [ ] Alle neuen Dateien haben mindestens einen Docblock oben, der den Zweck erklärt

## Typsicherheit

- [ ] Kein `any` (nutze stattdessen `unknown` + Narrowing)
- [ ] Keine `as Type`-Casts, die nicht durch einen Kommentar gerechtfertigt sind
- [ ] Component-Props haben explizite Interfaces, nicht inline `{a, b}: {a: string; b: number}`
- [ ] Alle async-Funktionen entweder awaiten oder geben das Promise zurück; kein Fire-and-Forget ohne Kommentar

## Data Layer

- [ ] Schema-Änderungen sind in einer Migrationsdatei unter `supabase/migrations/`
- [ ] Neue Tabellen haben RLS aktiviert mit expliziten Policies
- [ ] Der Service-Role-Client wird nur in Route Handlern / Server Actions importiert
- [ ] Kein `select *` für Tabellen mit sensiblen Spalten

## Sicherheit

- [ ] User-Input fließt durch ein Zod-Schema, bevor es die DB trifft
- [ ] Geldwerte als Integer-Cents gespeichert und berechnet
- [ ] Keine Secrets im Client-Code oder `NEXT_PUBLIC_*`-Env-Vars
- [ ] CSRF-Oberflächen (Server Actions, Route Handlers) sind auth-gegated

## UX

- [ ] Formulare haben zugängliche Labels + `aria-invalid` + sichtbare Fehler
- [ ] Loading-States für jede Action >300ms
- [ ] Empty-States für jede Liste, die leer sein kann
- [ ] Funktioniert bei 320px Viewport (in DevTools testen)
- [ ] Touch-Targets ≥44pt auf Mobile

## Tests

- [ ] RLS berührt? Ein Integrationstest beweist die Cross-Tenant-Grenze
- [ ] Einen Payment- oder Geld-Pfad berührt? Test auf Webhook-Idempotenz
- [ ] Auth berührt? Test, dass ein unauthentifizierter Request abgelehnt wird

## Operational

- [ ] PR-Titel ist ein Semantic Commit (`feat:`, `fix:`, `refactor:` …)
- [ ] PR-Beschreibung hat: what, why, how to test
- [ ] DECISIONS.md aktualisiert, wenn dieser PR eine architektonische Wahl geändert hat
- [ ] STATE.md aktualisiert, wenn dieser PR den Projektzustand vorangebracht hat

## Der "Schlaftest"

> Könntest du direkt nach dem Mergen ins Bett gehen und damit okay sein, dass es 8 Stunden unbeaufsichtigt live ist?

Falls nein — was ist der fehlende Test, Alert oder Feature-Flag?
