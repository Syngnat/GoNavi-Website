import type { FeatureItem, SectionHeading } from '../../content/site';

type FeatureRailProps = {
  heading: SectionHeading;
  features: FeatureItem[];
};

export default function FeatureRail({ heading, features }: FeatureRailProps) {
  return (
    <section className="home-section home-section--split" aria-labelledby="feature-rail-title">
      <div className="home-section__heading">
        <p className="section-eyebrow">{heading.eyebrow}</p>
        <h2 className="section-title" id="feature-rail-title">
          {heading.title}
        </h2>
        <p className="section-copy">{heading.description}</p>
      </div>

      <div className="feature-rail">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card">
            <p className="feature-card__tag">{feature.tag}</p>
            <div className="feature-card__body">
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
