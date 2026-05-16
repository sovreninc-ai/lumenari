# Server Actions — die kanonische Mutations-Form

Server Actions ersetzen 90% der API-Routes im App Router. Nutze sie für: Formular-Submissions, Button-Klicks, die mutieren, und alles, was der Nutzer direkt auslösen kann.

Behalte API-Route-Handler für: Webhooks, programmatischen Zugriff, alles, was eine benutzerdefinierte HTTP-Response-Form benötigt.

## Die Form

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

## Regeln

1. **Immer an der Grenze validieren.** Server Actions empfangen `FormData` — vertraue ihm nie.
2. **Nutze eine diskriminierte `ActionResult`-Union.** Die UI kann auf `result.ok` pattern-matchen.
3. **Wirf keine Errors für erwartete Fehler.** Throw ist für Bugs; gib einen getaggten Error für Validierung, Permission und Not-Found zurück.
4. **Nutze den user-gescopten Client.** RLS macht den Auth-Check. Wenn RLS einen Fehler wirft, gib ein generisches "Could not save" zurück — leake nicht das Policy-Detail.
5. **Revalidiere die betroffenen Pfade.** Kein Revalidate = veraltete Daten, besonders unter statischem Rendering.

## Die UI-Seite

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
      <button disabled={pending}>{pending ? "Saving…" : "Save"}</button>
      {state?.ok === false && !state.fieldErrors && (
        <p className="text-red-600">{state.error}</p>
      )}
    </form>
  );
}
```

## Wann zu einem Route Handler aussteigen

Falls du brauchst:

- Einen benutzerdefinierten HTTP-Status-Code
- Eine Streaming-Response
- Einen Webhook-Signatur-Check
- Ein externes System, das dich aufruft

…dann ist es ein Route Handler. Ansonsten default zu Server Actions.
