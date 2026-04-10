import { SiteLocale } from '../../lib/locale';

type FooterProps = {
  locale: SiteLocale;
};

export default function Footer({ locale }: FooterProps) {
  const copy = {
    zh: {
      summary: '面向开发者与团队的原生数据库工作流官网。',
      nav: '首页 / 下载 / 文档 / 更新日志 / 路线图',
    },
    en: {
      summary: 'Native database workflow website for developers and teams.',
      nav: 'Home / Download / Docs / Changelog / Roadmap',
    },
  }[locale];

  return (
    <footer className="site-footer">
      <div className="site-shell__inner site-footer__inner">
        <div className="site-footer__brand-block">
          <p className="site-footer__brand">GoNavi</p>
          <p className="site-footer__copy">{copy.summary}</p>
        </div>
        <p className="site-footer__meta">{copy.nav}</p>
      </div>
    </footer>
  );
}
