import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

export const DonorGuidePage = () => {
  const features = [
    {
      title: "Pledge or Discuss Further Support",
      body: "Submit a new expression of interest or discuss an additional contribution with the Trust before any payment, transfer or delivery takes place.",
    },
    {
      title: "My Projects",
      body: "View commissioned projects connected to your account, their status and the information made available for each project.",
    },
    {
      title: "Project Agreements",
      body: "Review the charter, funding terms or other agreement associated with an approved commissioned project.",
    },
    {
      title: "Commission a New Public-Benefit Project",
      body: "Submit a proposition describing the need, location, intended outcome, likely resources, budget and timing for Trustee review.",
    },
    {
      title: "Project Messages and Updates",
      body: "Communicate securely with the Trust and receive appropriate milestones, approved evidence and delivery updates.",
    },
    {
      title: "Contribution History",
      body: "Review accepted and reconciled financial contributions and other account information recorded by the Trust.",
    },
    {
      title: "Support and Preferences",
      body: "Request assistance and manage communications, privacy and account preferences.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col donor-portal">
      <Header />
      <main className="flex-grow">
        <section className="border-b border-foreground/10 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14">
              <span className="portal-eyebrow md:mt-2">Donor Portal</span>
              <div className="max-w-3xl">
                <h1 className="no-display text-foreground mb-6" style={{ fontFamily: "var(--font-serif)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(40px, 5.4vw, 78px)", lineHeight: 0.98 }}>
                  Your Secure Donor Portal
                </h1>
                <p className="text-[13px] uppercase tracking-[0.22em] font-bold text-primary mb-8">
                  Global Health Access Trust
                </p>
                <p className="text-[18px] text-foreground leading-relaxed mb-4 max-w-2xl">
                  The donor portal is the secure workspace for supporters whose relationship with the Trust has progressed beyond an initial pledge or enquiry.
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                  Public support begins with a pledge. The Trust then determines the verification, due-diligence, agreement and acceptance process appropriate to the proposed funding, asset, service or other contribution.
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                  Where a contribution can be accepted, the Trust confirms the approved purpose and provides the appropriate secure payment, transfer or delivery route. No contribution is treated as accepted merely because an account or proposition has been created.
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed max-w-2xl">
                  The portal provides access to commissioned projects, agreements, messages, accepted contribution history, support and account preferences while protecting confidentiality, safeguarding and personal information.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link to="/donor-login">
                    <Button className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.1em] text-[13px] font-semibold uppercase px-8">
                      Login to Portal
                    </Button>
                  </Link>
                  <Link to="/donate#pledge-form">
                    <Button variant="outline" className="h-11 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.1em] text-[13px] font-semibold uppercase px-8">
                      Pledge a Contribution
                    </Button>
                  </Link>
                  <Link to="/contact-the-trust">
                    <Button variant="outline" className="h-11 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.1em] text-[13px] font-semibold uppercase px-8">
                      Contact the Trust
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-b border-foreground/10 bg-secondary/40">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14 mb-14">
              <span className="portal-eyebrow md:mt-2">Ways to Support</span>
              <h2 className="text-foreground max-w-3xl" style={{ fontWeight: 500, fontSize: "clamp(26px, 2.8vw, 40px)", letterSpacing: "-0.018em", lineHeight: 1.2 }}>
                Three Routes to Structured Support
              </h2>
            </div>

            <div className="md:pl-[196px] grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="section-container">
                <h3 className="text-foreground mb-3">Pledge a Contribution</h3>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed">
                  Offer funding, time, expertise, equipment, premises, technology, services, logistics, relationships or a combination of resources for initial review.
                </p>
              </div>
              <div className="section-container">
                <h3 className="text-foreground mb-3">Support Approved Work</h3>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed">
                  Following verification and formal acceptance, support the Trust's general charitable purposes, an approved area of work or a defined project.
                </p>
              </div>
              <div className="section-container">
                <h3 className="text-foreground mb-3">Commission a New Project</h3>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed">
                  Create a public-benefit project proposition through the secure dashboard. Propositions proceed through scoping, feasibility, due diligence and Trustee approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14 mb-14">
              <span className="portal-eyebrow md:mt-2">Dashboard</span>
              <h2 className="text-foreground max-w-3xl" style={{ fontWeight: 500, fontSize: "clamp(26px, 2.8vw, 40px)", letterSpacing: "-0.018em", lineHeight: 1.2 }}>
                What You Can Do in the Donor Portal
              </h2>
            </div>

            <div className="md:pl-[196px] grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-0 border-t border-foreground/12">
              {features.map((feature, index) => (
                <div key={feature.title} className={`py-8 border-b border-foreground/12 ${index % 2 === 0 ? "md:border-r md:pr-14" : ""}`}>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary block mb-3">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-foreground mb-3" style={{ fontSize: "clamp(19px, 1.5vw, 23px)", fontWeight: 600 }}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[15.5px]">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-b border-foreground/10 bg-secondary/40">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14">
              <span className="portal-eyebrow md:mt-2">Verification</span>
              <div className="max-w-3xl">
                <h2 className="text-foreground mb-6" style={{ fontWeight: 500, fontSize: "clamp(26px, 2.8vw, 40px)", letterSpacing: "-0.018em", lineHeight: 1.2 }}>
                  Review Before Acceptance
                </h2>
                <p className="text-[16.5px] text-foreground leading-relaxed mb-5">
                  The Trust applies proportionate verification and due diligence before accepting money, assets, services or other significant resources.
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed mb-3">
                  Depending on the contribution, the Trust may ask about identity, organisation, authority, source and nature of funds or assets, sanctions exposure, restrictions, ownership, condition, delivery costs or intended use.
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed">
                  Payment instructions, transfer arrangements or delivery details are provided only after the appropriate review and formal acceptance process.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14">
              <span className="portal-eyebrow md:mt-2">Recognition</span>
              <div className="max-w-3xl">
                <h2 className="text-foreground mb-6" style={{ fontWeight: 500, fontSize: "clamp(26px, 2.8vw, 40px)", letterSpacing: "-0.018em", lineHeight: 1.2 }}>
                  Recognition, Privacy &amp; Choice
                </h2>
                <p className="text-[16.5px] text-foreground leading-relaxed mb-5">
                  Recognition is based on the supporter's wishes, the nature of the contribution and the dignity of the work—not simply on monetary value.
                </p>
                <ul className="space-y-2 text-[15.5px] text-muted-foreground leading-relaxed mb-6">
                  <li>• Public recognition where appropriate</li>
                  <li>• Recognition by organisation or family name</li>
                  <li>• Limited recognition within project records</li>
                  <li>• Complete anonymity</li>
                </ul>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed mb-8">
                  Naming, acknowledgement or project involvement does not confer ownership, governance authority or control over charitable decisions.
                </p>
                <Link to="/donor-recognition">
                  <Button variant="outline" className="h-11 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.1em] text-[13px] font-semibold uppercase px-8">
                    View Donor Recognition
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14">
              <span className="portal-eyebrow md:mt-2">Questions?</span>
              <div className="max-w-3xl">
                <p className="text-[16.5px] text-foreground leading-relaxed mb-8">
                  Existing supporters should use secure dashboard messaging. New supporters may submit a pledge or contact the Trust to discuss the appropriate route.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/donor-login">
                    <Button className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.1em] text-[13px] font-semibold uppercase px-8">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Link to="/donate#pledge-form">
                    <Button variant="outline" className="h-11 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.1em] text-[13px] font-semibold uppercase px-8">
                      Pledge a Contribution
                    </Button>
                  </Link>
                  <Link to="/contact-the-trust">
                    <Button variant="outline" className="h-11 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.1em] text-[13px] font-semibold uppercase px-8">
                      Contact the Trust
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
