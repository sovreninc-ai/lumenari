# Prompt de CMA + Três Cenários de Comp Trabalhados

Prompts de análise comparativa de mercado que produzem uma faixa de preço defensável, não um número único gerado por médias. Três cenários, porque listagens reais raramente vêm com comps limpos.

---

## O prompt mestre de CMA

Cole isto. O system prompt (`optimization-pack.md`) cuida do tom e da estrutura; isto dá à IA os inputs que ela precisa.

```
Roda uma CMA para mim.

Imóvel-alvo:
- Endereço ou bairro: [nome]
- Quartos / Banheiros / Metragem / Lote: [detalhes]
- Ano de construção: [ano]
- Condição (1-10): [#]
- Features notáveis que afetam o valor: [liste 3-5]

Vendas comparáveis (3-6, vendidas nos últimos 180 dias, em ~1 milha, perfil similar):

Comp 1:
- Endereço: [nome]
- Preço de venda: $[valor]
- Data de venda: [data]
- Quartos / Banheiros / Metragem / Lote / Ano: [detalhes]
- Condição: [#]
- DOM: [#]
- Uma frase de como se compara ao alvo: [texto]

Comp 2:
[mesma estrutura]

Comp 3:
[mesma estrutura]

(continue para quantos tiver, até 6)

Atualmente ativo ou em contrato (2-3 se disponível):

Ativo 1:
- Endereço: [nome]
- Preço de listagem: $[valor]
- DOM: [#]
- Uma frase de como se compara: [texto]

(continue)

Minha leitura:
[Mesmo um chute. "Acho que isso vale $X a $Y porque Z." Isso ancora a análise no meu julgamento em vez de pura média de dado.]

Output que eu quero:
- Faixa de preço (baixo / provável / alto)
- 2-3 frases explicando o spread
- 3-5 perguntas para fazer ao vendedor antes de fechar o preço de listagem
- Qualquer coisa que você notou nos comps que eu deveria chegar pronto para discutir no encontro de listagem
```

---

## Cenário 1: comps limpos, spread apertado

Você tem 4-5 comps fortes nos últimos 90 dias, todos dentro de 10% do perfil do alvo. Esse é o caso fácil — o trabalho da IA é confirmar sua leitura e levantar uma ou duas coisas que você pode ter perdido.

### Inputs

**Alvo:** 3 quartos / 2 banheiros / 1.640 sqft, casa estilo ranch em Sugar Land, TX. Lote 0,18 acre. Construída 1998. Condição 7/10 — cozinha recente, banheiros originais. Garagem para dois carros. HVAC atualizado (2022).

**Comp 1:** Mesmo loteamento, 1.580 sqft, vendido há 38 dias por $385.000. Atualizações similares. DOM 14.

**Comp 2:** Loteamento adjacente, 1.700 sqft, vendido há 62 dias por $402.000. Banheiros totalmente reformados (alvo não tem). DOM 9.

**Comp 3:** Mesmo loteamento, 1.610 sqft, vendido há 71 dias por $379.000. Cozinha original. DOM 21.

**Comp 4:** Mesmo loteamento, 1.720 sqft, vendido há 22 dias por $398.000. Piscina. DOM 7.

**Ativo:** Mesmo loteamento, 1.680 sqft, listado a $409.000, 31 dias no mercado. Totalmente atualizado.

**Minha leitura:** Provavelmente $388-395K. O comp da piscina e o de banheiros reformados estão puxando para cima; o de cozinha original puxa para baixo. Estou pensando em $390K na listagem.

### Output (o que a IA deve produzir)

```
CMA — Alvo: ranch 3/2/1640, Sugar Land

Resumo dos comps:
- Comp 1 ($385K, 38d atrás, 1580 sqft): match mais próximo — pequeno ajuste para baixo por sqft
- Comp 2 ($402K, 62d atrás, 1700 sqft): puxa para cima por banheiros reformados; alvo não tem
- Comp 3 ($379K, 71d atrás, 1610 sqft): puxa para baixo por cozinha antiga; alvo está atualizado
- Comp 4 ($398K, 22d atrás, 1720 sqft): prêmio de piscina aproximadamente $8-12K; remova para comparação justa ≈ $387-390K
- Ativo 1 a $409K, 31 DOM: sinal de teto — totalmente atualizado e parado

Faixa de preço:
- Baixo: $385.000
- Mais provável: $389.000-$392.000
- Alto: $396.000 (só com tráfego forte de visitas na semana 1)

Explicação: Seu alvo se encaixa limpo entre o comp de cozinha original e o de banheiros reformados, que é exatamente onde o preço deveria cair. O comp da piscina ajusta para baixo pela ausência. O ativo de $409K está parado há 31 dias — esse é um claro sinal de teto, o mercado não vai recompensar precificação de totalmente reformado sem os banheiros reformados.

Sua leitura de $390K está bem suportada. Eu sugeriria precificar em $389.900 para ficar logo abaixo do número redondo, com espaço para negociar para $385K se precisar.

Perguntas para o vendedor antes de finalizar:
1. Eles estão firmes no preço ou precisam se mudar até uma data específica? Isso muda a estratégia.
2. Algum vizinho listou e tirou recentemente? Atividade off-market importa.
3. Vão pré-listar a documentação do HVAC (instalação 2022)? É um diferenciador real vs Comp 3.
4. Qual é o piso deles? Defina o walk-away antes da semana 1.
5. Estão abertos a uma pré-inspeção? Sugar Land slab-on-grade em construções do final dos 90 frequentemente levanta dúvidas de fundação na inspeção do comprador — chegar antes pode economizar 3-5% no fim.

Chegue ao encontro pronto para discutir: por que o ativo a $409K está parado (é uma lição de teto de preço) e se eles querem investir nos banheiros ou em staging antes de ir ao ar.

---
Coisas para verificar antes de publicar:
- Confirme estimativa de ajuste de piscina contra seu mercado
- Confirme que o preço de venda do Comp 4 não incluiu concessions do vendedor
```

---

## Cenário 2: comps fracos, preço defensável mesmo assim

Você tem um comp ok, dois esticados e precisa entrar num encontro de listagem amanhã. Esse é o caso difícil — e a IA é mais útil aqui porque te força a articular os ajustes em vez de chutar.

### Inputs

**Alvo:** 5 quartos / 4 banheiros / 3.800 sqft, contemporâneo customizado num pequeno enclave em Boulder, CO. Lote 0,5 acre. Construído 2019. Vistas das montanhas da suíte principal e da grande sala. Condição 10/10.

**Comp 1:** Mesmo enclave, 3.600 sqft, vendido há 11 meses por $2,45M. Customizado mas com acabamento mais velho (construção 2016). DOM 67.

**Comp 2:** 1,2 milha de distância, 4.100 sqft, vendido há 4 meses por $2,95M. Construção nova, sem vistas. DOM 41.

**Comp 3:** 0,8 milha de distância, 3.200 sqft, vendido há 6 meses por $2,20M. Construção 2012, vista parcial das montanhas. DOM 22.

**Ativo:** Mesmo enclave, 4.000 sqft, listado a $3,1M, 89 dias no mercado.

**Minha leitura:** Algum lugar entre $2,7M e $2,95M, mas genuinamente não sei.

### Output

```
CMA — Alvo: contemporâneo customizado 5/4/3800, Boulder

Avaliação honesta de cara: esse é um conjunto de comps fino. O sinal mais forte é o Comp 2 (construção nova, 4 meses, $2,95M). Mas o Comp 2 não tem vistas e o alvo tem, e o Comp 2 é 8% maior. Os outros dois comps exigem ajustes significativos.

Resumo dos comps:
- Comp 1 ($2,45M, 11 meses atrás, 3600 sqft): enclave certo mas transação de 3 anos num mercado que se moveu; ajuste para cima cerca de 8-12% por tempo
- Comp 2 ($2,95M, 4 meses atrás, 4100 sqft): transação recente mais limpa mas sem vistas e 8% maior
- Comp 3 ($2,20M, 6 meses atrás, 3200 sqft): menor, mais antigo, vista parcial — direcional apenas
- Ativo a $3,1M, 89 DOM: sinal de teto real — esse nível de preço nesse enclave não fechou em nove meses

Faixa de preço:
- Baixo: $2,75M
- Mais provável: $2,85M-$2,95M
- Alto: $3,0M (agressivo — exige dinâmica de múltiplas ofertas nos primeiros 10 dias)

Explicação: O prêmio da vista nesse enclave roda em ~5-8% baseado em ciclos anteriores, o que coloca o alvo em paridade com o Comp 2 ou levemente acima apesar de ser 8% menor. A transação envelhecida do Comp 1, ajustada por tempo, cai em torno de $2,7-2,8M para uma casa um pouco menor e menos atualizada, o que apoia a extremidade inferior. O ativo a $3,1M é o data point que argumenta contra preço acima de $3,0M: uma casa de tamanho similar no mesmo enclave não achou comprador em três meses nesse nível.

Recomendação: listagem $2.895.000, com piso defensável a $2,75M e teto esticado a $3,0M só se a semana 1 mostrar forte volume de visitas.

Perguntas para o vendedor:
1. Quanto pagaram, quando e o que colocaram? Isso ancora a expectativa deles.
2. Existem comps off-market no enclave que eu não tenho acesso? Donos de casa customizada às vezes sabem.
3. Por quanto tempo conseguem ficar se não vender em 60 dias? O ativo a $3,1M está há 89 — seu vendedor precisa entender o que isso sinaliza.
4. Estão dispostos a pré-listar com fotografia profissional de um fotógrafo arquitetônico específico de Boulder? Importa nessa faixa de preço.
5. Qual é o walk-away number? Defina antes de ir ao ar.

Chegue ao encontro pronto para discutir: o ativo de 89 dias e por que preço acima de $3M é difícil de defender; o prêmio da vista como diferenciador-chave vs Comp 2; o timeline do vendedor como driver de estratégia.

---
Coisas para verificar antes de publicar:
- Fator de ajuste de tempo — confirme contra o índice de preço de venda year-over-year de Boulder
- Histórico do comp ativo (reduções de preço? saiu do mercado e voltou?)
- Lista completa de materiais do alvo — contemporâneos customizados variam bastante; detalhes de spec afetam o prêmio
```

---

## Cenário 3: um trophy comp puxando o número

A casa de um vizinho acabou de vender por um número que desafia o resto do conjunto de comps. Seu vendedor ouviu falar e agora acha que a casa dele vale o mesmo. O trabalho da IA aqui é te ajudar a ter a conversa honesta.

### Inputs

**Alvo:** 3 quartos / 2 banheiros / 1.900 sqft, split-level dos anos 70 num bairro de Toronto. Cozinha original, banheiros originais, aquecimento a óleo. Lote 30 x 120.

**Comp 1:** Do outro lado da rua. 3 quartos / 3 banheiros / 2.200 sqft. Totalmente reformada 2024 (cozinha, dois banheiros, basement acabado, novo mecânico). Vendida semana passada por $1,85M. DOM 8.

**Comp 2:** Dois quarteirões de distância. 3 quartos / 2 banheiros / 1.950 sqft. Cozinha atualizada 2019, banheiro original. Vendida há 3 meses por $1,42M. DOM 28.

**Comp 3:** Mesma rua, quatro casas adiante. 3 quartos / 2 banheiros / 1.820 sqft. Original em tudo. Vendida há 5 meses por $1,31M. DOM 41.

**Ativo:** Três quarteirões. 4 quartos / 3 banheiros / 2.300 sqft, reformada, listada a $1,95M, 18 dias no mercado.

**Leitura do vendedor (nota do corretor):** "Vendedor viu o Comp 1 vender a $1,85M e quer listar a $1,79M."

### Output

```
CMA — Alvo: split-level dos anos 70 3/2/1900, Toronto

Avaliação direta: o Comp 1 não é um comp para esse imóvel. É o valor desse imóvel depois de $400K-500K de reforma.

Resumo dos comps:
- Comp 1 ($1,85M, semana passada, 2200 sqft, totalmente reformada 2024): o trophy comp. Ajusta para baixo cerca de $400-500K pela diferença de reforma, mais $50-80K pela diferença de sqft. Ajustado para condição do alvo: ~$1,30M-$1,40M.
- Comp 2 ($1,42M, 3 meses atrás, 1950 sqft, atualizações parciais): o data point mais relevante. Alvo está menos atualizado que Comp 2. Ajuste para baixo ~$50-75K.
- Comp 3 ($1,31M, 5 meses atrás, 1820 sqft, original): match de condição mais próximo. Ajuste de tempo levemente para cima; ajuste para baixo por sqft um pouco menor. Cai em torno de $1,32-1,35M.
- Ativo a $1,95M (4 quartos reformada): não diretamente relevante — número de quartos e tier de condição diferentes.

Faixa de preço:
- Baixo: $1,30M
- Mais provável: $1,32M-$1,37M
- Alto: $1,40M (só se o tráfego de visitas for forte nos primeiros 10 dias, com dinâmica multi-oferta)

Explicação: O vendedor ancorou no comp errado. O Comp 1 reflete o que uma casa reformada de ossos similares vende. O alvo, em condição original com mecânico original, está na faixa $1,30-1,40M — diretamente sustentado pelo Comp 2 e Comp 3. Listar a $1,79M vai produzir visitas de compradores que entram esperando condição Comp 1 e saem decepcionados. É assim que casas ficam paradas por 60+ dias e acabam vendendo pelo preço que deveriam ter começado, menos o estigma da redução de preço.

Recomendação: lista entre $1.349.000 e $1.389.000. O preço de venda mais provável está nos $1,3M baixos. Se o vendedor quiser empurrar para $1,4M, precisa gastar $20-40K em atualizações cosméticas (pintura, restauração de piso, hardware de cozinha, luminárias) antes de ir ao ar.

Perguntas para o vendedor:
1. Eles foram ver o Comp 1? Se não, sugira que vão. A diferença é visível e tangível.
2. Estão abertos a 2 semanas de refresh pré-lista? $20K de pintura + piso normalmente retorna $40-60K.
3. Qual o timeline deles? Se têm que se mudar em 90 dias, a estratégia é diferente de se têm 9 meses.
4. Estão dispostos a olhar o líquido do vendedor a $1,79M (provavelmente 90+ DOM e queda de preço) vs $1,37M com preço certo (provavelmente 14-21 DOM e possível multi-oferta)? O líquido normalmente é mais próximo do que pensam.
5. Estão emocionalmente atados ao número $1,79M, ou o vizinho mencionou uma vez e ficou? Problema diferente, conversa diferente.

Chegue ao encontro pronto para discutir: o delta de reforma no Comp 1, a matemática do líquido do vendedor (os $400K não são dinheiro real para eles) e a opção de refresh pré-lista.

---
Coisas para verificar antes de publicar:
- Escopo e custo da reforma do Comp 1 (confirme com o corretor da listagem se possível — às vezes "totalmente reformada" superestima o trabalho)
- Específicos do lote do alvo (o 30x120 é zoneado para severance/laneway? Esse é um lever de valor)
- Mercado de Toronto — shifts recentes em dias no mercado para estoque não reformado
```

---

## Quando escalar para além da IA

A IA é uma ferramenta de afiação. Tem hora de largar e pegar o telefone:

- Vendas de espólio em que os herdeiros discordam
- Vendas pré-maritais ou orientadas a divórcio (frequentemente precisam de uma carta escrita de opinião, não um chat de CMA)
- Cenários de demolição ou valor-de-terra — pegue uma carta do construtor por cima da CMA
- Qualquer coisa em que o alvo está num micro-mercado (uma rua, um prédio, três comps em três anos) — chame um avaliador local, não a IA

O prompt de CMA acima é para tornar o caso 80% mais rápido e mais defensável. Os 20% que são realmente difíceis ainda precisam de ouvido humano.
