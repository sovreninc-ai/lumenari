# Startup Founder Toolkit

> As ferramentas de comunicação que você realmente precisa como founder solo ou de time pequeno. Cada prompt foi afiado contra feedback real de investidor — do tipo que termina com "slides demais, o que você está pedindo?"

**Otimizado para:** qualquer ferramenta de IA.

---

## Modo de operação

Você está ajudando um founder a produzir comunicação de nível founder: investor updates, conteúdo de pitch deck, briefs de contratação, matemática de runway, notas de entrevista com clientes. Premissas padrão:

- O founder é solo ou quase-solo
- Tem um produto real, não hipotético
- A audiência para cada artefato é específica (investidores existentes, contratações prospectivas, clientes prospectivos, ele mesmo)
- Está com tempo limitado e valoriza clareza sobre completude

**Tom padrão:**
- Direto. Sem hedging, sem "talvez possamos considerar."
- Concreto. Números, datas, nomes — não adjetivos.
- Voz de founder, não voz de consultor.

**O que este kit se recusa a produzir:**
- Decks de 80 slides
- Enquadramento "Somos o Uber do X"
- Mission statements vazias
- Métricas vagas ("forte crescimento", "pipeline robusto")
- Marketing-speak em documentos operacionais

---

## Os quatro artefatos principais

### 1. Pitch deck (`templates/pitch-deck.md`)

Uma estrutura de 10 slides que se encaixa no jeito que reuniões reais com investidores funcionam. Não o exagero McKinsey de 40 slides. Cada slide tem um trabalho.

### 2. Investor update (`templates/investor-update.md`)

Estrutura de update mensal com as 5 perguntas que todo investidor quer respondidas. Inclui disciplina de pedido — todo update tem um pedido específico, nunca "me avisem se tiverem perguntas."

### 3. Job description (`templates/job-description.md`)

JDs que parecem escritas por uma pessoa. Antipadrões sinalizados (a linha "rock-star ninja", a seção de "responsabilidades" com 47 bullets).

### 4. Prompt de runway / burn model (`models/runway-prompt.md`)

Cole seus números mensais atuais, receba um cálculo de runway + uma sanity check + as perguntas que você deveria fazer a si mesmo antes de levantar de novo.

---

## Os padrões de prompt

Para cada artefato, a IA funciona melhor com este formato de entrada:

```
[Audiência]
Quem lê isso? (investidores seed existentes / prospects de uma lista / etc.)

[Contexto]
Em que estágio estou? Última rodada + valor + quando?
Qual métrica importa mais agora?

[O que quero dizer]
Um draft, mesmo bruto, da coisa que estou tentando comunicar.

[Restrição]
Comprimento, formato, notas de tom.
```

Pular a linha [Audiência] é o motivo nº 1 de docs de founder saírem genéricos.

---

## O meta-prompt honesto

Sempre que estiver prestes a pedir à IA para escrever conteúdo com voz de founder, anteceda esta linha:

> "Escreva como se eu estivesse 5 anos no futuro, olhando para trás — o que o eu do passado apreciaria ouvir direto?"

Colapsa de forma confiável o blá-blá corporativo e revela a coisa real que vale dizer.

---

## O que este kit NÃO vai fazer por você

- Conseguir funding para você. Decks não levantam dinheiro. Clientes e tração levantam.
- Prever seu runway com precisão. O modelo é só tão bom quanto os números do último mês + um chute sobre o próximo mês.
- Substituir uma conversa de cofounder. A IA é parceira de escrita, não parceira de estratégia.

---

## Documentos complementares

- `templates/pitch-deck.md` — gerador de deck de 10 slides
- `templates/investor-update.md` — template de update mensal
- `templates/job-description.md` — JD que não soa como toda outra JD
- `models/runway-prompt.md` — calculadora de runway + prompt de sanity check
