---
title: A native desktop workstation for multi-database workflows
eyebrow: GoNavi / Native Database Workflow
description: GoNavi brings a light, steady, and fast desktop experience to 30+ data sources including PostgreSQL, MySQL, Oracle, Redis, Kafka, MongoDB, ClickHouse, Elasticsearch, and more — letting developers and teams connect, query, compare, and ship from one place.
primaryCta:
  label: Download
  href: /en/download
secondaryCta:
  label: GitHub
  href: https://github.com/Syngnat/GoNavi
highlights:
  - Native desktop
  - 30+ data sources
  - Light, steady, fast
  - Built for developers and teams

featuresHeading:
  eyebrow: Core workflow
  title: Put high-frequency database work on one clean line
  description: GoNavi keeps the workflow stable and low-friction so developers can handle common tasks from a single control surface instead of bouncing between pages.

features:
  - icon: native
    title: Desktop-native performance
    description: Handle high-frequency queries, multi-database switching, and long sessions with the stability of a local app — no browser needed.
  - icon: multi
    title: Unified management for 30+ data sources
    description: Bring relational, NoSQL, vector, time-series, and message queue data sources into one control surface and cut context switching overhead.
  - icon: flow
    title: A continuous path from query to delivery
    description: History, favorites, result comparison, and export stay connected instead of fragmented.
  - icon: team
    title: Useful for individuals and teams
    description: Good for daily debugging, and equally good for aligning collaboration and output formats.

screenshotsHeading:
  eyebrow: Product screenshots
  title: See three core scenarios at a glance
  description: Real desktop captures showing connection management, data querying, and AI assistant workflows.

screenshots:
  - badge: Workspace
    title: Connections and tabs in one view
    description: Surface active connections, query history, and pinned items in a stable workspace panel.
    image: /screenshots/01-home-workbench.png
  - badge: AI Assistant
    title: Work with schema context
    description: The AI assistant reads live table schemas to generate SQL, explain queries, optimize statements, and review changes.
    image: /screenshots/04-ai-assistant.png
  - badge: Connection
    title: New connection data-source selector
    description: 30+ data sources including MySQL, PostgreSQL, Oracle, Redis, Kafka, MongoDB, vector databases, and domestic databases.
    image: /screenshots/06-new-connection.png

databasesHeading:
  eyebrow: Database matrix
  title: 30+ data sources, one interface
  description: From relational to NoSQL, time-series to message queues — GoNavi provides a consistent connection, query, and management experience for every data source.

databases:
  # Relational (built-in)
  - { name: PostgreSQL, kind: pg, status: primary, detail: Good for core business data, structure browsing, and frequent queries. }
  - { name: MySQL, kind: mysql, status: primary, detail: Covers common app stacks for everyday debugging and maintenance. }
  - { name: Oracle, kind: oracle, status: primary, detail: Built for enterprise-grade core business systems. }
  # Relational (plugin)
  - { name: SQL Server, kind: mssql, status: supported, detail: Fits enterprise systems and migration scenarios. }
  - { name: SQLite, kind: sqlite, status: supported, detail: Useful for local files, prototypes, and quick checks. }
  - { name: MariaDB, kind: mariadb, status: supported, detail: MySQL-compatible, suitable for high-availability setups. }
  - { name: ClickHouse, kind: clickhouse, status: supported, detail: Columnar analytics database for OLAP workloads. }
  - { name: DuckDB, kind: duckdb, status: supported, detail: Embedded analytics database for local data exploration. }
  - { name: Doris, kind: other, status: supported, detail: High-performance real-time analytics database. }
  - { name: StarRocks, kind: other, status: supported, detail: Fast all-scenario MPP database. }
  # NoSQL
  - { name: Redis, kind: redis, status: primary, detail: In-memory cache and key-value store for real-time data access. }
  - { name: MongoDB, kind: mongo, status: supported, detail: Suitable for document-oriented data browsing and review. }
  - { name: Elasticsearch, kind: elasticsearch, status: supported, detail: Full-text search and log analytics engine. }
  # Message queues (built-in)
  - { name: Kafka, kind: kafka, status: primary, detail: High-throughput distributed event streaming platform. }
  - { name: RabbitMQ, kind: other, status: primary, detail: Reliable message broker supporting multiple protocols. }
  - { name: RocketMQ, kind: other, status: primary, detail: Alibaba Cloud's open-source distributed messaging middleware. }
  # Time-series (plugin)
  - { name: TDengine, kind: tdengine, status: supported, detail: High-performance time-series database for IoT scenarios. }
  # Domestic databases (plugin)
  - { name: Dameng DM8, kind: dameng, status: supported, detail: Leading domestic relational database for government and enterprise. }
  - { name: Kingbase, kind: kingbase, status: supported, detail: Domestic relational database with Oracle compatibility. }
  - { name: OceanBase, kind: other, status: supported, detail: Distributed relational database with financial-grade HA. }
  - { name: OpenGauss, kind: other, status: supported, detail: Huawei's open-source relational database. }
  - { name: GaussDB, kind: other, status: supported, detail: Huawei cloud-native distributed database. }
  # Vector (built-in)
  - { name: Chroma, kind: other, status: primary, detail: Open-source vector database for AI applications. }
  - { name: Milvus, kind: other, status: primary, detail: High-performance vector database for large-scale retrieval. }
  - { name: Qdrant, kind: other, status: primary, detail: Vector search engine with filtering and aggregation. }
  # Other
  - { name: Nacos, kind: other, status: supported, detail: Configuration center and service discovery. }
  - { name: Sphinx, kind: other, status: supported, detail: Full-text search engine. }

cta:
  title: Streamline your database workflow from the desktop
  description: Download the app to try it, or explore the GitHub repository for implementation details.
  note: Built for daily developer debugging and team-wide consistency.
  primary: Download
  secondary: GitHub
---