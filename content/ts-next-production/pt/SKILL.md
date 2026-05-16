# Pacote de Produção TypeScript + Next.js

> Coloque este kit na raiz do seu projeto como `SKILL.md` ou cole no system prompt da sua IA. Ele ensina o Claude (ou qualquer modelo com capacidade de código) a escrever código Next.js + Supabase que sobrevive ao contato com usuários reais.

**Otimizado para:** Claude, Claude Code, Cursor.

---

## Modo de operação

Você está pareando com um engenheiro sênior em uma base de código Next.js 14/15 App Router, deployada na Vercel, com backend em Supabase Postgres + Auth + Storage. Padrão para:

- **TypeScript em strict mode.** Sem `any`. Tipos inferidos em vez de anotados quando a inferência for boa.
- **Server-first.** Server components, server actions e route handlers são o padrão. Client components são uma escolha deliberada por causa de estado ou interação.
- **RLS como fronteira de segurança.** Qualquer coisa que toque dados de usuário passa pelo client anon do Supabase, para o Postgres RLS aplicar o controle de acesso. A service role key nunca aparece em código client-side.
- **Apenas migrations.** Todo schema vive em `supabase/migrations/*.sql`. Nunca edite pelo dashboard.
- **Dinheiro em centavos.** Inteiro de centavos + código da moeda. CAD por padrão.
- **Tempo em UTC** na fronteira; renderize no fuso do usuário.

Quando o usuário descrever uma feature, faça apenas uma pergunta de esclarecimento se uma decisão crítica for genuinamente ambígua. Caso contrário, escolha um padrão sensato e explique brevemente.

---

## Convenções de arquivos

```
src/
  app/                         # rotas
    (marketing)/               # route groups para layouts
    [tenant]/                  # segmento de rota multi-tenant se necessário
    api/
      <resource>/route.ts      # handlers POST/GET, server-only
  components/                  # PascalCase, um componente por arquivo
  lib/
    supabase.ts                # clients singleton (anon + service)
    stripe.ts
    env.ts                     # helper required(), lança erro alto e claro
    auth.ts                    # helpers de sessão
  data/                        # catálogo estático, constantes, enums
  hooks/                       # React hooks useXxx
supabase/
  migrations/0001_init.sql
  migrations/0002_*.sql
```

Nomenclatura:
- `snake_case` para identificadores SQL
- `PascalCase` para componentes React, interfaces TS, types TS
- `camelCase` para variáveis, funções, props
- `kebab-case` para caminhos de arquivos, slugs de URL, classes CSS

---

## Quando usar o quê

| Necessidade | Use |
| --- | --- |
| Buscar dados para uma página | Server component, `async function Page()` |
| Mutar dados a partir de um form | Server action |
| Mutar dados a partir de um webhook de terceiro | Route handler em `app/api/...` |
| Buscar dados no client (raro) | Route handler + `useSWR` ou React Query |
| UI otimista | `useOptimistic` + server action |
| Job de longa duração | Edge Function ou pg_cron (veja o pack do Supabase) |

Evite: fetch client-side para seu próprio banco. Evite: passar a service-role key para qualquer lugar onde o browser possa ver.

---

## Checklist pré-PR antes de abrir um pull request

1. `npm run typecheck` e `npm run lint` estão limpos.
2. Mexeu em `*.sql`? Está num arquivo de migration, não num clique no dashboard.
3. Mexeu em RLS? Existe um teste de integração provando que a fronteira aguenta para um tenant não relacionado.
4. Mexeu em código de pagamento? Existe um teste de idempotência de webhook.
5. Mexeu em alguma superfície voltada ao usuário? Funciona em viewport de 320px com touch targets de 44pt.
6. README ou arquivos do PROJECT-OS (STATE.md / DECISIONS.md) atualizados se a arquitetura mudou.

Se algum item falhar, isso é a próxima coisa a corrigir, não a próxima feature.

---

## Docs complementares neste kit

- `patterns/supabase-clients.md` — padrão singleton de Supabase para server, client e admin
- `patterns/server-actions.md` — quando/como usar, com validação e o formato de tratamento de erro
- `patterns/forms-and-validation.md` — schemas Zod, UI otimista, erros acessíveis
- `checklists/pr-ready.md` — versão estendida do pré-voo acima
