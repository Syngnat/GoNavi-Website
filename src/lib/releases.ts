import { GITHUB_RELEASES_API } from './i18n';

export type ReleasePlatform = 'windows' | 'macos' | 'linux';
export type ReleaseAssetPlatform = ReleasePlatform | 'other';

export interface ReleaseAssetLike {
  name?: string;
  browser_download_url?: string;
  size?: number;
  updated_at?: string;
}

export interface ReleaseLike {
  id?: number;
  tag_name?: string;
  name?: string;
  html_url?: string;
  body?: string;
  draft?: boolean;
  prerelease?: boolean;
  published_at?: string;
  assets?: ReleaseAssetLike[];
}

export interface NormalizedReleaseAsset {
  name: string;
  url: string;
  size: number | null;
  updatedAt: string | null;
  platform: ReleaseAssetPlatform;
}

export interface NormalizedRelease {
  id: number | null;
  tag: string;
  name: string;
  url: string | null;
  body: string;
  publishedAt: string | null;
  draft: boolean;
  prerelease: boolean;
  assets: NormalizedReleaseAsset[];
}

const PLATFORM_RULES: Array<{ platform: ReleasePlatform; patterns: RegExp[] }> = [
  { platform: 'windows', patterns: [/windows?/i, /win32/i, /win64/i, /\.msi$/i, /\.exe$/i] },
  { platform: 'macos', patterns: [/mac(os)?/i, /darwin/i, /osx/i, /\.dmg$/i, /\.pkg$/i] },
  { platform: 'linux', patterns: [/linux/i, /appimage/i, /\.deb$/i, /\.rpm$/i, /\.tar\.gz$/i, /\.tgz$/i] },
];

const SKIP_PATTERNS = /checksum|sha256|sha512|signature|\.sig$|\.asc$|readme|source/i;

function toText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function classifyAsset(name: string): ReleaseAssetPlatform {
  for (const rule of PLATFORM_RULES) {
    if (rule.patterns.some((p) => p.test(name))) return rule.platform;
  }
  return 'other';
}

export function scoreAsset(platform: ReleasePlatform, asset: NormalizedReleaseAsset): number {
  const lower = asset.name.toLowerCase();
  let score = 0;
  if (platform === 'windows') {
    if (/windows?|win32|win64/.test(lower)) score += 6;
    if (/\.(exe|msi)$/.test(lower)) score += 4;
    if (/installer|portable/.test(lower)) score += 2;
  } else if (platform === 'macos') {
    if (/mac(os)?|darwin|osx/.test(lower)) score += 6;
    if (/\.(dmg|pkg)$/.test(lower)) score += 4;
    if (/universal|arm64|x64/.test(lower)) score += 1;
  } else if (platform === 'linux') {
    if (/linux/.test(lower)) score += 6;
    if (/appimage|\.(deb|rpm|tar\.gz|tgz)$/.test(lower)) score += 4;
    if (/x64|amd64|arm64|aarch64/.test(lower)) score += 1;
  }
  return score;
}

export function normalizeRelease(input: ReleaseLike): NormalizedRelease {
  const tag = toText(input.tag_name) || toText(input.name) || 'untagged';
  const name = toText(input.name) || tag;
  const assets: NormalizedReleaseAsset[] = Array.isArray(input.assets)
    ? input.assets
        .map((a) => {
          const assetName = toText(a.name);
          const url = toText(a.browser_download_url);
          if (!assetName || !url || SKIP_PATTERNS.test(assetName)) return null;
          return {
            name: assetName,
            url,
            size: typeof a.size === 'number' && Number.isFinite(a.size) ? a.size : null,
            updatedAt: toText(a.updated_at) || null,
            platform: classifyAsset(assetName),
          };
        })
        .filter((a): a is NormalizedReleaseAsset => a !== null)
    : [];

  return {
    id: typeof input.id === 'number' ? input.id : null,
    tag,
    name,
    url: toText(input.html_url) || null,
    body: toText(input.body),
    publishedAt: toText(input.published_at) || null,
    draft: Boolean(input.draft),
    prerelease: Boolean(input.prerelease),
    assets,
  };
}

/** Pick the best variant per platform given an optional preferred architecture. */
export function pickPrimaryAsset(
  assets: NormalizedReleaseAsset[],
  platform: ReleasePlatform,
  preferredArch?: 'x64' | 'arm64' | null,
): NormalizedReleaseAsset | null {
  const candidates = assets.filter((a) => a.platform === platform);
  if (candidates.length === 0) return null;
  const sorted = candidates
    .slice()
    .sort((l, r) => scoreAsset(platform, r) - scoreAsset(platform, l) || l.name.localeCompare(r.name));
  if (preferredArch) {
    const match = sorted.find((a) => detectArch(a.name) === preferredArch);
    if (match) return match;
  }
  return sorted[0];
}

export function detectArch(name: string): 'x64' | 'arm64' | 'x86' | 'universal' | null {
  if (/arm64|aarch64/i.test(name)) return 'arm64';
  if (/x64|amd64|x86_64/i.test(name)) return 'x64';
  if (/386|i386|x86(?!_64)/i.test(name)) return 'x86';
  if (/universal/i.test(name)) return 'universal';
  return null;
}

export function detectFormat(name: string): string | null {
  if (/\.msi$/i.test(name)) return 'MSI';
  if (/\.exe$/i.test(name)) return 'EXE';
  if (/\.dmg$/i.test(name)) return 'DMG';
  if (/\.pkg$/i.test(name)) return 'PKG';
  if (/\.deb$/i.test(name)) return '.deb';
  if (/\.rpm$/i.test(name)) return '.rpm';
  if (/\.appimage$/i.test(name)) return 'AppImage';
  if (/\.tar\.gz$/i.test(name) || /\.tgz$/i.test(name)) return '.tar.gz';
  if (/\.zip$/i.test(name)) return '.zip';
  return null;
}

export function formatSize(size: number | null): string {
  if (size === null) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let v = size;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  const r = v >= 10 || i === 0 ? Math.round(v) : Math.round(v * 10) / 10;
  return `${r} ${units[i]}`;
}

/** Called from Astro pages at build time. */
export async function fetchReleases(perPage = 20): Promise<NormalizedRelease[]> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(`${GITHUB_RELEASES_API}?per_page=${perPage}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'GoNavi-Website/build',
      },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`GitHub releases fetch failed: HTTP ${res.status}`);
    const data = (await res.json()) as ReleaseLike[];
    return Array.isArray(data)
      ? data.map(normalizeRelease).filter((r) => !r.draft)
      : [];
  } finally {
    clearTimeout(id);
  }
}

/** Convenience: latest non-prerelease release. */
export function latestRelease(releases: NormalizedRelease[]): NormalizedRelease | null {
  return releases.find((r) => !r.prerelease) ?? releases[0] ?? null;
}

export interface GitHubStats {
  stars: number;
  totalDownloads: number;
}

const GITHUB_REPOSITORY_API = 'https://api.github.com/repos/Syngnat/GoNavi';
const GITHUB_API_HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'GoNavi-Website/build',
};

/** Fetch GitHub star count and total release download count at build time. */
let cachedStats: GitHubStats | null = null;

export async function fetchGitHubStats(): Promise<GitHubStats> {
  if (cachedStats) return cachedStats;

  const [repoResult, releasesResult] = await Promise.allSettled([
    fetch(GITHUB_REPOSITORY_API, {
      headers: GITHUB_API_HEADERS,
      signal: AbortSignal.timeout(8_000),
    }).then(async (res) => {
      if (!res.ok) throw new Error(`GitHub repository fetch failed: HTTP ${res.status}`);
      return res.json() as Promise<{ stargazers_count?: number }>;
    }),
    fetch(`${GITHUB_RELEASES_API}?per_page=100`, {
      headers: GITHUB_API_HEADERS,
      signal: AbortSignal.timeout(15_000),
    }).then(async (res) => {
      if (!res.ok) throw new Error(`GitHub releases fetch failed: HTTP ${res.status}`);
      return res.json() as Promise<Array<{ assets?: Array<{ download_count?: number }> }> >;
    }),
  ]);

  const stars = repoResult.status === 'fulfilled'
    ? repoResult.value.stargazers_count ?? 0
    : 0;
  const totalDownloads = releasesResult.status === 'fulfilled'
    ? releasesResult.value.reduce(
        (total, release) => total + (release.assets ?? []).reduce(
          (assetTotal, asset) => assetTotal + (asset.download_count ?? 0),
          0,
        ),
        0,
      )
    : 0;

  cachedStats = { stars, totalDownloads };
  return cachedStats;
}
