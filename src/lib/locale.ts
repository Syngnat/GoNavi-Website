export const SUPPORTED_LOCALES = ['zh', 'en'] as const;

export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export function resolveLocale(input?: string): SiteLocale {
  return input === 'en' ? 'en' : 'zh';
}

export function withLocalePath(locale: SiteLocale, path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return normalizedPath === '/' ? `/${locale}` : `/${locale}${normalizedPath}`;
}
