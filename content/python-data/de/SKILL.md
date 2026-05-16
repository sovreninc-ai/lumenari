# Python Data Analysis Pack

> Die pandas-Docs sind exzellent. Die Stack-Overflow-Antworten sind meist korrekt. Die Kombination aus "Ich will dieses Ding tun, das ich in SQL kenne, aber in pandas, bis Freitag" ist, was dieses Kit fixt.

**Optimiert für:** Claude · Claude Code · Cursor.

---

## Arbeitsmodus

Du arbeitest mit einem Analysten oder Data Scientist in einem Notebook. Standard-Annahmen:

- **Python 3.11+** in **Jupyter** oder **VS Code Notebooks** (`.ipynb` oder `.py` mit `# %%`-Cells).
- **pandas** ist die Default-DataFrame-Bibliothek. **Polars**, wenn Performance zählt und der Nutzer opt-in. **DuckDB** für SQL-on-DataFrames oder lokale File-Analytics.
- **Plotly** für interaktive Charts. **matplotlib + seaborn**, wenn der Output statisch/Print/PDF ist.
- Der Nutzer weiß, was ein DataFrame ist, was `groupby` tut und was eine Axis ist. Erkläre keine pandas-Basics over.
- Statistische Arbeit ist Alltag: t-Tests, Chi-Quadrat, ANOVA, OLS-Regression, nicht-parametrische Alternativen.
- **Vektorisiere, kein `apply`.** `df.apply(lambda x: ...)` auf einer Spalte, wenn ein vektorisiertes Op existiert, ist die #1-Sache, gegen die zurückzuweisen ist.

---

## Das Mental Model

```
[ Raw data — CSV, Parquet, DB, API ]
            │
            ▼
[ Load into DataFrame ] ────► [ EDA: shape, nulls, dtypes, distributions ]
            │                              │
            ▼                              ▼
[ Clean: dtypes, missing, dupes ]  [ Decide: stay in pandas / move to DuckDB ]
            │
            ▼
[ Transform: groupby / merge / window ]
            │
            ▼
[ Analyze: stats / regression / segmentation ]
            │
            ▼
[ Communicate: Plotly / seaborn / table ]
```

Die meisten Analysen gehen in den ersten zwei Stages aus dem Ruder. Wenn die Daten schmutzig sind und du es nicht erfasst, ist jede Downstream-Schlussfolgerung verdächtig.

---

## EDA — die ersten 30 Zeilen jedes Notebooks

```python
import pandas as pd
import numpy as np

df = pd.read_parquet("events.parquet")

# Shape + dtypes
print(df.shape)
print(df.dtypes)

# Null rate per column
nulls = df.isna().mean().sort_values(ascending=False)
print(nulls[nulls > 0])

# Numeric distributions
print(df.describe(include=[np.number]).T)

# Categorical distributions (top 10 each)
for col in df.select_dtypes(include="object").columns:
    print(f"\n{col} — {df[col].nunique()} unique")
    print(df[col].value_counts().head(10))

# Date range
date_cols = df.select_dtypes(include="datetime64[ns]").columns
for col in date_cols:
    print(f"{col}: {df[col].min()} → {df[col].max()}")

# Suspicious values
print("Zero rows:", (df == 0).sum().sort_values(ascending=False).head())
print("Negative numerics:", (df.select_dtypes(include=np.number) < 0).sum())
print("Future dates:", {col: (df[col] > pd.Timestamp.now()).sum() for col in date_cols})

# Duplicates
print("Total duplicates:", df.duplicated().sum())
```

Was das fängt, was du sonst verpasst:

- Eine Spalte, die zu 80% null ist und es nicht sein sollte
- Eine "price"-Spalte mit negativen Werten aus einem Refund-Encoding-Bug
- "createdAt"-Timestamps aus 2099, weil jemand einen Placeholder gesetzt hat
- Duplikat-Zeilen aus einem schlechten Join upstream

Lass das jedes Mal laufen. Es dauert 5 Sekunden und verhindert ein peinliches Meeting.

---

## SQL ↔ pandas — das Side-by-Side-Cheat-Sheet

| SQL | pandas |
| --- | --- |
| `SELECT col1, col2 FROM df` | `df[["col1", "col2"]]` |
| `WHERE col > 5` | `df[df["col"] > 5]` |
| `WHERE col IN (1,2,3)` | `df[df["col"].isin([1,2,3])]` |
| `WHERE col1 = 5 AND col2 > 10` | `df[(df["col1"] == 5) & (df["col2"] > 10)]` |
| `ORDER BY col DESC` | `df.sort_values("col", ascending=False)` |
| `LIMIT 10` | `df.head(10)` |
| `SELECT DISTINCT col` | `df["col"].drop_duplicates()` oder `df["col"].unique()` |
| `COUNT(*)` | `len(df)` oder `df.shape[0]` |
| `COUNT(DISTINCT col)` | `df["col"].nunique()` |
| `GROUP BY col` | `df.groupby("col")` |
| `GROUP BY col1, col2` | `df.groupby(["col1", "col2"])` |
| `SUM(x) GROUP BY g` | `df.groupby("g")["x"].sum()` |
| `HAVING SUM(x) > 100` | `df.groupby("g")["x"].sum().loc[lambda s: s > 100]` |
| `JOIN ON a.id = b.id` | `pd.merge(a, b, on="id")` (Inner by Default) |
| `LEFT JOIN` | `pd.merge(a, b, on="id", how="left")` |
| `UNION ALL` | `pd.concat([a, b])` |
| `CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END` | `np.where(df["x"] > 0, "pos", "neg")` |
| `COALESCE(a, b)` | `df["a"].fillna(df["b"])` |
| `ROW_NUMBER() OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g").cumcount() + 1` |
| `LAG(x, 1) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].shift(1)` |
| `SUM(x) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].cumsum()` |

Für die Momente, in denen das SQL viel sauberer ist als das pandas-Äquivalent — nutze DuckDB:

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

DuckDB queryt ein pandas-DataFrame in-place — kein Kopieren, kein Laden in eine separate DB. Für analytics-shaped Queries auf 100k-100M-Zeilen-DataFrames ist es schneller als pandas und das SQL ist leichter zu lesen.

---

## Die Vektorisierungs-Regel

**Wenn du `.apply(lambda x: ...)` geschrieben hast, frage, ob eine vektorisierte Version existiert.** Sie existiert fast immer.

```python
# Bad — slow on anything > 10k rows
df["full_name"] = df.apply(lambda r: f"{r['first']} {r['last']}", axis=1)

# Good
df["full_name"] = df["first"] + " " + df["last"]
```

```python
# Bad
df["category"] = df["amount"].apply(lambda x: "high" if x > 100 else "low")

# Good
df["category"] = np.where(df["amount"] > 100, "high", "low")

# For 3+ buckets
df["bucket"] = pd.cut(df["amount"],
                      bins=[-np.inf, 0, 50, 200, np.inf],
                      labels=["refund", "small", "medium", "large"])
```

```python
# Bad
df["domain"] = df["email"].apply(lambda x: x.split("@")[1] if pd.notna(x) else None)

# Good
df["domain"] = df["email"].str.split("@", n=1).str[1]
```

Wann `.apply` DIE richtige Wahl ist: komplexe row-wise Logik, die mehrere Spalten berührt und nicht als Kombination vektorisierter Ops oder `np.select` ausgedrückt werden kann. Das ist selten.

---

## Statistical-Test-Cookbook

Wähle den Test aus der Frage, nicht der Daten-Shape. Dann prüfe, dass die Daten-Shape den Test unterstützt.

| Frage | Test | Wann |
| --- | --- | --- |
| Sind die Mittelwerte dieser zwei Gruppen unterschiedlich? | Independent-Samples t-Test | Normal-ish, ~30+ pro Gruppe |
| Wie oben, aber non-normal | Mann-Whitney U | Schief oder kleine Samples |
| Hat sich dieselbe Gruppe vorher vs. nachher geändert? | Paired t-Test | Gepaarte Observationen, normal |
| Wie oben, non-normal | Wilcoxon Signed-Rank | Gepaart, non-normal |
| Sind die Mittelwerte dieser 3+ Gruppen unterschiedlich? | One-Way ANOVA | Normal-ish, gleiche Varianzen |
| Wie oben, non-normal | Kruskal-Wallis | Non-normal oder ungleiche Varianzen |
| Sind diese zwei kategorialen Variablen verwandt? | Chi-Square-Test of Independence | Erwartete Counts ≥ 5 pro Cell |
| Wie oben mit kleinen erwarteten Counts | Fishers exakter Test | 2×2, kleine erwartete Counts |
| Gibt es einen linearen Zusammenhang? | Pearson-Correlation + OLS | Continuous, linear, normal Residuals |
| Wie oben, aber non-linear oder non-normal | Spearman-Correlation | Monoton |
| y aus mehreren x's vorhersagen | OLS-Regression | Continuous y, linear, keine Multikollinearität |

Code-Shapes:

```python
from scipy import stats
import statsmodels.formula.api as smf

# Independent t-test
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]
t, p = stats.ttest_ind(control, treat, equal_var=False)  # Welch's by default
print(f"t={t:.3f}, p={p:.4f}, control mean={control.mean():.2f}, treat mean={treat.mean():.2f}")

# Effect size (Cohen's d)
def cohens_d(a, b):
    pooled = np.sqrt(((a.std() ** 2 + b.std() ** 2) / 2))
    return (a.mean() - b.mean()) / pooled
print(f"Cohen's d = {cohens_d(treat, control):.3f}")

# Chi-square
table = pd.crosstab(df["channel"], df["converted"])
chi2, p, dof, expected = stats.chi2_contingency(table)

# OLS regression with statsmodels
model = smf.ols("revenue ~ tenure_days + plan + region", data=df).fit()
print(model.summary())
```

**Reporte immer Effect Size neben dem p-Wert.** Ein p von 0,001 mit einem Cohens d von 0,05 ist "statistisch signifikant und praktisch bedeutungslos." Ship diese Schlussfolgerung nicht aus, ohne das zu sagen.

---

## Plot-Styling — die Muted-Palette als Default

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Clean defaults — apply once at the top of the notebook
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

Die Regeln:

- Kein 3D irgendetwas. Niemals.
- Keine Pie-Charts, außer es gibt 2-3 Slices und sie summieren sich auf 100%. Nutze ein Bar-Chart.
- Achsenbeschriftungen in Plain English, nicht snake_case. `"Revenue (USD)"`, nicht `"revenue_usd"`.
- Sortiere Bars nach Wert, nicht nach Kategorienname. Größte oben.
- Comma-separiere große Zahlen. `ax.yaxis.set_major_formatter(lambda x, _: f"{x:,.0f}")`.
- Eine Farbe pro Visual-Layer, kein Regenbogen. Nutze eine sequentielle Palette für geordnete Daten und eine kategoriale Palette für ungeordnete.
- Title links, in Plain English. Subtitle als verblasster Satz unter dem Title, falls nötig.

Für Interactive/Web, nutze Plotly mit derselben Zurückhaltung:

```python
import plotly.express as px
fig = px.line(df, x="date", y="revenue", color="plan",
              color_discrete_sequence=px.colors.qualitative.Set2)
fig.update_layout(template="simple_white", title="Revenue by plan",
                  xaxis_title=None, yaxis_title="Revenue (USD)")
```

---

## Was dieses Kit verweigert

- `.iterrows()` für irgendetwas vorzuschlagen, das mehr als einmal laufen muss.
- Nach `.apply()` zu greifen, wenn ein vektorisiertes Op oder `np.select` den Fall abdeckt.
- Nulls droppen, ohne dem Nutzer zu zeigen, was gedroppt wurde, und zu fragen, ob das das ist, was er will.
- Eine Regression fitten und nur die p-Werte reporten, Effect Size und Residual-Diagnostics ignorieren.
- Ein Chart mit Default-matplotlib-Styling produzieren (grauer Hintergrund, gepunktetes Grid, blau/orange/grün).
- Spark / Dask empfehlen, bevor geprüft wird, ob DuckDB auf einem Single Node das Problem löst.
- pandas-`for`-Loops vorschlagen, wenn ein `agg` oder eine Window-Funktion funktionieren würde.

---

## Begleitende Dokumente

- `recipes/pandas-duckdb-polars.md` — gängige Operationen über die drei Bibliotheken
- `recipes/stats-cookbook.md` — t-Test, Chi-Square, ANOVA, Regression mit Code
- `patterns/sql-to-pandas.md` — die tiefere SQL ↔ pandas-Übersetzung, inklusive Window-Funktionen

---

## Sanity-Checkliste vor dem Teilen eines Notebooks

- [ ] EDA-Block oben — Shape, Nulls, Dtypes, verdächtige Werte
- [ ] Kein `.apply`, wo Vektorisierung funktionieren würde
- [ ] Numerische Outputs formatiert (kein `2.3148327e-06` in Stakeholder-seitigen Tabellen)
- [ ] Charts nutzen die Muted-Palette + bereinigte Achsen
- [ ] Stats-Ergebnisse inkludieren Effect Size, nicht nur p-Werte
- [ ] Null/Duplikat-Handling wird gezeigt, nicht still
- [ ] Notebook restartet und läuft top-to-bottom ohne Errors
- [ ] Cells sind nicht 200 Zeilen lang — splitte sie
