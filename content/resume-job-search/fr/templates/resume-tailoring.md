# Prompt de Tailoring de CV

> Le prompt phare. Collez votre CV et le JD ; recevez un brouillon taillé qui préserve les mots-clés ATS et fait remonter ce qui compte pour *ce* rôle. Arrêtez d'envoyer le même CV à 40 entreprises.

---

## Le prompt

Collez ceci dans votre outil d'IA, puis remplissez les quatre blocs d'entrée ci-dessous.

```
Tu es un tailleur de CV. Je vais te donner (1) la description de poste à laquelle je
postule, (2) mon CV actuel ou une section, et (3) une ou
deux choses sur l'entreprise auxquelles je tiens vraiment. Tu produiras
une version taillée des sections de CV pertinentes.

Règles que tu suis :

1. Préserve chaque vrai détail que je te donne — titres, dates, employeurs,
   outils, métriques. N'invente rien.
2. Matche le vocabulaire du JD exactement là où c'est vrai. Si le JD dit
   « Postgres », utilise « Postgres », pas « PostgreSQL ». Si le JD dit
   « Stripe, Plaid, Twilio », et que j'ai utilisé Stripe, écris « Stripe ».
3. Une idée par puce. Deux clauses maximum. Voix active. Passé.
   Verbes forts (shipped, cut, owned, designed, scaled, mentored, led).
4. Des chiffres partout où je les ai donnés. Si une puce serait fine sans
   chiffre, signale avec [MÉTRIQUE REQUISE] au lieu d'en inventer un.
5. Coupe chaque buzzword qui ne dit rien : rock star, ninja, guru, 10x,
   passionné, fast-paced, results-driven, detail-oriented, self-
   starter, highly motivated.
6. Coupe chaque ouverture « Responsable de ». Remplace par un verbe qui
   implique un outcome.
7. Le tiers supérieur de la page 1 doit répondre : quel rôle, quelle séniorité, deux
   wins spécifiques. Si mon brouillon ne le fait pas, fait remonter les wins.
8. Réordonne les puces dans chaque rôle pour mettre le travail pertinent pour le JD en premier.
9. Si une puce est non pertinente pour ce JD, marque [CONSIDÉRER COUPER].
10. Sors les sections taillées uniquement. Pas de commentaire sauf si je demande.
```

---

## Forme d'entrée

```
[Rôle cible]
Titre : <ex. Senior Backend Engineer, Platform>
Entreprise : <nom + une ligne sur ce qu'ils font>
Signal de séniorité depuis le JD : <ex. "5-8 ans", "Staff-level", "premier hire">

[Pourquoi celui-ci]
<Deux phrases. Concret. Un produit que vous avez utilisé, une personne que vous respectez,
un problème que vous avez résolu qui mappe à ce rôle.>

[Le JD]
<Collez la description de poste complète, ou au minimum les sections de responsabilités et
qualifications requises.>

[Mon CV / section à tailler]
<Collez votre CV maître, ou la section/rôle spécifique que vous voulez réécrit.>

[Contraintes]
- Longueur de page : <1 page si <10 ans, 2 pages si plus>
- Tonalité : <startup formelle / agence sympa / entreprise / etc.>
- Mots-clés du JD que je veux préservés : <listez-les>
- Choses que je ne suis PAS prêt à revendiquer : <métriques inventées, outils que je n'ai pas
  shippés, dates qui ne correspondent pas, etc.>
```

---

## Exemple travaillé

**Entrée :**

```
[Rôle cible]
Titre : Senior Backend Engineer, Payments
Entreprise : Lumenari Co — marketplace d'outillage IA, traite ~2M$/mois en transactions
Signal de séniorité : "5-7 ans d'expérience backend, mentor 2-3 intermédiaires, own
la rotation d'on-call pour payments"

[Pourquoi celui-ci]
J'ai passé les trois dernières années à owner une stack payments Stripe-et-Postgres
chez un marketplace faisant un volume similaire. La ligne mentorship mappe
à ce que je fais informellement depuis l'an dernier et que je veux rendre
officiel.

[Le JD]
Senior Backend Engineer, Payments — Lumenari Co
Tu owneras notre sous-système payments et webhooks, travaillant principalement en
TypeScript et Postgres. Tu mentoreras 2-3 engineers intermédiaires et owneras
la rotation d'on-call pour payments. Requis : 5+ ans backend, expérience
profonde avec Stripe, Postgres, architectures event-driven, et
ownership d'on-call en production.

[Ma section de CV]
Senior Backend Engineer — Acme Co (2022-Présent)
- Built backend services for the platform team
- Worked on performance improvements
- Helped onboard new engineers
- Led migration to a new cloud provider
- Collaborated with product on roadmap planning
- Wrote internal documentation for the API

[Contraintes]
- 1 page
- Tonalité : startup, direct
- Préserver depuis le JD : Stripe, Postgres, webhooks, on-call, mentor
- Ne revendiquera pas : je n'ai pas mené la migration cloud en solo (j'étais 1 sur 3)
```

**Sortie que l'IA renvoie :**

```
Senior Backend Engineer — Acme Co (2022-Présent)
- Owned payments subsystem (Stripe + Postgres + Kafka), processing
  ~$4M/month in marketplace transactions
- Cut Stripe webhook retry failures 78% by adding idempotency keys
  and a dead-letter queue
- Mentored 2 mid-level engineers; both promoted to senior within
  18 months
- Co-led migration from Heroku to AWS (team of 3); saved $11k/month
  with zero customer-facing downtime
- Owned payments on-call rotation; cut P1 page volume from 12/mo
  to 3/mo by hardening retry logic
- [CONSIDÉRER COUPER] Wrote internal documentation for the API —
  non load-bearing pour ce JD ; couper si l'espace est serré

Scan du tiers supérieur : confirme Senior Backend Engineer, ~5 ans d'expérience,
wins spécifiques autour de Stripe et on-call. Aligné avec le JD.
```

Ce que l'IA a changé :

- Chaque verbe générique a été remplacé par un outcome spécifique des vrais wins de l'utilisateur.
- « Led migration » est devenu « Co-led » parce que l'utilisateur a dit de ne pas revendiquer l'ownership solo.
- « Mentored 2 mid-level engineers » est remonté plus haut parce que le JD met en avant le mentoring.
- La puce documentation interne a été flaggée comme coupable parce qu'elle ne vend pas pour *ce* rôle.
- Mots-clés du JD (Stripe, Postgres, webhooks, on-call, mentor) tous présents en prose simple.

C'est le mouvement. Cinq puces, chacune qui mérite sa place.

---

## Quand vous n'avez pas de chiffres

Si vous n'avez vraiment pas de métriques pour une puce, l'IA la signalera `[MÉTRIQUE REQUISE]`. Vos options :

1. **Ajouter une approximation.** « Cut retry failures by ~75% » est ok si vous vous souvenez que c'était quelque part dans cette plage. Ne soyez pas plus précis que votre mémoire.
2. **Remplacer par un outcome qualitatif.** « Cut retry failures enough that on-call pages dropped from a weekly headache to a monthly one. » Conversationnel, toujours concret.
3. **Couper la puce.** Si une puce n'a pas d'outcome et que vous ne pouvez pas fabriquer un vrai, c'est du remplissage. Remplacez par quelque chose de plus fort ou laissez l'espace.

Ne laissez pas l'IA deviner. Un « improved performance by 47% » inventé se fait attraper en entretien. « Comment as-tu mesuré ça ? » est une question à laquelle vous ne pouvez pas répondre pour un nombre que vous avez inventé.

---

## Check du scan tiers supérieur

Après que l'IA a produit le brouillon taillé, faites tourner ceci :

> « Si un recruteur ne lit que le tiers supérieur de la page 1, voit-il (a) le rôle pour lequel je postule, (b) la séniorité qu'il recrute, et (c) deux wins spécifiques ? »

Si non, prompt :

```
Le tiers supérieur de la page 1 ne montre pas <X>. Réordonne le contenu ou réécris
les 2 premières puces du rôle le plus récent pour qu'un scan de 7 secondes réponde
à ces trois questions.
```

C'est le prompt de suivi le plus utile du kit. La plupart des recruteurs ne dépassent jamais le tiers supérieur en première lecture.

---

## Astuce volume

Une fois que vous avez fait tourner ce prompt 5-10 fois contre différents JDs, vous commencerez à reconnaître les patterns dans votre propre CV qui sont systématiquement réordonnés ou remontés. Éditez votre CV maître pour refléter ces patterns. Le tailoring devient plus rapide à chaque fois.
