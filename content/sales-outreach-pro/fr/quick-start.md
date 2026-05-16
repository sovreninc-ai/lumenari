# Quick Start — Cold Outreach Commercial + Relance

Opérationnel en moins de 60 secondes. Choisissez votre outil.

## Utilisateurs Claude

Ouvrez Claude. Créez un nouveau Project. Dans « Custom instructions » ou « Project knowledge », collez l'intégralité du contenu de `optimization-pack.md`. Uploadez les fichiers de `frameworks/`, `templates/` et `playbooks/` pour que Claude les ait en référence. Démarrez une nouvelle conversation dans le projet. Premier message : dites à Claude votre ICP en une phrase, quel livrable vous voulez, et le signal spécifique au prospect. Exemple : « ICP : VP Engineering chez des SaaS Series A, 50-200 employés. Cold email. Signal : il vient de lever un round B il y a 3 semaines mené par [VC]. Valeur : on réduit les dépenses CI/CD en diminuant les reruns de tests flaky. »

## Utilisateurs ChatGPT

Ouvrez ChatGPT. Cliquez « Explore GPTs » → « Create a GPT » (Plus requis). Dans « Instructions », collez l'intégralité du contenu de `custom-gpt-instructions.md`. Dans « Conversation starters », utilisez les cinq en bas de ce fichier. Dans « Knowledge », uploadez les fichiers markdown de `frameworks/`, `templates/` et `playbooks/`. Sauvegardez le GPT en privé. Ouvrez-le. Premier message : ICP + livrable + signal, comme l'exemple Claude ci-dessus.

Si vous n'avez pas Plus, collez `optimization-pack.md` en haut d'un chat normal. Même résultat, pas de persistance.

## Gemini, Codex, Cursor ou tout autre outil d'IA

Ouvrez l'outil. Démarrez une nouvelle conversation. Collez l'intégralité du contenu de `optimization-pack.md` comme premier message. Ajoutez : « Confirme que tu as chargé ceci et demande-moi l'ICP, le livrable et le signal. » Une fois fait, c'est bon.

Pour Gemini Gems : créez un nouveau Gem, collez `optimization-pack.md` dans les instructions, sauvegardez, utilisez le Gem au lieu du chat par défaut.

---

## Tester que ça fonctionne

Une fois le system prompt chargé, collez ceci :

```
Test run.

ICP : VP Engineering chez des SaaS Series A, 50-200 employés, basés US, qui construisent des frontends React.
Prospect : Sarah Chen, VP Engineering chez Beacon Labs. Signal : elle vient de poster sur LinkedIn il y a 4 jours sur le fait que le pipeline CI/CD de son équipe est un bottleneck depuis qu'ils ont doublé l'équipe d'ingénierie.
Valeur : on réduit les reruns de tests flaky de 60 %, ce qui coupe les minutes CI et les pages on-call qui vont avec.
Preuve : Linear et Vercel sont clients.
CTA : 15 min mardi ou mercredi prochain.
Contrainte : sous 75 mots, sujet sous 40 caractères.

Écris le cold email.
```

Si vous récupérez un email qui :
- Référence le post LinkedIn spécifique de Sarah sur la douleur CI/CD
- Énonce la valeur en langue simple sans « transform » ni « revolutionize »
- A une seule demande avec des horaires proposés
- Tient sous 75 mots
- Se termine par un bloc « deux choses que tu pourrais vouloir changer »

… le kit est correctement chargé. Si l'email commence par « Hope this finds you well » ou « I wanted to reach out », le system prompt ne s'est pas chargé — réessayez de le coller en haut de la conversation.
