# Outliner de Artigo com Clusters de Keyword

O outline é onde o ranking se ganha ou se perde. Se a estrutura está errada, nenhuma escrita esperta resolve. Este template é o prompt que transforma "quero rankear para X" em um outline pronto para a briga.

---

## O que este template faz

Você dá a ele: uma keyword primária, o contexto do seu site e os top 3-5 resultados atuais da SERP ao vivo. Ele retorna:

1. Classificação de intenção (informacional / comercial / navegacional / transacional)
2. Uma leitura da SERP — o que está vencendo e por quê
3. Um outline completo com H1, H2s, H3s sugeridos e pontos-chave por seção
4. Clusters de keywords secundárias agrupados por H2
5. Sugestões de âncora para internal link (nomeadas, não genéricas)
6. Oportunidades de PAA (People Also Ask) emergidas como H3s de FAQ
7. Meta title (50-60 caracteres) e meta description (140-160 caracteres)
8. Recomendação de schema
9. Ponto de injeção de E-E-A-T — onde sua experiência real precisa aparecer

---

## O prompt

Cole isto na IA da sua escolha. Preencha os campos entre colchetes.

```
Você é o SEO Content Strategist.

Quero um outline para um artigo mirando:

**Keyword primária:** [keyword]
**Volume mensal estimado:** [N — ou "desconhecido"]
**Intenção de busca (meu palpite):** [informacional / comercial / transacional / "você que me diz"]

**Contexto do meu site:**
- URL: [dominio.com]
- O que publicamos: [nicho + formato]
- Perfil do leitor: [quem são, o que querem]
- Faixa aproximada de Domain Authority: [N — ou "site pequeno / médio / grande"]
- Páginas relevantes existentes no meu site (opcional): [liste URLs e títulos]

**Top resultados da SERP (cole o top 5 atual se possível):**
1. [URL] — [título] — [sua leitura: contagem de palavras? formato? ângulo?]
2. [URL] — [título] — [leitura]
3. [URL] — [título] — [leitura]
4. [URL] — [título] — [leitura]
5. [URL] — [título] — [leitura]

**Recursos de SERP que consigo ver:**
- Featured snippet: [sim/não — se sim, quem é o dono]
- People Also Ask: [sim/não — se sim, cole as 4 perguntas]
- Video carousel: [sim/não]
- Image pack: [sim/não]
- AI Overview: [sim/não]

**Meu ângulo de diferenciação (se eu tenho um):**
[1-2 frases sobre por que eu posso escrever uma versão melhor — experiência em primeira mão, dados únicos, POV contrário, etc.]

Me dê:
1. Classificação de intenção (com justificativa de uma frase)
2. Leitura da SERP (o que está funcionando, qual é a brecha)
3. Outline completo (H1 + H2s com intenção por seção, pontos-chave, keywords secundárias)
4. Sugestões de internal link (3-5 âncoras nomeadas)
5. H3s de PAA se aplicável
6. Meta title + meta description
7. Recomendação de schema
8. Plano de injeção de E-E-A-T
```

---

## Exemplo trabalhado — "best CRM for solopreneurs"

Veja como uma rodada real deste template fica de ponta a ponta.

### Entrada

```
Keyword primária: best CRM for solopreneurs
Volume mensal estimado: ~1.900
Intenção de busca (meu palpite): comercial

Contexto do meu site:
- URL: solo-saas-reviews.com
- O que publicamos: reviews e comparativos longform de SaaS para negócios de uma pessoa
- Perfil do leitor: freelancers, consultores, operadores independentes avaliando ferramentas
- Faixa de DA: 52
- Páginas relevantes existentes:
  - /best-invoicing-software-for-freelancers (driver de DA, rankeia #4)
  - /honeybook-vs-dubsado (tráfego decente)
  - /crm-pricing-teardown (mais antigo, rankeia #11)

Top resultados da SERP:
1. Blog do Zapier — "The 18 best CRMs for solopreneurs in 2025" — 4.200 palavras, listicle, POV fraco
2. Blog do HubSpot — "Best CRM for solopreneurs (and why)" — 2.800 palavras, levemente promocional
3. Review de escritor da Substack — "I tested 5 CRMs for 90 days as a freelancer" — 1.400 palavras, POV pessoal forte
4. Página de categoria do Capterra — genérica
5. Página de categoria do G2 — genérica

Recursos de SERP:
- Featured snippet: sim, atualmente do HubSpot, definição curta em parágrafo
- People Also Ask: sim — (1) What is the best free CRM for solopreneurs? (2) Do solopreneurs need a CRM? (3) Is HubSpot good for solopreneurs? (4) What is the easiest CRM to use?
- Video carousel: não
- Image pack: não
- AI Overview: sim, citando a Substack e o HubSpot

Ângulo de diferenciação: Eu de fato paguei e usei 7 CRMs por 90 dias cada. Tenho screenshots reais, dados reais sobre tempo-até-primeiro-deal-logado, recibos reais de cancelamento.
```

### Output esperado da IA

> **Keyword primária:** best CRM for solopreneurs (vol ~1.900/mo)
> **Intenção:** Comercial. A query implica que o usuário está em modo de avaliação — ele quer uma recomendação, não uma definição. "Best" + "for [audiência]" é intenção comercial clássica.
>
> **Leitura da SERP:**
> - Formatos do top 3: dois listicles + um review pessoal
> - Faixa de contagem: 1.400 (Substack) a 4.200 (Zapier). HubSpot no meio com 2.800.
> - A peça da Substack em #3 está subindo apesar de ser a mais curta porque tem o único POV autêntico. Zapier e HubSpot parecem escritos a partir de um brief, não a partir de uso.
> - O featured snippet é curto e definicional — ganhável com uma resposta de 40-50 palavras para "o que é um CRM para solopreneurs" ou "solopreneurs precisam de um CRM" perto do topo da página.
> - O AI Overview já cita a peça da Substack. Isso nos diz que o Google está recompensando conteúdo de teste real para esta query.
> - **A brecha:** nenhum dos top 3 tem dados sérios — tempo-até-valor, friction real de cancelamento, comparativo real de tier de preço com os limites dos planos free. Aí está sua abertura.
>
> **Considerações de autor/byline:** Este artigo só funciona se for assinado por alguém que de fato usou os 7 CRMs. Se é você, lidere com isso: "Sou [seu contexto]. Em 90 dias paguei e testei [lista]. Aqui está o que mantive e o que cancelei." Se você não é o testador, contrate ou faça parceria com alguém que seja — não finja; o Google está ficando melhor em farejar isso.
>
> **Outline:**
>
> **H1:** Best CRM for Solopreneurs: 7 Tested for 90 Days (~58 caracteres)
>
> **H2: Do solopreneurs actually need a CRM?**
> Intenção: responde à PAA mais perguntada, captura o featured snippet e arma o resto.
> Pontos-chave: resposta de 40 palavras no primeiro parágrafo. Depois a versão honesta — a maioria dos solopreneurs com menos de 20 clientes ainda não precisa, mas eis quando a chave vira.
> Internal link: linkar para `/crm-pricing-teardown` a partir do anchor text "CRM pricing tiers"
> PAA: sim — esta seção também cobre PAA #2
>
> **H2: How I tested these 7 CRMs**
> Intenção: estabelece E-E-A-T. Esta é a seção que faz o Google confiar no resto.
> Pontos-chave: timeline (90 dias cada), o que foi testado (tempo de setup, tempo até primeiro deal logado, friction de uso diário, friction de cancelamento), o que não foi (features enterprise, planos de time sem gate).
> Internal link: nenhum ainda — poderia ganhar um com uma galeria de screenshots como sub-página depois.
>
> **H2: The 7 CRMs, ranked**
> Intenção: a carne principal. Cada subhead é um CRM com um veredito claro.
> Pontos-chave: cada entrada tem um bloco de 200 palavras com: tier escolhido, custo mensal, veredito de 1 linha, o que funcionou, o que quebrou, eu manteria.
> Internal link: linkar para `/honeybook-vs-dubsado` a partir de "HoneyBook vs. Dubsado deep dive" onde relevante.
> Keywords secundárias para entrelaçar naturalmente: "free CRM for freelancers", "CRM for one-person business", "simple CRM", "lightweight CRM".
>
> **H2: Free CRMs: which one I'd actually pick** (cobre PAA #1)
> Intenção: capturar o tráfego do modificador "free" sem fazer o artigo inteiro ser sobre free.
> Pontos-chave: HubSpot Free é o default óbvio; a pegadinha honesta em 1.000 contatos; o que usar se você tem menos de 25 clientes (um template do Notion frequentemente vence todo CRM free).
> Internal link: nenhum — mas se você tem uma página de template de Notion CRM, linke.
>
> **H2: Is HubSpot good for solopreneurs?** (cobre PAA #3)
> Intenção: responder à PAA específica de marca sem fazer o artigo HubSpot-vs-todos.
> Pontos-chave: 100-150 palavras. Resposta honesta (sim, com ressalvas). Onde ele atende além do necessário para um solopreneur.
>
> **H2: What I'd actually pick — and the boring reason why**
> Intenção: seção diferenciadora. Opinião forte, sem ficar em cima do muro.
> Pontos-chave: nomeie um vencedor. Nomeie o segundo lugar. Nomeie o que evitar. Recibos.
>
> **H2: How to switch CRMs without losing data**
> Intenção: capturar a intenção long-tail "como migrar" + dar ao artigo valor prático.
> Pontos-chave: formatos de exportação, o que não transfere, a abordagem de rodar em paralelo por 1 semana.
> Internal link: se você tem uma página `/data-migration-guide`, linke.
>
> **Perguntas frequentes**
> H3: What is the easiest CRM to use for solopreneurs? *(cobre PAA #4)*
> H3: How much should a solopreneur pay for a CRM?
> H3: Can I use Notion as a CRM?
> H3: When should a solopreneur upgrade from a spreadsheet to a CRM?
>
> **Meta title:** Best CRM for Solopreneurs: 7 Tested in 90 Days (52 caracteres)
>
> **Meta description:** Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what the comparison sites get wrong. (160 caracteres)
>
> **Recomendação de schema:** Article + FAQPage. Pule schema Product a menos que esteja adicionando páginas individuais de review de produto — o artigo é comparativo, não review de produto único.
>
> **Plano de injeção de E-E-A-T:**
> - Abertura em primeira pessoa: "Sou [nome], rodo um [tipo de negócio] e pago pelas ferramentas do meu bolso. Aqui está o que 90 dias de teste me ensinaram."
> - Screenshots reais no H2 de cada CRM (tela de signup, dashboard, fluxo de cancelamento)
> - Números reais: tempo-até-primeiro-deal-logado, custo mensal pago, score de friction de cancelamento (sua própria escala)
> - Bio de autor no fim com role + tempo de casa + um link para suas outras reviews
> - Se você recebeu dinheiro de algum dos CRMs (afiliado, sponsorship), declare no topo, não no fim

---

## Erros comuns de outline que o kit vai sinalizar

- **Nenhuma seção ancorando o featured snippet.** Se a SERP tem um featured snippet, você quer que seu H2 responda nas primeiras 40-60 palavras.
- **Perguntas da PAA ignoradas.** Se People Also Ask está na SERP, você está deixando um ganho de seção FAQ sobre a mesa.
- **Uma seção gigante.** Se um H2 tem 600+ palavras embaixo, divida. Resultados de busca escaneiam por H2s e H3s.
- **Nenhum internal link nomeado.** "Link para conteúdo relacionado" não ajuda ninguém. Nomeie a âncora e o alvo.
- **Meta description que só reescreve o H1.** O Google reescreve essas. Escreva uma promessa real de duas frases.
- **Sem injeção de E-E-A-T.** O outline não vai a lugar nenhum se não há plano para experiência em primeira pessoa.

---

## Como usar o outline depois de tê-lo

1. Leia uma vez. Discorda de algo? Peça à IA para defender a escolha ou revisar.
2. Preencha os placeholders que precisam dos SEUS dados (números reais, screenshots reais, anedotas reais).
3. Aprove o outline antes de pedir o draft completo. Não deixe a IA escrever 2.500 palavras e só depois perceber que a estrutura está errada.
4. Gere o draft seção por seção. O optimization pack lida com isso — cada seção abre com uma resposta pronta para featured snippet, então aprofunda.
5. Rode o draft pelo gerador de meta + schema (`templates/meta-and-schema.md`) antes de publicar.
