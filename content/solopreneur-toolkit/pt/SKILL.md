# Toolkit do Solopreneur

> A papelada e os posts de visibilidade que mantêm um negócio de uma pessoa rodando. Feito para o freelancer que preferia estar fazendo o trabalho do que escrevendo a proposta, mas sabe que a proposta é o que faz pagar.

**Otimizado para:** qualquer ferramenta de IA — Claude, ChatGPT, Gemini, Cursor, Codex. Cole o optimization pack como system prompt ou coloque no topo de uma conversa nova.

---

## Modo de operação

Você está ajudando um operador solo a tocar o lado de negócio de fazer o trabalho. O usuário provavelmente é:

- Um freelancer, consultor, designer, dev, copywriter, coach, fracional de algo
- Cobrando por projeto, por hora ou por mês
- O próprio time de vendas, ops, AR/AP e marketing
- Alérgico a linguagem corporativa, mas precisando soar crível diante de cliente

Pressupostos padrão:

- Eles têm uma conversa real de cliente acontecendo essa semana, não um funil hipotético
- Querem um rascunho para editar, não uma página em branco para encarar
- Vão colar o output em Gmail, Notion, HoneyBook, Stripe, LinkedIn — mantenha formatação limpa
- Dinheiro em CAD ou USD a menos que digam; sempre guarde como número simples + código da moeda
- Linguagem jurídica leva um "consulte um advogado da sua jurisdição" sempre que aparecer

**Defaults de tom:**

- Simples, segunda pessoa, conversacional. Do jeito que você escreveria para um cliente com quem já trabalhou.
- Confiante sem se gabar. Específico sem ser folheto.
- Sem "empolgado", sem "rock star", sem "ambiente acelerado", sem "synergy".
- Se você não diria em voz alta tomando café, não coloca na proposta.

**O que este kit recusa produzir:**

- Propostas com uma seção "Sobre nós" de 12 parágrafos
- Posts de LinkedIn que começam com "estou tão honrado em anunciar"
- Lembretes de pagamento atrasado que soam passivo-agressivos
- SOWs de 9 páginas quando 2 resolveriam
- Páginas de preço que escondem o preço

---

## O que tem dentro

### 1. Gerador de proposta com três padrões de tier de preço (`templates/proposal-and-sow.md`)

Três padrões de tier de preço que realmente fecham: Good/Better/Best, Fixed/Phased/Retainer e Outcome-based. Cada um vem com a linguagem exata para ancorar a opção do meio. Mais um template de SOW que você preenche em vez de escrever do zero, e um form de intake de discovery-call para perguntar ANTES de cotar.

### 2. Updates de cliente e nudges de fatura (`templates/client-updates-and-invoices.md`)

O update semanal de cliente que leva 4 minutos para escrever e para os e-mails "oi, só dando uma checada". Copy de fatura que recebe pagamento. Lembretes de pagamento atrasado em 7, 14 e 30 dias — profissional, escalando, nunca choroso.

### 3. Playbook de precificação e nicho (`playbooks/pricing-and-niching.md`)

Os scripts que você diz em voz alta quando um cliente empurra de volta no preço. Como aumentar tarifas com clientes existentes sem perdê-los. O prompt de brainstorm que ajuda você de fato a nichar em vez de continuar "um generalista que faz um pouco de tudo".

### 4. Optimization pack e quick start

`optimization-pack.md` é o system prompt completo — cole uma vez, rode todos os templates de uma IA configurada. `quick-start.md` te guia no setup de 60 segundos no Claude, ChatGPT, Gemini, Cursor e Codex.

`custom-gpt-instructions.md` é a versão Custom GPT do ChatGPT — coloque no campo de instruções e você tem um GPT do Solopreneur.

---

## Os padrões de prompt

Para todo artefato neste kit, a IA funciona melhor com esse formato de input:

```
[Quem eu sou]
Cargo + nicho (ex.: "designer de marca freelancer, na maioria SaaS startups, 5 anos na área")

[Quem é o cliente]
Nome, o que fazem, como nos conectamos, o que acham que precisam

[O que eu quero]
O artefato específico — proposta, SOW, update semanal, nudge de fatura, post de LinkedIn

[Restrições]
Faixa de orçamento, timeline, qualquer coisa sensível (ex.: "deram fantasma na última fatura")
```

Pular a linha [Quem eu sou] é o motivo nº 1 das propostas saírem genéricas. A IA não sabe se você é um escritor de $75/hora ou um consultor de $20K/projeto se você não disser.

---

## Três padrões que esse kit vai te empurrar para

### Padrão 1: Sempre cote três tiers

Propostas de preço único são comparadas com outras propostas de preço único. Propostas de três tiers fazem o cliente escolher entre as SUAS três opções. Mesmo que ele escolha o do meio (normalmente escolhe), você controlou o frame.

Exemplo trabalhado para um projeto de site:

- **Essentials** — 5 páginas, copy seu, design + build meus. CAD $4.500.
- **Standard** — 8 páginas, workshop de copywriting incluso, build + lançamento + 30 dias de ajustes pós-lançamento. CAD $7.800. *(a maioria dos clientes escolhe esse)*
- **Premium** — Tudo do Standard, mais refresh de marca, 90 dias de suporte pós-lançamento, review de conversão no dia 60. CAD $12.500.

A linha `(a maioria dos clientes escolhe esse)` na opção do meio é a âncora. Use.

### Padrão 2: Discovery antes de cotar

As propostas que fecham são as escritas DEPOIS de uma discovery call de 30 minutos. As propostas que viram fantasma são as escritas a partir de uma DM de um parágrafo. O form de intake em `templates/proposal-and-sow.md` é a estrutura da call — use antes de cotar, não depois.

### Padrão 3: Updates ganham de check-ins

O formato de update semanal de cliente mata os e-mails "oi, só dando uma checada" dos dois lados. Cinco linhas no máximo. O que foi feito, o que vem, o que preciso de você. O template está em `templates/client-updates-and-invoices.md`.

---

## O lado da visibilidade

Um solopreneur sem pipeline está a um mês ruim de uma application de emprego. Os templates de LinkedIn neste kit são escritos para o operador que acha postar constrangedor mas sabe que funciona.

Três formatos que consistentemente trazem inbound:

1. **O post de build-in-public** — "Eis o que acabei de entregar para um cliente (com permissão)." Concreto, amigável a screenshot, sem humblebrag.
2. **O post de ensina-uma-coisa** — escolha um erro que você cometia, nomeie, explique o fix. 4-6 linhas.
3. **O autoresponder de "saindo de férias" + post de follow-up** — agendamentos costumam pular logo depois que você anuncia que fechou. Contraintuitivo mas consistente.

Os três estão em `playbooks/pricing-and-niching.md` com copy pronto para colar.

---

## Contratos, impostos e a linha do advogado

Esse kit produz rascunhos. Não produz documentos jurídicos finais e vinculantes.

- Todo SOW e proposta que você manda deveria ser revisado por um advogado da sua jurisdição pelo menos uma vez, depois você pode reusar o template.
- Classificação de contratado independente varia por país e estado/província. O kit rascunha, mas não decide.
- Tratamento de sales tax / GST / HST / VAT é seu trabalho — os templates deixam linhas placeholder para você preencher.

Quando pedirem para a IA produzir uma cláusula contratual, ela deve anexar:

> *Consulte um advogado da sua jurisdição antes de confiar nessa cláusula.*

Essa linha é inegociável. Está no optimization pack.

---

## O que esse kit NÃO vai fazer por você

- Te achar clientes. Posts de visibilidade ajudam, mas o kit não toca seu outreach.
- Decidir seus preços. Te dá frameworks e scripts, mas você define o número.
- Substituir um contador. Templates de pagamento atrasado não consertam um cliente cronicamente lento.
- Te fazer nichar. O prompt de brainstorm te ajuda a PENSAR sobre. A decisão ainda é sua.

---

## Docs complementares

- `optimization-pack.md` — system prompt completo para qualquer chat IA
- `custom-gpt-instructions.md` — formato Custom GPT do ChatGPT
- `quick-start.md` — setup de 60 segundos por plataforma
- `templates/proposal-and-sow.md` — gerador de proposta de três tiers, template de SOW, form de intake-call
- `templates/client-updates-and-invoices.md` — updates semanais, copy de fatura, lembretes de pagamento atrasado
- `playbooks/pricing-and-niching.md` — scripts de conversa de preço, brainstorm de nicho, templates de LinkedIn
