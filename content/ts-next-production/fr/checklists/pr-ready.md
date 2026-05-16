# Checklist PR-ready

Passez par cette liste avant d'ouvrir une PR. Le but est : « un ingénieur senior pourrait-il +1 cette PR en une seule lecture ? »

## Qualité du code

- [ ] `npm run typecheck` clean
- [ ] `npm run lint` clean
- [ ] `npm run build` clean
- [ ] Pas de `console.log` laissé traîner (utilisez un logger ou retirez-le)
- [ ] Pas de blocs de code commentés
- [ ] Tous les nouveaux fichiers ont au moins un docblock en haut expliquant leur objet

## Sûreté de types

- [ ] Pas de `any` (utilisez `unknown` + narrowing à la place)
- [ ] Pas de casts `as Type` qui ne sont pas justifiés par un commentaire
- [ ] Les props de composants ont des interfaces explicites, pas des inlines `{a, b}: {a: string; b: number}`
- [ ] Toutes les fonctions async sont soit awaitées soit la promesse est renvoyée ; pas de fire-and-forget sans commentaire

## Couche données

- [ ] Les changements de schéma sont dans un fichier de migration sous `supabase/migrations/`
- [ ] Les nouvelles tables ont la RLS activée avec des policies explicites
- [ ] Le client service-role n'est importé que dans les route handlers / server actions
- [ ] Pas de `select *` sur les tables qui ont des colonnes sensibles

## Sécurité

- [ ] Les entrées utilisateur passent par un schéma Zod avant d'arriver en base
- [ ] Les valeurs monétaires sont stockées et calculées en centimes entiers
- [ ] Aucun secret dans le code client ou dans des variables `NEXT_PUBLIC_*`
- [ ] Les surfaces CSRF (server actions, route handlers) sont protégées par auth

## UX

- [ ] Les formulaires ont des labels accessibles + `aria-invalid` + erreurs visibles
- [ ] États de chargement pour toute action > 300 ms
- [ ] États vides pour toute liste qui peut être vide
- [ ] Fonctionne en viewport 320px (testez dans les DevTools)
- [ ] Touch targets ≥ 44pt sur mobile

## Tests

- [ ] Vous avez touché à la RLS ? Un test d'intégration prouve la frontière cross-tenant
- [ ] Vous avez touché à un parcours de paiement ou d'argent ? Test d'idempotence du webhook
- [ ] Vous avez touché à l'auth ? Test qu'une requête non authentifiée est rejetée

## Opérationnel

- [ ] Le titre de la PR est un commit sémantique (`feat:`, `fix:`, `refactor:` …)
- [ ] La description de la PR contient : quoi, pourquoi, comment tester
- [ ] DECISIONS.md mis à jour si cette PR a changé un choix d'architecture
- [ ] STATE.md mis à jour si cette PR a fait avancer l'état du projet

## Le « test du sommeil »

> Pourriez-vous aller vous coucher tout de suite après avoir mergé ceci, et être à l'aise avec le fait que ce soit en prod 8 heures sans surveillance ?

Si non — quel test, alerte ou feature flag manque ?
