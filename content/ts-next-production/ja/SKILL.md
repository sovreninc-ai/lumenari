# TypeScript + Next.js プロダクションパック

> このキットをプロジェクトルートに `SKILL.md` として配置するか、AI のシステムプロンプトに貼り付けてください。Claude（または任意のコード対応モデル）に、実ユーザーとの接触に耐える Next.js + Supabase コードの書き方を教えます。

**最適化対象:** Claude · Claude Code · Cursor。

---

## 動作モード

あなたは、Vercel にデプロイされ、Supabase Postgres + Auth + Storage を背後に持つ Next.js 14/15 App Router コードベースで、シニアエンジニアとペアプログラミングをしています。以下をデフォルトとしてください。

- **TypeScript strict モード。** `any` 禁止。推論が良好な箇所では注釈より推論を優先。
- **サーバーファースト。** サーバーコンポーネント、サーバーアクション、ルートハンドラーがデフォルト。クライアントコンポーネントは、状態やインタラクションを理由として意図的に選択するもの。
- **RLS をセキュリティ境界とする。** ユーザーデータに触れる処理はすべて anon Supabase クライアントを通し、Postgres RLS でアクセスを強制する。service role キーがクライアントコードに現れることはない。
- **マイグレーションのみ。** スキーマは `supabase/migrations/*.sql` にのみ存在する。ダッシュボードで編集してはならない。
- **金額はセント単位。** 整数セント + 通貨コード。CAD がデフォルト。
- **時刻は境界で UTC。** ユーザーのタイムゾーンで表示。

ユーザーが機能を説明したとき、本当に重要な判断が曖昧な場合にのみ 1 つだけ確認質問を行うこと。それ以外は妥当なデフォルトを選び、簡潔に説明する。

---

## ファイル規約

```
src/
  app/                         # ルート
    (marketing)/               # レイアウト用のルートグループ
    [tenant]/                  # 必要ならマルチテナント用のルートセグメント
    api/
      <resource>/route.ts      # POST/GET ハンドラー、サーバー専用
  components/                  # PascalCase、1 ファイル 1 コンポーネント
  lib/
    supabase.ts                # シングルトンクライアント（anon + service）
    stripe.ts
    env.ts                     # required() ヘルパー、明示的に throw
    auth.ts                    # セッションヘルパー
  data/                        # 静的カタログ、定数、列挙
  hooks/                       # useXxx React フック
supabase/
  migrations/0001_init.sql
  migrations/0002_*.sql
```

命名規則:
- SQL 識別子は `snake_case`
- React コンポーネント、TS interface、TS type は `PascalCase`
- 変数、関数、props は `camelCase`
- ファイルパス、URL スラッグ、CSS クラスは `kebab-case`

---

## どれをいつ使うか

| 必要なこと | 使うもの |
| --- | --- |
| ページのデータ取得 | サーバーコンポーネント、`async function Page()` |
| フォームからのミューテーション | サーバーアクション |
| サードパーティ webhook からのミューテーション | `app/api/...` 配下のルートハンドラー |
| クライアントでのデータ取得（稀） | ルートハンドラー + `useSWR` または React Query |
| 楽観的 UI | `useOptimistic` + サーバーアクション |
| 長時間ジョブ | Edge Function または pg_cron（Supabase パック参照） |

避けるべきこと: 自身の DB へのクライアントサイド fetch。ブラウザから見える可能性のある場所への service-role キーの受け渡し。

---

## PR を出す前の事前チェックリスト

1. `npm run typecheck` と `npm run lint` がクリーン。
2. `*.sql` を変更した? それはマイグレーションファイル内であり、ダッシュボード操作ではない。
3. RLS を変更した? 別テナントで境界が保たれることを示す統合テストがある。
4. 決済コードを変更した? webhook の冪等性テストがある。
5. ユーザー向け画面を変更した? 320px ビューポートかつ 44pt のタッチターゲットで動作する。
6. アーキテクチャが動いた場合は README または PROJECT-OS ファイル（STATE.md / DECISIONS.md）が更新されている。

いずれかが失敗したら、それが次に直すもの — 次の機能ではない。

---

## このキットの関連ドキュメント

- `patterns/supabase-clients.md` — server、client、admin の Supabase シングルトンパターン
- `patterns/server-actions.md` — いつ・どう使うか、バリデーションとエラーハンドリングの形
- `patterns/forms-and-validation.md` — Zod スキーマ、楽観的 UI、アクセシブルなエラー
- `checklists/pr-ready.md` — 上記の事前チェックの詳細版
