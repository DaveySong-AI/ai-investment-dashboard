# Atlas AI Briefing：唯一格式与编辑规范

## 发布单位

每个自然日最多一份 canonical briefing。唯一权威文件为：

- `data/ai-briefings/YYYY-MM-DD.json`
- `reports/ai-briefings/YYYY-MM-DD.md`

同一提交必须同步更新 `index.json` 与完全相同的 `latest.json`。历史日报不可被自动任务覆盖；如需勘误，应由人工创建带有说明的更正提交。

## 日报格式

正式日报的 `kind` 为 `daily`，且必须包含：

1. 以 ISO 8601 表示的 24 小时 `coverage.windowStart` 与 `coverage.windowEnd`。
2. 中英双语 headline、summary、分类、标题、事实、重要性、含义与行动建议。
3. 至少一条 `confirmed` 项目；每条确认事实至少附一条 `type: primary` 的 HTTPS 来源。
4. 每个项目明确标记：`confirmed`、`context`、`background` 或 `analysis`。
5. 不足以确认的消息只能作为背景或分析问题，不能被写成确认事实。

可发布项目应尽量简短。来源不足时，少发条目优于填充；若一个覆盖窗口内没有可靠确认事实，则不发布该日 canonical briefing。

## 来源顺序

先检查 OpenAI、Anthropic、Google / DeepMind、Meta、xAI、NVIDIA 的官方 newsroom、博客、产品页、研究页或投资者关系材料。其次才使用公司公告、论文原文、监管文件与有明确归属的采访。媒体与分析文章可以补充背景，但不能单独支撑 `confirmed` 事实。

## 写作边界

- `what`：可追溯的事实或明确背景；不混入预测。
- `why`：事实为何与技术、产品、开发者或管理者相关。
- `implication`：明确标注为分析或行动建议，不写成事实。
- 每项来源链接必须可公开访问，标题与链接指向同一内容。
- 禁止虚构发布、收购、定价、基准、客户、融资或模型能力。

## 发布门槛

发布者必须运行 `npm run validate`。GitHub Pages 的校验与部署工作流成功后，才将该日视为已发布。任何抓取、生成、结构、来源或部署失败均不得更新 `latest.json`。
