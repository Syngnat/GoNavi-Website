import { useParams } from 'react-router-dom';
import RoadmapColumns from '../components/roadmap/RoadmapColumns';
import { resolveLocale } from '../lib/locale';

export default function RoadmapPage() {
  const { locale } = useParams();
  const resolvedLocale = resolveLocale(locale);
  const copy = {
    zh: {
      eyebrow: '公开路线图',
      title: '把产品方向、站点演进与社区协作放在同一份公开计划里',
      description: '这里不只是功能待办列表，也是官网、客户端与社区协同方式的公开计划书。',
    },
    en: {
      eyebrow: 'Public roadmap',
      title: 'Put product direction, site evolution, and community collaboration into one public plan',
      description:
        'This page is not only a feature list. It also acts as a public plan for how the website, product, and community move together.',
    },
  }[resolvedLocale];

  return (
    <div className="roadmap-page">
      <section className="content-panel roadmap-page__hero">
        <p className="content-panel__eyebrow">{copy.eyebrow}</p>
        <h1 className="content-panel__title">{copy.title}</h1>
        <p className="content-panel__copy">{copy.description}</p>
      </section>

      <RoadmapColumns locale={resolvedLocale} />
    </div>
  );
}
