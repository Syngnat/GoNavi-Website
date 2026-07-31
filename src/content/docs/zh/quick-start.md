---
title: 快速开始
summary: 从下载到第一条查询的最短路径
order: 2
locale: zh
slug: quick-start
---

## 用户：从下载到第一条查询

1. 从 [GitHub Releases](https://github.com/Syngnat/GoNavi/releases) 下载对应平台的安装包并启动 GoNavi。
2. 在首页或下载页确认当前版本，再进入客户端创建连接。
3. 选择数据库类型，填写主机、端口、认证与可选的 SSH / 代理参数。
4. 保存连接后打开查询面板，执行第一条 SQL 或浏览对象树。

## 推荐路径

- 开发者个人：先从本地开发库或测试库开始，确认连接链路与编码设置。
- 团队协作：统一收藏、导出和命名方式，减少排查时的信息损耗。

## 开发者：从源码搭建

<details>
<summary>本地开发环境</summary>

前置要求：[Go](https://go.dev/dl/) 1.21+、[Node.js](https://nodejs.org/) 18+、[Wails CLI](https://wails.io/docs/gettingstarted/installation)。

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@v2.11.0

git clone https://github.com/Syngnat/GoNavi.git
cd GoNavi

wails dev                          # 完整热重载
node tools/wails-fast-dev.mjs      # Go 导出签名未变时更快
```

构建产物：

```bash
wails build              # 产物位于 build/bin
wails build -clean       # 发布前推荐
```

</details>

## 下一步

- 查看[安装与更新](/zh/docs/install)了解不同平台的安装与依赖。
- 查看[连接配置](/zh/docs/connections)了解 URI、SSH、代理与 JSON 导入导出。
