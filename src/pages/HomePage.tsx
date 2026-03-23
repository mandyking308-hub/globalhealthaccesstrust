import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IMPACT_STATS, NEW_IMPACT_STATS, PROGRAM_AREAS } from "@/lib/constants";
import { SEO } from "@/components/SEO";
import { organizationSchema, PAGE_KEYWORDS } from "@/lib/seo";
import heroImage from "@/assets/hero-territorial-overview.jpg";
import clinicImage from "@/assets/delivery-healthcare-clinic.jpg";
import systemsImage from "@/assets/delivery-landscape-systems.jpg";
import ruralImage from "@/assets/delivery-rural-landscape.jpg";

export const HomePage = () => {
  return (
    <>
      <SEO 
        title="Global Health Access Trust"
        description="A charitable trust established to fund and strengthen healthcare access for underserved populations worldwide."
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
            <h1 className="font-serif font-bold text-center text-[32px] sm:text-[48px] lg:text-[64px] mb-4 text-white leading-tight">
              Global Health Access Trust
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-8 text-white/80 max-w-3xl mx-auto text-center">
              A charitable trust funding healthcare access, capacity building, and systems strengthening for underserved populations worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" variant="default" className="min-w-[180px]">
                  Donor Login
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
        <section className="py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-center mb-12 text-foreground leading-tight">
              Purpose
            </h2>
            <div className="space-y-6 text-center">
              <p className="text-lg leading-relaxed text-muted-foreground">
                The Trust exists to fund lawful, ethical interventions that improve access to healthcare for populations excluded from adequate provision.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                It operates through structured partnerships with health systems, academic institutions, and recognised delivery organisations across twelve countries.
              </p>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-20 md:py-28 lg:py-36 border-t border-border/40">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-center mb-8 text-foreground leading-tight">
              Approach
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-16 leading-relaxed max-w-2xl mx-auto">
              Donors may commission specific health projects. Each commission is structured with defined scope, region, and reporting obligations.
            </p>

            <div className="space-y-12 mb-16">
              <div className="text-center">
                <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">Scope Definition</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Region, focus area, and intended outcomes are agreed in advance.
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">Progress Reporting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Milestones, field documentation, and updates are provided through a secure donor portal.
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">Financial Transparency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All fund allocations are documented and independently accounted for.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/commission-projects">
                <Button size="lg" variant="outline">
                  Commissioned Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Delivery */}
        <section className="py-20 md:py-28 lg:py-36 border-t border-border/40">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-center mb-8 text-foreground leading-tight">
              Delivery
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto text-center text-muted-foreground mb-16">
              The Trust delivers through established partners operating in conflict-affected, displaced, and resource-limited settings.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <img 
                  src={clinicImage} 
                  alt="Primary healthcare clinic interior with medical equipment in a rural setting"
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <p className="text-sm font-medium text-foreground text-center">Primary Healthcare</p>
              </div>
              <div>
                <img 
                  src={systemsImage} 
                  alt="Aerial view of river delta and agricultural systems with settlements"
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <p className="text-sm font-medium text-foreground text-center">Systems Infrastructure</p>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <img 
                  src={ruralImage} 
                  alt="Rural landscape with scattered settlements and green hillside terrain"
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <p className="text-sm font-medium text-foreground text-center">Rural Access</p>
              </div>
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="py-20 md:py-28 lg:py-36 border-t border-border/40">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-center mb-12 text-foreground leading-tight">
              Governance
            </h2>
            <div className="space-y-6 text-center mb-20">
              <p className="text-lg leading-relaxed text-muted-foreground">
                The Trust is governed by an independent Board of Trustees with professional backgrounds in healthcare, law, public policy, and institutional governance.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                All activities are conducted in accordance with the laws of England and Wales and subject to independent audit.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {IMPACT_STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {index === 0 ? "Standards" : index === 1 ? "Structure" : "Mandate"}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold my-2 text-foreground">
                    {stat.number}
                  </h3>
                  <div className="text-base font-semibold mb-2 text-foreground">
                    {stat.label}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Funding Mandate */}
        <section className="py-20 md:py-28 lg:py-36 border-t border-border/40">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-center mb-8 text-foreground leading-tight">
              Funding Mandate
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-center text-muted-foreground mb-16 leading-relaxed">
              The Trust is established for exclusively charitable purposes. Its funding mandate encompasses five areas of lawful intervention:
            </p>
            
            <div className="space-y-10">
              {PROGRAM_AREAS.slice(0, 5).map((area) => (
                <div key={area.id} className="text-center max-w-2xl mx-auto">
                  <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Link to="/what-we-do">
                <Button variant="outline" size="lg">
                  Full Mandate
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};
