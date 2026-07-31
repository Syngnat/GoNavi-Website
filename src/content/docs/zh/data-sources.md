---
title: 数据源支持
summary: 内置开箱即用、可选驱动代理按需安装，一套工作台打通 SQL · 缓存 · 向量 · 消息 · 搜索 · 时序 · 国产库
order: 4
locale: zh
slug: data-sources
---

GoNavi 把关系型、缓存、向量库、消息队列、搜索、时序与国产数据库收敛进同一个工作台。数据源分两类：**内置**开箱即用，**可选驱动代理**在驱动管理中按需安装启用。

## 内置数据源

开箱即用，无需额外驱动：

- **关系型**：MySQL · PostgreSQL · Oracle
- **国产数据库**：GoldenDB
- **缓存**：Redis
- **向量数据库**：Chroma · Qdrant · Milvus
- **消息队列**：RocketMQ · MQTT · Kafka · RabbitMQ

## 可选驱动代理

通过驱动管理器安装启用：

- **关系型**：MariaDB · Doris · StarRocks · SQL Server · Sphinx
- **文件型**：SQLite · DuckDB
- **国产数据库**：OceanBase · 达梦 · 人大金仓 · 瀚高 · 海量 · openGauss · GaussDB
- **多模型 / 文档型**：InterSystems IRIS · MongoDB
- **时序**：TDengine · Apache IoTDB
- **列式分析**：ClickHouse
- **联邦查询**：Trino
- **搜索**：Elasticsearch
- **扩展接入**：通过 Custom Driver + DSN 接入更多数据源

## 典型能力

- 关系型：库表浏览、SQL 查询、数据编辑、导出/备份
- Redis：Key 浏览、命令执行、编码/视图切换
- 向量库：Collection 浏览、向量检索、标量/元数据过滤
- 消息队列：Topic / Queue / Exchange 浏览、消费组检查
- 国产库：类 PostgreSQL / MySQL 兼容的库表浏览与查询工作流
