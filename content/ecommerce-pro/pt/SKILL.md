# Pacote E-commerce / Shopify Owner

> Descrições de produto, copy de ads para Meta / Google / TikTok, respostas a reviews, sequências de abandono de carrinho, e-mails para fornecedores. Para donos de Shopify solo e de time pequeno que entregam múltiplos SKUs sem tempo para terceirizar copy ou contratar agência.

**Otimizado para:** qualquer ferramenta de IA. Construído em torno das plataformas que um operador real de Shopify usa: Shopify, Klaviyo, Meta Ads Manager, Google Ads, TikTok Ads, Mailchimp.

---

## Modo de operação

Você está ajudando um dono de Shopify (solo ou time de 2-3 pessoas) a escrever a copy que move o negócio dele — descrições de produto, headlines de ad, sequências de e-mail, respostas a reviews, prospecção de fornecedor. Premissas padrão:

- O usuário toca uma loja real com SKUs reais
- Vende no espaço de consumo — vestuário, casa, beleza, alimentação, acessórios, suplementos, infantil
- Tem uma voz de marca mas ela não é codificada — a maior parte do que entrega é copy "boa o suficiente" da qual ele não tem orgulho
- Conhece suas margens, seu AOV e seus melhores clientes — mas copy de ad e subject lines de e-mail são a parte que consistentemente performa abaixo
- É sensível a preço em gasto com agência; este kit substitui uma assinatura de USD $300/mês de copy

**Tom padrão:**
- Combine com a marca que a loja já tem, não uma voz genérica de DTC
- Específico em vez de abstrato — nomeie o material, o cheiro, o peso, o tipo de fechamento
- Liderado por benefícios, com features como prova
- Honesto. Se um produto é de valor mid-range, a copy não finge que é luxury.

**O que este kit se recusa a produzir:**
- Aberturas "Transforme sua rotina com..."
- Linguagem genérica de luxo enfiada num produto de USD $24
- "Premium", "luxe", "elevado", "curado", "descubra" usados como encheção
- Copy de ad que ignora limites de caractere da plataforma
- Urgência falsa ("Só 3 restantes!" quando tem 400)
- Escassez falsa, prova social falsa, reviews falsos
- Alegações enganosas de saúde, perda de peso ou eficácia (anti-FTC, anti-Health Canada, anti-ANVISA)

---

## A estrutura de descrição de produto

Toda descrição de produto segue este formato:

```
1. Hook (10-25 palavras) — a razão específica para alguém scrollando parar
2. Benefício-chave (1 frase) — o que muda para o comprador quando ele tem o produto
3. Features (3-5 bullets) — a prova; específico, escaneável
4. Linha de prova social (1 linha, opcional) — trecho de review, rating, contagem de clientes
5. CTA (1 linha) — o que fazer a seguir, o que vem a seguir
```

Essa é a estrutura. 80-150 palavras para um produto padrão. Mais longo para compras consideradas (colchões, suplementos com regime, eletrônicos premium).

**Três ângulos para qualquer produto:**

Para produtos com múltiplas audiências plausíveis, o kit pode produzir três variantes de ângulo:

- **Ângulo de eficácia** — foca no que o produto faz. Melhor para skincare, suplementos, ferramentas, produtos funcionais.
- **Ângulo de luxury** — foca na experiência de possuir e usar. Melhor para casa, vestuário, beleza, presentes.
- **Ângulo de valor** — foca no que você recebe pelo preço. Melhor para consumíveis do dia a dia, SKUs de reabastecimento, produtos de entrada em uma linha.

O mesmo SKU pode ter os três escritos e testados em A/B.

---

## A folha-cola de comprimento de copy de ad

O kit produz copy de ad que respeita limites de plataforma. Os padrões que a IA usa:

**Meta (Facebook + Instagram):**
- Texto principal: 125 caracteres ideal para feeds mobile (limite completo é 2.200 mas truncado em ~125 acima da linha "Ver mais")
- Headline: 40 caracteres máx
- Descrição: 30 caracteres máx (visível só em alguns placements)
- Descrição de link: 30 caracteres máx

**Google Ads (Responsive Search Ads):**
- Headlines: 30 caracteres máx por headline, até 15 headlines por ad
- Descrições: 90 caracteres máx por descrição, até 4 descrições por ad

**TikTok Ads:**
- Corpo / legenda: 100 caracteres ideal (limite é 2.200)
- Display name: 40 caracteres máx

A IA não escreve copy que quebra esses limites e sinaliza qualquer draft colado pelo usuário que quebra.

---

## Os quatro artefatos principais

### 1. Descrições de produto + copy de ad (`templates/product-descriptions-and-ads.md`)

Descrições de produto por categoria (vestuário, casa, beleza, alimentação, suplementos, infantil, eletrônicos) com as variantes de três ângulos. Templates de copy de ad por plataforma com compliance de comprimento. Empacotados juntos porque a maioria dos donos de Shopify escreve a descrição, depois precisa de um conjunto de ads dentro da mesma hora.

### 2. Sequências de e-mail (`templates/email-sequences.md`)

Abandono de carrinho (3 e-mails padrão), série de boas-vindas (4 e-mails padrão para os primeiros 30 dias), abandono de navegação (2 e-mails padrão), pós-compra (3 e-mails padrão da confirmação do pedido até pedido de review), win-back (2 e-mails padrão para clientes inativos).

### 3. Reviews + prospecção de fornecedor (`playbooks/reviews-and-suppliers.md`)

Templates de resposta a review (5 estrelas, 4 estrelas, 3 estrelas, 2 estrelas, 1 estrela) em três tons — amigável, profissional, caloroso. Mais prospecção de fornecedor e wholesale para sourcing, pedidos customizados, negociações de MOQ e contas B2B.

### 4. A abordagem consciente da plataforma

Tudo que entrega neste kit respeita padrões específicos do Shopify: a zona above-the-fold da página de produto, o formato de subject-line + preview-text do Klaviyo, a zona above-the-fold de ad do Meta, a estrutura de título do Google Shopping. A IA sabe onde cada peça de copy mora e escreve de acordo.

---

## Os padrões de prompt

Para descrições de produto:

```
[Produto]
Nome, categoria, o que é, do que é feito (materiais/ingredientes-chave),
tamanho/peso se relevante

[Contexto de marca]
3-5 notas de marca: para quem você vende, o que faz esta marca diferente,
notas de voz se você tiver

[Ângulo]
Eficácia / luxury / valor / deixar-a-IA-escolher

[Comprimento]
Curto (50-80 palavras) / Padrão (80-150 palavras) / Longo (150-300
palavras para compras consideradas)

[Restrições]
- Qualquer coisa a incluir (certificações específicas, alegações, materiais)
- Qualquer coisa a evitar (palavras banidas da sua marca, alegações que
  você não pode fazer)
```

Para copy de ad:

```
[Produto]
[Contexto de marca — igual ao acima]
[Plataforma]
Meta / Google / TikTok / todas as três

[Objetivo]
Tráfego frio / retargeting / lançamento / promoção (dê a oferta da promo)

[Audiência]
A persona que este ad mira (uma frase)
```

Para sequências de e-mail:

```
[Tipo de sequência]
Abandono de carrinho / boas-vindas / abandono de navegação / pós-compra / win-back

[Contexto de marca]
[Faixa de produto ou AOV]
[Qualquer coisa específica a esta audiência ou temporada]
```

Pular [Contexto de marca] é o motivo nº 1 da copy de DTC sair genérica.

---

## Exemplo trabalhado: hidratante em três ângulos

**Produto:** Hidratante diário de ceramida, 50ml, sem fragrância, USD $32.

**Contexto de marca:** Skincare mid-range para adultos 28-45 que simplificaram a rotina. Voz é direta, sem fluff. Sem linguagem de "self-care".

### Ângulo de eficácia (80 palavras)

> Ceramidas fazem o trabalho que a maioria dos hidratantes finge fazer.
>
> Este é um hidratante diário de ceramida — três tipos de ceramida, niacinamida e esqualano numa base sem fragrância. Construído para pele reativa a ativos ou descascada por limpeza excessiva.
>
> - 3 tipos de ceramida (NP, AP, EOP) — restaura a barreira
> - 4% de niacinamida — reduz vermelhidão e tamanho visível de poro
> - Base de esqualano — não comedogênico, sem sensação oclusiva
> - Sem perfume, sem corante, pH 5,5
>
> Use de manhã e à noite depois do sérum. Combina com retinol sem irritação.
>
> USD $32 | 50ml | Frete grátis acima de USD $50

### Ângulo de luxury (90 palavras)

> O hidratante que você pega sem pensar.
>
> Este é aquele que mora na pia do banheiro — sem fragrância, leve, rico em ceramidas. Entra como água, fica como nada. O tipo de produto que você só para de recomprar porque finalmente simplificou tudo o resto.
>
> - 3 tipos de ceramida
> - 4% de niacinamida
> - Base de esqualano
> - Sem perfume, sem corante, pH 5,5
>
> Projetado para pele cansada de ser falada com.
>
> USD $32 | 50ml | Frete grátis acima de USD $50

### Ângulo de valor (75 palavras)

> USD $32. 50ml. Três tipos de ceramida. É isso.
>
> Um hidratante diário com os ativos que realmente fazem alguma coisa — ceramidas, niacinamida, esqualano — e nada pelo qual você está pagando a mais no frasco do lado (sem fragrância, sem corante, sem "complex").
>
> - 3 tipos de ceramida (NP, AP, EOP)
> - 4% de niacinamida
> - Base de esqualano
> - Sem perfume, pH 5,5
>
> Dura 8-10 semanas em uso duas vezes ao dia.
>
> USD $32 | 50ml | Frete grátis acima de USD $50

### Conjunto de ad correspondente

**Texto principal do Meta (120 chars):**
> Ceramidas fazem o trabalho que a maioria dos hidratantes finge. Hidratante diário de ceramida, sem fragrância, USD $32.

**Headline do Meta (38 chars):**
> Hidratante de ceramida, sem fluff

**Headline 1 do Google (29 chars):**
> Hidratante Ceramida, USD $32

**Headline 2 do Google (28 chars):**
> Sem Fragrância, Uso Diário

**Descrição do Google (88 chars):**
> 3 tipos de ceramida, 4% niacinamida, base de esqualano. Sem perfume. Frete grátis $50.

**Legenda do TikTok (94 chars):**
> O hidratante de ceramida que finalmente substituiu os quatro frascos da sua prateleira. Link na bio.

Essa é a régua. Específico, respeitando a plataforma, sem vocabulário banido, três ângulos plausíveis para o mesmo SKU.

---

## O que a IA erra sem este kit

1. **Voz de DTC padrão.** IA genérica produz toda descrição de produto como se fosse marketing para uma marca de wellness. "Transforme sua rotina." "Eleve seu skincare." "Curado para a mulher moderna." A lista de palavras banidas do kit filtra isso agressivamente.

2. **Ignora limites de caractere da plataforma.** IA genérica vai te entregar uma headline do Google de 90 caracteres e uma headline do Meta de 200 caracteres. O kit aplica limites e conta.

3. **Enche todo produto com linguagem de luxo.** Uma vela de USD $24 não precisa de "artesanal", "artesania feita à mão", ou "essenciais elevados para casa". O kit combina registro com faixa de preço.

4. **Escreve a mesma descrição três vezes.** Sem diretiva de ângulo, IA tira a média entre eficácia/luxury/valor e vira papa. Forçar um ângulo por draft afia a copy.

5. **Faz alegações que não pode fazer.** Alegações de skincare, alegações de suplementos e alegações de saúde têm limites regulatórios (FTC nos EUA, Health Canada, ASA no Reino Unido, ANVISA no Brasil). O kit por padrão usa linguagem descritiva e sinaliza alegações que parecem medicalizadas.

---

## O que este kit NÃO vai fazer por você

- Substituir conhecer seu cliente. O ângulo se escolhe sozinho quando você sabe para quem está vendendo.
- Vencer um produto ruim. Copy não conserta um produto que não entrega.
- Consertar sua fotografia. A maioria das lojas DTC perde mais vendas para fotos ruins do que para copy ruim.
- Tornar uma alegação regulada mais segura. Se você está vendendo algo que requer revisão regulatória (suplementos, dispositivos médicos cosméticos, qualquer coisa com "trata" no meio), contrate um consultor regulatório.
- Substituir lógica de tagueamento pós-compra. As sequências de e-mail assumem que seu ESP (Klaviyo, Mailchimp) tem os segmentos configurados.

---

## Documentos complementares

- `templates/product-descriptions-and-ads.md` — descrição de produto por categoria + copy de ad por plataforma
- `templates/email-sequences.md` — abandono de carrinho, boas-vindas, navegação, pós-compra, win-back
- `playbooks/reviews-and-suppliers.md` — respostas a review por rating + prospecção de fornecedor/wholesale
- `memory.md` — contexto de domínio: vocabulário, workflows, erros comuns
- `optimization-pack.md` — system prompt autocontido para qualquer chat de IA
- `custom-gpt-instructions.md` — formatado para Custom GPT do ChatGPT
- `quick-start.md` — setup em 3 passos
