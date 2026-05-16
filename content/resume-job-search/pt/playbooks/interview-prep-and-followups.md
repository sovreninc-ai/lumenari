# Prep de Entrevista + Follow-Ups

> Prep de entrevista STAR / comportamental / técnica, mais os três e-mails de follow-up que toda busca de emprego precisa: agradecimento, pós-rejeição e ghost-recovery.

---

## Parte 1 — Prep de entrevista comportamental (STAR)

### Como STAR de fato funciona na prática

A maioria das pessoas erra STAR gastando 80% da resposta em Situation e Task. O entrevistador não se importa com o setup. Ele se importa com o que *você* fez e o que aconteceu.

Razão correta:

- **Situation (10%)**: Uma frase. "Na Acme, estávamos vendo falhas de retry de webhook em cerca de 12% de todos os eventos."
- **Task (10%)**: Uma frase. "Eu era o engenheiro on-call naquele trimestre e as falhas me acordavam duas noites por semana."
- **Action (60%)**: Passos específicos que *você* tomou. Primeira pessoa "eu", não "nós". Esta é a carne.
- **Result (20%)**: Números se você tiver. O resultado — para o time, o cliente, o negócio.

Se você diz "nós" mais de duas vezes, o entrevistador não sabe o que você fez. Use "eu". Quando o trabalho era genuinamente colaborativo, diga "eu liderei" ou "eu fui dono da parte X enquanto dois engenheiros lidavam com Y".

### O prompt de prep

```
Você está me ajudando a preparar respostas de entrevista comportamental
em formato STAR. Vou te dar uma pergunta e a história aproximada que quero
contar. Você vai produzir uma resposta STAR enxuta em ~200 palavras.

Regras:
1. Situation: máximo 1 frase.
2. Task: máximo 1 frase.
3. Action: 60% da resposta. Primeira pessoa "eu". Se o trabalho foi
   colaborativo, nomeie o que eu especificamente fui dono vs. o que outros fizeram.
4. Result: termine com um número ou um resultado concreto. Se eu não tenho
   um número, me pergunte antes de inventar um.
5. ~200 palavras. Lê limpo em voz alta em 90-120 segundos.
6. Sem buzzwords (apaixonado, orientado a resultados, dinâmico). Sem enchimento.

Depois de produzir a resposta, me faça uma pergunta de follow-up que o
entrevistador é mais provável de fazer. Sugira uma cauda breve à minha resposta
que a aborde preemptivamente se útil.
```

### As 6-8 histórias que você deve ter prontas

Antes de qualquer onsite, prepare 6-8 histórias que pode flexionar em perguntas diferentes. A maioria das perguntas comportamentais são variações destes temas:

1. Uma vez que você liderou algo
2. Uma vez que você discordou de um par ou manager
3. Uma vez que você falhou
4. Uma vez que você teve que aprender rápido
5. Uma vez que você fez um tradeoff difícil
6. Uma vez que você mentorou ou desenvolveu alguém
7. Uma vez que você entregou sob pressão
8. Uma vez que você empurrou de volta com um stakeholder

Para cada uma, escreva 3-4 frases de contexto mais o resultado. Você não está decorando scripts — está preparando a matéria-prima para que a IA possa moldar na resposta certa no momento.

### Exemplo trabalhado

**Pergunta:** "Me conte uma vez que você discordou do seu manager."

**Entrada bruta do usuário para a IA:**

```
Na Acme, meu manager queria entregar a nova feature de payments em 4 semanas
sem feature flag porque o cliente estava esperando. Achei
que era uma má decisão — nunca tínhamos entregue payments sem flag e
o cliente não notaria uma semana a mais. Empurrei de volta, acabei
adicionando a flag e fazendo rollout em 2 semanas. Pegamos
um bug na semana 1 que teria custado ~$80k se tivéssemos enviado a 100%.
```

**Resposta STAR que a IA produz:**

```
Na Acme, meu manager empurrou para entregar uma nova feature de payments em quatro
semanas sem feature flag porque um cliente-chave estava esperando.

Eu fui dono do deploy e discordei — nunca tínhamos entregue uma mudança
de payments sem flag, e eu não achava que o cliente fosse sentir
uma semana a mais.

Puxei o runbook e escrevi o risco: qualquer bug em rollout de 100%
atinge todo cliente, e nosso incidente médio de impacto-de-receita em
payments era em torno de $80k. Propus colocar a flag e fazer
rollout de 5% para 25% para 100% em duas semanas. Meu manager empurrou de volta duas vezes
em pressão de timeline, mas mantive a linha na arquitetura e
ofereci eu mesmo fazer a call com o cliente para explicar o plano de rollout.
Adicionamos a flag.

Na semana um a 25%, pegamos um bug de retry de webhook que teria
disparado cobranças duplicadas em rollout total. Custo estimado evitado:
cerca de $80k. Cliente recebeu a feature na data original porque
planejamos o rollout em paralelo com a build. Meu manager e
eu passamos a default-flag em todo deploy de payments depois disso.

(Follow-up provável: "Como você lidou com o pushback do seu manager?" —
Eu adicionaria uma frase: perguntei o que ele estava otimizando, concordamos
explicitamente com o cliente, depois fiz o caso arquitetural por escrito
para que pudéssemos discordar com base em dados em vez de opinião.)
```

São 220 palavras, lê em cerca de 100 segundos e mostra julgamento, ownership, comunicação e resultado. A sugestão de follow-up é o bônus — a IA sinaliza onde o entrevistador é provável de cavar e te dá uma resposta pré-construída.

---

## Parte 2 — Prep de entrevista técnica

### No que a IA é boa

- Pattern-matching em problemas de algoritmo e explicar o formato da solução.
- Caminhar por problemas de system design com o rubric padrão (requisitos funcionais, não-funcionais, API, modelo de dados, escala, gargalos, tradeoffs).
- Mock-interviewing você em perguntas de debugging ou code-reading.
- Gerar follow-ups "o que você faria se" para que você não seja surpreendido na sala.

### No que a IA é ruim

- Substituir prática real. Você tem que escrever código ou desenhar no whiteboard. Ler a solução da IA não é o mesmo que produzir sob pressão.
- Prever o que *seu* entrevistador vai perguntar. A IA pode simular a média; a sala real será sua própria coisa.

### Padrões úteis de prompt

**Para system design:**

```
Tenho uma entrevista de system design amanhã na <empresa>. A função é
<senior backend>. Me conte como você estruturaria 45 minutos
neste problema: "Desenhe um sistema de entrega de webhook para uma plataforma
tipo Stripe".

Depois me faça 3 perguntas sobre as escolhas de design pelas quais eu deveria
estar preparado para defender.
```

**Para algoritmos:**

```
Estou enferrujado em programação dinâmica. Me dê 3 problemas de DP
de dificuldade média com uma dica de uma linha para cada. Não me mostre as
soluções ainda. Vou tentar e voltar.
```

**Para mock interviews:**

```
Você é um engenheiro sênior me entrevistando para uma função de backend. Me faça
uma pergunta de debugging. Depois da minha resposta, faça follow-ups como o
entrevistador faria. Não me ajude — empurre. Me diga ao final como
minha resposta teria pousado.
```

---

## Parte 3 — Os três e-mails de follow-up

### E-mail 1 — Agradecimento pós-entrevista (envie dentro de 24 horas)

**Prompt:**

```
Escreva um e-mail de agradecimento de 100-130 palavras depois de uma entrevista
de emprego. Regras:

1. Referencie uma coisa específica que o entrevistador disse. Não um
   "obrigado pelo tempo" genérico.
2. Brevemente reforce uma coisa sobre meu encaixe — escolha o sinal mais forte
   da conversa.
3. Abra a porta para perguntas de follow-up. Não implore pela vaga.
4. Despedida é profissional, não ansiosa.
5. Subject line: "Obrigado — <meu nome> / <função>"

Vou te dar: o nome do entrevistador, a função, uma coisa específica que
ele disse e uma coisa que quero reforçar.
```

**Exemplo trabalhado:**

```
Subject: Obrigado — Alex / Senior Backend Engineer

Maya,

Obrigado pela conversa hoje. O pedaço sobre como você está pensando
em ordenação de webhook quando retries chegam fora de sequência ficou
comigo — esse é um problema no qual gastei mais tempo do que provavelmente
saudável, e parece que você está abordando do mesmo jeito que
fizemos na Acme.

Se ajudar o time, fico feliz em caminhar pela árvore de decisão específica
de ordenação de retry que escrevi ano passado — é o tipo de
coisa mais fácil de compartilhar ao vivo do que digitar. De qualquer forma, feliz que
conseguimos conversar. Espero que o resto do loop corra bem.

— Alex
```

Mande um para todo entrevistador para o qual você tem um e-mail, individualizado por pessoa. Reusar o mesmo e-mail palavra por palavra está ok se a única coisa que muda é a referência específica — mas a referência específica precisa mudar.

### E-mail 2 — Pós-rejeição (envie dentro de 48 horas do não)

Este importa. A maioria das pessoas não envia. As que enviam recebem apresentações calorosas e follow-ups "adoraríamos ter você em mente" meses depois quando a vaga certa abre.

**Prompt:**

```
Escreva uma resposta graciosa de 80-100 palavras a uma rejeição de emprego.
Regras:

1. Agradeça pelo tempo e a decisão. Sem amargura.
2. Reconheça o resultado sem rehash da entrevista.
3. Deixe a porta aberta: peça para manter contato, mencione que estaria aberto
   à função certa no futuro.
4. Opcional: peça por uma única peça de feedback. Seja direto ("se você tem
   cinco minutos para um pedaço específico de feedback") — pedidos vagos
   ("qualquer feedback seria apreciado") recebem respostas vagas.
```

**Exemplo trabalhado:**

```
Maya,

Obrigado por me avisar, e pelo tempo do time neste loop.
As conversas foram genuinamente algumas das melhores que tive
nesta busca — agradeço a honestidade sobre onde vocês pousaram.

Se uma função de senior backend em payments abrir mais tarde este ano, eu
gostaria de estar na sua lista. E se você tem cinco minutos para um
pedaço específico de feedback sobre o que pendeu para o outro lado, eu
acharia útil.

Atenciosamente,
Alex
```

O pedido por um-pedaço-específico-de-feedback é respondido em cerca de 40% das vezes quando fraseado assim. "Qualquer feedback" genérico é respondido em 5%.

### E-mail 3 — Ghost recovery (quando você não ouviu nada por 14 dias)

Dois estágios. Dia 7 é um ping leve. Dia 14 é um follow-up real.

**Dia 7 (ping leve):**

```
Maya,

Quis dar uma olhada na função de senior backend que conversamos em
[data]. Feliz em compartilhar qualquer outra coisa que ajude.

— Alex
```

É isso. Três linhas. Não adicione enchimento.

**Dia 14 (follow-up real):**

```
Subject: Follow-up rápido — Senior Backend / Lumenari

Maya,

Fazendo follow-up sobre nossa conversa sobre a função de senior backend em
[data]. Sei que loops desaceleram por todo tipo de razão que não tem
nada a ver com o candidato, então sem pressão de qualquer forma — só
checando se a função ainda está aberta e onde estou.

Se o timing mudou no seu lado, preferia saber a não. E se
a resposta é não, está ok também; agradeceria o fechamento para
planejar minha busca.

— Alex
```

Se você não tem retorno dentro de uma semana do e-mail do dia 14, marque como perdida e siga em frente. Não mande um terceiro follow-up. O sinal é claro o bastante.

---

## Acompanhar a busca

Um tracker simples vence elaborados. Cinco colunas:

| Empresa | Função | Aplicada | Estágio | Último contato |
|---------|--------|----------|---------|----------------|
| Lumenari Co | Sr Backend Eng | 2026-05-01 | Onsite agendado | 2026-05-12 |
| Beta Co | Staff Eng | 2026-05-03 | Recruiter screen | 2026-05-08 |
| Gamma Co | Sr Backend Eng | 2026-04-25 | Ghosted (dia 14 enviado) | 2026-05-09 |

Atualize depois de toda interação. Sem isso, a semana seis da busca vira uma neblina.

---

## O que este playbook não vai fazer

- Memorizar um script para você. Pratique as respostas em voz alta. A IA pode moldar as palavras; sua boca tem que conhecê-las.
- Te dizer se aceitar a oferta. Isso é uma pergunta de valores. Faça uma lista do que importa e pondere. A IA pode te ajudar a fazer a lista; não pode tomar a decisão.
- Cobrir negociação de remuneração. Esse é um playbook separado e a ferramenta errada aqui seria cara. Por enquanto: nunca aceite na call, leve 24-48 horas, contra-ofereça com um único pedido ancorado em dados de mercado.
```
