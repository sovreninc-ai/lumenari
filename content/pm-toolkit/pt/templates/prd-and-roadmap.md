# Templates de PRD + Roadmap

> A forma de PRD que você vai usar 80% das vezes, mais o drafter de roadmap Now/Next/Later que transforma um backlog bagunçado em buckets priorizados.

---

## Parte 1 — O PRD

### A forma

```
# PRD — <Nome da feature> (v0.x, <autor>, <data>)

## Problem
O que está quebrado, para quem, em linguagem simples. Cite um usuário se puder.

## Goal
O único outcome para o qual este trabalho serve. Uma frase.

## Non-goals
Lista explícita do que isto NÃO está fazendo. Razão por item ("Fase 2",
"workstream separado", "não vai mover a métrica que importa").

## Success metrics
Como saberemos que funcionou. Números-alvo. Janelas de tempo.

## Acceptance criteria
Como é "pronto". Em bullets, testável.

## Scope
**Dentro:** o slice que estamos construindo
**Fora:** cortes explícitos
**Stretch:** se houver tempo

## Open questions
O que você ainda não sabe. Cada uma tem deadline ou owner.
```

É isso. Sem declaração de missão. Sem seção de análise competitiva a menos que seja de fato load-bearing. Sem enchimento de "user persona" se o time já conhece o usuário.

### O prompt

```
Você está fazendo draft de um PRD. Regras:

1. Comprimento do doc combina com tamanho da feature. Uma feature de 2 dias
   recebe um PRD de 1 página. Uma iniciativa de 2 trimestres recebe 3-5 páginas.
   Sem PRDs de 12 páginas para trabalho pequeno.
2. Use a forma acima, em ordem: Problem → Goal → Non-goals → Success
   metrics → Acceptance criteria → Scope → Open questions.
3. A seção Non-goals é obrigatória e faz trabalho real. Cada entrada tem
   uma razão de uma linha. Se um Non-goal é na verdade uma decisão de Fase 2,
   linke à seção Open Questions.
4. Success metrics têm números e janelas de tempo. "Adoção aumenta"
   não é uma métrica. "25% de WAU criam uma saved search em 60 dias"
   é.
5. Acceptance criteria são em bullets, testáveis, escritos para que um engenheiro
   possa usá-los como definition of done.
6. Scope tem Dentro / Fora / Stretch. A lista Fora antecipa
   perguntas "mas e quanto a".
7. Open questions nomeiam o decisor ou o deadline. "TBD" não basta.
8. Voz: direta, específica, levemente cansada. Sem "alavancar", "destravar",
   "double down", "transformar". Sem "Espero que isto te encontre bem".

Saída só o PRD. Sem comentário a menos que eu peça.
```

### Formato de entrada

```
[O trabalho]
Feature: <nome>
Usuário alvo: <quem> (específico — função, tamanho do cliente, segmento)

[Status / contexto]
Estágio: ideia / esboçado / construindo / entregando
Sinal: research / tickets / push executivo / tendência de métrica / competitivo
Audiência do PRD: eng / liderança / vendas

[Matéria-prima]
Bullets, thread do Slack, notas de reunião, PRD anterior. Sem formato está ok.

[Restrições]
- Comprimento do doc
- Tom
- Decisões já tomadas (não relitigue)
- Decisões explicitamente AINDA NÃO tomadas (sinalize como open questions)
```

---

### Exemplo trabalhado — PRD de "Saved searches"

**Entrada:**

```
[O trabalho]
Feature: Saved Searches no nosso dashboard SaaS
Usuário alvo: Power users — funções de ops e analytics nos nossos clientes,
tipicamente times de 10-50 pessoas usando o dashboard diariamente.

[Status / contexto]
Estágio: esboçado. Ouvido em 6 calls de cliente em 8 semanas, 12 tickets de
suporte na mesma janela. Sem design ainda.
Audiência: engineering lead + 2 IC engineers + design.

[Matéria-prima]
- Clientes querem salvar uma view filtrada e voltar a ela
- Querem nomear
- Querem compartilhar com o time (alguns sim, outros não)
- Querem ser notificados quando resultados mudam (alguns, nem todos)
- Alguns pediram API; a maioria via UI
- Workaround atual: bookmark da URL com query params — frágil,
  quebra quando mudamos estrutura de URL

[Restrições]
- 1-2 páginas
- Tom: scrappy, interno
- Decidido: isto está no dashboard, não numa página separada
- Decidido: saves pessoais primeiro; team-shared é Fase 2
- Aberto: notificações quando resultados mudam — Fase 1 ou 2?
```

**Output (trecho):**

```
# PRD — Saved Searches (v0.5, Alex, 2026-05-14)

## Problem
Power users — funções de ops e analytics nos nossos clientes — rodam as
mesmas queries filtradas várias vezes por semana. Hoje fazem bookmark de URLs,
que quebram quando atualizamos a estrutura de query-param. Ouvimos isto
em 6 calls de cliente e 12 tickets nas últimas 8 semanas.

Citação (Maya, ops lead na <Cliente>): "Reconstruo o mesmo filtro toda
segunda. Desisti de bookmarks porque metade parou de funcionar
após seu último release."

## Goal
Reduzir friction "perdi minha view filtrada" para power users.
Concretamente: deixar um usuário salvar uma view filtrada nomeada, voltar a ela e
(Fase 2) compartilhar.

## Non-goals
- Saved searches compartilhadas com o time → Fase 2. Ver Open Questions.
- Saved searches API-first → Fase 2. A maior parte da demanda é UI.
- Saved searches cross-produto (dashboard + reports) → fora de escopo;
  workstream separado.
- Analytics de saved-search (quais saves são mais usados) → Fase 2.

## Success metrics
- 25% de usuários ativos semanais do dashboard criam pelo menos uma saved
  search dentro de 60 dias do launch
- Categoria de support ticket "perdi minha view" cai 50% na mesma
  janela de 60 dias (baseline: ~24/mês ao longo do Q1 2026)
- Saved searches mediana por power user ativo ≥2 até dia 30

## Acceptance criteria
- Usuário pode salvar a view filtrada atual com uma ação "Save this
  view" de um clique no dashboard
- Saved view é nomeada (default = auto-resumo dos filtros; editável pelo usuário)
- Saved views aparecem numa seção "My saved views" no rail esquerdo
- Reabrir restaura o estado exato do filtro, independente de mudanças de URL
- Saved views são armazenadas como JSON de filtro, não strings de URL
- Até 50 saved views por usuário; acima do limite mostra erro claro

## Scope
**Dentro:** Saves pessoais; só UI; nomeados; restauráveis. Cap de 50/usuário.
**Fora:** Team-shared. API. Notificações. Cross-produto.
**Stretch:** Soft delete + restore para saves deletados acidentalmente.

## Open questions
1. Notificações quando resultados mudam → Fase 1 ou 2?
   Recomendação: Fase 2. Adiciona camada de detecção de mudança que o loop
   core de save/restore não precisa. Decisor: <PM> até 2026-05-21.
2. Limite de storage por usuário — 50 pareceu certo; sem dados reais. Aberto a
   ajustar baseado no feedback de storage da engenharia.
3. Política de migração quando uma coluna de filtro subjacente é renomeada ou
   removida. Decisor: <eng lead> + <PM>, antes do kickoff.
```

O que este PRD faz:

- Cita um usuário real na seção Problem.
- Non-goals faz o levantamento pesado — quatro cortes explícitos, cada um com uma razão.
- Success metrics têm números, baselines e janelas de tempo.
- Acceptance criteria são testáveis.
- A seção "Fora" do Scope antecipa as perguntas "mas e quanto a".
- Open questions têm deciders e deadlines.

São 700 palavras num PRD de 1-2 páginas. Tamanho certo para o trabalho.

---

## Parte 2 — Roadmap Now / Next / Later

### O prompt

```
Você está atualizando um roadmap Now/Next/Later. Regras:

1. Três colunas: Now, Next, Later. Nada mais.
2. Todo item é um outcome (ex.: "Cortar tickets 'perdi minha view' 50%"),
   não um nome de feature. Nome da feature entre parênteses.
3. Cada item tem um Trimestre e uma Confiança (Alta / Média / Baixa).
   Confiança é honesta. Não classifique tudo como Alta.
4. "Now" = comprometido, em andamento.
5. "Next" = comprometido para o próximo ciclo.
6. "Later" = no radar, não comprometido.
7. Se o usuário propõe mover um item de Later para Now sem um
   corte correspondente, empurre de volta: "O que em Now está saindo?"
8. Saída do roadmap como uma tabela markdown. Um parágrafo abaixo
   explicando o que mudou desde o último ciclo.

Voz: direta, específica. Sem "em breve" sem um trimestre. Sem verbos vagos.
```

### Formato de entrada

```
[Roadmap atual]
Cole o Now / Next / Later existente, ou descreva verbalmente.

[O que mudou]
- Novas iniciativas sendo adicionadas
- Iniciativas que entregaram
- Iniciativas atrasando ou sendo despriorizadas
- Contexto estratégico (compromisso com cliente, movimento competitivo,
  mudança de capacidade, etc.)

[Restrições]
- Horizonte de trimestre (1-2 trimestres típico)
- Realidade de capacidade do time (mudanças grandes do ciclo anterior?)
- Audiência (time interno, liderança, voltado a vendas)
```

### Exemplo trabalhado

**Entrada:**

```
[Roadmap atual]
Now:
- Conclusão de onboarding +10pp (fluxo first-run revisado) — Q2 26, Alta
- Cortar tickets "perdi minha view" 50% (Saved Searches v1) — Q2 26, Alta

Next:
- Paridade mobile-web para top 5 fluxos do dashboard — Q3 26, Média
- Retenção de power-user +5pp (Team-shared saves + API) — Q3 26, Média

Later:
- Analytics in-product para admins do lado do cliente — Q4 26, Baixa
- Dashboard de rate-limit de API para engenheiros do cliente — Q4 26, Baixa

[O que mudou]
- Trabalho de onboarding está no caminho mas tendendo Média, não Alta — estamos
  encontrando mais edge cases no fluxo first-run do que esperado.
- Um cliente top-3 comprometeu-se à renovação contingente a Team-shared
  saves entregar no Q3. Temos que mover isso antes.
- Perdemos um engenheiro este trimestre. Capacidade caiu ~20%.

[Restrições]
- Horizonte de 2 trimestres
- Audiência: readout de liderança
```

**Output:**

```
| Bucket | Outcome | Trimestre | Confiança |
|--------|---------|-----------|-----------|
| Now    | Cortar tickets "perdi minha view" 50% (Saved Searches v1) | Q2 26 | Alta |
| Now    | Conclusão de onboarding +10pp (fluxo first-run)           | Q2 26 | Média |
| Next   | Retenção de power-user +5pp (Team-shared saves + API)     | Q3 26 | Média |
| Next   | Paridade mobile-web para top 5 fluxos do dashboard        | Q3 26 | Baixa |
| Later  | Analytics in-product para admins do lado do cliente       | Q4 26 | Baixa |
| Later  | Dashboard de rate-limit de API para engenheiros do cliente | Q4 26 | Baixa |

**O que mudou:** Onboarding moveu de Alta para Média confiança —
fluxo first-run tem mais edge cases do que esperado. Team-shared saves
fica em Next (Q3) mas agora é um compromisso contratual para uma renovação
de cliente top-3, então é a prioridade para o Q3 mesmo ao custo de
paridade mobile-web (agora confiança Baixa dada a perda de capacidade de ~20%
de perder um engenheiro). Recomendo revisitar mobile-web no Q4
a menos que reponhamos.
```

O que este output faz:

- Honesto sobre Confiança. Onboarding caiu para Média por causa de novos edge cases.
- Faz emergir a renovação contingente ao cliente como a razão de priorizar Team-shared saves.
- Aponta o impacto de capacidade e suas consequências claramente.
- Não finge que o time pode absorver a perda sem um tradeoff.

---

## Quando pular o PRD

Nem toda feature precisa de um PRD. Pule quando:

- O trabalho é <2 dias e o time já entende o usuário.
- O trabalho é um bug fix ou um pequeno refactor.
- O trabalho foi discutido completamente num doc de design, e o PRD só resumiria.

Quando pular o PRD mas manter o artefato: escreva um "o que + por que + como saberemos" de 3 bullets. Mesmo trabalho pequeno se beneficia de uma declaração de outcome escrita.
