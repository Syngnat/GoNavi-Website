import { SiteLocale } from '../../lib/locale';
import { NormalizedReleaseAsset, ReleasePlatform } from '../../lib/releases';

type PlatformCardProps = {
  locale: SiteLocale;
  platform: ReleasePlatform;
  asset?: NormalizedReleaseAsset;
};

const platformCopy: Record<
  SiteLocale,
  Record<ReleasePlatform, { title: string; description: string; action: string; unavailable: string }>
> = {
  zh: {
    windows: {
      title: 'Windows',
      description: '适合大多数桌面环境，通常提供安装包或便携包。',
      action: '下载 Windows 版本',
      unavailable: '当前没有可用的 Windows 资产。',
    },
    macos: {
      title: 'macOS',
      description: '适合 Apple Silicon 与 Intel 机型，优先选择桌面安装包。',
      action: '下载 macOS 版本',
      unavailable: '当前没有可用的 macOS 资产。',
    },
    linux: {
      title: 'Linux',
      description: '适合常见发行版，通常提供 AppImage、deb 或 rpm 包。',
      action: '下载 Linux 版本',
      unavailable: '当前没有可用的 Linux 资产。',
    },
  },
  en: {
    windows: {
      title: 'Windows',
      description: 'Built for most desktop setups, usually as an installer or portable archive.',
      action: 'Download Windows build',
      unavailable: 'No Windows asset is available yet.',
    },
    macos: {
      title: 'macOS',
      description: 'Suitable for Apple Silicon and Intel machines, usually as a desktop installer.',
      action: 'Download macOS build',
      unavailable: 'No macOS asset is available yet.',
    },
    linux: {
      title: 'Linux',
      description: 'Targets common distributions with AppImage, deb, or rpm packages.',
      action: 'Download Linux build',
      unavailable: 'No Linux asset is available yet.',
    },
  },
};

function formatSize(size: number | null): string {
  if (size === null) {
    return '';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  let value = size;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const rounded = value >= 10 || unitIndex === 0 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[unitIndex]}`;
}

export default function PlatformCard({ locale, platform, asset }: PlatformCardProps) {
  const copy = platformCopy[locale][platform];

  return (
    <article className="platform-card">
      <div className="platform-card__header">
        <p className="platform-card__platform">{copy.title}</p>
        <span className={`platform-card__status${asset ? ' platform-card__status--ready' : ''}`}>
          {asset ? (locale === 'zh' ? '可下载' : 'Ready') : locale === 'zh' ? '待发布' : 'Pending'}
        </span>
      </div>

      <p className="platform-card__description">{copy.description}</p>

      {asset ? (
        <div className="platform-card__asset">
          <strong className="platform-card__asset-name">{asset.name}</strong>
          <span className="platform-card__asset-meta">
            {formatSize(asset.size)}
            {asset.updatedAt ? ` · ${new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', { dateStyle: 'medium' }).format(new Date(asset.updatedAt))}` : ''}
          </span>
          <a className="platform-card__action" href={asset.url}>
            {copy.action}
          </a>
        </div>
      ) : (
        <p className="platform-card__missing">{copy.unavailable}</p>
      )}
    </article>
  );
}
