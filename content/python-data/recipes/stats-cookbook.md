# Statistical-Test Cookbook

Pick the test from the question, verify the data shape supports it, run it, report effect size alongside p-value. The order matters — analyst-grade work doesn't fish for tests until one says "significant."

---

## The decision tree

```
What's the question?
│
├── Comparing means/medians of 2 groups
│   ├── Same subjects measured twice (before/after)?
│   │   ├── Normal-ish residuals?  → Paired t-test
│   │   └── Skewed or small n?     → Wilcoxon signed-rank
│   └── Different subjects?
│       ├── Normal-ish, ≥30/group? → Welch's t-test (default)
│       └── Skewed or small n?     → Mann-Whitney U
│
├── Comparing means of 3+ groups
│   ├── Normal-ish, equal variances? → One-way ANOVA + Tukey HSD
│   └── Otherwise                    → Kruskal-Wallis + Dunn's
│
├── Two categorical variables related?
│   ├── Expected counts ≥5 per cell? → Chi-square independence
│   └── 2×2 with small expected?     → Fisher's exact
│
├── Relationship between two continuous?
│   ├── Linear, normal-ish?  → Pearson + simple OLS
│   └── Monotonic, non-linear → Spearman
│
└── Predicting y from multiple x's
    ├── Continuous y, linear?    → OLS regression
    ├── Binary y?                → Logistic regression
    └── Count y?                 → Poisson / Negative binomial
```

---

## Imports you'll use

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

**Interpretation rules of thumb for Cohen's d:**
- |d| < 0.2 — trivial
- 0.2-0.5 — small
- 0.5-0.8 — medium
- > 0.8 — large

**Plain-English template**: "Treatment users averaged $X more per user (95% CI: $Y to $Z; Cohen's d = D, {trivial/small/medium/large}). The difference is statistically significant (p < 0.05) but the practical effect is {trivial/small/...}."

---

## Mann-Whitney U (non-parametric alternative)

When the data is skewed (revenue, time-on-site, anything with a long tail), the t-test assumes normality you don't have. Mann-Whitney compares ranks, not means.

```python
u_stat, p_value = stats.mannwhitneyu(treat, control, alternative="two-sided")

# Effect size — rank-biserial correlation
n1, n2 = len(treat), len(control)
r = 1 - (2 * u_stat) / (n1 * n2)

print(f"U = {u_stat:.0f}, p = {p_value:.4f}, rank-biserial r = {r:.3f}")
print(f"median_control = {control.median():.2f}, median_treat = {treat.median():.2f}")
```

Report **medians**, not means, when using Mann-Whitney. That's the statistic the test is sensitive to.

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

Non-parametric: `stats.wilcoxon(after, before)`.

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

ANOVA tells you "at least one group differs." It doesn't tell you which. Post-hoc Tukey HSD does:

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd
result = pairwise_tukeyhsd(df["revenue"], df["plan"])
print(result)
```

Non-parametric: `stats.kruskal(*groups)` + `scikit_posthocs.posthoc_dunn` for pairwise.

**Interpretation rule of thumb for eta²:**
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

For 2×2 with small expected counts:
```python
oddsratio, p = stats.fisher_exact(contingency)
```

**Cramér's V**: 0 = no association, 1 = perfect. For df=1: 0.1 small, 0.3 medium, 0.5 large.

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

Plot the data before reporting a correlation. A Pearson r of 0.0 can hide a U-shape. A Spearman of 0.9 can hide a single outlier driving everything.

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

What to look at in the summary:

| Section | What to check |
| --- | --- |
| R² / adj R² | Variance explained. < 0.1 is weak, 0.3-0.6 is typical for behavioral data, > 0.8 is "did you accidentally include the outcome in the predictors?" |
| coef | The estimated effect. Direction and magnitude matter, not just sign. |
| P>\|t\| | p-value per coefficient. Adjust if you have many predictors. |
| F-statistic / Prob (F) | Joint significance. If this is high but individual ts are low, multicollinearity. |
| Condition number | > 30 = multicollinearity warning. > 1000 = serious issue. |

**Always check residuals.** A model with R² of 0.7 and a fan-shaped residual plot is broken.

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

## A/B test sanity checks (run before reporting any result)

1. **Sample size balance.** Are the arms similar in size? A 30/70 split when you expected 50/50 means a randomization bug.
2. **Pre-treatment metrics.** Do the arms look the same on metrics that *shouldn't* differ (signup date, region, plan)? If not, the randomization is broken.
3. **Sample ratio mismatch (SRM)** test:
   ```python
   observed = df["arm"].value_counts().sort_index().values
   expected = [df.shape[0] / 2, df.shape[0] / 2]
   chi2, p_srm = stats.chisquare(observed, expected)
   if p_srm < 0.001:
       print(f"SRM detected! p = {p_srm:.6f}. STOP — randomization is broken.")
   ```
4. **Multiple comparisons.** Testing 10 metrics? At least one will have p < 0.05 by chance. Apply Bonferroni (`p × n_tests`) or Benjamini-Hochberg for FDR.
5. **Power.** Was the test powered to detect a meaningful effect? An "underpowered null" doesn't mean "no effect" — it means "this test couldn't see it."

---

## What NOT to do

- **Don't fish for tests.** If your t-test came back p = 0.06 and you switch to Mann-Whitney to find p = 0.04, that's cheating. Pick the test before looking at the results.
- **Don't report only p-values.** "p < 0.05" is a yes/no. Effect size is the answer to "by how much?"
- **Don't trust ANOVA when groups are wildly unbalanced.** Use a model with random effects, or run pairwise tests with appropriate correction.
- **Don't apply OLS to a binary outcome.** Use logistic regression.
- **Don't ignore residuals.** A high R² with terrible residuals is a broken model.
- **Don't run a test on 2,000,000 rows and report "p < 0.001" as proof of anything important.** With enough n, everything is significant. Report the effect size and say "the difference is significant but practically meaningless."

---

## The 3-line report shape

For any test, the takeaway should fit in 3 lines:

1. **What you compared and how.** "Compared revenue per user between control (n=12,401) and treatment (n=12,388) using Welch's t-test."
2. **The result with effect size.** "Treatment users averaged $3.40 more per user (95% CI: $2.10 to $4.70; Cohen's d = 0.08, trivial)."
3. **The interpretation.** "Statistically significant (p < 0.001), but the effect is too small to act on without considering implementation cost."

That third line is what stakeholders actually need.
