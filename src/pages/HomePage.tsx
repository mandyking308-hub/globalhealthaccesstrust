import { ArrowRight, HandHeart, LockKeyhole, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomepageWorkstreamsSection } from "@/components/workstreams/HomepageWorkstreamsSection";
import { PROGRAM_AREAS } from "@/lib/constants";
import { SEO } from "@/components/SEO";
import { organizationSchema } from "@/lib/seo";
import heroImage from "@/assets/ghat-hero-community-health.jpg";

const deliverySteps = [
  {
    title: "Define the need",
    description: "Understand the setting, public-benefit purpose, intended outcome and constraints before proposing a response.",
  },
  {
    title: "Structure the project",
    description: "Set responsibilities, resources, safeguards, budget, milestones and the evidence that will be required.",
  },
  {
    title: "Verify and agree",
    description: "Review contributors, supporters and delivery arrangements before commitments are accepted or work begins.",
  },
  {
    title: "Deliver and evidence",
    description: "Record progress, expenditure, outcomes, learning and the decision to conclude, repeat or expand.",
  },
];

const participationRoutes = [
  {
    icon: HandHeart,
    eyebrow: "Support",
    title: "Pledge a useful resource",
    description: "Offer funding, equipment, technology, facilities, logistics, professional time or another defined resource.",
    action: "Pledge support",
    href: "/donate#pledge-form",
  },
  {
    icon: Users,
    eyebrow: "Contribute",
    title: "Bring relevant capability",
    description: "Register professional, technical, practical or local knowledge for review against an identified project need.",
    action: "Apply to contribute",
    href: "/volunteer-apply",
  },
  {
    icon: MessageCircle,
    eyebrow: "Collaborate",
    title: "Begin a project conversation",
    description: "Discuss a partnership, a defined project phase or the support currently required by a live workstream.",
    action: "Contact the Trust",
    href: "/contact",
  },
];

export const HomePage = () => {
  return (
    <>
      <SEO
        title="Global Health Access Trust"
        description="An unincorporated charitable organisation developing, funding and coordinating the systems and conditions that enable better healthcare through professional expertise, infrastructure, responsible technology and public-benefit projects."
        canonical="/"
        schema={organizationSchema}
      />

      <div className="homepage-editorial flex flex-col bg-background">
        <section className="border-b border-foreground/10 bg-background">
          <div className="grid min-h-[calc(100vh-108px)] grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="order-2 flex flex-col justify-center px-6 py-16 md:px-16 lg:order-1 lg:px-20 xl:px-24">
              <div className="max-w-[680px]">
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-px w-10 bg-foreground" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-foreground">
                    Global Health Access Trust
                  </span>
                </div>
                <h1 className="text-foreground">
                  Building the systems that make health, safety and opportunity possible.
                </h1>
                <p className="mt-8 max-w-[610px] text-lg leading-relaxed text-foreground/80 md:text-xl">
                  GHAT connects professional expertise, essential systems, responsible technology and practical resources around clearly defined public-benefit needs.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="rounded-none px-7">
                    <a href="#current-workstreams">
                      Explore current work <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-none px-7">
                    <Link to="/about-the-trust">About the Trust</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative order-1 min-h-[58vh] overflow-hidden bg-muted lg:order-2 lg:min-h-full">
              <img
                src={heroImage}
                alt="A mother and child on a residential street in an Eastern European town affected by the Ukraine crisis"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 border-b border-foreground/10 bg-background md:grid-cols-3" aria-label="Trust reach and development">
          {[
            {
              category: "Reach",
              value: "12",
              label: "Countries",
              description: "Practical work, learning and professional relationships across twelve countries.",
            },
            {
              category: "Network",
              value: "40+",
              label: "Relationships",
              description: "Professional, technical, faith-based and community relationships supporting public-benefit work.",
            },
            {
              category: "Development",
              value: "2019",
              label: "Coordinated expansion",
              description: "The point at which longstanding service began developing into a coordinated international network.",
            },
          ].map((stat, index) => (
            <div
              key={stat.category}
              className={`flex flex-col justify-between p-9 md:p-11 lg:p-14 ${
                index < 2 ? "border-b border-foreground/10 md:border-b-0 md:border-r" : ""
              }`}
            >
              <span className="mb-9 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground">
                {stat.category}
              </span>
              <div>
                <span className="display-condensed mb-4 block font-serif text-foreground" style={{ fontSize: "clamp(48px, 5vw, 82px)", lineHeight: 0.9 }}>
                  {stat.value}
                </span>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">{stat.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          ))}
        </section>

        <div id="current-workstreams" className="scroll-mt-28">
          <HomepageWorkstreamsSection />
        </div>

        <section className="bg-primary py-20 text-primary-foreground md:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 md:grid-cols-[170px_1fr] md:px-10 md:gap-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent md:mt-3">Connected mission</span>
            <div>
              <h2 className="display-condensed mb-10 text-primary-foreground">Health depends on the systems around it.</h2>
              <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <p className="border-t border-primary-foreground/25 pt-7 text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
                  Food, safe living conditions, education, livelihoods, technology, mental health and community resilience all influence whether people can live safely and access appropriate care.
                </p>
                <p className="border-t border-primary-foreground/25 pt-7 text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
                  GHAT develops projects at those points of connection, while keeping human judgement, local leadership, safeguarding and professional responsibility at the centre.
                </p>
              </div>
              <Link
                to="/about-the-trust"
                className="mt-12 inline-flex items-center gap-3 border-b border-primary-foreground pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground no-underline hover:border-accent hover:text-accent"
              >
                Understand the Trust <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            <div className="mb-12 grid gap-8 md:grid-cols-[170px_1fr] md:gap-16">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary md:mt-3">Delivery</span>
              <div className="max-w-4xl">
                <h2 className="mb-7 text-foreground">From a defined need to accountable delivery.</h2>
                <p className="text-lg leading-relaxed text-foreground md:text-xl">
                  Projects move through disciplined stages so that urgency does not replace judgement and ambition does not outrun evidence.
                </p>
              </div>
            </div>

            <ol className="grid gap-0 border-y border-foreground/15 md:grid-cols-2 lg:grid-cols-4">
              {deliverySteps.map((step, index) => (
                <li
                  key={step.title}
                  className={`p-7 sm:p-8 ${index < deliverySteps.length - 1 ? "border-b border-foreground/12 lg:border-b-0 lg:border-r" : ""}`}
                >
                  <span className="mb-7 block font-serif text-2xl font-black text-primary">0{index + 1}</span>
                  <h3 className="mb-4 text-foreground">{step.title}</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <Button asChild variant="outline" size="lg" className="rounded-none">
                <Link to="/how-we-work">Read how projects move into delivery</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10 bg-secondary/60 py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            <div className="mb-12 grid gap-8 md:grid-cols-[170px_1fr] md:gap-16">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary md:mt-3">Permanent mandate</span>
              <div className="max-w-4xl">
                <h2 className="mb-7 text-foreground">The wider charitable scope behind today’s five workstreams.</h2>
                <p className="text-lg leading-relaxed text-foreground md:text-xl">
                  Current projects change as needs and evidence develop. These standing programme areas define the wider public-benefit purposes within which future work can be considered.
                </p>
              </div>
            </div>

            <ol className="grid gap-px overflow-hidden border border-foreground/12 bg-foreground/12 md:grid-cols-2 lg:grid-cols-3">
              {PROGRAM_AREAS.map((area, index) => (
                <li key={area.id} className="bg-background p-7 sm:p-8">
                  <span className="mb-5 block font-serif text-xl font-black text-primary">0{index + 1}</span>
                  <h3 className="mb-3 text-foreground">{area.title}</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted-foreground">{area.description}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <Button asChild variant="outline" size="lg" className="rounded-none">
                <Link to="/our-work">View the full charitable mandate</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Accountability</span>
                <h2 className="mb-7 text-foreground">Evidence, independence and charitable control.</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The live work is ambitious, but the public claims remain disciplined. Statistics describe the wider need; GHAT outcomes are reported only when a defined intervention and suitable evidence exist.
                </p>
              </div>

              <div className="grid gap-7 md:grid-cols-3">
                {[
                  {
                    title: "Trustee oversight",
                    description: "Trustees retain collective responsibility for charitable purpose, project approval, safeguarding and financial stewardship.",
                  },
                  {
                    title: "Independent structure",
                    description: "The Trust remains legally and financially separate from private businesses and connected commercial interests.",
                  },
                  {
                    title: "Evidence before claims",
                    description: "Milestones, expenditure, outputs and learning are recorded through proportionate project and professional systems.",
                  },
                ].map((item) => (
                  <article key={item.title} className="border-t border-foreground/15 pt-7">
                    <ShieldCheck className="mb-5 h-6 w-6 text-primary" aria-hidden="true" />
                    <h3 className="mb-3 text-foreground">{item.title}</h3>
                    <p className="m-0 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Button asChild variant="outline" size="lg" className="rounded-none">
                <Link to="/governance">Governance and oversight</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none">
                <Link to="/governance-legal-framework">Legal framework</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10 bg-muted/25 py-20 md:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 md:grid-cols-[170px_1fr] md:px-10 md:gap-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary md:mt-3">Continuity</span>
            <div>
              <blockquote className="max-w-5xl text-foreground" style={{ fontSize: "clamp(27px, 3.2vw, 48px)", lineHeight: 1.1 }}>
                The Trust builds on decades of voluntary, self-funded, professional and pro bono service—now carried forward through structured projects with clear purpose, oversight and evidence.
              </blockquote>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-foreground">The Board of Trustees</p>
              <Button asChild variant="outline" size="lg" className="mt-10 rounded-none">
                <Link to="/our-history">Explore the history on which GHAT builds</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            <div className="mb-12 max-w-4xl">
              <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Participate</span>
              <h2 className="mb-7 text-foreground">Turn concern into a responsible next step.</h2>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                Support begins with a defined project need. A pledge or expression of interest is reviewed before funding, resources, appointments or access are accepted.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {participationRoutes.map(({ icon: Icon, eyebrow, title, description, action, href }) => (
                <article key={title} className="flex min-h-full flex-col border border-foreground/12 bg-background p-7 sm:p-8">
                  <Icon className="mb-6 h-7 w-7 text-primary" aria-hidden="true" />
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
                  <h3 className="mb-4 text-foreground">{title}</h3>
                  <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  <Button asChild className="mt-auto rounded-none">
                    <Link to={href}>
                      {action} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-9 text-primary-foreground">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="flex items-start gap-4">
              <LockKeyhole className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-accent">Secure access</p>
                <p className="m-0 max-w-3xl text-sm leading-relaxed text-primary-foreground/80">
                  Approved supporters and project-team members use secure workspaces after verification, agreement and assignment.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-none border-white/55 bg-transparent text-white hover:bg-white hover:text-primary">
                <Link to="/auth?portal=donor">Donor login</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-white/55 bg-transparent text-white hover:bg-white hover:text-primary">
                <Link to="/auth?portal=team">Project-team login</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
