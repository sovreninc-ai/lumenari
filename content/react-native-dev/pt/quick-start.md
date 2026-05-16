# Quick Start — Pacote de React Native / Mobile Dev

Você deve estar rodando em menos de 60 segundos. Escolha sua ferramenta.

## Usuários Claude

Abra o Claude. Crie um Projeto novo (plano Pro ou Team é necessário para projetos, mas o prompt funciona num chat normal também). No campo "Custom instructions" do projeto, cole o conteúdo inteiro de `optimization-pack.md`. Faça upload de `memory.md` e `patterns/component-and-native-modules.md` no conhecimento do projeto para o Claude ter como referência. Comece uma conversa nova. Primeira mensagem: conte ao Claude seu setup — "Estou em Expo bare workflow, RN 0.74, Nova Arquitetura ligada, mirando iOS + Android" — depois descreva o que está construindo.

## Usuários ChatGPT

Abra o ChatGPT. Clique "Explore GPTs" → "Create a GPT" (plano Plus exigido). No campo "Instructions", cole o conteúdo inteiro de `custom-gpt-instructions.md`. Em "Conversation starters", use os cinco listados no fim daquele arquivo. Em "Knowledge", suba `memory.md` e `patterns/component-and-native-modules.md`. Salve o GPT (privado para você está ok). Abra e comece com: "Expo bare, RN 0.74, iOS + Android. Quero fazer scaffold de uma tela nova."

Se você não tem ChatGPT Plus, cole `optimization-pack.md` no topo de um chat normal. Vai funcionar — você só perde o GPT persistente e os uploads de arquivo.

## Gemini, Cursor, Codex ou qualquer outra ferramenta de IA

Abra a ferramenta. Comece uma conversa nova. Cole o conteúdo inteiro de `optimization-pack.md` como sua primeira mensagem. Adicione: "Confirme que carregou isso e me pergunte meu workflow Expo, versão do RN e plataformas alvo." Quando responder, você está pronto.

Para Cursor especificamente: coloque o `SKILL.md` na raiz do seu projeto. As regras de projeto ou `.cursorrules` do Cursor vão pegar automaticamente.

---

## Teste se está funcionando

Quando carregar o system prompt, cole isto:

```
Test run. Expo bare workflow, RN 0.74, Nova Arquitetura ligada, mirando iOS 15+ e Android 8+. Preciso de uma tela que mostre uma lista de 500 mensagens de chat com avatares, puxada de uma API. Scroll fluido num Android de 3GB. Me dá o arquivo da tela, o componente de row e o hook de dados.
```

Se você receber de volta um `FlatList` (ou `FlashList`) com `keyExtractor` estável, uma row em `React.memo`, uma ref de `renderItem` extraída, dimensões de imagem definidas explicitamente, um hook de rede com abort-no-unmount e uma nota de divergência iOS/Android no fim — o kit está carregado certinho.

Se você receber de volta um `ScrollView` com `.map()`, ou inline `renderItem={(item) => <Row />}`, ou nenhuma menção a performance no Android, o system prompt não carregou — cole de novo.
