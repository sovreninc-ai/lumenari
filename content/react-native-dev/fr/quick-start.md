# Quick Start — React Native / Mobile Dev Pack

Vous devriez être opérationnel en moins de 60 secondes. Choisissez votre outil.

## Utilisateurs Claude

Ouvrez Claude. Créez un nouveau Project (plan Pro ou Team requis pour les projects, mais le prompt fonctionne aussi dans un chat normal). Dans le champ « Custom instructions » du projet, collez l'intégralité du contenu de `optimization-pack.md`. Uploadez `memory.md` et `patterns/component-and-native-modules.md` dans la project knowledge pour que Claude les ait en référence. Démarrez une nouvelle conversation. Premier message : dites à Claude votre setup — « Je suis sur Expo bare workflow, RN 0.74, New Architecture activée, ciblant iOS + Android » — puis décrivez ce que vous construisez.

## Utilisateurs ChatGPT

Ouvrez ChatGPT. Cliquez « Explore GPTs » → « Create a GPT » (plan Plus requis). Dans le champ « Instructions », collez l'intégralité du contenu de `custom-gpt-instructions.md`. Dans « Conversation starters », utilisez les cinq listés en bas de ce fichier. Dans « Knowledge », uploadez `memory.md` et `patterns/component-and-native-modules.md`. Sauvegardez le GPT (privé pour vous, c'est OK). Ouvrez-le et démarrez par : « Expo bare, RN 0.74, iOS + Android. Je veux scaffolder un nouvel écran. »

Si vous n'avez pas ChatGPT Plus, collez `optimization-pack.md` en haut d'un chat normal. Ça marchera — vous perdez juste le GPT persistant et les uploads de fichiers.

## Gemini, Cursor, Codex ou tout autre outil d'IA

Ouvrez l'outil. Démarrez une nouvelle conversation. Collez l'intégralité du contenu de `optimization-pack.md` comme premier message. Ajoutez : « Confirme que tu as chargé ceci et demande-moi mon workflow Expo, la version RN et les plateformes cibles. » Une fois qu'il le fait, c'est bon.

Pour Cursor spécifiquement : déposez `SKILL.md` à la racine de votre projet. Le `.cursorrules` de Cursor ou les project rules le détecteront automatiquement.

---

## Tester que ça fonctionne

Une fois le system prompt chargé, collez ceci :

```
Test run. Expo bare workflow, RN 0.74, New Architecture activée, ciblant iOS 15+ et Android 8+. J'ai besoin d'un écran qui affiche une liste de 500 messages de chat avec avatars, tirés d'une API. Scroll fluide sur un Android 3 Go. Donne-moi le fichier écran, le composant row, et le hook de données.
```

Si vous récupérez une `FlatList` (ou `FlashList`) avec un `keyExtractor` stable, une row `React.memo`-isée, une ref `renderItem` extraite, des dimensions d'image définies explicitement, un hook réseau avec abort-on-unmount, et une note sur la divergence iOS/Android en bas — le kit est correctement chargé.

Si vous récupérez une `ScrollView` avec `.map()`, ou `renderItem={(item) => <Row />}` inline, ou aucune mention de la perf Android, le system prompt ne s'est pas chargé — recollez-le.
