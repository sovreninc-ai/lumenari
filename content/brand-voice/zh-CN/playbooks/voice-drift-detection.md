# 语气漂移检测

当你怀疑 AI 输出又滑回企业默认时使用。任何草稿上线前都跑一遍 —— 尤其是销售页、融资帖、宣言、上线公告。

---

## 提示词

```
你在对照一份已保存画像审计草稿是否漂移。规则:

1. 把草稿与画像 rubric 对比。**不要**宽容。标记漂移比放过更有用。
2. 对每段(或每个块 —— section 标题、bullet list、CTA)打分:
   on-voice / drift / off-voice。
3. 对每个 drift 或 off-voice 判定,引用触发判定的具体短语,并指出违反
   了哪条语气规则。
4. 末尾给 "修复优先级" —— 优先修哪 2-3 处最能提升语气一致性。

输出格式:

## Section-by-section
- [Section 1 label]: on-voice / drift / off-voice
  - 触发:"[引文]" —— 违反 [规则]
- [Section 2 label]: on-voice / drift / off-voice
  - 触发:"[引文]" —— 违反 [规则]
- ...

## 总体漂移分:X/10
(10 = 完全 on-voice;0 = 已不可辨识)

## 修复优先级(Top 3)
1. [带例子的具体修改]
2. [带例子的具体修改]
3. [带例子的具体修改]

画像和草稿在下方。
```

---

## 你的输入

```
[语气画像]
[粘完整已保存画像]

[草稿]
[粘要审计的完整草稿]
```

---

## 要警惕的漂移信号

**禁用词偷渡。** 最常见漂移。AI 知道不能用 "leverage" —— 于是写 "harness" 或 "tap into" 或 "unlock"。同样语义形状,不同词。规则:如果一句话意思与一个禁用词等价,**仍然**算漂移。

**句长爬升。** 语气平均 9 词。草稿过半时,句子已经 18 词且还在涨。这是 AI 默认回归"流畅"散文。在任何长草稿后半总要查句长。

**通用开头。** "In a world where..."、"Today's [audience] needs..."、"We've all been there..."。任何一句出现在 Direct/Diplomatic 5 的语气里,**自动** off-voice。

**三段式漂移。** "First... Then... Finally..." 或 "Three things changed..."。如果你的语气**不**这样走,AI 也会强加这个结构。抓出来。

**形容词堆叠。** "Bold, witty, and confident messaging."。语气**不**用形容词谈自己。如果草稿里有以三形容词节奏描述品牌的句子,那是漂移。

**受众讨好。** "For founders who refuse to settle."、"For the few who get it."。如果画像里没把受众讨好作为框架手法,这是漂移 —— AI 在迎合。

**"Excited to announce."** 任何不是 2007 年新闻稿的语气都**绝不**该用这句。自动 off-voice。

---

## 范例

**画像(节选):**
```
Voice: Solo Builder
承重:直接/委婉 5(判定先行开头)、严肃/俏皮 2(干式,无笑话)
平均句:9 词
禁用清单:leverage、transform、unlock、journey、passion、ecosystem、excited to announce
```

**要审计的草稿:**
> "We're excited to share something we've been working on for a long time. In today's fast-paced world, founders are constantly juggling priorities and struggling to find the time to focus on what truly matters. That's why we built a tool that unlocks productivity and helps you transform the way you work. We can't wait for you to try it."

**审计输出:**

```
## Section-by-section
- 第 1 句:off-voice
  - 触发:"We're excited to share" —— 违反禁用清单(新闻稿话术自动标)
- 第 2 句:off-voice
  - 触发:"In today's fast-paced world" —— 违反反模式(通用开头);违反判定先行框架
- 第 3 句:off-voice
  - 触发:"unlocks productivity" + "transform the way you work" —— 违反禁用清单(unlock + transform 同时偷渡)
- 第 4 句:drift
  - 触发:"We can't wait for you to try it" —— 违反直接/委婉 5(这是含糊的温暖,不是判定或 CTA)

## 总体漂移分:1/10
(已无法辨认为已保存语气。读起来是默认 AI 输出。)

## 修复优先级(Top 3)
1. 把开头改写为判定。例:"Shipped a tool that runs the five admin tasks founders waste a day on."
2. 中间句整段砍掉。语气**不**解释 —— 它断言并移步。
3. 把温暖收尾换成直接 CTA。例:"Link below."
```

这就是测试。如果审计说 "完全 on-voice" 而你能在草稿里看到漂移,审计错了 —— 重新粘画像再跑一次。诚实的漂移检测比错误的通过有用。

---

## 何时跑漂移检测

- 任何高风险资产上线前(销售页、融资帖、上线邮件、宣言)
- 长文(超 400 字)的每次 AI 改写
- 当你怀疑语气在漂但说不出原因 —— 拿最近三份资产跑,对比
- 每季度在你已发表内容上跑一次,作为重新提取画像前的校准
