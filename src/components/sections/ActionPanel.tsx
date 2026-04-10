import { Link } from 'react-router-dom';
import type { ActionPanelContent } from '../../content/site';

type ActionPanelProps = {
  content: ActionPanelContent;
};

export default function ActionPanel({ content }: ActionPanelProps) {
  return (
    <section className="home-action" aria-labelledby="action-panel-title">
      <div className="home-action__copy">
        <p className="section-eyebrow">{content.eyebrow}</p>
        <h2 className="home-action__title" id="action-panel-title">
          {content.title}
        </h2>
        <p className="home-action__description">{content.description}</p>
        <p className="home-action__note">{content.note}</p>
      </div>

      <div className="home-action__rail">
        <Link aria-label={content.primaryCta.label} className="home-action__link" to={content.primaryCta.href}>
          <span className="home-action__link-label">{content.primaryCta.label}</span>
          <span aria-hidden="true" className="home-action__link-meta">
            {content.primaryMeta}
          </span>
        </Link>
        <a
          aria-label={content.secondaryCta.label}
          className="home-action__link"
          href={content.secondaryCta.href}
          rel="noreferrer"
          target="_blank"
        >
          <span className="home-action__link-label">{content.secondaryCta.label}</span>
          <span aria-hidden="true" className="home-action__link-meta">
            {content.secondaryMeta}
          </span>
        </a>
      </div>
    </section>
  );
}
