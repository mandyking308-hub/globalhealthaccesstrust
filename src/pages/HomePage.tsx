import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IMPACT_STATS, TESTIMONIALS, PROGRAM_AREAS } from "@/lib/constants";
import heroImage from "@/assets/hero-global-health-access.jpg";

export const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>
        
        <div className="relative z-10 container-section text-center text-white">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Access to health is justice — not charity.
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
              The Global Health Access Trust upholds the sacred obligation to protect 
              human dignity through healthcare access, without border, bias, or exclusion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/donate">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  Donate Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                  Learn About Our Mission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-muted/30">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Our Impact at a Glance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Principled. Enduring. Uncompromising. Our commitment to healthcare justice 
              reaches across borders to uphold human dignity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {IMPACT_STATS.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up">
                <div className="text-5xl md:text-6xl font-bold text-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold mb-2">
                  {stat.label}
                </div>
                <p className="text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Areas Preview */}
      <section className="py-16">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Five Areas of Intervention
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our charitable mandate encompasses lawful, equitable intervention 
              across these five critical areas of global health access.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAM_AREAS.slice(0, 6).map((area, index) => {
              const IconComponent = getIconComponent(area.icon);
              return (
                <Card key={area.id} className="card-professional">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="text-xl font-semibold">{area.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/what-we-do">
              <Button variant="outline" size="lg">
                Explore All Programme Areas
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-accent/30">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Voices of Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from healthcare professionals and communities whose lives 
              have been transformed through our principled approach to global health access.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.slice(0, 2).map((testimonial, index) => (
              <Card key={index} className="card-elevated">
                <CardContent className="p-8">
                  <blockquote className="text-lg leading-relaxed mb-6 text-foreground/90">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                        {testimonial.organization && `, ${testimonial.organization}`}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 primary-gradient text-primary-foreground">
        <div className="container-section text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Whether through donation, partnership, or advocacy, your support enables 
            us to uphold healthcare as a matter of justice, not generosity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/donate">
              <Button size="lg" variant="secondary" className="px-8 py-4">
                Make a Donation
                <Heart className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button size="lg" variant="outline" className="px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Get Involved
                <Users className="ml-2 w-5 h-5" />
              </Button>
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