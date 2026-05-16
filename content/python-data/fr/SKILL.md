# Python Data Analysis Pack

> Les docs pandas sont excellentes. Les réponses Stack Overflow sont majoritairement correctes. La combinaison « je veux faire ce que je sais faire en SQL, mais en pandas, d'ici vendredi », c'est ce que ce kit corrige.

**Optimisé pour :** Claude · Claude Code · Cursor.

---

## Mode opératoire

Vous travaillez en binôme avec un analyste ou un data scientist dans un notebook. Hypothèses par défaut :

- **Python 3.11+** dans **Jupyter** ou les **notebooks VS Code** (`.ipynb` ou `.py` avec cellules `# %%`).
- **pandas** est la lib DataFrame par défaut. **Polars** quand la perf compte et que l'utilisateur le demande. **DuckDB** pour SQL-sur-DataFrames ou analytique sur fichiers locaux.
- **Plotly** pour les charts interactifs. **matplotlib + seaborn** quand la sortie est statique/print/PDF.
- L'utilisateur sait ce qu'est un DataFrame, ce que fait `groupby`, et ce qu'est un axe. Ne sur-expliquez pas les bases pandas.
- Le travail statistique est quotidien : t-tests, chi-square, ANOVA, régression OLS, alternatives non paramétriques.
- **Vectoriser, pas `apply`.** `df.apply(lambda x: ...)` sur une colonne quand une op vectorisée existe est le truc n°1 sur lequel pousser en sens contraire.

---

## Le modèle mental

```
[ Données brutes — CSV, Parquet, DB, API ]
            │
            ▼
[ Charger dans un DataFrame ] ────► [ EDA : shape, nulls, dtypes, distributions ]
            │                              │
            ▼                              ▼
[ Nettoyer : dtypes, missing, dupes ]  [ Décider : rester en pandas / passer à DuckDB ]
            │
            ▼
[ Transformer : groupby / merge / window ]
            │
            ▼
[ Analyser : stats / régression / segmentation ]
            │
            ▼
[ Communiquer : Plotly / seaborn / table ]
```

La plupart des analyses déraillent dans les deux premières phases. Si les données sont sales et que vous ne le repérez pas, toutes les conclusions en aval sont suspectes.

---

## EDA — les 30 premières lignes de chaque notebook

```python
import pandas as pd
import numpy as np

df = pd.read_parquet("events.parquet")

# Shape + dtypes
print(df.shape)
print(df.dtypes)

# Taux de null par colonne
nulls = df.isna().mean().sort_values(ascending=False)
print(nulls[nulls > 0])

# Distributions numériques
print(df.describe(include=[np.number]).T)

# Distributions catégorielles (top 10 chacune)
for col in df.select_dtypes(include="object").columns:
    print(f"\n{col} — {df[col].nunique()} unique")
    print(df[col].value_counts().head(10))

# Plage de dates
date_cols = df.select_dtypes(include="datetime64[ns]").columns
for col in date_cols:
    print(f"{col}: {df[col].min()} → {df[col].max()}")

# Valeurs suspectes
print("Zero rows:", (df == 0).sum().sort_values(ascending=False).head())
print("Negative numerics:", (df.select_dtypes(include=np.number) < 0).sum())
print("Future dates:", {col: (df[col] > pd.Timestamp.now()).sum() for col in date_cols})

# Doublons
print("Total duplicates:", df.duplicated().sum())
```

Ce que ça attrape et que vous manqueriez sinon :

- Une colonne à 80 % null qui ne devrait pas l'être
- Une colonne « price » avec des valeurs négatives à cause d'un bug d'encodage de remboursement
- Des timestamps « createdAt » en 2099 parce que quelqu'un a posé un placeholder
- Des lignes dupliquées issues d'une mauvaise jointure en amont

Lancez ça à chaque fois. Ça prend 5 secondes et ça évite une réunion embarrassante.

---

## SQL ↔ pandas — l'antisèche côte à côte

| SQL | pandas |
| --- | --- |
| `SELECT col1, col2 FROM df` | `df[["col1", "col2"]]` |
| `WHERE col > 5` | `df[df["col"] > 5]` |
| `WHERE col IN (1,2,3)` | `df[df["col"].isin([1,2,3])]` |
| `WHERE col1 = 5 AND col2 > 10` | `df[(df["col1"] == 5) & (df["col2"] > 10)]` |
| `ORDER BY col DESC` | `df.sort_values("col", ascending=False)` |
| `LIMIT 10` | `df.head(10)` |
| `SELECT DISTINCT col` | `df["col"].drop_duplicates()` ou `df["col"].unique()` |
| `COUNT(*)` | `len(df)` ou `df.shape[0]` |
| `COUNT(DISTINCT col)` | `df["col"].nunique()` |
| `GROUP BY col` | `df.groupby("col")` |
| `GROUP BY col1, col2` | `df.groupby(["col1", "col2"])` |
| `SUM(x) GROUP BY g` | `df.groupby("g")["x"].sum()` |
| `HAVING SUM(x) > 100` | `df.groupby("g")["x"].sum().loc[lambda s: s > 100]` |
| `JOIN ON a.id = b.id` | `pd.merge(a, b, on="id")` (inner par défaut) |
| `LEFT JOIN` | `pd.merge(a, b, on="id", how="left")` |
| `UNION ALL` | `pd.concat([a, b])` |
| `CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END` | `np.where(df["x"] > 0, "pos", "neg")` |
| `COALESCE(a, b)` | `df["a"].fillna(df["b"])` |
| `ROW_NUMBER() OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g").cumcount() + 1` |
| `LAG(x, 1) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].shift(1)` |
| `SUM(x) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].cumsum()` |

Pour les moments où le SQL est nettement plus propre que l'équivalent pandas — utilisez DuckDB :

```python
import duckdb

result = duckdb.sql("""
    SELECT
        user_id,
        COUNT(*) AS sessions,
        SUM(duration_seconds) AS total_seconds,
        ROW_NUMBER() OVER (ORDER BY SUM(duration_seconds) DESC) AS rank
    FROM df
    WHERE event_date >= '2026-01-01'
    GROUP BY user_id
    HAVING COUNT(*) >= 3
""").df()
```

DuckDB requête un DataFrame pandas en place — pas de copie, pas de chargement dans une DB séparée. Pour des requêtes analytiques sur des DataFrames de 100k-100M lignes, c'est plus rapide que pandas et le SQL est plus facile à lire.

---

## La règle de vectorisation

**Si vous avez écrit `.apply(lambda x: ...)`, demandez-vous si une version vectorisée existe.** Presque toujours, oui.

```python
# Mauvais — lent sur tout ce qui dépasse 10k lignes
df["full_name"] = df.apply(lambda r: f"{r['first']} {r['last']}", axis=1)

# Bon
df["full_name"] = df["first"] + " " + df["last"]
```

```python
# Mauvais
df["category"] = df["amount"].apply(lambda x: "high" if x > 100 else "low")

# Bon
df["category"] = np.where(df["amount"] > 100, "high", "low")

# Pour 3+ buckets
df["bucket"] = pd.cut(df["amount"],
                      bins=[-np.inf, 0, 50, 200, np.inf],
                      labels=["refund", "small", "medium", "large"])
```

```python
# Mauvais
df["domain"] = df["email"].apply(lambda x: x.split("@")[1] if pd.notna(x) else None)

# Bon
df["domain"] = df["email"].str.split("@", n=1).str[1]
```

Quand `.apply` EST le bon choix : logique row-wise complexe qui touche plusieurs colonnes et ne peut pas être exprimée comme une combinaison d'ops vectorisées ou de `np.select`. C'est rare.

---

## Cookbook de tests statistiques

Choisissez le test à partir de la question, pas de la forme des données. Puis vérifiez que la forme des données supporte ce test.

| Question | Test | Quand |
| --- | --- | --- |
| Les moyennes de ces deux groupes diffèrent-elles ? | t-test à échantillons indépendants | Normal-ish, ~30+ par groupe |
| Idem mais non-normal | Mann-Whitney U | Asymétrique ou petits échantillons |
| Le même groupe a-t-il changé avant vs après ? | t-test apparié | Observations appariées, normal |
| Idem, non-normal | Wilcoxon signed-rank | Apparié, non-normal |
| Les moyennes de ces 3+ groupes diffèrent-elles ? | ANOVA one-way | Normal-ish, variances égales |
| Idem, non-normal | Kruskal-Wallis | Non-normal ou variances inégales |
| Ces deux variables catégorielles sont-elles liées ? | Test du chi² d'indépendance | Effectifs attendus ≥ 5 par cellule |
| Idem avec petits effectifs attendus | Test exact de Fisher | 2×2, petits effectifs attendus |
| Y a-t-il une relation linéaire ? | Pearson + OLS | Continu, linéaire, résidus normaux |
| Idem mais non-linéaire ou non-normal | Corrélation de Spearman | Monotone |
| Prédire y à partir de plusieurs x | Régression OLS | y continu, linéaire, pas de multicolinéarité |

Formes de code :

```python
from scipy import stats
import statsmodels.formula.api as smf

# t-test indépendant
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]
t, p = stats.ttest_ind(control, treat, equal_var=False)  # Welch par défaut
print(f"t={t:.3f}, p={p:.4f}, control mean={control.mean():.2f}, treat mean={treat.mean():.2f}")

# Taille d'effet (Cohen's d)
def cohens_d(a, b):
    pooled = np.sqrt(((a.std() ** 2 + b.std() ** 2) / 2))
    return (a.mean() - b.mean()) / pooled
print(f"Cohen's d = {cohens_d(treat, control):.3f}")

# Chi-square
table = pd.crosstab(df["channel"], df["converted"])
chi2, p, dof, expected = stats.chi2_contingency(table)

# Régression OLS avec statsmodels
model = smf.ols("revenue ~ tenure_days + plan + region", data=df).fit()
print(model.summary())
```

**Reportez toujours la taille d'effet à côté de la p-value.** Un p de 0,001 avec un Cohen's d de 0,05, c'est « statistiquement significatif et pratiquement insignifiant ». Ne livrez pas cette conclusion sans le dire.

---

## Style de chart — la palette mute par défaut

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Defaults propres — à appliquer une fois en haut du notebook
sns.set_theme(style="whitegrid", context="notebook",
              palette="muted", font_scale=1.05)
plt.rcParams.update({
    "figure.figsize": (8, 5),
    "axes.spines.top": False,
    "axes.spines.right": False,
    "axes.titleweight": "semibold",
    "axes.titlepad": 12,
    "axes.titlelocation": "left",
})
```

Les règles :

- Pas de 3D quoi que ce soit. Jamais.
- Pas de pie charts sauf s'il y a 2-3 parts et qu'elles totalisent 100 %. Utilisez un bar chart.
- Labels d'axes en langue simple, pas en snake_case. `"Revenue (USD)"`, pas `"revenue_usd"`.
- Triez les barres par valeur, pas par nom de catégorie. La plus grande en haut.
- Séparez les grands nombres par des virgules. `ax.yaxis.set_major_formatter(lambda x, _: f"{x:,.0f}")`.
- Une couleur par couche visuelle, pas un arc-en-ciel. Utilisez une palette séquentielle pour les données ordonnées et catégorielle pour les données non ordonnées.
- Titre à gauche, en langue simple. Sous-titre comme une phrase atténuée sous le titre si nécessaire.

Pour de l'interactif/web, utilisez Plotly avec la même retenue :

```python
import plotly.express as px
fig = px.line(df, x="date", y="revenue", color="plan",
              color_discrete_sequence=px.colors.qualitative.Set2)
fig.update_layout(template="simple_white", title="Revenue by plan",
                  xaxis_title=None, yaxis_title="Revenue (USD)")
```

---

## Ce que ce kit refuse de faire

- Suggérer `.iterrows()` pour quoi que ce soit qui tourne plus d'une fois.
- Tendre la main vers `.apply()` quand une op vectorisée ou `np.select` couvre le cas.
- Drop les nulls sans montrer à l'utilisateur ce qui a été drop et lui demander si c'est bien ce qu'il voulait.
- Fitter une régression et ne reporter que les p-values, en ignorant la taille d'effet et les diagnostics de résidus.
- Produire un chart avec le style matplotlib par défaut (fond gris, grille pointillée, bleu/orange/vert).
- Recommander Spark / Dask avant d'avoir vérifié si DuckDB sur un seul node résout le problème.
- Suggérer des boucles `for` pandas quand un `agg` ou une window function ferait l'affaire.

---

## Documents compagnons

- `recipes/pandas-duckdb-polars.md` — opérations courantes à travers les trois libs
- `recipes/stats-cookbook.md` — t-test, chi-square, ANOVA, régression avec code
- `patterns/sql-to-pandas.md` — la traduction SQL ↔ pandas en profondeur, y compris les window functions

---

## Checklist de sanité avant de partager un notebook

- [ ] Bloc EDA en haut — shape, nulls, dtypes, valeurs suspectes
- [ ] Pas de `.apply` là où la vectorisation marcherait
- [ ] Sorties numériques formatées (pas de `2.3148327e-06` dans les tables pour stakeholders)
- [ ] Les charts utilisent la palette mute + axes nettoyés
- [ ] Les résultats stats incluent la taille d'effet, pas seulement les p-values
- [ ] La gestion des null/doublons est montrée, pas silencieuse
- [ ] Le notebook redémarre et tourne de haut en bas sans erreur
- [ ] Les cellules ne font pas 200 lignes — splittez-les
