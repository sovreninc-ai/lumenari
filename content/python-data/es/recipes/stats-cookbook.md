# Cookbook de Tests Estadísticos

Elige el test desde la pregunta, verifica que la forma de la data lo soporte, córrelo, reporta tamaño de efecto al lado del p-value. El orden importa — el trabajo nivel analista no pesca tests hasta que uno diga "significativo".

---

## El árbol de decisión

```
¿Cuál es la pregunta?
│
├── Comparando medias/medianas de 2 grupos
│   ├── ¿Mismos sujetos medidos dos veces (antes/después)?
│   │   ├── ¿Residuales normal-ish?  → T-test pareado
│   │   └── ¿Sesgado o n chico?      → Wilcoxon signed-rank
│   └── ¿Sujetos distintos?
│       ├── ¿Normal-ish, ≥30/grupo?  → Welch t-test (default)
│       └── ¿Sesgado o n chico?      → Mann-Whitney U
│
├── Comparando medias de 3+ grupos
│   ├── ¿Normal-ish, varianzas iguales? → ANOVA de una vía + Tukey HSD
│   └── De lo contrario                 → Kruskal-Wallis + Dunn
│
├── ¿Dos variables categóricas relacionadas?
│   ├── ¿Counts esperados ≥5 por celda? → Chi-square de independencia
│   └── ¿2×2 con esperados chicos?      → Exact de Fisher
│
├── ¿Relación entre dos continuas?
│   ├── ¿Lineal, normal-ish?     → Pearson + OLS simple
│   └── ¿Monotónica, no lineal?  → Spearman
│
└── Predecir y desde múltiples x
    ├── ¿y continua, lineal?     → Regresión OLS
    ├── ¿y binaria?              → Regresión logística
    └── ¿y de conteo?            → Poisson / Negative binomial
```

---

## Imports que vas a usar

```python
import numpy as np
import pandas as pd
from scipy import stats
import statsmodels.formula.api as smf
import statsmodels.api as sm
```

---

## T-test de muestras independientes (Welch)

```python
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]

# Welch (varianzas desiguales) — el default que casi siempre quieres
t_stat, p_value = stats.ttest_ind(treat, control, equal_var=False)

# Tamaño de efecto — Cohen's d
def cohens_d(a, b):
    pooled_sd = np.sqrt((a.std(ddof=1) ** 2 + b.std(ddof=1) ** 2) / 2)
    return (a.mean() - b.mean()) / pooled_sd

d = cohens_d(treat, control)

# IC al 95% para la diferencia de medias
diff = treat.mean() - control.mean()
se = np.sqrt(treat.var(ddof=1) / len(treat) + control.var(ddof=1) / len(control))
ci_low, ci_high = diff - 1.96 * se, diff + 1.96 * se

print(f"n_control = {len(control):,}, n_treat = {len(treat):,}")
print(f"mean_control = {control.mean():.2f}, mean_treat = {treat.mean():.2f}")
print(f"diff = {diff:.2f} (95% CI: {ci_low:.2f} to {ci_high:.2f})")
print(f"t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d = {d:.3f}")
```

**Reglas prácticas de interpretación para Cohen's d:**
- |d| < 0.2 — trivial
- 0.2-0.5 — chico
- 0.5-0.8 — mediano
- > 0.8 — grande

**Template en español llano**: "Los usuarios de treatment promediaron USD $X más por usuario (95% CI: $Y a $Z; Cohen's d = D, {trivial/chico/mediano/grande}). La diferencia es estadísticamente significativa (p < 0.05) pero el efecto práctico es {trivial/chico/...}."

---

## Mann-Whitney U (alternativa no paramétrica)

Cuando la data está sesgada (revenue, time-on-site, cualquier cosa con cola larga), el t-test asume una normalidad que no tienes. Mann-Whitney compara ranks, no medias.

```python
u_stat, p_value = stats.mannwhitneyu(treat, control, alternative="two-sided")

# Tamaño de efecto — correlación rank-biserial
n1, n2 = len(treat), len(control)
r = 1 - (2 * u_stat) / (n1 * n2)

print(f"U = {u_stat:.0f}, p = {p_value:.4f}, rank-biserial r = {r:.3f}")
print(f"median_control = {control.median():.2f}, median_treat = {treat.median():.2f}")
```

Reporta **medianas**, no medias, cuando uses Mann-Whitney. Esa es la estadística a la que el test es sensible.

---

## T-test pareado (mismos sujetos, antes/después)

```python
before = df["score_pre"]
after = df["score_post"]

t_stat, p_value = stats.ttest_rel(after, before)

# Cohen's d para muestras pareadas
diffs = after - before
d_paired = diffs.mean() / diffs.std(ddof=1)

print(f"n = {len(diffs):,}")
print(f"mean before = {before.mean():.2f}, mean after = {after.mean():.2f}")
print(f"mean diff = {diffs.mean():.2f}, t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d (paired) = {d_paired:.3f}")
```

No paramétrico: `stats.wilcoxon(after, before)`.

---

## ANOVA de una vía (3+ grupos)

```python
import scipy.stats as stats

groups = [df.loc[df["plan"] == p, "revenue"] for p in df["plan"].unique()]
f_stat, p_value = stats.f_oneway(*groups)

# Tamaño de efecto — eta-cuadrado
def eta_squared(groups):
    grand_mean = np.concatenate(groups).mean()
    ss_between = sum(len(g) * (g.mean() - grand_mean) ** 2 for g in groups)
    ss_total = sum(((g - grand_mean) ** 2).sum() for g in groups)
    return ss_between / ss_total

eta2 = eta_squared(groups)
print(f"F = {f_stat:.3f}, p = {p_value:.4f}, eta² = {eta2:.3f}")
```

ANOVA te dice "al menos un grupo difiere". No te dice cuál. El post-hoc Tukey HSD sí:

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd
result = pairwise_tukeyhsd(df["revenue"], df["plan"])
print(result)
```

No paramétrico: `stats.kruskal(*groups)` + `scikit_posthocs.posthoc_dunn` para pairwise.

**Regla práctica de interpretación para eta²:**
- < 0.01 — trivial
- 0.01-0.06 — chico
- 0.06-0.14 — mediano
- > 0.14 — grande

---

## Chi-square (categórica vs. categórica)

```python
contingency = pd.crosstab(df["channel"], df["converted"])
print(contingency)

chi2, p, dof, expected = stats.chi2_contingency(contingency)

# Tamaño de efecto — V de Cramér
n = contingency.sum().sum()
min_dim = min(contingency.shape) - 1
cramers_v = np.sqrt(chi2 / (n * min_dim))

print(f"chi² = {chi2:.3f}, dof = {dof}, p = {p:.4f}")
print(f"Cramér's V = {cramers_v:.3f}")

# Chequea el supuesto: counts esperados ≥ 5 por celda
print(f"min expected count = {expected.min():.1f}")
if expected.min() < 5:
    print("WARNING: expected count < 5 — consider Fisher's exact instead")
```

Para 2×2 con counts esperados chicos:
```python
oddsratio, p = stats.fisher_exact(contingency)
```

**V de Cramér**: 0 = sin asociación, 1 = perfecta. Para df=1: 0.1 chica, 0.3 mediana, 0.5 grande.

---

## Correlación de Pearson / Spearman

```python
# Pearson — lineal, normal
r_p, p_p = stats.pearsonr(df["x"], df["y"])
print(f"Pearson r = {r_p:.3f}, p = {p_p:.4f}")

# Spearman — monotónica, no lineal está bien, robusta a outliers
r_s, p_s = stats.spearmanr(df["x"], df["y"])
print(f"Spearman ρ = {r_s:.3f}, p = {p_s:.4f}")
```

Grafica la data antes de reportar una correlación. Un Pearson r de 0.0 puede esconder una forma de U. Un Spearman de 0.9 puede esconder un solo outlier manejando todo.

---

## Regresión OLS

```python
import statsmodels.formula.api as smf

# Sintaxis de fórmula: '~' separa outcome de predictors, '+' los suma,
# ':' es interacción, '*' es main effects + interacción, C(...) hace categórica
model = smf.ols("revenue ~ tenure_days + plan + C(region) + tenure_days:plan",
                data=df).fit()

print(model.summary())
print(f"R² = {model.rsquared:.3f}, adj R² = {model.rsquared_adj:.3f}")
print(f"n = {int(model.nobs):,}")
```

Qué mirar en el summary:

| Sección | Qué chequear |
| --- | --- |
| R² / adj R² | Varianza explicada. < 0.1 es débil, 0.3-0.6 es típico para data conductual, > 0.8 es "¿incluiste accidentalmente el outcome en los predictors?" |
| coef | El efecto estimado. La dirección y la magnitud importan, no solo el signo. |
| P>\|t\| | p-value por coeficiente. Ajusta si tienes muchos predictors. |
| F-statistic / Prob (F) | Significancia conjunta. Si esto es alto pero los ts individuales son bajos, multicolinealidad. |
| Condition number | > 30 = advertencia de multicolinealidad. > 1000 = problema serio. |

**Chequea siempre los residuales.** Un modelo con R² de 0.7 y un plot de residuales en abanico está roto.

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

## Regresión logística (outcome binario)

```python
model = smf.logit("converted ~ tenure_days + plan + C(region)", data=df).fit()
print(model.summary())

# Odds ratios — más interpretables que log-odds
print(np.exp(model.params))
print(np.exp(model.conf_int()))
```

**Template en español llano**: "Cada 30 días adicionales de tenure multiplican las odds de conversión por 1.12 (95% CI: 1.07 a 1.17). Comparado con el plan Basic, los usuarios del plan Pro tienen 2.3× las odds de convertir (95% CI: 1.8 a 2.9)."

---

## Sanity checks de A/B test (córrelos antes de reportar cualquier resultado)

1. **Balance del sample size.** ¿Los brazos son similares en tamaño? Un split 30/70 cuando esperabas 50/50 significa un bug de aleatorización.
2. **Métricas pre-tratamiento.** ¿Los brazos se ven iguales en métricas que *no deberían* diferir (fecha de signup, región, plan)? Si no, la aleatorización está rota.
3. Test de **sample ratio mismatch (SRM)**:
   ```python
   observed = df["arm"].value_counts().sort_index().values
   expected = [df.shape[0] / 2, df.shape[0] / 2]
   chi2, p_srm = stats.chisquare(observed, expected)
   if p_srm < 0.001:
       print(f"SRM detected! p = {p_srm:.6f}. STOP — randomization is broken.")
   ```
4. **Comparaciones múltiples.** ¿Estás testeando 10 métricas? Al menos una va a tener p < 0.05 por azar. Aplica Bonferroni (`p × n_tests`) o Benjamini-Hochberg para FDR.
5. **Poder.** ¿El test tuvo el poder para detectar un efecto significativo? Un "null underpowered" no significa "sin efecto" — significa "este test no lo pudo ver".

---

## Qué NO hacer

- **No pesques tests.** Si tu t-test salió p = 0.06 y switcheás a Mann-Whitney para encontrar p = 0.04, eso es trampa. Elige el test antes de mirar los resultados.
- **No reportes solo p-values.** "p < 0.05" es un sí/no. El tamaño de efecto es la respuesta a "¿por cuánto?".
- **No confíes en ANOVA cuando los grupos están salvajemente desbalanceados.** Usa un modelo con random effects, o corre tests pairwise con corrección apropiada.
- **No apliques OLS a un outcome binario.** Usa regresión logística.
- **No ignores los residuales.** Un R² alto con residuales horribles es un modelo roto.
- **No corras un test sobre 2,000,000 de filas y reportes "p < 0.001" como prueba de algo importante.** Con suficiente n, todo es significativo. Reporta el tamaño del efecto y di "la diferencia es significativa pero prácticamente sin sentido".

---

## La forma del reporte de 3 líneas

Para cualquier test, el takeaway debería caber en 3 líneas:

1. **Qué comparaste y cómo.** "Comparé revenue por usuario entre control (n=12,401) y treatment (n=12,388) usando Welch t-test."
2. **El resultado con tamaño de efecto.** "Los usuarios de treatment promediaron USD $3.40 más por usuario (95% CI: $2.10 a $4.70; Cohen's d = 0.08, trivial)."
3. **La interpretación.** "Estadísticamente significativo (p < 0.001), pero el efecto es demasiado chico como para actuar sin considerar el costo de implementación."

Esa tercera línea es lo que los stakeholders realmente necesitan.
