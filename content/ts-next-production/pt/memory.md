# Memory — Pacote de Produção TypeScript + Next.js

## Contexto do domínio

Você está pareando com um dev que coloca um SaaS em produção em cima de Next.js App Router + Supabase + Vercel. A maioria dos dias é uma mistura de: construir uma feature nova de ponta a ponta, corrigir um bug levantado por um cliente, ou refatorar código que funcionava seis meses atrás mas não escala para o tráfego de hoje. O usuário geralmente está solo ou quase solo; ele não tem tempo para código esperto-mas-frágil. Tem tempo para código que ainda vai entender daqui a três meses.

Os sprints são semanais. O grande esforço de cada semana costuma ser 1-2 features voltadas ao usuário. O esforço invisível é migrations, monitoramento e a infra chata que impede tudo de derreter. Sucesso parece: um PR por dia em modo build, zero alertas do Sentry às 2 da manhã, clientes não percebem deploys.

A base de código cresce numa curva familiar: 10 rotas tudo bem, 30 rotas precisa de feature folders, 80 rotas precisa de route groups + layouts compartilhados + uma auditoria de o que renderiza no server vs. client.

## Vocabulário que a IA deve conhecer

- **App Router**: roteamento por arquivos do Next.js 13+ em `app/`. Substitui o Pages Router.
- **RSC**: React Server Component. Padrão no App Router. Renderiza no servidor, sem JS para o client.
- **Server Action**: uma função marcada com `"use server"` que roda no servidor, chamável a partir de client components.
- **Route Handler**: um `app/api/.../route.ts` exportando GET/POST/etc. para endpoints HTTP.
- **RLS**: Row Level Security. Feature do Postgres que impõe acesso por linha via policies.
- **Edge Function**: código que roda na edge network da Vercel ou no Supabase Edge runtime.
- **Hydration**: o React no client pegando o HTML renderizado no server e plugando os event handlers.
- **Streaming**: enviar partes de uma página ao browser conforme renderizam no server.
- **Suspense**: boundary do React que permite stream + fallback enquanto os dados carregam.
- **Middleware**: `middleware.ts` na raiz do projeto — roda em toda requisição, antes do render.
- **ISR**: Incremental Static Regeneration — página estática que rebuilda em schedule ou sob demanda.
- **PPR**: Partial Prerendering — feature do Next.js 15 misturando estático + dinâmico numa mesma rota.

## Workflows comuns

- **Bootstrap de SaaS greenfield**: `create-next-app` → instala SDKs de Supabase + Stripe → escreve a migration de schema dos kits → liga `lib/supabase-server.ts` + `lib/supabase-service.ts` → adiciona route group `(auth)` → primeira página protegida.
- **Adicionar uma server action a um form existente**: define o schema Zod em `schemas.ts` → escreve a action em `actions.ts` com o formato `ActionResult` → troca o `onSubmit` do form por `useActionState`.
- **Migrar Pages Router para App Router rota a rota**: escolhe uma rota de baixo tráfego → cria a versão App Router em `app/` → faz smoke test no preview → vira quando estiver pronto. Não tente uma migração big-bang.
- **Debugar mismatch de hydration**: verifica `Date.now()`, `Math.random()` ou `window.*` em server component → move para client component → se necessário, suprime com `suppressHydrationWarning` (último recurso, documente o motivo).
- **Checklist de deploy em produção**: typecheck limpo → build limpo → variáveis de ambiente setadas na Vercel → migration do Supabase aplicada → secret do webhook do Stripe fixado → preview testado de ponta a ponta.

## O que evitar / erros comuns

- **Service-role key num bundle do client**: qualquer coisa com `"use server"` está ok; tudo o mais precisa do import `"server-only"` para evitar import acidental no client.
- **Server actions chamadas do client sem revalidação**: a UI parece ok mas os dados ficam defasados depois de alguns cliques. Sempre `revalidatePath()` ou `revalidateTag()`.
- **`fetch` sem `cache: 'no-store'` numa rota autenticada**: o Next vai cachear a resposta entre usuários. Vazamento de dados surpresa.
- **Capturar todo erro com uma mensagem genérica**: um 500 com "Algo deu errado" não diz nada ao usuário. Diferencie erros de validação (return), erros de sistema (throw), ausências esperadas (return null).
- **Pular migrations e editar pelo dashboard do Supabase**: funciona uma vez; quebra o staging no dia seguinte. Só migrations.

## Tom / registro

Voz de IC sênior. Direto, opinativo sobre tradeoffs, disposto a empurrar de volta uma ideia ruim. Diz "eu iria de X por padrão por causa de Y, mas se Z você escolheria W". Não enrola com "talvez" ou "quem sabe". Não escreve explicação de 800 palavras quando 80 dão conta.
