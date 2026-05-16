# Tradução SQL ↔ pandas

A tradução que aparece todo dia: você sabe o SQL, quer o pandas, ou vice-versa. Abaixo, as operações na ordem de frequência em trabalho real, com os gotchas inline.

Quando o SQL é genuinamente mais limpo, **pegue DuckDB em vez de traduzir para pandas.** Ele consulta DataFrames in place e o SQL é portável entre engines.

---

## SELECT e WHERE

```sql
SELECT col1, col2 FROM df WHERE col3 > 10;
```

```python
df.loc[df["col3"] > 10, ["col1", "col2"]]
```

Por que `.loc` e não `df[df["col3"] > 10][["col1", "col2"]]`? Os dois funcionam, mas `.loc` é uma operação e evita a armadilha de chained-indexing. A versão encadeada lança `SettingWithCopyWarning` se você tentar atribuir no resultado.

---

## Múltiplas condições WHERE

```sql
WHERE col1 = 'CA' AND col2 > 100 AND col3 IS NOT NULL
```

```python
df[(df["col1"] == "CA") & (df["col2"] > 100) & df["col3"].notna()]
```

Parênteses em volta de cada condição são obrigatórios. A precedência de operadores do Python trata `&` mais baixa que `==` e `>`, então `df["col1"] == "CA" & df["col2"] > 100` é parseado como `df["col1"] == ("CA" & df["col2"]) > 100`, que está quebrado.

Para filtros complexos, `.query()` costuma ser legível:

```python
df.query("col1 == 'CA' and col2 > 100 and col3.notna()")
```

Ganha da versão cheia de parêntese quando tem 3+ condições. `.query` também deixa referenciar variáveis locais com `@`:

```python
threshold = 100
df.query("col2 > @threshold")
```

---

## IN e NOT IN

```sql
WHERE col IN ('a', 'b', 'c')
WHERE col NOT IN ('a', 'b', 'c')
```

```python
df[df["col"].isin(["a", "b", "c"])]
df[~df["col"].isin(["a", "b", "c"])]
```

`~` é bitwise-NOT e é o operador de inversão em Series booleanas. Não use `not` — ele tenta avaliar a verdade da Series inteira e lança erro.

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

`na=False` porque `contains` retorna NaN para células nulas por default, e indexação booleana com NaN lança erro.

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

Para "top N por grupo" (a clássica pergunta de window SQL):

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC) AS rn FROM df
) t WHERE rn <= 3
```

```python
# pandas — verboso mas funciona
df.sort_values("value", ascending=False).groupby("group").head(3)
```

Se tem uma função de janela real no SQL, DuckDB no DataFrame normalmente fica mais limpo.

---

## GROUP BY + agregação

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

Agregação nomeada (`total=("amount", "sum")`) é a sintaxe moderna legível. Evite o estilo mais antigo `.agg({"amount": "sum"})` — ele não te deixa renomear e você acaba com colunas multi-nível.

`HAVING` vira `.loc[lambda d: ...]` (filtra no resultado agrupado). A forma `lambda` permite encadear.

---

## GROUP BY com múltiplas agregações em colunas diferentes

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

# Dois buckets — np.where é o mais limpo
df["bucket"] = np.where(df["amount"] > 100, "high", "low")

# Três+ buckets — np.select
df["bucket"] = np.select(
    [df["amount"] > 100, df["amount"] > 50],
    ["high", "medium"],
    default="low",
)
```

```python
# Buckets numéricos ordenados — pd.cut
df["bucket"] = pd.cut(
    df["amount"],
    bins=[-np.inf, 0, 50, 100, np.inf],
    labels=["refund", "low", "medium", "high"],
)
```

`pd.qcut` para bins por quantil (quartis, decis etc.).

---

## COALESCE

```sql
SELECT COALESCE(a, b, c, 0) FROM df
```

```python
df["first_non_null"] = df["a"].fillna(df["b"]).fillna(df["c"]).fillna(0)
# ou versão vetorizada
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

Opções de `how`: `"inner"` (default), `"left"`, `"right"`, `"outer"`, `"cross"`.

Depois de todo join, cheque contagens de linha:

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

Mudança de contagem de linha sem explicação é bug esperando para ir para produção.

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

`UNION` (desduplicado) seria `pd.concat([df1, df2], ignore_index=True).drop_duplicates()`.

---

## DISTINCT

```sql
SELECT DISTINCT col1, col2 FROM df
```

```python
df[["col1", "col2"]].drop_duplicates()
```

Para valores únicos de uma única coluna: `df["col"].unique()` retorna um array numpy. `df["col"].drop_duplicates()` retorna uma Series.

---

## Funções de janela — onde o pandas fica verboso

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

### Média móvel

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

Janelas rolling dentro de groupby precisam de `.transform` para o resultado alinhar com o DataFrame original.

---

## Quando desistir e pegar DuckDB

Se você se pega escrevendo 3+ linhas de pandas para o que seriam 4 linhas de SQL, especialmente com funções de janela ou joins multi-tabela:

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

Roda in-process, sobre o DataFrame pandas, e você recebe de volta um DataFrame real. Sem movimentação de dado, sem DB para configurar.

---

## Os idiomas de pandas que não têm equivalente em SQL

Aparecem o suficiente para valer a pena decorar:

- **`pivot_table`** — bem mais flexível que pivots em SQL
- **`.assign(col=lambda d: ...)`** — criação de coluna encadeável
- **`.pipe(fn)`** — aplica uma função arbitrária no meio de um method chain
- **`.melt`** — unpivot de wide para long
- **`.crosstab`** — contagem por duas categóricas numa chamada
- **`.rank(pct=True)`** — rank em percentil
- **`.qcut`** — bin em quantis
