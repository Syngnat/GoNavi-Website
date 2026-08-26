---
title: PostgreSQL 客户端：连接、查询与数据浏览
summary: 使用 GoNavi 在原生桌面工作台中管理 PostgreSQL 连接、库表与日常 SQL 查询
order: 6
locale: zh
slug: postgresql-client
---

GoNavi 内置 PostgreSQL 支持，适合把生产排查、分析库查询与日常数据浏览放在同一套桌面工作流中完成。

## PostgreSQL 的日常操作

连接建立后，可以从库表浏览进入查询上下文，执行 SQL、检查结果并继续处理。对于关系型数据源，GoNavi 覆盖库表浏览、SQL 查询、数据编辑、导出与备份等常见工作。

## 连接信息如何录入

可以使用主机信息或 URI 新建 PostgreSQL 连接；需要经过跳板机或代理时，也可在同一套连接配置中完成。已有团队配置可通过 JSON 导入导出，减少重复填写。

## 建议的开始方式

先阅读[连接配置](/zh/docs/connections/)，创建 PostgreSQL 连接后，再从[快速开始](/zh/docs/quick-start/)完成第一条查询。若需要同时管理其他数据库，可继续查看[多数据库客户端工作流](/zh/docs/database-workbench/)。
