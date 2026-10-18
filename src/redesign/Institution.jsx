import { company } from "@/content/company";
import "./institution.css";

export function Institution() {
  return (
    <section
      className="institution"
      id="empresa"
      aria-labelledby="institution-title"
    >
      <div className="institution-shell">
        <div className="institution-intro">
          <div className="institution-manifesto">
            <p className="institution-kicker">A FinxiIT</p>
            <h2 id="institution-title">{company.positioning}</h2>
            <p className="institution-about">{company.about}</p>
          </div>
          <div className="institution-purpose">
            <article className="institution-purpose-item">
              <h3>Missão</h3>
              <p>{company.mission}</p>
            </article>
            <article className="institution-purpose-item">
              <h3>Visão</h3>
              <p>{company.vision}</p>
            </article>
          </div>
        </div>
        <div className="institution-values">
          <div className="institution-values-heading">
            <h3>O que orienta nossas escolhas</h3>
            <span aria-hidden="true" />
          </div>
          <div className="institution-value-grid">
            {company.values.map((value) => (
              <article className="institution-value" key={value.title}>
                <h4>{value.title}</h4>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Institution;
