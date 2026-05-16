# Memory — Pacote de Schema & RLS do Supabase

## Contexto do domínio

Você está ajudando alguém a desenhar ou evoluir um schema Postgres rodando em Supabase. O usuário pode ser um dev backend solo, um indie full-stack, ou a primeira pessoa de dados dedicada de um time pequeno. Eles já foram mordidos pelo RLS pelo menos uma vez — o clássico "me tranquei fora da minha própria tabela" — e querem padrões que escalam para além de 10 tabelas sem virar um pesadelo de manutenção.

O trabalho se divide entre design de schema greenfield (raro, divertido) e evolução de schema existente (comum, com cuidado). Migrations são a fonte da verdade; o dashboard é um visualizador. Toda mudança de schema é um arquivo, um PR, um deploy. Produção só fica limpa se staging fica limpo, que só fica limpo se o local está limpo.

Sucesso parece: um engenheiro novo consegue ler a pasta de migrations e entender todo o modelo de dados em menos de uma hora.

## Vocabulário que a IA deve conhecer

- **RLS**: Row Level Security. Feature do Postgres impondo acesso por linha através de policies.
- **Policy**: um predicado SQL anexado a uma tabela que filtra leituras (USING) ou bloqueia escritas (WITH CHECK).
- **tenant_id**: o padrão dominante de multi-tenancy — uma coluna em toda tabela compartilhada.
- **auth.uid()**: função do Supabase que retorna o sujeito do JWT (o UUID do usuário autenticado).
- **security definer**: um modificador de função do Postgres que roda como o dono da função (normalmente superuser), bypassando o RLS do chamador pela duração da função.
- **security invoker**: roda como o chamador. Default para a maioria das funções.
- **Service role**: API key do Supabase que bypassa o RLS por completo. Apenas server.
- **Claims do JWT**: dados customizados dentro do token de auth. Acessíveis em policies via `auth.jwt()`.
- **PostgREST**: a API REST autogerada que o Supabase envolve em volta do seu Postgres.
- **Realtime**: a camada WebSocket do Supabase para atualizações ao vivo nas tabelas — também passa pelo RLS.
- **Branching**: feature do Supabase para subir um clone isolado do DB por branch do Git.

## Workflows comuns

- **Schema multi-tenant greenfield**: escreva `organizations`, `profiles`, `memberships` → adicione helper functions (`is_member_of`, `has_role`) → para cada tabela de domínio: inclua `organization_id`, indexe, habilite RLS, escreva policies, depois adicione colunas.
- **Adicionando RLS a uma tabela existente que estava escancarada**: habilite RLS numa transaction → adicione as policies → rode um SELECT como usuário anon para confirmar que zero linhas vazam → só então commit. Não habilite em prod e descubra ao vivo.
- **Debugando um lockout de RLS**: `set role to service_role; select … from … where id = '…';` para ver se a linha sequer existe → cheque policies com `\d+ table_name` → a causa mais comum é cláusula `with check` faltando no UPDATE.
- **Quebrando uma tabela pelo padrão de tenant**: raro, mas a migration é: adiciona nova coluna de tenant → faz backfill → adiciona constraint NOT NULL → atualiza todas as policies → derruba a abordagem antiga.
- **Query cross-tenant para analytics**: use o client service-role + uma view customizada que agrega com cuidado. Nunca rode queries cross-tenant como usuário.

## O que evitar / erros comuns

- **Habilitar RLS sem escrever policies**: agora ninguém consegue ler nada, inclusive suas próprias ferramentas de admin. Sempre habilite + adicione policies na mesma migration.
- **Usar `using (true)` como policy permissiva**: é o mesmo que não ter RLS. O ponto é predicado por linha.
- **Colocar `auth.uid()` direto em 20 policies**: quando precisar mudar o modelo de tenancy, você mexe em 20 policies. Embrulhe em `is_member_of()` uma vez.
- **Esquecer o índice em `tenant_id`**: toda query escaneia a tabela linearmente. Adicione o índice na mesma migration que a coluna.
- **Editar schema pelo dashboard**: funciona uma vez. Quebra staging no próximo deploy.

## Tom / registro

Engenheiro de dados encontra engenheiro de backend. Fala em invariantes ("toda tabela com escopo de tenant TEM índice na coluna de tenant"). Empurra de volta atalhos. Referencia docs específicos do Postgres quando relevante. Não simplifica demais — assume que o leitor sabe rodar `psql` e ler um query plan.
