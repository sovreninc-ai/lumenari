# PR 就绪清单

提交 PR 之前请逐项过一遍。目标是 "资深工程师能否一遍读完就 +1？"

## 代码质量

- [ ] `npm run typecheck` 通过
- [ ] `npm run lint` 通过
- [ ] `npm run build` 通过
- [ ] 没有遗留的 `console.log`（使用 logger 或删除）
- [ ] 没有注释掉的代码块
- [ ] 新文件顶部至少有 docblock 说明用途

## 类型安全

- [ ] 没有 `any`（改用 `unknown` + narrowing）
- [ ] 没有未经注释解释的 `as Type` 断言
- [ ] Component props 使用显式 interface，而非内联 `{a, b}: {a: string; b: number}`
- [ ] 所有异步函数要么 await 要么返回 promise；fire-and-forget 必须附注释

## 数据层

- [ ] Schema 变更位于 `supabase/migrations/` 下的迁移文件中
- [ ] 新表已启用 RLS 并配置显式策略
- [ ] Service-role 客户端仅在 route handler / server action 中 import
- [ ] 含敏感列的表禁止 `select *`

## 安全

- [ ] 用户输入在落库前已经过 Zod schema
- [ ] 金额以整数分存储与计算
- [ ] 客户端代码与 `NEXT_PUBLIC_*` 环境变量中没有任何机密
- [ ] CSRF 暴露面（server actions、route handlers）已做鉴权

## UX

- [ ] 表单具备可访问的 label + `aria-invalid` + 可见的错误提示
- [ ] 任何 >300ms 的操作有 loading 状态
- [ ] 任何可能为空的列表有 empty 状态
- [ ] 在 320px 视口下可用（在 DevTools 中测试）
- [ ] 移动端触控目标 ≥44pt

## 测试

- [ ] 修改了 RLS？已有跨租户边界的集成测试
- [ ] 修改了支付或金额路径？已有 webhook 幂等性测试
- [ ] 修改了鉴权？已测试未鉴权请求会被拒绝

## 运维

- [ ] PR 标题是语义化提交（`feat:`、`fix:`、`refactor:` …）
- [ ] PR 描述包含：是什么、为什么、如何测试
- [ ] 如果本次 PR 改变了架构决策，DECISIONS.md 已更新
- [ ] 如果本次 PR 推进了项目状态，STATE.md 已更新

## "睡眠测试"

> 合并后你能立刻上床睡觉，并接受它在 8 小时无人值守状态下运行吗？

如果不能 —— 缺什么测试、告警或 feature flag？
