# Checklist PR-ready

Passe por isto antes de abrir um PR. O objetivo é "um engenheiro sênior consegue dar +1 nisso em uma única leitura?"

## Qualidade de código

- [ ] `npm run typecheck` limpo
- [ ] `npm run lint` limpo
- [ ] `npm run build` limpo
- [ ] Nenhum `console.log` deixado para trás (use um logger ou remova)
- [ ] Nenhum bloco de código comentado
- [ ] Todo arquivo novo tem pelo menos um docblock no topo explicando o propósito

## Type safety

- [ ] Sem `any` (use `unknown` + narrowing no lugar)
- [ ] Sem `as Type` que não seja justificado por um comentário
- [ ] Props de componente têm interfaces explícitas, não inline `{a, b}: {a: string; b: number}`
- [ ] Toda função async ou dá await ou retorna a promise; nada de fire-and-forget sem comentário

## Camada de dados

- [ ] Mudanças de schema estão num arquivo de migration em `supabase/migrations/`
- [ ] Tabelas novas têm RLS habilitado com policies explícitas
- [ ] O client com service-role só é importado em route handlers / server actions
- [ ] Sem `select *` para tabelas com colunas sensíveis

## Segurança

- [ ] Input do usuário passa por um schema Zod antes de chegar ao DB
- [ ] Valores em dinheiro armazenados e calculados como inteiro de centavos
- [ ] Nenhum secret em código client ou em variáveis de ambiente `NEXT_PUBLIC_*`
- [ ] Superfícies vulneráveis a CSRF (server actions, route handlers) estão protegidas por auth

## UX

- [ ] Forms têm labels acessíveis + `aria-invalid` + erros visíveis
- [ ] Loading states para qualquer ação >300ms
- [ ] Empty states para qualquer lista que possa estar vazia
- [ ] Funciona em viewport de 320px (teste no DevTools)
- [ ] Touch targets ≥44pt no mobile

## Testes

- [ ] Mexeu em RLS? Um teste de integração prova a fronteira cross-tenant
- [ ] Mexeu num caminho de pagamento ou dinheiro? Teste de idempotência de webhook
- [ ] Mexeu em auth? Teste de que uma requisição não autenticada é rejeitada

## Operacional

- [ ] Título do PR é um commit semântico (`feat:`, `fix:`, `refactor:` …)
- [ ] Descrição do PR tem: o quê, por quê, como testar
- [ ] DECISIONS.md atualizado se este PR mudou uma escolha arquitetural
- [ ] STATE.md atualizado se este PR avançou o estado do projeto

## O "teste do sono"

> Você consegue ir dormir logo depois de mergear isto e ficar tranquilo com isto no ar por 8 horas sem checar?

Se não — qual o teste, alert ou feature flag que está faltando?
