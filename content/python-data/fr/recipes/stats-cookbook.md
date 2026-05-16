# Cookbook de tests statistiques

Choisissez le test à partir de la question, vérifiez que la forme des données le supporte, exécutez-le, reportez la taille d'effet à côté de la p-value. L'ordre compte — le travail digne d'un analyste ne pêche pas un test jusqu'à ce que l'un dise « significatif ».

---

## L'arbre de décision

```
Quelle est la question ?
│
├── Comparer moyennes/médianes de 2 groupes
│   ├── Mêmes sujets mesurés deux fois (avant/après) ?
│   │   ├── Résidus normal-ish ?  → t-test apparié
│   │   └── Asymétrique ou petit n ?   → Wilcoxon signed-rank
│   └── Sujets différents ?
│       ├── Normal-ish, ≥30/groupe ? → t-test de Welch (par défaut)
│       └── Asymétrique ou petit n ?  → Mann-Whitney U
│
├── Comparer moyennes de 3+ groupes
│   ├── Normal-ish, variances égales ? → ANOVA one-way + Tukey HSD
│   └── Sinon                          → Kruskal-Wallis + Dunn
│
├── Deux variables catégorielles liées ?
│   ├── Effectifs attendus ≥5 par cellule ? → Chi-square d'indépendance
│   └── 2×2 avec petits effectifs attendus ? → Fisher exact
│
├── Relation entre deux continues ?
│   ├── Linéaire, normal-ish ? → Pearson + OLS simple
│   └── Monotone, non-linéaire → Spearman
│
└── Prédire y à partir de plusieurs x
    ├── y continu, linéaire ?    → Régression OLS
    ├── y binaire ?              → Régression logistique
    └── y de comptage ?          → Poisson / Negative binomial
```

---

## Imports que vous utiliserez

```python
import numpy as np
import pandas as pd
from scipy import stats
import statsmodels.formula.api as smf
import statsmodels.api as sm
```

---

## t-test à échantillons indépendants (Welch)

```python
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]

# Welch (variances inégales) — la valeur par défaut que vous voulez presque toujours
t_stat, p_value = stats.ttest_ind(treat, control, equal_var=False)

# Taille d'effet — Cohen's d
def cohens_d(a, b):
    pooled_sd = np.sqrt((a.std(ddof=1) ** 2 + b.std(ddof=1) ** 2) / 2)
    return (a.mean() - b.mean()) / pooled_sd

d = cohens_d(treat, control)

# IC à 95 % pour la différence de moyennes
diff = treat.mean() - control.mean()
se = np.sqrt(treat.var(ddof=1) / len(treat) + control.var(ddof=1) / len(control))
ci_low, ci_high = diff - 1.96 * se, diff + 1.96 * se

print(f"n_control = {len(control):,}, n_treat = {len(treat):,}")
print(f"mean_control = {control.mean():.2f}, mean_treat = {treat.mean():.2f}")
print(f"diff = {diff:.2f} (95% CI: {ci_low:.2f} to {ci_high:.2f})")
print(f"t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d = {d:.3f}")
```

**Règles de pouce d'interprétation pour Cohen's d :**
- |d| < 0,2 — trivial
- 0,2-0,5 — petit
- 0,5-0,8 — moyen
- > 0,8 — grand

**Modèle de phrase en langue simple** : « Les utilisateurs du traitement ont en moyenne X $ de plus par utilisateur (IC 95 % : Y $ à Z $ ; Cohen's d = D, {trivial/petit/moyen/grand}). La différence est statistiquement significative (p < 0,05) mais l'effet pratique est {trivial/petit/…}. »

---

## Mann-Whitney U (alternative non paramétrique)

Quand les données sont asymétriques (revenu, temps passé sur le site, tout ce qui a une longue queue), le t-test suppose une normalité que vous n'avez pas. Mann-Whitney compare des rangs, pas des moyennes.

```python
u_stat, p_value = stats.mannwhitneyu(treat, control, alternative="two-sided")

# Taille d'effet — corrélation rank-biserial
n1, n2 = len(treat), len(control)
r = 1 - (2 * u_stat) / (n1 * n2)

print(f"U = {u_stat:.0f}, p = {p_value:.4f}, rank-biserial r = {r:.3f}")
print(f"median_control = {control.median():.2f}, median_treat = {treat.median():.2f}")
```

Reportez les **médianes**, pas les moyennes, quand vous utilisez Mann-Whitney. C'est la statistique à laquelle le test est sensible.

---

## t-test apparié (mêmes sujets, avant/après)

```python
before = df["score_pre"]
after = df["score_post"]

t_stat, p_value = stats.ttest_rel(after, before)

# Cohen's d pour échantillons appariés
diffs = after - before
d_paired = diffs.mean() / diffs.std(ddof=1)

print(f"n = {len(diffs):,}")
print(f"mean before = {before.mean():.2f}, mean after = {after.mean():.2f}")
print(f"mean diff = {diffs.mean():.2f}, t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d (paired) = {d_paired:.3f}")
```

Non paramétrique : `stats.wilcoxon(after, before)`.

---

## ANOVA one-way (3+ groupes)

```python
import scipy.stats as stats

groups = [df.loc[df["plan"] == p, "revenue"] for p in df["plan"].unique()]
f_stat, p_value = stats.f_oneway(*groups)

# Taille d'effet — eta carré
def eta_squared(groups):
    grand_mean = np.concatenate(groups).mean()
    ss_between = sum(len(g) * (g.mean() - grand_mean) ** 2 for g in groups)
    ss_total = sum(((g - grand_mean) ** 2).sum() for g in groups)
    return ss_between / ss_total

eta2 = eta_squared(groups)
print(f"F = {f_stat:.3f}, p = {p_value:.4f}, eta² = {eta2:.3f}")
```

ANOVA vous dit « au moins un groupe diffère ». Elle ne vous dit pas lequel. Le post-hoc Tukey HSD oui :

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd
result = pairwise_tukeyhsd(df["revenue"], df["plan"])
print(result)
```

Non paramétrique : `stats.kruskal(*groups)` + `scikit_posthocs.posthoc_dunn` pour les comparaisons par paires.

**Règle de pouce d'interprétation pour eta² :**
- < 0,01 — trivial
- 0,01-0,06 — petit
- 0,06-0,14 — moyen
- > 0,14 — grand

---

## Chi-square (catégorielle vs catégorielle)

```python
contingency = pd.crosstab(df["channel"], df["converted"])
print(contingency)

chi2, p, dof, expected = stats.chi2_contingency(contingency)

# Taille d'effet — V de Cramér
n = contingency.sum().sum()
min_dim = min(contingency.shape) - 1
cramers_v = np.sqrt(chi2 / (n * min_dim))

print(f"chi² = {chi2:.3f}, dof = {dof}, p = {p:.4f}")
print(f"Cramér's V = {cramers_v:.3f}")

# Vérifier l'hypothèse : effectifs attendus ≥ 5 par cellule
print(f"min expected count = {expected.min():.1f}")
if expected.min() < 5:
    print("WARNING: expected count < 5 — consider Fisher's exact instead")
```

Pour 2×2 avec petits effectifs attendus :
```python
oddsratio, p = stats.fisher_exact(contingency)
```

**V de Cramér** : 0 = pas d'association, 1 = parfaite. Pour df=1 : 0,1 petit, 0,3 moyen, 0,5 grand.

---

## Corrélation Pearson / Spearman

```python
# Pearson — linéaire, normal
r_p, p_p = stats.pearsonr(df["x"], df["y"])
print(f"Pearson r = {r_p:.3f}, p = {p_p:.4f}")

# Spearman — monotone, non-linéaire OK, robuste aux outliers
r_s, p_s = stats.spearmanr(df["x"], df["y"])
print(f"Spearman ρ = {r_s:.3f}, p = {p_s:.4f}")
```

Tracez les données avant de reporter une corrélation. Un Pearson r de 0,0 peut cacher une forme en U. Un Spearman de 0,9 peut cacher un seul outlier qui pilote tout.

---

## Régression OLS

```python
import statsmodels.formula.api as smf

# Syntaxe formule : '~' sépare l'outcome des prédicteurs, '+' les ajoute,
# ':' c'est l'interaction, '*' c'est effets principaux + interaction, C(...) rend catégoriel
model = smf.ols("revenue ~ tenure_days + plan + C(region) + tenure_days:plan",
                data=df).fit()

print(model.summary())
print(f"R² = {model.rsquared:.3f}, adj R² = {model.rsquared_adj:.3f}")
print(f"n = {int(model.nobs):,}")
```

Ce qu'il faut regarder dans le summary :

| Section | Quoi vérifier |
| --- | --- |
| R² / adj R² | Variance expliquée. < 0,1 c'est faible, 0,3-0,6 c'est typique pour des données comportementales, > 0,8 c'est « as-tu accidentellement inclus l'outcome dans les prédicteurs ? » |
| coef | L'effet estimé. La direction et la magnitude comptent, pas seulement le signe. |
| P>\|t\| | p-value par coefficient. Ajustez si vous avez plein de prédicteurs. |
| F-statistic / Prob (F) | Significativité jointe. Si c'est élevé mais que les t individuels sont bas, multicolinéarité. |
| Condition number | > 30 = warning multicolinéarité. > 1000 = problème sérieux. |

**Vérifiez toujours les résidus.** Un modèle avec R² de 0,7 et un plot de résidus en forme d'éventail est cassé.

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

## Régression logistique (outcome binaire)

```python
model = smf.logit("converted ~ tenure_days + plan + C(region)", data=df).fit()
print(model.summary())

# Odds ratios — plus interprétables que les log-odds
print(np.exp(model.params))
print(np.exp(model.conf_int()))
```

**Modèle de phrase en langue simple** : « Chaque 30 jours supplémentaires d'ancienneté multiplient les odds de conversion par 1,12 (IC 95 % : 1,07 à 1,17). Comparés au plan Basic, les utilisateurs du plan Pro ont 2,3× les odds de convertir (IC 95 % : 1,8 à 2,9). »

---

## Contrôles de sanité d'A/B test (à lancer avant de reporter tout résultat)

1. **Équilibre des tailles d'échantillons.** Les bras sont-ils de tailles similaires ? Un split 30/70 quand vous attendiez 50/50 signifie un bug de randomisation.
2. **Métriques pré-traitement.** Les bras se ressemblent-ils sur les métriques qui *ne devraient pas* différer (date d'inscription, région, plan) ? Sinon, la randomisation est cassée.
3. **Test de sample ratio mismatch (SRM)** :
   ```python
   observed = df["arm"].value_counts().sort_index().values
   expected = [df.shape[0] / 2, df.shape[0] / 2]
   chi2, p_srm = stats.chisquare(observed, expected)
   if p_srm < 0.001:
       print(f"SRM detected! p = {p_srm:.6f}. STOP — randomization is broken.")
   ```
4. **Comparaisons multiples.** Vous testez 10 métriques ? Au moins une aura p < 0,05 par hasard. Appliquez Bonferroni (`p × n_tests`) ou Benjamini-Hochberg pour le FDR.
5. **Puissance.** Le test avait-il la puissance de détecter un effet significatif ? Un « null sous-dimensionné » ne veut pas dire « pas d'effet » — ça veut dire « ce test n'a pas pu le voir ».

---

## Ce qu'il NE FAUT PAS faire

- **Ne pêchez pas de tests.** Si votre t-test renvoie p = 0,06 et que vous basculez sur Mann-Whitney pour trouver p = 0,04, c'est de la triche. Choisissez le test avant de regarder les résultats.
- **Ne reportez pas seulement les p-values.** « p < 0,05 » est un oui/non. La taille d'effet est la réponse à « de combien ? »
- **Ne faites pas confiance à ANOVA quand les groupes sont sauvagement déséquilibrés.** Utilisez un modèle à effets aléatoires, ou lancez des tests par paires avec correction appropriée.
- **N'appliquez pas OLS à un outcome binaire.** Utilisez la régression logistique.
- **N'ignorez pas les résidus.** Un R² élevé avec des résidus catastrophiques est un modèle cassé.
- **Ne lancez pas un test sur 2 000 000 lignes et ne reportez pas « p < 0,001 » comme preuve de quoi que ce soit d'important.** Avec assez de n, tout est significatif. Reportez la taille d'effet et dites « la différence est significative mais pratiquement insignifiante ».

---

## La forme de rapport en 3 lignes

Pour tout test, la conclusion doit tenir en 3 lignes :

1. **Ce que vous avez comparé et comment.** « Comparé le revenu par utilisateur entre control (n=12 401) et treatment (n=12 388) avec un t-test de Welch. »
2. **Le résultat avec la taille d'effet.** « Les utilisateurs treatment ont en moyenne 3,40 $ de plus par utilisateur (IC 95 % : 2,10 $ à 4,70 $ ; Cohen's d = 0,08, trivial). »
3. **L'interprétation.** « Statistiquement significatif (p < 0,001), mais l'effet est trop petit pour agir sans considérer le coût d'implémentation. »

Cette troisième ligne, c'est ce dont les stakeholders ont vraiment besoin.
