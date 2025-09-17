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
            <div className="text-center mb-6">
              <h1 className="font-serif font-bold text-center text-[32px] sm:text-[42px] lg:text-[56px]" style={{ color: '#FFD700' }}>
                Global Health Access Trust
              </h1>
            </div>
            <h2 className="font-serif font-bold mb-6 text-center">
              A charity building lasting access to healthcare.
            </h2>
            <div className="cta-row max-w-xs mx-auto mb-6">
              <Link to="/donate">
                <Button size="sm" variant="default" className="w-full">
                  Donate Now
                  <ArrowRight className="ml-2 w-4 h-4" />
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