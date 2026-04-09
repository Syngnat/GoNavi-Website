import { useParams } from 'react-router-dom';
import RoadmapColumns from '../components/roadmap/RoadmapColumns';
import { resolveLocale } from '../lib/locale';

export default function RoadmapPage() {
  const { locale } = useParams();
  const resolvedLocale = resolveLocale(locale);
  const copy = {
    zh: {
      eyebrow: '路线图',
      title: '把官网、产品演进与社区入口放到同一页里',
      description: '这里不只是功能待办列表，也是官网、客户端与社区协同方式的公开说明。',
    },
    en: {
      eyebrow: 'Roadmap',
      title: 'Put the website, product direction, and community entry points in one place',
      description:
        'This page is not only a feature list. It also explains how the website, product, and community move together.',
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
