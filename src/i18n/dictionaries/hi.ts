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
    step2Subtitle:
      "एक-दो लाइन काफ़ी है। आम बोलचाल की भाषा में बताइए।",
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
  library: {
    eyebrow: "आपकी लाइब्रेरी",
    welcomeBack: "वापसी पर स्वागत है।",
    enterEmail:
      "वो ईमेल लिखिए जो आपने चेकआउट के समय इस्तेमाल किया था। हम आपको नया डाउनलोड लिंक भेज देंगे।",
    email: "ईमेल",
    emailPlaceholder: "you@example.com",
    send: "मेरे डाउनलोड भेजें",
    sending: "लिंक भेजा जा रहा है…",
    checkInbox: "अपना इनबॉक्स देखिए।",
    checkInboxBody:
      "अगर {email} पर हमारा रिकॉर्ड है, तो आपके डाउनलोड लिंक रास्ते में हैं।",
    everythingUnlocked: "सब कुछ अनलॉक्ड।",
    yourKits: "आपकी किट।",
    proSubtitle:
      "Pro+ मेम्बर्स को मौजूदा और आने वाली हर किट मिलती है। नीचे से कोई भी डाउनलोड कीजिए।",
    standardSubtitle:
      "जो आपने ख़रीदा है, वो डाउनलोड कीजिए। लिंक कभी एक्सपायर नहीं होते।",
    download: "डाउनलोड",
    upgradeNudge: "क्या आप 20+ किट चाहते हैं?",
    upgradeNudgeCta: "Pro+ पर अपग्रेड करें",
    expiredLink:
      "यह लिंक एक्सपायर हो गया है या काम नहीं कर रहा। नया लिंक पाने के लिए अपना ईमेल लिखिए।",
    passwordlessNote:
      "कोई पासवर्ड नहीं। लिंक साइन्ड है और 24 घंटे के लिए वैध है।",
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
  },
  cart: {
    eyebrow: "एक-स्टेप चेकआउट",
    title: "हमने जान-बूझकर कार्ट नहीं रखा।",
    body:
      "एक किट चुनिए, चेकआउट कीजिए, और एक मिनट के अंदर आप लाइब्रेरी में हैं। एक से ज़्यादा किट चाहिए? बंडल ले लीजिए।",
    browseKits: "किट देखें",
    seeBundle: "बंडल देखें",
  },
};
