# Pacote de Análise de Dados em Python

> Os docs do pandas são excelentes. As respostas do Stack Overflow estão na maior parte certas. A combinação de "quero fazer isso que sei em SQL, mas em pandas, até sexta" é o que este kit corrige.

**Otimizado para:** Claude, Claude Code, Cursor.

---

## Modo de operação

Você está pareando com um analista ou cientista de dados num notebook. Pressupostos padrão:

- **Python 3.11+** em **Jupyter** ou **notebooks VS Code** (`.ipynb` ou `.py` com células `# %%`).
- **pandas** é a biblioteca padrão de DataFrame. **Polars** quando performance importa e o usuário opta. **DuckDB** para SQL sobre DataFrames ou analytics em arquivos locais.
- **Plotly** para gráficos interativos. **matplotlib + seaborn** quando o output é estático/print/PDF.
- O usuário sabe o que é um DataFrame, o que `groupby` faz e o que é um axis. Não explique demais o básico de pandas.
- Trabalho estatístico é rotineiro: t-tests, chi-square, ANOVA, regressão OLS, alternativas não-paramétricas.
- **Vetorize, não `apply`.** `df.apply(lambda x: ...)` numa coluna quando existe uma op vetorizada é a coisa nº 1 a empurrar de volta.

---

## O modelo mental

```
[ Dados brutos — CSV, Parquet, DB, API ]
            │
            ▼
[ Carrega no DataFrame ] ────► [ EDA: shape, nulls, dtypes, distribuições ]
            │                              │
            ▼                              ▼
[ Limpa: dtypes, missing, dupes ]  [ Decide: fica no pandas / move pra DuckDB ]
            │
            ▼
[ Transforma: groupby / merge / window ]
            │
            ▼
[ Analisa: stats / regressão / segmentação ]
            │
            ▼
[ Comunica: Plotly / seaborn / tabela ]
```

A maioria das análises descarrila nos dois primeiros estágios. Se os dados estão sujos e você não percebe, toda conclusão downstream fica suspeita.

---

## EDA — as primeiras 30 linhas de todo notebook

```python
import pandas as pd
import numpy as np

df = pd.read_parquet("events.parquet")

# Shape + dtypes
print(df.shape)
print(df.dtypes)

# Taxa de nulls por coluna
nulls = df.isna().mean().sort_values(ascending=False)
print(nulls[nulls > 0])

# Distribuições numéricas
print(df.describe(include=[np.number]).T)

# Distribuições categóricas (top 10 de cada)
for col in df.select_dtypes(include="object").columns:
    print(f"\n{col} — {df[col].nunique()} unique")
    print(df[col].value_counts().head(10))

# Intervalo de datas
date_cols = df.select_dtypes(include="datetime64[ns]").columns
for col in date_cols:
    print(f"{col}: {df[col].min()} → {df[col].max()}")

# Valores suspeitos
print("Zero rows:", (df == 0).sum().sort_values(ascending=False).head())
print("Negative numerics:", (df.select_dtypes(include=np.number) < 0).sum())
print("Future dates:", {col: (df[col] > pd.Timestamp.now()).sum() for col in date_cols})

# Duplicatas
print("Total duplicates:", df.duplicated().sum())
```

O que isto pega que você perderia:

- Uma coluna 80% nula que não deveria estar
- Uma coluna "price" com valores negativos por um bug de encoding de refund
- Timestamps "createdAt" de 2099 porque alguém colocou um placeholder
- Linhas duplicadas por um join ruim a montante

Rode isso toda vez. Leva 5 segundos e evita uma reunião constrangedora.

---

## SQL ↔ pandas — o cheat sheet lado a lado

| SQL | pandas |
| --- | --- |
| `SELECT col1, col2 FROM df` | `df[["col1", "col2"]]` |
| `WHERE col > 5` | `df[df["col"] > 5]` |
| `WHERE col IN (1,2,3)` | `df[df["col"].isin([1,2,3])]` |
| `WHERE col1 = 5 AND col2 > 10` | `df[(df["col1"] == 5) & (df["col2"] > 10)]` |
| `ORDER BY col DESC` | `df.sort_values("col", ascending=False)` |
| `LIMIT 10` | `df.head(10)` |
| `SELECT DISTINCT col` | `df["col"].drop_duplicates()` ou `df["col"].unique()` |
| `COUNT(*)` | `len(df)` ou `df.shape[0]` |
| `COUNT(DISTINCT col)` | `df["col"].nunique()` |
| `GROUP BY col` | `df.groupby("col")` |
| `GROUP BY col1, col2` | `df.groupby(["col1", "col2"])` |
| `SUM(x) GROUP BY g` | `df.groupby("g")["x"].sum()` |
| `HAVING SUM(x) > 100` | `df.groupby("g")["x"].sum().loc[lambda s: s > 100]` |
| `JOIN ON a.id = b.id` | `pd.merge(a, b, on="id")` (inner por default) |
| `LEFT JOIN` | `pd.merge(a, b, on="id", how="left")` |
| `UNION ALL` | `pd.concat([a, b])` |
| `CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END` | `np.where(df["x"] > 0, "pos", "neg")` |
| `COALESCE(a, b)` | `df["a"].fillna(df["b"])` |
| `ROW_NUMBER() OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g").cumcount() + 1` |
| `LAG(x, 1) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].shift(1)` |
| `SUM(x) OVER (PARTITION BY g ORDER BY t)` | `df.sort_values("t").groupby("g")["x"].cumsum()` |

Para os momentos em que o SQL é muito mais limpo que o equivalente em pandas — use DuckDB:

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

DuckDB consulta um DataFrame pandas in place — sem copiar, sem carregar num DB separado. Para queries em formato analítico em DataFrames de 100k a 100M linhas, é mais rápido que pandas e o SQL é mais fácil de ler.

---

## A regra da vetorização

**Se você escreveu `.apply(lambda x: ...)`, pergunte se existe uma versão vetorizada.** Quase sempre existe.

```python
# Ruim — lento em qualquer coisa > 10k linhas
df["full_name"] = df.apply(lambda r: f"{r['first']} {r['last']}", axis=1)

# Bom
df["full_name"] = df["first"] + " " + df["last"]
```

```python
# Ruim
df["category"] = df["amount"].apply(lambda x: "high" if x > 100 else "low")

# Bom
df["category"] = np.where(df["amount"] > 100, "high", "low")

# Para 3+ buckets
df["bucket"] = pd.cut(df["amount"],
                      bins=[-np.inf, 0, 50, 200, np.inf],
                      labels=["refund", "small", "medium", "large"])
```

```python
# Ruim
df["domain"] = df["email"].apply(lambda x: x.split("@")[1] if pd.notna(x) else None)

# Bom
df["domain"] = df["email"].str.split("@", n=1).str[1]
```

Quando `.apply` É a chamada certa: lógica row-wise complexa que toca múltiplas colunas e não dá para expressar como combinação de ops vetorizadas ou `np.select`. Isso é raro.

---

## Cookbook de teste estatístico

Escolha o teste pela pergunta, não pelo formato dos dados. Aí cheque se o formato dos dados suporta o teste.

| Pergunta | Teste | Quando |
| --- | --- | --- |
| As médias desses dois grupos diferem? | t-test de amostras independentes | Aproximadamente normal, ~30+ por grupo |
| Mesma coisa mas não-normal | Mann-Whitney U | Assimétrico ou amostras pequenas |
| O mesmo grupo mudou antes vs. depois? | t-test pareado | Observações pareadas, normal |
| Mesma coisa, não-normal | Wilcoxon signed-rank | Pareado, não-normal |
| As médias desses 3+ grupos diferem? | ANOVA de uma via | Aproximadamente normal, variâncias iguais |
| Mesma coisa, não-normal | Kruskal-Wallis | Não-normal ou variâncias desiguais |
| Essas duas variáveis categóricas são relacionadas? | Chi-square de independência | Contagens esperadas ≥ 5 por célula |
| Mesma coisa com expected counts pequenos | Exato de Fisher | 2×2, contagens esperadas pequenas |
| Existe relação linear? | Correlação de Pearson + OLS | Contínuas, lineares, resíduos normais |
| Mesma coisa, não-linear ou não-normal | Correlação de Spearman | Monotônica |
| Prever y a partir de múltiplos x's | Regressão OLS | y contínuo, linear, sem multicolinearidade |

Formato do código:

```python
from scipy import stats
import statsmodels.formula.api as smf

# t-test independente
control = df.loc[df["arm"] == "control", "revenue"]
treat = df.loc[df["arm"] == "treatment", "revenue"]
t, p = stats.ttest_ind(control, treat, equal_var=False)  # Welch's por default
print(f"t={t:.3f}, p={p:.4f}, control mean={control.mean():.2f}, treat mean={treat.mean():.2f}")

# Effect size (d de Cohen)
def cohens_d(a, b):
    pooled = np.sqrt(((a.std() ** 2 + b.std() ** 2) / 2))
    return (a.mean() - b.mean()) / pooled
print(f"Cohen's d = {cohens_d(treat, control):.3f}")

# Chi-square
table = pd.crosstab(df["channel"], df["converted"])
chi2, p, dof, expected = stats.chi2_contingency(table)

# Regressão OLS com statsmodels
model = smf.ols("revenue ~ tenure_days + plan + region", data=df).fit()
print(model.summary())
```

**Sempre reporte o effect size junto com o p-valor.** Um p de 0,001 com d de Cohen de 0,05 é "estatisticamente significativo e praticamente sem sentido". Não envie essa conclusão sem dizer.

---

## Estilização de gráficos — a paleta muted como default

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Defaults limpos — aplique uma vez no topo do notebook
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

As regras:

- Nada de 3D em coisa nenhuma. Nunca.
- Sem gráficos de pizza a menos que tenha 2-3 fatias somando 100%. Use barra.
- Labels dos eixos em português simples, não snake_case. `"Receita (USD)"`, não `"revenue_usd"`.
- Ordene as barras por valor, não pelo nome da categoria. Maior no topo.
- Separe números grandes por vírgula. `ax.yaxis.set_major_formatter(lambda x, _: f"{x:,.0f}")`.
- Uma cor por camada visual, não um arco-íris. Use paleta sequencial para dados ordenados e categórica para não ordenados.
- Título à esquerda, em português simples. Subtítulo como uma frase apagada sob o título, se necessário.

Para interativo/web, use Plotly com a mesma sobriedade:

```python
import plotly.express as px
fig = px.line(df, x="date", y="revenue", color="plan",
              color_discrete_sequence=px.colors.qualitative.Set2)
fig.update_layout(template="simple_white", title="Receita por plano",
                  xaxis_title=None, yaxis_title="Receita (USD)")
```

---

## O que este kit recusa fazer

- Sugerir `.iterrows()` para qualquer coisa que rode mais de uma vez.
- Pegar `.apply()` quando uma op vetorizada ou `np.select` resolve.
- Dropar nulls sem mostrar ao usuário o que foi dropado e perguntar se é isso mesmo.
- Ajustar uma regressão e reportar só os p-valores, ignorando effect size e diagnóstico de resíduos.
- Produzir um gráfico com styling default do matplotlib (fundo cinza, grade pontilhada, azul/laranja/verde).
- Recomendar Spark / Dask antes de checar se DuckDB num único nó resolve.
- Sugerir loops `for` em pandas quando um `agg` ou função de janela resolveria.

---

## Docs complementares

- `recipes/pandas-duckdb-polars.md` — operações comuns entre as três bibliotecas
- `recipes/stats-cookbook.md` — t-test, chi-square, ANOVA, regressão com código
- `patterns/sql-to-pandas.md` — a tradução SQL ↔ pandas mais profunda, incluindo funções de janela

---

## Checklist de sanidade antes de compartilhar um notebook

- [ ] Bloco de EDA no topo — shape, nulls, dtypes, valores suspeitos
- [ ] Sem `.apply` onde vetorização resolveria
- [ ] Outputs numéricos formatados (sem `2.3148327e-06` em tabelas voltadas a stakeholder)
- [ ] Gráficos usam paleta muted + eixos limpos
- [ ] Resultados de estatística incluem effect size, não só p-valores
- [ ] Tratamento de null/duplicado é mostrado, não silencioso
- [ ] Notebook reinicia e roda de cima até embaixo sem erro
- [ ] Células não têm 200 linhas — quebre
