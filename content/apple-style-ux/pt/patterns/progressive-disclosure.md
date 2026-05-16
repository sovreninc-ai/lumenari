# Progressive disclosure — mostre os 20% primeiro

O princípio: nunca mostre no primeiro contato o que 80% dos usuários não vão precisar.

## Formulários

Um formulário com 14 campos espanta. Três padrões para comprimir:

### A. Só obrigatórios no início

Mostre só os campos genuinamente obrigatórios. Adicione um toggle "Mais detalhes" abaixo para os opcionais.

```
Nome *
E-mail *

▸ Mais detalhes (3 campos opcionais)

[ Continuar ]
```

### B. Multi-step com uma seção por tela

Cada tela são 2-4 campos, coluna única. O usuário vê exatamente o que falta ("Passo 2 de 4").

Não finja multi-step quebrando um form de 14 campos em 7 telas de 2 campos — isso é pior. Agrupe com sentido.

### C. Smart defaults

Se 80% dos usuários escolheriam o mesmo valor, pré-preencha. Mencione no texto auxiliar do campo.

```
Moeda: CAD (seu IP sugere Canadá)
```

## Settings

Telas de settings são as piores em violar isso. A estrutura canônica estilo Apple:

```
Mais comuns (≤5 itens)
─────────────────────
Item A
Item B
Item C

Avançado
─────────────────────
▸ Conta & privacidade (8 itens)
▸ Notificações (12 itens)
▸ Developer (6 itens)
```

Agrupe pelo modelo mental do usuário, não pelo seu modelo interno de dados.

## Dashboards

Um dashboard deve responder uma pergunta acima da dobra: "Como está minha coisa?"

Todo o resto é território de scroll. A dobra de cima:

```
[ Número grande — métrica primária ]
[ Resumo de uma frase ]
[ Um único sparkline ou visual ]
```

Abaixo, dados mais profundos. O usuário só dá scroll se quiser.

## Páginas de detalhe

Mostre o essencial no load inicial. Esconda o detalhe denso atrás de abas ou expand-no-clique.

Por exemplo, numa página de detalhe de kit:
- Acima da dobra: nome, tagline, preço, CTA primário
- Abaixo da dobra: o que tem dentro (5 bullets, não 50)
- "Arquivos que você vai receber" — lista fechada por default a menos que o usuário clique para expandir

## Quando NÃO usar progressive disclosure

- Info crítica (consentimento, preço, política de refund) — nunca escondida.
- Erros — sempre imediatamente visíveis.
- Confirmações obrigatórias em ações destrutivas — nunca escondidas.
- Qualquer coisa legalmente obrigada a ser visível.

## Como escolher o que mostrar

Pergunte: "Se o usuário passasse só 5 segundos nessa tela, qual é a única coisa que ele precisa levar embora?"

Isso vai acima da dobra, no maior tipo, com mais contraste. Todo o resto é secundário.
