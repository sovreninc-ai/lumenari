/**
 * Japanese (ja) dictionary.
 *
 * Standard Japanese (日本語). Polite です/ます form. Honorifics in marketing
 * copy; more direct in functional UI labels. Technical terms use the
 * conventions Japanese developers actually use online (mix of katakana and
 * English).
 *
 * Preserve {placeholder} tokens exactly — they're substituted at render time.
 */

import type { Dictionary } from "./en";

export const ja: Dictionary = {
  nav: {
    kits: "キット",
    library: "ライブラリ",
    pro: "Pro+",
    findYourKit: "あなたに合うキットを探す",
  },
  hero: {
    eyebrow: "最適化キット",
    headline_a: "あなたのAIを、",
    headline_b: "頼れる",
    headline_highlight: "シニアメンバーへ。",
    subhead:
      "プロンプト、スキル、パターンを厳選したキット。導入するだけで、Claude・ChatGPT・Cursorがデモ止まりではなく実戦で成果を出せるようになります。",
    ctaPrimary: "あなたに合うキットを探す",
    ctaSecondary: "カタログを見る",
  },
  home: {
    launchShelfEyebrow: "ローンチカタログ",
    launchShelfHeading: "{count}個のキット。本物の成果物。",
    seeAllKits: "すべてのキットを見る",
  },
  wizard: {
    step: "ステップ",
    of: "/",
    startOver: "最初からやり直す",
    step1Title: "どのAIをお使いですか?",
    step1Subtitle:
      "いちばんよく使うツールを選んでください。それに合わせてキットを提案します。",
    continue: "次へ",
    step2Title: "何に使っていますか?",
    step2Subtitle: "1〜2文で十分です。普段の言葉でどうぞ。",
    step2Placeholder:
      "例: 東京で不動産仲介をしていて、物件説明文の作成と購入希望者のフォローアップに使っています。",
    back: "戻る",
    showMyKit: "おすすめキットを見る",
    thinking: "考えています…",
    step3Title: "ご要望に合わせて選びました。",
    step3Subtitle:
      "単品で購入することも、下のバンドルでまとめ買いしてお得にすることもできます。",
    bundle: "バンドル",
    saves: "お得",
  },
  kits: {
    eyebrowShelf: "カタログ",
    catalogTitle: "キットを選ぶ。あるいはバンドルでまとめて。",
    catalogSubtitle:
      "各キットはひとつのダウンロード。SKILL.md、どのAIでも使える汎用システムプロンプト、そしてお好みのAIツールに入れて使う関連ファイル一式が含まれます。",
    individualKits: "個別キット",
    featuredBundles: "おすすめバンドル",
    moreBundles: "その他のバンドル",
    allKits: "すべてのキット",
    seeBundle: "バンドルを見る",
    seeWhatsInside: "中身を見る",
    oneTime: "買い切り",
    whatsInside: "キットの内容",
    filesYouReceive: "受け取るファイル",
    eyebrowKit: "最適化パック",
    optimizedFor: "対応AI",
    getThisKit: "このキットを購入",
    getThisBundle: "このバンドルを購入",
    lifetimeAccess:
      "買い切り、無期限アクセス。決済後すぐにダウンロードできます。",
    pairsWellWith: "相性のよいキット",
    recommendedTitle: "このキットと一緒に使うのにおすすめのツール",
    recommendedSub:
      "キットのワークフローに合わせて厳選した相性のよいツールです。Lumenariのお客様は、キット内のプロンプトと併用しています。",
    disclosure:
      "開示: このセクション内のリンクから手数料を受け取る場合があります。私たち自身が使っているツールだけを紹介しています。",
  },
  library: {
    eyebrow: "あなたのライブラリ",
    welcomeBack: "おかえりなさい。",
    enterEmail:
      "ご購入時に使われたメールアドレスをご入力ください。新しいダウンロードリンクをお送りします。",
    email: "メールアドレス",
    emailPlaceholder: "you@example.com",
    send: "ダウンロードリンクを送る",
    sending: "送信中…",
    checkInbox: "メールボックスをご確認ください。",
    checkInboxBody:
      "{email} のご登録がある場合、ダウンロードリンクをお送りしました。",
    everythingUnlocked: "すべて利用可能です。",
    yourKits: "あなたのキット",
    proSubtitle:
      "Pro+メンバーは、現在のすべてのキットと今後リリースされるキットをご利用いただけます。下からどれでもダウンロードできます。",
    standardSubtitle:
      "ご購入いただいたキットをダウンロードしてください。リンクの有効期限はありません。",
    download: "ダウンロード",
    upgradeNudge: "20以上のキットを全部使いたいですか?",
    upgradeNudgeCta: "Pro+にアップグレード",
    expiredLink:
      "このリンクは期限切れまたは無効です。メールアドレスを入力して新しいリンクをお受け取りください。",
    passwordlessNote:
      "パスワード不要。リンクは署名付きで24時間有効です。",
  },
  pro: {
    eyebrow: "Lumenari Pro+",
    headline_a: "すべてのキット。すべてのリリース。",
    headline_highlight: "ひとつのサブスクで。",
    subhead:
      "Pro+なら、Lumenariの全カタログ(今後リリースされる新キットも含む)が、年に数キット買うのと同じ価格で使い放題になります。",
    monthly: "月額",
    annual: "年額",
    lifetime: "ライフタイム",
    perMonth: "/月",
    perYear: "/年",
    once: "1回のみ",
    tryItCancel: "まずはお試し。いつでも解約OK。",
    payOnce: "一度の支払いで、ずっとあなたのもの。",
    annualSavings: "月額より {amount} お得。",
    whatYouGet: "得られるもの",
    vsFree: "Pro+ vs 単品購入",
    faq: "よくある質問",
    ctaMonthly: "月額で始める",
    ctaAnnual: "年額にする",
    ctaLifetime: "ライフタイムを購入",
    opening: "Stripeを開いています…",
    upgradeButton: "Pro+にアップグレード",
  },
  thanks: {
    eyebrow: "ご購入ありがとうございます",
    title: "キットをお届け中です。",
    body:
      "領収書とダウンロードリンクをメールでお送りしました。キットを使う予定の端末で開いてください。",
    openLibrary: "ライブラリを開く",
    browseMore: "他のキットも見る",
  },
  footer: {
    browseKits: "キットを見る",
    library: "ライブラリ",
  },
  cart: {
    eyebrow: "1ステップで購入",
    title: "あえてカートを置いていません。",
    body:
      "キットを選んで、決済して、1分以内にライブラリへ。複数のキットがほしいなら、バンドルがお得です。",
    browseKits: "キットを見る",
    seeBundle: "バンドルを見る",
  },
};
