import { normalizeRelease, pickPrimaryAssets } from './releases';

test('normalizes GitHub release payload into platform buckets', () => {
  const normalized = normalizeRelease({
    tag_name: 'v0.6.5',
    name: 'GoNavi v0.6.5',
    draft: false,
    prerelease: false,
    published_at: '2026-04-09T09:30:00Z',
    assets: [
      {
        name: 'GoNavi-v0.6.5-windows-amd64-installer.exe',
        browser_download_url: 'https://example.com/windows.exe',
        size: 1024,
        updated_at: '2026-04-09T09:31:00Z',
      },
      {
        name: 'GoNavi-v0.6.5-darwin-universal.dmg',
        browser_download_url: 'https://example.com/macos.dmg',
        size: 2048,
        updated_at: '2026-04-09T09:32:00Z',
      },
      {
        name: 'GoNavi-v0.6.5-linux-amd64.AppImage',
        browser_download_url: 'https://example.com/linux.AppImage',
        size: 4096,
        updated_at: '2026-04-09T09:33:00Z',
      },
    ],
  });

  expect(normalized.tag).toBe('v0.6.5');
  expect(normalized.name).toBe('GoNavi v0.6.5');
  expect(normalized.assets).toHaveLength(3);

  const primary = pickPrimaryAssets(normalized);

  expect(primary.windows?.name).toMatch(/windows/i);
  expect(primary.macos?.name).toMatch(/darwin|mac/i);
  expect(primary.linux?.name).toMatch(/linux/i);
});

test('filters out unsupported assets when selecting primary platform downloads', () => {
  const normalized = normalizeRelease({
    tag_name: 'dev-latest',
    assets: [
      {
        name: 'checksums.txt',
        browser_download_url: 'https://example.com/checksums.txt',
        size: 128,
      },
      {
        name: 'GoNavi-v0.6.5-windows-amd64-portable.zip',
        browser_download_url: 'https://example.com/windows.zip',
        size: 1024,
      },
    ],
  });

  const primary = pickPrimaryAssets(normalized);

  expect(primary.windows?.name).toMatch(/windows/i);
  expect(primary.macos).toBeUndefined();
  expect(primary.linux).toBeUndefined();
});
