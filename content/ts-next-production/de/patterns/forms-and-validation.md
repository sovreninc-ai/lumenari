# Formulare, Validierung, Optimistic UI

## Validierung lebt an einem Ort

Dasselbe Zod-Schema validiert auf dem Client (für schnelles Feedback) und auf dem Server (für Sicherheit). Definiere es einmal in einer `schemas.ts` neben der Action.

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

## Zugängliche Fehler

Fehler müssen:
- Direkt unter dem verursachenden Input sitzen
- `role="alert"` oder `aria-live="polite"` nutzen, damit Screenreader sie hören
- Spezifisch sein ("E-Mail ist erforderlich") nicht vage ("Ungültig")
- Einen Page-Refresh überleben, wenn das Formular gepostet wurde

```tsx
<label htmlFor="contact_email">Contact email</label>
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

## Optimistic UI — nur wenn die Erfolgsrate hoch ist

`useOptimistic` ist das richtige Tool für: ein Like umschalten, RSVP markieren, eine Liste umsortieren. Das falsche Tool für: alles, was plausibel fehlschlagen kann (Zahlungen, Slot-Buchung, Account-Änderungen).

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
        Going
      </button>
    </form>
  );
}
```

## Formulare, die eine Weile dauern

Wenn die Action >1s dauern kann (E-Mail senden, PDF generieren), zeige Fortschritt UND deaktiviere den Submit UND surface das eventuelle Ergebnis — drehe nicht einfach für immer.

```tsx
{pending ? (
  <button disabled>
    <Spinner /> Sending invites…
  </button>
) : (
  <button>Send invites</button>
)}
```

## Der ehrliche Default für unbekannte Fehlermodi

```tsx
{state?.ok === false && (
  <div role="alert" className="p-3 rounded bg-red-50 border border-red-200">
    <p className="font-medium">Couldn't save.</p>
    <p className="text-sm text-red-700">{state.error}</p>
    <p className="text-xs text-red-600 mt-1">
      Try again — if it keeps happening, hit reply on your last receipt.
    </p>
  </div>
)}
```

Ein freundlicher Fallback schlägt jederzeit einen Stack-Trace.
