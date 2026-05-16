# Playbook de Content Refresh

O trabalho de SEO de maior alavancagem que você pode fazer raramente é escrever artigos novos. É consertar os que você já tem. Este playbook te diz quando atualizar, quando reescrever, quando consolidar e quando deletar — mais o prompt que faz cada um deles com segurança.

---

## A árvore de decisão de refresh

Rode cada artigo candidato por isto, em ordem. Pare no primeiro match.

### Passo 1: Puxe os dados

Para cada artigo que você está considerando, pegue:

- Rank atual do Google para a keyword primária (Search Console)
- Tendência de posição média nos últimos 12 meses
- Click-through rate
- Os top 3 atuais da SERP
- O `datePublished` e `dateModified` do artigo
- Backlinks apontando para a URL (Ahrefs, Semrush, ou o que você usar)

10 minutos de coleta de dados te salva de fazer o refresh errado.

### Passo 2: Rode a árvore

**P1: O artigo está rankeando página 1 ou página 2?**
- SIM → **Atualize no lugar.** Preserve a URL, preserve internal links, preserve backlinks. Só refresque a substância.
- NÃO → continue.

**P2: O artigo está rankeando página 3-5, e a intenção está descompassada?**
(ex.: seu artigo é um tutorial mas a SERP agora recompensa artigos comparativos)
- SIM → **Reescreva em torno da intenção correta.** Mantenha a URL. Trate como um artigo novo usando a autoridade da URL antiga.
- NÃO → continue.

**P3: Você tem dois artigos competindo pela mesma keyword?**
- SIM → **Consolide.** Escolha a URL mais forte (mais backlinks, melhor rank atual). Funda o melhor conteúdo nela. 301 da URL mais fraca para a mais forte.
- NÃO → continue.

**P4: A query mudou fundamentalmente?**
(ex.: a feature foi renomeada; AI Overview está comendo os cliques; a SERP virou para vídeo)
- SIM → **Reescrita grande.** Novo ângulo, novo formato se necessário. Mantenha a URL só se o artigo antigo ainda tem relevância + backlinks suficientes para justificar a preservação da URL.
- NÃO → continue.

**P5: O tópico está descontinuado?**
(ex.: o produto não existe mais; a lei mudou; o framework foi aposentado)
- SIM → **Delete e 301** para o artigo atual relacionado mais próximo. Se nada está próximo, retorne 410 (gone).
- NÃO → continue.

**P6: O artigo está rankeando mas perdendo tráfego ano a ano?**
- SIM → **Atualize no lugar + adicione profundidade.** Provavelmente perdendo cliques para um artigo mais novo. Refresque a substância, adicione o que está faltando, atualize a meta.
- NÃO → deixe quieto, monitore por mais um trimestre.

---

## Padrão 1: Atualizar no lugar (o refresh mais comum)

Para artigos rankeando página 1-2 que só precisam de uma refrescada.

### O que você faz

- Atualize estatísticas e fatos desatualizados
- Substitua screenshots se o UI mudou
- Adicione novas sub-seções se o tópico tem novas dimensões
- Fortaleça seções fracas (as com baixa profundidade de scroll no PostHog/Hotjar/etc.)
- Atualize internal links se você publicou conteúdo relacionado melhor desde então
- Atualize o schema `dateModified`
- NÃO mude a URL
- NÃO remova seções que estão ganhando os rankings

### O prompt

```
Você é o SEO Content Strategist.

Estou refrescando este artigo no lugar. A URL fica. A maior parte da estrutura fica.

**URL do artigo:** [URL]
**Keyword primária:** [keyword]
**Rank atual:** [posição]
**Top 3 atual da SERP:** [cole]
**Última publicação / modificação:** [datas]

**O artigo como está agora (cole):**
[artigo completo]

O que eu quero:
1. Uma lista estilo diff do que mudar (com razões)
2. Novas seções que você adicionaria ou sub-seções dentro de H2s existentes
3. Fatos/estatísticas desatualizados que precisam de atualização (com flags "fonte necessária")
4. Meta title e description atualizados APENAS se os atuais são fracos
5. Sugestões de internal link para as novas seções

NÃO reescreva seções que estão funcionando a menos que você possa nomear uma razão específica para elas estarem subperformando.
```

### Output de exemplo trabalhado

> **Plano de diff:**
>
> 1. **Atualize o H2 #3 ("Pricing comparison")** — a tabela tem preços de 2024. HubSpot, Pipedrive e Salesforce todos mexeram. Puxe o preço atual da página de pricing de cada fornecedor. *(fonte necessária: página de pricing atual de cada fornecedor)*
> 2. **Adicione um novo H2 entre o atual #4 e #5: "What changed in 2026"** — toca nas features de IA que cada CRM agora empacota. É isto que a SERP agora rankeia para artigos mais novos. ~250 palavras.
> 3. **Fortaleça o H2 #5 ("Best for under 20 contacts")** — atualmente 180 palavras, você pode dobrar isso com uma anedota de teste real. Os dados da PAA mostram usuários buscando esse recorte específico.
> 4. **Atualize internal links** — sua versão antiga linka para `/crm-pricing-teardown` que agora redireciona. Atualize para a URL atual `/saas-pricing-deep-dive`.
> 5. **Meta title fica** (está funcionando, 54 caracteres, keyword primária na frente).
> 6. **Atualização de meta description** — a atual é o H1 reformulado. Substitua por: "Tested 7 CRMs for 90 days each — refreshed for 2026 with new AI features, current pricing, and the one I'd actually pick today." (153 caracteres)
>
> **Seções que você NÃO deve tocar:**
> - A seção "How I tested these" é sua espinha de E-E-A-T e está ganhando o rank. Deixe quieta.
> - O H1 fica. É o título ganhando o clique.
>
> **O que está faltando:**
> - Você atualmente não trata "free CRM for solopreneurs" — a PAA mostra volume real nesse recorte. Considere adicionar como um H3 dentro do H2 #4.

---

## Padrão 2: Reescrever em torno de nova intenção

Quando seu artigo está rankeando página 3-5 porque o Google agora quer um formato diferente para esta query.

### Sinais de que a intenção mudou

- Os top 3 resultados de hoje são um formato diferente do que quando você publicou
- Seu CTR está abaixo de 1% mesmo na posição 5-7 (significa que você está aparecendo mas não recebendo cliques)
- As perguntas da PAA mudaram
- Um AI Overview apareceu

### O que você faz

- Mantenha a URL (ela tem autoridade)
- Novo outline combinando com a nova SERP
- Novo H1, nova meta title, nova meta description
- Adicione uma nota breve de contexto de redirecionamento para quem linkou a versão antiga, OU mantenha o suficiente do ângulo original como sub-seção para que esses backlinks ainda pareçam relevantes

### O prompt

```
Você é o SEO Content Strategist.

Estou reescrevendo este artigo em torno de nova intenção. URL fica.

**URL do artigo:** [URL]
**Keyword primária:** [keyword]
**Rank atual:** [posição]
**Top 3 atual da SERP:** [cole]
**O artigo como está:**
[texto completo]

O que observei:
- [por que acho que a intenção mudou — o que mudou na SERP]

O que eu quero:
1. Classificação de intenção da NOVA SERP
2. Um novo outline (mesma profundidade do template de outliner de artigo)
3. Quais (se alguma) seções do artigo antigo devem ser preservadas verbatim
4. Meta title + description atualizados
5. Uma nota sobre continuidade de backlinks — devo me preocupar em perder algum deles?
```

---

## Padrão 3: Consolidar dois artigos competindo

Quando você descobre que canibalizou você mesmo.

### Como identificar

- O Search Console mostra duas das suas URLs ambas aparecendo para a mesma keyword
- Ambas as URLs ficam na página 2-3 e nunca sobem
- Nenhuma tem uma vantagem clara em profundidade de conteúdo ou backlinks

### O que você faz

- Escolha a URL sobrevivente (mais backlinks, ou a que combina mais limpamente com a query)
- Funda o melhor conteúdo da URL perdedora na sobrevivente
- 301 da URL perdedora para a sobrevivente
- Atualize todos internal links apontando para a perdedora

### O prompt

```
Você é o SEO Content Strategist.

Tenho dois artigos competindo pela mesma keyword. Preciso consolidar.

**Keyword:** [keyword primária]

**Artigo A:**
- URL: [A]
- Rank atual: [posição]
- Backlinks: [contagem]
- Publicado: [data]
- [cole o artigo completo]

**Artigo B:**
- URL: [B]
- Rank atual: [posição]
- Backlinks: [contagem]
- Publicado: [data]
- [cole o artigo completo]

O que eu quero:
1. Escolha a URL sobrevivente com raciocínio
2. Um outline unificado puxando o melhor dos dois
3. O draft fundido completo
4. Uma lista de internal links atualmente apontando para a URL perdedora que precisam ser atualizados
5. O plano de 301
```

---

## Padrão 4: Reescrita grande (a query mudou fundamentalmente)

A decisão mais difícil. O artigo ainda rankeia mas o mundo se moveu. Exemplos: um AI Overview agora responde à query então o tráfego caiu 60%; o framework sobre o qual você escreveu foi descontinuado; o comportamento de busca mudou de texto para vídeo.

### O que você faz

- Reescrita grande, frequentemente um ângulo novo inteiramente
- Decida o destino da URL com base no valor de backlinks: se a URL tem backlinks fortes, mantenha e reescreva; se não, URL fresca está ok
- Atualize meta, schema, internal links

Isto não é realmente um "refresh" — é um artigo novo usando a autoridade da URL antiga. Trate como escrever uma peça nova, usando o template de outliner de artigo (`templates/article-outliner.md`).

---

## Padrão 5: Deletar e 301

Quando o tópico está genuinamente descontinuado.

### Exemplos

- Um produto que você avaliou fechou
- Uma lei sobre a qual você escreveu foi substituída
- Um framework que você ensinou foi aposentado
- Um artigo de tendência cujo momento passou e você não tem interesse em atualizar

### O que você faz

- 301 da URL para o artigo atual mais próximo
- Se nada está próximo, retorne 410 (gone) para o Google remover limpamente
- Não simplesmente delete e deixe dar 404 — isso é equity de backlink desperdiçado

---

## O prompt do analisador de intenção de SERP

Use isto quando você não consegue decidir QUAL padrão de refresh se aplica.

```
Você é o SEO Content Strategist.

Me ajude a classificar que tipo de refresh este artigo precisa.

**URL do artigo:** [URL]
**Keyword primária:** [keyword]
**Rank atual:** [posição]
**Tendência de 12 meses:** [melhorando / estável / declinando]
**Top 3 resultados da SERP hoje:** [cole]

**O artigo (cole):**
[artigo completo]

Rode minha árvore de decisão de refresh. Me diga:
1. Que padrão se encaixa (atualizar no lugar / reescrita de intenção / consolidar / reescrita grande / deletar)
2. O raciocínio
3. O primeiro passo concreto que devo dar
```

O output deve ser uma resposta clara "padrão X porque Y" mais o primeiro passo. Se a IA hesitar ou dizer "depende", empurre: "Se você tivesse que escolher um, qual?"

---

## Exemplo trabalhado — "what is HubSpot used for"

Uma decisão real de refresh. O artigo rankeia #4. CTR é 0,8%. Os top 3 da SERP agora são dominados por respostas curtas, em estilo de definição, com um AI Overview citando dois deles. O artigo atualmente tem 1.800 palavras e começa com pitch de marketing.

**Rodada da árvore de decisão:**
- Página 1? Quase (#4). Território de página 2.
- Descompasso de intenção? Sim — a SERP quer conteúdo curto, definicional, primeiro-fato. O artigo é longform e puxando para marketing.
- Dois artigos competindo? Não.
- A query mudou fundamentalmente? Mais ou menos — a presença do AI Overview comprimiu o valor do clique.
- Tópico descontinuado? Não, HubSpot ainda muito existe.

**Veredito:** Padrão 2 (reescrever em torno de nova intenção). Mantenha a URL (tem 12 backlinks). Reestruture como uma peça definicional primeiro-fato, com uma resposta enxuta de 50 palavras no topo, então expansões. Largue o tom de pitch de marketing. Mire o featured snippet diretamente.

**Resultado esperado:** rank sobe de #4 para #1-2, mas números absolutos de clique podem não saltar dramaticamente porque o AI Overview está comendo o clique de qualquer forma. A vitória é presença de marca nas citações da IA e recuperar orgânico para queries variantes com marca.

---

## Erros comuns de refresh que o kit vai sinalizar

- **Mudar a URL de um artigo rankeando página 1.** Você vai perder o rank e o equity de backlinks. Refresque no lugar.
- **Deletar um artigo sem fazer 301.** Backlinks desperdiçados, erros 404 no Search Console.
- **Refrescar sem checar por que o tráfego caiu.** Às vezes o artigo está bem e a QUERY caiu em volume. Cheque o total de impressões no Search Console antes de assumir que o artigo é o problema.
- **Refrescar com muita frequência.** Uma vez a cada 6-12 meses é a cadência certa para a maioria dos artigos. Refrescar mensalmente parece suspeito para o Google e queima seu tempo.
- **Atualizar `dateModified` sem de fato atualizar substância.** O Google pega isso e desconta o sinal de frescor.
- **Remover seções que estão ganhando os rankings.** Sempre olhe profundidade de scroll e dados de tempo na seção antes de cortar.

---

## Cadência de refresh — como planejar um ano

Um time pequeno de conteúdo pode produtivamente refrescar 4-8 artigos por mês. Um operador solo deve mirar 2-3 por mês, priorizados por:

1. Artigos que perderam mais tráfego absoluto nos últimos 90 dias
2. Artigos rankeando posição 4-15 com alto potencial de CTR
3. Artigos linkados das suas páginas de alto tráfego (refrescar estes compõe o benefício de internal link)
4. Artigos com 18+ meses que não foram tocados

Rode a árvore de decisão de refresh em cada um. Escolha o padrão. Execute. Não refresque e republique todos eles; alguns vão te dizer para deletar ou consolidar. Isso é o playbook funcionando.
