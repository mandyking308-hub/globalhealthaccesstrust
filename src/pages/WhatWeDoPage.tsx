import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PROGRAM_AREAS } from "@/lib/constants";

import healthcareAccessHero from "@/assets/healthcare-access-hero.jpg";
import educationTrainingHero from "@/assets/education-training-hero.jpg";
import systemsStrengtheningHero from "@/assets/systems-strengthening-hero.jpg";
import policyResearchHero from "@/assets/policy-research-hero.jpg";
import emergencyReliefHero from "@/assets/emergency-relief-hero.jpg";

const getHeroImage = (areaId: string) => {
  const images: Record<string, string> = {
    "healthcare-access": healthcareAccessHero,
    "education-training": educationTrainingHero,
    "systems-strengthening": systemsStrengtheningHero,
    "policy-research": policyResearchHero,
    "emergency-relief": emergencyReliefHero
  };
  return images[areaId] || healthcareAccessHero;
};

export const WhatWeDoPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-gold/5">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="mb-6">What We Fund</h1>
          <p className="text-[15px] text-muted-foreground leading-[1.7] max-w-3xl">
            The Global Health Access Trust is established for exclusively charitable purposes 
            in accordance with the laws of England and Wales, specifically the advancement 
            of health and the preservation of life.
          </p>
        </div>
      </section>

      {/* Funding Mandate Intro */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="section-container mb-12">
            <p className="text-[15px] text-muted-foreground leading-[1.7]">
              Funds administered by the Trust shall be applied solely in furtherance of its 
              charitable objectives, with all grant-making, programme activity, and public 
              engagement conducted under the strict supervision of its appointed Trustees, 
              in accordance with principles of public trust, fiduciary duty, and institutional neutrality.
            </p>
          </div>
          
          <h2 className="mb-4">Five Areas of Lawful Intervention</h2>
          <p className="text-[15px] text-muted-foreground mb-10 leading-[1.7] max-w-3xl">
            The Trust's funding mandate encompasses these areas of equitable, 
            public-spirited intervention:
          </p>
        </div>
      </section>

      {/* Program Areas — grid of cards with images */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAM_AREAS.map((area, index) => {
              const heroImage = getHeroImage(area.id);
              return (
                <div key={area.id} className="section-container !p-0 overflow-hidden">
                  <img 
                    src={heroImage} 
                    alt={`${area.title} - Healthcare illustration`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                      {['I', 'II', 'III', 'IV', 'V'][index]}
                    </div>
                    <h3 className="mb-3 text-foreground">{area.title}</h3>
                    <p className="text-[15px] text-muted-foreground leading-[1.7] mb-4">
                      {area.description}
                    </p>
                    <h4 className="text-sm font-medium mb-3 text-foreground">Example Outcomes:</h4>
                    <ul className="space-y-2">
                      {area.outcomes.map((outcome, outcomeIndex) => (
                        <li key={outcomeIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-[hsl(var(--gold))] rounded-full mt-2 mr-2.5 flex-shrink-0" />
                          <span className="text-[13px] text-muted-foreground leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Governance Standards */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-8">Governance and Conditions of Grant-Making</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Due Diligence</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                All disbursements must be resolved by the Trustees in accordance with the 
                governing document of the Trust. Due diligence shall be undertaken for all 
                partners and recipients, with reference to AML, counter-terrorism, and 
                compliance statutes.
              </p>
            </div>
            
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Public Benefit</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                All expenditures must be proportionate, purpose-driven, and evidentially 
                justified. No person may receive private benefit except where clearly 
                incidental and legally permitted under Charity Commission guidance.
              </p>
            </div>
          </div>
          
          <div className="section-container">
            <blockquote className="text-[15px] italic text-primary leading-[1.7] mb-6">
              "The Trust exists to discharge its public duty with decorum, discretion, 
              and diligence—never to impress, but always to serve."
            </blockquote>
            
            <Link to="/get-involved">
              <Button size="lg" variant="default">
                Support Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
