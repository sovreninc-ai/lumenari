# Sensible Defaults Checklist

Rule: user से तभी पूछें जब answer genuinely matter करे और आप infer नहीं कर सकते।

## Silently apply करने वाले defaults

| Decision | Sensible default |
|---|---|
| Currency | User का IP-detected country, एक one-tap switcher के साथ |
| Language | Browser का `Accept-Language` header, settings में switcher |
| Timezone | Browser-detected, displayed लेकिन interrupted-by नहीं |
| Date format | Locale-appropriate (en-CA → YYYY-MM-DD; en-US → MM/DD/YYYY) |
| First-time onboarding | Welcome carousel skip करें; directly empty state पर land करें |
| Email frequency | Transactional + monthly product update, एक Unsubscribe link के साथ |
| Theme | `prefers-color-scheme: dark` match करें |
| Notifications | Off जब तक user कुछ ऐसा न करे जहाँ एक useful हो |
| Autosave | On |
| Destructive पर Confirmation | On (dialog खुद friction है) |
| Save format | वो format जिसे उन्होंने open किया (PDF stays PDF, .md stays .md) |
| Sort order | Most recent first |
| Pagination | 20 items per page |

अगर आप UI में "would you like to…" add करते पाते हैं, पूछें: क्या मैं बस वो चीज़ कर सकता हूँ और Undo offer कर सकता हूँ?

## User से कब पूछें

पूछें जब:

1. **Action destructive है और easily reversible नहीं।** Account delete करना, history purge करना।
2. **Action में real money cost है।** Session book करना, payment process करना।
3. **Choice meaningfully later behavior affect करता है।** Workspace name choose करना, शुरू करने के लिए team pick करना।
4. **आप genuinely infer नहीं कर सकते।** First name. Job title. वे product क्यों use कर रहे हैं।

प्रति screen एक चीज़ पूछें। एक form में पाँच questions bundle न करें।

## कैसे अच्छी तरह पूछें

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

vs. bad version:

> ☐ Select your primary sport
> ☐ Select your secondary sport (optional)
> ☐ Select your governing body
> ☐ Select your typical season length
> ☐ Select your age groups (multi-select)
>
> [ Submit ]

Bad version किसी भी answer से पहले पाँच questions है। Good version एक पूछता है और बाकी infer करता है।

## सबसे hardest version

इसका सबसे hardest version यह है: "जब user का intent ambiguous हो तो इस AI को क्या करना चाहिए?"

Default: most plausible interpretation pick करें, चीज़ करें, और user को बताएँ कि आपने क्या किया। Interpretations switch करने का offer दें।

```
I assumed you meant the 2026 spring season (the active one).
If you meant a different season, here's a way to change that.
```

Apple के "Did you mean…?" surfaces इस तरह काम करते हैं। Block न करें; offer करें।
