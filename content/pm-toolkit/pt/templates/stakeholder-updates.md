# Templates de Update de Stakeholder

> Três sabores, mesmo esqueleto: brief executivo, detalhe de engenharia, customer-facing. Mesma semana de trabalho comprimida para três audiências diferentes.

---

## O esqueleto (todos os três sabores compartilham)

1. **Status** — uma palavra (Verde / Amarelo / Vermelho) mais uma frase
2. **O que entregou** — outcomes, não features
3. **O que vem a seguir** — itens comprometidos para o próximo ciclo
4. **Em risco** — honesto sobre o que pode atrasar
5. **O pedido** — uma coisa específica que você precisa desta audiência

As diferenças entre sabores são:

- **Comprimento:** 200 / 400 / 150 palavras
- **Vocabulário:** jargão interno ok em executivo e eng; nunca em customer-facing
- **Profundidade em blockers:** executivo recebe o headline; eng recebe os detalhes; customer-facing geralmente omite
- **O pedido:** executivo pede decisão/headcount/apresentação; eng pede priorização ou desbloqueio; cliente pede feedback ou participação em beta

---

## Sabor 1 — Brief executivo (~200 palavras)

### O prompt

```
Você está escrevendo um update executivo de stakeholder. Regras:

1. ~200 palavras. Cap rígido: 250.
2. Lidere com status como uma única palavra: Verde / Amarelo / Vermelho. Depois uma
   frase sobre por quê.
3. "O que entregou" são outcomes, não features. "Cortei tickets 'perdi minha view'
   47% em 30 dias" não "Entreguei Saved Searches v1".
4. "Em risco" é honesto. Se algo pode atrasar, diga e por quê.
5. Termine com um pedido específico. "Preciso de uma decisão sobre X até Y." Não "me
   avise se tiver perguntas".
6. Sem "Espero que este e-mail te encontre bem". Sem "circling back".
7. Voz: direta, calma, específica. Números quando você tem.

Saída só o update.
```

### Exemplo trabalhado

```
**Status: Amarelo** — Launch de Saved Searches no caminho para 30 de maio;
trabalho de onboarding atrasando ~2 semanas devido à descoberta de edge cases.

**O que entregou neste período**
- Cortei falhas de retry de webhook em 78% (fechou categoria de incidente P1
  de longa data)
- Paridade mobile-web para os top-3 fluxos do dashboard
- Ativação +3pp do novo experimento de tooltip de first-touch

**O que vem a seguir (próximas 2 semanas)**
- Saved Searches v1 → entrega 30 de maio, beta com 4 clientes primeiro
- Revisão de onboarding v2 → ajustada para refletir novos edge cases
- Team-shared saves → kickoff 28 de maio (comprometido na renovação
  do <Cliente X>)

**Em risco**
- Meta de conclusão de onboarding (+10pp) — empurrada de Q2 para início de Q3
  devido a edge cases de first-run. Mitigação: entregar a v2 com os
  edges de maior impacto; resto no Q3.
- Paridade mobile-web para os 2 fluxos restantes atrasa para Q4 a menos que
  reponhamos o assento de engenharia que perdemos.

**Pedido**
Preciso de uma decisão até sexta sobre se repor o assento aberto de engenharia
ou aceitar o atraso de mobile-web para Q4. Ambos os caminhos funcionam; preferiria
não levar a ambiguidade para o planejamento do time semana que vem.
```

Note o que está acontecendo:

- Status é Amarelo, não Verde. O PM está sendo honesto.
- "O que entregou" são três linhas, cada uma um outcome com um número.
- "Em risco" são riscos reais com mitigações, não boilerplate.
- O pedido é específico — uma decisão, até uma data, com as opções enquadradas.

Cerca de 200 palavras. Um exec consegue escanear em 45 segundos.

---

## Sabor 2 — Detalhe de engenharia (~400 palavras)

### O prompt

```
Você está escrevendo um update de stakeholder para time de engenharia. Regras:

1. ~400 palavras. Cap rígido: 500.
2. Mesmo esqueleto do brief executivo, mas inclua:
   - Blockers (técnicos ou organizacionais), com caminhos propostos
   - Dependências em outros times
   - Decisões que o time está pedindo, com opções + recomendação
3. Vocabulário técnico está ok. Não simplifique para engenharia.
4. Mesma disciplina "lidere com status". Amarelo é Amarelo.
5. Termine com o pedido. Relevante para engenharia: uma decisão de priorização, um
   desbloqueio, uma decisão de tradeoff.

Saída só o update.
```

### Exemplo trabalhado

```
**Status: Amarelo** — Saved Searches no caminho para 30 de maio; trabalho de onboarding
atrasando ~2 semanas; uma dependência cross-team em risco.

**Entregou neste período (outcomes + como)**
- Falhas de retry de webhook cortadas 78%: introduzi idempotency keys +
  dead-letter queue. Suporte da Stripe confirmou que o padrão alinha com
  a recomendação deles. Volume de page P1 12/mês → 3/mês.
- Paridade mobile-web para top-3 fluxos: refatorei o primitivo de layout
  do dashboard para usar CSS Grid; resolveu o bug de breakpoint de tablet
  de longa data como efeito colateral.
- Ativação +3pp: teste A/B no tooltip de first-touch fechou com 95% de confiança.
  Variante B (contextual em vez de saudação) venceu.

**Construindo agora**
- Saved Searches v1 — backend completo; UI 80%. Padrão de storage Filter-JSON
  validado contra os 12 shapes de query mais usados. Cohort beta
  selecionado: 4 clientes, todos power users, opt-in.
- Revisão de onboarding v2 — escopo ajustado para entregar os edges de maior
  impacto primeiro. Três edge cases restantes para Q3.

**Blockers e dependências**
- Kickoff de Team-shared saves é contingente ao time de Permissões
  entregar o novo primitivo RBAC (ETA: 25 de maio). Acompanhando semanalmente.
  Fallback: entregar Team-shared saves com modelo de compartilhamento all-or-nothing
  mais simples, refatorar para fine-grained quando RBAC chegar.
- Latência de backend de busca em p95 subiu 18% ao longo do Q1 — não
  impactando usuário ainda, mas tendência. Propondo uma semana-engenheiro para
  investigar antes de virar fogo no Q3.

**Decisões necessárias**
1. Repor o assento aberto de engenharia no Q2, ou aceitar o atraso de mobile-web
   para Q4? Recomendação: repor. Mobile-web está em 2 de 4
   pedidos de renovação top-cliente para H2.
2. Team-shared saves com fallback de compartilhamento all-or-nothing se RBAC
   atrasar? Recomendação: sim. Compromisso com cliente é para Q3, e o
   custo de refactor é ~3 dias quando RBAC chegar.

**Pedido**
Preciso das duas decisões acima até sexta. Ambas moldam o plano do próximo sprint.
```

O que é diferente do brief executivo:

- Inclui como o trabalho entregou, não só o outcome.
- Faz emergir uma tendência de latência que ainda não está impactando o usuário — sinal de engenharia, não sinal executivo.
- Enquadra decisões com opções e uma recomendação, não como perguntas abertas.
- O pedido nomeia decisões específicas e uma data.

---

## Sabor 3 — Customer-facing (~150 palavras)

### O prompt

```
Você está escrevendo um update voltado a cliente. Regras:

1. ~150 palavras. Cap rígido: 200.
2. Linguagem simples. Sem jargão interno. Sem callouts de métrica que não
   importam ao cliente.
3. Lidere com o que o cliente pode usar agora (a coisa que entregou).
4. "O que vem a seguir" com granularidade de mês no máximo. Sem compromissos com
   datas exatas.
5. Um canal para feedback. Fácil de usar.
6. Sem cores de status. Sem linguagem "em risco". Se algo importa ao
   cliente, enquadre positivamente ou omita.
7. Voz: calorosa mas não babando. Confiante mas não empurrada.

Saída só o update.
```

### Exemplo trabalhado

```
Oi pessoal,

Um aviso rápido sobre o que há de novo no dashboard este mês e o que vem
a seguir.

**O que você pode usar agora**
- O botão "Save this view" está no ar no dashboard para power users.
  Salve suas views filtradas, nomeie e elas vão sempre restaurar
  exatamente — mesmo se nossa estrutura de URL mudar embaixo. Até 50
  por usuário.
- Mobile-web agora está utilizável para os três fluxos que você usa mais:
  dashboards, alerts e audit log. Os dois fluxos restantes estão
  chegando neste outono.

**Vindo a seguir**
- Saved views compartilhadas com o time — compartilhe uma view filtrada com seu time.
  Mirando julho.
- Experiência melhorada de first-run para novos colegas que você faz onboarding. Fim
  de junho.

**Um pedido pequeno**
Se você experimentar Saved Views e achar algo faltando ou estranho, responda
este e-mail. Eu leio todo um pessoalmente e isso molda o que
construímos a seguir.

— Alex
```

O que é diferente:

- Sem cor de status, sem framing "em risco".
- "Até 50 por usuário" faz emergir um limite real, mas em linguagem de cliente.
- "Vindo a seguir" usa meses, não trimestres ou datas específicas.
- O pedido é direto e fácil (responda este e-mail).

---

## Como usar todos os três num workflow

Na maioria das semanas, você escreve o update de detalhe de engenharia primeiro porque é onde a matéria-prima vive — seu sprint planning, seus blockers, as decisões do seu time. Depois você comprime.

Workflow:

1. Escreva o update de detalhe de engenharia (~400 palavras).
2. Rode pela IA: "Comprima para 200 palavras para um brief executivo. Mantenha um pedido específico. Largue vocabulário técnico."
3. Rode pela IA de novo: "Reescreva para nossos clientes em 150 palavras. Linguagem simples. Largue blockers internos. Enquadre em torno do que eles podem usar agora."

Tempo total: 30 minutos para todas as três versões. Os passes de compressão pegam over-claiming — se a versão executiva não consegue dizer "entregou X" sem hedge, a versão de engenharia provavelmente exagerou também.

---

## Anti-padrões que o prompt bloqueia

- "Espero que este e-mail te encontre bem." — Corte.
- "Só queria fazer um circling back sobre..." — Corte.
- "Como mencionei no meu último e-mail..." — Corte.
- "Continuamos progredindo em..." — Vago. Substitua por um outcome e um número.
- "As coisas estão indo bem!" — Status é uma cor, não um sentimento. Escolha uma.
- "Me avise se tiver alguma pergunta." — Não é um pedido. Diga o pedido real.
- "Animado para compartilhar..." — O exec não precisa saber como você se sente sobre isso. Vá à substância.

Se qualquer destes escapar, dê este prompt: "Elimine toda frase de enchimento e reescreva com status, outcomes e o pedido."
