我建议把它设计成一个真正能长期使用的 **AI Investment Research Dashboard**，而不是“财经新闻网页”。GitHub 仓库负责版本管理和历史数据，Web 看板负责每天阅读、检索和比较；以后还可以逐步加入估值模型、财报数据库和自己的投资笔记。

我先给你一个 **V1 架构方案**：

```text
每天 07:00–07:30
        │
        ▼
数据采集 / 新闻 / 财报 / 市场行情
        │
        ▼
AI 分析引擎
Fact → Why → Impact → Valuation → Watch
        │
        ├── 生成每日晨报 Markdown
        ├── 更新股票结构化数据 JSON
        ├── 更新历史事件库
        │
        ▼
GitHub Repository
        │
        ▼
Web Dashboard
```

GitHub Actions 很适合承担定时更新任务，现在官方支持定时 workflow，并且可以直接指定 IANA 时区，因此可以直接按 `Asia/Singapore` 的 07:30 来设计，不需要我们自己换算 UTC。

### 一、看板首页我建议这样设计

顶部先是一张非常简洁的 **Daily Market Brief**：

**2026-09-07 · AI Investment Morning Brief**

> **Market View：Risk-off / Neutral / Risk-on**  
> 昨夜市场下跌的主要原因不是 AI 基本面恶化，而是……

旁边直接显示：

**S&P 500 / Nasdaq / 10Y Treasury / VIX / Gold / Oil**

然后第二屏进入最重要的：

**Why did the market move?**

例如不是简单显示：

> Nasdaq -1.4%

而是拆成：

```text
NASDAQ ↓ 1.4%

主要驱动：
↑ 10Y Yield      -0.6%
↓ NVDA           -0.3%
↑ Oil            -0.2%
Macro data       -0.2%
Other            -0.1%
```

这种设计会非常符合你“回答为什么”的要求。

---

### 二、核心股票 Watchlist

首页固定放：

| 股票 | 今日状态 | 核心变化 | Valuation | 我的判断 |
|---|---|---|---|---|
| AAPL | 🟡 | Apple AI进展 | 偏高 | Watch |
| GOOGL | 🟢 | Gemini / Cloud | 合理 | Attractive |
| MSFT | 🟡 | Azure / CapEx | 偏高 | Hold |
| Tencent | 🟢 | 广告+AI | 合理 | Attractive |
| Pop Mart | 🔴 | 海外增速 | 高 | Watch |

点击股票进入独立页面。

例如：

```text
GOOGL
──────────────────────

Investment Thesis
AI Position
Financials
Valuation
Catalysts
Risks
News Timeline
Earnings Timeline
My Notes
```

我认为这里非常重要的一点是：

**股票页面不能只是新闻聚合。**

我们应该长期维护一个 Investment Thesis。

比如 Google：

```text
核心投资逻辑

1. Search 护城河是否被 AI 削弱？
2. Gemini 能否增强 Search monetization？
3. Google Cloud AI 收入
4. TPU 是否成为 NVIDIA 之外的重要算力平台？
5. AI CapEx → 收益率
```

每天发生的新信息，都去验证或者推翻这些 thesis。

这才是真正的价值投资研究。

---

### 三、增加一个我非常推荐的「AI Investment Map」

这部分可能最终会成为整个看板最有价值的一页：

```text
                    AI INDUSTRY MAP

                       AI Apps
                CRM / Coding / Agent
                         │
                         ▼
                    AI Models
              OpenAI / Gemini / Claude
                         │
                         ▼
                  Hyperscalers
              MSFT / GOOGL / AMZN
                         │
                         ▼
                    Compute
             NVDA / AMD / AVGO / TPU
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
          HBM          Network        Server
       MU / Hynix     AVGO etc       Dell etc
                         │
                         ▼
                    Data Center
                         │
                         ▼
                       Power
```

每个节点可以显示：

**Revenue Growth / EPS / CapEx / Valuation / Momentum / Investment Score**

于是以后每天出现：

> Google 增加 AI CapEx $10B

系统不仅告诉你 Google 怎么样，还能推演：

> ↑ NVDA / AVGO / 光模块 / 数据中心 / 电力需求

也就是说，它会成为一个**AI产业链投资因果图谱**。

---

### 四、历史页面

你刚才提到“按照日期选择历史信息”，我建议直接做：

```text
Calendar

< September 2026 >

Mon Tue Wed Thu Fri Sat Sun
     1   2   3   4   5   6
 7   8   9  10  11  12  13
```

点击：

**2026-09-04**

直接恢复当天：

- 市场行情
- 新闻
- AI产业动态
- 五只核心股票
- 当日重点推荐
- 当时估值
- 当时 Investment View

这个功能以后会很有意思，因为半年后我们能回头看：

> 当时为什么看好 Google？

以及：

> 判断最后对不对？

这会自然形成一个 **Investment Journal**。

---

### 五、Repository 我建议这样组织

例如仓库名字：

`ai-investment-dashboard`

目录可以是：

```text
ai-investment-dashboard/

├── app/
│   ├── dashboard/
│   ├── stocks/
│   ├── ai-map/
│   └── history/
│
├── data/
│   ├── daily/
│   │   ├── 2026-09-07.json
│   │   └── 2026-09-08.json
│   │
│   ├── stocks/
│   │   ├── AAPL.json
│   │   ├── GOOGL.json
│   │   ├── MSFT.json
│   │   ├── 0700.HK.json
│   │   └── 9992.HK.json
│   │
│   └── valuation/
│
├── reports/
│   └── 2026/
│       └── 09/
│           └── 2026-09-07.md
│
├── research/
│   ├── companies/
│   └── ai-industry/
│
├── scripts/
│   ├── market_data.py
│   ├── news.py
│   └── generate_report.py
│
└── .github/
    └── workflows/
        └── daily-report.yml
```

这里我刻意建议同时保存：

**Markdown + JSON**

Markdown 是给人看的。

JSON 是以后程序做：

- 图表
- 搜索
- 历史比较
- AI分析
- 估值模型

用的。

这样不会把自己锁死。

---

### 六、技术栈

我的首选方案是：

**Next.js + GitHub + Vercel**

而不是纯 GitHub Pages。

GitHub Pages 本身完全可以托管静态网站，GitHub 官方也提供 Pages。

但这个项目以后很可能会加入：

**搜索、动态 API、登录、AI 问答、数据库、估值计算、实时行情。**

因此：

```text
GitHub
   ↓
Next.js
   ↓
Vercel
```

扩展性会明显更好。

GitHub 继续作为 **Single Source of Truth**。

---

### 七、我想给它增加一个 AI Research Assistant

以后页面右上角可以有：

> **Ask Investment AI**

例如你问：

> Google 最近三个月投资逻辑发生了什么变化？

它读取：

```text
过去90天晨报
+
Google财报
+
Google事件
+
估值历史
+
我们的Investment Thesis
```

回答：

> 三个月前市场核心担忧是 Search 被生成式 AI 颠覆；目前证据更偏向……

甚至可以问：

> 对比 MSFT 和 GOOGL，现在哪一个风险收益比更好？

这个功能我认为非常值得后续做。

---

## 我建议分三期做

**V1：Investment Dashboard**

先完成：

Dashboard + 每日晨报 + Watchlist + 股票详情 + 日期历史 + 自动更新。

**V2：Investment Intelligence**

加入：

财报解析、估值历史、AI产业链图谱、事件数据库、Investment Thesis Tracking。

**V3：AI Portfolio Copilot**

再加入：

自己的持仓、成本、组合暴露、AI问答、情景分析、投资日志。

我建议**暂时不要把交易下单功能放进去**。这个系统应该首先是一个 Research & Decision System，而不是交易机器人。

还有一个关键架构决定我建议现在就确定：

> **日报内容由 ChatGPT 云端任务生成，还是全部由 GitHub Actions 自己运行？**

我的建议其实是 **Hybrid**：

```text
ChatGPT
负责：
研究 / 推理 / 晨报 / Investment Thesis

GitHub
负责：
代码 / 历史数据 / Dashboard / 版本管理

GitHub Actions
负责：
构建 / 部署 / 数据同步
```

这样我们可以发挥 ChatGPT 在研究分析上的优势，同时 GitHub 保留一个完全属于你的、可迁移的投资知识库。

等我们把方案讨论定稿后，我可以直接进入 Work 模式，在你的 GitHub 上创建仓库、搭项目骨架和第一版 Dashboard。届时如果你的 GitHub 还没连接，我也可以引导你连接后直接开始做。
