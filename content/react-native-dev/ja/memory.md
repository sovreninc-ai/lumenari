# メモリ — React Native / モバイル開発パック

## ドメインコンテキスト

React Native エンジニアは、iOS と Android でネイティブに感じるべきクロスプラットフォームモバイルアプリを構築しています。彼らは 2 つの世界に同時に住む: プロダクトコード用の JavaScript/TypeScript、加えてネイティブモジュールが避けられないときの Swift/Objective-C と Kotlin/Java。仕事はほとんどがプロダクト作業 — 画面、ナビゲーション、リスト、フォーム、決済、push、ディープリンク — だが最悪のバグは常にブリッジに住む: Android で異なる方法で拒否される permission、iOS で 2 回発火する haptic、3GB Android で速くスクロールすると 6fps に落ちるリスト。

リズムはビルド-テスト-リビルド。Metro バンドラーが 1 つのターミナルで動いている。iOS シミュレーターと Android エミュレーターの両方が開いている。各変更は iOS で 1 秒以内にリロード、Android はもっと遅い。各ネイティブコード変更にはリビルドが必要 — `pod install`、その後 Xcode ビルド、または Gradle 同期。典型的なセッションは、実 iOS ハードウェアでの QA 用の TestFlight ビルドと、Android テスターのために Google Play Console に push された内部トラック APK で終わる。

このドメインでの高くつくレッスン: Expo Go がプロダクションビルドと一致するとは決して信用しない、実機のローエンド Android でのテストを決してスキップしない、permission やバックグラウンド挙動が関わるときプラットフォーム間のパリティを決して仮定しない。出荷の基準は「両方でネイティブに感じる、どちらでもクラッシュしない」。

## AI が知っておくべき用語

- Expo: managed React Native ツールチェーン。「managed ワークフロー」はネイティブコードを隠す；「bare ワークフロー」はそれを露出する。EAS Build は彼らのクラウドビルダー
- ブリッジ: JS↔ネイティブ通信層。「古いブリッジ」は JSON シリアライズの非同期メッセージ。「新アーキテクチャ」（Fabric + TurboModules + JSI）は C++ 経由で同期
- Hermes: 0.70 以降 RN にデフォルトで同梱される JS エンジン。小さいヒープ、速い起動、`eval` なし。on か確認
- Fabric: 新アーキテクチャの新しいレンダラー。レガシー UIManager を置換
- TurboModule: 同期、型安全な呼び出しのために JSI 上に構築されたネイティブモジュール
- JSI: JavaScript Interface、新アーキテクチャの下にある C++ 層
- Reanimated: `react-native-reanimated` v3 — worklet 経由で UI スレッドでアニメーションを実行、JS スレッドではない
- Worklet: Reanimated / Gesture Handler 内で UI スレッドで実行される `'worklet'` 注釈付き関数
- getItemLayout: RN が測定を飛ばせる FlatList prop — `{length, offset, index}` — 長いリストでの速い scroll-to-index に必須
- keyExtractor: 行ごとに安定した文字列 id を返す FlatList prop；なしだと RN はインデックスにフォールバックして積極的に rerender する
- FlashList: Shopify のドロップイン FlatList 置換、リサイクル付き、画像が多いまたは 1000+ アイテムのリストに遥かに優れる
- MMKV: `react-native-mmkv`、AsyncStorage より約 30 倍速いネイティブ key-value ストア
- Pods: CocoaPods、iOS 依存マネージャ。`pod install` は JS deps 変更後に `Podfile.lock` を同期
- Gradle: Android のビルドツール。`./gradlew` はラッパー。「Sync」は deps を引いてプロジェクトファイルを再生成
- APK / AAB: APK はレガシー Android インストールパッケージ；AAB（Android App Bundle）は Play Store が今欲しがるもの
- TestFlight: Apple のベータ配信。最大 10,000 外部テスター、ビルドは 90 日後に失効
- 内部トラック: Google Play Console の内部テストトラック — 最速のレビュー、最大 100 テスター、即時利用可能
- ProGuard / R8: Android コードのシュリンカー / 難読化。R8 はモダンな置換。リリースビルド前に実行
- Safe area: ノッチ、ホームインジケータ、ステータスバー、ナビバーで遮られない可視領域。`useSafeAreaInsets()` を使う
- スプラッシュ画面 / 起動画面: iOS はそれを起動 storyboard と呼ぶ、Android はスプラッシュと呼ぶ。両方 JS 起動前に約 200〜800ms 表示される
- APNs: Apple Push Notification service。トークンはバイナリ、base64 エンコード、約 64 文字
- FCM: Firebase Cloud Messaging。トークンは長い不透明文字列

## よくあるワークフロー

- ナビゲーション + state を持つ画面の雛形: ユーザーが新しい画面を配線したい。トリガー → `screens/NewScreen/index.tsx` を作成、型付きパラメータでスタックナビゲータに登録、画面ローカル state 用にフックファイルを追加、共有 state は Zustand/Jotai に上げる → navigation 型ユニオンを配線 → iOS で戻るジェスチャー、Android でハードウェア戻るをスモークテスト。
- FlatList パフォーマンスパス: ユーザーが長いリストでスクロールがカクつくと報告。トリガー → `keyExtractor` を監査（安定した文字列 id を返す必要）、`renderItem` を監査（`useCallback` または親の外のコンポーネント経由の安定した ref である必要）、行が均一高さなら `getItemLayout` を追加、行コンポーネントを `React.memo` でラップ、Android で `removeClippedSubviews` を確認 → シミュレーターではなくローエンド Android でベンチマーク。
- ネイティブモジュールラッパー: ユーザーが保守されたライブラリのない OS 機能を必要とする（例: カスタム BLE プロトコル、ハードウェア固有のカメラ、Apple Wallet パス）。トリガー → `RCTBridgeModule` 準拠（または TurboModule spec）の Swift クラスを書く、`ReactContextBaseJavaModule` を継承する Kotlin の等価物を書く、`NativeModules.X` 参照と型付き表面を持つ TypeScript ラッパーを書く、必要なら `Info.plist` permission に登録。
- App Store / Play Store 提出: ユーザーが出荷準備完了。トリガー → バージョン + ビルド番号バンプ、Android で R8/ProGuard 実行、iOS で Xcode でアーカイブ、App Store Connect と Play Console にアップロード、App Privacy / Data Safety を記入、必要なすべてのサイズでスクリーンショットを添付、リリースノートを書く、レビューに提出 → iOS では 24〜48 時間のレビューを予期；Android 内部トラックは即時；プロダクショントラックは約 1〜3 日。

## 避けるべきこと / よくある誤り

- Web React の反射: `<div>`、`onClick`、RN がサポートしない CSS プロパティ（例: `display: grid`、`box-shadow`）を持つ `style={{...}}` を書く。RN は Flexbox のみのレイアウトと Yoga 経由の CSS のサブセットを使う。
- プラットフォーム分割を無視する: iOS で動く permission フローを書き、その後 Android にデプロイするが、そこでは permission がマニフェスト宣言だけで付与される — またはその逆。
- 考えずに `Platform.OS === 'ios'`: プラットフォームでの分岐は、乖離が本物でなければコードスメル。多くの場合、正しい修正は分岐を隠す薄い抽象化（`haptics.ts`、`permissions.ts`）。
- Expo Go でテストしてプロダクションと仮定する: Expo Go はカスタムネイティブコードを実行できず、JS 環境は微妙に異なる。出荷判断の前に development client またはプロダクション設定ビルドを構築する。
- バンドルサイズを忘れる: 各ネイティブ dep はインストールサイズを追加する。Android ターゲットは理想的には 30MB 未満；iOS はもっと寛容だがそれでも重要。JS バンドルには `npx react-native-bundle-visualizer`；ネイティブには Android Studio の APK Analyzer。

## トーン / レジスター

実際の RN エンジニアは午後 11 時にビルドエラーをデバッグしたように聞こえる。具体的に言及する: Xcode バージョン、Android API レベル、RN バージョン、Hermes on/off。宗教にせずに問題が「iOS だけ」または「Android だけ」だと認める。ブリッジの奇妙さを説明するコードコメントを書く（「これは iOS 14 でのみ 2 回発火、github.com/...issue/1234 参照」）。「このパッケージをインストールするだけ」と言わない、それが暗示するネイティブリビルドを警告する。コンポーネント名、ブランド名、頭字語以外はすべて小文字を使う — `flatlist`、`reanimated`、`iOS`、`APNs`、`FCM`。
