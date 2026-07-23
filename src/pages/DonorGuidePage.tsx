import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

export const DonorGuidePage = () => {
  const features = [
    {
      title: "Make a Donation",
      body: "Access the Trust's approved donation route and review contributions associated with your account.",
    },
    {
      title: "My Projects",
      body: "View commissioned projects connected to your account, their status and the information made available for each project.",
    },
    {
      title: "Project Agreements",
      body: "Review the project charter or agreement associated with an approved commissioned project.",
    },
    {
      title: "Commission a New Project",
      body: "Submit a project by defining its location, purpose, intervention, intended impact, budget, urgency and optional dedication.",
    },
    {
      title: "Project Messages and Updates",
      body: "Communicate securely with the Trust and receive appropriate project milestones, approved evidence and delivery updates.",
    },
    {
      title: "Donation History",
      body: "Review recorded contributions and associated account information.",
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
        {/* Hero */}
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
                  Supporters may contribute to an active project, make a general donation to the Trust, or create and commission a new charitable project.
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                  The secure donor portal provides access to commissioned projects, project agreements, messages, contribution history, support and account preferences.
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                  An account is required to commission and manage a project through the dashboard. General donations, active-project support and public enquiries can begin directly through the website.
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed max-w-2xl">
                  The portal provides appropriate visibility while protecting personal information, safeguarding, confidentiality and the dignity of the people involved.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link to="/donor-login">
                    <Button className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.1em] text-[13px] font-semibold uppercase px-8">
                      Login to Portal
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

        {/* Ways to Support */}
        <section className="py-20 md:py-24 border-b border-foreground/10 bg-secondary/40">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14 mb-14">
              <span className="portal-eyebrow md:mt-2">Ways to Support</span>
              <h2 className="text-foreground max-w-3xl" style={{ fontWeight: 500, fontSize: "clamp(26px, 2.8vw, 40px)", letterSpacing: "-0.018em", lineHeight: 1.2 }}>
                Three Routes to Meaningful Support
              </h2>
            </div>

            <div className="md:pl-[196px] grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="section-container">
                <h3 className="text-foreground mb-3">Support an Active Project</h3>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed">
                  Contribute to an approved project displayed on the Trust's website and follow the public information made available as it progresses.
                </p>
              </div>
              <div className="section-container">
                <h3 className="text-foreground mb-3">Support the Trust's General Work</h3>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed">
                  Make an unrestricted contribution that the Trustees can apply where charitable need and opportunity are greatest.
                </p>
              </div>
              <div className="section-container">
                <h3 className="text-foreground mb-3">Commission a New Project</h3>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed">
                  Create and submit a project through the secure donor dashboard by defining its location, purpose, intervention, budget and urgency. Submitted projects proceed through scoping, due diligence and Trustee approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Features */}
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

        {/* Recognition */}
        <section className="py-20 md:py-24 border-b border-foreground/10 bg-secondary/40">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14">
              <span className="portal-eyebrow md:mt-2">Recognition</span>
              <div className="max-w-3xl">
                <h2 className="text-foreground mb-6" style={{ fontWeight: 500, fontSize: "clamp(26px, 2.8vw, 40px)", letterSpacing: "-0.018em", lineHeight: 1.2 }}>
                  Recognition, Privacy &amp; Choice
                </h2>
                <p className="text-[16.5px] text-foreground leading-relaxed mb-5">
                  Recognition is based on the supporter's wishes, the nature of the contribution and the dignity of the work—not simply on the amount given.
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed mb-3">Supporters may choose:</p>
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

        {/* Final Notes */}
        <section className="py-20 md:py-24 border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14">
              <span className="portal-eyebrow md:mt-2">Final Notes</span>
              <div className="max-w-3xl space-y-5">
                <p className="text-[16.5px] text-foreground leading-relaxed">
                  The portal provides a secure record of information associated with a supporter's account, contributions and commissioned projects.
                </p>
                <p className="text-[16.5px] text-muted-foreground leading-relaxed">
                  Supporters of active projects receive the public or secure reporting appropriate to that project. Commissioners receive additional visibility through their dashboard and project records.
                </p>
                <p className="text-[16.5px] text-muted-foreground leading-relaxed">
                  Reporting does not override safeguarding, confidentiality, data protection, clinical responsibility or personal safety.
                </p>
                <p className="text-[16.5px] text-muted-foreground leading-relaxed">
                  Supporters can manage their communication and privacy preferences within the dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="py-20 md:py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14">
              <span className="portal-eyebrow md:mt-2">Questions?</span>
              <div className="max-w-3xl">
                <p className="text-[16.5px] text-foreground leading-relaxed mb-8">
                  Please use the Messaging section of your dashboard or our Contact Form for any queries or requests.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/donor-login">
                    <Button className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.1em] text-[13px] font-semibold uppercase px-8">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Link to="/contact-the-trust">
                    <Button variant="outline" className="h-11 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.1em] text-[13px] font-semibold uppercase px-8">
                      Contact Form
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