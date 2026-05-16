/**
 * French (fr) dictionary.
 *
 * Standard French (France) — also readable in Quebec, Belgium, Switzerland,
 * and Francophone Africa. Tone: professional, polite "vous" form.
 *
 * Preserve {placeholder} tokens exactly — they're substituted at render time.
 */

import type { Dictionary } from "./en";

export const fr: Dictionary = {
  nav: {
    kits: "Kits",
    library: "Bibliothèque",
    pro: "Pro+",
    findYourKit: "Trouvez votre kit",
  },
  hero: {
    eyebrow: "Kits d'optimisation",
    headline_a: "Faites travailler votre IA",
    headline_b: "comme un",
    headline_highlight: "coéquipier expérimenté.",
    subhead:
      "Des kits soigneusement conçus de prompts, de compétences et de schémas — installez-les et regardez Claude, ChatGPT ou Cursor passer de la démo à la livraison.",
    ctaPrimary: "Trouvez votre kit",
    ctaSecondary: "Parcourir le catalogue",
  },
  home: {
    launchShelfEyebrow: "Le catalogue de lancement",
    launchShelfHeading: "{count} kits. De vrais livrables.",
    seeAllKits: "Voir tous les kits",
  },
  wizard: {
    step: "Étape",
    of: "sur",
    startOver: "Recommencer",
    step1Title: "Quelle IA utilisez-vous ?",
    step1Subtitle:
      "Choisissez l'outil que vous utilisez le plus. Nous y associerons un kit.",
    continue: "Continuer",
    step2Title: "Pour quoi l'utilisez-vous ?",
    step2Subtitle:
      "Une ou deux phrases suffisent. Restez simple et direct.",
    step2Placeholder:
      "ex. Je suis agent immobilier à Lyon, je rédige des annonces et fais le suivi des acheteurs.",
    back: "Retour",
    showMyKit: "Voir mon kit",
    thinking: "Réflexion en cours…",
    step3Title: "Conçu pour ce que vous nous avez décrit.",
    step3Subtitle:
      "Achetez un kit seul, ou choisissez un pack ci-dessous et économisez.",
    bundle: "Pack",
    saves: "économisez",
  },
  kits: {
    eyebrowShelf: "Le catalogue",
    catalogTitle: "Choisissez un kit. Ou prenez un pack.",
    catalogSubtitle:
      "Chaque kit est un téléchargement unique — un SKILL.md, un prompt système universel, et un ensemble de fichiers à glisser dans l'outil IA de votre choix.",
    individualKits: "Kits individuels",
    featuredBundles: "Packs en vedette",
    moreBundles: "Autres packs",
    allKits: "Tous les kits",
    seeBundle: "Voir le pack",
    seeWhatsInside: "Voir le contenu",
    oneTime: "Paiement unique",
    whatsInside: "Ce qu'il contient",
    filesYouReceive: "Fichiers que vous recevrez",
    eyebrowKit: "Pack d'optimisation",
    optimizedFor: "Optimisé pour",
    getThisKit: "Obtenir ce kit",
    getThisBundle: "Obtenir ce pack",
    lifetimeAccess:
      "Paiement unique, accès à vie. Téléchargement instantané après l'achat.",
    pairsWellWith: "Se marie bien avec",
    recommendedTitle: "Les outils que nous recommandons avec ce kit.",
    recommendedSub:
      "Compagnons soigneusement sélectionnés pour le workflow du kit. Les clients de Lumenari les utilisent souvent en complément des prompts inclus.",
    disclosure:
      "Divulgation : nous pouvons percevoir une commission sur les liens de cette section. Nous ne recommandons que des outils que nous utilisons nous-mêmes.",
  },
  library: {
    eyebrow: "Votre bibliothèque",
    welcomeBack: "Bon retour parmi nous.",
    enterEmail:
      "Saisissez l'adresse e-mail utilisée lors de l'achat. Nous vous enverrons un nouveau lien de téléchargement.",
    email: "E-mail",
    emailPlaceholder: "vous@exemple.com",
    send: "Envoyer mes téléchargements",
    sending: "Envoi du lien…",
    checkInbox: "Vérifiez votre boîte de réception.",
    checkInboxBody:
      "Si nous avons un compte associé à {email}, vos liens de téléchargement sont en chemin.",
    everythingUnlocked: "Tout est déverrouillé.",
    yourKits: "Vos kits.",
    proSubtitle:
      "Les membres Pro+ ont accès à tous les kits actuels et à venir. Téléchargez n'importe lequel ci-dessous.",
    standardSubtitle:
      "Téléchargez ce que vous avez acheté. Les liens n'expirent jamais.",
    download: "Télécharger",
    upgradeNudge: "Vous voulez les 20+ kits ?",
    upgradeNudgeCta: "Passer à Pro+",
    expiredLink:
      "Ce lien a expiré ou n'est plus valide. Saisissez votre adresse e-mail pour en recevoir un nouveau.",
    passwordlessNote:
      "Pas de mot de passe. Le lien est signé et valable 24 heures.",
  },
  pro: {
    eyebrow: "Lumenari Pro+",
    headline_a: "Tous les kits. Toutes les sorties.",
    headline_highlight: "Un seul abonnement.",
    subhead:
      "Pro+ débloque l'intégralité du catalogue Lumenari — y compris chaque nouveau kit que nous publions — pour le prix de deux kits unitaires par an.",
    monthly: "Mensuel",
    annual: "Annuel",
    lifetime: "À vie",
    perMonth: "/mois",
    perYear: "/an",
    once: "une fois",
    tryItCancel: "Essayez. Annulez à tout moment.",
    payOnce: "Payez une fois. C'est à vous pour toujours.",
    annualSavings: "Économisez {amount} par rapport au mensuel.",
    whatYouGet: "Ce que vous obtenez",
    vsFree: "Pro+ vs. kits à l'unité",
    faq: "Questions fréquentes",
    ctaMonthly: "Commencer en mensuel",
    ctaAnnual: "Passer à l'annuel",
    ctaLifetime: "Obtenir à vie",
    opening: "Ouverture de Stripe…",
    upgradeButton: "Passer à Pro+",
  },
  thanks: {
    eyebrow: "C'est validé",
    title: "Votre kit est en route.",
    body:
      "Nous venons de vous envoyer le reçu et un lien de téléchargement par e-mail. Ouvrez-le sur la machine où vous utiliserez le kit.",
    openLibrary: "Ouvrir la bibliothèque",
    browseMore: "Parcourir d'autres kits",
  },
  footer: {
    browseKits: "Parcourir les kits",
    library: "Bibliothèque",
  },
  cart: {
    eyebrow: "Paiement en une étape",
    title: "Nous évitons le panier exprès.",
    body:
      "Choisissez un kit, validez, et vous êtes dans la bibliothèque en moins d'une minute. Envie de plusieurs kits ? Prenez un pack.",
    browseKits: "Parcourir les kits",
    seeBundle: "Voir le pack",
  },
};
