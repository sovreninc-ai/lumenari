# Quick Start — Cold Outreach + Follow-up de Vendas

Rodando em menos de 60 segundos. Escolha sua ferramenta.

## Usuários Claude

Abra o Claude. Crie um Projeto novo. Em "Custom instructions" ou "Project knowledge", cole o conteúdo inteiro de `optimization-pack.md`. Suba os arquivos de `frameworks/`, `templates/` e `playbooks/` para o Claude ter como referência. Comece uma conversa nova no projeto. Primeira mensagem: diga ao Claude seu ICP em uma frase, qual artefato você quer e o sinal específico do prospect. Exemplo: "ICP: VPs de Engenharia em SaaS Série A, 50-200 funcionários. Cold email. Sinal: levantaram rodada B há 3 semanas liderada por [VC]. Valor: a gente reduz gasto de CI/CD reduzindo reruns de testes flaky."

## Usuários ChatGPT

Abra o ChatGPT. Clique "Explore GPTs" → "Create a GPT" (Plus exigido). Em "Instructions", cole o conteúdo inteiro de `custom-gpt-instructions.md`. Em "Conversation starters", use os cinco no fim daquele arquivo. Em "Knowledge", suba os arquivos markdown de `frameworks/`, `templates/` e `playbooks/`. Salve o GPT privado. Abra. Primeira mensagem: ICP + artefato + sinal, mesmo do exemplo Claude acima.

Se não tem Plus, cole `optimization-pack.md` no topo de um chat normal. Mesmo resultado, sem persistência.

## Gemini, Codex, Cursor ou qualquer outra ferramenta de IA

Abra a ferramenta. Comece uma conversa nova. Cole o conteúdo inteiro de `optimization-pack.md` como sua primeira mensagem. Adicione: "Confirme que carregou isso e me pergunte ICP, artefato e sinal." Quando responder, você está pronto.

Para Gems do Gemini: crie um Gem novo, cole `optimization-pack.md` nas instruções, salve, use o Gem em vez do chat default.

---

## Teste se está funcionando

Quando carregar o system prompt, cole isto:

```
Test run.

ICP: VPs de Engenharia em SaaS Série A, 50-200 funcionários, baseados nos EUA, construindo frontend React.
Prospect: Sarah Chen, VP Engenharia na Beacon Labs. Sinal: ela postou no LinkedIn há 4 dias sobre o pipeline de CI/CD do time virar gargalo depois que dobraram o time de engenharia.
Valor: a gente reduz reruns de testes flaky em 60%, o que corta minutos de CI e as paginações de on-call que vêm com eles.
Prova: Linear e Vercel são clientes.
CTA: 15 min na próxima terça ou quarta.
Restrição: abaixo de 75 palavras, assunto abaixo de 40 caracteres.

Escreva o cold email.
```

Se você receber de volta um e-mail que:
- Referencia o post específico do LinkedIn da Sarah sobre dor de CI/CD
- Declara o valor em linguagem simples sem "transformar" ou "revolucionar"
- Tem um pedido único com horários propostos
- Vem abaixo de 75 palavras
- Termina com um bloco "duas coisas que você pode querer mudar"

…o kit está carregado certinho. Se o e-mail começa com "Espero que esse e-mail te encontre bem" ou "Queria entrar em contato", o system prompt não carregou — tente colar de novo no topo da conversa.
