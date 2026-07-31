---
title: 安装与更新
summary: 通过 GitHub Releases 获取 Windows、macOS、Linux 构建并保持更新
order: 1
locale: zh
slug: install
---

## 下载安装包

稳定版发布在 [GitHub Releases](https://github.com/Syngnat/GoNavi/releases)，按平台选择对应构建：

- **Windows**：AMD64 构建（`.exe` 安装包），依赖系统自带的 Microsoft Edge WebView2 运行时
- **macOS**：AMD64 与 ARM64 双架构（`.dmg`），按芯片选择对应版本
- **Linux**：基于 WebKitGTK 的构建，提供 WebKitGTK 4.0 与 4.1 两种产物，适配不同发行版

> GoNavi 桌面版基于 Wails + 系统 WebView，二进制约 30MB 量级，无需额外运行时打包。

## 更新

- 桌面端内置更新检查，会提示新版本
- 新版本统一通过 GitHub Releases 发布，推送 `v*` Tag 后由 GitHub Actions 自动多架构构建

## 安装后注意事项

- **Windows 内网机器**：若系统未预装 WebView2 运行时，可能出现白屏或闪退，参考[常见问题](/zh/docs/faq)中的 WebView2 安装步骤
- **macOS**：未做 Apple Notarization，首次打开可能被 Gatekeeper 拦截，参考[常见问题](/zh/docs/faq)处理
- **Linux**：需安装 WebKitGTK 依赖，参考[常见问题](/zh/docs/faq)

## 建议

1. 团队内先统一版本口径，再开始共享截图、导出或排障步骤。
2. 遇到升级异常时，优先核对驱动与连接配置是否仍然兼容。
