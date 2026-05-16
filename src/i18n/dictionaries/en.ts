/**
 * English (en) dictionary. The reference for every other locale.
 *
 * Every other locale file must export the same shape — the `Dictionary` type
 * exported from this file is what the rest of the app imports.
 */

export const en = {
  nav: {
    kits: "Kits",
    library: "Library",
    pro: "Pro+",
    findYourKit: "Find your kit",
  },
  hero: {
    eyebrow: "Optimization kits",
    headline_a: "Make your AI",
    headline_b: "work like a",
    headline_highlight: "senior teammate.",
    subhead:
      "Curated kits of prompts, skills, and patterns — drop them in and watch Claude, ChatGPT, or Cursor stop demoing and start shipping.",
    ctaPrimary: "Find your kit",
    ctaSecondary: "Browse the shelf",
  },
  home: {
    launchShelfEyebrow: "The launch shelf",
    launchShelfHeading: "{count} kits. Real deliverables.",
    seeAllKits: "See all kits",
  },
  wizard: {
    step: "Step",
    of: "of",
    startOver: "Start over",
    step1Title: "Which AI are you using?",
    step1Subtitle:
      "Pick the tool you reach for most. We'll match a kit to it.",
    continue: "Continue",
    step2Title: "What are you using it for?",
    step2Subtitle: "A sentence or two is plenty. Plain English.",
    step2Placeholder:
      "e.g. I'm a real estate agent in Calgary writing listings and following up with buyers.",
    back: "Back",
    showMyKit: "Show my kit",
    thinking: "Thinking…",
    step3Title: "Built for what you described.",
    step3Subtitle: "Buy any kit on its own, or pick a bundle below and save.",
    bundle: "Bundle",
    saves: "saves",
  },
  kits: {
    eyebrowShelf: "The shelf",
    catalogTitle: "Pick a kit. Or grab a bundle.",
    catalogSubtitle:
      "Each kit is a single download — a SKILL.md, a universal system prompt, and a stack of supporting files you drop into your AI tool of choice.",
    individualKits: "Individual kits",
    featuredBundles: "Featured bundles",
    moreBundles: "More bundles",
    allKits: "All kits",
    seeBundle: "See bundle",
    seeWhatsInside: "See what's inside",
    oneTime: "One-time",
    whatsInside: "What's inside",
    filesYouReceive: "Files you'll receive",
    eyebrowKit: "Optimization Pack",
    optimizedFor: "Optimized for",
    getThisKit: "Get this kit",
    getThisBundle: "Get this bundle",
    lifetimeAccess:
      "One-time, lifetime access. Download instantly after checkout.",
    pairsWellWith: "Pairs well with",
    recommendedTitle: "Tools we recommend with this kit.",
    recommendedSub:
      "Hand-picked companions to the kit's workflow. Lumenari customers tend to use these alongside the prompts inside.",
    disclosure:
      "Disclosure: we may earn a commission from links in this section. We only recommend tools we use ourselves.",
  },
  library: {
    eyebrow: "Your library",
    welcomeBack: "Welcome back.",
    enterEmail:
      "Enter the email you used at checkout. We'll send you a fresh download link.",
    email: "Email",
    emailPlaceholder: "you@example.com",
    send: "Send my downloads",
    sending: "Sending link…",
    checkInbox: "Check your inbox.",
    checkInboxBody: "If we have a record of {email}, your download links are on the way.",
    everythingUnlocked: "Everything, unlocked.",
    yourKits: "Your kits.",
    proSubtitle:
      "Pro+ members get every current and future kit. Download any of them below.",
    standardSubtitle: "Download what you bought. Links don't expire.",
    download: "Download",
    upgradeNudge: "Want all 20+ kits?",
    upgradeNudgeCta: "Upgrade to Pro+",
    expiredLink:
      "That link has expired or is invalid. Enter your email to get a fresh one.",
    passwordlessNote:
      "No password. The link is signed and good for 24 hours.",
  },
  pro: {
    eyebrow: "Lumenari Pro+",
    headline_a: "Every kit. Every release.",
    headline_highlight: "One subscription.",
    subhead:
      "Pro+ unlocks the entire Lumenari catalog — including every new kit we ship — for the cost of a couple of one-off kits a year.",
    monthly: "Monthly",
    annual: "Annual",
    lifetime: "Lifetime",
    perMonth: "/month",
    perYear: "/year",
    once: "once",
    tryItCancel: "Try it. Cancel any time.",
    payOnce: "Pay once. Yours forever.",
    annualSavings: "Save {amount} vs monthly.",
    whatYouGet: "What you get",
    vsFree: "Pro+ vs. one-off kits",
    faq: "Common questions",
    ctaMonthly: "Start monthly",
    ctaAnnual: "Go annual",
    ctaLifetime: "Get lifetime",
    opening: "Opening Stripe…",
    upgradeButton: "Upgrade to Pro+",
  },
  thanks: {
    eyebrow: "You're in",
    title: "Your kit is on its way.",
    body:
      "We just emailed your receipt and a download link. Open it on the machine you'll be using the kit on.",
    openLibrary: "Open library",
    browseMore: "Browse more kits",
  },
  footer: {
    browseKits: "Browse kits",
    library: "Library",
  },
  cart: {
    eyebrow: "Single-step checkout",
    title: "We skip the cart on purpose.",
    body:
      "Pick a kit, hit checkout, you're in the library in under a minute. Want more than one kit? Grab a bundle.",
    browseKits: "Browse kits",
    seeBundle: "See the bundle",
  },
} as const;

/**
 * Shape of every locale dictionary.
 *
 * We widen the literal string types from `typeof en` (which are pinned by
 * `as const`) into plain `string` so translated dictionaries — whose values
 * differ from English — still satisfy the type.
 */
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? { [K in keyof T]: WidenStrings<T[K]> }
    : T extends object
      ? { -readonly [K in keyof T]: WidenStrings<T[K]> }
      : T;

export type Dictionary = WidenStrings<typeof en>;
