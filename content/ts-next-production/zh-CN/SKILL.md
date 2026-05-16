# TypeScript + Next.js 生产级技能包

> 将本套件放在项目根目录并命名为 `SKILL.md`，或将其粘贴到你的 AI 的系统提示词中。它能教会 Claude（或任何具备代码能力的模型）编写出经得起真实用户考验的 Next.js + Supabase 代码。

**适配工具：** Claude · Claude Code · Cursor。

---

## 工作模式

你正在与一位资深工程师协作，开发一个部署到 Vercel、由 Supabase Postgres + Auth + Storage 支持的 Next.js 14/15 App Router 代码库。请采用以下默认设置：

- **TypeScript 严格模式。** 禁止使用 `any`。在类型推断良好的情况下优先使用推断类型而非显式标注。
- **服务端优先。** Server Components、Server Actions 和 Route Handlers 是默认选择。Client Components 必须是出于状态或交互需求的有意决策。
- **RLS 作为安全边界。** 所有涉及用户数据的操作都通过 anon Supabase 客户端进行，由 Postgres RLS 强制执行访问控制。service role key 绝不出现在客户端代码中。
- **仅使用迁移文件。** 所有 schema 变更都存放在 `supabase/migrations/*.sql` 中。绝不在 dashboard 中直接修改。
- **金额以分为单位。** 整数分 + 货币代码。默认 CAD。
- **时间使用 UTC**，在边界处转换；展示时使用用户所在时区。

当用户描述一项功能时，仅在某个关键决策确实存在歧义时才提出一个澄清问题。否则请选择一个合理的默认方案并简要说明。

---

## 文件约定

```
src/
  app/                         # 路由
    (marketing)/               # 用于布局的路由分组
    [tenant]/                  # 如需多租户的路由段
    api/
      <resource>/route.ts      # POST/GET handlers，仅服务端
  components/                  # PascalCase，每个文件一个组件
  lib/
    supabase.ts                # 单例客户端（anon + service）
    stripe.ts
    env.ts                     # required() 辅助函数，缺失时显式抛错
    auth.ts                    # session 辅助函数
  data/                        # 静态目录、常量、枚举
  hooks/                       # useXxx React hooks
supabase/
  migrations/0001_init.sql
  migrations/0002_*.sql
```

命名规范：
- SQL 标识符使用 `snake_case`
- React 组件、TS interface、TS type 使用 `PascalCase`
- 变量、函数、props 使用 `camelCase`
- 文件路径、URL slug、CSS 类名使用 `kebab-case`

---

## 何时使用什么

| 需求 | 使用 |
| --- | --- |
| 为页面获取数据 | Server Component，`async function Page()` |
| 通过表单变更数据 | Server Action |
| 通过第三方 webhook 变更数据 | `app/api/...` 下的 route handler |
| 在客户端获取数据（少见） | Route handler + `useSWR` 或 React Query |
| 乐观 UI | `useOptimistic` + Server Action |
| 长时任务 | Edge Function 或 pg_cron（参见 Supabase 包） |

避免：在客户端直接 fetch 你自己的数据库。避免：在浏览器可访问的位置传递 service-role key。

---

## 提交 PR 前的预检清单

1. `npm run typecheck` 和 `npm run lint` 均通过。
2. 修改了 `*.sql`？必须在迁移文件中，而不是 dashboard 中点击修改。
3. 修改了 RLS？必须有一个集成测试证明该边界对无关租户依旧成立。
4. 修改了支付代码？必须有 webhook 幂等性测试。
5. 修改了任何面向用户的界面？必须在 320px 视口下、44pt 触控目标可用。
6. 如果架构发生变化，README 或 PROJECT-OS 文件（STATE.md / DECISIONS.md）已更新。

任何一项未通过，下一步就该修这个——而不是去做下一个功能。

---

## 套件中的配套文档

- `patterns/supabase-clients.md` — server、client 与 admin Supabase 单例模式
- `patterns/server-actions.md` — 何时及如何使用，包含校验与错误处理的标准形态
- `patterns/forms-and-validation.md` — Zod schema、乐观 UI、可访问的错误提示
- `checklists/pr-ready.md` — 上述预检清单的详细版本
