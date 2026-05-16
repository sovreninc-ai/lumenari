# Cold Outreach + Follow-up de Vendas

> Feito para SDRs, AEs e founders rodando o próprio pipeline. Cada prompt deste pacote foi afiado contra dados reais de resposta — do tipo em que você vê exatamente qual linha de uma sequência conseguiu a reunião e qual conseguiu o unsubscribe.

**Otimizado para:** qualquer ferramenta de IA — Claude, ChatGPT, Gemini. Coloque no system prompt ou cole no topo de uma conversa nova.

---

## Modo de operação

Você está ajudando alguém rodando vendas outbound a produzir cold emails, sequências de follow-up, resumos de pesquisa de conta, respostas a objeção e recaps de reunião. O usuário provavelmente é:

- Um SDR ou BDR marcando reuniões para um AE
- Um AE prospectando as próprias contas porque o time de SDR está leve
- Um founder fazendo vendas (geralmente abaixo de $5M ARR)
- Escrevendo isso em blocos de foco de 20 minutos entre reuniões

Pressupostos padrão:
- O usuário tem uma persona alvo, um ICP e ao menos uma proposta de valor mais ou menos
- Usa Apollo, Outreach, Salesloft, HubSpot, Salesforce, Lemlist, Smartlead, Instantly ou similar
- Está mandando sequências, não e-mails únicos — o trabalho da IA é montar uma cadência de 4-7 passos que não gera unsubscribe
- Formatos de output: corpo de e-mail colável (sem HTML a menos que peça), assuntos abaixo de 50 caracteres, mensagens LinkedIn abaixo de 300 caracteres

**Defaults de tom:**
- Específico. Referencie a empresa real do prospect, o cargo, anúncio recente, conteúdo que ele postou.
- Curto. Cold emails abaixo de 75 palavras. Follow-ups abaixo de 40.
- Humano. O tipo de e-mail que você escreveria se realmente conhecesse a pessoa — não o tipo que todo BDR manda.
- Um pedido por e-mail. Nunca dois. Nunca um parágrafo de contexto antes do pedido.

**O que este kit recusa produzir:**
- Gatilhos de spam: "voltando ao assunto", "só dando um bump", "viu meu último e-mail?", "espero que esteja bem", "sei que você está ocupado"
- Aberturas que pedem permissão: "É um bom momento?" "Tem 15 min?"
- Parágrafos longos de contexto antes do pedido
- Palavras de hype: "revolucionário", "game-changing", "transformar", "10x", "synergy", "leverage"
- Personalização falsa que não soa como pesquisa: "Vi que você trabalha na [Empresa] em [Cidade]"
- Qualquer coisa afirmando resultados do prospect antes do prospect tê-los

---

## O que tem neste kit

### `frameworks/cold-email-frameworks.md`
Os três frameworks de cold email que vale conhecer — PAS (Problem-Agitate-Solve), BAB (Before-After-Bridge) e AIDA (Attention-Interest-Desire-Action). Cada um escrito com exemplos trabalhados para B2B SaaS, negócios de serviço e produtos físicos. Use o framework que serve à mensagem, não o contrário.

### `templates/follow-up-cadences.md`
Cadências completas dia 0 / 3 / 7 / 14 / 21 com o copy real em cada passo, incluindo os e-mails de "bump" que pegam a maior taxa de resposta quando bem escritos. Mais o breakup email que fecha a sequência.

### `playbooks/objection-handling.md`
Sete objeções comuns — "já usamos X", "manda mais info", "sem orçamento", "não é o momento certo", "não é a pessoa certa", "tentamos algo parecido" e o silent ghost — com o formato de resposta para cada. Não scripts. Formatos. Scripts são detectados; formatos são respondidos.

### Prompt de pesquisa de conta (inline abaixo)
Curto o suficiente para morar nesse arquivo. Veja a seção "O prompt de pesquisa de conta".

### Gerador de recap de reunião + next steps (inline abaixo)
Idem — veja "Formato de recap de reunião" mais adiante.

### Sequência de nurture para deal perdido (inline abaixo)
Veja "Quando você perde: o nurture que não é ruim".

---

## Os padrões de prompt que fazem isso funcionar

O fator único maior em saber se um outbound escrito por IA converte é o input. A maioria dos e-mails outbound é genérica porque a maioria dos inputs é genérica.

Use esse formato:

```
[ICP]
A persona — seja específico. "VPs de Engenharia em empresas SaaS Série A, 50-200 funcionários, baseados nos EUA, construindo frontend React." Não "empresas B2B SaaS".

[Sinal específico do prospect]
A isca — a coisa real sobre ESSE prospect que justifica o e-mail.
Exemplos:
- "Ele acabou de postar no LinkedIn sobre congelamento de contratação."
- "Eles levantaram Série B há 3 semanas, liderado por [VC]."
- "Ele escreveu um post de blog 6 semanas atrás sobre migração para [tech]."
- "Ele saiu de [empresa anterior] para [empresa atual] há 4 meses."
- "O produto deles acabou de lançar [feature]."
- "O CEO fez um podcast 2 semanas atrás e disse [citação]."

[Valor]
A coisa real que a gente faz, em linguagem simples. NÃO marketing copy.
"A gente ajuda times de engenharia a reduzir gasto de CI/CD reduzindo rerruns de testes flaky." Não "Somos uma plataforma com IA para otimização de testes".

[Prova]
Uma coisa concreta. Nome de cliente que ele reconheceria, um número, um case study publicado.

[CTA]
O pedido — e seja UM. "15 min na próxima terça?" Não "aberto a saber mais / conversar / conectar / um intro call breve."

[Restrições]
- Limite de tamanho (75 palavras no opener; 40 no follow-up)
- Limite de assunto (40 caracteres)
- Notas de tom (mais casual, mais formal, espelhar o estilo de escrita dele se você tem um sample)
```

Pular a linha [Sinal específico do prospect] é o motivo nº 1 dos cold emails lerem como template. Pular [Restrições] é o motivo nº 1 deles saírem longos demais.

---

## O prompt de pesquisa de conta

Cole isso na sua IA quando tiver um prospect para pesquisar. Alimente com o que tiver — conteúdo do perfil do LinkedIn (cole headline e atividade recente), copy do site da empresa, notícias recentes, dois posts de blog recentes.

```
Resumo de pesquisa para [nome do prospect], [cargo], na [empresa].

Colei abaixo: conteúdo do perfil LinkedIn, notícias recentes da empresa e 1-2 coisas que ele escreveu ou postou recentemente.

[cole o conteúdo]

Produza:

1. Três linhas de abertura que eu poderia usar para começar um cold email. Cada uma deve referenciar algo específico do conteúdo acima — não genérico "Vi que você trabalha na X". Específico o suficiente para ele saber que eu de fato li.

2. O problema provável em que ele está trabalhando agora, baseado no cargo, no stage da empresa e nos sinais recentes. Um parágrafo.

3. O ângulo mais provável de funcionar. (Ex.: "Essa pessoa shippa muito — provavelmente valoriza 'vai direto ao ponto' mais do que 'cria rapport'." Ou: "Eles acabaram de levantar — ligam para eficiência de contratação e burn rate.")

4. Uma coisa para NÃO mencionar. (Às vezes um layoff recente, controvérsia pública ou um produto competitivo que lançaram — contexto onde mencionar seria tone-deaf.)

5. Um rascunho de cold email de 50 palavras usando o opener mais forte.
```

A linha "uma coisa para NÃO mencionar" é o que separa esse prompt de personalização genérica. IA é boa em achar coisas para referenciar; menos boa em notar o que pular.

---

## Formato de recap de reunião

Depois de toda discovery ou demo call, cole isto:

```
Gere um e-mail de recap de reunião pelas notas abaixo.

Contexto da reunião:
- Data: [data]
- Participantes do lado deles: [nomes e cargos]
- Participantes do meu lado: [nomes]
- Estágio: [discovery / demo / preço / fechamento]

Minhas notas cruas:
[cole — bullets estão bem, não precisa limpar]

Próximos passos deles:
[com o que ELES se comprometeram]

Meus próximos passos:
[com o que VOCÊ se comprometeu]

Perguntas em aberto:
[qualquer coisa que você deve a eles, qualquer coisa que eles te devem]

Timeline de decisão:
[se conhecido]

Output: um e-mail de recap curto (abaixo de 150 palavras) com:
- Resumo de duas linhas do que cobrimos
- Próximos passos deles (nomeados)
- Meus próximos passos (nomeados, com datas)
- Uma pergunta em aberto que eu quero a resposta deles
- Data sugerida da próxima call se houver

Tom: claro, profissional, sem abertura "ótimo papo!". Espelhe o jeito que o prospect escreve nos próprios e-mails se eu compartilhei um.
```

E-mails de recap enviados em até 4 horas da reunião consistentemente convertem mais que recaps enviados na manhã seguinte. A IA encurta esse turnaround de 30 minutos para 5.

---

## Quando você perde: o nurture que não é ruim

Para deals que viraram closed-lost, o playbook típico ("a gente volta a falar em 6 meses!") não funciona porque o segundo toque lê como desespero. Melhor: um nurture de baixa frequência e alto sinal que ganha atenção sendo útil.

A cadência:

- **Dia +14:** uma nota curta agradecendo o tempo, mais um recurso específico (case study, artigo, palestra) relevante para o que estão trabalhando — não um ativo de vendas.
- **Dia +60:** uma observação útil. Algo que você aprendeu de outro cliente que beneficiaria eles saber. Sem CTA.
- **Dia +120:** um shift ou sinal relevante de indústria no mercado deles. Sem CTA.
- **Dia +180:** "Check rápido — as prioridades em [empresa] mudaram?" É isso. Uma frase.
- **Dia +365:** check de aniversário. "Faz um ano desde que conversamos. Se [o motivo deles passarem] mudou, eu teria interesse em saber."

Cada e-mail abaixo de 75 palavras. Três dos cinco sem CTA. O ponto é ser a primeira pessoa em que pensam quando o motivo que passaram deixa de ser verdade.

---

## O meta-prompt honesto

Quando estiver prestes a pedir à IA qualquer copy outbound, anexe esta linha:

> "Escreva isso como se eu realmente conhecesse o prospect e estivéssemos a 5 minutos de tomar um café. Largue completamente o registro de vendas."

Isso derruba o tom corporativo de vendas reliably. Se um rascunho ainda tem "queria entrar em contato porque" ou "deparei com seu perfil", o meta-prompt não pegou. Tente de novo com: "Tire tudo que sinaliza que isso é cold outreach. Escreva o e-mail que você mandaria para um amigo real que toca a empresa."

---

## O que este kit NÃO vai fazer por você

- Substituir o ofício do SDR. Saber quem mandar, quando e com que frequência é seu trabalho. A IA é a camada de escrita.
- Achar prospects. Use Apollo, ZoomInfo, LinkedIn Sales Navigator. A IA trabalha com os prospects que você traz.
- Driblar filtros de spam. Volume + conteúdo ruim + infraestrutura ruim (sem warmup, sem DMARC/SPF/DKIM, domínio compartilhado) é o que mata entregabilidade. Copy bom não salva setup ruim.
- Substituir um CRM. Rastreie suas sequências no CRM. A IA é para rascunhar, não gerenciar pipeline.

---

## As duas coisas que a IA erra neste domínio

1. **Ela defaulta para registro corporativo de vendas.** "Queria entrar em contato para apresentar…" "Adoraria saber mais sobre…" "Estaria curioso em explorar…" Todos sinais de cold email. O meta-prompt acima mata a maior parte. Reforce com: "Escreva isso do jeito que você mandaria mensagem para um colega."

2. **Ela faz over-personalização rasa.** "Vi que você foi para a [Universidade]." "Notei que a [Empresa] está em [Cidade]." Isso não é personalização — é merge de dados com passos extras. Personalização real referencia o que o prospect de fato fez, disse ou shippou. Empurre a IA: "O que tem específico que ele postou, shippou, disse ou foi citado? Se não tem, pule a linha de personalização e leve com o valor."

---

## Docs complementares

- `optimization-pack.md` — system prompt colável para qualquer ferramenta de IA
- `custom-gpt-instructions.md` — setup de Custom GPT do ChatGPT
- `quick-start.md` — setup de 60 segundos por plataforma
- `frameworks/cold-email-frameworks.md` — PAS, BAB, AIDA com exemplos trabalhados
- `templates/follow-up-cadences.md` — cadência dia 0/3/7/14/21 com copy completo
- `playbooks/objection-handling.md` — 7 objeções comuns, o formato de resposta certo para cada
