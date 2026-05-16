# Memory — Product Manager Toolkit

## Contexto de domínio

Product management é a camada intermediária pouco glamourosa entre o que usuários querem, o que engenharia consegue construir e o que o negócio precisa para crescer. O trabalho do PM é tomada de decisão sob informação incompleta: decidir o que construir, em que ordem, com que tradeoffs e como saber se funcionou. Os artefatos que um PM entrega — PRDs, roadmaps, planos de sprint, updates de stakeholder, readouts de métricas — existem para tornar essas decisões visíveis e revisáveis.

Uma semana típica: cerca de 40% em reuniões (planning, reviews, calls de cliente, 1:1s, readouts de liderança), 30% escrevendo (specs, updates, docs de decisão, threads de follow-up no Slack), 20% em research de cliente ou dados, e 10% em qualquer surpresa da semana. PMs em startups inclinam mais para escrita e tempo com cliente; PMs em empresas maiores inclinam mais para reuniões e gerência de stakeholders. O output que viaja mais longe é escrito — execs leem seu update no celular, sales reps citam seu roadmap em deals, engenheiros referenciam seu PRD semanas após o kickoff. Escrever com clareza é o trabalho real.

Sucesso parece assim: o time entrega trabalho que mexe uma métrica que a empresa se importa, num cronograma próximo o bastante do que você disse que entregaria para que ninguém se surpreenda. Falha parece assim: você entrega a feature no prazo, mas a métrica não se move, e ninguém consegue te dizer por quê. O bom PM gasta tanta energia em "como vamos saber que funcionou" e "qual é o próximo experimento se não funcionar" quanto na construção em si.

## Vocabulário que a IA deve conhecer

- PRD: Product Requirements Document. A spec para uma feature ou iniciativa.
- BRD: Business Requirements Document. Mais antigo, mais amplo, menos comum em empresas modernas.
- Spec: forma curta para PRD ou qualquer doc de design.
- Now/Next/Later: formato de roadmap. Três buckets, sem datas além de granularidade de trimestre.
- OKR: Objectives and Key Results. Um framework de definição de meta. Útil como ferramenta, não como religião.
- KR: Key Result. A parte mensurável de um OKR.
- North Star metric: a única métrica de output em torno da qual um time ou empresa se orienta.
- AARRR / Pirate Metrics: Acquisition, Activation, Retention, Referral, Revenue. O funil clássico.
- JTBD: Jobs-to-be-done. Framework para entender para que usuários contratam seu produto.
- ICE: Impact, Confidence, Ease — um rubric de priorização.
- RICE: Reach, Impact, Confidence, Effort — um rubric de priorização mais detalhado.
- Acceptance criteria: o checklist para "esta feature está pronta".
- DoD: Definition of Done. Critérios em nível de time que se aplicam a toda story.
- DAU / WAU / MAU: Daily / Weekly / Monthly Active Users.
- Activation: um usuário alcançando o primeiro momento significativo de valor. Definição é específica do produto.
- Retention curve: retenção de cohort ao longo do tempo. Plano é o alvo; curvas em declínio significam churn.
- LTV / CAC: Lifetime Value / Customer Acquisition Cost. A matemática que determina se o crescimento é saudável.
- NPS: Net Promoter Score. Métrica de lealdade baseada em survey. Direcionalmente útil, não load-bearing.
- ICP: Ideal Customer Profile. O cliente para o qual o produto é construído.
- Sprint, standup, retro, refinement: vocabulário de scrum. Use mesmo se seu time não é rígido com scrum.
- Velocity, capacity, burndown: a matemática do planejamento. Capacidade é horas; velocity é story points ou itens entregues.
- Carryover: trabalho que não terminou no sprint anterior. Gerencie explicitamente; não deixe acumular.

## Workflows comuns

- **Escrever um PRD:** problem → goal → non-goals → success metrics → acceptance criteria → scope → open questions. A seção Non-goals faz o maior trabalho; é onde você antecipa "mas e quanto a X" antes que derrube o kickoff.
- **Atualizar um roadmap:** comece do Now/Next/Later atual, olhe para a entrega real do trimestre passado, ajuste a Confiança (Alta/Média/Baixa) em cada item, mova itens entre buckets, depois re-compartilhe com um parágrafo de contexto sobre o que mudou.
- **Planejar um sprint:** matemática de capacidade primeiro (PTO, on-call, reuniões subtraídos das horas nominais), depois triagem de carryover, depois P0 / Stretch / Won't-do. Escreva a meta do sprint em uma frase no topo.
- **Rodar uma metrics review:** escolha 3-5 métricas que mais importam, escreva trend / comparado-a / hipótese / follow-up para cada uma. Enterre o ruído.
- **Mandar um update de stakeholder:** comece da versão de detalhe de engenharia (~400 palavras), depois comprima para o brief executivo (~200) e o customer-facing (~150). Mesmo conteúdo, três audiências.
- **Triagem de feedback de cliente:** agrupe por tema, conte frequência, pondere por encaixe com ICP, jogue no backlog com um outcome de uma linha atrelado.

## O que evitar / erros comuns

- **PRD inflado.** Um PRD de 12 páginas para uma feature de 2 dias sinaliza à engenharia que você não sabe o que realmente quer. Combine comprimento do doc com tamanho da feature.
- **Roadmap com precisão "Q3" tratada como compromisso.** "Later" significa "Later". Não prometa um trimestre que você de fato não planejou.
- **OKR cargo-culting.** Setar OKRs porque a empresa roda OKRs, não porque você tem uma meta para setar. Pior: escrever KRs que não são de fato mensuráveis.
- **Fingir que uma métrica é suficiente.** Um North Star é útil, mas a maioria dos times precisa de 2-4 métricas — uso, ativação, retenção, receita — para saber o que está realmente acontecendo.
- **A frase "alavancar".** "Precisamos alavancar nossa base de usuários existente para destravar novos verticais de crescimento." Corte cada palavra disso.
- **Escrever o PRD antes da conversa com o cliente.** Se você não consegue citar um usuário, você ainda não conhece o problema.
- **Pedidos vagos em updates de stakeholder.** "Me avise se tiver perguntas." Isso não é um pedido. Diga qual decisão você precisa ou qual apresentação você quer.
- **Confundir itens de roadmap com nomes de feature.** "Construir saved searches v1" é uma feature. "Cortar tickets 'perdi minha view' 50%" é um outcome. Roadmaps vivem em outcomes.

## Tom / registro

Um PM real soa direto, levemente cansado e infalivelmente específico. Sabe a diferença entre "usuários querem isto" (que geralmente é ruído) e "12 clientes pediram isto nas últimas 8 semanas" (que é sinal). Não vende demais o trabalho; deixa os números e as citações dos usuários fazerem o levantamento. Na escrita, padroniza para frases curtas, usuários nomeados quando possível e datas e contagens explícitas. Tem alergia a verbos vagos: "alavancar", "destravar", "impulsionar", "double down", "transformar". Quando diz "sim" para uma feature, é sério; quando diz "agora não", também é sério, e consegue explicar por que sem hesitar. A voz deve soar como alguém que entregou produto, não como alguém lendo um deck da McKinsey.
