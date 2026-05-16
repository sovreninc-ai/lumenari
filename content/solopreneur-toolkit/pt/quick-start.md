# Quick Start — setup de 60 segundos

Três parágrafos, um por plataforma. Escolha o seu, cole, teste.

---

## Claude (claude.ai ou Claude na API)

Crie um Projeto novo no Claude (sidebar à esquerda, "Projects" → "New Project"). Chame de "Solopreneur Co-Pilot". No campo **Instructions** do Projeto, cole o conteúdo completo de `optimization-pack.md`. Salve. Todo chat que você abrir dentro daquele Projeto agora roda em modo solopreneur. Para uso pontual sem Projeto, só cole o optimization pack como primeira mensagem num chat novo.

**Teste:** abra um chat novo no Projeto e cole o test prompt abaixo.

---

## ChatGPT (Custom GPT ou chat pontual)

Para um Custom GPT (recomendado se tem plano Plus ou Team): vá em "My GPTs" → "Create a GPT" → aba "Configure". No campo **Instructions**, cole o conteúdo de `custom-gpt-instructions.md`. Chame de "Solopreneur Co-Pilot". Dê uma descrição curta tipo "Propostas, SOWs, faturas e posts de visibilidade para negócios de uma pessoa." Salve e comece a conversar. Para uso pontual, cole `optimization-pack.md` como primeira mensagem em qualquer thread normal do ChatGPT.

**Teste:** abra seu novo GPT e cole o test prompt abaixo.

---

## Gemini, Cursor, Codex (ou qualquer outra IA)

Para **Gemini Advanced**, crie um Gem novo ("Gems" → "Create new Gem"). Cole o optimization pack no campo de instruções do Gem, salve e use esse Gem para trabalho de solopreneur. Para **Cursor**, esse kit é menos relevante (Cursor é para código), mas você pode colar o optimization pack no `.cursorrules` se também quiser ajuda do lado de negócio dentro do seu editor de código. Para **Codex / GitHub Copilot Chat / qualquer outra IA**, cole o optimization pack como primeira mensagem numa conversa nova e cole de novo no começo de cada nova thread de conversa.

**Teste:** use o test prompt abaixo para confirmar que o setup está funcionando.

---

## Test prompt colável

Cole isto exato na sua IA configurada:

```
Sou um designer de marca freelancer. Na maioria SaaS startups, 5 anos na área. Uma founder chamada Priya numa fintech Série A (time de 15 pessoas, Toronto) acabou de me mandar e-mail — ela quer um "refresh de marca" para o produto. Ela mencionou um orçamento de "uns $8K CAD" mas disse que tem flexibilidade se o escopo fizer sentido. Temos discovery call marcada para quinta.

Duas coisas que preciso:
1. Um form de intake de 10 perguntas para mandar para ela antes da call.
2. Uma proposta de três tiers que eu possa mandar 24 horas depois da call. Use placeholders para qualquer coisa que vamos descobrir no discovery.

Mantenha cada um abaixo de uma tela. Eu edito.
```

Você deve receber de volta um form de intake limpo (10-12 perguntas, agrupadas com sentido) e uma proposta de três tiers com o tier do meio marcado `(a maioria dos clientes escolhe esse)` — preço em torno de $5K / $8K / $14K CAD, com placeholders para os específicos da call.

Se você receber de volta um muro de texto corporativo ou uma proposta de preço único, o optimization pack não está carregado certo. Cole de novo.
