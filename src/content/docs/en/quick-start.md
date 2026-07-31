---
title: Quick Start
summary: The shortest path from download to your first query
order: 2
locale: en
slug: quick-start
---

## Users: from download to your first query

1. Download the build for your platform from [GitHub Releases](https://github.com/Syngnat/GoNavi/releases) and launch GoNavi.
2. Confirm the current version from the homepage or download page, then create a connection in the client.
3. Choose the database type and fill in host, port, authentication, and optional SSH / proxy settings.
4. Save the connection, open the query workspace, and run your first SQL statement or browse the object tree.

## Recommended Path

- Solo developers: start with a local or staging database first.
- Teams: align naming, export, and review conventions early.

## Developers: build from source

<details>
<summary>Local dev environment</summary>

Prerequisites: [Go](https://go.dev/dl/) 1.21+, [Node.js](https://nodejs.org/) 18+, [Wails CLI](https://wails.io/docs/gettingstarted/installation).

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@v2.11.0

git clone https://github.com/Syngnat/GoNavi.git
cd GoNavi

wails dev                          # full hot reload
node tools/wails-fast-dev.mjs      # faster when Go exports are unchanged
```

Build artifacts:

```bash
wails build              # artifacts in build/bin
wails build -clean       # recommended before release
```

</details>

## Next Steps

- Review [Install & Updates](/en/docs/install) for platform-specific install and dependencies.
- Review [Connection Setup](/en/docs/connections) for URI, SSH, proxy, and JSON import/export.
