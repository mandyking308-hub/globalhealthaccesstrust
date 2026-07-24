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
      <div className="mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto px-4 sm:px-6 md:px-8">
        <span className="hidden shrink-0 pr-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/65 sm:inline">
          Explore
        </span>
        {items.map((item) => {
          const active = location.pathname === item.href || (item.href === "/current-workstreams" && location.pathname.startsWith("/current-workstreams/"));
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`shrink-0 border-b-2 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.15em] no-underline transition-colors ${
                active
                  ? "border-accent bg-white/[0.08] text-primary-foreground"
                  : "border-transparent text-primary-foreground/75 hover:bg-white/[0.06] hover:text-primary-foreground"
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
