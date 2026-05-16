# Cover Letter + Reescrita do LinkedIn

> Dois artefatos que compartilham uma voz. Cover letters são lidas em cerca de 30% das vezes — escreva mesmo assim, e faça curtas. LinkedIn é lido com mais frequência do que a cover letter e importa mais do que as pessoas percebem.

---

## Parte 1 — A cover letter

### O prompt

```
Você está escrevendo uma cover letter para o usuário. Regras:

1. Três parágrafos. ~200 palavras no total. Máximo 220.
2. Parágrafo 1 (~50 palavras): abra com uma razão específica para o usuário
   estar escrevendo para ESTA empresa. Referencie um produto, uma pessoa, um
   lançamento recente ou um problema sobre o qual o usuário de fato pensou.
   NUNCA abra com "Venho por meio desta candidatar à vaga de".
3. Parágrafo 2 (~100 palavras): uma história concreta que mapeia a experiência
   do usuário à JD. Resultado específico. Não um recap do currículo.
4. Parágrafo 3 (~50 palavras): feche com um próximo passo claro. Confiança
   sem arrogância. Sem "Adoraria a oportunidade de discutir".
5. Voz: soa como se o usuário tivesse escrito. Levemente informal para
   startups, levemente formal para finanças ou enterprise. Nunca um press
   release. Nunca humblebrag.
6. Sem buzzwords (apaixonado, orientado a resultados, ritmo acelerado,
   dinâmico).
7. Sem framing de "skills transferíveis". Apenas mostre o trabalho.

Saída só a cover letter. Sem comentário.
```

### Formato de entrada

```
[Vaga alvo]
Título, empresa, uma linha sobre o que fazem.

[Gancho específico]
A única coisa sobre esta empresa com a qual você lideraria. Escolha
exatamente uma.
Exemplos:
- "Estou usando o produto de vocês há 18 meses e é a única
  ferramenta nesta categoria que entrega em cadência real."
- "Trabalhei num problema similar de payments na <empresa anterior> e quero
  passar os próximos 4 anos aprofundando nisso."
- "Sigo a escrita do <nome do hiring manager> há anos e o post recente
  do time sobre arquitetura event-driven clarificou algumas
  coisas em que eu estava errado."

[A história mapeada]
Um projeto, duas a três frases de contexto, o resultado.

[Energia da assinatura]
Confiante, disponível, sem pressão.
```

### Exemplo trabalhado

**Entrada:**

```
[Vaga alvo]
Senior Backend Engineer, Payments — Lumenari Co (marketplace de tooling de IA,
~$2M/mês de transações)

[Gancho específico]
"Construí uma stack de payments Stripe Connect + Postgres num marketplace
fazendo volume similar nos últimos três anos, e o post recente do blog
de engenharia de vocês sobre retries idempotentes de webhook é exatamente
a direção arquitetural para a qual venho empurrando meu time."

[A história mapeada]
Na Acme, fui dono do subsistema de payments processando ~$4M/mês. Cortei falhas
de retry de webhook em 78% adicionando idempotency keys + dead-letter queue.
Mentorei dois engenheiros pleno, ambos promovidos a sênior em 18 meses.

[Energia da assinatura]
Disponível para conversar esta semana ou na próxima; feliz em compartilhar
mais detalhe do trabalho de falha de retry se for útil.
```

**Output que a IA retorna:**

```
Maya,

O post de engenharia de vocês sobre retries idempotentes de webhook é exatamente
a direção arquitetural para a qual venho empurrando meu time no
último ano — estou escrevendo porque acho que posso ajudar vocês a entregar
a próxima camada disso.

Nos últimos três anos fui dono de uma stack de payments Stripe + Postgres
na Acme Co, um marketplace fazendo cerca de $4M/mês em transações. O
trabalho do qual mais me orgulho: cortei falhas de retry de webhook em 78%
em seis meses introduzindo idempotency keys e uma dead-letter queue, depois
endureci a rotação on-call o bastante para que o volume de page P1 caísse de
doze por mês para três. No caminho mentorei dois engenheiros pleno;
ambos agora são sêniores. A parte de mentoria é parte do motivo
pelo qual estou olhando — gostaria que a próxima função formalizasse isso.

Estou disponível para conversar esta semana ou na próxima. Feliz em compartilhar
a arquitetura de retry-failure em mais detalhe se for útil antes de uma
conversa.

— Alex
```

O que essa carta faz certo:

- Abre com uma referência específica ao conteúdo de engenharia da empresa. Hiring manager sabe que você de fato leu.
- Parágrafo do corpo nomeia ferramentas, números e resultados — não um recap de currículo.
- Menciona mentoria na voz do usuário ("a parte de mentoria é parte do motivo pelo qual estou olhando") porque a JD pediu explicitamente.
- Fecha com disponibilidade e uma oferta suave (a arquitetura de retry-failure). Sem "Adoraria a oportunidade".

---

## Parte 2 — Reescrita do LinkedIn

Três seções importam, em ordem: headline, seção About e o topo de Experience.

### Headline (máximo 120 caracteres)

O que recrutadores veem em resultados de busca.

**Ruim:**

```
Senior Software Engineer | Construtor Apaixonado | AWS / TypeScript / React
```

**Melhor:**

```
Senior Backend Engineer — payments, Stripe, Postgres | Mentor | Calgary / Remote
```

Regras que o prompt impõe:

1. Lidere com a vaga que você está mirando, não seu título atual se diferem.
2. Três keywords específicas em seguida — ferramentas que você de fato usa, não uma salada de tech-stack.
3. Terceiro segmento opcional: localização ou disponibilidade ("Open to remote NA").
4. Sem buzzwords. Sem "Construtor Apaixonado", "Code Slinger" ou "Entusiasta de Tech".

### Seção About — as três primeiras linhas são tudo

Só os primeiros ~210 caracteres aparecem antes de "...ver mais" cortar. Otimize para esses.

**Prompt:**

```
Escreva a seção About do LinkedIn do usuário. Regras:

1. Primeira frase (~140 caracteres máx): declaração de posição. O que ele
   faz, para quem e um resultado. Esta é a única linha que muitos
   recrutadores leem.
2. As próximas duas frases cabem dentro dos primeiros ~210 caracteres no total.
   Fisgue o leitor para clicar "ver mais".
3. Comprimento total: 4-6 parágrafos curtos, ~150 palavras.
4. Primeira pessoa, conversacional. Soa como se o usuário tivesse escrito,
   não uma pessoa de PR.
5. Termine com uma call to action específica: "DM se estiver contratando para
   X", ou "Escrevo sobre Y em <link>", ou "Aberto a funções de backend
   sêniores no espaço de payments".
```

**Exemplo trabalhado:**

```
Construo infraestrutura de payments para marketplaces. Nos últimos três
anos fui dono de uma stack Stripe + Postgres processando $4M/mês na
Acme Co — webhooks, on-call, mentoria, a coisa toda.

Antes da Acme estive numa startup de fintech onde aprendi a lição
que todo engenheiro de payments aprende do jeito difícil: idempotência não é
opcional, dead-letter queues não são opcionais e o runbook é
lido às 2h da manhã por alguém que não o escreveu.

Me importo com três coisas numa função:
- Problemas difíceis com usuários reais
- Um time onde mentoria corta nos dois sentidos
- A autonomia para entregar sem teatro

Atualmente em Calgary, aberto a funções remotas na América do Norte. DM
se estiver contratando para um senior backend engineer em payments — sou
exigente sobre onde iria, e preferiria ter uma boa
conversa a dez educadas.
```

O que os primeiros 210 caracteres (~3 linhas) mostram:

```
Construo infraestrutura de payments para marketplaces. Nos últimos três
anos fui dono de uma stack Stripe + Postgres processando $4M/mês na
Acme Co — webhooks, on-call, mentoria, a coisa toda.
```

Esse é o gancho. Recrutador vê função, ferramenta, resultado no primeiro parágrafo e sabe se deve ler mais.

### Seção Experience — topo das funções atuais e mais recentes

LinkedIn trunca depois de 2-3 linhas por função a menos que alguém clique em expandir. Então as primeiras duas linhas de cada função são o equivalente ao terço de cima do seu currículo.

**Prompt:**

```
Reescreva os primeiros 2-3 bullets da função atual do usuário no LinkedIn.
Regras:

1. Primeiro bullet: um resumo de uma linha do escopo e impacto nesta função.
2. Segundo bullet: a única realização mais relevante para as
   funções que o usuário está mirando.
3. Terceiro bullet (opcional): uma segunda realização que mostra alcance.
4. Mesmas regras de estilo do currículo: voz ativa, números específicos, sem
   buzzwords, vocabulário alinhado à JD.
5. Saída só o texto formatado para LinkedIn.
```

Output de exemplo trabalhado:

```
Senior Backend Engineer na Acme Co
2022 - Presente · Calgary, AB (Remoto)

→ Dono do subsistema de payments e webhooks (Stripe + Postgres + Kafka)
  para um marketplace fazendo ~$4M/mês em transações.
→ Cortei falhas de retry de webhook em 78% introduzindo idempotency keys
  e uma dead-letter queue; pages P1 caíram 75% em seis meses.
→ Mentorei 2 engenheiros pleno; ambos promovidos a sênior em 18 meses.
```

---

## Como os dois artefatos trabalham juntos

A cover letter e a seção About do LinkedIn não devem ser idênticas, mas devem compartilhar uma voz e uma posição. Se sua cover letter diz que você "é dono de uma stack Stripe num marketplace fazendo $4M/mês", seu About do LinkedIn deve dizer a mesma coisa — fraseada diferente. Recrutadores que leem ambos vão notar se você soa como duas pessoas diferentes.

Rode o prompt de cover letter e o prompt de About do LinkedIn em sequência no mesmo chat. A IA vai manter a voz consistente.

---

## Anti-padrões que o prompt bloqueia

- "Venho por meio desta candidatar à vaga de [função]." — Corte à primeira vista.
- "Estou empolgado com a oportunidade de..." — Corte.
- "Segue em anexo meu currículo." — Eles sabem. Corte.
- "Adoraria a oportunidade de discutir como minhas habilidades..." — Corte.
- "Entusiasta de Tech | Aprendiz Eterno | Viciado em Café" no headline do LinkedIn — Corte.
- "Profissional orientado a resultados, com atenção a detalhes, autônomo, apaixonado por..." — Corte tudo.

Se qualquer um destes escapar, dê este prompt: "Elimine todo clichê deste draft e reescreva em linguagem simples."
