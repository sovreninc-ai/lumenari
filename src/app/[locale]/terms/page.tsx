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
    title: "Terms of Service — Lumenari",
    description:
      "Lumenari Terms of Service — license, IP, refunds, governing law (Alberta, Canada), and acceptable use.",
    alternates: { canonical: `${siteUrl()}${localePath}/terms` },
  };
}

export default async function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose-lumenari">
      <span className="eyebrow">Legal</span>
      <h1 className="display text-4xl sm:text-5xl mt-2 mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-[var(--muted)] mb-10">
        Last updated: {LAST_UPDATED}
      </p>

      <p className="lead">
        These Terms govern your use of Lumenari (the &ldquo;Service&rdquo;)
        operated by Lumenari (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
        &ldquo;Lumenari&rdquo;) at lumenari.io. By accessing the Service or
        purchasing any kit, you agree to these Terms.
      </p>

      <Section title="1. The Service">
        <p>
          Lumenari sells digital optimization kits (collectively,
          &ldquo;Kits&rdquo;) — prompt collections, SKILL.md files,
          ChatGPT-compatible optimization packs, Custom GPT instructions,
          and related documentation — designed to improve the output of
          large language models including Anthropic Claude, OpenAI ChatGPT,
          Anthropic-powered Cursor, Google Gemini, and similar tools.
        </p>
        <p>
          We may also offer a subscription product (Pro+) and an API tier
          for programmatic access to the same content.
        </p>
      </Section>

      <Section title="2. Purchases and access">
        <p>
          Kits are sold as one-time digital downloads. After successful
          payment we email you a download link, and your purchase becomes
          accessible at /library using the email you provided at checkout.
          Pro+ subscriptions grant access to every current and future kit
          for as long as the subscription is active.
        </p>
        <p>
          You may use a purchased Kit (a) for your own work and the work of
          your employer, (b) for client work where the Kit assists in
          producing deliverables, and (c) in any AI tool you operate.
          You may not resell, redistribute, or publish the Kit content
          itself as a standalone product, package, or knowledge base.
        </p>
      </Section>

      <Section title="3. Refunds">
        <p>
          We offer a 14-day refund on Kit purchases when the Kit has not
          been downloaded. If the Kit has been downloaded, refunds are
          handled case-by-case. See the dedicated <a href="/refunds">Refund
          Policy</a> for the full detail. Subscription cancellations stop
          future renewals; they do not refund the most recent billing
          period.
        </p>
      </Section>

      <Section title="4. Intellectual property">
        <p>
          All Kit content — including the SKILL.md format expression,
          prompt structures, accompanying documentation, kit names, and
          marketing copy — is the property of Lumenari and is licensed to
          you under a non-exclusive, non-transferable license for the uses
          described in Section 2. The underlying AI behavior, model output,
          and any work product you create using a Kit remains yours.
        </p>
        <p>
          Brand names, logos, and trademarks referenced in Kits (e.g.
          Claude, ChatGPT, Cursor, Gemini) belong to their respective
          owners. We are not affiliated with, endorsed by, or sponsored by
          any of those companies.
        </p>
      </Section>

      <Section title="5. Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service to produce or distribute content that is
            unlawful, harmful, abusive, defamatory, or sexually explicit
            involving minors;</li>
          <li>Use the Service to generate content for fraud, harassment,
            or unauthorized access to systems or data;</li>
          <li>Reverse-engineer, scrape, or extract the Service in bulk
            (the API has its own published terms for legitimate
            programmatic use);</li>
          <li>Resell the Service or any Kit, in whole or in part, as a
            product or service of your own;</li>
          <li>Strip, modify, or obscure the attribution lines in Kit
            files when republishing your derivative work in public
            documentation or training materials.</li>
        </ul>
        <p>
          We may suspend or terminate access for breach of this section
          without refund.
        </p>
      </Section>

      <Section title="6. AI-generated output disclaimer">
        <p>
          Kits help your AI produce better output. They do not produce
          output themselves. AI-generated content can be inaccurate,
          biased, or unsuitable for a given purpose. You are responsible
          for reviewing, verifying, and editing any AI output before
          relying on it — particularly in legal, medical, financial,
          regulatory, or safety contexts. The disclaimers embedded in
          individual Kit files (e.g. &ldquo;not legal advice&rdquo;,
          &ldquo;not medical advice&rdquo;, &ldquo;not investment
          advice&rdquo;) are part of these Terms.
        </p>
      </Section>

      <Section title="7. Privacy">
        <p>
          We collect and use personal information as described in our
          <a href="/privacy"> Privacy Policy</a>. By using the Service you
          consent to the collection and use described there.
        </p>
      </Section>

      <Section title="8. Disclaimers">
        <p>
          The Service is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;, without warranties of any kind, express or
          implied, including without limitation merchantability, fitness
          for a particular purpose, non-infringement, or that the Service
          will be uninterrupted or error-free.
        </p>
      </Section>

      <Section title="9. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Lumenari&apos;s total
          liability for any claim arising out of or relating to these
          Terms or the Service is limited to the total amount you paid us
          in the twelve (12) months preceding the claim. We are not
          liable for indirect, incidental, consequential, special,
          punitive, or exemplary damages, even if advised of the
          possibility.
        </p>
      </Section>

      <Section title="10. DMCA and copyright">
        <p>
          We respect intellectual property rights. To submit a DMCA
          takedown notice, email <a href="mailto:hello@lumenari.io">hello@lumenari.io</a>
          with the subject &ldquo;DMCA Notice&rdquo; and include: (a)
          your contact info, (b) identification of the copyrighted work,
          (c) the URL of the allegedly infringing material, (d) a good-faith
          statement, and (e) a statement under penalty of perjury that the
          information is accurate. We respond within 10 business days.
        </p>
      </Section>

      <Section title="11. Governing law and disputes">
        <p>
          These Terms are governed by the laws of the Province of Alberta
          and the federal laws of Canada applicable therein, without
          regard to its conflict-of-laws principles. Any dispute will be
          resolved in the courts of Alberta, and you and we consent to
          their jurisdiction. The United Nations Convention on Contracts
          for the International Sale of Goods does not apply.
        </p>
      </Section>

      <Section title="12. Termination">
        <p>
          You may stop using the Service at any time. We may suspend or
          terminate your access for breach of these Terms or for unlawful
          use, with or without notice. Termination does not entitle you
          to a refund except as described in Section 3.
        </p>
      </Section>

      <Section title="13. Changes">
        <p>
          We may update these Terms from time to time. Material changes
          will be announced on the homepage and via email to active
          subscribers. Continued use of the Service after a change takes
          effect constitutes acceptance.
        </p>
      </Section>

      <Section title="14. Contact">
        <p>
          Email <a href="mailto:hello@lumenari.io">hello@lumenari.io</a>.
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
