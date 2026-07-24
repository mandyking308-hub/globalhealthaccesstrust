import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
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
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";
import { getWorkstream } from "@/lib/workstreams";
import { NotFoundPage } from "./NotFoundPage";

export const WorkstreamPage = () => {
  const { slug } = useParams();
  const workstream = getWorkstream(slug);

  if (!workstream) return <NotFoundPage />;

  const sources = new Map(workstream.sources.map((source) => [source.id, source]));

  return (
    <>
      <SEO
        title={workstream.title}
        description={workstream.summary}
        canonical={`/current-workstreams/${workstream.slug}`}
      />

      <ContentLayout className="max-w-none">
        <div className="mb-6">
          <Link
            to="/current-workstreams"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary no-underline hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All current workstreams
          </Link>
        </div>

        <section className="relative min-h-[65vh] overflow-hidden bg-slate-950 text-white">
          <img
            src={workstream.image}
            alt={workstream.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/72 to-slate-950/20" aria-hidden="true" />
          <div className="relative flex min-h-[65vh] items-end px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div className="max-w-4xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.27em] text-white/75">
                Workstream {workstream.number} · {workstream.region}
              </p>
              <h1 className="mb-6 max-w-4xl font-serif text-4xl font-bold leading-[1.03] text-white sm:text-5xl lg:text-6xl">
                {workstream.title}
              </h1>
              <p className="mb-7 max-w-3xl text-xl font-medium leading-relaxed text-white sm:text-2xl">
                {workstream.tagline}
              </p>
              <p className="mb-9 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">{workstream.summary}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-none bg-white text-slate-950 hover:bg-white/90">
                  <Link to={`/donate?workstream=${workstream.slug}#pledge-form`}>Pledge support</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-none border-white/60 bg-transparent text-white hover:bg-white hover:text-slate-950">
                  <Link to={`/volunteer-apply?workstream=${workstream.slug}`}>Apply to contribute</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-none border-white/60 bg-transparent text-white hover:bg-white hover:text-slate-950">
                  <Link to={`/contact?workstream=${workstream.slug}`}>Ask about this project</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid border-x border-b border-foreground/15 bg-background sm:grid-cols-2 lg:grid-cols-5" aria-label="Project at a glance">
          {[
            { label: "Status", value: workstream.status, icon: CircleDot },
            { label: "Current stage", value: workstream.currentStage, icon: Target },
            { label: "Geographical scope", value: workstream.region, icon: MapPin },
            { label: "Project model", value: workstream.model, icon: FileCheck2 },
            { label: "Last reviewed", value: workstream.lastReviewed, icon: BarChart3 },
          ].map(({ label, value, icon: Icon }, index) => (
            <div key={label} className={`p-6 ${index < 4 ? "border-b border-foreground/10 sm:border-r lg:border-b-0" : ""}`}>
              <Icon className="mb-4 h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
              <p className="m-0 text-sm font-semibold leading-relaxed text-foreground">{value}</p>
            </div>
          ))}
        </section>

        <section className="py-14 sm:py-16" aria-labelledby="scale-heading">
          <div className="mb-9 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">The scale of the challenge</p>
            <h2 id="scale-heading" className="mb-4 font-serif text-3xl font-bold sm:text-4xl">
              The wider need behind this work
            </h2>
            <p className="text-muted-foreground">
              These figures describe the wider public challenge. They are independently sourced and are not presented as results achieved by GHAT.
            </p>
          </div>

          <div className="grid gap-0 border border-foreground/15 sm:grid-cols-2 xl:grid-cols-4">
            {workstream.stats.map((stat, index) => (
              <article key={`${stat.value}-${stat.label}`} className={`p-6 sm:p-8 ${index < workstream.stats.length - 1 ? "border-b border-foreground/12 sm:border-r xl:border-b-0" : ""}`}>
                <p className="mb-3 font-serif text-4xl font-bold leading-none text-primary sm:text-5xl">{stat.value}</p>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-foreground">{stat.label}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{stat.detail}</p>
                <div className="flex flex-wrap gap-2">
                  {stat.sourceIds.map((sourceId) => {
                    const source = sources.get(sourceId);
                    if (!source) return null;
                    return (
                      <a
                        key={sourceId}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary no-underline hover:underline"
                      >
                        {source.organisation} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-foreground/10 bg-muted/20 px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Why this work matters</p>
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">Understanding the real system problem</h2>
            </div>
            <div className="space-y-10">
              {workstream.context.map((section) => (
                <article key={section.title}>
                  <h3 className="mb-4 font-serif text-2xl font-bold">{section.title}</h3>
                  <div className="space-y-4 text-muted-foreground">
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <article className="border border-primary/15 bg-primary/[0.035] p-7 sm:p-9">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Why GHAT is acting</p>
              <h2 className="mb-6 font-serif text-3xl font-bold">Public benefit requires connected action</h2>
              <div className="space-y-4 text-muted-foreground">
                {workstream.whyGhat.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-7 border-l-4 border-primary bg-background p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">GHAT's role</p>
                <p className="m-0 font-semibold leading-relaxed">{workstream.role}</p>
              </div>
            </article>

            <article className="border border-foreground/12 p-7 sm:p-9">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">The project purpose</p>
              <h2 className="mb-6 font-serif text-3xl font-bold">{workstream.purpose}</h2>
              <ol className="space-y-3">
                {workstream.objectives.map((objective, index) => (
                  <li key={objective} className="grid grid-cols-[38px_1fr] gap-3 text-sm leading-relaxed text-foreground">
                    <span className="font-serif text-lg font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section className="border-y border-foreground/10 bg-primary text-primary-foreground px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">Current activity</p>
              <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">What is happening now</h2>
            </div>
            <ul className="space-y-4">
              {workstream.currentWork.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed text-primary-foreground/90">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 sm:py-16" aria-labelledby="delivery-heading">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">How the work will operate</p>
            <h2 id="delivery-heading" className="mb-4 font-serif text-3xl font-bold sm:text-4xl">Project delivery areas</h2>
            <p className="text-muted-foreground">
              Each approved phase will use only the delivery areas relevant to its setting, participants, evidence and available resources.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {workstream.deliveryAreas.map((area, index) => (
              <article key={area.title} className="border border-foreground/12 bg-background p-6 sm:p-7">
                <div className="mb-5 flex items-start gap-4">
                  <span className="font-serif text-2xl font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="m-0 font-serif text-2xl font-bold">{area.title}</h3>
                </div>
                <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {area.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {area.bullets && (
                  <ul className="mt-5 space-y-2">
                    {area.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-foreground/10 bg-muted/20 px-6 py-12 sm:px-10 sm:py-14 lg:px-14" aria-labelledby="plan-heading">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">The project plan</p>
            <h2 id="plan-heading" className="mb-4 font-serif text-3xl font-bold sm:text-4xl">From listening to accountable completion</h2>
            <p className="text-muted-foreground">
              Stage labels make it clear what is active, what remains in development and what must happen before a new phase can begin.
            </p>
          </div>
          <ol className="grid gap-4 lg:grid-cols-7">
            {workstream.plan.map((step, index) => (
              <li key={`${step.stage}-${step.title}`} className={`relative border p-5 ${step.current ? "border-primary bg-primary/[0.055]" : "border-foreground/12 bg-background"}`}>
                {step.current && (
                  <span className="mb-4 inline-flex items-center gap-2 bg-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-primary-foreground">
                    <CircleDot className="h-3 w-3" aria-hidden="true" /> Active now
                  </span>
                )}
                <span className="mb-4 block font-serif text-2xl font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{step.stage}</p>
                <h3 className="mb-3 text-base font-bold leading-snug">{step.title}</h3>
                <p className="m-0 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-14 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="border border-foreground/12 p-7 sm:p-9">
              <div className="mb-5 flex items-center gap-3">
                <FileCheck2 className="h-7 w-7 text-primary" aria-hidden="true" />
                <h2 className="m-0 font-serif text-3xl font-bold">What the project will produce</h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {workstream.outputs.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="border border-primary/15 bg-primary/[0.035] p-7 sm:p-9">
              <div className="mb-5 flex items-center gap-3">
                <Target className="h-7 w-7 text-primary" aria-hidden="true" />
                <h2 className="m-0 font-serif text-3xl font-bold">Current priorities</h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {workstream.priorities.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="border-y border-foreground/10 bg-slate-950 px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14" aria-labelledby="measure-heading">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">How impact will be measured</p>
            <h2 id="measure-heading" className="mb-4 font-serif text-3xl font-bold text-white sm:text-4xl">Evidence before claims</h2>
            <p className="text-white/70">
              Measures will be selected according to the setting and approved phase. GHAT will not publish a success percentage until a defined baseline, intervention, timeframe and credible evidence exist.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {workstream.measures.map((group) => (
              <article key={group.title} className="border border-white/15 bg-white/[0.035] p-6">
                <h3 className="mb-4 font-serif text-xl font-bold text-white">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-white/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Why this matters beyond one project</p>
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">Wider significance</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-foreground">
              {workstream.globalSignificance.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="border-y border-foreground/10 bg-muted/20 px-6 py-12 sm:px-10 sm:py-14 lg:px-14" aria-labelledby="participation-heading">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Support this workstream</p>
            <h2 id="participation-heading" className="mb-4 font-serif text-3xl font-bold sm:text-4xl">Begin through the right route</h2>
            <p className="text-muted-foreground">
              A pledge or expression of interest is reviewed against a defined need. It does not automatically create acceptance, appointment, access to beneficiaries or a contractual relationship.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {workstream.participation.map((route, index) => {
              const icons = [HandHeart, Users, MessageCircle];
              const Icon = icons[index] ?? MessageCircle;
              return (
                <article key={route.title} className="flex flex-col border border-foreground/12 bg-background p-6 sm:p-7">
                  <Icon className="mb-5 h-7 w-7 text-primary" aria-hidden="true" />
                  <h3 className="mb-3 font-serif text-2xl font-bold">{route.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{route.description}</p>
                  <ul className="mb-7 space-y-2">
                    {route.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-auto rounded-none">
                    <Link to={route.href}>{route.action} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
                  </Button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="border border-primary/15 bg-primary/[0.035] p-7 sm:p-9">
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck className="h-7 w-7 text-primary" aria-hidden="true" />
                <h2 className="m-0 font-serif text-3xl font-bold">Governance and safeguards</h2>
              </div>
              <ul className="space-y-3">
                {workstream.safeguards.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="border border-foreground/12 p-7 sm:p-9">
              <div className="mb-5 flex items-center gap-3">
                <BarChart3 className="h-7 w-7 text-primary" aria-hidden="true" />
                <h2 className="m-0 font-serif text-3xl font-bold">Evidence and progress</h2>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                This section will operate as a controlled project record—not a general blog. Updates will be factual, dated and connected to an approved phase.
              </p>
              <ul className="space-y-3">
                {workstream.evidence.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="grid gap-8 border-y border-foreground/10 bg-muted/20 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-14">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Related experience</p>
            <h2 className="mb-5 font-serif text-3xl font-bold">The experience on which the Trust builds</h2>
            <Button asChild variant="outline" className="rounded-none">
              <Link to="/our-history">Explore our history</Link>
            </Button>
          </div>
          <div className="space-y-4 text-muted-foreground">
            {workstream.relatedExperience.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="py-14 sm:py-16" aria-labelledby="sources-heading">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Evidence base</p>
            <h2 id="sources-heading" className="mb-4 font-serif text-3xl font-bold">Sources used on this page</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Source figures describe wider conditions and may be revised by the publishing organisation. Project outcomes will be reported separately when GHAT has suitable evidence.
            </p>
          </div>
          <ol className="grid gap-4 md:grid-cols-2">
            {workstream.sources.map((source, index) => (
              <li key={source.id} className="border border-foreground/12 p-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Source {index + 1}</p>
                <p className="mb-2 text-sm font-semibold">{source.organisation}</p>
                <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 text-sm leading-relaxed text-primary no-underline hover:underline">
                  <span>{source.title}</span>
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="border border-primary/20 bg-primary px-6 py-10 text-primary-foreground sm:px-10 sm:py-12 lg:px-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">Support stronger systems</p>
              <h2 className="mb-4 font-serif text-3xl font-bold text-primary-foreground">Turn interest into a responsible next step</h2>
              <p className="m-0 max-w-3xl text-primary-foreground/80">
                Pledge a useful resource, register relevant capability or begin a project-specific conversation. Every proposed contribution remains subject to review and formal acceptance.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild size="lg" className="rounded-none bg-white text-slate-950 hover:bg-white/90">
                <Link to={`/donate?workstream=${workstream.slug}#pledge-form`}>Pledge support</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-white/60 bg-transparent text-white hover:bg-white hover:text-slate-950">
                <Link to={`/contact?workstream=${workstream.slug}`}>Ask about the project</Link>
              </Button>
            </div>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};
