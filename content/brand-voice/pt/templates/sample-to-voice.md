# Extrator de Amostra para Voz

Cole este prompt no topo de um chat novo (ou num slot de system prompt), depois cole suas amostras embaixo. O output é um perfil de voz completo que você pode salvar como `voice-profile.md` e reusar em toda sessão futura.

---

## O prompt

```
Você é um editor de brand voice. Vou colar 3-5 amostras de escrita. Seu trabalho é extrair um perfil de voz reutilizável.

Regras:
- Toda observação precisa citar uma linha específica das amostras. Sem alegações sem citação.
- Pontue quatro eixos de atributo de voz 1-5. Sinalize qualquer 1 ou 5 como load-bearing.
- Meça estrutura de frase quantitativamente (média de comprimento em palavras, variação, fragmentos, aberturas comuns).
- Produza uma assinatura de vocabulário (palavras pelas quais as amostras se estendem) e uma lista de banimento (palavras de IA default conspicuamente ausentes).
- Nomeie o dispositivo de framing — o movimento retórico recorrente que ancora a voz.
- Sem arquétipos. Sem essência de marca. Sem pilhas de adjetivos ("ousado, espirituoso, confiante").

Schema de output (use exatamente):

# Voice Profile — [Nome]
_Extraído de N amostras em [data]_

## Pontuações de atributo de voz
- Formal/Casual: X (load-bearing: s/n) — [observação]
- Sério/Brincalhão: X (load-bearing: s/n) — [observação]
- Direto/Diplomático: X (load-bearing: s/n) — [observação]
- Técnico/Acessível: X (load-bearing: s/n) — [observação]

## Estrutura de frase
- Comprimento médio: ~N palavras
- Variação: apertada / mista / ampla
- Fragmentos: raros / ocasionais / frequentes (cite um)
- Aberturas comuns: [liste 2-3 padrões]

## Assinatura de vocabulário
**Estende-se a:** palavra1, palavra2, palavra3, palavra4
**Nunca usa:** palavra1, palavra2, palavra3, palavra4

## Dispositivo de framing
[1-2 frases nomeando o movimento recorrente, com um exemplo citado.]

## Anti-padrões para sinalizar
- [3-5 coisas concretas para pegar em drafts futuros]

## Exemplo on-voice (das amostras)
> [frase mais forte da amostra]

## Exemplo off-voice (default genérico de IA)
> [uma frase que a IA produziria naturalmente que viola esta voz]

---

Amostras a seguir. Rotule cada uma para que eu possa citar limpo.
```

---

## Seu formato de entrada embaixo do prompt

```
Amostra 1 — [post de LinkedIn / intro de newsletter / copy de landing / etc.]
[cole amostra]

Amostra 2 — [rótulo]
[cole amostra]

Amostra 3 — [rótulo]
[cole amostra]

Amostra 4 (opcional) — [rótulo]
[cole amostra]

Amostra 5 (opcional) — [rótulo]
[cole amostra]

Contexto:
- Quem lê o output desta voz? [audiência]
- Para que é geralmente usado? [e-mails, páginas de venda, social, etc.]

Restrições:
- [Qualquer coisa proibida — sem palavrão, sem primeira pessoa, nunca nomear concorrentes, etc.]
```

---

## Escolha de amostras — a parte que a maioria das pessoas erra

As amostras que você alimenta são o teto da voz que você recebe de volta. Escolha mal, receba resultados ruins.

**Boas amostras:**
- Coisas que você escreveu que você entregaria de novo sem mudanças
- Coisas que clientes, leitores ou seu time especificamente apontaram como soando como você no seu melhor
- Uma peça que pousou — conseguiu a reunião, conseguiu a resposta, conseguiu o compartilhamento

**Amostras ruins:**
- Coisas que você escreveu com pressa e não ama
- Uma peça formal que você escreveu porque a situação demandou (e-mail de conselho, aviso legal)
- Uma peça num tom que você de fato não quer mais
- Qualquer coisa que você não escreveu (a menos que esteja explicitamente combinando com outra voz — diga no rótulo)

**Número de amostras:**
- 3 é o mínimo. Abaixo disso, observações não são aterradas.
- 5 é o sweet spot para a maioria das vozes.
- Mais de 7 começa a diluir o sinal — a IA tira a média entre elas e perde a aresta.

---

## Exemplo trabalhado — como é um bom output

**Amostras de entrada:**
> Amostra 1 (intro de newsletter): "Entreguei uma coisa e quebrei duas vezes. Eis o que aprendi na segunda vez."
>
> Amostra 2 (LinkedIn): "Hard pass na discovery call. Queriam 12 meses e não definiriam sucesso."
>
> Amostra 3 (hero de landing): "Você não precisa de outro framework. Entregue uma coisa esta semana. Eis aqui."

**Perfil de output:**

```
# Voice Profile — Solo Builder
_Extraído de 3 amostras em 2026-05-14_

## Pontuações de atributo de voz
- Formal/Casual: 4 (load-bearing: não) — Contrações, sem gíria. "Entreguei uma coisa" não "Lancei um novo produto".
- Sério/Brincalhão: 2 (load-bearing: sim) — Zero piadas. Seco onde é engraçado. "Quebrei duas vezes" é a coisa mais próxima de humor.
- Direto/Diplomático: 5 (load-bearing: sim) — Toda abertura lidera com o veredito. "Hard pass na discovery call."
- Técnico/Acessível: 2 (load-bearing: não) — Zero jargão. "Definir sucesso" não "estabelecer KPIs".

## Estrutura de frase
- Comprimento médio: ~9 palavras
- Variação: apertada (faixa 5-12)
- Fragmentos: ocasional — "Eis aqui."
- Aberturas comuns: verbo primeiro ("Entreguei..."), veredito primeiro ("Hard pass..."), comando em segunda pessoa ("Você não precisa...")

## Assinatura de vocabulário
**Estende-se a:** entregar, hard pass, eis, coisa, quebrei, semana
**Nunca usa:** alavancar, transformar, destravar, framework (usa ironicamente), paixão, jornada, ecossistema

## Dispositivo de framing
Veredito primeiro. A primeira frase de toda amostra estabelece a conclusão ou a chamada. O corpo explica. Exemplo: "Hard pass na discovery call. Queriam 12 meses e não definiriam sucesso."

## Anti-padrões para sinalizar
- Qualquer frase abrindo com "No cenário acelerado de hoje..."
- Qualquer uso de "transformar", "destravar", "elevar", "alavancar"
- Frases acima de 18 palavras (sinal de drift)
- Aberturas em três atos ("Primeiro... Depois... Finalmente...")

## Exemplo on-voice (das amostras)
> "Você não precisa de outro framework. Entregue uma coisa esta semana. Eis aqui."

## Exemplo off-voice (default genérico de IA)
> "Estamos animados em apresentar nosso novo framework desenhado para ajudar fundadores ocupados a otimizar seus workflows e destravar seu potencial total."
```

Esse é o perfil. Salve como `voice-profile.md`. Reuse.
