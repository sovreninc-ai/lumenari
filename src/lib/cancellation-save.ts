/**
 * Cancellation save flow.
 *
 * On Stripe `customer.subscription.deleted`, we create a single-use 50%-off
 * coupon and email the customer offering to stay for another month at half
 * price. Stripe owns the coupon, we just orchestrate.
 *
 * The coupon is unique per cancellation so we can attribute conversions
 * accurately: the same coupon code is the email_events.metadata.coupon_code
 * and the metadata.lumenari_save_coupon on the Stripe Coupon itself.
 */

import { stripe } from "./stripe";
import { sendCampaignEmail } from "./email-automation";
import { proCancellationSave } from "./email-campaigns";

/** 8-char alphanumeric coupon suffix. */
function randomCouponSuffix(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1 ambiguity
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

/** Create a single-use 50%-off coupon valid for the next 7 days. */
export async function createSaveCoupon(email: string): Promise<{
  couponId: string;
  promotionCode: string;
}> {
  const sevenDays = 7 * 24 * 60 * 60;
  const code = `SAVE50-${randomCouponSuffix()}`;
  const coupon = await stripe().coupons.create({
    percent_off: 50,
    duration: "once",
    name: "Lumenari — cancellation save",
    max_redemptions: 1,
    redeem_by: Math.floor(Date.now() / 1000) + sevenDays,
    metadata: { lumenari_save_email: email, lumenari_purpose: "cancellation_save" },
  });
  const promo = await stripe().promotionCodes.create({
    coupon: coupon.id,
    code,
    max_redemptions: 1,
    expires_at: Math.floor(Date.now() / 1000) + sevenDays,
    metadata: { lumenari_save_email: email },
  });
  return { couponId: coupon.id, promotionCode: promo.code };
}

/**
 * Fire the cancellation-save email for a recipient. Idempotent on
 * (recipient, "pro-plus.cancellation-save") so re-running the webhook is
 * safe — Stripe retries are common.
 */
export async function sendCancellationSaveEmail(email: string): Promise<void> {
  try {
    const { promotionCode } = await createSaveCoupon(email);
    const campaign = proCancellationSave({ couponCode: promotionCode });
    await sendCampaignEmail({
      recipient: email,
      template: "pro-plus.cancellation-save",
      subject: campaign.subject,
      html: campaign.html,
      text: campaign.text,
      metadata: { coupon_code: promotionCode },
    });
  } catch (err) {
    console.error("[cancellation-save] failed:", err);
  }
}
