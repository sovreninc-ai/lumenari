# Forms, validation, optimistic UI

## Validation एक जगह रहती है

वही Zod schema client पर validate करता है (fast feedback के लिए) और server पर भी (security के लिए)। इसे एक बार action के पास एक `schemas.ts` में define करें।

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

Errors को:
- Offending input के तुरंत नीचे बैठना चाहिए
- `role="alert"` या `aria-live="polite"` use करना चाहिए ताकि screen readers उन्हें सुन सकें
- Specific होना चाहिए ("Email is required") vague नहीं ("Invalid")
- Page refresh के बाद भी survive करना चाहिए अगर form post हुआ हो

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

## Optimistic UI — केवल तब जब success rate high हो

`useOptimistic` इनके लिए सही tool है: like toggle करना, RSVP mark करना, list reorder करना। इनके लिए गलत tool है: कुछ भी जो plausibly fail हो सकता है (payments, slot booking, account changes)।

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

## Forms जो time लेते हैं

अगर action >1s ले सकता है (email भेजना, PDF generate करना), तो progress दिखाएँ और submit disable करें और eventual outcome surface करें — बस forever spin न करें।

```tsx
{pending ? (
  <button disabled>
    <Spinner /> Sending invites…
  </button>
) : (
  <button>Send invites</button>
)}
```

## Unknown failure modes के लिए honest default

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

एक friendly fallback हर बार stack trace से बेहतर है।
