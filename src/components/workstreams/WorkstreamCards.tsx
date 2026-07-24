import { ArrowRight, CircleDot } from "lucide-react";
import { Link } from "react-router-dom";
import { WORKSTREAMS } from "@/lib/workstreams";

interface WorkstreamCardsProps {
  compact?: boolean;
  limit?: number;
}

const StatusBadges = ({ status, stage }: { status: string; stage: string }) => (
  <div className="mb-5 flex flex-wrap gap-2">
    <span className="inline-flex items-center gap-2 border border-primary/20 bg-primary/[0.045] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
      <CircleDot className="h-3 w-3" aria-hidden="true" />
      {status}
    </span>
    <span className="border border-foreground/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
      {stage}
    </span>
  </div>
);

const CardActions = ({ slug }: { slug: string }) => (
  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-foreground/10 pt-5">
    <Link
      to={`/current-workstreams/${slug}`}
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary no-underline hover:underline"
    >
      View project <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
    <Link
      to={`/donate?workstream=${slug}#pledge-form`}
      className="text-xs font-bold uppercase tracking-[0.14em] text-foreground no-underline hover:text-primary hover:underline"
    >
      Pledge or contribute
    </Link>
  </div>
);

export const WorkstreamCards = ({ compact = false, limit }: WorkstreamCardsProps) => {
  const workstreams = typeof limit === "number" ? WORKSTREAMS.slice(0, limit) : WORKSTREAMS;
  const [featured, ...remaining] = workstreams;

  if (!featured) return null;

  return (
    <div className="space-y-6">
      <article className="group grid overflow-hidden border border-foreground/15 bg-background lg:grid-cols-[1.08fr_0.92fr]">
        <Link
          to={`/current-workstreams/${featured.slug}`}
          className="relative min-h-[300px] overflow-hidden bg-muted no-underline lg:min-h-[430px]"
          aria-label={`View ${featured.title}`}
        >
          <img
            src={featured.image}
            alt={featured.imageAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" aria-hidden="true" />
          <p className="absolute bottom-5 left-5 m-0 text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:bottom-7 sm:left-7">
            Workstream {featured.number} · {featured.region}
          </p>
        </Link>

        <div className="flex flex-col p-7 sm:p-9 lg:p-11">
          <StatusBadges status={featured.status} stage={featured.currentStage} />
          <h3 className="mb-4 text-3xl font-semibold leading-tight sm:text-4xl">{featured.shortTitle}</h3>
          <p className="mb-5 text-lg font-medium leading-relaxed text-foreground">{featured.tagline}</p>
          <p className="mb-7 leading-relaxed text-muted-foreground">
            {compact ? featured.summary : featured.summary}
          </p>
          <CardActions slug={featured.slug} />
        </div>
      </article>

      <div className="grid gap-6 md:grid-cols-2">
        {remaining.map((workstream) => (
          <article key={workstream.slug} className="group flex min-h-full flex-col overflow-hidden border border-foreground/15 bg-background">
            <Link
              to={`/current-workstreams/${workstream.slug}`}
              className="relative block aspect-[16/9] overflow-hidden bg-muted no-underline"
              aria-label={`View ${workstream.title}`}
            >
              <img
                src={workstream.image}
                alt={workstream.imageAlt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" aria-hidden="true" />
              <p className="absolute bottom-4 left-4 m-0 text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:bottom-5 sm:left-5">
                Workstream {workstream.number} · {workstream.region}
              </p>
            </Link>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <StatusBadges status={workstream.status} stage={workstream.currentStage} />
              <h3 className="mb-3 text-2xl font-semibold leading-tight">{workstream.shortTitle}</h3>
              <p className="mb-5 font-medium leading-relaxed text-foreground">{workstream.tagline}</p>
              {!compact && <p className="mb-6 leading-relaxed text-muted-foreground">{workstream.summary}</p>}
              <CardActions slug={workstream.slug} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
