import { Link } from "react-router-dom";
import { ArrowRight, CalendarRange, HandHeart, HeartPulse, Network, ShieldCheck } from "lucide-react";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

const periods = [
  {
    period: "1991–1999",
    title: "Humanitarian support, refugees and mental health",
    description:
      "Our early charitable work responded to war, displacement, natural disasters, health inequality, disability exclusion and the need to bring mental health into public view.",
    href: "/our-history/1991-1999",
    status: "Explore the decade",
    active: true,
  },
  {
    period: "2000–2009",
    title: "Global health, disaster response and community care",
    description:
      "This period included major humanitarian emergencies, international health campaigns and important changes in mental-health, social-care and autism policy.",
    status: "Historical record in preparation",
  },
  {
    period: "2010–2018",
    title: "Health access, autism and international support",
    description:
      "Our work continued across mental health, neurodiversity, disability, children and families, humanitarian response and access to appropriate healthcare.",
    status: "Historical record in preparation",
  },
  {
    period: "2019–2024",
    title: "Building an international network",
    description:
      "From 2019, the work developed through a wider network of clinicians, technologists, professional contributors, community organisations and international contacts.",
    status: "Historical record in preparation",
  },
  {
    period: "From December 2024",
    title: "The Global Health Access Trust",
    description:
      "The establishment of the Trust brought this long history of voluntary service into a permanent charitable structure with defined governance, safeguarding and accountability.",
    href: "/our-work",
    status: "View our work today",
    active: true,
  },
];

const principles = [
  {
    icon: HandHeart,
    title: "Voluntarily",
    text: "The work was undertaken without payment and often alongside family, professional and business responsibilities.",
  },
  {
    icon: HeartPulse,
    title: "Practically",
    text: "We raised money, collected essential goods, supported sponsored events and helped public appeals reach wider communities.",
  },
  {
    icon: Network,
    title: "Through trusted organisations",
    text: "We worked through charities, churches, hospitals, community groups and people with direct knowledge of the affected area.",
  },
  {
    icon: ShieldCheck,
    title: "With sustained commitment",
    text: "Where possible, we continued helping after an emergency had moved away from public attention.",
  },
];

export const CharitableHistoryPage = () => {
  return (
    <>
      <SEO
        title="Our History of Charitable Work"
        description="Explore more than three decades of voluntary charitable work, humanitarian support, health advocacy and community action that shaped the Global Health Access Trust."
        canonical="/our-history"
      />

      <ContentLayout className="max-w-none">
        <section className="relative overflow-hidden border border-primary/15 bg-gradient-to-br from-primary/[0.08] via-background to-accent/[0.08] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-primary/10" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-accent/15" aria-hidden="true" />
          <div className="relative max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Our history of charitable work
            </p>
            <h1 className="mb-6 max-w-3xl text-4xl font-serif font-bold leading-tight sm:text-5xl lg:text-6xl">
              More than three decades of voluntary service
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Our work did not begin when the Global Health Access Trust was formally established. It grew from decades of voluntary charitable activity, humanitarian fundraising, community support, health advocacy and practical assistance in the UK and internationally.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/our-history/1991-1999"
                className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90"
              >
                Explore 1991–1999 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/our-work"
                className="inline-flex items-center gap-2 border border-primary/30 px-5 py-3 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary/5"
              >
                View our work today
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 border-y border-foreground/10 py-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
          <div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarRange className="h-6 w-6" />
            </div>
            <h2 className="mb-3 text-3xl font-serif font-bold">Our story of service</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Much of this work was carried out quietly through churches, hospitals, charities, community organisations and trusted contacts. We raised money, collected essential items, supported public appeals and contributed our time and experience where we believed it could add value to a difficult situation.
            </p>
            <p>
              At the time, our priority was helping people—not creating a public record. We are now bringing that history together, decade by decade.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="timeline-heading">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">Historical timeline</p>
            <h2 id="timeline-heading" className="mb-4 text-3xl font-serif font-bold sm:text-4xl">
              The work that shaped the Trust
            </h2>
            <p className="text-muted-foreground">
              The earlier pages describe voluntary work undertaken before the Trust existed. Activity from December 2024 onward is recorded separately as formal Trust work.
            </p>
          </div>

          <div className="space-y-5">
            {periods.map((item, index) => (
              <article
                key={item.period}
                className={`grid gap-5 border p-6 sm:p-8 md:grid-cols-[180px_1fr_auto] md:items-center ${
                  item.active ? "border-primary/25 bg-primary/[0.025]" : "border-foreground/10 bg-muted/15"
                }`}
              >
                <div>
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    {item.period}
                  </span>
                  <div className="mt-3 hidden h-px w-14 bg-primary/30 md:block" />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-serif font-bold">{item.title}</h3>
                  <p className="mb-0 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>
                </div>
                <div className="md:text-right">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline"
                    >
                      {item.status} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {item.status}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="how-we-worked-heading">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">How we worked</p>
            <h2 id="how-we-worked-heading" className="mb-4 text-3xl font-serif font-bold sm:text-4xl">
              Practical help, delivered with care
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border border-foreground/10 bg-background p-6">
                <Icon className="mb-4 h-6 w-6 text-primary" />
                <h3 className="mb-2 text-xl font-serif font-bold">{title}</h3>
                <p className="mb-0 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 bg-muted/25 p-7 sm:p-10 md:grid-cols-2 md:gap-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">Why this history matters</p>
            <h2 className="mb-4 text-3xl font-serif font-bold">The values came before the institution</h2>
            <p className="text-muted-foreground">
              Our commitment to health access, mental health, children, displaced communities, disability inclusion and humanitarian response was not created for a website. It developed through years of responding to real people and difficult situations.
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">About the record</p>
            <h2 className="mb-4 text-3xl font-serif font-bold">An archive being carefully recovered</h2>
            <p className="text-muted-foreground">
              Much of the earlier work took place before digital records became commonplace. The history is being reconstructed from recollections, photographs, correspondence, travel records, financial records and participant accounts. Appropriate archive material will be added as it is recovered.
            </p>
          </div>
        </section>

        <section className="mt-16 border-t border-foreground/10 pt-10 text-center">
          <h2 className="mb-4 text-3xl font-serif font-bold">Service that shaped the Trust</h2>
          <p className="mx-auto mb-7 max-w-2xl text-muted-foreground">
            The Global Health Access Trust continues values developed over many years: dignity, compassion, practical action and a belief that everyone should have a fair opportunity to obtain care and support.
          </p>
          <Link
            to="/our-history/1991-1999"
            className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90"
          >
            Begin with 1991–1999 <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </ContentLayout>
    </>
  );
};
