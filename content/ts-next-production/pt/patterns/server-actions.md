# Server actions — o formato canônico de mutação

Server actions substituem 90% das API routes no App Router. Use elas para: submissão de formulários, cliques em botões que mutam estado, e qualquer coisa que o usuário pode disparar diretamente.

Mantenha route handlers de API para: webhooks, acesso programático e qualquer coisa que precise de um formato de resposta HTTP customizado.

## O formato

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
      error: "Corrija os campos destacados.",
      fieldErrors: flattenZodErrors(parsed.error),
    };
  }

  const db = supabaseServer();
  const { error } = await db
    .from("teams")
    .update(parsed.data)
    .eq("id", teamId);

  if (error) {
    return { ok: false, error: "Não foi possível salvar as mudanças." };
  }

  revalidatePath(`/teams/${teamId}`);
  return { ok: true, data: undefined };
}
```

## Regras

1. **Sempre valide na fronteira.** Server actions recebem `FormData` — nunca confie nele.
2. **Use uma discriminated union `ActionResult`.** A UI pode dar pattern-match em `result.ok`.
3. **Não dê throw para erros esperados.** Throw é para bugs; retorne um erro tagueado para validação, permissão e not-found.
4. **Use o client com escopo de usuário.** O RLS faz a verificação de auth. Se o RLS der erro, retorne um genérico "não foi possível salvar" — não vaze o detalhe da policy.
5. **Revalide os paths afetados.** Sem revalidate = dados defasados, especialmente sob renderização estática.

## O lado da UI

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
      <button disabled={pending}>{pending ? "Salvando…" : "Salvar"}</button>
      {state?.ok === false && !state.fieldErrors && (
        <p className="text-red-600">{state.error}</p>
      )}
    </form>
  );
}
```

## Quando cair para um route handler

Se você precisa de:

- Um status HTTP customizado
- Uma resposta em streaming
- Verificação de assinatura de webhook
- Um sistema externo te chamando

…é route handler. Caso contrário, vá de server action por padrão.
