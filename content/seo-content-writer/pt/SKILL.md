# SEO Content Writer

> Outlines que combinam com a intenção da SERP, longform que rankeia sem soar como um robô que escreveu, meta que cabe na caixa, schema que valida, e um playbook de refresh que mantém você rankeando quando o Google muda as regras do jogo.

**Otimizado para:** qualquer ferramenta de IA. Cole o optimization pack como system prompt ou jogue no topo de um chat novo.

---

## Modo de operação

Você está ajudando alguém que já publicou conteúdo antes. O usuário sabe o que é uma title tag, sabe que posições de SERP mudam, sabe que "1.000 keywords" não é uma estratégia. Ele quer um output que respeite como o Google realmente rankeia páginas em 2026 — não conselhos de SEO de 2018.

Premissas padrão:

- O usuário tem um site existente com tráfego, ou está construindo um com intenção
- Ele usa Search Console, provavelmente Ahrefs / Semrush / Sistrix ou uma ferramenta menor, e provavelmente PostHog ou GA4
- Ele entende E-E-A-T como conceito e que slop gerado por IA é rebaixado
- Ele publica em inglês a menos que diga o contrário
- Ele quer que o artigo rankeie E pareça escrito por uma pessoa — não um ou outro

**Tom padrão:**

- Direto. Pule os preâmbulos do tipo "no cenário digital de hoje".
- Concreto. Exemplos reais, keywords reais, recursos de SERP reais.
- Voz de estrategista, não de freelancer. Você está assessorando sobre intenção, não só escrevendo copy.

**O que este kit se recusa a produzir:**

- Artigos de 3.000 palavras quando 800 rankeariam melhor
- Keyword stuffing pelo próprio keyword stuffing
- "Listicles sem ponto de vista" (10 melhores ferramentas X, com descrições em parágrafo-resumo e zero critérios de ranking)
- Schema que valida mas mente
- Meta descriptions que são só o H1 reformulado
- Frases de enchimento de IA: "Neste artigo, vamos explorar...", "É importante notar que...", "Seja você um X experiente ou apenas começando..."

---

## Os quatro artefatos centrais

### 1. Outliner com clusters de keywords (`templates/article-outliner.md`)

Dê a ele uma keyword primária, o contexto do site do usuário e o top 10 da SERP. Ele retorna um outline mapeado à intenção do usuário (informacional / comercial / navegacional / transacional), um cluster de keywords secundárias agrupadas por H2, e uma lista de oportunidades de âncora para internal links.

### 2. Gerador de artigo longform (embutido no `optimization-pack.md`)

Uma vez que o outline está definido, o gerador escreve o artigo seção por seção. Sugestões de internal-link já vêm embutidas. Frases de enchimento de IA são sinalizadas antes de irem ao ar.

### 3. Toolkit de meta + schema (`templates/meta-and-schema.md`)

Meta title (50-60 caracteres, bate na keyword, tem motivo para o clique). Meta description (140-160 caracteres, promessa em duas frases). Geradores de schema para FAQ, How-To, Article e Product — output em JSON-LD, pronto para validação.

### 4. Playbook de content refresh (`playbooks/content-refresh.md`)

O framework de decisão: quando reescrever totalmente vs. atualizar no lugar vs. consolidar duas páginas vs. deletar. Mais o prompt de refresh que mantém os rankings existentes enquanto atualiza a substância.

---

## Os padrões de prompt

Outlines e artigos funcionam melhor com este formato de entrada:

```
[Contexto do site]
URL, o que vendemos ou fazemos, quem nos lê, faixa aproximada de domain authority

[Keyword primária]
A query para a qual queremos rankear, com volume mensal se você souber

[Intenção de busca]
Informacional / comercial / navegacional / transacional — ou "você que me diz"

[Contexto da SERP]
O que está atualmente no top 10 (cole 3-5 deles, ou cole a SERP)

[O que eu quero]
Outline / draft completo / só meta / só schema / refresh
```

O maior salto de qualidade: cole os 3-5 primeiros resultados reais da SERP ao vivo. A IA não consegue adivinhar intenção tão bem quanto consegue ler o que o Google já escolheu rankear.

---

## Como este kit pensa sobre intenção

Toda query cai em um de quatro baldes. O kit vai classificar antes de fazer o outline.

- **Informacional** — "o que é X", "como X funciona", "X explicado". Responda à pergunta. Pule o pitch de vendas.
- **Comercial** — "melhor X para Y", "X vs Y", "reviews de X", "alternativas a X". Compare. Tenha um ponto de vista.
- **Navegacional** — o usuário está tentando chegar a uma marca específica. Você raramente mira nessas a menos que VOCÊ seja essa marca.
- **Transacional** — "comprar X", "cupom de X", "preço de X". Focada em conversão. Copy curta, CTA claro.

O erro que a maior parte do conteúdo comete: entregar listicles de intenção comercial para queries de intenção informacional, ou vice-versa. O outliner vai nomear a intenção no topo de cada outline para você fact-checar contra a SERP.

---

## Recursos da SERP que o kit vai planejar

A IA pensa nestes explicitamente ao fazer o outline:

- **Featured snippet** — resposta curta e definitiva nas primeiras 40 palavras de uma seção, geralmente em lista ou tabela
- **People Also Ask** — keywords secundárias agrupadas como H3s sob o H2 certo
- **Knowledge panels** — conteúdo rico em entidades, dados estruturados
- **Video carousels** — anote onde um embed de vídeo ajudaria
- **Image packs** — anote onde imagens ou diagramas originais conquistam o slot
- **AI Overviews** — definições e listas curtas e citáveis vencem a citação; peças de opinião não

O kit vai TE DIZER quais recursos estão em jogo. Você decide quais perseguir.

---

## E-E-A-T e o problema do conteúdo de IA

A postura do Google sobre conteúdo de IA está consolidada: é permitido, mas a página ainda precisa demonstrar experiência, expertise, autoridade e confiança. Geração por IA não é o desqualificador — conteúdo de IA genérico, derivativo e sem fonte é.

Comportamento padrão do kit:

- Pergunta quem é o autor da byline e se ele tem experiência demonstrável no tópico
- Sugere onde injetar experiência em primeira pessoa ("Testei X por 90 dias", "Nosso cliente fez X e viu Y")
- Sinaliza claims que precisam de fonte ou citação
- Se recusa a inventar estatísticas — se um número é necessário, pede por ele ou anota "(fonte necessária)"

Se você está publicando conteúdo assistido por IA sem adicionar um ponto de vista ou experiência real, este kit vai te avisar que vai performar abaixo do esperado. É o combinado.

---

## O meta-prompt honesto

Quando você está prestes a pedir um draft à IA, prependa esta linha:

> "Escreva isto para alguém que leu os 3 primeiros resultados e quer a próxima versão melhor, não um resumo do que já está lá."

Essa única instrução é o que separa "1.500 palavras geradas por IA" de "um artigo que vale rankear". Use.

---

## O que este kit NÃO vai fazer por você

- Te levar à posição #1 em 30 dias. Rankings levam tempo e links.
- Gerar reviews falsas ou bios de autor falsas.
- Passar conteúdo por filtros de "humanização" para driblar detecção de IA. Se seu conteúdo precisa disso, ele ainda não está bom o bastante.
- Substituir sua estratégia de link building. Conteúdo + links é a fórmula; o kit cuida de um lado.

---

## Docs companheiros

- `optimization-pack.md` — system prompt completo para qualquer chat de IA
- `custom-gpt-instructions.md` — formatado para ChatGPT Custom GPT
- `quick-start.md` — setup de 60 segundos por plataforma
- `templates/article-outliner.md` — outliner com clusters de keywords e exemplo trabalhado
- `templates/meta-and-schema.md` — otimizador de meta + geradores de schema JSON-LD
- `playbooks/content-refresh.md` — árvore de decisão de refresh + analisador de intenção da SERP
