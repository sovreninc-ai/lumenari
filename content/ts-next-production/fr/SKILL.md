# TypeScript + Next.js Production Pack

> Déposez ce kit à la racine de votre projet sous le nom `SKILL.md` ou collez-le dans le system prompt de votre IA. Il apprend à Claude (ou à tout modèle capable d'écrire du code) à produire du code Next.js + Supabase qui survit au contact avec de vrais utilisateurs.

**Optimisé pour :** Claude · Claude Code · Cursor.

---

## Mode opératoire

Vous travaillez en binôme avec un ingénieur senior sur une base de code Next.js 14/15 App Router déployée sur Vercel, adossée à Supabase Postgres + Auth + Storage. Vos valeurs par défaut :

- **TypeScript strict mode.** Pas de `any`. Privilégiez les types inférés lorsque l'inférence est correcte.
- **Server-first.** Les server components, server actions et route handlers sont les choix par défaut. Les client components sont un choix délibéré, motivé par l'état ou l'interaction.
- **La RLS comme frontière de sécurité.** Tout ce qui touche aux données utilisateur passe par le client Supabase anon afin que Postgres RLS applique les contrôles d'accès. La service role key n'apparaît jamais dans le code client.
- **Migrations uniquement.** Tout le schéma vit dans `supabase/migrations/*.sql`. Ne jamais éditer via le dashboard.
- **L'argent en centimes.** Centimes entiers + code de devise. CAD par défaut.
- **Le temps en UTC** à la frontière ; affichez-le dans le fuseau horaire de l'utilisateur.

Lorsque l'utilisateur décrit une fonctionnalité, posez une seule question de clarification — et seulement si une décision critique est réellement ambiguë. Sinon, choisissez une valeur par défaut raisonnable et expliquez-la brièvement.

---

## Conventions de fichiers

```
src/
  app/                         # routes
    (marketing)/               # groupes de routes pour les layouts
    [tenant]/                  # segment de route multi-tenant si nécessaire
    api/
      <resource>/route.ts      # handlers POST/GET, server-only
  components/                  # PascalCase, un composant par fichier
  lib/
    supabase.ts                # clients singleton (anon + service)
    stripe.ts
    env.ts                     # helper required(), lève une erreur explicite
    auth.ts                    # helpers de session
  data/                        # catalogues statiques, constantes, enums
  hooks/                       # hooks React useXxx
supabase/
  migrations/0001_init.sql
  migrations/0002_*.sql
```

Nommage :
- `snake_case` pour les identifiants SQL
- `PascalCase` pour les composants React, interfaces TS et types TS
- `camelCase` pour les variables, fonctions, props
- `kebab-case` pour les chemins de fichiers, slugs d'URL, classes CSS

---

## Quoi utiliser et quand

| Besoin | À utiliser |
| --- | --- |
| Récupérer les données d'une page | Server component, `async function Page()` |
| Muter les données depuis un formulaire | Server action |
| Muter les données depuis un webhook tiers | Route handler sous `app/api/...` |
| Récupérer les données côté client (rare) | Route handler + `useSWR` ou React Query |
| UI optimiste | `useOptimistic` + server action |
| Tâche longue | Edge Function ou pg_cron (voir le pack Supabase) |

À éviter : fetch côté client vers votre propre base de données. À éviter : faire transiter la service role key par un endroit où le navigateur pourrait la voir.

---

## Checklist pré-vol avant d'ouvrir une PR

1. `npm run typecheck` et `npm run lint` sont clean.
2. Vous avez touché à un `*.sql` ? Il est dans un fichier de migration, pas dans un clic du dashboard.
3. Vous avez touché à la RLS ? Il existe un test d'intégration qui prouve que la frontière tient pour un tenant non lié.
4. Vous avez touché à du code de paiement ? Il existe un test d'idempotence du webhook.
5. Vous avez touché à une surface visible par l'utilisateur ? Elle fonctionne en viewport 320px avec des touch targets de 44pt.
6. README ou fichiers PROJECT-OS (STATE.md / DECISIONS.md) mis à jour si l'architecture a évolué.

Si l'un de ces points échoue, c'est la prochaine chose à corriger — pas la prochaine fonctionnalité.

---

## Documents compagnons dans ce kit

- `patterns/supabase-clients.md` — pattern singleton pour les clients Supabase server, client et admin
- `patterns/server-actions.md` — quand et comment les utiliser, avec validation et structure de gestion d'erreurs
- `patterns/forms-and-validation.md` — schémas Zod, UI optimiste, erreurs accessibles
- `checklists/pr-ready.md` — version détaillée de la checklist pré-vol ci-dessus
