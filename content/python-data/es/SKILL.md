# Pack de Análisis de Datos en Python

> La doc de pandas es excelente. Las respuestas de Stack Overflow son mayormente correctas. La combinación de "quiero hacer esta cosa que sé hacer en SQL, pero en pandas, para el viernes" es lo que este kit arregla.

**Optimizado para:** Claude · Claude Code · Cursor.

---

## Modo de operación

Estás haciendo pair programming con un analista o data scientist en un notebook. Supuestos por defecto:

- **Python 3.11+** en **Jupyter** o **VS Code notebooks** (`.ipynb` o `.py` con celdas `# %%`).
- **pandas** es la librería de DataFrame por defecto. **Polars** cuando el performance importa y el usuario opta in. **DuckDB** para SQL-sobre-DataFrames o analytics sobre archivos locales.
- **Plotly** para gráficos interactivos. **matplotlib + seaborn** cuando la salida es estática/imprenta/PDF.
- El usuario sabe qué es un DataFrame, qué hace `groupby` y qué es un axis. No expliques de más los básicos de pandas.
- El trabajo estadístico es del día a día: t-tests, chi-square, ANOVA, regresión OLS, alternativas no paramétricas.
- **Vectoriza, no `apply`.** `df.apply(lambda x: ...)` sobre una columna cuando existe una op vectorizada es la cosa #1 contra la que hay que empujar.

---

## El modelo mental

```
[ Data cruda — CSV, Parquet, DB, API ]
            │
            ▼
[ Cargar en DataFrame ] ────► [ EDA: shape, nulls, dtypes, distribuciones ]
            │                              │
            ▼                              ▼
[ Limpiar: dtypes, missing, dupes ]  [ Decidir: quedarse en pandas / mover a DuckDB ]
            │
            ▼
[ Transformar: groupby / merge / window ]
            │
            ▼
[ Analizar: stats / regresión / segmentación ]
            │
            ▼
[ Comunicar: Plotly / seaborn / tabla ]
```

La mayoría de los análisis se descarrilan en las dos primeras etapas. Si la data está sucia y no lo agarras, cada conclusión downstream queda sospechosa.

---

## EDA — las primeras 30 líneas de cada notebook

```python
import pandas as pd
import numpy as np

df = pd.read_parquet("events.parquet")

# Shape + dtypes
print(df.shape)
print(df.dtypes)

# Tasa de nulls por columna
nulls = df.isna().mean().sort_values(ascending=False)
print(nulls[nulls > 0])

# Distribuciones numéricas
print(df.describe(include=[np.number]).T)

# Distribuciones categóricas (top 10 cada una)
for col in df.select_dtypes(include="object").columns:
    print(f"\n{col} — {df[col].nunique()} unique")
    print(df[col].value_counts().head(10))

# Rango de fechas
date_cols = df.select_dtypes(include="datetime64[ns]").columns
for col in date_cols:
    print(f"{col}: {df[col].min()} → {df[col].max()}")

# Valores sospechosos
print("Zero rows:", (df == 0).sum().sort_values(ascending=False).head())
print("Negative numerics:", (df.select_dtypes(include=np.number) < 0).sum())
print("Future dates:", {col: (df[col] > pd.Timestamp.now()).sum() for col in date_cols})

# Duplicates
print("Total duplicates:", df.duplicated().sum())
```

Lo que esto agarra y que de lo contrario se te pasaría:

- Una columna que está 80% null y no debería
- Una columna "price" con valores negativos por un bug de encoding de refunds
- Timestamps "createdAt" de 2099 porque alguien puso un placeholder
- Filas duplicadas por un join malo upstream

Corre esto cada vez. Tarda 5 segundos y previene una reunión vergonzosa.

---

## SQL ↔ pandas — el cheat sheet lado a lado

| SQL | pandas |
| --- | --- |
| `SELECT col1, col2 FROM df` | `df[["col1", "col2"]]` |
| `WHERE col > 5` | `df[df["col"] > 5]` |
| `WHERE col IN (1,2,3)` | `df[df["col"].isin([1,2,3])]` |
| `WHERE col1 = 5 AND col2 > 10` | `df[(df["col1"] == 5) & (df["col2"] > 10)]` |
| `ORDER BY col DESC` | `df.sort_values("col", ascending=False)` |
| `LIMIT 10` | `df.head(10)` |
| `SELECT DISTINCT col` | `df["col"].drop_duplicates()` o `df["col"].unique()` |
| `COUNT(*)` | `len(df)` o `df.shape[0]` |
| `COUNT(DISTINCT col)` | `df["col"].nunique()` |
| `GROUP BY col` | `df.groupby("col")` |
| `GROUP BY col1, col2` | `df.groupby(["col1", "col2"])` |
| `SUM(x) GROUP BY g` | `df.groupby("g")["x"].sum()` |
| `HAVING SUM(x) > 100` | `df.groupby("g")["x"].sum().loc[lambda s: s > 100]` |
| `JOIN ON a.id = b.id` | `pd.merge(a, b, on="id")` (inner por default) |
| `LEFT JOIN` | `pd.merge(a, b, on="id", how="left")` |
| `UNION ALL` | `pd.concat([a, b])` |
| `CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END` | `np.where(df["x"] > 0, "pos", "neg")` |
| `COALESCE(a, b)` | `df["a"].fillna(df["b"])` |
| `ROW_NUMBER() OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g").cumcount() + 1` |
| `LAG(x, 1) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].shift(1)` |
| `SUM(x) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].cumsum()` |

Para los momentos donde el SQL es mucho más limpio que el equivalente en pandas — usa DuckDB:

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

DuckDB queryea un DataFrame de pandas in place — sin copiar, sin cargar a una DB separada. Para queries con forma de analytics sobre DataFrames de 100k-100M filas, es más rápido que pandas y el SQL es más fácil de leer.

---

## La regla de vectorización

**Si escribiste `.apply(lambda x: ...)`, pregúntate si existe una versión vectorizada.** Casi siempre existe.

```python
# Malo — lento en cualquier cosa > 10k filas
df["full_name"] = df.apply(lambda r: f"{r['first']} {r['last']}", axis=1)

# Bueno
df["full_name"] = df["first"] + " " + df["last"]
```

```python
# Malo
df["category"] = df["amount"].apply(lambda x: "high" if x > 100 else "low")

# Bueno
df["category"] = np.where(df["amount"] > 100, "high", "low")

# Para 3+ buckets
df["bucket"] = pd.cut(df["amount"],
                      bins=[-np.inf, 0, 50, 200, np.inf],
                      labels=["refund", "small", "medium", "large"])
```

```python
# Malo
df["domain"] = df["email"].apply(lambda x: x.split("@")[1] if pd.notna(x) else None)

# Bueno
df["domain"] = df["email"].str.split("@", n=1).str[1]
```

Cuando `.apply` SÍ es la jugada correcta: lógica row-wise compleja que toca múltiples columnas y no se puede expresar como combinación de ops vectorizadas o `np.select`. Eso es raro.

---

## Cookbook de tests estadísticos

Elige el test desde la pregunta, no desde la forma de la data. Después chequea que la forma de la data soporte el test.

| Pregunta | Test | Cuándo |
| --- | --- | --- |
| ¿Son distintas las medias de estos dos grupos? | T-test de muestras independientes | Normal-ish, ~30+ por grupo |
| Lo mismo pero no normal | Mann-Whitney U | Sesgado o muestras chicas |
| ¿Cambió el mismo grupo antes vs. después? | T-test pareado | Observaciones pareadas, normal |
| Lo mismo, no normal | Wilcoxon signed-rank | Pareado, no normal |
| ¿Son distintas las medias de 3+ grupos? | ANOVA de una vía | Normal-ish, varianzas iguales |
| Lo mismo, no normal | Kruskal-Wallis | No normal o varianzas desiguales |
| ¿Están relacionadas estas dos variables categóricas? | Chi-square de independencia | Counts esperados ≥ 5 por celda |
| Lo mismo con counts esperados chicos | Test exacto de Fisher | 2×2, counts esperados chicos |
| ¿Hay relación lineal? | Correlación de Pearson + OLS | Continuo, lineal, residuales normales |
| Lo mismo pero no lineal o no normal | Correlación de Spearman | Monotónico |
| Predecir y desde múltiples x | Regresión OLS | y continuo, lineal, sin multicolinealidad |

Formas de código:

```python
from scipy import stats
import statsmodels.formula.api as smf

# T-test independiente
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]
t, p = stats.ttest_ind(control, treat, equal_var=False)  # Welch por default
print(f"t={t:.3f}, p={p:.4f}, control mean={control.mean():.2f}, treat mean={treat.mean():.2f}")

# Tamaño del efecto (Cohen's d)
def cohens_d(a, b):
    pooled = np.sqrt(((a.std() ** 2 + b.std() ** 2) / 2))
    return (a.mean() - b.mean()) / pooled
print(f"Cohen's d = {cohens_d(treat, control):.3f}")

# Chi-square
table = pd.crosstab(df["channel"], df["converted"])
chi2, p, dof, expected = stats.chi2_contingency(table)

# Regresión OLS con statsmodels
model = smf.ols("revenue ~ tenure_days + plan + region", data=df).fit()
print(model.summary())
```

**Siempre reporta el tamaño del efecto al lado del p-value.** Un p de 0.001 con un Cohen's d de 0.05 es "estadísticamente significativo y prácticamente sin sentido". No envíes esa conclusión sin decirlo.

---

## Estilo de gráficos — el default de paleta muted

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Defaults limpios — aplica una vez arriba del notebook
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

Las reglas:

- Nada en 3D. Nunca.
- Sin pie charts salvo que haya 2-3 slices y sumen a 100%. Usa un bar chart.
- Labels de axis en español llano, no snake_case. `"Revenue (USD)"`, no `"revenue_usd"`.
- Ordena las barras por valor, no por nombre de categoría. La más grande arriba.
- Separa con comas los números grandes. `ax.yaxis.set_major_formatter(lambda x, _: f"{x:,.0f}")`.
- Un color por capa visual, no un arcoíris. Usa una paleta secuencial para data ordenada y una categórica para no ordenada.
- Título a la izquierda, en español llano. Subtítulo como oración tenue debajo del título si hace falta.

Para interactivo/web, usa Plotly con la misma sobriedad:

```python
import plotly.express as px
fig = px.line(df, x="date", y="revenue", color="plan",
              color_discrete_sequence=px.colors.qualitative.Set2)
fig.update_layout(template="simple_white", title="Revenue by plan",
                  xaxis_title=None, yaxis_title="Revenue (USD)")
```

---

## Lo que este kit rechaza

- Sugerir `.iterrows()` para cualquier cosa que necesite correr más de una vez.
- Acudir a `.apply()` cuando una op vectorizada o `np.select` cubre el caso.
- Tirar nulls sin mostrarle al usuario qué se tiró y preguntar si eso es lo que quería.
- Ajustar una regresión y reportar solo los p-values, ignorando el tamaño del efecto y los diagnósticos de residuales.
- Producir un gráfico con styling default de matplotlib (background gris, grid punteado, azul/naranja/verde).
- Recomendar Spark / Dask antes de chequear si DuckDB en un solo nodo resuelve el problema.
- Sugerir loops `for` en pandas cuando un `agg` o window function funcionarían.

---

## Docs complementarios

- `recipes/pandas-duckdb-polars.md` — operaciones comunes entre las tres librerías
- `recipes/stats-cookbook.md` — t-test, chi-square, ANOVA, regresión con código
- `patterns/sql-to-pandas.md` — la traducción más profunda SQL ↔ pandas, incluyendo window functions

---

## Sanity checklist antes de compartir un notebook

- [ ] Bloque de EDA arriba — shape, nulls, dtypes, valores sospechosos
- [ ] Sin `.apply` donde la vectorización funcionaría
- [ ] Outputs numéricos formateados (sin `2.3148327e-06` en tablas de cara a stakeholders)
- [ ] Los gráficos usan paleta muted + ejes limpios
- [ ] Los resultados de stats incluyen tamaño de efecto, no solo p-values
- [ ] El manejo de nulls/duplicados se muestra, no es silencioso
- [ ] El notebook reinicia y corre de arriba a abajo sin errores
- [ ] Las celdas no son de 200 líneas — divídelas
