# Memory — Pacote de React Native / Mobile Dev

## Contexto do domínio

Um engenheiro React Native está construindo um app mobile cross-platform que precisa parecer nativo no iOS e no Android. Ele vive em dois mundos ao mesmo tempo: JavaScript/TypeScript para código de produto, mais Swift/Objective-C e Kotlin/Java quando um módulo nativo é inevitável. O trabalho é majoritariamente de produto — telas, navegação, listas, formulários, pagamentos, push, deep links — mas os piores bugs sempre moram na bridge: uma permissão negada de forma diferente no Android, um haptic que dispara duas vezes no iOS, uma lista que cai para 6fps quando rolada rápido num Android de 3GB.

O ritmo é build-test-rebuild. O bundler do Metro está rodando num terminal. Um simulator iOS e um emulator Android estão abertos. Toda mudança recarrega em menos de um segundo no iOS, mais lento no Android. Toda mudança de código nativo exige rebuild — `pod install`, depois um build do Xcode, ou um sync de Gradle. Uma sessão típica termina com uma build no TestFlight para QA em hardware iOS real e um APK do track interno empurrado para o Google Play Console para testers Android.

As lições caras nesse domínio são: nunca confie que o Expo Go bate com a build de produção, nunca pule teste num Android low-end real e nunca assuma paridade entre plataformas quando permissões ou comportamento em background estão envolvidos. A barra de envio é "parece nativo nos dois, não crasha em nenhum".

## Vocabulário que a IA deve conhecer

- Expo: toolchain React Native managed. "Managed workflow" esconde o código nativo; "bare workflow" expõe. EAS Build é o builder em nuvem deles
- Bridge: a camada de comunicação JS↔nativo. A "bridge antiga" são mensagens async serializadas em JSON. A "nova arquitetura" (Fabric + TurboModules + JSI) é síncrona via C++
- Hermes: o engine JS que vem com RN por default desde 0.70. Heap menor, startup mais rápido, sem `eval`. Confirme se está ligado
- Fabric: o novo renderer na nova arquitetura. Substitui o legacy UIManager
- TurboModule: um módulo nativo construído em cima do JSI para chamadas síncronas e type-safe
- JSI: JavaScript Interface, a camada C++ por baixo da nova arquitetura
- Reanimated: `react-native-reanimated` v3 — roda animações na UI thread via worklets, não na thread JS
- Worklet: uma função anotada com `'worklet'` que roda na UI thread dentro do Reanimated/Gesture Handler
- getItemLayout: a prop do FlatList que deixa o RN pular a medição — `{length, offset, index}` — exigida para scroll-to-index rápido em listas longas
- keyExtractor: a prop do FlatList que retorna um id string estável por linha; sem ela, o RN cai para o index e re-renderiza agressivamente
- FlashList: substituto drop-in do FlatList feito pela Shopify com recycling, bem melhor para listas com muitas imagens ou 1000+ itens
- MMKV: `react-native-mmkv`, um key-value store nativo ~30x mais rápido que AsyncStorage
- Pods: CocoaPods, o gerenciador de dependências do iOS. `pod install` sincroniza o `Podfile.lock` depois de mudanças nas deps JS
- Gradle: a ferramenta de build do Android. `./gradlew` é o wrapper. "Sync" puxa deps e regenera os arquivos do projeto
- APK / AAB: APK é o pacote de instalação Android legado; AAB (Android App Bundle) é o que a Play Store quer hoje
- TestFlight: distribuição beta da Apple. Até 10.000 testers externos, builds expiram em 90 dias
- Internal track: track de teste interno do Google Play Console — review mais rápido, até 100 testers, disponibilidade imediata
- ProGuard / R8: shrinker/obfuscator de código Android. R8 é o substituto moderno. Rode antes de builds de release
- Safe area: a região visível não bloqueada por notch, home indicator, status bar ou nav bar. Use `useSafeAreaInsets()`
- Splash screen / launch screen: iOS chama de launch storyboard, Android chama de splash. Os dois aparecem por ~200-800ms antes do JS iniciar
- APNs: Apple Push Notification service. Token é binário, base64, ~64 chars
- FCM: Firebase Cloud Messaging. Token é uma string opaca longa

## Workflows comuns

- Scaffold de tela com navegação + state: usuário quer uma tela nova conectada. Gatilho → cria `screens/NewScreen/index.tsx`, registra no stack navigator com params tipados, adiciona um arquivo de hook para state local da tela, sobe qualquer state compartilhado para Zustand/Jotai → conecta a union de tipos de navigation → smoke test do gesto de voltar no iOS e do hardware back no Android.
- Passada de performance no FlatList: usuário reporta scroll travado numa lista longa. Gatilho → auditar `keyExtractor` (precisa retornar string id estável), auditar `renderItem` (precisa ser ref estável via `useCallback` ou componente fora do parent), adicionar `getItemLayout` se as rows têm altura uniforme, embrulhar o componente de row em `React.memo`, checar `removeClippedSubviews` no Android → benchmark num Android low-end, não no simulator.
- Wrapper de módulo nativo: usuário precisa de uma feature do OS sem biblioteca mantida (ex.: protocolo BLE custom, câmera de hardware específico, Apple Wallet pass). Gatilho → escreve uma classe Swift conformando a `RCTBridgeModule` (ou uma spec de TurboModule), escreve o equivalente Kotlin estendendo `ReactContextBaseJavaModule`, escreve o wrapper TypeScript com referência a `NativeModules.X` e uma superfície tipada, registra permissões no `Info.plist` se necessário.
- Submissão à App Store / Play Store: usuário pronto para enviar. Gatilho → bumpa version + build number, roda R8/ProGuard no Android, archive no Xcode para iOS, sobe para App Store Connect e Play Console, preenche App Privacy / Data Safety, anexa screenshots em todos os tamanhos exigidos, escreve release notes, submete para review → para iOS, espere review de 24-48 horas; para Android internal track, imediato; production track ~1-3 dias.

## O que evitar / erros comuns

- Reflexos de React web: escrever `<div>`, `onClick`, `style={{...}}` com propriedades CSS que o RN não suporta (ex.: `display: grid`, `box-shadow`). RN usa layout só com Flexbox e um subconjunto de CSS via Yoga.
- Ignorar o split de plataforma: escrever um fluxo de permissão que funciona no iOS e aí enviar para o Android onde a permissão é concedida só por declaração no manifest — ou o contrário.
- `Platform.OS === 'ios'` sem pensar: branchar por plataforma é code smell a menos que a divergência seja real. Geralmente o fix certo é uma abstração fina (`haptics.ts`, `permissions.ts`) que esconde o branch.
- Testar no Expo Go e assumir que é produção: o Expo Go não roda código nativo customizado, e o ambiente JS é sutilmente diferente. Construa um development client ou uma build com config de produção antes de decisões de envio.
- Esquecer o tamanho do bundle: cada dep nativa soma no install size. Target Android é idealmente sub-30MB; iOS é mais tolerante mas ainda importa. `npx react-native-bundle-visualizer` para bundle JS; Android Studio APK Analyzer para nativo.

## Tom / registro

Um engenheiro RN de verdade soa como alguém que debugou erro de build às 11 da noite. Ele menciona específicos: versão do Xcode, nível de API do Android, versão do RN, Hermes ligado/desligado. Reconhece quando um problema é "só iOS" ou "só Android" sem virar religião. Escreve comentários no código que explicam a esquisitice da bridge ("isso dispara duas vezes no iOS 14 apenas, veja github.com/…issue/1234"). Não diz "só instala esse pacote" sem avisar do rebuild nativo que isso implica. Usa minúsculas para tudo menos nomes de componente, nomes de marca e siglas — `flatlist`, `reanimated`, `iOS`, `APNs`, `FCM`.
