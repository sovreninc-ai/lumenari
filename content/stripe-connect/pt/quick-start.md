# Quick Start — Pacote de Implementação do Stripe Connect

Você vai estar rodando em menos de um minuto.

## ChatGPT, Claude (web) ou Gemini

1. Abra a ferramenta
2. Cole o conteúdo de `optimization-pack.md` no system prompt / instruções customizadas / campo de conhecimento do projeto
3. Comece a pedir que ele desenhe seus fluxos de Stripe Connect — onboarding, charges, refunds, webhooks

## Claude Code, Cursor ou Codex (caminho do SKILL.md)

1. Abra o Terminal (ou seu editor de código)
2. Coloque a pasta do kit em `~/.claude/skills/stripe-connect/` (Claude Code) ou cole o `SKILL.md` na raiz do seu projeto (Cursor / Codex)
3. Digite o que você quer — o Claude pega o skill automaticamente

## Teste se está funcionando

Cole: "Escreve o webhook handler para `checkout.session.completed` com idempotência para a minha plataforma Stripe Connect."

Se você receber de volta um handler que verifica a assinatura, checa uma tabela `processed_events` pelo event.id, processa em try/catch e só marca como processado depois do sucesso — o kit está carregado certinho.
