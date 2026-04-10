import { useParams } from 'react-router-dom';
import ReleaseTimeline from '../components/changelog/ReleaseTimeline';
import { resolveLocale } from '../lib/locale';
import { useReleaseFeed } from '../lib/useReleaseFeed';

const copy = {
  zh: {
    eyebrow: '版本时间线',
    title: '按发布时间阅读 GoNavi 的发布轨迹',
    description: '当 GitHub API 不可用时，页面会自动展示本地兜底记录，让版本时间线继续可读。',
    note: '当前版本源',
  },
  en: {
    eyebrow: 'Release timeline',
    title: 'Read the GoNavi release trail in publication order',
    description: 'When the GitHub API is unavailable, the page switches to the local fallback snapshot so the release timeline never goes blank.',
    note: 'Current source',
  },
} as const;

export default function ChangelogPage() {
  const { locale } = useParams();
  const resolvedLocale = resolveLocale(locale);
  const { loading, releases, error } = useReleaseFeed(resolvedLocale);

  return (
    <div className="release-page">
      <section className="release-page__intro content-panel">
        <p className="content-panel__eyebrow">{copy[resolvedLocale].eyebrow}</p>
        <h1 className="content-panel__title">{copy[resolvedLocale].title}</h1>
        <p className="content-panel__copy">{copy[resolvedLocale].description}</p>
        {loading ? <p className="release-page__status">{copy[resolvedLocale].note}</p> : null}
        {error ? <p className="release-page__status release-page__status--error">{error}</p> : null}
      </section>

      <ReleaseTimeline locale={resolvedLocale} releases={releases} />
    </div>
  );
}
