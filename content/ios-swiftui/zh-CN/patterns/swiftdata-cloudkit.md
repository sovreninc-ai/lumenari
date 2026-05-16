# SwiftData + CloudKit

iOS 17+ 自带的持久化栈。SwiftData 是本地存储；CloudKit（通过 SwiftData 的自动集成）是免费的跨设备同步层。两者一起以更小的表面积替代了 Core Data + NSPersistentCloudKitContainer —— 但 CloudKit 的规则仍然适用。

---

## 最小可行 model

```swift
import SwiftData

@Model
final class Note {
    var id: UUID
    var title: String
    var body: String
    var createdAt: Date
    var updatedAt: Date

    init(title: String = "", body: String = "") {
        self.id = UUID()
        self.title = title
        self.body = body
        self.createdAt = .now
        self.updatedAt = .now
    }
}
```

要点：

- `final class` —— SwiftData 要求。
- 每个属性都带默认值。CloudKit 同步下不可妥协 —— Apple 的 CloudKit schema 不支持"创建时必填"的字段。
- `id: UUID` —— 用于稳定身份；SwiftData 自己也会生成 `persistentModelID`。若你关心外部引用（URL、导出格式）则保留显式 `id`。
- 没有 `@unique` 约束。CloudKit 不支持唯一性。在代码中保证。

---

## 关系

```swift
@Model
final class Project {
    var id: UUID
    var name: String

    @Relationship(deleteRule: .cascade, inverse: \Task.project)
    var tasks: [Task] = []

    init(name: String) {
        self.id = UUID()
        self.name = name
    }
}

@Model
final class Task {
    var id: UUID
    var title: String
    var completed: Bool
    var project: Project?

    init(title: String, project: Project? = nil) {
        self.id = UUID()
        self.title = title
        self.completed = false
        self.project = project
    }
}
```

规则：

- **CloudKit 下 inverse 关系是强制的。** 两侧必须互相引用。`inverse:` 参数将其显式化。
- **删除规则**：`.cascade`（连子一起删）、`.nullify`（把父置 nil）、`.deny`（有子时拒删）、`.noAction`（你来处理）。被持有的子项最常用 `.cascade`。
- **to-many 关系初值是 `[]`**，而不是 `nil`。to-one 通常为可选。
- **CloudKit 下没有多对多**，必须用一个 join model。建一个 `Membership` 类，包含两个 to-one 关系。

---

## 查询 —— 读侧

```swift
struct TaskList: View {
    @Query(filter: #Predicate<Task> { !$0.completed },
           sort: \Task.createdAt,
           order: .reverse) var tasks: [Task]

    var body: some View {
        List(tasks) { task in
            Text(task.title)
        }
    }
}
```

动态 predicate —— 当过滤依赖父的输入时：

```swift
struct ProjectTasks: View {
    let projectID: PersistentIdentifier

    @Query private var tasks: [Task]

    init(projectID: PersistentIdentifier) {
        self.projectID = projectID
        _tasks = Query(
            filter: #Predicate<Task> { $0.project?.persistentModelID == projectID },
            sort: \Task.createdAt
        )
    }

    var body: some View {
        List(tasks) { task in Text(task.title) }
    }
}
```

Predicate 坑：

- `#Predicate` 是宏。body 在编译期解析，所以大多数纯 Swift 代码不可用 —— 只支持有限子集。
- `String.contains`、`String.localizedStandardContains`、比较、基础算术、以及沿关系遍历可以用。
- 闭包、自定义方法和多数计算属性不行。把这类逻辑搬出 predicate。

---

## 写 —— `ModelContext`

```swift
@Environment(\.modelContext) private var context

// Insert
let task = Task(title: "New task")
context.insert(task)

// Update —— 直接改 model 即可，变更会被自动跟踪。
task.completed = true

// Delete
context.delete(task)

// 显式 save（通常下个 run loop 会自动保存）
try context.save()
```

不要在每次变更后都 `context.save()`。SwiftData 会批量并自动保存。仅在跨进程边界（导出、分享、后台任务切换）前显式保存。

---

## CloudKit 设置 —— entitlements + capabilities 清单

1. 在 Xcode 中：target → Signing & Capabilities → 添加 **iCloud** 能力。
2. 在 iCloud Services 下勾选 **CloudKit**。
3. 添加一个 CloudKit container：`iCloud.com.yourdomain.appname`。必须与 `ModelConfiguration` 中一致。
4. 添加 **Background Modes** 并勾选 **Remote notifications**。这是 CloudKit 推送变更通知的方式。
5. 在 model container 配置中：

```swift
@main
struct App: SwiftUI.App {
    let container: ModelContainer

    init() {
        do {
            container = try ModelContainer(
                for: Note.self, Project.self, Task.self,
                configurations: ModelConfiguration(
                    schema: Schema([Note.self, Project.self, Task.self]),
                    isStoredInMemoryOnly: false,
                    cloudKitDatabase: .automatic
                )
            )
        } catch {
            fatalError("ModelContainer init failed: \(error)")
        }
    }

    var body: some Scene {
        WindowGroup { ContentView() }
            .modelContainer(container)
    }
}
```

6. 在两台登录同一 iCloud 账号的设备上运行。在一台上做修改。等待。（同步不是即时的 —— 通常 5-30 秒。）

---

## CloudKit 约束 —— SwiftData 拒绝推到云端的内容

- **Unique 约束。** 在代码中保证，不在 schema 中。
- **创建时必填且无默认值的属性。** 每个属性都要有默认值。
- **非可选的 to-one 关系。** 改为可选。
- **`@Attribute(.transformable)` 配自定义 transformer。** CloudKit 需要可与原生类型兼容的类型。
- **缺 inverse 的关系。** 两侧必须互相引用。

当 CloudKit 静默拒绝同步时，到设备 Console.app 查 `CKError`。常见的：

| 错误 | 含义 |
| --- | --- |
| `partialFailure` | 部分记录同步成功，部分失败。检查 `partialErrorsByItemID` 字典。 |
| `quotaExceeded` | 用户的 iCloud 空间满了。友好提示。 |
| `notAuthenticated` | 用户没登录 iCloud。引导去设置。 |
| `serverRecordChanged` | 合并冲突。SwiftData 通常用 last-writer-wins。 |
| `zoneNotFound` | Schema 尚未推送 —— 首次同步会出现一次。 |

---

## 迁移

修改 `@Model` 形态时，SwiftData 会尝试自动做轻量迁移。它能处理：

- 增加属性（带默认值）
- 移除属性
- 通过 `@Attribute(originalName: "oldName")` 改名
- 改变关系基数（有时 —— 充分测试）

更重的变更使用 `VersionedSchema` 与 `SchemaMigrationPlan`：

```swift
enum NotesSchemaV1: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] { [Note.self] }
    // ...
}

enum NotesSchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] { [Note.self] }
    // ...
}

enum NotesMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [NotesSchemaV1.self, NotesSchemaV2.self]
    }
    static var stages: [MigrationStage] {
        [.lightweight(fromVersion: NotesSchemaV1.self, toVersion: NotesSchemaV2.self)]
    }
}
```

然后把 plan 传给 `ModelContainer` init。

发布前请在已填充数据的数据库上测试迁移。Simulator 可以擦掉 —— 生产用户不可以。

---

## 何时跳过 SwiftData

SwiftData 适合 SwiftUI 擅长展示的数据：带关系的结构化列表、需要同步。不适合：

- **高频时序数据**（传感器、分析）。直接用 SQLite 或流式格式。
- **大二进制 blob**（视频、大图）。把二进制存到 `FileManager` 或 `CloudKit.Asset`，SwiftData 中只存路径/引用。
- **不仅限 iCloud 的跨平台同步。** SwiftData + CloudKit 锁在 Apple 平台 + iCloud 账号上。Android/Web 需自建同步层。
- **使用你自己密钥的端到端加密。** SwiftData 使用标准数据保护类。E2EE 需在其之上加一层。

---

## 常见 bug

1. **"新增条目时视图不更新。"** 确认用了 `@Query` 而不是 `[Model]`。`@Query` 是响应式的。

2. **"CloudKit 本机能同步，但设备之间不同步。"** 到 CloudKit Dashboard（icloud.developer.apple.com）查 schema 是否已推到 production。先在 debug 模式跑一次 App，再用 dashboard 的"Deploy Schema to Production"按钮部署。

3. **"Predicate 运行时崩溃。"** 你写了 predicate 宏不支持的内容。把逻辑搬到 model 的计算属性中，或在 fetch 后过滤。

4. **"`context.save()` 抛错。"** 读错误。通常是关系完整性问题（缺 inverse、对象已删但仍被引用）。修数据，而不是修 save。

5. **"迁移在 Simulator 通过，但在 TestFlight 失败。"** TestFlight 用户拥有真实数据形态，是你没测过的。务必用与生产相似的种子数据测试迁移路径。
