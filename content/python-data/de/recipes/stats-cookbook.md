# Statistical-Test-Cookbook

Wähle den Test aus der Frage, verifiziere, dass die Daten-Shape ihn unterstützt, lass ihn laufen, reporte Effect Size neben dem p-Wert. Die Reihenfolge zählt — Analyst-Grade-Arbeit fischt nicht nach Tests, bis einer "signifikant" sagt.

---

## Der Entscheidungsbaum

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

## Imports, die du nutzen wirst

```python
import numpy as np
import pandas as pd
from scipy import stats
import statsmodels.formula.api as smf
import statsmodels.api as sm
```

---

## Independent-Samples t-Test (Welchs)

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

**Interpretations-Faustregeln für Cohens d:**
- |d| < 0,2 — trivial
- 0,2-0,5 — klein
- 0,5-0,8 — mittel
- > 0,8 — groß

**Plain-English-Template**: "Treatment-Nutzer averagten $X mehr pro Nutzer (95% CI: $Y bis $Z; Cohens d = D, {trivial/klein/mittel/groß}). Der Unterschied ist statistisch signifikant (p < 0,05), aber der praktische Effekt ist {trivial/klein/...}."

---

## Mann-Whitney U (non-parametrische Alternative)

Wenn die Daten skewed sind (Revenue, Time-on-Site, alles mit einem Long Tail), nimmt der t-Test Normality an, die du nicht hast. Mann-Whitney vergleicht Ranks, nicht Means.

```python
u_stat, p_value = stats.mannwhitneyu(treat, control, alternative="two-sided")

# Effect size — rank-biserial correlation
n1, n2 = len(treat), len(control)
r = 1 - (2 * u_stat) / (n1 * n2)

print(f"U = {u_stat:.0f}, p = {p_value:.4f}, rank-biserial r = {r:.3f}")
print(f"median_control = {control.median():.2f}, median_treat = {treat.median():.2f}")
```

Reporte **Medians**, nicht Means, wenn du Mann-Whitney nutzt. Das ist die Statistik, auf die der Test sensitiv ist.

---

## Paired t-Test (selbe Subjekte, vorher/nachher)

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

Non-parametrisch: `stats.wilcoxon(after, before)`.

---

## One-Way ANOVA (3+ Gruppen)

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

ANOVA sagt dir "mindestens eine Gruppe unterscheidet sich." Es sagt dir nicht, welche. Post-hoc Tukey HSD tut das:

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd
result = pairwise_tukeyhsd(df["revenue"], df["plan"])
print(result)
```

Non-parametrisch: `stats.kruskal(*groups)` + `scikit_posthocs.posthoc_dunn` für Pairwise.

**Interpretations-Faustregel für eta²:**
- < 0,01 — trivial
- 0,01-0,06 — klein
- 0,06-0,14 — mittel
- > 0,14 — groß

---

## Chi-Square (kategorial vs. kategorial)

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

Für 2×2 mit kleinen erwarteten Counts:
```python
oddsratio, p = stats.fisher_exact(contingency)
```

**Cramérs V**: 0 = keine Assoziation, 1 = perfekt. Für df=1: 0,1 klein, 0,3 mittel, 0,5 groß.

---

## Pearson / Spearman-Correlation

```python
# Pearson — linear, normal
r_p, p_p = stats.pearsonr(df["x"], df["y"])
print(f"Pearson r = {r_p:.3f}, p = {p_p:.4f}")

# Spearman — monotonic, non-linear ok, robust to outliers
r_s, p_s = stats.spearmanr(df["x"], df["y"])
print(f"Spearman ρ = {r_s:.3f}, p = {p_s:.4f}")
```

Plotte die Daten, bevor du eine Correlation reportet. Ein Pearson-r von 0,0 kann eine U-Shape verstecken. Ein Spearman von 0,9 kann einen einzelnen Outlier verstecken, der alles treibt.

---

## OLS-Regression

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

Worauf in der Summary zu schauen:

| Section | Was zu prüfen |
| --- | --- |
| R² / adj R² | Variance erklärt. < 0,1 ist schwach, 0,3-0,6 ist typisch für Behavioral-Daten, > 0,8 ist "hast du versehentlich das Outcome in die Prädiktoren inkludiert?" |
| coef | Der geschätzte Effekt. Richtung und Magnitude zählen, nicht nur Vorzeichen. |
| P>\|t\| | p-Wert pro Koeffizient. Adjustiere, wenn du viele Prädiktoren hast. |
| F-Statistik / Prob (F) | Joint Significance. Wenn das hoch ist, aber individuelle ts niedrig sind, Multikollinearität. |
| Condition Number | > 30 = Multikollinearitäts-Warnung. > 1000 = ernstes Problem. |

**Prüfe immer Residuals.** Ein Model mit R² von 0,7 und einem fan-shaped Residual-Plot ist kaputt.

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

## Logistic Regression (binäres Outcome)

```python
model = smf.logit("converted ~ tenure_days + plan + C(region)", data=df).fit()
print(model.summary())

# Odds ratios — more interpretable than log-odds
print(np.exp(model.params))
print(np.exp(model.conf_int()))
```

**Plain-English-Template**: "Jede zusätzlichen 30 Tage Tenure multiplizieren die Odds der Conversion mit 1,12 (95% CI: 1,07 bis 1,17). Verglichen mit Plan Basic haben Plan-Pro-Nutzer 2,3× die Odds zu konvertieren (95% CI: 1,8 bis 2,9)."

---

## A/B-Test-Sanity-Checks (vor dem Reporten irgendeines Results laufen lassen)

1. **Sample-Size-Balance.** Sind die Arms in der Größe ähnlich? Ein 30/70-Split, wenn du 50/50 erwartet hast, bedeutet einen Randomisierungs-Bug.
2. **Pre-Treatment-Metriken.** Sehen die Arms gleich aus auf Metriken, die sich *nicht* unterscheiden sollten (Signup-Date, Region, Plan)? Falls nicht, ist die Randomisierung kaputt.
3. **Sample-Ratio-Mismatch (SRM)**-Test:
   ```python
   observed = df["arm"].value_counts().sort_index().values
   expected = [df.shape[0] / 2, df.shape[0] / 2]
   chi2, p_srm = stats.chisquare(observed, expected)
   if p_srm < 0.001:
       print(f"SRM detected! p = {p_srm:.6f}. STOP — randomization is broken.")
   ```
4. **Multiple Comparisons.** 10 Metriken getestet? Mindestens eine wird zufällig p < 0,05 haben. Applye Bonferroni (`p × n_tests`) oder Benjamini-Hochberg für FDR.
5. **Power.** War der Test gepowered, um einen meaningful Effekt zu erkennen? Ein "underpowered null" bedeutet nicht "kein Effekt" — es bedeutet "dieser Test konnte ihn nicht sehen."

---

## Was NICHT zu tun

- **Fische nicht nach Tests.** Wenn dein t-Test mit p = 0,06 zurückkam und du auf Mann-Whitney umschaltest, um p = 0,04 zu finden, ist das Cheating. Wähle den Test, bevor du auf die Ergebnisse schaust.
- **Reporte nicht nur p-Werte.** "p < 0,05" ist ein Yes/No. Effect Size ist die Antwort auf "um wie viel?"
- **Vertraue ANOVA nicht, wenn Gruppen wild unbalanced sind.** Nutze ein Model mit Random-Effects oder lass Pairwise-Tests mit angemessener Correction laufen.
- **Applye OLS nicht auf ein binäres Outcome.** Nutze Logistic-Regression.
- **Ignoriere Residuals nicht.** Ein hoher R² mit schrecklichen Residuals ist ein kaputtes Model.
- **Lass keinen Test auf 2.000.000 Zeilen laufen und reporte "p < 0,001" als Beweis von irgendetwas Wichtigem.** Mit genug n ist alles signifikant. Reporte die Effect Size und sage "der Unterschied ist signifikant, aber praktisch bedeutungslos."

---

## Die 3-Zeilen-Report-Shape

Für jeden Test sollte der Takeaway in 3 Zeilen passen:

1. **Was du verglichen hast und wie.** "Verglichen Revenue pro Nutzer zwischen Control (n=12.401) und Treatment (n=12.388) unter Verwendung von Welchs t-Test."
2. **Das Ergebnis mit Effect Size.** "Treatment-Nutzer averagten $3,40 mehr pro Nutzer (95% CI: $2,10 bis $4,70; Cohens d = 0,08, trivial)."
3. **Die Interpretation.** "Statistisch signifikant (p < 0,001), aber der Effekt ist zu klein, um darauf zu reagieren, ohne Implementierungskosten zu berücksichtigen."

Diese dritte Zeile ist, was Stakeholder tatsächlich brauchen.
