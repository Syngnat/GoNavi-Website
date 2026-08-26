---
title: Redis 桌面客户端：Key 浏览、命令执行与视图切换
summary: 使用 GoNavi 连接 Redis，浏览 Key、执行命令，并按编码或视图检查缓存数据
order: 8
locale: zh
slug: redis-client
---

GoNavi 内置 Redis 支持，适合在开发与排障时把缓存数据检查放进与 SQL 数据源一致的桌面工作台。

## Redis 常用检查工作

连接 Redis 后，可以浏览 Key、执行命令，并按编码或视图切换方式查看数据。这让缓存排查不必脱离当前的连接与查询工作流，也便于和 MySQL、PostgreSQL 等业务数据源一起管理。

## 连接与网络配置

Redis 连接可从[连接配置](/zh/docs/connections/)开始创建。主机、URI、SSH、代理和 JSON 导入导出能力可用于适配不同的部署环境与既有连接清单。

## 同时管理缓存与数据库

如果你的日常工作同时涉及 Redis、关系型数据库和消息队列，请查看[多数据库客户端工作流](/zh/docs/database-workbench/)和完整的[数据源支持](/zh/docs/data-sources/)列表。
