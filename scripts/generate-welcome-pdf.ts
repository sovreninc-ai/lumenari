/**
 * Welcome PDF generator.
 *
 *   npx tsx scripts/generate-welcome-pdf.ts
 *
 * Writes `public/lumenari-welcome.pdf`. This file ships with every kit
 * purchase as the first entry in the zip — a branded onboarding doc that
 * explains how to install and use the SKILL files in any AI.
 *
 * The PDF is kit-agnostic; regenerate only when the install instructions
 * or the brand voice change. Commit the output PDF alongside the script.
 */

import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import PDFDocument from "pdfkit";

// ---------------------------------------------------------------------------
// Brand tokens (mirrors src/app/globals.css)
// ---------------------------------------------------------------------------
const COLORS = {
  ink: "#111418",
  muted: "#6b7280",
  hairline: "#ececec",
  surface: "#fafafa",
  sun: "#f4c03b",
  gold: "#e8a93a",
  amber: "#ee8a3b",
  coral: "#e16a4f",
  rose: "#c6536a",
  plum: "#8a4f8b",
  indigo: "#3c4f9c",
  deep: "#1f3a6d",
} as const;

// US Letter portrait at 72dpi → 612 x 792 pt
const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 72; // 1 inch — used for left/right + content top
const BOTTOM_MARGIN = 40; // smaller so the footer band fits without overflow
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const REPO_ROOT = path.resolve(__dirname, "..");
const LOGO_PATH = path.join(REPO_ROOT, "public", "logo-mark.png");
const OUTPUT_PATH = path.join(REPO_ROOT, "public", "lumenari-welcome.pdf");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type Doc = InstanceType<typeof PDFDocument>;

/** Horizontal spectrum bar — visual brand anchor. */
function spectrumBar(doc: Doc, x: number, y: number, w: number, h: number) {
  // PDFKit linear gradient: build a 7-stop sweep that matches globals.css.
  const grad = doc.linearGradient(x, y, x + w, y);
  grad.stop(0, COLORS.sun);
  grad.stop(0.22, COLORS.amber);
  grad.stop(0.42, COLORS.coral);
  grad.stop(0.6, COLORS.rose);
  grad.stop(0.75, COLORS.plum);
  grad.stop(0.88, COLORS.indigo);
  grad.stop(1, COLORS.deep);
  doc.save();
  doc.rect(x, y, w, h).fill(grad);
  doc.restore();
}

/** Footer logomark + brand line, drawn on every page after the cover. */
function drawFooter(doc: Doc, pageNumber: number) {
  // Temporarily zero the bottom margin so footer text doesn't auto-paginate.
  const originalBottom = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;

  const footerY = PAGE_HEIGHT - 36;
  doc.save();
  // Hairline above footer
  doc
    .strokeColor(COLORS.hairline)
    .lineWidth(0.5)
    .moveTo(MARGIN, footerY - 14)
    .lineTo(PAGE_WIDTH - MARGIN, footerY - 14)
    .stroke();

  // Small logomark left
  try {
    doc.image(LOGO_PATH, MARGIN, footerY - 6, { width: 14, height: 14 });
  } catch {
    /* logo optional in footer */
  }

  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(8.5)
    .text("Lumenari · lumenari.io", MARGIN + 22, footerY - 4, {
      lineBreak: false,
    });

  doc
    .fillColor(COLORS.muted)
    .fontSize(8.5)
    .text(String(pageNumber), MARGIN, footerY - 4, {
      width: CONTENT_WIDTH,
      align: "right",
      lineBreak: false,
    });
  doc.restore();
  doc.page.margins.bottom = originalBottom;
}

/** Section header — eyebrow + display title with a spectrum underline. */
function sectionHeader(doc: Doc, eyebrow: string, title: string) {
  doc.moveDown(0.3);
  doc
    .fillColor(COLORS.amber)
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(eyebrow.toUpperCase(), { characterSpacing: 2 });

  doc.moveDown(0.4);
  doc
    .fillColor(COLORS.ink)
    .font("Helvetica-Bold")
    .fontSize(22)
    .text(title, { lineGap: 2 });

  const y = doc.y + 6;
  spectrumBar(doc, MARGIN, y, 64, 3);
  doc.y = y + 18;
}

function bodyText(doc: Doc, text: string, opts: { gap?: number } = {}) {
  doc
    .fillColor(COLORS.ink)
    .font("Helvetica")
    .fontSize(11)
    .text(text, {
      width: CONTENT_WIDTH,
      align: "left",
      lineGap: opts.gap ?? 4,
    });
}

/** Heading inside a section (h3-ish). */
function subHeading(doc: Doc, text: string) {
  doc.moveDown(0.6);
  doc
    .fillColor(COLORS.deep)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text(text, { width: CONTENT_WIDTH });
  doc.moveDown(0.2);
}

/** Bulleted list with a coloured dot. */
function bullets(doc: Doc, items: string[], color: string = COLORS.amber) {
  for (const item of items) {
    const startY = doc.y;
    // Dot
    doc.save();
    doc
      .circle(MARGIN + 4, startY + 7, 2.6)
      .fill(color);
    doc.restore();

    // Text indented
    doc
      .fillColor(COLORS.ink)
      .font("Helvetica")
      .fontSize(11)
      .text(item, MARGIN + 18, startY, {
        width: CONTENT_WIDTH - 18,
        align: "left",
        lineGap: 3,
      });
    doc.moveDown(0.25);
  }
}

/** Numbered step block (starts at 1). */
function steps(doc: Doc, items: string[]) {
  stepsFrom(doc, 1, items);
}

/** Numbered step block with a custom starting number. */
function stepsFrom(doc: Doc, startNumber: number, items: string[]) {
  items.forEach((step, i) => {
    const startY = doc.y;
    doc.save();
    // Number circle
    doc
      .circle(MARGIN + 8, startY + 8, 10)
      .fillColor(COLORS.deep)
      .fill();
    doc
      .fillColor("#ffffff")
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(String(startNumber + i), MARGIN + 3, startY + 4, {
        width: 12,
        align: "center",
        lineBreak: false,
      });
    doc.restore();

    doc
      .fillColor(COLORS.ink)
      .font("Helvetica")
      .fontSize(11)
      .text(step, MARGIN + 28, startY + 1, {
        width: CONTENT_WIDTH - 28,
        align: "left",
        lineGap: 3,
      });
    doc.moveDown(0.5);
  });
}

/** Subtle “code” chip for filenames inline-ish — used as block. */
function codeBlock(doc: Doc, text: string) {
  doc.moveDown(0.3);
  const startY = doc.y;
  const padding = 10;
  // Measure
  doc.font("Courier").fontSize(10);
  const height = doc.heightOfString(text, {
    width: CONTENT_WIDTH - padding * 2,
  });
  doc.save();
  doc
    .roundedRect(MARGIN, startY, CONTENT_WIDTH, height + padding * 2, 8)
    .fillColor(COLORS.surface)
    .fill();
  doc
    .roundedRect(MARGIN, startY, CONTENT_WIDTH, height + padding * 2, 8)
    .strokeColor(COLORS.hairline)
    .lineWidth(0.5)
    .stroke();
  doc.restore();

  doc
    .fillColor(COLORS.deep)
    .font("Courier")
    .fontSize(10)
    .text(text, MARGIN + padding, startY + padding, {
      width: CONTENT_WIDTH - padding * 2,
    });
  doc.moveDown(0.6);
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

function pageCover(doc: Doc) {
  // Full-bleed gradient strip at top
  spectrumBar(doc, 0, 0, PAGE_WIDTH, 8);

  // Logomark, large, centered
  const logoSize = 96;
  const logoX = (PAGE_WIDTH - logoSize) / 2;
  const logoY = PAGE_HEIGHT * 0.22;
  try {
    doc.image(LOGO_PATH, logoX, logoY, { width: logoSize, height: logoSize });
  } catch {
    /* graceful fallback — solid circle */
    doc.save();
    doc
      .circle(PAGE_WIDTH / 2, logoY + logoSize / 2, logoSize / 2)
      .fillColor(COLORS.sun)
      .fill();
    doc.restore();
  }

  // Eyebrow
  doc
    .fillColor(COLORS.amber)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("LUMENARI", MARGIN, logoY + logoSize + 28, {
      width: CONTENT_WIDTH,
      align: "center",
      characterSpacing: 4,
    });

  // Headline
  doc.moveDown(0.5);
  doc
    .fillColor(COLORS.ink)
    .font("Helvetica-Bold")
    .fontSize(34)
    .text("Welcome to your\nLumenari kit", {
      width: CONTENT_WIDTH,
      align: "center",
      lineGap: 6,
    });

  // Subtitle
  doc.moveDown(0.8);
  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(13)
    .text(
      "Everything you need to make your AI work like a senior teammate.",
      MARGIN,
      doc.y,
      {
        width: CONTENT_WIDTH,
        align: "center",
        lineGap: 4,
      },
    );

  // Spectrum accent bar low on the page
  spectrumBar(doc, PAGE_WIDTH / 2 - 60, PAGE_HEIGHT * 0.75, 120, 4);

  // Cover footer — temporarily zero bottom margin so we can sit low on the
  // page without triggering pdfkit's auto-pagination.
  const _bottom = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;
  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(9)
    .text("Made by Sovren Inc.   ·   lumenari.io", MARGIN, PAGE_HEIGHT - 60, {
      width: CONTENT_WIDTH,
      align: "center",
      characterSpacing: 1,
      lineBreak: false,
    });
  doc.page.margins.bottom = _bottom;
}

function pageWhatsInside(doc: Doc) {
  sectionHeader(doc, "What's in your zip", "The five files you'll use");

  bodyText(
    doc,
    "Every Lumenari kit ships with the same five-file structure. " +
      "Different AIs read different formats — these cover all of them.",
  );

  const files: Array<{ name: string; what: string; when: string }> = [
    {
      name: "SKILL.md",
      what: "The Claude Code / Cowork SKILL standard format.",
      when: "Use this in Claude Code, Claude.ai with skill packs, or any tool that supports the SKILL format.",
    },
    {
      name: "optimization-pack.md",
      what: "A paste-able system prompt that works in any chat AI.",
      when: "Use this in Claude.ai, ChatGPT, Gemini, Perplexity, Grok — anywhere you can set custom instructions.",
    },
    {
      name: "custom-gpt-instructions.md",
      what: "Pre-formatted Instructions field for ChatGPT's Create-a-GPT.",
      when: "Use this if you want a dedicated ChatGPT for this domain, sharable to your team.",
    },
    {
      name: "memory.md",
      what: "Domain context — vocabulary, workflows, tone, common pitfalls.",
      when: "Pair with any of the above for an AI that already knows your industry.",
    },
    {
      name: "quick-start.md",
      what: "The 3-step path to first value.",
      when: "Read this first if you want to be productive in five minutes.",
    },
  ];

  for (const f of files) {
    doc.moveDown(0.5);
    // Filename in mono color
    doc
      .fillColor(COLORS.deep)
      .font("Courier-Bold")
      .fontSize(11.5)
      .text(f.name, MARGIN, doc.y, { width: CONTENT_WIDTH });

    doc.moveDown(0.15);
    doc
      .fillColor(COLORS.ink)
      .font("Helvetica")
      .fontSize(10.5)
      .text(f.what, MARGIN, doc.y, { width: CONTENT_WIDTH, lineGap: 2 });

    doc.moveDown(0.1);
    doc
      .fillColor(COLORS.muted)
      .font("Helvetica-Oblique")
      .fontSize(10)
      .text(f.when, MARGIN, doc.y, { width: CONTENT_WIDTH, lineGap: 2 });
  }
}

function pageInstallClaudeCode(doc: Doc) {
  sectionHeader(
    doc,
    "Install · Claude Code & Cowork",
    "Drop in. Restart. Done.",
  );

  bodyText(
    doc,
    "Claude Code and Cowork auto-discover skills in your skills folder. " +
      "No commands to register, no config to edit.",
  );
  doc.moveDown(0.3);

  steps(doc, [
    "Create the kit folder under your Claude skills directory.",
  ]);
  codeBlock(doc, "mkdir -p ~/.claude/skills/<kit-name>");

  // Continue numbering from 2 with a custom helper.
  stepsFrom(doc, 2, [
    "Move SKILL.md (and any reference files in the kit) into that folder.",
    "Restart Claude Code (or reload Cowork). The skill is now live.",
    "Just describe what you want — e.g. 'help me ship this feature.' Claude picks the skill automatically when your request matches.",
  ]);

  subHeading(doc, "Verify it loaded");
  bodyText(
    doc,
    "Open a fresh Claude Code session and run /skills. Your new kit should appear in the list. " +
      "If not, check that SKILL.md is directly inside ~/.claude/skills/<kit-name>/ (not nested deeper).",
  );
}

function pageInstallChatGPT(doc: Doc) {
  sectionHeader(
    doc,
    "Install · ChatGPT (Custom GPT)",
    "Build a private GPT for your team",
  );

  bodyText(
    doc,
    "Custom GPTs let you bake the kit's voice and behavior into a permanent assistant — " +
      "linkable, shareable, no setup for the people you give it to.",
  );

  steps(doc, [
    "Open custom-gpt-instructions.md from the zip and copy the entire contents.",
    "In ChatGPT, click Explore GPTs > Create (top-right). Use the Configure tab.",
    "Paste the contents into the Instructions field. Add a name, description, and (optionally) a profile image.",
    "Save the GPT — keep it private, or share it inside your team.",
  ]);

  subHeading(doc, "Quick tip");
  bodyText(
    doc,
    "If you have ChatGPT Team or Enterprise, share the GPT with a workspace " +
      "instead of publishing it publicly — your kit-derived instructions stay private to your org.",
  );
}

function pageInstallAnyAI(doc: Doc) {
  sectionHeader(
    doc,
    "Install · Claude, Gemini, any chat AI",
    "One paste, instant uplift",
  );

  bodyText(
    doc,
    "The optimization-pack.md is the universal route. Any AI that accepts " +
      "custom instructions, system prompts, or personas will read it.",
  );

  steps(doc, [
    "Open optimization-pack.md and copy everything.",
    "Paste it into the system prompt / custom instructions / persona field of your AI.",
    "Start chatting — the AI now thinks like the kit's persona without any further setup.",
  ]);

  subHeading(doc, "Where to paste it");
  bullets(doc, [
    "Claude.ai  >  Settings  >  Profile  >  Personal preferences",
    "ChatGPT  >  Settings  >  Personalization  >  Custom instructions",
    "Gemini  >  Saved info (Gemini Advanced)",
    "Cursor / Windsurf  >  .cursorrules or rules-for-AI",
    "Any API call  >  first system message",
  ]);
}

function pageProTips(doc: Doc) {
  sectionHeader(doc, "Pro tips", "Get more out of your kit");

  bullets(
    doc,
    [
      "Pair memory.md with optimization-pack.md for an AI that knows your industry vocabulary on top of the kit's general skill.",
      "Start with quick-start.md — it's the fastest path to first value, and tells you what the kit is really good at.",
      "Layer kits. There's no rule against giving one AI two kits — paste both optimization-packs back-to-back in the system prompt.",
      "When the AI drifts, paste the relevant section of SKILL.md back into the conversation. Mid-session reinforcement works.",
      "If you bought a bundle, the welcome doc applies to every kit in the zip — each kit has its own /kits/<slug>/ folder inside.",
      "Found a workflow worth saving? Drop it into memory.md and re-paste. Your AI gets smarter every time you use it.",
    ],
    COLORS.amber,
  );

  doc.moveDown(0.8);

  // Bottom card — support
  const cardY = doc.y;
  const cardH = 96;
  doc.save();
  doc
    .roundedRect(MARGIN, cardY, CONTENT_WIDTH, cardH, 14)
    .fillColor(COLORS.surface)
    .fill();
  doc
    .roundedRect(MARGIN, cardY, CONTENT_WIDTH, cardH, 14)
    .strokeColor(COLORS.hairline)
    .lineWidth(0.5)
    .stroke();
  doc.restore();

  doc
    .fillColor(COLORS.deep)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text("Need help?", MARGIN + 20, cardY + 16);

  doc
    .fillColor(COLORS.ink)
    .font("Helvetica")
    .fontSize(11)
    .text(
      "We answer every email. Tell us what AI you're using and what you're trying to do — " +
        "we'll get you unstuck.",
      MARGIN + 20,
      cardY + 36,
      { width: CONTENT_WIDTH - 40, lineGap: 2 },
    );

  doc
    .fillColor(COLORS.amber)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("hello@lumenari.io", MARGIN + 20, cardY + 70);
}

// ---------------------------------------------------------------------------
// Build the document
// ---------------------------------------------------------------------------

async function main() {
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });

  const doc = new PDFDocument({
    size: "LETTER",
    margins: {
      top: MARGIN,
      bottom: BOTTOM_MARGIN,
      left: MARGIN,
      right: MARGIN,
    },
    info: {
      Title: "Welcome to your Lumenari kit",
      Author: "Sovren Inc.",
      Subject: "Lumenari kit onboarding",
      Keywords: "lumenari, ai, skill, kit, onboarding",
      Producer: "Lumenari",
      Creator: "Lumenari",
    },
    autoFirstPage: false,
  });

  const stream = createWriteStream(OUTPUT_PATH);
  doc.pipe(stream);

  // Page 1 — cover (no footer)
  doc.addPage();
  pageCover(doc);

  // Subsequent pages — header section + footer
  const contentPages: Array<(d: Doc) => void> = [
    pageWhatsInside,
    pageInstallClaudeCode,
    pageInstallChatGPT,
    pageInstallAnyAI,
    pageProTips,
  ];

  contentPages.forEach((render, idx) => {
    doc.addPage();
    spectrumBar(doc, 0, 0, PAGE_WIDTH, 4);
    render(doc);
    drawFooter(doc, idx + 2); // pages 2..N
  });

  doc.end();

  await new Promise<void>((resolve, reject) => {
    stream.on("finish", () => resolve());
    stream.on("error", reject);
  });

  // eslint-disable-next-line no-console
  console.log(`✓ Wrote ${OUTPUT_PATH}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
