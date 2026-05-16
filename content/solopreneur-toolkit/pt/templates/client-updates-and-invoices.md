# Updates de Cliente e Nudges de Fatura

O lado chato do trabalho solo — contar ao cliente o que você fez, pedir que paguem e correr atrás quando não pagam. Esse arquivo é o copy que faz os três sem soar como robô ou capacho.

---

## Parte 1 — O update semanal de cliente

O e-mail de maior alavancagem no trabalho de solopreneur. Mandado toda sexta-feira (ou no dia que você se comprometer) como relógio. Depois de 3 desses, os e-mails "oi só dando uma checada" do seu cliente param. O chefe dele para de perguntar onde o projeto está. Você vira baixa-ansiedade para eles.

### O formato — cinco linhas no máximo

```
**Essa semana:**
- [Deliverable concreto entregue ou avançado]
- [Deliverable concreto entregue ou avançado]

**Próxima semana:**
- [Deliverable]
- [Deliverable]

**Preciso de você:**
- [Decisão ou asset específico, com data — ou "nada agora"]

**Status:** On track / Watch / Blocked
**Próximo update:** [Data]
```

### Cole esse prompt na IA

```
Você é o Solopreneur Co-Pilot.

Escreva um update de sexta para [NOME DO CLIENTE] no projeto [NOME DO PROJETO]. Use o formato padrão de 5 linhas.

Essa semana eu:
- [BULLET 1]
- [BULLET 2]
- [BULLET 3]

Próxima semana eu vou:
- [BULLET 1]
- [BULLET 2]

Preciso deles:
- [PEDIDO]

Status: [On track / Watch / Blocked — e uma frase do porquê se não for On track]

Mantenha abaixo de 100 palavras. Linguagem simples. Sem "espero que esse e-mail te encontre bem".
```

### Exemplo trabalhado de output

> Assunto: Refresh de marca — update semana 2
>
> **Essa semana:**
> - Primeira rodada de direção visual entregue (link do Figma, comentários abertos)
> - Notas do workshop de posicionamento consolidadas no rascunho do doc de voz
>
> **Próxima semana:**
> - Rodada 2 de direção visual baseada no seu feedback
> - Primeiro rascunho do template de pitch deck
>
> **Preciso de você:**
> - Comentários no arquivo do Figma até terça, 21 de maio
>
> **Status:** On track
> **Próximo update:** Sexta, 24 de maio

Esse e-mail levou 4 minutos para escrever. Vai te economizar 40 minutos de conversa "como estamos?" na próxima semana.

### Quando o status é Watch ou Blocked

Sempre adicione UMA frase explicando o porquê. Nunca só "Watch". Exemplos:

- **Watch — esperando copy do time de marketing desde terça; vou reorganizar na próxima semana se não chegar até segunda.**
- **Blocked — o ambiente de staging ainda não foi provisionado. Mandei e-mail para seu dev lead na quarta; pode dar um ping?**

Nomear o bloqueio diz ao cliente que ele precisa fazer algo. "Watch" vago deixa eles ansiosos.

---

## Parte 2 — Copy de fatura

A fatura em si é majoritariamente um form (sua ferramenta de faturamento — Stripe, FreshBooks, HoneyBook, Wave, QuickBooks, qualquer uma — gera). O COPY que vai em volta da fatura é o que muda.

### E-mail padrão de envio de fatura

```
Assunto: Fatura [###] — [Nome do projeto]

Oi [Nome],

Fatura [###] está anexa / linkada abaixo. Resumo:
- [Line item 1]: $X
- [Line item 2]: $X
- **Total:** $X (Net 14)

Você pode pagar por [métodos aceitos]. Se precisar de outro formato para o time de AP, me avise.

Obrigado,
[Você]
```

Notas:

- **Declare os termos net no e-mail**, não só no PDF da fatura. Times de AP precisam disso por escrito.
- **Não escreva "Obrigado pela sua preferência!"** — lê como carente. "Obrigado" sozinho está ok.
- **Não peça desculpa pela fatura.** É o trabalho.

### Cole esse prompt na IA

```
Você é o Solopreneur Co-Pilot.

Escreva um e-mail de envio de fatura para [NOME DO CLIENTE]. Projeto: [NOME]. Total: [VALOR] CAD/USD. Termos: Net [7/14/30]. Métodos de pagamento: [STRIPE/INTERAC/ACH/CHEQUE/ETC].

Mantenha abaixo de 70 palavras. Sem "Obrigado pela sua preferência!". Sem pedido de desculpa.
```

---

## Parte 3 — Lembretes de pagamento atrasado

A escalação de três tiers. Cada tier é um e-mail separado, mandado no próprio dia. Nunca combine.

### Dia 7 depois do vencimento — o nudge amistoso

Tom: assuma esquecimento, não má-fé. A maioria das faturas que passa do Net 14 está parada na caixa de entrada de alguém; não malicioso, só perdido.

```
Assunto: Re: Fatura [###]

Oi [Nome],

Nudge rápido — fatura [###] de [data] venceu em [data], e ainda não vi entrar. Sei como é fácil de perder. Você consegue checar com o AP e me dizer quando posso esperar?

Se tem algo travado do seu lado, feliz em conversar.

Obrigado,
[Você]
```

### Dia 14 depois do vencimento — mais firme, menciona a política

Tom: ainda educado. O cliente agora sabe que você está rastreando. Se você tem política de late-fee no seu SOW, é aqui que aparece.

```
Assunto: Fatura [###] — ainda em aberto

Oi [Nome],

Acompanhando — fatura [###] agora está 14 dias atrasada. Conforme nosso SOW, uma late-fee de 1,5% se aplica depois de 14 dias; foi adicionada na fatura atualizada em anexo.

Se tem algo que eu possa fazer para destravar do seu lado, me avise. Caso contrário, volto a checar na próxima semana.

Obrigado,
[Você]
```

Se você não tem cláusula de late-fee, tire essa linha. Não invente uma — seu cliente pode ter o SOW aberto.

### Dia 30 depois do vencimento — formal, trabalho pausa

Tom: ainda profissional, mas as consequências são reais e ditas. Você está pausando o trabalho e quer uma ligação.

```
Assunto: Fatura [###] — pausando o trabalho

Oi [Nome],

Fatura [###] agora está 30 dias atrasada. A partir de [data], estou pausando trabalho adicional em [PROJETO] até o saldo ser resolvido. Prefiro muito não fazer isso — vamos pegar uma call de 15 minutos essa semana para resolver.

Horários que tenho: [3 opções].

Se esse não é o contato certo para AP, por favor inclua quem eu deveria estar falando.

Obrigado,
[Você]
```

### O que você NÃO faz

- "Só dando follow-up de novo…" pela quinta vez. Depois do dia 30, você mandou três e-mails escalando. O quarto é a ligação, não um quarto e-mail.
- Encerramentos passivo-agressivos ("Assumo que isso não é prioridade?")
- Ameaças que você não pode cumprir ("Vou ter que envolver meu advogado.") — a menos que vá mesmo, e a menos que o valor justifique.
- Vergonha pública. Não tweete sobre, não poste sobre. Reputação funciona nos dois sentidos.

### Quando escalar além do e-mail

Se 45 dias atrasada e sem resposta: mande um e-mail final dizendo que você vai entregar para um serviço de cobrança ou processo de pequenas causas, e aí faça mesmo. A ameaça sem ação te faz parecer mole. A ação sem aviso é não profissional. Sempre um e-mail final nomeando a ação e a data.

---

## Parte 4 — O e-mail de "scope creep" no meio do projeto

Adjacente a faturamento. Quando o cliente pede "só mais uma coisinha" que não está no SOW.

### O template

```
Assunto: Re: [o pedido deles]

Oi [Nome],

Feliz em olhar [a coisa nova]. Aviso — está fora do escopo que acordamos no SOW (Seção 2: Fora de Escopo). Posso tratar como Change Request:

- Opção 1: adicionar como add-on plano de $[X]. Soma [Y] dias na timeline.
- Opção 2: estacionar para uma Fase 2 depois que terminarmos o escopo atual.

Qual caminho prefere?

Obrigado,
[Você]
```

Note o que esse template NÃO faz:

- Não diz "claro, encaixo isso". É assim que scope creep come sua margem.
- Não pede desculpa por cobrar por trabalho novo.
- Não dá sermão no cliente sobre o que é scope creep. Só nomeia e oferece opções.

---

## Cheat sheet — o que mandar quando

| Situação | Mande isso |
|---|---|
| Fim de toda semana | Update semanal (5 linhas) |
| Fatura pronta | E-mail de envio de fatura (abaixo de 70 palavras) |
| 7 dias atrasado | Nudge amistoso |
| 14 dias atrasado | Lembrete mais firme, menciona política |
| 30 dias atrasado | E-mail pausando trabalho + pedir uma call |
| 45 dias atrasado | E-mail final nomeando próxima ação |
| Cliente pede fora de escopo | Oferta de Change Request (2 opções) |

Coloque esses no seu gerenciador de snippets (TextExpander, Raycast, Alfred, qualquer um). A fricção de escrever o mesmo e-mail várias vezes é o que faz solopreneurs deixarem faturas escorregarem.

---

## Erros comuns que o kit vai sinalizar

- "Só dando uma checada" — substitua por status ou pergunta específica
- "Espero que esse e-mail te encontre bem" — corte, não soma nada
- "Desculpa incomodar" — nunca peça desculpa por estar devido dinheiro
- Lembretes que não nomeiam valor em dólar ou número da fatura — seja específico
- Updates sem data do próximo update — sempre inclua
- Status "On track" quando algo está realmente escorregando — chame de Watch
