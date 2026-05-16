# Formulaires, validation, UI optimiste

## La validation vit à un seul endroit

Le même schéma Zod valide côté client (pour un feedback rapide) et côté serveur (pour la sécurité). Définissez-le une fois dans un `schemas.ts` à côté de l'action.

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

## Erreurs accessibles

Les erreurs doivent :
- Se placer immédiatement sous le champ fautif
- Utiliser `role="alert"` ou `aria-live="polite"` pour que les lecteurs d'écran les entendent
- Être spécifiques (« L'email est requis ») et non vagues (« Invalide »)
- Survivre à un rafraîchissement de page si le formulaire a été posté

```tsx
<label htmlFor="contact_email">Email de contact</label>
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

## UI optimiste — uniquement quand le taux de succès est élevé

`useOptimistic` est le bon outil pour : basculer un like, marquer une RSVP, réordonner une liste. Le mauvais outil pour : tout ce qui peut plausiblement échouer (paiements, réservation de créneau, changements de compte).

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

## Formulaires qui prennent du temps

Si l'action peut prendre plus d'une seconde (envoi d'email, génération de PDF), affichez la progression ET désactivez le submit ET faites remonter le résultat final — ne laissez pas tourner un spinner indéfiniment.

```tsx
{pending ? (
  <button disabled>
    <Spinner /> Sending invites…
  </button>
) : (
  <button>Send invites</button>
)}
```

## La valeur par défaut honnête pour les modes de défaillance inconnus

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

Un fallback bienveillant vaut mieux qu'une stack trace, à tous les coups.
