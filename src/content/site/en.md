---
title: Open-source, cross-platform database client
description: Open-source desktop database client for MySQL, PostgreSQL, Oracle, Redis, Kafka, MongoDB, ClickHouse, and 50+ other data sources, with an AI assistant and MCP server.

hero:
  headline:
    - One client for
    - 50+ data sources
  # The word joiner and no-break space keep "20–26 MB" on one line.
  lede: "GoNavi is an open-source database client for Windows, macOS, and Linux. It isn't built on Electron, so the installer is only about 20–⁠26 MB."
  download: Download GoNavi
  facts:
    - label: Apache-2.0 open source
    - label: 50+ data sources
      href: "#sources"
    - label: MCP support
      href: "#agents"

tour:
  label: Product tour
  note: The data in these screenshots comes from a local test database. Connection addresses, keys, and AI provider settings are not shown.
  shots:
    - id: editor
      label: SQL editor
      caption: Write SQL, see the results, browse tables on the left
      image: /screenshots/02-query-editor.png
    - id: workbench
      label: Workbench
      caption: Recent connections and saved queries
      image: /screenshots/01-home-workbench.png
    - id: assistant
      label: AI assistant
      caption: The AI sees your table schemas; insert, run, or preview the SQL it writes
      image: /screenshots/04-ai-assistant.png
    - id: connect
      label: New connection
      caption: Find a data source by category, or search for it
      image: /screenshots/06-new-connection.png
    - id: history
      label: History
      caption: Filter past statements by status and time, then send one back to the editor
      image: /screenshots/08-sql-execution-history.png
    - id: audit
      label: SQL audit
      caption: Audit records for every connection, redacted by default
      image: /screenshots/09-sql-audit.png
    - id: tools
      label: AI tools
      caption: The built-in tools and inspection flows the AI can call
      image: /screenshots/05-ai-settings.png
    - id: themes
      label: Themes
      caption: 8 built-in themes, or upload your own CSS
      image: /screenshots/07-settings-themes.png

scorecard:
  kicker: Size and memory
  title: "Installer size\nand memory use"
  description: Many database clients are built on Electron and ship installers of several hundred MB. GoNavi is built with Go and the system's own WebView. Here are measured numbers for v0.9.8, and how they were measured.
  sample: Measured on v0.9.8
  metrics:
    - label: Installer
      question: Download size
      value: 20–26 MB
      note: Every Windows, macOS, and Linux installer falls in this range.
    - label: UI technology
      question: What draws the window
      value: Go + system WebView
      note: Built with Wails. No bundled Chromium.
    - label: Memory
      question: After launch
      value: ≈ 429 MB
      note: Main process on Linux with an empty workbench and no connections; about 765 MB including WebKit helper processes.
  compare:
    caption: Compared with a typical Electron client
    other: Typical Electron client
    rows:
      - { label: Runtime, other: Chromium + Node.js, gonavi: Go + system WebView }
      - { label: Installer, other: Usually hundreds of MB, gonavi: 20–26 MB }
      - { label: Startup, other: Slower, gonavi: Faster }
      - { label: Memory figures, other: Often mixed up with installer size, gonavi: "Measured separately, method published" }
      - { label: AI, other: "None, or via plugins", gonavi: "Built-in AI assistant, MCP support" }
      - { label: Data sources, other: Mostly relational, gonavi: "Also caches, message queues, vector, search, time-series, and Chinese databases" }
  method: Installer size and memory use are different things. The memory figures come from one run on a Linux cloud machine with the v0.9.8 WebKit41 build, an empty workbench, no database connections, and a remote display, read after 30–40 seconds. Expect different numbers on Windows and macOS.
  methodLink:
    label: How it was measured
    href: /blog/lightweight-native-database-client-2026

capabilities:
  kicker: Features
  title: Main features
  description: Write SQL, edit data, export results, and look up what ran, all in one window.
  items:
    - id: ai
      title: AI assistant
      summary: The assistant can see the current database's table schemas. It writes SQL, explains statements, and suggests optimizations. You can preview generated SQL before running it.
      points:
        - Works with OpenAI, Gemini, Claude, and any OpenAI-compatible API
        - Sends the current table schemas along automatically
        - "Quick commands: generate SQL, explain, optimize, review a table design"
        - Database passwords stay on your machine and are never sent to the AI
      image: /screenshots/04-ai-assistant.png
      alt: The GoNavi AI assistant panel writing SQL from table schemas, with insert, run, and preview buttons
      zoom: 2.32
      x: 56.9
      y: 6.7
    - id: data
      title: Result grid
      summary: The grid uses virtual scrolling, so large result sets stay smooth. Edit cells in place and commit them together.
      points:
        - Edit cells directly, including batch inserts, updates, and deletes
        - Commit or roll back your changes as a transaction
        - View and edit large fields in a popup
        - Export to CSV, XLSX, JSON, or Markdown
        - A Monaco-based SQL editor that completes database, table, and column names
      image: /screenshots/02-query-editor.png
      alt: The GoNavi SQL editor and result grid
      zoom: 1.371
      x: 23.3
      y: 6.1
    - id: connect
      title: Connections and drivers
      summary: URIs, SSH tunnels, and proxies are supported. Export your connections as JSON to move them to another computer or share them with teammates.
      points:
        - Paste a URI to fill in a connection, or generate one from it
        - SSH tunnels and proxies
        - Import and export connections as JSON
        - Drivers for less common databases install only when you need them
        - Connect anything else with a custom driver and DSN
      image: /screenshots/06-new-connection.png
      alt: The GoNavi new connection window, with data sources grouped by category and a search box
      zoom: 1.895
      x: 23.6
      y: 7.8
    - id: audit
      title: History and audit
      summary: Every statement you run is logged with how long it took. Audit records are redacted by default, can be kept for a set time, and can be exported.
      points:
        - SQL execution log with timing
        - "Audit center: redacted by default, retention settings, export"
        - An experimental Web Server version that runs in the browser
        - Deploy with Docker, Kubernetes, Helm, or Podman
        - Automatic update checks; x64 and ARM64 builds
      image: /screenshots/09-sql-audit.png
      alt: The GoNavi SQL audit center listing redacted audit records for each connection
      zoom: 1.371
      x: 23.6
      y: 6.1

agents:
  kicker: MCP
  title: "Agents can read\nyour schemas"
  description: GoNavi includes an MCP server. Once connected, a coding agent such as Claude Code or Codex can look up table schemas and, if you allow it, run SQL. Database passwords stay on the computer running GoNavi, so the agent never sees them.
  points:
    - If one of these CLIs is installed, GoNavi detects it and connects in one click. Remote agents connect over Streamable HTTP.
    - Remote access is schema-only by default, without execute_sql. Turn it on and it follows the same safety settings as the built-in assistant.
    - You can also run the MCP server on its own with Docker, Kubernetes, Helm, or Podman.
  clientsLabel: One-click setup for
  clients: [Claude Code, Codex, OpenCode, ZCode, DeepSeek Harness, Kimi Code, Grok Build]
  flow:
    label: "Example: the tools an agent calls to find tables and columns"
    steps: [get_connections, get_server_version, get_databases, get_tables, get_columns]
  snippets:
    - id: mcp
      label: MCP container
      code: |-
        cp docker.mcp-server.env.example docker.mcp-server.env
        docker compose --env-file docker.mcp-server.env \
          -f docker-compose.mcp-server.yml up -d
    - id: cli
      label: CLI
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
    label: MCP server docs
    href: https://github.com/Syngnat/GoNavi/blob/dev/cmd/gonavi-mcp-server/README.md

sources:
  kicker: Data sources
  title: Works with 50+ data sources
  description: Common ones like MySQL, PostgreSQL, Oracle, Redis, and Kafka are built in and work right after install. Drivers for the rest install from the Driver Manager when you need them.
  categories:
    - { id: relational, label: Relational }
    - { id: domestic, label: Chinese databases }
    - { id: analytics, label: Analytics · Federated }
    - { id: timeseries, label: Time-series }
    - { id: search, label: Search }
    - { id: vector, label: Vector }
    - { id: messaging, label: Message queues }
    - { id: nosql, label: NoSQL · Coordination }

databases:
  # Relational
  - { name: MySQL, category: relational, status: primary, doc: mysql-client, detail: "Schema browsing, SQL query, data editing, export/backup" }
  - { name: PostgreSQL, category: relational, status: primary, doc: postgresql-client, detail: "Schema browsing, SQL query, data editing, object management" }
  - { name: Oracle, category: relational, status: primary, detail: "Query execution, object browsing, data editing" }
  - { name: MariaDB, category: relational, status: supported, detail: "Querying, object management, data editing" }
  - { name: SQL Server, category: relational, status: supported, detail: "Schema browsing, SQL query, object management" }
  - { name: TiDB, category: relational, status: supported, detail: "MySQL-compatible querying, TiDB execution plans, data editing, sync / migration" }
  - { name: CockroachDB, category: relational, status: supported, detail: "PostgreSQL-wire querying, SHOW CREATE DDL, data editing, sync / migration" }
  - { name: Firebird, category: relational, status: supported, detail: "Firebird 2.5 / 3.0 / 4–5, procedures / triggers / packages, data editing, SQL backup / restore" }
  - { name: SQLite, category: relational, status: supported, detail: "Local DB browsing, editing, export" }
  - { name: DuckDB, category: relational, status: supported, detail: "Large-table queries, pagination, file databases" }
  - { name: InterSystems IRIS, category: relational, status: supported, detail: "Namespace browsing, SQL query, object management" }
  - { name: InterSystems Caché, category: relational, status: supported, detail: "Namespace browsing, Caché SQL query, object management" }
  # Domestic databases
  - { name: GoldenDB, category: domestic, status: primary, detail: "MySQL-compatible queries, distributed transactions" }
  - { name: OceanBase, category: domestic, status: supported, detail: "MySQL / Oracle tenant access, object browsing, SQL queries" }
  - { name: Dameng, category: domestic, status: supported, detail: "Querying, object browsing, data editing" }
  - { name: Kingbase, category: domestic, status: supported, detail: "Querying, object browsing, data editing" }
  - { name: HighGo, category: domestic, status: supported, detail: "Querying, object browsing, data editing" }
  - { name: Vastbase, category: domestic, status: supported, detail: "Querying, object browsing, data editing" }
  - { name: openGauss, category: domestic, status: supported, detail: "PostgreSQL-like schema browsing, SQL query, object management" }
  - { name: GaussDB, category: domestic, status: supported, detail: "PostgreSQL-like schema browsing, SQL query, object management" }
  - { name: GBase 8a, category: domestic, status: supported, detail: "MySQL-protocol MPP querying, HASH indexes, single-kind grid commits, sync / migration" }
  - { name: GBase 8c, category: domestic, status: supported, detail: "openGauss kernel (A / B / PG modes), sha256 authentication, object management, sync / migration" }
  - { name: GBase 8s, category: domestic, status: supported, detail: "Informix SQLI via your GBase 8s CSDK, object browsing, data editing, SQL backup / restore" }
  - { name: YashanDB, category: domestic, status: supported, detail: "Oracle-compatible querying via your YashanDB client, PL/SQL objects, execution plans, sync / migration" }
  # Analytics · federated query
  - { name: ClickHouse, category: analytics, status: supported, doc: clickhouse-client, detail: "Analytical query, object browsing, SQL execution" }
  - { name: Doris, category: analytics, status: supported, detail: "Querying, object browsing, SQL execution" }
  - { name: StarRocks, category: analytics, status: supported, detail: "Querying, object browsing, SQL execution" }
  - { name: Trino, category: analytics, status: supported, detail: "Cross-source SQL via multiple catalogs, catalog.schema browsing, SQL execution" }
  - { name: Presto, category: analytics, status: supported, detail: "PrestoDB / PrestoSQL catalogs, SQL execution, cancellation, migration source" }
  # Time-series
  - { name: TDengine, category: timeseries, status: supported, detail: "Time-series schema browsing and querying" }
  - { name: Apache IoTDB, category: timeseries, status: supported, detail: "Storage group / device / timeseries browsing and querying" }
  - { name: InfluxDB, category: timeseries, status: supported, detail: "InfluxDB 1.x (InfluxQL) / 2.x (Flux) / 3.x (SQL), line-protocol writes, grid editing" }
  - { name: TimescaleDB, category: timeseries, status: supported, detail: "Hypertables and continuous aggregates, chunk statistics, PostgreSQL compatibility, sync / migration" }
  - { name: QuestDB, category: timeseries, status: supported, detail: "Partitioned time-series tables, SQL querying, execution plans, append-only import" }
  - { name: GreptimeDB, category: timeseries, status: supported, detail: "MySQL-protocol querying, TIME INDEX / tag metadata, append-only import" }
  - { name: KWDB, category: timeseries, status: supported, detail: "Relational and time-series databases over the PostgreSQL wire, data editing, sync / migration" }
  # Search
  - { name: Elasticsearch, category: search, status: supported, detail: "Index browsing, mapping inspection, guarded REST console, JSON DSL / query_string search" }
  - { name: OpenSearch, category: search, status: supported, detail: "OpenSearch 1.x / 2.x / 3.x indices, guarded REST console, SQL / PPL" }
  - { name: Meilisearch, category: search, status: supported, detail: "Indexes as tables, filter / sort push-down, document editing, REST console" }
  - { name: Typesense, category: search, status: supported, detail: "Collections as tables, filter_by push-down, document editing, REST console" }
  - { name: Sphinx, category: search, status: supported, detail: "SphinxQL querying and object browsing" }
  # Vector
  - { name: Milvus, category: vector, status: primary, detail: "Collection browsing, vector search, scalar filtering" }
  - { name: Qdrant, category: vector, status: primary, detail: "Collection browsing, vector search, payload filtering" }
  - { name: Chroma, category: vector, status: primary, detail: "Collection browsing, vector retrieval, metadata filtering" }
  - { name: Weaviate, category: vector, status: supported, detail: "Classes and tenants, GraphQL-backed grid browsing and editing, vector columns" }
  # Message queues
  - { name: Kafka, category: messaging, status: primary, doc: kafka-browser, detail: "Topic browsing, broker metadata, consumer groups" }
  - { name: RocketMQ, category: messaging, status: primary, detail: "Topic browsing, consumer-group inspection" }
  - { name: RabbitMQ, category: messaging, status: primary, detail: "Queue/exchange browsing, virtual host inspection, via the Management API" }
  - { name: MQTT, category: messaging, status: primary, detail: "Broker and topic-filter setup, QoS-aware connection settings" }
  # NoSQL · coordination
  - { name: Redis, category: nosql, status: primary, doc: redis-client, detail: "Key browsing, command execution, encoding/view switch" }
  - { name: MongoDB, category: nosql, status: supported, detail: "Document query, collection browsing, connection management" }
  - { name: etcd, category: nosql, status: supported, detail: "Prefix tree browsing, key / lease editing, etcdctl-style console (v2 / v3 APIs)" }
  - { name: ZooKeeper, category: nosql, status: supported, detail: "Znode tree browsing, data and ACL inspection, node editing, zkCli-style console" }
  - { name: Nacos, category: nosql, status: supported, detail: "Configuration center and service discovery" }

cta:
  title: Download GoNavi
  description: Free and open source under Apache-2.0, with installers for Windows, macOS, and Linux.
  platforms:
    - { id: windows, name: Windows, note: AMD64 }
    - { id: macos, name: macOS, note: Apple Silicon · Intel }
    - { id: linux, name: Linux, note: WebKitGTK 4.0 / 4.1 }
---
