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
  /** The headless `gonavi-cli_*` archives ship in the same release as the desktop app. */
  cli: boolean;
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
  /** SHA256SUMS and similar files, kept apart because they are not installers. */
  checksums: { name: string; url: string }[];
}

const PLATFORM_RULES: Array<{ platform: ReleasePlatform; patterns: RegExp[] }> = [
  { platform: 'windows', patterns: [/windows?/i, /win32/i, /win64/i, /\.msi$/i, /\.exe$/i] },
  { platform: 'macos', patterns: [/mac(os)?/i, /darwin/i, /osx/i, /\.dmg$/i, /\.pkg$/i] },
  { platform: 'linux', patterns: [/linux/i, /appimage/i, /\.deb$/i, /\.rpm$/i, /\.tar\.gz$/i, /\.tgz$/i] },
];

const SKIP_PATTERNS = /checksum|sha256|sha512|signature|\.sig$|\.asc$|readme|source|^latest\.json$|^license$|^notice$/i;
const CHECKSUM_PATTERN = /sha256sums|checksums/i;
const CLI_PATTERN = /^gonavi-cli[_-]/i;

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
            cli: CLI_PATTERN.test(assetName),
          };
        })
        .filter((a): a is NormalizedReleaseAsset => a !== null)
    : [];
  const checksums = Array.isArray(input.assets)
    ? input.assets
        .map((a) => ({ name: toText(a.name), url: toText(a.browser_download_url) }))
        .filter((a) => a.name && a.url && CHECKSUM_PATTERN.test(a.name))
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
    checksums,
  };
}

/** Pick the best variant per platform given an optional preferred architecture. */
export function pickPrimaryAsset(
  assets: NormalizedReleaseAsset[],
  platform: ReleasePlatform,
  preferredArch?: 'x64' | 'arm64' | null,
): NormalizedReleaseAsset | null {
  const candidates = assets.filter((a) => a.platform === platform && !a.cli);
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

export type DesktopArch = 'x64' | 'arm64';

/**
 * What a desktop installer is, read from its file name, e.g.
 * GoNavi-1.1.0-Windows-Arm64-Portable.zip -> { arch: 'arm64', kind: 'portable-zip' }.
 * Kinds: installer, portable-exe, portable-zip (Windows); dmg (macOS);
 * webkit41, webkit40 (Linux x64, by WebKitGTK version); tarball (other Linux builds).
 */
export interface DesktopVariant {
  asset: NormalizedReleaseAsset;
  arch: DesktopArch;
  kind: string;
}

const KIND_ORDER = ['installer', 'portable-exe', 'portable-zip', 'dmg', 'webkit41', 'webkit40', 'tarball'];

export function desktopVariants(assets: NormalizedReleaseAsset[], platform: ReleasePlatform): DesktopVariant[] {
  return assets
    .filter((asset) => asset.platform === platform && !asset.cli)
    .map((asset) => {
      const name = asset.name;
      const arch: DesktopArch = detectArch(name) === 'arm64' ? 'arm64' : 'x64';
      let kind = 'tarball';
      if (platform === 'windows') {
        if (/installer|\.msi$/i.test(name)) kind = 'installer';
        else if (/\.exe$/i.test(name)) kind = 'portable-exe';
        else kind = 'portable-zip';
      } else if (platform === 'macos') {
        kind = 'dmg';
      } else if (/webkit-?41/i.test(name)) {
        kind = 'webkit41';
      } else if (arch === 'x64') {
        // The unsuffixed x64 Linux build links against WebKitGTK 4.0.
        kind = 'webkit40';
      }
      return { asset, arch, kind };
    })
    // Most Macs in use are Apple silicon, so ARM leads there; x64 leads everywhere else.
    .sort((l, r) => (l.arch === r.arch ? 0 : (l.arch === 'x64') !== (platform === 'macos') ? -1 : 1)
      || KIND_ORDER.indexOf(l.kind) - KIND_ORDER.indexOf(r.kind)
      || l.asset.name.localeCompare(r.asset.name));
}

/** The installer to offer first on a platform for a given CPU architecture. */
export function recommendedVariant(variants: DesktopVariant[], arch: DesktopArch): DesktopVariant | null {
  const sameArch = variants.filter((variant) => variant.arch === arch);
  return sameArch.find((variant) => ['installer', 'dmg', 'webkit41'].includes(variant.kind))
    ?? sameArch[0]
    ?? null;
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

const releasesCache = new Map<number, Promise<NormalizedRelease[]>>();

/**
 * Called from Astro pages at build time. Memoised per page size so the header,
 * home, download and changelog pages share one GitHub request per build; a
 * failed request is dropped from the cache so the next caller retries.
 */
export function fetchReleases(perPage = 20): Promise<NormalizedRelease[]> {
  let pending = releasesCache.get(perPage);
  if (!pending) {
    pending = requestReleases(perPage);
    releasesCache.set(perPage, pending);
    pending.catch(() => releasesCache.delete(perPage));
  }
  return pending;
}

async function requestReleases(perPage: number): Promise<NormalizedRelease[]> {
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

/** Compact count for stars / downloads: 2061 -> "2.1k". */
export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
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
