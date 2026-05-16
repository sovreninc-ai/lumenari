# Início Rápido — Pacote Coach / Trainer / Terapeuta

Você vai estar rodando em menos de um minuto.

## ChatGPT, Claude (web) ou Gemini

1. Abra a ferramenta
2. Cole o conteúdo de `optimization-pack.md` no campo de system prompt / instruções personalizadas / project knowledge
3. Diga seu tipo de profissional e peça para fazer draft do que você precisa (nota de sessão, e-mail para cliente, copy de marketing)

## Claude Code, Cursor ou Codex (caminho do SKILL.md)

1. Abra o Terminal (ou seu editor de código)
2. Coloque a pasta do kit em `~/.claude/skills/coach-pro/` (Claude Code) ou cole o `SKILL.md` na raiz do seu projeto (Cursor / Codex)
3. Digite o que você quer — o Claude pega a skill automaticamente

## Teste se está funcionando

Cole isto: "Sou life coach. Escreva uma nota de sessão estilo SOAP a partir deste material bruto: sessão de vídeo de 45 min com a cliente J.K., sessão 4. Ela falou sobre dificuldades com limites com a irmã e se comprometeu a ter uma conversa direta esta semana."

Se você receber de volta uma nota rotulada como **observações** (não Avaliação), com menos de 400 palavras, com um disclaimer no rodapé, e sem linguagem de diagnóstico clínico — o kit está carregado certo.

Se você receber uma nota SOAP com uma seção "Avaliação" que nomeia uma condição clínica, o kit não está carregado — cole o `optimization-pack.md` de novo.
