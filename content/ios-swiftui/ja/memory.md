# メモリ — iOS / SwiftUI プロダクションパック

## ドメインコンテキスト

SwiftUI 開発者は、state を読んでより多くの view を返す小さな `View` struct を組み合わせて機能を出荷します。日々は Xcode（IDE）、Simulator（あるいは USB ケーブル接続の実機）、Instruments（パフォーマンス用）、App Store Connect の Web UI（ビルド、TestFlight、提出用）の間を移動しながら過ごします。ほとんどが一度に 1 つのアプリを出荷し、しばしばソロまたは 2〜3 人のチーム。

仕事のサイクルは: view を書く、Cmd+R を押す、Canvas プレビューが再描画されるのを見る、レイアウトのバグを直す、state を追加する、SwiftData で永続化、CloudKit で同期、スナップショットテストを書く、TestFlight にアップロード、フィードバックをもらう、繰り返す。遅い部分は: App Store Review（24〜48 時間）、大規模コードベースのビルド時間、期待どおりに更新されない SwiftUI ビューの原因究明。

個人開発者は App Store ランキング、ASO、スクリーンショット、レビュー、リジェクト-再提出ループを気にする。チーム開発者はモジュラアーキテクチャ、テストカバレッジ、ビルド速度、新しいエンジニアを「Xcode 部族知識」のしごきなしでオンボードすることを気にする。

## AI が知っておくべき用語

- **HIG**: Human Interface Guidelines — Apple のデザインルール。WWDC で毎年更新。
- **WWDC**: Worldwide Developer Conference。毎年 6 月。新 OS、新 API。
- **SF Symbols**: Apple のアイコンライブラリ、約 5,000 シンボル、`Image(systemName: "heart.fill")` で利用可能。
- **TestFlight**: Apple のベータ配信。内部テスター最大 100 人、外部 10,000 人。ビルドは 90 日後に失効。
- **App Store Connect**: ビルド、メタデータ、価格、TestFlight、App Store Review を管理する Web UI。
- **`@Observable`**: Swift マクロ（iOS 17+）、`ObservableObject` + `@Published` を置き換え。プロパティ読み取りを自動追跡。
- **SwiftData**: Apple の永続化フレームワーク（iOS 17+）、Core Data の後継。`@Model` クラス、`@Query` 読み込み。
- **CloudKit**: Apple のクラウド同期、ユーザー無料、無料枠は寛大（1GB/ユーザー）。`cloudKitDatabase: .automatic` 経由で SwiftData と組み合わせる。
- **`.task` 修飾子**: view のライフタイムにスコープされた async タスクを実行。消失時にキャンセル。
- **プライバシーマニフェスト（`PrivacyInfo.xcprivacy`）**: required-reason API の使用とサードパーティ SDK のデータ収集を宣言する XML ファイル。2024 年 5 月以降、App Store 提出に必須。
- **App Store Review Guidelines**: レビュアーが実際に強制するルール。リジェクトの大半はセクション 2（Performance）、4（Design）、5（Legal）で発生する。
- **StoreKit 2**: モダンなアプリ内課金 API。`Product`、`Transaction`、async ファースト。
- **ProMotion**: 120Hz ディスプレイ。一部のアニメーションは正しく感じるために明示的な `.animation(.smooth, value:)` が必要。
- **Catalyst**: iPad アプリを Mac で動かす。異なるイディオム — ポインターホバー、メニューバー、ウィンドウリサイズ。
- **visionOS**: ヘッドセット OS。ボリュメトリック vs. ウィンドウアプリ。iOS と同じではない。

## よくあるワークフロー

- **永続化を伴う画面の追加**: `@Model` を定義 → `@Query` を持つ `View` を追加 → `NavigationLink(value:)` 経由で destination を追加 → 親の `.navigationDestination(for:)` から配線。
- **CloudKit 同期の追加**: CloudKit + Background Modes ケイパビリティを有効化 → `ModelConfiguration` に `cloudKitDatabase: .automatic` を設定 → モデルプロパティをすべてデフォルト値か optional に → 同じ iCloud にサインインした 2 デバイスでテスト。
- **TestFlight への出荷**: ビルド番号をバンプ → Archive → Xcode Organizer 経由でアップロード → 処理を待つ（約 10 分） → 内部テストに追加 → テスターを招待 → フィードバックを待つ。
- **App Store Review への提出**: App Privacy セクションを記入 → スクリーンショットをアップロード（6.7"、6.1"、iPad 12.9" 必須） → What's New を書く → 提出 → 24 時間以内にレビュアーの質問に回答。
- **SwiftUI レンダーバグの診断**: `.id(value)` を追加して再作成を強制、または body 内に `let _ = Self._printChanges()` を入れて再描画のトリガーを確認。

## 避けるべきこと / よくある誤り

- 理由なく同じプロジェクトで `ObservableObject` と `@Observable` を混在させる。1 つに統一する — iOS 17+ なら `@Observable`。
- モデルを 1 度だけ `@MainActor` でマークする代わりに、あちこちに `Task { @MainActor in ... }` を書く。
- 派生値（`var fullName: String`）を `@State` として保存する。計算する。`var fullName: String { "\(first) \(last)" }`。
- `HStack` + `Spacer` + アライメントガイドで済むレイアウトに `GeometryReader` を使う。`GeometryReader` はフォールバックであり、デフォルトではない。
- `URL(string: "https://...")` の force-unwrap。理由があって optional。失敗時はクローズする。
- SwiftUI が state 変化ごとに view 全体を再作成することを忘れる — body を軽くする。重い計算は外に出す。
- ライト / ダーク + WCAG 確認済みのバリアントをサポートするアセットカタログがあるのに、16 進カラーをハードコード。
- 「アプリはデータを収集しない」からとプライバシーマニフェストを省略する。`UserDefaults`、`FileManager` タイムスタンプ、システム起動時間、ディスク空きを触ったら — required-reason API。マニフェストが必要。

## トーン / レジスター

実際の iOS 開発者は「shipping」と「the build」の用語で話す。WWDC セッションを番号で参照する（「observation のセッション、10149」）。サードパーティ依存を信用しない、それぞれが App Store リスクを足すから。Apple のフレームワークが粗くてもそれを好む。実機では動くが Xcode プレビューで動かないとき「Simulator が嘘をついている」と言う。print より Logger を使う。AppDelegate ライフサイクルの混乱に火傷した。新規作業に SwiftUI が UIKit より良いと絶対に言うが、SwiftUI の text view が及ばないとき静かに UIKit ブリッジを書く。
