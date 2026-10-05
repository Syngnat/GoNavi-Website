---
title: 开源跨平台数据库客户端
description: GoNavi 是开源的跨平台数据库客户端，支持 MySQL、PostgreSQL、Oracle、Redis、Kafka、MongoDB、ClickHouse 等 50 多种数据源，自带 AI 助手和 MCP 服务，安装包 20 多 MB。

hero:
  headline:
    - 从 MySQL 到 Kafka，
    - 一个客户端都能连
  # The word joiner and no-break space keep "20–26 MB" on one line.
  lede: "GoNavi 是开源的数据库客户端，支持 50 多种数据源，Windows、macOS、Linux 都能用。它不基于 Electron，安装包只有 20–⁠26 MB。"
  download: 下载 GoNavi
  facts:
    - label: Apache-2.0 开源
    - label: 50+ 数据源
      href: "#sources"
    - label: 支持 MCP
      href: "#agents"

tour:
  label: 产品导览
  note: 截图里的数据来自本地测试库，连接地址、密钥和 AI 服务配置都没有出现在画面里。
  shots:
    - id: editor
      label: SQL 编辑器
      caption: 写 SQL、看结果，左侧浏览库表
      image: /screenshots/02-query-editor.png
    - id: workbench
      label: 工作台
      caption: 最近用过的连接和保存的查询
      image: /screenshots/01-home-workbench.png
    - id: assistant
      label: AI 助手
      caption: AI 能看到表结构，写出的 SQL 可以插入编辑器、直接执行或先预览
      image: /screenshots/04-ai-assistant.png
    - id: connect
      label: 新建连接
      caption: 按类别找数据源，也可以直接搜
      image: /screenshots/06-new-connection.png
    - id: history
      label: 执行历史
      caption: 按状态和时间筛选执行过的 SQL，一键填回编辑器
      image: /screenshots/08-sql-execution-history.png
    - id: audit
      label: SQL 审计
      caption: 所有连接的 SQL 审计记录，默认脱敏
      image: /screenshots/09-sql-audit.png
    - id: tools
      label: AI 工具
      caption: AI 可以调用的内置工具和排查流程
      image: /screenshots/05-ai-settings.png
    - id: themes
      label: 主题
      caption: 8 套内置主题，也可以上传自己的 CSS
      image: /screenshots/07-settings-themes.png

scorecard:
  kicker: 体积和内存
  title: "安装包多大，\n运行时占多少内存"
  description: 不少数据库客户端基于 Electron，安装包动辄几百 MB。GoNavi 用 Go 加系统自带的 WebView 构建。下面是 v0.9.8 的实测数据，测量方法也写在这里。
  sample: v0.9.8 实测
  metrics:
    - label: 安装包
      question: 下载大小
      value: 20–26 MB
      note: Windows、macOS、Linux 的安装包都在这个范围内。
    - label: 界面技术
      question: 用什么绘制界面
      value: Go + 系统 WebView
      note: 基于 Wails 框架，不打包 Chromium。
    - label: 运行内存
      question: 打开后占用多少
      value: ≈ 429 MB
      note: Linux 版打开空工作台、不连数据库时主进程的常驻内存；加上 WebKit 子进程约 765 MB。
  compare:
    caption: 与常见 Electron 客户端对比
    other: 常见 Electron 客户端
    rows:
      - { label: 运行时, other: Chromium + Node.js, gonavi: Go + 系统 WebView }
      - { label: 安装包, other: 通常几百 MB, gonavi: 20–26 MB }
      - { label: 启动, other: 较慢, gonavi: 较快 }
      - { label: 内存数据, other: 常和安装包大小混在一起说, gonavi: 单独测量，公开方法 }
      - { label: AI, other: 没有，或者要装插件, gonavi: 内置 AI 助手，支持 MCP }
      - { label: 数据源, other: 以关系型数据库为主, gonavi: 还支持缓存、消息队列、向量、搜索、时序和国产数据库 }
  method: 安装包大小和运行内存是两回事。上面的内存数据来自一次 Linux 云主机实测：v0.9.8 WebKit41 版本，空工作台，不连数据库，通过远程桌面显示，稳定 30–40 秒后读取。在 Windows 和 macOS 上测会有出入。
  methodLink:
    label: 完整的测量方法
    href: /blog/lightweight-native-database-client-2026

capabilities:
  kicker: 功能
  title: 主要功能
  description: 写 SQL、改数据、导出结果、查执行记录，都在一个窗口里完成。
  items:
    - id: ai
      title: AI 助手
      summary: AI 能看到当前数据库的表结构，可以帮你写 SQL、解释语句、给出优化建议。生成的 SQL 可以先预览，确认后再执行。
      points:
        - 支持 OpenAI、Gemini、Claude，以及兼容 OpenAI 接口的服务
        - 自动带上当前库的表结构
        - 快捷指令：生成 SQL、解释、优化、评审表设计
        - 数据库密码只留在本机，不会交给 AI
      image: /screenshots/04-ai-assistant.png
      alt: GoNavi 的 AI 助手面板，根据表结构生成 SQL，可以插入、执行或预览
      zoom: 2.32
      x: 56.9
      y: 6.7
    - id: data
      title: 结果表格
      summary: 表格采用虚拟滚动，结果集再大也能流畅翻看。可以直接在单元格里改数据，最后一起提交。
      points:
        - 单元格直接编辑，支持批量增删改
        - 改动可以按事务提交或回滚
        - 大字段在弹窗里查看和编辑
        - 导出 CSV、XLSX、JSON、Markdown
        - SQL 编辑器基于 Monaco，能补全库名、表名和字段名
      image: /screenshots/02-query-editor.png
      alt: GoNavi 的 SQL 编辑器和结果表格
      zoom: 1.371
      x: 23.3
      y: 6.1
    - id: connect
      title: 连接与驱动
      summary: 支持 URI、SSH 隧道和代理。连接配置可以导出成 JSON，换电脑或分享给同事时直接导入。
      points:
        - 粘贴 URI 自动填好连接信息，也能反过来生成 URI
        - SSH 隧道、代理
        - 连接配置 JSON 导入导出
        - 不常用的数据库驱动，用到时再安装
        - 列表里没有的数据库，可以用自定义 Driver + DSN 接入
      image: /screenshots/06-new-connection.png
      alt: GoNavi 的新建连接窗口，数据源按类别排列，可以搜索
      zoom: 1.895
      x: 23.6
      y: 7.8
    - id: audit
      title: 执行记录与审计
      summary: 执行过的每条 SQL 都有记录和耗时。审计记录默认脱敏，可以设置保留多久，也能导出。
      points:
        - SQL 执行日志，带耗时
        - 审计中心：默认脱敏，可设置保留时间，可导出
        - 除了桌面版，还有实验性的 Web Server 版，用浏览器访问
        - 支持 Docker、K8s、Helm、Podman 部署
        - 自动检查更新，提供 x64 和 ARM64 安装包
      image: /screenshots/09-sql-audit.png
      alt: GoNavi 的 SQL 审计中心，列出各个连接的脱敏审计记录
      zoom: 1.371
      x: 23.6
      y: 6.1

agents:
  kicker: MCP
  title: "让 Claude Code、Codex\n直接读你的表结构"
  description: GoNavi 自带 MCP 服务。接入后，编码 Agent 可以查询库表结构，你开启后也能执行 SQL。数据库密码只保存在运行 GoNavi 的电脑上，Agent 拿不到。
  points:
    - 本机装了下面这些 CLI，GoNavi 能检测到并一键接入；远程 Agent 通过 Streamable HTTP 连接。
    - 远程默认只开放表结构查询，不提供 execute_sql；开启后和内置 AI 助手使用同一套安全设置。
    - 也可以单独部署 MCP Server，支持 Docker、K8s、Helm、Podman。
  clientsLabel: 支持一键接入
  clients: [Claude Code, Codex, OpenCode, ZCode, DeepSeek Harness, Kimi Code, Grok Build]
  flow:
    label: 例：Agent 查找表和字段时依次调用的工具
    steps: [get_connections, get_server_version, get_databases, get_tables, get_columns]
  snippets:
    - id: mcp
      label: MCP 容器
      code: |-
        cp docker.mcp-server.env.example docker.mcp-server.env
        docker compose --env-file docker.mcp-server.env \
          -f docker-compose.mcp-server.yml up -d
    - id: cli
      label: 命令行
      code: |-
        gonavi list-connections
        gonavi query --conn CONNECTION_ID \
          --sql 'SELECT * FROM orders LIMIT 10'
        gonavi export --conn CONNECTION_ID \
          --output orders.csv --sql 'SELECT * FROM orders'
    - id: web
      label: Web Server
      code: |-
        cp docker.web-server.env.example docker.web-server.env
        docker compose --env-file docker.web-server.env \
          -f docker-compose.web-server.yml up -d
  link:
    label: MCP Server 文档
    href: https://github.com/Syngnat/GoNavi/blob/dev/cmd/gonavi-mcp-server/README.md

sources:
  kicker: 数据源
  title: 支持 50 多种数据源
  description: MySQL、PostgreSQL、Oracle、Redis、Kafka 等常用数据源是内置的，装好就能连；其他的在驱动管理里按需安装。
  categories:
    - { id: relational, label: 关系型 }
    - { id: domestic, label: 国产数据库 }
    - { id: analytics, label: 分析 · 联邦查询 }
    - { id: timeseries, label: 时序 }
    - { id: search, label: 搜索 }
    - { id: vector, label: 向量 }
    - { id: messaging, label: 消息队列 }
    - { id: nosql, label: NoSQL · 协调 }

databases:
  # 关系型
  - { name: MySQL, category: relational, status: primary, doc: mysql-client, detail: "库表浏览、SQL 查询、数据编辑、导出/备份" }
  - { name: PostgreSQL, category: relational, status: primary, doc: postgresql-client, detail: "库表浏览、SQL 查询、数据编辑、对象管理" }
  - { name: Oracle, category: relational, status: primary, detail: "连接查询、对象浏览、数据编辑" }
  - { name: MariaDB, category: relational, status: supported, detail: "连接查询、对象管理、数据编辑" }
  - { name: SQL Server, category: relational, status: supported, detail: "库表浏览、SQL 查询、对象管理" }
  - { name: TiDB, category: relational, status: supported, detail: "兼容 MySQL 的查询、TiDB 执行计划、数据编辑、同步与迁移" }
  - { name: CockroachDB, category: relational, status: supported, detail: "PostgreSQL 协议查询、SHOW CREATE 建表语句、数据编辑、同步与迁移" }
  - { name: Firebird, category: relational, status: supported, detail: "Firebird 2.5 / 3.0 / 4–5、存储过程 / 触发器 / 包、数据编辑、SQL 备份恢复" }
  - { name: SQLite, category: relational, status: supported, detail: "本地文件库浏览、编辑、导出" }
  - { name: DuckDB, category: relational, status: supported, detail: "大表查询、分页浏览、文件库管理" }
  - { name: InterSystems IRIS, category: relational, status: supported, detail: "Namespace 浏览、SQL 查询、对象管理" }
  - { name: InterSystems Caché, category: relational, status: supported, detail: "Namespace 浏览、Caché SQL 查询、对象管理" }
  # 国产数据库
  - { name: GoldenDB, category: domestic, status: primary, detail: "MySQL 兼容查询、分布式事务" }
  - { name: OceanBase, category: domestic, status: supported, detail: "MySQL / Oracle 租户接入、对象浏览、SQL 查询" }
  - { name: 达梦 Dameng, category: domestic, status: supported, detail: "连接查询、对象浏览、数据编辑" }
  - { name: 人大金仓 Kingbase, category: domestic, status: supported, detail: "连接查询、对象浏览、数据编辑" }
  - { name: 瀚高 HighGo, category: domestic, status: supported, detail: "连接查询、对象浏览、数据编辑" }
  - { name: 海量 Vastbase, category: domestic, status: supported, detail: "连接查询、对象浏览、数据编辑" }
  - { name: openGauss, category: domestic, status: supported, detail: "类 PostgreSQL 的库表浏览、SQL 查询、对象管理" }
  - { name: GaussDB, category: domestic, status: supported, detail: "类 PostgreSQL 的库表浏览、SQL 查询、对象管理" }
  - { name: GBase 8a, category: domestic, status: supported, detail: "MySQL 协议的 MPP 查询、HASH 索引、按类分批提交、同步与迁移" }
  - { name: GBase 8c, category: domestic, status: supported, detail: "openGauss 内核（A / B / PG 兼容模式）、sha256 认证、对象管理、同步与迁移" }
  - { name: GBase 8s, category: domestic, status: supported, detail: "经用户自备的 GBase 8s CSDK 接入（Informix SQLI）、对象浏览、数据编辑、SQL 备份恢复" }
  - { name: 崖山 YashanDB, category: domestic, status: supported, detail: "经用户自备的崖山客户端接入、兼容 Oracle 的查询与 PL/SQL 对象、执行计划、同步与迁移" }
  # 分析 · 联邦查询
  - { name: ClickHouse, category: analytics, status: supported, doc: clickhouse-client, detail: "分析查询、对象浏览、SQL 执行" }
  - { name: Doris, category: analytics, status: supported, detail: "连接查询、对象浏览、SQL 执行" }
  - { name: StarRocks, category: analytics, status: supported, detail: "连接查询、对象浏览、SQL 执行" }
  - { name: Trino, category: analytics, status: supported, detail: "跨多数据源联邦 SQL、catalog.schema 浏览、SQL 执行" }
  - { name: Presto, category: analytics, status: supported, detail: "PrestoDB / PrestoSQL 多目录、SQL 执行与取消、作为迁移源" }
  # 时序
  - { name: TDengine, category: timeseries, status: supported, detail: "时序库表浏览、查询分析" }
  - { name: Apache IoTDB, category: timeseries, status: supported, detail: "Storage Group / Device / Timeseries 浏览与查询" }
  - { name: InfluxDB, category: timeseries, status: supported, detail: "InfluxDB 1.x（InfluxQL）/ 2.x（Flux）/ 3.x（SQL）、行协议写入、网格编辑" }
  - { name: TimescaleDB, category: timeseries, status: supported, detail: "超表与连续聚合、分块统计、兼容 PostgreSQL、同步与迁移" }
  - { name: QuestDB, category: timeseries, status: supported, detail: "分区时序表、SQL 查询、执行计划、追加导入" }
  - { name: GreptimeDB, category: timeseries, status: supported, detail: "MySQL 协议查询、TIME INDEX / Tag 元数据、追加导入" }
  - { name: KWDB, category: timeseries, status: supported, detail: "PostgreSQL 协议下的关系库与时序库、数据编辑、同步与迁移" }
  # 搜索
  - { name: Elasticsearch, category: search, status: supported, detail: "索引浏览、Mapping 检查、受控 REST 控制台、JSON DSL / query_string 查询" }
  - { name: OpenSearch, category: search, status: supported, detail: "OpenSearch 1.x / 2.x / 3.x 索引、受控 REST 控制台、SQL / PPL" }
  - { name: Meilisearch, category: search, status: supported, detail: "索引即表、过滤 / 排序下推、文档编辑、REST 控制台" }
  - { name: Typesense, category: search, status: supported, detail: "集合即表、filter_by 下推、文档编辑、REST 控制台" }
  - { name: Sphinx, category: search, status: supported, detail: "SphinxQL 查询与对象浏览" }
  # 向量
  - { name: Milvus, category: vector, status: primary, detail: "Collection 浏览、向量搜索、标量过滤" }
  - { name: Qdrant, category: vector, status: primary, detail: "Collection 浏览、向量搜索、Payload 过滤" }
  - { name: Chroma, category: vector, status: primary, detail: "Collection 浏览、向量检索、元数据过滤" }
  - { name: Weaviate, category: vector, status: supported, detail: "Class 与租户、基于 GraphQL 的网格浏览与编辑、向量列" }
  # 消息队列
  - { name: Kafka, category: messaging, status: primary, doc: kafka-browser, detail: "Topic 浏览、Broker 元数据、消费组查看" }
  - { name: RocketMQ, category: messaging, status: primary, detail: "Topic 浏览、消费组检查" }
  - { name: RabbitMQ, category: messaging, status: primary, detail: "Queue / Exchange 浏览、Virtual Host 检查、基于 Management API" }
  - { name: MQTT, category: messaging, status: primary, detail: "Broker 与 Topic Filter 配置、QoS 连接设置" }
  # NoSQL · 协调
  - { name: Redis, category: nosql, status: primary, doc: redis-client, detail: "Key 浏览、命令执行、编码/视图切换" }
  - { name: MongoDB, category: nosql, status: supported, detail: "文档查询、集合浏览、连接管理" }
  - { name: etcd, category: nosql, status: supported, detail: "前缀树浏览、键与租约编辑、etcdctl 风格控制台（v2 / v3 API）" }
  - { name: ZooKeeper, category: nosql, status: supported, detail: "Znode 树浏览、数据与 ACL 查看、节点编辑、zkCli 风格控制台" }
  - { name: Nacos, category: nosql, status: supported, detail: "配置中心与服务发现" }

cta:
  title: 下载 GoNavi
  description: 免费开源，使用 Apache-2.0 协议。Windows、macOS、Linux 都有安装包。
  platforms:
    - { id: windows, name: Windows, note: AMD64 }
    - { id: macos, name: macOS, note: Apple Silicon · Intel }
    - { id: linux, name: Linux, note: WebKitGTK 4.0 / 4.1 }
---
