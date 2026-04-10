import { NavLink } from 'react-router-dom';
import { SiteLocale, withLocalePath } from '../../lib/locale';
import LocaleSwitch from './LocaleSwitch';

type HeaderProps = {
  locale: SiteLocale;
};

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Download', path: '/download' },
  { label: 'Docs', path: '/docs' },
  { label: 'Changelog', path: '/changelog' },
  { label: 'Roadmap', path: '/roadmap' },
] as const;

export default function Header({ locale }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-shell__inner site-header__inner">
        <div className="site-brand">
          <span className="site-brand__index" aria-hidden="true">
            [01]
          </span>
          <span className="site-brand__name">GoNavi</span>
          <span className="site-brand__tag">Native database workflow</span>
        </div>

        <div className="site-header__meta">
          <nav className="site-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.label}
                className={({ isActive }) =>
                  `site-nav__link${isActive ? ' site-nav__link--active' : ''}`
                }
                end={item.path === '/'}
                to={withLocalePath(locale, item.path)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <LocaleSwitch locale={locale} />

          <a
            className="site-header__external"
            href="https://github.com/Syngnat/GoNavi"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
