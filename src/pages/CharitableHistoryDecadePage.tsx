import { ArrowLeft, Archive, Camera, FileText, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const CharitableHistoryDecadePage = () => (
  <>
    <SEO
      title="1991–1999: Early Charitable Work"
      description="The developing historical record of voluntary humanitarian support, refugee assistance, mental-health advocacy and community action undertaken between 1991 and 1999."
      canonical="/our-history/1991-1999"
    />

    <ContentLayout className="max-w-none">
      <Link
        to="/our-history"
        className="mb-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary no-underline hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Our history
      </Link>

      <section className="border border-primary/15 bg-gradient-to-br from-primary/[0.08] via-background to-accent/[0.08] px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">1991–1999</p>
        <h1 className="mb-6 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Humanitarian support, refugees and mental health
        </h1>
        <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          This is the first period in a year-by-year historical record now being carefully reconstructed from photographs, correspondence, travel records, financial records and personal recollection.
        </p>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {[
          {
            icon: Archive,
            title: "What this period will record",
            text: "Voluntary and self-funded activity connected with war, displacement, natural disasters, health inequality, disability exclusion, community fundraising and efforts to bring mental health into public discussion.",
          },
          {
            icon: ShieldCheck,
            title: "How it will be described",
            text: "This work took place long before Global Health Access Trust was established. It will be presented as earlier personal, family, professional, voluntary or pro bono service—not as activity formally delivered by GHAT.",
          },
          {
            icon: Camera,
            title: "Evidence being recovered",
            text: "Appropriate photographs, letters, records of appeals, travel information and other archive material will be connected to individual entries where provenance and publication are suitable.",
          },
          {
            icon: MapPin,
            title: "A year-by-year international record",
            text: "Each entry will identify the period, location, wider event or need, the contribution made, how it was supported and the experience that now informs the Trust's work.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <article key={title} className="border border-foreground/10 bg-background p-6 sm:p-7">
            <Icon className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="mb-3 font-serif text-2xl font-bold">{title}</h2>
            <p className="m-0 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 border-l-4 border-primary bg-muted/20 p-7 sm:p-9">
        <div className="flex items-start gap-4">
          <FileText className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h2 className="mb-3 font-serif text-2xl font-bold">The detailed archive is being prepared</h2>
            <p className="mb-4 text-muted-foreground">
              Entries will be published only after the year, place, nature of the work and available evidence have been reviewed. Where people, children, professionals or vulnerable communities could be identified, privacy and dignity will take priority over detail.
            </p>
            <p className="m-0 text-muted-foreground">
              The current workstream pages show the Trust's active work today. This historical page provides the bridge to the decades of service on which that work builds.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/our-history" className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground no-underline hover:bg-primary/90">
          Return to the historical timeline
        </Link>
        <Link to="/current-workstreams" className="inline-flex items-center gap-2 border border-primary/30 px-5 py-3 text-sm font-semibold text-primary no-underline hover:bg-primary/5">
          View current workstreams
        </Link>
      </div>
    </ContentLayout>
  </>
);
