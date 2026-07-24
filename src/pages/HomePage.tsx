import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PROGRAM_AREAS } from "@/lib/constants";
import { SEO } from "@/components/SEO";
import { organizationSchema } from "@/lib/seo";
import heroImage from "@/assets/ghat-hero-community-health.jpg";
import clinicImage from "@/assets/ghat-maternal-care.jpg";
import systemsImage from "@/assets/ghat-infrastructure-delivery.jpg";
import ruralImage from "@/assets/ghat-capacity-training.jpg";
import mandateImage from "@/assets/ghat-field-clinic-humanitarian.jpg";

export const HomePage = () => {
  return (
    <>
      <SEO
        title="Global Health Access Trust"
        description="A charitable trust developing, funding and coordinating the systems and conditions that enable better healthcare through professional expertise, infrastructure, responsible technology and public-benefit projects."
        canonical="/"
        schema={organizationSchema}
      />

      <div className="homepage-editorial flex flex-col bg-background">
        <section className="relative bg-background border-b border-foreground/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-108px)]">
            <div className="flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 lg:py-24 order-2 lg:order-1">
              <div className="max-w-[640px]">
                <div className="flex items-center gap-3 mb-8">
                  <span className="h-px w-10 bg-foreground" />
                  <span className="uppercase tracking-[0.28em] text-foreground text-[10px] font-bold">
                    Emergency Briefing — Ukraine
                  </span>
                </div>
                <h1 className="text-foreground">
                  The Global Health Access Trust builds the systems that make healthcare possible.
                </h1>
                <p className="mt-8 max-w-[560px] text-lg md:text-xl leading-relaxed text-foreground/80">
                  Aligning professional and clinical expertise, essential infrastructure, responsible technology and resources where need is greatest.
                </p>
                <div className="mt-12 flex flex-wrap gap-5">
                  <Link
                    to="/about-the-trust"
                    className="inline-block text-foreground text-[15px] font-semibold border-b-2 border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
                  >
                    Learn more about who we are
                  </Link>
                  <Link
                    to="/our-work"
                    className="inline-block text-foreground text-[15px] font-semibold border-b-2 border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
                  >
                    Explore our work
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 min-h-[45vh] lg:min-h-full overflow-hidden bg-muted">
              <img
                src={heroImage}
                alt="A mother and child on a residential street in an Eastern European town affected by the Ukraine crisis"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 border-b border-foreground/10 bg-background">
          {[
            { cat: "Reach", n: "12", label: "Countries", d: "Practical work, learning and professional relationships across twelve countries." },
            { cat: "Network", n: "40+", label: "Relationships", d: "Professional, technical, faith-based and community relationships supporting public-benefit work." },
            { cat: "Development", n: "2019", label: "Coordinated Expansion", d: "The point at which longstanding service began developing into a coordinated international network." },
          ].map((stat, index) => (
            <div
              key={stat.cat}
              className={`p-10 md:p-12 lg:p-16 flex flex-col justify-between ${index < 2 ? "border-b md:border-b-0 md:border-r border-foreground/10" : ""}`}
            >
              <span className="uppercase tracking-[0.22em] text-[10px] font-bold text-foreground mb-10">
                {stat.cat}
              </span>
              <div>
                <span
                  className="font-serif block mb-4 text-foreground display-condensed"
                  style={{ fontSize: "clamp(52px, 5.4vw, 88px)", lineHeight: 0.9, fontWeight: 900, letterSpacing: "-0.015em" }}
                >
                  {stat.n}
                </span>
                <p className="text-sm uppercase tracking-[0.2em] font-bold text-foreground">{stat.label}</p>
                <p className="text-sm mt-4 leading-relaxed text-muted-foreground">{stat.d}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="py-16 md:py-20 px-6 bg-background border-b border-foreground/10">
          <div className="max-w-4xl mx-auto">
            <span className="block h-px w-12 bg-accent mb-8" />
            <blockquote
              className="text-foreground"
              style={{ fontSize: "clamp(24px, 2.9vw, 42px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-0.008em", textTransform: "uppercase" }}
            >
              The Trust builds on decades of voluntary, self-funded and pro bono service—now applied through larger, structured projects with clear purpose, oversight and evidence.
            </blockquote>
            <p className="uppercase tracking-[0.25em] text-xs font-bold text-foreground mt-10">— The Board of Trustees</p>
          </div>
        </section>

        <section className="p-6 md:p-16 lg:p-24 border-b border-foreground/10 bg-background">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-3xl">
              <h2
                className="display-condensed text-foreground"
                style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}
              >
                Work and<br />Institutional Learning
              </h2>
              <p className="mt-6 text-[16.5px] leading-relaxed text-muted-foreground">
                Selected records of practical work, professional contribution and institutional learning. Identities are withheld where confidentiality, safety or professional discretion requires it.
              </p>
            </div>
            <Link
              to="/our-work"
              className="text-xs uppercase tracking-[0.22em] font-bold text-foreground border-b border-foreground pb-2 hover:text-accent hover:border-accent transition-colors"
            >
              Explore our work
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {[
              { img: clinicImage, cat: "Healthcare Access", alt: "A nurse examining a mother and newborn in a field maternity clinic", title: "Enabling healthcare in field settings.", copy: "Access supported through appropriately regulated local and field providers." },
              { img: systemsImage, cat: "Systems Infrastructure", alt: "Aid workers unloading essential supplies outside a damaged building", title: "Rebuilding the systems that make care possible.", copy: "Supply, logistics and infrastructure work in conflict-affected and underserved settings." },
              { img: ruralImage, cat: "Human Capability", alt: "A multi-region group of professionals in a field training session", title: "Strengthening capability beyond conventional provision.", copy: "Professional and practical capability-building where geography or system weakness limits access." },
            ].map((item) => (
              <article key={item.cat} className="group flex flex-col">
                <div className="mb-7 overflow-hidden aspect-[4/5] bg-muted">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">{item.cat}</span>
                <h3
                  className="font-serif mt-3 mb-3 text-foreground"
                  style={{ fontSize: "clamp(22px, 1.9vw, 30px)", lineHeight: 1.2, fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {item.title}
                </h3>
                <p className="text-[15.5px] leading-relaxed text-muted-foreground">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16">
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-accent md:mt-3">Purpose</span>
              <div>
                <h2
                  className="display-condensed text-primary-foreground mb-12"
                  style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}
                >
                  About the Trust
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="pt-8 border-t border-primary-foreground/25">
                    <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
                      The Trust develops projects where healthcare access is inseparable from infrastructure, housing, education, food systems, technology and human capability.
                    </p>
                  </div>
                  <div className="pt-8 border-t border-primary-foreground/25">
                    <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
                      Technology, including artificial intelligence, strengthens research, coordination, logistics and evidence. Human judgment, local leadership and professional responsibility remain central.
                    </p>
                  </div>
                </div>
                <Link
                  to="/about-the-trust"
                  className="inline-flex mt-14 items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-bold text-primary-foreground border-b border-primary-foreground pb-2 hover:text-accent hover:border-accent transition-colors"
                >
                  About the Trust →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 border-b border-foreground/10 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16">
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-primary md:mt-3">Approach</span>
              <div>
                <h2 className="font-serif text-foreground mb-8" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.05, fontWeight: 500 }}>
                  From Need to Accountable Delivery
                </h2>
                <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-[820px] mb-14">
                  Projects begin with a defined public-benefit need and proceed through disciplined scoping, capability-building, verification, delivery and evidence.
                </p>
                <ol className="timeline grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {[
                    { t: "Define the Need", d: "The setting, public-benefit purpose, intended outcome and constraints are understood." },
                    { t: "Structure the Project", d: "Responsibilities, partners, resources, safeguards, budget and milestones are established." },
                    { t: "Verify and Agree", d: "Contributors, supporters and delivery arrangements complete the appropriate review and agreements." },
                    { t: "Deliver and Evidence", d: "Progress, expenditure, evidence and learning are recorded through proportionate systems." },
                  ].map((step, index) => (
                    <li key={step.t}>
                      <span className="timeline-node">0{index + 1}</span>
                      <h3 className="mb-3 text-foreground">{step.t}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.d}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-16">
                  <Link to="/how-we-work">
                    <Button variant="outline" size="lg" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.12em] text-[13px] font-semibold h-12 px-8">
                      Read How We Work
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28 bg-secondary/60 border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16">
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-primary md:mt-3">Mandate</span>
              <div className="min-w-0">
                <h2 className="font-serif text-foreground mb-8" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.05, fontWeight: 500 }}>
                  Public-Benefit Project Areas
                </h2>
                <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-[820px] mb-14">
                  Funding and other accepted resources are applied only to work that advances the Trust's charitable purposes and approved public-benefit outcomes.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  <div className="lg:col-span-5 lg:sticky lg:top-28">
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img src={mandateImage} alt="Public-benefit work in an underserved setting" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                  <ol className="lg:col-span-7 divide-y divide-foreground/12 border-t border-b border-foreground/15">
                    {PROGRAM_AREAS.slice(0, 5).map((area, index) => (
                      <li key={area.id} className="grid grid-cols-[56px_1fr] gap-6 py-8">
                        <span className="font-serif text-primary text-[20px] font-black tracking-tight pt-1">0{index + 1}</span>
                        <div>
                          <h3 className="mb-3 text-foreground m-0">{area.title}</h3>
                          <p className="text-muted-foreground leading-relaxed m-0">{area.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="mt-14">
                  <Link to="/our-work">
                    <Button variant="outline" size="lg" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.12em] text-[13px] font-semibold h-12 px-8">
                      View the Full Mandate
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-background border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16">
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-primary md:mt-3">Governance</span>
              <div>
                <h2 className="font-serif text-foreground mb-10" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.05, fontWeight: 500 }}>
                  Charitable Control and Accountability
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                  {[
                    { label: "Trustee Oversight", copy: "The Trustees retain collective responsibility for charitable purpose, safeguarding, financial stewardship and project approval." },
                    { label: "Independent Structure", copy: "The Trust remains legally and financially separate from private and commercial interests." },
                    { label: "Evidence and Review", copy: "Work is documented through appropriate agreements, financial records, project evidence and professional scrutiny where required." },
                  ].map((item) => (
                    <div key={item.label} className="pt-8 border-t border-foreground/15">
                      <h3 className="mb-3 text-foreground">{item.label}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.copy}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-14 flex flex-wrap gap-4">
                  <Link to="/governance-legal-framework">
                    <Button variant="outline" size="lg" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.12em] text-[13px] font-semibold h-12 px-8">
                      Legal Framework
                    </Button>
                  </Link>
                  <Link to="/governance">
                    <Button variant="outline" size="lg" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.12em] text-[13px] font-semibold h-12 px-8">
                      Governance &amp; Oversight
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-b border-foreground/10 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="max-w-3xl mb-12">
              <span className="portal-eyebrow">Secure Access</span>
              <h2 className="font-serif text-foreground mt-4" style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.08, fontWeight: 500 }}>
                Supporter and Project-Team Workspaces
              </h2>
              <p className="text-muted-foreground mt-5 text-[16.5px] leading-relaxed">
                Approved supporters and project teams use separate secure workspaces. Accounts and access are established through the Trust's review and approval processes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-foreground/15">
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-foreground/15 bg-background">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-foreground/55">For approved supporters</span>
                <h3 className="font-serif text-foreground mt-3" style={{ fontSize: "clamp(22px, 1.9vw, 28px)", fontWeight: 500 }}>
                  Donor Portal
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed mt-4 max-w-md">
                  View accepted financial contributions, commissioned projects, agreements, expenditure information, milestones, approved evidence and secure messages.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link to="/auth?portal=donor">
                    <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.12em] text-[12.5px] font-semibold h-11 px-6">
                      Donor Login
                    </Button>
                  </Link>
                  <Link to="/donor-guide">
                    <Button variant="outline" size="lg" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.12em] text-[12.5px] font-semibold h-11 px-6">
                      About the Donor Portal
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-8 md:p-10 bg-foreground/[0.02]">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-foreground/55">For approved contributors</span>
                <h3 className="font-serif text-foreground mt-3" style={{ fontSize: "clamp(22px, 1.9vw, 28px)", fontWeight: 500 }}>
                  Project Team Portal
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed mt-4 max-w-md">
                  Approved professionals, volunteers, coordinators and delivery partners submit progress, evidence, milestones and expenses for assigned projects.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link to="/auth?portal=team">
                    <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.12em] text-[12.5px] font-semibold h-11 px-6">
                      Project Team Login
                    </Button>
                  </Link>
                  <Link to="/volunteer-apply">
                    <Button variant="outline" size="lg" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.12em] text-[12.5px] font-semibold h-11 px-6">
                      Apply to Join
                    </Button>
                  </Link>
                </div>
                <p className="text-[11.5px] text-muted-foreground mt-5 leading-relaxed">
                  Access is granted only after approval, verification, agreement and assignment to an appropriate project or role.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16">
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-primary md:mt-3">Contribute</span>
              <div>
                <h2 className="font-serif text-foreground mb-8" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.05, fontWeight: 500 }}>
                  Support Begins With a Pledge
                </h2>
                <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-[820px] mb-12">
                  A contribution may be funding, time, expertise, equipment, premises, technology, services, logistics, relationships or a combination of resources.
                </p>
                <ol className="timeline grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {[
                    { t: "Submit a Pledge", d: "Tell the Trust what you may be able to contribute and any preferred purpose or conditions." },
                    { t: "Initial Review", d: "The Trust considers relevance, charitable purpose, suitability and the appropriate next step." },
                    { t: "Verification & Agreement", d: "Identity, authority, source, ownership, restrictions and other proportionate checks are completed where required." },
                    { t: "Acceptance & Transfer", d: "Only after formal acceptance does the Trust provide the approved payment, transfer or delivery route." },
                  ].map((step, index) => (
                    <li key={step.t}>
                      <span className="timeline-node">0{index + 1}</span>
                      <h3 className="mb-3 text-foreground">{step.t}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.d}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-16 flex flex-wrap gap-4">
                  <Link to="/donate#pledge-form">
                    <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.12em] text-[13px] font-semibold h-12 px-8">
                      Pledge a Contribution
                    </Button>
                  </Link>
                  <Link to="/commission-projects">
                    <Button variant="outline" size="lg" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.12em] text-[13px] font-semibold h-12 px-8">
                      Commission a Public-Benefit Project
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
