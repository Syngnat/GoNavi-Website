---
title: Supported Data Sources
summary: The 50+ supported data sources, which ones are built in, which need a driver, and what each can do
order: 4
locale: en
slug: data-sources
---

GoNavi supports relational, cache, vector, message-queue, search, time-series, and Chinese domestic databases, more than 50 in all. They come in two kinds: **built-in** sources work right after install, and **optional driver agents** install from the Driver Manager when you need them.

## Built-in

Ready out of the box, no extra driver required:

- **Relational**: MySQL · PostgreSQL · Oracle
- **Domestic DB**: GoldenDB
- **Cache**: Redis
- **Vector Database**: Chroma · Qdrant · Milvus
- **Message Queue**: RocketMQ · MQTT · Kafka · RabbitMQ

## Optional Driver Agents

Install and enable via the Driver Manager:

- **Relational**: MariaDB · Doris · SQL Server · TiDB · CockroachDB · Firebird
- **Columnar Analytics**: StarRocks · ClickHouse
- **Search**: Sphinx · Elasticsearch · OpenSearch · Meilisearch · Typesense
- **File-based**: SQLite · DuckDB
- **Domestic DB**: OceanBase · Dameng · Kingbase · HighGo · Vastbase · openGauss · GaussDB · GBase 8a · GBase 8c · GBase 8s · YashanDB
- **Multi-model**: InterSystems IRIS · InterSystems Caché
- **Document**: MongoDB
- **Time-series**: TDengine · Apache IoTDB · KWDB · TimescaleDB · QuestDB · GreptimeDB · InfluxDB
- **Federated Query**: Trino · Presto
- **Vector Database**: Weaviate
- **Key-Value**: etcd
- **Coordination**: ZooKeeper
- **Extensibility**: add more sources via Custom Driver + DSN

## Full capability matrix

| Category | Data Source | Driver Mode | Typical Capabilities |
|---|---|---|---|
| Relational | MySQL | Built-in | Schema browsing, SQL query, data editing, export/backup |
| Domestic DB | GoldenDB | Built-in | MySQL-compatible query workflow and distributed transaction scenarios |
| Relational | PostgreSQL | Built-in | Schema browsing, SQL query, data editing, object management |
| Relational | Oracle | Built-in | Query execution, object browsing, data editing |
| Cache | Redis | Built-in | Key browsing, command execution, encoding/view switch |
| Vector Database | Chroma | Built-in | Collection browsing, vector retrieval, metadata filtering |
| Vector Database | Qdrant | Built-in | Collection browsing, vector search, payload filtering |
| Vector Database | Milvus | Built-in | Collection browsing, vector search, scalar filtering |
| Message Queue | RocketMQ | Built-in | Topic browsing, consumer-group inspection, message-oriented workflow |
| Message Queue | MQTT | Built-in | Broker and topic-filter workflow with QoS-aware connection settings |
| Message Queue | Kafka | Built-in | Topic browsing, broker metadata, consumer-group workflow |
| Message Queue | RabbitMQ | Built-in | Queue/exchange browsing, virtual host inspection, management API workflow |
| Relational | MariaDB | Optional driver agent | Querying, object management, data editing |
| Relational | Doris | Optional driver agent | Querying, object browsing, SQL execution |
| Columnar Analytics | StarRocks | Optional driver agent | Querying, object browsing, SQL execution |
| Search | Sphinx | Optional driver agent | SphinxQL querying and object browsing |
| Relational | SQL Server | Optional driver agent | Schema browsing, SQL query, object management |
| File-based | SQLite | Optional driver agent | Local DB browsing, editing, export |
| File-based | DuckDB | Optional driver agent | Large-table query, pagination, file-DB workflow |
| Domestic DB | OceanBase | Optional driver agent | MySQL / Oracle tenant access, object browsing, query workflow |
| Domestic DB | Dameng | Optional driver agent | Querying, object browsing, data editing |
| Domestic DB | Kingbase | Optional driver agent | Querying, object browsing, data editing |
| Domestic DB | HighGo | Optional driver agent | Querying, object browsing, data editing |
| Domestic DB | Vastbase | Optional driver agent | Querying, object browsing, data editing |
| Domestic DB | openGauss | Optional driver agent | PostgreSQL-like schema browsing, SQL query, object management |
| Domestic DB | GaussDB | Optional driver agent | PostgreSQL-like schema browsing, SQL query, object management |
| Multi-model | InterSystems IRIS | Optional driver agent | Namespace browsing, SQL query, object management |
| Multi-model | InterSystems Caché | Optional driver agent | Namespace browsing, Caché SQL query, object management |
| Document | MongoDB | Optional driver agent | Document query, collection browsing, connection management |
| Time-series | TDengine | Optional driver agent | Time-series schema browsing and querying |
| Time-series | Apache IoTDB | Optional driver agent | Storage group / device / timeseries browsing and querying |
| Columnar Analytics | ClickHouse | Optional driver agent | Analytical query, object browsing, SQL execution |
| Federated Query | Trino | Optional driver agent | Cross-source SQL via multiple catalogs, `catalog.schema` browsing, SQL execution |
| Search | Elasticsearch | Optional driver agent | Index browsing, mapping inspection, guarded REST console, JSON DSL / query_string search |
| Relational | TiDB | Optional driver agent | MySQL-compatible querying, TiDB execution plans, data editing, sync / migration |
| Relational | CockroachDB | Optional driver agent | PostgreSQL-wire querying, SHOW CREATE DDL, data editing, sync / migration |
| Time-series | KWDB | Optional driver agent | Relational and time-series databases over the PostgreSQL wire, data editing, sync / migration |
| Time-series | TimescaleDB | Optional driver agent | Hypertables and continuous aggregates, chunk statistics, PostgreSQL workflow, sync / migration |
| Domestic DB | GBase 8a | Optional driver agent | MySQL-protocol MPP querying, HASH indexes, single-kind grid commits, sync / migration |
| Domestic DB | GBase 8c | Optional driver agent | openGauss kernel (A / B / PG modes), sha256 authentication, object management, sync / migration |
| Domestic DB | GBase 8s | Optional driver agent | Informix SQLI via your GBase 8s CSDK, object browsing, data editing, SQL backup / restore |
| Domestic DB | YashanDB | Optional driver agent | Oracle-compatible querying via your YashanDB client, PL/SQL objects, execution plans, sync / migration |
| Relational | Firebird | Optional driver agent | Firebird 2.5 / 3.0 / 4-5, procedures / triggers / packages, data editing, SQL backup / restore |
| Time-series | QuestDB | Optional driver agent | Partitioned time-series tables, SQL querying, execution plans, append-only import |
| Time-series | GreptimeDB | Optional driver agent | MySQL-protocol querying, TIME INDEX / tag metadata, append-only import |
| Time-series | InfluxDB | Optional driver agent | InfluxDB 1.x (InfluxQL) / 2.x (Flux) / 3.x (SQL), line-protocol writes, grid editing |
| Federated Query | Presto | Optional driver agent | PrestoDB / PrestoSQL catalogs, SQL execution, cancellation, migration source |
| Search | OpenSearch | Optional driver agent | OpenSearch 1.x / 2.x / 3.x indices, guarded REST console, SQL / PPL |
| Vector Database | Weaviate | Optional driver agent | Classes and tenants, GraphQL-backed grid browsing and editing, vector columns |
| Search | Meilisearch | Optional driver agent | Indexes as tables, filter / sort push-down, document editing, REST console |
| Search | Typesense | Optional driver agent | Collections as tables, filter_by push-down, document editing, REST console |
| Key-Value | etcd | Optional driver agent | Prefix tree browsing, key / lease editing, etcdctl-style console (v2 / v3 APIs) |
| Coordination | ZooKeeper | Optional driver agent | Znode tree browsing, data and ACL inspection, node editing, zkCli-style console |
| Extensibility | Custom Driver/DSN | Custom | Extend to more data sources via Driver + DSN |

## Guides by data source

- [PostgreSQL client](/en/docs/postgresql-client/): connection, browsing, querying, and delivery workflows.
- [MySQL client](/en/docs/mysql-client/): a desktop workflow for daily development and investigation.
- [Redis client](/en/docs/redis-client/): key browsing, command execution, and value inspection.
- [Kafka browsing](/en/docs/kafka-browser/): topic browsing and consumer-group inspection.
- [ClickHouse client](/en/docs/clickhouse-client/): connect columnar analytics through the optional driver agent.
- [Multi-database workbench](/en/docs/database-workbench/): see how these connections fit into one desktop workspace.
