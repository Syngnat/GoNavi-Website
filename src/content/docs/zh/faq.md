---
title: 常见问题
summary: 安装、启动与连接相关的常见故障排查
order: 99
locale: zh
slug: faq
---

## Windows：双击后白屏或闪退？

GoNavi 桌面版在 Windows 上依赖 **Microsoft Edge WebView2 运行时**（系统级组件，不是完整 Chrome）。部分内网 / 精简镜像 / Windows Server / LTSC 机器未预装，会出现窗口一闪即关、白屏，或提示找不到 WebView2。

在 PowerShell 中确认是否已安装：

```powershell
Test-Path "${env:ProgramFiles(x86)}\Microsoft\EdgeWebView\Application"
```

若不存在，前往 [微软官方下载页](https://developer.microsoft.com/microsoft-edge/webview2/) 下载 **Evergreen Bootstrapper** 安装；完全断网环境改用 **Standalone Installer**（如 `MicrosoftEdgeWebView2RuntimeInstallerX64.exe`）。

> 桌面 WebView 短期无法装上时，可临时用浏览器访问实验性 Web Server 模式：`GoNavi.exe web-server --addr 127.0.0.1:34116`（不要把未加固的入口暴露到公网）。详见 [Issue #672](https://github.com/Syngnat/GoNavi/issues/672)。

## macOS：提示「应用已损坏，无法打开」？

未做 Apple Notarization 时，Gatekeeper 可能拦截。将应用移到「应用程序」后执行：

```bash
sudo xattr -rd com.apple.quarantine /Applications/GoNavi.app
```

也可在 Finder 中右键打开。

## Linux：启动报缺少 WebKitGTK？

按发行版安装依赖：

```bash
# Debian 13 / Ubuntu 24.04+
sudo apt-get install -y libgtk-3-0 libwebkit2gtk-4.1-0 libjavascriptcoregtk-4.1-0

# Ubuntu 22.04 / Debian 12
sudo apt-get install -y libgtk-3-0 libwebkit2gtk-4.0-37 libjavascriptcoregtk-4.0-18
```

带 `-WebKit41` 后缀的产物更适配 Debian 13 / Ubuntu 24.04+。

## Linux：中文显示为方框？

安装中文字体并刷新缓存：

```bash
sudo apt-get install -y fonts-noto-cjk fonts-wqy-microhei
fc-cache -fv
```

## 下载页没有最新版本怎么办？

官网下载页优先读取 GitHub Releases；如果接口不可用，会自动切换到本地兜底快照展示。完整发布历史始终在 [GitHub Releases](https://github.com/Syngnat/GoNavi/releases) 可查。

## 为什么有些数据源需要额外驱动？

GoNavi 的数据源分内置与可选驱动代理两类。可选驱动代理（如 SQL Server、SQLite、MongoDB、ClickHouse 等）需要在驱动管理器中安装启用后才能使用。详见[数据源支持](/zh/docs/data-sources)。
