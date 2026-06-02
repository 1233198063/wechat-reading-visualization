# 丹青阅览 · WeRead Viz

**微信读书个人数据可视化工具**
*A personal reading data visualization tool for WeChat Reading (微信读书)*

---

## 项目简介 · About

丹青阅览是一款本地化的微信读书数据可视化工具，通过微信读书开放 API 拉取你的真实阅读数据，以水墨古风的设计语言将阅读轨迹呈现为可视化图表。所有数据仅在本地流转，不经过任何第三方服务器。

*WeRead Viz is a locally-hosted visualization dashboard for your WeChat Reading data. It fetches your real reading history via the WeChat Reading open API and renders it as elegant, ink-wash–styled charts. All data flows exclusively between your machine and WeChat's servers — no third-party intermediaries.*

---

## 功能特性 · Features

**概览 · Overview**

阅读时长按天 / 月 / 年分布柱状图，一键切换统计周期；24 小时阅读时段偏好折线图；偏好书籍分类进度条排行；阅读时长 Top 5 书籍榜单，附封面与标签。

*Reading duration bar chart broken down by day / month / year with one-click period switching; 24-hour reading-time preference line chart; preferred book category ranking with progress bars; Top-5 books by reading time with covers and tags.*

**书架 · Bookshelf**

全量书架封面网格展示，含电子书与有声书；统计卡片呈现书架总数、已读完数量与分类分布。

*Full bookshelf grid with covers for both e-books and audiobooks; stat cards showing total count, finished count, and category breakdown.*

**笔记 · Notes**

汇总全部书籍的划线数、想法数与书签数；Top 10 书籍笔记分布堆叠柱状图；按书排列的详细笔记数量清单。

*Aggregated highlight, review, and bookmark counts across all books; stacked bar chart for top-10 note-heavy books; per-book note breakdown list.*

---

## 技术栈 · Tech Stack

| | |
|---|---|
| 前端 · Frontend | 原生 HTML / CSS / JavaScript，无框架依赖 |
| 图表 · Charts | [Chart.js](https://www.chartjs.org/) 4.4 |
| 字体 · Fonts | Ma Shan Zheng（马善政体）+ Noto Serif SC，via Google Fonts |
| 代理 · Proxy | Node.js 内置 `https` 模块，零外部依赖 |
| 数据 · Data | 微信读书 Agent API Gateway（`i.weread.qq.com`） |

---

## 快速开始 · Quick Start

```bash
# 1. 安装技能 · Install the skill
npx skills add Tencent/WeChatReading -g

# 2. 启动本地代理 · Start the local proxy
node server.js

# 3. 在浏览器打开 · Open in browser
http://localhost:3000
```

在登录页输入你的微信读书 API Key（格式：`wrk-xxx`），点击「入卷」即可进入仪表盘。Key 会保存在浏览器 `localStorage`，下次访问自动填入。

*Enter your WeChat Reading API key (format: `wrk-xxx`) on the login screen and click "Enter" to access the dashboard. The key is persisted in browser `localStorage` for subsequent visits.*

---

## 运行原理 · How It Works

浏览器无法直接跨域请求微信读书 API，因此项目内置了一个零依赖的 Node.js 代理服务（`server.js`）。浏览器将请求发至 `localhost:3000/api`，代理透传 Authorization 头并转发至微信服务端，返回数据后原路送回浏览器渲染。

*Browsers cannot directly cross-origin-request the WeChat Reading API, so the project ships a zero-dependency Node.js proxy (`server.js`). The browser posts to `localhost:3000/api`; the proxy forwards the request with your Authorization header to WeChat's servers and pipes the response back for client-side rendering.*

---

## 注意事项 · Notes

- API Key 仅用于本地转发请求，不会上传至任何第三方。*Your API key is used solely for local request forwarding and is never sent to any third party.*
- 首次运行需关闭 Node.js 的 TLS 严格验证（`NODE_TLS_REJECT_UNAUTHORIZED=0`），适用于企业网络等证书链不完整的环境。*TLS strict verification is disabled in `server.js` to accommodate corporate networks or environments with incomplete certificate chains.*
- 页面字体随视口宽度自动缩放（`clamp(15px, 1.05vw, 20px)`），适配从笔记本到 4K 显示器的各类屏幕。*Font sizes scale automatically with viewport width via CSS `clamp()`, supporting screens from laptops to 4K monitors.*

---

## 文件结构 · File Structure

```
wechat-readingh-skill/
├── index.html   # 可视化页面 · Visualization dashboard
├── server.js    # 本地代理服务 · Local proxy server
└── README.md    # 项目说明 · This file
```
