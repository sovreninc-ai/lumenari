# SwiftData + CloudKit

iOS 17+ に同梱される永続化スタック。SwiftData がローカルストア。CloudKit（SwiftData の自動統合経由）が無料のクロスデバイス同期レイヤー。両者で Core Data + NSPersistentCloudKitContainer をはるかに小さな表面積で置き換える — ただし CloudKit のルールは依然適用される。

---

## 最小限のモデル

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

この形に関するメモ:

- `final class` — SwiftData が要求する。
- すべてのプロパティがデフォルト値を持つ。CloudKit 同期では譲れない — Apple の CloudKit スキーマは「作成時のみ必須」のフィールドをサポートしない。
- `id: UUID` — 安定した同一性に有用だが、SwiftData も独自の `persistentModelID` を生成する。外部参照（URL、エクスポート形式）が関わるなら明示的な `id` を保持する。
- `@unique` 制約なし。CloudKit は一意性をサポートしない。コードで強制する。

---

## リレーションシップ

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

ルール:

- **CloudKit 下では逆リレーションシップが必須。** 両側が互いを参照する必要がある。`inverse:` パラメータがそれを表す。
- **削除ルール**: `.cascade`（子も削除）、`.nullify`（親を nil に）、`.deny`（子が存在すれば削除拒否）、`.noAction`（自分で処理）。所有された子には `.cascade` が最も一般的。
- **多対多のリレーションシップは `[]` で始まる**、`nil` ではない。一対多のリレーションシップは通常 optional。
- **CloudKit 下で多対多は不可** — join モデルなしでは。2 つの一対多リレーションシップを持つ `Membership` クラスを作る。

---

## クエリ — 読み込み側

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

動的 predicate — フィルタが親の入力に依存する場合:

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

Predicate の落とし穴:

- `#Predicate` はマクロ。本体はコンパイル時に解析されるため、ほとんどの純粋な Swift コードは動作しない — サポートされるサブセットのみ。
- `String.contains`、`String.localizedStandardContains`、比較、基本演算、リレーションシップのトラバースは動く。
- クロージャ、カスタムメソッド、ほとんどの計算プロパティは動かない。そのロジックを predicate の外に出す。

---

## 書き込み — `ModelContext`

```swift
@Environment(\.modelContext) private var context

// Insert
let task = Task(title: "New task")
context.insert(task)

// Update — モデルを mutate するだけ。変更は自動追跡される。
task.completed = true

// Delete
context.delete(task)

// 明示的な save（通常は次のランループで自動保存）
try context.save()
```

各 mutation 後に `context.save()` しない。SwiftData がバッチして自動保存する。プロセス境界を越える前（エクスポート、共有、バックグラウンドタスク遷移）にのみ明示的に save する。

---

## CloudKit セットアップ — entitlement + ケイパビリティチェックリスト

1. Xcode で target → Signing & Capabilities → **iCloud** ケイパビリティを追加。
2. iCloud Services の下で **CloudKit** をチェック。
3. CloudKit コンテナを追加: `iCloud.com.yourdomain.appname`。`ModelConfiguration` に入れるものと一致する必要がある。
4. **Background Modes** ケイパビリティを追加し、**Remote notifications** をチェック。CloudKit はこれで変更通知をプッシュする。
5. モデルコンテナのセットアップ:

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

6. 同じ iCloud アカウントにサインインした 2 デバイスで実行。一方で変更を加える。待つ。（同期は瞬時ではない — 通常 5〜30 秒。）

---

## CloudKit の制約 — SwiftData がクラウドにプッシュを拒むもの

- **Unique 制約。** スキーマではなくコードで強制。
- **デフォルトなしの作成時必須プロパティ。** 各プロパティにデフォルトが必要。
- **非 optional の一対多リレーションシップ。** optional にする。
- **カスタムトランスフォーマー付きの `@Attribute(.transformable)`。** CloudKit はプリミティブ互換型を必要とする。
- **逆参照のないリレーションシップ。** 両側が互いを参照する必要がある。

CloudKit が黙って同期を拒否したら、デバイスの Console.app で `CKError` エントリをチェック。よくあるもの:

| エラー | 意味 |
| --- | --- |
| `partialFailure` | 一部のレコードは同期されたが、一部はされなかった。`partialErrorsByItemID` 辞書をチェック。 |
| `quotaExceeded` | ユーザーの iCloud 容量切れ。フレンドリーなメッセージを表示。 |
| `notAuthenticated` | ユーザーが iCloud にサインインしていない。設定経由で促す。 |
| `serverRecordChanged` | マージ競合。SwiftData は通常 last-writer-wins で解決。 |
| `zoneNotFound` | スキーマがまだプッシュされていない — 初回同期時に 1 度発生。 |

---

## マイグレーション

`@Model` の形状を変えると、SwiftData は自動的に軽量マイグレーションを試みる。次が処理可能:

- プロパティ追加（デフォルト付き）
- プロパティ削除
- `@Attribute(originalName: "oldName")` 経由のリネーム
- リレーションシップのカーディナリティ変更（時々 — 徹底的にテストする）

より重い変更には `VersionedSchema` と `SchemaMigrationPlan` を使う:

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

その後、プランを `ModelContainer` の init に渡す。

出荷前に、データが入った DB でマイグレーションをテストすること。Simulator は消せる — 本番のユーザーは消せない。

---

## SwiftData を飛ばすべきとき

SwiftData は、SwiftUI が表示するのが得意なデータ — 構造化アイテムのリスト、リレーションシップを持ち、同期が必要なもの — に正解。次には正解ではない:

- **高ボリュームの時系列データ**（センサーデータ、分析）。SQLite を直接使うか、ストリーミング形式。
- **大きなバイナリ blob**（動画、大きな画像）。バイナリは `FileManager` または `CloudKit.Asset` に保存。SwiftData にはパス / 参照を保存する。
- **iCloud 以外のクロスプラットフォーム同期。** SwiftData + CloudKit は iCloud アカウントを持つ Apple プラットフォームにロックされる。Android / Web には独自の同期レイヤーを構築する。
- **自前のキーによる at-rest 暗号化。** SwiftData は標準のデータ保護クラスを使う。E2EE は上に重ねる。

---

## よくあるバグ

1. 「**新しいアイテムを追加してもビューが更新されない。**」 `@Query` を使っていることを確認、`[Model]` ではない。`@Query` はリアクティブ。

2. 「**CloudKit 同期がローカルでは動くがデバイス間で動かない。**」 CloudKit Dashboard（icloud.developer.apple.com）をチェック — スキーマが本番にプッシュされていない可能性。デバッグでアプリを 1 回実行し、ダッシュボードの「Deploy Schema to Production」ボタンでスキーマをデプロイ。

3. 「**Predicate がランタイムでクラッシュ。**」 predicate マクロが扱えないものを書いた。ロジックをモデルの計算プロパティに移すか、fetch 後にフィルタする。

4. 「**`context.save()` がエラーを throw。**」 エラーを読む。通常はリレーションシップの整合性問題（逆参照の欠落、削除済みだが参照されているオブジェクト）。save ではなくデータを直す。

5. 「**マイグレーションが Simulator では成功するが TestFlight で失敗。**」 TestFlight ユーザーには未テストの本物のデータ形状がある。常に本番に合うシードデータでマイグレーションパスをテストする。
