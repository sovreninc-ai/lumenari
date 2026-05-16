# SQL ↔ pandas 翻译

每天都会遇到的翻译：你会 SQL，想要 pandas，或反过来。下面按真实工作中出现频率排序，附内联坑点。

当 SQL 真的更干净时，**直接用 DuckDB 而不是翻成 pandas。** 它就地查询 DataFrame，SQL 在不同引擎间也可移植。

---

## SELECT 与 WHERE

```sql
SELECT col1, col2 FROM df WHERE col3 > 10;
```

```python
df.loc[df["col3"] > 10, ["col1", "col2"]]
```

为什么用 `.loc` 而不是 `df[df["col3"] > 10][["col1", "col2"]]`？两者都能跑，但 `.loc` 是一次操作，避免了 chained indexing 的坑。链式版本若尝试对结果赋值会触发 `SettingWithCopyWarning`。

---

## 多个 WHERE 条件

```sql
WHERE col1 = 'CA' AND col2 > 100 AND col3 IS NOT NULL
```

```python
df[(df["col1"] == "CA") & (df["col2"] > 100) & df["col3"].notna()]
```

每个条件外的括号是必须的。Python 的 `&` 优先级低于 `==` 和 `>`，所以 `df["col1"] == "CA" & df["col2"] > 100` 会解析成 `df["col1"] == ("CA" & df["col2"]) > 100`，是错的。

复杂过滤用 `.query()` 通常更易读：

```python
df.query("col1 == 'CA' and col2 > 100 and col3.notna()")
```

3 个及以上条件时比堆括号好用。`.query` 还可以用 `@` 引用局部变量：

```python
threshold = 100
df.query("col2 > @threshold")
```

---

## IN 与 NOT IN

```sql
WHERE col IN ('a', 'b', 'c')
WHERE col NOT IN ('a', 'b', 'c')
```

```python
df[df["col"].isin(["a", "b", "c"])]
df[~df["col"].isin(["a", "b", "c"])]
```

`~` 是按位非，对布尔 Series 是反转操作符。不要用 `not` —— 它会试图判断整个 Series 的真值并抛错。

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

`na=False` 是因为 `contains` 对空值默认返回 NaN，而布尔索引含 NaN 会报错。

大小写不敏感：`df["name"].str.contains("foo", case=False, na=False)`。

完整正则：`df["name"].str.contains(r"^A\w+", regex=True, na=False)`。

---

## ORDER BY + LIMIT

```sql
SELECT * FROM df ORDER BY col1 DESC, col2 ASC LIMIT 100
```

```python
df.sort_values(["col1", "col2"], ascending=[False, True]).head(100)
```

按组取前 N（SQL 经典窗口题）：

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC) AS rn FROM df
) t WHERE rn <= 3
```

```python
# pandas —— 啰嗦但可行
df.sort_values("value", ascending=False).groupby("group").head(3)
```

如果 SQL 里真有窗口函数，直接对 DataFrame 用 DuckDB 通常更干净。

---

## GROUP BY + 聚合

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

命名聚合（`total=("amount", "sum")`）是现代的、易读的写法。避免老式 `.agg({"amount": "sum"})` —— 不支持重命名，还会得到多层列名。

`HAVING` 对应 `.loc[lambda d: ...]`（在分组结果上过滤）。`lambda` 写法便于链式。

---

## 同时聚合不同列

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

# 两桶 —— np.where 最干净
df["bucket"] = np.where(df["amount"] > 100, "high", "low")

# 三桶及以上 —— np.select
df["bucket"] = np.select(
    [df["amount"] > 100, df["amount"] > 50],
    ["high", "medium"],
    default="low",
)

# 有序数值桶 —— pd.cut
df["bucket"] = pd.cut(
    df["amount"],
    bins=[-np.inf, 0, 50, 100, np.inf],
    labels=["refund", "low", "medium", "high"],
)
```

分位桶（四分、十分等）用 `pd.qcut`。

---

## COALESCE

```sql
SELECT COALESCE(a, b, c, 0) FROM df
```

```python
df["first_non_null"] = df["a"].fillna(df["b"]).fillna(df["c"]).fillna(0)
# 或向量化版本
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

`how` 选项：`"inner"`（默认）、`"left"`、`"right"`、`"outer"`、`"cross"`。

每次 join 之后检查行数：

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

行数变了却没解释 = 在交付一个 bug。

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

`UNION`（去重）：`pd.concat([df1, df2], ignore_index=True).drop_duplicates()`。

---

## DISTINCT

```sql
SELECT DISTINCT col1, col2 FROM df
```

```python
df[["col1", "col2"]].drop_duplicates()
```

单列去重：`df["col"].unique()` 返回 numpy 数组；`df["col"].drop_duplicates()` 返回 Series。

---

## 窗口函数 —— pandas 啰嗦的地方

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

### 累计求和

```sql
SELECT *,
       SUM(value) OVER (PARTITION BY group ORDER BY event_date) AS running_total
FROM df
```

```python
df = df.sort_values(["group", "event_date"])
df["running_total"] = df.groupby("group")["value"].cumsum()
```

### 移动平均

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

在 groupby 中做滚动窗口要用 `.transform`，结果才能与原 DataFrame 对齐。

---

## 何时放弃、改用 DuckDB

如果你在 pandas 里要写 3+ 行才能表达 4 行 SQL，尤其涉及窗口或多表 join：

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

进程内运行、直接基于 pandas DataFrame、返回真实 DataFrame。无数据搬运、无需搭 DB。

---

## SQL 中没有等价物的 pandas 惯用法

这些出现频率足够高，值得记：

- **`pivot_table`** —— 比 SQL 透视灵活得多
- **`.assign(col=lambda d: ...)`** —— 链式新建列
- **`.pipe(fn)`** —— 在方法链中应用任意函数
- **`.melt`** —— 宽转长
- **`.crosstab`** —— 一行算两个类别的计数
- **`.rank(pct=True)`** —— 百分位排名
- **`.qcut`** —— 按分位分桶
