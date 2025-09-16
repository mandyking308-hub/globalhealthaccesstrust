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
      <section className="hero--full relative flex items-center justify-center overflow-hidden">
        <div 
          className="hero__image absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0" style={{background: 'var(--c-primary)', opacity: 0.7}}></div>
        </div>
        
        <div className="relative z-10 container text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif font-bold mb-6 text-white">
              Access to Health is Justice — Not Charity.
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
              The Global Health Access Trust upholds the sacred obligation to protect 
              human dignity through healthcare access, without border, bias, or exclusion.
            </p>
            <div className="cta-row max-w-xs mx-auto">
              <Link to="/donate">
                <Button size="lg" variant="secondary" className="btn--primary text-lg w-full">
                  Donate Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="section" style={{background: 'var(--c-alt)'}}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold mb-4" style={{color: 'var(--c-text)'}}>
              Our Impact at a Glance
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{color: 'var(--c-muted)'}}>
              Principled. Enduring. Uncompromising. Our commitment to healthcare justice 
              reaches across borders to uphold human dignity.
            </p>
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

      {/* Five Pillars Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold mb-4" style={{color: 'var(--c-text)'}}>
              Five Areas of Intervention
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{color: 'var(--c-muted)'}}>
              Our charitable mandate encompasses lawful, equitable intervention 
              across these five critical areas of global health access.
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

      {/* Testimonials */}
      <section className="section" style={{background: 'var(--c-alt)'}}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold mb-4" style={{color: 'var(--c-text)'}}>
              Voices of Impact
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{color: 'var(--c-muted)'}}>
              Hear from healthcare professionals and communities whose lives 
              have been transformed through our principled approach to global health access.
            </p>
          </div>
          
          <div className="grid-2 max-w-6xl mx-auto">
            {TESTIMONIALS.slice(0, 2).map((testimonial, index) => (
              <div key={index} className="card">
                <blockquote className="text-lg leading-relaxed mb-6" style={{color: 'var(--c-text)'}}>
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{background: 'color-mix(in srgb, var(--c-primary) 10%, white)'}}>
                    <Users className="w-6 h-6" style={{color: 'var(--c-primary)'}} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{color: 'var(--c-text)'}}>{testimonial.author}</div>
                    <div className="text-sm" style={{color: 'var(--c-muted)'}}>
                      {testimonial.role}
                      {testimonial.organization && `, ${testimonial.organization}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section text-center" style={{background: 'var(--c-primary)', color: '#fff'}}>
        <div className="container">
          <h2 className="font-serif font-bold mb-6 text-white">
            Support Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Your donation enables us to uphold healthcare as a matter of justice, not generosity.
          </p>
          <div className="cta-row max-w-xs mx-auto">
            <Link to="/donate">
              <button className="btn--primary w-full">
                Make a Donation
                <Heart className="ml-2 w-5 h-5" />
              </button>
            </Link>
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