/**
 * Shared HMAC-based unsubscribe token for newsletter_subscribers.
 *
 * The token is a 32-char hex digest of HMAC-SHA-256 over the email,
 * scoped with the "newsletter-unsub:" prefix so it can't be confused
 * with other token kinds in the app. Stateless — no DB lookup required
 * to validate.
 *
 * Secret resolution order:
 *   NEWSLETTER_TOKEN_SECRET → STRIPE_WEBHOOK_SECRET → "lumenari-dev"
 *
 * The final fallback is only there so local dev without env vars
 * doesn't blow up; in prod one of the first two MUST be set.
 */

const PREFIX = "newsletter-unsub:";

function getSecret(): string {
  return (
    process.env.NEWSLETTER_TOKEN_SECRET ??
    process.env.STRIPE_WEBHOOK_SECRET ??
    "lumenari-dev"
  );
}

export async function makeUnsubscribeToken(email: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${PREFIX}${email}`),
  );
  return Buffer.from(new Uint8Array(sig)).toString("hex").slice(0, 32);
}

export async function verifyUnsubscribeToken(
  email: string,
  token: string,
): Promise<boolean> {
  const expected = await makeUnsubscribeToken(email);
  if (expected.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return diff === 0;
}
