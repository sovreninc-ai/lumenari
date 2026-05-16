# SwiftUI 惯用法

每个 SwiftUI 代码库都会出现的模式，以及每个新版本都会咬一口的坑。默认基线是 Swift 5.9+ 与 iOS 17+。

---

## 状态、观察与绑定 —— 该用哪个

| 情况 | 选用 |
| --- | --- |
| 一个视图持有一小块没人需要的状态 | `@State` |
| 子视图需要修改父视图的 `@State` | 把 `$value` 作为 `Binding` 传下去 |
| 一个有计算属性或方法的 view-model | `@Observable final class` + `@State private var vm = VM()` |
| 父持有、子需要双向绑定的 view-model | 父：`@State var vm = VM()`；子：`@Bindable var vm: VM` |
| 环境依赖（如 session、theme） | `@Environment(\.thing)` + `EnvironmentValues` 扩展 |
| 读取 SwiftData 行 | `@Query(sort: \Model.field, order: .reverse) var items: [Model]` |
| 响应式 UserDefaults | `@AppStorage("key") var thing: String = "default"` |
| 读取从父传入的 SwiftData 对象 | 属性 `var item: Item`（读）或 `@Bindable var item: Item`（写） |

常见错误：在 iOS 17+ 上仍使用 `@StateObject`。在 `@Observable` 世界里，正确组合是 `@State`（所有权）+ `@Bindable`（子视图中的双向绑定）。`@StateObject` 属于旧的 `ObservableObject` 世界。

---

## 导航 —— 值驱动，而非视图驱动

```swift
struct RootView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            List {
                NavigationLink("Settings", value: Route.settings)
                NavigationLink("Profile", value: Route.profile(userID: currentUser.id))
            }
            .navigationDestination(for: Route.self) { route in
                switch route {
                case .settings: SettingsView()
                case .profile(let id): ProfileView(userID: id)
                }
            }
        }
    }
}

enum Route: Hashable {
    case settings
    case profile(userID: UUID)
}
```

为什么：编程式导航变得轻松（`path.append(Route.profile(...))`）、深链解析就是一个 `NavigationPath` 解码、并彻底告别已废弃的 `NavigationLink(destination:)`。

Sheet 与 full-screen cover：使用 `.sheet(item:)` 配可选 Identifiable，而不是 `.sheet(isPresented:)` + 旁边的 `@State`。

```swift
@State private var editing: Workout?

// ...
.sheet(item: $editing) { workout in
    WorkoutEditor(workout: workout)
}
```

---

## 需要修改父视图状态的 Sheet

```swift
struct ParentView: View {
    @State private var name = ""
    @State private var showingEditor = false

    var body: some View {
        VStack {
            Text(name)
            Button("Edit") { showingEditor = true }
        }
        .sheet(isPresented: $showingEditor) {
            NameEditor(name: $name)
        }
    }
}

struct NameEditor: View {
    @Binding var name: String
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        Form {
            TextField("Name", text: $name)
        }
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("Done") { dismiss() }
            }
        }
    }
}
```

不要传 `onSave: (String) -> Void` 这种闭包回调。Binding 才是 SwiftUI 的方式。

---

## 列表 —— 性能 + UX

```swift
List {
    ForEach(workouts) { workout in
        WorkoutRow(workout: workout)
    }
    .onDelete { offsets in
        for i in offsets { context.delete(workouts[i]) }
    }
}
.listStyle(.insetGrouped)
.refreshable {
    await viewModel.reload()
}
.searchable(text: $query)
```

坑：

- **不要把昂贵计算放在行内。** 在模型里算一次。
- **`Identifiable` 很重要。** 元素没有稳定 ID 时，`ForEach` 会全量重绘。
- **`.refreshable` 是 async 的。** 不要再起 `Task { }` —— 直接 `await`。
- **`ScrollView` 内的 `LazyVStack`** 是 `List` 控制能力不足时的备选。默认还是 `List` —— 更快、更好看，除非有特殊需求。

---

## 表单 —— 用对 primitive

```swift
Form {
    Section("Basics") {
        TextField("Title", text: $title)
        DatePicker("Date", selection: $date, displayedComponents: .date)
        Toggle("Reminder", isOn: $reminder)
    }
    Section("Notes") {
        TextField("Notes", text: $notes, axis: .vertical)
            .lineLimit(3...8)
    }
    if !isValid {
        Section { } footer: {
            Text("Title is required.")
                .foregroundStyle(.red)
        }
    }
}
.scrollDismissesKeyboard(.interactively)
.toolbar {
    ToolbarItemGroup(placement: .keyboard) {
        Spacer()
        Button("Done") { focusedField = nil }
    }
}
```

`Form` 免费给你 inset grouped 的观感。用 `Section` 头/尾放提示与校验信息。用 `.scrollDismissesKeyboard(.interactively)` 收键盘。

---

## 动画 —— 值得记的四个修饰符

| 修饰符 | 适用 |
| --- | --- |
| `.animation(.smooth, value: state)` | 当 `state` 变化时动画（iOS 17 起首选） |
| `withAnimation { state = ... }` | 对某次状态变更施加动画 |
| `.transition(.move(edge: .bottom))` | 条件视图的插入/移除动画 |
| `.matchedGeometryEffect(id:in:)` | 两视图之间的英雄动画 |

尊重 reduced motion：

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

// ...
.animation(reduceMotion ? .none : .smooth, value: state)
```

---

## 每次新版都会出现的坑

1. **视图 body 会运行很多次。** 不要在那里加 `print(...)` 调试 —— 用 `let _ = Self._printChanges()`，它会记录*为何*重绘。

2. **`@State` 的初始化只跑一次，不是每次重绘都跑。** `@State private var thing = expensiveCompute()` 没问题。但如果 `expensiveCompute()` 依赖一个传进来的 prop，prop 变了也不会再跑 —— 用 `.onChange(of: prop)` 或迁到 view-model。

3. **`if let` 在视图 body 中是解包语法，不是绑定快捷方式。** 想绑定一个可选值，使用 `Binding(get:set:)` 或新的 `$value.unwrapped` 模式（通过自定义 property wrapper）。

4. **`@Environment` 读取必须类型完全匹配。** `@Environment(\.modelContext)` 返回 `ModelContext`；`@Environment(\.dismiss)` 返回 `DismissAction`。自定义环境值需要 key 与 value 类型对齐。

5. **`Task` 取消是协作式的。** 在 async 函数内部，在迭代点调用 `try Task.checkCancellation()`。SwiftUI 的 `.task` 修饰符会在视图消失时取消 —— 但前提是你检查了。

6. **带 `axis: .vertical` 的 TextField 需要 `lineLimit(_...:)`** 才能真正撑开。默认是单行。

7. **`onAppear` 只跑一次。`onChange` 每次变化都跑。** 两者都要 —— 用 `.task(id:)`：首次出现时跑，id 变化再跑。

8. **避免用 `GeometryReader` 给子视图定尺寸。** 它会撑满可用空间，常常破坏布局。自定义布局优先使用 `Layout` 协议或对齐导线。

---

## Toolbar placement 速查

| Placement | 含义 |
| --- | --- |
| `.primaryAction` | 右上主按钮（Add、Save） |
| `.confirmationAction` | Sheet/modal 确认（Done、Save） |
| `.cancellationAction` | Sheet/modal 取消 |
| `.navigation` | 返回按钮区域，左侧 |
| `.topBarLeading` / `.topBarTrailing` | 需要显式定位时 |
| `.keyboard` | 键盘上方（文本框 Done 按钮） |
| `.bottomBar` | 底部工具栏（iOS） |

主操作不要放进 `.navigation`。请用 `.primaryAction`。

---

## SwiftUI 还不够用时

桥接 UIKit 有时是对的。使用 `UIViewRepresentable` 或 `UIViewControllerRepresentable`：

- 一个 SwiftUI 无法媲美的 attributed string 渲染文本视图
- 相机或照片选择器（不过 `PhotosPicker` + `AVCaptureSession` 的 SwiftUI 封装能覆盖多数场景）
- 一个只暴露 `UIView` / `UIViewController` 的第三方 SDK

不要为 SwiftUI 已原生支持的能力做桥接：地图（`Map`）、Web 视图（即将到来的 `WebView`，在此之前桥接 `WKWebView`）、照片选择器（`PhotosPicker`）、分享面板（`ShareLink`）。
