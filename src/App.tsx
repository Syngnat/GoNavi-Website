import { Navigate, useLocation, useParams, useRoutes } from 'react-router-dom';
import SiteShell from './components/layout/SiteShell';
import HomePage from './pages/HomePage';
import { resolveLocale } from './lib/locale';
import ChangelogPage from './pages/ChangelogPage';
import DownloadPage from './pages/DownloadPage';
import DocsArticlePage from './pages/DocsArticlePage';
import DocsIndexPage from './pages/DocsIndexPage';
import NotFoundPage from './pages/NotFoundPage';
import RoadmapPage from './pages/RoadmapPage';

function LocaleRoute() {
  const { locale } = useParams();
  const { pathname, search, hash } = useLocation();
  const resolvedLocale = resolveLocale(locale);

  if (locale !== resolvedLocale) {
    const targetPath = `${pathname.replace(/^\/[^/]+/, `/${resolvedLocale}`)}${search}${hash}`;

    return <Navigate to={targetPath} replace />;
  }

  return <SiteShell locale={resolvedLocale} />;
}

export default function App() {
  return useRoutes([
    { path: '/', element: <Navigate to="/zh" replace /> },
    {
      path: '/:locale',
      element: <LocaleRoute />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'download', element: <DownloadPage /> },
        {
          path: 'docs',
          children: [
            { index: true, element: <DocsIndexPage /> },
            { path: ':slug', element: <DocsArticlePage /> },
          ],
        },
        { path: 'changelog', element: <ChangelogPage /> },
        { path: 'roadmap', element: <RoadmapPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);
}
