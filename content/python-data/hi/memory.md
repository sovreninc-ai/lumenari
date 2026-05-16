# Memory — Python Data Analysis Pack

## Domain context

एक data analyst या data scientist अपना ज़्यादातर दिन एक notebook के अंदर बिताता है, चार phases के बीच move करता है: data load करना, उसे clean करना, transform करना, और findings communicate करना। Notebook Jupyter या Python extension के साथ VS Code है। Data एक warehouse (Snowflake, BigQuery, Redshift), एक local file (Parquet, CSV), या एक API में sit करता है। Output कभी एक chart, अक्सर एक table, कभी एक stakeholder readout के लिए regression coefficient table है।

Grind: requirements vague आती हैं ("क्या आप look कर सकते हैं कि Q4 sales क्यों dip हुए?"), data schema docs suggest करने से messier है, और conclusion को 15-minute meeting में land होना है जो already calendar पर है। Speed और trust elegance से अधिक matter करते हैं। एक query जो आज 80% right है Monday के एक perfect से बेहतर है।

काम roughly ad-hoc analysis (one-off questions), recurring reports (weekly metrics, monthly KPIs), और modeling work (regression, classification, कभी-कभी forecasting) में split होता है। ज़्यादातर analysts अब अपने notebooks का कम से कम आधा AI के साथ pair-code करते हैं — AI pandas API recall करने में उनसे faster है, और "describe what you want, get a draft, fix the parts the AI got wrong" का loop scratch से लिखने से faster है।

## Vocabulary जो AI को पता होनी चाहिए

- **DataFrame**: tabular data, central pandas type। Rows + named columns + एक index।
- **Series**: एक single column (1D), एक index के साथ। `df["col"]` एक Series return करता है।
- **Index**: row identifier। आमतौर पर `RangeIndex` (0, 1, 2...) लेकिन `DatetimeIndex`, `MultiIndex`, etc. हो सकता है।
- **EDA**: Exploratory Data Analysis। पहला pass — shape, nulls, distributions, outliers।
- **OLS**: Ordinary Least Squares। Standard linear regression।
- **p-value**: इस result को देखने की probability अगर null hypothesis true है। Convention के हिसाब से 0.05 से नीचे = "statistically significant।" Constantly misused।
- **Effect size**: एक difference कितना *बड़ा* है, इससे अलग कि वो statistically significant है या नहीं। Means के लिए Cohen's d, categories के लिए odds ratio।
- **Window function**: एक aggregation जो rows collapse नहीं करता। `ROW_NUMBER`, `LAG`, `SUM OVER`। SQL जैसा।
- **Long vs. wide format**: long = per row एक observation, एक category column के साथ। Wide = pivoted, per category एक column। Plotly और seaborn long prefer करते हैं।
- **Tidy data**: हर variable एक column है, हर observation एक row है। Hadley Wickham का term। Useful default।
- **DuckDB**: in-process analytics database। SQL के साथ DataFrames या Parquet files query करता है। Fast।
- **Polars**: Rust-based DataFrame library। कई operations के लिए pandas से faster, slightly अलग API (default by lazy, expression-based)।
- **Vectorization**: whole columns पर एक बार में operate करना, row-by-row नहीं। हमेशा `.apply` या `for` loops से faster।
- **Notebook restart**: सभी variables clear करना और top-to-bottom re-run करना। यह sure होने का एकमात्र तरीका है कि आपका notebook actually काम करता है।

## Common workflows

- **एक stakeholder से Ad-hoc question**: question carefully पढ़ें → relevant table pull करें → EDA block → literal question answer करें → question के पीछे का question look करें → एक 3-bullet summary लिखें।
- **एक weekly metrics dashboard build करना**: aggregation के लिए DuckDB में SQL → derived metrics के लिए small DataFrame → chart के लिए Plotly → HTML save करें या एक dashboard tool को भेजें।
- **एक A/B test analysis run करना**: दोनों arms के लिए events pull करें → sample sizes + arm balance check करें → primary metric: t-test या Mann-Whitney → secondary metrics: same → effect size + confidence interval report करें, सिर्फ p-value नहीं।
- **एक stakeholder के लिए regression fit करना**: features prepare करें (one-hot, scale, handle missing) → OLS या logistic fit करें → residuals check करें → interpretation को plain English में लिखें ("हर additional X Y को 3.2 units बढ़ाता है")।
- **एक API export से dataset clean करना**: load → column names standardize करें → dtypes fix करें → missingness identify और decide करें → duplicates handle करें → एक `data_dictionary.md` लिखें ताकि next person work repeat न करे।

## क्या avoid करें / common mistakes

- किसी भी vectorizable के लिए `df.apply(lambda x: ...)` use करना। Slow और vectorized version से worse पढ़ती है।
- `.iterrows()`। हमेशा vectorized ops से slower। केवल last resort के रूप में या tiny DataFrames के लिए use।
- `df.dropna()` के साथ silently nulls drop करना। हमेशा पहले दिखाएँ कि क्या drop हुआ। `df.isna().sum()` पहले, decision document करें।
- केवल p-values report करना। 0.0001 का p effect size 0.01 के साथ statistically significant और practically meaningless है।
- 6+ slices वाले Pie charts। एक bar chart use करें।
- 3D कुछ भी। 3D bar charts "मैंने visualization seriously नहीं ली" का calling card हैं।
- `chained indexing`: `df["col"][df["col"] > 5] = ...`। `.loc[]` use करें। `SettingWithCopyWarning` real है।
- Cells को order से बाहर re-run करना और result पर trust करना। अगर आप restart-and-run-all नहीं कर सकते, तो आपके पास actually एक analysis नहीं है।
- एक loop में `concat` use करना। एक list build करें, एक बार concat करें। हर `concat` सब कुछ copy करता है।

## Tone / register

एक real data analyst specifics में बात करता है। "`user_id` पर joined, 50k से 47k rows मिले — 3k orphans, check करना है।" वे column names को backticks में reference करते हैं। वे *data* को *conclusion* से distinguish करते हैं। वे constitutionally किसी भी dataset पर suspicious हैं जिसे उन्होंने खुद profile नहीं किया। वे कहेंगे "regression variance का 12% explain करती है" "regression robust है" नहीं। वे p-values *और* effect sizes दोनों cite करते हैं। वे "data एक story बताता है" नहीं कहते — data एक pattern दिखाता है, analyst story लिखता है। वे "sample size of" पर "n=" prefer करते हैं। वे एक stakeholder पर gently push back करेंगे जो ऐसा question पूछ रहा है जिसका data answer नहीं दे सकता, बजाय एक chart fabricate करने के जो दिखावा करे कि वो दे सकता है।
