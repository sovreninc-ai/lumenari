# iOS / SwiftUI プロダクションパック

> Apple のドキュメントは API をカバーする。このキットは判断をカバーします: `@Observable` と environment のどちらを使うか、SwiftData がスケールで破綻するポイント、App Store のレビュアーが実際に何を確認しているか、リリースごとに出荷される SwiftUI の落とし穴。

**最適化対象:** Claude · Claude Code · Cursor。

---

## 動作モード

あなたは、App Store 行きのプロダクション SwiftUI アプリでペアプログラミングをしています。デフォルトの前提:

- **Swift 5.9+** と **`@Observable` マクロ**。デプロイターゲットが強制する場合を除き、`ObservableObject` / `@Published` は使わない。
- **NavigationStack**、廃止された `NavigationView` ではない。
- ローカル永続化には **SwiftData**。モデルコンテナの `cloudKitDatabase` 修飾子経由で **CloudKit** による無料のクロスデバイス同期。
- **構造化並行性** — `async`/`await`、`Task`、アクター。コールバック API 内でなければ `DispatchQueue.main.async` は使わない。
- **プライバシーマニフェスト（`PrivacyInfo.xcprivacy`）は必須**（2024 年 5 月以降）。これがないとレビュアーはリジェクトする。
- **App Store Review Guidelines が仕様**。AI が 2.1、4.2、5.1.1 に違反する提案をしたら、押し返す。

ユーザーが Android や React Native のようなコード — `Provider`、`BLoC`、observable subjects、prop drilling — を要求したら、代わりに Swift のイディオムに翻訳する。SwiftUI は views + state + environment で考えることに報いる、ストリームで考えることではない。

---

## メンタルモデル

```
[ View（struct、値型） ]
        │
        ├── ビューローカルな真実には @State
        ├── @Observable モデルへの双方向バインディングには @Bindable
        ├── 環境依存（アンビエント依存性）には @Environment(\.thing)
        └── SwiftData の読み込み（ライブ、observed）には @Query

[ Model（class、@Observable） ]
        │
        └── ビジネス状態を保持。メソッド経由でのみ変更。

[ ModelContainer（SwiftData） ]
        │
        └── アプリごとに 1 つ、@main で設定。CloudKit 対応または非対応。
```

view は state の関数。派生値を保存しない — 計算する。レイアウトシステムと戦わない — スタックとアライメントガイドを尽くしてから `Layout` または `GeometryReader` を使う。

---

## 標準的な view + model + SwiftData の例

これは、「永続化と画面を伴う機能を追加」というリクエストに対して AI が従うべき形です。

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

// MARK: - ViewModel（ロジックが「プロパティを設定する」を超える場合のみ）
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

この形における譲れない点:

1. **`@Query`、`FetchRequest` ではない。** SwiftData のリアクティブな読み込み。
2. **`NavigationLink(value:)` + `.navigationDestination`** — 値駆動のナビパターン。destination view を直接受け取る廃止されたイニシャライザは使わない。
3. **空状態には `ContentUnavailableView`**。説明のない真っ白な画面はレビュアーが気づく。
4. **ここでは `@Bindable` は不要** — エディタは `@State` 所有で、`$editor.title` 経由でアクセスされるため。`@Bindable` は `@Observable` モデルが子ビューに渡されるときに使う。

---

## `@main` のセットアップ（CloudKit 対応）

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
                cloudKitDatabase: .automatic   // entitlement のコンテナを使用
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

AI が警告すべき CloudKit の落とし穴:

- CloudKit が有効な場合、`@Model` の各プロパティはデフォルト値を持つか、optional である必要がある。CloudKit は「作成時のみ必須」のフィールドをサポートしない。
- CloudKit 同期モデルには unique 制約を付けられない。コードで一意性を強制する。
- リレーションシップは optional またはデフォルト値を持つ必要がある。逆リレーションシップは必須。
- entitlement の CloudKit コンテナ ID は、bundle ID と正確に一致する必要がある。`iCloud.com.yourdomain.workouts`。

---

## 並行性 — 重要なルール

```swift
// 良い: 構造化並行性、UI のある場所では MainActor 隔離。
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

// view 内で:
.task { await loader.load() }
```

ルール:

1. **`.task` はビューが消えるとキャンセルされる。** 画面スコープの async 作業に使う。理由がない限り `.onAppear` から `Task { }` を生成しない。
2. **SwiftUI から読まれるモデルには `@MainActor`**。手動の `await MainActor.run { }` の踊りは省略。
3. **UI 外の共有可変状態にはアクター** — キャッシュ、websocket マネージャ。view-model には使わない。
4. **並列作業には `async let`**、動的なファンアウトには `withTaskGroup`、`Task.detached` は本当に別の隔離ドメインが必要なとき（ほぼないが）にのみ。

---

## アクセシビリティ — レビュアーがスポットチェックする 4 つ

1. **VoiceOver ラベル。** アイコンのみのボタンには `.accessibilityLabel("Add workout")` が必要。SF Symbols は VoiceOver に意味を伝えない。
2. **Dynamic Type。** `.font(.body)`、`.font(.headline)` を使う。`.system(size: 17)` をハードコードしない。AX5（最大アクセシビリティサイズ）でテスト。
3. **コントラスト。** `Color.primary`、`Color.secondary`、セマンティックカラーを使う。カスタム色は WCAG AA（本文テキストで 4.5:1）に合致する必要がある。
4. **Reduced motion。** 大きなアニメーションは `@Environment(\.accessibilityReduceMotion)` で包み、クロスフェードのフォールバックを提供する。

---

## このキットが拒否すること

- iOS 17+ を対象とするときに `ObservableObject` + `@Published` を提案すること。`@Observable` を使う。
- 新規コードで `NavigationView` を書くこと。廃止されている。
- view の state に `Combine` の publisher を使うこと。SwiftUI には独自の observation システムがある。
- プライバシーマニフェストの省略。required-reason API（ファイルタイムスタンプ、user defaults、システム起動時間、ディスク空き、アクティブなキーボード）を呼び出すアプリは、`PrivacyInfo.xcprivacy` がないとリジェクトされる。
- URL、アセット名、モデル ID の `force-unwrap` を推奨すること。`URL(string:)` は optional を返す。失敗時はクローズする。
- 本当のネットワークに到達するテストを書くこと。API レイヤーをモックする。

---

## 関連ドキュメント

- `patterns/swiftui-idioms.md` — Observable、environment、ナビゲーション、シート、SwiftUI 落とし穴リスト
- `patterns/swiftdata-cloudkit.md` — スキーマ、リレーションシップ、predicate、マイグレーション、CloudKit entitlement
- `checklists/app-store-readiness.md` — プライバシーマニフェスト、スクリーンショット、App Privacy 詳細、TestFlight、よくあるリジェクト理由

---

## SwiftUI PR をマージする前のサニティチェック

- [ ] すべての view が `struct`、すべてのモデルが `final class`
- [ ] iOS 17+ をターゲットとするコードに `ObservableObject` がない
- [ ] あらゆる場所で `NavigationStack`、`NavigationView` ではない
- [ ] 非同期作業は `.task` を使用、`.onAppear` の `Task { }` ではない
- [ ] 空状態が `ContentUnavailableView` をレンダリングする
- [ ] アイコンのみのボタンに VoiceOver ラベル
- [ ] Dynamic Type が AX5 で切れずに動作する
- [ ] プライバシーマニフェストが存在し、使用するすべての required-reason API を列挙
- [ ] 出荷コードに `print(...)` が残っていない — `Logger` を使う
