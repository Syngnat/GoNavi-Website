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
      eyebrow: '文档目录',
      title: '把安装、连接和排查说明编排成一条连续阅读路径',
      description:
        '首版文档优先覆盖安装、连接、数据源和常见问题，让个人开发者与团队在同一套说明里建立稳定工作节奏。',
      action: '阅读文档',
    },
    en: {
      eyebrow: 'Docs directory',
      title: 'Sequence installation, connection, and debugging guidance into a continuous reading path',
      description:
        'The first docs release focuses on installation, connectivity, data sources, and FAQ so solo developers and teams can align on one reading flow.',
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
