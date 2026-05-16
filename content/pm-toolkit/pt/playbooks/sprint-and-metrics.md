# Playbook de Sprint Planning + Metrics Review

> Matemática de capacidade honesta, metas de sprint que cabem em uma linha, e um formato de metrics review que produz readouts que as pessoas de fato leem.

---

## Parte 1 — Sprint planning

### A matemática de capacidade que ninguém faz honestamente

A maioria dos times planeja em horas nominais, depois fica imaginando por que não bate. A matemática que funciona:

```
Horas nominais = engenheiros × horas/dia × dias no sprint
Subtraia:
  - PTO e feriados (soma ao longo do time)
  - Rotações on-call (10-20% da semana de um engenheiro on-call)
  - Reuniões fixas (~6 horas/semana por engenheiro para times típicos)
  - Spillover / manutenção / não-planejado (10-15% do restante)

O que sobra = capacidade real de trabalho novo
```

Um sprint de 2 semanas com 4 engenheiros a 8 horas/dia parece ter 320 horas nominais. A realidade está mais perto de **140-180 horas** de capacidade real de trabalho novo. Se seu plano de sprint assume 320, você vai levar metade do trabalho para o próximo sprint.

### O prompt

```
Você está planejando um sprint comigo. Regras:

1. Comece com a matemática de capacidade. Vou te dizer tamanho do time, duração
   do sprint e ausências conhecidas. Você vai computar nominal → real
   usando as deduções padrão (on-call 15%, reuniões ~6h/eng/semana,
   spillover 12%).
2. Depois triagem do carryover do sprint anterior. Cada item de carryover:
   manter, largar ou dividir.
3. Depois priorize novo trabalho como P0 (precisa entregar), Stretch (se o tempo
   permitir), Won't-do (corte explícito para este sprint).
4. Meta do sprint em uma frase no topo. Lê limpa para alguém
   que não conhece o time.
5. Saída do plano de sprint como: Meta do Sprint → Capacidade → Carryover →
   P0 → Stretch → Won't-do.
6. Sem cargo cult de story-point. Use horas ou sizing aproximado
   (S/M/L/XL) — o que o time já usa.

Voz: direta, específica. O plano deve ser escaneável em 60 segundos.
```

### Formato de entrada

```
[Time]
Engenheiros: <contagem + nomes se útil>
Designers: <contagem>
Tempo de PM: <fração da semana>

[Sprint]
Duração: 1 semana / 2 semanas
Início: <data>
Fim: <data>

[Ausências conhecidas]
- <Engenheiro X>: fora ter-qua
- <Engenheiro Y>: fora a primeira semana inteira (férias)
- On-call este sprint: <Engenheiro Z>

[Carryover do último sprint]
- <Item>: status (50% completo / bloqueado / não começou)

[Trabalho candidato para este sprint]
- <Item>: sizing aproximado se você tem
- <Item>: ...
```

### Exemplo trabalhado

**Entrada:**

```
[Time]
4 engenheiros (Alex, Beth, Carmen, Dev)
1 designer (Eli) — 50% neste time neste sprint
PM: eu, ~30% capacidade

[Sprint]
2 semanas, 19 - 30 de maio de 2026

[Ausências conhecidas]
- Dev: fora ter-qua da semana 1 (3 dias off)
- Beth: fora semana 2 (semana inteira de férias)
- On-call: Carmen o sprint inteiro

[Carryover do último sprint]
- Polimento de UI do Saved Searches v1 (~70% pronto, bloqueado em design review)
- Dashboard de observabilidade de retry de webhook (~50% pronto, despriorizado
  quando trabalho de retry-failure entregou)

[Trabalho candidato para este sprint]
- Launch do Saved Searches v1 (polimento de UI + beta rollout)
- Backend de team-shared saves (spike de integração com RBAC)
- Onboarding first-run v2 (fixes de edge case — 3 bugs específicos)
- Mobile-web para view "Audit Log"
- Exploração de UX de customer-shared saves (só exploração de design)
```

**Output:**

```
**Meta do Sprint:** Entregar Saved Searches v1 para cohort beta até 30 de maio.
Desbloquear kickoff de Team-shared saves para o próximo sprint.

**Capacidade**
- Nominal: 4 engenheiros × 8h × 10 dias = 320h
- Beth fora semana 2: −40h
- Dev fora 3 dias: −24h
- Carmen on-call (15% ao longo do sprint): −12h
- Reuniões (6h/sem × 4 eng × 2 sem): −48h
- Spillover/manutenção (12%): −24h
- **Capacidade real de trabalho novo: ~172h**

**Carryover (decida primeiro)**
- Polimento de UI do Saved Searches v1 (~70% pronto) → MANTER. Design review
  agendado 20 de maio. P0 para este sprint.
- Dashboard de observabilidade de retry de webhook → LARGAR. Trabalho original de
  retry-failure entregou; dashboard não é mais alta prioridade. Mover para Later
  no roadmap.

**P0 (comprometido — cabe em ~140h)**
- Polimento de UI do Saved Searches v1 + beta rollout (Alex, ~40h)
- Spike de integração com RBAC de Team-shared saves (Beth antes das férias,
  Carmen continua, ~50h)
- Fixes de edge case do onboarding first-run v2 — 3 bugs específicos
  (Dev, ~30h)
- View Audit Log mobile-web (Carmen entre trabalho on-call, ~20h)

**Stretch (~30h de folga se P0 terminar cedo)**
- Exploração de UX de customer-shared saves com Eli (design, ~30h)
- Tech-debt: investigação de latência do backend de busca (Alex se disponível)

**Won't-do este sprint (explícito)**
- Trabalho de backend de customer-shared saves (esperando resultado do spike de RBAC)
- API para Saved Searches (Fase 2 — não nos compromissos deste ciclo)
- Dashboard de observabilidade de retry de webhook (despriorizado; ver Carryover)

**Riscos**
- Beth fora na semana 2 significa que conclusão do spike de RBAC depende de Carmen,
  que também está on-call. Se pages disparam, o spike atrasa. Mitigação:
  Beth front-loadeia o spike na semana 1.
- View Audit Log mobile-web depende de um primitivo de layout compartilhado que Alex está
  finalizando durante o polimento do Saved Searches. Observe a passagem.
```

O que este plano faz:

- Meta do sprint em uma frase no topo.
- Matemática de capacidade é explícita e conservadora.
- Carryover é decidido no início (manter / largar / dividir).
- P0 cabe confortavelmente dentro da capacidade real, com folga de stretch.
- Won't-do é explícito, nomeando itens que *seriam* tentadores de pegar.
- Riscos são nomeados com mitigações, não enterrados.

---

## Parte 2 — Metrics review

### Como é o bom

Uma metrics review não é uma parede de números. É um documento de duas páginas que diz:

> "Aqui estão as 3-5 métricas que mais importam. Trend de cada uma, o que achamos que está dirigindo, e o que olharíamos a seguir. A coisa que você deve saber: <uma coisa específica>."

A maioria das metrics reviews falha por tentar cobrir tudo. Escolha as métricas que mais importam para a questão estratégica atual, faça emergir o que se moveu e ignore o ruído.

### O prompt

```
Você está rodando uma metrics review comigo. Regras:

1. Vou te dar 3-7 métricas e seus valores (período atual, período
   anterior, alvo se existe). Você vai produzir um readout, uma
   métrica por vez.

2. Para cada métrica, escreva:
   - Trend: up / down / flat, com magnitude (ex.: "up 12%")
   - Comparado a: período anterior, alvo ou ambos
   - Hipótese: 1-2 frases. O que você acha que está dirigindo. Se você
     não tem info suficiente para hipotetizar, diga honestamente.
   - Follow-up: o que eu ia querer checar a seguir (um slice dos dados, uma
     call com cliente, uma correlação com launch, etc.)

3. Ordene por importância. A métrica que se moveu mais ou que mais importa
   para a estratégia atual vai primeiro.

4. No fim, escreva um "headline" de um parágrafo que resume a
   semana em 3-4 frases. A coisa que o exec que lê isso deveria
   sair sabendo.

5. Enterre o ruído. Se uma métrica não se moveu significativamente e não é
   estrategicamente relevante, agrupe sob "Flat / sem sinal" no
   final.

Voz: direta, calibrada. Linguagem com hedge ("pode", "pode ser") está
ok quando honesta; evite falsa certeza.
```

### Formato de entrada

```
[Período]
Período de relatório: <ex.: semana de 6-12 de maio de 2026>
Comparado a: <datas do período anterior>

[Contexto estratégico]
O que estamos prestando atenção este trimestre (ex.: "meta de ativação +10pp",
"ciclo de renovação Q2", "launch de Saved Searches em meados do mês")

[Métricas]
Para cada métrica:
- Nome
- Valor atual
- Valor anterior
- Alvo (opcional)
- Qualquer contexto que você ia querer (um launch esta semana, uma anomalia
  conhecida, etc.)
```

### Exemplo trabalhado

**Entrada:**

```
[Período]
Semana de 6 - 12 de maio de 2026
Comparado a: Semana de 29 de abril - 5 de maio

[Contexto estratégico]
Meta do Q2 é ativação +10pp. Estamos em +6pp YTD; precisamos +4pp até fim do Q2.
Saved Searches v1 está agendado para 30 de maio.

[Métricas]
- WAU: 8.420 → 8.510 (+1,1%), sem alvo
- Taxa de ativação: 41% → 39% (-2pp), alvo 47%
- Falhas de retry de webhook: 0,8% → 0,3% (-0,5pp), alvo <1%
- Volume de support ticket: 142 → 168 (+18%), sem alvo
- Novos clientes pagos: 12 → 14 (+2), alvo 15/sem
- Share de sessão mobile-web: 18% → 21% (+3pp), sem alvo
- Tickets "perdi minha view": 6 → 8 (+2), alvo informal zero até julho
```

**Output:**

```
**Headline:** Ativação caiu 2pp esta semana, o primeiro declínio em
sete semanas — o novo fluxo first-run pode estar girando demais nos
edge cases que patchamos no último sprint, e devíamos cavar no
funil antes do próximo experimento. Falhas de retry de webhook agora estão
solidamente abaixo do alvo. Launch de Saved Searches no caminho, mas tickets "perdi
minha view" subiram — lembrando que o launch é em 18 dias.

---

**Taxa de ativação** — DOWN 2pp (41% → 39%, alvo 47%)
- Comparado a: semana anterior e tendência YTD (este é o primeiro declínio
  desde a semana de 17 de março).
- Hipótese: A revisão do fluxo first-run que entregou 30 de abril trocou
  velocidade por cobertura — adicionamos dois passos de onboarding para lidar com edge
  cases. Suspeito que desaceleramos a mediana de tempo-até-ativação o bastante para
  cair a taxa. Precisa olhar o funil por passo.
- Follow-up: puxar o funil de novos usuários desta semana vs. da passada; comparar
  drop-off por passo. Decidir até sexta se reverter o passo 4 ou
  iterar.

**Volume de support ticket** — UP 18% (142 → 168)
- Comparado a: semana anterior. Sem alvo baseline.
- Hipótese: Aumento concentrado na categoria "Saved Views" —
  6 → 8 — e em tickets relacionados ao onboarding (suspeito relacionado ao
  drop de ativação acima). Não é regressão de qualidade; uso mudando.
- Follow-up: Tagueie os tickets desta semana por categoria. Se onboarding for
  >40% do aumento, é a mesma causa raiz do drop
  de ativação.

**Falhas de retry de webhook** — DOWN 0,5pp (0,8% → 0,3%, alvo <1%)
- Comparado a: semana anterior e alvo.
- Hipótese: Trabalho de Idempotência + DLQ que entregou 2 semanas atrás está totalmente
  em efeito agora. Drop sustentado, não fluke de uma semana.
- Follow-up: Marcar como resolvido; remover de métricas semanais, monitorar
  mensalmente daqui pra frente.

**Novos clientes pagos** — UP 2 (12 → 14, alvo 15/sem)
- Comparado a: semana anterior e alvo semanal.
- Hipótese: Perto do alvo; nada gritando.
- Follow-up: Nenhum esta semana. Observe o acumulado do Q2.

**Share de sessão mobile-web** — UP 3pp (18% → 21%)
- Comparado a: semana anterior. Sem alvo formal.
- Hipótese: Launch de paridade mobile-web para os top-3 fluxos está
  dirigindo alta sustentada. Três das últimas quatro semanas mostraram
  crescimento.
- Follow-up: Puxar o breakdown por classe de device para a review da próxima semana;
  vale confirmar que isto é uso incremental, não canibalização
  de sessões desktop.

**Flat / sem sinal**
- WAU: +1,1%, dentro da variância semanal normal. Sem ação.
- Tickets "perdi minha view": 6 → 8. Abaixo do threshold de ruído para
  análise semanal; revisitar após launch de Saved Searches.
```

O que este readout faz:

- Headline em 3-4 frases dá ao exec o takeaway sem rolar.
- Métricas ordenadas por importância, não alfabeto.
- Cada métrica tem uma hipótese real, não "vamos continuar monitorando".
- Follow-ups são ações específicas, não intenções vagas.
- A métrica que foi resolvida (falhas de retry de webhook) é promovida para fora da lista semanal.
- Ruído é enterrado sob "Flat / sem sinal" para que o readout fique escaneável.

---

## Como sprint e metrics trabalham juntos

A metrics review deve dirigir o próximo plano de sprint. Se ativação caiu 2pp esta semana e a hipótese aponta para o fluxo first-run, essa investigação de funil pertence ao P0 do próximo sprint, não em algum lugar do backlog.

Workflow:

1. Rode a metrics review na sexta ou segunda de manhã.
2. Identifique as 1-2 métricas que te surpreenderam (positiva ou negativamente).
3. Converta cada surpresa em um follow-up: uma puxada de dados, uma call com cliente ou um experimento.
4. Os follow-ups vão para sprint planning como itens P0 se forem load-bearing para a meta estratégica.

O trabalho do PM é manter o loop apertado: métricas → hipótese → experimento → métricas. Planos de sprint que não refletem o sinal da semana passada são como times derivam.
