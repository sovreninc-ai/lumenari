# Quick Start — installation 60 secondes

Trois paragraphes, un par plateforme. Choisissez le vôtre, collez, testez.

---

## Claude (claude.ai ou Claude via l'API)

Créez un nouveau Project dans Claude. Nommez-le « SEO Content Strategist ». Dans le champ **Instructions** du Project, collez l'intégralité du contenu de `optimization-pack.md`. Sauvegardez. Chaque chat dans ce Project tourne désormais comme un stratège SEO senior — outliner, rédacteur d'articles, générateur meta + schéma, conseiller refresh. Pour un usage ponctuel, collez l'optimization pack comme premier message dans une nouvelle conversation. Bonus : déposez vos articles existants les plus performants dans la knowledge base du Project ; l'IA référencera votre vraie structure d'URL et votre tonalité en suggérant des liens internes.

**Testez-le :** démarrez un nouveau chat dans le Project et collez le prompt de test ci-dessous.

---

## ChatGPT (Custom GPT ou conversation ponctuelle)

Pour un Custom GPT (Plus ou Team) : allez dans « My GPTs » → « Create a GPT » → « Configure ». Dans le champ **Instructions**, collez `custom-gpt-instructions.md`. Nommez-le « SEO Content Strategist ». Description : « Plans, longform, meta, schéma et playbook de refresh — niveau stratège, pas niveau freelance. » Activez le web browsing si vous voulez qu'il lise les SERP en direct (sinon vous collerez le top 10 manuellement). Sauvegardez et discutez. Pour un usage ponctuel, collez `optimization-pack.md` comme premier message dans n'importe quel thread standard.

**Testez-le :** ouvrez votre nouveau GPT et collez le prompt de test ci-dessous.

---

## Gemini, Cursor, Codex (ou toute autre IA)

Pour **Gemini Advanced**, créez un nouveau Gem. Collez l'optimization pack dans le champ instructions du Gem, sauvegardez et utilisez ce Gem pour le travail SEO. L'accès web en direct de Gemini est utile ici — laissez-le récupérer les SERP actuelles quand vous demandez. Pour **Cursor**, collez l'optimization pack dans `.cursorrules` si vous voulez de l'aide SEO dans votre éditeur de code pour du contenu de site statique (MDX, hugo, etc.). Pour **Codex / GitHub Copilot Chat / toute autre IA**, collez l'optimization pack comme premier message dans une nouvelle conversation et recollez-le au début de tout nouveau thread.

**Testez-le :** utilisez le prompt ci-dessous pour confirmer l'installation.

---

## Prompt de test à coller

```
Je gère un blog de comparaison SaaS. Trafic mensuel à six chiffres, DA ~52.

Mot-clé principal : "best CRM for solopreneurs"
Volume estimé : ~1 900/mois
Le top 3 SERP est :
1. Le blog de Zapier (listicle commercial, 4 200 mots, 12 outils testés)
2. Le blog HubSpot (informationnel + légèrement promotionnel, 2 800 mots)
3. La revue personnelle d'un auteur Substack (1 400 mots, 5 outils testés sur 90 jours, POV très fort)

Je veux dépasser le #3 spécifiquement — l'angle revue personnelle est l'écart.

Donne-moi :
1. Classification d'intention + lecture de la SERP
2. Plan complet avec H1, H2s, suggestions de liens internes
3. Meta title + meta description
4. Recommandation de schéma
5. Un paragraphe sur l'angle E-E-A-T : qui devrait signer ça, quelle injection d'expérience me faut-il ?

Utilise des placeholders si nécessaire.
```

Vous devriez recevoir : intention classée comme commerciale (avec une note que l'angle revue personnelle du #3 est le différenciateur), un plan serré (probablement 7-9 H2s, avec des ouvertures de section prêtes pour le featured snippet), 3-5 suggestions de liens internes nommés, meta dans les specs, schéma Article + FAQPage recommandé, et une note franche que ça ne marche que si VOUS avez réellement testé des CRMs pendant 90 jours — sinon le kit suggérera d'embaucher un rédacteur qui l'a fait, ou de s'associer à quelqu'un qui a les preuves.

Si vous récupérez un plan de listicle générique sans classification d'intention et sans lecture de SERP, c'est que l'optimization pack n'est pas chargé. Recollez-le.
