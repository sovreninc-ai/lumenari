# iOS / SwiftUI 生产级技能包

> Apple 文档讲的是 API。本套件讲决策：何时用 `@Observable` 而非 environment、SwiftData 在规模化下在哪里崩溃、App Store 审核员实际在看什么、以及每次新版本都会重现的 SwiftUI 坑。

**适配工具：** Claude · Claude Code · Cursor。

---

## 工作模式

你正在协作开发一个面向 App Store 的生产级 SwiftUI 应用。默认假设：

- **Swift 5.9+** 与 **`@Observable` 宏**。除非目标系统强制要求，否则不使用 `ObservableObject` / `@Published`。
- **NavigationStack**，不再使用已废弃的 `NavigationView`。
- 使用 **SwiftData** 做本地持久化；通过 model container 上的 `cloudKitDatabase` 修饰符使用 **CloudKit** 实现免费的跨设备同步。
- **结构化并发** —— `async`/`await`、`Task`、actors。除非身处回调 API 中，否则不使用 `DispatchQueue.main.async`。
- **隐私清单（`PrivacyInfo.xcprivacy`）不可选**，自 2024 年 5 月起生效。没有它，审核员会驳回。
- **App Store Review Guidelines** 是规范。如果 AI 提出会违反 2.1、4.2 或 5.1.1 的方案，请反对。

如果用户要求写出像 Android 或 React Native 的代码 —— `Provider`、`BLoC`、observable subjects、prop drilling —— 请把它翻译成 Swift 惯用法。SwiftUI 奖励"按视图 + 状态 + environment 思考"，而不是"按流"。

---

## 心智模型

```
[ View（struct，值类型）]
        │
        ├── @State 用于视图本地真相
        ├── @Bindable 用于绑定一个 @Observable model 的双向数据
        ├── @Environment(\.thing) 用于环境依赖
        └── @Query 用于 SwiftData 读取（live、可观察）

[ Model（class，@Observable）]
        │
        └── 持有业务状态。仅通过方法变更。

[ ModelContainer（SwiftData）]
        │
        └── 每个 App 一份，在 @main 配置。是否启用 CloudKit 由你定。
```

视图是状态的函数。不要存派生值 —— 计算它们。不要和布局系统对抗 —— 只有在 stack + 对齐导线都用尽时才用 `Layout` 或 `GeometryReader`。

---

## 标准的视图 + 模型 + SwiftData 示例

任何"加一个带持久化与界面的功能"请求，AI 都应按这种形态。

```swift
// MARK: - Model
import SwiftData

@Model
final class Workout {
    var id: UUID
    var title: String
    var startedAt: Date
    var durationSeconds: Int
    var notes: String

    init(title: String, durationSeconds: Int = 0, notes: String = "") {
        self.id = UUID()
        self.title = title
        self.startedAt = .now
        self.durationSeconds = durationSeconds
        self.notes = notes
    }
}

// MARK: - ViewModel（仅当逻辑超出"设个属性"时）
@Observable
final class WorkoutEditor {
    var title: String = ""
    var duration: Int = 0
    var notes: String = ""

    var isValid: Bool {
        !title.trimmingCharacters(in: .whitespaces).isEmpty && duration > 0
    }

    func build() -> Workout {
        Workout(title: title, durationSeconds: duration, notes: notes)
    }
}

// MARK: - View
struct WorkoutListView: View {
    @Environment(\.modelContext) private var context
    @Query(sort: \Workout.startedAt, order: .reverse) private var workouts: [Workout]
    @State private var showingEditor = false

    var body: some View {
        NavigationStack {
            List {
                ForEach(workouts) { workout in
                    NavigationLink(value: workout) {
                        WorkoutRow(workout: workout)
                    }
                }
                .onDelete(perform: delete)
            }
            .navigationTitle("Workouts")
            .navigationDestination(for: Workout.self) { WorkoutDetailView(workout: $0) }
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button("Add", systemImage: "plus") { showingEditor = true }
                }
            }
            .sheet(isPresented: $showingEditor) {
                WorkoutEditorView()
            }
            .overlay {
                if workouts.isEmpty {
                    ContentUnavailableView(
                        "No workouts yet",
                        systemImage: "figure.run",
                        description: Text("Tap Add to log your first one.")
                    )
                }
            }
        }
    }

    private func delete(at offsets: IndexSet) {
        for index in offsets {
            context.delete(workouts[index])
        }
    }
}

struct WorkoutEditorView: View {
    @Environment(\.modelContext) private var context
    @Environment(\.dismiss) private var dismiss
    @State private var editor = WorkoutEditor()

    var body: some View {
        NavigationStack {
            Form {
                TextField("Title", text: $editor.title)
                Stepper("Duration: \(editor.duration) min",
                        value: $editor.duration, in: 0...240, step: 5)
                TextField("Notes", text: $editor.notes, axis: .vertical)
                    .lineLimit(3...6)
            }
            .navigationTitle("New Workout")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        context.insert(editor.build())
                        dismiss()
                    }
                    .disabled(!editor.isValid)
                }
            }
        }
    }
}
```

这种形态中的几条硬性约定：

1. **用 `@Query`，不用 `FetchRequest`。** 这是 SwiftData 的响应式读取方式。
2. **`NavigationLink(value:)` + `.navigationDestination`** —— 值驱动导航。不要再用直接传 destination view 的已废弃 init。
3. **`ContentUnavailableView`** 用于空状态。审核员会注意到一个没有解释的空白屏幕。
4. **这里不需要 `@Bindable`**，因为 editor 由 `@State` 持有，通过 `$editor.title` 访问。当 `@Observable` 模型传给子视图时才用 `@Bindable`。

---

## `@main` 配置（CloudKit 就绪）

```swift
import SwiftUI
import SwiftData

@main
struct WorkoutsApp: App {
    let container: ModelContainer

    init() {
        do {
            let config = ModelConfiguration(
                schema: Schema([Workout.self]),
                isStoredInMemoryOnly: false,
                cloudKitDatabase: .automatic   // 使用 entitlements 中配置的 container
            )
            container = try ModelContainer(for: Workout.self, configurations: config)
        } catch {
            fatalError("Failed to create ModelContainer: \(error)")
        }
    }

    var body: some Scene {
        WindowGroup {
            WorkoutListView()
        }
        .modelContainer(container)
    }
}
```

AI 应当提醒的 CloudKit 坑：

- 启用 CloudKit 后，`@Model` 中每个属性都必须有默认值或为可选。CloudKit 不支持"创建时必填"的字段。
- 同步到 CloudKit 的 model 不支持 unique 约束。请在代码中保证唯一性。
- 关系必须为可选或带默认值。inverse 关系是强制的。
- entitlements 中的 CloudKit container ID 必须与 bundle ID 完全匹配。`iCloud.com.yourdomain.workouts`。

---

## 并发 —— 真正重要的规则

```swift
// 好：结构化并发；UI 所在层做 MainActor 隔离。
@Observable
@MainActor
final class FeedLoader {
    var items: [FeedItem] = []
    var isLoading = false
    var error: Error?

    func load() async {
        isLoading = true
        defer { isLoading = false }
        do {
            items = try await FeedAPI.fetch()
        } catch {
            self.error = error
        }
    }
}

// 在视图中：
.task { await loader.load() }
```

规则：

1. **`.task` 会在视图消失时取消。** 适合 view-scoped 的异步工作。除非有理由，否则别从 `.onAppear` 启动 `Task { }`。
2. **若模型被 SwiftUI 读取，请在模型上加 `@MainActor`**。省去手动 `await MainActor.run { }`。
3. **共享可变状态用 actor**（缓存、websocket 管理器）。不要给 view model 用。
4. **并行用 `async let`**，动态扇出用 `withTaskGroup`，`Task.detached` 仅在你真的需要独立隔离域时使用（几乎从不）。

---

## 无障碍 —— 审核员重点抽查的四件事

1. **VoiceOver 标签。** 仅图标按钮需要 `.accessibilityLabel("Add workout")`。SF Symbols 对 VoiceOver 不携带意义。
2. **Dynamic Type。** 使用 `.font(.body)`、`.font(.headline)`。不要硬编码 `.system(size: 17)`。在 AX5（最大无障碍尺寸）下测试。
3. **对比度。** 使用 `Color.primary`、`Color.secondary`、语义颜色。自定义颜色须达到 WCAG AA（正文 4.5:1）。
4. **减少动态效果。** 用 `@Environment(\.accessibilityReduceMotion)` 包裹大型动画并提供交叉淡化的退化方案。

---

## 本套件会拒绝的事

- 当目标为 iOS 17+ 时，建议使用 `ObservableObject` + `@Published`。请用 `@Observable`。
- 在新代码中写 `NavigationView`。它已废弃。
- 使用 `Combine` publisher 来管理视图状态。SwiftUI 有自己的观察系统。
- 跳过隐私清单。在调用 required-reason API（文件时间戳、user defaults、系统启动时间、磁盘空间、活跃键盘）时，没有 `PrivacyInfo.xcprivacy` 会被驳回。
- 对 URL、资源名或模型 ID 进行 force-unwrap。请使用返回可选的 `URL(string:)`，并 fail closed。
- 编写访问真实网络的测试。请 mock API 层。

---

## 配套文档

- `patterns/swiftui-idioms.md` — Observable、environment、navigation、sheets、SwiftUI 坑总览
- `patterns/swiftdata-cloudkit.md` — schema、关系、predicate、迁移、CloudKit entitlements
- `checklists/app-store-readiness.md` — 隐私清单、截图、App Privacy 详情、TestFlight、常见驳回理由

---

## 合并任何 SwiftUI PR 前的健全性检查

- [ ] 所有视图为 `struct`，所有模型为 `final class`
- [ ] 目标 iOS 17+ 的代码中没有 `ObservableObject`
- [ ] 全部使用 `NavigationStack`，没有 `NavigationView`
- [ ] 异步工作使用 `.task`，没有在 `.onAppear` 中 `Task { }`
- [ ] 空状态使用 `ContentUnavailableView`
- [ ] 仅图标按钮配 VoiceOver 标签
- [ ] AX5 下 Dynamic Type 不截断
- [ ] 隐私清单存在并列出所有使用的 required-reason API
- [ ] 上线代码中没有 `print(...)` —— 使用 `Logger`
