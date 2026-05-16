# 统计检验菜谱

按问题挑检验、确认数据形状支持、运行、报告效应量与 p 值。顺序很重要 —— 分析师不会反复钓鱼直到某个检验报"显著"。

---

## 决策树

```
问题是什么？
│
├── 比较 2 组的均值/中位数
│   ├── 同一对象前后测两次？
│   │   ├── 残差近似正态？     → 配对 t 检验
│   │   └── 偏态或 n 小？       → Wilcoxon signed-rank
│   └── 不同对象？
│       ├── 近似正态、n≥30？    → Welch's t（默认）
│       └── 偏态或 n 小？        → Mann-Whitney U
│
├── 比较 3 组及以上均值
│   ├── 近似正态、方差齐？      → 单因素 ANOVA + Tukey HSD
│   └── 否则                    → Kruskal-Wallis + Dunn's
│
├── 两个分类变量是否相关？
│   ├── 每格期望计数 ≥ 5？      → 卡方独立性
│   └── 2×2 且小期望计数？      → Fisher 精确
│
├── 两个连续变量的关系？
│   ├── 线性、近似正态？        → Pearson + 简单 OLS
│   └── 单调、非线性            → Spearman
│
└── 用多个 x 预测 y
    ├── 连续 y、线性？           → OLS 回归
    ├── 二值 y？                 → 逻辑回归
    └── 计数 y？                 → 泊松 / 负二项
```

---

## 你会用到的 imports

```python
import numpy as np
import pandas as pd
from scipy import stats
import statsmodels.formula.api as smf
import statsmodels.api as sm
```

---

## 独立样本 t 检验（Welch's）

```python
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]

# Welch's（方差不齐） —— 你几乎总应使用的默认
t_stat, p_value = stats.ttest_ind(treat, control, equal_var=False)

# 效应量 —— Cohen's d
def cohens_d(a, b):
    pooled_sd = np.sqrt((a.std(ddof=1) ** 2 + b.std(ddof=1) ** 2) / 2)
    return (a.mean() - b.mean()) / pooled_sd

d = cohens_d(treat, control)

# 均值差的 95% CI
diff = treat.mean() - control.mean()
se = np.sqrt(treat.var(ddof=1) / len(treat) + control.var(ddof=1) / len(control))
ci_low, ci_high = diff - 1.96 * se, diff + 1.96 * se

print(f"n_control = {len(control):,}, n_treat = {len(treat):,}")
print(f"mean_control = {control.mean():.2f}, mean_treat = {treat.mean():.2f}")
print(f"diff = {diff:.2f} (95% CI: {ci_low:.2f} to {ci_high:.2f})")
print(f"t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d = {d:.3f}")
```

**Cohen's d 经验解读：**
- |d| < 0.2 —— 微小
- 0.2-0.5 —— 小
- 0.5-0.8 —— 中
- > 0.8 —— 大

**人话模板**："Treatment 用户人均多 $X（95% CI：$Y 到 $Z；Cohen's d = D，{微小/小/中/大}）。差异在统计上显著（p < 0.05），但实践效果属于 {微小/小/...}。"

---

## Mann-Whitney U（非参数替代）

数据偏态（收入、停留时长、任何长尾分布）时，t 检验所假设的正态性并不成立。Mann-Whitney 比较的是秩，而非均值。

```python
u_stat, p_value = stats.mannwhitneyu(treat, control, alternative="two-sided")

# 效应量 —— rank-biserial correlation
n1, n2 = len(treat), len(control)
r = 1 - (2 * u_stat) / (n1 * n2)

print(f"U = {u_stat:.0f}, p = {p_value:.4f}, rank-biserial r = {r:.3f}")
print(f"median_control = {control.median():.2f}, median_treat = {treat.median():.2f}")
```

使用 Mann-Whitney 时报告**中位数**，而非均值。那是该检验敏感的统计量。

---

## 配对 t 检验（同一对象，前/后）

```python
before = df["score_pre"]
after = df["score_post"]

t_stat, p_value = stats.ttest_rel(after, before)

# 配对样本的 Cohen's d
diffs = after - before
d_paired = diffs.mean() / diffs.std(ddof=1)

print(f"n = {len(diffs):,}")
print(f"mean before = {before.mean():.2f}, mean after = {after.mean():.2f}")
print(f"mean diff = {diffs.mean():.2f}, t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d (paired) = {d_paired:.3f}")
```

非参数：`stats.wilcoxon(after, before)`。

---

## 单因素 ANOVA（3 组及以上）

```python
import scipy.stats as stats

groups = [df.loc[df["plan"] == p, "revenue"] for p in df["plan"].unique()]
f_stat, p_value = stats.f_oneway(*groups)

# 效应量 —— eta-squared
def eta_squared(groups):
    grand_mean = np.concatenate(groups).mean()
    ss_between = sum(len(g) * (g.mean() - grand_mean) ** 2 for g in groups)
    ss_total = sum(((g - grand_mean) ** 2).sum() for g in groups)
    return ss_between / ss_total

eta2 = eta_squared(groups)
print(f"F = {f_stat:.3f}, p = {p_value:.4f}, eta² = {eta2:.3f}")
```

ANOVA 告诉你"至少有一组不同"，不告诉你是哪组。事后 Tukey HSD 可以：

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd
result = pairwise_tukeyhsd(df["revenue"], df["plan"])
print(result)
```

非参数：`stats.kruskal(*groups)` + 用 `scikit_posthocs.posthoc_dunn` 做两两对比。

**eta² 经验解读：**
- < 0.01 —— 微小
- 0.01-0.06 —— 小
- 0.06-0.14 —— 中
- > 0.14 —— 大

---

## 卡方（类别 vs. 类别）

```python
contingency = pd.crosstab(df["channel"], df["converted"])
print(contingency)

chi2, p, dof, expected = stats.chi2_contingency(contingency)

# 效应量 —— Cramér's V
n = contingency.sum().sum()
min_dim = min(contingency.shape) - 1
cramers_v = np.sqrt(chi2 / (n * min_dim))

print(f"chi² = {chi2:.3f}, dof = {dof}, p = {p:.4f}")
print(f"Cramér's V = {cramers_v:.3f}")

# 检查假设：每格期望计数 ≥ 5
print(f"min expected count = {expected.min():.1f}")
if expected.min() < 5:
    print("WARNING: expected count < 5 — consider Fisher's exact instead")
```

2×2 且期望计数较小：
```python
oddsratio, p = stats.fisher_exact(contingency)
```

**Cramér's V**：0 = 无关联，1 = 完美关联。df=1 时：0.1 小、0.3 中、0.5 大。

---

## Pearson / Spearman 相关

```python
# Pearson —— 线性、正态
r_p, p_p = stats.pearsonr(df["x"], df["y"])
print(f"Pearson r = {r_p:.3f}, p = {p_p:.4f}")

# Spearman —— 单调、可非线性、对异常值更稳健
r_s, p_s = stats.spearmanr(df["x"], df["y"])
print(f"Spearman ρ = {r_s:.3f}, p = {p_s:.4f}")
```

报告相关之前先画图。Pearson r=0.0 可能藏着 U 形；Spearman 0.9 可能只是单个异常值在拉。

---

## OLS 回归

```python
import statsmodels.formula.api as smf

# 公式语法：'~' 分隔被解释变量与解释变量；'+' 加项；
# ':' 仅交互；'*' 主效应 + 交互；C(...) 显式分类
model = smf.ols("revenue ~ tenure_days + plan + C(region) + tenure_days:plan",
                data=df).fit()

print(model.summary())
print(f"R² = {model.rsquared:.3f}, adj R² = {model.rsquared_adj:.3f}")
print(f"n = {int(model.nobs):,}")
```

summary 里要看的：

| 部分 | 关注 |
| --- | --- |
| R² / adj R² | 解释的方差比例。< 0.1 弱、0.3-0.6 行为数据较常见、> 0.8 "是不是把被解释变量混进解释变量了？" |
| coef | 估计的效应。方向和量级都重要，不只是符号。 |
| P>\|t\| | 每个系数的 p 值。多解释变量时考虑校正。 |
| F-statistic / Prob (F) | 联合显著性。若整体高但单个 t 都低，可能共线。 |
| Condition number | > 30 共线性警示。> 1000 严重问题。 |

**始终检查残差。** R²=0.7 但残差呈漏斗形是坏模型。

```python
import matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].scatter(model.fittedvalues, model.resid, alpha=0.4)
axes[0].axhline(0, color="black", linewidth=0.5)
axes[0].set(xlabel="Fitted", ylabel="Residuals", title="Residuals vs. fitted")
stats.probplot(model.resid, plot=axes[1])
axes[1].set_title("Q-Q plot of residuals")
plt.tight_layout()
```

---

## 逻辑回归（二值结果）

```python
model = smf.logit("converted ~ tenure_days + plan + C(region)", data=df).fit()
print(model.summary())

# Odds ratio —— 比 log-odds 更易解读
print(np.exp(model.params))
print(np.exp(model.conf_int()))
```

**人话模板**："每增加 30 天的 tenure，转化的 odds 乘以 1.12（95% CI：1.07 到 1.17）。与 Basic 计划相比，Pro 计划用户转化的 odds 是 2.3 倍（95% CI：1.8 到 2.9）。"

---

## A/B 测试的健全性检查（出结果前先跑）

1. **样本量平衡。** 两臂数量是否相近？预期 50/50 却出现 30/70，可能是分流 bug。
2. **预处理指标。** 在不应有差异的指标（注册日期、地区、计划）上两臂看起来一样吗？不一样就是分流坏了。
3. **样本比失衡（SRM）检验**：
   ```python
   observed = df["arm"].value_counts().sort_index().values
   expected = [df.shape[0] / 2, df.shape[0] / 2]
   chi2, p_srm = stats.chisquare(observed, expected)
   if p_srm < 0.001:
       print(f"SRM detected! p = {p_srm:.6f}. STOP — randomization is broken.")
   ```
4. **多重比较。** 看 10 个指标？至少 1 个会因偶然 p < 0.05。用 Bonferroni（`p × n_tests`）或 Benjamini-Hochberg 控 FDR。
5. **检验功效。** 该检验有足够功效检出有意义的效应吗？"功效不足的零结果"不等于"没有效应" —— 而是"该检验没看到"。

---

## 不要做的事

- **不要反复钓检验。** t 检验出 p=0.06 就换 Mann-Whitney 钓到 0.04 是作弊。请在看结果前就选好检验。
- **不要只报 p 值。** "p < 0.05" 是 yes/no。效应量回答 "差多少"。
- **样本严重失衡时不要轻信 ANOVA。** 用含随机效应的模型，或做两两检验并做合适校正。
- **不要把二值结果当连续做 OLS。** 用逻辑回归。
- **不要忽略残差。** 高 R² 配差残差 = 坏模型。
- **不要在 2,000,000 行上报 "p < 0.001" 来证明什么重要的事。** n 足够大时一切都"显著"。报告效应量，并说"差异显著但实践无意义"。

---

## 三行报告形态

任何检验，结论都应当装进三行：

1. **你比较了什么、怎么比的。** "用 Welch's t 检验比较 control（n=12,401）与 treatment（n=12,388）的人均收入。"
2. **结果及效应量。** "Treatment 用户人均多 $3.40（95% CI：$2.10 到 $4.70；Cohen's d = 0.08，微小）。"
3. **解读。** "统计上显著（p < 0.001），但效应太小，要先评估实施成本再决定是否采纳。"

第三行才是利益相关者真正需要的。
