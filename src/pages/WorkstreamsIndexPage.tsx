import { ArrowRight, CheckCircle2, HandHeart, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { WorkstreamCards } from "@/components/workstreams/WorkstreamCards";
import { SEO } from "@/components/SEO";

const stageLabels = [
  "Listening",
  "Scoping",
  "Team Building",
  "Funding",
  "Delivery",
  "Follow-Up",
  "Complete",
];

export const WorkstreamsIndexPage = () => {
  return (
    <>
      <SEO
        title="Current Workstreams"
        description="Explore five active Global Health Access Trust workstreams across food systems, vulnerable children, conflict recovery, responsible AI and global mental health."
        canonical="/current-workstreams"
      />

      <ContentLayout className="max-w-none">
        <section className="relative overflow-hidden border border-primary/15 bg-gradient-to-br from-primary/[0.09] via-background to-accent/[0.08] px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-primary/10" aria-hidden="true" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border border-accent/15" aria-hidden="true" />
          <div className="relative max-w-5xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">Current workstreams</p>
            <h1 className="mb-7 max-w-4xl font-serif text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-6xl">
              Practical work. Responsible delivery. Lasting public benefit.
            </h1>
            <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Global Health Access Trust develops projects where health and human wellbeing depend upon wider systems: food, safe living conditions, education, employment, technology, professional capability and community resilience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none">
                <a href="#workstreams">Explore the five workstreams</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none">
                <Link to="/how-we-work">How projects move into delivery</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-8 border-y border-foreground/10 py-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">What this means</p>
            <h2 className="mb-4 font-serif text-3xl font-bold sm:text-4xl">Five areas of active development and delivery</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Each workstream is at a different stage. Some build upon active professional and operational work. Others are being scoped, strengthened or prepared for wider participation.
            </p>
            <p>
              Publication does not mean that every proposed phase is funded, approved or already in delivery. Each project progresses through proportionate assessment, trustee oversight, due diligence, safeguarding, financial control and evidence requirements.
            </p>
          </div>
        </section>

        <section id="workstreams" className="scroll-mt-28 py-14 sm:py-16" aria-labelledby="workstreams-heading">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Explore current work</p>
            <h2 id="workstreams-heading" className="mb-4 font-serif text-3xl font-bold sm:text-4xl">
              From defined need to accountable delivery
            </h2>
            <p className="text-muted-foreground">
              Open any workstream to see the scale of the problem, why GHAT is acting, the current project plan, intended outputs, measures of success and the appropriate routes for participation.
            </p>
          </div>
          <WorkstreamCards />
        </section>

        <section className="border-y border-foreground/10 bg-muted/20 px-6 py-10 sm:px-10 sm:py-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Project stages</p>
          <h2 className="mb-7 font-serif text-3xl font-bold">Clear status, not vague claims</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {stageLabels.map((stage, index) => (
              <div key={stage} className="border border-foreground/10 bg-background p-4">
                <span className="mb-3 block font-serif text-xl font-bold text-primary">0{index + 1}</span>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">{stage}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16" aria-labelledby="participate-heading">
          <div className="mb-9 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Participate responsibly</p>
            <h2 id="participate-heading" className="mb-4 font-serif text-3xl font-bold sm:text-4xl">
              Three clear ways to begin
            </h2>
            <p className="text-muted-foreground">
              Support is matched to a defined project need. A pledge or expression of interest does not automatically create acceptance, appointment, access to beneficiaries or a contractual relationship.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: HandHeart,
                title: "Pledge support",
                text: "Offer funding, equipment, technology, facilities, professional time, logistics or another practical resource.",
                action: "Pledge a contribution",
                href: "/donate#pledge-form",
              },
              {
                icon: Users,
                title: "Apply to contribute",
                text: "Register professional, technical, practical or local capability for review against identified project needs.",
                action: "Register your interest",
                href: "/volunteer-apply",
              },
              {
                icon: MessageCircle,
                title: "Ask about a project",
                text: "Begin a project-specific conversation about partnership, a defined phase or the support currently required.",
                action: "Contact the Trust",
                href: "/contact",
              },
            ].map(({ icon: Icon, title, text, action, href }) => (
              <article key={title} className="flex flex-col border border-foreground/12 bg-background p-6 sm:p-7">
                <Icon className="mb-5 h-7 w-7 text-primary" aria-hidden="true" />
                <h3 className="mb-3 font-serif text-2xl font-bold">{title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{text}</p>
                <Link to={href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline">
                  {action} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 border border-primary/15 bg-primary/[0.035] p-7 sm:p-9 md:grid-cols-[auto_1fr] md:items-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="mb-3 font-serif text-2xl font-bold">Evidence without overstatement</h2>
            <p className="mb-4 text-muted-foreground">
              Statistics on these pages describe the wider public need. They are not presented as GHAT results. Outcomes will only be published when a defined baseline, intervention, timeframe and appropriate evidence exist.
            </p>
            <ul className="grid gap-2 text-sm text-foreground sm:grid-cols-2">
              {[
                "Sources are identified on each workstream page.",
                "Sensitive identities and delivery details may remain private.",
                "Earlier personal and pro bono work is distinguished from formal Trust delivery.",
                "Project stages and current activity are described precisely.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};
