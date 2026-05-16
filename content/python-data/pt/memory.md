# Memory — Pacote de Análise de Dados em Python

## Contexto do domínio

Um analista de dados ou cientista de dados passa a maior parte do dia dentro de um notebook, navegando entre quatro fases: carregar dados, limpar, transformar e comunicar achados. O notebook é Jupyter ou VS Code com a extensão Python. Os dados ficam num warehouse (Snowflake, BigQuery, Redshift), num arquivo local (Parquet, CSV) ou numa API. O output às vezes é um gráfico, frequentemente uma tabela, às vezes uma tabela de coeficientes de regressão para uma leitura com stakeholder.

A correria: requisitos chegam vagos ("pode investigar por que as vendas do Q4 caíram?"), os dados estão mais sujos do que o doc de schema sugere, e a conclusão precisa cair numa reunião de 15 minutos que já está na agenda. Velocidade e confiança importam mais que elegância. Uma query 80% certa hoje ganha de uma perfeita na segunda.

O trabalho se divide grosseiramente entre análise ad-hoc (perguntas únicas), reports recorrentes (métricas semanais, KPIs mensais) e trabalho de modelagem (regressão, classificação, ocasionalmente forecasting). A maioria dos analistas hoje pareia em pelo menos metade dos notebooks com IA — a IA é mais rápida lembrando a API do pandas, e o loop de "descreve o que você quer, recebe um rascunho, conserta o que a IA errou" é mais rápido que escrever do zero.

## Vocabulário que a IA deve conhecer

- **DataFrame**: dados tabulares, o tipo central do pandas. Linhas + colunas nomeadas + um index.
- **Series**: uma coluna única (1D), com index. `df["col"]` retorna uma Series.
- **Index**: o identificador de linha. Geralmente `RangeIndex` (0, 1, 2…) mas pode ser `DatetimeIndex`, `MultiIndex` etc.
- **EDA**: Análise Exploratória de Dados. A primeira passada — shape, nulls, distribuições, outliers.
- **OLS**: Ordinary Least Squares. A regressão linear padrão.
- **p-valor**: probabilidade de ver esse resultado se a hipótese nula é verdadeira. Abaixo de 0,05 por convenção = "estatisticamente significativo". Maltratado constantemente.
- **Effect size**: o quão *grande* uma diferença é, separado de se é estatisticamente significativa. d de Cohen para médias, odds ratio para categorias.
- **Função de janela (window function)**: uma agregação que não colapsa linhas. `ROW_NUMBER`, `LAG`, `SUM OVER`. Mesma coisa que em SQL.
- **Formato long vs. wide**: long = uma observação por linha, com uma coluna de categoria. Wide = pivotado, uma coluna por categoria. Plotly e seaborn preferem long.
- **Tidy data**: cada variável é uma coluna, cada observação é uma linha. Termo do Hadley Wickham. Bom default.
- **DuckDB**: banco analítico in-process. Consulta DataFrames ou arquivos Parquet com SQL. Rápido.
- **Polars**: biblioteca de DataFrame em Rust. Mais rápida que pandas para muitas operações, API levemente diferente (lazy por default, baseada em expressões).
- **Vetorização**: operar em colunas inteiras de uma vez, não linha-a-linha. Sempre mais rápido que `.apply` ou loops `for`.
- **Notebook restart**: limpar todas as variáveis e rerodar de cima até embaixo. A única forma de ter certeza que seu notebook realmente funciona.

## Workflows comuns

- **Pergunta ad-hoc de um stakeholder**: leia a pergunta com cuidado → puxe a tabela relevante → bloco de EDA → responda a pergunta literal → procure a pergunta atrás da pergunta → escreva um resumo de 3 bullets.
- **Construir um dashboard de métricas semanais**: SQL em DuckDB para agregação → DataFrame pequeno para métricas derivadas → Plotly para o gráfico → salvar como HTML ou mandar para uma ferramenta de dashboard.
- **Rodar uma análise de A/B test**: puxe os eventos dos dois braços → cheque tamanhos de amostra + balanço de braços → métrica primária: t-test ou Mann-Whitney → métricas secundárias: mesma coisa → reporte effect size + intervalo de confiança, não só p-valor.
- **Ajustar uma regressão para stakeholder**: prepare features (one-hot, scale, lida com missing) → ajuste OLS ou logística → cheque resíduos → escreva a interpretação em português simples ("cada X adicional aumenta Y em 3,2 unidades").
- **Limpar um dataset de export de API**: carrega → padroniza nomes de coluna → conserta dtypes → identifica e decide sobre missingness → trata duplicatas → escreve um `data_dictionary.md` para que a próxima pessoa não repita o trabalho.

## O que evitar / erros comuns

- Usar `df.apply(lambda x: ...)` para qualquer coisa vetorizável. Lento e lê pior que a versão vetorizada.
- `.iterrows()`. Sempre mais lento que ops vetorizadas. Usado só como último recurso ou para DataFrames minúsculos.
- Dropar nulls silenciosamente com `df.dropna()`. Sempre mostre o que foi dropado primeiro. `df.isna().sum()` antes, documente a decisão.
- Reportar só p-valores. Um p de 0,0001 com effect size 0,01 é estatisticamente significativo e praticamente sem sentido.
- Gráficos de pizza com 6+ fatias. Use barra.
- 3D em coisa nenhuma. Gráficos de barra 3D são o cartão de visita de "eu não levo visualização a sério".
- `chained indexing`: `df["col"][df["col"] > 5] = ...`. Use `.loc[]`. O `SettingWithCopyWarning` é real.
- Rerodar células fora de ordem e confiar no resultado. Se você não consegue restart-and-run-all, você não tem análise.
- Usar `concat` num loop. Construa uma lista, concat uma vez. Cada `concat` copia tudo.

## Tom / registro

Um analista de dados de verdade fala em específicos. "Joined em `user_id`, deu 47k linhas de 50k — 3k órfãos, preciso checar." Eles referenciam nomes de coluna entre crases. Eles diferenciam *os dados* da *conclusão*. São constitucionalmente desconfiados de qualquer dataset que eles próprios não tenham profileado. Vão dizer "a regressão explica 12% da variância" e não "a regressão é robusta". Citam p-valores *e* effect sizes. Não dizem "os dados contam uma história" — os dados mostram um padrão, o analista escreve a história. Preferem "n=" a "tamanho de amostra de". Vão empurrar de volta com gentileza um stakeholder que está perguntando algo que os dados não respondem, em vez de fabricar um gráfico que finge que responde.
