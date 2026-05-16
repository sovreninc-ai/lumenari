# Memória — Pacote E-commerce / Shopify Owner

## Contexto do domínio

Um dono de loja Shopify toca um negócio inteiro a partir de uma aba: produto, fotografia, copy, ads, e-mail, atendimento ao cliente, fulfillment e relatórios. A maioria deles é solo ou 2-3 pessoas, com receita entre USD $10k e USD $500k por mês. O trabalho é altamente repetitivo — cada SKU precisa de uma descrição de produto, um conjunto de ads no Meta/Google/TikTok, uma tag de série de boas-vindas no Klaviyo e uma política de resposta a review. A dor não é estratégia. É volume.

O dono geralmente tem bons instintos de produto e instintos fracos de copy. Sabe o que o melhor cliente dele diz sobre a marca e quais são as margens, mas headlines de ad, subject lines e descrições de produto consistentemente performam abaixo do que ele acha que é possível. Ele tentou uma agência uma vez e ela produziu voz genérica de DTC que não combinava com o que ele tinha construído. Tentou uma assinatura de copy (USD $300/mês) e ganhou o mesmo problema em escala menor. Ele quer uma ferramenta que respeite a voz dele, encaixe nos limites de caractere da plataforma e entregue em minutos — não um brief criativo de 3 semanas.

O dia a dia é fragmentado: um push às 16h para publicar três novos produtos antes do lançamento de sexta, uma hora às 21h para escrever a sequência de abandono de carrinho, uma janela de 30 minutos no domingo para responder aos reviews da semana. Velocidade importa. Honestidade também — leitores cheiram linguagem genérica de luxo num produto de USD $24, e isso custa conversão.

## Vocabulário que a IA deve conhecer

- **SKU:** stock-keeping unit — uma variante única de um produto (tamanho, cor, aroma). Um produto = muitos SKUs.
- **AOV:** average order value (valor médio do pedido) — receita total / pedidos totais. O número contra o qual o dono roda tudo.
- **CAC:** customer acquisition cost — gasto total em ads / novos clientes. Diz ao dono se os ads pagam de volta.
- **LTV:** customer lifetime value — receita total por cliente ao longo do relacionamento. Define o teto do CAC.
- **ROAS:** return on ad spend — receita / gasto em ads. A plataforma reporta isso; difere da lucratividade real.
- **MER:** marketing efficiency ratio — receita total / gasto total em marketing. A versão honesta do ROAS.
- **PDP:** product detail page — onde a descrição do produto mora. Above-the-fold importa mais.
- **PLP:** product listing / collection page — onde os SKUs são listados para navegação.
- **CRO:** conversion rate optimization — a prática de tweakar o funil para elevar a conversão.
- **Klaviyo:** a plataforma dominante de e-mail DTC. Flows = sequências automatizadas; campaigns = envios pontuais.
- **Mailchimp:** plataforma de e-mail legada; ainda usada por lojas menores.
- **Meta Ads Manager:** UI de ads do Facebook + Instagram.
- **Google Shopping:** ads orientados a feed de produto na busca do Google e superfícies.
- **TikTok Spark Ads:** posts orgânicos impulsionados como ads a partir do handle de um creator.
- **GMC:** Google Merchant Center — o feed que alimenta os Shopping ads.
- **MOQ:** minimum order quantity — o menor pedido que um fornecedor vai aceitar.
- **DTC:** direct-to-consumer. O modelo de negócio dominante para a audiência do kit.
- **B2B:** wholesale / contas de varejo — vendendo para outras lojas em vez de consumidores finais.
- **Above-the-fold:** o conteúdo visível antes do usuário scrollar. Imóvel de maior conversão numa PDP e os caracteres mais importantes de um ad.

## Workflows comuns

- **Lançamento de novo produto:** dono cola nome do produto, categoria, materiais, contexto de marca, preço-alvo → IA produz a descrição da PDP em 1-3 variantes de ângulo → conjunto de ads no Meta + Google + TikTok → campanha de lançamento de 2 e-mails.

- **Lote semanal de resposta a reviews:** dono exporta os reviews da semana do Judge.me / Yotpo / Loox → cola 5-15 reviews com ratings de estrela → IA produz variantes de resposta por rating + tom → dono edita e submete.

- **Conserto de abandono de carrinho:** dono cola a copy atual de abandono de carrinho + analytics do flow do Klaviyo → IA reescreve a sequência para consertar o envio que performa abaixo (geralmente o e-mail 2 — aquele que não é nem imediato nem um desconto).

- **Prospecção de fornecedor:** dono identifica um fornecedor potencial (Alibaba, Faire, contato de feira) → cola o contexto do produto + volume projetado → IA produz um e-mail de primeiro contato com enquadramento apropriado de negociação de MOQ.

- **Campanha sazonal em 24 horas:** Black Friday / Dia das Mães / uma promo relâmpago → dono dá oferta + faixa de produto → IA produz o conjunto completo (atualizações de hero da PDP, copy de ad entre plataformas, campanha de 3 e-mails, copy curta de SMS).

## O que evitar / erros comuns

- **Voz genérica de DTC.** "Transforme sua rotina", "Eleve seu guarda-roupa", "Curado para [audiência] moderna". Esse é o modo de falha padrão. Aplicação da lista de palavras banidas é a regra de maior alavanca neste kit.
- **Linguagem de luxo em produtos mid-range.** Uma vela de USD $24 não é "artesania artesanal feita à mão". Combine registro com faixa de preço. Fingir quebra confiança.
- **Ignorar limites de caractere.** Texto principal do Meta acima de 125 caracteres é cortado above the fold. Headlines do Google acima de 30 caracteres são rejeitadas. Legendas do TikTok acima de 100 caracteres perdem engajamento. A IA tem que contar.
- **Alegações que não pode fazer.** "Reduz rugas em 47%" sem estudo clínico, "fortalece a imunidade" num produto alimentício, "clinicamente provado" sem citação — esses são exposição FTC / Health Canada / ASA / ANVISA.
- **Urgência falsa.** "Só 3 restantes!" quando tem 400 em estoque. "Promoção termina em 24 horas!" num desconto evergreen. Clientes rastreiam isso e a confiança erode mais rápido que o lift que produz.
- **Encher todo produto com stacks de cinco adjetivos.** "Premium, luxuoso, curado, elevado, indulgente." Escolha um descritor e ganhe.
- **Escrever como se a plataforma fosse o usuário.** Descrições de produto são lidas no celular, meio segundo após o toque do polegar. Escreva para o scroll.

## Tom / registro

Um operador real de Shopify escreve numa voz que é específica à marca e à audiência dele. Uma marca premium de home goods soa mais lenta, mais confiante, com menos palavras. Uma marca de suplementos soa direta e liderada por benefício. Uma marca de streetwear soa mais apertada, edgy, quase terse. O que compartilham: linguagem concreta ("merino, 18,5 micron, 230 gsm"), enquadramento consciente do comprador (sabem que o comprador está comparando com duas outras abas) e nenhuma desculpa pelo que não incluem. A melhor copy de DTC é confiante sobre seu escopo — "isso é o que é, isso é o que não é, aqui está o preço, aqui está como comprar". A IA deveria combinar com essa confiança e evitar o registro genérico de "paixão / curadoria / transformação" que achata toda marca na mesma marca.
