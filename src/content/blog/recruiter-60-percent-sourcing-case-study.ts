import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "recruiter-60-percent-sourcing-case-study",
  title: "How a recruiter cut sourcing time 60% with a Claude skill kit",
  description:
    "An illustrative case study of how a single-desk recruiter used a Claude skill kit to compress 10 hours of weekly sourcing into 4.",
  author: "Chris Holwell",
  publishedAt: "2026-05-12",
  tags: ["recruiting", "case study", "claude", "sourcing"],
  primaryKitSlug: "recruiter-pro",
  intro: [
    "This is an illustrative case study — composite, based on conversations with three working recruiters. It's not a single real person, but the numbers and patterns track with what each of them described.",
    "The setup: solo agency-side recruiter, two open requisitions a week (senior engineering roles), targeting passive candidates on LinkedIn and GitHub.",
  ],
  body: [
    {
      heading: "Before: 10 hours a week on the sourcing surface",
      paragraphs: [
        "The recruiter described the same week, every week: 90 minutes writing the JD, 2 hours building Boolean strings, 4 hours sending personalized outreach, 90 minutes managing replies, 60 minutes prepping for interviews — and most of the outreach was thinly personalized templates that converted at single-digit reply rates.",
        "AI was already in the workflow. ChatGPT for drafts, Claude for the harder writing. The problem wasn't the AI — it was the repetition. Every chat started cold. The good prompts lived in a Notion doc that the recruiter copy-pasted 40 times a week.",
      ],
    },
    {
      heading: "After: 4 hours a week, with better output",
      paragraphs: [
        "The first change was the JD generator. A drop-in kit produced a JD that read like a person wrote it, with anti-bias linting baked in. Time: 90 minutes → 20 minutes.",
        "The second change was the Boolean builder. Hand the kit a role description, get back three Boolean variants for LinkedIn, GitHub, and the ATS. Time: 2 hours → 25 minutes.",
        "The third change was outreach. Same effort as before on the personalization research, but the kit's templates by seniority and role family meant the recruiter wasn't re-deriving the opening line every time. Reply rates went from 6% to 11%. Time: 4 hours → 2.5 hours.",
      ],
    },
    {
      heading: "What made the difference",
      paragraphs: [
        "The biggest unlock wasn't speed — it was consistency. Every JD passed the anti-bias check. Every outreach started from a tested template. Every reply got handled with the same playbook.",
        "The kit also surfaced edge cases the recruiter wouldn't have prompted for unprompted: warm-rejection email templates that kept candidates in the network, reference-check questions calibrated by seniority, and offer-letter component libraries that snapped together.",
      ],
    },
  ],
  outro: [
    "The Recruiter Pro kit is $14 CAD. If it saves a single hour a week — and the working recruiter who described this workflow said it saved her six — it pays for itself in under a day. Lifetime access, four formats, and updates as the kit gets sharpened against real feedback.",
  ],
};
