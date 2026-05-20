#!/usr/bin/env node
/**
 * One-off migration: clone every active price in the TEST account into
 * the LIVE account on the same Stripe org. Mirrors the same numeric
 * amount, currency, and recurring shape. Test products + prices stay
 * intact so we can keep sandboxing.
 *
 * Env:
 *   STRIPE_TEST_SECRET_KEY   sk_test_...  (source)
 *   STRIPE_LIVE_SECRET_KEY   sk_live_...  (destination)
 *
 * Both must be from the SAME Stripe organisation. The script asserts
 * the prefixes and refuses to run if either is missing.
 *
 * Strategy:
 *   1. List every active TEST price. For each, fetch its product.
 *   2. Find-or-create a matching LIVE product (by metadata.test_product_id
 *      or by name). Carry over name, description, tax_code, metadata.
 *   3. Find-or-create a matching LIVE price on that LIVE product with
 *      the same unit_amount + currency + recurring shape. If an active
 *      LIVE price already matches, reuse it.
 *   4. Write outputs:
 *        tmp/test-to-live-mapping.json   — full audit (created/reused/errors)
 *        stripe-env-vars-live.txt        — env-file shape, ready for the
 *                                          Vercel updater. STRIPE_PRICE_*
 *                                          keys are reverse-resolved from the
 *                                          existing stripe-env-vars-usd.txt
 *                                          so the same env names map onto
 *                                          live prices.
 *
 * Idempotent: safe to re-run. Already-cloned products + prices are reused.
 */

import Stripe from "stripe";
import fs from "node:fs";
import path from "node:path";

const TEST_KEY = process.env.STRIPE_TEST_SECRET_KEY;
const LIVE_KEY = process.env.STRIPE_LIVE_SECRET_KEY;

if (!TEST_KEY || !TEST_KEY.startsWith("sk_test_")) {
  throw new Error("STRIPE_TEST_SECRET_KEY must be set to an sk_test_... key");
}
if (!LIVE_KEY || !LIVE_KEY.startsWith("sk_live_")) {
  throw new Error("STRIPE_LIVE_SECRET_KEY must be set to an sk_live_... key");
}

const apiVersion = "2025-02-24.acacia";
const test = new Stripe(TEST_KEY, { apiVersion });
const live = new Stripe(LIVE_KEY, { apiVersion });

function shapeKey(price) {
  const rec = price.recurring;
  const recKey = rec
    ? `rec:${rec.interval}:${rec.interval_count}:${rec.usage_type || "licensed"}`
    : "one_time";
  return `${price.currency}|${price.unit_amount}|${recKey}`;
}

async function listAll(client, listFn, params = {}) {
  const out = [];
  let starting_after = undefined;
  for (;;) {
    const page = await listFn.call(client, {
      ...params,
      limit: 100,
      ...(starting_after ? { starting_after } : {}),
    });
    out.push(...page.data);
    if (!page.has_more) break;
    starting_after = page.data[page.data.length - 1].id;
  }
  return out;
}

async function listAllPricesOnProduct(client, productId) {
  return listAll(client.prices, client.prices.list, { product: productId });
}

async function findOrCreateLiveProduct(testProduct, livePrice) {
  // First: did we already clone this test product?
  const byMeta = await live.products.search({
    query: `metadata['test_product_id']:'${testProduct.id}'`,
    limit: 1,
  });
  if (byMeta.data.length) {
    return { product: byMeta.data[0], created: false };
  }

  // Fall back to name match (only if no other live product with that name).
  const byName = await live.products.search({
    query: `name:'${testProduct.name.replace(/'/g, "\\'")}'`,
    limit: 2,
  });
  if (byName.data.length === 1) {
    // Tag it so the next run finds it via metadata.
    const updated = await live.products.update(byName.data[0].id, {
      metadata: {
        ...(byName.data[0].metadata || {}),
        test_product_id: testProduct.id,
      },
    });
    return { product: updated, created: false };
  }

  const created = await live.products.create({
    name: testProduct.name,
    description: testProduct.description || undefined,
    active: true,
    tax_code: testProduct.tax_code || undefined,
    metadata: {
      ...(testProduct.metadata || {}),
      test_product_id: testProduct.id,
    },
  });
  return { product: created, created: true };
}

function buildLivePriceParams(liveProduct, testPrice) {
  const params = {
    product: liveProduct.id,
    currency: testPrice.currency,
    unit_amount: testPrice.unit_amount,
    tax_behavior:
      testPrice.tax_behavior && testPrice.tax_behavior !== "unspecified"
        ? testPrice.tax_behavior
        : undefined,
  };
  if (testPrice.recurring) {
    params.recurring = {
      interval: testPrice.recurring.interval,
      interval_count: testPrice.recurring.interval_count,
      usage_type: testPrice.recurring.usage_type,
    };
    if (testPrice.recurring.trial_period_days) {
      params.recurring.trial_period_days = testPrice.recurring.trial_period_days;
    }
  }
  if (testPrice.nickname) params.nickname = testPrice.nickname;
  // Don't carry the lookup_key — live and test are separate scopes and
  // dashboards sometimes already have a lookup_key on a different price.
  // Reattach manually in the dashboard if needed.
  if (testPrice.metadata && Object.keys(testPrice.metadata).length) {
    params.metadata = { ...testPrice.metadata, test_price_id: testPrice.id };
  } else {
    params.metadata = { test_price_id: testPrice.id };
  }
  return params;
}

function parseExistingUsdEnvFile() {
  // Reverse-lookup map: { test_price_id: ENV_VAR_NAME }
  const filePath = path.resolve("stripe-env-vars-usd.txt");
  if (!fs.existsSync(filePath)) {
    console.warn(
      `stripe-env-vars-usd.txt not found — live env file will only contain raw price IDs without env names.`,
    );
    return {};
  }
  const out = {};
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    const k = t.slice(0, eq).trim();
    const v = t
      .slice(eq + 1)
      .trim()
      .replace(/^"(.*)"$/, "$1");
    if (k.startsWith("STRIPE_PRICE_") && v) out[v] = k;
  }
  return out;
}

async function main() {
  console.log("== Stripe test→live migration ==");
  console.log(`Test key:  ${TEST_KEY.slice(0, 12)}…`);
  console.log(`Live key:  ${LIVE_KEY.slice(0, 12)}…`);

  // 1. List every active test price.
  console.log("\nListing all active TEST prices…");
  const testPrices = await listAll(test.prices, test.prices.list, {
    active: true,
  });
  console.log(`Found ${testPrices.length} active TEST prices.`);

  // 2. Walk them.
  const mapping = {}; // test_price_id -> live_price_id
  const created = [];
  const reused = [];
  const errors = [];

  const liveProductCache = new Map(); // testProductId -> liveProduct
  const livePricesCache = new Map(); // liveProductId -> prices

  for (let i = 0; i < testPrices.length; i++) {
    const tp = testPrices[i];
    const tag = `[${i + 1}/${testPrices.length}] test=${tp.id} prod=${tp.product} ${tp.currency}/${tp.unit_amount}`;
    try {
      // Resolve live product.
      let liveProduct = liveProductCache.get(tp.product);
      if (!liveProduct) {
        const testProduct = await test.products.retrieve(tp.product);
        const { product, created: prodCreated } = await findOrCreateLiveProduct(
          testProduct,
          tp,
        );
        liveProduct = product;
        liveProductCache.set(tp.product, liveProduct);
        if (prodCreated) {
          console.log(`${tag} → created LIVE product ${liveProduct.id} (${testProduct.name})`);
        }
      }

      // Find or create live price.
      let livePrices = livePricesCache.get(liveProduct.id);
      if (!livePrices) {
        livePrices = await listAllPricesOnProduct(live, liveProduct.id);
        livePricesCache.set(liveProduct.id, livePrices);
      }

      const wantedShape = shapeKey(tp);
      const matchLive = livePrices.find(
        (p) => p.active && shapeKey(p) === wantedShape,
      );

      let livePrice;
      if (matchLive) {
        livePrice = matchLive;
        reused.push({ test: tp.id, live: livePrice.id, product: liveProduct.id });
        console.log(`${tag} → REUSE live ${livePrice.id}`);
      } else {
        livePrice = await live.prices.create(buildLivePriceParams(liveProduct, tp));
        created.push({ test: tp.id, live: livePrice.id, product: liveProduct.id });
        livePricesCache.set(liveProduct.id, [livePrice, ...livePrices]);
        console.log(`${tag} → CREATED live ${livePrice.id}`);
      }

      mapping[tp.id] = livePrice.id;
    } catch (err) {
      console.error(`${tag} → ERROR ${err?.message || err}`);
      errors.push({ test: tp.id, error: err?.message || String(err) });
    }
  }

  // 3. Outputs.
  const outDir = path.resolve("tmp");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "test-to-live-mapping.json"),
    JSON.stringify({ mapping, created, reused, errors }, null, 2),
  );

  // 4. Build stripe-env-vars-live.txt by translating env names from the
  // existing USD test file. Anything in the USD file that doesn't have a
  // mapping (orphans) gets reported as a warning, not crashed.
  const envNameByTestPrice = parseExistingUsdEnvFile();
  const liveEnvLines = [];
  const orphans = [];
  liveEnvLines.push(`# Lumenari Stripe price IDs — USD, LIVE MODE`);
  liveEnvLines.push(`# Generated: ${new Date().toISOString()}`);
  liveEnvLines.push(`# Source: stripe-env-vars-usd.txt + Stripe live API`);
  liveEnvLines.push("");
  for (const [testPriceId, envName] of Object.entries(envNameByTestPrice)) {
    const livePriceId = mapping[testPriceId];
    if (!livePriceId) {
      orphans.push({ env: envName, test: testPriceId });
      liveEnvLines.push(`# MISSING: ${envName}=  (test price ${testPriceId} did not migrate)`);
    } else {
      liveEnvLines.push(`${envName}=${livePriceId}`);
    }
  }
  fs.writeFileSync(
    path.resolve("stripe-env-vars-live.txt"),
    liveEnvLines.join("\n") + "\n",
  );

  const summary = {
    testPricesFound: testPrices.length,
    liveCreated: created.length,
    liveReused: reused.length,
    errors: errors.length,
    envOrphans: orphans.length,
  };
  console.log("\n" + JSON.stringify(summary, null, 2));
  console.log(
    `\nWrote stripe-env-vars-live.txt (${Object.keys(envNameByTestPrice).length - orphans.length} env entries, ${orphans.length} orphans).`,
  );
  if (errors.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
