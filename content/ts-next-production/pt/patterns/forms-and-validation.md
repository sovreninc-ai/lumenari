# Formulários, validação, UI otimista

## Validação mora em um lugar só

O mesmo schema Zod valida no client (para feedback rápido) e no server (para segurança). Defina uma vez num `schemas.ts` ao lado da action.

```ts
// app/clubs/new/schemas.ts
import { z } from "zod";

export const NewClubInput = z.object({
  name: z.string().min(2).max(120),
  contact_email: z.string().email(),
  sport: z.enum(["soccer", "hockey", "basketball"]),
});

export type NewClubInput = z.infer<typeof NewClubInput>;
```

## Erros acessíveis

Erros precisam:
- Ficar logo abaixo do input que falhou
- Usar `role="alert"` ou `aria-live="polite"` para que leitores de tela ouçam
- Ser específicos ("E-mail é obrigatório") em vez de vagos ("Inválido")
- Sobreviver a um refresh da página se o form deu post

```tsx
<label htmlFor="contact_email">E-mail de contato</label>
<input
  id="contact_email"
  name="contact_email"
  type="email"
  required
  aria-invalid={Boolean(errors.contact_email)}
  aria-describedby={errors.contact_email ? "contact_email-err" : undefined}
/>
{errors.contact_email && (
  <p id="contact_email-err" role="alert" className="text-red-600">
    {errors.contact_email}
  </p>
)}
```

## UI otimista — só quando a taxa de sucesso é alta

`useOptimistic` é a ferramenta certa para: alternar um like, marcar como confirmado, reordenar uma lista. Ferramenta errada para: qualquer coisa que possa falhar de verdade (pagamentos, reserva de slot, mudanças de conta).

```tsx
"use client";

import { useOptimistic } from "react";
import { setRsvp } from "./actions";

export function RsvpButton({ initial, eventId }: {
  initial: "yes" | "no" | "maybe";
  eventId: string;
}) {
  const [optimistic, setOptimistic] = useOptimistic(initial);
  return (
    <form
      action={async (fd: FormData) => {
        const next = fd.get("rsvp") as typeof initial;
        setOptimistic(next);
        await setRsvp(eventId, next);
      }}
    >
      <button name="rsvp" value="yes" data-active={optimistic === "yes"}>
        Vou
      </button>
    </form>
  );
}
```

## Formulários que demoram

Se a action pode levar >1s (mandar e-mail, gerar PDF), mostre progresso E desabilite o submit E exiba o desfecho final — não fique só girando para sempre.

```tsx
{pending ? (
  <button disabled>
    <Spinner /> Enviando convites…
  </button>
) : (
  <button>Enviar convites</button>
)}
```

## O default honesto para modos de falha desconhecidos

```tsx
{state?.ok === false && (
  <div role="alert" className="p-3 rounded bg-red-50 border border-red-200">
    <p className="font-medium">Não foi possível salvar.</p>
    <p className="text-sm text-red-700">{state.error}</p>
    <p className="text-xs text-red-600 mt-1">
      Tente de novo — se continuar acontecendo, responda ao seu último recibo.
    </p>
  </div>
)}
```

Um fallback amigável ganha de um stack trace toda vez.
