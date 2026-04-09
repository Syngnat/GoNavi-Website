import type { ScreenshotCard, SectionHeading } from '../../content/site';

type ScreenshotWallProps = {
  heading: SectionHeading;
  screenshots: ScreenshotCard[];
};

export default function ScreenshotWall({ heading, screenshots }: ScreenshotWallProps) {
  return (
    <section className="home-section" aria-labelledby="screenshot-wall-title">
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
            <div className="screenshot-card__chrome" aria-hidden="true">
              <span className="screenshot-card__dot" />
              <span className="screenshot-card__dot" />
              <span className="screenshot-card__dot" />
              <span className="screenshot-card__label">{shot.badge}</span>
            </div>

            <div className="screenshot-card__body">
              <div className="screenshot-card__surface">
                <div className="screenshot-card__surface-header">
                  <div>
                    <p className="screenshot-card__metric">{shot.metric}</p>
                    <h3 className="screenshot-card__title">{shot.title}</h3>
                  </div>
                  <span className="screenshot-card__chip">{shot.badge}</span>
                </div>

                <div className="screenshot-card__grid" aria-hidden="true">
                  <div className="screenshot-card__grid-main">
                    <div className="screenshot-card__toolbar">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="screenshot-card__editor">
                      <div className="screenshot-card__line screenshot-card__line--wide" />
                      <div className="screenshot-card__line" />
                      <div className="screenshot-card__line screenshot-card__line--accent" />
                      <div className="screenshot-card__line" />
                    </div>
                  </div>
                  <div className="screenshot-card__grid-aside">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <p className="screenshot-card__description">{shot.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
