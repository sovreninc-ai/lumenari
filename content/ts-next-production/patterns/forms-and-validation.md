# Forms, validation, optimistic UI

## Validation lives in one place

The same Zod schema validates on the client (for fast feedback) and on the server (for security). Define it once in a `schemas.ts` next to the action.

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

## Accessible errors

Errors must:
- Sit immediately under the offending input
- Use `role="alert"` or `aria-live="polite"` so screen readers hear them
- Be specific ("Email is required") not vague ("Invalid")
- Survive a page refresh if the form posted

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

## Optimistic UI — only when the success rate is high

`useOptimistic` is the right tool for: toggling a like, marking RSVPed, reordering a list. The wrong tool for: anything that can plausibly fail (payments, slot booking, account changes).

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

## Forms that take a while

If the action can take >1s (sending email, generating PDF), show progress AND disable the submit AND surface the eventual outcome — don't just spin forever.

```tsx
{pending ? (
  <button disabled>
    <Spinner /> Sending invites…
  </button>
) : (
  <button>Send invites</button>
)}
```

## The honest default for unknown failure modes

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

A friendly fallback beats a stack trace every time.
