# Python 数据分析套件

> pandas 文档已经很好，Stack Overflow 答案大体正确。本套件要解决的是"我知道这件事在 SQL 里怎么做，但要在周五之前用 pandas 完成"的组合问题。

**适配工具：** Claude · Claude Code · Cursor。

---

## 工作模式

你正在与一位分析师或数据科学家在 notebook 里协作。默认假设：

- **Python 3.11+**，**Jupyter** 或 **VS Code notebook**（`.ipynb` 或带 `# %%` 单元的 `.py`）。
- 默认用 **pandas**；性能关键且用户启用时用 **Polars**；做 SQL-on-DataFrames 或本地文件分析时用 **DuckDB**。
- 交互图表用 **Plotly**；静态 / 打印 / PDF 输出用 **matplotlib + seaborn**。
- 用户已经懂 DataFrame、`groupby`、axis。不要过度解释 pandas 基础。
- 统计是日常活：t 检验、卡方、ANOVA、OLS 回归、非参数替代。
- **向量化，不要 `.apply`。** 对一列调用 `df.apply(lambda x: ...)` 但其实有向量化操作可用，是最该被拒绝的第一种写法。

---

## 心智模型

```
[ 原始数据 — CSV、Parquet、DB、API ]
            │
            ▼
[ 载入 DataFrame ] ────► [ EDA：形状、空值、dtype、分布 ]
            │                              │
            ▼                              ▼
[ 清洗：dtype、缺失、重复 ]   [ 判断：继续 pandas / 改用 DuckDB ]
            │
            ▼
[ 变换：groupby / merge / window ]
            │
            ▼
[ 分析：统计 / 回归 / 分群 ]
            │
            ▼
[ 沟通：Plotly / seaborn / 表格 ]
```

多数分析会在前两个阶段出岔子。如果数据脏了你没发现，后面每一条结论都值得怀疑。

---

## EDA —— 每个 notebook 头 30 行

```python
import pandas as pd
import numpy as np

df = pd.read_parquet("events.parquet")

# 形状 + dtype
print(df.shape)
print(df.dtypes)

# 每列空值率
nulls = df.isna().mean().sort_values(ascending=False)
print(nulls[nulls > 0])

# 数值分布
print(df.describe(include=[np.number]).T)

# 类别分布（每列前 10）
for col in df.select_dtypes(include="object").columns:
    print(f"\n{col} — {df[col].nunique()} unique")
    print(df[col].value_counts().head(10))

# 日期范围
date_cols = df.select_dtypes(include="datetime64[ns]").columns
for col in date_cols:
    print(f"{col}: {df[col].min()} → {df[col].max()}")

# 可疑值
print("Zero rows:", (df == 0).sum().sort_values(ascending=False).head())
print("Negative numerics:", (df.select_dtypes(include=np.number) < 0).sum())
print("Future dates:", {col: (df[col] > pd.Timestamp.now()).sum() for col in date_cols})

# 重复
print("Total duplicates:", df.duplicated().sum())
```

这能抓到的，你否则会错过的问题：

- 一列 80% 是空，本不该如此
- "price" 列因退款编码 bug 出现负值
- "createdAt" 时间戳因占位写成了 2099 年
- 上游 join 出错带来的重复行

每次都跑。耗时 5 秒，省一场尴尬的会议。

---

## SQL ↔ pandas —— 并排速查

| SQL | pandas |
| --- | --- |
| `SELECT col1, col2 FROM df` | `df[["col1", "col2"]]` |
| `WHERE col > 5` | `df[df["col"] > 5]` |
| `WHERE col IN (1,2,3)` | `df[df["col"].isin([1,2,3])]` |
| `WHERE col1 = 5 AND col2 > 10` | `df[(df["col1"] == 5) & (df["col2"] > 10)]` |
| `ORDER BY col DESC` | `df.sort_values("col", ascending=False)` |
| `LIMIT 10` | `df.head(10)` |
| `SELECT DISTINCT col` | `df["col"].drop_duplicates()` 或 `df["col"].unique()` |
| `COUNT(*)` | `len(df)` 或 `df.shape[0]` |
| `COUNT(DISTINCT col)` | `df["col"].nunique()` |
| `GROUP BY col` | `df.groupby("col")` |
| `GROUP BY col1, col2` | `df.groupby(["col1", "col2"])` |
| `SUM(x) GROUP BY g` | `df.groupby("g")["x"].sum()` |
| `HAVING SUM(x) > 100` | `df.groupby("g")["x"].sum().loc[lambda s: s > 100]` |
| `JOIN ON a.id = b.id` | `pd.merge(a, b, on="id")`（默认 inner） |
| `LEFT JOIN` | `pd.merge(a, b, on="id", how="left")` |
| `UNION ALL` | `pd.concat([a, b])` |
| `CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END` | `np.where(df["x"] > 0, "pos", "neg")` |
| `COALESCE(a, b)` | `df["a"].fillna(df["b"])` |
| `ROW_NUMBER() OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g").cumcount() + 1` |
| `LAG(x, 1) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].shift(1)` |
| `SUM(x) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].cumsum()` |

当 SQL 明显比对应 pandas 更干净时 —— 用 DuckDB：

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

DuckDB 直接就地查询 pandas DataFrame —— 不复制、不需要单独的 DB。对 10 万到 1 亿行的分析型查询，比 pandas 更快，SQL 也更易读。

---

## 向量化原则

**如果你写了 `.apply(lambda x: ...)`，先问有没有向量化版本。** 通常都有。

```python
# 差 —— 行数超过 1 万就慢
df["full_name"] = df.apply(lambda r: f"{r['first']} {r['last']}", axis=1)

# 好
df["full_name"] = df["first"] + " " + df["last"]
```

```python
# 差
df["category"] = df["amount"].apply(lambda x: "high" if x > 100 else "low")

# 好
df["category"] = np.where(df["amount"] > 100, "high", "low")

# 3 个及以上桶
df["bucket"] = pd.cut(df["amount"],
                      bins=[-np.inf, 0, 50, 200, np.inf],
                      labels=["refund", "small", "medium", "large"])
```

```python
# 差
df["domain"] = df["email"].apply(lambda x: x.split("@")[1] if pd.notna(x) else None)

# 好
df["domain"] = df["email"].str.split("@", n=1).str[1]
```

何时该用 `.apply`：当你需要处理多个列的复杂行级逻辑，且无法用向量化或 `np.select` 组合表达时。这种情况少见。

---

## 统计检验菜谱

按问题挑检验，而不是按数据形状挑。再检查数据是否支持该检验。

| 问题 | 检验 | 何时 |
| --- | --- | --- |
| 两组的均值是否不同？ | 独立样本 t 检验 | 近似正态、每组约 30+ |
| 同上但非正态 | Mann-Whitney U | 偏态或小样本 |
| 同一组前后是否变化？ | 配对 t 检验 | 配对观测、正态 |
| 同上、非正态 | Wilcoxon signed-rank | 配对、非正态 |
| 3 组及以上的均值是否不同？ | 单因素 ANOVA | 近似正态、方差齐 |
| 同上、非正态 | Kruskal-Wallis | 非正态或方差不齐 |
| 两个分类变量是否相关？ | 卡方独立性 | 每格期望 ≥ 5 |
| 同上但期望计数较小 | Fisher 精确 | 2×2、小期望 |
| 是否存在线性关系？ | Pearson + OLS | 连续、线性、残差正态 |
| 同上但非线性或非正态 | Spearman | 单调 |
| 用多 x 预测 y | OLS 回归 | 连续 y、线性、无严重共线性 |

代码形态：

```python
from scipy import stats
import statsmodels.formula.api as smf

# 独立 t 检验
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]
t, p = stats.ttest_ind(control, treat, equal_var=False)  # 默认 Welch's
print(f"t={t:.3f}, p={p:.4f}, control mean={control.mean():.2f}, treat mean={treat.mean():.2f}")

# 效应量（Cohen's d）
def cohens_d(a, b):
    pooled = np.sqrt(((a.std() ** 2 + b.std() ** 2) / 2))
    return (a.mean() - b.mean()) / pooled
print(f"Cohen's d = {cohens_d(treat, control):.3f}")

# 卡方
table = pd.crosstab(df["channel"], df["converted"])
chi2, p, dof, expected = stats.chi2_contingency(table)

# 用 statsmodels 做 OLS
model = smf.ols("revenue ~ tenure_days + plan + region", data=df).fit()
print(model.summary())
```

**始终连同效应量一起报告 p 值。** p=0.001 但 Cohen's d=0.05 是"统计显著但实践无意义"。这种结论不要直接交付，至少要说明。

---

## 图表样式 —— 默认 muted 色板

```python
import matplotlib.pyplot as plt
import seaborn as sns

# 在 notebook 顶部一次性应用
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

规则：

- 永远不要 3D。
- 除非 2-3 块加起来等于 100%，否则不要饼图。用条形图。
- 轴标签用人话，不用 snake_case。`"Revenue (USD)"`，而不是 `"revenue_usd"`。
- 条形按值排序，不按名字。最大的在最上。
- 大数字用千分位逗号。`ax.yaxis.set_major_formatter(lambda x, _: f"{x:,.0f}")`。
- 同一可视层用一种颜色，不要彩虹。有序数据用 sequential 色板，无序用 categorical。
- 标题靠左，用人话。需要时在标题下加一行淡色副标题。

交互/网页端用 Plotly，同样的克制：

```python
import plotly.express as px
fig = px.line(df, x="date", y="revenue", color="plan",
              color_discrete_sequence=px.colors.qualitative.Set2)
fig.update_layout(template="simple_white", title="Revenue by plan",
                  xaxis_title=None, yaxis_title="Revenue (USD)")
```

---

## 本套件会拒绝的事

- 对会运行多于一次的逻辑建议 `.iterrows()`。
- 在向量化或 `np.select` 能解决的场景里上 `.apply()`。
- 在不向用户展示被丢了什么的情况下静默 drop 空值。
- 拟合回归后只报告 p 值，忽略效应量与残差诊断。
- 用默认 matplotlib 样式（灰底、虚线网格、蓝/橙/绿）出图。
- 在没确认 DuckDB 单机能否解决的情况下推荐 Spark / Dask。
- 在 `agg` 或窗口函数能解决的场景里建议 pandas `for` 循环。

---

## 配套文档

- `recipes/pandas-duckdb-polars.md` — 三个库下的常见操作
- `recipes/stats-cookbook.md` — t 检验、卡方、ANOVA、回归代码
- `patterns/sql-to-pandas.md` — 更深入的 SQL ↔ pandas 翻译，含窗口函数

---

## 分享 notebook 前的健全性清单

- [ ] 顶部有 EDA 块 —— 形状、空值、dtype、可疑值
- [ ] 没有在向量化可行处使用 `.apply`
- [ ] 数值已格式化（面向利益相关者的表格中没有 `2.3148327e-06`）
- [ ] 图表使用 muted 色板 + 清理后的坐标轴
- [ ] 统计结果含效应量，而不仅 p 值
- [ ] 空值/重复处理是显式的，不是静默
- [ ] Notebook 重启后能从上到下跑通
- [ ] 单元格不长达 200 行 —— 拆开
