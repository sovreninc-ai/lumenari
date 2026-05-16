# 记忆 — iOS / SwiftUI 生产级技能包

## 领域上下文

一位 SwiftUI 开发者通过组合小型 `View` struct 来交付功能 —— 它们读取状态、再返回更多视图。日常在 Xcode（IDE）、Simulator（或连真机）、Instruments（性能分析）以及 App Store Connect（构建、TestFlight、提交审核）之间切换。多数人同一时间只交付一个 App，常常是 solo 或 2-3 人小队。

工作循环是：写一个视图、按 Cmd+R、看 Canvas 预览重绘、修一个布局 bug、加一些状态、用 SwiftData 持久化、用 CloudKit 同步、写一条快照测试、上传 TestFlight、收反馈、迭代。慢的部分是：App Store Review（24-48 小时）、大型代码库的编译时间、以及搞清楚为什么 SwiftUI 视图没按你预期更新。

独立开发者关心 App Store 排名、ASO、截图、评价、以及驳回-重提的循环。团队开发者关心模块化架构、测试覆盖率、构建速度、以及让新人不靠"Xcode 江湖经验"就能上手。

## AI 应熟悉的术语

- **HIG**：Human Interface Guidelines —— Apple 设计规范。每年 WWDC 更新。
- **WWDC**：全球开发者大会。每年 6 月。新 OS、新 API。
- **SF Symbols**：Apple 图标库，约 5000 个符号，通过 `Image(systemName: "heart.fill")` 使用。
- **TestFlight**：Apple 的 Beta 分发。最多 100 名内部测试者、10000 名外部测试者。构建 90 天后过期。
- **App Store Connect**：管理构建、元数据、定价、TestFlight、App Store 审核的网页 UI。
- **`@Observable`**：Swift 宏（iOS 17+），取代 `ObservableObject` + `@Published`。自动跟踪属性读取。
- **SwiftData**：Apple 的持久化框架（iOS 17+），Core Data 的后继者。`@Model` 类，`@Query` 读取。
- **CloudKit**：Apple 的云端同步，对用户免费，免费档位慷慨（1GB/用户）。通过 `cloudKitDatabase: .automatic` 与 SwiftData 配对。
- **`.task` modifier**：运行一个生命周期与视图绑定的异步任务。视图消失时取消。
- **隐私清单（`PrivacyInfo.xcprivacy`）**：声明 required-reason API 使用与第三方 SDK 数据采集的 XML 文件。自 2024 年 5 月起提交审核必备。
- **App Store Review Guidelines**：审核员实际执行的规则。多数驳回出现在第 2 节（性能）、第 4 节（设计）、第 5 节（法律）。
- **StoreKit 2**：现代 In-App Purchase API。`Product`、`Transaction`，async 优先。
- **ProMotion**：120Hz 屏幕。部分动画需要显式 `.animation(.smooth, value:)` 才有感觉。
- **Catalyst**：在 Mac 上运行 iPad App。不同惯用法 —— 指针 hover、菜单栏、窗口缩放。
- **visionOS**：头显 OS。体积应用 vs. 窗口应用。和 iOS 不一样。

## 常见工作流

- **添加一个带持久化的屏幕**：定义 `@Model` → 写带 `@Query` 的 `View` → 通过 `NavigationLink(value:)` 接入目的地 → 在父视图的 `.navigationDestination(for:)` 中接线。
- **接入 CloudKit 同步**：启用 CloudKit + Background Modes 能力 → 在 `ModelConfiguration` 上设置 `cloudKitDatabase: .automatic` → 所有 model 属性必须带默认值或为可选 → 在两台登录同一 iCloud 账号的设备上测试。
- **上 TestFlight**：增加 build number → Archive → 通过 Xcode Organizer 上传 → 等处理（约 10 分钟）→ 加入 Internal Testing → 邀请测试者 → 等反馈。
- **提交 App Store Review**：填 App Privacy → 上传截图（必传 6.7"、6.1"、iPad 12.9"）→ 写 What's New → 提交 → 24 小时内回应审核员问题。
- **诊断 SwiftUI 渲染 bug**：加 `.id(value)` 强制重建，或在 body 内 `let _ = Self._printChanges()` 查看是什么触发了重绘。

## 应避免 / 常见错误

- 在同一项目中无理由地混用 `ObservableObject` 与 `@Observable`。选一个 —— iOS 17+ 用 `@Observable`。
- 到处写 `Task { @MainActor in ... }` 而不是在 model 上加一次 `@MainActor`。
- 把派生值（`var fullName: String`）存为 `@State`。请计算它们：`var fullName: String { "\(first) \(last)" }`。
- 用 `GeometryReader` 做布局，而 `HStack` + `Spacer` + 对齐导线足以解决。`GeometryReader` 是兜底，不是默认。
- 对 `URL(string: "https://...")` 做 force-unwrap。它返回可选是有原因的。fail closed。
- 忘了 SwiftUI 在每次状态变化时会重建整个视图 body —— 让 body 廉价。把昂贵的计算搬出去。
- 写死十六进制色，而 asset catalog 支持 light/dark + WCAG 检查过的变体。
- 因为"App 不收集数据"就跳过隐私清单。如果你碰过 `UserDefaults`、`FileManager` 时间戳、系统启动时间或磁盘空间 —— 那是 required-reason API。你需要清单。

## 语气 / 风格

真正的 iOS 开发者讲"ship"和"the build"。他们引用 WWDC session 编号（"observation 那一节，10149"）。他们不信任第三方依赖，因为每一个都增加 App Store 风险。即使 Apple 自家框架不够好用，他们也优先用 Apple 的。他们会说"Simulator 在撒谎"，当某事在真机能跑而 Xcode 预览不能时。他们用 Logger 而非 print。他们被 AppDelegate 生命周期坑过。他们绝对会告诉你 SwiftUI 在新项目里优于 UIKit —— 然后默默写一个 UIKit 桥接，因为 SwiftUI 的文本视图还不够强。
