# The Seven Rules — long form

## 1. One primary action per screen.

The brain takes a few hundred ms to figure out what to look at on a new screen. If there are three equally-styled buttons, that's three hundred ms wasted. If there's one obviously-primary button and one obviously-secondary one, the user has decided in zero ms.

**Visual rule:** Only one filled button per screen. Everything else is text-link, outline, or icon.

**Anti-example:** the bottom of a "are you sure?" dialog with three filled red buttons. Pick one.

## 2. Plain English wins.

Apple's copy reads like a friend telling you what's about to happen.

| Corporate copy | Apple-style copy |
|---|---|
| Initialize backup process | Back up now |
| Configure notification preferences | Choose what to notify me about |
| Authentication required | Sign in to continue |
| An error has occurred (Error 0x9F) | Couldn't save. Check your connection and try again. |

If you wouldn't say it to a friend in your kitchen, don't put it on the screen.

## 3. Default to "just do it."

When 90% of users want the same outcome, asking is friction. Examples:

- **Bad:** "Do you want to enable autosave?" (yes, obviously)
- **Good:** Save automatically. Show "All changes saved" in the chrome.

- **Bad:** "Would you like to receive email confirmations?" (yes, obviously)
- **Good:** Send the confirmation. Include an Unsubscribe link.

- **Bad:** "Allow notifications?" on first launch
- **Good:** Wait until the user is about to do something where a notification is genuinely useful, then ask in context.

The exception is irreversible or expensive actions — those deserve a confirmation.

## 4. Whitespace is a feature.

Most designs are 20-30% too cramped. Try increasing every padding by 1.25x and every gap by 1.5x. It almost always feels better.

**Rule of thumb:** If two adjacent visual elements feel like they belong to each other when they shouldn't, increase the gap. If they feel separate when they shouldn't, decrease it. Adjust until the relationship is unambiguous.

## 5. Hierarchy through size + weight, not color + boxes.

A page can have:
- One H1 (32-48px, semibold)
- A handful of H2s (22-28px, semibold)
- Body text (16-17px, regular)
- A few captions (13-14px, regular, muted)

That's enough hierarchy for almost any screen. Adding colored badges, drop shadows, and boxes-around-things is usually a sign that the type scale isn't doing its job.

## 6. Progressive disclosure.

The first time a user sees a feature, show the 20% they'll use 80% of the time. Tuck the rest behind:

- A "More options" toggle
- A second screen
- A right-side detail pane
- Long-press / right-click

**Anti-example:** A settings screen with 40 toggles in a flat list. The first 6 should be obvious; the next 34 should be in a "Advanced" section that opens on tap.

## 7. Animation has a reason or it doesn't exist.

Apple's animations have one of three jobs:
1. **Maintain spatial continuity** — when something appears, animate from where it came from (a modal slides up from the bottom of the screen, a detail view slides in from the right).
2. **Communicate state change** — a checkmark drawing in after a save succeeds.
3. **Mask waiting** — a 200ms fade-in on a freshly-loaded card is better than a hard pop.

That's it. Bounce on hover, parallax for parallax's sake, glow on click — these all read as "we wanted to look modern" rather than "we wanted to be useful."

**Timing rules:**
- 150-250ms: most micro-interactions
- 300-400ms: page transitions
- > 500ms: rare and intentional

**Easing:** cubic-bezier(0.16, 1, 0.3, 1) for "things that should feel snappy and natural" — Apple uses something similar.

---

## How to apply these

Take a screen you've shipped. Read the rules in order. For each rule, ask: "Where is this screen violating this?" Don't try to fix everything at once — fix the one that's most violated.

The same trick works for your AI's design output. Paste this file into the system prompt and ask: "Review this screen against the seven rules. Tell me which one is most violated."
