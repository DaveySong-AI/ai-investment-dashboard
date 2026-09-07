# Atlas · AI Investment Dashboard

一个零框架、数据与展示分离的静态 AI 投资研究看板。GitHub Pages 负责托管；GitHub Actions 只做数据校验和部署。当前内容是带来源的历史演示快照，不是实时行情或投资建议。

## 页面

- **Today** — 市场状态、关键指标、驱动因素与核心观察名单
- **AI Briefing** — 以一份可审计的双语简报连接重要 AI 动态与一手来源
- **Watchlist** — AAPL、GOOGL、MSFT、0700.HK、9992.HK
- **Stock Detail** — 可证伪的投资逻辑、催化剂、风险与证据时间线
- **History** — 按日期读取不可变的每日快照
- **AI Opportunities** — 跨价值链的主题地图
- **Memory / 内存行业** — 以 DRAM 为基准，追踪 HBM、DRAM、NAND、供给与周期风险
- **Reading / 阅读** — 将一手资料、新闻与外部分析分开列示，并链接原文

右上角可切换完整中文 / English 内容；阅读语言偏好会保存在浏览器中。

## 本地预览

```bash
npm run validate
npm run serve
```

访问 `http://localhost:4173`。项目不需要安装依赖。

## 数据接口

云端任务每次运行只需要写入内容文件，无需修改前端：

1. 新增 `data/daily/YYYY-MM-DD.json`（结构参考现有样例）。
2. 将同一内容复制为 `data/daily/latest.json`。
3. 在 `data/daily/index.json` 的 `dates` 头部加入日期，并更新 `latest`。
4. 新增 `reports/YYYY-MM-DD.md`，作为人类可读、可审计的日报。
5. 只有公司 thesis 发生实质变化时才更新 `data/stocks/index.json`。
6. 每月或发生结构变化时更新 `data/opportunities.json`。
7. 更新 `data/memory/latest.json`（内存研究）及 `data/reads/latest.json`（外部阅读）。
8. 执行 `npm run validate`，提交并推送。推送后 Pages workflow 自动部署。

AI Briefing 另有唯一的 canonical 格式：`data/ai-briefings/YYYY-MM-DD.json` 是某日期的双语原始记录，`reports/ai-briefings/YYYY-MM-DD.md` 是对应的可审计文本；`latest.json` 必须与索引中最新一期完全一致。编辑规范见 [`docs/AI_BRIEFING_EDITORIAL.md`](docs/AI_BRIEFING_EDITORIAL.md)，未来 Codex Publisher 的执行约定见 [`docs/AI_BRIEFING_PUBLISHER.md`](docs/AI_BRIEFING_PUBLISHER.md)。后者只是预留接口，不会创建或调度任务。

所有 JSON 均含 `schemaVersion`。自动任务应保留历史文件，不覆写过去日期；数据项需要携带可访问的一手来源 URL。面向用户的可变文字应采用 `{ "zh": "…", "en": "…" }`，以维护完整双语内容；链接、代码、日期与数值保持为共享字段。

`Investment thesis` 在界面中显示为“投资逻辑”：这是看板长期维护、可被新证据推翻的判断；外部新闻、财报和分析文章均应作为带链接的证据，而不是与投资逻辑混写。

## 每天 07:30 云端任务建议

建议在 ChatGPT/Codex 云端任务中使用 `Asia/Shanghai`（或你的目标时区）每天 07:30 运行，连接此 GitHub 仓库并授予写入权限。任务提示应包含：

> 读取仓库 README 与最新数据；基于一级来源研究上一交易日市场、核心五家公司和 AI 价值链。区分事实、推断和判断，禁止虚构价格或来源。生成当天 JSON、Markdown，必要时更新股票 thesis；运行校验后创建一个小而清晰的提交并推送。若没有可靠新信息，保持 thesis 不变。

注意：如果 07:30 指的是上海/新加坡时间，美国市场可能仍在交易或刚收盘不久；建议明确日报覆盖“最近一个已完成交易日”，并记录 `session` 和数据截止时间。

## 部署

仓库 Settings → Pages → Build and deployment 选择 **GitHub Actions**。此后 `.github/workflows/pages.yml` 会在 `main` 分支更新时校验并发布。
