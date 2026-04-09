import { Link, useParams } from 'react-router-dom';
import DocsSidebar from '../components/docs/DocsSidebar';
import { getDocsForLocale } from '../content/docs';
import { resolveLocale, withLocalePath } from '../lib/locale';

export default function DocsIndexPage() {
  const { locale } = useParams();
  const resolvedLocale = resolveLocale(locale);
  const docs = getDocsForLocale(resolvedLocale);
  const copy = {
    zh: {
      eyebrow: '文档首页',
      title: '从安装到连接，把 GoNavi 的主路径压缩成一套可复用说明',
      description:
        '首版文档优先覆盖安装、连接、数据源和常见问题，帮助个人开发者与团队快速统一工作方式。',
      action: '阅读文档',
    },
    en: {
      eyebrow: 'Docs Home',
      title: 'Compress the path from install to connection into a reusable operating guide',
      description:
        'The first docs release focuses on installation, connectivity, data sources, and FAQ for both solo developers and teams.',
      action: 'Open article',
    },
  }[resolvedLocale];

  return (
    <div className="docs-layout">
      <DocsSidebar docs={docs} locale={resolvedLocale} />

      <section className="docs-index">
        <div className="content-panel docs-index__hero">
          <p className="content-panel__eyebrow">{copy.eyebrow}</p>
          <h1 className="content-panel__title">{copy.title}</h1>
          <p className="content-panel__copy">{copy.description}</p>
        </div>

        <div className="docs-index__grid">
          {docs.map((doc) => (
            <article className="docs-index__card" key={doc.slug}>
              <h2>{doc.title}</h2>
              <p>{doc.summary}</p>
              <Link className="docs-index__action" to={withLocalePath(resolvedLocale, `/docs/${doc.slug}`)}>
                {copy.action}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
