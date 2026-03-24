import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IMPACT_STATS, PROGRAM_AREAS } from "@/lib/constants";
import { SEO } from "@/components/SEO";
import { organizationSchema } from "@/lib/seo";
import heroImage from "@/assets/hero-territorial-overview.jpg";
import clinicImage from "@/assets/delivery-healthcare-clinic.jpg";
import systemsImage from "@/assets/delivery-landscape-systems.jpg";
import ruralImage from "@/assets/delivery-rural-landscape.jpg";

export const HomePage = () => {
  return (
    <>
      <SEO 
        title="Global Health Access Trust"
        description="A private charitable trust directing capital into healthcare access, system infrastructure, and capacity building where it is most critically needed."
        canonical="/"
        schema={organizationSchema}
      />
      <div className="flex flex-col">
        {/* Hero */}
        <section 
          className="hero hero--overlay hero--bg"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero__image" style={{ display: 'none' }}>
            <img src={heroImage} alt="Aerial view of terraced agricultural landscape with rural health infrastructure" />
          </div>
          
          <div className="hero__overlay">
            <h1 className="text-center mb-4 text-white">
              Global Health Access Trust
            </h1>
            <p className="text-[15px] sm:text-base mb-3 text-white/80 max-w-2xl mx-auto text-center leading-relaxed">
              A private charitable trust directing capital into healthcare access, system infrastructure, and capacity where it is most critically needed.
            </p>
            <p className="text-[13px] sm:text-sm mb-8 text-white/60 max-w-xl mx-auto text-center tracking-wide">
              Structured funding. Verified delivery. Measurable outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" variant="default" className="min-w-[180px]">
                  Donor Portal
                </Button>
              </Link>
              <Link to="/about-the-trust">
                <Button size="lg" variant="outline" className="min-w-[180px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  About the Trust
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Purpose */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-center mb-8 text-foreground">
              Purpose
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="section-container">
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  The Trust deploys capital into lawful, ethical interventions that expand access to healthcare for underserved populations.
                </p>
              </div>
              <div className="section-container">
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  It operates through structured partnerships with health systems, academic institutions, and recognised delivery organisations across twelve countries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-center mb-4 text-foreground">
              Approach
            </h2>
            <p className="text-[15px] text-muted-foreground text-center mb-10 leading-[1.7] max-w-2xl mx-auto">
              Capital is deployed through structured, commission-based health interventions with defined scope, delivery oversight, and reporting.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="section-container">
                <h3 className="mb-3 text-foreground">Scope Definition</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  Region, focus area, and intended outcomes are agreed in advance.
                </p>
              </div>

              <div className="section-container">
                <h3 className="mb-3 text-foreground">Progress Reporting</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  Milestones, field documentation, and updates are provided through a secure donor portal.
                </p>
              </div>

              <div className="section-container">
                <h3 className="mb-3 text-foreground">Financial Transparency</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  All fund allocations are documented and independently accounted for.
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link to="/commission-projects">
                <Button size="lg" variant="outline">
                  Commissioned Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How the Trust Operates */}
        <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
          <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-center mb-4 text-foreground">
              How the Trust Operates
            </h2>
            <p className="text-[15px] text-muted-foreground text-center mb-10 leading-[1.7] max-w-2xl mx-auto">
              The Trust operates through a structured system that connects capital, delivery partners, and measurable outcomes within a controlled environment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="section-container">
                <h3 className="mb-3 text-foreground">Structured Funding</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  Capital is allocated to clearly defined projects with agreed scope, geography, and objectives prior to deployment.
                </p>
              </div>
              <div className="section-container">
                <h3 className="mb-3 text-foreground">Project Oversight</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  Each initiative is tracked against milestones, with delivery monitored through a structured reporting framework.
                </p>
              </div>
              <div className="section-container">
                <h3 className="mb-3 text-foreground">Donor Visibility</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  Donors have access to a secure environment where progress, updates, and documentation are made available.
                </p>
              </div>
              <div className="section-container">
                <h3 className="mb-3 text-foreground">Accountability & Control</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  All activity is documented, auditable, and aligned with legal and governance requirements.
                </p>
              </div>
            </div>

            <p className="text-[13px] text-muted-foreground/70 text-center mt-8 leading-relaxed max-w-2xl mx-auto">
              The platform supports structured project management, reporting, and administrative oversight through a secure internal system.
            </p>
          </div>
        </section>

        {/* Delivery */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-center mb-4 text-foreground">
              Delivery
            </h2>
            <p className="text-[15px] leading-[1.7] max-w-2xl mx-auto text-center text-muted-foreground mb-10">
              Delivery is executed through established, vetted partners operating in complex and resource-constrained environments.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="section-container !p-0 overflow-hidden">
                <img 
                  src={clinicImage} 
                  alt="Primary healthcare clinic interior with medical equipment in a rural setting"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <p className="text-sm font-medium text-foreground">Primary Healthcare</p>
                </div>
              </div>
              <div className="section-container !p-0 overflow-hidden">
                <img 
                  src={systemsImage} 
                  alt="Aerial view of river delta and agricultural systems with settlements"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <p className="text-sm font-medium text-foreground">Systems Infrastructure</p>
                </div>
              </div>
              <div className="section-container !p-0 overflow-hidden">
                <img 
                  src={ruralImage} 
                  alt="Rural landscape with scattered settlements and green hillside terrain"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <p className="text-sm font-medium text-foreground">Rural Access</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
          <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-center mb-6 text-foreground">
              Governance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="section-container">
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  The Trust is governed by an independent Board with expertise across healthcare, law, public policy, and institutional governance.
                </p>
              </div>
              <div className="section-container">
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  All activities are conducted in accordance with the laws of England and Wales and subject to independent audit.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {IMPACT_STATS.map((stat, index) => (
                <div key={index} className="section-container text-left">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {index === 0 ? "Standards" : index === 1 ? "Structure" : "Mandate"}
                  </span>
                  <h3 className="my-2 text-foreground">
                    {stat.number}
                  </h3>
                  <div className="text-sm font-medium mb-1 text-foreground">
                    {stat.label}
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Funding Mandate */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-center mb-4 text-foreground">
              Funding Mandate
            </h2>
            <p className="text-[15px] max-w-2xl mx-auto text-center text-muted-foreground mb-10 leading-[1.7]">
              All funding is directed exclusively toward defined areas of charitable intervention, aligned with long-term system impact.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROGRAM_AREAS.slice(0, 5).map((area) => (
                <div key={area.id} className="section-container">
                  <h3 className="mb-3 text-foreground">
                    {area.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-[1.7]">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/what-we-do">
                <Button variant="outline" size="lg">
                  Full Mandate
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Engagement & Funding Approach */}
        <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
          <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-center mb-4 text-foreground">
              Engagement &amp; Funding Approach
            </h2>
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-[15px] text-muted-foreground leading-[1.7] mb-4">
                The Trust does not operate an open donation model.
              </p>
              <p className="text-[15px] text-muted-foreground leading-[1.7] mb-4">
                All funding relationships are established through a structured engagement process to ensure alignment, accountability, and effective deployment of capital.
              </p>
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                This approach allows the Trust to maintain full oversight of how funds are allocated, monitored, and delivered across its areas of intervention.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="section-container">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 1</span>
                <h3 className="my-2 text-foreground">Initial Enquiry</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  Engagement begins through a direct enquiry to the Trust.
                </p>
              </div>
              <div className="section-container">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 2</span>
                <h3 className="my-2 text-foreground">Review &amp; Alignment</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  Each enquiry is assessed to ensure alignment with the Trust's mandate and governance framework.
                </p>
              </div>
              <div className="section-container">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 3</span>
                <h3 className="my-2 text-foreground">Structured Engagement</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  Funding relationships are formalised with defined scope, objectives, and reporting expectations.
                </p>
              </div>
              <div className="section-container">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 4</span>
                <h3 className="my-2 text-foreground">Project Deployment</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7]">
                  Capital is deployed into clearly defined initiatives with ongoing monitoring and accountability.
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link to="/contact">
                <Button size="lg" variant="default">
                  Submit an Enquiry
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};
