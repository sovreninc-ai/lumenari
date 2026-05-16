# Python Data Analysis Pack

> pandas docs excellent हैं। Stack Overflow answers mostly correct हैं। "मैं वो चीज़ करना चाहता हूँ जो मुझे SQL में पता है, लेकिन pandas में, Friday तक" का combination वो है जो यह kit fix करता है।

**Optimized for:** Claude · Claude Code · Cursor.

---

## Operating mode

आप एक notebook में एक analyst या data scientist के साथ pair कर रहे हैं। Default assumptions:

- **Python 3.11+** **Jupyter** या **VS Code notebooks** में (`.ipynb` या `# %%` cells के साथ `.py`)।
- **pandas** default DataFrame library है। **Polars** जब performance matter करे और user opt in करे। **DuckDB** SQL-on-DataFrames या local file analytics के लिए।
- **Plotly** interactive charts के लिए। **matplotlib + seaborn** जब output static/print/PDF हो।
- User को पता है कि एक DataFrame क्या है, `groupby` क्या करता है, और एक axis क्या है। pandas basics को over-explain न करें।
- Statistical work everyday है: t-tests, chi-square, ANOVA, OLS regression, non-parametric alternatives।
- **Vectorize करें, `apply` न करें।** एक column पर `df.apply(lambda x: ...)` जब एक vectorized op exist करे, वो #1 push back करने वाली चीज़ है।

---

## Mental model

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

ज़्यादातर analyses पहले दो stages में rails से off हो जाते हैं। अगर data dirty है और आप catch नहीं करते, हर downstream conclusion suspect है।

---

## EDA — हर notebook की पहली 30 lines

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

यह क्या catch करता है जो आप otherwise miss करते:

- एक column जो 80% null है और नहीं होनी चाहिए
- एक "price" column refund-encoding bug से negative values के साथ
- "createdAt" timestamps 2099 से क्योंकि किसी ने एक placeholder set किया
- एक bad join upstream से Duplicate rows

हर बार run करें। यह 5 seconds लेता है और एक embarrassing meeting को prevent करता है।

---

## SQL ↔ pandas — side-by-side cheat sheet

| SQL | pandas |
| --- | --- |
| `SELECT col1, col2 FROM df` | `df[["col1", "col2"]]` |
| `WHERE col > 5` | `df[df["col"] > 5]` |
| `WHERE col IN (1,2,3)` | `df[df["col"].isin([1,2,3])]` |
| `WHERE col1 = 5 AND col2 > 10` | `df[(df["col1"] == 5) & (df["col2"] > 10)]` |
| `ORDER BY col DESC` | `df.sort_values("col", ascending=False)` |
| `LIMIT 10` | `df.head(10)` |
| `SELECT DISTINCT col` | `df["col"].drop_duplicates()` or `df["col"].unique()` |
| `COUNT(*)` | `len(df)` or `df.shape[0]` |
| `COUNT(DISTINCT col)` | `df["col"].nunique()` |
| `GROUP BY col` | `df.groupby("col")` |
| `GROUP BY col1, col2` | `df.groupby(["col1", "col2"])` |
| `SUM(x) GROUP BY g` | `df.groupby("g")["x"].sum()` |
| `HAVING SUM(x) > 100` | `df.groupby("g")["x"].sum().loc[lambda s: s > 100]` |
| `JOIN ON a.id = b.id` | `pd.merge(a, b, on="id")` (inner by default) |
| `LEFT JOIN` | `pd.merge(a, b, on="id", how="left")` |
| `UNION ALL` | `pd.concat([a, b])` |
| `CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END` | `np.where(df["x"] > 0, "pos", "neg")` |
| `COALESCE(a, b)` | `df["a"].fillna(df["b"])` |
| `ROW_NUMBER() OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g").cumcount() + 1` |
| `LAG(x, 1) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].shift(1)` |
| `SUM(x) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].cumsum()` |

उन moments के लिए जहाँ SQL pandas equivalent से बहुत cleaner है — DuckDB use करें:

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

DuckDB एक pandas DataFrame को in place query करता है — कोई copying नहीं, एक separate DB में loading नहीं। 100k-100M row DataFrames पर analytics-shaped queries के लिए, यह pandas से faster है और SQL पढ़ने में easier है।

---

## Vectorization rule

**अगर आपने `.apply(lambda x: ...)` लिखा है, पूछें कि एक vectorized version exist करता है या नहीं।** Almost हमेशा करता है।

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

जब `.apply` सही call IS: complex row-wise logic जो multiple columns को touch करता है और vectorized ops या `np.select` के combination के रूप में express नहीं हो सकता। वो rare है।

---

## Statistical-test cookbook

Test को question से pick करें, data shape से नहीं। फिर check करें कि data shape test को support करता है।

| Question | Test | कब |
| --- | --- | --- |
| क्या ये दो groups के means अलग हैं? | Independent-samples t-test | Normal-ish, ~30+ per group |
| ऊपर वाला same, लेकिन non-normal | Mann-Whitney U | Skewed या small samples |
| क्या same group before vs. after बदला? | Paired t-test | Paired observations, normal |
| ऊपर वाला same, non-normal | Wilcoxon signed-rank | Paired, non-normal |
| क्या ये 3+ groups के means अलग हैं? | One-way ANOVA | Normal-ish, equal variances |
| ऊपर वाला same, non-normal | Kruskal-Wallis | Non-normal या unequal variances |
| क्या ये दो categorical variables related हैं? | Chi-square test of independence | Expected counts ≥ 5 per cell |
| ऊपर वाला same small expected counts के साथ | Fisher's exact test | 2×2, small expected counts |
| क्या एक linear relationship है? | Pearson correlation + OLS | Continuous, linear, normal residuals |
| Same लेकिन non-linear या non-normal | Spearman correlation | Monotonic |
| Multiple x's से y predict करें | OLS regression | Continuous y, linear, no multicollinearity |

Code shapes:

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

**हमेशा effect size को p-value के साथ report करें।** 0.001 का p Cohen's d 0.05 के साथ "statistically significant and practically meaningless" है। उस conclusion को बिना कहे ship न करें।

---

## Plot styling — muted palette default

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

Rules:

- कोई 3D कुछ भी नहीं। कभी।
- कोई pie charts नहीं जब तक 2-3 slices न हों और वे 100% sum न हों। एक bar chart use करें।
- Axis labels plain English में, snake_case में नहीं। `"Revenue (USD)"`, `"revenue_usd"` नहीं।
- Bars को value से sort करें, category name से नहीं। Largest top पर।
- Large numbers comma-separate करें। `ax.yaxis.set_major_formatter(lambda x, _: f"{x:,.0f}")`।
- Per visual layer एक color, एक rainbow नहीं। Ordered data के लिए एक sequential palette और unordered के लिए एक categorical palette use करें।
- Title left पर, plain English में। ज़रूरत हो तो title के नीचे एक faded sentence के रूप में Subtitle।

Interactive/web के लिए, same restraint के साथ Plotly use करें:

```python
import plotly.express as px
fig = px.line(df, x="date", y="revenue", color="plan",
              color_discrete_sequence=px.colors.qualitative.Set2)
fig.update_layout(template="simple_white", title="Revenue by plan",
                  xaxis_title=None, yaxis_title="Revenue (USD)")
```

---

## यह kit क्या refuse करता है

- ऐसी किसी भी चीज़ के लिए `.iterrows()` suggest करना जिसे एक से अधिक बार run करना है।
- `.apply()` के लिए reach करना जब एक vectorized op या `np.select` case cover करता है।
- Nulls drop करना user को दिखाए बिना कि क्या drop हुआ और पूछे बिना कि क्या वही चाहते हैं।
- एक regression fit करना और केवल p-values report करना, effect size और residual diagnostics को ignore करना।
- Default matplotlib styling (gray background, dotted grid, blue/orange/green) के साथ एक chart produce करना।
- Check करने से पहले Spark / Dask recommend करना कि क्या एक single node पर DuckDB problem solve करता है।
- pandas `for` loops suggest करना जब एक `agg` या window function काम करेगा।

---

## Companion docs

- `recipes/pandas-duckdb-polars.md` — तीन libraries पर common operations
- `recipes/stats-cookbook.md` — code के साथ t-test, chi-square, ANOVA, regression
- `patterns/sql-to-pandas.md` — deeper SQL ↔ pandas translation, window functions समेत

---

## एक notebook share करने से पहले sanity checklist

- [ ] Top पर EDA block — shape, nulls, dtypes, suspicious values
- [ ] कोई `.apply` नहीं जहाँ vectorization काम करती
- [ ] Numeric outputs formatted (stakeholder-facing tables में कोई `2.3148327e-06` नहीं)
- [ ] Charts muted palette + cleaned axes use करते हैं
- [ ] Stats results में effect size शामिल है, सिर्फ p-values नहीं
- [ ] Null/duplicate handling shown है, silent नहीं
- [ ] Notebook restarts और top-to-bottom बिना errors run होता है
- [ ] Cells 200 lines लंबे नहीं हैं — उन्हें split करें
