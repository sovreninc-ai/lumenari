# Stripe Connect: account onboarding

दो real options: Express और Standard। (Custom मौजूद है; आप इसे तब तक नहीं चाहते जब तक आपके पास एक compliance team न हो।)

## Express — सही default

आप customer relationship और brand own करते हैं। Connected account payouts और tax docs के लिए एक stripped-down Stripe dashboard use करता है।

**Pros**
- Onboarding एक 5-minute hosted form है
- आप branding, UX, dispute handling control करते हैं
- Connected account पर lower compliance burden
- Connected accounts individuals या small businesses हो सकते हैं

**Cons**
- Connected account अपना Stripe experience fully customize नहीं कर सकता
- कुछ advanced features (connected level पर recurring revenue) को additional config चाहिए

Express तब use करें जब: आपका platform customer को own करता है, आप support handle कर रहे हैं, connected account "supplier" है।

## Standard — जब connected account merchant है

Connected account के पास एक full Stripe dashboard है। वे अपने disputes handle करते हैं, अपना tax setup। आप एक true platform से अधिक एक referral source हैं।

**Pros**
- Connected account के पास full Stripe access
- कम platform liability

**Cons**
- Customer receipts में connected account का branding देखता है
- Disputes connected account को जाते हैं — आपके platform की कम visibility
- Onboarding longer है (real Stripe signup)

Standard तब use करें जब: connected account पहले से अपना business operate करता है और आप बस उन्हें अपने platform के through payments लेने में enable कर रहे हैं।

## Create-account से first-charge तक जाना

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

## Verify करना कि account actually ready है

`account.updated` webhook के लिए listen करें। Charge readiness के दो flags हैं:

```ts
const ready =
  account.charges_enabled === true && account.payouts_enabled === true;
```

दोनों true होने चाहिए। `payouts_enabled` के बिना `charges_enabled` का मतलब Stripe payments accept करेगा लेकिन pay out नहीं कर सकता — जिसका आमतौर पर मतलब है कि connected account ने bank verification पूरी नहीं की।

अपने UI को `ready` पर gate करें। एक org को charging शुरू न करने दें अगर Stripe उन्हें pay करने को ready नहीं है।

## Tax और legal

- **Platform** आमतौर पर sales tax collect करने के लिए responsible है अगर वो customer relationship own करता है (Express)।
- **Connected account** responsible है अगर वे customer relationship own करते हैं (Standard)।
- **W-9 / W-8 / T1 collection** US/Canadian connected accounts के लिए onboarding के दौरान Stripe करता है।
- **1099-K (US) / T4A (Canada)** issuance Stripe handle करता है — आप अपने connected accounts को ये manually issue नहीं करते।

अगर आपका platform per connected account per year > $20K और > 200 transactions कर रहा है (US 1099-K threshold), Stripe form की देखभाल करता है। Year-end से पहले verify करें कि file पर address सही है।
