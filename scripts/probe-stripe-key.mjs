import Stripe from "stripe";

const key = process.env.STRIPE_LIVE_KEY;
if (!key) throw new Error("STRIPE_LIVE_KEY not set");
const s = new Stripe(key, { apiVersion: "2025-02-24.acacia" });

function ok(label) {
  console.log(`OK   ${label}`);
}
function fail(label, err) {
  const msg = err?.raw?.message || err?.message || String(err);
  const type = err?.raw?.type || "";
  console.log(`FAIL ${label}: ${type} — ${msg}`);
}

async function probe() {
  try {
    const a = await s.accounts.retrieve();
    console.log(`-- Account: ${a.id} | country=${a.country} | charges_enabled=${a.charges_enabled} | payouts_enabled=${a.payouts_enabled}`);
    if (a.business_profile?.name) console.log(`-- Business: ${a.business_profile.name}`);
    ok("accounts.retrieve");
  } catch (e) {
    fail("accounts.retrieve", e);
  }

  try {
    const p = await s.products.list({ limit: 1, active: true });
    ok(`products.list (sample id: ${p.data[0]?.id || "(empty)"})`);
  } catch (e) {
    fail("products.list", e);
  }

  try {
    const p = await s.prices.list({ limit: 1, active: true });
    ok(`prices.list (sample id: ${p.data[0]?.id || "(empty)"}, currency: ${p.data[0]?.currency || "?"})`);
  } catch (e) {
    fail("prices.list", e);
  }

  let probeProd = null;
  try {
    probeProd = await s.products.create({
      name: "_lumenari-key-probe-delete-me_",
      active: false,
      metadata: { _probe: "1" },
    });
    ok(`products.create (${probeProd.id})`);
  } catch (e) {
    fail("products.create", e);
  }

  if (probeProd) {
    try {
      const pr = await s.prices.create({
        product: probeProd.id,
        currency: "usd",
        unit_amount: 100,
        active: false,
      });
      ok(`prices.create (${pr.id})`);
    } catch (e) {
      fail("prices.create", e);
    }
    try {
      await s.products.update(probeProd.id, { active: false });
      ok("products.update");
    } catch (e) {
      fail("products.update", e);
    }
  }

  try {
    const wh = await s.webhookEndpoints.list({ limit: 1 });
    ok(`webhookEndpoints.list (count visible: ${wh.data.length})`);
  } catch (e) {
    fail("webhookEndpoints.list", e);
  }
}

probe().catch((e) => {
  console.error(e);
  process.exit(1);
});
