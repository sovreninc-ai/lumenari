# Padrões de microcopy

## Botões

Botões descrevem um resultado, não uma ação do sistema. Começam com um verbo.

| Ruim | Bom |
|---|---|
| Submit | Enviar convite |
| OK | Salvar alterações |
| Processar | Pagar agora |
| Confirmar | Cancelar inscrição |
| Sim | Excluir evento |

A regra: leia o copy do botão isoladamente. Você consegue dizer o que está prestes a acontecer? Se não, reescreva.

Para ações destrutivas, o próprio verbo faz o aviso: "Excluir conta" — não "Tem certeza?" duas vezes seguidas.

## Empty states

Um empty state é a primeira impressão do usuário de uma tela. Não desperdice em "Nenhum item encontrado".

O formato:

```
[ Ícone — discreto, não decorativo ]

Headline que explica o que essa tela faz
quando tem conteúdo (1 frase)

Frase de body que explica como chegar lá.

[ O CTA que leva para lá ]
```

Exemplos:

> **Sua biblioteca está vazia por enquanto.**
> Depois que você comprar um kit, todo download que você precisar mora aqui.
> [ Ver kits → ]

> **Nenhum evento essa semana.**
> Quando seu técnico marcar um treino ou jogo, aparece aqui.
> [ Ver próximos → ]

## Erros

Uma boa mensagem de erro responde três perguntas:
1. O que aconteceu?
2. De quem foi a culpa (sistema ou eu)?
3. O que eu faço agora?

```
Não foi possível salvar seu rascunho.
Perdemos a conexão. Tente de novo — seu texto continua aqui.
[ Tentar de novo ] [ Salvar cópia offline ]
```

Coisas a evitar:
- "Algo deu errado" — inútil
- Códigos de erro sozinhos — são para suporte, não para o usuário (coloque nos detalhes, não no headline)
- Culpar o usuário implicitamente ("entrada inválida" — inválida segundo quem?)
- Stack traces

## Onboarding

Cada passo de onboarding tem um trabalho. Não combine trabalhos.

O padrão de onboarding da Apple geralmente é:
1. **Tela de welcome / proposta de valor** — o que esse app faz, uma frase
2. **O único pedido de permissão que importa** — e só esse
3. **A primeira tela útil** — não um tutorial, o produto real

Anti-padrão: um carrossel de 5 telas explicando cada feature. O usuário ainda não ganhou a paciência para ler isso.

Se uma feature precisa ser explicada, explique inline na primeira vez que aparece, com um "Entendi" ou "OK" para fechar.

## Diálogos de confirmação

Reserve para ações irreversíveis ou caras. Cada um é imposto de fricção.

Formato:

```
O que está prestes a acontecer (1-2 frases, específico)

[ Cancelar ] [ Verbo-da-ação ]
```

Exemplo:

> **Excluir esse evento?**
> Os 14 RSVPs e qualquer arquivo enviado também serão removidos.
>
> [ Cancelar ] [ Excluir evento ]

Note: o botão primário é o verbo da ação, não "Sim". O cancelar é secundário, não com o mesmo peso.

## Loading states

Três sabores:

1. **< 200ms** — não mostra nada. O olho não percebe.
2. **200ms - 2s** — um spinner discreto ou skeleton no lugar do conteúdo que falta.
3. **> 2s** — mensagem explícita: "Gerando suas recomendações de kit…" — para o usuário saber que algo está acontecendo em nome dele.

Spinners indeterminados são honestos só quando você realmente não consegue estimar. Se consegue estimar, use uma progress bar.

## Estados de sucesso

Uma ação bem-sucedida não precisa de um modal se parabenizando. Um toast, um check, um slide-in discreto dizendo "Salvo" basta.

Reserve estados comemorativos para marcos genuínos (primeira fatura paga, milésimo cliente etc.) — e mesmo aí, mantenha breve.
