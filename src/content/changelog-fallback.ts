import { SiteLocale } from '../lib/locale';
import { GitHubReleaseLike, NormalizedRelease, normalizeRelease } from '../lib/releases';

const fallbackReleasePayload: Record<SiteLocale, GitHubReleaseLike[]> = {
  zh: [
    {
      id: 605,
      tag_name: 'v0.6.5',
      name: 'v0.6.5',
      html_url: 'https://github.com/Syngnat/GoNavi/releases/tag/v0.6.5',
      published_at: '2026-04-09T09:30:00Z',
      body: '桌面端发布流已经覆盖 Windows、macOS 和 Linux 三个平台。\n当 GitHub 不可用时，官网会展示这份本地兜底快照。',
      assets: [
        {
          name: 'GoNavi-0.6.5-Windows-Amd64.exe',
          browser_download_url:
            'https://github.com/Syngnat/GoNavi/releases/download/v0.6.5/GoNavi-0.6.5-Windows-Amd64.exe',
          size: 1024 * 1024 * 64,
          updated_at: '2026-04-09T09:31:00Z',
        },
        {
          name: 'GoNavi-0.6.5-MacOS-Arm64.dmg',
          browser_download_url:
            'https://github.com/Syngnat/GoNavi/releases/download/v0.6.5/GoNavi-0.6.5-MacOS-Arm64.dmg',
          size: 1024 * 1024 * 72,
          updated_at: '2026-04-09T09:32:00Z',
        },
        {
          name: 'GoNavi-0.6.5-Linux-Amd64.tar.gz',
          browser_download_url:
            'https://github.com/Syngnat/GoNavi/releases/download/v0.6.5/GoNavi-0.6.5-Linux-Amd64.tar.gz',
          size: 1024 * 1024 * 68,
          updated_at: '2026-04-09T09:33:00Z',
        },
      ],
    },
    {
      id: 604,
      tag_name: 'v0.6.4',
      name: 'v0.6.4',
      html_url: 'https://github.com/Syngnat/GoNavi/releases/tag/v0.6.4',
      published_at: '2026-03-22T07:10:00Z',
      body: '这个补丁版本收紧了站点壳层路由，并刷新了首页外壳。\n即使远端发布源变慢，下载页和更新日志页也能继续稳定展示。',
      assets: [
        {
          name: 'GoNavi-0.6.4-Windows-Amd64.exe',
          browser_download_url:
            'https://github.com/Syngnat/GoNavi/releases/download/v0.6.4/GoNavi-0.6.4-Windows-Amd64.exe',
          size: 1024 * 1024 * 62,
          updated_at: '2026-03-22T07:11:00Z',
        },
        {
          name: 'GoNavi-0.6.4-Linux-Amd64.tar.gz',
          browser_download_url:
            'https://github.com/Syngnat/GoNavi/releases/download/v0.6.4/GoNavi-0.6.4-Linux-Amd64.tar.gz',
          size: 1024 * 1024 * 66,
          updated_at: '2026-03-22T07:12:00Z',
        },
      ],
    },
  ],
  en: [
    {
      id: 605,
      tag_name: 'v0.6.5',
      name: 'v0.6.5',
      html_url: 'https://github.com/Syngnat/GoNavi/releases/tag/v0.6.5',
      published_at: '2026-04-09T09:30:00Z',
      body: 'Desktop builds now cover Windows, macOS, and Linux in the release feed.\nThe website falls back to this snapshot when GitHub is unavailable.',
      assets: [
        {
          name: 'GoNavi-0.6.5-Windows-Amd64.exe',
          browser_download_url:
            'https://github.com/Syngnat/GoNavi/releases/download/v0.6.5/GoNavi-0.6.5-Windows-Amd64.exe',
          size: 1024 * 1024 * 64,
          updated_at: '2026-04-09T09:31:00Z',
        },
        {
          name: 'GoNavi-0.6.5-MacOS-Arm64.dmg',
          browser_download_url:
            'https://github.com/Syngnat/GoNavi/releases/download/v0.6.5/GoNavi-0.6.5-MacOS-Arm64.dmg',
          size: 1024 * 1024 * 72,
          updated_at: '2026-04-09T09:32:00Z',
        },
        {
          name: 'GoNavi-0.6.5-Linux-Amd64.tar.gz',
          browser_download_url:
            'https://github.com/Syngnat/GoNavi/releases/download/v0.6.5/GoNavi-0.6.5-Linux-Amd64.tar.gz',
          size: 1024 * 1024 * 68,
          updated_at: '2026-04-09T09:33:00Z',
        },
      ],
    },
    {
      id: 604,
      tag_name: 'v0.6.4',
      name: 'v0.6.4',
      html_url: 'https://github.com/Syngnat/GoNavi/releases/tag/v0.6.4',
      published_at: '2026-03-22T07:10:00Z',
      body: 'This patch release tightened shell routing and refreshed the homepage shell.\nIt keeps the download and changelog pages stable when the remote feed is slow.',
      assets: [
        {
          name: 'GoNavi-0.6.4-Windows-Amd64.exe',
          browser_download_url:
            'https://github.com/Syngnat/GoNavi/releases/download/v0.6.4/GoNavi-0.6.4-Windows-Amd64.exe',
          size: 1024 * 1024 * 62,
          updated_at: '2026-03-22T07:11:00Z',
        },
        {
          name: 'GoNavi-0.6.4-Linux-Amd64.tar.gz',
          browser_download_url:
            'https://github.com/Syngnat/GoNavi/releases/download/v0.6.4/GoNavi-0.6.4-Linux-Amd64.tar.gz',
          size: 1024 * 1024 * 66,
          updated_at: '2026-03-22T07:12:00Z',
        },
      ],
    },
  ],
};

export function getFallbackReleases(locale: SiteLocale): NormalizedRelease[] {
  return fallbackReleasePayload[locale].map((release) => normalizeRelease(release));
}

export const fallbackReleases: NormalizedRelease[] = getFallbackReleases('en');
