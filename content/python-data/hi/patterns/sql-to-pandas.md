# SQL ↔ pandas Translation

रोज़ आने वाला translation: आप SQL जानते हैं, आप pandas चाहते हैं, या उल्टा। नीचे operations उस order में हैं जिस order में वे real work में show up होते हैं, gotchas inline के साथ।

जब SQL genuinely cleaner हो, **pandas में translate करने के बजाय DuckDB के लिए reach करें।** यह DataFrames को in place query करता है और SQL engines के पार portable है।

---

## SELECT and WHERE

```sql
SELECT col1, col2 FROM df WHERE col3 > 10;
```

```python
df.loc[df["col3"] > 10, ["col1", "col2"]]
```

`.loc` क्यों और `df[df["col3"] > 10][["col1", "col2"]]` क्यों नहीं? दोनों काम करते हैं, लेकिन `.loc` एक operation है और chained-indexing trap avoid करता है। Chained version `SettingWithCopyWarning` raise करता है अगर आप result को assign करने की कोशिश करें।

---

## Multiple WHERE conditions

```sql
WHERE col1 = 'CA' AND col2 > 100 AND col3 IS NOT NULL
```

```python
df[(df["col1"] == "CA") & (df["col2"] > 100) & df["col3"].notna()]
```

हर condition के around parentheses mandatory हैं। Python का operator precedence `&` को `==` और `>` से lower treat करता है, तो `df["col1"] == "CA" & df["col2"] > 100` `df["col1"] == ("CA" & df["col2"]) > 100` के रूप में parse होता है, जो broken है।

Complex filters के लिए, `.query()` अक्सर readable है:

```python
df.query("col1 == 'CA' and col2 > 100 and col3.notna()")
```

3+ conditions होने पर parenthesis-heavy version से बेहतर। `.query` आपको `@` के साथ local variables reference करने भी देता है:

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

`~` bitwise-NOT है और boolean Series पर inversion operator है। `not` use न करें — यह पूरी Series की truthiness evaluate करने की कोशिश करता है और raises।

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

`na=False` क्योंकि `contains` default में null cells के लिए NaN return करता है, और NaN के साथ boolean indexing raises।

Case-insensitive के लिए: `df["name"].str.contains("foo", case=False, na=False)`।

Full regex के लिए: `df["name"].str.contains(r"^A\w+", regex=True, na=False)`।

---

## ORDER BY + LIMIT

```sql
SELECT * FROM df ORDER BY col1 DESC, col2 ASC LIMIT 100
```

```python
df.sort_values(["col1", "col2"], ascending=[False, True]).head(100)
```

"top N per group" के लिए (classic SQL window question):

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC) AS rn FROM df
) t WHERE rn <= 3
```

```python
# pandas — verbose but works
df.sort_values("value", ascending=False).groupby("group").head(3)
```

अगर आपके SQL में एक real window function है, DataFrame पर DuckDB आमतौर पर cleaner है।

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

Named aggregation (`total=("amount", "sum")`) readable modern syntax है। पुराने `.agg({"amount": "sum"})` style को avoid करें — यह आपको rename नहीं करने देता, और आप multi-level columns के साथ end up होते हैं।

`HAVING` `.loc[lambda d: ...]` बन जाता है (grouped result पर filter)। `lambda` form chain होने देता है।

---

## अलग columns पर multiple aggregations के साथ GROUP BY

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

Quantile bins (quartiles, deciles, etc.) के लिए `pd.qcut`।

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

`how` options: `"inner"` (default), `"left"`, `"right"`, `"outer"`, `"cross"`।

हर join के बाद, row counts check करें:

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

बिना explanation के एक row-count change ship होने का इंतज़ार करता एक bug है।

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

`UNION` (deduplicated) `pd.concat([df1, df2], ignore_index=True).drop_duplicates()` होगा।

---

## DISTINCT

```sql
SELECT DISTINCT col1, col2 FROM df
```

```python
df[["col1", "col2"]].drop_duplicates()
```

एक single column के unique values के लिए: `df["col"].unique()` एक numpy array return करता है। `df["col"].drop_duplicates()` एक Series return करता है।

---

## Window functions — जहाँ pandas verbose हो जाता है

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

Groupby के अंदर Rolling windows को `.transform` चाहिए ताकि result original DataFrame के साथ align हो।

---

## कब हार मानकर DuckDB के लिए reach करें

अगर आप 3+ lines pandas लिख रहे हैं जो 4 lines SQL है, खासकर window functions या multi-table joins के साथ:

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

यह in-process, pandas DataFrame पर run होता है, और आपको एक actual DataFrame वापस मिलता है। कोई data movement नहीं, set up करने के लिए कोई DB नहीं।

---

## Pandas idioms जिनका SQL equivalent नहीं है

ये काफी आते हैं कि याद रखने worth हैं:

- **`pivot_table`** — SQL pivots से बहुत अधिक flexible
- **`.assign(col=lambda d: ...)`** — chainable column creation
- **`.pipe(fn)`** — एक method chain के बीच में एक arbitrary function apply करें
- **`.melt`** — wide को long unpivot करें
- **`.crosstab`** — एक call में दो categoricals से count
- **`.rank(pct=True)`** — percentile rank
- **`.qcut`** — quantiles में bin करें
