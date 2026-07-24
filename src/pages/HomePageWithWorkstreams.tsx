import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WorkstreamCards } from "@/components/workstreams/WorkstreamCards";
import { HomePage } from "./HomePage";

export const HomePageWithWorkstreams = () => (
  <>
    <HomePage />

    <section className="border-t border-foreground/10 bg-muted/20 py-20 md:py-28" aria-labelledby="home-workstreams-heading">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 grid gap-8 md:grid-cols-[180px_1fr_auto] md:items-end md:gap-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary md:mb-3">Current work</span>
          <div className="max-w-4xl">
            <h2
              id="home-workstreams-heading"
              className="mb-6 font-serif text-foreground"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}
            >
              Five Current Workstreams
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Evidence-led projects across food systems, vulnerable children, conflict recovery, responsible AI and global mental health—each with a defined stage, project plan and route for participation.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="rounded-none">
            <Link to="/current-workstreams">
              Explore all workstreams <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <WorkstreamCards />

        <div className="mt-10 border-l-4 border-primary bg-background p-6 sm:p-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">A clear public record</p>
          <p className="m-0 max-w-5xl leading-relaxed text-muted-foreground">
            Statistics describe the wider need, not results claimed by GHAT. Each project page distinguishes current activity from planned phases and explains what will be produced, how progress will be measured and what must happen before support is accepted or delivery expands.
          </p>
        </div>
      </div>
    </section>
  </>
);
