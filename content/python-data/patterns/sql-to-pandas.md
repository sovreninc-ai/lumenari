# SQL ↔ pandas Translation

The translation that comes up every day: you know the SQL, you want the pandas, or vice versa. Below are the operations in order of how often they show up in real work, with the gotchas inline.

When the SQL is genuinely cleaner, **reach for DuckDB instead of translating to pandas.** It queries DataFrames in place and the SQL is portable across engines.

---

## SELECT and WHERE

```sql
SELECT col1, col2 FROM df WHERE col3 > 10;
```

```python
df.loc[df["col3"] > 10, ["col1", "col2"]]
```

Why `.loc` and not `df[df["col3"] > 10][["col1", "col2"]]`? Both work, but `.loc` is one operation and avoids the chained-indexing trap. The chained version raises `SettingWithCopyWarning` if you try to assign to the result.

---

## Multiple WHERE conditions

```sql
WHERE col1 = 'CA' AND col2 > 100 AND col3 IS NOT NULL
```

```python
df[(df["col1"] == "CA") & (df["col2"] > 100) & df["col3"].notna()]
```

Parentheses are mandatory around each condition. Python's operator precedence treats `&` lower than `==` and `>`, so `df["col1"] == "CA" & df["col2"] > 100` parses as `df["col1"] == ("CA" & df["col2"]) > 100`, which is broken.

For complex filters, `.query()` is often readable:

```python
df.query("col1 == 'CA' and col2 > 100 and col3.notna()")
```

Beats the parenthesis-heavy version when there are 3+ conditions. `.query` also lets you reference local variables with `@`:

```python
threshold = 100
df.query("col2 > @threshold")
```

---

## IN and NOT IN

```sql
WHERE col IN ('a', 'b', 'c')
WHERE col NOT IN ('a', 'b', 'c')
```

```python
df[df["col"].isin(["a", "b", "c"])]
df[~df["col"].isin(["a", "b", "c"])]
```

`~` is bitwise-NOT and is the inversion operator on boolean Series. Don't use `not` — it tries to evaluate the truthiness of the whole Series and raises.

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

`na=False` because `contains` returns NaN for null cells by default, and boolean indexing with NaN raises.

For case-insensitive: `df["name"].str.contains("foo", case=False, na=False)`.

For full regex: `df["name"].str.contains(r"^A\w+", regex=True, na=False)`.

---

## ORDER BY + LIMIT

```sql
SELECT * FROM df ORDER BY col1 DESC, col2 ASC LIMIT 100
```

```python
df.sort_values(["col1", "col2"], ascending=[False, True]).head(100)
```

For "top N per group" (the classic SQL window question):

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC) AS rn FROM df
) t WHERE rn <= 3
```

```python
# pandas — verbose but works
df.sort_values("value", ascending=False).groupby("group").head(3)
```

If you have a real window function in the SQL, DuckDB on the DataFrame is usually cleaner.

---

## GROUP BY + aggregation

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

Named aggregation (`total=("amount", "sum")`) is the readable modern syntax. Avoid the older `.agg({"amount": "sum"})` style — it doesn't let you rename, and you end up with multi-level columns.

`HAVING` becomes `.loc[lambda d: ...]` (filter on the grouped result). The `lambda` form lets it chain.

---

## GROUP BY multiple aggregations on different columns

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

# Two buckets — np.where is cleanest
df["bucket"] = np.where(df["amount"] > 100, "high", "low")

# Three+ buckets — np.select
df["bucket"] = np.select(
    [df["amount"] > 100, df["amount"] > 50],
    ["high", "medium"],
    default="low",
)

# Ordered numeric buckets — pd.cut
df["bucket"] = pd.cut(
    df["amount"],
    bins=[-np.inf, 0, 50, 100, np.inf],
    labels=["refund", "low", "medium", "high"],
)
```

`pd.qcut` for quantile bins (quartiles, deciles, etc.).

---

## COALESCE

```sql
SELECT COALESCE(a, b, c, 0) FROM df
```

```python
df["first_non_null"] = df["a"].fillna(df["b"]).fillna(df["c"]).fillna(0)
# or vectorized version
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

`how` options: `"inner"` (default), `"left"`, `"right"`, `"outer"`, `"cross"`.

After every join, check row counts:

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

A row-count change without an explanation is a bug waiting to ship.

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

`UNION` (deduplicated) would be `pd.concat([df1, df2], ignore_index=True).drop_duplicates()`.

---

## DISTINCT

```sql
SELECT DISTINCT col1, col2 FROM df
```

```python
df[["col1", "col2"]].drop_duplicates()
```

For unique values of a single column: `df["col"].unique()` returns a numpy array. `df["col"].drop_duplicates()` returns a Series.

---

## Window functions — where pandas gets verbose

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

### Running total

```sql
SELECT *,
       SUM(value) OVER (PARTITION BY group ORDER BY event_date) AS running_total
FROM df
```

```python
df = df.sort_values(["group", "event_date"])
df["running_total"] = df.groupby("group")["value"].cumsum()
```

### Moving average

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

Rolling windows inside groupby need `.transform` so the result aligns with the original DataFrame.

---

## When to give up and reach for DuckDB

If you find yourself writing 3+ lines of pandas for what's 4 lines of SQL, especially with window functions or multi-table joins:

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

It runs in-process, on the pandas DataFrame, and you get an actual DataFrame back. No data movement, no DB to set up.

---

## The pandas idioms that don't have a SQL equivalent

These come up enough to be worth memorizing:

- **`pivot_table`** — much more flexible than SQL pivots
- **`.assign(col=lambda d: ...)`** — chainable column creation
- **`.pipe(fn)`** — apply an arbitrary function in the middle of a method chain
- **`.melt`** — unpivot wide to long
- **`.crosstab`** — count by two categoricals in one call
- **`.rank(pct=True)`** — percentile rank
- **`.qcut`** — bin into quantiles
