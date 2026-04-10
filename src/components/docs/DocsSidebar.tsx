import { NavLink } from 'react-router-dom';
import { DocEntry } from '../../content/docs';
import { SiteLocale, withLocalePath } from '../../lib/locale';

type DocsSidebarProps = {
  locale: SiteLocale;
  docs: DocEntry[];
  activeSlug?: string;
};

export default function DocsSidebar({ locale, docs, activeSlug }: DocsSidebarProps) {
  const copy = {
    zh: {
      eyebrow: '文档目录',
      title: '围绕连接、数据源和排查建立连续阅读路径',
      index: '文档首页',
    },
    en: {
      eyebrow: 'Docs directory',
      title: 'Build a continuous reading path around connectivity, data sources, and debugging',
      index: 'Docs home',
    },
  }[locale];

  return (
    <aside className="docs-sidebar">
      <p className="section-eyebrow">{copy.eyebrow}</p>
      <h2 className="docs-sidebar__title">{copy.title}</h2>

      <nav aria-label={copy.eyebrow} className="docs-sidebar__nav">
        <NavLink
          className={({ isActive }) =>
            `docs-sidebar__link${isActive && !activeSlug ? ' docs-sidebar__link--active' : ''}`
          }
          end
          to={withLocalePath(locale, '/docs')}
        >
          {copy.index}
        </NavLink>

        {docs.map((doc) => (
          <NavLink
            key={doc.slug}
            className={({ isActive }) =>
              `docs-sidebar__link${isActive || activeSlug === doc.slug ? ' docs-sidebar__link--active' : ''}`
            }
            to={withLocalePath(locale, `/docs/${doc.slug}`)}
          >
            <span>{doc.title}</span>
            <small>{doc.summary}</small>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
