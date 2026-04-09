import { NormalizedRelease, normalizeRelease } from '../lib/releases';

export const fallbackReleases: NormalizedRelease[] = [
  normalizeRelease({
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
  }),
  normalizeRelease({
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
  }),
];
