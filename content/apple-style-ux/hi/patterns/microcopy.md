# Microcopy patterns

## Buttons

Buttons एक outcome describe करते हैं, system action नहीं। वे एक verb से शुरू होते हैं।

| Bad | Good |
|---|---|
| Submit | Send invite |
| OK | Save changes |
| Process | Pay now |
| Confirm | Cancel registration |
| Yes | Delete event |

Rule: button copy को isolation में पढ़ें। क्या आप बता सकते हैं कि क्या होने वाला है? अगर नहीं, rewrite करें।

Destructive actions के लिए, verb खुद warning करता है: "Delete account" — "Are you sure?" दो बार नहीं।

## Empty states

एक empty state एक screen का user का पहला impression है। इसे "No items found." पर waste न करें।

Shape:

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

एक अच्छा error message तीन questions answer करता है:
1. क्या हुआ?
2. किसकी गलती है (system या मैं)?
3. अब मैं क्या करूँ?

```
Couldn't save your draft.
We lost the connection. Try again — your text is still here.
[ Try again ] [ Save offline copy ]
```

Avoid करने वाली चीज़ें:
- "Something went wrong" — useless
- अकेले Error codes — support के लिए, user के लिए नहीं (उन्हें details में रखें, headline में नहीं)
- User को implicitly blame करना ("invalid input" — किसके standard के हिसाब से invalid?)
- Stack traces

## Onboarding

हर onboarding step की एक job है। Jobs combine न करें।

Apple का onboarding pattern आमतौर पर यह है:
1. **Welcome / value-prop screen** — यह app क्या करता है, एक sentence
2. **एक permission ask जो matter करता है** — और केवल वही एक
3. **पहली useful screen** — एक tutorial नहीं, real product

Anti-pattern: हर feature explain करने वाला एक 5-screen carousel। User ने अभी तक इन्हें पढ़ने की patience नहीं earn की।

अगर एक feature को explaining चाहिए, उसे पहली बार appear होने पर inline explain करें, एक "Got it" या "OK" dismiss के साथ।

## Confirmation dialogs

Irreversible या expensive actions के लिए reserve करें। हर एक friction tax है।

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

ध्यान दें: primary button action verb है, "Yes" नहीं। Cancel secondary है, equally weighted नहीं।

## Loading states

तीन flavors:

1. **< 200ms** — कुछ न दिखाएँ। आँख notice नहीं करेगी।
2. **200ms - 2s** — missing content की जगह एक subtle spinner या skeleton।
3. **> 2s** — explicit message: "Generating your kit recommendations…" — ताकि user को पता हो कि उनके behalf पर कुछ हो रहा है।

Indeterminate spinners honest तभी हैं जब आप really estimate नहीं कर सकते। अगर आप estimate कर सकते हैं, progress bar use करें।

## Success states

एक successful action को खुद को congratulate करते modal की ज़रूरत नहीं। एक toast, एक checkmark, "Saved" कहने वाला एक subtle slide-in काफी है।

Celebratory states genuine milestones के लिए reserve करें (पहला invoice paid, सौवाँ customer, etc.) — और तब भी, उन्हें brief रखें।
