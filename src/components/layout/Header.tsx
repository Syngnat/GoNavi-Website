import { NavLink } from 'react-router-dom';
import { SiteLocale, withLocalePath } from '../../lib/locale';
import LocaleSwitch from './LocaleSwitch';

type HeaderProps = {
  locale: SiteLocale;
};

const copy = {
  zh: {
    brandTag: '原生数据库工作流',
    navigationLabel: '主导航',
    navigation: [
      { label: '首页', path: '/' },
      { label: '下载', path: '/download' },
      { label: '文档', path: '/docs' },
      { label: '更新日志', path: '/changelog' },
      { label: '路线图', path: '/roadmap' },
    ],
  },
  en: {
    brandTag: 'Native database workflow',
    navigationLabel: 'Primary navigation',
    navigation: [
      { label: 'Home', path: '/' },
      { label: 'Download', path: '/download' },
      { label: 'Docs', path: '/docs' },
      { label: 'Changelog', path: '/changelog' },
      { label: 'Roadmap', path: '/roadmap' },
    ],
  },
} as const;

export default function Header({ locale }: HeaderProps) {
  const content = copy[locale];

  return (
    <header className="site-header">
      <div className="site-shell__inner site-header__inner">
        <div className="site-brand">
          <span className="site-brand__index" aria-hidden="true">
            [01]
          </span>
          <span className="site-brand__name">GoNavi</span>
          <span className="site-brand__tag">{content.brandTag}</span>
        </div>

        <div className="site-header__meta">
          <nav className="site-nav" aria-label={content.navigationLabel}>
            {content.navigation.map((item) => (
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
