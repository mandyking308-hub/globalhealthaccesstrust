import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IMPACT_STATS, NEW_IMPACT_STATS, PROGRAM_AREAS } from "@/lib/constants";
import { SEO } from "@/components/SEO";
import { organizationSchema, PAGE_KEYWORDS } from "@/lib/seo";
import heroImage from "@/assets/hero-global-healthcare-access.jpg";
import familyMedicalCareImage from "@/assets/family-medical-care.jpg";
import ukraineConflictImage from "@/assets/conflict-ukraine-humanitarian.jpg";
import africaConflictImage from "@/assets/conflict-africa-humanitarian.jpg";

export const HomePage = () => {
  return (
    <>
      <SEO 
        title="Global Health Access Trust - Healthcare for All"
        description="A charity building lasting access to healthcare for vulnerable and underserved populations worldwide through ethical interventions, capacity building, and systems strengthening."
        canonical="/"
        schema={organizationSchema}
      />
      <div className="flex flex-col">
        {/* Hero Section */}
        <section 
          className="hero hero--overlay hero--bg"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero__image" style={{ display: 'none' }}>
            <img src={heroImage} alt="Diverse global healthcare workers providing medical care worldwide" />
          </div>
          
          <div className="hero__overlay">
            <h1 className="font-serif font-bold text-center text-[32px] sm:text-[48px] lg:text-[64px] mb-4 text-white leading-tight">
              Where Purpose Meets Precision.
            </h1>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl mb-8 text-white/90 max-w-4xl mx-auto">
              Your Impact, Delivered With Total Transparency.
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-8 text-white/80 max-w-3xl mx-auto">
              Global Health Access Trust empowers committed donors to fund, direct, and witness life-changing health interventions — with full visibility from conception to completion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" variant="default" className="min-w-[180px]">
                  Log In / Donate
                </Button>
              </Link>
              <Link to="/commission-projects">
                <Button size="lg" variant="outline" className="min-w-[180px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Impact Highlights */}
        <section className="py-20 md:py-28 lg:py-36">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-center mb-16 text-foreground leading-tight">
              Our Impact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {NEW_IMPACT_STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {stat.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commission a Project */}
        <section className="py-20 md:py-28 lg:py-36 border-t border-border/40">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-center mb-8 text-foreground leading-tight">
              Commission a Project
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-16 leading-relaxed max-w-2xl mx-auto">
              With GHAT, you don't just make a donation — you shape a targeted health project that reflects your values. Choose where your support goes, follow every milestone, and receive real-world updates from the field. Transparent. Personal. Measurable.
            </p>

            <div className="space-y-12 mb-16">
              <div className="text-center">
                <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">Design Your Project</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Set region, focus area, and intended impact.
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">Track Progress in Real Time</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Milestones, photos, updates, field notes — all inside your secure dashboard.
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">Complete Visibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every pound allocated with clarity and integrity.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/commission-projects">
                <Button size="lg" variant="default">
                  Learn More About Commissioned Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-20 md:py-28 lg:py-36 border-t border-border/40">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-center mb-8 text-foreground leading-tight">
              Why It Matters
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto text-center text-muted-foreground mb-16">
              When conflict forced Amina's family to flee, they lost access to medical care. Through our partners, she now receives regular treatment for her child. This is why we exist — to restore dignity and care to the most overlooked.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <img 
                  src={familyMedicalCareImage} 
                  alt="Displaced mother and child receiving compassionate medical care from healthcare worker"
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <p className="text-sm font-medium text-foreground text-center">Healthcare Access</p>
              </div>
              <div>
                <img 
                  src={ukraineConflictImage} 
                  alt="Ukraine humanitarian crisis response - medical aid workers providing healthcare assistance"
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <p className="text-sm font-medium text-foreground text-center">Ukraine Crisis Response</p>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <img 
                  src={africaConflictImage} 
                  alt="African humanitarian aid response - displaced families receiving essential medical care"
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <p className="text-sm font-medium text-foreground text-center">Africa Humanitarian Aid</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="py-20 md:py-28 lg:py-36 border-t border-border/40">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-center mb-12 text-foreground leading-tight">
              Our Vision
            </h2>
            <div className="space-y-6 text-center mb-20">
              <p className="text-lg leading-relaxed text-muted-foreground">
                We believe no one should be denied healthcare or dignity because of where they were born or what they own.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The Global Health Access Trust is a charity working with leaders in health and governance to reach people who are too often displaced, overlooked, or abandoned.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Our mission is simple: to build lasting health systems, uplift communities, and ensure care for generations to come.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {IMPACT_STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {index === 0 ? "Governance" : index === 1 ? "Legacy" : "Mission"}
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

        {/* What We Fund */}
        <section className="py-20 md:py-28 lg:py-36 border-t border-border/40">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-center mb-8 text-foreground leading-tight">
              What We Fund
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-center text-muted-foreground mb-16 leading-relaxed">
              The Global Health Access Trust is established for exclusively charitable purposes in accordance with the laws of England and Wales. The Trust's funding mandate encompasses the following five areas of lawful, equitable, and public-spirited intervention:
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
                  Learn More About Our Healthcare Programs
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};
