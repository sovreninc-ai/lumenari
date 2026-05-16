# Traducción SQL ↔ pandas

La traducción que aparece cada día: sabes el SQL, quieres el pandas, o viceversa. Abajo están las operaciones en orden de qué tanto aparecen en el trabajo real, con los gotchas inline.

Cuando el SQL es genuinamente más limpio, **acude a DuckDB en lugar de traducir a pandas.** Queryea DataFrames in place y el SQL es portable entre engines.

---

## SELECT y WHERE

```sql
SELECT col1, col2 FROM df WHERE col3 > 10;
```

```python
df.loc[df["col3"] > 10, ["col1", "col2"]]
```

¿Por qué `.loc` y no `df[df["col3"] > 10][["col1", "col2"]]`? Ambas funcionan, pero `.loc` es una sola operación y evita la trampa del chained-indexing. La versión chained levanta `SettingWithCopyWarning` si intentas asignar al resultado.

---

## Múltiples condiciones de WHERE

```sql
WHERE col1 = 'CA' AND col2 > 100 AND col3 IS NOT NULL
```

```python
df[(df["col1"] == "CA") & (df["col2"] > 100) & df["col3"].notna()]
```

Los paréntesis alrededor de cada condición son obligatorios. La precedencia de operadores de Python trata `&` con menor prioridad que `==` y `>`, así que `df["col1"] == "CA" & df["col2"] > 100` parsea como `df["col1"] == ("CA" & df["col2"]) > 100`, que está roto.

Para filtros complejos, `.query()` suele ser legible:

```python
df.query("col1 == 'CA' and col2 > 100 and col3.notna()")
```

Le gana a la versión cargada de paréntesis cuando hay 3+ condiciones. `.query` también te deja referenciar variables locales con `@`:

```python
threshold = 100
df.query("col2 > @threshold")
```

---

## IN y NOT IN

```sql
WHERE col IN ('a', 'b', 'c')
WHERE col NOT IN ('a', 'b', 'c')
```

```python
df[df["col"].isin(["a", "b", "c"])]
df[~df["col"].isin(["a", "b", "c"])]
```

`~` es bitwise-NOT y es el operador de inversión sobre Series booleanas. No uses `not` — intenta evaluar la truthiness de toda la Series y levanta.

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

`na=False` porque `contains` devuelve NaN para celdas null por defecto, y el boolean indexing con NaN levanta.

Para case-insensitive: `df["name"].str.contains("foo", case=False, na=False)`.

Para regex completo: `df["name"].str.contains(r"^A\w+", regex=True, na=False)`.

---

## ORDER BY + LIMIT

```sql
SELECT * FROM df ORDER BY col1 DESC, col2 ASC LIMIT 100
```

```python
df.sort_values(["col1", "col2"], ascending=[False, True]).head(100)
```

Para "top N por grupo" (la pregunta clásica de window en SQL):

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC) AS rn FROM df
) t WHERE rn <= 3
```

```python
# pandas — verboso pero funciona
df.sort_values("value", ascending=False).groupby("group").head(3)
```

Si tienes una window function real en el SQL, DuckDB sobre el DataFrame suele ser más limpio.

---

## GROUP BY + agregación

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

La agregación con nombre (`total=("amount", "sum")`) es la sintaxis moderna legible. Evita el estilo viejo `.agg({"amount": "sum"})` — no te deja renombrar, y terminas con columnas multi-nivel.

`HAVING` se convierte en `.loc[lambda d: ...]` (filtro sobre el resultado agrupado). La forma `lambda` deja que se encadene.

---

## GROUP BY con múltiples agregaciones sobre distintas columnas

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

# Dos buckets — np.where es lo más limpio
df["bucket"] = np.where(df["amount"] > 100, "high", "low")

# Tres+ buckets — np.select
df["bucket"] = np.select(
    [df["amount"] > 100, df["amount"] > 50],
    ["high", "medium"],
    default="low",
)

# Buckets numéricos ordenados — pd.cut
df["bucket"] = pd.cut(
    df["amount"],
    bins=[-np.inf, 0, 50, 100, np.inf],
    labels=["refund", "low", "medium", "high"],
)
```

`pd.qcut` para bins por cuantil (cuartiles, deciles, etc.).

---

## COALESCE

```sql
SELECT COALESCE(a, b, c, 0) FROM df
```

```python
df["first_non_null"] = df["a"].fillna(df["b"]).fillna(df["c"]).fillna(0)
# o versión vectorizada
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

Opciones de `how`: `"inner"` (default), `"left"`, `"right"`, `"outer"`, `"cross"`.

Después de cada join, chequea los row counts:

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

Un cambio de row count sin explicación es un bug esperando a enviarse.

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

`UNION` (deduplicado) sería `pd.concat([df1, df2], ignore_index=True).drop_duplicates()`.

---

## DISTINCT

```sql
SELECT DISTINCT col1, col2 FROM df
```

```python
df[["col1", "col2"]].drop_duplicates()
```

Para los valores únicos de una sola columna: `df["col"].unique()` devuelve un array de numpy. `df["col"].drop_duplicates()` devuelve una Series.

---

## Window functions — donde pandas se vuelve verboso

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

### Total corrido

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

Las rolling windows dentro de groupby necesitan `.transform` para que el resultado se alinee con el DataFrame original.

---

## Cuándo darse por vencido y acudir a DuckDB

Si te ves escribiendo 3+ líneas de pandas para lo que son 4 líneas de SQL, especialmente con window functions o joins multi-tabla:

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

Corre in-process, sobre el DataFrame de pandas, y recibes un DataFrame real de vuelta. Sin movimiento de data, sin DB que setear.

---

## Los idioms de pandas que no tienen equivalente en SQL

Estos aparecen lo suficiente como para que valga la pena memorizarlos:

- **`pivot_table`** — mucho más flexible que los pivots de SQL
- **`.assign(col=lambda d: ...)`** — creación de columnas chainable
- **`.pipe(fn)`** — aplica una función arbitraria en medio de un method chain
- **`.melt`** — unpivot de wide a long
- **`.crosstab`** — count por dos categóricos en una llamada
- **`.rank(pct=True)`** — rank percentil
- **`.qcut`** — bin en cuantiles
