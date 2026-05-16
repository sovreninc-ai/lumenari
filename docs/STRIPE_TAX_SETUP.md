# Stripe Tax setup

Lumenari now ships with `automatic_tax: { enabled: true }` on every checkout session. Stripe handles VAT, GST, sales tax, and digital-services taxes per jurisdiction — but only after Chris finishes the dashboard setup below.

## One-time dashboard setup

### 1. Enable Stripe Tax

1. Stripe Dashboard → **Products → Tax → Get started**.
2. Confirm Lumenari sells **digital products**.
3. Pick the **CAD** preset (default currency).

### 2. Origin address

Stripe needs an origin address to determine where you have nexus.

- Set the registered business address (likely Chris's Calgary, Alberta address).
- Country: **Canada**. Province: **Alberta**.

### 3. Tax registrations

You must register in every jurisdiction where you've crossed the threshold. Stripe Tax monitors and warns you when you're approaching one. Start with:

| Jurisdiction              | Required by   | Notes                                                       |
|---------------------------|---------------|-------------------------------------------------------------|
| Canada — Federal GST/HST  | Day 1 if sales > $30k CAD/year worldwide | Register with CRA at [canada.ca/gst-hst-business](https://www.canada.ca/en/services/taxes/gsthst.html). |
| Quebec (QST)              | Threshold-based | Register with Revenu Québec.                                |
| British Columbia (PST)    | Threshold-based | Register with the BC Ministry of Finance.                   |
| Saskatchewan (PST)        | Threshold-based | Register with SK Ministry of Finance.                       |
| Manitoba (RST)            | Threshold-based | Register with MB Finance.                                   |
| EU — IOSS / OSS           | First EU sale | Use the Irish OSS (or your own) to file one VAT return.     |
| UK — VAT                  | First UK sale | Register with HMRC. Stripe Tax handles MTD filing reminders.|
| US — State sales tax      | Per-state thresholds (varies $100k or 200 txn/year) | Stripe Tax monitors. Register state-by-state via [stripe.com/tax/registrations](https://stripe.com/tax/registrations). |

**Don't pre-register everywhere.** Stripe Tax tracks where you're getting close and emails you. You only need to register when you cross the threshold.

### 4. Product tax codes

The `taxCodeForKind()` helper at `src/lib/stripe/tax-codes.ts` is the source of truth for which tax code applies to each product line.

- **Kits + bundles + Pro+ lifetime** → `txcd_10501000` (digital goods)
- **Pro+ monthly + annual + API platform tiers** → `txcd_10103001` (SaaS)

For Stripe's automatic tax to apply the right rates, every **Product** in the Stripe dashboard must have its tax code set. Open each Product → **Tax behavior** → set Tax code to the matching value above.

### 5. Tax behavior on existing prices

For every Price you've already created:

1. Open the Price → check **Tax behavior**.
2. Set it to **Exclusive** (we display prices ex-tax; Stripe adds the tax at checkout).

### 6. Tax IDs from customers (B2B)

The checkout session is configured with `tax_id_collection: { enabled: true }`. Business customers can enter their VAT/GST number and Stripe will validate it + apply reverse-charge where appropriate. No additional dashboard work needed.

### 7. Invoicing

Stripe Tax generates compliant invoices automatically. If you want them mailed:

- Dashboard → **Tax → Invoicing settings** → check "Email tax invoices to customers".
- Add your business legal name + address (lower right of the invoice).
- Add a GST/HST registration number once you have one.

## Code wiring

Already done. For reference:

- `src/app/api/checkout/route.ts` — `automatic_tax: { enabled: true }`, `tax_id_collection`, `billing_address_collection: "required"`.
- `src/app/api/pro-checkout/route.ts` — same on Pro+ flows.
- `src/app/api/api-checkout/route.ts` — same on API platform flows.
- `src/lib/stripe/tax-codes.ts` — the resolver.

If a Product in the Stripe dashboard is missing its tax code, the session will create successfully but the tax line will be zero — Stripe falls back silently. Always verify a live checkout after each new product launches.

## Verification checklist after setup

1. In Stripe **Test mode**, create a fresh test session for any kit.
2. Open the hosted checkout URL.
3. Enter a US ZIP that has sales tax (e.g. `10001` for NY).
4. Confirm the tax line shows a non-zero amount before payment.
5. Repeat with an Alberta postal code (`T2P 2M5`) — should show 5% GST only (no PST in AB).
6. Repeat with a UK postcode (`SW1A 1AA`) — should show 20% VAT.
7. Repeat with an EU postcode — should show that country's VAT.

If any of those show $0, the Product is missing its tax code. Fix in the dashboard, retry.
