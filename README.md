# Sud0x67 · 项目导航

项目与工具总入口：<https://sud0x67.github.io/>。采用浅色背景、蓝色强调与项目卡片，支持中文和英文。导航页和博客各自采用独立的视觉风格。

## 站点分工

| 站点 | 源码仓库 | 维护内容 |
| --- | --- | --- |
| [项目导航](https://sud0x67.github.io/) | [Sud0x67.github.io](https://github.com/Sud0x67/Sud0x67.github.io) | 博客入口、在线工具及项目链接 |
| [博客](https://sud0x67.github.io/blog/) | [blog](https://github.com/Sud0x67/blog) | Hexo 源码、Markdown 文章、Cxo 主题、文章归档与标签 |

博客已恢复到本地 `~/code/blog`，保留原 Git 历史和四篇文章；请在该项目的 `source/_posts/` 中写文章，推送 `main` 后自动发布。写作步骤见[博客 README](https://github.com/Sud0x67/blog#readme)。导航仓库不再生成或发布博客文章。

两个站点各自发布，博客更新不会覆盖导航首页。不要从 Hexo 项目向此仓库执行旧的 `hexo deploy`。

## 导航页维护

- `index.html`：默认中文首页、项目与博客入口。
- `assets/portal.css`：首页响应式样式，桌面双列卡片、移动端单列。
- `assets/portal-icon.svg`：导航页独立图标。
- `assets/portal.js`：中文/英文文案、标题及无障碍标签。刷新后恢复中文。
- `assets/blog-redirect.js`：旧博客地址兼容跳转，保留查询参数和页内锚点。
- `2021/`、`archives/`、`tags/`、`about/`：旧地址的静态跳转页，分别转向 `/blog/` 下的同名路径，包含 canonical、无 JavaScript 的跳转后备和普通链接。
- `css/`、`js/`、`font/`、`img/`：原博客的历史资源，保留兼容；导航首页使用独立的样式与图标。新博客有自己的资源副本。

添加项目时，在 `index.html` 添加入口，并在 `assets/portal.js` 两份字典中补齐文案。无需引入构建工具或后端。旧文章的原始 HTML 可在迁移前的 Git 历史中找到。

## 本地预览

```sh
cd ~/code/Sud0x67.github.io
python3 -m http.server 4174 --bind 127.0.0.1
```

访问 <http://127.0.0.1:4174/>。博客与其他项目由独立仓库发布，本地这个静态服务器不包含它们。预览博客应在 `~/code/blog` 运行 `npm run server`，访问 <http://localhost:4175/blog/>。

## 检查

需要 Node.js 20+、npm 和 Python 3。npm 依赖仅用于测试。

```sh
npm ci
npx playwright install chromium firefox webkit
npm test
```

覆盖中英文、导航目标、键盘导航、320px 布局、旧地址映射，以及查询参数/锚点的转发。跳转浏览器测试使用受控的博客目标页，真实博客在自己的仓库中测试并另行验证线上地址。

## 发布

沿用 GitHub Pages **Deploy from a branch → `master` → `/ (root)`**。推送本仓库的 `master` 后 GitHub 自动发布，无需打包。博客仓库采用 `main` 与 GitHub Actions，两者发布配置相互独立。
