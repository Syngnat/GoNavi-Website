import type { ScreenshotCard, SectionHeading } from '../../content/site';

type ScreenshotWallProps = {
  heading: SectionHeading;
  screenshots: ScreenshotCard[];
};

export default function ScreenshotWall({ heading, screenshots }: ScreenshotWallProps) {
  return (
    <section className="home-section home-section--split" aria-labelledby="screenshot-wall-title">
      <div className="home-section__heading">
        <p className="section-eyebrow">{heading.eyebrow}</p>
        <h2 className="section-title" id="screenshot-wall-title">
          {heading.title}
        </h2>
        <p className="section-copy">{heading.description}</p>
      </div>

      <div className="screenshot-wall">
        {screenshots.map((shot, index) => (
          <article key={shot.title} className={`screenshot-card screenshot-card--${index + 1}`}>
            <div className="screenshot-card__meta">
              <p className="screenshot-card__metric">{shot.metric}</p>
              <span className="screenshot-card__label">{shot.badge}</span>
            </div>

            <div className="screenshot-card__surface" aria-hidden="true">
              <div className="screenshot-card__surface-bar" />
              <div className="screenshot-card__surface-grid">
                <div className="screenshot-card__surface-main">
                  <span className="screenshot-card__surface-line screenshot-card__surface-line--wide" />
                  <span className="screenshot-card__surface-line" />
                  <span className="screenshot-card__surface-line screenshot-card__surface-line--accent" />
                </div>
                <div className="screenshot-card__surface-side">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            <div className="screenshot-card__copy">
              <h3 className="screenshot-card__title">{shot.title}</h3>
              <p className="screenshot-card__description">{shot.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
