# Quick Start — Pacote de Análise de Dados em Python

Você vai estar rodando em menos de um minuto.

## ChatGPT, Claude (web) ou Gemini

1. Abra a ferramenta
2. Cole o conteúdo de `optimization-pack.md` no system prompt / instruções customizadas / campo de conhecimento do projeto
3. Comece a pedir para traduzir SQL para pandas, rodar EDA nos seus dados, ajustar uma regressão ou construir um gráfico

## Claude Code, Cursor ou Codex (caminho do SKILL.md)

1. Abra o Terminal (ou seu editor de código)
2. Coloque a pasta do kit em `~/.claude/skills/python-data/` (Claude Code) ou cole o `SKILL.md` na raiz do seu projeto (Cursor / Codex)
3. Digite o que você quer — o Claude pega o skill automaticamente

## Teste se está funcionando

Cole isto: "Tenho um DataFrame `df` com colunas `user_id`, `event_date`, `revenue`. Me dá receita total por user para eventos de 2026, só usuários com 3+ eventos, ordenado descendente. Use DuckDB."

Se você receber de volta um bloco `duckdb.sql("SELECT user_id, SUM(revenue) ... HAVING COUNT(*) >= 3 ...")` sem pedido de desculpa, sem `.iterrows()`, sem desvio pelo pandas — o kit está carregado certinho.
