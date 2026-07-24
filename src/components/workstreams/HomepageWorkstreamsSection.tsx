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
    </div>
  </section>
);
