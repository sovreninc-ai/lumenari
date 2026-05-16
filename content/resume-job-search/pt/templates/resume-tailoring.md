# Prompt de Tailoring de Currículo

> O prompt carro-chefe. Cole seu currículo e a JD; receba um draft customizado que preserva keywords de ATS e faz emergir o que importa para *esta* vaga. Pare de mandar o mesmo currículo para 40 empresas.

---

## O prompt

Cole isto na sua ferramenta de IA, depois preencha os quatro blocos de entrada abaixo.

```
Você é um tailor de currículo. Vou te dar (1) a job description para
a qual estou aplicando, (2) meu currículo atual ou uma seção dele, e
(3) uma ou duas coisas sobre a empresa com as quais me importo
genuinamente. Você vai produzir uma versão customizada das seções
relevantes do currículo.

Regras que você segue:

1. Preserve todo detalhe real que eu te dou — títulos, datas,
   empregadores, ferramentas, métricas. Não invente nada.
2. Combine o vocabulário da JD exatamente onde é verdadeiro. Se a JD
   diz "Postgres", use "Postgres", não "PostgreSQL". Se a JD diz
   "Stripe, Plaid, Twilio" e eu usei Stripe, escreva "Stripe".
3. Uma ideia por bullet. Duas cláusulas no máximo. Voz ativa.
   Pretérito. Verbos fortes (entreguei, cortei, fui dono de, desenhei,
   escalei, mentorei, liderei).
4. Números onde quer que eu os tenha dado. Se um bullet ficaria fino
   sem um número, sinalize com [PRECISA MÉTRICA] em vez de inventar.
5. Corte toda buzzword que não significa nada: rock star, ninja, guru,
   10x, apaixonado, ritmo acelerado, orientado a resultados, atenção
   a detalhes, autônomo, altamente motivado.
6. Corte toda abertura "Responsável por". Substitua por um verbo que
   implique resultado.
7. O terço de cima da página 1 precisa responder: qual vaga, qual
   senioridade, duas vitórias específicas. Se meu draft não responde,
   suba as vitórias.
8. Reordene bullets dentro de cada função para colocar o trabalho
   relevante para a JD primeiro.
9. Se um bullet é irrelevante para esta JD, marque [CONSIDERE CORTAR].
10. Saída só as seções customizadas. Sem comentário a menos que eu peça.
```

---

## Formato de entrada

```
[Vaga alvo]
Título: <ex.: Senior Backend Engineer, Platform>
Empresa: <nome + uma linha sobre o que faz>
Sinal de senioridade da JD: <ex.: "5-8 anos", "nível Staff", "primeira contratação">

[Por que esta]
<Duas frases. Concreto. Um produto que você usou, uma pessoa que
respeita, um problema que resolveu que mapeia para esta vaga.>

[A JD]
<Cole a job description completa, ou no mínimo as seções de
responsabilidades e qualificações exigidas.>

[Meu currículo / seção para customizar]
<Cole seu currículo master, ou a seção/função específica que quer
reescrita.>

[Restrições]
- Comprimento de página: <1 página se <10 anos, 2 páginas se mais>
- Tom: <startup formal / agência amigável / enterprise / etc.>
- Keywords da JD que quero preservar: <liste>
- Coisas que NÃO estou disposto a alegar: <métricas inventadas,
  ferramentas com que não entreguei, datas que não batem, etc.>
```

---

## Exemplo trabalhado

**Entrada:**

```
[Vaga alvo]
Título: Senior Backend Engineer, Payments
Empresa: Lumenari Co — marketplace de tooling de IA, processa ~$2M/mês em transações
Sinal de senioridade: "5-7 anos de backend, mentorar 2-3 pleno, ser dono
da rotação on-call de payments"

[Por que esta]
Passei os últimos três anos sendo dono de uma stack de payments Stripe-e-Postgres
num marketplace fazendo volume similar. A linha de mentoria mapeia
para o que tenho feito informalmente no último ano e quero formalizar.

[A JD]
Senior Backend Engineer, Payments — Lumenari Co
Você vai ser dono do nosso subsistema de payments e webhook, trabalhando
primariamente em TypeScript e Postgres. Você vai mentorar 2-3 engenheiros
pleno e ser dono da rotação on-call para payments. Exigido: 5+ anos de backend,
experiência profunda com Stripe, Postgres, arquiteturas event-driven, e
ownership de on-call em produção.

[Seção do meu currículo]
Senior Backend Engineer — Acme Co (2022-Presente)
- Construí serviços de backend para o time de plataforma
- Trabalhei em melhorias de performance
- Ajudei a fazer onboarding de novos engenheiros
- Liderei migração para um novo provedor de cloud
- Colaborei com produto em planejamento de roadmap
- Escrevi documentação interna para a API

[Restrições]
- 1 página
- Tom: startup, direto
- Preservar da JD: Stripe, Postgres, webhooks, on-call, mentor
- Não vou alegar: eu não liderei a migração de cloud sozinho (era 1 de 3)
```

**Output que a IA retorna:**

```
Senior Backend Engineer — Acme Co (2022-Presente)
- Dono do subsistema de payments (Stripe + Postgres + Kafka), processando
  ~$4M/mês em transações de marketplace
- Cortei falhas de retry de webhook Stripe em 78% adicionando idempotency
  keys e uma dead-letter queue
- Mentorei 2 engenheiros pleno; ambos promovidos a sênior em
  18 meses
- Co-liderei migração de Heroku para AWS (time de 3); economizei $11k/mês
  com zero downtime para cliente
- Dono da rotação on-call de payments; cortei volume de page P1 de 12/mês
  para 3/mês endurecendo a lógica de retry
- [CONSIDERE CORTAR] Escrevi documentação interna para a API —
  não load-bearing para esta JD; corte se o espaço está apertado

Scan do terço de cima: confirma Senior Backend Engineer, ~5 anos de experiência,
vitórias específicas em torno de Stripe e on-call. Alinhado com a JD.
```

O que a IA mudou:

- Todo verbo genérico foi substituído por um resultado específico das vitórias reais do usuário.
- "Liderei migração" virou "Co-liderei" porque o usuário disse para não alegar ownership solo.
- "Mentorei 2 engenheiros pleno" subiu porque a JD destaca mentoria.
- O bullet de documentação interna foi sinalizado como cortável porque não vende para *esta* vaga.
- Keywords da JD (Stripe, Postgres, webhooks, on-call, mentor) todas presentes em prosa simples.

Esse é o movimento. Cinco bullets, cada um conquistando seu lugar.

---

## Quando você não tem números

Se você genuinamente não tem métricas para um bullet, a IA vai sinalizar `[PRECISA MÉTRICA]`. Suas opções:

1. **Adicione uma aproximação.** "Cortei falhas de retry em ~75%" está ok se você lembra que era nessa faixa. Não seja mais preciso do que sua memória.
2. **Substitua por um resultado qualitativo.** "Cortei falhas de retry o bastante para que pages de on-call caíssem de uma dor de cabeça semanal para uma mensal." Conversacional, ainda concreto.
3. **Corte o bullet.** Se um bullet não tem um resultado e você não consegue fabricar um real, é enchimento. Substitua por algo mais forte ou deixe o espaço.

Não deixe a IA chutar. Uma inventada "melhorei performance em 47%" pega em entrevistas. "Como você mediu isso?" é uma pergunta que você não consegue responder para um número que inventou.

---

## Check de scan do terço de cima

Depois que a IA produz o draft customizado, rode isto:

> "Se um recrutador lê só o terço de cima da página 1, ele vê (a) a vaga para a qual estou aplicando, (b) a senioridade que está contratando e (c) duas vitórias específicas?"

Se não, dê este prompt:

```
O terço de cima da página 1 não mostra <X>. Reordene conteúdo ou reescreva
os primeiros 2 bullets da função mais recente para que um scan de
7 segundos responda essas três perguntas.
```

Este é o prompt de follow-up mais útil do kit. A maioria dos recrutadores nunca passa do terço de cima na primeira leitura.

---

## Dica de volume

Uma vez que você rodou este prompt 5-10 vezes contra JDs diferentes, vai começar a reconhecer os padrões no seu próprio currículo que são consistentemente reordenados ou emergidos. Edite seu currículo master para refletir esses padrões. O tailoring fica mais rápido a cada vez.
