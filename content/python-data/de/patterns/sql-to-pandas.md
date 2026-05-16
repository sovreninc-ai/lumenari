# SQL ↔ pandas-Übersetzung

Die Übersetzung, die jeden Tag aufkommt: Du kennst das SQL, du willst das pandas, oder umgekehrt. Unten sind die Operationen in der Reihenfolge, wie oft sie in echter Arbeit auftauchen, mit den Gotchas inline.

Wenn das SQL wirklich sauberer ist, **greife zu DuckDB statt nach pandas zu übersetzen.** Es queryt DataFrames in-place und das SQL ist über Engines portabel.

---

## SELECT und WHERE

```sql
SELECT col1, col2 FROM df WHERE col3 > 10;
```

```python
df.loc[df["col3"] > 10, ["col1", "col2"]]
```

Warum `.loc` und nicht `df[df["col3"] > 10][["col1", "col2"]]`? Beides funktioniert, aber `.loc` ist eine Operation und vermeidet die Chained-Indexing-Falle. Die chained Version raised `SettingWithCopyWarning`, wenn du versuchst, dem Result zu assignen.

---

## Multiple WHERE-Bedingungen

```sql
WHERE col1 = 'CA' AND col2 > 100 AND col3 IS NOT NULL
```

```python
df[(df["col1"] == "CA") & (df["col2"] > 100) & df["col3"].notna()]
```

Klammern sind um jede Bedingung verpflichtend. Pythons Operator-Precedence behandelt `&` niedriger als `==` und `>`, sodass `df["col1"] == "CA" & df["col2"] > 100` als `df["col1"] == ("CA" & df["col2"]) > 100` geparst wird, was kaputt ist.

Für komplexe Filter ist `.query()` oft lesbar:

```python
df.query("col1 == 'CA' and col2 > 100 and col3.notna()")
```

Schlägt die klammern-schwere Version bei 3+ Bedingungen. `.query` lässt dich auch lokale Variablen mit `@` referenzieren:

```python
threshold = 100
df.query("col2 > @threshold")
```

---

## IN und NOT IN

```sql
WHERE col IN ('a', 'b', 'c')
WHERE col NOT IN ('a', 'b', 'c')
```

```python
df[df["col"].isin(["a", "b", "c"])]
df[~df["col"].isin(["a", "b", "c"])]
```

`~` ist Bitwise-NOT und ist der Inversion-Operator auf Boolean-Series. Nutze nicht `not` — es versucht, die Truthiness der ganzen Series zu evaluieren, und raised.

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

`na=False`, weil `contains` standardmäßig NaN für Null-Cells zurückgibt, und Boolean-Indexing mit NaN raised.

Für case-insensitive: `df["name"].str.contains("foo", case=False, na=False)`.

Für volle Regex: `df["name"].str.contains(r"^A\w+", regex=True, na=False)`.

---

## ORDER BY + LIMIT

```sql
SELECT * FROM df ORDER BY col1 DESC, col2 ASC LIMIT 100
```

```python
df.sort_values(["col1", "col2"], ascending=[False, True]).head(100)
```

Für "Top N pro Gruppe" (die klassische SQL-Window-Frage):

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC) AS rn FROM df
) t WHERE rn <= 3
```

```python
# pandas — verbose but works
df.sort_values("value", ascending=False).groupby("group").head(3)
```

Wenn du eine echte Window-Funktion im SQL hast, ist DuckDB auf dem DataFrame meist sauberer.

---

## GROUP BY + Aggregation

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

Named Aggregation (`total=("amount", "sum")`) ist die lesbare moderne Syntax. Vermeide den älteren `.agg({"amount": "sum"})`-Stil — er lässt dich nicht umbenennen, und du endest mit Multi-Level-Spalten.

`HAVING` wird zu `.loc[lambda d: ...]` (filtere auf dem gruppierten Result). Die `lambda`-Form lässt es chainen.

---

## GROUP BY mit mehreren Aggregationen auf unterschiedlichen Spalten

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

`pd.qcut` für Quantil-Bins (Quartile, Dezile, etc.).

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

`how`-Optionen: `"inner"` (Default), `"left"`, `"right"`, `"outer"`, `"cross"`.

Prüfe nach jedem Join Row-Counts:

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

Eine Row-Count-Änderung ohne Erklärung ist ein Bug, der darauf wartet, ausgeliefert zu werden.

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

`UNION` (dedupliziert) wäre `pd.concat([df1, df2], ignore_index=True).drop_duplicates()`.

---

## DISTINCT

```sql
SELECT DISTINCT col1, col2 FROM df
```

```python
df[["col1", "col2"]].drop_duplicates()
```

Für Unique-Values einer einzelnen Spalte: `df["col"].unique()` returnt ein numpy-Array. `df["col"].drop_duplicates()` returnt eine Series.

---

## Window-Funktionen — wo pandas verbose wird

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

### Running Total

```sql
SELECT *,
       SUM(value) OVER (PARTITION BY group ORDER BY event_date) AS running_total
FROM df
```

```python
df = df.sort_values(["group", "event_date"])
df["running_total"] = df.groupby("group")["value"].cumsum()
```

### Moving Average

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

Rolling-Windows innerhalb von groupby brauchen `.transform`, damit das Result mit dem Original-DataFrame aligned.

---

## Wann aufgeben und zu DuckDB greifen

Wenn du dich dabei ertappst, 3+ Zeilen pandas zu schreiben, wofür 4 Zeilen SQL reichen, besonders mit Window-Funktionen oder Multi-Table-Joins:

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

Es läuft in-process, auf dem pandas-DataFrame, und du bekommst ein tatsächliches DataFrame zurück. Keine Datenbewegung, keine DB aufzusetzen.

---

## Die pandas-Idiome, die kein SQL-Äquivalent haben

Diese kommen oft genug vor, um sie zu memorieren:

- **`pivot_table`** — viel flexibler als SQL-Pivots
- **`.assign(col=lambda d: ...)`** — chainable Spalten-Erstellung
- **`.pipe(fn)`** — eine arbiträre Funktion mitten in einer Method-Chain anwenden
- **`.melt`** — Unpivot Wide zu Long
- **`.crosstab`** — Count nach zwei Kategorialen in einem Aufruf
- **`.rank(pct=True)`** — Percentile-Rank
- **`.qcut`** — in Quantile binnen
