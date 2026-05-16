# Sensible Defaults Checklist

The rule: ask the user only when the answer genuinely matters and you can't infer it.

## Defaults to apply silently

| Decision | Sensible default |
|---|---|
| Currency | User's IP-detected country, with a one-tap switcher |
| Language | Browser's `Accept-Language` header, switcher in settings |
| Timezone | Browser-detected, displayed but not interrupted-by |
| Date format | Locale-appropriate (en-CA → YYYY-MM-DD; en-US → MM/DD/YYYY) |
| First-time onboarding | Skip the welcome carousel; land directly on the empty state |
| Email frequency | Transactional + monthly product update, with an Unsubscribe link |
| Theme | Match `prefers-color-scheme: dark` |
| Notifications | Off until the user does something where one would be useful |
| Autosave | On |
| Confirmation on destructive | On (the dialog itself is the friction) |
| Save format | The format they opened (PDF stays PDF, .md stays .md) |
| Sort order | Most recent first |
| Pagination | 20 items per page |

If you find yourself adding "would you like to…" to the UI, ask: can I just do the thing and offer Undo?

## When to ask the user

Ask when:

1. **The action is destructive and not easily reversible.** Deleting an account, purging history.
2. **The action costs real money.** Booking a session, processing a payment.
3. **The choice meaningfully affects later behavior.** Choosing a workspace name, picking a team to start with.
4. **You genuinely can't infer.** First name. Job title. Why they're using the product.

Ask one thing per screen. Don't bundle five questions into one form.

## How to ask well

```
[ One-sentence question that's also a heading ]

[ Body text — only if the question needs context ]

[ The choice surface — chip group, radio, or text field ]

[ Continue button — disabled until a choice is made ]
```

Examples:

> **What sport does your club coach?**
> We'll set up the right age groups, divisions, and scheduling defaults.
>
> [ Soccer ] [ Hockey ] [ Basketball ] [ Baseball ] [ Other ]
>
> [ Continue → ]

vs. the bad version:

> ☐ Select your primary sport
> ☐ Select your secondary sport (optional)
> ☐ Select your governing body
> ☐ Select your typical season length
> ☐ Select your age groups (multi-select)
>
> [ Submit ]

The bad version is five questions before any answer. The good version asks one and infers the rest.

## The hardest version

The hardest version of this is: "what should this AI do when the user's intent is ambiguous?" 

Default: pick the most plausible interpretation, do the thing, and tell the user what you did. Offer to switch interpretations.

```
I assumed you meant the 2026 spring season (the active one).
If you meant a different season, here's a way to change that.
```

This is how Apple's "Did you mean…?" surfaces work. Don't block; offer.
