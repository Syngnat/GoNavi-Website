import { Link } from 'react-router-dom';
import type { HeroContent } from '../../content/site';

type HeroProps = {
  content: HeroContent;
};

export default function Hero({ content }: HeroProps) {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__panel">
        <p className="section-eyebrow">{content.eyebrow}</p>
        <h1 className="home-hero__title" id="home-hero-title">
          {content.title}
        </h1>
        <p className="home-hero__description">{content.description}</p>

        <div className="home-hero__cta-row">
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

        <ul className="home-hero__highlights" aria-label="Homepage highlights">
          {content.highlights.map((highlight) => (
            <li key={highlight} className="home-hero__highlight">
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
