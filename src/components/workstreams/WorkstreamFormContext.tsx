import { ArrowLeft, CircleDot } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getWorkstream } from "@/lib/workstreams";

const supportedPaths = new Set(["/donate", "/volunteer-apply", "/contact"]);

export const WorkstreamFormContext = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selected = getWorkstream(searchParams.get("workstream") ?? undefined);

  if (!selected || !supportedPaths.has(location.pathname)) return null;

  const routeLabel =
    location.pathname === "/donate"
      ? "Project-specific support pledge"
      : location.pathname === "/volunteer-apply"
        ? "Project-specific contributor interest"
        : "Project-specific enquiry";

  return (
    <aside className="border-b border-primary/15 bg-primary/[0.055]" aria-label="Selected workstream">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <div>
          <p className="mb-1 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            <CircleDot className="h-3 w-3" aria-hidden="true" /> {routeLabel}
          </p>
          <p className="m-0 text-sm font-semibold text-foreground">Linked to Workstream {selected.number}: {selected.title}</p>
        </div>
        <Link
          to={`/current-workstreams/${selected.slug}`}
          className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary no-underline hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Return to project page
        </Link>
      </div>
    </aside>
  );
};
