import { useParams } from 'react-router-dom';
import DocsSidebar from '../components/docs/DocsSidebar';
import MarkdownPage from '../components/docs/MarkdownPage';
import { getDocBySlug, getDocsForLocale } from '../content/docs';
import { resolveLocale } from '../lib/locale';
import NotFoundPage from './NotFoundPage';

export default function DocsArticlePage() {
  const { locale, slug } = useParams();
  const resolvedLocale = resolveLocale(locale);
  const docs = getDocsForLocale(resolvedLocale);
  const doc = getDocBySlug(resolvedLocale, slug ?? '');

  return (
    <div className="docs-layout">
      <DocsSidebar activeSlug={slug} docs={docs} locale={resolvedLocale} />

      {doc ? (
        <MarkdownPage body={doc.body} locale={resolvedLocale} summary={doc.summary} title={doc.title} />
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
}
