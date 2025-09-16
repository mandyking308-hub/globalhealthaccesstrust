import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IMPACT_STATS, TESTIMONIALS, PROGRAM_AREAS } from "@/lib/constants";
import heroImage from "@/assets/hero-bright-healthcare.jpg";

export const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="hero hero--overlay hero--bg"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero__image" style={{ display: 'none' }}>
          <img src={heroImage} alt="Global Health Access" />
        </div>
        
        <div className="hero__overlay">
          <h1 className="font-serif font-bold mb-6 text-center">
            "Access to health is not an act of generosity—it is a matter of justice."
          </h1>
          <p className="text-xl mb-8 leading-relaxed text-center">
            The Global Health Access Trust was established to uphold one of the most sacred obligations of civil society: to protect the dignity of every human life through access to health, healing, and hope—without border, bias, or exclusion.
          </p>
          <div className="cta-row max-w-xs mx-auto mb-6">
            <Link to="/donate">
              <Button size="lg" variant="secondary" className="btn--navy text-lg w-full">
                Donate Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section" style={{background: 'var(--c-alt)'}}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold mb-4" style={{color: 'var(--c-text)'}}>
              Our vision is unwavering
            </h2>
            <div className="max-w-4xl mx-auto space-y-6" style={{color: 'var(--c-muted)'}}>
              <p className="text-lg leading-relaxed">
                Anchored in the enduring principles of duty, legacy, and public service, we exist not to make noise—but to make a difference. Ours is not a campaign. It is a trust. A covenant between conscience and capacity, designed to stand the test of time.
              </p>
              <p className="text-lg leading-relaxed">
                We are governed not by trend or transaction, but by responsibility to those left behind—the displaced, the overlooked, the abandoned. We act with the same resolve one would expect from the stewards of great estates or the custodians of national legacy. Because that is what we are.
              </p>
              <p className="text-lg leading-relaxed">
                Founded by leaders in global health, governance, and systems change, the Trust is built to convene those who seek meaning beyond wealth. Individuals and institutions who understand that a life well lived is one that uplifts others.
              </p>
              <p className="text-lg leading-relaxed">
                We believe in a world in which no human being is denied care or dignity because of where they were born, what they own, or what they lack.
              </p>
              <p className="text-lg leading-relaxed font-semibold">
                This is not charity. This is legacy in motion.
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
                Explore All Programme Areas
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="section" style={{background: 'var(--c-alt)'}}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold mb-4" style={{color: 'var(--c-text)'}}>
              Welcome to the Global Health Access Trust
            </h2>
          </div>
          
          <div className="grid-3 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--c-highlight)'}}>
                Principled.
              </h3>
              <p style={{color: 'var(--c-muted)'}}>
                Unwavering commitment to ethical standards and institutional integrity in all our work.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--c-highlight)'}}>
                Enduring.
              </h3>
              <p style={{color: 'var(--c-muted)'}}>
                Built to stand the test of time, serving communities for generations to come.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--c-highlight)'}}>
                Uncompromising.
              </h3>
              <p style={{color: 'var(--c-muted)'}}>
                Never wavering in our commitment to healthcare as a matter of justice, not charity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
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