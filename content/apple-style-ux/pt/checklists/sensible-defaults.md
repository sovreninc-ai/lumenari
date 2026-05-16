# Checklist de Sensible Defaults

A regra: pergunte ao usuário só quando a resposta realmente importa e você não consegue inferir.

## Defaults para aplicar silenciosamente

| Decisão | Sensible default |
|---|---|
| Moeda | País detectado pelo IP do usuário, com um switcher de um toque |
| Idioma | Header `Accept-Language` do browser, switcher nas settings |
| Timezone | Detectado pelo browser, mostrado mas não interrompendo |
| Formato de data | Apropriado ao locale (en-CA → YYYY-MM-DD; pt-BR → DD/MM/YYYY) |
| Onboarding na primeira vez | Pule o carrossel de welcome; caia direto no empty state |
| Frequência de e-mail | Transacional + update mensal de produto, com link de Unsubscribe |
| Tema | Seguir `prefers-color-scheme: dark` |
| Notificações | Off até o usuário fazer algo onde uma notificação seria útil |
| Autosave | On |
| Confirmação em destrutivo | On (o próprio diálogo é a fricção) |
| Formato de save | O formato em que abriram (PDF continua PDF, .md continua .md) |
| Ordem | Mais recente primeiro |
| Paginação | 20 itens por página |

Se você se pega adicionando "gostaria de…" à UI, pergunte: posso só fazer a coisa e oferecer Desfazer?

## Quando perguntar ao usuário

Pergunte quando:

1. **A ação é destrutiva e não facilmente reversível.** Deletar uma conta, limpar histórico.
2. **A ação custa dinheiro de verdade.** Marcar uma sessão, processar um pagamento.
3. **A escolha afeta significativamente o comportamento posterior.** Escolher um nome de workspace, escolher um time para começar.
4. **Você genuinamente não consegue inferir.** Primeiro nome. Cargo. Por que estão usando o produto.

Pergunte uma coisa por tela. Não junte cinco perguntas num formulário só.

## Como perguntar bem

```
[ Pergunta de uma frase que também é heading ]

[ Texto de body — só se a pergunta precisa de contexto ]

[ A superfície de escolha — grupo de chips, radio ou campo de texto ]

[ Botão Continuar — desabilitado até uma escolha ser feita ]
```

Exemplos:

> **Qual esporte o seu clube treina?**
> Vamos configurar as faixas etárias, divisões e defaults de agendamento certos.
>
> [ Futebol ] [ Hockey ] [ Basquete ] [ Beisebol ] [ Outro ]
>
> [ Continuar → ]

vs. a versão ruim:

> ☐ Selecione seu esporte primário
> ☐ Selecione seu esporte secundário (opcional)
> ☐ Selecione a federação
> ☐ Selecione a duração típica de temporada
> ☐ Selecione as faixas etárias (multi-seleção)
>
> [ Submit ]

A versão ruim são cinco perguntas antes de qualquer resposta. A boa pergunta uma e infere o resto.

## A versão mais difícil

A versão mais difícil disso é: "o que essa IA deve fazer quando a intenção do usuário é ambígua?"

Default: escolha a interpretação mais plausível, faça a coisa, e diga ao usuário o que você fez. Ofereça trocar a interpretação.

```
Assumi que você quis dizer a temporada de primavera de 2026 (a ativa).
Se você quis dizer outra temporada, aqui tem como mudar.
```

É assim que as superfícies "Did you mean…?" da Apple funcionam. Não bloqueie; ofereça.
