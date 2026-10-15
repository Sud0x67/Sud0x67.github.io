# Sud0x67 · 项目与笔记

个人项目目录：<https://sud0x67.github.io/>。默认中文，支持即时切换英文。

## 结构与维护

- `index.html`：首页、项目链接和默认中文内容。
- `assets/portal.css`：独立的响应式首页样式。
- `assets/portal.js`：中文/英文文案、页面标题和无障碍标签。语言选择只保留在当前页面，刷新后恢复中文。
- `assets/portal-icon.svg`：首页图标。
- `2021/`、`archives/`、`tags/`、`about/` 及原有 `css/`、`js/`、`font/`、`img/`：历史博客与其资源，保留原始地址。

首页收录 Cipher Lab、TeamAligned、手撸解释器教程和个人简历。新增项目时，在 `index.html` 中添加卡片，并在 `assets/portal.js` 的两份语言字典中补齐文案。

首页采用原生 HTML、CSS 和 JavaScript，无构建步骤、运行时依赖、外部字体或统计脚本；禁用 JavaScript 时仍可使用中文导航。博客历史页面保留原有实现。

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

只维护目录页时，请勿重新生成或移动历史博客文件，也不要替换旧博客使用的共享样式。首页样式与脚本集中在 `assets/portal*`，不会改变文章页面。
