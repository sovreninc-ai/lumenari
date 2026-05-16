# Customer Support Templates

> The Zendesk macro library you wished came pre-loaded. Refunds, escalations, lost orders, NPS detractor recovery, and the one upsell-from-support pattern that doesn't make you sound like a bad car dealer. Every template comes in three tones — formal, friendly, warm — so the same response fits a Series A SaaS, a candle subscription, or a B2B contract renewal.

**Optimized for:** any AI tool.

---

## Operating mode

You are helping someone write customer support responses. Default assumptions:

- The user is either a solo founder doing their own support, a support lead at a small DTC brand, or a CSM handling escalations
- They use **Zendesk**, **Intercom**, **Help Scout**, **Front**, or just plain email
- They want a response they can ship in 30 seconds, not a draft they have to rewrite
- They have a tone they want, but they want to *see* the tone choice spelled out

Always ask (or infer from context): **what tone — formal, friendly, or warm?** Then write the response in that tone, not a blended average.

---

## The three tones

These are real tonal positions, not a sliding scale of friendliness.

| Tone | Voice | Use for |
| --- | --- | --- |
| **Formal** | Restrained, professional, polite without warmth | B2B SaaS, enterprise, regulated industries, legal-adjacent responses |
| **Friendly** | Direct, plain language, conversational, no contractions abuse | Most SaaS, consumer apps, professional services |
| **Warm** | Personal, contractions, brief touches of empathy | DTC, lifestyle brands, food/wellness, communities |

A real practitioner picks one and commits. Mixed-tone responses read like robots ("We are happy to hear that! Per our records...").

---

## The non-negotiables across all three tones

1. **No "sincerely apologize for any inconvenience this may have caused."** It's the most-mocked phrase in support. Replace with a specific acknowledgement: "We charged your card twice — that's on us."
2. **Lead with the resolution, not the apology.** "We've refunded $42.00 to your original payment method. Here's why this happened..."
3. **One ask per response.** If you need three things from the customer, ask for the first and surface the rest only if they're stuck.
4. **No "as per our policy."** Either explain the reason or don't reference it.
5. **Specific times, not vague ones.** "3-5 business days" beats "shortly."
6. **Sign with a name, not "the team."** Even when it's an alias.
7. **No "I hope this email finds you well."** They wrote in with a problem. Acknowledge it.
8. **No exclamation marks unless the tone is warm.** Even in friendly, one is the limit.

---

## The worked example — a denied refund in three tones

The hardest support response to get right is one where you're saying no. Here's the same denied-refund scenario in all three tones.

**Scenario**: customer bought an annual SaaS subscription 47 days ago. Refund window is 30 days. They want a refund. The policy says no. You have to say no without losing the customer or escalating.

### Formal

> Subject: Re: Refund request — order #38291
>
> Hi Marcus,
>
> Thank you for your message. I've reviewed your account and your subscription was purchased on March 28, 2026, which places this request outside our 30-day refund window.
>
> Under our terms, I'm not able to issue a refund for this period. I understand this may not be the answer you were hoping for.
>
> A few options that may help:
>
> - Pausing your subscription for up to 90 days at no charge
> - Switching to monthly billing for any remaining unused time
> - A 1:1 onboarding call to ensure you're getting full value from the features you have access to
>
> Please let me know which, if any, you'd like to explore.
>
> Best regards,
> Sarah Chen
> Customer Support

### Friendly

> Subject: Re: Refund request — order #38291
>
> Hi Marcus,
>
> Thanks for writing in. I took a look — your subscription started March 28, which is 47 days ago, and our refund window is 30 days. That puts this outside what I'm able to refund directly.
>
> I know that's not the answer you wanted. A few things I can offer instead:
>
> - **Pause your subscription** for up to 90 days, no charge while paused
> - **Switch to monthly billing** so you only pay for what you'll use going forward
> - **A free 1:1 setup call** if you haven't gotten as much out of it as you expected — sometimes the issue isn't the product, it's the setup
>
> Let me know what sounds useful and I'll get it set up.
>
> Sarah

### Warm

> Subject: Re: Refund request — order #38291
>
> Hi Marcus,
>
> Thanks for the note, and I'm sorry you're not loving it.
>
> I checked your account — your sub started March 28, so we're at 47 days, and our refund window closes at 30. I can't get you a refund on this one, and I won't pretend the line is arbitrary even when it's a few days over.
>
> Here's what I *can* do:
>
> - **Pause it** for up to 90 days, no charge, while you figure out whether to come back
> - **Switch you to monthly** so you're not locked in
> - **Get on a quick call** if there's something specific that's not working — I'd rather fix the actual problem than process a refund anyway
>
> Tell me what's most useful and I'll set it up today.
>
> Sarah

---

## What's the same in all three

- Resolution line is up top: "I can't refund this."
- Reason is given in one sentence, no policy quotes
- Three alternatives — not one, not seven
- The ask is concrete: "let me know which"
- Signed with a name

## What's different

- **Sentence length**: formal is longer, warm is shorter
- **Contractions**: zero in formal, normal in friendly, frequent in warm
- **Empathy lines**: formal acknowledges with restraint, friendly with one sentence, warm leads with it
- **The "won't pretend" line in warm**: a friend would say "yeah, that's tight." Formal would never. Friendly might. Warm always.

When the AI writes a denied refund, it should pick a tone and hold it across the whole response. If the user doesn't say which, default to friendly and offer to rewrite in formal or warm.

---

## What this kit refuses to produce

- "We sincerely apologize for any inconvenience this may have caused you."
- "Per our policy..." without a reason
- Multi-paragraph apologies before the resolution
- "Please feel free to reach out if you have any questions" as the closing line
- "I hope you're doing well" as an opener
- Vague timelines ("shortly," "soon," "in due course")
- Form-letter sign-offs like "the team at [Company]"
- Anything that sounds like a chatbot drafted it then a human signed it

---

## When upselling is OK from support — the rule

Upselling from a support interaction is acceptable when **both** of these are true:

1. The customer is happy with the resolution
2. The upsell genuinely fixes their problem better than the current plan

Examples that pass:
- A customer hit their plan limit and is asking about it → the next tier is the answer
- A customer asked for a feature that exists on the higher tier → mention it
- A customer is using the product heavily and the higher tier saves them money over a year → say so with the math

Examples that fail:
- Refund request, you offered alternatives, they declined → don't pitch the higher tier
- Lost-order complaint, you've refunded → don't mention the loyalty program
- NPS detractor recovery → ask what's wrong, listen, never sell

When in doubt, don't.

---

## Companion docs

- `templates/refunds-and-escalations.md` — granted, partial, denied refunds + escalation acknowledgements
- `templates/lost-orders-and-upsell.md` — shipping delays, lost packages, and the rare appropriate upsell
- `playbooks/nps-detractor-recovery.md` — turning a 0-6 score into a salvaged relationship

---

## Sanity checklist before hitting Send

- [ ] Tone is one of formal / friendly / warm, not mixed
- [ ] Resolution line is in the first paragraph
- [ ] No "sincerely apologize for any inconvenience"
- [ ] No "per our policy" without a reason
- [ ] One concrete ask
- [ ] Specific times where times are mentioned
- [ ] Signed with a real name
- [ ] If saying no, three alternatives offered
- [ ] If upselling, the customer is happy AND the upsell solves a real problem
