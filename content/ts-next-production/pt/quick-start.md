# Quick Start — Pacote de Produção TypeScript + Next.js

Você vai estar rodando em menos de um minuto.

## ChatGPT, Claude (web) ou Gemini

1. Abra a ferramenta
2. Cole o conteúdo de `optimization-pack.md` no system prompt / instruções customizadas / campo de conhecimento do projeto
3. Comece a pedir para ela escrever código Next.js + Supabase pronto para produção

## Claude Code, Cursor ou Codex (caminho do SKILL.md)

1. Abra o Terminal (ou seu editor de código)
2. Coloque a pasta do kit em `~/.claude/skills/ts-next-production/` (Claude Code) ou cole o `SKILL.md` na raiz do seu projeto (Cursor / Codex)
3. Digite o que você quer — o Claude pega o skill automaticamente

## Teste se está funcionando

Cole: "Escreve para mim uma server action que atualiza uma linha de `teams.name` com validação Zod e revalidatePath."

Se você receber de volta código que retorna uma discriminated union `ActionResult`, usa Zod, usa o client Supabase com escopo de usuário e chama `revalidatePath`, o kit está carregado certinho.
