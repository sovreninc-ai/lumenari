# Memoria — Pack de Análisis de Datos en Python

## Contexto del dominio

Un analista de datos o data scientist pasa la mayor parte del día adentro de un notebook, moviéndose entre cuatro fases: cargar data, limpiarla, transformarla y comunicar hallazgos. El notebook es Jupyter o VS Code con la extensión de Python. La data está en un warehouse (Snowflake, BigQuery, Redshift), un archivo local (Parquet, CSV) o una API. La salida a veces es un gráfico, muchas veces una tabla, a veces una tabla de coeficientes de regresión para un readout a stakeholders.

El día a día: los requisitos llegan vagos ("¿puedes investigar por qué bajaron las ventas de Q4?"), la data está más sucia de lo que sugiere la doc del schema, y la conclusión tiene que aterrizar en una reunión de 15 minutos que ya está en el calendario. La velocidad y la confianza importan más que la elegancia. Una query 80% correcta hoy le gana a una perfecta el lunes.

El trabajo se divide aproximadamente en análisis ad-hoc (preguntas one-off), reportes recurrentes (métricas semanales, KPIs mensuales) y trabajo de modelado (regresión, clasificación, ocasionalmente forecasting). La mayoría de los analistas hacen pair-coding con IA en al menos la mitad de sus notebooks ahora — la IA es más rápida recordando la API de pandas que ellos, y el loop de "describe lo que quieres, recibe un draft, arregla las partes que la IA agarró mal" es más rápido que escribir desde cero.

## Vocabulario que la IA debe conocer

- **DataFrame**: data tabular, el type central de pandas. Filas + columnas con nombre + un index.
- **Series**: una sola columna (1D), con un index. `df["col"]` devuelve una Series.
- **Index**: el identificador de fila. Usualmente `RangeIndex` (0, 1, 2...) pero puede ser `DatetimeIndex`, `MultiIndex`, etc.
- **EDA**: Exploratory Data Analysis. La primera pasada — shape, nulls, distribuciones, outliers.
- **OLS**: Ordinary Least Squares. La regresión lineal estándar.
- **p-value**: probabilidad de ver este resultado si la hipótesis nula es cierta. Bajo 0.05 por convención = "estadísticamente significativo". Mal usado constantemente.
- **Tamaño del efecto**: qué tan *grande* es una diferencia, separado de si es estadísticamente significativa. Cohen's d para medias, odds ratio para categorías.
- **Window function**: una agregación que no colapsa filas. `ROW_NUMBER`, `LAG`, `SUM OVER`. Igual que en SQL.
- **Formato long vs. wide**: long = una observación por fila, con una columna de categoría. Wide = pivoteado, una columna por categoría. Plotly y seaborn prefieren long.
- **Tidy data**: cada variable es una columna, cada observación es una fila. Término de Hadley Wickham. Default útil.
- **DuckDB**: base de datos analítica in-process. Queryea DataFrames o archivos Parquet con SQL. Rápida.
- **Polars**: librería de DataFrame basada en Rust. Más rápida que pandas para muchas operaciones, API levemente distinta (lazy por default, basada en expresiones).
- **Vectorización**: operar sobre columnas enteras de una, no fila por fila. Siempre más rápido que `.apply` o loops `for`.
- **Restart del notebook**: limpiar todas las variables y re-correr de arriba a abajo. La única forma de estar seguro de que tu notebook realmente funciona.

## Flujos comunes

- **Pregunta ad-hoc de un stakeholder**: lee la pregunta con cuidado → trae la tabla relevante → bloque de EDA → responde la pregunta literal → busca la pregunta detrás de la pregunta → escribe un resumen de 3 bullets.
- **Construir un dashboard semanal de métricas**: SQL en DuckDB para agregación → DataFrame chico para métricas derivadas → Plotly para el gráfico → save a HTML o enviar a una herramienta de dashboard.
- **Correr un análisis de A/B test**: trae los eventos para ambos brazos → chequea tamaños de muestra + balance de brazos → métrica primaria: t-test o Mann-Whitney → métricas secundarias: lo mismo → reporta tamaño de efecto + intervalo de confianza, no solo p-value.
- **Ajustar una regresión para un stakeholder**: prepara features (one-hot, scale, manejar missing) → ajusta OLS o logistic → chequea residuales → escribe la interpretación en español llano ("cada X adicional aumenta Y en 3.2 unidades").
- **Limpiar un dataset desde un export de API**: cargar → estandarizar nombres de columnas → arreglar dtypes → identificar y decidir sobre missingness → manejar duplicados → escribir un `data_dictionary.md` para que la próxima persona no repita el trabajo.

## Qué evitar / errores comunes

- Usar `df.apply(lambda x: ...)` para cualquier cosa vectorizable. Lento y se lee peor que la versión vectorizada.
- `.iterrows()`. Siempre más lento que ops vectorizadas. Solo como último recurso o para DataFrames diminutos.
- Tirar nulls en silencio con `df.dropna()`. Muestra primero qué se tiró. `df.isna().sum()` antes, documenta la decisión.
- Reportar solo p-values. Un p de 0.0001 con tamaño de efecto 0.01 es estadísticamente significativo y prácticamente sin sentido.
- Pie charts con 6+ slices. Usa un bar chart.
- Nada en 3D. Los bar charts en 3D son la firma de "no me tomé la visualización en serio".
- `chained indexing`: `df["col"][df["col"] > 5] = ...`. Usa `.loc[]`. El `SettingWithCopyWarning` es real.
- Re-correr celdas fuera de orden y confiar en el resultado. Si no puedes restart-and-run-all, no tienes un análisis.
- Usar `concat` en un loop. Construye una lista, concatena una vez. Cada `concat` copia todo.

## Tono / registro

Un analista de datos real habla en específicos. "Joineé en `user_id`, salieron 47k filas de 50k — 3k huérfanas, hay que chequear". Cita los nombres de columna en backticks. Distingue *la data* de *la conclusión*. Es constitucionalmente sospechoso de cualquier dataset que no haya perfilado él mismo. Va a decir "la regresión explica el 12% de la varianza" no "la regresión es robusta". Cita p-values *y* tamaños de efecto. No dice "la data cuenta una historia" — la data muestra un patrón, el analista escribe la historia. Prefiere "n=" antes que "sample size of". Va a empujar de vuelta con suavidad contra un stakeholder que pregunta algo que la data no puede responder, antes que fabricar un gráfico que pretenda que sí.
