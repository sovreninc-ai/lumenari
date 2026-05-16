# SQL ↔ pandas 翻訳

毎日出てくる翻訳: SQL は知っている、pandas が欲しい、あるいは逆。下記は、実際の仕事で出てくる頻度順に並んだ操作、落とし穴はインラインで。

SQL の方が本当に綺麗なら、**pandas に翻訳するのではなく DuckDB に手を伸ばす。** DataFrame をその場でクエリし、SQL はエンジン間で移植可能。

---

## SELECT と WHERE

```sql
SELECT col1, col2 FROM df WHERE col3 > 10;
```

```python
df.loc[df["col3"] > 10, ["col1", "col2"]]
```

なぜ `.loc` で `df[df["col3"] > 10][["col1", "col2"]]` ではないのか? 両方動くが、`.loc` は 1 操作で、連鎖インデックスの罠を回避する。連鎖版は結果に代入しようとすると `SettingWithCopyWarning` を発する。

---

## 複数の WHERE 条件

```sql
WHERE col1 = 'CA' AND col2 > 100 AND col3 IS NOT NULL
```

```python
df[(df["col1"] == "CA") & (df["col2"] > 100) & df["col3"].notna()]
```

各条件の周りの括弧は必須。Python の演算子優先順位は `&` を `==` や `>` より低く扱うので、`df["col1"] == "CA" & df["col2"] > 100` は `df["col1"] == ("CA" & df["col2"]) > 100` としてパースされて壊れる。

複雑なフィルタには `.query()` が読みやすいことが多い:

```python
df.query("col1 == 'CA' and col2 > 100 and col3.notna()")
```

3 つ以上の条件があるとき、括弧の多い版より勝る。`.query` はローカル変数を `@` で参照できる:

```python
threshold = 100
df.query("col2 > @threshold")
```

---

## IN と NOT IN

```sql
WHERE col IN ('a', 'b', 'c')
WHERE col NOT IN ('a', 'b', 'c')
```

```python
df[df["col"].isin(["a", "b", "c"])]
df[~df["col"].isin(["a", "b", "c"])]
```

`~` はビット単位 NOT で、boolean Series の反転演算子。`not` を使わない — Series 全体の真偽値を評価しようとして例外を投げる。

---

## LIKE

```sql
WHERE name LIKE 'A%'
WHERE name LIKE '%foo%'
```

```python
df[df["name"].str.startswith("A")]
df[df["name"].str.contains("foo", na=False)]
```

`na=False` の理由: `contains` はデフォルトで null セルに NaN を返し、NaN の boolean インデックスは例外を投げるから。

大文字小文字無視: `df["name"].str.contains("foo", case=False, na=False)`。

完全な regex: `df["name"].str.contains(r"^A\w+", regex=True, na=False)`。

---

## ORDER BY + LIMIT

```sql
SELECT * FROM df ORDER BY col1 DESC, col2 ASC LIMIT 100
```

```python
df.sort_values(["col1", "col2"], ascending=[False, True]).head(100)
```

「group ごとの上位 N」（古典的な SQL window 問題）:

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC) AS rn FROM df
) t WHERE rn <= 3
```

```python
# pandas — 冗長だが動く
df.sort_values("value", ascending=False).groupby("group").head(3)
```

SQL に本物の window 関数があるなら、DataFrame に対する DuckDB の方が通常綺麗。

---

## GROUP BY + 集約

```sql
SELECT region, SUM(amount) AS total, COUNT(*) AS n, AVG(amount) AS avg_amount
FROM df
GROUP BY region
HAVING COUNT(*) >= 5
ORDER BY total DESC
```

```python
result = (
    df.groupby("region")
      .agg(total=("amount", "sum"),
           n=("amount", "size"),
           avg_amount=("amount", "mean"))
      .loc[lambda d: d["n"] >= 5]
      .sort_values("total", ascending=False)
)
```

名前付き集約（`total=("amount", "sum")`）が読みやすいモダン構文。古い `.agg({"amount": "sum"})` スタイルを避ける — リネームできず、マルチレベルカラムになる。

`HAVING` は `.loc[lambda d: ...]` になる（グループ化された結果のフィルタ）。`lambda` 形式でチェーン可能。

---

## 異なるカラムでの複数集約

```sql
SELECT region,
       SUM(amount) AS revenue,
       COUNT(DISTINCT user_id) AS unique_users,
       MAX(event_date) AS last_event
FROM df
GROUP BY region
```

```python
df.groupby("region").agg(
    revenue=("amount", "sum"),
    unique_users=("user_id", "nunique"),
    last_event=("event_date", "max"),
)
```

---

## CASE WHEN

```sql
SELECT CASE WHEN amount > 100 THEN 'high'
            WHEN amount > 50 THEN 'medium'
            ELSE 'low' END AS bucket
FROM df
```

```python
import numpy as np

# 2 バケット — np.where が一番綺麗
df["bucket"] = np.where(df["amount"] > 100, "high", "low")

# 3 つ以上のバケット — np.select
df["bucket"] = np.select(
    [df["amount"] > 100, df["amount"] > 50],
    ["high", "medium"],
    default="low",
)

# 順序付き数値バケット — pd.cut
df["bucket"] = pd.cut(
    df["amount"],
    bins=[-np.inf, 0, 50, 100, np.inf],
    labels=["refund", "low", "medium", "high"],
)
```

分位数 bin（四分位、十分位など）には `pd.qcut`。

---

## COALESCE

```sql
SELECT COALESCE(a, b, c, 0) FROM df
```

```python
df["first_non_null"] = df["a"].fillna(df["b"]).fillna(df["c"]).fillna(0)
# または vectorized 版
df["first_non_null"] = df[["a", "b", "c"]].bfill(axis=1).iloc[:, 0].fillna(0)
```

---

## JOIN

```sql
SELECT o.*, u.email
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
```

```python
pd.merge(orders, users, left_on="user_id", right_on="id", how="left")
```

`how` オプション: `"inner"`（デフォルト）、`"left"`、`"right"`、`"outer"`、`"cross"`。

各 join の後、行数を確認:

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

理由のない行数変化は、出荷待ちのバグ。

---

## UNION ALL

```sql
SELECT * FROM df1
UNION ALL
SELECT * FROM df2
```

```python
pd.concat([df1, df2], ignore_index=True)
```

`UNION`（重複除去）は `pd.concat([df1, df2], ignore_index=True).drop_duplicates()`。

---

## DISTINCT

```sql
SELECT DISTINCT col1, col2 FROM df
```

```python
df[["col1", "col2"]].drop_duplicates()
```

単一カラムの一意値: `df["col"].unique()` は numpy 配列を返す。`df["col"].drop_duplicates()` は Series を返す。

---

## Window 関数 — pandas が冗長になる場所

### ROW_NUMBER / RANK

```sql
SELECT *,
       ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC) AS rn,
       DENSE_RANK() OVER (PARTITION BY group ORDER BY value DESC) AS rk
FROM df
```

```python
df = df.sort_values(["group", "value"], ascending=[True, False])
df["rn"] = df.groupby("group").cumcount() + 1
df["rk"] = df.groupby("group")["value"].rank(method="dense", ascending=False).astype(int)
```

### LAG / LEAD

```sql
SELECT *,
       LAG(value, 1) OVER (PARTITION BY group ORDER BY event_date) AS prev_value,
       LEAD(value, 1) OVER (PARTITION BY group ORDER BY event_date) AS next_value
FROM df
```

```python
df = df.sort_values(["group", "event_date"])
df["prev_value"] = df.groupby("group")["value"].shift(1)
df["next_value"] = df.groupby("group")["value"].shift(-1)
```

### 累積合計

```sql
SELECT *,
       SUM(value) OVER (PARTITION BY group ORDER BY event_date) AS running_total
FROM df
```

```python
df = df.sort_values(["group", "event_date"])
df["running_total"] = df.groupby("group")["value"].cumsum()
```

### 移動平均

```sql
SELECT *,
       AVG(value) OVER (PARTITION BY group ORDER BY event_date
                        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS ma_7
FROM df
```

```python
df = df.sort_values(["group", "event_date"])
df["ma_7"] = (
    df.groupby("group")["value"]
      .transform(lambda s: s.rolling(window=7, min_periods=1).mean())
)
```

groupby 内の rolling window には `.transform` が必要 — 結果が元の DataFrame と揃うように。

---

## 諦めて DuckDB に手を伸ばすとき

特に window 関数や複数テーブル join で、4 行の SQL に対し pandas で 3 行以上書いている自分に気づいたら:

```python
import duckdb
result = duckdb.sql("""
    SELECT
        user_id,
        event_date,
        value,
        LAG(value) OVER (PARTITION BY user_id ORDER BY event_date) AS prev_value,
        SUM(value) OVER (PARTITION BY user_id ORDER BY event_date) AS running_total,
        DENSE_RANK() OVER (PARTITION BY user_id ORDER BY value DESC) AS rk
    FROM df
    WHERE event_date >= '2026-01-01'
""").df()
```

in-process で、pandas DataFrame 上で動き、実際の DataFrame が返ってくる。データ移動なし、セットアップする DB なし。

---

## SQL の等価物を持たない pandas イディオム

これらは頻繁に出てくるので覚える価値がある:

- **`pivot_table`** — SQL のピボットよりはるかに柔軟
- **`.assign(col=lambda d: ...)`** — チェーン可能なカラム作成
- **`.pipe(fn)`** — メソッドチェーンの途中で任意の関数を適用
- **`.melt`** — wide から long にアンピボット
- **`.crosstab`** — 2 つのカテゴリで 1 度にカウント
- **`.rank(pct=True)`** — パーセンタイルランク
- **`.qcut`** — 分位 bin にカット
