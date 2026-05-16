# 迁移纪律

每一次 schema 变更都是一次迁移。Supabase dashboard 仅用于查看。

## 文件命名

```
supabase/migrations/0001_init.sql
supabase/migrations/0002_add_invoices.sql
supabase/migrations/0003_seasons_unique_constraint.sql
```

零填充序号，后接动词-名词描述。避免在文件名中加时间戳 —— 噪音很大，而真正的顺序由序号决定。

## 迁移必须做到

1. **幂等或事务化。** 在 Postgres 允许的地方使用 `if not exists`，或者用 `begin … exception` 包裹。
2. **在合理范围内可回滚。** 在 `-- down:` 注释块中描述回滚步骤。并非所有迁移都能干净回滚（数据迁移很少能） —— 显式说明这种情况。
3. **同步声明 RLS。** 若迁移新增了一张表，则同一文件中启用 RLS 并写好策略。绝不要把建表与启用 RLS 拆到两个迁移里。
4. **种子数据也是迁移。** 如果种子依赖 schema，那它就属于迁移。不要依赖 `seed.sql` 来填关键数据。

## 评审清单

合并迁移前：

- [ ] `create table` 与 `enable row level security` 在同一文件中成对出现
- [ ] 每张租户范围表都有对应租户列的索引
- [ ] 每个外键都明确选择了 `on delete` 行为（cascade vs. set null vs. restrict）
- [ ] 策略中没有 `select *` —— 显式列出列名
- [ ] 任何 `security definer` 函数都设置了 `set search_path = public`
- [ ] 如果迁移给列加默认值，要先设默认值，再加 `not null`（否则会强制 rewrite）
- [ ] 如果迁移加 check 约束，要确保现有行能通过
- [ ] 如果迁移涉及数据回填，要包在事务中，并在结尾断言行数

## PR 评审中需要指出的反模式

- 删列前没有验证是否还有读路径
- 直接重命名列（请用 加新列 + 回填 + 跨两次部署后删旧列 的方式）
- 给已有列加 `unique` 前没有先检查重复
- 改列类型时没有显式的 `using` 子句

## 回滚方案

### 刚加的列

```sql
-- 回滚 0017_add_phone.sql
begin;
alter table public.profiles drop column phone;
commit;
```

### 发布了错误的 RLS 策略

```sql
-- 回滚一条过于宽松的策略
begin;
drop policy if exists "events read by all" on public.events;
create policy "events read by org members"
  on public.events for select
  using (public.is_member_of(organization_id));
commit;
```

### 误对错行执行了数据迁移

这是最危险的一种。可选项：

1. 从最近一次 point-in-time 快照恢复（Supabase Pro+ 特性）
2. 如果你保留了足够的状态，回放一次反向迁移
3. 根据日志手动修复

教训：**合并前先用近期的生产快照在 staging 上预演数据迁移。**

## 本地工作流

```bash
# 创建新的迁移文件
supabase migration new add_invoices

# 本地应用
supabase db reset

# 由新 schema 生成类型
supabase gen types typescript --local > src/types/database.ts

# 推送到 staging 分支（不是 prod）进行验证
git push origin staging
# Vercel preview + Supabase 分支数据库会端到端运行新迁移
```

绝不要从本地直接 `db push` 到 prod。所有变更都走 CI。
