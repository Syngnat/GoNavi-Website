import { SiteLocale } from '../../lib/locale';
import { NormalizedRelease } from '../../lib/releases';

type ReleaseTimelineProps = {
  locale: SiteLocale;
  releases: NormalizedRelease[];
};

const DATE_FORMATS: Record<SiteLocale, string> = {
  zh: 'zh-CN',
  en: 'en-US',
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
  }).format(date);
}

export default function ReleaseTimeline({ locale, releases }: ReleaseTimelineProps) {
  return (
    <section className="release-timeline">
      {releases.map((release, index) => (
        <article className="release-timeline__item" key={`${release.tag}-${release.publishedAt ?? index}`}>
          <div className="release-timeline__rail" aria-hidden="true">
            <span className="release-timeline__dot" />
          </div>
          <div className="release-timeline__body">
            <div className="release-timeline__header">
              <div>
                <p className="release-timeline__tag">{release.tag}</p>
                <h2 className="release-timeline__title">{release.name}</h2>
              </div>
              <span className="release-timeline__date">{formatPublishedAt(locale, release.publishedAt)}</span>
            </div>

            {release.body ? <p className="release-timeline__copy">{release.body}</p> : null}

            {release.assets.length ? (
              <div className="release-timeline__assets">
                {release.assets.slice(0, 3).map((asset) => (
                  <span className="release-timeline__asset" key={asset.name}>
                    {asset.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </section>
  );
}
