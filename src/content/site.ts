import { SiteLocale } from '../lib/locale';

export type CtaLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  asideLabel: string;
  asideKicker: string;
  asideDescription: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  highlights: string[];
};

export type FeatureItem = {
  title: string;
  description: string;
  tag: string;
};

export type SectionHeading = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ScreenshotCard = {
  title: string;
  description: string;
  badge: string;
  metric: string;
};

export type DatabaseRow = {
  name: string;
  status: string;
  detail: string;
};

export type DatabaseMatrixContent = SectionHeading & {
  rows: DatabaseRow[];
};

export type ActionPanelContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  primaryMeta: string;
  secondaryMeta: string;
  note: string;
};

export type HomeContent = {
  hero: HeroContent;
  featureRail: SectionHeading;
  features: FeatureItem[];
  screenshotWall: SectionHeading;
  screenshots: ScreenshotCard[];
  databaseMatrix: DatabaseMatrixContent;
  actionPanel: ActionPanelContent;
};

export const siteContent: Record<SiteLocale, HomeContent> = {
  zh: {
    hero: {
      eyebrow: 'GoNavi / 原生数据库工作流',
      title: '为多数据库工作流而生的原生桌面工作台',
      description:
        '以轻稳快的桌面体验串起 PostgreSQL、MySQL、SQLite、SQL Server 与 MongoDB 等常见数据源，让开发者和团队都能在同一处完成连接、查询、比对与交付。',
      asideLabel: '首页亮点',
      asideKicker: '编辑型产品官网',
      asideDescription: '把发布、文档和产品上下文收在同一张深色工作面里，而不是散落在多个彼此脱节的工具页上。',
      primaryCta: {
        label: '立即下载',
        href: '/zh/download',
      },
      secondaryCta: {
        label: 'GitHub',
        href: 'https://github.com/Syngnat/GoNavi',
      },
      highlights: ['原生桌面', '多数据库', '轻稳快', '开发者与团队兼顾'],
    },
    featureRail: {
      eyebrow: '工作流主叙事',
      title: '把高频数据库工作放到同一条直线里',
      description:
        'GoNavi 强调稳定、连贯和低摩擦，不把工作流切碎成太多页面，而是让开发者在单一控制面里完成常见任务。',
    },
    features: [
      {
        tag: '原生',
        title: '原生桌面响应',
        description: '以本地应用的稳定性承载高频查询、批量切换和长时间工作流。',
      },
      {
        tag: '多库',
        title: '多数据库并行',
        description: '把常见数据库放到同一套控制界面里，减少上下文切换成本。',
      },
      {
        tag: '流程',
        title: '查询到交付一条线',
        description: '历史、收藏、结果比对和复制分享保持连贯，不打断节奏。',
      },
      {
        tag: '协作',
        title: '个人与团队都顺手',
        description: '适合开发者日常排查，也适合协作时统一工作方式与产出格式。',
      },
    ],
    screenshotWall: {
      eyebrow: '产品切面',
      title: '把产品状态做成可感知的面板',
      description:
        '抽象化的界面片段保留产品感，不依赖真实截图也能表达连接、查询和审阅三类核心场景。',
    },
    screenshots: [
      {
        badge: '工作台',
        title: '连接池与标签页同屏',
        description: '把活跃连接、查询历史和收藏视图收拢在一个稳定的工作面板里。',
        metric: '3 个活跃数据库',
      },
      {
        badge: '查询实验',
        title: '轻量查询编辑器',
        description: '支持快速试跑、结果预览和复制输出，适合开发者临时排障。',
        metric: '实时结果表格',
      },
      {
        badge: '审阅',
        title: '比对与审阅面板',
        description: '用更清晰的差异视图检查表结构和数据结果，减少沟通来回。',
        metric: '差异优先审阅',
      },
    ],
    databaseMatrix: {
      eyebrow: '数据库矩阵',
      title: '常见数据库的统一入口',
      description:
        'GoNavi 关注的是跨数据库工作的稳定手感，而不是把复杂性藏起来。连接、编辑、查询和检查在同一套界面里完成。',
      rows: [
        { name: 'PostgreSQL', status: '主力支持', detail: '适合主业务库、结构浏览和高频查询。' },
        { name: 'MySQL', status: '主力支持', detail: '覆盖常见应用栈，便于日常调试与维护。' },
        { name: 'SQLite', status: '已支持', detail: '适合本地文件库、原型验证和轻量检查。' },
        { name: 'SQL Server', status: '已支持', detail: '面向企业系统和既有迁移场景。' },
        { name: 'MongoDB', status: '已支持', detail: '适合文档型数据浏览和结果审阅。' },
      ],
    },
    actionPanel: {
      eyebrow: '下载 / 文档 / 社区',
      title: '把数据库工作压缩成更短的路径',
      description:
        '下载桌面端开始试用，或者直接查看仓库了解实现细节。首页只做入口，不承诺下载/文档页之外的额外流程。',
      primaryCta: {
        label: '立即下载',
        href: '/zh/download',
      },
      secondaryCta: {
        label: 'GitHub',
        href: 'https://github.com/Syngnat/GoNavi',
      },
      primaryMeta: '桌面版本目录',
      secondaryMeta: '仓库、问题反馈与源码入口',
      note: '面向开发者日常排障，也适合团队统一使用。',
    },
  },
  en: {
    hero: {
      eyebrow: 'GoNavi / Native Database Workflow',
      title: 'A native desktop workstation for multi-database workflows',
      description:
        'GoNavi brings a light, steady, and fast desktop experience to PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and more so developers and teams can connect, query, compare, and ship from one place.',
      asideLabel: 'Homepage highlights',
      asideKicker: 'Editorial product shell',
      asideDescription:
        'Keep releases, docs, and product context on a single dark surface instead of scattering them across disconnected utility pages.',
      primaryCta: {
        label: 'Download',
        href: '/en/download',
      },
      secondaryCta: {
        label: 'GitHub',
        href: 'https://github.com/Syngnat/GoNavi',
      },
      highlights: ['Native desktop', 'Multi-database', 'Light, steady, fast', 'Built for developers and teams'],
    },
    featureRail: {
      eyebrow: 'Workflow narrative',
      title: 'Put high-frequency database work on one clean line',
      description:
        'GoNavi keeps the workflow stable and low-friction so developers can handle common tasks from a single control surface instead of bouncing between pages.',
    },
    features: [
      {
        tag: 'Native',
        title: 'Desktop-first responsiveness',
        description: 'Keep high-frequency queries, switching, and long sessions stable on the local machine.',
      },
      {
        tag: 'Multi-DB',
        title: 'Run multiple databases in parallel',
        description: 'Bring familiar data sources into one control surface and cut context switching.',
      },
      {
        tag: 'Flow',
        title: 'A continuous path from query to delivery',
        description: 'History, favorites, result comparison, and export stay connected instead of fragmented.',
      },
      {
        tag: 'Team',
        title: 'Useful for individuals and teams',
        description: 'Good for daily debugging, and equally good for aligning collaboration and output.',
      },
    ],
    screenshotWall: {
      eyebrow: 'Product slices',
      title: 'Make product state tangible through panels',
      description:
        'The abstracted UI fragments keep the product feel without relying on real screenshots, while still expressing connect, query, and review flows.',
    },
    screenshots: [
      {
        badge: 'Workspace',
        title: 'Connections and tabs in one view',
        description: 'Surface active connections, query history, and pinned items in a stable workspace.',
        metric: '3 active databases',
      },
      {
        badge: 'Query Lab',
        title: 'A lightweight query editor',
        description: 'Run quick checks, preview results, and copy output without breaking the flow.',
        metric: 'Live result grid',
      },
      {
        badge: 'Review',
        title: 'A compare-and-review panel',
        description: 'Use a clearer diff view for schema and data checks to reduce back-and-forth.',
        metric: 'Diff-first review',
      },
    ],
    databaseMatrix: {
      eyebrow: 'Database matrix',
      title: 'One entry point for common databases',
      description:
        'GoNavi is about a reliable cross-database working feel, not hiding complexity. Connect, edit, query, and inspect in one interface.',
      rows: [
        { name: 'PostgreSQL', status: 'Primary', detail: 'Good for core business data, structure browsing, and frequent queries.' },
        { name: 'MySQL', status: 'Primary', detail: 'Covers common app stacks for everyday debugging and maintenance.' },
        { name: 'SQLite', status: 'Supported', detail: 'Useful for local files, prototypes, and quick checks.' },
        { name: 'SQL Server', status: 'Supported', detail: 'Fits enterprise systems and migration scenarios.' },
        { name: 'MongoDB', status: 'Supported', detail: 'Useful for document browsing and result review.' },
      ],
    },
    actionPanel: {
      eyebrow: 'Download / Docs / Community',
      title: 'Compress database work into a shorter path',
      description:
        'Download the desktop app to try it, or open the repository to inspect the implementation. The homepage stays focused on entry points only.',
      primaryCta: {
        label: 'Download',
        href: '/en/download',
      },
      secondaryCta: {
        label: 'GitHub',
        href: 'https://github.com/Syngnat/GoNavi',
      },
      primaryMeta: 'Desktop release directory',
      secondaryMeta: 'Repository, issues, and source',
      note: 'Built for daily developer debugging and team-wide consistency.',
    },
  },
};

export function getSiteContent(locale: SiteLocale): HomeContent {
  return siteContent[locale];
}
