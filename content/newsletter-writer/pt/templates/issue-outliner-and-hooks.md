# Gerador de Outline de Edição + Hook de Introdução

> Transforme um tópico numa estrutura de 5 seções e escreva as duas primeiras linhas que puxam o leitor além do painel de preview.

---

## Parte 1 — O outliner de edição

### O formato

```
1. HOOK (linhas 1-2)
   As duas primeiras linhas do e-mail. Puxa o leitor além do
   painel de preview. UM dos cinco padrões: curiosidade, contrarian,
   história, estatística, pergunta.

2. SETUP (~150-200 palavras)
   Contexto que o leitor precisa. Três parágrafos curtos. Espaço em
   branco entre eles. Estabelece o que está em jogo — por que isso
   importa essa semana.

3. MEIO (~400-600 palavras)
   A ideia real. 2-3 exemplos ou histórias trabalhadas. Nomes
   específicos, números específicos, momentos específicos. Esse é o
   corpo da edição.

4. REFRAME (~100-150 palavras)
   O que fazer com isso. Ou o que pensar sobre isso. Ou o que mudou
   agora. Um próximo passo específico que o leitor pode dar.

5. ASSINATURA (~30-50 palavras)
   Curta. Calorosa mas não babosa. Um CTA claro OU nenhum CTA.
   "Responda" funciona. "Aperte o botão de inscrever" não.
```

Total: aproximadamente 800-1.000 palavras. O comprimento certo é qualquer um que a ideia precise. Não encha para bater um número.

### O prompt

```
Você está fazendo outline de uma edição de newsletter. Regras:

1. Use o formato de 5 seções: Hook → Setup → Meio → Reframe → Assinatura.
2. O Hook tem no máximo duas linhas. Escolha UM de: curiosidade,
   contrarian, história, estatística, pergunta. Não proponha vários
   — escolha o que se encaixa no tópico.
3. O Setup mostra o que está em jogo — por que essa ideia importa
   essa semana.
4. O Meio tem 2-3 exemplos trabalhados. Se eu não te dei exemplos,
   pergunte antes de fazer o draft deles.
5. O Reframe termina com um próximo passo específico. "Reflita sobre
   isso" não é um próximo passo. "Abra sua última edição e encontre
   a linha onde você começou a encher" é um próximo passo.
6. A Assinatura é curta. Sem "aperte o botão de inscrever". Sem
   "compartilhe com alguém que precisa disso".

Voz: específica, pessoal, levemente informal. Parágrafos curtos.
Espaço em branco. Verbos ativos.

Produza só o outline. Cabeçalhos de seção + 2-4 linhas de orientação
por seção. Sem comentário a menos que eu peça.
```

### Formato de entrada

```
[A newsletter]
Nome + posicionamento
Contagem de inscritos
Comprimento médio de edição

[Esta edição]
Tópico / título de trabalho
Com o que o leitor sai
Exemplos, citações ou dados específicos para usar
Tom (rant / contemplativo / how-to / lista / história)

[Restrições]
- Contagem de palavras
- Coisas a evitar
```

### Exemplo trabalhado

**Entrada:**

```
[A newsletter]
"Passando de 100" — semanal para novos escritores de newsletter
Inscritos: 1.400
Comprimento médio: 1.000 palavras

[Esta edição]
Tópico: como encontrar seus primeiros 100 leitores
Takeaway: que os primeiros 100 não vêm do social — vêm de DMs para
pessoas específicas que já confiam no escritor.
Exemplos que quero usar:
- Os primeiros 80 da Sarah vieram de 30 e-mails diretos para amigos
  e ex-colegas
- Os meus primeiros 50 vieram de 12 DMs para pessoas com quem trabalhei
- O contraste: um amigo que lançou no Twitter teve 200 follows e 8
  inscritos na newsletter
Tom: direto, levemente contrarian
Restrições: 900 palavras, sem "leverage" ou "audience-building"
```

**Saída:**

```
1. HOOK (contrarian)
   "Todo mundo diz que você deveria construir em público para crescer
   uma newsletter. Para seus primeiros cem leitores, isso está
   majoritariamente errado."
   - Aterrissa a afirmação contrarian na primeira linha.
   - Segunda linha nomeia o caso específico que vai argumentar.

2. SETUP (~150 palavras)
   Três parágrafos curtos:
   - A mitologia: dia de lançamento, momentum no Twitter, primeira
     edição viral.
   - A realidade para a maioria dos escritores: dia de lançamento
     te dá 12 cadastros, metade dos quais nunca abre outra edição.
   - O reframe: os primeiros 100 são um problema diferente dos
     próximos 1.000. Social é o problema dos próximos 1.000. Os
     primeiros 100 são um problema de confiança.

3. MEIO (~500 palavras)
   Três exemplos trabalhados em ordem de força:
   a) Lançamento da Sarah: 30 e-mails diretos para amigos e
      ex-colegas → 80 inscritos. Específicos: ela incluiu um "isso
      é o que é e por que acho que você ia gostar" de uma linha.
      26 de 30 abriram o e-mail. 22 de 30 se inscreveram.
   b) Meu próprio lançamento: 12 DMs para pessoas com quem trabalhei
      em projetos passados. Específicos: perguntei a cada pessoa
      se queriam ver, não inscrevi. 10 disseram sim, 8 ficaram.
   c) O contraste: um amigo que lançou no Twitter. 200 follows na
      primeira semana, 8 cadastros na newsletter, metade descadastrou
      após a edição 2. Alcance sem confiança é barulho.

4. REFRAME (~120 palavras)
   O que fazer com isso:
   - Abra seus contatos. Liste 30 pessoas que te conhecem bem o
     suficiente para que um e-mail seu não seja indesejado.
   - Para cada uma, escreva uma frase sobre por que acha que iam
     gostar da newsletter. Frase diferente por pessoa.
   - Envie 5 hoje. A lista inteira em 10 dias.
   - Não inscreva pessoas. Pergunte. Deixe elas dizerem sim.

   Um próximo passo específico: "Envie as primeiras cinco DMs antes
   de fechar seu laptop hoje à noite."

5. ASSINATURA (~40 palavras)
   "Se você já fez isso e funcionou — ou não — responda e me conta.
   Eu leio cada uma. — A"
   - CTA de resposta é o movimento certo para uma lista pequena.
     Reply rate é um indicador antecedente de engajamento e converte
     para pago melhor do que qualquer outro sinal.
```

O que esse outline faz:

- Hook é um padrão (contrarian), não cinco opções competindo.
- Setup tem batidas explícitas de parágrafo com seus próprios trabalhos.
- Meio é estruturado em torno dos três exemplos que o usuário deu, em ordem de força.
- Reframe termina com um próximo passo concreto que um leitor pode fazer hoje à noite.
- Assinatura usa um CTA de resposta, que a IA proativamente justifica.

O escritor pega esse outline e escreve a edição. A IA não escreveu a edição. Esse é o ponto.

---

## Parte 2 — O gerador de hook de introdução

### Por que as duas primeiras linhas importam

No Gmail e na maioria dos clientes de e-mail, o leitor vê:

```
[Nome do remetente]
[Subject line]
[Primeiros ~80 caracteres do corpo do e-mail]
```

Essas três coisas são a decisão inteira de abrir. A subject line sozinha não é suficiente. As duas primeiras linhas do e-mail aparecem no painel de preview, e elas decidem se a abertura vira leitura.

Se você já abriu uma newsletter e fechou imediatamente, as duas primeiras linhas falharam.

### Os cinco padrões de hook, com exemplos

**1. Curiosidade**
> "Eu quase não enviei esta edição."

> "Tem uma linha que cortei da peça da semana passada que não consigo parar de pensar."

> "Recebi um e-mail ontem e não tenho certeza de como responder."

Padrão: insinue uma história ou uma tensão. Faça o leitor querer a resolução.

**2. Contrarian**
> "Todo mundo diz que você deveria escrever sobre o que sabe. Eu acho que isso é errado para os primeiros seis meses."

> "Build-in-public funciona. Mas não do jeito que você pensa."

> "Descadastrei de 14 newsletters esse fim de semana. Aqui está o padrão."

Padrão: inverta ou complique uma peça de sabedoria comum. O leitor tem que continuar lendo para ver se você ganhou a contradição.

**3. História**
> "Na última terça uma leitora me mandou e-mail para perguntar por que eu a tinha descadastrado. Eu não tinha. O Substack tinha."

> "No domingo sentei para escrever esta edição e acabei escrevendo outra."

> "Há dois meses uma escritora que admiro me mandou DM com uma pergunta que eu não conseguia responder."

Padrão: um momento específico, uma pessoa específica, um tempo específico. Histórias puxam leitores porque histórias são como humanos prestam atenção.

**4. Estatística**
> "Quarenta e oito por cento dos escritores de newsletter param nos primeiros três meses. Eu quase parei no quarto mês."

> "Em média, esta newsletter recebe uma resposta a cada 87 leituras."

> "No último trimestre, 60% dos meus novos inscritos vieram de uma fonte. Não é a que você adivinharia."

Padrão: um número com um enquadramento pessoal. Números criam autoridade; o enquadramento pessoal mantém humano.

**5. Pergunta**
> "Qual é a menor coisa que você poderia enviar essa semana que te ensinaria alguma coisa?"

> "Quando foi a última vez que você escreveu algo que não tinha certeza se era bom?"

> "Em quem você imagina quando escreve?"

Padrão: uma pergunta que o leitor não consegue responder facilmente, que nomeia algo em que ele tem pensado. Funciona melhor para edições contemplativas.

### O prompt

```
Você está escrevendo as duas primeiras linhas de uma edição de
newsletter. Regras:

1. Escolha UM dos cinco padrões de hook: curiosidade, contrarian,
   história, estatística, pergunta. Não proponha os cinco — escolha
   o que se encaixa na edição.
2. Máximo duas linhas. Contagens: linha um é aproximadamente o
   comprimento de uma subject line; linha dois é uma frase curta.
3. Específico. Um momento real, uma pessoa real, um número real, uma
   peça real de sabedoria convencional.
4. Sem "Oi, pessoal, espero que estejam bem." Sem "Bem-vindo de volta
   à <newsletter>." Sem "Hoje quero falar sobre X."
5. A segunda linha deveria fazer a primeira linha fazer sentido, OU
   escalar a tensão que a primeira linha abriu.

Voz: pessoal, específica, levemente informal. Verbos ativos.

Produza as duas linhas e qual padrão você usou. Sem comentário a
menos que eu peça.
```

### Exemplo trabalhado

**Entrada:**

```
Tópico da edição: como encontrar seus primeiros 100 leitores
Tom: direto, levemente contrarian
Takeaway: os primeiros 100 vêm de DMs para pessoas que confiam em
você, não do social.
```

**Saída:**

```
Padrão: Contrarian

"Todo mundo diz que você deveria construir em público para crescer
uma newsletter. Para seus primeiros cem leitores, isso está
majoritariamente errado.

O movimento não é um tweet de lançamento. São doze DMs."

Por que isso funciona:
- Linha 1 nomeia a sabedoria e a inverte num só fôlego.
- Linha 2 escala: número específico (12), canal específico (DMs).
- Juntas elas prometem que a edição vai dizer o que fazer, não só
  o que está errado com a abordagem convencional.
```

### Quando usar qual padrão

- **Curiosidade** — quando a edição tem uma história ou um revelar pessoal. Padrão para ensaios pessoais.
- **Contrarian** — quando a edição argumenta contra a sabedoria convencional. Melhor para tomadas opinativas.
- **História** — quando a edição começa com um incidente específico. Melhor para edições com formato narrativo.
- **Estatística** — quando você tem um número real que aterrissa. Melhor para edições orientadas a dados.
- **Pergunta** — quando a edição é contemplativa e você quer que o leitor pense junto. Use com moderação; perguntas podem aterrissar mal se o resto da edição não as honrar.

A IA escolhe um e se compromete. Se o usuário quiser ver um padrão diferente, ele pede explicitamente.

---

## Quando pular o outline

Você não precisa fazer outline de toda edição. Pule o outline quando:

- Você já sabe o que está escrevendo e a edição tem menos de 500 palavras.
- A edição responde a um e-mail específico de leitor ou evento atual — escreva antes de pensar demais.
- Você está em flow de escrita e o outline interromperia.

Quando definitivamente fazer outline:

- Edições acima de 1.200 palavras.
- Edições que você está procrastinando há mais de uma semana.
- Edições que você está nervoso para enviar.
- Qualquer coisa onde o tópico parece maior que o formato.

O outline não é um contrato; é uma ferramenta de pensamento. Depois que você tem, pode se desviar livremente. O ponto é saber o que está tentando fazer antes de começar o draft.
