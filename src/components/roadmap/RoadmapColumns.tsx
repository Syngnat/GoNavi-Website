import { SiteLocale } from '../../lib/locale';

type RoadmapColumnsProps = {
  locale: SiteLocale;
};

const roadmapCopy = {
  zh: {
    sections: [
      {
        title: '进行中',
        items: ['官网首版结构成型', '下载页与更新日志接入发布源', '文档区双语基础内容'],
      },
      {
        title: '计划中',
        items: ['更细的数据库能力矩阵', '平台下载识别与版本提示', '更完整的文档导航与检索'],
      },
      {
        title: '社区入口',
        items: ['GitHub 问题反馈', '版本反馈入口', '贡献与赞助入口'],
      },
    ],
  },
  en: {
    sections: [
      {
        title: 'In Progress',
        items: ['First website release structure', 'Release-backed download and changelog pages', 'Bilingual documentation baseline'],
      },
      {
        title: 'Planned',
        items: ['A deeper database capability matrix', 'Platform-aware download guidance', 'Fuller docs navigation and search'],
      },
      {
        title: 'Community',
        items: ['GitHub Issues', 'Release feedback', 'Contribution and sponsorship entry points'],
      },
    ],
  },
} as const;

export default function RoadmapColumns({ locale }: RoadmapColumnsProps) {
  return (
    <div className="roadmap-columns">
      {roadmapCopy[locale].sections.map((section) => (
        <section className="roadmap-column" key={section.title}>
          <p className="section-eyebrow">{section.title}</p>
          <ul className="roadmap-column__list">
            {section.items.map((item) => (
              <li className="roadmap-column__item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
