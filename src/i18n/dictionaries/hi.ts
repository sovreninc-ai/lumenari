/**
 * Hindi (hi) dictionary.
 *
 * Modern standard Hindi in Devanagari script. Tone: warm, professional,
 * accessible. Code-switching with common English loanwords is normal —
 * Indian tech professionals use "kit", "AI", "platform", "marketplace",
 * "wizard" etc. in everyday speech, and forcing literal Sanskritized
 * Hindi for those reads as stilted.
 *
 * Preserve {placeholder} tokens exactly — they're substituted at render time.
 */

import type { Dictionary } from "./en";

export const hi: Dictionary = {
  nav: {
    kits: "किट",
    library: "लाइब्रेरी",
    pro: "Pro+",
    findYourKit: "अपनी किट खोजें",
  },
  header: {
    kits: "किट",
    pro: "Pro+",
    library: "लाइब्रेरी",
    findYourKit: "अपनी किट खोजें",
  },
  hero: {
    eyebrow: "ऑप्टिमाइज़ेशन किट",
    headline_a: "अपनी AI से",
    headline_b: "एक सीनियर साथी की तरह",
    headline_highlight: "काम करवाएँ।",
    subhead:
      "प्रॉम्प्ट, स्किल और पैटर्न की क्यूरेटेड किट — इन्हें इस्तेमाल कीजिए और देखिए कैसे Claude, ChatGPT या Cursor डेमो से आगे बढ़कर असली काम पूरा करते हैं।",
    ctaPrimary: "अपनी किट खोजें",
    ctaSecondary: "कैटलॉग देखें",
  },
  home: {
    launchShelfEyebrow: "लॉन्च कैटलॉग",
    launchShelfHeading: "{count} किट। असली डिलीवरेबल।",
    seeAllKits: "सभी किट देखें",
  },
  wizard: {
    step: "स्टेप",
    of: "/",
    startOver: "फिर से शुरू करें",
    step1Title: "आप कौन-सी AI इस्तेमाल करते हैं?",
    step1Subtitle:
      "वो टूल चुनिए जिसे आप सबसे ज़्यादा इस्तेमाल करते हैं। हम उसके लिए सही किट सुझाएँगे।",
    continue: "आगे बढ़ें",
    step2Title: "आप इसे किस काम के लिए इस्तेमाल कर रहे हैं?",
    step2Subtitle: "एक-दो लाइन काफ़ी है। आम बोलचाल की भाषा में बताइए।",
    step2Placeholder:
      "जैसे: मैं दिल्ली में रियल एस्टेट एजेंट हूँ, लिस्टिंग लिखता हूँ और खरीदारों से फॉलो-अप करता हूँ।",
    back: "वापस",
    showMyKit: "मेरी किट दिखाएँ",
    thinking: "सोच रहे हैं…",
    step3Title: "आपकी ज़रूरत के हिसाब से तैयार।",
    step3Subtitle:
      "किसी एक किट को अलग से ख़रीदिए, या नीचे दिए गए बंडल में से चुनिए और बचत कीजिए।",
    bundle: "बंडल",
    saves: "की बचत",
  },
  wizardClassic: {
    eyebrow: "रिकमेंडर · क्लासिक",
    step1Title: "आप कौन-सी AI इस्तेमाल करते हैं?",
    step1Subtitle:
      "वो टूल चुनिए जिसे आप सबसे ज़्यादा इस्तेमाल करते हैं। हम उसके लिए सही किट सुझाएँगे।",
    continue: "आगे बढ़ें",
    step2Title: "आप इसे किस काम के लिए इस्तेमाल कर रहे हैं?",
    step2Subtitle: "एक-दो लाइन काफ़ी है। आम बोलचाल की भाषा में बताइए।",
    step2Placeholder:
      "जैसे: मैं दिल्ली में रियल एस्टेट एजेंट हूँ, लिस्टिंग लिखता हूँ और खरीदारों से फॉलो-अप करता हूँ।",
    examples: [
      "मैं रियल एस्टेट एजेंट हूँ और लिस्टिंग लिखता हूँ",
      "मैं SDR हूँ और cold email भेजता हूँ",
      "मैं फ्रीलांसर हूँ और proposal लिखता हूँ",
      "मैं SEO राइटर हूँ और हफ़्ते में 3 आर्टिकल पब्लिश करता हूँ",
      "मैं रिक्रूटर हूँ और सीनियर इंजीनियर सोर्स करता हूँ",
      "मैं फ़ाउंडर हूँ और इन्वेस्टर अपडेट लिखता हूँ",
      "मैं एक छोटी कंस्ट्रक्शन टीम चलाता हूँ और सेफ़्टी पेपरवर्क में डूबा हुआ हूँ",
      "मैं Next.js + Supabase SaaS शिप कर रहा हूँ",
    ],
    back: "वापस",
    showMyKit: "मेरी किट दिखाएँ",
    thinking: "सोच रहे हैं…",
    step3Title: "आपकी ज़रूरत के हिसाब से तैयार।",
    step3Subtitle:
      "किसी एक किट को अलग से ख़रीदिए, या नीचे दिए गए बंडल में से चुनिए और बचत कीजिए।",
    bundleLabel: "बंडल",
    saves: "की बचत",
    getBundlePrefix: "बंडल लें",
    getThisKitPrefix: "यह किट लें",
    failedToRecommend: "सुझाव देने में असफल",
    somethingWentWrong: "कुछ गड़बड़ हो गई",
    stepLabel: "स्टेप {step} / 3",
    startOver: "फिर से शुरू करें",
  },
  onboarding: {
    eyebrow: "30 सेकंड में अपनी किट खोजें",
    title: "हमें अपने बारे में बताइए। हम सही किट चुन लेंगे।",
    subtitle:
      "तीन टैप — आपकी भूमिका, आप किस पर काम कर रहे हैं, और आप कौन-सी AI इस्तेमाल करते हैं। हम कैटलॉग से सबसे सटीक किट सुझाएँगे।",
    step1Heading: "आपकी भूमिका क्या है?",
    step2Heading: "आप किस काम में मदद चाहते हैं?",
    step2OtherLabel: "अपनी भूमिका बताइए",
    step2OtherPlaceholder: "जैसे: NGO डायरेक्टर, वकील, टीचर…",
    step2PickAny: "जो भी लागू हो चुनिए, या अपना जोड़िए।",
    step2CustomPlaceholder: "या बताइए कि आप क्या करते हैं (वैकल्पिक)…",
    step3Heading: "आप कौन-सी AI इस्तेमाल करते हैं?",
    back: "वापस",
    continue: "आगे बढ़ें",
    finding: "किट ढूँढ रहे हैं…",
    getMyKit: "मेरी किट दीजिए",
    yourKits: "आपकी किट",
    startOver: "फिर से शुरू करें",
    couldNotPick:
      "हम साफ़ तौर पर कोई किट नहीं चुन पाए — कैटलॉग सीधे ब्राउज़ कीजिए।",
    why: "क्यों:",
    proNudgePrefix:
      "सबकुछ एक साथ चाहिए? Pro+ से हर किट अनलॉक होती है, सिर्फ़",
    proNudgeSuffix: "USD/महीना में।",
    proNudgeLink: "Pro+ देखें →",
    errorPickRoleAndTask:
      "कृपया एक भूमिका और कम से कम एक काम चुनिए।",
    errorFetch: "सुझाव नहीं ला सके।",
    errorGeneric: "सुझाव देने में असफल",
    roles: {
      marketing: "मार्केटिंग प्रोफेशनल",
      sales: "सेल्स प्रोफेशनल",
      developer: "डेवलपर",
      founder: "फ़ाउंडर",
      realEstate: "रियल एस्टेट एजेंट",
      recruiter: "रिक्रूटर",
      solopreneur: "सोलोप्रेन्योर",
      creator: "क्रिएटर",
      other: "कुछ और",
    },
    tasks: {
      marketing: [
        "बड़े पैमाने पर SEO कंटेंट लिखना",
        "ब्रांड-वॉइस में कॉपी लिखना",
        "न्यूज़लेटर बनाना",
        "प्रोडक्ट कॉपी + लैंडिंग पेज",
        "कैम्पेन ब्रीफ़ + क्रिएटिव",
      ],
      sales: [
        "Cold outreach + sequences",
        "Discovery + qualification",
        "Proposal लिखना",
        "फ़ॉलो-अप + रिवर्स-एंगेजमेंट",
        "अकाउंट रिसर्च ब्रीफ़",
      ],
      developer: [
        "Next.js + Supabase प्रोडक्शन",
        "Stripe Connect + webhooks",
        "Supabase RLS + auth",
        "iOS / SwiftUI काम",
        "Python data + ML",
        "Go / Node / Rails backend",
        "DevOps / Terraform / Kubernetes",
      ],
      founder: [
        "इन्वेस्टर अपडेट + डेक",
        "हायरिंग + पहली टीम का वर्कफ़्लो",
        "कस्टमर सपोर्ट पैटर्न",
        "सोलो-ऑपरेटर प्लेबुक",
        "प्राइसिंग + पोज़िशनिंग",
      ],
      realEstate: [
        "लिस्टिंग कॉपी + विवरण",
        "CMA + मार्केट ब्रीफ़",
        "खरीदार + विक्रेता आउटरीच",
        "ओपन-हाउस फ़ॉलो-अप",
        "लीड नर्चर सीक्वेंस",
      ],
      recruiter: [
        "सीनियर इंजीनियर सोर्सिंग",
        "पैसिव कैंडिडेट को cold outreach",
        "स्क्रीनिंग नोट + स्कोरकार्ड",
        "हायरिंग-मैनेजर कैलिब्रेशन",
        "विविध पाइपलाइन सर्च",
      ],
      solopreneur: [
        "ईमेल + सोशल ड्राफ़्ट",
        "क्लाइंट प्रपोज़ल + SOW",
        "कस्टमर सपोर्ट टेम्पलेट",
        "प्रोडक्ट लॉन्च",
        "न्यूज़लेटर + कंटेंट",
      ],
      creator: [
        "YouTube स्क्रिप्ट + आउटलाइन",
        "न्यूज़लेटर + Substack",
        "Twitter / LinkedIn थ्रेड",
        "Podcast prep + शो नोट्स",
        "स्पॉन्सर आउटरीच",
      ],
    },
    aiOptions: {
      claude: "Claude",
      chatgpt: "ChatGPT",
      codex: "Codex",
      gemini: "Gemini",
      cursor: "Cursor",
      any: "इनमें से कोई भी",
    },
  },
  kits: {
    eyebrowShelf: "कैटलॉग",
    catalogTitle: "एक किट चुनिए। या एक बंडल ले लीजिए।",
    catalogSubtitle:
      "हर किट एक ही डाउनलोड में आती है — एक SKILL.md, हर AI में चलने वाला यूनिवर्सल सिस्टम प्रॉम्प्ट, और कई सहायक फ़ाइलें जिन्हें आप अपने मनपसंद AI टूल में डाल सकते हैं।",
    individualKits: "अलग-अलग किट",
    featuredBundles: "ख़ास बंडल",
    moreBundles: "और बंडल",
    allKits: "सभी किट",
    seeBundle: "बंडल देखें",
    seeWhatsInside: "अंदर क्या है, देखें",
    oneTime: "एक बार का भुगतान",
    whatsInside: "क्या मिलेगा",
    filesYouReceive: "जो फ़ाइलें आपको मिलेंगी",
    eyebrowKit: "ऑप्टिमाइज़ेशन पैक",
    optimizedFor: "इसके लिए ऑप्टिमाइज़्ड",
    getThisKit: "यह किट लें",
    getThisBundle: "यह बंडल लें",
    lifetimeAccess:
      "एक बार भुगतान, जीवनभर एक्सेस। चेकआउट के तुरंत बाद डाउनलोड।",
    pairsWellWith: "इसके साथ अच्छा चलता है",
    recommendedTitle: "इस किट के साथ हमारे सुझाए हुए टूल।",
    recommendedSub:
      "इस किट के वर्कफ़्लो के साथ बेहतरीन काम करने वाले चुनिंदा टूल। Lumenari के यूज़र इन्हें अक्सर किट के प्रॉम्प्ट के साथ इस्तेमाल करते हैं।",
    disclosure:
      "जानकारी: इस सेक्शन के कुछ लिंक से हमें कमीशन मिल सकता है। हम सिर्फ़ वही टूल सुझाते हैं जिन्हें हम ख़ुद इस्तेमाल करते हैं।",
  },
  kitDetail: {
    allKits: "सभी किट",
    eyebrow: "ऑप्टिमाइज़ेशन पैक",
    optimizedForPrefix: "इसके लिए ऑप्टिमाइज़्ड:",
    oneTimePrefix: "एक बार का भुगतान ·",
    whatsInside: "क्या मिलेगा",
    filesYouReceive: "जो फ़ाइलें आपको मिलेंगी",
    filesIntro:
      "हर किट चार स्टैंडर्ड फ़ॉर्मैट में आती है — SKILL.md, एक ऑप्टिमाइज़ेशन पैक, एक Custom GPT prompt, और हर प्लेटफ़ॉर्म के लिए quick start — साथ ही इस किट से जुड़े रेफ़रेंस डॉक्स।",
    lifetimeAccess:
      "एक बार भुगतान, जीवनभर एक्सेस। चेकआउट के तुरंत बाद डाउनलोड।",
    getKitPrefix: "लें",
    getKitSuffix: "किट",
    bundleNudgePrefix: "या लीजिए",
    bundleNudgeMiddle: "—",
    bundleNudgeKitsFor: "किट के लिए",
    bundleNudgeSaves: "(बचत",
    bundleNudgeSavesClose: ")।",
    seeBundle: "बंडल देखें →",
  },
  bundleDetail: {
    allKits: "सभी किट",
    eyebrow: "बंडल",
    whatsInside: "क्या मिलेगा",
    savesPrefix: "बचत",
    savesSuffix: "अलग-अलग ख़रीदने के मुक़ाबले।",
    getThisBundle: "यह बंडल लें",
  },
  proPage: {
    eyebrow: "Lumenari Pro+",
    headline_a: "हर किट। हर रिलीज़।",
    headline_highlight: "एक ही सब्सक्रिप्शन।",
    subhead:
      "Pro+ से आपको पूरा Lumenari कैटलॉग मिलता है — हर नई किट सहित — साल में सिर्फ़ दो-तीन किट की कीमत में।",
    monthly: "मासिक",
    annual: "वार्षिक",
    lifetime: "लाइफटाइम",
    perMonth: "/महीना",
    perYear: "/साल",
    once: "एक बार",
    tryItCancel: "आज़माइए। कभी भी कैंसल कीजिए।",
    payOnce: "एक बार भुगतान। हमेशा के लिए आपका।",
    annualSavingsPrefix: "बचाइए",
    annualSavingsSuffix: "मासिक की तुलना में।",
    whatYouGet: "आपको क्या मिलेगा",
    vsFree: "Pro+ बनाम अलग-अलग किट",
    faqHeading: "आम सवाल",
    ctaMonthly: "मासिक प्लान शुरू करें",
    ctaAnnual: "वार्षिक पर जाएँ",
    ctaLifetime: "लाइफटाइम लें",
    comparison: {
      header_feature: "फ़ीचर",
      header_free: "अलग-अलग किट",
      header_pro: "Pro+",
      row1_label: "मौजूदा सभी किट का एक्सेस",
      row1_free: "हर किट के लिए भुगतान",
      row1_pro: "शामिल",
      row2_label: "हर नई किट अपने आप",
      row2_free: "हर किट के लिए भुगतान",
      row2_pro: "शामिल",
      row3_label: "आने वाली किट का अर्ली एक्सेस",
      row3_free: "—",
      row3_pro: "हाँ",
      row4_label: "प्रायोरिटी सपोर्ट",
      row4_free: "स्टैंडर्ड",
      row4_pro: "प्रायोरिटी",
      row5_label: "केवल मेम्बर के लिए किट",
      row5_free: "—",
      row5_pro: "जल्द आ रही हैं",
    },
    faq: [
      {
        q: "अगर मैं कैंसल कर दूँ तो क्या मेरी किट मेरे पास रहेंगी?",
        a: "जो कुछ भी आपने अलग से ख़रीदा है वो हमेशा आपका रहेगा — Pro+ से इसमें कोई फ़र्क नहीं पड़ता। Pro+ कैंसल करने पर सब्सक्रिप्शन से पहले ख़रीदी हुई किट आपके पास रहेंगी; जो किट केवल Pro+ के ज़रिए मिल रही थीं उनका एक्सेस बिलिंग पीरियड के अंत में ख़त्म हो जाएगा।",
      },
      {
        q: "'नई किट' का मतलब क्या है?",
        a: "हर ताज़ा किट जो हम Lumenari कैटलॉग में पब्लिश करते हैं। हम 100+ किट की तरफ़ बढ़ रहे हैं — Pro+ मेम्बर्स को हर किट जैसे ही रिलीज़ होगी मिल जाएगी।",
      },
      {
        q: "क्या मैं बाद में टियर बदल सकता हूँ?",
        a: "हाँ। आप अपने अकाउंट से मासिक और वार्षिक के बीच स्विच कर सकते हैं। लाइफटाइम एक बार का है — अगर आप बाद में लेते हैं तो हम आपके पिछले Pro+ सब्सक्रिप्शन का क्रेडिट उसमें जोड़ देंगे।",
      },
      {
        q: "रिफ़ंड पॉलिसी क्या है?",
        a: "सभी टियर पर 14 दिन का रिफ़ंड, कोई सवाल नहीं। hello@lumenari.io पर ईमेल कीजिए।",
      },
    ],
  },
  pro: {
    eyebrow: "Lumenari Pro+",
    headline_a: "हर किट। हर रिलीज़।",
    headline_highlight: "एक ही सब्सक्रिप्शन।",
    subhead:
      "Pro+ से आपको पूरा Lumenari कैटलॉग मिलता है — हर नई किट सहित — साल में सिर्फ़ दो-तीन किट की कीमत में।",
    monthly: "मासिक",
    annual: "वार्षिक",
    lifetime: "लाइफटाइम",
    perMonth: "/महीना",
    perYear: "/साल",
    once: "एक बार",
    tryItCancel: "आज़माइए। कभी भी कैंसल कीजिए।",
    payOnce: "एक बार भुगतान। हमेशा के लिए आपका।",
    annualSavings: "मासिक की तुलना में {amount} की बचत।",
    whatYouGet: "आपको क्या मिलेगा",
    vsFree: "Pro+ बनाम अलग-अलग किट",
    faq: "आम सवाल",
    ctaMonthly: "मासिक प्लान शुरू करें",
    ctaAnnual: "वार्षिक पर जाएँ",
    ctaLifetime: "लाइफटाइम लें",
    opening: "Stripe खुल रहा है…",
    upgradeButton: "Pro+ पर अपग्रेड करें",
  },
  apiPlatform: {
    eyebrow: "Lumenari API",
    headline_a: "100+ AI skill recommendations को",
    headline_highlight: " अपने प्रोडक्ट में embed कीजिए।",
    subhead:
      "वही इंजन जो Lumenari के स्टोरफ़्रंट wizard को चलाता है, अब JSON API के रूप में। दो लाइनें कोड और आपका ऐप किसी भी user के use case के लिए सही AI optimization kit सुझा सकता है।",
    getApiKey: "API key लें",
    readDocs: "डॉक्स पढ़ें",
    useCasesHeading: "AI शिप करने वाली टीमों के लिए बना",
    useCase1Title: "AI टूल बिल्डर्स",
    useCase1Body:
      "अपने प्रोडक्ट में सीधे skill discovery embed कीजिए ताकि यूज़र आपका ऐप छोड़े बिना सही Claude / GPT / Cursor recipe ढूँढ सकें।",
    useCase2Title: "इंटरनल AI असिस्टेंट",
    useCase2Body:
      "एक इंटरनल Slack bot या workspace agent चलाइए जो टीममेट्स के मदद माँगने पर क्यूरेटेड prompt दिखाए।",
    useCase3Title: "एजेंसी और कंसल्टेंट",
    useCase3Body:
      "क्लाइंट डिलीवरेबल में recommendation engine को white-label कीजिए। Business और Enterprise टियर पर Lumenari ब्रांडिंग हटा दी जाती है।",
    pricingHeading: "प्राइसिंग",
    pricingFooter:
      "सभी पेड टियर हर महीने USD में बिल होते हैं। कभी भी कैंसल कीजिए।",
    quickstartHeading: "बस दो लाइन कोड।",
    quickstartSubPrefix: "बदलिए",
    quickstartSubSuffix: "को अपनी key से और आप लाइव हैं।",
    fullReference: "पूरा रेफ़रेंस, सभी एंडपॉइंट",
    perMonth: "/महीना",
    custom: "कस्टम",
    free: "फ़्री",
    unlimitedCalls: "असीमित calls",
    callsPerMonth: "{count} calls / महीना",
    finalCtaHeading: "फ़्री से शुरू कीजिए। ज़रूरत पड़ने पर अपग्रेड कीजिए।",
    finalCtaBody:
      "महीने में 100 calls, बिना क्रेडिट कार्ड के। ज़रूरत बढ़ने पर पेड प्लान 1,00,000 calls/महीना तक स्केल होते हैं और Enterprise की कोई सीमा नहीं है।",
    finalCtaPrimary: "API key लें",
    finalCtaSales: "सेल्स से बात करें",
  },
  apiDocs: {
    eyebrow: "API डॉक्युमेंटेशन",
    title: "रेफ़रेंस",
    intro:
      "Lumenari API हमारे kit recommendation इंजन को JSON endpoints के रूप में expose करता है। Bearer token से authenticate कीजिए। यह वही इंजन है जो storefront wizard को चलाता है।",
    nav: {
      quickstart: "Quickstart",
      authentication: "Authentication",
      rateLimiting: "Rate limiting",
      endpoints: "Endpoints",
      recommend: "  · Recommend",
      listKits: "  · List kits",
      getKit: "  · Get kit",
      downloadKit: "  · Download kit",
      usage: "  · Usage",
      errorCodes: "Error codes",
      webhooks: "Webhooks",
    },
    quickstart: {
      heading: "Quickstart",
      step1Prefix: "",
      step1Link: "साइन इन कीजिए",
      step1Suffix:
        " और एक API key generate कीजिए। पूरी key एक ही बार दिखती है — उसे सेव कर लीजिए।",
      step2Prefix: "हर request में इसे ",
      step2Suffix: " के रूप में pass कीजिए।",
      step3:
        "नीचे दिए गए endpoints इस्तेमाल कीजिए। फ़्री टियर पर महीने में 100 calls मिलते हैं।",
    },
    authentication: {
      heading: "Authentication",
      bodyPrefix:
        "सभी endpoints के लिए Bearer token ज़रूरी है। Keys 36 अक्षर की होती हैं और शुरुआत में",
      bodyMiddle: " लगा होता है। Keys manage कीजिए",
      bodyLink: "अपने dashboard पर",
      bodySuffix: "।",
      note:
        "Keys SHA-256 से hash करके रखी जाती हैं। गुम हुई key हम वापस नहीं ला सकते — उसे revoke करके नई generate कीजिए।",
    },
    rateLimiting: {
      heading: "Rate limiting",
      intro:
        "हर request तीन headers लौटाता है जिनसे आप back off कर सकते हैं:",
      bullet1Prefix: "",
      bullet1Suffix: " — आपके टियर की मासिक सीमा (या ",
      bullet1Close: " Enterprise पर)",
      bullet2Prefix: "",
      bullet2Suffix: " — इस बिलिंग पीरियड में बचे हुए calls",
      bullet3Prefix: "",
      bullet3Suffix:
        " — Unix timestamp जब quota फिर भरेगा (अगले महीने की 1 तारीख़, UTC)",
      footerPrefix:
        "सीमा पार होने पर HTTP 429 मिलेगा structured error body और ",
      footerSuffix: " header (सेकंड में) के साथ।",
    },
    endpoints: {
      heading: "Endpoints",
      recommendSummary:
        "किसी AI प्लेटफ़ॉर्म + use case के लिए kit recommendations पाइए।",
      listKitsSummary: "कैटलॉग की हर kit की paginated list।",
      getKitSummary:
        "किसी एक kit का पूरा metadata, deliverable file list सहित।",
      downloadKitSummary:
        "Concatenated kit content markdown के रूप में। केवल Pro टियर और ऊपर के लिए।",
      downloadKitNotes:
        "फ़्री टियर पर 402 आता है code `tier_required` के साथ। Pro / Business / Enterprise पूरा markdown body inline लौटाते हैं।",
      usageSummary:
        "Call करने वाले अकाउंट का इस महीने का usage + 30-दिन का daily breakdown।",
      queryParameters: "Query parameters",
      requestBody: "Request body",
      example: "उदाहरण",
      response: "Response",
      query: {
        limit: "पेज साइज़, डिफ़ॉल्ट 50, अधिकतम 100",
        offset: "Pagination offset",
        ai_target:
          "किसी एक AI target पर filter — claude / chatgpt / आदि।",
        keyword: "Name + keywords से substring match",
      },
    },
    errorCodes: {
      heading: "Error codes",
      intro: "हर error response का एक ही shape होता है:",
      header_http: "HTTP",
      header_code: "Code",
      header_meaning: "मतलब",
      rows: [
        { meaning: "Body या params validation में फ़ेल हुए।" },
        { meaning: "Authorization header नहीं है।" },
        { meaning: "Key गलत है, अनजान है, या revoke हो चुकी है।" },
        { meaning: "Paid subscription past_due या canceled है।" },
        { meaning: "Endpoint के लिए Pro टियर या ऊपर ज़रूरी है।" },
        { meaning: "Kit id/slug मौजूद नहीं है।" },
        {
          meaning:
            "मासिक call की सीमा पूरी हो गई। Period रीसेट के बाद फिर try कीजिए।",
        },
        { meaning: "Lumenari की तरफ़ से failure। फिर try कीजिए।" },
        { meaning: "Server पर kit content मौजूद नहीं (कृपया रिपोर्ट कीजिए)।" },
      ],
    },
    webhooks: {
      heading: "Webhooks",
      bodyPrefix: "जल्द आ रहा है। Subscribe कीजिए ",
      bodySuffix:
        " पर ताकि webhooks आते ही आपको पता चले (कैटलॉग अपडेट, usage thresholds, नई किट)।",
    },
  },
  free: {
    eyebrow: "फ़्री किट",
    title: "जॉब सर्च के लिए एक फ़्री AI किट।",
    intro:
      "तुरंत इस्तेमाल होने वाले prompts, Claude के लिए एक SKILL.md, ChatGPT के लिए optimization pack, और एक Custom GPT instruction file — सब एक ही डाउनलोड में। ATS में पास होने वाले résumé, असरदार outreach, और ऐसी interview prep जो रटी-रटाई न लगे।",
    whatsInside: "क्या मिलेगा",
    defaultBullets: [
      "Résumé tailoring prompts जो ATS filters से पार हों",
      "Hiring managers + recruiters के लिए cold-outreach टेम्पलेट",
      "Interview prep — STAR stories, आम सवाल, salary बातचीत",
      "फ़ॉलो-अप + thank-you note पैटर्न",
      "एक Custom GPT prompt जिसे आप आज ही ChatGPT में paste कर सकते हैं",
    ],
    howItWorks: "कैसे काम करता है",
    step1: "अपना ईमेल डालिए। एक मिनट में किट आपके इनबॉक्स में आ जाएगी।",
    step2:
      "SKILL.md को किसी Claude प्रोजेक्ट में drag कीजिए, या optimization pack को ChatGPT में paste कीजिए।",
    step3:
      "इसमें दिया कोई भी prompt चलाइए। अपनी ज़रूरत के हिसाब से थोड़ा बदलिए। भेज दीजिए।",
    followup:
      "अगले हफ़्ते में आपको Chris (फ़ाउंडर) के तरफ़ से कुछ छोटे नोट मिलेंगे — किट के साथ क्या करें, SKILL.md फ़ॉर्मैट कैसे काम करता है, और असली यूज़र के कुछ उदाहरण। कभी भी अनसब्सक्राइब कर सकते हैं।",
  },
  freeDownload: {
    eyebrow: "आपकी फ़्री किट",
    downloadLabel: "किट डाउनलोड कीजिए (.md)",
    instruction:
      "फ़ाइल को किसी Claude प्रोजेक्ट में drop कीजिए — या optimization pack सेक्शन को ChatGPT में paste कीजिए — और पहला prompt try कीजिए।",
    browseCatalog: "पूरा कैटलॉग देखें →",
  },
  libraryPage: {
    eyebrow: "आपकी लाइब्रेरी",
    welcomeBack: "वापसी पर स्वागत है।",
    enterEmail:
      "वो ईमेल लिखिए जो आपने चेकआउट के समय इस्तेमाल किया था। हम आपको नया डाउनलोड लिंक भेज देंगे।",
    expiredNotice:
      "यह लिंक एक्सपायर हो गया है या काम नहीं कर रहा। नया लिंक पाने के लिए अपना ईमेल लिखिए।",
    everythingUnlocked: "सब कुछ अनलॉक्ड।",
    yourKits: "आपकी किट।",
    proSubtitle:
      "Pro+ मेम्बर्स को मौजूदा और आने वाली हर किट मिलती है। नीचे से कोई भी डाउनलोड कीजिए।",
    standardSubtitle:
      "जो आपने ख़रीदा है, वो डाउनलोड कीजिए। लिंक कभी एक्सपायर नहीं होते।",
    upgradeNudgePrefix: "क्या आप 20+ किट चाहते हैं?",
    upgradeNudgeCta: "Pro+ पर अपग्रेड करें",
    download: "डाउनलोड",
    wishlistHeading: "आपकी विशलिस्ट",
    wishlistBody:
      "जो किट आपने बाद के लिए सेव की हैं। अगर इनकी कीमत गिरती है या ये किसी नए बंडल में दिखती हैं तो हम आपको ईमेल करेंगे।",
    wishlistView: "देखें",
    proBadge: "Pro+",
    proBadgeAnnual: "Pro+ Annual",
    proBadgeLifetime: "Pro+ Lifetime",
  },
  cartPage: {
    eyebrow: "एक-स्टेप चेकआउट",
    title: "हमने जान-बूझकर कार्ट नहीं रखा।",
    body:
      "एक किट चुनिए, चेकआउट कीजिए, और एक मिनट के अंदर आप लाइब्रेरी में हैं। एक से ज़्यादा किट चाहिए? बंडल ले लीजिए।",
    browseKits: "किट देखें",
    seeBundle: "बंडल देखें",
  },
  thanksPage: {
    eyebrow: "आप अंदर हैं",
    title: "आपकी किट आ रही है।",
    body:
      "हमने अभी आपको रसीद और एक डाउनलोड लिंक ईमेल किया है। उस मशीन पर खोलिए जहाँ आप इस किट का इस्तेमाल करेंगे।",
    openLibrary: "लाइब्रेरी खोलें",
    browseMore: "और किट देखें",
    emailedTo: "आपका डाउनलोड लिंक {email} पर भेज दिया गया है।",
    proWelcomeSentTo: "आपका Pro+ वेलकम ईमेल {email} पर भेज दिया गया है।",
    paymentPending:
      "भुगतान अभी प्रोसेस हो रहा है। जैसे ही वह कन्फ़र्म होगा, हम डाउनलोड लिंक ईमेल कर देंगे।",
  },
  thanks: {
    eyebrow: "आप अंदर हैं",
    title: "आपकी किट आ रही है।",
    body:
      "हमने अभी आपको रसीद और एक डाउनलोड लिंक ईमेल किया है। उस मशीन पर खोलिए जहाँ आप इस किट का इस्तेमाल करेंगे।",
    openLibrary: "लाइब्रेरी खोलें",
    browseMore: "और किट देखें",
  },
  footer: {
    browseKits: "किट देखें",
    library: "लाइब्रेरी",
    newsletterHeading: "हफ़्ते में एक उपयोगी ईमेल।",
    newsletterBody:
      "रणनीतियाँ, गहराई से विश्लेषण, और कभी-कभी नई किट की जानकारी। कोई बेकार बात नहीं। सब्सक्राइब कीजिए और आपकी पहली किट हम मुफ़्त भेजेंगे।",
    blog: "ब्लॉग",
    pro: "Pro+",
    api: "API",
    freeKit: "फ़्री किट",
    terms: "नियम",
    privacy: "प्राइवेसी",
    refunds: "रिफ़ंड",
    copyright: "© {year} Lumenari.",
  },
  cart: {
    eyebrow: "एक-स्टेप चेकआउट",
    title: "हमने जान-बूझकर कार्ट नहीं रखा।",
    body:
      "एक किट चुनिए, चेकआउट कीजिए, और एक मिनट के अंदर आप लाइब्रेरी में हैं। एक से ज़्यादा किट चाहिए? बंडल ले लीजिए।",
    browseKits: "किट देखें",
    seeBundle: "बंडल देखें",
  },
  terms: {
    eyebrow: "लीगल",
    title: "Terms of Service",
    lastUpdatedPrefix: "आख़िरी अपडेट:",
    legalDisclaimer:
      "कानूनी प्राधिकार के लिए, अंग्रेज़ी संस्करण मान्य होगा।",
    intro:
      "ये Terms Lumenari (“Service”) पर आपके इस्तेमाल को नियंत्रित करते हैं, जो Lumenari (“हम”, “हमारे”, या “Lumenari”) द्वारा lumenari.io पर संचालित है। Service का इस्तेमाल करने या कोई किट ख़रीदने पर आप इन Terms से सहमत होते हैं।",
    s1: {
      title: "1. The Service",
      p1: "Lumenari डिजिटल optimization kits (सामूहिक रूप से, “Kits”) बेचता है — prompt collections, SKILL.md फ़ाइलें, ChatGPT-compatible optimization packs, Custom GPT instructions, और संबंधित डॉक्युमेंटेशन — जो large language models जैसे Anthropic Claude, OpenAI ChatGPT, Anthropic-powered Cursor, Google Gemini, और इसी तरह के टूल का output बेहतर बनाने के लिए डिज़ाइन की गई हैं।",
      p2: "हम एक subscription product (Pro+) और API tier भी ऑफ़र कर सकते हैं, जिससे उसी content का programmatic access मिलता है।",
    },
    s2: {
      title: "2. ख़रीद और एक्सेस",
      p1: "Kits एक बार के डिजिटल डाउनलोड के रूप में बेची जाती हैं। भुगतान सफल होने पर हम आपको डाउनलोड लिंक ईमेल करते हैं, और आपकी ख़रीद /library पर उस ईमेल से एक्सेस की जा सकती है जो आपने चेकआउट पर दिया था। Pro+ subscriptions जब तक active हैं तब तक मौजूदा और आने वाली हर किट का एक्सेस देते हैं।",
      p2: "आप ख़रीदी हुई किट इस्तेमाल कर सकते हैं (a) अपने काम और अपने नियोक्ता के काम के लिए, (b) क्लाइंट के काम के लिए जहाँ किट डिलीवरेबल बनाने में मदद करती है, और (c) किसी भी AI टूल में जिसे आप चलाते हैं। आप किट कंटेंट को standalone product, package, या knowledge base के रूप में दोबारा बेच, redistribute, या publish नहीं कर सकते।",
    },
    s3: {
      title: "3. रिफ़ंड",
      p1: "Kit ख़रीद पर 14-दिन का रिफ़ंड दिया जाता है, अगर किट डाउनलोड नहीं हुई है। अगर किट डाउनलोड हो चुकी है, तो रिफ़ंड case-by-case देखे जाते हैं। पूरी जानकारी के लिए अलग Refund Policy देखिए। Subscription cancel करने से आगे के renewal रुक जाते हैं; मौजूदा बिलिंग पीरियड का रिफ़ंड नहीं होता।",
    },
    s4: {
      title: "4. बौद्धिक संपदा",
      p1: "हर kit का content — SKILL.md format expression, prompt structures, संबंधित documentation, kit के नाम, और marketing copy सहित — Lumenari की संपत्ति है और आपको Section 2 में बताए गए उपयोगों के लिए non-exclusive, non-transferable license पर दी गई है। AI का underlying behaviour, model output, और किट इस्तेमाल करके बनाया हुआ कोई भी work product आपका रहेगा।",
      p2: "Kits में बताए गए ब्रांड नाम, लोगो और trademarks (जैसे Claude, ChatGPT, Cursor, Gemini) अपने-अपने मालिकों के हैं। हम इनमें से किसी भी कंपनी से affiliated, endorsed, या sponsored नहीं हैं।",
    },
    s5: {
      title: "5. स्वीकार्य उपयोग",
      intro: "आप इन बातों पर सहमत हैं कि आप:",
      b1: "Service का इस्तेमाल ऐसा content बनाने या distribute करने के लिए नहीं करेंगे जो ग़ैरक़ानूनी, हानिकारक, अपमानजनक, मानहानिकारक, या नाबालिगों से जुड़ा यौनिक रूप से स्पष्ट हो;",
      b2: "Service का इस्तेमाल धोखाधड़ी, उत्पीड़न, या systems/data तक अनधिकृत पहुँच के लिए content बनाने में नहीं करेंगे;",
      b3: "Service को reverse-engineer, scrape, या thok में extract नहीं करेंगे (API के लिए legitimate programmatic use के अपने published terms हैं);",
      b4: "Service या किसी भी किट को, पूरे या आंशिक रूप से, अपने product या service के रूप में दोबारा नहीं बेचेंगे;",
      b5: "Public documentation या training material में अपनी derivative work फिर से publish करते वक़्त kit फ़ाइलों की attribution लाइनों को हटाएँगे, बदलेंगे, या छिपाएँगे नहीं।",
      outro:
        "इस सेक्शन का उल्लंघन होने पर हम बिना रिफ़ंड के access suspend या terminate कर सकते हैं।",
    },
    s6: {
      title: "6. AI-generated output disclaimer",
      p1: "Kits आपकी AI को बेहतर output देने में मदद करती हैं। वो ख़ुद output नहीं बनातीं। AI-generated content ग़लत, biased, या किसी ख़ास उद्देश्य के लिए अनुपयुक्त हो सकता है। AI का कोई भी output इस्तेमाल करने से पहले उसे review, verify, और edit करने की ज़िम्मेदारी आपकी है — ख़ासकर कानूनी, चिकित्सीय, वित्तीय, regulatory, या सुरक्षा से जुड़े संदर्भों में। हर kit file में दिए गए disclaimers (जैसे “कानूनी सलाह नहीं”, “चिकित्सीय सलाह नहीं”, “निवेश सलाह नहीं”) इन Terms का हिस्सा हैं।",
    },
    s7: {
      title: "7. प्राइवेसी",
      p1: "हम आपकी निजी जानकारी अपनी Privacy Policy में बताए गए तरीक़े से collect और इस्तेमाल करते हैं। Service का इस्तेमाल करते हुए आप वहाँ बताए गए collection और उपयोग पर सहमति देते हैं।",
    },
    s8: {
      title: "8. अस्वीकरण",
      p1: "Service “as is” और “as available” के आधार पर दिया जाता है, किसी भी प्रकार की warranty के बिना, चाहे वो express हो या implied, बिना merchantability, किसी ख़ास उद्देश्य के लिए उपयुक्तता, गैर-उल्लंघन, या Service में रुकावट या त्रुटि न होने की warranty सहित।",
    },
    s9: {
      title: "9. दायित्व की सीमा",
      p1: "कानून द्वारा अनुमत अधिकतम सीमा तक, इन Terms या Service से जुड़े किसी भी दावे के लिए Lumenari की कुल देयता उतनी ही होगी जितनी रक़म आपने दावे से पहले के बारह (12) महीनों में हमें दी है। हम indirect, incidental, consequential, special, punitive, या exemplary नुकसान के लिए ज़िम्मेदार नहीं हैं, चाहे ऐसे नुकसान की संभावना के बारे में हमें बताया गया हो।",
    },
    s10: {
      title: "10. DMCA और कॉपीराइट",
      p1: "हम बौद्धिक संपदा अधिकारों का सम्मान करते हैं। DMCA takedown notice भेजने के लिए hello@lumenari.io पर subject “DMCA Notice” के साथ ईमेल कीजिए और इनमें से ये शामिल कीजिए: (a) आपकी संपर्क जानकारी, (b) copyrighted कार्य की पहचान, (c) कथित उल्लंघन वाली सामग्री का URL, (d) सद्भावना का बयान, और (e) झूठी गवाही की सज़ा के तहत यह बयान कि जानकारी सही है। हम 10 कार्य दिवस में जवाब देते हैं।",
    },
    s11: {
      title: "11. शासी कानून और विवाद",
      p1: "ये Terms प्रांत Alberta के क़ानूनों और वहाँ लागू Canada के संघीय क़ानूनों द्वारा शासित हैं, बिना conflict-of-laws सिद्धांतों के। कोई भी विवाद Alberta की अदालतों में हल किया जाएगा, और आप और हम उनके अधिकार क्षेत्र पर सहमत हैं। United Nations Convention on Contracts for the International Sale of Goods लागू नहीं होगा।",
    },
    s12: {
      title: "12. समाप्ति",
      p1: "आप Service का इस्तेमाल कभी भी रोक सकते हैं। हम इन Terms का उल्लंघन होने या ग़ैरक़ानूनी इस्तेमाल पर, सूचना के साथ या बिना सूचना के, आपका access suspend या terminate कर सकते हैं। समाप्ति पर आपको Section 3 में बताए गए के अलावा कोई रिफ़ंड नहीं मिलेगा।",
    },
    s13: {
      title: "13. बदलाव",
      p1: "हम समय-समय पर इन Terms को अपडेट कर सकते हैं। बड़े बदलाव होमपेज पर और active subscribers को ईमेल पर बताए जाएँगे। बदलाव लागू होने के बाद Service का इस्तेमाल जारी रखना सहमति माना जाएगा।",
    },
    s14: {
      title: "14. संपर्क",
      p1: "hello@lumenari.io पर ईमेल कीजिए।",
    },
  },
  privacy: {
    eyebrow: "लीगल",
    title: "Privacy Policy",
    lastUpdatedPrefix: "आख़िरी अपडेट:",
    legalDisclaimer:
      "कानूनी प्राधिकार के लिए, अंग्रेज़ी संस्करण मान्य होगा।",
    intro:
      "यह Privacy Policy बताती है कि Lumenari (“हम”) lumenari.io पर Service के इस्तेमाल के दौरान आपकी निजी जानकारी कैसे collect, इस्तेमाल और सुरक्षित करता है। हम Canadian PIPEDA + Alberta PIPA, EU GDPR, UK GDPR, और California CCPA/CPRA का पालन करते हैं।",
    s1: {
      title: "1. हम क्या जानकारी इकट्ठा करते हैं",
      intro:
        "हम Service देने और कानूनी ज़िम्मेदारियाँ पूरी करने के लिए कम-से-कम ज़रूरी जानकारी ही collect करते हैं।",
      b1: "Account + transaction data — आपका ईमेल पता, billing address (Stripe द्वारा checkout के दौरान tax compliance के लिए collect किया गया), और आपने जो kits या subscription tier ख़रीदा है।",
      b2: "Lead-magnet sign-ups — आपका ईमेल अगर आप /free पर फ़्री किट माँगते हैं या हमारे newsletter को subscribe करते हैं।",
      b3: "Usage data — Plausible Analytics के ज़रिए anonymous page views। Plausible cookies नहीं use करता और निजी data collect नहीं करता। (कुछ Lumenari deployments PostHog का anonymous IDs के साथ इस्तेमाल करते हैं; नीचे “Third-party providers” देखिए।)",
      b4: "API usage data (केवल API platform customers के लिए) — API key id, hit किया गया endpoint, response status और duration, billing + rate limiting के लिए।",
      b5: "Communication data — आपकी हमें भेजी हुई ईमेल; lifecycle ईमेल के लिए Resend के delivery + open + click events।",
      b6: "Device data — आपका IP address और user-agent, hosting (Vercel) और CDN/security infrastructure द्वारा संयोग से captured, 30 दिन से ज़्यादा नहीं रखे जाते।",
      outro:
        "हम तब तक नाम, फ़ोन नंबर, या सरकारी ID collect नहीं करते जब तक आप ख़ुद से न दें।",
    },
    s2: {
      title: "2. हम आपकी जानकारी का इस्तेमाल कैसे करते हैं",
      b1: "ख़रीदारियाँ process करने और आपकी ख़रीदी हुई kits डिलीवर करने के लिए (अनुबंध की ज़रूरत);",
      b2: "Service चलाने के लिए — accounts provision करना, transactional ईमेल भेजना, दुरुपयोग रोकना (legitimate interest + अनुबंध की ज़रूरत);",
      b3: "जब आपने सहमति दी हो तब lifecycle marketing ईमेल भेजने के लिए (जैसे फ़्री kit लेने के बाद welcome series; अगर आप Pro+ subscriber हैं तो Pro+ digest);",
      b4: "Tax + accounting ज़िम्मेदारियाँ पूरी करने के लिए (कानूनी ज़िम्मेदारी);",
      b5: "Service बेहतर बनाने के लिए — केवल aggregated, anonymised analytics (legitimate interest)।",
      outro:
        "हम आपकी निजी जानकारी नहीं बेचते। हम इसे विज्ञापनदाताओं के साथ share नहीं करते। हम इसे AI models train करने के लिए इस्तेमाल नहीं करते।",
    },
    s3: {
      title: "3. Third-party processors",
      intro:
        "नीचे दिया हर processor हमारे साथ Data Processing Agreement (DPA) से बंधा है और data केवल हमारे निर्देशों पर ही process करता है।",
      b1: "Stripe — payment processing, tax calculation, invoicing। Stripe payment method details सीधे collect करता है; आपके कार्ड नंबर हम कभी नहीं देखते।",
      b2: "Resend — transactional + marketing ईमेल delivery। आपका ईमेल पता और हमारी भेजी ईमेल का content देखता है।",
      b3: "Supabase — Postgres database + authentication infrastructure। आपका account ईमेल और purchase history host करता है।",
      b4: "Vercel — application hosting + CDN। Request के समय IP + user-agent देखता है।",
      b5: "Anthropic — recommendation wizard के लिए model provider। आपके दिए use-case description को देखता है। Anthropic models train करने के लिए API inputs तब तक इस्तेमाल नहीं करता जब तक आप उस program में opt in न करें।",
      b6: "Plausible (या deployment के हिसाब से PostHog) — privacy का सम्मान करने वाला analytics। Plausible cookieless है। PostHog anonymous, salted device IDs इस्तेमाल करता है।",
    },
    s4: {
      title: "4. Cookies",
      intro: "हम चलाने के लिए कम-से-कम ज़रूरी cookies का इस्तेमाल करते हैं:",
      b1: "lumenari_locale — हमारे multi-locale storefront के लिए आपकी पसंदीदा भाषा याद रखता है।",
      b2: "lumenari_admin — signed admin session cookie (HttpOnly, केवल तब set होता है जब आप /admin पर सफलतापूर्वक log in करें)।",
      b3: "lumenari_ref — referral attribution cookie (केवल तब set होता है जब आप referral link से आते हैं)।",
      outro:
        "हम third-party advertising या tracking cookies इस्तेमाल नहीं करते। Plausible और cookieless analytics path डिफ़ॉल्ट है; PostHog cookie केवल तब set होती है जब उसे explicit रूप से enable किया जाए।",
    },
    s5: {
      title: "5. Data retention",
      b1: "ख़रीदारियाँ + invoices — 7 साल तक रखे जाते हैं (Canadian tax कानून की ज़रूरत)।",
      b2: "Newsletter + lead-magnet ईमेल — जब तक आप unsubscribe न करें या deletion न माँगें, तब तक रखे जाते हैं।",
      b3: "Pro+ subscription data — जब तक subscription active है और उसके बाद 7 साल तक वित्तीय रिकॉर्ड के लिए।",
      b4: "API usage logs — 90 दिन, फिर aggregate करके raw rows delete कर दी जाती हैं।",
      b5: "ईमेल delivery + engagement events — 18 महीने।",
    },
    s6: {
      title: "6. आपके अधिकार",
      intro:
        "आपके क्षेत्राधिकार के हिसाब से (GDPR, UK GDPR, CCPA/CPRA, PIPEDA), आपके पास ये अधिकार हैं:",
      b1: "हमारे पास मौजूद आपकी निजी जानकारी देखने का;",
      b2: "ग़लत या अधूरी जानकारी सुधारने का;",
      b3: "अपनी निजी जानकारी delete करने का (ऊपर बताई retention ज़िम्मेदारियों के अधीन);",
      b4: "अपना data portable format में export करने का;",
      b5: "Marketing के लिए processing पर आपत्ति या उसे सीमित करने का;",
      b6: "कभी भी सहमति वापस लेने का (पहले की processing पर असर नहीं पड़ेगा);",
      b7: "अपनी data-protection authority के पास शिकायत दर्ज करने का (Office of the Privacy Commissioner of Canada; या EU/UK में अपनी local DPA)।",
      outro:
        "इनमें से कोई अधिकार इस्तेमाल करने के लिए hello@lumenari.io पर ईमेल कीजिए। हम 30 दिन में जवाब देते हैं (CCPA पर लागू requests के लिए 10 दिन)।",
    },
    s7: {
      title: "7. बच्चे",
      p1: "Service 16 साल से कम उम्र के बच्चों के लिए नहीं बनाया गया है। हम जानबूझकर बच्चों से निजी जानकारी collect नहीं करते। अगर हमें पता चलता है कि किसी बच्चे ने निजी जानकारी दी है, तो हम उसे delete कर देते हैं।",
    },
    s8: {
      title: "8. अंतरराष्ट्रीय data transfers",
      p1: "Lumenari Canada से चलता है। Stripe, Resend, Supabase, और Vercel data को United States और/या European Union में store कर सकते हैं। जहाँ लागू हो, हम EU/UK से बाहर transfer के लिए Standard Contractual Clauses + supplementary तकनीकी उपायों पर निर्भर रहते हैं।",
    },
    s9: {
      title: "9. सुरक्षा",
      p1: "Service के सभी connections TLS का इस्तेमाल करते हैं। Passwords store नहीं होते — हम email-based magic links और Stripe-hosted checkout इस्तेमाल करते हैं। Service-role database access केवल server processes तक सीमित है। हर Supabase table जिसमें customer data है, उस पर Row-Level Security enabled है।",
    },
    s10: {
      title: "10. बदलाव",
      p1: "इस Policy में बड़े बदलाव लागू होने से कम से कम 14 दिन पहले होमपेज पर बताए जाएँगे और active subscribers को ईमेल किए जाएँगे।",
    },
    s11: {
      title: "11. संपर्क",
      p1: "किसी भी privacy सवाल के लिए या ऊपर बताए अधिकारों का इस्तेमाल करने के लिए hello@lumenari.io पर ईमेल कीजिए।",
    },
  },
  refunds: {
    eyebrow: "लीगल",
    title: "Refund Policy",
    lastUpdatedPrefix: "आख़िरी अपडेट:",
    legalDisclaimer:
      "कानूनी प्राधिकार के लिए, अंग्रेज़ी संस्करण मान्य होगा।",
    intro:
      "हम चाहते हैं कि आप अपनी ख़रीद से ख़ुश रहें। अगर कोई किट आपके काम नहीं आ रही, तो हम रिफ़ंड ऐसे handle करते हैं।",
    s1: {
      title: "एक बार की kit और bundle ख़रीदें",
      b1: "अगर आपने किट डाउनलोड नहीं की है तो 14 दिन में पूरा रिफ़ंड। hello@lumenari.io पर उस ईमेल से लिखिए जो आपने checkout पर इस्तेमाल किया था। हम इसे 5 कार्य दिवस में process कर देते हैं; Stripe को कार्ड स्टेटमेंट पर दिखाने में और 5-10 दिन लगते हैं।",
      b2: "अगर आपने किट डाउनलोड कर ली है पर वो आपके workflow में फ़िट नहीं हुई — 14 दिन में आंशिक रिफ़ंड। हम 50% तक रिफ़ंड case-by-case देते हैं। इस band का मकसद policy को ईमानदार रखना है और साथ ही हमें कैटलॉग का मुफ़्त preview चैनल बनने से बचाना है।",
      b3: "14 दिन के बाद रिफ़ंड हमारे विवेक पर है। जब असली शिकायत वाजिब हो (जैसे किट कंटेंट वैसा नहीं था जैसा kit पेज पर बताया गया था) तब हम लगभग हमेशा विनम्र अनुरोध मान लेते हैं। “मैंने ख़रीद लिया और भूल गया” जैसे मामलों में बहुत कम।",
    },
    s2: {
      title: "Pro+ subscriptions",
      b1: "आप Pro+ subscription कभी भी /library से या किसी भी Pro+ ईमेल का जवाब देकर cancel कर सकते हैं। Cancellation मौजूदा billing पीरियड के अंत में लागू होता है — तब तक आपका access बना रहता है।",
      b2: "नए subscription के पहले 7 दिनों में: माँगने पर मौजूदा पीरियड का पूरा रिफ़ंड, कोई सवाल नहीं।",
      b3: "7 दिनों के बाद: मौजूदा पीरियड का रिफ़ंड नहीं; आगे की billing रोक देते हैं।",
      b4: "Pro+ Lifetime: अगर आपने कोई किट डाउनलोड नहीं की है तो 14 दिन में रिफ़ंड। 14 दिनों के बाद या कोई किट डाउनलोड होने के बाद कोई रिफ़ंड नहीं। (वास्तव में असामान्य परिस्थितियों में हम अपवाद करते हैं — बस हमें ईमेल कीजिए।)",
    },
    s3: {
      title: "API platform tiers",
      b1: "Pro tier: 7 दिनों के अंदर refundable अगर आपका usage 100 API calls से कम था। उसके बाद, मौजूदा महीने का रिफ़ंड नहीं; cancel करने पर आगे की billing रोक देते हैं।",
      b2: "Business / Scale: case-by-case refundable। Account manager (फ़िलहाल Chris) संपर्क हैं।",
      b3: "Free tier: कोई पैसा नहीं लिया गया; कोई रिफ़ंड लागू नहीं।",
    },
    s4: {
      title: "Chargebacks",
      p1: "अगर आप हमें पहले ईमेल किए बिना chargeback शुरू करते हैं, तो Service पर आपका access तुरंत निलंबित कर दिया जाता है। हम पूरी ख़रीद + access history के साथ dispute का जवाब देते हैं। हम fraudulent chargeback शुरू करने वाले customer पर permanent ban लगाने का अधिकार रखते हैं। ईमानदार disputes पर एक विनम्र फ़ोन कॉल (या ईमेल reply) मिलता है और बिना fees के सीधे रिफ़ंड का प्रस्ताव।",
    },
    s5: {
      title: "रिफ़ंड कैसे माँगें",
      intro: "hello@lumenari.io पर ईमेल भेजिए जिसमें ये हो:",
      b1: "वो ईमेल जो आपने checkout पर इस्तेमाल किया था;",
      b2: "kit slug या bundle slug (जैसे sales-outreach-pro);",
      b3: "आप क्या चाहते थे जो किट ने नहीं दिया। ईमानदार feedback हमें किट सुधारने में मदद करता है — इससे आपके रिफ़ंड पर कोई असर नहीं पड़ता।",
      outro:
        "हम आपसे फ़ॉर्म नहीं भरवाते। हम आपको support bot के पास नहीं भेजते। एक असली इंसान इसे पढ़ता है।",
    },
    s6: {
      title: "संपर्क",
      p1: "ख़रीदने से पहले कोई सवाल? हमें ईमेल कीजिए — आप ख़रीद कर पछताएँ इससे बेहतर है कि हम जवाब दें। hello@lumenari.io.",
    },
  },
  blog: {
    eyebrow: "ब्लॉग",
    title: "रणनीतियाँ, गहराई से विश्लेषण, और case studies।",
    subtitle:
      "Claude, ChatGPT, Cursor, और बाकी AI stack से ज़्यादा हासिल करना — बिना consultant जैसी भारी-भरकम बातों के।",
    readPost: "पोस्ट पढ़ें",
    allPosts: "सभी पोस्ट",
    featuredInPostEyebrow: "इस पोस्ट में दिखाए गए",
    getThisKit: "यह किट लें",
  },
  vs: {
    eyebrow: "ईमानदार तुलना",
    titlePrefix: "Lumenari बनाम",
    allKits: "सभी किट",
    featureColumn: "फ़ीचर",
    whereLumenariWins: "जहाँ Lumenari आगे है",
    whereCompetitorWinsPrefix: "जहाँ",
    whereCompetitorWinsSuffix: "आगे है",
    faq: "आम सवाल",
    finalCtaTitle: "कैटलॉग ख़ुद देखिए।",
    finalCtaBody: "20+ किट, 6 बंडल, हर किट के लिए चार फ़ॉर्मैट।",
    finalCtaButton: "सभी किट देखें",
  },
  useCaseLanding: {
    eyebrow: "ख़रीदार की गाइड",
    allKits: "सभी किट",
    titlePrefix: "सबसे अच्छी Claude skill",
    ourPick: "हमारी पसंद",
    whyThisKit: "यह किट क्यों",
    oneTimeLifetime: "एक बार भुगतान, जीवनभर एक्सेस।",
    getThisKit: "यह किट लें",
    seeKit: "किट देखें",
    relatedKits: "संबंधित किट",
    see: "देखें",
    faq: "आम सवाल",
    comparePrefix: "किसके लिए AI टूल की तुलना",
    compareSuffix: "? देखें",
    claudeVsChatGpt: "Claude बनाम ChatGPT",
    browseAll: "सभी किट देखें →",
  },
  accountApi: {
    eyebrow: "API account",
    signInTitle: "अपनी keys manage करने के लिए साइन इन कीजिए।",
    signInBody:
      "अपना ईमेल डालिए और हम आपको एक-क्लिक sign-in link भेजेंगे।",
    signInNoticeFallback:
      "यह लिंक एक्सपायर हो गया है या काम नहीं कर रहा। नया लिंक पाने के लिए नीचे अपना ईमेल डालिए।",
    signedInAs: "इस रूप में साइन इन",
    currentTier: "मौजूदा tier",
    tierFreeFallback: "Free",
    upgrade: "अपग्रेड",
    changePlan: "प्लान बदलें",
    thisMonth: "इस महीने",
    callsSuffix: "calls",
    quotaWarningPrefix: "आपने इस्तेमाल किया है",
    quotaWarningSuffix:
      "% मासिक quota का। सीमा पर पहुँचने से पहले upgrade करने पर विचार कीजिए।",
    apiDocsTitle: "API डॉक्युमेंटेशन",
    apiDocsBody: "Endpoints, उदाहरण, rate limits।",
    pricingTitle: "Pricing और tiers",
    pricingBody: "Free, Pro, Business, Enterprise की तुलना कीजिए।",
  },
  apiKeysManager: {
    heading: "API keys",
    generateNewKey: "नई key बनाएँ",
    noKeysBody:
      "अभी कोई key नहीं है। API call करना शुरू करने के लिए एक बनाइए।",
    generateFirstKey: "अपनी पहली key बनाएँ",
    createdPrefix: "बनाई गई",
    lastUsedPrefix: "अंतिम इस्तेमाल",
    neverUsed: "कभी इस्तेमाल नहीं",
    confirmRevoke: "Revoke की पुष्टि कीजिए",
    cancel: "रद्द करें",
    revokedKeys: "Revoked keys",
    revokedPrefix: "Revoked",
    newApiKey: "नई API key",
    newApiKeyBody:
      "Key को एक नाम दीजिए ताकि आप बाद में पहचान सकें।",
    name: "नाम",
    placeholderName: "Production",
    generating: "बना रहे हैं…",
    generateKey: "Key बनाएँ",
    saveKeyNow: "अभी अपनी key सेव कीजिए।",
    saveKeyNowBody:
      "यह एकमात्र बार है जब हम पूरी key दिखा रहे हैं। हम केवल hash store करते हैं — हम इसे वापस नहीं ला सकते।",
    copy: "Clipboard पर कॉपी करें",
    copied: "कॉपी हो गया",
    iSavedIt: "मैंने सेव कर ली",
    couldNotCreate: "Key नहीं बना सके",
    couldNotRevoke: "Key revoke नहीं कर सके",
    somethingWentWrong: "कुछ गड़बड़ हो गई",
    untitled: "बिना नाम",
  },
  referralsPage: {
    eyebrow: "आपके referrals",
    signInTitle: "अपना code देखने के लिए साइन इन कीजिए।",
    signInBody:
      "वो ईमेल डालिए जो आपने checkout पर इस्तेमाल किया था — हम आपको इस पेज का नया लिंक ईमेल कर देंगे।",
    expiredTitle: "यह लिंक एक्सपायर हो गया है।",
    expiredBody: "अपना ईमेल डालिए और हम आपको नया भेज देंगे।",
    title: "Lumenari शेयर कीजिए। किट कमाइए।",
    subtitle:
      "अपना link किसी को भी भेजिए जिसे Claude / ChatGPT / Cursor किट काम आ सके। 3 paid referrals के बाद आपको एक फ़्री किट अनलॉक होगी।",
    yourLink: "आपका link",
    linkExplainer:
      "इस link से Lumenari किट ख़रीदने वाला हर व्यक्ति referral माना जाएगा। Cookie 30 दिन तक चलती है।",
    progress: "Progress",
    paidReferralsSuffix: "paid referrals",
    unlocked:
      "फ़्री किट अनलॉक हो गई। नीचे अपने credits देखिए।",
    remainingTemplate:
      "फ़्री किट अनलॉक करने के लिए {count} और paid referral{plural}।",
    activity: "गतिविधि",
    noReferrals:
      "अभी कोई referral नहीं। शुरुआत के लिए ऊपर अपना link शेयर कीजिए।",
    referralOnPrefix: "Referral on",
    credited: "Credit किया गया",
    pending: "लंबित",
    yourCredits: "आपके credits",
    freeKitCredit: "फ़्री किट credit",
    redeemed: "Redeem किया गया",
    readyToUse: "उपयोग के लिए तैयार",
    redeemBodyPrefix: "ईमेल",
    redeemBodySuffix:
      "credit redeem करने के लिए। (Self-serve redemption जल्द आ रहा है।)",
    backToLibrary: "← लाइब्रेरी पर वापस",
  },
  wizardPage: {
    titleTag: "अपनी किट खोजें — Lumenari recommender",
    descTag:
      "आप किस पर काम कर रहे हैं वो आम भाषा में बताइए। Lumenari कैटलॉग से सबसे सटीक किट सुझाएगा।",
  },
  libraryLookup: {
    emailLabel: "ईमेल",
    emailPlaceholder: "you@example.com",
    send: "मेरे डाउनलोड भेजें",
    sending: "लिंक भेजा जा रहा है…",
    couldNotSend: "लिंक नहीं भेज सके",
    somethingWentWrong: "कुछ गड़बड़ हो गई",
    inboxTitle: "अपना इनबॉक्स देखिए।",
    inboxBodyPrefix: "अगर हमारे पास",
    inboxBodySuffix: "का रिकॉर्ड है, तो आपके डाउनलोड लिंक रास्ते में हैं।",
    passwordlessNote:
      "कोई पासवर्ड नहीं। Link signed है और 24 घंटे के लिए वैध है।",
  },
  accountSignIn: {
    workEmail: "वर्क ईमेल",
    placeholder: "you@yourcompany.com",
    send: "मुझे साइन-इन लिंक भेजें",
    sending: "लिंक भेजा जा रहा है…",
    couldNotSend: "लिंक नहीं भेज सके",
    somethingWentWrong: "कुछ गड़बड़ हो गई",
    inboxTitle: "अपना इनबॉक्स देखिए।",
    inboxBodyPrefix: "हमने साइन-इन लिंक भेजा है",
    inboxBodySuffix: "पर। अपना API dashboard खोलने के लिए उस पर क्लिक कीजिए।",
    newHereNote:
      "यहाँ नए हैं? हम अपने आप एक free-tier account बना देंगे।",
  },
  buyButton: {
    defaultLabel: "यह किट लें",
    opening: "Stripe खुल रहा है…",
    checkoutFailed: "Checkout असफल",
  },
  proCheckout: {
    defaultLabel: "Pro+ पर अपग्रेड करें",
    opening: "Stripe खुल रहा है…",
    checkoutFailed: "Checkout असफल",
  },
  apiCheckout: {
    titleProPrefix: "शुरू कीजिए",
    proName: "Pro",
    businessName: "Business",
    titleSuffix: "प्लान",
    body: "Checkout के बाद हम आपकी API key इस ईमेल पर भेजेंगे।",
    email: "ईमेल",
    placeholderEmail: "you@yourcompany.com",
    organizationLabel: "Organization",
    organizationOptional: "(वैकल्पिक)",
    placeholderOrganization: "Acme, Inc.",
    cancel: "रद्द करें",
    redirecting: "Redirect किया जा रहा है…",
    continue: "Checkout पर जाएँ",
    couldNotStart: "Checkout शुरू नहीं कर सके",
    somethingWentWrong: "कुछ गड़बड़ हो गई",
  },
  saveKit: {
    save: "किट सेव करें",
    saving: "सेव हो रहा है…",
    savedBadge: "आपकी लाइब्रेरी में सेव हो गई",
    modalTitlePrefix: "सेव करें",
    modalTitleSuffix: "बाद के लिए",
    modalBody:
      "अपना ईमेल डालिए और अगर इस किट की कीमत गिरती है या यह किसी बंडल में आती है तो हम आपको बताएँगे। कोई स्पैम नहीं, कभी भी unsubscribe कीजिए।",
    emailPlaceholder: "you@work.com",
    submit: "किट सेव करें",
    invalidEmail: "कृपया एक वैध ईमेल डालिए।",
    alreadySaved:
      "पहले से सेव है — यह आपकी /library wishlist पर है।",
    savedNotificationPrefix: "सेव हो गई। हम आपको ईमेल करेंगे अगर",
    savedNotificationSuffix:
      "की कीमत गिरती है या यह किसी नए बंडल में आती है।",
    somethingWentWrong: "कुछ गड़बड़ हो गई।",
    close: "बंद करें",
  },
  leadMagnet: {
    placeholder: "you@work.com",
    submit: "मेरी फ़्री किट दीजिए",
    submitting: "भेजा जा रहा है…",
    invalidEmail: "कृपया एक वैध ईमेल डालिए।",
    somethingWentWrong: "कुछ गड़बड़ हो गई।",
    successTitle: "आप अंदर हैं।",
    successBodyDefault:
      "अपना इनबॉक्स देखिए — किट और Chris का एक छोटा नोट रास्ते में हैं।",
  },
  newsletter: {
    emailLabel: "ईमेल",
    placeholder: "you@example.com",
    subscribe: "Subscribe",
    subscribing: "Subscribe किया जा रहा है...",
    sendFreeKit: "मेरी फ़्री किट भेजें",
    exitTitle: "एक फ़्री किट हमारी तरफ़ से।",
    exitBody:
      "Lumenari newsletter subscribe कीजिए और हम welcome email के साथ आपकी पहली किट मुफ़्त भेजेंगे। हफ़्ते में एक उपयोगी ईमेल, कोई बेकार बात नहीं।",
    fallbackError: "कुछ गड़बड़ हो गई। कृपया फिर try कीजिए।",
    fallbackUnreachable:
      "हमारे server तक नहीं पहुँच सके। फिर try कीजिए।",
    fallbackSuccess:
      "अपनी ईमेल देखिए — हमने एक confirmation link भेजा है।",
    close: "बंद करें",
    formAria: "Lumenari newsletter subscribe करें",
  },
  referralLinkCopy: {
    aria: "आपका referral link",
    copy: "कॉपी",
    copied: "कॉपी हो गया",
  },
};
