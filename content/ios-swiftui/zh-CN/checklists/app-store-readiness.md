# App Store 就绪清单

在 App Store Connect 中点击**提交审核**之前的核对清单。按驳回最常见的顺序排列，而不是按最有趣的顺序。

---

## 1. 隐私清单（`PrivacyInfo.xcprivacy`）

**自 2024 年 5 月起对使用 required-reason API 的应用为必需**。缺失的清单会在提交时被驳回，而非在审核中。

把 `PrivacyInfo.xcprivacy` 加到 App target。结构：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
    <key>NSPrivacyCollectedDataTypes</key>
    <array>
        <!-- 每个数据类别一个 dict -->
    </array>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>CA92.1</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
```

你几乎肯定需要的 required-reason API 类别：

| 你的 App 使用了… | API 类别 | 常见 reason code |
| --- | --- | --- |
| `UserDefaults` | `NSPrivacyAccessedAPICategoryUserDefaults` | `CA92.1`（App 自身数据） |
| `FileManager` 时间戳 | `NSPrivacyAccessedAPICategoryFileTimestamp` | `C617.1`（同步/备份），`DDA9.1`（向用户显示） |
| `systemUptime` / 启动时间 | `NSPrivacyAccessedAPICategorySystemBootTime` | `35F9.1`（为应用事件打时间戳） |
| 磁盘空间查询 | `NSPrivacyAccessedAPICategoryDiskSpace` | `85F4.1`（向用户显示） |
| 启动时读取 `UIPasteboard` | `NSPrivacyAccessedAPICategoryActiveKeyboards` | `54BD.1`（翻译） |

第三方 SDK 现在会自带隐私清单。升级依赖时，请检查它是否新增了清单。Xcode 会在构建期聚合它们。

---

## 2. App Store Connect 中的 App Privacy 详情

与清单分开。在 App Store Connect 网页 UI 中你的 App → App Privacy 填写。

如实声明的类别：

- **Contact Info**（姓名、邮箱）—— 若注册时收集
- **Identifiers**（用户 ID、设备 ID）
- **Usage Data**（产品交互）
- **Diagnostics**（崩溃日志、性能数据）
- **Purchases** —— 若你处理支付
- **Location** —— 粗略 vs. 精确，是否与身份关联

每一项：是否与用户身份关联？是否用于追踪？是否用于提供 App 功能？在这里撒谎是下架理由。

---

## 3. 必备设备截图

App Store Connect 对特定屏幕尺寸要求截图。截至 2024 年：

| 设备 | 尺寸 | 是否必需 |
| --- | --- | --- |
| iPhone 6.7"（15/16 Pro Max） | 1290 × 2796 | 必需 |
| iPhone 6.1"（15/16 Pro） | 1179 × 2556 | 若未提供 6.7" 则必需 |
| iPhone 5.5"（8 Plus） | 1242 × 2208 | 较旧目标必需 |
| iPad Pro 12.9"（6 代） | 2048 × 2732 | 若支持 iPad 则必需 |
| iPad Pro 13"（M4） | 2064 × 2752 | 可选 |

你可以用 App Store Connect 的 Screenshot Designer，但多数团队用 Fastlane Snapshot 生成，或在 Figma 做模拟图按要求分辨率导出。

最低：每个必需设备 3 张。建议：5-10 张。第一张是搜索结果里被看到的那张 —— 用心做。

---

## 4. 元数据

- **App name**：最多 30 字符。需与 bundle 一致。
- **Subtitle**：30 字符。搜索结果可见。
- **Promotional text**：170 字符。无需重新提交即可编辑 —— 用于限时信息。
- **Description**：4000 字符。前 3 行在"更多"之前可见。开头写价值，不是功能罗列。
- **Keywords**：合计 100 字符，逗号分隔。不要包含已出现在 App 名称或类目中的词 —— Apple 会自动索引。
- **Support URL**：必填且可公开访问。
- **Privacy policy URL**：任何收集数据的 App 必填。
- **What's New**：4000 字符。每次更新必填。"Bug fixes and performance improvements" 仍可用，但审核员更喜欢具体说明。

---

## 5. 构建设置 + Capabilities

- [ ] **部署目标** 设置正确。越低 = 用户越多、兼容代码越多。对使用 `@Observable` + SwiftData 的新应用，iOS 17 是合理基线。
- [ ] **Bundle ID** 与 CloudKit container、推送证书、App Group 标识匹配。
- [ ] **版本号 + 构建号** 已自增。App Store Connect 会拒绝重复 build。
- [ ] **App Transport Security**：不要 `NSAllowsArbitraryLoads`，除非有书面理由。
- [ ] **Background Modes**：只勾真正用到的。审核员会问。
- [ ] **Capabilities**：iCloud、Sign in with Apple、Push Notifications —— 每项都要同时在 entitlements 与 App Store Connect 中配置。

---

## 6. Sign in with Apple

若你的 App 提供任何第三方社交登录（Google、Facebook 等），Apple 要求你也提供 Sign in with Apple。这是 App Store Review Guideline 4.8，会被强制执行。

豁免：

- 你的自有账号系统（没有第三方社交）→ 无需
- 教育 / 企业 / 商务 App 使用特定企业鉴权 → 豁免
- 使用 ID.me 或政府鉴权等身份提供方的 App → 豁免

不确定时就加上 Sign in with Apple。两天工作量，省一次驳回。

---

## 7. 应用内购买

若你在 App 内消费数字商品，必须用 StoreKit。不允许跳转外部支付链接、不允许 QR 跳到自家网站结账。Guideline 3.1.1。

例外：

- "Reader" 类 App（Spotify、Netflix、Kindle）可跳外 —— 但需 External Link Account Entitlement 和特定免责声明
- 实物商品、在 App 外消费的服务（Uber、房产挂牌）—— Stripe 可以
- P2P 服务（在线辅导、自由职业）—— Stripe 可以

每条 IAP 流程都要在 sandbox 测试。取消 + 重新订阅。Restore Purchases 按钮是必需的。

---

## 8. 无障碍审计

审核员会抽查的四点：

- [ ] 每个仅图标按钮配 **VoiceOver 标签**（`accessibilityLabel`）
- [ ] **Dynamic Type** 在 AX5（最大无障碍尺寸）下 —— 没有被裁的文字
- [ ] **色彩对比度** 正文 4.5:1，大字 3:1（WCAG AA）
- [ ] 对大型动画提供 **reduced motion** 退化方案

对每个主屏运行 Xcode 的 Accessibility Inspector。

---

## 9. 崩溃 & 性能

- [ ] 用户输入触达不到 `fatalError(...)`
- [ ] 在 3 年新的设备上启动用时 < 400ms
- [ ] 上线代码中没有 `print(...)` —— 用 `Logger` 替换
- [ ] 用 Instruments → Allocations 做内存分析
- [ ] 没有循环引用（Instruments → Leaks）
- [ ] 网络调用配置了超时（`URLSession` 默认是 60 秒 —— 显式设置更短）

请在真机上跑，不只在 Simulator 上。性能特征不同。

---

## 10. 提交前先 TestFlight

提交前至少做一轮 TestFlight：

1. Archive（Xcode → Product → Archive）
2. 通过 Organizer 上传
3. 等待处理（约 10 分钟）
4. 加入 Internal Testing 组（最多 100 人，无需审核）
5. 发给 3-5 位你信任、会真正试用的人
6. 等 48 小时反馈
7. 修出现的问题
8. 提交 App Store Review

External TestFlight（最多 10000 人）需要 "Beta App Review" —— 通常 24 小时，比正式 App Store 审核轻量。

---

## 11. 提交后的 24 小时

- App Store Review 通常 24-48 小时。
- 若被驳回，邮件会告诉你违反的 guideline 编号。读两遍再回复。
- 你可在 App Store Connect 的 Resolution Center 回应驳回。语气客气、说明具体、含糊时主动问澄清问题。
- 多数看起来严厉的驳回是机器初判。如果你写了申诉，会有真人来读。

常见首次驳回：

- **2.1（App 完整性）**：缺截图、缺演示账号、缺隐私政策 URL
- **4.0（设计）**：看起来像网页，不遵循 iOS 惯例
- **4.8（Sign in with Apple）**：提供了社交登录但没有 Sign in with Apple
- **5.1.1（数据收集与存储）**：收集数据但未在 App Privacy 声明

---

## 提交前 5 分钟终检

- [ ] Archive 来自 `main` 分支且版本已升
- [ ] 隐私清单存在，列出所有 required-reason API
- [ ] App Store Connect 的 App Privacy 与 App 实际行为一致
- [ ] 所有必需设备尺寸的截图已上传
- [ ] 若需登录，已在 App Review Information 中提供演示账号
- [ ] 在真机测试过，不只是 Simulator
- [ ] What's New 已写（不是 "Bug fixes"）
- [ ] 若提供了任何其他社交登录，也提供了 Sign in with Apple
- [ ] 上线包中没有 `print()`、`// TODO`、测试 API key、可访问的调试菜单
