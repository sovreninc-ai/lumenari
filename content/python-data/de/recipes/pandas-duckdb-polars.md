# Pandas / DuckDB / Polars-Rezepte

Dieselben Operationen über die drei Bibliotheken, die du in einem arbeitenden Notebook nutzen wirst. Wähle nach Geschwindigkeit, Ergonomie und dem, was der Rest der Codebasis nutzt.

---

## Wann was zu nutzen

| Situation | Nutze |
| --- | --- |
| Default. Small-to-Medium-DataFrames (< 1M Zeilen). Bereits auf pandas. | **pandas** |
| Komplexe Aggregationen, Joins, Window-Funktionen — und SQL wäre sauberer | **DuckDB** |
| Arbeiten mit Parquet-Files direkt, ohne in den Memory zu laden | **DuckDB** |
| Million-plus-Zeilen-DataFrames, wo pandas langsam wird | **Polars** |
| Larger-than-Memory-Daten streamen | **Polars (lazy)** |
| Du teilst das Notebook mit Leuten, die Polars nicht kennen | **pandas** |

Du kannst alle drei in einem Notebook mischen. DuckDB returnt pandas-DataFrames; Polars konvertiert zu pandas mit `.to_pandas()` und von pandas mit `pl.from_pandas()`.

---

## Daten laden

```python
# pandas
import pandas as pd
df = pd.read_parquet("events.parquet")
df = pd.read_csv("events.csv", parse_dates=["event_date"])
df = pd.read_sql("SELECT * FROM events WHERE event_date > '2026-01-01'", conn)

# DuckDB
import duckdb
df = duckdb.sql("SELECT * FROM 'events.parquet' WHERE event_date > '2026-01-01'").df()
# Query files directly, no loading
duckdb.sql("SELECT user_id, COUNT(*) FROM 'events/*.parquet' GROUP BY user_id").df()

# Polars
import polars as pl
df = pl.read_parquet("events.parquet")
df = pl.read_csv("events.csv", try_parse_dates=True)
# Lazy mode for big files — query plan, then collect
df = pl.scan_parquet("events.parquet").filter(pl.col("event_date") > "2026-01-01").collect()
```

---

## Spalten auswählen

```python
# pandas
df[["a", "b", "c"]]
df.loc[:, ["a", "b", "c"]]

# DuckDB
duckdb.sql("SELECT a, b, c FROM df").df()

# Polars
df.select(["a", "b", "c"])
df.select(pl.col("a"), pl.col("b"), pl.col("c"))
```

---

## Zeilen filtern

```python
# pandas
df[df["amount"] > 100]
df[(df["amount"] > 100) & (df["region"] == "CA")]
df.query("amount > 100 and region == 'CA'")

# DuckDB
duckdb.sql("SELECT * FROM df WHERE amount > 100 AND region = 'CA'").df()

# Polars
df.filter(pl.col("amount") > 100)
df.filter((pl.col("amount") > 100) & (pl.col("region") == "CA"))
```

---

## Sortieren

```python
# pandas
df.sort_values("amount", ascending=False)
df.sort_values(["region", "amount"], ascending=[True, False])

# DuckDB
duckdb.sql("SELECT * FROM df ORDER BY amount DESC").df()
duckdb.sql("SELECT * FROM df ORDER BY region ASC, amount DESC").df()

# Polars
df.sort("amount", descending=True)
df.sort(["region", "amount"], descending=[False, True])
```

---

## Groupby + Aggregation

```python
# pandas
df.groupby("region")["amount"].sum()
df.groupby("region").agg(total=("amount", "sum"),
                         n=("amount", "count"),
                         avg=("amount", "mean"))

# DuckDB
duckdb.sql("""
    SELECT region,
           SUM(amount) AS total,
           COUNT(*) AS n,
           AVG(amount) AS avg
    FROM df
    GROUP BY region
""").df()

# Polars
df.group_by("region").agg(
    pl.col("amount").sum().alias("total"),
    pl.len().alias("n"),
    pl.col("amount").mean().alias("avg"),
)
```

---

## Joins

```python
# pandas
pd.merge(orders, users, on="user_id", how="left")
pd.merge(orders, users, left_on="user_id", right_on="id", how="inner")

# DuckDB
duckdb.sql("""
    SELECT o.*, u.email
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
""").df()

# Polars
orders.join(users, on="user_id", how="left")
orders.join(users, left_on="user_id", right_on="id", how="inner")
```

Prüfe nach jedem Join Row-Counts. Inner-Join droppt unmatched Zeilen still.

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

---

## Spalten erstellen

```python
# pandas
df["full_name"] = df["first"] + " " + df["last"]
df["bucket"] = np.where(df["amount"] > 100, "high", "low")
df["bucket"] = pd.cut(df["amount"], bins=[-np.inf, 0, 50, 200, np.inf],
                      labels=["refund", "small", "medium", "large"])

# DuckDB
duckdb.sql("""
    SELECT *,
           first || ' ' || last AS full_name,
           CASE WHEN amount > 100 THEN 'high' ELSE 'low' END AS bucket
    FROM df
""").df()

# Polars
df.with_columns(
    full_name=pl.col("first") + " " + pl.col("last"),
    bucket=pl.when(pl.col("amount") > 100).then(pl.lit("high")).otherwise(pl.lit("low")),
)
```

---

## Window-Funktionen

```python
# pandas — rank per group
df["rank"] = df.groupby("region")["amount"].rank(method="dense", ascending=False)

# pandas — running total per group
df = df.sort_values(["region", "event_date"])
df["running_total"] = df.groupby("region")["amount"].cumsum()

# pandas — lag (previous value within group)
df["prev_amount"] = df.sort_values("event_date").groupby("region")["amount"].shift(1)

# DuckDB — much cleaner
duckdb.sql("""
    SELECT *,
           DENSE_RANK() OVER (PARTITION BY region ORDER BY amount DESC) AS rank,
           SUM(amount) OVER (PARTITION BY region ORDER BY event_date) AS running_total,
           LAG(amount) OVER (PARTITION BY region ORDER BY event_date) AS prev_amount
    FROM df
""").df()

# Polars
df.with_columns(
    rank=pl.col("amount").rank(method="dense", descending=True).over("region"),
    running_total=pl.col("amount").cum_sum().over("region", order_by="event_date"),
    prev_amount=pl.col("amount").shift(1).over("region", order_by="event_date"),
)
```

**Empfehlung**: Window-Funktionen sind, wo DuckDB sich selbst bezahlt. Die pandas-Äquivalente funktionieren, lesen sich aber schlechter und sind leichter falsch zu machen.

---

## Pivot / Unpivot

```python
# pandas
wide = df.pivot_table(index="user_id", columns="month", values="revenue", aggfunc="sum")
long = wide.reset_index().melt(id_vars="user_id", var_name="month", value_name="revenue")

# DuckDB
duckdb.sql("PIVOT df ON month USING SUM(revenue) GROUP BY user_id").df()
duckdb.sql("UNPIVOT wide ON jan, feb, mar INTO NAME month VALUE revenue").df()

# Polars
df.pivot(index="user_id", on="month", values="revenue", aggregate_function="sum")
df.unpivot(index="user_id", on=["jan", "feb", "mar"], variable_name="month", value_name="revenue")
```

---

## String-Operationen

```python
# pandas — the .str accessor
df["email_domain"] = df["email"].str.split("@", n=1).str[1]
df["title_clean"] = df["title"].str.strip().str.lower()
df["has_promo"] = df["notes"].str.contains("promo", case=False, na=False)

# DuckDB — standard SQL string functions
duckdb.sql("""
    SELECT *,
           SUBSTRING(email FROM POSITION('@' IN email) + 1) AS email_domain,
           LOWER(TRIM(title)) AS title_clean,
           CONTAINS(LOWER(notes), 'promo') AS has_promo
    FROM df
""").df()

# Polars
df.with_columns(
    email_domain=pl.col("email").str.split("@").list.get(1),
    title_clean=pl.col("title").str.strip_chars().str.to_lowercase(),
    has_promo=pl.col("notes").str.contains("(?i)promo"),
)
```

---

## Daten

```python
# pandas
df["event_date"] = pd.to_datetime(df["event_date"])
df["year_month"] = df["event_date"].dt.to_period("M")
df["dow"] = df["event_date"].dt.day_name()
df["days_since"] = (pd.Timestamp.now() - df["event_date"]).dt.days

# DuckDB
duckdb.sql("""
    SELECT *,
           DATE_TRUNC('month', event_date) AS year_month,
           DAYNAME(event_date) AS dow,
           DATE_DIFF('day', event_date, CURRENT_DATE) AS days_since
    FROM df
""").df()

# Polars
df.with_columns(
    year_month=pl.col("event_date").dt.truncate("1mo"),
    dow=pl.col("event_date").dt.strftime("%A"),
    days_since=(pl.lit(pl.datetime("now")) - pl.col("event_date")).dt.total_days(),
)
```

---

## Null-Handling

```python
# Always SEE before you ACT.
print(df.isna().sum().sort_values(ascending=False))

# pandas
df["amount"] = df["amount"].fillna(0)
df["region"] = df["region"].fillna("unknown")
df = df.dropna(subset=["user_id"])   # drop rows where user_id is null

# DuckDB
duckdb.sql("""
    SELECT *,
           COALESCE(amount, 0) AS amount,
           COALESCE(region, 'unknown') AS region
    FROM df
    WHERE user_id IS NOT NULL
""").df()

# Polars
df.with_columns(
    pl.col("amount").fill_null(0),
    pl.col("region").fill_null("unknown"),
).drop_nulls(subset=["user_id"])
```

---

## Das Polars-Idiom, das es zu kennen lohnt

Polars-Expressions chainen innerhalb von `.select()`, `.with_columns()`, `.filter()` und `.group_by().agg()`. Dieselbe Expression kann einmal gebaut und wiederverwendet werden.

```python
# Build an expression
revenue_per_user = pl.col("revenue").sum().alias("total_revenue")

# Use it
df.group_by("user_id").agg(revenue_per_user)
df.filter(pl.col("region") == "CA").group_by("user_id").agg(revenue_per_user)
```

Lazy-Mode ist, wo Polars wirklich für Big Data gewinnt:

```python
result = (
    pl.scan_parquet("events/*.parquet")
    .filter(pl.col("event_date") > "2026-01-01")
    .group_by("user_id")
    .agg([pl.col("amount").sum().alias("total"),
          pl.len().alias("n")])
    .filter(pl.col("n") >= 3)
    .sort("total", descending=True)
    .collect()        # everything before this is just a query plan
)
```

Die gesamte Pipeline wird als eine Query optimiert. Prädikate pushen down, Projektionen pushen down, keine Intermediate-DataFrames.

---

## Schneller Entscheidungsbaum

- "Ich will mir nur dieses Dataset ansehen" → **pandas**
- "Ich joine 4 Tabellen mit einer Window-Funktion" → **DuckDB**
- "Ich queryt einen Folder mit Parquet-Files" → **DuckDB** mit `'events/*.parquet'`
- "Das DataFrame ist 50M Zeilen und pandas ist langsam" → **Polars**
- "Ich brauche einen One-off-Report für einen Exec" → was auch immer der Rest deines Codes nutzt
