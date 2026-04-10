import { useParams } from 'react-router-dom';
import PlatformCard from '../components/download/PlatformCard';
import ReleaseSummary from '../components/download/ReleaseSummary';
import { resolveLocale } from '../lib/locale';
import { pickPrimaryAssets, ReleasePlatform } from '../lib/releases';
import { useReleaseFeed } from '../lib/useReleaseFeed';

const platforms: ReleasePlatform[] = ['windows', 'macos', 'linux'];

const copy = {
  zh: {
    eyebrow: '发布目录',
    title: '从当前桌面版本进入下载目录',
    description:
      '页面优先读取 GitHub Releases，失败时自动降级到本地兜底数据，让桌面下载入口始终保持可读。',
    releaseFeed: '平台索引',
    releaseFeedCopy: '按系统查看当前可用资产、包体大小和更新时间。',
  },
  en: {
    eyebrow: 'Release directory',
    title: 'Enter the download directory from the current desktop release',
    description:
      'This page prefers GitHub Releases and safely falls back to local content so the desktop download entry always stays readable.',
    releaseFeed: 'Platform index',
    releaseFeedCopy: 'Inspect the current assets, package sizes, and update timestamps by platform.',
  },
} as const;

export default function DownloadPage() {
  const { locale } = useParams();
  const resolvedLocale = resolveLocale(locale);
  const { loading, releases, error } = useReleaseFeed(resolvedLocale);
  const latest = releases[0];
  const primaryAssets = latest ? pickPrimaryAssets(latest) : {};

  if (!latest) {
    return null;
  }

  return (
    <div className="release-page release-page--download">
      <section className="release-page__intro content-panel">
        <p className="content-panel__eyebrow">{copy[resolvedLocale].eyebrow}</p>
        <h1 className="content-panel__title">{copy[resolvedLocale].title}</h1>
        <p className="content-panel__copy">{copy[resolvedLocale].description}</p>
      </section>

      <div className="release-page__grid">
        <ReleaseSummary locale={resolvedLocale} release={latest} loading={loading} error={error} />

        <section className="release-page__section">
          <div className="release-page__section-heading">
            <p className="section-eyebrow">{copy[resolvedLocale].releaseFeed}</p>
            <p className="release-page__section-copy">{copy[resolvedLocale].releaseFeedCopy}</p>
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
    </div>
  );
}
