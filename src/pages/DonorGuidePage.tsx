import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

export const DonorGuidePage = () => {
  const recognitionTiers = [
    {
      tier: "Core Donor",
      amount: "£500 – £4,999",
      recognition: "Thank-you message, project updates"
    },
    {
      tier: "Founding Supporter",
      amount: "£5,000 – £24,999",
      recognition: "Impact reports, early access to events"
    },
    {
      tier: "Strategic Partner",
      amount: "£25,000 – £99,999",
      recognition: "Naming opportunities, private briefings"
    },
    {
      tier: "Legacy Builder",
      amount: "£100,000 – £999,999",
      recognition: "Direct updates, advisory participation opportunities"
    },
    {
      tier: "Visionary Donor",
      amount: "£1 million+",
      recognition: "Bespoke partnership, legacy recognition, co-designed impact programs"
    }
  ];

  const features = [
    { title: "Secure Login", body: "Private donor access with password protection." },
    { title: "Funding Portal", body: "Structured funding submission with secure processing." },
    {
      title: "Donation Preferences",
      body: "Choose where your funds are directed:",
      list: [
        "Healthcare Access",
        "Humanitarian Crisis (e.g. Ukraine)",
        "Research & Policy",
        "Professional Education",
        "Where Most Needed",
      ],
    },
    { title: "Donation History", body: "Review past contributions and download receipts instantly." },
    { title: "Messaging & Updates", body: "Receive personal notes, project updates, and event invitations." },
    { title: "Recognition Tier", body: "Your profile displays your donor tier with tailored benefits." },
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
                  Welcome to the Donor Console
                </h1>
                <p className="text-[13px] uppercase tracking-[0.22em] font-bold text-primary mb-8">
                  Global Health Access Trust
                </p>
                <p className="text-[18px] text-foreground leading-relaxed mb-4 max-w-2xl">
                  Every supporter begins their journey by creating a secure account. This is required for all engagement.
                </p>
                <p className="text-[15.5px] text-muted-foreground leading-relaxed max-w-2xl">
                  Our platform is encrypted, GDPR-compliant, and designed to handle structured funding relationships with full discretion and accountability.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link to="/auth">
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

        {/* Dashboard Features */}
        <section className="py-20 md:py-24 border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14 mb-14">
              <span className="portal-eyebrow md:mt-2">Dashboard</span>
              <h2 className="text-foreground max-w-3xl" style={{ fontWeight: 500, fontSize: "clamp(26px, 2.8vw, 40px)", letterSpacing: "-0.018em", lineHeight: 1.2 }}>
                Your Donor Dashboard Includes:
              </h2>
            </div>

            <div className="md:pl-[196px] grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-0 border-t border-foreground/12">
              {features.map((f, i) => (
                <div key={f.title} className={`py-8 border-b border-foreground/12 ${i % 2 === 0 ? "md:border-r md:pr-14" : ""}`}>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary block mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-foreground mb-3" style={{ fontSize: "clamp(19px, 1.5vw, 23px)", fontWeight: 600 }}>
                    {f.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[15.5px]">
                    {f.body}
                  </p>
                  {f.list && (
                    <ul className="mt-3 space-y-1.5">
                      {f.list.map((item) => (
                        <li key={item} className="text-[14.5px] text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition Tiers */}
        <section className="py-20 md:py-24 border-b border-foreground/10 bg-secondary/40">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14 mb-12">
              <span className="portal-eyebrow md:mt-2">Recognition</span>
              <h2 className="text-foreground max-w-3xl" style={{ fontWeight: 500, fontSize: "clamp(26px, 2.8vw, 40px)", letterSpacing: "-0.018em", lineHeight: 1.2 }}>
                Donor Recognition Tiers
              </h2>
            </div>

            <div className="md:pl-[196px]">
              <div className="border-t border-foreground/15 border-b divide-y divide-foreground/12">
                <div className="grid grid-cols-12 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/60">
                  <div className="col-span-4">Tier Name</div>
                  <div className="col-span-3">Amount</div>
                  <div className="col-span-5">Recognition</div>
                </div>
                {recognitionTiers.map((t) => (
                  <div key={t.tier} className="grid grid-cols-12 py-6 items-baseline">
                    <div className="col-span-4 font-serif font-bold text-foreground text-[16.5px]">{t.tier}</div>
                    <div className="col-span-3 text-[15.5px] text-foreground">{t.amount}</div>
                    <div className="col-span-5 text-[15px] text-muted-foreground leading-relaxed">{t.recognition}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-l-2 border-primary pl-6 max-w-2xl">
                <p className="text-[15.5px] text-foreground leading-relaxed">
                  If you&apos;d like to discuss major donations, our board will connect with you personally. We&apos;re here to build something meaningful, together.
                </p>
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
                  All donation records are stored securely. You can manage your preferences, receive updates, and track your impact.
                </p>
                <p className="text-[16.5px] text-muted-foreground leading-relaxed">
                  We honour our donors with full transparency and care. Thank you for being part of the future of global health access.
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
                  <Link to="/donor-dashboard">
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
