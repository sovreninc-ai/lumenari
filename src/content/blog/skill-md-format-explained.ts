import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "skill-md-format-explained",
  title: "The SKILL.md format explained for non-developers",
  description:
    "What SKILL.md is, why Claude reads it, and how a non-developer can use one without touching the terminal. A plain-English guide.",
  author: "Chris Holwell",
  publishedAt: "2026-05-06",
  tags: ["skill.md", "claude", "explainer", "beginners"],
  primaryKitSlug: "apple-style-ux",
  intro: [
    "SKILL.md is what Anthropic introduced when they decided Claude needed a way to learn a specialized job — like a new employee picking up the company playbook on day one. The format is just a plain text file with a few headings. No coding required to use it. No installer.",
    "If you've ever wished Claude knew your specific workflow without you re-explaining it every chat, SKILL.md is the answer.",
  ],
  body: [
    {
      heading: "What's actually inside a SKILL.md file",
      paragraphs: [
        "A SKILL.md is a markdown document with three or four sections: a description of what the skill does, when to use it, the inputs it expects, and the outputs it produces. That's it. No JavaScript, no Python, no API config.",
        "The magic is that Claude (and Cursor, and any tool that supports the SKILL standard) reads the file at the start of a session and adapts its behavior. It's the equivalent of handing a new hire a one-page job aid before they answer the first email.",
      ],
    },
    {
      heading: "How to use one if you've never touched code",
      paragraphs: [
        "If you're in Claude.ai's web interface: open a new project, drag the SKILL.md file into the project's knowledge area, and you're done. Claude reads it for every chat in that project.",
        "If you're in Cursor or Claude Code: drop the file in your project root. The tool finds it automatically.",
        "If you only use ChatGPT: the SKILL.md content also ships in Custom GPT format — paste it into 'Create a GPT' and it works the same way.",
      ],
    },
    {
      heading: "Why this format wins over chat prompts",
      paragraphs: [
        "Chat prompts are temporary. Every new chat is a blank slate; you re-explain the same workflow. SKILL.md is persistent. Once it's in the project, every chat starts informed.",
        "The other win: SKILL.md is portable. The same file works on Claude, Cursor, and (with the Custom GPT companion) on ChatGPT. You're not locked into one tool.",
      ],
    },
  ],
  outro: [
    "Every Lumenari kit ships with a SKILL.md plus the three companion formats (optimization pack, Custom GPT instructions, per-platform quick start). If you've been wondering whether the format is worth learning, the easiest answer is to buy any $14 kit, drop it in your tool of choice, and feel the difference inside 5 minutes.",
  ],
};
