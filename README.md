# Sud0x67 · 项目与笔记

个人项目目录：<https://sud0x67.github.io/>。默认中文，支持即时切换英文。

## 结构与维护

- `index.html`：首页、项目链接和默认中文内容。
- `assets/portal.css`：独立的响应式首页样式。
- `assets/portal.js`：中文/英文文案、页面标题和无障碍标签。语言选择只保留在当前页面，刷新后恢复中文。
- 首页复用博客原来的 `/img/intro/index-bg.png` 背景与 `/img/assets/ks.ico` 图标。
- `2021/`、`archives/`、`tags/`、`about/` 及原有 `css/`、`js/`、`font/`、`img/`：历史博客与其资源，保留原始地址。

首页收录 Cipher Lab、TeamAligned、手撸解释器教程和个人简历。新增项目时，在 `index.html` 中添加卡片，并在 `assets/portal.js` 的两份语言字典中补齐文案。

首页采用原生 HTML、CSS 和 JavaScript，无构建步骤、运行时依赖、外部字体或统计脚本；禁用 JavaScript 时仍可使用中文导航。首页与博客使用相同的深色网格横幅、博客名、签名、系统字体、青色强调色和深灰页脚，项目以文章列表的形式展示。博客历史页面保留原有实现。

## 本地预览

安装 Python 3 后，在仓库目录运行：

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

访问 <http://127.0.0.1:4174/>。项目卡片指向同域名下独立发布的其他仓库，因此本地服务器不会包含这些项目；部署后可正常访问。

## 浏览器检查

需要 Node.js 20+、npm 和 Python 3。npm 依赖仅用于测试，不参与站点发布。

```sh
npm ci
npx playwright install chromium firefox webkit
npm test
```

覆盖中英文切换、键盘导航、项目入口、320px 窄屏布局及全部历史文章/归档/标签地址，运行 Chromium、Firefox、WebKit 和移动端配置。

## 发布

GitHub Pages 沿用仓库已有配置：**Deploy from a branch → `master` → `/ (root)`**。提交并推送到 `master` 后，GitHub 自动构建并发布，无需额外打包命令。

只维护目录页时，请勿移动历史博客文件，也不要替换旧博客使用的共享样式。首页样式与脚本集中在 `assets/portal*`，不会改变文章页面。

## 继续更新博客

**仍然可以使用这个仓库发布博客。** 当前 `master` 是发布分支，历史页面中的生成标记为 Hexo 4.2.0；仓库不包含原来的文章 Markdown、`_config.yml`、`source/_posts/` 或 `themes/`，新增的 `package.json` 也只是首页测试工具，并不是 Hexo 项目配置。

已在本地备份中确认找到原 Hexo 源项目：包含四篇文章的 Markdown、Cxo 主题及指向本仓库的部署配置。备份项目声明 Hexo 4.2.1，尚未验证其旧依赖在当前 Node.js 下的构建兼容性；本次只调整发布仓库的首页，没有修改原备份或接入 Hexo 构建。

- 有原 Hexo 源码：在原项目中写文章并生成页面。需要先将这个首页及 `assets/portal.css`、`assets/portal.js` 纳入原项目的主题或构建流程，再整体发布；不能假定原来的 `hexo deploy` 会保留这里手工添加的文件，它可能重新生成并覆盖首页。
- 只有当前仓库：可以直接添加或修改静态 HTML 并推送发布，但文章归档、标签页和上一篇/下一篇链接都需要一并维护。在这里直接添加 Markdown 不会自动变成使用原主题的博客文章。
- 长期维护建议：将找回的 Hexo 源码存放在同一仓库的独立 `source` 分支（或者独立源码仓库），由构建流程生成博客并合并目录首页后统一发布。当前尚未恢复这套生成流程，现有文章和固定链接保持原样。

Hexo 源码结构见[官方 Setup 文档](https://hexo.io/docs/setup)，Git 发布方式见[官方部署文档](https://hexo.io/docs/one-command-deployment)。
