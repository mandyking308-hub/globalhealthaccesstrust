import { Link } from "react-router-dom";
import { IMPACT_STATS, PROGRAM_AREAS } from "@/lib/constants";
import { SEO } from "@/components/SEO";
import { organizationSchema } from "@/lib/seo";
import heroImage from "@/assets/hero-territorial-overview.jpg";
import clinicImage from "@/assets/delivery-healthcare-clinic.jpg";
import systemsImage from "@/assets/delivery-landscape-systems.jpg";
import ruralImage from "@/assets/delivery-rural-landscape.jpg";

const operatingModel = [
  {
    title: "Structured Funding",
    description: "Capital is allocated to clearly defined projects with agreed scope, geography, and objectives prior to deployment.",
  },
  {
    title: "Project Oversight",
    description: "Each initiative is tracked against milestones, with delivery monitored through a structured reporting framework.",
  },
  {
    title: "Donor Visibility",
    description: "Donors have access to a secure environment where progress, updates, and documentation are made available.",
  },
  {
    title: "Accountability & Control",
    description: "All activity is documented, auditable, and aligned with legal and governance requirements.",
  },
];

const operationalFramework = [
  { title: "Capital Allocation", description: "Funding is assigned to clearly defined initiatives with agreed scope and objectives." },
  { title: "Project Structuring", description: "Delivery partners, geography, and operational frameworks are established." },
  { title: "Monitoring & Reporting", description: "Progress is tracked against milestones with structured reporting." },
  { title: "Outcome Verification", description: "Results are assessed to ensure accountability and measurable impact." },
];

const engagementSteps = [
  { title: "Initial Enquiry", description: "Engagement begins through a direct enquiry to the Trust." },
  { title: "Review & Alignment", description: "Each enquiry is assessed to ensure alignment with the Trust's mandate and governance framework." },
  { title: "Structured Engagement", description: "Funding relationships are formalised with defined scope, objectives, and reporting expectations." },
  { title: "Project Deployment", description: "Capital is deployed into clearly defined initiatives with ongoing monitoring and accountability." },
];

const deliveryAreas = [
  { title: "Primary Healthcare", image: clinicImage, alt: "Primary healthcare clinic interior with medical equipment in a rural setting" },
  { title: "Systems Infrastructure", image: systemsImage, alt: "Aerial view of river delta and agricultural systems with settlements" },
  { title: "Rural Access", image: ruralImage, alt: "Rural landscape with scattered settlements and green hillside terrain" },
];

export const HomePage = () => {
  return (
    <>
      <SEO
        title="Global Health Access Trust"
        description="A private charitable trust directing capital into healthcare access, system infrastructure, and capacity building where it is most critically needed."
        canonical="/"
        schema={organizationSchema}
      />

      <div className="ghat-home">
        <section className="ghat-hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="ghat-hero__shade" aria-hidden="true" />
          <div className="ghat-shell ghat-hero__content">
            <p className="ghat-eyebrow">Global Health Access Trust</p>
            <h1>Access to health is justice.</h1>
            <p className="ghat-hero__intro">
              A private charitable trust directing capital into healthcare access, system infrastructure, and capacity where it is most critically needed.
            </p>
            <p className="ghat-hero__support">
              A controlled platform for deploying capital into healthcare systems with oversight, accountability, and measurable impact.
            </p>
            <div className="ghat-action-row">
              <Link className="ghat-button ghat-button--lime" to="/auth">Donor Portal</Link>
              <Link className="ghat-text-link ghat-text-link--light" to="/about-the-trust">About the Trust <span aria-hidden="true">↘</span></Link>
            </div>
          </div>
          <div className="ghat-shell ghat-hero__foot">
            <span>Capital</span><span>Delivery</span><span>Oversight</span><span>Measurable impact</span>
          </div>
        </section>

        <section className="ghat-section ghat-section--ivory">
          <div className="ghat-shell ghat-split-intro">
            <div>
              <p className="ghat-eyebrow ghat-eyebrow--dark">01 · Purpose</p>
              <h2>Capital directed with precision, dignity and long-term intent.</h2>
            </div>
            <div className="ghat-intro-copy">
              <p className="ghat-lead">The Trust deploys capital into lawful, ethical interventions that expand access to healthcare for underserved populations.</p>
              <p>It operates through structured partnerships with health systems, academic institutions, and recognised delivery organisations across twelve countries.</p>
            </div>
          </div>

          <div className="ghat-shell ghat-feature-grid">
            <article>
              <span>01</span><h3>Scope Definition</h3><p>Region, focus area, and intended outcomes are agreed in advance.</p>
            </article>
            <article>
              <span>02</span><h3>Progress Reporting</h3><p>Milestones, field documentation, and updates are provided through a secure donor portal.</p>
            </article>
            <article>
              <span>03</span><h3>Financial Transparency</h3><p>All fund allocations are documented and independently accounted for.</p>
            </article>
          </div>
          <div className="ghat-shell ghat-section-action">
            <Link className="ghat-text-link" to="/commission-projects">Commissioned Projects <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="ghat-section ghat-section--white">
          <div className="ghat-shell ghat-heading-row">
            <div><p className="ghat-eyebrow ghat-eyebrow--dark">02 · Operating model</p><h2>How the Trust operates</h2></div>
            <p>The Trust operates through a structured model that defines how capital, delivery, and oversight are aligned within a controlled environment.</p>
          </div>

          <div className="ghat-shell ghat-operating-grid">
            <div className="ghat-system-visual" aria-label="Diagram showing funding, partners, reporting and outcomes around GHAT">
              <div className="ghat-system-visual__grid" aria-hidden="true" />
              <div className="ghat-system-visual__ring ghat-system-visual__ring--outer" aria-hidden="true" />
              <div className="ghat-system-visual__ring ghat-system-visual__ring--inner" aria-hidden="true" />
              <div className="ghat-system-visual__core">GHAT</div>
              <span className="ghat-system-label ghat-system-label--a">Funding</span>
              <span className="ghat-system-label ghat-system-label--b">Partners</span>
              <span className="ghat-system-label ghat-system-label--c">Reporting</span>
              <span className="ghat-system-label ghat-system-label--d">Outcomes</span>
            </div>
            <div className="ghat-operating-list">
              {operatingModel.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </article>
              ))}
              <p className="ghat-note">The platform supports structured project management, reporting, and administrative oversight through a secure internal system.</p>
            </div>
          </div>
        </section>

        <section className="ghat-section ghat-section--green">
          <div className="ghat-shell">
            <div className="ghat-heading-row">
              <div><p className="ghat-eyebrow">03 · Operational framework</p><h2>From capital allocation to outcome verification.</h2></div>
              <p>The operational framework outlines how initiatives are executed in practice, from capital allocation through to outcome verification.</p>
            </div>
            <ol className="ghat-framework-grid">
              {operationalFramework.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ghat-section ghat-section--ivory">
          <div className="ghat-shell ghat-heading-row">
            <div><p className="ghat-eyebrow ghat-eyebrow--dark">04 · Delivery</p><h2>Built for complex environments.</h2></div>
            <p>Delivery is executed through established, vetted partners operating in complex and resource-constrained environments.</p>
          </div>
          <div className="ghat-shell ghat-delivery-grid">
            {deliveryAreas.map((area, index) => (
              <article key={area.title} className={index === 0 ? "ghat-delivery-card ghat-delivery-card--featured" : "ghat-delivery-card"}>
                <img src={area.image} alt={area.alt} loading={index === 0 ? "eager" : "lazy"} />
                <div><span>{String(index + 1).padStart(2, "0")}</span><h3>{area.title}</h3></div>
              </article>
            ))}
          </div>
        </section>

        <section className="ghat-section ghat-section--white">
          <div className="ghat-shell ghat-governance-grid">
            <div>
              <p className="ghat-eyebrow ghat-eyebrow--dark">05 · Governance</p>
              <h2>Independent oversight. Institutional accountability.</h2>
              <p className="ghat-lead">The Trust is governed by an independent Board with expertise across healthcare, law, public policy, and institutional governance.</p>
              <p>All activities are conducted in accordance with the laws of England and Wales and subject to independent audit.</p>
              <Link className="ghat-button ghat-button--dark" to="/governance-legal-framework">Governance framework</Link>
            </div>
            <div className="ghat-standards-list">
              {IMPACT_STATS.map((stat, index) => (
                <article key={stat.label}>
                  <span>{index === 0 ? "Standards" : index === 1 ? "Structure" : "Mandate"}</span>
                  <strong>{stat.number}</strong>
                  <div><h3>{stat.label}</h3><p>{stat.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ghat-section ghat-section--charcoal">
          <div className="ghat-shell ghat-heading-row">
            <div><p className="ghat-eyebrow">06 · Funding mandate</p><h2>Defined areas of charitable intervention.</h2></div>
            <p>All funding is directed exclusively toward defined areas of charitable intervention, aligned with long-term system impact.</p>
          </div>
          <div className="ghat-shell ghat-mandate-list">
            {PROGRAM_AREAS.slice(0, 5).map((area, index) => (
              <article key={area.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
          <div className="ghat-shell ghat-section-action">
            <Link className="ghat-text-link ghat-text-link--light" to="/what-we-do">Full Mandate <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="ghat-section ghat-section--ivory">
          <div className="ghat-shell ghat-engagement-grid">
            <div>
              <p className="ghat-eyebrow ghat-eyebrow--dark">07 · Engagement</p>
              <h2>A structured and selective process.</h2>
              <p className="ghat-lead">Engagement with the Trust is conducted through a structured and selective process.</p>
              <p>Relationships are established with individuals, institutions, and partners aligned with the Trust's mandate and governance framework.</p>
              <p>This approach ensures capital is deployed with precision, oversight, and long-term impact.</p>
            </div>
            <ol className="ghat-engagement-steps">
              {engagementSteps.map((step, index) => (
                <li key={step.title}>
                  <span>Step {index + 1}</span><h3>{step.title}</h3><p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="ghat-shell ghat-engagement-cta">
            <div><p className="ghat-eyebrow ghat-eyebrow--dark">Initiate engagement</p><h2>Begin a conversation with the Trust.</h2></div>
            <Link className="ghat-button ghat-button--dark" to="/contact">Contact the Trust</Link>
          </div>
        </section>
      </div>
    </>
  );
};
