# Server actions — la forme canonique des mutations

Les server actions remplacent 90 % des routes d'API dans l'App Router. Utilisez-les pour : les soumissions de formulaires, les clics de bouton qui mutent, et tout ce que l'utilisateur peut déclencher directement.

Gardez les route handlers d'API pour : les webhooks, l'accès programmatique, tout ce qui nécessite une forme de réponse HTTP personnalisée.

## La forme

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

## Règles

1. **Toujours valider à la frontière.** Les server actions reçoivent `FormData` — ne lui faites jamais confiance.
2. **Utilisez une union discriminée `ActionResult`.** L'UI peut faire du pattern-matching sur `result.ok`.
3. **Ne `throw` pas pour les erreurs attendues.** `throw` est pour les bugs ; renvoyez une erreur taguée pour la validation, les permissions et les not-found.
4. **Utilisez le client user-scoped.** La RLS fait le contrôle d'auth. Si la RLS échoue, renvoyez un « could not save » générique — ne laissez pas filtrer le détail de la policy.
5. **Revalidez les paths affectés.** Pas de revalidate = données obsolètes, particulièrement en rendu statique.

## Côté UI

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

## Quand basculer sur un route handler

Si vous avez besoin de :

- Un code de statut HTTP personnalisé
- Une réponse en streaming
- Une vérification de signature de webhook
- Un système externe qui vous appelle

… c'est un route handler. Sinon, partez par défaut sur les server actions.
