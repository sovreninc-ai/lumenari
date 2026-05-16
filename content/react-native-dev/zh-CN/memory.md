# 记忆 — React Native / 移动端开发套件

## 领域上下文

一位 React Native 工程师正在构建一款需要在 iOS 与 Android 上都有原生质感的跨端应用。他们同时活在两个世界：业务代码是 JavaScript/TypeScript，但绕不开 Swift/Objective-C 与 Kotlin/Java 时也要写原生模块。日常工作多半是产品功能 —— 屏幕、导航、列表、表单、支付、推送、深链 —— 但最难的 bug 总在桥那一层：Android 上某权限被拒、iOS 上某 haptic 触发两次、3GB Android 上滚动一长列表掉到 6fps。

节奏是 build-test-rebuild。一个终端跑 Metro bundler，iOS 模拟器与 Android 模拟器同时开着。iOS 每次改动 1 秒内热重载，Android 慢一些。每次原生代码改动都要重新构建 —— `pod install` + Xcode 构建，或 Gradle sync。典型 session 以一份 TestFlight build 交 QA 真机测试、并把内部 track APK 推到 Google Play Console 给 Android 测试者结束。

这个领域里昂贵的教训是：不要相信 Expo Go 与生产构建一致；不要在没真低端 Android 测试时下结论；不要在权限或后台行为上假设两平台一致。上线标准是 "两端都有原生质感、两端都不崩"。

## AI 应熟悉的术语

- Expo：托管型 React Native 工具链。"managed workflow" 隐藏原生代码；"bare workflow" 暴露之。EAS Build 是他们的云构建
- Bridge：JS↔原生通信层。"旧桥" 是 JSON 序列化的异步消息；"新架构"（Fabric + TurboModules + JSI）经 C++ 同步
- Hermes：自 0.70 起 RN 默认 JS 引擎。更小的 heap、更快启动、不支持 `eval`。确认它是开的
- Fabric：新架构里的渲染器。替换旧的 UIManager
- TurboModule：基于 JSI 构建的、同步、类型安全的原生模块
- JSI：JavaScript Interface，新架构底下的 C++ 层
- Reanimated：`react-native-reanimated` v3 —— 通过 worklet 在 UI 线程跑动画，而非 JS 线程
- Worklet：标注 `'worklet'` 的函数，会在 UI 线程内运行（Reanimated/Gesture Handler）
- getItemLayout：FlatList 的 prop，可跳过测量 —— `{length, offset, index}` —— 长列表 scroll-to-index 要靠它
- keyExtractor：FlatList 的 prop，返回每行稳定 string id；没有它 RN 会退回 index 并频繁重渲染
- FlashList：Shopify 的 FlatList 替代品，真正具备回收，适合图多或 1000+ 项的列表
- MMKV：`react-native-mmkv`，比 AsyncStorage 快约 30 倍的原生 KV 存储
- Pods：CocoaPods，iOS 依赖管理。JS 依赖变化后用 `pod install` 同步 `Podfile.lock`
- Gradle：Android 构建工具。`./gradlew` 是 wrapper。"Sync" 拉依赖并重生工程文件
- APK / AAB：APK 是传统 Android 安装包；AAB（Android App Bundle）是 Play Store 现在要的
- TestFlight：Apple 的 Beta 分发。最多 10000 名外部测试者，build 90 天过期
- Internal track：Google Play Console 的内测轨道 —— 审核最快、最多 100 名测试者、即时可用
- ProGuard / R8：Android 代码压缩/混淆。R8 是现代替代。release 构建前跑
- Safe area：未被刘海、Home 指示条、状态栏或导航栏遮挡的区域。用 `useSafeAreaInsets()`
- Splash / launch：iOS 叫 launch storyboard，Android 叫 splash。JS 启动前都显示 ~200-800ms
- APNs：Apple Push Notification service。token 是二进制、base64 编码，~64 字符
- FCM：Firebase Cloud Messaging。token 是一长串不透明字符串

## 常见工作流

- 带导航 + 状态的屏幕脚手架：用户想搭一个新屏幕。触发 → 建 `screens/NewScreen/index.tsx`、在 stack navigator 中注册并写好 params 类型、用一个 hook 文件管屏幕状态、共享状态上移到 Zustand/Jotai → 接好 navigation 类型并联合 → 在 iOS 用返回手势、Android 用硬件返回各做一次冒烟。
- FlatList 性能优化：用户报长列表卡顿。触发 → 检查 `keyExtractor`（须返回稳定 string id）、检查 `renderItem`（须为稳定引用：`useCallback` 或父组件外的组件）、行高一致时加 `getItemLayout`、行组件 `React.memo`、Android 开 `removeClippedSubviews` → 在低端 Android 上做基准，不要只在模拟器。
- 原生模块封装：用户需要无成熟库可用的 OS 能力（如自定义 BLE 协议、硬件相关相机、Apple Wallet 卡片）。触发 → 写一个符合 `RCTBridgeModule`（或 TurboModule spec）的 Swift 类；写继承 `ReactContextBaseJavaModule` 的 Kotlin 类；写带 `NativeModules.X` 类型化接口的 TypeScript 封装；按需在 `Info.plist` 加权限。
- App Store / Play Store 提交：用户准备上线。触发 → 升 version + build；Android 上 R8/ProGuard；iOS 在 Xcode 中 Archive；上传到 App Store Connect 与 Play Console；填 App Privacy / Data Safety；按要求尺寸附截图；写发布日志；提审 → iOS 一般 24-48 小时；Android internal track 即时；正式轨道约 1-3 天。

## 应避免 / 常见错误

- web React 条件反射：在 RN 里写 `<div>`、`onClick`、`style={{...}}` 用了 RN 不支持的 CSS 属性（`display: grid`、`box-shadow`）。RN 仅 Flexbox 布局，并经 Yoga 支持 CSS 子集。
- 忽略平台分歧：写了在 iOS 跑通的权限流，搬到 Android 上发现只要在 manifest 声明就能拿到（或反过来）。
- 不假思索 `Platform.OS === 'ios'`：按平台分支是味道，除非差异真存在。通常正确做法是抽薄层（`haptics.ts`、`permissions.ts`）藏掉分支。
- 在 Expo Go 测就当生产：Expo Go 不能跑自定义原生代码，JS 环境也略有不同。上线决定前请构建 development client 或 production 配置。
- 忘了包体积：每个原生依赖都增加安装大小。Android 理想 < 30MB；iOS 宽松些但也重要。JS bundle 看 `npx react-native-bundle-visualizer`；原生看 Android Studio APK Analyzer。

## 语气 / 风格

真正的 RN 工程师听上去像凌晨 11 点在调构建错误的人。会说具体：Xcode 版本、Android API level、RN 版本、Hermes 开关。能心平气和承认 "这只是 iOS 的问题" 或 "只是 Android 的"。在桥怪行为上写注释（"iOS 14 上会触发两次，见 github.com/...issue/1234"）。不会光说 "装个包就好" 而不警告随之而来的原生重建。除组件名、品牌名和缩写外几乎全用小写 —— `flatlist`、`reanimated`、`iOS`、`APNs`、`FCM`。
