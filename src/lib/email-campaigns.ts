/**
 * Email campaign content — every welcome series + retention email lives
 * here so the cron loop and the manual-send dashboard read the same copy.
 *
 * Each builder takes the data it needs and returns a {subject, html, text}
 * payload that `sendCampaignEmail()` can pipe straight to Resend.
 *
 * Copy is plain, warm, founder-voice. No emojis, no marketing-speak.
 */

import { env } from "./env";
import { renderEmail } from "./email-automation";
import { formatCAD, getKit } from "@/data/kits";

const FREE_KIT_SLUG = "resume-job-search";

function libraryUrl(): string {
  return `${env.siteUrl}/library`;
}

function kitUrl(slug: string): string {
  return `${env.siteUrl}/kits/${slug}`;
}

function proUrl(): string {
  return `${env.siteUrl}/pro`;
}

function downloadUrl(slug: string, leadId?: string): string {
  const q = leadId ? `?lead=${encodeURIComponent(leadId)}` : "";
  return `${env.siteUrl}/free/download/${slug}${q}`;
}

// =====================================================================
// Welcome series — 7 days
// =====================================================================

export function welcomeDay0({
  email,
  kitSlug,
  leadId,
}: {
  email: string;
  kitSlug: string;
  leadId: string;
}) {
  void email;
  const kit = getKit(kitSlug) ?? getKit(FREE_KIT_SLUG);
  const kitName = kit?.name ?? "your free kit";
  const body = `
    <p>Hi — Chris here. I built Lumenari after watching every smart person around me wrestle the same generic AI outputs into something usable. The kits are the shortcut.</p>
    <p>Your free <strong>${kitName}</strong> is ready below. Drop the SKILL.md into Claude (or paste the optimization pack into ChatGPT) and try the first prompt. You should feel the difference inside two minutes.</p>
    <p>I'll send you a few short notes over the next week — what to do with the kit, who else uses them, and how the SKILL.md format actually works under the hood. Unsubscribe anytime, no hard feelings.</p>
  `;
  return {
    subject: "Your free Lumenari kit",
    html: renderEmail({
      preheader: `Download ${kitName} — and a quick note from me.`,
      heading: "Your free kit is ready.",
      body,
      cta: { label: "Download the kit", url: downloadUrl(kit?.slug ?? FREE_KIT_SLUG, leadId) },
      footnote:
        "If you'd rather not hear from me again, just reply with 'unsubscribe' — I'll handle it personally.",
    }),
    text: `Your free Lumenari kit (${kitName}) is ready.

Download: ${downloadUrl(kit?.slug ?? FREE_KIT_SLUG, leadId)}

Reply to this email if anything looks off.

— Chris
Lumenari · lumenari.io`,
  };
}

export function welcomeDay1() {
  const body = `
    <p>Most AI tools answer like a stranger every time you open a new chat. SKILL.md fixes that.</p>
    <p>It's a plain markdown file Claude (and Cursor, and Gemini, and the ChatGPT-companion format) reads once and adapts to. No coding. No installer. You drop it in the project, the AI gets context, and every response from that point on lands closer to what you actually wanted.</p>
    <p>Try it: open the kit you grabbed yesterday, drag <code>SKILL.md</code> into a Claude project, and ask whatever you normally ask. Watch the answer change shape.</p>
    <p>That's the whole pitch. The other 99 kits are the same shape — just sharper for specific jobs.</p>
  `;
  return {
    subject: "Why a plain text file makes Claude smarter",
    html: renderEmail({
      preheader: "The SKILL.md format in 90 seconds.",
      heading: "The thing that makes the kit work.",
      body,
      cta: { label: "See the full kit catalog", url: `${env.siteUrl}/kits` },
    }),
    text: `Most AI tools answer like a stranger every time. SKILL.md fixes that.

It's a plain markdown file Claude reads once and adapts to. No coding. No installer. Drag it into a Claude project; every response gets sharper.

Try it on the kit you grabbed yesterday — watch the change.

Full catalog: ${env.siteUrl}/kits

— Chris`,
  };
}

export function welcomeDay3() {
  const body = `
    <p>Five things to actually do with the kit you grabbed:</p>
    <ol style="margin:0 0 0 18px;padding:0;line-height:1.8;">
      <li><strong>Hand it to one chat.</strong> Open Claude, drag the SKILL.md in, paste the first prompt from the quick-start. See what changes.</li>
      <li><strong>Steal the structure.</strong> The kit's prompts follow a pattern. Read one, adapt it for a different niche of your work.</li>
      <li><strong>Paste the optimization pack into ChatGPT.</strong> Same kit, different AI. No re-buying.</li>
      <li><strong>Build a Custom GPT.</strong> The Custom GPT instructions file is already formatted for the "Create a GPT" panel.</li>
      <li><strong>Read the memory.md.</strong> That's the workflow + tone context. Useful even if you only use a chat AI.</li>
    </ol>
    <p>If anything in the kit doesn't make sense, reply to this email — I read every one.</p>
  `;
  return {
    subject: "5 things to do with your free kit",
    html: renderEmail({
      preheader: "Open it, hand it to Claude, steal the pattern.",
      heading: "5 things to do with the kit.",
      body,
      cta: { label: "Open your library", url: libraryUrl() },
    }),
    text: `5 things to do with the kit you grabbed:

1. Drag SKILL.md into a Claude project. Run the first quick-start prompt.
2. Steal the prompt structure for a related niche.
3. Paste the optimization pack into ChatGPT.
4. Build a Custom GPT from the included instructions file.
5. Read memory.md for tone + workflow context.

Library: ${libraryUrl()}

— Chris`,
  };
}

export function welcomeDay5() {
  const body = `
    <p><em>This is a representative example based on common feedback — names and details are illustrative, not a verified case study.</em></p>
    <p>A recruiter I talked with last quarter was spending 40+ hours a week sourcing. Half of that was the same three tasks: turning a hiring manager's brief into a JD, writing the first reach-out, and handling the "not now, try me in 6 months" responses.</p>
    <p>She grabbed the Recruiter Outreach + JD Writer kit, dropped the SKILL.md into Claude, and rebuilt her workflow around the included templates. Two weeks later her sourcing block was down to about 16 hours. Same output, less typing.</p>
    <p>The pattern repeats across roles. People who buy one kit and actually use it cut their AI-back-and-forth time by 40-60% on the work the kit covers. The cost was $14 once.</p>
  `;
  return {
    subject: "A small case study (illustrative)",
    html: renderEmail({
      preheader: "What actually changes when you use the kit.",
      heading: "What a kit looks like in practice.",
      body,
      cta: { label: "Browse the catalog", url: `${env.siteUrl}/kits` },
      footnote:
        "The story above is representative, not a verified case study — we're collecting real ones to publish with permission.",
    }),
    text: `Representative example, not a verified case study:

A recruiter spent 40 hours/week sourcing. Half was three tasks: brief→JD, first outreach, "not now" handling.

She used the Recruiter kit, dropped SKILL.md into Claude, rebuilt the workflow around the templates. Two weeks later she was at ~16 hours.

Catalog: ${env.siteUrl}/kits

— Chris`,
  };
}

export function welcomeDay7() {
  const body = `
    <p>You've had a week with one free kit. If it landed, here's the upgrade math.</p>
    <p>Pro+ is <strong>$19 CAD a month</strong> and unlocks every current kit (100+) and every future one. If you'd reach for two more kits this year — say one for sales outreach and one for SEO content — you've already paid for the year.</p>
    <p>Annual is $149 CAD (saves $79 vs paying monthly). Lifetime is $399 CAD if you'd rather never see the renewal again.</p>
    <p>No pressure. If the free kit was enough, the free kit was enough.</p>
  `;
  return {
    subject: "Pro+ math — should you?",
    html: renderEmail({
      preheader: "Every kit, current and future, for $19/mo.",
      heading: "The Pro+ pitch — short version.",
      body,
      cta: { label: "See Pro+", url: proUrl() },
    }),
    text: `Pro+ is $19 CAD/mo and unlocks every current + future kit (100+).

Two more kits this year = it's paid for itself.

Annual: $149 (saves $79). Lifetime: $399.

${proUrl()}

— Chris`,
  };
}

// =====================================================================
// Pro+ retention + upgrade campaigns
// =====================================================================

export function proInactive14Days({
  recommendedSlugs,
}: {
  recommendedSlugs: string[];
}) {
  const items = recommendedSlugs
    .map((s) => getKit(s))
    .filter((k): k is NonNullable<ReturnType<typeof getKit>> => Boolean(k))
    .slice(0, 3);

  const list = items
    .map(
      (k) =>
        `<li style="margin:0 0 8px;"><a href="${kitUrl(k.slug)}" style="color:#111418;font-weight:500;">${k.name}</a><br/><span style="color:#6b7280;font-size:13px;">${k.tagline}</span></li>`,
    )
    .join("");

  const body = `
    <p>You haven't grabbed a kit from your Pro+ library in a couple of weeks. No problem — but here are three that match the shape of what you've already downloaded:</p>
    <ul style="margin:18px 0 0;padding:0 0 0 18px;">${list}</ul>
  `;
  return {
    subject: "Three kits we think you'd use",
    html: renderEmail({
      preheader: "Quick picks from your Pro+ library.",
      heading: "Three picks for you.",
      body,
      cta: { label: "Open your library", url: libraryUrl() },
    }),
    text: `Three Pro+ kits you might use:

${items.map((k) => `- ${k.name} — ${kitUrl(k.slug)}`).join("\n")}

Library: ${libraryUrl()}

— Chris`,
  };
}

export function proMonthlyDigest({
  newKits,
  topKits,
  monthLabel,
}: {
  newKits: { slug: string; name: string }[];
  topKits: { slug: string; name: string }[];
  monthLabel: string;
}) {
  const newList = newKits.length
    ? `<p style="margin:0 0 6px;"><strong>New this month:</strong></p>
       <ul style="margin:0 0 16px;padding:0 0 0 18px;">${newKits.map((k) => `<li><a href="${kitUrl(k.slug)}" style="color:#111418;">${k.name}</a></li>`).join("")}</ul>`
    : "";
  const topList = topKits.length
    ? `<p style="margin:0 0 6px;"><strong>Most-downloaded by Pro+ members:</strong></p>
       <ul style="margin:0 0 16px;padding:0 0 0 18px;">${topKits.map((k) => `<li><a href="${kitUrl(k.slug)}" style="color:#111418;">${k.name}</a></li>`).join("")}</ul>`
    : "";

  const body = `
    <p>Here's what shipped in ${monthLabel}, and what your fellow Pro+ members are reaching for.</p>
    ${newList}
    ${topList}
    <p>Reply if there's a kit you wish existed — the Pro+ list shapes what gets built next.</p>
  `;
  return {
    subject: `Lumenari · ${monthLabel} digest`,
    html: renderEmail({
      preheader: "Fresh kits + this month's top downloads.",
      heading: `${monthLabel} digest`,
      body,
      cta: { label: "Open your library", url: libraryUrl() },
    }),
    text: `Lumenari · ${monthLabel}

New: ${newKits.map((k) => k.name).join(", ") || "(no new kits this month)"}
Top: ${topKits.map((k) => k.name).join(", ") || "(coming next month)"}

Library: ${libraryUrl()}

— Chris`,
  };
}

export function proCancellationSave({ couponCode }: { couponCode: string }) {
  const body = `
    <p>Saw the cancellation come through. No drama — but if it was the price, I'd like one more shot.</p>
    <p><strong>50% off the next month</strong> with this code:</p>
    <p style="margin:18px 0;font-size:22px;font-weight:600;letter-spacing:0.04em;background:#f4f4f5;padding:14px 18px;border-radius:12px;text-align:center;">${couponCode}</p>
    <p>Apply it at <a href="${proUrl()}">${proUrl()}</a> within the next 7 days. Works once.</p>
    <p>If it wasn't the price — reply and tell me what was missing. I read every one.</p>
  `;
  return {
    subject: "One more shot — 50% off Pro+",
    html: renderEmail({
      preheader: "If price was the reason, this code is yours.",
      heading: "If you'd stick around for half off…",
      body,
      cta: { label: "Apply the code", url: proUrl() },
      footnote: "Code expires in 7 days. One-time use.",
    }),
    text: `Saw the cancellation. If price was the reason, here's 50% off the next month: ${couponCode}

Apply at ${proUrl()} within 7 days.

— Chris`,
  };
}

export function proAnnualUpgradeNudge({ annualSaveCents }: { annualSaveCents: number }) {
  const body = `
    <p>You've been on Pro+ monthly for five months — thanks for sticking around.</p>
    <p>If you'd rather not see the renewal email every month, the annual plan saves you <strong>${formatCAD(annualSaveCents)}</strong> a year. Same access, one charge, done.</p>
    <p>Click below and switch — Stripe handles the proration so you only pay the difference.</p>
  `;
  return {
    subject: `Save ${formatCAD(annualSaveCents)} — switch to annual?`,
    html: renderEmail({
      preheader: "Same access. One charge. Saves $79.",
      heading: "Switch to annual?",
      body,
      cta: { label: "Switch to annual", url: proUrl() },
    }),
    text: `Annual Pro+ saves you ${formatCAD(annualSaveCents)}/year vs monthly. Same access, one charge.

${proUrl()}

— Chris`,
  };
}

export function proOneTimeBuyerUpsell({
  ownedKits,
}: {
  ownedKits: { slug: string; name: string }[];
}) {
  const list = ownedKits
    .slice(0, 4)
    .map((k) => `<li>${k.name}</li>`)
    .join("");
  const body = `
    <p>You've grabbed a couple of kits — thanks. Here's the upgrade math:</p>
    <ul style="margin:0 0 16px;padding:0 0 0 18px;color:#475569;">${list}</ul>
    <p><strong>Pro+ is $19 CAD a month and unlocks every kit (100+) plus future ones.</strong> If you'd reach for two or three more kits in the next year, Pro+ is the cheaper path.</p>
    <p>No pressure — but the math is there.</p>
  `;
  return {
    subject: "You'd save money on Pro+",
    html: renderEmail({
      preheader: "Every kit for less than two more à la carte buys.",
      heading: "Pro+ math, for you specifically.",
      body,
      cta: { label: "See Pro+", url: proUrl() },
    }),
    text: `You've grabbed multiple kits. Pro+ is $19/mo and unlocks all 100+. If you'd buy 2-3 more this year, Pro+ wins.

${proUrl()}

— Chris`,
  };
}

// =====================================================================
// Wishlist alerts
// =====================================================================

export function wishlistPriceDrop({
  kitSlug,
  oldCents,
  newCents,
}: {
  kitSlug: string;
  oldCents: number;
  newCents: number;
}) {
  const kit = getKit(kitSlug);
  const name = kit?.name ?? "A kit you saved";
  const body = `
    <p>The kit you saved — <strong>${name}</strong> — just dropped in price.</p>
    <p>Was ${formatCAD(oldCents)}, now ${formatCAD(newCents)}.</p>
  `;
  return {
    subject: `${name} just dropped to ${formatCAD(newCents)}`,
    html: renderEmail({
      preheader: `Saved kit price drop — was ${formatCAD(oldCents)}.`,
      heading: "Your saved kit just dropped in price.",
      body,
      cta: { label: "See the kit", url: kitUrl(kitSlug) },
    }),
    text: `${name} dropped from ${formatCAD(oldCents)} to ${formatCAD(newCents)}.

${kitUrl(kitSlug)}

— Chris`,
  };
}

export function wishlistNewBundle({
  kitSlug,
  bundleSlug,
  bundleName,
}: {
  kitSlug: string;
  bundleSlug: string;
  bundleName: string;
}) {
  const kit = getKit(kitSlug);
  const name = kit?.name ?? "A kit you saved";
  const body = `
    <p>The kit you saved — <strong>${name}</strong> — was just added to the <strong>${bundleName}</strong> bundle. If you'd buy two or three kits in the same area, the bundle wins on price.</p>
  `;
  return {
    subject: `${name} is now in a bundle`,
    html: renderEmail({
      preheader: `Saved kit added to ${bundleName}.`,
      heading: "Your saved kit is now in a bundle.",
      body,
      cta: { label: "See the bundle", url: kitUrl(bundleSlug) },
    }),
    text: `${name} was added to ${bundleName}.

${kitUrl(bundleSlug)}

— Chris`,
  };
}
