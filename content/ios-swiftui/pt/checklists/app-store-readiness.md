# Checklist de App Store Readiness

A lista para rodar antes de bater em **Submit for Review** no App Store Connect. Ordenado pelo que mais rejeita app, não pelo que é mais divertido fazer.

---

## 1. Privacy manifest (`PrivacyInfo.xcprivacy`)

**Obrigatório desde maio de 2024** para qualquer app usando uma API required-reason. Manifests faltando são rejeitados na submissão, não no review.

Adicione `PrivacyInfo.xcprivacy` ao target do seu app. A estrutura:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
    <key>NSPrivacyCollectedDataTypes</key>
    <array>
        <!-- um dict por categoria de dado -->
    </array>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>CA92.1</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
```

Categorias de API required-reason que você quase certamente precisa:

| Se seu app usa... | Categoria de API | Código de motivo comum |
| --- | --- | --- |
| `UserDefaults` | `NSPrivacyAccessedAPICategoryUserDefaults` | `CA92.1` (dados do próprio app) |
| timestamps de `FileManager` | `NSPrivacyAccessedAPICategoryFileTimestamp` | `C617.1` (sync/backup), `DDA9.1` (exibir ao usuário) |
| `systemUptime` / boot time | `NSPrivacyAccessedAPICategorySystemBootTime` | `35F9.1` (timestamp de eventos do app) |
| Consultas de espaço em disco | `NSPrivacyAccessedAPICategoryDiskSpace` | `85F4.1` (exibir ao usuário) |
| leituras de `UIPasteboard` no launch | `NSPrivacyAccessedAPICategoryActiveKeyboards` | `54BD.1` (tradução) |

SDKs de terceiros agora trazem os próprios privacy manifests. Quando você upgrada uma dependência, cheque se ela adicionou um. O Xcode agrega no build time.

---

## 2. Detalhes de App Privacy no App Store Connect

Separado do manifest. Preenchido pela UI web do App Store Connect em seu app → App Privacy.

Categorias para declarar honestamente:

- **Contact Info** (nome, e-mail) — se você coleta no signup
- **Identifiers** (user ID, device ID)
- **Usage Data** (interação com produto)
- **Diagnostics** (crash logs, dados de performance)
- **Purchases** — se você processa pagamentos
- **Location** — coarse vs. precise, e se está vinculado à identidade

Para cada: está vinculado à identidade do usuário? Usado para tracking? Usado para fornecer funcionalidade do app? Mentir aqui é motivo para remoção.

---

## 3. Screenshots de device obrigatórios

O App Store Connect exige screenshots para tamanhos específicos de display. A partir de 2024:

| Device | Tamanho exigido | Display |
| --- | --- | --- |
| iPhone 6.7" (15/16 Pro Max) | 1290 × 2796 | Obrigatório |
| iPhone 6.1" (15/16 Pro) | 1179 × 2556 | Obrigatório se 6.7" não for fornecido |
| iPhone 5.5" (8 Plus) | 1242 × 2208 | Obrigatório para targets antigos |
| iPad Pro 12.9" (6ª gen) | 2048 × 2732 | Obrigatório se o app suporta iPad |
| iPad Pro 13" (M4) | 2064 × 2752 | Opcional |

Você pode usar o Screenshot Designer da Apple no App Store Connect, mas a maioria dos times gera com Fastlane Snapshot ou faz mockups no Figma e exporta nas resoluções certas.

Mínimo: 3 screenshots por device obrigatório. Recomendado: 5-10. O primeiro screenshot é o que aparece nos resultados de busca — capricha.

---

## 4. Metadata

- **App name**: 30 caracteres máx. Precisa bater com o bundle.
- **Subtitle**: 30 caracteres. Visível nos resultados de busca.
- **Promotional text**: 170 caracteres. Editável sem resubmeter — use para mensagem de tempo limitado.
- **Description**: 4.000 caracteres. Primeiras 3 linhas visíveis antes do "mais". Comece com o valor, não a lista de features.
- **Keywords**: 100 caracteres no total, separados por vírgula. Não inclua palavras que já estão no nome do app ou na categoria — a Apple indexa automaticamente.
- **Support URL**: obrigatória e pública.
- **Privacy policy URL**: obrigatória para qualquer app que coleta dados.
- **What's New**: 4.000 caracteres. Obrigatório em todo update. "Correções de bugs e melhorias" ainda funciona, mas revisores preferem específicos.

---

## 5. Configurações de build + capabilities

- [ ] **Deployment target** definido corretamente. Mais baixo = mais usuários, mais código de compat. iOS 17 é um piso razoável para apps novos visando `@Observable` + SwiftData.
- [ ] **Bundle ID** bate com container CloudKit, cert de push notification, identificadores de App Group.
- [ ] **Version + build numbers** incrementados. App Store Connect rejeita builds duplicados.
- [ ] **App Transport Security**: sem `NSAllowsArbitraryLoads` a menos que você tenha documentado por quê.
- [ ] **Background Modes**: só o que você realmente usa. Revisores perguntam por quê.
- [ ] **Capabilities**: iCloud, Sign in with Apple, Push Notifications — cada um precisa estar no arquivo de entitlements E configurado no App Store Connect.

---

## 6. Sign in with Apple

Se seu app oferece qualquer login social de terceiro (Google, Facebook etc.), a Apple exige que você também ofereça Sign in with Apple. Isso é App Store Review Guideline 4.8 e é aplicada.

Isenções:

- Seu próprio sistema de conta (sem social de terceiro) → sem obrigação
- Apps Education / Enterprise / Business que usam auth corporativa específica → isentos
- Apps que usam provedores de identidade tipo ID.me ou auth governamental → isentos

Na dúvida, adicione Sign in with Apple. São dois dias de trabalho para esquivar de uma rejeição.

---

## 7. In-app purchase

Se você vende bens digitais consumidos dentro do app, PRECISA ser StoreKit. Sem links externos de pagamento, sem QR codes apontando para o checkout do seu site. Guideline 3.1.1.

Exceções:

- Apps "Reader" (Spotify, Netflix, Kindle) podem linkar para fora — mas precisam do External Link Account Entitlement e de um disclaimer específico
- Bens físicos, serviços consumidos fora do app (Uber, anúncios imobiliários) — Stripe está ok
- Serviços pessoa-para-pessoa (tutoria online, trabalho freelance) — Stripe está ok

Sandbox-teste todo fluxo de IAP. Cancele + reassine. Botão Restore Purchases é obrigatório.

---

## 8. Auditoria de acessibilidade

As quatro coisas que os revisores checam:

- [ ] **Labels de VoiceOver** em todo botão só com ícone (`accessibilityLabel`)
- [ ] **Dynamic Type** em AX5 (maior tamanho de acessibilidade) — sem texto cortado
- [ ] **Contraste de cor** 4,5:1 para texto de body, 3:1 para texto grande (WCAG AA)
- [ ] Alternativa de **Reduced motion** para animações grandes

Rode o Accessibility Inspector do Xcode em cada tela primária.

---

## 9. Crash & performance

- [ ] Sem caminhos de `fatalError(...)` alcançáveis a partir de input do usuário
- [ ] App lança em menos de 400ms num device de 3 anos
- [ ] Nenhum `print(...)` deixado em código de produção — substitua por `Logger`
- [ ] Uso de memória feito profile com Instruments → Allocations
- [ ] Sem retain cycles (Instruments → Leaks)
- [ ] Chamadas de rede têm timeouts (timeout default do `URLSession` é 60s — set explícitos)

Rode num device real, não só no Simulator. Características de performance são diferentes.

---

## 10. TestFlight antes da submissão

Sempre faça pelo menos um ciclo de TestFlight antes de submeter:

1. Arquive a build (Product → Archive no Xcode)
2. Upload via Organizer
3. Espere processar (~10 minutos)
4. Adicione ao grupo Internal Testing (até 100 testers, sem review necessário)
5. Mande para 3-5 pessoas em quem você confia para realmente testar
6. Espere 48 horas pelo feedback
7. Conserte o que apareceu
8. Submeta para App Store Review

TestFlight externo (até 10.000 testers) requer um "Beta App Review" — normalmente 24 horas, mais leve que o App Store Review completo.

---

## 11. As 24 horas depois de submeter

- App Store Review normalmente leva 24-48 horas.
- Se rejeitado, o e-mail diz qual número de guideline. Leia duas vezes antes de responder.
- Você pode responder à rejeição via Resolution Center no App Store Connect. Seja educado, seja específico, faça perguntas de esclarecimento se a rejeição for vaga.
- A maioria das rejeições que parecem duras são passes de bot. Um humano vai ler seu appeal se você escrever um.

Rejeições comuns de primeira vez:

- **2.1 (App Completeness)**: screenshots faltando, credenciais de conta demo, privacy policy URL faltando
- **4.0 (Design)**: app parece página web, não segue convenções iOS
- **4.8 (Sign in with Apple)**: oferecido login social sem Sign in with Apple
- **5.1.1 (Data Collection and Storage)**: coletando dados sem declarar em App Privacy

---

## Passada final de 5 minutos pré-submit

- [ ] Archive feito a partir da branch `main` com versão bumpada
- [ ] Privacy manifest presente e lista toda API required-reason
- [ ] Seção App Privacy no App Store Connect bate com o que o app realmente faz
- [ ] Screenshots subidos para todos os tamanhos de device obrigatórios
- [ ] Credenciais de conta demo fornecidas (se login é exigido) na seção App Review Information
- [ ] Build testada num device real, não só no Simulator
- [ ] Texto What's New escrito (não "Bug fixes")
- [ ] Sign in with Apple oferecido (se qualquer outro login social é oferecido)
- [ ] Nenhum `print()`, nenhum `// TODO`, nenhuma API key de teste, nenhum menu de debug alcançável em builds de produção
