# Quick Start — Annonces Immobilières + Analyse de Marché

Vous devriez être opérationnel en moins de 60 secondes. Choisissez votre outil.

## Utilisateurs Claude

Ouvrez Claude. Créez un nouveau Project (plan Pro ou Team requis pour les projects, mais le prompt fonctionne aussi dans un chat normal). Dans le champ « Custom instructions » ou « Project knowledge » du projet, collez l'intégralité du contenu de `optimization-pack.md`. Uploadez les fichiers de `templates/` dans la project knowledge pour que Claude les ait en référence. Démarrez une nouvelle conversation dans le projet. Premier message : dites à Claude votre juridiction (État ou province), puis décrivez le livrable que vous voulez — « J'ai besoin de commentaires publics MLS pour un condo 3 chambres à [quartier] » ou « Lance un CMA sur ce bien, les comps arrivent au prochain message ».

## Utilisateurs ChatGPT

Ouvrez ChatGPT. Cliquez « Explore GPTs » → « Create a GPT » (plan Plus requis). Dans le champ « Instructions », collez l'intégralité du contenu de `custom-gpt-instructions.md`. Dans « Conversation starters », utilisez les cinq listés en bas de ce fichier. Dans « Knowledge », uploadez les fichiers markdown du dossier `templates/`. Sauvegardez le GPT (privé pour vous, c'est OK). Ouvrez-le et démarrez par : « Salut, je suis agent en [État/province]. Voici ce dont j'ai besoin aujourd'hui : [livrable]. »

Si vous n'avez pas ChatGPT Plus, collez juste `optimization-pack.md` en haut d'un chat normal. Ça marchera — vous perdez juste le GPT persistant et les uploads de fichiers.

## Gemini, Codex, Cursor ou tout autre outil d'IA

Ouvrez l'outil. Démarrez une nouvelle conversation. Collez l'intégralité du contenu de `optimization-pack.md` comme premier message. Ajoutez : « Confirme que tu as chargé ceci et demande-moi ma juridiction et le type de livrable. » Une fois fait, c'est bon.

Pour Gemini Gems spécifiquement : créez un nouveau Gem, collez `optimization-pack.md` dans le champ instructions, sauvegardez, et utilisez ce Gem au lieu du chat par défaut.

---

## Tester que ça fonctionne

Une fois le system prompt chargé, collez ceci :

```
Test run. Je suis un agent titulaire en [votre État ou province]. J'ai besoin de commentaires publics MLS pour une maison single-family : 4 chambres, 3 sdb, 2 400 sqft, construite en 2018, sur un terrain en angle de 0,18 acre dans [votre quartier]. Caractéristiques : cuisine de chef avec îlot, sous-sol fini, jardin clôturé, garage deux places avec borne EV. Acheteur probable : famille en move-up depuis un townhouse, veut de l'espace extérieur. Limite 900 caractères.
```

Si vous récupérez une annonce dans la structure (lead → layout → caractéristiques → emplacement → close), sous 900 caractères, avec un bloc « Choses à vérifier avant publication » en bas, le kit est correctement chargé. S'il vous a donné « Welcome home ! » ou « This stunning property boasts » quelque part dans la sortie, le system prompt ne s'est pas chargé — réessayez de le coller.
