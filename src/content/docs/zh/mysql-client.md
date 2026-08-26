---
title: MySQL 客户端：连接、查询与数据编辑
summary: 使用 GoNavi 连接 MySQL，浏览库表、执行 SQL 并处理日常数据工作
order: 7
locale: zh
slug: mysql-client
---

GoNavi 内置 MySQL 支持，适合开发、测试与日常维护中频繁的连接切换、SQL 查询和数据检查。

## 在一个工作台中处理 MySQL

建立连接后，可以浏览数据库与表结构，并在查询工作流中执行 SQL、检查返回结果。关系型数据源的常见能力包括库表浏览、SQL 查询、数据编辑、导出与备份，避免为了不同数据库切换多套界面。

## 保留团队已有连接方式

MySQL 连接可通过主机信息或 URI 录入；SSH、代理和 JSON 导入导出可用于适配现有网络和团队配置。先把连接配置整理好，后续在多个环境之间切换会更直接。

## 下一步

从[安装与更新](/zh/docs/install/)开始，按[连接配置](/zh/docs/connections/)创建 MySQL 连接。若还要同时处理 PostgreSQL、Redis 或 Kafka，可查看[多数据库客户端工作流](/zh/docs/database-workbench/)。
