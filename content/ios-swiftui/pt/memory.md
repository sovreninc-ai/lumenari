# Memory — Pacote de Produção iOS / SwiftUI

## Contexto do domínio

Um dev SwiftUI lança features compondo structs `View` pequenos que leem state e retornam mais views. No dia a dia eles ficam entre o Xcode (a IDE), o Simulator (ou um device real no cabo), o Instruments (para performance) e a UI web do App Store Connect (para builds, TestFlight e submissão). A maioria lança um app por vez, normalmente solo ou num time de duas ou três pessoas.

O ciclo de trabalho é: escreve uma view, dá Cmd+R, vê o Canvas preview redesenhar, conserta um bug de layout, adiciona algum state, persiste com SwiftData, sincroniza via CloudKit, escreve um snapshot test, sobe para o TestFlight, recebe feedback, itera. As partes lentas são: App Store Review (24-48 horas), tempos de build em bases grandes e descobrir por que uma view SwiftUI não está atualizando quando você esperava.

Devs indie ligam para ranking de App Store, ASO, screenshots, reviews e o ciclo de rejeição-resubmissão. Devs de time ligam para arquitetura modular, cobertura de testes, velocidade de build e onboardar novos engenheiros sem um ritual de hazing de "conhecimento tribal do Xcode".

## Vocabulário que a IA deve conhecer

- **HIG**: Human Interface Guidelines — as regras de design da Apple. Atualizadas anualmente no WWDC.
- **WWDC**: Worldwide Developer Conference. Todo junho. OS novo, APIs novas.
- **SF Symbols**: a biblioteca de ícones da Apple, ~5.000 símbolos, disponíveis via `Image(systemName: "heart.fill")`.
- **TestFlight**: a distribuição beta da Apple. Até 100 testers internos, 10.000 externos. Build expira em 90 dias.
- **App Store Connect**: a UI web onde você gerencia builds, metadata, preço, TestFlight, App Store Review.
- **`@Observable`**: macro Swift (iOS 17+) substituindo `ObservableObject` + `@Published`. Rastreia leituras de propriedade automaticamente.
- **SwiftData**: o framework de persistência da Apple (iOS 17+), sucessor do Core Data. Classes `@Model`, leituras `@Query`.
- **CloudKit**: a sync na nuvem da Apple, gratuita para usuários, free tier generoso (1GB/usuário). Casa com SwiftData via `cloudKitDatabase: .automatic`.
- **Modificador `.task`**: roda uma task async com escopo no lifetime da view. Cancela no disappear.
- **Privacy manifest (`PrivacyInfo.xcprivacy`)**: um arquivo XML declarando uso de APIs required-reason e coleta de dados por SDKs de terceiros. Obrigatório para submissão à App Store desde maio de 2024.
- **App Store Review Guidelines**: as regras reais que os revisores impõem. Seções 2 (Performance), 4 (Design), 5 (Legal) são onde a maioria das rejeições acontece.
- **StoreKit 2**: a API moderna de in-app purchase. `Product`, `Transaction`, async-first.
- **ProMotion**: telas de 120Hz. Algumas animações precisam de `.animation(.smooth, value:)` explícito para parecer certo.
- **Catalyst**: rodar apps de iPad no Mac. Idiomas diferentes — pointer hover, menu bar, redimensionamento de janela.
- **visionOS**: o OS do headset. Apps volumétricos vs. de janela. Não é a mesma coisa que iOS.

## Workflows comuns

- **Adicionar uma tela com persistência**: define um `@Model`, adiciona uma `View` com `@Query`, adiciona um destination via `NavigationLink(value:)`, conecta a partir do `.navigationDestination(for:)` do parent.
- **Adicionar sync CloudKit**: habilita capability de CloudKit + Background Modes → set `cloudKitDatabase: .automatic` no `ModelConfiguration` → faz todas as propriedades do modelo terem default ou serem opcionais → testa em dois devices na mesma conta iCloud.
- **Subir para TestFlight**: bump no build number → Archive → upload via Xcode Organizer → espera processar (~10 min) → adiciona ao internal testing → convida testers → espera feedback.
- **Submeter para App Store Review**: preenche a seção App Privacy → sobe screenshots (6.7", 6.1", iPad 12.9" obrigatórios) → escreve um What's New → submete → responde perguntas do revisor em 24 horas.
- **Diagnosticar um bug de render do SwiftUI**: adiciona `.id(value)` para forçar recriação, ou `let _ = Self._printChanges()` dentro do body para ver o que disparou o redraw.

## O que evitar / erros comuns

- Misturar `ObservableObject` e `@Observable` no mesmo projeto sem motivo. Escolha um — `@Observable` em iOS 17+.
- Escrever `Task { @MainActor in ... }` em todo lugar em vez de marcar o modelo com `@MainActor` uma vez.
- Armazenar valores derivados (`var fullName: String`) como `@State`. Calcule. `var fullName: String { "\(first) \(last)" }`.
- Usar `GeometryReader` para layout quando um `HStack` + `Spacer` + alignment guides resolveria. `GeometryReader` é fallback, não default.
- Force-unwrap em `URL(string: "https://...")`. Ele é opcional por um motivo. Falhe fechado.
- Esquecer que o SwiftUI recria o body inteiro da view em toda mudança de state — deixe o body barato. Mova computações caras para fora.
- Hardcodar cores em hex quando o asset catalog suporta variantes light/dark + checadas em WCAG.
- Pular o privacy manifest porque "o app não coleta dado". Se você toca `UserDefaults`, timestamps de `FileManager`, system boot time ou espaço livre em disco — é API required-reason. Você precisa do manifest.

## Tom / registro

Um dev iOS de verdade fala em termos de "shipar" e "a build". Referencia sessões do WWDC por número ("a sessão sobre observation, 10149"). Desconfia de dependências de terceiros porque cada uma adiciona risco na App Store. Prefere frameworks da Apple mesmo quando estão rústicos. Diz "o Simulator está mentindo" quando algo funciona no device mas não no preview do Xcode. Usa Logger em vez de print. Já se queimou com confusão de lifecycle do AppDelegate. Vai absolutamente te dizer que SwiftUI é melhor que UIKit para trabalho novo, e aí silenciosamente escreve uma ponte UIKit quando a text view do SwiftUI não dá conta.
