# Server actions — canonical mutation shape

Server actions App Router में 90% API routes को replace करते हैं। इनके लिए use करें: form submissions, button clicks जो mutate करते हैं, और कुछ भी जो user directly trigger कर सकता है।

API route handlers इनके लिए रखें: webhooks, programmatic access, कुछ भी जिसे custom HTTP response shape चाहिए।

## Shape

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

1. **हमेशा boundary पर validate करें।** Server actions `FormData` receive करते हैं — कभी trust न करें।
2. **एक discriminated `ActionResult` union use करें।** UI `result.ok` पर pattern-match कर सकता है।
3. **Expected errors के लिए throw न करें।** Throw bugs के लिए है; validation, permission, और not-found के लिए एक tagged error return करें।
4. **User-scoped client use करें।** RLS auth check करता है। अगर RLS error करे, तो एक generic "could not save" return करें — policy detail leak न करें।
5. **Affected paths revalidate करें।** Revalidate नहीं = stale data, खासकर static rendering के तहत।

## UI side

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

## Route handler पर कब bail out करें

अगर आपको चाहिए:

- एक custom HTTP status code
- एक streaming response
- एक webhook signature check
- एक external system आपको call करने के लिए

…तो वो एक route handler है। नहीं तो default server actions पर।
