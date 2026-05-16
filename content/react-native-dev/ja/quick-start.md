# クイックスタート — React Native / モバイル開発パック

60 秒以内に稼働するはずです。ツールを選んでください。

## Claude ユーザー

Claude を開く。新しいプロジェクトを作成（Pro または Team プランがプロジェクトに必要だが、プロンプトは通常のチャットでも動く）。プロジェクトの「カスタム指示」欄に `optimization-pack.md` の全内容を貼り付ける。Claude が参照として持てるよう、`memory.md` と `patterns/component-and-native-modules.md` をプロジェクトナレッジにアップロード。新しい会話を開始。最初のメッセージ: セットアップを Claude に伝える — 「Expo の bare ワークフロー、RN 0.74、新アーキテクチャ on、iOS + Android がターゲット」 — その後、構築したいものを記述。

## ChatGPT ユーザー

ChatGPT を開く。「GPT を探す」 → 「GPT を作成」をクリック（Plus プラン必要）。「Instructions」欄に `custom-gpt-instructions.md` の全内容を貼り付ける。「Conversation starters」には、そのファイル末尾にある 5 つを使う。「Knowledge」に `memory.md` と `patterns/component-and-native-modules.md` をアップロード。GPT を保存（自分専用で問題なし）。開いて始める: 「Expo bare、RN 0.74、iOS + Android。新しい画面を組みたい。」

ChatGPT Plus がなければ、`optimization-pack.md` を通常のチャットの先頭に貼り付ける。動く — 永続的な GPT とファイルアップロードを失うだけ。

## Gemini、Cursor、Codex、その他の AI ツール

ツールを開く。新しい会話を開始。`optimization-pack.md` の全内容を最初のメッセージとして貼り付ける。追加: 「これを読み込んだことを確認し、Expo ワークフロー、RN バージョン、ターゲットプラットフォームを聞いてほしい。」 それを行ったら準備完了。

Cursor 専用: `SKILL.md` をプロジェクトルートに配置。Cursor の `.cursorrules` またはプロジェクトルールが自動的に拾う。

---

## 動作確認

システムプロンプトを読み込んだら、これを貼り付ける:

```
テスト実行。Expo bare ワークフロー、RN 0.74、新アーキテクチャ on、iOS 15+ と Android 8+ がターゲット。API から取得した、アバター付きチャットメッセージ 500 件のリストを表示する画面が必要。3GB Android でスムーズスクロール。画面ファイル、行コンポーネント、データフックを渡してほしい。
```

返ってきたものが、安定した `keyExtractor`、`React.memo` された行、抽出された `renderItem` ref、明示的に指定された画像の寸法、unmount 時の abort 付きネットワークフック、末尾の iOS/Android 乖離注記を持つ `FlatList`（または `FlashList`）であれば — キットは正しく読み込まれています。

返ってきたものが `.map()` を使う `ScrollView`、インライン `renderItem={(item) => <Row />}`、Android パフォーマンスへの言及なし、であれば、システムプロンプトが読み込まれていない — もう一度貼り付ける。
