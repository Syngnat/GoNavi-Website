---
title: 多数据库客户端：统一连接、查询与数据浏览
summary: 面向 PostgreSQL、MySQL、Redis、Kafka、ClickHouse 等数据源的原生桌面工作台
order: 5
locale: zh
slug: database-workbench
---

GoNavi 是面向日常开发与排障的**多数据库客户端**。它把关系型数据库、缓存、消息队列、向量库、搜索与时序数据库放进同一个桌面工作台，减少在多个工具之间切换连接、查询与结果的成本。

## 适合哪些工作

- 在 PostgreSQL、MySQL、Oracle 等关系型数据库之间切换并执行 SQL
- 浏览 Redis Key、执行命令，按编码或视图检查数据
- 查看 Kafka 等消息队列的 Topic 与消费组状态
- 通过可选驱动代理接入 ClickHouse、SQLite、SQL Server、MongoDB、Elasticsearch 等更多数据源

## 一套连接与查询工作流

内置数据源可直接使用；需要额外协议或驱动的数据源，可以在驱动管理中按需启用。连接配置支持主机、URI、SSH、代理，以及 JSON 导入导出，便于把团队已有连接迁移进来。

关系型数据源的常用工作包括库表浏览、SQL 查询、数据编辑、导出与备份。不同类型的数据源则保留各自的操作方式，例如 Redis 的 Key 浏览与 Kafka 的 Topic、消费组检查。

## 从哪里开始

先完成[安装与更新](/zh/docs/install/)，再按[连接配置](/zh/docs/connections/)新建连接。想确认某个数据库是否内置支持或需要驱动代理，请查看[数据源支持](/zh/docs/data-sources/)。
