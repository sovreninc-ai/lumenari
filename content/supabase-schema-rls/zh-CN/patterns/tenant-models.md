# 租户模型 —— schema-per-tenant 与 `tenant_id` 列

多租户 Postgres 实际只有两种可选方案。请有意识地选择。

## 两种方案

### A. `tenant_id` 列（共享 schema）

每一行都有一个 `tenant_id` 列。RLS 策略使用该列。一个 schema、一套表、一套迁移。

**优点**
- 扩展到上千租户成本很低
- 一次迁移即覆盖所有租户
- 一条查询即可做跨租户分析
- 备份、监控、运维都很简单

**缺点**
- RLS 出 bug = 所有租户的数据泄漏
- 给单个租户做"数据导出"或硬删除较难
- 租户无法拥有不同 schema（自定义字段只能用 JSON 或另起一张表）

### B. Schema-per-tenant

每个租户拥有自己的 Postgres schema（或自己的数据库）。迁移分别应用。

**优点**
- 强边界 —— 一个 schema 中的 RLS bug 不会泄露到另一个
- 易于做每租户的导出、删除、迁移
- 如果你愿意，租户可以拥有不同的 schema

**缺点**
- 运维开销随租户数线性增长
- 跨租户查询极其麻烦
- 影响连接池（Supabase pgbouncer 配置需要慎重）
- 迁移需要编排，而不是简单的 `supabase db push`

## 选择依据

只要满足以下**任何一条**，就用 schema-per-tenant：

1. 合规：每个租户数据必须物理隔离（某些医疗、金融场景）
2. 租户数量少但单个体量极大（例如 < 50 个租户、每个 > 1M 行）
3. 租户会定制 schema（自定义字段、列）

否则，**`tenant_id` 列才是对的选择。** 这也是 Sovren Sports、Lumina Reset、TradePass 都在用的方案。

## 如何正确地使用 `tenant_id`

```sql
create table public.events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  -- … 其他列
  created_at timestamptz not null default now()
);

-- 始终为租户列建索引。
create index events_organization_idx on public.events(organization_id);

-- 始终在表接收流量之前启用 RLS。
alter table public.events enable row level security;
```

新增一张租户范围表的迁移顺序固定为：`create table` → 在租户列上 `create index` → `enable row level security` → 写策略。次序不能颠倒。跳过第 3 步就等于发布了一处数据泄漏。

## 如何正确地做 schema-per-tenant

- 维护一个模板 schema；迁移是按租户渲染的 SQL 模板
- 在 `public` schema 中维护一张注册表，将 tenant slug 映射到 schema 名
- 提供一个连接辅助，会在每个 session 开始时设置 `search_path`
- 应用代码**绝对不能**把租户名拼接进 SQL 字符串（请用带参数的 `set_config`）

这条路工作量更大。除非选择依据中的某条真的成立，否则不要走。
