---
title: 数据源支持
summary: 支持的 50 多种数据源，哪些内置、哪些要装驱动，以及各自能做什么
order: 4
locale: zh
slug: data-sources
---

GoNavi 支持关系型、缓存、向量、消息队列、搜索、时序和国产数据库，目前共 50 多种。数据源分两类：**内置**的装好就能用；**可选驱动代理**在驱动管理里按需安装。

## 内置数据源

开箱即用，无需额外驱动：

- **关系型**：MySQL · PostgreSQL · Oracle
- **国产数据库**：GoldenDB
- **缓存**：Redis
- **向量数据库**：Chroma · Qdrant · Milvus
- **消息队列**：RocketMQ · MQTT · Kafka · RabbitMQ

## 可选驱动代理

通过驱动管理器安装启用：

- **关系型**：MariaDB · Doris · SQL Server · TiDB · CockroachDB · Firebird
- **列式分析**：StarRocks · ClickHouse
- **搜索**：Sphinx · Elasticsearch · OpenSearch · Meilisearch · Typesense
- **文件型**：SQLite · DuckDB
- **国产数据库**：OceanBase · 达梦 Dameng · 人大金仓 Kingbase · 瀚高 HighGo · 海量 Vastbase · openGauss · GaussDB · GBase 8a · GBase 8c · GBase 8s · 崖山 YashanDB
- **多模型数据库**：InterSystems IRIS · InterSystems Caché
- **文档型**：MongoDB
- **时序**：TDengine · Apache IoTDB · KWDB · TimescaleDB · QuestDB · GreptimeDB · InfluxDB
- **联邦查询**：Trino · Presto
- **向量数据库**：Weaviate
- **键值**：etcd
- **协调服务**：ZooKeeper
- **扩展接入**：通过 Custom Driver + DSN 接入更多数据源

## 完整能力矩阵

| 类别 | 数据源 | 驱动模式 | 典型能力 |
|---|---|---|---|
| 关系型 | MySQL | 内置 | 库表浏览、SQL 查询、数据编辑、导出/备份 |
| 国产数据库 | GoldenDB | 内置 | MySQL 兼容查询工作流、分布式事务场景 |
| 关系型 | PostgreSQL | 内置 | 库表浏览、SQL 查询、数据编辑、对象管理 |
| 关系型 | Oracle | 内置 | 连接查询、对象浏览、数据编辑 |
| 缓存 | Redis | 内置 | Key 浏览、命令执行、编码/视图切换 |
| 向量数据库 | Chroma | 内置 | Collection 浏览、向量检索、元数据过滤 |
| 向量数据库 | Qdrant | 内置 | Collection 浏览、向量搜索、Payload 过滤 |
| 向量数据库 | Milvus | 内置 | Collection 浏览、向量搜索、标量过滤 |
| 消息队列 | RocketMQ | 内置 | Topic 浏览、消费组检查、消息型工作流 |
| 消息队列 | MQTT | 内置 | Broker / Topic Filter 工作流与 QoS 连接配置 |
| 消息队列 | Kafka | 内置 | Topic 浏览、Broker 元数据、消费组工作流 |
| 消息队列 | RabbitMQ | 内置 | Queue / Exchange 浏览、Virtual Host 检查、Management API 工作流 |
| 关系型 | MariaDB | 可选驱动代理 | 连接查询、对象管理、数据编辑 |
| 关系型 | Doris | 可选驱动代理 | 连接查询、对象浏览、SQL 执行 |
| 列式分析 | StarRocks | 可选驱动代理 | 连接查询、对象浏览、SQL 执行 |
| 搜索 | Sphinx | 可选驱动代理 | SphinxQL 查询与对象浏览 |
| 关系型 | SQL Server | 可选驱动代理 | 库表浏览、SQL 查询、对象管理 |
| 文件型 | SQLite | 可选驱动代理 | 本地文件库浏览、编辑、导出 |
| 文件型 | DuckDB | 可选驱动代理 | 大表查询、分页浏览、文件库管理 |
| 国产数据库 | OceanBase | 可选驱动代理 | MySQL / Oracle 租户接入、对象浏览、查询工作流 |
| 国产数据库 | 达梦 Dameng | 可选驱动代理 | 连接查询、对象浏览、数据编辑 |
| 国产数据库 | 人大金仓 Kingbase | 可选驱动代理 | 连接查询、对象浏览、数据编辑 |
| 国产数据库 | 瀚高 HighGo | 可选驱动代理 | 连接查询、对象浏览、数据编辑 |
| 国产数据库 | 海量 Vastbase | 可选驱动代理 | 连接查询、对象浏览、数据编辑 |
| 国产数据库 | openGauss | 可选驱动代理 | 类 PostgreSQL 的库表浏览、SQL 查询、对象管理 |
| 国产数据库 | GaussDB | 可选驱动代理 | 类 PostgreSQL 的库表浏览、SQL 查询、对象管理 |
| 多模型数据库 | InterSystems IRIS | 可选驱动代理 | Namespace 浏览、SQL 查询、对象管理 |
| 多模型数据库 | InterSystems Caché | 可选驱动代理 | Namespace 浏览、Caché SQL 查询、对象管理 |
| 文档型 | MongoDB | 可选驱动代理 | 文档查询、集合浏览、连接管理 |
| 时序 | TDengine | 可选驱动代理 | 时序库表浏览、查询分析 |
| 时序 | Apache IoTDB | 可选驱动代理 | Storage Group / Device / Timeseries 浏览与查询 |
| 列式分析 | ClickHouse | 可选驱动代理 | 分析查询、对象浏览、SQL 执行 |
| 联邦查询 | Trino | 可选驱动代理 | 跨多数据源联邦 SQL、`catalog.schema` 浏览、SQL 执行 |
| 搜索 | Elasticsearch | 可选驱动代理 | 索引浏览、Mapping 检查、受控 REST 控制台、JSON DSL / query_string 查询 |
| 关系型 | TiDB | 可选驱动代理 | 兼容 MySQL 的查询、TiDB 执行计划、数据编辑、同步与迁移 |
| 关系型 | CockroachDB | 可选驱动代理 | PostgreSQL 协议查询、SHOW CREATE 建表语句、数据编辑、同步与迁移 |
| 时序 | KWDB | 可选驱动代理 | PostgreSQL 协议下的关系库与时序库、数据编辑、同步与迁移 |
| 时序 | TimescaleDB | 可选驱动代理 | 超表与连续聚合、分块统计、PostgreSQL 工作流、同步与迁移 |
| 国产数据库 | GBase 8a | 可选驱动代理 | MySQL 协议的 MPP 查询、HASH 索引、按类分批提交、同步与迁移 |
| 国产数据库 | GBase 8c | 可选驱动代理 | openGauss 内核（A / B / PG 兼容模式）、sha256 认证、对象管理、同步与迁移 |
| 国产数据库 | GBase 8s | 可选驱动代理 | 经用户自备的 GBase 8s CSDK 接入（Informix SQLI）、对象浏览、数据编辑、SQL 备份恢复 |
| 国产数据库 | 崖山 YashanDB | 可选驱动代理 | 经用户自备的崖山客户端接入、兼容 Oracle 的查询与 PL/SQL 对象、执行计划、同步与迁移 |
| 关系型 | Firebird | 可选驱动代理 | Firebird 2.5 / 3.0 / 4–5、存储过程 / 触发器 / 包、数据编辑、SQL 备份恢复 |
| 时序 | QuestDB | 可选驱动代理 | 分区时序表、SQL 查询、执行计划、追加导入 |
| 时序 | GreptimeDB | 可选驱动代理 | MySQL 协议查询、TIME INDEX / Tag 元数据、追加导入 |
| 时序 | InfluxDB | 可选驱动代理 | InfluxDB 1.x（InfluxQL）/ 2.x（Flux）/ 3.x（SQL）、行协议写入、网格编辑 |
| 联邦查询 | Presto | 可选驱动代理 | PrestoDB / PrestoSQL 多目录、SQL 执行与取消、作为迁移源 |
| 搜索 | OpenSearch | 可选驱动代理 | OpenSearch 1.x / 2.x / 3.x 索引、受控 REST 控制台、SQL / PPL |
| 向量数据库 | Weaviate | 可选驱动代理 | Class 与租户、基于 GraphQL 的网格浏览与编辑、向量列 |
| 搜索 | Meilisearch | 可选驱动代理 | 索引即表、过滤 / 排序下推、文档编辑、REST 控制台 |
| 搜索 | Typesense | 可选驱动代理 | 集合即表、filter_by 下推、文档编辑、REST 控制台 |
| 键值 | etcd | 可选驱动代理 | 前缀树浏览、键与租约编辑、etcdctl 风格控制台（v2 / v3 API） |
| 协调服务 | ZooKeeper | 可选驱动代理 | Znode 树浏览、数据与 ACL 查看、节点编辑、zkCli 风格控制台 |
| 扩展接入 | Custom Driver/DSN | 自定义 | 通过 Driver + DSN 接入更多数据源 |

## 按数据源查看使用指南

- [PostgreSQL 客户端](/zh/docs/postgresql-client/)：连接、浏览、查询与数据交付工作流。
- [MySQL 客户端](/zh/docs/mysql-client/)：面向日常开发和排查的桌面数据库工作流。
- [Redis 客户端](/zh/docs/redis-client/)：Key 浏览、命令执行与值查看。
- [Kafka 浏览器](/zh/docs/kafka-browser/)：Topic 浏览与消费组检查。
- [ClickHouse 客户端](/zh/docs/clickhouse-client/)：通过可选驱动接入列式分析场景。
- [多数据源工作台](/zh/docs/database-workbench/)：了解如何把这些连接放进同一个桌面工作区。
