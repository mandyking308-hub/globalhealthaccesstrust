import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { SearchModal } from "@/components/common/SearchModal";

const publicNavigationItems = NAVIGATION_ITEMS.filter((item) => item.href !== "/blog");

const GHATLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 360 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Icon: wireframe globe + emerald access node */}
    <g transform="translate(4, 8)">
      <circle cx="24" cy="24" r="21" stroke="hsl(var(--primary))" strokeWidth="1.75" fill="none" />
      <ellipse cx="24" cy="24" rx="9" ry="21" stroke="hsl(var(--primary))" strokeWidth="1.25" fill="none" opacity="0.7" />
      <line x1="3" y1="24" x2="45" y2="24" stroke="hsl(var(--primary))" strokeWidth="1.25" opacity="0.7" />
      <line x1="6" y1="12" x2="42" y2="12" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
      <line x1="6" y1="36" x2="42" y2="36" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
      <circle cx="24" cy="24" r="4.5" fill="hsl(var(--accent))" />
    </g>

    <text
      x="62"
      y="28"
      fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
      fontSize="20"
      fontWeight="800"
      letterSpacing="-0.01em"
      fill="hsl(var(--foreground))"
    >
      GLOBAL HEALTH
    </text>
    <text
      x="62"
      y="50"
      fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
      fontSize="20"
      fontWeight="800"
      letterSpacing="-0.01em"
      fill="hsl(var(--primary))"
    >
      ACCESS TRUST
    </text>
  </svg>
);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <>
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 bg-background border-b border-foreground/10">
        {/* Utility strip — clean ivory, restrained */}
        <div className="hidden md:block border-b border-foreground/10 bg-background">
          <div className="max-w-[1400px] mx-auto px-8 h-9 flex items-center justify-between text-[11.5px] font-sans font-semibold tracking-[0.14em] uppercase text-foreground/70">
            <span>Charitable Trust — England & Wales</span>
            <div className="flex items-center gap-7">
              <Link to="/contact" className="no-underline hover:text-foreground transition-colors">Contact</Link>
              <Link to="/governance" className="no-underline hover:text-foreground transition-colors">Governance</Link>
              <Link to="/publications" className="no-underline hover:text-foreground transition-colors">Publications</Link>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 h-[84px]">
          <div className="flex h-full items-center justify-between gap-2 sm:gap-4 lg:gap-10">

            {/* Logo — GHAT institutional wordmark */}
            <Link
              to="/"
              className="flex min-w-0 items-center hover:opacity-85 transition-opacity duration-200 flex-shrink-0"
              aria-label="Global Health Access Trust - Home"
            >
              <GHATLogo className="h-10 w-[180px] sm:h-12 sm:w-[270px] md:h-16 md:w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center flex-1 justify-end">
              <div className="flex items-center">
                {publicNavigationItems.map((item) => (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => 'submenu' in item && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-1 px-4 py-2 text-[15px] font-sans font-semibold text-foreground/85 hover:text-primary transition-colors duration-200 whitespace-nowrap no-underline"
                    >
                      {item.label}
                      {'submenu' in item && (
                        <ChevronDown className="w-3.5 h-3.5 text-foreground/50" />
                      )}
                    </Link>

                    {'submenu' in item && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-0 w-64 bg-background border border-foreground/10 shadow-medium py-2 z-50">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block px-5 py-2.5 text-[14px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150 no-underline"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 pl-0 sm:pl-2 lg:pl-4 lg:border-l lg:border-foreground/10">
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search website"
                className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <Link
                to="/auth?portal=team"
                className="hidden sm:inline-flex items-center h-10 px-4 border border-primary/40 text-primary text-[12.5px] font-sans font-semibold tracking-[0.08em] hover:bg-primary hover:text-primary-foreground transition-colors no-underline"
              >
                Project Team
              </Link>
              <Link
                to="/auth?portal=donor"
                className="hidden sm:inline-flex items-center h-10 px-5 bg-primary text-primary-foreground text-[13px] font-sans font-semibold tracking-[0.08em] hover:bg-primary/90 transition-colors no-underline"
              >
                Donor Portal
              </Link>

              <button
                className="lg:hidden h-9 w-9 flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-foreground/10 bg-background">
              <div className="py-4 space-y-1">
                {publicNavigationItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide text-foreground hover:bg-muted/40 transition-colors"
                      onClick={(e) => {
                        if ('submenu' in item) {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.label ? null : item.label);
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                    >
                      <span>{item.label}</span>
                      {'submenu' in item && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                      )}
                    </Link>
                    {'submenu' in item && activeDropdown === item.label && (
                      <div className="ml-4 border-l border-foreground/10 pl-4 py-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4 border-t border-foreground/10 mt-4 space-y-2">
                  <Link to="/auth?portal=donor" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full text-sm bg-primary text-primary-foreground hover:bg-primary/90">
                      Donor Login
                    </Button>
                  </Link>
                  <Link to="/auth?portal=team" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full text-sm">
                      Project Team Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};