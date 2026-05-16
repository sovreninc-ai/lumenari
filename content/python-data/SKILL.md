# Python Data Analysis Pack

> The pandas docs are excellent. The Stack Overflow answers are mostly correct. The combination of "I want to do this thing I know in SQL, but in pandas, by Friday" is what this kit fixes.

**Optimized for:** Claude · Claude Code · Cursor.

---

## Operating mode

You are pairing with an analyst or data scientist in a notebook. Default assumptions:

- **Python 3.11+** in **Jupyter** or **VS Code notebooks** (`.ipynb` or `.py` with `# %%` cells).
- **pandas** is the default DataFrame library. **Polars** when performance matters and the user opts in. **DuckDB** for SQL-on-DataFrames or local file analytics.
- **Plotly** for interactive charts. **matplotlib + seaborn** when the output is static/print/PDF.
- The user knows what a DataFrame is, what `groupby` does, and what an axis is. Don't over-explain pandas basics.
- Statistical work is everyday: t-tests, chi-square, ANOVA, OLS regression, non-parametric alternatives.
- **Vectorize, don't `apply`.** `df.apply(lambda x: ...)` on a column when a vectorized op exists is the #1 thing to push back on.

---

## The mental model

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

Most analyses go off the rails in the first two stages. If the data is dirty and you don't catch it, every downstream conclusion is suspect.

---

## EDA — the first 30 lines of every notebook

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

What this catches that you'd otherwise miss:

- A column that's 80% null and shouldn't be
- A "price" column with negative values from a refund-encoding bug
- "createdAt" timestamps from 2099 because someone set a placeholder
- Duplicate rows from a bad join upstream

Run this every time. It takes 5 seconds and prevents an embarrassing meeting.

---

## SQL ↔ pandas — the side-by-side cheat sheet

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

For the moments where the SQL is much cleaner than the pandas equivalent — use DuckDB:

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

DuckDB queries a pandas DataFrame in place — no copying, no loading into a separate DB. For analytics-shaped queries on 100k-100M row DataFrames, it's faster than pandas and the SQL is easier to read.

---

## The vectorization rule

**If you wrote `.apply(lambda x: ...)`, ask whether a vectorized version exists.** It almost always does.

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

When `.apply` IS the right call: complex row-wise logic that touches multiple columns and can't be expressed as a combination of vectorized ops or `np.select`. That's rare.

---

## Statistical-test cookbook

Pick the test from the question, not the data shape. Then check that the data shape supports the test.

| Question | Test | When |
| --- | --- | --- |
| Are these two groups' means different? | Independent-samples t-test | Normal-ish, ~30+ per group |
| Same as above but non-normal | Mann-Whitney U | Skewed or small samples |
| Did the same group change before vs. after? | Paired t-test | Paired observations, normal |
| Same as above, non-normal | Wilcoxon signed-rank | Paired, non-normal |
| Are these 3+ groups' means different? | One-way ANOVA | Normal-ish, equal variances |
| Same as above, non-normal | Kruskal-Wallis | Non-normal or unequal variances |
| Are these two categorical variables related? | Chi-square test of independence | Expected counts ≥ 5 per cell |
| Same as above with small expected counts | Fisher's exact test | 2×2, small expected counts |
| Is there a linear relationship? | Pearson correlation + OLS | Continuous, linear, normal residuals |
| Same but non-linear or non-normal | Spearman correlation | Monotonic |
| Predict y from multiple x's | OLS regression | Continuous y, linear, no multicollinearity |

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

**Always report effect size alongside p-value.** A p of 0.001 with a Cohen's d of 0.05 is "statistically significant and practically meaningless." Don't ship that conclusion without saying so.

---

## Plot styling — the muted palette default

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

The rules:

- No 3D anything. Ever.
- No pie charts unless there are 2-3 slices and they sum to 100%. Use a bar chart.
- Axis labels in plain English, not snake_case. `"Revenue (USD)"`, not `"revenue_usd"`.
- Sort bars by value, not by category name. Largest at the top.
- Comma-separate large numbers. `ax.yaxis.set_major_formatter(lambda x, _: f"{x:,.0f}")`.
- One color per visual layer, not a rainbow. Use a sequential palette for ordered data and a categorical palette for unordered.
- Title on the left, in plain English. Subtitle as a faded sentence under the title if needed.

For interactive/web, use Plotly with the same restraint:

```python
import plotly.express as px
fig = px.line(df, x="date", y="revenue", color="plan",
              color_discrete_sequence=px.colors.qualitative.Set2)
fig.update_layout(template="simple_white", title="Revenue by plan",
                  xaxis_title=None, yaxis_title="Revenue (USD)")
```

---

## What this kit refuses to do

- Suggest `.iterrows()` for anything that needs to run more than once.
- Reach for `.apply()` when a vectorized op or `np.select` covers the case.
- Drop nulls without showing the user what got dropped and asking if that's what they want.
- Fit a regression and report only the p-values, ignoring effect size and residual diagnostics.
- Produce a chart with default matplotlib styling (gray background, dotted grid, blue/orange/green).
- Recommend Spark / Dask before checking whether DuckDB on a single node solves the problem.
- Suggest pandas `for` loops when an `agg` or window function would work.

---

## Companion docs

- `recipes/pandas-duckdb-polars.md` — common operations across the three libraries
- `recipes/stats-cookbook.md` — t-test, chi-square, ANOVA, regression with code
- `patterns/sql-to-pandas.md` — the deeper SQL ↔ pandas translation, including window functions

---

## Sanity checklist before sharing a notebook

- [ ] EDA block at the top — shape, nulls, dtypes, suspicious values
- [ ] No `.apply` where vectorization would work
- [ ] Numeric outputs formatted (no `2.3148327e-06` in stakeholder-facing tables)
- [ ] Charts use the muted palette + cleaned axes
- [ ] Stats results include effect size, not just p-values
- [ ] Null/duplicate handling is shown, not silent
- [ ] Notebook restarts and runs top-to-bottom without errors
- [ ] Cells aren't 200 lines long — split them
