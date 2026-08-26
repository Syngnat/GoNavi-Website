---
title: ClickHouse 客户端：接入列式分析数据库
summary: 通过 GoNavi 可选驱动代理接入 ClickHouse，并纳入统一的连接与查询工作流
order: 10
locale: zh
slug: clickhouse-client
---

ClickHouse 可通过 GoNavi 的可选驱动代理接入。启用后，它会和其他数据源一起进入同一个桌面工作台，适合在分析型数据库与业务库之间切换查询。

## 何时使用 ClickHouse 接入

当日常任务需要同时查看列式分析结果、业务库数据或缓存状态时，统一的连接入口可以减少工具切换。ClickHouse 在 GoNavi 的数据源体系中属于按需启用的列式分析数据源。

## 启用前先确认驱动

请先查看[数据源支持](/zh/docs/data-sources/)确认可选驱动代理的范围，再从[连接配置](/zh/docs/connections/)录入连接。驱动安装与启用由驱动管理完成，因此无需把所有非内置数据源预先安装到本机。

## 扩展到更多数据源

同一套可选驱动机制还覆盖 SQLite、DuckDB、SQL Server、MongoDB、Elasticsearch、Trino 等数据源。想了解统一工作方式，可继续阅读[多数据库客户端工作流](/zh/docs/database-workbench/)。
