import { Link, useLocation } from 'react-router-dom';
import { SiteLocale, withLocalePath } from '../../lib/locale';

function stripLocalePrefix(pathname: string): string {
  const [, maybeLocale, ...rest] = pathname.split('/');

  if (maybeLocale === 'zh' || maybeLocale === 'en') {
    const remaining = rest.join('/');

    return remaining ? `/${remaining}` : '/';
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

type LocaleSwitchProps = {
  locale: SiteLocale;
};

export default function LocaleSwitch({ locale }: LocaleSwitchProps) {
  const location = useLocation();
  const internalPath = stripLocalePrefix(location.pathname);
  const suffix = `${location.search}${location.hash}`;

  return (
    <nav className="locale-switch" aria-label="Locale switch">
      <Link
        aria-current={locale === 'zh' ? 'page' : undefined}
        className="locale-switch__link"
        to={`${withLocalePath('zh', internalPath)}${suffix}`}
      >
        ZH
      </Link>
      <span className="locale-switch__divider" aria-hidden="true" />
      <Link
        aria-current={locale === 'en' ? 'page' : undefined}
        className="locale-switch__link"
        to={`${withLocalePath('en', internalPath)}${suffix}`}
      >
        EN
      </Link>
    </nav>
  );
}
