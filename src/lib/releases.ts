export type ReleasePlatform = 'windows' | 'macos' | 'linux';

export type ReleaseAssetPlatform = ReleasePlatform | 'other';

export type GitHubReleaseAssetLike = {
  name?: string;
  browser_download_url?: string;
  size?: number;
  updated_at?: string;
};

export type GitHubReleaseLike = {
  id?: number;
  tag_name?: string;
  name?: string;
  html_url?: string;
  body?: string;
  draft?: boolean;
  prerelease?: boolean;
  published_at?: string;
  assets?: GitHubReleaseAssetLike[];
};

export type NormalizedReleaseAsset = {
  name: string;
  url: string;
  size: number | null;
  updatedAt: string | null;
  platform: ReleaseAssetPlatform;
};

export type NormalizedRelease = {
  id: number | null;
  tag: string;
  name: string;
  url: string | null;
  body: string;
  publishedAt: string | null;
  draft: boolean;
  prerelease: boolean;
  assets: NormalizedReleaseAsset[];
  primaryAssets: Partial<Record<ReleasePlatform, NormalizedReleaseAsset>>;
};

const PLATFORM_RULES: Array<{
  platform: ReleasePlatform;
  patterns: RegExp[];
}> = [
  {
    platform: 'windows',
    patterns: [/windows?/i, /win32/i, /win64/i, /\.msi$/i, /\.exe$/i],
  },
  {
    platform: 'macos',
    patterns: [/mac(os)?/i, /darwin/i, /osx/i, /\.dmg$/i, /\.pkg$/i],
  },
  {
    platform: 'linux',
    patterns: [/linux/i, /appimage/i, /\.deb$/i, /\.rpm$/i, /\.tar\.gz$/i, /\.tgz$/i],
  },
];

function toText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isAssetCandidate(name: string): boolean {
  return !/checksum|sha256|sha512|signature|\.sig$|\.asc$|readme|source/i.test(name);
}

function classifyAsset(name: string): ReleaseAssetPlatform {
  for (const rule of PLATFORM_RULES) {
    if (rule.patterns.some((pattern) => pattern.test(name))) {
      return rule.platform;
    }
  }

  return 'other';
}

function scoreAsset(platform: ReleasePlatform, asset: NormalizedReleaseAsset): number {
  const lowerName = asset.name.toLowerCase();
  let score = 0;

  switch (platform) {
    case 'windows':
      if (/(windows?|win32|win64)/i.test(lowerName)) score += 6;
      if (/\.exe$/i.test(lowerName) || /\.msi$/i.test(lowerName)) score += 4;
      if (/portable|installer/i.test(lowerName)) score += 2;
      break;
    case 'macos':
      if (/(mac(os)?|darwin|osx)/i.test(lowerName)) score += 6;
      if (/\.dmg$/i.test(lowerName) || /\.pkg$/i.test(lowerName)) score += 4;
      if (/universal|arm64|aarch64|x64/i.test(lowerName)) score += 1;
      break;
    case 'linux':
      if (/linux/i.test(lowerName)) score += 6;
      if (/appimage|\.deb$|\.rpm$|\.tar\.gz$|\.tgz$/i.test(lowerName)) score += 4;
      if (/x64|amd64|arm64|aarch64/i.test(lowerName)) score += 1;
      break;
  }

  return score;
}

export function normalizeRelease(input: GitHubReleaseLike): NormalizedRelease {
  const tag = toText(input.tag_name) || toText(input.name) || 'untagged';
  const name = toText(input.name) || tag;
  const assets = Array.isArray(input.assets)
    ? input.assets
        .map((asset) => {
          const name = toText(asset.name);
          const url = toText(asset.browser_download_url);

          if (!name || !url || !isAssetCandidate(name)) {
            return null;
          }

          return {
            name,
            url,
            size: typeof asset.size === 'number' && Number.isFinite(asset.size) ? asset.size : null,
            updatedAt: toText(asset.updated_at) || null,
            platform: classifyAsset(name),
          } satisfies NormalizedReleaseAsset;
        })
        .filter((asset): asset is NormalizedReleaseAsset => asset !== null)
    : [];

  const release: NormalizedRelease = {
    id: typeof input.id === 'number' ? input.id : null,
    tag,
    name,
    url: toText(input.html_url) || null,
    body: toText(input.body),
    publishedAt: toText(input.published_at) || null,
    draft: Boolean(input.draft),
    prerelease: Boolean(input.prerelease),
    assets,
    primaryAssets: {},
  };

  release.primaryAssets = pickPrimaryAssets(release);

  return release;
}

export function pickPrimaryAssets(
  input: NormalizedRelease | { assets: NormalizedReleaseAsset[] } | NormalizedReleaseAsset[],
): Partial<Record<ReleasePlatform, NormalizedReleaseAsset>> {
  const assets = Array.isArray(input) ? input : input.assets;
  const primaryAssets: Partial<Record<ReleasePlatform, NormalizedReleaseAsset>> = {};

  for (const platform of ['windows', 'macos', 'linux'] as ReleasePlatform[]) {
    const candidates = assets.filter((asset) => asset.platform === platform);
    if (candidates.length === 0) {
      continue;
    }

    primaryAssets[platform] = candidates
      .slice()
      .sort((left, right) => scoreAsset(platform, right) - scoreAsset(platform, left) || left.name.localeCompare(right.name))[0];
  }

  return primaryAssets;
}
