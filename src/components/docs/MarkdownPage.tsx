import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SiteLocale, withLocalePath } from '../../lib/locale';

type MarkdownPageProps = {
  locale: SiteLocale;
  title: string;
  summary?: string;
  body: string;
};

function resolveDocHref(locale: SiteLocale, href?: string): string | null {
  if (!href) {
    return null;
  }

  const match = href.match(/^(?:\.\/)?([a-z0-9-]+)\.md$/i);

  if (!match) {
    return null;
  }

  return withLocalePath(locale, `/docs/${match[1]}`);
}

export default function MarkdownPage({ locale, title, summary, body }: MarkdownPageProps) {
  return (
    <article className="docs-article">
      <header className="docs-article__header">
        <p className="section-eyebrow">Docs</p>
        <h1 className="docs-article__title">{title}</h1>
        {summary ? <p className="docs-article__summary">{summary}</p> : null}
      </header>

      <div className="docs-article__body">
        <ReactMarkdown
          components={{
            a({ children, href }) {
              const docHref = resolveDocHref(locale, href);

              if (docHref) {
                return <Link to={docHref}>{children}</Link>;
              }

              return (
                <a href={href} rel={href?.startsWith('http') ? 'noreferrer' : undefined} target={href?.startsWith('http') ? '_blank' : undefined}>
                  {children}
                </a>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {body}
        </ReactMarkdown>
      </div>
    </article>
  );
}
