/**
 * Shared Stripe Checkout fulfillment logic.
 *
 * Used by BOTH:
 *   1. The Stripe webhook (`/api/webhook/stripe`) — fires on
 *      `checkout.session.completed` and `customer.subscription.*`
 *   2. The /thanks page — fires on the post-checkout redirect when the
 *      buyer lands with `?session_id=...`. This is the fallback when the
 *      webhook does not deliver (which has been happening in test mode).
 *
 * Every code path is idempotent on Stripe identifiers:
 *   - One-off kit / bundle purchases   → unique on `purchases.stripe_session_id`
 *   - Pro+ lifetime                    → unique on `purchases.stripe_session_id`
 *   - Pro+ subscription                → keyed by `purchases.stripe_subscription_id`
 *
 * The DB has a UNIQUE constraint on `stripe_session_id` (see
 * `supabase/migrations/0001_init.sql`), so duplicate inserts are rejected at
 * the DB layer regardless of which path runs first. We additionally short-
 * circuit early via a SELECT to avoid sending duplicate emails.
 */

import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { supabaseService } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { KITS, BUNDLES, getKit } from "@/data/kits";
import { tierForPriceId, type ProTier } from "@/data/subscription-tiers";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";
import { getLocalizedKitMeta } from "@/lib/kit-i18n";

/**
 * Subject + body strings for the kit-receipt and Pro+ welcome emails.
 *
 * Kept inline here (rather than reaching into `src/i18n/dictionaries/*.ts`)
 * because those dictionaries are bundle-targeted at the public client and
 * include a lot of unrelated copy. This file runs in the webhook + /thanks
 * server contexts, and an email is a self-contained surface — small inline
 * map is easier to maintain than wiring a dictionary loader through the
 * fulfillment pipeline.
 *
 * Falls back to English for any locale not listed.
 */
const RECEIPT_COPY: Record<
  Locale,
  {
    subject: string;
    heading: string;
    intro: string;
    downloadPrefix: string;
    libraryPrefix: string;
  }
> = {
  en: {
    subject: "Your Lumenari kit is ready",
    heading: "Your Lumenari kit is ready.",
    intro:
      "Thanks for picking up a kit. Your downloads are below. They'll also live in your library — no password, just your email.",
    downloadPrefix: "Download",
    libraryPrefix: "Or open your library anytime:",
  },
  es: {
    subject: "Tu kit de Lumenari está listo",
    heading: "Tu kit de Lumenari está listo.",
    intro:
      "Gracias por llevarte un kit. Tus descargas están abajo. También vivirán en tu biblioteca — sin contraseña, solo tu email.",
    downloadPrefix: "Descargar",
    libraryPrefix: "O abre tu biblioteca cuando quieras:",
  },
  pt: {
    subject: "O teu kit Lumenari está pronto",
    heading: "O teu kit Lumenari está pronto.",
    intro:
      "Obrigado por levares um kit. Os teus downloads estão abaixo. Também vão ficar na tua biblioteca — sem palavra-passe, só com o teu email.",
    downloadPrefix: "Descarregar",
    libraryPrefix: "Ou abre a tua biblioteca quando quiseres:",
  },
  de: {
    subject: "Dein Lumenari-Kit ist bereit",
    heading: "Dein Lumenari-Kit ist bereit.",
    intro:
      "Danke, dass du ein Kit gekauft hast. Deine Downloads findest du unten. Sie liegen außerdem in deiner Bibliothek — kein Passwort, nur deine E-Mail.",
    downloadPrefix: "Herunterladen",
    libraryPrefix: "Oder öffne deine Bibliothek jederzeit:",
  },
  fr: {
    subject: "Votre kit Lumenari est prêt",
    heading: "Votre kit Lumenari est prêt.",
    intro:
      "Merci d'avoir choisi un kit. Vos téléchargements sont ci-dessous. Ils resteront aussi dans votre bibliothèque — pas de mot de passe, juste votre e-mail.",
    downloadPrefix: "Télécharger",
    libraryPrefix: "Ou ouvrez votre bibliothèque à tout moment :",
  },
  ja: {
    subject: "Lumenari キットの準備ができました",
    heading: "Lumenari キットの準備ができました。",
    intro:
      "キットをご購入いただきありがとうございます。下記からダウンロードできます。あなたのライブラリにも保存されます — パスワード不要、メールアドレスだけで開けます。",
    downloadPrefix: "ダウンロード",
    libraryPrefix: "ライブラリはいつでも開けます：",
  },
  hi: {
    subject: "आपका Lumenari किट तैयार है",
    heading: "आपका Lumenari किट तैयार है।",
    intro:
      "किट खरीदने के लिए धन्यवाद। आपके डाउनलोड नीचे हैं। वे आपकी लाइब्रेरी में भी रहेंगे — कोई पासवर्ड नहीं, बस आपका ईमेल।",
    downloadPrefix: "डाउनलोड करें",
    libraryPrefix: "अपनी लाइब्रेरी कभी भी खोलें:",
  },
  "zh-CN": {
    subject: "你的 Lumenari 套件已准备好",
    heading: "你的 Lumenari 套件已准备好。",
    intro:
      "感谢购买。下载链接如下。它们也会保存在你的资料库里 —— 不需要密码，只需要你的邮箱。",
    downloadPrefix: "下载",
    libraryPrefix: "随时打开你的资料库：",
  },
};

function receiptCopyFor(locale: Locale) {
  return RECEIPT_COPY[locale] ?? RECEIPT_COPY[DEFAULT_LOCALE];
}

const PRO_WELCOME_COPY: Record<
  Locale,
  { subject: string; heading: string; intro: string; cta: string }
> = {
  en: {
    subject: "Welcome to Lumenari Pro+",
    heading: "Welcome to Lumenari Pro+.",
    intro: "Your {tier} membership is active. Every kit — current and future — is yours.",
    cta: "Open your library",
  },
  es: {
    subject: "Bienvenido a Lumenari Pro+",
    heading: "Bienvenido a Lumenari Pro+.",
    intro: "Tu membresía {tier} está activa. Todos los kits — actuales y futuros — son tuyos.",
    cta: "Abrir tu biblioteca",
  },
  pt: {
    subject: "Bem-vindo ao Lumenari Pro+",
    heading: "Bem-vindo ao Lumenari Pro+.",
    intro: "A tua subscrição {tier} está ativa. Todos os kits — atuais e futuros — são teus.",
    cta: "Abrir a tua biblioteca",
  },
  de: {
    subject: "Willkommen bei Lumenari Pro+",
    heading: "Willkommen bei Lumenari Pro+.",
    intro: "Deine {tier}-Mitgliedschaft ist aktiv. Alle Kits — aktuelle und zukünftige — gehören dir.",
    cta: "Bibliothek öffnen",
  },
  fr: {
    subject: "Bienvenue sur Lumenari Pro+",
    heading: "Bienvenue sur Lumenari Pro+.",
    intro: "Votre abonnement {tier} est actif. Tous les kits — actuels et futurs — sont à vous.",
    cta: "Ouvrir votre bibliothèque",
  },
  ja: {
    subject: "Lumenari Pro+ へようこそ",
    heading: "Lumenari Pro+ へようこそ。",
    intro: "{tier} メンバーシップが有効になりました。現在・今後のすべてのキットをご利用いただけます。",
    cta: "ライブラリを開く",
  },
  hi: {
    subject: "Lumenari Pro+ में आपका स्वागत है",
    heading: "Lumenari Pro+ में आपका स्वागत है।",
    intro: "आपकी {tier} सदस्यता सक्रिय है। सभी किट — वर्तमान और भविष्य — आपके हैं।",
    cta: "अपनी लाइब्रेरी खोलें",
  },
  "zh-CN": {
    subject: "欢迎加入 Lumenari Pro+",
    heading: "欢迎加入 Lumenari Pro+。",
    intro: "你的{tier}会员资格已激活。所有套件 —— 现有的和未来的 —— 都属于你。",
    cta: "打开你的资料库",
  },
};

const PRO_TIER_LABEL: Record<Locale, Record<string, string>> = {
  en:    { monthly: "Monthly", annual: "Annual", lifetime: "Lifetime" },
  es:    { monthly: "Mensual", annual: "Anual", lifetime: "De por vida" },
  pt:    { monthly: "Mensal", annual: "Anual", lifetime: "Vitalício" },
  de:    { monthly: "Monatlich", annual: "Jährlich", lifetime: "Lebenslang" },
  fr:    { monthly: "Mensuel", annual: "Annuel", lifetime: "À vie" },
  ja:    { monthly: "月額", annual: "年額", lifetime: "永久" },
  hi:    { monthly: "मासिक", annual: "वार्षिक", lifetime: "आजीवन" },
  "zh-CN": { monthly: "月度", annual: "年度", lifetime: "终身" },
};

function proWelcomeCopyFor(locale: Locale, tier: ProTier) {
  const copy = PRO_WELCOME_COPY[locale] ?? PRO_WELCOME_COPY[DEFAULT_LOCALE];
  const tierLabel =
    (PRO_TIER_LABEL[locale] ?? PRO_TIER_LABEL[DEFAULT_LOCALE])[tier] ?? tier;
  return {
    ...copy,
    intro: copy.intro.replace("{tier}", tierLabel),
  };
}

function readBuyerLocale(meta: Record<string, string> | undefined): Locale {
  const raw = meta?.buyer_locale;
  if (raw && isLocale(raw)) return raw;
  return DEFAULT_LOCALE;
}

// =====================================================================
// Result shape — lets the caller render confirmation UI on /thanks
// =====================================================================
export type FulfillmentResult =
  | {
      kind: "kit";
      email: string;
      kitSlugs: string[];
      isNew: boolean;
    }
  | {
      kind: "pro_lifetime";
      email: string;
      isNew: boolean;
    }
  | {
      kind: "pro_subscription";
      email: string;
      tier: ProTier;
      isNew: boolean;
    }
  | {
      kind: "skipped";
      reason: string;
    };

// =====================================================================
// Entry point #1 — fulfill a Stripe.Checkout.Session
// Routes between one-off kits, Pro+ lifetime, and Pro+ subscription.
// =====================================================================
export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<FulfillmentResult> {
  const meta = session.metadata ?? {};

  if (meta.product === "pro_plus" && session.mode === "payment") {
    return fulfillProLifetime(session);
  }

  if (session.mode === "subscription") {
    return fulfillSubscriptionFromCheckout(session);
  }

  return fulfillKitPurchase(session);
}

// =====================================================================
// Entry point #2 — fulfill a Stripe.Subscription directly
// Called from the webhook on `customer.subscription.created/updated`.
// (The /thanks page goes through `fulfillCheckoutSession` instead.)
// =====================================================================
export async function fulfillProSubscription(
  sub: Stripe.Subscription,
  locale: Locale = DEFAULT_LOCALE,
): Promise<FulfillmentResult> {
  const priceId = sub.items.data[0]?.price?.id;
  if (!priceId) {
    return { kind: "skipped", reason: "no price id on subscription" };
  }

  const tier = tierForPriceId(priceId);
  if (!tier || tier === "lifetime") {
    return { kind: "skipped", reason: "not a Pro+ subscription price" };
  }

  const rawEmail = await resolveCustomerEmail(sub.customer);
  if (!rawEmail) {
    console.warn("[fulfillment] no email for subscription", sub.id);
    return { kind: "skipped", reason: "no email on subscription customer" };
  }
  const email = rawEmail.trim().toLowerCase();

  const proStatus = mapStripeStatusToProStatus(sub.status);
  const isActive = proStatus === "active" || proStatus === "trialing";
  const renewsAtUnix = readPeriodEnd(sub);
  const renewsAtIso = renewsAtUnix
    ? new Date(renewsAtUnix * 1000).toISOString()
    : null;

  const db = supabaseService();
  const { data: existing } = await db
    .from("purchases")
    .select("id, email, pro, access_token")
    .eq("stripe_subscription_id", sub.id)
    .maybeSingle();

  if (existing) {
    await db
      .from("purchases")
      .update({
        pro: isActive,
        pro_tier: tier,
        pro_status: proStatus,
        pro_renews_at: renewsAtIso,
      })
      .eq("id", existing.id);
    return {
      kind: "pro_subscription",
      email: existing.email ?? email,
      tier,
      isNew: false,
    };
  }

  const { data: inserted, error } = await db
    .from("purchases")
    .insert({
      email,
      kit_ids: [],
      stripe_subscription_id: sub.id,
      stripe_customer_id:
        typeof sub.customer === "string" ? sub.customer : null,
      currency: sub.currency ?? "usd",
      pro: isActive,
      pro_tier: tier,
      pro_status: proStatus,
      pro_renews_at: renewsAtIso,
    })
    .select("id, access_token")
    .single();

  if (error) throw error;

  if (isActive) {
    await sendProWelcomeEmail(email, tier, inserted.id, inserted.access_token, locale);
  }

  return { kind: "pro_subscription", email, tier, isNew: true };
}

// =====================================================================
// One-off kit / bundle purchase
// =====================================================================
async function fulfillKitPurchase(
  session: Stripe.Checkout.Session,
): Promise<FulfillmentResult> {
  const rawEmail =
    session.customer_details?.email ?? session.customer_email ?? null;
  if (!rawEmail) {
    console.warn("[fulfillment] no buyer email on session", session.id);
    return { kind: "skipped", reason: "no buyer email on session" };
  }
  const email = rawEmail.trim().toLowerCase();

  const meta = session.metadata ?? {};
  const slugCsv = meta.kit_slugs ?? "";
  const slugs = slugCsv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const finalSlugs =
    slugs.length > 0 ? slugs : await inferSlugsFromLineItems(session.id);
  if (finalSlugs.length === 0) {
    console.warn("[fulfillment] no resolvable kits for session", session.id);
    return { kind: "skipped", reason: "no resolvable kits for session" };
  }

  const buyerLocale = readBuyerLocale(meta);

  const db = supabaseService();

  const { data: existing, error: selErr } = await db
    .from("purchases")
    .select("id, access_token")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (selErr) throw selErr;

  let purchaseId: string;
  let accessToken: string;
  let isNew = false;

  if (existing) {
    purchaseId = existing.id;
    accessToken = existing.access_token;
  } else {
    const { data: inserted, error: insErr } = await db
      .from("purchases")
      .insert({
        email,
        kit_ids: finalSlugs,
        stripe_session_id: session.id,
        stripe_customer_id:
          typeof session.customer === "string" ? session.customer : null,
        amount_cents: session.amount_total ?? null,
        currency: session.currency ?? "usd",
      })
      .select("id, access_token")
      .single();

    if (insErr) throw insErr;
    purchaseId = inserted.id;
    accessToken = inserted.access_token;
    isNew = true;

    const rows = finalSlugs.map((kit_id) => ({
      purchase_id: purchaseId,
      kit_id,
    }));
    const { error: ctrErr } = await db
      .from("purchase_downloads")
      .upsert(rows, { onConflict: "purchase_id,kit_id" });
    if (ctrErr) throw ctrErr;
  }

  if (isNew) {
    await sendReceiptEmail(
      email,
      finalSlugs,
      purchaseId,
      accessToken,
      buyerLocale,
    );
  }

  return { kind: "kit", email, kitSlugs: finalSlugs, isNew };
}

// =====================================================================
// Pro+ Lifetime — one-time payment, treated like a permanent Pro flip
// =====================================================================
async function fulfillProLifetime(
  session: Stripe.Checkout.Session,
): Promise<FulfillmentResult> {
  const rawEmail =
    session.customer_details?.email ?? session.customer_email ?? null;
  if (!rawEmail) {
    console.warn("[fulfillment] no Pro+ lifetime buyer email", session.id);
    return { kind: "skipped", reason: "no buyer email on session" };
  }
  const email = rawEmail.trim().toLowerCase();

  const db = supabaseService();

  const { data: existing } = await db
    .from("purchases")
    .select("id, access_token, pro")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existing?.pro) {
    return { kind: "pro_lifetime", email, isNew: false };
  }

  if (existing) {
    await db
      .from("purchases")
      .update({
        pro: true,
        pro_tier: "lifetime",
        pro_status: "active",
        pro_renews_at: null,
      })
      .eq("id", existing.id);
    return { kind: "pro_lifetime", email, isNew: false };
  }

  const { data: inserted, error: insErr } = await db
    .from("purchases")
    .insert({
      email,
      kit_ids: [],
      stripe_session_id: session.id,
      stripe_customer_id:
        typeof session.customer === "string" ? session.customer : null,
      amount_cents: session.amount_total ?? null,
      currency: session.currency ?? "usd",
      pro: true,
      pro_tier: "lifetime",
      pro_status: "active",
      pro_renews_at: null,
    })
    .select("id, access_token")
    .single();

  if (insErr) throw insErr;

  const meta = session.metadata ?? {};
  const buyerLocale = readBuyerLocale(meta);
  await sendProWelcomeEmail(email, "lifetime", inserted.id, inserted.access_token, buyerLocale);

  return { kind: "pro_lifetime", email, isNew: true };
}

// =====================================================================
// Pro+ Subscription (when arriving from a Checkout Session in /thanks)
// The webhook normally handles this via `customer.subscription.created`,
// but if the webhook didn't fire we need to fulfill from the session.
// =====================================================================
async function fulfillSubscriptionFromCheckout(
  session: Stripe.Checkout.Session,
): Promise<FulfillmentResult> {
  const subRef = session.subscription;
  if (!subRef) {
    return { kind: "skipped", reason: "subscription session without subscription id" };
  }
  const subId = typeof subRef === "string" ? subRef : subRef.id;

  let sub: Stripe.Subscription;
  try {
    sub = await stripe().subscriptions.retrieve(subId);
  } catch (err) {
    console.error("[fulfillment] subscription retrieve failed:", err);
    return { kind: "skipped", reason: "subscription retrieve failed" };
  }

  const sessionLocale = readBuyerLocale(session.metadata ?? {});
  return fulfillProSubscription(sub, sessionLocale);
}

// =====================================================================
// Helpers — exported where the webhook still needs them
// =====================================================================

export function mapStripeStatusToProStatus(
  status: Stripe.Subscription.Status,
): "active" | "trialing" | "past_due" | "cancelled" | "incomplete" {
  switch (status) {
    case "active":
      return "active";
    case "trialing":
      return "trialing";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "paused":
      return "cancelled";
    case "incomplete":
    case "incomplete_expired":
    default:
      return "incomplete";
  }
}

export function readPeriodEnd(sub: Stripe.Subscription): number | null {
  const top = (sub as unknown as { current_period_end?: number })
    .current_period_end;
  if (typeof top === "number") return top;
  const fromItem = (
    sub.items.data[0] as unknown as { current_period_end?: number } | undefined
  )?.current_period_end;
  return typeof fromItem === "number" ? fromItem : null;
}

export async function resolveCustomerEmail(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
): Promise<string | null> {
  if (!customer) return null;
  if (typeof customer !== "string") {
    if ("email" in customer && customer.email) return customer.email;
    return null;
  }
  try {
    const c = await stripe().customers.retrieve(customer);
    if (c.deleted) return null;
    return c.email ?? null;
  } catch (err) {
    console.error("[fulfillment] customer fetch failed:", err);
    return null;
  }
}

async function inferSlugsFromLineItems(sessionId: string): Promise<string[]> {
  const items = await stripe().checkout.sessions.listLineItems(sessionId, {
    limit: 10,
  });
  const out: string[] = [];
  for (const item of items.data) {
    if (!item.price?.id) continue;
    for (const bundle of BUNDLES) {
      if (process.env[bundle.stripePriceEnv] === item.price.id) {
        out.push(...bundle.kitSlugs);
      }
    }
    for (const kit of KITS) {
      if (process.env[kit.stripePriceEnv] === item.price.id) {
        out.push(kit.slug);
      }
    }
  }
  return Array.from(new Set(out));
}

async function sendReceiptEmail(
  email: string,
  slugs: string[],
  purchaseId: string,
  accessToken: string,
  locale: Locale,
) {
  const copy = receiptCopyFor(locale);
  const localeQuery =
    locale === DEFAULT_LOCALE ? "" : `&locale=${encodeURIComponent(locale)}`;
  const localePathPrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  const kits = slugs
    .map((s) => getKit(s))
    .filter((k): k is NonNullable<ReturnType<typeof getKit>> => Boolean(k));

  // Use the localized kit name when one exists — the buyer just paid for the
  // translated kit, the button should read in their language.
  const links = await Promise.all(
    kits.map(async (k) => {
      const localized = await getLocalizedKitMeta(k.slug, locale);
      return {
        name: localized?.name || k.name,
        url: `${env.siteUrl}/api/download/${k.slug}?p=${purchaseId}&t=${accessToken}${localeQuery}`,
      };
    }),
  );

  const libraryUrl = `${env.siteUrl}${localePathPrefix}/library?p=${purchaseId}&t=${accessToken}`;

  const html = receiptTemplate({ links, libraryUrl, copy });

  try {
    const result = await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: copy.subject,
      html,
    });
    if (result.error) {
      console.error(
        "[fulfillment] kit receipt email rejected by Resend:",
        JSON.stringify({
          from: env.resendFrom,
          to: email,
          error: result.error,
        }),
      );
    } else {
      console.log(
        "[fulfillment] kit receipt email sent:",
        JSON.stringify({ from: env.resendFrom, to: email, id: result.data?.id }),
      );
    }
  } catch (err) {
    console.error("[fulfillment] kit receipt email threw:", err);
  }
}

async function sendProWelcomeEmail(
  email: string,
  tier: ProTier,
  purchaseId: string,
  accessToken: string,
  locale: Locale = DEFAULT_LOCALE,
) {
  const copy = proWelcomeCopyFor(locale, tier);
  const localePathPrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const libraryUrl = `${env.siteUrl}${localePathPrefix}/library?p=${purchaseId}&t=${accessToken}`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;">
  <tr><td style="padding:36px 36px 8px;">
    <h1 style="margin:0 0 8px;font-size:28px;font-weight:600;letter-spacing:-0.02em;">${escapeHtml(copy.heading)}</h1>
    <p style="margin:0;color:#6b7280;font-size:16px;line-height:1.55;">${escapeHtml(copy.intro)}</p>
  </td></tr>
  <tr><td style="padding:24px 36px 36px;">
    <p style="margin:0 0 14px;"><a href="${libraryUrl}" style="display:inline-block;padding:14px 22px;background:#111418;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:500;font-size:15px;">${escapeHtml(copy.cta)}</a></p>
    <p style="margin:18px 0 0;color:#9ca3af;font-size:12px;">© Lumenari · lumenari.io</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

  try {
    const result = await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: copy.subject,
      html,
    });
    if (result.error) {
      console.error(
        "[fulfillment] pro welcome email rejected by Resend:",
        JSON.stringify({
          from: env.resendFrom,
          to: email,
          error: result.error,
        }),
      );
    } else {
      console.log(
        "[fulfillment] pro welcome email sent:",
        JSON.stringify({ from: env.resendFrom, to: email, id: result.data?.id }),
      );
    }
  } catch (err) {
    console.error("[fulfillment] pro welcome email threw:", err);
  }
}

function receiptTemplate({
  links,
  libraryUrl,
  copy,
}: {
  links: { name: string; url: string }[];
  libraryUrl: string;
  copy: (typeof RECEIPT_COPY)[Locale];
}): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;">
          <tr><td style="padding:36px 36px 8px;">
            <h1 style="margin:0 0 8px;font-size:28px;font-weight:600;letter-spacing:-0.02em;">${escapeHtml(copy.heading)}</h1>
            <p style="margin:0;color:#6b7280;font-size:16px;line-height:1.55;">${escapeHtml(copy.intro)}</p>
          </td></tr>
          <tr><td style="padding:24px 36px;">
            ${links
              .map(
                (l) => `
              <p style="margin:0 0 14px;">
                <a href="${l.url}" style="display:inline-block;padding:14px 20px;background:#111418;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:500;font-size:15px;">${escapeHtml(copy.downloadPrefix)} ${escapeHtml(l.name)}</a>
              </p>`,
              )
              .join("")}
          </td></tr>
          <tr><td style="padding:8px 36px 36px;">
            <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.55;">
              ${escapeHtml(copy.libraryPrefix)} <a href="${libraryUrl}" style="color:#111418;">${libraryUrl}</a>
            </p>
            <p style="margin:18px 0 0;color:#9ca3af;font-size:12px;">© Lumenari · lumenari.io</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;",
  );
}
