import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
            <img src={heroImage} alt="Diverse global healthcare workers providing medical care worldwide - doctors, nurses, and community health workers treating patients across different countries and cultures" />
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
                  <ArrowRight className="ml-2 w-5 h-5" />
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

        {/* Impact Highlights Section */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold mb-4" style={{color: 'var(--c-text)'}}>
                Our Impact
              </h2>
            </div>
            
            <div className="impact-grid">
              {NEW_IMPACT_STATS.map((stat, index) => {
                const IconComponent = getIconComponent(stat.icon);
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4" style={{color: 'var(--c-highlight)'}}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <p className="text-lg leading-relaxed" style={{color: 'var(--c-text)'}}>
                      {stat.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Commission a Project Section */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Commission a Project
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                With GHAT, you don't just make a donation — you shape a targeted health project that reflects your values. Choose where your support goes, follow every milestone, and receive real-world updates from the field. Transparent. Personal. Measurable.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">Design Your Project</h3>
                  <p className="text-muted-foreground">
                    Set region, focus area, and intended impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">Track Progress in Real Time</h3>
                  <p className="text-muted-foreground">
                    Milestones, photos, updates, field notes — all inside your secure dashboard.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">Complete Visibility</h3>
                  <p className="text-muted-foreground">
                    Every pound allocated with clarity and integrity.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link to="/commission-projects">
                <Button size="lg" variant="default">
                  Learn More About Commissioned Projects
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Human Story Section */}
        <section className="section" style={{background: 'var(--c-alt)'}}>
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold mb-6" style={{color: 'var(--c-text)'}}>
                Why It Matters
              </h2>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto" style={{color: 'var(--c-muted)'}}>
                When conflict forced Amina's family to flee, they lost access to medical care. Through our partners, she now receives regular treatment for her child. This is why we exist — to restore dignity and care to the most overlooked.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <img 
                  src={familyMedicalCareImage} 
                  alt="Displaced mother and child receiving compassionate medical care from healthcare worker - demonstrating restored access to healthcare for vulnerable families"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-sm font-semibold" style={{color: 'var(--c-text)'}}>Healthcare Access</p>
              </div>
              <div className="text-center">
                <img 
                  src={ukraineConflictImage} 
                  alt="Ukraine humanitarian crisis response - medical aid workers providing healthcare assistance to displaced families and civilians affected by conflict"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-sm font-semibold" style={{color: 'var(--c-text)'}}>Ukraine Crisis Response</p>
              </div>
              <div className="text-center md:col-span-2 lg:col-span-1">
                <img 
                  src={africaConflictImage} 
                  alt="African humanitarian aid response - displaced families receiving essential medical care and health services in refugee settings across Africa"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-sm font-semibold" style={{color: 'var(--c-text)'}}>Africa Humanitarian Aid</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold mb-4" style={{color: 'var(--c-text)'}}>
                Our Vision
              </h2>
              <div className="section-content max-w-4xl mx-auto space-y-6 text-center" style={{color: 'var(--c-muted)'}}>
                <p className="text-lg leading-relaxed">
                  We believe no one should be denied healthcare or dignity because of where they were born or what they own.
                </p>
                <p className="text-lg leading-relaxed">
                  The Global Health Access Trust is a charity working with leaders in health and governance to reach people who are too often displaced, overlooked, or abandoned.
                </p>
                <p className="text-lg leading-relaxed">
                  Our mission is simple: to build lasting health systems, uplift communities, and ensure care for generations to come.
                </p>
              </div>
            </div>
            
            <div className="grid-3">
              {IMPACT_STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-3">
                    <span className="text-sm font-semibold uppercase tracking-wider" style={{color: 'var(--c-highlight)'}}>
                      {index === 0 ? "Governance" : index === 1 ? "Legacy" : "Mission"}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{color: 'var(--c-highlight)'}}>
                    {stat.number}
                  </h3>
                  <div className="text-lg font-semibold mb-2" style={{color: 'var(--c-text)'}}>
                    {stat.label}
                  </div>
                  <p style={{color: 'var(--c-muted)'}}>
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Five Areas Section */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold mb-4" style={{color: 'var(--c-text)'}}>
                What We Fund
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{color: 'var(--c-muted)'}}>
                The Global Health Access Trust is established for exclusively charitable purposes in accordance with the laws of England and Wales. The Trust's funding mandate encompasses the following five areas of lawful, equitable, and public-spirited intervention:
              </p>
            </div>
            
            <div className="pillars-grid">
              {PROGRAM_AREAS.slice(0, 5).map((area, index) => {
                const IconComponent = getIconComponent(area.icon);
                return (
                  <div key={area.id} className="card">
                    <div className="w-10 h-10 flex items-center justify-center mb-3" style={{color: 'var(--c-highlight)'}}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="card__divider"></div>
                    <h3 className="card__title pillar__title text-xl font-semibold mb-3">
                      {area.title}
                    </h3>
                    <p className="card__text leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/what-we-do">
                <button className="btn--secondary">
                  Learn More About Our Healthcare Programs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

// Helper function to get icon components
const getIconComponent = (iconName: string) => {
  const icons = {
    Heart,
    Users,
    Globe,
    TrendingUp,
    ArrowRight
  };
  return icons[iconName as keyof typeof icons] || Heart;
};