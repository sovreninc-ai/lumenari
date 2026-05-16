# Memory — Python Data Analysis Pack

## Domain context

A data analyst or data scientist spends most of their day inside a notebook, moving between four phases: loading data, cleaning it, transforming it, and communicating findings. The notebook is Jupyter or VS Code with the Python extension. The data sits in a warehouse (Snowflake, BigQuery, Redshift), a local file (Parquet, CSV), or an API. The output is sometimes a chart, often a table, sometimes a regression coefficient table for a stakeholder readout.

The grind: requirements arrive vague ("can you look into why Q4 sales dipped?"), the data is messier than the schema docs suggest, and the conclusion has to land in a 15-minute meeting that's already on the calendar. Speed and trust matter more than elegance. A query that's 80% right today beats a perfect one Monday.

The work splits roughly into ad-hoc analysis (one-off questions), recurring reports (weekly metrics, monthly KPIs), and modeling work (regression, classification, occasionally forecasting). Most analysts pair-code with AI for at least half their notebooks now — the AI is faster at recalling the pandas API than they are, and the loop of "describe what you want, get a draft, fix the parts the AI got wrong" is faster than writing from scratch.

## Vocabulary the AI should know

- **DataFrame**: tabular data, the central pandas type. Rows + named columns + an index.
- **Series**: a single column (1D), with an index. `df["col"]` returns a Series.
- **Index**: the row identifier. Usually `RangeIndex` (0, 1, 2...) but can be `DatetimeIndex`, `MultiIndex`, etc.
- **EDA**: Exploratory Data Analysis. The first pass — shape, nulls, distributions, outliers.
- **OLS**: Ordinary Least Squares. The standard linear regression.
- **p-value**: probability of seeing this result if the null hypothesis is true. Below 0.05 by convention = "statistically significant." Misused constantly.
- **Effect size**: how *big* a difference is, separate from whether it's statistically significant. Cohen's d for means, odds ratio for categories.
- **Window function**: an aggregation that doesn't collapse rows. `ROW_NUMBER`, `LAG`, `SUM OVER`. Same as in SQL.
- **Long vs. wide format**: long = one observation per row, with a category column. Wide = pivoted, one column per category. Plotly and seaborn prefer long.
- **Tidy data**: each variable is a column, each observation is a row. Hadley Wickham's term. Useful default.
- **DuckDB**: in-process analytics database. Queries DataFrames or Parquet files with SQL. Fast.
- **Polars**: Rust-based DataFrame library. Faster than pandas for many operations, slightly different API (lazy by default, expression-based).
- **Vectorization**: operating on whole columns at once, not row-by-row. Always faster than `.apply` or `for` loops.
- **Notebook restart**: clearing all variables and re-running top-to-bottom. The only way to be sure your notebook actually works.

## Common workflows

- **Ad-hoc question from a stakeholder**: read the question carefully → pull the relevant table → EDA block → answer the literal question → look for the question behind the question → write a 3-bullet summary.
- **Build a weekly metrics dashboard**: SQL in DuckDB for aggregation → small DataFrame for derived metrics → Plotly for the chart → save to HTML or send to a dashboard tool.
- **Run an A/B test analysis**: pull events for both arms → check sample sizes + arm balance → primary metric: t-test or Mann-Whitney → secondary metrics: same → report effect size + confidence interval, not just p-value.
- **Fit a regression for a stakeholder**: prepare features (one-hot, scale, handle missing) → fit OLS or logistic → check residuals → write the interpretation in plain English ("each additional X increases Y by 3.2 units").
- **Clean a dataset from an API export**: load → standardize column names → fix dtypes → identify and decide on missingness → handle duplicates → write a `data_dictionary.md` so the next person doesn't repeat the work.

## What to avoid / common mistakes

- Using `df.apply(lambda x: ...)` for anything vectorizable. Slow and reads worse than the vectorized version.
- `.iterrows()`. Always slower than vectorized ops. Used only as a last resort or for tiny DataFrames.
- Dropping nulls silently with `df.dropna()`. Always show what got dropped first. `df.isna().sum()` before, document the decision.
- Reporting only p-values. A p of 0.0001 with effect size 0.01 is statistically significant and practically meaningless.
- Pie charts with 6+ slices. Use a bar chart.
- 3D anything. 3D bar charts are the calling card of "I haven't taken visualization seriously."
- `chained indexing`: `df["col"][df["col"] > 5] = ...`. Use `.loc[]`. The `SettingWithCopyWarning` is real.
- Re-running cells out of order and trusting the result. If you can't restart-and-run-all, you don't actually have an analysis.
- Using `concat` in a loop. Build a list, concat once. Each `concat` copies everything.

## Tone / register

A real data analyst speaks in specifics. "Joined on `user_id`, got 47k rows from 50k — 3k orphans, need to check." They reference column names in backticks. They distinguish *the data* from *the conclusion*. They are constitutionally suspicious of any dataset they haven't profiled themselves. They will say "the regression explains 12% of the variance" not "the regression is robust." They cite p-values *and* effect sizes. They do not say "the data tells a story" — the data shows a pattern, the analyst writes the story. They prefer "n=" over "sample size of." They will gently push back on a stakeholder who's asking a question the data can't answer, rather than fabricate a chart that pretends it can.
