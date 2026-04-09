import connectionsEn from './en/connections.md?raw';
import dataSourcesEn from './en/data-sources.md?raw';
import faqEn from './en/faq.md?raw';
import installEn from './en/install.md?raw';
import quickStartEn from './en/quick-start.md?raw';
import connectionsZh from './zh/connections.md?raw';
import dataSourcesZh from './zh/data-sources.md?raw';
import faqZh from './zh/faq.md?raw';
import installZh from './zh/install.md?raw';
import quickStartZh from './zh/quick-start.md?raw';
import { SiteLocale } from '../../lib/locale';

export type DocEntry = {
  slug: string;
  title: string;
  summary: string;
  body: string;
};

const docs: Record<SiteLocale, DocEntry[]> = {
  zh: [
    {
      slug: 'quick-start',
      title: '快速开始',
      summary: '用最短路径完成下载安装、连接创建和首次查询。',
      body: quickStartZh,
    },
    {
      slug: 'install',
      title: '安装与更新',
      summary: '了解不同平台的安装方式、更新策略和预发布说明。',
      body: installZh,
    },
    {
      slug: 'connections',
      title: '连接配置',
      summary: '统一管理 URI、SSH、代理和认证参数。',
      body: connectionsZh,
    },
    {
      slug: 'data-sources',
      title: '数据源支持',
      summary: '查看当前支持的数据源范围与典型使用场景。',
      body: dataSourcesZh,
    },
    {
      slug: 'faq',
      title: '常见问题',
      summary: '覆盖安装、连接、驱动和排查中的高频问题。',
      body: faqZh,
    },
  ],
  en: [
    {
      slug: 'quick-start',
      title: 'Quick Start',
      summary: 'Get from install to your first query with the shortest path.',
      body: quickStartEn,
    },
    {
      slug: 'install',
      title: 'Install & Updates',
      summary: 'Review platform installation, update behavior, and prerelease notes.',
      body: installEn,
    },
    {
      slug: 'connections',
      title: 'Connection Setup',
      summary: 'Manage URI, SSH, proxy, and authentication in one workflow.',
      body: connectionsEn,
    },
    {
      slug: 'data-sources',
      title: 'Supported Data Sources',
      summary: 'See what GoNavi supports today and where each source fits best.',
      body: dataSourcesEn,
    },
    {
      slug: 'faq',
      title: 'FAQ',
      summary: 'Handle common questions around install, connectivity, drivers, and debugging.',
      body: faqEn,
    },
  ],
};

export function getDocsForLocale(locale: SiteLocale): DocEntry[] {
  return docs[locale];
}

export function getDocBySlug(locale: SiteLocale, slug: string): DocEntry | undefined {
  return docs[locale].find((doc) => doc.slug === slug);
}

export function getDefaultDoc(locale: SiteLocale): DocEntry {
  return docs[locale][0];
}
