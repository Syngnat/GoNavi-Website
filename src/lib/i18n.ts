export type Locale = 'zh' | 'en';

export const LOCALES: Locale[] = ['zh', 'en'];
export const DEFAULT_LOCALE: Locale = 'zh';

export function isLocale(value: unknown): value is Locale {
  return value === 'zh' || value === 'en';
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'zh' ? 'en' : 'zh';
}

/** Build a locale-prefixed static route: `withLocale('zh', '/download')` -> `/zh/download/` */
export function withLocale(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const route = clean === '/' ? '/' : `${clean.replace(/\/+$/, '')}/`;
  return `/${locale}${route}`;
}

/** Strip the leading `/<locale>` prefix from an Astro URL. */
export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(zh|en)(?=\/|$)/, '') || '/';
}

/** Replace the leading locale of a URL with a new one. */
export function swapLocale(pathname: string, next: Locale): string {
  const bare = stripLocale(pathname);
  return withLocale(next, bare);
}

export const navCopy: Record<Locale, {
  home: string;
  download: string;
  docs: string;
  changelog: string;
  roadmap: string;
  brandTag: string;
}> = {
  zh: {
    home: '首页',
    download: '下载',
    docs: '文档',
    changelog: '更新日志',
    roadmap: '路线图',
    brandTag: '数据库工作台',
  },
  en: {
    home: 'Home',
    download: 'Download',
    docs: 'Docs',
    changelog: 'Changelog',
    roadmap: 'Roadmap',
    brandTag: 'Database workbench',
  },
};

export const footerCopy: Record<Locale, {
  copy: string;
  product: string;
  resources: string;
  community: string;
  github: string;
  issues: string;
  discussions: string;
  license: string;
  wechat: string;
  wechatId: string;
}> = {
  zh: {
    copy: 'GoNavi — 原生数据库工作台。基于 Wails 与 React。',
    product: '产品',
    resources: '资源',
    community: '社区',
    github: 'GitHub',
    issues: '问题反馈',
    discussions: '讨论区',
    license: 'Apache-2.0',
    wechat: '微信',
    wechatId: 'ygf1140302783',
  },
  en: {
    copy: 'GoNavi — a native database workbench built with Wails and React.',
    product: 'Product',
    resources: 'Resources',
    community: 'Community',
    github: 'GitHub',
    issues: 'Issues',
    discussions: 'Discussions',
    license: 'Apache-2.0',
    wechat: 'WeChat',
    wechatId: 'ygf1140302783',
  },
};

export const GITHUB_URL = 'https://github.com/Syngnat/GoNavi';
export const GITHUB_ISSUES_URL = `${GITHUB_URL}/issues`;
export const GITHUB_DISCUSSIONS_URL = `${GITHUB_URL}/discussions`;
export const GITHUB_RELEASES_API = 'https://api.github.com/repos/Syngnat/GoNavi/releases';
