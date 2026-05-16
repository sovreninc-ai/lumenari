# Stripe Connect: account onboarding

Two real options: Express and Standard. (Custom exists; you don't want it unless you have a compliance team.)

## Express — the right default

You own the customer relationship and the brand. The connected account uses a stripped-down Stripe dashboard for payouts and tax docs.

**Pros**
- Onboarding is a 5-minute hosted form
- You control branding, UX, dispute handling
- Lower compliance burden on the connected account
- Connected accounts can be individuals or small businesses

**Cons**
- The connected account can't fully customize their Stripe experience
- Some advanced features (recurring revenue at the connected level) need additional config

Use Express when: your platform owns the customer, you're handling support, the connected account is the "supplier."

## Standard — when the connected account is the merchant

The connected account has a full Stripe dashboard. They handle their own disputes, their own tax setup. You're more of a referral source than a true platform.

**Pros**
- Connected account has full Stripe access
- Lower platform liability

**Cons**
- Customer sees the connected account's branding in receipts
- Disputes go to the connected account — your platform has less visibility
- Onboarding is longer (real Stripe signup)

Use Standard when: the connected account already operates their own business and you're just enabling them to take payments through your platform.

## Going from create-account to first-charge

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

## Verifying the account is actually ready

Listen for the `account.updated` webhook. Charge readiness has two flags:

```ts
const ready =
  account.charges_enabled === true && account.payouts_enabled === true;
```

Both must be true. `charges_enabled` without `payouts_enabled` means Stripe will accept payments but can't pay out — which usually means the connected account hasn't finished bank verification.

Gate your UI on `ready`. Don't let an org start charging if Stripe isn't ready to pay them.

## Tax and legal

- **The platform** is usually responsible for collecting sales tax if it owns the customer relationship (Express).
- **The connected account** is responsible if they own the customer relationship (Standard).
- **W-9 / W-8 / T1 collection** is done by Stripe during onboarding for US/Canadian connected accounts.
- **1099-K (US) / T4A (Canada)** issuance is handled by Stripe — you don't manually issue these to your connected accounts.

If your platform is doing > $20K and > 200 transactions per connected account per year (US 1099-K threshold), Stripe takes care of the form. Verify the address on file is correct before year-end.
