# Progressive disclosure — show the 20% first

The principle: never show on first contact what 80% of users won't need.

## Forms

A form with 14 fields scares people off. Three patterns to compress it:

### A. Required-only at first

Show only the truly required fields. Add a "More details" toggle below for the optional ones.

```
Name *
Email *

▸ More details (3 optional fields)

[ Continue ]
```

### B. Multi-step with one section per screen

Each screen is 2-4 fields, single column. The user can see exactly what's left ("Step 2 of 4").

Don't fake-multi-step a 14-field form into 7 screens of 2 fields each — that's worse. Group meaningfully.

### C. Smart defaults

If 80% of users would pick the same value, pre-fill it. Mention it in the field's helper text.

```
Currency: CAD (your IP suggests Canada)
```

## Settings

Settings screens are the worst offender. The canonical Apple-style structure:

```
Most common (≤5 items)
─────────────────────
Item A
Item B
Item C

Advanced
─────────────────────
▸ Account & privacy (8 items)
▸ Notifications (12 items)
▸ Developer (6 items)
```

Group by user mental model, not by your internal data model.

## Dashboards

A dashboard should answer one question above the fold: "How is my thing doing?"

Everything else is scroll territory. The top fold:

```
[ Big number — primary metric ]
[ One-sentence summary ]
[ A single sparkline or visual ]
```

Below that, deeper data. The user only scrolls if they want to.

## Detail pages

Show the essentials on first load. Hide the dense detail behind tabs or expand-on-click.

For example, on a kit detail page:
- Above fold: name, tagline, price, primary CTA
- Below fold: what's inside (5 bullets, not 50)
- "Files you'll receive" — list collapsed by default unless the user clicks to expand

## When NOT to use progressive disclosure

- Critical info (consent, pricing, refund policy) — never hidden.
- Errors — always immediately visible.
- Required confirmations on destructive actions — never hidden.
- Anything legally required to be conspicuous.

## How to choose what to show

Ask: "If the user only spent 5 seconds on this screen, what's the one thing they need to take away?"

That goes above the fold, in the largest type, with the most contrast. Everything else is secondary.
