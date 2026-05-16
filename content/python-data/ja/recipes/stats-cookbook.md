# 統計テストのクックブック

質問からテストを選び、データ形状がそれをサポートするか確認し、実行し、p 値と並べて効果量を報告する。順序が重要 — アナリストレベルの仕事は、どれかが「有意」と言うまでテストを釣らない。

---

## 判断ツリー

```
質問は何か?
│
├── 2 群の平均 / 中央値の比較
│   ├── 同じ被験者を 2 回測定（前後）?
│   │   ├── 残差がほぼ正規? → 対応のある t 検定
│   │   └── 偏りまたは小 n? → Wilcoxon 符号順位
│   └── 異なる被験者?
│       ├── ほぼ正規、各群 30+? → Welch の t 検定（デフォルト）
│       └── 偏りまたは小 n?      → Mann-Whitney U
│
├── 3+ 群の平均比較
│   ├── ほぼ正規、等分散? → 一元配置 ANOVA + Tukey HSD
│   └── そうでない         → Kruskal-Wallis + Dunn の検定
│
├── 2 つのカテゴリ変数は関連?
│   ├── 各セルの期待度数 ≥ 5? → カイ二乗独立性
│   └── 2×2 で期待度数小?     → Fisher の正確検定
│
├── 2 つの連続変数の関係?
│   ├── 線形、ほぼ正規? → Pearson + シンプル OLS
│   └── 単調、非線形   → Spearman
│
└── 複数の x から y を予測
    ├── 連続 y、線形?  → OLS 回帰
    ├── 2 値 y?        → ロジスティック回帰
    └── カウント y?    → Poisson / 負の二項
```

---

## 使う import

```python
import numpy as np
import pandas as pd
from scipy import stats
import statsmodels.formula.api as smf
import statsmodels.api as sm
```

---

## 独立 2 標本 t 検定（Welch）

```python
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]

# Welch（不等分散） — ほぼ常に欲しいデフォルト
t_stat, p_value = stats.ttest_ind(treat, control, equal_var=False)

# 効果量 — Cohen's d
def cohens_d(a, b):
    pooled_sd = np.sqrt((a.std(ddof=1) ** 2 + b.std(ddof=1) ** 2) / 2)
    return (a.mean() - b.mean()) / pooled_sd

d = cohens_d(treat, control)

# 平均差の 95% CI
diff = treat.mean() - control.mean()
se = np.sqrt(treat.var(ddof=1) / len(treat) + control.var(ddof=1) / len(control))
ci_low, ci_high = diff - 1.96 * se, diff + 1.96 * se

print(f"n_control = {len(control):,}, n_treat = {len(treat):,}")
print(f"mean_control = {control.mean():.2f}, mean_treat = {treat.mean():.2f}")
print(f"diff = {diff:.2f} (95% CI: {ci_low:.2f} to {ci_high:.2f})")
print(f"t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d = {d:.3f}")
```

**Cohen's d の経験則:**
- |d| < 0.2 — 些細
- 0.2〜0.5 — 小
- 0.5〜0.8 — 中
- > 0.8 — 大

**普通の日本語テンプレート**: 「トリートメントユーザーは平均 $X 多く費やした（95% CI: $Y〜$Z；Cohen's d = D、{些細 / 小 / 中 / 大}）。差は統計的に有意（p < 0.05）だが、実用効果は {些細 / 小 / ...}。」

---

## Mann-Whitney U（ノンパラメトリックの代替）

データが偏っている場合（売上、滞在時間、ロングテールのもの）、t 検定は持っていない正規性を仮定する。Mann-Whitney は平均ではなくランクを比較する。

```python
u_stat, p_value = stats.mannwhitneyu(treat, control, alternative="two-sided")

# 効果量 — rank-biserial 相関
n1, n2 = len(treat), len(control)
r = 1 - (2 * u_stat) / (n1 * n2)

print(f"U = {u_stat:.0f}, p = {p_value:.4f}, rank-biserial r = {r:.3f}")
print(f"median_control = {control.median():.2f}, median_treat = {treat.median():.2f}")
```

Mann-Whitney を使うときは**中央値**を報告、平均ではない。それがテストが感受する統計量。

---

## 対応のある t 検定（同被験者、前後）

```python
before = df["score_pre"]
after = df["score_post"]

t_stat, p_value = stats.ttest_rel(after, before)

# 対標本の Cohen's d
diffs = after - before
d_paired = diffs.mean() / diffs.std(ddof=1)

print(f"n = {len(diffs):,}")
print(f"mean before = {before.mean():.2f}, mean after = {after.mean():.2f}")
print(f"mean diff = {diffs.mean():.2f}, t = {t_stat:.3f}, p = {p_value:.4f}")
print(f"Cohen's d (paired) = {d_paired:.3f}")
```

ノンパラメトリック: `stats.wilcoxon(after, before)`。

---

## 一元配置 ANOVA（3+ 群）

```python
import scipy.stats as stats

groups = [df.loc[df["plan"] == p, "revenue"] for p in df["plan"].unique()]
f_stat, p_value = stats.f_oneway(*groups)

# 効果量 — eta-squared
def eta_squared(groups):
    grand_mean = np.concatenate(groups).mean()
    ss_between = sum(len(g) * (g.mean() - grand_mean) ** 2 for g in groups)
    ss_total = sum(((g - grand_mean) ** 2).sum() for g in groups)
    return ss_between / ss_total

eta2 = eta_squared(groups)
print(f"F = {f_stat:.3f}, p = {p_value:.4f}, eta² = {eta2:.3f}")
```

ANOVA は「少なくとも 1 つの群が異なる」を教える。どれかは教えない。事後の Tukey HSD で確認:

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd
result = pairwise_tukeyhsd(df["revenue"], df["plan"])
print(result)
```

ノンパラメトリック: `stats.kruskal(*groups)` + ペアワイズには `scikit_posthocs.posthoc_dunn`。

**eta² の経験則:**
- < 0.01 — 些細
- 0.01〜0.06 — 小
- 0.06〜0.14 — 中
- > 0.14 — 大

---

## カイ二乗（カテゴリ vs. カテゴリ）

```python
contingency = pd.crosstab(df["channel"], df["converted"])
print(contingency)

chi2, p, dof, expected = stats.chi2_contingency(contingency)

# 効果量 — Cramér's V
n = contingency.sum().sum()
min_dim = min(contingency.shape) - 1
cramers_v = np.sqrt(chi2 / (n * min_dim))

print(f"chi² = {chi2:.3f}, dof = {dof}, p = {p:.4f}")
print(f"Cramér's V = {cramers_v:.3f}")

# 仮定をチェック: 各セルの期待度数 ≥ 5
print(f"min expected count = {expected.min():.1f}")
if expected.min() < 5:
    print("WARNING: expected count < 5 — consider Fisher's exact instead")
```

期待度数が小さい 2×2 には:
```python
oddsratio, p = stats.fisher_exact(contingency)
```

**Cramér's V**: 0 = 関連なし、1 = 完全。df=1 の場合: 0.1 小、0.3 中、0.5 大。

---

## Pearson / Spearman 相関

```python
# Pearson — 線形、正規
r_p, p_p = stats.pearsonr(df["x"], df["y"])
print(f"Pearson r = {r_p:.3f}, p = {p_p:.4f}")

# Spearman — 単調、非線形 OK、外れ値に頑健
r_s, p_s = stats.spearmanr(df["x"], df["y"])
print(f"Spearman ρ = {r_s:.3f}, p = {p_s:.4f}")
```

相関を報告する前にデータをプロットする。Pearson r が 0.0 でも U 字形を隠していることがある。Spearman が 0.9 でも 1 つの外れ値がすべてを駆動していることがある。

---

## OLS 回帰

```python
import statsmodels.formula.api as smf

# 数式構文: '~' が結果と予測子を分け、'+' が追加、
# ':' が交互作用、'*' が主効果 + 交互作用、C(...) がカテゴリ
model = smf.ols("revenue ~ tenure_days + plan + C(region) + tenure_days:plan",
                data=df).fit()

print(model.summary())
print(f"R² = {model.rsquared:.3f}, adj R² = {model.rsquared_adj:.3f}")
print(f"n = {int(model.nobs):,}")
```

サマリで見るべきところ:

| セクション | チェックすること |
| --- | --- |
| R² / adj R² | 説明された分散。< 0.1 は弱い、0.3〜0.6 は行動データの典型、> 0.8 は「予測子に結果を誤って入れていないか?」 |
| coef | 推定効果。符号だけでなく方向と大きさが重要。 |
| P>\|t\| | 係数ごとの p 値。予測子が多いなら調整。 |
| F 統計量 / Prob (F) | 結合有意性。これが高いが個々の t が低ければ、多重共線性。 |
| Condition number | > 30 = 多重共線性の警告。> 1000 = 重大な問題。 |

**残差を必ず確認する。** R² が 0.7 でも扇形の残差プロットを持つモデルは壊れている。

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

## ロジスティック回帰（2 値結果）

```python
model = smf.logit("converted ~ tenure_days + plan + C(region)", data=df).fit()
print(model.summary())

# オッズ比 — 対数オッズより解釈しやすい
print(np.exp(model.params))
print(np.exp(model.conf_int()))
```

**普通の日本語テンプレート**: 「在籍が 30 日増えるごとに、コンバージョンのオッズが 1.12 倍になる（95% CI: 1.07〜1.17）。Basic プランと比較して、Pro プランのユーザーはコンバージョンのオッズが 2.3 倍（95% CI: 1.8〜2.9）。」

---

## A/B テストのサニティチェック（結果を報告する前に実行）

1. **サンプルサイズのバランス。** arm のサイズは似ているか? 50/50 を期待して 30/70 ならランダム化のバグ。
2. **トリートメント前のメトリクス。** *差があるべきでない*メトリクス（サインアップ日、地域、プラン）で arm が同じに見えるか? そうでなければランダム化が壊れている。
3. **サンプル比ミスマッチ（SRM）**テスト:
   ```python
   observed = df["arm"].value_counts().sort_index().values
   expected = [df.shape[0] / 2, df.shape[0] / 2]
   chi2, p_srm = stats.chisquare(observed, expected)
   if p_srm < 0.001:
       print(f"SRM detected! p = {p_srm:.6f}. STOP — randomization is broken.")
   ```
4. **多重比較。** 10 メトリクスをテスト? 偶然で少なくとも 1 つが p < 0.05 になる。Bonferroni（`p × n_tests`）または FDR の Benjamini-Hochberg を適用。
5. **検出力。** 意味のある効果を検出する検出力がテストにあったか? 「検出力不足の null」は「効果なし」を意味しない — 「このテストでは見えなかった」を意味する。

---

## してはならないこと

- **テストを釣らない。** t 検定が p = 0.06 で戻り、Mann-Whitney に切り替えて p = 0.04 を見つけたら、それはチート。結果を見る前にテストを選ぶ。
- **p 値だけを報告しない。** 「p < 0.05」は yes/no。効果量は「どれだけ?」への答え。
- **群が極端に不均衡なときに ANOVA を信用しない。** ランダム効果のあるモデルを使うか、適切な補正を伴うペアワイズテストを実行する。
- **2 値結果に OLS を適用しない。** ロジスティック回帰を使う。
- **残差を無視しない。** R² が高くて残差がひどいのは壊れたモデル。
- **2,000,000 行でテストを実行して「p < 0.001」を重要なことの証拠として報告しない。** 十分な n では、すべてが有意になる。効果量を報告し、「差は有意だが実用的には無意味」と言う。

---

## 3 行レポートの形

どのテストでも、要点は 3 行に収まるべき:

1. **何を、どう比較したか。** 「コントロール（n=12,401）とトリートメント（n=12,388）のユーザー単価を Welch の t 検定で比較。」
2. **効果量を伴う結果。** 「トリートメントユーザーは平均 $3.40 多く（95% CI: $2.10〜$4.70；Cohen's d = 0.08、些細）。」
3. **解釈。** 「統計的に有意（p < 0.001）だが、実装コストを考慮せずに行動するには効果が小さすぎる。」

その 3 行目こそステークホルダーが実際に必要とするもの。
