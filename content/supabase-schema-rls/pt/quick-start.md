# Quick Start — Pacote de Schema & RLS do Supabase

Você vai estar rodando em menos de um minuto.

## ChatGPT, Claude (web) ou Gemini

1. Abra a ferramenta
2. Cole o conteúdo de `optimization-pack.md` no system prompt / instruções customizadas / campo de conhecimento do projeto
3. Comece a pedir que ele desenhe schemas + policies RLS para a sua app multi-tenant

## Claude Code, Cursor ou Codex (caminho do SKILL.md)

1. Abra o Terminal (ou seu editor de código)
2. Coloque a pasta do kit em `~/.claude/skills/supabase-schema-rls/` (Claude Code) ou cole o `SKILL.md` na raiz do seu projeto (Cursor / Codex)
3. Digite o que você quer — o Claude pega o skill automaticamente

## Teste se está funcionando

Cole: "Desenhe o schema e as policies RLS para uma tabela `invoices` no meu SaaS multi-tenant. Members podem ler; admins podem escrever."

Se você receber de volta uma migration com `organization_id`, o índice, RLS habilitado, policies separadas de leitura/escrita usando `is_member_of` / `has_role`, o kit está carregado certinho.
