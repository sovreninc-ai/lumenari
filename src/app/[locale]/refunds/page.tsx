import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { siteUrl } from "@/lib/seo";

const LAST_UPDATED = "2026-05-15";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const localePath = safeLocale === "en" ? "" : `/${safeLocale}`;
  return {
    title: "Refund Policy — Lumenari",
    description:
      "Lumenari refund policy. 14-day full refund if the kit hasn't been downloaded. Honest, plain-English terms.",
    alternates: { canonical: `${siteUrl()}${localePath}/refunds` },
  };
}

export default async function RefundsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <span className="eyebrow">Legal</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-2">Refund Policy</h1>
      <p className="text-sm text-[var(--muted)] mb-10">
        Last updated: {LAST_UPDATED}
      </p>

      <p className="lead leading-relaxed text-[1.05rem]">
        We want you to be happy with your purchase. If a kit isn&apos;t
        working for you, here&apos;s how we handle refunds.
      </p>

      <Section title="One-time kit and bundle purchases">
        <ul>
          <li><strong>14-day full refund</strong> if you haven&apos;t
            downloaded the kit. Email{" "}
            <a href="mailto:hello@lumenari.io">hello@lumenari.io</a> with
            the email you used at checkout. We process it within 5
            business days; Stripe takes another 5-10 to settle on your
            card statement.</li>
          <li><strong>14-day partial refund</strong> if you&apos;ve
            downloaded the kit but it didn&apos;t fit your workflow.
            We&apos;ll refund up to 50%, case-by-case. The point of this
            band is to keep the policy honest while keeping us from
            being a free preview channel for the catalog.</li>
          <li><strong>After 14 days</strong>, refunds are at our
            discretion. We almost always honor a polite request when
            the underlying complaint is fair (e.g. the kit content
            wasn&apos;t what was promised on the kit page). We
            rarely honor it when the complaint is &ldquo;I bought it
            and forgot.&rdquo;</li>
        </ul>
      </Section>

      <Section title="Pro+ subscriptions">
        <ul>
          <li>You can cancel a Pro+ subscription at any time from{" "}
            <code>/library</code> or by replying to any Pro+ email.
            Cancellation takes effect at the end of the current billing
            period — you keep access until then.</li>
          <li><strong>Within the first 7 days of a brand-new
            subscription</strong>: full refund of the current period
            on request, no questions asked.</li>
          <li><strong>After 7 days</strong>: no refund of the current
            period; we stop future billing.</li>
          <li>Pro+ Lifetime: 14-day refund if you haven&apos;t
            downloaded any kit. After 14 days or after any kit is
            downloaded, no refund. (We make exceptions for genuinely
            unusual situations — just email us.)</li>
        </ul>
      </Section>

      <Section title="API platform tiers">
        <ul>
          <li>Pro tier: refundable within 7 days if your usage was less
            than 100 API calls. After that, no refund of the current
            month; we stop future billing on cancel.</li>
          <li>Business / Scale: refundable on a case-by-case basis. The
            account manager (currently Chris) is the contact.</li>
          <li>Free tier: no money involved; no refund applies.</li>
        </ul>
      </Section>

      <Section title="Chargebacks">
        <p>
          If you initiate a chargeback rather than email us first, your
          access to the Service is suspended immediately. We respond to
          the dispute with the full purchase + access history. We
          reserve the right to permanently ban a customer who initiates
          a fraudulent chargeback. Honest disputes get a polite phone
          call (or email reply) and an offer to refund directly without
          fees.
        </p>
      </Section>

      <Section title="How to request a refund">
        <p>
          Send an email to{" "}
          <a href="mailto:hello@lumenari.io">hello@lumenari.io</a> with:
        </p>
        <ul>
          <li>The email you used at checkout;</li>
          <li>The kit slug or bundle slug (e.g. <code>sales-outreach-pro</code>);</li>
          <li>What you wanted that the kit didn&apos;t deliver. Honest
            feedback helps us fix the kit — it doesn&apos;t hurt your
            refund.</li>
        </ul>
        <p>
          We don&apos;t make you fill out a form. We don&apos;t route you
          through a support bot. A real human reads it.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions before you buy? Email us — we&apos;d rather answer
          than have you regret the purchase.{" "}
          <a href="mailto:hello@lumenari.io">hello@lumenari.io</a>.
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="display text-2xl mt-10 mb-3">{title}</h2>
      <div className="space-y-3 leading-relaxed text-[1rem]">{children}</div>
    </section>
  );
}
