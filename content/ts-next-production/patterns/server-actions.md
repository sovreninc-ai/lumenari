# Server actions — the canonical mutation shape

Server actions replace 90% of API routes in App Router. Use them for: form submissions, button clicks that mutate, and anything the user can trigger directly.

Keep API route handlers for: webhooks, programmatic access, anything that needs a custom HTTP response shape.

## The shape

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

## Rules

1. **Always validate at the boundary.** Server actions receive `FormData` — never trust it.
2. **Use a discriminated `ActionResult` union.** The UI can pattern-match on `result.ok`.
3. **Don't throw for expected errors.** Throw is for bugs; return a tagged error for validation, permission, and not-found.
4. **Use the user-scoped client.** RLS does the auth check. If RLS errors, return a generic "could not save" — don't leak the policy detail.
5. **Revalidate the affected paths.** No revalidate = stale data, especially under static rendering.

## The UI side

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

## When to bail out to a route handler

If you need:

- A custom HTTP status code
- A streaming response
- A webhook signature check
- An external system to call you

…it's a route handler. Otherwise default to server actions.
