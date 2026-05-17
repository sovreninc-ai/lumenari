import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getServerLocale } from "@/i18n/get-locale";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import { LocaleProvider } from "@/i18n/use-dictionary";
import {
  NewsletterFooterForm,
  ExitIntentNewsletterModal,
} from "@/components/newsletter-signup";
import {
  JsonLd,
  OrganizationSchema,
  WebSiteSchema,
} from "@/lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumenari — Optimization kits for your AI",
  description:
    "Curated prompt packs and skill bundles that make Claude, ChatGPT, Codex, Gemini, and Cursor work like a senior teammate.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumenari.io",
  ),
  openGraph: {
    title: "Lumenari",
    description:
      "Optimization kits that make your AI work like a senior teammate.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumenari.io",
    siteName: "Lumenari",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd schema={[OrganizationSchema(), WebSiteSchema()]} />
        {plausibleDomain ? (
          <Script
            strategy="afterInteractive"
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.tagged-events.js"
          />
        ) : null}
        {plausibleDomain ? (
          <Script id="plausible-init" strategy="afterInteractive">
            {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
          </Script>
        ) : null}
        {posthogKey ? (
          <Script id="posthog-init" strategy="afterInteractive">
            {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('${posthogKey}',{api_host:'${posthogHost}'})`}
          </Script>
        ) : null}
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <LocaleProvider locale={locale}>
          <SiteHeader locale={locale} dict={dict} />
          <main className="flex-1">{children}</main>
          <SiteFooter dict={dict} />
          <ExitIntentNewsletterModal />
        </LocaleProvider>
      </body>
    </html>
  );
}

function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-[var(--hairline)]">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Image
            src="/logo-mark.png"
            alt="Lumenari"
            width={48}
            height={48}
            priority
            className="rounded-full"
          />
          <span className="text-base tracking-widest font-semibold">
            LUMENARI
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/kits"
            className="px-3 py-2 rounded-full hover:bg-[var(--surface)]"
          >
            {dict.header.kits}
          </Link>
          <Link
            href="/pro"
            className="px-3 py-2 rounded-full hover:bg-[var(--surface)]"
          >
            {dict.header.pro}
          </Link>
          <Link
            href="/library"
            className="px-3 py-2 rounded-full hover:bg-[var(--surface)]"
          >
            {dict.header.library}
          </Link>
          <LanguageSwitcher initialLocale={locale} />
          <Link
            href="/#wizard"
            className="ml-2 inline-flex items-center justify-center h-9 px-4 rounded-full bg-[var(--foreground)] text-white text-sm font-medium hover:bg-black transition-colors"
          >
            {dict.header.findYourKit}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--hairline)] mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Newsletter row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-[var(--hairline)]">
          <div className="max-w-md">
            <h3 className="font-semibold text-[var(--foreground)] mb-1">
              {dict.footer.newsletterHeading}
            </h3>
            <p className="text-sm text-[var(--muted)]">
              {dict.footer.newsletterBody}
            </p>
          </div>
          <NewsletterFooterForm />
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-mark.png"
              alt="Lumenari"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span>{dict.footer.copyright.replace("{year}", String(year))}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/kits" className="hover:text-[var(--foreground)]">
              {dict.footer.browseKits}
            </Link>
            <Link href="/blog" className="hover:text-[var(--foreground)]">
              {dict.footer.blog}
            </Link>
            <Link href="/pro" className="hover:text-[var(--foreground)]">
              {dict.footer.pro}
            </Link>
            <Link
              href="/api-platform"
              className="hover:text-[var(--foreground)]"
            >
              {dict.footer.api}
            </Link>
            <Link href="/library" className="hover:text-[var(--foreground)]">
              {dict.footer.library}
            </Link>
            <Link href="/free" className="hover:text-[var(--foreground)]">
              {dict.footer.freeKit}
            </Link>
            <Link href="/terms" className="hover:text-[var(--foreground)]">
              {dict.footer.terms}
            </Link>
            <Link href="/privacy" className="hover:text-[var(--foreground)]">
              {dict.footer.privacy}
            </Link>
            <Link href="/refunds" className="hover:text-[var(--foreground)]">
              {dict.footer.refunds}
            </Link>
            <a
              href="mailto:hello@lumenari.io"
              className="hover:text-[var(--foreground)]"
            >
              hello@lumenari.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
