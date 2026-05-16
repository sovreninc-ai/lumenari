# SwiftUI イディオム

あらゆる SwiftUI コードベースに現れるパターン、そして毎リリースで噛みつく落とし穴。下限を Swift 5.9+ と iOS 17+ と仮定して記述。

---

## State、observation、binding — 何に手を伸ばすか

| 状況 | 手を伸ばすもの |
| --- | --- |
| view が誰も必要としない小さな state を所有 | `@State` |
| 子 view が親の `@State` を変更する必要 | `$value` を `Binding` として渡す |
| 計算プロパティやメソッドを持つ view-model | `@Observable final class` + `@State private var vm = VM()` |
| 親が所有し、子が双方向 binding で使う view-model | 親: `@State var vm = VM()`。子: `@Bindable var vm: VM` |
| 環境依存（セッション、テーマなど） | `@Environment(\.thing)` + `EnvironmentValues` 拡張 |
| SwiftData 行の読み込み | `@Query(sort: \Model.field, order: .reverse) var items: [Model]` |
| リアクティブな UserDefaults | `@AppStorage("key") var thing: String = "default"` |
| 親から渡された SwiftData オブジェクトの読み込み | プロパティ: `var item: Item`（読み込み）または `@Bindable var item: Item`（書き込み） |

よくある誤り: iOS 17+ で `@StateObject` を使うこと。`@Observable` を使う場合、正しい組み合わせは `@State`（所有用）+ `@Bindable`（子での双方向 binding 用）。`@StateObject` は古い `ObservableObject` の世界のもの。

---

## ナビゲーション — 値駆動、ビュー駆動ではない

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

なぜ: プログラムによるナビゲーションが簡単になる（`path.append(Route.profile(...))`）、ディープリンクは `NavigationPath` のデコーダになる、廃止された `NavigationLink(destination:)` が消える。

シートとフルスクリーンカバーには: `.sheet(item:)` を optional Identifiable と組み合わせて使う、`.sheet(isPresented:)` + アイテム用の追加 `@State` ではない。

```swift
@State private var editing: Workout?

// ...
.sheet(item: $editing) { workout in
    WorkoutEditor(workout: workout)
}
```

---

## 親を変更するシート

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

`onSave: (String) -> Void` のようなクロージャコールバックを渡さない。Binding が SwiftUI の作法。

---

## リスト — パフォーマンス + UX

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

落とし穴:

- **行の中に重い計算を置かない。** モデルで 1 度だけ計算する。
- **`Identifiable` が重要。** アイテムに安定した ID がないと、`ForEach` がすべてを再描画する。
- **`.refreshable` は async。** `Task { }` を起動しない — 直接 `await` する。
- **`ScrollView` の中の `LazyVStack`** は、`List` が提供する以上のレイアウト制御が必要なときの代替。List はデフォルトで速く、見た目もきれい — 理由がない限りそちらを使う。

---

## フォーム — 正しいプリミティブ

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

`Form` は inset grouped の見た目を無料で提供する。ヒントとバリデーションメッセージには `Section` のヘッダとフッタを使う。キーボードを `.scrollDismissesKeyboard(.interactively)` で隠す。

---

## アニメーション — 知っておく価値のある 4 修飾子

| 修飾子 | 使い時 |
| --- | --- |
| `.animation(.smooth, value: state)` | `state` が変わったときにアニメート（iOS 17 以降推奨） |
| `withAnimation { state = ... }` | 特定の state mutation をアニメート |
| `.transition(.move(edge: .bottom))` | 条件付き view の挿入 / 削除アニメーション |
| `.matchedGeometryEffect(id:in:)` | 2 つの view 間のヒーローアニメーション |

reduced motion を尊重:

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

// ...
.animation(reduceMotion ? .none : .smooth, value: state)
```

---

## 毎リリースで出荷される落とし穴

1. **view body は何度も実行される。** `print(...)` をデバッグに置かない — 代わりに `let _ = Self._printChanges()` を使い、再描画の*理由*をログする。

2. **`@State` のイニシャライザは 1 度だけ実行され、再描画ごとではない。** `@State private var thing = expensiveCompute()` は OK。ただし `expensiveCompute()` が view に渡された prop に依存するなら、prop が変わっても再実行されない — `.onChange(of: prop)` を使うか、view-model に移す。

3. **view body の `if let` は unwrap の構文であり、binding のショートカットではない。** optional に binding するには `Binding(get:set:)` を使うか、カスタムプロパティラッパー経由の新しい `$value.unwrapped` パターンを使う。

4. **`@Environment` の読み込みは型が正確に一致する必要。** `@Environment(\.modelContext)` は `ModelContext` を返す。`@Environment(\.dismiss)` は `DismissAction` を返す。カスタム環境値は key と value 型の両方が揃う必要がある。

5. **`Task` のキャンセルは協調的。** async 関数の中で、イテレーション点で `try Task.checkCancellation()` を呼ぶ。SwiftUI の `.task` 修飾子は view が消えるとキャンセルする — ただしチェックすればの話。

6. **`axis: .vertical` の TextField は `lineLimit(_...:)` が必要**、実際に伸びるために。デフォルトは単一行。

7. **`onAppear` は 1 度実行。`onChange` は変化ごとに実行。** 両方必要なら `.task(id:)` を使う — appear で実行され、id が変わると再実行される。

8. **子のサイズ決めに `GeometryReader` を避ける。** 利用可能な空間を埋めるよう拡張し、よくレイアウトを壊す。カスタムレイアウトには `Layout` プロトコルかアライメントガイドを優先。

---

## ツールバー配置チートシート

| 配置 | 何をするか |
| --- | --- |
| `.primaryAction` | 右上のプライマリーボタン（Add、Save） |
| `.confirmationAction` | シート / モーダルの確認（Done、Save） |
| `.cancellationAction` | シート / モーダルのキャンセル |
| `.navigation` | 戻るボタン領域、左側 |
| `.topBarLeading` / `.topBarTrailing` | 必要なときの明示的な配置 |
| `.keyboard` | キーボードの上（テキストフィールドの Done ボタン） |
| `.bottomBar` | 下部ツールバー（iOS） |

プライマリーアクションのボタンを `.navigation` に置かない。`.primaryAction` を使う。

---

## SwiftUI で足りないとき

UIKit へのブリッジが正解なときがある。`UIViewRepresentable` または `UIViewControllerRepresentable` を使う:

- SwiftUI で誰も匹敵できない属性付き文字列レンダリングのカスタムテキストビュー
- カメラまたは写真ピッカー（ただし `PhotosPicker` + `AVCaptureSession` の SwiftUI ラッパーがほとんどのケースをカバー）
- `UIView` や `UIViewController` を公開し、置換を拒むサードパーティ SDK

SwiftUI が今ネイティブに処理するものではブリッジしない: マップ（`Map`）、Web ビュー（`WebView` が来る、それまでは `WKWebView` ブリッジ）、写真ピッカー（`PhotosPicker`）、共有シート（`ShareLink`）。
