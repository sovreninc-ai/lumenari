/**
 * Simplified Chinese (zh-CN) dictionary.
 *
 * Mainland-style 简体中文, standard Mandarin idioms. Tone: professional,
 * modern, friendly. We use 您 (formal "you") in marketing copy and headers,
 * and 你 (informal) inside conversational/instructional copy where it feels
 * more natural. Technical terms (AI, ChatGPT, Stripe, prompt) stay in English
 * — that's industry convention.
 *
 * Preserve {placeholder} tokens exactly — they're substituted at render time.
 */

import type { Dictionary } from "./en";

export const zhCN: Dictionary = {
  nav: {
    kits: "工具包",
    library: "我的库",
    pro: "Pro+",
    findYourKit: "找到适合你的工具包",
  },
  hero: {
    eyebrow: "AI 优化工具包",
    headline_a: "让你的 AI",
    headline_b: "像",
    headline_highlight: "资深同事一样干活。",
    subhead:
      "精心打磨的 prompt、技能与套路合集——一键放入,即可让 Claude、ChatGPT 或 Cursor 不再只会演示,而是真正交付成果。",
    ctaPrimary: "找到适合你的工具包",
    ctaSecondary: "浏览全部",
  },
  wizard: {
    step: "第",
    of: "步,共",
    startOver: "重新开始",
    step1Title: "您使用的是哪款 AI?",
    step1Subtitle:
      "选一个您最常用的工具,我们为您匹配最合适的工具包。",
    continue: "继续",
    step2Title: "您用它来做什么?",
    step2Subtitle: "一两句话就够了,用日常语言描述即可。",
    step2Placeholder:
      "例如:我是上海的房产经纪人,日常用 AI 写房源描述、跟进买家。",
    back: "返回",
    showMyKit: "查看推荐工具包",
    thinking: "正在思考…",
    step3Title: "为您量身定制。",
    step3Subtitle:
      "您可以单独购买任一工具包,也可以选择下方的组合包,享受更多优惠。",
    bundle: "组合包",
    saves: "立省",
  },
  kits: {
    eyebrowShelf: "工具包目录",
    catalogTitle: "选一个工具包。或者打包带走。",
    catalogSubtitle:
      "每个工具包都是一次性下载,包含一份 SKILL.md、可直接用于 ChatGPT 的系统提示词,以及一整套配套文件,放进您常用的 AI 工具即可使用。",
    individualKits: "单个工具包",
    featuredBundles: "精选组合包",
    moreBundles: "更多组合包",
    allKits: "全部工具包",
    seeBundle: "查看组合包",
    seeWhatsInside: "看看里面有什么",
    oneTime: "一次性付费",
    whatsInside: "包含哪些内容",
    filesYouReceive: "您将收到的文件",
    eyebrowKit: "优化包",
    optimizedFor: "适配 AI",
    getThisKit: "购买此工具包",
    getThisBundle: "购买此组合包",
    lifetimeAccess:
      "一次付费,终身使用。结账后立即下载。",
    pairsWellWith: "搭配推荐",
    recommendedTitle: "与此工具包搭配的推荐工具。",
    recommendedSub:
      "为此工具包工作流程精挑细选的搭档。Lumenari 用户通常会把它们和工具包里的 prompt 一起使用。",
    disclosure:
      "声明:本节中的链接可能为我们带来佣金。我们只推荐自己在用的工具。",
  },
  library: {
    eyebrow: "您的库",
    welcomeBack: "欢迎回来。",
    enterEmail:
      "请输入您结账时使用的邮箱,我们会重新发送下载链接。",
    email: "邮箱",
    emailPlaceholder: "you@example.com",
    send: "发送我的下载链接",
    sending: "发送中…",
    checkInbox: "请查收您的邮箱。",
    checkInboxBody:
      "如果 {email} 在我们的记录中,您的下载链接已在路上。",
    everythingUnlocked: "全部已解锁。",
    yourKits: "您的工具包。",
    proSubtitle:
      "Pro+ 会员可使用全部现有及未来的工具包,在下方任意下载。",
    standardSubtitle:
      "下载您已购买的内容,链接永不失效。",
    download: "下载",
    upgradeNudge: "想要全部 20+ 个工具包?",
    upgradeNudgeCta: "升级到 Pro+",
    expiredLink:
      "该链接已失效或无效。请输入您的邮箱以获取新链接。",
    passwordlessNote:
      "无需密码。链接已签名,24 小时内有效。",
  },
  pro: {
    eyebrow: "Lumenari Pro+",
    headline_a: "全部工具包。每次更新。",
    headline_highlight: "一份订阅搞定。",
    subhead:
      "Pro+ 一次性解锁 Lumenari 全部目录——包括我们每次发布的新工具包——年费仅相当于两三个单独工具包的价格。",
    monthly: "月付",
    annual: "年付",
    lifetime: "终身",
    perMonth: "/月",
    perYear: "/年",
    once: "一次性",
    tryItCancel: "先试试。随时可取消。",
    payOnce: "一次付费,永久拥有。",
    annualSavings: "比月付立省 {amount}。",
    whatYouGet: "您将获得",
    vsFree: "Pro+ vs 单独购买",
    faq: "常见问题",
    ctaMonthly: "开始月付",
    ctaAnnual: "选择年付",
    ctaLifetime: "购买终身版",
    opening: "正在打开 Stripe…",
    upgradeButton: "升级到 Pro+",
  },
  thanks: {
    eyebrow: "购买成功",
    title: "您的工具包正在送达。",
    body:
      "我们已通过邮件发送了收据和下载链接。请在准备使用工具包的设备上打开。",
    openLibrary: "打开我的库",
    browseMore: "查看更多工具包",
  },
  footer: {
    browseKits: "浏览工具包",
    library: "我的库",
  },
  cart: {
    eyebrow: "一步结账",
    title: "我们特意没有购物车。",
    body:
      "选一个工具包,结账,不到一分钟就能在您的库里看到它。想要多个工具包?直接选组合包更划算。",
    browseKits: "浏览工具包",
    seeBundle: "查看组合包",
  },
};
