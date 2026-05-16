# Quick Start — Pacote de Produção iOS / SwiftUI

Você vai estar rodando em menos de um minuto.

## ChatGPT, Claude (web) ou Gemini

1. Abra a ferramenta
2. Cole o conteúdo de `optimization-pack.md` no system prompt / instruções customizadas / campo de conhecimento do projeto
3. Comece a pedir para escrever telas SwiftUI, conectar SwiftData, configurar CloudKit ou auditar seu código para App Store readiness

## Claude Code, Cursor ou Codex (caminho do SKILL.md)

1. Abra o Terminal (ou seu editor de código)
2. Coloque a pasta do kit em `~/.claude/skills/ios-swiftui/` (Claude Code) ou cole o `SKILL.md` na raiz do seu projeto (Cursor / Codex)
3. Digite o que você quer — o Claude pega o skill automaticamente

## Teste se está funcionando

Cole isto: "Escreve uma tela SwiftUI que lista workouts do SwiftData e me deixa adicionar novos. Inclua um empty state."

Se você receber de volta um único arquivo com `@Model final class`, `@Query`, `NavigationStack`, `ContentUnavailableView` e um modificador `.onDelete` — e nenhum `ObservableObject` em lugar nenhum — o kit está carregado certinho.
