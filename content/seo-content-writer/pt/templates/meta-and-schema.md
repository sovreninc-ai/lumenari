# Toolkit de Meta + Schema

Dois campos chatos e um bloco JSON que movem mais tráfego do que a maioria das reescritas de artigo. Este arquivo te dá os prompts para gerá-los e os exemplos trabalhados para copiar.

---

## Parte 1 — Meta titles

### Como é o bom

- 50-60 caracteres (Google trunca em torno de 600px no desktop; ~60 caracteres é o limite seguro)
- Keyword primária na primeira metade
- Uma razão para clicar que não seja só o match de keyword
- Sem clickbait, sem caixa alta, sem `[2026]` desnecessário

### O prompt

```
Você é o SEO Content Strategist.

Gere 5 variantes de meta title para este artigo.

**Keyword primária:** [keyword]
**Ângulo do artigo:** [uma frase sobre o que este artigo de fato argumenta ou entrega]
**Intenção:** [informacional / comercial / etc.]
**Sufixo de marca (opcional):** [ex.: " | SuaMarca" — só se couber no limite de caracteres]

Para cada variante, me dê:
- O título
- Contagem de caracteres (com sufixo de marca se usado)
- O gancho: o que faz alguém clicar nele em vez do top 3

Evite: clickbait, caixa alta, tagging genérico "[ANO]" a menos que o tópico seja genuinamente sensível ao tempo.
```

### Output de exemplo trabalhado — "best CRM for solopreneurs"

1. **Best CRM for Solopreneurs: 7 Tested in 90 Days** (52 caracteres) — gancho: especificidade + duração como prova
2. **Best CRM for Solopreneurs (One I Cancelled Fast)** (50 caracteres) — gancho: recibo contrário
3. **Best CRM for Solopreneurs: The Honest Comparison** (50 caracteres) — gancho: "honest" implica que os outros não são
4. **Best CRM for Solopreneurs: $X/mo Tools Compared** (47 caracteres) — gancho: lidera com preço
5. **Best CRM for Solopreneurs: Notion Won Against 6 Apps** (53 caracteres) — gancho: entrega a resposta, gera o clique "espera, o quê"

O mais forte deles depende de em qual diferenciador o artigo de fato se apoia. #1 é o default mais seguro. #5 só funciona se o Notion realmente venceu.

---

## Parte 2 — Meta descriptions

### Como é o bom

- 140-160 caracteres
- Promessa em duas frases: o que você entrega + por que vale a leitura
- Não reformule o H1
- Não termine com "Leia mais!" (Google remove)
- Inclua a keyword primária uma vez, naturalmente

### O prompt

```
Você é o SEO Content Strategist.

Gere 3 variantes de meta description para este artigo.

**Meta title:** [título que você escolheu]
**Keyword primária:** [keyword]
**Ângulo do artigo:** [uma frase sobre o que este artigo de fato argumenta ou entrega]
**Top 3 coisas que um leitor vai ganhar do artigo:** [lista em bullets]

Para cada variante:
- A description
- Contagem de caracteres
- Com qual "promessa" ela lidera
```

### Output de exemplo trabalhado

Para o artigo de CRM:

1. **"Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what every comparison site got wrong."** (160 caracteres) — lidera com a prova de duração

2. **"Most 'best CRM' lists are written from press releases. I actually tested 7 — daily-use friction, real costs, real cancellation flows. The verdict surprised me."** (158 caracteres) — lidera com o ângulo contraste/contrário

3. **"The best CRM for solopreneurs isn't the one with the longest feature list. After 90 days testing 7, here's the one worth paying for and the one to skip."** (152 caracteres) — lidera com a tese

Se você não tem certeza qual escolher, mande o #1. O verbo "paid for" faz muito trabalho — sinaliza custo e esforço em primeira mão.

---

## Parte 3 — Geradores de schema

### Qual schema usar e quando

| Tipo de artigo | Schema |
|---|---|
| Post de blog, artigo de notícia | Article |
| Artigo com uma seção FAQ que de fato responde FAQ | Article + FAQPage |
| Instrucional passo a passo ("How to X") | HowTo |
| Página de review de produto único | Product (só com reviews REAIS) |
| Comparativo ou listicle | Article (NÃO Product a menos que você esteja revisando um produto específico) |

### Prompt de Article schema

```
Você é o SEO Content Strategist.

Gere JSON-LD de Article para esta página.

**Headline:** [o H1]
**URL:** [URL canônica completa]
**Nome do autor:** [byline]
**URL do autor:** [opcional — página do autor ou LinkedIn]
**Nome do publisher:** [nome do site]
**URL do logo do publisher:** [URL da imagem do logo]
**Data de publicação:** [YYYY-MM-DD]
**Data de modificação:** [YYYY-MM-DD]
**URL da imagem em destaque:** [imagem hero]
**Description:** [meta description]

Output JSON-LD pronto para validação com todas as propriedades obrigatórias + recomendadas. Use contexto schema.org.
```

**Output de exemplo trabalhado:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best CRM for Solopreneurs: 7 Tested in 90 Days",
  "image": "https://solo-saas-reviews.com/images/crm-test-hero.jpg",
  "author": {
    "@type": "Person",
    "name": "Chris Holwell",
    "url": "https://solo-saas-reviews.com/author/chris-holwell"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Solo SaaS Reviews",
    "logo": {
      "@type": "ImageObject",
      "url": "https://solo-saas-reviews.com/logo.png"
    }
  },
  "datePublished": "2026-05-14",
  "dateModified": "2026-05-14",
  "description": "Paid for and used 7 CRMs for 90 days each as a one-person business. Here's the one I kept, the one I cancelled fastest, and what every comparison site got wrong.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://solo-saas-reviews.com/best-crm-solopreneurs"
  }
}
```

Jogue isso dentro de um bloco `<script type="application/ld+json">` no `<head>` da página.

### Prompt de FAQ schema

Só use isto se a página de fato tem uma seção FAQ visível que responde a essas perguntas. Não envie FAQ schema para perguntas que não estão na página — isso é uma violação e rende uma manual action.

```
Você é o SEO Content Strategist.

Gere JSON-LD de FAQPage para esta página.

**URL da página:** [URL]
**Pares P&R de FAQ:**
1. P: [pergunta]
   R: [a resposta como escrita na página — texto completo]
2. P: [pergunta]
   R: [resposta]
[Etc.]

Importante: cada P&R aqui PRECISA estar visível na página. Se não está na página, não inclua. Confirme antes de gerar se há qualquer ambiguidade.

Output JSON-LD pronto para validação.
```

**Output de exemplo trabalhado:**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do solopreneurs need a CRM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most solopreneurs under 20 active clients don't need a dedicated CRM. A spreadsheet or a Notion template handles the same volume with less friction. The threshold to upgrade tends to be when you're losing track of follow-ups or when client conversations span multiple channels."
      }
    },
    {
      "@type": "Question",
      "name": "What is the easiest CRM for solopreneurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Based on 90 days of testing, the easiest to learn was HubSpot Free, and the easiest to keep using daily was a tie between FollowUpBoss and a Notion CRM template. 'Easiest' depends on whether you value setup speed or long-term low friction."
      }
    },
    {
      "@type": "Question",
      "name": "Is HubSpot good for solopreneurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes for solopreneurs growing toward 100+ contacts. HubSpot Free is overpowered for the use case but the upgrade path is steep — the paid tiers are priced for teams, not individuals. If you're staying solo, you'll outgrow free and underuse paid."
      }
    }
  ]
}
```

### Prompt de How-To schema

Só use para conteúdo genuinamente instrucional passo a passo. "Como começar um podcast" com passos discretos se qualifica. "Como pensar sobre sua marca" não — isso é um ensaio, não um how-to.

```
Você é o SEO Content Strategist.

Gere JSON-LD de HowTo para esta página.

**Headline:** [o H1, precisa começar com "How to..."]
**Description:** [resumo de uma frase]
**Tempo total:** [estimado, em formato de duração ISO 8601 — ex.: PT2H para 2 horas]
**Supply (opcional):** [coisas que o usuário precisa ter]
**Tool (opcional):** [ferramentas necessárias]
**Steps:** [lista numerada — cada passo tem um name, text e opcionalmente uma URL de imagem]

Output JSON-LD pronto para validação.
```

**Output de exemplo trabalhado** (para "How to launch a podcast in a weekend"):

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Launch a Podcast in a Weekend",
  "description": "A two-day launch plan covering recording, editing, hosting, and distribution.",
  "totalTime": "PT16H",
  "supply": [
    { "@type": "HowToSupply", "name": "USB microphone" },
    { "@type": "HowToSupply", "name": "Quiet recording space" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Audacity or GarageBand" },
    { "@type": "HowToTool", "name": "Buzzsprout or Transistor account" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Pick the format and write the first episode",
      "text": "Decide between solo, interview, or co-host. Write a 10-minute first episode you'd want to listen to."
    },
    {
      "@type": "HowToStep",
      "name": "Record episode one",
      "text": "Use a quiet room, USB mic 6 inches from your mouth, single take. Don't edit while recording."
    },
    {
      "@type": "HowToStep",
      "name": "Edit and export",
      "text": "Remove dead air over 2 seconds. Normalize audio to -16 LUFS. Export as MP3, 128 kbps."
    },
    {
      "@type": "HowToStep",
      "name": "Set up hosting and submit to directories",
      "text": "Create a hosting account, upload episode one, generate your RSS feed, submit to Apple Podcasts and Spotify."
    }
  ]
}
```

### Prompt de Product schema (com o aviso)

```
Você é o SEO Content Strategist.

Gere JSON-LD de Product para esta página.

**Nome do produto:** [nome]
**Description:** [um parágrafo]
**URL da imagem:** [imagem principal do produto]
**Marca:** [nome da marca]
**SKU (opcional):** [se aplicável]
**Preço + moeda:** [ex.: "29.00 USD"]
**Disponibilidade:** [InStock / OutOfStock / PreOrder]

**Reviews (só se reais):**
- Valor de aggregate rating: [número até 5]
- Contagem de aggregate review: [número]
- Amostras de reviews individuais (opcional, 1-3): cada uma com author + rating + texto

CRÍTICO: Não inclua aggregateRating a menos que a página tenha reviews reais, visíveis e verificáveis. aggregateRating falso ou fabricado rende manual actions e é fraude. Confirme antes de gerar.

Output JSON-LD pronto para validação.
```

---

## Erros comuns de schema que o kit vai sinalizar

- **FAQ schema com perguntas que não estão na página.** Violação. Não faça.
- **HowTo schema em conteúdo que não é de fato how-to.** "How to think about pricing" é um ensaio; "How to migrate from HubSpot to Pipedrive" pode se qualificar.
- **Product schema aggregateRating sem reviews reais.** Este é um dos caminhos mais rápidos para uma manual action do Google.
- **Article schema com `dateModified` mais antigo que `datePublished`.** Validators sinalizam; você também perde o boost de frescor.
- **`@type` errado para o conteúdo.** Um artigo comparativo é Article, não Product.
- **`mainEntityOfPage` ausente no schema de Article.** Obrigatório para resultados de busca mais ricos.

---

## Como validar

Antes de publicar, rode o schema por:

- Rich Results Test do Google (`search.google.com/test/rich-results`) — confirma elegibilidade para rich results
- Schema.org Validator (`validator.schema.org`) — confirma que o JSON-LD está bem formado

Se qualquer um falhar, conserte antes de publicar. Não envie schema quebrado; custa mais do que não ter schema nenhum.
