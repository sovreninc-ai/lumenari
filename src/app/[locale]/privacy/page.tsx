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
    title: "Privacy Policy — Lumenari",
    description:
      "Lumenari Privacy Policy — what we collect, why, retention, deletion-right process, third parties (Stripe, Resend, Plausible, Anthropic, Supabase).",
    alternates: { canonical: `${siteUrl()}${localePath}/privacy` },
  };
}

export default async function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <span className="eyebrow">Legal</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-[var(--muted)] mb-10">
        Last updated: {LAST_UPDATED}
      </p>

      <p className="lead leading-relaxed text-[1.05rem]">
        This Privacy Policy explains how Lumenari (&ldquo;we&rdquo;) collects,
        uses, and protects personal information when you use the Service at
        lumenari.io. We comply with Canadian PIPEDA + Alberta PIPA,
        EU GDPR, UK GDPR, and California CCPA/CPRA.
      </p>

      <Section title="1. Information we collect">
        <p>
          We collect the minimum required to deliver the Service and meet
          our legal obligations.
        </p>
        <ul>
          <li><strong>Account + transaction data</strong> — your email
            address, billing address (collected by Stripe during checkout
            for tax compliance), and the kits or subscription tier you
            purchased.</li>
          <li><strong>Lead-magnet sign-ups</strong> — your email if you
            request the free kit at <code>/free</code> or subscribe to our
            newsletter.</li>
          <li><strong>Usage data</strong> — anonymous page views via
            Plausible Analytics. Plausible does not use cookies and does
            not collect personal data. (Some Lumenari deployments use
            PostHog with anonymous IDs instead; see &ldquo;Third-party
            providers&rdquo; below.)</li>
          <li><strong>API usage data</strong> (for API platform customers
            only) — API key id, endpoint hit, response status, and
            duration, for billing + rate limiting.</li>
          <li><strong>Communication data</strong> — emails you send us;
            Resend delivery + open + click events for the lifecycle
            emails we send you.</li>
          <li><strong>Device data</strong> — your IP address and
            user-agent, captured incidentally by hosting (Vercel) and
            CDN/security infrastructure, retained no longer than 30
            days.</li>
        </ul>
        <p>
          We do not collect names, phone numbers, or government IDs unless
          you provide them voluntarily.
        </p>
      </Section>

      <Section title="2. How we use your information">
        <ul>
          <li>To process purchases and deliver kits you bought
            (contractual necessity);</li>
          <li>To operate the Service — provision accounts, send
            transactional emails, prevent abuse (legitimate interest +
            contractual necessity);</li>
          <li>To send lifecycle marketing emails when you&apos;ve given
            consent (e.g. the welcome series after claiming the free
            kit; the Pro+ digest if you&apos;re a Pro+ subscriber);</li>
          <li>To meet tax + accounting obligations (legal obligation);</li>
          <li>To improve the Service — aggregated, anonymised analytics
            only (legitimate interest).</li>
        </ul>
        <p>
          We do not sell your personal information. We do not share it
          with advertisers. We do not use it to train AI models.
        </p>
      </Section>

      <Section title="3. Third-party processors">
        <p>
          Every processor below is bound by a Data Processing Agreement
          (DPA) with us and processes data only on our instructions.
        </p>
        <ul>
          <li><strong>Stripe</strong> — payment processing, tax
            calculation, invoicing. Stripe collects payment method
            details directly; we never see your card number.</li>
          <li><strong>Resend</strong> — transactional + marketing email
            delivery. Sees your email address + the content of mails we
            send you.</li>
          <li><strong>Supabase</strong> — Postgres database +
            authentication infrastructure. Hosts your account email +
            purchase history.</li>
          <li><strong>Vercel</strong> — application hosting + CDN. Sees
            IP + user-agent at request time.</li>
          <li><strong>Anthropic</strong> — model provider for the
            recommendation wizard. Sees the use-case description you
            submit. Anthropic does not use API inputs to train models
            unless you opt in to that program.</li>
          <li><strong>Plausible</strong> (or <strong>PostHog</strong>,
            depending on deployment) — privacy-respecting analytics.
            Plausible is cookieless. PostHog uses anonymous, salted
            device IDs.</li>
        </ul>
      </Section>

      <Section title="4. Cookies">
        <p>We use the minimum cookies required to operate:</p>
        <ul>
          <li><code>lumenari_locale</code> — remembers your preferred
            language for our multi-locale storefront.</li>
          <li><code>lumenari_admin</code> — signed admin session cookie
            (HttpOnly, only set if you successfully log into /admin).</li>
          <li><code>lumenari_ref</code> — referral attribution cookie
            (only set if you arrive via a referral link).</li>
        </ul>
        <p>
          We do not use third-party advertising or tracking cookies.
          Plausible and the cookieless analytics path are the default;
          a PostHog cookie is set only when explicitly enabled.
        </p>
      </Section>

      <Section title="5. Data retention">
        <ul>
          <li><strong>Purchases + invoices</strong> — retained 7 years
            (Canadian tax law requirement).</li>
          <li><strong>Newsletter + lead-magnet emails</strong> —
            retained until you unsubscribe or request deletion.</li>
          <li><strong>Pro+ subscription data</strong> — retained for as
            long as the subscription is active + 7 years afterward for
            financial records.</li>
          <li><strong>API usage logs</strong> — 90 days, then aggregated
            and the raw rows are deleted.</li>
          <li><strong>Email delivery + engagement events</strong> — 18
            months.</li>
        </ul>
      </Section>

      <Section title="6. Your rights">
        <p>
          Depending on your jurisdiction (GDPR, UK GDPR, CCPA/CPRA,
          PIPEDA), you have the right to:
        </p>
        <ul>
          <li>Access the personal information we hold about you;</li>
          <li>Correct inaccurate or incomplete information;</li>
          <li>Delete your personal information (subject to retention
            obligations above);</li>
          <li>Export your data in a portable format;</li>
          <li>Object to or restrict processing for marketing purposes;</li>
          <li>Withdraw consent at any time (without affecting prior
            processing);</li>
          <li>Lodge a complaint with your data-protection authority
            (Office of the Privacy Commissioner of Canada; or your local
            DPA in the EU/UK).</li>
        </ul>
        <p>
          To exercise any of these rights email{" "}
          <a href="mailto:hello@lumenari.io">hello@lumenari.io</a>. We
          respond within 30 days (10 days for CCPA-applicable requests).
        </p>
      </Section>

      <Section title="7. Children">
        <p>
          The Service is not directed at children under 16. We do not
          knowingly collect personal information from children. If we
          learn that a child has provided personal information, we delete
          it.
        </p>
      </Section>

      <Section title="8. International data transfers">
        <p>
          Lumenari operates from Canada. Stripe, Resend, Supabase, and
          Vercel may store data in the United States and/or the
          European Union. Where applicable, we rely on Standard
          Contractual Clauses + supplementary technical measures for
          transfers out of the EU/UK.
        </p>
      </Section>

      <Section title="9. Security">
        <p>
          All connections to the Service use TLS. Passwords are not
          stored — we use email-based magic links and Stripe-hosted
          checkout. Service-role database access is restricted to server
          processes. Row-Level Security is enabled on every Supabase
          table containing customer data.
        </p>
      </Section>

      <Section title="10. Changes">
        <p>
          Material changes to this Policy will be announced on the
          homepage and emailed to active subscribers at least 14 days
          before they take effect.
        </p>
      </Section>

      <Section title="11. Contact">
        <p>
          Email <a href="mailto:hello@lumenari.io">hello@lumenari.io</a>{" "}
          for any privacy question or to exercise the rights described
          above.
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
