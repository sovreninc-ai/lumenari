# Brand Voice Builder

> Entregue à IA 3-5 amostras de escrita que você de fato gosta, e ela produz um perfil de voz reutilizável que você pode aplicar a todo asset futuro. Substitui o entregável de consultor de brand voice de $5k que ninguém abre duas vezes.

**Otimizado para:** qualquer ferramenta de IA — Claude, ChatGPT, Gemini. Melhores resultados quando você salva o perfil de voz extraído e reusa entre sessões.

---

## Modo de operação

Você está ajudando um fundador, marketeiro ou freelancer a extrair um perfil de voz utilizável a partir de um pequeno número de amostras de escrita, e depois aplicar essa voz a conteúdo novo. Premissas padrão:

- O usuário tem 3 a 5 amostras que representam como ele quer soar (escrita própria, posts favoritos de clientes, um concorrente que ele admira)
- Ele não é estrategista de marca e não quer um documento de 50 páginas
- O output precisa ser reutilizável — um único arquivo de perfil que o usuário pode colar de volta no começo de qualquer sessão futura
- Ele vai re-rodar a voz em e-mails, copy de landing, copy de anúncio, intros de blog e posts de social — não em romances

**Tom padrão:**
- O perfil é uma ferramenta de trabalho, não um entregável. Bullets e tabelas curtas, não parágrafos sobre arquétipos de marca.
- Só observações concretas — "usa fragmentos de frase para ênfase" é útil; "parece acessível" não é.
- Exemplos trabalhados vencem adjetivos. Toda alegação sobre a voz recebe uma linha citada de uma amostra.

**O que este kit se recusa a produzir:**
- Brand bibles de 50 páginas
- Atribuições de arquétipos junguianos ("você é o Sábio / Outlaw / Mago")
- Paletas de cores, fontes ou orientação de logo — isto é voz, não identidade visual
- Pilhas genéricas de adjetivos ("ousado, confiante, espirituoso, autêntico")
- Parágrafos de "declaração de missão" ou "essência da marca"
- Um perfil de voz baseado em zero amostras — se o usuário não forneceu, o kit pede

---

## Os quatro artefatos centrais

### 1. Extrator de amostra para voz (`templates/sample-to-voice.md`)

Cole 3-5 amostras. Receba de volta um perfil de voz estruturado com: matriz de atributos de voz (quatro eixos), tendências de estrutura de frase, assinaturas de vocabulário, marcadores de ritmo e dispositivos de framing recorrentes. Cada achado cita uma linha específica das amostras.

### 2. Prompt de aplicação de voz (`templates/voice-application.md`)

Cole o perfil salvo + um draft genérico. Receba de volta uma reescrita que combina com a voz. Inclui um self-check no final — a IA sinaliza qualquer linha que ela não tem certeza se passa no teste on-brand.

### 3. Detector de drift de voz (`playbooks/voice-drift-detection.md`)

Para quando você suspeita que o output da IA escorregou de volta para o default corporativo. Um rubric curto que a IA roda contra qualquer draft, pontuando cada seção como on-voice / drift / off-voice e apontando para a frase exata que disparou a chamada.

### 4. O próprio perfil de voz

O entregável do passo 1. Você salva este arquivo como `voice-profile.md` (ou cola na memória do projeto) e reusa para sempre. O formato é desenhado para ser legível por máquina no caminho de volta ao próximo prompt.

---

## A matriz de atributos de voz

Todo perfil de voz pontua quatro eixos de 1 a 5:

```
Formal       1 ——————— 5   Casual
Sério        1 ——————— 5   Brincalhão
Direto       1 ——————— 5   Diplomático
Técnico      1 ——————— 5   Acessível
```

Uma pontuação de 3 significa "aterrissa no meio neste eixo". Uma pontuação de 1 ou 5 significa "isto é um traço load-bearing — nunca viole". A IA é instruída a pesar mais 1s e 5s ao aplicar voz a copy novo.

Um output trabalhado se parece com:
- **Formal/Casual: 4** — usa contrações, larga artigos para impacto ("Construí isto para X"), mas nunca gírias
- **Sério/Brincalhão: 2** — seco em vez de bobo; as poucas piadas pousam por understatement, não por punchlines
- **Direto/Diplomático: 5** — abre com o pedido, sem aquecimento
- **Técnico/Acessível: 3** — usa palavras de domínio mas define na mesma frase

Esse é o tipo de detalhe que faz um perfil ser útil. "Autêntico e ousado" não é.

---

## Os padrões de prompt

Ao extrair uma voz, o formato de entrada é:

```
[Amostras]
Cole 3-5 amostras de escrita que soam como você quer soar.
Rotule cada uma (post de LinkedIn próprio / intro de blog favorita de cliente / etc.).

[Contexto]
Quem lê o output desta voz? (compradores B2B prospectivos / pais de crianças do futebol / etc.)
Para que é geralmente usado? (páginas de venda / newsletter semanal / cold emails / tudo isso)

[Restrições]
Algo proibido? (sem palavrão / sem primeira pessoa / nunca mencionar concorrentes pelo nome)
```

Ao aplicar uma voz:

```
[Perfil de voz]
Cole o perfil salvo.

[Draft]
Cole o copy bruto ou genérico que você quer reescrito.

[Objetivo]
Para que é, e qual é a ação desejada do leitor?
```

Pular o bloco [Perfil de voz] é como você acaba com output genérico de IA. O perfil é a peça load-bearing.

---

## Exemplo trabalhado: 3 parágrafos entrando, perfil de voz + reescrita saindo

**Entrada — três amostras:**

> Amostra 1 (LinkedIn): "Acabei a call. Hard pass. Queriam um engajamento de 12 meses e não dizem o que é sucesso. Te poupando da mesma conversa: pergunte o que sucesso significa antes de perguntar quanto custa."

> Amostra 2 (intro de newsletter): "Três semanas de silêncio. Desculpa — estava fundo no rewrite. Voltei. Eis o que mudou."

> Amostra 3 (hero de landing page): "Você não precisa de outro framework. Precisa entregar uma coisa esta semana. Eis a coisa."

**Perfil extraído:**
- Formal/Casual: **4** (contrações em todo lugar, fragmentos para impacto)
- Sério/Brincalhão: **2** (sem piadas, asides secos)
- Direto/Diplomático: **5** (toda abertura lidera com o veredito)
- Técnico/Acessível: **2** (zero jargão, segunda pessoa, frases curtas)
- **Estrutura de frase:** média ~9 palavras. Uso pesado de aberturas de dois beats. Fragmentos frequentes.
- **Assinaturas de vocabulário:** "hard pass", "entregar", "eis a coisa/o que mudou". Evita: "alavancar", "sinergia", "stakeholder".
- **Dispositivo de framing:** veredito primeiro. Chama o próximo movimento provável do leitor antes que ele faça.
- **Anti-padrões para sinalizar:** qualquer frase começando com "No cenário acelerado de hoje...". Qualquer uso de "transformar", "destravar", "elevar".

**Draft genérico para reescrever:**
> "Estamos animados em anunciar o lançamento da nossa nova plataforma desenhada para ajudar fundadores ocupados a otimizar suas operações diárias através de tecnologia de IA de ponta."

**Reescrita na voz:**
> "Coisa nova no ar. É para fundadores que desperdiçam o dia nas mesmas cinco tarefas administrativas. Leva cerca de um minuto para configurar. Eis aqui."

Esse é o teste. Se você consegue rodar o mesmo draft genérico pelas duas versões e sentir a diferença na barriga, o perfil funciona.

---

## O que a IA erra sem este kit

1. **Ela faz a média indo para voz de LinkedIn.** Todo output acaba soando como o post mediano do LinkedIn — vagamente inspiracional, vagamente autoritário, zero filo. O perfil bloqueia isso fazendo a IA defender cada linha contra o rubric de voz.
2. **Ela padroniza para estrutura de três atos.** IA genérica adora "Primeiro... Depois... Finalmente...". A maioria das vozes distintivas não se move assim. O perfil captura tendências reais de estrutura de frase e sobrepõe o default.
3. **Ela usa palavras que você nunca diria.** Sem uma assinatura de vocabulário, a IA vai te entregar "alavancar", "elevar", "transformar" e "best-in-class" não importa quantas vezes você peça para não. O kit faz a IA manter uma lista de banimento explícita puxada das amostras (palavras que o usuário nunca usou) e uma lista de permitidos (palavras pelas quais ele se estende repetidamente).

---

## O que este kit NÃO vai fazer por você

- Escrever copy melhor que suas amostras. Extração de voz é um teto, não um multiplicador — se suas amostras são medianas, as reescritas serão medianas.
- Substituir ter algo a dizer. Uma voz sem ponto de vista soa estranha. Use este kit em escrita que já tem opiniões, não em enchimento.
- Pegar todo drift. Re-rode o detector de drift em qualquer asset de alto risco (página de venda, post de captação, manifesto) antes de publicar.
- Sobreviver a mudança de co-autor. Se uma pessoa diferente está escrevendo o próximo batch de drafts, o perfil precisa de novas amostras dessa pessoa para permanecer preciso.

---

## Docs companheiros

- `templates/sample-to-voice.md` — prompt de extrator + schema de output do perfil
- `templates/voice-application.md` — aplicar um perfil salvo a qualquer draft
- `playbooks/voice-drift-detection.md` — rubric para pegar output off-voice da IA
- `memory.md` — contexto de domínio para a IA: vocabulário, workflows, erros comuns
- `optimization-pack.md` — system prompt auto-contido para qualquer chat de IA
- `custom-gpt-instructions.md` — formatado para ChatGPT Custom GPT
- `quick-start.md` — setup de 3 passos
