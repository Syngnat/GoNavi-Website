import { Outlet } from 'react-router-dom';
import { SiteLocale } from '../../lib/locale';
import Footer from './Footer';
import Header from './Header';

type SiteShellProps = {
  locale: SiteLocale;
};

export default function SiteShell({ locale }: SiteShellProps) {
  return (
    <div className="site-shell">
      <Header locale={locale} />
      <main className="site-main" id="main-content">
        <div className="site-shell__inner">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
