# Disciplina de migration

Toda mudança de schema é uma migration. O dashboard do Supabase é um visualizador.

## Nomenclatura de arquivos

```
supabase/migrations/0001_init.sql
supabase/migrations/0002_add_invoices.sql
supabase/migrations/0003_seasons_unique_constraint.sql
```

Sequência com zero à esquerda, depois descrição verbo-substantivo. Evite timestamps no nome — fazem ruído, e a sequência é a ordenação real.

## O que uma migration precisa fazer

1. **Ser idempotente ou transacional.** Use `if not exists` onde o Postgres permite, ou envelope em `begin … exception`.
2. **Ser reversível quando razoável.** Adicione um bloco de comentário `-- down:` descrevendo os passos de rollback. Nem toda migration é reversível de forma limpa (migrações de dados raramente são) — documente explicitamente.
3. **Repetir o RLS.** Se uma migration adiciona uma tabela nova, o mesmo arquivo habilita RLS e escreve as policies. Nunca divida criação de tabela e habilitação de RLS em duas migrations.
4. **Dados de seed também são migration.** Se seu seed depende do schema, está numa migration. Não dependa de um `seed.sql` para preencher essenciais.

## O checklist de revisão

Antes de mergear uma migration:

- [ ] `create table` pareado com `enable row level security` no mesmo arquivo
- [ ] Toda tabela com escopo de tenant tem índice na coluna de tenant
- [ ] Toda foreign key tem comportamento `on delete` escolhido deliberadamente (cascade vs. set null vs. restrict)
- [ ] Sem `select *` em policies — nomeie colunas explicitamente
- [ ] Nenhuma função `security definer` sem `set search_path = public`
- [ ] Se a migration adiciona uma coluna com default, o default é setado ANTES de adicionar `not null` (senão o rewrite é forçado)
- [ ] Se a migration adiciona uma check constraint, linhas existentes passam nela
- [ ] Se a migration faz backfill de dados, está envolto em transaction com uma asserção de contagem de linhas no fim

## Anti-padrões para apontar em revisão de PR

- Migration que dropa uma coluna sem verificar primeiro que nada lê dela
- Migration que renomeia uma coluna (use add-new + backfill + drop-old ao longo de dois deploys)
- Migration que adiciona `unique` numa coluna existente sem checar duplicatas antes
- Migration que muda o tipo de uma coluna sem cláusula `using` explícita

## Receitas de rollback

### Coluna recém-adicionada

```sql
-- Roll back 0017_add_phone.sql
begin;
alter table public.profiles drop column phone;
commit;
```

### Policy RLS errada foi para produção

```sql
-- Roll back de uma policy permissiva demais
begin;
drop policy if exists "events read by all" on public.events;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
commit;
```

### Uma migration de dados que rodou nas linhas erradas

Essa é a perigosa. Suas opções são:

1. Restaurar a partir do snapshot point-in-time mais recente (feature Supabase Pro+)
2. Replay de uma migration inversa se você guardou estado suficiente
3. Reparo manual a partir de logs

A lição: **dry-run de migrações de dados em staging com snapshot recente de prod antes de mergear.**

## Workflow local

```bash
# Criar um novo arquivo de migration
supabase migration new add_invoices

# Aplicar localmente
supabase db reset

# Gerar types a partir do novo schema
supabase gen types typescript --local > src/types/database.ts

# Empurrar para a branch staging (NÃO prod) para verificação
git push origin staging
# Preview da Vercel + DB de branch do Supabase rodam a migration de ponta a ponta
```

Nunca dê `db push` em prod a partir do laptop. Sempre passe pelo CI.
