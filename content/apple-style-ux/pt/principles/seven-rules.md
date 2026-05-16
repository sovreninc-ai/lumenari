# As Sete Regras — versão longa

## 1. Uma ação primária por tela.

O cérebro leva algumas centenas de ms para descobrir o que olhar numa tela nova. Se tem três botões com o mesmo estilo, são trezentos ms perdidos. Se tem um botão obviamente primário e um obviamente secundário, o usuário já decidiu em zero ms.

**Regra visual:** só um botão preenchido por tela. Todo o resto é link de texto, outline ou ícone.

**Anti-exemplo:** o rodapé de um diálogo "tem certeza?" com três botões vermelhos preenchidos. Escolha um.

## 2. Português simples ganha.

O copy da Apple lê como um amigo te contando o que está prestes a acontecer.

| Copy corporativo | Copy estilo Apple |
|---|---|
| Inicializar processo de backup | Fazer backup agora |
| Configurar preferências de notificação | Escolher sobre o que ser notificado |
| Autenticação requerida | Entrar para continuar |
| Ocorreu um erro (Erro 0x9F) | Não foi possível salvar. Verifique sua conexão e tente de novo. |

Se você não falaria isso para um amigo na sua cozinha, não bote na tela.

## 3. Default para "só faz".

Quando 90% dos usuários querem o mesmo resultado, perguntar é fricção. Exemplos:

- **Ruim:** "Quer habilitar autosave?" (sim, óbvio)
- **Bom:** salva automaticamente. Mostra "Todas as alterações salvas" no chrome.

- **Ruim:** "Gostaria de receber confirmações por e-mail?" (sim, óbvio)
- **Bom:** manda a confirmação. Inclua um link de Unsubscribe.

- **Ruim:** "Permitir notificações?" no primeiro launch
- **Bom:** espere até o usuário estar prestes a fazer algo em que uma notificação é genuinamente útil, e aí pergunte no contexto.

A exceção são ações irreversíveis ou caras — essas merecem uma confirmação.

## 4. Whitespace é uma feature.

A maioria dos designs está 20-30% apertada demais. Tente aumentar todo padding em 1,25x e todo gap em 1,5x. Quase sempre fica melhor.

**Regra do polegar:** se dois elementos visuais adjacentes parecem pertencer um ao outro quando não deveriam, aumente o gap. Se parecem separados quando não deveriam, diminua. Ajuste até a relação ficar inequívoca.

## 5. Hierarquia por tamanho + peso, não cor + caixas.

Uma página pode ter:
- Um H1 (32-48px, semibold)
- Um punhado de H2s (22-28px, semibold)
- Texto de body (16-17px, regular)
- Algumas captions (13-14px, regular, muted)

Isso é hierarquia suficiente para quase qualquer tela. Adicionar badges coloridos, drop shadows e caixas em volta das coisas geralmente é sinal de que a escala tipográfica não está fazendo o trabalho dela.

## 6. Progressive disclosure.

A primeira vez que um usuário vê uma feature, mostre os 20% que vão ser usados 80% do tempo. Esconda o resto atrás de:

- Um toggle "Mais opções"
- Uma segunda tela
- Um painel de detalhe na direita
- Long-press / right-click

**Anti-exemplo:** uma tela de settings com 40 toggles numa lista flat. Os primeiros 6 deviam ser óbvios; os 34 seguintes deviam estar numa seção "Avançado" que abre no toque.

## 7. Animação tem motivo ou não existe.

As animações da Apple têm um de três trabalhos:
1. **Manter continuidade espacial** — quando algo aparece, anime de onde veio (um modal sobe pelo fundo da tela, uma view de detalhe entra pela direita).
2. **Comunicar mudança de estado** — um check sendo desenhado depois de um save bem-sucedido.
3. **Mascarar a espera** — um fade-in de 200ms num card recém-carregado é melhor que um pop seco.

É isso. Bounce no hover, parallax pelo parallax, glow no clique — tudo isso lê como "queríamos parecer modernos" em vez de "queríamos ser úteis".

**Regras de timing:**
- 150-250ms: a maioria das microinterações
- 300-400ms: transições de página
- > 500ms: raro e intencional

**Easing:** cubic-bezier(0.16, 1, 0.3, 1) para "coisas que devem parecer snappy e naturais" — a Apple usa algo parecido.

---

## Como aplicar isso

Pegue uma tela que você já lançou. Leia as regras em ordem. Para cada regra, pergunte: "Onde essa tela está violando isso?". Não tente arrumar tudo de uma vez — arrume a que está mais violada.

O mesmo truque funciona para o output de design da sua IA. Cole esse arquivo no system prompt e peça: "Revise essa tela contra as sete regras. Me diga qual é a mais violada."
