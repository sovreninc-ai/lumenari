# Stripe Connect: Account-Onboarding

Zwei echte Optionen: Express und Standard. (Custom existiert; du willst es nicht, außer du hast ein Compliance-Team.)

## Express — der richtige Default

Du besitzt die Kundenbeziehung und die Marke. Der verbundene Account nutzt ein abgespecktes Stripe-Dashboard für Auszahlungen und Steuerdokumente.

**Pros**
- Onboarding ist ein 5-minütiges gehostetes Formular
- Du kontrollierst Branding, UX, Dispute-Handling
- Geringere Compliance-Last auf dem verbundenen Account
- Verbundene Accounts können Einzelpersonen oder kleine Unternehmen sein

**Cons**
- Der verbundene Account kann seine Stripe-Erfahrung nicht voll anpassen
- Einige Advanced Features (Recurring Revenue auf verbundener Ebene) brauchen zusätzliche Config

Nutze Express, wenn: deine Plattform den Kunden besitzt, du den Support handhabst, der verbundene Account der "Supplier" ist.

## Standard — wenn der verbundene Account der Merchant ist

Der verbundene Account hat ein volles Stripe-Dashboard. Er handhabt seine eigenen Disputes, sein eigenes Tax-Setup. Du bist eher eine Referral-Quelle als eine echte Plattform.

**Pros**
- Verbundener Account hat vollen Stripe-Zugriff
- Geringere Plattform-Haftung

**Cons**
- Kunde sieht das Branding des verbundenen Accounts in Receipts
- Disputes gehen an den verbundenen Account — deine Plattform hat weniger Sichtbarkeit
- Onboarding ist länger (echter Stripe-Signup)

Nutze Standard, wenn: der verbundene Account bereits sein eigenes Geschäft betreibt und du ihm nur ermöglichst, Zahlungen durch deine Plattform anzunehmen.

## Von Create-Account zu First-Charge

```ts
// 1. Create the connected account
const account = await stripe.accounts.create({
  type: "express",
  country: "CA",
  email: org.contactEmail,
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  business_type: org.businessType, // 'individual' | 'company'
  metadata: { organization_id: org.id },
});

// 2. Persist the account ID against the org
await db.from("organizations")
  .update({ stripe_account_id: account.id })
  .eq("id", org.id);

// 3. Generate an onboarding link
const link = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: `${SITE}/settings/payouts?refresh=1`,
  return_url: `${SITE}/settings/payouts?done=1`,
  type: "account_onboarding",
});

// 4. Redirect the user. They come back to /settings/payouts.
return redirect(link.url);
```

## Verifizieren, dass der Account tatsächlich bereit ist

Horche auf den `account.updated`-Webhook. Charge-Readiness hat zwei Flags:

```ts
const ready =
  account.charges_enabled === true && account.payouts_enabled === true;
```

Beide müssen true sein. `charges_enabled` ohne `payouts_enabled` bedeutet, Stripe wird Zahlungen akzeptieren, aber nicht auszahlen können — was meist heißt, dass der verbundene Account die Bank-Verifikation nicht abgeschlossen hat.

Gate deine UI auf `ready`. Lass keine Org anfangen zu charlen, wenn Stripe nicht bereit ist, sie zu bezahlen.

## Tax und Legal

- **Die Plattform** ist meist verantwortlich für die Erhebung der Umsatzsteuer, wenn sie die Kundenbeziehung besitzt (Express).
- **Der verbundene Account** ist verantwortlich, wenn er die Kundenbeziehung besitzt (Standard).
- **W-9 / W-8 / T1-Erhebung** wird von Stripe während des Onboardings für US/kanadische verbundene Accounts gemacht.
- **1099-K (US) / T4A (Kanada)** Ausstellung wird von Stripe gehandhabt — du gibst diese nicht manuell an deine verbundenen Accounts aus.

Wenn deine Plattform > $20K und > 200 Transaktionen pro verbundenem Account pro Jahr macht (US 1099-K-Schwelle), kümmert sich Stripe um das Formular. Verifiziere vor Jahresende, dass die hinterlegte Adresse korrekt ist.
