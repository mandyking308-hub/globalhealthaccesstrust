import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WorkstreamCards } from "./WorkstreamCards";

export const HomepageWorkstreamsSection = () => (
  <section className="border-t border-foreground/10 bg-muted/20 py-20 md:py-28" aria-labelledby="home-workstreams-heading">
    <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
      <div className="mb-12 grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-4xl">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Current work</span>
          <h2 id="home-workstreams-heading" className="display-condensed mb-5 text-foreground">
            Five current workstreams
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Evidence-led projects across food systems, vulnerable children, conflict recovery, responsible AI and global mental health—each with a defined stage, project plan and route for participation.
          </p>
        </div>
        <Button asChild variant="outline" size="lg" className="rounded-none lg:mb-1">
          <Link to="/current-workstreams">
            Explore all workstreams <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <WorkstreamCards compact />

      <div className="mt-10 border-l-4 border-primary bg-background p-6 sm:p-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">A clear public record</p>
        <p className="m-0 max-w-5xl leading-relaxed text-muted-foreground">
          Statistics describe the wider need, not results claimed by GHAT. Each project page distinguishes current activity from planned phases and explains what will be produced, how progress will be measured and what must happen before support is accepted or delivery expands.
        </p>
      </div>
    </div>
  </section>
);
