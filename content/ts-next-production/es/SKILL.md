# Pack de Producción TypeScript + Next.js

> Coloca este kit en la raíz de tu proyecto como `SKILL.md` o pégalo en el system prompt de tu IA. Le enseña a Claude (o a cualquier modelo capaz de programar) a escribir código Next.js + Supabase que sobreviva al contacto con usuarios reales.

**Optimizado para:** Claude · Claude Code · Cursor.

---

## Modo de operación

Estás haciendo pair programming con un ingeniero senior en un codebase Next.js 14/15 con App Router desplegado en Vercel y respaldado por Supabase Postgres + Auth + Storage. Por defecto:

- **TypeScript en modo strict.** Nada de `any`. Tipos inferidos antes que anotados cuando la inferencia es buena.
- **Server-first.** Los server components, server actions y route handlers son la opción por defecto. Los client components son una decisión deliberada por motivos de estado o interacción.
- **RLS como límite de seguridad.** Todo lo que toque datos de usuario pasa por el cliente anónimo de Supabase para que las políticas RLS de Postgres apliquen el control de acceso. La service role key nunca aparece en código de cliente.
- **Solo migraciones.** Todo el schema vive en `supabase/migrations/*.sql`. Nunca editar desde el dashboard.
- **Dinero en centavos.** Centavos como entero + código de moneda. CAD por defecto.
- **Tiempo en UTC** en el borde del sistema; renderiza en la zona horaria del usuario.

Cuando el usuario describa una funcionalidad, haz una sola pregunta de clarificación, y solo si hay una decisión crítica genuinamente ambigua. De lo contrario, elige un default sensato y explícalo brevemente.

---

## Convenciones de archivos

```
src/
  app/                         # rutas
    (marketing)/               # route groups para layouts
    [tenant]/                  # segmento multi-tenant si hace falta
    api/
      <resource>/route.ts      # handlers POST/GET, solo server
  components/                  # PascalCase, un componente por archivo
  lib/
    supabase.ts                # clientes singleton (anon + service)
    stripe.ts
    env.ts                     # helper required(), lanza error de forma visible
    auth.ts                    # helpers de sesión
  data/                        # catálogo estático, constantes, enums
  hooks/                       # React hooks useXxx
supabase/
  migrations/0001_init.sql
  migrations/0002_*.sql
```

Nomenclatura:
- `snake_case` para identificadores SQL
- `PascalCase` para componentes de React, interfaces TS y types TS
- `camelCase` para variables, funciones y props
- `kebab-case` para rutas de archivos, slugs de URL y clases CSS

---

## Qué usar y cuándo

| Necesidad | Usa |
| --- | --- |
| Obtener datos para una página | Server component, `async function Page()` |
| Mutar datos desde un formulario | Server action |
| Mutar datos desde un webhook de terceros | Route handler bajo `app/api/...` |
| Obtener datos en el cliente (poco común) | Route handler + `useSWR` o React Query |
| UI optimista | `useOptimistic` + server action |
| Trabajo de larga duración | Edge Function o pg_cron (ver el pack de Supabase) |

Evita: hacer fetch desde el cliente a tu propia base de datos. Evita: pasar la service-role key a cualquier lugar al que un navegador pueda acceder.

---

## Checklist pre-PR

1. `npm run typecheck` y `npm run lint` limpios.
2. ¿Tocaste `*.sql`? Está en un archivo de migración, no en un click del dashboard.
3. ¿Tocaste RLS? Existe un test de integración que demuestra que el límite se mantiene para otro tenant.
4. ¿Tocaste código de pagos? Existe un test de idempotencia de webhook.
5. ¿Tocaste alguna superficie de cara al usuario? Funciona en un viewport de 320px con targets táctiles de 44pt.
6. README o los archivos de PROJECT-OS (STATE.md / DECISIONS.md) actualizados si la arquitectura se movió.

Si algo de esto falla, eso es lo siguiente que arreglar — no la siguiente feature.

---

## Documentos complementarios en este kit

- `patterns/supabase-clients.md` — patrón singleton de Supabase para server, client y admin
- `patterns/server-actions.md` — cuándo y cómo usarlas, con validación y la forma del manejo de errores
- `patterns/forms-and-validation.md` — schemas Zod, UI optimista, errores accesibles
- `checklists/pr-ready.md` — versión extendida del checklist pre-PR de arriba
