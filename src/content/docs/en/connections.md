---
title: Connection Setup
summary: Host/URI/SSH/proxy, JSON import/export, and custom Driver extensibility
order: 3
locale: en
slug: connections
---

GoNavi keeps common connection capabilities in one consistent flow so teams can move across databases without re-learning the basics.

## Connection Input Modes

- Host / port / database
- URI (generate / parse)
- Username / password
- SSH tunnel
- Proxy settings

## Import / Export

Connection configs support **JSON import / export**, making it easy to share connection lists across a team or migrate configs between machines.

## Driver Extensibility

- **Optional driver agents**: some data sources are installed on demand via the Driver Manager — see [Supported Data Sources](/en/docs/data-sources)
- **Custom Driver + DSN**: extend to more sources not built into GoNavi via a custom Driver and DSN

## Suggested Practices

1. Keep high-frequency databases under a shared naming convention and use JSON export for team sharing.
2. Prefer SSH tunneling over ad hoc manual forwarding when a jump host is required.
3. Separate staging and production clearly to reduce operator mistakes.
