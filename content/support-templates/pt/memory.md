# Memória — Customer Support Templates

## Contexto do domínio

Uma pessoa de suporte passa o dia dentro de uma fila. Tickets chegam por e-mail, chat, social, ou às vezes telefone. A plataforma é Zendesk, Intercom, Help Scout, Front, ou para founders solo, Gmail puro. O trabalho é: ler o ticket, descobrir o que o cliente precisa, decidir o que você pode fazer, escrever a resposta. Repetir 30-100 vezes por dia.

As respostas difíceis são aquelas em que você está dizendo não — reembolsos negados, "não podemos adicionar essa feature", "sua conta foi suspensa". As fáceis são "enviado hoje, aqui está o link de rastreamento". A maioria cai entre os dois. Tom importa mais do que as pessoas acham — o mesmo conteúdo entregue frio vs. caloroso produz uma reação totalmente diferente do cliente.

Founders solo fazendo o próprio suporte geralmente são mais calorosos do que precisam ser, e mais lentos do que deveriam. Times de suporte em escala geralmente caem no formal por padrão e acabam soando como robô. Os dois estão deixando valor de relacionamento na mesa.

Há também uma regra silenciosa que as melhores pessoas de suporte entendem: você não está só resolvendo um ticket, está construindo (ou erodindo) a percepção do cliente sobre a empresa. Um reembolso recusado perfeitamente bem tratado pode salvar um relacionamento. Um reembolso concedido mal tratado ainda pode perder um.

## Vocabulário que a IA deve conhecer

- **Ticket**: uma conversa de suporte iniciada pelo cliente. Tem um status (aberto, pendente, resolvido, fechado).
- **Macro**: um template de resposta salvo no Zendesk. Intercom chama de "saved replies". Help Scout também chama de "saved replies".
- **First response time (FRT)**: quanto tempo até o cliente receber *qualquer* resposta. A métrica mais observada no suporte.
- **Resolution time**: criação do ticket até status "resolvido". Menos honesto que FRT — agentes fecham prematuramente para manipular.
- **CSAT**: Customer Satisfaction. Geralmente uma pesquisa 1-5 ou 1-7 enviada depois que um ticket fecha. Mire em 90%+ "muito satisfeito".
- **NPS**: Net Promoter Score. Escala 0-10. Promotores (9-10), passivos (7-8), detratores (0-6). Score = %promotores - %detratores.
- **Detractor recovery**: contato com clientes que deram 0-6 de NPS para descobrir o que está errado e tentar consertar.
- **Escalação**: passar um ticket para um rep sênior, gerente ou time especializado. Geralmente tem um SLA interno de 24-48 horas.
- **SLA**: Service Level Agreement. O tempo prometido de resposta/resolução, geralmente contratado enterprise.
- **Janela de reembolso**: quantos dias depois da compra um reembolso é automaticamente elegível. Normas da indústria: 14 dias (SaaS), 30 dias (DTC), 365 dias para Costco.
- **Chargeback**: quando um cliente contesta uma cobrança pelo banco em vez de pedir ao comerciante. Custa ao comerciante uma taxa (~USD $15-25) além do reembolso.
- **Stripe Dashboard**: onde a maioria dos SaaS modernos processa reembolsos. Um clique, dinheiro de volta em 5-10 dias.
- **Upsell vindo do suporte**: oferecer um plano upgrade durante uma interação de suporte. Só apropriado quando o cliente está feliz E o upgrade resolve o problema real dele.

## Workflows comuns

- **Processar uma solicitação de reembolso**: ler o ticket → verificar a data do pedido e a política de reembolso → verificar o histórico do cliente (primeira vez? cliente antigo? problemas passados?) → decidir: integral, parcial, negado → se concedido, processar no Stripe/Shopify → responder com a resolução e razão → se negado, oferecer 2-3 alternativas.
- **Lidar com um pedido perdido**: confirmar que o pedido foi enviado → verificar rastreamento → se "entregue" mas o cliente diz o contrário, peça foto da frente da casa → se genuinamente perdido, substituir ou reembolsar → entre em contato com a transportadora no canal interno se acontece com frequência.
- **Reconhecer uma escalação**: responda em 1 hora com "Escalei isto para [nome/time]" e o cronograma realista → nunca prometa um conserto que não pode confirmar → defina a expectativa para o próximo horário de atualização.
- **Recuperação de detrator de NPS**: ver um score 0-6 → responder em 24 horas vindo de uma pessoa real (não "obrigado pelo feedback!") → fazer uma pergunta específica → escutar → propor um conserto ou compensação se apropriado.
- **Upsell vindo do suporte (raro-mas-certo)**: cliente está feliz com a resolução → a necessidade real dele está num tier mais alto → mencione uma vez, brevemente, com a matemática → não empurre.

## O que evitar / erros comuns

- "Pedimos sinceras desculpas pelo inconveniente que isso possa ter causado." Clichê de tier inferior de suporte. Reconhecimento específico sempre vence pedido de desculpas genérico.
- Liderar com o pedido de desculpas, enterrar a resolução. Clientes querem saber o que você está fazendo, depois por quê.
- "Conforme nossa política..." sem explicar a razão. Se a razão faz sentido, dê a razão. Se não faz, mude a política.
- Cronogramas vagos: "em breve", "logo", "oportunamente". Seja específico ou fique calado.
- "Sinta-se à vontade para entrar em contato se tiver alguma pergunta" como fechamento. Substitua pelo próximo passo real ou uma assinatura real.
- Pedidos de desculpa de múltiplos parágrafos antes da substância. Duas frases no máximo no lado do pedido de desculpas.
- Assinaturas de formulário: "a equipe da [Empresa]", "Customer Happiness Team". Use um nome real.
- Tom misto — começar formal, escorregar para caloroso na metade. Escolha um.
- Fazer upsell quando o cliente está infeliz. Lê como cínico, mata o relacionamento.
- "Espero que este e-mail te encontre bem." Ele escreveu com um problema. Reconheça o problema.

## Tom / registro

Um ótimo escritor de suporte combina com a voz da marca sem perder a própria. Ele escreve no nível de leitura do cliente — frases mais curtas, menos vírgulas, palavras simples. Ele nunca usa jargão que o cliente não usou primeiro. É caloroso sem ser melado, profissional sem ser frio, honesto sem ser brusco. Diz "eu" quando quer dizer eu, e "nós" quando quer dizer a empresa.

O vocabulário interno: tickets, macros, FRT, CSAT, escalações, chargebacks, janela de reembolso. O vocabulário externo: "seu pedido", "sua conta", "o problema", "o que aconteceu". Nunca use jargão interno em copy voltada ao cliente.

Boas pessoas de suporte são levemente mais diretas do que a voz da marca sugere que deveriam ser. Aprenderam que clientes preferem um "não" curto e claro com um caminho à frente do que um longo e educado "lamentamos informar".
