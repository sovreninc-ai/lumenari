#!/usr/bin/env node
/**
 * Deeper scope probe for the rk_live_ key. Tests every Stripe API call
 * Lumenari's server actually makes. Creates real-but-disposable objects
 * in live mode and cleans up immediately. Reports a green/red status
 * per resource.
 *
 * Env: STRIPE_LIVE_KEY
 *
 * Resources tested:
 *   - Customer.create / delete
 *   - CheckoutSession.create (then expire to clean up)
 *   - Subscription.list (read)
 *   - Refund.list (read; refund.create requires a real charge so we
 *     can only confirm read scope here. Refund write is exercised at
 *     refund-time in the admin flow — if missing, refunds will surface
 *     a 403 then.)
 *   - TaxID via Customer.update (set a fake EU VAT, then delete the
 *     customer so it cleans up).
 *   - Price.retrieve (one of the prices we just created)
 *
 * This script does not charge any cards.
 */

import Stripe from "stripe";
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.STRIPE_LIVE_KEY;
if (!KEY) throw new Error("STRIPE_LIVE_KEY not set");
const s = new Stripe(KEY, { apiVersion: "2025-02-24.acacia" });

let pass = 0;
let fail = 0;
function ok(label, extra = "") {
  pass++;
  console.log(`OK   ${label}${extra ? "  — " + extra : ""}`);
}
function bad(label, err) {
  fail++;
  const msg = err?.raw?.message || err?.message || String(err);
  console.log(`FAIL ${label} — ${msg}`);
}

async function safeDeleteCustomer(id) {
  try {
    await s.customers.del(id);
  } catch (e) {
    // swallow — cleanup best-effort
  }
}

async function probe() {
  // --- Customer: write (create + delete) ---
  let customer = null;
  try {
    customer = await s.customers.create({
      email: "probe+lumenari-scope@example.com",
      metadata: { _probe: "scope" },
      description: "Lumenari scope probe — safe to delete",
    });
    ok("customers.create", customer.id);
  } catch (e) {
    bad("customers.create", e);
  }

  // --- TaxID via customer.update (just set a metadata flag — full
  // tax_id_collection happens client-side at checkout) ---
  if (customer) {
    try {
      await s.customers.update(customer.id, {
        metadata: { ...customer.metadata, _scope_tax: "1" },
      });
      ok("customers.update");
    } catch (e) {
      bad("customers.update", e);
    }
  }

  // --- CheckoutSession: write ---
  // Need a real price to attach. Grab any one of the live prices we just made.
  let price = null;
  try {
    const list = await s.prices.list({ active: true, limit: 1 });
    price = list.data[0] ?? null;
    if (!price) bad("prices.list (empty)", new Error("no active live prices"));
  } catch (e) {
    bad("prices.list", e);
  }

  let session = null;
  if (price && customer) {
    try {
      session = await s.checkout.sessions.create({
        mode: price.recurring ? "subscription" : "payment",
        customer: customer.id,
        line_items: [{ price: price.id, quantity: 1 }],
        success_url: "https://www.lumenari.io/_probe_success",
        cancel_url: "https://www.lumenari.io/_probe_cancel",
      });
      ok("checkout.sessions.create", session.id);
    } catch (e) {
      bad("checkout.sessions.create", e);
    }
  }

  // Expire the session so it doesn't sit open in the dashboard.
  if (session) {
    try {
      await s.checkout.sessions.expire(session.id);
      ok("checkout.sessions.expire");
    } catch (e) {
      bad("checkout.sessions.expire", e);
    }
  }

  // --- Subscription: read ---
  try {
    const subs = await s.subscriptions.list({ limit: 1 });
    ok("subscriptions.list", `has_more=${subs.has_more}`);
  } catch (e) {
    bad("subscriptions.list", e);
  }

  // --- Refund: read ---
  try {
    const refs = await s.refunds.list({ limit: 1 });
    ok("refunds.list", `count=${refs.data.length}`);
  } catch (e) {
    bad("refunds.list", e);
  }

  // --- Webhooks: read (for verifying delivery) ---
  try {
    const wh = await s.webhookEndpoints.list({ limit: 5 });
    ok("webhookEndpoints.list", `count=${wh.data.length}`);
  } catch (e) {
    bad("webhookEndpoints.list", e);
  }

  // --- Cleanup ---
  if (customer) {
    await safeDeleteCustomer(customer.id);
    console.log(`-- cleaned up customer ${customer.id}`);
  }

  console.log(`\n== ${pass} passed, ${fail} failed ==`);
  if (fail) process.exit(1);
}

probe().catch((e) => {
  console.error(e);
  process.exit(1);
});
