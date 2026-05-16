# Quick Start — installation 60 secondes

Trois paragraphes, un par plateforme. Choisissez le vôtre, collez, testez.

---

## Claude (claude.ai ou Claude via l'API)

Créez un nouveau Project. Nommez-le « Recruiter Co-Pilot ». Dans le champ **Instructions** du Project, collez l'intégralité de `optimization-pack.md`. Sauvegardez. Chaque chat dans ce Project tourne désormais en mode recruteur — rédacteur de JD, drafter d'outreach, constructeur de kit d'entretien, générateur de chaînes booléennes. Pour un usage ponctuel, collez l'optimization pack comme premier message dans une nouvelle conversation. Bonus : déposez vos JDs existants performants et les outreach les plus répondus dans la knowledge base du Project — l'IA référencera la vraie voix et la marque de votre équipe en rédigeant les nouveaux.

**Testez-le :** démarrez un nouveau chat dans le Project et collez le prompt de test ci-dessous.

---

## ChatGPT (Custom GPT ou conversation ponctuelle)

Pour un Custom GPT (Plus ou Team) : allez dans « My GPTs » → « Create a GPT » → « Configure ». Dans le champ **Instructions**, collez `custom-gpt-instructions.md`. Nommez-le « Recruiter Co-Pilot ». Description : « JDs sans le jargon, outreach qui obtient des réponses, kits d'entretien, chaînes booléennes. » Sauvegardez. Pour un usage ponctuel, collez `optimization-pack.md` comme premier message dans n'importe quel thread standard.

**Testez-le :** ouvrez votre nouveau GPT et collez le prompt de test ci-dessous.

---

## Gemini, Cursor, Codex (ou toute autre IA)

Pour **Gemini Advanced**, créez un nouveau Gem. Collez l'optimization pack dans le champ instructions du Gem, sauvegardez et utilisez ce Gem pour le travail de recrutement. Pour **Cursor**, ce kit est moins applicable (Cursor c'est pour le code), mais si vous écrivez des JDs en MDX dans un repo de page carrières, collez l'optimization pack dans `.cursorrules`. Pour **Codex / GitHub Copilot Chat / toute autre IA**, collez l'optimization pack comme premier message dans une nouvelle conversation et recollez-le au début de tout nouveau thread.

**Testez-le :** utilisez le prompt de test ci-dessous pour confirmer l'installation.

---

## Prompt de test à coller

```
Je recrute un Senior Full-Stack Engineer dans un SaaS Série B de 30 personnes. Remote-first, US + Canada. Stack : TypeScript, React, Node, Postgres sur AWS. Fourchette salariale : USD 170-210K base + 0,05-0,15 % equity. Le hiring manager a écrit un JD et je trouve qu'il est mauvais. Voici ce qu'il a envoyé :

"We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

J'ai besoin :
1. D'un bias lint de ce qu'il a envoyé (phrases spécifiques signalées et pourquoi)
2. D'un JD complet réécrit utilisant le format du kit
3. D'un template d'outreach pour DM-er à froid des senior engineers (3 lignes max dans l'ouverture)
4. D'une chaîne booléenne LinkedIn Recruiter pour des senior engineers avec TypeScript + React + Node qui ont shippé dans des startups
```

Vous devriez recevoir : un passage de lint qui signale « passionate », « rock star », « fast-paced », « 10x developer », « wear many hats », « Bachelor's degree required », « 10+ years », « work hard play hard » et « like a family » — avec des fixes spécifiques pour chacun. Puis un JD propre d'environ 500 mots avec fourchette salariale, vrais outcomes de « what you'll do », un vrai process d'entretien et une section sur les modalités de travail. Puis un outreach de trois lignes qui nomme une raison qui sonne réelle pour le message. Puis une chaîne booléenne avec les clauses expliquées, plus 2 variantes si la première remonte trop peu ou trop de résultats.

Si vous récupérez un JD avec « rock star » toujours dedans, ou un outreach sans fourchette de comp mentionnée, l'optimization pack n'est pas chargé. Recollez-le.
