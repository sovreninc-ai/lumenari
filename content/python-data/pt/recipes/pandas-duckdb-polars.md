# Receitas Pandas / DuckDB / Polars

As mesmas operações entre as três bibliotecas que você vai usar num notebook de trabalho. Escolha por velocidade, ergonomia e o que o resto da base de código usa.

---

## Quando usar qual

| Situação | Use |
| --- | --- |
| Default. DataFrames pequenos a médios (< 1M linhas). Já está em pandas. | **pandas** |
| Agregações complexas, joins, window functions — e o SQL ficaria mais limpo | **DuckDB** |
| Trabalhar com arquivos Parquet direto sem carregar na memória | **DuckDB** |
| DataFrames de milhão+ linhas onde o pandas está ficando lento | **Polars** |
| Streaming de dado maior que memória | **Polars (lazy)** |
| Você está compartilhando o notebook com pessoas que não conhecem Polars | **pandas** |

Você pode misturar os três num único notebook. DuckDB retorna DataFrames pandas; Polars converte para pandas com `.to_pandas()` e de pandas com `pl.from_pandas()`.

---

## Carregando dados

```python
# pandas
import pandas as pd
df = pd.read_parquet("events.parquet")
df = pd.read_csv("events.csv", parse_dates=["event_date"])
df = pd.read_sql("SELECT * FROM events WHERE event_date > '2026-01-01'", conn)

# DuckDB
import duckdb
df = duckdb.sql("SELECT * FROM 'events.parquet' WHERE event_date > '2026-01-01'").df()
# Consulta arquivos direto, sem load
duckdb.sql("SELECT user_id, COUNT(*) FROM 'events/*.parquet' GROUP BY user_id").df()

# Polars
import polars as pl
df = pl.read_parquet("events.parquet")
df = pl.read_csv("events.csv", try_parse_dates=True)
# Modo lazy para arquivos grandes — query plan, depois collect
df = pl.scan_parquet("events.parquet").filter(pl.col("event_date") > "2026-01-01").collect()
```

---

## Selecionando colunas

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

## Filtrando linhas

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

## Ordenando

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

## Groupby + agregação

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

Depois de cada join, cheque contagens de linha. Inner join derruba silenciosamente linhas não combinadas.

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

---

## Criando colunas

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

## Funções de janela

```python
# pandas — rank por grupo
df["rank"] = df.groupby("region")["amount"].rank(method="dense", ascending=False)

# pandas — total corrido por grupo
df = df.sort_values(["region", "event_date"])
df["running_total"] = df.groupby("region")["amount"].cumsum()

# pandas — lag (valor anterior dentro do grupo)
df["prev_amount"] = df.sort_values("event_date").groupby("region")["amount"].shift(1)

# DuckDB — bem mais limpo
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

**Recomendação**: funções de janela são onde o DuckDB se paga. Os equivalentes em pandas funcionam mas leem pior e é mais fácil errar.

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

## Operações de string

```python
# pandas — o accessor .str
df["email_domain"] = df["email"].str.split("@", n=1).str[1]
df["title_clean"] = df["title"].str.strip().str.lower()
df["has_promo"] = df["notes"].str.contains("promo", case=False, na=False)

# DuckDB — funções de string SQL padrão
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

## Datas

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

## Tratamento de nulls

```python
# Sempre VEJA antes de AGIR.
print(df.isna().sum().sort_values(ascending=False))

# pandas
df["amount"] = df["amount"].fillna(0)
df["region"] = df["region"].fillna("unknown")
df = df.dropna(subset=["user_id"])   # dropa linhas onde user_id é null

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

## O idioma de Polars que vale conhecer

Expressões de Polars encadeiam dentro de `.select()`, `.with_columns()`, `.filter()` e `.group_by().agg()`. A mesma expressão pode ser construída uma vez e reusada.

```python
# Construa uma expressão
revenue_per_user = pl.col("revenue").sum().alias("total_revenue")

# Use
df.group_by("user_id").agg(revenue_per_user)
df.filter(pl.col("region") == "CA").group_by("user_id").agg(revenue_per_user)
```

Modo lazy é onde o Polars realmente ganha para dado grande:

```python
result = (
    pl.scan_parquet("events/*.parquet")
    .filter(pl.col("event_date") > "2026-01-01")
    .group_by("user_id")
    .agg([pl.col("amount").sum().alias("total"),
          pl.len().alias("n")])
    .filter(pl.col("n") >= 3)
    .sort("total", descending=True)
    .collect()        # tudo antes disso é só query plan
)
```

O pipeline inteiro é otimizado como uma query. Predicates dão pushdown, projeções dão pushdown, sem DataFrames intermediários.

---

## Árvore de decisão rápida

- "Só quero olhar esse dataset" → **pandas**
- "Estou juntando 4 tabelas com uma função de janela" → **DuckDB**
- "Estou consultando uma pasta de arquivos Parquet" → **DuckDB** com `'events/*.parquet'`
- "O DataFrame tem 50M linhas e o pandas está lento" → **Polars**
- "Preciso construir um report único para um exec" → o que o resto do seu código usa
