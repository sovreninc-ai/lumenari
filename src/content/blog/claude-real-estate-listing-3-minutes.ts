import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-real-estate-listing-3-minutes",
  title: "How to write a real estate listing with Claude in 3 minutes",
  description:
    "A working agent's guide to writing MLS-ready listings with Claude. Templates, prompts, and the workflow that turns 25 minutes into 3.",
  author: "Chris Holwell",
  publishedAt: "2026-04-22",
  tags: ["real estate", "claude", "listings", "ai workflow"],
  primaryKitSlug: "real-estate-pro",
  intro: [
    "Most real estate agents spend 20-30 minutes per listing on copy. Multiply that across a portfolio and it's a real number — five or six hours a week that nobody pays for.",
    "Claude can do the same listing in three minutes, and the output is better, not worse. The trick isn't a longer prompt. It's a kit that already knows the structure — property type, hook, neighborhood, finishing line — so you stop describing what a listing is and start filling in the facts.",
    "Below is the exact workflow I use, the prompt structure that survives every property type, and a template you can copy today.",
  ],
  body: [
    {
      heading: "The 3-minute structure",
      paragraphs: [
        "Every effective listing has the same five parts: a hook that hits the buyer's strongest emotion in 12 words, a 40-word headline paragraph that frames the property, a 60-80 word features paragraph, a neighborhood paragraph that does the schools-transit-walkability triangle, and a finishing line that creates urgency without slipping into salesman territory.",
        "Generic AI prompts ignore this. They give you a blob of marketing-speak that's hard to edit. A structured kit holds the shape — you give Claude the property details once, it returns all five parts filled in, and you spend the saved time on what actually moves listings: the photos and the price.",
      ],
    },
    {
      heading: "The prompt that works on every property type",
      paragraphs: [
        "Here's the bare-bones version. The Lumenari Real Estate Pro kit ships a more refined version with property-type variants (single-family, condo, luxury, fixer, multi-family), but this is enough to feel the workflow:",
        "You are a top-producing real estate copywriter. Write an MLS listing for this property. Include: (1) a 12-word emotional hook, (2) a 40-word headline paragraph framing the property, (3) a 60-80 word features paragraph, (4) a neighborhood paragraph covering schools, transit, walkability, and one nearby amenity, (5) a closing line that creates urgency without being pushy. Property facts: [paste your details].",
        "Drop in your property facts — bedrooms, baths, square footage, year built, lot, finished basement, fireplace, neighborhood name — and Claude returns the full listing in about 8 seconds. Two minutes of editing for voice, one minute to format for the MLS, and you're done.",
      ],
    },
    {
      heading: "Where it breaks (and how to fix it)",
      paragraphs: [
        "The breakage points are predictable. Claude will sometimes use the word 'nestled' (every listing uses 'nestled') — just tell it not to. It'll occasionally over-claim on schools — add 'Don't make claims about specific school rankings unless I provide them'. And it'll skip the urgency line if your facts are anodyne — feed it one detail that's actually unique to the property (the south-facing kitchen, the original 1958 stove the seller is leaving, the redone hardwood).",
        "The Lumenari kit handles all three of these automatically — 'nestled' is on the kit's banned-word list, the school claims are constrained to facts the agent provides, and the urgency line draws on a 'one unique detail' field in the template.",
      ],
    },
  ],
  outro: [
    "If you're writing more than two listings a week, the Real Estate Pro kit pays for itself in the first day. It's $14 USD, one-time. Lifetime access, four formats (Claude / ChatGPT / Custom GPT / per-platform quick start), and updates as we sharpen the prompts against real agent feedback.",
  ],
};
