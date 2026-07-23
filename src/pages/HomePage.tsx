import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IMPACT_STATS, PROGRAM_AREAS } from "@/lib/constants";
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
        description="A charitable trust developing, funding and coordinating the systems that enable better healthcare through professional expertise, essential infrastructure, responsible technology and capital."
        canonical="/"
        schema={organizationSchema}
      />
      <div className="homepage-editorial flex flex-col bg-background">

        {/* Featured Story Hero — OSF split-screen: text left, image right */}
        <section className="relative bg-background border-b border-foreground/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-108px)]">
            {/* LEFT — headline over ivory */}
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
                  Aligning professional and clinical expertise, essential infrastructure, responsible technology and capital where need is greatest.
                </p>
                <div className="mt-12">
                  <Link
                    to="/about-the-trust"
                    className="inline-block text-foreground text-[15px] font-semibold border-b-2 border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
                  >
                    Learn more about who we are
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT — full-bleed image */}
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

        {/* Impact Statistics — three-column bordered archive band */}
        <section className="grid grid-cols-1 md:grid-cols-3 border-b border-foreground/10 bg-background">
          {[
            { cat: "Reach", n: "12", label: "Countries Reached", d: "Practical work and professional relationships across twelve countries." },
            { cat: "Network", n: "40+", label: "Delivery Relationships", d: "Professional, technical, faith-based and community relationships supporting delivery." },
            { cat: "Development", n: "2019", label: "Network Expansion", d: "The point at which longstanding work began developing into a coordinated international network." },
          ].map((s, i) => (
            <div
              key={s.cat}
              className={`p-10 md:p-12 lg:p-16 flex flex-col justify-between ${i < 2 ? "border-b md:border-b-0 md:border-r border-foreground/10" : ""}`}
            >
              <span className="uppercase tracking-[0.22em] text-[10px] font-bold text-foreground mb-10">
                {s.cat}
              </span>
              <div>
                <span
                  className="font-serif block mb-4 text-foreground display-condensed"
                  style={{ fontSize: "clamp(52px, 5.4vw, 88px)", lineHeight: 0.9, fontWeight: 900, letterSpacing: "-0.015em" }}
                >
                  {s.n}
                </span>
                <p className="text-sm uppercase tracking-[0.2em] font-bold text-foreground">
                  {s.label}
                </p>
                <p className="text-sm mt-4 leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Editorial pull-quote — restrained display serif */}
        <section className="py-16 md:py-20 px-6 bg-background border-b border-foreground/10">
          <div className="max-w-4xl mx-auto">
            <span className="block h-px w-12 bg-accent mb-8" />
            <blockquote
              className="text-foreground"
              style={{ fontSize: "clamp(24px, 2.9vw, 42px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-0.008em", textTransform: "uppercase" }}
            >
              The Trust builds on decades of voluntary, self-funded and pro bono service—now applied through larger, structured projects with clear purpose, oversight and evidence.
            </blockquote>
            <div className="mt-10">
              <p className="uppercase tracking-[0.25em] text-xs font-bold text-foreground">
                — The Board of Trustees
              </p>
              <p className="text-xs opacity-60 mt-2 text-muted-foreground">
                Global Health Access Trust
              </p>
            </div>
          </div>
        </section>



        {/* Reports from the Field — asymmetric 3-column archive grid */}
        <section className="p-6 md:p-16 lg:p-24 border-t border-foreground/10 bg-background">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-3xl">
              <h2
                className="display-condensed text-foreground"
                style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}
              >
                Reports from<br />the Field
              </h2>
              <p className="mt-6 text-[16.5px] leading-relaxed text-muted-foreground">
                Selected records of practical work, professional contribution and institutional learning. Identities are withheld where confidentiality, safety or professional discretion requires it.
              </p>
            </div>
            <Link
              to="/about-the-trust"
              className="text-xs uppercase tracking-[0.22em] font-bold text-foreground border-b border-foreground pb-2 hover:text-accent hover:border-accent transition-colors"
            >
              See all field reports
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {[
              { img: clinicImage, cat: "Healthcare Access", alt: "A nurse examining a mother and newborn in a field maternity clinic in eastern Ukraine", title: "Enabling maternal healthcare in field settings.", copy: "Access supported through appropriately regulated local and field providers." },
              { img: systemsImage, cat: "Systems Infrastructure", alt: "Aid workers unloading medical supply pallets outside a damaged building in a Syrian town", title: "Rebuilding the systems that make care possible.", copy: "Supply, logistics, and infrastructure interventions in conflict-affected regions." },
              { img: ruralImage, cat: "Rural Access", alt: "A multi-region group of clinicians in a field training session", title: "Reaching communities beyond conventional provision.", copy: "Capacity-building for local professionals where geography limits access." },
            ].map((a) => (
              <article key={a.cat} className="group cursor-pointer flex flex-col">
                <div className="mb-7 overflow-hidden aspect-[4/5] bg-muted">
                  <img
                    src={a.img}
                    alt={a.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">
                  {a.cat}
                </span>
                <h3
                  className="font-serif mt-3 mb-3 text-foreground group-hover:text-accent transition-colors"
                  style={{ fontSize: "clamp(22px, 1.9vw, 30px)", lineHeight: 1.2, fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {a.title}
                </h3>
                <p className="text-[15.5px] leading-relaxed text-muted-foreground">
                  {a.copy}
                </p>
              </article>
            ))}
          </div>
        </section>



        {/* Purpose — dark editorial band */}
        <section className="bg-primary text-primary-foreground py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-16 mb-16">
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
                      The Trust develops projects where healthcare access is inseparable from infrastructure, education, food systems, technology and human capability.
                    </p>
                  </div>
                  <div className="pt-8 border-t border-primary-foreground/25">
                    <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
                      Technology, including artificial intelligence, strengthens research, coordination, logistics and evidence. Human judgment, local leadership and professional responsibility remain central.
                    </p>
                  </div>
                </div>
                <p className="mt-10 pt-8 border-t border-primary-foreground/25 text-primary-foreground/85 text-base md:text-lg leading-relaxed max-w-4xl">
                  The Trust enables better healthcare but is not a medical practice or clinical service. Where an approved project includes clinical services, those services are delivered and clinically governed by appropriately licensed and regulated healthcare providers.
                </p>
              </div>
            </div>
            <div className="pl-0 md:pl-[196px]">
              <Link
                to="/about-the-trust"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-bold text-primary-foreground border-b border-primary-foreground pb-2 hover:text-accent hover:border-accent transition-colors"
              >
                About the Trust →
              </Link>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-24 md:py-32 border-b border-foreground/10 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="mb-16">
              <h2 className="font-serif text-foreground mb-8" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.005em" }}>
                Approach
              </h2>
              <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-[820px]">
                Projects begin with a defined healthcare-access, infrastructure, workforce or system need and proceed through disciplined scoping, partnership, delivery and evidence.
              </p>
            </div>

            <div className="pl-0 md:pl-[196px]">
              <ol className="timeline grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
                {[
                  { t: "Scope Definition", d: "Region, focus area, and intended outcomes are agreed in advance." },
                  { t: "Progress Reporting", d: "Milestones, field documentation, and updates are provided through a secure donor portal." },
                  { t: "Financial Transparency", d: "All fund allocations are documented and independently accounted for." },
                ].map((c, i) => (
                  <li key={c.t}>
                    <span className="timeline-node">0{i + 1}</span>
                    <h3 className="mb-3 text-foreground">{c.t}</h3>
                    <p className="text-muted-foreground leading-relaxed">{c.d}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pl-0 md:pl-[196px] mt-16">
              <Link to="/commission-projects">
                <Button variant="outline" size="lg" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.12em] text-[13px] font-semibold h-12 px-8">
                  Commissioned Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How the Trust Operates */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="mb-16">
              <h2 className="font-serif text-foreground mb-8" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.005em" }}>
                How the Trust Operates
              </h2>
              <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-[820px]">The Trust operates through a structured model that defines how capital, delivery, and oversight are aligned within a controlled environment.</p>
            </div>

            <div className="pl-0 md:pl-[196px]">
              <ol className="timeline grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                {[
                  { t: "Structured Funding", d: "Capital is allocated to clearly defined projects with agreed scope, geography, and objectives prior to deployment." },
                  { t: "Project Oversight", d: "Each initiative is tracked against milestones, with delivery monitored through a structured reporting framework." },
                  { t: "Donor Visibility", d: "Donors have access to a secure environment where progress, updates, and documentation are made available." },
                  { t: "Accountability & Control", d: "All activity is documented, auditable, and aligned with legal and governance requirements." },
                ].map((c, i) => (
                  <li key={c.t}>
                    <span className="timeline-node">0{i + 1}</span>
                    <h3 className="mb-3 text-foreground">{c.t}</h3>
                    <p className="text-muted-foreground leading-relaxed">{c.d}</p>
                  </li>
                ))}
              </ol>
            </div>

            <p className="pl-0 md:pl-[196px] text-sm text-muted-foreground/80 mt-12 leading-relaxed max-w-2xl">
              The platform supports structured project management, reporting, and administrative oversight through a secure internal system.
            </p>
          </div>
        </section>

        {/* Operational Framework — vertical structured sequence */}
        <section className="py-24 md:py-28 bg-secondary/60">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="mb-14">
              <h2 className="font-serif text-foreground mb-8" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.005em" }}>
                Operational Framework
              </h2>
              <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-[820px]">The operational framework outlines how initiatives are executed in practice, from capital allocation through to outcome verification.</p>
            </div>

            <div className="pl-0 md:pl-[196px]">
              <ol className="max-w-3xl divide-y divide-foreground/12 border-t border-b border-foreground/15">
                {[
                  { t: "Capital Allocation", d: "Funding is assigned to clearly defined initiatives with agreed scope and objectives." },
                  { t: "Project Structuring", d: "Delivery partners, geography, and operational frameworks are established." },
                  { t: "Monitoring & Reporting", d: "Progress is tracked against milestones with structured reporting." },
                  { t: "Outcome Verification", d: "Results are assessed to ensure accountability and measurable impact." },
                ].map((c, i) => (
                  <li key={c.t} className="grid grid-cols-[64px_1fr] md:grid-cols-[96px_240px_1fr] gap-6 md:gap-10 py-8">
                    <span className="font-serif text-primary text-[22px] font-black tracking-tight pt-1">0{i + 1}</span>
                    <h3 className="text-foreground m-0">{c.t}</h3>
                    <p className="text-muted-foreground leading-relaxed col-span-2 md:col-span-1 m-0">{c.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>


        {/* Governance */}
        <section className="py-24 md:py-32 bg-background border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="mb-16">
              <h2 className="font-serif text-foreground mb-10" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.005em" }}>
                Governance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <div>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed">
                    The Trust is governed by an independent Board with expertise across healthcare, law, public policy, and institutional governance.
                  </p>
                </div>
                <div>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed">
                    All activities are conducted in accordance with the laws of England and Wales and subject to independent audit.
                  </p>
                </div>
              </div>
            </div>

            <div className="pl-0 md:pl-[196px] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {IMPACT_STATS.map((stat, index) => (
                <div key={index} className="pt-8 border-t border-foreground/15">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    {index === 0 ? "Standards" : index === 1 ? "Structure" : "Mandate"}
                  </span>
                  <h3 className="my-3 font-serif text-foreground" style={{ fontSize: "clamp(28px, 2.6vw, 40px)", lineHeight: 1.05, fontWeight: 800 }}>{stat.number}</h3>
                  <div className="text-sm font-semibold mb-2 text-foreground">{stat.label}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Funding Mandate — alternating text-and-image editorial layout */}
        <section className="py-24 md:py-28 bg-secondary/60">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="mb-16">
              <h2 className="font-serif text-foreground mb-8" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.005em" }}>
                Funding Mandate
              </h2>
              <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-[820px]">All funding is directed exclusively toward defined areas of charitable intervention, aligned with long-term system impact.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
              {/* Documentary image — respectful field photograph */}
              <div className="md:col-span-5 md:sticky md:top-28">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={mandateImage}
                    alt="Healthcare support in an underserved setting"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-[12px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                  Field capacity, in delivery
                </p>
              </div>

              {/* Mandate list — alternating editorial column */}
              <ol className="md:col-span-7 divide-y divide-foreground/12 border-t border-b border-foreground/15">
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

            <div className="pl-0 md:pl-[196px] mt-14">
              <Link to="/what-we-do">
                <Button variant="outline" size="lg" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.12em] text-[13px] font-semibold h-12 px-8">
                  Full Mandate
                </Button>
              </Link>
            </div>
          </div>
        </section>


        {/* Portal access — Donor + Project Team, side by side */}
        <section className="py-20 md:py-24 border-b border-foreground/10 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="max-w-3xl mb-12">
              <span className="portal-eyebrow">Secure Access</span>
              <h2 className="font-serif text-foreground mt-4" style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.08, fontWeight: 500, letterSpacing: "-0.005em" }}>
                Two portals. One authenticated system.
              </h2>
              <p className="text-muted-foreground mt-5 text-[16.5px] leading-relaxed">
                Supporters and delivery teams sign in through separate workspaces. Trust administration remains discreet and available from the login page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-foreground/15">
              {/* Donor Portal panel */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-foreground/15 bg-background">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-foreground/55">For supporters</span>
                <h3 className="font-serif text-foreground mt-3" style={{ fontSize: "clamp(22px, 1.9vw, 28px)", fontWeight: 500, letterSpacing: "-0.005em" }}>
                  Donor Portal
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed mt-4 max-w-md">
                  View your donations, funding allocations, project expenditure, milestones, field photographs and reports.
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

              {/* Project Team Portal panel */}
              <div className="p-8 md:p-10 bg-foreground/[0.02]">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-foreground/55">For delivery teams</span>
                <h3 className="font-serif text-foreground mt-3" style={{ fontSize: "clamp(22px, 1.9vw, 28px)", fontWeight: 500, letterSpacing: "-0.005em" }}>
                  Project Team Portal
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed mt-4 max-w-md">
                  Charity workers, field staff, healthcare professionals, approved volunteers, coordinators and delivery partners submit progress, evidence and expenses on assigned projects. Any clinical services remain under the responsibility of the relevant regulated provider.
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
                  Accounts are not self-service. Access is granted by a Trust administrator once approved and assigned to a project.
                </p>
              </div>
            </div>
          </div>
        </section>




        {/* Engagement & Funding Approach */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="mb-16">
              <h2 className="font-serif text-foreground mb-10" style={{ fontSize: "clamp(32px, 3.6vw, 56px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.005em" }}>
                Engagement &amp; Funding Approach
              </h2>
              <div className="max-w-3xl space-y-5">
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  Engagement with the Trust is conducted through a structured and selective process.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Relationships are established with individuals, institutions, and partners aligned with the Trust's mandate and governance framework.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  This approach ensures capital is deployed with precision, oversight, and long-term impact.
                </p>
              </div>
            </div>

            <div className="pl-0 md:pl-[196px]">
              <ol className="timeline grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                {[
                  { t: "Initial Enquiry", d: "Engagement begins through a direct enquiry to the Trust." },
                  { t: "Review & Alignment", d: "Each enquiry is assessed to ensure alignment with the Trust's mandate and governance framework." },
                  { t: "Structured Engagement", d: "Funding relationships are formalised with defined scope, objectives, and reporting expectations." },
                  { t: "Project Deployment", d: "Capital is deployed into clearly defined initiatives with ongoing monitoring and accountability." },
                ].map((c, i) => (
                  <li key={c.t}>
                    <span className="timeline-node">0{i + 1}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent block mb-2">Step {i + 1}</span>
                    <h3 className="mb-3 text-foreground">{c.t}</h3>
                    <p className="text-muted-foreground leading-relaxed">{c.d}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pl-0 md:pl-[196px] mt-16">
              <Link to="/contact">
                <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.12em] text-[13px] font-semibold h-12 px-8">
                  Initiate Engagement
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};