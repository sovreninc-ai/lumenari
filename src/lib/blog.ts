/**
 * Blog post loader.
 *
 * Posts are checked-in TS modules under `src/content/blog/`. Each exports
 * a `post: BlogPost` object with frontmatter + body sections.
 *
 * Why not MDX? Lumenari ships on Next 16 with a strict CSP-clean policy.
 * MDX-runtime adds a build-time toolchain and a small runtime cost we
 * don't need for 5 launch posts. We can swap to @next/mdx later without
 * changing the route shape — `getBlogPost(slug).body` is the only API the
 * detail page reads.
 */

export interface BlogPostSection {
  heading: string;
  /** Plain-text paragraphs. Each paragraph is one entry. */
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string; // ISO date
  tags: string[];
  primaryKitSlug: string;
  /** Intro paragraphs before the first H2. */
  intro: string[];
  body: BlogPostSection[];
  /** Closing CTA paragraph. */
  outro: string[];
}

import { post as post1 } from "@/content/blog/claude-real-estate-listing-3-minutes";
import { post as post2 } from "@/content/blog/claude-vs-chatgpt-sales-outreach-2026";
import { post as post3 } from "@/content/blog/skill-md-format-explained";
import { post as post4 } from "@/content/blog/10-prompts-freelance-consultants";
import { post as post5 } from "@/content/blog/recruiter-60-percent-sourcing-case-study";
import { post as post6 } from "@/content/blog/best-ai-tools-for-real-estate-agents-2026";
import { post as post7 } from "@/content/blog/claude-vs-chatgpt-cold-outreach-2026";
import { post as post8 } from "@/content/blog/how-to-use-claude-code-skills-complete-guide";
import { post as post9 } from "@/content/blog/how-recruiters-cut-sourcing-time-with-ai-skill-kits";
import { post as post10 } from "@/content/blog/the-skill-md-format-deep-dive-for-builders";

const ALL_POSTS: BlogPost[] = [
  post1,
  post2,
  post3,
  post4,
  post5,
  post6,
  post7,
  post8,
  post9,
  post10,
];

export function listBlogPosts(): BlogPost[] {
  return [...ALL_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export function allBlogSlugs(): string[] {
  return ALL_POSTS.map((p) => p.slug);
}
