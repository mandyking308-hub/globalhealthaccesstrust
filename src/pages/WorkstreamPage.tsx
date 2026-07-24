import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  ExternalLink,
  FileCheck2,
  HandHeart,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { getWorkstream } from "@/lib/workstreams";
import { NotFoundPage } from "./NotFoundPage";
import "@/styles/workstreams.css";

const SectionHeading = ({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
}) => (
  <div className="workstream-section-heading">
    <p className="workstream-eyebrow">{eyebrow}</p>
    <h2 id={id}>{title}</h2>
    {intro && <p className="workstream-section-intro">{intro}</p>}
  </div>
);

const CheckList = ({ items, columns = false }: { items: string[]; columns?: boolean }) => (
  <ul className={columns ? "workstream-check-list workstream-check-list--columns" : "workstream-check-list"}>
    {items.map((item) => (
      <li key={item}>
        <CheckCircle2 aria-hidden="true" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const WorkstreamPage = () => {
  const { slug } = useParams();
  const workstream = getWorkstream(slug);

  if (!workstream) return <NotFoundPage />;

  const sources = new Map(workstream.sources.map((source) => [source.id, source]));
  const projectLinks = {
    pledge: `/donate?workstream=${workstream.slug}#pledge-form`,
    contribute: `/volunteer-apply?workstream=${workstream.slug}`,
    enquire: `/contact?workstream=${workstream.slug}`,
  };

  return (
    <>
      <SEO
        title={workstream.title}
        description={workstream.summary}
        canonical={`/current-workstreams/${workstream.slug}`}
      />

      <div className="workstream-page min-h-screen bg-background">
        <div className="workstream-shell">
          <div className="mb-6">
            <Link to="/current-workstreams" className="workstream-back-link">
              <ArrowLeft aria-hidden="true" /> All current workstreams
            </Link>
          </div>

          <section className="workstream-hero">
            <div className="workstream-hero__content">
              <p className="workstream-hero__kicker">
                Workstream {workstream.number} · {workstream.region}
              </p>
              <h1 className="workstream-page-title">{workstream.title}</h1>
              <p className="workstream-hero__tagline">{workstream.tagline}</p>
              <p className="workstream-hero__summary">{workstream.summary}</p>
              <div className="workstream-actions">
                <Button asChild size="lg" className="rounded-none bg-white text-slate-950 hover:bg-white/90">
                  <Link to={projectLinks.pledge}>Pledge support</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-none border-white/55 bg-transparent text-white hover:bg-white hover:text-slate-950">
                  <Link to={projectLinks.contribute}>Apply to contribute</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-none border-white/55 bg-transparent text-white hover:bg-white hover:text-slate-950">
                  <Link to={projectLinks.enquire}>Ask about this project</Link>
                </Button>
              </div>
            </div>
            <div className="workstream-hero__image-wrap">
              <img src={workstream.image} alt={workstream.imageAlt} className="workstream-hero__image" loading="eager" />
            </div>
          </section>

          <section className="workstream-glance" aria-label="Project at a glance">
            {[
              { label: "Status", value: workstream.status, icon: CircleDot },
              { label: "Current stage", value: workstream.currentStage, icon: Target },
              { label: "Geographical scope", value: workstream.region, icon: MapPin },
              { label: "Project model", value: workstream.model, icon: FileCheck2 },
              { label: "Last reviewed", value: workstream.lastReviewed, icon: BarChart3 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="workstream-glance__item">
                <Icon aria-hidden="true" />
                <div>
                  <p>{label}</p>
                  <strong>{value}</strong>
                </div>
              </div>
            ))}
          </section>

          <nav className="workstream-page-nav" aria-label="On this project page">
            {[
              ["The need", "need"],
              ["GHAT's approach", "approach"],
              ["Delivery areas", "delivery"],
              ["Project plan", "plan"],
              ["Impact", "impact"],
              ["Participate", "participate"],
              ["Governance", "governance"],
              ["Sources", "sources"],
            ].map(([label, anchor]) => (
              <a key={anchor} href={`#${anchor}`}>{label}</a>
            ))}
          </nav>

          <section className="workstream-section" aria-labelledby="scale-heading">
            <SectionHeading
              eyebrow="The scale of the challenge"
              title="The wider need behind this work"
              id="scale-heading"
              intro="These independently sourced figures describe the wider public challenge. They are not presented as results achieved by GHAT."
            />
            <div className="workstream-stats">
              {workstream.stats.map((stat) => (
                <article key={`${stat.value}-${stat.label}`} className="workstream-stat">
                  <p className="workstream-stat__value">{stat.value}</p>
                  <h3>{stat.label}</h3>
                  <p>{stat.detail}</p>
                  <div className="workstream-stat__sources">
                    {stat.sourceIds.map((sourceId) => {
                      const source = sources.get(sourceId);
                      if (!source) return null;
                      return (
                        <a key={sourceId} href={source.url} target="_blank" rel="noreferrer">
                          {source.organisation} <ExternalLink aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="need" className="workstream-section workstream-section--soft scroll-mt-32">
            <SectionHeading eyebrow="Why this work matters" title="Understanding the real system problem" />
            <div className="workstream-reading-column">
              {workstream.context.map((section) => (
                <article key={section.title} className="workstream-context-block">
                  <h3>{section.title}</h3>
                  <div className="workstream-copy">
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets && <CheckList items={section.bullets} columns />}
                </article>
              ))}
            </div>
          </section>

          <section id="approach" className="workstream-section scroll-mt-32">
            <div className="workstream-two-up">
              <article className="workstream-panel workstream-panel--tint">
                <p className="workstream-eyebrow">Why GHAT is acting</p>
                <h2>Public benefit requires connected action</h2>
                <div className="workstream-copy">
                  {workstream.whyGhat.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="workstream-role">
                  <p>GHAT's role</p>
                  <strong>{workstream.role}</strong>
                </div>
              </article>

              <article className="workstream-panel">
                <p className="workstream-eyebrow">The project purpose</p>
                <h2>{workstream.purpose}</h2>
                <ol className="workstream-objectives">
                  {workstream.objectives.map((objective, index) => (
                    <li key={objective}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{objective}</p>
                    </li>
                  ))}
                </ol>
              </article>
            </div>
          </section>

          <section className="workstream-current-activity">
            <div>
              <p className="workstream-eyebrow">Current activity</p>
              <h2>What is happening now</h2>
            </div>
            <CheckList items={workstream.currentWork} columns />
          </section>

          <section id="delivery" className="workstream-section scroll-mt-32" aria-labelledby="delivery-heading">
            <SectionHeading
              eyebrow="How the work will operate"
              title="Project delivery areas"
              id="delivery-heading"
              intro="The full delivery framework is shown below. Each approved phase will use only the areas relevant to its setting, participants, evidence and available resources."
            />
            <div className="workstream-disclosures">
              {workstream.deliveryAreas.map((area, index) => (
                <details key={area.title} className="workstream-disclosure" open={index === 0}>
                  <summary>
                    <span className="workstream-disclosure__number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="workstream-disclosure__title">{area.title}</span>
                    <span className="workstream-disclosure__prompt">View detail</span>
                    <ChevronDown aria-hidden="true" />
                  </summary>
                  <div className="workstream-disclosure__content">
                    <div className="workstream-copy">
                      {area.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    {area.bullets && <CheckList items={area.bullets} columns />}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="plan" className="workstream-section workstream-section--soft scroll-mt-32" aria-labelledby="plan-heading">
            <SectionHeading
              eyebrow="The project plan"
              title="From listening to accountable completion"
              id="plan-heading"
              intro="The stage labels make clear what is active, what remains in development and what must happen before a new phase begins."
            />
            <ol className="workstream-plan">
              {workstream.plan.map((step, index) => (
                <li key={`${step.stage}-${step.title}`} className={step.current ? "is-current" : ""}>
                  <span className="workstream-plan__number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="workstream-plan__stage">
                    <p>{step.stage}</p>
                    {step.current && <span><CircleDot aria-hidden="true" /> Active now</span>}
                  </div>
                  <div className="workstream-plan__copy">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="workstream-section">
            <div className="workstream-two-up">
              <article className="workstream-panel">
                <div className="workstream-panel__title">
                  <FileCheck2 aria-hidden="true" />
                  <h2>What the project will produce</h2>
                </div>
                <CheckList items={workstream.outputs} />
              </article>
              <article className="workstream-panel workstream-panel--tint">
                <div className="workstream-panel__title">
                  <Target aria-hidden="true" />
                  <h2>Current priorities</h2>
                </div>
                <CheckList items={workstream.priorities} />
              </article>
            </div>
          </section>

          <section id="impact" className="workstream-section workstream-impact scroll-mt-32" aria-labelledby="measure-heading">
            <SectionHeading
              eyebrow="How impact will be measured"
              title="Evidence before claims"
              id="measure-heading"
              intro="Measures will be selected according to the setting and approved phase. GHAT will not publish a success percentage until a defined baseline, intervention, timeframe and credible evidence exist."
            />
            <div className="workstream-impact__grid">
              {workstream.measures.map((group) => (
                <article key={group.title}>
                  <h3>{group.title}</h3>
                  <CheckList items={group.items} />
                </article>
              ))}
            </div>
          </section>

          <section className="workstream-section">
            <div className="workstream-significance">
              <div>
                <p className="workstream-eyebrow">Why this matters beyond one project</p>
                <h2>Wider significance</h2>
              </div>
              <div className="workstream-copy workstream-significance__copy">
                {workstream.globalSignificance.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </section>

          <section id="participate" className="workstream-section workstream-section--soft scroll-mt-32" aria-labelledby="participation-heading">
            <SectionHeading
              eyebrow="Support this workstream"
              title="Begin through the right route"
              id="participation-heading"
              intro="A pledge or expression of interest is reviewed against a defined need. It does not automatically create acceptance, appointment, access to beneficiaries or a contractual relationship."
            />
            <div className="workstream-participation">
              {workstream.participation.map((route, index) => {
                const icons = [HandHeart, Users, MessageCircle];
                const Icon = icons[index] ?? MessageCircle;
                return (
                  <article key={route.title}>
                    <Icon aria-hidden="true" />
                    <h3>{route.title}</h3>
                    <p>{route.description}</p>
                    <CheckList items={route.items} />
                    <Button asChild className="mt-auto rounded-none">
                      <Link to={route.href}>{route.action} <ArrowRight aria-hidden="true" /></Link>
                    </Button>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="governance" className="workstream-section scroll-mt-32">
            <div className="workstream-two-up">
              <article className="workstream-panel workstream-panel--tint">
                <div className="workstream-panel__title">
                  <ShieldCheck aria-hidden="true" />
                  <h2>Governance and safeguards</h2>
                </div>
                <CheckList items={workstream.safeguards} />
              </article>
              <article className="workstream-panel">
                <div className="workstream-panel__title">
                  <BarChart3 aria-hidden="true" />
                  <h2>Evidence and progress</h2>
                </div>
                <p className="workstream-muted-copy">
                  This section will operate as a controlled project record—not a general blog. Updates will be factual, dated and connected to an approved phase.
                </p>
                <CheckList items={workstream.evidence} />
              </article>
            </div>
          </section>

          <section className="workstream-related">
            <div>
              <p className="workstream-eyebrow">Related experience</p>
              <h2>The experience on which the Trust builds</h2>
              <Button asChild variant="outline" className="rounded-none">
                <Link to="/our-history">Explore our history</Link>
              </Button>
            </div>
            <div className="workstream-copy">
              {workstream.relatedExperience.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section id="sources" className="workstream-section scroll-mt-32" aria-labelledby="sources-heading">
            <details className="workstream-sources">
              <summary>
                <div>
                  <p className="workstream-eyebrow">Evidence base</p>
                  <h2 id="sources-heading">Sources used on this page</h2>
                  <p>Open the evidence list to review the organisations and publications supporting the wider-context figures.</p>
                </div>
                <ChevronDown aria-hidden="true" />
              </summary>
              <ol>
                {workstream.sources.map((source, index) => (
                  <li key={source.id}>
                    <span>Source {index + 1}</span>
                    <strong>{source.organisation}</strong>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.title} <ExternalLink aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
              <p className="workstream-sources__note">
                Source figures describe wider conditions and may be revised by the publishing organisation. Project outcomes will be reported separately when GHAT has suitable evidence.
              </p>
            </details>
          </section>

          <section className="workstream-final-cta">
            <div>
              <p className="workstream-eyebrow">Support stronger systems</p>
              <h2>Turn interest into a responsible next step</h2>
              <p>
                Pledge a useful resource, register relevant capability or begin a project-specific conversation. Every proposed contribution remains subject to review and formal acceptance.
              </p>
            </div>
            <div className="workstream-actions">
              <Button asChild size="lg" className="rounded-none bg-white text-slate-950 hover:bg-white/90">
                <Link to={projectLinks.pledge}>Pledge support</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-white/55 bg-transparent text-white hover:bg-white hover:text-slate-950">
                <Link to={projectLinks.enquire}>Ask about the project</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
