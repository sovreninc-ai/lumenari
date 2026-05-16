# Sequências de E-mail

As cinco sequências que toda loja Shopify precisa rodando. Abandono de carrinho, série de boas-vindas, abandono de navegação, pós-compra, win-back. Cada uma é configurada para Klaviyo (ou Mailchimp) — a estrutura é agnóstica a plataforma.

Cada e-mail inclui: subject line (abaixo de 50 chars), preview text (abaixo de 90 chars), corpo. O kit produz o conjunto completo num prompt ou um e-mail de cada vez dependendo da necessidade do usuário.

---

## Sequência de abandono de carrinho (3 e-mails)

O flow de maior alavanca em DTC. Taxa de recuperação padrão da indústria é 10-15% dos carrinhos abandonados; flows bem ajustados batem 20%+.

**Horários de envio:** 1 hora após abandono, 24 horas após, 72 horas após.

### O prompt

```
Você está escrevendo uma sequência de abandono de carrinho de 3 e-mails.

Marca: [3-5 notas de voz]
AOV médio: [USD $X — afeta se o e-mail 3 deve incluir um desconto]
Categoria de produto: [vestuário / casa / beleza / alimentação / suplementos / etc.]
Objeções comuns: [liste 2-3 coisas em que clientes hesitam — custo de frete, incerteza de tamanho, política de devolução, perguntas sobre ingredientes]

Produza 3 e-mails:
- E-mail 1 (enviar 1 hora após abandono): cutucada amigável, sem desconto,
  foco no produto que ele deixou
- E-mail 2 (enviar 24 horas após): aborde a objeção mais provável
- E-mail 3 (enviar 72 horas após): incentivo — desconto, frete grátis ou
  prova social dependendo do AOV

Para cada um: subject line (abaixo de 50 chars), preview text (abaixo de
90 chars), corpo (120-200 palavras).
Sem palavras banidas. Sem urgência falsa.
```

### Exemplo trabalhado — marca de beleza, AOV USD $60

**E-mail 1 (1 hora após):**
```
Subject (32 chars): Seu carrinho deu uma sumida?
Preview (78 chars): O hidratante de ceramida que você olhou continua aqui quando você quiser.

Oi [primeiro nome],

Parece que você estava conferindo o hidratante de ceramida mais cedo. Ele continua no seu carrinho se você quiser retomar.

Algumas coisas que as pessoas geralmente querem saber antes de pedir:
- Frete grátis acima de USD $50
- Política de devolução de 60 dias, mesmo em frascos abertos
- Envia em 1-2 dias úteis a partir de Toronto

[Voltar ao seu carrinho →]

Se você decidiu que não era o fit certo, sem problemas. Somos fáceis de alcançar se quiser perguntar qualquer coisa.

— [Marca]
```

**E-mail 2 (24 horas após — abordando a objeção "isso é certo para minha pele"):**
```
Subject (44 chars): Sobre o hidratante no seu carrinho
Preview (82 chars): Nota rápida sobre o que faz o nosso funcionar para peles sensíveis, descascadas.

Oi [primeiro nome],

Nota rápida — a pergunta mais comum que recebemos sobre o hidratante de ceramida é "vai funcionar para mim?"

Foi construído para:
- Pele reativa a ativos ou fragrância
- Pessoas usando retinol ou outros ativos que precisam de uma base de baixa irritação
- Quem está fazendo limpeza excessiva ou descascando a barreira

Provavelmente não é o fit certo se:
- Você está procurando um creme noturno pesado oclusivo
- Você quer um gel fortemente hidratante — este é um hidratante balanceado, não uma bomba de hidratação

Se isso bate, [o frasco no seu carrinho] está aqui.

Se quiser perguntar qualquer coisa antes de pedir, responda a este e-mail. Eu leio essas.

— [Nome do fundador]
```

**E-mail 3 (72 horas após — incentivo suave):**
```
Subject (37 chars): Última nota antes de soltarmos
Preview (76 chars): 10% off no carrinho que você começou, mais um lembrete de por que ficam.

Oi [primeiro nome],

Vou deixar este nas suas mãos. O carrinho que você começou há alguns dias — vamos segurar pelas próximas 48 horas com 10% off se você quiser.

Use o código AINDAAQUI no checkout.

Para o que vale: temos rating 4,8 estrelas entre mais de 1.400 reviews, e o hidratante é nosso produto mais recomprado (a maioria dos clientes volta para um segundo frasco em até 10 semanas).

[Use AINDAAQUI no seu carrinho →]

De qualquer jeito, espero que encontre o que procura.

— [Marca]
```

---

## Série de boas-vindas (4 e-mails em 30 dias)

Enviada para novos inscritos de e-mail (cadastros via pop-up, formulário de rodapé ou pós-compra). 4 e-mails em 30 dias.

**Horários de envio:** imediatamente, dia 3, dia 10, dia 28.

### O prompt

```
Você está escrevendo uma série de boas-vindas de 4 e-mails para novos
inscritos.

Marca: [3-5 notas de voz]
História da marca (1-3 frases): [cole — o que faz esta marca existir]
Faixa de produto: [3-5 categorias ou produtos hero]
Incentivo de cadastro: [o que prometemos — 10% off, frete grátis, etc.]

Produza 4 e-mails:
- E-mail 1 (imediato): agradecimento + código de incentivo de primeira compra
- E-mail 2 (dia 3): história da marca — leitura de 1 minuto máx
- E-mail 3 (dia 10): mais vendidos ou como escolher o que é certo para você
- E-mail 4 (dia 28): CTA de comunidade / pedido de review / indicação

Para cada: subject line (abaixo de 50 chars), preview text (abaixo de
90 chars), corpo (150-250 palavras).
Sem palavras banidas.
```

### Exemplo trabalhado — marca de home goods, incentivo de cadastro: frete grátis

**E-mail 1 (imediato):**
```
Subject (28 chars): Bem-vindo — seu código abaixo
Preview (75 chars): Frete grátis no seu primeiro pedido, mais um resumo rápido do que fazemos.

Oi [primeiro nome],

Bem-vindo. Use o código FRETEGRATIS no checkout para frete grátis no seu primeiro pedido.

Fazemos home goods em pequenos lotes — velas, cerâmicas, têxteis — em uma oficina em Vancouver. Tudo é feito em lotes de 20-40 e a maior parte vende em um mês de reposição.

Algumas coisas que vale saber:
- Novos lotes saem na primeira sexta de cada mês
- Mandamos e-mail aos inscritos 24 horas antes do lançamento público
- Devoluções são aceitas em velas não abertas e têxteis não usados em 30 dias

Se você tiver perguntas antes de pedir, responda a este e-mail. Chega na minha mesa.

— [Nome do fundador]

[Código: FRETEGRATIS — Frete grátis, primeiro pedido]
```

**E-mail 2 (dia 3 — história da marca):**
```
Subject (33 chars): Como este lugar veio a existir
Preview (85 chars): Uma história curta sobre por que fazemos velas de cera de abelha em 2026.

[História da marca de 150-200 palavras — mantenha aterrada; sem linguagem de "paixão"; mostre a razão real pela qual a marca existe]
```

**E-mail 3 (dia 10 — mais vendidos / guia):**
```
Subject (42 chars): Se não sabe por onde começar...
Preview (88 chars): Algumas das nossas coisas mais recompradas, mais o que combinam.

[Guia de produto de 150-250 palavras; 3-4 mais vendidos com motivos de uma linha]
```

**E-mail 4 (dia 28 — CTA de indicação / review):**
```
Subject (37 chars): Um pequeno pedido se você pediu
Preview (89 chars): Se algo que você comprou aterrissou bem — você nos conta?

[Pedido curto de review sobre o que ele comprou, OU um CTA de indicação se ele ainda não comprou]
```

---

## Abandono de navegação (2 e-mails)

Enviado a inscritos que viram um produto mas não adicionaram ao carrinho. Intenção menor que abandono de carrinho — tom é mais suave.

**Horários de envio:** 4 horas após visualização de produto, 48 horas após.

### Prompt compacto

```
Marca: [3-5 notas de voz]
Produto visualizado: [nome do produto + descrição de 1 frase]
Motivo comum para alguém navegar sem adicionar: [cole — preço, tamanho,
ingredientes, sem tempo]

Produza:
- E-mail 1 (4 horas após visualização): mensagem leve "só para você ter o link"
- E-mail 2 (48 horas após visualização): uma peça de informação útil
  (um trecho de review, uma resposta de uma linha a uma objeção comum)

Cada um: subject abaixo de 50 chars, preview abaixo de 90 chars, corpo
80-150 palavras.
Sem palavras banidas. Sem desconto nesta sequência.
```

---

## Sequência pós-compra (3 e-mails)

Enviada após conclusão do pedido. Confirmação do pedido, notificação de envio, pedido de review.

**Horários de envio:** imediatamente, na confirmação de envio, 10-14 dias após entrega (para consumíveis) ou 21-30 dias após entrega (para compras consideradas).

### O padrão

Os dois primeiros (confirmação de pedido, envio) são majoritariamente transacionais mas o kit os deixa mais calorosos que os templates padrão do Shopify. O terceiro (pedido de review) é onde a escrita importa.

```
Marca: [notas de voz]
Produto recém-entregue: [nome]
Plataforma de review: [Judge.me / Yotpo / Loox / Shopify nativo]
Incentivo (se houver): [desconto na próxima compra, entrada num sorteio, nenhum]

Produza e-mail de pedido de review:
- Subject (abaixo de 50 chars)
- Preview (abaixo de 90 chars)
- Corpo (100-180 palavras)
- Único CTA claro para deixar um review
- Reconheça que reviews são um pedido pequeno e uma ajuda real
- Sem palavras banidas
- Não prometa que o review será publicado ou que deveria ser 5 estrelas
```

### Exemplo trabalhado — marca de suplementos

```
Subject (39 chars): Espero que o magnésio esteja indo bem
Preview (88 chars): Duas semanas é quando a maioria nota — pedido rápido se tiver um segundo.

Oi [primeiro nome],

Duas semanas é geralmente quando as pessoas começam a notar se o magnésio está fazendo o que esperavam ou se não é o fit certo.

Se você tiver 60 segundos, deixaria um review rápido? Honesto é mais útil para outras pessoas do que positivo — se não funcionou para você, preferimos saber.

[Deixar um review →]

E se algo aconteceu — produto errado, problema com cápsula, qualquer coisa — responda a este e-mail e a gente resolve.

Obrigado por experimentar a gente.

— [Fundador]
```

---

## Win-back (2 e-mails)

Enviado a clientes que não pedem há 60-120 dias (dependendo da categoria — consumíveis = mais curto, consideradas = mais longo).

**Horários de envio:** 60 dias inativos, 90 dias inativos.

### O prompt

```
Marca: [notas de voz]
Frequência média de pedido para esta marca: [a cada X semanas para
consumíveis, etc.]
Produtos mais prováveis de recompra: [liste 2-3]

Produza 2 e-mails:
- E-mail 1 (60 dias): check-in sem pressão, pergunte se está tudo bem
- E-mail 2 (90 dias): incentivo de baixo atrito — 15% off, frete grátis
  ou lembrete de reposição

Cada um: subject abaixo de 50 chars, preview abaixo de 90 chars, corpo
100-180 palavras.
Sem palavras banidas. Não implique que o cliente está ficando para trás.
Respeite autonomia.
```

### Exemplo trabalhado — marca de café

**E-mail 1 (60 dias):**
```
Subject (38 chars): Sem pressão — check-in rápido
Preview (75 chars): Só garantindo que sua situação de café não saiu dos eixos.

Oi [primeiro nome],

Faz uns dois meses desde seu último pedido — quis fazer um check-in. Sem pressão para pedir de novo; só garantindo que não derrubamos a bola em algum lugar.

Se você acabou e ficou ocupado, [o Etiópia Guji que você comprou da última vez ainda está no cardápio]. Se está experimentando algo novo de um torrefador diferente, ótimo — me conte o que acabou gostando e talvez eu adicione a uma lista de sourcing.

— [Fundador]
```

---

## O que sequências de e-mail boas não fazem

- **Desconto no e-mail 1.** Treine o cliente para esperar o desconto e você o treinou para nunca pagar o preço cheio.
- **Mandar a mesma copy genérica independente de categoria.** Um abandono de carrinho de suplementos deveria soar diferente de um abandono de carrinho de vela.
- **Usar contadores regressivos falsos.** Clientes percebem e a confiança erode.
- **Esconder o link de descadastro.** Torne encontrável. O boost na qualidade da lista por descadastros limpos vale a pequena perda de tamanho de lista.
- **Mandar o e-mail de win-back como se o cliente te devesse alguma coisa.** Respeite autonomia. O cliente tem o direito de não voltar.
