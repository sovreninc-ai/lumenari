import Image from "next/image";
import Link from "next/link";
import { OnboardingFunnel } from "@/components/onboarding-funnel";
import { KITS } from "@/data/kits";
import { KitCard } from "@/components/KitCard";

export default function Home() {
  return (
    <>
      <Hero />
      <OnboardingFunnel />
      <FeaturedCatalog />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, var(--sun) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 pt-16 sm:pt-24 pb-12 text-center">
        <div className="inline-flex">
          <Image
            src="/logo.png"
            alt="Lumenari"
            width={160}
            height={160}
            priority
            className="rounded-full"
          />
        </div>
        <h1 className="display text-5xl sm:text-6xl md:text-7xl mt-8 mb-6">
          Make your AI <br className="hidden sm:inline" />
          work like a <span className="text-spectrum">senior teammate.</span>
        </h1>
        <p className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          Curated kits of prompts, skills, and patterns — drop them in and
          watch Claude, ChatGPT, or Cursor stop demoing and start shipping.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link href="#wizard" className="btn-primary">
            Find your kit
          </Link>
          <Link href="/kits" className="btn-ghost">
            Browse the shelf
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCatalog() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--hairline)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="eyebrow">The launch shelf</span>
          <h2 className="display text-3xl sm:text-4xl mt-2">
            Six kits. Real deliverables.
          </h2>
        </div>
        <Link
          href="/kits"
          className="text-sm font-medium hover:text-[var(--accent-strong)]"
        >
          See all kits →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {KITS.map((kit, i) => (
          <KitCard kit={kit} key={kit.slug} index={i} />
        ))}
      </div>
    </section>
  );
}
