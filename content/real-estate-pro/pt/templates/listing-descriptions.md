# Descrições de Anúncio por Tipo de Imóvel

Cinco tipos de imóvel, cinco templates de prompt, cinco exemplos trabalhados de output. Use o prompt como está ou como ponto de partida. Os exemplos trabalhados mostram o que é bom antes de você gerar o seu.

---

## Como usar este arquivo

1. Encontre o tipo de imóvel que bate com seu anúncio
2. Copie o bloco do prompt
3. Substitua os inputs entre colchetes pelos detalhes do seu imóvel
4. Cole na sua ferramenta de IA (depois de carregar `optimization-pack.md` como system prompt)
5. Compare com o exemplo trabalhado para checar o output

O system prompt faz o trabalho pesado de estrutura, tom e conformidade com fair-housing. Esses templates só dão à IA os inputs específicos que ela precisa para cada tipo de imóvel.

---

## 1. Casa unifamiliar (SFH)

### Prompt

```
Escreva public remarks de MLS para essa casa unifamiliar.

Imóvel:
- Endereço ou bairro: [nome]
- Quartos: [#] / Banheiros: [#] / Metragem: [#] / Lote: [tamanho]
- Ano de construção: [ano]
- Estilo: [Craftsman / Colonial / ranch / contemporâneo / etc.]
- Condição: [move-in / levemente atualizada / totalmente reformada / precisa de trabalho]

Features que importam (as coisas que um comprador realmente perceberia):
- [feature 1 — específica, não "incrível"]
- [feature 2]
- [feature 3]
- [feature 4]
- [feature 5]

Mecânico / atualizações (ano se você tem):
- [HVAC, telhado, janelas, elétrica, encanamento — liste o que é recente]

Externo:
- [quintal, deck, pátio, garagem, estacionamento, cerca]

Específicos de localização:
- [distância a pé de X, Y minutos do centro, nome do distrito escolar]

Comprador provável:
- [seja específico — "casal em upgrade com um filho e cachorro, WFH híbrido"]

Plataforma: [MLS EUA / Realtor.ca / Zillow / Redfin]
Limite de caracteres: [número]
```

### Exemplo trabalhado de output

**Inputs usados:** 4 quartos / 2,5 banheiros / 2.180 sqft, Craftsman em Bridgeland (Calgary), construída 2009, cozinha levemente atualizada 2023, lote 0,14 acre. Fogão Wolf, ilha em butcher block, basement acabado com entrada separada, deck virado ao sul, garagem dupla destacada. Caminhada de 7 minutos até o LRT. Família em upgrade vinda de um townhouse.

**Output (Realtor.ca, ~250 palavras):**

Uma Craftsman de 2009 que foi cuidada com atenção, num trecho calmo de Bridgeland a sete minutos de caminhada do LRT. A atualização de cozinha de 2023 fez o trabalho que importa de verdade — fogão a gás Wolf, ilha em butcher block, gabinetes soft-close — sem perder o calor do layout original. Hardwood corre pelo andar principal, com linhas de visão da cozinha até o deck virado para o sul.

O andar de cima tem quatro quartos, incluindo um principal com closet walk-in e suíte de três peças. O basement está totalmente acabado com entrada separada pela lateral da casa, o que abre opções de suíte para babá ou estadia estendida dependendo da sua necessidade.

O lote tem pouco mais de 6.000 pés quadrados, totalmente cercado, com garagem dupla destacada pelo beco dos fundos. Telhado novo (2021), forno de alta eficiência e ar central. Exposição sul nos fundos significa que o deck pega sol do fim da manhã até o início da noite — bom para o cachorro, bom para a horta, bom para um café num sábado.

Bridgeland dispensa apresentação: caminhada curta até OEB, Lukes e os caminhos do rio; transporte ao centro em menos de quinze minutos. Inglewood e East Village ficam a uma pedalada tranquila. Escolas zoneadas para Langevin e Crescent Heights — comprador deve confirmar fronteiras atuais com o CBE.

---

Coisas para verificar antes de publicar:
- Ano do telhado (2021)
- Idade do HVAC
- Fronteira escolar atual com o CBE

---

## 2. Condo / townhouse

### Prompt

```
Escreva public remarks de MLS para esse condo ou townhouse.

Imóvel:
- Nome do prédio / complexo: [nome]
- Tipo de unidade: [condo / townhouse / loft / penthouse]
- Quartos: [#] / Banheiros: [#] / Metragem: [#]
- Ano de construção: [ano]
- Andar: [# de #]
- Exposição: [N/S/L/O]

Features:
- [feature 1]
- [feature 2]
- [feature 3]
- [feature 4]

Amenidades do prédio (só liste as que o comprador liga):
- [academia / piscina / portaria / rooftop / estacionamento / depósito / pet-friendly com restrições]

Taxas:
- HOA / condo fee: $[valor] / mês — o que cobre
- Imposto sobre imóvel: $[valor] / ano (se tem; senão [CONFIRMAR])

Localização:
- [distância a pé de X, transporte, vibe do bairro]

Comprador provável:
- [primeiro comprador, downsizer, investidor, profissional urbano]

Plataforma: [MLS]
Limite de caracteres: [número]
```

### Exemplo trabalhado de output

**Inputs usados:** 2 quartos / 2 banheiros / 985 sqft, condo, 14º andar, exposição sudeste, num prédio 2017 no centro de Austin. Novos eletrodomésticos inox, bancada de quartzo, lavanderia in-unit. Prédio tem academia, piscina rooftop, portaria 24 horas. HOA $640/mês inclui água, gás, amenidades. Comprador provável: profissional urbano, primeiro condo no downtown, vai a pé ao escritório.

**Output (MLS EUA, ~150 palavras):**

Um dois-quartos virado para sudeste no décimo quarto andar de um high-rise 2017 — luz da aurora no quarto, vistas do downtown da sala, os dois ao mesmo tempo se você tiver sorte com a estação. Planta aberta com bancada de quartzo, eletrodomésticos inox e ilha que comporta três. Os dois quartos são quartos de verdade, não um-e-meio-flex; o segundo tem janela e closet adequado.

Lavanderia in-unit, uma vaga de garagem atribuída, depósito separado. Amenidades do prédio rodam a lista padrão — piscina rooftop, academia, portaria 24 horas — e a localização te coloca a seis minutos de caminhada da Congress, oito do Whole Foods, quinze do trail head no Lady Bird.

HOA $640/mês cobre água, gás e acesso às amenidades. Pet-friendly com restrição de peso.

---

Coisas para verificar antes de publicar:
- Imposto sobre imóvel (não fornecido)
- Limite exato de peso para pet
- Dimensões do depósito

---

## 3. Luxo

### Prompt

```
Escreva public remarks de MLS para esse imóvel de luxo.

Imóvel:
- Endereço ou bairro: [nome]
- Tipo: [estate / penthouse / waterfront / construção nova]
- Quartos: [#] / Banheiros: [#] / Metragem: [#] / Lote: [tamanho]
- Ano de construção: [ano] (ou "Custom build, concluído em [ano]")
- Arquiteto / construtor: [nome se notável]

A única feature que faz esse imóvel:
- [a coisa única — a vista, o arquiteto, a localização, a privacidade, a frente para o lago]

Três a cinco outros específicos notáveis:
- [feature, com marca ou detalhe]
- [feature]
- [feature]
- [feature]

Externo / terra:
- [acreage, frente para água, vistas, jardim, piscina, construções anexas]

Smart / mecânico:
- [home automation, geotérmica, solar, EV etc.]

Específicos de localização:
- [privacidade, proximidade do aeroporto, escolas, cidade]

Comprador provável:
- [comprador de segunda casa, relocação executiva, família fazendo upgrade de $X para $Y]

Plataforma: [MLS / portal de luxo / site da imobiliária]
Target de palavras: 250-400 palavras (luxo é mais longo)
```

### Exemplo trabalhado de output

**Inputs usados:** 5 quartos / 5,5 banheiros / 6.200 sqft, casa custom em Whistler Cadenza pelo arquiteto Patkau Associates, concluída 2021, em 0,42 acres com fundos para Whistler Creek. Aquecimento geotérmico, iluminação Lutron completa, piscina lap interna, garagem para quatro carros com EV, ski-in para Creekside. Comprador provável: comprador de segunda casa de Vancouver ou Costa Oeste dos EUA.

**Output (portal de luxo, ~350 palavras):**

Um design do Patkau Associates concluído em 2021, num lote Cadenza de 0,42 acre que faz fundos diretamente com o Whistler Creek com acesso ski-in ao Creekside. A casa é um estudo do que uma casa contemporânea de montanha pode ser quando os arquitetos têm espaço para trabalhar — longas corridas de cedro, envidraçamento de altura total orientado ao creek e ao ridge, uma suíte principal que abre para um deck privado acima da água.

Seis mil e duzentos pés quadrados em três níveis. Cinco quartos, cada um com suíte. A cozinha é ancorada por uma geladeira e freezer em coluna Sub-Zero, fogão Wolf com dois fornos e despensa de butler com segunda máquina de lavar louça e pia de prep. Sala grande com lareira a lenha Stuv e pé-direito de vinte pés.

O nível inferior tem piscina lap interna com parede de vidro para o creek, banheiro de quatro peças, sala de mídia cabeada para Atmos e bunk room que dorme seis. Adega ao lado do hall de entrada. Iluminação Lutron completa, AV Crestron, aquecimento geotérmico com piso radiante em todo lugar e sistema HRV balanceado para a altitude.

Garagem aquecida para quatro carros, dois carregadores EV e um drop-off coberto na chegada. Sala de ski com secadores de botas e entrada dedicada para o nível dos lockers. Paisagismo maduro com árvores estabelecidas em três lados — a privacidade aqui é rara mesmo para os padrões Cadenza.

Creekside Gondola fica a quatro minutos de caminhada via a trilha no fundo do imóvel. Whistler Village fica a seis minutos de carro, o aeroporto a duas horas, Vancouver a uma hora e quarenta e cinco.

Uma casa desenhada para um comprador que quer a arquitetura como parte do ativo.

---

Coisas para verificar antes de publicar:
- Confirme se a linguagem de atribuição do arquiteto é OK para publicar (alguns escritórios têm guidelines de crédito)
- HOA / strata fee se aplicável
- Imposto sobre imóvel (não fornecido)
- Status exato do caminho de ski-in (a passagem do creek é sazonal?)

---

## 4. Fixer-upper

### Prompt

```
Escreva public remarks de MLS para esse fixer-upper.

Imóvel:
- Endereço ou bairro: [nome]
- Quartos: [#] / Banheiros: [#] / Metragem: [#] / Lote: [tamanho]
- Ano de construção: [ano]
- Condição: [precisa de cosméticos / precisa de sistemas / preocupações estruturais]

O que está sólido (não esconda o que funciona):
- [fundação, telhado, bones, lote, localização, mecânico recente]

O que precisa de trabalho (seja direto — compradores vão ver de qualquer jeito):
- [liste honestamente]

Sinal de ARV dos comps:
- [reformas recentes na área venderam a $X / sqft — isso informa a matemática do comprador]

Comprador provável:
- [flipper, sweat-equity owner-occupant, construtor, família de contratante]

Plataforma: [MLS]
Limite de caracteres: [número]
Tom: matter-of-fact, sem eufemismos. "Precisa de pintura e piso" tudo bem. "Traga sua imaginação" não.
```

### Exemplo trabalhado de output

**Inputs usados:** 3 quartos / 1 banheiro / 1.150 sqft, bangalô 1958 em East Vancouver, lote 33 x 122. Cozinha original, banheiro original, aquecimento a óleo (tanque acima do solo, recente), telhado feito em 2019, fundação seca. Reformas recentes na rua vendendo a $1,8M+. Comprador provável: construtor ou sweat-equity owner-occupant.

**Output (MLS EUA, ~180 palavras):**

Um bangalô de 1958 num lote plano 33 x 122, pronto para o próximo dono colocar trabalho. O telhado foi trocado em 2019. A fundação está seca. Aquecimento a óleo, com o tanque acima do solo e inspecionado ano passado. A cozinha e o banheiro são originais. Pisos são hardwood original sob o carpete nos cômodos principais.

Três quartos em cima, basement não acabado com potencial de entrada separada, carport simples. Lote é RT-7 zoneado com acesso lateral para profissionais.

Os bones são o valor aqui. Reformas recentes no mesmo quarteirão venderam acima de $1,8M. O próximo dono é um construtor levando a obra para o esqueleto, uma família de contratante fazendo dela o primeiro projeto em East Van, ou um flipper com escopo claro. Os números fecham de qualquer lado se entrar de olhos abertos.

Traga um empreiteiro à visita. Inspeção bem-vinda.

---

Coisas para verificar antes de publicar:
- Timeline de descomissionamento do tanque de óleo (BC tem regras)
- Específicos do zoneamento RT-7 com a cidade
- Carport vs garagem na escritura

---

## 5. Multifamiliar

### Prompt

```
Escreva public remarks de MLS para esse imóvel multifamiliar / de investimento.

Imóvel:
- Endereço ou bairro: [nome]
- Tipo: [duplex / triplex / fourplex / 5+]
- Total de unidades: [#]
- Metragem total (prédio): [#]
- Lote: [tamanho]
- Ano de construção: [ano]

Mix de unidades:
- Unidade 1: [quartos/banheiros/sqft/aluguel atual ou "vago"]
- Unidade 2: [quartos/banheiros/sqft/aluguel atual ou "vago"]
- (repita para todas as unidades)

Financeiros (só se o vendedor aprovou compartilhar):
- Aluguel bruto mensal: $[valor]
- Despesas anuais: $[valor]
- NOI: $[valor]
- Cap rate no preço de listagem: [%]

Capex / condição:
- [atualizações recentes, manutenção deferida, idade dos sistemas]

Tenência:
- [mês-a-mês / contratos fixos / vago / mix]

Comprador provável:
- [owner-occupant fazendo house-hacking / investidor / comprador 1031 / portfolio builder]

Plataforma: [MLS / portal comercial multifamiliar]
Limite de caracteres: [número]
Tom: focado em investidor. Números de cara. Pule copy de lifestyle.
```

### Exemplo trabalhado de output

**Inputs usados:** Triplex em Hamilton, ON. Construído 1962. Três unidades de 2 quartos, ~750 sqft cada. Aluguéis atuais: $1.400 / $1.650 / vago. Telhado 2020, fornos 2018 (cada unidade com medidor separado), quatro vagas. Comprador provável: investidor com portfólio local existente.

**Output (MLS comercial, ~180 palavras):**

Um triplex de tijolo 1962 no centro de Hamilton, três unidades de dois quartos de aproximadamente 750 pés quadrados cada, com medidor separado para gás e hidro. Telhado substituído 2020. Fornos substituídos 2018 nas três unidades. Quatro vagas off-street acessadas pelo beco dos fundos.

Mix atual de unidades e aluguel: Unidade 1 ocupada a $1.400 (locatário de longo prazo). Unidade 2 ocupada a $1.650 (contrato renovado 2025). Unidade 3 vaga, aluguel de mercado estimado em $1.750-1.850 baseado em unidades de dois quartos comparáveis na área.

Bruto estabilizado a mercado: aproximadamente $4.900 mensais. Vendedor pode fornecer T12 completo e rent roll sob solicitação pelo corretor.

O prédio foi administrado pelo dono nos últimos onze anos. Registros de manutenção disponíveis. Duas das três unidades tiveram atualizações cosméticas nos últimos cinco anos; Unidade 1 está em condição original.

Direcionado a investidores construindo portfólios locais ou owner-occupants confortáveis com deveres leves de proprietário. Dinâmica AGI / N12: pergunte ao corretor da listagem.

---

Coisas para verificar antes de publicar:
- Confirme que o vendedor aprovou compartilhar financeiros nas remarks
- Números T12 (não liste NOI não verificado)
- Status atual do Ontario LTB em qualquer unidade
- Legalidade da pad de estacionamento (alguns becos de Hamilton são restritos)

---

## Edições comuns que a IA vai aceitar

Quando o rascunho vem de volta e você quer ajustar:

- "Corte os adjetivos. Substitua cada um por um específico."
- "Apare para [X] caracteres. Mantenha o lead e o fechamento."
- "Mais direto. Menos lifestyle."
- "Adicione uma linha sobre [feature que você esqueceu de mencionar]."
- "Faça o fechamento mais suave — sem pontos de exclamação."
- "Voz isso como se eu tivesse andado pelo imóvel com o comprador ontem."

Cada uma dessas vai produzir um segundo rascunho perceptivelmente melhor. A IA é muito melhor em editar em direção a específicos do que em gerá-los de um primeiro prompt magro.
