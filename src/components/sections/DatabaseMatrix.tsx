import type { DatabaseMatrixContent } from '../../content/site';

type DatabaseMatrixProps = {
  content: DatabaseMatrixContent;
};

export default function DatabaseMatrix({ content }: DatabaseMatrixProps) {
  return (
    <section className="home-section home-section--split" aria-labelledby="database-matrix-title">
      <div className="home-section__heading">
        <p className="section-eyebrow">{content.eyebrow}</p>
        <h2 className="section-title" id="database-matrix-title">
          {content.title}
        </h2>
        <p className="section-copy">{content.description}</p>
      </div>

      <div className="database-matrix">
        {content.rows.map((row) => (
          <article key={row.name} className="database-matrix__row">
            <div className="database-matrix__name">
              <h3>{row.name}</h3>
              <span>{row.status}</span>
            </div>
            <p className="database-matrix__detail">{row.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
