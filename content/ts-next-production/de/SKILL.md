# TypeScript + Next.js Production Pack

> Legen Sie dieses Kit als `SKILL.md` in den Root Ihres Projekts oder fügen Sie es in den System-Prompt Ihrer KI ein. Es bringt Claude (oder jedem anderen codefähigen Modell) bei, Next.js + Supabase-Code zu schreiben, der den Kontakt mit echten Nutzern übersteht.

**Optimiert für:** Claude · Claude Code · Cursor.

---

## Arbeitsmodus

Du arbeitest mit einem Senior-Engineer an einer Next.js 14/15 App-Router-Codebasis, die auf Vercel deployt wird und durch Supabase Postgres + Auth + Storage gestützt ist. Standardmäßig gilt:

- **TypeScript strict mode.** Kein `any`. Inferenz-Typen vor annotierten Typen, wo die Inferenz gut ist.
- **Server-first.** Server Components, Server Actions und Route Handler sind der Standard. Client Components sind eine bewusste Entscheidung aufgrund von State oder Interaktion.
- **RLS als Sicherheitsgrenze.** Alles, was Nutzerdaten berührt, läuft über den anon Supabase-Client, sodass Postgres RLS den Zugriff durchsetzt. Der Service-Role-Key erscheint niemals im Client-Code.
- **Nur Migrationen.** Das gesamte Schema lebt in `supabase/migrations/*.sql`. Niemals im Dashboard bearbeiten.
- **Geld in Cents.** Integer-Cents + Währungscode. CAD ist Standard.
- **Zeit in UTC** an der Grenze; in der Nutzer-Zeitzone rendern.

Wenn der Nutzer ein Feature beschreibt, stelle nur eine klärende Frage, wenn eine kritische Entscheidung wirklich mehrdeutig ist. Ansonsten wähle einen sinnvollen Default und erkläre ihn kurz.

---

## Dateikonventionen

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

Namensgebung:
- `snake_case` für SQL-Identifier
- `PascalCase` für React-Komponenten, TS-Interfaces, TS-Types
- `camelCase` für Variablen, Funktionen, Props
- `kebab-case` für Dateipfade, URL-Slugs, CSS-Klassen

---

## Wann was verwenden

| Bedarf | Verwenden |
| --- | --- |
| Daten für eine Seite abrufen | Server Component, `async function Page()` |
| Daten aus einem Formular mutieren | Server Action |
| Daten aus einem Drittanbieter-Webhook mutieren | Route Handler unter `app/api/...` |
| Daten auf dem Client abrufen (selten) | Route Handler + `useSWR` oder React Query |
| Optimistic UI | `useOptimistic` + Server Action |
| Langläufiger Job | Edge Function oder pg_cron (siehe Supabase Pack) |

Vermeiden: Client-side Fetch auf die eigene Datenbank. Vermeiden: den Service-Role-Key irgendwohin weiterzugeben, wo ein Browser ihn sehen könnte.

---

## Pre-Flight-Checkliste vor dem Öffnen eines PRs

1. `npm run typecheck` und `npm run lint` sind sauber.
2. `*.sql` berührt? Es liegt in einer Migrationsdatei, nicht in einem Dashboard-Klick.
3. RLS berührt? Es existiert ein Integrationstest, der belegt, dass die Grenze für einen fremden Tenant hält.
4. Payment-Code berührt? Es existiert ein Webhook-Idempotenz-Test.
5. Irgendeine nutzerseitige Oberfläche berührt? Sie funktioniert bei 320px Viewport mit 44pt Touch-Targets.
6. README oder PROJECT-OS-Dateien (STATE.md / DECISIONS.md) aktualisiert, wenn sich die Architektur verschoben hat.

Falls einer dieser Punkte fehlschlägt, ist das das Nächste, was zu fixen ist — nicht das nächste Feature.

---

## Begleitende Dokumente in diesem Kit

- `patterns/supabase-clients.md` — Server-, Client- und Admin-Supabase-Singleton-Pattern
- `patterns/server-actions.md` — wann/wie zu nutzen, mit Validierung und der Fehlerbehandlungs-Form
- `patterns/forms-and-validation.md` — Zod-Schemas, Optimistic UI, zugängliche Fehler
- `checklists/pr-ready.md` — Langform-Version des Pre-Flight oben
