# 快速开始 — React Native / 移动端开发套件

应该不到 60 秒就能上手。挑你的工具。

## Claude 用户

打开 Claude。创建一个新的 Project（需要 Pro 或 Team 计划；但在普通对话里同样能用）。在 project 的 "Custom instructions" 字段粘贴 `optimization-pack.md` 的全部内容。把 `memory.md` 与 `patterns/component-and-native-modules.md` 上传到项目知识库供 Claude 参考。新开一个对话。首条消息：告诉 Claude 你的环境 ——"Expo bare workflow，RN 0.74，开启 New Architecture，目标 iOS + Android" —— 然后说你要做什么。

## ChatGPT 用户

打开 ChatGPT。点 "Explore GPTs" → "Create a GPT"（需要 Plus）。在 "Instructions" 字段粘贴 `custom-gpt-instructions.md` 的全部内容。把该文件底部列出的 5 条 "Conversation starters" 也填上。在 "Knowledge" 中上传 `memory.md` 与 `patterns/component-and-native-modules.md`。保存 GPT（设为私有也行）。打开它后用："Expo bare、RN 0.74、iOS + Android。我想搭一个新屏幕。"

如果没有 ChatGPT Plus，把 `optimization-pack.md` 粘到普通对话顶部即可 —— 只是少了持久化 GPT 与文件上传。

## Gemini、Cursor、Codex 或任何其他 AI 工具

打开工具。新开对话。把 `optimization-pack.md` 全部内容作为首条消息粘上。加一句："请确认你已加载本提示词，并向我询问 Expo workflow、RN 版本与目标平台。" 它问完，你就 OK 了。

对 Cursor：把 `SKILL.md` 放在项目根目录；Cursor 的 `.cursorrules` 或 project rules 会自动识别。

---

## 验证是否生效

加载完系统提示词后粘贴：

```
Test run. Expo bare workflow, RN 0.74, New Architecture on, targeting iOS 15+ and Android 8+. I need a screen that shows a list of 500 chat messages with avatars, pulled from an API. Smooth scroll on a 3GB Android. Give me the screen file, the row component, and the data hook.
```

如果返回带稳定 `keyExtractor` 的 `FlatList`（或 `FlashList`）、`React.memo` 包裹的 Row、抽出的 `renderItem` 引用、显式图片尺寸、卸载取消的网络 hook、并在底部附 iOS/Android 差异说明 —— 说明套件加载正确。

如果返回的是 `ScrollView` + `.map()`、或 `renderItem={(item) => <Row />}` 这种内联、或没提 Android 性能 —— 系统提示词没加载，把它再粘一次。
