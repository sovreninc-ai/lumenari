#!/usr/bin/env node
/**
 * One-off: replace the three Pro+ Stripe prices with new amounts.
 *
 * Stripe Prices are immutable — to "change" a price you create a new one
 * and archive the old. Existing subscribers stay on the old price until
 * they cancel (grandfathered, which is what we want).
 *
 * Env:
 *   STRIPE_LIVE_SECRET_KEY   sk_live_... or rk_live_...
 *   OLD_PRICE_MONTHLY        the current live price ID for Pro+ Monthly
 *   OLD_PRICE_ANNUAL         current live price ID for Pro+ Annual
 *   OLD_PRICE_LIFETIME       current live price ID for Pro+ Lifetime
 *
 *   NEW_AMOUNT_MONTHLY       cents, e.g. 3900
 *   NEW_AMOUNT_ANNUAL        cents, e.g. 19900
 *   NEW_AMOUNT_LIFETIME      cents, e.g. 49900
 *
 * Outputs:
 *   tmp/pro-pricing-mapping.json
 *   stripe-pro-pricing-live.txt  (env-file shape, feeds update-vercel-env.mjs)
 */

import Stripe from "stripe";
import fs from "node:fs";
import path from "node:path";

const LIVE_KEY = process.env.STRIPE_LIVE_SECRET_KEY;
if (!LIVE_KEY || !(LIVE_KEY.startsWith("sk_live_") || LIVE_KEY.startsWith("rk_live_"))) {
  throw new Error("STRIPE_LIVE_SECRET_KEY must be set");
}

const OLD = {
  monthly: required("OLD_PRICE_MONTHLY"),
  annual: required("OLD_PRICE_ANNUAL"),
  lifetime: required("OLD_PRICE_LIFETIME"),
};

const NEW_AMOUNT = {
  monthly: parseInt(required("NEW_AMOUNT_MONTHLY"), 10),
  annual: parseInt(required("NEW_AMOUNT_ANNUAL"), 10),
  lifetime: parseInt(required("NEW_AMOUNT_LIFETIME"), 10),
};

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

const stripe = new Stripe(LIVE_KEY, { apiVersion: "2025-02-24.acacia" });

async function rotatePrice(label, oldPriceId, newAmountCents, envVarName) {
  console.log(`\n== ${label} ==`);
  const oldPrice = await stripe.prices.retrieve(oldPriceId);
  console.log(`  old: ${oldPriceId} → ${oldPrice.unit_amount}${oldPrice.currency} (${oldPrice.recurring?.interval || "one_time"})`);
  console.log(`  new amount: ${newAmountCents} ${oldPrice.currency}`);

  const params = {
    product: oldPrice.product,
    currency: oldPrice.currency,
    unit_amount: newAmountCents,
    tax_behavior:
      oldPrice.tax_behavior && oldPrice.tax_behavior !== "unspecified"
        ? oldPrice.tax_behavior
        : undefined,
    metadata: {
      ...(oldPrice.metadata || {}),
      replaces_price_id: oldPriceId,
      pricing_revision: "2026-05-pro-39",
    },
  };
  if (oldPrice.recurring) {
    params.recurring = {
      interval: oldPrice.recurring.interval,
      interval_count: oldPrice.recurring.interval_count,
      usage_type: oldPrice.recurring.usage_type,
    };
  }
  if (oldPrice.nickname) params.nickname = oldPrice.nickname;

  const newPrice = await stripe.prices.create(params);
  console.log(`  created: ${newPrice.id}`);

  await stripe.prices.update(oldPriceId, { active: false });
  console.log(`  archived: ${oldPriceId}`);

  return {
    label,
    envVarName,
    oldPriceId,
    newPriceId: newPrice.id,
    oldAmount: oldPrice.unit_amount,
    newAmount: newAmountCents,
  };
}

async function main() {
  console.log("== Pro+ pricing rotation ==");
  console.log(`Live key: ${LIVE_KEY.slice(0, 12)}…`);

  const results = [];
  results.push(await rotatePrice("Monthly", OLD.monthly, NEW_AMOUNT.monthly, "STRIPE_PRICE_PRO_MONTHLY"));
  results.push(await rotatePrice("Annual", OLD.annual, NEW_AMOUNT.annual, "STRIPE_PRICE_PRO_ANNUAL"));
  results.push(await rotatePrice("Lifetime", OLD.lifetime, NEW_AMOUNT.lifetime, "STRIPE_PRICE_PRO_LIFETIME"));

  // Mapping
  fs.mkdirSync("tmp", { recursive: true });
  fs.writeFileSync(
    "tmp/pro-pricing-mapping.json",
    JSON.stringify(results, null, 2),
  );

  // env-file shape
  const envLines = [
    "# Lumenari Pro+ pricing rotation — live mode",
    `# Generated: ${new Date().toISOString()}`,
    "",
    ...results.map((r) => `${r.envVarName}=${r.newPriceId}`),
  ];
  fs.writeFileSync("stripe-pro-pricing-live.txt", envLines.join("\n") + "\n");

  console.log("\n== Summary ==");
  for (const r of results) {
    console.log(`  ${r.envVarName}: ${r.oldPriceId} → ${r.newPriceId} (${r.oldAmount} → ${r.newAmount})`);
  }
  console.log("\nNext: node scripts/update-vercel-env.mjs stripe-pro-pricing-live.txt --prefix STRIPE_PRICE_PRO_");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
