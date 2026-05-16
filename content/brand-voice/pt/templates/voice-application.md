# Aplicação de Voz

Use isto uma vez que você tem um perfil de voz salvo. Cole o perfil + o draft que você quer reescrito. A IA produz uma reescrita com voz e um self-check.

---

## O prompt

```
Você está aplicando um perfil de brand voice salvo a um draft. Regras:

1. Leia o perfil inteiro antes de começar. Pese mais os eixos load-bearing (1s e 5s).
2. Use a assinatura de vocabulário como guia. Use a lista de banimento como filtro rígido — se você se estende a uma palavra banida, substitua.
3. Combine com a média de comprimento de frase. Não produza frases 2x a média.
4. Use o dispositivo de framing na abertura. A primeira frase é onde a voz é mais visível.
5. Depois da reescrita, rode um self-check: para cada parágrafo ou bloco maior, rotule on-voice / drift / off-voice. Cite qualquer linha específica sobre a qual você está inseguro.

Formato de output:

## Reescrita
[sua versão com voz]

## Self-check
- Parágrafo 1: on-voice / drift / off-voice — [razão]
- Parágrafo 2: on-voice / drift / off-voice — [razão]
- ...
- Linhas sobre as quais estou inseguro:
  - "[linha citada]" — [razão para a flag]

Perfil e draft a seguir.
```

---

## Sua entrada embaixo

```
[Perfil de voz]
[cole o perfil salvo completo aqui]

[Draft]
[cole o copy genérico, bruto ou com sabor de concorrente que você quer reescrito]

[Objetivo]
Para que é? Que ação o leitor deve tomar após ler?

[Restrições (opcional)]
- Cap de comprimento
- Formato (e-mail, hero de landing, copy de anúncio, thread de tweet, etc.)
- Fatos específicos que precisam permanecer na reescrita
```

---

## Exemplo trabalhado

**Perfil (truncado):**
```
Voz: Solo Builder
Load-bearing: Sério/Brincalhão 2 (seco), Direto/Diplomático 5 (veredito primeiro)
Frase média: 9 palavras
Estende-se a: entregar, hard pass, eis, coisa
Nunca usa: alavancar, transformar, destravar, jornada, paixão, ecossistema
Framing: abertura veredito primeiro; corpo explica
```

**Draft (output genérico de IA):**
> "Estamos empolgados em anunciar o lançamento da nossa nova plataforma de produtividade desenhada para ajudar fundadores ocupados a otimizar suas operações diárias através de tecnologia de IA de ponta, permitindo que se concentrem no que verdadeiramente importa: construir o negócio dos seus sonhos e transformar suas vidas."

**Objetivo:** E-mail anunciando o launch para minha newsletter. Quero cliques para a página do produto.

**Reescrita:**
> Entreguei a ferramenta de produtividade. Ela roda as cinco tarefas administrativas em que você desperdiça um dia. Leva cerca de um minuto para configurar. Link abaixo.

**Self-check:**
- Frase 1: on-voice — abertura veredito primeiro, 4 palavras, usa "entreguei" da assinatura de vocabulário.
- Frase 2: on-voice — 11 palavras, segunda pessoa, sem jargão.
- Frase 3: on-voice — cadência de fragmento de 7 palavras.
- Frase 4: on-voice — mínima, termina num CTA sem vender.
- Linhas sobre as quais estou inseguro: nenhuma.

---

## Por que cada regra importa

**Leia o perfil inteiro.** Ferramentas de IA padronizam usando as primeiras linhas de qualquer prompt como peso maior. Se o perfil é o parágrafo 4 e o draft é o parágrafo 5, o draft vence. Forçar uma leitura completa com uma instrução explícita conserta isso.

**Pese mais os eixos load-bearing.** Uma voz pontuada 2 em Sério/Brincalhão com flag load-bearing significa que piadas são um não rígido. Uma voz pontuada 4 em Casual sem flag load-bearing significa que contrações estão ok mas gíria não é load-bearing. A IA precisa saber quais traços são não-negociáveis.

**Lista de banimento como filtro rígido.** Sem um filtro rígido, reescritas de IA contrabandeiam palavras banidas de volta via sinônimos. "Alavancar" é substituída por "aproveitar". "Destravar" vira "explorar". A regra é: se o significado bate com uma palavra banida, encontre uma forma de dizer sem essa forma semântica.

**Combine comprimento de frase.** Este é o marcador de ritmo mais fácil de impor e o que a IA mais erra. Uma voz de média de 9 palavras que de repente produz uma frase de 28 palavras lê como uma pessoa diferente.

**Dispositivo de framing na abertura.** Primeiras frases são onde a voz é mais diagnóstica. Se sua voz é veredito primeiro e a reescrita abre com "Em um mundo onde..." nada mais importa.

**Self-check com flags.** Flags honestos são mais úteis do que falsa confiança. Uma reescrita que diz "parágrafo 3 está derivando para genérico" te deixa consertar. Uma reescrita que alega que tudo passa quando o parágrafo 3 está claramente fora te força a re-ler e pegar você mesmo.
