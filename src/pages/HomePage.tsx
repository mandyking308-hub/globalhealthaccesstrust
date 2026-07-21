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
      <div className="homepage-editorial flex flex-col">
        {/* Hero — OSF-style split screen */}
        <section className="relative border-b border-foreground/10 bg-background">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-24 order-2 lg:order-1">
              <div className="max-w-xl">
                <h1 className="mb-10 text-foreground">
                  Global Health Access Trust
                </h1>
                <p className="text-lg md:text-xl max-w-2xl text-muted-foreground leading-relaxed">
                  A private charitable trust directing capital into healthcare access, system infrastructure, and capacity where it is most critically needed.
                </p>
                <p className="text-sm md:text-[15px] mt-4 text-muted-foreground/80 max-w-2xl leading-relaxed">
                  A controlled platform for deploying capital into healthcare systems with oversight, accountability, and measurable impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Link to="/auth">
                    <Button size="lg" className="min-w-[180px] rounded-none uppercase tracking-widest text-xs font-bold">
                      Donor Portal
                    </Button>
                  </Link>
                  <Link to="/about-the-trust">
                    <Button size="lg" variant="outline" className="min-w-[180px] rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background uppercase tracking-widest text-xs font-bold">
                      About the Trust
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 min-h-[400px] lg:min-h-full overflow-hidden">
              <img
                src={heroImage}
                alt="Community health worker consulting with a patient in a rural clinic"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Purpose */}
        <section className="bg-primary text-primary-foreground py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <h2 className="text-primary-foreground">Purpose</h2>
              <Link to="/about-the-trust" className="uppercase text-xs tracking-[0.2em] border-b border-primary-foreground pb-1 hover:text-forest-light transition-colors">
                About the Trust
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <div className="py-6 border-t border-primary-foreground/20">
                <p className="text-primary-foreground/80 text-lg leading-relaxed">
                  The Trust deploys capital into lawful, ethical interventions that expand access to healthcare for underserved populations.
                </p>
              </div>
              <div className="py-6 border-t border-primary-foreground/20">
                <p className="text-primary-foreground/80 text-lg leading-relaxed">
                  It operates through structured partnerships with health systems, academic institutions, and recognised delivery organisations across twelve countries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-20 md:py-28 border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="mb-4">Approach</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
              Capital is deployed through structured, commission-based health interventions with defined scope, delivery oversight, and reporting.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Scope Definition</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Region, focus area, and intended outcomes are agreed in advance.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Progress Reporting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Milestones, field documentation, and updates are provided through a secure donor portal.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Financial Transparency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All fund allocations are documented and independently accounted for.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <Link to="/commission-projects">
                <Button variant="outline" size="lg" className="rounded-none border-foreground/20 hover:bg-muted/30">
                  Commissioned Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How the Trust Operates */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="mb-4">How the Trust Operates</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
              The Trust operates through a structured model that defines how capital, delivery, and oversight are aligned within a controlled environment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Structured Funding</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Capital is allocated to clearly defined projects with agreed scope, geography, and objectives prior to deployment.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Project Oversight</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each initiative is tracked against milestones, with delivery monitored through a structured reporting framework.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Donor Visibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Donors have access to a secure environment where progress, updates, and documentation are made available.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Accountability & Control</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All activity is documented, auditable, and aligned with legal and governance requirements.
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground/70 mt-12 leading-relaxed max-w-2xl">
              The platform supports structured project management, reporting, and administrative oversight through a secure internal system.
            </p>
          </div>
        </section>

        {/* Operational Framework */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="mb-4">Operational Framework</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
              The operational framework outlines how initiatives are executed in practice, from capital allocation through to outcome verification.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Capital Allocation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Funding is assigned to clearly defined initiatives with agreed scope and objectives.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Project Structuring</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Delivery partners, geography, and operational frameworks are established.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Monitoring & Reporting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Progress is tracked against milestones with structured reporting.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <h3 className="mb-4">Outcome Verification</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Results are assessed to ensure accountability and measurable impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery */}
        <section className="py-20 md:py-28 border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="mb-4">Delivery</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
              Delivery is executed through established, vetted partners operating in complex and resource-constrained environments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <article className="group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden mb-6">
                  <img
                    src={clinicImage}
                    alt="Primary healthcare clinic interior with medical equipment in a rural setting"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Primary Healthcare</p>
                <p className="text-muted-foreground leading-relaxed">
                  Frontline clinical services delivered in underserved communities.
                </p>
              </article>
              <article className="group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden mb-6">
                  <img
                    src={systemsImage}
                    alt="Aerial view of river delta and agricultural systems with settlements"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Systems Infrastructure</p>
                <p className="text-muted-foreground leading-relaxed">
                  Strengthening the underlying systems that make care possible.
                </p>
              </article>
              <article className="group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden mb-6">
                  <img
                    src={ruralImage}
                    alt="Rural landscape with scattered settlements and green hillside terrain"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Rural Access</p>
                <p className="text-muted-foreground leading-relaxed">
                  Reaching populations where geography limits conventional provision.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="mb-8">Governance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 mb-16">
              <div className="py-10 md:pr-12 bg-background">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Trust is governed by an independent Board with expertise across healthcare, law, public policy, and institutional governance.
                </p>
              </div>
              <div className="py-10 md:pl-12 bg-background">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  All activities are conducted in accordance with the laws of England and Wales and subject to independent audit.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {IMPACT_STATS.map((stat, index) => (
                <div key={index} className="py-6 border-t border-foreground/10">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
                    {index === 0 ? "Standards" : index === 1 ? "Structure" : "Mandate"}
                  </span>
                  <h3 className="my-3">{stat.number}</h3>
                  <div className="text-sm font-medium mb-2">{stat.label}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Funding Mandate */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="mb-4">Funding Mandate</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
              All funding is directed exclusively toward defined areas of charitable intervention, aligned with long-term system impact.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
              {PROGRAM_AREAS.slice(0, 5).map((area, index) => (
                <div key={area.id} className="py-6 border-t border-foreground/10">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent block mb-3">
                    0{index + 1}
                  </span>
                  <h3 className="mb-4">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <Link to="/what-we-do">
                <Button variant="outline" size="lg" className="rounded-none border-foreground/20 hover:bg-muted/30">
                  Full Mandate
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Engagement & Funding Approach */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="mb-4">Engagement & Funding Approach</h2>
            <div className="max-w-2xl mb-16">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Engagement with the Trust is conducted through a structured and selective process.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Relationships are established with individuals, institutions, and partners aligned with the Trust's mandate and governance framework.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This approach ensures capital is deployed with precision, oversight, and long-term impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
              <div className="py-6 border-t border-foreground/10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent block mb-3">Step 1</span>
                <h3 className="mb-4">Initial Enquiry</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Engagement begins through a direct enquiry to the Trust.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent block mb-3">Step 2</span>
                <h3 className="mb-4">Review & Alignment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each enquiry is assessed to ensure alignment with the Trust's mandate and governance framework.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent block mb-3">Step 3</span>
                <h3 className="mb-4">Structured Engagement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Funding relationships are formalised with defined scope, objectives, and reporting expectations.
                </p>
              </div>
              <div className="py-6 border-t border-foreground/10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent block mb-3">Step 4</span>
                <h3 className="mb-4">Project Deployment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Capital is deployed into clearly defined initiatives with ongoing monitoring and accountability.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <Link to="/contact">
                <Button size="lg" className="rounded-none">
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
