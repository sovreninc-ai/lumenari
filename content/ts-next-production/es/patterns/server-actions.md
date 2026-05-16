# Server actions — la forma canónica de mutar

Las server actions reemplazan el 90% de las API routes en App Router. Úsalas para: envíos de formularios, clicks de botón que mutan y cualquier cosa que el usuario pueda disparar directamente.

Reserva los route handlers de API para: webhooks, acceso programático y cualquier cosa que necesite una forma de respuesta HTTP custom.

## La forma

```ts
// app/teams/[teamId]/actions.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";

const Input = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(2000).optional(),
});

type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function updateTeam(
  teamId: string,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = Input.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: flattenZodErrors(parsed.error),
    };
  }

  const db = supabaseServer();
  const { error } = await db
    .from("teams")
    .update(parsed.data)
    .eq("id", teamId);

  if (error) {
    return { ok: false, error: "Could not save changes." };
  }

  revalidatePath(`/teams/${teamId}`);
  return { ok: true, data: undefined };
}
```

## Reglas

1. **Valida siempre en el borde.** Las server actions reciben `FormData` — nunca confíes en él.
2. **Usa una unión discriminada `ActionResult`.** La UI puede hacer pattern-match sobre `result.ok`.
3. **No hagas throw para errores esperados.** Throw es para bugs; devuelve un error etiquetado para validación, permisos y not-found.
4. **Usa el cliente user-scoped.** RLS hace el chequeo de auth. Si RLS da error, devuelve un "no se pudo guardar" genérico — no filtres el detalle de la policy.
5. **Revalida las rutas afectadas.** Sin revalidate = datos obsoletos, sobre todo bajo render estático.

## El lado de la UI

```tsx
"use client";

import { useActionState } from "react";
import { updateTeam } from "./actions";

export function TeamForm({ teamId }: { teamId: string }) {
  const [state, action, pending] = useActionState(
    (_: ActionResult | null, fd: FormData) => updateTeam(teamId, fd),
    null,
  );

  return (
    <form action={action}>
      <input name="name" required />
      {state?.ok === false && state.fieldErrors?.name && (
        <p className="text-red-600">{state.fieldErrors.name}</p>
      )}
      <button disabled={pending}>{pending ? "Guardando…" : "Guardar"}</button>
      {state?.ok === false && !state.fieldErrors && (
        <p className="text-red-600">{state.error}</p>
      )}
    </form>
  );
}
```

## Cuándo saltar a un route handler

Si necesitas:

- Un status code HTTP custom
- Una respuesta en streaming
- Verificación de firma de webhook
- Que un sistema externo te llame

…es un route handler. De lo contrario, default a server actions.
