# App Store 対応チェックリスト

App Store Connect で **Submit for Review** を押す前に通すリスト。最もリジェクトされやすいもの順で、面白い順ではない。

---

## 1. プライバシーマニフェスト（`PrivacyInfo.xcprivacy`）

**2024 年 5 月以降必須** — required-reason API を使うあらゆるアプリに。マニフェストがないと、レビュー時ではなく提出時にリジェクトされる。

`PrivacyInfo.xcprivacy` をアプリターゲットに追加。構造:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
    <key>NSPrivacyCollectedDataTypes</key>
    <array>
        <!-- データカテゴリごとに 1 dict -->
    </array>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>CA92.1</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
```

ほぼ確実に必要となる required-reason API カテゴリ:

| アプリが使うもの... | API カテゴリ | 一般的な理由コード |
| --- | --- | --- |
| `UserDefaults` | `NSPrivacyAccessedAPICategoryUserDefaults` | `CA92.1`（アプリ自身のデータ） |
| `FileManager` タイムスタンプ | `NSPrivacyAccessedAPICategoryFileTimestamp` | `C617.1`（同期 / バックアップ）、`DDA9.1`（ユーザーへの表示） |
| `systemUptime` / 起動時間 | `NSPrivacyAccessedAPICategorySystemBootTime` | `35F9.1`（アプリイベントのタイムスタンプ） |
| ディスク空きクエリ | `NSPrivacyAccessedAPICategoryDiskSpace` | `85F4.1`（ユーザーへの表示） |
| 起動時の `UIPasteboard` 読み取り | `NSPrivacyAccessedAPICategoryActiveKeyboards` | `54BD.1`（翻訳） |

サードパーティ SDK は今、自前のプライバシーマニフェストを同梱している。依存をアップグレードするとき、追加されたかをチェック。Xcode がビルド時に集約する。

---

## 2. App Store Connect の App Privacy 詳細

マニフェストとは別。App Store Connect の Web UI のアプリ → App Privacy で記入。

正直に宣言するカテゴリ:

- **連絡先情報**（名前、メール） — サインアップで収集する場合
- **識別子**（ユーザー ID、デバイス ID）
- **使用データ**（プロダクトインタラクション）
- **診断**（クラッシュログ、パフォーマンスデータ）
- **購入** — 決済を処理する場合
- **位置情報** — 粗いか正確か、ID にリンクされているか

各項目: ユーザーの ID にリンクされているか? トラッキングに使われるか? アプリ機能の提供に使われるか? ここで嘘をつくと削除の根拠になる。

---

## 3. 必須のデバイススクリーンショット

App Store Connect は特定の表示サイズのスクリーンショットを要求する。2024 年時点:

| デバイス | 必要サイズ | 表示 |
| --- | --- | --- |
| iPhone 6.7"（15/16 Pro Max） | 1290 × 2796 | 必須 |
| iPhone 6.1"（15/16 Pro） | 1179 × 2556 | 6.7" がない場合に必須 |
| iPhone 5.5"（8 Plus） | 1242 × 2208 | 旧ターゲットに必須 |
| iPad Pro 12.9"（第 6 世代） | 2048 × 2732 | iPad 対応の場合に必須 |
| iPad Pro 13"（M4） | 2064 × 2752 | 任意 |

App Store Connect の Screenshot Designer を使えるが、ほとんどのチームは Fastlane Snapshot で生成するか、Figma でデザインモックを作って正しい解像度でエクスポートする。

最小: 必須デバイスごとに 3 スクリーンショット。推奨: 5〜10。最初のスクリーンショットは検索結果で人が見るもの — 大事にすること。

---

## 4. メタデータ

- **アプリ名**: 最大 30 文字。バンドルと一致する必要あり。
- **サブタイトル**: 30 文字。検索結果で表示。
- **プロモーションテキスト**: 170 文字。再提出なしで編集可能 — 期間限定メッセージに使う。
- **説明**: 4,000 文字。「もっと見る」前に最初の 3 行が表示される。機能リストではなく、価値で始める。
- **キーワード**: 合計 100 文字、カンマ区切り。アプリ名やカテゴリに既に含まれる単語は除く — Apple が自動的にインデックスする。
- **サポート URL**: 必須、公開対応。
- **プライバシーポリシー URL**: データ収集するアプリには必須。
- **What's New**: 4,000 文字。アップデートごとに必須。「バグ修正とパフォーマンス改善」は今でも通るが、レビュアーは具体性を好む。

---

## 5. ビルド設定 + ケイパビリティ

- [ ] **デプロイメントターゲット**が正しく設定されている。低 = より多くのユーザー、より多くの互換コード。`@Observable` + SwiftData を狙う新規アプリには iOS 17 が妥当な下限。
- [ ] **Bundle ID** が CloudKit コンテナ、プッシュ通知証明書、App Group 識別子と一致。
- [ ] **バージョン + ビルド番号**がインクリメントされている。App Store Connect は重複ビルドを拒否。
- [ ] **App Transport Security**: 文書化された理由なしに `NSAllowsArbitraryLoads` を使わない。
- [ ] **Background Modes**: 実際に使うものだけ。レビュアーは理由を聞く。
- [ ] **ケイパビリティ**: iCloud、Sign in with Apple、Push Notifications — 各々が entitlement ファイルに記載され、かつ App Store Connect で設定される必要がある。

---

## 6. Sign in with Apple

アプリがサードパーティのソーシャルログイン（Google、Facebook など）を提供する場合、Apple は Sign in with Apple の提供も要求する。これは App Store Review Guideline 4.8 で、強制される。

例外:

- 自前のアカウントシステム（サードパーティソーシャルなし） → 要件なし
- 特定の企業認証を使う教育 / エンタープライズ / ビジネスアプリ → 免除
- ID.me や政府認証などの ID プロバイダを使うアプリ → 免除

迷ったら Sign in with Apple を追加する。リジェクトを避けるための 2 日の作業。

---

## 7. アプリ内課金

アプリ内で消費されるデジタル商品を売る場合、必ず StoreKit を使う必要がある。外部決済リンク、Web サイトチェックアウトを指す QR コードは NG。ガイドライン 3.1.1。

例外:

- 「リーダー」アプリ（Spotify、Netflix、Kindle）は外部リンク可能 — ただし External Link Account Entitlement と特定の免責事項が必要
- 物理商品、アプリ外で消費されるサービス（Uber、不動産リスティング） — Stripe で OK
- 個人間サービス（オンライン家庭教師、フリーランスワーク） — Stripe で OK

すべての IAP フローを Sandbox でテスト。キャンセル + 再購読。Restore Purchases ボタンは必須。

---

## 8. アクセシビリティ監査

レビュアーがスポットチェックする 4 つ:

- [ ] アイコンのみのボタンすべてに **VoiceOver ラベル**（`accessibilityLabel`）
- [ ] **Dynamic Type** が AX5（最大アクセシビリティサイズ）で — テキストが切れない
- [ ] **色のコントラスト** 本文テキスト 4.5:1、大きいテキスト 3:1（WCAG AA）
- [ ] 大きなアニメーションに **Reduced motion** の代替

Xcode の Accessibility Inspector を各主要画面で実行する。

---

## 9. クラッシュ & パフォーマンス

- [ ] ユーザー入力から到達可能な `fatalError(...)` パスがない
- [ ] 3 年前のデバイスで 400ms 未満で起動
- [ ] 出荷コードに `print(...)` が残っていない — `Logger` に置き換え
- [ ] Instruments → Allocations でメモリ使用量をプロファイル
- [ ] 循環参照なし（Instruments → Leaks）
- [ ] ネットワーク呼び出しにタイムアウトあり（`URLSession` のデフォルトは 60s — 明示的に設定する）

Simulator だけでなく実機で実行する。パフォーマンス特性が異なる。

---

## 10. 提出前の TestFlight

提出前に少なくとも 1 回の TestFlight サイクルを必ず実施:

1. ビルドを Archive（Xcode で Product → Archive）
2. Organizer 経由でアップロード
3. 処理を待つ（約 10 分）
4. 内部テストグループに追加（最大 100 テスター、レビュー不要）
5. 実際に試してくれる 3〜5 人に送る
6. フィードバックを 48 時間待つ
7. 出てきたものを直す
8. App Store Review に提出

外部 TestFlight（最大 10,000 テスター）は「Beta App Review」が必要 — 通常 24 時間、本格的な App Store Review よりは軽い。

---

## 11. 提出後の 24 時間

- App Store Review は通常 24〜48 時間。
- リジェクトされたら、メールにガイドライン番号が記載される。返信前に 2 回読む。
- App Store Connect の Resolution Center 経由でリジェクトに返信できる。礼儀正しく、具体的に、リジェクトが曖昧なら明確化の質問をする。
- 厳しく見えるリジェクトの多くは、ボット駆動の初回パス。アピールを書けば人間が読む。

よくある初回リジェクト:

- **2.1（App Completeness）**: スクリーンショット、デモアカウント認証情報、プライバシーポリシー URL の欠落
- **4.0（Design）**: アプリが Web ページのように見える、iOS の慣習に従わない
- **4.8（Sign in with Apple）**: Sign in with Apple なしでソーシャルログインを提供
- **5.1.1（Data Collection and Storage）**: App Privacy で開示せずにデータを収集

---

## 提出前の最後 5 分パス

- [ ] バージョンがバンプされた `main` ブランチからビルドされた Archive
- [ ] プライバシーマニフェストが存在し、使用するすべての required-reason API を列挙
- [ ] App Store Connect の App Privacy セクションがアプリの実態と一致
- [ ] 必須のすべてのデバイスサイズのスクリーンショットをアップロード
- [ ] App Review Information セクションにデモアカウント認証情報を提供（ログインが必要な場合）
- [ ] Simulator だけでなく実機でテスト
- [ ] What's New テキストを記述（「バグ修正」ではない）
- [ ] Sign in with Apple を提供（他のソーシャルログインを提供する場合）
- [ ] 本番ビルドに `print()`、`// TODO`、テスト用 API キー、到達可能なデバッグメニューがない
