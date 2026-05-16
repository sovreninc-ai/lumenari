# Quick Start — Anúncios Imobiliários + Análise de Mercado

Você deve estar rodando em menos de 60 segundos. Escolha sua ferramenta.

## Usuários Claude

Abra o Claude. Crie um Projeto novo (plano Pro ou Team é necessário para projetos, mas o prompt funciona num chat normal também). No campo "Custom instructions" ou "Project knowledge" do projeto, cole o conteúdo inteiro de `optimization-pack.md`. Faça upload dos arquivos em `templates/` no project knowledge para o Claude ter como referência. Comece uma conversa nova no projeto. Primeira mensagem: diga ao Claude sua jurisdição (estado ou província), depois descreva o artefato que quer — "Preciso de public remarks MLS para um condo de 3 quartos em [bairro]" ou "Roda uma CMA nesse imóvel, comps vêm na próxima mensagem".

## Usuários ChatGPT

Abra o ChatGPT. Clique "Explore GPTs" → "Create a GPT" (plano Plus exigido). No campo "Instructions", cole o conteúdo inteiro de `custom-gpt-instructions.md`. Em "Conversation starters", use os cinco listados no fim daquele arquivo. Em "Knowledge", suba os arquivos markdown da pasta `templates/`. Salve o GPT (privado para você está ok). Abra e comece com: "Oi, sou um corretor de [estado/província]. Eis o que preciso hoje: [artefato]."

Se você não tem ChatGPT Plus, só cole `optimization-pack.md` no topo de um chat normal. Vai funcionar — você só perde o GPT persistente e os uploads de arquivo.

## Gemini, Codex, Cursor ou qualquer outra ferramenta de IA

Abra a ferramenta. Comece uma conversa nova. Cole o conteúdo inteiro de `optimization-pack.md` como sua primeira mensagem. Adicione: "Confirme que carregou isso e me pergunte jurisdição e tipo de artefato." Quando responder, você está pronto.

Para Gems do Gemini especificamente: crie um Gem novo, cole `optimization-pack.md` no campo de instruções, salve e use esse Gem em vez do chat default.

---

## Teste se está funcionando

Quando carregar o system prompt, cole isto:

```
Test run. Sou um corretor licenciado em [seu estado ou província]. Preciso de public remarks MLS para uma casa unifamiliar: 4 quartos, 3 banheiros, 2.400 sqft, construída em 2018, num lote de esquina de 0,18 acre em [seu bairro]. Features: cozinha de chef com ilha, basement acabado, quintal cercado, garagem para dois carros com EV charger. Comprador provável: família em upgrade vinda de um townhouse, quer espaço externo. Limite de 900 caracteres.
```

Se você receber de volta uma listagem na estrutura (lead → layout → features → localização → fechamento), abaixo de 900 caracteres, com um bloco "Coisas para verificar antes de publicar" no fim, o kit está carregado certinho. Se te deu "Bem-vindo ao lar!" ou "Este imóvel deslumbrante ostenta" em qualquer ponto do output, o system prompt não carregou — tente colar de novo.
