# Pandas / DuckDB / Polars 配方

同一组操作在三个库下的写法 —— 在 notebook 中按速度、人体工学、以及其他代码用什么来选。

---

## 用哪个

| 场景 | 选用 |
| --- | --- |
| 默认。小到中等 DataFrame（< 100 万行）。已在用 pandas。 | **pandas** |
| 复杂聚合、join、窗口函数 —— SQL 更干净 | **DuckDB** |
| 直接处理 Parquet 文件而不全部加载 | **DuckDB** |
| 百万级以上行让 pandas 变慢 | **Polars** |
| 流式处理超内存数据 | **Polars（lazy）** |
| 与不熟 Polars 的人共享 notebook | **pandas** |

三者可以混用。DuckDB 返回 pandas DataFrame；Polars 用 `.to_pandas()` 转 pandas，用 `pl.from_pandas()` 从 pandas 转入。

---

## 载入数据

```python
# pandas
import pandas as pd
df = pd.read_parquet("events.parquet")
df = pd.read_csv("events.csv", parse_dates=["event_date"])
df = pd.read_sql("SELECT * FROM events WHERE event_date > '2026-01-01'", conn)

# DuckDB
import duckdb
df = duckdb.sql("SELECT * FROM 'events.parquet' WHERE event_date > '2026-01-01'").df()
# 直接查文件，不加载
duckdb.sql("SELECT user_id, COUNT(*) FROM 'events/*.parquet' GROUP BY user_id").df()

# Polars
import polars as pl
df = pl.read_parquet("events.parquet")
df = pl.read_csv("events.csv", try_parse_dates=True)
# 大文件用 lazy —— 先构造查询计划，再 collect
df = pl.scan_parquet("events.parquet").filter(pl.col("event_date") > "2026-01-01").collect()
```

---

## 选列

```python
# pandas
df[["a", "b", "c"]]
df.loc[:, ["a", "b", "c"]]

# DuckDB
duckdb.sql("SELECT a, b, c FROM df").df()

# Polars
df.select(["a", "b", "c"])
df.select(pl.col("a"), pl.col("b"), pl.col("c"))
```

---

## 过滤行

```python
# pandas
df[df["amount"] > 100]
df[(df["amount"] > 100) & (df["region"] == "CA")]
df.query("amount > 100 and region == 'CA'")

# DuckDB
duckdb.sql("SELECT * FROM df WHERE amount > 100 AND region = 'CA'").df()

# Polars
df.filter(pl.col("amount") > 100)
df.filter((pl.col("amount") > 100) & (pl.col("region") == "CA"))
```

---

## 排序

```python
# pandas
df.sort_values("amount", ascending=False)
df.sort_values(["region", "amount"], ascending=[True, False])

# DuckDB
duckdb.sql("SELECT * FROM df ORDER BY amount DESC").df()
duckdb.sql("SELECT * FROM df ORDER BY region ASC, amount DESC").df()

# Polars
df.sort("amount", descending=True)
df.sort(["region", "amount"], descending=[False, True])
```

---

## Groupby + 聚合

```python
# pandas
df.groupby("region")["amount"].sum()
df.groupby("region").agg(total=("amount", "sum"),
                         n=("amount", "count"),
                         avg=("amount", "mean"))

# DuckDB
duckdb.sql("""
    SELECT region,
           SUM(amount) AS total,
           COUNT(*) AS n,
           AVG(amount) AS avg
    FROM df
    GROUP BY region
""").df()

# Polars
df.group_by("region").agg(
    pl.col("amount").sum().alias("total"),
    pl.len().alias("n"),
    pl.col("amount").mean().alias("avg"),
)
```

---

## Join

```python
# pandas
pd.merge(orders, users, on="user_id", how="left")
pd.merge(orders, users, left_on="user_id", right_on="id", how="inner")

# DuckDB
duckdb.sql("""
    SELECT o.*, u.email
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
""").df()

# Polars
orders.join(users, on="user_id", how="left")
orders.join(users, left_on="user_id", right_on="id", how="inner")
```

每次 join 后核对行数。inner join 会静默丢未匹配行。

```python
before = len(orders)
joined = orders.merge(users, on="user_id", how="inner")
print(f"orders: {before:,} → joined: {len(joined):,} ({before - len(joined):,} dropped)")
```

---

## 新建列

```python
# pandas
df["full_name"] = df["first"] + " " + df["last"]
df["bucket"] = np.where(df["amount"] > 100, "high", "low")
df["bucket"] = pd.cut(df["amount"], bins=[-np.inf, 0, 50, 200, np.inf],
                      labels=["refund", "small", "medium", "large"])

# DuckDB
duckdb.sql("""
    SELECT *,
           first || ' ' || last AS full_name,
           CASE WHEN amount > 100 THEN 'high' ELSE 'low' END AS bucket
    FROM df
""").df()

# Polars
df.with_columns(
    full_name=pl.col("first") + " " + pl.col("last"),
    bucket=pl.when(pl.col("amount") > 100).then(pl.lit("high")).otherwise(pl.lit("low")),
)
```

---

## 窗口函数

```python
# pandas —— 组内排名
df["rank"] = df.groupby("region")["amount"].rank(method="dense", ascending=False)

# pandas —— 组内累计求和
df = df.sort_values(["region", "event_date"])
df["running_total"] = df.groupby("region")["amount"].cumsum()

# pandas —— 组内上一行（lag）
df["prev_amount"] = df.sort_values("event_date").groupby("region")["amount"].shift(1)

# DuckDB —— 更干净
duckdb.sql("""
    SELECT *,
           DENSE_RANK() OVER (PARTITION BY region ORDER BY amount DESC) AS rank,
           SUM(amount) OVER (PARTITION BY region ORDER BY event_date) AS running_total,
           LAG(amount) OVER (PARTITION BY region ORDER BY event_date) AS prev_amount
    FROM df
""").df()

# Polars
df.with_columns(
    rank=pl.col("amount").rank(method="dense", descending=True).over("region"),
    running_total=pl.col("amount").cum_sum().over("region", order_by="event_date"),
    prev_amount=pl.col("amount").shift(1).over("region", order_by="event_date"),
)
```

**建议**：窗口函数是 DuckDB 体现价值的地方。pandas 写法能跑，但读起来更差、也更容易写错。

---

## 透视 / 反透视

```python
# pandas
wide = df.pivot_table(index="user_id", columns="month", values="revenue", aggfunc="sum")
long = wide.reset_index().melt(id_vars="user_id", var_name="month", value_name="revenue")

# DuckDB
duckdb.sql("PIVOT df ON month USING SUM(revenue) GROUP BY user_id").df()
duckdb.sql("UNPIVOT wide ON jan, feb, mar INTO NAME month VALUE revenue").df()

# Polars
df.pivot(index="user_id", on="month", values="revenue", aggregate_function="sum")
df.unpivot(index="user_id", on=["jan", "feb", "mar"], variable_name="month", value_name="revenue")
```

---

## 字符串操作

```python
# pandas —— .str 访问器
df["email_domain"] = df["email"].str.split("@", n=1).str[1]
df["title_clean"] = df["title"].str.strip().str.lower()
df["has_promo"] = df["notes"].str.contains("promo", case=False, na=False)

# DuckDB —— 标准 SQL 字符串函数
duckdb.sql("""
    SELECT *,
           SUBSTRING(email FROM POSITION('@' IN email) + 1) AS email_domain,
           LOWER(TRIM(title)) AS title_clean,
           CONTAINS(LOWER(notes), 'promo') AS has_promo
    FROM df
""").df()

# Polars
df.with_columns(
    email_domain=pl.col("email").str.split("@").list.get(1),
    title_clean=pl.col("title").str.strip_chars().str.to_lowercase(),
    has_promo=pl.col("notes").str.contains("(?i)promo"),
)
```

---

## 日期

```python
# pandas
df["event_date"] = pd.to_datetime(df["event_date"])
df["year_month"] = df["event_date"].dt.to_period("M")
df["dow"] = df["event_date"].dt.day_name()
df["days_since"] = (pd.Timestamp.now() - df["event_date"]).dt.days

# DuckDB
duckdb.sql("""
    SELECT *,
           DATE_TRUNC('month', event_date) AS year_month,
           DAYNAME(event_date) AS dow,
           DATE_DIFF('day', event_date, CURRENT_DATE) AS days_since
    FROM df
""").df()

# Polars
df.with_columns(
    year_month=pl.col("event_date").dt.truncate("1mo"),
    dow=pl.col("event_date").dt.strftime("%A"),
    days_since=(pl.lit(pl.datetime("now")) - pl.col("event_date")).dt.total_days(),
)
```

---

## 空值处理

```python
# 永远先看再动。
print(df.isna().sum().sort_values(ascending=False))

# pandas
df["amount"] = df["amount"].fillna(0)
df["region"] = df["region"].fillna("unknown")
df = df.dropna(subset=["user_id"])   # 丢 user_id 为空的行

# DuckDB
duckdb.sql("""
    SELECT *,
           COALESCE(amount, 0) AS amount,
           COALESCE(region, 'unknown') AS region
    FROM df
    WHERE user_id IS NOT NULL
""").df()

# Polars
df.with_columns(
    pl.col("amount").fill_null(0),
    pl.col("region").fill_null("unknown"),
).drop_nulls(subset=["user_id"])
```

---

## 值得记的 Polars 惯用法

Polars 表达式可在 `.select()`、`.with_columns()`, `.filter()`、`.group_by().agg()` 中链式使用。同一个表达式可以构造一次、多处复用。

```python
# 构造表达式
revenue_per_user = pl.col("revenue").sum().alias("total_revenue")

# 使用
df.group_by("user_id").agg(revenue_per_user)
df.filter(pl.col("region") == "CA").group_by("user_id").agg(revenue_per_user)
```

大数据下 lazy 才是 Polars 真正的优势：

```python
result = (
    pl.scan_parquet("events/*.parquet")
    .filter(pl.col("event_date") > "2026-01-01")
    .group_by("user_id")
    .agg([pl.col("amount").sum().alias("total"),
          pl.len().alias("n")])
    .filter(pl.col("n") >= 3)
    .sort("total", descending=True)
    .collect()        # 在此之前都只是查询计划
)
```

整条流水线作为一条查询被优化。谓词下推、投影下推，没有中间 DataFrame。

---

## 快速决策树

- "我想随便看看这份数据" → **pandas**
- "我要 join 4 张表 + 窗口函数" → **DuckDB**
- "我要查一文件夹的 Parquet" → **DuckDB**，路径用 `'events/*.parquet'`
- "DataFrame 是 5000 万行，pandas 慢" → **Polars**
- "给高管做一次性的报表" → 取决于代码库其他部分在用什么
