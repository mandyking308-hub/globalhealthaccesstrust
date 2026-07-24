import { Link, useLocation } from "react-router-dom";

const items = [
  { label: "Current Workstreams", href: "/current-workstreams" },
  { label: "Our Work", href: "/our-work" },
  { label: "Our History", href: "/our-history" },
];

export const WorkNavigationStrip = () => {
  const location = useLocation();

  return (
    <nav aria-label="Work and project navigation" className="border-b border-foreground/10 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-[1400px] grid-cols-3 items-stretch px-2 sm:px-6 md:flex md:items-center md:gap-1 md:px-8">
        <span className="hidden shrink-0 pr-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/65 md:inline">
          Explore
        </span>
        {items.map((item) => {
          const active =
            location.pathname === item.href ||
            (item.href === "/current-workstreams" && location.pathname.startsWith("/current-workstreams/")) ||
            (item.href === "/our-history" && location.pathname.startsWith("/our-history/"));

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex min-w-0 items-center justify-center border-b-2 px-1.5 py-3 text-center text-[9.5px] font-bold uppercase tracking-[0.08em] no-underline transition-colors sm:px-4 sm:text-[11px] sm:tracking-[0.15em] md:shrink-0 ${
                active
                  ? "border-accent bg-white/[0.08] text-primary-foreground"
                  : "border-transparent text-primary-foreground/78 hover:bg-white/[0.06] hover:text-primary-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
