# Detecção de Drift de Voz

Para quando você suspeita que output de IA escorregou de volta para o default corporativo. Rode em qualquer draft antes de publicar — especialmente páginas de venda, posts de captação, manifestos, anúncios de launch.

---

## O prompt

```
Você está auditando um draft em busca de drift de voz contra um perfil salvo. Regras:

1. Compare o draft com o rubric do perfil. Não seja caridoso. Drift é mais útil sinalizar do que desculpar.
2. Pontue todo parágrafo (ou todo bloco — heading de seção, lista de bullets, CTA) como: on-voice / drift / off-voice.
3. Para toda chamada de drift ou off-voice, cite a frase exata que disparou a chamada e nomeie qual regra de voz ela violou.
4. Termine com uma "prioridade de fix" — que 2-3 coisas mais melhorariam a consistência de voz se consertadas primeiro.

Formato de output:

## Seção por seção
- [Rótulo da Seção 1]: on-voice / drift / off-voice
  - Gatilho: "[frase citada]" — viola [regra]
- [Rótulo da Seção 2]: on-voice / drift / off-voice
  - Gatilho: "[frase citada]" — viola [regra]
- ...

## Pontuação geral de drift: X/10
(10 = perfeitamente on-voice; 0 = irreconhecível)

## Prioridade de fix (top 3)
1. [Mudança específica com exemplo]
2. [Mudança específica com exemplo]
3. [Mudança específica com exemplo]

Perfil e draft a seguir.
```

---

## Sua entrada

```
[Perfil de voz]
[cole perfil salvo completo]

[Draft]
[cole o draft completo que você quer auditado]
```

---

## Os sinais de drift para observar

**Contrabando de palavra banida.** O drift mais comum. A IA sabe que não pode usar "alavancar" — então escreve "aproveitar" ou "explorar" ou "destravar". Mesma forma semântica, palavra diferente. A regra: se uma frase significa a mesma coisa que uma palavra banida significaria, ainda é drift.

**Creep de comprimento de frase.** A voz tem média de 9 palavras. Na metade do draft, frases estão em 18 palavras e subindo. Isto é a IA padronizando de volta para prosa "suave". Sempre cheque comprimento de frase na metade de trás de qualquer draft longo.

**Aberturas genéricas.** "Em um mundo onde..." "Os [audiência] de hoje precisam..." "Todos nós já passamos por isso..." Qualquer uma destas numa voz que pontuou 5 em Direto/Diplomático é off-voice automático.

**Drift de três atos.** "Primeiro... Depois... Finalmente..." ou "Três coisas mudaram...". Se sua voz não se move assim, a IA vai impor essa estrutura mesmo assim. Pegue.

**Pilha de adjetivos.** "Mensagem ousada, espirituosa e confiante." Vozes não falam de si mesmas em adjetivos. Se o draft tem uma frase descrevendo a marca em ritmo de três adjetivos, isso é drift.

**Bajulação à audiência.** "Para fundadores que se recusam a se acomodar." "Para os poucos que entendem." Se o perfil de voz não inclui bajulação à audiência como dispositivo de framing, isso é drift — a IA está bajulando.

**"Animados em anunciar".** Qualquer voz que não é um press release de 2007 nunca deveria usar essa frase. Trate como off-voice automático.

---

## Exemplo trabalhado

**Perfil (truncado):**
```
Voz: Solo Builder
Load-bearing: Direto/Diplomático 5 (aberturas veredito primeiro), Sério/Brincalhão 2 (seco, sem piadas)
Frase média: 9 palavras
Lista de banimento: alavancar, transformar, destravar, jornada, paixão, ecossistema, animados em anunciar
```

**Draft para auditar:**
> "Estamos animados em compartilhar algo no qual estivemos trabalhando há um longo tempo. No mundo acelerado de hoje, fundadores estão constantemente equilibrando prioridades e lutando para encontrar o tempo de focar no que verdadeiramente importa. É por isso que construímos uma ferramenta que destrava produtividade e te ajuda a transformar o jeito como você trabalha. Mal podemos esperar que você experimente."

**Output da auditoria:**

```
## Seção por seção
- Frase 1: off-voice
  - Gatilho: "Estamos animados em compartilhar" — viola lista de banimento (auto-flag para linguagem de press-release)
- Frase 2: off-voice
  - Gatilho: "No mundo acelerado de hoje" — viola lista de anti-padrões (abertura genérica); viola dispositivo de framing veredito primeiro
- Frase 3: off-voice
  - Gatilho: "destrava produtividade" + "transformar o jeito como você trabalha" — viola lista de banimento (destravar + transformar contrabandeados juntos)
- Frase 4: drift
  - Gatilho: "Mal podemos esperar que você experimente" — viola Direto/Diplomático 5 (isto é calor com hedge, não um veredito ou CTA)

## Pontuação geral de drift: 1/10
(Irreconhecível como a voz salva. Isto lê como output default de IA.)

## Prioridade de fix (top 3)
1. Reescreva a abertura como veredito. Exemplo: "Entreguei uma ferramenta que roda as cinco tarefas administrativas em que fundadores desperdiçam um dia."
2. Elimine a frase do meio inteira. A voz não explica — ela afirma e segue.
3. Substitua o fechamento caloroso por um CTA direto. Exemplo: "Link abaixo."
```

Esse é o teste. Se a auditoria diz "perfeitamente on-voice" e você pode ver drift no draft, a auditoria está errada — re-cole o perfil e rode de novo. Detecção honesta de drift é mais útil do que um passe falso.

---

## Quando rodar detecção de drift

- Antes de qualquer asset de alto risco ir ao ar (página de venda, post de captação, e-mail de launch, manifesto)
- Em toda reescrita que a IA te entrega para conteúdo longform (acima de 400 palavras)
- Quando você suspeita que sua voz mudou mas não consegue articular por quê — rode em três assets recentes e compare
- Trimestralmente no seu conteúdo publicado, como check de calibração antes de extrair um perfil novo
