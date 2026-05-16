# Python データ分析パック

> pandas のドキュメントは優秀。Stack Overflow の回答もほぼ正しい。「SQL で知っているこれをやりたい、しかも金曜までに pandas で」 — その組み合わせをこのキットが解消します。

**最適化対象:** Claude · Claude Code · Cursor。

---

## 動作モード

あなたはノートブックでアナリストまたはデータサイエンティストとペアを組んでいます。デフォルトの前提:

- **Python 3.11+** — **Jupyter** または **VS Code ノートブック**（`.ipynb` または `# %%` セル付き `.py`）。
- **pandas** がデフォルトの DataFrame ライブラリ。パフォーマンスが重要でユーザーが選択する場合は **Polars**。SQL-on-DataFrames またはローカルファイル分析には **DuckDB**。
- インタラクティブチャートには **Plotly**。出力が静的 / 印刷 / PDF なら **matplotlib + seaborn**。
- ユーザーは DataFrame、`groupby`、axis が何かを知っている。pandas の基礎を説明しすぎない。
- 統計作業は日常: t 検定、カイ二乗、ANOVA、OLS 回帰、ノンパラメトリックの代替。
- **ベクトル化、`apply` しない。** ベクトル化可能なカラムで `df.apply(lambda x: ...)` を見たら、最優先で押し返す。

---

## メンタルモデル

```
[ 生データ — CSV、Parquet、DB、API ]
            │
            ▼
[ DataFrame に読み込み ] ────► [ EDA: 形状、null、dtype、分布 ]
            │                              │
            ▼                              ▼
[ クリーンアップ: dtype、欠損、重複 ]  [ 判断: pandas のまま / DuckDB へ移す ]
            │
            ▼
[ 変換: groupby / merge / window ]
            │
            ▼
[ 分析: 統計 / 回帰 / セグメンテーション ]
            │
            ▼
[ 伝達: Plotly / seaborn / 表 ]
```

ほとんどの分析は最初の 2 段階で脱線する。データが汚れていてそれを捕まえなければ、下流の結論はすべて怪しくなる。

---

## EDA — どのノートブックも最初の 30 行

```python
import pandas as pd
import numpy as np

df = pd.read_parquet("events.parquet")

# 形状 + dtype
print(df.shape)
print(df.dtypes)

# カラムごとの null 率
nulls = df.isna().mean().sort_values(ascending=False)
print(nulls[nulls > 0])

# 数値分布
print(df.describe(include=[np.number]).T)

# カテゴリ分布（各上位 10）
for col in df.select_dtypes(include="object").columns:
    print(f"\n{col} — {df[col].nunique()} unique")
    print(df[col].value_counts().head(10))

# 日付範囲
date_cols = df.select_dtypes(include="datetime64[ns]").columns
for col in date_cols:
    print(f"{col}: {df[col].min()} → {df[col].max()}")

# 怪しい値
print("Zero rows:", (df == 0).sum().sort_values(ascending=False).head())
print("Negative numerics:", (df.select_dtypes(include=np.number) < 0).sum())
print("Future dates:", {col: (df[col] > pd.Timestamp.now()).sum() for col in date_cols})

# 重複
print("Total duplicates:", df.duplicated().sum())
```

これが捕捉する、見逃せばマズいもの:

- 80% が null だがそうあるべきでないカラム
- 返金エンコーディングのバグで負値を含む「price」カラム
- 誰かがプレースホルダを置いたせいで 2099 年の「createdAt」タイムスタンプ
- 上流の悪い join からの重複行

毎回実行する。5 秒で済むし、恥ずかしいミーティングを防げる。

---

## SQL ↔ pandas — 並列チートシート

| SQL | pandas |
| --- | --- |
| `SELECT col1, col2 FROM df` | `df[["col1", "col2"]]` |
| `WHERE col > 5` | `df[df["col"] > 5]` |
| `WHERE col IN (1,2,3)` | `df[df["col"].isin([1,2,3])]` |
| `WHERE col1 = 5 AND col2 > 10` | `df[(df["col1"] == 5) & (df["col2"] > 10)]` |
| `ORDER BY col DESC` | `df.sort_values("col", ascending=False)` |
| `LIMIT 10` | `df.head(10)` |
| `SELECT DISTINCT col` | `df["col"].drop_duplicates()` または `df["col"].unique()` |
| `COUNT(*)` | `len(df)` または `df.shape[0]` |
| `COUNT(DISTINCT col)` | `df["col"].nunique()` |
| `GROUP BY col` | `df.groupby("col")` |
| `GROUP BY col1, col2` | `df.groupby(["col1", "col2"])` |
| `SUM(x) GROUP BY g` | `df.groupby("g")["x"].sum()` |
| `HAVING SUM(x) > 100` | `df.groupby("g")["x"].sum().loc[lambda s: s > 100]` |
| `JOIN ON a.id = b.id` | `pd.merge(a, b, on="id")`（デフォルトは inner） |
| `LEFT JOIN` | `pd.merge(a, b, on="id", how="left")` |
| `UNION ALL` | `pd.concat([a, b])` |
| `CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END` | `np.where(df["x"] > 0, "pos", "neg")` |
| `COALESCE(a, b)` | `df["a"].fillna(df["b"])` |
| `ROW_NUMBER() OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g").cumcount() + 1` |
| `LAG(x, 1) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].shift(1)` |
| `SUM(x) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].cumsum()` |

SQL の方が pandas より遥かに綺麗な場面では — DuckDB を使う:

```python
import duckdb

result = duckdb.sql("""
    SELECT
        user_id,
        COUNT(*) AS sessions,
        SUM(duration_seconds) AS total_seconds,
        ROW_NUMBER() OVER (ORDER BY SUM(duration_seconds) DESC) AS rank
    FROM df
    WHERE event_date >= '2026-01-01'
    GROUP BY user_id
    HAVING COUNT(*) >= 3
""").df()
```

DuckDB は pandas DataFrame をその場でクエリする — コピーなし、別 DB へのロードなし。10 万〜1 億行 DataFrame に対する分析型クエリでは pandas より速く、SQL の方が読みやすい。

---

## ベクトル化のルール

**`.apply(lambda x: ...)` を書いたら、ベクトル化版が存在するかを問う。** ほぼ常にある。

```python
# 悪い — 1 万行を超えると遅い
df["full_name"] = df.apply(lambda r: f"{r['first']} {r['last']}", axis=1)

# 良い
df["full_name"] = df["first"] + " " + df["last"]
```

```python
# 悪い
df["category"] = df["amount"].apply(lambda x: "high" if x > 100 else "low")

# 良い
df["category"] = np.where(df["amount"] > 100, "high", "low")

# 3 つ以上のバケット
df["bucket"] = pd.cut(df["amount"],
                      bins=[-np.inf, 0, 50, 200, np.inf],
                      labels=["refund", "small", "medium", "large"])
```

```python
# 悪い
df["domain"] = df["email"].apply(lambda x: x.split("@")[1] if pd.notna(x) else None)

# 良い
df["domain"] = df["email"].str.split("@", n=1).str[1]
```

`.apply` が正しい選択になるとき: 複数カラムに触れ、ベクトル化操作や `np.select` の組み合わせで表現できない複雑な行単位ロジック。それは稀。

---

## 統計テストのクックブック

データの形状からではなく、質問からテストを選ぶ。その後でデータ形状がテストをサポートするか確認する。

| 質問 | テスト | いつ |
| --- | --- | --- |
| この 2 群の平均は異なる? | 独立 2 標本 t 検定 | ほぼ正規、各群 30+ |
| 上と同じだが非正規 | Mann-Whitney U | 偏りまたは小サンプル |
| 同一群の前後で変わった? | 対応のある t 検定 | 対の観測、正規 |
| 上と同じ、非正規 | Wilcoxon 符号順位 | 対、非正規 |
| この 3 つ以上の群の平均は異なる? | 一元配置 ANOVA | ほぼ正規、等分散 |
| 上と同じ、非正規 | Kruskal-Wallis | 非正規または不等分散 |
| この 2 つのカテゴリ変数は関連? | 独立性のカイ二乗検定 | 各セルの期待度数 ≥ 5 |
| 上と同じだが期待度数が小さい | Fisher の正確検定 | 2×2、期待度数小 |
| 線形関係があるか? | Pearson 相関 + OLS | 連続、線形、残差正規 |
| 上と同じだが非線形または非正規 | Spearman 相関 | 単調 |
| 複数の x から y を予測 | OLS 回帰 | 連続 y、線形、多重共線性なし |

コードの形:

```python
from scipy import stats
import statsmodels.formula.api as smf

# 独立 t 検定
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]
t, p = stats.ttest_ind(control, treat, equal_var=False)  # デフォルトで Welch
print(f"t={t:.3f}, p={p:.4f}, control mean={control.mean():.2f}, treat mean={treat.mean():.2f}")

# 効果量（Cohen's d）
def cohens_d(a, b):
    pooled = np.sqrt(((a.std() ** 2 + b.std() ** 2) / 2))
    return (a.mean() - b.mean()) / pooled
print(f"Cohen's d = {cohens_d(treat, control):.3f}")

# カイ二乗
table = pd.crosstab(df["channel"], df["converted"])
chi2, p, dof, expected = stats.chi2_contingency(table)

# statsmodels で OLS 回帰
model = smf.ols("revenue ~ tenure_days + plan + region", data=df).fit()
print(model.summary())
```

**p 値と一緒に必ず効果量を報告する。** p が 0.001 でも Cohen's d が 0.05 なら「統計的に有意だが実用的には無意味」。それを断りなく出荷しない。

---

## プロットスタイル — ミュートパレットのデフォルト

```python
import matplotlib.pyplot as plt
import seaborn as sns

# クリーンなデフォルト — ノートブックの先頭で 1 度だけ適用
sns.set_theme(style="whitegrid", context="notebook",
              palette="muted", font_scale=1.05)
plt.rcParams.update({
    "figure.figsize": (8, 5),
    "axes.spines.top": False,
    "axes.spines.right": False,
    "axes.titleweight": "semibold",
    "axes.titlepad": 12,
    "axes.titlelocation": "left",
})
```

ルール:

- 3D 何かは絶対に使わない。
- 円グラフは、2〜3 スライスで合計が 100% でない限り使わない。棒グラフを使う。
- 軸ラベルは普通の言葉で、snake_case ではない。「Revenue (USD)」、「revenue_usd」ではない。
- 棒はカテゴリ名ではなく値でソート。最大を一番上に。
- 大きな数字はカンマ区切り。`ax.yaxis.set_major_formatter(lambda x, _: f"{x:,.0f}")`。
- 視覚レイヤーごとに 1 色、虹色にしない。順序データには sequential、順序なしには categorical のパレット。
- タイトルは左寄せ、普通の言葉で。必要ならサブタイトルを薄くしてタイトルの下に。

インタラクティブ / Web には Plotly を同じ抑制で使う:

```python
import plotly.express as px
fig = px.line(df, x="date", y="revenue", color="plan",
              color_discrete_sequence=px.colors.qualitative.Set2)
fig.update_layout(template="simple_white", title="Revenue by plan",
                  xaxis_title=None, yaxis_title="Revenue (USD)")
```

---

## このキットが拒否すること

- 1 度より多く実行されるものに `.iterrows()` を提案すること。
- ベクトル化操作や `np.select` でカバーできるケースで `.apply()` に手を伸ばすこと。
- 何がドロップされたかをユーザーに見せず、本当にそれでいいか聞かずに null をドロップすること。
- 回帰を fit して、効果量と残差診断を無視し、p 値だけを報告すること。
- デフォルトの matplotlib スタイル（グレー背景、点線グリッド、青 / オレンジ / 緑）でチャートを作ること。
- DuckDB が単一ノードで解決するかを確認する前に Spark / Dask を勧めること。
- `agg` や window 関数で動くものに pandas の `for` ループを提案すること。

---

## 関連ドキュメント

- `recipes/pandas-duckdb-polars.md` — 3 ライブラリ間の共通操作
- `recipes/stats-cookbook.md` — t 検定、カイ二乗、ANOVA、回帰のコード
- `patterns/sql-to-pandas.md` — window 関数を含む、より深い SQL ↔ pandas 翻訳

---

## ノートブック共有前のサニティチェック

- [ ] 先頭に EDA ブロック — 形状、null、dtype、怪しい値
- [ ] ベクトル化が効く場所に `.apply` がない
- [ ] 数値出力がフォーマット済み（ステークホルダー向けの表に `2.3148327e-06` はない）
- [ ] チャートがミュートパレット + クリーンな軸
- [ ] 統計結果に効果量、p 値だけではない
- [ ] null / 重複の扱いを可視化、サイレントではない
- [ ] ノートブックを再起動して上から下まで実行してエラーなし
- [ ] セルが 200 行ではない — 分割する
