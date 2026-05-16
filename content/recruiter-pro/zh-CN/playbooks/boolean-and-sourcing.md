# 布尔与 sourcing 手册

多数 sourcing 差,是因为布尔字符串差。多数布尔差,是因为它们假设所有候选人都用同样的方式活在 LinkedIn 上。这本手册修复两边 —— 每个平台的字符串构造器,以及哪个平台找哪个职位族、哪个级别的 sourcing 手册。

---

## 第 1 部分 —— 布尔字符串解剖

每条好的布尔有四个动作:

1. **必须的技能/头衔** —— 必需,通常用引号字符串,以 AND 串联
2. **可选技能** —— 扩大网,以 OR 串联
3. **排除项** —— 你不想要的,用 NOT
4. **上下文信号** —— 公司类型、级别指标、地点

### 通用运算符

- `AND` —— 两项都必须出现
- `OR` —— 任一项
- `NOT`(在多数搜索引擎里用 `-`)—— 排除
- `"引号短语"` —— 精确匹配(空格也算)
- `(括号)` —— 运算符分组

### 平台专属运算符

- LinkedIn Recruiter 的 filter 是字段(Title、Skills、Company 等),在 UI 里切换,**不在**搜索串里写
- 公开 LinkedIn 搜索的 keywords 字段支持基础布尔,但更受限
- Google X-ray 搜索使用 site:linkedin.com/in/ 和完整布尔
- GitHub 搜索支持 `language:`、`location:`、`followers:>X` 等

---

## 第 2 部分 —— LinkedIn Recruiter 字符串

LinkedIn Recruiter 最简单,因为平台本身把字段分开了。

### 提示词

```
你是 Recruiter Co-Pilot。

帮我构造一条 LinkedIn Recruiter 搜索。

**目标角色:** [title]
**级别:** [Entry/Mid/Senior/Staff/Principal]
**必须的技能:** [list]
**可选技能:** [list]
**想要的行业/公司类型:** [例如 "B2B SaaS, Series A-C, 50-300 employees"]
**想要排除的行业/公司类型:** [例如 "enterprise consulting, agencies"]
**地点:** [城市 + 半径,或 remote-anywhere]
**任期偏好:** [例如 "at current role 1+ years"]

给我:
1. keywords 字段的布尔字符串
2. 每个 filter 字段该怎么设(Title、Skills、Industry、Company、Location、Years of experience)
3. 第一次结果过多或过少时的 2-3 个变体
4. 常见误命中模式
```

### 范例 —— Senior Backend Engineer

> **LinkedIn Recruiter 配置:**
>
> **Title filter:** (Senior OR Sr OR Staff) AND (Backend OR "Back-end" OR "Back end" OR Server)
>
> **Skills filter:** Node.js、TypeScript、PostgreSQL(三项都要求)
>
> **Keywords 字段布尔:**
> ```
> ("Node.js" OR "Node" OR Typescript) AND (Postgres OR PostgreSQL) AND (AWS OR GCP) NOT ("recruiter" OR "recruiting" OR "tech evangelist")
> ```
>
> **Industry filter:** Computer Software、Internet、Financial Services(按相关性勾选)
>
> **Company filter:** 排除:agencies、consultancies、大型企业(Cognizant、Infosys、TCS、Accenture、Deloitte、Capgemini),如果你只想要产品公司经验
>
> **Years of Experience:** 6+(不要卡 10;资深质量通常 6-8 年出现)
>
> **地点:** 按指定
>
> **结果过多时的变体:**
> - 加任期 filter:在现公司 1+ 年(滤掉跳槽党 + 排除刚被对手挖走的人)
> - 收紧地点半径
> - 加具体行业信号(FinTech / HealthTech 等)
>
> **结果过少时的变体:**
> - 去掉一个必须的技能,变为偏好
> - 扩到 Mid(常常具备资深质量)
> - 放松公司 filter
>
> **要警惕的误命中:**
> - "Senior" 头衔出现在那些把 2 年工龄叫 Senior 的公司(咨询、agency)
> - 只做 Python 或 Java 的后端工程师(你的栈是 Node)—— 看 profile 详情核实
> - 同时有 "open to work" 绿环 AND 在现公司不满 1 年的 —— 可能是跳槽党,也可能是被裁的强候选人。仔细看。

### LinkedIn Recruiter —— 常见布尔模式

| 用例 | 字符串示例 |
|---|---|
| 找用特定工具的人 | `("Datadog" OR "PagerDuty") AND ("Kubernetes" OR "EKS")` |
| 找在会议上**演讲**过的人 | `(speaker OR keynote OR "spoke at")` |
| 找开源贡献者 | `("open source" OR "OSS" OR github)` |
| 找特定公司家族出身的人 | `("ex-Stripe" OR "former Stripe" OR "previously at Stripe")` |
| 排除招聘人和讲师 | `NOT (recruiter OR "talent acquisition" OR trainer OR "tech evangelist")` |

---

## 第 3 部分 —— 公开 LinkedIn 搜索

当你不在 Recruiter 里,或作为补充时。

### 格式

LinkedIn keywords 字段支持布尔,但更受限。括号嵌套不超过两层。引号短语可用。

```
("Senior Backend Engineer" OR "Senior Software Engineer") AND ("Node.js" OR Typescript) AND Postgres NOT recruiter
```

结合 UI 里的地点和当前公司 filter,这套已经走得很远。

### Google X-ray 搜索(LinkedIn 搜索被限时)

Google X-ray 能给出 LinkedIn 可能对未登录用户隐藏的结果。

```
site:linkedin.com/in/ ("Senior Backend Engineer" OR "Senior Software Engineer") "Node.js" "Postgres" "San Francisco" -intitle:"profiles" -inurl:dir/
```

变体:

- 加 `-intitle:"profiles"` 跳过 LinkedIn 目录页
- 加 `"open to work"` 找已发出开放信号的人
- 加 `"intern"` 用于**不**排除 —— 负号 `-intern` 会过滤掉初级 profile

---

## 第 4 部分 —— GitHub sourcing

GitHub 才是资深工程师真正活着的地方。信号在代码里,不在 bio 里。

### 搜索模式

**按语言 + 地点:**
```
location:Toronto language:typescript followers:>50
```

**按对特定 repo 的开源贡献:**
- 进入 repo
- 点 "Insights" → "Contributors"
- 按过去一年 commit 数排序
- 交叉核对顶级贡献者的 profile,看招聘信号

**按近期活跃度:**
```
location:"San Francisco" language:rust followers:>100
```
然后按 "Most followed" 筛或看 contributions 图看近期活跃。

**找写过教程或长文的人:**
- 在 Twitter/X 搜 GitHub repo:`from:@person github.com/`
- 或用 Google:`site:github.com "tutorial" "production" "we built"`

### GitHub profile 上看什么

- Pinned repos 的 README 读起来好 —— "工程师 + 表达力" 信号
- 近期活跃(过去 3 个月有 contribution)
- 自有项目 + 对知名 OSS 项目的贡献兼有
- Followers > 50 是社区存在感的软信号
- Bio 写了当前公司(省去交叉查找)

### **不是**信号的东西

- 单看 repo 数量高 —— 多数是 fork
- bio 上挂 "AWS Certified" 徽章 —— 纸面信号
- 项目有 star 但 2 年没 commit

---

## 第 5 部分 —— sourcing 手册

哪个职位族、哪个级别该去哪里找。诚实答案始终是"看情况",但手册会缩小范围。

### 工程

| 级别 | 主要来源 | 次要来源 | 什么有效 |
|---|---|---|---|
| Junior | LinkedIn(应届 + 训练营) | 训练营校友网络(Bloc、App Academy、Lambda 等) | 直接外联,但预期回复率较低 |
| Mid | LinkedIn Recruiter | GitHub(活跃贡献者) | 外联里引用具体项目 |
| Senior | GitHub > LinkedIn | 会议演讲者、OSS 贡献者 | 同侪语气外联,要求技术具体性 |
| Staff/Principal | 推荐 + GitHub + Twitter/X | LinkedIn 几乎无效 —— 他们忽略 InMail | 雇一个他们尊重的人;暖介绍是 InMail 的 10 倍 |

资深+ 工程师:**不要**首先在 LinkedIn 上 sourcing。从他们**自己的**内容开始 —— 博客、OSS 贡献、会议演讲。他们的 LinkedIn 是最后才更新的地方。

### 设计(Product / Brand)

| 级别 | 主要来源 | 次要来源 | 什么有效 |
|---|---|---|---|
| Junior | LinkedIn + Dribbble / Figma Community | 训练营校友 | 作品集具体性 |
| Mid | Dribbble + Figma Community + LinkedIn | Twitter 设计社区 | 称赞具体作品 |
| Senior | 个人网站 + Dribbble + Twitter | LinkedIn(低优先级) | 引用他们实际作品,不是岗位 |
| Director | 推荐 + Twitter | LinkedIn | 仅靠暖介绍 |

设计师维护作品集,不是 LinkedIn。作品集**本身就是**来源。

### 销售(AE、SDR、CS)

| 级别 | 主要来源 | 次要来源 | 什么有效 |
|---|---|---|---|
| SDR | LinkedIn + RepVue + Bravado | 行业活动 | 薪酬透明、成长路径 |
| Mid AE | LinkedIn(他们在这里非常活跃) | RepVue(用于 ICP 契合研究) | 具体辖区 + 薪酬区间 |
| Senior AE | LinkedIn + 推荐 | 行业 Slack(RevGenius、Pavilion) | 配额达成数据 + 产品细节 |
| VP/CRO | 推荐 + 投资人网络 | 重度高管搜索 | 必须暖介绍;冷外联 1-2% |

LinkedIn 就是销售人活着的地方。他们的整个职业身份都在那里。

### Operations / G&A

| 级别 | 主要来源 | 次要来源 | 什么有效 |
|---|---|---|---|
| Junior/Mid | LinkedIn + Pavilion(ops 用) | 行业群(如 People Geeks for HR) | 具体范围描述 |
| Senior | LinkedIn + 推荐 + Pavilion | 行业社区 | 对起点的真话 |
| Director/VP | 推荐 + 高管搜索 | LinkedIn(低 ROI) | 网络介绍 |

Ops 的人常常在 LinkedIn 上隐身,因为一直被招。社区里信号更高。

### 产品(PM、产品负责人)

| 级别 | 主要来源 | 次要来源 | 什么有效 |
|---|---|---|---|
| APM/Mid | LinkedIn | Mind the Product 社区 | 产品细节、成长路径 |
| Senior | LinkedIn + Mind the Product + Lenny's Newsletter 圈 | Twitter(活跃 PM 在那里发) | 领域具体性 |
| Director/VP | 推荐 + Reforge 校友 | LinkedIn(低优先级) | 暖介绍 |

资深 PM 通常很在线 —— Twitter、Substack、播客出场。引用他们公开分享过的东西。

---

## 第 6 部分 —— 在哪里找多元候选人(不搞表演)

这段写给真心想拓宽漏斗、不想搞秀的招聘人。

### 原则

多元 pipeline 来自在你默认渠道之外的地方做 sourcing。它**不**来自基于受保护类别过滤的搜索串(在多数司法辖区违法,即便平台允许)。

### 有帮助的社区

- **工程:** Out in Tech、Lesbians Who Tech、/dev/color、Black Tech Pipeline、Latinas in Tech、Women Who Code
- **设计:** People of Craft(POC 设计师)、Hexagon(设计领域 women+)
- **销售:** Sistas In Sales、Hispanic Star、Women in Sales Everywhere
- **产品:** Women in Product、大型社区中的 PM 网络

大多数有 job board、Slack 工作区、活动日历。把岗位发到其中一个,信号通常比再跑一次 LinkedIn 搜索高 10 倍。

### **不要**做的

- 在 LinkedIn 上搜 "diversity" 或 "women" —— 在很多地方违法,即便合法也没用
- 用候选人照片筛"可见多元" —— 违法、有偏见、且数据本就不可靠
- 用名字代理种族 —— 偏见严重且频繁出错
- 在 JD 底部贴"我们是包容的工作场所"模板,但其他地方满是 "rockstar ninja" —— 候选人一眼看穿

### 什么有效

- 在上面列出的社区里 sourcing
- 真正拥有包容的工作环境(育儿假、弹性工作、真实 ERG、多元领导层),让你的 JD 诚实反映
- 公平薪酬(公开薪酬区间;按级别定 band,不按谈判强势定)
- 在每一阶段跟踪漏斗多元度 —— sourced、screened、interviewed、offered、accepted。下滑点告诉你哪里坏了。

---

## 第 7 部分 —— sourcing 节奏 + 外联指标

### 现实数字

一家 Series B 公司、品牌尚可,招一个资深工程岗:

- 50 个候选人 sourcing 名单
- 外联回复率:15-25%(3 行消息,带薪酬 + 具体理由)
- 电话筛选转化:回复的 50%
- 首轮面试转化:筛选的 50%
- Offer:从 50 个里 1-2 个

如果你回复率低于 10%,问题几乎一定是:
- 通用外联(没有针对该候选人的具体理由)
- 没写薪酬区间
- 主题行("Exciting opportunity at...")
- 与级别不匹配的语气(给 Staff 工程师发模板)

如果你回复率高于 30%,可能 sourcing 范围太窄。扩大池。

### 外联节奏

- 第 1 天:第一条消息
- 第 5-7 天:一次跟进(换角度 —— 例如第一条以问题切入;跟进以团队切入)
- 第 14 天:最后一次跟进(短 —— "我还在,还感兴趣,时机不对没关系")
- 然后停。三条消息后,门留着即可。

超过三次,你就成了打扰。坚持发到第四第五次的招聘人,会为整家公司的招聘烧坏品牌。

---

## 工具包会标记的常见布尔/sourcing 错误

- **太多 AND。** 每个 AND 都收窄。5+ AND 子句通常返回不到 50 个结果,且多数不是你要的。
- **没有 NOT 子句。** 你会被讲师、招聘人、咨询淹没。永远排除。
- **只搜头衔。** "Senior Backend Engineer" 在不同公司差异巨大。也按技能 + 成果搜。
- **在 LinkedIn 上搜资深+ 工程师。** 他们的 LinkedIn 是过期的。去 GitHub、会议名单、OSS 贡献者列表。
- **远程岗位没有地点限定。** 即便 "remote-anywhere",通常也有时区约束。按时区 filter,而不是只按 remote。
- **sourcing 着每个招聘人都在 sourcing 的同 50 个 LinkedIn profile。** 如果你的池就是 LinkedIn 通用搜索第一页,你在和另外 10 个招聘人争抢。深入。
