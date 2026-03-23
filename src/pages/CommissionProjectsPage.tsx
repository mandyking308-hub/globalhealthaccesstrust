import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import emergencyReliefHero from "@/assets/emergency-relief-hero.jpg";

export const CommissionProjectsPage = () => {
  return (
    <>
      <SEO
        title="Commission a Project - Global Health Access Trust"
        description="Direct your philanthropy with clarity, control, and heart. Commission bespoke health interventions with complete transparency and real-time tracking."
        canonical="/commission-projects"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section 
          className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(5, 21, 47, 0.7), rgba(5, 21, 47, 0.7)), url(${emergencyReliefHero})` }}
        >
          <div className="container max-w-4xl text-center px-4 sm:px-6 py-12 sm:py-16">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Philanthropy With Clarity, Control, and Heart
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Our commissioned projects model gives you the freedom to direct your impact — and the transparency to watch it unfold.
            </p>
          </div>
        </section>

        {/* Why It Works Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
          <div className="container max-w-6xl px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">
              A New Standard in High-Integrity Philanthropy
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              With GHAT, you don't just make a donation — you shape a targeted health project that reflects your values. Choose where your support goes, follow every milestone, and receive real-world updates from the field.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  ,
                  title: "Direct Philanthropic Control",
                  description: "Choose your region, intervention type, and intended impact with precision."
                },
                {
                  ,
                  title: "Real-Time Visibility",
                  description: "Track progress through photos, field notes, and milestone updates."
                },
                {
                  ,
                  title: "Evidence of Progress",
                  description: "Receive documented proof of every stage from deployment to completion."
                },
                {
                  ,
                  title: "Personal Connection",
                  description: "Add dedications and witness the human impact of your contribution."
                },
                {
                  ,
                  title: "No Bureaucracy",
                  description: "Streamlined process from request to implementation to reporting."
                },
                {
                  ,
                  title: "High-Integrity Reporting",
                  description: "Complete spending logs and formal impact certificates upon completion."
                }
              ].map((feature, index) => (
                <Card key={index} className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="pt-4 sm:pt-6">
                    <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-accent mb-3 sm:mb-4" />
                    <h3 className="font-serif text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container max-w-5xl px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-16">
              How Commissioned Projects Work
            </h2>

            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Submit Your Project Request",
                  description: "Choose region, intervention type, and budget. Add a personal dedication if you wish."
                },
                {
                  number: "02",
                  title: "We Scope and Approve",
                  description: "Receive timelines, feasibility confirmation, and expected milestones within days."
                },
                {
                  number: "03",
                  title: "Your Project Begins",
                  description: "Work is deployed with precision and speed by our experienced field teams."
                },
                {
                  number: "04",
                  title: "Live Project Tracking",
                  description: "Photos, notes, spending logs, and milestone updates appear automatically in your dashboard."
                },
                {
                  number: "05",
                  title: "Completion Certificate",
                  description: "A formal impact record is issued and stored permanently in your secure portal."
                }
              ].map((step, index) => (
                <Card key={index} className="border-l-4 border-l-accent shadow-soft">
                  <CardContent className="flex gap-6 p-8">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="font-serif text-2xl font-bold text-accent">{step.number}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-lg">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container max-w-4xl text-center px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Meaningful change begins with a single project.
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Commission your impact today.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Log In
                
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};