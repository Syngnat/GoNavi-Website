---
title: Supported Data Sources
summary: Built-in out of the box, optional driver agents on demand — one workbench for SQL, cache, vector, MQ, search, time-series, and domestic DBs
order: 4
locale: en
slug: data-sources
---

GoNavi brings relational, cache, vector, message-queue, search, time-series, and domestic databases into a single workbench. Data sources fall into two groups: **built-in** (ready out of the box) and **optional driver agents** (install on demand from the Driver Manager).

## Built-in

Ready out of the box, no extra driver required:

- **Relational**: MySQL · PostgreSQL · Oracle
- **Domestic DB**: GoldenDB
- **Cache**: Redis
- **Vector DB**: Chroma · Qdrant · Milvus
- **Message Queue**: RocketMQ · MQTT · Kafka · RabbitMQ

## Optional Driver Agents

Install and enable via the Driver Manager:

- **Relational**: MariaDB · Doris · StarRocks · SQL Server · Sphinx
- **File-based**: SQLite · DuckDB
- **Domestic DB**: OceanBase · Dameng · Kingbase · HighGo · Vastbase · OpenGauss · GaussDB
- **Multi-model / Document**: InterSystems IRIS · MongoDB
- **Time-series**: TDengine · Apache IoTDB
- **Columnar Analytics**: ClickHouse
- **Federated Query**: Trino
- **Search**: Elasticsearch
- **Extensibility**: add more sources via Custom Driver + DSN

## Typical Capabilities

- Relational: schema browsing, SQL query, data editing, export/backup
- Redis: key browsing, command execution, encoding/view switching
- Vector DB: collection browsing, vector search, scalar/metadata filtering
- Message Queue: topic / queue / exchange browsing, consumer-group inspection
- Domestic DB: PostgreSQL / MySQL-compatible schema browsing and query workflow
