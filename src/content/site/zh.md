---
title: 为多数据库工作流打造的原生桌面工作台
eyebrow: GoNavi / 原生数据库工作流
description: 以轻稳快的桌面体验串联 PostgreSQL、MySQL、Oracle、Redis、Kafka、MongoDB、ClickHouse、Elasticsearch 等 30+ 种数据源，让开发者和团队在同一个地方完成连接、查询、比对与交付。
primaryCta:
  label: 立即下载
  href: /zh/download
secondaryCta:
  label: GitHub
  href: https://github.com/Syngnat/GoNavi
highlights:
  - 原生桌面
  - 30+ 数据源
  - 轻稳快
  - 开发者与团队兼顾

featuresHeading:
  eyebrow: 核心工作流
  title: 将高频数据库操作整合成一条流畅的工作线
  description: GoNavi 不把工作流拆散到多个页面，而是在单一控制面中完成连接、查询、比对与交付，保持连贯与低摩擦。

features:
  - icon: native
    title: 原生桌面体验
    description: 以本地应用的稳定性承载高频查询、多库切换与长时间工作，不依赖浏览器。
  - icon: multi
    title: 30+ 数据源统一管理
    description: 关系型、NoSQL、向量、时序、消息队列等 30+ 种数据源纳入同一套界面，减少上下文切换成本。
  - icon: flow
    title: 从查询到交付一气呵成
    description: 历史记录、收藏、结果比对与导出分享连贯衔接，不打断工作节奏。
  - icon: team
    title: 个人与团队皆可轻松上手
    description: 既适合开发者日常排查，也便于团队统一工作方式与产出格式。

screenshotsHeading:
  eyebrow: 产品截图
  title: 三大核心场景一目了然
  description: 真实桌面截图展示连接管理、数据查询与 AI 助手三类核心场景。

screenshots:
  - badge: 工作台
    title: 连接池与标签页同屏
    description: 将活跃连接、查询历史和收藏视图整合在一个稳定的工作面板中。
    image: /screenshots/01-home-workbench.png
  - badge: AI 助手
    title: 带着表结构上下文推进工作
    description: AI 助手面板感知当前表结构，可生成 SQL、解释查询、优化语句与审阅变更。
    image: /screenshots/04-ai-assistant.png
  - badge: 连接
    title: 新建连接数据源选择器
    description: 支持 MySQL、PostgreSQL、Oracle、Redis、Kafka、MongoDB、向量数据库与国产数据库等 30+ 种数据源。
    image: /screenshots/06-new-connection.png

databasesHeading:
  eyebrow: 数据库矩阵
  title: 30+ 数据源，一套界面
  description: 从关系型到 NoSQL、从时序到消息队列，GoNavi 为每种数据源提供一致的连接、查询与管理体验。

databases:
  # 关系型（内置）
  - { name: PostgreSQL, kind: pg, status: primary, detail: 适合主业务库、结构浏览与高频查询。 }
  - { name: MySQL, kind: mysql, status: primary, detail: 覆盖常见应用栈，便于日常调试与维护。 }
  - { name: Oracle, kind: oracle, status: primary, detail: 面向企业级核心业务系统。 }
  # 关系型（插件）
  - { name: SQL Server, kind: mssql, status: supported, detail: 面向企业系统与既有迁移场景。 }
  - { name: SQLite, kind: sqlite, status: supported, detail: 适用于本地文件库、原型验证与轻量检查。 }
  - { name: MariaDB, kind: mariadb, status: supported, detail: MySQL 兼容，适用于高可用场景。 }
  - { name: ClickHouse, kind: clickhouse, status: supported, detail: 列式分析数据库，适合 OLAP 场景。 }
  - { name: DuckDB, kind: duckdb, status: supported, detail: 嵌入式分析数据库，适合本地数据探索。 }
  - { name: Doris, kind: other, status: supported, detail: 高性能实时分析数据库。 }
  - { name: StarRocks, kind: other, status: supported, detail: 极速全场景 MPP 数据库。 }
  # NoSQL
  - { name: Redis, kind: redis, status: primary, detail: 内存缓存与键值存储，适合实时数据访问。 }
  - { name: MongoDB, kind: mongo, status: supported, detail: 适合文档型数据浏览与结果审阅。 }
  - { name: Elasticsearch, kind: elasticsearch, status: supported, detail: 全文搜索与日志分析引擎。 }
  # 消息队列（内置）
  - { name: Kafka, kind: kafka, status: primary, detail: 高吞吐分布式消息流平台。 }
  - { name: RabbitMQ, kind: other, status: primary, detail: 可靠消息代理，支持多种协议。 }
  - { name: RocketMQ, kind: other, status: primary, detail: 阿里云开源的分布式消息中间件。 }
  # 时序（插件）
  - { name: TDengine, kind: tdengine, status: supported, detail: 高性能时序数据库，适合物联网场景。 }
  # 国产数据库（插件）
  - { name: 达梦 DM8, kind: dameng, status: supported, detail: 国产关系型数据库，政企主流选择。 }
  - { name: 人大金仓 Kingbase, kind: kingbase, status: supported, detail: 国产关系型数据库，兼容 Oracle。 }
  - { name: OceanBase, kind: other, status: supported, detail: 分布式关系型数据库，金融级高可用。 }
  - { name: OpenGauss, kind: other, status: supported, detail: 华为开源的关系型数据库。 }
  - { name: GaussDB, kind: other, status: supported, detail: 华为云原生分布式数据库。 }
  # 向量（内置）
  - { name: Chroma, kind: other, status: primary, detail: 开源向量数据库，适合 AI 应用。 }
  - { name: Milvus, kind: other, status: primary, detail: 高性能向量数据库，支持大规模检索。 }
  - { name: Qdrant, kind: other, status: primary, detail: 向量搜索引擎，支持过滤与聚合。 }
  # 其他
  - { name: Nacos, kind: other, status: supported, detail: 配置中心与服务发现。 }
  - { name: Sphinx, kind: other, status: supported, detail: 全文搜索引擎。 }

cta:
  title: 精简数据库工作流，从桌面开始
  description: 下载桌面端开始试用，或查看 GitHub 仓库了解实现细节。
  note: 面向开发者日常排障，也适合团队统一使用。
  primary: 立即下载
  secondary: GitHub
---