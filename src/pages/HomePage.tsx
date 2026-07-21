import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IMPACT_STATS, PROGRAM_AREAS } from "@/lib/constants";
import { SEO } from "@/components/SEO";
import { organizationSchema } from "@/lib/seo";
import heroImage from "@/assets/ghat-hero-community-health.jpg";
import clinicImage from "@/assets/ghat-maternal-care.jpg";
import systemsImage from "@/assets/ghat-infrastructure-delivery.jpg";
import ruralImage from "@/assets/ghat-capacity-training.jpg";

export const HomePage = () => {
  return (
    <>
      <SEO
        title="Global Health Access Trust"
        description="A private charitable trust directing capital into healthcare access, system infrastructure, and capacity building where it is most critically needed."
        canonical="/"
        schema={organizationSchema}
      />
      <div className="homepage-editorial flex flex-col bg-background">

        {/* Category ticker strip — OSF-style topical band */}
        <div className="border-b border-foreground/10 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-11 flex items-center gap-8 overflow-x-auto text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
            <span className="text-accent">In Focus</span>
            <span className="text-foreground">Ukraine</span>
            <span>Primary Healthcare</span>
            <span>Systems Infrastructure</span>
            <span>Rural Access</span>
            <span>Governance</span>
            <span>Commissioned Projects</span>
          </div>
        </div>

        {/* Featured Story Hero — full-bleed editorial */}
        <section className="relative bg-primary text-primary-foreground">
          <div className="relative min-h-[86vh] lg:min-h-[92vh] overflow-hidden">
            <img
              src={heroImage}
              alt="A mother and child on a residential street in an Eastern European town affected by the Ukraine crisis"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/20 to-transparent" />

            <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-10 pt-24 pb-16 lg:pt-40 lg:pb-24 min-h-[86vh] lg:min-h-[92vh] flex flex-col justify-end">
              <div className="max-w-[880px]">
                <div className="flex items-center gap-4 mb-8">
                  <span className="inline-block bg-accent text-accent-foreground px-3 py-1.5 text-[10.5px] uppercase tracking-[0.22em] font-bold">
                    Featured
                  </span>
                  <span className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-primary-foreground/80">
                    Ukraine — Field Response
                  </span>
                </div>
                <h1 className="text-primary-foreground mb-10" style={{ fontSize: "clamp(44px, 6.4vw, 96px)" }}>
                  Directing capital where healthcare is most critically needed.
                </h1>
                <p className="text-[18px] md:text-[21px] leading-[1.5] text-primary-foreground/90 max-w-[720px] mb-10">
                  A private charitable trust deploying structured funding into healthcare access, system infrastructure, and long-term capacity across twelve countries.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/auth">
                    <Button size="lg" className="h-12 px-8 rounded-none uppercase tracking-[0.18em] text-[11px] font-bold bg-accent text-accent-foreground hover:bg-accent/90 border-0">
                      Donor Portal
                    </Button>
                  </Link>
                  <Link to="/about-the-trust">
                    <Button size="lg" variant="outline" className="h-12 px-8 rounded-none border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary uppercase tracking-[0.18em] text-[11px] font-bold">
                      About the Trust
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-[10.5px] uppercase tracking-[0.22em] text-primary-foreground/70 font-semibold text-right">
              <div>Field Documentation</div>
              <div className="text-primary-foreground/50 mt-1">Displaced family · Eastern Ukraine</div>
            </div>
          </div>
        </section>

        {/* Impact numbers band — bold institutional data */}
        <section className="bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
            {[
              { n: "12", l: "Countries" },
              { n: "40+", l: "Delivery Partners" },
              { n: "2019", l: "Established" },
              { n: "100%", l: "Independently Audited" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-background" style={{ fontSize: "clamp(42px, 5vw, 72px)", lineHeight: 0.95, fontWeight: 800, letterSpacing: "-0.03em" }}>
                  {s.n}
                </div>
                <div className="mt-3 text-[10.5px] uppercase tracking-[0.22em] font-semibold text-background/70">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial pull-quote — statement of intent */}
        <section className="bg-background border-b border-foreground/10 py-24 md:py-32">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16 items-start">
            <span className="eyebrow whitespace-nowrap md:mt-4">A Statement of Intent</span>
            <div>
              <p className="font-serif text-foreground font-medium" style={{ fontSize: "clamp(28px, 3.6vw, 54px)", lineHeight: 1.12, letterSpacing: "-0.015em" }}>
                Health is the foundation of every open society. Where conflict, displacement and system collapse remove that foundation, the Trust responds with structured, accountable capital — from Ukraine to the wider regions where care is denied.
              </p>
              <div className="mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                <span className="h-px w-10 bg-foreground/40" />
                <span>The Board of Trustees</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Stories — 3-column editorial grid */}
        <section className="bg-background py-20 md:py-28 border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
              <div>
                <span className="eyebrow mb-4 block">Delivery</span>
                <h2 className="text-foreground max-w-[780px]">
                  Delivery is executed through established, vetted partners operating in complex and resource-constrained environments.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {[
                { img: clinicImage, cat: "Primary Healthcare", alt: "A nurse examining a mother and newborn in a field maternity clinic in eastern Ukraine", copy: "Frontline clinical services delivered in underserved communities." },
                { img: systemsImage, cat: "Systems Infrastructure", alt: "Aid workers unloading medical supply pallets outside a damaged building in a Syrian town", copy: "Strengthening the underlying systems that make care possible." },
                { img: ruralImage, cat: "Rural Access", alt: "A multi-region group of clinicians in a field training session", copy: "Reaching populations where geography limits conventional provision." },
              ].map((a) => (
                <article key={a.cat} className="group cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden mb-6 bg-muted">
                    <img
                      src={a.img}
                      alt={a.alt}
                      className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block bg-accent text-accent-foreground px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-bold">
                      {a.cat}
                    </span>
                  </div>
                  <h3 className="text-foreground mb-3 font-serif" style={{ fontSize: "clamp(22px, 1.9vw, 28px)", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.01em" }}>
                    {a.copy}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Purpose — dark editorial band */}
        <section className="bg-primary text-primary-foreground py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16 mb-16">
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-accent md:mt-3">Purpose</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="pt-8 border-t border-primary-foreground/25">
                  <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
                    The Trust deploys capital into lawful, ethical interventions that expand access to healthcare for underserved populations.
                  </p>
                </div>
                <div className="pt-8 border-t border-primary-foreground/25">
                  <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
                    It operates through structured partnerships with health systems, academic institutions, and recognised delivery organisations across twelve countries.
                  </p>
                </div>
              </div>
            </div>
            <div className="pl-0 md:pl-[196px]">
              <Link
                to="/about-the-trust"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-bold text-primary-foreground border-b border-primary-foreground pb-2 hover:text-accent hover:border-accent transition-colors"
              >
                About the Trust →
              </Link>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-24 md:py-32 border-b border-foreground/10 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16 mb-16">
              <span className="eyebrow md:mt-3">Approach</span>
              <div>
                <h2 className="mb-6 text-foreground max-w-[820px]">
                  Capital is deployed through structured, commission-based health interventions with defined scope, delivery oversight, and reporting.
                </h2>
              </div>
            </div>

            <div className="pl-0 md:pl-[196px] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {[
                { t: "Scope Definition", d: "Region, focus area, and intended outcomes are agreed in advance." },
                { t: "Progress Reporting", d: "Milestones, field documentation, and updates are provided through a secure donor portal." },
                { t: "Financial Transparency", d: "All fund allocations are documented and independently accounted for." },
              ].map((c, i) => (
                <div key={c.t} className="pt-8 border-t border-foreground/15">
                  <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-accent block mb-4">0{i + 1}</span>
                  <h3 className="mb-4 text-foreground">{c.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>

            <div className="pl-0 md:pl-[196px] mt-16">
              <Link to="/commission-projects">
                <Button variant="outline" size="lg" className="rounded-none border-foreground/25 hover:bg-foreground hover:text-background uppercase tracking-[0.18em] text-[11px] font-bold h-12 px-8">
                  Commissioned Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How the Trust Operates */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16 mb-16">
              <span className="eyebrow md:mt-3">How the Trust Operates</span>
              <div>
                <h2 className="mb-6 text-foreground max-w-[820px]">The Trust operates through a structured model that defines how capital, delivery, and oversight are aligned within a controlled environment.</h2>
              </div>
            </div>

            <div className="pl-0 md:pl-[196px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
              {[
                { t: "Structured Funding", d: "Capital is allocated to clearly defined projects with agreed scope, geography, and objectives prior to deployment." },
                { t: "Project Oversight", d: "Each initiative is tracked against milestones, with delivery monitored through a structured reporting framework." },
                { t: "Donor Visibility", d: "Donors have access to a secure environment where progress, updates, and documentation are made available." },
                { t: "Accountability & Control", d: "All activity is documented, auditable, and aligned with legal and governance requirements." },
              ].map((c, i) => (
                <div key={c.t} className="pt-8 border-t border-foreground/15">
                  <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-accent block mb-4">0{i + 1}</span>
                  <h3 className="mb-4 text-foreground">{c.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>

            <p className="pl-0 md:pl-[196px] text-sm text-muted-foreground/80 mt-12 leading-relaxed max-w-2xl">
              The platform supports structured project management, reporting, and administrative oversight through a secure internal system.
            </p>
          </div>
        </section>

        {/* Operational Framework */}
        <section className="py-24 md:py-32 bg-secondary/60">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16 mb-16">
              <span className="eyebrow md:mt-3">Operational Framework</span>
              <div>
                <h2 className="mb-6 text-foreground max-w-[820px]">The operational framework outlines how initiatives are executed in practice, from capital allocation through to outcome verification.</h2>
              </div>
            </div>

            <div className="pl-0 md:pl-[196px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
              {[
                { t: "Capital Allocation", d: "Funding is assigned to clearly defined initiatives with agreed scope and objectives." },
                { t: "Project Structuring", d: "Delivery partners, geography, and operational frameworks are established." },
                { t: "Monitoring & Reporting", d: "Progress is tracked against milestones with structured reporting." },
                { t: "Outcome Verification", d: "Results are assessed to ensure accountability and measurable impact." },
              ].map((c, i) => (
                <div key={c.t} className="pt-8 border-t border-foreground/15">
                  <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-accent block mb-4">0{i + 1}</span>
                  <h3 className="mb-4 text-foreground">{c.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="py-24 md:py-32 bg-background border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16 mb-16">
              <span className="eyebrow md:mt-3">Governance</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <div>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed">
                    The Trust is governed by an independent Board with expertise across healthcare, law, public policy, and institutional governance.
                  </p>
                </div>
                <div>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed">
                    All activities are conducted in accordance with the laws of England and Wales and subject to independent audit.
                  </p>
                </div>
              </div>
            </div>

            <div className="pl-0 md:pl-[196px] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {IMPACT_STATS.map((stat, index) => (
                <div key={index} className="pt-8 border-t border-foreground/15">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    {index === 0 ? "Standards" : index === 1 ? "Structure" : "Mandate"}
                  </span>
                  <h3 className="my-3 font-serif text-foreground" style={{ fontSize: "clamp(28px, 2.6vw, 40px)", lineHeight: 1.05, fontWeight: 800 }}>{stat.number}</h3>
                  <div className="text-sm font-semibold mb-2 text-foreground">{stat.label}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Funding Mandate */}
        <section className="py-24 md:py-32 bg-secondary/60">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16 mb-16">
              <span className="eyebrow md:mt-3">Funding Mandate</span>
              <div>
                <h2 className="mb-6 text-foreground max-w-[820px]">All funding is directed exclusively toward defined areas of charitable intervention, aligned with long-term system impact.</h2>
              </div>
            </div>

            <div className="pl-0 md:pl-[196px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {PROGRAM_AREAS.slice(0, 5).map((area, index) => (
                <div key={area.id} className="pt-8 border-t border-foreground/15">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent block mb-3">0{index + 1}</span>
                  <h3 className="mb-4 text-foreground">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>

            <div className="pl-0 md:pl-[196px] mt-16">
              <Link to="/what-we-do">
                <Button variant="outline" size="lg" className="rounded-none border-foreground/25 hover:bg-foreground hover:text-background uppercase tracking-[0.18em] text-[11px] font-bold h-12 px-8">
                  Full Mandate
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Engagement & Funding Approach */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16 mb-16">
              <span className="eyebrow md:mt-3">Engagement & Funding Approach</span>
              <div className="max-w-3xl space-y-5">
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  Engagement with the Trust is conducted through a structured and selective process.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Relationships are established with individuals, institutions, and partners aligned with the Trust's mandate and governance framework.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  This approach ensures capital is deployed with precision, oversight, and long-term impact.
                </p>
              </div>
            </div>

            <div className="pl-0 md:pl-[196px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
              {[
                { t: "Initial Enquiry", d: "Engagement begins through a direct enquiry to the Trust." },
                { t: "Review & Alignment", d: "Each enquiry is assessed to ensure alignment with the Trust's mandate and governance framework." },
                { t: "Structured Engagement", d: "Funding relationships are formalised with defined scope, objectives, and reporting expectations." },
                { t: "Project Deployment", d: "Capital is deployed into clearly defined initiatives with ongoing monitoring and accountability." },
              ].map((c, i) => (
                <div key={c.t} className="pt-8 border-t border-foreground/15">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent block mb-3">Step {i + 1}</span>
                  <h3 className="mb-4 text-foreground">{c.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>

            <div className="pl-0 md:pl-[196px] mt-16">
              <Link to="/contact">
                <Button size="lg" className="rounded-none bg-primary hover:bg-primary/90 uppercase tracking-[0.18em] text-[11px] font-bold h-12 px-8">
                  Initiate Engagement
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
