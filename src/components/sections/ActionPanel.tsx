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

      <div className="home-action__cta-row">
        <Link className="home-cta home-cta--primary" to={content.primaryCta.href}>
          {content.primaryCta.label}
        </Link>
        <a
          className="home-cta home-cta--secondary"
          href={content.secondaryCta.href}
          rel="noreferrer"
          target="_blank"
        >
          {content.secondaryCta.label}
        </a>
      </div>
    </section>
  );
}
