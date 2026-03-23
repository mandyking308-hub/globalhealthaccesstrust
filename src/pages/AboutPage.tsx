import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export const AboutPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-accent/20 to-gold/10">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Our vision is unwavering
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              The Global Health Access Trust was established to uphold one of the most 
              sacred obligations of civil society: to protect the dignity of every human 
              life through access to health, healing, and hope—without border, bias, or exclusion.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Not charity. Legacy in motion.
              </h2>
              <div className="prose-professional space-y-6">
                <p>
                  Anchored in the enduring principles of duty, legacy, and public service, 
                  we exist not to make noise—but to make a difference. Ours is not a campaign. 
                  It is a trust. A covenant between conscience and capacity, designed to stand 
                  the test of time.
                </p>
                <p>
                  We are governed not by trend or transaction, but by responsibility to those 
                  left behind—the displaced, the overlooked, the abandoned. We act with the 
                  same resolve one would expect from the stewards of great estates or the 
                  custodians of national legacy. Because that is what we are.
                </p>
                <p>
                  Founded by leaders in global health, governance, and systems change, the 
                  Trust is built to convene those who seek meaning beyond wealth. Individuals 
                  and institutions who understand that a life well lived is one that uplifts others.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="card-professional text-center p-6">
                  
                  <h3 className="font-semibold text-lg mb-2">Principled</h3>
                  <p className="text-sm text-muted-foreground">
                    Governed by unwavering ethical standards
                  </p>
                </Card>
                
                <Card className="card-professional text-center p-6">
                  
                  <h3 className="font-semibold text-lg mb-2">Enduring</h3>
                  <p className="text-sm text-muted-foreground">
                    Built to stand the test of time
                  </p>
                </Card>
                
                <Card className="card-professional text-center p-6">
                  
                  <h3 className="font-semibold text-lg mb-2">Uncompromising</h3>
                  <p className="text-sm text-muted-foreground">
                    Never wavering in our commitment
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Legal Status */}
      <section className="py-16">
        <div className="container-section">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">
              Legal Status & Accountability
            </h2>
            <div className="prose-professional text-center">
              <p className="text-lg mb-8">
                Global Health Access Trust is a charitable trust established in accordance 
                with the laws of England and Wales. Charity Commission registration is 
                formally in progress and expected in 2025.
              </p>
              
              <div className="bg-accent/30 border border-accent rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Registered Correspondence Address
                </h3>
                <div className="text-muted-foreground">
                  <p>Global Health Access Trust</p>
                  <p>2 Harley Street, London</p>
                  <p>England, United Kingdom</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  This address is used for official correspondence, legal service, 
                  and charity documentation.
                </p>
              </div>
              
              <p className="mt-8">
                All donations, legacies, and grants received are held and applied for 
                exclusively charitable purposes, as defined under section 3 of the 
                Charities Act 2011. The Trust is governed by a formal constitution, 
                subject to oversight by its Trustees, and operates under legal and 
                fiduciary obligations consistent with public trust and institutional governance.
              </p>
              
              <blockquote className="text-2xl font-serif italic text-primary mt-8 text-left">
                "It is chartered under law, grounded in public duty, and built to endure."
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};