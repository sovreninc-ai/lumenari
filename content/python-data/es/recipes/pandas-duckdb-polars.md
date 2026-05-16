# Recetas Pandas / DuckDB / Polars

Las mismas operaciones entre las tres librerías que vas a usar en un notebook de trabajo. Elige por velocidad, ergonomía y lo que use el resto del codebase.

---

## Cuándo usar cuál

| Situación | Usa |
| --- | --- |
| Default. DataFrames chicos-a-medianos (< 1M filas). Ya estás en pandas. | **pandas** |
| Agregaciones complejas, joins, window functions — y SQL sería más limpio | **DuckDB** |
| Trabajando con archivos Parquet directo sin cargarlos a memoria | **DuckDB** |
| DataFrames de un millón o más filas donde pandas se está poniendo lento | **Polars** |
| Streamear data más grande que la memoria | **Polars (lazy)** |
| Estás compartiendo el notebook con gente que no sabe Polars | **pandas** |

Puedes mezclar las tres en un mismo notebook. DuckDB devuelve DataFrames de pandas; Polars convierte a pandas con `.to_pandas()` y desde pandas con `pl.from_pandas()`.

---

## Cargar data

```python
# pandas
import pandas as pd
df = pd.read_parquet("events.parquet")
df = pd.read_csv("events.csv", parse_dates=["event_date"])
df = pd.read_sql("SELECT * FROM events WHERE event_date > '2026-01-01'", conn)

# DuckDB
import duckdb
df = duckdb.sql("SELECT * FROM 'events.parquet' WHERE event_date > '2026-01-01'").df()
# Queryea archivos directamente, sin cargar
duckdb.sql("SELECT user_id, COUNT(*) FROM 'events/*.parquet' GROUP BY user_id").df()

# Polars
import polars as pl
df = pl.read_parquet("events.parquet")
df = pl.read_csv("events.csv", try_parse_dates=True)
# Modo lazy para archivos grandes — plan de query, después collect
df = pl.scan_parquet("events.parquet").filter(pl.col("event_date") > "2026-01-01").collect()
```

---

## Seleccionar columnas

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

## Filtrar filas

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

## Ordenar

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

## Groupby + agregación

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

Después de cada join, chequea los row counts. El inner join silenciosamente tira filas sin match.

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

---

## Crear columnas

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

## Window functions

```python
# pandas — rank por grupo
df["rank"] = df.groupby("region")["amount"].rank(method="dense", ascending=False)

# pandas — total corrido por grupo
df = df.sort_values(["region", "event_date"])
df["running_total"] = df.groupby("region")["amount"].cumsum()

# pandas — lag (valor anterior dentro del grupo)
df["prev_amount"] = df.sort_values("event_date").groupby("region")["amount"].shift(1)

# DuckDB — mucho más limpio
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

**Recomendación**: las window functions son donde DuckDB se paga solo. Los equivalentes en pandas funcionan pero se leen peor y es más fácil equivocarse.

---

## Pivot / unpivot

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

## Operaciones de string

```python
# pandas — el accessor .str
df["email_domain"] = df["email"].str.split("@", n=1).str[1]
df["title_clean"] = df["title"].str.strip().str.lower()
df["has_promo"] = df["notes"].str.contains("promo", case=False, na=False)

# DuckDB — funciones de string estándar de SQL
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

## Fechas

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

## Manejo de nulls

```python
# Siempre VES antes de ACTUAR.
print(df.isna().sum().sort_values(ascending=False))

# pandas
df["amount"] = df["amount"].fillna(0)
df["region"] = df["region"].fillna("unknown")
df = df.dropna(subset=["user_id"])   # tira filas donde user_id es null

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

## El idiom de Polars que vale la pena conocer

Las expresiones de Polars encadenan dentro de `.select()`, `.with_columns()`, `.filter()` y `.group_by().agg()`. La misma expresión puede construirse una vez y reusarse.

```python
# Construye una expresión
revenue_per_user = pl.col("revenue").sum().alias("total_revenue")

# Úsala
df.group_by("user_id").agg(revenue_per_user)
df.filter(pl.col("region") == "CA").group_by("user_id").agg(revenue_per_user)
```

El modo lazy es donde Polars realmente gana para big data:

```python
result = (
    pl.scan_parquet("events/*.parquet")
    .filter(pl.col("event_date") > "2026-01-01")
    .group_by("user_id")
    .agg([pl.col("amount").sum().alias("total"),
          pl.len().alias("n")])
    .filter(pl.col("n") >= 3)
    .sort("total", descending=True)
    .collect()        # todo lo anterior es solo un plan de query
)
```

Todo el pipeline se optimiza como una sola query. Los predicates pushean abajo, las proyecciones empujan abajo, sin DataFrames intermedios.

---

## Árbol de decisión rápido

- "Solo quiero mirar este dataset" → **pandas**
- "Estoy joineando 4 tablas con una window function" → **DuckDB**
- "Estoy queryeando una carpeta de archivos Parquet" → **DuckDB** con `'events/*.parquet'`
- "El DataFrame tiene 50M filas y pandas se está poniendo lento" → **Polars**
- "Necesito armar un reporte one-off para un exec" → lo que use el resto de tu código
