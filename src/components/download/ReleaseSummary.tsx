import { SiteLocale } from '../../lib/locale';
import { NormalizedRelease } from '../../lib/releases';

const DATE_FORMATS: Record<SiteLocale, string> = {
  zh: 'zh-CN',
  en: 'en-US',
};

type ReleaseSummaryProps = {
  locale: SiteLocale;
  release: NormalizedRelease;
  loading: boolean;
  error: string | null;
};

function formatPublishedAt(locale: SiteLocale, publishedAt: string | null): string {
  if (!publishedAt) {
    return locale === 'zh' ? '发布时间待定' : 'Release date pending';
  }

  const date = new Date(publishedAt);

  if (Number.isNaN(date.getTime())) {
    return publishedAt;
  }

  return new Intl.DateTimeFormat(DATE_FORMATS[locale], {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export default function ReleaseSummary({ locale, release, loading, error }: ReleaseSummaryProps) {
  const copy = {
    zh: {
      title: '最新发布',
      loading: '正在刷新 GitHub release feed',
      fallback: '当前展示本地 fallback 快照',
      publishedAt: '发布时间',
      source: '来源',
      releaseNotes: '更新要点',
    },
    en: {
      title: 'Latest release',
      loading: 'Refreshing the GitHub release feed',
      fallback: 'Showing the local fallback snapshot',
      publishedAt: 'Published',
      source: 'Source',
      releaseNotes: 'Release notes',
    },
  }[locale];

  return (
    <section className="release-summary">
      <div className="release-summary__header">
        <div>
          <p className="section-eyebrow">{copy.title}</p>
          <h1 className="release-summary__title">{release.name}</h1>
        </div>
        <div className="release-summary__badges" aria-label={copy.title}>
          <span className="release-summary__badge">{release.tag}</span>
          {loading ? <span className="release-summary__badge release-summary__badge--loading">{copy.loading}</span> : null}
          {error ? <span className="release-summary__badge release-summary__badge--error">{copy.fallback}</span> : null}
        </div>
      </div>

      <div className="release-summary__meta">
        <div>
          <span>{copy.publishedAt}</span>
          <strong>{formatPublishedAt(locale, release.publishedAt)}</strong>
        </div>
        <div>
          <span>{copy.source}</span>
          <strong>{release.url ? new URL(release.url).hostname : 'GitHub'}</strong>
        </div>
      </div>

      {release.body ? <p className="release-summary__body">{release.body}</p> : null}

      {error ? <p className="release-summary__error">{error}</p> : null}

      <div className="release-summary__footer">
        <span className="release-summary__footer-label">{copy.releaseNotes}</span>
        <span className="release-summary__footer-value">
          {release.assets.length
            ? locale === 'zh'
              ? `${release.assets.length} 个可下载资产`
              : `${release.assets.length} downloadable assets`
            : locale === 'zh'
              ? '暂无可下载资产'
              : 'No downloadable assets yet'}
        </span>
      </div>
    </section>
  );
}
