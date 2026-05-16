# Memory — Python Data Analysis Pack

## Domänenkontext

Ein Datenanalyst oder Data Scientist verbringt die meisten Tage in einem Notebook und bewegt sich zwischen vier Phasen: Daten laden, sie bereinigen, sie transformieren und Findings kommunizieren. Das Notebook ist Jupyter oder VS Code mit der Python-Extension. Die Daten sitzen in einem Warehouse (Snowflake, BigQuery, Redshift), einer lokalen Datei (Parquet, CSV) oder einer API. Der Output ist manchmal ein Chart, oft eine Tabelle, manchmal eine Regression-Coefficient-Tabelle für einen Stakeholder-Readout.

Die Mühle: Anforderungen kommen vage rein ("Kannst du untersuchen, warum die Q4-Verkäufe eingebrochen sind?"), die Daten sind unordentlicher als die Schema-Docs suggerieren, und die Conclusion muss in einem 15-Minuten-Meeting landen, das schon im Kalender steht. Geschwindigkeit und Vertrauen zählen mehr als Eleganz. Eine Query, die heute zu 80% richtig ist, schlägt eine perfekte am Montag.

Die Arbeit teilt sich grob in Ad-hoc-Analyse (One-off-Fragen), wiederkehrende Reports (Wochen-Metriken, Monats-KPIs) und Modeling-Arbeit (Regression, Classification, gelegentlich Forecasting). Die meisten Analysten Pair-coden jetzt für mindestens die Hälfte ihrer Notebooks mit KI — die KI ist schneller darin, die pandas-API abzurufen, als sie es sind, und der Loop von "beschreibe, was du willst, bekomme einen Entwurf, fixe die Teile, die die KI falsch gemacht hat" ist schneller, als von Grund auf zu schreiben.

## Vokabular, das die KI kennen sollte

- **DataFrame**: tabellarische Daten, der zentrale pandas-Type. Zeilen + benannte Spalten + ein Index.
- **Series**: eine einzelne Spalte (1D), mit einem Index. `df["col"]` returnt eine Series.
- **Index**: der Zeilen-Identifier. Meist `RangeIndex` (0, 1, 2...), kann aber `DatetimeIndex`, `MultiIndex` etc. sein.
- **EDA**: Exploratory Data Analysis. Der erste Pass — Shape, Nulls, Distributions, Outliers.
- **OLS**: Ordinary Least Squares. Die Standard-Linear-Regression.
- **p-Wert**: Wahrscheinlichkeit, dieses Ergebnis zu sehen, wenn die Null-Hypothese wahr ist. Unter 0,05 per Konvention = "statistisch signifikant." Ständig missbraucht.
- **Effect Size**: wie *groß* ein Unterschied ist, getrennt davon, ob er statistisch signifikant ist. Cohens d für Means, Odds Ratio für Kategorien.
- **Window-Funktion**: eine Aggregation, die keine Zeilen kollabiert. `ROW_NUMBER`, `LAG`, `SUM OVER`. Wie in SQL.
- **Long- vs. Wide-Format**: long = eine Observation pro Zeile, mit einer Kategorie-Spalte. Wide = pivoted, eine Spalte pro Kategorie. Plotly und seaborn bevorzugen long.
- **Tidy Data**: jede Variable ist eine Spalte, jede Observation ist eine Zeile. Hadley Wickhams Term. Nützlicher Default.
- **DuckDB**: In-Process-Analytics-Datenbank. Queryt DataFrames oder Parquet-Files mit SQL. Schnell.
- **Polars**: Rust-basierte DataFrame-Bibliothek. Schneller als pandas für viele Operationen, leicht andere API (lazy by Default, expression-basiert).
- **Vektorisierung**: ganze Spalten auf einmal operieren, nicht zeilenweise. Immer schneller als `.apply` oder `for`-Loops.
- **Notebook-Restart**: alle Variablen löschen und top-to-bottom re-runnen. Der einzige Weg sicher zu sein, dass dein Notebook tatsächlich funktioniert.

## Häufige Workflows

- **Ad-hoc-Frage von einem Stakeholder**: die Frage sorgfältig lesen → die relevante Tabelle ziehen → EDA-Block → die wörtliche Frage beantworten → nach der Frage hinter der Frage suchen → eine 3-Bullet-Summary schreiben.
- **Ein wöchentliches Metrik-Dashboard bauen**: SQL in DuckDB für Aggregation → kleines DataFrame für abgeleitete Metriken → Plotly für den Chart → in HTML speichern oder zu einem Dashboard-Tool senden.
- **Eine A/B-Test-Analyse laufen lassen**: Events für beide Arms ziehen → Sample-Sizes + Arm-Balance prüfen → Primärmetrik: t-Test oder Mann-Whitney → Sekundärmetriken: dasselbe → Effect Size + Confidence Interval reporten, nicht nur p-Wert.
- **Eine Regression für einen Stakeholder fitten**: Features vorbereiten (One-Hot, skalieren, Missing handhaben) → OLS oder Logistic fitten → Residuals prüfen → die Interpretation in Plain English schreiben ("jedes zusätzliche X erhöht Y um 3,2 Einheiten").
- **Ein Dataset aus einem API-Export bereinigen**: laden → Spaltennamen standardisieren → Dtypes fixen → Missingness identifizieren und entscheiden → Duplikate handhaben → ein `data_dictionary.md` schreiben, damit die nächste Person die Arbeit nicht wiederholt.

## Was zu vermeiden ist / häufige Fehler

- `df.apply(lambda x: ...)` für irgendetwas Vektorisierbares nutzen. Langsam und liest sich schlechter als die vektorisierte Version.
- `.iterrows()`. Immer langsamer als vektorisierte Ops. Nur als letzter Ausweg oder für winzige DataFrames genutzt.
- Nulls still mit `df.dropna()` droppen. Zeige immer zuerst, was gedroppt wurde. `df.isna().sum()` vorher, die Entscheidung dokumentieren.
- Nur p-Werte reporten. Ein p von 0,0001 mit Effect Size 0,01 ist statistisch signifikant und praktisch bedeutungslos.
- Pie-Charts mit 6+ Slices. Nutze ein Bar-Chart.
- 3D irgendetwas. 3D-Bar-Charts sind die Visitenkarte von "Ich habe Visualisierung nicht ernst genommen."
- `Chained Indexing`: `df["col"][df["col"] > 5] = ...`. Nutze `.loc[]`. Der `SettingWithCopyWarning` ist real.
- Cells out-of-order re-runnen und dem Ergebnis vertrauen. Wenn du nicht restart-and-run-all kannst, hast du keine Analyse.
- `concat` in einem Loop nutzen. Baue eine Liste, concatte einmal. Jedes `concat` kopiert alles.

## Ton / Register

Ein echter Datenanalyst spricht in Spezifika. "Auf `user_id` gejoined, 47k Zeilen aus 50k bekommen — 3k Orphans, muss prüfen." Er referenziert Spaltennamen in Backticks. Er unterscheidet *die Daten* von *der Schlussfolgerung*. Er ist konstitutionell misstrauisch gegenüber jedem Dataset, das er nicht selbst geprofilt hat. Er wird sagen "die Regression erklärt 12% der Varianz", nicht "die Regression ist robust." Er zitiert p-Werte *und* Effect Sizes. Er sagt nicht "die Daten erzählen eine Geschichte" — die Daten zeigen ein Pattern, der Analyst schreibt die Geschichte. Er bevorzugt "n=" über "Sample-Size von." Er wird sanft einen Stakeholder zurückweisen, der eine Frage stellt, die die Daten nicht beantworten können, statt ein Chart zu fabrizieren, das so tut, als könnte sie es.
