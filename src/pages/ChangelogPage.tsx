import { useParams } from 'react-router-dom';
import ReleaseTimeline from '../components/changelog/ReleaseTimeline';
import { fallbackReleases } from '../content/changelog-fallback';
import { resolveLocale } from '../lib/locale';
import { useReleaseFeed } from '../lib/useReleaseFeed';

const copy = {
  zh: {
    eyebrow: '更新日志',
    title: '按 release 顺序查看更新轨迹',
    description: '当 GitHub API 不可用时，页面会自动展示本地 fallback 记录，不会留白。',
    note: '当前 feed',
  },
  en: {
    eyebrow: 'Changelog',
    title: 'Track changes in release order',
    description: 'When the GitHub API is unavailable, the page switches to the local fallback snapshot instead of going blank.',
    note: 'Current feed',
  },
} as const;

export default function ChangelogPage() {
  const { locale } = useParams();
  const resolvedLocale = resolveLocale(locale);
  const { loading, releases, error } = useReleaseFeed();
  const visibleReleases = releases.length ? releases : fallbackReleases;

  return (
    <div className="release-page">
      <section className="release-page__intro content-panel">
        <p className="content-panel__eyebrow">{copy[resolvedLocale].eyebrow}</p>
        <h1 className="content-panel__title">{copy[resolvedLocale].title}</h1>
        <p className="content-panel__copy">{copy[resolvedLocale].description}</p>
        {loading ? <p className="release-page__status">{copy[resolvedLocale].note}</p> : null}
        {error ? <p className="release-page__status release-page__status--error">{error}</p> : null}
      </section>

      <ReleaseTimeline locale={resolvedLocale} releases={visibleReleases} />
    </div>
  );
}
