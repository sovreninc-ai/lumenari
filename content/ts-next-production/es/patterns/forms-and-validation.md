# Formularios, validación, UI optimista

## La validación vive en un solo lugar

El mismo schema de Zod valida en el cliente (para feedback rápido) y en el server (por seguridad). Defínelo una vez en un `schemas.ts` al lado de la action.

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

## Errores accesibles

Los errores deben:
- Aparecer inmediatamente debajo del input ofendido
- Usar `role="alert"` o `aria-live="polite"` para que los lectores de pantalla los escuchen
- Ser específicos ("El email es obligatorio") no vagos ("Inválido")
- Sobrevivir a un refresh de la página si el formulario hizo POST

```tsx
<label htmlFor="contact_email">Email de contacto</label>
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

## UI optimista — solo cuando la tasa de éxito es alta

`useOptimistic` es la herramienta correcta para: alternar un like, marcar RSVP, reordenar una lista. La herramienta equivocada para: cualquier cosa que pueda fallar de manera plausible (pagos, reserva de slots, cambios de cuenta).

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
        Voy
      </button>
    </form>
  );
}
```

## Formularios que tardan

Si la action puede tardar >1s (enviar email, generar PDF), muestra progreso Y deshabilita el submit Y expón el resultado final — no dejes algo girando para siempre.

```tsx
{pending ? (
  <button disabled>
    <Spinner /> Enviando invitaciones…
  </button>
) : (
  <button>Enviar invitaciones</button>
)}
```

## El default honesto para modos de falla desconocidos

```tsx
{state?.ok === false && (
  <div role="alert" className="p-3 rounded bg-red-50 border border-red-200">
    <p className="font-medium">No se pudo guardar.</p>
    <p className="text-sm text-red-700">{state.error}</p>
    <p className="text-xs text-red-600 mt-1">
      Intenta de nuevo — si sigue pasando, responde a tu último recibo.
    </p>
  </div>
)}
```

Un fallback amable le gana a un stack trace siempre.
