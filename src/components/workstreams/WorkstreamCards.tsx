import { ArrowRight, CircleDot } from "lucide-react";
import { Link } from "react-router-dom";
import { WORKSTREAMS } from "@/lib/workstreams";

interface WorkstreamCardsProps {
  compact?: boolean;
  limit?: number;
}

export const WorkstreamCards = ({ compact = false, limit }: WorkstreamCardsProps) => {
  const workstreams = typeof limit === "number" ? WORKSTREAMS.slice(0, limit) : WORKSTREAMS;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
      {workstreams.map((workstream, index) => {
        const featured = !compact && index === 0;
        return (
          <article
            key={workstream.slug}
            className={`group flex min-h-full flex-col overflow-hidden border border-foreground/15 bg-background ${
              featured ? "xl:col-span-7" : compact ? "xl:col-span-6" : "xl:col-span-5"
            }`}
          >
            <Link
              to={`/current-workstreams/${workstream.slug}`}
              className={`relative block overflow-hidden bg-muted no-underline ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}
              aria-label={`View ${workstream.title}`}
            >
              <img
                src={workstream.image}
                alt={workstream.imageAlt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                loading={index < 2 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/80">
                    Workstream {workstream.number} · {workstream.region}
                  </p>
                  <p className="m-0 font-serif text-xl font-semibold leading-tight text-white sm:text-2xl">
                    {workstream.shortTitle}
                  </p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/50 bg-white/10 backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-slate-950">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 border border-primary/20 bg-primary/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  <CircleDot className="h-3 w-3" aria-hidden="true" />
                  {workstream.status}
                </span>
                <span className="border border-foreground/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {workstream.currentStage}
                </span>
              </div>

              <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground">{workstream.summary}</p>

              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-foreground/10 pt-5">
                <Link
                  to={`/current-workstreams/${workstream.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary no-underline hover:underline"
                >
                  View project <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link
                  to={`/donate?workstream=${workstream.slug}#pledge-form`}
                  className="text-xs font-bold uppercase tracking-[0.16em] text-foreground no-underline hover:text-primary hover:underline"
                >
                  Pledge or contribute
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
