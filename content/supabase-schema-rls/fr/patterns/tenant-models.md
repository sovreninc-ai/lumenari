# Modèles de tenant — schema-per-tenant vs colonne `tenant_id`

Il existe deux vrais choix pour du Postgres multi-tenant. Choisissez délibérément.

## Les deux options

### A. Colonne `tenant_id` (schéma partagé)

Chaque ligne a une colonne `tenant_id`. Les policies RLS l'utilisent. Un seul schéma, un seul ensemble de tables, un seul ensemble de migrations.

**Pour**
- Coût faible pour scaler à des milliers de tenants
- Une seule migration touche tous les tenants
- Analytiques cross-tenant en une seule requête
- Sauvegardes, monitoring et ops sont simples

**Contre**
- Un bug dans la RLS = fuite de données sur tous les tenants
- Difficile de fournir un « data export » ou un hard-delete pour un tenant unique
- Les tenants ne peuvent pas avoir de schémas différents (les champs custom sont en JSON ou dans une table séparée)

### B. Schema-per-tenant

Chaque tenant a son propre schéma Postgres (ou sa propre base). Les migrations sont appliquées à chacun.

**Pour**
- Frontière dure — un bug RLS dans un schéma ne fuit pas vers un autre
- Export, suppression ou migration par tenant faciles
- Les tenants peuvent avoir des schémas différents si vous le souhaitez

**Contre**
- Le surcoût opérationnel grossit linéairement avec les tenants
- Les requêtes cross-tenant sont cauchemardesques
- Conséquences sur le pool de connexions (la config pgbouncer de Supabase compte)
- Les migrations ont besoin d'orchestration, pas d'un simple `supabase db push`

## Le critère de décision

Utilisez schema-per-tenant si **l'un** de ces points est vrai :

1. Réglementaire : les données de chaque tenant doivent être physiquement séparées (certaines données médicales, certaines données financières)
2. Peu de tenants mais très gros (par exemple < 50 tenants, > 1M lignes chacun)
3. Les tenants vont personnaliser le schéma (champs custom, colonnes)

Sinon, **la colonne `tenant_id` est le bon choix.** C'est ce qu'utilisent Sovren Sports, Lumina Reset et TradePass.

## Comment bien faire le `tenant_id`

```sql
create table public.events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  -- … autres colonnes
  created_at timestamptz not null default now()
);

-- Indexez TOUJOURS la colonne tenant.
create index events_organization_idx on public.events(organization_id);

-- Activez TOUJOURS la RLS avant de laisser du trafic toucher la table.
alter table public.events enable row level security;
```

La migration pour ajouter une nouvelle table tenant-scoped est toujours : `create table` → `create index` sur la colonne tenant → `enable row level security` → policies. Dans cet ordre. Si vous sautez l'étape 3, vous avez livré une fuite de données.

## Comment bien faire le schema-per-tenant

- Un schéma template ; les migrations sont des templates SQL rendus par tenant
- Une table de registre dans le schéma `public` mappant slug tenant → nom de schéma
- Un helper de connexion qui définit `search_path` au début de chaque session
- Du code applicatif qui ne concatène JAMAIS un nom de tenant dans une chaîne SQL (utilisez un `set_config` paramétré à la place)

C'est plus de travail. Ne vous y mettez pas tant qu'une des conditions du critère ne se déclenche pas effectivement.
