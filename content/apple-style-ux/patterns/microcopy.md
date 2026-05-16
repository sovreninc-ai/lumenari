# Microcopy patterns

## Buttons

Buttons describe an outcome, not a system action. They begin with a verb.

| Bad | Good |
|---|---|
| Submit | Send invite |
| OK | Save changes |
| Process | Pay now |
| Confirm | Cancel registration |
| Yes | Delete event |

The rule: read the button copy in isolation. Can you tell what's about to happen? If not, rewrite.

For destructive actions, the verb itself does the warning: "Delete account" — not "Are you sure?" twice in a row.

## Empty states

An empty state is the user's first impression of a screen. Don't waste it on "No items found."

The shape:

```
[ Icon — modest, not decorative ]

Headline that explains what this screen does
when it has content (1 sentence)

Body sentence that explains how to get there.

[ The CTA that gets them there ]
```

Examples:

> **Your library is empty for now.**
> Once you buy a kit, every download you'll ever need lives here.
> [ Browse kits → ]

> **No events this week.**
> When your coach schedules a practice or game, it'll show up here.
> [ See upcoming → ]

## Errors

A good error message answers three questions:
1. What happened?
2. Whose fault is it (system or me)?
3. What do I do now?

```
Couldn't save your draft.
We lost the connection. Try again — your text is still here.
[ Try again ] [ Save offline copy ]
```

Things to avoid:
- "Something went wrong" — useless
- Error codes alone — for support, not for the user (put them in the details, not the headline)
- Blaming the user implicitly ("invalid input" — invalid by whose standard?)
- Stack traces

## Onboarding

Each onboarding step has one job. Don't combine jobs.

Apple's onboarding pattern is usually:
1. **Welcome / value-prop screen** — what this app does, one sentence
2. **The one permission ask that matters** — and only that one
3. **The first useful screen** — not a tutorial, the real product

Anti-pattern: a 5-screen carousel explaining every feature. The user has not yet earned the patience to read these.

If a feature needs explaining, explain it inline the first time it appears, with a "Got it" or "OK" dismiss.

## Confirmation dialogs

Reserve for irreversible or expensive actions. Each one is friction tax.

Shape:

```
What's about to happen (1-2 sentences, specific)

[ Cancel ] [ Verb-the-action ]
```

Example:

> **Delete this event?**
> The 14 RSVPs and any uploaded files will be removed too.
>
> [ Cancel ] [ Delete event ]

Notice: the primary button is the action verb, not "Yes." The cancel is secondary, not equally weighted.

## Loading states

Three flavors:

1. **< 200ms** — show nothing. The eye won't notice.
2. **200ms - 2s** — a subtle spinner or skeleton in place of the missing content.
3. **> 2s** — explicit message: "Generating your kit recommendations…" — so the user knows something's happening on their behalf.

Indeterminate spinners are honest only when you really can't estimate. If you can estimate, use a progress bar.

## Success states

A successful action doesn't need a modal congratulating itself. A toast, a checkmark, a subtle slide-in saying "Saved" is enough.

Reserve celebratory states for genuine milestones (first invoice paid, hundredth customer, etc.) — and even then, keep them brief.
