---
title: Install & Updates
summary: Get Windows, macOS, and Linux builds from GitHub Releases and stay up to date
order: 1
locale: en
slug: install
---

## Download

Stable releases are published on [GitHub Releases](https://github.com/Syngnat/GoNavi/releases). Pick the build for your platform:

- **Windows**: AMD64 build (`.exe` installer), depends on the system-provided Microsoft Edge WebView2 Runtime
- **macOS**: both AMD64 and ARM64 (`.dmg`), choose the one matching your chip
- **Linux**: WebKitGTK-based builds, offered in both WebKitGTK 4.0 and 4.1 variants for different distros

> The GoNavi desktop app is built on Wails + the native system WebView, with binaries around the ~30MB class — no bundled runtime.

## Updates

- The desktop app has a built-in update checker that notifies you of new releases
- New versions ship through GitHub Releases; pushing a `v*` tag triggers GitHub Actions to build multi-arch releases automatically

## Post-install Notes

- **Windows on intranet images**: if WebView2 Runtime is missing, you may see a blank window or immediate exit — see the [FAQ](/en/docs/faq) for WebView2 setup
- **macOS**: without Apple Notarization, Gatekeeper may block the first launch — see the [FAQ](/en/docs/faq)
- **Linux**: WebKitGTK dependencies are required — see the [FAQ](/en/docs/faq)

## Recommendations

1. Align the team on the same version before sharing workflows.
2. When an upgrade feels wrong, verify drivers and connection settings first.
