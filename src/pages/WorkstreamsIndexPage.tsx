import { ArrowRight, HandHeart, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WorkstreamCards } from "@/components/workstreams/WorkstreamCards";
import { SEO } from "@/components/SEO";
import "@/styles/workstreams.css";

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

      <div className="workstreams-index min-h-screen bg-background">
        <div className="workstreams-index-shell">
          <section className="grid overflow-hidden border border-primary/15 bg-gradient-to-br from-primary/[0.09] via-background to-accent/[0.08] lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">Current workstreams</p>
              <h1 className="workstreams-index-title max-w-4xl">Practical work. Responsible delivery. Lasting public benefit.</h1>
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
            <aside className="flex flex-col justify-end border-t border-primary/10 bg-primary px-7 py-9 text-primary-foreground lg:border-l lg:border-t-0 lg:px-9 lg:py-12">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/65">What visitors can expect</p>
              <h2 className="mb-5 text-3xl font-semibold text-primary-foreground">Five areas of active development and delivery</h2>
              <p className="m-0 text-primary-foreground/82">
                Each workstream has a visible stage, defined purpose, delivery framework, intended outputs and evidence plan.
              </p>
            </aside>
          </section>

          <section id="workstreams" className="scroll-mt-28 py-16 sm:py-20" aria-labelledby="workstreams-heading">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Explore current work</p>
              <h2 id="workstreams-heading" className="mb-4 text-4xl font-semibold sm:text-5xl">
                From defined need to accountable delivery
              </h2>
              <p className="text-muted-foreground">
                Open any workstream to see the scale of the problem, why GHAT is acting, the current project plan, intended outputs, measures of success and the appropriate routes for participation.
              </p>
            </div>
            <WorkstreamCards />
          </section>

          <section className="border-y border-foreground/10 bg-muted/20 px-6 py-12 sm:px-10 sm:py-14">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Project stages</p>
              <h2 className="mb-3 text-3xl font-semibold sm:text-4xl">Clear status, not vague claims</h2>
              <p className="m-0 text-muted-foreground">A project can move forward, pause, return to an earlier stage or conclude. The public status should always reflect the evidence available.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stageLabels.map((stage, index) => (
                <div key={stage} className="flex items-center gap-4 border border-foreground/10 bg-background p-4">
                  <span className="text-xl font-bold text-primary">0{index + 1}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-foreground">{stage}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="border-b border-foreground/10 bg-background px-6 py-12 sm:px-10 sm:py-16" aria-labelledby="evidence-standard-heading">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
              <div>
                <ShieldCheck className="mb-5 h-8 w-8 text-primary" aria-hidden="true" />
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Evidence standard</p>
                <h2 id="evidence-standard-heading" className="mb-4 text-3xl font-semibold sm:text-4xl">Claims follow evidence, not ambition.</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <article className="border-t border-foreground/15 pt-5">
                  <h3 className="mb-3 text-xl font-semibold">Stage evidence</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted-foreground">The published stage must be supported by recorded decisions, project preparation or delivery activity.</p>
                </article>
                <article className="border-t border-foreground/15 pt-5">
                  <h3 className="mb-3 text-xl font-semibold">Financial evidence</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted-foreground">Pledged, accepted, committed, spent, remaining and returned amounts are distinguished rather than presented as one figure.</p>
                </article>
                <article className="border-t border-foreground/15 pt-5">
                  <h3 className="mb-3 text-xl font-semibold">Outcome evidence</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted-foreground">Outputs and outcomes are described only when suitable records exist; planned or intended benefit is clearly labelled as such.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20" aria-labelledby="participate-heading">
            <div className="mb-9 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Participate responsibly</p>
              <h2 id="participate-heading" className="mb-4 text-4xl font-semibold sm:text-5xl">Three clear ways to begin</h2>
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
                <article key={title} className="flex min-h-full flex-col border border-foreground/12 bg-background p-7">
                  <Icon className="mb-5 h-7 w-7 text-primary" aria-hidden="true" />
                  <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
                  <p className="mb-7 leading-relaxed text-muted-foreground">{text}</p>
                  <Link to={href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline">
                    {action} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};