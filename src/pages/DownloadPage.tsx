import { useParams } from 'react-router-dom';
import PlatformCard from '../components/download/PlatformCard';
import ReleaseSummary from '../components/download/ReleaseSummary';
import { resolveLocale } from '../lib/locale';
import { pickPrimaryAssets, ReleasePlatform } from '../lib/releases';
import { useReleaseFeed } from '../lib/useReleaseFeed';

const platforms: ReleasePlatform[] = ['windows', 'macos', 'linux'];

const copy = {
  zh: {
    eyebrow: '下载',
    title: '从最新 release 直接进入桌面端下载',
    description:
      '页面优先读取 GitHub Releases，失败时自动降级到本地 fallback 数据，确保下载入口始终可读。',
    releaseFeed: 'Release feed',
  },
  en: {
    eyebrow: 'Download',
    title: 'Download straight from the latest desktop release',
    description:
      'This page prefers GitHub Releases and safely falls back to local content so the download entry never becomes empty.',
    releaseFeed: 'Release feed',
  },
} as const;

export default function DownloadPage() {
  const { locale } = useParams();
  const resolvedLocale = resolveLocale(locale);
  const { loading, releases, error } = useReleaseFeed();
  const latest = releases[0];
  const primaryAssets = latest ? pickPrimaryAssets(latest) : {};

  if (!latest) {
    return null;
  }

  return (
    <div className="release-page">
      <section className="release-page__intro content-panel">
        <p className="content-panel__eyebrow">{copy[resolvedLocale].eyebrow}</p>
        <h1 className="content-panel__title">{copy[resolvedLocale].title}</h1>
        <p className="content-panel__copy">{copy[resolvedLocale].description}</p>
      </section>

      <ReleaseSummary locale={resolvedLocale} release={latest} loading={loading} error={error} />

      <section className="release-page__section">
        <div className="release-page__section-heading">
          <p className="section-eyebrow">{copy[resolvedLocale].releaseFeed}</p>
        </div>
        <div className="platform-grid">
          {platforms.map((platform) => (
            <PlatformCard
              key={platform}
              locale={resolvedLocale}
              platform={platform}
              asset={primaryAssets[platform]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
