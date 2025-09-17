import { Heart, GraduationCap, Building, FileText, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PROGRAM_AREAS } from "@/lib/constants";

// Import hero images
import healthcareAccessHero from "@/assets/healthcare-access-hero.jpg";
import educationTrainingHero from "@/assets/education-training-hero.jpg";
import systemsStrengtheningHero from "@/assets/systems-strengthening-hero.jpg";
import policyResearchHero from "@/assets/policy-research-hero.jpg";
import emergencyReliefHero from "@/assets/emergency-relief-hero.jpg";

const getIconComponent = (iconName: string) => {
  const icons = {
    Heart,
    GraduationCap, 
    Building,
    FileText,
    AlertTriangle
  };
  return icons[iconName as keyof typeof icons] || Heart;
};

const getHeroImage = (areaId: string) => {
  const images = {
    "healthcare-access": healthcareAccessHero,
    "education-training": educationTrainingHero,
    "systems-strengthening": systemsStrengtheningHero,
    "policy-research": policyResearchHero,
    "emergency-relief": emergencyReliefHero
  };
  return images[areaId as keyof typeof images] || healthcareAccessHero;
};

export const WhatWeDoPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-gold/5">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              What We Fund
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              The Global Health Access Trust is established for exclusively charitable purposes 
              in accordance with the laws of England and Wales, specifically the advancement 
              of health and the preservation of life.
            </p>
          </div>
        </div>
      </section>

      {/* Funding Mandate */}
      <section className="py-16">
        <div className="container-section">
          <div className="max-w-4xl mx-auto prose-professional mb-16">
            <p className="text-lg text-center">
              Funds administered by the Trust shall be applied solely in furtherance of its 
              charitable objectives, with all grant-making, programme activity, and public 
              engagement conducted under the strict supervision of its appointed Trustees, 
              in accordance with principles of public trust, fiduciary duty, and institutional neutrality.
            </p>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Five Areas of Lawful Intervention
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The Trust's funding mandate encompasses these areas of equitable, 
              public-spirited intervention:
            </p>
          </div>
          
          {/* Program Areas */}
          <div className="space-y-16">
            {PROGRAM_AREAS.map((area, index) => {
              const IconComponent = getIconComponent(area.icon);
              const heroImage = getHeroImage(area.id);
              return (
                <div key={area.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Content Section */}
                  <div className={`order-2 lg:order-${index % 2 === 1 ? '2' : '1'}`}>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-gold" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gold mb-1">
                          {['I', 'II', 'III', 'IV', 'V'][index]}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold">
                          {area.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {area.description}
                    </p>
                    
                    <div className="mb-8">
                      <h4 className="font-semibold mb-4">Example Outcomes:</h4>
                      <ul className="space-y-2">
                        {area.outcomes.map((outcome, outcomeIndex) => (
                          <li key={outcomeIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Image Section */}
                  <div className={`order-1 lg:order-${index % 2 === 1 ? '1' : '2'}`}>
                    <Card className="card-elevated overflow-hidden w-full">
                      <CardContent className="p-0">
                        <div className="aspect-video w-full relative overflow-hidden bg-muted/20">
                          <img 
                            src={heroImage} 
                            alt={`${area.title} - Healthcare illustration`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            style={{ minHeight: '240px' }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                        </div>
                        <div className="p-6 lg:p-8">
                          <blockquote className="text-base lg:text-lg font-serif italic text-primary leading-relaxed">
                            "All activities shall be conducted in compliance with applicable 
                            health, safety, and regulatory standards, with preference given to 
                            interventions that are culturally appropriate, legally permitted, 
                            and professionally governed."
                          </blockquote>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Governance Standards */}
      <section className="py-16 bg-muted/30">
        <div className="container-section">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">
              Governance and Conditions of Grant-Making
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="card-professional">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Due Diligence</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All disbursements must be resolved by the Trustees in accordance with the 
                    governing document of the Trust. Due diligence shall be undertaken for all 
                    partners and recipients, with reference to AML, counter-terrorism, and 
                    compliance statutes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-professional">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Public Benefit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All expenditures must be proportionate, purpose-driven, and evidentially 
                    justified. No person may receive private benefit except where clearly 
                    incidental and legally permitted under Charity Commission guidance.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <blockquote className="text-xl font-serif italic text-primary mb-8">
                "The Trust exists to discharge its public duty with decorum, discretion, 
                and diligence—never to impress, but always to serve."
              </blockquote>
              
              <Link to="/get-involved">
                <Button size="lg" variant="default">
                  Support Our Mission
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};