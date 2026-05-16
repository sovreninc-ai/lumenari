# 快速开始 — Python 数据分析套件

不到一分钟即可上手。

## ChatGPT、Claude（网页版）或 Gemini

1. 打开对应工具
2. 将 `optimization-pack.md` 的全部内容粘贴到系统提示词 / 自定义指令 / 项目知识库字段中
3. 开始让它把 SQL 翻译成 pandas、对你的数据做 EDA、拟合回归、或出图

## Claude Code、Cursor 或 Codex（SKILL.md 路径）

1. 打开终端（或你的代码编辑器）
2. 将套件文件夹放入 `~/.claude/skills/python-data/`（Claude Code）；或在 Cursor / Codex 项目根目录中粘贴 `SKILL.md`
3. 直接说出你的需求 —— Claude 会自动加载该技能

## 验证是否生效

粘贴这句话："我有一个 DataFrame `df`，列为 `user_id`、`event_date`、`revenue`。请给我 2026 年事件的每用户总收入，仅保留事件数 ≥ 3 的用户，按降序排列。使用 DuckDB。"

如果返回的是 `duckdb.sql("SELECT user_id, SUM(revenue) ... HAVING COUNT(*) >= 3 ...")`，没有道歉、没有 `.iterrows()`、也没有 pandas 绕路 —— 说明套件已正确加载。
