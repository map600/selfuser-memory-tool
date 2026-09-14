# 古生物化石背诵 🦕📚

**古生物学知识点记忆助手** —— 一款离线可用的 Android 学习类混合应用（Hybrid App），帮助记忆标准化石的「中文名称 ↔ 拉丁学名 ↔ 地质时代」对应关系与地层考点。

基于 **Apache Cordova** 构建，前端为纯 **HTML5 + CSS3 + 原生 JavaScript（ES6+）**，无任何框架与运行时依赖，无需后端、无需网络即可运行。

---

## ✨ 功能特性

| 模块 | 说明 |
| --- | --- |
| 🧠 背诵模式 | 按分类或全部知识点学习；随机打乱、每 5 个一组；先进入「学习阶段」完整展示知识点卡片，再进入「测试阶段」 |
| ✏️ 填空测试 | 每个知识点随机隐藏「中文名称 / 拉丁学名 / 时期」3 个字段中的 2 个，保留 1 个作提示，填空作答；实时红绿反馈并展示正确答案 |
| 📒 错题集 | 答错的题目自动收录；`localStorage` 本地持久化；支持详情查看、单题复习、掌握后移除、错题集中复习 |
| 📖 自主学习 | 按分类浏览全部知识点，手风琴式展开 / 收起，自由查阅 |
| 📊 进度与统计 | 顶部进度条实时展示学习进度；首页统计知识点总数与错题数量 |
| 📱 移动端体验 | 单页应用（SPA）无刷新切换、移动端自适应布局、Toast 轻提示、PWA 支持（可添加到主屏幕、离线缓存） |

### 答案判定策略

- **中文名称**：归一化后精确匹配；
- **拉丁学名**：归一化后忽略大小写精确匹配；
- **时期字段**：宽松包含匹配（任一方包含另一方即算正确）；
- 统一归一化：去除首尾空白、零宽字符、多余空格，全角括号转半角。

---

## 📚 知识点数据

内置 **33 个标准化石知识点，覆盖 5 大类**。原始数据位于 [`data/`](./data) 文件夹（CSV 格式，可直接编辑扩展）：

| 分类 | 数量 | 数据文件 |
| --- | --- | --- |
| 三叶虫化石 | 14 | `data/三叶虫化石.csv` |
| 有节类植物 | 4 | `data/有节类植物.csv` |
| 鳞木类植物 | 2 | `data/鳞木类植物.csv` |
| 真蕨类植物 | 7 | `data/真蕨类植物.csv` |
| 种子蕨与银杏类 | 6 | `data/种子蕨与银杏类.csv` |

> ⚠️ 说明：应用数据目前以内嵌 JS 数组的形式存放在 `www/index.html` 的 `CATEGORIES` 常量中。修改 `data/` 下的 CSV 后，需同步更新 `www/index.html` 中的对应数据（后续版本计划改为运行时动态读取 CSV，见[路线图](#-路线图roadmap)）。

---

## 🚀 快速体验

### 方式一：浏览器直接打开（无需任何环境）

直接用浏览器打开 [`www/index.html`](./www/index.html) 即可完整体验全部功能（推荐 Chrome / Edge，手机浏览器亦可）。

### 方式二：GitHub Pages 在线体验

仓库已内置 GitHub Actions 工作流（`.github/workflows/pages.yml`），启用步骤：

1. 进入仓库 **Settings → Pages**；
2. **Source** 选择 **GitHub Actions**；
3. 推送代码到 `main` 分支，工作流将自动把 `www/` 部署为站点。

---

## 📦 构建 Android APK

### 环境要求

| 工具 | 说明 |
| --- | --- |
| Node.js | ≥ 16（含 npm） |
| Cordova CLI | `npm install -g cordova`（推荐 12+） |
| JDK | 17（cordova-android 15 要求） |
| Android SDK | 通过 Android Studio 或 cmdline-tools 安装，并配置 `ANDROID_HOME` 环境变量 |
| Gradle | 首次构建时自动下载，无需单独安装 |

### 构建步骤

```bash
# 1. 安装依赖（还原 cordova-android 平台包）
npm install

# 2. 添加 Android 平台（生成 platforms/ 原生工程）
cordova platform add android

# 3. 构建调试版 APK
cordova build android
# 输出位置：platforms/android/app/build/outputs/apk/debug/app-debug.apk

# 4. 直接安装到已连接的设备 / 模拟器（可选）
cordova run android
```

---

## 🗂 目录结构

```
paleo-app/
├── README.md                  # 项目说明（本文件）
├── LICENSE                    # Apache-2.0 开源协议
├── .gitignore                 # Git 忽略规则
├── config.xml                 # Cordova 应用配置（包名 com.paleo.fossil）
├── package.json               # npm 依赖与构建脚本
├── data/                      # 原始知识点数据（CSV）
│   ├── 三叶虫化石.csv
│   ├── 有节类植物.csv
│   ├── 鳞木类植物.csv
│   ├── 真蕨类植物.csv
│   └── 种子蕨与银杏类.csv
├── www/                       # 前端应用源码（Cordova 打包入口）
│   ├── index.html             # 应用主文件：HTML 结构 + CSS 样式 + 业务逻辑
│   ├── manifest.json          # PWA 清单
│   ├── sw.js                  # Service Worker（离线缓存）
│   ├── icon-192.png           # 应用图标 192×192
│   ├── icon-512.png           # 应用图标 512×512
│   └── img/logo.png
└── .github/workflows/
    └── pages.yml              # GitHub Pages 自动部署工作流
```

> `node_modules/`、`platforms/` 为构建时自动生成的目录，已被 `.gitignore` 忽略，不纳入版本库。

---

## 🛠 技术栈

- **前端**：HTML5、CSS3（CSS 变量 / Flexbox / 渐变 / 过渡动画）、原生 JavaScript ES6+
- **本地存储**：`localStorage` 错题持久化 + Service Worker 离线缓存
- **混合应用**：Apache Cordova（CLI 12+）+ cordova-android 15
- **原生层**：Android WebView 容器（Gradle 构建、Java 入口 `MainActivity`）
- **数据**：CSV → 结构化 JS 数据

核心算法：Fisher–Yates 洗牌、数组分组、字符串归一化与多策略答案匹配。

---

## 🗺 路线图（Roadmap）

- [ ] 运行时动态读取 `data/` 下的 CSV（替换硬编码数据，支持自定义题库）
- [ ] `localStorage` 升级 IndexedDB，增加学习记录与遗忘曲线（艾宾浩斯）复习
- [ ] 增加更多化石分类与知识点
- [ ] 应用图标与启动页适配、APK 正式签名发布
- [ ] 迁移 Capacitor 或跨端框架，扩展 iOS 支持
- [ ] 为答案判定、洗牌分组等纯函数补充单元测试

欢迎通过 Issue / Pull Request 参与完善！

---

## 📄 许可协议

本项目基于 [Apache License 2.0](./LICENSE) 开源。

知识点数据整理自古生物地层学教材 / 讲义的公开内容（CSV 表格），仅用于学习交流。
