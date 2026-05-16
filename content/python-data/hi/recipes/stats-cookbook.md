# Statistical-Test Cookbook

Test को question से pick करें, verify करें data shape support करता है, run करें, p-value के साथ effect size report करें। Order matter करता है — analyst-grade work tests के लिए fish नहीं करता जब तक एक "significant" न कहे।

---

## Decision tree

```
What's the question?
│
├── 2 groups के means/medians compare कर रहे हैं
│   ├── Same subjects दो बार measure हुए (before/after)?
│   │   ├── Normal-ish residuals?  → Paired t-test
│   │   └── Skewed या small n?     → Wilcoxon signed-rank
│   └── अलग subjects?
│       ├── Normal-ish, ≥30/group? → Welch's t-test (default)
│       └── Skewed या small n?     → Mann-Whitney U
│
├── 3+ groups के means compare कर रहे हैं
│   ├── Normal-ish, equal variances? → One-way ANOVA + Tukey HSD
│   └── नहीं तो                       → Kruskal-Wallis + Dunn's
│
├── दो categorical variables related?
│   ├── Expected counts ≥5 per cell? → Chi-square independence
│   └── 2×2 small expected के साथ?  → Fisher's exact
│
├── दो continuous के बीच relationship?
│   ├── Linear, normal-ish?  → Pearson + simple OLS
│   └── Monotonic, non-linear → Spearman
│
└── Multiple x's से y predict
    ├── Continuous y, linear?    → OLS regression
    ├── Binary y?                → Logistic regression
    └── Count y?                 → Poisson / Negative binomial
```

---

## Use करने वाले Imports

```python
import numpy as np
import pandas as pd
from scipy import stats
import statsmodels.formula.api as smf
import statsmodels.api as sm
```

---

## Independent-samples t-test (Welch's)

```python
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]

# Welch's (unequal variances) — the default you almost always want
t_stat, p_value = stats.ttest_ind(treat, control, equal_var=False)

# Effect size — Cohen's d
def cohens_d(a, b):
    pooled_sd = np.sqrt((a.std(ddof=1) ** 2 + b.std(ddof=1) ** 2) / 2)
    return (a.mean() - b.mean()) / pooled_sd

d = cohens_d(treat, control)

# 95% CI for the difference in means
diff = treat.mean() - control.mean()
se = np.sqrt(treat.var(ddof=1) / len(treat) + control.var(ddof=1) / len(control))
ci_low, ci_high = diff - 1.96 * se, diff + 1.96 * se

print(f"n_control = {len(control):,}, n_treat = {len(treat):,}")
print(f"mean_control = {control.mean():.2f}, mean_treat = {treat.mean():.2f}")
print(f"diff = {diff:.2f} (95% CI: {ci_low:.2f} to {ci_high:.2f})")
print(f"t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d = {d:.3f}")
```

**Cohen's d के लिए Interpretation rules of thumb:**
- |d| < 0.2 — trivial
- 0.2-0.5 — small
- 0.5-0.8 — medium
- > 0.8 — large

**Plain-English template**: "Treatment users averaged $X more per user (95% CI: $Y to $Z; Cohen's d = D, {trivial/small/medium/large}). The difference is statistically significant (p < 0.05) but the practical effect is {trivial/small/...}."

---

## Mann-Whitney U (non-parametric alternative)

जब data skewed हो (revenue, time-on-site, कोई भी long tail वाला), t-test उस normality assume करता है जो आपके पास नहीं है। Mann-Whitney ranks compare करता है, means नहीं।

```python
u_stat, p_value = stats.mannwhitneyu(treat, control, alternative="two-sided")

# Effect size — rank-biserial correlation
n1, n2 = len(treat), len(control)
r = 1 - (2 * u_stat) / (n1 * n2)

print(f"U = {u_stat:.0f}, p = {p_value:.4f}, rank-biserial r = {r:.3f}")
print(f"median_control = {control.median():.2f}, median_treat = {treat.median():.2f}")
```

Mann-Whitney use करते समय **medians** report करें, means नहीं। यही वो statistic है जिसके लिए test sensitive है।

---

## Paired t-test (same subjects, before/after)

```python
before = df["score_pre"]
after = df["score_post"]

t_stat, p_value = stats.ttest_rel(after, before)

# Cohen's d for paired samples
diffs = after - before
d_paired = diffs.mean() / diffs.std(ddof=1)

print(f"n = {len(diffs):,}")
print(f"mean before = {before.mean():.2f}, mean after = {after.mean():.2f}")
print(f"mean diff = {diffs.mean():.2f}, t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d (paired) = {d_paired:.3f}")
```

Non-parametric: `stats.wilcoxon(after, before)`।

---

## One-way ANOVA (3+ groups)

```python
import scipy.stats as stats

groups = [df.loc[df["plan"] == p, "revenue"] for p in df["plan"].unique()]
f_stat, p_value = stats.f_oneway(*groups)

# Effect size — eta-squared
def eta_squared(groups):
    grand_mean = np.concatenate(groups).mean()
    ss_between = sum(len(g) * (g.mean() - grand_mean) ** 2 for g in groups)
    ss_total = sum(((g - grand_mean) ** 2).sum() for g in groups)
    return ss_between / ss_total

eta2 = eta_squared(groups)
print(f"F = {f_stat:.3f}, p = {p_value:.4f}, eta² = {eta2:.3f}")
```

ANOVA आपको बताता है "कम से कम एक group differ करता है।" यह नहीं बताता कौन सा। Post-hoc Tukey HSD करता है:

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd
result = pairwise_tukeyhsd(df["revenue"], df["plan"])
print(result)
```

Non-parametric: pairwise के लिए `stats.kruskal(*groups)` + `scikit_posthocs.posthoc_dunn`।

**eta² के लिए Interpretation rule of thumb:**
- < 0.01 — trivial
- 0.01-0.06 — small
- 0.06-0.14 — medium
- > 0.14 — large

---

## Chi-square (categorical vs. categorical)

```python
contingency = pd.crosstab(df["channel"], df["converted"])
print(contingency)

chi2, p, dof, expected = stats.chi2_contingency(contingency)

# Effect size — Cramér's V
n = contingency.sum().sum()
min_dim = min(contingency.shape) - 1
cramers_v = np.sqrt(chi2 / (n * min_dim))

print(f"chi² = {chi2:.3f}, dof = {dof}, p = {p:.4f}")
print(f"Cramér's V = {cramers_v:.3f}")

# Check assumption: expected counts ≥ 5 per cell
print(f"min expected count = {expected.min():.1f}")
if expected.min() < 5:
    print("WARNING: expected count < 5 — consider Fisher's exact instead")
```

Small expected counts के साथ 2×2 के लिए:
```python
oddsratio, p = stats.fisher_exact(contingency)
```

**Cramér's V**: 0 = no association, 1 = perfect। df=1 के लिए: 0.1 small, 0.3 medium, 0.5 large।

---

## Pearson / Spearman correlation

```python
# Pearson — linear, normal
r_p, p_p = stats.pearsonr(df["x"], df["y"])
print(f"Pearson r = {r_p:.3f}, p = {p_p:.4f}")

# Spearman — monotonic, non-linear ok, robust to outliers
r_s, p_s = stats.spearmanr(df["x"], df["y"])
print(f"Spearman ρ = {r_s:.3f}, p = {p_s:.4f}")
```

Correlation report करने से पहले data plot करें। Pearson r 0.0 एक U-shape hide कर सकता है। Spearman 0.9 एक single outlier hide कर सकता है जो सब drive कर रहा है।

---

## OLS regression

```python
import statsmodels.formula.api as smf

# Formula syntax: '~' separates outcome from predictors, '+' adds them,
# ':' is interaction, '*' is main effects + interaction, C(...) makes categorical
model = smf.ols("revenue ~ tenure_days + plan + C(region) + tenure_days:plan",
                data=df).fit()

print(model.summary())
print(f"R² = {model.rsquared:.3f}, adj R² = {model.rsquared_adj:.3f}")
print(f"n = {int(model.nobs):,}")
```

Summary में क्या देखें:

| Section | क्या check करें |
| --- | --- |
| R² / adj R² | Variance explained। < 0.1 weak है, 0.3-0.6 behavioral data के लिए typical है, > 0.8 "क्या आपने accidentally outcome को predictors में include किया?" है |
| coef | Estimated effect। Direction और magnitude matter करते हैं, सिर्फ sign नहीं। |
| P>\|t\| | Per coefficient p-value। अगर आपके पास कई predictors हैं तो adjust करें। |
| F-statistic / Prob (F) | Joint significance। अगर यह high है लेकिन individual ts low हैं, multicollinearity है। |
| Condition number | > 30 = multicollinearity warning। > 1000 = serious issue। |

**हमेशा residuals check करें।** 0.7 R² और fan-shaped residual plot वाला एक model broken है।

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

## Logistic regression (binary outcome)

```python
model = smf.logit("converted ~ tenure_days + plan + C(region)", data=df).fit()
print(model.summary())

# Odds ratios — more interpretable than log-odds
print(np.exp(model.params))
print(np.exp(model.conf_int()))
```

**Plain-English template**: "Each additional 30 days of tenure multiplies the odds of conversion by 1.12 (95% CI: 1.07 to 1.17). Compared to plan Basic, plan Pro users have 2.3× the odds of converting (95% CI: 1.8 to 2.9)."

---

## A/B test sanity checks (कोई भी result report करने से पहले run करें)

1. **Sample size balance.** क्या arms size में similar हैं? जब आपने 50/50 expect किया तब 30/70 split का मतलब है एक randomization bug।
2. **Pre-treatment metrics.** क्या arms उन metrics पर same दिखते हैं जो *नहीं* differ होने चाहिए (signup date, region, plan)? अगर नहीं, randomization broken है।
3. **Sample ratio mismatch (SRM)** test:
   ```python
   observed = df["arm"].value_counts().sort_index().values
   expected = [df.shape[0] / 2, df.shape[0] / 2]
   chi2, p_srm = stats.chisquare(observed, expected)
   if p_srm < 0.001:
       print(f"SRM detected! p = {p_srm:.6f}. STOP — randomization is broken.")
   ```
4. **Multiple comparisons.** 10 metrics test कर रहे हैं? कम से कम एक का p < 0.05 by chance होगा। Bonferroni (`p × n_tests`) apply करें या FDR के लिए Benjamini-Hochberg।
5. **Power.** क्या test एक meaningful effect detect करने के लिए powered था? एक "underpowered null" का मतलब "no effect" नहीं है — मतलब "यह test इसे देख नहीं सका।"

---

## क्या NOT करें

- **Tests के लिए Fish न करें।** अगर आपका t-test p = 0.06 आया और आप Mann-Whitney पर switch करके p = 0.04 ढूँढते हैं, वो cheating है। Results देखने से पहले test pick करें।
- **केवल p-values report न करें।** "p < 0.05" एक yes/no है। Effect size "कितना" का answer है।
- **जब groups wildly unbalanced हों तो ANOVA पर trust न करें।** Random effects वाला एक model use करें, या appropriate correction के साथ pairwise tests run करें।
- **एक binary outcome पर OLS apply न करें।** Logistic regression use करें।
- **Residuals ignore न करें।** Terrible residuals वाला एक high R² एक broken model है।
- **2,000,000 rows पर एक test run न करें और "p < 0.001" को कुछ important के proof के रूप में report न करें।** काफी n के साथ, सब कुछ significant है। Effect size report करें और कहें "difference significant है लेकिन practically meaningless है।"

---

## 3-line report shape

किसी भी test के लिए, takeaway 3 lines में fit होना चाहिए:

1. **आपने क्या compare किया और कैसे।** "Compared revenue per user between control (n=12,401) and treatment (n=12,388) using Welch's t-test."
2. **Effect size के साथ result।** "Treatment users averaged $3.40 more per user (95% CI: $2.10 to $4.70; Cohen's d = 0.08, trivial)."
3. **Interpretation.** "Statistically significant (p < 0.001), but the effect is too small to act on without considering implementation cost."

तीसरी line वो है जो stakeholders को actually चाहिए।
