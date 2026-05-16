# Cookbook de Teste Estatístico

Escolha o teste pela pergunta, verifique se o formato dos dados suporta, rode e reporte effect size junto com p-valor. A ordem importa — trabalho de analista de verdade não fica pescando teste até um dar "significativo".

---

## A árvore de decisão

```
Qual é a pergunta?
│
├── Comparando médias/medianas de 2 grupos
│   ├── Mesmos sujeitos medidos duas vezes (antes/depois)?
│   │   ├── Resíduos aproximadamente normais? → t-test pareado
│   │   └── Assimétrico ou n pequeno?         → Wilcoxon signed-rank
│   └── Sujeitos diferentes?
│       ├── Aproximadamente normal, ≥30/grupo? → t-test de Welch (default)
│       └── Assimétrico ou n pequeno?         → Mann-Whitney U
│
├── Comparando médias de 3+ grupos
│   ├── Aproximadamente normal, variâncias iguais? → ANOVA de uma via + Tukey HSD
│   └── Caso contrário                              → Kruskal-Wallis + Dunn's
│
├── Duas variáveis categóricas relacionadas?
│   ├── Contagens esperadas ≥5 por célula? → Chi-square de independência
│   └── 2×2 com expected pequeno?           → Exato de Fisher
│
├── Relação entre duas contínuas?
│   ├── Linear, aproximadamente normal? → Pearson + OLS simples
│   └── Monotônica, não-linear           → Spearman
│
└── Prever y a partir de múltiplos x's
    ├── y contínuo, linear?    → Regressão OLS
    ├── y binário?             → Regressão logística
    └── y contagem?            → Poisson / Binomial negativa
```

---

## Imports que você vai usar

```python
import numpy as np
import pandas as pd
from scipy import stats
import statsmodels.formula.api as smf
import statsmodels.api as sm
```

---

## t-test de amostras independentes (Welch's)

```python
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]

# Welch's (variâncias desiguais) — o default que você quase sempre quer
t_stat, p_value = stats.ttest_ind(treat, control, equal_var=False)

# Effect size — d de Cohen
def cohens_d(a, b):
    pooled_sd = np.sqrt((a.std(ddof=1) ** 2 + b.std(ddof=1) ** 2) / 2)
    return (a.mean() - b.mean()) / pooled_sd

d = cohens_d(treat, control)

# IC 95% para a diferença de médias
diff = treat.mean() - control.mean()
se = np.sqrt(treat.var(ddof=1) / len(treat) + control.var(ddof=1) / len(control))
ci_low, ci_high = diff - 1.96 * se, diff + 1.96 * se

print(f"n_control = {len(control):,}, n_treat = {len(treat):,}")
print(f"mean_control = {control.mean():.2f}, mean_treat = {treat.mean():.2f}")
print(f"diff = {diff:.2f} (95% CI: {ci_low:.2f} to {ci_high:.2f})")
print(f"t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d = {d:.3f}")
```

**Regras de polegar para d de Cohen:**
- |d| < 0,2 — trivial
- 0,2-0,5 — pequeno
- 0,5-0,8 — médio
- > 0,8 — grande

**Template em português simples**: "Usuários de treatment receberam $X a mais por usuário em média (IC 95%: $Y a $Z; d de Cohen = D, {trivial/pequeno/médio/grande}). A diferença é estatisticamente significativa (p < 0,05) mas o efeito prático é {trivial/pequeno/…}."

---

## Mann-Whitney U (alternativa não-paramétrica)

Quando os dados são assimétricos (receita, tempo no site, qualquer coisa com cauda longa), o t-test assume normalidade que você não tem. Mann-Whitney compara ranks, não médias.

```python
u_stat, p_value = stats.mannwhitneyu(treat, control, alternative="two-sided")

# Effect size — correlação rank-biserial
n1, n2 = len(treat), len(control)
r = 1 - (2 * u_stat) / (n1 * n2)

print(f"U = {u_stat:.0f}, p = {p_value:.4f}, rank-biserial r = {r:.3f}")
print(f"median_control = {control.median():.2f}, median_treat = {treat.median():.2f}")
```

Reporte **medianas**, não médias, quando usar Mann-Whitney. Essa é a estatística a que o teste é sensível.

---

## t-test pareado (mesmos sujeitos, antes/depois)

```python
before = df["score_pre"]
after = df["score_post"]

t_stat, p_value = stats.ttest_rel(after, before)

# d de Cohen para amostras pareadas
diffs = after - before
d_paired = diffs.mean() / diffs.std(ddof=1)

print(f"n = {len(diffs):,}")
print(f"mean before = {before.mean():.2f}, mean after = {after.mean():.2f}")
print(f"mean diff = {diffs.mean():.2f}, t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d (paired) = {d_paired:.3f}")
```

Não-paramétrico: `stats.wilcoxon(after, before)`.

---

## ANOVA de uma via (3+ grupos)

```python
import scipy.stats as stats

groups = [df.loc[df["plan"] == p, "revenue"] for p in df["plan"].unique()]
f_stat, p_value = stats.f_oneway(*groups)

# Effect size — eta-quadrado
def eta_squared(groups):
    grand_mean = np.concatenate(groups).mean()
    ss_between = sum(len(g) * (g.mean() - grand_mean) ** 2 for g in groups)
    ss_total = sum(((g - grand_mean) ** 2).sum() for g in groups)
    return ss_between / ss_total

eta2 = eta_squared(groups)
print(f"F = {f_stat:.3f}, p = {p_value:.4f}, eta² = {eta2:.3f}")
```

ANOVA te diz "pelo menos um grupo difere". Não te diz qual. Pós-hoc Tukey HSD diz:

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd
result = pairwise_tukeyhsd(df["revenue"], df["plan"])
print(result)
```

Não-paramétrico: `stats.kruskal(*groups)` + `scikit_posthocs.posthoc_dunn` para pairwise.

**Regra de polegar para eta²:**
- < 0,01 — trivial
- 0,01-0,06 — pequeno
- 0,06-0,14 — médio
- > 0,14 — grande

---

## Chi-square (categórica vs. categórica)

```python
contingency = pd.crosstab(df["channel"], df["converted"])
print(contingency)

chi2, p, dof, expected = stats.chi2_contingency(contingency)

# Effect size — V de Cramér
n = contingency.sum().sum()
min_dim = min(contingency.shape) - 1
cramers_v = np.sqrt(chi2 / (n * min_dim))

print(f"chi² = {chi2:.3f}, dof = {dof}, p = {p:.4f}")
print(f"Cramér's V = {cramers_v:.3f}")

# Cheque a premissa: contagens esperadas ≥ 5 por célula
print(f"min expected count = {expected.min():.1f}")
if expected.min() < 5:
    print("AVISO: contagem esperada < 5 — considere exato de Fisher em vez")
```

Para 2×2 com expected counts pequenos:
```python
oddsratio, p = stats.fisher_exact(contingency)
```

**V de Cramér**: 0 = sem associação, 1 = perfeita. Para df=1: 0,1 pequeno, 0,3 médio, 0,5 grande.

---

## Correlação Pearson / Spearman

```python
# Pearson — linear, normal
r_p, p_p = stats.pearsonr(df["x"], df["y"])
print(f"Pearson r = {r_p:.3f}, p = {p_p:.4f}")

# Spearman — monotônica, não-linear ok, robusta a outliers
r_s, p_s = stats.spearmanr(df["x"], df["y"])
print(f"Spearman ρ = {r_s:.3f}, p = {p_s:.4f}")
```

Plote os dados antes de reportar uma correlação. Um Pearson r de 0,0 pode esconder uma forma de U. Um Spearman de 0,9 pode esconder um único outlier dirigindo tudo.

---

## Regressão OLS

```python
import statsmodels.formula.api as smf

# Sintaxe de fórmula: '~' separa outcome de preditores, '+' soma,
# ':' é interação, '*' é efeitos principais + interação, C(...) faz categórica
model = smf.ols("revenue ~ tenure_days + plan + C(region) + tenure_days:plan",
                data=df).fit()

print(model.summary())
print(f"R² = {model.rsquared:.3f}, adj R² = {model.rsquared_adj:.3f}")
print(f"n = {int(model.nobs):,}")
```

O que olhar no summary:

| Seção | O que checar |
| --- | --- |
| R² / adj R² | Variância explicada. < 0,1 é fraco, 0,3-0,6 é típico para dado comportamental, > 0,8 é "você acidentalmente incluiu o outcome nos preditores?" |
| coef | O efeito estimado. Direção e magnitude importam, não só o sinal. |
| P>\|t\| | p-valor por coeficiente. Ajuste se tem muitos preditores. |
| F-statistic / Prob (F) | Significância conjunta. Se está alto mas os t's individuais estão baixos, é multicolinearidade. |
| Condition number | > 30 = aviso de multicolinearidade. > 1000 = problema sério. |

**Sempre cheque resíduos.** Um modelo com R² de 0,7 e um plot de resíduo em forma de leque está quebrado.

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

## Regressão logística (outcome binário)

```python
model = smf.logit("converted ~ tenure_days + plan + C(region)", data=df).fit()
print(model.summary())

# Odds ratios — mais interpretáveis que log-odds
print(np.exp(model.params))
print(np.exp(model.conf_int()))
```

**Template em português simples**: "Cada 30 dias adicionais de tenure multiplicam as odds de conversão por 1,12 (IC 95%: 1,07 a 1,17). Comparado ao plano Basic, usuários do plano Pro têm 2,3× as odds de converter (IC 95%: 1,8 a 2,9)."

---

## Checks de sanidade de A/B test (rode antes de reportar qualquer resultado)

1. **Balanço de tamanho de amostra.** Os braços têm tamanho parecido? Um split 30/70 quando esperava 50/50 indica bug de randomização.
2. **Métricas pré-tratamento.** Os braços parecem iguais em métricas que *não deveriam* diferir (data de signup, região, plano)? Se não, a randomização está quebrada.
3. Teste de **Sample ratio mismatch (SRM)**:
   ```python
   observed = df["arm"].value_counts().sort_index().values
   expected = [df.shape[0] / 2, df.shape[0] / 2]
   chi2, p_srm = stats.chisquare(observed, expected)
   if p_srm < 0.001:
       print(f"SRM detected! p = {p_srm:.6f}. PARE — randomização está quebrada.")
   ```
4. **Comparações múltiplas.** Testando 10 métricas? Pelo menos uma vai ter p < 0,05 por sorte. Aplique Bonferroni (`p × n_tests`) ou Benjamini-Hochberg para FDR.
5. **Power.** O teste tinha power para detectar um efeito relevante? Um "null underpowered" não significa "sem efeito" — significa "esse teste não conseguiu ver".

---

## O que NÃO fazer

- **Não pesque teste.** Se seu t-test veio com p = 0,06 e você muda para Mann-Whitney até achar p = 0,04, isso é trapaça. Escolha o teste antes de olhar os resultados.
- **Não reporte só p-valores.** "p < 0,05" é um sim/não. Effect size é a resposta a "em quanto?".
- **Não confie no ANOVA quando grupos estão muito desbalanceados.** Use um modelo com efeitos aleatórios, ou rode testes pareados com correção apropriada.
- **Não aplique OLS num outcome binário.** Use regressão logística.
- **Não ignore resíduos.** R² alto com resíduos horríveis é um modelo quebrado.
- **Não rode um teste em 2.000.000 de linhas e reporte "p < 0,001" como prova de algo importante.** Com n suficiente, tudo é significativo. Reporte o effect size e diga "a diferença é significativa mas praticamente sem sentido".

---

## O formato do relato em 3 linhas

Para qualquer teste, o takeaway deve caber em 3 linhas:

1. **O que você comparou e como.** "Comparei receita por usuário entre control (n=12.401) e treatment (n=12.388) usando t-test de Welch."
2. **O resultado com effect size.** "Usuários de treatment tiveram $3,40 a mais por usuário em média (IC 95%: $2,10 a $4,70; d de Cohen = 0,08, trivial)."
3. **A interpretação.** "Estatisticamente significativo (p < 0,001), mas o efeito é pequeno demais para agir sem considerar o custo de implementação."

Essa terceira linha é o que stakeholders de fato precisam.
