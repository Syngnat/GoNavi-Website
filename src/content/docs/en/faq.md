---
title: FAQ
summary: Common install, launch, and connection troubleshooting
order: 99
locale: en
slug: faq
---

## Windows: blank window or immediate exit on launch?

The GoNavi desktop app on Windows depends on the **Microsoft Edge WebView2 Runtime** (a system component, not full Chrome). Some intranet / thin / Server / LTSC images ship without it, causing a blank window, immediate exit, or a missing-WebView2 error.

Check whether it is installed in PowerShell:

```powershell
Test-Path "${env:ProgramFiles(x86)}\Microsoft\EdgeWebView\Application"
```

If missing, download the **Evergreen Bootstrapper** from the [official download page](https://developer.microsoft.com/microsoft-edge/webview2/). For fully air-gapped machines, use the **Standalone Installer** (e.g. `MicrosoftEdgeWebView2RuntimeInstallerX64.exe`).

> If the desktop WebView cannot be installed yet, you can temporarily use the experimental Web Server mode in a browser: `GoNavi.exe web-server --addr 127.0.0.1:34116` (do not expose an unhardened endpoint to the public internet). See [Issue #672](https://github.com/Syngnat/GoNavi/issues/672).

## macOS: "App is damaged and can't be opened"?

Without Apple Notarization, Gatekeeper may block the app. Move it to Applications and run:

```bash
sudo xattr -rd com.apple.quarantine /Applications/GoNavi.app
```

You can also right-click → Open in Finder.

## Linux: missing WebKitGTK on launch?

Install the dependencies for your distro:

```bash
# Debian 13 / Ubuntu 24.04+
sudo apt-get install -y libgtk-3-0 libwebkit2gtk-4.1-0 libjavascriptcoregtk-4.1-0

# Ubuntu 22.04 / Debian 12
sudo apt-get install -y libgtk-3-0 libwebkit2gtk-4.0-37 libjavascriptcoregtk-4.0-18
```

Builds with the `-WebKit41` suffix suit Debian 13 / Ubuntu 24.04+ better.

## Linux: CJK characters render as boxes?

Install CJK fonts and refresh the cache:

```bash
sudo apt-get install -y fonts-noto-cjk fonts-wqy-microhei
fc-cache -fv
```

## What if the download page can't fetch the latest release?

The download page prefers GitHub Releases and automatically falls back to a local snapshot when the API is unavailable. The full release history is always available on [GitHub Releases](https://github.com/Syngnat/GoNavi/releases).

## Why do some data sources need an extra driver?

GoNavi data sources come in two groups: built-in and optional driver agents. Optional driver agents (e.g. SQL Server, SQLite, MongoDB, ClickHouse) must be installed and enabled in the Driver Manager first. See [Supported Data Sources](/en/docs/data-sources).
