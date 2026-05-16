import Link from "next/link";
import { Check, Code2, ArrowRight } from "lucide-react";
import { API_TIER_LIST, type ApiTierConfig } from "@/data/subscription-tiers";
import { formatCAD } from "@/data/kits";
import { ApiCheckoutButton } from "@/components/ApiCheckoutButton";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { apiPlatformMetadata, siteUrl } from "@/lib/seo";
import {
  JsonLd,
  SoftwareApplicationSchema,
  FAQPageSchema,
  BreadcrumbListSchema,
} from "@/lib/structured-data";

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
  return apiPlatformMetadata(safeLocale);
}

const API_FAQS = [
  {
    q: "Do I need a credit card for the free tier?",
    a: "No. The free tier gives you 100 calls/month with no payment method on file.",
  },
  {
    q: "What's the difference between Pro and Business?",
    a: "Pro is for single-product commercial use up to 10,000 calls/month. Business adds white-label, priority support, an SLA, and 100,000 calls/month.",
  },
  {
    q: "Can I use Lumenari's engine inside an internal Slack bot?",
    a: "Yes — the Free or Pro tier covers internal-only use cases. Free is fine for personal experimentation; Pro is required for production traffic.",
  },
  {
    q: "What does Enterprise include?",
    a: "Unlimited calls, dedicated Slack channel, custom integrations, SLA + uptime guarantees, and a roadmap to SOC 2.",
  },
];

/**
 * /api-platform — public marketing page for the Lumenari API.
 *
 * Pages live under `[locale]/` because of the i18n middleware, so the
 * route resolves to /api-platform at runtime. Apple-clean: one hero,
 * three use-case tiles, pricing table, code sample, two CTAs.
 *
 * Deliberately not at /api/* — that namespace is owned by Next.js route
 * handlers and would collide.
 */
export default function ApiPlatformPage() {
  const base = siteUrl();
  const breadcrumb = BreadcrumbListSchema([
    { name: "Lumenari", url: `${base}/` },
    { name: "API", url: `${base}/api-platform` },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <JsonLd
        schema={[
          SoftwareApplicationSchema(),
          FAQPageSchema(API_FAQS),
          breadcrumb,
        ]}
      />
      {/* Hero */}
      <header className="text-center max-w-3xl mx-auto mb-20">
        <span className="eyebrow">Lumenari API</span>
        <h1 className="display text-4xl sm:text-5xl md:text-6xl mt-3 mb-5">
          Embed 100+ AI skill recommendations
          <br className="hidden sm:inline" />
          <span className="text-spectrum"> into your product.</span>
        </h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          The same engine that powers Lumenari&apos;s storefront wizard, exposed
          as a JSON API. Two lines of code and your app can recommend the right
          AI optimization kit for any user&apos;s use case.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/account/api-keys"
            className="btn-primary"
          >
            Get an API key
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/api-docs" className="btn-ghost">
            Read the docs
          </Link>
        </div>
      </header>

      {/* Use cases */}
      <section className="mb-24" aria-label="Use cases">
        <h2 className="display text-2xl sm:text-3xl text-center mb-10">
          Built for teams shipping AI
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          <UseCaseCard
            title="AI tool builders"
            body="Embed skill discovery directly into your product so users find the right Claude / GPT / Cursor recipe without leaving your app."
          />
          <UseCaseCard
            title="Internal AI assistants"
            body="Power an internal Slack bot or workspace agent that surfaces curated prompts when teammates ask for help."
          />
          <UseCaseCard
            title="Agencies & consultants"
            body="White-label the recommendation engine into deliverables for clients. Business and Enterprise tiers strip Lumenari branding."
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-24" aria-label="Pricing">
        <h2 className="display text-2xl sm:text-3xl text-center mb-10">
          Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {API_TIER_LIST.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
        <p className="text-sm text-[var(--muted)] text-center mt-6">
          All paid tiers billed monthly in CAD. Cancel anytime.
        </p>
      </section>

      {/* Code sample */}
      <section className="mb-24 max-w-3xl mx-auto" aria-label="Quick start">
        <h2 className="display text-2xl sm:text-3xl text-center mb-3">
          Two lines of code.
        </h2>
        <p className="text-center text-[var(--muted)] mb-8">
          Replace <code className="font-mono text-sm bg-[var(--surface)] px-1.5 py-0.5 rounded">lmn_…</code>{" "}
          with your key and you&apos;re live.
        </p>
        <div className="rounded-2xl border border-[var(--hairline)] bg-[#0a0d10] text-[#e6e6e6] p-5 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed">
            <span className="text-[#9ca3af]"># curl</span>
            {"\n"}
            curl https://lumenari.io/api/v1/recommend \{"\n"}
            {"  "}-H <span className="text-[#fbbf24]">&quot;Authorization: Bearer lmn_a1b2c3d4…&quot;</span> \{"\n"}
            {"  "}-H <span className="text-[#fbbf24]">&quot;Content-Type: application/json&quot;</span> \{"\n"}
            {"  "}-d <span className="text-[#fbbf24]">{`'{"ai_platform":"claude","use_case":"shipping a SaaS"}'`}</span>
          </pre>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/api-docs"
            className="inline-flex items-center gap-2 text-sm text-[var(--foreground)] underline underline-offset-4 decoration-[var(--hairline)] hover:decoration-[var(--foreground)]"
          >
            <Code2 className="w-4 h-4" />
            Full reference, all endpoints
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-3xl bg-spectrum p-1">
        <div className="rounded-[20px] bg-white px-8 sm:px-14 py-12 sm:py-16 text-center">
          <h2 className="display text-3xl sm:text-4xl mb-3">
            Start free. Upgrade when it matters.
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-xl mx-auto">
            100 calls a month, no credit card. When you outgrow it, paid plans
            scale to 100,000 calls/mo and Enterprise has no ceiling.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/account/api-keys" className="btn-primary">
              Get an API key
            </Link>
            <a
              href="mailto:hello@lumenari.io?subject=Lumenari%20API%20Enterprise"
              className="btn-ghost"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function UseCaseCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[var(--hairline)] bg-white p-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-[var(--muted)] leading-relaxed text-[0.95rem]">{body}</p>
    </div>
  );
}

function PricingCard({ tier }: { tier: ApiTierConfig }) {
  const highlight = tier.id === "pro";
  return (
    <div
      className={`rounded-3xl p-[1px] h-full ${
        highlight ? "bg-spectrum shadow-lg" : "bg-[var(--hairline)]"
      }`}
    >
      <div className="rounded-3xl bg-white p-6 h-full flex flex-col">
        <span className="eyebrow">{tier.name}</span>
        <div className="mt-3 mb-1 flex items-baseline gap-1.5">
          {tier.monthly_price_cents > 0 ? (
            <>
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {formatCAD(tier.monthly_price_cents)}
              </span>
              <span className="text-xs text-[var(--muted)]">/month</span>
            </>
          ) : tier.id === "enterprise" ? (
            <span className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Custom
            </span>
          ) : (
            <span className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Free
            </span>
          )}
        </div>
        <p className="text-xs text-[var(--muted)] mb-5 min-h-[1.5em]">
          {tier.monthly_call_limit === -1
            ? "Unlimited calls"
            : `${tier.monthly_call_limit.toLocaleString()} calls / month`}
        </p>
        <ul className="space-y-2.5 mb-6 flex-1">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-[var(--accent-strong)] mt-0.5 flex-shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          {tier.id === "free" ? (
            <Link
              href="/account/api-keys"
              className="w-full inline-flex items-center justify-center h-[52px] rounded-full border border-[var(--hairline)] bg-white text-[var(--foreground)] font-medium hover:bg-[var(--surface)] transition-colors"
            >
              {tier.cta_label}
            </Link>
          ) : tier.id === "enterprise" ? (
            <a
              href="mailto:hello@lumenari.io?subject=Lumenari%20API%20Enterprise"
              className="w-full inline-flex items-center justify-center h-[52px] rounded-full border border-[var(--hairline)] bg-white text-[var(--foreground)] font-medium hover:bg-[var(--surface)] transition-colors"
            >
              {tier.cta_label}
            </a>
          ) : (
            <ApiCheckoutButton
              tier={tier.id as "pro" | "business"}
              label={tier.cta_label}
              highlight={highlight}
            />
          )}
        </div>
      </div>
    </div>
  );
}
