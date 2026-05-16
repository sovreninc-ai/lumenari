# Traduction SQL ↔ pandas

La traduction qui revient chaque jour : vous connaissez le SQL, vous voulez le pandas, ou inversement. Ci-dessous les opérations dans l'ordre où elles apparaissent dans le vrai travail, avec les pièges en ligne.

Quand le SQL est sincèrement plus propre, **tendez la main vers DuckDB au lieu de traduire en pandas.** Il requête les DataFrames en place et le SQL est portable d'un moteur à l'autre.

---

## SELECT et WHERE

```sql
SELECT col1, col2 FROM df WHERE col3 > 10;
```

```python
df.loc[df["col3"] > 10, ["col1", "col2"]]
```

Pourquoi `.loc` et pas `df[df["col3"] > 10][["col1", "col2"]]` ? Les deux fonctionnent, mais `.loc` est une seule opération et évite le piège du chained indexing. La version chaînée lève `SettingWithCopyWarning` si vous essayez d'assigner au résultat.

---

## Multiples conditions WHERE

```sql
WHERE col1 = 'CA' AND col2 > 100 AND col3 IS NOT NULL
```

```python
df[(df["col1"] == "CA") & (df["col2"] > 100) & df["col3"].notna()]
```

Les parenthèses sont obligatoires autour de chaque condition. La précédence des opérateurs en Python traite `&` plus bas que `==` et `>`, donc `df["col1"] == "CA" & df["col2"] > 100` se parse comme `df["col1"] == ("CA" & df["col2"]) > 100`, qui est cassé.

Pour des filtres complexes, `.query()` est souvent lisible :

```python
df.query("col1 == 'CA' and col2 > 100 and col3.notna()")
```

Bat la version chargée de parenthèses quand il y a 3+ conditions. `.query` vous laisse aussi référencer des variables locales avec `@` :

```python
threshold = 100
df.query("col2 > @threshold")
```

---

## IN et NOT IN

```sql
WHERE col IN ('a', 'b', 'c')
WHERE col NOT IN ('a', 'b', 'c')
```

```python
df[df["col"].isin(["a", "b", "c"])]
df[~df["col"].isin(["a", "b", "c"])]
```

`~` est le NOT bitwise et c'est l'opérateur d'inversion sur les Series booléennes. N'utilisez pas `not` — il essaie d'évaluer la valeur de vérité de la Series entière et lève une erreur.

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

`na=False` parce que `contains` renvoie NaN pour les cellules null par défaut, et l'indexation booléenne avec NaN lève une erreur.

Pour insensible à la casse : `df["name"].str.contains("foo", case=False, na=False)`.

Pour du regex complet : `df["name"].str.contains(r"^A\w+", regex=True, na=False)`.

---

## ORDER BY + LIMIT

```sql
SELECT * FROM df ORDER BY col1 DESC, col2 ASC LIMIT 100
```

```python
df.sort_values(["col1", "col2"], ascending=[False, True]).head(100)
```

Pour « top N par groupe » (la question classique de window SQL) :

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY group ORDER BY value DESC) AS rn FROM df
) t WHERE rn <= 3
```

```python
# pandas — verbeux mais ça marche
df.sort_values("value", ascending=False).groupby("group").head(3)
```

Si vous avez une vraie window function dans le SQL, DuckDB sur le DataFrame est en général plus propre.

---

## GROUP BY + agrégation

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

L'agrégation nommée (`total=("amount", "sum")`) est la syntaxe moderne lisible. Évitez le vieux style `.agg({"amount": "sum"})` — il ne permet pas de renommer, et vous finissez avec des colonnes multi-level.

`HAVING` devient `.loc[lambda d: ...]` (filtre sur le résultat groupé). La forme `lambda` permet de chaîner.

---

## GROUP BY multiples agrégations sur des colonnes différentes

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

# Deux buckets — np.where est le plus propre
df["bucket"] = np.where(df["amount"] > 100, "high", "low")

# Trois+ buckets — np.select
df["bucket"] = np.select(
    [df["amount"] > 100, df["amount"] > 50],
    ["high", "medium"],
    default="low",
)

# Buckets numériques ordonnés — pd.cut
df["bucket"] = pd.cut(
    df["amount"],
    bins=[-np.inf, 0, 50, 100, np.inf],
    labels=["refund", "low", "medium", "high"],
)
```

`pd.qcut` pour des bins par quantile (quartiles, déciles, etc.).

---

## COALESCE

```sql
SELECT COALESCE(a, b, c, 0) FROM df
```

```python
df["first_non_null"] = df["a"].fillna(df["b"]).fillna(df["c"]).fillna(0)
# ou version vectorisée
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

Options de `how` : `"inner"` (par défaut), `"left"`, `"right"`, `"outer"`, `"cross"`.

Après chaque jointure, vérifiez les comptes de lignes :

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

Un changement de row-count sans explication est un bug qui attend de partir en prod.

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

`UNION` (dédoublonné) serait `pd.concat([df1, df2], ignore_index=True).drop_duplicates()`.

---

## DISTINCT

```sql
SELECT DISTINCT col1, col2 FROM df
```

```python
df[["col1", "col2"]].drop_duplicates()
```

Pour les valeurs uniques d'une seule colonne : `df["col"].unique()` renvoie un array numpy. `df["col"].drop_duplicates()` renvoie une Series.

---

## Window functions — là où pandas devient verbeux

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

### Total cumulé

```sql
SELECT *,
       SUM(value) OVER (PARTITION BY group ORDER BY event_date) AS running_total
FROM df
```

```python
df = df.sort_values(["group", "event_date"])
df["running_total"] = df.groupby("group")["value"].cumsum()
```

### Moyenne mobile

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

Les fenêtres glissantes à l'intérieur d'un groupby ont besoin de `.transform` pour que le résultat s'aligne avec le DataFrame original.

---

## Quand abandonner et tendre la main vers DuckDB

Si vous vous surprenez à écrire 3+ lignes de pandas pour ce qui fait 4 lignes de SQL, surtout avec des window functions ou des jointures multi-tables :

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

Ça tourne in-process, sur le DataFrame pandas, et vous récupérez un vrai DataFrame. Aucun déplacement de données, aucune DB à configurer.

---

## Les idiomes pandas qui n'ont pas d'équivalent SQL

Ceux-là reviennent assez pour mériter d'être mémorisés :

- **`pivot_table`** — bien plus flexible que les pivots SQL
- **`.assign(col=lambda d: ...)`** — création de colonnes chaînable
- **`.pipe(fn)`** — appliquer une fonction arbitraire au milieu d'une chaîne de méthodes
- **`.melt`** — dépivoter de wide à long
- **`.crosstab`** — compter par deux catégorielles en un appel
- **`.rank(pct=True)`** — rang en percentile
- **`.qcut`** — bin en quantiles
