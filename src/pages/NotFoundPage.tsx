import { useParams } from 'react-router-dom';
import { resolveLocale } from '../lib/locale';

export default function NotFoundPage() {
  const { locale } = useParams();
  const resolvedLocale = resolveLocale(locale);
  const copy = {
    zh: {
      title: '页面不存在',
      description: '当前路径没有对应页面，请从导航返回首页、文档、下载页或路线图。',
    },
    en: {
      title: 'Page not found',
      description: 'There is no page for the current path. Use the navigation to return to the homepage, docs, download page, or roadmap.',
    },
  }[resolvedLocale];

  return (
    <section className="content-panel">
      <p className="content-panel__eyebrow">404</p>
      <h1 className="content-panel__title">{copy.title}</h1>
      <p className="content-panel__copy">{copy.description}</p>
    </section>
  );
}
